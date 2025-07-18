import { z } from 'zod/v4';

export const positiveNumberSchema = z.coerce
  .number('The id must be a number')
  .int('The id must be an integer')
  .nonnegative('The id must be a positive number');
