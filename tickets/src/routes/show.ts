import { requestValidator, requireAuth } from '@chancorp/shared';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';

const router = express.Router();

router.get('/api/tickets/:id', async (request: Request, response: Response) => {
	response.send({});
});
