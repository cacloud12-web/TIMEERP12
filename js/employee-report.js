/**
 * Employee Report page interactions
 */
(function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var PAGE_SIZE = 20;

  var SAMPLE = [
    { on: '21-08-2026 5:40 AM', emp: 'Dev Aggarwal', client: 'Saksham', task: 'Gst Filling 3B', action: 'Task Created' },
    { on: '21-08-2026 5:35 AM', emp: 'Dev Aggarwal', client: 'Saksham', task: 'Gst Filling R1', action: 'Task Created' },
    { on: '21-08-2026 4:12 AM', emp: 'Kamal Kant Sharma', client: '--', task: 'Gst Filling', action: 'Task status updated: OPEN -> PROCESSING.' },
    { on: '20-08-2026 6:20 PM', emp: 'SACHIN YADAV', client: 'law seva management private limited', task: 'Gst Filling', action: 'Task Stage B was Completed.' },
    { on: '20-08-2026 5:55 PM', emp: 'Kamal Kant Sharma', client: 'THE GOLD REALTY', task: 'GST Appeal', action: 'Task Created' },
    { on: '20-08-2026 4:40 PM', emp: 'Aakash', client: 'Saksham', task: 'Gst Filling R1', action: 'Task Created' },
    { on: '20-08-2026 3:18 PM', emp: 'Dev Aggarwal', client: 'PERFECT PAIR', task: 'Gst Filling 3B', action: 'Task status updated: PROCESSING -> COMPLETED.' },
    { on: '20-08-2026 2:05 PM', emp: 'SACHIN YADAV', client: 'Internal', task: 'Gst Filling', action: 'Task Created' },
    { on: '20-08-2026 1:22 PM', emp: 'Kamal Kant Sharma', client: 'Saksham', task: 'Gst Filling R1', action: 'Task Stage A was Completed.' },
    { on: '20-08-2026 11:48 AM', emp: 'Aakash', client: 'THE GOLD REALTY', task: 'GST Appeal', action: 'Task Created' },
    { on: '20-08-2026 10:30 AM', emp: 'Dev Aggarwal', client: 'law seva management private limited', task: 'Gst Filling', action: 'Task Created' },
    { on: '19-08-2026 7:10 PM', emp: 'SACHIN YADAV', client: 'Saksham', task: 'Gst Filling 3B', action: 'Task status updated: OPEN -> PROCESSING.' },
    { on: '19-08-2026 5:42 PM', emp: 'Kamal Kant Sharma', client: '--', task: 'Gst Filling R1', action: 'Task Created' },
    { on: '19-08-2026 4:15 PM', emp: 'Aakash', client: 'PERFECT PAIR', task: 'Gst Filling', action: 'Task Stage B was Completed.' },
    { on: '19-08-2026 2:50 PM', emp: 'Dev Aggarwal', client: 'THE GOLD REALTY', task: 'GST Appeal', action: 'Task Created' },
    { on: '19-08-2026 1:05 PM', emp: 'SACHIN YADAV', client: 'Saksham', task: 'Gst Filling 3B', action: 'Task Created' },
    { on: '19-08-2026 11:20 AM', emp: 'Kamal Kant Sharma', client: 'Internal', task: 'Gst Filling', action: 'Task status updated: PROCESSING -> UNDER REVIEW.' },
    { on: '18-08-2026 6:35 PM', emp: 'Aakash', client: 'law seva management private limited', task: 'Gst Filling R1', action: 'Task Created' },
    { on: '18-08-2026 4:00 PM', emp: 'Dev Aggarwal', client: 'Saksham', task: 'Gst Filling 3B', action: 'Task Stage A was Completed.' },
    { on: '18-08-2026 2:18 PM', emp: 'SACHIN YADAV', client: 'PERFECT PAIR', task: 'Gst Filling', action: 'Task Created' }
  ];

  /* Build 166 demo rows from sample */
  var ALL = [];
  for (var i = 0; i < 166; i++) {
    var s = SAMPLE[i % SAMPLE.length];
    ALL.push({
      on: s.on,
      emp: s.emp,
      client: s.client,
      task: s.task,
      action: s.action
    });
  }

  var page = 1;
  var totalPages = Math.max(1, Math.ceil(ALL.length / PAGE_SIZE));

  var clock = document.getElementById('dvTopClock');
  function tick() {
    if (!clock) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    clock.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }
  tick();
  setInterval(tick, 1000);

  var filterCard = document.getElementById('erFilterCard');
  var collapseBtn = document.getElementById('erCollapseBtn');
  if (collapseBtn && filterCard) {
    collapseBtn.addEventListener('click', function () {
      var collapsed = filterCard.classList.toggle('is-collapsed');
      collapseBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      var label = collapseBtn.childNodes[collapseBtn.childNodes.length - 1];
      if (label && label.nodeType === 3) label.textContent = collapsed ? ' Expand' : ' Collapse';
    });
  }

  var result = document.getElementById('erResult');
  var generateBtn = document.getElementById('erGenerateBtn');
  if (generateBtn && result) {
    generateBtn.addEventListener('click', function () {
      result.classList.add('is-visible');
      page = 1;
      renderTable();
      result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function renderTable() {
    var body = document.getElementById('erTableBody');
    if (!body) return;
    var start = (page - 1) * PAGE_SIZE;
    var rows = ALL.slice(start, start + PAGE_SIZE);
    body.innerHTML = rows.map(function (r) {
      return '<tr><td>' + r.on + '</td><td>' + r.emp + '</td><td>' + r.client + '</td><td>' + r.task + '</td><td>' + r.action + '</td></tr>';
    }).join('');
    var countEl = document.getElementById('erTotalCount');
    if (countEl) countEl.textContent = String(rows.length);
    var pageInput = document.getElementById('erPageInput');
    var pageTotal = document.getElementById('erPageTotal');
    var pageCount = document.getElementById('erPageCount');
    if (pageInput) pageInput.value = String(page);
    if (pageTotal) pageTotal.textContent = String(totalPages);
    if (pageCount) pageCount.textContent = rows.length + ' / ' + ALL.length;
    var prev = document.getElementById('erPrev');
    var next = document.getElementById('erNext');
    if (prev) prev.disabled = page <= 1;
    if (next) next.disabled = page >= totalPages;
  }

  var prevBtn = document.getElementById('erPrev');
  var nextBtn = document.getElementById('erNext');
  if (prevBtn) prevBtn.addEventListener('click', function () {
    if (page > 1) { page--; renderTable(); }
  });
  if (nextBtn) nextBtn.addEventListener('click', function () {
    if (page < totalPages) { page++; renderTable(); }
  });
  var pageInput = document.getElementById('erPageInput');
  if (pageInput) {
    pageInput.addEventListener('change', function () {
      var n = parseInt(pageInput.value, 10);
      if (isNaN(n) || n < 1) n = 1;
      if (n > totalPages) n = totalPages;
      page = n;
      renderTable();
    });
  }

  var excelBtn = document.getElementById('erExcelBtn');
  if (excelBtn) {
    excelBtn.addEventListener('click', function () {
      var rows = [['Action On', 'Employee Name', 'Client/Group Name', 'Task/SR Name', 'Action']];
      ALL.forEach(function (r) {
        rows.push([r.on, r.emp, r.client, r.task, r.action]);
      });
      var csv = rows.map(function (r) {
        return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
      }).join('\n');
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'employee-report.csv';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function closeAllCombos(except) {
    document.querySelectorAll('.er-combo').forEach(function (wrap) {
      if (except && wrap === except) return;
      wrap.classList.remove('is-open');
      var list = wrap.querySelector('.er-combo__list');
      if (list) list.hidden = true;
    });
  }

  document.querySelectorAll('.er-combo').forEach(function (wrap) {
    var inp = wrap.querySelector('.er-combo__input');
    var list = wrap.querySelector('.er-combo__list');
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

  var rangeWrap = document.getElementById('erRangeWrap');
  var rangeInput = document.getElementById('erDateRange');
  var picker = document.getElementById('erRangepicker');
  var leftGrid = document.getElementById('erCalLeftGrid');
  var rightGrid = document.getElementById('erCalRightGrid');
  var leftLabel = document.getElementById('erCalLeftLabel');
  var rightLabel = document.getElementById('erCalRightLabel');
  var viewLeft = { y: 2026, m: 7 };
  var rangeStart = { y: 2026, m: 7, d: 21 };
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
      btn.className = 'er-cal-day';
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
    if (!e.target.closest('.er-combo')) closeAllCombos();
    if (!e.target.closest('#erRangeWrap')) closeRange();
  });

  renderTable();
})();
