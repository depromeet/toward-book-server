import { validationResult } from 'express-validator';

import models from '../../../models';
import { logger } from '../../../config/winston';
import { successRes, errorRes } from '../../../helpers/response';

export default async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorRes(req, res, '40000');
    }
    const { nickname } = req.body;
    const user = await models.User.findAll({
      where: {
        nickname,
      },
    });
    if (user.length) {
      return errorRes(req, res, '40001');
    }
    await models.User.create(req.body);
    return successRes(req, res);
  } catch (e) {
    logger.error(e);
    return errorRes(req, res);
  }
};
