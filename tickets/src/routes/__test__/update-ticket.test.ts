import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';
import mongoose from 'mongoose';

const ticketsUrl = '/api/tickets';

it('should return 404 for invalid ticket ID', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();

	const response = await request(app)
		.put(ticketsUrl)
		.set('Cookie', global.signup())
		.send({});

	expect(response.statusCode).toEqual(404);
});

it('should return 401 if the user is not signed in', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();

	const response = await request(app)
		.put(ticketsUrl)
		.set('Cookie', global.signup())
		.send({ title: 'dem', price: 3, userId: '3' });

	expect(response.statusCode).toEqual(401);
});
