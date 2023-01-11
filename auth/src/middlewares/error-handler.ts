import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

export const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(error);
	if (error instanceof CustomError) {
		res.status(error.statusCode).send({
			errors: error.serializeError(),
		});
	} else {
		res.status(422).send({
			errors: [
				{
					message: 'Something went wrong',
				},
			],
		});
	}
};
