import { HTMLProps } from 'react';

export type LinkProps = HTMLProps<HTMLAnchorElement> & {
	label: string;
	variant?: 'primary' | 'secondary';
};
