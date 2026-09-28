/**
 * Lead Management Report — Active Leads Report
 */
(function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var COLUMNS = [
    { key: 'sno', label: 'S. No.', sort: false, on: true },
    { key: 'createdAt', label: 'Created At', sort: false, on: true },
    { key: 'name', label: 'Name', sort: true, on: true },
    { key: 'company', label: 'Company Name', sort: false, on: true },
    { key: 'createdBy', label: 'Created By', sort: true, on: true },
    { key: 'leadInfo', label: 'Lead Info', sort: false, on: true },
    { key: 'email', label: 'Email Id', sort: false, on: true },
    { key: 'mobile', label: 'Mobile No', sort: false, on: true },
    { key: 'assignTo', label: 'Assign To', sort: false, on: true },
    { key: 'source', label: 'Lead Source', sort: false, on: true },
    { key: 'status', label: 'Lead Status', sort: true, on: true },
    { key: 'rating', label: 'Rating', sort: true, on: true },
    { key: 'branch', label: 'Branch', sort: false, on: true },
    { key: 'district', label: 'District', sort: true, on: true },
    { key: 'description', label: 'Description', sort: true, on: true },
    { key: 'tags', label: 'Tags', sort: false, on: true },
    { key: 'scheduler', label: 'Scheduler', sort: false, on: true },
    { key: 'revenue', label: 'Annual Revenue', sort: false, on: false },
    { key: 'service', label: 'Service', sort: false, on: false },
    { key: 'website', label: 'Website', sort: false, on: false },
    { key: 'address', label: 'Address', sort: false, on: false },
    { key: 'country', label: 'Country', sort: false, on: false },
    { key: 'state', label: 'State', sort: false, on: false },
    { key: 'pincode', label: 'Pincode', sort: false, on: false }
  ];

  var ROWS = [];

  var clock = document.getElementById('dvTopClock');
  function tick() {
    if (!clock) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    clock.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }
  tick();
  setInterval(tick, 1000);

  /* Collapse */
  var filterCard = document.getElementById('lrFilterCard');
  var collapseBtn = document.getElementById('lrCollapseBtn');
  if (collapseBtn && filterCard) {
    collapseBtn.addEventListener('click', function () {
      var collapsed = filterCard.classList.toggle('is-collapsed');
      collapseBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      var label = collapseBtn.childNodes[collapseBtn.childNodes.length - 1];
      if (label && label.nodeType === 3) label.textContent = collapsed ? ' Expand' : ' Collapse';
    });
  }

  /* Report type dropdown */
  var typeBtn = document.getElementById('lrTypeBtn');
  var typeList = document.getElementById('lrTypeList');
  var typeLabel = document.getElementById('lrTypeLabel');
  function closeType() {
    if (!typeList || !typeBtn) return;
    typeList.hidden = true;
    typeBtn.setAttribute('aria-expanded', 'false');
  }
  if (typeBtn && typeList) {
    typeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeAssign();
      closeRange();
      closeCols();
      var open = typeList.hidden;
      typeList.hidden = !open;
      typeBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    typeList.querySelectorAll('li').forEach(function (li) {
      li.addEventListener('click', function () {
        typeLabel.textContent = li.getAttribute('data-value') || li.textContent;
        typeBtn.classList.add('has-value');
        typeList.querySelectorAll('li').forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
        li.setAttribute('aria-selected', 'true');
        closeType();
      });
    });
  }

  /* Assign To combo */
  var assignWrap = document.getElementById('lrAssignWrap');
  var assignInput = document.getElementById('lrAssignTo');
  var assignList = document.getElementById('lrAssignList');
  function closeAssign() {
    if (!assignWrap || !assignList) return;
    assignWrap.classList.remove('is-open');
    assignList.hidden = true;
  }
  function openAssign() {
    closeType();
    closeRange();
    closeCols();
    if (!assignWrap || !assignList) return;
    assignWrap.classList.add('is-open');
    assignList.hidden = false;
  }
  if (assignInput && assignList) {
    var assignItems = Array.prototype.slice.call(assignList.querySelectorAll('li'));
    function filterAssign() {
      var q = (assignInput.value || '').toLowerCase().trim();
      assignItems.forEach(function (li) {
        var text = (li.getAttribute('data-value') || li.textContent || '').toLowerCase();
        li.classList.toggle('is-hidden', q && text.indexOf(q) === -1);
      });
    }
    assignInput.addEventListener('focus', openAssign);
    assignInput.addEventListener('click', openAssign);
    assignInput.addEventListener('input', function () { openAssign(); filterAssign(); });
    assignItems.forEach(function (li) {
      li.addEventListener('mousedown', function (e) {
        e.preventDefault();
        assignInput.value = li.getAttribute('data-value') || li.textContent.trim();
        closeAssign();
        assignItems.forEach(function (x) { x.classList.remove('is-hidden'); });
      });
    });
  }

  /* Date range picker */
  var rangeWrap = document.getElementById('lrRangeWrap');
  var rangeInput = document.getElementById('lrDateRange');
  var picker = document.getElementById('lrRangepicker');
  var leftGrid = document.getElementById('lrCalLeftGrid');
  var rightGrid = document.getElementById('lrCalRightGrid');
  var leftLabel = document.getElementById('lrCalLeftLabel');
  var rightLabel = document.getElementById('lrCalRightLabel');
  var viewLeft = { y: 2026, m: 7 };
  var rangeStart = null;
  var rangeEnd = null;
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
    closeType();
    closeAssign();
    closeCols();
    if (rangeStart) viewLeft = { y: rangeStart.y, m: rangeStart.m };
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
    var startK = rangeStart ? key(rangeStart) : -1;
    var endK = rangeEnd ? key(rangeEnd) : -1;
    for (var i = 0; i < totalCells; i++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lr-cal-day';
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
      if (rangeStart && (k === startK || k === endK)) btn.classList.add('is-range-edge');
      else if (rangeStart && rangeEnd && k > startK && k < endK) btn.classList.add('is-in-range');
      btn.textContent = String(dayNum);
      btn.setAttribute('data-y', String(cellY));
      btn.setAttribute('data-m', String(cellM));
      btn.setAttribute('data-d', String(dayNum));
      btn.addEventListener('click', onPick);
      grid.appendChild(btn);
    }
  }
  function renderBoth() {
    renderMonth(leftGrid, leftLabel, viewLeft);
    renderMonth(rightGrid, rightLabel, addMonths(viewLeft, 1));
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
      rangeInput.value = fmt(rangeStart) + ' → ' + fmt(rangeEnd);
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

  /* Columns panel */
  var colsWrap = document.getElementById('lrColsWrap');
  var colsBtn = document.getElementById('lrColsBtn');
  var colsPanel = document.getElementById('lrColsPanel');
  var colsList = document.getElementById('lrColsList');
  var selectAllBtn = document.getElementById('lrSelectAll');

  function closeCols() {
    if (!colsPanel || !colsBtn) return;
    colsPanel.hidden = true;
    colsBtn.setAttribute('aria-expanded', 'false');
  }

  function renderColsPanel() {
    if (!colsList) return;
    colsList.innerHTML = COLUMNS.map(function (col, i) {
      return '<li data-idx="' + i + '">' +
        '<span class="lr-cols-drag" aria-hidden="true"></span>' +
        '<label><input type="checkbox" data-key="' + col.key + '"' + (col.on ? ' checked' : '') + '>' +
        col.label + '</label></li>';
    }).join('');
    colsList.querySelectorAll('input').forEach(function (inp) {
      inp.addEventListener('change', function () {
        var keyName = inp.getAttribute('data-key');
        COLUMNS.forEach(function (c) {
          if (c.key === keyName) c.on = inp.checked;
        });
        renderTable();
      });
    });
  }

  if (colsBtn && colsPanel) {
    colsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeType();
      closeAssign();
      closeRange();
      var open = colsPanel.hidden;
      colsPanel.hidden = !open;
      colsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', function () {
      var allOn = COLUMNS.every(function (c) { return c.on; });
      COLUMNS.forEach(function (c) { c.on = !allOn; });
      renderColsPanel();
      renderTable();
    });
  }

  function renderTable() {
    var head = document.getElementById('lrTableHead');
    var body = document.getElementById('lrTableBody');
    var empty = document.getElementById('lrEmpty');
    var count = document.getElementById('lrPageCount');
    if (!head || !body) return;

    head.innerHTML = COLUMNS.map(function (col) {
      var sort = col.sort ? ' &#8693;' : '';
      return '<th class="' + (col.on ? '' : 'is-hidden') + '" data-key="' + col.key + '">' +
        col.label + sort + '</th>';
    }).join('');

    if (!ROWS.length) {
      body.innerHTML = '';
      if (empty) empty.classList.remove('is-hidden');
    } else {
      if (empty) empty.classList.add('is-hidden');
      body.innerHTML = ROWS.map(function (row, i) {
        return '<tr>' + COLUMNS.map(function (col) {
          var val = col.key === 'sno' ? String(i + 1) : (row[col.key] || '--');
          return '<td class="' + (col.on ? '' : 'is-hidden') + '">' + val + '</td>';
        }).join('') + '</tr>';
      }).join('');
    }
    if (count) count.textContent = ROWS.length + ' / ' + ROWS.length;
  }

  var result = document.getElementById('lrResult');
  var generateBtn = document.getElementById('lrGenerateBtn');
  if (generateBtn && result) {
    generateBtn.addEventListener('click', function () {
      result.classList.add('is-visible');
      renderTable();
      result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  var excelBtn = document.getElementById('lrExcelBtn');
  if (excelBtn) {
    excelBtn.addEventListener('click', function () {
      var visible = COLUMNS.filter(function (c) { return c.on; });
      var rows = [visible.map(function (c) { return c.label; })];
      ROWS.forEach(function (row, i) {
        rows.push(visible.map(function (c) {
          return c.key === 'sno' ? String(i + 1) : String(row[c.key] || '');
        }));
      });
      var csv = rows.map(function (r) {
        return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
      }).join('\n');
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'lead-management-report.csv';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.lr-type-wrap')) closeType();
    if (!e.target.closest('#lrAssignWrap')) closeAssign();
    if (!e.target.closest('#lrRangeWrap')) closeRange();
    if (!e.target.closest('#lrColsWrap')) closeCols();
  });

  renderColsPanel();
  renderTable();
})();
