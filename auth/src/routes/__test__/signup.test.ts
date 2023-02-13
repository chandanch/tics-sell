import request from 'supertest';
import { app } from '../../app';

const signupUrl = '/api/users/signup';

it('should return 201 for valid user details', async () => {
	request(app)
		.post(signupUrl)
		.send({ email: 'test@ee.com', password: 'ded3ed222' })
		.expect(201);
});

it('should return 400 for invalid email', async () => {
	const response = await request(app)
		.post(signupUrl)
		.send({ email: 'dd', password: 'ddw23e123' });

	expect(response.statusCode).toEqual(400);
});

it('should return 400 for invalid password', async () => {
	const response = await request(app)
		.post(signupUrl)
		.send({ email: 'dd@ee.com', password: 'ds' });

	expect(response.statusCode).toEqual(400);
});

it('should not allow duplicate email', async () => {
	// create user
	const userCreateResponse1 = await request(app)
		.post(signupUrl)
		.send({ email: 'dd@ee.com', password: 'ds22213d12' });
	expect(userCreateResponse1.statusCode).toEqual(201);

	// create the same user again
	const userCreateResponse2 = await request(app)
		.post(signupUrl)
		.send({ email: 'dd@ee.com', password: 'ds22213d12' });
	expect(userCreateResponse2.statusCode).toEqual(400);
});

it('should set cookie header on sucessful signup', async () => {
	const response = await request(app)
		.post(signupUrl)
		.send({ email: 'dd@ee.com', password: 'ds22213d12' });
	expect(response.get('Set-Cookie')).toBeDefined();
});
