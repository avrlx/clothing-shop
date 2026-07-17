/**
 * middleware/validateContact.js
 * Validates the request body for POST /api/contact before it reaches
 * the controller. Keeps the controller focused on the "happy path".
 */
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  const digits = String(value || '').replace(/[^0-9]/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

function validateContact(req, res, next) {
  const { name, phone, email, message } = req.body || {};
  const errors = {};

  if (!name || !String(name).trim()) errors.name = 'Name is required.';
  if (!phone || !isValidPhone(phone)) errors.phone = 'A valid phone number is required.';
  if (email && !isValidEmail(email)) errors.email = 'Please provide a valid email address.';
  if (!message || String(message).trim().length < 5) errors.message = 'Message must be at least 5 characters.';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  next();
}

module.exports = validateContact;
