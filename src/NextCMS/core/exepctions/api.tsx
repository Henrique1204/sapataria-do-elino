class APIException {
	constructor(
		public readonly message: string,
		public readonly code: number = 500
	) {}
}

export default APIException;
