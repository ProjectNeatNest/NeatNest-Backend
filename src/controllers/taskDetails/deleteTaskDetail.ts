import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function deleteTaskDetail(req: Request, res: Response) {
    const { task_details_id } = req.params;

    const [taskDetailFound] = await sendQuery(
        'SELECT * FROM task_details WHERE task_details_id = $1',
        [task_details_id]
    );

    if (!taskDetailFound) throw new HTTPError(404, 'Task detail not found');

    const [deletedTaskDetail] = await sendQuery(
        'DELETE FROM task_details WHERE task_details_id = $1 RETURNING *',
        [task_details_id]
    );

    res.status(200).send({
        message: 'Task detail deleted',
        data: deletedTaskDetail,
    });
}
