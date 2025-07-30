import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';

export default async function getOneArea(req: Request, res: Response) {
   const { housing_id, area_id } = req.body; 

   const area = await sendQuery(
      'SELECT name FROM areas WHERE housing_id = $1 AND area_id = $2',
      [housing_id, area_id]
   );

   res.send({ message: 'Area details', data: area})
}