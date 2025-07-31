import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function updateArea(req: Request, res: Response) {
  
    const { area_id } = req.params;

    const { name } = req.body;

    const [updatedArea] = await sendQuery(
        'UPDATE areas SET name = $1 WHERE area_id = $2 RETURNING *',
        [name, area_id]
    );

    if (!updatedArea) throw new HTTPError(404, 'Area not found.');

    res.status(200).send({ message: 'Area updated', data: updatedArea });
}
