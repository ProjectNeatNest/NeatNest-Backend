import bcrypt from 'bcrypt';

import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function updateUser(req: Request, res: Response) {
    const { user_id } = req.params;

    const { name, surname, surname_2, email, username, password } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const [updatedUser] = await sendQuery(
        'UPDATE users SET name = $1, surname = $2, surname_2 = $3, email = $4, username = $5, password = $6 WHERE user_id = $7 RETURNING *',
        [name, surname, surname_2, email, username, encryptedPassword, user_id]
    );

    if (!updatedUser) throw new HTTPError(404, 'User not found.');

    res.status(200).send({ message: 'Usuario actualizado.', data: updatedUser });
}