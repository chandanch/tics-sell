import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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
			res.status(400).send(errors.array());
		}

		res.status(201).send({ ...req.body, createdAt: new Date().toJSON() });
	}
);

export { router as signupRouter };
