/**
 * TIME ERP — Account Settings
 * Tabs: DropDown | Salary Ingredients | Constant Deduction | Pay Details | Overhead | Manual Costing | Expense Limit
 */
(function () {
  'use strict';

  var CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
  var COLS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M5 9.33h14M5 14.67h14"/><path d="M8 6.85h5M8 12h5M8 17.15h5"/></svg>';
  var COLS_TABLE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M5 9.33h14M5 14.67h14"/><path d="M8 6.85h5M8 12h5M8 17.15h5"/></svg>';
  var COLS_CHEV = '<svg class="as-cols-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var COLS_BTN = COLS_ICON + COLS_CHEV;
  var DRAG_DOTS = '<span class="as-col-drag" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></span>';
  var FILTER_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5h16l-6 7v5l-4 2v-7L4 5z"/></svg>';
  var EMPTY_ICON = '<div class="as-empty__icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M10 28l6-8h32l6 8"/><path d="M10 28h44v22a4 4 0 01-4 4H14a4 4 0 01-4-4V28z"/><path d="M10 28h14l4 6h12l4-6h14"/></svg></div><p>No data</p>';

  var DROPDOWN_NAMES = ['Additional Pay', 'Expense Type', 'Overhead Expense', 'Payment Options', 'Variable Deductions'];
  var EMPLOYEES = ['Saurabh Bhardwaj', 'CA Ram Sharma', 'CA Rakesh Sharma', 'CA ram Kumar', 'Dev Aggarwal', 'Kamal Kant Sharma', 'SONIYA KASHYAP', 'Riya Sharma', 'Aman Verma', 'Tarun Gaur'];
  var OVERHEAD_COMPS = ['4564', 'Electronic Equipments', 'Rent', 'snacks', 'Special allowances', 'TA', 'Tea / Coffee'];
  var COMPONENT_TYPES = ['Formula Based', 'Value Wise'];
  var NATURE_TYPES = ['Monthly', 'Yearly', 'Quarterly', 'Half Yearly', 'Lifetime'];
  var DED_FY_OPTIONS = (function () {
    var list = [];
    for (var y = 25; y >= 9; y--) list.push('FY ' + y + '-' + String(y + 1).slice(-2));
    return list;
  })();
  var DED_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DEFAULT_PAY_COMPONENTS = [{ component: 'Basic', nature: 'MONTHLY', value: 10000 }];
  var DEFAULT_OVERHEAD_DETAILS = [
    { component: 'DA', value: 100 },
    { component: 'Rent', value: 100 },
    { component: 'TA', value: 100 }
  ];
  var PAY_COMP_TEMPLATE = [
    { name: 'Basic', value: 10000, enabled: true },
    { name: 'HRA', value: '', enabled: false }
  ];
  var PAYMENT_MODES = ['Bank Account', 'NEFT', 'RTGS', 'Cash', 'Cheque'];
  var AY_OPTIONS = (function () {
    var list = [];
    for (var y = 28; y >= 10; y--) list.push('AY ' + (y < 10 ? '0' + y : y) + '-' + String(y + 1).slice(-2));
    return list;
  })();

  var SALARY_COLS = [
    { id: 'no', label: '#' }, { id: 'name', label: 'Name' }, { id: 'employeeHead', label: 'Employee Head' },
    { id: 'order', label: 'Order' }, { id: 'componentType', label: 'Component Type' },
    { id: 'ingredient', label: 'Salary Ingredient' }, { id: 'fy', label: 'Financial Year' }, { id: 'percent', label: 'Percentage' },
    { id: 'upperLimit', label: 'Upper Limit' }, { id: 'rounding', label: 'Rounding' }, { id: 'nature', label: 'Nature' },
    { id: 'taxStatus', label: 'Tax Status' }, { id: 'showPayslip', label: 'Show in Payslip' }, { id: 'action', label: 'Action' }
  ];
  var DEDUCTION_COLS = [
    { id: 'no', label: '#' }, { id: 'name', label: 'Name' }, { id: 'employeeHead', label: 'Employee Head' },
    { id: 'order', label: 'Order' }, { id: 'month', label: 'Month' }, { id: 'deductionType', label: 'Deduction Type' },
    { id: 'applicableOn', label: 'Applicable on' }, { id: 'fy', label: 'Financial Year' }, { id: 'percent', label: 'Percent' },
    { id: 'maxValue', label: 'Max Value' }, { id: 'rounding', label: 'Rounding' }, { id: 'type', label: 'Type' },
    { id: 'taxStatus', label: 'Tax Status' }, { id: 'showPayslip', label: 'Show in Payslip' }, { id: 'action', label: 'Action' }
  ];
  var PAY_COLS = [
    { id: 'check', label: '' }, { id: 'no', label: '#' }, { id: 'employee', label: 'Employee Name' },
    { id: 'validFrom', label: 'Valid From' }, { id: 'paymentMode', label: 'Payment Mode' }, { id: 'accountName', label: 'Account Name' },
    { id: 'bankAccount', label: 'Bank Account Number' }, { id: 'ifsc', label: 'IFSC Code' },
    { id: 'deductions', label: 'Constant Deductions' }, { id: 'salaryComponent', label: 'Salary Component' },
    { id: 'notes', label: 'Notes' }, { id: 'status', label: 'Status' }, { id: 'action', label: 'Action' }
  ];

  var state = {
    tab: 'dropdown',
    page: 1,
    pageSize: 10,
    search: '',
    status: 'Active',
    employee: '',
    columnsOpen: false,
    filterOpen: false,
    salaryFilters: { component: {}, nature: {}, tax: {} },
    filterAccOpen: { component: false, nature: false, tax: false },
    nameOpen: false,
    valueOpen: false,
    nameQuery: '',
    checkedIn: false,
    selectedPay: {},
    dropdownName: 'Additional Pay',
    dropdownValue: '',
    dropdowns: {
      'Additional Pay': ['0', '0%', '2.5', '9', '6', '9%'],
      'Expense Type': ['Travel', 'Food', 'Fuel', 'Internet', 'Stationery'],
      'Overhead Expense': ['Rent', 'Electricity', 'Internet', 'Maintenance'],
      'Payment Options': ['Bank Account', 'NEFT', 'RTGS', 'Cash', 'Cheque'],
      'Variable Deductions': ['Advance', 'Loan EMI', 'Other']
    },
    salaryVisible: {},
    salaryColOrder: null,
    salaryEditId: null,
    deductionEditId: null,
    deductionFySelected: [],
    deductionMonthOpen: false,
    deductionMonthYear: 2026,
    deductionMonthValue: '',
    payEditId: null,
    payCompRows: [],
    payDedTags: [],
    payMonthOpen: false,
    payMonthYear: 2026,
    payMonthValue: '',
    overheadEditId: null,
    overheadCompRows: [],
    overheadMonthOpen: false,
    overheadMonthYear: 2026,
    overheadMonthValue: '',
    manualEditId: null,
    manualMonthOpen: false,
    manualMonthYear: 2026,
    manualMonthValue: '',
    manualEmployee: '',
    salaryDdOpen: null,
    salaryDdQuery: { componentType: '', nature: '' },
    salaryFySelected: [],
    salary: [
      { id: 's1', name: 'Basic', employeeHead: 'Basic', order: 1, componentType: 'Value Wise', ingredient: '--', fy: AY_OPTIONS.slice(), percent: '--', upperLimit: '--', rounding: '--', nature: 'Monthly', taxStatus: 'Taxable', showPayslip: 'Yes' },
      { id: 's2', name: 'HRA', employeeHead: 'HRA', order: 2, componentType: 'Formula Based', ingredient: 'Basic', fy: AY_OPTIONS.slice(), percent: '40', upperLimit: '--', rounding: 'Round Off', nature: 'Monthly', taxStatus: 'Taxable', showPayslip: 'Yes' }
    ],
    deductions: [
      { id: 'd1', name: 'Professional Tax', employeeHead: 'Professional Tax', order: 2, month: '2025-04-24', startMonth: '04/2025', deductionType: 'Value Wise', applicableOn: '--', fy: ['FY 25-26', 'FY 24-25', 'FY 23-24', 'FY 22-23', 'FY 21-22'], percent: '--', maxValue: '200', value: '200', rounding: '--', type: 'Monthly', taxStatus: 'Non-Deductible', showPayslip: 'Yes', attachTax: false, deductFixed: true },
      { id: 'd2', name: 'PF', employeeHead: 'Deduction', order: 2, month: '2024-01-04', deductionType: 'Formula Based', applicableOn: 'Basic', fy: ['AY 26-27', 'AY 25-26'], percent: '12', maxValue: '1800', rounding: 'ROUND_OFF', type: 'MONTHLY', taxStatus: 'No', showPayslip: 'Yes' },
      { id: 'd3', name: 'ESI', employeeHead: 'Deduction', order: 3, month: '2024-01-04', deductionType: 'Formula Based', applicableOn: 'Basic, HRA', fy: ['AY 26-27'], percent: '0.75', maxValue: '--', rounding: 'ROUND_OFF', type: 'MONTHLY', taxStatus: 'No', showPayslip: 'Yes' }
    ],
    pay: [
      { id: 'p1', employee: 'Saurabh Bhardwaj', validFrom: '01/04/2024', validFromMonth: '04-2024', paymentMode: 'Bank Account', accountName: 'Saurabh Bhardwaj', bankAccount: '20221691543', ifsc: 'SBIN0051016', pan: '', uan: '', aadhar: '', deductions: 'Professional Tax', deductionTags: ['Professional Tax'], notes: 'ok', status: 'Verified', payCompRows: [{ name: 'Basic', value: 10000, enabled: true }, { name: 'HRA', value: '', enabled: false }], components: [{ component: 'Basic', nature: 'MONTHLY', value: 10000 }] },
      { id: 'p2', employee: 'CA Ram Sharma', validFrom: '01/04/2024', validFromMonth: '04-2024', paymentMode: 'NEFT', accountName: 'CA Ram Sharma', bankAccount: '987654321098', ifsc: 'SBIN0002211', pan: '', uan: '', aadhar: '', deductions: '--', deductionTags: [], notes: '--', status: 'Verified', payCompRows: [{ name: 'Basic', value: 10000, enabled: true }, { name: 'HRA', value: '', enabled: false }], components: [{ component: 'Basic', nature: 'MONTHLY', value: 10000 }] },
      { id: 'p3', employee: 'Dev Aggarwal', validFrom: '01/05/2024', validFromMonth: '05-2024', paymentMode: 'RTGS', accountName: 'Dev Aggarwal', bankAccount: '--', ifsc: '--', pan: '', uan: '', aadhar: '', deductions: 'Professional Tax', deductionTags: ['Professional Tax'], notes: 'ok', status: 'Verified', payCompRows: [{ name: 'Basic', value: 10000, enabled: true }, { name: 'HRA', value: '', enabled: false }], components: [{ component: 'Basic', nature: 'MONTHLY', value: 10000 }] },
      { id: 'p4', employee: 'Kamal Kant Sharma', validFrom: '01/04/2025', validFromMonth: '04-2025', paymentMode: 'Cash', accountName: 'Kamal Kant Sharma', bankAccount: '--', ifsc: '--', pan: '', uan: '', aadhar: '', deductions: '--', deductionTags: [], notes: '--', status: 'Verified', payCompRows: [{ name: 'Basic', value: 10000, enabled: true }, { name: 'HRA', value: '', enabled: false }], components: [{ component: 'Basic', nature: 'MONTHLY', value: 10000 }] },
      { id: 'p5', employee: 'Riya Sharma', validFrom: '01/06/2025', validFromMonth: '06-2025', paymentMode: 'Cheque', accountName: 'Riya Sharma', bankAccount: '112233445566', ifsc: 'ICIC0007788', pan: '', uan: '', aadhar: '', deductions: '--', deductionTags: [], notes: 'ok', status: 'Verified', payCompRows: [{ name: 'Basic', value: 10000, enabled: true }, { name: 'HRA', value: '', enabled: false }], components: [{ component: 'Basic', nature: 'MONTHLY', value: 10000 }] }
    ],
    overhead: [
      { id: 'o1', employee: 'Saurabh Bhardwaj', validFrom: '01/04/2026', validFromMonth: '03-2025', status: 'Active', compRows: [{ name: '4564', value: '', enabled: false }, { name: 'Electronic Equipments', value: '', enabled: false }, { name: 'Rent', value: 100, enabled: true }, { name: 'snacks', value: '', enabled: false }, { name: 'Special allowances', value: '', enabled: false }, { name: 'TA', value: 100, enabled: true }, { name: 'Tea / Coffee', value: '', enabled: false }], components: [{ component: 'Rent', value: 100 }, { component: 'TA', value: 100 }] },
      { id: 'o2', employee: 'CA Ram Sharma', validFrom: '01/05/2026', validFromMonth: '05-2026', status: 'Active', compRows: null, components: DEFAULT_OVERHEAD_DETAILS.slice() },
      { id: 'o3', employee: 'Dev Aggarwal', validFrom: '01/06/2026', validFromMonth: '06-2026', status: 'Active', compRows: null, components: DEFAULT_OVERHEAD_DETAILS.slice() },
      { id: 'o4', employee: 'Kamal Kant Sharma', validFrom: '01/07/2026', validFromMonth: '07-2026', status: 'Active', compRows: null, components: DEFAULT_OVERHEAD_DETAILS.slice() },
      { id: 'o5', employee: 'Riya Sharma', validFrom: '01/08/2026', validFromMonth: '08-2026', status: 'Active', compRows: null, components: DEFAULT_OVERHEAD_DETAILS.slice() }
    ],
    manual: [
      { id: 'm1', employee: 'CA Rakesh Sharma', employeeCode: '4353', perMinute: '50.00', month: 'Feb 2026', monthKey: 'Feb-2026' },
      { id: 'm2', employee: 'CA ram Kumar', employeeCode: '4354', perMinute: '40.00', month: 'Feb 2026', monthKey: 'Feb-2026' },
      { id: 'm3', employee: 'Saurabh Bhardwaj', employeeCode: '4355', perMinute: '100.00', month: 'Jan 2026', monthKey: 'Jan-2026' },
      { id: 'm4', employee: 'CA Ram Sharma', employeeCode: '4356', perMinute: '75.00', month: 'Jan 2026', monthKey: 'Jan-2026' },
      { id: 'm5', employee: 'Dev Aggarwal', employeeCode: '4357', perMinute: '60.00', month: 'Dec 2025', monthKey: 'Dec-2025' },
      { id: 'm6', employee: 'Kamal Kant Sharma', employeeCode: '4358', perMinute: '55.00', month: 'Dec 2025', monthKey: 'Dec-2025' },
      { id: 'm7', employee: 'Riya Sharma', employeeCode: '4359', perMinute: '45.00', month: 'Nov 2025', monthKey: 'Nov-2025' },
      { id: 'm8', employee: 'Aman Verma', employeeCode: '4360', perMinute: '35.00', month: 'Nov 2025', monthKey: 'Nov-2025' },
      { id: 'm9', employee: 'Tarun Gaur', employeeCode: '4361', perMinute: '30.00', month: 'Oct 2025', monthKey: 'Oct-2025' },
      { id: 'm10', employee: 'SONIYA KASHYAP', employeeCode: '4362', perMinute: '25.00', month: 'Jan 2025', monthKey: 'Jan-2025' },
      { id: 'm11', employee: 'CA Rakesh Sharma', employeeCode: '4353', perMinute: '50.00', month: 'Jan 2025', monthKey: 'Jan-2025' },
      { id: 'm12', employee: 'Dev Aggarwal', employeeCode: '4357', perMinute: '60.00', month: 'Mar 2025', monthKey: 'Mar-2025' }
    ],
    limits: []
  };

  SALARY_COLS.forEach(function (c) { state.salaryVisible[c.id] = true; });
  state.salaryColOrder = SALARY_COLS.map(function (c) { return c.id; });

  var els = {
    dynamic: document.getElementById('asDynamic'),
    tabs: Array.prototype.slice.call(document.querySelectorAll('.as-tab')),
    topCheckIn: document.getElementById('asTopCheckInBtn'),
    topClock: document.getElementById('asTopClock'),
    salaryModal: document.getElementById('asSalaryModal'),
    deductionModal: document.getElementById('asDeductionModal'),
    overheadModal: document.getElementById('asOverheadModal'),
    manualModal: document.getElementById('asManualModal'),
    limitModal: document.getElementById('asLimitModal'),
    fyViewModal: document.getElementById('asFyViewModal'),
    fyViewGrid: document.getElementById('asFyViewGrid'),
    salaryDetailsModal: document.getElementById('asSalaryDetailsModal'),
    salaryDetailsBody: document.getElementById('asSalaryDetailsBody'),
    salaryDetailsGross: document.getElementById('asSalaryDetailsGross'),
    payModal: document.getElementById('asPayModal'),
    payForm: document.getElementById('asPayForm'),
    payValidFrom: document.getElementById('asPayValidFrom'),
    payEmployee: document.getElementById('asPayEmployee'),
    payCompRows: document.getElementById('asPayCompRows'),
    payGross: document.getElementById('asPayGross'),
    payDedTags: document.getElementById('asPayDedTags'),
    payMonthPop: document.getElementById('asPayMonthPop'),
    payMonthGrid: document.getElementById('asPayMonthGrid'),
    payMonthYear: document.getElementById('asPayMonthYear'),
    payMonthBtn: document.getElementById('asPayMonthBtn'),
    overheadDetailsModal: document.getElementById('asOverheadDetailsModal'),
    overheadDetailsBody: document.getElementById('asOverheadDetailsBody'),
    salaryForm: document.getElementById('asSalaryForm'),
    deductionForm: document.getElementById('asDeductionForm'),
    dedStartMonth: document.getElementById('asDedStartMonth'),
    dedStartMonthVal: document.getElementById('asDedStartMonthVal'),
    dedMonthPop: document.getElementById('asDedMonthPop'),
    dedMonthGrid: document.getElementById('asDedMonthGrid'),
    dedMonthYear: document.getElementById('asDedMonthYear'),
    dedMonthBtn: document.getElementById('asDedMonthBtn'),
    overheadForm: document.getElementById('asOverheadForm'),
    manualForm: document.getElementById('asManualForm'),
    limitForm: document.getElementById('asLimitForm'),
    overheadComps: document.getElementById('asOverheadComponents'),
    overheadEmp: document.getElementById('asOverheadEmp'),
    ohValidFrom: document.getElementById('asOhValidFrom'),
    ohMonthPop: document.getElementById('asOhMonthPop'),
    ohMonthGrid: document.getElementById('asOhMonthGrid'),
    ohMonthYear: document.getElementById('asOhMonthYear'),
    ohMonthBtn: document.getElementById('asOhMonthBtn'),
    manualEmp: document.getElementById('asManualEmp'),
    manualMonth: document.getElementById('asManualMonth'),
    manualMonthPop: document.getElementById('asManualMonthPop'),
    manualMonthGrid: document.getElementById('asManualMonthGrid'),
    manualMonthYear: document.getElementById('asManualMonthYear'),
    manualMonthBtn: document.getElementById('asManualMonthBtn'),
    manualEmpField: document.getElementById('asManualEmpField'),
    manualEmpReadonly: document.getElementById('asManualEmpReadonly'),
    manualEmpReadonlyInput: document.getElementById('asManualEmpReadonlyInput')
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

  function actionsHtml(id, kind) {
    return '<div class="as-actions">' +
      '<button type="button" class="as-action as-action--edit" data-as="edit" data-kind="' + kind + '" data-id="' + escapeHtml(id) + '">Edit</button>' +
      '<span class="as-actions__sep">|</span>' +
      '<button type="button" class="as-action as-action--del" data-as="delete" data-kind="' + kind + '" data-id="' + escapeHtml(id) + '">Delete</button>' +
    '</div>';
  }

  function paginationHtml(total) {
    var totalPages = Math.max(1, Math.ceil(total / state.pageSize) || 1);
    if (state.page > totalPages) state.page = totalPages;
    var start = (state.page - 1) * state.pageSize;
    var shown = total ? Math.min(start + state.pageSize, total) : 0;
    return '<footer class="as-pagination">' +
      '<div class="as-pagination__left"><select class="as-page-size" data-as="pageSize">' +
        [10, 20, 25, 50].map(function (n) { return '<option value="' + n + '"' + (state.pageSize === n ? ' selected' : '') + '>' + n + '</option>'; }).join('') +
      '</select></div>' +
      '<div class="as-pagination__center">' +
        '<button type="button" class="as-page-nav" data-as="prev"' + (state.page <= 1 ? ' disabled' : '') + '><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>' +
        '<input type="text" class="as-page-input" value="' + state.page + '" readonly>' +
        '<span class="as-page-of">of ' + totalPages + '</span>' +
        '<button type="button" class="as-page-nav" data-as="next"' + (state.page >= totalPages ? ' disabled' : '') + '><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>' +
      '</div>' +
      '<div class="as-pagination__right"><span class="as-count">' + shown + ' / ' + total + '</span></div>' +
    '</footer>';
  }

  function pageSlice(rows) {
    var start = (state.page - 1) * state.pageSize;
    return rows.slice(start, start + state.pageSize);
  }

  function empOptions(selected) {
    return '<option value="">Select Employee</option>' + EMPLOYEES.map(function (n) {
      return '<option value="' + escapeHtml(n) + '"' + (selected === n ? ' selected' : '') + '>' + escapeHtml(n) + '</option>';
    }).join('');
  }

  function fillEmpSelects() {
    if (els.overheadEmp) els.overheadEmp.innerHTML = empOptions();
    if (els.manualEmp) els.manualEmp.innerHTML = empOptions();
  }

  function defaultOverheadCompRows() {
    return OVERHEAD_COMPS.map(function (name) {
      var enabled = name === 'Rent' || name === 'TA';
      return { name: name, value: enabled ? 100 : '', enabled: enabled };
    });
  }

  function overheadCompRowsFromComponents(components) {
    var map = {};
    (components || []).forEach(function (c) { map[c.component] = c.value; });
    return OVERHEAD_COMPS.map(function (name) {
      var enabled = Object.prototype.hasOwnProperty.call(map, name);
      return { name: name, value: enabled ? map[name] : '', enabled: enabled };
    });
  }

  function renderOverheadCompRows() {
    if (!els.overheadComps) return;
    els.overheadComps.innerHTML = state.overheadCompRows.map(function (row, i) {
      var val = row.value === '' || row.value == null ? '' : formatSalaryValue(String(row.value).replace(/,/g, ''));
      return '<div class="as-pay-comp-row">' +
        '<label><input type="checkbox" data-as="ohCompCheck" data-idx="' + i + '"' + (row.enabled ? ' checked' : '') + '></label>' +
        '<span>' + escapeHtml(row.name) + '</span>' +
        '<input type="text" data-as="ohCompVal" data-idx="' + i + '" value="' + escapeHtml(val) + '" placeholder="Value"' + (row.enabled ? '' : ' disabled') + '>' +
      '</div>';
    }).join('');
  }

  function renderOhMonthGrid() {
    if (!els.ohMonthGrid || !els.ohMonthYear) return;
    els.ohMonthYear.textContent = String(state.overheadMonthYear);
    var selected = parsePayMonth(state.overheadMonthValue);
    els.ohMonthGrid.innerHTML = DED_MONTHS.map(function (label, idx) {
      var on = selected && selected.year === state.overheadMonthYear && selected.month === idx;
      return '<button type="button" class="as-month-pop__cell' + (on ? ' is-selected' : '') + '" data-as="ohMonthPick" data-month="' + idx + '">' + label + '</button>';
    }).join('');
  }

  function setOhMonth(value) {
    state.overheadMonthValue = value || '';
    if (els.ohValidFrom) els.ohValidFrom.value = value || '';
    var parsed = parsePayMonth(value);
    if (parsed) state.overheadMonthYear = parsed.year;
    renderOhMonthGrid();
  }

  function resetOverheadModal() {
    state.overheadEditId = null;
    state.overheadCompRows = defaultOverheadCompRows();
    state.overheadMonthOpen = false;
    state.overheadMonthYear = new Date().getFullYear();
    state.overheadMonthValue = '';
    if (els.overheadForm) els.overheadForm.reset();
    setOhMonth('');
    if (els.ohMonthPop) els.ohMonthPop.hidden = true;
    var wrap = document.querySelector('.as-month-wrap--oh');
    if (wrap) wrap.classList.remove('is-open');
    var title = document.getElementById('asOverheadTitle');
    if (title) title.textContent = 'Add Overhead';
    populatePayEmployeeSelect('');
    if (els.overheadEmp) els.overheadEmp.innerHTML = empOptions('');
    renderOverheadCompRows();
    renderOhMonthGrid();
  }

  function openOverheadModal(row) {
    resetOverheadModal();
    var title = document.getElementById('asOverheadTitle');
    if (row) {
      state.overheadEditId = row.id;
      if (title) title.textContent = 'Edit Overhead';
      state.overheadCompRows = (row.compRows || overheadCompRowsFromComponents(row.components)).map(function (r) { return Object.assign({}, r); });
      if (els.overheadEmp) els.overheadEmp.innerHTML = empOptions(row.employee || '');
      setOhMonth(row.validFromMonth || row.validFrom || '');
    }
    renderOverheadCompRows();
    openModal(els.overheadModal);
  }

  function closeOverheadModal() {
    state.overheadMonthOpen = false;
    if (els.ohMonthPop) els.ohMonthPop.hidden = true;
    var wrap = document.querySelector('.as-month-wrap--oh');
    if (wrap) wrap.classList.remove('is-open');
    closeModal(els.overheadModal);
  }

  function bindOverheadModal(e) {
    var t = e.target;
    if (t.closest('[data-as="ohCompCheck"]')) {
      var ci = parseInt(t.closest('[data-as="ohCompCheck"]').getAttribute('data-idx'), 10);
      state.overheadCompRows[ci].enabled = t.closest('[data-as="ohCompCheck"]').checked;
      renderOverheadCompRows();
      return;
    }
    if (t.closest('[data-as="ohMonthPick"]')) {
      var mi = parseInt(t.closest('[data-as="ohMonthPick"]').getAttribute('data-month'), 10);
      setOhMonth(formatPayMonth(state.overheadMonthYear, mi));
      state.overheadMonthOpen = false;
      if (els.ohMonthPop) els.ohMonthPop.hidden = true;
      var ohWrap = document.querySelector('.as-month-wrap--oh');
      if (ohWrap) ohWrap.classList.remove('is-open');
      return;
    }
    if (t.closest('[data-as="ohMonthPrevYear"]')) {
      state.overheadMonthYear -= 1;
      renderOhMonthGrid();
      return;
    }
    if (t.closest('[data-as="ohMonthNextYear"]')) {
      state.overheadMonthYear += 1;
      renderOhMonthGrid();
      return;
    }
    if (t.id === 'asOhMonthBtn' || t.closest('#asOhMonthBtn') || t.id === 'asOhValidFrom') {
      state.overheadMonthOpen = !state.overheadMonthOpen;
      if (els.ohMonthPop) els.ohMonthPop.hidden = !state.overheadMonthOpen;
      var monthWrap = document.querySelector('.as-month-wrap--oh');
      if (monthWrap) monthWrap.classList.toggle('is-open', state.overheadMonthOpen);
      if (state.overheadMonthOpen) renderOhMonthGrid();
      return;
    }
  }

  function bindOverheadModalInput(e) {
    var t = e.target;
    if (t.getAttribute('data-as') !== 'ohCompVal') return;
    var vi = parseInt(t.getAttribute('data-idx'), 10);
    var raw = t.value.replace(/,/g, '');
    state.overheadCompRows[vi].value = raw === '' ? '' : Number(raw) || raw;
  }

  function formatManualMonth(year, monthIndex) {
    return DED_MONTHS[monthIndex] + '-' + year;
  }

  function parseManualMonth(value) {
    if (!value) return null;
    if (value.indexOf('-') > -1) {
      var p = value.split('-');
      if (isNaN(parseInt(p[0], 10))) {
        var mi = DED_MONTHS.indexOf(p[0]);
        if (mi >= 0) return { month: mi, year: parseInt(p[1], 10) };
      }
    }
    if (value.indexOf(' ') > -1) {
      var parts = value.split(' ');
      var idx = DED_MONTHS.indexOf(parts[0]);
      if (idx >= 0) return { month: idx, year: parseInt(parts[1], 10) };
    }
    return parsePayMonth(value);
  }

  function manualMonthLabel(key) {
    var parsed = parseManualMonth(key);
    if (!parsed) return key || '';
    return DED_MONTHS[parsed.month] + ' ' + parsed.year;
  }

  function renderManualMonthGrid() {
    if (!els.manualMonthGrid || !els.manualMonthYear) return;
    els.manualMonthYear.textContent = String(state.manualMonthYear);
    var selected = parseManualMonth(state.manualMonthValue);
    els.manualMonthGrid.innerHTML = DED_MONTHS.map(function (label, idx) {
      var on = selected && selected.year === state.manualMonthYear && selected.month === idx;
      return '<button type="button" class="as-month-pop__cell' + (on ? ' is-selected' : '') + '" data-as="manualMonthPick" data-month="' + idx + '">' + label + '</button>';
    }).join('');
  }

  function setManualMonth(value) {
    state.manualMonthValue = value || '';
    if (els.manualMonth) els.manualMonth.value = value || '';
    var parsed = parseManualMonth(value);
    if (parsed) state.manualMonthYear = parsed.year;
    renderManualMonthGrid();
  }

  function toggleManualEmpField(isEdit, row) {
    if (els.manualEmpField) els.manualEmpField.hidden = !!isEdit;
    if (els.manualEmpReadonly) els.manualEmpReadonly.hidden = !isEdit;
    if (els.manualEmp) els.manualEmp.required = !isEdit;
    if (isEdit && els.manualEmpReadonlyInput) {
      els.manualEmpReadonlyInput.value = (row && (row.employeeCode || row.employee)) || '';
    }
  }

  function resetManualModal() {
    state.manualEditId = null;
    state.manualEmployee = '';
    state.manualMonthOpen = false;
    state.manualMonthYear = new Date().getFullYear();
    state.manualMonthValue = '';
    if (els.manualForm) els.manualForm.reset();
    setManualMonth('');
    if (els.manualMonthPop) els.manualMonthPop.hidden = true;
    var wrap = document.querySelector('.as-month-wrap--manual');
    if (wrap) wrap.classList.remove('is-open');
    var title = document.getElementById('asManualTitle');
    if (title) title.textContent = 'Add Manual Costing';
    toggleManualEmpField(false);
    if (els.manualEmp) els.manualEmp.innerHTML = empOptions('');
    renderManualMonthGrid();
  }

  function openManualModal(row) {
    resetManualModal();
    var title = document.getElementById('asManualTitle');
    if (row) {
      state.manualEditId = row.id;
      state.manualEmployee = row.employee || '';
      if (title) title.textContent = 'Edit Costing';
      toggleManualEmpField(true, row);
      setManualMonth(row.monthKey || row.month || '');
      if (els.manualForm) {
        els.manualForm.elements.perMinute.value = row.perMinute != null ? row.perMinute : '';
      }
    } else {
      if (els.manualEmp) els.manualEmp.innerHTML = empOptions('');
    }
    openModal(els.manualModal);
  }

  function closeManualModal() {
    state.manualMonthOpen = false;
    if (els.manualMonthPop) els.manualMonthPop.hidden = true;
    var wrap = document.querySelector('.as-month-wrap--manual');
    if (wrap) wrap.classList.remove('is-open');
    closeModal(els.manualModal);
  }

  function bindManualModal(e) {
    var t = e.target;
    if (t.closest('[data-as="manualMonthPick"]')) {
      var mi = parseInt(t.closest('[data-as="manualMonthPick"]').getAttribute('data-month'), 10);
      setManualMonth(formatManualMonth(state.manualMonthYear, mi));
      state.manualMonthOpen = false;
      if (els.manualMonthPop) els.manualMonthPop.hidden = true;
      var manualWrap = document.querySelector('.as-month-wrap--manual');
      if (manualWrap) manualWrap.classList.remove('is-open');
      return;
    }
    if (t.closest('[data-as="manualMonthPrevYear"]')) {
      state.manualMonthYear -= 1;
      renderManualMonthGrid();
      return;
    }
    if (t.closest('[data-as="manualMonthNextYear"]')) {
      state.manualMonthYear += 1;
      renderManualMonthGrid();
      return;
    }
    if (t.id === 'asManualMonthBtn' || t.closest('#asManualMonthBtn') || t.id === 'asManualMonth') {
      state.manualMonthOpen = !state.manualMonthOpen;
      if (els.manualMonthPop) els.manualMonthPop.hidden = !state.manualMonthOpen;
      var monthWrap = document.querySelector('.as-month-wrap--manual');
      if (monthWrap) monthWrap.classList.toggle('is-open', state.manualMonthOpen);
      if (state.manualMonthOpen) renderManualMonthGrid();
      return;
    }
  }

  /* ---- DropDown ---- */
  function valueSuggestions() {
    var existing = state.dropdowns[state.dropdownName] || [];
    var q = (state.dropdownValue || '').trim().toLowerCase();
    return existing.filter(function (v) {
      return !q || String(v).toLowerCase().indexOf(q) !== -1;
    });
  }

  function renderValueTip() {
    var tip = document.getElementById('asDdValueTip');
    var list = document.getElementById('asDdValueList');
    if (!tip || !list) return;
    var items = valueSuggestions();
    if (!state.valueOpen || !items.length) {
      tip.hidden = true;
      return;
    }
    tip.hidden = false;
    list.innerHTML = items.map(function (v) {
      return '<button type="button" class="as-value-tip__opt" data-as="pickValue" data-value="' + escapeHtml(v) + '">' + escapeHtml(v) + '</button>';
    }).join('');
  }

  function renderDropdown() {
    var values = state.dropdowns[state.dropdownName] || [];
    var nameList = DROPDOWN_NAMES.filter(function (n) {
      return !state.nameQuery || n.toLowerCase().indexOf(state.nameQuery.toLowerCase()) !== -1;
    });
    var html = '<div class="as-card--split">' +
      '<div class="as-panel">' +
        '<div class="as-panel__head"><h2 class="as-panel__title">Dropdown Settings</h2></div>' +
        '<div class="as-form-rows">' +
          '<div class="as-form-row"><label>Name <span class="as-req">*</span></label>' +
            '<div class="as-combo">' +
              '<input class="as-input" data-as="ddName" value="' + escapeHtml(state.dropdownName) + '" placeholder="Enter Name" autocomplete="off">' +
              '<div class="as-combo__list" id="asDdNameList" ' + (state.nameOpen ? '' : 'hidden') + '>' +
                nameList.map(function (n) {
                  return '<button type="button" class="as-combo__opt' + (n === state.dropdownName ? ' is-active' : '') + '" data-as="pickName" data-value="' + escapeHtml(n) + '">' + escapeHtml(n) + '</button>';
                }).join('') +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="as-form-row"><label>Value <span class="as-req">*</span></label>' +
            '<div class="as-value-combo">' +
              '<input class="as-input" data-as="ddValue" value="' + escapeHtml(state.dropdownValue) + '" placeholder="Value" autocomplete="off">' +
              '<div class="as-value-tip" id="asDdValueTip" ' + (state.valueOpen && valueSuggestions().length ? '' : 'hidden') + '>' +
                '<div class="as-value-tip__caret" aria-hidden="true"></div>' +
                '<div class="as-value-tip__list" id="asDdValueList">' +
                  valueSuggestions().map(function (v) {
                    return '<button type="button" class="as-value-tip__opt" data-as="pickValue" data-value="' + escapeHtml(v) + '">' + escapeHtml(v) + '</button>';
                  }).join('') +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="as-form-row"><span></span><button type="button" class="as-btn as-btn--primary" data-as="saveDd">Save</button></div>' +
        '</div>' +
      '</div>' +
      '<div class="as-panel">' +
        '<div class="as-panel__head"><h2 class="as-panel__title">' + escapeHtml(state.dropdownName) + '</h2></div>' +
        '<div class="as-table-wrap"><table class="as-table as-table--sm"><thead><tr><th>S. No.</th><th>Value</th><th>Action</th></tr></thead><tbody>' +
          values.map(function (v, i) {
            return '<tr><td>' + (i + 1) + '</td><td>' + escapeHtml(v) + '</td><td>' +
              '<div class="as-actions"><button type="button" class="as-action as-action--edit" data-as="editDd" data-idx="' + i + '">Edit</button>' +
              '<span class="as-actions__sep">|</span><button type="button" class="as-action as-action--del" data-as="delDd" data-idx="' + i + '">Delete</button></div></td></tr>';
          }).join('') +
        '</tbody></table></div>' +
      '</div>' +
    '</div>';
    els.dynamic.innerHTML = html;
  }

  /* ---- Salary ---- */
  function salaryRows() {
    var q = state.search.trim().toLowerCase();
    var f = state.salaryFilters;
    return state.salary.filter(function (r) {
      if (q) {
        var hit = String(r.name || '').toLowerCase().indexOf(q) !== -1 || String(r.ingredient || '').toLowerCase().indexOf(q) !== -1 || String(r.componentType || '').toLowerCase().indexOf(q) !== -1;
        if (!hit) return false;
      }
      var compSel = Object.keys(f.component || {}).filter(function (k) { return f.component[k]; });
      if (compSel.length && compSel.indexOf(r.componentType) === -1) return false;
      var natSel = Object.keys(f.nature || {}).filter(function (k) { return f.nature[k]; });
      if (natSel.length && natSel.indexOf(r.nature) === -1) return false;
      var taxSel = Object.keys(f.tax || {}).filter(function (k) { return f.tax[k]; });
      if (taxSel.length && taxSel.indexOf(r.taxStatus) === -1) return false;
      return true;
    });
  }

  function orderedSalaryCols() {
    var order = state.salaryColOrder || SALARY_COLS.map(function (c) { return c.id; });
    return order.map(function (id) {
      return SALARY_COLS.filter(function (c) { return c.id === id; })[0];
    }).filter(Boolean);
  }

  function columnsPop() {
    return '<div class="as-pop as-pop--columns" id="asColsPop" ' + (state.columnsOpen ? '' : 'hidden') + '>' +
      '<div class="as-pop__head"><span class="as-pop__title">' + COLS_TABLE_ICON + ' Columns</span>' +
      '<button type="button" class="as-pop__reset" data-as="selectAllCols">Select All</button></div>' +
      '<div class="as-pop__body as-pop__body--columns">' + orderedSalaryCols().map(function (c) {
        return '<label class="as-pop-item as-pop-item--col">' + DRAG_DOTS +
          '<input type="checkbox" data-as="col" data-id="' + c.id + '"' + (state.salaryVisible[c.id] ? ' checked' : '') + '>' +
          '<span class="as-pop-item__label">' + escapeHtml(c.label || c.id) + '</span></label>';
      }).join('') + '</div></div>';
  }

  function filterPop(groups, opts) {
    opts = opts || {};
    var useFilters = !!opts.useFilters;
    var popClass = 'as-pop' + (opts.variant === 'filter' ? ' as-pop--filter' : '');
    return '<div class="' + popClass + '" id="asFilterPop" ' + (state.filterOpen ? '' : 'hidden') + '>' +
      '<div class="as-pop__head"><span class="as-pop__title">' + FILTER_ICON + ' Filter</span>' +
      '<button type="button" class="as-pop__reset" data-as="resetFilter">Reset</button></div>' +
      '<div class="as-pop__body as-pop__body--filter"><div class="as-filter-list">' + groups.map(function (g) {
        var open = !!state.filterAccOpen[g.key];
        return '<div class="as-filter-acc' + (open ? ' is-open' : '') + '" data-filter-key="' + escapeHtml(g.key) + '">' +
          '<button type="button" class="as-filter-acc__btn" data-as="accToggle">' + CHEV +
          '<span class="as-filter-acc__label">' + escapeHtml(g.label) + '</span></button>' +
          '<div class="as-filter-acc__body">' + g.options.map(function (o) {
            var checked = useFilters && state.salaryFilters[g.key] && state.salaryFilters[g.key][o];
            return '<label><input type="checkbox" data-as="filt" data-group="' + escapeHtml(g.key) + '" value="' + escapeHtml(o) + '"' + (checked ? ' checked' : '') + '> ' + escapeHtml(o) + '</label>';
          }).join('') + '</div></div>';
      }).join('') + '</div></div></div>';
  }

  function renderSalary() {
    var rows = salaryRows();
    var page = pageSlice(rows);
    var vis = orderedSalaryCols().filter(function (c) { return state.salaryVisible[c.id]; });
    var head = vis.map(function (c) { return '<th>' + escapeHtml(c.label) + '</th>'; }).join('');
    var body = page.map(function (r, i) {
      var cells = {
        no: (state.page - 1) * state.pageSize + i + 1,
        name: escapeHtml(r.name),
        employeeHead: escapeHtml(r.employeeHead),
        order: r.order,
        componentType: escapeHtml(r.componentType),
        ingredient: escapeHtml(r.ingredient),
        fy: '<button type="button" class="as-link" data-as="viewFy" data-id="' + escapeHtml(r.id) + '">view</button>',
        percent: escapeHtml(r.percent),
        upperLimit: escapeHtml(r.upperLimit),
        rounding: escapeHtml(r.rounding),
        nature: escapeHtml(r.nature),
        taxStatus: escapeHtml(r.taxStatus),
        showPayslip: escapeHtml(r.showPayslip),
        action: actionsHtml(r.id, 'salary')
      };
      return '<tr>' + vis.map(function (c) { return '<td>' + (cells[c.id] == null ? '' : cells[c.id]) + '</td>'; }).join('') + '</tr>';
    }).join('');

    els.dynamic.innerHTML = '<section class="as-card">' +
      '<div class="as-toolbar">' +
        '<input type="search" class="as-search" data-as="search" placeholder="Search Name" value="' + escapeHtml(state.search) + '">' +
        '<div class="as-wrap"><button type="button" class="as-btn as-btn--icon as-btn--cols' + (state.columnsOpen ? ' is-open' : '') + '" data-as="toggleCols" aria-label="Columns" aria-expanded="' + (state.columnsOpen ? 'true' : 'false') + '">' + COLS_BTN + '</button>' + columnsPop() + '</div>' +
        '<div class="as-wrap"><button type="button" class="as-btn as-btn--icon' + (state.filterOpen ? ' is-open' : '') + '" data-as="toggleFilter" aria-label="Filter" title="Filters" aria-expanded="' + (state.filterOpen ? 'true' : 'false') + '">' + FILTER_ICON + '</button>' +
          filterPop([{ key: 'component', label: 'Component Type', options: COMPONENT_TYPES }, { key: 'nature', label: 'Nature Type', options: NATURE_TYPES }, { key: 'tax', label: 'Tax Status', options: ['Taxable', 'Non-Taxable'] }], { variant: 'filter', useFilters: true }) +
        '</div>' +
        '<button type="button" class="as-btn as-btn--add" data-as="addSalary" aria-label="Add">+</button>' +
      '</div>' +
      '<div class="as-table-wrap"><table class="as-table"><thead><tr>' + head + '</tr></thead><tbody>' +
        (body || '') + '</tbody></table>' +
        '<div class="as-empty" ' + (page.length ? 'hidden' : '') + '>' + EMPTY_ICON + '</div></div>' +
      paginationHtml(rows.length) +
    '</section>';
  }

  /* ---- Deduction ---- */
  function displayDedType(type) {
    if (type === 'Value Wise') return 'Value Based';
    return type || '';
  }
  function displayDedNature(type) {
    if (!type) return '';
    return String(type).toUpperCase();
  }

  function renderDeduction() {
    var rows = state.deductions;
    var page = pageSlice(rows);
    var head = DEDUCTION_COLS.map(function (c) { return '<th>' + escapeHtml(c.label) + '</th>'; }).join('');
    var body = page.map(function (r, i) {
      return '<tr>' +
        '<td>' + ((state.page - 1) * state.pageSize + i + 1) + '</td>' +
        '<td>' + escapeHtml(r.name) + '</td><td>' + escapeHtml(r.employeeHead) + '</td><td>' + escapeHtml(r.order) + '</td>' +
        '<td>' + escapeHtml(r.month) + '</td><td>' + escapeHtml(displayDedType(r.deductionType)) + '</td><td>' + escapeHtml(r.applicableOn) + '</td>' +
        '<td><div class="as-fy">' + (r.fy || []).map(function (y) { return '<span>' + escapeHtml(y) + '</span>'; }).join('') + '</div></td>' +
        '<td>' + escapeHtml(r.percent) + '</td><td>' + escapeHtml(r.maxValue || r.value) + '</td><td>' + escapeHtml(r.rounding) + '</td>' +
        '<td>' + escapeHtml(displayDedNature(r.type)) + '</td><td>' + escapeHtml(r.taxStatus) + '</td><td>' + escapeHtml(r.showPayslip) + '</td>' +
        '<td>' + actionsHtml(r.id, 'deduction') + '</td></tr>';
    }).join('');

    els.dynamic.innerHTML = '<section class="as-card">' +
      '<div class="as-toolbar">' +
        '<div class="as-wrap"><button type="button" class="as-btn as-btn--icon' + (state.columnsOpen ? ' is-open' : '') + '" data-as="toggleCols">' + COLS_ICON + '</button></div>' +
        '<div class="as-wrap"><button type="button" class="as-btn as-btn--icon' + (state.filterOpen ? ' is-open' : '') + '" data-as="toggleFilter">' + FILTER_ICON + '</button>' +
          filterPop([{ key: 'deduction', label: 'Deduction Type', options: ['Value Based', 'Formula Based'] }, { key: 'nature', label: 'Nature Type', options: ['MONTHLY', 'YEARLY'] }, { key: 'tax', label: 'Tax Status', options: ['Yes', 'No'] }]) +
        '</div>' +
        '<button type="button" class="as-btn as-btn--add" data-as="addDeduction">+</button>' +
      '</div>' +
      '<div class="as-table-wrap"><table class="as-table"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>' +
      paginationHtml(rows.length) +
    '</section>';
  }

  /* ---- Pay Details ---- */
  function payRows() {
    return state.pay.filter(function (r) {
      if (state.employee && r.employee !== state.employee) return false;
      return true;
    });
  }

  function renderPay() {
    var rows = payRows();
    var page = pageSlice(rows);
    var head = PAY_COLS.map(function (c) {
      if (c.id === 'check') return '<th><input type="checkbox" data-as="selectAllPay"></th>';
      return '<th>' + escapeHtml(c.label) + '</th>';
    }).join('');
    var body = page.map(function (r, i) {
      return '<tr>' +
        '<td><input type="checkbox" data-as="selectPay" data-id="' + escapeHtml(r.id) + '"' + (state.selectedPay[r.id] ? ' checked' : '') + '></td>' +
        '<td>' + ((state.page - 1) * state.pageSize + i + 1) + '</td>' +
        '<td>' + escapeHtml(r.employee) + '</td><td>' + escapeHtml(r.validFrom) + '</td><td>' + escapeHtml(r.paymentMode) + '</td>' +
        '<td>' + escapeHtml(r.accountName) + '</td><td>' + escapeHtml(r.bankAccount) + '</td><td>' + escapeHtml(r.ifsc) + '</td>' +
        '<td>' + escapeHtml(r.deductions) + '</td><td><button type="button" class="as-link" data-as="viewComp" data-kind="pay" data-id="' + escapeHtml(r.id) + '">View</button></td>' +
        '<td>' + escapeHtml(r.notes) + '</td><td>' + escapeHtml(r.status) + '</td>' +
        '<td><div class="as-actions">' +
          '<button type="button" class="as-action as-action--edit" data-as="edit" data-kind="pay" data-id="' + escapeHtml(r.id) + '">Edit</button>' +
          '<span class="as-actions__sep">|</span><button type="button" class="as-action as-action--muted">Verify</button>' +
          '<span class="as-actions__sep">|</span><button type="button" class="as-action as-action--del" data-as="delete" data-kind="pay" data-id="' + escapeHtml(r.id) + '">Delete</button>' +
        '</div></td></tr>';
    }).join('');

    els.dynamic.innerHTML = '<section class="as-card">' +
      '<div class="as-toolbar">' +
        '<button type="button" class="as-btn as-btn--ghost" data-as="bulkVerify">Bulk Verify</button>' +
        '<select class="as-select" style="width:120px" data-as="status"><option>Active</option><option>Inactive</option></select>' +
        '<select class="as-select" style="width:180px" data-as="employee">' + empOptions(state.employee) + '</select>' +
        '<button type="button" class="as-btn as-btn--ghost" data-as="export">Export</button>' +
        '<button type="button" class="as-btn as-btn--icon">' + COLS_ICON + '</button>' +
        '<button type="button" class="as-btn as-btn--add" data-as="toast" data-msg="Add Pay Details">+</button>' +
      '</div>' +
      '<div class="as-table-wrap"><table class="as-table"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>' +
      paginationHtml(rows.length) +
    '</section>';
  }

  /* ---- Overhead ---- */
  function renderOverhead() {
    var rows = state.overhead.filter(function (r) {
      if (state.employee && r.employee !== state.employee) return false;
      return true;
    });
    var page = pageSlice(rows);
    var body = page.map(function (r, i) {
      return '<tr><td>' + ((state.page - 1) * state.pageSize + i + 1) + '</td>' +
        '<td>' + escapeHtml(r.employee) + '</td><td>' + escapeHtml(r.validFrom) + '</td>' +
        '<td><button type="button" class="as-link" data-as="viewComp" data-kind="overhead" data-id="' + escapeHtml(r.id) + '">View</button></td>' +
        '<td>' + actionsHtml(r.id, 'overhead') + '</td></tr>';
    }).join('');

    els.dynamic.innerHTML = '<section class="as-card">' +
      '<div class="as-toolbar">' +
        '<select class="as-select" style="width:120px" data-as="status"><option>Active</option><option>Inactive</option></select>' +
        '<select class="as-select" style="width:180px" data-as="employee">' + empOptions(state.employee) + '</select>' +
        '<button type="button" class="as-btn as-btn--add" data-as="addOverhead">+</button>' +
      '</div>' +
      '<div class="as-table-wrap"><table class="as-table"><thead><tr><th>#</th><th>Employee Name</th><th>Valid From</th><th>Overhead Component</th><th>Action</th></tr></thead><tbody>' + body + '</tbody></table></div>' +
      paginationHtml(rows.length) +
    '</section>';
  }

  /* ---- Manual ---- */
  function renderManual() {
    var rows = state.manual.filter(function (r) {
      if (state.employee && r.employee !== state.employee) return false;
      return true;
    });
    var page = pageSlice(rows);
    var body = page.map(function (r, i) {
      return '<tr><td>' + ((state.page - 1) * state.pageSize + i + 1) + '</td>' +
        '<td>' + escapeHtml(r.employee) + '</td><td>' + escapeHtml(r.perMinute) + '</td><td>' + escapeHtml(r.month) + '</td>' +
        '<td>' + actionsHtml(r.id, 'manual') + '</td></tr>';
    }).join('');

    els.dynamic.innerHTML = '<section class="as-card">' +
      '<div class="as-toolbar">' +
        '<select class="as-select" style="width:120px" data-as="status"><option>Active</option><option>Inactive</option></select>' +
        '<select class="as-select" style="width:180px" data-as="employee">' + empOptions(state.employee) + '</select>' +
        '<button type="button" class="as-btn as-btn--add" data-as="addManual">+</button>' +
      '</div>' +
      '<div class="as-table-wrap"><table class="as-table"><thead><tr><th>#</th><th>Employee Name</th><th>Per Minute Salary</th><th>Month</th><th>Action</th></tr></thead><tbody>' + body + '</tbody></table></div>' +
      paginationHtml(rows.length) +
    '</section>';
  }

  /* ---- Expense Limit ---- */
  function renderLimit() {
    var rows = state.limits;
    var page = pageSlice(rows);
    var body = page.map(function (r, i) {
      return '<tr><td>' + ((state.page - 1) * state.pageSize + i + 1) + '</td>' +
        '<td>' + escapeHtml(r.expense) + '</td><td>' + escapeHtml(r.designation) + '</td><td>' + escapeHtml(r.amount) + '</td>' +
        '<td>' + escapeHtml(r.createdAt) + '</td><td>' + actionsHtml(r.id, 'limit') + '</td></tr>';
    }).join('');

    els.dynamic.innerHTML = '<section class="as-card">' +
      '<div class="as-toolbar"><button type="button" class="as-btn as-btn--add" data-as="addLimit">+</button></div>' +
      '<div class="as-table-wrap"><table class="as-table"><thead><tr><th>S.No</th><th>Expense</th><th>Designation</th><th>Amount</th><th>Created At</th><th>Action</th></tr></thead><tbody>' + body + '</tbody></table>' +
        '<div class="as-empty" ' + (page.length ? 'hidden' : '') + '>' + EMPTY_ICON + '</div></div>' +
      paginationHtml(rows.length) +
    '</section>';
  }

  function renderTab() {
    state.nameOpen = false;
    if (state.tab === 'dropdown') renderDropdown();
    else if (state.tab === 'salary') renderSalary();
    else if (state.tab === 'deduction') renderDeduction();
    else if (state.tab === 'pay') renderPay();
    else if (state.tab === 'overhead') renderOverhead();
    else if (state.tab === 'manual') renderManual();
    else renderLimit();
  }

  function setTab(tab) {
    state.tab = tab;
    state.page = 1;
    state.search = '';
    state.employee = '';
    state.selectedPay = {};
    state.columnsOpen = false;
    state.filterOpen = false;
    els.tabs.forEach(function (btn) {
      var on = btn.getAttribute('data-tab') === tab;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderTab();
  }

  function openModal(el) {
    if (!el) return;
    el.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeModal(el) {
    if (!el) return;
    el.hidden = true;
    if ([els.salaryModal, els.deductionModal, els.overheadModal, els.manualModal, els.limitModal, els.fyViewModal, els.salaryDetailsModal, els.payModal, els.overheadDetailsModal].every(function (m) { return !m || m.hidden; })) {
      document.body.style.overflow = '';
    }
  }
  function closeAllModals() {
    closeSalaryModal();
    resetSalaryModal();
    closeDeductionModal();
    resetDeductionModal();
    closePayModal();
    resetPayModal();
    closeOverheadModal();
    resetOverheadModal();
    closeManualModal();
    resetManualModal();
    [els.limitModal, els.fyViewModal, els.salaryDetailsModal, els.overheadDetailsModal].forEach(closeModal);
  }

  function openOverheadDetailsModal(row) {
    if (!els.overheadDetailsModal) return;
    var comps = (row && row.components && row.components.length) ? row.components : DEFAULT_OVERHEAD_DETAILS;
    if (els.overheadDetailsBody) {
      els.overheadDetailsBody.innerHTML = comps.map(function (c, i) {
        return '<tr><td>' + (i + 1) + '</td><td>' + escapeHtml(c.component) + '</td><td>' + formatSalaryValue(c.value) + '</td></tr>';
      }).join('');
    }
    openModal(els.overheadDetailsModal);
  }

  function formatSalaryValue(n) {
    return Number(n || 0).toLocaleString('en-IN');
  }

  function openSalaryDetailsModal(row) {
    if (!els.salaryDetailsModal) return;
    var comps = (row && row.components && row.components.length) ? row.components : DEFAULT_PAY_COMPONENTS;
    var gross = comps.reduce(function (sum, c) { return sum + Number(c.value || 0); }, 0);
    if (els.salaryDetailsBody) {
      els.salaryDetailsBody.innerHTML = comps.map(function (c, i) {
        return '<tr><td>' + (i + 1) + '</td><td>' + escapeHtml(c.component) + '</td><td>' + escapeHtml(c.nature) + '</td><td>' + formatSalaryValue(c.value) + '</td></tr>';
      }).join('');
    }
    if (els.salaryDetailsGross) els.salaryDetailsGross.textContent = formatSalaryValue(gross);
    openModal(els.salaryDetailsModal);
  }

  function formatPayMonth(year, monthIndex) {
    return pad(monthIndex + 1) + '-' + year;
  }

  function parsePayMonth(value) {
    if (!value) return null;
    if (value.indexOf('-') > -1) {
      var p = value.split('-');
      if (p[0].length === 4) return { month: parseInt(p[1], 10) - 1, year: parseInt(p[0], 10) };
      return { month: parseInt(p[0], 10) - 1, year: parseInt(p[1], 10) };
    }
    if (value.indexOf('/') > -1) {
      var parts = value.split('/');
      return { month: parseInt(parts[1], 10) - 1, year: parseInt(parts[2], 10) };
    }
    return null;
  }

  function populatePayEmployeeSelect(selected) {
    if (!els.payEmployee) return;
    els.payEmployee.innerHTML = EMPLOYEES.map(function (name) {
      return '<option value="' + escapeHtml(name) + '"' + (name === selected ? ' selected' : '') + '>' + escapeHtml(name) + '</option>';
    }).join('');
  }

  function payGrossTotal() {
    return state.payCompRows.reduce(function (sum, row) {
      if (!row.enabled) return sum;
      var n = String(row.value || '').replace(/,/g, '');
      return sum + (Number(n) || 0);
    }, 0);
  }

  function updatePayGross() {
    if (els.payGross) els.payGross.textContent = formatSalaryValue(payGrossTotal());
  }

  function renderPayCompRows() {
    if (!els.payCompRows) return;
    els.payCompRows.innerHTML = state.payCompRows.map(function (row, i) {
      var val = row.value === '' || row.value == null ? '' : formatSalaryValue(String(row.value).replace(/,/g, ''));
      return '<div class="as-pay-comp-row">' +
        '<label><input type="checkbox" data-as="payCompCheck" data-idx="' + i + '"' + (row.enabled ? ' checked' : '') + '></label>' +
        '<span>' + escapeHtml(row.name) + '</span>' +
        '<input type="text" data-as="payCompVal" data-idx="' + i + '" value="' + escapeHtml(val) + '" placeholder="Value"' + (row.enabled ? '' : ' disabled') + '>' +
      '</div>';
    }).join('');
    updatePayGross();
  }

  function renderPayDedTags() {
    if (!els.payDedTags) return;
    if (!state.payDedTags.length) {
      els.payDedTags.innerHTML = '<span class="as-pay-tags__empty">--</span>';
      return;
    }
    els.payDedTags.innerHTML = state.payDedTags.map(function (tag) {
      return '<span class="as-pay-tag">' + escapeHtml(tag) +
        '<button type="button" class="as-pay-tag__rm" data-as="payDedRemove" data-value="' + escapeHtml(tag) + '" aria-label="Remove">&times;</button></span>';
    }).join('');
  }

  function renderPayMonthGrid() {
    if (!els.payMonthGrid || !els.payMonthYear) return;
    els.payMonthYear.textContent = String(state.payMonthYear);
    var selected = parsePayMonth(state.payMonthValue);
    els.payMonthGrid.innerHTML = DED_MONTHS.map(function (label, idx) {
      var on = selected && selected.year === state.payMonthYear && selected.month === idx;
      return '<button type="button" class="as-month-pop__cell' + (on ? ' is-selected' : '') + '" data-as="payMonthPick" data-month="' + idx + '">' + label + '</button>';
    }).join('');
  }

  function setPayMonth(value) {
    state.payMonthValue = value || '';
    if (els.payValidFrom) els.payValidFrom.value = value || '';
    var parsed = parsePayMonth(value);
    if (parsed) state.payMonthYear = parsed.year;
    renderPayMonthGrid();
  }

  function resetPayModal() {
    state.payEditId = null;
    state.payCompRows = PAY_COMP_TEMPLATE.map(function (r) { return Object.assign({}, r); });
    state.payDedTags = [];
    state.payMonthOpen = false;
    state.payMonthYear = new Date().getFullYear();
    state.payMonthValue = '';
    if (els.payForm) els.payForm.reset();
    setPayMonth('');
    if (els.payMonthPop) els.payMonthPop.hidden = true;
    var wrap = document.querySelector('.as-month-wrap--pay');
    if (wrap) wrap.classList.remove('is-open');
    var title = document.getElementById('asPayTitle');
    if (title) title.textContent = 'Add Pay Bills';
    populatePayEmployeeSelect('');
    renderPayCompRows();
    renderPayDedTags();
    renderPayMonthGrid();
  }

  function openPayModal(row) {
    resetPayModal();
    var title = document.getElementById('asPayTitle');
    if (row) {
      state.payEditId = row.id;
      if (title) title.textContent = 'Edit Pay Bills';
      state.payCompRows = (row.payCompRows || PAY_COMP_TEMPLATE).map(function (r) { return Object.assign({}, r); });
      state.payDedTags = (row.deductionTags || (row.deductions && row.deductions !== '--' ? [row.deductions] : [])).slice();
      if (els.payForm) {
        els.payForm.elements.paymentMode.value = row.paymentMode || '';
        els.payForm.elements.accountName.value = row.accountName || '';
        els.payForm.elements.bankAccount.value = row.bankAccount || '';
        els.payForm.elements.ifsc.value = row.ifsc || '';
        els.payForm.elements.pan.value = row.pan || '';
        els.payForm.elements.uan.value = row.uan || '';
        els.payForm.elements.aadhar.value = row.aadhar || '';
        els.payForm.elements.notes.value = row.notes || '';
      }
      populatePayEmployeeSelect(row.employee || '');
      setPayMonth(row.validFromMonth || row.validFrom || '');
    }
    renderPayCompRows();
    renderPayDedTags();
    openModal(els.payModal);
  }

  function closePayModal() {
    state.payMonthOpen = false;
    if (els.payMonthPop) els.payMonthPop.hidden = true;
    var wrap = document.querySelector('.as-month-wrap--pay');
    if (wrap) wrap.classList.remove('is-open');
    closeModal(els.payModal);
  }

  function bindPayModal(e) {
    var t = e.target;
    if (t.closest('[data-as="payDedRemove"]')) {
      var tag = t.closest('[data-as="payDedRemove"]').getAttribute('data-value');
      state.payDedTags = state.payDedTags.filter(function (x) { return x !== tag; });
      renderPayDedTags();
      return;
    }
    if (t.closest('[data-as="payCompCheck"]')) {
      var ci = parseInt(t.closest('[data-as="payCompCheck"]').getAttribute('data-idx'), 10);
      state.payCompRows[ci].enabled = t.closest('[data-as="payCompCheck"]').checked;
      renderPayCompRows();
      return;
    }
    if (t.closest('[data-as="payMonthPick"]')) {
      var mi = parseInt(t.closest('[data-as="payMonthPick"]').getAttribute('data-month'), 10);
      setPayMonth(formatPayMonth(state.payMonthYear, mi));
      state.payMonthOpen = false;
      if (els.payMonthPop) els.payMonthPop.hidden = true;
      var monthWrap = document.querySelector('.as-month-wrap--pay');
      if (monthWrap) monthWrap.classList.remove('is-open');
      return;
    }
    if (t.closest('[data-as="payMonthPrevYear"]')) {
      state.payMonthYear -= 1;
      renderPayMonthGrid();
      return;
    }
    if (t.closest('[data-as="payMonthNextYear"]')) {
      state.payMonthYear += 1;
      renderPayMonthGrid();
      return;
    }
    if (t.id === 'asPayMonthBtn' || t.closest('#asPayMonthBtn') || t.id === 'asPayValidFrom') {
      state.payMonthOpen = !state.payMonthOpen;
      if (els.payMonthPop) els.payMonthPop.hidden = !state.payMonthOpen;
      var payWrap = document.querySelector('.as-month-wrap--pay');
      if (payWrap) payWrap.classList.toggle('is-open', state.payMonthOpen);
      if (state.payMonthOpen) renderPayMonthGrid();
      return;
    }
  }

  function bindPayModalInput(e) {
    var t = e.target;
    if (t.getAttribute('data-as') !== 'payCompVal') return;
    var vi = parseInt(t.getAttribute('data-idx'), 10);
    var raw = t.value.replace(/,/g, '');
    state.payCompRows[vi].value = raw === '' ? '' : Number(raw) || raw;
    updatePayGross();
  }

  function openFyViewModal(row) {
    if (!els.fyViewModal || !els.fyViewGrid) return;
    var years = row && row.fy && row.fy.length ? row.fy : AY_OPTIONS.slice();
    els.fyViewGrid.innerHTML = years.map(function (y) {
      return '<span class="as-ay-chip">' + escapeHtml(y) + '</span>';
    }).join('');
    openModal(els.fyViewModal);
  }

  function salaryDdOptions(field) {
    var opts = field === 'componentType' ? COMPONENT_TYPES : NATURE_TYPES;
    var q = (state.salaryDdQuery[field] || '').toLowerCase();
    return opts.filter(function (o) { return !q || o.toLowerCase().indexOf(q) !== -1; });
  }

  function renderSalaryDd(field) {
    var listId = field === 'componentType' ? 'asSalaryComponentList' : 'asSalaryNatureList';
    var list = document.getElementById(listId);
    if (!list) return;
    var open = state.salaryDdOpen === field;
    list.hidden = !open;
    var combo = list.closest('.as-scombo');
    if (combo) combo.classList.toggle('is-open', open);
    if (!open) return;
    var cur = (document.getElementById(field === 'componentType' ? 'asSalaryComponentType' : 'asSalaryNature') || {}).value || '';
    list.innerHTML = salaryDdOptions(field).map(function (o) {
      return '<button type="button" class="as-scombo__opt' + (o === cur ? ' is-active' : '') + '" data-as="salaryDdPick" data-field="' + field + '" data-value="' + escapeHtml(o) + '">' + escapeHtml(o) + '</button>';
    }).join('') || '<div class="as-scombo__opt" style="cursor:default;color:#8c8c8c">No options</div>';
  }

  function renderSalaryFyTags() {
    var box = document.getElementById('asSalaryFyTags');
    if (!box) return;
    box.innerHTML = state.salaryFySelected.map(function (fy) {
      return '<span class="as-fy-tag">' + escapeHtml(fy) + '<button type="button" class="as-fy-tag__rm" data-as="salaryFyRemove" data-value="' + escapeHtml(fy) + '" aria-label="Remove">&times;</button></span>';
    }).join('');
  }

  function setSalaryCombo(field, value) {
    var hidden = document.getElementById(field === 'componentType' ? 'asSalaryComponentType' : 'asSalaryNature');
    var input = els.salaryForm && els.salaryForm.querySelector('[data-as="salaryDdInput"][data-field="' + field + '"]');
    if (hidden) hidden.value = value || '';
    if (input) input.value = value || '';
    state.salaryDdQuery[field] = value || '';
  }

  function resetSalaryModal() {
    state.salaryEditId = null;
    state.salaryDdOpen = null;
    state.salaryDdQuery = { componentType: '', nature: '' };
    state.salaryFySelected = AY_OPTIONS.slice();
    if (els.salaryForm) els.salaryForm.reset();
    setSalaryCombo('componentType', '');
    setSalaryCombo('nature', '');
    var title = document.getElementById('asSalaryTitle');
    if (title) title.textContent = 'Add Salary Ingredients';
    renderSalaryFyTags();
    renderSalaryDd('componentType');
    renderSalaryDd('nature');
  }

  function openSalaryModal(row) {
    resetSalaryModal();
    var title = document.getElementById('asSalaryTitle');
    if (row) {
      state.salaryEditId = row.id;
      if (title) title.textContent = 'Edit Salary Ingredients';
      if (els.salaryForm) {
        els.salaryForm.elements.name.value = row.name || '';
        els.salaryForm.elements.employeeHead.value = row.employeeHead || '';
        els.salaryForm.elements.order.value = row.order != null ? row.order : '';
        els.salaryForm.elements.taxStatus.value = row.taxStatus || 'Taxable';
        if (els.salaryForm.elements.showPayslip) els.salaryForm.elements.showPayslip.checked = row.showPayslip === 'Yes';
      }
      setSalaryCombo('componentType', row.componentType || '');
      setSalaryCombo('nature', row.nature || '');
      state.salaryFySelected = (row.fy || []).slice();
    }
    renderSalaryFyTags();
    openModal(els.salaryModal);
  }

  function closeSalaryModal() {
    state.salaryDdOpen = null;
    renderSalaryDd('componentType');
    renderSalaryDd('nature');
    closeModal(els.salaryModal);
  }

  function formatDedMonth(year, monthIndex) {
    return pad(monthIndex + 1) + '/' + year;
  }

  function parseDedMonth(value) {
    if (!value) return null;
    if (value.indexOf('/') > -1) {
      var p = value.split('/');
      return { month: parseInt(p[0], 10) - 1, year: parseInt(p[1], 10) };
    }
    if (value.indexOf('-') > -1) {
      var parts = value.split('-');
      return { month: parseInt(parts[1], 10) - 1, year: parseInt(parts[0], 10) };
    }
    return null;
  }

  function renderDedMonthGrid() {
    if (!els.dedMonthGrid || !els.dedMonthYear) return;
    els.dedMonthYear.textContent = String(state.deductionMonthYear);
    var selected = parseDedMonth(state.deductionMonthValue);
    els.dedMonthGrid.innerHTML = DED_MONTHS.map(function (label, idx) {
      var on = selected && selected.year === state.deductionMonthYear && selected.month === idx;
      return '<button type="button" class="as-month-pop__cell' + (on ? ' is-selected' : '') + '" data-as="dedMonthPick" data-month="' + idx + '">' + label + '</button>';
    }).join('');
  }

  function setDedMonth(value) {
    state.deductionMonthValue = value || '';
    if (els.dedStartMonth) els.dedStartMonth.value = value || '';
    if (els.dedStartMonthVal) els.dedStartMonthVal.value = value || '';
    var parsed = parseDedMonth(value);
    if (parsed) state.deductionMonthYear = parsed.year;
    renderDedMonthGrid();
  }

  function renderDedFyTags() {
    var box = document.getElementById('asDedFyTags');
    if (!box) return;
    box.innerHTML = state.deductionFySelected.map(function (fy) {
      return '<span class="as-fy-tag">' + escapeHtml(fy) + '<button type="button" class="as-fy-tag__rm" data-as="dedFyRemove" data-value="' + escapeHtml(fy) + '" aria-label="Remove">&times;</button></span>';
    }).join('');
  }

  function resetDeductionModal() {
    state.deductionEditId = null;
    state.deductionMonthOpen = false;
    state.deductionMonthYear = new Date().getFullYear();
    state.deductionMonthValue = '';
    state.deductionFySelected = DED_FY_OPTIONS.slice(0, 5);
    if (els.deductionForm) els.deductionForm.reset();
    setDedMonth('');
    if (els.dedMonthPop) els.dedMonthPop.hidden = true;
    var wrap = document.querySelector('.as-month-wrap');
    if (wrap) wrap.classList.remove('is-open');
    var title = document.getElementById('asDeductionTitle');
    if (title) title.textContent = 'Add Constant Deduction';
    if (els.deductionForm && els.deductionForm.elements.showPayslip) els.deductionForm.elements.showPayslip.checked = true;
    if (els.deductionForm && els.deductionForm.elements.deductFixed) els.deductionForm.elements.deductFixed.checked = true;
    renderDedFyTags();
    renderDedMonthGrid();
  }

  function openDeductionModal(row) {
    resetDeductionModal();
    var title = document.getElementById('asDeductionTitle');
    if (row) {
      state.deductionEditId = row.id;
      if (title) title.textContent = 'Edit Constant Deduction';
      if (els.deductionForm) {
        els.deductionForm.elements.name.value = row.name || '';
        els.deductionForm.elements.employeeHead.value = row.employeeHead || '';
        els.deductionForm.elements.order.value = row.order != null ? row.order : '';
        els.deductionForm.elements.deductionType.value = row.deductionType || '';
        els.deductionForm.elements.value.value = row.value || row.maxValue || '';
        els.deductionForm.elements.type.value = row.type || 'Monthly';
        els.deductionForm.elements.taxStatus.value = row.taxStatus || '';
        if (els.deductionForm.elements.attachTax) els.deductionForm.elements.attachTax.checked = !!row.attachTax;
        if (els.deductionForm.elements.showPayslip) els.deductionForm.elements.showPayslip.checked = row.showPayslip === 'Yes';
        if (els.deductionForm.elements.deductFixed) els.deductionForm.elements.deductFixed.checked = row.deductFixed !== false;
      }
      setDedMonth(row.startMonth || row.month || '');
      state.deductionFySelected = (row.fy || []).slice();
    }
    renderDedFyTags();
    openModal(els.deductionModal);
  }

  function closeDeductionModal() {
    state.deductionMonthOpen = false;
    if (els.dedMonthPop) els.dedMonthPop.hidden = true;
    var wrap = document.querySelector('.as-month-wrap');
    if (wrap) wrap.classList.remove('is-open');
    closeModal(els.deductionModal);
  }

  function bindDeductionModal(e) {
    var t = e.target;
    if (t.closest('[data-as="dedFyRemove"]')) {
      var fy = t.closest('[data-as="dedFyRemove"]').getAttribute('data-value');
      state.deductionFySelected = state.deductionFySelected.filter(function (x) { return x !== fy; });
      renderDedFyTags();
      return;
    }
    if (t.closest('[data-as="dedMonthPick"]')) {
      var monthIdx = parseInt(t.closest('[data-as="dedMonthPick"]').getAttribute('data-month'), 10);
      setDedMonth(formatDedMonth(state.deductionMonthYear, monthIdx));
      state.deductionMonthOpen = false;
      if (els.dedMonthPop) els.dedMonthPop.hidden = true;
      var wrap = document.querySelector('.as-month-wrap');
      if (wrap) wrap.classList.remove('is-open');
      return;
    }
    if (t.closest('[data-as="dedMonthPrevYear"]')) {
      state.deductionMonthYear -= 1;
      renderDedMonthGrid();
      return;
    }
    if (t.closest('[data-as="dedMonthNextYear"]')) {
      state.deductionMonthYear += 1;
      renderDedMonthGrid();
      return;
    }
    if (t.id === 'asDedMonthBtn' || t.closest('#asDedMonthBtn') || t.id === 'asDedStartMonth') {
      state.deductionMonthOpen = !state.deductionMonthOpen;
      if (els.dedMonthPop) els.dedMonthPop.hidden = !state.deductionMonthOpen;
      var monthWrap = document.querySelector('.as-month-wrap');
      if (monthWrap) monthWrap.classList.toggle('is-open', state.deductionMonthOpen);
      if (state.deductionMonthOpen) renderDedMonthGrid();
      return;
    }
  }

  function bindSalaryModal(e) {
    var t = e.target;
    if (t.closest('[data-as="salaryDdPick"]')) {
      var btn = t.closest('[data-as="salaryDdPick"]');
      setSalaryCombo(btn.getAttribute('data-field'), btn.getAttribute('data-value'));
      state.salaryDdOpen = null;
      renderSalaryDd(btn.getAttribute('data-field'));
      return;
    }
    if (t.closest('[data-as="salaryFyRemove"]')) {
      var fy = t.closest('[data-as="salaryFyRemove"]').getAttribute('data-value');
      state.salaryFySelected = state.salaryFySelected.filter(function (x) { return x !== fy; });
      renderSalaryFyTags();
    }
  }

  function bindSalaryModalInput(e) {
    var t = e.target;
    if (t.getAttribute('data-as') !== 'salaryDdInput') return;
    var field = t.getAttribute('data-field');
    state.salaryDdOpen = field;
    state.salaryDdQuery[field] = t.value || '';
    var hidden = document.getElementById(field === 'componentType' ? 'asSalaryComponentType' : 'asSalaryNature');
    if (hidden) hidden.value = '';
    renderSalaryDd(field);
  }

  function bindSalaryModalFocus(e) {
    var t = e.target;
    if (t.getAttribute('data-as') !== 'salaryDdInput') return;
    state.salaryDdOpen = t.getAttribute('data-field');
    renderSalaryDd(t.getAttribute('data-field'));
  }

  function deleteByKind(kind, id) {
    var map = { salary: 'salary', deduction: 'deductions', pay: 'pay', overhead: 'overhead', manual: 'manual', limit: 'limits' };
    var key = map[kind];
    if (!key || !state[key]) return;
    state[key] = state[key].filter(function (r) { return r.id !== id; });
    toast('Deleted', 'Record removed.');
    renderTab();
  }

  function bindDynamic(e) {
    var t = e.target;
    if (!t) return;

    if (t.closest('[data-as="pickName"]')) {
      state.dropdownName = t.closest('[data-as="pickName"]').getAttribute('data-value');
      state.nameOpen = false;
      state.valueOpen = false;
      state.nameQuery = '';
      renderDropdown();
      return;
    }
    if (t.closest('[data-as="pickValue"]')) {
      state.dropdownValue = t.closest('[data-as="pickValue"]').getAttribute('data-value') || '';
      state.valueOpen = false;
      renderDropdown();
      var valInput = els.dynamic.querySelector('[data-as="ddValue"]');
      if (valInput) valInput.focus();
      return;
    }
    if (t.closest('[data-as="saveDd"]')) {
      var val = (els.dynamic.querySelector('[data-as="ddValue"]') || {}).value || '';
      if (!state.dropdownName || !String(val).trim()) { toast('Required', 'Name and Value are required.'); return; }
      if (!state.dropdowns[state.dropdownName]) state.dropdowns[state.dropdownName] = [];
      state.dropdowns[state.dropdownName].push(String(val).trim());
      state.dropdownValue = '';
      toast('Saved', 'Dropdown value added.');
      renderDropdown();
      return;
    }
    if (t.closest('[data-as="delDd"]')) {
      var di = parseInt(t.closest('[data-as="delDd"]').getAttribute('data-idx'), 10);
      state.dropdowns[state.dropdownName].splice(di, 1);
      toast('Deleted', 'Value removed.');
      renderDropdown();
      return;
    }
    if (t.closest('[data-as="editDd"]')) {
      var ei = parseInt(t.closest('[data-as="editDd"]').getAttribute('data-idx'), 10);
      state.dropdownValue = state.dropdowns[state.dropdownName][ei] || '';
      state.dropdowns[state.dropdownName].splice(ei, 1);
      renderDropdown();
      return;
    }

    if (t.closest('[data-as="addSalary"]')) { openSalaryModal(null); return; }
    if (t.closest('[data-as="addDeduction"]')) { openDeductionModal(null); return; }
    if (t.closest('[data-as="addOverhead"]')) { openOverheadModal(null); return; }
    if (t.closest('[data-as="addManual"]')) { openManualModal(null); return; }
    if (t.closest('[data-as="addLimit"]')) { openModal(els.limitModal); return; }

    if (t.closest('[data-as="toggleCols"]')) {
      state.columnsOpen = !state.columnsOpen;
      state.filterOpen = false;
      if (state.tab === 'salary') renderSalary();
      else renderTab();
      return;
    }
    if (t.closest('[data-as="toggleFilter"]')) {
      state.filterOpen = !state.filterOpen;
      state.columnsOpen = false;
      if (state.tab === 'salary') renderSalary();
      else renderTab();
      return;
    }
    if (t.closest('[data-as="selectAllCols"]')) {
      SALARY_COLS.forEach(function (c) { state.salaryVisible[c.id] = true; });
      renderSalary();
      return;
    }
    if (t.closest('[data-as="resetFilter"]')) {
      state.salaryFilters = { component: {}, nature: {}, tax: {} };
      state.filterAccOpen = { component: false, nature: false, tax: false };
      if (state.tab === 'salary') renderSalary();
      else renderTab();
      return;
    }
    if (t.closest('[data-as="accToggle"]')) {
      var acc = t.closest('.as-filter-acc');
      if (acc) {
        var key = acc.getAttribute('data-filter-key');
        if (key) state.filterAccOpen[key] = !state.filterAccOpen[key];
        if (state.tab === 'salary') renderSalary();
        else renderTab();
      }
      return;
    }
    if (t.closest('[data-as="delete"]')) {
      var del = t.closest('[data-as="delete"]');
      deleteByKind(del.getAttribute('data-kind'), del.getAttribute('data-id'));
      return;
    }
    if (t.closest('[data-as="edit"]')) {
      var editBtn = t.closest('[data-as="edit"]');
      var kind = editBtn.getAttribute('data-kind');
      var id = editBtn.getAttribute('data-id');
      if (kind === 'salary') {
        var row = state.salary.filter(function (r) { return r.id === id; })[0];
        if (row) openSalaryModal(row);
        return;
      }
      if (kind === 'deduction') {
        var dedRow = state.deductions.filter(function (r) { return r.id === id; })[0];
        if (dedRow) openDeductionModal(dedRow);
        return;
      }
      if (kind === 'pay') {
        var payRow = state.pay.filter(function (r) { return r.id === id; })[0];
        if (payRow) openPayModal(payRow);
        return;
      }
      if (kind === 'overhead') {
        var ohEditRow = state.overhead.filter(function (r) { return r.id === id; })[0];
        if (ohEditRow) openOverheadModal(ohEditRow);
        return;
      }
      if (kind === 'manual') {
        var manualRow = state.manual.filter(function (r) { return r.id === id; })[0];
        if (manualRow) openManualModal(manualRow);
        return;
      }
      toast('Info', 'Opening details…');
      return;
    }
    if (t.closest('[data-as="viewFy"]')) {
      var fyBtn = t.closest('[data-as="viewFy"]');
      var fyRow = state.salary.filter(function (r) { return r.id === fyBtn.getAttribute('data-id'); })[0];
      if (fyRow) openFyViewModal(fyRow);
      return;
    }
    if (t.closest('[data-as="viewComp"]')) {
      var viewBtn = t.closest('[data-as="viewComp"]');
      if (viewBtn.getAttribute('data-kind') === 'pay') {
        var payRow = state.pay.filter(function (r) { return r.id === viewBtn.getAttribute('data-id'); })[0];
        if (payRow) openSalaryDetailsModal(payRow);
        return;
      }
      if (viewBtn.getAttribute('data-kind') === 'overhead') {
        var ohRow = state.overhead.filter(function (r) { return r.id === viewBtn.getAttribute('data-id'); })[0];
        if (ohRow) openOverheadDetailsModal(ohRow);
        return;
      }
      toast('Info', 'Opening details…');
      return;
    }
    if (t.closest('[data-as="toast"]')) {
      toast('Info', 'Opening details…');
      return;
    }
    if (t.closest('[data-as="bulkVerify"]')) { toast('Bulk Verify', 'Selected pay records verified.'); return; }
    if (t.closest('[data-as="export"]')) { toast('Export', 'Pay details exported.'); return; }
    if (t.closest('[data-as="prev"]')) { if (state.page > 1) { state.page -= 1; renderTab(); } return; }
    if (t.closest('[data-as="next"]')) { state.page += 1; renderTab(); return; }
  }

  function bindDynamicChange(e) {
    var t = e.target;
    if (!t) return;
    if (t.getAttribute('data-as') === 'filt') {
      if (state.tab === 'salary') {
        var group = t.getAttribute('data-group');
        var val = t.value;
        if (!state.salaryFilters[group]) state.salaryFilters[group] = {};
        if (t.checked) state.salaryFilters[group][val] = true;
        else delete state.salaryFilters[group][val];
        state.page = 1;
        renderSalary();
      }
      return;
    }
    if (t.getAttribute('data-as') === 'col') {
      state.salaryVisible[t.getAttribute('data-id')] = !!t.checked;
      renderSalary();
      return;
    }
    if (t.getAttribute('data-as') === 'pageSize') {
      state.pageSize = parseInt(t.value, 10) || 10;
      state.page = 1;
      renderTab();
      return;
    }
    if (t.getAttribute('data-as') === 'employee') {
      state.employee = t.value || '';
      state.page = 1;
      renderTab();
      return;
    }
    if (t.getAttribute('data-as') === 'status') {
      state.status = t.value || 'Active';
      return;
    }
    if (t.getAttribute('data-as') === 'selectPay') {
      if (t.checked) state.selectedPay[t.getAttribute('data-id')] = true;
      else delete state.selectedPay[t.getAttribute('data-id')];
      return;
    }
    if (t.getAttribute('data-as') === 'selectAllPay') {
      payRows().forEach(function (r) {
        if (t.checked) state.selectedPay[r.id] = true;
        else delete state.selectedPay[r.id];
      });
      renderPay();
    }
  }

  function bindDynamicInput(e) {
    var t = e.target;
    if (!t) return;
    if (t.getAttribute('data-as') === 'search') {
      state.search = t.value || '';
      state.page = 1;
      renderSalary();
      return;
    }
    if (t.getAttribute('data-as') === 'ddName') {
      state.nameQuery = t.value || '';
      state.nameOpen = true;
      state.dropdownName = '';
      var list = document.getElementById('asDdNameList');
      if (list) {
        var nameList = DROPDOWN_NAMES.filter(function (n) {
          return !state.nameQuery || n.toLowerCase().indexOf(state.nameQuery.toLowerCase()) !== -1;
        });
        list.hidden = false;
        list.innerHTML = nameList.map(function (n) {
          return '<button type="button" class="as-combo__opt" data-as="pickName" data-value="' + escapeHtml(n) + '">' + escapeHtml(n) + '</button>';
        }).join('') || '<div class="as-combo__opt" style="cursor:default;color:#8c8c8c">No options</div>';
      }
      return;
    }
    if (t.getAttribute('data-as') === 'ddValue') {
      state.dropdownValue = t.value || '';
      state.valueOpen = true;
      renderValueTip();
      return;
    }
  }

  function formVal(form, name) {
    var el = form.elements[name];
    if (!el) return '';
    if (el.type === 'checkbox') return !!el.checked;
    return el.value;
  }

  function bind() {
    els.tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { setTab(tab.getAttribute('data-tab')); });
    });

    if (els.dynamic) {
      els.dynamic.addEventListener('click', bindDynamic);
      els.dynamic.addEventListener('change', bindDynamicChange);
      els.dynamic.addEventListener('input', bindDynamicInput);
      els.dynamic.addEventListener('focusin', function (e) {
        if (e.target.getAttribute('data-as') === 'ddName') {
          state.nameOpen = true;
          state.valueOpen = false;
          var list = document.getElementById('asDdNameList');
          if (list) list.hidden = false;
        }
        if (e.target.getAttribute('data-as') === 'ddValue') {
          state.valueOpen = true;
          state.nameOpen = false;
          renderValueTip();
        }
      });
    }

    document.addEventListener('click', function (e) {
      if (state.nameOpen && !e.target.closest('.as-combo')) {
        state.nameOpen = false;
        var list = document.getElementById('asDdNameList');
        if (list) list.hidden = true;
      }
      if (state.valueOpen && !e.target.closest('.as-value-combo')) {
        state.valueOpen = false;
        var tip = document.getElementById('asDdValueTip');
        if (tip) tip.hidden = true;
      }
      if ((state.columnsOpen || state.filterOpen) && !e.target.closest('.as-wrap')) {
        state.columnsOpen = false;
        state.filterOpen = false;
        if (state.tab === 'salary') renderSalary();
        else if (state.tab === 'deduction') renderDeduction();
        else renderTab();
      }
      if (state.salaryDdOpen && !e.target.closest('.as-scombo[data-field="' + state.salaryDdOpen + '"]')) {
        state.salaryDdOpen = null;
        renderSalaryDd('componentType');
        renderSalaryDd('nature');
      }
      if (state.deductionMonthOpen && !e.target.closest('.as-month-wrap:not(.as-month-wrap--pay)')) {
        state.deductionMonthOpen = false;
        if (els.dedMonthPop) els.dedMonthPop.hidden = true;
        var monthWrap = document.querySelector('.as-month-wrap:not(.as-month-wrap--pay)');
        if (monthWrap) monthWrap.classList.remove('is-open');
      }
      if (state.payMonthOpen && !e.target.closest('.as-month-wrap--pay')) {
        state.payMonthOpen = false;
        if (els.payMonthPop) els.payMonthPop.hidden = true;
        var payWrap = document.querySelector('.as-month-wrap--pay');
        if (payWrap) payWrap.classList.remove('is-open');
      }
      if (state.overheadMonthOpen && !e.target.closest('.as-month-wrap--oh')) {
        state.overheadMonthOpen = false;
        if (els.ohMonthPop) els.ohMonthPop.hidden = true;
        var ohWrap = document.querySelector('.as-month-wrap--oh');
        if (ohWrap) ohWrap.classList.remove('is-open');
      }
      if (state.manualMonthOpen && !e.target.closest('.as-month-wrap--manual')) {
        state.manualMonthOpen = false;
        if (els.manualMonthPop) els.manualMonthPop.hidden = true;
        var manualWrap = document.querySelector('.as-month-wrap--manual');
        if (manualWrap) manualWrap.classList.remove('is-open');
      }
    });

    if (els.deductionModal) {
      els.deductionModal.addEventListener('click', bindDeductionModal);
    }

    if (els.overheadModal) {
      els.overheadModal.addEventListener('click', bindOverheadModal);
      els.overheadModal.addEventListener('input', bindOverheadModalInput);
    }

    if (els.manualModal) {
      els.manualModal.addEventListener('click', bindManualModal);
    }

    if (els.payModal) {
      els.payModal.addEventListener('click', bindPayModal);
      els.payModal.addEventListener('input', bindPayModalInput);
    }

    if (els.salaryModal) {
      els.salaryModal.addEventListener('click', bindSalaryModal);
      els.salaryModal.addEventListener('input', bindSalaryModalInput);
      els.salaryModal.addEventListener('focusin', bindSalaryModalFocus);
    }

    document.querySelectorAll('[data-as-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-as-close');
        if (key === 'salary') { closeSalaryModal(); resetSalaryModal(); return; }
        if (key === 'deduction') { closeDeductionModal(); resetDeductionModal(); return; }
        if (key === 'pay') { closePayModal(); resetPayModal(); return; }
        if (key === 'overhead') { closeOverheadModal(); resetOverheadModal(); return; }
        if (key === 'manual') { closeManualModal(); resetManualModal(); return; }
        closeModal({
          salary: els.salaryModal, deduction: els.deductionModal, pay: els.payModal, overhead: els.overheadModal,
          manual: els.manualModal, limit: els.limitModal, fyView: els.fyViewModal,
          salaryDetails: els.salaryDetailsModal, overheadDetails: els.overheadDetailsModal
        }[key]);
      });
    });

    if (els.salaryForm) {
      els.salaryForm.addEventListener('submit', function () {
        var compType = formVal(els.salaryForm, 'componentType');
        var nature = formVal(els.salaryForm, 'nature');
        if (!compType || !nature) { toast('Required', 'Component Type and Nature are required.'); return; }
        var payload = {
          order: formVal(els.salaryForm, 'order') || state.salary.length + 1,
          componentType: compType,
          fy: state.salaryFySelected.slice(),
          nature: nature,
          taxStatus: formVal(els.salaryForm, 'taxStatus'),
          showPayslip: formVal(els.salaryForm, 'showPayslip') ? 'Yes' : 'No',
          name: formVal(els.salaryForm, 'name'),
          employeeHead: formVal(els.salaryForm, 'employeeHead')
        };
        if (state.salaryEditId) {
          var existing = state.salary.filter(function (r) { return r.id === state.salaryEditId; })[0];
          if (existing) {
            state.salary = state.salary.map(function (r) {
              if (r.id !== state.salaryEditId) return r;
              return Object.assign({}, r, payload);
            });
          }
        } else {
          state.salary.push(Object.assign({
            id: 's' + Date.now(), ingredient: '--', percent: '--', upperLimit: '--', rounding: '--'
          }, payload));
        }
        closeSalaryModal();
        resetSalaryModal();
        setTab('salary');
      });
    }

    if (els.deductionForm) {
      els.deductionForm.addEventListener('submit', function () {
        var startMonth = formVal(els.deductionForm, 'startMonth') || state.deductionMonthValue;
        if (!startMonth) { toast('Required', 'Start Month is required.'); return; }
        var val = formVal(els.deductionForm, 'value') || '--';
        var payload = {
          name: formVal(els.deductionForm, 'name'),
          employeeHead: formVal(els.deductionForm, 'employeeHead'),
          order: formVal(els.deductionForm, 'order'),
          month: startMonth.indexOf('/') > -1 ? startMonth.split('/').reverse().join('-') + '-01' : startMonth,
          startMonth: startMonth,
          deductionType: formVal(els.deductionForm, 'deductionType'),
          applicableOn: '--',
          fy: state.deductionFySelected.slice(),
          percent: '--',
          maxValue: val,
          value: val,
          rounding: '--',
          type: formVal(els.deductionForm, 'type'),
          taxStatus: formVal(els.deductionForm, 'taxStatus') || 'Non-Deductible',
          showPayslip: formVal(els.deductionForm, 'showPayslip') ? 'Yes' : 'No',
          attachTax: !!formVal(els.deductionForm, 'attachTax'),
          deductFixed: !!formVal(els.deductionForm, 'deductFixed')
        };
        if (state.deductionEditId) {
          state.deductions = state.deductions.map(function (r) {
            if (r.id !== state.deductionEditId) return r;
            return Object.assign({}, r, payload);
          });
          toast('Saved', 'Constant deduction updated.');
        } else {
          state.deductions.push(Object.assign({ id: 'd' + Date.now() }, payload));
          toast('Saved', 'Constant deduction added.');
        }
        closeDeductionModal();
        resetDeductionModal();
        setTab('deduction');
      });
    }

    if (els.payForm) {
      els.payForm.addEventListener('submit', function () {
        var validFrom = formVal(els.payForm, 'validFrom') || state.payMonthValue;
        if (!validFrom) { toast('Required', 'Valid From is required.'); return; }
        var enabledComps = state.payCompRows.filter(function (r) { return r.enabled; });
        var components = enabledComps.map(function (r) {
          var n = String(r.value || '').replace(/,/g, '');
          return { component: r.name, nature: 'MONTHLY', value: Number(n) || 0 };
        });
        var dedLabel = state.payDedTags.length ? state.payDedTags.join(', ') : '--';
        var payload = {
          employee: formVal(els.payForm, 'employee'),
          validFromMonth: validFrom,
          validFrom: validFrom,
          paymentMode: formVal(els.payForm, 'paymentMode'),
          accountName: formVal(els.payForm, 'accountName'),
          bankAccount: formVal(els.payForm, 'bankAccount'),
          ifsc: formVal(els.payForm, 'ifsc'),
          pan: formVal(els.payForm, 'pan') || '',
          uan: formVal(els.payForm, 'uan') || '',
          aadhar: formVal(els.payForm, 'aadhar') || '',
          deductions: dedLabel,
          deductionTags: state.payDedTags.slice(),
          notes: formVal(els.payForm, 'notes') || '--',
          payCompRows: state.payCompRows.map(function (r) { return Object.assign({}, r); }),
          components: components.length ? components : DEFAULT_PAY_COMPONENTS.slice()
        };
        if (state.payEditId) {
          state.pay = state.pay.map(function (r) {
            if (r.id !== state.payEditId) return r;
            return Object.assign({}, r, payload);
          });
          toast('Saved', 'Pay details updated.');
        } else {
          state.pay.unshift(Object.assign({ id: 'p' + Date.now(), status: 'Verified' }, payload));
          toast('Saved', 'Pay details added.');
        }
        closePayModal();
        resetPayModal();
        setTab('pay');
      });
    }

    if (els.overheadForm) {
      els.overheadForm.addEventListener('submit', function () {
        var validFrom = formVal(els.overheadForm, 'validFrom') || state.overheadMonthValue;
        if (!validFrom) { toast('Required', 'Valid From is required.'); return; }
        var enabled = state.overheadCompRows.filter(function (r) { return r.enabled; });
        var components = enabled.map(function (r) {
          var n = String(r.value || '').replace(/,/g, '');
          return { component: r.name, value: Number(n) || 0 };
        });
        var payload = {
          employee: formVal(els.overheadForm, 'employee'),
          validFromMonth: validFrom,
          validFrom: validFrom,
          status: 'Active',
          compRows: state.overheadCompRows.map(function (r) { return Object.assign({}, r); }),
          components: components.length ? components : DEFAULT_OVERHEAD_DETAILS.slice()
        };
        if (state.overheadEditId) {
          state.overhead = state.overhead.map(function (r) {
            if (r.id !== state.overheadEditId) return r;
            return Object.assign({}, r, payload);
          });
          toast('Saved', 'Overhead updated.');
        } else {
          state.overhead.unshift(Object.assign({ id: 'o' + Date.now() }, payload));
          toast('Saved', 'Overhead added.');
        }
        closeOverheadModal();
        resetOverheadModal();
        setTab('overhead');
      });
    }

    if (els.manualForm) {
      els.manualForm.addEventListener('submit', function () {
        var monthRaw = formVal(els.manualForm, 'month') || state.manualMonthValue;
        if (!monthRaw) { toast('Required', 'Month is required.'); return; }
        var perMinute = formVal(els.manualForm, 'perMinute');
        if (!perMinute) { toast('Required', 'Per Minute Salary is required.'); return; }
        var monthKey = monthRaw;
        var label = manualMonthLabel(monthKey);
        if (state.manualEditId) {
          state.manual = state.manual.map(function (r) {
            if (r.id !== state.manualEditId) return r;
            return Object.assign({}, r, {
              perMinute: perMinute,
              month: label,
              monthKey: monthKey
            });
          });
          toast('Saved', 'Manual costing updated.');
        } else {
          var emp = formVal(els.manualForm, 'employee');
          if (!emp) { toast('Required', 'Employee is required.'); return; }
          state.manual.unshift({
            id: 'm' + Date.now(),
            employee: emp,
            employeeCode: '',
            perMinute: perMinute,
            month: label,
            monthKey: monthKey
          });
          toast('Saved', 'Manual costing added.');
        }
        closeManualModal();
        resetManualModal();
        setTab('manual');
      });
    }

    if (els.limitForm) {
      els.limitForm.addEventListener('submit', function () {
        var d = new Date();
        state.limits.unshift({
          id: 'l' + Date.now(),
          expense: formVal(els.limitForm, 'expense'),
          designation: formVal(els.limitForm, 'designation'),
          amount: formVal(els.limitForm, 'amount'),
          createdAt: pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear()
        });
        els.limitForm.reset();
        closeModal(els.limitModal);
        toast('Saved', 'Expense limit added.');
        setTab('limit');
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAllModals();
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

  fillEmpSelects();
  bind();
  tickClock();
  setInterval(tickClock, 1000);
  setTab('dropdown');
})();
