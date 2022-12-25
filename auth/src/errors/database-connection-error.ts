export class DatabaseConnectionError extends Error {
	reason = 'Failed to connect to Database';
	statusCode = 500;

	constructor() {
		super();

		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeError() {
		return [
			{
				message: this.reason,
			},
		];
	}
}
