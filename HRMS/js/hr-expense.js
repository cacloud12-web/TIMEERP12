/**
 * TIME ERP — HR Expense
 * Tabs: Pending | Approved | Rejected
 */
(function () {
  'use strict';

  var CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
  var SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';
  var EXCEL = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 2.75h7.5L19.25 7.5V20.5a.75.75 0 01-.75.75H7a.75.75 0 01-.75-.75V3.5A.75.75 0 017 2.75z" stroke="#217346" stroke-width="1.5" stroke-linejoin="round"/><path d="M14.5 2.75V7.5h4.75" stroke="#217346" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.2 10.2l5.6 7.6M14.8 10.2l-5.6 7.6" stroke="#217346" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var PDF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M14 3v5h5"/><path d="M8.5 14h3.2a1.4 1.4 0 010 2.8H9.8V19"/><path d="M14.5 14v5M14.5 14h1.4a1.5 1.5 0 010 3H14.5"/></svg>';

  var EMPLOYEES = [
    { code: 'AN2', name: 'Tarun Gaur' },
    { code: 'SA009', name: 'Suhanshi Rawat' },
    { code: 'SO6829', name: 'SONIYA KASHYAP' },
    { code: 'HA6413', name: 'Hardik rawat' },
    { code: 'SI6830', name: 'SIMRAN KASHYAP' },
    { code: 'DA002', name: 'Dev Aggarwal' },
    { code: 'KK005', name: 'Kamal Kant Sharma' },
    { code: 'SB001', name: 'Saurabh Bhardwaj' },
    { code: 'RS003', name: 'Riya Sharma' },
    { code: 'AV004', name: 'Aman Verma' }
  ];

  var CUSTOMERS = [
    { code: '21', name: 'Internal' },
    { code: '174', name: 'SAURABH BHARDWAJ' },
    { code: '173', name: 'SAURABH BHARDWAJ HUF' },
    { code: 'TH296', name: 'THE GOLD REALTY' },
    { code: 'LA3720', name: 'law seva management pvt ltd' },
    { code: '145', name: 'PERFECT PAIR' },
    { code: '88', name: 'Cloud Desk Clients' },
    { code: '102', name: 'Pinnacle Soft' }
  ];

  var PAY_STATUSES = ['PAID', 'UNPAID', 'PENDING'];

  var PENDING_COLS = [
    { id: 'no', label: 'S. No.' },
    { id: 'expenseId', label: 'Expense ID' },
    { id: 'employee', label: 'Employee Name' },
    { id: 'client', label: 'Client Name' },
    { id: 'createdDate', label: 'Created Date' },
    { id: 'amount', label: 'Total Amount' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' }
  ];

  var APPROVED_COLS = [
    { id: 'check', label: '' },
    { id: 'no', label: 'S. No.' },
    { id: 'expenseId', label: 'Expense ID' },
    { id: 'employee', label: 'Employee Name' },
    { id: 'client', label: 'Client Name' },
    { id: 'createdDate', label: 'Created Date' },
    { id: 'amount', label: 'Total Amount' },
    { id: 'approvedAmount', label: 'Approved Amount' },
    { id: 'status', label: 'Status' },
    { id: 'approvedDate', label: 'Approved Date' },
    { id: 'paymentStatus', label: 'Payment Status' },
    { id: 'paidDate', label: 'Paid Date' },
    { id: 'paymentMode', label: 'Payment Mode' },
    { id: 'finalPayable', label: 'Final Payable Amount' },
    { id: 'hrRemark', label: 'HR Remark' },
    { id: 'empRemark', label: 'Emp Remark' },
    { id: 'action', label: 'Action' }
  ];

  var REJECTED_COLS = [
    { id: 'no', label: 'S. No.' },
    { id: 'expenseId', label: 'Expense ID' },
    { id: 'employee', label: 'Employee Name' },
    { id: 'client', label: 'Client Name' },
    { id: 'createdDate', label: 'Created Date' },
    { id: 'amount', label: 'Total Amount' },
    { id: 'status', label: 'Status' },
    { id: 'rejectedDate', label: 'Rejected Date' },
    { id: 'remark', label: 'Remark' },
    { id: 'action', label: 'Action' }
  ];

  var state = {
    tab: 'pending',
    page: 1,
    pageSize: 10,
    employee: '',
    customer: '',
    paymentStatus: '',
    selected: {},
    payMenuId: '',
    openCombo: '',
    comboQuery: '',
    checkedIn: false,
    pending: [
      { id: 'p1', expenseId: '4840', employee: 'Dev Aggarwal', client: 'Internal', createdDate: '12/08/2026', amount: 5000 },
      { id: 'p2', expenseId: '4841', employee: 'Dev Aggarwal', client: 'THE GOLD REALTY', createdDate: '12/08/2026', amount: 2500 },
      { id: 'p3', expenseId: '4842', employee: 'Kamal Kant Sharma', client: 'Internal', createdDate: '13/08/2026', amount: 3200 },
      { id: 'p4', expenseId: '4843', employee: 'Kamal Kant Sharma', client: 'PERFECT PAIR', createdDate: '13/08/2026', amount: 1800 },
      { id: 'p5', expenseId: '4844', employee: 'Dev Aggarwal', client: 'Pinnacle Soft', createdDate: '14/08/2026', amount: 2700 },
      { id: 'p6', expenseId: '4845', employee: 'Kamal Kant Sharma', client: 'Internal', createdDate: '14/08/2026', amount: 1800 }
    ],
    approved: [
      { id: 'a1', expenseId: '6200', employee: 'Dev Aggarwal', client: 'Internal', createdDate: '08/08/2026', amount: 1000, approvedAmount: 1000, approvedDate: '13-08-2026', paymentStatus: 'PENDING', paidDate: '--', paymentMode: '--', finalPayable: '--', hrRemark: '--', empRemark: '--' },
      { id: 'a2', expenseId: '6198', employee: 'Kamal Kant Sharma', client: 'THE GOLD REALTY', createdDate: '07/08/2026', amount: 444, approvedAmount: 444, approvedDate: '13-08-2026', paymentStatus: 'PENDING', paidDate: '--', paymentMode: '--', finalPayable: '--', hrRemark: '--', empRemark: '--' },
      { id: 'a3', expenseId: '6195', employee: 'Saurabh Bhardwaj', client: 'Internal', createdDate: '06/08/2026', amount: 550, approvedAmount: 550, approvedDate: '12-08-2026', paymentStatus: 'UNPAID', paidDate: '--', paymentMode: '--', finalPayable: '--', hrRemark: '--', empRemark: '--' },
      { id: 'a4', expenseId: '6188', employee: 'Riya Sharma', client: 'PERFECT PAIR', createdDate: '05/08/2026', amount: 2200, approvedAmount: 2000, approvedDate: '11-08-2026', paymentStatus: 'PAID', paidDate: '2026-08-12', paymentMode: 'online', finalPayable: 2000, hrRemark: 'OK', empRemark: 'OK' },
      { id: 'a5', expenseId: '6180', employee: 'Aman Verma', client: 'Cloud Desk Clients', createdDate: '04/08/2026', amount: 1500, approvedAmount: 1500, approvedDate: '10-08-2026', paymentStatus: 'PAID', paidDate: '2026-08-11', paymentMode: 'online', finalPayable: 1500, hrRemark: 'OK', empRemark: 'OK' },
      { id: 'a6', expenseId: '6172', employee: 'Tarun Gaur', client: 'Internal', createdDate: '03/08/2026', amount: 800, approvedAmount: 800, approvedDate: '09-08-2026', paymentStatus: 'PAID', paidDate: '2026-08-10', paymentMode: 'online', finalPayable: 800, hrRemark: 'OK', empRemark: 'OK' },
      { id: 'a7', expenseId: '6165', employee: 'SONIYA KASHYAP', client: 'SAURABH BHARDWAJ', createdDate: '02/08/2026', amount: 1200, approvedAmount: 1200, approvedDate: '08-08-2026', paymentStatus: 'PAID', paidDate: '2026-08-09', paymentMode: 'online', finalPayable: 1200, hrRemark: 'OK', empRemark: 'OK' }
    ],
    rejected: [
      { id: 'r1', expenseId: '6101', employee: 'Dev Aggarwal', client: 'Internal', createdDate: '01/08/2026', amount: 3500, rejectedDate: '05-08-2026', remark: 'Missing receipt attached' },
      { id: 'r2', expenseId: '6102', employee: 'Kamal Kant Sharma', client: 'THE GOLD REALTY', createdDate: '02/08/2026', amount: 1200, rejectedDate: '06-08-2026', remark: 'Amount exceeds policy limit' },
      { id: 'r3', expenseId: '6103', employee: 'Saurabh Bhardwaj', client: 'PERFECT PAIR', createdDate: '03/08/2026', amount: 2800, rejectedDate: '07-08-2026', remark: 'Duplicate claim submitted' },
      { id: 'r4', expenseId: '6104', employee: 'Riya Sharma', client: 'Cloud Desk Clients', createdDate: '04/08/2026', amount: 950, rejectedDate: '08-08-2026', remark: 'Invalid expense category' },
      { id: 'r5', expenseId: '6105', employee: 'Tarun Gaur', client: 'Internal', createdDate: '05/08/2026', amount: 4200, rejectedDate: '09-08-2026', remark: 'Client approval not provided' }
    ]
  };

  var els = {
    tabs: Array.prototype.slice.call(document.querySelectorAll('.he-tab')),
    toolbar: document.getElementById('heToolbar'),
    sectionTitle: document.getElementById('heSectionTitle'),
    head: document.getElementById('heTableHead'),
    body: document.getElementById('heTableBody'),
    table: document.getElementById('heTable'),
    empty: document.getElementById('heEmpty'),
    totalValue: document.getElementById('heTotalValue'),
    pageSize: document.getElementById('hePageSize'),
    prev: document.getElementById('hePrev'),
    next: document.getElementById('heNext'),
    pageInput: document.getElementById('hePageInput'),
    pageTotal: document.getElementById('hePageTotal'),
    count: document.getElementById('heCount'),
    topCheckIn: document.getElementById('heTopCheckInBtn'),
    topClock: document.getElementById('heTopClock')
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

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function labelOf(item) { return '(' + item.code + ') ' + item.name; }

  function rowsForTab() {
    if (state.tab === 'approved') return state.approved;
    if (state.tab === 'rejected') return state.rejected;
    return state.pending;
  }

  function filteredRows() {
    return rowsForTab().filter(function (r) {
      if (state.employee && r.employee !== state.employee) return false;
      if (state.customer && r.client !== state.customer) return false;
      if (state.tab === 'approved' && state.paymentStatus && r.paymentStatus !== state.paymentStatus) return false;
      return true;
    });
  }

  function selectedIds() {
    return Object.keys(state.selected).filter(function (k) { return state.selected[k]; });
  }

  function badgeHtml(status) {
    var cls = 'he-badge--pending';
    if (status === 'Approved') cls = 'he-badge--approved';
    if (status === 'Rejected') cls = 'he-badge--rejected';
    return '<span class="he-badge ' + cls + '">' + escapeHtml(status) + '</span>';
  }

  function pdfBtn(id) {
    return '<button type="button" class="he-pdf" data-he="pdf" data-id="' + escapeHtml(id) + '" aria-label="View PDF">' + PDF + '</button>';
  }

  function payCell(r) {
    var isPaid = r.paymentStatus === 'PAID';
    var label = isPaid ? 'PAID' : (r.paymentStatus === 'UNPAID' ? 'UNPAID' : 'Update Status');
    var cls = isPaid ? 'he-pay-btn he-pay-btn--paid' : 'he-pay-btn';
    var open = state.payMenuId === r.id;
    return '<div class="he-pay-wrap">' +
      '<button type="button" class="' + cls + '" data-he="payToggle" data-id="' + escapeHtml(r.id) + '">' +
        escapeHtml(label) + CHEV +
      '</button>' +
      '<div class="he-pay-menu" ' + (open ? '' : 'hidden') + '>' +
        PAY_STATUSES.map(function (s) {
          return '<button type="button" data-he="setPay" data-id="' + escapeHtml(r.id) + '" data-status="' + s + '">' + s + '</button>';
        }).join('') +
      '</div>' +
    '</div>';
  }

  function comboHtml(kind, placeholder, withSearch) {
    var value = '';
    if (kind === 'employee' && state.employee) value = state.employee;
    if (kind === 'customer' && state.customer) value = state.customer;
    if (kind === 'payment' && state.paymentStatus) value = state.paymentStatus;
    var open = state.openCombo === kind;
    var icon = withSearch ? SEARCH : CHEV;
    return '<div class="he-combo' + (kind === 'payment' ? ' he-combo--pay' : '') + '" data-combo="' + kind + '">' +
      '<input type="text" class="he-combo__input" data-he-combo-input="' + kind + '" placeholder="' + escapeHtml(placeholder) + '" value="' + escapeHtml(value) + '" autocomplete="off" aria-expanded="' + (open ? 'true' : 'false') + '">' +
      '<span class="he-combo__icon" aria-hidden="true">' + icon + '</span>' +
      '<div class="he-combo__list" data-he-combo-list="' + kind + '" ' + (open ? '' : 'hidden') + '></div>' +
    '</div>';
  }

  function fillComboList(kind) {
    var list = document.querySelector('[data-he-combo-list="' + kind + '"]');
    if (!list) return;
    var q = String(state.comboQuery || '').trim().toLowerCase();
    var html = '<button type="button" class="he-combo__opt he-combo__opt--clear" data-he-pick="' + kind + '" data-value="">Clear</button>';
    var items = [];
    if (kind === 'employee') {
      items = EMPLOYEES.filter(function (e) {
        if (!q) return true;
        return labelOf(e).toLowerCase().indexOf(q) !== -1 || e.name.toLowerCase().indexOf(q) !== -1;
      }).map(function (e) {
        var active = state.employee === e.name ? ' is-active' : '';
        return '<button type="button" class="he-combo__opt' + active + '" data-he-pick="employee" data-value="' + escapeHtml(e.name) + '">' + escapeHtml(labelOf(e)) + '</button>';
      });
    } else if (kind === 'customer') {
      items = CUSTOMERS.filter(function (c) {
        if (!q) return true;
        return labelOf(c).toLowerCase().indexOf(q) !== -1 || c.name.toLowerCase().indexOf(q) !== -1;
      }).map(function (c) {
        var active = state.customer === c.name ? ' is-active' : '';
        return '<button type="button" class="he-combo__opt' + active + '" data-he-pick="customer" data-value="' + escapeHtml(c.name) + '">' + escapeHtml(labelOf(c)) + '</button>';
      });
    } else {
      items = PAY_STATUSES.filter(function (s) {
        return !q || s.toLowerCase().indexOf(q) !== -1;
      }).map(function (s) {
        var active = state.paymentStatus === s ? ' is-active' : '';
        return '<button type="button" class="he-combo__opt' + active + '" data-he-pick="payment" data-value="' + s + '">' + s + '</button>';
      });
    }
    list.innerHTML = html + (items.length ? items.join('') : '<div class="he-combo__opt" style="cursor:default;color:#8c8c8c">No options</div>');
  }

  function sectionTitleText() {
    if (state.tab === 'approved') return 'Approved Expenses';
    if (state.tab === 'rejected') return 'Rejected Expenses';
    return 'Pending Expenses';
  }

  function renderToolbar() {
    if (els.sectionTitle) els.sectionTitle.textContent = sectionTitleText();
    if (!els.toolbar) return;
    var left = '';
    if (state.tab === 'approved') {
      left = '<div class="he-toolbar__left">' +
        '<button type="button" class="he-bulk-btn" data-he="bulkPay"' + (selectedIds().length ? '' : ' disabled') + '>Update Payment Status ' + CHEV + '</button>' +
      '</div>';
    }
    var filters = '';
    if (state.tab === 'approved') filters += comboHtml('payment', 'Select Payment Stat...', true);
    filters += comboHtml('employee', 'Select Employee', true);
    filters += comboHtml('customer', 'Select customer', true);
    filters += '<button type="button" class="he-excel" data-he="excel" aria-label="Export Excel">' + EXCEL + '</button>';
    els.toolbar.innerHTML = left + '<div class="he-toolbar__right">' + filters + '</div>';
    if (state.openCombo) fillComboList(state.openCombo);
  }

  function cols() {
    if (state.tab === 'approved') return APPROVED_COLS;
    if (state.tab === 'rejected') return REJECTED_COLS;
    return PENDING_COLS;
  }

  function renderHead() {
    if (!els.head) return;
    els.head.innerHTML = cols().map(function (c) {
      if (c.id === 'check') {
        var all = filteredRows();
        var checked = all.length && all.every(function (r) { return state.selected[r.id]; });
        return '<th scope="col"><input type="checkbox" data-he="selectAll"' + (checked ? ' checked' : '') + ' aria-label="Select all"></th>';
      }
      return '<th scope="col">' + escapeHtml(c.label) + '</th>';
    }).join('');
  }

  function pendingRow(r, idx) {
    return '<tr data-id="' + escapeHtml(r.id) + '">' +
      '<td>' + (idx + 1) + '</td>' +
      '<td>' + escapeHtml(r.expenseId) + '</td>' +
      '<td>' + escapeHtml(r.employee) + '</td>' +
      '<td>' + escapeHtml(r.client) + '</td>' +
      '<td>' + escapeHtml(r.createdDate) + '</td>' +
      '<td><button type="button" class="he-amount" data-he="amount" data-id="' + escapeHtml(r.id) + '">' + escapeHtml(r.amount) + '</button></td>' +
      '<td>' + badgeHtml('Pending') + '</td>' +
      '<td>' + pdfBtn(r.id) + '</td>' +
    '</tr>';
  }

  function approvedRow(r, idx) {
    return '<tr data-id="' + escapeHtml(r.id) + '">' +
      '<td><input type="checkbox" data-he="select" data-id="' + escapeHtml(r.id) + '"' + (state.selected[r.id] ? ' checked' : '') + ' aria-label="Select expense"></td>' +
      '<td>' + (idx + 1) + '</td>' +
      '<td>' + escapeHtml(r.expenseId) + '</td>' +
      '<td>' + escapeHtml(r.employee) + '</td>' +
      '<td>' + escapeHtml(r.client) + '</td>' +
      '<td>' + escapeHtml(r.createdDate) + '</td>' +
      '<td><button type="button" class="he-amount" data-he="amount" data-id="' + escapeHtml(r.id) + '">' + escapeHtml(r.amount) + '</button></td>' +
      '<td>' + escapeHtml(r.approvedAmount) + '</td>' +
      '<td>' + badgeHtml('Approved') + '</td>' +
      '<td>' + escapeHtml(r.approvedDate) + '</td>' +
      '<td>' + payCell(r) + '</td>' +
      '<td>' + escapeHtml(r.paidDate) + '</td>' +
      '<td>' + escapeHtml(r.paymentMode) + '</td>' +
      '<td>' + escapeHtml(r.finalPayable) + '</td>' +
      '<td>' + escapeHtml(r.hrRemark) + '</td>' +
      '<td>' + escapeHtml(r.empRemark) + '</td>' +
      '<td>' + pdfBtn(r.id) + '</td>' +
    '</tr>';
  }

  function rejectedRow(r, idx) {
    return '<tr data-id="' + escapeHtml(r.id) + '">' +
      '<td>' + (idx + 1) + '</td>' +
      '<td>' + escapeHtml(r.expenseId) + '</td>' +
      '<td>' + escapeHtml(r.employee) + '</td>' +
      '<td>' + escapeHtml(r.client) + '</td>' +
      '<td>' + escapeHtml(r.createdDate) + '</td>' +
      '<td><button type="button" class="he-amount" data-he="amount" data-id="' + escapeHtml(r.id) + '">' + escapeHtml(r.amount) + '</button></td>' +
      '<td>' + badgeHtml('Rejected') + '</td>' +
      '<td>' + escapeHtml(r.rejectedDate || '--') + '</td>' +
      '<td>' + escapeHtml(r.remark || '--') + '</td>' +
      '<td>' + pdfBtn(r.id) + '</td>' +
    '</tr>';
  }

  function renderTable() {
    var rows = filteredRows();
    var total = rows.length;
    var totalPages = Math.max(1, Math.ceil(total / state.pageSize) || 1);
    if (state.page > totalPages) state.page = totalPages;
    var start = (state.page - 1) * state.pageSize;
    var pageRows = rows.slice(start, start + state.pageSize);

    if (els.table) els.table.classList.toggle('he-table--wide', state.tab === 'approved');
    renderHead();
    if (els.body) {
      els.body.innerHTML = pageRows.map(function (r, i) {
        if (state.tab === 'approved') return approvedRow(r, start + i);
        if (state.tab === 'rejected') return rejectedRow(r, start + i);
        return pendingRow(r, start + i);
      }).join('');
    }
    if (els.empty) els.empty.hidden = pageRows.length > 0;

    var sum = rows.reduce(function (acc, r) { return acc + Number(r.amount || 0); }, 0);
    if (els.totalValue) els.totalValue.textContent = String(sum);

    if (els.pageInput) els.pageInput.value = String(state.page);
    if (els.pageTotal) els.pageTotal.textContent = String(totalPages);
    if (els.count) {
      var shown = pageRows.length ? Math.min(start + pageRows.length, total) : 0;
      els.count.textContent = shown + ' / ' + total;
    }
    if (els.prev) els.prev.disabled = state.page <= 1;
    if (els.next) els.next.disabled = state.page >= totalPages;
  }

  function render() {
    renderToolbar();
    renderTable();
  }

  function setTab(tab) {
    if (tab !== 'pending' && tab !== 'approved' && tab !== 'rejected') return;
    state.tab = tab;
    state.page = 1;
    state.selected = {};
    state.payMenuId = '';
    state.openCombo = '';
    state.comboQuery = '';
    els.tabs.forEach(function (btn) {
      var on = btn.getAttribute('data-tab') === tab;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    render();
  }

  function findApproved(id) {
    for (var i = 0; i < state.approved.length; i++) {
      if (state.approved[i].id === id) return state.approved[i];
    }
    return null;
  }

  function setPaymentStatus(id, status) {
    var row = findApproved(id);
    if (!row) return;
    row.paymentStatus = status;
    if (status === 'PAID') {
      var d = new Date();
      row.paidDate = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
      row.paymentMode = 'online';
      row.finalPayable = row.approvedAmount;
      row.hrRemark = row.hrRemark === '--' ? 'OK' : row.hrRemark;
      row.empRemark = row.empRemark === '--' ? 'OK' : row.empRemark;
    } else {
      row.paidDate = '--';
      row.paymentMode = '--';
      row.finalPayable = '--';
    }
    state.payMenuId = '';
    toast('Payment status', 'Expense ' + row.expenseId + ' marked ' + status + '.');
    render();
  }

  function bulkUpdatePayment() {
    var ids = selectedIds();
    if (!ids.length) {
      toast('Update Payment Status', 'Select at least one expense.');
      return;
    }
    ids.forEach(function (id) { setPaymentStatus(id, 'PAID'); });
  }

  function exportCsv() {
    var rows = filteredRows();
    var headers = cols().filter(function (c) { return c.id !== 'check' && c.id !== 'action'; }).map(function (c) { return c.label; });
    var lines = [headers.join(',')];
    rows.forEach(function (r, i) {
      var cells = [];
      if (state.tab === 'pending') {
        cells = [i + 1, r.expenseId, r.employee, r.client, r.createdDate, r.amount, 'Pending'];
      } else if (state.tab === 'approved') {
        cells = [i + 1, r.expenseId, r.employee, r.client, r.createdDate, r.amount, r.approvedAmount, 'Approved', r.approvedDate, r.paymentStatus, r.paidDate, r.paymentMode, r.finalPayable, r.hrRemark, r.empRemark];
      } else {
        cells = [i + 1, r.expenseId, r.employee, r.client, r.createdDate, r.amount, 'Rejected', r.rejectedDate || '--', r.remark || '--'];
      }
      lines.push(cells.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(','));
    });
    var blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'hr-expense-' + state.tab + '.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast('Export', 'Downloaded ' + rows.length + ' row(s).');
  }

  function updateCheckInBtn() {
    if (!els.topCheckIn) return;
    els.topCheckIn.textContent = state.checkedIn ? 'Check Out' : 'Check In';
    els.topCheckIn.classList.toggle('is-in', !state.checkedIn);
    els.topCheckIn.classList.toggle('is-out', state.checkedIn);
  }

  function tickClock() {
    if (!els.topClock) return;
    var now = new Date();
    els.topClock.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes());
    els.topClock.setAttribute('datetime', now.toISOString());
  }

  function bind() {
    els.tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { setTab(tab.getAttribute('data-tab')); });
    });

    if (els.toolbar) {
      els.toolbar.addEventListener('click', function (e) {
        var t = e.target;
        if (t.closest('[data-he="excel"]')) { exportCsv(); return; }
        if (t.closest('[data-he="bulkPay"]')) { bulkUpdatePayment(); return; }

        var pick = t.closest('[data-he-pick]');
        if (pick) {
          var kind = pick.getAttribute('data-he-pick');
          var val = pick.getAttribute('data-value') || '';
          if (kind === 'employee') state.employee = val;
          if (kind === 'customer') state.customer = val;
          if (kind === 'payment') state.paymentStatus = val;
          state.openCombo = '';
          state.comboQuery = '';
          state.page = 1;
          render();
          return;
        }
      });

      els.toolbar.addEventListener('focusin', function (e) {
        var input = e.target.closest('[data-he-combo-input]');
        if (!input) return;
        state.openCombo = input.getAttribute('data-he-combo-input');
        state.comboQuery = '';
        fillComboList(state.openCombo);
        var list = document.querySelector('[data-he-combo-list="' + state.openCombo + '"]');
        if (list) list.hidden = false;
        input.setAttribute('aria-expanded', 'true');
      });

      els.toolbar.addEventListener('input', function (e) {
        var input = e.target.closest('[data-he-combo-input]');
        if (!input) return;
        state.openCombo = input.getAttribute('data-he-combo-input');
        state.comboQuery = input.value || '';
        if (state.openCombo === 'employee') state.employee = '';
        if (state.openCombo === 'customer') state.customer = '';
        if (state.openCombo === 'payment') state.paymentStatus = '';
        fillComboList(state.openCombo);
        var list = document.querySelector('[data-he-combo-list="' + state.openCombo + '"]');
        if (list) list.hidden = false;
      });
    }

    if (els.head) {
      els.head.addEventListener('change', function (e) {
        if (e.target.getAttribute('data-he') !== 'selectAll') return;
        var checked = e.target.checked;
        filteredRows().forEach(function (r) {
          if (checked) state.selected[r.id] = true;
          else delete state.selected[r.id];
        });
        render();
      });
    }

    if (els.body) {
      els.body.addEventListener('click', function (e) {
        var t = e.target;
        if (t.closest('[data-he="pdf"]')) {
          toast('PDF', 'Opening expense PDF ' + t.closest('[data-he="pdf"]').getAttribute('data-id') + '.');
          return;
        }
        if (t.closest('[data-he="amount"]')) {
          toast('Expense amount', 'Expense ' + t.closest('[data-he="amount"]').getAttribute('data-id') + '.');
          return;
        }
        if (t.closest('[data-he="payToggle"]')) {
          var id = t.closest('[data-he="payToggle"]').getAttribute('data-id');
          state.payMenuId = state.payMenuId === id ? '' : id;
          renderTable();
          return;
        }
        if (t.closest('[data-he="setPay"]')) {
          var btn = t.closest('[data-he="setPay"]');
          setPaymentStatus(btn.getAttribute('data-id'), btn.getAttribute('data-status'));
          return;
        }
      });

      els.body.addEventListener('change', function (e) {
        if (e.target.getAttribute('data-he') !== 'select') return;
        var id = e.target.getAttribute('data-id');
        if (e.target.checked) state.selected[id] = true;
        else delete state.selected[id];
        renderToolbar();
      });
    }

    document.addEventListener('click', function (e) {
      if (state.openCombo) {
        var wrap = e.target.closest('[data-combo="' + state.openCombo + '"]');
        if (!wrap) {
          state.openCombo = '';
          state.comboQuery = '';
          renderToolbar();
        }
      }
      if (state.payMenuId && !e.target.closest('.he-pay-wrap')) {
        state.payMenuId = '';
        renderTable();
      }
    });

    if (els.pageSize) {
      els.pageSize.addEventListener('change', function () {
        state.pageSize = parseInt(els.pageSize.value, 10) || 10;
        state.page = 1;
        renderTable();
      });
    }
    if (els.prev) {
      els.prev.addEventListener('click', function () {
        if (state.page > 1) { state.page -= 1; renderTable(); }
      });
    }
    if (els.next) {
      els.next.addEventListener('click', function () {
        var totalPages = Math.max(1, Math.ceil(filteredRows().length / state.pageSize) || 1);
        if (state.page < totalPages) { state.page += 1; renderTable(); }
      });
    }

    if (els.topCheckIn) {
      els.topCheckIn.addEventListener('click', function () {
        state.checkedIn = !state.checkedIn;
        updateCheckInBtn();
        toast(state.checkedIn ? 'Checked In' : 'Checked Out', state.checkedIn ? 'You are checked in.' : 'You are checked out.');
      });
    }
  }

  bind();
  updateCheckInBtn();
  tickClock();
  setInterval(tickClock, 1000);
  setTab('pending');
})();
