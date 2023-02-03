import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
	if (!req.session?.jwt) {
		res.status(200).send({ currentUser: null });
	}

	try {
		const userData = jwt.verify(req.session?.jwt, process.env.JWT_KEY!);
		res.status(200).send({ currentUser: userData });
	} catch (error) {
		res.status(200).send({ currentUser: null });
	}
});

export { router as currentuserRouter };
