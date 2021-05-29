import Server from './server';
import Storage from './storage';
import type express from 'express';

new Storage().setup().close();

const server = new Server();

function sendUserScores(nickname: string, res: express.Response) {
    res.setHeader('Content-Type', 'application/json');
    new Storage().get(nickname, (rows) => {
        res.send({
            nickname,
            scores: rows.reduce((map, row) => {
                map[row.level] = row.score;
                return map;
            }, {})
        });
    }).close();
}

server.registerAppGet('/api/:nickname', (req, res) => {
    sendUserScores(req.params.nickname, res);
})

server.registerAppPost('/api/:nickname', (req, res) => {
    const data: {key: string, value: number}[] = [];
    for (const key in req.body) {
        if (!req.body.hasOwnProperty(key)) continue;
        const value = parseInt(req.body[key], 10);
        if (typeof key === 'string' && !isNaN(value) && value >= 0 && value <= 3) {
            data.push({key, value});
        }
    }
    new Storage().post(req.params.nickname, data);
    sendUserScores(req.params.nickname, res);
});

server.start();
