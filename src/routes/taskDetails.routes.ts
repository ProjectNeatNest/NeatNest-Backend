import express from 'express';

import getAllTaskDetails from '../controllers/taskDetails/getAllTaskDetails.js';
import createTaskDetail from '../controllers/taskDetails/createTaskDetail.js';
import updateTaskDetail from '../controllers/taskDetails/updateTaskDetail.js';
import deleteTaskDetail from '../controllers/taskDetails/deleteTaskDetail.js';
import { userAuth } from '../middlewares/userAuth.js';

export const taskDetailsRouter = express.Router();

taskDetailsRouter.get('/', userAuth, getAllTaskDetails);
taskDetailsRouter.post('/', userAuth, createTaskDetail);
taskDetailsRouter.patch('/:task_details_id', userAuth, updateTaskDetail);
taskDetailsRouter.delete('/:task_details_id', userAuth, deleteTaskDetail);
