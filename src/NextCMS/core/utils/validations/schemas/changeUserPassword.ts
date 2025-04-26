import { z } from 'zod';

export const nonEmptyString = z.string().trim().nonempty('Campo obrigatório');

export const newPasswordSchema = z
	.string()
	.min(8, 'Senha deve ter no mínimo 8 caracteres')
	.max(32, 'Senha deve ter no máximo 32 caracteres')
	.regex(/\d/, 'Deve conter ao menos um número')
	.regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula')
	.regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula')
	.regex(/[@#\-_$%^&.+=§!?]/, 'Deve conter ao menos um caractere especial');

export const changeUserPasswordSchema = z
	.object({
		newPassword: newPasswordSchema,
		confirmPassword: nonEmptyString,
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'As senhas devem ser iguais',
		path: ['confirmPassword'],
	});
