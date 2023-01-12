import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';

import { currentuserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { requestLogger } from './middlewares/request-logger';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

// add all middlewares
app.use(requestLogger);

app.use(currentuserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', async () => {
	throw new NotFoundError();
});

// add all error handling middileware functions
app.use(errorHandler);

const initializeApp = async () => {
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
