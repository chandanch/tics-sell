import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';
import {
	NotFoundError,
	UnAuthorizedError,
	requestValidator,
	requireAuth,
} from '@chancorp/shared';

const router = express.Router();

router.put(
	'/api/tickets/:id',
	requireAuth,
	[
		body('title')
			.not()
			.isEmpty()
			.isString()
			.withMessage('Title is required and must be string'),

		body('price')
			.not()
			.isEmpty()
			.isFloat()
			.withMessage('Price is required and must be a number'),
	],
	requestValidator,
	async (req: Request, res: Response) => {
		const ticket = await Ticket.findById(req.params.id);

		if (!ticket) {
			throw new NotFoundError();
		}

		if (ticket.userId !== req.currentUser!.id) {
			throw new UnAuthorizedError('User does not have access to update ticket');
		}

		ticket.set({ title: req.body.title, price: req.body.price });

		await ticket.save();

		res.status(200).send(ticket);
	}
);

export { router as updateTicketRouter };
