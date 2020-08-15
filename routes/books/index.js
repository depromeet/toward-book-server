import express from 'express';
import wrap from 'express-async-wrap';
import { checkSchema } from 'express-validator';

import bookController from './controller';

import bookValidator from './validator';

const router = express.Router();

router.get('/search/:title', wrap(bookController.searchBook));

router.post('/', checkSchema(bookValidator.postValidator), wrap(bookController.postBook));
router.get('/:id', wrap(bookController.getBook));
router.delete('/:id', checkSchema(bookValidator.deleteValidator), wrap(bookController.deleteBook));

export default router;
