import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { requestValidator } from '../middlewares/request-validator';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { PasswordHash } from '../utils/password-hash';

const router = express.Router();

router.post(
	'/api/users/signin',
	[
		body('email').isEmail().withMessage('Invalid Email Address'),
		body('password').trim().notEmpty().withMessage('Password is required'),
	],
	requestValidator,
	async (request: Request, response: Response) => {
		const { email, password } = request.body;

		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			throw new BadRequestError('Login Failed, try again');
		}

		const isPasswordMatch = await PasswordHash.compareHash(
			password,
			existingUser.password
		);

		if (!isPasswordMatch) {
			throw new BadRequestError('Invalid Credentials, try again');
		}
		const userJwt = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email,
			},
			process.env.JWT_KEY!
		);
		request.session = {
			jwt: userJwt,
		};

		response.status(200).send(existingUser);
	}
);

export { router as signinRouter };
