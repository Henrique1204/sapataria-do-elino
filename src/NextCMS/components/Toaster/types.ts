export type Position = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type PositionStyleValues = 'top' | 'right' | 'left' | 'bottom';

export type Status = 'success' | 'error' | 'warning' | 'info';

export type ToasterProps = {
	position?: Position;
	timeout?: number;
};

export type OpenToasterProps = {
	message: string;
	status?: Status;
} & ToasterProps;

export type openFn = (props: OpenToasterProps) => void;
