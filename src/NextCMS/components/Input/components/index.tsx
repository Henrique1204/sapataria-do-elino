import React, { HTMLProps } from 'react';

import classNames from 'classnames';

export const Container: Component<HTMLProps<HTMLDivElement>> = ({
	testId = 'input-container',
	children,
	className,
	...props
}) => {
	const containerClassName = classNames('mb-6 flex-1', className);

	return (
		<div data-testid={testId} className={containerClassName} {...props}>
			{children}
		</div>
	);
};

export const Label: Component<HTMLProps<HTMLLabelElement>> = ({
	testId = 'input-label',
	label,
	className,
	id,
}) => {
	const labelClassName = classNames(
		'block text-lg text-cms-content-dark mb-2',
		className
	);

	return (
		<label data-testid={testId} htmlFor={id} className={labelClassName}>
			{label}
		</label>
	);
};

export const Field = React.forwardRef<
	HTMLInputElement,
	HTMLProps<HTMLInputElement> & { testId: string }
>(({ testId = 'input-field', className, id, required, ...props }, ref) => {
	const inputClassName = classNames(
		'block w-full font- px-4 py-3 border text-cms-content-dark border-cms-content-main rounded-lg text-md border-box transition-all placeholder-cms-content-main placeholder',
		'focus:ring-cms-primary-main focus:border-cms-primary-main hover:ring-cms-primary-main hover:border-cms-primary-main',
		className
	);

	return (
		<input
			ref={ref}
			data-testid={testId}
			id={id}
			className={inputClassName}
			required={required}
			aria-required={required ? 'true' : 'false'}
			name={id}
			{...props}
		/>
	);
});

Field.displayName = 'Field';
