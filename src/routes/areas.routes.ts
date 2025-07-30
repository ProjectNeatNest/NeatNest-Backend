import express from 'express';

import getAllAreas from '../controllers/areas/getAllAreas.js';
import createArea from '../controllers/areas/createArea.js';
import updateArea from '../controllers/areas/updateArea.js';
import deleteArea from '../controllers/areas/deleteArea.js';
import getOneArea from '../controllers/areas/getOneArea.js';

export const areasRouter = express.Router();

// areasRouter.get('/', userAuth, getAllAreas);
// areasRouter.post('/', userAuth, createArea);
// areasRouter.patch('/:area_id', userAuth, updateArea);
// areasRouter.delete('/:area_id', userAuth, deleteArea);

areasRouter.get('/areas', getAllAreas);
areasRouter.post('/areas', createArea);
areasRouter.get('/areas/:area_id', getOneArea);
areasRouter.patch('/areas/:area_id', updateArea);
areasRouter.delete('/areas/:area_id', deleteArea);
