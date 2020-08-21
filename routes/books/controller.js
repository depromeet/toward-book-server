import { validationResult } from 'express-validator';

import getBookInfo from '../../helpers/naver';
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
      let filtered;
      if (bookItems.length > 1) {
        filtered = bookItems.map((item) => {
          const rObj = {
            title: item.title.replace(/(<([^>]+)>)/gi, ''),
            image: item.image,
            author: item.author.replace(/(<([^>]+)>)/gi, ''),
            publisher: item.publisher,
            pubDate: item.pubdate,
            description: item.description.replace(/(<([^>]+)>)/gi, '').replace(/\n/gi, ''),
          };
          return rObj;
        });
      } else {
        filtered = {
          title: bookItems.title.replace(/(<([^>]+)>)/gi, ''),
          image: bookItems.image,
          author: bookItems.author.replace(/(<([^>]+)>)/gi, ''),
          publisher: bookItems.publisher,
          pubDate: bookItems.pubdate,
          description: bookItems.description.replace(/(<([^>]+)>)/gi, '').replace(/\n/gi, ''),
        };
      }
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
    // API 사용 제목으로 search 후 저자, 출판사, 출판일, 설명과 같이 저장!
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
    if (tags.length) {
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
