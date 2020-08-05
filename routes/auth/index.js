import express from 'express';

import signInRouter from './sign-in';
import signUpRouter from './sign-up';

const router = express.Router();

router.use('/sign-in', signInRouter);
router.use('/sign-up', signUpRouter);

export default router;
