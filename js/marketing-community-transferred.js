(function () {
  'use strict';

  var EMPLOYEES = [
    'Tarun Gaur', 'Suhanshi Rawat', 'SONIYA KASHYAP', 'Hardik rawat', 'SIMRAN KASHYAP',
    'Aastha Tyagi', 'Shivam Kumar', 'Aakash', 'Monu Kumar', 'Kamal Kant Sharma'
  ];

  var ORGS = ['CA CloudDesk - Demo Account', 'Law Seva Management Pvt. Ltd', 'Bluemon Wealth Management'];

  var currentTab = 'pending';
  var filters = { service: '', person: '', org: '' };

  var clock = document.getElementById('mctTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  function getHeadHtml() {
    var lastCol = currentTab === 'pending' ? 'Take Action' : 'Status';
    return '<tr><th>S. No.</th><th>Task Name</th><th>Assinged By</th><th>Organization Name</th>' +
      '<th>Task Details</th><th>Community Price</th><th>Offer Price</th><th>Terms</th><th>' + lastCol + '</th></tr>';
  }

  function renderTable() {
    document.getElementById('mctTableHead').innerHTML = getHeadHtml();
    document.getElementById('mctTableBody').innerHTML = '';
    document.querySelector('.mct-table-wrap').classList.remove('has-rows');
    document.getElementById('mctCount').textContent = '0 / 0';
    document.getElementById('mctPageTotal').textContent = '1';
  }

  function setTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.mct-tab').forEach(function (t) {
      var active = t.getAttribute('data-tab') === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.getElementById('mctPersonFilter').placeholder = tab === 'pending' ? 'Assignee' : 'Assigned By';
    renderTable();
  }

  function closeCombos(except) {
    document.querySelectorAll('.mct-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }

  function getList(key) {
    if (key === 'person') return EMPLOYEES;
    if (key === 'org') return ORGS;
    return [];
  }

  function renderComboMenu(combo, q) {
    var key = combo.getAttribute('data-list');
    var menu = combo.querySelector('.mct-combo__menu');
    var qq = (q || '').toLowerCase();
    menu.innerHTML = getList(key).filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; })
      .map(function (n) { return '<div class="mct-combo__item">' + n + '</div>'; }).join('') ||
      '<div class="mct-combo__item">No matches</div>';
  }

  document.querySelectorAll('.mct-combo').forEach(function (combo) {
    var input = combo.querySelector('input');
    var menu = combo.querySelector('.mct-combo__menu');
    var key = combo.getAttribute('data-list');
    function open() { renderComboMenu(combo, input.value); closeCombos(combo); combo.classList.add('is-open'); }
    input.addEventListener('focus', open);
    input.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    input.addEventListener('input', function () { renderComboMenu(combo, input.value); combo.classList.add('is-open'); });
    menu.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.mct-combo__item');
      if (!item || item.textContent.trim() === 'No matches') return;
      e.preventDefault();
      input.value = item.textContent.trim();
      filters[key === 'person' ? 'person' : 'org'] = input.value;
      combo.classList.remove('is-open');
      renderTable();
    });
  });

  document.getElementById('mctSearchServices').addEventListener('input', function () {
    filters.service = this.value.trim();
    renderTable();
  });

  document.querySelectorAll('.mct-tab').forEach(function (tab) {
    tab.addEventListener('click', function () { setTab(tab.getAttribute('data-tab')); });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mct-combo')) closeCombos();
  });

  setTab('pending');
})();
