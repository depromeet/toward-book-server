import { errorRes } from '../helpers/response';
import { parseAccessToken, verifyAccessToken } from '../helpers/jwt';

const authenticate = (req, res, next) => {
  const accessToken = parseAccessToken(req);
  if (accessToken) {
    try {
      req.user = verifyAccessToken(accessToken);
      return next();
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        return errorRes(req, res, '40102');
      }
      return errorRes(req, res, '40101');
    }
  }
  return errorRes(req, res, '40100');
};

export default authenticate;
