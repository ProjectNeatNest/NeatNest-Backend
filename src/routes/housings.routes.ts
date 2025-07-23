import express from 'express';

import getAllHousings from '../controllers/housings/getAllHousings.js';
import createHousing from '../controllers/housings/createHousing.js';
import updateHousing from '../controllers/housings/updateHousing.js';
import deleteHousing from '../controllers/housings/deleteHousing.js';

export const housingsRouter = express.Router();

housingsRouter.get('/', getAllHousings);
housingsRouter.post('/', createHousing);
housingsRouter.patch('/:housing_id', updateHousing);
housingsRouter.delete('/:housing_id', deleteHousing);
