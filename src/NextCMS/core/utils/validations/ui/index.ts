import * as Types from './types';

import { commonValidations } from './common';
import { passwordValidations } from './password';

/**
 * Cria um validador de campo que aplica um método de validação fornecido
 * e retorna uma mensagem de erro personalizada caso a validação falhe.
 *
 * @param {string} [message='Campo precisa ser preenchido.']
 *        Mensagem de erro a ser exibida quando `validateMethod` retornar `false`.
 * @param {Types.ValidateFn} validateMethod
 *        Função de validação que recebe um valor de entrada
 *        e retorna `true` se o valor for considerado válido ou `false` caso contrário.
 *
 * @returns {(value?: Types.EntryTextValue) => string}
 *          Função que recebe o valor a ser validado e:
 *            - Retorna a mensagem de erro (`message`) se `validateMethod(value)` for `false`.
 *            - Retorna string vazia (`''`) se a validação passar.
 */
export const validateField =
	(
		message: string = 'Campo precisa ser preenchido.',
		validateMethod: Types.ValidateFn
	) =>
	(value?: Types.EntryTextValue) => {
		return validateMethod(value) ? message : '';
	};

/**
 * Cria um validador de campo que utiliza um método de validação fornecido.
 *
 * @param {Function} validateMethod - O método de validação a ser utilizado. Deve retornar um booleano.
 * @param {string} [message='Campo precisa ser preenchido.'] - A mensagem de erro a ser retornada se a validação falhar.
 * @returns {Function} Uma função que recebe um valor e retorna uma mensagem de erro se a validação falhar, ou uma string vazia se passar.
 */
export const createFieldValidator: Types.ValidateFieldFn = (
	validateMethod,
	message = 'Campo precisa ser preenchido.'
) => {
	return (value) => (validateMethod?.(value) ? message : '');
};

export const validations = {
	common: commonValidations,
	password: passwordValidations,
};

export { Types };
