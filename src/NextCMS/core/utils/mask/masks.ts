import { clearCurrencyMask, removeNonNumericCharacters } from './clear';

/**
 * Aplica máscara ao CPF.
 * @param {string} cpf - O CPF a ser mascarado.
 * @returns {string} O CPF mascarado.
 */
export const maskCpf = (cpf: string = '') => {
	const CPF_TOTAL_LENGHT = 14;
	const cpfOnlyNumbers = removeNonNumericCharacters(cpf);

	return cpfOnlyNumbers
		.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
		.substring(0, CPF_TOTAL_LENGHT);
};

/**
 * Aplica máscara ao CNPJ.
 * @param {string} cpf - O CNPJ a ser mascarado.
 * @returns {string} O CNPJ mascarado.
 */
export const maskCnpj = (cpf: string = '') => {
	const CNPJ_TOTAL_LENGHT = 18;
	const cnpjOnlyNumbers = removeNonNumericCharacters(cpf);

	return cnpjOnlyNumbers
		.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
		.substring(0, CNPJ_TOTAL_LENGHT);
};

/**
 * Aplica máscara ao CPF ou CNPJ com base no tamanho do número.
 * @param {string | null} cpfcnpj - O CPF ou CNPJ a ser mascarado.
 * @returns {string} O CPF ou CNPJ mascarado.
 */
export const maskCpfCnpj = (cpfcnpj: string | null = '') => {
	if (cpfcnpj === null) return '';

	const cpfcnpjOnlyNumber = removeNonNumericCharacters(cpfcnpj);

	const CPF_TOTAL_DIGITS = 11;
	const CNPJ_TOTAL_DIGITS = 14;

	const isCpf = cpfcnpjOnlyNumber.length === CPF_TOTAL_DIGITS;
	const isCnpj = cpfcnpjOnlyNumber.length === CNPJ_TOTAL_DIGITS;

	if (isCpf) {
		return maskCpf(cpfcnpjOnlyNumber);
	} else if (isCnpj) {
		return maskCnpj(cpfcnpjOnlyNumber);
	} else {
		return cpfcnpjOnlyNumber;
	}
};

/**
 * Aplica máscara à data.
 * @param {string} dateText - A data a ser mascarada.
 * @returns {string} A data mascarada.
 */
export const maskDate = (dateText: string = '') => {
	const dateTextOnlyNumbers = removeNonNumericCharacters(dateText);

	if (dateTextOnlyNumbers.length > 4) {
		return dateTextOnlyNumbers
			.replace(/^(\d{2})(\d{2})(\d)/, '$1/$2/$3')
			.substring(0, 10);
	}

	if (dateTextOnlyNumbers.length > 2) {
		return dateTextOnlyNumbers.replace(/^(\d{2})(\d)/, '$1/$2');
	}

	return dateText;
};

/**
 * Aplica máscara à moeda.
 * @param {string} value - O valor a ser mascarado.
 * @returns {string} O valor mascarado.
 */
