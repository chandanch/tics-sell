import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

export const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(error);
	if (error instanceof RequestValidationError) {
		const formattedErrors = error.error.map((errorData) => {
			return {
				message: errorData.msg,
				field: errorData.param,
			};
		});
		const errorResponse = {
			errors: formattedErrors,
		};
		res.status(400).send(errorResponse);
	} else if (error instanceof DatabaseConnectionError) {
		res.status(500).send({
			errors: [{ message: error.reason }],
		});
	}
};
