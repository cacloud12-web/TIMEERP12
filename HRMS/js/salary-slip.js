/**
 * TIME ERP — My Salary Slip (month filter, columns, details modal, check-in)
 */
(function () {
  'use strict';

  var MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var COLUMNS = [
    { id: 'check', label: '', check: true },
    { id: 'sno', label: '#' },
    { id: 'month', label: 'Month' },
    { id: 'gross', label: 'Gross Earnings' },
    { id: 'deductions', label: 'Deductions' },
    { id: 'tax', label: 'Tax' },
    { id: 'payableDays', label: 'Payable Days' },
    { id: 'net', label: 'Net Payable' },
    { id: 'slip', label: 'Salary Slip' }
  ];

  var SAMPLE_ROWS = [
    {
      id: 1,
      month: '07/2026',
      year: 2026,
      monthIndex: 6,
      gross: 67500,
      deductions: 0,
      tax: 0,
      payableDays: 31,
      net: 67500,
      lines: [
        { name: 'Basic', taxable: true, value: 45000 },
        { name: 'HRA', taxable: true, value: 22500 }
      ]
    },
    {
      id: 2,
      month: '06/2026',
      year: 2026,
      monthIndex: 5,
      gross: 67500,
      deductions: 0,
      tax: 0,
      payableDays: 30,
      net: 67500,
      lines: [
        { name: 'Basic', taxable: true, value: 45000 },
        { name: 'HRA', taxable: true, value: 22500 }
      ]
    },
    {
      id: 3,
      month: '05/2026',
      year: 2026,
      monthIndex: 4,
      gross: 65000,
      deductions: 500,
      tax: 0,
      payableDays: 31,
      net: 64500,
      lines: [
        { name: 'Basic', taxable: true, value: 43000 },
        { name: 'HRA', taxable: true, value: 22000 }
      ]
    },
    {
      id: 4,
      month: '04/2026',
      year: 2026,
      monthIndex: 3,
      gross: 67500,
      deductions: 1200,
      tax: 850,
      payableDays: 30,
      net: 65450,
      lines: [
        { name: 'Basic', taxable: true, value: 45000 },
        { name: 'HRA', taxable: true, value: 22500 }
      ]
    },
    {
      id: 5,
      month: '03/2026',
      year: 2026,
      monthIndex: 2,
      gross: 66000,
      deductions: 800,
      tax: 0,
      payableDays: 31,
      net: 65200,
      lines: [
        { name: 'Basic', taxable: true, value: 44000 },
        { name: 'HRA', taxable: true, value: 22000 }
      ]
    },
    {
      id: 6,
      month: '02/2026',
      year: 2026,
      monthIndex: 1,
      gross: 67500,
      deductions: 0,
      tax: 1200,
      payableDays: 28,
      net: 66300,
      lines: [
        { name: 'Basic', taxable: true, value: 45000 },
        { name: 'HRA', taxable: true, value: 22500 }
      ]
    },
    {
      id: 7,
      month: '01/2026',
      year: 2026,
      monthIndex: 0,
      gross: 67500,
      deductions: 500,
      tax: 0,
      payableDays: 31,
      net: 67000,
      lines: [
        { name: 'Basic', taxable: true, value: 45000 },
        { name: 'HRA', taxable: true, value: 22500 }
      ]
    }
  ];

  var state = {
    selectedYear: 2026,
    selectedMonth: 6,
    pickerYear: 2026,
    visible: [],
    page: 1,
    pageSize: 20,
    checkedIn: false,
    selectedIds: {}
  };

  var els = {
    monthBtn: document.getElementById('ssMonthBtn'),
    monthText: document.getElementById('ssMonthText'),
    monthPop: document.getElementById('ssMonthPop'),
    monthGrid: document.getElementById('ssMonthGrid'),
    pickerYear: document.getElementById('ssPickerYear'),
    yearPrev: document.getElementById('ssYearPrev'),
    yearNext: document.getElementById('ssYearNext'),
    columnsBtn: document.getElementById('ssColumnsBtn'),
    columnsPop: document.getElementById('ssColumnsPop'),
    columnsList: document.getElementById('ssColumnsList'),
    selectAll: document.getElementById('ssSelectAllCols'),
    head: document.getElementById('ssTableHead'),
    body: document.getElementById('ssTableBody'),
    empty: document.getElementById('ssEmpty'),
    prev: document.getElementById('ssPrev'),
    next: document.getElementById('ssNext'),
    pageInput: document.getElementById('ssPageInput'),
    pageTotal: document.getElementById('ssPageTotal'),
    count: document.getElementById('ssCount'),
    detailsModal: document.getElementById('ssDetailsModal'),
    detailsClose: document.getElementById('ssDetailsClose'),
    detailsBody: document.getElementById('ssDetailsBody'),
    detailsTotal: document.getElementById('ssDetailsTotal'),
    topCheckIn: document.getElementById('ssTopCheckInBtn'),
    topClock: document.getElementById('ssTopClock')
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

  function formatClock(d) {
    return pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function formatMoney(n) {
    return Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function monthKey(year, monthIndex) {
    return pad(monthIndex + 1) + '/' + year;
  }

  function filteredRows() {
    return SAMPLE_ROWS.filter(function (r) { return r.year === state.selectedYear; })
      .sort(function (a, b) { return b.monthIndex - a.monthIndex; });
  }

  function toggleableColumns() {
    return COLUMNS.filter(function (c) { return !c.check; });
  }

  function initVisible() {
    state.visible = toggleableColumns().map(function (c) { return c.id; });
  }

  function closePops() {
    if (els.columnsPop) els.columnsPop.hidden = true;
    if (els.monthPop) els.monthPop.hidden = true;
    if (els.columnsBtn) {
      els.columnsBtn.classList.remove('is-active');
      els.columnsBtn.setAttribute('aria-expanded', 'false');
    }
    if (els.monthBtn) {
      els.monthBtn.classList.remove('is-open');
      els.monthBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function placePop(pop, anchor) {
    if (!pop || !anchor) return;
    pop.hidden = false;
    var r = anchor.getBoundingClientRect();
    var width = pop.offsetWidth || 248;
    var height = pop.offsetHeight || 320;
    var left = Math.min(window.innerWidth - width - 12, Math.max(12, r.right - width));
    var top = r.bottom + 8;
    if (top + height > window.innerHeight - 12) top = Math.max(12, r.top - height - 8);
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
    var caret = pop.querySelector('.ss-pop__caret');
    if (caret) {
      var caretLeft = r.left + r.width / 2 - left - 6;
      caret.style.left = Math.max(14, Math.min(width - 20, caretLeft)) + 'px';
      caret.style.right = 'auto';
    }
  }

  function updateMonthLabel() {
    if (els.monthText) els.monthText.textContent = monthKey(state.selectedYear, state.selectedMonth);
  }

  function renderMonthGrid() {
    if (!els.monthGrid || !els.pickerYear) return;
    els.pickerYear.textContent = String(state.pickerYear);
    els.monthGrid.innerHTML = MONTH_LABELS.map(function (label, idx) {
      var selected = state.pickerYear === state.selectedYear && idx === state.selectedMonth ? ' is-selected' : '';
      return '<button type="button" class="ss-month-cell' + selected + '" data-month="' + idx + '">' + label + '</button>';
    }).join('');
  }

  function openMonthPop() {
    var open = !els.monthPop.hidden && els.monthBtn.classList.contains('is-open');
    closePops();
    if (open) return;
    state.pickerYear = state.selectedYear;
    renderMonthGrid();
    els.monthBtn.classList.add('is-open');
    els.monthBtn.setAttribute('aria-expanded', 'true');
    placePop(els.monthPop, els.monthBtn);
  }

  function renderColumnsPop() {
    if (!els.columnsList) return;
    els.columnsList.innerHTML = toggleableColumns().map(function (col) {
      var checked = state.visible.indexOf(col.id) !== -1 ? ' checked' : '';
      return '<li class="ss-pop__item" data-col-id="' + col.id + '">' +
        '<span class="ss-pop__drag" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></span>' +
        '<span class="ss-pop__check">' +
          '<input type="checkbox" id="ss-col-' + col.id + '" data-col="' + col.id + '"' + checked + '>' +
          '<span class="ss-pop__check-ui" aria-hidden="true"></span>' +
        '</span>' +
        '<label for="ss-col-' + col.id + '">' + col.label + '</label></li>';
    }).join('');
  }

  function openColumnsPop() {
    var open = !els.columnsPop.hidden && els.columnsBtn.classList.contains('is-active');
    closePops();
    if (open) return;
    renderColumnsPop();
    els.columnsBtn.classList.add('is-active');
    els.columnsBtn.setAttribute('aria-expanded', 'true');
    placePop(els.columnsPop, els.columnsBtn);
  }

  function isColVisible(id) {
    return state.visible.indexOf(id) !== -1;
  }

  function renderHead() {
    if (!els.head) return;
    els.head.innerHTML = COLUMNS.map(function (col) {
      if (col.check) {
        return '<th scope="col" class="is-check" data-col="' + col.id + '"><span class="ss-check" aria-hidden="true"></span></th>';
      }
      var hidden = isColVisible(col.id) ? '' : ' hidden';
      return '<th scope="col" data-col="' + col.id + '"' + hidden + '>' + col.label + '</th>';
    }).join('');
  }

  function cellHtml(col, row, index) {
    if (col.check) {
      var checked = state.selectedIds[row.id] ? ' checked' : '';
      return '<td class="is-check" data-col="check"><input type="checkbox" class="ss-check" data-row-id="' + row.id + '"' + checked + ' aria-label="Select row"></td>';
    }
    var hidden = isColVisible(col.id) ? '' : ' hidden';
    var content = '';
    if (col.id === 'sno') content = String(index + 1);
    else if (col.id === 'month') content = row.month;
    else if (col.id === 'gross') content = '<button type="button" class="ss-link ss-link--gross" data-view-id="' + row.id + '">' + formatMoney(row.gross) + '</button>';
    else if (col.id === 'deductions') content = row.deductions === 0 ? '0' : formatMoney(row.deductions);
    else if (col.id === 'tax') content = '<span class="ss-val--accent">' + (row.tax === 0 ? '0' : formatMoney(row.tax)) + '</span>';
    else if (col.id === 'payableDays') content = String(row.payableDays);
    else if (col.id === 'net') content = formatMoney(row.net);
    else if (col.id === 'slip') content = '<span class="ss-muted">--</span>';
    return '<td data-col="' + col.id + '"' + hidden + '>' + content + '</td>';
  }

  function renderBody() {
    var rows = filteredRows();
    var total = rows.length;
    var totalPages = Math.max(1, Math.ceil(total / state.pageSize) || 1);
    if (state.page > totalPages) state.page = totalPages;
    var start = (state.page - 1) * state.pageSize;
    var pageRows = rows.slice(start, start + state.pageSize);

    if (els.body) {
      els.body.innerHTML = pageRows.map(function (row, i) {
        return '<tr>' + COLUMNS.map(function (col) { return cellHtml(col, row, start + i); }).join('') + '</tr>';
      }).join('');
    }

    if (els.empty) els.empty.hidden = total > 0;
    if (els.pageInput) els.pageInput.value = String(state.page);
    if (els.pageTotal) els.pageTotal.textContent = String(totalPages);
    if (els.count) {
      var shown = total === 0 ? 0 : pageRows.length;
      els.count.textContent = shown + ' / ' + total;
    }
    if (els.prev) els.prev.disabled = state.page <= 1;
    if (els.next) els.next.disabled = state.page >= totalPages || total === 0;
  }

  function refreshTable() {
    updateMonthLabel();
    renderHead();
    renderBody();
  }

  function openDetails(row) {
    if (!els.detailsModal || !row) return;
    if (els.detailsBody) {
      els.detailsBody.innerHTML = (row.lines || []).map(function (line, i) {
        var badge = line.taxable ? '<span class="ss-taxable-badge">Taxable</span>' : '—';
        return '<tr>' +
          '<td>' + (i + 1) + '</td>' +
          '<td>' + line.name + '</td>' +
          '<td>' + badge + '</td>' +
          '<td>' + formatMoney(line.value) + '</td></tr>';
      }).join('');
    }
    if (els.detailsTotal) els.detailsTotal.textContent = String(Math.round(row.net));
    els.detailsModal.hidden = false;
  }

  function closeDetails() {
    if (els.detailsModal) els.detailsModal.hidden = true;
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
    if (els.monthBtn) {
      els.monthBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openMonthPop();
      });
    }
    if (els.yearPrev) {
      els.yearPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        state.pickerYear -= 1;
        renderMonthGrid();
      });
    }
    if (els.yearNext) {
      els.yearNext.addEventListener('click', function (e) {
        e.stopPropagation();
        state.pickerYear += 1;
        renderMonthGrid();
      });
    }
    if (els.monthGrid) {
      els.monthGrid.addEventListener('click', function (e) {
        e.stopPropagation();
        var btn = e.target.closest('[data-month]');
        if (!btn) return;
        state.selectedMonth = Number(btn.getAttribute('data-month'));
        state.selectedYear = state.pickerYear;
        state.page = 1;
        closePops();
        refreshTable();
      });
    }
    if (els.monthPop) els.monthPop.addEventListener('click', function (e) { e.stopPropagation(); });

    if (els.columnsBtn) {
      els.columnsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openColumnsPop();
      });
    }
    if (els.columnsPop) els.columnsPop.addEventListener('click', function (e) { e.stopPropagation(); });

    if (els.selectAll) {
      els.selectAll.addEventListener('click', function () {
        state.visible = toggleableColumns().map(function (c) { return c.id; });
        renderColumnsPop();
        refreshTable();
      });
    }

    if (els.columnsList) {
      els.columnsList.addEventListener('change', function (e) {
        var input = e.target;
        if (!input || !input.getAttribute('data-col')) return;
        var id = input.getAttribute('data-col');
        var idx = state.visible.indexOf(id);
        if (input.checked && idx === -1) state.visible.push(id);
        if (!input.checked && idx !== -1) state.visible.splice(idx, 1);
        refreshTable();
      });
    }

    if (els.body) {
      els.body.addEventListener('change', function (e) {
        var input = e.target;
        if (!input || !input.getAttribute('data-row-id')) return;
        var id = Number(input.getAttribute('data-row-id'));
        if (input.checked) state.selectedIds[id] = true;
        else delete state.selectedIds[id];
      });
      els.body.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-view-id]');
        if (!btn) return;
        var id = Number(btn.getAttribute('data-view-id'));
        var row = SAMPLE_ROWS.filter(function (r) { return r.id === id; })[0];
        openDetails(row);
      });
    }

    if (els.detailsClose) els.detailsClose.addEventListener('click', closeDetails);
    if (els.detailsModal) {
      els.detailsModal.addEventListener('click', function (e) {
        if (e.target === els.detailsModal) closeDetails();
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
        var totalPages = Math.max(1, Math.ceil(filteredRows().length / state.pageSize) || 1);
        if (state.page >= totalPages) return;
        state.page += 1;
        renderBody();
      });
    }

    if (els.topCheckIn) els.topCheckIn.addEventListener('click', toggleCheckIn);

    document.addEventListener('click', closePops);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDetails();
        closePops();
      }
    });
    window.addEventListener('resize', closePops);
  }

  initVisible();
  bind();
  updateCheckInBtn();
  tickClock();
  setInterval(tickClock, 1000);
  refreshTable();
})();
