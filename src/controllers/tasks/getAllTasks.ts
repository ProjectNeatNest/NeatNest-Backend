import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';

export default async function getAllTasks(req: Request, res: Response) {
    const tasks = await sendQuery('SELECT * FROM tasks');
    res.send({ message: 'Tasks list', data: tasks });
}
