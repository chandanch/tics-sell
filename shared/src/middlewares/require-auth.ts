import { NextFunction, Request, Response } from 'express';
import { UnAuthorizedError } from '../errors/unauthorized-error';

export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.currentUser) {
		throw new UnAuthorizedError('Unauthorized');
	}

	next();
};
