import { requestValidator, requireAuth } from '@chancorp/shared';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';

const router = express.Router();

router.post(
	'/api/tickets',
	requireAuth,
	[
		body('title').not().isEmpty().withMessage('Title is required'),
		body('price').isFloat({ gt: 0 }).withMessage('Price must be > 0'),
	],
	requestValidator,
	async (request: Request, respone: Response) => {
		const { title, price } = request.body;

		const ticket = Ticket.build({
			title,
			price,
			userId: request.currentUser!.id,
		});

		await ticket.save();

		respone.status(201).send(ticket);
	}
);

export { router as createTicketRouter };
