import express from 'express';

import getAllTasks from '../controllers/tasks/getAllTasks.js';
import createTask from '../controllers/tasks/createTasks.js';
import updateTask from '../controllers/tasks/updateTask.js';
import deleteTask from '../controllers/tasks/deleteTask.js';
import { userAuth } from '../middlewares/userAuth.js';

export const tasksRouter = express.Router();

tasksRouter.get('/', userAuth, getAllTasks);
tasksRouter.post('/', userAuth, createTask);
tasksRouter.patch('/:task_id', userAuth, updateTask);
tasksRouter.delete('/:task_id', userAuth, deleteTask);
