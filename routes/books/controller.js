import { validationResult } from 'express-validator';
import xml2js from 'xml2js';

import getBookInfo from '../../helpers/naver';
import enums from '../../config/enums';
import models from '../../models';
import { logger } from '../../config/winston';
import { successRes, errorRes } from '../../helpers/response';

exports.searchBook = async (req, res) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return errorRes(req, res, '40000');
    // }
    const { title } = req.params;
    const bookItems = await getBookInfo(title);

    let items;
    xml2js.parseString(bookItems, { explicitArray: false }, (err, jsonResult) => {
      if (!err) {
        items = jsonResult.rss.channel.item;
      } else {
        logger.error(err);
      }
    });

    return successRes(req, res, items);
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
      tagIds.push(enums.tag.indexOf(tag) + 1);
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
      // include: [
      //   {
      //     model: models.BookTagBridge,
      //     as: 'tags',
      //     include: [
      //       {
      //         model: models.Tag,
      //         as: 'tag',
      //         attributes: ['name'],
      //       },
      //     ],
      //   },
      // ],
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
    return successRes(req, res, { user, book, tags });
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
