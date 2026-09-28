(function () {
  'use strict';

  var CONTACTS = [
    {
      id: 'lawseva',
      name: 'law seva management private limited',
      phone: '+91 9911982262',
      tag: 'Client',
      initials: 'L',
      color: '#597ef7',
      messages: [
        { type: 'date', text: 'Thursday, August 20th 2026' },
        {
          type: 'task',
          task: 'GST FILLING',
          staff: 'Dev Aggarwal',
          due: '20/08/2026',
          time: '10:42 AM',
          read: true
        },
        {
          type: 'task',
          task: 'GST FILLING',
          staff: 'Dev Aggarwal',
          due: '20/08/2026',
          time: '10:43 AM',
          read: true
        }
      ]
    },
    {
      id: 'saksham',
      name: 'Saksham',
      phone: '+91 9876543210',
      tag: 'Client',
      initials: 'S',
      color: '#25b7a7',
      messages: [
        { type: 'date', text: 'Wednesday, August 19th 2026' },
        {
          type: 'task',
          task: 'Gst Filling 3B',
          staff: 'Aakash',
          due: '23/08/2026',
          time: '4:15 PM',
          read: true
        }
      ]
    },
    {
      id: 'hardik',
      name: 'HARDIK RAWAT',
      phone: '+91 9812345678',
      tag: 'Client',
      initials: 'H',
      color: '#fa8c16',
      messages: [
        { type: 'date', text: 'Tuesday, August 18th 2026' },
        {
          type: 'task',
          task: 'Agreement',
          staff: 'Dev Aggarwal',
          due: '15/09/2026',
          time: '11:20 AM',
          read: false
        }
      ]
    },
    {
      id: 'shruti',
      name: 'shruti singh',
      phone: '+91 9123456789',
      tag: 'Client',
      initials: 'S',
      color: '#eb2f96',
      messages: [
        { type: 'date', text: 'Monday, August 17th 2026' },
        {
          type: 'task',
          task: 'ITR Filling',
          staff: 'Suhanshi Rawat',
          due: '18/08/2026',
          time: '9:05 AM',
          read: true
        }
      ]
    }
  ];

  var activeId = 'lawseva';

  function toast(title, msg) {
    if (window.DashboardShell && DashboardShell.toast) DashboardShell.toast(title, msg);
  }

  function esc(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getContact(id) {
    for (var i = 0; i < CONTACTS.length; i++) {
      if (CONTACTS[i].id === id) return CONTACTS[i];
    }
    return null;
  }

  function renderList(filter) {
    var list = document.getElementById('wacList');
    if (!list) return;
    var q = (filter || '').toLowerCase();
    list.innerHTML = CONTACTS.filter(function (c) {
      if (!q) return true;
      return c.name.toLowerCase().indexOf(q) !== -1 ||
        c.phone.indexOf(q) !== -1 ||
        c.tag.toLowerCase().indexOf(q) !== -1;
    }).map(function (c) {
      return '<button type="button" class="wac-contact' + (c.id === activeId ? ' is-active' : '') +
        '" data-wac-id="' + esc(c.id) + '">' +
        '<span class="wac-contact__avatar" style="background:' + esc(c.color) + '">' + esc(c.initials) + '</span>' +
        '<span class="wac-contact__meta">' +
          '<span class="wac-contact__row">' +
            '<span class="wac-contact__name">' + esc(c.name) + '</span>' +
            '<span class="wac-contact__badge">' + esc(c.tag) + '</span>' +
          '</span>' +
          '<span class="wac-contact__phone">' + esc(c.phone) + '</span>' +
        '</span>' +
      '</button>';
    }).join('');
  }

  function taskCardHtml(m) {
    return '<div class="wac-task-card">' +
      '<p><span class="wac-task-card__pin" aria-hidden="true">📌</span> <strong>Task Created for You</strong></p>' +
      '<p><strong>' + esc(m.task) + '</strong></p>' +
      '<p>Assigned to: ' + esc(m.staff) + '</p>' +
      '<p>Expected completion: ' + esc(m.due) + '</p>' +
      '<button type="button" class="wac-task-card__dl" data-wac-dl>Download</button>' +
      '<div class="wac-msg-meta">' +
        '<span>' + esc(m.time) + '</span>' +
        (m.read ? '<span class="wac-msg-meta__ticks" aria-label="Read">✓✓</span>' : '') +
      '</div>' +
    '</div>';
  }

  function renderChat() {
    var c = getContact(activeId);
    if (!c) return;
    var title = document.getElementById('wacChatTitle');
    var sub = document.getElementById('wacChatSub');
    var msgs = document.getElementById('wacMessages');
    if (title) title.textContent = c.name;
    if (sub) sub.textContent = c.phone + ' (' + c.tag + ')';
    if (!msgs) return;
    msgs.innerHTML = c.messages.map(function (m) {
      if (m.type === 'date') return '<div class="wac-date">' + esc(m.text) + '</div>';
      return '<div class="wac-msg-row">' + taskCardHtml(m) + '</div>';
    }).join('');
  }

  function bindEvents() {
    var search = document.getElementById('wacContactSearch');
    if (search) {
      search.addEventListener('input', function () { renderList(search.value); });
    }

    var list = document.getElementById('wacList');
    if (list) {
      list.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-wac-id]');
        if (!btn) return;
        activeId = btn.getAttribute('data-wac-id');
        renderList(search ? search.value : '');
        renderChat();
      });
    }

    var msgs = document.getElementById('wacMessages');
    if (msgs) {
      msgs.addEventListener('click', function (e) {
        if (e.target.closest('[data-wac-dl]')) {
          toast('Download', 'Task document download started.');
        }
      });
    }

    var send = document.getElementById('wacSend');
    var input = document.getElementById('wacComposeInput');
    if (send && input) {
      send.addEventListener('click', function () {
        var text = (input.value || '').trim();
        if (!text) return;
        var c = getContact(activeId);
        if (c) {
          c.messages.push({ type: 'text', text: text, time: 'Now', read: true });
        }
        input.value = '';
        toast('Sent', 'WhatsApp message queued.');
      });
    }
  }

  renderList('');
  renderChat();
  bindEvents();
})();
