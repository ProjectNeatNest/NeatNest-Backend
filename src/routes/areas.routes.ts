import express from 'express';

import getAllAreas from '../controllers/areas/getAllAreas.js';
import createArea from '../controllers/areas/createArea.js';
import updateArea from '../controllers/areas/updateArea.js';
import deleteArea from '../controllers/areas/deleteArea.js';

export const areasRouter = express.Router();

areasRouter.get('/', getAllAreas);
areasRouter.post('/', createArea);
areasRouter.patch('/:area_id', updateArea);
areasRouter.delete('/:area_id', deleteArea);
