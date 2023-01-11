import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
	constructor(public errors: ValidationError[], public statusCode: number) {
		super('Invalid email or password passed!');

		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	serializeError() {
		return this.errors.map((error) => {
			return {
				message: error.msg,
				field: error.param,
			};
		});
	}
}
