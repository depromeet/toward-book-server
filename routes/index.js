import express from 'express';

import authRouter from './auth';
import bookRouter from './book';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/book', bookRouter);

export default router;
