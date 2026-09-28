/* TIME ERP — Client Document page logic */
(function () {
  'use strict';

  /* ── Clock ── */
  function tickClock() {
    var el = document.getElementById('cdTopClock');
    if (!el) return;
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
    el.setAttribute('datetime', d.toISOString());
  }
  tickClock(); setInterval(tickClock, 30000);

  /* ── Customer combo-box ── */
  var CUSTOMERS = [
    '(21) Internal',
    '(174) SAURABH BHARDWAJ',
    '(173) SAURABH BHARDWAJ HUF',
    '(TH296) THE GOLD REALTY',
    '(LA3720) law seva management private limited',
    '(145) PERFECT PAIR',
    '(TA119098) TATA MOTORS PASSENGER VEHICLES LIMITED',
    '(SA128007) Saksham'
  ];

  var combo = document.getElementById('cdCombo');
  var comboInput = document.getElementById('cdComboInput');
  var comboMenu = document.getElementById('cdComboMenu');
  var selectedCustomer = CUSTOMERS[0];

  function renderMenu(filter) {
    var q = (filter || '').toLowerCase();
    comboMenu.innerHTML = '';
    CUSTOMERS.forEach(function (c) {
      if (q && c.toLowerCase().indexOf(q) === -1) return;
      var div = document.createElement('div');
      div.className = 'cd-combo__item' + (c === selectedCustomer ? ' is-selected' : '');
      div.textContent = c;
      div.setAttribute('role', 'option');
      div.addEventListener('click', function () {
        selectedCustomer = c;
        comboInput.value = c;
        combo.classList.remove('is-open');
      });
      comboMenu.appendChild(div);
    });
  }

  comboInput.addEventListener('focus', function () { renderMenu(''); combo.classList.add('is-open'); });
  comboInput.addEventListener('input', function () { renderMenu(comboInput.value); combo.classList.add('is-open'); });
  document.addEventListener('click', function (e) {
    if (!combo.contains(e.target)) combo.classList.remove('is-open');
  });

  /* ── Sample file data ── */
  var FILES = [
    { type: 'folder', name: 'BILLING', folders: 0, files: 1, expiry: '05/08/2026', hasTag: true, access: false },
    { type: 'folder', name: 'CREATED', folders: 3, files: 1, expiry: '', hasTag: true, access: false },
    { type: 'file',   name: '64KB.json', folders: null, files: null, expiry: '08/07/2026', hasTag: false, access: false },
    { type: 'folder', name: 'CREATED', folders: 2, files: 0, expiry: '', hasTag: true, access: false },
    { type: 'folder', name: 'CREATED', folders: 1, files: 0, expiry: '', hasTag: false, access: false },
    { type: 'folder', name: 'CREATED', folders: 1, files: 0, expiry: '05/08/2026', hasTag: false, access: false },
    { type: 'file',   name: 'task_master7.jpg', folders: null, files: null, expiry: '', hasTag: false, access: false },
    { type: 'folder', name: 'demo', folders: 0, files: 0, expiry: '', hasTag: false, access: false },
    { type: 'folder', name: 'GST', folders: 0, files: 0, expiry: '', hasTag: false, access: false },
    { type: 'folder', name: 'gst file', folders: 0, files: 0, expiry: '', hasTag: false, access: false },
    { type: 'folder', name: 'Latest Updates', folders: 0, files: 0, expiry: '', hasTag: false, access: false },
    { type: 'folder', name: 'WHATSAPP', folders: 0, files: 0, expiry: '', hasTag: false, access: false },
    { type: 'folder', name: 'ZZz', folders: 0, files: 0, expiry: '', hasTag: false, access: false }
  ];

  var ICO = {
    drag: '<svg viewBox="0 0 16 16" width="12" height="16" fill="#c4c9d4"><circle cx="5" cy="3" r="1.3"/><circle cx="11" cy="3" r="1.3"/><circle cx="5" cy="8" r="1.3"/><circle cx="11" cy="8" r="1.3"/><circle cx="5" cy="13" r="1.3"/><circle cx="11" cy="13" r="1.3"/></svg>',
    folder: '<svg viewBox="0 0 24 24" width="18" height="18" fill="#9fe0d7" stroke="#25b7a7" stroke-width="1"><path d="M3 7a2 2 0 012-2h4.2a2 2 0 011.4.6L12 7h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>',
    file: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#25b7a7" stroke-width="1.6"><path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M14 3v5h5"/></svg>',
    metaFile: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#9ca3af" stroke-width="1.8"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/></svg>',
    metaFolder: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#9ca3af" stroke-width="1.8"><path d="M3 8h18v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"/><path d="M3 8l2.2-3h5.2L12 8"/></svg>',
    pencil: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 6v12M6 12h12"/></svg>',
    move: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17l-5-5 5-5"/><path d="M20 18v-2a4 4 0 00-4-4H4"/></svg>',
    mail: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg>',
    down: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12M8 12l4 4 4-4"/><path d="M5 20h14"/></svg>',
    trash: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M10 7V5h4v2"/><path d="M6 7l1 13h10l1-13"/><path d="M10 11v6M14 11v6"/></svg>',
    wa: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2A8.8 8.8 0 0 0 4.6 16.6L3 21l4.5-1.5A8.8 8.8 0 1 0 12 3.2z"/><path d="M8.6 9.3c.2-.9.6-1.2 1.3-1.2h.2l.7 2.4-.6.5c.6 1.3 1.6 2.3 2.9 2.9l.5-.6 2.4.7v.2c0 .7-.3 1.1-1.2 1.3-2.6.5-5.9-1.9-6.2-6.2z"/></svg>',
    info: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="8" r="0.8" fill="currentColor"/></svg>',
    lock: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 017.8-1.2"/></svg>'
  };

  var tbody = document.getElementById('cdTableBody');

  function renderTable(filter) {
    var q = (filter || '').toLowerCase();
    tbody.innerHTML = '';
    FILES.forEach(function (f) {
      if (q && f.name.toLowerCase().indexOf(q) === -1) return;
      var tr = document.createElement('tr');
      var icon = f.type === 'folder' ? ICO.folder : ICO.file;
      var meta = f.type === 'folder'
        ? '<div class="cd-file-name__meta"><span>' + ICO.metaFile + ' ' + f.files + '</span><span>' + ICO.metaFolder + ' ' + f.folders + '</span></div>'
        : '';
      var nameTd = '<td><div class="cd-file-name">' +
        '<span class="cd-file-name__drag">' + ICO.drag + '</span>' +
        '<div class="cd-file-name__body">' +
        '<div class="cd-file-name__main"><span class="cd-file-name__icon">' + icon + '</span><a href="#" class="cd-file-name__link">' + f.name + '</a></div>' +
        meta + '</div></div></td>';
      var expiryTd = '<td class="cd-expiry">' + (f.expiry
        ? f.expiry + ' <button class="cd-expiry__edit" title="Edit expiry">' + ICO.pencil + '</button>'
        : '<button class="cd-expiry__add" title="Add expiry">' + ICO.plus + '</button>') + '</td>';
      var tagTd = '<td><button class="cd-tag-btn" title="Tags">' + ICO.plus + '</button></td>';
      var actionsTd = '<td><div class="cd-actions">' +
        '<button class="is-blue" title="Copy">' + ICO.move + '</button>' +
        '<button class="is-gray" title="Email">' + ICO.mail + '</button>' +
        '<button class="is-gray" title="Download">' + ICO.down + '</button>' +
        '<button class="is-red" title="Delete">' + ICO.trash + '</button>' +
        '<button class="is-gray" title="WhatsApp">' + ICO.wa + '</button>' +
        '<button class="is-blue" title="Edit">' + ICO.pencil + '</button>' +
        '<button class="is-blue" title="Info">' + ICO.info + '</button>' +
        '<button class="is-blue" title="Lock">' + ICO.lock + '</button>' +
        '</div></td>';
      var accessTd = '<td style="text-align:right"><label class="cd-access-toggle">' +
        '<input type="checkbox"' + (f.access ? ' checked' : '') + '>' +
        '<span class="cd-access-toggle__track"><span class="cd-access-toggle__thumb"></span></span>' +
        '<span class="cd-access-toggle__label">' + (f.access ? 'Yes' : 'No') + '</span>' +
        '</label></td>';
      tr.innerHTML = nameTd + expiryTd + tagTd + actionsTd + accessTd;
      tbody.appendChild(tr);
    });
  }

  renderTable();

  var viewMode = 'table';
  var gridEl = document.getElementById('cdGrid');
  var tableWrap = document.getElementById('cdTableWrap');
  var viewBtn = document.getElementById('cdViewToggle');
  var viewLabel = viewBtn ? viewBtn.querySelector('.cd-view-toggle__label') : null;

  function fileBadge(name) {
    var ext = (name.split('.').pop() || '').toUpperCase();
    if (ext === 'JPG' || ext === 'JPEG' || ext === 'PNG') return 'JPEG';
    return ext.slice(0, 4) || 'FILE';
  }

  function renderGrid(filter) {
    if (!gridEl) return;
    var q = (filter || '').toLowerCase();
    var files = FILES.filter(function (f) { return f.type === 'file' && (!q || f.name.toLowerCase().indexOf(q) !== -1); });
    var folders = FILES.filter(function (f) { return f.type === 'folder' && (!q || f.name.toLowerCase().indexOf(q) !== -1); });
    var fileSvg = '<svg viewBox="0 0 40 48"><path d="M8 2h16l10 10v32a4 4 0 01-4 4H8a4 4 0 01-4-4V6a4 4 0 014-4z" fill="#c4b5fd"/><path d="M24 2v10h10" fill="#ddd6fe"/><rect x="10" y="28" width="20" height="10" rx="2" fill="#fff"/></svg>';
    var folderSvg = '<svg viewBox="0 0 64 52"><path d="M6 14h18l5 5h29a6 6 0 016 6v19a6 6 0 01-6 6H6a6 6 0 01-6-6V20a6 6 0 016-6z" fill="#9fe0d7"/><path d="M0 24h64v20a6 6 0 01-6 6H6a6 6 0 01-6-6V24z" fill="#25b7a7"/></svg>';
    var html = files.map(function (f) {
      return '<button type="button" class="cd-grid-item" title="' + f.name + '"><span class="cd-grid-file">' + fileSvg + '<span class="cd-grid-file__tag">' + fileBadge(f.name) + '</span></span><span class="cd-grid-item__name">' + f.name + '</span></button>';
    }).join('');
    html += folders.map(function (f) {
      return '<button type="button" class="cd-grid-item" title="' + f.name + '"><span class="cd-grid-folder">' + folderSvg + '</span><span class="cd-grid-item__name">' + f.name + '</span></button>';
    }).join('');
    gridEl.innerHTML = html || '<p style="grid-column:1/-1;text-align:center;color:#9ca3af;font-size:13px">No documents</p>';
  }

  function applyView() {
    var isTable = viewMode === 'table';
    if (tableWrap) tableWrap.hidden = !isTable;
    if (gridEl) gridEl.hidden = isTable;
    if (viewBtn) {
      viewBtn.classList.toggle('is-table', isTable);
      viewBtn.classList.toggle('is-docs', !isTable);
      viewBtn.setAttribute('aria-pressed', isTable ? 'true' : 'false');
    }
    if (viewLabel) viewLabel.textContent = isTable ? 'Table' : 'Docs';
    if (!isTable) renderGrid(searchInput && searchInput.value);
  }

  if (viewBtn) {
    viewBtn.addEventListener('click', function () {
      viewMode = viewMode === 'table' ? 'docs' : 'table';
      applyView();
    });
  }

  var searchInput = document.getElementById('cdSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      renderTable(searchInput.value);
      if (viewMode === 'docs') renderGrid(searchInput.value);
    });
  }

  // Toggle labels on access switches
  tbody.addEventListener('change', function (e) {
    if (e.target.type === 'checkbox') {
      var lbl = e.target.parentElement.querySelector('.cd-access-toggle__label');
      if (lbl) lbl.textContent = e.target.checked ? 'Yes' : 'No';
    }
  });
  /* ── Inline Edit Name ── */
  var pendingDelete = null;
  var delPop = document.getElementById('cdDelPop');
  function closeDelPop() { if (delPop) delPop.hidden = true; pendingDelete = null; }
  if (document.getElementById('cdDelNo')) document.getElementById('cdDelNo').addEventListener('click', function (e) { e.stopPropagation(); closeDelPop(); });
  if (document.getElementById('cdDelYes')) document.getElementById('cdDelYes').addEventListener('click', function (e) {
    e.stopPropagation();
    if (pendingDelete) {
      var link = pendingDelete.querySelector('.cd-file-name__link');
      var name = link ? link.textContent : '';
      var fi = -1;
      FILES.forEach(function (f, i) { if (fi < 0 && f.name === name) fi = i; });
      if (fi > -1) FILES.splice(fi, 1);
    }
    closeDelPop();
    renderTable(searchInput && searchInput.value);
    if (viewMode === 'docs') renderGrid(searchInput && searchInput.value);
  });
  document.addEventListener('click', function (e) {
    if (delPop && !delPop.hidden && !e.target.closest('#cdDelPop') && !e.target.closest('button[title="Delete"]')) closeDelPop();
  });

  tbody.addEventListener('click', function (e) {
    var delBtn = e.target.closest('button[title="Delete"]');
    if (delBtn) {
      e.stopPropagation();
      pendingDelete = delBtn.closest('tr');
      var pop = document.getElementById('cdDelPop');
      var r = delBtn.getBoundingClientRect();
      pop.hidden = false;
      pop.style.left = (r.left + r.width / 2 - pop.offsetWidth / 2) + 'px';
      pop.style.top = (r.top - pop.offsetHeight - 12) + 'px';
      return;
    }
    var btn = e.target.closest('button[title="Edit"]');
    if (!btn) return;
    var row = btn.closest('tr');
    var nameCell = row.querySelector('.cd-file-name');
    if (!nameCell || nameCell.querySelector('.cd-edit-wrap')) return;
    var link = nameCell.querySelector('.cd-file-name__link');
    var oldName = link.textContent;
    var meta = nameCell.querySelector('.cd-file-name__meta');
    nameCell.innerHTML = '<div class="cd-edit-wrap"><input type="text" value="' + oldName + '"><button class="cd-edit-confirm" title="Save">✓</button><button class="cd-edit-cancel" title="Cancel">✗</button></div>';
    var inp = nameCell.querySelector('input');
    inp.focus(); inp.select();
    function restore(name) {
      var isFolder = !!meta;
      nameCell.innerHTML = '<span class="cd-file-name__drag">' + ICO.drag + '</span><div class="cd-file-name__body"><div class="cd-file-name__main"><span class="cd-file-name__icon">' + (isFolder ? ICO.folder : ICO.file) + '</span><a href="#" class="cd-file-name__link">' + name + '</a></div>' + (meta ? '<div class="cd-file-name__meta">' + meta.innerHTML + '</div>' : '') + '</div>';
    }
    nameCell.querySelector('.cd-edit-confirm').addEventListener('click', function () { restore(inp.value.trim() || oldName); });
    nameCell.querySelector('.cd-edit-cancel').addEventListener('click', function () { restore(oldName); });
  });

  /* ── Move to Folder Modal ── */
  var moveModal = document.getElementById('cdMoveModal');
  var moveClose = document.getElementById('cdMoveClose');

  function openMoveModal() { moveModal.hidden = false; }
  function closeMoveModal() { moveModal.hidden = true; }

  if (moveClose) moveClose.addEventListener('click', closeMoveModal);
  if (moveModal) moveModal.addEventListener('click', function (e) { if (e.target === moveModal) closeMoveModal(); });

  tbody.addEventListener('click', function (e) {
    var btn = e.target.closest('button[title="Copy"]');
    if (btn) openMoveModal();
  });

  /* ── Add Tags Modal ── */
  var tagModal = document.getElementById('cdTagModal');
  var tagClose = document.getElementById('cdTagClose');
  var tagSave = document.getElementById('cdTagSave');
  var tagInput = document.getElementById('cdTagInput');

  function openTagModal() { tagModal.hidden = false; tagInput.value = ''; setTimeout(function () { tagInput.focus(); }, 50); }
  function closeTagModal() { tagModal.hidden = true; }

  if (tagClose) tagClose.addEventListener('click', closeTagModal);
  if (tagModal) tagModal.addEventListener('click', function (e) { if (e.target === tagModal) closeTagModal(); });
  if (tagSave) tagSave.addEventListener('click', function () { closeTagModal(); if (window.DashboardShell) DashboardShell.toast('Tags', 'Tag saved.'); });

  tbody.addEventListener('click', function (e) {
    var btn = e.target.closest('.cd-tag-btn');
    if (btn) openTagModal();
  });

  /* ── Create Folder Modal ── */
  var folderModal = document.getElementById('cdFolderModal');
  var folderBtn = document.getElementById('cdAddFolderBtn');
  var folderClose = document.getElementById('cdFolderClose');
  var folderCreate = document.getElementById('cdFolderCreate');
  var folderInput = document.getElementById('cdFolderName');

  function openFolderModal(e) {
    if (e) e.preventDefault();
    if (!folderModal) return;
    folderModal.hidden = false;
    document.body.style.overflow = 'hidden';
    if (folderInput) { folderInput.value = ''; setTimeout(function () { folderInput.focus(); }, 50); }
  }
  function closeFolderModal() {
    if (!folderModal) return;
    folderModal.hidden = true;
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    var add = e.target.closest('#cdAddFolderBtn');
    if (add) openFolderModal(e);
  });
  if (folderClose) folderClose.addEventListener('click', closeFolderModal);
  if (folderModal) folderModal.addEventListener('click', function (e) { if (e.target === folderModal) closeFolderModal(); });
  if (folderCreate) folderCreate.addEventListener('click', function () {
    var name = folderInput.value.trim();
    if (!name) { folderInput.focus(); return; }
    FILES.unshift({ type: 'folder', name: name, folders: 0, files: 0, expiry: '', hasTag: false, access: false });
    renderTable();
    if (viewMode === 'docs') renderGrid();
    closeFolderModal();
    if (window.DashboardShell) DashboardShell.toast('Folder Created', '"' + name + '" has been created.');
  });
})();
