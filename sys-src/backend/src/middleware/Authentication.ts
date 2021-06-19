import jwt from 'express-jwt';

const secret = process.env.SECRET_KEY;

export function authenticate(): jwt.RequestHandler[] {
    return [
        // authenticate with JWT token and attach user to request object
        jwt({ secret, algorithms: ['HS256'] }),
    ];
}
