import mongoose from 'mongoose';

import { app } from './app';

const initializeApp = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT Key is missing, aborting app load');
	}

	if (!process.env.DB_URI) {
		throw new Error('DB URI does not exist');
	}

	try {
		await mongoose.connect(process.env.DB_URI);
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
