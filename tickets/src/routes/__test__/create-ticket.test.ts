import request from 'supertest';
import { app } from '../../app';

it('should consists of a router hanlder for post requests', async () => {
	const response = await request(app).post('/api/tickets').send({});
	expect(response.statusCode).not.toEqual(404);
});

it('should create a ticket if valid details are provided', () => {});

it('should return error if invalid price is provided', () => {});

it('should return error if invalid title is provided', () => {});
