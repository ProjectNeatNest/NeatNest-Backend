import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function getOneTask(req: Request, res: Response) {
   const { task_id, area_id } = req.params; 

   const [task] = await sendQuery(
      'SELECT * FROM tasks WHERE task_id = $1 AND area_id = $2',
      [task_id, area_id]
   );

   if (!task) throw new HTTPError(404, 'Task not found');

   res.send({ message: 'Task details', data: task})
}