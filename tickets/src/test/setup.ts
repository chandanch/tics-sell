import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import request from 'supertest';
import { app } from '../app';

let mongo: any;

declare global {
	var signup: () => Promise<string[]>;
}

beforeAll(async () => {
	// set env varialbe -- To be changed!
	process.env.JWT_KEY = 'wde33';

	//instantiate MongoMemoryServer
	mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();

	// connect mongoose to mongo mem server
	await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
	// get all collections from mongodb
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		// delete all collections
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	if (mongo) {
		// Stop Mongo DB & mem server
		await mongo.stop();
	}
	// close connection
	await mongoose.connection.close();
});

global.signup = async () => {
	const signupUrl = '/api/users/signup';
	const authResponse = await request(app)
		.post(signupUrl)
		.send({ email: 'dd@ee.com', password: 'password' });
	expect(authResponse.statusCode).toEqual(201);

	const cookie = authResponse.get('Set-Cookie');
	return cookie;
};
