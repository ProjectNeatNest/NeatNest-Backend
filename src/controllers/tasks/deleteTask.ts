import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function deleteTask(req: Request, res: Response) {
    const { task_id } = req.params;

    const [taskFound] = await sendQuery(
        'SELECT * FROM tasks WHERE task_id = $1',
        [task_id]
    );

    if (!taskFound) throw new HTTPError(404, 'Task not found.');

    const [deletedTask] = await sendQuery(
        'DELETE FROM tasks WHERE task_id = $1 RETURNING *',
        [task_id]
    );

    res.status(200).send({ message: 'Task deleted', data: deletedTask });
}
