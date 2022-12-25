import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
	constructor(public errors: ValidationError[], public statusCode: number) {
		super();

		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	serializeError() {
		const formattedErrors = this.errors.map((error) => {
			return {
				message: error.msg,
				field: error.param,
			};
		});
		return formattedErrors;
	}
}
