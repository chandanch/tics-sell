import request from 'supertest';
import { app } from '../../app';

const signupUrl = '/api/users/signup';
const currentUserUrl = '/api/users/currentuser';

it('should return user details', async () => {
	const authResponse = await request(app)
		.post(signupUrl)
		.send({ email: 'dd@ee.com', password: 'password' });
	expect(authResponse.statusCode).toEqual(201);

	const cookie = authResponse.get('Set-Cookie');
	const currentUserResponse = await request(app)
		.get(currentUserUrl)
		.set('Cookie', cookie)
		.send();
	expect(currentUserResponse.statusCode).toEqual(200);
	const { email, id } = currentUserResponse.body.currentUser;

	expect(email).toEqual('dd@ee.com');
});
