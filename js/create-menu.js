/**
 * TimeERP — Sidebar Create dropdown (Project, My Service, Timesheet, …)
 */
(function (global) {
  'use strict';

  var CSS_ID = 'create-menu-css';

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
    link.href = root + 'css/create-menu.css?v=1';
    document.head.appendChild(link);
  }

  var ICONS = {
    project: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="5" y="4" width="14" height="16" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
    service: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 11h16"/><path d="M9 15l2 2 4-4"/></svg>',
    timesheet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>',
    attendance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 11h16"/><path d="M8 15h2M12 15h2M16 15h2"/></svg>',
    notification: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M6 4h12v14H6z"/><path d="M9 4V3h6v1"/><path d="M10 18h4"/></svg>',
    crm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="9" cy="8" r="3"/><circle cx="16" cy="9" r="2.5"/><path d="M4 19c0-2.5 2-4.5 5-4.5s5 2 5 4.5"/><path d="M14 19c0-1.8 1.2-3.2 3-3.5"/></svg>',
    invoice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M9.5 10.5h3a1.5 1.5 0 010 3h-3"/></svg>'
  };

  function menuItems(root) {
    return [
      { label: 'Project', href: root + 'task_management.html', icon: 'project' },
      { label: 'My Service', href: root + 'service_master.html', icon: 'service' },
      { label: 'Timesheet', href: root + 'HRMS/my_timesheet.html', icon: 'timesheet' },
      { label: 'Attendance', href: root + 'HRMS/attendance.html', icon: 'attendance' },
      { label: 'Notification', href: root + 'notification.html', icon: 'notification' },
      { label: 'CRM', href: root + 'crm_add_client.html', icon: 'crm' },
      { label: 'Invoice', href: root + 'add_invoice.html', icon: 'invoice' }
    ];
  }

  function positionMenu(btn, menu) {
    var r = btn.getBoundingClientRect();
    menu.classList.add('is-fixed');
    menu.style.top = Math.round(r.bottom + 8) + 'px';
    menu.style.left = Math.round(r.left) + 'px';
    menu.style.width = Math.max(Math.round(r.width), 210) + 'px';
  }

  function resetMenuPosition(menu) {
    menu.classList.remove('is-fixed');
    menu.style.top = '';
    menu.style.left = '';
    menu.style.width = '';
  }

  function closeMenu(btn, menu) {
    menu.classList.remove('is-open');
    btn.classList.remove('is-menu-open');
    btn.setAttribute('aria-expanded', 'false');
    resetMenuPosition(menu);
  }

  function openMenu(btn, menu) {
    positionMenu(btn, menu);
    menu.classList.add('is-open');
    btn.classList.add('is-menu-open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function buildMenuHtml(root) {
    return menuItems(root).map(function (item) {
      return (
        '<a class="sidebar__create-item" href="' + item.href + '" role="menuitem">' +
          '<span class="sidebar__create-item__icon" aria-hidden="true">' + (ICONS[item.icon] || '') + '</span>' +
          '<span>' + item.label + '</span>' +
        '</a>'
      );
    }).join('');
  }

  function init(opts) {
    var btn = document.getElementById('sidebarCreate');
    if (!btn || btn.dataset.createMenuBound) return;

    var root = (opts && opts.root != null) ? opts.root : detectRoot();
    ensureCss(root);

    btn.removeAttribute('data-open');
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');

    var wrap = btn.parentElement;
    if (!wrap || !wrap.classList.contains('sidebar__create-wrap')) {
      var newWrap = document.createElement('div');
      newWrap.className = 'sidebar__create-wrap';
      btn.parentNode.insertBefore(newWrap, btn);
      newWrap.appendChild(btn);
      wrap = newWrap;
    }

    var menu = wrap.querySelector('.sidebar__create-menu');
    if (!menu) {
      menu = document.createElement('div');
      menu.className = 'sidebar__create-menu';
      menu.id = 'sidebarCreateMenu';
      menu.setAttribute('role', 'menu');
      menu.setAttribute('aria-label', 'Create');
      wrap.appendChild(menu);
    }
    menu.innerHTML = buildMenuHtml(root);

    btn.dataset.createMenuBound = '1';

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var isOpen = menu.classList.contains('is-open');
      document.querySelectorAll('.sidebar__create-menu.is-open').forEach(function (m) {
        var b = m.parentElement && m.parentElement.querySelector('#sidebarCreate');
        if (b) closeMenu(b, m);
      });
      if (isOpen) closeMenu(btn, menu);
      else openMenu(btn, menu);
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) closeMenu(btn, menu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu(btn, menu);
    });

    global.addEventListener('resize', function () {
      if (menu.classList.contains('is-open')) positionMenu(btn, menu);
    });
  }

  global.CreateMenu = { init: init, detectRoot: detectRoot };

  if (!global.__CREATE_MENU_MANUAL__) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { init(); });
    } else {
      init();
    }
  }
})(typeof window !== 'undefined' ? window : this);
