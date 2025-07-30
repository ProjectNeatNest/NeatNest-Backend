import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';

export default async function getAllAreas(req: Request, res: Response) {

    const { housing_id } = req.params;

    const areas = await sendQuery(
        'SELECT * FROM areas WHERE housing_id = $1',
        [housing_id]
    );

    res.send({ message: 'Areas list', data: areas });
}
