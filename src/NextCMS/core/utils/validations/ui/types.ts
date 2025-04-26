export type EntryTextValue = string | null;

export type ValidateFn = (value?: EntryTextValue) => boolean;

export type ValidateFieldFn = (
	validateMethod: ValidateFn,
	message?: string
) => (value?: EntryTextValue) => string;
