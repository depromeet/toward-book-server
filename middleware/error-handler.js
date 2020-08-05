import { errorRes } from '../helpers/response';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  return errorRes(req, res);
};

export default errorHandler;
