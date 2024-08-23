import { CreateDebounceFn, CreateDebounceParams } from './type';

const createDebounce: CreateDebounceFn = <T extends any[]>({
	callback,
	delay,
	shouldAutoClear = false,
}: CreateDebounceParams<T>) => {
	let timeoutId: number | null = null;

	const clearDebounce = () => {
		if (timeoutId !== null) {
			window.clearTimeout(timeoutId);
			timeoutId = null;
		}
	};

	const triggerDebounce = (...args: T) => {
		if (shouldAutoClear) {
			clearDebounce();
		} else if (timeoutId !== null) {
			timeoutId = null;
		}

		timeoutId = window.setTimeout(() => {
			callback(...args);
			timeoutId = null;
		}, delay);
	};

	return [triggerDebounce, clearDebounce] as const;
};

export default createDebounce;
