type ConfigParams = {
	condition: () => boolean | Promise<boolean>;
	interval?: number;
	maxAttempts?: number;
};

export const waitLoad = ({
	condition,
	interval = 100,
	maxAttempts = 3,
}: ConfigParams): Promise<void> => {
	return new Promise((resolve, reject) => {
		let attempts = 0;

		const intervalId = setInterval(async () => {
			if (await condition()) {
				clearInterval(intervalId);

				resolve();
			} else if (attempts >= maxAttempts) {
				clearInterval(intervalId);

				reject(
					new Error(
						'A condição não foi atendida dentro do limite de tentativas'
					)
				);
			}

			attempts++;
		}, interval);
	});
};

export const waitLoadSystemJs = async () => {
	await waitLoad({
		condition: () => typeof System !== 'undefined',
	});
};

export const waitLoadSingleSPA = async () => {
	await waitLoadSystemJs();

	await waitLoad({
		condition: async () => {
			const singleSPA = await System.import('single-spa');

			return !!singleSPA;
		},
	});
};
