(function () {
  'use strict';

  var LS_EVENTS = 'mwe_events';
  var LS_SEEDED = 'mwe_events_seeded_v1';

  var DUMMY_EVENTS = [
    { title: 'GST Annual Return Workshop', createdAt: '2026-08-12T10:30:00.000Z' },
    { title: 'Client Tax Planning Webinar', createdAt: '2026-07-28T14:00:00.000Z' },
    { title: 'Company Law Updates — Q2 Briefing', createdAt: '2026-06-15T09:15:00.000Z' },
    { title: 'Startup Compliance Bootcamp', createdAt: '2026-05-20T11:00:00.000Z' },
    { title: 'Income Tax Filing Deadline Reminder', createdAt: '2026-04-02T08:45:00.000Z' }
  ];

  function getEvents() { try { return JSON.parse(localStorage.getItem(LS_EVENTS) || '[]'); } catch (e) { return []; } }
  function setEvents(v) { localStorage.setItem(LS_EVENTS, JSON.stringify(v)); }

  if (localStorage.getItem(LS_SEEDED) !== '1') {
    if (!getEvents().length) setEvents(DUMMY_EVENTS);
    localStorage.setItem(LS_SEEDED, '1');
  }

  var clock = document.getElementById('mweTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function formatDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function renderTable() {
    var events = getEvents();
    var body = document.getElementById('mweTableBody');
    var wrap = document.getElementById('mweTableWrap');
    if (!body) return;
    body.innerHTML = events.map(function (ev, i) {
      return '<tr><td>' + escapeHtml(ev.title) + '</td><td>' + formatDate(ev.createdAt) + '</td>' +
        '<td><button type="button" class="mwe-del" data-i="' + i + '">Delete</button></td></tr>';
    }).join('');
    if (wrap) wrap.classList.toggle('has-rows', events.length > 0);
    body.querySelectorAll('.mwe-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var list = getEvents();
        list.splice(Number(btn.getAttribute('data-i')), 1);
        setEvents(list);
        renderTable();
      });
    });
  }

  renderTable();
})();
