/**
 * Customers Report page interactions
 */
(function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DATA = [
    { m: 0, count: 0, deleted: 0 },
    { m: 1, count: 0, deleted: 0 },
    { m: 2, count: 0, deleted: 0 },
    { m: 3, count: 0, deleted: 0 },
    { m: 4, count: 0, deleted: 0 },
    { m: 5, count: 0, deleted: 0 },
    { m: 6, count: 2, deleted: 4 },
    { m: 7, count: 0, deleted: 0 },
    { m: 8, count: 0, deleted: 0 },
    { m: 9, count: 0, deleted: 0 },
    { m: 10, count: 0, deleted: 0 },
    { m: 11, count: 0, deleted: 0 }
  ];
  var YEAR = 2026;

  var clock = document.getElementById('dvTopClock');
  function tick() {
    if (!clock) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    clock.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }
  tick();
  setInterval(tick, 1000);

  var filterCard = document.getElementById('crFilterCard');
  var collapseBtn = document.getElementById('crCollapseBtn');
  if (collapseBtn && filterCard) {
    collapseBtn.addEventListener('click', function () {
      var collapsed = filterCard.classList.toggle('is-collapsed');
      collapseBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      var label = collapseBtn.childNodes[collapseBtn.childNodes.length - 1];
      if (label && label.nodeType === 3) label.textContent = collapsed ? ' Expand' : ' Collapse';
    });
  }

  var result = document.getElementById('crResult');
  var generateBtn = document.getElementById('crGenerateBtn');
  if (generateBtn && result) {
    generateBtn.addEventListener('click', function () {
      result.classList.add('is-visible');
      render();
      result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function render() {
    var bars = document.getElementById('crBars');
    var body = document.getElementById('crTableBody');
    if (bars) {
      bars.innerHTML = DATA.map(function (row, i) {
        var h = row.count > 0 ? Math.max(8, (row.count / 2) * 100) : 0;
        var showLabel = i % 2 === 0;
        return '<div class="cr-bar-col">' +
          (row.count ? '<div class="cr-bar" style="height:' + h + '%"></div>' : '<div class="cr-bar" style="height:0"></div>') +
          (showLabel ? '<span class="cr-bar-label">' + MONTHS[row.m] + '-' + YEAR + '</span>' : '') +
          '</div>';
      }).join('');
    }
    if (body) {
      body.innerHTML = DATA.map(function (row) {
        return '<tr><td>' + MONTHS[row.m] + ' - ' + YEAR + '</td><td>' + row.count + '</td><td>' + row.deleted + '</td></tr>';
      }).join('');
    }
  }

  var excelBtn = document.getElementById('crExcelBtn');
  if (excelBtn) {
    excelBtn.addEventListener('click', function () {
      var rows = [['Date', 'Count', 'Deleted Count']];
      DATA.forEach(function (row) {
        rows.push([MONTHS[row.m] + ' - ' + YEAR, String(row.count), String(row.deleted)]);
      });
      var csv = rows.map(function (r) {
        return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
      }).join('\n');
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'customers-report.csv';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  /* Month range picker */
  var wrap = document.getElementById('crMonthWrap');
  var input = document.getElementById('crMonthRange');
  var picker = document.getElementById('crMonthpicker');
  var leftGrid = document.getElementById('crMonthLeft');
  var rightGrid = document.getElementById('crMonthRight');
  var yearLeftEl = document.getElementById('crYearLeft');
  var yearRightEl = document.getElementById('crYearRight');
  var leftYear = 2026;
  var start = { y: 2026, m: 6 };
  var end = { y: 2026, m: 6 };
  var picking = 'start';

  function fmt(p) { return MONTHS[p.m] + '-' + p.y; }
  function closePicker() {
    if (!picker || !wrap || !input) return;
    picker.hidden = true;
    wrap.classList.remove('is-open');
    input.setAttribute('aria-expanded', 'false');
  }
  function openPicker() {
    if (!picker || !wrap || !input) return;
    leftYear = start.y;
    picking = 'start';
    renderMonths();
    picker.hidden = false;
    wrap.classList.add('is-open');
    input.setAttribute('aria-expanded', 'true');
  }
  function renderYearGrid(grid, year) {
    if (!grid) return;
    grid.innerHTML = '';
    MONTHS.forEach(function (name, idx) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cr-month-btn';
      btn.textContent = name;
      var isStart = start.y === year && start.m === idx;
      var isEnd = end.y === year && end.m === idx;
      var afterStart = year > start.y || (year === start.y && idx > start.m);
      var beforeEnd = year < end.y || (year === end.y && idx < end.m);
      if (isStart || isEnd) btn.classList.add('is-selected');
      else if (afterStart && beforeEnd) btn.classList.add('is-in-range');
      btn.addEventListener('click', function () {
        var cell = { y: year, m: idx };
        if (picking === 'start') {
          start = cell;
          end = cell;
          picking = 'end';
        } else {
          if (cell.y < start.y || (cell.y === start.y && cell.m < start.m)) {
            end = start;
            start = cell;
          } else {
            end = cell;
          }
          picking = 'start';
          input.value = fmt(start) + ' → ' + fmt(end);
          closePicker();
        }
        renderMonths();
      });
      grid.appendChild(btn);
    });
  }
  function renderMonths() {
    if (yearLeftEl) yearLeftEl.textContent = String(leftYear);
    if (yearRightEl) yearRightEl.textContent = String(leftYear + 1);
    renderYearGrid(leftGrid, leftYear);
    renderYearGrid(rightGrid, leftYear + 1);
  }

  if (input && picker) {
    input.addEventListener('click', function () {
      if (picker.hidden) openPicker();
      else closePicker();
    });
    picker.querySelectorAll('[data-nav]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nav = btn.getAttribute('data-nav');
        if (nav === 'prev-year') leftYear--;
        if (nav === 'next-year') leftYear++;
        renderMonths();
      });
    });
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('#crMonthWrap')) closePicker();
  });

  render();
})();
