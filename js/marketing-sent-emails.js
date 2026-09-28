/**
 * Marketing — Sent Emails (View Sent Emails)
 */
(function () {
  'use strict';

  var CLIENTS = [
    'Internal', 'SAURABH BHARDWAJ', 'SAURABH BHARDWAJ HUF', 'THE GOLD REALTY',
    'Law seva management private limited', 'PERFECT PAIR', 'TATA MOTORS PASSENGER VEHICLES', 'Saksham'
  ];
  var GROUPS = [
    'Tax Audit', 'ITR', 'ABC Client', 'GST Filling Monthly', 'GST', 'TDS', 'LLP', 'Practice'
  ];
  var STATUSES = ['All', 'Sent', 'Sending'];

  var ROWS = [
    { client: 'View', group: '--', date: '10/07/2026', time: '12:32:29 PM', subject: 'law seva management', type: 'Generic', by: 'Kamal Kant Sharma', recurring: '--', next: '', end: '--', status: 'Sent' },
    { client: 'View', group: '--', date: '10/07/2026', time: '12:21:44 PM', subject: 'ITR Filling', type: 'Generic', by: 'Kamal Kant Sharma', recurring: '--', next: '', end: '--', status: 'Sent' },
    { client: 'View', group: '--', date: '10/07/2026', time: '12:12:05 PM', subject: 'Invoice | CA CloudDesk - Demo Account', type: 'Invoice', by: 'Dev Aggarwal', recurring: '--', next: '', end: '--', status: 'Sent' },
    { client: 'View', group: '--', date: '06/07/2026', time: '01:03:08 PM', subject: 'GST reminder', type: 'Generic', by: 'Ankur Gupta', recurring: '--', next: '', end: '--', status: 'Sent' },
    { client: 'View', group: '--', date: '06/07/2026', time: '11:48:16 AM', subject: 'Audit documents', type: 'Generic', by: 'Saurabh Bhardwaj', recurring: '--', next: '', end: '--', status: 'Sent' },
    { client: 'View', group: '--', date: '05/07/2026', time: '06:26:43 PM', subject: 'Monthly compliance digest', type: 'Generic', by: 'Kamal Kant Sharma', recurring: 'Yes', next: '22/07/2026 06:26:43 PM', end: '--', status: 'Sending' },
    { client: 'View', group: '--', date: '04/07/2026', time: '04:15:02 PM', subject: 'Receipt acknowledgement', type: 'Invoice', by: 'Dev Aggarwal', recurring: '--', next: '', end: '--', status: 'Sent' },
    { client: 'View', group: '--', date: '03/07/2026', time: '10:08:55 AM', subject: 'Welcome onboard', type: 'Generic', by: 'Anupam', recurring: '--', next: '', end: '--', status: 'Sent' },
    { client: 'View', group: '--', date: '02/07/2026', time: '03:41:19 PM', subject: 'Form 16 ready', type: 'Generic', by: 'Akash', recurring: '--', next: '', end: '--', status: 'Sent' },
    { client: 'View', group: '--', date: '01/07/2026', time: '09:22:33 AM', subject: 'Appointment confirmation', type: 'Generic', by: 'Kamal Kant Sharma', recurring: '--', next: '', end: '--', status: 'Sent' }
  ];

  var filters = { client: '', group: '', status: 'All', start: '', end: '' };

  function toast(title, msg) {
    if (window.DashboardShell && DashboardShell.toast) DashboardShell.toast(title, msg);
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function statusBadge(s) {
    var cls = s === 'Sending' ? 'mse-badge--sending' : 'mse-badge--sent';
    return '<span class="mse-badge ' + cls + '">' + esc(s) + '</span>';
  }

  function filteredRows() {
    return ROWS.filter(function (r) {
      if (filters.status && filters.status !== 'All' && r.status !== filters.status) return false;
      if (filters.client && filters.client !== 'Internal') {
        /* demo: client filter is label-only unless subject/client match */
        if ((r.subject + ' ' + r.by).toLowerCase().indexOf(filters.client.toLowerCase().slice(0, 6)) === -1 &&
            filters.client.indexOf('SAURABH') === -1 && filters.client.indexOf('PERFECT') === -1) {
          /* keep showing all for most picks so UI doesn't go empty */
        }
      }
      return true;
    });
  }

  function renderTable() {
    var body = document.getElementById('mseBody');
    if (!body) return;
    var rows = filteredRows();
    body.innerHTML = rows.map(function (r, i) {
      return '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td><button type="button" class="mse-link" data-mse-client>' + esc(r.client) + '</button></td>' +
        '<td>' + esc(r.group) + '</td>' +
        '<td>' + esc(r.date) + '</td>' +
        '<td>' + esc(r.time) + '</td>' +
        '<td>' + esc(r.subject) + '</td>' +
        '<td>' + esc(r.type) + '</td>' +
        '<td>' + esc(r.by) + '</td>' +
        '<td>' + esc(r.recurring) + '</td>' +
        '<td>' + esc(r.next || '') + '</td>' +
        '<td>' + esc(r.end) + '</td>' +
        '<td>' + statusBadge(r.status) + '</td>' +
        '<td><button type="button" class="mse-link" data-mse-details="' + i + '">View</button></td>' +
        '<td>--</td>' +
      '</tr>';
    }).join('');
  }

  function showTab(name) {
    document.querySelectorAll('[data-mse-tab]').forEach(function (btn) {
      var on = btn.getAttribute('data-mse-tab') === name;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('[data-mse-panel]').forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-mse-panel') !== name;
    });
  }

  function closeCombos() {
    document.querySelectorAll('.mce-combo.is-open').forEach(function (c) { c.classList.remove('is-open'); });
  }

  function setupCombo(root, options, onPick) {
    var input = root.querySelector('input');
    var menu = root.querySelector('.mce-combo__menu');
    if (!input || !menu) return;

    function render(q) {
      var qq = (q || '').toLowerCase();
      menu.innerHTML = options.filter(function (o) {
        return !qq || o.toLowerCase().indexOf(qq) !== -1;
      }).map(function (o) {
        return '<div class="mce-combo__item" data-val="' + esc(o) + '">' + esc(o) + '</div>';
      }).join('') || '<div class="mce-combo__item">No matches</div>';
    }

    function open() {
      closeCombos();
      render(input.value === input.getAttribute('placeholder') ? '' : input.value);
      root.classList.add('is-open');
    }

    input.addEventListener('focus', open);
    input.addEventListener('click', open);
    input.addEventListener('input', function () {
      open();
      render(input.value);
    });
    menu.addEventListener('click', function (e) {
      var item = e.target.closest('.mce-combo__item');
      if (!item || !item.getAttribute('data-val')) return;
      var val = item.getAttribute('data-val');
      input.value = val;
      closeCombos();
      if (onPick) onPick(val);
    });
  }

  function bind() {
    document.querySelectorAll('[data-mse-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showTab(btn.getAttribute('data-mse-tab'));
      });
    });

    setupCombo(document.querySelector('[data-list="client"]'), CLIENTS, function (v) {
      filters.client = v;
      renderTable();
    });
    setupCombo(document.querySelector('[data-list="group"]'), GROUPS, function (v) {
      filters.group = v;
      renderTable();
    });
    setupCombo(document.querySelector('[data-list="status"]'), STATUSES, function (v) {
      filters.status = v;
      renderTable();
    });

    var dateBtn = document.getElementById('mseDateBtn');
    var datePop = document.getElementById('mseDatePop');
    var dateLabel = document.getElementById('mseDateLabel');
    if (dateBtn && datePop) {
      dateBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeCombos();
        datePop.hidden = !datePop.hidden;
        dateBtn.classList.toggle('is-open', !datePop.hidden);
      });
      datePop.addEventListener('click', function (e) { e.stopPropagation(); });
      var apply = document.getElementById('mseDateApply');
      var clear = document.getElementById('mseDateClear');
      if (apply) {
        apply.addEventListener('click', function () {
          var s = (document.getElementById('mseStart') || {}).value || '';
          var e = (document.getElementById('mseEnd') || {}).value || '';
          filters.start = s;
          filters.end = e;
          if (s || e) {
            dateLabel.textContent = (s || 'Start') + '  →  ' + (e || 'End');
            dateBtn.classList.add('is-filled');
          }
          datePop.hidden = true;
          dateBtn.classList.remove('is-open');
          renderTable();
        });
      }
      if (clear) {
        clear.addEventListener('click', function () {
          var s = document.getElementById('mseStart');
          var e = document.getElementById('mseEnd');
          if (s) s.value = '';
          if (e) e.value = '';
          filters.start = '';
          filters.end = '';
          dateLabel.textContent = 'Start date     End date';
          dateBtn.classList.remove('is-filled');
          datePop.hidden = true;
          dateBtn.classList.remove('is-open');
          renderTable();
        });
      }
    }

    var settingsBtn = document.getElementById('mseSettings');
    var settingsPop = document.getElementById('mseSettingsPop');
    if (settingsBtn && settingsPop) {
      settingsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        settingsPop.hidden = !settingsPop.hidden;
        settingsBtn.setAttribute('aria-expanded', settingsPop.hidden ? 'false' : 'true');
      });
    }

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.mce-combo')) closeCombos();
      if (!e.target.closest('#mseDateRange')) {
        if (datePop) datePop.hidden = true;
        if (dateBtn) dateBtn.classList.remove('is-open');
      }
      if (!e.target.closest('.mce-icon-wrap')) {
        if (settingsPop) settingsPop.hidden = true;
        if (settingsBtn) settingsBtn.setAttribute('aria-expanded', 'false');
      }
      if (e.target.closest('[data-mse-client]')) {
        toast('Client', 'Opening client details.');
      }
      var details = e.target.closest('[data-mse-details]');
      if (details) {
        var idx = +details.getAttribute('data-mse-details');
        var row = filteredRows()[idx];
        toast('Email details', row ? row.subject : 'Opening details.');
      }
    });

    renderTable();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
