// middleware/validate.js
const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

exports.validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
    return next(new AppError(JSON.stringify(extractedErrors), 422));
  };
};