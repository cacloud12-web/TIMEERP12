(function () {
  'use strict';

  var CHATS = [
    {
      id: 'saksham', name: 'Saksham', tag: 'Client', initials: 'S', color: '#25B7A7', locked: true,
      messages: [
        { date: 'Saturday, June 20th 2026', type: 'date' },
        { sender: 'Dev Aggarwal', text: 'Hi', time: '3:02 PM', out: true, read: true }
      ]
    },
    {
      id: 'gst', name: 'gst', tag: 'Group', initials: 'G', color: '#52c41a', locked: false,
      messages: [
        { date: 'Friday, June 19th 2026', type: 'date' },
        { sender: 'CA CloudDesk', text: 'GST filing reminder for Q1.', time: '11:30 AM', out: true, read: true }
      ]
    },
    {
      id: 'lawseva', name: 'law seva management private limited', tag: 'Client', initials: 'L', color: '#597ef7', locked: true,
      messages: [
        { date: 'Thursday, June 18th 2026', type: 'date' },
        { sender: 'Kamal Sharma', text: 'Documents received. We will review shortly.', time: '4:15 PM', out: false, read: false }
      ]
    },
    {
      id: 'kamal', name: 'Kamal Associates', tag: 'EMP', initials: 'KA', color: '#fa8c16', locked: false,
      messages: [
        { date: 'Wednesday, June 17th 2026', type: 'date' },
        { sender: 'Dev Aggarwal', text: 'Please update the task status.', time: '10:05 AM', out: true, read: true }
      ]
    }
  ];

  var activeId = 'saksham';

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

  function getChat(id) {
    return CHATS.find(function (c) { return c.id === id; });
  }

  function renderList(filter) {
    var q = (filter || '').toLowerCase();
    var listEl = document.getElementById('mchList');
    listEl.innerHTML = CHATS.filter(function (c) {
      return !q || c.name.toLowerCase().indexOf(q) !== -1 || c.tag.toLowerCase().indexOf(q) !== -1;
    }).map(function (c) {
      var lock = c.locked ? '<svg class="mch-item__lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>' : '';
      return '<button type="button" class="mch-item' + (c.id === activeId ? ' is-active' : '') + '" data-id="' + c.id + '" role="option" aria-selected="' + (c.id === activeId) + '">' +
        '<span class="mch-item__avatar" style="background:' + c.color + '">' + c.initials + '</span>' +
        '<span class="mch-item__meta"><span class="mch-item__name">' + c.name + '</span><span class="mch-item__tag">(' + c.tag + ')</span></span>' +
        lock + '</button>';
    }).join('');
  }

  function renderMessages() {
    var chat = getChat(activeId);
    if (!chat) return;
    document.getElementById('mchChatTitle').textContent = chat.name;
    document.getElementById('mchChatLock').hidden = !chat.locked;
    var html = chat.messages.map(function (m) {
      if (m.type === 'date') return '<div class="mch-date">' + m.date + '</div>';
      var rowCls = m.out ? 'mch-bubble-row' : 'mch-bubble-row mch-bubble-row--in';
      var ticks = m.out && m.read ? '<span class="mch-bubble__ticks" aria-label="Read">✓✓</span>' : '';
      return '<div class="' + rowCls + '"><div class="mch-bubble">' +
        (m.sender ? '<div class="mch-bubble__sender">' + m.sender + '</div>' : '') +
        '<div class="mch-bubble__text">' + m.text + '</div>' +
        '<div class="mch-bubble__meta"><span>' + m.time + '</span>' + ticks + '</div></div></div>';
    }).join('');
    var box = document.getElementById('mchMessages');
    box.innerHTML = html;
    box.scrollTop = box.scrollHeight;
  }

  function selectChat(id) {
    activeId = id;
    renderList(document.getElementById('mchListSearch').value);
    renderMessages();
  }

  document.getElementById('mchList').addEventListener('click', function (e) {
    var btn = e.target.closest('.mch-item');
    if (!btn) return;
    selectChat(btn.getAttribute('data-id'));
  });

  document.getElementById('mchListSearch').addEventListener('input', function () {
    renderList(this.value);
  });

  var menuBtn = document.getElementById('mchMenuBtn');
  var menuPop = document.getElementById('mchMenuPop');
  menuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = menuPop.hidden;
    menuPop.hidden = !open;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.getElementById('mchCreateGroup').addEventListener('click', function () {
    menuPop.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    toast('Create New group', 'Group creation opens here.');
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mch-menu-wrap')) {
      menuPop.hidden = true;
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.getElementById('mchSend').addEventListener('click', sendMessage);
  document.getElementById('mchComposeInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); sendMessage(); }
  });

  function sendMessage() {
    var input = document.getElementById('mchComposeInput');
    var text = input.value.trim();
    if (!text) return;
    var chat = getChat(activeId);
    var now = new Date();
    var time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    chat.messages.push({ sender: 'Dev Aggarwal', text: text, time: time, out: true, read: true });
    input.value = '';
    renderMessages();
  }

  document.getElementById('mchAttach').addEventListener('click', function () {
    toast('Attach', 'File attachment opens here.');
  });
  document.getElementById('mchTrash').addEventListener('click', function () {
    toast('Delete', 'Conversation cleared.');
  });

  renderList();
  renderMessages();
})();
