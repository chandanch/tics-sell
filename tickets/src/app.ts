import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';

const app = express();

// ensure that express application is aware of proxy
// and treats the proxy i.e nginx ingress as secure
app.set('trust proxy', true);

app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test',
	})
);

// add all middlewares


// add all routes here

app.all('*', async () => {
	throw new NotFoundError();
});

// add all error handling middileware functions
app.use(errorHandler);

export { app };
