// /middleware/error_handler.js
const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging

    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const message = err.isOperational ? err.message : 'Internal Server Error';

    res.status(statusCode).json({
        status,
        message,
    });
};

module.exports = errorHandler;
