import express from 'express';

import bookRouter from './books';

const router = express.Router();

router.use('/books', bookRouter);

export default router;
