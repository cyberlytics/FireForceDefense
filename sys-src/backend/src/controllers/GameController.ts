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

    // Initialize routes and endpoints of the GameController
    constructor() {
        this.router.get(`${this.path}/score/:username`, this.getScoresByUsername);
        this.router.post(`${this.path}/score`, this.scoresSchema, this.saveScores);
        this.router.get(`${this.path}/scoreboard`, this.scoreboardSchema, this.getScoreBoard);
    }

    // Returns the score of a specific user
    private getScoresByUsername = (req: Request, res: Response, next: NextFunction) => {
        const username = req.params.username;
        gameService
            .findScoresByUsername(username)
            .then((results) => res.json(results?.[0]))
            .catch(next);
    };

    // Saves score in database via GameService
    private saveScores = async (req: Request, res: Response, next: NextFunction) => {
        const { username, level, stars, money, burnedFields, time } = req.body;

        try {
            if ((await gameService.userCheck(username, level)) === false) {
                // Return response with new score
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
                // Return response with updated score
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
            // Returns response with error message
            return res.json({
                message: error.message,
                error,
            });
        }
    };

    // Returns the scoreboard for the level contained in the request
    private getScoreBoard = (req: Request, res: Response, next: NextFunction) => {
        const level = req.query.level !== undefined ? req.query.level.toString() : null;
        gameService
            .findScoresByLevel(level)
            .then((results) => res.json(results))
            .catch(next);
    };

    // Validate userscore post request
    private scoresSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            username: Joi.string().required(),
            level: Joi.string().required(),
            stars: Joi.number().integer().min(0).max(3).required(),
            money: Joi.number().integer().min(0).required(),
            burnedFields: Joi.number().integer().min(0).required(),
            time: Joi.number().integer().min(0).required(),
        });
        validateRequestSchema(req, next, schema);
    };

    // Validate scoreboard post request
    private scoreboardSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            level: Joi.string(),
        });
        validateRequestSchema(req, next, schema);
    };
}
