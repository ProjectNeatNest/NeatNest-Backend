import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function createArea(req: Request, res: Response) {
    const { name: areaName, housing_id } = req.body;

    const [areaByName] = await sendQuery(
        'SELECT * FROM areas WHERE name = $1',
        [areaName]
    );

    if (areaByName) throw new HTTPError(400, 'Area already exists.');

    const [newArea] = await sendQuery(
        'INSERT INTO areas (name, housing_id) VALUES ($1, $2) RETURNING *',
        [areaName, housing_id]
    );

    res.status(201).send({ message: 'Area created', data: newArea });
}
