import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/bad-request-error';
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
			throw new BadRequestError('Email already exists');
		} else {
			const user = User.build({ email, password });

			await user.save();

			const userJwt = jwt.sign(
				{
					id: user.id,
					email: user.email,
				},
				process.env.JWT_KEY!
			);
			console.log(userJwt, user);
			req.session = {
				jwt: userJwt,
			};

			res.status(200).send(user);
		}
	}
);

export { router as signupRouter };
