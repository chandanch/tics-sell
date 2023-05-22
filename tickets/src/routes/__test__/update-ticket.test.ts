import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';
import mongoose from 'mongoose';

const ticketsUrl = '/api/tickets';

const createTicket = async (title: string, price: number, userId: string) => {
	const ticket = Ticket.build({ title, price, userId });
	await ticket.save();

	return ticket;
};

it('should return 404 for invalid ticket ID', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();
	console.log('Id gen', id);

	const response = await request(app)
		.put(`${ticketsUrl}/${id}`)
		.set('Cookie', global.signup())
		.send({ title: 'edede', price: 22 });

	expect(response.statusCode).toEqual(404);
});

it('should return 401 if the user is not signed in', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();

	const response = await request(app)
		.put(`${ticketsUrl}/${id}`)
		.send({ title: 'dem', price: 3, userId: '3' });

	expect(response.statusCode).toEqual(401);
});

it('should return 401 if ticket is not created by user', async () => {
	const createdTicket = await createTicket(
		'Nome Show',
		22,
		new mongoose.Types.ObjectId().toHexString()
	);

	const response = await request(app)
		.put(`${ticketsUrl}/${createdTicket.id}`)
		.set('Cookie', global.signup())
		.send({ title: 'wee', price: 22 });

	expect(response.statusCode).toEqual(401);
});

it('should return 400 if invalid title or price is specified', async () => {
	const userId = new mongoose.Types.ObjectId().toHexString();
	const cookie = global.signup(userId);
	const createdTicket = await createTicket('A new sd', 12, userId);
	await request(app)
		.put(`${ticketsUrl}/${createdTicket.id}`)
		.set('Cookie', cookie)
		.send({ title: '', price: 22 })
		.expect(400);

	await request(app)
		.put(`${ticketsUrl}/${createdTicket.id}`)
		.set('Cookie', cookie)
		.send({ title: 'FDefd', price: -22 })
		.expect(400);
});

it('should return 200 and update ticket if valid ticket details are provided', async () => {
	const userId = new mongoose.Types.ObjectId().toHexString();
	const createdTicket = await createTicket('A new sd', 12, userId);
	const updatedTicketData = { title: 'Filman Show', price: 23 };

	const response = await request(app)
		.put(`${ticketsUrl}/${createdTicket.id}`)
		.set('Cookie', global.signup(userId))
		.send(updatedTicketData);

	expect(response.statusCode).toEqual(200);
	expect(response.body.title).toEqual(updatedTicketData.title);
});
