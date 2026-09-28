(function () {
  'use strict';

  var CLIENTS = {
    head: 'Internal',
    items: [
      'SAURABH BHARDWAJ', 'SAURABH BHARDWAJ HUF', 'THE GOLD REALTY',
      'Law seva management private limited', 'PERFECT PAIR',
      'TATA MOTORS PASSENGER VEHICLES LIMITED', 'Saksham', 'JYOTI SHARMA'
    ]
  };

  var TEMPLATES = [
    'Company Registration Service', 'Bookkeeping Service', 'Office Visit', 'GST Audit Service',
    'Startup Advisory', 'Corporate Tax Filing', 'Financial Analysis', 'Quarterly Tax Filing',
    'Partnership Registration', 'Tax Consultation', 'Payroll Service', 'Tax Planning Service',
    'LLP Registration', 'Advance Tax Reminder', 'Audit Notification', 'TDS Filing Reminder',
    'GST Filling - Reminder (Sale & Purchase Bills)', 'GST Registration', 'ITR General', 'ITR'
  ];

  var TEMPLATE_BODY = {
    'Company Registration Service': 'Dear {CLIENT}, thank you for choosing our Company Registration Service. Our team will contact you shortly. — CA CloudDesk',
    'Startup Advisory': 'Dear {CLIENT}, we offer startup advisory to help you launch and scale. Book a consultation today. — CA CloudDesk',
    'Office Visit': 'Dear {CLIENT}, your office visit is scheduled. Please confirm your availability. — CA CloudDesk',
    'GST Audit Service': 'Dear {CLIENT}, your GST audit service request has been received. We will share the checklist soon. — CA CloudDesk',
    'Corporate Tax Filing': 'Dear {CLIENT}, corporate tax filing season is here. Submit documents to avoid delays. — CA CloudDesk',
    'ITR': 'HI, A friendly reminder that your ITR for the FY 2022-23 is due on 31st July. Please submit your docs to avoid late fees. Need help? Contact us. Law seva management Lawseva',
    'ITR General': 'Dear {CLIENT}, your ITR filing is pending. Please share income documents at the earliest. — CA CloudDesk',
    'Advance Tax Reminder': 'Dear {CLIENT}, advance tax payment is due soon. Contact us for assistance. — CA CloudDesk'
  };

  var SENT_SMS = [
    { name: 'SAURABH BHARDWAJ', mobile: '', date: '11/07/2023', time: '01:24:05 PM', template: '--', content: 'Test SMS sent to client.' },
    { name: 'SAURABH BHARDWAJ', mobile: '', date: '29/02/2024', time: '05:32:40 PM', template: 'Startup Advisory', content: TEMPLATE_BODY['Startup Advisory'].replace('{CLIENT}', 'SAURABH BHARDWAJ') },
    { name: 'SAURABH BHARDWAJ', mobile: '0000000003', date: '05/07/2023', time: '02:59:38 PM', template: 'Company Registration Service', content: TEMPLATE_BODY['Company Registration Service'].replace('{CLIENT}', 'SAURABH BHARDWAJ') },
    { name: 'SAURABH BHARDWAJ', mobile: '', date: '29/02/2024', time: '05:32:40 PM', template: 'Office Visit', content: TEMPLATE_BODY['Office Visit'].replace('{CLIENT}', 'SAURABH BHARDWAJ') },
    { name: 'SAURABH BHARDWAJ', mobile: '', date: '29/02/2024', time: '05:32:40 PM', template: 'GST Audit Service', content: TEMPLATE_BODY['GST Audit Service'].replace('{CLIENT}', 'SAURABH BHARDWAJ') },
    { name: 'SAURABH BHARDWAJ', mobile: '', date: '29/02/2024', time: '05:32:40 PM', template: 'Corporate Tax Filing', content: TEMPLATE_BODY['Corporate Tax Filing'].replace('{CLIENT}', 'SAURABH BHARDWAJ') },
    { name: 'SAURABH BHARDWAJ', mobile: '', date: '29/02/2024', time: '05:32:40 PM', template: 'Financial Analysis', content: 'Dear SAURABH BHARDWAJ, financial analysis report is ready for review. — CA CloudDesk' },
    { name: 'JYOTI SHARMA', mobile: '', date: '15/03/2024', time: '10:15:22 AM', template: 'ITR', content: TEMPLATE_BODY['ITR'] },
    { name: 'THE GOLD REALTY', mobile: '9876543210', date: '20/01/2024', time: '03:45:10 PM', template: 'GST Registration', content: 'Dear THE GOLD REALTY, GST registration documents received. Processing in 3–5 days. — CA CloudDesk' },
    { name: 'PERFECT PAIR', mobile: '', date: '08/06/2023', time: '11:20:00 AM', template: 'Bookkeeping Service', content: 'Dear PERFECT PAIR, monthly bookkeeping reminder. Share vouchers by 5th. — CA CloudDesk' }
  ];

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
    document.querySelectorAll('.mss-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }

  function getList(key) {
    if (key === 'client' || key === 'clientFilter') return CLIENTS;
    if (key === 'template') return TEMPLATES;
    return [];
  }

  function renderComboMenu(combo, q) {
    var key = combo.getAttribute('data-list');
    var menu = combo.querySelector('.mss-combo__menu');
    var data = getList(key);
    var qq = (q || '').toLowerCase();
    var html = '';
    if (data && data.head) {
      var items = data.items.filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; });
      if (items.length) {
        html += '<div class="mss-combo__head">' + data.head + '</div>';
        html += items.map(function (n) { return '<div class="mss-combo__item">' + n + '</div>'; }).join('');
      }
    } else {
      html = (data || []).filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; })
        .map(function (n) { return '<div class="mss-combo__item">' + n + '</div>'; }).join('');
    }
    menu.innerHTML = html || '<div class="mss-combo__item">No matches</div>';
  }

  document.querySelectorAll('.mss-combo').forEach(function (combo) {
    var input = combo.querySelector('input');
    var menu = combo.querySelector('.mss-combo__menu');
    function open() { renderComboMenu(combo, input.value); closeCombos(combo); combo.classList.add('is-open'); }
    input.addEventListener('focus', open);
    input.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    input.addEventListener('input', function () { renderComboMenu(combo, input.value); combo.classList.add('is-open'); });
    menu.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.mss-combo__item');
      if (!item || item.textContent === 'No matches') return;
      e.preventDefault();
      input.value = item.textContent;
      combo.classList.remove('is-open');
      if (combo.getAttribute('data-list') === 'template') updatePreview();
      if (combo.getAttribute('data-list') === 'clientFilter') renderSentTable();
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mss-combo')) closeCombos();
    if (!e.target.closest('.mss-date-range')) {
      var pop = document.getElementById('mssDatePop');
      var btn = document.getElementById('mssDateBtn');
      if (pop) pop.hidden = true;
      if (btn) { btn.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
      var sw = document.getElementById('mssDateStartWrap');
      var ew = document.getElementById('mssDateEndWrap');
      if (sw) sw.classList.remove('is-active');
      if (ew) ew.classList.remove('is-active');
    }
  });

  /* Tabs */
  var tabSend = document.getElementById('mssTabSend');
  var tabSent = document.getElementById('mssTabSent');
  var paneSend = document.getElementById('mssPaneSend');
  var paneSent = document.getElementById('mssPaneSent');

  function showTab(which) {
    var send = which === 'send';
    tabSend.classList.toggle('is-active', send);
    tabSent.classList.toggle('is-active', !send);
    tabSend.setAttribute('aria-selected', send ? 'true' : 'false');
    tabSent.setAttribute('aria-selected', send ? 'false' : 'true');
    paneSend.hidden = !send;
    paneSent.hidden = send;
  }
  tabSend.addEventListener('click', function () { showTab('send'); });
  tabSent.addEventListener('click', function () { showTab('sent'); });

  /* Preview */
  var previewEl = document.getElementById('mssPreview');
  var templateInput = document.getElementById('mssTemplate');
  var clientInput = document.getElementById('mssClient');

  function updatePreview() {
    var tpl = templateInput.value.trim();
    var client = clientInput.value.trim() || '{CLIENT}';
    if (!tpl) {
      previewEl.textContent = 'Final Content';
      previewEl.classList.remove('has-content');
      return;
    }
    var body = TEMPLATE_BODY[tpl] || ('Dear ' + client + ', message for ' + tpl + '. — CA CloudDesk');
    previewEl.textContent = body.replace(/\{CLIENT\}/g, client);
    previewEl.classList.add('has-content');
  }
  templateInput.addEventListener('change', updatePreview);
  clientInput.addEventListener('change', updatePreview);

  document.getElementById('mssSendSms').addEventListener('click', function () {
    if (!clientInput.value.trim() || !templateInput.value.trim()) {
      toast('Required', 'Select Client and SMS Template.');
      return;
    }
    toast('Send SMS', 'SMS queued for ' + clientInput.value.trim() + '.');
  });
  document.getElementById('mssSendWa').addEventListener('click', function () {
    if (!clientInput.value.trim() || !templateInput.value.trim()) {
      toast('Required', 'Select Client and SMS Template.');
      return;
    }
    toast('Send WhatsApp', 'WhatsApp message queued for ' + clientInput.value.trim() + '.');
  });
  document.getElementById('mssReset').addEventListener('click', function () {
    document.getElementById('mssForm').reset();
    previewEl.textContent = 'Final Content';
    previewEl.classList.remove('has-content');
    toast('Reset', 'Form cleared.');
  });

  /* Dual-month date range calendar */
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var dateBtn = document.getElementById('mssDateBtn');
  var datePop = document.getElementById('mssDatePop');
  var dateStartEl = document.getElementById('mssDateStart');
  var dateEndEl = document.getElementById('mssDateEnd');
  var startWrap = document.getElementById('mssDateStartWrap');
  var endWrap = document.getElementById('mssDateEndWrap');
  var rangeCals = document.getElementById('mssRangeCals');
  var rangeState = {
    cursor: new Date(2026, 7, 1),
    start: null,
    end: null,
    picking: 'start'
  };

  function sameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function inRange(d, start, end) {
    if (!start || !end) return false;
    var t = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    var a = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    var b = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    return t >= Math.min(a, b) && t <= Math.max(a, b);
  }

  function fmtDisplay(d) {
    if (!d) return '';
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear();
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function syncRangeLabels() {
    dateStartEl.textContent = rangeState.start ? fmtDisplay(rangeState.start) : 'Start date';
    dateEndEl.textContent = rangeState.end ? fmtDisplay(rangeState.end) : 'End date';
    dateBtn.classList.toggle('is-filled', !!(rangeState.start || rangeState.end));
    if (startWrap) startWrap.classList.toggle('is-active', rangeState.picking === 'start');
    if (endWrap) endWrap.classList.toggle('is-active', rangeState.picking === 'end');
  }

  function renderMonth(year, month) {
    var first = new Date(year, month, 1);
    var startDay = first.getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var prevDays = new Date(year, month, 0).getDate();
    var html = '<div class="mss-cal"><div class="mss-cal__grid">';
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function (d) {
      html += '<div class="mss-cal__dow">' + d + '</div>';
    });
    var cells = [];
    for (var i = 0; i < startDay; i++) {
      cells.push({ day: prevDays - startDay + i + 1, muted: true, date: new Date(year, month - 1, prevDays - startDay + i + 1) });
    }
    for (var d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, muted: false, date: new Date(year, month, d) });
    }
    var nextDay = 1;
    while (cells.length % 7 !== 0 || cells.length < 35) {
      cells.push({ day: nextDay, muted: true, date: new Date(year, month + 1, nextDay) });
      nextDay += 1;
      if (cells.length > 42) break;
    }
    cells.forEach(function (cell) {
      var cls = 'mss-cal__day';
      if (cell.muted) cls += ' is-muted';
      var isStart = sameDay(cell.date, rangeState.start);
      var isEnd = sameDay(cell.date, rangeState.end);
      if (isStart || isEnd) cls += ' is-selected';
      if (isStart) cls += ' is-range-start';
      if (isEnd) cls += ' is-range-end';
      if (rangeState.start && rangeState.end && inRange(cell.date, rangeState.start, rangeState.end) && !isStart && !isEnd) {
        cls += ' is-in-range';
      }
      html += '<button type="button" class="' + cls + '" data-y="' + cell.date.getFullYear() +
        '" data-m="' + cell.date.getMonth() + '" data-d="' + cell.date.getDate() + '">' + cell.day + '</button>';
    });
    html += '</div></div>';
    return html;
  }

  function renderRangeCals() {
    var y = rangeState.cursor.getFullYear();
    var m = rangeState.cursor.getMonth();
    var next = m === 11 ? { y: y + 1, m: 0 } : { y: y, m: m + 1 };
    var left = document.getElementById('mssCalTitleLeft');
    var right = document.getElementById('mssCalTitleRight');
    if (left) left.textContent = MONTHS[m] + ' ' + y;
    if (right) right.textContent = MONTHS[next.m] + ' ' + next.y;
    if (rangeCals) rangeCals.innerHTML = renderMonth(y, m) + renderMonth(next.y, next.m);
  }

  function openDatePop() {
    datePop.hidden = false;
    dateBtn.classList.add('is-open');
    dateBtn.setAttribute('aria-expanded', 'true');
    if (!rangeState.start && !rangeState.end) rangeState.picking = 'start';
    else if (rangeState.start && !rangeState.end) rangeState.picking = 'end';
    else rangeState.picking = 'start';
    syncRangeLabels();
    renderRangeCals();
  }

  function closeDatePop() {
    datePop.hidden = true;
    dateBtn.classList.remove('is-open');
    dateBtn.setAttribute('aria-expanded', 'false');
    if (startWrap) startWrap.classList.remove('is-active');
    if (endWrap) endWrap.classList.remove('is-active');
  }

  dateBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (datePop.hidden) openDatePop();
    else closeDatePop();
  });

  datePop.addEventListener('click', function (e) {
    e.stopPropagation();
    var nav = e.target.closest('[data-mss-nav]');
    if (nav) {
      var n = nav.getAttribute('data-mss-nav');
      var c = rangeState.cursor;
      if (n === 'm-prev') rangeState.cursor = new Date(c.getFullYear(), c.getMonth() - 1, 1);
      else if (n === 'm-next') rangeState.cursor = new Date(c.getFullYear(), c.getMonth() + 1, 1);
      else if (n === 'y-prev') rangeState.cursor = new Date(c.getFullYear() - 1, c.getMonth(), 1);
      else if (n === 'y-next') rangeState.cursor = new Date(c.getFullYear() + 1, c.getMonth(), 1);
      renderRangeCals();
      return;
    }
    var dayBtn = e.target.closest('.mss-cal__day');
    if (!dayBtn) return;
    var picked = new Date(+dayBtn.getAttribute('data-y'), +dayBtn.getAttribute('data-m'), +dayBtn.getAttribute('data-d'));
    if (rangeState.picking === 'start' || !rangeState.start || (rangeState.start && rangeState.end)) {
      rangeState.start = picked;
      rangeState.end = null;
      rangeState.picking = 'end';
    } else {
      if (picked.getTime() < rangeState.start.getTime()) {
        rangeState.end = rangeState.start;
        rangeState.start = picked;
      } else {
        rangeState.end = picked;
      }
      rangeState.picking = 'start';
      syncRangeLabels();
      renderRangeCals();
      closeDatePop();
      renderSentTable();
      return;
    }
    syncRangeLabels();
    renderRangeCals();
  });

  /* Sent SMS table */
  var sentBody = document.getElementById('mssSentBody');
  var filterClient = document.getElementById('mssFilterClient');

  function parseDate(str) {
    var p = str.split('/');
    return new Date(parseInt(p[2], 10), parseInt(p[1], 10) - 1, parseInt(p[0], 10));
  }

  function renderSentTable() {
    var q = (filterClient.value || '').trim().toLowerCase();
    var start = rangeState.start;
    var end = rangeState.end;
    var rows = SENT_SMS.filter(function (r) {
      if (q && r.name.toLowerCase().indexOf(q) === -1) return false;
      if (start || end) {
        var d = parseDate(r.date);
        var day = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
        if (start) {
          var s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
          if (day < s) return false;
        }
        if (end) {
          var en = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
          if (day > en) return false;
        }
      }
      return true;
    });
    sentBody.innerHTML = rows.map(function (r, i) {
      return '<tr><td>' + (i + 1) + '</td><td>' + r.name + '</td><td>' + (r.mobile || '') + '</td><td>' + r.date + '</td><td>' + r.time + '</td><td>' + r.template + '</td><td><button type="button" class="mss-view-link" data-content="' + escapeAttr(r.content) + '">View</button></td></tr>';
    }).join('') || '<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:24px">No records found</td></tr>';
  }

  function escapeAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  sentBody.addEventListener('click', function (e) {
    var btn = e.target.closest('.mss-view-link');
    if (!btn) return;
    document.getElementById('mssModalBody').textContent = btn.getAttribute('data-content');
    document.getElementById('mssModal').hidden = false;
  });

  document.getElementById('mssModalClose').addEventListener('click', function () {
    document.getElementById('mssModal').hidden = true;
  });
  document.getElementById('mssModal').addEventListener('click', function (e) {
    if (e.target === this) this.hidden = true;
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.getElementById('mssModal').hidden = true;
  });

  renderSentTable();
})();
