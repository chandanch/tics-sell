export class DatabaseConnectionError extends Error {
	reason = 'Failed to connect to Datbase';

	constructor() {
		super();

		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}
}
