/**
 * Remove todos os caracteres não numéricos de uma string.
 * @param {string} str - A string que terá os caracteres não numéricos removidos.
 * @returns {string} A string sem caracteres não numéricos.
 */
export const removeNonNumericCharacters = (str: string) => {
	return str.replace(/\D/g, '');
};

/**
 * Limpa a máscara de uma moeda, convertendo para um número.
 * @param {string} currency - A string que representa a moeda com máscara.
 * @returns {number} O valor da moeda sem máscara.
 */
export const clearCurrencyMask = (currency: string = '') => {
	const valueWithoutCipher = removeNonNumericCharacters(currency);

	if (isNaN(Number(valueWithoutCipher))) return 0;

	const DECIMAL_OPERATOR = 100;

	return Number(valueWithoutCipher) / DECIMAL_OPERATOR;
};

/**
 * Limpa a máscara de um telefone, removendo todos os caracteres não numéricos.
 * @param {string} phone - A string que representa o telefone com máscara.
 * @returns {string} O número do telefone sem máscara.
 */
export const clearPhoneMask = (phone: string = '') => {
	return removeNonNumericCharacters(phone);
};

/**
 * Limpa a máscara de um CEP, removendo todos os caracteres não numéricos.
 * @param {string} zipcode - A string que representa o CEP com máscara.
 * @returns {string} O CEP sem máscara.
 */
export const clearZipcodeMask = (zipcode: string) => {
	return removeNonNumericCharacters(zipcode);
};
