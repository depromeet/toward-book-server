import express from 'express';
import wrap from 'express-async-wrap';
import { checkSchema } from 'express-validator';

import bookController from './controller';
import bookValidator from './validator';

const router = express.Router();

router.post('/', checkSchema(bookValidator), wrap(bookController.postBook));
router.get('/', wrap(bookController.getBookList));
router.get('/:id', wrap(bookController.getBook));

export default router;
