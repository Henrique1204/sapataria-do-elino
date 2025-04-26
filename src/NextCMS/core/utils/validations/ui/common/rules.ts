import { EntryTextValue } from '../types';

/**
 * Verifica se um valor de texto está vazio.
 *
 * @param {EntryTextValue} [value] - Texto a ser avaliado (pode ser `string` ou `undefined`).
 * @returns {boolean} Retorna `true` se:
 *  - `value` for `undefined` ou não for uma `string`,
 *  - ou for uma `string` composta apenas por espaços (após o `trim()`);
 * Caso contrário, retorna `false`.
 */
export const isEmpty = (value?: EntryTextValue): boolean => {
	if (typeof value === 'string') return value.trim() === '';

	return true;
};
