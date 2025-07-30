import express from 'express';

import getAllAreas from '../controllers/areas/getAllAreas.js';
import createArea from '../controllers/areas/createArea.js';
import updateArea from '../controllers/areas/updateArea.js';
import deleteArea from '../controllers/areas/deleteArea.js';
import getOneArea from '../controllers/areas/getOneArea.js';

export const areasRouter = express.Router({ mergeParams: true});

// areasRouter.get('/', userAuth, getAllAreas);
// areasRouter.post('/', userAuth, createArea);
// areasRouter.patch('/:area_id', userAuth, updateArea);
// areasRouter.delete('/:area_id', userAuth, deleteArea);

areasRouter.get('/', getAllAreas);
areasRouter.post('/', createArea);
areasRouter.get('/:area_id', getOneArea);
areasRouter.patch('/:area_id', updateArea);
areasRouter.delete('/:area_id', deleteArea);
