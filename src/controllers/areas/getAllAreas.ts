import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';

export default async function getAllAreas(req: Request, res: Response) {
    const areas = await sendQuery('SELECT * FROM areas');
    res.send({ message: 'Areas list', data: areas });
}
