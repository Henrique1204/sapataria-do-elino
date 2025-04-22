import { z } from 'zod';

export const emailSchema = z.string().email().trim().toLowerCase();
export const passwordSchema = z.string().min(6);

export const userCredentialsSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});
