/* TIME ERP — Add Peer Review */
(function () {
  'use strict';

  (function tick() {
    var el = document.getElementById('aprTopClock'); if (!el) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
    setTimeout(tick, 30000);
  })();

  function initCombo(comboId, inputId, menuId, items) {
    var combo = document.getElementById(comboId), input = document.getElementById(inputId), menu = document.getElementById(menuId);
    if (!combo || !input || !menu) return;
    function render(f) {
      var q = (f || '').toLowerCase(); menu.innerHTML = '';
      items.forEach(function (item) {
        if (q && item.toLowerCase().indexOf(q) === -1) return;
        var div = document.createElement('div'); div.className = 'apr-combo__item' + (item === input.value ? ' is-selected' : '');
        div.textContent = item;
        div.addEventListener('click', function () { input.value = item; combo.classList.remove('is-open'); });
        menu.appendChild(div);
      });
    }
    input.addEventListener('focus', function () { render(''); combo.classList.add('is-open'); });
    input.addEventListener('input', function () { render(input.value); combo.classList.add('is-open'); });
    document.addEventListener('click', function (e) { if (!combo.contains(e.target)) combo.classList.remove('is-open'); });
  }

  var BRANCHES = ['CA CloudDesk','Bluemon Wealth Management','Law Seva Management Private Limited','saurabh bharadwaj'];
  var CLIENTS = ['Internal','SAURABH BHARDWAJ','SAURABH BHARDWAJ HUF','THE GOLD REALTY','law seva management private limited','PERFECT PAIR','TATA MOTORS PASSENGER VEHICLES LIMITED','Saksham'];
  var FYS = ['FY 27-28','FY 26-27','FY 25-26','FY 24-25','FY 23-24','FY 22-23','FY 21-22','FY 20-21'];
  var TEAMS = ['GST','Team 1','GST Team'];

  initCombo('aprBranchCombo', 'aprBranchInput', 'aprBranchMenu', BRANCHES);
  initCombo('aprClientCombo', 'aprClientInput', 'aprClientMenu', CLIENTS);
  initCombo('aprFYCombo', 'aprFYInput', 'aprFYMenu', FYS);
  initCombo('aprTeamCombo', 'aprTeamInput', 'aprTeamMenu', TEAMS);
  initCombo('aprUdinCombo', 'aprUdinInput', 'aprUdinMenu', ['A123','A1B2','5453453453','sfdsdfs','--']);

  function val(v) { return !v || v === '--' ? '' : v; }

  function setSelect(id, value) {
    var el = document.getElementById(id); if (!el || !value) return;
    var found = false;
    Array.prototype.forEach.call(el.options, function (opt) {
      if (opt.value === value || opt.textContent === value) { el.value = opt.value; found = true; }
    });
    if (!found) { var o = document.createElement('option'); o.value = value; o.textContent = value; el.appendChild(o); el.value = value; }
  }

  function setRadio(name, value) {
    if (!value) return;
    document.querySelectorAll('input[name="' + name + '"]').forEach(function (r) {
      if (r.value.toLowerCase() === String(value).toLowerCase()) r.checked = true;
    });
  }

  function loadEditRow() {
    var params = new URLSearchParams(window.location.search);
    if (!params.get('edit')) return;
    var raw = sessionStorage.getItem('prEditRow'); if (!raw) return;
    var payload = JSON.parse(raw); var r = payload.row; if (!r) return;
    document.title = 'Edit Peer Review — TimeERP';
    var udinEl = document.getElementById('aprUdinInput'); if (udinEl) udinEl.value = val(r.udin);
    var branchEl = document.getElementById('aprBranchInput'); if (branchEl) branchEl.value = val(r.branch);
    var clientEl = document.getElementById('aprClientInput'); if (clientEl) clientEl.value = val(r.file) || val(r.client);
    var fyEl = document.getElementById('aprFYInput'); if (fyEl) fyEl.value = val(r.fy);
    var svcEl = document.getElementById('aprServices'); if (svcEl) svcEl.value = val(r.svc);
    setSelect('aprTeamIncharge', val(r.team));
    var fileEl = document.getElementById('aprFileNo'); if (fileEl) fileEl.value = val(r.file);
    var panEl = document.getElementById('aprPan'); if (panEl) panEl.value = val(r.pan);
    var turnEl = document.getElementById('aprTurnover'); if (turnEl) turnEl.value = val(r.turnover);
    var netEl = document.getElementById('aprNetworth'); if (netEl) netEl.value = val(r.networth);
    var paidEl = document.getElementById('aprPaid'); if (paidEl) paidEl.value = val(r.paid);
    var borrowEl = document.getElementById('aprBorrow'); if (borrowEl) borrowEl.value = val(r.borrow);
    var feesEl = document.getElementById('aprFees'); if (feesEl) feesEl.value = val(r.fees);
    var profitEl = document.getElementById('aprNetProfit'); if (profitEl) profitEl.value = val(r.profit);
    var remarksEl = document.getElementById('aprRemarks'); if (remarksEl) remarksEl.value = val(r.remarks);
    var indas = val(r.indas);
    if (indas && indas.toLowerCase().indexOf('ind') !== -1) setRadio('aprBS', 'IND AS');
    else if (indas && indas.toLowerCase() === 'as') setRadio('aprBS', 'AS');
    setRadio('aprWeather', val(r.weather));
  }
  loadEditRow();

  /* Stepper */
  var nextBtn = document.getElementById('aprNextBtn');
  var saveBtn = document.getElementById('aprSaveBtn');
  var panel1 = document.getElementById('aprPanel1');
  var panel2 = document.getElementById('aprPanel2');
  var step1 = document.getElementById('aprStep1');
  var step2 = document.getElementById('aprStep2');

  nextBtn.addEventListener('click', function () {
    panel1.style.display = 'none'; panel2.style.display = 'block';
    step1.classList.remove('is-active'); step2.classList.add('is-active');
  });
  saveBtn.addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Peer Review', 'Peer Review saved.');
    window.location.href = 'peer_review.html';
  });
})();
