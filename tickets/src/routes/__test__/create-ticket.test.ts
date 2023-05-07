import request from 'supertest';
import { app } from '../../app';

const tickets_url = '/api/tickets';

it('should consists of a router hanlder for post requests', async () => {
	const response = await request(app).post(tickets_url).send({});
	expect(response.statusCode).not.toEqual(404);
});

it('should be accessible only by signed in users', async () => {
	const response = await request(app).post(tickets_url).send({});

	expect(response.statusCode).toEqual(401);
});

it('should create a ticket if valid details are provided', () => {});

it('should return error if invalid price is provided', () => {});

it('should return error if invalid title is provided', () => {});
