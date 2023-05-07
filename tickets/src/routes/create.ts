import { requireAuth } from '@chancorp/shared';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post(
	'/api/tickets',
	requireAuth,
	(request: Request, respone: Response) => {
		respone.send({ id: 1, data: 'data' });
	}
);

export { router as createTicketRouter };
