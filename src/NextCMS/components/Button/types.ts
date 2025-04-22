import { HTMLProps } from 'react';

export type ButtonCustomProps = {
	variant?: 'primary' | 'link';
	isFullWidth?: boolean;
};

export type ButtonProps = HTMLProps<HTMLButtonElement> & ButtonCustomProps;
