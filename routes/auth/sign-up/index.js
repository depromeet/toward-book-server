import express from 'express';
import wrap from 'express-async-wrap';
import { checkSchema } from 'express-validator';

import signUpController from './controller';
import signUpValidator from './validator';

const router = express.Router();

router.post('/', checkSchema(signUpValidator), wrap(signUpController));

export default router;
