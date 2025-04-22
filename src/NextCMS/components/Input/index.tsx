import React from 'react';

import { InputProps } from './types';

import { InputBase } from './Base';
import InputPassword from './Password';
import Token from './Token';

const Input: Component<InputProps> = (props) => {
	if (props.type === 'token') return <Token {...props} />;

	if (props.type === 'password') return <InputPassword {...props} />;

	return <InputBase {...props} />;
};

export default Input;
