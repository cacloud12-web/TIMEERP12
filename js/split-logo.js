/**
 * Split TimeERP sidebar logo: watch → marketing site, wordmark → dashboard.
 */
(function (global) {
  'use strict';

  var MARK_SVG =
    '<svg class="sidebar__logo-svg sidebar__logo-svg--mark" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false">'
    + '<g class="logo-mark" transform="translate(2 2)">'
    + '<circle cx="22" cy="22" r="20" fill="#25b7a7"/>'
    + '<path d="M22 2a20 20 0 0 0-14.14 5.86A20 20 0 0 0 2 22h6a16 16 0 0 1 14-14V2z" fill="#1a3354"/>'
    + '<circle cx="22" cy="22" r="13.5" fill="#fff"/>'
    + '<g class="logo-hands" transform="translate(22 22)">'
    + '<g class="logo-hand logo-hand--hour"><line x1="0" y1="0" x2="-5.63" y2="-3.25" stroke="#25b7a7" stroke-width="2.4" stroke-linecap="round"/></g>'
    + '<g class="logo-hand logo-hand--minute"><line x1="0" y1="0" x2="7.36" y2="-4.25" stroke="#1a3354" stroke-width="2.4" stroke-linecap="round"/></g>'
    + '<circle cx="0" cy="0" r="2.2" fill="#25b7a7"/>'
    + '</g></g></svg>';

  function rootPrefix() {
    var pathname = (window.location.pathname || '').replace(/\\/g, '/');
    var segs = pathname.split('/').filter(Boolean);
    if (segs.length && /\.[a-z0-9]+$/i.test(segs[segs.length - 1])) segs.pop();
    return segs.length ? segs.map(function () { return '..'; }).join('/') + '/' : '';
  }

  function buildSplitLogo(root) {
    var markHref = root + 'index.html';
    var textHref = root + 'home.html';
    return ''
      + '<div class="sidebar__brand-split" role="group" aria-label="TimeERP">'
      +   '<a href="' + markHref + '" class="sidebar__brand-mark" aria-label="TimeERP marketing home">' + MARK_SVG + '</a>'
      +   '<a href="' + textHref + '" class="sidebar__brand-wordmark" id="logoHome" aria-label="TimeERP dashboard">'
      +     '<span class="sidebar__logo-time">Time</span><span class="sidebar__logo-erp">ERP</span>'
      +   '</a>'
      + '</div>';
  }

  function init(opts) {
    opts = opts || {};
    var root = opts.root != null ? opts.root : rootPrefix();
    document.querySelectorAll('.sidebar__brand').forEach(function (brand) {
      if (brand.querySelector('.sidebar__brand-split')) return;
      var link = brand.querySelector('.sidebar__brand-logo');
      if (!link || !link.querySelector('img[src*="logo-nav"]')) return;
      var wrap = document.createElement('div');
      wrap.innerHTML = buildSplitLogo(root);
      link.replaceWith(wrap.firstElementChild);
    });
  }

  global.SplitLogo = { init: init };

  function boot() { init(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
