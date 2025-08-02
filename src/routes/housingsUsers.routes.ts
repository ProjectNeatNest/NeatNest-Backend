import express from 'express';

import getAllUsersHousings from '../controllers/usersHousings/getAllUsersHousings.js';
import createUsersHousings from '../controllers/usersHousings/createUsersHousings.js';
import updateUsersHousings from '../controllers/usersHousings/updateUsersHousings.js';
import deleteUsersHousings from '../controllers/usersHousings/deleteUsersHousings.js';
import getAllTasksFromUser from '@/controllers/usersHousings/getAllTasksFromUser.js';

import { adminAuth } from '../middlewares/adminAuth.js';

export const housingsUsersRouter = express.Router({ mergeParams: true });;

housingsUsersRouter.get('/', getAllUsersHousings);
housingsUsersRouter.post('/', createUsersHousings);
housingsUsersRouter.patch('/:user_id', updateUsersHousings);
housingsUsersRouter.delete('/:user_id', adminAuth, deleteUsersHousings);
housingsUsersRouter.get('/:user_id/tasks', getAllTasksFromUser);