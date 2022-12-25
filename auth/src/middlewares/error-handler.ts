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
		res.status(error.statusCode).send({
			errors: error.serializeError(),
		});
	} else if (error instanceof DatabaseConnectionError) {
		res.status(error.statusCode).send({
			errors: error.serializeError(),
		});
	}
};
