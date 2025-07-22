import { NextFunction, Request, Response } from 'express';
import HTTPError from '../models/HTTPError.js';
import jwt from 'jsonwebtoken';
import { AuthorizedRequest, AuthorizedUser } from '../config/types.js';

export function userAuth(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (
        typeof authorization !== 'string' ||
        !authorization.startsWith('Bearer')
    )
        throw new HTTPError(401, 'Token no existente o inválido');

    const token = authorization.split(' ')[1];

    if (!token) throw new HTTPError(401, 'No se encontró el token');

    const verifiedUser = jwt.verify(
        token,
        process.env.TOKEN_SECRET!
    ) as AuthorizedUser;

    console.log(verifiedUser);

    (req as AuthorizedRequest).user = verifiedUser;

    next();
}
