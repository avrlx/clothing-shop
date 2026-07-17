/**
 * dom-helpers.js
 * Tiny, dependency-free helpers shared by main.js, gallery.js and contact-form.js.
 * Loaded first (plain script, no modules) so its functions are globally available.
 */

/** querySelector shorthand */
function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

/** querySelectorAll shorthand, returns a real array */
function qsa(selector, scope) {
  return Array.from((scope || document).querySelectorAll(selector));
}

/** Debounce a function by `wait` ms */
function debounce(fn, wait) {
  var t;
  return function () {
    var args = arguments;
    clearTimeout(t);
    t = setTimeout(function () { fn.apply(null, args); }, wait);
  };
}

/** Basic, dependency-free email format check */
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Basic phone check: at least 7 digits, allows spaces/+/-/() */
function isValidPhone(value) {
  var digits = value.replace(/[^0-9]/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

/** Trap focus within a container while `active` is true (used by mobile nav + lightbox) */
function trapFocus(container) {
  var focusable = qsa('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])', container);
  if (!focusable.length) return function () {};
  var first = focusable[0];
  var last = focusable[focusable.length - 1];

  function handleKeydown(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  container.addEventListener('keydown', handleKeydown);
  return function () { container.removeEventListener('keydown', handleKeydown); };
}
