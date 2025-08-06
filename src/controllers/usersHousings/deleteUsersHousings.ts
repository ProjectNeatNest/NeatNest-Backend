import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

interface AuthenticatedRequest extends Request {
    user?: {
        user_id: string;
    };
}

export default async function deleteUsersHousings(
    req: AuthenticatedRequest,
    res: Response
) {
    const { user_id, housing_id } = req.params;

    if (!user_id || !housing_id)
        throw new HTTPError(400, 'Missing required fields.');

    const userHousingFound = await sendQuery(
        'SELECT * FROM users_housings WHERE user_id = $1 AND housing_id = $2',
        [user_id, housing_id]
    );

    if (userHousingFound.length === 0) {
        throw new HTTPError(404, 'Usuario no encontrado en la vivienda.');
    }

    if (userHousingFound[0].is_Admin) {
        const adminCount = await sendQuery(
            'SELECT COUNT(*) as count FROM users_housings WHERE housing_id = $1 AND is_Admin = TRUE',
            [housing_id]
        );

        if (adminCount[0].count <= 1) {
            throw new HTTPError(
                400,
                'Cannot remove the last admin from housing.'
            );
        }
    }

    const deletedUserHousing = await sendQuery(
        'DELETE FROM users_housings WHERE user_id = $1 AND housing_id = $2 RETURNING *',
        [user_id, housing_id]
    );

    res.status(200).send({
        message: 'Usuario eliminado de la vivienda.',
        data: deletedUserHousing,
    });
}