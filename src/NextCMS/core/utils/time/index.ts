export const getHoursInSeconds = (hours: number): number => {
	const MINUTES_IN_HOUR = 60 * 60;

	return MINUTES_IN_HOUR * hours;
};
