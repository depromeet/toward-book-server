import enums from '../../../config/enums';

export default {
  nickname: {
    in: ['body'],
    notEmpty: true,
    isString: true,
    isLength: {
      options: { min: 1, max: 8 },
    },
  },
  profileImageType: {
    in: ['body'],
    isInt: {
      options: { min: 1, max: 6 },
    },
    toInt: true,
  },
  socialLoginType: {
    in: ['body'],
    notEmpty: true,
    isString: true,
    isIn: {
      options: [enums.socialLoginType],
    },
  },
  socialLoginId: {
    in: ['body'],
    notEmpty: true,
    isString: true,
    isLength: {
      options: { min: 1, max: 30 },
    },
  },
};
