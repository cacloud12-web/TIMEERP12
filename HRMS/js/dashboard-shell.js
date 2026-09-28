/**
 * TIME ERP — Dashboard shell (sidebar, topbar) for HRMS pages
 * Nested: workforce → HRMS; Client Desk → CRM; channels → Marketing.
 */
(function () {
  'use strict';

  var ROOT = /\/HRMS\//i.test(window.location.pathname || '') ? '../' : '';
  var ICON_BASE = ROOT + 'assets/home-icons/';

  function applySplitSidebarLogo(root) {
    if (window.SplitLogo && window.SplitLogo.init) {
      window.SplitLogo.init({ root: root });
      return;
    }
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
    var markHref = root + 'index.html';
    var textHref = root + 'home.html';
    document.querySelectorAll('.sidebar__brand').forEach(function (brand) {
      if (brand.querySelector('.sidebar__brand-split')) return;
      var link = brand.querySelector('.sidebar__brand-logo');
      if (!link || !link.querySelector('img[src*="logo-nav"]')) return;
      var split = document.createElement('div');
      split.className = 'sidebar__brand-split';
      split.setAttribute('role', 'group');
      split.setAttribute('aria-label', 'TimeERP');
      split.innerHTML =
        '<a href="' + markHref + '" class="sidebar__brand-mark" aria-label="TimeERP marketing home">' + MARK_SVG + '</a>'
        + '<a href="' + textHref + '" class="sidebar__brand-wordmark" aria-label="TimeERP dashboard">'
        + '<span class="sidebar__logo-time">Time</span><span class="sidebar__logo-erp">ERP</span></a>';
      link.replaceWith(split);
    });
  }

  applySplitSidebarLogo(ROOT);

  (function initSidebarCollapseEarly() {
    function run() {
      if (window.SidebarCollapse) {
        window.SidebarCollapse.init({ root: ROOT });
        return;
      }
      var s = document.createElement('script');
      s.src = ROOT + 'js/sidebar-collapse.js?v=5';
      s.onload = function () {
        if (window.SidebarCollapse) window.SidebarCollapse.init({ root: ROOT });
      };
      document.body.appendChild(s);
    }
    if (document.body) run();
    else document.addEventListener('DOMContentLoaded', run);
  })();

  /* Top-level sidebar only */
  var MODULES = [
    { id: 'dashboard', title: 'Dashboard' },
    { id: 'hrms', title: 'HRMS' },
    { id: 'crm', title: 'CRM' },
    { id: 'marketing', title: 'Marketing' },
    { id: 'document-vault', title: 'Document Vault' },
    { id: 'project-management', title: 'Project Management' },
    { id: 'billing', title: 'Billing' },
    { id: 'reports', title: 'Reports' }
  ];

  var page = (window.location.pathname || '').split('/').pop() || '';
  var REPORT_PAGES = /task_report|billing_report|employee_report|customers_report|hrms_report|lead_report|document_vault_report/i;
  var HRMS_PAGES = /attendance|attendance_approval|probation_approval|hr_expense|employee_policy|account_settings|employee_declaration|employee_transactions|my_leave|my_expense|my_timesheet|my_appraisal|grievance|hr_grievance|hr_appraisal|salary_slip|form_12b|form_12bb|hrms_setting|hrms_leave|set_designation|leave|payroll|timesheet|expense|viewemployee|add_employee|recruitment|onboarding|employee_profile|exitmanagement|assets_allocation|day_book/i;
  var MARKETING_PAGES = /marketing_send_email|marketing_compose_email|marketing_email_template|marketing_footer_template|marketing_smtp|marketing_sent_emails|marketing_send_sms|marketing_bulk_whatsapp|marketing_create_whatsapp_template|marketing_send_notification|marketing_chat|whatsapp_chat|marketing_appointments|marketing_visitor|marketing_lead_management|marketing_community|marketing_community_dashboard|marketing_community_offers|marketing_community_transferred|marketing_community_received|marketing_community_policy|marketing_website|marketing_website_company|marketing_website_home|marketing_website_services|marketing_website_blogs|marketing_website_blog_add|marketing_website_about|marketing_website_events|marketing_website_event_add/i;
  var DOCUMENT_VAULT_PAGES = /document_vault|client_document|self_create_document|inward_outward|add_inward_outward|dsc_tracker|udin_repository|peer_review|add_peer_review|asset_register|register_asset|depreciation|form145|form146|add_form145|add_form146/i;
  var BILLING_PAGES = /billing|add_invoice|add_proforma|edit_invoice/i;
  var PM_PAGES = /task_management|project_management/i;
  var activeModule = 'hrms';
  if (/my_profile|organization\.html|payroll\.html|import_utility\.html|notification\.html|^settings\.html$|app_setup\.html|trash_bin\.html|my_notes\.html/i.test(page)) activeModule = 'dashboard';
  else if (/^hrms\.html$/i.test(page) || HRMS_PAGES.test(page)) activeModule = 'hrms';
  else if (REPORT_PAGES.test(page)) activeModule = 'reports';
  else if (DOCUMENT_VAULT_PAGES.test(page) && !/document_vault_report/i.test(page)) activeModule = 'document-vault';
  else if (BILLING_PAGES.test(page) && !/billing_report/i.test(page)) activeModule = 'billing';
  else if (PM_PAGES.test(page)) activeModule = 'project-management';
  else if (/crm/i.test(page)) activeModule = 'crm';
  else if (MARKETING_PAGES.test(page)) activeModule = 'marketing';
  var sidebarList = document.getElementById('sidebarList');

  var MODULE_HREF = {
    dashboard: ROOT + 'home.html#home',
    hrms: ROOT + 'hrms.html',
    crm: ROOT + 'home.html#module/crm',
    marketing: ROOT + 'home.html#module/marketing',
    'document-vault': ROOT + 'document_vault.html',
    'project-management': ROOT + 'task_management.html',
    billing: ROOT + 'billing.html',
    reports: ROOT + 'home.html#module/reports'
  };

  function imgTag(src, alt) {
    return '<img src="' + src + '" alt="' + (alt || '') + '" loading="lazy" width="64" height="64">';
  }

  function renderSidebar() {
    if (!sidebarList) return;
    sidebarList.innerHTML = MODULES.map(function (m) {
      var href = MODULE_HREF[m.id] || (ROOT + 'home.html#module/' + m.id);
      return '<a href="' + href + '" class="sidebar__item' + (m.id === activeModule ? ' is-active' : '') + '">' +
        '<span class="sidebar__icon">' + imgTag(ICON_BASE + m.id + '.svg', m.title) + '</span><span>' + m.title + '</span></a>';
    }).join('');
  }

  var SVG_FOOTER_TRASH =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M9 5h6"/>' +
      '<path d="M10 5V4h4v1"/>' +
      '<path d="M4.5 7.5h15"/>' +
      '<path d="M7 7.5l.9 12.2a1 1 0 0 0 1 .9h6.2a1 1 0 0 0 1-.9L17 7.5"/>' +
    '</svg>';

  var SVG_FOOTER_WHATSAPP =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M12 3.2c-4.75 0-8.6 3.58-8.6 8 0 1.55.5 3 1.4 4.2L3.4 20.6l5-1.32A8.9 8.9 0 0 0 12 20.4c4.75 0 8.6-3.58 8.6-8S16.75 3.2 12 3.2z"/>' +
      '<path class="sidebar-footer-fill" d="M14.85 13.95c-.2-.1-1.15-.57-1.33-.63-.18-.07-.31-.1-.44.1-.13.2-.5.63-.61.76-.11.13-.23.15-.42.05-.2-.1-.82-.3-1.57-.97-.58-.52-.97-1.16-1.08-1.36-.12-.2-.01-.3.08-.4.09-.09.2-.23.3-.34.1-.11.13-.2.2-.33.07-.13.03-.24-.02-.34-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33h-.37c-.13 0-.34.05-.52.24-.17.2-.67.65-.67 1.6s.69 1.85.78 1.98c.1.13 1.35 2.06 3.28 2.89.46.2.82.31 1.1.4.46.15.88.13 1.21.08.37-.06 1.13-.46 1.29-.9.16-.45.16-.83.11-.91-.04-.08-.18-.13-.38-.23z"/>' +
    '</svg>';

  var SVG_FOOTER_LOGOUT =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M12 4a8 8 0 1 0 0 16"/>' +
      '<path d="M12 12h8"/>' +
      '<path d="M17.5 9l3 3-3 3"/>' +
    '</svg>';

  function sidebarFooterHtml() {
    return (
      '<button type="button" class="sidebar__footer-btn" id="sidebarTrashBtn" aria-label="Trash" title="Trash">' +
        SVG_FOOTER_TRASH +
      '</button>' +
      '<a class="sidebar__footer-btn" href="' + ROOT + 'whatsapp_chat.html" id="sidebarWhatsAppBtn" aria-label="WhatsApp" title="WhatsApp">' +
        SVG_FOOTER_WHATSAPP +
      '</a>' +
      '<button type="button" class="sidebar__footer-btn" id="sidebarLogoutBtn" aria-label="Logout" title="Logout">' +
        SVG_FOOTER_LOGOUT +
      '</button>'
    );
  }

  function applySidebarFooterIcons(root) {
    var scope = root || document;
    var trash = scope.querySelector('#sidebarTrashBtn');
    var whatsapp = scope.querySelector('#sidebarWhatsAppBtn');
    var logout = scope.querySelector('#sidebarLogoutBtn');
    if (trash) trash.innerHTML = SVG_FOOTER_TRASH;
    if (whatsapp) whatsapp.innerHTML = SVG_FOOTER_WHATSAPP;
    if (logout) logout.innerHTML = SVG_FOOTER_LOGOUT;
  }

  function ensureSidebarFooterStyles() {
    if (document.querySelector('link[data-sidebar-footer-css]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = ROOT + 'css/sidebar-footer.css?v=4';
    link.setAttribute('data-sidebar-footer-css', '1');
    document.head.appendChild(link);
  }

  function bindSidebarFooterActions(root) {
    var trashUrl = ROOT + 'trash_bin.html';
    var unlockUrl = ROOT + 'user_account_settings.html';
    var whatsappUrl = ROOT + 'whatsapp_chat.html';
    var scope = root || document;
    var trash = scope.querySelector('#sidebarTrashBtn');
    var whatsapp = scope.querySelector('#sidebarWhatsAppBtn');
    var logout = scope.querySelector('#sidebarLogoutBtn');
    if (trash && !trash.dataset.bound) {
      trash.dataset.bound = '1';
      trash.addEventListener('click', function () { window.location.href = trashUrl; });
    }
    if (whatsapp && !whatsapp.dataset.bound) {
      whatsapp.dataset.bound = '1';
      whatsapp.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = whatsappUrl;
      });
    }
    /* Top module-nav icons live outside the sidebar footer */
    document.querySelectorAll('.mp-mod-icon-btn[aria-label="Trash"]').forEach(function (btn) {
      if (btn.dataset.boundTrash) return;
      btn.dataset.boundTrash = '1';
      btn.addEventListener('click', function () { window.location.href = trashUrl; });
    });
    document.querySelectorAll('.mp-mod-icon-btn[aria-label="Unlock"], .mp-mod-icon-btn[aria-label="Lock"]').forEach(function (btn) {
      if (btn.dataset.boundUnlock) return;
      btn.dataset.boundUnlock = '1';
      btn.addEventListener('click', function () { window.location.href = unlockUrl; });
    });
    if (logout && !logout.dataset.bound) {
      logout.dataset.bound = '1';
      logout.addEventListener('click', function () {
        toast('Logged out', 'You have been signed out.');
        setTimeout(function () { window.location.href = ROOT + 'index.html'; }, 600);
      });
    }
  }

  function ensureSidebarFooter() {
    ensureSidebarFooterStyles();
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    var foot = sidebar.querySelector('.sidebar__footer');
    if (!foot) {
      foot = document.createElement('div');
      foot.className = 'sidebar__footer';
      foot.setAttribute('role', 'group');
      foot.setAttribute('aria-label', 'Sidebar shortcuts');
      foot.innerHTML = sidebarFooterHtml();
    } else {
      applySidebarFooterIcons(foot);
    }
    /* Keep footer pinned as last child of sidebar on every page */
    if (foot.parentNode !== sidebar || sidebar.lastElementChild !== foot) sidebar.appendChild(foot);
    bindSidebarFooterActions(foot);
  }

  function toggleSidebar(open) {
    var sidebar = document.getElementById('sidebar');
    var scrim = document.getElementById('sidebarScrim');
    if (!sidebar) return;
    sidebar.classList.toggle('is-open', open);
    if (scrim) scrim.classList.toggle('is-open', open);
  }

  function ensureToastStack() {
    if (document.getElementById('toastStack')) return;
    var stack = document.createElement('div');
    stack.id = 'toastStack';
    stack.className = 'toast-stack';
    stack.setAttribute('aria-live', 'polite');
    document.body.appendChild(stack);
  }

  function ensureTopbar() {
    var actions = document.querySelector('.topbar .topbar__actions') || document.querySelector('.topbar__actions');
    if (!actions) return;

    var profileHref = ROOT + 'my_profile.html';
    var onProfile = /my_profile\.html/i.test(page);
    var alreadyBuilt = !!actions.querySelector('.shell-account, .shell-top-checkin, [class*="-top-checkin"]');

    if (!alreadyBuilt) {
      actions.innerHTML =
        '<button type="button" class="shell-top-checkin" id="shellTopCheckInBtn">Check In</button>' +
        '<time class="shell-top-clock" id="shellTopClock" datetime="">--:--</time>' +
        '<button type="button" class="topbar__icon-btn shell-top-icon" id="shellCalBtn" aria-label="Calendar">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>' +
        '</button>' +
        '<div class="topbar__menu" style="position:relative">' +
          '<button type="button" class="topbar__icon-btn shell-top-icon" id="notifBtn" aria-label="Notifications" aria-haspopup="true" aria-expanded="false">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3a6 6 0 00-6 6v3.5l-1.5 2.5h15L18 12.5V9a6 6 0 00-6-6z"/><path d="M10 19a2 2 0 004 0"/></svg>' +
          '</button>' +
          '<div class="dropdown" id="notifDropdown" role="menu" aria-label="Notifications">' +
            '<div class="dropdown__title">Notifications</div>' +
            '<div id="notifList"></div>' +
          '</div>' +
        '</div>' +
        '<a class="shell-account" id="profileBtn" href="' + profileHref + '" aria-label="Open profile"' +
          (onProfile ? ' aria-current="page"' : '') + '>' +
          '<span class="shell-account__org" aria-hidden="true">' +
            '<img src="' + ROOT + 'assets/favicon-mark.png" alt="" width="28" height="28">' +
          '</span>' +
          '<span class="shell-account__name">CA Cloud..</span>' +
          '<span class="shell-account__user" aria-hidden="true">' +
            '<img src="' + ROOT + 'assets/favicon-mark.png" alt="" width="28" height="28">' +
          '</span>' +
        '</a>';
    }

    var clock = document.getElementById('shellTopClock') || actions.querySelector('[class*="-top-clock"]');
    function tick() {
      if (!clock) return;
      var d = new Date(), h = d.getHours(), m = d.getMinutes();
      var t = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
      clock.textContent = t;
      clock.setAttribute('datetime', t);
    }
    tick();
    if (clock && !clock.dataset.tickBound) {
      clock.dataset.tickBound = '1';
      setInterval(tick, 1000);
    }

    var checkInBtn = document.getElementById('shellTopCheckInBtn') || actions.querySelector('[class*="-top-checkin"], [class*="-top-checkout"]');
    if (checkInBtn && !checkInBtn.dataset.bound) {
      checkInBtn.dataset.bound = '1';
      if (onProfile && !checkInBtn.classList.contains('is-checked-in') && !/check\s*out/i.test(checkInBtn.textContent || '')) {
        checkInBtn.classList.add('is-checked-in', 'is-orange');
        checkInBtn.textContent = 'Check Out';
      }
      checkInBtn.addEventListener('click', function () {
        var checkedIn = checkInBtn.classList.toggle('is-checked-in');
        checkInBtn.classList.toggle('is-orange', checkedIn);
        checkInBtn.textContent = checkedIn ? 'Check Out' : 'Check In';
        toast(checkedIn ? 'Checked in' : 'Checked out', checkedIn ? 'Welcome back.' : 'Your day is paused.');
      });
    }

    var calBtn = document.getElementById('shellCalBtn') || actions.querySelector('#shellCalBtn, [aria-label="Calendar"]');
    if (calBtn && !calBtn.dataset.bound) {
      calBtn.dataset.bound = '1';
      calBtn.addEventListener('click', function () {
        window.location.href = ROOT + 'my_profile.html#calendar';
      });
    }
  }

  function bindDropdown(btnId, menuId) {
    var btn = document.getElementById(btnId);
    var menu = document.getElementById(menuId);
    if (!btn || !menu || btn.dataset.dropdownBound) return;
    btn.dataset.dropdownBound = '1';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.classList.contains('is-open');
      document.querySelectorAll('.dropdown.is-open').forEach(function (d) { d.classList.remove('is-open'); });
      document.querySelectorAll('[aria-expanded="true"]').forEach(function (b) {
        if (b === btn) return;
        b.setAttribute('aria-expanded', 'false');
      });
      menu.classList.toggle('is-open', !open);
      btn.setAttribute('aria-expanded', !open ? 'true' : 'false');
    });
  }

  function toast(title, detail) {
    ensureToastStack();
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

  ensureTopbar();

  (function initNotificationPanel() {
    function run() {
      if (window.NotificationPanel) {
        window.NotificationPanel.init({ root: ROOT });
        return;
      }
      var s = document.createElement('script');
      s.src = ROOT + 'js/notification-panel.js?v=1';
      s.onload = function () {
        if (window.NotificationPanel) window.NotificationPanel.init({ root: ROOT });
      };
      document.body.appendChild(s);
    }
    run();
  })();

  (function initRunningTaskPanel() {
    function run() {
      if (window.RunningTaskPanel) {
        window.RunningTaskPanel.init({ root: ROOT });
        return;
      }
      var s = document.createElement('script');
      s.src = ROOT + 'js/running-task-panel.js?v=2';
      s.onload = function () {
        if (window.RunningTaskPanel) window.RunningTaskPanel.init({ root: ROOT });
      };
      document.body.appendChild(s);
    }
    run();
  })();

  (function initSearchRoutesPanel() {
    function run() {
      if (window.SearchRoutesPanel) {
        window.SearchRoutesPanel.init({ root: ROOT });
        return;
      }
      var s = document.createElement('script');
      s.src = ROOT + 'js/search-routes-panel.js?v=1';
      s.onload = function () {
        if (window.SearchRoutesPanel) window.SearchRoutesPanel.init({ root: ROOT });
      };
      document.body.appendChild(s);
    }
    run();
  })();

  /* Profile account pill navigates to my_profile.html — no dropdown */

  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown.is-open').forEach(function (d) { d.classList.remove('is-open'); });
    var notifBtn = document.getElementById('notifBtn');
    if (notifBtn) notifBtn.setAttribute('aria-expanded', 'false');
  });

  renderSidebar();
  ensureSidebarFooter();

  (function loadCreateMenu() {
    var root = ROOT;
    function run() {
      if (window.CreateMenu) {
        window.CreateMenu.init({ root: root });
        return;
      }
      window.__CREATE_MENU_MANUAL__ = true;
      var s = document.createElement('script');
      s.src = root + 'js/create-menu.js?v=1';
      s.onload = function () {
        if (window.CreateMenu) window.CreateMenu.init({ root: root });
      };
      document.body.appendChild(s);
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  })();

  (function loadSiteFooter() {
    var root = ROOT;
    function run() {
      if (window.SiteFooter) {
        window.SiteFooter.mount({ root: root });
        return;
      }
      window.__SITE_FOOTER_MANUAL__ = true;
      var s = document.createElement('script');
      s.src = root + 'js/site-footer.js?v=7';
      s.onload = function () {
        if (window.SiteFooter) window.SiteFooter.mount({ root: root });
      };
      document.body.appendChild(s);
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  })();

  if (HRMS_PAGES.test(page)) {
    window.addEventListener('DOMContentLoaded', function () {
      var s = document.createElement('script');
      s.src = 'js/hrms-interactions.js?v=hi3';
      document.body.appendChild(s);
    });
  }
})();
