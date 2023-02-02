import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { requestValidator } from '../middlewares/request-validator';

const router = express.Router();

router.post(
	'/api/users/signin',
	[
		body('email').isEmail().withMessage('Invalid Email Address'),
		body('password').trim().notEmpty().withMessage('Password is required'),
	],
	requestValidator,
	(req: Request, res: Response) => {
		res.status(200).send('OK');
	}
);

export { router as signinRouter };
