import React from 'react';

import classNames from 'classnames';

import * as Types from './types';

export const Title: Component<Types.TitleProps> = ({ content, className }) => {
	const classByVariant = classNames(
		'font-title text-4.5xl text-content-lighter',
		className
	);

	return <h1 className={classByVariant}>{content}</h1>;
};

export const Wrapper: ComponentWithChildren<Types.WrapperProps> = ({
	as = 'section',
	variant = 'primary',
	className,
	children,
}) => {
	const Component = as;

	const classByVariant = classNames(
		'px-8 py-20 flex justify-center grid-gap',
		{
			'bg-transparent': variant === 'primary',
			'bg-secondary-dark': variant === 'secondary',
		},
		className
	);

	return <Component className={classByVariant}>{children}</Component>;
};
