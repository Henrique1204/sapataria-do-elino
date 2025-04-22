type EntryTextValue = string | null;
type fieldValidateFn = (value?: EntryTextValue) => boolean;

export const validateField =
	(
		message: string = 'Campo precisa ser preenchido.',
		validateMethod: fieldValidateFn
	) =>
	(value?: EntryTextValue) => {
		return validateMethod(value) ? message : '';
	};

export const validateIsEmpty: fieldValidateFn = (value) => {
	if (typeof value === 'string') return value.trim() === '';

	return value === undefined || value === null;
};
