import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function createArea(req: Request, res: Response) {
    const { areaName } = req.body;

    const [areaByName] = await sendQuery(
        'SELECT * FROM areas WHERE name = $1',
        [areaName]
    );

    if (areaByName) throw new HTTPError(400, 'Area already exists.');

    const [newArea] = await sendQuery(
        'INSERT INTO areas (name) VALUES ($1) RETURNING *',
        [areaName]
    );

    res.status(201).send({ message: 'Area created', data: newArea });
}
