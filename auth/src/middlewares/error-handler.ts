import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

export const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// console.log(error);
	if (error instanceof RequestValidationError) {
		res.status(400).send({
			message: 'Validation Error',
			error: error.message,
		});
	} else if (error instanceof DatabaseConnectionError) {
		res.status(500).send({
			message: 'Database Error',
			error: error.message,
		});
	}
};
