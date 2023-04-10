import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
	reason = 'Failed to connect to Database';
	statusCode = 500;

	constructor() {
		super('Failed to connect to DB!');

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
