/* TIME ERP — Add Inward/Outward Docs */
(function () {
  'use strict';

  /* Clock */
  function tick() {
    var el = document.getElementById('aioTopClock');
    if (!el) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
  }
  tick(); setInterval(tick, 30000);

  /* Set default entry date */
  var dateInput = document.getElementById('aioEntryDate');
  if (dateInput) {
    var now = new Date();
    var pad = function (n) { return n < 10 ? '0' + n : n; };
    dateInput.value = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + 'T' + pad(now.getHours()) + ':' + pad(now.getMinutes());
  }

  /* Combo helper */
  function initCombo(comboId, inputId, menuId, items) {
    var combo = document.getElementById(comboId);
    var input = document.getElementById(inputId);
    var menu = document.getElementById(menuId);
    if (!combo || !input || !menu) return;
    var selected = input.value || '';

    function render(filter) {
      var q = (filter || '').toLowerCase();
      menu.innerHTML = '';
      items.forEach(function (item) {
        if (q && item.toLowerCase().indexOf(q) === -1) return;
        var div = document.createElement('div');
        div.className = 'aio-combo__item' + (item === selected ? ' is-selected' : '');
        div.textContent = item;
        div.addEventListener('click', function () {
          selected = item; input.value = item; combo.classList.remove('is-open');
        });
        menu.appendChild(div);
      });
    }
    input.addEventListener('focus', function () { render(''); combo.classList.add('is-open'); });
    input.addEventListener('input', function () { render(input.value); combo.classList.add('is-open'); });
    document.addEventListener('click', function (e) {
      if (!combo.contains(e.target)) combo.classList.remove('is-open');
    });
  }

  var CLIENTS = ['Internal', 'SAURABH BHARDWAJ', 'SAURABH BHARDWAJ HUF', 'THE GOLD REALTY',
    'Law seva management private limited', 'PERFECT PAIR', 'TATA MOTORS PASSENGER VEHICLES LIMITED', 'Saksham'];

  var STAFF = ['SONIYA KASHYAP', 'rawat', 'SIMRAN KASHYAP', 'Aastha Tyagi', 'Shivam Kumar',
    'Aakash', 'Monu Kumar', 'Kamal Kant Sharma'];

  initCombo('aioClientCombo', 'aioClientInput', 'aioClientMenu', CLIENTS);
  initCombo('aioHandOverCombo', 'aioHandOverInput', 'aioHandOverMenu', STAFF);

  /* Cancel */
  var cancelBtn = document.getElementById('aioCancel');
  if (cancelBtn) cancelBtn.addEventListener('click', function () { window.location.href = 'inward_outward.html'; });

  /* Pre-fill from URL params (edit mode) */
  var params = new URLSearchParams(window.location.search);
  if (params.get('type')) {
    var typeVal = params.get('type');
    var radio = document.querySelector('input[name="aioType"][value="' + typeVal + '"]');
    if (radio) radio.checked = true;
  }
  if (params.get('client')) document.getElementById('aioClientInput').value = params.get('client');
  if (params.get('file')) document.getElementById('aioFileName').value = params.get('file');
  if (params.get('mode')) {
    var mRadio = document.querySelector('input[name="aioMode"][value="' + params.get('mode') + '"]');
    if (mRadio) mRadio.checked = true;
  }
  if (params.get('docType')) document.getElementById('aioDocType').value = params.get('docType');
  if (params.get('loc')) document.getElementById('aioLocation').value = params.get('loc');
  if (params.get('handTo')) document.getElementById('aioHandOverInput').value = params.get('handTo');
  if (params.get('handBy')) document.getElementById('aioHandOverByName').value = params.get('handBy');
  if (params.get('date')) dateInput.value = params.get('date');
  if (params.get('notes') && params.get('notes') !== '--') document.getElementById('aioNotes').value = params.get('notes');

  /* Toggle form based on Inward / Outward */
  var typeRadios = document.querySelectorAll('input[name="aioType"]');
  var handOverToLabel = document.getElementById('aioHandOverToLabel');
  var handOverByLabel = document.getElementById('aioHandOverByLabel');
  var fileReq = document.getElementById('aioFileReq');
  var handOverByInput = document.getElementById('aioHandOverByName');
  var inwardDocRow = document.getElementById('aioInwardDocRow');

  function updateForm() {
    var val = document.querySelector('input[name="aioType"]:checked').value;
    if (val === 'Inward') {
      handOverToLabel.textContent = 'Hand Over To :';
      handOverByLabel.textContent = 'Hand Over By Name :';
      handOverByInput.placeholder = 'Hand Over By Name';
      if (fileReq) fileReq.style.display = '';
      if (inwardDocRow) inwardDocRow.style.display = 'none';
    } else {
      handOverToLabel.textContent = 'Hand Over To Name :';
      handOverByLabel.textContent = 'Hand Over By :';
      handOverByInput.placeholder = 'Hand Over To Name';
      if (fileReq) fileReq.style.display = 'none';
      if (inwardDocRow) inwardDocRow.style.display = '';
    }
  }
  typeRadios.forEach(function (r) { r.addEventListener('change', updateForm); });
  updateForm();

  /* Save */
  var saveBtn = document.getElementById('aioSave');
  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      if (window.DashboardShell) DashboardShell.toast('Saved', 'Inward/Outward document saved.');
    });
  }
})();
