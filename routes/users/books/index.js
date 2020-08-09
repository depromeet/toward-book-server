import express from 'express';
import wrap from 'express-async-wrap';

import bookController from './controller';

const router = express.Router();

router.get('/', wrap(bookController.getBooks));

export default router;
