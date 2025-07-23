import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function deleteHousing(req: Request, res: Response) {
    const { housing_id } = req.params;

    const [housingFound] = await sendQuery(
        'SELECT * FROM housings WHERE housing_id = $1',
        [housing_id]
    );

    if (!housingFound) throw new HTTPError(404, 'Housing not found.');

    const [deletedHousing] = await sendQuery(
        'DELETE FROM housings WHERE housing_id = $1 RETURNING *',
        [housing_id]
    );

    res.status(200).send({ message: 'Housing deleted', data: deletedHousing });
}
