import type {NextFunction, Request, Response} from 'express';
import {Router} from 'express';
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
        const id = req.params.id
        Scores.findById(id)
            .exec()
            .then(results => {
                return res.status(200).json({
                    scoreData: results
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    };

    private deleteScoresById = (req: Request, res: Response) => {
        const id = req.params.id
        Scores.deleteOne({id: id})
            .exec()
            .then(results => {
                return res.status(200).json({
                    scoreData: results
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    };

    private scoresSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            username: Joi.string().required(),
            date: Joi.date().required(),
            level: Joi.number().integer().required(),
            stars: Joi.number().integer().max(3).required(),
            money: Joi.number().integer().required(),
            burnedFields: Joi.number().integer().required(),
        });
        validateRequestSchema(req, next, schema);
    };

    //todo update for id (or username+level in case username is unique)
    private saveScores = (req: Request, res: Response) => {
        let {id, username, date, level, stars, money, burnedFields} = req.body;
        //if(isSet(id)){
        // do update otherwise insert new data
        //}

        const scores = new Scores({
            _id: new mongoose.Types.ObjectId(),
            username,
            date,
            level,
            stars,
            money,
            burnedFields
        });

        return scores
            .save()
            .then((result) => {
                return res.status(201).json({
                    scoreData: result
                })
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    };
}
