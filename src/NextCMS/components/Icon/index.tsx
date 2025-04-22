import React from 'react';

import classNames from 'classnames';

import * as Types from './types';
import * as IconsList from './assets';

const Icon: Component<Types.IconProps> = ({
	testId = 'icon-container',
	name,
	className,
	onClick,
	...props
}) => {
	try {
		if (!name) return <svg />;

		const Component = IconsList[name];

		const containerClassName = classNames(
			className,
			onClick && 'cursor-pointer'
		);

		return (
			<div
				data-testid={testId}
				onClick={onClick}
				className={containerClassName}
			>
				<Component className={className} {...props} />
			</div>
		);
	} catch (error) {
		console.error('[Icon Component]: ', error);
		return <svg />;
	}
};

export default Icon;
