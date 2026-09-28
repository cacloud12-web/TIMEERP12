(function () {
  'use strict';

  var ORG_NAME = 'CA CloudDesk - Demo Account';
  var ORG_LEN = 27;
  var MAX_HEADER = 60;
  var MAX_EXTRA = MAX_HEADER - ORG_LEN;
  var TYPES = ['Generic', 'Task', 'Invoice', 'Proforma', 'Ledger'];

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

  function closeCombos(except) {
    document.querySelectorAll('.cwt-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }

  var typeCombo = document.querySelector('.cwt-combo[data-list="type"]');
  var typeInput = document.getElementById('cwtType');
  var typeMenu = typeCombo.querySelector('.cwt-combo__menu');

  function renderTypes() {
    typeMenu.innerHTML = TYPES.map(function (t) {
      return '<div class="cwt-combo__item' + (t === typeInput.value ? ' is-active' : '') + '">' + t + '</div>';
    }).join('');
  }

  typeInput.addEventListener('click', function (e) {
    e.stopPropagation();
    renderTypes();
    closeCombos(typeCombo);
    typeCombo.classList.add('is-open');
  });
  typeMenu.addEventListener('mousedown', function (e) {
    var item = e.target.closest('.cwt-combo__item');
    if (!item) return;
    e.preventDefault();
    typeInput.value = item.textContent;
    typeCombo.classList.remove('is-open');
  });

  document.addEventListener('click', function () { closeCombos(); });

  /* Header char counter */
  var headerInput = document.getElementById('cwtHeader');
  var headerRemain = document.getElementById('cwtHeaderRemain');
  var headerUsed = document.getElementById('cwtHeaderUsed');
  var headerLen = document.getElementById('cwtHeaderLen');

  function updateHeaderStats() {
    var val = headerInput.value || '';
    var extra = val.replace(/\{CA_ORGANIZATION_NAME\}/g, '').length;
    if (extra > MAX_EXTRA) extra = MAX_EXTRA;
    var resolved = ORG_LEN + extra;
    headerUsed.textContent = String(extra);
    headerRemain.textContent = String(MAX_EXTRA - extra);
    headerLen.textContent = String(resolved);
  }
  headerInput.addEventListener('input', updateHeaderStats);
  updateHeaderStats();

  /* Body editor */
  var bodyArea = document.getElementById('cwtBodyArea');
  var bodyCount = document.getElementById('cwtBodyCount');

  function updateBodyCount() {
    var len = (bodyArea.textContent || '').length;
    bodyCount.textContent = String(Math.min(len, 1024));
  }
  bodyArea.addEventListener('input', updateBodyCount);

  document.querySelectorAll('.cwt-editor__tb[data-cmd]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      bodyArea.focus();
      document.execCommand(btn.getAttribute('data-cmd'), false, null);
      updateBodyCount();
    });
  });

  document.querySelectorAll('.cwt-var-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      bodyArea.focus();
      document.execCommand('insertText', false, btn.getAttribute('data-var'));
      updateBodyCount();
    });
  });

  function validate() {
    var title = document.getElementById('cwtTitle').value.trim();
    var body = (bodyArea.textContent || '').trim();
    if (!title || !body) {
      toast('Required', 'Title and Body are required.');
      return false;
    }
    if (body.length > 1024) {
      toast('Limit', 'Body must be 1024 characters or less.');
      return false;
    }
    return true;
  }

  document.getElementById('cwtSaveDraft').addEventListener('click', function () {
    if (!validate()) return;
    toast('Saved', 'Template saved as draft.');
    window.location.href = 'marketing_bulk_whatsapp.html#custom';
  });
  document.getElementById('cwtSaveSubmit').addEventListener('click', function () {
    if (!validate()) return;
    toast('Submitted', 'Template saved and submitted to WhatsApp.');
    window.location.href = 'marketing_bulk_whatsapp.html#custom';
  });

  var editIdx = new URLSearchParams(window.location.search).get('edit');
  if (editIdx !== null && editIdx !== '') {
    var samples = [
      { title: 'Task - client', type: 'TASK', header: '{CA_ORGANIZATION_NAME}', body: 'Dear {CLIENT_NAME}, your task has been updated.', footer: '— {CA_ORGANIZATION_NAME}' },
      { title: 'ITR', type: 'GENERIC', header: '{CA_ORGANIZATION_NAME}', body: 'ITR filing reminder for FY {{year}}.', footer: '— {CA_ORGANIZATION_NAME}' },
      { title: 'ITR (GENERIC)', type: 'GENERIC', header: '{CA_ORGANIZATION_NAME}', body: 'HI, A friendly reminder that your ITR for the FY 2022-23 is due on 31st July.', footer: '— {CA_ORGANIZATION_NAME}' }
    ];
    var s = samples[parseInt(editIdx, 10)];
    if (s) {
      document.getElementById('cwtTitle').value = s.title;
      typeInput.value = s.type.charAt(0) + s.type.slice(1).toLowerCase();
      if (s.type === 'GENERIC') typeInput.value = 'Generic';
      headerInput.value = s.header;
      bodyArea.textContent = s.body;
      document.getElementById('cwtFooter').value = s.footer;
      updateHeaderStats();
      updateBodyCount();
    }
  }
})();
