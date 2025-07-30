import express from 'express';

import getAllHousings from '../controllers/housings/getAllHousings.js';
import createHousing from '../controllers/housings/createHousing.js';
import updateHousing from '../controllers/housings/updateHousing.js';
import deleteHousing from '../controllers/housings/deleteHousing.js';
import createUsersHousings from '../controllers/usersHousings/createUsersHousings.js';

import { areasRouter } from './areas.routes.js';

import { userAuth } from '../middlewares/userAuth.js';
import { housingOwnership } from '../middlewares/housingOwnership.js';
import { adminAuth } from '../middlewares/adminAuth.js';

export const housingsRouter = express.Router();

housingsRouter.get('/', userAuth, getAllHousings);
housingsRouter.post('/', userAuth, createUsersHousings);
housingsRouter.patch('/:housing_id', userAuth, housingOwnership, updateHousing);
housingsRouter.delete('/:housing_id', userAuth, housingOwnership, adminAuth, deleteHousing);


// Routing to /housings/:housing_id
housingsRouter.use('/:housing_id', userAuth, housingOwnership, areasRouter);



// housingsRouter.get('/:housing_id/areas', userAuth, getAllAreas);
// housingsRouter.post('/:housing_id/areas', userAuth, createArea);
// housingsRouter.get('/:housing_id/areas/:area_id', userAuth, getOneArea);
// housingsRouter.patch('/:housing_id/areas/:area_id', userAuth, updateArea);
// housingsRouter.delete('/:housing_id/areas/:area_id', userAuth, deleteArea);
