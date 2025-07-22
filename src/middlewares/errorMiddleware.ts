import { ZodError } from "zod/v4";
import { NextFunction, Request, Response } from "express";

import HTTPError from "../models/HTTPError.js";
import prettifyZodErrors from "../helpers/prettifyZodErrors.js";

export default function errorMiddleware(
   error: Error | HTTPError | ZodError,
   req: Request,
   res: Response,
   next: NextFunction
) {
   console.log(error.message);

   if (error instanceof HTTPError) {
      res.status(error.statusCode).send( { error: error.message });
      return;
   }
   if (error instanceof ZodError) {
      const prettifiedErrors = prettifyZodErrors(error);
      res.status(400).send({ error: prettifiedErrors });
      return;
   }

   res.status(500).send({ error: error.message });
}
