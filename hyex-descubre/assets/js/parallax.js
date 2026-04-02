/**
 * parallax.js — Three visual motion effects for hyex-descubre
 *
 * Effects (all skipped when prefers-reduced-motion is set):
 *  1. Scroll parallax   — [data-parallax] elements shift on scroll
 *  2. Mouse parallax    — [data-mouse-parallax] elements follow the cursor (hero)
 *  3. Magnetic buttons  — .magnetic buttons repel toward the cursor
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // Utility helpers
  // -------------------------------------------------------------------------

  /**
   * Linear interpolation between two values.
   * @param {number} a  Start value
   * @param {number} b  Target value
   * @param {number} t  Factor (0–1)
   * @returns {number}
   */
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /**
   * Returns true when the user has requested reduced motion.
   * @returns {boolean}
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // -------------------------------------------------------------------------
  // 1. SCROLL PARALLAX
  //    Elements carry a `data-parallax` attribute whose float value sets speed.
  //    Positive speed → element moves up as you scroll down.
  // -------------------------------------------------------------------------

  function initScrollParallax() {
    const elements = Array.from(document.querySelectorAll('[data-parallax]'));
    if (elements.length === 0) return;

    let rafPending = false;

    function update() {
      elements.forEach(function (el) {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        const rect = el.getBoundingClientRect();
        // Offset relative to the viewport centre so the effect is symmetric
        const offset = rect.top * speed * -1;
        el.style.transform = 'translateY(' + offset + 'px)';
      });
      rafPending = false;
    }

    function onScroll() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Run once immediately so elements start in the correct position
    update();
  }

  // -------------------------------------------------------------------------
  // 2. MOUSE PARALLAX (hero section)
  //    Elements carry a `data-mouse-parallax` attribute whose float value sets
  //    the depth/multiplier of the shift.
  //    Mouse position is lerped at factor 0.08 toward the current cursor so
  //    the motion feels fluid rather than instant.
  // -------------------------------------------------------------------------

  function initMouseParallax() {
    const elements = Array.from(document.querySelectorAll('[data-mouse-parallax]'));
    if (elements.length === 0) return;

    // Normalised cursor position (–0.5 … +0.5), lerped
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;
    const LERP_FACTOR = 0.08;

    function loop() {
      currentX = lerp(currentX, targetX, LERP_FACTOR);
      currentY = lerp(currentY, targetY, LERP_FACTOR);

      elements.forEach(function (el) {
        const depth = parseFloat(el.dataset.mouseParallax) || 30;
        const dx = currentX * depth;
        const dy = currentY * depth;
        el.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
      });

      rafId = requestAnimationFrame(loop);
    }

    function onMouseMove(e) {
      // Normalise to –0.5 … +0.5
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true });

    // Start the animation loop
    rafId = requestAnimationFrame(loop);

    // Clean up when the page is hidden to save CPU
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else {
        if (!rafId) rafId = requestAnimationFrame(loop);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. MAGNETIC BUTTONS
  //    .magnetic elements shift toward the cursor while it hovers over them.
  //    On leave they snap back to (0, 0) via the same lerp loop.
  // -------------------------------------------------------------------------

  function initMagneticButtons() {
    const buttons = Array.from(document.querySelectorAll('.magnetic'));
    if (buttons.length === 0) return;

    const LERP_FACTOR = 0.15;
    // Max shift as a fraction of the button's half-dimensions (35 %)
    const MAX_SHIFT = 0.35;

    buttons.forEach(function (btn) {
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let rafId = null;
      let isHovered = false;

      function loop() {
        currentX = lerp(currentX, targetX, LERP_FACTOR);
        currentY = lerp(currentY, targetY, LERP_FACTOR);

        btn.style.transform = 'translate(' + currentX + 'px, ' + currentY + 'px)';

        // Keep running until the button is visually back at rest
        const stillMoving =
          Math.abs(currentX - targetX) > 0.01 ||
          Math.abs(currentY - targetY) > 0.01;

        if (isHovered || stillMoving) {
          rafId = requestAnimationFrame(loop);
        } else {
          // Snap exactly to zero and stop the loop
          currentX = 0;
          currentY = 0;
          btn.style.transform = 'translate(0px, 0px)';
          rafId = null;
        }
      }

      function startLoop() {
        if (!rafId) rafId = requestAnimationFrame(loop);
      }

      btn.addEventListener('mouseenter', function () {
        isHovered = true;
        startLoop();
      });

      btn.addEventListener('mousemove', function (e) {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        // Clamp to MAX_SHIFT of the half-dimension so motion is bounded
        targetX = offsetX * MAX_SHIFT;
        targetY = offsetY * MAX_SHIFT;
      });

      btn.addEventListener('mouseleave', function () {
        isHovered = false;
        targetX = 0;
        targetY = 0;
        // Loop continues until currentX/Y settle back to ~0
        startLoop();
      });
    });
  }

  // -------------------------------------------------------------------------
  // Bootstrap — only run if the user hasn't requested reduced motion
  // -------------------------------------------------------------------------

  function init() {
    if (prefersReducedMotion()) return;

    initScrollParallax();
    initMouseParallax();
    initMagneticButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
