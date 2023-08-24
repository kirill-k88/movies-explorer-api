const NotFoundError = require('../errorClasses/NotFoundError');
const ForbiddenError = require('../errorClasses/ForbiddenError');
const BadRequest = require('../errorClasses/BadRequest');
const ConflictError = require('../errorClasses/ConflictError');

const {
  FIND_NODATA_MESSAGE,
  WRONG_OWNER_MESSAGE,
  DUPLICATE_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} = require('./constants');

module.exports.checkResult = (data) => {
  if (!data) {
    return Promise.reject(new NotFoundError(FIND_NODATA_MESSAGE));
  }
  return data;
};

module.exports.checkResultFindMovie = (data, id) => {
  if (!data) {
    return Promise.reject(new NotFoundError(FIND_NODATA_MESSAGE));
  }
  if (data.owner._id.toString() !== id) {
    return Promise.reject(new ForbiddenError(WRONG_OWNER_MESSAGE));
  }
  return data;
};

module.exports.checkDBValidationError = (err) => {
  if (err.code === 11000) {
    return new ConflictError(DUPLICATE_ERROR_MESSAGE);
  }

  if (err.name === 'ValidationError') {
    return new BadRequest(VALIDATION_ERROR_MESSAGE);
  }

  return err;
};
