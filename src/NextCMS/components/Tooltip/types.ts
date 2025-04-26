export type TooltipContentProps = {
	type?: 'light' | 'dark';
	positionHorizontal?: 'left' | 'right';
	positionVertical?: 'top' | 'bottom';
};

export type TooltipProps = {
	isShowingIcon?: boolean;
	isVisibleTooltip: boolean;
	setIsVisibleTooltip: (value: any) => void;
};
