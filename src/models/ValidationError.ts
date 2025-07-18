import { z, ZodError } from 'zod/v4';

export default class ValidationError extends Error {
   constructor(error: ZodError) {
      const prettifiedErrors = z.prettifyError(error); 
      super(prettifiedErrors);
   }
};