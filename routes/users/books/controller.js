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
    const user = await models.User.findOne({
      where: {
        id: userId,
      },
      attributes: ['nickname', 'profileImageType'],
    });
    const count = await models.Book.count({
      where: {
        userId,
      },
    });
    const bookList = await models.Book.findAll({
      where: {
        userId,
      },
      attributes: ['id', 'title', 'colorType', 'phrase', 'author'],
      order: [['updatedAt', 'DESC']],
    });
    return successRes(req, res, { user, count, bookList });
  } catch (e) {
    logger.error(e);
    return errorRes(req, res);
  }
};
