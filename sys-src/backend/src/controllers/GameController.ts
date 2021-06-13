import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import Joi from 'joi';
import mongoose from 'mongoose';
import validateRequestSchema from '../RequestSchemaValidator';
import Scores from '../models/Scores';

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

    private getScoresById = (req: Request, res: Response) => {
        const id = req.params.id;
        Scores.findById(id)
            .exec()
            .then((results) => {
                return res.status(200).json({
                    scoreData: results,
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error,
                });
            });
    };

    private deleteScoresById = (req: Request, res: Response) => {
        const id = req.params.id;
        Scores.deleteOne({ id: id })
            .exec()
            .then((results) => {
                return res.status(200).json({
                    scoreData: results,
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error,
                });
            });
    };

    private scoresSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            username: Joi.string().required(),
            level: Joi.number().integer().required(),
            stars: Joi.number().integer().max(3).required(),
            money: Joi.number().integer().required(),
            burnedFields: Joi.number().integer().required(),
        });
        validateRequestSchema(req, next, schema);
    };

    private saveScores = async (req: Request, res: Response) => {
        const { username, level, stars, money, burnedFields } = req.body;

        try {
            if (
                (await Scores.exists({
                    username: username,
                    level: level,
                })) === false
            ) {
                const scores = new Scores({
                    _id: new mongoose.Types.ObjectId(),
                    username,
                    level,
                    stars,
                    money,
                    burnedFields,
                });

                return scores
                    .save()
                    .then((result) => {
                        return res.status(201).json({
                            scoreData: result,
                            message: 'New data inserted',
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            message: error.message,
                            error,
                        });
                    });
            } else {
                const filter = { username: username, level: level };
                const update = { stars: stars, money: money, burnedFields: burnedFields };

                return Scores.findOneAndUpdate(filter, update)
                    .then((result) => {
                        return res.status(201).json({
                            scoreData: result,
                            message: 'Old data updated',
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            message: error.message,
                            error,
                        });
                    });
            }
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                error,
            });
        }
    };
}
