import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import Joi from 'joi';
import validateRequestSchema from '@middleware/RequestSchemaValidator';
import * as accountService from '@service/AccountService';

import { User } from './UserModel';
import { Secret } from './secret';
import jwt from 'jsonwebtoken';

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
        // TODO Testausgaben entfernen
        console.log('Username Request Body: ' + req.body.username);

        User.findOne({
            $or: [{ username: req.body.username }, { email: req.body.email }],
        }).exec((err: string, users: any) => {
            if (err) {
                // Server Error: Anfrage konnte nicht bearbeitet werden
                console.log('Error: ' + err);
                return res.status(500).send({ message: err });
            } else if (!users) {
                // Angefragter Benutzer wurde nicht gefunden
                console.log('Benutzer nicht gefunden!');
                return res.status(404).send({ message: 'User Not found.' });
            } else {
                // Angefragter Benutzer wurde gefunden
                // Passwort abgleichen
                // TODO Passworthash ableichen
                let validPassword;
                req.body.password == users.password ? (validPassword = true) : (validPassword = false);

                if (!validPassword) {
                    return res.status(401).send({
                        token: null,
                        message: 'Invalid Password!',
                    });
                }

                // TODO Anpassen
                //  bcrypt.compare(req.body.password, users.password).then((ismatch: boolean) => {
                //     // Javawebtoken mit einer Gültigkeit von 12 Stunden
                //      if(ismatch){
                //          const jwToken = jwt.sign({ id: users.id }, Secret.key, {
                //              expiresIn: 42200, // 12 hours
                //          });
                //         } else{
                //          return res.status(401).send({
                //              token: null,
                //              message: 'Invalid Password!',
                //          });
                //      }
                // })

                // Javawebtoken mit einer Gültigkeit von 12 Stunden
                const jwToken = jwt.sign({ id: users.id }, Secret.key, {
                    expiresIn: 42200, // 12 hours
                });

                // Response mit UserId, Username, Email und Token
                res.status(200).send({
                    id: users._id,
                    username: users.username,
                    email: users.email,
                    token: jwToken,
                });
            }
        });
    };

    private refreshTokenSchema = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            token: Joi.string().empty(''),
            ipAddress: Joi.string().empty(''),
        });
        validateRequestSchema(req, next, schema);
    };

    private refreshToken = (req: Request, res: Response, next: NextFunction) => {
        const ip: string = req.ip;
        const token: string = req.cookies.refreshToken;
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
            return res.status(400).json({ message: 'Token is required!' });
        }
        accountService.revokeToken({ token, ip: req.ip })
            .then(() => res.json({ message: 'Token revoked' }))
            .catch(next);
    };
}
