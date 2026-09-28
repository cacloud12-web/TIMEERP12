(function () {
  'use strict';

  var SERVICES = [
    '10BD', '12A/80G Registration', '24G Return', 'ACCOUNT FEES', 'Accounting',
    'Account Review', 'Accounts', 'AD Code', 'Annual Filing', 'Audit', 'Bank Reconciliation',
    'Book Keeping', 'Business Registration', 'Company Formation', 'Compliance', 'DSC',
    'Financial Statements', 'GST Filing', 'GST Registration', 'Income Tax Return', 'ITR Filing',
    'MCA Filing', 'Payroll', 'ROC Filing', 'TDS Filing', 'Trademark Registration'
  ];

  var CATEGORIES = [
    'Account & Finance', 'Indirect Taxes', 'Direct Taxes', 'Audit and Assurance',
    'Business Advisory and Consulting', 'Compliance and Regulatory Services',
    'Finance and Funding Services', 'Other Services'
  ];

  var store = {};
  var serviceInput = document.getElementById('mwsvServiceInput');
  var categoryInput = document.getElementById('mwsvCategoryInput');
  var editor = document.getElementById('mwsvEditor');
  var rte = document.getElementById('mwsvSec2Rte');
  var wordCount = document.getElementById('mwsvWordCount');

  var clock = document.getElementById('mwsvTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  function toast(title, body) {
    if (window.DashboardShell) DashboardShell.toast(title, body);
  }

  function key() {
    var s = serviceInput.value.trim();
    var c = categoryInput.value.trim();
    if (!s || !c) return '';
    return s + '::' + c;
  }

  function emptyData() {
    return {
      sec1Desc: '', sec1Image: '', sec2Heading: '', sec2Rte: '', sec2Image: '',
      sec3Heading: '', sec3P1: '', sec3P2: '', sec3P3: '', sec3P4: ''
    };
  }

  function readForm() {
    return {
      sec1Desc: document.getElementById('mwsvSec1Desc').value,
      sec1Image: document.getElementById('mwsvSec1Image').files[0] ? document.getElementById('mwsvSec1Image').files[0].name : '',
      sec2Heading: document.getElementById('mwsvSec2Heading').value,
      sec2Rte: rte ? rte.innerHTML : '',
      sec2Image: document.getElementById('mwsvSec2Image').files[0] ? document.getElementById('mwsvSec2Image').files[0].name : '',
      sec3Heading: document.getElementById('mwsvSec3Heading').value,
      sec3P1: document.getElementById('mwsvSec3P1').value,
      sec3P2: document.getElementById('mwsvSec3P2').value,
      sec3P3: document.getElementById('mwsvSec3P3').value,
      sec3P4: document.getElementById('mwsvSec3P4').value
    };
  }

  function writeForm(data) {
    var d = data || emptyData();
    document.getElementById('mwsvSec1Desc').value = d.sec1Desc || '';
    document.getElementById('mwsvSec2Heading').value = d.sec2Heading || '';
    if (rte) rte.innerHTML = d.sec2Rte || '';
    document.getElementById('mwsvSec3Heading').value = d.sec3Heading || '';
    document.getElementById('mwsvSec3P1').value = d.sec3P1 || '';
    document.getElementById('mwsvSec3P2').value = d.sec3P2 || '';
    document.getElementById('mwsvSec3P3').value = d.sec3P3 || '';
    document.getElementById('mwsvSec3P4').value = d.sec3P4 || '';
    updateWordCount();
  }

  function saveCurrent() {
    var k = key();
    if (!k) return;
    store[k] = readForm();
  }

  function loadCurrent() {
    var k = key();
    writeForm(k ? store[k] : emptyData());
  }

  function toggleEditor() {
    var show = serviceInput.value.trim() && categoryInput.value.trim() &&
      SERVICES.indexOf(serviceInput.value.trim()) !== -1 &&
      CATEGORIES.indexOf(categoryInput.value.trim()) !== -1;
    if (show) {
      editor.removeAttribute('hidden');
      loadCurrent();
    } else editor.setAttribute('hidden', '');
  }

  function getList(listKey) {
    if (listKey === 'service') return SERVICES;
    if (listKey === 'category') return CATEGORIES;
    return [];
  }

  function closeCombos(except) {
    document.querySelectorAll('.mwsv-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }

  function renderMenu(combo, q) {
    var listKey = combo.getAttribute('data-list');
    var menu = combo.querySelector('.mwsv-combo__menu');
    var qq = (q || '').toLowerCase();
    menu.innerHTML = getList(listKey).filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; })
      .map(function (n) { return '<div class="mwsv-combo__item">' + n + '</div>'; }).join('') ||
      '<div class="mwsv-combo__item">No matches</div>';
  }

  function onSelectChange() {
    saveCurrent();
    toggleEditor();
  }

  document.querySelectorAll('.mwsv-combo').forEach(function (combo) {
    var input = combo.querySelector('input');
    var menu = combo.querySelector('.mwsv-combo__menu');
    function open() { renderMenu(combo, input.value); closeCombos(combo); combo.classList.add('is-open'); }
    input.addEventListener('focus', open);
    input.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    input.addEventListener('input', function () { renderMenu(combo, input.value); combo.classList.add('is-open'); onSelectChange(); });
    menu.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.mwsv-combo__item');
      if (!item || item.textContent.trim() === 'No matches') return;
      e.preventDefault();
      saveCurrent();
      input.value = item.textContent.trim();
      combo.classList.remove('is-open');
      onSelectChange();
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mwsv-combo')) closeCombos();
  });

  document.querySelectorAll('.mwsv-acc__head').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var acc = btn.closest('.mwsv-acc');
      var open = acc.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  function updateWordCount() {
    if (!wordCount || !rte) return;
    var text = (rte.textContent || '').trim();
    var n = text ? text.split(/\s+/).length : 0;
    wordCount.textContent = n + ' word' + (n === 1 ? '' : 's');
  }

  if (rte) {
    rte.addEventListener('input', updateWordCount);
    document.querySelectorAll('.mwsv-rte__bar button[data-cmd]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cmd = btn.getAttribute('data-cmd');
        if (cmd === 'foreColor') document.execCommand('foreColor', false, '#25b7a7');
        else document.execCommand(cmd, false, null);
        rte.focus();
        updateWordCount();
      });
    });
  }

  document.querySelectorAll('.mwsv-upload').forEach(function (btn) {
    var uploadKey = btn.getAttribute('data-upload');
    var input = uploadKey === 'sec1' ? document.getElementById('mwsvSec1Image') :
      uploadKey === 'sec2' ? document.getElementById('mwsvSec2Image') : null;
    if (!input) return;
    btn.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () {
      var span = btn.querySelector('span');
      if (span) span.textContent = input.files && input.files[0] ? input.files[0].name : 'Click to Upload';
    });
  });

  document.getElementById('mwsvSaveBtn').addEventListener('click', function () {
    var k = key();
    if (!k) { toast('Required', 'Select a service and category first.'); return; }
    store[k] = readForm();
    toast('Saved', serviceInput.value + ' content saved successfully.');
  });

  var params = new URLSearchParams(window.location.search);
  if (params.get('service') && SERVICES.indexOf(params.get('service')) !== -1) serviceInput.value = params.get('service');
  if (params.get('category') && CATEGORIES.indexOf(params.get('category')) !== -1) categoryInput.value = params.get('category');
  toggleEditor();
})();
