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

    constructor() {
        this.router.get(`${this.path}/:id`, this.getAccountById);
        this.router.delete(`${this.path}/:id`, this.deleteAccountById);

        this.router.post(`${this.path}/login`, this.loginSchema, this.login);
        this.router.post(`${this.path}/register`, this.registerSchema, this.register);
        this.router.post(`${this.path}/refresh-token`, this.refreshTokenSchema, this.refreshToken);
        this.router.post(`${this.path}/revoke-token`, this.revokeTokenSchema, this.revokeToken);
    }

    private getAccountById = (req: Request, res: Response) => {
        // TODO
        return res.status(200).json({ message: 'Get account by id' });
    };

    private deleteAccountById = (req: Request, res: Response) => {
        // TODO
        return res.status(200).json({ message: 'Delete account by id' });
    };

    private registerSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required(),
        });
        validateRequestSchema(req, next, schema);
    };

    private register = (req: Request, res: Response) => {
        const { username, email, password } = req.body;
        const ip = req.ip;
        accountService.register({ username, email, password, ip }).then(({ refreshToken, ...account }) => {
            this.refreshTokenCookie(res, refreshToken);
            res.json(account);
        });
    };

    private loginSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            username: Joi.string().optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().min(4).required(),
        });
        validateRequestSchema(req, next, schema);
    };

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

    private refreshTokenSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            token: Joi.string().empty(''),
            ip: Joi.string().empty(''),
        });
        validateRequestSchema(req, next, schema);
    };

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

    private revokeTokenSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            token: Joi.string().empty(''),
        });
        validateRequestSchema(req, next, schema);
    };

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
