'use client';

import React, { useState } from 'react';

import * as Types from './types';

import { POSITION_STYLES, CLOSE_TIMEOUT } from './constants';
import classNames from 'classnames';

let _open: Types.openFn = () => {};

export const Toast: Component<Partial<Types.ToasterProps>> = ({
	position: defaultPosition = 'topRight',
	timeout: defaultTimeout = CLOSE_TIMEOUT,
}) => {
	const [toasters, setToasters] = useState<Types.OpenToasterProps[]>([]);

	const handleOpen: Types.openFn = ({
		message,
		status = 'info',
		position = defaultPosition,
		timeout = defaultTimeout,
	}) => {
		setToasters((prev) => [...prev, { message, position, status }]);

		setTimeout(() => {
			setToasters((prev) => prev.filter((_, index) => index !== 0));
		}, timeout);
	};

	_open = handleOpen;

	return (
		<>
			{toasters.map((toaster, index) => {
				const toastClassNames = classNames(
					'p-2 border border-solid rounded-lg',
					toaster.status === 'success' &&
						'bg-green-200 border-green-600  text-green-800',
					toaster.status === 'error' &&
						'bg-red-200 border-red-600  text-red-800',
					toaster.status === 'info' &&
						'bg-blue-200 border-blue-600  text-blue-800',
					toaster.status === 'warning' &&
						'bg-yellow-200 border-yellow-600  text-yellow-800'
				);

				const toastPositionStyle =
					POSITION_STYLES[toaster.position || defaultPosition]?.(index) || {};

				return (
					<div
						className={toastClassNames}
						key={index}
						style={{
							position: 'fixed',
							zIndex: 1000,
							transition: 'opacity 0.3s',
							...toastPositionStyle,
						}}
					>
						{toaster.message}
					</div>
				);
			})}
		</>
	);
};

export const open: Types.openFn = (props) => _open(props);
