export type AnimatedRenderingProps = {
	initialRenderState: boolean;
	animationDuration?: number;
};

export type AnimatedRenderingReturn = {
	isRendered: boolean;
	isEntering: boolean;

	hideElement: () => void;
	showElement: () => void;
};

export type UseAnimatedRenderingFn = (
	props: AnimatedRenderingProps
) => AnimatedRenderingReturn;
