import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function deleteArea(req: Request, res: Response) {
    const { area_id } = req.params;

    const [areaFound] = await sendQuery(
        'SELECT * FROM areas WHERE area_id = $1',
        [area_id]
    );

    if (!areaFound) throw new HTTPError(404, 'Area not found.');

    const [deletedArea] = await sendQuery(
        'DELETE FROM areas WHERE area_id = $1 RETURNING *',
        [area_id]
    );

    res.status(200).send({ message: 'Area deleted', data: deletedArea });
}
