import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function updateTaskDetail(req: Request, res: Response) {
    const { task_details_id } = req.params;

    const { user_id, task_id, limit_date, is_completed } = req.body;

    const [updatedTaskDetail] = await sendQuery(
        'UPDATE task_details SER user_id = $1, task_id = $2, limit_date = $3, is_completed = $4 WHERE task_details_id = $5 RETURNING *',
        [user_id, task_id, limit_date, is_completed, task_details_id]
    );

    if (!updatedTaskDetail) throw new HTTPError(404, 'Task detail not found.');

    res.status(200).send({
        message: 'Task detail updated',
        data: updatedTaskDetail,
    });
}
