/**
 * Footer mobile accordion — supports home1 (.footer__col) and mega (.footer-col) footers
 */
(function () {
  'use strict';

  var resizeTimer = null;

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  /* Mega footer columns (data-footer-col) */
  var megaCols = document.querySelectorAll('[data-footer-col]');
  megaCols.forEach(function (col) {
    var btn = col.querySelector('.footer-col__toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (!isMobile()) return;
      var open = col.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* Home1-style footer columns */
  document.querySelectorAll('.footer__col-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!isMobile()) return;
      var col = btn.closest('.footer__col');
      if (!col) return;
      var open = col.classList.contains('is-open');
      document.querySelectorAll('.footer__col').forEach(function (c) {
        c.classList.remove('is-open');
        var t = c.querySelector('.footer__col-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        col.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  window.addEventListener('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (isMobile()) return;
      megaCols.forEach(function (col) {
        col.classList.remove('is-open');
        var btn = col.querySelector('.footer-col__toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      document.querySelectorAll('.footer__col').forEach(function (col) {
        col.classList.remove('is-open');
        var btn = col.querySelector('.footer__col-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }, 150);
  });
})();
