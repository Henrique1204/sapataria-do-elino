import React from 'react';

const ArrowLeft: Component = ({
	testId = 'arrow-left',
	className,
	...props
}) => (
	<svg
		width='32'
		height='32'
		viewBox='0 0 32 32'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		data-testid={testId}
		className={className}
		{...props}
	>
		<g clipPath='url(#clip0_8_86)'>
			<path
				d='M27 16H5'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M14 7L5 16L14 25'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</g>
		<defs>
			<clipPath id='clip0_8_86'>
				<rect width='32' height='32' fill='white' />
			</clipPath>
		</defs>
	</svg>
);

export default ArrowLeft;
