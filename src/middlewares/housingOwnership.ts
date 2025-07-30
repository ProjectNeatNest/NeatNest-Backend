import { NextFunction, Request, Response } from 'express';
import HTTPError from '../models/HTTPError.js';
import { sendQuery } from '../config/db/dbConfig.js';
import { AuthorizedRequest } from '../config/types.js';

export async function housingOwnership(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { user_id } = (req as AuthorizedRequest).user;
    const { housing_id } = req.params;

    if (!housing_id) throw new HTTPError(400, 'Housing id not found.');

    const ownershipCheck = await sendQuery(
        'SELECT user_id FROM users_housings WHERE user_id = $1 AND housing_id = $2',
        [user_id, housing_id]
    );

    if (ownershipCheck.length === 0) {
        throw new HTTPError(403, 'Access denied. You need to own the housing.');
    }

    next();
}
