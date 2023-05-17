import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';
import {
	NotFoundError,
	UnAuthorizedError,
	requireAuth,
} from '@chancorp/shared';

const router = express.Router();

router.put(
	'/api/tickets/:id',
	requireAuth,
	async (req: Request, res: Response) => {
		console.log('Rec ID', req.params.id);
		const ticket = await Ticket.findById(req.params.id);

		if (!ticket) {
			throw new NotFoundError();
		}

		if (ticket.userId !== req.currentUser!.id) {
			throw new UnAuthorizedError('User does not have access to update ticket');
		}

		res.status(200).send(ticket);
	}
);

export { router as updateTicketRouter };
