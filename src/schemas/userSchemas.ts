import { z } from 'zod/v4';

export const registerSchema = z.object({
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
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'At least 2 characters long')
    .max(35, 'Maximum 35 characters long')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{1,35}$/, 'Name can not include special characters or numbers'),
  surname: z
    .string()
    .min(1, 'Surname is required')
    .min(2, 'At least 2 characters long')
    .max(35, 'Maximum 35 characters long')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{1,35}$/, 'Surname can not include special characters or numbers'),
  surname_2: z
    .string()
    .min(1, 'Surname 2 is required')
    .min(2, 'At least 2 characters long')
    .max(35, 'Maximum 35 characters long')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{1,35}$/, 'Second surname can not include special characters or numbers'),
});

export const loginSchema = registerSchema.pick({ email: true, password: true });

export type RegisterFormValues = z.infer<typeof registerSchema>;
