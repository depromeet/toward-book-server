import { validationResult } from 'express-validator';

import models from '../../models';
import { logger } from '../../config/winston';
import { successRes, errorRes } from '../../helpers/response';

exports.postBook = async (req, res) => {
  // const userId = req.user.id;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorRes(req, res, '40000');
    }
    // API 사용 제목으로 search 후 저자, 출판사, 출판일, 설명과 같이 저장!
    const { id } = await models.Book.create(req.body);
    const { tags } = req.body;
    tags.forEach(async (tag) => {
      await models.BookTagBridge.create({
        bookId: id,
        tagId: tag,
      });
    });
    return successRes(req, res);
  } catch (e) {
    logger.error(e);
    return errorRes(req, res);
  }
};

exports.getBook = async (req, res) => {
  try {
    // const userId = req.user.id;
    const userId = 1;

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return errorRes(req, res, '40000');
    // }
    const bookId = req.params.id;
    const user = await models.User.findOne({
      where: {
        id: userId,
      },
      attributes: ['nickname', 'profileImageType'],
    });
    const book = await models.Book.findOne({
      where: {
        id: bookId,
      },
      attributes: [
        'title',
        'colorType',
        'latitude',
        'longitude',
        'phrase',
        'reason',
        'time',
        'author',
        'description',
        'publisher',
      ],
    });
    return successRes(req, res, { user, book });
  } catch (e) {
    logger.error(e);
    return errorRes(req, res);
  }
};
