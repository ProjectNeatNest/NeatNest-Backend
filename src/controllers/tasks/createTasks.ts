import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function createTask(req: Request, res: Response) {
    const { name, area_id, duration } = req.body;

    if (!name || !area_id) {
        throw new HTTPError(400, 'Missing required fields.');
    }

    const [taskByName] = await sendQuery(
        'SELECT * FROM tasks WHERE name = $1',
        [name]
    );

    if (taskByName) throw new HTTPError(400, 'Task already exists.');

    const [newTask] = await sendQuery(
        'INSERT INTO tasks (name, area_id, duration) VALUES ($1, $2, $3) RETURNING *',
        [name, area_id, duration]
    );

    res.status(201).send({ message: 'Task created', data: newTask });
}
