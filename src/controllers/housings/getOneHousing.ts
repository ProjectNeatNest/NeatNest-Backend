import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';

export default async function getOneHousing(req: Request, res: Response) {
   const { housing_id } = req.body; 

   const housing = await sendQuery(
      'SELECT name FROM housings WHERE housing_id = $1',
      [housing_id]
   );

   res.send({ message: 'Housing details', data: housing})
}