import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import Joi from 'joi';
import validateRequestSchema from '../middleware/RequestSchemaValidator';
import * as accountService from '../services/AccountService';

/**
 * API Handling for /accounts paths.
 */
export default class AccountsController {
    public path = '/accounts';
    public router = Router();

    //Initialize routes and endpoints
    constructor() {
        this.router.post(`${this.path}/login`, this.loginSchema, this.login);
        this.router.post(`${this.path}/register`, this.registerSchema, this.register);
        this.router.post(`${this.path}/refresh-token`, this.refreshTokenSchema, this.refreshToken);
        this.router.post(`${this.path}/revoke-token`, this.revokeTokenSchema, this.revokeToken);
    }

    //Validate register post request
    private registerSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required(),
        });
        validateRequestSchema(req, next, schema);
    };
    //Handle register post request and response with user data
    private register = (req: Request, res: Response, next: NextFunction) => {
        const { username, email, password } = req.body;
        const ip = req.ip;
        accountService
            .register({ username, email, password, ip })
            .then(({ refreshToken, ...account }) => {
                this.refreshTokenCookie(res, refreshToken);
                res.json(account);
            })
            .catch(next);
    };
    //Validate login post request
    private loginSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            username: Joi.string().optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().min(4).required(),
        });
        validateRequestSchema(req, next, schema);
    };
    //Handle login post request and response with user data
    private login = (req: Request, res: Response, next: NextFunction) => {
        const { username, email, password } = req.body;
        const ip = req.ip;
        accountService
            .login({ username, email, password, ip })
            .then(({ refreshToken, ...account }) => {
                this.refreshTokenCookie(res, refreshToken);
                res.json(account);
            })
            .catch(next);
    };

    //Validate token post request
    private refreshTokenSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            token: Joi.string().empty(''),
            ip: Joi.string().empty(''),
        });
        validateRequestSchema(req, next, schema);
    };
    //Handle refresh token post request and response with new token
    private refreshToken = (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip;
        const token = req.cookies.refreshToken;
        accountService
            .refreshToken({ token, ip })
            .then(({ refreshToken, ...account }) => {
                this.refreshTokenCookie(res, refreshToken);
                res.json(account);
            })
            .catch(next);
    };

    private refreshTokenCookie = (res: Response, token: string) => {
        // refresh token expires after 24 hours
        const expireyDelta = 24 * 60 * 60 * 1000;
        const cookieOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + expireyDelta),
        };
        res.cookie('refreshToken', token, cookieOptions);
    };

    //Validate token post request
    private revokeTokenSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            token: Joi.string().empty(''),
        });
        validateRequestSchema(req, next, schema);
    };

    //Handle revoke token and response with status message
    private revokeToken = (req: Request, res: Response, next: NextFunction) => {
        const token = req.body.token || req.cookies.refreshToken;
        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }
        accountService
            .revokeToken({ token, ip: req.ip })
            .then(() => res.json({ message: 'Token successfully revoked' }))
            .catch(next);
    };
}
