import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';


export default async function getAllTasks(req: Request, res: Response) {

    const { task_id } = req.params;

    const taskDetails = await sendQuery(
        'SELECT * FROM task_details WHERE task_id= $1',
        [task_id]
    );

    res.send({ message: 'Task details', data: taskDetails });
}