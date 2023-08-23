const jwt = require('jsonwebtoken');
const AuthError = require('../errorClasses/AuthError');

const { UNAUTHORIZED_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(UNAUTHORIZED_MESSAGE));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  const { NODE_ENV, JWT_SECRET } = process.env;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'kilimanjaro',
    );
  } catch (err) {
    return next(new AuthError(UNAUTHORIZED_MESSAGE));
  }

  req.user = payload;

  return next();
};
