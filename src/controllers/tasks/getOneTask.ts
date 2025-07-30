import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';

export default async function getOneTask(req: Request, res: Response) {
   const { task_id, area_id } = req.body; 

   const task = await sendQuery(
      'SELECT name FROM tasks WHERE task_id = $1 AND area_id = $2',
      [task_id, area_id]
   );

   res.send({ message: 'Task details', data: task})
}