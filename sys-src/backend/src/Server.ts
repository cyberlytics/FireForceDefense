import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import AccountsController from './controllers/AccountsController';
import GameController from './controllers/GameController';

export default class Server {
    public app: Express;
    private httpPort = 3000;

    constructor() {
        this.app = express();
        this.app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, '../static')));
        this.initControllers();
        this.serveSwaggerDocumentation();
    }

    start(): void {
        this.app.get(/(?!(^.*\/\.websocket)$)^.*/, (req: express.Request, res: express.Response) => {
            res.sendFile(path.join(__dirname, '../static/index.html'));
        });

        this.app.listen(this.httpPort, '0.0.0.0', () => {
            console.log(`server started at http://localhost:${this.httpPort}`);
        });
    }

    private initControllers() {
        this.app.use('/', new AccountsController().router);
        this.app.use('/', new GameController().router);
    }

    private serveSwaggerDocumentation() {
        const swaggerDocumentation = YAML.load(path.resolve(__dirname, '../swagger.yaml'));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));
    }
}
