import express from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '@chancorp/shared';
import { requireAuth } from '@chancorp/shared';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
	res.send({ currentUser: req.currentUser });
});

export { router as currentuserRouter };
