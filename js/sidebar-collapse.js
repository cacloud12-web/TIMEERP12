/**
 * TimeERP — Collapsible sidebar (icon rail mode).
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'timeerp.sidebar.collapsed';

  function chevronSvg(direction) {
    if (direction === 'left') {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 7l-5 5 5 5"/><path d="M18 7l-5 5 5 5"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7l5 5-5 5"/><path d="M13 7l5 5-5 5"/></svg>';
  }

  function ensureStyles(root) {
    if (!document.querySelector('link[data-sidebar-footer-css]')) {
      var footerLink = document.createElement('link');
      footerLink.rel = 'stylesheet';
      footerLink.href = (root || '') + 'css/sidebar-footer.css?v=4';
      footerLink.setAttribute('data-sidebar-footer-css', '1');
      document.head.appendChild(footerLink);
    }
    if (document.querySelector('link[data-sidebar-collapse-css]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = (root || '') + 'css/sidebar-collapse.css?v=5';
    link.setAttribute('data-sidebar-collapse-css', '1');
    document.head.appendChild(link);
  }

  function ensureCollapseButton(brand) {
    if (!brand || brand.querySelector('.sidebar__collapse-btn')) return brand.querySelector('.sidebar__collapse-btn');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sidebar__collapse-btn';
    btn.id = 'sidebarCollapseBtn';
    btn.setAttribute('aria-label', 'Collapse sidebar');
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML =
      '<span class="sidebar__collapse-icon--collapse">' + chevronSvg('left') + '</span>'
      + '<span class="sidebar__collapse-icon--expand">' + chevronSvg('right') + '</span>';
    brand.insertBefore(btn, brand.firstChild);
    return btn;
  }

  function setCollapsed(appShell, collapsed, save) {
    if (!appShell) return;
    appShell.classList.toggle('is-sidebar-collapsed', collapsed);
    var btn = document.getElementById('sidebarCollapseBtn');
    if (btn) {
      btn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
      btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    }
    if (save !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
      } catch (e) { /* ignore */ }
    }
  }

  function init(opts) {
    opts = opts || {};
    var root = opts.root || '';
    ensureStyles(root);

    var sidebar = document.getElementById('sidebar');
    var appShell = sidebar && sidebar.closest('.app-shell');
    if (!sidebar || !appShell) return;

    var brand = sidebar.querySelector('.sidebar__brand');
    var btn = ensureCollapseButton(brand);
    if (!btn || btn.dataset.sidebarCollapseBound) return;
    btn.dataset.sidebarCollapseBound = '1';

    var saved = false;
    try {
      saved = localStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) { /* ignore */ }

    if (saved && window.matchMedia('(min-width: 901px)').matches) {
      setCollapsed(appShell, true, false);
    }

    btn.addEventListener('click', function () {
      var collapsed = !appShell.classList.contains('is-sidebar-collapsed');
      setCollapsed(appShell, collapsed, true);
    });
  }

  global.SidebarCollapse = { init: init };

  function boot() { init(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
