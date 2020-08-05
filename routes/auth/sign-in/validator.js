import enums from '../../../config/enums';

export default {
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
  socialLoginToken: {
    in: ['body'],
    notEmpty: true,
    isString: true,
  },
};
