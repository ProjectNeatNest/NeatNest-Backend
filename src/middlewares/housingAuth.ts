import { NextFunction, Request, Response } from 'express';
import HTTPError from '../models/HTTPError.js';
import { sendQuery } from '../config/db/dbConfig.js';
import { AuthorizedRequest, AuthorizedUser } from '../config/types.js';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

export async function housingAuth(req: Request, res: Response, next: NextFunction) {
   const { user_id } = (req as AuthorizedRequest).user;
   const { housing_id } = req.body;

   if (!housing_id) throw new HTTPError(400, 'Housing id not found.');

   try {
      const housingCheck = await sendQuery(
         'SELECT housing_id FROM users_housings WHERE user_id = $1 AND housing_id = $2',
         [user_id, housing_id]
      );

      if (housingCheck.length === 0) {
         throw new HTTPError(403, 'Access denied. You do not belong to this housing.');
      }

      next();
   } catch (error) {
      console.error('Housing check error:', error);
      if (error instanceof HTTPError) throw error;
      throw new HTTPError(500, 'Internal server error.');
   }
}