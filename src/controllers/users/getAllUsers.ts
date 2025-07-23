import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';

export default async function getAllUsers(req: Request, res: Response) {
    const users = await sendQuery('SELECT * FROM users');
    res.send({ message: 'Users list', data: users });
}