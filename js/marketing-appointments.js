(function () {
  'use strict';

  var CLIENTS = [
    '(21) Internal', '(174) SAURABH BHARDWAJ', '(173) SAURABH BHARDWAJ HUF',
    '(TH296) THE GOLD REALTY', '(LA3720) law seva management p...', '(145) PERFECT PAIR',
    '(TA119098) TATA MOTORS PASSENGER VEHICLES LIMITED', '(SA128007) Saksham'
  ];

  var MODAL_CLIENTS = [
    '(21) Internal', '(174) SAURABH BHARDWAJ', '(173) SAURABH BHARDWAJ HUF',
    '(TH296) THE GOLD REALTY', '(LA3720) law seva management private limited',
    '(145) PERFECT PAIR', '(TA119098) TATA MOTORS PASSENGER VEHICLES LIMITED', '(SA128007) Saksham'
  ];

  var EMPLOYEES = [
    'Tarun Gaur', 'Suhanshi Rawat', 'SONIYA KASHYAP', 'Dev Aggarwal',
    'Ankit Sharma', 'SIMRAN KASHYAP', 'Saurabh Bhardwaj', 'k'
  ];

  var MODAL_EMPLOYEES = [
    'Aastha Tyagi', 'Shivam Kumar', 'Aakash', 'Monu Kumar', 'Kamal Kant Sharma',
    'Saurabh Bhardwaj', 'Anupam', 'Dev Aggarwal', 'Tarun Gaur', 'Ankit Sharma', 'SIMRAN KASHYAP'
  ];

  var REMIND_UNITS = ['Minutes', 'Hours', 'Days'];
  var STATUSES = ['Scheduled', 'Cancelled', 'Completed'];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var APPOINTMENTS = {
    pending: [
      { date: '05 Aug 2026, 02:45 PM', client: 'Internal', partner: 'Dev Aggarwal', createdBy: '-', reason: 'Demo', link: '', status: 'Scheduled', description: '', remindVal: '', remindUnit: '' },
      { date: '05 Aug 2026, 02:45 PM', client: 'THE GOLD REALTY', partner: 'Tarun Gaur', createdBy: '-', reason: 'Gst', link: '', status: 'Scheduled', description: '', remindVal: '', remindUnit: '' },
      { date: '05 Aug 2026, 02:45 PM', client: 'SAURABH BHARDWAJ HUF', partner: 'Ankit Sharma', createdBy: '-', reason: 'Gst', link: '', status: 'Scheduled', description: '', remindVal: '', remindUnit: '' }
    ],
    approved: [
      { date: '03 Aug 2026, 12:28 PM', client: 'THE GOLD REALTY', partner: 'Dev Aggarwal', createdBy: 'Dev Aggarwal', reason: 'Demo', link: '', status: 'Scheduled', description: '', remindVal: '15', remindUnit: 'Minutes' },
      { date: '03 Aug 2026, 12:28 PM', client: 'Saksham', partner: 'Tarun Gaur', createdBy: 'SIMRAN KASHYAP', reason: 'Interview', link: '', status: 'Scheduled', description: '', remindVal: '', remindUnit: '' },
      { date: '03 Aug 2026, 12:28 PM', client: 'SAURABH BHARDWAJ HUF', partner: 'Ankit Sharma', createdBy: 'Saurabh Bhardwaj', reason: 'sw', link: '', status: 'Scheduled', description: '', remindVal: '', remindUnit: '' },
      { date: '03 Aug 2026, 12:28 PM', client: 'Internal', partner: 'k', createdBy: 'Dev Aggarwal', reason: 'gst', link: '', status: 'Cancelled', description: '', remindVal: '', remindUnit: '' },
      { date: '03 Aug 2026, 12:28 PM', client: 'PERFECT PAIR', partner: 'Dev Aggarwal', createdBy: '-', reason: 'sdas', link: '', status: 'Scheduled', description: '', remindVal: '', remindUnit: '' },
      { date: '03 Aug 2026, 12:28 PM', client: 'SAURABH BHARDWAJ', partner: 'Tarun Gaur', createdBy: 'SIMRAN KASHYAP', reason: '-', link: 'https://meet.example.com/abc', status: 'Scheduled', description: '', remindVal: '', remindUnit: '' },
      { date: '03 Aug 2026, 12:28 PM', client: 'law seva management p...', partner: 'Ankit Sharma', createdBy: 'Saurabh Bhardwaj', reason: 'Demo', link: 'https://meet.example.com/xyz', status: 'Scheduled', description: '', remindVal: '', remindUnit: '' },
      { date: '03 Aug 2026, 12:28 PM', client: 'Internal', partner: 'Dev Aggarwal', createdBy: '-', reason: '-', link: '', status: 'Scheduled', description: '', remindVal: '', remindUnit: '' }
    ],
    rejected: [
      { date: '29 Jun 2026, 04:20 PM', client: 'Saksham', partner: 'Dev Aggarwal', createdBy: '-', reason: 'Gst', link: '', status: 'Scheduled', description: '', remindVal: '', remindUnit: '' },
      { date: '28 Jun 2026, 11:10 AM', client: 'THE GOLD REALTY', partner: 'Tarun Gaur', createdBy: 'SIMRAN KASHYAP', reason: 'Demo', link: 'https://meet.example.com/rej', status: 'Scheduled', description: '', remindVal: '', remindUnit: '' }
    ]
  };

  var currentTab = 'pending';
  var filters = { client: '', status: '', employee: '', start: '', end: '' };
  var editingRef = null;
  var modalMode = 'edit';
  var dtState = { year: 2026, month: 7, day: 5, h: 14, m: 45, s: 12 };

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

  function statusClass(s) {
    if (s === 'Cancelled') return 'cancelled';
    if (s === 'Completed') return 'completed';
    return 'scheduled';
  }

  function statusPillHtml(s) {
    return '<span class="map-status-dd__pill map-status-dd__pill--' + statusClass(s) + '">' + s + '</span>';
  }

  function filterStatusPillHtml(s) {
    return '<span class="map-combo__status-pill map-combo__status-pill--' + statusClass(s) + '">' + s + '</span>';
  }

  function modalStatusPillHtml(s) {
    return '<span class="map-combo__status-pill map-combo__status-pill--' + statusClass(s) + '">' + s + '</span>';
  }

  function clientLabel(name) {
    var n = (name || '').toLowerCase();
    for (var i = 0; i < MODAL_CLIENTS.length; i++) {
      if (MODAL_CLIENTS[i].toLowerCase().indexOf(n) !== -1) return MODAL_CLIENTS[i];
    }
    return name;
  }

  function clientNameFromLabel(label) {
    var m = (label || '').match(/^\([^)]+\)\s*(.+)$/);
    return m ? m[1].trim() : (label || '').trim();
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

  function setDtFromDate(d) {
    dtState.year = d.getFullYear();
    dtState.month = d.getMonth();
    dtState.day = d.getDate();
    dtState.h = d.getHours();
    dtState.m = d.getMinutes();
    dtState.s = d.getSeconds();
  }

  function getFilteredRows() {
    return APPOINTMENTS[currentTab].filter(function (r) {
      if (filters.client && r.client.toLowerCase().indexOf(filters.client.toLowerCase()) === -1 &&
          filters.client.toLowerCase().indexOf(r.client.toLowerCase()) === -1) return false;
      if (filters.status && r.status !== filters.status) return false;
      if (filters.employee && r.partner.toLowerCase().indexOf(filters.employee.toLowerCase()) === -1 &&
          (r.createdBy === '-' || r.createdBy.toLowerCase().indexOf(filters.employee.toLowerCase()) === -1)) return false;
      return true;
    });
  }

  function renderTable() {
    var tbody = document.getElementById('mapTableBody');
    var rows = getFilteredRows();
    var isPending = currentTab === 'pending';
    tbody.innerHTML = rows.map(function (r, i) {
      var linkCell = r.link ? '<a href="' + r.link + '" class="map-link" target="_blank" rel="noopener">Open</a>' : '-';
      var actions = isPending
        ? '<div class="map-actions"><button type="button" class="map-act-approve" data-action="approve" data-i="' + i + '">Approve</button><button type="button" class="map-act-reject" data-action="reject" data-i="' + i + '">Reject</button><button type="button" class="map-act-edit" data-action="edit" data-i="' + i + '" aria-label="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg></button></div>'
        : '<div class="map-actions"><button type="button" class="map-act-edit" data-action="edit" data-i="' + i + '" aria-label="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg></button></div>';
      var statusOpts = STATUSES.map(function (s) {
        return '<div class="map-status-dd__opt" data-status="' + s + '">' + statusPillHtml(s) + '</div>';
      }).join('');
      return '<tr data-i="' + i + '">' +
        '<td>' + (i + 1) + '</td><td>' + r.date + '</td><td>' + r.client + '</td><td>' + r.partner + '</td>' +
        '<td>' + r.createdBy + '</td><td>' + r.reason + '</td><td>' + linkCell + '</td>' +
        '<td><div class="map-status-dd" tabindex="0">' + statusPillHtml(r.status) +
        '<svg class="map-status-dd__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>' +
        '<div class="map-status-dd__menu">' + statusOpts + '</div></div></td><td>' + actions + '</td></tr>';
    }).join('');
    var total = rows.length;
    document.getElementById('mapCount').textContent = total + ' / ' + total;
    document.getElementById('mapPageTotal').textContent = '1';
    document.getElementById('mapPageInput').value = '1';
  }

  /* Edit modal */
  var editModal = document.getElementById('mapEditModal');
  var dtField = document.getElementById('mapDtField');
  var dtPop = document.getElementById('mapDtPop');
  var dtInput = document.getElementById('mapEditDateTime');

  function closeModalCombos(except) {
    document.querySelectorAll('.map-modal-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }

  function closeDtPop() {
    if (dtPop) dtPop.hidden = true;
    if (dtField) dtField.classList.remove('is-open');
  }

  function setModalUi(mode) {
    modalMode = mode;
    document.getElementById('mapEditTitle').textContent = mode === 'create' ? 'Create appointment' : 'Edit appointment';
    document.getElementById('mapModalSubmit').textContent = mode === 'create' ? 'Create' : 'Update';
  }

  function resetModalForm() {
    document.getElementById('mapEditClient').value = '';
    document.getElementById('mapEditEmployee').value = '';
    document.getElementById('mapEditDateTime').value = '';
    document.getElementById('mapEditReason').value = '';
    document.getElementById('mapEditDescription').value = '';
    document.getElementById('mapEditLink').value = '';
    document.getElementById('mapEditStatus').value = 'Scheduled';
    document.getElementById('mapEditRemindVal').value = '';
    document.getElementById('mapEditRemindUnit').value = '';
    toggleClearBtn('mapEditClientClear', '');
    toggleClearBtn('mapEditEmployeeClear', '');
    setDtFromDate(new Date());
  }

  function openModal(mode, row) {
    setModalUi(mode);
    if (mode === 'create') {
      editingRef = null;
      resetModalForm();
    } else if (row) {
      editingRef = { tab: currentTab, idx: APPOINTMENTS[currentTab].indexOf(row) };
      if (editingRef.idx < 0) return;
      var d = parseDisplayDate(row.date);
      setDtFromDate(d);
      document.getElementById('mapEditClient').value = clientLabel(row.client);
      document.getElementById('mapEditEmployee').value = row.partner;
      document.getElementById('mapEditDateTime').value = formatIsoDateTime(d);
      document.getElementById('mapEditReason').value = row.reason === '-' ? '' : row.reason;
      document.getElementById('mapEditDescription').value = row.description || '';
      document.getElementById('mapEditLink').value = row.link || '';
      document.getElementById('mapEditStatus').value = row.status;
      document.getElementById('mapEditRemindVal').value = row.remindVal || '';
      document.getElementById('mapEditRemindUnit').value = row.remindUnit || '';
      toggleClearBtn('mapEditClientClear', document.getElementById('mapEditClient').value);
      toggleClearBtn('mapEditEmployeeClear', document.getElementById('mapEditEmployee').value);
    }
    renderDtCal();
    renderDtTimeCols();
    closeDtPop();
    closeModalCombos();
    editModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function openEditModal(row) { openModal('edit', row); }
  function openCreateModal() { openModal('create'); }

  function closeEditModal() {
    editModal.hidden = true;
    document.body.style.overflow = '';
    editingRef = null;
    modalMode = 'edit';
    closeDtPop();
    closeModalCombos();
  }

  function toggleClearBtn(id, val) {
    var btn = document.getElementById(id);
    if (btn) btn.hidden = !val;
  }

  function getModalList(key) {
    if (key === 'modalClient') return MODAL_CLIENTS;
    if (key === 'modalEmployee') return MODAL_EMPLOYEES;
    if (key === 'modalStatus') return STATUSES;
    if (key === 'modalUnit') return REMIND_UNITS;
    return [];
  }

  function renderModalComboMenu(combo, q) {
    var key = combo.getAttribute('data-list');
    var menu = combo.querySelector('.map-modal-combo__menu');
    var data = getModalList(key);
    var qq = (q || '').toLowerCase();
    var html = '';
    if (key === 'modalStatus') {
      html = data.filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; })
        .map(function (n) { return '<div class="map-modal-combo__item">' + modalStatusPillHtml(n) + '</div>'; }).join('');
    } else {
      html = data.filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; })
        .map(function (n) {
          var active = combo.querySelector('input').value === n ? ' is-active' : '';
          return '<div class="map-modal-combo__item' + active + '">' + n + '</div>';
        }).join('');
    }
    menu.innerHTML = html || '<div class="map-modal-combo__item">No matches</div>';
  }

  document.querySelectorAll('.map-modal-combo').forEach(function (combo) {
    var input = combo.querySelector('input');
    var menu = combo.querySelector('.map-modal-combo__menu');
    var key = combo.getAttribute('data-list');
    function open() { renderModalComboMenu(combo, input.value); closeModalCombos(combo); closeDtPop(); combo.classList.add('is-open'); }
    input.addEventListener('focus', open);
    input.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    if (key !== 'modalStatus' && key !== 'modalUnit') input.addEventListener('input', function () { renderModalComboMenu(combo, input.value); combo.classList.add('is-open'); });
    menu.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.map-modal-combo__item');
      if (!item || item.textContent.trim() === 'No matches') return;
      e.preventDefault();
      if (key === 'modalStatus') {
        var pill = item.querySelector('.map-combo__status-pill');
        input.value = pill ? pill.textContent.trim() : item.textContent.trim();
      } else {
        input.value = item.textContent.trim();
      }
      combo.classList.remove('is-open');
      if (key === 'modalClient') toggleClearBtn('mapEditClientClear', input.value);
      if (key === 'modalEmployee') toggleClearBtn('mapEditEmployeeClear', input.value);
    });
  });

  document.getElementById('mapEditClientClear').addEventListener('click', function () {
    document.getElementById('mapEditClient').value = '';
    toggleClearBtn('mapEditClientClear', '');
  });
  document.getElementById('mapEditEmployeeClear').addEventListener('click', function () {
    document.getElementById('mapEditEmployee').value = '';
    toggleClearBtn('mapEditEmployeeClear', '');
  });

  document.getElementById('mapEditClose').addEventListener('click', closeEditModal);
  document.getElementById('mapEditCancel').addEventListener('click', closeEditModal);
  editModal.addEventListener('click', function (e) { if (e.target === editModal) closeEditModal(); });

  document.getElementById('mapModalSubmit').addEventListener('click', function () {
    var client = document.getElementById('mapEditClient').value.trim();
    var employee = document.getElementById('mapEditEmployee').value.trim();
    var dt = document.getElementById('mapEditDateTime').value.trim();
    var status = document.getElementById('mapEditStatus').value.trim();
    if (!client || !employee || !dt || !status) {
      toast('Required', 'Fill Client, Employee, Date & time, and Status.');
      return;
    }
    var d = new Date(dtState.year, dtState.month, dtState.day, dtState.h, dtState.m, dtState.s);
    var payload = {
      client: clientNameFromLabel(client),
      partner: employee,
      date: formatDisplayDate(d),
      createdBy: '-',
      reason: document.getElementById('mapEditReason').value.trim() || '-',
      description: document.getElementById('mapEditDescription').value.trim(),
      link: document.getElementById('mapEditLink').value.trim(),
      status: status,
      remindVal: document.getElementById('mapEditRemindVal').value.trim(),
      remindUnit: document.getElementById('mapEditRemindUnit').value.trim()
    };
    if (modalMode === 'create') {
      APPOINTMENTS[currentTab].unshift(payload);
      closeEditModal();
      renderTable();
      toast('Created', 'Appointment created for ' + payload.client + '.');
      return;
    }
    if (!editingRef) return;
    var row = APPOINTMENTS[editingRef.tab][editingRef.idx];
    Object.assign(row, payload);
    closeEditModal();
    renderTable();
    toast('Updated', 'Appointment updated for ' + row.client + '.');
  });

  /* Datetime picker */
  function renderDtCal() {
    var cal = document.getElementById('mapDtCal');
    var first = new Date(dtState.year, dtState.month, 1);
    var startDay = first.getDay();
    var daysInMonth = new Date(dtState.year, dtState.month + 1, 0).getDate();
    var prevDays = new Date(dtState.year, dtState.month, 0).getDate();
    var today = new Date();
    var html = '<div class="map-dt-cal__head"><span>' + MONTHS[dtState.month] + ' ' + dtState.year + '</span>' +
      '<div class="map-dt-cal__nav">' +
      '<button type="button" data-nav="y-prev">«</button><button type="button" data-nav="m-prev">‹</button>' +
      '<button type="button" data-nav="m-next">›</button><button type="button" data-nav="y-next">»</button></div></div>' +
      '<div class="map-dt-cal__grid">';
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function (d) { html += '<span class="map-dt-cal__dow">' + d + '</span>'; });
    for (var i = 0; i < startDay; i++) {
      var pd = prevDays - startDay + i + 1;
      html += '<button type="button" class="map-dt-cal__day is-other" data-day="' + pd + '" data-off="-1">' + pd + '</button>';
    }
    for (var d = 1; d <= daysInMonth; d++) {
      var cls = 'map-dt-cal__day';
      if (d === dtState.day) cls += ' is-selected';
      if (d === today.getDate() && dtState.month === today.getMonth() && dtState.year === today.getFullYear()) cls += ' is-today';
      html += '<button type="button" class="' + cls + '" data-day="' + d + '" data-off="0">' + d + '</button>';
    }
    var rem = (startDay + daysInMonth) % 7;
    if (rem) for (var n = 1; n <= 7 - rem; n++) html += '<button type="button" class="map-dt-cal__day is-other" data-day="' + n + '" data-off="1">' + n + '</button>';
    html += '</div>';
    cal.innerHTML = html;
  }

  function renderDtTimeCols() {
    ['mapDtHours', 'mapDtMins', 'mapDtSecs'].forEach(function (id, idx) {
      var col = document.getElementById(id);
      var max = idx === 0 ? 24 : 60;
      var cur = idx === 0 ? dtState.h : idx === 1 ? dtState.m : dtState.s;
      var html = '';
      for (var i = 0; i < max; i++) {
        html += '<button type="button" class="map-dt-time__opt' + (i === cur ? ' is-selected' : '') + '" data-val="' + i + '">' + String(i).padStart(2, '0') + '</button>';
      }
      col.innerHTML = html;
    });
  }

  function syncDtInput() {
    var d = new Date(dtState.year, dtState.month, dtState.day, dtState.h, dtState.m, dtState.s);
    dtInput.value = formatIsoDateTime(d);
  }

  dtInput.addEventListener('click', function (e) {
    e.stopPropagation();
    closeModalCombos();
    dtPop.hidden = !dtPop.hidden;
    dtField.classList.toggle('is-open', !dtPop.hidden);
  });

  dtPop.addEventListener('click', function (e) {
    var nav = e.target.closest('[data-nav]');
    if (nav) {
      var n = nav.getAttribute('data-nav');
      if (n === 'm-prev') { dtState.month--; if (dtState.month < 0) { dtState.month = 11; dtState.year--; } }
      else if (n === 'm-next') { dtState.month++; if (dtState.month > 11) { dtState.month = 0; dtState.year++; } }
      else if (n === 'y-prev') dtState.year--;
      else if (n === 'y-next') dtState.year++;
      renderDtCal();
      return;
    }
    var dayBtn = e.target.closest('.map-dt-cal__day');
    if (dayBtn) {
      var off = parseInt(dayBtn.getAttribute('data-off'), 10);
      var day = parseInt(dayBtn.getAttribute('data-day'), 10);
      if (off === -1) { dtState.month--; if (dtState.month < 0) { dtState.month = 11; dtState.year--; } }
      else if (off === 1) { dtState.month++; if (dtState.month > 11) { dtState.month = 0; dtState.year++; } }
      dtState.day = day;
      renderDtCal();
      syncDtInput();
      return;
    }
    var tOpt = e.target.closest('.map-dt-time__opt');
    if (tOpt) {
      var col = tOpt.closest('.map-dt-time__col');
      var part = col.getAttribute('data-part');
      var val = parseInt(tOpt.getAttribute('data-val'), 10);
      if (part === 'h') dtState.h = val;
      else if (part === 'm') dtState.m = val;
      else dtState.s = val;
      renderDtTimeCols();
      syncDtInput();
    }
  });

  document.getElementById('mapDtNow').addEventListener('click', function () {
    setDtFromDate(new Date());
    renderDtCal();
    renderDtTimeCols();
    syncDtInput();
  });

  document.getElementById('mapDtOk').addEventListener('click', function () {
    syncDtInput();
    closeDtPop();
  });

  /* Tabs */
  document.querySelectorAll('.map-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      currentTab = tab.getAttribute('data-tab');
      document.querySelectorAll('.map-tab').forEach(function (t) {
        var active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      renderTable();
    });
  });

  /* Filter combos */
  function closeCombos(except) {
    document.querySelectorAll('.map-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }

  function getList(key) {
    if (key === 'client') return CLIENTS;
    if (key === 'employee') return EMPLOYEES;
    if (key === 'status') return STATUSES;
    return [];
  }

  function renderComboMenu(combo, q) {
    var key = combo.getAttribute('data-list');
    var menu = combo.querySelector('.map-combo__menu');
    var data = getList(key);
    var qq = (q || '').toLowerCase();
    var html = key === 'status'
      ? data.filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; })
          .map(function (n) { return '<div class="map-combo__item">' + filterStatusPillHtml(n) + '</div>'; }).join('')
      : data.filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; })
          .map(function (n) { return '<div class="map-combo__item">' + n + '</div>'; }).join('');
    menu.innerHTML = html || '<div class="map-combo__item">No matches</div>';
  }

  document.querySelectorAll('.map-combo').forEach(function (combo) {
    var input = combo.querySelector('input');
    var menu = combo.querySelector('.map-combo__menu');
    var key = combo.getAttribute('data-list');
    function open() { renderComboMenu(combo, input.value); closeCombos(combo); combo.classList.add('is-open'); }
    input.addEventListener('focus', open);
    input.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    if (key !== 'status') input.addEventListener('input', function () { renderComboMenu(combo, input.value); combo.classList.add('is-open'); });
    menu.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.map-combo__item');
      if (!item || item.textContent.trim() === 'No matches') return;
      e.preventDefault();
      if (key === 'status') {
        var pill = item.querySelector('.map-combo__status-pill');
        input.value = pill ? pill.textContent.trim() : item.textContent.trim();
        filters.status = input.value;
      } else if (key === 'client') {
        input.value = item.textContent.trim();
        filters.client = input.value.replace(/^\([^)]+\)\s*/, '');
      } else {
        input.value = item.textContent.trim();
        filters.employee = input.value;
      }
      combo.classList.remove('is-open');
      renderTable();
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.map-combo')) closeCombos();
    if (!e.target.closest('.map-modal-combo')) closeModalCombos();
    if (!e.target.closest('.map-status-dd')) {
      document.querySelectorAll('.map-status-dd.is-open').forEach(function (el) { el.classList.remove('is-open'); });
    }
    if (!e.target.closest('.map-date-range')) {
      var pop = document.getElementById('mapDatePop');
      var btn = document.getElementById('mapDateBtn');
      if (pop) pop.hidden = true;
      if (btn) { btn.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
    }
    if (!e.target.closest('.map-dt-field')) closeDtPop();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !editModal.hidden) closeEditModal();
  });

  document.getElementById('mapTableBody').addEventListener('click', function (e) {
    var dd = e.target.closest('.map-status-dd');
    if (dd && !e.target.closest('.map-status-dd__opt')) {
      document.querySelectorAll('.map-status-dd.is-open').forEach(function (el) {
        if (el !== dd) el.classList.remove('is-open');
      });
      dd.classList.toggle('is-open');
      return;
    }
    var opt = e.target.closest('.map-status-dd__opt');
    if (opt && dd) {
      var tr = dd.closest('tr');
      var idx = parseInt(tr.getAttribute('data-i'), 10);
      var newStatus = opt.getAttribute('data-status');
      var rows = getFilteredRows();
      if (rows[idx]) {
        var orig = APPOINTMENTS[currentTab].indexOf(rows[idx]);
        if (orig !== -1) APPOINTMENTS[currentTab][orig].status = newStatus;
      }
      dd.classList.remove('is-open');
      renderTable();
      toast('Status', 'Updated to ' + newStatus + '.');
      return;
    }
    var btn = e.target.closest('[data-action]');
    if (!btn) return;
    var action = btn.getAttribute('data-action');
    var rowIdx = parseInt(btn.getAttribute('data-i'), 10);
    var row = getFilteredRows()[rowIdx];
    if (!row) return;
    if (action === 'approve') {
      APPOINTMENTS.pending.splice(APPOINTMENTS.pending.indexOf(row), 1);
      APPOINTMENTS.approved.unshift(Object.assign({}, row));
      toast('Approved', 'Appointment approved for ' + row.client + '.');
      renderTable();
    } else if (action === 'reject') {
      APPOINTMENTS.pending.splice(APPOINTMENTS.pending.indexOf(row), 1);
      APPOINTMENTS.rejected.unshift(Object.assign({}, row));
      toast('Rejected', 'Appointment rejected for ' + row.client + '.');
      renderTable();
    } else if (action === 'edit') openEditModal(row);
  });

  var dateBtn = document.getElementById('mapDateBtn');
  var datePop = document.getElementById('mapDatePop');
  var dateStartEl = document.getElementById('mapDateStart');
  var dateEndEl = document.getElementById('mapDateEnd');
  var startInput = document.getElementById('mapStartDate');
  var endInput = document.getElementById('mapEndDate');
  var dualCalEl = document.getElementById('mapDualCal');
  var calViewYear, calViewMonth, rangeStart = null, rangeEnd = null;

  (function initCalView() { var n = new Date(); calViewYear = n.getFullYear(); calViewMonth = n.getMonth(); })();

  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function fmtDate(d) { return pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1) + '/' + d.getFullYear(); }
  function toIso(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }

  function renderDualCal() {
    var DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    var today = new Date(); today.setHours(0,0,0,0);
    var html = '';
    for (var m = 0; m < 2; m++) {
      var vy = calViewYear, vm = calViewMonth + m;
      if (vm > 11) { vm -= 12; vy++; }
      var first = new Date(vy, vm, 1), startDay = first.getDay();
      var dim = new Date(vy, vm + 1, 0).getDate();
      var prevDim = new Date(vy, vm, 0).getDate();
      html += '<div class="map-dual-cal__month"><div class="map-dual-cal__head">';
      if (m === 0) html += '<span><button type="button" class="map-dual-cal__nav" data-cn="-12">«</button><button type="button" class="map-dual-cal__nav" data-cn="-1">‹</button></span>';
      else html += '<span></span>';
      html += '<span class="map-dual-cal__title">' + MONTHS[vm] + ' ' + vy + '</span>';
      if (m === 1) html += '<span><button type="button" class="map-dual-cal__nav" data-cn="1">›</button><button type="button" class="map-dual-cal__nav" data-cn="12">»</button></span>';
      else html += '<span></span>';
      html += '</div><div class="map-dual-cal__grid">';
      DAYS.forEach(function (d) { html += '<span class="map-dual-cal__dow">' + d + '</span>'; });
      for (var i = 0; i < startDay; i++) {
        html += '<button type="button" class="map-dual-cal__day map-dual-cal__day--other" disabled>' + (prevDim - startDay + 1 + i) + '</button>';
      }
      for (var d = 1; d <= dim; d++) {
        var dt = new Date(vy, vm, d); dt.setHours(0,0,0,0);
        var cls = 'map-dual-cal__day';
        if (dt.getTime() === today.getTime()) cls += ' map-dual-cal__day--today';
        if (rangeStart && dt.getTime() === rangeStart.getTime()) cls += ' map-dual-cal__day--selected';
        if (rangeEnd && dt.getTime() === rangeEnd.getTime()) cls += ' map-dual-cal__day--selected';
        if (rangeStart && rangeEnd && dt > rangeStart && dt < rangeEnd) cls += ' map-dual-cal__day--in-range';
        html += '<button type="button" class="' + cls + '" data-pick="' + vy + '-' + pad2(vm + 1) + '-' + pad2(d) + '">' + d + '</button>';
      }
      var rem = (startDay + dim) % 7;
      if (rem) for (var j = 1; j <= 7 - rem; j++) html += '<button type="button" class="map-dual-cal__day map-dual-cal__day--other" disabled>' + j + '</button>';
      html += '</div></div>';
    }
    dualCalEl.innerHTML = html;
  }

  dualCalEl.addEventListener('click', function (e) {
    var nav = e.target.closest('[data-cn]');
    if (nav) { e.stopPropagation(); calViewMonth += parseInt(nav.getAttribute('data-cn'), 10); if (calViewMonth > 11) { calViewMonth -= 12; calViewYear++; } else if (calViewMonth < 0) { calViewMonth += 12; calViewYear--; } renderDualCal(); return; }
    var pick = e.target.closest('[data-pick]');
    if (pick) {
      e.stopPropagation();
      var parts = pick.getAttribute('data-pick').split('-');
      var dt = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])); dt.setHours(0,0,0,0);
      if (!rangeStart || rangeEnd || dt < rangeStart) { rangeStart = dt; rangeEnd = null; }
      else { rangeEnd = dt; }
      renderDualCal();
      if (rangeStart) { startInput.value = toIso(rangeStart); dateStartEl.textContent = fmtDate(rangeStart); filters.start = startInput.value; }
      if (rangeEnd) { endInput.value = toIso(rangeEnd); dateEndEl.textContent = fmtDate(rangeEnd); filters.end = endInput.value; dateBtn.classList.add('has-value'); renderTable(); }
      else { dateStartEl.textContent = fmtDate(rangeStart); dateEndEl.textContent = 'End date'; }
    }
  });

  dateBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = datePop.hidden;
    datePop.hidden = !open;
    dateBtn.classList.toggle('is-open', open);
    dateBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) renderDualCal();
  });

  document.getElementById('mapAddBtn').addEventListener('click', openCreateModal);

  renderTable();
})();
