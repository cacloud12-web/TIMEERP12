/**
 * TIME ERP — Employee Transactions
 * Tabs: Payable Days | Variable Deduction | Additional Pay | Manual TDS |
 *       Hold | Generate | Release | Released | Arrear | Tax Computation
 */
(function () {
  'use strict';

  var EMPTY_ICON = '<div class="et-empty__icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M10 28l6-8h32l6 8"/><path d="M10 28h44v22a4 4 0 01-4 4H14a4 4 0 01-4-4V28z"/><path d="M10 28h14l4 6h12l4-6h14"/></svg></div><p>No data</p>';
  var EXCEL_SVG = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 2.75h7.5L19.25 7.5V20.5a.75.75 0 01-.75.75H7a.75.75 0 01-.75-.75V3.5A.75.75 0 017 2.75z" stroke="#217346" stroke-width="1.5" stroke-linejoin="round"/><path d="M14.5 2.75V7.5h4.75" stroke="#217346" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.2 10.2l5.6 7.6M14.8 10.2l-5.6 7.6" stroke="#217346" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var COLS_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M5 9.33h14M5 14.67h14"/><path d="M8 6.85h5M8 12h5M8 17.15h5"/></svg>';
  var FILTER_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5h16l-6 7v5l-4 2v-7L4 5z"/></svg>';
  var UP_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  var DOWN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>';
  var CHEV_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
  var CHEV_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
  var CHEV_D = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';

  var EMPLOYEES = [
    { code: 'AN2', name: 'Tarun Gaur' },
    { code: 'SA009', name: 'Suhanshi Rawat' },
    { code: 'SO6829', name: 'SONIYA KASHYAP' },
    { code: 'HA6413', name: 'Hardik rawat' },
    { code: 'SI6830', name: 'SIMRAN KASHYAP' },
    { code: 'AS0010', name: 'Aastha Tyagi' },
    { code: 'SK009', name: 'Shivam Kumar' },
    { code: 'AA6215', name: 'Aakash' },
    { code: 'SB001', name: 'Saurabh Bhardwaj' },
    { code: 'DA002', name: 'Dev Aggarwal' },
    { code: 'KA001', name: 'Kamal Kant Sharma' },
    { code: 'RS003', name: 'Riya Sharma' },
    { code: 'AV004', name: 'Aman Verma' }
  ];

  var TAB_META = {
    payable: { add: '+ Add Payable Days', modal: 'payable' },
    variable: { add: '+ Add Variable Deduction', modal: 'generic', title: 'Add Variable Deduction' },
    additional: { add: '+ Add Additional Pay', modal: 'generic', title: 'Add Additional Pay' },
    tds: { add: '+ Add Manual TDS', modal: 'generic', title: 'Add Manual TDS' },
    hold: { add: '+ Add Hold Salary Days', modal: 'hold' },
    generate: { add: null },
    release: { add: null },
    released: { add: null },
    arrear: { add: '+ Add Additional Arrear', modal: 'generic', title: 'Add Additional Arrear' },
    tax: { add: null }
  };

  var ARREAR_COLS = [
    { id: 'sno', label: 'S. No.' },
    { id: 'employee', label: 'Employee Name' },
    { id: 'month', label: 'Month' },
    { id: 'amount', label: 'Amount' },
    { id: 'action', label: 'Action' }
  ];

  var state = {
    tab: 'payable',
    year: 2026,
    month: 7,
    page: 1,
    pageSize: 10,
    employee: '',
    empQuery: '',
    empOpen: false,
    monthOpen: false,
    checkedIn: false,
    selected: {},
    deleteId: null,
    deleteTab: null,
    arrearColsOpen: false,
    arrearVisible: { sno: true, employee: true, month: true, amount: true, action: true },
    payable: [
      { id: 'p1', name: 'Tarun Gaur', month: '07/2026', remark: '--', hrms: 0, paid: 0, status: 'HRMS' },
      { id: 'p2', name: 'Suhanshi Rawat', month: '07/2026', remark: '--', hrms: 25.5, paid: 25.5, status: 'HRMS' },
      { id: 'p3', name: 'SONIYA KASHYAP', month: '07/2026', remark: '--', hrms: 29.5, paid: 29.5, status: 'HRMS' },
      { id: 'p4', name: 'Hardik rawat', month: '07/2026', remark: '--', hrms: 24, paid: 24, status: 'HRMS' },
      { id: 'p5', name: 'SIMRAN KASHYAP', month: '07/2026', remark: '--', hrms: 29, paid: 29, status: 'HRMS' },
      { id: 'p6', name: 'Aastha Tyagi', month: '07/2026', remark: '--', hrms: 27.5, paid: 27.5, status: 'HRMS' },
      { id: 'p7', name: 'Shivam Kumar', month: '07/2026', remark: '--', hrms: 29, paid: 29, status: 'HRMS' },
      { id: 'p8', name: 'Aakash', month: '07/2026', remark: '--', hrms: 0, paid: 0, status: 'HRMS' },
      { id: 'p9', name: 'Saurabh Bhardwaj', month: '07/2026', remark: '--', hrms: 0, paid: 0, status: 'HRMS' },
      { id: 'p10', name: 'Kamal Kant Sharma', month: '07/2026', remark: '--', hrms: 27.5, paid: 31, status: 'Updated' },
      { id: 'p11', name: 'Dev Aggarwal', month: '07/2026', remark: '--', hrms: 24, paid: 24, status: 'HRMS' },
      { id: 'p12', name: 'Riya Sharma', month: '07/2026', remark: '--', hrms: 29, paid: 29, status: 'HRMS' },
      { id: 'p13', name: 'Aman Verma', month: '07/2026', remark: '--', hrms: 26, paid: 26, status: 'HRMS' }
    ],
    generate: [
      { id: 'g1', month: '07/2026', name: 'Saurabh Bhardwaj', gross: 0, ded: 0, tax: 0, days: 0, status: 'ESTIMATED', net: 0 },
      { id: 'g2', month: '07/2026', name: 'Tarun Gaur', gross: 0, ded: 0, tax: 0, days: 0, status: 'ESTIMATED', net: 0 },
      { id: 'g3', month: '07/2026', name: 'Dev Aggarwal', gross: 15483, ded: 0, tax: 0, days: 24, status: 'ESTIMATED', net: 15483 }
    ],
    released: [
      { id: 'r1', month: '07/2026', name: 'Kamal Kant Sharma', gross: 67500, ded: 0, tax: 0, days: 31, status: 'RELEASED', net: 67500 }
    ],
    tax: [
      { id: 't1', code: 'KA001', name: 'Kamal Kant Sharma', month: 'Jul, 2026', annual: 125000, prev: 0, current: 8500, till: 8500, balance: 116500, next: 9708,
        taxDetail: { regime: 'New Regime', gross: 810000, stdDed: 75000, chapter6: 50000, netTaxable: 685000, taxOnIncome: 118300, cess: 4732, total: 125000 },
        hraDetail: { city: 'Metro', basic: 420000, hraReceived: 168000, rentPaid: 180000, exemption: 168000, taxable: 0 }
      },
      { id: 't2', code: 'DA002', name: 'Dev Aggarwal', month: 'Jul, 2026', annual: 48000, prev: 0, current: 3200, till: 3200, balance: 44800, next: 3733,
        taxDetail: { regime: 'New Regime', gross: 360000, stdDed: 75000, chapter6: 25000, netTaxable: 260000, taxOnIncome: 45000, cess: 1800, total: 48000 },
        hraDetail: { city: 'Non-Metro', basic: 216000, hraReceived: 86400, rentPaid: 96000, exemption: 86400, taxable: 0 }
      },
      { id: 't3', code: 'AN2', name: 'Tarun Gaur', month: 'Jul, 2026', annual: 0, prev: 0, current: '--', till: 0, balance: 0, next: 0,
        taxDetail: { regime: 'New Regime', gross: 0, stdDed: 0, chapter6: 0, netTaxable: 0, taxOnIncome: 0, cess: 0, total: 0 },
        hraDetail: { city: 'Non-Metro', basic: 0, hraReceived: 0, rentPaid: 0, exemption: 0, taxable: 0 }
      },
      { id: 't4', code: 'SB001', name: 'Saurabh Bhardwaj', month: 'Jul, 2026', annual: 72000, prev: 12000, current: 5000, till: 17000, balance: 55000, next: 4583,
        taxDetail: { regime: 'Old Regime', gross: 540000, stdDed: 50000, chapter6: 80000, netTaxable: 410000, taxOnIncome: 69000, cess: 2760, total: 72000 },
        hraDetail: { city: 'Metro', basic: 300000, hraReceived: 120000, rentPaid: 144000, exemption: 120000, taxable: 0 }
      },
      { id: 't5', code: 'SA009', name: 'Suhanshi Rawat', month: 'Jul, 2026', annual: 36000, prev: 0, current: 2400, till: 2400, balance: 33600, next: 2800,
        taxDetail: { regime: 'New Regime', gross: 300000, stdDed: 75000, chapter6: 15000, netTaxable: 210000, taxOnIncome: 34000, cess: 1360, total: 36000 },
        hraDetail: { city: 'Non-Metro', basic: 180000, hraReceived: 72000, rentPaid: 84000, exemption: 72000, taxable: 0 }
      }
    ],
    variable: [
      { id: 'v1', name: 'Kamal Kant Sharma', month: '07/2026', gross: 2500, deductions: 'Loan EMI' },
      { id: 'v2', name: 'Dev Aggarwal', month: '07/2026', gross: 1500, deductions: 'Advance Recovery' },
      { id: 'v3', name: 'Tarun Gaur', month: '07/2026', gross: 800, deductions: 'Other' },
      { id: 'v4', name: 'Suhanshi Rawat', month: '07/2026', gross: 1200, deductions: 'Canteen' },
      { id: 'v5', name: 'SONIYA KASHYAP', month: '07/2026', gross: 950, deductions: 'Insurance Premium' }
    ],
    additional: [
      { id: 'a1', name: 'Kamal Kant Sharma', ingredient: 'Performance Bonus', month: '07/2026', amount: 5000, taxStatus: 'Taxable', payslip: 'Yes' },
      { id: 'a2', name: 'Dev Aggarwal', ingredient: 'Travel Allowance', month: '07/2026', amount: 3500, taxStatus: 'Taxable', payslip: 'Yes' },
      { id: 'a3', name: 'Tarun Gaur', ingredient: 'Overtime Pay', month: '07/2026', amount: 2200, taxStatus: 'Taxable', payslip: 'Yes' },
      { id: 'a4', name: 'Saurabh Bhardwaj', ingredient: 'Shift Allowance', month: '07/2026', amount: 1800, taxStatus: 'Non-Taxable', payslip: 'No' },
      { id: 'a5', name: 'Aastha Tyagi', ingredient: 'Referral Bonus', month: '07/2026', amount: 10000, taxStatus: 'Taxable', payslip: 'Yes' }
    ],
    tds: [
      { id: 'td1', name: 'Kamal Kant Sharma', month: '07/2026', amount: 3500, remarks: 'Additional TDS on bonus' },
      { id: 'td2', name: 'Dev Aggarwal', month: '07/2026', amount: 1200, remarks: 'Manual adjustment' },
      { id: 'td3', name: 'Saurabh Bhardwaj', month: '07/2026', amount: 2800, remarks: 'Arrear TDS' },
      { id: 'td4', name: 'SONIYA KASHYAP', month: '07/2026', amount: 900, remarks: 'One-time deduction' },
      { id: 'td5', name: 'Shivam Kumar', month: '07/2026', amount: 1500, remarks: 'Corrective TDS entry' }
    ],
    hold: [
      { id: 'h1', name: 'Tarun Gaur', month: '07/2026', heldDate: '15/07/2026', salaryStatus: 'Hold', reason: 'Pending document submission' },
      { id: 'h2', name: 'Aakash', month: '07/2026', heldDate: '10/07/2026', salaryStatus: 'Hold', reason: 'Incomplete timesheet' },
      { id: 'h3', name: 'Hardik rawat', month: '07/2026', heldDate: '08/07/2026', salaryStatus: 'Hold', reason: 'Under review' },
      { id: 'h4', name: 'SIMRAN KASHYAP', month: '07/2026', heldDate: '12/07/2026', salaryStatus: 'Hold', reason: 'Bank verification pending' },
      { id: 'h5', name: 'Riya Sharma', month: '07/2026', heldDate: '05/07/2026', salaryStatus: 'Hold', reason: 'Exit formalities in progress' }
    ],
    release: [
      { id: 'rl1', month: '07/2026', name: 'Dev Aggarwal', gross: 15483, ded: 1500, tax: 3200, days: 24, status: 'GENERATED', net: 10783 },
      { id: 'rl2', month: '07/2026', name: 'Kamal Kant Sharma', gross: 67500, ded: 2500, tax: 8500, days: 31, status: 'GENERATED', net: 56500 },
      { id: 'rl3', month: '07/2026', name: 'Suhanshi Rawat', gross: 42000, ded: 1200, tax: 2400, days: 25.5, status: 'GENERATED', net: 38400 },
      { id: 'rl4', month: '07/2026', name: 'SONIYA KASHYAP', gross: 38500, ded: 950, tax: 2100, days: 29.5, status: 'GENERATED', net: 35450 },
      { id: 'rl5', month: '07/2026', name: 'Aastha Tyagi', gross: 36000, ded: 0, tax: 1800, days: 27.5, status: 'GENERATED', net: 34200 }
    ],
    arrear: [
      { id: 'ar1', name: 'Kamal Kant Sharma', month: '07/2026', amount: 4500 },
      { id: 'ar2', name: 'Dev Aggarwal', month: '07/2026', amount: 3200 },
      { id: 'ar3', name: 'Saurabh Bhardwaj', month: '07/2026', amount: 2800 },
      { id: 'ar4', name: 'Tarun Gaur', month: '07/2026', amount: 1500 },
      { id: 'ar5', name: 'Shivam Kumar', month: '07/2026', amount: 2100 }
    ]
  };

  var root = document.getElementById('etDynamic');
  var toastStack = document.getElementById('toastStack');
  var delPop = document.getElementById('etDelPop');
  var delNo = document.getElementById('etDelNo');
  var delYes = document.getElementById('etDelYes');

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function monthLabel() {
    return String(state.month).padStart(2, '0') + '-' + state.year;
  }

  function monthDisplay(rowMonth) {
    return rowMonth || (String(state.month).padStart(2, '0') + '/' + state.year);
  }

  function toast(title, msg) {
    /* Action toasts disabled — UI handles feedback without popup cards */
  }

  function empLabel(e) { return '(' + e.code + ') ' + e.name; }

  function fillSelect(sel) {
    if (!sel) return;
    var opts = '<option value="">' + (sel.id === 'etHoldEmp' ? 'Employee' : 'Select Employee') + '</option>';
    EMPLOYEES.forEach(function (e) { opts += '<option value="' + esc(e.code) + '">' + esc(empLabel(e)) + '</option>'; });
    sel.innerHTML = opts;
  }

  function filteredPayable() {
    var q = (state.employee || state.empQuery || '').toLowerCase();
    return state.payable.filter(function (r) {
      if (!q) return true;
      return r.name.toLowerCase().indexOf(q) !== -1;
    });
  }

  function pageSlice(rows) {
    var start = (state.page - 1) * state.pageSize;
    return rows.slice(start, start + state.pageSize);
  }

  function totalPages(n) { return Math.max(1, Math.ceil(n / state.pageSize) || 1); }

  function columnsPopHtml() {
    return '<div class="et-pop et-pop--columns" id="etArrearColsPop"' + (state.arrearColsOpen ? '' : ' hidden') + '>' +
      '<div class="et-pop__head"><span class="et-pop__title">' + COLS_SVG + ' Columns</span>' +
      '<button type="button" class="et-pop__link" data-select-all-cols>Select All</button></div>' +
      '<div class="et-columns-list" data-cols-list></div></div>';
  }

  function colsBtnHtml() {
    return '<div class="et-cols-wrap">' +
      '<button type="button" class="et-icon-btn' + (state.arrearColsOpen ? ' is-active' : '') + '" data-cols-btn aria-expanded="' + (state.arrearColsOpen ? 'true' : 'false') + '" aria-label="Columns" title="Columns">' + COLS_SVG + '</button>' +
      columnsPopHtml() + '</div>';
  }

  function renderArrearColsList() {
    if (!root) return;
    var list = root.querySelector('[data-cols-list]');
    if (!list) return;
    list.innerHTML = ARREAR_COLS.map(function (c) {
      return '<label><span class="et-col-drag" aria-hidden="true">⋮⋮</span>' +
        '<input type="checkbox" data-col-toggle="' + c.id + '"' + (state.arrearVisible[c.id] ? ' checked' : '') + '> ' +
        esc(c.label) + '</label>';
    }).join('');
  }

  function applyArrearColVis() {
    if (!root) return;
    ARREAR_COLS.forEach(function (c) {
      var show = !!state.arrearVisible[c.id];
      root.querySelectorAll('[data-col="' + c.id + '"]').forEach(function (el) {
        if (show) el.removeAttribute('hidden');
        else el.setAttribute('hidden', '');
      });
    });
  }

  function closeArrearColsPop() {
    state.arrearColsOpen = false;
    if (!root) return;
    var pop = root.querySelector('.et-pop--columns');
    if (pop) pop.hidden = true;
    root.querySelectorAll('[data-cols-btn]').forEach(function (b) {
      b.classList.remove('is-active');
      b.setAttribute('aria-expanded', 'false');
    });
  }

  function toolbarHtml(opts) {
    opts = opts || {};
    var html = '<div class="et-toolbar">';
    html += '<div class="et-toolbar__controls">';

    html += '<div class="et-combo" id="etEmpCombo">';
    html += '<input class="et-combo__input" id="etEmpInput" type="text" placeholder="Employee" value="' + esc(state.employee || state.empQuery) + '" autocomplete="off">';
    html += '<span class="et-combo__icon">' + CHEV_D + '</span>';
    html += '<div class="et-combo__list" id="etEmpList" ' + (state.empOpen ? '' : 'hidden') + '>';
    EMPLOYEES.filter(function (e) {
      var q = (state.empQuery || '').toLowerCase();
      if (!q) return true;
      return empLabel(e).toLowerCase().indexOf(q) !== -1;
    }).forEach(function (e, i) {
      html += '<button type="button" class="et-combo__opt' + (i === 0 && state.empOpen ? ' is-active' : '') + '" data-emp="' + esc(empLabel(e)) + '">' + esc(empLabel(e)) + '</button>';
    });
    html += '</div></div>';

    html += '<div class="et-month">';
    html += '<button type="button" class="et-month__nav" data-month-nav="-1" aria-label="Previous month">' + CHEV_L + '</button>';
    html += '<button type="button" class="et-month__value" id="etMonthBtn" aria-expanded="' + (state.monthOpen ? 'true' : 'false') + '">' + esc(monthLabel()) + '</button>';
    html += '<button type="button" class="et-month__nav" data-month-nav="1" aria-label="Next month">' + CHEV_R + '</button>';
    if (state.monthOpen) {
      html += '<div class="et-month-picker" id="etMonthPicker">';
      html += '<div class="et-month-picker__head"><button type="button" data-year-nav="-1">&lt;&lt;</button><strong>' + state.year + '</strong><button type="button" data-year-nav="1">&gt;&gt;</button></div>';
      html += '<div class="et-month-picker__grid">';
      ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].forEach(function (m, i) {
        html += '<button type="button" class="et-month-picker__cell' + ((i + 1) === state.month ? ' is-active' : '') + '" data-pick-month="' + (i + 1) + '">' + m + '</button>';
      });
      html += '</div></div>';
    }
    html += '</div>';

    if (opts.unhold) html += '<button type="button" class="et-btn" data-action="unhold">' + UP_SVG + ' Un Hold</button>';
    if (opts.generate) html += '<button type="button" class="et-btn" data-action="bulk-generate">' + UP_SVG + ' Generate</button>';
    if (opts.release) html += '<button type="button" class="et-btn" data-action="bulk-release">' + UP_SVG + ' Release</button>';
    if (opts.revert) html += '<button type="button" class="et-btn" data-action="bulk-revert">' + DOWN_SVG + ' Revert</button>';
    html += '<button type="button" class="et-excel" data-action="excel" title="Export Excel" aria-label="Export Excel">' + EXCEL_SVG + '</button>';
    if (opts.colsPop) html += colsBtnHtml();
    else if (opts.cols) html += '<button type="button" class="et-icon-btn" data-action="cols" title="Columns">' + COLS_SVG + '</button>';
    if (opts.filter) html += '<button type="button" class="et-icon-btn" data-action="filter" title="Filter">' + FILTER_SVG + '</button>';
    if (opts.add) html += '<button type="button" class="et-add-link" data-action="add">' + esc(opts.add) + '</button>';

    html += '</div></div>';
    return html;
  }

  function paginationHtml(total) {
    var pages = totalPages(total);
    var shown = Math.min(state.page * state.pageSize, total);
    var from = total === 0 ? 0 : (state.page - 1) * state.pageSize + 1;
    var countLabel = total === 0 ? '0 / 0' : shown + ' / ' + total;
    if (total > 0 && state.page === 1) countLabel = Math.min(state.pageSize, total) + ' / ' + total;
    return '<div class="et-pagination">' +
      '<div class="et-pagination__left"><select class="et-page-size" id="etPageSize">' +
      [10, 20, 50].map(function (n) { return '<option value="' + n + '"' + (state.pageSize === n ? ' selected' : '') + '>' + n + '</option>'; }).join('') +
      '</select></div>' +
      '<div class="et-pagination__center">' +
      '<button type="button" class="et-page-nav" data-page-nav="-1" ' + (state.page <= 1 ? 'disabled' : '') + '>' + CHEV_L + '</button>' +
      '<input class="et-page-input" id="etPageInput" value="' + state.page + '" aria-label="Page">' +
      '<span class="et-page-of">of ' + pages + '</span>' +
      '<button type="button" class="et-page-nav" data-page-nav="1" ' + (state.page >= pages ? 'disabled' : '') + '>' + CHEV_R + '</button>' +
      '</div>' +
      '<div class="et-pagination__right"><span class="et-count">' + esc(countLabel) + '</span></div></div>';
  }

  function actionsEditDelete(id) {
    return '<div class="et-actions"><button type="button" class="et-link" data-edit="' + esc(id) + '">Edit</button><span class="et-actions__sep">|</span><button type="button" class="et-link" data-delete="' + esc(id) + '">Delete</button></div>';
  }

  function renderPayable() {
    var rows = filteredPayable();
    var slice = pageSlice(rows);
    var body = slice.map(function (r, i) {
      var no = (state.page - 1) * state.pageSize + i + 1;
      return '<tr><td>' + no + '</td><td>' + esc(r.name) + '</td><td>' + esc(r.month) + '</td><td>' + esc(r.remark) + '</td><td>' + r.hrms + '</td><td>' + r.paid + '</td><td>' + esc(r.status) + '</td><td>' + actionsEditDelete(r.id) + '</td></tr>';
    }).join('');
    return '<div class="et-card">' + toolbarHtml({ add: TAB_META.payable.add }) +
      '<div class="et-table-wrap">' +
      '<table class="et-table"><thead><tr><th>S. No.</th><th>Employee Name</th><th>Month</th><th>Remark</th><th>HRMS Days</th><th>Payable Days</th><th>Status</th><th>Action</th></tr></thead><tbody>' +
      (body || '') + '</tbody></table>' +
      (rows.length ? '' : '<div class="et-empty">' + EMPTY_ICON + '</div>') +
      '</div>' + paginationHtml(rows.length) + '</div>';
  }

  function renderEmptyTab(key, cols, extras) {
    extras = extras || {};
    var th = cols.map(function (c) {
      if (c === '__check') return '<th><input type="checkbox" disabled aria-label="Select all"></th>';
      return '<th>' + esc(c) + '</th>';
    }).join('');
    return '<div class="et-card">' + toolbarHtml({
      add: TAB_META[key].add,
      cols: extras.cols !== false,
      filter: !!extras.filter,
      unhold: !!extras.unhold,
      generate: !!extras.generate,
      release: !!extras.release,
      revert: !!extras.revert
    }) +
      '<div class="et-table-wrap">' +
      '<table class="et-table"><thead><tr>' + th + '</tr></thead><tbody></tbody></table>' +
      '<div class="et-empty">' + EMPTY_ICON + '</div></div>' +
      paginationHtml(0) + '</div>';
  }

  function renderDataTab(key, cols, rowHtmlFn, extras) {
    extras = extras || {};
    var rows = state[key] || [];
    var slice = pageSlice(rows);
    var th = cols.map(function (c) {
      if (c === '__check') return '<th><input type="checkbox" id="etSelectAll" aria-label="Select all"></th>';
      return '<th>' + esc(c) + '</th>';
    }).join('');
    var body = slice.map(function (r, i) {
      return rowHtmlFn(r, (state.page - 1) * state.pageSize + i + 1);
    }).join('');
    return '<div class="et-card">' + toolbarHtml({
      add: TAB_META[key].add,
      cols: extras.cols !== false,
      filter: !!extras.filter,
      unhold: !!extras.unhold,
      generate: !!extras.generate,
      release: !!extras.release,
      revert: !!extras.revert
    }) +
      '<div class="et-table-wrap">' +
      '<table class="et-table"><thead><tr>' + th + '</tr></thead><tbody>' + body + '</tbody></table>' +
      (rows.length ? '' : '<div class="et-empty">' + EMPTY_ICON + '</div>') +
      '</div>' + paginationHtml(rows.length) + '</div>';
  }

  function renderVariable() {
    return renderDataTab('variable', ['S. No.', 'Employee Name', 'Month', 'Gross Deductions (₹)', 'Deductions', 'Action'], function (r, no) {
      return '<tr><td>' + no + '</td><td>' + esc(r.name) + '</td><td>' + esc(r.month) + '</td><td class="et-num">' + formatNum(r.gross) + '</td><td>' + esc(r.deductions) + '</td><td>' + actionsEditDelete(r.id) + '</td></tr>';
    }, { cols: true, filter: true });
  }

  function renderAdditional() {
    return renderDataTab('additional', ['S. No.', 'Employee Name', 'Ingredient Name', 'Month', 'Amount', 'Tax Status', 'Payslip', 'Action'], function (r, no) {
      return '<tr><td>' + no + '</td><td>' + esc(r.name) + '</td><td>' + esc(r.ingredient) + '</td><td>' + esc(r.month) + '</td><td class="et-num">' + formatNum(r.amount) + '</td><td>' + esc(r.taxStatus) + '</td><td>' + esc(r.payslip) + '</td><td>' + actionsEditDelete(r.id) + '</td></tr>';
    }, { cols: true });
  }

  function renderTds() {
    return renderDataTab('tds', ['#', 'Employee Name', 'Month', 'Amount', 'Remarks', 'Action'], function (r, no) {
      return '<tr><td>' + no + '</td><td>' + esc(r.name) + '</td><td>' + esc(r.month) + '</td><td class="et-num">' + formatNum(r.amount) + '</td><td>' + esc(r.remarks) + '</td><td>' + actionsEditDelete(r.id) + '</td></tr>';
    }, { cols: true });
  }

  function renderHold() {
    return renderDataTab('hold', ['__check', '#', 'Employee Name', 'Month', 'Held Date', 'Salary Status', 'Reason for hold', 'Action'], function (r, no) {
      var checked = state.selected[r.id] ? ' checked' : '';
      return '<tr><td><input type="checkbox" data-sel="' + esc(r.id) + '"' + checked + '></td><td>' + no + '</td><td>' + esc(r.name) + '</td><td>' + esc(r.month) + '</td><td>' + esc(r.heldDate) + '</td><td>' + esc(r.salaryStatus) + '</td><td>' + esc(r.reason) + '</td><td>' + actionsEditDelete(r.id) + '</td></tr>';
    }, { cols: true, unhold: true });
  }

  function renderRelease() {
    return renderDataTab('release', ['__check', '#', 'Month', 'Employee Name', 'Gross Earnings', 'Deductions', 'Tax', 'Payable Days', 'Status', 'Net Payable', 'Action'], function (r, no) {
      var checked = state.selected[r.id] ? ' checked' : '';
      return '<tr><td><input type="checkbox" data-sel="' + esc(r.id) + '"' + checked + '></td><td>' + no + '</td><td>' + esc(r.month) + '</td><td>' + esc(r.name) + '</td>' +
        '<td class="et-num">' + formatNum(r.gross) + '</td><td>' + formatNum(r.ded) + '</td><td class="et-num">' + formatNum(r.tax) + '</td>' +
        '<td>' + r.days + '</td><td>' + esc(r.status) + '</td><td>' + formatNum(r.net) + '</td>' +
        '<td><button type="button" class="et-link et-link--action" data-row-release="' + esc(r.id) + '">Release</button></td></tr>';
    }, { cols: true, release: true, revert: true });
  }

  function renderArrear() {
    var rows = state.arrear || [];
    var slice = pageSlice(rows);
    var th = ARREAR_COLS.map(function (c) {
      var hid = state.arrearVisible[c.id] ? '' : ' hidden';
      return '<th data-col="' + c.id + '"' + hid + '>' + esc(c.label) + '</th>';
    }).join('');
    var body = slice.map(function (r, i) {
      var no = (state.page - 1) * state.pageSize + i + 1;
      var vis = state.arrearVisible;
      return '<tr>' +
        '<td data-col="sno"' + (vis.sno ? '' : ' hidden') + '>' + no + '</td>' +
        '<td data-col="employee"' + (vis.employee ? '' : ' hidden') + '>' + esc(r.name) + '</td>' +
        '<td data-col="month"' + (vis.month ? '' : ' hidden') + '>' + esc(r.month) + '</td>' +
        '<td data-col="amount"' + (vis.amount ? '' : ' hidden') + ' class="et-num">' + formatNum(r.amount) + '</td>' +
        '<td data-col="action"' + (vis.action ? '' : ' hidden') + '>' + actionsEditDelete(r.id) + '</td>' +
        '</tr>';
    }).join('');
    return '<div class="et-card">' + toolbarHtml({ add: TAB_META.arrear.add, colsPop: true }) +
      '<div class="et-table-wrap">' +
      '<table class="et-table"><thead><tr>' + th + '</tr></thead><tbody>' + body + '</tbody></table>' +
      (rows.length ? '' : '<div class="et-empty">' + EMPTY_ICON + '</div>') +
      '</div>' + paginationHtml(rows.length) + '</div>';
  }

  function renderGenerate() {
    var rows = state.generate;
    var slice = pageSlice(rows);
    var body = slice.map(function (r, i) {
      var no = (state.page - 1) * state.pageSize + i + 1;
      var checked = state.selected[r.id] ? ' checked' : '';
      return '<tr><td><input type="checkbox" data-sel="' + esc(r.id) + '"' + checked + '></td><td>' + no + '</td><td>' + esc(r.month) + '</td><td>' + esc(r.name) + '</td>' +
        '<td class="et-num">' + formatNum(r.gross) + '</td><td>' + formatNum(r.ded) + '</td><td class="et-num">' + formatNum(r.tax) + '</td>' +
        '<td>' + r.days + '</td><td>' + esc(r.status) + '</td><td>' + formatNum(r.net) + '</td>' +
        '<td><button type="button" class="et-link et-link--action" data-row-generate="' + esc(r.id) + '">Generate</button></td></tr>';
    }).join('');
    return '<div class="et-card">' + toolbarHtml({ generate: true, cols: true }) +
      '<div class="et-table-wrap">' +
      '<table class="et-table"><thead><tr><th><input type="checkbox" id="etSelectAll"></th><th>#</th><th>Month</th><th>Employee Name</th><th>Gross Earnings</th><th>Deductions</th><th>Tax</th><th>Payable Days</th><th>Status</th><th>Net Payable</th><th>Action</th></tr></thead><tbody>' +
      body + '</tbody></table></div>' + paginationHtml(rows.length) + '</div>';
  }

  function renderReleased() {
    var rows = state.released;
    var slice = pageSlice(rows);
    var body = slice.map(function (r, i) {
      var no = (state.page - 1) * state.pageSize + i + 1;
      var checked = state.selected[r.id] ? ' checked' : '';
      return '<tr><td><input type="checkbox" data-sel="' + esc(r.id) + '"' + checked + '></td><td>' + no + '</td><td>' + esc(r.month) + '</td><td>' + esc(r.name) + '</td>' +
        '<td class="et-num">' + formatNum(r.gross) + '</td><td>' + formatNum(r.ded) + '</td><td class="et-num">' + formatNum(r.tax) + '</td>' +
        '<td>' + r.days + '</td><td>' + esc(r.status) + '</td><td>' + formatNum(r.net) + '</td>' +
        '<td><button type="button" class="et-link et-link--action" data-view-slip="' + esc(r.id) + '">View</button></td>' +
        '<td><button type="button" class="et-link et-link--action" data-row-revert="' + esc(r.id) + '">Revert</button></td></tr>';
    }).join('');
    return '<div class="et-card">' + toolbarHtml({ revert: true, cols: true }) +
      '<div class="et-table-wrap">' +
      '<table class="et-table"><thead><tr><th><input type="checkbox" id="etSelectAll"></th><th>#</th><th>Month</th><th>Employee Name</th><th>Gross Earnings</th><th>Deductions</th><th>Tax</th><th>Payable Days</th><th>Status</th><th>Net Payable</th><th>Salary Slip</th><th>Action</th></tr></thead><tbody>' +
      body + '</tbody></table></div>' + paginationHtml(rows.length) + '</div>';
  }

  function renderTax() {
    var rows = state.tax;
    var slice = pageSlice(rows);
    var body = slice.map(function (r, i) {
      var no = (state.page - 1) * state.pageSize + i + 1;
      return '<tr><td>' + no + '</td><td>(' + esc(r.code) + ') ' + esc(r.name) + '</td><td>' + esc(r.month) + '</td>' +
        '<td>' + r.annual + '</td><td>' + r.prev + '</td><td>' + esc(r.current) + '</td><td>' + r.till + '</td><td>' + r.balance + '</td><td>' + r.next + '</td>' +
        '<td><div class="et-actions"><button type="button" class="et-link" data-view-tax="' + esc(r.id) + '">View Tax</button><span class="et-actions__sep">|</span><button type="button" class="et-link" data-view-hra="' + esc(r.id) + '">View HRA</button></div></td></tr>';
    }).join('');
    return '<div class="et-card">' + toolbarHtml({ cols: true }) +
      '<div class="et-table-wrap">' +
      '<table class="et-table"><thead><tr><th>S. No.</th><th>Employee Name</th><th>Month</th><th>Total Annual Tax</th><th>Tax Deducted By Previous Employer</th><th>Tax Deducted by Current Employer</th><th>Total Tax Deducted Till Date</th><th>Balance Tax Deductible</th><th>Tax From Next Month</th><th>Actions</th></tr></thead><tbody>' +
      body + '</tbody></table></div>' + paginationHtml(rows.length) + '</div>';
  }

  function generateRow(id) {
    var idx = -1;
    state.generate.forEach(function (r, i) { if (r.id === id) idx = i; });
    if (idx === -1) return;
    var row = state.generate.splice(idx, 1)[0];
    state.release.unshift({
      id: 'rl' + Date.now(),
      month: row.month,
      name: row.name,
      gross: row.gross,
      ded: row.ded,
      tax: row.tax,
      days: row.days,
      status: 'GENERATED',
      net: row.net
    });
    toast('Generated', row.name + ' salary generated');
    render();
  }

  function releaseRow(id) {
    var idx = -1;
    state.release.forEach(function (r, i) { if (r.id === id) idx = i; });
    if (idx === -1) return;
    var row = state.release.splice(idx, 1)[0];
    state.released.unshift({
      id: 'r' + Date.now(),
      month: row.month,
      name: row.name,
      gross: row.gross,
      ded: row.ded,
      tax: row.tax,
      days: row.days,
      status: 'RELEASED',
      net: row.net
    });
    toast('Released', row.name + ' salary released');
    render();
  }

  function revertRow(id) {
    var idx = -1;
    state.released.forEach(function (r, i) { if (r.id === id) idx = i; });
    if (idx === -1) return;
    var row = state.released.splice(idx, 1)[0];
    state.release.unshift({
      id: 'rl' + Date.now(),
      month: row.month,
      name: row.name,
      gross: row.gross,
      ded: row.ded,
      tax: row.tax,
      days: row.days,
      status: 'GENERATED',
      net: row.net
    });
    toast('Reverted', row.name + ' moved back to Release');
    render();
  }

  function findReleasedRow(id) {
    return state.released.filter(function (r) { return r.id === id; })[0];
  }

  function salarySlipHtml(row) {
    var basic = Math.round(row.gross * 0.67);
    var hra = row.gross - basic;
    var rows = [
      ['Employee', row.name],
      ['Month', row.month],
      ['Payable Days', String(row.days)],
      ['Basic (₹)', formatNum(basic)],
      ['HRA (₹)', formatNum(hra)],
      ['Gross Earnings (₹)', formatNum(row.gross)],
      ['Deductions (₹)', formatNum(row.ded)],
      ['Tax (₹)', formatNum(row.tax)],
      ['Net Payable (₹)', formatNum(row.net)]
    ];
    return '<table class="et-detail-table"><tbody>' +
      rows.map(function (pair) { return '<tr><th>' + esc(pair[0]) + '</th><td>' + esc(pair[1]) + '</td></tr>'; }).join('') +
      '</tbody></table>';
  }

  function openSalarySlipModal(id) {
    var row = findReleasedRow(id);
    if (!row) return;
    var modal = document.getElementById('etSlipViewModal');
    var title = document.getElementById('etSlipViewTitle');
    var body = document.getElementById('etSlipViewBody');
    if (!modal || !title || !body) return;
    title.textContent = 'Salary Slip — ' + row.name + ' (' + row.month + ')';
    body.innerHTML = salarySlipHtml(row);
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function formatNum(n) {
    if (n === 0 || n === '0') return '0';
    return Number(n).toLocaleString('en-IN', { minimumFractionDigits: n % 1 ? 2 : 2, maximumFractionDigits: 2 });
  }

  function render() {
    if (!root) return;
    var html = '';
    switch (state.tab) {
      case 'payable': html = renderPayable(); break;
      case 'variable': html = renderVariable(); break;
      case 'additional': html = renderAdditional(); break;
      case 'tds': html = renderTds(); break;
      case 'hold': html = renderHold(); break;
      case 'generate': html = renderGenerate(); break;
      case 'release': html = renderRelease(); break;
      case 'released': html = renderReleased(); break;
      case 'arrear': html = renderArrear(); break;
      case 'tax': html = renderTax(); break;
      default: html = renderPayable();
    }
    root.innerHTML = html;
    bindDynamic();
    if (state.tab === 'arrear' && state.arrearColsOpen) renderArrearColsList();
  }

  function findTaxRow(id) {
    return state.tax.filter(function (r) { return r.id === id; })[0];
  }

  function taxDetailHtml(row) {
    var d = row.taxDetail || {};
    var rows = [
      ['Tax Regime', d.regime || '—'],
      ['Gross Taxable Income (₹)', formatNum(d.gross || 0)],
      ['Standard Deduction (₹)', formatNum(d.stdDed || 0)],
      ['Chapter VI-A Deductions (₹)', formatNum(d.chapter6 || 0)],
      ['Net Taxable Income (₹)', formatNum(d.netTaxable || 0)],
      ['Tax on Income (₹)', formatNum(d.taxOnIncome || 0)],
      ['Education Cess (₹)', formatNum(d.cess || 0)],
      ['Total Tax Liability (₹)', formatNum(d.total || row.annual || 0)],
      ['Tax Deducted Till Date (₹)', formatNum(row.till || 0)],
      ['Balance Tax (₹)', formatNum(row.balance || 0)]
    ];
    return '<table class="et-detail-table"><tbody>' +
      rows.map(function (pair) { return '<tr><th>' + esc(pair[0]) + '</th><td>' + esc(pair[1]) + '</td></tr>'; }).join('') +
      '</tbody></table>';
  }

  function hraDetailHtml(row) {
    var d = row.hraDetail || {};
    var rows = [
      ['City Type', d.city || '—'],
      ['Basic Salary — Annual (₹)', formatNum(d.basic || 0)],
      ['HRA Received (₹)', formatNum(d.hraReceived || 0)],
      ['Rent Paid (₹)', formatNum(d.rentPaid || 0)],
      ['HRA Exemption (₹)', formatNum(d.exemption || 0)],
      ['Taxable HRA (₹)', formatNum(d.taxable || 0)]
    ];
    return '<table class="et-detail-table"><tbody>' +
      rows.map(function (pair) { return '<tr><th>' + esc(pair[0]) + '</th><td>' + esc(pair[1]) + '</td></tr>'; }).join('') +
      '</tbody></table>';
  }

  function openTaxViewModal(id) {
    var row = findTaxRow(id);
    if (!row) return;
    var modal = document.getElementById('etTaxViewModal');
    var title = document.getElementById('etTaxViewTitle');
    var body = document.getElementById('etTaxViewBody');
    if (!modal || !title || !body) return;
    title.textContent = 'Tax Computation — (' + row.code + ') ' + row.name;
    body.innerHTML = taxDetailHtml(row);
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function openHraViewModal(id) {
    var row = findTaxRow(id);
    if (!row) return;
    var modal = document.getElementById('etHraViewModal');
    var title = document.getElementById('etHraViewTitle');
    var body = document.getElementById('etHraViewBody');
    if (!modal || !title || !body) return;
    title.textContent = 'HRA Computation — (' + row.code + ') ' + row.name;
    body.innerHTML = hraDetailHtml(row);
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function openModal(which, title) {
    var map = { payable: 'etPayableModal', hold: 'etHoldModal', generic: 'etGenericModal', taxView: 'etTaxViewModal', hraView: 'etHraViewModal', slipView: 'etSlipViewModal' };
    var id = map[which];
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    if (which === 'generic' && title) {
      var t = document.getElementById('etGenericTitle');
      if (t) t.textContent = title;
    }
    el.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal(which) {
    var map = { payable: 'etPayableModal', hold: 'etHoldModal', generic: 'etGenericModal', taxView: 'etTaxViewModal', hraView: 'etHraViewModal', slipView: 'etSlipViewModal' };
    var el = document.getElementById(map[which] || which);
    if (el) el.hidden = true;
    if (!document.querySelector('.et-modal:not([hidden])')) document.body.style.overflow = '';
  }

  function placeConfirmPop(pop, anchor) {
    if (!pop || !anchor) return;
    pop.hidden = false;
    var rect = anchor.getBoundingClientRect();
    var popW = pop.offsetWidth || 320;
    var popH = pop.offsetHeight || 100;
    var left = rect.right - popW;
    var top = rect.top - popH - 10;
    if (left < 8) left = 8;
    if (left + popW > window.innerWidth - 8) left = window.innerWidth - popW - 8;
    if (top < 8) top = rect.bottom + 10;
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
  }

  function openDeletePop(anchor, id) {
    if (!delPop || !anchor) return;
    state.deleteId = id;
    state.deleteTab = state.tab;
    placeConfirmPop(delPop, anchor);
  }

  function closeDeletePop() {
    if (!delPop) return;
    delPop.hidden = true;
    state.deleteId = null;
    state.deleteTab = null;
  }

  function confirmDelete() {
    var id = state.deleteId;
    var tab = state.deleteTab;
    if (!id) { closeDeletePop(); return; }
    if (tab === 'payable') {
      var row = state.payable.filter(function (r) { return r.id === id; })[0];
      if (row && row.status === 'Updated') {
        row.paid = row.hrms;
        row.status = 'HRMS';
        toast('Deleted', 'Manual update removed');
      } else if (row) {
        toast('Info', 'No manual update to delete');
      } else {
        toast('Deleted', 'Payable days entry removed');
      }
    } else if (state[tab] && Array.isArray(state[tab])) {
      state[tab] = state[tab].filter(function (r) { return r.id !== id; });
      toast('Deleted', 'Record removed');
    }
    closeDeletePop();
    render();
  }

  function bindDynamic() {
    var empInput = document.getElementById('etEmpInput');
    var empList = document.getElementById('etEmpList');
    if (empInput) {
      empInput.addEventListener('focus', function () { state.empOpen = true; state.empQuery = empInput.value; render(); setTimeout(function () { var i = document.getElementById('etEmpInput'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }, 0); });
      empInput.addEventListener('input', function () { state.empQuery = empInput.value; state.employee = ''; state.empOpen = true; state.page = 1; render(); setTimeout(function () { var i = document.getElementById('etEmpInput'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }, 0); });
    }
    if (empList) {
      empList.querySelectorAll('[data-emp]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          state.employee = btn.getAttribute('data-emp');
          state.empQuery = state.employee;
          state.empOpen = false;
          state.page = 1;
          render();
        });
      });
    }

    document.querySelectorAll('[data-month-nav]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var d = Number(btn.getAttribute('data-month-nav'));
        state.month += d;
        if (state.month > 12) { state.month = 1; state.year += 1; }
        if (state.month < 1) { state.month = 12; state.year -= 1; }
        state.monthOpen = false;
        render();
      });
    });

    var monthBtn = document.getElementById('etMonthBtn');
    if (monthBtn) monthBtn.addEventListener('click', function () { state.monthOpen = !state.monthOpen; render(); });

    document.querySelectorAll('[data-year-nav]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        state.year += Number(btn.getAttribute('data-year-nav'));
        render();
      });
    });
    document.querySelectorAll('[data-pick-month]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        state.month = Number(btn.getAttribute('data-pick-month'));
        state.monthOpen = false;
        render();
      });
    });

    var addBtn = document.querySelector('[data-action="add"]');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        var meta = TAB_META[state.tab];
        if (!meta || !meta.modal) return;
        openModal(meta.modal, meta.title);
      });
    }

    document.querySelectorAll('[data-action="excel"]').forEach(function (b) {
      b.addEventListener('click', function () { toast('Export', 'Excel export started for ' + state.tab); });
    });
    document.querySelectorAll('[data-action="cols"], [data-action="filter"]').forEach(function (b) {
      b.addEventListener('click', function () { toast('Columns / Filter', 'Layout options coming soon'); });
    });
    document.querySelectorAll('[data-action="unhold"]').forEach(function (b) {
      b.addEventListener('click', function () { toast('Un Hold', 'Selected holds released'); });
    });
    document.querySelectorAll('[data-action="bulk-generate"]').forEach(function (b) {
      b.addEventListener('click', function () { toast('Generate', 'Salary generation queued'); });
    });
    document.querySelectorAll('[data-action="bulk-release"]').forEach(function (b) {
      b.addEventListener('click', function () { toast('Release', 'Selected salaries released'); });
    });
    document.querySelectorAll('[data-action="bulk-revert"]').forEach(function (b) {
      b.addEventListener('click', function () { toast('Revert', 'Selected salaries reverted'); });
    });

    document.querySelectorAll('[data-edit]').forEach(function (b) {
      b.addEventListener('click', function () {
        var meta = TAB_META[state.tab];
        openModal(meta && meta.modal ? meta.modal : 'payable', meta && meta.title);
        toast('Edit', 'Editing record');
      });
    });
    document.querySelectorAll('[data-delete]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        openDeletePop(b, b.getAttribute('data-delete'));
      });
    });

    document.querySelectorAll('[data-row-release]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        releaseRow(b.getAttribute('data-row-release'));
      });
    });

    document.querySelectorAll('[data-row-generate]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        generateRow(b.getAttribute('data-row-generate'));
      });
    });
    document.querySelectorAll('[data-row-revert]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        revertRow(b.getAttribute('data-row-revert'));
      });
    });
    document.querySelectorAll('[data-view-slip]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        openSalarySlipModal(b.getAttribute('data-view-slip'));
      });
    });
    document.querySelectorAll('[data-view-tax]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        openTaxViewModal(b.getAttribute('data-view-tax'));
      });
    });
    document.querySelectorAll('[data-view-hra]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        openHraViewModal(b.getAttribute('data-view-hra'));
      });
    });

    document.querySelectorAll('[data-sel]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        if (cb.checked) state.selected[cb.getAttribute('data-sel')] = true;
        else delete state.selected[cb.getAttribute('data-sel')];
      });
    });
    var selAll = document.getElementById('etSelectAll');
    if (selAll) {
      selAll.addEventListener('change', function () {
        var list = state.tab === 'generate' ? state.generate : state.tab === 'release' ? state.release : state.tab === 'hold' ? state.hold : state.released;
        list.forEach(function (r) {
          if (selAll.checked) state.selected[r.id] = true;
          else delete state.selected[r.id];
        });
        render();
      });
    }

    var pageSize = document.getElementById('etPageSize');
    if (pageSize) {
      pageSize.addEventListener('change', function () {
        state.pageSize = Number(pageSize.value) || 10;
        state.page = 1;
        render();
      });
    }
    document.querySelectorAll('[data-page-nav]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.disabled) return;
        state.page += Number(btn.getAttribute('data-page-nav'));
        render();
      });
    });
  }

  function bindTabs() {
    document.querySelectorAll('.et-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        closeDeletePop();
        closeArrearColsPop();
        state.tab = tab.getAttribute('data-tab');
        state.page = 1;
        state.selected = {};
        state.empOpen = false;
        state.monthOpen = false;
        document.querySelectorAll('.et-tab').forEach(function (t) {
          var on = t === tab;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        render();
      });
    });
  }

  function bindModals() {
    document.querySelectorAll('[data-et-close]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(el.getAttribute('data-et-close')); });
    });
    fillSelect(document.getElementById('etPayableEmp'));
    fillSelect(document.getElementById('etHoldEmp'));
    fillSelect(document.getElementById('etGenericEmp'));

    var payableForm = document.getElementById('etPayableForm');
    if (payableForm) {
      payableForm.addEventListener('submit', function () {
        var emp = payableForm.employee.value;
        var days = payableForm.days.value;
        if (!emp || !days) { toast('Required', 'Employee and Payable Days are required'); return; }
        var e = EMPLOYEES.find(function (x) { return x.code === emp; });
        state.payable.unshift({
          id: 'p' + Date.now(),
          name: e ? e.name : emp,
          month: monthDisplay(payableForm.month.value ? payableForm.month.value.slice(5) + '/' + payableForm.month.value.slice(0, 4) : null),
          remark: payableForm.reason.value || '--',
          hrms: 0,
          paid: Number(days),
          status: 'Updated'
        });
        payableForm.reset();
        closeModal('payable');
        toast('Saved', 'Payable days added');
        if (state.tab === 'payable') render();
      });
    }

    var holdForm = document.getElementById('etHoldForm');
    if (holdForm) {
      holdForm.addEventListener('submit', function () {
        if (!holdForm.employee.value || !holdForm.fromMonth.value || !holdForm.toMonth.value) {
          toast('Required', 'Employees, From Month and To Month are required');
          return;
        }
        holdForm.reset();
        closeModal('hold');
        toast('Saved', 'Hold salary days added');
      });
    }

    var genericForm = document.getElementById('etGenericForm');
    if (genericForm) {
      genericForm.addEventListener('submit', function () {
        if (!genericForm.employee.value) { toast('Required', 'Employee is required'); return; }
        genericForm.reset();
        closeModal('generic');
        toast('Saved', 'Record added');
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDeletePop();
        closeModal('payable');
        closeModal('hold');
        closeModal('generic');
        closeModal('taxView');
        closeModal('hraView');
        closeModal('slipView');
        if (state.empOpen || state.monthOpen) { state.empOpen = false; state.monthOpen = false; render(); }
      }
    });

    document.addEventListener('click', function (e) {
      if (delPop && !delPop.hidden && !e.target.closest('#etDelPop') && !e.target.closest('[data-delete]')) closeDeletePop();
      if (state.arrearColsOpen && root && !e.target.closest('.et-cols-wrap')) closeArrearColsPop();
      if (state.empOpen && !e.target.closest('#etEmpCombo')) { state.empOpen = false; render(); }
      if (state.monthOpen && !e.target.closest('.et-month')) { state.monthOpen = false; render(); }
    });

    if (root && !root.dataset.colsBound) {
      root.dataset.colsBound = '1';
      root.addEventListener('click', function (e) {
        var colsBtn = e.target.closest('[data-cols-btn]');
        if (colsBtn && state.tab === 'arrear') {
          e.stopPropagation();
          state.arrearColsOpen = !state.arrearColsOpen;
          render();
          return;
        }
        if (e.target.closest('[data-select-all-cols]') && state.tab === 'arrear') {
          e.stopPropagation();
          ARREAR_COLS.forEach(function (c) { state.arrearVisible[c.id] = true; });
          render();
          return;
        }
        if (e.target.closest('.et-pop--columns')) e.stopPropagation();
      });
      root.addEventListener('change', function (e) {
        if (!e.target.matches('[data-col-toggle]') || state.tab !== 'arrear') return;
        state.arrearVisible[e.target.getAttribute('data-col-toggle')] = e.target.checked;
        applyArrearColVis();
        renderArrearColsList();
      });
    }

    if (delNo) delNo.addEventListener('click', function (e) { e.stopPropagation(); closeDeletePop(); });
    if (delYes) delYes.addEventListener('click', function (e) { e.stopPropagation(); confirmDelete(); });
    if (delPop) delPop.addEventListener('click', function (e) { e.stopPropagation(); });
    window.addEventListener('scroll', closeDeletePop, true);
    window.addEventListener('resize', closeDeletePop);
  }

  function bindTopbar() {
    var clock = document.getElementById('etTopClock');
    function tick() {
      if (!clock) return;
      var d = new Date();
      clock.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
      clock.setAttribute('datetime', d.toISOString());
    }
    tick();
    setInterval(tick, 1000);

    var btn = document.getElementById('etTopCheckInBtn');
    if (btn) {
      btn.addEventListener('click', function () {
        state.checkedIn = !state.checkedIn;
        btn.textContent = state.checkedIn ? 'Check Out' : 'Check In';
        btn.classList.toggle('is-out', state.checkedIn);
        btn.classList.toggle('is-in', !state.checkedIn);
        toast(state.checkedIn ? 'Checked In' : 'Checked Out', new Date().toLocaleTimeString());
      });
    }
  }

  /* month picker styles injected once */
  (function injectPickerCss() {
    if (document.getElementById('etPickerCss')) return;
    var s = document.createElement('style');
    s.id = 'etPickerCss';
    s.textContent = '.et-month{position:relative}.et-month-picker{position:absolute;right:36px;top:calc(100% + 4px);z-index:40;width:220px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;box-shadow:0 8px 24px rgba(15,23,42,.12);padding:10px}' +
      '.et-month-picker__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:13px}' +
      '.et-month-picker__head button{border:0;background:transparent;color:#8c8c8c;cursor:pointer;padding:4px 6px}' +
      '.et-month-picker__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:4px}' +
      '.et-month-picker__cell{border:0;background:transparent;padding:8px 4px;border-radius:6px;font:inherit;font-size:12px;color:#434343;cursor:pointer}' +
      '.et-month-picker__cell:hover{background:#f5f5f5}.et-month-picker__cell.is-active{background:#25b7a7;color:#fff}';
    document.head.appendChild(s);
  })();

  bindTabs();
  bindModals();
  bindTopbar();
  render();
})();
