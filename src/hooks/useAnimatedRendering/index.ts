'use client';

import React from 'react';

import { UseAnimatedRenderingFn } from './type';

const useAnimatedRendering: UseAnimatedRenderingFn = ({
	initialRenderState,
	animationDuration = 500,
	onHide,
	onShow,
}) => {
	const [isRendered, setIsRendered] =
		React.useState<boolean>(initialRenderState);

	const [isEntering, setIsEntering] =
		React.useState<boolean>(initialRenderState);

	const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

	const hideElement = () => {
		onHide?.();

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		setIsEntering(false);

		timeoutRef.current = setTimeout(
			() => setIsRendered(false),
			animationDuration
		);
	};

	const showElement = () => {
		onShow?.();

		setIsRendered(true);
		setIsEntering(true);
	};

	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	return { hideElement, showElement, isRendered, isEntering };
};

export default useAnimatedRendering;
