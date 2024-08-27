import React from 'react';

import classNames from 'classnames';

import * as Types from './types';

export const Title: Component<Types.TitleProps> = ({ content, className }) => {
	const titleClassNames = classNames(
		'font-title text-4.5xl text-content-lighter',
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
		'px-8 py-20 flex justify-center',
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
