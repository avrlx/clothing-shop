/**
 * main.js
 * Shared behaviour for every page: sticky nav, mobile menu, scroll-reveal,
 * back-to-top button, accordion (FAQ), and the loading screen.
 * Requires utils/dom-helpers.js to be loaded first.
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Loading screen ---------- */
  var loadingScreen = qs('.loading-screen');
  if (loadingScreen) {
    var removeLoader = function () {
      loadingScreen.classList.add('is-hidden');
      setTimeout(function () { loadingScreen.remove(); }, prefersReducedMotion ? 0 : 500);
    };
    if (document.readyState === 'complete') {
      removeLoader();
    } else {
      window.addEventListener('load', removeLoader);
      // Safety net: never block the page for more than 900ms
      setTimeout(removeLoader, 900);
    }
  }

  /* ---------- Sticky navbar background on scroll ---------- */
  var navbar = qs('.navbar');
  if (navbar) {
    var onScrollNav = debounce(function () {
      navbar.classList.toggle('is-scrolled', window.scrollY > 40);
    }, 10);
    document.addEventListener('scroll', onScrollNav, { passive: true });
    onScrollNav();
  }

  /* ---------- Mobile nav panel ---------- */
  var toggle = qs('.navbar__toggle');
  var panel = qs('.navbar__panel');
  if (toggle && panel) {
    var releaseFocusTrap = null;
    var closePanel = function () {
      toggle.setAttribute('aria-expanded', 'false');
      panel.classList.remove('is-open');
      panel.setAttribute('hidden', '');
      document.body.style.overflow = '';
      if (releaseFocusTrap) releaseFocusTrap();
      toggle.focus();
    };
    var openPanel = function () {
      toggle.setAttribute('aria-expanded', 'true');
      panel.removeAttribute('hidden');
      requestAnimationFrame(function () { panel.classList.add('is-open'); });
      document.body.style.overflow = 'hidden';
      releaseFocusTrap = trapFocus(panel);
      var firstLink = qs('a', panel);
      if (firstLink) firstLink.focus();
    };
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closePanel() : openPanel();
    });
    panel.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closePanel();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closePanel();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = qsa('[data-reveal]');
  if (revealEls.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
          setTimeout(function () { el.classList.add('is-visible'); }, delay);
          io.unobserve(el);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Back to top ---------- */
  var backToTop = qs('.fab-top');
  if (backToTop) {
    var onScrollTop = debounce(function () {
      backToTop.classList.toggle('is-visible', window.scrollY > 600);
    }, 10);
    document.addEventListener('scroll', onScrollTop, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Accordion (FAQ) ---------- */
  qsa('.accordion__item').forEach(function (item) {
    var trigger = qs('.accordion__trigger', item);
    var panelEl = qs('.accordion__panel', item);
    if (!trigger || !panelEl) return;
    trigger.addEventListener('click', function () {
      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      panelEl.style.maxHeight = expanded ? '0px' : panelEl.scrollHeight + 'px';
    });
  });

  /* ---------- Image fade-in on load (perceived performance) ---------- */
  qsa('img[data-fade]').forEach(function (img) {
    if (img.complete && img.naturalWidth) {
      img.classList.add('is-loaded');
    } else {
      img.addEventListener('load', function () { img.classList.add('is-loaded'); }, { once: true });
    }
  });

  /* ---------- Generic modal (Size Guide, etc.) ---------- */
  qsa('[data-modal-open]').forEach(function (trigger) {
    var overlay = qs('#' + trigger.getAttribute('data-modal-open'));
    if (!overlay) return;
    var releaseFocusTrap = null;
    var lastFocused = null;

    var open = function () {
      lastFocused = document.activeElement;
      overlay.removeAttribute('hidden');
      requestAnimationFrame(function () { overlay.classList.add('is-open'); });
      document.body.style.overflow = 'hidden';
      releaseFocusTrap = trapFocus(overlay);
      var closeBtn = qs('.modal__close', overlay);
      if (closeBtn) closeBtn.focus();
    };
    var close = function () {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      if (releaseFocusTrap) releaseFocusTrap();
      setTimeout(function () { overlay.setAttribute('hidden', ''); }, 250);
      if (lastFocused) lastFocused.focus();
    };

    trigger.addEventListener('click', open);
    qsa('.modal__close, [data-modal-close]', overlay).forEach(function (btn) {
      btn.addEventListener('click', close);
    });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });
  });

  /* ---------- Size guide tabs (inside the modal) ---------- */
  qsa('.size-tabs').forEach(function (tabs) {
    var buttons = qsa('.chip', tabs);
    var panels = qsa('[data-size-panel]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        var target = btn.getAttribute('data-size-tab');
        panels.forEach(function (p) { p.hidden = p.getAttribute('data-size-panel') !== target; });
      });
    });
  });

  /* ---------- Filter chips (Collections page) ---------- */
  var filterBar = qs('.filter-bar');
  if (filterBar) {
    var chips = qsa('.chip', filterBar);
    var cards = qsa('[data-category]');
    var emptyState = qs('.empty-state');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        chip.setAttribute('aria-pressed', 'true');
        var filter = chip.getAttribute('data-filter');
        var visibleCount = 0;
        cards.forEach(function (card) {
          var match = filter === 'all' || card.getAttribute('data-category') === filter;
          card.style.display = match ? '' : 'none';
          if (match) visibleCount++;
        });
        if (emptyState) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      });
    });
  }
})();
