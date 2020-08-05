import { errorRes } from '../helpers/response';

const onlyIntRegExp = new RegExp('^[0-9]+$');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err && onlyIntRegExp.test(err.message)) {
    return errorRes(req, res, err.message);
  }
  return errorRes(req, res);
};

export default errorHandler;
