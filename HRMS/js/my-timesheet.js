/**
 * TIME ERP — Timesheet (tabs, date range, add modal)
 */
(function () {
  'use strict';

  var TABS = {
    approved: {
      columns: [
        { id: 'sno', label: 'S No.' },
        { id: 'billable', label: 'Is Billable', labelHtml: 'Is<br>Billable' },
        { id: 'branch', label: 'Branch' },
        { id: 'client', label: 'Client' },
        { id: 'service', label: 'Service' },
        { id: 'task', label: 'Task' },
        { id: 'partnerRemark', label: 'Partner Remark', labelHtml: 'Partner<br>Remark' },
        { id: 'actionBy', label: 'Action By', labelHtml: 'Action<br>By' }
      ]
    },
    rejected: {
      columns: [
        { id: 'sno', label: 'S No.' },
        { id: 'billable', label: 'Is Billable', labelHtml: 'Is<br>Billable' },
        { id: 'branch', label: 'Branch' },
        { id: 'client', label: 'Client' },
        { id: 'service', label: 'Service' },
        { id: 'task', label: 'Task' },
        { id: 'partnerRemark', label: 'Partner Remark', labelHtml: 'Partner<br>Remark' },
        { id: 'managerRemark', label: 'Manager Remark', labelHtml: 'Manager<br>Remark' },
        { id: 'actionBy', label: 'Action By', labelHtml: 'Action<br>By' }
      ]
    },
    pending: {
      columns: [
        { id: 'sno', label: 'S No.' },
        { id: 'billable', label: 'Is Billable', labelHtml: 'Is<br>Billable' },
        { id: 'branch', label: 'Branch' },
        { id: 'client', label: 'Client' },
        { id: 'employee', label: 'Employee' },
        { id: 'service', label: 'Service' },
        { id: 'task', label: 'Task' },
        { id: 'createdAt', label: 'Created At', labelHtml: 'Created<br>At' }
      ]
    },
    suggest: {
      columns: [
        { id: 'sno', label: 'S No.' },
        { id: 'billable', label: 'Is Billable', labelHtml: 'Is<br>Billable' },
        { id: 'branch', label: 'Branch' },
        { id: 'client', label: 'Client' },
        { id: 'service', label: 'Service' },
        { id: 'task', label: 'Task' },
        { id: 'partnerRemark', label: 'Partner Remark', labelHtml: 'Partner<br>Remark' },
        { id: 'managerRemark', label: 'Manager Remark', labelHtml: 'Manager<br>Remark' },
        { id: 'actionBy', label: 'Action By', labelHtml: 'Action<br>By' },
        { id: 'action', label: 'Action' }
      ]
    }
  };

  var DUMMY = {
    approved: [
      { billable: 'Yes', branch: 'CA CloudDesk', client: 'Internal', service: 'Tax consultation', task: 'TSK01190', partnerRemark: 'Approved', actionBy: 'Kamal Kant Sharma' },
      { billable: 'Yes', branch: 'TimeErp Demo', client: 'SAURABH BHARDWAJ', service: 'GST Filing', task: 'Return Filing', partnerRemark: 'Approved', actionBy: 'Kamal Kant Sharma' },
      { billable: 'Yes', branch: 'TimeErp Demo', client: 'Internal', service: 'Audit', task: 'Document Review', partnerRemark: 'Verified', actionBy: 'Priya Mehta' },
      { billable: 'No', branch: 'Head Office', client: 'THE GOLD REALTY', service: 'Consulting', task: 'Client Call', partnerRemark: 'OK', actionBy: 'Kamal Kant Sharma' },
      { billable: 'Yes', branch: 'Delhi', client: 'PERFECT PAIR', service: 'Payroll', task: 'Report Preparation', partnerRemark: 'Completed', actionBy: 'Anita Verma' },
      { billable: 'Yes', branch: 'TimeErp Demo', client: 'Saksham', service: 'GST Filing', task: 'Return Filing', partnerRemark: 'Approved', actionBy: 'Kamal Kant Sharma' }
    ],
    rejected: [
      { billable: 'Yes', branch: 'TimeErp Demo', client: 'SAURABH BHARDWAJ HUF', service: 'Audit', task: 'Document Review', partnerRemark: 'Incomplete docs', managerRemark: 'Please resubmit with attachments', actionBy: 'Kamal Kant Sharma' },
      { billable: 'No', branch: 'Head Office', client: 'Internal', service: 'Consulting', task: 'Client Call', partnerRemark: 'Hours mismatch', managerRemark: 'Logged hours exceed policy limit', actionBy: 'Priya Mehta' },
      { billable: 'Yes', branch: 'Delhi', client: 'NOVA TECH SOLUTIONS', service: 'Payroll', task: 'Report Preparation', partnerRemark: 'Wrong client', managerRemark: 'Client mapping incorrect', actionBy: 'Kamal Kant Sharma' },
      { billable: 'Yes', branch: 'TimeErp Demo', client: 'ACME INDIA PVT LTD', service: 'GST Filing', task: 'Return Filing', partnerRemark: 'Missing remark', managerRemark: 'Add detailed remark', actionBy: 'Anita Verma' }
    ],
    pending: [
      { billable: 'Yes', branch: 'CA CloudDesk', client: 'Internal', employee: 'Kamal Kant Sharma', service: 'Tax consultation', task: 'TSK01190', taskName: 'Client consultation call', createdAt: '17-08-2026 02:38 PM' },
      { billable: 'Yes', branch: 'CA CloudDesk', client: 'SAURABH BHARDWAJ', employee: 'Kamal Kant Sharma', service: 'GST Filing', task: 'TSK01145', taskName: 'Return Filing', createdAt: '16-08-2026 04:15 PM' },
      { billable: 'No', branch: 'Head Office', client: 'Internal', employee: 'Kamal Kant Sharma', service: 'Audit', task: 'TSK01102', taskName: 'Document Review', createdAt: '15-08-2026 11:20 AM' },
      { billable: 'Yes', branch: 'Delhi', client: 'PERFECT PAIR', employee: 'Kamal Kant Sharma', service: 'Payroll', task: 'TSK01088', taskName: 'Report Preparation', createdAt: '14-08-2026 03:45 PM' },
      { billable: 'Yes', branch: 'CA CloudDesk', client: 'THE GOLD REALTY', employee: 'Kamal Kant Sharma', service: 'Consulting', task: 'TSK01071', taskName: 'Client Call', createdAt: '13-08-2026 09:10 AM' },
      { billable: 'No', branch: 'CA CloudDesk', client: 'Internal', employee: 'Kamal Kant Sharma', service: 'Consulting', task: 'TSK01055', taskName: 'Team Meeting', createdAt: '12-08-2026 05:30 PM' }
    ],
    suggest: [
      { billable: 'Yes', branch: 'TimeErp Demo', client: 'SAURABH BHARDWAJ', service: 'GST Filing', task: 'Return Filing', partnerRemark: 'Update hours to 4', managerRemark: 'Suggested 4 hrs instead of 6', actionBy: 'Kamal Kant Sharma' },
      { billable: 'Yes', branch: 'Head Office', client: 'THE GOLD REALTY', service: 'Audit', task: 'Document Review', partnerRemark: 'Change service type', managerRemark: 'Use Consulting instead of Audit', actionBy: 'Priya Mehta' },
      { billable: 'No', branch: 'Delhi', client: 'Internal', service: 'Payroll', task: 'Report Preparation', partnerRemark: 'Mark non-billable', managerRemark: 'Internal training — not billable', actionBy: 'Kamal Kant Sharma' },
      { billable: 'Yes', branch: 'TimeErp Demo', client: 'PERFECT PAIR', service: 'Consulting', task: 'Client Call', partnerRemark: 'Split entry', managerRemark: 'Split into two tasks', actionBy: 'Anita Verma' }
    ]
  };

  var TASK_DETAILS = {
    'TSK01190': { taskId: 'TSK01190', taskName: 'Client consultation call', stage: 'Consultation in progress', status: 'OPEN', dueDate: '18/04/2026', dueTime: '12:38 AM' },
    'TSK01145': { taskId: 'TSK01145', taskName: 'Return Filing', stage: 'Filing in progress', status: 'OPEN', dueDate: '20/08/2026', dueTime: '06:00 PM' },
    'TSK01102': { taskId: 'TSK01102', taskName: 'Document Review', stage: 'Review pending', status: 'OPEN', dueDate: '22/08/2026', dueTime: '11:00 AM' },
    'TSK01088': { taskId: 'TSK01088', taskName: 'Report Preparation', stage: 'In progress', status: 'OPEN', dueDate: '25/08/2026', dueTime: '04:30 PM' },
    'TSK01071': { taskId: 'TSK01071', taskName: 'Client Call', stage: 'Scheduled', status: 'OPEN', dueDate: '19/08/2026', dueTime: '03:00 PM' },
    'TSK01055': { taskId: 'TSK01055', taskName: 'Team Meeting', stage: 'Completed', status: 'CLOSED', dueDate: '12/08/2026', dueTime: '05:30 PM' }
  };

  var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var SUMMARY = {
    '2026-08': {
      employee: 'Kamal Kant Sharma', totalDay: 31, holidays: 2, workingDays: 29, leaveCount: 0,
      hourlyLeaves: 0, outDuty: 0, absent: 3, payableDays: 14, fullDay: 12, halfDay: 0,
      totalHours: '106:00', actualHours: '98:07', extraLoss: 12, incomplete: 3, lateComing: 1
    },
    '2026-07': {
      employee: 'Kamal Kant Sharma', totalDay: 31, holidays: 3, workingDays: 28, leaveCount: 1,
      hourlyLeaves: 0, outDuty: 1, absent: 2, payableDays: 16, fullDay: 14, halfDay: 1,
      totalHours: '112:00', actualHours: '104:30', extraLoss: 8, incomplete: 2, lateComing: 0
    }
  };

  var now = new Date();
  var state = {
    tab: 'approved',
    rangeStart: new Date(2026, 7, 10),
    rangeEnd: new Date(2026, 7, 17),
    calCursor: new Date(2026, 7, 1),
    pickingEnd: false,
    formDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    formCalCursor: new Date(now.getFullYear(), now.getMonth(), 1),
    formHour: now.getHours(),
    formMinute: now.getMinutes(),
    draftHour: now.getHours(),
    draftMinute: now.getMinutes(),
    sumYear: 2026,
    sumMonth: 8
  };

  var els = {
    tabs: Array.prototype.slice.call(document.querySelectorAll('.mts-tab')),
    head: document.getElementById('mtsTableHead'),
    body: document.getElementById('mtsTableBody'),
    empty: document.getElementById('mtsEmpty'),
    rangeTrigger: document.getElementById('mtsRangeTrigger'),
    rangeText: document.getElementById('mtsRangeText'),
    rangePop: document.getElementById('mtsRangePop'),
    rangeCals: document.getElementById('mtsRangeCals'),
    addBtn: document.getElementById('mtsAddBtn'),
    addModal: document.getElementById('mtsAddModal'),
    addForm: document.getElementById('mtsAddForm'),
    addClose: document.getElementById('mtsAddClose'),
    dateBtn: document.getElementById('mtsDateBtn'),
    dateText: document.getElementById('mtsDateText'),
    timeBtn: document.getElementById('mtsTimeBtn'),
    timeText: document.getElementById('mtsTimeText'),
    singleCal: document.getElementById('mtsSingleCal'),
    singleCalGrid: document.getElementById('mtsSingleCalGrid'),
    singleCalTitle: document.getElementById('mtsSingleCalTitle'),
    singleCalToday: document.getElementById('mtsSingleCalToday'),
    timePop: document.getElementById('mtsTimePop'),
    hourList: document.getElementById('mtsHourList'),
    minuteList: document.getElementById('mtsMinuteList'),
    timeNow: document.getElementById('mtsTimeNow'),
    timeOk: document.getElementById('mtsTimeOk'),
    branch: document.getElementById('mtsBranch'),
    billable: document.getElementById('mtsBillable'),
    client: document.getElementById('mtsClient'),
    service: document.getElementById('mtsService'),
    task: document.getElementById('mtsTask'),
    remark: document.getElementById('mtsRemark'),
    specifyTime: document.getElementById('mtsSpecifyTime'),
    sumMonthBtn: document.getElementById('mtsSumMonthBtn'),
    sumMonthPop: document.getElementById('mtsSumMonthPop'),
    sumMonthLabel: document.getElementById('mtsSumMonthLabel'),
    sumYearLabel: document.getElementById('mtsSumYearLabel'),
    sumMonthGrid: document.getElementById('mtsSumMonthGrid'),
    sumTitle: document.getElementById('mtsSumTitle'),
    taskModal: document.getElementById('mtsTaskModal'),
    taskClose: document.getElementById('mtsTaskClose'),
    taskBody: document.getElementById('mtsTaskBody'),
    invoiceModal: document.getElementById('mtsInvoiceModal'),
    invoiceClose: document.getElementById('mtsInvoiceClose'),
    invoiceForm: document.getElementById('mtsInvoiceForm'),
    invTask: document.getElementById('mtsInvTask'),
    commentsModal: document.getElementById('mtsCommentsModal'),
    commentsClose: document.getElementById('mtsCommentsClose')
  };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

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

  function formatRangeDate(d) {
    if (!d) return '';
    return pad(d.getDate()) + '-' + pad(d.getMonth() + 1) + '-' + d.getFullYear();
  }

  function formatTime(h, m) { return pad(h) + ':' + pad(m); }

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

  function syncRangeLabel() {
    var start = state.rangeStart ? formatRangeDate(state.rangeStart) : 'Start date';
    var end = state.rangeEnd ? formatRangeDate(state.rangeEnd) : 'End date';
    els.rangeText.innerHTML = start + ' &nbsp;→&nbsp; ' + end;
  }

  function syncFormDate() {
    if (!state.formDate) {
      els.dateText.textContent = 'DD-MM-YYYY';
      return;
    }
    els.dateText.textContent = formatRangeDate(state.formDate);
    if (els.dateBtn) els.dateBtn.classList.remove('is-error');
  }

  function syncFormTime() {
    els.timeText.textContent = formatTime(state.formHour, state.formMinute);
  }

  function closeRangePop() {
    if (els.rangePop) els.rangePop.hidden = true;
    if (els.rangeTrigger) {
      els.rangeTrigger.classList.remove('is-open');
      els.rangeTrigger.setAttribute('aria-expanded', 'false');
    }
  }

  function closeSingleCal() {
    if (els.singleCal) els.singleCal.hidden = true;
    if (els.dateBtn) {
      els.dateBtn.classList.remove('is-open');
      els.dateBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function closeTimePop() {
    if (els.timePop) els.timePop.hidden = true;
    if (els.timeBtn) {
      els.timeBtn.classList.remove('is-open');
      els.timeBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function closeFormPops() {
    closeSingleCal();
    closeTimePop();
  }

  function placePop(pop, anchor) {
    if (!pop || !anchor) return;
    pop.hidden = false;
    var r = anchor.getBoundingClientRect();
    var width = pop.offsetWidth || 288;
    var height = pop.offsetHeight || 280;
    var left = Math.min(window.innerWidth - width - 12, Math.max(12, r.left));
    var top = r.bottom + 4;
    if (top + height > window.innerHeight - 12) top = Math.max(12, r.top - height - 4);
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
  }

  function placeRangePop() {
    if (!els.rangePop || !els.rangeTrigger) return;
    els.rangePop.hidden = false;
    var r = els.rangeTrigger.getBoundingClientRect();
    var width = els.rangePop.offsetWidth || 552;
    var height = els.rangePop.offsetHeight || 320;
    var left = Math.min(window.innerWidth - width - 12, Math.max(12, r.right - width));
    var top = r.bottom + 6;
    if (top + height > window.innerHeight - 12) top = Math.max(12, r.top - height - 6);
    els.rangePop.style.left = left + 'px';
    els.rangePop.style.top = top + 'px';
    els.rangeTrigger.classList.add('is-open');
    els.rangeTrigger.setAttribute('aria-expanded', 'true');
  }

  function renderMonth(year, month) {
    var first = new Date(year, month, 1);
    var startDay = first.getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var prevDays = new Date(year, month, 0).getDate();
    var html = '<div class="mts-cal"><div class="mts-cal__grid">';
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function (d) {
      html += '<div class="mts-cal__dow">' + d + '</div>';
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
      var cls = 'mts-cal__day';
      if (cell.muted) cls += ' is-muted';
      var isStart = sameDay(cell.date, state.rangeStart);
      var isEnd = sameDay(cell.date, state.rangeEnd);
      if (isStart || isEnd) cls += ' is-selected';
      if (isStart) cls += ' is-range-start';
      if (isEnd) cls += ' is-range-end';
      if (state.rangeStart && state.rangeEnd && inRange(cell.date, state.rangeStart, state.rangeEnd) && !isStart && !isEnd) cls += ' is-in-range';
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
    var titleLeft = document.getElementById('mtsCalTitleLeft');
    var titleRight = document.getElementById('mtsCalTitleRight');
    if (titleLeft) titleLeft.textContent = monthNames[m] + ' ' + y;
    if (titleRight) titleRight.textContent = monthNames[next.m] + ' ' + next.y;
    els.rangeCals.innerHTML = renderMonth(y, m) + renderMonth(next.y, next.m);
  }

  function renderSingleCal() {
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var cursor = state.formCalCursor || new Date();
    var y = cursor.getFullYear();
    var m = cursor.getMonth();
    els.singleCalTitle.textContent = monthNames[m] + ' ' + y;
    var first = new Date(y, m, 1);
    var startDay = first.getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var prevDays = new Date(y, m, 0).getDate();
    var html = '';
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function (d) {
      html += '<div class="mts-single-cal__dow">' + d + '</div>';
    });
    var cells = [];
    for (var i = 0; i < startDay; i++) {
      cells.push({ day: prevDays - startDay + i + 1, muted: true, date: new Date(y, m - 1, prevDays - startDay + i + 1) });
    }
    for (var d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, muted: false, date: new Date(y, m, d) });
    }
    var nextDay = 1;
    while (cells.length < 42) {
      cells.push({ day: nextDay, muted: true, date: new Date(y, m + 1, nextDay) });
      nextDay += 1;
    }
    cells.forEach(function (cell) {
      var cls = 'mts-single-cal__day';
      if (cell.muted) cls += ' is-muted';
      if (sameDay(cell.date, state.formDate)) cls += ' is-selected';
      html += '<button type="button" class="' + cls + '" data-y="' + cell.date.getFullYear() + '" data-m="' + cell.date.getMonth() + '" data-d="' + cell.date.getDate() + '">' + cell.day + '</button>';
    });
    els.singleCalGrid.innerHTML = html;
  }

  function openSingleCal() {
    closeTimePop();
    closeRangePop();
    if (!state.formCalCursor) {
      state.formCalCursor = state.formDate
        ? new Date(state.formDate.getFullYear(), state.formDate.getMonth(), 1)
        : new Date(now.getFullYear(), now.getMonth(), 1);
    }
    renderSingleCal();
    placePop(els.singleCal, els.dateBtn);
    els.dateBtn.classList.add('is-open');
    els.dateBtn.setAttribute('aria-expanded', 'true');
  }

  function renderTimeLists() {
    var hHtml = '';
    var mHtml = '';
    for (var h = 0; h < 24; h++) {
      hHtml += '<button type="button" class="mts-time-pop__item' + (h === state.draftHour ? ' is-active' : '') + '" data-hour="' + h + '" role="option">' + pad(h) + '</button>';
    }
    for (var m = 0; m < 60; m++) {
      mHtml += '<button type="button" class="mts-time-pop__item' + (m === state.draftMinute ? ' is-active' : '') + '" data-minute="' + m + '" role="option">' + pad(m) + '</button>';
    }
    els.hourList.innerHTML = hHtml;
    els.minuteList.innerHTML = mHtml;
    var activeH = els.hourList.querySelector('.is-active');
    var activeM = els.minuteList.querySelector('.is-active');
    if (activeH) activeH.scrollIntoView({ block: 'nearest' });
    if (activeM) activeM.scrollIntoView({ block: 'nearest' });
  }

  function openTimePop() {
    closeSingleCal();
    closeRangePop();
    state.draftHour = state.formHour;
    state.draftMinute = state.formMinute;
    renderTimeLists();
    placePop(els.timePop, els.timeBtn);
    els.timeBtn.classList.add('is-open');
    els.timeBtn.setAttribute('aria-expanded', 'true');
  }

  function cellHtml(col, row, index) {
    if (col.id === 'sno') return String(index + 1);
    if (col.id === 'billable') {
      var yes = String(row.billable || '').toLowerCase() === 'yes';
      return '<span class="mts-bill' + (yes ? ' mts-bill--yes' : ' mts-bill--no') + '">' + esc(row.billable || '--') + '</span>';
    }
    if (col.id === 'task' && row.task && /^TSK/i.test(row.task)) {
      return '<button type="button" class="mts-link" data-action="open-task" data-task-id="' + esc(row.task) + '">' + esc(row.task) + '</button>';
    }
    if (col.id === 'action') {
      return '<button type="button" class="mts-action-link" data-action="accept" data-index="' + index + '">Accept</button>' +
        '<span class="mts-action-sep">|</span>' +
        '<button type="button" class="mts-action-link" data-action="reject" data-index="' + index + '">Reject</button>';
    }
    return esc(row[col.id] == null || row[col.id] === '' ? '--' : row[col.id]);
  }

  var PDF_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3v12M8 11l4 4 4-4"/><path d="M5 21h14"/></svg>';

  function openTaskModal(taskId) {
    var task = TASK_DETAILS[taskId] || {
      taskId: taskId, taskName: 'Client consultation call', stage: 'Consultation in progress',
      status: 'OPEN', dueDate: '18/04/2026', dueTime: '12:38 AM'
    };
    if (!els.taskModal || !els.taskBody) return;
    els.taskBody.innerHTML =
      '<tr>' +
        '<td><button type="button" class="mts-link" data-action="go-task-view" data-task-id="' + esc(task.taskId) + '">' + esc(task.taskId) + '</button></td>' +
        '<td>' + esc(task.taskName) + '</td>' +
        '<td>' + esc(task.stage) + '</td>' +
        '<td>' + esc(task.status) + '</td>' +
        '<td><button type="button" class="mts-tag-btn" aria-label="Add tag">+</button></td>' +
        '<td><button type="button" class="mts-link" data-action="view-comments">View</button></td>' +
        '<td><button type="button" class="mts-link" data-action="create-invoice" data-task-name="' + esc(task.taskName) + '">Create Invoice</button></td>' +
        '<td><span class="mts-due-date">' + esc(task.dueDate) + '<br>' + esc(task.dueTime) + '</span></td>' +
        '<td><button type="button" class="mts-pdf-btn" aria-label="Download PDF">' + PDF_ICON + '</button></td>' +
      '</tr>';
    els.taskModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeTaskModal() {
    if (!els.taskModal) return;
    els.taskModal.hidden = true;
    if ((els.invoiceModal && els.invoiceModal.hidden) && (els.commentsModal && els.commentsModal.hidden) && (els.addModal && els.addModal.hidden)) {
      document.body.style.overflow = '';
    }
  }

  function openInvoiceModal(taskName) {
    if (els.invTask && taskName) els.invTask.value = taskName;
    if (els.invoiceModal) {
      els.invoiceModal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }

  function closeInvoiceModal() {
    if (!els.invoiceModal) return;
    els.invoiceModal.hidden = true;
    if ((els.taskModal && els.taskModal.hidden) && (els.commentsModal && els.commentsModal.hidden) && (els.addModal && els.addModal.hidden)) {
      document.body.style.overflow = '';
    }
  }

  function openCommentsModal() {
    if (els.commentsModal) {
      els.commentsModal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCommentsModal() {
    if (!els.commentsModal) return;
    els.commentsModal.hidden = true;
    if ((els.taskModal && els.taskModal.hidden) && (els.invoiceModal && els.invoiceModal.hidden) && (els.addModal && els.addModal.hidden)) {
      document.body.style.overflow = '';
    }
  }

  function closeAllModals() {
    closeTaskModal();
    closeInvoiceModal();
    closeCommentsModal();
    closeAddModal();
  }

  function renderBody() {
    var rows = DUMMY[state.tab] || [];
    var cols = TABS[state.tab].columns;
    if (!els.body) return;

    if (!rows.length) {
      els.body.innerHTML = '';
      if (els.empty) els.empty.hidden = false;
      return;
    }

    if (els.empty) els.empty.hidden = true;
    els.body.innerHTML = rows.map(function (row, i) {
      return '<tr>' + cols.map(function (col) {
        var cls = col.id === 'action' ? ' class="mts-td-action"' : '';
        return '<td' + cls + '>' + cellHtml(col, row, i) + '</td>';
      }).join('') + '</tr>';
    }).join('');
  }

  function sumKey() {
    return state.sumYear + '-' + pad(state.sumMonth);
  }

  function renderSummary() {
    var key = sumKey();
    var data = SUMMARY[key] || {
      employee: 'Kamal Kant Sharma', totalDay: 31, holidays: 0, workingDays: 31, leaveCount: 0,
      hourlyLeaves: 0, outDuty: 0, absent: 0, payableDays: 0, fullDay: 0, halfDay: 0,
      totalHours: '0:00', actualHours: '0:00', extraLoss: 0, incomplete: 0, lateComing: 0
    };
    if (els.sumMonthLabel) els.sumMonthLabel.textContent = key;
    if (els.sumYearLabel) els.sumYearLabel.textContent = String(state.sumYear);
    if (els.sumTitle) els.sumTitle.textContent = 'Summary for the month ' + MONTH_NAMES[state.sumMonth - 1] + ' ' + state.sumYear;
    var set = function (id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
    set('mtsSumEmployee', data.employee);
    set('mtsSumTotalDay', data.totalDay);
    set('mtsSumHolidays', data.holidays);
    set('mtsSumWorkingDays', data.workingDays);
    set('mtsSumLeaveCount', data.leaveCount);
    set('mtsSumHourlyLeaves', data.hourlyLeaves);
    set('mtsSumOutDuty', data.outDuty);
    set('mtsSumAbsent', data.absent);
    set('mtsSumPayableDays', data.payableDays);
    set('mtsSumFullDay', data.fullDay);
    set('mtsSumHalfDay', data.halfDay);
    set('mtsSumTotalHours', data.totalHours);
    set('mtsSumActualHours', data.actualHours);
    set('mtsSumExtraLoss', data.extraLoss);
    set('mtsSumIncomplete', data.incomplete);
    set('mtsSumLateComing', data.lateComing);
  }

  function renderSumMonthGrid() {
    if (!els.sumMonthGrid) return;
    els.sumMonthGrid.innerHTML = MONTH_SHORT.map(function (n, i) {
      var m = i + 1;
      return '<button type="button" data-sum-month="' + m + '" class="' + (m === state.sumMonth ? 'is-active' : '') + '">' + n + '</button>';
    }).join('');
  }

  function closeSumMonthPop() {
    if (els.sumMonthPop) els.sumMonthPop.hidden = true;
    if (els.sumMonthBtn) {
      els.sumMonthBtn.classList.remove('is-open');
      els.sumMonthBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function openSumMonthPop() {
    if (!els.sumMonthPop || !els.sumMonthBtn) return;
    renderSumMonthGrid();
    els.sumMonthPop.hidden = false;
    els.sumMonthBtn.classList.add('is-open');
    els.sumMonthBtn.setAttribute('aria-expanded', 'true');
  }

  function renderHead() {
    var cfg = TABS[state.tab];
    els.head.innerHTML = cfg.columns.map(function (col) {
      return '<th scope="col">' + (col.labelHtml || col.label) + '</th>';
    }).join('');
  }

  function setTab(tabId) {
    if (!TABS[tabId]) return;
    state.tab = tabId;
    closeRangePop();
    closeFormPops();
    els.tabs.forEach(function (tab) {
      var on = tab.getAttribute('data-tab') === tabId;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderHead();
    renderBody();
  }

  function openRangePop() {
    if (!state.calCursor) state.calCursor = state.rangeStart ? new Date(state.rangeStart) : new Date();
    renderRangeCals();
    placeRangePop();
  }

  function resetAddForm() {
    var t = new Date();
    state.formDate = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    state.formCalCursor = new Date(t.getFullYear(), t.getMonth(), 1);
    state.formHour = t.getHours();
    state.formMinute = t.getMinutes();
    syncFormDate();
    syncFormTime();
    if (els.client) els.client.selectedIndex = 0;
    if (els.branch) els.branch.value = 'TimeErp Demo';
    if (els.service) els.service.selectedIndex = 0;
    if (els.task) els.task.selectedIndex = 0;
    if (els.remark) els.remark.value = '';
    if (els.billable) els.billable.checked = true;
    if (els.specifyTime) els.specifyTime.checked = false;
    if (els.dateBtn) els.dateBtn.classList.remove('is-error');
  }

  function openAddModal() {
    closeRangePop();
    closeFormPops();
    resetAddForm();
    els.addModal.hidden = false;
  }

  function closeAddModal() {
    closeFormPops();
    els.addModal.hidden = true;
  }

  function submitTimesheet() {
    if (!state.formDate) {
      els.dateBtn.classList.add('is-error');
      toast('Select Date', 'Please select a date.');
      return;
    }
    if (!els.branch.value) {
      toast('Branch', 'Please select a branch.');
      return;
    }
    closeAddModal();
    toast('Timesheet created', 'Entry for ' + formatRangeDate(state.formDate) + ' at ' + formatTime(state.formHour, state.formMinute) + ' saved.');
  }

  function bindEvents() {
    els.tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        setTab(tab.getAttribute('data-tab'));
      });
    });

    if (els.body) {
      els.body.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-action]');
        if (!btn || !els.body.contains(btn)) return;
        var action = btn.getAttribute('data-action');
        if (action === 'open-task') openTaskModal(btn.getAttribute('data-task-id'));
        else if (action === 'accept') toast('Accepted', 'Modification suggestion accepted.');
        else if (action === 'reject') toast('Rejected', 'Modification suggestion rejected.');
      });
    }

    if (els.taskBody) {
      els.taskBody.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-action]');
        if (!btn) return;
        var action = btn.getAttribute('data-action');
        if (action === 'go-task-view') {
          window.location.href = 'task_view.html?id=' + encodeURIComponent(btn.getAttribute('data-task-id') || '');
        } else if (action === 'create-invoice') openInvoiceModal(btn.getAttribute('data-task-name'));
        else if (action === 'view-comments') openCommentsModal();
      });
    }
    if (els.taskClose) els.taskClose.addEventListener('click', closeTaskModal);
    if (els.taskModal) {
      els.taskModal.addEventListener('click', function (e) {
        if (e.target === els.taskModal) closeTaskModal();
      });
    }
    if (els.invoiceClose) els.invoiceClose.addEventListener('click', closeInvoiceModal);
    if (els.invoiceModal) {
      els.invoiceModal.addEventListener('click', function (e) {
        if (e.target === els.invoiceModal) closeInvoiceModal();
      });
    }
    if (els.invoiceForm) {
      els.invoiceForm.addEventListener('submit', function (e) {
        e.preventDefault();
        closeInvoiceModal();
        toast('Invoice added', 'Invoice created successfully.');
      });
    }
    if (els.commentsClose) els.commentsClose.addEventListener('click', closeCommentsModal);
    if (els.commentsModal) {
      els.commentsModal.addEventListener('click', function (e) {
        if (e.target === els.commentsModal) closeCommentsModal();
      });
    }

    if (els.addBtn) els.addBtn.addEventListener('click', openAddModal);
    if (els.addClose) els.addClose.addEventListener('click', closeAddModal);
    if (els.addModal) {
      els.addModal.addEventListener('click', function (e) {
        if (e.target === els.addModal) closeAddModal();
      });
    }
    if (els.addForm) {
      els.addForm.addEventListener('submit', function (e) {
        e.preventDefault();
        submitTimesheet();
      });
    }

    if (els.dateBtn) {
      els.dateBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !els.singleCal.hidden;
        closeFormPops();
        if (open) return;
        openSingleCal();
      });
    }

    if (els.timeBtn) {
      els.timeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !els.timePop.hidden;
        closeFormPops();
        if (open) return;
        openTimePop();
      });
    }

    if (els.singleCal) {
      els.singleCal.addEventListener('click', function (e) {
        e.stopPropagation();
        var nav = e.target.closest('[data-nav]');
        if (nav) {
          var cur = state.formCalCursor || new Date();
          var type = nav.getAttribute('data-nav');
          if (type === 'prev-month') cur.setMonth(cur.getMonth() - 1);
          if (type === 'next-month') cur.setMonth(cur.getMonth() + 1);
          if (type === 'prev-year') cur.setFullYear(cur.getFullYear() - 1);
          if (type === 'next-year') cur.setFullYear(cur.getFullYear() + 1);
          state.formCalCursor = new Date(cur.getFullYear(), cur.getMonth(), 1);
          renderSingleCal();
          placePop(els.singleCal, els.dateBtn);
          return;
        }
        var day = e.target.closest('.mts-single-cal__day');
        if (!day) return;
        state.formDate = new Date(+day.getAttribute('data-y'), +day.getAttribute('data-m'), +day.getAttribute('data-d'));
        state.formCalCursor = new Date(state.formDate.getFullYear(), state.formDate.getMonth(), 1);
        syncFormDate();
        renderSingleCal();
        closeSingleCal();
      });
    }

    if (els.singleCalToday) {
      els.singleCalToday.addEventListener('click', function (e) {
        e.stopPropagation();
        var t = new Date();
        state.formDate = new Date(t.getFullYear(), t.getMonth(), t.getDate());
        state.formCalCursor = new Date(t.getFullYear(), t.getMonth(), 1);
        syncFormDate();
        renderSingleCal();
        closeSingleCal();
      });
    }

    if (els.timePop) {
      els.timePop.addEventListener('click', function (e) { e.stopPropagation(); });
    }
    if (els.hourList) {
      els.hourList.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-hour]');
        if (!btn) return;
        state.draftHour = +btn.getAttribute('data-hour');
        renderTimeLists();
      });
    }
    if (els.minuteList) {
      els.minuteList.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-minute]');
        if (!btn) return;
        state.draftMinute = +btn.getAttribute('data-minute');
        renderTimeLists();
      });
    }
    if (els.timeNow) {
      els.timeNow.addEventListener('click', function () {
        var t = new Date();
        state.draftHour = t.getHours();
        state.draftMinute = t.getMinutes();
        renderTimeLists();
      });
    }
    if (els.timeOk) {
      els.timeOk.addEventListener('click', function () {
        state.formHour = state.draftHour;
        state.formMinute = state.draftMinute;
        syncFormTime();
        closeTimePop();
      });
    }

    if (els.rangeTrigger) {
      els.rangeTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        closeFormPops();
        var open = !els.rangePop.hidden;
        if (open) { closeRangePop(); return; }
        openRangePop();
      });
    }

    if (els.rangePop) {
      els.rangePop.addEventListener('click', function (e) {
        e.stopPropagation();
        var nav = e.target.closest('[data-nav]');
        if (nav) {
          var cur = state.calCursor || new Date();
          var type = nav.getAttribute('data-nav');
          if (type === 'prev-month') cur.setMonth(cur.getMonth() - 1);
          if (type === 'next-month') cur.setMonth(cur.getMonth() + 1);
          if (type === 'prev-year') cur.setFullYear(cur.getFullYear() - 1);
          if (type === 'next-year') cur.setFullYear(cur.getFullYear() + 1);
          state.calCursor = cur;
          renderRangeCals();
          placeRangePop();
          return;
        }
        var day = e.target.closest('.mts-cal__day');
        if (!day) return;
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
        syncRangeLabel();
        renderRangeCals();
        placeRangePop();
        if (state.rangeStart && state.rangeEnd) setTimeout(closeRangePop, 180);
      });
    }

    if (els.sumMonthBtn) {
      els.sumMonthBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = els.sumMonthPop && !els.sumMonthPop.hidden;
        closeSumMonthPop();
        closeRangePop();
        closeFormPops();
        if (!open) openSumMonthPop();
      });
    }
    if (els.sumMonthPop) {
      els.sumMonthPop.addEventListener('click', function (e) {
        e.stopPropagation();
        var yearBtn = e.target.closest('[data-sum-year]');
        if (yearBtn) {
          state.sumYear += parseInt(yearBtn.getAttribute('data-sum-year'), 10);
          if (els.sumYearLabel) els.sumYearLabel.textContent = String(state.sumYear);
          renderSumMonthGrid();
          return;
        }
        var monthBtn = e.target.closest('[data-sum-month]');
        if (!monthBtn) return;
        state.sumMonth = parseInt(monthBtn.getAttribute('data-sum-month'), 10);
        closeSumMonthPop();
        renderSummary();
      });
    }

    document.addEventListener('click', function () {
      closeRangePop();
      closeFormPops();
      closeSumMonthPop();
    });
    window.addEventListener('resize', function () {
      closeRangePop();
      closeFormPops();
      closeSumMonthPop();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (!els.singleCal.hidden || !els.timePop.hidden) { closeFormPops(); return; }
      if (!els.rangePop.hidden) { closeRangePop(); return; }
      if (els.commentsModal && !els.commentsModal.hidden) { closeCommentsModal(); return; }
      if (els.invoiceModal && !els.invoiceModal.hidden) { closeInvoiceModal(); return; }
      if (els.taskModal && !els.taskModal.hidden) { closeTaskModal(); return; }
      if (els.addModal && !els.addModal.hidden) closeAddModal();
    });
  }

  bindEvents();
  syncRangeLabel();
  renderSummary();
  setTab('approved');
})();
