import { ValidationItem } from '../../components/ValidationList';

import {
	createFieldValidator,
	validations,
} from '../../core/utils/validations/ui';

export const PASSWORD_VALIDATIONS_LIST: ValidationItem[] = [
	{
		validation: validations.password.length,
		message: 'Senha de 8 a 32 dígitos.',
	},
	{
		validation: validations.password.hasNumber,
		message: 'Contém números.',
	},
	{
		validation: validations.password.hasUppercase,
		message: 'Contém letra maiúscula.',
	},
	{
		validation: validations.password.hasLowercase,
		message: 'Contém letra minúscula.',
	},
	{
		validation: validations.password.specialChar,
		message: 'Contém caractere especial.',
		example: '@#-_$%^&.+=§!?',
	},
];

export const passwordFieldValidator = createFieldValidator(
	validations.password.complexity,
	'A senha não é válida.'
);
