/**
 * Document Vault Report — DSC Report / Customer Password
 */
(function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var DSC_COLUMNS = [
    { key: 'client', label: 'Client', sort: true, on: true },
    { key: 'holder', label: 'DSC Holder', sort: true, on: true },
    { key: 'created', label: 'Created Date', sort: true, on: true },
    { key: 'validTo', label: 'Valid To', sort: true, on: true },
    { key: 'handedOver', label: 'Handed Over', sort: true, on: true },
    { key: 'receiver', label: 'Receiver', sort: true, on: true },
    { key: 'branch', label: 'Branch', sort: false, on: true },
    { key: 'handedToClient', label: 'Is Handed Over To Client', sort: true, on: true },
    { key: 'dscNumber', label: 'DSC Number', sort: false, on: true },
    { key: 'responsible', label: 'Responsible Person', sort: false, on: true },
    { key: 'validFrom', label: 'Valid From', sort: false, on: false },
    { key: 'pan', label: 'PAN No.', sort: false, on: false },
    { key: 'dscType', label: 'DSC Type', sort: false, on: false },
    { key: 'din', label: 'DIN No.', sort: false, on: false },
    { key: 'email', label: 'Email', sort: false, on: false },
    { key: 'category', label: 'Category', sort: false, on: false },
    { key: 'mobile', label: 'Mobile', sort: false, on: false },
    { key: 'location', label: 'Location', sort: false, on: false },
    { key: 'receivedOn', label: 'Received On', sort: false, on: false }
  ];

  var PASSWORD_COLUMNS = [
    { key: 'client', label: 'Client', sort: true, on: true },
    { key: 'portal', label: 'Portal', sort: true, on: true },
    { key: 'username', label: 'Username', sort: true, on: true },
    { key: 'updated', label: 'Updated On', sort: true, on: true },
    { key: 'branch', label: 'Branch', sort: false, on: true },
    { key: 'responsible', label: 'Responsible Person', sort: false, on: true }
  ];

  var ROWS = [];
  var COLUMNS = DSC_COLUMNS.slice();
  var reportType = 'DSC Report';

  var clock = document.getElementById('dvTopClock');
  function tick() {
    if (!clock) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    clock.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }
  tick();
  setInterval(tick, 1000);

  function closeAllPopups(except) {
    document.querySelectorAll('.dvr-combo').forEach(function (wrap) {
      if (except && wrap === except) return;
      wrap.classList.remove('is-open');
      var list = wrap.querySelector('.dvr-combo__list');
      if (list) list.hidden = true;
    });
    document.querySelectorAll('.dvr-range-wrap').forEach(function (wrap) {
      if (except && wrap === except) return;
      wrap.classList.remove('is-open');
      var picker = wrap.querySelector('.dvr-rangepicker');
      var input = wrap.querySelector('input');
      if (picker) picker.hidden = true;
      if (input) input.setAttribute('aria-expanded', 'false');
    });
    closeType(except === 'type');
    closeCols(except === 'cols');
  }

  /* Collapse */
  var filterCard = document.getElementById('dvrFilterCard');
  var collapseBtn = document.getElementById('dvrCollapseBtn');
  if (collapseBtn && filterCard) {
    collapseBtn.addEventListener('click', function () {
      var collapsed = filterCard.classList.toggle('is-collapsed');
      collapseBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      var label = collapseBtn.childNodes[collapseBtn.childNodes.length - 1];
      if (label && label.nodeType === 3) label.textContent = collapsed ? ' Expand' : ' Collapse';
    });
  }

  /* Report type */
  var typeBtn = document.getElementById('dvrTypeBtn');
  var typeList = document.getElementById('dvrTypeList');
  var typeLabel = document.getElementById('dvrTypeLabel');
  function closeType(keep) {
    if (keep || !typeList || !typeBtn) return;
    typeList.hidden = true;
    typeBtn.setAttribute('aria-expanded', 'false');
  }
  if (typeBtn && typeList) {
    typeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = typeList.hidden;
      closeAllPopups('type');
      typeList.hidden = !open;
      typeBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    typeList.querySelectorAll('li').forEach(function (li) {
      li.addEventListener('click', function () {
        reportType = li.getAttribute('data-value') || li.textContent;
        typeLabel.textContent = reportType;
        typeBtn.classList.add('has-value');
        typeList.querySelectorAll('li').forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
        li.setAttribute('aria-selected', 'true');
        COLUMNS = reportType === 'Customer Password'
          ? PASSWORD_COLUMNS.map(function (c) { return Object.assign({}, c); })
          : DSC_COLUMNS.map(function (c) { return Object.assign({}, c); });
        closeType();
        renderColsPanel();
        renderTable();
      });
    });
  }

  /* Combos */
  document.querySelectorAll('.dvr-combo').forEach(function (wrap) {
    var inp = wrap.querySelector('.dvr-combo__input');
    var list = wrap.querySelector('.dvr-combo__list');
    if (!inp || !list) return;
    var items = Array.prototype.slice.call(list.querySelectorAll('li'));
    function open() {
      closeAllPopups(wrap);
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

  /* Date range pickers */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function fmt(p) { return pad(p.d) + '-' + pad(p.m + 1) + '-' + p.y; }
  function key(p) { return p.y * 10000 + (p.m + 1) * 100 + p.d; }
  function addMonths(base, n) {
    var m = base.m + n, y = base.y;
    while (m > 11) { m -= 12; y++; }
    while (m < 0) { m += 12; y--; }
    return { y: y, m: m };
  }

  function initRange(wrap, initialStart, initialEnd) {
    var input = wrap.querySelector('input');
    var picker = wrap.querySelector('.dvr-rangepicker');
    var leftGrid = wrap.querySelector('[data-left-grid]');
    var rightGrid = wrap.querySelector('[data-right-grid]');
    var leftLabel = wrap.querySelector('[data-left-label]');
    var rightLabel = wrap.querySelector('[data-right-label]');
    var viewLeft = { y: (initialStart || { y: 2026, m: 7 }).y, m: (initialStart || { y: 2026, m: 7 }).m };
    var rangeStart = initialStart ? Object.assign({}, initialStart) : null;
    var rangeEnd = initialEnd ? Object.assign({}, initialEnd) : null;
    var picking = 'start';

    function closeRange() {
      picker.hidden = true;
      wrap.classList.remove('is-open');
      input.setAttribute('aria-expanded', 'false');
    }
    function openRange() {
      closeAllPopups(wrap);
      if (rangeStart) viewLeft = { y: rangeStart.y, m: rangeStart.m };
      picking = 'start';
      renderBoth();
      picker.hidden = false;
      wrap.classList.add('is-open');
      input.setAttribute('aria-expanded', 'true');
    }
    function renderMonth(grid, labelEl, view) {
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
        btn.className = 'dvr-cal-day';
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
        input.value = fmt(rangeStart) + ' → ' + fmt(rangeEnd);
        closeRange();
      }
      renderBoth();
    }

    input.addEventListener('click', function () {
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

  document.querySelectorAll('.dvr-range-wrap').forEach(function (wrap) {
    var isDate = wrap.getAttribute('data-range') === 'date';
    if (isDate) {
      initRange(wrap, { y: 2026, m: 7, d: 14 }, { y: 2026, m: 7, d: 21 });
    } else {
      initRange(wrap, null, null);
    }
  });

  /* Columns */
  var colsBtn = document.getElementById('dvrColsBtn');
  var colsPanel = document.getElementById('dvrColsPanel');
  var colsList = document.getElementById('dvrColsList');
  var selectAll = document.getElementById('dvrSelectAll');

  function closeCols(keep) {
    if (keep || !colsPanel || !colsBtn) return;
    colsPanel.hidden = true;
    colsBtn.setAttribute('aria-expanded', 'false');
  }

  function renderColsPanel() {
    if (!colsList) return;
    var optionals = COLUMNS.filter(function (c) {
      return ['validFrom', 'pan', 'dscType', 'din', 'email', 'category', 'mobile', 'location', 'receivedOn'].indexOf(c.key) !== -1;
    });
    var listCols = (reportType === 'DSC Report' && optionals.length) ? optionals : COLUMNS;
    colsList.innerHTML = listCols.map(function (col) {
      return '<li><label><input type="checkbox" data-key="' + col.key + '"' + (col.on ? ' checked' : '') + '> ' + col.label + '</label></li>';
    }).join('');
    colsList.querySelectorAll('input').forEach(function (inp) {
      inp.addEventListener('change', function () {
        var keyName = inp.getAttribute('data-key');
        COLUMNS.forEach(function (c) {
          if (c.key === keyName) c.on = inp.checked;
        });
        syncSelectAll();
        renderTable();
      });
    });
    syncSelectAll();
  }

  function syncSelectAll() {
    if (!selectAll) return;
    var listed = colsList ? colsList.querySelectorAll('input') : [];
    var allOn = listed.length && Array.prototype.every.call(listed, function (i) { return i.checked; });
    selectAll.checked = !!allOn;
  }

  if (colsBtn && colsPanel) {
    colsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = colsPanel.hidden;
      closeAllPopups('cols');
      colsPanel.hidden = !open;
      colsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (selectAll) {
    selectAll.addEventListener('change', function () {
      var listed = colsList ? colsList.querySelectorAll('input') : [];
      Array.prototype.forEach.call(listed, function (inp) {
        inp.checked = selectAll.checked;
        var keyName = inp.getAttribute('data-key');
        COLUMNS.forEach(function (c) {
          if (c.key === keyName) c.on = selectAll.checked;
        });
      });
      renderTable();
    });
  }

  function renderTable() {
    var head = document.getElementById('dvrTableHead');
    var body = document.getElementById('dvrTableBody');
    var empty = document.getElementById('dvrEmpty');
    var count = document.getElementById('dvrPageCount');
    var total = document.getElementById('dvrTotalCount');
    if (!head || !body) return;

    head.innerHTML = COLUMNS.map(function (col) {
      var sort = col.sort ? ' &#8693;' : '';
      return '<th class="' + (col.on ? '' : 'is-hidden') + '" data-key="' + col.key + '">' + col.label + sort + '</th>';
    }).join('');

    if (!ROWS.length) {
      body.innerHTML = '';
      if (empty) empty.classList.remove('is-hidden');
    } else {
      if (empty) empty.classList.add('is-hidden');
      body.innerHTML = ROWS.map(function (row) {
        return '<tr>' + COLUMNS.map(function (col) {
          return '<td class="' + (col.on ? '' : 'is-hidden') + '">' + (row[col.key] || '--') + '</td>';
        }).join('') + '</tr>';
      }).join('');
    }
    if (count) count.textContent = ROWS.length + ' / ' + ROWS.length;
    if (total) total.textContent = String(ROWS.length);
  }

  var result = document.getElementById('dvrResult');
  var generateBtn = document.getElementById('dvrGenerateBtn');
  if (generateBtn && result) {
    generateBtn.addEventListener('click', function () {
      result.classList.add('is-visible');
      renderTable();
      result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  var excelBtn = document.getElementById('dvrExcelBtn');
  if (excelBtn) {
    excelBtn.addEventListener('click', function () {
      var visible = COLUMNS.filter(function (c) { return c.on; });
      var rows = [visible.map(function (c) { return c.label; })];
      ROWS.forEach(function (row) {
        rows.push(visible.map(function (c) { return String(row[c.key] || ''); }));
      });
      var csv = rows.map(function (r) {
        return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
      }).join('\n');
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'document-vault-report.csv';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dvr-type-wrap')) closeType();
    if (!e.target.closest('.dvr-combo')) {
      document.querySelectorAll('.dvr-combo').forEach(function (wrap) {
        wrap.classList.remove('is-open');
        var list = wrap.querySelector('.dvr-combo__list');
        if (list) list.hidden = true;
      });
    }
    if (!e.target.closest('.dvr-range-wrap')) {
      document.querySelectorAll('.dvr-range-wrap').forEach(function (wrap) {
        wrap.classList.remove('is-open');
        var picker = wrap.querySelector('.dvr-rangepicker');
        var input = wrap.querySelector('input');
        if (picker) picker.hidden = true;
        if (input) input.setAttribute('aria-expanded', 'false');
      });
    }
    if (!e.target.closest('#dvrColsWrap')) closeCols();
  });

  renderColsPanel();
  renderTable();
})();
