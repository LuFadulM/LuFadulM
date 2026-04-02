/**
 * scroll-fx.js — Scroll-driven reveal animations for hyex-descubre
 *
 * Behaviors:
 *  1. Generic scroll reveals     — [data-reveal], with [data-stagger] children support
 *  2. Text draw reveals           — .text-draw inner <span> elements
 *  3. Image wipe                  — .img-wipe (CSS handles ::after scaleX via .revealed)
 *  4. Counter animation           — [data-counter] numeric count-up on enter
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // Utility: easeOutQuart
  // -------------------------------------------------------------------------

  /**
   * easeOutQuart easing function.
   * @param {number} t  Progress value 0–1
   * @returns {number}  Eased value 0–1
   */
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  // -------------------------------------------------------------------------
  // Shared IntersectionObserver options
  // -------------------------------------------------------------------------

  const OBSERVER_OPTIONS = {
    threshold: 0.12,
    rootMargin: '-60px',
  };

  // -------------------------------------------------------------------------
  // 1. SCROLL REVEALS — [data-reveal]
  //    Adding class 'revealed' triggers the CSS entrance animation.
  //    [data-stagger] containers apply a staggered transitionDelay to their
  //    direct children before the 'revealed' class is applied.
  // -------------------------------------------------------------------------

  function initScrollReveals() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        // Check if this element (or any ancestor) is a stagger container
        if (el.hasAttribute('data-stagger')) {
          // Apply staggered delays to direct children then reveal
          const children = Array.from(el.children);
          children.forEach(function (child, i) {
            child.style.transitionDelay = i * 0.07 + 's';
          });
        }

        el.classList.add('revealed');
        observer.unobserve(el);
      });
    }, OBSERVER_OPTIONS);

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // -------------------------------------------------------------------------
  // 2. TEXT DRAW REVEALS — .text-draw
  //    Inner <span> elements animate via CSS translateY when 'revealed' is set.
  //    Each span receives an increasing transitionDelay (i * 0.08s).
  // -------------------------------------------------------------------------

  function initTextDrawReveals() {
    const textDrawEls = document.querySelectorAll('.text-draw');
    if (textDrawEls.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const spans = Array.from(el.querySelectorAll('span'));

        spans.forEach(function (span, i) {
          span.style.transitionDelay = i * 0.08 + 's';
        });

        el.classList.add('revealed');
        observer.unobserve(el);
      });
    }, OBSERVER_OPTIONS);

    textDrawEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // -------------------------------------------------------------------------
  // 3. IMAGE WIPE — .img-wipe
  //    Adding 'revealed' class triggers the CSS ::after pseudo-element's
  //    scaleX transition, producing a wipe-reveal effect.
  // -------------------------------------------------------------------------

  function initImageWipes() {
    const wipeEls = document.querySelectorAll('.img-wipe');
    if (wipeEls.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      });
    }, OBSERVER_OPTIONS);

    wipeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // -------------------------------------------------------------------------
  // 4. COUNTER ANIMATION — [data-counter]
  //    Counts from 0 to the value in data-counter over 1500ms with
  //    easeOutQuart easing.
  // -------------------------------------------------------------------------

  function animateCounter(el, target, duration) {
    const startTime = performance.now();

    // Detect whether the original value contains a decimal point
    const isFloat = String(target).includes('.');
    const decimals = isFloat ? (String(target).split('.')[1] || '').length : 0;

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = eased * target;

      el.textContent = isFloat
        ? current.toFixed(decimals)
        : Math.round(current).toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure the final value is exact
        el.textContent = isFloat ? target.toFixed(decimals) : String(target);
      }
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    const counterEls = document.querySelectorAll('[data-counter]');
    if (counterEls.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const targetValue = parseFloat(el.dataset.counter);

        if (isNaN(targetValue)) {
          // Guard against malformed attribute values
          observer.unobserve(el);
          return;
        }

        animateCounter(el, targetValue, 1500);
        observer.unobserve(el);
      });
    }, OBSERVER_OPTIONS);

    counterEls.forEach(function (el) {
      // Start display at 0 so the count-up is visible from the beginning
      el.textContent = '0';
      observer.observe(el);
    });
  }

  // -------------------------------------------------------------------------
  // Bootstrap
  // -------------------------------------------------------------------------

  function init() {
    // Bail out early if IntersectionObserver is not supported
    if (typeof IntersectionObserver === 'undefined') return;

    initScrollReveals();
    initTextDrawReveals();
    initImageWipes();
    initCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
