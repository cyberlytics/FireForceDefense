import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import Joi from 'joi';
import validateRequestSchema from './RequestSchemaValidator';

/**
 * API Handling for /game paths.
 */
export default class GameController {
    public path = '/game';
    public router = Router();

    constructor() {
        this.router.get(`${this.path}/:id`, this.getLevelDataById);
        this.router.delete(`${this.path}/:id`, this.deleteLevelDataById);

        this.router.post(`${this.path}/save`, this.dataSchema, this.saveLevelData);
    }

    private getLevelDataById = (req: Request, res: Response) => {
        // TODO
        return res.status(200).json({ message: 'Get level data by id' });
    };

    private deleteLevelDataById = (req: Request, res: Response) => {
        // TODO
        return res.status(200).json({ message: 'Delete level data by id' });
    };

    //not final
    private dataSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            user: Joi.object({
                name: Joi.string().empty('').required(),
            }),
            date: Joi.date(),
            level: Joi.number().integer().required(),
            stars: Joi.number().integer().required(),
            money: Joi.number().integer().required(),
            timeUsed: Joi.string().empty('').required(),
            burnedFields: Joi.string().empty('').required(),
        });
        validateRequestSchema(req, next, schema);
    };

    private saveLevelData = (req: Request, res: Response) => {
        // TODO
        return res.status(200).json({ message: 'Data saved' });
    };
}
