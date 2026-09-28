/**
 * TIME ERP — HRMS Leave (admin tabs)
 */
(function () {
  'use strict';

  var COLS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M5 9.33h14M5 14.67h14"/><path d="M8 6.85h5M8 12h5M8 17.15h5"/></svg><svg class="hl-icon-btn__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var FILTER_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M4 5h16l-6 7v5l-4 2v-7L4 5z"/></svg>';
  var EXCEL_ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 2.75h7.5L19.25 7.5V20.5a.75.75 0 01-.75.75H7a.75.75 0 01-.75-.75V3.5A.75.75 0 017 2.75z" stroke="#217346" stroke-width="1.5" stroke-linejoin="round"/><path d="M14.5 2.75V7.5h4.75" stroke="#217346" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.2 10.2l5.6 7.6M14.8 10.2l-5.6 7.6" stroke="#217346" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var CAL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>';
  var PLUS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  var EMPTY_ICON = '<div class="hl-empty__icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M10 28l6-8h32l6 8"/><path d="M10 28h44v22a4 4 0 01-4 4H14a4 4 0 01-4-4V28z"/><path d="M10 28h14l4 6h12l4-6h14"/></svg></div><p>No data</p>';

  var EMPLOYEES = [
    'Dev Aggarwal', 'Kamal Kant Sharma', 'Kuldeep Tyagi', 'Saurabh Bhardwaj',
    'Tarun Gaur', 'akki', 'Suhanshi Rawat', 'Rahul Sharma', 'Priya Mehta', 'Amit Verma'
  ];

  var VIEW_COLS = [
    { id: 'sno', label: 'S. No.' },
    { id: 'employee', label: 'Employee Name' },
    { id: 'from', label: 'From' },
    { id: 'to', label: 'To' },
    { id: 'leave', label: 'Leave' },
    { id: 'applied', label: 'Applied Days' },
    { id: 'posted', label: 'Posted Days' },
    { id: 'appDate', label: 'Application Date' },
    { id: 'proof', label: 'Proof' },
    { id: 'remark', label: 'Remark' },
    { id: 'status', label: 'Status' },
    { id: 'actionBy', label: 'Action By' },
    { id: 'action', label: 'Action' }
  ];

  var ONDUTY_COLS = [
    { id: 'check', label: '' },
    { id: 'sno', label: 'S. No.' },
    { id: 'applicant', label: 'Applicant Name' },
    { id: 'from', label: 'From' },
    { id: 'to', label: 'To' },
    { id: 'posted', label: 'Posted Days' },
    { id: 'appDate', label: 'Application Date' },
    { id: 'remark', label: 'Remark' },
    { id: 'status', label: 'Status' },
    { id: 'actionBy', label: 'Action By' },
    { id: 'approverRemark', label: 'Approver Remark' },
    { id: 'actionDate', label: 'Action Date' }
  ];

  var LEAVE_TYPES = ['AL', 'EL', 'CL', 'SL', 'TL', 'DL'];
  var STATUSES = ['Approved', 'Rejected', 'Pending'];
  var LOCATIONS = ['HO', 'Delhi', 'Mumbai', 'All'];

  var CREDIT_LEAVE_TYPES = [
    'Audit Leave', 'Earned Leave', 'Casual Leave', 'Sick Leave', 'Training Leave', 'Demo Leave'
  ];

  function defaultCreditRows() {
    return CREDIT_LEAVE_TYPES.map(function (name) {
      return { name: name, count: 0 };
    });
  }

  var state = {
    tab: 'view',
    checkedIn: true,
    viewVisible: {},
    ondutyVisible: {},
    viewFilter: { leaveTypes: {}, statuses: {}, locations: {} },
    ondutySelected: {},
    page: { count: { page: 1, size: 10 }, log: { page: 1, size: 10 }, view: { page: 1, size: 10 }, onduty: { page: 1, size: 10 } },
    dateRange: { start: '', end: '' },
    employeeFilter: '',
    creditDirty: false,
    creditEmployee: '',
    creditRows: defaultCreditRows(),
    creditCounts: { 'Audit Leave': 0, 'Earned Leave': 0, 'Casual Leave': 0, 'Sick Leave': 0, 'Training Leave': 0, 'Demo Leave': 0 },
    viewLeaves: [
      { id: 1, employee: 'Dev Aggarwal', from: '17/07/2026', fromHalf: 'Full Day', to: '17/07/2026', toHalf: 'Full Day', leave: 'AL', applied: 1, posted: 1, appDate: '15/07/2026', proof: '--', remark: '', status: 'Approved', actionBy: 'Kamal Kant Sharma' },
      { id: 2, employee: 'Kamal Kant Sharma', from: '14/05/2026', fromHalf: 'Full Day', to: '14/05/2026', toHalf: 'Full Day', leave: 'SL', applied: 1, posted: 1, appDate: '12/05/2026', proof: '--', remark: '', status: 'Approved', actionBy: 'Admin' },
      { id: 3, employee: 'Kuldeep Tyagi', from: '29/08/2026', fromHalf: 'Full Day', to: '29/08/2026', toHalf: 'Full Day', leave: 'CL', applied: 1, posted: 1, appDate: '27/08/2026', proof: '--', remark: 'festival', status: 'Approved', actionBy: 'Kamal Kant Sharma' },
      { id: 4, employee: 'Saurabh Bhardwaj', from: '12/11/2025', fromHalf: 'Full Day', to: '12/11/2025', toHalf: 'Full Day', leave: 'SL', applied: 1, posted: 0, appDate: '10/11/2025', proof: '--', remark: '', status: 'Pending', actionBy: '--' },
      { id: 5, employee: 'Priya Mehta', from: '03/06/2026', fromHalf: 'First Half', to: '03/06/2026', toHalf: 'First Half', leave: 'CL', applied: 0.5, posted: 0, appDate: '01/06/2026', proof: '--', remark: 'Personal', status: 'Rejected', actionBy: 'Kamal Kant Sharma' }
    ],
    leaveCounts: [
      { employee: 'Tarun Gaur', leave: 'AL', count: 5 },
      { employee: 'Tarun Gaur', leave: 'EL', count: 9 },
      { employee: 'Saurabh Bhardwaj', leave: 'SL', count: 9 },
      { employee: 'Saurabh Bhardwaj', leave: 'AL', count: 10 },
      { employee: 'Dev Aggarwal', leave: 'CL', count: 8 },
      { employee: 'Dev Aggarwal', leave: 'SL', count: 6 },
      { employee: 'Kamal Kant Sharma', leave: 'EL', count: 12 },
      { employee: 'Kamal Kant Sharma', leave: 'AL', count: 4 },
      { employee: 'Kuldeep Tyagi', leave: 'CL', count: 7 },
      { employee: 'Kuldeep Tyagi', leave: 'SL', count: 5 },
      { employee: 'Rahul Sharma', leave: 'AL', count: 3 },
      { employee: 'Priya Mehta', leave: 'EL', count: 11 },
      { employee: 'Amit Verma', leave: 'CL', count: 6 },
      { employee: 'Suhanshi Rawat', leave: 'SL', count: 4 },
      { employee: 'akki', leave: 'AL', count: 2 }
    ],
    leaveLogs: [
      { id: 1, employee: 'Dev Aggarwal', date: '17/08/2026', leave: 'CL', count: 1, type: 'DEBIT', remark: 'Leave Applied' },
      { id: 2, employee: 'Kamal Kant Sharma', date: '14/08/2026', leave: 'EL', count: 2, type: 'CREDIT', remark: 'Annual credit' },
      { id: 3, employee: 'Saurabh Bhardwaj', date: '10/08/2026', leave: 'SL', count: 1, type: 'DEBIT', remark: 'Leave Applied' },
      { id: 4, employee: 'Priya Mehta', date: '05/08/2026', leave: 'AL', count: 1, type: 'CREDIT', remark: 'Monthly accrual' },
      { id: 5, employee: 'Tarun Gaur', date: '01/08/2026', leave: 'TL', count: 0.5, type: 'DEBIT', remark: 'Half day leave' }
    ],
    nextLeaveLogId: 6,
    onDuty: [
      { id: 1, applicant: 'Dev Aggarwal', from: '17/08/2026', fromHalf: 'Full Day', to: '17/08/2026', toHalf: 'Full Day', posted: 1, appDate: '16/08/2026', remark: 'Client site visit', status: 'Approved', actionBy: 'Kamal Kant Sharma', approverRemark: 'Approved', actionDate: '16/08/2026' },
      { id: 2, applicant: 'Saurabh Bhardwaj', from: '14/08/2026', fromHalf: 'First Half', to: '14/08/2026', toHalf: 'First Half', posted: 0.5, appDate: '13/08/2026', remark: 'Field work', status: 'Pending', actionBy: '--', approverRemark: '--', actionDate: '--' },
      { id: 3, applicant: 'Kamal Kant Sharma', from: '10/08/2026', fromHalf: 'Full Day', to: '11/08/2026', toHalf: 'Full Day', posted: 2, appDate: '08/08/2026', remark: 'Audit at branch', status: 'Approved', actionBy: 'Admin', approverRemark: 'OK', actionDate: '09/08/2026' },
      { id: 4, applicant: 'Suhanshi Rawat', from: '05/08/2026', fromHalf: 'Full Day', to: '05/08/2026', toHalf: 'Full Day', posted: 1, appDate: '04/08/2026', remark: 'Client meeting', status: 'Approved', actionBy: 'Kamal Kant Sharma', approverRemark: 'Approved', actionDate: '04/08/2026' },
      { id: 5, applicant: 'akki', from: '01/08/2026', fromHalf: 'Second Half', to: '01/08/2026', toHalf: 'Second Half', posted: 0.5, appDate: '31/07/2026', remark: 'Training session', status: 'Rejected', actionBy: 'Admin', approverRemark: 'Not required', actionDate: '31/07/2026' }
    ],
    nextLeaveId: 6,
    nextOnDutyId: 6,
    filterOpen: { leaveType: false, status: false, location: false }
  };

  VIEW_COLS.forEach(function (c) { state.viewVisible[c.id] = true; });
  ONDUTY_COLS.forEach(function (c) { state.ondutyVisible[c.id] = c.id !== 'check' ? true : true; });

  var root = document.getElementById('hlDynamic');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.hl-tab'));
  var tabAdd = document.getElementById('hlTabAdd');
  var applyModal = document.getElementById('hlApplyModal');
  var applyForm = document.getElementById('hlApplyForm');
  var creditModal = document.getElementById('hlCreditModal');
  var bulkUploadModal = document.getElementById('hlBulkUploadModal');
  var bulkUploadForm = document.getElementById('hlBulkUploadForm');
  var topCheckIn = document.getElementById('hlTopCheckInBtn');
  var topClock = document.getElementById('hlTopClock');

  function toast(title, detail) {
    if (window.DashboardShell && window.DashboardShell.toast) {
      window.DashboardShell.toast(title, detail);
      return;
    }
    var stack = document.getElementById('toastStack');
    if (!stack) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + (detail || '') + '</span>';
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 2800);
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tickClock() {
    if (!topClock) return;
    var d = new Date();
    topClock.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes());
    topClock.setAttribute('datetime', d.toISOString());
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function employeeOptions(selected, placeholder) {
    var html = '<option value="">' + (placeholder || 'Select Employee') + '</option>';
    EMPLOYEES.forEach(function (name) {
      html += '<option value="' + escapeHtml(name) + '"' + (selected === name ? ' selected' : '') + '>' + escapeHtml(name) + '</option>';
    });
    return html;
  }

  function statusBadge(status) {
    var cls = 'hl-badge--pending';
    if (status === 'Approved') cls = 'hl-badge--approved';
    else if (status === 'Rejected') cls = 'hl-badge--rejected';
    return '<span class="hl-badge ' + cls + '">' + escapeHtml(status) + '</span>';
  }

  function dateCell(date, half) {
    return '<div class="hl-cell-stack">' + escapeHtml(date) + (half ? '<span>' + escapeHtml(half) + '</span>' : '') + '</div>';
  }

  function excelBtn() {
    return '<button type="button" class="hl-excel" data-excel aria-label="Export Excel" title="Export Excel">' + EXCEL_ICON + '</button>';
  }

  function columnsPopHtml(popId) {
    return '<div class="hl-pop hl-pop--columns" id="' + popId + '" hidden>' +
      '<div class="hl-pop__head"><span class="hl-pop__title">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M5 9.33h14M5 14.67h14"/><path d="M8 6.85h5M8 12h5M8 17.15h5"/></svg> Columns</span>' +
      '<button type="button" class="hl-pop__link" data-select-all-cols>Select All</button></div>' +
      '<label class="hl-pop__all"><input type="checkbox" data-select-all-check checked> Select All</label>' +
      '<div class="hl-columns-list" data-cols-list></div></div>';
  }

  function filterPopHtml() {
    var leaveChecks = LEAVE_TYPES.map(function (t) {
      return '<label><input type="checkbox" data-filter-leave="' + t + '"' + (state.viewFilter.leaveTypes[t] ? ' checked' : '') + '> ' + t + '</label>';
    }).join('');
    var statusChecks = STATUSES.map(function (s) {
      return '<label><input type="checkbox" data-filter-status="' + s + '"' + (state.viewFilter.statuses[s] ? ' checked' : '') + '> ' + s + '</label>';
    }).join('');
    var locChecks = LOCATIONS.map(function (l) {
      return '<label><input type="checkbox" data-filter-loc="' + l + '"' + (state.viewFilter.locations[l] ? ' checked' : '') + '> ' + escapeHtml(l) + '</label>';
    }).join('');
    return '<div class="hl-pop hl-pop--filter" id="hlFilterPop" hidden>' +
      '<div class="hl-pop__head"><span class="hl-pop__title">' + FILTER_ICON + ' Filter</span>' +
      '<button type="button" class="hl-pop__link" data-filter-reset>Reset</button></div>' +
      '<div class="hl-filter-list">' +
      '<div class="hl-filter-section' + (state.filterOpen.leaveType ? ' is-open' : '') + '" data-filter-sec="leaveType">' +
      '<button type="button" class="hl-filter-item">Leave Type <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>' +
      '<div class="hl-filter-body">' + leaveChecks + '</div></div>' +
      '<div class="hl-filter-section' + (state.filterOpen.status ? ' is-open' : '') + '" data-filter-sec="status">' +
      '<button type="button" class="hl-filter-item">Status <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>' +
      '<div class="hl-filter-body">' + statusChecks + '</div></div>' +
      '<div class="hl-filter-section' + (state.filterOpen.location ? ' is-open' : '') + '" data-filter-sec="location">' +
      '<button type="button" class="hl-filter-item">Location <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>' +
      '<div class="hl-filter-body">' + locChecks + '</div></div>' +
      '</div></div>';
  }

  function paginationHtml(key, totalOverride) {
    var cfg = state.page[key] || { page: 1, size: 10 };
    var total = totalOverride != null ? totalOverride : 0;
    var pages = Math.max(1, Math.ceil(total / cfg.size) || 1);
    var page = Math.min(cfg.page, pages);
    var shown = Math.min(cfg.size, total);
    var displayTotal = key === 'log' ? 237 : (key === 'count' ? 25 : total);
    var displayPages = key === 'log' ? 24 : (key === 'count' ? 3 : pages);
    if (key === 'log') { shown = Math.min(10, total); displayTotal = 237; displayPages = 24; }
    if (key === 'count') { shown = Math.min(10, total); displayTotal = 25; displayPages = 3; }
    return '<footer class="hl-pagination" aria-label="Table pagination">' +
      '<div class="hl-pagination__left"></div>' +
      '<div class="hl-pagination__center">' +
      '<button type="button" class="hl-page-nav" data-page-prev="' + key + '" aria-label="Previous page"' + (page <= 1 ? ' disabled' : '') + '>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>' +
      '<input type="text" class="hl-page-input" value="' + page + '" aria-label="Current page" readonly>' +
      '<span class="hl-page-of">of <span>' + displayPages + '</span></span>' +
      '<button type="button" class="hl-page-nav" data-page-next="' + key + '" aria-label="Next page"' + (page >= pages ? ' disabled' : '') + '>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>' +
      '</div>' +
      '<div class="hl-pagination__right"><span class="hl-count">' + shown + '/' + displayTotal + '</span></div>' +
      '</footer>';
  }

  function pageSlice(rows, key) {
    var cfg = state.page[key] || { page: 1, size: 10 };
    var pages = Math.max(1, Math.ceil(rows.length / cfg.size) || 1);
    if (cfg.page > pages) cfg.page = pages;
    state.page[key] = cfg;
    var start = (cfg.page - 1) * cfg.size;
    return rows.slice(start, start + cfg.size);
  }

  function applyColVis(visibleMap) {
    Object.keys(visibleMap).forEach(function (id) {
      var show = !!visibleMap[id];
      root.querySelectorAll('[data-col="' + id + '"]').forEach(function (el) {
        if (show) el.removeAttribute('hidden');
        else el.setAttribute('hidden', '');
      });
    });
  }

  function renderColsList(listEl, cols, visibleMap) {
    if (!listEl) return;
    listEl.innerHTML = cols.filter(function (c) { return c.id !== 'check'; }).map(function (c) {
      return '<label><span class="hl-col-drag" aria-hidden="true">⋮⋮</span>' +
        '<input type="checkbox" data-col-toggle="' + c.id + '"' + (visibleMap[c.id] ? ' checked' : '') + '> ' +
        escapeHtml(c.label) + '</label>';
    }).join('');
    var all = root.querySelector('[data-select-all-check]');
    if (all) {
      var filtered = cols.filter(function (c) { return c.id !== 'check'; });
      var allOn = filtered.every(function (c) { return visibleMap[c.id]; });
      var allOff = filtered.every(function (c) { return !visibleMap[c.id]; });
      all.checked = allOn;
      all.indeterminate = !allOn && !allOff;
    }
  }

  function closePops() {
    root.querySelectorAll('.hl-pop').forEach(function (p) { p.hidden = true; });
    root.querySelectorAll('[data-cols-btn], [data-filter-btn]').forEach(function (b) {
      b.classList.remove('is-active');
      b.setAttribute('aria-expanded', 'false');
    });
  }

  /* ---------- Tab renderers ---------- */

  function filteredViewLeaves() {
    var rows = state.viewLeaves.slice();
    if (state.employeeFilter) rows = rows.filter(function (r) { return r.employee === state.employeeFilter; });
    var lt = Object.keys(state.viewFilter.leaveTypes).filter(function (k) { return state.viewFilter.leaveTypes[k]; });
    var st = Object.keys(state.viewFilter.statuses).filter(function (k) { return state.viewFilter.statuses[k]; });
    if (lt.length) rows = rows.filter(function (r) { return lt.indexOf(r.leave) !== -1; });
    if (st.length) rows = rows.filter(function (r) { return st.indexOf(r.status) !== -1; });
    return rows;
  }

  function renderView() {
    var all = filteredViewLeaves();
    var rows = pageSlice(all, 'view');
    var rangeLabel = (state.dateRange.start && state.dateRange.end)
      ? (state.dateRange.start + ' → ' + state.dateRange.end)
      : 'Start date → End date';
    var th = VIEW_COLS.map(function (c) {
      return '<th data-col="' + c.id + '">' + escapeHtml(c.label) + '</th>';
    }).join('');
    var body = rows.map(function (r, i) {
      var sno = ((state.page.view.page - 1) * state.page.view.size) + i + 1;
      return '<tr data-id="' + r.id + '">' +
        '<td data-col="sno">' + sno + '</td>' +
        '<td data-col="employee">' + escapeHtml(r.employee) + '</td>' +
        '<td data-col="from">' + dateCell(r.from, r.fromHalf) + '</td>' +
        '<td data-col="to">' + dateCell(r.to, r.toHalf) + '</td>' +
        '<td data-col="leave">' + escapeHtml(r.leave) + '</td>' +
        '<td data-col="applied">' + r.applied + '</td>' +
        '<td data-col="posted">' + r.posted + '</td>' +
        '<td data-col="appDate">' + escapeHtml(r.appDate) + '</td>' +
        '<td data-col="proof">' + escapeHtml(r.proof) + '</td>' +
        '<td data-col="remark">' + escapeHtml(r.remark || '--') + '</td>' +
        '<td data-col="status">' + statusBadge(r.status) + '</td>' +
        '<td data-col="actionBy">' + escapeHtml(r.actionBy) + '</td>' +
        '<td data-col="action"><span class="hl-row-view">View</span></td>' +
        '</tr>';
    }).join('');

    root.innerHTML =
      '<section class="hl-card" aria-label="View Leave">' +
      '<div class="hl-toolbar">' +
      '<div class="hl-toolbar__left">' +
      '<select class="hl-select" data-emp-filter aria-label="Select Employee">' + employeeOptions(state.employeeFilter) + '</select>' +
      '<button type="button" class="hl-date-range' + (state.dateRange.start ? ' has-value' : '') + '" data-date-range>' +
      '<span>' + escapeHtml(rangeLabel) + '</span>' + CAL_ICON + '</button>' +
      '</div>' +
      '<div class="hl-toolbar__actions">' +
      '<button type="button" class="hl-icon-btn" data-cols-btn aria-expanded="false" aria-label="Columns">' + COLS_ICON + '</button>' +
      columnsPopHtml('hlColsPop') +
      '<button type="button" class="hl-icon-btn" data-filter-btn aria-expanded="false" aria-label="Filter">' + FILTER_ICON + '</button>' +
      filterPopHtml() +
      excelBtn() +
      '</div></div>' +
      '<div class="hl-table-wrap">' +
      '<table class="hl-table"><thead><tr>' + th + '</tr></thead><tbody>' + (body || '') + '</tbody></table>' +
      (rows.length ? '' : '<div class="hl-empty">' + EMPTY_ICON + '</div>') +
      '</div>' +
      paginationHtml('view', all.length) +
      '</section>';

    renderColsList(root.querySelector('[data-cols-list]'), VIEW_COLS, state.viewVisible);
    applyColVis(state.viewVisible);
  }

  function renderCompOff() {
    root.innerHTML =
      '<section class="hl-card hl-card--split" aria-label="Comp Off">' +
      '<div class="hl-co-left">' +
      '<form class="hl-co-form" id="hlCompOffForm" onsubmit="return false;">' +
      '<div class="hl-co-field"><label class="hl-co-label" for="coSelectExtra">Select For Extra Hours <i class="hl-co-info" title="Select extra hours">i</i> <span class="hl-req">*</span></label>' +
      '<select class="hl-input hl-input--select" id="coSelectExtra" required>' +
      '<option value="">Select</option>' +
      '<option value="ot-1">Overtime — 02 Aug 2026 (4 hrs)</option>' +
      '<option value="ot-2">Overtime — 05 Aug 2026 (2 hrs)</option>' +
      '<option value="ot-3">Weekend Work — 09 Aug 2026 (8 hrs)</option>' +
      '</select></div>' +
      '<div class="hl-co-field"><label class="hl-co-label" for="coHours">Enter Number Of Extra Hours <i class="hl-co-info" title="Hours">i</i></label>' +
      '<input class="hl-input" type="text" id="coHours" placeholder="0"></div>' +
      '<div class="hl-co-field"><label class="hl-co-label" for="coDayType">Day Type <i class="hl-co-info" title="Day type">i</i></label>' +
      '<select class="hl-input hl-input--select" id="coDayType">' +
      '<option>Working Day</option><option>Weekend</option><option>Holiday</option></select></div>' +
      '<div class="hl-co-field"><label class="hl-co-label" for="coFrom">Compensatory leave From Date <i class="hl-co-info" title="From">i</i> <span class="hl-req">*</span></label>' +
      '<div class="hl-date"><input class="hl-input" type="text" id="coFrom" placeholder="dd/mm/yyyy" required><span class="hl-date__icon">' + CAL_ICON + '</span></div></div>' +
      '<div class="hl-co-field"><label class="hl-co-label">Select From Half <span class="hl-req">*</span></label>' +
      '<div class="hl-radios"><label class="hl-radio"><input type="radio" name="coFromHalf" value="first" checked> First Half</label>' +
      '<label class="hl-radio"><input type="radio" name="coFromHalf" value="second"> Second Half</label>' +
      '<label class="hl-radio"><input type="radio" name="coFromHalf" value="full"> Full Day</label></div></div>' +
      '<div class="hl-co-field"><label class="hl-co-label" for="coTo">Compensatory leave To Date <i class="hl-co-info" title="To">i</i> <span class="hl-req">*</span></label>' +
      '<div class="hl-date"><input class="hl-input" type="text" id="coTo" placeholder="dd/mm/yyyy" required><span class="hl-date__icon">' + CAL_ICON + '</span></div></div>' +
      '<div class="hl-co-field"><label class="hl-co-label">Select To Half <span class="hl-req">*</span></label>' +
      '<div class="hl-radios"><label class="hl-radio"><input type="radio" name="coToHalf" value="first" checked> First Half</label>' +
      '<label class="hl-radio"><input type="radio" name="coToHalf" value="full"> Full Day</label></div></div>' +
      '<div class="hl-co-field"><label class="hl-co-label" for="coReason">Reason <span class="hl-req">*</span></label>' +
      '<textarea class="hl-textarea" id="coReason" maxlength="150" rows="3" placeholder="Enter reason" required></textarea>' +
      '<div class="hl-char-count"><span id="coReasonCount">0</span>/150</div></div>' +
      '<button type="submit" class="hl-btn-teal hl-btn-teal--lg hl-btn-teal--center" data-co-save>Save</button>' +
      '</form></div>' +
      '<div class="hl-co-right">' +
      '<div class="hl-toolbar"><div class="hl-toolbar__left">' +
      '<select class="hl-select" data-co-emp aria-label="Select Employee">' + employeeOptions('') + '</select></div>' +
      '<div class="hl-toolbar__actions">' + excelBtn() + '</div></div>' +
      '<div class="hl-table-wrap">' +
      '<table class="hl-table hl-table--sm"><thead><tr>' +
      '<th>Date</th><th>Day Type</th><th>Extra Hours</th><th>Approved Days</th><th>Remaining Days</th>' +
      '</tr></thead><tbody></tbody></table>' +
      '<div class="hl-empty">' + EMPTY_ICON + '</div>' +
      '</div></div></section>';
  }

  function renderCount() {
    var all = state.leaveCounts;
    if (state.employeeFilter) all = all.filter(function (r) { return r.employee === state.employeeFilter; });
    var rows = pageSlice(all, 'count');
    var body = rows.map(function (r, i) {
      var sno = ((state.page.count.page - 1) * state.page.count.size) + i + 1;
      return '<tr><td>' + sno + '</td><td>' + escapeHtml(r.employee) + '</td><td>' + escapeHtml(r.leave) + '</td><td>' + r.count + '</td></tr>';
    }).join('');

    root.innerHTML =
      '<section class="hl-card" aria-label="Leave Count">' +
      '<div class="hl-toolbar"><div class="hl-toolbar__left"></div>' +
      '<div class="hl-toolbar__actions">' +
      '<select class="hl-select" data-emp-filter aria-label="Select Employee">' + employeeOptions(state.employeeFilter) + '</select>' +
      '<button type="button" class="hl-icon-btn" data-filter-btn aria-label="Filter">' + FILTER_ICON + '</button>' +
      excelBtn() +
      '</div></div>' +
      '<div class="hl-table-wrap">' +
      '<table class="hl-table hl-table--sm"><thead><tr>' +
      '<th>S. No</th><th>Employee Name</th><th>Leave Type</th><th>Count</th>' +
      '</tr></thead><tbody>' + body + '</tbody></table></div>' +
      paginationHtml('count', all.length) +
      '</section>';
  }

  function renderLog() {
    var all = state.leaveLogs;
    if (state.employeeFilter) all = all.filter(function (r) { return r.employee === state.employeeFilter; });
    var rows = pageSlice(all, 'log');
    var rangeLabel = (state.dateRange.start && state.dateRange.end)
      ? (state.dateRange.start + ' → ' + state.dateRange.end)
      : 'Start date → End date';
    var body = rows.map(function (r, i) {
      var sno = ((state.page.log.page - 1) * state.page.log.size) + i + 1;
      var typeCls = r.type === 'DEBIT' ? 'hl-type-debit' : 'hl-type-credit';
      return '<tr><td>' + sno + '</td><td>' + escapeHtml(r.employee) + '</td><td>' + escapeHtml(r.date) + '</td>' +
        '<td>' + escapeHtml(r.leave) + '</td><td>' + r.count + '</td>' +
        '<td class="' + typeCls + '">' + escapeHtml(r.type) + '</td>' +
        '<td>' + escapeHtml(r.remark) + '</td></tr>';
    }).join('');

    root.innerHTML =
      '<section class="hl-card" aria-label="Leave Log">' +
      '<div class="hl-toolbar">' +
      '<div class="hl-toolbar__left">' +
      '<select class="hl-select" data-emp-filter aria-label="Select Employee">' + employeeOptions(state.employeeFilter) + '</select>' +
      '<button type="button" class="hl-date-range' + (state.dateRange.start ? ' has-value' : '') + '" data-date-range>' +
      '<span>' + escapeHtml(rangeLabel) + '</span>' + CAL_ICON + '</button></div>' +
      '<div class="hl-toolbar__actions">' +
      '<button type="button" class="hl-icon-btn" data-filter-btn aria-label="Filter">' + FILTER_ICON + '</button>' +
      excelBtn() +
      '</div></div>' +
      '<div class="hl-table-wrap">' +
      '<table class="hl-table"><thead><tr>' +
      '<th>S. No.</th><th>Employee Name</th><th>Date</th><th>Leave Type</th><th>Count</th><th>Type</th><th>Remark</th>' +
      '</tr></thead><tbody>' + body + '</tbody></table></div>' +
      paginationHtml('log', all.length) +
      '</section>';
  }

  function renderCredit() {
    root.innerHTML =
      '<section class="hl-card hl-card--form" aria-label="Leave Credit/Debit">' +
      creditFormHtml('hlCreditForm') +
      '</section>';
  }

  function creditTableHtml() {
    var rows = state.creditRows.map(function (r) {
      return '<tr><td>' + escapeHtml(r.name) + '</td>' +
        '<td class="hl-cd-count"><input type="number" class="hl-cd-input" data-cd-count="' + escapeHtml(r.name) + '" min="0" step="0.5" value="' + r.count + '"></td></tr>';
    }).join('');
    return '<div class="hl-cd-table-wrap">' +
      '<table class="hl-cd-table"><thead><tr><th>Name</th><th class="hl-cd-count">Count</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      (state.creditRows.length ? '' : '<div class="hl-empty">' + EMPTY_ICON + '</div>') +
      '</div>';
  }

  function creditFormHtml(formId) {
    var saveCls = state.creditDirty ? 'hl-btn-teal hl-btn-teal--lg hl-btn-teal--center' : 'hl-btn-teal hl-btn-teal--lg hl-btn-teal--center is-disabled';
    return '<form class="hl-cd-form" id="' + formId + '" onsubmit="return false;">' +
      '<div class="hl-field"><label class="hl-field__label" for="' + formId + 'Emp">Select Employee</label>' +
      '<select class="hl-input hl-input--select" id="' + formId + 'Emp" data-cd-emp>' + employeeOptions(state.creditEmployee, 'Select Employee') + '</select></div>' +
      '<div class="hl-cd-row">' +
      '<div class="hl-field"><label class="hl-field__label" for="' + formId + 'Type">Credit/Debit</label>' +
      '<select class="hl-input hl-input--select" id="' + formId + 'Type" data-cd-type><option value="Credit" selected>Credit</option><option value="Debit">Debit</option></select></div>' +
      '<div class="hl-field hl-field--grow"><label class="hl-field__label" for="' + formId + 'Remarks">Remarks</label>' +
      '<input class="hl-input" type="text" id="' + formId + 'Remarks" data-cd-remarks placeholder="Enter Remarks"></div>' +
      '<button type="button" class="hl-icon-btn hl-icon-btn--primary" data-cd-add aria-label="Add">' + PLUS_ICON + '</button>' +
      '</div>' +
      creditTableHtml() +
      '<button type="submit" class="' + saveCls + '" data-cd-save' + (state.creditDirty ? '' : ' disabled') + '>Save</button>' +
      '</form>';
  }

  function refreshCreditUI() {
    if (state.tab === 'credit') renderTab('credit');
    if (creditModal && !creditModal.hidden) {
      var body = document.getElementById('hlCreditModalBody');
      if (body) body.innerHTML = creditFormHtml('hlCreditModalForm');
    }
  }

  function handleCreditAdd(formEl) {
    var empEl = formEl && formEl.querySelector('[data-cd-emp]');
    if (!empEl || !empEl.value) { toast('Required', 'Please select employee.'); return; }
    state.creditEmployee = empEl.value;
    state.creditRows = CREDIT_LEAVE_TYPES.map(function (name) {
      return { name: name, count: state.creditCounts[name] || 0 };
    });
    state.creditDirty = true;
    refreshCreditUI();
    toast('Added', 'Leave types loaded for ' + state.creditEmployee + '.');
  }

  function handleCreditSave() {
    if (!state.creditDirty) return;
    document.querySelectorAll('[data-cd-count]').forEach(function (inp) {
      state.creditCounts[inp.getAttribute('data-cd-count')] = parseFloat(inp.value) || 0;
    });
    toast('Saved', 'Leave credit/debit updated.');
    state.creditDirty = false;
    closeCreditModal();
    refreshCreditUI();
  }

  function openCreditModal() {
    if (!creditModal) return;
    var body = document.getElementById('hlCreditModalBody');
    if (body) body.innerHTML = creditFormHtml('hlCreditModalForm');
    creditModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeCreditModal() {
    if (!creditModal) return;
    creditModal.hidden = true;
    syncModalScroll();
  }

  function syncModalScroll() {
    var open = (applyModal && !applyModal.hidden) || (creditModal && !creditModal.hidden) || (bulkUploadModal && !bulkUploadModal.hidden);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function resetBulkUploadForm() {
    if (bulkUploadForm) bulkUploadForm.reset();
    var label = document.getElementById('hlBulkUploadLabel');
    var btn = document.getElementById('hlBulkUploadBtn');
    if (label) label.textContent = 'Click to Upload';
    if (btn) btn.classList.remove('has-file');
  }

  function openBulkUploadModal() {
    resetBulkUploadForm();
    if (!bulkUploadModal) return;
    bulkUploadModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeBulkUploadModal() {
    if (!bulkUploadModal) return;
    bulkUploadModal.hidden = true;
    resetBulkUploadForm();
    syncModalScroll();
  }

  function renderOnDuty() {
    var all = state.onDuty;
    if (state.employeeFilter) all = all.filter(function (r) { return r.applicant === state.employeeFilter; });
    var rows = pageSlice(all, 'onduty');
    var selectedCount = Object.keys(state.ondutySelected).filter(function (k) { return state.ondutySelected[k]; }).length;
    var rangeLabel = (state.dateRange.start && state.dateRange.end)
      ? (state.dateRange.start + ' → ' + state.dateRange.end)
      : 'Start date → End date';
    var th = ONDUTY_COLS.map(function (c) {
      if (c.id === 'check') return '<th class="hl-th-check" data-col="check"><input type="checkbox" data-od-select-all aria-label="Select all"></th>';
      return '<th data-col="' + c.id + '">' + escapeHtml(c.label) + '</th>';
    }).join('');
    var body = rows.map(function (r, i) {
      var sno = ((state.page.onduty.page - 1) * state.page.onduty.size) + i + 1;
      var checked = state.ondutySelected[r.id] ? ' checked' : '';
      return '<tr data-id="' + r.id + '">' +
        '<td data-col="check" class="hl-th-check"><input type="checkbox" data-od-check="' + r.id + '"' + checked + '></td>' +
        '<td data-col="sno">' + sno + '</td>' +
        '<td data-col="applicant">' + escapeHtml(r.applicant) + '</td>' +
        '<td data-col="from">' + dateCell(r.from, r.fromHalf) + '</td>' +
        '<td data-col="to">' + dateCell(r.to, r.toHalf) + '</td>' +
        '<td data-col="posted">' + r.posted + '</td>' +
        '<td data-col="appDate">' + escapeHtml(r.appDate) + '</td>' +
        '<td data-col="remark">' + escapeHtml(r.remark) + '</td>' +
        '<td data-col="status">' + statusBadge(r.status) + '</td>' +
        '<td data-col="actionBy">' + escapeHtml(r.actionBy) + '</td>' +
        '<td data-col="approverRemark">' + escapeHtml(r.approverRemark) + '</td>' +
        '<td data-col="actionDate">' + escapeHtml(r.actionDate) + '</td>' +
        '</tr>';
    }).join('');

    root.innerHTML =
      '<section class="hl-card" aria-label="On Duty">' +
      '<div class="hl-toolbar">' +
      '<div class="hl-toolbar__left">' +
      '<select class="hl-select" data-emp-filter aria-label="Select Employee">' + employeeOptions(state.employeeFilter) + '</select>' +
      '<button type="button" class="hl-date-range' + (state.dateRange.start ? ' has-value' : '') + '" data-date-range>' +
      '<span>' + escapeHtml(rangeLabel) + '</span>' + CAL_ICON + '</button>' +
      '<button type="button" class="hl-icon-btn hl-icon-btn--primary" data-od-add aria-label="Add On Duty">' + PLUS_ICON + '</button>' +
      '<button type="button" class="hl-btn-bulk" data-od-bulk-cancel' + (selectedCount ? '' : ' disabled') + '>Bulk Cancel</button>' +
      '</div>' +
      '<div class="hl-toolbar__actions">' +
      '<button type="button" class="hl-icon-btn" data-cols-btn aria-expanded="false" aria-label="Columns">' + COLS_ICON + '</button>' +
      columnsPopHtml('hlOdColsPop') +
      '<button type="button" class="hl-icon-btn" data-filter-btn aria-label="Filter">' + FILTER_ICON + '</button>' +
      excelBtn() +
      '</div></div>' +
      '<div class="hl-table-wrap">' +
      '<table class="hl-table hl-table--onduty"><thead><tr>' + th + '</tr></thead><tbody>' + body + '</tbody></table>' +
      (rows.length ? '' : '<div class="hl-empty">' + EMPTY_ICON + '</div>') +
      '</div>' +
      paginationHtml('onduty', all.length) +
      '</section>';

    renderColsList(root.querySelector('[data-cols-list]'), ONDUTY_COLS, state.ondutyVisible);
    applyColVis(state.ondutyVisible);
  }

  var RENDERERS = {
    view: renderView,
    compoff: renderCompOff,
    count: renderCount,
    log: renderLog,
    credit: renderCredit,
    onduty: renderOnDuty
  };

  function renderTab(tab) {
    state.tab = tab || state.tab;
    tabs.forEach(function (btn) {
      var on = btn.getAttribute('data-tab') === state.tab;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    var fn = RENDERERS[state.tab];
    if (fn) fn();
  }

  /* ---------- Apply Leave modal ---------- */

  function fillEmployeeSelect() {
    var sel = document.getElementById('hlEmployee');
    if (!sel) return;
    sel.innerHTML = employeeOptions('', 'Employee');
  }

  function calcDays() {
    var fromEl = document.getElementById('hlFromDate');
    var toEl = document.getElementById('hlToDate');
    var daysEl = document.getElementById('hlDaysCount');
    if (!daysEl) return;
    var from = (fromEl && fromEl.value) || '';
    var to = (toEl && toEl.value) || '';
    var fromHalf = (document.querySelector('input[name="fromHalf"]:checked') || {}).value || 'full';
    var toHalf = (document.querySelector('input[name="toHalf"]:checked') || {}).value || 'full';
    var days = 0;
    if (from && to) {
      var fp = from.split('/');
      var tp = to.split('/');
      if (fp.length === 3 && tp.length === 3) {
        var fd = new Date(+fp[2], +fp[1] - 1, +fp[0]);
        var td = new Date(+tp[2], +tp[1] - 1, +tp[0]);
        var diff = Math.round((td - fd) / 86400000);
        if (diff >= 0) {
          days = diff + 1;
          if (from === to) {
            if (fromHalf !== 'full') days = 0.5;
          } else {
            if (fromHalf !== 'full') days -= 0.5;
            if (toHalf !== 'full') days -= 0.5;
          }
        }
      }
    }
    daysEl.textContent = 'No. of Days : ' + days;
    return days;
  }

  function openApplyModal() {
    if (!applyModal) return;
    fillEmployeeSelect();
    applyForm.reset();
    var fullFrom = document.querySelector('input[name="fromHalf"][value="full"]');
    var fullTo = document.querySelector('input[name="toHalf"][value="full"]');
    if (fullFrom) fullFrom.checked = true;
    if (fullTo) fullTo.checked = true;
    calcDays();
    applyModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeApplyModal() {
    if (!applyModal) return;
    applyModal.hidden = true;
    syncModalScroll();
  }

  function handleTabAdd() {
    if (state.tab === 'view' || state.tab === 'onduty' || state.tab === 'log' || state.tab === 'count') openApplyModal();
    else if (state.tab === 'credit') openCreditModal();
    else if (state.tab === 'compoff') toast('Add Comp Off', 'Use the Comp Off form on the left.');
    else toast('Add', 'Add form for this section.');
  }

  /* ---------- Events ---------- */

  function getVisibleCfg() {
    if (state.tab === 'view') return { cols: VIEW_COLS, map: state.viewVisible };
    if (state.tab === 'onduty') return { cols: ONDUTY_COLS, map: state.ondutyVisible };
    return null;
  }

  function bind() {
    tabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.employeeFilter = '';
        renderTab(btn.getAttribute('data-tab'));
      });
    });

    if (tabAdd) tabAdd.addEventListener('click', handleTabAdd);

    root.addEventListener('click', function (e) {
      var colsBtn = e.target.closest('[data-cols-btn]');
      if (colsBtn) {
        e.stopPropagation();
        var pop = colsBtn.parentElement.querySelector('.hl-pop--columns');
        if (!pop) return;
        var open = pop.hidden;
        closePops();
        if (open) {
          pop.hidden = false;
          colsBtn.classList.add('is-active');
          colsBtn.setAttribute('aria-expanded', 'true');
          var cfg = getVisibleCfg();
          if (cfg) renderColsList(pop.querySelector('[data-cols-list]'), cfg.cols, cfg.map);
        }
        return;
      }

      var filterBtn = e.target.closest('[data-filter-btn]');
      if (filterBtn) {
        e.stopPropagation();
        var fpop = filterBtn.parentElement.querySelector('.hl-pop--filter');
        if (!fpop) {
          toast('Filter', 'Filter options.');
          return;
        }
        var fopen = fpop.hidden;
        closePops();
        if (fopen) {
          fpop.hidden = false;
          filterBtn.classList.add('is-active');
          filterBtn.setAttribute('aria-expanded', 'true');
        }
        return;
      }

      if (e.target.closest('.hl-pop')) e.stopPropagation();

      var filterSec = e.target.closest('[data-filter-sec]');
      if (filterSec && e.target.closest('.hl-filter-item')) {
        var key = filterSec.getAttribute('data-filter-sec');
        state.filterOpen[key] = !filterSec.classList.contains('is-open');
        filterSec.classList.toggle('is-open');
        return;
      }

      if (e.target.closest('[data-filter-reset]')) {
        state.viewFilter = { leaveTypes: {}, statuses: {}, locations: {} };
        renderTab();
        toast('Reset', 'Filters cleared.');
        return;
      }

      if (e.target.closest('[data-select-all-cols]') || e.target.closest('[data-select-all-check]')) {
        var cfgAll = getVisibleCfg();
        if (!cfgAll) return;
        var turnOn = true;
        if (e.target.matches('[data-select-all-check]')) turnOn = e.target.checked;
        cfgAll.cols.forEach(function (c) {
          if (c.id !== 'check') cfgAll.map[c.id] = turnOn;
        });
        renderTab();
        return;
      }

      if (e.target.closest('[data-excel]')) {
        toast('Export', 'Excel download started.');
        return;
      }

      if (e.target.closest('[data-date-range]')) {
        state.dateRange = { start: '01/04/2026', end: '31/03/2027' };
        renderTab();
        toast('Date range', '01/04/2026 → 31/03/2027');
        return;
      }

      var pagePrev = e.target.closest('[data-page-prev]');
      if (pagePrev) {
        var pk = pagePrev.getAttribute('data-page-prev');
        if (state.page[pk] && state.page[pk].page > 1) { state.page[pk].page--; renderTab(); }
        return;
      }
      var pageNext = e.target.closest('[data-page-next]');
      if (pageNext) {
        var nk = pageNext.getAttribute('data-page-next');
        if (state.page[nk]) { state.page[nk].page++; renderTab(); }
        return;
      }

      if (e.target.closest('[data-co-save]')) {
        var coReason = document.getElementById('coReason');
        var coFrom = document.getElementById('coFrom');
        var coTo = document.getElementById('coTo');
        var coSel = document.getElementById('coSelectExtra');
        if (!coSel || !coSel.value || !coFrom || !coFrom.value || !coTo || !coTo.value || !coReason || !coReason.value.trim()) {
          toast('Required', 'Please fill all required fields.');
          return;
        }
        toast('Saved', 'Comp Off request submitted.');
        return;
      }

      if (e.target.closest('[data-cd-add]')) {
        openBulkUploadModal();
        return;
      }

      if (e.target.closest('[data-cd-save]')) {
        handleCreditSave();
        return;
      }

      if (e.target.closest('[data-od-add]')) {
        openApplyModal();
        return;
      }

      if (e.target.closest('[data-od-bulk-cancel]')) {
        var ids = Object.keys(state.ondutySelected).filter(function (k) { return state.ondutySelected[k]; });
        if (!ids.length) return;
        toast('Bulk Cancel', ids.length + ' request(s) cancelled.');
        state.ondutySelected = {};
        renderTab();
        return;
      }

      if (e.target.closest('[data-view-action]')) {
        toast('View', 'Leave detail would open.');
        return;
      }
    });

    root.addEventListener('change', function (e) {
      var emp = e.target.closest('[data-emp-filter]');
      if (emp) {
        state.employeeFilter = emp.value;
        var key = state.tab === 'count' ? 'count' : (state.tab === 'log' ? 'log' : (state.tab === 'onduty' ? 'onduty' : 'view'));
        if (state.page[key]) state.page[key].page = 1;
        renderTab();
        return;
      }

      var colToggle = e.target.closest('[data-col-toggle]');
      if (colToggle) {
        var cfg = getVisibleCfg();
        if (!cfg) return;
        cfg.map[colToggle.getAttribute('data-col-toggle')] = colToggle.checked;
        applyColVis(cfg.map);
        renderColsList(root.querySelector('[data-cols-list]'), cfg.cols, cfg.map);
        return;
      }

      var fl = e.target.closest('[data-filter-leave]');
      if (fl) {
        state.viewFilter.leaveTypes[fl.getAttribute('data-filter-leave')] = fl.checked;
        renderTab();
        return;
      }
      var fs = e.target.closest('[data-filter-status]');
      if (fs) {
        state.viewFilter.statuses[fs.getAttribute('data-filter-status')] = fs.checked;
        renderTab();
        return;
      }
      var floc = e.target.closest('[data-filter-loc]');
      if (floc) {
        state.viewFilter.locations[floc.getAttribute('data-filter-loc')] = floc.checked;
        return;
      }

      var odCheck = e.target.closest('[data-od-check]');
      if (odCheck) {
        state.ondutySelected[+odCheck.getAttribute('data-od-check')] = odCheck.checked;
        var bulk = root.querySelector('[data-od-bulk-cancel]');
        var any = Object.keys(state.ondutySelected).some(function (k) { return state.ondutySelected[k]; });
        if (bulk) {
          if (any) bulk.removeAttribute('disabled');
          else bulk.setAttribute('disabled', '');
        }
        return;
      }

      var odAll = e.target.closest('[data-od-select-all]');
      if (odAll) {
        root.querySelectorAll('[data-od-check]').forEach(function (cb) {
          cb.checked = odAll.checked;
          state.ondutySelected[+cb.getAttribute('data-od-check')] = odAll.checked;
        });
        var bulkAll = root.querySelector('[data-od-bulk-cancel]');
        if (bulkAll) {
          if (odAll.checked) bulkAll.removeAttribute('disabled');
          else bulkAll.setAttribute('disabled', '');
        }
        return;
      }

      var cdCount = e.target.closest('[data-cd-count]');
      if (cdCount) {
        state.creditCounts[cdCount.getAttribute('data-cd-count')] = parseFloat(cdCount.value) || 0;
        state.creditRows.forEach(function (r) {
          if (r.name === cdCount.getAttribute('data-cd-count')) r.count = parseFloat(cdCount.value) || 0;
        });
        state.creditDirty = true;
        refreshCreditUI();
        return;
      }
    });

    root.addEventListener('input', function (e) {
      if (e.target.id === 'coReason') {
        var counter = document.getElementById('coReasonCount');
        if (counter) counter.textContent = String(e.target.value.length);
      }
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.hl-toolbar__actions') && !e.target.closest('.hl-pop')) closePops();
    });

    document.querySelectorAll('[data-hl-close="apply"]').forEach(function (el) {
      el.addEventListener('click', closeApplyModal);
    });
    document.querySelectorAll('[data-hl-close="credit"]').forEach(function (el) {
      el.addEventListener('click', closeCreditModal);
    });
    document.querySelectorAll('[data-hl-close="bulk-upload"]').forEach(function (el) {
      el.addEventListener('click', closeBulkUploadModal);
    });

    if (bulkUploadForm) {
      bulkUploadForm.addEventListener('change', function (e) {
        if (!e.target.matches('#hlBulkUploadFile')) return;
        var label = document.getElementById('hlBulkUploadLabel');
        var btn = document.getElementById('hlBulkUploadBtn');
        var file = e.target.files && e.target.files[0];
        if (label) label.textContent = file ? file.name : 'Click to Upload';
        if (btn) btn.classList.toggle('has-file', !!file);
      });
      bulkUploadForm.addEventListener('click', function (e) {
        if (e.target.closest('[data-bulk-sample]')) {
          e.preventDefault();
          toast('Download', 'Sample Excel file downloading…');
        }
      });
      bulkUploadForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var fileInput = document.getElementById('hlBulkUploadFile');
        if (!fileInput || !fileInput.files || !fileInput.files[0]) {
          toast('Required', 'Please upload an Excel file.');
          return;
        }
        toast('Saved', 'Bulk upload completed successfully.');
        closeBulkUploadModal();
      });
    }

    if (creditModal) {
      creditModal.addEventListener('click', function (e) {
        if (e.target.closest('[data-cd-add]')) { openBulkUploadModal(); return; }
        if (e.target.closest('[data-cd-save]')) { handleCreditSave(); return; }
      });
      creditModal.addEventListener('change', function (e) {
        var cdCount = e.target.closest('[data-cd-count]');
        if (!cdCount) return;
        state.creditCounts[cdCount.getAttribute('data-cd-count')] = parseFloat(cdCount.value) || 0;
        state.creditRows.forEach(function (r) {
          if (r.name === cdCount.getAttribute('data-cd-count')) r.count = parseFloat(cdCount.value) || 0;
        });
        state.creditDirty = true;
        refreshCreditUI();
      });
    }

    if (applyForm) {
      applyForm.addEventListener('input', calcDays);
      applyForm.addEventListener('change', calcDays);
      applyForm.addEventListener('submit', function () {
        var emp = document.getElementById('hlEmployee');
        var leave = document.getElementById('hlLeaveType');
        var from = document.getElementById('hlFromDate');
        var to = document.getElementById('hlToDate');
        if (!emp.value || !leave.value || !from.value || !to.value) {
          toast('Required', 'Please fill all required fields.');
          return;
        }
        var days = calcDays();
        var fromHalf = (document.querySelector('input[name="fromHalf"]:checked') || {}).value || 'full';
        var toHalf = (document.querySelector('input[name="toHalf"]:checked') || {}).value || 'full';
        var halfLabel = { first: 'First Half', second: 'Second Half', full: 'Full Day' };
        var appDate = pad(new Date().getDate()) + '/' + pad(new Date().getMonth() + 1) + '/' + new Date().getFullYear();
        var remark = (document.getElementById('hlReason') || {}).value || '';
        if (state.tab === 'onduty') {
          state.onDuty.unshift({
            id: state.nextOnDutyId++,
            applicant: emp.value,
            from: from.value,
            fromHalf: halfLabel[fromHalf] || 'Full Day',
            to: to.value,
            toHalf: halfLabel[toHalf] || 'Full Day',
            posted: days,
            appDate: appDate,
            remark: remark,
            status: 'Pending',
            actionBy: '--',
            approverRemark: '--',
            actionDate: '--'
          });
          closeApplyModal();
          renderTab('onduty');
          toast('Applied', 'On Duty application submitted.');
          return;
        }
        if (state.tab === 'log') {
          state.leaveLogs.unshift({
            id: state.nextLeaveLogId++,
            employee: emp.value,
            date: from.value,
            leave: leave.value,
            count: days,
            type: 'DEBIT',
            remark: remark || 'Leave Applied'
          });
          closeApplyModal();
          renderTab('log');
          toast('Applied', 'Leave log entry added.');
          return;
        }
        state.viewLeaves.unshift({
          id: state.nextLeaveId++,
          employee: emp.value,
          from: from.value,
          fromHalf: halfLabel[fromHalf] || 'Full Day',
          to: to.value,
          toHalf: halfLabel[toHalf] || 'Full Day',
          leave: leave.value,
          applied: days,
          posted: 0,
          appDate: pad(new Date().getDate()) + '/' + pad(new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
          proof: '--',
          remark: (document.getElementById('hlReason') || {}).value || '',
          status: 'Pending',
          actionBy: '--'
        });
        closeApplyModal();
        if (state.tab !== 'view') renderTab('view');
        else renderTab();
        toast('Applied', 'Leave application submitted.');
      });
    }

    if (topCheckIn) {
      function syncCheckIn() {
        topCheckIn.textContent = state.checkedIn ? 'Check Out' : 'Check In';
        topCheckIn.classList.toggle('is-in', !state.checkedIn);
        topCheckIn.classList.toggle('is-out', state.checkedIn);
      }
      syncCheckIn();
      topCheckIn.addEventListener('click', function () {
        state.checkedIn = !state.checkedIn;
        syncCheckIn();
        toast(state.checkedIn ? 'Checked In' : 'Checked Out', new Date().toLocaleTimeString());
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (bulkUploadModal && !bulkUploadModal.hidden) closeBulkUploadModal();
        else if (creditModal && !creditModal.hidden) closeCreditModal();
        else closeApplyModal();
      }
    });
  }

  fillEmployeeSelect();
  bind();
  tickClock();
  setInterval(tickClock, 30000);
  renderTab('view');
})();
