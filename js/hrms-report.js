/**
 * Manager Reports — HRMS Reports card destination
 */
(function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var STATUS_TYPES = {
    'Task Status': true,
    'Yearly Status': true,
    'Task Employee Status': true,
    'Employee Wise report': true
  };

  var clock = document.getElementById('dvTopClock');
  function tick() {
    if (!clock) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    clock.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    clock.setAttribute('datetime', d.toISOString());
  }
  tick();
  setInterval(tick, 1000);

  /* ── Tab pills ── */
  var pills = document.querySelectorAll('.mr-pill');
  var panels = document.querySelectorAll('.mr-panel');
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      var tab = pill.getAttribute('data-tab');
      if (!tab) return;
      pills.forEach(function (p) { p.classList.toggle('is-active', p === pill); });
      panels.forEach(function (panel) {
        var on = panel.getAttribute('data-panel') === tab;
        panel.classList.toggle('is-active', on);
        panel.hidden = !on;
      });
    });
  });

  /* ── Collapse ── */
  var filterCard = document.getElementById('trFilterCard');
  var collapseBtn = document.getElementById('trCollapseBtn');
  if (collapseBtn && filterCard) {
    collapseBtn.addEventListener('click', function () {
      var collapsed = filterCard.classList.toggle('is-collapsed');
      collapseBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      var label = collapseBtn.childNodes[collapseBtn.childNodes.length - 1];
      if (label && label.nodeType === 3) label.textContent = collapsed ? ' Expand' : ' Collapse';
    });
  }

  /* ── Report type & results ── */
  var reportType = document.getElementById('trReportType');
  var simpleStat = document.getElementById('mrSimpleStat');
  var statusView = document.getElementById('mrStatusView');
  var totalCreated = document.getElementById('mrTotalCreated');
  var generateBtn = document.getElementById('trGenerateBtn');
  var result = document.getElementById('trResult');

  function isStatusView() {
    return reportType && STATUS_TYPES[reportType.value];
  }

  function updateResultView() {
    if (!simpleStat || !statusView) return;
    var status = isStatusView();
    simpleStat.hidden = status;
    statusView.hidden = !status;
  }

  if (reportType) {
    reportType.addEventListener('change', updateResultView);
  }
  updateResultView();

  if (generateBtn && result) {
    generateBtn.addEventListener('click', function () {
      result.classList.add('is-visible');
      updateResultView();
      if (totalCreated) totalCreated.textContent = '0';
      result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  var excelBtn = document.getElementById('trExcelBtn');
  if (excelBtn) {
    excelBtn.addEventListener('click', function () {
      var rows = [['Task Status', 'Count']];
      document.querySelectorAll('#trStatusTable tbody tr').forEach(function (tr) {
        var cells = tr.querySelectorAll('td');
        if (cells.length >= 2) rows.push([cells[0].textContent.trim(), cells[1].textContent.trim()]);
      });
      var csv = rows.map(function (r) {
        return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
      }).join('\n');
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'task-status-report.csv';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  /* ── Comboboxes ── */
  function closeAllCombos(except) {
    document.querySelectorAll('.tr-combo').forEach(function (wrap) {
      if (except && wrap === except) return;
      wrap.classList.remove('is-open');
      var list = wrap.querySelector('.tr-combo__list');
      if (list) list.hidden = true;
    });
  }

  document.querySelectorAll('.tr-combo').forEach(function (wrap) {
    var inp = wrap.querySelector('.tr-combo__input');
    var list = wrap.querySelector('.tr-combo__list');
    if (!inp || !list) return;
    var items = Array.prototype.slice.call(list.querySelectorAll('li'));

    function open() {
      closeAllCombos(wrap);
      closeDatepicker();
      wrap.classList.add('is-open');
      list.hidden = false;
    }
    function close() {
      wrap.classList.remove('is-open');
      list.hidden = true;
    }
    function filter() {
      var q = (inp.value || '').toLowerCase().trim();
      items.forEach(function (li) {
        var text = (li.getAttribute('data-value') || li.textContent || '').toLowerCase();
        li.classList.toggle('is-hidden', q && text.indexOf(q) === -1);
      });
    }

    inp.addEventListener('focus', open);
    inp.addEventListener('click', open);
    inp.addEventListener('input', function () { open(); filter(); });
    items.forEach(function (li) {
      li.addEventListener('mousedown', function (e) {
        e.preventDefault();
        inp.value = li.getAttribute('data-value') || li.textContent.trim();
        close();
        items.forEach(function (x) { x.classList.remove('is-hidden'); });
      });
    });
  });

  /* ── Date picker ── */
  var dateWrap = document.getElementById('trDateWrap');
  var dateInput = document.getElementById('trDate');
  var picker = document.getElementById('trDatepicker');
  var calGrid = document.getElementById('trCalGrid');
  var calLabel = document.getElementById('trCalLabel');
  var view = { y: 2026, m: 7 };
  var selected = { y: 2026, m: 7, d: 29 };

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function formatDate(y, m, d) { return pad(d) + '-' + pad(m + 1) + '-' + y; }
  function parseDate(str) {
    var p = String(str || '').split('-');
    if (p.length !== 3) return null;
    var d = parseInt(p[0], 10), m = parseInt(p[1], 10) - 1, y = parseInt(p[2], 10);
    if (isNaN(d) || isNaN(m) || isNaN(y)) return null;
    return { y: y, m: m, d: d };
  }
  function closeDatepicker() {
    if (!picker || !dateWrap || !dateInput) return;
    picker.hidden = true;
    dateWrap.classList.remove('is-open');
    dateInput.setAttribute('aria-expanded', 'false');
  }
  function openDatepicker() {
    if (!picker || !dateWrap || !dateInput) return;
    closeAllCombos();
    var cur = parseDate(dateInput.value);
    if (cur) {
      selected = cur;
      view = { y: cur.y, m: cur.m };
    }
    renderCalendar();
    picker.hidden = false;
    dateWrap.classList.add('is-open');
    dateInput.setAttribute('aria-expanded', 'true');
  }
  function renderCalendar() {
    if (!calGrid || !calLabel) return;
    calLabel.textContent = MONTHS[view.m] + ' ' + view.y;
    calGrid.innerHTML = '';
    var first = new Date(view.y, view.m, 1);
    var startPad = first.getDay();
    var daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    var prevDays = new Date(view.y, view.m, 0).getDate();
    var totalCells = Math.ceil((startPad + daysInMonth) / 7) * 7;
    for (var i = 0; i < totalCells; i++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tr-datepicker__day';
      var dayNum, cellY = view.y, cellM = view.m, muted = false;
      if (i < startPad) {
        dayNum = prevDays - startPad + i + 1;
        cellM = view.m - 1;
        if (cellM < 0) { cellM = 11; cellY--; }
        muted = true;
      } else if (i >= startPad + daysInMonth) {
        dayNum = i - (startPad + daysInMonth) + 1;
        cellM = view.m + 1;
        if (cellM > 11) { cellM = 0; cellY++; }
        muted = true;
      } else {
        dayNum = i - startPad + 1;
      }
      if (muted) btn.classList.add('is-muted');
      if (cellY === selected.y && cellM === selected.m && dayNum === selected.d) btn.classList.add('is-selected');
      btn.textContent = String(dayNum);
      btn.setAttribute('data-y', String(cellY));
      btn.setAttribute('data-m', String(cellM));
      btn.setAttribute('data-d', String(dayNum));
      btn.addEventListener('click', function () {
        selected = {
          y: parseInt(this.getAttribute('data-y'), 10),
          m: parseInt(this.getAttribute('data-m'), 10),
          d: parseInt(this.getAttribute('data-d'), 10)
        };
        dateInput.value = formatDate(selected.y, selected.m, selected.d);
        closeDatepicker();
      });
      calGrid.appendChild(btn);
    }
  }

  if (dateInput && picker) {
    dateInput.addEventListener('click', function () {
      if (picker.hidden) openDatepicker();
      else closeDatepicker();
    });
    picker.querySelectorAll('[data-nav]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nav = btn.getAttribute('data-nav');
        if (nav === 'prev-month') { view.m--; if (view.m < 0) { view.m = 11; view.y--; } }
        if (nav === 'next-month') { view.m++; if (view.m > 11) { view.m = 0; view.y++; } }
        if (nav === 'prev-year') view.y--;
        if (nav === 'next-year') view.y++;
        renderCalendar();
      });
    });
    var todayBtn = document.getElementById('trCalToday');
    if (todayBtn) {
      todayBtn.addEventListener('click', function () {
        var now = new Date();
        selected = { y: now.getFullYear(), m: now.getMonth(), d: now.getDate() };
        view = { y: selected.y, m: selected.m };
        dateInput.value = formatDate(selected.y, selected.m, selected.d);
        closeDatepicker();
      });
    }
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.tr-combo')) closeAllCombos();
    if (!e.target.closest('#trDateWrap')) closeDatepicker();
    if (!e.target.closest('.hr-combo')) hrCloseAllCombos();
    if (!e.target.closest('#hrRangeWrap')) hrCloseRange();
    if (!e.target.closest('.ts-combo')) tsCloseAllCombos();
    if (!e.target.closest('#tsRangeWrap')) tsCloseRange();
    if (!e.target.closest('#tsColsWrap')) tsCloseColsPanel();
    if (!e.target.closest('#asRangeWrap')) asCloseRange();
    if (!e.target.closest('#asMonthWrap')) asCloseMonthpicker();
    if (!e.target.closest('.lc-combo')) lcCloseAllCombos();
  });

  /* ══════════════════════════════════════════
     HRMS TAB — Attendance Summary Report
     ══════════════════════════════════════════ */
  var HR_ROWS = [
    { name: 'Anupam', office: 'GHAZIABAD', p: 0, h: 0, leave: 0, od: 0, ab: 8, li: '0:00', eo: '0:00', wh: '0:00' }
  ];

  var hrFilterCard = document.getElementById('hrFilterCard');
  var hrCollapseBtn = document.getElementById('hrCollapseBtn');
  if (hrCollapseBtn && hrFilterCard) {
    hrCollapseBtn.addEventListener('click', function () {
      var collapsed = hrFilterCard.classList.toggle('is-collapsed');
      hrCollapseBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      var label = hrCollapseBtn.childNodes[hrCollapseBtn.childNodes.length - 1];
      if (label && label.nodeType === 3) label.textContent = collapsed ? ' Expand' : ' Collapse';
    });
  }

  var hrResult = document.getElementById('hrResult');
  var hrGenerateBtn = document.getElementById('hrGenerateBtn');
  if (hrGenerateBtn && hrResult) {
    hrGenerateBtn.addEventListener('click', function () {
      hrResult.classList.add('is-visible');
      hrRenderTable();
      hrResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function hrRenderTable() {
    var body = document.getElementById('hrTableBody');
    if (!body) return;
    body.innerHTML = HR_ROWS.map(function (r, i) {
      return '<tr data-idx="' + i + '">' +
        '<td><button type="button" class="hr-expand" aria-label="Expand row">+</button></td>' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + r.name + '</td>' +
        '<td>' + r.office + '</td>' +
        '<td>' + r.p + '</td>' +
        '<td>' + r.h + '</td>' +
        '<td>' + r.leave + '</td>' +
        '<td>' + r.od + '</td>' +
        '<td>' + r.ab + '</td>' +
        '<td>' + r.li + '</td>' +
        '<td>' + r.eo + '</td>' +
        '<td>' + r.wh + '</td>' +
        '</tr>';
    }).join('');
  }

  function hrBuildDayRows() {
    var days = [
      { d: '22 Sat' }, { d: '23 Sun' }, { d: '24 Mon' }, { d: '25 Tue' },
      { d: '26 Wed' }, { d: '27 Thu' }, { d: '28 Fri' }, { d: '29 Sat' }
    ];
    return days.map(function (day) {
      return '<tr>' +
        '<td>' + day.d + '</td>' +
        '<td>NR</td>' +
        '<td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td>' +
        '<td><span class="hr-stat hr-stat--a" title="Absent">A</span></td>' +
        '<td><span class="hr-stat hr-stat--a" title="Absent">A</span></td>' +
        '</tr>';
    }).join('');
  }

  function hrBuildDetailHtml() {
    return '<td colspan="12">' +
      '<div class="hr-nested">' +
        '<table class="hr-nested-table">' +
          '<thead><tr>' +
            '<th>Date</th><th>Shift</th><th>IN</th><th>OUT</th>' +
            '<th>Late-IN</th><th>Early-Out</th><th>WrkHrs</th><th>Overtime</th>' +
            '<th>Stat1</th><th>Stat2</th>' +
          '</tr></thead>' +
          '<tbody>' + hrBuildDayRows() + '</tbody>' +
        '</table>' +
      '</div>' +
    '</td>';
  }

  var hrTableBody = document.getElementById('hrTableBody');
  if (hrTableBody) {
    hrTableBody.addEventListener('click', function (e) {
      var btn = e.target.closest('.hr-expand');
      if (!btn) return;
      var tr = btn.closest('tr');
      if (!tr || tr.classList.contains('hr-detail-row')) return;
      var next = tr.nextElementSibling;
      if (next && next.classList.contains('hr-detail-row')) {
        next.remove();
        btn.textContent = '+';
        btn.setAttribute('aria-expanded', 'false');
        return;
      }
      var detail = document.createElement('tr');
      detail.className = 'hr-detail-row';
      detail.innerHTML = hrBuildDetailHtml();
      tr.after(detail);
      btn.textContent = '−';
      btn.setAttribute('aria-expanded', 'true');
    });
  }

  function hrExportExcel() {
    var rows = [['S. No.', 'Employee Name', 'Office', 'P', 'H', 'Leave', 'OD', 'AB', 'LI', 'EO', 'WorkHrs']];
    HR_ROWS.forEach(function (r, i) {
      rows.push([String(i + 1), r.name, r.office, String(r.p), String(r.h), String(r.leave), String(r.od), String(r.ab), r.li, r.eo, r.wh]);
    });
    var csv = rows.map(function (r) {
      return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'hrms-attendance-summary.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  ['hrExcelBtn1', 'hrExcelBtn2'].forEach(function (id) {
    var btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', hrExportExcel);
  });

  function hrCloseAllCombos(except) {
    document.querySelectorAll('.hr-combo').forEach(function (wrap) {
      if (except && wrap === except) return;
      wrap.classList.remove('is-open');
      var list = wrap.querySelector('.hr-combo__list');
      if (list) list.hidden = true;
    });
  }

  document.querySelectorAll('.hr-combo').forEach(function (wrap) {
    var inp = wrap.querySelector('.hr-combo__input');
    var list = wrap.querySelector('.hr-combo__list');
    if (!inp || !list) return;
    var items = Array.prototype.slice.call(list.querySelectorAll('li'));
    function syncClear() {
      wrap.classList.toggle('has-value', !!(inp.value || '').trim());
    }
    function open() {
      hrCloseAllCombos(wrap);
      hrCloseRange();
      wrap.classList.add('is-open');
      list.hidden = false;
    }
    function close() {
      wrap.classList.remove('is-open');
      list.hidden = true;
    }
    function filter() {
      var q = (inp.value || '').toLowerCase().trim();
      items.forEach(function (li) {
        var text = (li.getAttribute('data-value') || li.textContent || '').toLowerCase();
        li.classList.toggle('is-hidden', q && text.indexOf(q) === -1);
      });
    }
    inp.addEventListener('focus', open);
    inp.addEventListener('click', open);
    inp.addEventListener('input', function () { open(); filter(); syncClear(); });
    items.forEach(function (li) {
      li.addEventListener('mousedown', function (e) {
        e.preventDefault();
        inp.value = li.getAttribute('data-value') || li.textContent.trim();
        syncClear();
        close();
        items.forEach(function (x) { x.classList.remove('is-hidden'); });
      });
    });
    var clearBtn = wrap.querySelector('.hr-combo__clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', function (e) {
        e.preventDefault();
        inp.value = '';
        syncClear();
        inp.focus();
      });
    }
    syncClear();
  });

  var hrRangeWrap = document.getElementById('hrRangeWrap');
  var hrRangeInput = document.getElementById('hrDateRange');
  var hrPicker = document.getElementById('hrRangepicker');
  var hrLeftGrid = document.getElementById('hrCalLeftGrid');
  var hrRightGrid = document.getElementById('hrCalRightGrid');
  var hrLeftLabel = document.getElementById('hrCalLeftLabel');
  var hrRightLabel = document.getElementById('hrCalRightLabel');
  var hrViewLeft = { y: 2026, m: 7 };
  var hrRangeStart = { y: 2026, m: 7, d: 22 };
  var hrRangeEnd = { y: 2026, m: 7, d: 29 };
  var hrPicking = 'start';

  function hrPad(n) { return (n < 10 ? '0' : '') + n; }
  function hrFmt(p) { return hrPad(p.d) + '-' + hrPad(p.m + 1) + '-' + p.y; }
  function hrKey(p) { return p.y * 10000 + (p.m + 1) * 100 + p.d; }
  function hrAddMonths(base, n) {
    var m = base.m + n, y = base.y;
    while (m > 11) { m -= 12; y++; }
    while (m < 0) { m += 12; y--; }
    return { y: y, m: m };
  }
  function hrCloseRange() {
    if (!hrPicker || !hrRangeWrap || !hrRangeInput) return;
    hrPicker.hidden = true;
    hrRangeWrap.classList.remove('is-open');
    hrRangeInput.setAttribute('aria-expanded', 'false');
  }
  function hrOpenRange() {
    if (!hrPicker || !hrRangeWrap || !hrRangeInput) return;
    hrCloseAllCombos();
    hrViewLeft = { y: hrRangeStart.y, m: hrRangeStart.m };
    hrPicking = 'start';
    hrRenderBoth();
    hrPicker.hidden = false;
    hrRangeWrap.classList.add('is-open');
    hrRangeInput.setAttribute('aria-expanded', 'true');
  }
  function hrRenderMonth(grid, labelEl, view) {
    if (!grid || !labelEl) return;
    labelEl.textContent = MONTHS[view.m] + ' ' + view.y;
    grid.innerHTML = '';
    var first = new Date(view.y, view.m, 1);
    var startPad = first.getDay();
    var daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    var prevDays = new Date(view.y, view.m, 0).getDate();
    var totalCells = Math.ceil((startPad + daysInMonth) / 7) * 7;
    var startK = hrKey(hrRangeStart);
    var endK = hrKey(hrRangeEnd);
    for (var i = 0; i < totalCells; i++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hr-cal-day';
      var dayNum, cellY = view.y, cellM = view.m, muted = false;
      if (i < startPad) {
        dayNum = prevDays - startPad + i + 1;
        cellM = view.m - 1;
        if (cellM < 0) { cellM = 11; cellY--; }
        muted = true;
      } else if (i >= startPad + daysInMonth) {
        dayNum = i - (startPad + daysInMonth) + 1;
        cellM = view.m + 1;
        if (cellM > 11) { cellM = 0; cellY++; }
        muted = true;
      } else {
        dayNum = i - startPad + 1;
      }
      var cell = { y: cellY, m: cellM, d: dayNum };
      var k = hrKey(cell);
      if (muted) btn.classList.add('is-muted');
      if (k === startK || k === endK) btn.classList.add('is-range-edge');
      else if (k > startK && k < endK) btn.classList.add('is-in-range');
      btn.textContent = String(dayNum);
      btn.setAttribute('data-y', String(cellY));
      btn.setAttribute('data-m', String(cellM));
      btn.setAttribute('data-d', String(dayNum));
      btn.addEventListener('click', hrOnPick);
      grid.appendChild(btn);
    }
  }
  function hrRenderBoth() {
    hrRenderMonth(hrLeftGrid, hrLeftLabel, hrViewLeft);
    hrRenderMonth(hrRightGrid, hrRightLabel, hrAddMonths(hrViewLeft, 1));
  }
  function hrOnPick() {
    var cell = {
      y: parseInt(this.getAttribute('data-y'), 10),
      m: parseInt(this.getAttribute('data-m'), 10),
      d: parseInt(this.getAttribute('data-d'), 10)
    };
    if (hrPicking === 'start') {
      hrRangeStart = cell;
      hrRangeEnd = cell;
      hrPicking = 'end';
    } else {
      if (hrKey(cell) < hrKey(hrRangeStart)) {
        hrRangeEnd = hrRangeStart;
        hrRangeStart = cell;
      } else {
        hrRangeEnd = cell;
      }
      hrPicking = 'start';
      hrRangeInput.value = hrFmt(hrRangeStart) + ' -> ' + hrFmt(hrRangeEnd);
      hrCloseRange();
    }
    hrRenderBoth();
  }

  if (hrRangeInput && hrPicker) {
    hrRangeInput.addEventListener('click', function () {
      if (hrPicker.hidden) hrOpenRange();
      else hrCloseRange();
    });
    hrPicker.querySelectorAll('[data-nav]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nav = btn.getAttribute('data-nav');
        if (nav === 'prev-month') hrViewLeft = hrAddMonths(hrViewLeft, -1);
        if (nav === 'next-month') hrViewLeft = hrAddMonths(hrViewLeft, 1);
        if (nav === 'prev-year') hrViewLeft = { y: hrViewLeft.y - 1, m: hrViewLeft.m };
        if (nav === 'next-year') hrViewLeft = { y: hrViewLeft.y + 1, m: hrViewLeft.m };
        hrRenderBoth();
      });
    });
  }

  hrRenderTable();

  /* ══════════════════════════════════════════
     TIMESHEET TAB
     ══════════════════════════════════════════ */
  var tsFilterCard = document.getElementById('tsFilterCard');
  var tsCollapseBtn = document.getElementById('tsCollapseBtn');
  if (tsCollapseBtn && tsFilterCard) {
    tsCollapseBtn.addEventListener('click', function () {
      var collapsed = tsFilterCard.classList.toggle('is-collapsed');
      tsCollapseBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      var label = tsCollapseBtn.childNodes[tsCollapseBtn.childNodes.length - 1];
      if (label && label.nodeType === 3) label.textContent = collapsed ? ' Expand' : ' Collapse';
    });
  }

  var tsResult = document.getElementById('tsResult');
  var tsGenerateBtn = document.getElementById('tsGenerateBtn');
  if (tsGenerateBtn && tsResult) {
    tsGenerateBtn.addEventListener('click', function () {
      tsResult.classList.add('is-visible');
      var body = document.getElementById('tsTableBody');
      var empty = document.getElementById('tsEmpty');
      if (body) body.innerHTML = '';
      if (empty) empty.classList.remove('is-hidden');
      tsResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  var tsColsBtn = document.getElementById('tsColsBtn');
  var tsColsPanel = document.getElementById('tsColsPanel');
  function tsCloseColsPanel() {
    if (!tsColsPanel || !tsColsBtn) return;
    tsColsPanel.hidden = true;
    tsColsBtn.setAttribute('aria-expanded', 'false');
  }
  if (tsColsBtn && tsColsPanel) {
    tsColsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = tsColsPanel.hidden;
      tsCloseColsPanel();
      if (open) {
        tsColsPanel.hidden = false;
        tsColsBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  var tsSelectAllCols = document.getElementById('tsSelectAllCols');
  if (tsSelectAllCols) {
    tsSelectAllCols.addEventListener('click', function () {
      document.querySelectorAll('#tsColsList input[type="checkbox"]').forEach(function (cb) {
        cb.checked = true;
      });
      tsApplyColumns();
    });
  }

  function tsApplyColumns() {
    document.querySelectorAll('#tsColsList input[type="checkbox"]').forEach(function (cb) {
      var col = cb.getAttribute('data-col');
      if (!col) return;
      document.querySelectorAll('#tsDataTable [data-col="' + col + '"]').forEach(function (el) {
        el.style.display = cb.checked ? '' : 'none';
      });
    });
  }

  document.querySelectorAll('#tsColsList input[type="checkbox"]').forEach(function (cb) {
    cb.addEventListener('change', tsApplyColumns);
  });

  var tsExcelBtn = document.getElementById('tsExcelBtn');
  if (tsExcelBtn) {
    tsExcelBtn.addEventListener('click', function () {
      var headers = [];
      document.querySelectorAll('#tsDataTable thead th').forEach(function (th) {
        if (th.style.display !== 'none') headers.push(th.textContent.trim());
      });
      var rows = [headers];
      var csv = rows.map(function (r) {
        return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
      }).join('\n');
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'timesheet-report.csv';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function tsCloseAllCombos(except) {
    document.querySelectorAll('.ts-combo').forEach(function (wrap) {
      if (except && wrap === except) return;
      wrap.classList.remove('is-open');
      var list = wrap.querySelector('.ts-combo__list');
      if (list) list.hidden = true;
    });
  }

  document.querySelectorAll('.ts-combo').forEach(function (wrap) {
    var inp = wrap.querySelector('.ts-combo__input');
    var list = wrap.querySelector('.ts-combo__list');
    if (!inp || !list) return;
    var items = Array.prototype.slice.call(list.querySelectorAll('li'));
    function open() {
      tsCloseAllCombos(wrap);
      tsCloseRange();
      tsCloseColsPanel();
      wrap.classList.add('is-open');
      list.hidden = false;
    }
    function close() {
      wrap.classList.remove('is-open');
      list.hidden = true;
    }
    function filter() {
      var q = (inp.value || '').toLowerCase().trim();
      items.forEach(function (li) {
        var text = (li.getAttribute('data-value') || li.textContent || '').toLowerCase();
        li.classList.toggle('is-hidden', q && text.indexOf(q) === -1);
      });
    }
    inp.addEventListener('focus', open);
    inp.addEventListener('click', open);
    inp.addEventListener('input', function () { open(); filter(); });
    items.forEach(function (li) {
      li.addEventListener('mousedown', function (e) {
        e.preventDefault();
        inp.value = li.getAttribute('data-value') || li.textContent.trim();
        close();
        items.forEach(function (x) { x.classList.remove('is-hidden'); });
      });
    });
  });

  var tsRangeWrap = document.getElementById('tsRangeWrap');
  var tsRangeInput = document.getElementById('tsDateRange');
  var tsPicker = document.getElementById('tsRangepicker');
  var tsLeftGrid = document.getElementById('tsCalLeftGrid');
  var tsRightGrid = document.getElementById('tsCalRightGrid');
  var tsLeftLabel = document.getElementById('tsCalLeftLabel');
  var tsRightLabel = document.getElementById('tsCalRightLabel');
  var tsViewLeft = { y: 2026, m: 7 };
  var tsRangeStart = { y: 2026, m: 7, d: 22 };
  var tsRangeEnd = { y: 2026, m: 7, d: 29 };
  var tsPicking = 'start';

  function tsFmt(p) { return hrPad(p.d) + '-' + hrPad(p.m + 1) + '-' + p.y; }
  function tsKey(p) { return p.y * 10000 + (p.m + 1) * 100 + p.d; }
  function tsAddMonths(base, n) {
    var m = base.m + n, y = base.y;
    while (m > 11) { m -= 12; y++; }
    while (m < 0) { m += 12; y--; }
    return { y: y, m: m };
  }
  function tsCloseRange() {
    if (!tsPicker || !tsRangeWrap || !tsRangeInput) return;
    tsPicker.hidden = true;
    tsRangeWrap.classList.remove('is-open');
    tsRangeInput.setAttribute('aria-expanded', 'false');
  }
  function tsOpenRange() {
    if (!tsPicker || !tsRangeWrap || !tsRangeInput) return;
    tsCloseAllCombos();
    tsViewLeft = { y: tsRangeStart.y, m: tsRangeStart.m };
    tsPicking = 'start';
    tsRenderBoth();
    tsPicker.hidden = false;
    tsRangeWrap.classList.add('is-open');
    tsRangeInput.setAttribute('aria-expanded', 'true');
  }
  function tsRenderMonth(grid, labelEl, view) {
    if (!grid || !labelEl) return;
    labelEl.textContent = MONTHS[view.m] + ' ' + view.y;
    grid.innerHTML = '';
    var first = new Date(view.y, view.m, 1);
    var startPad = first.getDay();
    var daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    var prevDays = new Date(view.y, view.m, 0).getDate();
    var totalCells = Math.ceil((startPad + daysInMonth) / 7) * 7;
    var startK = tsKey(tsRangeStart);
    var endK = tsKey(tsRangeEnd);
    for (var i = 0; i < totalCells; i++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ts-cal-day';
      var dayNum, cellY = view.y, cellM = view.m, muted = false;
      if (i < startPad) {
        dayNum = prevDays - startPad + i + 1;
        cellM = view.m - 1;
        if (cellM < 0) { cellM = 11; cellY--; }
        muted = true;
      } else if (i >= startPad + daysInMonth) {
        dayNum = i - (startPad + daysInMonth) + 1;
        cellM = view.m + 1;
        if (cellM > 11) { cellM = 0; cellY++; }
        muted = true;
      } else {
        dayNum = i - startPad + 1;
      }
      var cell = { y: cellY, m: cellM, d: dayNum };
      var k = tsKey(cell);
      if (muted) btn.classList.add('is-muted');
      if (k === startK || k === endK) btn.classList.add('is-range-edge');
      else if (k > startK && k < endK) btn.classList.add('is-in-range');
      btn.textContent = String(dayNum);
      btn.setAttribute('data-y', String(cellY));
      btn.setAttribute('data-m', String(cellM));
      btn.setAttribute('data-d', String(dayNum));
      btn.addEventListener('click', tsOnPick);
      grid.appendChild(btn);
    }
  }
  function tsRenderBoth() {
    tsRenderMonth(tsLeftGrid, tsLeftLabel, tsViewLeft);
    tsRenderMonth(tsRightGrid, tsRightLabel, tsAddMonths(tsViewLeft, 1));
  }
  function tsOnPick() {
    var cell = {
      y: parseInt(this.getAttribute('data-y'), 10),
      m: parseInt(this.getAttribute('data-m'), 10),
      d: parseInt(this.getAttribute('data-d'), 10)
    };
    if (tsPicking === 'start') {
      tsRangeStart = cell;
      tsRangeEnd = cell;
      tsPicking = 'end';
    } else {
      if (tsKey(cell) < tsKey(tsRangeStart)) {
        tsRangeEnd = tsRangeStart;
        tsRangeStart = cell;
      } else {
        tsRangeEnd = cell;
      }
      tsPicking = 'start';
      tsRangeInput.value = tsFmt(tsRangeStart) + ' -> ' + tsFmt(tsRangeEnd);
      tsCloseRange();
    }
    tsRenderBoth();
  }

  if (tsRangeInput && tsPicker) {
    tsRangeInput.addEventListener('click', function () {
      if (tsPicker.hidden) tsOpenRange();
      else tsCloseRange();
    });
    tsPicker.querySelectorAll('[data-nav]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nav = btn.getAttribute('data-nav');
        if (nav === 'prev-month') tsViewLeft = tsAddMonths(tsViewLeft, -1);
        if (nav === 'next-month') tsViewLeft = tsAddMonths(tsViewLeft, 1);
        if (nav === 'prev-year') tsViewLeft = { y: tsViewLeft.y - 1, m: tsViewLeft.m };
        if (nav === 'next-year') tsViewLeft = { y: tsViewLeft.y + 1, m: tsViewLeft.m };
        tsRenderBoth();
      });
    });
  }

  /* ══════════════════════════════════════════
     ATTENDANCE SUMMARY TAB
     ══════════════════════════════════════════ */
  var asRangeWrap = document.getElementById('asRangeWrap');
  var asRangeInput = document.getElementById('asDateRange');
  var asPicker = document.getElementById('asRangepicker');
  var asLeftGrid = document.getElementById('asCalLeftGrid');
  var asRightGrid = document.getElementById('asCalRightGrid');
  var asLeftLabel = document.getElementById('asCalLeftLabel');
  var asRightLabel = document.getElementById('asCalRightLabel');
  var asViewLeft = { y: 2026, m: 7 };
  var asRangeStart = { y: 2026, m: 7, d: 1 };
  var asRangeEnd = { y: 2026, m: 7, d: 29 };
  var asPicking = 'start';

  function asPad(n) { return (n < 10 ? '0' : '') + n; }
  function asFmtSlash(p) { return asPad(p.d) + '/' + asPad(p.m + 1) + '/' + p.y; }
  function asKey(p) { return p.y * 10000 + (p.m + 1) * 100 + p.d; }
  function asAddMonths(base, n) {
    var m = base.m + n, y = base.y;
    while (m > 11) { m -= 12; y++; }
    while (m < 0) { m += 12; y--; }
    return { y: y, m: m };
  }
  function asCloseRange() {
    if (!asPicker || !asRangeWrap || !asRangeInput) return;
    asPicker.hidden = true;
    asRangeWrap.classList.remove('is-open');
    asRangeInput.setAttribute('aria-expanded', 'false');
  }
  function asOpenRange() {
    if (!asPicker || !asRangeWrap || !asRangeInput) return;
    asCloseMonthpicker();
    asViewLeft = { y: asRangeStart.y, m: asRangeStart.m };
    asPicking = 'start';
    asRenderBoth();
    asPicker.hidden = false;
    asRangeWrap.classList.add('is-open');
    asRangeInput.setAttribute('aria-expanded', 'true');
  }
  function asRenderMonth(grid, labelEl, view) {
    if (!grid || !labelEl) return;
    labelEl.textContent = MONTHS[view.m] + ' ' + view.y;
    grid.innerHTML = '';
    var first = new Date(view.y, view.m, 1);
    var startPad = first.getDay();
    var daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    var prevDays = new Date(view.y, view.m, 0).getDate();
    var totalCells = Math.ceil((startPad + daysInMonth) / 7) * 7;
    var startK = asKey(asRangeStart);
    var endK = asKey(asRangeEnd);
    for (var i = 0; i < totalCells; i++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'as-cal-day';
      var dayNum, cellY = view.y, cellM = view.m, muted = false;
      if (i < startPad) {
        dayNum = prevDays - startPad + i + 1;
        cellM = view.m - 1;
        if (cellM < 0) { cellM = 11; cellY--; }
        muted = true;
      } else if (i >= startPad + daysInMonth) {
        dayNum = i - (startPad + daysInMonth) + 1;
        cellM = view.m + 1;
        if (cellM > 11) { cellM = 0; cellY++; }
        muted = true;
      } else {
        dayNum = i - startPad + 1;
      }
      var cell = { y: cellY, m: cellM, d: dayNum };
      var k = asKey(cell);
      if (muted) btn.classList.add('is-muted');
      if (k === startK || k === endK) btn.classList.add('is-range-edge');
      else if (k > startK && k < endK) btn.classList.add('is-in-range');
      btn.textContent = String(dayNum);
      btn.setAttribute('data-y', String(cellY));
      btn.setAttribute('data-m', String(cellM));
      btn.setAttribute('data-d', String(dayNum));
      btn.addEventListener('click', asOnPick);
      grid.appendChild(btn);
    }
  }
  function asRenderBoth() {
    asRenderMonth(asLeftGrid, asLeftLabel, asViewLeft);
    asRenderMonth(asRightGrid, asRightLabel, asAddMonths(asViewLeft, 1));
  }
  function asOnPick() {
    var cell = {
      y: parseInt(this.getAttribute('data-y'), 10),
      m: parseInt(this.getAttribute('data-m'), 10),
      d: parseInt(this.getAttribute('data-d'), 10)
    };
    if (asPicking === 'start') {
      asRangeStart = cell;
      asRangeEnd = cell;
      asPicking = 'end';
    } else {
      if (asKey(cell) < asKey(asRangeStart)) {
        asRangeEnd = asRangeStart;
        asRangeStart = cell;
      } else {
        asRangeEnd = cell;
      }
      asPicking = 'start';
      asRangeInput.value = asFmtSlash(asRangeStart) + ' -> ' + asFmtSlash(asRangeEnd);
      asCloseRange();
    }
    asRenderBoth();
  }

  if (asRangeInput && asPicker) {
    asRangeInput.addEventListener('click', function () {
      if (asPicker.hidden) asOpenRange();
      else asCloseRange();
    });
    asPicker.querySelectorAll('[data-nav]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nav = btn.getAttribute('data-nav');
        if (nav === 'prev-month') asViewLeft = asAddMonths(asViewLeft, -1);
        if (nav === 'next-month') asViewLeft = asAddMonths(asViewLeft, 1);
        if (nav === 'prev-year') asViewLeft = { y: asViewLeft.y - 1, m: asViewLeft.m };
        if (nav === 'next-year') asViewLeft = { y: asViewLeft.y + 1, m: asViewLeft.m };
        asRenderBoth();
      });
    });
  }

  var asMonthWrap = document.getElementById('asMonthWrap');
  var asMonthInput = document.getElementById('asMonthInput');
  var asMonthpicker = document.getElementById('asMonthpicker');
  var asMonthGrid = document.getElementById('asMonthGrid');
  var asMonthYearLabel = document.getElementById('asMonthYearLabel');
  var asSummaryTitle = document.querySelector('.as-summary-title');
  var asMonthYear = 2026;
  var asMonthIdx = 7;

  function asCloseMonthpicker() {
    if (!asMonthpicker || !asMonthWrap || !asMonthInput) return;
    asMonthpicker.hidden = true;
    asMonthWrap.classList.remove('is-open');
    asMonthInput.setAttribute('aria-expanded', 'false');
  }
  function asOpenMonthpicker() {
    if (!asMonthpicker || !asMonthWrap || !asMonthInput) return;
    asCloseRange();
    asRenderMonthGrid();
    asMonthpicker.hidden = false;
    asMonthWrap.classList.add('is-open');
    asMonthInput.setAttribute('aria-expanded', 'true');
  }
  function asUpdateSummaryTitle() {
    if (asMonthInput) asMonthInput.value = asMonthYear + '-' + asPad(asMonthIdx + 1);
    if (asSummaryTitle) asSummaryTitle.textContent = 'Summary for the month ' + MONTHS[asMonthIdx] + ' ' + asMonthYear;
  }
  function asRenderMonthGrid() {
    if (!asMonthGrid || !asMonthYearLabel) return;
    asMonthYearLabel.textContent = String(asMonthYear);
    asMonthGrid.innerHTML = '';
    MONTHS.forEach(function (name, idx) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'as-month-btn' + (idx === asMonthIdx ? ' is-selected' : '');
      btn.textContent = name;
      btn.addEventListener('click', function () {
        asMonthIdx = idx;
        asUpdateSummaryTitle();
        asCloseMonthpicker();
      });
      asMonthGrid.appendChild(btn);
    });
  }

  if (asMonthInput && asMonthpicker) {
    asMonthInput.addEventListener('click', function () {
      if (asMonthpicker.hidden) asOpenMonthpicker();
      else asCloseMonthpicker();
    });
    asMonthpicker.querySelectorAll('[data-nav]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nav = btn.getAttribute('data-nav');
        if (nav === 'prev-year') asMonthYear--;
        if (nav === 'next-year') asMonthYear++;
        asRenderMonthGrid();
      });
    });
  }

  /* ══════════════════════════════════════════
     LEAVE COUNT TAB
     ══════════════════════════════════════════ */
  function lcCloseAllCombos(except) {
    document.querySelectorAll('.lc-combo').forEach(function (wrap) {
      if (except && wrap === except) return;
      wrap.classList.remove('is-open');
      var list = wrap.querySelector('.lc-combo__list');
      if (list) list.hidden = true;
    });
  }

  document.querySelectorAll('.lc-combo').forEach(function (wrap) {
    var inp = wrap.querySelector('.lc-combo__input');
    var list = wrap.querySelector('.lc-combo__list');
    if (!inp || !list) return;
    var items = Array.prototype.slice.call(list.querySelectorAll('li'));
    function open() {
      lcCloseAllCombos(wrap);
      wrap.classList.add('is-open');
      list.hidden = false;
    }
    function close() {
      wrap.classList.remove('is-open');
      list.hidden = true;
    }
    function filter() {
      var q = (inp.value || '').toLowerCase().trim();
      items.forEach(function (li) {
        var text = (li.getAttribute('data-value') || li.textContent || '').toLowerCase();
        li.classList.toggle('is-hidden', q && text.indexOf(q) === -1);
      });
    }
    inp.addEventListener('focus', open);
    inp.addEventListener('click', open);
    inp.addEventListener('input', function () { open(); filter(); });
    items.forEach(function (li) {
      li.addEventListener('mousedown', function (e) {
        e.preventDefault();
        inp.value = li.getAttribute('data-value') || li.textContent.trim();
        close();
        items.forEach(function (x) { x.classList.remove('is-hidden'); });
      });
    });
  });
})();