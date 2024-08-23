export type DebounceCallback<T extends any[]> = (...args: T) => void;

export type CreateDebounceParams<T extends any[]> = {
	callback: DebounceCallback<T>;
	delay: number;
	shouldAutoClear?: boolean;
};

export type CreateDebounceReturn<T extends any[]> = Readonly<
	[DebounceCallback<T>, () => void]
>;

export type CreateDebounceFn = <T extends any[]>(
	params: CreateDebounceParams<T>
) => CreateDebounceReturn<T>;
