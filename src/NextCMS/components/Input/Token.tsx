'use client';

import React from 'react';

import classNames from 'classnames';

import { maskOnlyNumbers } from '../../core/utils/mask';

import * as Types from './types';

import { Field, Container, Label } from './components';

const Token: Component<Types.InputTokenProps> = ({
	testId = 'input-token',
	label = 'Token',
	quantity = 4,
	className,
	value = '',
	name,
	onChangeText,
	...props
}) => {
	const [textValue, setTextValue] = React.useState<string[]>(value.split(''));
	const tokenFieldClassName = classNames(
		'!w-16 h-20 text-center text-3xl',
		className
	);
	const refs = React.useRef<Array<HTMLInputElement | null>>([]);

	const handlePaste = (
		event: React.ClipboardEvent<HTMLInputElement>,
		startIndex: number
	) => {
		event.preventDefault();

		const pastedData = event.clipboardData.getData('text');
		const numbersOnly = maskOnlyNumbers(pastedData);
		const chars = numbersOnly.split('');

		const availableSpace = quantity - startIndex;
		const charsToUse = chars.slice(0, availableSpace);

		const newTextValue = [...textValue];

		charsToUse.forEach((char, index) => {
			const targetIndex = startIndex + index;

			if (targetIndex < quantity) newTextValue[targetIndex] = char;
		});

		setTextValue(newTextValue);
		onChangeText?.(newTextValue.join(''));

		// Foca no próximo campo vazio ou no último campo
		const nextEmptyIndex = newTextValue.findIndex(
			(val, idx) => idx > startIndex && !val
		);
		if (nextEmptyIndex !== -1 && nextEmptyIndex < quantity) {
			refs.current[nextEmptyIndex]?.focus();
		} else {
			refs.current[
				Math.min(startIndex + charsToUse.length, quantity - 1)
			]?.focus();
		}
	};

	const handleBackspace =
		(index: number): React.KeyboardEventHandler<HTMLInputElement> =>
		({ key }) => {
			if (key !== 'Backspace') return;

			if (textValue[index] === '') return refs.current[index - 1]?.focus();

			const newTextValue = [...textValue];
			newTextValue[index] = '';
			setTextValue(newTextValue);
			onChangeText?.(newTextValue.join(''));
		};

	const handleOnChange = (index: number) => (text: string) => {
		const textOnlyNumber = maskOnlyNumbers(text);

		if (textOnlyNumber === '') return;

		const newTextValue = [...textValue];
		newTextValue[index] = textOnlyNumber[text.length - 1];

		setTextValue(newTextValue);
		onChangeText?.(newTextValue.join(''));

		if (quantity - 1 > index) refs.current[index + 1]?.focus();
	};

	return (
		<Container>
			<Label label={label} />
			<div className='flex gap-2'>
				{Array.from({ length: quantity }).map((_, index) => (
					<Field
						key={`${name}-${index}`}
						data-testid={`${name}-${index}`}
						// @ts-ignore
						ref={(ref) => (refs.current[index] = ref)}
						{...props}
						name={`${name}-${index}`}
						className={tokenFieldClassName}
						inputMode='numeric'
						value={textValue[index] || ''}
						onChange={({ target }) =>
							handleOnChange(index)((target as HTMLInputElement).value)
						}
						onKeyDown={handleBackspace(index)}
						onPaste={(e) => handlePaste(e, index)}
						data-filled={!!textValue[index]}
					/>
				))}
			</div>
		</Container>
	);
};

export default Token;
