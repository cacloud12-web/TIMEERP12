/* TIME ERP — View Form 145 Part A */
(function () {
  'use strict';

  (function tick() {
    var el = document.getElementById('f1TopClock'); if (!el) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
    setTimeout(tick, 30000);
  })();

  /* Client combo */
  var CLIENTS = ['(21) Internal','(174) SAURABH BHARD...','(173) SAURABH BHARD...','(TH296) THE GOLD REA...','(LA3720) law seva mana...','(145) PERFECT PAIR','(TA119098) TATA MOTO...','(SA128007) Saksham'];
  var combo = document.getElementById('f1ClientCombo');
  if (combo) {
    var inp = combo.querySelector('.f1-combo__input'), list = document.getElementById('f1ClientList');
    function renderClients(f) {
      var q = (f || '').toLowerCase(); list.innerHTML = '';
      CLIENTS.forEach(function (c) {
        if (q && c.toLowerCase().indexOf(q) === -1) return;
        var d = document.createElement('div'); d.className = 'f1-combo__opt'; d.textContent = c;
        d.addEventListener('click', function () { inp.value = c; combo.classList.remove('is-open'); });
        list.appendChild(d);
      });
    }
    inp.addEventListener('focus', function () { renderClients(inp.value); combo.classList.add('is-open'); });
    inp.addEventListener('input', function () { renderClients(inp.value); combo.classList.add('is-open'); });
    document.addEventListener('click', function (e) { if (!combo.contains(e.target)) combo.classList.remove('is-open'); });
  }

  /* Filter */
  var filterWrap = document.getElementById('f1FilterWrap');
  var filterBtn = document.getElementById('f1FilterBtn'), filterDrop = document.getElementById('f1FilterDrop');
  filterBtn.addEventListener('click', function (e) { e.stopPropagation(); filterWrap.classList.toggle('is-open'); });
  filterDrop.addEventListener('click', function (e) { e.stopPropagation(); });
  document.addEventListener('click', function () { filterWrap.classList.remove('is-open'); });

  document.querySelectorAll('.f1-fsec__head').forEach(function (head) {
    head.addEventListener('click', function (e) {
      e.stopPropagation();
      var key = head.getAttribute('data-sec');
      var body = document.querySelector('[data-body="' + key + '"]');
      var isOpen = body.classList.contains('open');
      document.querySelectorAll('.f1-fsec__body').forEach(function (b) { b.classList.remove('open'); });
      document.querySelectorAll('.f1-fsec__head').forEach(function (h) { h.classList.remove('expanded'); });
      if (!isOpen) { body.classList.add('open'); head.classList.add('expanded'); }
    });
  });

  /* Tabs */
  document.querySelectorAll('.f1-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.f1-tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var which = tab.getAttribute('data-tab');
      document.getElementById('panelPartA').hidden = which !== 'partA';
      document.getElementById('panelDrafts').hidden = which !== 'drafts';
    });
  });

  /* Part A data */
  var DATA_A = [
    { serial: 1, client: 'SAURABH BHARDWAJ', remName: '--', remPan: '--', remStatus: '--', rCountry: '--', rFloor: '--', rRoad: '--', rZip: '--', rPost: '--', rArea: '--', rTown: '--', rState: '--', rMobile: '--', rEmail: '--', recipName: '--', saveAs: '--', recipPan: '--', eCountry: '--', eFlat: '--', eRoad: '--', eZip: '--', ePost: '--', eArea: '--', eDist: '--', eState: '--', countryTo: '--', amount: '--', aggregate: '--', ifsc: '--', bank: '--', specBank: '--', branch: '--', propDate: '10/02/2026', nature: '--', specNature: '--', purposeCode: '--', subCode: '--', tdsAmt: '--', tdsRate: '--', tdsDate: '10/02/2026' }
  ];

  function dd(v) { return v || '--'; }
  function renderA() {
    var tbody = document.getElementById('f1BodyA'); tbody.innerHTML = '';
    DATA_A.forEach(function (r) {
      var tr = document.createElement('tr');
      tr.innerHTML = '<td>' + r.serial + '</td><td>' + dd(r.client) + '</td><td>' + dd(r.remName) + '</td><td>' + dd(r.remPan) + '</td><td>' + dd(r.remStatus) + '</td>' +
        '<td>' + dd(r.rCountry) + '</td><td>' + dd(r.rFloor) + '</td><td>' + dd(r.rRoad) + '</td><td>' + dd(r.rZip) + '</td><td>' + dd(r.rPost) + '</td><td>' + dd(r.rArea) + '</td><td>' + dd(r.rTown) + '</td><td>' + dd(r.rState) + '</td>' +
        '<td>' + dd(r.rMobile) + '</td><td>' + dd(r.rEmail) + '</td><td>' + dd(r.recipName) + '</td><td>' + dd(r.saveAs) + '</td><td>' + dd(r.recipPan) + '</td>' +
        '<td>' + dd(r.eCountry) + '</td><td>' + dd(r.eFlat) + '</td><td>' + dd(r.eRoad) + '</td><td>' + dd(r.eZip) + '</td><td>' + dd(r.ePost) + '</td><td>' + dd(r.eArea) + '</td><td>' + dd(r.eDist) + '</td><td>' + dd(r.eState) + '</td>' +
        '<td>' + dd(r.countryTo) + '</td><td>' + dd(r.amount) + '</td><td>' + dd(r.aggregate) + '</td>' +
        '<td>' + dd(r.ifsc) + '</td><td>' + dd(r.bank) + '</td><td>' + dd(r.specBank) + '</td><td>' + dd(r.branch) + '</td><td>' + dd(r.propDate) + '</td><td>' + dd(r.nature) + '</td><td>' + dd(r.specNature) + '</td><td>' + dd(r.purposeCode) + '</td><td>' + dd(r.subCode) + '</td>' +
        '<td>' + dd(r.tdsAmt) + '</td><td>' + dd(r.tdsRate) + '</td><td>' + dd(r.tdsDate) + '</td>' +
        '<td><a href="#" class="f1-link">View</a></td><td>--</td><td>ⓘ</td><td><a href="#" class="f1-link">Edit</a></td>';
      tbody.appendChild(tr);
    });
    document.getElementById('f1InfoA').textContent = DATA_A.length + ' / ' + DATA_A.length;
  }
  renderA();

  /* Drafts data */
  var DATA_D = [
    { serial: 1, client: 'THE GOLD REALTY', remName: 'dhn', remPan: '25652626', remStatus: 'I', rCountry: '--', rFloor: '--', rRoad: '--', rZip: '--', rPost: '--', rArea: '--', rTown: '--', rState: '--' },
    { serial: 2, client: 'Internal', remName: '--', remPan: '--', remStatus: '--', rCountry: '--', rFloor: '--', rRoad: '--', rZip: '--', rPost: '--', rArea: '--', rTown: '--', rState: '--' },
    { serial: 3, client: 'Saksham', remName: 'Mr.X', remPan: '1123', remStatus: 'We', rCountry: 'INDIA', rFloor: '--', rRoad: '--', rZip: '--', rPost: '--', rArea: '--', rTown: '--', rState: '--' }
  ];

  function renderD() {
    var tbody = document.getElementById('f1BodyD'); tbody.innerHTML = '';
    DATA_D.forEach(function (r) {
      var tr = document.createElement('tr');
      tr.innerHTML = '<td>' + r.serial + '</td><td>' + dd(r.client) + '</td><td>' + dd(r.remName) + '</td><td>' + dd(r.remPan) + '</td><td>' + dd(r.remStatus) + '</td>' +
        '<td>' + dd(r.rCountry) + '</td><td>' + dd(r.rFloor) + '</td><td>' + dd(r.rRoad) + '</td><td>' + dd(r.rZip) + '</td><td>' + dd(r.rPost) + '</td><td>' + dd(r.rArea) + '</td><td>' + dd(r.rTown) + '</td><td>' + dd(r.rState) + '</td>' +
        '<td>--</td><td>--</td><td>--</td><td>--</td><td>--</td>' +
        '<td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td>' +
        '<td>--</td><td>--</td><td>--</td>' +
        '<td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td>' +
        '<td>--</td><td>--</td><td>--</td>' +
        '<td>--</td><td>--</td><td>--</td><td>--</td>';
      tbody.appendChild(tr);
    });
    document.getElementById('f1InfoD').textContent = DATA_D.length + ' / ' + DATA_D.length;
  }
  renderD();
})();
