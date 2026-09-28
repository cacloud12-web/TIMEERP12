/**
 * TIME ERP — HRMS Probation Approval
 * Tabs: Pending Probation | Approved/Rejected Probation
 */
(function () {
  'use strict';

  var PENDING_COLS = [
    { id: 'no', label: '#' },
    { id: 'name', label: 'First Name' },
    { id: 'joiningDate', label: 'Joining Date' },
    { id: 'confirmDate', label: 'Confirmation Date' },
    { id: 'days', label: 'Probation Period in Days' },
    { id: 'manager', label: 'Manager Name' },
    { id: 'managerStatus', label: 'Manager Status' },
    { id: 'action', label: 'Action' }
  ];

  var DECIDED_COLS = [
    { id: 'no', label: '#' },
    { id: 'name', label: 'Name' },
    { id: 'joiningDate', label: 'Joining Date' },
    { id: 'days', label: 'Probation Period' },
    { id: 'managerStatus', label: 'Manager Status' },
    { id: 'hrStatus', label: 'HR Status' },
    { id: 'action', label: 'Action' }
  ];

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
    { code: 'RS003', name: 'Riya Sharma' },
    { code: 'AV004', name: 'Aman Verma' },
    { code: 'KK005', name: 'Kamal Kant Sharma' },
    { code: 'KT006', name: 'Kuldeep Tyagi' }
  ];

  var state = {
    tab: 'pending',
    page: 1,
    pageSize: 10,
    employee: '',
    empOpen: false,
    empQuery: '',
    checkedIn: false,
    pending: [
      { id: 'p1', code: 'SB001', name: 'Saurabh Bhardwaj', joiningDate: '07/01/2026', confirmDate: '06/02/2026', days: 30, manager: 'Dev Aggarwal', managerStatus: '--' },
      { id: 'p2', code: 'SB001', name: 'Saurabh Bhardwaj', joiningDate: '07/01/2026', confirmDate: '06/02/2026', days: 30, manager: 'Kamal Kant Sharma', managerStatus: '--' },
      { id: 'p3', code: 'SB001', name: 'Saurabh Bhardwaj', joiningDate: '07/01/2026', confirmDate: '06/02/2026', days: 30, manager: 'Riya Sharma', managerStatus: '--' },
      { id: 'p4', code: 'SB001', name: 'Saurabh Bhardwaj', joiningDate: '07/01/2026', confirmDate: '06/02/2026', days: 30, manager: 'Aman Verma', managerStatus: '--' },
      { id: 'p5', code: 'DA002', name: 'Dev Aggarwal', joiningDate: '12/01/2026', confirmDate: '11/02/2026', days: 30, manager: 'Kamal Kant Sharma', managerStatus: '--' },
      { id: 'p6', code: 'AN2', name: 'Tarun Gaur', joiningDate: '15/01/2026', confirmDate: '14/02/2026', days: 30, manager: 'Dev Aggarwal', managerStatus: '--' },
      { id: 'p7', code: 'SO6829', name: 'SONIYA KASHYAP', joiningDate: '20/01/2026', confirmDate: '19/03/2026', days: 60, manager: 'Riya Sharma', managerStatus: '--' },
      { id: 'p8', code: 'RS003', name: 'Riya Sharma', joiningDate: '03/02/2026', confirmDate: '04/05/2026', days: 90, manager: 'Kamal Kant Sharma', managerStatus: '--' },
      { id: 'p9', code: 'AV004', name: 'Aman Verma', joiningDate: '10/02/2026', confirmDate: '12/03/2026', days: 30, manager: 'Dev Aggarwal', managerStatus: '--' },
      { id: 'p10', code: 'HA6413', name: 'Hardik rawat', joiningDate: '18/02/2026', confirmDate: '20/03/2026', days: 30, manager: 'Saurabh Bhardwaj', managerStatus: '--' },
      { id: 'p11', code: 'SI6830', name: 'SIMRAN KASHYAP', joiningDate: '01/03/2026', confirmDate: '31/03/2026', days: 30, manager: 'SONIYA KASHYAP', managerStatus: '--' },
      { id: 'p12', code: 'AS0010', name: 'Aastha Tyagi', joiningDate: '05/03/2026', confirmDate: '04/04/2026', days: 30, manager: 'Dev Aggarwal', managerStatus: '--' }
    ],
    decided: [
      { id: 'd1', code: 'SB001', name: 'Saurabh Bhardwaj', joiningDate: '07/01/2026', days: 30, managerStatus: '--', hrStatus: 'Approved' },
      { id: 'd2', code: 'SB001', name: 'Saurabh Bhardwaj', joiningDate: '07/01/2026', days: 30, managerStatus: '--', hrStatus: 'Approved' },
      { id: 'd3', code: 'DA002', name: 'Dev Aggarwal', joiningDate: '12/12/2025', days: 45, managerStatus: '--', hrStatus: 'Rejected' },
      { id: 'd4', code: 'AN2', name: 'Tarun Gaur', joiningDate: '01/11/2025', days: 30, managerStatus: 'Approved', hrStatus: 'Approved' },
      { id: 'd5', code: 'SO6829', name: 'SONIYA KASHYAP', joiningDate: '15/10/2025', days: 60, managerStatus: '--', hrStatus: 'Approved' },
      { id: 'd6', code: 'KK005', name: 'Kamal Kant Sharma', joiningDate: '20/09/2025', days: 90, managerStatus: 'Approved', hrStatus: 'Approved' }
    ]
  };

  var els = {
    tabs: Array.prototype.slice.call(document.querySelectorAll('.pa-tab')),
    head: document.getElementById('paTableHead'),
    body: document.getElementById('paTableBody'),
    empty: document.getElementById('paEmpty'),
    empWrap: document.getElementById('paEmpWrap'),
    empSearch: document.getElementById('paEmpSearch'),
    empToggle: document.getElementById('paEmpToggle'),
    empList: document.getElementById('paEmpList'),
    pageSize: document.getElementById('paPageSize'),
    prev: document.getElementById('paPrev'),
    next: document.getElementById('paNext'),
    pageInput: document.getElementById('paPageInput'),
    pageTotal: document.getElementById('paPageTotal'),
    count: document.getElementById('paCount'),
    topCheckIn: document.getElementById('paTopCheckInBtn'),
    topClock: document.getElementById('paTopClock')
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

  function empLabel(emp) {
    return '(' + emp.code + ') ' + emp.name;
  }

  function rowsForTab() {
    return state.tab === 'pending' ? state.pending : state.decided;
  }

  function filteredRows() {
    var rows = rowsForTab();
    if (!state.employee) return rows.slice();
    return rows.filter(function (r) {
      return r.name === state.employee || r.code === state.employee;
    });
  }

  function badgeHtml(status) {
    if (!status || status === '--') return '--';
    var cls = status === 'Rejected' ? 'pa-badge--rejected' : 'pa-badge--approved';
    return '<span class="pa-badge ' + cls + '">' + escapeHtml(status) + '</span>';
  }

  function closeEmpList() {
    state.empOpen = false;
    if (els.empList) els.empList.hidden = true;
    if (els.empSearch) els.empSearch.setAttribute('aria-expanded', 'false');
  }

  function renderEmpList() {
    if (!els.empList) return;
    var q = String(state.empQuery || '').trim().toLowerCase();
    var items = EMPLOYEES.filter(function (e) {
      if (!q) return true;
      return empLabel(e).toLowerCase().indexOf(q) !== -1 || e.name.toLowerCase().indexOf(q) !== -1 || e.code.toLowerCase().indexOf(q) !== -1;
    });

    var html = '<button type="button" class="pa-emp-option pa-emp-option--clear" data-pa-emp="">Clear selection</button>';
    html += items.map(function (e) {
      var active = state.employee === e.name ? ' is-active' : '';
      return '<button type="button" class="pa-emp-option' + active + '" role="option" data-pa-emp="' + escapeHtml(e.name) + '">' +
        escapeHtml(empLabel(e)) + '</button>';
    }).join('');
    if (!items.length) html += '<div class="pa-emp-option" style="cursor:default;color:#8c8c8c">No employees found</div>';
    els.empList.innerHTML = html;
  }

  function openEmpList() {
    state.empOpen = true;
    renderEmpList();
    if (els.empList) els.empList.hidden = false;
    if (els.empSearch) els.empSearch.setAttribute('aria-expanded', 'true');
  }

  function syncEmpInput() {
    if (!els.empSearch) return;
    if (state.employee) {
      var found = null;
      for (var i = 0; i < EMPLOYEES.length; i++) {
        if (EMPLOYEES[i].name === state.employee) { found = EMPLOYEES[i]; break; }
      }
      els.empSearch.value = found ? empLabel(found) : state.employee;
      state.empQuery = '';
    } else if (!state.empOpen) {
      els.empSearch.value = '';
      state.empQuery = '';
    }
  }

  function renderHead() {
    var cols = state.tab === 'pending' ? PENDING_COLS : DECIDED_COLS;
    if (!els.head) return;
    els.head.innerHTML = cols.map(function (c) {
      return '<th scope="col">' + escapeHtml(c.label) + '</th>';
    }).join('');
  }

  function pendingRowHtml(r, idx) {
    return '<tr data-id="' + escapeHtml(r.id) + '">' +
      '<td>' + (idx + 1) + '</td>' +
      '<td>' + escapeHtml(r.name) + '</td>' +
      '<td>' + escapeHtml(r.joiningDate) + '</td>' +
      '<td>' + escapeHtml(r.confirmDate) + '</td>' +
      '<td>' + escapeHtml(r.days) + '</td>' +
      '<td>' + escapeHtml(r.manager) + '</td>' +
      '<td>' + escapeHtml(r.managerStatus || '--') + '</td>' +
      '<td><div class="pa-actions">' +
        '<button type="button" class="pa-action" data-pa="approve" data-id="' + escapeHtml(r.id) + '">Approve</button>' +
        '<button type="button" class="pa-action" data-pa="extend" data-id="' + escapeHtml(r.id) + '">Extend</button>' +
      '</div></td>' +
    '</tr>';
  }

  function decidedRowHtml(r, idx) {
    return '<tr data-id="' + escapeHtml(r.id) + '">' +
      '<td>' + (idx + 1) + '</td>' +
      '<td>' + escapeHtml(r.name) + '</td>' +
      '<td>' + escapeHtml(r.joiningDate) + '</td>' +
      '<td>' + escapeHtml(r.days) + '</td>' +
      '<td>' + escapeHtml(r.managerStatus || '--') + '</td>' +
      '<td>' + badgeHtml(r.hrStatus) + '</td>' +
      '<td><span class="pa-action pa-action--muted">Not Possible</span></td>' +
    '</tr>';
  }

  function renderTable() {
    var rows = filteredRows();
    var total = rows.length;
    var totalPages = Math.max(1, Math.ceil(total / state.pageSize) || 1);
    if (state.page > totalPages) state.page = totalPages;
    var start = (state.page - 1) * state.pageSize;
    var pageRows = rows.slice(start, start + state.pageSize);

    renderHead();
    if (els.body) {
      els.body.innerHTML = pageRows.map(function (r, i) {
        return state.tab === 'pending' ? pendingRowHtml(r, start + i) : decidedRowHtml(r, start + i);
      }).join('');
    }
    if (els.empty) els.empty.hidden = pageRows.length > 0;

    if (els.pageInput) els.pageInput.value = String(state.page);
    if (els.pageTotal) els.pageTotal.textContent = String(totalPages);
    if (els.count) {
      var shown = pageRows.length ? Math.min(start + pageRows.length, total) : 0;
      els.count.textContent = shown + ' / ' + total;
    }
    if (els.prev) els.prev.disabled = state.page <= 1;
    if (els.next) els.next.disabled = state.page >= totalPages;
  }

  function setTab(tab) {
    if (tab !== 'pending' && tab !== 'decided') return;
    state.tab = tab;
    state.page = 1;
    closeEmpList();
    els.tabs.forEach(function (btn) {
      var on = btn.getAttribute('data-tab') === tab;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    syncEmpInput();
    renderTable();
  }

  function findPending(id) {
    for (var i = 0; i < state.pending.length; i++) {
      if (state.pending[i].id === id) return { row: state.pending[i], index: i };
    }
    return null;
  }

  function approveRow(id) {
    var found = findPending(id);
    if (!found) return;
    var row = found.row;
    state.pending.splice(found.index, 1);
    state.decided.unshift({
      id: 'd-' + row.id + '-' + Date.now(),
      code: row.code,
      name: row.name,
      joiningDate: row.joiningDate,
      days: row.days,
      managerStatus: row.managerStatus || '--',
      hrStatus: 'Approved'
    });
    toast('Approved', row.name + ' probation approved.');
    renderTable();
  }

  function extendRow(id) {
    var found = findPending(id);
    if (!found) return;
    var row = found.row;
    var add = 30;
    row.days = Number(row.days) + add;
    var parts = String(row.confirmDate || '').split('/');
    if (parts.length === 3) {
      var d = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
      if (!isNaN(d.getTime())) {
        d.setDate(d.getDate() + add);
        row.confirmDate = pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear();
      }
    }
    toast('Extended', row.name + ' probation extended by ' + add + ' days.');
    renderTable();
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

    if (els.body) {
      els.body.addEventListener('click', function (e) {
        var approve = e.target.closest('[data-pa="approve"]');
        if (approve) { approveRow(approve.getAttribute('data-id')); return; }
        var extend = e.target.closest('[data-pa="extend"]');
        if (extend) { extendRow(extend.getAttribute('data-id')); return; }
      });
    }

    if (els.empSearch) {
      els.empSearch.addEventListener('focus', function () {
        state.empQuery = '';
        openEmpList();
      });
      els.empSearch.addEventListener('input', function () {
        state.empQuery = els.empSearch.value || '';
        if (state.employee && state.empQuery !== state.employee) state.employee = '';
        openEmpList();
      });
      els.empSearch.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeEmpList(); els.empSearch.blur(); }
      });
    }

    if (els.empToggle) {
      els.empToggle.addEventListener('click', function (e) {
        e.preventDefault();
        if (state.empOpen) closeEmpList();
        else { if (els.empSearch) els.empSearch.focus(); openEmpList(); }
      });
    }

    if (els.empList) {
      els.empList.addEventListener('click', function (e) {
        var opt = e.target.closest('[data-pa-emp]');
        if (!opt) return;
        state.employee = opt.getAttribute('data-pa-emp') || '';
        state.page = 1;
        closeEmpList();
        syncEmpInput();
        renderTable();
      });
    }

    document.addEventListener('click', function (e) {
      if (!state.empOpen) return;
      if (els.empWrap && els.empWrap.contains(e.target)) return;
      closeEmpList();
      syncEmpInput();
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
  syncEmpInput();
  setTab('pending');
})();
