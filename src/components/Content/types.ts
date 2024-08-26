import { HTMLProps } from 'react';

export type WrapperProps = {
	variant?: 'primary' | 'secondary';
	as?: 'section' | 'main';
} & HTMLProps<HTMLDivElement>;

export type TitleProps = {
	content: string;
};
