import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function updateHousing(req: Request, res: Response) {
    const { housing_id } = req.params;

    const { name } = req.body;

    const [updatedHousing] = await sendQuery(
        'UPDATE housings SET name = $1 WHERE housing_id = $2 RETURNING *',
        [name, housing_id]
    );

    if (!updatedHousing) throw new HTTPError(404, 'Housing not found');

    res.status(200).send({ message: 'Vivienda actulizada.', data: updatedHousing });
}
