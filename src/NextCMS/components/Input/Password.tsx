'use client';

import React from 'react';

import classNames from 'classnames';

import { InputBaseProps } from './types';

import { InputBase } from './Base';

import Icon from '../Icon';

const InputPassword: React.FC<InputBaseProps> = (props) => {
	const [hasValidateError, setHasValidateError] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	const eyeButtonClassname = classNames(
		'absolute w-6 h-6 right-2 flex bg-transparent cursor-pointer items-center focus:outline-none text-cms-content-main'
	);

	return (
		<div className='relative flex items-center'>
			<InputBase
				{...props}
				type={showPassword ? 'text' : 'password'}
				onValidate={setHasValidateError}
				iconELement={
					<Icon
						name={showPassword ? 'Eye' : 'EyeSlash'}
						className={eyeButtonClassname}
						onClick={togglePasswordVisibility}
					/>
				}
			/>
		</div>
	);
};

export default InputPassword;
