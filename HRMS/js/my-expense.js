(function () {
  'use strict';

  var TABS = {
    pending: {
      label: 'Pending Expenses',
      empty: 'No data',
      columns: [
        { key: 'sno', label: 'S. No.', always: true },
        { key: 'created', label: 'Created Date' },
        { key: 'occurred', label: 'Occurred Date' },
        { key: 'customer', label: 'Customer Name' },
        { key: 'expenseId', label: 'Expense ID' },
        { key: 'expenseType', label: 'Expense Type' },
        { key: 'total', label: 'Total Amount' },
        { key: 'employee', label: 'Employee Name' },
        { key: 'attachments', label: 'Attachments' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: 'Action', always: true }
      ]
    },
    approved: {
      label: 'Approved Expenses',
      empty: 'No data',
      columns: [
        { key: 'check', label: '', always: true, check: true },
        { key: 'sno', label: 'S. No.', always: true },
        { key: 'created', label: 'Created Date' },
        { key: 'occurred', label: 'Occurred Date' },
        { key: 'approvedDate', label: 'Approved Date' },
        { key: 'customer', label: 'Customer Name' },
        { key: 'expenseId', label: 'Expense ID' },
        { key: 'expenseType', label: 'Expense Type' },
        { key: 'total', label: 'Total Amount' },
        { key: 'approvedBy', label: 'Approved By' },
        { key: 'approvedAmount', label: 'Approved Amount' },
        { key: 'attachments', label: 'Attachments' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: 'Action', always: true }
      ]
    },
    rejected: {
      label: 'Rejected Expenses',
      empty: 'No data',
      columns: [
        { key: 'sno', label: 'S. No.', always: true },
        { key: 'created', label: 'Created Date' },
        { key: 'occurred', label: 'Occurred Date' },
        { key: 'customer', label: 'Customer Name' },
        { key: 'expenseId', label: 'Expense ID' },
        { key: 'expenseType', label: 'Expense Type' },
        { key: 'total', label: 'Total Amount' },
        { key: 'employee', label: 'Employee Name' },
        { key: 'attachments', label: 'Attachments' },
        { key: 'status', label: 'Status' },
        { key: 'reason', label: 'Rejection Reason' },
        { key: 'action', label: 'Action', always: true }
      ]
    }
  };

  var DUMMY = {
    pending: [
      { created: '11-06-2026', occurred: '11-06-2026', customer: 'SAURABH BHARDWAJ', expenseId: '4805', expenseType: 'Cab Expenses', total: '1000', employee: 'Kamal Kant Sharma', attachments: '--', status: 'Pending', remark: 'ok', billable: false },
      { created: '18-05-2026', occurred: '17-05-2026', customer: 'Internal', expenseId: '4721', expenseType: 'Meals & Food Expenses', total: '2450', employee: 'Kamal Kant Sharma', attachments: 'View', status: 'Pending', remark: 'Client lunch', billable: true },
      { created: '02-05-2026', occurred: '01-05-2026', customer: 'PERFECT PAIR', expenseId: '4688', expenseType: 'Local Conveyance', total: '850', employee: 'Kamal Kant Sharma', attachments: '--', status: 'Pending', remark: '', billable: false },
      { created: '22-04-2026', occurred: '21-04-2026', customer: 'SAURABH BHARDWAJ HUF', expenseId: '4612', expenseType: 'Office Supplies', total: '3200', employee: 'Kamal Kant Sharma', attachments: 'View', status: 'Pending', remark: '', billable: false },
      { created: '10-04-2026', occurred: '09-04-2026', customer: 'THE GOLD REALTY', expenseId: '4550', expenseType: 'Lodging & Accommodation', total: '5600', employee: 'Kamal Kant Sharma', attachments: '--', status: 'Pending', remark: 'Site visit stay', billable: true }
    ],
    approved: [
      { created: '16-04-2026', occurred: '14-04-2026', approvedDate: '16-04-2026', customer: 'SAURABH BHARDWAJ HUF', expenseId: '3981', expenseType: 'Cab Expenses', total: '1000', approvedBy: 'Kamal Kant Sharma', approvedAmount: '1000', attachments: '--', status: 'Approved' },
      { created: '16-04-2026', occurred: '14-04-2026', approvedDate: '16-04-2026', customer: 'SAURABH BHARDWAJ HUF', expenseId: '3980', expenseType: 'Meals & Food Expenses', total: '1000', approvedBy: 'Kamal Kant Sharma', approvedAmount: '1000', attachments: 'View', status: 'Approved' },
      { created: '28-03-2026', occurred: '26-03-2026', approvedDate: '29-03-2026', customer: 'Internal', expenseId: '3912', expenseType: 'Local Conveyance', total: '1850', approvedBy: 'Priya Mehta', approvedAmount: '1800', attachments: 'View', status: 'Approved' },
      { created: '12-03-2026', occurred: '11-03-2026', approvedDate: '13-03-2026', customer: 'Saksham', expenseId: '3855', expenseType: 'Four-Wheeler Usage', total: '720', approvedBy: 'Kamal Kant Sharma', approvedAmount: '720', attachments: '--', status: 'Approved' },
      { created: '05-02-2026', occurred: '04-02-2026', approvedDate: '06-02-2026', customer: 'TATA MOTORS PASSENGER VEHICLES LIMITED', expenseId: '3720', expenseType: 'Lodging & Accommodation', total: '4500', approvedBy: 'Anita Verma', approvedAmount: '4500', attachments: 'View', status: 'Approved' }
    ],
    rejected: [
      { created: '20-03-2026', occurred: '19-03-2026', customer: 'Internal', expenseId: '3890', expenseType: 'Challan', total: '4500', employee: 'Kamal Kant Sharma', attachments: 'View', status: 'Rejected', reason: 'Exceeds policy limit' },
      { created: '08-02-2026', occurred: '07-02-2026', customer: 'Law seva management private limited', expenseId: '3744', expenseType: 'Cab Expenses', total: '2200', employee: 'Kamal Kant Sharma', attachments: '--', status: 'Rejected', reason: 'Missing receipt' },
      { created: '15-01-2026', occurred: '14-01-2026', customer: 'SAURABH BHARDWAJ', expenseId: '3611', expenseType: 'Meals & Food Expenses', total: '980', employee: 'Kamal Kant Sharma', attachments: '--', status: 'Rejected', reason: 'Duplicate claim' }
    ]
  };

  var CLIENT_OPTIONS = [
    'Internal', 'SAURABH BHARDWAJ', 'SAURABH BHARDWAJ HUF', 'THE GOLD REALTY',
    'Law seva management private limited', 'PERFECT PAIR',
    'TATA MOTORS PASSENGER VEHICLES LIMITED', 'Saksham'
  ];
  var EXPENSE_TYPES = [
    '2 Wheeler Expenses', 'Cab Expenses', 'Challan', 'DHAVAL JI', 'Four-Wheeler Usage',
    'Local Conveyance', 'Lodging & Accommodation', 'Meals & Food Expenses', 'Office Supplies', 'Other'
  ];
  var UPLOAD_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M12 16V7"/><path d="M8 11l4-4 4 4"/><path d="M5 19h14"/></svg>';

  var state = { tab: 'pending', visible: {}, blockCount: 0, mode: 'add', editIndex: -1, deleteIndex: null, deleteIndexes: null };
  var nextExpenseId = 4900;

  var els = {
    tabs: Array.prototype.slice.call(document.querySelectorAll('.me-tab')),
    head: document.getElementById('meTableHead'),
    body: document.getElementById('meTableBody'),
    empty: document.getElementById('meEmpty'),
    count: document.querySelector('.me-count'),
    pageOf: document.querySelector('.me-page-of'),
    pageInput: document.querySelector('.me-page-input'),
    toolbar: document.getElementById('meToolbarActions'),
    columnsBtn: null,
    columnsPop: null,
    columnsList: null,
    addModal: document.getElementById('meAddModal'),
    addTitle: document.getElementById('meAddTitle'),
    addClose: document.getElementById('meAddClose'),
    addForm: document.getElementById('meAddForm'),
    addBlock: document.getElementById('meAddBlock'),
    addToday: document.getElementById('meAddToday'),
    billable: document.getElementById('meBillable'),
    blocks: document.getElementById('meExpenseBlocks'),
    delPop: document.getElementById('meDelPop'),
    delNo: document.getElementById('meDelNo'),
    delYes: document.getElementById('meDelYes'),
    billModal: document.getElementById('meBillModal'),
    billClose: document.getElementById('meBillClose'),
    billBody: document.getElementById('meBillBody')
  };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function initVisible(tabKey) {
    state.visible[tabKey] = {};
    TABS[tabKey].columns.forEach(function (col) {
      state.visible[tabKey][col.key] = !col.defaultHidden;
    });
  }

  function visibleCols() {
    var tab = TABS[state.tab];
    return tab.columns.filter(function (col) {
      return col.always || state.visible[state.tab][col.key];
    });
  }

  function statusClass(status) {
    var s = String(status || '').toLowerCase();
    if (s === 'approved') return 'me-status--approved';
    if (s === 'rejected') return 'me-status--rejected';
    return 'me-status--pending';
  }

  function cellHtml(col, row, index) {
    var v = row[col.key];
    if (col.check) {
      return '<label class="me-check"><input type="checkbox" data-me-row-check aria-label="Select row"><span></span></label>';
    }
    if (col.key === 'sno') return String(index + 1);
    if (col.key === 'expenseType') {
      return '<button type="button" class="me-link" data-action="view-bill" data-index="' + index + '">View</button>';
    }
    if (col.key === 'total' || col.key === 'approvedAmount') {
      return '<button type="button" class="me-amount me-amount-btn" data-action="view-bill" data-index="' + index + '">' + esc(v) + '</button>';
    }
    if (col.key === 'attachments') {
      if (!v || v === '--') return '<span class="me-muted">--</span>';
      return '<button type="button" class="me-link" data-action="view-bill" data-index="' + index + '">View</button>';
    }
    if (col.key === 'status') {
      return '<span class="me-status ' + statusClass(v) + '">' + esc(v) + '</span>';
    }
    if (col.key === 'action') {
      if (state.tab === 'approved') {
        return '<button type="button" class="me-pdf-btn" aria-label="Download PDF" title="PDF">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
          '<path d="M14 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V8z"/>' +
          '<path d="M14 2v6h6"/><path d="M9 13h6M9 17h6M9 9h2"/></svg></button>';
      }
      if (state.tab === 'rejected') {
        return '<button type="button" class="me-action-link">Resubmit</button>';
      }
      return '<button type="button" class="me-action-link" data-action="edit" data-index="' + index + '">Edit</button>' +
        '<span class="me-action-sep">|</span>' +
        '<button type="button" class="me-action-link" data-action="delete" data-index="' + index + '">Delete</button>';
    }
    return esc(v == null || v === '' ? '--' : v);
  }

  function renderHead() {
    var cols = visibleCols();
    els.head.innerHTML = cols.map(function (col) {
      if (col.check) {
        return '<th class="me-th-check"><label class="me-check"><input type="checkbox" data-me-select-all aria-label="Select all"><span></span></label></th>';
      }
      return '<th>' + esc(col.label) + '</th>';
    }).join('');
  }

  function renderBody() {
    var rows = DUMMY[state.tab] || [];
    var cols = visibleCols();

    if (!rows.length) {
      els.body.innerHTML = '';
      if (els.empty) {
        els.empty.hidden = false;
        els.empty.querySelector('p').textContent = TABS[state.tab].empty;
      }
      if (els.count) els.count.textContent = '0 / 0';
      if (els.pageOf) els.pageOf.textContent = 'of 1';
      if (els.pageInput) els.pageInput.value = '1';
      syncSelectionUI();
      return;
    }

    if (els.empty) els.empty.hidden = true;
    els.body.innerHTML = rows.map(function (row, i) {
      return '<tr>' + cols.map(function (col) {
        var cls = col.check ? ' class="me-td-check"' : (col.key === 'action' ? ' class="me-td-action"' : '');
        return '<td' + cls + '>' + cellHtml(col, row, i) + '</td>';
      }).join('') + '</tr>';
    }).join('');

    var n = rows.length;
    if (els.count) els.count.textContent = n + ' / ' + n;
    if (els.pageOf) els.pageOf.textContent = 'of 1';
    if (els.pageInput) els.pageInput.value = '1';
    syncSelectionUI();
  }

  function rowChecks() {
    if (!els.body) return [];
    return Array.prototype.slice.call(els.body.querySelectorAll('[data-me-row-check]'));
  }

  function syncSelectionUI() {
    var checks = rowChecks();
    var checked = checks.filter(function (el) { return el.checked; });
    var selectAll = els.head ? els.head.querySelector('[data-me-select-all]') : null;
    var deleteBtn = document.getElementById('meBulkDelete');

    checks.forEach(function (el) {
      var tr = el.closest('tr');
      if (tr) tr.classList.toggle('is-selected', el.checked);
    });

    if (selectAll) {
      selectAll.checked = checks.length > 0 && checked.length === checks.length;
      selectAll.indeterminate = checked.length > 0 && checked.length < checks.length;
    }

    if (deleteBtn) {
      deleteBtn.hidden = checked.length === 0;
      deleteBtn.setAttribute('aria-hidden', checked.length === 0 ? 'true' : 'false');
    }
  }

  function renderColumnsList() {
    if (!els.columnsList) return;
    var tab = TABS[state.tab];
    els.columnsList.innerHTML = tab.columns.map(function (col) {
      if (col.always || col.check) return '';
      var checked = state.visible[state.tab][col.key] ? ' checked' : '';
      return '<label class="me-columns-item"><input type="checkbox" data-col="' + col.key + '"' + checked + '>' +
        '<span>' + esc(col.label) + '</span></label>';
    }).join('');
  }

  function closePops() {
    if (els.columnsPop) els.columnsPop.hidden = true;
    if (els.columnsBtn) els.columnsBtn.setAttribute('aria-expanded', 'false');
    closeDeletePop();
  }

  function openDeletePop(anchor, index) {
    if (!els.delPop || !anchor) return;
    state.deleteIndex = index;
    state.deleteIndexes = null;
    var msg = els.delPop.querySelector('span');
    if (msg) msg.textContent = 'Are you sure to delete this?';
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

  function openBulkDeletePop(anchor, indexes) {
    if (!els.delPop || !anchor || !indexes || !indexes.length) return;
    state.deleteIndex = null;
    state.deleteIndexes = indexes.slice();
    var msg = els.delPop.querySelector('span');
    if (msg) {
      msg.textContent = indexes.length === 1
        ? 'Are you sure to delete this?'
        : 'Are you sure to delete ' + indexes.length + ' selected expenses?';
    }
    els.delPop.hidden = false;
    var rect = anchor.getBoundingClientRect();
    var popW = els.delPop.offsetWidth || 280;
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
    if (!els.delPop) return;
    els.delPop.hidden = true;
    state.deleteIndex = null;
    state.deleteIndexes = null;
  }

  function confirmDelete() {
    if (state.deleteIndexes && state.deleteIndexes.length) {
      var indexes = state.deleteIndexes.slice().sort(function (a, b) { return b - a; });
      closeDeletePop();
      indexes.forEach(function (i) {
        if (DUMMY.pending[i]) DUMMY.pending.splice(i, 1);
      });
      renderBody();
      if (window.DashboardShell) DashboardShell.toast('Deleted', 'Selected expenses removed.');
      return;
    }
    var index = state.deleteIndex;
    if (index == null) return;
    closeDeletePop();
    deleteExpense(index);
  }

  function buildToolbar() {
    var isPending = state.tab === 'pending';
    var isApproved = state.tab === 'approved';
    els.toolbar.innerHTML =
      '<button type="button" class="me-icon-btn me-bulk-delete" id="meBulkDelete" hidden aria-hidden="true" aria-label="Delete selected" title="Delete selected">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<path d="M4 7h16"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/><path d="M6.5 7l.8 12.2A1.5 1.5 0 008.8 20.5h6.4a1.5 1.5 0 001.5-1.3L17.5 7"/><path d="M10 11v6M14 11v6"/>' +
        '</svg>' +
      '</button>' +
      (isApproved
        ? '<button type="button" class="me-icon-btn me-pdf-toolbar" aria-label="Export PDF" title="PDF">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
          '<path d="M14 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V8z"/>' +
          '<path d="M14 2v6h6"/><path d="M9 13h6M9 17h6M9 9h2"/></svg></button>'
        : '') +
      '<div class="me-columns">' +
        '<button type="button" class="me-icon-btn" id="meColumnsBtn" aria-expanded="false" aria-haspopup="true" aria-controls="meColumnsPop" title="Columns">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
            '<rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M5 9.33h14M5 14.67h14"/><path d="M8 6.85h5M8 12h5M8 17.15h5"/>' +
          '</svg>' +
          '<svg class="me-icon-btn__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>' +
        '</button>' +
        '<div class="me-columns-pop" id="meColumnsPop" hidden role="dialog" aria-label="Show columns">' +
          '<div class="me-columns-list" id="meColumnsList"></div>' +
        '</div>' +
      '</div>' +
      (isPending
        ? '<button type="button" class="me-add-btn" id="meAddBtn" aria-label="Add expense" title="Add expense">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">' +
              '<path d="M12 5v14M5 12h14"/>' +
            '</svg>' +
          '</button>'
        : '');

    els.columnsBtn = document.getElementById('meColumnsBtn');
    els.columnsPop = document.getElementById('meColumnsPop');
    els.columnsList = document.getElementById('meColumnsList');
    renderColumnsList();
    syncSelectionUI();

    if (els.columnsBtn && els.columnsPop) {
      els.columnsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = els.columnsPop.hidden;
        closePops();
        if (open) {
          els.columnsPop.hidden = false;
          els.columnsBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }

    if (els.columnsList) {
      els.columnsList.addEventListener('change', function (e) {
        var input = e.target.closest('input[data-col]');
        if (!input) return;
        state.visible[state.tab][input.getAttribute('data-col')] = input.checked;
        renderHead();
        renderBody();
      });
      els.columnsList.addEventListener('click', function (e) { e.stopPropagation(); });
    }

    if (els.columnsPop) {
      els.columnsPop.addEventListener('click', function (e) { e.stopPropagation(); });
    }

    var addBtn = document.getElementById('meAddBtn');
    if (addBtn) addBtn.addEventListener('click', openAddModal);

    var bulkDelete = document.getElementById('meBulkDelete');
    if (bulkDelete) {
      bulkDelete.addEventListener('click', function (e) {
        e.stopPropagation();
        var indexes = [];
        rowChecks().forEach(function (el, i) {
          if (el.checked) indexes.push(i);
        });
        if (!indexes.length) return;
        if (state.tab !== 'pending') {
          if (window.DashboardShell) DashboardShell.toast('Not allowed', 'Only pending expenses can be deleted.');
          return;
        }
        openBulkDeletePop(bulkDelete, indexes);
      });
    }
  }

  function setTab(key) {
    if (!TABS[key]) return;
    state.tab = key;
    els.tabs.forEach(function (btn) {
      var on = btn.getAttribute('data-tab') === key;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    closePops();
    buildToolbar();
    renderHead();
    renderBody();
  }

  function optionsHtml(list, selected) {
    return list.map(function (item) {
      return '<option value="' + esc(item) + '"' + (item === selected ? ' selected' : '') + '>' + esc(item) + '</option>';
    }).join('');
  }

  function toIsoDate(dmy) {
    if (!dmy) return '';
    var parts = String(dmy).split('-');
    if (parts.length !== 3) return '';
    return parts[2] + '-' + parts[1] + '-' + parts[0];
  }

  function fromIsoDate(iso) {
    if (!iso) return formatToday();
    var parts = String(iso).split('-');
    if (parts.length !== 3) return formatToday();
    return parts[2] + '-' + parts[1] + '-' + parts[0];
  }

  function ensureOption(list, value) {
    if (!value) return;
    if (list.indexOf(value) === -1) list.push(value);
  }

  function createExpenseBlock(opts) {
    opts = opts || {};
    var includeClient = opts.includeClient !== false;
    var values = opts.values || {};
    state.blockCount += 1;

    ensureOption(CLIENT_OPTIONS, values.client);
    ensureOption(EXPENSE_TYPES, values.expenseType);

    var clientHtml = includeClient
      ? '<div class="me-field"><span>Client <em>*</em></span>' +
          '<select aria-label="Client" required>' + optionsHtml(CLIENT_OPTIONS, values.client || 'Internal') + '</select></div>'
      : '';

    var typeSelected = values.expenseType || '';
    var typeOptions = typeSelected
      ? optionsHtml(EXPENSE_TYPES, typeSelected)
      : '<option value="" disabled selected hidden>Expense Type</option>' + optionsHtml(EXPENSE_TYPES);

    var block = document.createElement('div');
    block.className = 'me-expense-block';
    block.innerHTML =
      '<button type="button" class="me-expense-remove" aria-label="Remove expense">−</button>' +
      '<div class="me-expense-grid">' +
        clientHtml +
        '<div class="me-field"><span>Expense Type <em>*</em></span>' +
          '<select aria-label="Expense Type" required>' + typeOptions + '</select></div>' +
        '<div class="me-field"><span>Amount <em>*</em></span>' +
          '<input type="text" placeholder="Enter Amount" inputmode="decimal" aria-label="Amount" required value="' + esc(values.amount || '') + '"></div>' +
        '<div class="me-field"><span>Date <em>*</em></span>' +
          '<input type="date" aria-label="Date" required value="' + esc(values.date || '') + '" placeholder="Select Date"></div>' +
        '<div class="me-field"><span>Bill</span>' +
          '<label class="me-upload">' + UPLOAD_ICON + ' Click to Upload' +
            '<input type="file" hidden accept="image/*,.pdf"></label></div>' +
        '<div class="me-field me-field--full"><span>Remark</span>' +
          '<textarea placeholder="Enter Remark" aria-label="Remark">' + esc(values.remark || '') + '</textarea></div>' +
      '</div>';

    block.querySelector('.me-expense-remove').addEventListener('click', function () {
      if (els.blocks.querySelectorAll('.me-expense-block').length <= 1) return;
      block.remove();
    });
    var upload = block.querySelector('.me-upload');
    var fileInput = block.querySelector('input[type="file"]');
    upload.addEventListener('click', function (e) {
      if (e.target !== fileInput) fileInput.click();
    });
    fileInput.addEventListener('change', function () {
      if (this.files && this.files[0]) upload.innerHTML = UPLOAD_ICON + ' ' + esc(this.files[0].name);
      else upload.innerHTML = UPLOAD_ICON + ' Click to Upload<input type="file" hidden accept="image/*,.pdf">';
    });
    return block;
  }

  function resetAddForm() {
    els.blocks.innerHTML = '';
    els.blocks.appendChild(createExpenseBlock({ includeClient: true }));
    if (els.billable) els.billable.checked = false;
  }

  function openExpenseModal(mode, row, index) {
    state.mode = mode || 'add';
    state.editIndex = typeof index === 'number' ? index : -1;
    if (els.addTitle) els.addTitle.textContent = 'Add Expense';
    if (els.addToday) els.addToday.textContent = formatToday();

    els.blocks.innerHTML = '';
    if (mode === 'edit' && row) {
      els.blocks.appendChild(createExpenseBlock({
        includeClient: true,
        values: {
          client: row.customer || 'Internal',
          expenseType: row.expenseType || '',
          amount: row.total || '',
          date: toIsoDate(row.occurred || row.created),
          remark: row.remark || ''
        }
      }));
      if (els.billable) els.billable.checked = !!row.billable;
    } else {
      resetAddForm();
    }

    els.addModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function openAddModal() {
    openExpenseModal('add');
  }

  function openEditModal(index) {
    var row = (DUMMY.pending || [])[index];
    if (!row) return;
    openExpenseModal('edit', row, index);
  }

  function closeAddModal() {
    els.addModal.hidden = true;
    document.body.style.overflow = '';
    state.mode = 'add';
    state.editIndex = -1;
  }

  function pad2(n) { return n < 10 ? '0' + n : String(n); }

  function formatToday() {
    var d = new Date();
    return pad2(d.getDate()) + '-' + pad2(d.getMonth() + 1) + '-' + d.getFullYear();
  }

  function readPrimaryBlock() {
    var block = els.blocks.querySelector('.me-expense-block');
    if (!block) return null;
    var clientSelect = block.querySelector('select[aria-label="Client"]');
    var typeSelect = block.querySelector('select[aria-label="Expense Type"]');
    var amountInput = block.querySelector('input[aria-label="Amount"]');
    var dateInput = block.querySelector('input[aria-label="Date"]');
    var remarkInput = block.querySelector('[aria-label="Remark"]');
    return {
      client: clientSelect ? clientSelect.value : 'Internal',
      expenseType: typeSelect && typeSelect.value ? typeSelect.value : 'Expense',
      amount: amountInput && amountInput.value ? amountInput.value : '0',
      occurred: fromIsoDate(dateInput && dateInput.value),
      remark: remarkInput ? remarkInput.value : '',
      billable: !!(els.billable && els.billable.checked)
    };
  }

  function submitExpense() {
    var data = readPrimaryBlock();
    if (!data) return;
    var today = formatToday();

    if (state.mode === 'edit' && state.editIndex > -1 && DUMMY.pending[state.editIndex]) {
      var existing = DUMMY.pending[state.editIndex];
      existing.customer = data.client;
      existing.expenseType = data.expenseType;
      existing.total = data.amount;
      existing.occurred = data.occurred;
      existing.remark = data.remark;
      existing.billable = data.billable;
      closeAddModal();
      renderBody();
      return;
    }

    DUMMY.pending.unshift({
      created: today,
      occurred: data.occurred,
      customer: data.client,
      expenseId: String(nextExpenseId++),
      expenseType: data.expenseType,
      total: data.amount,
      employee: 'Kamal Kant Sharma',
      attachments: '--',
      status: 'Pending',
      remark: data.remark,
      billable: data.billable
    });

    closeAddModal();
    if (state.tab !== 'pending') setTab('pending');
    else renderBody();
  }

  function formatExpenseDate(dmy) {
    if (!dmy) return '--';
    return String(dmy).replace(/-/g, '/');
  }

  function openBillModal(index) {
    var rows = DUMMY[state.tab] || [];
    var row = rows[index];
    if (!row || !els.billModal || !els.billBody) return;
    var attachment = row.attachments && row.attachments !== '--'
      ? '<button type="button" class="me-link">View</button>'
      : '<span class="me-muted">--</span>';
    els.billBody.innerHTML =
      '<tr>' +
        '<td>1</td>' +
        '<td>' + esc(row.expenseType || '--') + '</td>' +
        '<td>' + esc(row.total || '--') + '</td>' +
        '<td>' + attachment + '</td>' +
        '<td>' + esc(formatExpenseDate(row.occurred || row.created)) + '</td>' +
        '<td>' + esc(row.remark || row.reason || '--') + '</td>' +
      '</tr>';
    els.billModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeBillModal() {
    if (!els.billModal) return;
    els.billModal.hidden = true;
    if (!els.addModal || els.addModal.hidden) document.body.style.overflow = '';
  }

  function deleteExpense(index) {
    if (!DUMMY.pending[index]) return;
    DUMMY.pending.splice(index, 1);
    renderBody();
  }

  function bindEvents() {
    els.tabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTab(btn.getAttribute('data-tab'));
      });
    });

    if (els.body) {
      els.body.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-action]');
        if (!btn || !els.body.contains(btn)) return;
        var index = parseInt(btn.getAttribute('data-index'), 10);
        var action = btn.getAttribute('data-action');
        if (action === 'edit') {
          closeDeletePop();
          openEditModal(index);
        } else if (action === 'delete') {
          e.stopPropagation();
          openDeletePop(btn, index);
        } else if (action === 'view-bill') {
          closeDeletePop();
          openBillModal(index);
        }
      });
    }

    var table = document.getElementById('meTable');
    if (table) {
      table.addEventListener('change', function (e) {
        var selectAll = e.target.closest('[data-me-select-all]');
        if (selectAll) {
          rowChecks().forEach(function (el) { el.checked = selectAll.checked; });
          selectAll.indeterminate = false;
          syncSelectionUI();
          return;
        }
        if (e.target.closest('[data-me-row-check]')) syncSelectionUI();
      });
    }

    if (els.delNo) els.delNo.addEventListener('click', function (e) { e.stopPropagation(); closeDeletePop(); });
    if (els.delYes) els.delYes.addEventListener('click', function (e) { e.stopPropagation(); confirmDelete(); });
    if (els.delPop) els.delPop.addEventListener('click', function (e) { e.stopPropagation(); });

    document.addEventListener('click', closePops);
    window.addEventListener('resize', closePops);
    window.addEventListener('scroll', closeDeletePop, true);

    if (els.addClose) els.addClose.addEventListener('click', closeAddModal);
    if (els.billClose) els.billClose.addEventListener('click', closeBillModal);
    if (els.billModal) {
      els.billModal.addEventListener('click', function (e) {
        if (e.target === els.billModal) closeBillModal();
      });
    }
    if (els.addModal) {
      els.addModal.addEventListener('click', function (e) {
        if (e.target === els.addModal) closeAddModal();
      });
    }
    if (els.addBlock) {
      els.addBlock.addEventListener('click', function () {
        var hasBlocks = els.blocks.querySelectorAll('.me-expense-block').length > 0;
        els.blocks.appendChild(createExpenseBlock({ includeClient: !hasBlocks }));
      });
    }
    if (els.addForm) {
      els.addForm.addEventListener('submit', function (e) {
        e.preventDefault();
        submitExpense();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closePops();
        closeAddModal();
        closeBillModal();
      }
    });
  }

  Object.keys(TABS).forEach(initVisible);
  bindEvents();
  setTab('pending');
})();
