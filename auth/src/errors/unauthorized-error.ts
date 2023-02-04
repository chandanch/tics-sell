import { CustomError } from './custom-error';

export class UnAuthorizedError extends CustomError {
	statusCode = 401;

	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, UnAuthorizedError.prototype);
	}

	serializeError() {
		return [
			{
				message: this.message,
			},
		];
	}
}
