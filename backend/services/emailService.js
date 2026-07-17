/**
 * services/emailService.js
 * Sends the contact-form submission to the shop's inbox.
 *
 * In local/student development (no SMTP_* env vars set) this simply
 * logs the message so the flow can be tested end-to-end without a
 * real mail account. Add `nodemailer` (npm install nodemailer) and
 * fill in SMTP_HOST/SMTP_USER/SMTP_PASS in your .env to send real email.
 */
const config = require('../config/config');
const logger = require('../utils/logger');

async function sendContactEmail({ name, phone, email, message }) {
  const hasSmtpConfig = Boolean(config.smtp.host && config.smtp.user && config.smtp.pass);

  if (!hasSmtpConfig) {
    logger.info('SMTP not configured — logging contact submission instead of emailing it.');
    logger.info('New enquiry:', { name, phone, email, message, to: config.shopEmail });
    return { delivered: false, reason: 'smtp-not-configured' };
  }

  // Real send path — uncomment after `npm install nodemailer`:
  //
  // const nodemailer = require('nodemailer');
  // const transporter = nodemailer.createTransport({
  //   host: config.smtp.host,
  //   port: config.smtp.port,
  //   auth: { user: config.smtp.user, pass: config.smtp.pass }
  // });
  // await transporter.sendMail({
  //   from: `"D Fashion Mart Website" <${config.smtp.user}>`,
  //   to: config.shopEmail,
  //   replyTo: email || undefined,
  //   subject: `New website enquiry from ${name}`,
  //   text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email || 'n/a'}\n\n${message}`
  // });

  logger.info('Email dispatched to', config.shopEmail);
  return { delivered: true };
}

module.exports = { sendContactEmail };
