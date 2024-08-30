import React from 'react';

import classNames from 'classnames';

import * as Types from './types';

export const Title: Component<Types.TitleProps> = ({ content, className }) => {
	const titleClassNames = classNames(
		'font-title text-xl text-content-lighter mb-4 not-italic',
		className
	);

	return <h2 className={titleClassNames}>{content}</h2>;
};

export const Info: Component<Types.InfoProps> = ({
	content,
	className,
	as = 'p',
	...props
}) => {
	const Component = as || 'p';

	const infoClassNames = classNames(
		'font-body text-base text-content-main mb-2 not-italic',
		{
			'underline underline-offset-4 text-primary-main block hover:text-primary-light focus:text-primary-light':
				as === 'a',
		},
		className
	);

	return (
		<Component {...(props as any)} className={infoClassNames}>
			{content}
		</Component>
	);
};

export const Group: ComponentWithChildren = ({ children, className }) => {
	return <address className={className}>{children}</address>;
};
