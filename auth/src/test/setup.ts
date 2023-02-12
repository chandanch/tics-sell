import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: any;
beforeAll(async () => {
	//instantiate MongoMemoryServer
	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();

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
