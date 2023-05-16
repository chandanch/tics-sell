import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';
import { NotFoundError } from '@chancorp/shared';

const router = express.Router();

router.put('/api/tickets/:id', (req: Request, res: Response) => {
	const ticket = Ticket.findById({ id: req.params.id });

	if (!ticket) {
		throw new NotFoundError();
	}

	res.status(200).send(ticket);
});
