import models from '../../../models';
import { logger } from '../../../config/winston';
import { successRes, errorRes } from '../../../helpers/response';

exports.getBooks = async (req, res) => {
  try {
    // const userId = req.user.id;
    const userId = 1;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return errorRes(req, res, '40000');
    // }
    const { count, rows } = await models.Book.findAndCountAll({
      where: {
        userId,
      },
      attributes: ['id', 'title', 'colorType', 'phrase', 'author'],
      order: [['updatedAt', 'DESC']],
    });
    return successRes(req, res, { count, rows });
  } catch (e) {
    logger.error(e);
    return errorRes(req, res);
  }
};
