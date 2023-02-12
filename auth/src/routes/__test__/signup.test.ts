import request from 'supertest';
import { app } from '../../app';

it('should return HTTP status code of 201', async () => {
	request(app)
		.post('/api/users/signup')
		.send({ email: 'test@ee.com', password: 'ded3ed222' })
		.expect(201);
});
