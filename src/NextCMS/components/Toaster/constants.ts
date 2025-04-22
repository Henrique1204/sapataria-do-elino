import { HTMLProps } from 'react';

import * as Types from './types';

export const CLOSE_TIMEOUT = 3 * 1000;

export const POSITION_STYLES: Record<
	Types.Position,
	(index: number) => HTMLProps<HTMLDialogElement>['style']
> = {
	bottomLeft: (index: number) => {
		return {
			bottom: `${20 + index * 60}px`,
			left: '20px',
		};
	},
	bottomRight: (index: number) => {
		return {
			bottom: `${20 + index * 60}px`,
			right: '20px',
		};
	},
	topLeft: (index: number) => {
		return {
			top: `${20 + index * 60}px`,
			left: '20px',
		};
	},
	topRight: (index: number) => {
		return {
			top: `${20 + index * 60}px`,
			right: '20px',
		};
	},
};
