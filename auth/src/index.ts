import express from 'express';
import { json } from 'body-parser';
import { currentuserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { requestLogger } from './middlewares/request-logger';

const app = express();
app.use(json());

// add all middlewares
app.use(requestLogger);

app.use(currentuserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

// add all error handling middileware functions
app.use(errorHandler);

app.listen(3000, () => {
	console.log('App Started on 3000');
});
