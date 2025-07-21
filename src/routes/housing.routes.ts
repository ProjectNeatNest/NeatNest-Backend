import express from 'express';

import { sendQuery } from '../config/db/dbConfig.js';
import HTTPError from '../models/HTTPError.js';

export const housingRouter = express.Router();

housingRouter.get('/', async (req, res) => {
    const housings = await sendQuery('SELECT * FROM housings');
    res.send({ message: 'Housings list', data: housings });
});

housingRouter.post('/', async (req, res) => {
    const housingName = req.body;

    const [housingByName] = await sendQuery(
        'SELECT * FROM housings WHERE name = $1',
        [housingName]
    );

    if (housingByName) throw new HTTPError(400, 'Housing already exists.');

    const [newHousing] = await sendQuery(
        'INSERT INTO housings (name) VALUES ($1) RETURNING *',
        [housingName]
    );

    res.status(201).send({ message: 'Housing created', data: newHousing });
});

housingRouter.patch('/:housing_id', async (req, res) => {
    const { housing_id } = req.params;

    const { name } = req.body;

    const [updatedHousing] = await sendQuery(
        'UPDATE housings SET name = $1 WHERE housing_id = $2 RETURNING *',
        [name, housing_id]
    );

    if (!updatedHousing) throw new HTTPError(404, 'Housing not found');

    res.status(200).send({ message: 'Housing updated', data: updatedHousing });
});

housingRouter.delete('/:housing_id', async (req, res) => {
    const { housing_id } = req.params;

    const [housingFound] = await sendQuery(
        'SELECT * FROM housings WHERE housing_id = $1',
        [housing_id]
    );

    if (!housingFound) throw new HTTPError(404, 'Housing not found.');

    const [deletedHousing] = await sendQuery(
        'DELETE FROM housings WHERE housing_id = $1 RETURNING *',
        [housing_id]
    );

    res.status(200).send({ message: 'Housing deleted', data: deletedHousing });
});
