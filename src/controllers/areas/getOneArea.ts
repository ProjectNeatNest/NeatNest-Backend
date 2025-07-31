import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function getOneArea(req: Request, res: Response) {
   const { housing_id, area_id } = req.params; 

   const [area] = await sendQuery(
      'SELECT * FROM areas WHERE housing_id = $1 AND area_id = $2',
      [housing_id, area_id]
   );

   if (!area) throw new HTTPError(404, 'Area not found');

   res.send({ message: 'Area details', data: area})
}