import jwt from 'jsonwebtoken';

import CONFIG from '../config';

const JWT = CONFIG.auth.jwt;

export const parseAccessToken = (req) => {
  if (req.headers && 'authorization' in req.headers) {
    return req.headers.authorization.replace('Bearer ', '');
  }
  return null;
};

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT.accessToken.secret, {
    algorithm: JWT.accessToken.algorithm,
    expiresIn: JWT.accessToken.ttl,
  });
};

export const verifyAccessToken = (accessToken) => {
  return jwt.verify(accessToken, JWT.accessToken.secret, {
    algorithm: JWT.accessToken.algorithm,
  });
};
