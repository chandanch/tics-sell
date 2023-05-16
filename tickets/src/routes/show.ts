import { requestValidator, requireAuth } from '@chancorp/shared';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';

const router = express.Router();

router.get('/api/tickets/:id', async (request: Request, response: Response) => {
	const ticket = await Ticket.findById(request.params.id);
	response.status(200).send(ticket);
});

export { router as showTicketsRouter };
