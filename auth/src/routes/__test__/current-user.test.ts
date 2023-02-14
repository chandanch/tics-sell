import request from 'supertest';
import { app } from '../../app';

const signupUrl = '/api/users/signup';
const currentUserUrl = '/api/users/currentuser';

it('should return user details', async () => {
	const response = await request(app)
		.post(signupUrl)
		.send({ email: 'dd@ee.com', password: 'password' });
	expect(response.statusCode).toEqual(201);

	const currentUserResponse = await request(app).get(currentUserUrl).send();
	expect(currentUserResponse.statusCode).toEqual(200);
	console.log(currentUserResponse.body);
});
