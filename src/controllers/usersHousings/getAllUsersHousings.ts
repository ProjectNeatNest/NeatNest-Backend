import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';

export default async function getAllUsersHousings(req: Request, res: Response) {
    const { housing_id } = req.params;

    const userHousings = await sendQuery(
        'SELECT * FROM users_housings WHERE housing_id = $1',
        [housing_id]
    );

    const userIds = userHousings.map(userHousing => userHousing.user_id);

    const users = await sendQuery('SELECT * FROM users WHERE user_id IN (' + userIds.join(',') + ')');

    res.send({ message: 'Users in housing list', data: users });
}
