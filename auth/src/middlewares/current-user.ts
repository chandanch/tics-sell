import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const currentUser = (req: Request, res: Response, next: NextFunction) => {
	if (!req.session?.jwt) {
		next();
	}

	try {
		const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!);
		//TODO: Add jwt payload to request object
	} catch (error) {
		console.log(error);
	}
	next();
};
