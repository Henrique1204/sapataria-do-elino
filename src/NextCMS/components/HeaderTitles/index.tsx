'use client';

import React from 'react';

import * as Types from './types';

const HeaderTitles: Component<Types.HeaderTitlesProps> = ({
	subtitle,
	title,
}) => {
	return (
		<>
			<h2 className='text-cms-content-dark font-normal text-xl mb-2'>
				{subtitle}
			</h2>

			<h1 className='text-cms-content-main font-normal text-lg mb-9'>
				{title}
			</h1>
		</>
	);
};

export default HeaderTitles;
