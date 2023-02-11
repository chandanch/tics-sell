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

afterAll(async () => {
	if (mongo) {
		// Stop Mongo DB & mem server
		await mongo.stop();
	}
	// close connection
	await mongoose.connection.close();
});
