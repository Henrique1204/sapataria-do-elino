import React from 'react';

import classNames from 'classnames';

import * as Types from './types';

export const Title: Component<Types.ContentProps> = ({
	content,
	className,
}) => {
	const titleClassNames = classNames(
		'flex items-center ml-3 text-xl text-content-lighter relative before:block before:w-1 before:h-2 before:rounded-sm before:absolute before:-left-3 before:bg-primary-main',
		className
	);

	return <h2 className={titleClassNames}>{content}</h2>;
};

export const Content: ComponentWithChildren = ({ children }) => {
	return <div className='px-5 py-8 w-full h-auto'>{children}</div>;
};

export const Wrapper: ComponentWithChildren<Types.WrapperProps> = ({
	as = 'div',
	className,
	children,
}) => {
	const Component = as;

	const wrapperClassNames = classNames(
		'flex flex-col bg-card-gradient rounded-xl overflow-hidden',
		className
	);

	return <Component className={wrapperClassNames}>{children}</Component>;
};
