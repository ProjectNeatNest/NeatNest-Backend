import { z } from 'zod/v4';

export const registerSchema = z.object({
  // TODO: Añadir al esquema name, surname, surname_2, 
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'At least 3 characters long')
    .max(20, 'Maximum 20 characters long'),
  email: z
    .email()
    .min(1, 'Email is required')
    .min(3, 'At least 3 characters long')
    .max(100, 'Maximum 100 characters long'),
  password: z
    .string('A string password is required')
    .min(1, 'Password is required')
    .regex(/^[a-zA-Z0-9]{8,16}$/, 'Password must be 8-16 characters long'),
});

export const loginSchema = registerSchema.pick({ email: true, password: true });

export type RegisterFormValues = z.infer<typeof registerSchema>;
