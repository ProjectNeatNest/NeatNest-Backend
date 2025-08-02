import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';

export default async function getAllTasksFromUsers(req: Request, res: Response) {
    const { user_id, area_id } = req.params;

    const tasks = await sendQuery(
        'SELECT * FROM tasks WHERE user_id = $1 AND area_id = $2',
        [user_id, area_id]
    );

    res.send({ message: 'User tasks list', data: tasks });
}