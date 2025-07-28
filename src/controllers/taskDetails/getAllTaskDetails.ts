import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';

export default function getAllTaskDetails(req: Request, res: Response) {
    const taskDetails = sendQuery('SELECT * FROM task_details');
    res.send({ message: 'Task details list', data: taskDetails });
}
