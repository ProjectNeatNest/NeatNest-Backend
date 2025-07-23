import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';

export default async function getAllHousings(req: Request, res: Response) {
    const housings = await sendQuery('SELECT * FROM housings');
    res.send({ message: 'Housings list', data: housings });
}
