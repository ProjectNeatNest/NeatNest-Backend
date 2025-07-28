import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function createUsersHousings(req: Request, res: Response) {
    const { user_id, housing_id, is_Admin } = req.body;

    if (!user_id || !housing_id || !is_Admin) {
        throw new HTTPError(400, 'Missing required fields.');
    }

    const [userHousingByUserAndHousing] = await sendQuery(
        'SELECT * FROM users_housings WHERE user_id = $1 AND housing_id = $2',
        [user_id, housing_id]
    );

    if (userHousingByUserAndHousing)
        throw new HTTPError(400, 'User already exists in housing.');

    const [newUserHousing] = await sendQuery(
        'INSERT INTO users_housings (user_id, housing_id, is_Admin) VALUES ($1, $2, $3) RETURNING *',
        [user_id, housing_id, is_Admin]
    );

    res.status(201).send({
        message: 'User created in housing',
        data: newUserHousing,
    });
}
