import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import request from 'supertest';
import { app } from '../app';
import { json } from 'express';

let mongo: any;

declare global {
	var signup: (id?: string) => string[];
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

/**
 * @desc generates a custom cookie
 */
global.signup = (id?: string) => {
	// generate jwt
	const user = {
		email: 'test@ee.com',
		id: id ? id : new mongoose.Types.ObjectId().toHexString(),
	};
	const userJwt = jwt.sign(user, process.env.JWT_KEY!);

	const session = { jwt: userJwt };
	const sessionJSON = JSON.stringify(session);

	// encode into base 64
	const base64 = Buffer.from(sessionJSON).toString('base64');

	// construct & return cookie string
	return [`session=${base64}`];
};
