import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function createTask(req: Request, res: Response) {
    const taskName = req.body;

    const [taskByName] = await sendQuery(
        'SELECT * FROM tasks WHERE name = $1',
        [taskName]
    );

    if (taskByName) throw new HTTPError(400, 'Task already exists.');

    const [newTask] = await sendQuery(
        'INSERT INTO tasks (name) VALUES ($1) RETURNING *',
        [taskName]
    );

    res.status(201).send({ message: 'Task created', data: newTask });
}
