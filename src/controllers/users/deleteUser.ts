import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function deleteUser(req: Request, res: Response) {
    const { user_id } = req.params;

    const [userFound] = await sendQuery(
        'SELECT * FROM users WHERE user_id = $1',
        [user_id]
    );

    if (!userFound) throw new HTTPError(404, 'User not found.');

    const [deletedUser] = await sendQuery(
        'DELETE FROM users WHERE user_id = $1 RETURNING *',
        [user_id]
    );

    res.status(200).send({ message: 'User deleted', data: deletedUser });
}