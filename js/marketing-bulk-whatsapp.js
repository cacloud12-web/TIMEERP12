(function () {
  'use strict';

  var APPROVED = ['ITR (GENERIC)', 'ITR (GENERIC)'];
  var RECORDS = [
    'SAURABH BHARDWAJ', 'THE GOLD REALTY', 'Law seva management private limited',
    'PERFECT PAIR', 'TATA MOTORS PASSENGER VEHICLES LIMITED', 'Saksham', 'JYOTI SHARMA'
  ];

  var HIST_TEMPLATES = [
    { label: 'All templates', sub: '' },
    { label: 'Task - client', sub: 'Task' },
    { label: 'ITR', sub: 'Generic' },
    { label: 'invoice', sub: 'Invoice' },
    { label: 'ledger', sub: 'Ledger' }
  ];
  var HIST_TYPES = ['All types', 'Task', 'Invoice', 'Proforma', 'Ledger', 'Generic'];

  var HISTORY = [
    { sentAt: '09 Jul 2026, 11:19 AM', template: 'ITR', type: 'Generic', total: 1, delivered: 1, failed: 0, pending: 0,
      detail: { customer: 'law seva management private limited', phone: '9818092280', status: 'Read', reason: '--' } },
    { sentAt: '08 Jul 2026, 03:45 PM', template: 'ITR', type: 'Generic', total: 1, delivered: 1, failed: 0, pending: 0,
      detail: { customer: 'SAURABH BHARDWAJ', phone: '9876543210', status: 'Read', reason: '--' } },
    { sentAt: '05 Jul 2026, 10:22 AM', template: 'ITR', type: 'Generic', total: 1, delivered: 1, failed: 0, pending: 0,
      detail: { customer: 'THE GOLD REALTY', phone: '9123456780', status: 'Delivered', reason: '--' } },
    { sentAt: '01 Jul 2026, 09:15 AM', template: 'ITR', type: 'Generic', total: 1, delivered: 1, failed: 0, pending: 0,
      detail: { customer: 'PERFECT PAIR', phone: '', status: 'Delivered', reason: '--' } },
    { sentAt: '28 Jun 2026, 04:30 PM', template: 'ITR', type: 'Generic', total: 1, delivered: 1, failed: 0, pending: 0,
      detail: { customer: 'Saksham', phone: '9988776655', status: 'Read', reason: '--' } },
    { sentAt: '25 Jun 2026, 02:10 PM', template: 'ITR', type: 'Generic', total: 1, delivered: 1, failed: 0, pending: 0,
      detail: { customer: 'JYOTI SHARMA', phone: '9812345678', status: 'Delivered', reason: '--' } }
  ];

  var SYSTEM_TEMPLATES = [
    { name: 'partner_lead_reminder', header: 'Initial Contact with a Lead', body: 'Hi {{1}}, thank you for your interest. Our team will reach out shortly.', enabled: true },
    { name: 'invoice', header: 'invoice_sample.pdf', body: 'Your invoice {{1}} is ready. Amount due: {{2}}.', enabled: true },
    { name: 'ledger', header: 'ledger_sample.pdf', body: 'Ledger statement for {{1}} is attached.', enabled: true },
    { name: 'proforma', header: 'proforma_sample.pdf', body: 'Proforma invoice {{1}} for your review.', enabled: true },
    { name: 'task_customer', header: 'task_sample.pdf', body: 'Task update for {{1}}: {{2}}.', enabled: true },
    { name: 'task_employee', header: 'task_sample.pdf', body: 'Employee task assigned: {{1}}.', enabled: true },
    { name: 'itr', header: 'ITR (GENERIC)', body: 'HI, A friendly reminder that your ITR for the FY 2022-23 is due on 31st July.', enabled: true },
    { name: 'gst', header: 'GST', body: 'GST filing reminder for {{1}}.', enabled: true },
    { name: 'task_customer_completed', header: 'task_sample.pdf', body: 'Task completed for {{1}}.', enabled: false },
    { name: 'payment_reminder', header: 'payment', body: 'Payment reminder: {{1}} is due.', enabled: true },
    { name: 'document_share', header: 'document.pdf', body: 'Document shared: {{1}}.', enabled: false },
    { name: 'welcome', header: 'welcome', body: 'Welcome to CA CloudDesk, {{1}}!', enabled: true }
  ];

  var CUSTOM_TEMPLATES = [
    { title: 'Task - client', type: 'TASK', body: 'Hi {CLIENT_NAME}\nYour Work is started with description {TASK_AND_PERIOD} & {TASK_NUMBER}. thx', status: 'Draft', sendable: false },
    { title: 'ITR', type: 'GENERIC', body: 'Dear {CLIENT_NAME},\n\nITR filing reminder for FY {FINANCIAL_YEAR}. Please submit your documents at the earliest.\n\n— {CA_ORGANIZATION_NAME}', status: 'Draft', sendable: false },
    { title: 'ITR (GENERIC)', type: 'GENERIC', body: 'HI, A friendly reminder that your ITR for the FY 2022-23 is due on 31st July. Please submit your docs to avoid late fees. Need help? Contact us.', status: 'APPROVED', sendable: true }
  ];

  var selectedRecords = [];
  var systemState = SYSTEM_TEMPLATES.map(function (t) { return Object.assign({}, t); });

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
    document.querySelectorAll('.mbw-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }

  function renderComboMenu(combo, q) {
    var key = combo.getAttribute('data-list');
    var menu = combo.querySelector('.mbw-combo__menu');
    var qq = (q || '').toLowerCase();
    var html = '';

    if (key === 'approved') {
      html = APPROVED.filter(function (n, i, a) { return a.indexOf(n) === i; })
        .filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; })
        .map(function (n) { return '<div class="mbw-combo__item">' + n + '</div>'; }).join('');
    } else if (key === 'records') {
      html = RECORDS.filter(function (n) {
        return selectedRecords.indexOf(n) === -1 && (!qq || n.toLowerCase().indexOf(qq) !== -1);
      }).map(function (n) { return '<div class="mbw-combo__item">' + n + '</div>'; }).join('');
    } else if (key === 'histTpl') {
      html = HIST_TEMPLATES.filter(function (t) {
        return !qq || t.label.toLowerCase().indexOf(qq) !== -1;
      }).map(function (t) {
        return t.sub
          ? '<div class="mbw-combo__item">' + t.label + '<span class="mbw-combo__item-sub">' + t.sub + '</span></div>'
          : '<div class="mbw-combo__item">' + t.label + '</div>';
      }).join('');
    } else if (key === 'histType') {
      html = HIST_TYPES.filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; })
        .map(function (n) { return '<div class="mbw-combo__item">' + n + '</div>'; }).join('');
    }
    menu.innerHTML = html || '<div class="mbw-combo__item">No matches</div>';
  }

  document.querySelectorAll('.mbw-combo').forEach(function (combo) {
    var input = combo.querySelector('input');
    var menu = combo.querySelector('.mbw-combo__menu');
    function open() { renderComboMenu(combo, input.value); closeCombos(combo); combo.classList.add('is-open'); }
    input.addEventListener('focus', open);
    input.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    input.addEventListener('input', function () { renderComboMenu(combo, input.value); combo.classList.add('is-open'); });
    menu.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.mbw-combo__item');
      if (!item || item.textContent === 'No matches') return;
      e.preventDefault();
      var key = combo.getAttribute('data-list');
      var text = item.childNodes[0].textContent.trim();
      if (key === 'records') {
        if (selectedRecords.indexOf(text) === -1) selectedRecords.push(text);
        input.value = '';
        renderRecordTags();
      } else {
        input.value = text;
      }
      combo.classList.remove('is-open');
      if (key === 'histTpl' || key === 'histType') renderHistory();
    });
  });

  function renderRecordTags() {
    var wrap = document.getElementById('mbwRecordTags');
    if (!selectedRecords.length) { wrap.hidden = true; wrap.innerHTML = ''; return; }
    wrap.hidden = false;
    wrap.innerHTML = selectedRecords.map(function (r, i) {
      return '<span class="mbw-tag">' + r + '<button type="button" data-rm="' + i + '" aria-label="Remove">×</button></span>';
    }).join('');
  }

  document.getElementById('mbwRecordTags').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-rm]');
    if (!btn) return;
    selectedRecords.splice(parseInt(btn.getAttribute('data-rm'), 10), 1);
    renderRecordTags();
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mbw-combo')) closeCombos();
    if (!e.target.closest('.mbw-date-range')) {
      var pop = document.getElementById('mbwDatePop');
      var btn = document.getElementById('mbwDateBtn');
      if (pop) pop.hidden = true;
      if (btn) { btn.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
    }
  });

  /* Tabs */
  var panes = { send: 'mbwPaneSend', history: 'mbwPaneHistory', system: 'mbwPaneSystem', custom: 'mbwPaneCustom' };
  document.querySelectorAll('.mbw-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var id = tab.getAttribute('data-tab');
      document.querySelectorAll('.mbw-tab').forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      Object.keys(panes).forEach(function (k) {
        document.getElementById(panes[k]).hidden = k !== id;
      });
    });
  });

  document.getElementById('mbwSendBtn').addEventListener('click', function () {
    var tpl = document.getElementById('mbwApprovedTpl').value.trim();
    if (!tpl || !selectedRecords.length) {
      toast('Required', 'Select approved template and at least one record.');
      return;
    }
    toast('Send WhatsApp', 'Bulk WhatsApp queued for ' + selectedRecords.length + ' record(s).');
  });

  /* Date range */
  var dateBtn = document.getElementById('mbwDateBtn');
  var datePop = document.getElementById('mbwDatePop');
  var startInput = document.getElementById('mbwStartDate');
  var endInput = document.getElementById('mbwEndDate');

  function fmtDate(iso) {
    if (!iso) return '';
    var p = iso.split('-');
    return p[2] + '/' + p[1] + '/' + p[0];
  }

  dateBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = datePop.hidden;
    datePop.hidden = !open;
    dateBtn.classList.toggle('is-open', open);
    dateBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.getElementById('mbwDateApply').addEventListener('click', function () {
    document.getElementById('mbwDateStart').textContent = startInput.value ? fmtDate(startInput.value) : 'Start date';
    document.getElementById('mbwDateEnd').textContent = endInput.value ? fmtDate(endInput.value) : 'End date';
    dateBtn.classList.toggle('is-filled', !!(startInput.value || endInput.value));
    datePop.hidden = true;
    renderHistory();
  });
  document.getElementById('mbwDateClear').addEventListener('click', function () {
    startInput.value = '';
    endInput.value = '';
    document.getElementById('mbwDateStart').textContent = 'Start date';
    document.getElementById('mbwDateEnd').textContent = 'End date';
    dateBtn.classList.remove('is-filled');
    datePop.hidden = true;
    renderHistory();
  });

  document.getElementById('mbwExcelBtn').addEventListener('click', function () {
    toast('Export', 'History exported to Excel.');
  });

  /* History table */
  function renderHistory() {
    var tplF = document.getElementById('mbwFilterTpl').value.trim();
    var typeF = document.getElementById('mbwFilterType').value.trim();
    var rows = HISTORY.filter(function (r) {
      if (tplF && tplF !== 'All templates' && r.template.toLowerCase().indexOf(tplF.toLowerCase()) === -1) return false;
      if (typeF && typeF !== 'All types' && r.type.toLowerCase() !== typeF.toLowerCase()) return false;
      return true;
    });
    document.getElementById('mbwHistoryBody').innerHTML = rows.map(function (r, i) {
      return '<tr><td>' + r.sentAt + '</td><td>' + r.template + '</td><td>' + r.type + '</td><td>' + r.total + '</td><td>' + r.delivered + '</td><td>' + r.failed + '</td><td>' + r.pending + '</td><td><button type="button" class="mbw-row-action" data-hist="' + i + '" aria-label="View detail"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button></td></tr>';
    }).join('');
    document.getElementById('mbwCount').textContent = rows.length + ' / ' + HISTORY.length;
  }

  document.getElementById('mbwHistoryBody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-hist]');
    if (!btn) return;
    var r = HISTORY[parseInt(btn.getAttribute('data-hist'), 10)];
    var d = r.detail;
    document.getElementById('mbwDetailBody').innerHTML =
      '<div class="mbw-detail-head"><strong>' + r.template + '</strong><span>Sent: ' + r.sentAt + '</span></div>' +
      '<div><span class="mbw-stat">Total: ' + r.total + '</span><span class="mbw-stat mbw-stat--ok">Delivered: ' + r.delivered + '</span><span class="mbw-stat mbw-stat--fail">Failed: ' + r.failed + '</span><span class="mbw-stat">Pending: ' + r.pending + '</span></div>' +
      '<div class="mbw-table-wrap" style="margin-top:14px"><table class="mbw-table"><thead><tr><th>Customer</th><th>Phone</th><th>Status</th><th>Failure reason</th></tr></thead><tbody><tr><td>' + d.customer + '</td><td>' + d.phone + '</td><td><span class="mbw-badge mbw-badge--read">' + d.status + '</span></td><td>' + d.reason + '</td></tr></tbody></table></div>';
    document.getElementById('mbwDetailModal').hidden = false;
  });

  function closeModal(id) { document.getElementById(id).hidden = true; }
  document.getElementById('mbwDetailClose').addEventListener('click', function () { closeModal('mbwDetailModal'); });
  document.getElementById('mbwDetailModal').addEventListener('click', function (e) { if (e.target === this) closeModal('mbwDetailModal'); });
  document.getElementById('mbwViewClose').addEventListener('click', function () { closeModal('mbwViewModal'); });
  document.getElementById('mbwViewModal').addEventListener('click', function (e) { if (e.target === this) closeModal('mbwViewModal'); });

  function showViewBody(text) {
    document.getElementById('mbwViewTitle').textContent = 'Template Body';
    document.getElementById('mbwViewBody').textContent = text;
    document.getElementById('mbwViewModal').hidden = false;
  }

  /* System templates */
  function renderSystem() {
    document.getElementById('mbwSystemBody').innerHTML = systemState.map(function (t, i) {
      var header = t.header.indexOf('.') !== -1
        ? '<a href="#" class="mbw-link--header" data-stop="1">' + t.header + '</a>'
        : t.header;
      return '<tr><td class="mbw-th-check"><input type="checkbox" class="mbw-sys-check" data-idx="' + i + '"></td><td>' + (i + 1) + '</td><td>' + t.name + '</td><td>' + header + '</td><td><button type="button" class="mbw-link" data-view-sys="' + i + '">view</button></td><td>— CA CloudDesk - Demo Account</td><td><button type="button" class="mbw-toggle' + (t.enabled ? ' is-on' : '') + '" data-toggle-sys="' + i + '" aria-label="Toggle ' + t.name + '"></button></td></tr>';
    }).join('');
    syncSysToolbar();
  }

  function syncSysToolbar() {
    var checked = document.querySelectorAll('.mbw-sys-check:checked');
    document.getElementById('mbwDisableSel').disabled = checked.length === 0;
  }

  document.getElementById('mbwSystemBody').addEventListener('click', function (e) {
    if (e.target.closest('[data-stop]')) { e.preventDefault(); return; }
    var view = e.target.closest('[data-view-sys]');
    if (view) { showViewBody(systemState[parseInt(view.getAttribute('data-view-sys'), 10)].body); return; }
    var toggle = e.target.closest('[data-toggle-sys]');
    if (toggle) {
      var idx = parseInt(toggle.getAttribute('data-toggle-sys'), 10);
      systemState[idx].enabled = !systemState[idx].enabled;
      toggle.classList.toggle('is-on', systemState[idx].enabled);
    }
  });
  document.getElementById('mbwSystemBody').addEventListener('change', function (e) {
    if (e.target.classList.contains('mbw-sys-check')) syncSysToolbar();
  });
  document.getElementById('mbwSysSelectAll').addEventListener('change', function () {
    document.querySelectorAll('.mbw-sys-check').forEach(function (cb) { cb.checked = this.checked; }.bind(this));
    syncSysToolbar();
  });
  document.getElementById('mbwEnableSel').addEventListener('click', function () {
    document.querySelectorAll('.mbw-sys-check:checked').forEach(function (cb) {
      var idx = parseInt(cb.getAttribute('data-idx'), 10);
      systemState[idx].enabled = true;
    });
    renderSystem();
    toast('Enabled', 'Selected templates enabled.');
  });
  document.getElementById('mbwDisableSel').addEventListener('click', function () {
    document.querySelectorAll('.mbw-sys-check:checked').forEach(function (cb) {
      var idx = parseInt(cb.getAttribute('data-idx'), 10);
      systemState[idx].enabled = false;
    });
    renderSystem();
    toast('Disabled', 'Selected templates disabled.');
  });

  /* Custom templates */
  function renderCustom() {
    document.getElementById('mbwCustomBody').innerHTML = CUSTOM_TEMPLATES.map(function (t, i) {
      var statusCls = t.status === 'APPROVED' ? 'mbw-badge--approved' : 'mbw-badge--draft';
      var sendable = t.sendable ? '<span class="mbw-sendable-yes">Yes</span>' : '<span class="mbw-sendable-no">No</span>';
      var submit = t.status === 'Draft'
        ? '<button type="button" class="mbw-action-btn" data-submit="' + i + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>Submit to WhatsApp</button>'
        : '';
      return '<tr><td>' + (i + 1) + '</td><td>' + t.title + '</td><td>' + t.type + '</td><td><button type="button" class="mbw-link" data-view-custom="' + i + '">view</button></td><td><span class="mbw-badge ' + statusCls + '">' + t.status + '</span></td><td>' + sendable + '</td><td><button type="button" class="mbw-action-btn" data-edit="' + i + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Edit</button> ' + submit + '</td></tr>';
    }).join('');
  }

  document.getElementById('mbwCustomBody').addEventListener('click', function (e) {
    var view = e.target.closest('[data-view-custom]');
    if (view) { showViewBody(CUSTOM_TEMPLATES[parseInt(view.getAttribute('data-view-custom'), 10)].body); return; }
    var edit = e.target.closest('[data-edit]');
    if (edit) { window.location.href = 'marketing_create_whatsapp_template.html?edit=' + edit.getAttribute('data-edit'); return; }
    var sub = e.target.closest('[data-submit]');
    if (sub) toast('Submit', 'Template submitted to WhatsApp for approval.');
  });
  document.getElementById('mbwCreateTpl').addEventListener('click', function () {
    window.location.href = 'marketing_create_whatsapp_template.html';
  });

  if (window.location.hash === '#custom') {
    document.querySelector('.mbw-tab[data-tab="custom"]').click();
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeModal('mbwDetailModal'); closeModal('mbwViewModal'); }
  });

  renderHistory();
  renderSystem();
  renderCustom();
})();
