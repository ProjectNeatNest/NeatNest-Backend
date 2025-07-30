import express from 'express';

import getAllUsersHousings from '../controllers/usersHousings/getAllUsersHousings.js';
import createUsersHousings from '../controllers/usersHousings/createUsersHousings.js';
import updateUsersHousings from '../controllers/usersHousings/updateUsersHousings.js';
import deleteUsersHousings from '../controllers/usersHousings/deleteUsersHousings.js';
import { userAuth } from '../middlewares/userAuth.js';

export const housingsUsersRouter = express.Router({ mergeParams: true });;

housingsUsersRouter.get('/', userAuth, getAllUsersHousings);
housingsUsersRouter.post('/', userAuth, createUsersHousings);
housingsUsersRouter.patch('/:user_housing_id', userAuth, updateUsersHousings);
housingsUsersRouter.delete('/:user_housing_id', userAuth, deleteUsersHousings);
