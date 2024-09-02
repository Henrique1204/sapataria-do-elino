const removeNonNumericCharacters = (str: string) => {
	return str.replace(/\D/g, '');
};

export const formatPhone = (phoneNumber: string = '') => {
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
