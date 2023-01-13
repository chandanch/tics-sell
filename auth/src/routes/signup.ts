import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';

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
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new RequestValidationError(errors.array(), 400);
		}

		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			res.status(400).send({ message: 'User Exists' });
		} else {
			const user = User.build({ email, password });

			await user.save();

			res.status(200).send(user);
		}
	}
);

export { router as signupRouter };
