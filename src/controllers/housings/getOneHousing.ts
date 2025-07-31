import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function getOneHousing(req: Request, res: Response) {
   const { housing_id } = req.params; 

   const [housing] = await sendQuery(
      'SELECT name FROM housings WHERE housing_id = $1',
      [housing_id]
   );

   if (!housing) throw new HTTPError(404, 'Housing not found');

   res.send({ message: 'Housing details', data: housing})
}