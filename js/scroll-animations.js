/**
 * Scroll-triggered entrance animations — adds .in-view once per element.
 * Optional: data-anim-threshold on <body> (default 0.12).
 */
(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) return;

  var body = document.body;
  var threshold = parseFloat(body.getAttribute('data-anim-threshold') || '0.12');
  var selectors = '.anim-fade, .anim-up, .anim-left, .anim-right, .anim-scale';
  var observed = new WeakSet();

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !observed.has(entry.target)) {
        observed.add(entry.target);
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: threshold });

  document.querySelectorAll(selectors).forEach(function (el) {
    observer.observe(el);
  });
})();
