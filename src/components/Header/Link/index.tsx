import React from 'react';

import classNames from 'classnames';

import * as Types from './types';

const Link: Component<Types.LinkProps> = ({ variant, label, ...props }) => {
	const customClassNames = classNames(
		'font-body px-4 py-3 text-base rounded-md capitalize font-semibold block flex items-center relative before:block before:w-1 before:h-0 before:absolute before:left-0 before:transition-all',
		{
			'text-content-main before:bg-content-main hover:before:h-3 focus:before:h-3':
				variant === 'primary',
			'text-content-dark before:bg-content-dark hover:before:h-3 focus:before:h-3':
				variant === 'secondary',
		}
	);

	return (
		<a {...props} className={customClassNames}>
			{label}
		</a>
	);
};

export default Link;
