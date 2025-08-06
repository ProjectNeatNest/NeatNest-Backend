import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function createHousing(req: Request, res: Response) {
    const { name: housingName } = req.body;

    const [housingByName] = await sendQuery(
        'SELECT * FROM housings WHERE name = $1',
        [housingName]
    );

    if (housingByName) throw new HTTPError(400, 'Housing already exists.');

    const [newHousing] = await sendQuery(
        'INSERT INTO housings (name) VALUES ($1) RETURNING *',
        [housingName]
    );

    res.status(201).send({ message: 'Vivienda creada.', data: newHousing });
}
