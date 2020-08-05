import { validationResult } from 'express-validator';

import models from '../../../models';
import { logger } from '../../../config/winston';
import getKakaoTokenInfo from '../../../helpers/kakao';
import getAppleTokenInfo from '../../../helpers/apple';
import { generateAccessToken } from '../../../helpers/jwt';
import { successRes, errorRes } from '../../../helpers/response';

export default async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorRes(req, res, '40000');
    }
    const { socialLoginType, socialLoginId, socialLoginToken } = req.body;
    const user = models.User.findOne({
      where: {
        socialLoginType,
        socialLoginId,
      },
    });
    if (!user) {
      return errorRes(req, res, '40002');
    }
    if (socialLoginType === 'kakao') {
      const tokenInfo = getKakaoTokenInfo(socialLoginToken);
      if (tokenInfo) {
        const accessToken = generateAccessToken({});
        successRes(req, res, { accessToken });
      }
      return errorRes(req, res, '40103');
    }
    if (socialLoginType === 'apple') {
      // todo 구현 예정
      const tokenInfo = getAppleTokenInfo(socialLoginToken);
      if (tokenInfo) {
        const accessToken = generateAccessToken({});
        successRes(req, res, { accessToken });
      }
      return errorRes(req, res, '40103');
    }
  } catch (e) {
    logger.error(e);
    return errorRes(req, res);
  }
};
