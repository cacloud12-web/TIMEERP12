/**
 * TIME ERP — My Leave page (tabs, columns, filters, apply modal, date range)
 */
(function () {
  'use strict';

  var CHEVRON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  var SEARCH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/></svg>';
  var TYPE_OPTIONS = ['CREDIT', 'DEBIT'];
  var LEAVE_OPTIONS = ['Casual Leave', 'Sick Leave', 'Earned Leave', 'Privilege Leave'];
  var STATUS_OPTIONS = ['Approved', 'Rejected', 'Pending', 'Cancelled'];

  var DUMMY = {
    view: [
      { from: '01 Aug 2026', to: '02 Aug 2026', leave: 'Casual Leave', leaveId: 'LV-1001', applied: '2', posted: '2', appDate: '28 Jul 2026', proof: '--', remarks: 'Family function', status: 'Approved' },
      { from: '10 Aug 2026', to: '10 Aug 2026', leave: 'Sick Leave', leaveId: 'LV-1002', applied: '1', posted: '1', appDate: '09 Aug 2026', proof: 'Attached', remarks: 'Fever', status: 'Pending' },
      { from: '15 Aug 2026', to: '16 Aug 2026', leave: 'Earned Leave', leaveId: 'LV-1003', applied: '2', posted: '0', appDate: '05 Aug 2026', proof: '--', remarks: 'Personal work', status: 'Pending' },
      { from: '20 Jul 2026', to: '22 Jul 2026', leave: 'Privilege Leave', leaveId: 'LV-1004', applied: '3', posted: '3', appDate: '12 Jul 2026', proof: '--', remarks: 'Travel', status: 'Approved' },
      { from: '03 Jul 2026', to: '03 Jul 2026', leave: 'Casual Leave', leaveId: 'LV-1005', applied: '1', posted: '0', appDate: '02 Jul 2026', proof: '--', remarks: 'Emergency', status: 'Rejected' }
    ],
    compoff: [
      { from: '05 Apr 2026', to: '05 Apr 2026', id: 'CO-2101', posted: '1', appDate: '06 Apr 2026', remarks: 'Weekend work', status: 'Approved', action: 'Kamal Kant Sharma' },
      { from: '18 May 2026', to: '18 May 2026', id: 'CO-2102', posted: '1', appDate: '19 May 2026', remarks: 'Client demo support', status: 'Pending', action: 'Kamal Kant Sharma' },
      { from: '07 Jun 2026', to: '07 Jun 2026', id: 'CO-2103', posted: '1', appDate: '08 Jun 2026', remarks: 'Holiday coverage', status: 'Approved', action: 'Kamal Kant Sharma' },
      { from: '21 Jun 2026', to: '22 Jun 2026', id: 'CO-2104', posted: '2', appDate: '23 Jun 2026', remarks: 'Project deadline support', status: 'Pending', action: 'Kamal Kant Sharma' },
      { from: '12 Jul 2026', to: '12 Jul 2026', id: 'CO-2105', posted: '1', appDate: '13 Jul 2026', remarks: 'Event duty', status: 'Rejected', action: 'Kamal Kant Sharma' }
    ],
    onduty: [
      { from: '06/06/2026 (Full Day)', to: '07/06/2026 (Full Day)', odId: '8575', posted: '2', appDate: '09/06/2026', remarks: 'VAPI EVENT', status: 'Approved', action: 'Kamal Kant Sharma' },
      { from: '22/05/2026 (Full Day)', to: '23/05/2026 (Full Day)', odId: '7989', posted: '2', appDate: '25/05/2026', remarks: 'heydrabad event', status: 'Approved', action: 'Kamal Kant Sharma' },
      { from: '12/04/2026 (Full Day)', to: '12/04/2026 (Full Day)', odId: '7642', posted: '1', appDate: '13/04/2026', remarks: 'Client visit Delhi', status: 'Approved', action: 'Kamal Kant Sharma' },
      { from: '03/03/2026 (First Half)', to: '03/03/2026 (First Half)', odId: '7410', posted: '0.5', appDate: '04/03/2026', remarks: 'Bank work', status: 'Approved', action: 'Kamal Kant Sharma' },
      { from: '15/02/2026 (Full Day)', to: '16/02/2026 (Full Day)', odId: '7205', posted: '2', appDate: '17/02/2026', remarks: 'Training session', status: 'Pending', action: 'Kamal Kant Sharma' }
    ],
    holiday: (function () {
      var weekly = [];
      var d = new Date(2026, 2, 1); // 01 Mar 2026 Sunday
      for (var i = 0; i < 16; i++) {
        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0');
        var yyyy = d.getFullYear();
        var label = dd + '/' + mm + '/' + yyyy;
        weekly.push({
          name: 'Sunday', from: label, to: label, optional: 'No',
          type: 'Weekly Holiday', holidayKind: 'weekly', desc: 'WEEKLY OFF'
        });
        d.setDate(d.getDate() + 7);
      }
      return weekly.concat([
        { name: 'Republic Day', from: '26/01/2026', to: '26/01/2026', optional: 'No', type: 'National Holiday', holidayKind: 'national', desc: 'NATIONAL HOLIDAY' },
        { name: 'Independence Day', from: '15/08/2026', to: '15/08/2026', optional: 'No', type: 'National Holiday', holidayKind: 'national', desc: 'NATIONAL HOLIDAY' },
        { name: 'Gandhi Jayanti', from: '02/10/2026', to: '02/10/2026', optional: 'No', type: 'National Holiday', holidayKind: 'national', desc: 'NATIONAL HOLIDAY' },
        { name: 'Diwali', from: '08/11/2026', to: '09/11/2026', optional: 'No', type: 'Religious Holiday', holidayKind: 'religious', desc: 'FESTIVAL HOLIDAY' },
        { name: 'Holi', from: '03/03/2026', to: '03/03/2026', optional: 'Yes', type: 'Religious Holiday', holidayKind: 'religious', desc: 'FESTIVAL HOLIDAY' }
      ]);
    })(),
    available: [
      { name: 'Sick Leave', abbr: 'SL', count: '2' },
      { name: 'Earned Leave', abbr: 'EL', count: '2' },
      { name: 'Training Leave', abbr: 'TL', count: '9' },
      { name: 'Casual Leave', abbr: 'CL', count: '2' }
    ],
    log: [
      { employee: 'Kamal Kant Sharma', date: '12/03/2026', leaveType: 'Sick Leave (SL)', count: '2', type: 'CREDIT', remark: '--' },
      { employee: 'Kamal Kant Sharma', date: '15/03/2026', leaveType: 'Earned Leave (EL)', count: '2', type: 'CREDIT', remark: '--' },
      { employee: 'Kamal Kant Sharma', date: '01/04/2026', leaveType: 'Casual Leave (CL)', count: '2', type: 'CREDIT', remark: '--' },
      { employee: 'Kamal Kant Sharma', date: '07/04/2026', leaveType: 'Training Leave (TL)', count: '1', type: 'CREDIT', remark: 'Auto Credited' },
      { employee: 'Kamal Kant Sharma', date: '07/04/2026', leaveType: 'Training Leave (TL)', count: '1', type: 'CREDIT', remark: 'Auto Credited' },
      { employee: 'Kamal Kant Sharma', date: '07/04/2026', leaveType: 'Training Leave (TL)', count: '1', type: 'CREDIT', remark: 'Auto Credited' },
      { employee: 'Kamal Kant Sharma', date: '13/05/2026', leaveType: 'Sick Leave (SL)', count: '1', type: 'DEBIT', remark: 'Leave Applied' },
      { employee: 'Kamal Kant Sharma', date: '13/05/2026', leaveType: 'Sick Leave (SL)', count: '1', type: 'CREDIT', remark: 'Leave Cancelled' },
      { employee: 'Kamal Kant Sharma', date: '01/06/2026', leaveType: 'Earned Leave (EL)', count: '1', type: 'CREDIT', remark: 'Auto Credited' },
      { employee: 'Kamal Kant Sharma', date: '07/06/2026', leaveType: 'Training Leave (TL)', count: '2', type: 'CREDIT', remark: 'Auto Credited' },
      { employee: 'Kamal Kant Sharma', date: '12/06/2026', leaveType: 'Casual Leave (CL)', count: '1', type: 'DEBIT', remark: 'Leave Applied' },
      { employee: 'Kamal Kant Sharma', date: '18/06/2026', leaveType: 'Sick Leave (SL)', count: '1', type: 'CREDIT', remark: 'Auto Credited' },
      { employee: 'Kamal Kant Sharma', date: '22/06/2026', leaveType: 'Earned Leave (EL)', count: '2', type: 'DEBIT', remark: 'Leave Applied' },
      { employee: 'Kamal Kant Sharma', date: '28/06/2026', leaveType: 'Training Leave (TL)', count: '1', type: 'CREDIT', remark: '--' }
    ]
  };
  var COL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M5 9.33h14M5 14.67h14"/><path d="M8 6.85h5M8 12h5M8 17.15h5"/></svg><svg class="ml-icon-btn__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var FILTER_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M4 5h16l-6 7v5l-4 2v-7L4 5z"/></svg>';
  var PLUS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  var CAL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>';

  var TABS = {
    view: {
      pageSize: '10',
      showPageSize: true,
      columns: [
        { id: 'sno', label: 'S No.', labelHtml: 'S<br>No.', sortable: false },
        { id: 'from', label: 'From', sortable: true },
        { id: 'to', label: 'To', sortable: true },
        { id: 'leave', label: 'Leave', sortable: false },
        { id: 'leaveId', label: 'Leave ID', labelHtml: 'Leave<br>ID', sortable: false },
        { id: 'applied', label: 'Applied Days', labelHtml: 'Applied<br>Days', sortable: false },
        { id: 'posted', label: 'Posted Days', labelHtml: 'Posted<br>Days', sortable: false },
        { id: 'appDate', label: 'Application Date', labelHtml: 'Application<br>Date', sortable: false },
        { id: 'proof', label: 'Proof', sortable: false },
        { id: 'remarks', label: 'Remarks', sortable: false },
        { id: 'status', label: 'Status', sortable: false },
        { id: 'action', label: 'Action', sortable: false, defaultHidden: true }
      ],
      filters: ['Date Range', 'Leave Type', 'Leave Status'],
      tools: ['columns', 'filter', 'add']
    },
    compoff: {
      pageSize: '10',
      showPageSize: true,
      columns: [
        { id: 'sno', label: 'S No.', labelHtml: 'S<br>No.', sortable: false },
        { id: 'from', label: 'From', sortable: true },
        { id: 'to', label: 'To', sortable: true },
        { id: 'id', label: 'CompOff ID', sortable: false },
        { id: 'posted', label: 'Posted Days', sortable: false },
        { id: 'appDate', label: 'Application Date', sortable: true },
        { id: 'remarks', label: 'Remarks', sortable: false },
        { id: 'status', label: 'Status', sortable: false },
        { id: 'action', label: 'Action', sortable: false }
      ],
      filters: ['Date Range', 'Leave Status'],
      tools: ['columns', 'filter', 'add']
    },
    onduty: {
      pageSize: '10',
      showPageSize: false,
      columns: [
        { id: 'sno', label: '#', sortable: false },
        { id: 'from', label: 'From', sortable: true },
        { id: 'to', label: 'To', sortable: true },
        { id: 'odId', label: 'OD ID', sortable: false },
        { id: 'posted', label: 'Posted Days', sortable: false },
        { id: 'appDate', label: 'Application Date', sortable: true },
        { id: 'remarks', label: 'Remarks', sortable: false },
        { id: 'status', label: 'Status', sortable: false },
        { id: 'action', label: 'Action', sortable: false }
      ],
      filters: ['Date Range', 'Leave Status'],
      tools: ['columns', 'filter', 'add']
    },
    holiday: {
      pageSize: '20',
      showPageSize: true,
      holidayType: 'weekly',
      columns: [
        { id: 'sno', label: '#', sortable: false },
        { id: 'name', label: 'Holiday Name', sortable: false },
        { id: 'from', label: 'From Date', sortable: true },
        { id: 'to', label: 'To Date', sortable: true },
        { id: 'optional', label: 'Optional', sortable: false },
        { id: 'type', label: 'Holiday Type', sortable: false },
        { id: 'desc', label: 'Description', sortable: false }
      ],
      filters: [],
      tools: ['holidayPills', 'columns']
    },
    available: {
      pageSize: '20',
      showPageSize: true,
      columns: [
        { id: 'sno', label: '#', sortable: false },
        { id: 'name', label: 'Leave Name', sortable: false },
        { id: 'abbr', label: 'Leave Abbreviation', sortable: false },
        { id: 'count', label: 'Leave Count', sortable: false }
      ],
      filters: [],
      tools: []
    },
    log: {
      pageSize: '10',
      showPageSize: false,
      columns: [
        { id: 'sno', label: 'S. No.', sortable: false },
        { id: 'employee', label: 'Employee Name', sortable: false },
        { id: 'date', label: 'Date', sortable: false },
        { id: 'leaveType', label: 'Leave Type', sortable: false },
        { id: 'count', label: 'Count', sortable: false },
        { id: 'type', label: 'Type', sortable: false },
        { id: 'remark', label: 'Remark', sortable: false }
      ],
      filters: ['Leave Type', 'Type'],
      tools: ['dateRange', 'filter']
    }
  };

  var state = {
    tab: 'view',
    visible: {},
    rangeStart: null,
    rangeEnd: null,
    filterRangeStart: null,
    filterRangeEnd: null,
    rangeSource: null,
    calCursor: null,
    pickingEnd: false
  };

  var els = {
    tabs: Array.prototype.slice.call(document.querySelectorAll('.ml-tab')),
    toolbarLeft: document.getElementById('mlToolbarLeft'),
    toolbarActions: document.getElementById('mlToolbarActions'),
    head: document.getElementById('mlTableHead'),
    body: document.getElementById('mlTableBody'),
    empty: document.getElementById('mlEmpty'),
    pageSize: document.getElementById('mlPageSize'),
    pageSizeWrap: document.getElementById('mlPageSizeWrap'),
    count: document.getElementById('mlCount'),
    pageTotal: document.getElementById('mlPageTotal'),
    columnsPop: document.getElementById('mlColumnsPop'),
    columnsList: document.getElementById('mlColumnsList'),
    selectAll: document.getElementById('mlSelectAllCols'),
    filterPop: document.getElementById('mlFilterPop'),
    filterList: document.getElementById('mlFilterList'),
    filterReset: document.getElementById('mlFilterReset'),
    rangePop: document.getElementById('mlRangePop'),
    rangeCals: document.getElementById('mlRangeCals'),
    applyModal: document.getElementById('mlApplyModal'),
    applyForm: document.getElementById('mlApplyForm'),
    fromDate: document.getElementById('mlFromDate'),
    toDate: document.getElementById('mlToDate'),
    daysCount: document.getElementById('mlDaysCount')
  };

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
    setTimeout(function () { el.remove(); }, 3200);
  }

  function closePops() {
    [els.columnsPop, els.filterPop, els.rangePop].forEach(function (p) {
      if (p) p.hidden = true;
    });
    document.querySelectorAll('.ml-icon-btn.is-active, .ml-range-trigger.is-open').forEach(function (b) {
      b.classList.remove('is-active', 'is-open');
    });
    state.rangeSource = null;
  }

  function syncRangeLabels() {
    var startLabel = state.rangeStart ? formatDate(state.rangeStart) : 'Start date';
    var endLabel = state.rangeEnd ? formatDate(state.rangeEnd) : 'End date';
    var text = startLabel + ' &nbsp;→&nbsp; ' + endLabel;
    var logTrigger = document.getElementById('mlRangeTrigger');
    if (logTrigger) {
      var t = logTrigger.querySelector('.ml-range-trigger__text');
      if (t) t.innerHTML = text;
    }
    var filterBtn = document.getElementById('mlFilterRangeBtn');
    if (filterBtn) {
      var ft = filterBtn.querySelector('.ml-filter-range__text');
      if (ft) ft.innerHTML = text;
      if (state.rangeSource === 'filter') {
        state.filterRangeStart = state.rangeStart;
        state.filterRangeEnd = state.rangeEnd;
      }
    }
  }

  function placePop(pop, anchor, opts) {
    if (!pop || !anchor) return;
    opts = opts || {};
    pop.hidden = false;
    var r = anchor.getBoundingClientRect();
    var width = pop.offsetWidth || 260;
    var height = pop.offsetHeight || 320;
    var left = Math.min(window.innerWidth - width - 12, Math.max(12, r.right - width));
    var top = r.bottom + (opts.gap != null ? opts.gap : 10);
    if (!opts.forceBelow && top + height > window.innerHeight - 12) {
      top = Math.max(12, r.top - height - 8);
    }
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
    var caret = pop.querySelector('.ml-pop__caret');
    if (caret) {
      var caretLeft = r.left + r.width / 2 - left - 6;
      caret.style.left = Math.max(14, Math.min(width - 20, caretLeft)) + 'px';
      caret.style.right = 'auto';
    }
  }

  function placeColumnsPop(anchor) {
    placePop(els.columnsPop, anchor, { forceBelow: true, gap: 8 });
  }

  function placeRangePop(anchor) {
    if (!els.rangePop || !anchor) return;
    els.rangePop.hidden = false;
    var r = anchor.getBoundingClientRect();
    var width = els.rangePop.offsetWidth || 552;
    var height = els.rangePop.offsetHeight || 320;
    var left = Math.min(window.innerWidth - width - 12, Math.max(12, r.right - width));
    var top = r.bottom + 6;
    if (top + height > window.innerHeight - 12) top = Math.max(12, r.top - height - 6);
    els.rangePop.style.left = left + 'px';
    els.rangePop.style.top = top + 'px';
  }

  function initVisible(tabId) {
    var cols = TABS[tabId].columns;
    state.visible[tabId] = cols.filter(function (c) { return !c.defaultHidden; }).map(function (c) { return c.id; });
  }

  function renderHead() {
    var cfg = TABS[state.tab];
    var visible = state.visible[state.tab] || [];
    var table = document.getElementById('mlTable');
    if (table) table.setAttribute('data-tab', state.tab);
    els.head.innerHTML = cfg.columns.map(function (col) {
      var hidden = visible.indexOf(col.id) === -1 ? ' hidden' : '';
      var sortClass = col.sortable ? ' class="is-sortable"' : '';
      var label = col.labelHtml || col.label;
      var mark = col.sortable ? '<span class="ml-sort" aria-hidden="true"><i></i><i></i></span>' : '';
      return '<th scope="col" data-col="' + col.id + '"' + sortClass + hidden + '><span class="ml-th-label">' + label + '</span>' + mark + '</th>';
    }).join('');
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function statusClass(status) {
    var s = String(status || '').toLowerCase();
    if (s === 'approved') return 'is-approved';
    if (s === 'rejected') return 'is-rejected';
    if (s === 'pending') return 'is-pending';
    if (s === 'cancelled') return 'is-cancelled';
    return '';
  }

  function cellFor(colId, row, index) {
    if (colId === 'sno') return String(index + 1);
    if (colId === 'status') return '<span class="ml-status ' + statusClass(row.status) + '">' + esc(row.status) + '</span>';
    if (colId === 'action') {
      if (row.action) return esc(row.action);
      return '<span class="ml-row-view">View</span>';
    }
    return esc(row[colId] != null ? row[colId] : '--');
  }

  function rowsForTab() {
    var rows = DUMMY[state.tab] || [];
    if (state.tab === 'holiday') {
      var kind = TABS.holiday.holidayType || 'weekly';
      rows = rows.filter(function (r) { return r.holidayKind === kind; });
    }
    return rows;
  }

  function renderBody() {
    if (!els.body) return;
    var cfg = TABS[state.tab];
    var visible = state.visible[state.tab] || [];
    var allRows = rowsForTab();
    var pageSize = Number((els.pageSize && els.pageSize.value) || cfg.pageSize || 10) || 10;
    var page = Number((document.getElementById('mlPageInput') || {}).value) || 1;
    var totalPages = Math.max(1, Math.ceil(allRows.length / pageSize) || 1);
    if (page > totalPages) page = totalPages;
    var start = (page - 1) * pageSize;
    var rows = allRows.slice(start, start + pageSize);

    if (!allRows.length) {
      els.body.innerHTML = '';
      if (els.empty) els.empty.hidden = false;
      if (els.count) els.count.textContent = '0 / 0';
      if (els.pageTotal) els.pageTotal.textContent = '1';
      var pageInput = document.getElementById('mlPageInput');
      if (pageInput) pageInput.value = '1';
      return;
    }
    if (els.empty) els.empty.hidden = true;
    els.body.innerHTML = rows.map(function (row, i) {
      return '<tr>' + cfg.columns.map(function (col) {
        var hidden = visible.indexOf(col.id) === -1 ? ' hidden' : '';
        return '<td data-col="' + col.id + '"' + hidden + '>' + cellFor(col.id, row, start + i) + '</td>';
      }).join('') + '</tr>';
    }).join('');
    if (els.count) els.count.textContent = rows.length + ' / ' + allRows.length;
    if (els.pageTotal) els.pageTotal.textContent = String(totalPages);
    var pageInputEl = document.getElementById('mlPageInput');
    if (pageInputEl) pageInputEl.value = String(page);
  }

  function renderColumnsPop() {
    var cfg = TABS[state.tab];
    var visible = state.visible[state.tab] || [];
    els.columnsList.innerHTML = cfg.columns.map(function (col) {
      var checked = visible.indexOf(col.id) !== -1 ? ' checked' : '';
      return '<li class="ml-pop__item" data-col-id="' + col.id + '" title="' + col.label + '">' +
        '<span class="ml-pop__drag" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></span>' +
        '<span class="ml-pop__check">' +
          '<input type="checkbox" id="col-' + col.id + '" data-col="' + col.id + '"' + checked + '>' +
          '<span class="ml-pop__check-ui" aria-hidden="true"></span>' +
        '</span>' +
        '<label for="col-' + col.id + '">' + col.label + '</label>' +
        '<span class="ml-pop__tip">' + col.label + '</span>' +
      '</li>';
    }).join('');
  }

  function renderFilterPop() {
    var filters = TABS[state.tab].filters || [];
    if (!filters.length) { els.filterList.innerHTML = ''; return; }
    var isView = state.tab === 'view';

    els.filterList.innerHTML = '<div class="ml-filter-box">' + filters.map(function (name, i) {
      var openByDefault = isView ? name === 'Date Range' : true;
      var openClass = openByDefault ? ' is-open' : '';
      var body = '';

      if (name === 'Date Range') {
        var startLabel = state.filterRangeStart ? formatDate(state.filterRangeStart) : 'Start date';
        var endLabel = state.filterRangeEnd ? formatDate(state.filterRangeEnd) : 'End date';
        body = '<div class="ml-filter-item__body' + openClass + '" data-body="' + i + '">' +
          '<button type="button" class="ml-filter-range" id="mlFilterRangeBtn">' +
          '<span class="ml-filter-range__text">' + startLabel + ' &nbsp;→&nbsp; ' + endLabel + '</span>' +
          CAL_ICON + '</button></div>';
      } else if (name === 'Leave Type') {
        body = '<div class="ml-filter-item__body' + openClass + '" data-body="' + i + '">' +
          '<div class="ml-filter-select"><select aria-label="Leave Type">' +
          '<option value="" disabled selected hidden>Leave</option>' +
          LEAVE_OPTIONS.map(function (opt) { return '<option value="' + opt + '">' + opt + '</option>'; }).join('') +
          '</select></div></div>';
      } else if (name === 'Leave Status') {
        body = '<div class="ml-filter-item__body' + openClass + '" data-body="' + i + '">' +
          '<div class="ml-filter-search" data-search="status">' +
          '<input type="text" placeholder="Approved/Rejected/Cancelled" autocomplete="off" aria-label="Leave Status">' +
          '<span class="ml-filter-search__icon">' + SEARCH_ICON + '</span>' +
          '<div class="ml-filter-options" hidden>' +
          STATUS_OPTIONS.map(function (opt) {
            return '<button type="button" class="ml-filter-option" data-value="' + opt + '">' + opt + '</button>';
          }).join('') +
          '</div></div></div>';
      } else if (name === 'Type' && state.tab === 'log') {
        body = '<div class="ml-filter-item__body' + openClass + '" data-body="' + i + '">' +
          '<div class="ml-filter-search" data-search="type">' +
          '<input type="text" placeholder="Type" autocomplete="off" aria-label="Type">' +
          '<span class="ml-filter-search__icon">' + SEARCH_ICON + '</span>' +
          '<div class="ml-filter-options" hidden>' +
          TYPE_OPTIONS.map(function (opt) {
            return '<button type="button" class="ml-filter-option" data-value="' + opt + '">' + opt + '</button>';
          }).join('') +
          '</div></div></div>';
      } else if (name === 'Type') {
        body = '<div class="ml-filter-item__body' + openClass + '" data-body="' + i + '">' +
          '<div class="ml-filter-select"><select aria-label="Type">' +
          '<option value="" disabled selected hidden>Type</option>' +
          TYPE_OPTIONS.map(function (opt) { return '<option value="' + opt + '">' + opt + '</option>'; }).join('') +
          '</select></div></div>';
      } else {
        body = '<div class="ml-filter-item__body' + openClass + '" data-body="' + i + '"><div class="ml-filter-select"><select><option value="">All</option></select></div></div>';
      }

      return '<div class="ml-filter-section' + (openByDefault ? ' is-open' : '') + '">' +
        '<button type="button" class="ml-filter-item' + openClass + '" data-filter="' + i + '">' +
        CHEVRON + '<span>' + name + '</span></button>' + body + '</div>';
    }).join('') + '</div>';

    var rangeBtn = document.getElementById('mlFilterRangeBtn');
    if (rangeBtn) {
      rangeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !els.rangePop.hidden && state.rangeSource === 'filter';
        if (open) {
          els.rangePop.hidden = true;
          state.rangeSource = null;
          return;
        }
        state.rangeSource = 'filter';
        state.calCursor = state.calCursor || new Date();
        /* sync filter range into shared picker state */
        state.rangeStart = state.filterRangeStart || null;
        state.rangeEnd = state.filterRangeEnd || null;
        renderRangeCals();
        placeRangePop(rangeBtn);
      });
    }
  }

  function renderToolbar() {
    var cfg = TABS[state.tab];
    var tools = cfg.tools || [];
    els.toolbarLeft.innerHTML = '';
    els.toolbarActions.innerHTML = '';

    if (tools.indexOf('holidayPills') !== -1) {
      ['weekly', 'national', 'religious'].forEach(function (type) {
        var label = type === 'weekly' ? 'Weekly Holiday' : type === 'national' ? 'National Holiday' : 'Religious Holiday';
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ml-pill' + (cfg.holidayType === type ? ' is-active' : '');
        btn.textContent = label;
        btn.addEventListener('click', function () {
          cfg.holidayType = type;
          var pageInput = document.getElementById('mlPageInput');
          if (pageInput) pageInput.value = '1';
          renderToolbar();
          renderBody();
        });
        els.toolbarActions.appendChild(btn);
      });
    }

    if (tools.indexOf('dateRange') !== -1) {
      var trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'ml-range-trigger';
      trigger.id = 'mlRangeTrigger';
      var startLabel = state.rangeStart ? formatDate(state.rangeStart) : 'Start date';
      var endLabel = state.rangeEnd ? formatDate(state.rangeEnd) : 'End date';
      trigger.innerHTML = '<span class="ml-range-trigger__text">' + startLabel + ' &nbsp;→&nbsp; ' + endLabel + '</span>' + CAL_ICON;
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !els.rangePop.hidden && state.rangeSource === 'log';
        closePops();
        if (open) return;
        state.rangeSource = 'log';
        if (!state.calCursor) state.calCursor = new Date();
        renderRangeCals();
        trigger.classList.add('is-open');
        placeRangePop(trigger);
      });
      els.toolbarActions.appendChild(trigger);
    }

    if (tools.indexOf('columns') !== -1) {
      var colBtn = document.createElement('button');
      colBtn.type = 'button';
      colBtn.className = 'ml-icon-btn';
      colBtn.id = 'mlColumnsBtn';
      colBtn.title = 'Columns';
      colBtn.setAttribute('aria-label', 'Columns');
      colBtn.innerHTML = COL_ICON;
      colBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !els.columnsPop.hidden;
        closePops();
        if (open) return;
        renderColumnsPop();
        colBtn.classList.add('is-active');
        placeColumnsPop(colBtn);
      });
      els.toolbarActions.appendChild(colBtn);
    }

    if (tools.indexOf('filter') !== -1) {
      var filterBtn = document.createElement('button');
      filterBtn.type = 'button';
      filterBtn.className = 'ml-icon-btn';
      filterBtn.id = 'mlFilterBtn';
      filterBtn.title = 'Filter';
      filterBtn.setAttribute('aria-label', 'Filter');
      filterBtn.innerHTML = FILTER_ICON;
      filterBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !els.filterPop.hidden;
        closePops();
        if (open) return;
        renderFilterPop();
        filterBtn.classList.add('is-active');
        placePop(els.filterPop, filterBtn);
      });
      els.toolbarActions.appendChild(filterBtn);
    }

    if (tools.indexOf('add') !== -1) {
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.className = 'ml-icon-btn ml-icon-btn--primary';
      addBtn.id = 'mlAddBtn';
      addBtn.title = state.tab === 'onduty' ? 'Add On Duty' : state.tab === 'compoff' ? 'Add CompOff' : 'Apply Leave';
      addBtn.setAttribute('aria-label', addBtn.title);
      addBtn.innerHTML = PLUS_ICON;
      addBtn.addEventListener('click', function () {
        closePops();
        if (state.tab === 'view') openApplyModal();
        else if (state.tab === 'compoff') openCompOffModal();
        else if (state.tab === 'onduty') openOnDutyModal();
        else toast(addBtn.title, 'Form coming soon.');
      });
      els.toolbarActions.appendChild(addBtn);
    }

    els.pageSizeWrap.hidden = !cfg.showPageSize;
    if (cfg.pageSize) els.pageSize.value = cfg.pageSize;
  }

  function activateTab(id) {
    if (!TABS[id]) return;
    state.tab = id;
    closePops();
    if (!state.visible[id]) initVisible(id);
    els.tabs.forEach(function (tab) {
      var on = tab.getAttribute('data-tab') === id;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderHead();
    renderToolbar();
    renderBody();
  }

  function openApplyModal() {
    els.applyModal.hidden = false;
    document.getElementById('mlLeaveType').focus();
    updateDays();
  }
  function closeApplyModal() {
    els.applyModal.hidden = true;
    els.applyForm.reset();
    updateDays();
  }

  function daysBetween(a, b) {
    if (!a || !b) return 0;
    var start = new Date(a);
    var end = new Date(b);
    if (isNaN(start) || isNaN(end) || end < start) return 0;
    return Math.floor((end - start) / 86400000) + 1;
  }

  function updateDays() {
    var n = daysBetween(els.fromDate.value, els.toDate.value);
    els.daysCount.textContent = 'No. of Days : ' + n;
  }

  function formatDate(d) {
    var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return d.getDate() + ' ' + m[d.getMonth()] + ' ' + d.getFullYear();
  }

  function sameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function inRange(d, start, end) {
    if (!start || !end) return false;
    var t = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    var a = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    var b = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    return t >= a && t <= b;
  }

  function renderMonth(year, month) {
    var first = new Date(year, month, 1);
    var startDay = first.getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var prevDays = new Date(year, month, 0).getDate();
    var html = '<div class="ml-cal"><div class="ml-cal__grid">';
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function (d) {
      html += '<div class="ml-cal__dow">' + d + '</div>';
    });
    var cells = [];
    for (var i = 0; i < startDay; i++) {
      cells.push({ day: prevDays - startDay + i + 1, muted: true, date: new Date(year, month - 1, prevDays - startDay + i + 1) });
    }
    for (var d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, muted: false, date: new Date(year, month, d) });
    }
    var nextDay = 1;
    while (cells.length < 42) {
      cells.push({ day: nextDay, muted: true, date: new Date(year, month + 1, nextDay) });
      nextDay += 1;
    }
    cells.forEach(function (cell) {
      var cls = 'ml-cal__day';
      if (cell.muted) cls += ' is-muted';
      var isStart = sameDay(cell.date, state.rangeStart);
      var isEnd = sameDay(cell.date, state.rangeEnd);
      if (isStart || isEnd) cls += ' is-selected';
      if (isStart) cls += ' is-range-start';
      if (isEnd) cls += ' is-range-end';
      if (state.rangeStart && state.rangeEnd && inRange(new Date(cell.date), new Date(state.rangeStart), new Date(state.rangeEnd)) && !isStart && !isEnd) cls += ' is-in-range';
      html += '<button type="button" class="' + cls + '" data-y="' + cell.date.getFullYear() + '" data-m="' + cell.date.getMonth() + '" data-d="' + cell.date.getDate() + '">' + cell.day + '</button>';
    });
    html += '</div></div>';
    return html;
  }

  function renderRangeCals() {
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var cursor = state.calCursor || new Date();
    var y = cursor.getFullYear();
    var m = cursor.getMonth();
    var next = m === 11 ? { y: y + 1, m: 0 } : { y: y, m: m + 1 };
    var titleLeft = document.getElementById('mlCalTitleLeft');
    var titleRight = document.getElementById('mlCalTitleRight');
    if (titleLeft) titleLeft.textContent = monthNames[m] + ' ' + y;
    if (titleRight) titleRight.textContent = monthNames[next.m] + ' ' + next.y;
    els.rangeCals.innerHTML = renderMonth(y, m) + renderMonth(next.y, next.m);
  }

  /* Events */
  els.tabs.forEach(function (tab) {
    tab.addEventListener('click', function () { activateTab(tab.getAttribute('data-tab')); });
  });

  els.columnsList.addEventListener('change', function (e) {
    var input = e.target.closest('input[data-col]');
    if (!input) return;
    var id = input.getAttribute('data-col');
    var list = state.visible[state.tab].slice();
    var idx = list.indexOf(id);
    if (input.checked && idx === -1) list.push(id);
    if (!input.checked && idx !== -1) {
      if (list.length === 1) { input.checked = true; return; }
      list.splice(idx, 1);
    }
    state.visible[state.tab] = list;
    renderHead();
    renderBody();
  });

  els.selectAll.addEventListener('click', function () {
    state.visible[state.tab] = TABS[state.tab].columns.map(function (c) { return c.id; });
    renderColumnsPop();
    renderHead();
    renderBody();
  });

  els.filterList.addEventListener('change', function (e) {
    if (e.target.tagName === 'SELECT') {
      e.target.classList.toggle('has-value', !!e.target.value);
    }
  });

  els.filterList.addEventListener('click', function (e) {
    if (e.target.closest('.ml-filter-range')) return;

    var option = e.target.closest('.ml-filter-option');
    if (option) {
      var search = option.closest('.ml-filter-search');
      var input = search && search.querySelector('input');
      if (input) input.value = option.getAttribute('data-value');
      search.querySelectorAll('.ml-filter-option').forEach(function (o) { o.classList.remove('is-active'); });
      option.classList.add('is-active');
      var opts = search.querySelector('.ml-filter-options');
      if (opts) opts.hidden = true;
      return;
    }

    var btn = e.target.closest('.ml-filter-item');
    if (!btn) return;
    var i = btn.getAttribute('data-filter');
    var body = els.filterList.querySelector('[data-body="' + i + '"]');
    var section = btn.closest('.ml-filter-section');
    if (!body) return;
    var open = body.classList.contains('is-open');
    body.classList.toggle('is-open', !open);
    btn.classList.toggle('is-open', !open);
    if (section) section.classList.toggle('is-open', !open);
  });

  els.filterList.addEventListener('focusin', function (e) {
    var search = e.target.closest('.ml-filter-search');
    if (!search) return;
    var opts = search.querySelector('.ml-filter-options');
    if (opts) opts.hidden = false;
  });

  els.filterList.addEventListener('input', function (e) {
    var search = e.target.closest('.ml-filter-search');
    if (!search || e.target.tagName !== 'INPUT') return;
    var q = (e.target.value || '').trim().toLowerCase();
    var opts = search.querySelector('.ml-filter-options');
    if (!opts) return;
    opts.hidden = false;
    opts.querySelectorAll('.ml-filter-option').forEach(function (o) {
      var val = (o.getAttribute('data-value') || '').toLowerCase();
      o.hidden = q ? val.indexOf(q) === -1 : false;
    });
  });

  els.filterReset.addEventListener('click', function () {
    state.filterRangeStart = null;
    state.filterRangeEnd = null;
    if (state.rangeSource === 'filter') {
      state.rangeStart = null;
      state.rangeEnd = null;
      els.rangePop.hidden = true;
      state.rangeSource = null;
    }
    els.filterList.querySelectorAll('select').forEach(function (el) {
      el.selectedIndex = 0;
      el.classList.remove('has-value');
    });
    els.filterList.querySelectorAll('input').forEach(function (el) { el.value = ''; });
    els.filterList.querySelectorAll('.ml-filter-options').forEach(function (el) { el.hidden = true; });
    els.filterList.querySelectorAll('.ml-filter-option').forEach(function (el) {
      el.hidden = false;
      el.classList.remove('is-active');
    });
    var filterBtn = document.getElementById('mlFilterRangeBtn');
    if (filterBtn) {
      var ft = filterBtn.querySelector('.ml-filter-range__text');
      if (ft) ft.innerHTML = 'Start date &nbsp;→&nbsp; End date';
    }
    toast('Filter', 'Filters reset.');
  });

  els.rangePop.addEventListener('click', function (e) {
    var nav = e.target.closest('[data-nav]');
    if (nav) {
      e.stopPropagation();
      var cur = state.calCursor || new Date();
      var type = nav.getAttribute('data-nav');
      if (type === 'prev-month') cur.setMonth(cur.getMonth() - 1);
      if (type === 'next-month') cur.setMonth(cur.getMonth() + 1);
      if (type === 'prev-year') cur.setFullYear(cur.getFullYear() - 1);
      if (type === 'next-year') cur.setFullYear(cur.getFullYear() + 1);
      state.calCursor = cur;
      renderRangeCals();
      return;
    }
    var day = e.target.closest('.ml-cal__day');
    if (!day) return;
    e.stopPropagation();
    var picked = new Date(+day.getAttribute('data-y'), +day.getAttribute('data-m'), +day.getAttribute('data-d'));
    if (!state.rangeStart || (state.rangeStart && state.rangeEnd)) {
      state.rangeStart = picked;
      state.rangeEnd = null;
      state.pickingEnd = true;
    } else {
      if (picked < state.rangeStart) {
        state.rangeEnd = state.rangeStart;
        state.rangeStart = picked;
      } else state.rangeEnd = picked;
      state.pickingEnd = false;
    }
    renderRangeCals();
    syncRangeLabels();
    var anchor = state.rangeSource === 'filter'
      ? document.getElementById('mlFilterRangeBtn')
      : document.getElementById('mlRangeTrigger');
    if (anchor) {
      if (state.rangeSource === 'log') anchor.classList.add('is-open');
      placeRangePop(anchor);
      if (state.rangeStart && state.rangeEnd && state.rangeSource === 'log') {
        setTimeout(function () { closePops(); }, 180);
      }
    }
  });

  document.getElementById('mlApplyClose').addEventListener('click', closeApplyModal);
  document.getElementById('mlApplyCancel').addEventListener('click', closeApplyModal);
  els.applyModal.addEventListener('click', function (e) {
    if (e.target === els.applyModal) closeApplyModal();
  });
  els.fromDate.addEventListener('change', updateDays);
  els.toDate.addEventListener('change', updateDays);
  els.applyForm.addEventListener('submit', function () {
    if (!els.fromDate.value || !els.toDate.value || !document.getElementById('mlLeaveType').value || !document.getElementById('mlReason').value.trim()) {
      toast('Apply Leave', 'Please fill all required fields.');
      return;
    }
    toast('Leave applied', 'Your leave request was submitted.');
    closeApplyModal();
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.ml-pop, .ml-range-pop, #mlToolbarActions, .ml-range-trigger, .ml-filter-range, .ml-single-cal, .ml-co-date, .ml-co-search-select')) return;
    closePops();
    closeSingleCal();
    document.querySelectorAll('.ml-co-half-options').forEach(function (el) { el.hidden = true; });
    document.querySelectorAll('.ml-co-search-select.is-open, .ml-co-date.is-open').forEach(function (el) {
      el.classList.remove('is-open');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!document.getElementById('mlOnDutyModal').hidden) closeOnDutyModal();
      else if (!document.getElementById('mlCompOffModal').hidden) closeCompOffModal();
      else if (!els.applyModal.hidden) closeApplyModal();
      else {
        closeSingleCal();
        closePops();
      }
    }
  });

  /* -------- Add Comp Off -------- */
  var coModal = document.getElementById('mlCompOffModal');
  var coForm = document.getElementById('mlCompOffForm');
  var calState = {
    source: null,
    field: null,
    cursor: new Date(),
    coFrom: null,
    coTo: null,
    odFrom: null,
    odTo: null
  };
  var singleCal = document.getElementById('mlSingleCal');
  var singleCalGrid = document.getElementById('mlSingleCalGrid');

  function openCompOffModal() {
    closePops();
    coModal.hidden = false;
    coForm.reset();
    document.getElementById('coExtraHours').value = '';
    document.getElementById('coDayType').value = '';
    document.getElementById('coFromHalf').value = '';
    document.getElementById('coReasonCount').textContent = '0';
    setDateText('co', 'from', null);
    setDateText('co', 'to', null);
    calState.coFrom = null;
    calState.coTo = null;
  }

  function closeCompOffModal() {
    coModal.hidden = true;
    closeSingleCal();
    document.querySelectorAll('.ml-co-half-options').forEach(function (el) { el.hidden = true; });
  }

  function setDateText(source, field, date) {
    var map = {
      co: { from: 'coFromDateText', to: 'coToDateText', placeholder: 'Select date' },
      od: {
        from: 'odFromDateText',
        to: 'odToDateText',
        placeholderFrom: 'Select From date',
        placeholderTo: 'Select to date'
      }
    };
    var cfg = map[source];
    var el = document.getElementById(cfg[field]);
    if (!el) return;
    if (!date) {
      el.textContent = field === 'from' ? (cfg.placeholderFrom || cfg.placeholder) : (cfg.placeholderTo || cfg.placeholder);
      el.classList.add('is-placeholder');
      return;
    }
    el.textContent = formatDate(date);
    el.classList.remove('is-placeholder');
  }

  function closeSingleCal() {
    if (singleCal) singleCal.hidden = true;
    document.querySelectorAll('.ml-co-date.is-open').forEach(function (el) { el.classList.remove('is-open'); });
    calState.field = null;
    calState.source = null;
  }

  function getSelectedCalDate() {
    if (calState.source === 'co') return calState.field === 'from' ? calState.coFrom : calState.coTo;
    if (calState.source === 'od') return calState.field === 'from' ? calState.odFrom : calState.odTo;
    return null;
  }

  function renderSingleCal() {
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var cursor = calState.cursor || new Date();
    var y = cursor.getFullYear();
    var m = cursor.getMonth();
    document.getElementById('mlSingleCalTitle').textContent = monthNames[m] + ' ' + y;
    var first = new Date(y, m, 1);
    var startDay = first.getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var prevDays = new Date(y, m, 0).getDate();
    var selected = getSelectedCalDate();
    var html = '';
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function (d) {
      html += '<div class="ml-single-cal__dow">' + d + '</div>';
    });
    var cells = [];
    for (var i = 0; i < startDay; i++) {
      cells.push({ day: prevDays - startDay + i + 1, muted: true, date: new Date(y, m - 1, prevDays - startDay + i + 1) });
    }
    for (var d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, muted: false, date: new Date(y, m, d) });
    }
    var n = 1;
    while (cells.length < 42) {
      cells.push({ day: n, muted: true, date: new Date(y, m + 1, n) });
      n += 1;
    }
    cells.forEach(function (cell) {
      var cls = 'ml-single-cal__day';
      if (cell.muted) cls += ' is-muted';
      if (sameDay(cell.date, selected)) cls += ' is-selected';
      html += '<button type="button" class="' + cls + '" data-y="' + cell.date.getFullYear() + '" data-m="' + cell.date.getMonth() + '" data-d="' + cell.date.getDate() + '">' + cell.day + '</button>';
    });
    singleCalGrid.innerHTML = html;
  }

  function placeSingleCal(anchor) {
    singleCal.hidden = false;
    var r = anchor.getBoundingClientRect();
    var width = singleCal.offsetWidth || 288;
    var left = Math.min(window.innerWidth - width - 12, Math.max(12, r.left));
    var top = r.bottom + 6;
    if (top + 320 > window.innerHeight) top = Math.max(12, r.top - 320);
    singleCal.style.left = left + 'px';
    singleCal.style.top = top + 'px';
  }

  function openDatePicker(source, field, btn) {
    document.querySelectorAll('.ml-co-half-options').forEach(function (el) { el.hidden = true; });
    document.querySelectorAll('.ml-co-search-select.is-open').forEach(function (el) { el.classList.remove('is-open'); });
    var already = calState.source === source && calState.field === field && !singleCal.hidden;
    closeSingleCal();
    if (already) return;
    calState.source = source;
    calState.field = field;
    var current = getSelectedCalDate();
    calState.cursor = current ? new Date(current) : new Date();
    btn.classList.add('is-open');
    renderSingleCal();
    placeSingleCal(btn);
  }

  function enableOdHalf(field, enabled) {
    var wrap = document.getElementById(field === 'from' ? 'odFromHalfField' : 'odToHalfField');
    if (!wrap) return;
    wrap.classList.toggle('is-disabled', !enabled);
    wrap.querySelectorAll('input').forEach(function (input) {
      input.disabled = !enabled;
      if (!enabled) input.checked = false;
    });
  }

  function updateOdDays() {
    var n = 0;
    if (calState.odFrom && calState.odTo) n = daysBetween(
      calState.odFrom.toISOString().slice(0, 10),
      calState.odTo.toISOString().slice(0, 10)
    );
    document.getElementById('odDaysCount').textContent = 'No. of Days : ' + n;
  }

  function openOnDutyModal() {
    closePops();
    document.getElementById('mlOnDutyModal').hidden = false;
    document.getElementById('mlOnDutyForm').reset();
    document.getElementById('odReasonCount').textContent = '0';
    setDateText('od', 'from', null);
    setDateText('od', 'to', null);
    calState.odFrom = null;
    calState.odTo = null;
    enableOdHalf('from', false);
    enableOdHalf('to', false);
    updateOdDays();
  }

  function closeOnDutyModal() {
    document.getElementById('mlOnDutyModal').hidden = true;
    closeSingleCal();
  }

  document.getElementById('mlCompOffClose').addEventListener('click', closeCompOffModal);
  coModal.addEventListener('click', function (e) {
    if (e.target === coModal) closeCompOffModal();
  });

  document.getElementById('coExtraHoursSelect').addEventListener('change', function () {
    var opt = this.options[this.selectedIndex];
    document.getElementById('coExtraHours').value = opt.getAttribute('data-hours') || '';
    document.getElementById('coDayType').value = opt.getAttribute('data-day') || '';
  });

  document.getElementById('coFromDateBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    openDatePicker('co', 'from', this);
  });
  document.getElementById('coToDateBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    openDatePicker('co', 'to', this);
  });

  document.getElementById('odFromDateBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    openDatePicker('od', 'from', this);
  });
  document.getElementById('odToDateBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    openDatePicker('od', 'to', this);
  });

  singleCal.addEventListener('click', function (e) {
    e.stopPropagation();
    var nav = e.target.closest('[data-nav]');
    if (nav) {
      var cur = calState.cursor || new Date();
      var type = nav.getAttribute('data-nav');
      if (type === 'prev-month') cur.setMonth(cur.getMonth() - 1);
      if (type === 'next-month') cur.setMonth(cur.getMonth() + 1);
      if (type === 'prev-year') cur.setFullYear(cur.getFullYear() - 1);
      if (type === 'next-year') cur.setFullYear(cur.getFullYear() + 1);
      calState.cursor = cur;
      renderSingleCal();
      return;
    }
    var day = e.target.closest('.ml-single-cal__day');
    if (!day) return;
    var picked = new Date(+day.getAttribute('data-y'), +day.getAttribute('data-m'), +day.getAttribute('data-d'));
    if (calState.source === 'co') {
      if (calState.field === 'from') calState.coFrom = picked;
      else calState.coTo = picked;
      setDateText('co', calState.field, picked);
    } else if (calState.source === 'od') {
      if (calState.field === 'from') {
        calState.odFrom = picked;
        enableOdHalf('from', true);
      } else {
        calState.odTo = picked;
        enableOdHalf('to', true);
      }
      setDateText('od', calState.field, picked);
      updateOdDays();
    }
    closeSingleCal();
  });

  document.getElementById('mlSingleCalToday').addEventListener('click', function (e) {
    e.stopPropagation();
    var today = new Date();
    if (calState.source === 'co') {
      if (calState.field === 'from') calState.coFrom = today;
      else calState.coTo = today;
      setDateText('co', calState.field, today);
    } else if (calState.source === 'od') {
      if (calState.field === 'from') {
        calState.odFrom = today;
        enableOdHalf('from', true);
      } else {
        calState.odTo = today;
        enableOdHalf('to', true);
      }
      setDateText('od', calState.field, today);
      updateOdDays();
    }
    closeSingleCal();
  });

  document.querySelectorAll('.ml-co-search-select').forEach(function (wrap) {
    var input = wrap.querySelector('input');
    var opts = wrap.querySelector('.ml-co-half-options');
    input.addEventListener('click', function (e) {
      e.stopPropagation();
      closeSingleCal();
      var open = !opts.hidden;
      document.querySelectorAll('.ml-co-half-options').forEach(function (el) { el.hidden = true; });
      document.querySelectorAll('.ml-co-search-select.is-open').forEach(function (el) { el.classList.remove('is-open'); });
      if (open) return;
      opts.hidden = false;
      wrap.classList.add('is-open');
    });
    opts.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-value]');
      if (!btn) return;
      input.value = btn.getAttribute('data-value');
      opts.hidden = true;
      wrap.classList.remove('is-open');
    });
  });

  document.getElementById('coReason').addEventListener('input', function () {
    document.getElementById('coReasonCount').textContent = String(this.value.length);
  });

  coForm.addEventListener('submit', function () {
    var select = document.getElementById('coExtraHoursSelect');
    var fromHalf = document.getElementById('coFromHalf').value;
    var toHalf = document.getElementById('coToHalf').value;
    var reason = document.getElementById('coReason').value.trim();
    if (!select.value || !calState.coFrom || !calState.coTo || !fromHalf || !toHalf || !reason) {
      toast('Add Comp Off', 'Please fill all required fields.');
      return;
    }
    toast('Comp Off saved', 'Your compensatory leave request was submitted.');
    closeCompOffModal();
  });

  document.getElementById('mlOnDutyClose').addEventListener('click', closeOnDutyModal);
  document.getElementById('mlOnDutyCancel').addEventListener('click', closeOnDutyModal);
  document.getElementById('mlOnDutyModal').addEventListener('click', function (e) {
    if (e.target.id === 'mlOnDutyModal') closeOnDutyModal();
  });
  document.getElementById('odReason').addEventListener('input', function () {
    document.getElementById('odReasonCount').textContent = String(this.value.length);
  });
  document.getElementById('mlOnDutyForm').addEventListener('submit', function () {
    var fromHalf = document.querySelector('input[name="odFromHalf"]:checked');
    var toHalf = document.querySelector('input[name="odToHalf"]:checked');
    var reason = document.getElementById('odReason').value.trim();
    if (!calState.odFrom || !calState.odTo || !fromHalf || !toHalf || !reason) {
      toast('Add On Duty', 'Please fill all required fields.');
      return;
    }
    toast('On Duty saved', 'Your on duty request was submitted.');
    closeOnDutyModal();
  });

  Object.keys(TABS).forEach(initVisible);
  if (els.pageSize) {
    els.pageSize.addEventListener('change', function () {
      var pageInput = document.getElementById('mlPageInput');
      if (pageInput) pageInput.value = '1';
      renderBody();
    });
  }
  var prevBtn = document.getElementById('mlPrev');
  var nextBtn = document.getElementById('mlNext');
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      var pageInput = document.getElementById('mlPageInput');
      var page = Number(pageInput && pageInput.value) || 1;
      if (page <= 1) return;
      pageInput.value = String(page - 1);
      renderBody();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      var pageInput = document.getElementById('mlPageInput');
      var page = Number(pageInput && pageInput.value) || 1;
      var total = Number((els.pageTotal && els.pageTotal.textContent) || 1);
      if (page >= total) return;
      pageInput.value = String(page + 1);
      renderBody();
    });
  }
  activateTab('view');
})();
