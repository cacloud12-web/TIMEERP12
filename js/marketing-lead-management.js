(function () {
  'use strict';

  var ACTIVE = [
    { createdAt: '27/12/2024\n16:12 PM', name: '--', company: '--', createdBy: 'Saurabh\nBhardwaj', leadInfo: '--', docs: '--', email: '--', mobile: '--', assignTo: '--', source: '--', status: 'Processing', rating: '--', branch: '--', district: '--', description: '--', tags: '', notes: '', actionType: 'full' },
    { createdAt: '11/07/2024\n18:07 PM', name: 'AADVIK\nINFRA', company: 'AADVIK INFRA\nENGINEERS\nPRIVATE\nLIMITED', createdBy: 'Saurabh\nBhardwaj', leadInfo: 'Managing a CA\nfirm requires\nkeeping everyone\non the same page.\nYou need one-stop\npractice\nmanagemen... view\nmore', docs: '--', email: 'saurabh.ddps@gmail.com', mobile: '9599746459', assignTo: '--', source: 'View', status: 'Payment received', rating: '3', branch: 'Bluemon\nWealth\nManagement', district: 'NICOBARS', description: '1', tags: '●', notes: '●', actionType: 'full' },
    { createdAt: '20/03/2025\n12:03 PM', name: 'dsased', company: 'sdasd', createdBy: 'Saurabh\nBhardwaj', leadInfo: '--', docs: '--', email: 'info@lawseva.com', mobile: '9540175500', assignTo: '--', source: '--', status: 'Processing', rating: '--', branch: 'Bluemon\nWealth\nManagement', district: '--', description: '--', tags: '●', notes: '●', actionType: 'full' },
    { createdAt: '22/08/2024\n11:08 AM', name: '{', company: 'kl;', createdBy: 'Saurabh\nBhardwaj', leadInfo: '--', docs: '--', email: '908909@gitsd.yry', mobile: '7897897897', assignTo: '--', source: '--', status: 'Employee no 1', rating: '4', branch: 'Bluemon\nWealth\nManagement', district: '--', description: 'yry', tags: '●', notes: '●', actionType: 'full' },
    { createdAt: '11/07/2024\n17:07 PM', name: 'JEVENDRA\nSINGH\nNIRANJAN\nSINGH', company: '5', createdBy: 'Saurabh\nBhardwaj', leadInfo: '--', docs: '--', email: 'aadvikinfraeng@gmail.com', mobile: '0000000002', assignTo: '--', source: 'View', status: 'Employee no 1', rating: '5', branch: 'Law Seva\nManagement\nPrivate\nLimited', district: 'GHAZIABAD', description: '9', tags: 'View', notes: 'View', actionType: 'full' },
    { createdAt: '23/08/2024\n14:08 PM', name: 'saurabh\nbharadwaj', company: 'AADVIK INFRA\nENGINEERS\nPRIVATE\nLIMITED', createdBy: 'Saurabh\nBhardwaj', leadInfo: '--', docs: '--', email: 'LAWSEVAPP@GMAIL.COM', mobile: '9540175502', assignTo: '--', source: '--', status: 'Processing', rating: '--', branch: 'Bluemon\nWealth\nManagement', district: '--', description: '1212', tags: '●', notes: '●', actionType: 'full' }
  ];

  var CANCELLED = [
    { createdAt: '08/04/2026\n15:04 PM', name: 'Demo\nLead', company: '--', createdBy: 'Dev\nAggarwal', leadInfo: '--', docs: '--', email: '--', mobile: '8787878787', assignTo: '--', source: '--', status: 'Processing', rating: '--', branch: '--', district: '--', description: '--', tags: '--', notes: '--', actionType: 'restore' }
  ];

  var DELETED = [
    { createdAt: '01/04/2026\n21:04 PM', name: 'Dushya\nthakur', company: '--', createdBy: 'Shivani', leadInfo: '--', docs: '--', email: 'Thakurdushyant56@gmail.com', mobile: '7768543787', assignTo: '--', source: '--', status: '--', rating: '--', branch: '--', district: '--', description: '--', tags: '--', notes: '--', actionType: 'restore' },
    { createdAt: '06/04/2026\n21:04 PM', name: 'TAX', company: 'law seva\nprivate', createdBy: 'Ankit\nSharma', leadInfo: 'telly grace', docs: '--', email: 'pri@yank.co', mobile: '9876542310', assignTo: '--', source: '--', status: 'Open 2', rating: '--', branch: '--', district: '--', description: '--', tags: '--', notes: '--', actionType: 'restore' },
    { createdAt: '06/04/2026\n21:04 PM', name: 'GST\nFILLING', company: 'law seva\nprivate', createdBy: 'Ankit\nSharma', leadInfo: '--', docs: '--', email: 'pri@yank.co', mobile: '9678053421', assignTo: '--', source: '--', status: 'Employee no 1', rating: '--', branch: '--', district: '--', description: '--', tags: '--', notes: '--', actionType: 'restore' },
    { createdAt: '09/04/2026\n21:04 PM', name: 'Gaurav', company: 'abc', createdBy: 'Shivani', leadInfo: '--', docs: '--', email: 'gkura.v34@ca.cloud', mobile: '1232357678', assignTo: '--', source: '--', status: 'Payment WIP', rating: '--', branch: '--', district: '--', description: '--', tags: '--', notes: '--', actionType: 'restore' },
    { createdAt: '09/04/2026\n21:04 PM', name: 'Kittu', company: 'abc', createdBy: 'Shivani', leadInfo: '--', docs: '--', email: '--', mobile: '1237865432', assignTo: '--', source: '--', status: 'Payment received', rating: '--', branch: '--', district: '--', description: '--', tags: '--', notes: '--', actionType: 'restore' },
    { createdAt: '09/04/2026\n21:04 PM', name: 'raghu', company: 'Raghuvanshi\nassociate', createdBy: 'Shivani', leadInfo: '--', docs: '--', email: '--', mobile: '5423678543', assignTo: '--', source: '--', status: 'Closed & Converted as customer', rating: '--', branch: '--', district: '--', description: '--', tags: '--', notes: '--', actionType: 'restore' },
    { createdAt: '24/04/2026\n10:04 AM', name: 'Kamal\nKant\nSharma\n(Sales\nManager)', company: '--', createdBy: 'Kamal\nKant\nSharma', leadInfo: '--', docs: '--', email: '--', mobile: '0000000000', assignTo: 'Dev\nAggarwal', source: '--', status: '--', rating: '3', branch: 'Bluemon\nWealth\nManagement', district: '--', description: '--', tags: '--', notes: '--', actionType: 'restore' }
  ];

  var currentTab = 'active';
  var editIdx = -1;
  var COLS = [
    { id: 'sno', label: 'S. No.', on: true },
    { id: 'createdAt', label: 'Created At', on: true },
    { id: 'name', label: 'Name', on: true },
    { id: 'company', label: 'Company Name', on: true },
    { id: 'createdBy', label: 'Created By', on: true },
    { id: 'leadInfo', label: 'Lead Info', on: true },
    { id: 'docs', label: 'Documents', on: true },
    { id: 'email', label: 'Email Id', on: true },
    { id: 'mobile', label: 'Mobile No', on: true },
    { id: 'assignTo', label: 'Assign To', on: true },
    { id: 'source', label: 'Lead Source', on: true },
    { id: 'status', label: 'Lead Status', on: true },
    { id: 'rating', label: 'Rating', on: true },
    { id: 'branch', label: 'Branch', on: true },
    { id: 'revenue', label: 'Annual Revenue', on: false },
    { id: 'service', label: 'Service', on: false },
    { id: 'website', label: 'Website', on: false },
    { id: 'address', label: 'Address', on: false },
    { id: 'country', label: 'Country', on: false },
    { id: 'state', label: 'State', on: false },
    { id: 'district', label: 'District', on: true },
    { id: 'pincode', label: 'Pincode', on: false },
    { id: 'description', label: 'Description', on: true },
    { id: 'tags', label: 'Tags', on: true },
    { id: 'notes', label: 'Notes', on: true },
    { id: 'actions', label: 'Actions', on: true }
  ];

  function applyCols() {
    var map = {};
    COLS.forEach(function (c) { map[c.id] = c.on; });
    document.querySelectorAll('.lm-table [data-col]').forEach(function (el) {
      el.classList.toggle('is-hidden', !map[el.getAttribute('data-col')]);
    });
  }

  function renderColList() {
    document.getElementById('lmColList').innerHTML = COLS.map(function (c, i) {
      return '<label class="lm-col-item"><input type="checkbox" data-col-i="' + i + '"' + (c.on ? ' checked' : '') + '> ' + c.label + '</label>';
    }).join('');
  }

  function rowsForTab() {
    if (currentTab === 'cancelled') return CANCELLED;
    if (currentTab === 'deleted') return DELETED;
    return ACTIVE;
  }

  function showMultiline(t) { return String(t || '--').replace(/\n/g, '<br>'); }

  function rowActions(row, i) {
    if (row.actionType === 'restore') return '<div class="lm-action-icons"><button class="is-red" data-act="restore" data-i="' + i + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 105.64-11.36L1 10"/></svg></button></div>';
    return '<div class="lm-action-icons">' +
      '<button data-act="edit" data-i="' + i + '" class="is-blue" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="16" height="16"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg></button>' +
      '<button data-act="calendar" data-i="' + i + '" class="is-blue" title="Calendar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="16" height="16"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg></button>' +
      '<button data-act="user" data-i="' + i + '" class="is-blue" title="Assign"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="16" height="16"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 19.2c1.2-3 3.6-4.5 6.5-4.5s5.3 1.5 6.5 4.5"/></svg></button>' +
      '<button data-act="pdf" data-i="' + i + '" class="is-orange is-boxed" title="PDF"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="16" height="16"><path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M14 3v5h5"/><path d="M9.2 16.2V10.8h1.7c1.1 0 1.8.6 1.8 1.5s-.7 1.5-1.8 1.5H9.2m2.8 0L14.4 16.2"/></svg></button>' +
      '<button class="is-maroon" data-act="mail" data-i="' + i + '" title="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="16" height="16"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg></button>' +
      '<button class="is-green" data-act="wa" data-i="' + i + '" title="WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="16" height="16"><path d="M20.5 11.6A8.5 8.5 0 117.6 20.2L3.5 21.5l1.4-4A8.5 8.5 0 0120.5 11.6z"/><path d="M9.2 8.8c.2-.5.3-.5.6-.5h.5c.2 0 .4.1.5.3l.7 1.6c.1.2 0 .4-.1.5l-.4.4c-.1.2 0 .4.1.6.3.5.8 1 1.3 1.3.2.1.4.2.6.1l.4-.4c.2-.1.4-.2.5-.1l1.6.7c.2.1.3.3.3.5v.5c0 .3 0 .4-.5.6A6 6 0 019.2 8.8z"/></svg></button>' +
      '<button data-act="ig" data-i="' + i + '" class="is-black" title="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="16" height="16"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.4"/><circle cx="16.6" cy="7.4" r="1" fill="currentColor"/></svg></button>' +
      '<button class="is-red" data-act="remove" data-i="' + i + '" title="Cancel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16"><path d="M7 7l10 10M17 7L7 17"/></svg></button>' +
      '<button class="is-red" data-act="delete" data-i="' + i + '" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" width="16" height="16"><path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13"/><path d="M10 11v6M14 11v6"/></svg></button></div>';
  }

  function renderTable() {
    var rows = rowsForTab();
    var tbody = document.getElementById('lmTableBody');
    tbody.innerHTML = rows.map(function (r, i) {
      var options = ['Processing', 'Payment WIP', 'Payment received', 'Closed & Converted as customer', 'Open 2', 'Open 3', 'Employee no 1'];
      var status = '<select class="lm-status" data-status-i="' + i + '">' + options.map(function (o) { return '<option' + (o === r.status ? ' selected' : '') + '>' + o + '</option>'; }).join('') + '</select>';
      return '<tr>' +
        '<td data-col="sno">' + (i + 1) + '</td><td data-col="createdAt">' + showMultiline(r.createdAt) + '</td><td data-col="name">' + showMultiline(r.name) + '</td>' +
        '<td data-col="company">' + showMultiline(r.company) + '</td><td data-col="createdBy">' + showMultiline(r.createdBy) + '</td><td data-col="leadInfo">' + showMultiline(r.leadInfo) + '</td>' +
        '<td data-col="docs">' + showMultiline(r.docs) + '</td><td data-col="email">' + showMultiline(r.email) + '</td><td data-col="mobile">' + showMultiline(r.mobile) + '</td>' +
        '<td data-col="assignTo">' + showMultiline(r.assignTo) + '</td><td data-col="source">' + showMultiline(r.source) + '</td><td data-col="status">' + status + '</td>' +
        '<td data-col="rating">' + showMultiline(r.rating) + '</td><td data-col="branch">' + showMultiline(r.branch) + '</td>' +
        '<td data-col="revenue">--</td><td data-col="service">--</td><td data-col="website">--</td><td data-col="address">--</td><td data-col="country">--</td><td data-col="state">--</td>' +
        '<td data-col="district">' + showMultiline(r.district) + '</td><td data-col="pincode">--</td>' +
        '<td data-col="description">' + showMultiline(r.description) + '</td><td data-col="tags">' + (r.tags === 'View' ? '<a class="lm-link" href="#">View</a>' : showMultiline(r.tags)) + '</td>' +
        '<td data-col="notes">' + (r.notes === 'View' ? '<a class="lm-link" href="#">View</a>' : showMultiline(r.notes)) + '</td>' +
        '<td data-col="actions">' + rowActions(r, i) + '</td></tr>';
    }).join('');
    document.getElementById('lmCount').textContent = rows.length + ' / ' + rows.length;
    applyCols();
  }

  document.querySelectorAll('.lm-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      currentTab = tab.getAttribute('data-tab');
      document.querySelectorAll('.lm-tab').forEach(function (t) { t.classList.toggle('is-active', t === tab); });
      renderTable();
    });
  });

  document.getElementById('lmTableBody').addEventListener('change', function (e) {
    var i = e.target.getAttribute('data-status-i');
    if (i == null) return;
    rowsForTab()[+i].status = e.target.value;
  });

  function openModal(isEdit, idx) {
    var modal = document.getElementById('lmModal');
    document.getElementById('lmModalSubtitle').textContent = isEdit ? 'Edit Lead' : 'Add Lead';
    document.querySelector('#lmForm .lm-btn--primary').textContent = isEdit ? 'Update' : 'Submit';
    editIdx = isEdit ? idx : -1;
    if (isEdit) {
      var row = rowsForTab()[idx];
      document.getElementById('lmLeadInfo').value = row.leadInfo === '--' ? '' : row.leadInfo.replace(/\n/g, ' ');
      document.getElementById('lmName').value = row.name === '--' ? '' : row.name.replace(/\n/g, ' ');
      document.getElementById('lmCompany').value = row.company === '--' ? '' : row.company.replace(/\n/g, ' ');
      document.getElementById('lmMobile').value = row.mobile === '--' ? '' : row.mobile;
      document.getElementById('lmEmail').value = row.email === '--' ? '' : row.email;
      document.getElementById('lmStatus').value = row.status || 'Processing';
    } else {
      document.getElementById('lmForm').reset();
    }
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('lmModal').hidden = true;
    document.body.style.overflow = '';
  }

  document.getElementById('lmAddBtn').addEventListener('click', function () { openModal(false); });
  document.querySelector('.lm-back-btn').addEventListener('click', closeModal);
  document.getElementById('lmCancelBtn').addEventListener('click', closeModal);
  document.getElementById('lmModal').addEventListener('click', function (e) { if (e.target.id === 'lmModal') closeModal(); });

  document.getElementById('lmForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('lmName').value.trim();
    var mobile = document.getElementById('lmMobile').value.trim();
    if (!name || !mobile) {
      if (window.DashboardShell) DashboardShell.toast('Required', 'Name and Mobile No are required.');
      return;
    }
    var payload = {
      createdAt: '08/04/2026\n15:04 PM',
      name: name,
      company: document.getElementById('lmCompany').value.trim() || '--',
      createdBy: 'Dev\nAggarwal',
      leadInfo: document.getElementById('lmLeadInfo').value.trim() || '--',
      docs: '--',
      email: document.getElementById('lmEmail').value.trim() || '--',
      mobile: mobile,
      assignTo: '--',
      source: '--',
      status: document.getElementById('lmStatus').value,
      rating: '--',
      branch: '--',
      district: '--',
      description: '--',
      tags: '--',
      notes: '--',
      actionType: 'full'
    };
    if (editIdx >= 0) rowsForTab()[editIdx] = payload;
    else ACTIVE.unshift(payload);
    currentTab = 'active';
    document.querySelectorAll('.lm-tab').forEach(function (t) { t.classList.toggle('is-active', t.getAttribute('data-tab') === 'active'); });
    closeModal();
    renderTable();
    if (window.DashboardShell) DashboardShell.toast('Saved', editIdx >= 0 ? 'Lead updated.' : 'Lead added.');
  });

  document.getElementById('lmTableBody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-act]');
    if (!btn) return;
    var act = btn.getAttribute('data-act');
    var i = +btn.getAttribute('data-i');
    var rows = rowsForTab();
    if (act === 'edit') openModal(true, i);
    else if (act === 'delete' || act === 'remove') {
      var item = rows[i];
      rows.splice(i, 1);
      item.actionType = 'restore';
      DELETED.unshift(item);
      renderTable();
    } else if (act === 'restore') {
      var it = rows[i];
      rows.splice(i, 1);
      it.actionType = 'full';
      ACTIVE.unshift(it);
      currentTab = 'active';
      document.querySelectorAll('.lm-tab').forEach(function (t) { t.classList.toggle('is-active', t.getAttribute('data-tab') === 'active'); });
      renderTable();
    } else if (window.DashboardShell) DashboardShell.toast('Action', 'Feature will be linked here.');
  });

  var clock = document.getElementById('lmTopClock');
  function tickClock() {
    var d = new Date();
    clock.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', d.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  function closeMenus(except) {
    [['lmColBtn', 'lmColMenu'], ['lmFilterBtn', 'lmFilterMenu'], ['lmSettingsBtn', 'lmSettingsMenu']].forEach(function (pair) {
      if (except && pair[1] === except) return;
      document.getElementById(pair[1]).hidden = true;
      document.getElementById(pair[0]).classList.remove('is-open');
    });
  }
  function bindMenu(btnId, menuId) {
    var btn = document.getElementById(btnId);
    var menu = document.getElementById(menuId);
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.hidden;
      closeMenus();
      menu.hidden = !open;
      btn.classList.toggle('is-open', open);
    });
  }
  bindMenu('lmColBtn', 'lmColMenu');
  bindMenu('lmFilterBtn', 'lmFilterMenu');
  bindMenu('lmSettingsBtn', 'lmSettingsMenu');
  document.getElementById('lmColList').addEventListener('change', function (e) {
    var i = e.target.getAttribute('data-col-i');
    if (i == null) return;
    COLS[+i].on = e.target.checked;
    applyCols();
  });
  document.getElementById('lmColSelAll').addEventListener('click', function (e) {
    e.stopPropagation();
    var allOn = COLS.every(function (c) { return c.on; });
    COLS.forEach(function (c) { c.on = !allOn; });
    renderColList();
    applyCols();
  });
  document.querySelectorAll('[data-filter-acc]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var panel = btn.getAttribute('data-filter-acc') === 'date' ? document.getElementById('lmFilterDate') : document.getElementById('lmFilterAssign');
      var show = panel.hidden;
      panel.hidden = !show;
      btn.classList.toggle('is-open', show);
    });
  });
  document.getElementById('lmFilterReset').addEventListener('click', function (e) {
    e.stopPropagation();
    document.getElementById('lmFilterFrom').value = '';
    document.getElementById('lmFilterTo').value = '';
    document.getElementById('lmFilterAssignInput').value = '';
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.lm-col-wrap')) closeMenus();
  });
  renderColList();

  renderTable();
})();
