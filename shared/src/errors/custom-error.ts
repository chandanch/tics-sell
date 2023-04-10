export abstract class CustomError extends Error {
	abstract statusCode: number;

	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, CustomError.prototype);
	}

	abstract serializeError(): { message: string; field?: string }[];
}

// Refresher on Interface and its implementation :)
interface IError {
	statusCode: number;
	serializeError: (msg: string) => { message: string; code?: number };
}

const custoError: IError = {
	statusCode: 233,
	serializeError: (msg: string) => {
		return {
			message: '',
		};
	},
};
