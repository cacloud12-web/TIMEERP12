(function () {
  'use strict';

  var CLIENTS = [
    '(21) Internal', '(174) SAURABH BHARDWAJ', '(173) SAURABH BHARDWAJ HUF',
    '(TH296) THE GOLD REALTY', '(LA3720) law seva management private limited',
    '(145) PERFECT PAIR', '(TA119098) TATA MOTORS PASSENGER VEHICLES LIMITED', '(SA128007) Saksham'
  ];

  var EMPLOYEES = [
    'Tarun Gaur', 'Suhanshi Rawat', 'SONIYA KASHYAP', 'Hardik rawat', 'SIMRAN KASHYAP',
    'Aastha Tyagi', 'Shivam Kumar', 'Aakash', 'Monu Kumar', 'Kamal Kant Sharma',
    'Saurabh Bhardwaj', 'Anupam', 'Dev Aggarwal', 'CA Rakesh Sharma'
  ];

  var BRANCHES = ['Bluemon Wealth Management', 'Law Seva Head Office', 'Delhi Branch', 'Mumbai Branch'];

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var VISITORS = [
    {
      from: '30 May 2026, 03:31 PM', to: '30 May 2026, 03:32 PM',
      fromIso: '2026-05-30 15:31:59', toIso: '2026-05-30 15:32:03',
      client: '(174) SAURABH BHARDWAJ', contactName: '-', contactPhone: '9540175500',
      authorized: true, partner: 'Saurabh Bhardwaj', branch: 'Bluemon Wealth Management',
      responsible: 'CA Rakesh Sharma', empTags: ['4353'], notes: '-', attachments: '-'
    }
  ];

  var filters = { client: '', employee: '', start: '', end: '' };
  var modalMode = 'create';
  var editingIdx = -1;
  var deleteIdx = -1;
  var selectedEmps = [];
  var activeDtField = 'from';
  var dtState = { year: 2026, month: 4, day: 30, h: 15, m: 31, s: 59 };
  var rangeState = { year: 2026, month: 7, day: 19 };

  var clock = document.getElementById('crmTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  function toast(title, msg) {
    if (window.DashboardShell) DashboardShell.toast(title, msg);
  }

  function parseDisplayDate(str) {
    if (!str) return new Date();
    var m = str.match(/^(\d{1,2})\s+(\w{3})\s+(\d{4}),\s+(\d{1,2}):(\d{2})\s+(AM|PM)$/i);
    if (!m) return new Date();
    var mi = MONTHS.indexOf(m[2]);
    if (mi < 0) return new Date();
    var h = parseInt(m[4], 10);
    if (m[6].toUpperCase() === 'PM' && h < 12) h += 12;
    if (m[6].toUpperCase() === 'AM' && h === 12) h = 0;
    return new Date(parseInt(m[3], 10), mi, parseInt(m[1], 10), h, parseInt(m[5], 10), 0);
  }

  function formatDisplayDate(d) {
    var h = d.getHours(), ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return String(d.getDate()).padStart(2, '0') + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear() +
      ', ' + String(h).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + ' ' + ap;
  }

  function formatIsoDateTime(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0') + ' ' + String(d.getHours()).padStart(2, '0') + ':' +
      String(d.getMinutes()).padStart(2, '0') + ':' + String(d.getSeconds()).padStart(2, '0');
  }

  function parseIsoDateTime(str) {
    if (!str) return new Date();
    var p = str.split(/[\s:-]/);
    return new Date(+p[0], +p[1] - 1, +p[2], +p[3] || 0, +p[4] || 0, +p[5] || 0);
  }

  function setDtFromDate(d) {
    dtState.year = d.getFullYear();
    dtState.month = d.getMonth();
    dtState.day = d.getDate();
    dtState.h = d.getHours();
    dtState.m = d.getMinutes();
    dtState.s = d.getSeconds();
  }

  function getFilteredRows() {
    return VISITORS.filter(function (r) {
      if (filters.client && r.client.toLowerCase().indexOf(filters.client.toLowerCase()) === -1) return false;
      if (filters.employee && r.responsible.toLowerCase().indexOf(filters.employee.toLowerCase()) === -1) return false;
      return true;
    });
  }

  function renderTable() {
    var rows = getFilteredRows();
    var tbody = document.getElementById('mvrTableBody');
    tbody.innerHTML = rows.map(function (r, i) {
      return '<tr data-i="' + i + '">' +
        '<td class="mvr-th-check"><input type="checkbox" class="mvr-row-check" data-i="' + i + '" aria-label="Select row"></td>' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + r.from + '</td><td>' + r.to + '</td><td>' + r.client + '</td>' +
        '<td>' + r.contactName + '</td><td>' + r.contactPhone + '</td>' +
        '<td>' + (r.authorized ? 'Yes' : 'No') + '</td>' +
        '<td>' + r.partner + '</td><td>' + r.branch + '</td>' +
        '<td>' + r.responsible + '</td><td>' + r.notes + '</td><td>' + r.attachments + '</td>' +
        '<td class="mvr-td-actions"><div class="mvr-actions">' +
        '<button type="button" class="mvr-act-edit" data-action="edit" data-i="' + i + '" aria-label="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg></button>' +
        '<button type="button" class="mvr-act-del" data-action="delete" data-i="' + i + '" aria-label="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>' +
        '</div></td></tr>';
    }).join('');
    var total = rows.length;
    document.getElementById('mvrCount').textContent = total + ' / ' + total;
    document.getElementById('mvrPageTotal').textContent = '1';
    document.getElementById('mvrPageInput').value = '1';
    document.getElementById('mvrCheckAll').checked = false;
  }

  /* Filter combos */
  function closeCombos(except) {
    document.querySelectorAll('.mvr-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }

  function renderComboMenu(combo, q) {
    var key = combo.getAttribute('data-list');
    var data = key === 'client' ? CLIENTS : EMPLOYEES;
    var qq = (q || '').toLowerCase();
    combo.querySelector('.mvr-combo__menu').innerHTML = data.filter(function (n) {
      return !qq || n.toLowerCase().indexOf(qq) !== -1;
    }).map(function (n) { return '<div class="mvr-combo__item">' + n + '</div>'; }).join('') ||
      '<div class="mvr-combo__item">No matches</div>';
  }

  document.querySelectorAll('.mvr-combo').forEach(function (combo) {
    var input = combo.querySelector('input');
    var menu = combo.querySelector('.mvr-combo__menu');
    var key = combo.getAttribute('data-list');
    function open() { renderComboMenu(combo, input.value); closeCombos(combo); combo.classList.add('is-open'); }
    input.addEventListener('focus', open);
    input.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    input.addEventListener('input', function () { renderComboMenu(combo, input.value); combo.classList.add('is-open'); });
    menu.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.mvr-combo__item');
      if (!item || item.textContent.trim() === 'No matches') return;
      e.preventDefault();
      input.value = item.textContent.trim();
      filters[key] = key === 'client' ? input.value.replace(/^\([^)]+\)\s*/, '') : input.value;
      combo.classList.remove('is-open');
      renderTable();
    });
  });

  /* Range date picker */
  function renderRangeCal(el, monthOffset) {
    var y = rangeState.year, m = rangeState.month + monthOffset;
    if (m > 11) { y++; m -= 12; }
    if (m < 0) { y--; m += 12; }
    var first = new Date(y, m, 1), startDay = first.getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var prevDays = new Date(y, m, 0).getDate();
    var html = '<div class="mvr-cal__head"><span>' + MONTHS[m] + ' ' + y + '</span>' +
      (monthOffset === 0
        ? '<div class="mvr-cal__nav"><button type="button" data-nav="y-prev">«</button><button type="button" data-nav="m-prev">‹</button></div>'
        : '<div class="mvr-cal__nav"><button type="button" data-nav="m-next">›</button><button type="button" data-nav="y-next">»</button></div>') +
      '</div><div class="mvr-cal__grid">';
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function (d) { html += '<span class="mvr-cal__dow">' + d + '</span>'; });
    var i;
    for (i = 0; i < startDay; i++) html += '<button type="button" class="mvr-cal__day is-other" data-day="' + (prevDays - startDay + i + 1) + '" data-off="-1">' + (prevDays - startDay + i + 1) + '</button>';
    for (i = 1; i <= daysInMonth; i++) {
      var cls = 'mvr-cal__day' + (i === rangeState.day && m === rangeState.month && y === rangeState.year ? ' is-selected' : '');
      html += '<button type="button" class="' + cls + '" data-day="' + i + '" data-off="0" data-m="' + m + '" data-y="' + y + '">' + i + '</button>';
    }
    var rem = (startDay + daysInMonth) % 7;
    if (rem) for (i = 1; i <= 7 - rem; i++) html += '<button type="button" class="mvr-cal__day is-other" data-day="' + i + '" data-off="1">' + i + '</button>';
    html += '</div>';
    el.innerHTML = html;
  }

  function renderRangeCals() {
    renderRangeCal(document.getElementById('mvrCalLeft'), 0);
    renderRangeCal(document.getElementById('mvrCalRight'), 1);
  }

  var dateBtn = document.getElementById('mvrDateBtn');
  var datePop = document.getElementById('mvrDatePop');

  dateBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    datePop.hidden = !datePop.hidden;
    dateBtn.classList.toggle('is-open', !datePop.hidden);
    if (!datePop.hidden) renderRangeCals();
  });

  datePop.addEventListener('click', function (e) {
    var nav = e.target.closest('[data-nav]');
    if (nav) {
      var n = nav.getAttribute('data-nav');
      if (n === 'm-prev') { rangeState.month--; if (rangeState.month < 0) { rangeState.month = 11; rangeState.year--; } }
      else if (n === 'm-next') { rangeState.month++; if (rangeState.month > 11) { rangeState.month = 0; rangeState.year++; } }
      else if (n === 'y-prev') rangeState.year--;
      else if (n === 'y-next') rangeState.year++;
      renderRangeCals();
      return;
    }
    var dayBtn = e.target.closest('.mvr-cal__day');
    if (dayBtn) {
      var off = parseInt(dayBtn.getAttribute('data-off'), 10);
      if (off === -1) { rangeState.month--; if (rangeState.month < 0) { rangeState.month = 11; rangeState.year--; } }
      else if (off === 1) { rangeState.month++; if (rangeState.month > 11) { rangeState.month = 0; rangeState.year++; } }
      else {
        rangeState.year = parseInt(dayBtn.getAttribute('data-y'), 10);
        rangeState.month = parseInt(dayBtn.getAttribute('data-m'), 10);
      }
      rangeState.day = parseInt(dayBtn.getAttribute('data-day'), 10);
      renderRangeCals();
    }
  });

  document.getElementById('mvrDateApply').addEventListener('click', function () {
    var iso = rangeState.year + '-' + String(rangeState.month + 1).padStart(2, '0') + '-' + String(rangeState.day).padStart(2, '0');
    document.getElementById('mvrDateStart').textContent = iso.split('-').reverse().join('/');
    document.getElementById('mvrDateEnd').textContent = iso.split('-').reverse().join('/');
    filters.start = iso;
    filters.end = iso;
    dateBtn.classList.add('has-value');
    datePop.hidden = true;
    dateBtn.classList.remove('is-open');
    renderTable();
  });

  document.getElementById('mvrDateClear').addEventListener('click', function () {
    document.getElementById('mvrDateStart').textContent = 'Start date';
    document.getElementById('mvrDateEnd').textContent = 'End date';
    filters.start = '';
    filters.end = '';
    dateBtn.classList.remove('has-value');
    datePop.hidden = true;
    dateBtn.classList.remove('is-open');
    renderTable();
  });

  document.getElementById('mvrExportBtn').addEventListener('click', function () {
    toast('Export', 'Visitor list exported to Excel.');
  });

  document.getElementById('mvrCheckAll').addEventListener('change', function () {
    document.querySelectorAll('.mvr-row-check').forEach(function (cb) { cb.checked = document.getElementById('mvrCheckAll').checked; });
  });

  /* Modal */
  var modal = document.getElementById('mvrModal');
  var dtPop = document.getElementById('mvrDtPop');

  function closeModalCombos(except) {
    document.querySelectorAll('.mvr-modal-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }

  function closeDtPop() {
    dtPop.hidden = true;
    document.querySelectorAll('.mvr-dt-field').forEach(function (el) { el.classList.remove('is-open'); });
  }

  function getModalList(key) {
    if (key === 'modalClient') return CLIENTS;
    if (key === 'modalBranch') return BRANCHES;
    if (key === 'modalEmployee') return EMPLOYEES;
    return [];
  }

  function renderEmpTags() {
    document.getElementById('mvrEmpTags').innerHTML = selectedEmps.map(function (e, i) {
      return '<span class="mvr-tag">' + e + '<button type="button" class="mvr-tag__x" data-rm="' + i + '" aria-label="Remove">×</button></span>';
    }).join('');
  }

  function renderModalComboMenu(combo, q) {
    var key = combo.getAttribute('data-list');
    var data = getModalList(key);
    var qq = (q || '').toLowerCase();
    combo.querySelector('.mvr-modal-combo__menu').innerHTML = data.filter(function (n) {
      return !qq || n.toLowerCase().indexOf(qq) !== -1;
    }).map(function (n) { return '<div class="mvr-modal-combo__item">' + n + '</div>'; }).join('') ||
      '<div class="mvr-modal-combo__item">No matches</div>';
  }

  document.querySelectorAll('.mvr-modal-combo').forEach(function (combo) {
    var input = combo.querySelector('input');
    var menu = combo.querySelector('.mvr-modal-combo__menu');
    var key = combo.getAttribute('data-list');
    function open() { renderModalComboMenu(combo, input ? input.value : ''); closeModalCombos(combo); closeDtPop(); combo.classList.add('is-open'); }
    if (input) {
      input.addEventListener('focus', open);
      input.addEventListener('click', function (e) { e.stopPropagation(); open(); });
      if (key !== 'modalBranch') input.addEventListener('input', function () { renderModalComboMenu(combo, input.value); combo.classList.add('is-open'); });
    }
    menu.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.mvr-modal-combo__item');
      if (!item || item.textContent.trim() === 'No matches') return;
      e.preventDefault();
      if (key === 'modalEmployee') {
        var val = item.textContent.trim();
        if (selectedEmps.indexOf(val) === -1) selectedEmps.push(val);
        if (input) input.value = '';
        renderEmpTags();
      } else if (input) {
        input.value = item.textContent.trim();
      }
      combo.classList.remove('is-open');
    });
  });

  document.getElementById('mvrEmpTags').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-rm]');
    if (!btn) return;
    selectedEmps.splice(parseInt(btn.getAttribute('data-rm'), 10), 1);
    renderEmpTags();
  });

  function resetModalForm() {
    document.getElementById('mvrClient').value = '';
    document.getElementById('mvrBranch').value = '';
    document.getElementById('mvrFrom').value = '';
    document.getElementById('mvrTo').value = '';
    document.getElementById('mvrEmployees').value = '';
    document.getElementById('mvrNotes').value = '';
    document.getElementById('mvrAuthorized').checked = false;
    document.getElementById('mvrFileList').textContent = '';
    selectedEmps = [];
    renderEmpTags();
    setDtFromDate(new Date());
  }

  function openModal(mode, idx) {
    modalMode = mode;
    editingIdx = idx != null ? idx : -1;
    document.getElementById('mvrModalTitle').textContent = mode === 'create' ? 'Create visitor' : 'Edit visitor';
    document.getElementById('mvrModalSubmit').textContent = mode === 'create' ? 'Create' : 'Update';
    document.getElementById('mvrAuthField').hidden = mode === 'create';
    resetModalForm();
    if (mode === 'edit' && idx >= 0) {
      var r = VISITORS[idx];
      document.getElementById('mvrClient').value = r.client;
      document.getElementById('mvrBranch').value = r.branch;
      document.getElementById('mvrFrom').value = r.fromIso;
      document.getElementById('mvrTo').value = r.toIso;
      document.getElementById('mvrNotes').value = r.notes === '-' ? '' : r.notes;
      document.getElementById('mvrAuthorized').checked = r.authorized;
      selectedEmps = (r.empTags || []).slice();
      renderEmpTags();
    }
    closeDtPop();
    closeModalCombos();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    editingIdx = -1;
    closeDtPop();
    closeModalCombos();
  }

  document.getElementById('mvrAddBtn').addEventListener('click', function () { openModal('create'); });
  document.getElementById('mvrModalClose').addEventListener('click', closeModal);
  document.getElementById('mvrModalCancel').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  document.getElementById('mvrModalSubmit').addEventListener('click', function () {
    var client = document.getElementById('mvrClient').value.trim();
    var branch = document.getElementById('mvrBranch').value.trim();
    var fromVal = document.getElementById('mvrFrom').value.trim();
    var toVal = document.getElementById('mvrTo').value.trim();
    if (!client || !branch || !fromVal || !toVal) {
      toast('Required', 'Fill Client, Branch, From, and To.');
      return;
    }
    var fromD = parseIsoDateTime(fromVal);
    var toD = parseIsoDateTime(toVal);
    var payload = {
      from: formatDisplayDate(fromD), to: formatDisplayDate(toD),
      fromIso: fromVal, toIso: toVal,
      client: client, contactName: '-', contactPhone: '9540175500',
      authorized: document.getElementById('mvrAuthorized').checked,
      partner: 'Saurabh Bhardwaj', branch: branch,
      responsible: selectedEmps.length ? selectedEmps[selectedEmps.length - 1] : 'CA Rakesh Sharma',
      empTags: selectedEmps.slice(),
      notes: document.getElementById('mvrNotes').value.trim() || '-',
      attachments: document.getElementById('mvrFileList').textContent.trim() || '-'
    };
    if (modalMode === 'create') VISITORS.unshift(payload);
    else if (editingIdx >= 0) Object.assign(VISITORS[editingIdx], payload);
    closeModal();
    renderTable();
    toast(modalMode === 'create' ? 'Created' : 'Updated', 'Visitor record saved.');
  });

  /* Modal datetime picker */
  function renderDtCal() {
    var cal = document.getElementById('mvrDtCal');
    var first = new Date(dtState.year, dtState.month, 1), startDay = first.getDay();
    var daysInMonth = new Date(dtState.year, dtState.month + 1, 0).getDate();
    var prevDays = new Date(dtState.year, dtState.month, 0).getDate();
    var html = '<div class="mvr-dt-cal__head"><span>' + MONTHS[dtState.month] + ' ' + dtState.year + '</span>' +
      '<div class="mvr-dt-cal__nav"><button type="button" data-nav="m-prev">‹</button><button type="button" data-nav="m-next">›</button></div></div><div class="mvr-dt-cal__grid">';
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function (d) { html += '<span class="mvr-dt-cal__dow">' + d + '</span>'; });
    var i;
    for (i = 0; i < startDay; i++) html += '<button type="button" class="mvr-dt-cal__day is-other" data-day="' + (prevDays - startDay + i + 1) + '" data-off="-1">' + (prevDays - startDay + i + 1) + '</button>';
    for (i = 1; i <= daysInMonth; i++) {
      html += '<button type="button" class="mvr-dt-cal__day' + (i === dtState.day ? ' is-selected' : '') + '" data-day="' + i + '" data-off="0">' + i + '</button>';
    }
    html += '</div>';
    cal.innerHTML = html;
  }

  function renderDtTimeCols() {
    ['mvrDtHours', 'mvrDtMins', 'mvrDtSecs'].forEach(function (id, idx) {
      var col = document.getElementById(id);
      var max = idx === 0 ? 24 : 60;
      var cur = idx === 0 ? dtState.h : idx === 1 ? dtState.m : dtState.s;
      var html = '';
      for (var i = 0; i < max; i++) html += '<button type="button" class="mvr-dt-time__opt' + (i === cur ? ' is-selected' : '') + '" data-val="' + i + '">' + String(i).padStart(2, '0') + '</button>';
      col.innerHTML = html;
    });
  }

  function syncDtInput() {
    var d = new Date(dtState.year, dtState.month, dtState.day, dtState.h, dtState.m, dtState.s);
    var val = formatIsoDateTime(d);
    document.getElementById(activeDtField === 'from' ? 'mvrFrom' : 'mvrTo').value = val;
  }

  document.querySelectorAll('.mvr-dt-field').forEach(function (field) {
    field.addEventListener('click', function (e) {
      e.stopPropagation();
      activeDtField = field.getAttribute('data-dt');
      var cur = document.getElementById(activeDtField === 'from' ? 'mvrFrom' : 'mvrTo').value;
      setDtFromDate(cur ? parseIsoDateTime(cur) : new Date());
      renderDtCal();
      renderDtTimeCols();
      closeModalCombos();
      document.querySelectorAll('.mvr-dt-field').forEach(function (el) { el.classList.remove('is-open'); });
      field.classList.add('is-open');
      var rect = field.getBoundingClientRect();
      var modalRect = modal.querySelector('.mvr-modal').getBoundingClientRect();
      dtPop.style.top = (rect.bottom - modalRect.top + 4) + 'px';
      dtPop.hidden = false;
    });
  });

  dtPop.addEventListener('click', function (e) {
    var nav = e.target.closest('[data-nav]');
    if (nav) {
      if (nav.getAttribute('data-nav') === 'm-prev') { dtState.month--; if (dtState.month < 0) { dtState.month = 11; dtState.year--; } }
      else { dtState.month++; if (dtState.month > 11) { dtState.month = 0; dtState.year++; } }
      renderDtCal();
      return;
    }
    var dayBtn = e.target.closest('.mvr-dt-cal__day');
    if (dayBtn) {
      var off = parseInt(dayBtn.getAttribute('data-off'), 10);
      if (off === -1) { dtState.month--; if (dtState.month < 0) { dtState.month = 11; dtState.year--; } }
      dtState.day = parseInt(dayBtn.getAttribute('data-day'), 10);
      renderDtCal();
      syncDtInput();
      return;
    }
    var tOpt = e.target.closest('.mvr-dt-time__opt');
    if (tOpt) {
      var col = tOpt.closest('.mvr-dt-time__col');
      var part = col.getAttribute('data-part');
      var val = parseInt(tOpt.getAttribute('data-val'), 10);
      if (part === 'h') dtState.h = val;
      else if (part === 'm') dtState.m = val;
      else dtState.s = val;
      renderDtTimeCols();
      syncDtInput();
    }
  });

  document.getElementById('mvrDtNow').addEventListener('click', function () {
    setDtFromDate(new Date());
    renderDtCal();
    renderDtTimeCols();
    syncDtInput();
  });

  document.getElementById('mvrDtOk').addEventListener('click', function () {
    syncDtInput();
    closeDtPop();
  });

  document.getElementById('mvrUploadBtn').addEventListener('click', function () {
    document.getElementById('mvrFileInput').click();
  });

  document.getElementById('mvrFileInput').addEventListener('change', function () {
    var names = Array.from(this.files || []).map(function (f) { return f.name; });
    document.getElementById('mvrFileList').textContent = names.join(', ');
  });

  /* Delete popover */
  var delPop = document.getElementById('mvrDelPop');

  function showDeletePop(btn, idx) {
    deleteIdx = idx;
    var rect = btn.getBoundingClientRect();
    delPop.hidden = false;
    delPop.style.top = (rect.top - delPop.offsetHeight - 8) + 'px';
    delPop.style.left = (rect.left + rect.width / 2 - 140) + 'px';
  }

  function hideDeletePop() {
    delPop.hidden = true;
    deleteIdx = -1;
  }

  document.getElementById('mvrDelNo').addEventListener('click', hideDeletePop);
  document.getElementById('mvrDelYes').addEventListener('click', function () {
    if (deleteIdx >= 0) {
      var realIdx = VISITORS.indexOf(getFilteredRows()[deleteIdx]);
      if (realIdx !== -1) VISITORS.splice(realIdx, 1);
      renderTable();
      toast('Deleted', 'Visitor record removed.');
    }
    hideDeletePop();
  });

  document.getElementById('mvrTableBody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (!btn) return;
    var action = btn.getAttribute('data-action');
    var idx = parseInt(btn.getAttribute('data-i'), 10);
    var row = getFilteredRows()[idx];
    if (!row) return;
    var realIdx = VISITORS.indexOf(row);
    if (action === 'edit') openModal('edit', realIdx);
    else if (action === 'delete') showDeletePop(btn, idx);
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mvr-combo')) closeCombos();
    if (!e.target.closest('.mvr-modal-combo')) closeModalCombos();
    if (!e.target.closest('.mvr-date-range')) {
      datePop.hidden = true;
      dateBtn.classList.remove('is-open');
    }
    if (!e.target.closest('.mvr-dt-field') && !e.target.closest('.mvr-dt-pop')) closeDtPop();
    if (!e.target.closest('.mvr-del-pop') && !e.target.closest('.mvr-act-del')) hideDeletePop();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!modal.hidden) closeModal();
      else hideDeletePop();
    }
  });

  renderTable();
})();
