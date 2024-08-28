import React from 'react';

import classNames from 'classnames';

import * as Types from './types';

export const Title: Component<Types.TitleProps> = ({ content, className }) => {
	const titleClassNames = classNames(
		'w-full text-center font-title text-3xl text-content-lighter sm:text-4.5xl',
		className
	);

	return <h1 className={titleClassNames}>{content}</h1>;
};

export const Wrapper: ComponentWithChildren<Types.WrapperProps> = ({
	as = 'section',
	variant = 'primary',
	className,
	children,
	...props
}) => {
	const Component = as;

	const wrapperClassNames = classNames(
		'px-4 py-10 flex justify-center sm:px-8 sm:py-20',
		{
			'bg-transparent': variant === 'primary',
			'bg-secondary-dark': variant === 'secondary',
		},
		className
	);

	return (
		<Component {...props} className={wrapperClassNames}>
			{children}
		</Component>
	);
};
