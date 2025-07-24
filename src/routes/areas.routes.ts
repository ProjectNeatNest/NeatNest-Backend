import express from 'express';

import getAllAreas from '../controllers/areas/getAllAreas.js';
import createArea from '../controllers/areas/createArea.js';
import updateArea from '../controllers/areas/updateArea.js';
import deleteArea from '../controllers/areas/deleteArea.js';
import { userAuth } from '../middlewares/userAuth.js';

export const areasRouter = express.Router();

areasRouter.get('/', userAuth, getAllAreas);
areasRouter.post('/', userAuth, createArea);
areasRouter.patch('/:area_id', userAuth, updateArea);
areasRouter.delete('/:area_id', userAuth, deleteArea);
