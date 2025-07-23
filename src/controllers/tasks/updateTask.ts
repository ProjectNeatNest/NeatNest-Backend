import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function updateTask(req: Request, res: Response) {
    const { task_id } = req.params;

    const { name } = req.body;

    const [updatedTask] = await sendQuery(
        'UPDATE tasks SET name = $1 WHERE task_id = $2 RETURNING *',
        [name, task_id]
    );

    if (!updatedTask) throw new HTTPError(404, 'Task not found.');

    res.status(200).send({ message: 'Task updated', data: updatedTask });
}
