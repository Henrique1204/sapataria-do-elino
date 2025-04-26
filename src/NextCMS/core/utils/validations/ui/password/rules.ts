import { ValidateFn } from '../types';

import { isEmpty } from '../common/rules';

const HAS_ERROR = true;

/**
 * Valida o comprimento da senha.
 * @param {string} value - O valor da senha a ser validado.
 * @returns {boolean} Retorna true se a senha não atender aos requisitos de comprimento, caso contrário, false.
 */
export const validateLength: ValidateFn = (value) => {
	if (isEmpty(value)) return HAS_ERROR;

	return value!.length < 8 || value!.length > 32;
};

/**
 * Valida se a senha contém pelo menos um número.
 * @param {string} value - O valor da senha a ser validado.
 * @returns {boolean} Retorna true se a senha não contiver números, caso contrário, false.
 */
export const validateHasNumber: ValidateFn = (value) => {
	if (isEmpty(value)) return HAS_ERROR;

	return !value!.replace(/\D/g, '').length;
};

/**
 * Valida se a senha contém pelo menos uma letra maiúscula.
 * @param {string} value - O valor da senha a ser validado.
 * @returns {boolean} Retorna true se a senha não contiver letras maiúsculas, caso contrário, false.
 */
export const validateHasUppercase: ValidateFn = (value) => {
	if (isEmpty(value)) return HAS_ERROR;

	return !value!.match(/[A-Z]/g)?.length;
};

/**
 * Valida se a senha contém pelo menos uma letra minúscula.
 * @param {string} value - O valor da senha a ser validado.
 * @returns {boolean} Retorna true se a senha não contiver letras minúsculas, caso contrário, false.
 */
export const validateHasLowercase: ValidateFn = (value) => {
	if (isEmpty(value)) return HAS_ERROR;

	return !value!.match(/[a-z]/g)?.length;
};

/**
 * Valida se a senha contém pelo menos um caractere especial.
 * @param {string} value - O valor da senha a ser validado.
 * @returns {boolean} Retorna true se a senha não contiver caracteres especiais, caso contrário, false.
 */
export const validateSpecialChar: ValidateFn = (value) => {
	if (isEmpty(value)) return HAS_ERROR;

	return !value!.match(/[@#\-_$%^&.+=§!?]/g)?.length;
};

/**
 * Valida se o valor de entrada corresponde a uma senha válida.
 * @param {string} value - O valor da senha a ser validado.
 * @returns {boolean} Retorna true se a senha seja inválida, caso contrário, false.
 */
export const validatePasswordComplexity: ValidateFn = (value) => {
	if (isEmpty(value)) return HAS_ERROR;

	const regex =
		/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#\-_$%^&.+=§!?]).{8,32}$/;
	return !regex.test(value!);
};

/**
 * Objeto que contém todas as regras de validação para senhas.
 * @type {Object}
 * @property {ValidateFn} length - Validação do comprimento da senha.
 * @property {ValidateFn} hasNumber - Validação da presença de números na senha.
 * @property {ValidateFn} hasUppercase - Validação da presença de letras maiúsculas na senha.
 * @property {ValidateFn} hasLowercase - Validação da presença de letras minúsculas na senha.
 * @property {ValidateFn} specialChar - Validação da presença de caracteres especiais na senha.
 */
export const passwordRules = {
	length: validateLength,
	hasNumber: validateHasNumber,
	hasUppercase: validateHasUppercase,
	hasLowercase: validateHasLowercase,
	specialChar: validateSpecialChar,
	complexity: validatePasswordComplexity,
};
