import { NextFunction, Request, Response } from 'express';

export const requestLogger = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// console.log(`Req: ${req.method} ${req.ip} ${req.url}`);
	next();
};
