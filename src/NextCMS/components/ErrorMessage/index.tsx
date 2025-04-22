import React from 'react';

import { ErrorMessageProps } from './types';

const ErrorMessage: Component<ErrorMessageProps> = ({ error }) => {
	if (!error) return <></>;

	return <small className='text-red-500 text-sm'>{error}</small>;
};

export default ErrorMessage;
