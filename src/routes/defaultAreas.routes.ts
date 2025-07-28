import { Request, Response } from 'express';
import { sendQuery } from '../config/db/dbConfig.js';

import express from 'express';

export const defaultAreasRouter = express.Router();

defaultAreasRouter.get('/', async (req: Request, res: Response) => {
    const defaultAreas = await sendQuery('SELECT * FROM default_areas');
    res.send({ message: 'Default areas list', data: defaultAreas });
});
