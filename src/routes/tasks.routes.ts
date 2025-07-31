import express from 'express';

import getAllTasks from '../controllers/tasks/getAllTasks.js';
import createTask from '../controllers/tasks/createTasks.js';
import updateTask from '../controllers/tasks/updateTask.js';
import deleteTask from '../controllers/tasks/deleteTask.js';
import getOneTask from '@/controllers/tasks/getOneTask.js';

export const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);
tasksRouter.post('/', createTask);
tasksRouter.get('/:task_id', getOneTask);
tasksRouter.patch('/:task_id', updateTask);
tasksRouter.delete('/:task_id', deleteTask);
