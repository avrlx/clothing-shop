/**
 * gallery.js
 * Accessible lightbox for the Gallery page. Keyboard (Esc/Arrow keys) and
 * click support. Requires utils/dom-helpers.js.
 */
(function () {
  'use strict';

  var triggers = qsa('.gallery-card');
  var lightbox = qs('.lightbox');
  if (!triggers.length || !lightbox) return;

  var lightboxImg = qs('img', lightbox);
  var closeBtn = qs('.lightbox__close', lightbox);
  var currentIndex = 0;
  var releaseFocusTrap = null;
  var lastFocused = null;

  function openAt(index) {
    currentIndex = index;
    var trigger = triggers[index];
    var img = qs('img', trigger);
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lastFocused = document.activeElement;
    lightbox.classList.add('is-open');
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    releaseFocusTrap = trapFocus(lightbox);
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    if (releaseFocusTrap) releaseFocusTrap();
    if (lastFocused) lastFocused.focus();
  }

  triggers.forEach(function (trigger, index) {
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-label', 'Open image ' + (index + 1) + ' of ' + triggers.length);
    trigger.addEventListener('click', function () { openAt(index); });
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAt(index); }
    });
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') openAt((currentIndex + 1) % triggers.length);
    if (e.key === 'ArrowLeft') openAt((currentIndex - 1 + triggers.length) % triggers.length);
  });
})();
