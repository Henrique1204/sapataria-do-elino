export type TimerParams = {
	startWith: number;
	threshold: number;

	isResettable?: boolean;
	onComplete?: () => void;
};

export type UseTimerAcions = {
	start: () => void;
	clear: () => void;
};

export type UseTimer = { seconds: number } & UseTimerAcions;
