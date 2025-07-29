import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import { AuthorizedRequest } from '../../config/types.js';

export default async function getAllAreas(req: Request, res: Response) {
    const { user_id } = (req as AuthorizedRequest).user;

    const { housing_id } = req.body;


    const housingUsersIds = await sendQuery('SELECT user_id FROM users_housings WHERE housing_id = $1'); 

    console.log(housingUsersIds);

    

    const areas = await sendQuery(
        'SELECT name FROM areas WHERE housing_id = $1',
        [housing_id]
    );

    res.send({ message: 'Areas list', data: areas });
}
