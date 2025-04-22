import React from 'react';

import { TimerParams, UseTimer } from './types';

let timer: NodeJS.Timeout;

const DELAY = 1000;

const useTimer = ({
	startWith,
	threshold,
	isResettable = true,
	onComplete,
}: TimerParams): UseTimer => {
	const [seconds, setSeconds] = React.useState<number>(startWith);

	const clear = () => {
		clearInterval(timer);
	};

	const handleTimer = (step: number) => {
		setSeconds((prev) => {
			if (prev !== threshold) return prev + step;

			clear();

			onComplete?.();

			return isResettable ? startWith : threshold;
		});
	};

	const start = () => {
		clear();
		setSeconds(startWith);
		timer = setInterval(() => {
			handleTimer(threshold > startWith ? 1 : -1);
		}, DELAY);
	};

	return {
		seconds,
		start,
		clear,
	};
};

export default useTimer;