export const maskCurrency = (value: string = '') => {
	const cleanValue = clearCurrencyMask(value);

	if (!cleanValue) return '';

	const moneyFormatter = Intl.NumberFormat('pt-BR', {
		currency: 'BRL',
		currencyDisplay: 'symbol',
		currencySign: 'standard',
		style: 'currency',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	const valueFormatted = moneyFormatter.format(Number(cleanValue));

	return valueFormatted;
};

/**
 * Aplica máscara ao telefone.
 * @param {string} phoneNumber - O número do telefone a ser mascarado.
 * @returns {string} O número do telefone mascarado.
 */
export const maskPhone = (phoneNumber: string = '') => {
	const phoneNumberOnlyNumbers = removeNonNumericCharacters(phoneNumber);

	const AREA_CODE_LENGTH = 2;
	const SHORT_PHONE_NUMBER_LENGTH = 6;
	const MEDIUM_PHONE_NUMBER_LENGTH = 10;
	const LONG_PHONE_NUMBER_LENGTH = 11;
	const MEDIUM_PHONE_NUMBER_PART = 6;
	const LONG_PHONE_NUMBER_PART = 3;
	const EXTENDED_PHONE_NUMBER_PART = 7;

	if (
		phoneNumberOnlyNumbers.length > AREA_CODE_LENGTH &&
		phoneNumberOnlyNumbers.length <= SHORT_PHONE_NUMBER_LENGTH
	) {
		return (
			'(' +
			phoneNumberOnlyNumbers.substring(0, AREA_CODE_LENGTH) +
			') ' +
			phoneNumberOnlyNumbers.substring(AREA_CODE_LENGTH)
		);
	}

	if (
		phoneNumberOnlyNumbers.length > SHORT_PHONE_NUMBER_LENGTH &&
		phoneNumberOnlyNumbers.length <= MEDIUM_PHONE_NUMBER_LENGTH
	) {
		return (
			'(' +
			phoneNumberOnlyNumbers.substring(0, AREA_CODE_LENGTH) +
			') ' +
			phoneNumberOnlyNumbers.substring(
				AREA_CODE_LENGTH,
				SHORT_PHONE_NUMBER_LENGTH
			) +
			'-' +
			phoneNumberOnlyNumbers.substring(MEDIUM_PHONE_NUMBER_PART)
		);
	}

	if (phoneNumberOnlyNumbers.length > MEDIUM_PHONE_NUMBER_LENGTH) {
		return (
			'(' +
			phoneNumberOnlyNumbers.substring(0, AREA_CODE_LENGTH) +
			') ' +
			phoneNumberOnlyNumbers.substring(
				AREA_CODE_LENGTH,
				LONG_PHONE_NUMBER_PART
			) +
			' ' +
			phoneNumberOnlyNumbers.substring(
				LONG_PHONE_NUMBER_PART,
				EXTENDED_PHONE_NUMBER_PART
			) +
			'-' +
			phoneNumberOnlyNumbers.substring(7, LONG_PHONE_NUMBER_LENGTH)
		);
	}

	return phoneNumberOnlyNumbers;
};

/**
 * Aplica máscara ao CEP.
 * @param {string} cep - O CEP a ser mascarado.
 * @returns {string} O CEP mascarado.
 */
export const maskZipcode = (cep: string = '') => {
	const cepOnlyNumbers = removeNonNumericCharacters(cep);

	if (cepOnlyNumbers.length > 5) {
		return (
			cepOnlyNumbers.substring(0, 5) + '-' + cepOnlyNumbers.substring(5, 8)
		);
	}

	return cep;
};

/**
 * Remove todos os caracteres não numéricos de uma string.
 * @param {string} value - A string a ser limpa.
 * @returns {string} A string sem caracteres não numéricos.
 */
export const maskOnlyNumbers = (value: string = '') => {
	return value.replace(/\D/g, '');
};

/**
 * Retorna o valor sem aplicar nenhuma máscara.
 * @param {string} value - O valor a ser retornado.
 * @returns {string} O valor sem máscara.
 */
export const noMask = (value: string = '') => value;

/**
 * Objeto que contém todas as funções de máscara.
 * @type {Object}
 * @property {Function} cpf - Função para mascarar CPF.
 * @property {Function} cnpj - Função para mascarar CNPJ.
 * @property {Function} cpfcnpj - Função para mascarar CPF ou CNPJ.
 * @property {Function} date - Função para mascarar data.
 * @property {Function} currency - Função para mascarar moeda.
 * @property {Function} phone - Função para mascarar telefone.
 * @property {Function} zipcode - Função para mascarar CEP.
 * @property {Function} none - Função que não aplica máscara.
 */
export const MASKS = {
	cpf: maskCpf,
	cnpj: maskCnpj,
	cpfcnpj: maskCpfCnpj,
	date: maskDate,
	currency: maskCurrency,
	phone: maskPhone,
	zipcode: maskZipcode,
	none: noMask,
};
