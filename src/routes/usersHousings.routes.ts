import express from 'express';

import getAllUsersHousings from '../controllers/usersHousings/getAllUsersHousings.js';
import createUsersHousings from '../controllers/usersHousings/createUsersHousings.js';
import updateUsersHousings from '../controllers/usersHousings/updateUsersHousings.js';
import deleteUsersHousings from '../controllers/usersHousings/deleteUsersHousings.js';
import { userAuth } from '../middlewares/userAuth.js';

export const usersHousingsRouter = express.Router();

usersHousingsRouter.get('/', userAuth, getAllUsersHousings);
usersHousingsRouter.post('/', userAuth, createUsersHousings);
usersHousingsRouter.patch('/:user_housing_id', userAuth, updateUsersHousings);
usersHousingsRouter.delete('/:user_housing_id', userAuth, deleteUsersHousings);
