import { NextFunction, Request, Response } from 'express';
import HTTPError from '../models/HTTPError.js';
import jwt from 'jsonwebtoken';
import { AuthorizedRequest, AuthorizedUser } from '../config/types.js';

export function userAuth(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (
        typeof authorization !== 'string' ||
        !authorization.startsWith('Bearer ')
    )
        throw new HTTPError(401, 'Invalid or non-existent Token.');

    const token = authorization.split(' ')[1];

    if (!token) throw new HTTPError(401, 'Token not found.');

    try {
        const verifiedUser = jwt.verify(
            token,
            process.env.TOKEN_SECRET!
        ) as AuthorizedUser;


        (req as AuthorizedRequest).user = verifiedUser;

        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        throw new HTTPError(401, 'Non-valid Token.');
    }
}
