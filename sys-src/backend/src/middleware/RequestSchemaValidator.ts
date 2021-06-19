import type { Request, NextFunction } from 'express';
import type Joi from 'joi';

export default function validateRequestSchema(req: Request, next: NextFunction, schema: Joi.Schema): void {
    const validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };
    const { error, value } = schema.validate(req.body, validationOptions);
    if (error) {
        next(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}
