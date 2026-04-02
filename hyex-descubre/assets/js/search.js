/**
 * search.js — Live search and category filtering for explorar.html
 *
 * Behavior:
 *  - #search-input 'input' event → filter cards (debounced 200ms)
 *  - .filter-pill 'click' → toggle active pill (only one at a time;
 *    "Todos" pill clears the rest) → re-filter
 *  - Filters on .place-card[data-name][data-city][data-category][data-tags]
 *  - Shows .empty-state when no cards match
 *
 * Required data attributes on .place-card elements:
 *   data-name       — place name (e.g. "El Cielo")
 *   data-city       — city slug  (e.g. "medellin")
 *   data-category   — category   (e.g. "restaurante")
 *   data-tags       — space- or comma-separated tags (e.g. "cocina local, vista")
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // Utility: simple debounce
  // -------------------------------------------------------------------------

  /**
   * Returns a debounced version of `fn` that waits `delay` ms after the last
   * invocation before firing.
   * @param {Function} fn
   * @param {number} delay
   * @returns {Function}
   */
  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var ctx = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(ctx, args);
      }, delay);
    };
  }

  // -------------------------------------------------------------------------
  // Normalise a string: lowercase + strip accents for accent-insensitive search
  // -------------------------------------------------------------------------

  /**
   * Normalises a string for comparison: lowercase and removes diacritic marks.
   * @param {string} str
   * @returns {string}
   */
  function normalise(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // -------------------------------------------------------------------------
  // Core filter function
  // -------------------------------------------------------------------------

  /**
   * Reads the current search query and active category pill, then shows or
   * hides each .place-card accordingly. Toggles .empty-state visibility.
   */
  function filterCards() {
    var searchInput = document.getElementById('search-input');
    var cards = Array.from(document.querySelectorAll('.place-card'));
    var emptyState = document.querySelector('.empty-state');
    var activePill = document.querySelector('.filter-pill.active');

    var query = searchInput ? normalise(searchInput.value.trim()) : '';
    var category = activePill ? (activePill.dataset.category || 'todos') : 'todos';
    var isTodos = category === 'todos';

    var visibleCount = 0;

    cards.forEach(function (card) {
      var name     = normalise(card.dataset.name     || '');
      var city     = normalise(card.dataset.city     || '');
      var cardCat  = normalise(card.dataset.category || '');
      var tags     = normalise(card.dataset.tags     || '');

      // Text match: query must appear in at least one searchable field
      var matchesQuery =
        query === '' ||
        name.indexOf(query) !== -1 ||
        city.indexOf(query) !== -1 ||
        cardCat.indexOf(query) !== -1 ||
        tags.indexOf(query) !== -1;

      // Category match: passes when "todos" is active or the card's category
      // equals the active filter
      var matchesCategory = isTodos || normalise(category) === cardCat;

      if (matchesQuery && matchesCategory) {
        showCard(card);
        visibleCount++;
      } else {
        hideCard(card);
      }
    });

    // Toggle empty state
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.removeAttribute('hidden');
        emptyState.classList.add('visible');
      } else {
        emptyState.setAttribute('hidden', '');
        emptyState.classList.remove('visible');
      }
    }
  }

  /**
   * Reveals a card with an entrance animation class.
   * @param {Element} card
   */
  function showCard(card) {
    card.classList.remove('hidden');
    // Small rAF so the browser can register the class removal before the
    // animation class is applied (avoids collapsed animation on re-show)
    requestAnimationFrame(function () {
      card.classList.add('card--visible');
    });
  }

  /**
   * Hides a card and removes its animation class.
   * @param {Element} card
   */
  function hideCard(card) {
    card.classList.add('hidden');
    card.classList.remove('card--visible');
  }

  // -------------------------------------------------------------------------
  // Filter pill behaviour
  // -------------------------------------------------------------------------

  /**
   * Wires up click handlers for all .filter-pill elements.
   * Rules:
   *  - Clicking a pill makes it the sole active pill.
   *  - Clicking the "Todos" pill (data-category="todos") deactivates all
   *    others and activates itself.
   *  - Clicking the already-active pill deactivates it and falls back to
   *    "Todos" if present, otherwise no filter.
   */
  function initFilterPills() {
    var pills = Array.from(document.querySelectorAll('.filter-pill'));
    if (pills.length === 0) return;

    var todosPill = pills.find(function (p) {
      return (p.dataset.category || '').toLowerCase() === 'todos';
    });

    function setActivePill(targetPill) {
      pills.forEach(function (p) {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });

      if (targetPill) {
        targetPill.classList.add('active');
        targetPill.setAttribute('aria-pressed', 'true');
      }
    }

    pills.forEach(function (pill) {
      // Set initial aria-pressed state
      pill.setAttribute('aria-pressed', pill.classList.contains('active') ? 'true' : 'false');
      // Ensure pills are keyboard-operable if they aren't already buttons
      if (pill.tagName !== 'BUTTON' && !pill.getAttribute('tabindex')) {
        pill.setAttribute('tabindex', '0');
      }

      pill.addEventListener('click', function () {
        var isAlreadyActive = pill.classList.contains('active');
        var isTodos = (pill.dataset.category || '').toLowerCase() === 'todos';

        if (isTodos) {
          // "Todos" always activates and clears others
          setActivePill(pill);
        } else if (isAlreadyActive) {
          // Deactivate this pill and fall back to "Todos"
          setActivePill(todosPill || null);
        } else {
          // Activate this pill exclusively
          setActivePill(pill);
        }

        filterCards();
      });

      // Support keyboard activation for non-button elements
      if (pill.tagName !== 'BUTTON') {
        pill.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            pill.click();
          }
        });
      }
    });
  }

  // -------------------------------------------------------------------------
  // Search input
  // -------------------------------------------------------------------------

  function initSearchInput() {
    var searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    var debouncedFilter = debounce(filterCards, 200);

    searchInput.addEventListener('input', debouncedFilter);

    // Also handle the (rare) 'search' event fired when clearing an
    // <input type="search"> via the native × button
    searchInput.addEventListener('search', debouncedFilter);
  }

  // -------------------------------------------------------------------------
  // Bootstrap
  // -------------------------------------------------------------------------

  function init() {
    initFilterPills();
    initSearchInput();

    // Run an initial filter pass so the page state is consistent on load
    // (e.g. if a pill is already marked active in the HTML)
    filterCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
