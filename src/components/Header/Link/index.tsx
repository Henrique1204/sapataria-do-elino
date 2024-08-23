import React from 'react';

import * as Types from './types';

export const LinkBase: Component<Types.LinkProps> = ({
	variant = 'primary',
	label,
	className = '',
	...props
}) => {
	return (
		<a
			{...props}
			className={`${className} font-body px-4 py-3 text-base rounded-md capitalize font-semibold block`}
		>
			{label}
		</a>
	);
};

export const Link: Component<Types.LinkProps> = ({ variant, ...props }) => {
	const variantStyle =
		variant === 'primary'
			? 'text-content-main before:bg-content-main hover:before:h-3 focus:before:h-3'
			: 'text-content-dark before:bg-content-dark hover:before:h-3 focus:before:h-3';

	return (
		<LinkBase
			{...props}
			className={`${variantStyle} flex items-center relative before:block before:w-1 before:h-0 before:absolute before:left-0 before:transition-all`}
		/>
	);
};

export const LinkButton: Component<Types.LinkProps> = ({
	variant,
	...props
}) => {
	const variantStyle =
		variant === 'primary'
			? 'text-content-dark bg-primary-main hover:shadow-button-primary focus:shadow-button-primary'
			: 'text-primary-main bg-secondary-darker hover:shadow-button-secondary focus:shadow-button-secondary';

	return (
		<LinkBase
			{...props}
			className={`${variantStyle} font-semibold transition-all`}
		/>
	);
};
