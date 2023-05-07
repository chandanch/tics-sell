import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/tickets', (request: Request, respone: Response) => {
	respone.send({ id: 1, data: 'data' });
});

export { router as createTicketRouter };
