import request from 'supertest';
import { app } from '../../app';

const ticketsUrl = '/api/tickets';

it('should consists of a router hanlder for post requests', async () => {
	const response = await request(app).post(ticketsUrl).send({});
	expect(response.statusCode).not.toEqual(404);
});

it('should not be accessible for users who not signed-in', async () => {
	const response = await request(app).post(ticketsUrl).send({});

	expect(response.statusCode).toEqual(401);
});

it('should be accessible only by signed in users', async () => {
	const cookie = global.signup();
	console.log(cookie);
	const response = await request(app)
		.post(ticketsUrl)
		.set('Cookie', cookie)
		.send({});

	expect(response.statusCode).not.toEqual(401);
});

it('should return error if invalid price is provided', async () => {
	const response = await request(app)
		.post(ticketsUrl)
		.set('Cookie', global.signup())
		.send({ title: 'dedd', price: -2 });

	expect(response.statusCode).toEqual(400);
});

it('should return error if invalid title is provided', async () => {
	const response = await request(app)
		.post(ticketsUrl)
		.set('Cookie', global.signup())
		.send({ price: 30 });

	expect(response.statusCode).toEqual(400);
});

it('should create a ticket if valid details are provided', async () => {
	const response = await request(app)
		.post(ticketsUrl)
		.send({ title: 'New Ticker', price: 20 });

	expect(response.statusCode).toEqual(201);
});
