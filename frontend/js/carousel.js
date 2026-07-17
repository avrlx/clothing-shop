/**
 * carousel.js
 * A small, manual (no autoplay — see docs/DESIGN_SYSTEM.md §12 on why)
 * carousel for the testimonials section. One card per view on mobile,
 * three per view on desktop (where the arrows/dots are hidden entirely
 * and the CSS grid just shows all three side by side — see style.css).
 * Supports arrow buttons, dot navigation, keyboard (Left/Right when the
 * carousel is focused), and touch swipe.
 */
(function () {
  'use strict';

  var root = qs('.carousel');
  if (!root) return;

  var track = qs('.carousel__track', root);
  var slides = qsa('.carousel__track > *', root);
  var prevBtn = qs('.carousel__arrow--prev', root);
  var nextBtn = qs('.carousel__arrow--next', root);
  var dotsWrap = qs('.carousel__dots', root);
  if (!track || !slides.length) return;

  var index = 0;

  // Build dots
  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'carousel__dot';
    dot.setAttribute('aria-label', 'Go to review ' + (i + 1));
    dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
  });
  var dots = qsa('.carousel__dot', dotsWrap);

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.forEach(function (d, di) { d.setAttribute('aria-current', String(di === index)); });
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1); });

  root.setAttribute('tabindex', '0');
  root.setAttribute('role', 'region');
  root.setAttribute('aria-label', 'Customer reviews carousel');
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') goTo(index + 1);
    if (e.key === 'ArrowLeft') goTo(index - 1);
  });

  // Touch swipe
  var touchStartX = null;
  track.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) goTo(delta < 0 ? index + 1 : index - 1);
    touchStartX = null;
  });

  window.addEventListener('resize', debounce(function () { goTo(index); }, 150));
})();
