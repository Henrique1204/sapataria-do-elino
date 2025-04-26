export type ValidationItem = {
	validation: (value: string) => boolean;
	message: string;
	example?: string;
};

export type ValidationsListProps = {
	value: string;
	validations: ValidationItem[];
};

export type IconCircleProps = {
	isEmpty?: boolean;
	isInvlaid?: boolean;
};
