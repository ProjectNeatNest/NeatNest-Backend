import express from 'express';

import getAllTasksFromArea from '../controllers/tasks/getAllTasksFromArea.js';
import createTask from '../controllers/tasks/createTasks.js';
import updateTask from '../controllers/tasks/updateTask.js';
import deleteTask from '../controllers/tasks/deleteTask.js';
import getOneTask from '@/controllers/tasks/getOneTask.js';
import getAllTasksFromUser from '@/controllers/tasks/getAllTasksFromUser.js';

export const tasksRouter = express.Router({ mergeParams: true });

tasksRouter.get('/', getAllTasksFromArea);
tasksRouter.get('/', getAllTasksFromUser)
tasksRouter.post('/', createTask);
tasksRouter.get('/:task_id', getOneTask);
tasksRouter.patch('/:task_id', updateTask);
tasksRouter.delete('/:task_id', deleteTask);
tasksRouter.get('/:task_id', getOneTask);