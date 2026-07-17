/**
 * contact-form.js
 * Validates and submits any form with the `.js-contact-form` class.
 * Tries POST /api/contact (see backend/routes/contactRoutes.js). If the API
 * is unreachable (e.g. static hosting with no backend deployed), it falls
 * back to opening the visitor's email client via a mailto: link so the form
 * still "works" for a student/demo deployment.
 */
(function () {
  'use strict';

  var SHOP_EMAIL = 'ganuj4769@gmail.com';
  var API_ENDPOINT = '/api/contact';

  qsa('.js-contact-form').forEach(function (form) {
    var status = qs('.form__status', form);

    function setFieldError(field, message) {
      var wrap = field.closest('.field');
      var errorEl = qs('.field__error', wrap);
      wrap.classList.add('has-error');
      if (errorEl) errorEl.textContent = message;
    }

    function clearFieldError(field) {
      var wrap = field.closest('.field');
      wrap.classList.remove('has-error');
    }

    function validate() {
      var valid = true;
      var name = qs('[name="name"]', form);
      var phone = qs('[name="phone"]', form);
      var email = qs('[name="email"]', form);
      var message = qs('[name="message"]', form);

      [name, phone, email, message].forEach(function (f) { if (f) clearFieldError(f); });

      if (name && !name.value.trim()) { setFieldError(name, 'Please enter your name.'); valid = false; }
      if (phone && !isValidPhone(phone.value)) { setFieldError(phone, 'Please enter a valid phone number.'); valid = false; }
      if (email && email.value.trim() && !isValidEmail(email.value)) { setFieldError(email, 'Please enter a valid email address.'); valid = false; }
      if (message && message.value.trim().length < 5) { setFieldError(message, 'Tell us a little more (at least 5 characters).'); valid = false; }

      return valid;
    }

    function showStatus(type, text) {
      if (!status) return;
      status.textContent = text;
      status.className = 'form__status is-visible form__status--' + type;
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
    }

    function buildMailtoFallback(data) {
      var subject = encodeURIComponent('Website enquiry from ' + (data.name || 'a customer'));
      var body = encodeURIComponent(
        'Name: ' + (data.name || '') + '\n' +
        'Phone: ' + (data.phone || '') + '\n' +
        'Email: ' + (data.email || '') + '\n\n' +
        (data.message || '')
      );
      return 'mailto:' + SHOP_EMAIL + '?subject=' + subject + '&body=' + body;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        showStatus('error', 'Please fix the highlighted fields and try again.');
        return;
      }

      var formData = new FormData(form);
      var data = Object.fromEntries(formData.entries());
      var submitBtn = qs('button[type="submit"]', form);
      if (submitBtn) submitBtn.disabled = true;

      fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          return res.json();
        })
        .then(function () {
          form.reset();
          showStatus('success', "Thanks — we've got your message and will reply shortly.");
        })
        .catch(function () {
          // Backend not deployed / unreachable — fall back to mailto so the
          // form still gets the message to the shop.
          window.location.href = buildMailtoFallback(data);
          showStatus('success', 'Opening your email app to send this message…');
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });

    // Clear a field's error as soon as the visitor fixes it
    qsa('input, textarea', form).forEach(function (field) {
      field.addEventListener('input', function () { clearFieldError(field); });
    });
  });
})();
