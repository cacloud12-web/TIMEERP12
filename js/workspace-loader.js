/**
 * TimeERP — workspace splash (2s) on app entry pages
 */
(function () {
  'use strict';

  var DURATION_MS = 1000;
  var page = (window.location.pathname || '').split('/').pop() || '';
  var ENTRY = /^(home\.html)?$/i.test(page) || page === '' || page === 'index.html';

  /* Only show on main website/home entry */
  if (!ENTRY && !/home\.html$/i.test(page)) return;
  if (/index\.html$/i.test(page)) {
    /* marketing landing: still show brief brand load */
  }

  function mount() {
    if (document.getElementById('wsLoader')) return;

    document.body.classList.add('ws-loading');

    var el = document.createElement('div');
    el.id = 'wsLoader';
    el.className = 'ws-loader';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-label', 'Loading TimeERP workspace');
    el.innerHTML =
      '<div class="ws-loader__card">' +
        '<div class="ws-loader__brand">' +
          '<img src="assets/favicon-mark.png" alt="" width="36" height="36">' +
          '<div class="ws-loader__brand-text">Time<span>ERP</span></div>' +
        '</div>' +
        '<div class="ws-loader__spinner" aria-hidden="true">' +
          '<span class="ws-loader__ring"></span>' +
          '<span class="ws-loader__ring"></span>' +
          '<span class="ws-loader__ring"></span>' +
        '</div>' +
        '<h1 class="ws-loader__title">TimeERP</h1>' +
        '<p class="ws-loader__sub">Loading your workspace</p>' +
        '<div class="ws-loader__dots" aria-hidden="true"><span></span><span></span><span></span></div>' +
      '</div>';

    document.body.appendChild(el);

    window.setTimeout(function () {
      el.classList.add('is-done');
      document.body.classList.remove('ws-loading');
      window.setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 400);
    }, DURATION_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
