/**
 * TIME ERP Event Calendar — interactive demo mapped to verified home modules.
 * Modules: HRMS, Leave Management, Project Management, Billing Management,
 * Compliance Management, Document Vault, CRM, Client Desk, Communication Center.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'timeerp_event_calendar_v2';

  var CATEGORIES = [
    { id: 'meetings', label: 'Team Meetings', color: '#25b7a7' },
    { id: 'tasks', label: 'Tasks', color: '#243F64' },
    { id: 'milestones', label: 'Project Milestones', color: '#0d7a6e' },
    { id: 'client', label: 'Client Meetings', color: '#17C3B2' },
    { id: 'employee', label: 'HRMS Events', color: '#3d8bfd' },
    { id: 'compliance', label: 'Compliance Deadlines', color: '#c0392b' },
    { id: 'billing', label: 'Billing Due Dates', color: '#b7791f' },
    { id: 'leave', label: 'Leave & Holidays', color: '#6b7c93' }
  ];

  var MODULE_BY_CAT = {
    meetings: 'Communication Center',
    tasks: 'Project Management',
    milestones: 'Project Management',
    client: 'CRM',
    employee: 'HRMS',
    compliance: 'Compliance Management',
    billing: 'Billing Management',
    leave: 'Leave Management'
  };

  var MODULE_LINKS = {
    'Communication Center': 'index.html#communication',
    'Project Management': 'project_management.html',
    'CRM': 'index.html#crm',
    'Client Desk': 'index.html#client-desk',
    'HRMS': 'index.html#hrms',
    'Compliance Management': 'index.html#compliance',
    'Billing Management': 'index.html#billing',
    'Leave Management': 'index.html#leave',
    'Document Vault': 'index.html#document-vault',
    'Payroll': 'payroll.html',
    'Attendance': 'index.html#attendance'
  };

  var SEED_EVENTS = [
    { id: 'e1', title: 'GST monthly return review', date: '2026-07-18', time: '10:00', end: '11:00', category: 'compliance', priority: 'High', status: 'Scheduled', assignee: 'Priya Sharma', project: 'Compliance FY26', client: 'Sharma Traders', module: 'Compliance Management', desc: 'Prepare GST Reports pack for filing.', notes: 'Pull supporting invoices from Document Vault.' },
    { id: 'e2', title: 'Client kickoff — Nexus Pvt Ltd', date: '2026-07-18', time: '14:00', end: '15:00', category: 'client', priority: 'High', status: 'Scheduled', assignee: 'Rahul Mehta', project: 'Nexus Onboarding', client: 'Nexus Pvt Ltd', module: 'CRM', desc: 'Kickoff for leads, pipeline scope, and Client Desk collaboration.', notes: 'Share onboarding docs via Client Desk.' },
    { id: 'e3', title: 'Task timesheet review — Audit pack', date: '2026-07-18', time: '16:30', end: '17:00', category: 'tasks', priority: 'Medium', status: 'In Progress', assignee: 'Ankit Verma', project: 'Statutory Audit', client: 'Mehta & Co', module: 'Project Management', desc: 'Review task timesheet and pending audit queries.', notes: 'Update Profit / Loss Report after billing hours.' },
    { id: 'e4', title: 'Invoice due — INV-1048', date: '2026-07-20', time: '09:00', end: '09:30', category: 'billing', priority: 'High', status: 'Scheduled', assignee: 'Finance Desk', project: '', client: 'Orbit Foods', module: 'Billing Management', desc: 'Follow up on invoice and receipt status.', notes: 'Check BharatPe Integration and UPI AutoPay.' },
    { id: 'e5', title: 'Project milestone — Site handover draft', date: '2026-07-21', time: '11:00', end: '12:30', category: 'milestones', priority: 'Medium', status: 'Scheduled', assignee: 'Sneha Kapoor', project: 'Greenfield Tower A', client: 'BuildRight Infra', module: 'Project Management', desc: 'Multi-client handover checklist, worklogs, and task billing review.', notes: '' },
    { id: 'e6', title: 'Team standup', date: '2026-07-22', time: '09:30', end: '10:00', category: 'meetings', priority: 'Low', status: 'Scheduled', assignee: 'Operations', project: '', client: 'Internal', module: 'Communication Center', desc: 'Weekly operations sync via Communication Center.', notes: '' },
    { id: 'e7', title: 'EPFO remittance deadline', date: '2026-07-15', time: '17:00', end: '17:30', category: 'compliance', priority: 'High', status: 'Completed', assignee: 'HR Payroll', project: '', client: 'Internal', module: 'Compliance Management', desc: 'EPFO Reports remittance cutoff.', notes: 'Linked to Payroll PF & ESI inputs.' },
    { id: 'e8', title: 'Leave — Casual (A. Sharma)', date: '2026-07-23', time: '00:00', end: '23:59', category: 'leave', priority: 'Low', status: 'Scheduled', assignee: 'A. Sharma', project: '', client: 'Internal', module: 'Leave Management', desc: 'Approved casual leave from Leave Management.', notes: 'Attendance awareness for the day.' },
    { id: 'e9', title: 'DSC expiry — Partner token', date: '2026-07-24', time: '10:00', end: '10:30', category: 'compliance', priority: 'High', status: 'Scheduled', assignee: 'Admin', project: '', client: 'Internal', module: 'Document Vault', desc: 'Renew DSC tracked in Document Vault DSC Tracker.', notes: 'Update DSC Tracker after renewal.' },
    { id: 'e10', title: 'Agreement renewal pack', date: '2026-07-25', time: '15:00', end: '16:00', category: 'tasks', priority: 'Medium', status: 'Scheduled', assignee: 'Legal Desk', project: 'MSA Renewals', client: 'Nexus Pvt Ltd', module: 'Document Vault', desc: 'Prepare Create Agreement / Outward Documents package.', notes: 'Document Approval Workflow before share.' },
    { id: 'e11', title: 'Employee birthday — R. Verma', date: '2026-07-27', time: '00:00', end: '23:59', category: 'employee', priority: 'Low', status: 'Scheduled', assignee: 'HRMS', project: '', client: 'Internal', module: 'HRMS', desc: 'Birthday reminder from employee profile in HRMS.', notes: '' },
    { id: 'e12', title: 'Company holiday — Optional', date: '2026-07-19', time: '00:00', end: '23:59', category: 'leave', priority: 'Low', status: 'Scheduled', assignee: 'HRMS', project: '', client: 'Internal', module: 'Leave Management', desc: 'Holiday calendar entry from Leave Management.', notes: '' },
    { id: 'e13', title: 'Payment follow-up — receipt', date: '2026-07-28', time: '12:00', end: '12:30', category: 'billing', priority: 'Medium', status: 'Scheduled', assignee: 'Collections', project: '', client: 'Pixel Soft', module: 'Billing Management', desc: 'Follow up on overdue receipt and ledger posting.', notes: '' },
    { id: 'e14', title: 'CRM demo with prospect', date: '2026-07-29', time: '16:00', end: '17:00', category: 'client', priority: 'Medium', status: 'Scheduled', assignee: 'Sales', project: 'Pipeline', client: 'Lead — Apex Retail', module: 'CRM', desc: 'Walkthrough of CRM leads, pipeline, quotations, and Billing Management.', notes: '' },
    { id: 'e15', title: 'Document expiry — Lease scan', date: '2026-07-16', time: '11:00', end: '11:30', category: 'tasks', priority: 'High', status: 'Scheduled', assignee: 'Document Desk', project: '', client: 'Internal', module: 'Document Vault', desc: 'Review expiring lease in Document Vault.', notes: 'Trigger Inward / Outward Documents if renewed.' },
    { id: 'e16', title: 'Gratuity management review', date: '2026-07-17', time: '15:00', end: '16:00', category: 'compliance', priority: 'High', status: 'Scheduled', assignee: 'Priya Sharma', project: 'Compliance FY26', client: 'Internal', module: 'Compliance Management', desc: 'Review Gratuity Management records for audit readiness.', notes: 'Cross-check with Payroll and HRMS.' },
    { id: 'e17', title: 'ESIC & TDS report prep', date: '2026-07-26', time: '10:00', end: '11:30', category: 'compliance', priority: 'Medium', status: 'Scheduled', assignee: 'HR Payroll', project: '', client: 'Internal', module: 'Compliance Management', desc: 'Prepare ESIC Reports and TDS Reports.', notes: '' },
    { id: 'e18', title: 'Recurring task — Weekly client status', date: '2026-07-24', time: '14:00', end: '14:30', category: 'milestones', priority: 'Medium', status: 'Scheduled', assignee: 'Sneha Kapoor', project: 'Greenfield Tower A', client: 'BuildRight Infra', module: 'Project Management', desc: 'Recurring Task status shared with Multi Client stakeholders.', notes: 'Share Task with Client where needed.' }
  ];

  var catMap = {};
  CATEGORIES.forEach(function (c) { catMap[c.id] = c; });

  var events = loadEvents();
  var activeDrawerId = null;

  var state = {
    view: 'month',
    cursor: new Date(2026, 6, 1),
    today: new Date(2026, 6, 18),
    selectedDate: '2026-07-18',
    filters: CATEGORIES.map(function (c) { return c.id; }),
    query: '',
    assignee: '',
    priority: '',
    status: '',
    dueOnly: false,
    hideDone: false,
    dragId: null
  };

  var els = {
    filters: document.getElementById('ecFilters'),
    board: document.getElementById('ecBoardBody'),
    boardTitle: document.getElementById('ecBoardTitle'),
    period: document.getElementById('ecPeriodLabel'),
    upcoming: document.getElementById('ecUpcomingList'),
    upcomingCount: document.getElementById('ecUpcomingCount'),
    overdue: document.getElementById('ecOverdueList'),
    overdueCount: document.getElementById('ecOverdueCount'),
    workload: document.getElementById('ecWorkload'),
    todayTimeline: document.getElementById('ecTodayTimeline'),
    todayDate: document.getElementById('ecTodayDate'),
    search: document.getElementById('ecSearch'),
    filterAssignee: document.getElementById('ecFilterAssignee'),
    filterPriority: document.getElementById('ecFilterPriority'),
    filterStatus: document.getElementById('ecFilterStatus'),
    dueOnly: document.getElementById('ecDueOnly'),
    hideDone: document.getElementById('ecHideDone'),
    drawer: document.getElementById('ecDrawer'),
    drawerBackdrop: document.getElementById('ecDrawerBackdrop'),
    drawerTitle: document.getElementById('ecDrawerTitle'),
    drawerBody: document.getElementById('ecDrawerBody'),
    modal: document.getElementById('ecModalBackdrop'),
    form: document.getElementById('ecCreateForm'),
    catSelect: document.getElementById('ecEvCat'),
    toast: document.getElementById('ecToast')
  };

  function loadEvents() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch (e) { /* ignore */ }
    return SEED_EVENTS.map(function (e) { return Object.assign({}, e); });
  }

  function saveEvents() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(events)); } catch (e) { /* ignore */ }
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function toISO(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parseISO(s) {
    var p = s.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  function startOfWeek(d) {
    var x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var day = (x.getDay() + 6) % 7;
    x.setDate(x.getDate() - day);
    return x;
  }
  function monthLabel(d) {
    return d.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  }
  function formatTime(t) {
    if (!t || t === '00:00') return 'All day';
    var h = +t.slice(0, 2), m = t.slice(3), ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + m + ' ' + ap;
  }
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function daysBetween(aISO, bISO) {
    return Math.round((parseISO(aISO) - parseISO(bISO)) / 86400000);
  }
  function isDeadlineCategory(cat) {
    return cat === 'compliance' || cat === 'billing' || cat === 'tasks' || cat === 'milestones';
  }
  function urgencyClass(ev) {
    if (ev.status === 'Completed') return '';
    var todayISO = toISO(state.today);
    var diff = daysBetween(ev.date, todayISO);
    if (diff < 0) return 'is-overdue';
    if (diff <= 2 && isDeadlineCategory(ev.category)) return 'is-due-soon';
    return '';
  }

  function filteredEvents() {
    var q = state.query.trim().toLowerCase();
    return events.filter(function (e) {
      if (state.filters.indexOf(e.category) === -1) return false;
      if (state.hideDone && e.status === 'Completed') return false;
      if (state.dueOnly && !isDeadlineCategory(e.category)) return false;
      if (state.assignee && e.assignee !== state.assignee) return false;
      if (state.priority && e.priority !== state.priority) return false;
      if (state.status && e.status !== state.status) return false;
      if (!q) return true;
      var hay = [e.title, e.assignee, e.client, e.project, e.module, e.desc].join(' ').toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }

  function eventsOn(dateStr) {
    return filteredEvents().filter(function (e) { return e.date === dateStr; });
  }

  function findEvent(id) {
    return events.filter(function (e) { return e.id === id; })[0];
  }

  function populateAssigneeFilter() {
    if (!els.filterAssignee) return;
    var names = [];
    events.forEach(function (e) {
      if (e.assignee && names.indexOf(e.assignee) === -1) names.push(e.assignee);
    });
    names.sort();
    var current = state.assignee;
    els.filterAssignee.innerHTML = '<option value="">All</option>' + names.map(function (n) {
      return '<option value="' + escapeHtml(n) + '"' + (n === current ? ' selected' : '') + '>' + escapeHtml(n) + '</option>';
    }).join('');
  }

  function renderFilters() {
    els.filters.innerHTML = CATEGORIES.map(function (c) {
      var on = state.filters.indexOf(c.id) !== -1;
      return '<button type="button" class="ec-chip' + (on ? ' is-active' : '') + '" data-filter="' + c.id + '">'
        + '<span class="ec-chip__dot" style="--dot:' + c.color + '"></span>' + escapeHtml(c.label) + '</button>';
    }).join('');
  }

  function renderPeriod() {
    if (state.view === 'month') els.period.textContent = monthLabel(state.cursor);
    else if (state.view === 'week') {
      var s = startOfWeek(state.cursor), e = new Date(s); e.setDate(e.getDate() + 6);
      els.period.textContent = s.getDate() + '–' + e.getDate() + ' ' + e.toLocaleString('en-IN', { month: 'short', year: 'numeric' });
    } else if (state.view === 'day') {
      els.period.textContent = state.cursor.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
    } else {
      els.period.textContent = monthLabel(state.cursor);
    }
    els.boardTitle.textContent = ({ month: 'Month view', week: 'Week view', day: 'Day view', agenda: 'Agenda view' })[state.view];
  }

  function pillHtml(ev) {
    var color = catMap[ev.category] ? catMap[ev.category].color : '#25b7a7';
    var urg = urgencyClass(ev);
    var label = ev.client && ev.client !== 'Internal' ? (ev.title + ' · ' + ev.client) : ev.title;
    return '<button type="button" class="ec-pill' + (urg ? ' ' + urg : '') + '" draggable="true" data-id="' + escapeHtml(ev.id) + '" style="border-left-color:' + color + '" title="' + escapeHtml(label) + '">'
      + '<span class="ec-pill__dot" style="background:' + color + '"></span><span class="ec-pill__text">' + escapeHtml(ev.title) + '</span></button>';
  }

  function renderMonth() {
    var y = state.cursor.getFullYear(), m = state.cursor.getMonth();
    var first = new Date(y, m, 1);
    var start = startOfWeek(first);
    var selected = state.selectedDate || toISO(state.today);
    var html = '<div class="ec-month">'
      + '<div class="ec-month__toolbar"><div class="ec-month__legend">'
      + CATEGORIES.map(function (c) {
        return '<span><i style="background:' + c.color + '"></i>' + escapeHtml(c.label) + '</span>';
      }).join('')
      + '</div></div>'
      + '<div class="ec-selected-bar' + (selected ? ' is-visible' : '') + '" id="ecSelectedBar">'
      + '<div><strong id="ecSelectedLabel"></strong> <span id="ecSelectedMeta"></span></div>'
      + '<button type="button" class="btn btn--ghost btn--sm" data-create-on-selected>Add event</button></div>'
      + '<div class="ec-weekdays">'
      + ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(function (d) { return '<span>' + d + '</span>'; }).join('')
      + '</div><div class="ec-days">';
    for (var i = 0; i < 42; i++) {
      var day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      var iso = toISO(day);
      var muted = day.getMonth() !== m;
      var isToday = sameDay(day, state.today);
      var isSelected = iso === selected;
      var dayEvents = eventsOn(iso);
      var shown = dayEvents.slice(0, 3);
      var more = dayEvents.length - shown.length;
      var preview = dayEvents.slice(0, 4).map(function (ev) { return '<li>' + escapeHtml(ev.title) + '</li>'; }).join('');
      html += '<div class="ec-day' + (muted ? ' is-muted' : '') + (isToday ? ' is-today' : '') + (isSelected ? ' is-selected' : '') + '" data-date="' + iso + '" role="button" tabindex="0">'
        + '<div class="ec-day__top"><span class="ec-day__num">' + day.getDate() + '</span>'
        + (dayEvents.length ? '<span class="ec-day__count">' + dayEvents.length + '</span>' : '')
        + '</div><div class="ec-day__events">';
      shown.forEach(function (ev) { html += pillHtml(ev); });
      if (more > 0) html += '<button type="button" class="ec-pill ec-pill--more" data-date-more="' + iso + '">+' + more + ' more</button>';
      html += '</div>';
      if (preview) html += '<div class="ec-day-preview has-content"><strong>' + dayEvents.length + ' event' + (dayEvents.length > 1 ? 's' : '') + '</strong><ul>' + preview + '</ul></div>';
      html += '</div>';
    }
    html += '</div></div>';
    els.board.innerHTML = html;
    updateSelectedBar(selected);
    bindDragDrop();
  }

  function updateSelectedBar(iso) {
    var label = document.getElementById('ecSelectedLabel');
    var meta = document.getElementById('ecSelectedMeta');
    if (!label || !meta || !iso) return;
    var d = parseISO(iso);
    var list = eventsOn(iso);
    label.textContent = d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    meta.textContent = list.length ? (list.length + ' event' + (list.length > 1 ? 's' : '') + ' scheduled') : 'No events — click Add event to schedule';
  }

  function renderTimeGrid(days) {
    var hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    var html = '<div class="ec-timegrid"><div class="ec-timegrid__table" style="--cols:' + days.length + '">';
    html += '<div class="ec-timegrid__corner"></div>';
    days.forEach(function (d) {
      html += '<div class="ec-timegrid__dayhead' + (sameDay(d, state.today) ? ' is-today' : '') + '">'
        + d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' }) + '</div>';
    });
    hours.forEach(function (h) {
      html += '<div class="ec-timegrid__hour">' + pad(h) + ':00</div>';
      days.forEach(function (d) {
        var iso = toISO(d);
        var slot = eventsOn(iso).filter(function (e) {
          var eh = +(e.time || '00:00').slice(0, 2);
          return eh === h || (e.time === '00:00' && h === 9);
        });
        html += '<div class="ec-timegrid__cell" data-date="' + iso + '" data-hour="' + h + '">';
        slot.forEach(function (ev) {
          var color = catMap[ev.category] ? catMap[ev.category].color : '#25b7a7';
          var urg = urgencyClass(ev);
          html += '<button type="button" class="ec-timegrid__event' + (urg ? ' ' + urg : '') + '" data-id="' + escapeHtml(ev.id) + '" draggable="true" style="background:' + (urg === 'is-overdue' ? '#c0392b' : color) + '">' + escapeHtml(ev.title) + '</button>';
        });
        html += '</div>';
      });
    });
    html += '</div></div>';
    els.board.innerHTML = html;
    bindTimegridDrag();
  }

  function renderWeek() {
    var s = startOfWeek(state.cursor);
    var days = [];
    for (var i = 0; i < 7; i++) days.push(new Date(s.getFullYear(), s.getMonth(), s.getDate() + i));
    renderTimeGrid(days);
  }

  function renderDay() {
    renderTimeGrid([new Date(state.cursor.getFullYear(), state.cursor.getMonth(), state.cursor.getDate())]);
  }

  function renderAgenda() {
    var list = filteredEvents().slice().sort(function (a, b) {
      return a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date);
    });
    var month = state.cursor.getMonth(), year = state.cursor.getFullYear();
    list = list.filter(function (e) {
      var d = parseISO(e.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });
    if (!list.length) {
      els.board.innerHTML = '<div class="ec-empty"><span class="material-symbols-outlined">event_busy</span><p>No events match your filters for this period.</p></div>';
      return;
    }
    var groups = {};
    list.forEach(function (e) {
      if (!groups[e.date]) groups[e.date] = [];
      groups[e.date].push(e);
    });
    var html = '<div class="ec-agenda">';
    Object.keys(groups).sort().forEach(function (date) {
      var label = parseISO(date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
      html += '<div class="ec-agenda__group"><div class="ec-agenda__date">' + label + '</div>';
      groups[date].forEach(function (ev) {
        var color = catMap[ev.category] ? catMap[ev.category].color : '#25b7a7';
        var urg = urgencyClass(ev);
        html += '<button type="button" class="ec-agenda__item" data-id="' + escapeHtml(ev.id) + '">'
          + '<span class="ec-agenda__bar" style="background:' + (urg === 'is-overdue' ? '#c0392b' : color) + '"></span>'
          + '<span><span class="ec-agenda__title">' + escapeHtml(ev.title) + '</span>'
          + '<span class="ec-agenda__meta">' + formatTime(ev.time) + ' · ' + escapeHtml(ev.assignee) + ' · ' + escapeHtml(ev.module)
          + (urg === 'is-overdue' ? ' · Overdue' : '') + '</span></span></button>';
      });
      html += '</div>';
    });
    html += '</div>';
    els.board.innerHTML = html;
  }

  function renderBoard() {
    renderPeriod();
    if (state.view === 'month') renderMonth();
    else if (state.view === 'week') renderWeek();
    else if (state.view === 'day') renderDay();
    else renderAgenda();
  }

  function renderOverdue() {
    if (!els.overdue) return;
    var todayISO = toISO(state.today);
    var list = filteredEvents().filter(function (e) {
      if (e.status === 'Completed') return false;
      var diff = daysBetween(e.date, todayISO);
      return diff < 0 || (diff <= 2 && isDeadlineCategory(e.category));
    }).sort(function (a, b) { return a.date.localeCompare(b.date); }).slice(0, 6);
    els.overdueCount.textContent = list.length ? list.length + ' items' : 'Clear';
    if (!list.length) {
      els.overdue.innerHTML = '<div class="ec-empty" style="padding:16px"><p>No overdue or due-soon items.</p></div>';
      return;
    }
    els.overdue.innerHTML = list.map(function (ev) {
      var diff = daysBetween(ev.date, todayISO);
      var label = diff < 0 ? (Math.abs(diff) + ' day' + (Math.abs(diff) > 1 ? 's' : '') + ' overdue') : (diff === 0 ? 'Due today' : 'Due in ' + diff + ' day' + (diff > 1 ? 's' : ''));
      return '<button type="button" class="ec-overdue-item" data-id="' + escapeHtml(ev.id) + '">'
        + '<span style="flex:1;min-width:0"><strong>' + escapeHtml(ev.title) + '</strong>'
        + '<span>' + escapeHtml(label) + ' · ' + escapeHtml(ev.module) + '</span></span></button>';
    }).join('');
  }

  function renderUpcoming() {
    var todayISO = toISO(state.today);
    var list = filteredEvents().filter(function (e) { return e.date >= todayISO && e.status !== 'Completed'; })
      .sort(function (a, b) { return a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date); })
      .slice(0, 5);
    els.upcomingCount.textContent = list.length + ' shown';
    if (!list.length) {
      els.upcoming.innerHTML = '<div class="ec-empty" style="padding:20px"><p>No upcoming events.</p></div>';
      return;
    }
    els.upcoming.innerHTML = list.map(function (ev) {
      var d = parseISO(ev.date);
      var pClass = ev.priority === 'High' ? 'ec-badge--high' : (ev.priority === 'Medium' ? 'ec-badge--medium' : 'ec-badge--low');
      return '<button type="button" class="ec-up-item" data-id="' + escapeHtml(ev.id) + '">'
        + '<span class="ec-up-date"><strong>' + d.getDate() + '</strong><span>' + d.toLocaleString('en-IN', { month: 'short' }) + '</span></span>'
        + '<span class="ec-up-body"><strong>' + escapeHtml(ev.title) + '</strong>'
        + '<p>' + formatTime(ev.time) + ' · ' + escapeHtml(ev.assignee) + '</p>'
        + '<span class="ec-badges"><span class="ec-badge ' + pClass + '">' + escapeHtml(ev.priority) + '</span>'
        + '<span class="ec-badge ec-badge--status">' + escapeHtml(ev.module) + '</span></span></span></button>';
    }).join('');
  }

  function renderToday() {
    els.todayDate.textContent = state.today.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    var list = eventsOn(toISO(state.today)).slice().sort(function (a, b) { return a.time.localeCompare(b.time); });
    if (!list.length) {
      els.todayTimeline.innerHTML = '<div class="ec-empty" style="padding:16px"><p>No activities scheduled today.</p></div>';
      return;
    }
    els.todayTimeline.innerHTML = list.map(function (ev) {
      return '<div class="ec-tl-row">'
        + '<div class="ec-tl-time">' + formatTime(ev.time) + '</div>'
        + '<div class="ec-tl-rail"><span class="ec-tl-dot" style="background:' + (catMap[ev.category] ? catMap[ev.category].color : '#25b7a7') + '"></span></div>'
        + '<button type="button" class="ec-tl-card" data-id="' + escapeHtml(ev.id) + '"><strong>' + escapeHtml(ev.title) + '</strong><span>' + escapeHtml(ev.module) + ' · ' + escapeHtml(ev.assignee) + '</span></button>'
        + '</div>';
    }).join('');
  }

  function renderWorkload() {
    if (!els.workload) return;
    var weekStart = startOfWeek(state.today);
    var weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 6);
    var startISO = toISO(weekStart), endISO = toISO(weekEnd);
    var counts = {};
    filteredEvents().forEach(function (e) {
      if (e.date < startISO || e.date > endISO) return;
      if (e.status === 'Completed') return;
      counts[e.assignee] = (counts[e.assignee] || 0) + 1;
    });
    var rows = Object.keys(counts).map(function (name) { return { name: name, n: counts[name] }; })
      .sort(function (a, b) { return b.n - a.n; }).slice(0, 6);
    if (!rows.length) {
      els.workload.innerHTML = '<div class="ec-empty" style="padding:12px"><p>No assigned work this week.</p></div>';
      return;
    }
    var max = rows[0].n || 1;
    els.workload.innerHTML = rows.map(function (r) {
      var pct = Math.round((r.n / max) * 100);
      return '<div class="ec-wl-row"><strong>' + escapeHtml(r.name) + '</strong><span class="ec-wl-count">' + r.n + '</span>'
        + '<div class="ec-wl-bar"><i style="width:' + pct + '%"></i></div></div>';
    }).join('');
  }

  function field(label, value, full) {
    return '<div class="ec-drawer__field' + (full ? ' ec-drawer__field--full' : '') + '"><span>' + label + '</span><strong>' + escapeHtml(value) + '</strong></div>';
  }

  function openDrawer(id) {
    var ev = findEvent(id);
    if (!ev) return;
    activeDrawerId = id;
    var cat = catMap[ev.category];
    var link = MODULE_LINKS[ev.module] || 'index.html#products';
    var urg = urgencyClass(ev);
    els.drawerTitle.textContent = ev.title;
    els.drawerBody.innerHTML =
      '<p class="ec-drawer__desc">' + escapeHtml(ev.desc || 'No description.') + '</p>'
      + (urg === 'is-overdue' ? '<p style="color:#c0392b;font-size:13px;font-weight:700;margin:-8px 0 14px">⚠ Overdue — reschedule or mark complete</p>' : '')
      + '<div class="ec-drawer__grid">'
      + field('Date', parseISO(ev.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }))
      + field('Time', formatTime(ev.time) + (ev.end && ev.end !== '23:59' ? ' – ' + formatTime(ev.end) : ''))
      + field('Category', cat ? cat.label : ev.category)
      + field('Priority', ev.priority)
      + field('Status', ev.status)
      + field('Assigned Employee', ev.assignee)
      + field('Related Project', ev.project || '—')
      + field('Related Client', ev.client || '—')
      + field('TIME ERP Module', ev.module, true)
      + field('Notes', ev.notes || '—', true)
      + '</div>'
      + '<div class="ec-drawer__actions"><a class="ec-module-link" href="' + escapeHtml(link) + '"><span class="material-symbols-outlined" style="font-size:16px">open_in_new</span>Open ' + escapeHtml(ev.module) + '</a></div>';
    els.drawer.setAttribute('aria-hidden', 'false');
    els.drawerBackdrop.hidden = false;
    els.drawerBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    activeDrawerId = null;
    els.drawer.setAttribute('aria-hidden', 'true');
    els.drawerBackdrop.classList.remove('is-open');
    els.drawerBackdrop.hidden = true;
    document.body.style.overflow = '';
  }

  function openModal(presetCat, editId) {
    els.catSelect.innerHTML = CATEGORIES.map(function (c) {
      return '<option value="' + c.id + '">' + escapeHtml(c.label) + '</option>';
    }).join('');
    els.form.reset();
    els.form.setAttribute('data-edit-id', editId || '');
    document.getElementById('ecModalTitle').textContent = editId ? 'Edit Event' : 'Create Event';
    if (editId) {
      var ev = findEvent(editId);
      if (ev) {
        document.getElementById('ecEvTitle').value = ev.title;
        document.getElementById('ecEvDesc').value = ev.desc || '';
        document.getElementById('ecEvDate').value = ev.date;
        document.getElementById('ecEvTime').value = ev.time === '00:00' ? '09:00' : ev.time;
        els.catSelect.value = ev.category;
        document.getElementById('ecEvPriority').value = ev.priority;
        document.getElementById('ecEvAssignee').value = ev.assignee;
        document.getElementById('ecEvStatus').value = ev.status;
        document.getElementById('ecEvProject').value = ev.project || '';
        document.getElementById('ecEvClient').value = ev.client || '';
      }
    } else {
      document.getElementById('ecEvDate').value = state.selectedDate || toISO(state.today);
      document.getElementById('ecEvTime').value = '10:00';
      document.getElementById('ecEvPriority').value = 'Medium';
      document.getElementById('ecEvStatus').value = 'Scheduled';
      els.catSelect.value = presetCat || 'meetings';
    }
    els.modal.hidden = false;
    els.modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { document.getElementById('ecEvTitle').focus(); }, 30);
  }

  function closeModal() {
    els.modal.classList.remove('is-open');
    els.modal.hidden = true;
    els.form.setAttribute('data-edit-id', '');
    document.body.style.overflow = '';
  }

  function toast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add('is-visible');
    setTimeout(function () { els.toast.classList.remove('is-visible'); }, 2200);
  }

  function bindDragDrop() {
    els.board.querySelectorAll('.ec-pill[draggable]').forEach(function (pill) {
      pill.addEventListener('dragstart', function (e) {
        state.dragId = pill.getAttribute('data-id');
        pill.classList.add('is-dragging');
        e.dataTransfer.setData('text/plain', state.dragId);
        e.dataTransfer.effectAllowed = 'move';
      });
      pill.addEventListener('dragend', function () {
        pill.classList.remove('is-dragging');
        state.dragId = null;
        els.board.querySelectorAll('.ec-day.is-drop').forEach(function (d) { d.classList.remove('is-drop'); });
      });
    });
    els.board.querySelectorAll('.ec-day').forEach(function (day) {
      day.addEventListener('dragover', function (e) {
        e.preventDefault();
        day.classList.add('is-drop');
      });
      day.addEventListener('dragleave', function () { day.classList.remove('is-drop'); });
      day.addEventListener('drop', function (e) {
        e.preventDefault();
        day.classList.remove('is-drop');
        var id = e.dataTransfer.getData('text/plain') || state.dragId;
        var date = day.getAttribute('data-date');
        var ev = findEvent(id);
        if (!ev || !date) return;
        ev.date = date;
        saveEvents();
        toast('Moved "' + ev.title + '" to ' + date);
        renderAll();
      });
    });
  }

  function bindTimegridDrag() {
    els.board.querySelectorAll('.ec-timegrid__event[draggable]').forEach(function (el) {
      el.addEventListener('dragstart', function (e) {
        state.dragId = el.getAttribute('data-id');
        e.dataTransfer.setData('text/plain', state.dragId);
      });
    });
    els.board.querySelectorAll('.ec-timegrid__cell').forEach(function (cell) {
      cell.addEventListener('dragover', function (e) { e.preventDefault(); });
      cell.addEventListener('drop', function (e) {
        e.preventDefault();
        var id = e.dataTransfer.getData('text/plain') || state.dragId;
        var ev = findEvent(id);
        if (!ev) return;
        ev.date = cell.getAttribute('data-date');
        var hour = cell.getAttribute('data-hour');
        if (hour != null) ev.time = pad(+hour) + ':00';
        saveEvents();
        toast('Rescheduled "' + ev.title + '"');
        renderAll();
      });
    });
  }

  function renderAll() {
    populateAssigneeFilter();
    renderFilters();
    renderBoard();
    renderOverdue();
    renderUpcoming();
    renderToday();
    renderWorkload();
  }

  document.addEventListener('click', function (e) {
    var filter = e.target.closest('[data-filter]');
    var viewBtn = e.target.closest('[data-view]');
    var openEv = e.target.closest('[data-id]');
    var create = e.target.closest('[data-create]');
    var createOnSelected = e.target.closest('[data-create-on-selected]');
    var more = e.target.closest('[data-date-more]');
    var dayCell = e.target.closest('.ec-day[data-date]');

    if (filter) {
      var id = filter.getAttribute('data-filter');
      var idx = state.filters.indexOf(id);
      if (idx === -1) state.filters.push(id);
      else if (state.filters.length > 1) state.filters.splice(idx, 1);
      renderAll();
      return;
    }
    if (viewBtn) {
      document.querySelectorAll('.ec-view-btn').forEach(function (b) {
        b.classList.toggle('is-active', b === viewBtn);
        b.setAttribute('aria-selected', b === viewBtn ? 'true' : 'false');
      });
      state.view = viewBtn.getAttribute('data-view');
      renderBoard();
      return;
    }
    if (more) {
      state.view = 'agenda';
      state.cursor = parseISO(more.getAttribute('data-date-more'));
      document.querySelectorAll('.ec-view-btn').forEach(function (b) {
        var on = b.getAttribute('data-view') === 'agenda';
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      renderBoard();
      return;
    }
    if (openEv && !openEv.classList.contains('ec-pill--more') && !openEv.closest('.ec-drawer')) {
      openDrawer(openEv.getAttribute('data-id'));
      return;
    }
    if (createOnSelected) {
      openModal('meetings');
      document.getElementById('ecEvDate').value = state.selectedDate || toISO(state.today);
      return;
    }
    if (create) {
      openModal(create.getAttribute('data-create'));
      return;
    }
    if (dayCell && state.view === 'month' && !e.target.closest('.ec-pill')) {
      state.selectedDate = dayCell.getAttribute('data-date');
      renderMonth();
    }
  });

  document.getElementById('ecPrev').addEventListener('click', function () {
    if (state.view === 'month' || state.view === 'agenda') state.cursor.setMonth(state.cursor.getMonth() - 1);
    else if (state.view === 'week') state.cursor.setDate(state.cursor.getDate() - 7);
    else state.cursor.setDate(state.cursor.getDate() - 1);
    renderBoard();
  });
  document.getElementById('ecNext').addEventListener('click', function () {
    if (state.view === 'month' || state.view === 'agenda') state.cursor.setMonth(state.cursor.getMonth() + 1);
    else if (state.view === 'week') state.cursor.setDate(state.cursor.getDate() + 7);
    else state.cursor.setDate(state.cursor.getDate() + 1);
    renderBoard();
  });
  document.getElementById('ecToday').addEventListener('click', function () {
    state.cursor = new Date(state.today.getFullYear(), state.today.getMonth(), state.today.getDate());
    state.selectedDate = toISO(state.today);
    renderBoard();
  });
  document.getElementById('ecCreateBtn').addEventListener('click', function () { openModal('meetings'); });
  document.getElementById('ecDrawerClose').addEventListener('click', closeDrawer);
  document.getElementById('ecDrawerClose2').addEventListener('click', closeDrawer);
  els.drawerBackdrop.addEventListener('click', function (e) {
    if (e.target === els.drawerBackdrop) closeDrawer();
  });
  document.getElementById('ecModalClose').addEventListener('click', closeModal);
  document.getElementById('ecModalCancel').addEventListener('click', closeModal);
  els.modal.addEventListener('click', function (e) { if (e.target === els.modal) closeModal(); });

  document.getElementById('ecDrawerEdit').addEventListener('click', function () {
    var id = activeDrawerId;
    if (!id) return;
    closeDrawer();
    openModal(null, id);
  });
  document.getElementById('ecDrawerComplete').addEventListener('click', function () {
    var id = activeDrawerId;
    var ev = findEvent(id);
    if (!ev) return;
    ev.status = 'Completed';
    saveEvents();
    toast('Marked complete: ' + ev.title);
    closeDrawer();
    renderAll();
  });
  document.getElementById('ecDrawerDelete').addEventListener('click', function () {
    var id = activeDrawerId;
    if (!id) return;
    var ev = findEvent(id);
    if (!ev) return;
    if (!window.confirm('Delete "' + ev.title + '"?')) return;
    events = events.filter(function (e) { return e.id !== id; });
    saveEvents();
    toast('Deleted: ' + ev.title);
    closeDrawer();
    renderAll();
  });

  if (els.filterAssignee) {
    els.filterAssignee.addEventListener('change', function () {
      state.assignee = els.filterAssignee.value;
      renderAll();
    });
  }
  if (els.filterPriority) {
    els.filterPriority.addEventListener('change', function () {
      state.priority = els.filterPriority.value;
      renderAll();
    });
  }
  if (els.filterStatus) {
    els.filterStatus.addEventListener('change', function () {
      state.status = els.filterStatus.value;
      renderAll();
    });
  }
  if (els.dueOnly) {
    els.dueOnly.addEventListener('change', function () {
      state.dueOnly = els.dueOnly.checked;
      renderAll();
    });
  }
  if (els.hideDone) {
    els.hideDone.addEventListener('change', function () {
      state.hideDone = els.hideDone.checked;
      renderAll();
    });
  }

  var searchTimer = null;
  if (els.search) {
    els.search.addEventListener('input', function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function () {
        state.query = els.search.value;
        renderAll();
      }, 150);
    });
  }

  els.form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fd = new FormData(els.form);
    var title = String(fd.get('title') || '').trim();
    var date = String(fd.get('date') || '').trim();
    if (!title || !date) { toast('Please enter event name and date'); return; }
    var editId = els.form.getAttribute('data-edit-id');
    var cat = String(fd.get('category') || 'meetings');
    var time = String(fd.get('time') || '10:00');
    var payload = {
      title: title,
      date: date,
      time: time,
      end: time,
      category: cat,
      priority: String(fd.get('priority') || 'Medium'),
      status: String(fd.get('status') || 'Scheduled'),
      assignee: String(fd.get('assignee') || 'Unassigned'),
      project: String(fd.get('project') || ''),
      client: String(fd.get('client') || ''),
      module: MODULE_BY_CAT[cat] || 'TIME ERP',
      desc: String(fd.get('desc') || ''),
      notes: ''
    };
    if (cat === 'tasks' && /document|agreement|dsc|lease/i.test(title + ' ' + payload.desc)) {
      payload.module = 'Document Vault';
    }
    if (state.filters.indexOf(cat) === -1) state.filters.push(cat);

    var id = editId;
    if (editId) {
      var existing = findEvent(editId);
      if (existing) {
        Object.keys(payload).forEach(function (k) { existing[k] = payload[k]; });
        if (!existing.notes) existing.notes = '';
      }
    } else {
      id = 'e' + Date.now();
      payload.id = id;
      payload.notes = '';
      events.push(payload);
    }
    saveEvents();
    state.selectedDate = date;
    state.cursor = parseISO(date);
    if (state.view === 'agenda') state.view = 'month';
    document.querySelectorAll('.ec-view-btn').forEach(function (b) {
      var on = b.getAttribute('data-view') === state.view;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    closeModal();
    toast((editId ? 'Updated: ' : 'Event created: ') + title);
    renderAll();
    openDrawer(id);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeDrawer(); closeModal(); }
  });

  renderAll();
})();
