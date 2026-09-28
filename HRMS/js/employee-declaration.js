/**
 * TIME ERP — Employee Declaration
 * Tabs: Unlock 12BB | Unlock 12B | Approval 12B | Approval 12BB
 */
(function () {
  'use strict';

  var CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
  var COLS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M5 9.33h14M5 14.67h14"/><path d="M8 6.85h5M8 12h5M8 17.15h5"/></svg>';
  var FILTER_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5h16l-6 7v5l-4 2v-7L4 5z"/></svg>';
  var SEARCH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';
  var EMPTY_ICON = '<div class="ed-empty__icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M10 28l6-8h32l6 8"/><path d="M10 28h44v22a4 4 0 01-4 4H14a4 4 0 01-4-4V28z"/><path d="M10 28h14l4 6h12l4-6h14"/></svg></div><p>No data</p>';

  var EMPLOYEES = [
    { code: 'AN2', name: 'Tarun Gaur' },
    { code: 'SA009', name: 'Suhanshi Rawat' },
    { code: 'SB001', name: 'Saurabh Bhardwaj' },
    { code: 'KA001', name: 'Kamal Kant Sharma' },
    { code: 'AS010', name: 'CA Aditi Sharma' },
    { code: 'RK011', name: 'CA ram Kumar' },
    { code: 'RS003', name: 'Riya Sharma' },
    { code: 'DA002', name: 'Dev Aggarwal' },
    { code: 'AV004', name: 'Aman Verma' },
    { code: 'SO6829', name: 'SONIYA KASHYAP' },
    { code: 'HA6413', name: 'Hardik rawat' },
    { code: 'SI6830', name: 'SIMRAN KASHYAP' },
    { code: 'CR012', name: 'CA Ram Sharma' }
  ];

  var FY_OPTIONS = ['FY 27-28', 'FY 26-27', 'FY 25-26', 'FY 24-25', 'FY 23-24', 'FY 22-23', 'FY 21-22', 'FY 20-21'];

  var UNLOCK_COLS = [
    { id: 'no', label: 'S. No.' }, { id: 'employees', label: 'Employees' }, { id: 'fy', label: 'Financial Year' },
    { id: 'start', label: 'Start Date' }, { id: 'end', label: 'End Date' }, { id: 'action', label: 'Action' }
  ];
  var APPROVE_COLS_12B = [
    { id: 'no', label: '#' }, { id: 'employee', label: 'Employee Name' }, { id: 'designation', label: 'Designation' },
    { id: 'filling', label: 'Filling Status' }, { id: 'verification', label: 'Verification Status' },
    { id: 'modifiedBy', label: 'Last Modified by' }, { id: 'modifiedAt', label: 'Last Modified at' },
    { id: 'signed', label: 'Signed Copy' }, { id: 'action', label: 'Action' }
  ];
  var APPROVE_COLS_12BB = [
    { id: 'no', label: '#' }, { id: 'employee', label: 'Employee Name' },
    { id: 'filling', label: 'Filling Status' }, { id: 'verification', label: 'Verification Status' },
    { id: 'modifiedBy', label: 'Last Modified by' }, { id: 'modifiedAt', label: 'Last Modified at' },
    { id: 'signed', label: 'Signed Copy' }, { id: 'action', label: 'Action' }
  ];

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var state = {
    tab: 'unlock12bb',
    page: 1,
    pageSize: 10,
    employee: '',
    empQuery: '',
    empOpen: false,
    fy: 'FY 26-27',
    fyOpen: false,
    columnsOpen: false,
    filterOpen: false,
    checkedIn: false,
    colVisible: {},
    unlockEditId: null,
    modalEmpTags: [],
    empTagOpen: false,
    empTagQuery: '',
    dtOpen: '',
    dtDraft: null,
    dtViewYear: 2025,
    dtViewMonth: 1,
    deleteId: null,
    unlock12bb: [
      { id: 'u1', employees: ['Tarun Gaur', 'CA Aditi Sharma', 'CA ram Kumar', 'Saurabh Bhardwaj'], fy: 'FY 25-26 (AY 26-27)', start: '11/03/2025 02:42 PM', end: '31/03/2026 11:59 PM' },
      { id: 'u2', employees: ['Saurabh Bhardwaj'], fy: 'FY 25-26 (AY 26-27)', start: '12/03/2025 10:15 AM', end: '31/03/2026 11:59 PM' },
      { id: 'u3', employees: ['Kamal Kant Sharma', 'Dev Aggarwal'], fy: 'FY 25-26 (AY 26-27)', start: '15/03/2025 09:30 AM', end: '31/03/2026 11:59 PM' },
      { id: 'u4', employees: ['Riya Sharma', 'Aman Verma', 'SONIYA KASHYAP'], fy: 'FY 24-25 (AY 25-26)', start: '01/04/2024 10:00 AM', end: '31/03/2025 11:59 PM' },
      { id: 'u5', employees: ['Hardik rawat'], fy: 'FY 25-26 (AY 26-27)', start: '18/03/2025 04:20 PM', end: '31/03/2026 11:59 PM' },
      { id: 'u6', employees: ['SIMRAN KASHYAP', 'Tarun Gaur'], fy: 'FY 25-26 (AY 26-27)', start: '20/03/2025 11:05 AM', end: '31/03/2026 11:59 PM' },
      { id: 'u7', employees: ['CA Ram Sharma'], fy: 'FY 25-26 (AY 26-27)', start: '22/03/2025 01:45 PM', end: '31/03/2026 11:59 PM' }
    ],
    unlock12b: [
      { id: 'b1', employees: ['Kamal Kant Sharma', 'Saurabh Bhardwaj', 'Dev Aggarwal'], empTags: ['(KA001) Kamal Kant Sharma', '1', '323', '1900'], fy: 'FY 25-26 (AY 26-27)', start: '18/03/2025 10:37 AM', end: '22/03/2025 10:37 AM' },
      { id: 'b2', employees: ['Tarun Gaur'], empTags: ['(AN2) Tarun Gaur'], fy: 'FY 25-26 (AY 26-27)', start: '19/03/2025 09:12 AM', end: '31/03/2026 11:59 PM' }
    ],
    approve12b: [
      { id: 'a1', employee: 'Saurabh Bhardwaj', designation: 'Manager', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'a2', employee: 'CA Ram Sharma', designation: 'CA', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'a3', employee: 'Dev Aggarwal', designation: 'Executive', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' }
    ],
    approve12bb: [
      { id: 'bb1', employee: 'Tarun Gaur', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'bb2', employee: 'Suhanshi Rawat', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'bb3', employee: 'Saurabh Bhardwaj', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'bb4', employee: 'Kamal Kant Sharma', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'bb5', employee: 'CA Aditi Sharma', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'bb6', employee: 'CA ram Kumar', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'bb7', employee: 'Riya Sharma', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'bb8', employee: 'Dev Aggarwal', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'bb9', employee: 'Aman Verma', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'bb10', employee: 'SONIYA KASHYAP', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'bb11', employee: 'Hardik rawat', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'bb12', employee: 'SIMRAN KASHYAP', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' },
      { id: 'bb13', employee: 'CA Ram Sharma', filling: 'Not Filled', verification: 'Not Verified', modifiedBy: '--', modifiedAt: '--', signed: '--' }
    ]
  };

  UNLOCK_COLS.concat(APPROVE_COLS_12BB).forEach(function (c) { state.colVisible[c.id] = true; });
  APPROVE_COLS_12B.forEach(function (c) { state.colVisible[c.id] = true; });

  var els = {
    dynamic: document.getElementById('edDynamic'),
    tabs: Array.prototype.slice.call(document.querySelectorAll('.ed-tab')),
    topCheckIn: document.getElementById('edTopCheckInBtn'),
    topClock: document.getElementById('edTopClock'),
    modal: document.getElementById('edUnlockModal'),
    title: document.getElementById('edUnlockTitle'),
    form: document.getElementById('edUnlockForm'),
    fySelect: document.getElementById('edUnlockFy'),
    empTags: document.getElementById('edUnlockEmpTags'),
    empWrap: document.getElementById('edUnlockEmpWrap'),
    empInput: document.getElementById('edUnlockEmpInput'),
    empList: document.getElementById('edUnlockEmpList'),
    startInput: document.getElementById('edUnlockStart'),
    endInput: document.getElementById('edUnlockEnd'),
    dtPop: document.getElementById('edDtPop'),
    dtDays: document.getElementById('edDtDays'),
    dtMonthLabel: document.getElementById('edDtMonthLabel'),
    dtTimeHead: document.getElementById('edDtTimeHead'),
    dtHours: document.getElementById('edDtHours'),
    dtMinutes: document.getElementById('edDtMinutes'),
    dtAmPm: document.getElementById('edDtAmPm'),
    delPop: document.getElementById('edDelPop'),
    delNo: document.getElementById('edDelNo'),
    delYes: document.getElementById('edDelYes')
  };

  function toast(title, detail) {
    if (window.DashboardShell && window.DashboardShell.toast) { window.DashboardShell.toast(title, detail); return; }
    var stack = document.getElementById('toastStack');
    if (!stack) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + (detail || '') + '</span>';
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 3200);
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function empLabel(e) { return '(' + e.code + ') ' + e.name; }
  function isUnlock() { return state.tab === 'unlock12bb' || state.tab === 'unlock12b'; }
  function isApprove() { return state.tab === 'approve12b' || state.tab === 'approve12bb'; }

  function rowsForTab() {
    if (state.tab === 'unlock12bb') return state.unlock12bb;
    if (state.tab === 'unlock12b') return state.unlock12b;
    if (state.tab === 'approve12b') return state.approve12b;
    return state.approve12bb;
  }

  function filteredRows() {
    var rows = rowsForTab();
    if (!state.employee) return rows.slice();
    return rows.filter(function (r) {
      if (r.employees) return r.employees.indexOf(state.employee) !== -1;
      return r.employee === state.employee;
    });
  }

  function colsForTab() {
    if (state.tab === 'approve12b') return APPROVE_COLS_12B;
    if (state.tab === 'approve12bb') return APPROVE_COLS_12BB;
    return UNLOCK_COLS;
  }

  function paginationHtml(total) {
    var totalPages = Math.max(1, Math.ceil(total / state.pageSize) || 1);
    if (state.page > totalPages) state.page = totalPages;
    var start = (state.page - 1) * state.pageSize;
    var shown = total ? Math.min(start + state.pageSize, total) : 0;
    return '<footer class="ed-pagination">' +
      '<div class="ed-pagination__left"><select class="ed-page-size" data-ed="pageSize">' +
        [10, 20, 25, 50].map(function (n) {
          return '<option value="' + n + '"' + (state.pageSize === n ? ' selected' : '') + '>' + n + '</option>';
        }).join('') +
      '</select></div>' +
      '<div class="ed-pagination__center">' +
        '<button type="button" class="ed-page-nav" data-ed="prev"' + (state.page <= 1 ? ' disabled' : '') + '><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>' +
        '<input type="text" class="ed-page-input" value="' + state.page + '" readonly>' +
        '<span class="ed-page-of">of ' + totalPages + '</span>' +
        '<button type="button" class="ed-page-nav" data-ed="next"' + (state.page >= totalPages ? ' disabled' : '') + '><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>' +
      '</div>' +
      '<div class="ed-pagination__right"><span class="ed-count">' + shown + ' / ' + total + '</span></div>' +
    '</footer>';
  }

  function empComboHtml() {
    var q = state.empQuery.trim().toLowerCase();
    var items = EMPLOYEES.filter(function (e) {
      if (!q) return true;
      return empLabel(e).toLowerCase().indexOf(q) !== -1 || e.name.toLowerCase().indexOf(q) !== -1;
    });
    var display = state.employee || '';
    return '<div class="ed-combo" data-combo="emp">' +
      '<input type="text" class="ed-combo__input" data-ed="empInput" placeholder="Employee" value="' + escapeHtml(display) + '" autocomplete="off">' +
      '<span class="ed-combo__icon">' + (isApprove() ? SEARCH_ICON : CHEV) + '</span>' +
      '<div class="ed-combo__list" id="edEmpList" ' + (state.empOpen ? '' : 'hidden') + '>' +
        '<button type="button" class="ed-combo__opt" data-ed="pickEmp" data-value="">Clear</button>' +
        items.map(function (e) {
          return '<button type="button" class="ed-combo__opt' + (state.employee === e.name ? ' is-active' : '') + '" data-ed="pickEmp" data-value="' + escapeHtml(e.name) + '">' + escapeHtml(empLabel(e)) + '</button>';
        }).join('') +
      '</div></div>';
  }

  function fyComboHtml() {
    return '<div class="ed-combo ed-combo--fy" data-combo="fy">' +
      '<input type="text" class="ed-combo__input" data-ed="fyInput" value="' + escapeHtml(state.fy) + '" readonly>' +
      '<span class="ed-combo__icon">' + CHEV + '</span>' +
      '<div class="ed-combo__list" id="edFyList" ' + (state.fyOpen ? '' : 'hidden') + '>' +
        FY_OPTIONS.map(function (y) {
          return '<button type="button" class="ed-combo__opt' + (state.fy === y ? ' is-active' : '') + '" data-ed="pickFy" data-value="' + escapeHtml(y) + '">' + escapeHtml(y) + '</button>';
        }).join('') +
      '</div></div>';
  }

  function columnsPop() {
    var cols = colsForTab();
    return '<div class="ed-pop" id="edColsPop" ' + (state.columnsOpen ? '' : 'hidden') + '>' +
      '<div class="ed-pop__head"><span>Columns</span><button type="button" class="ed-pop__reset" data-ed="selectAllCols">Select All</button></div>' +
      '<div class="ed-pop__body">' + cols.map(function (c) {
        return '<label class="ed-pop-item"><input type="checkbox" data-ed="col" data-id="' + c.id + '"' + (state.colVisible[c.id] !== false ? ' checked' : '') + '> ' + escapeHtml(c.label) + '</label>';
      }).join('') + '</div></div>';
  }

  function filterPop() {
    if (isUnlock()) {
      return '<div class="ed-pop ed-pop--wide" id="edFilterPop" ' + (state.filterOpen ? '' : 'hidden') + '>' +
        '<div class="ed-pop__head"><span>Filter</span><button type="button" class="ed-pop__reset" data-ed="resetFilter">Reset</button></div>' +
        '<div class="ed-pop__body"><div class="ed-filter-acc is-open">' +
          '<button type="button" class="ed-filter-acc__btn" data-ed="accToggle">Date Range ' + CHEV + '</button>' +
          '<div class="ed-filter-acc__body"><div class="ed-date-range">' +
            '<input type="date" data-ed="startDate" aria-label="Start date"><span>→</span><input type="date" data-ed="endDate" aria-label="End date">' +
          '</div></div></div></div></div>';
    }
    var groups = [
      { label: 'Filled Status', opts: ['Filled', 'Not Filled'] },
      { label: 'Upload Status', opts: ['Uploaded', 'Not Uploaded'] },
      { label: 'Verification Status', opts: ['Verified', 'Not Verified'] },
      { label: 'Tax Regime', opts: ['Old', 'New'] },
      { label: 'Salary Range', opts: ['0-5L', '5-10L', '10L+'] },
      { label: 'Department', opts: ['HR', 'Finance', 'Operations'] },
      { label: 'Employment Type', opts: ['Permanent', 'Contract'] }
    ];
    return '<div class="ed-pop" id="edFilterPop" ' + (state.filterOpen ? '' : 'hidden') + '>' +
      '<div class="ed-pop__head"><span>Filter</span><button type="button" class="ed-pop__reset" data-ed="resetFilter">Reset</button></div>' +
      '<div class="ed-pop__body">' + groups.map(function (g, i) {
        return '<div class="ed-filter-acc' + (i === 0 ? ' is-open' : '') + '">' +
          '<button type="button" class="ed-filter-acc__btn" data-ed="accToggle">' + escapeHtml(g.label) + ' ' + CHEV + '</button>' +
          '<div class="ed-filter-acc__body">' + g.opts.map(function (o) {
            return '<label><input type="checkbox"> ' + escapeHtml(o) + '</label>';
          }).join('') + '</div></div>';
      }).join('') + '</div></div>';
  }

  function badge(text) {
    var ok = text === 'Filled' || text === 'Verified';
    return '<span class="ed-badge' + (ok ? ' ed-badge--ok' : '') + '">' + escapeHtml(text) + '</span>';
  }

  function unlockActions(id) {
    return '<div class="ed-actions">' +
      '<button type="button" class="ed-action" data-ed="edit" data-id="' + escapeHtml(id) + '">Edit</button>' +
      '<span class="ed-actions__sep">|</span>' +
      '<button type="button" class="ed-action" data-ed="delete" data-id="' + escapeHtml(id) + '">Delete</button>' +
    '</div>';
  }

  function render() {
    var rows = filteredRows();
    var total = rows.length;
    var totalPages = Math.max(1, Math.ceil(total / state.pageSize) || 1);
    if (state.page > totalPages) state.page = totalPages;
    var start = (state.page - 1) * state.pageSize;
    var page = rows.slice(start, start + state.pageSize);
    var cols = colsForTab().filter(function (c) { return state.colVisible[c.id] !== false; });

    var toolbar = '<div class="ed-toolbar">' +
      empComboHtml() +
      (isApprove() ? fyComboHtml() : '') +
      '<div class="ed-wrap"><button type="button" class="ed-btn-icon' + (state.columnsOpen ? ' is-open' : '') + '" data-ed="toggleCols" aria-label="Columns">' + COLS_ICON + '</button>' + columnsPop() + '</div>' +
      '<div class="ed-wrap"><button type="button" class="ed-btn-icon' + (state.filterOpen ? ' is-open' : '') + '" data-ed="toggleFilter" aria-label="Filter" title="Filters">' + FILTER_ICON + '</button>' + filterPop() + '</div>' +
      (isUnlock() ? '<button type="button" class="ed-btn-add" data-ed="add" aria-label="Add">+</button>' : '') +
    '</div>';

    var head = cols.map(function (c) { return '<th>' + escapeHtml(c.label) + '</th>'; }).join('');
    var body = '';

    if (isUnlock()) {
      body = page.map(function (r, i) {
        var cells = {
          no: start + i + 1,
          employees: '<div class="ed-emps">' + escapeHtml(r.employees.join(', ')) + '</div>',
          fy: escapeHtml(r.fy),
          start: escapeHtml(r.start),
          end: escapeHtml(r.end),
          action: unlockActions(r.id)
        };
        return '<tr>' + cols.map(function (c) { return '<td>' + cells[c.id] + '</td>'; }).join('') + '</tr>';
      }).join('');
    } else {
      body = page.map(function (r, i) {
        var cells = {
          no: start + i + 1,
          employee: escapeHtml(r.employee),
          designation: escapeHtml(r.designation || '--'),
          filling: badge(r.filling),
          verification: badge(r.verification),
          modifiedBy: escapeHtml(r.modifiedBy),
          modifiedAt: escapeHtml(r.modifiedAt),
          signed: escapeHtml(r.signed),
          action: '<button type="button" class="ed-link" data-ed="view" data-id="' + escapeHtml(r.id) + '">View Details</button>'
        };
        return '<tr>' + cols.map(function (c) { return '<td>' + (cells[c.id] == null ? '--' : cells[c.id]) + '</td>'; }).join('') + '</tr>';
      }).join('');
    }

    els.dynamic.innerHTML = '<section class="ed-card">' + toolbar +
      '<div class="ed-table-wrap"><table class="ed-table"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table>' +
        '<div class="ed-empty" ' + (page.length ? 'hidden' : '') + '>' + EMPTY_ICON + '</div></div>' +
      paginationHtml(total) +
    '</section>';
  }

  function setTab(tab) {
    state.tab = tab;
    state.page = 1;
    state.employee = '';
    state.empQuery = '';
    state.empOpen = false;
    state.fyOpen = false;
    state.columnsOpen = false;
    state.filterOpen = false;
    els.tabs.forEach(function (btn) {
      var on = btn.getAttribute('data-tab') === tab;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    render();
  }

  function parseUnlockDate(value) {
    if (!value || value === '--') return null;
    var m = String(value).match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (!m) return null;
    var day = parseInt(m[1], 10);
    var mon = parseInt(m[2], 10) - 1;
    var year = parseInt(m[3], 10);
    var hour = parseInt(m[4], 10);
    var minute = parseInt(m[5], 10);
    var ap = (m[6] || '').toUpperCase();
    if (ap === 'PM' && hour < 12) hour += 12;
    if (ap === 'AM' && hour === 12) hour = 0;
    var d = new Date(year, mon, day, hour, minute, 0, 0);
    return isNaN(d.getTime()) ? null : d;
  }

  function formatUnlockInput(d) {
    if (!d || isNaN(d.getTime())) return '';
    var h = d.getHours();
    var ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12; if (!h) h = 12;
    return pad(d.getDate()) + '-' + pad(d.getMonth() + 1) + '-' + d.getFullYear() + ' ' + pad(h) + ':' + pad(d.getMinutes()) + ' ' + ap;
  }

  function formatUnlockTable(d) {
    if (!d || isNaN(d.getTime())) return '--';
    var h = d.getHours();
    var ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12; if (!h) h = 12;
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + pad(h) + ':' + pad(d.getMinutes()) + ' ' + ap;
  }

  function setDraftHour12(hr12) {
    var isPm = state.dtDraft.getHours() >= 12;
    if (hr12 === 12) state.dtDraft.setHours(isPm ? 12 : 0);
    else state.dtDraft.setHours(isPm ? hr12 + 12 : hr12);
  }

  function setDraftAmPm(apSel) {
    var hr12 = state.dtDraft.getHours() % 12;
    if (!hr12) hr12 = 12;
    if (apSel === 'PM') state.dtDraft.setHours(hr12 === 12 ? 12 : hr12 + 12);
    else state.dtDraft.setHours(hr12 === 12 ? 0 : hr12);
  }

  function empTagLabel(name) {
    var e = EMPLOYEES.filter(function (x) { return x.name === name; })[0];
    return e ? '(' + e.code + ') ' + e.name : name;
  }

  function tagToEmployeeName(tag) {
    var m = String(tag).match(/^\([^)]+\)\s*(.+)$/);
    return m ? m[1].trim() : tag;
  }

  function modalTitle(isEdit) {
    if (state.tab === 'unlock12b') return isEdit ? 'Edit 12B Unlock Form' : 'Unlock Form 12B';
    return isEdit ? 'Edit 12BB Unlock Form' : 'Unlock Form 12BB';
  }

  function renderEmpTags() {
    if (!els.empTags) return;
    if (!state.modalEmpTags.length) {
      els.empTags.innerHTML = '';
      return;
    }
    if (state.tab === 'unlock12bb') {
      els.empTags.innerHTML = '<span class="ed-emp-tag"><span>' + state.modalEmpTags.length + '</span>' +
        '<button type="button" class="ed-emp-tag__x" data-ed="clearEmps" aria-label="Clear employees">&times;</button></span>';
      return;
    }
    els.empTags.innerHTML = state.modalEmpTags.map(function (tag, idx) {
      return '<span class="ed-emp-tag"><span>' + escapeHtml(tag) + '</span>' +
        '<button type="button" class="ed-emp-tag__x" data-ed="removeEmpTag" data-idx="' + idx + '" aria-label="Remove">&times;</button></span>';
    }).join('');
  }

  function renderEmpTagList() {
    if (!els.empList) return;
    var q = state.empTagQuery.trim().toLowerCase();
    var picked = state.modalEmpTags.map(tagToEmployeeName);
    var items = EMPLOYEES.filter(function (e) {
      if (picked.indexOf(e.name) !== -1) return false;
      if (!q) return true;
      return empLabel(e).toLowerCase().indexOf(q) !== -1 || e.name.toLowerCase().indexOf(q) !== -1;
    });
    els.empList.innerHTML = items.map(function (e) {
      return '<button type="button" class="ed-emp-tags__opt" data-ed="addEmp" data-name="' + escapeHtml(e.name) + '">' + escapeHtml(empLabel(e)) + '</button>';
    }).join('') || '<div class="ed-emp-tags__opt" style="cursor:default;color:#8c8c8c">No employees</div>';
    els.empList.hidden = !state.empTagOpen;
  }

  function renderDtTimeHead() {
    if (!els.dtTimeHead || !state.dtDraft) return;
    els.dtTimeHead.textContent = formatUnlockInput(state.dtDraft);
  }

  function renderDtCalendar() {
    if (!els.dtDays || !els.dtMonthLabel) return;
    els.dtMonthLabel.textContent = MONTHS[state.dtViewMonth] + ' ' + state.dtViewYear;
    var first = new Date(state.dtViewYear, state.dtViewMonth, 1);
    var startDay = first.getDay();
    var daysInMonth = new Date(state.dtViewYear, state.dtViewMonth + 1, 0).getDate();
    var prevDays = new Date(state.dtViewYear, state.dtViewMonth, 0).getDate();
    var cells = [];
    var i;
    for (i = 0; i < startDay; i += 1) {
      var pd = prevDays - startDay + i + 1;
      cells.push({ day: pd, out: true, date: new Date(state.dtViewYear, state.dtViewMonth - 1, pd) });
    }
    for (i = 1; i <= daysInMonth; i += 1) {
      cells.push({ day: i, out: false, date: new Date(state.dtViewYear, state.dtViewMonth, i) });
    }
    var nextDay = 1;
    while (cells.length % 7 !== 0) {
      cells.push({ day: nextDay, out: true, date: new Date(state.dtViewYear, state.dtViewMonth + 1, nextDay) });
      nextDay += 1;
    }
    var today = new Date();
    var sel = state.dtDraft;
    els.dtDays.innerHTML = cells.map(function (c) {
      var on = sel && c.date.getFullYear() === sel.getFullYear() && c.date.getMonth() === sel.getMonth() && c.date.getDate() === sel.getDate();
      var isToday = !c.out && c.date.getFullYear() === today.getFullYear() && c.date.getMonth() === today.getMonth() && c.date.getDate() === today.getDate();
      return '<button type="button" class="ed-dt-pop__day' + (c.out ? ' is-out' : '') + (on ? ' is-selected' : '') + (isToday ? ' is-today' : '') + '" data-ed="dtDay" data-day="' + c.date.getDate() + '" data-month="' + c.date.getMonth() + '" data-year="' + c.date.getFullYear() + '">' + c.day + '</button>';
    }).join('');
  }

  function renderDtTimeCols() {
    if (!els.dtHours || !els.dtMinutes || !els.dtAmPm || !state.dtDraft) return;
    var h24 = state.dtDraft.getHours();
    var h12 = h24 % 12; if (!h12) h12 = 12;
    var m = state.dtDraft.getMinutes();
    var ap = h24 >= 12 ? 'PM' : 'AM';
    var hours = [];
    for (var i = 1; i <= 12; i += 1) hours.push(i);
    els.dtHours.innerHTML = hours.map(function (hr) {
      return '<button type="button" data-ed="dtHour" data-hour="' + hr + '"' + (hr === h12 ? ' class="is-selected"' : '') + '>' + pad(hr) + '</button>';
    }).join('');
    var mins = [];
    for (var j = 0; j < 60; j += 1) mins.push(j);
    els.dtMinutes.innerHTML = mins.map(function (mn) {
      return '<button type="button" data-ed="dtMinute" data-minute="' + mn + '"' + (mn === m ? ' class="is-selected"' : '') + '>' + pad(mn) + '</button>';
    }).join('');
    els.dtAmPm.innerHTML = ['AM', 'PM'].map(function (p) {
      return '<button type="button" data-ed="dtAmPm" data-ap="' + p + '"' + (p === ap ? ' class="is-selected"' : '') + '>' + p + '</button>';
    }).join('');
    renderDtTimeHead();
  }

  function renderDtPicker() {
    renderDtCalendar();
    renderDtTimeCols();
  }

  function positionDtPop(field) {
    if (!els.dtPop || !field) return;
    var wrap = field === 'start' ? els.startInput && els.startInput.closest('.ed-dt-wrap') : els.endInput && els.endInput.closest('.ed-dt-wrap');
    if (!wrap) return;
    var rect = wrap.getBoundingClientRect();
    var dialog = wrap.closest('.ed-modal__body');
    if (!dialog) return;
    var dRect = dialog.getBoundingClientRect();
    els.dtPop.style.top = (rect.bottom - dRect.top + 4) + 'px';
    els.dtPop.style.left = Math.max(0, rect.left - dRect.left) + 'px';
    els.dtPop.style.right = 'auto';
    els.dtPop.style.width = Math.min(420, dRect.width - 20) + 'px';
  }

  function openDtPicker(field) {
    state.dtOpen = field;
    var raw = field === 'start' ? (els.startInput && els.startInput.value) : (els.endInput && els.endInput.value);
    state.dtDraft = parseUnlockDate(raw) || new Date();
    state.dtViewYear = state.dtDraft.getFullYear();
    state.dtViewMonth = state.dtDraft.getMonth();
    if (els.dtPop) els.dtPop.hidden = false;
    renderDtPicker();
    positionDtPop(field);
  }

  function closeDtPicker() {
    state.dtOpen = '';
    if (els.dtPop) els.dtPop.hidden = true;
  }

  function applyDtPicker() {
    if (!state.dtOpen || !state.dtDraft) return;
    var formatted = formatUnlockInput(state.dtDraft);
    if (state.dtOpen === 'start' && els.startInput) els.startInput.value = formatted;
    if (state.dtOpen === 'end' && els.endInput) els.endInput.value = formatted;
    closeDtPicker();
  }

  function resetUnlockModal() {
    state.unlockEditId = null;
    state.modalEmpTags = [];
    state.empTagOpen = false;
    state.empTagQuery = '';
    closeDtPicker();
    if (els.form) els.form.reset();
    if (els.fySelect) els.fySelect.value = 'FY 25-26 (AY 26-27)';
    if (els.startInput) els.startInput.value = '';
    if (els.endInput) els.endInput.value = '';
    if (els.empInput) els.empInput.value = '';
    renderEmpTags();
    renderEmpTagList();
  }

  function openUnlockModal(row) {
    resetUnlockModal();
    if (els.title) els.title.textContent = modalTitle(!!row);
    if (row) {
      state.unlockEditId = row.id;
      state.modalEmpTags = row.empTags ? row.empTags.slice() : row.employees.map(empTagLabel);
      if (els.fySelect) els.fySelect.value = row.fy || 'FY 25-26 (AY 26-27)';
      if (els.startInput) els.startInput.value = formatUnlockInput(parseUnlockDate(row.start));
      if (els.endInput) els.endInput.value = formatUnlockInput(parseUnlockDate(row.end));
      renderEmpTags();
    }
    if (els.modal) {
      els.modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }

  function closeUnlockModal() {
    closeDtPicker();
    state.empTagOpen = false;
    if (els.empList) els.empList.hidden = true;
    if (els.modal) {
      els.modal.hidden = true;
      document.body.style.overflow = '';
    }
  }

  function unlockKey() {
    return state.tab === 'unlock12b' ? 'unlock12b' : 'unlock12bb';
  }

  function bindUnlockModal(e) {
    var t = e.target;
    if (t.closest('[data-ed="removeEmpTag"]')) {
      var rmIdx = parseInt(t.closest('[data-ed="removeEmpTag"]').getAttribute('data-idx'), 10);
      state.modalEmpTags.splice(rmIdx, 1);
      renderEmpTags();
      return;
    }
    if (t.closest('[data-ed="clearEmps"]')) {
      state.modalEmpTags = [];
      renderEmpTags();
      return;
    }
    if (t.closest('[data-ed="addEmp"]')) {
      var empName = t.closest('[data-ed="addEmp"]').getAttribute('data-name');
      var tagLabel = empTagLabel(empName);
      if (empName && state.modalEmpTags.indexOf(tagLabel) === -1) state.modalEmpTags.push(tagLabel);
      state.empTagQuery = '';
      if (els.empInput) els.empInput.value = '';
      state.empTagOpen = false;
      renderEmpTags();
      renderEmpTagList();
      return;
    }
    if (t.closest('[data-ed="dtToggle"]') || t.id === 'edUnlockStart' || t.id === 'edUnlockEnd') {
      var field = t.getAttribute('data-dt') || (t.id === 'edUnlockStart' ? 'start' : 'end');
      if (state.dtOpen === field) closeDtPicker();
      else openDtPicker(field);
      return;
    }
    if (t.closest('[data-ed="dtPrevYear"]')) { state.dtViewYear -= 1; renderDtCalendar(); return; }
    if (t.closest('[data-ed="dtNextYear"]')) { state.dtViewYear += 1; renderDtCalendar(); return; }
    if (t.closest('[data-ed="dtPrevMonth"]')) {
      state.dtViewMonth -= 1;
      if (state.dtViewMonth < 0) { state.dtViewMonth = 11; state.dtViewYear -= 1; }
      renderDtCalendar();
      return;
    }
    if (t.closest('[data-ed="dtNextMonth"]')) {
      state.dtViewMonth += 1;
      if (state.dtViewMonth > 11) { state.dtViewMonth = 0; state.dtViewYear += 1; }
      renderDtCalendar();
      return;
    }
    if (t.closest('[data-ed="dtDay"]')) {
      var btn = t.closest('[data-ed="dtDay"]');
      var yr = parseInt(btn.getAttribute('data-year'), 10);
      var mo = parseInt(btn.getAttribute('data-month'), 10);
      var dy = parseInt(btn.getAttribute('data-day'), 10);
      if (state.dtDraft) {
        state.dtDraft.setFullYear(yr, mo, dy);
      } else {
        state.dtDraft = new Date(yr, mo, dy, 12, 0, 0, 0);
      }
      state.dtViewYear = yr;
      state.dtViewMonth = mo;
      renderDtPicker();
      return;
    }
    if (t.closest('[data-ed="dtHour"]')) {
      setDraftHour12(parseInt(t.closest('[data-ed="dtHour"]').getAttribute('data-hour'), 10));
      renderDtTimeCols();
      return;
    }
    if (t.closest('[data-ed="dtMinute"]')) {
      state.dtDraft.setMinutes(parseInt(t.closest('[data-ed="dtMinute"]').getAttribute('data-minute'), 10));
      renderDtTimeCols();
      return;
    }
    if (t.closest('[data-ed="dtAmPm"]')) {
      setDraftAmPm(t.closest('[data-ed="dtAmPm"]').getAttribute('data-ap'));
      renderDtTimeCols();
      return;
    }
    if (t.closest('[data-ed="dtNow"]')) {
      state.dtDraft = new Date();
      state.dtViewYear = state.dtDraft.getFullYear();
      state.dtViewMonth = state.dtDraft.getMonth();
      renderDtPicker();
      return;
    }
    if (t.closest('[data-ed="dtOk"]')) {
      applyDtPicker();
      return;
    }
  }

  function fillEmpSelect() {
    /* legacy no-op */
  }

  function openViewDetails(id) {
    var row = rowsForTab().filter(function (r) { return r.id === id; })[0];
    if (!row) return;
    var fyVal = (state.fy || 'FY 26-27').replace('FY ', '');
    var params = 'from=declaration&tab=' + encodeURIComponent(state.tab) +
      '&id=' + encodeURIComponent(id) +
      '&employee=' + encodeURIComponent(row.employee || '') +
      '&fy=' + encodeURIComponent(fyVal);
    if (state.tab === 'approve12b') {
      window.location.href = 'form_12b.html?' + params;
      return;
    }
    if (state.tab === 'approve12bb') {
      window.location.href = 'form_12bb.html?' + params;
    }
  }

  function tabFromQuery() {
    var m = window.location.search.match(/[?&]tab=([^&]+)/);
    if (!m) return 'unlock12bb';
    var tab = decodeURIComponent(m[1]);
    if (tab === 'unlock12bb' || tab === 'unlock12b' || tab === 'approve12b' || tab === 'approve12bb') return tab;
    return 'unlock12bb';
  }

  function deleteUnlock(id) {
    var key = unlockKey();
    state[key] = state[key].filter(function (r) { return r.id !== id; });
    toast('Deleted', 'Unlock window removed.');
    render();
  }

  function openDeletePop(anchor, id) {
    if (!els.delPop || !anchor) return;
    state.deleteId = id;
    els.delPop.hidden = false;
    var rect = anchor.getBoundingClientRect();
    var popW = els.delPop.offsetWidth || 260;
    var popH = els.delPop.offsetHeight || 100;
    var left = rect.left + rect.width / 2 - popW / 2;
    var top = rect.top - popH - 8;
    if (left < 8) left = 8;
    if (left + popW > window.innerWidth - 8) left = window.innerWidth - popW - 8;
    if (top < 8) top = rect.bottom + 8;
    els.delPop.style.left = left + 'px';
    els.delPop.style.top = top + 'px';
  }

  function closeDeletePop() {
    state.deleteId = null;
    if (els.delPop) els.delPop.hidden = true;
  }

  function confirmDelete() {
    var id = state.deleteId;
    if (!id) return;
    closeDeletePop();
    deleteUnlock(id);
  }

  function bind() {
    els.tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { setTab(tab.getAttribute('data-tab')); });
    });

    if (els.dynamic) {
      els.dynamic.addEventListener('click', function (e) {
        var t = e.target;
        if (t.closest('[data-ed="pickEmp"]')) {
          state.employee = t.closest('[data-ed="pickEmp"]').getAttribute('data-value') || '';
          state.empOpen = false;
          state.empQuery = '';
          state.page = 1;
          render();
          return;
        }
        if (t.closest('[data-ed="pickFy"]')) {
          state.fy = t.closest('[data-ed="pickFy"]').getAttribute('data-value');
          state.fyOpen = false;
          render();
          return;
        }
        if (t.closest('[data-ed="toggleCols"]')) {
          state.columnsOpen = !state.columnsOpen;
          state.filterOpen = false;
          render();
          return;
        }
        if (t.closest('[data-ed="toggleFilter"]')) {
          state.filterOpen = !state.filterOpen;
          state.columnsOpen = false;
          render();
          return;
        }
        if (t.closest('[data-ed="selectAllCols"]')) {
          colsForTab().forEach(function (c) { state.colVisible[c.id] = true; });
          render();
          return;
        }
        if (t.closest('[data-ed="resetFilter"]')) {
          toast('Filter', 'Filters reset.');
          state.filterOpen = false;
          render();
          return;
        }
        if (t.closest('[data-ed="accToggle"]')) {
          var acc = t.closest('.ed-filter-acc');
          if (acc) acc.classList.toggle('is-open');
          return;
        }
        if (t.closest('[data-ed="add"]')) { openUnlockModal(null); return; }
        if (t.closest('[data-ed="delete"]')) {
          e.stopPropagation();
          openDeletePop(t.closest('[data-ed="delete"]'), t.closest('[data-ed="delete"]').getAttribute('data-id'));
          return;
        }
        if (t.closest('[data-ed="edit"]')) {
          var editId = t.closest('[data-ed="edit"]').getAttribute('data-id');
          var editRow = rowsForTab().filter(function (r) { return r.id === editId; })[0];
          if (editRow) openUnlockModal(editRow);
          return;
        }
        if (t.closest('[data-ed="view"]')) {
          openViewDetails(t.closest('[data-ed="view"]').getAttribute('data-id'));
          return;
        }
        if (t.closest('[data-ed="prev"]')) {
          if (state.page > 1) { state.page -= 1; render(); }
          return;
        }
        if (t.closest('[data-ed="next"]')) {
          var totalPages = Math.max(1, Math.ceil(filteredRows().length / state.pageSize) || 1);
          if (state.page < totalPages) { state.page += 1; render(); }
          return;
        }
        if (t.closest('[data-ed="fyInput"]')) {
          state.fyOpen = !state.fyOpen;
          state.empOpen = false;
          render();
        }
      });

      els.dynamic.addEventListener('focusin', function (e) {
        if (e.target.getAttribute('data-ed') === 'empInput') {
          state.empOpen = true;
          state.empQuery = '';
          var list = document.getElementById('edEmpList');
          if (list) list.hidden = false;
        }
      });

      els.dynamic.addEventListener('input', function (e) {
        if (e.target.getAttribute('data-ed') !== 'empInput') return;
        state.empQuery = e.target.value || '';
        state.employee = '';
        state.empOpen = true;
        var list = document.getElementById('edEmpList');
        if (!list) return;
        var q = state.empQuery.trim().toLowerCase();
        var items = EMPLOYEES.filter(function (emp) {
          return !q || empLabel(emp).toLowerCase().indexOf(q) !== -1 || emp.name.toLowerCase().indexOf(q) !== -1;
        });
        list.hidden = false;
        list.innerHTML = '<button type="button" class="ed-combo__opt" data-ed="pickEmp" data-value="">Clear</button>' +
          items.map(function (emp) {
            return '<button type="button" class="ed-combo__opt" data-ed="pickEmp" data-value="' + escapeHtml(emp.name) + '">' + escapeHtml(empLabel(emp)) + '</button>';
          }).join('') || '<div class="ed-combo__opt" style="cursor:default;color:#8c8c8c">No employees</div>';
      });

      els.dynamic.addEventListener('change', function (e) {
        var t = e.target;
        if (t.getAttribute('data-ed') === 'pageSize') {
          state.pageSize = parseInt(t.value, 10) || 10;
          state.page = 1;
          render();
          return;
        }
        if (t.getAttribute('data-ed') === 'col') {
          state.colVisible[t.getAttribute('data-id')] = !!t.checked;
          render();
        }
      });
    }

    document.addEventListener('click', function (e) {
      if (state.empOpen && !e.target.closest('[data-combo="emp"]')) {
        state.empOpen = false;
        var list = document.getElementById('edEmpList');
        if (list) list.hidden = true;
      }
      if (state.fyOpen && !e.target.closest('[data-combo="fy"]')) {
        state.fyOpen = false;
        var fy = document.getElementById('edFyList');
        if (fy) fy.hidden = true;
      }
      if ((state.columnsOpen || state.filterOpen) && !e.target.closest('.ed-wrap')) {
        state.columnsOpen = false;
        state.filterOpen = false;
        var cols = document.getElementById('edColsPop');
        var filt = document.getElementById('edFilterPop');
        if (cols) cols.hidden = true;
        if (filt) filt.hidden = true;
      }
      if (state.empTagOpen && !e.target.closest('#edUnlockEmpWrap')) {
        state.empTagOpen = false;
        if (els.empList) els.empList.hidden = true;
      }
      if (state.dtOpen && !e.target.closest('.ed-dt-wrap') && !e.target.closest('#edDtPop')) {
        closeDtPicker();
      }
      if (els.delPop && !els.delPop.hidden && !e.target.closest('#edDelPop') && !e.target.closest('[data-ed="delete"]')) {
        closeDeletePop();
      }
    });

    if (els.delNo) els.delNo.addEventListener('click', function (ev) { ev.stopPropagation(); closeDeletePop(); });
    if (els.delYes) els.delYes.addEventListener('click', function (ev) { ev.stopPropagation(); confirmDelete(); });
    if (els.delPop) els.delPop.addEventListener('click', function (ev) { ev.stopPropagation(); });
    window.addEventListener('resize', closeDeletePop);
    window.addEventListener('scroll', closeDeletePop, true);

    document.querySelectorAll('[data-ed-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        closeUnlockModal();
        resetUnlockModal();
      });
    });

    if (els.modal) {
      els.modal.addEventListener('click', bindUnlockModal);
    }

    if (els.empInput) {
      els.empInput.addEventListener('focus', function () {
        state.empTagOpen = true;
        renderEmpTagList();
      });
      els.empInput.addEventListener('input', function () {
        state.empTagQuery = els.empInput.value || '';
        state.empTagOpen = true;
        renderEmpTagList();
      });
    }

    if (els.form) {
      els.form.addEventListener('submit', function () {
        if (!state.modalEmpTags.length) { toast('Required', 'Select at least one employee.'); return; }
        var fy = els.fySelect ? els.fySelect.value : '';
        var startD = parseUnlockDate(els.startInput && els.startInput.value);
        var endD = parseUnlockDate(els.endInput && els.endInput.value);
        var names = state.modalEmpTags.map(tagToEmployeeName).filter(function (n, i, arr) {
          return arr.indexOf(n) === i;
        });
        var payload = {
          employees: names,
          empTags: state.modalEmpTags.slice(),
          fy: fy,
          start: startD ? formatUnlockTable(startD) : '--',
          end: endD ? formatUnlockTable(endD) : '--'
        };
        var key = unlockKey();
        if (state.unlockEditId) {
          state[key] = state[key].map(function (r) {
            if (r.id !== state.unlockEditId) return r;
            return Object.assign({}, r, payload);
          });
          toast('Saved', 'Unlock window updated.');
        } else {
          state[key].unshift(Object.assign({ id: (state.tab === 'unlock12b' ? 'b' : 'u') + Date.now() }, payload));
          toast('Saved', 'Unlock window created.');
        }
        closeUnlockModal();
        resetUnlockModal();
        render();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (els.delPop && !els.delPop.hidden) closeDeletePop();
        else if (state.dtOpen) closeDtPicker();
        else if (els.modal && !els.modal.hidden) {
          closeUnlockModal();
          resetUnlockModal();
        }
      }
    });

    if (els.topCheckIn) {
      els.topCheckIn.addEventListener('click', function () {
        state.checkedIn = !state.checkedIn;
        els.topCheckIn.textContent = state.checkedIn ? 'Check Out' : 'Check In';
        els.topCheckIn.classList.toggle('is-out', state.checkedIn);
        els.topCheckIn.classList.toggle('is-in', !state.checkedIn);
        toast(state.checkedIn ? 'Checked In' : 'Checked Out', '');
      });
    }
  }

  function tickClock() {
    if (!els.topClock) return;
    var now = new Date();
    els.topClock.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes());
  }

  fillEmpSelect();
  bind();
  tickClock();
  setInterval(tickClock, 1000);
  setTab(tabFromQuery());
})();
