import { requestValidator, requireAuth } from '@chancorp/shared';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post(
	'/api/tickets',
	requireAuth,
	[
		body('title').not().isEmpty().withMessage('Title is required'),
		body('price').isFloat({ gt: 0 }).withMessage('Price must be > 0'),
	],
	requestValidator,
	(request: Request, respone: Response) => {
		respone.send({ id: 1, data: 'data' });
	}
);

export { router as createTicketRouter };
