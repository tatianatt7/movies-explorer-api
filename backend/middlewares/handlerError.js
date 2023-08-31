const { ValidationError, CastError } = require('mongoose').Error;
const {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_CONFLICT,
  MESSAGE_ERROR_SERVER,
  HTTP_STATUS_BAD_REQUEST,
  MESSAGE_ERROR_CONFLICT,
  MESSAGE_ERROR_CAST,
} = require('../utils/constants');

module.exports = (err, _, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;

  if (err instanceof ValidationError) {
    return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
  }

  if (err instanceof CastError) {
    return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: MESSAGE_ERROR_CAST });
  }

  if (err.code === 11000) {
    return res.status(HTTP_STATUS_CONFLICT).send({ message: MESSAGE_ERROR_CONFLICT });
  }

  res.status(statusCode).send({
    message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
      ? MESSAGE_ERROR_SERVER
      : message,
    statusCode,
  });

  return next();
};
