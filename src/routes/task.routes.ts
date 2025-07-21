import express from 'express';

import { sendQuery } from '../config/db/dbConfig.js';
import HTTPError from '../models/HTTPError.js';
import { housingRouter } from './housing.routes.js';

export const taskRouter = express.Router();

taskRouter.get('/', async (req, res) => {
    const tasks = await sendQuery('SELECT * FROM tasks');
    res.send({ message: 'Tasks list', data: tasks });
});

taskRouter.post('/', async (req, res) => {
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
});

taskRouter.patch('/:task_id', async (req, res) => {
    const { task_id } = req.params;

    const { name } = req.body;

    const [updatedTask] = await sendQuery(
        'UPDATE tasks SET name = $1 WHERE task_id = $2 RETURNING *',
        [name, task_id]
    );

    if (!updatedTask) throw new HTTPError(404, 'Task not found.');

    res.status(200).send({ message: 'Task updated', data: updatedTask });
});

housingRouter.delete('/:task_id', async (req, res) => {
    const { task_id } = req.params;

    const [taskFound] = await sendQuery(
        'SELECT * FROM tasks WHERE tasks_id = $1',
        [task_id]
    );

    if (!taskFound) throw new HTTPError(404, 'Task not found.');

    const [deletedTask] = await sendQuery(
        'DELETE FROM tasks WHERE task_id = $1 RETURNING *',
        [task_id]
    );

    res.status(200).send({ message: 'Task deleted', data: deletedTask });
});
