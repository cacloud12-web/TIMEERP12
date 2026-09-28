/**
 * TIME ERP — HRMS global interactions
 * Wires shell controls and remaining non-interactive UI (without overriding existing handlers).
 */
(function () {
  'use strict';

  var page = (window.location.pathname || '').split('/').pop() || '';

  function toast(title, detail) {
    /* HRMS action toasts disabled — no popup cards on click */
  }

  function labelOf(el) {
    if (!el) return 'Action';
    return (el.getAttribute('aria-label') || el.title || el.textContent || 'Action').replace(/\s+/g, ' ').trim().slice(0, 48) || 'Action';
  }

  function hasDataAttr(el) {
    return [].some.call(el.attributes, function (a) { return a.name.indexOf('data-') === 0; });
  }

  function inSkipZone(el) {
    return !!el.closest(
      '.hs-modal, .dropdown, .sidebar__nav, .hs-add-menu, .hs-columns-pop, .hs-date-pop, ' +
      '.hs-del-pop, .hs-pay-menu, .hs-combo__list, .gr-pop, .gr-single-cal, .me-del-pop, ' +
      '.tv-del-pop, .aa-modal, .onb-drawer, .onb-dropdown, .ve-modal, .sd-modal, .toast-stack, ' +
      '#tvStatusPop, .tv-status-pop, .te-dtp, .te-search-select__pop, .te-dtp-scrim, ' +
      '.att-columns-pop, .att-filter-pop, .att-sum-menu-panel, .att-sum-month-pop, .att-sum-range-pop, ' +
      '.as-pop, .et-modal, .hl-cal-pop, .mts-modal, .ss-modal, .he-pdf-modal, .ep-modal, .ed-modal'
    );
  }

  function isTabControl(el) {
    return !!el.closest(
      '[data-tab], .hs-tab, .ap-tab, .he-tab, .gr-tab, .hl-tab, .me-tab, .hl-subtab, .aa-tab, ' +
      '.ve-tab, .as-tab, .et-tab, .f12-stepper__item, .fbb-stepper__item, .ae-stepper__item, ' +
      '.te-status-pill, .mts-tab, .ss-tab, .sd-tab, .pa-tab, .hg-tab, .hl-att-tab'
    );
  }

  function bindOnce(el, evt, fn) {
    if (!el || el.dataset.hrmsBound) return;
    el.dataset.hrmsBound = '1';
    el.addEventListener(evt, fn);
  }

  function wireShell() {
    bindOnce(document.getElementById('sidebarCreate'), 'click', function () {
      toast('Create', 'Choose a module action from the current page.');
    });

    document.querySelectorAll('.topbar__icon-btn[aria-label="Calendar"]').forEach(function (btn) {
      bindOnce(btn, 'click', function () { toast('Calendar', 'Opening calendar for this module.'); });
    });

    document.querySelectorAll('.topbar__icon-btn[aria-label="Settings"], .topbar__icon-btn[aria-label="Home"]').forEach(function (btn) {
      bindOnce(btn, 'click', function () { toast(labelOf(btn), 'Opening ' + labelOf(btn).toLowerCase() + '.'); });
    });

    bindOnce(document.getElementById('notifList'), 'click', function (e) {
      var item = e.target.closest('.dropdown__item');
      if (!item) return;
      var title = item.querySelector('strong');
      toast(title ? title.textContent : 'Notification', 'Opening notification details.');
    });

    var search = document.getElementById('globalSearch');
    bindOnce(search, 'keydown', function (e) {
      if (e.key !== 'Enter') return;
      var q = (search.value || '').trim();
      if (!q) return;
      toast('Search', 'Showing results for “' + q + '”.');
    });
  }

  function wireFooterLinks() {
    document.querySelectorAll(
      '.main footer a[href="#"], .main footer a[href=""], .main .app-footer a[href="#"], ' +
      '.main [class*="footer"] a[href="#"], .main [class*="footer"] a[href=""]'
    ).forEach(function (a) {
      bindOnce(a, 'click', function (e) {
        e.preventDefault();
        toast(labelOf(a), 'Opening ' + labelOf(a) + '.');
      });
    });
  }

  function wireKpiCards() {
    document.querySelectorAll(
      '.exm-kpi__card, .onb-kpi__card, .rec-kpi__card, .ast-kpi__card, .epr-kpi, .ve-stat-card, .hl-stat, .me-stat-card'
    ).forEach(function (card) {
      bindOnce(card, 'click', function () {
        var label = card.querySelector('.exm-kpi__label, .onb-kpi__label, .rec-kpi__label, .ast-kpi__label, .epr-kpi__label, .ve-stat-card__label, .hl-stat__label, .me-stat-card__label');
        toast(label ? label.textContent : 'Summary', 'Opening detailed breakdown.');
      });
    });
  }

  function wireWidgets() {
    document.querySelectorAll('.ve-widget:not([data-hrms-bound])').forEach(function (widget) {
      widget.dataset.hrmsBound = '1';
      widget.addEventListener('click', function (e) {
        if (e.target.closest('button, a, input, select, label')) return;
        var title = widget.querySelector('.ve-widget__title, h3');
        toast(title ? title.textContent : 'Widget', 'Opening widget details.');
      });
    });
  }

  function wireProfileRoutes() {
    if (page !== 'employee_profile.html') return;
    var ROUTES = {
      attendance: 'attendance.html',
      leave: 'my_leave.html',
      payroll: 'salary_slip.html',
      documents: 'employee_declaration.html',
      assets: 'assets_allocation.html',
      performance: 'hr_appraisal.html',
      'view-attendance': 'attendance.html',
      'view-payslips': 'salary_slip.html',
      'download-payslip': 'salary_slip.html'
    };
    document.addEventListener('click', function (e) {
      var ui = e.target.closest('[data-ui]');
      if (!ui) return;
      var action = ui.getAttribute('data-ui');
      if (!ROUTES[action]) return;
      e.preventDefault();
      e.stopPropagation();
      window.location.href = ROUTES[action];
    }, true);
  }

  function wireTaskView() {
    if (page !== 'task_view.html') return;

    var statusPop = document.getElementById('tvStatusPop');
    var statusBtn = document.getElementById('tvStatusBtn');
    bindOnce(statusPop, 'click', function (e) {
      var opt = e.target.closest('.tv-status-opt, button, [role="menuitem"], li');
      if (!opt || opt === statusPop) return;
      e.stopPropagation();
      var text = labelOf(opt);
      if (statusBtn) statusBtn.textContent = text;
      toast('Status updated', text);
      statusPop.hidden = true;
      if (statusBtn) statusBtn.setAttribute('aria-expanded', 'false');
    });

    document.querySelectorAll('.tv-tab').forEach(function (tab) {
      bindOnce(tab, 'click', function () {
        document.querySelectorAll('.tv-tab').forEach(function (t) {
          t.classList.remove('is-active');
          t.removeAttribute('aria-selected');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        toast('Tab', labelOf(tab));
      });
    });

    [
      '.tv-toolbar [aria-label="Download"]', '.tv-tool-btn[title="Download"]', '.tv-tool-btn[aria-label="Download"]',
      '.tv-link', '.tv-excel-btn', '.tv-comment-mic'
    ].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (btn) {
        bindOnce(btn, 'click', function (e) {
          if (btn.classList.contains('tv-link')) e.preventDefault();
          toast(labelOf(btn), 'Action completed.');
        });
      });
    });

    document.querySelectorAll('[data-stage-view], .tv-meta a, .tv-stage-view').forEach(function (el) {
      bindOnce(el, 'click', function (e) {
        e.preventDefault();
        toast('Current stage', 'Opening stage workflow details.');
      });
    });
  }

  function wireTaskEdit() {
    if (page !== 'task_edit.html') return;

    [
      '.te-top-checkin', '.te-info-btn', '.te-play-btn', '.te-icon-btn', '.te-refresh-btn',
      '.te-est-edit', '.te-tag-add', '.te-custom-fields', '.te-stage-del'
    ].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (btn) {
        bindOnce(btn, 'click', function () { toast(labelOf(btn), 'Action completed.'); });
      });
    });

    document.querySelectorAll('.te-tag-input button[aria-label="Remove"]').forEach(function (btn) {
      bindOnce(btn, 'click', function () { toast('Removed', 'Item removed from list.'); });
    });
  }

  function wireMyTimesheet() {
    if (page !== 'my_timesheet.html') return;
    document.querySelectorAll('.mts-icon-tool, .mts-comment-mic').forEach(function (btn) {
      bindOnce(btn, 'click', function () { toast(labelOf(btn), 'Action completed.'); });
    });
  }

  function wireTableRows() {
    document.querySelectorAll('.main table tbody').forEach(function (tbody) {
      if (tbody.dataset.hrmsRowBound) return;
      tbody.dataset.hrmsRowBound = '1';
      tbody.addEventListener('click', function (e) {
        if (e.target.closest('button, a, input, select, label, .hs-action, .hs-link, .hs-del-btn, .tv-del-btn, .as-action, .pa-action')) return;
        var row = e.target.closest('tr');
        if (!row || row.querySelector('.hs-empty, .tv-empty, .me-empty, .as-empty')) return;
        var cells = row.querySelectorAll('td');
        var text = cells.length > 1 ? (cells[1].textContent || cells[0].textContent) : cells[0].textContent;
        toast('Row selected', (text || 'Record').replace(/\s+/g, ' ').trim().slice(0, 60));
      });
    });
  }

  function wireCheckInButtons() {
    document.querySelectorAll('.te-top-checkin, .tv-top-checkin').forEach(function (btn) {
      bindOnce(btn, 'click', function () {
        var checked = btn.classList.toggle('is-checked-in');
        toast(checked ? 'Checked in' : 'Checked out', 'Attendance updated.');
      });
    });
  }

  function wireFallbackButtons() {
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented) return;
      var el = e.target.closest('.main button, .main a[href="#"], .main a[href=""], .main [role="button"], .main [role="tab"]');
      if (!el || el.disabled || el.type === 'submit' || el.type === 'file') return;
      if (el.dataset.hrmsBound || hasDataAttr(el) || inSkipZone(el) || isTabControl(el)) return;
      if (el.tagName === 'A') {
        var href = el.getAttribute('href');
        if (href && href !== '#' && href !== '') return;
      }
      if (el.classList.contains('hs-modal__close') || el.classList.contains('hs-modal__backdrop')) return;
      e.preventDefault();
      toast(labelOf(el), 'Action completed.');
    });
  }

  function wireForm12bSubmit() {
    if (page !== 'form_12b.html' || document.getElementById('f12SubmitBtn')) return;
    var panel = document.getElementById('f12Panel2');
    if (!panel) return;
    var actions = panel.querySelectorAll('.f12-actions');
    var foot = actions[actions.length - 1];
    if (!foot) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'f12-btn f12-btn--primary';
    btn.id = 'f12SubmitBtn';
    btn.textContent = 'Submit';
    btn.addEventListener('click', function () { toast('Submitted', 'Form 12B submitted for review.'); });
    foot.appendChild(btn);
  }

  function observeMain() {
    var main = document.querySelector('.main');
    if (!main || main.dataset.hrmsObserved) return;
    main.dataset.hrmsObserved = '1';
    var timer;
    new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        wireTableRows();
        wireKpiCards();
        wireWidgets();
      }, 80);
    }).observe(main, { childList: true, subtree: true });
  }

  function init() {
    wireShell();
    wireFooterLinks();
    wireKpiCards();
    wireWidgets();
    wireProfileRoutes();
    wireTaskView();
    wireTaskEdit();
    wireMyTimesheet();
    wireTableRows();
    wireCheckInButtons();
    wireForm12bSubmit();
    wireFallbackButtons();
    observeMain();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
