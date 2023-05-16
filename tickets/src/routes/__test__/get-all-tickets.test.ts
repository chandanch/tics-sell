import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';

const ticketsUrl = '/api/tickets';

const createTicket = async (title: string, price: number, userId: string) => {
	const ticket = Ticket.build({ title, price, userId });
	await ticket.save();

	return ticket;
};

it('should return all tickets', async () => {
	await createTicket('Passman Show', 2, '3');
	await createTicket('Bene Movie', 22, '3');

	const response = await request(app)
		.get(ticketsUrl)
		.set('Cookie', global.signup())
		.send();

	expect(response.statusCode).toEqual(200);
	expect(response.body.length).toEqual(2);
});
