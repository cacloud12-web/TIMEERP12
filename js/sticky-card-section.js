/**
 * Zoho-style sticky-card fold — sets --sticky-card-max-height from tallest card
 * and stacks cards with increasing z-index as the user scrolls.
 * https://www.zoho.com/erp/js/vertical/sticky-card-section.js
 */
(function () {
  'use strict';

  function updateStickyCardHeight() {
    var section = document.querySelector('.sticky-card-section');
    if (!section) return;

    section.style.removeProperty('--sticky-card-max-height');

    var cards = section.querySelectorAll('.sticky-card-wrapper > .card');
    if (!cards.length) cards = section.querySelectorAll('.card');

    cards.forEach(function (card, i) {
      card.style.zIndex = String(i + 1);
    });

    if (window.innerWidth < 1200) return;

    var maxHeight = 0;

    cards.forEach(function (card) {
      var prevHeight = card.style.height;
      card.style.height = 'auto';
      maxHeight = Math.max(maxHeight, card.offsetHeight);
      card.style.height = prevHeight;
    });

    if (maxHeight > 0) {
      /* Buffer so CTA buttons are never clipped inside equal-height fold cards */
      section.style.setProperty('--sticky-card-max-height', (maxHeight + 16) + 'px');
    }
  }

  window.addEventListener('load', updateStickyCardHeight);
  window.addEventListener('resize', updateStickyCardHeight);

  if (document.readyState === 'complete') updateStickyCardHeight();
  else if (document.readyState !== 'loading') {
    window.setTimeout(updateStickyCardHeight, 0);
  }
})();
