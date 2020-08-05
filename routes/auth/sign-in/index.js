import express from 'express';
import wrap from 'express-async-wrap';
import { checkSchema } from 'express-validator';

import signInController from './controller';

import signInValidator from './validator';

const router = express.Router();

router.post('/', checkSchema(signInValidator), wrap(signInController));

export default router;
