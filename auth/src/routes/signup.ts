import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post(
	'/api/users/signup',
	[
		body('email')
			.isEmail()
			.withMessage('Invalid Email, enter a valid email ID'),
		body('password')
			.isLength({ min: 4 })
			.withMessage('Password must have min of 4 characters'),
	],
	(req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new RequestValidationError(errors.array(), 400);
		}

		throw new DatabaseConnectionError();
		// res.status(201).send({ ...req.body, createdAt: new Date().toJSON() });
	}
);

export { router as signupRouter };
