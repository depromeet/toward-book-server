import express from 'express';

import authRouter from './auth';
import bookRouter from './books';
import userRouter from './users';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/books', bookRouter);
router.use('/users', userRouter);

export default router;
