/**
 * TimeERP — inject shared footer on every page
 */
(function (global) {
  'use strict';

  var CSS_ID = 'site-footer-css';
  var MOUNTED = false;

  function detectRoot() {
    var path = (global.location.pathname || '').replace(/\\/g, '/');
    if (/\/HRMS\//i.test(path)) return '../';
    if (/\/time erp\//i.test(path) || /\/time%20erp\//i.test(path)) return '../';
    return '';
  }

  function ensureCss(root) {
    if (document.getElementById(CSS_ID)) return;
    var link = document.createElement('link');
    link.id = CSS_ID;
    link.rel = 'stylesheet';
    link.href = root + 'css/site-footer.css?v=6';
    document.head.appendChild(link);
  }

  function isLegacyMegaFooterStyled(footer) {
    var cs = global.getComputedStyle(footer);
    if (cs.backgroundImage && cs.backgroundImage !== 'none') return true;
    var bg = (cs.backgroundColor || '').replace(/\s+/g, '');
    if (!bg || bg === 'transparent' || bg === 'rgba(0,0,0,0)') return false;
    if (/^rgb\(255,255,255\)$/i.test(bg) || /^rgba\(255,255,255,1\)$/i.test(bg)) return false;
    return true;
  }

  /** Remove unstyled copied mega-footers (cause giant social SVGs / broken layouts). */
  function removeBrokenLegacyFooters() {
    var keptStyled = false;
    document.querySelectorAll('footer.footer').forEach(function (footer) {
      if (isLegacyMegaFooterStyled(footer)) {
        keptStyled = true;
        return;
      }
      footer.remove();
    });
    return keptStyled;
  }

  function footerHtml(root) {
    var home = root + 'home.html';
    return (
      '<footer class="td-footer">' +
        '<div class="td-footer__top">' +
          '<a href="' + home + '" class="td-footer__logo" aria-label="TimeERP home">' +
            '<img src="' + root + 'assets/logo-nav.svg" alt="TimeERP" width="196" height="48">' +
          '</a>' +
          '<div class="td-footer__contact">' +
            '<address class="td-footer__address">' +
              'Law Seva Management Private Limited · ' +
              '<a class="td-footer__address-link" href="https://www.google.com/maps/search/?api=1&amp;query=Ansal+Sumedha+Building+RDC+Ghaziabad+201002" target="_blank" rel="noopener noreferrer" aria-label="View office location on Google Maps">' +
                'BM-08, Ansal Sumedha Building, RDC, Ghaziabad, Delhi NCR, UP – 201001' +
              '</a>' +
            '</address>' +
          '</div>' +
          '<div class="td-footer__social">' +
            '<a href="https://www.linkedin.com/in/ca-clouddesk-381510388" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 9h3v10H6V9zm1.5-5A1.75 1.75 0 118 7.5 1.75 1.75 0 017.5 4zM10 9h3v1.4h.05c.45-.85 1.55-1.75 3.2-1.75 3.4 0 4 2.1 4 4.85V19h-3v-5.6c0-1.35-.02-3.1-1.9-3.1-1.9 0-2.2 1.45-2.2 3v5.7H10V9z"/></svg></a>' +
            '<a href="https://www.instagram.com/erptime/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/></svg></a>' +
            '<a href="https://www.youtube.com/@ERPTime" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 8.5a2 2 0 00-1.4-1.5C17 6.5 12 6.5 12 6.5s-5 0-6.6.5A2 2 0 004 8.5 21 21 0 004 12a21 21 0 00.4 3.5 2 2 0 001.4 1.5c1.6.5 6.6.5 6.6.5s5 0 6.6-.5a2 2 0 001.4-1.5A21 21 0 0020 12a21 21 0 00-.4-3.5zM10 15.5v-7l6 3.5-6 3.5z"/></svg></a>' +
            '<a href="https://x.com/erptime" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M5 5l14 14M19 5L5 19" stroke-linecap="round"/></svg></a>' +
          '</div>' +
        '</div>' +
        '<div class="td-footer__bar">' +
          '<div class="td-footer__bar-inner">' +
            '<p class="td-footer__rating"><strong>650+</strong> MSME · <strong>4.8/5</strong> customer rating · <strong>4+</strong> industries served</p>' +
            '<nav class="td-footer__legal" aria-label="Legal">' +
              '<a href="' + root + 'privacy.html">Privacy</a>' +
              '<a href="' + root + 'terms.html">Terms</a>' +
              '<a href="' + root + 'security.html">Security</a>' +
              '<a href="' + root + 'contact_sales.html">Contact Us</a>' +
            '</nav>' +
            '<p class="td-footer__copy">© 2026 TimeERP</p>' +
          '</div>' +
        '</div>' +
      '</footer>'
    );
  }

  function findMountTarget() {
    var existing = document.querySelector('.content-footer');
    if (existing) return { el: existing, replace: false };

    var main =
      document.querySelector('.content-shell > .main') ||
      document.querySelector('main.main') ||
      document.querySelector('.main');

    if (main) return { el: main, replace: false };

    return { el: document.body, replace: false, standalone: true };
  }

  function removeMiniFooterLinks() {
    document.querySelectorAll('.hd-mini-footer').forEach(function (el) { el.remove(); });

    var selectors = [
      '.td-dash-footer__links',
      '.ig-footer__links',
      '.te-footer__links',
      '.af-footer__links',
      '.ar-app-footer__links',
      '.apr-app-footer__links'
    ];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.closest('.td-footer')) el.remove();
      });
    });

    document.querySelectorAll('[class*="app-footer__links"], [class*="dash-footer__links"], .sm-footer-links').forEach(function (el) {
      if (el.closest('.td-footer')) return;
      el.remove();
    });

    document.querySelectorAll('.lm-footer nav, footer nav').forEach(function (el) {
      if (el.closest('.td-footer')) return;
      var links = el.querySelectorAll('a');
      var hasRefer = false;
      var hasSupport = false;
      for (var i = 0; i < links.length; i++) {
        var t = (links[i].textContent || '').trim().toLowerCase();
        if (t.indexOf('refer') !== -1 && t.indexOf('earn') !== -1) hasRefer = true;
        if (t === 'support') hasSupport = true;
      }
      if (hasRefer && hasSupport && links.length <= 7) el.remove();
    });
  }

  function mount(opts) {
    removeMiniFooterLinks();
    var path = (global.location.pathname || '').replace(/\\/g, '/');
    /* Day Book keeps a full-height scroll pane — do not pin the site footer there */
    if (/day_book\.html$/i.test(path)) {
      document.querySelectorAll('.content-footer').forEach(function (el) { el.remove(); });
      return;
    }
    if (MOUNTED || document.querySelector('.td-footer')) {
      MOUNTED = true;
      return;
    }

    var root = (opts && opts.root != null) ? opts.root : detectRoot();
    ensureCss(root);

    // Pages with a properly styled mega-footer keep it; broken copies are removed.
    if (removeBrokenLegacyFooters()) {
      MOUNTED = true;
      return;
    }

    var target = findMountTarget();
    var wrap = target.el.classList && target.el.classList.contains('content-footer')
      ? target.el
      : document.createElement('div');

    if (!wrap.classList.contains('content-footer')) {
      wrap.className = 'content-footer';
      wrap.innerHTML = footerHtml(root);
      target.el.appendChild(wrap);
    } else if (!wrap.querySelector('.td-footer')) {
      wrap.innerHTML = footerHtml(root);
    }

    if (target.standalone) {
      document.body.classList.add('site-footer-only-page');
    }

    MOUNTED = true;
  }

  if (!global.__SITE_FOOTER_MANUAL__) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        removeMiniFooterLinks();
        mount();
      });
    } else {
      removeMiniFooterLinks();
      mount();
    }
  }

  global.SiteFooter = {
    mount: mount,
    detectRoot: detectRoot,
    removeMiniFooterLinks: removeMiniFooterLinks,
    removeBrokenLegacyFooters: removeBrokenLegacyFooters
  };
})(typeof window !== 'undefined' ? window : this);
