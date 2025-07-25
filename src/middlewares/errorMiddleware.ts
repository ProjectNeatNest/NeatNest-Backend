import { ZodError } from 'zod/v4';
import { NextFunction, Request, Response } from 'express';

import HTTPError from '../models/HTTPError.js';
import prettifyZodErrors from '../helpers/prettifyZodErrors.js';

export default function errorMiddleware(
    error: Error | HTTPError | ZodError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof HTTPError) {
        console.log('❌ HTTP Error: ', error.message);

        res.status(error.statusCode).send({ error: error.message });
        return;
    }
    if (error instanceof ZodError) {
        console.log('❌ Zod Error: ', error.message);
        const prettifiedErrors = prettifyZodErrors(error);
        res.status(400).send({ error: prettifiedErrors });
        return;
    }

    console.log('❌ Error: ', error.message);

    res.status(500).send({ error: error.message });
}
