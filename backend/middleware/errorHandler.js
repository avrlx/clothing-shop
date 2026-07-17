/**
 * middleware/errorHandler.js
 * Centralised error handler — mount last, after all routes.
 */
const logger = require('../utils/logger');

function notFoundHandler(req, res) {
  res.status(404).json({ ok: false, error: 'Not found' });
}

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  logger.error(err.stack || err.message || err);
  const status = err.status || 500;
  res.status(status).json({
    ok: false,
    error: status === 500 ? 'Something went wrong. Please try again.' : err.message
  });
}

module.exports = { notFoundHandler, errorHandler };
