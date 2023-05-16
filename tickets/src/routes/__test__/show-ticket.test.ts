import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';

const ticketsUrl = '/api/tickets';

it('should return 404 for invalid ticket ID', async () => {
	const response = await request(app)
		.get(`${ticketsUrl}/544545`)
		.set('Cookie', global.signup())
		.send();

	expect(response.statusCode).toEqual(404);
});

it('should return ticket details for valid ticket ID', async () => {
	// create the ticket
	const mock_ticket_data = { title: 'A new Showman', price: 23, userId: '3' };
	const ticket = Ticket.build(mock_ticket_data);
	await ticket.save();

	expect(ticket.id).toBeDefined();

	const response = await request(app)
		.get(`${ticketsUrl}/${ticket.id}`)
		.set('Cookie', global.signup())
		.send();

	expect(response.statusCode).toEqual(200);
	expect(response.body.title).toEqual(ticket.title);
});
