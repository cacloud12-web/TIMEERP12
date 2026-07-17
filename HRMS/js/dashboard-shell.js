/**
 * TIME ERP — Dashboard shell (sidebar, topbar) for HRMS pages
 */
(function () {
  'use strict';

  var ICON_BASE = '../assets/home-icons/';
  var MODULES = [
    { id: 'dashboard', title: 'Dashboard' },
    { id: 'hrms', title: 'HRMS' },
    { id: 'attendance', title: 'Attendance' },
    { id: 'leave', title: 'Leave Management' },
    { id: 'payroll', title: 'Payroll' },
    { id: 'timesheet', title: 'Timesheet' },
    { id: 'expense', title: 'Expense' },
    { id: 'crm', title: 'CRM' },
    { id: 'client-desk', title: 'Client Desk' },
    { id: 'communication', title: 'Communication Center' },
    { id: 'whatsapp-api', title: 'WhatsApp API' },
    { id: 'document-vault', title: 'Document Vault' },
    { id: 'project-management', title: 'Project Management' },
    { id: 'task-management', title: 'Project Management' },
    { id: 'billing', title: 'Billing' },
    { id: 'website', title: 'Website' },
    { id: 'reports', title: 'Reports & Analytics' }
  ];

  var activeModule = 'hrms';
  var sidebarList = document.getElementById('sidebarList');

  function imgTag(src, alt) {
    return '<img src="' + src + '" alt="' + (alt || '') + '" loading="lazy" width="64" height="64">';
  }

  function renderSidebar() {
    if (!sidebarList) return;
    sidebarList.innerHTML = MODULES.map(function (m) {
      var href = m.id === 'hrms' ? 'viewemployee.html' : '../home.html#' + m.id;
      return '<a href="' + href + '" class="sidebar__item' + (m.id === activeModule ? ' is-active' : '') + '">' +
        '<span class="sidebar__icon">' + imgTag(ICON_BASE + m.id + '.svg', m.title) + '</span><span>' + m.title + '</span></a>';
    }).join('');
  }

  function toggleSidebar(open) {
    var sidebar = document.getElementById('sidebar');
    var scrim = document.getElementById('sidebarScrim');
    if (!sidebar) return;
    sidebar.classList.toggle('is-open', open);
    if (scrim) scrim.classList.toggle('is-open', open);
  }

  function bindDropdown(btnId, menuId) {
    var btn = document.getElementById(btnId);
    var menu = document.getElementById(menuId);
    if (!btn || !menu) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.classList.contains('is-open');
      document.querySelectorAll('.dropdown.is-open').forEach(function (d) { d.classList.remove('is-open'); });
      menu.classList.toggle('is-open', !open);
      btn.setAttribute('aria-expanded', !open ? 'true' : 'false');
    });
  }

  function toast(title, detail) {
    var stack = document.getElementById('toastStack');
    if (!stack) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + (detail || '') + '</span>';
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 4000);
  }

  window.DashboardShell = { toast: toast };

  document.getElementById('sidebarToggle') && document.getElementById('sidebarToggle').addEventListener('click', function () {
    toggleSidebar(true);
  });
  document.getElementById('sidebarScrim') && document.getElementById('sidebarScrim').addEventListener('click', function () {
    toggleSidebar(false);
  });
  document.getElementById('sidebarSearchToggle') && document.getElementById('sidebarSearchToggle').addEventListener('click', function () {
    var input = document.getElementById('globalSearch');
    if (input) input.focus();
  });

  bindDropdown('notifBtn', 'notifDropdown');
  bindDropdown('profileBtn', 'profileDropdown');

  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown.is-open').forEach(function (d) { d.classList.remove('is-open'); });
  });

  var notifList = document.getElementById('notifList');
  if (notifList) {
    notifList.innerHTML = '<button type="button" class="dropdown__item"><span class="dropdown__dot"></span><span><strong>Employee profile updated</strong><span>HRMS · 5 min ago</span></span></button>';
  }

  renderSidebar();
})();
