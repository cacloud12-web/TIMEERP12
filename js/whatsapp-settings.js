(function () {
  'use strict';

  var DEFAULT_BODY = 'Hi {CLIENT_NAME}\n\nYour Work is started with description {TASKANDPERIOD} & {TASK_NUMBER}. thx';

  var SYSTEM_TEMPLATES = [
    { name: 'partner_lead_reminder', header: 'Initial Contact with a Lead', body: 'Hi {CLIENT_NAME},\n\nThis is a reminder to follow up on your lead inquiry. Thank you.', footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'invoice', header: 'invoice_sample.pdf', body: 'Dear {CLIENT_NAME},\n\nPlease find your invoice attached for the recent services.', footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'receipt', header: 'receipt_sample.pdf', body: 'Dear {CLIENT_NAME},\n\nThank you for your payment. Your receipt is attached.', footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'credit_debit_note', header: 'credit_debit_note.pdf', body: 'Dear {CLIENT_NAME},\n\nPlease review the attached credit/debit note.', footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'task_customer_created', header: 'Task Created', body: DEFAULT_BODY, footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'task_customer_updated', header: 'Task Updated', body: 'Hi {CLIENT_NAME},\n\nYour task {TASK_NUMBER} has been updated.', footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'task_customer_assigned', header: 'Task Assigned', body: 'Hi {CLIENT_NAME},\n\nA new task has been assigned to you.', footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'task_customer_reminder', header: 'Task Reminder', body: 'Hi {CLIENT_NAME},\n\nReminder for task {TASK_NUMBER}.', footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'task_customer_completed', header: 'Task Completed', body: 'Hi {CLIENT_NAME},\n\nYour task {TASK_NUMBER} has been completed.', footer: '— CA CloudDesk - Demo Account', enabled: false },
    { name: 'task_scheduled_reminder', header: 'Scheduled Reminder', body: 'Hi {CLIENT_NAME},\n\nThis is your scheduled task reminder.', footer: '— CA CloudDesk - Demo Account', enabled: false },
    { name: 'payment_reminder', header: 'Payment Reminder', body: 'Hi {CLIENT_NAME},\n\nThis is a friendly payment reminder.', footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'document_shared', header: 'Document Shared', body: 'Hi {CLIENT_NAME},\n\nA document has been shared with you.', footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'appointment_reminder', header: 'Appointment Reminder', body: 'Hi {CLIENT_NAME},\n\nReminder for your upcoming appointment.', footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'feedback_request', header: 'Feedback Request', body: 'Hi {CLIENT_NAME},\n\nWe would love your feedback on our services.', footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'ledger_statement', header: 'Ledger Statement', body: 'Hi {CLIENT_NAME},\n\nYour ledger statement is ready for review.', footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'proforma_invoice', header: 'Proforma Invoice', body: 'Hi {CLIENT_NAME},\n\nPlease find your proforma invoice attached.', footer: '— CA CloudDesk - Demo Account', enabled: true },
    { name: 'welcome_message', header: 'Welcome', body: 'Hi {CLIENT_NAME},\n\nWelcome to {CA_ORGANIZATION_NAME}.', footer: '— CA CloudDesk - Demo Account', enabled: true }
  ];

  var CUSTOM_TEMPLATES = [
    { slug: 'task-client', title: 'Task - client', type: 'TASK', status: 'Draft', sendable: 'No', body: DEFAULT_BODY },
    { slug: 'itr', title: 'ITR', type: 'GENERIC', status: 'APPROVED', sendable: 'Yes', body: 'Hi {CLIENT_NAME},\n\nYour ITR filing update is ready for review.' },
    { slug: 'gst-return', title: 'GST Return', type: 'GENERIC', status: 'APPROVED', sendable: 'Yes', body: 'Hi {CLIENT_NAME},\n\nYour GST return has been processed.' },
    { slug: 'invoice-reminder', title: 'Invoice reminder', type: 'INVOICE', status: 'Draft', sendable: 'No', body: 'Hi {CLIENT_NAME},\n\nThis is a reminder for your pending invoice.' },
    { slug: 'ledger-update', title: 'Ledger update', type: 'LEDGER', status: 'APPROVED', sendable: 'Yes', body: 'Hi {CLIENT_NAME},\n\nYour ledger has been updated.' },
    { slug: 'proforma-follow-up', title: 'Proforma follow-up', type: 'PROFORMA', status: 'Draft', sendable: 'No', body: 'Hi {CLIENT_NAME},\n\nFollowing up on the proforma invoice shared earlier.' },
    { slug: 'task-completion', title: 'Task completion', type: 'TASK', status: 'APPROVED', sendable: 'Yes', body: 'Hi {CLIENT_NAME},\n\nYour task {TASK_NUMBER} is now complete.' },
    { slug: 'client-onboarding', title: 'Client onboarding', type: 'GENERIC', status: 'APPROVED', sendable: 'Yes', body: 'Hi {CLIENT_NAME},\n\nWelcome! Your client portal access is ready.' },
    { slug: 'payment-receipt', title: 'Payment receipt', type: 'GENERIC', status: 'Draft', sendable: 'No', body: 'Hi {CLIENT_NAME},\n\nThank you for your payment.' },
    { slug: 'annual-compliance', title: 'Annual compliance', type: 'GENERIC', status: 'APPROVED', sendable: 'Yes', body: 'Hi {CLIENT_NAME},\n\nYour annual compliance documents are ready.' }
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

  function openBodyModal(text) {
    var modal = document.getElementById('waBodyModal');
    var content = document.getElementById('waBodyModalContent');
    if (!modal || !content) return;
    content.textContent = text || '';
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeBodyModal() {
    var modal = document.getElementById('waBodyModal');
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  function initBodyModal() {
    document.querySelectorAll('[data-wa-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeBodyModal);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeBodyModal();
    });
  }

  function bindViewLinks(scope) {
    if (!scope) return;
    scope.querySelectorAll('[data-wa-view]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openBodyModal(btn.getAttribute('data-wa-view') || '');
      });
    });
  }

  function initTabs() {
    var tabs = document.querySelectorAll('.wa-tab');
    var panes = document.querySelectorAll('.wa-pane');
    function activate(id) {
      tabs.forEach(function (tab) {
        var on = tab.getAttribute('data-wa-tab') === id;
        tab.classList.toggle('is-active', on);
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panes.forEach(function (pane) {
        var on = pane.getAttribute('data-wa-pane') === id;
        pane.classList.toggle('is-active', on);
        pane.hidden = !on;
      });
    }
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activate(tab.getAttribute('data-wa-tab'));
        if (history.replaceState) history.replaceState(null, '', '#' + tab.getAttribute('data-wa-tab'));
      });
    });
    var hash = (location.hash || '').replace('#', '');
    if (hash && document.querySelector('.wa-tab[data-wa-tab="' + hash + '"]')) activate(hash);
  }

  function renderSystemTemplates() {
    var body = document.getElementById('waSystemBody');
    if (!body) return;
    body.innerHTML = SYSTEM_TEMPLATES.map(function (row, i) {
      return '<tr data-wa-sys-row>' +
        '<td><input type="checkbox" class="wa-sys-check" aria-label="Select ' + row.name + '"></td>' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + row.name + '</td>' +
        '<td><button type="button" class="wa-link">' + row.header + '</button></td>' +
        '<td><button type="button" class="wa-link" data-wa-view>' + 'view' + '</button></td>' +
        '<td>' + row.footer + '</td>' +
        '<td><label class="wa-toggle"><input type="checkbox"' + (row.enabled ? ' checked' : '') + '><span></span></label></td>' +
      '</tr>';
    }).join('');

    body.querySelectorAll('tr').forEach(function (row, i) {
      var viewBtn = row.querySelector('[data-wa-view]');
      if (viewBtn && SYSTEM_TEMPLATES[i]) {
        viewBtn.setAttribute('data-wa-view', SYSTEM_TEMPLATES[i].body);
      }
    });
    bindViewLinks(body);
  }

  function renderCustomTemplates() {
    var body = document.getElementById('waCustomBody');
    if (!body) return;
    body.innerHTML = CUSTOM_TEMPLATES.map(function (row, i) {
      var isDraft = row.status === 'Draft';
      return '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + row.title + '</td>' +
        '<td>' + row.type + '</td>' +
        '<td><button type="button" class="wa-link" data-wa-view>view</button></td>' +
        '<td><span class="wa-status ' + (isDraft ? 'wa-status--draft' : 'wa-status--approved') + '">' + row.status + '</span></td>' +
        '<td><span class="wa-yesno ' + (row.sendable === 'Yes' ? 'wa-yesno--yes' : 'wa-yesno--no') + '">' + row.sendable + '</span></td>' +
        '<td>' +
          '<button type="button" class="wa-action-link" data-wa-edit><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> Edit</button>' +
          (isDraft ? '<button type="button" class="wa-action-link" data-wa-submit><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg> Submit to WhatsApp</button>' : '') +
        '</td>' +
      '</tr>';
    }).join('');

    body.querySelectorAll('tr').forEach(function (row, i) {
      var viewBtn = row.querySelector('[data-wa-view]');
      if (viewBtn && CUSTOM_TEMPLATES[i]) {
        viewBtn.setAttribute('data-wa-view', CUSTOM_TEMPLATES[i].body);
      }
    });

    body.querySelectorAll('[data-wa-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var row = btn.closest('tr');
        var i = row ? Array.prototype.indexOf.call(body.querySelectorAll('tr'), row) : -1;
        var slug = i >= 0 && CUSTOM_TEMPLATES[i] ? CUSTOM_TEMPLATES[i].slug : '';
        window.location.href = slug
          ? 'whatsapp_create_template.html?edit=' + encodeURIComponent(slug)
          : 'whatsapp_create_template.html';
      });
    });
    body.querySelectorAll('[data-wa-submit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        toast('Submitted', 'Template submitted to WhatsApp for approval.');
      });
    });
    bindViewLinks(body);
  }

  function initSystemBulk() {
    var selectAll = document.getElementById('waSysSelectAll');
    var enableBtn = document.getElementById('waEnableSelected');
    var disableBtn = document.getElementById('waDisableSelected');
    var body = document.getElementById('waSystemBody');
    if (!body) return;

    if (selectAll) {
      selectAll.addEventListener('change', function () {
        body.querySelectorAll('.wa-sys-check').forEach(function (cb) {
          cb.checked = selectAll.checked;
        });
      });
    }

    function setSelected(on) {
      body.querySelectorAll('tr').forEach(function (row) {
        var cb = row.querySelector('.wa-sys-check');
        var toggle = row.querySelector('.wa-toggle input');
        if (cb && cb.checked && toggle) toggle.checked = on;
      });
      toast('Updated', 'Selected templates ' + (on ? 'enabled' : 'disabled') + '.');
    }

    if (enableBtn) enableBtn.addEventListener('click', function () { setSelected(true); });
    if (disableBtn) disableBtn.addEventListener('click', function () { setSelected(false); });
  }

  function boot() {
    initTabs();
    initBodyModal();
    renderSystemTemplates();
    renderCustomTemplates();
    initSystemBulk();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
