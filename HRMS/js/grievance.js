/**
 * TIME ERP — Grievance (tabs, columns, add modal, check-in)
 */
(function () {
  'use strict';

  var COL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M5 9.33h14M5 14.67h14"/><path d="M8 6.85h5M8 12h5M8 17.15h5"/></svg><svg class="gr-icon-btn__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var PLUS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';

  var GRIEVANCE_TYPES = [
    'Sexual Harassment',
    'Customer Misbehaviour',
    'Leave-Related Issues',
    'Attendance Discrepancy',
    'Salary or Payment Delay',
    'Unfair Work Allocation',
    'Managerial Misconduct / Abuse of Power',
    'Workplace Discrimination (gender, caste, religion, etc.)',
    'IT/Software Issues (portal errors, login problems, etc.)',
    'Other (Please Specify)'
  ];

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  var TABS = {
    pending: {
      columns: [
        { id: 'sno', label: 'S.No.' },
        { id: 'raisedDate', label: 'Raised Date' },
        { id: 'grievanceId', label: 'Grievance ID' },
        { id: 'detail', label: 'Grievance Detail' },
        { id: 'type', label: 'Grievance Type' },
        { id: 'actionDate', label: 'Action Date' },
        { id: 'file', label: 'Uploaded File' },
        { id: 'manager', label: 'Manager Approval' },
        { id: 'hr', label: 'HR Approval' },
        { id: 'action', label: 'Action' }
      ]
    },
    canceled: {
      columns: [
        { id: 'sno', label: 'S.No.' },
        { id: 'date', label: 'Date' },
        { id: 'raisedDate', label: 'Raised Date' },
        { id: 'grievanceId', label: 'Grievance ID' },
        { id: 'detail', label: 'Grievance Detail' },
        { id: 'type', label: 'Grievance Type' },
        { id: 'file', label: 'Uploaded File' },
        { id: 'status', label: 'Status' }
      ]
    },
    approved: {
      columns: [
        { id: 'sno', label: 'S.No.' },
        { id: 'date', label: 'Date' },
        { id: 'raisedDate', label: 'Raised Date' },
        { id: 'grievanceId', label: 'Grievance ID' },
        { id: 'detail', label: 'Grievance Detail' },
        { id: 'type', label: 'Grievance Type' },
        { id: 'file', label: 'Uploaded File' },
        { id: 'manager', label: 'Manager Approval' },
        { id: 'hr', label: 'HR Approval' }
      ]
    }
  };

  var state = {
    tab: 'pending',
    visible: {},
    checkedIn: false,
    nextId: 20,
    page: 1,
    pageSize: 20,
    form: { type: '', details: '', date: null, fileName: '', sendToHr: false },
    cal: { view: new Date(2026, 7, 1), selected: null },
    rows: {
      pending: [
        { id: 2, raisedDate: '10/08/2026', grievanceId: '2', detail: 'Salary not credited on time for July', type: 'Salary or Payment Delay', actionDate: '--', file: 'salary_proof.pdf', manager: 'Pending', hr: 'Pending' },
        { id: 3, raisedDate: '11/08/2026', grievanceId: '3', detail: 'Leave balance showing incorrectly in portal', type: 'Leave-Related Issues', actionDate: '--', file: '--', manager: 'Pending', hr: 'Pending' },
        { id: 4, raisedDate: '12/08/2026', grievanceId: '4', detail: 'Unable to mark attendance due to system error', type: 'IT/Software Issues (portal errors, login problems, etc.)', actionDate: '--', file: 'screenshot.png', manager: 'Pending', hr: 'Pending' },
        { id: 5, raisedDate: '13/08/2026', grievanceId: '5', detail: 'Excessive workload assigned without prior notice', type: 'Unfair Work Allocation', actionDate: '--', file: '--', manager: 'Pending', hr: 'Pending' },
        { id: 6, raisedDate: '14/08/2026', grievanceId: '6', detail: 'Biometric punch not reflecting in records', type: 'Attendance Discrepancy', actionDate: '--', file: 'attendance_log.pdf', manager: 'Pending', hr: 'Pending' }
      ],
      canceled: [
        { id: 1, date: '12/08/2026', raisedDate: '14/08/2026', grievanceId: '1', detail: 'dummy data', type: 'Leave-Related Issues', file: '--', status: 'Canceled' },
        { id: 7, date: '08/08/2026', raisedDate: '09/08/2026', grievanceId: '7', detail: 'Raised by mistake — issue already resolved', type: 'IT/Software Issues (portal errors, login problems, etc.)', file: '--', status: 'Canceled' },
        { id: 8, date: '09/08/2026', raisedDate: '10/08/2026', grievanceId: '8', detail: 'Duplicate grievance submitted', type: 'Leave-Related Issues', file: '--', status: 'Canceled' },
        { id: 9, date: '10/08/2026', raisedDate: '11/08/2026', grievanceId: '9', detail: 'Withdrawn after discussion with manager', type: 'Unfair Work Allocation', file: '--', status: 'Canceled' },
        { id: 10, date: '11/08/2026', raisedDate: '12/08/2026', grievanceId: '10', detail: 'Incorrect grievance type selected', type: 'Other (Please Specify)', file: 'note.pdf', status: 'Canceled' }
      ],
      approved: [
        { id: 11, date: '05/08/2026', raisedDate: '01/08/2026', grievanceId: '11', detail: 'Overtime hours not reflected in payslip', type: 'Salary or Payment Delay', file: 'timesheet.pdf', manager: 'Approved', hr: 'Approved' },
        { id: 12, date: '06/08/2026', raisedDate: '02/08/2026', grievanceId: '12', detail: 'Client misbehaviour during site visit', type: 'Customer Misbehaviour', file: '--', manager: 'Approved', hr: 'Rejected' },
        { id: 13, date: '07/08/2026', raisedDate: '03/08/2026', grievanceId: '13', detail: 'Discriminatory remarks in team meeting', type: 'Workplace Discrimination (gender, caste, religion, etc.)', file: 'email_thread.pdf', manager: 'Approved', hr: 'Approved' },
        { id: 14, date: '08/08/2026', raisedDate: '04/08/2026', grievanceId: '14', detail: 'Manager denied approved leave without reason', type: 'Managerial Misconduct / Abuse of Power', file: '--', manager: 'Rejected', hr: 'Rejected' },
        { id: 15, date: '09/08/2026', raisedDate: '05/08/2026', grievanceId: '15', detail: 'HR portal login failing repeatedly', type: 'IT/Software Issues (portal errors, login problems, etc.)', file: 'error_log.png', manager: 'Approved', hr: 'Approved' }
      ]
    }
  };

  var els = {
    tabs: Array.prototype.slice.call(document.querySelectorAll('.gr-tab')),
    toolbarLeft: document.getElementById('grToolbarLeft'),
    toolbarActions: document.getElementById('grToolbarActions'),
    head: document.getElementById('grTableHead'),
    body: document.getElementById('grTableBody'),
    empty: document.getElementById('grEmpty'),
    pageInput: document.getElementById('grPageInput'),
    pageTotal: document.getElementById('grPageTotal'),
    count: document.getElementById('grCount'),
    prev: document.getElementById('grPrev'),
    next: document.getElementById('grNext'),
    columnsPop: document.getElementById('grColumnsPop'),
    columnsList: document.getElementById('grColumnsList'),
    selectAll: document.getElementById('grSelectAllCols'),
    addModal: document.getElementById('grAddModal'),
    addForm: document.getElementById('grAddForm'),
    addClose: document.getElementById('grAddClose'),
    typeInput: document.getElementById('grTypeInput'),
    typeOptions: document.getElementById('grTypeOptions'),
    details: document.getElementById('grDetails'),
    dateBtn: document.getElementById('grDateBtn'),
    dateText: document.getElementById('grDateText'),
    document: document.getElementById('grDocument'),
    uploadLabel: document.getElementById('grUploadLabel'),
    sendToHr: document.getElementById('grSendToHr'),
    singleCal: document.getElementById('grSingleCal'),
    calTitle: document.getElementById('grSingleCalTitle'),
    calGrid: document.getElementById('grSingleCalGrid'),
    calToday: document.getElementById('grSingleCalToday'),
    topCheckIn: document.getElementById('grTopCheckInBtn'),
    topClock: document.getElementById('grTopClock')
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

  function formatDisplayDate(d) {
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear();
  }

  function formatClock(d) {
    return pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function closePops() {
    if (els.columnsPop) els.columnsPop.hidden = true;
    document.querySelectorAll('.gr-icon-btn.is-active').forEach(function (b) {
      b.classList.remove('is-active');
    });
  }

  function closeTypeMenu() {
    if (els.typeOptions) els.typeOptions.hidden = true;
    if (els.typeInput) els.typeInput.setAttribute('aria-expanded', 'false');
  }

  function closeCalendar() {
    if (els.singleCal) els.singleCal.hidden = true;
    if (els.dateBtn) {
      els.dateBtn.classList.remove('is-open');
      els.dateBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function placePop(pop, anchor) {
    if (!pop || !anchor) return;
    pop.hidden = false;
    var r = anchor.getBoundingClientRect();
    var width = pop.offsetWidth || 248;
    var height = pop.offsetHeight || 320;
    var left = Math.min(window.innerWidth - width - 12, Math.max(12, r.left));
    var top = r.bottom + 8;
    if (top + height > window.innerHeight - 12) top = Math.max(12, r.top - height - 8);
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
    var caret = pop.querySelector('.gr-pop__caret');
    if (caret) {
      var caretLeft = r.left + r.width / 2 - left - 6;
      caret.style.left = Math.max(14, Math.min(width - 20, caretLeft)) + 'px';
      caret.style.right = 'auto';
    }
  }

  function placeCalendar() {
    if (!els.singleCal || !els.dateBtn) return;
    els.singleCal.hidden = false;
    var r = els.dateBtn.getBoundingClientRect();
    var width = els.singleCal.offsetWidth || 280;
    var height = els.singleCal.offsetHeight || 300;
    var left = Math.min(window.innerWidth - width - 12, Math.max(12, r.left));
    var top = r.bottom + 6;
    if (top + height > window.innerHeight - 12) top = Math.max(12, r.top - height - 6);
    els.singleCal.style.left = left + 'px';
    els.singleCal.style.top = top + 'px';
  }

  function initVisible(tabId) {
    state.visible[tabId] = TABS[tabId].columns.map(function (c) { return c.id; });
  }

  function currentRows() {
    return state.rows[state.tab] || [];
  }

  function renderHead() {
    var cfg = TABS[state.tab];
    var visible = state.visible[state.tab] || [];
    els.head.innerHTML = cfg.columns.map(function (col) {
      var hidden = visible.indexOf(col.id) === -1 ? ' hidden' : '';
      return '<th scope="col" data-col="' + col.id + '"' + hidden + '>' + col.label + '</th>';
    }).join('');
  }

  function cellValue(row, colId, index) {
    if (colId === 'sno') return String(index + 1);
    if (colId === 'status') return '<span class="gr-badge gr-badge--canceled">' + escapeHtml(row.status || 'Canceled') + '</span>';
    if (colId === 'action') {
      return '<button type="button" class="gr-action-link" data-cancel-id="' + escapeHtml(row.grievanceId) + '">Cancel</button>';
    }
    var val = row[colId];
    return escapeHtml(val == null || val === '' ? '--' : val);
  }

  function renderBody() {
    var rows = currentRows();
    var cfg = TABS[state.tab];
    var visible = state.visible[state.tab] || [];
    var total = rows.length;
    var totalPages = Math.max(1, Math.ceil(total / state.pageSize) || 1);
    if (state.page > totalPages) state.page = totalPages;
    var start = (state.page - 1) * state.pageSize;
    var pageRows = rows.slice(start, start + state.pageSize);

    els.body.innerHTML = pageRows.map(function (row, i) {
      return '<tr>' + cfg.columns.map(function (col) {
        var hidden = visible.indexOf(col.id) === -1 ? ' hidden' : '';
        return '<td data-col="' + col.id + '"' + hidden + '>' + cellValue(row, col.id, start + i) + '</td>';
      }).join('') + '</tr>';
    }).join('');

    if (els.empty) els.empty.hidden = total > 0;
    if (els.pageInput) els.pageInput.value = String(state.page);
    if (els.pageTotal) els.pageTotal.textContent = String(totalPages);
    if (els.count) els.count.textContent = total + '/' + total;
    if (els.prev) els.prev.disabled = state.page <= 1;
    if (els.next) els.next.disabled = state.page >= totalPages || total === 0;

    els.body.querySelectorAll('[data-cancel-id]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-cancel-id');
        cancelPending(id);
      });
    });
  }

  function cancelPending(id) {
    var list = state.rows.pending;
    var idx = -1;
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].grievanceId) === String(id)) { idx = i; break; }
    }
    if (idx === -1) return;
    var row = list.splice(idx, 1)[0];
    state.rows.canceled.unshift({
      id: row.id,
      date: formatDisplayDate(new Date()),
      raisedDate: row.raisedDate,
      grievanceId: row.grievanceId,
      detail: row.detail,
      type: row.type,
      file: row.file || '--',
      status: 'Canceled'
    });
    toast('Grievance canceled', 'Grievance #' + id + ' moved to Canceled.');
    setTab('canceled');
  }

  function renderColumnsPop() {
    var cfg = TABS[state.tab];
    var visible = state.visible[state.tab] || [];
    els.columnsList.innerHTML = cfg.columns.map(function (col) {
      var checked = visible.indexOf(col.id) !== -1 ? ' checked' : '';
      return '<li class="gr-pop__item" data-col-id="' + col.id + '" title="' + escapeHtml(col.label) + '">' +
        '<span class="gr-pop__drag" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></span>' +
        '<span class="gr-pop__check">' +
          '<input type="checkbox" id="gr-col-' + col.id + '" data-col="' + col.id + '"' + checked + '>' +
          '<span class="gr-pop__check-ui" aria-hidden="true"></span>' +
        '</span>' +
        '<label for="gr-col-' + col.id + '">' + escapeHtml(col.label) + '</label></li>';
    }).join('');
  }

  function renderToolbar() {
    els.toolbarLeft.innerHTML = '';
    els.toolbarActions.innerHTML = '';

    var colBtn = document.createElement('button');
    colBtn.type = 'button';
    colBtn.className = 'gr-icon-btn';
    colBtn.id = 'grColumnsBtn';
    colBtn.title = 'Columns';
    colBtn.setAttribute('aria-label', 'Columns');
    colBtn.innerHTML = COL_ICON;
    colBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !els.columnsPop.hidden && colBtn.classList.contains('is-active');
      closePops();
      closeCalendar();
      closeTypeMenu();
      if (open) return;
      renderColumnsPop();
      colBtn.classList.add('is-active');
      placePop(els.columnsPop, colBtn);
    });
    els.toolbarLeft.appendChild(colBtn);

    var addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'gr-icon-btn gr-icon-btn--primary';
    addBtn.id = 'grAddBtn';
    addBtn.title = 'Add Grievance';
    addBtn.setAttribute('aria-label', 'Add Grievance');
    addBtn.innerHTML = PLUS_ICON;
    addBtn.addEventListener('click', openAddModal);
    els.toolbarActions.appendChild(addBtn);
  }

  function setTab(tabId) {
    if (!TABS[tabId]) return;
    state.tab = tabId;
    state.page = 1;
    closePops();
    closeCalendar();
    closeTypeMenu();
    els.tabs.forEach(function (tab) {
      var on = tab.getAttribute('data-tab') === tabId;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (!state.visible[tabId]) initVisible(tabId);
    renderHead();
    renderToolbar();
    renderBody();
  }

  function renderTypeOptions(filter) {
    var q = (filter || '').toLowerCase().trim();
    var list = GRIEVANCE_TYPES.filter(function (t) {
      return !q || t.toLowerCase().indexOf(q) !== -1;
    });
    if (!list.length) {
      els.typeOptions.innerHTML = '<div class="gr-search-select__empty">No matches</div>';
      return;
    }
    els.typeOptions.innerHTML = list.map(function (t) {
      var active = t === state.form.type ? ' is-active' : '';
      return '<button type="button" class="gr-search-select__opt' + active + '" role="option" data-value="' + escapeHtml(t) + '">' + escapeHtml(t) + '</button>';
    }).join('');
  }

  function openTypeMenu() {
    closeCalendar();
    closePops();
    renderTypeOptions(els.typeInput.value === state.form.type ? '' : els.typeInput.value);
    els.typeOptions.hidden = false;
    els.typeInput.setAttribute('aria-expanded', 'true');
  }

  function selectType(value) {
    state.form.type = value;
    els.typeInput.value = value;
    closeTypeMenu();
  }

  function sameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function renderCalendar() {
    var view = state.cal.view;
    var y = view.getFullYear();
    var m = view.getMonth();
    els.calTitle.textContent = MONTHS[m] + ' ' + y;

    var first = new Date(y, m, 1);
    var startDow = first.getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var prevDays = new Date(y, m, 0).getDate();
    var html = DOW.map(function (d) { return '<div class="gr-single-cal__dow">' + d + '</div>'; }).join('');

    var cells = [];
    for (var i = 0; i < startDow; i++) {
      cells.push({ day: prevDays - startDow + 1 + i, muted: true, date: new Date(y, m - 1, prevDays - startDow + 1 + i) });
    }
    for (var d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, muted: false, date: new Date(y, m, d) });
    }
    while (cells.length % 7 !== 0) {
      var nextDay = cells.length - (startDow + daysInMonth) + 1;
      cells.push({ day: nextDay, muted: true, date: new Date(y, m + 1, nextDay) });
    }

    html += cells.map(function (c) {
      var cls = 'gr-single-cal__day';
      if (c.muted) cls += ' is-muted';
      if (sameDay(c.date, state.cal.selected) || sameDay(c.date, state.form.date)) cls += ' is-selected';
      return '<button type="button" class="' + cls + '" data-y="' + c.date.getFullYear() + '" data-m="' + c.date.getMonth() + '" data-d="' + c.date.getDate() + '">' + c.day + '</button>';
    }).join('');

    els.calGrid.innerHTML = html;
  }

  function openCalendar() {
    closeTypeMenu();
    closePops();
    if (state.form.date) {
      state.cal.view = new Date(state.form.date.getFullYear(), state.form.date.getMonth(), 1);
      state.cal.selected = new Date(state.form.date.getTime());
    } else {
      state.cal.view = new Date(2026, 7, 1);
    }
    renderCalendar();
    els.dateBtn.classList.add('is-open');
    els.dateBtn.setAttribute('aria-expanded', 'true');
    placeCalendar();
  }

  function pickDate(d) {
    state.form.date = d;
    state.cal.selected = d;
    els.dateText.textContent = formatDisplayDate(d);
    els.dateText.classList.remove('is-placeholder');
    closeCalendar();
  }

  function resetForm() {
    state.form = { type: '', details: '', date: null, fileName: '', sendToHr: false };
    if (els.typeInput) els.typeInput.value = '';
    if (els.details) els.details.value = '';
    if (els.dateText) {
      els.dateText.textContent = 'Select date';
      els.dateText.classList.add('is-placeholder');
    }
    if (els.document) els.document.value = '';
    if (els.uploadLabel) {
      els.uploadLabel.textContent = 'Click to Upload';
      els.uploadLabel.parentElement.classList.remove('has-file');
    }
    if (els.sendToHr) els.sendToHr.checked = false;
    closeTypeMenu();
    closeCalendar();
  }

  function openAddModal() {
    closePops();
    resetForm();
    if (els.addModal) els.addModal.hidden = false;
  }

  function closeAddModal() {
    if (els.addModal) els.addModal.hidden = true;
    closeTypeMenu();
    closeCalendar();
  }

  function saveGrievance() {
    var type = (state.form.type || '').trim();
    var details = (els.details.value || '').trim();
    var date = state.form.date;

    if (!type) { toast('Required', 'Please select a Grievance Type.'); openTypeMenu(); return; }
    if (!details) { toast('Required', 'Please enter Grievance Details.'); els.details.focus(); return; }
    if (!date) { toast('Required', 'Please select a Date.'); openCalendar(); return; }

    var id = String(state.nextId++);
    var raised = formatDisplayDate(date);
    var row = {
      id: Number(id),
      raisedDate: raised,
      grievanceId: id,
      detail: details,
      type: type,
      actionDate: '--',
      file: state.form.fileName || '--',
      manager: state.form.sendToHr || els.sendToHr.checked ? 'N/A' : 'Pending',
      hr: 'Pending',
      date: raised
    };

    state.rows.pending.unshift(row);
    closeAddModal();
    setTab('pending');
    toast('Grievance raised', 'Grievance #' + id + ' submitted successfully.');
  }

  function updateCheckInBtn() {
    if (!els.topCheckIn) return;
    if (state.checkedIn) {
      els.topCheckIn.textContent = 'Check Out';
      els.topCheckIn.classList.remove('is-in');
    } else {
      els.topCheckIn.textContent = 'Check In';
      els.topCheckIn.classList.add('is-in');
    }
  }

  function toggleCheckIn() {
    if (state.checkedIn) {
      state.checkedIn = false;
      toast('Checked out', 'You have checked out successfully.');
    } else {
      state.checkedIn = true;
      toast('Checked in', 'You have checked in successfully.');
    }
    updateCheckInBtn();
  }

  function tickClock() {
    if (!els.topClock) return;
    var now = new Date();
    els.topClock.textContent = formatClock(now);
    els.topClock.setAttribute('datetime', now.toISOString());
  }

  function bind() {
    els.tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        setTab(tab.getAttribute('data-tab'));
      });
    });

    if (els.selectAll) {
      els.selectAll.addEventListener('click', function () {
        state.visible[state.tab] = TABS[state.tab].columns.map(function (c) { return c.id; });
        renderColumnsPop();
        renderHead();
        renderBody();
      });
    }

    if (els.columnsList) {
      els.columnsList.addEventListener('change', function (e) {
        var input = e.target;
        if (!input || !input.getAttribute('data-col')) return;
        var colId = input.getAttribute('data-col');
        var visible = state.visible[state.tab] || [];
        var idx = visible.indexOf(colId);
        if (input.checked && idx === -1) visible.push(colId);
        if (!input.checked && idx !== -1) visible.splice(idx, 1);
        state.visible[state.tab] = visible;
        renderHead();
        renderBody();
      });
    }

    if (els.addClose) els.addClose.addEventListener('click', closeAddModal);
    if (els.addModal) {
      els.addModal.addEventListener('click', function (e) {
        if (e.target === els.addModal) closeAddModal();
      });
    }
    if (els.addForm) {
      els.addForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveGrievance();
      });
    }

    if (els.typeInput) {
      els.typeInput.addEventListener('focus', openTypeMenu);
      els.typeInput.addEventListener('click', function (e) {
        e.stopPropagation();
        openTypeMenu();
      });
      els.typeInput.addEventListener('input', function () {
        state.form.type = '';
        openTypeMenu();
        renderTypeOptions(els.typeInput.value);
      });
    }
    if (els.typeOptions) {
      els.typeOptions.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-value]');
        if (!btn) return;
        e.stopPropagation();
        selectType(btn.getAttribute('data-value'));
      });
    }

    if (els.dateBtn) {
      els.dateBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!els.singleCal.hidden) { closeCalendar(); return; }
        openCalendar();
      });
    }
    if (els.calGrid) {
      els.calGrid.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-y]');
        if (!btn) return;
        e.stopPropagation();
        pickDate(new Date(Number(btn.getAttribute('data-y')), Number(btn.getAttribute('data-m')), Number(btn.getAttribute('data-d'))));
      });
    }
    if (els.singleCal) {
      els.singleCal.addEventListener('click', function (e) {
        e.stopPropagation();
        var nav = e.target.closest('[data-nav]');
        if (!nav) return;
        var action = nav.getAttribute('data-nav');
        var v = state.cal.view;
        if (action === 'prev-month') state.cal.view = new Date(v.getFullYear(), v.getMonth() - 1, 1);
        if (action === 'next-month') state.cal.view = new Date(v.getFullYear(), v.getMonth() + 1, 1);
        if (action === 'prev-year') state.cal.view = new Date(v.getFullYear() - 1, v.getMonth(), 1);
        if (action === 'next-year') state.cal.view = new Date(v.getFullYear() + 1, v.getMonth(), 1);
        renderCalendar();
      });
    }
    if (els.calToday) {
      els.calToday.addEventListener('click', function (e) {
        e.stopPropagation();
        var today = new Date();
        state.cal.view = new Date(today.getFullYear(), today.getMonth(), 1);
        pickDate(today);
      });
    }

    if (els.document) {
      els.document.addEventListener('change', function () {
        var file = els.document.files && els.document.files[0];
        state.form.fileName = file ? file.name : '';
        if (els.uploadLabel) {
          els.uploadLabel.textContent = state.form.fileName || 'Click to Upload';
          els.uploadLabel.parentElement.classList.toggle('has-file', !!state.form.fileName);
        }
      });
    }

    if (els.prev) {
      els.prev.addEventListener('click', function () {
        if (state.page <= 1) return;
        state.page -= 1;
        renderBody();
      });
    }
    if (els.next) {
      els.next.addEventListener('click', function () {
        var totalPages = Math.max(1, Math.ceil(currentRows().length / state.pageSize) || 1);
        if (state.page >= totalPages) return;
        state.page += 1;
        renderBody();
      });
    }

    if (els.topCheckIn) els.topCheckIn.addEventListener('click', toggleCheckIn);

    document.addEventListener('click', function () {
      closePops();
      closeTypeMenu();
      closeCalendar();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAddModal();
        closePops();
        closeTypeMenu();
        closeCalendar();
      }
    });
  }

  Object.keys(TABS).forEach(initVisible);
  bind();
  updateCheckInBtn();
  tickClock();
  setInterval(tickClock, 1000);
  setTab('pending');
})();
