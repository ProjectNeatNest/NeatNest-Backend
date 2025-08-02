import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function getAllTasksFromArea(req: Request, res: Response) {
   // const { user_id } = (req as AuthorizedRequest).user;
    const { area_id, housing_id } = req.params;

    const [housingOwnsArea] = await sendQuery(
        'SELECT * FROM areas WHERE housing_id = $1',
        [housing_id]
    );

    if (!housingOwnsArea) throw new HTTPError(404, 'Area is not part of the housing.');

    const tasks = await sendQuery(
        'SELECT * FROM tasks WHERE area_id = $1',
        [area_id]
    );

    res.send({ message: 'Tasks list', data: tasks });

}
