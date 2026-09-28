/**
 * TimeERP — Search Routes modal (sidebar search button).
 */
(function (global) {
  'use strict';

  function rootPrefix() {
    var pathname = (window.location.pathname || '').replace(/\\/g, '/');
    if (/\/HRMS\//i.test(pathname)) return '../';
    var segs = pathname.split('/').filter(Boolean);
    if (segs.length && /\.[a-z0-9]+$/i.test(segs[segs.length - 1])) segs.pop();
    return segs.length ? segs.map(function () { return '..'; }).join('/') + '/' : '';
  }

  function icon(name) {
    var paths = {
      dashboard: '<path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z"/>',
      notification: '<path d="M12 3a6 6 0 00-6 6v3.5l-1.5 2.5h15L18 12.5V9a6 6 0 00-6-6z"/><path d="M10 19a2 2 0 004 0"/>',
      settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
      suggestion: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>',
      tasks: '<path d="M8 4h8a2 2 0 012 2v14l-4-2-4 2-4-2-4 2V6a2 2 0 012-2z"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (paths[name] || paths.search) + '</svg>';
  }

  function getRoutes(root) {
    return [
      { label: 'Dashboard', href: root + 'home.html#home', icon: 'dashboard', keywords: 'dashboard home' },
      { label: 'Notification', href: root + 'notification.html', icon: 'notification', keywords: 'notification alerts' },
      { label: 'Settings', href: root + 'settings.html', icon: 'settings', keywords: 'settings preferences' },
      { label: 'Suggestion', href: root + 'help_centre.html', icon: 'suggestion', keywords: 'suggestion feedback help' },
      { label: 'Tasks', href: root + 'task_management.html', icon: 'tasks', keywords: 'tasks task management' }
    ];
  }

  function ensureStyles(root) {
    if (document.querySelector('link[data-search-routes-panel-css]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = (root || '') + 'css/search-routes-panel.css?v=1';
    link.setAttribute('data-search-routes-panel-css', '1');
    document.head.appendChild(link);
  }

  function ensureOverlay(root) {
    var overlay = document.getElementById('searchRoutesOverlay');
    if (overlay) return overlay;

    var routes = getRoutes(root);
    overlay = document.createElement('div');
    overlay.id = 'searchRoutesOverlay';
    overlay.className = 'search-routes-overlay';
    overlay.hidden = true;
    overlay.innerHTML =
      '<div class="search-routes-modal" role="dialog" aria-modal="true" aria-label="Search Routes">'
      +   '<div class="search-routes-modal__search">'
      +     '<input type="search" class="search-routes-modal__input" id="searchRoutesInput" placeholder="Search Routes" autocomplete="off">'
      +     '<span class="search-routes-modal__search-icon">' + icon('search') + '</span>'
      +   '</div>'
      +   '<div class="search-routes-modal__list" id="searchRoutesList" role="list">'
      +     routes.map(function (route) {
            return ''
              + '<a href="' + route.href + '" class="search-routes-modal__item" role="listitem" data-route-label="' + route.label.toLowerCase() + '" data-route-keywords="' + route.keywords + '">'
              +   '<span class="search-routes-modal__icon">' + icon(route.icon) + '</span>'
              +   '<span>' + route.label + '</span>'
              + '</a>';
          }).join('')
      +   '</div>'
      + '</div>';
    document.body.appendChild(overlay);
    return overlay;
  }

  function filterRoutes(query) {
    var q = (query || '').trim().toLowerCase();
    var items = document.querySelectorAll('.search-routes-modal__item');
    var visible = 0;
    items.forEach(function (item) {
      var label = item.getAttribute('data-route-label') || '';
      var keywords = item.getAttribute('data-route-keywords') || '';
      var match = !q || label.indexOf(q) !== -1 || keywords.indexOf(q) !== -1;
      item.classList.toggle('is-hidden', !match);
      if (match) visible += 1;
    });

    var list = document.getElementById('searchRoutesList');
    if (!list) return;
    var empty = list.querySelector('.search-routes-modal__empty');
    if (!visible) {
      if (!empty) {
        empty = document.createElement('div');
        empty.className = 'search-routes-modal__empty';
        empty.textContent = 'No routes found.';
        list.appendChild(empty);
      }
    } else if (empty) {
      empty.remove();
    }
  }

  function closePanel(toggleBtn) {
    var overlay = document.getElementById('searchRoutesOverlay');
    if (!overlay) return;
    overlay.classList.remove('is-open');
    overlay.hidden = true;
    document.body.classList.remove('search-routes-open');
    if (toggleBtn) toggleBtn.classList.remove('is-active');
  }

  function openPanel(toggleBtn, root) {
    var overlay = ensureOverlay(root);
    overlay.classList.add('is-open');
    overlay.hidden = false;
    document.body.classList.add('search-routes-open');
    if (toggleBtn) toggleBtn.classList.add('is-active');

    var input = document.getElementById('searchRoutesInput');
    if (input) {
      input.value = '';
      filterRoutes('');
      setTimeout(function () { input.focus(); }, 0);
    }
  }

  function bindToggle(btn, root) {
    if (!btn || btn.dataset.searchRoutesBound) return;
    btn.dataset.searchRoutesBound = '1';
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var overlay = document.getElementById('searchRoutesOverlay');
      var open = overlay && overlay.classList.contains('is-open');
      if (open) {
        closePanel(btn);
        btn.setAttribute('aria-expanded', 'false');
      } else {
        openPanel(btn, root);
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  function bindOverlay(root) {
    if (global.__SEARCH_ROUTES_OVERLAY_BOUND) return;
    global.__SEARCH_ROUTES_OVERLAY_BOUND = true;

    document.addEventListener('click', function (e) {
      var overlay = document.getElementById('searchRoutesOverlay');
      if (!overlay || !overlay.classList.contains('is-open')) return;
      if (e.target.closest('#sidebarSearchToggle')) return;
      if (e.target.closest('.search-routes-modal')) return;
      closePanel(document.getElementById('sidebarSearchToggle'));
      var btn = document.getElementById('sidebarSearchToggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var overlay = document.getElementById('searchRoutesOverlay');
      if (!overlay || !overlay.classList.contains('is-open')) return;
      closePanel(document.getElementById('sidebarSearchToggle'));
      var btn = document.getElementById('sidebarSearchToggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('input', function (e) {
      if (e.target && e.target.id === 'searchRoutesInput') {
        filterRoutes(e.target.value);
      }
    });
  }

  function init(opts) {
    opts = opts || {};
    var root = opts.root != null ? opts.root : rootPrefix();
    ensureStyles(root);
    bindOverlay(root);
    document.querySelectorAll('#sidebarSearchToggle').forEach(function (btn) {
      bindToggle(btn, root);
    });
  }

  global.SearchRoutesPanel = { init: init, open: openPanel, close: closePanel };

  function boot() { init(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
