import mongoose from 'mongoose';

import { app } from './app';

const initializeApp = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT Key is missing, aborting app load');
	}

	try {
		await mongoose.connect('mongodb://auth-mongodb-service:27017/auth');
		mongoose.set('strictQuery', false);
		console.log('Connected to DB');
	} catch (error) {
		console.log('Error connecting to DB:', error);
	}

	app.listen(3000, () => {
		console.log('App Started on 3000');
	});
};

initializeApp();
