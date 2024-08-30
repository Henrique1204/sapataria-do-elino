export type AnimatedRenderingProps = {
	initialRenderState: boolean;

	animationDuration?: number;

	onHide?: () => void;
	onShow?: () => void;
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
