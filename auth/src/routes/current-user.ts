import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
	res
		.status(200)
		.send({ user: 'chan', logTime: new Date().toJSON(), id: Math.random() });
});

export { router as currentuserRouter };
