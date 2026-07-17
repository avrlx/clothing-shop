/**
 * routes/contactRoutes.js
 */
const express = require('express');
const router = express.Router();
const validateContact = require('../middleware/validateContact');
const { submitContactForm } = require('../controllers/contactController');

// POST /api/contact — called by frontend/js/contact-form.js
router.post('/contact', validateContact, submitContactForm);

module.exports = router;
