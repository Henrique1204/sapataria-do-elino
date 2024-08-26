import React from 'react';

import classNames from 'classnames';

import * as Types from './types';

const Button: ComponentWithChildren<Types.ButtonProps> = ({
	as = 'button',
	variant = 'primary',
	className,
	children,
	...props
}) => {
	const Component = as;

	const buttonClassNames = classNames(
		'font-body px-4 py-3 text-base rounded-md capitalize font-semibold block',
		{
			'text-content-dark bg-primary-main hover:shadow-button-primary focus:shadow-button-primary':
				variant === 'primary',
			'text-primary-main bg-secondary-darker hover:shadow-button-secondary focus:shadow-button-secondary':
				variant === 'secondary',
		},
		className
	);

	return (
		<Component className={buttonClassNames} {...(props as any)}>
			{children}
		</Component>
	);
};

export default Button;
