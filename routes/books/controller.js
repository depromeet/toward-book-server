import { validationResult } from 'express-validator';

import getBookInfo from '../../helpers/naver';
import getFilteredBook from '../../helpers/replace';
import enums from '../../config/enums';
import models from '../../models';
import { logger } from '../../config/winston';
import { successRes, errorRes } from '../../helpers/response';

exports.searchBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorRes(req, res, '40000');
    }
    const { title } = req.params;
    const bookItems = await getBookInfo(title);
    if (bookItems) {
      const filtered = getFilteredBook(bookItems);
      return successRes(req, res, filtered);
    }
    return errorRes(req, res, '40400');
  } catch (e) {
    logger.error(e);
    return errorRes(req, res);
  }
};

exports.postBook = async (req, res) => {
  // const userId = req.user.id;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorRes(req, res, '40000');
    }
    const { id } = await models.Book.create(req.body);
    const { tags } = req.body;
    const tagIds = [];
    tags.forEach((tag) => {
      tagIds.push(enums.tag.indexOf(tag));
    });
    tagIds.forEach(async (tagId) => {
      await models.BookTagBridge.create({
        bookId: id,
        tagId,
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorRes(req, res, '40000');
    }
    const bookId = req.params.id;
    const book = await models.Book.findOne({
      where: {
        id: bookId,
      },
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['nickname', 'profileImageType'],
        },
      ],
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
        'thumbnail',
        'publisher',
      ],
    });
    if (book) {
      const tagsNotFiltered = await models.Tag.findAll({
        include: [
          {
            model: models.BookTagBridge,
            as: 'books',
            where: { bookId },
            attributes: [],
            order: [['tagId', 'DESC']],
          },
        ],
        attributes: ['name'],
      });
      const tags = tagsNotFiltered.map(({ name }) => name);
      return successRes(req, res, { book, tags });
    }
    return errorRes(req, res, '40400');
  } catch (e) {
    logger.error(e);
    return errorRes(req, res);
  }
};

exports.deleteBook = async (req, res) => {
  // const userId = req.user.id;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorRes(req, res, '40000');
    }
    const bookId = req.params.id;
    await models.Book.destroy({ where: { id: bookId } });
    return successRes(req, res);
  } catch (e) {
    logger.error(e);
    return errorRes(req, res);
  }
};
