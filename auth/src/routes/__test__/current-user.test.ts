import request from 'supertest';
import { app } from '../../app';

const currentUserUrl = '/api/users/currentuser';

it('should return user details', async () => {
	const cookie = await global.signup();
	const currentUserResponse = await request(app)
		.get(currentUserUrl)
		.set('Cookie', cookie)
		.send();
	expect(currentUserResponse.statusCode).toEqual(200);
	const { email, id } = currentUserResponse.body.currentUser;

	expect(email).toEqual('dd@ee.com');
});

it('should return 401 unauthorized if not signed in', async () => {
	const currentUserResponse = await request(app).get(currentUserUrl).send();
	expect(currentUserResponse.statusCode).toEqual(401);
});
