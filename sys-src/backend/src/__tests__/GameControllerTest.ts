import server from '../Server';
import request from 'supertest';
import { setupDB } from './databaseTestSetup';
const s = new server();

setupDB();

it('Set score', async (done) => {
    const resSetUser = await request(s.app).post('/game/score').send({
        username: 'MaxMuster',
        level: 'lvl001',
        stars: 3,
        money: 3000,
        burnedFields: 4,
        time: 3,
    });
    expect(resSetUser.body.message).toBe('New data inserted');
    expect(resSetUser.body.scoreData).toBeTruthy();

    const resGetUser = await request(s.app).post('/game/score').send({
        username: 'MaxMuster',
        level: 'lvl001',
        stars: 3,
        money: 3000,
        burnedFields: 4,
        time: 3,
    });
    expect(resGetUser.body.message).toBe('Old data updated');
    expect(resGetUser.body.scoreData).toBeTruthy();
    done();
});

it('Get scoreboard', async (done) => {
    await request(s.app).post('/game/score').send({
        username: 'TimMuster',
        level: 'lvl002',
        stars: 2,
        money: 3000,
        burnedFields: 4,
        time: 3,
    });

    const res = await request(s.app).get('/game/scoreboard?level=lvl002');
    expect(res.body).toBeTruthy();
    done();
});

it('Get score by username', async (done) => {
    await request(s.app).post('/game/score').send({
        username: 'TimMuster',
        level: 'lvl002',
        stars: 2,
        money: 3000,
        burnedFields: 4,
        time: 3,
    });

    const resUserScore = await request(s.app).get('/game/score/TimMuster');
    expect(resUserScore.body.username).toBe('TimMuster');
    done();
});
