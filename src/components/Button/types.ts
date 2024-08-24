import { HTMLProps } from 'react';

export type ButtonCustomProps = {
	as?: 'a' | 'button';
	variant?: 'primary' | 'secondary';
};

export type AnchorElementProps = ButtonCustomProps & {
	as?: 'a';
} & HTMLProps<HTMLAnchorElement>;

export type ButtonElementProps = ButtonCustomProps & {
	as?: 'button';
} & HTMLProps<HTMLButtonElement>;

export type ButtonProps = ButtonElementProps | AnchorElementProps;
