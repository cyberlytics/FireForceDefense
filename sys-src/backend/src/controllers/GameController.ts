import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import Joi from 'joi';
import validateRequestSchema from '../middleware/RequestSchemaValidator';
import * as gameService from '../services/GameServices';

/**
 * API Handling for /game paths.
 */
export default class GameController {
    public path = '/game';
    public router = Router();

    constructor() {
        this.router.get(`${this.path}/:id`, this.getScoresById);
        this.router.delete(`${this.path}/:id`, this.deleteScoresById);

        this.router.post(`${this.path}/save`, this.scoresSchema, this.saveScores);
    }

    private getScoresById = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        gameService
            .findScoreById(id)
            .then((results) => {
                return res.json({
                    scoreData: results,
                });
            })
            .catch(next);
    };

    private deleteScoresById = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        gameService
            .deleteScoreById(id)
            .then((result) => {
                res.json({
                    deletedData: result,
                    message: 'Scores deleted!',
                });
            })
            .catch(next);
    };

    private saveScores = async (req: Request, res: Response, next: NextFunction) => {
        const { username, level, stars, money, burnedFields, time } = req.body;

        try {
            if ((await gameService.userCheck(username, level)) === false) {
                return gameService
                    .createScore({ username, level, stars, money, burnedFields, time })
                    .then((result) => {
                        return res.json({
                            scoreData: result,
                            message: 'New data inserted',
                        });
                    })
                    .catch(next);
            } else {
                return gameService
                    .updateScore({ username, level, stars, money, burnedFields, time })
                    .then((result) => {
                        return res.json({
                            scoreData: result,
                            message: 'Old data updated',
                        });
                    })
                    .catch(next);
            }
        } catch (error) {
            return res.json({
                message: error.message,
                error,
            });
        }
    };

    private scoresSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            username: Joi.string().required(),
            level: Joi.number().integer().required(),
            stars: Joi.number().integer().max(3).required(),
            money: Joi.number().integer().required(),
            burnedFields: Joi.number().integer().required(),
            time: Joi.number().integer().required(),
        });
        validateRequestSchema(req, next, schema);
    };
}
