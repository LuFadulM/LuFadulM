/**
 * nav.js — Navigation behavior for hyex-descubre
 *
 * Handles:
 *  - Scroll-based nav styling
 *  - Mobile hamburger menu toggle
 *  - Close on link click / Escape key
 *  - Focus trapping inside open mobile menu
 *  - aria-expanded state on hamburger button
 */

(function () {
  'use strict';

  // Focusable element selector used for focus trapping
  const FOCUSABLE_SELECTORS = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  /**
   * Returns all focusable elements inside a given container.
   * @param {Element} container
   * @returns {Element[]}
   */
  function getFocusableElements(container) {
    return Array.from(container.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
      (el) => !el.closest('[hidden]') && !el.closest('[aria-hidden="true"]')
    );
  }

  /**
   * Traps keyboard focus within `container`.
   * Cycles from last focusable element back to first and vice-versa.
   * @param {KeyboardEvent} e
   * @param {Element} container
   */
  function trapFocus(e, container) {
    const focusable = getFocusableElements(container);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      // Shift+Tab: if focus is on first element, wrap to last
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab: if focus is on last element, wrap to first
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  /**
   * Main initialisation — runs on DOMContentLoaded.
   */
  function init() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const hamburger = nav.querySelector('.nav__hamburger');
    const mobileMenu = nav.querySelector('.nav__mobile');

    // -----------------------------------------------------------------------
    // 1. Scroll behaviour — add/remove .nav--scrolled
    // -----------------------------------------------------------------------
    let scrollTicking = false;

    function onScroll() {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        if (window.scrollY > 80) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }
        scrollTicking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Run once on load in case the page is already scrolled
    onScroll();

    // -----------------------------------------------------------------------
    // 2. Mobile menu helpers
    // -----------------------------------------------------------------------
    if (!hamburger || !mobileMenu) return;

    function openMenu() {
      hamburger.classList.add('nav__hamburger--open');
      mobileMenu.classList.add('nav__mobile--open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.removeAttribute('hidden');

      // Move focus into the menu so screen readers announce it
      const firstFocusable = getFocusableElements(mobileMenu)[0];
      if (firstFocusable) firstFocusable.focus();

      document.addEventListener('keydown', handleKeydown);
    }

    function closeMenu() {
      hamburger.classList.remove('nav__hamburger--open');
      mobileMenu.classList.remove('nav__mobile--open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('hidden', '');

      // Return focus to the button that opened the menu
      hamburger.focus();

      document.removeEventListener('keydown', handleKeydown);
    }

    function toggleMenu() {
      const isOpen = hamburger.classList.contains('nav__hamburger--open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // -----------------------------------------------------------------------
    // 3. Keyboard handling (Escape + Tab trap)
    // -----------------------------------------------------------------------
    function handleKeydown(e) {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (e.key === 'Tab') {
        trapFocus(e, mobileMenu);
      }
    }

    // -----------------------------------------------------------------------
    // 4. Event listeners
    // -----------------------------------------------------------------------

    // Hamburger button click
    hamburger.addEventListener('click', toggleMenu);

    // Ensure initial aria state is correct
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', mobileMenu.id || 'nav-mobile');

    // Give the mobile menu an id if it lacks one (needed for aria-controls)
    if (!mobileMenu.id) {
      mobileMenu.id = 'nav-mobile';
    }

    // Close when any link inside the mobile menu is clicked
    mobileMenu.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (link) {
        closeMenu();
      }
    });
  }

  // -------------------------------------------------------------------------
  // Bootstrap
  // -------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
