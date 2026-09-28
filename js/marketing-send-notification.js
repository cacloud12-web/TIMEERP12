(function () {
  'use strict';

  var CLIENTS = {
    head: 'Internal',
    items: [
      'SAURABH BHARDWAJ', 'SAURABH BHARDWAJ HUF', 'THE GOLD REALTY',
      'Law seva management private limited', 'PERFECT PAIR',
      'TATA MOTORS PASSENGER VEHICLES LIMITED', 'Saksham'
    ]
  };
  var GROUPS = ['GST Clients', 'Audit Group', 'ITR Group', 'Corporate Clients'];
  var NOTIFICATIONS = [];

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
    document.querySelectorAll('.msn-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }

  var clientCombo = document.querySelector('.msn-combo[data-list="client"]');
  var clientInput = document.getElementById('msnClient');
  var clientMenu = clientCombo.querySelector('.msn-combo__menu');
  var isGroup = false;

  function renderClientMenu(q) {
    var qq = (q || '').toLowerCase();
    var html = '';
    if (isGroup) {
      html = GROUPS.filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; })
        .map(function (n) { return '<div class="msn-combo__item">' + n + '</div>'; }).join('');
    } else {
      var items = CLIENTS.items.filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; });
      if (items.length) {
        html += '<div class="msn-combo__head">' + CLIENTS.head + '</div>';
        html += items.map(function (n) { return '<div class="msn-combo__item">' + n + '</div>'; }).join('');
      }
    }
    clientMenu.innerHTML = html || '<div class="msn-combo__item">No matches</div>';
  }

  function openClientCombo() { renderClientMenu(clientInput.value); closeCombos(clientCombo); clientCombo.classList.add('is-open'); }
  clientInput.addEventListener('focus', openClientCombo);
  clientInput.addEventListener('click', function (e) { e.stopPropagation(); openClientCombo(); });
  clientInput.addEventListener('input', function () { renderClientMenu(clientInput.value); clientCombo.classList.add('is-open'); });
  clientMenu.addEventListener('mousedown', function (e) {
    var item = e.target.closest('.msn-combo__item');
    if (!item || item.textContent === 'No matches') return;
    e.preventDefault();
    clientInput.value = item.textContent.trim();
    clientCombo.classList.remove('is-open');
  });

  document.addEventListener('click', function () { closeCombos(); });

  document.querySelectorAll('input[name="msnTarget"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      isGroup = radio.value === 'group';
      document.getElementById('msnClientLabel').textContent = isGroup ? 'Client Group' : 'Client';
      clientInput.placeholder = isGroup ? 'Select Client Group' : 'Select Client';
      clientInput.value = '';
      document.querySelector('.msn-quick-link').hidden = isGroup;
    });
  });

  /* Tabs */
  var panes = { send: 'msnPaneSend', view: 'msnPaneView' };
  document.querySelectorAll('.msn-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var id = tab.getAttribute('data-tab');
      document.querySelectorAll('.msn-tab').forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      Object.keys(panes).forEach(function (k) {
        document.getElementById(panes[k]).hidden = k !== id;
      });
    });
  });

  if (window.location.hash === '#view') {
    document.querySelector('.msn-tab[data-tab="view"]').click();
  }

  function renderView() {
    var body = document.getElementById('msnViewBody');
    var empty = document.getElementById('msnEmpty');
    var total = NOTIFICATIONS.length;
    if (!total) {
      body.innerHTML = '';
      empty.hidden = false;
      document.getElementById('msnCount').textContent = '0 / 0';
      return;
    }
    empty.hidden = true;
    body.innerHTML = NOTIFICATIONS.map(function (r, i) {
      return '<tr><td>' + (i + 1) + '</td><td>' + r.date + '</td><td>' + r.time + '</td><td>' + r.content + '</td><td>' + r.client + '</td><td><button type="button" class="msn-view-btn" data-idx="' + i + '">View</button></td></tr>';
    }).join('');
    document.getElementById('msnCount').textContent = total + ' / ' + total;
  }

  document.getElementById('msnViewBody').addEventListener('click', function (e) {
    var btn = e.target.closest('.msn-view-btn');
    if (!btn) return;
    var r = NOTIFICATIONS[parseInt(btn.getAttribute('data-idx'), 10)];
    toast('Notification', r.content);
  });

  document.getElementById('msnSend').addEventListener('click', function () {
    var client = clientInput.value.trim();
    var content = document.getElementById('msnContent').value.trim();
    if (!client || !content) {
      toast('Required', 'Select ' + (isGroup ? 'client group' : 'client') + ' and enter content.');
      return;
    }
    var now = new Date();
    NOTIFICATIONS.unshift({
      date: String(now.getDate()).padStart(2, '0') + '/' + String(now.getMonth() + 1).padStart(2, '0') + '/' + now.getFullYear(),
      time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
      content: content.length > 60 ? content.slice(0, 60) + '…' : content,
      client: client
    });
    toast('Send Notification', 'Notification sent to ' + client + '.');
    renderView();
  });

  document.getElementById('msnReset').addEventListener('click', function () {
    document.getElementById('msnForm').reset();
    isGroup = false;
    document.getElementById('msnClientLabel').textContent = 'Client';
    clientInput.placeholder = 'Select Client';
    document.querySelector('.msn-quick-link').hidden = false;
    toast('Reset', 'Form cleared.');
  });

  renderView();
})();
