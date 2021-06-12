import type {NextFunction, Request, Response} from 'express';
import {Router} from 'express';
import Joi from 'joi';
import mongoose from 'mongoose';
import validateRequestSchema from '../RequestSchemaValidator';
import LevelData from '../models/LevelData';

/**
 * API Handling for /game paths.
 */
export default class GameController {
    public path = '/game';
    public router = Router();

    constructor() {
        this.router.get(`${this.path}/:id`, this.getLevelDataById);
        this.router.delete(`${this.path}/:id`, this.deleteLevelDataById);

        this.router.post(`${this.path}/save`, this.levelDataSchema, this.saveLevelData);
    }

    private getLevelDataById = (req: Request, res: Response) => {
        const id = req.params.id
        LevelData.findById(id)
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

    private deleteLevelDataById = (req: Request, res: Response) => {
        const id = req.params.id
        LevelData.deleteOne({id: id})
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

    private levelDataSchema = (req: Request, res: Response, next: NextFunction) => {
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
    private saveLevelData = (req: Request, res: Response) => {
        let {username, date, level, stars, money, timeUsed, burnedFields} = req.body;

        const levelData = new LevelData({
            _id: new mongoose.Types.ObjectId(),
            username,
            date,
            level,
            stars,
            money,
            burnedFields
        });

        return levelData
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
