import { NextFunction, Request, Response } from 'express';
import { UnAuthorizedError } from '../errors/unauthorized-error';

export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session) {
		throw new UnAuthorizedError('Unauthorized');
	}
};
