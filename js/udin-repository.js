/* TIME ERP — UDIN Repository */
(function () {
  'use strict';

  /* Clock */
  (function tick() {
    var el = document.getElementById('udinTopClock'); if (!el) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
    setTimeout(tick, 30000);
  })();

  var pad = function (n) { return n < 10 ? '0' + n : n; };
  var now = new Date();
  var todayStr = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());

  /* Combo helper */
  function initCombo(comboId, inputId, menuId, items) {
    var combo = document.getElementById(comboId);
    var input = document.getElementById(inputId);
    var menu = document.getElementById(menuId);
    if (!combo || !input || !menu) return;
    function render(filter) {
      var q = (filter || '').toLowerCase(); menu.innerHTML = '';
      items.forEach(function (item) {
        if (q && item.toLowerCase().indexOf(q) === -1) return;
        var div = document.createElement('div');
        div.className = 'udin-combo__item' + (item === input.value ? ' is-selected' : '');
        if (!div.className.includes('udin-combo')) div.className = (comboId.indexOf('Emp') > -1 ? 'udin-emp-combo__item' : 'udin-combo__item') + (item === input.value ? ' is-selected' : '');
        div.textContent = item;
        div.addEventListener('click', function () { input.value = item; combo.classList.remove('is-open'); });
        menu.appendChild(div);
      });
    }
    input.addEventListener('focus', function () { render(''); combo.classList.add('is-open'); });
    input.addEventListener('input', function () { render(input.value); combo.classList.add('is-open'); });
    document.addEventListener('click', function (e) { if (!combo.contains(e.target)) combo.classList.remove('is-open'); });
  }

  var STAFF = ['Tarun Gaur','Suhanshi Rawat','SONIYA KASHYAP','Hardik rawat','SIMRAN KASHYAP','Aastha Tyagi','Shivam Kumar','Aakash','Monu Kumar','Kamal Kant Sharma'];
  var CLIENTS = ['(21) Internal','(174) SAURABH BHARDWAJ','(173) SAURABH BHARDWAJ HUF','(TH296) THE GOLD REALTY','(LA3720) law seva management private limited','(145) PERFECT PAIR','(TA119098) TATA MOTORS PASSENGER VEHICLES LIMITED','(SA128007) Saksham'];
  var BRANCHES = ['CA CloudDesk','Bluemon Wealth Management','Law Seva Management Private Limited','saurabh bharadwaj'];
  var STATUSES = ['Active','Revoke','Cancelled','Pending','Verified','Amended','Expired'];

  initCombo('udinEmpCombo', 'udinEmpInput', 'udinEmpMenu', STAFF);

  /* Columns dropdown */
  var COLS = ['#','Employee','Client Name','Branch','UDIN No.','UDIN Date','Purpose','Status','Other Fields','Notes','View Certificate','working Document','Other Docs','Action'];
  var colWrap = document.getElementById('udinColWrap');
  var colBtn = document.getElementById('udinColBtn');
  var colList = document.getElementById('udinColList');
  COLS.forEach(function (c) {
    var lbl = document.createElement('label');
    lbl.innerHTML = '<input type="checkbox" checked> ' + c;
    colList.appendChild(lbl);
  });
  colBtn.addEventListener('click', function () { colWrap.classList.toggle('is-open'); });
  document.addEventListener('click', function (e) { if (!colWrap.contains(e.target)) colWrap.classList.remove('is-open'); });

  /* Filter dropdown */
  var filterWrap = document.getElementById('udinFilterWrap');
  var filterBtn = document.getElementById('udinFilterBtn');
  filterBtn.addEventListener('click', function () { filterWrap.classList.toggle('is-open'); });
  document.addEventListener('click', function (e) { if (!filterWrap.contains(e.target)) filterWrap.classList.remove('is-open'); });

  /* Table data */
  var DATA = [
    { emp: 'Dev Aggarwal', client: 'Saksham', branch: 'CA CloudDesk', udin: '554', date: '2026-03-20', purpose: '--', status: 'Active', other: '--', notes: '--', cert: '--', work: '--', docs: '--' },
    { emp: 'Saurabh Bhardwaj', client: 'SAURABH BHARDWAJ', branch: 'Bluemon Wealth Management', udin: '4444444444444444', date: '2026-03-03', purpose: '--', status: 'Active', other: '--', notes: '--', cert: 'View', work: '--', docs: '--' },
    { emp: 'Saurabh Bhardwaj', client: 'SAURABH BHARDWAJ', branch: '--', udin: 'sfdsdfs', date: '2025-07-22', purpose: '--', status: 'Active', other: '--', notes: '--', cert: '--', work: '--', docs: '--' },
    { emp: 'Saurabh Bhardwaj', client: 'SAURABH BHARDWAJ HUF', branch: '--', udin: '23322343242347', date: '2025-04-30', purpose: 'certificate', status: 'Active', other: '--', notes: '--', cert: '--', work: '--', docs: '--' },
    { emp: 'Saurabh Bhardwaj', client: 'SAURABH BHARDWAJ', branch: '--', udin: '2332234324234', date: '2025-03-24', purpose: '--', status: 'Active', other: '--', notes: '--', cert: '--', work: '--', docs: '--' },
    { emp: 'Saurabh Bhardwaj', client: 'SAURABH BHARDWAJ', branch: '--', udin: 'A1B2', date: '2025-01-16', purpose: '--', status: 'Active', other: '--', notes: '--', cert: '--', work: '--', docs: '--' },
    { emp: 'Saurabh Bhardwaj', client: 'SAURABH BHARDWAJ', branch: '--', udin: '768768678775463456', date: '2025-01-09', purpose: 'certificate', status: 'Active', other: '--', notes: '--', cert: '--', work: '--', docs: '--' },
    { emp: 'Saurabh Bhardwaj', client: 'SAURABH BHARDWAJ HUF', branch: '--', udin: 'XYZ121313', date: '2025-01-09', purpose: 'certificate', status: 'Active', other: '--', notes: '--', cert: '--', work: '--', docs: '--' },
    { emp: 'Saurabh Bhardwaj', client: 'SAURABH BHARDWAJ', branch: '--', udin: 'fgdfgdfgdfgdf45345634534', date: '2025-01-07', purpose: 'certificate', status: 'Active', other: '21', notes: 'hjk', cert: '--', work: '--', docs: '--' },
    { emp: 'Saurabh Bhardwaj', client: 'SAURABH BHARDWAJ HUF', branch: '--', udin: 'A123', date: '2025-01-07', purpose: 'certificate', status: 'Active', other: '21', notes: 'hjk', cert: '--', work: '--', docs: '--' },
    { emp: 'Saurabh Bhardwaj', client: 'Siraj Trading Co.', branch: '--', udin: '1234', date: '2025-01-06', purpose: 'certificate', status: 'Active', other: '21', notes: 'hjk', cert: '--', work: '--', docs: '--' }
  ];

  var tbody = document.getElementById('udinBody');
  function renderTable() {
    tbody.innerHTML = '';
    DATA.forEach(function (r, i) {
      var tr = document.createElement('tr');
      var certHtml = r.cert === 'View' ? '<a href="#" class="udin-link">View</a>' : r.cert;
      tr.innerHTML = '<td>' + (i + 1) + '</td><td>' + r.emp + '</td><td>' + r.client + '</td><td>' + r.branch + '</td>' +
        '<td>' + r.udin + '</td><td>' + r.date + '</td><td>' + r.purpose + '</td><td>' + r.status + '</td>' +
        '<td>' + r.other + '</td><td>' + r.notes + '</td><td>' + certHtml + '</td><td>' + r.work + '</td><td>' + r.docs + '</td>' +
        '<td class="udin-td-actions"><div class="udin-row-actions">' +
        '<span class="udin-link" data-idx="' + i + '" data-action="edit">Edit</span>' +
        '<span class="udin-link" data-idx="' + i + '" data-action="delete">Delete</span></div></td>';
      tbody.appendChild(tr);
    });
  }
  renderTable();

  /* Modal */
  var modal = document.getElementById('udinModal');
  var modalTitle = document.getElementById('udinModalTitle');
  var modalClose = document.getElementById('udinModalClose');
  var modalSave = document.getElementById('udinModalSave');
  var addBtn = document.getElementById('udinAddBtn');

  var mDateEl = document.getElementById('udinMDate');

  function openModal(title, data) {
    modalTitle.textContent = title;
    if (mDateEl) mDateEl.value = (data && data.date) || todayStr;
    if (data) {
      document.getElementById('udinMBranchInput').value = data.branch || 'Bluemon Wealth Management';
      document.getElementById('udinMEmpInput').value = data.emp || 'Kamal Kant Sharma';
      document.getElementById('udinMStatusInput').value = data.status || 'Active';
      document.getElementById('udinMClientInput').value = data.client || '';
      document.getElementById('udinMNo').value = data.udin || '';
      document.getElementById('udinMPurpose').value = data.purpose === '--' ? '' : (data.purpose || '');
      document.getElementById('udinMOther').value = data.other === '--' ? '' : (data.other || '');
      document.getElementById('udinMNote').value = data.notes === '--' ? '' : (data.notes || '');
    }
    modal.hidden = false;
  }
  function closeModal() { modal.hidden = true; }

  addBtn.addEventListener('click', function () { openModal('Add UDIN', null); });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  modalSave.addEventListener('click', function () { closeModal(); if (window.DashboardShell) DashboardShell.toast('UDIN', 'UDIN saved.'); });

  /* Delete confirmation popover */
  var delPop = document.getElementById('udinDelPop');
  var pendingDeleteIdx = null;
  function closeDelPop() { if (delPop) delPop.hidden = true; pendingDeleteIdx = null; }
  if (document.getElementById('udinDelNo')) document.getElementById('udinDelNo').addEventListener('click', function (e) { e.stopPropagation(); closeDelPop(); });
  if (document.getElementById('udinDelYes')) document.getElementById('udinDelYes').addEventListener('click', function (e) {
    e.stopPropagation();
    if (pendingDeleteIdx !== null && DATA[pendingDeleteIdx]) DATA.splice(pendingDeleteIdx, 1);
    closeDelPop();
    renderTable();
  });
  document.addEventListener('click', function (e) {
    if (delPop && !delPop.hidden && !e.target.closest('#udinDelPop') && !e.target.closest('[data-action="delete"]')) closeDelPop();
  });

  /* Edit/Delete from table */
  tbody.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var idx = parseInt(el.getAttribute('data-idx'), 10);
    if (el.getAttribute('data-action') === 'edit') {
      openModal('Edit UDIN', DATA[idx]);
    } else if (el.getAttribute('data-action') === 'delete') {
      e.stopPropagation();
      pendingDeleteIdx = idx;
      if (!delPop) return;
      var r = el.getBoundingClientRect();
      delPop.hidden = false;
      delPop.style.left = (r.left + r.width / 2 - delPop.offsetWidth / 2) + 'px';
      delPop.style.top = (r.top - delPop.offsetHeight - 12) + 'px';
    }
  });

  /* Modal combos */
  initCombo('udinMBranchCombo', 'udinMBranchInput', 'udinMBranchMenu', BRANCHES);
  initCombo('udinMEmpCombo', 'udinMEmpInput', 'udinMEmpMenu', STAFF);
  initCombo('udinMStatusCombo', 'udinMStatusInput', 'udinMStatusMenu', STATUSES);
  initCombo('udinMClientCombo', 'udinMClientInput', 'udinMClientMenu', CLIENTS);
})();
