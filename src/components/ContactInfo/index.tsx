import React from 'react';

import classNames from 'classnames';

import * as Types from './types';

export const Title: Component<Types.TitleProps> = ({ content, className }) => {
	const titleClassNames = classNames(
		'font-title text-xl text-content-lighter mb-4',
		className
	);

	return <h2 className={titleClassNames}>{content}</h2>;
};

export const Info: Component<Types.TitleProps> = ({ content, className }) => {
	const infoClassNames = classNames(
		'font-body text-base text-content-main mb-2',
		className
	);

	return <p className={infoClassNames}>{content}</p>;
};

export const Group: ComponentWithChildren = ({ children, className }) => {
	return <div className={className}>{children}</div>;
};
