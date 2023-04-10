import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnAuthorizedError } from '../errors/unauthorized-error';

interface UserPayload {
	email: string;
	id: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session?.jwt) {
		next();
	}

	try {
		const payload = jwt.verify(
			req.session?.jwt,
			process.env.JWT_KEY!
		) as UserPayload;
		// set currentUser to req object
		req.currentUser = payload;
	} catch (error) {
		console.log(error);
		throw new UnAuthorizedError('Unauthorized, Try Again');
	}
	next();
};
