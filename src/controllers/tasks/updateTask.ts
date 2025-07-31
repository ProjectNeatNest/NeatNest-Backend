import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function updateTask(req: Request, res: Response) {
    const { task_id } = req.params;

    const { name, area_id, user_id, limit_date, is_completed, duration } = req.body;

    const [updatedTask] = await sendQuery(
        'UPDATE tasks SET name = $1, area_id = $2, user_id = $3, limit_date = $4, is_completed = $5, duration = $6 WHERE task_id = $7 RETURNING *',
        [name, area_id, user_id, limit_date, is_completed, duration, task_id]
    );

    if (!updatedTask) throw new HTTPError(404, 'Task not found.');

    res.status(200).send({ message: 'Task updated', data: updatedTask });
}
