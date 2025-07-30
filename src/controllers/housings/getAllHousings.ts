import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import { AuthorizedRequest } from '../../config/types.js';

export default async function getAllHousings(req: Request, res: Response) {
    const { user_id } = (req as AuthorizedRequest).user;

    const housingUsersIds = await sendQuery('SELECT housing_id FROM users_housings WHERE user_id = $1', [user_id]);
    const ids = housingUsersIds.map(housing => housing.housing_id);
    
    const housings = await sendQuery(
        'SELECT * FROM housings WHERE housing_id = ANY($1)',
        [ids]
    )
    

    res.send({ message: 'Housings list', data: housings });
}
