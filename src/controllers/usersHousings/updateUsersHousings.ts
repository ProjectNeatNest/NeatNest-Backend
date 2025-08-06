import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function updateUsersHousings(req: Request, res: Response) {
    const { user_id } = req.params;

    const { housing_id, is_Admin } = req.body;

    const [updatedUserHousing] = await sendQuery(
        'UPDATE users_housings SET housing_id = $1, is_Admin = $2 WHERE user_id = $3 RETURNING *',
        [housing_id, is_Admin, user_id]
    );

    if (!updatedUserHousing)
        throw new HTTPError(404, 'Usuario no encontrado en la vivienda.');

    res.status(200).send({
        message: 'Usuario actualizado en la vivienda.',
        data: updatedUserHousing,
    });
}
