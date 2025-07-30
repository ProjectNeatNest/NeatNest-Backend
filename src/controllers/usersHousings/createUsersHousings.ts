import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import { AuthorizedRequest } from '../../config/types.js';

export default async function createUsersHousings(req: Request, res: Response) {
    const { user_id } = (req as AuthorizedRequest).user;

    const { name, cohabitants, defaultAreas } = req.body;

    const [newHousing] = await sendQuery(
        'INSERT INTO housings (name) VALUES ($1) RETURNING *',
        [name]
    );

    await sendQuery(
        'INSERT INTO users_housings (user_id, housing_id, is_admin) VALUES ($1, $2, $3)',
        [user_id, newHousing.housing_id, true]
    );

    for (const email of cohabitants) {
        const [existingCohabitant] = await sendQuery(
            'SELECT user_id FROM users WHERE email = $1',
            [email]
        );
        if (!existingCohabitant) continue;

        await sendQuery(
            'INSERT INTO users_housings (user_id, housing_id) VALUES ($1, $2)',
            [existingCohabitant.user_id, newHousing.housing_id]
        );

    }

    // TODO: Añadir las areas

    res.status(201).send({
        message: 'Housing created successfully',
        data: newHousing,
    });
}
