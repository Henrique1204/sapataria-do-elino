import { z } from 'zod';

export const userIdSchema = z.string().trim().toLowerCase();

export const codeSchema = z.string().length(4);
export const codeExpirationSchema = z.date();

export const userCodeSchema = z.object({
	code: codeSchema.nullable(),
	expirationDate: codeExpirationSchema.nullable(),
});
