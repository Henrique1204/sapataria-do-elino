'use client';

import React from 'react';

import classNames from 'classnames';

import * as Types from './types';

const Button: ComponentWithChildren<Types.ButtonProps> = ({
	variant = 'primary',
	className,
	children,
	isFullWidth,
	...props
}) => {
	const buttonLinkVariantClassNames = classNames(
		'text-cms-primary-main !bg-transparent',
		'hover:text-cms-primary-dark focus:text-cms-primary-dark',
		'disabled:text-gray-400'
	);

	const isLinkVariant = variant === 'link';

	const buttonClassNames = classNames(
		'px-4 py-3 rounded-lg block transition-all disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:focus:bg-gray-400',
		isFullWidth && 'w-full',

		variant === 'primary' &&
			'font-semibold text-cms-content-light bg-cms-primary-main hover:bg-cms-primary-dark focus:bg-cms-primary-dark',

		isLinkVariant && buttonLinkVariantClassNames,
		className
	);

	return (
		<button className={buttonClassNames} {...(props as any)}>
			{children}
		</button>
	);
};

export default Button;
