import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function createTaskDetail(req: Request, res: Response) {
    const { user_id, task_id, limit_date, is_completed } = req.body;

    if (!user_id || !task_id || !limit_date || !is_completed) {
        throw new HTTPError(400, 'Missing required fields.');
    }

    const [taskDetailByUser] = await sendQuery(
        'SELECT * FROM task_details WHERE user_id = $1 AND task_id = $2',
        [user_id, task_id]
    );

    if (taskDetailByUser)
        throw new HTTPError(400, 'Task detail already exists.');

    const [newTaskDetail] = await sendQuery(
        'INSERT INTO task_details (user_id, task_id, limit_date, is_completed) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, task_id, limit_date, is_completed]
    );

    res.status(201).send({
        message: 'Task detail created',
        data: newTaskDetail,
    });
}
