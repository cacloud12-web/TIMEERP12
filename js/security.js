/**
 * TimeERP Security & Trust page interactions.
 */
(function () {
  'use strict';
  if ('IntersectionObserver' in window) {
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          rev.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.sec-reveal').forEach(function (el) { rev.observe(el); });
  } else {
    document.querySelectorAll('.sec-reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
