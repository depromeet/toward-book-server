import express from 'express';
import wrap from 'express-async-wrap';
import { checkSchema } from 'express-validator';

import bookController from './controller';

import bookValidator from './validator';

const router = express.Router();

router.get(
  '/search/:title',
  checkSchema(bookValidator.searchValidator),
  wrap(bookController.searchBook)
);
router.post('/', checkSchema(bookValidator.postValidator), wrap(bookController.postBook));
router.get('/:id', checkSchema(bookValidator.getValidator), wrap(bookController.getBook));
router.get('/', checkSchema(bookValidator.getsValidator), wrap(bookController.getBooks));
router.delete('/:id', checkSchema(bookValidator.deleteValidator), wrap(bookController.deleteBook));

export default router;
