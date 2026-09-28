/**
 * Task Report page interactions
 */
(function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var clock = document.getElementById('dvTopClock');
  function tick() {
    if (!clock) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    clock.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    clock.setAttribute('datetime', d.toISOString());
  }
  tick();
  setInterval(tick, 1000);

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

  var result = document.getElementById('trResult');
  var generateBtn = document.getElementById('trGenerateBtn');
  if (generateBtn && result) {
    generateBtn.addEventListener('click', function () {
      result.classList.add('is-visible');
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
      a.download = 'task-report.csv';
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
    inp.addEventListener('input', function () {
      open();
      filter();
    });
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
  var view = { y: 2026, m: 7 }; /* Aug 2026 */
  var selected = { y: 2026, m: 7, d: 21 };

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
  });
})();
