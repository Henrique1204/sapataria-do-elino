'use client';

import React from 'react';

import classNames from 'classnames';

import Icon from '../Icon';

const GradientCheckCircle: Component = ({ className }) => {
	const containerClassNames = classNames(
		'flex items-center justify-center rounded-full',
		'p-3 w-12 h-12 bg-cms-primary-dark',
		'shadow-cms-primary-circle m-8',
		className
	);

	return (
		<div className={containerClassNames}>
			<Icon name='Check' className='text-cms-content-light' />
		</div>
	);
};

export default GradientCheckCircle;
