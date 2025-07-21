import express from 'express';

import { sendQuery } from '../config/db/dbConfig.js';
import HTTPError from '../models/HTTPError.js';

export const areaRouter = express.Router();

areaRouter.get('/', async (req, res) => {
    const areas = await sendQuery('SELECT * FROM areas');
    res.send({ message: 'Areas list', data: areas });
});

areaRouter.post('/', async (req, res) => {
    const { areaName } = req.body;

    const [areaByName] = await sendQuery(
        'SELECT * FROM areas WHERE name = $1',
        [areaName]
    );

    if (areaByName) throw new HTTPError(400, 'Area already exists.');

    const [newArea] = await sendQuery(
        'INSERT INTO areas (name) VALUES ($1) RETURNING *',
        [areaName]
    );

    res.status(201).send({ message: 'Area created', data: newArea });
});

areaRouter.patch('/:area_id', async (req, res) => {
    const { area_id } = req.params;

    const { name } = req.body;

    const [updatedArea] = await sendQuery(
        'UPDATE areas SER name = $1 WHERE area_id = $2 RETURNING *',
        [name, area_id]
    );

    if (!updatedArea) throw new HTTPError(404, 'Area not found.');

    res.status(200).send({ message: 'Area updated', data: updatedArea });
});

areaRouter.delete('/:area_id', async (req, res) => {
    const { area_id } = req.params;

    const [areaFound] = await sendQuery(
        'SELECT * FROM areas WHERE area_id = $1',
        [area_id]
    );

    if (!areaFound) throw new HTTPError(404, 'Area not found.');

    const [deletedArea] = await sendQuery(
        'DELETE FROM areas WHERE housing_id = $1 RETURNING *',
        [area_id]
    );

    res.status(200).send({ message: 'Area deleted', data: deletedArea });
});
