(function () {
  'use strict';

  var BASE_VARS = [
    { label: 'Client Name', token: '{CLIENT_NAME}' },
    { label: 'CA Organization Name', token: '{CA_ORGANIZATION_NAME}' },
    { label: 'Sender Name', token: '{SENDER_NAME}' }
  ];

  var TASK_VARS = [
    { label: 'Client Name', token: '{CLIENT_NAME}' },
    { label: 'CA Organization Name', token: '{CA_ORGANIZATION_NAME}' },
    { label: 'Sender Name', token: '{SENDER_NAME}' },
    { label: 'Task And Period', token: '{TASKANDPERIOD}' },
    { label: 'Task Number', token: '{TASK_NUMBER}' },
    { label: 'Task Name', token: '{TASK_NAME}' },
    { label: 'Task Status', token: '{TASK_STATUS}' },
    { label: 'Task Due Date', token: '{TASK_DUE_DATE}' },
    { label: 'Task Target Date', token: '{TASK_TARGET_DATE}' },
    { label: 'Task Period From', token: '{TASK_PERIOD_FROM}' },
    { label: 'Task Period To', token: '{TASK_PERIOD_TO}' },
    { label: 'Task Description', token: '{TASK_DESCRIPTION}' },
    { label: 'Task Branch', token: '{TASK_BRANCH}' },
    { label: 'Task Assignee(s)', token: '{TASK_ASSIGNEES}' }
  ];

  var TEMPLATES = {
    'task-client': {
      title: 'Task - client',
      type: 'Task',
      includePdf: false,
      header: '{CA_ORGANIZATION_NAME}',
      body: 'Hi {CLIENT_NAME}\n\nYour Work is started with description {TASKANDPERIOD} & {TASK_NUMBER}. thx',
      footer: '— {CA_ORGANIZATION_NAME}'
    },
    'itr': {
      title: 'ITR',
      type: 'Generic',
      includePdf: false,
      header: '{CA_ORGANIZATION_NAME}',
      body: 'Hi {CLIENT_NAME},\n\nYour ITR filing update is ready for review.',
      footer: '— {CA_ORGANIZATION_NAME}'
    },
    'gst-return': {
      title: 'GST Return',
      type: 'Generic',
      includePdf: false,
      header: '{CA_ORGANIZATION_NAME}',
      body: 'Hi {CLIENT_NAME},\n\nYour GST return has been processed.',
      footer: '— {CA_ORGANIZATION_NAME}'
    },
    'invoice-reminder': {
      title: 'Invoice reminder',
      type: 'Invoice',
      includePdf: false,
      header: '{CA_ORGANIZATION_NAME}',
      body: 'Hi {CLIENT_NAME},\n\nThis is a reminder for your pending invoice.',
      footer: '— {CA_ORGANIZATION_NAME}'
    },
    'ledger-update': {
      title: 'Ledger update',
      type: 'Ledger',
      includePdf: false,
      header: '{CA_ORGANIZATION_NAME}',
      body: 'Hi {CLIENT_NAME},\n\nYour ledger has been updated.',
      footer: '— {CA_ORGANIZATION_NAME}'
    },
    'proforma-follow-up': {
      title: 'Proforma follow-up',
      type: 'Proforma',
      includePdf: false,
      header: '{CA_ORGANIZATION_NAME}',
      body: 'Hi {CLIENT_NAME},\n\nFollowing up on the proforma invoice shared earlier.',
      footer: '— {CA_ORGANIZATION_NAME}'
    },
    'task-completion': {
      title: 'Task completion',
      type: 'Task',
      includePdf: false,
      header: '{CA_ORGANIZATION_NAME}',
      body: 'Hi {CLIENT_NAME},\n\nYour task {TASK_NUMBER} is now complete.',
      footer: '— {CA_ORGANIZATION_NAME}'
    },
    'client-onboarding': {
      title: 'Client onboarding',
      type: 'Generic',
      includePdf: false,
      header: '{CA_ORGANIZATION_NAME}',
      body: 'Hi {CLIENT_NAME},\n\nWelcome! Your client portal access is ready.',
      footer: '— {CA_ORGANIZATION_NAME}'
    },
    'payment-receipt': {
      title: 'Payment receipt',
      type: 'Generic',
      includePdf: false,
      header: '{CA_ORGANIZATION_NAME}',
      body: 'Hi {CLIENT_NAME},\n\nThank you for your payment.',
      footer: '— {CA_ORGANIZATION_NAME}'
    },
    'annual-compliance': {
      title: 'Annual compliance',
      type: 'Generic',
      includePdf: false,
      header: '{CA_ORGANIZATION_NAME}',
      body: 'Hi {CLIENT_NAME},\n\nYour annual compliance documents are ready.',
      footer: '— {CA_ORGANIZATION_NAME}'
    }
  };

  var SLUGS = [
    'task-client', 'itr', 'gst-return', 'invoice-reminder', 'ledger-update',
    'proforma-follow-up', 'task-completion', 'client-onboarding', 'payment-receipt', 'annual-compliance'
  ];

  function toast(title, msg) {
    var stack = document.getElementById('waToastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'waToastStack';
      stack.className = 'wa-toast-stack';
      document.body.appendChild(stack);
    }
    var el = document.createElement('div');
    el.className = 'wa-toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + (msg || '') + '</span>';
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 2800);
  }

  function currentType() {
    return ((document.getElementById('watTypeInput') || {}).value || 'Generic').trim();
  }

  function isTaskType(type) {
    return (type || currentType()).toLowerCase() === 'task';
  }

  function renderBodyVars(type) {
    var wrap = document.getElementById('watVars');
    if (!wrap) return;
    var vars = isTaskType(type) ? TASK_VARS : BASE_VARS;
    wrap.innerHTML = '<span class="wat-vars__label">Body variables:</span>' +
      vars.map(function (v) {
        return '<button type="button" class="wat-var" data-wat-var="' + v.token + '">' + v.label + '</button>';
      }).join('');
  }

  function syncTypeUI(type) {
    var taskRow = document.getElementById('watTaskPdfRow');
    if (taskRow) taskRow.hidden = !isTaskType(type);
    renderBodyVars(type);
    var dropdown = document.getElementById('watTypeDropdown');
    if (dropdown) {
      dropdown.querySelectorAll('.wat-select__item').forEach(function (item) {
        item.classList.toggle('is-active', item.textContent === type);
      });
    }
  }

  function setFormData(data) {
    if (!data) return;
    var title = document.getElementById('watTitle');
    var typeInput = document.getElementById('watTypeInput');
    var header = document.getElementById('watHeader');
    var body = document.getElementById('watBody');
    var footer = document.getElementById('watFooter');
    var pdf = document.getElementById('watIncludePdf');
    if (title) title.value = data.title || '';
    if (typeInput) typeInput.value = data.type || 'Generic';
    if (header) header.value = data.header || '{CA_ORGANIZATION_NAME}';
    if (body) body.textContent = data.body || '';
    if (footer) footer.value = data.footer || '— {CA_ORGANIZATION_NAME}';
    if (pdf) pdf.checked = !!data.includePdf;
    syncTypeUI(data.type || 'Generic');
    updateCharCount();
  }

  function loadFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var edit = params.get('edit');
    if (edit && TEMPLATES[edit]) {
      setFormData(TEMPLATES[edit]);
      return;
    }
    syncTypeUI('Generic');
  }

  function updateCharCount() {
    var body = document.getElementById('watBody');
    var countEl = document.getElementById('watCharCount');
    if (!body || !countEl) return;
    var len = (body.textContent || '').length;
    countEl.textContent = len + ' / 1024 characters';
  }

  function initTypeDropdown() {
    var dropdown = document.getElementById('watTypeDropdown');
    var input = document.getElementById('watTypeInput');
    if (!dropdown || !input) return;

    var items = Array.prototype.slice.call(dropdown.querySelectorAll('.wat-select__item'));

    function closeMenu() { dropdown.classList.remove('is-open'); }
    function openMenu() { dropdown.classList.add('is-open'); }

    input.addEventListener('focus', openMenu);
    input.addEventListener('click', function (e) {
      e.stopPropagation();
      openMenu();
    });
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      items.forEach(function (item) {
        item.style.display = !q || item.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
      });
      openMenu();
    });

    items.forEach(function (item) {
      item.addEventListener('mousedown', function (e) {
        e.preventDefault();
        input.value = item.textContent;
        items.forEach(function (el) { el.classList.remove('is-active'); });
        item.classList.add('is-active');
        syncTypeUI(item.textContent);
        closeMenu();
      });
    });

    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) closeMenu();
    });
  }

  function initBodyEditor() {
    var body = document.getElementById('watBody');
    if (!body) return;

    body.addEventListener('input', updateCharCount);

    document.querySelectorAll('.wat-rt-btn[data-cmd]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.execCommand(btn.getAttribute('data-cmd'), false, null);
        body.focus();
        updateCharCount();
      });
    });

    document.getElementById('watVars').addEventListener('click', function (e) {
      var btn = e.target.closest('.wat-var');
      if (!btn) return;
      var token = btn.getAttribute('data-wat-var') || btn.textContent;
      body.focus();
      document.execCommand('insertText', false, token);
      updateCharCount();
    });
  }

  function validateForm() {
    var title = (document.getElementById('watTitle') || {}).value || '';
    var type = (document.getElementById('watTypeInput') || {}).value || '';
    var bodyText = ((document.getElementById('watBody') || {}).textContent || '').trim();
    if (!title.trim()) { toast('Validation', "'Title' is required!"); return false; }
    if (!type.trim()) { toast('Validation', "'Type' is required!"); return false; }
    if (!bodyText) { toast('Validation', "'Body' is required!"); return false; }
    if (bodyText.length > 1024) { toast('Validation', 'Body exceeds 1024 characters.'); return false; }
    return true;
  }

  function initActions() {
    document.getElementById('watSaveDraft').addEventListener('click', function () {
      if (!validateForm()) return;
      toast('Saved', 'Template saved as draft.');
      setTimeout(function () { window.location.href = 'whatsapp_settings.html#custom'; }, 700);
    });

    document.getElementById('watSaveSubmit').addEventListener('click', function () {
      if (!validateForm()) return;
      toast('Submitted', 'Template saved and submitted to WhatsApp.');
      setTimeout(function () { window.location.href = 'whatsapp_settings.html#custom'; }, 700);
    });
  }

  function boot() {
    initTypeDropdown();
    initBodyEditor();
    initActions();
    loadFromQuery();
    updateCharCount();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.WAT_SLUGS = SLUGS;
})();
