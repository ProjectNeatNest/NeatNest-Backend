import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function getAllTasksFromUser(req: Request, res: Response) {
    const { user_id, area_id, housing_id } = req.params;

    const [userBelongsToHousing] = await sendQuery(
        'SELECT * FROM users WHERE user_id = $1 AND housing_id = $2',
        [user_id, housing_id]
    );

    if (!userBelongsToHousing) throw new HTTPError(404, 'User does not belong to this housing.');

    const [areaBelongsToHousing] = await sendQuery(
        'SELECT * FROM areas WHERE area_id = $1 AND housing_id = $2',
        [area_id, housing_id]
    );

    if (!areaBelongsToHousing) throw new HTTPError(404, 'Area is not part of the housing.');

    const tasks = await sendQuery(
        'SELECT * FROM tasks WHERE user_id = $1 AND area_id = $2',
        [user_id, area_id]
    );

    res.send({ message: 'User tasks list', data: tasks });
}
