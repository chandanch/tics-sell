import request from 'supertest';
import { app } from '../../app';

const ticketsUrl = '/api/tickets';

it('should return 404 for invalid ticket ID', async () => {
	const response = await request('app')
		.get(`${ticketsUrl}/2`)
		.set('Cookie', global.signup())
		.send();

	expect(response.statusCode).toEqual(404);
});

it('should return ticket details for valid ticket ID', async () => {});
