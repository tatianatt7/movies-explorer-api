const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');
const { JWT_TOKEN_KEY, COOKIE_TOKEN_KEY } = require('../config');

module.exports = (req, _, next) => {
  const { authorization } = req.headers;
  let token;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    if (COOKIE_TOKEN_KEY in req.cookies) {
      token = req.cookies[COOKIE_TOKEN_KEY];
    } else {
      return next(new UnauthorizedError());
    }
  } else {
    token = authorization.replace('Bearer ', '');
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_TOKEN_KEY);
  } catch (err) {
    return next(new UnauthorizedError());
  }

  req.user = payload; // записываем пэйлоуд в объект запроса

  return next();
};
