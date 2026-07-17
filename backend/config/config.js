/**
 * config/config.js
 * Centralised environment configuration. Reads from process.env with
 * sensible local-dev defaults so the server runs out of the box.
 */
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Where contact-form submissions should be sent.
  shopEmail: process.env.SHOP_EMAIL || 'ganuj4769@gmail.com',

  // SMTP settings for services/emailService.js — leave unset in dev;
  // emailService logs to the console instead of sending when these are empty.
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  },

  // Comma-separated list of allowed origins for CORS in production.
  corsOrigins: (process.env.CORS_ORIGINS || '*').split(',').map(s => s.trim())
};
