import request from 'supertest';
import { app } from '../../app';

const signinUrl = '/api/users/signin';
const signupUrl = '/api/users/signup';

it('should set cookie header on sucessful signin', async () => {
	const response = await request(app)
		.post(signupUrl)
		.send({ email: 'dd@ee.com', password: 'password' });
	expect(response.statusCode).toEqual(201);

	const response2 = await request(app)
		.post(signinUrl)
		.send({ email: 'dd@ee.com', password: 'password' });
	expect(response2.get('Set-Cookie')).toBeDefined();
});

it('should return error for invalid email', async () => {
	const response = await request(app)
		.post(signupUrl)
		.send({ email: 'dd@ee.com', password: 'password' });
	expect(response.statusCode).toEqual(201);

	const response2 = await request(app)
		.post(signinUrl)
		.send({ email: 'eee2e@ee.com', password: 'password' });
	expect(response2.statusCode).toEqual(400);
});

it('should return error for invalid password', async () => {
	const response = await request(app)
		.post(signupUrl)
		.send({ email: 'dd@ee.com', password: 'password' });
	expect(response.statusCode).toEqual(201);

	const response2 = await request(app)
		.post(signinUrl)
		.send({ email: 'eee2e@ee.com', password: 'fillaldm' });
	expect(response2.statusCode).toEqual(400);
});
