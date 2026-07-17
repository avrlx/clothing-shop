/**
 * controllers/contactController.js
 */
const emailService = require('../services/emailService');
const logger = require('../utils/logger');

async function submitContactForm(req, res, next) {
  try {
    const { name, phone, email, message } = req.body;
    await emailService.sendContactEmail({ name, phone, email, message });
    res.status(200).json({ ok: true, message: "Thanks — we've received your message." });
  } catch (err) {
    logger.error('Failed to process contact submission:', err);
    next(err);
  }
}

module.exports = { submitContactForm };
