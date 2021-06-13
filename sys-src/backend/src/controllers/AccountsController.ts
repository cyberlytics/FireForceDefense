import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import Joi from 'joi';
import validateRequestSchema from '../RequestSchemaValidator';

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
            confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        });
        validateRequestSchema(req, next, schema);
    };

    private register = (req: Request, res: Response) => {
        // TODO
        return res.status(200).json({ message: 'Register' });
    };

    private loginSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            username: Joi.string().optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().min(4).required(),
        });
        validateRequestSchema(req, next, schema);
    };

    private login = (req: Request, res: Response) => {
        // TODO
        return res.status(200).json({ message: 'Login' });
    };

    private refreshTokenSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            token: Joi.string().empty(''),
            ipAddress: Joi.string().empty(''),
        });
        validateRequestSchema(req, next, schema);
    };

    private refreshToken = (req: Request, res: Response) => {
        // TODO
        return res.status(200).json({ message: 'Refresh Token' });
    };

    private revokeTokenSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            token: Joi.string().empty(''),
        });
        validateRequestSchema(req, next, schema);
    };

    private revokeToken = (req: Request, res: Response) => {
        // TODO
        return res.status(200).json({ message: 'Revoke token' });
    };
}
