import express from 'express';

import getAllHousings from '../controllers/housings/getAllHousings.js';
import createHousing from '../controllers/housings/createHousing.js';
import updateHousing from '../controllers/housings/updateHousing.js';
import deleteHousing from '../controllers/housings/deleteHousing.js';
import { userAuth } from '../middlewares/userAuth.js';

export const housingsRouter = express.Router();

housingsRouter.get('/', userAuth, getAllHousings);
housingsRouter.post('/', userAuth, createHousing);
housingsRouter.patch('/:housing_id', userAuth, updateHousing);
housingsRouter.delete('/:housing_id', userAuth, deleteHousing);
