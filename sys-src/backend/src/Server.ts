import express, { Express } from 'express';
import path from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import AccountsController from './AccountsController';
import GameController from './GameController';

export default class Server {
    public app: Express;
    private httpPort = 3000;

    constructor() {
        this.app = express();
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, '../static')));

        const swaggerDocumentation = YAML.load(path.resolve(__dirname, '../swagger.yaml'));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

        this.initControllers();
    }

    registerAppGet(location: string | RegExp, func: (req: express.Request, res: express.Response) => void): void {
        this.app.get(location, func);
    }

    registerAppPost(location: string | RegExp, func: (req: express.Request, res: express.Response) => void): void {
        this.app.post(location, func);
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
}
