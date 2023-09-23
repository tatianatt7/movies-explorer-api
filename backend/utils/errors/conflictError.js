const {
  HTTP_STATUS_CONFLICT,
} = require('../constants');

class ConflictError extends Error {
  constructor(message = 'Document already exists') {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

module.exports = {
  ConflictError,
};
