import enums from '../../config/enums';

exports.postValidator = {
  title: {
    in: ['body'],
    notEmpty: true,
    isString: true,
    isLength: {
      options: { min: 1, max: 60 },
    },
  },
  colorType: {
    in: ['body'],
    notEmpty: true,
    isString: true,
    isLength: {
      options: { min: 1, max: 6 },
    },
  },
  latitude: {
    in: ['body'],
    notEmpty: true,
    isFloat: true,
  },
  longitude: {
    in: ['body'],
    notEmpty: true,
    isFloat: true,
  },
  phrase: {
    in: ['body'],
    notEmpty: true,
    isString: true,
    isLength: {
      options: { min: 1, max: 32 },
    },
  },
  reason: {
    in: ['body'],
    notEmpty: true,
    isString: true,
    isLength: {
      options: { min: 1, max: 500 },
    },
  },
  time: {
    in: ['body'],
    notEmpty: true,
    isString: true,
    isLength: {
      options: { min: 1, max: 8 },
    },
    isIn: {
      options: [enums.time],
    },
  },
  author: {
    in: ['body'],
    isString: true,
    isLength: {
      options: { min: 1, max: 20 },
    },
  },
  description: {
    in: ['body'],
    isString: true,
    isLength: {
      options: { min: 1, max: 300 },
    },
  },
  thumbnail: {
    in: ['body'],
    isString: true,
    isLength: {
      options: { min: 1, max: 300 },
    },
  },
  pubDate: {
    in: ['body'],
    isDate: true,
  },
  publisher: {
    in: ['body'],
    isString: true,
    isLength: {
      options: { min: 1, max: 20 },
    },
  },
  tags: {
    in: ['body'],
    isArray: {
      options: { min: 0, max: 15 },
    },
    isIn: {
      options: [enums.tag],
    },
  },
  userId: {
    in: ['body'],
    isEmpty: false,
    isInt: true,
  },
};

exports.searchValidator = {
  title: {
    in: ['params'],
    isEmpty: false,
    isString: true,
  },
};

exports.getValidator = {
  id: {
    in: ['params'],
    isEmpty: false,
    isInt: true,
  },
};

exports.getsValidator = {
  latitude: {
    in: ['query'],
    isFloat: true,
    toFloat: true,
    isEmpty: false,
  },
  longitude: {
    in: ['query'],
    isFloat: true,
    toFloat: true,
    isEmpty: false,
  },
};

exports.deleteValidator = {
  id: {
    in: ['params'],
    isEmpty: false,
    isInt: true,
  },
};
