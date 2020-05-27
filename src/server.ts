import express from 'express';
import path from 'path';

export default class Server {
    public app: any;
    private httpPort = 3000;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.static(path.join(__dirname, '../static')));
    }

    registerAppGet(location: string|RegExp, func: (req: express.Request, res: express.Response) => void) {
        this.app.get(location, func);
    }

    registerAppPost(location: string|RegExp, func: (req: express.Request, res: express.Response) => void) {
        this.app.post(location, func);
    }

    start() {
        this.app.get(/(?!(^.*\/\.websocket)$)^.*/, (req: express.Request, res: express.Response) => {
            res.sendFile(path.join(__dirname, '../static/index.html'));
        });

        this.app.listen(this.httpPort, 'localhost', () => {
            console.log(`server started at http://localhost:${ this.httpPort }`);
        })
    }
}
