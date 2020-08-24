import enums from '../../config/enums';

exports.postValidator = {
  title: {
    in: ['body'],
    notEmpty: true,
    isString: true,
    isLength: {
      options: { min: 1, max: 30 },
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
  tags: {
    in: ['body'],
    isArray: {
      options: { min: 0, max: 3 },
    },
    isIn: {
      options: [enums.tag],
    },
  },
};

exports.searchValidator = {
  title: {
    in: ['params'],
    isEmpty: false,
    isString: true,
    isLength: {
      options: { min: 1, max: 20 },
    },
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
