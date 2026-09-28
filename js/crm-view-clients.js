(function () {
  'use strict';

  var clock = document.getElementById('crmTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  var ICONS = {
    sort: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 9l4-4 4 4M8 15l4 4 4-4"/></svg>',
    search: '<svg class="vc-th__search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 14v2M12 10v6M16 12v4"/></svg>',
    pencil: '<svg viewBox="64 64 896 896" fill="currentColor"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.4-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"/></svg>',
    ban: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M7 17L17 7"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M8.5 12.5l2.4 2.4 4.6-5"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/><path d="M6.5 7l.8 12.2A1.5 1.5 0 008.8 20.5h6.4a1.5 1.5 0 001.5-1.3L17.5 7"/><path d="M10 11v6M14 11v6"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V8"/><path d="M8 11l4-4 4 4"/><rect x="4" y="16" width="16" height="4" rx="1"/></svg>'
  };

  var DATA = {
    active: [
      { file: 'IN1', name: 'Internal', initials: 'I', tone: 'blue', enable: true, city: '--' },
      { file: 'KA2', name: 'Kamal Kant Sharma', initials: 'KK', tone: 'teal', enable: false, city: 'GHAZIABAD' }
    ],
    inactive: [
      { file: 'IN1', name: 'Internal', initials: 'I', tone: 'teal', enable: true, city: '--' }
    ],
    deleted: []
  };

  var tab = 'active';
  var searchInput = document.getElementById('vcSearch');
  var body = document.getElementById('vcBody');
  var thead = document.getElementById('vcHead');
  var empty = document.getElementById('vcEmpty');
  var countEl = document.getElementById('vcCount');
  var clientTable = document.getElementById('vcClientTable');
  var groupWrap = document.getElementById('vcGroupWrap');
  var clientWrap = document.getElementById('vcClientWrap');
  var clientToolbar = document.getElementById('vcClientToolbar');
  var groupToolbar = document.getElementById('vcGroupToolbar');

  function dash() { return '<span class="vc-muted">--</span>'; }
  function th(label, opts) {
    opts = opts || {};
    var html = label;
    if (opts.sort) html += ' ' + ICONS.sort;
    if (opts.search) html += ' ' + ICONS.search;
    return '<th><span class="vc-th">' + html + '</span></th>';
  }
  function editHref(row) {
    return 'crm_add_client.html?edit=1&name=' + encodeURIComponent(row.name) + '&file=' + encodeURIComponent(row.file) + (row.city && row.city !== '--' ? '&city=' + encodeURIComponent(row.city) : '');
  }
  function filtered(list) {
    var q = (searchInput.value || '').trim().toLowerCase();
    if (!q) return list.slice();
    return list.filter(function (row) {
      return (row.name + ' ' + row.file + ' ' + (row.gstin || '')).toLowerCase().indexOf(q) !== -1;
    });
  }
  function actionsHtml(row, kind) {
    var last = kind === 'inactive'
      ? '<button class="vc-act vc-act--ok" type="button" data-restore title="Activate" aria-label="Activate">' + ICONS.check + '</button>'
      : '<button class="vc-act vc-act--ban" type="button" data-disable title="Deactivate" aria-label="Deactivate">' + ICONS.ban + '</button>';
    return '<span class="vc-acts">' +
      '<button class="vc-act vc-act--plus" type="button" title="Add" aria-label="Add">' + ICONS.plus + '</button>' +
      '<button class="vc-act vc-act--chart" type="button" title="Report" aria-label="Report">' + ICONS.chart + '</button>' +
      '<a class="vc-act vc-act--edit" href="' + editHref(row) + '" title="Edit client" aria-label="Edit client">' + ICONS.pencil + '</a>' +
      last +
      '</span>';
  }
  function clientRow(row, kind) {
    var extra = kind === 'deleted'
      ? '<td>' + dash() + '</td><td>' + dash() + '</td><td class="vc-money">₹ 0</td><td>' + dash() + '</td><td><a class="vc-link" href="#">View</a></td><td>' + dash() + '</td><td><a class="vc-link" href="#">View</a></td><td><button class="vc-link" type="button" data-retrieve>Retrieve</button></td>'
      : '<td>' + dash() + '</td>' +
        '<td><button class="vc-tag-add" type="button" aria-label="Add tag">' + ICONS.plus + '</button></td>' +
        '<td>' + dash() + '</td><td>' + dash() + '</td>' +
        '<td class="vc-money">₹ 0</td>' +
        '<td><button class="vc-switch' + (row.enable ? ' is-on' : '') + '" type="button" aria-label="Enable"></button></td>' +
        '<td>' + dash() + '</td>' +
        '<td><a class="vc-link" href="#">View</a></td>' +
        '<td>' + dash() + '</td>' +
        '<td>' + (row.city && row.city !== '--' ? row.city : dash()) + '</td>' +
        '<td>' + dash() + '</td>' +
        '<td><a class="vc-link" href="#">View</a></td>' +
        '<td>' + actionsHtml(row, kind) + '</td>';
    return '<tr data-file="' + row.file + '" data-name="' + row.name.replace(/"/g, '&quot;') + '">' +
      '<td><input class="vc-check" type="checkbox"></td>' +
      '<td>' + row.file + '</td>' +
      '<td><span class="vc-firm"><span class="vc-ava vc-ava--' + row.tone + '">' + row.initials + '</span><a class="vc-link" href="' + editHref(row) + '">' + row.name + '</a></span></td>' +
      '<td>' + dash() + '</td>' +
      '<td>' + dash() + '</td><td>' + dash() + '</td><td>' + dash() + '</td>' +
      (kind === 'deleted' ? '' : '<td>' + dash() + '</td>') +
      extra +
      '</tr>';
  }
  function setHead(kind) {
    if (kind === 'deleted') {
      thead.innerHTML = '<tr>' +
        '<th><input class="vc-check" type="checkbox" data-select-all></th>' +
        th('File No.', { sort: 1 }) + th('Firm Name', { sort: 1, search: 1 }) +
        th('Relationship Manager', { sort: 1 }) + th('Email Id', { sort: 1, search: 1 }) +
        th('Mobile No.', { sort: 1, search: 1 }) + th('GSTIN', { sort: 1, search: 1 }) +
        '<th>Team</th>' + th('Receivables', { sort: 1 }) +
        '<th>Authorized signatory</th><th>Services</th><th>DSC Expiry Date</th><th>Notes</th>' +
        th('Retrieve', { search: 1 }) +
        '</tr>';
      return;
    }
    thead.innerHTML = '<tr>' +
      '<th><input class="vc-check" type="checkbox" data-select-all></th>' +
      th('File No.', { sort: 1 }) + th('Firm Name', { sort: 1, search: 1 }) +
      th('Client Group', { search: 1 }) + '<th>Relationship Manager</th>' +
      th('Email Id', { sort: 1, search: 1 }) + th('Mobile No.', { sort: 1, search: 1 }) +
      th('Alternate Mobile No.', { sort: 1, search: 1 }) + th('GSTIN', { sort: 1, search: 1 }) +
      th('Tags', { search: 1 }) + '<th>Team</th><th>Pan Number</th>' +
      th('Receivables', { sort: 1 }) + th('Enable', { search: 1 }) +
      '<th>Authorized signatory</th><th>Services</th><th>Constitution</th><th>City</th>' +
      '<th>DSC Expiry Date</th><th>Notes</th><th>Actions</th>' +
      '</tr>';
  }
  function render() {
    var isGroup = tab === 'group';
    clientToolbar.hidden = isGroup;
    groupToolbar.hidden = !isGroup;
    clientWrap.hidden = isGroup;
    groupWrap.hidden = !isGroup;
    if (isGroup) {
      var n = document.querySelectorAll('#vcGroupBody tr').length;
      countEl.textContent = n + ' / ' + n;
      empty.classList.toggle('is-visible', n === 0);
      return;
    }
    setHead(tab);
    var list = filtered(DATA[tab] || []);
    body.innerHTML = list.map(function (row) { return clientRow(row, tab); }).join('');
    empty.classList.toggle('is-visible', list.length === 0);
    clientTable.style.display = list.length ? '' : 'none';
    countEl.textContent = list.length + ' / ' + list.length;
    syncRowSelection();
  }

  function setTab(next) {
    if (next === 'group') {
      window.location.href = 'crm_client_group.html';
      return;
    }
    tab = next;
    document.querySelectorAll('.vc-tab[data-tab]').forEach(function (btn) {
      var on = btn.getAttribute('data-tab') === tab;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (location.hash.replace('#', '') !== tab) history.replaceState(null, '', '#' + tab);
    render();
  }

  document.querySelectorAll('.vc-tab[data-tab]').forEach(function (btn) {
    btn.addEventListener('click', function () { setTab(btn.getAttribute('data-tab')); });
  });
  searchInput.addEventListener('input', render);
  document.getElementById('vcGroupSearchName').addEventListener('input', function () {
    var q = this.value.trim().toLowerCase();
    document.querySelectorAll('#vcGroupBody tr').forEach(function (tr) {
      tr.hidden = q && tr.textContent.toLowerCase().indexOf(q) === -1;
    });
  });
  document.getElementById('vcGroupSearchType').addEventListener('input', function () {
    var q = this.value.trim().toLowerCase();
    document.querySelectorAll('#vcGroupBody tr').forEach(function (tr) {
      tr.hidden = q && tr.textContent.toLowerCase().indexOf(q) === -1;
    });
  });

  document.getElementById('vcAddClient').addEventListener('click', function () {
    window.location.href = 'crm_add_client.html';
  });
  document.getElementById('vcAddGroup').addEventListener('click', function () {
    document.getElementById('vcAddGroupModal').classList.add('is-open');
  });
  document.getElementById('vcBell').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Notifications', 'No new client alerts.');
  });
  document.getElementById('vcExcel').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Excel', 'Export started.');
  });
  document.getElementById('vcGroupExcel').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Excel', 'Export started.');
  });
  document.getElementById('vcGroupPdf').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('PDF', 'Export started.');
  });

  var bulkTools = document.getElementById('vcBulkTools');
  var trashBtn = document.getElementById('vcTrash');

  function syncRowSelection() {
    if (!body) return;
    var boxes = body.querySelectorAll('.vc-check');
    var checked = body.querySelectorAll('.vc-check:checked').length;
    boxes.forEach(function (box) {
      var tr = box.closest('tr');
      if (tr) tr.classList.toggle('is-selected', box.checked);
    });
    if (bulkTools) bulkTools.hidden = !checked;
    if (trashBtn) trashBtn.hidden = !checked;
    var allBox = thead.querySelector('[data-select-all]');
    if (allBox && boxes.length) {
      allBox.checked = checked === boxes.length;
      allBox.indeterminate = checked > 0 && checked < boxes.length;
    }
  }

  document.getElementById('vcEmail').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Email', 'Email composer opened.');
  });
  document.getElementById('vcTaskBtn').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Task', 'Add task for selected clients.');
  });
  document.getElementById('vcTagBtn').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Tag', 'Add tag to selected clients.');
  });
  document.getElementById('vcTrash').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Delete', 'Selected clients moved to Deleted.');
  });

  var filterPop = document.getElementById('vcFilterPop');
  var colsPop = document.getElementById('vcColsPop');
  var COLS = [
    'File No.', 'Firm Name', 'Client Group', 'Relationship Manager', 'Email Id', 'Mobile No.',
    'Alternate Mobile No.', 'GSTIN', 'Tags', 'Team', 'Pan Number', 'Allow Email', 'Allow SMS',
    'Allow Notification', 'Receivables', 'Enable', 'SR/Tasks', 'Send Credentials',
    'Authorized signatory', 'Services', 'Constitution', 'City', 'DSC Expiry Date', 'Notes', 'Actions'
  ];
  var dragSvg = '<svg class="vc-cols-drag" viewBox="0 0 12 16" aria-hidden="true"><circle cx="3" cy="2.5" r="1.2" fill="currentColor"/><circle cx="9" cy="2.5" r="1.2" fill="currentColor"/><circle cx="3" cy="8" r="1.2" fill="currentColor"/><circle cx="9" cy="8" r="1.2" fill="currentColor"/><circle cx="3" cy="13.5" r="1.2" fill="currentColor"/><circle cx="9" cy="13.5" r="1.2" fill="currentColor"/></svg>';
  var colsList = document.getElementById('vcColsList');
  if (colsList) {
    colsList.innerHTML = COLS.map(function (name) {
      return '<label class="vc-cols-row"><span aria-hidden="true">' + dragSvg + '</span><input class="vc-cols-check" type="checkbox" checked><span class="vc-cols-label">' + name + '</span></label>';
    }).join('');
  }
  function syncColsSelectAll() {
    var btn = document.getElementById('vcColsSelectAll');
    if (!btn || !colsList) return;
    var boxes = colsList.querySelectorAll('.vc-cols-check');
    var checked = colsList.querySelectorAll('.vc-cols-check:checked').length;
    btn.textContent = checked === boxes.length ? 'Unselect All' : 'Select All';
  }
  document.getElementById('vcColsSelectAll').addEventListener('click', function () {
    if (!colsList) return;
    var boxes = colsList.querySelectorAll('.vc-cols-check');
    var allOn = colsList.querySelectorAll('.vc-cols-check:checked').length === boxes.length;
    boxes.forEach(function (box) { box.checked = !allOn; });
    syncColsSelectAll();
  });
  if (colsList) colsList.addEventListener('change', syncColsSelectAll);
  document.getElementById('vcFilter').addEventListener('click', function (e) {
    e.stopPropagation();
    colsPop.classList.remove('is-open');
    filterPop.classList.toggle('is-open');
  });
  document.getElementById('vcCols').addEventListener('click', function (e) {
    e.stopPropagation();
    filterPop.classList.remove('is-open');
    colsPop.classList.toggle('is-open');
  });
  document.addEventListener('click', function () {
    filterPop.classList.remove('is-open');
    colsPop.classList.remove('is-open');
  });
  filterPop.addEventListener('click', function (e) { e.stopPropagation(); });
  colsPop.addEventListener('click', function (e) { e.stopPropagation(); });

  clientWrap.addEventListener('change', function (e) {
    var box = e.target.closest('.vc-check');
    if (!box) return;
    if (box.hasAttribute('data-select-all')) {
      body.querySelectorAll('.vc-check').forEach(function (rowBox) { rowBox.checked = box.checked; });
    }
    syncRowSelection();
  });

  clientWrap.addEventListener('click', function (e) {
    var sw = e.target.closest('.vc-switch');
    if (sw) { sw.classList.toggle('is-on'); return; }
    if (e.target.closest('[data-disable]')) {
      if (window.DashboardShell) DashboardShell.toast('Disabled', 'Client moved to Inactive.');
      return;
    }
    if (e.target.closest('[data-restore]')) {
      if (window.DashboardShell) DashboardShell.toast('Activated', 'Client moved to Active.');
      return;
    }
    if (e.target.closest('[data-retrieve]')) {
      if (window.DashboardShell) DashboardShell.toast('Retrieved', 'Client restored.');
    }
  });

  var addModal = document.getElementById('vcAddGroupModal');
  var editModal = document.getElementById('vcEditGroupModal');
  var confirmPop = document.getElementById('vcDeleteConfirm');
  var pendingRow = null;
  function closeModals() {
    addModal.classList.remove('is-open');
    editModal.classList.remove('is-open');
    confirmPop.classList.remove('is-open');
    pendingRow = null;
  }
  document.getElementById('vcAddGroupClose').addEventListener('click', closeModals);
  document.getElementById('vcEditGroupClose').addEventListener('click', closeModals);
  document.getElementById('vcEditGroupClose2').addEventListener('click', function () {
    document.getElementById('editGroupName').value = 'ca cloud';
    document.getElementById('editClient').value = '';
    document.getElementById('editMobile').value = '0';
    document.getElementById('editEmail').value = 'd12@gmail.com';
  });
  document.getElementById('vcAddGroupReset').addEventListener('click', function () {
    addModal.querySelectorAll('input').forEach(function (el) { el.value = ''; });
    addModal.querySelector('select').selectedIndex = 0;
  });
  document.getElementById('vcCreateGroup').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Saved', 'Client group created.');
    closeModals();
  });
  document.getElementById('vcUpdateGroup').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Saved', 'Client group updated.');
    closeModals();
  });
  addModal.addEventListener('click', function (e) { if (e.target === addModal) closeModals(); });
  editModal.addEventListener('click', function (e) { if (e.target === editModal) closeModals(); });

  groupWrap.addEventListener('click', function (e) {
    if (e.target.closest('[data-edit-group]')) {
      e.preventDefault();
      var tr = e.target.closest('tr');
      if (tr) {
        var name = tr.getAttribute('data-name') || '';
        var type = tr.getAttribute('data-type') || 'Customer Family';
        var rm = tr.getAttribute('data-rm') || '';
        document.getElementById('editGroupName').value = name;
        document.getElementById('editGroupType').value = type;
        document.getElementById('editRmChip').textContent = rm || 'Dev Aggarwal';
      }
      editModal.classList.add('is-open');
      return;
    }
    if (e.target.closest('[data-delete-group]')) {
      e.preventDefault();
      pendingRow = e.target.closest('tr');
      var rect = e.target.closest('[data-delete-group]').getBoundingClientRect();
      confirmPop.style.top = Math.max(16, rect.top - 112) + 'px';
      confirmPop.style.left = Math.max(16, rect.left - 140) + 'px';
      confirmPop.classList.add('is-open');
    }
  });
  document.getElementById('vcDeleteNo').addEventListener('click', closeModals);
  document.getElementById('vcDeleteYes').addEventListener('click', function () {
    if (pendingRow && pendingRow.parentNode) pendingRow.parentNode.removeChild(pendingRow);
    closeModals();
    render();
  });
  document.addEventListener('click', function (e) {
    if (!confirmPop.classList.contains('is-open')) return;
    if (e.target.closest('#vcDeleteConfirm') || e.target.closest('[data-delete-group]')) return;
    closeModals();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModals(); });

  var hash = (location.hash || '#active').replace('#', '');
  if (hash === 'inactive' || hash === 'deleted' || hash === 'group') setTab(hash);
  else setTab('active');
})();
