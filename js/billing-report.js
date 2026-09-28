/**
 * Billing Report page interactions
 */
(function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var clock = document.getElementById('dvTopClock');
  function tick() {
    if (!clock) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    clock.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }
  tick();
  setInterval(tick, 1000);

  var filterCard = document.getElementById('brFilterCard');
  var collapseBtn = document.getElementById('brCollapseBtn');
  if (collapseBtn && filterCard) {
    collapseBtn.addEventListener('click', function () {
      var collapsed = filterCard.classList.toggle('is-collapsed');
      collapseBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      var label = collapseBtn.childNodes[collapseBtn.childNodes.length - 1];
      if (label && label.nodeType === 3) label.textContent = collapsed ? ' Expand' : ' Collapse';
    });
  }

  /* Report type dropdown */
  var typeWrap = document.getElementById('brTypeWrap');
  var typeBtn = document.getElementById('brTypeBtn');
  var typeMenu = document.getElementById('brTypeMenu');
  var typeValue = document.getElementById('brTypeValue');
  var filtersRevenue = document.getElementById('brFiltersRevenue');
  var filtersTds = document.getElementById('brFiltersTds');
  var resultRevenue = document.getElementById('brResultRevenue');
  var resultTds = document.getElementById('brResultTds');
  var currentType = 'Daily Revenue';

  function isTdsLike(type) {
    return /TDS|Expense|Service Request|Tax Report/i.test(type || '');
  }

  function applyReportType(type) {
    currentType = type || 'Daily Revenue';
    if (typeValue) typeValue.textContent = currentType;
    if (typeMenu) {
      typeMenu.querySelectorAll('[data-type]').forEach(function (li) {
        var on = li.getAttribute('data-type') === currentType;
        li.classList.toggle('is-selected', on);
        li.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
    var tds = isTdsLike(currentType);
    if (filtersRevenue) filtersRevenue.hidden = tds;
    if (filtersTds) filtersTds.hidden = !tds;
    if (resultRevenue) resultRevenue.hidden = tds;
    if (resultTds) resultTds.hidden = !tds;
  }

  function openTypeMenu() {
    if (!typeWrap || !typeMenu || !typeBtn) return;
    typeMenu.hidden = false;
    typeWrap.classList.add('is-open');
    typeBtn.setAttribute('aria-expanded', 'true');
  }
  function closeTypeMenu() {
    if (!typeWrap || !typeMenu || !typeBtn) return;
    typeMenu.hidden = true;
    typeWrap.classList.remove('is-open');
    typeBtn.setAttribute('aria-expanded', 'false');
  }

  if (typeBtn && typeMenu) {
    typeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (typeMenu.hidden) openTypeMenu(); else closeTypeMenu();
    });
    typeMenu.addEventListener('click', function (e) {
      var li = e.target.closest('[data-type]');
      if (!li) return;
      applyReportType(li.getAttribute('data-type'));
      closeTypeMenu();
    });
  }

  applyReportType(currentType);

  var result = document.getElementById('brResult');
  var generateBtn = document.getElementById('brGenerateBtn');
  if (generateBtn && result) {
    generateBtn.addEventListener('click', function () {
      result.classList.add('is-visible');
      result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  var excelBtn = document.getElementById('brExcelBtn');
  if (excelBtn) {
    excelBtn.addEventListener('click', function () {
      var rows = [['Date', 'Total']];
      document.querySelectorAll('#brDataTable tbody tr').forEach(function (tr) {
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
      a.download = 'billing-report.csv';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  /* Chart tooltip */
  var tip = document.getElementById('brTooltip');
  var plot = document.querySelector('.br-chart__plot');
  document.querySelectorAll('.br-bar-col').forEach(function (col) {
    col.addEventListener('mouseenter', function (e) {
      if (!tip || !plot) return;
      var raw = col.getAttribute('data-tip') || '';
      var parts = raw.split('|');
      tip.innerHTML = '<strong>' + (parts[0] || '') + '</strong>• total: ' + (parts[1] || '');
      tip.hidden = false;
      var rect = plot.getBoundingClientRect();
      var cRect = col.getBoundingClientRect();
      tip.style.left = (cRect.left - rect.left + cRect.width / 2 - 60) + 'px';
      tip.style.top = Math.max(8, cRect.top - rect.top - 52) + 'px';
    });
    col.addEventListener('mouseleave', function () {
      if (tip) tip.hidden = true;
    });
  });

  /* Combobox */
  function closeAllCombos(except) {
    document.querySelectorAll('.br-combo').forEach(function (wrap) {
      if (except && wrap === except) return;
      wrap.classList.remove('is-open');
      var list = wrap.querySelector('.br-combo__list');
      if (list) list.hidden = true;
    });
  }

  document.querySelectorAll('.br-combo').forEach(function (wrap) {
    var inp = wrap.querySelector('.br-combo__input');
    var list = wrap.querySelector('.br-combo__list');
    if (!inp || !list) return;
    var items = Array.prototype.slice.call(list.querySelectorAll('li'));

    function open() {
      closeAllCombos(wrap);
      closeRange();
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

  /* Date range picker */
  var rangeWrap = document.getElementById('brRangeWrap');
  var rangeInput = document.getElementById('brDateRange');
  var picker = document.getElementById('brRangepicker');
  var leftGrid = document.getElementById('brCalLeftGrid');
  var rightGrid = document.getElementById('brCalRightGrid');
  var leftLabel = document.getElementById('brCalLeftLabel');
  var rightLabel = document.getElementById('brCalRightLabel');
  var viewLeft = { y: 2026, m: 7 };
  var rangeStart = { y: 2026, m: 7, d: 14 };
  var rangeEnd = { y: 2026, m: 7, d: 21 };
  var picking = 'start';

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function fmt(p) { return pad(p.d) + '-' + pad(p.m + 1) + '-' + p.y; }
  function key(p) { return p.y * 10000 + (p.m + 1) * 100 + p.d; }
  function addMonths(base, n) {
    var m = base.m + n, y = base.y;
    while (m > 11) { m -= 12; y++; }
    while (m < 0) { m += 12; y--; }
    return { y: y, m: m };
  }
  function closeRange() {
    if (!picker || !rangeWrap || !rangeInput) return;
    picker.hidden = true;
    rangeWrap.classList.remove('is-open');
    rangeInput.setAttribute('aria-expanded', 'false');
  }
  function openRange() {
    if (!picker || !rangeWrap || !rangeInput) return;
    closeAllCombos();
    viewLeft = { y: rangeStart.y, m: rangeStart.m };
    picking = 'start';
    renderBoth();
    picker.hidden = false;
    rangeWrap.classList.add('is-open');
    rangeInput.setAttribute('aria-expanded', 'true');
  }
  function renderMonth(grid, labelEl, view) {
    if (!grid || !labelEl) return;
    labelEl.textContent = MONTHS[view.m] + ' ' + view.y;
    grid.innerHTML = '';
    var first = new Date(view.y, view.m, 1);
    var startPad = first.getDay();
    var daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    var prevDays = new Date(view.y, view.m, 0).getDate();
    var totalCells = Math.ceil((startPad + daysInMonth) / 7) * 7;
    var startK = key(rangeStart);
    var endK = key(rangeEnd);
    for (var i = 0; i < totalCells; i++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'br-cal-day';
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
      var k = key(cell);
      if (muted) btn.classList.add('is-muted');
      if (k === startK || k === endK) btn.classList.add('is-range-edge');
      else if (k > startK && k < endK) btn.classList.add('is-in-range');
      btn.textContent = String(dayNum);
      btn.setAttribute('data-y', String(cellY));
      btn.setAttribute('data-m', String(cellM));
      btn.setAttribute('data-d', String(dayNum));
      btn.addEventListener('click', onPick);
      grid.appendChild(btn);
    }
  }
  function renderBoth() {
    var right = addMonths(viewLeft, 1);
    renderMonth(leftGrid, leftLabel, viewLeft);
    renderMonth(rightGrid, rightLabel, right);
  }
  function onPick() {
    var cell = {
      y: parseInt(this.getAttribute('data-y'), 10),
      m: parseInt(this.getAttribute('data-m'), 10),
      d: parseInt(this.getAttribute('data-d'), 10)
    };
    if (picking === 'start') {
      rangeStart = cell;
      rangeEnd = cell;
      picking = 'end';
    } else {
      if (key(cell) < key(rangeStart)) {
        rangeEnd = rangeStart;
        rangeStart = cell;
      } else {
        rangeEnd = cell;
      }
      picking = 'start';
      rangeInput.value = fmt(rangeStart) + ' — ' + fmt(rangeEnd);
      closeRange();
    }
    renderBoth();
  }

  if (rangeInput && picker) {
    rangeInput.addEventListener('click', function () {
      if (picker.hidden) openRange();
      else closeRange();
    });
    picker.querySelectorAll('[data-nav]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nav = btn.getAttribute('data-nav');
        if (nav === 'prev-month') viewLeft = addMonths(viewLeft, -1);
        if (nav === 'next-month') viewLeft = addMonths(viewLeft, 1);
        if (nav === 'prev-year') viewLeft = { y: viewLeft.y - 1, m: viewLeft.m };
        if (nav === 'next-year') viewLeft = { y: viewLeft.y + 1, m: viewLeft.m };
        renderBoth();
      });
    });
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.br-combo')) closeAllCombos();
    if (!e.target.closest('#brRangeWrap')) closeRange();
    if (!e.target.closest('#brTypeWrap')) closeTypeMenu();
  });
})();
