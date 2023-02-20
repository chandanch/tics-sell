import request from 'supertest';
import { app } from '../../app';

const signupUrl = '/api/users/signup';
const signoutUrl = '/api/users/signout';

it('should remove session cookie on signout', async () => {
	const response = await request(app)
		.post(signupUrl)
		.send({ email: 'dd@ee.com', password: 'password' });
	expect(response.statusCode).toEqual(201);

	const signoutResponse = await request(app).post(signoutUrl);
	expect(signoutResponse.statusCode).toEqual(200);
	expect(signoutResponse.get('Set-Cookie')).toBeDefined();
});
