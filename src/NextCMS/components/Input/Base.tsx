'use client';

import React from 'react';

import * as Types from './types';

import ErrorMessage from '../ErrorMessage';

import { Container, Field, Label } from './components';
import classNames from 'classnames';

export const InputBase: Component<Types.InputBaseProps> = ({
	testId = 'input-base',
	elementsClasses,
	label,
	onChange,
	onBlur,
	onFocus,
	onChangeText,
	validateError,
	mask = (value) => value!,
	onValidate,
	...props
}) => {
	const [validationError, setValidationError] = React.useState<string>('');
	const hasError = Boolean(validationError);

	const handleOnChange: React.FormEventHandler<HTMLInputElement> = (e) => {
		const maskedValue = mask(e.currentTarget.value);

		onChange?.(e);

		onChangeText?.(maskedValue);
	};

	const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		if (validateError && !props.disabled) {
			setValidationError(validateError(String(props.value || '')));
		}

		onChangeText?.(mask(String(props.value || '')));

		onBlur?.(event);
	};

	const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		if (validateError && !props.disabled) setValidationError('');

		onFocus?.(event);
	};

	const errorMessageClassNames = classNames(
		'mt-1',
		elementsClasses?.errorMessage
	);

	React.useEffect(() => {
		if (validateError) onValidate?.(Boolean(validationError));
	}, [validationError]);

	return (
		<Container
			testId={`${testId}-container`}
			className={elementsClasses?.container}
		>
			<Label
				testId={`${testId}-label`}
				label={label}
				className={elementsClasses?.label}
			/>

			<Field
				testId={`${testId}-field`}
				{...props}
				className={elementsClasses?.field}
				onChange={handleOnChange}
				onBlur={handleOnBlur}
				onFocus={handleOnFocus}
			/>

			{hasError && (
				<ErrorMessage
					testId={`${testId}-error`}
					className={errorMessageClassNames}
					error={validationError}
				/>
			)}
		</Container>
	);
};
