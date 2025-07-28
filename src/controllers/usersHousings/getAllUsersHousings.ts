import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';

export default async function getAllUsersHousings(req: Request, res: Response) {
    const userHousings = await sendQuery('SELECT * FROM users_housings');
    res.send({ message: 'Users in housing list', data: userHousings });
}
