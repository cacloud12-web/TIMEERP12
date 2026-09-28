/**
 * TIME ERP — Detailed Attendance (My Attendance)
 */
(function () {
  'use strict';

  var COLUMNS = [
    { id: 'date', label: 'Date', sortable: true },
    { id: 'shift', label: 'Shift' },
    { id: 'inTime', label: 'In Time' },
    { id: 'outTime', label: 'Out Time' },
    { id: 'checkIn', label: 'Check In' },
    { id: 'checkOut', label: 'Check Out' },
    { id: 'firstHalf', label: '1st Half' },
    { id: 'secondHalf', label: '2nd Half' },
    { id: 'lateIn', label: 'Late In' },
    { id: 'earlyOut', label: 'Early Out' },
    { id: 'workHours', label: 'Work Hours' },
    { id: 'lessWork', label: 'Less Work' },
    { id: 'extraWork', label: 'Extra Work' },
    { id: 'compOffHour', label: 'Comp Off Hour' },
    { id: 'compOff', label: 'Comp Off' },
    { id: 'remark', label: 'Remark' },
    { id: 'action', label: 'Action' }
  ];

  var SHIFT = 'Normal Routine-1';

  /* Sample rows matching CA Cloud Desk screenshots (Aug 2026, DD/MM/YYYY) */
  var ROWS = [
    { date: '14/08/2026', sortKey: '2026-08-14', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '--', checkOut: '--', firstHalf: 'A', secondHalf: 'A', lateIn: '--', earlyOut: '--', workHours: '--', lessWork: '--', extraWork: '--', compOffHour: '--', compOff: 'NO', remark: '--', grievance: true },
    { date: '13/08/2026', sortKey: '2026-08-13', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '09:59', checkOut: '18:32', firstHalf: 'P', secondHalf: 'P', lateIn: '--', earlyOut: '--', workHours: '08:33', lessWork: '--', extraWork: '00:03', compOffHour: '--', compOff: 'NO', remark: 'ok', grievance: false },
    { date: '12/08/2026', sortKey: '2026-08-12', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '09:55', checkOut: '18:28', firstHalf: 'P', secondHalf: 'P', lateIn: '--', earlyOut: '00:02', workHours: '08:33', lessWork: '--', extraWork: '00:03', compOffHour: '--', compOff: 'NO', remark: 'work from home', grievance: true },
    { date: '11/08/2026', sortKey: '2026-08-11', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '10:01', checkOut: '18:35', firstHalf: 'P', secondHalf: 'P', lateIn: '00:01', earlyOut: '--', workHours: '08:34', lessWork: '--', extraWork: '00:04', compOffHour: '--', compOff: 'NO', remark: '--', grievance: false },
    { date: '10/08/2026', sortKey: '2026-08-10', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '09:48', checkOut: '18:55', firstHalf: 'P', secondHalf: 'P', lateIn: '--', earlyOut: '--', workHours: '09:07', lessWork: '--', extraWork: '00:37', compOffHour: '--', compOff: 'NO', remark: 'ok', grievance: false },
    { date: '09/08/2026', sortKey: '2026-08-09', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '--', checkOut: '--', firstHalf: 'H', secondHalf: 'H', lateIn: '--', earlyOut: '--', workHours: '--', lessWork: '--', extraWork: '--', compOffHour: '--', compOff: 'NO', remark: 'SUNDAY', grievance: false },
    { date: '08/08/2026', sortKey: '2026-08-08', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '09:57', checkOut: '18:32', firstHalf: 'P', secondHalf: 'P', lateIn: '--', earlyOut: '--', workHours: '08:35', lessWork: '--', extraWork: '00:05', compOffHour: '--', compOff: 'NO', remark: '--', grievance: false },
    { date: '07/08/2026', sortKey: '2026-08-07', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '10:12', checkOut: '18:30', firstHalf: 'P', secondHalf: 'P', lateIn: '00:12', earlyOut: '--', workHours: '08:18', lessWork: '00:12', extraWork: '--', compOffHour: '--', compOff: 'NO', remark: '--', grievance: true },
    { date: '06/08/2026', sortKey: '2026-08-06', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '09:50', checkOut: '18:40', firstHalf: 'P', secondHalf: 'P', lateIn: '--', earlyOut: '--', workHours: '08:50', lessWork: '--', extraWork: '00:20', compOffHour: '--', compOff: 'NO', remark: 'ok', grievance: false },
    { date: '05/08/2026', sortKey: '2026-08-05', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '10:20', checkOut: '18:30', firstHalf: 'OD', secondHalf: 'OD', lateIn: '00:20', earlyOut: '--', workHours: '08:10', lessWork: '00:20', extraWork: '--', compOffHour: '--', compOff: 'NO', remark: 'client visit', grievance: true },
    { date: '04/08/2026', sortKey: '2026-08-04', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '--', checkOut: '--', firstHalf: 'CO', secondHalf: 'CO', lateIn: '--', earlyOut: '--', workHours: '--', lessWork: '--', extraWork: '--', compOffHour: '--', compOff: 'YES', remark: 'Comp Off', grievance: false },
    { date: '03/08/2026', sortKey: '2026-08-03', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '09:58', checkOut: '18:42', firstHalf: 'P', secondHalf: 'P', lateIn: '--', earlyOut: '--', workHours: '08:44', lessWork: '--', extraWork: '00:14', compOffHour: '--', compOff: 'NO', remark: 'ok', grievance: false },
    { date: '02/08/2026', sortKey: '2026-08-02', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '--', checkOut: '--', firstHalf: 'H', secondHalf: 'H', lateIn: '--', earlyOut: '--', workHours: '--', lessWork: '--', extraWork: '--', compOffHour: '--', compOff: 'NO', remark: 'SUNDAY', grievance: false },
    { date: '01/08/2026', sortKey: '2026-08-01', shift: SHIFT, inTime: '10:00', outTime: '18:30', checkIn: '10:05', checkOut: '19:00', firstHalf: 'P', secondHalf: 'P', lateIn: '00:05', earlyOut: '--', workHours: '08:55', lessWork: '--', extraWork: '00:30', compOffHour: '--', compOff: 'NO', remark: '--', grievance: false }
  ];

  var HISTORY_ROWS = [
    { id: 'TR-1024', date: '14/08/2026', detail: 'Late check-in correction for 07/08/2026', status: 'Pending', statusKey: 'pending' },
    { id: 'TR-1023', date: '12/08/2026', detail: 'Work from home request — client meeting', status: 'Approved', statusKey: 'approved' },
    { id: 'TR-1022', date: '10/08/2026', detail: 'Early checkout approval (medical)', status: 'Rejected', statusKey: 'rejected' },
    { id: 'TR-1021', date: '08/08/2026', detail: 'Comp off request for 09/08/2026', status: 'Approved', statusKey: 'approved' },
    { id: 'TR-1020', date: '05/08/2026', detail: 'On-duty visit — CA Cloud Desk client site', status: 'In Review', statusKey: 'review' }
  ];

  var state = {
    visible: COLUMNS.map(function (c) { return c.id; }),
    pageSize: 50,
    page: 1,
    sortDir: 'desc',
    checkedOut: true,
    filterStart: '',
    filterEnd: '',
    filterRangeStart: null,
    filterRangeEnd: null,
    filterCalCursor: new Date(2026, 7, 1),
    filterPickingEnd: false,
    dateRangeOpen: false
  };

  var histState = { page: 1, pageSize: 10 };

  var els = {
    head: document.getElementById('attTableHead'),
    body: document.getElementById('attTableBody'),
    pageSize: document.getElementById('attPageSize'),
    pageInput: document.getElementById('attPageInput'),
    pageTotal: document.getElementById('attPageTotal'),
    count: document.getElementById('attCount'),
    prev: document.getElementById('attPrev'),
    next: document.getElementById('attNext'),
    checkOutBtn: document.getElementById('attCheckOutBtn'),
    topCheckOutBtn: document.getElementById('attTopCheckOutBtn'),
    topClock: document.getElementById('attTopClock'),
    summaryBtn: document.getElementById('attSummaryBtn'),
    columnsBtn: document.getElementById('attColumnsBtn'),
    filterBtn: document.getElementById('attFilterBtn'),
    columnsPop: document.getElementById('attColumnsPop'),
    columnsList: document.getElementById('attColumnsList'),
    selectAll: document.getElementById('attSelectAllCols'),
    filterPop: document.getElementById('attFilterPop'),
    filterReset: document.getElementById('attFilterReset'),
    dateToggle: document.getElementById('attDateRangeToggle'),
    dateBody: document.getElementById('attDateRangeBody'),
    filterRangeBtn: document.getElementById('attFilterRangeBtn'),
    filterRangeLabel: document.getElementById('attFilterRangeLabel'),
    filterCal: document.getElementById('attFilterCal'),
    filterCalInner: document.getElementById('attFilterCalInner'),
    historyBody: document.getElementById('attHistoryBody'),
    historyEmpty: document.getElementById('attHistoryEmpty'),
    histPageSize: document.getElementById('attHistPageSize'),
    histPageInput: document.getElementById('attHistPageInput'),
    histPageTotal: document.getElementById('attHistPageTotal'),
    histCount: document.getElementById('attHistCount'),
    histPrev: document.getElementById('attHistPrev'),
    histNext: document.getElementById('attHistNext')
  };

  function toast(title, msg) {
    var stack = document.getElementById('toastStack');
    if (!stack) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + msg + '</span>';
    stack.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('is-in'); });
    setTimeout(function () {
      el.classList.remove('is-in');
      setTimeout(function () { el.remove(); }, 280);
    }, 2800);
  }

  function statusBadge(code) {
    var c = String(code || '').toUpperCase();
    var cls = 'att-badge--p';
    if (c === 'A') cls = 'att-badge--a';
    else if (c === 'H') cls = 'att-badge--h';
    else if (c === 'OD') cls = 'att-badge--od';
    else if (c === 'CO') cls = 'att-badge--co';
    return '<span class="att-badge ' + cls + '">' + c + '</span>';
  }

  function pad2(n) { return n < 10 ? '0' + n : String(n); }

  function tickClock() {
    if (!els.topClock) return;
    var now = new Date();
    var t = pad2(now.getHours()) + ':' + pad2(now.getMinutes());
    els.topClock.textContent = t;
    els.topClock.setAttribute('datetime', now.toISOString());
  }

  function closePops() {
    if (els.columnsPop) els.columnsPop.hidden = true;
    if (els.filterPop) els.filterPop.hidden = true;
    if (els.columnsBtn) els.columnsBtn.classList.remove('is-active');
    if (els.filterBtn) els.filterBtn.classList.remove('is-active');
    closeFilterCal();
  }

  function placePop(pop, btn) {
    if (!pop || !btn) return;
    pop.hidden = false;
    var r = btn.getBoundingClientRect();
    var w = pop.offsetWidth || 280;
    var left = Math.min(window.innerWidth - w - 12, Math.max(12, r.right - w));
    pop.style.left = left + 'px';
    pop.style.top = (r.bottom + 10) + 'px';
    var caret = pop.querySelector('.att-pop__caret');
    if (caret) {
      var caretLeft = r.left + r.width / 2 - left - 6;
      caret.style.left = Math.max(14, Math.min(w - 20, caretLeft)) + 'px';
      caret.style.right = 'auto';
    }
  }

  function toSortKey(d) {
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function syncFilterRangeLabel() {
    if (!els.filterRangeLabel) return;
    if (state.filterRangeStart && state.filterRangeEnd) {
      els.filterRangeLabel.className = 'att-filter-range__text has-value';
      els.filterRangeLabel.innerHTML = '<em>' + fmtDMY(state.filterRangeStart) + '</em><span aria-hidden="true">→</span><em>' + fmtDMY(state.filterRangeEnd) + '</em>';
    } else if (state.filterRangeStart) {
      els.filterRangeLabel.className = 'att-filter-range__text has-value';
      els.filterRangeLabel.innerHTML = '<em>' + fmtDMY(state.filterRangeStart) + '</em><span aria-hidden="true">→</span><em>End date</em>';
    } else {
      els.filterRangeLabel.className = 'att-filter-range__text';
      els.filterRangeLabel.innerHTML = '<em>Start date</em><span aria-hidden="true">→</span><em>End date</em>';
    }
  }

  function applyFilterRange() {
    state.filterStart = state.filterRangeStart ? toSortKey(state.filterRangeStart) : '';
    state.filterEnd = state.filterRangeEnd ? toSortKey(state.filterRangeEnd) : '';
    state.page = 1;
    render();
  }

  function closeFilterCal() {
    if (els.filterCal) els.filterCal.hidden = true;
    if (els.filterRangeBtn) {
      els.filterRangeBtn.classList.remove('is-open');
      els.filterRangeBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function renderFilterMonth(year, month, showLeftNav, showRightNav) {
    var first = new Date(year, month, 1);
    var startDay = first.getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var prevDays = new Date(year, month, 0).getDate();
    var label = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][month] + ' ' + year;
    var html = '<div class="att-range-cal__month"><div class="att-range-cal__head">';
    html += '<div class="att-range-cal__nav">';
    if (showLeftNav) html += '<button type="button" data-fcal-nav="year-1" aria-label="Previous year">&lt;&lt;</button><button type="button" data-fcal-nav="month-1" aria-label="Previous month">&lt;</button>';
    html += '</div><span>' + label + '</span><div class="att-range-cal__nav">';
    if (showRightNav) html += '<button type="button" data-fcal-nav="month1" aria-label="Next month">&gt;</button><button type="button" data-fcal-nav="year1" aria-label="Next year">&gt;&gt;</button>';
    html += '</div></div><div class="att-range-cal__grid">';
    ['Su','Mo','Tu','We','Th','Fr','Sa'].forEach(function (d) {
      html += '<div class="att-range-cal__dow">' + d + '</div>';
    });
    var cells = [];
    for (var i = 0; i < startDay; i++) cells.push({ d: prevDays - startDay + i + 1, m: month - 1, y: year, out: true });
    for (var day = 1; day <= daysInMonth; day++) cells.push({ d: day, m: month, y: year, out: false });
    var fill = 0;
    while (cells.length % 7 !== 0) { fill += 1; cells.push({ d: fill, m: month + 1, y: year, out: true }); }
    cells.forEach(function (c) {
      var y = c.y, m = c.m;
      if (m < 0) { m = 11; y -= 1; }
      if (m > 11) { m = 0; y += 1; }
      var date = new Date(y, m, c.d);
      var cls = 'att-range-cal__day';
      if (c.out) cls += ' is-out';
      var isStart = sameDay(date, state.filterRangeStart);
      var isEnd = sameDay(date, state.filterRangeEnd);
      if (isStart || isEnd) cls += ' is-edge' + (state.filterRangeStart && state.filterRangeEnd ? ' is-fill' : '');
      else if (inRange(date, state.filterRangeStart, state.filterRangeEnd)) cls += ' is-in-range';
      html += '<button type="button" class="' + cls + '" data-y="' + y + '" data-m="' + m + '" data-d="' + c.d + '">' + c.d + '</button>';
    });
    html += '</div></div>';
    return html;
  }

  function renderFilterCal() {
    if (!els.filterCalInner) return;
    var y = state.filterCalCursor.getFullYear();
    var m = state.filterCalCursor.getMonth();
    var next = new Date(y, m + 1, 1);
    els.filterCalInner.innerHTML = renderFilterMonth(y, m, true, false) + renderFilterMonth(next.getFullYear(), next.getMonth(), false, true);
  }

  function openFilterCal() {
    if (!els.filterCal || !els.filterRangeBtn) return;
    renderFilterCal();
    els.filterCal.hidden = false;
    els.filterRangeBtn.classList.add('is-open');
    els.filterRangeBtn.setAttribute('aria-expanded', 'true');
    var r = els.filterRangeBtn.getBoundingClientRect();
    var w = els.filterCal.offsetWidth || 520;
    var left = Math.min(window.innerWidth - w - 12, Math.max(12, r.left));
    var top = r.bottom + 8;
    if (top + 320 > window.innerHeight) top = Math.max(12, r.top - 320);
    els.filterCal.style.left = left + 'px';
    els.filterCal.style.top = top + 'px';
  }

  function filteredRows() {
    var list = ROWS.slice();
    if (state.filterStart) {
      list = list.filter(function (r) { return r.sortKey >= state.filterStart; });
    }
    if (state.filterEnd) {
      list = list.filter(function (r) { return r.sortKey <= state.filterEnd; });
    }
    list.sort(function (a, b) {
      if (a.sortKey === b.sortKey) return 0;
      if (state.sortDir === 'asc') return a.sortKey < b.sortKey ? -1 : 1;
      return a.sortKey > b.sortKey ? -1 : 1;
    });
    return list;
  }

  function isVisible(id) {
    return state.visible.indexOf(id) !== -1;
  }

  function renderHead() {
    var sortClass = state.sortDir === 'asc' ? ' is-asc' : ' is-desc';
    els.head.innerHTML = COLUMNS.map(function (col) {
      var hidden = isVisible(col.id) ? '' : ' hidden';
      if (col.sortable) {
        return '<th scope="col" data-col="' + col.id + '"' + hidden + '>' +
          '<button type="button" class="att-th-sort' + sortClass + '" id="attSortDate" aria-label="Sort by date">' +
          col.label +
          '<span class="att-th-sort__icons" aria-hidden="true">' +
          '<svg viewBox="0 0 8 8"><path fill="currentColor" d="M4 1L7 5H1z"/></svg>' +
          '<svg viewBox="0 0 8 8"><path fill="currentColor" d="M4 7L1 3h6z"/></svg>' +
          '</span></button></th>';
      }
      return '<th scope="col" data-col="' + col.id + '"' + hidden + '>' + col.label + '</th>';
    }).join('');

    var sortBtn = document.getElementById('attSortDate');
    if (sortBtn) {
      sortBtn.addEventListener('click', function () {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
        render();
      });
    }
  }

  function cellHtml(col, row) {
    if (col.id === 'firstHalf' || col.id === 'secondHalf') return statusBadge(row[col.id]);
    if (col.id === 'action') {
      if (row.grievance) {
        return '<button type="button" class="att-action-link" data-grievance="' + row.date + '">Raise Grievance</button>';
      }
      return '<button type="button" class="att-action-link is-disabled" disabled>Raise Grievance</button>';
    }
    var val = row[col.id];
    if (val === '--' || val === '' || val == null) return '<span class="att-muted">--</span>';
    return String(val);
  }

  function renderBody(rows) {
    var start = (state.page - 1) * state.pageSize;
    var pageRows = rows.slice(start, start + state.pageSize);
    els.body.innerHTML = pageRows.map(function (row) {
      return '<tr>' + COLUMNS.map(function (col) {
        var hidden = isVisible(col.id) ? '' : ' hidden';
        return '<td data-col="' + col.id + '"' + hidden + '>' + cellHtml(col, row) + '</td>';
      }).join('') + '</tr>';
    }).join('');

    els.body.querySelectorAll('[data-grievance]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openGrievanceModal(btn.getAttribute('data-grievance'));
      });
    });
  }

  function openGrievanceModal(date) {
    var modal = document.getElementById('attGrModal');
    var form = document.getElementById('attGrForm');
    var status = document.getElementById('attGrStatus');
    var remarkType = document.getElementById('attGrRemarkType');
    var remarkWrap = document.getElementById('attGrRemarkWrap');
    var remark = document.getElementById('attGrRemark');
    var dateInput = document.getElementById('attGrDate');
    if (!modal || !form) return;
    form.reset();
    if (dateInput) dateInput.value = date || '';
    if (status) {
      status.value = '';
      status.selectedIndex = 0;
    }
    if (remarkType) remarkType.value = 'Technical Glitch';
    if (remark) remark.value = '';
    if (remarkWrap) remarkWrap.hidden = true;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    if (status) setTimeout(function () { status.focus(); }, 0);
  }

  function closeGrievanceModal() {
    var modal = document.getElementById('attGrModal');
    if (modal) modal.hidden = true;
    document.body.style.overflow = '';
  }

  function syncRemarkField() {
    var remarkType = document.getElementById('attGrRemarkType');
    var remarkWrap = document.getElementById('attGrRemarkWrap');
    if (!remarkType || !remarkWrap) return;
    remarkWrap.hidden = remarkType.value !== 'Other';
  }

  function bindGrievanceModal() {
    var modal = document.getElementById('attGrModal');
    var form = document.getElementById('attGrForm');
    var remarkType = document.getElementById('attGrRemarkType');
    if (!modal || !form) return;

    modal.querySelectorAll('[data-att-gr-close]').forEach(function (el) {
      el.addEventListener('click', closeGrievanceModal);
    });
    if (remarkType) remarkType.addEventListener('change', syncRemarkField);

    form.addEventListener('submit', function () {
      var status = document.getElementById('attGrStatus');
      var type = document.getElementById('attGrRemarkType');
      var remark = document.getElementById('attGrRemark');
      var date = (document.getElementById('attGrDate') || {}).value || '';
      if (!status || !status.value) {
        toast('Required', 'Please select status.');
        if (status) status.focus();
        return;
      }
      if (type && type.value === 'Other' && remark && !remark.value.trim()) {
        toast('Required', 'Please enter a remark.');
        remark.focus();
        return;
      }
      toast('Grievance submitted', (date ? date + ' · ' : '') + status.value + (type ? ' · ' + type.value : ''));
      closeGrievanceModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && !modal.hidden) closeGrievanceModal();
    });
  }

  /* -------- Attendance Summary view -------- */
  var sumState = {
    open: false,
    year: 2026,
    month: 8,
    rangeStart: new Date(2026, 7, 1),
    rangeEnd: new Date(2026, 7, 17),
    calCursor: new Date(2026, 7, 1),
    pickingEnd: false
  };

  function pad2(n) { return String(n).padStart(2, '0'); }

  function fmtDMY(d) {
    return pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1) + '/' + d.getFullYear();
  }

  function monthName(m) {
    return ['January','February','March','April','May','June','July','August','September','October','November','December'][m - 1];
  }

  function syncSumLabels() {
    var rangeLabel = document.getElementById('attSumRangeLabel');
    if (rangeLabel && sumState.rangeStart && sumState.rangeEnd) {
      rangeLabel.textContent = fmtDMY(sumState.rangeStart) + ' → ' + fmtDMY(sumState.rangeEnd);
    }
    var monthLabel = document.getElementById('attSumMonthLabel');
    if (monthLabel) monthLabel.textContent = sumState.year + '-' + pad2(sumState.month);
    var title = document.getElementById('attSumMonthTitle');
    if (title) title.textContent = 'Summary for the month ' + monthName(sumState.month) + ' ' + sumState.year;
    var yearLabel = document.getElementById('attSumYearLabel');
    if (yearLabel) yearLabel.textContent = String(sumState.year);
  }

  function toggleSummaryView(force) {
    var page = document.getElementById('attPage');
    var detailed = document.getElementById('attDetailedView');
    var summary = document.getElementById('attSummaryView');
    if (!detailed || !summary) return;
    sumState.open = force != null ? !!force : !sumState.open;
    detailed.hidden = sumState.open;
    summary.hidden = !sumState.open;
    if (page) page.classList.toggle('is-summary', sumState.open);
    if (els.summaryBtn) els.summaryBtn.textContent = sumState.open ? 'Detailed Attendance' : 'Attendance Summary';
    if (sumState.open) {
      syncSumLabels();
      renderSumMonthGrid();
      closePops();
    } else {
      closeSumPops();
    }
  }

  function closeSumPops() {
    var rangePop = document.getElementById('attSumRangePop');
    var monthPop = document.getElementById('attSumMonthPop');
    var rangeBtn = document.getElementById('attSumRangeBtn');
    var monthBtn = document.getElementById('attSumMonthBtn');
    if (rangePop) rangePop.hidden = true;
    if (monthPop) monthPop.hidden = true;
    if (rangeBtn) { rangeBtn.classList.remove('is-open'); rangeBtn.setAttribute('aria-expanded', 'false'); }
    if (monthBtn) { monthBtn.classList.remove('is-open'); monthBtn.setAttribute('aria-expanded', 'false'); }
    document.querySelectorAll('[data-sum-menu-panel]').forEach(function (p) { p.hidden = true; });
  }

  function renderSumMonthGrid() {
    var grid = document.getElementById('attSumMonthGrid');
    if (!grid) return;
    var names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    grid.innerHTML = names.map(function (n, i) {
      var m = i + 1;
      return '<button type="button" data-sum-month="' + m + '" class="' + (m === sumState.month ? 'is-active' : '') + '">' + n + '</button>';
    }).join('');
  }

  function sameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function inRange(d, start, end) {
    if (!start || !end) return false;
    var t = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    var a = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    var b = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    return t >= Math.min(a, b) && t <= Math.max(a, b);
  }

  function renderSumCal(year, month) {
    var first = new Date(year, month, 1);
    var startDay = first.getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var prevDays = new Date(year, month, 0).getDate();
    var html = '<div class="att-sum-cal"><div class="att-sum-cal__head"><div class="att-sum-cal__nav">';
    if (month === sumState.calCursor.getMonth() && year === sumState.calCursor.getFullYear()) {
      html += '<button type="button" data-sum-cal-nav="year-1">&lt;&lt;</button><button type="button" data-sum-cal-nav="month-1">&lt;</button>';
    } else html += '<span></span><span></span>';
    html += '</div><span>' + ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][month] + ' ' + year + '</span><div class="att-sum-cal__nav">';
    if (month === (sumState.calCursor.getMonth() + 1) % 12 || (sumState.calCursor.getMonth() === 11 && month === 0 && year === sumState.calCursor.getFullYear() + 1)) {
      html += '<button type="button" data-sum-cal-nav="month1">&gt;</button><button type="button" data-sum-cal-nav="year1">&gt;&gt;</button>';
    } else html += '<span></span><span></span>';
    html += '</div></div><div class="att-sum-cal__grid">';
    ['Su','Mo','Tu','We','Th','Fr','Sa'].forEach(function (d) { html += '<div class="att-sum-cal__dow">' + d + '</div>'; });
    var cells = [];
    for (var i = 0; i < startDay; i++) {
      var pd = prevDays - startDay + i + 1;
      cells.push({ d: pd, m: month - 1, y: year, out: true });
    }
    for (var day = 1; day <= daysInMonth; day++) cells.push({ d: day, m: month, y: year, out: false });
    while (cells.length % 7 !== 0) {
      var nd = cells.length - (startDay + daysInMonth) + 1;
      cells.push({ d: nd, m: month + 1, y: year, out: true });
    }
    cells.forEach(function (c) {
      var y = c.y, m = c.m;
      if (m < 0) { m = 11; y -= 1; }
      if (m > 11) { m = 0; y += 1; }
      var date = new Date(y, m, c.d);
      var cls = 'att-sum-cal__day';
      if (c.out) cls += ' is-out';
      if (sameDay(date, sumState.rangeStart) || sameDay(date, sumState.rangeEnd)) cls += ' is-edge';
      else if (inRange(date, sumState.rangeStart, sumState.rangeEnd)) cls += ' is-in-range';
      html += '<button type="button" class="' + cls + '" data-y="' + y + '" data-m="' + m + '" data-d="' + c.d + '">' + c.d + '</button>';
    });
    html += '</div></div>';
    return html;
  }

  function renderSumRangeCals() {
    var wrap = document.getElementById('attSumRangeCals');
    if (!wrap) return;
    var y = sumState.calCursor.getFullYear();
    var m = sumState.calCursor.getMonth();
    var next = new Date(y, m + 1, 1);
    wrap.innerHTML = renderSumCal(y, m) + renderSumCal(next.getFullYear(), next.getMonth());
  }

  function bindSummaryView() {
    var rangeBtn = document.getElementById('attSumRangeBtn');
    var rangePop = document.getElementById('attSumRangePop');
    var monthBtn = document.getElementById('attSumMonthBtn');
    var monthPop = document.getElementById('attSumMonthPop');

    if (rangeBtn && rangePop) {
      rangeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !rangePop.hidden;
        closeSumPops();
        if (open) return;
        renderSumRangeCals();
        rangePop.hidden = false;
        rangeBtn.classList.add('is-open');
        rangeBtn.setAttribute('aria-expanded', 'true');
      });
      rangePop.addEventListener('click', function (e) {
        e.stopPropagation();
        var nav = e.target.closest('[data-sum-cal-nav]');
        if (nav) {
          var act = nav.getAttribute('data-sum-cal-nav');
          if (act === 'month-1') sumState.calCursor = new Date(sumState.calCursor.getFullYear(), sumState.calCursor.getMonth() - 1, 1);
          if (act === 'month1') sumState.calCursor = new Date(sumState.calCursor.getFullYear(), sumState.calCursor.getMonth() + 1, 1);
          if (act === 'year-1') sumState.calCursor = new Date(sumState.calCursor.getFullYear() - 1, sumState.calCursor.getMonth(), 1);
          if (act === 'year1') sumState.calCursor = new Date(sumState.calCursor.getFullYear() + 1, sumState.calCursor.getMonth(), 1);
          renderSumRangeCals();
          return;
        }
        var day = e.target.closest('.att-sum-cal__day');
        if (!day) return;
        var picked = new Date(+day.getAttribute('data-y'), +day.getAttribute('data-m'), +day.getAttribute('data-d'));
        if (!sumState.rangeStart || (sumState.rangeStart && sumState.rangeEnd)) {
          sumState.rangeStart = picked;
          sumState.rangeEnd = null;
          sumState.pickingEnd = true;
        } else {
          if (picked < sumState.rangeStart) {
            sumState.rangeEnd = sumState.rangeStart;
            sumState.rangeStart = picked;
          } else sumState.rangeEnd = picked;
          sumState.pickingEnd = false;
        }
        syncSumLabels();
        renderSumRangeCals();
        if (sumState.rangeStart && sumState.rangeEnd) {
          setTimeout(function () { closeSumPops(); }, 160);
        }
      });
    }

    if (monthBtn && monthPop) {
      monthBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !monthPop.hidden;
        closeSumPops();
        if (open) return;
        renderSumMonthGrid();
        syncSumLabels();
        monthPop.hidden = false;
        monthBtn.classList.add('is-open');
        monthBtn.setAttribute('aria-expanded', 'true');
      });
      monthPop.addEventListener('click', function (e) {
        e.stopPropagation();
        var yBtn = e.target.closest('[data-sum-year]');
        if (yBtn) {
          sumState.year += Number(yBtn.getAttribute('data-sum-year'));
          syncSumLabels();
          renderSumMonthGrid();
          return;
        }
        var mBtn = e.target.closest('[data-sum-month]');
        if (mBtn) {
          sumState.month = Number(mBtn.getAttribute('data-sum-month'));
          syncSumLabels();
          closeSumPops();
        }
      });
    }

    document.querySelectorAll('[data-sum-menu]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = btn.getAttribute('data-sum-menu');
        var panel = document.querySelector('[data-sum-menu-panel="' + id + '"]');
        var wasOpen = panel && !panel.hidden;
        document.querySelectorAll('[data-sum-menu-panel]').forEach(function (p) { p.hidden = true; });
        if (panel && !wasOpen) panel.hidden = false;
      });
    });
    document.querySelectorAll('[data-sum-dl]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        toast('Download', btn.getAttribute('data-sum-dl').toUpperCase() + ' export started');
        closeSumPops();
      });
    });

    document.addEventListener('click', function () { closeSumPops(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSumPops();
    });
  }

  function historyStatusHtml(row) {
    return '<span class="att-req-status att-req-status--' + row.statusKey + '">' + row.status + '</span>';
  }

  function renderHistory() {
    if (!els.historyBody) return;
    var total = HISTORY_ROWS.length;
    var pages = Math.max(1, Math.ceil(total / histState.pageSize) || 1);
    if (histState.page > pages) histState.page = pages;
    var start = (histState.page - 1) * histState.pageSize;
    var pageRows = HISTORY_ROWS.slice(start, start + histState.pageSize);
    els.historyBody.innerHTML = pageRows.map(function (row) {
      return '<tr>' +
        '<td>' + row.id + '</td>' +
        '<td>' + row.date + '</td>' +
        '<td>' + row.detail + '</td>' +
        '<td>' + historyStatusHtml(row) + '</td>' +
        '<td><button type="button" class="att-action-link" data-hist-view="' + row.id + '">View</button></td>' +
      '</tr>';
    }).join('');
    if (els.historyEmpty) els.historyEmpty.hidden = total > 0;
    if (els.histPageInput) els.histPageInput.value = String(histState.page);
    if (els.histPageTotal) els.histPageTotal.textContent = String(pages);
    if (els.histCount) els.histCount.textContent = total + ' / ' + total;
    if (els.histPrev) els.histPrev.disabled = histState.page <= 1;
    if (els.histNext) els.histNext.disabled = histState.page >= pages;
    els.historyBody.querySelectorAll('[data-hist-view]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        toast('Request', 'Opening ' + btn.getAttribute('data-hist-view') + ' details.');
      });
    });
  }

  function renderPagination(total) {
    var pages = Math.max(1, Math.ceil(total / state.pageSize) || 1);
    if (state.page > pages) state.page = pages;
    var shown = Math.min(total, state.page * state.pageSize);
    var endShown = total === 0 ? 0 : Math.min(total, shown);
    if (els.pageInput) els.pageInput.value = String(state.page);
    if (els.pageTotal) els.pageTotal.textContent = String(pages);
    els.count.textContent = (total === 0 ? '0' : endShown) + ' / ' + total;
    if (total > 0 && state.page === 1 && endShown === total) els.count.textContent = total + ' / ' + total;
    els.prev.disabled = state.page <= 1;
    els.next.disabled = state.page >= pages;
  }

  function renderColumnsPop() {
    els.columnsList.innerHTML = COLUMNS.map(function (col) {
      var checked = isVisible(col.id) ? ' checked' : '';
      return '<li class="att-pop__item" data-col-id="' + col.id + '">' +
        '<span class="att-pop__drag" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></span>' +
        '<span class="att-pop__check">' +
          '<input type="checkbox" id="att-col-' + col.id + '" data-col="' + col.id + '"' + checked + '>' +
          '<span class="att-pop__check-ui" aria-hidden="true"></span>' +
        '</span>' +
        '<label for="att-col-' + col.id + '">' + col.label + '</label></li>';
    }).join('');
  }

  function applyColumnVisibility() {
    COLUMNS.forEach(function (col) {
      var show = isVisible(col.id);
      document.querySelectorAll('[data-col="' + col.id + '"]').forEach(function (el) {
        if (el.tagName === 'INPUT') return;
        if (show) el.removeAttribute('hidden');
        else el.setAttribute('hidden', '');
      });
    });
  }

  function render() {
    var rows = filteredRows();
    renderHead();
    renderBody(rows);
    renderPagination(rows.length);
  }

  function updateCheckOutBtn() {
    var label = state.checkedOut ? 'Check Out' : 'Check In';
    var addIn = !state.checkedOut;
    [els.checkOutBtn, els.topCheckOutBtn].forEach(function (btn) {
      if (!btn) return;
      btn.textContent = label;
      btn.classList.toggle('is-in', addIn);
    });
  }

  function toggleCheckOut() {
        if (state.checkedOut) {
          state.checkedOut = false;
          toast('Checked out', 'You have checked out successfully.');
        } else {
          state.checkedOut = true;
          toast('Checked in', 'You have checked in successfully.');
        }
        updateCheckOutBtn();
    }

  function bind() {
    if (els.checkOutBtn) els.checkOutBtn.addEventListener('click', toggleCheckOut);
    if (els.topCheckOutBtn) els.topCheckOutBtn.addEventListener('click', toggleCheckOut);

    if (els.summaryBtn) {
      els.summaryBtn.addEventListener('click', function () {
        toggleSummaryView();
      });
    }

    if (els.columnsBtn) {
      els.columnsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !els.columnsPop.hidden && els.columnsBtn.classList.contains('is-active');
        closePops();
        if (open) return;
        renderColumnsPop();
        els.columnsBtn.classList.add('is-active');
        placePop(els.columnsPop, els.columnsBtn);
      });
    }

    if (els.filterBtn) {
      els.filterBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !els.filterPop.hidden && els.filterBtn.classList.contains('is-active');
        closePops();
        if (open) return;
        els.filterBtn.classList.add('is-active');
        placePop(els.filterPop, els.filterBtn);
      });
    }

    if (els.selectAll) {
      els.selectAll.addEventListener('click', function () {
        state.visible = COLUMNS.map(function (c) { return c.id; });
        renderColumnsPop();
        applyColumnVisibility();
        render();
      });
    }

    if (els.columnsList) {
      els.columnsList.addEventListener('change', function (e) {
        var input = e.target;
        if (!input || !input.matches('input[data-col]')) return;
        var id = input.getAttribute('data-col');
        if (input.checked) {
          if (state.visible.indexOf(id) === -1) state.visible.push(id);
        } else {
          state.visible = state.visible.filter(function (v) { return v !== id; });
          if (!state.visible.length) {
            state.visible = [id];
            input.checked = true;
            toast('Columns', 'At least one column must remain visible.');
          }
        }
        applyColumnVisibility();
      });
    }

    if (els.dateToggle) {
      els.dateToggle.addEventListener('click', function () {
        state.dateRangeOpen = !state.dateRangeOpen;
        els.dateToggle.classList.toggle('is-open', state.dateRangeOpen);
        els.dateToggle.setAttribute('aria-expanded', state.dateRangeOpen ? 'true' : 'false');
        if (els.dateBody) els.dateBody.hidden = !state.dateRangeOpen;
        if (!state.dateRangeOpen) closeFilterCal();
      });
    }

    if (els.filterRangeBtn) {
      els.filterRangeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = els.filterCal && !els.filterCal.hidden;
        if (open) closeFilterCal();
        else openFilterCal();
      });
    }

    if (els.filterCal) {
      els.filterCal.addEventListener('click', function (e) {
        e.stopPropagation();
        var nav = e.target.closest('[data-fcal-nav]');
        if (nav) {
          var act = nav.getAttribute('data-fcal-nav');
          var c = state.filterCalCursor;
          if (act === 'month-1') state.filterCalCursor = new Date(c.getFullYear(), c.getMonth() - 1, 1);
          if (act === 'month1') state.filterCalCursor = new Date(c.getFullYear(), c.getMonth() + 1, 1);
          if (act === 'year-1') state.filterCalCursor = new Date(c.getFullYear() - 1, c.getMonth(), 1);
          if (act === 'year1') state.filterCalCursor = new Date(c.getFullYear() + 1, c.getMonth(), 1);
          renderFilterCal();
          return;
        }
        var day = e.target.closest('.att-range-cal__day');
        if (!day) return;
        var picked = new Date(+day.getAttribute('data-y'), +day.getAttribute('data-m'), +day.getAttribute('data-d'));
        if (!state.filterRangeStart || (state.filterRangeStart && state.filterRangeEnd)) {
          state.filterRangeStart = picked;
          state.filterRangeEnd = null;
          state.filterPickingEnd = true;
        } else {
          if (picked < state.filterRangeStart) {
            state.filterRangeEnd = state.filterRangeStart;
            state.filterRangeStart = picked;
          } else state.filterRangeEnd = picked;
          state.filterPickingEnd = false;
        }
        syncFilterRangeLabel();
        renderFilterCal();
        if (state.filterRangeStart && state.filterRangeEnd) {
          applyFilterRange();
          setTimeout(closeFilterCal, 140);
        }
      });
    }

    if (els.filterReset) {
      els.filterReset.addEventListener('click', function () {
        state.filterStart = '';
        state.filterEnd = '';
        state.filterRangeStart = null;
        state.filterRangeEnd = null;
        syncFilterRangeLabel();
        closeFilterCal();
        state.page = 1;
        render();
        toast('Filter reset', 'Date range cleared.');
      });
    }

    if (els.pageSize) {
      els.pageSize.addEventListener('change', function () {
        state.pageSize = parseInt(els.pageSize.value, 10) || 50;
        state.page = 1;
        render();
      });
    }

    if (els.prev) {
      els.prev.addEventListener('click', function () {
        if (state.page <= 1) return;
        state.page -= 1;
        render();
      });
    }
    if (els.next) {
      els.next.addEventListener('click', function () {
        var total = filteredRows().length;
        var pages = Math.max(1, Math.ceil(total / state.pageSize) || 1);
        if (state.page >= pages) return;
        state.page += 1;
        render();
      });
    }

    if (els.histPageSize) {
      els.histPageSize.addEventListener('change', function () {
        histState.pageSize = parseInt(els.histPageSize.value, 10) || 10;
        histState.page = 1;
        renderHistory();
      });
    }
    if (els.histPrev) {
      els.histPrev.addEventListener('click', function () {
        if (histState.page <= 1) return;
        histState.page -= 1;
        renderHistory();
      });
    }
    if (els.histNext) {
      els.histNext.addEventListener('click', function () {
        var pages = Math.max(1, Math.ceil(HISTORY_ROWS.length / histState.pageSize) || 1);
        if (histState.page >= pages) return;
        histState.page += 1;
        renderHistory();
      });
    }

    document.addEventListener('click', function (e) {
      if (!els.columnsPop || !els.filterPop) return;
      var inCols = els.columnsPop.contains(e.target) || (els.columnsBtn && els.columnsBtn.contains(e.target));
      var inFilter = els.filterPop.contains(e.target) || (els.filterBtn && els.filterBtn.contains(e.target));
      var inCal = els.filterCal && els.filterCal.contains(e.target);
      if (!inCols && !inFilter && !inCal) closePops();
    });

    window.addEventListener('resize', closePops);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePops();
    });

    if (els.columnsPop) els.columnsPop.addEventListener('click', function (e) { e.stopPropagation(); });
    if (els.filterPop) els.filterPop.addEventListener('click', function (e) { e.stopPropagation(); });
  }

  function init() {
    updateCheckOutBtn();
    tickClock();
    setInterval(tickClock, 1000);
    bind();
    bindGrievanceModal();
    bindSummaryView();
    render();
    renderHistory();
    if (/[?&]summary=1(?:&|$)/.test(location.search) || location.hash === '#summary') toggleSummaryView(true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
