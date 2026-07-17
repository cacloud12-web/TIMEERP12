/**
 * TIME ERP — Attendance (attendance.html) — UI only
 */
(function () {
  'use strict';

  var EMPLOYEES = [
    { id: 'EMP-001', name: 'Ananya Sharma', initials: 'AS', dept: 'Engineering', designation: 'Senior Developer', manager: 'Rahul Kapoor', shift: 'General', checkIn: '09:02', checkOut: '18:18', breakTime: '0:35', hours: '8:41', overtime: '0:41', status: 'present', location: 'Ghaziabad', device: 'Biometric', attendancePct: 96, leaveBalance: 8 },
    { id: 'EMP-002', name: 'Rahul Kapoor', initials: 'RK', dept: 'Engineering', designation: 'Engineering Manager', manager: 'Admin', shift: 'General', checkIn: '08:55', checkOut: '18:40', breakTime: '0:40', hours: '9:05', overtime: '1:05', status: 'present', location: 'Remote', device: 'Web', attendancePct: 98, leaveBalance: 12 },
    { id: 'EMP-003', name: 'Priya Mehta', initials: 'PM', dept: 'HR', designation: 'HR Manager', manager: 'Admin', shift: 'Morning', checkIn: '09:28', checkOut: '18:05', breakTime: '0:30', hours: '8:07', overtime: '0:00', status: 'late', location: 'Ghaziabad', device: 'Biometric', attendancePct: 92, leaveBalance: 6 },
    { id: 'EMP-004', name: 'Vikram Singh', initials: 'VS', dept: 'Sales', designation: 'Sales Executive', manager: 'Meera Iyer', shift: 'General', checkIn: '—', checkOut: '—', breakTime: '—', hours: '—', overtime: '—', status: 'field', location: 'Delhi NCR', device: 'Mobile', attendancePct: 88, leaveBalance: 4 },
    { id: 'EMP-005', name: 'Sneha Reddy', initials: 'SR', dept: 'Design', designation: 'UI Designer', manager: 'Rahul Kapoor', shift: 'General', checkIn: '—', checkOut: '—', breakTime: '—', hours: '—', overtime: '—', status: 'leave', location: 'Remote', device: '—', attendancePct: 94, leaveBalance: 2 },
    { id: 'EMP-006', name: 'Amit Joshi', initials: 'AJ', dept: 'Engineering', designation: 'Backend Developer', manager: 'Rahul Kapoor', shift: 'Night', checkIn: '21:05', checkOut: '—', breakTime: '0:20', hours: '5:10', overtime: '0:00', status: 'present', location: 'Ghaziabad', device: 'Biometric', attendancePct: 91, leaveBalance: 9 },
    { id: 'EMP-007', name: 'Kavita Nair', initials: 'KN', dept: 'Finance', designation: 'Accountant', manager: 'Admin', shift: 'Morning', checkIn: '—', checkOut: '—', breakTime: '—', hours: '—', overtime: '—', status: 'absent', location: 'Ghaziabad', device: '—', attendancePct: 85, leaveBalance: 5 },
    { id: 'EMP-008', name: 'Rohan Das', initials: 'RD', dept: 'Engineering', designation: 'QA Engineer', manager: 'Rahul Kapoor', shift: 'General', checkIn: '09:00', checkOut: '13:00', breakTime: '0:15', hours: '3:45', overtime: '0:00', status: 'halfday', location: 'Ghaziabad', device: 'Biometric', attendancePct: 90, leaveBalance: 7 },
    { id: 'EMP-009', name: 'Meera Iyer', initials: 'MI', dept: 'Marketing', designation: 'Marketing Lead', manager: 'Admin', shift: 'General', checkIn: '09:10', checkOut: '18:00', breakTime: '0:45', hours: '8:05', overtime: '0:05', status: 'remote', location: 'Remote', device: 'Web', attendancePct: 97, leaveBalance: 10 },
    { id: 'EMP-010', name: 'Arjun Patel', initials: 'AP', dept: 'Sales', designation: 'Field Executive', manager: 'Meera Iyer', shift: 'Custom', checkIn: '10:15', checkOut: '—', breakTime: '—', hours: '6:20', overtime: '0:00', status: 'field', location: 'Noida', device: 'Mobile GPS', attendancePct: 86, leaveBalance: 3 },
    { id: 'EMP-011', name: 'Divya Krishnan', initials: 'DK', dept: 'HR', designation: 'HR Executive', manager: 'Priya Mehta', shift: 'Morning', checkIn: '09:05', checkOut: '17:55', breakTime: '0:30', hours: '8:20', overtime: '0:00', status: 'present', location: 'Ghaziabad', device: 'Biometric', attendancePct: 95, leaveBalance: 11 },
    { id: 'EMP-012', name: 'Karan Malhotra', initials: 'KM', dept: 'Engineering', designation: 'DevOps', manager: 'Rahul Kapoor', shift: 'General', checkIn: '09:42', checkOut: '18:30', breakTime: '0:25', hours: '8:23', overtime: '0:23', status: 'late', location: 'Remote', device: 'Web', attendancePct: 89, leaveBalance: 6 }
  ];

  var REQUESTS = [
    { id: 'AR-101', type: 'Missed Punch', employee: 'Kavita Nair', reason: 'Biometric device offline at entry', date: '2026-07-09', status: 'pending' },
    { id: 'AR-102', type: 'Attendance Regularization', employee: 'Priya Mehta', reason: 'Client meeting delayed check-in', date: '2026-07-08', status: 'pending' },
    { id: 'AR-103', type: 'Late Arrival', employee: 'Karan Malhotra', reason: 'Traffic due to metro disruption', date: '2026-07-10', status: 'pending' },
    { id: 'AR-104', type: 'Early Exit', employee: 'Rohan Das', reason: 'Medical appointment', date: '2026-07-07', status: 'approved' },
    { id: 'AR-105', type: 'Forgot Check Out', employee: 'Amit Joshi', reason: 'System logout after night shift', date: '2026-07-06', status: 'pending' }
  ];

  var SHIFTS = [
    { name: 'Morning Shift', timing: '07:00 – 15:30', hours: '8.0 hrs', assigned: 18, status: 'active' },
    { name: 'General Shift', timing: '09:00 – 18:00', hours: '8.5 hrs', assigned: 64, status: 'active' },
    { name: 'Night Shift', timing: '21:00 – 05:30', hours: '8.0 hrs', assigned: 12, status: 'active' },
    { name: 'Custom Shift', timing: 'Flexible / Field', hours: 'Variable', assigned: 9, status: 'active' }
  ];

  var LIVE = [
    { label: 'Currently Working', count: 48, desc: 'Checked in & active' },
    { label: 'On Break', count: 6, desc: 'Break out in progress' },
    { label: 'Checked Out', count: 22, desc: 'Completed for today' },
    { label: 'Remote Employees', count: 14, desc: 'Working from home' },
    { label: 'Field Employees', count: 8, desc: 'On site / client visit' },
    { label: 'Idle Employees', count: 3, desc: 'No activity > 45 min' }
  ];

  var ACTIVITY = [
    { text: 'Ananya Sharma checked in', time: 'Today · 09:02 AM' },
    { text: 'Late arrival approved for Priya Mehta', time: 'Today · 10:15 AM' },
    { text: 'Missed punch corrected — Kavita Nair', time: 'Today · 11:40 AM' },
    { text: 'Night shift assigned to Amit Joshi', time: 'Yesterday · 06:20 PM' },
    { text: 'Attendance report exported (Excel)', time: 'Yesterday · 05:05 PM' },
    { text: 'Attendance approved — Early exit Rohan Das', time: 'Jul 7 · 04:30 PM' }
  ];

  var HOLIDAYS = [
    { id: 'HOL-01', title: 'Independence Day', detail: 'Fri, Aug 15', type: 'holiday', days: 36, note: 'National holiday · Office closed' },
    { id: 'HOL-02', title: 'Weekly Off', detail: 'Sat–Sun', type: 'weekend', days: 1, note: 'Recurring weekend off' },
    { id: 'HOL-03', title: 'Ganesh Chaturthi', detail: 'Thu, Aug 27', type: 'festival', days: 48, note: 'Festival holiday · Optional WFH' },
    { id: 'HOL-04', title: 'Company Foundation Day', detail: 'Mon, Sep 14', type: 'holiday', days: 66, note: 'Company holiday · Team event' }
  ];

  var TIMELINE_DEMO = [
    { time: '09:02', text: 'Check In', detail: 'Biometric · Gate A' },
    { time: '12:55', text: 'Break Out', detail: 'Cafeteria' },
    { time: '13:30', text: 'Break In', detail: 'Biometric · Floor 2' },
    { time: '18:18', text: 'Check Out', detail: 'Biometric · Gate A' }
  ];

  var state = {
    sortKey: 'name',
    sortDir: 1,
    filters: { q: '', dept: '', designation: '', manager: '', status: '', shift: '', location: '', date: '' },
    role: 'admin',
    calMonth: 6,
    calYear: 2026,
    selected: null,
    bulk: false,
    section: 'overview',
    punch: { status: 'out', startedAt: null, breakStartedAt: null, workedMs: 0, lastIn: null }
  };

  var ROLE_ACTIONS = {
    admin: ['Mark Attendance', 'Export Report', 'Attendance Settings', 'Bulk Approval'],
    hr: ['Mark Attendance', 'Export Report', 'Attendance Settings'],
    manager: ['Approve Requests', 'Export Report', 'Team Attendance'],
    employee: ['Mark Attendance', 'My Requests', 'Regularize']
  };

  function $(id) { return document.getElementById(id); }
  function toast(title, detail) {
    if (window.DashboardShell) DashboardShell.toast(title, detail || 'UI preview — connect backend when ready.');
  }

  function badge(status) {
    var key = String(status || '').toLowerCase().replace(/\s+/g, '');
    if (key === 'halfday') key = 'halfday';
    return '<span class="att-badge att-badge--' + key + '">' + status + '</span>';
  }

  function animateCount(el, target, suffix) {
    if (!el) return;
    var num = Number(target) || 0, t0 = null, dur = 900;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(num * eased) + (suffix || '');
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = num + (suffix || '');
    }
    requestAnimationFrame(step);
  }

  function getFiltered() {
    return EMPLOYEES.filter(function (e) {
      var q = state.filters.q.toLowerCase();
      if (q) {
        var blob = [e.name, e.id, e.dept, e.designation, e.manager, e.location].join(' ').toLowerCase();
        if (blob.indexOf(q) === -1) return false;
      }
      if (state.filters.dept && e.dept !== state.filters.dept) return false;
      if (state.filters.designation && e.designation !== state.filters.designation) return false;
      if (state.filters.manager && e.manager !== state.filters.manager) return false;
      if (state.filters.status && e.status !== state.filters.status) return false;
      if (state.filters.shift && e.shift !== state.filters.shift) return false;
      if (state.filters.location && e.location !== state.filters.location) return false;
      return true;
    }).sort(function (a, b) {
      var ka = String(a[state.sortKey] || '');
      var kb = String(b[state.sortKey] || '');
      if (ka < kb) return -1 * state.sortDir;
      if (ka > kb) return 1 * state.sortDir;
      return 0;
    });
  }

  function renderKpi() {
    var total = EMPLOYEES.length;
    var present = EMPLOYEES.filter(function (e) { return e.status === 'present' || e.status === 'remote' || e.status === 'field'; }).length;
    var absent = EMPLOYEES.filter(function (e) { return e.status === 'absent'; }).length;
    var leave = EMPLOYEES.filter(function (e) { return e.status === 'leave'; }).length;
    var late = EMPLOYEES.filter(function (e) { return e.status === 'late'; }).length;
    var remote = EMPLOYEES.filter(function (e) { return e.status === 'remote'; }).length;
    var field = EMPLOYEES.filter(function (e) { return e.status === 'field'; }).length;
    var pending = REQUESTS.filter(function (r) { return r.status === 'pending'; }).length;
    var pct = Math.round((present / total) * 100);
    animateCount($('kpiTotal'), 128);
    animateCount($('kpiPresent'), present + 42);
    animateCount($('kpiAbsent'), absent + 3);
    animateCount($('kpiLeave'), leave + 5);
    animateCount($('kpiLate'), late + 4);
    animateCount($('kpiRemote'), remote + 8);
    animateCount($('kpiField'), field + 4);
    animateCount($('kpiHours'), 8, '.4h');
    animateCount($('kpiPending'), pending);
    animateCount($('kpiPct'), pct, '%');
  }

  function renderTable() {
    var list = getFiltered();
    var body = $('attTableBody');
    var empty = $('attTableEmpty');
    var skel = $('attTableSkel');
    if (!body) return;
    if (skel) skel.classList.add('is-hidden');
    if (!list.length) {
      body.innerHTML = '';
      if (empty) empty.classList.remove('is-hidden');
      return;
    }
    if (empty) empty.classList.add('is-hidden');
    body.innerHTML = list.map(function (e) {
      return '<tr data-id="' + e.id + '">' +
        '<td><label class="att-check"><input type="checkbox" data-bulk-id="' + e.id + '" aria-label="Select ' + e.name + '"></label></td>' +
        '<td><div class="att-table__emp">' +
        '<button type="button" class="att-avatar" data-preview="' + e.id + '" aria-label="Preview ' + e.name + '">' + e.initials + '</button>' +
        '<div><strong>' + e.name + '</strong><div style="font-size:11px;color:var(--muted)">' + e.id + '</div></div></div></td>' +
        '<td>' + e.id + '</td><td>' + e.dept + '</td><td>' + e.designation + '</td><td>' + e.manager + '</td>' +
        '<td>' + e.shift + '</td><td>' + e.checkIn + '</td><td>' + e.checkOut + '</td><td>' + e.breakTime + '</td>' +
        '<td>' + e.hours + '</td><td>' + e.overtime + '</td><td>' + badge(e.status) + '</td>' +
        '<td>' + e.location + '</td><td>' + e.device + '</td>' +
        '<td class="att-table__actions">' +
        '<button type="button" class="att-btn att-btn--sm" data-action="timeline" data-id="' + e.id + '">Timeline</button>' +
        '<button type="button" class="att-btn att-btn--sm" data-action="regularize" data-id="' + e.id + '">Regularize</button>' +
        '</td></tr>';
    }).join('');
  }

  function dayType(day) {
    var d = new Date(state.calYear, state.calMonth, day);
    var wd = d.getDay();
    if (wd === 0 || wd === 6) return 'weekend';
    if (day === 15) return 'holiday';
    if (day % 11 === 0) return 'absent';
    if (day % 7 === 0) return 'leave';
    if (day % 5 === 0) return 'late';
    return 'present';
  }

  function renderCalendar() {
    var wrap = $('attCalendar');
    var label = $('attCalLabel');
    if (!wrap) return;
    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    if (label) label.textContent = monthNames[state.calMonth] + ' ' + state.calYear;
    var first = new Date(state.calYear, state.calMonth, 1).getDay();
    var days = new Date(state.calYear, state.calMonth + 1, 0).getDate();
    var today = 10;
    var html = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(function (d) {
      return '<div class="att-calendar__dow">' + d + '</div>';
    }).join('');
    for (var i = 0; i < first; i++) html += '<div class="att-calendar__day is-muted" aria-hidden="true"></div>';
    for (var day = 1; day <= days; day++) {
      var type = dayType(day);
      var isToday = day === today;
      html += '<button type="button" class="att-calendar__day' + (isToday ? ' is-today' : '') + '" data-day="' + day + '" aria-label="' + day + ' ' + type + '">' +
        '<div class="att-calendar__num">' + day + '</div>' +
        '<div class="att-calendar__dots"><i class="att-calendar__dot att-calendar__dot--' + type + '"></i></div></button>';
    }
    wrap.innerHTML = html;
  }

  function renderRequests() {
    var wrap = $('attRequests');
    if (!wrap) return;
    var list = REQUESTS;
    if (!list.length) {
      wrap.innerHTML = '<div class="att-empty"><strong>No Requests</strong><p>No pending attendance requests.</p></div>';
      return;
    }
    wrap.innerHTML = list.map(function (r) {
      return '<article class="att-req-card"><div class="att-req-card__head"><strong>' + r.type + '</strong>' + badge(r.status) + '</div>' +
        '<div class="att-req-card__meta">' +
        '<div><span>Employee</span><b>' + r.employee + '</b></div>' +
        '<div><span>Submitted</span><b>' + r.date + '</b></div>' +
        '<div><span>Reason</span><b>' + r.reason + '</b></div>' +
        '<div><span>ID</span><b>' + r.id + '</b></div></div>' +
        '<div class="att-req-card__actions">' +
        (r.status === 'pending'
          ? '<button type="button" class="att-btn att-btn--sm att-btn--success" data-ui="approve-req" data-id="' + r.id + '">Approve</button>' +
            '<button type="button" class="att-btn att-btn--sm att-btn--danger" data-ui="reject-req" data-id="' + r.id + '">Reject</button>'
          : '') +
        '<button type="button" class="att-btn att-btn--sm" data-ui="view-req" data-id="' + r.id + '">View Details</button>' +
        '</div></article>';
    }).join('');
  }

  function renderShifts() {
    var wrap = $('attShifts');
    if (!wrap) return;
    wrap.innerHTML = SHIFTS.map(function (s) {
      return '<article class="att-shift-card"><div class="att-info-card__head"><h3>' + s.name + '</h3>' + badge(s.status) + '</div>' +
        '<p><strong>' + s.timing + '</strong><br>Working hours: ' + s.hours + '<br>Employees assigned: ' + s.assigned + '</p></article>';
    }).join('');
  }

  function renderLive() {
    var wrap = $('attLive');
    if (!wrap) return;
    wrap.innerHTML = LIVE.map(function (l) {
      return '<button type="button" class="att-live__card" data-section-jump="register">' +
        '<strong>' + l.label + '</strong><div class="att-live__count" data-live-count="' + l.count + '">0</div><span>' + l.desc + '</span></button>';
    }).join('');
    wrap.querySelectorAll('[data-live-count]').forEach(function (el) {
      animateCount(el, el.getAttribute('data-live-count'));
    });
    renderPresence();
    renderActivity();
  }

  function renderPresence() {
    var wrap = $('attPresence');
    if (!wrap) return;
    var active = EMPLOYEES.filter(function (e) {
      return e.status === 'present' || e.status === 'remote' || e.status === 'field' || e.status === 'late' || e.status === 'halfday';
    });
    wrap.innerHTML = active.map(function (e) {
      return '<button type="button" class="att-presence__row" data-action="timeline" data-id="' + e.id + '">' +
        '<span class="att-avatar" aria-hidden="true">' + e.initials + '</span>' +
        '<span class="att-presence__meta"><strong>' + e.name + '</strong><span>' + e.dept + ' · ' + e.status + '</span></span>' +
        '<span class="att-presence__time">' + (e.checkIn !== '—' ? e.checkIn : '—') + '</span></button>';
    }).join('');
  }

  function renderActivity() {
    var wrap = $('attActivity');
    if (!wrap) return;
    wrap.innerHTML = ACTIVITY.slice(0, 6).map(function (a, i) {
      return '<button type="button" class="att-timeline__item att-timeline__btn" data-ui="activity-item" data-idx="' + i + '">' +
        '<strong>' + a.text + '</strong><span>' + a.time + '</span></button>';
    }).join('');
  }

  function formatClock(d) {
    var h = String(d.getHours()).padStart(2, '0');
    var m = String(d.getMinutes()).padStart(2, '0');
    var s = String(d.getSeconds()).padStart(2, '0');
    return h + ':' + m + ':' + s;
  }

  function formatDuration(ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    var h = String(Math.floor(total / 3600)).padStart(2, '0');
    var m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    var s = String(total % 60).padStart(2, '0');
    return h + ':' + m + ':' + s;
  }

  function currentWorkedMs() {
    var p = state.punch;
    var base = p.workedMs || 0;
    if (p.status === 'in' && p.startedAt) base += Date.now() - p.startedAt;
    return base;
  }

  function renderPunch() {
    var p = state.punch;
    var statusEl = $('punchStatus');
    var meta = $('punchMeta');
    var elapsed = $('punchElapsed');
    var btnIn = $('btnPunchIn');
    var btnBreak = $('btnPunchBreak');
    var btnOut = $('btnPunchOut');
    var labels = { out: 'Checked out', in: 'Checked in', break: 'On break' };
    if (statusEl) {
      statusEl.textContent = labels[p.status] || 'Checked out';
      statusEl.className = 'att-punch__status is-' + p.status;
    }
    if (meta) {
      if (p.status === 'out' && !p.lastIn) meta.textContent = 'Not punched in yet · General shift';
      else if (p.status === 'out') meta.textContent = 'Last punch out recorded · Ready for next day';
      else if (p.status === 'break') meta.textContent = 'Break started · resume when ready';
      else meta.textContent = 'Punched in at ' + (p.lastIn || '—') + ' · General shift';
    }
    if (elapsed) elapsed.textContent = formatDuration(currentWorkedMs());
    if (btnIn) btnIn.disabled = p.status !== 'out';
    if (btnBreak) btnBreak.disabled = p.status !== 'in' && p.status !== 'break';
    if (btnOut) btnOut.disabled = p.status === 'out';
    if (btnBreak) btnBreak.textContent = p.status === 'break' ? 'Resume' : 'Break';
  }

  function setPunch(action) {
    var p = state.punch;
    var now = new Date();
    var stamp = formatClock(now).slice(0, 5);
    if (action === 'in') {
      p.status = 'in';
      p.startedAt = Date.now();
      p.lastIn = stamp;
      ACTIVITY.unshift({ text: 'You punched in', time: 'Today · ' + stamp });
      toast('Punched in', 'Check-in recorded at ' + stamp);
    } else if (action === 'break') {
      if (p.status === 'in') {
        p.workedMs = currentWorkedMs();
        p.startedAt = null;
        p.status = 'break';
        p.breakStartedAt = Date.now();
        ACTIVITY.unshift({ text: 'You started a break', time: 'Today · ' + stamp });
        toast('Break started', 'Timer paused at ' + stamp);
      } else if (p.status === 'break') {
        p.status = 'in';
        p.startedAt = Date.now();
        p.breakStartedAt = null;
        ACTIVITY.unshift({ text: 'You resumed from break', time: 'Today · ' + stamp });
        toast('Back from break', 'Work timer resumed');
      }
    } else if (action === 'out') {
      if (p.status === 'in') p.workedMs = currentWorkedMs();
      p.status = 'out';
      p.startedAt = null;
      p.breakStartedAt = null;
      ACTIVITY.unshift({ text: 'You punched out', time: 'Today · ' + stamp });
      toast('Punched out', 'Total worked ' + formatDuration(p.workedMs));
    }
    renderPunch();
    renderActivity();
  }

  function tickClocks() {
    if ($('punchElapsed') && state.punch.status === 'in') {
      $('punchElapsed').textContent = formatDuration(currentWorkedMs());
    }
  }

  function updateNavMeta() {
    var pending = REQUESTS.filter(function (r) { return r.status === 'pending'; }).length;
    var count = $('navReqCount');
    if (count) {
      count.textContent = pending ? String(pending) : '';
      count.setAttribute('data-empty', pending ? '0' : '1');
    }
  }

  function renderSnap() {
    var present = EMPLOYEES.filter(function (e) { return e.status === 'present' || e.status === 'remote' || e.status === 'field' || e.status === 'late'; }).length;
    var absent = EMPLOYEES.filter(function (e) { return e.status === 'absent'; }).length;
    var pending = REQUESTS.filter(function (r) { return r.status === 'pending'; }).length;
    var pct = Math.round((present / EMPLOYEES.length) * 100);
    if ($('snapPresent')) $('snapPresent').textContent = String(present);
    if ($('snapAbsent')) $('snapAbsent').textContent = String(absent);
    if ($('snapPending')) $('snapPending').textContent = String(pending);
    if ($('snapPct')) $('snapPct').textContent = pct + '%';
    updateNavMeta();
  }

  function renderRoleBar() {
    var mark = $('btnMark');
    var settings = $('btnSettings');
    if (mark) mark.style.display = state.role === 'manager' ? 'none' : '';
    if (settings) settings.style.display = (state.role === 'admin' || state.role === 'hr') ? '' : 'none';
  }

  function fillFilters() {
    function unique(key) {
      var map = {};
      EMPLOYEES.forEach(function (e) { if (e[key]) map[e[key]] = 1; });
      return Object.keys(map).sort();
    }
    function fill(id, values) {
      var el = $(id);
      if (!el) return;
      values.forEach(function (v) {
        var opt = document.createElement('option');
        opt.value = v; opt.textContent = v;
        el.appendChild(opt);
      });
    }
    fill('filterDept', unique('dept'));
    fill('filterDesignation', unique('designation'));
    fill('filterManager', unique('manager'));
    fill('filterStatus', ['present', 'absent', 'late', 'halfday', 'leave', 'remote', 'field']);
    fill('filterShift', unique('shift'));
    fill('filterLocation', unique('location'));
  }

  function openTimeline(id) {
    var e = EMPLOYEES.find(function (x) { return x.id === id; });
    if (!e) return;
    state.selected = e;
    var body = $('attDrawerBody');
    var title = $('attDrawerTitle');
    if (title) title.textContent = e.name;
    if (body) {
      body.innerHTML =
        '<section class="att-modal__section"><div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">' +
        '<div class="att-avatar" style="width:52px;height:52px;font-size:14px">' + e.initials + '</div>' +
        '<div><strong style="font-size:15px;color:var(--heading)">' + e.name + '</strong><div style="font-size:12px;color:var(--muted)">' + e.dept + ' · ' + e.designation + '</div></div></div>' +
        '<div class="att-modal__grid">' +
        '<div><span>Manager</span><b>' + e.manager + '</b></div><div><span>Status</span><b>' + badge(e.status) + '</b></div>' +
        '<div><span>Working Hours</span><b>' + e.hours + '</b></div><div><span>Overtime</span><b>' + e.overtime + '</b></div>' +
        '<div><span>GPS Location</span><b>' + e.location + '</b></div><div><span>Device</span><b>' + e.device + '</b></div>' +
        '<div><span>Remarks</span><b>On-time punch verified</b></div></div></section>' +
        '<section class="att-modal__section"><h3>Timeline</h3><div class="att-timeline">' +
        TIMELINE_DEMO.map(function (t) {
          return '<div class="att-timeline__item"><strong>' + t.time + ' · ' + t.text + '</strong><span>' + t.detail + '</span></div>';
        }).join('') + '</div></section>';
    }
    var modal = $('attDrawer');
    if (modal) { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); }
  }

  function closeModal(id) {
    var modal = $(id);
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function openSettings() {
    var modal = $('attSettings');
    if (modal) { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); }
  }

  function openDayDetails(day) {
    var type = dayType(day);
    toast('Attendance · ' + day + ' Jul 2026', 'Status pattern: ' + type);
  }

  function showPreview(id, anchor) {
    var e = EMPLOYEES.find(function (x) { return x.id === id; });
    var tip = $('attPreview');
    if (!e || !tip || !anchor) return;
    tip.innerHTML = '<strong>' + e.name + '</strong>' +
      '<div><span>Department</span><b>' + e.dept + '</b></div>' +
      '<div><span>Designation</span><b>' + e.designation + '</b></div>' +
      '<div><span>Manager</span><b>' + e.manager + '</b></div>' +
      '<div><span>Attendance %</span><b>' + e.attendancePct + '%</b></div>' +
      '<div><span>Today</span><b>' + e.status + '</b></div>' +
      '<div><span>Leave Balance</span><b>' + e.leaveBalance + ' days</b></div>';
    var rect = anchor.getBoundingClientRect();
    tip.style.left = Math.min(rect.left, window.innerWidth - 260) + 'px';
    tip.style.top = (rect.bottom + 8 + windowYOffset) + 'px';
    tip.classList.add('is-open');
  }

  function hidePreview() {
    var tip = $('attPreview');
    if (tip) tip.classList.remove('is-open');
  }

  function ripple(e, el) {
    var rect = el.getBoundingClientRect();
    var span = document.createElement('span');
    span.className = 'att-ripple';
    var size = Math.max(rect.width, rect.height);
    span.style.width = span.style.height = size + 'px';
    span.style.left = (e.clientX - rect.left - size / 2) + 'px';
    span.style.top = (e.clientY - rect.top - size / 2) + 'px';
    el.appendChild(span);
    setTimeout(function () { span.remove(); }, 500);
  }

  function syncFilters() {
    state.filters.q = ($('filterQ') && $('filterQ').value) || '';
    state.filters.dept = ($('filterDept') && $('filterDept').value) || '';
    state.filters.designation = ($('filterDesignation') && $('filterDesignation').value) || '';
    state.filters.manager = ($('filterManager') && $('filterManager').value) || '';
    state.filters.status = ($('filterStatus') && $('filterStatus').value) || '';
    state.filters.shift = ($('filterShift') && $('filterShift').value) || '';
    state.filters.location = ($('filterLocation') && $('filterLocation').value) || '';
    state.filters.date = ($('filterDate') && $('filterDate').value) || '';
    renderTable();
  }

  function resolveRequest(id, nextStatus) {
    var req = REQUESTS.find(function (r) { return r.id === id; });
    if (!req || req.status !== 'pending') return;
    req.status = nextStatus;
    ACTIVITY.unshift({
      text: (nextStatus === 'approved' ? 'Approved' : 'Rejected') + ' · ' + req.type + ' — ' + req.employee,
      time: 'Today · just now'
    });
    renderRequests();
    renderSnap();
    renderActivity();
    renderKpi();
    toast(nextStatus === 'approved' ? 'Request approved' : 'Request rejected', req.employee + ' · ' + req.id);
  }

  function openSection(name, opts) {
    if (!name) return;
    opts = opts || {};
    var valid = ['overview', 'live', 'register', 'requests', 'calendar', 'shifts', 'analytics'];
    if (valid.indexOf(name) === -1) name = 'overview';
    if (state.section === name && !opts.force) {
      ensureActiveTabVisible();
      return;
    }
    state.section = name;

    document.querySelectorAll('.att-section').forEach(function (panel) {
      var on = panel.getAttribute('data-panel') === name;
      panel.classList.toggle('is-active', on);
      if (on) {
        panel.removeAttribute('hidden');
        panel.setAttribute('aria-hidden', 'false');
      } else {
        panel.setAttribute('hidden', '');
        panel.setAttribute('aria-hidden', 'true');
      }
    });

    document.querySelectorAll('#attSecTabs [data-section]').forEach(function (btn) {
      var on = btn.getAttribute('data-section') === name;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
      btn.tabIndex = on ? 0 : -1;
    });

    if (name === 'live') renderLive();
    else if (name === 'register') renderTable();
    else if (name === 'requests') renderRequests();
    else if (name === 'calendar') renderCalendar();
    else if (name === 'shifts') renderShifts();

    try {
      if (history.replaceState) history.replaceState(null, '', '#' + name);
    } catch (err) { /* ignore */ }

    ensureActiveTabVisible();

    if (opts.scroll === false) return;
    requestAnimationFrame(function () {
      var main = document.querySelector('.main');
      var nav = $('attSecNav');
      if (!main || !nav) return;
      var mainTop = main.getBoundingClientRect().top;
      var navTop = nav.getBoundingClientRect().top;
      if (navTop < mainTop + 4) {
        var next = main.scrollTop + (navTop - mainTop) - 4;
        main.scrollTo({ top: Math.max(0, next), behavior: opts.instant ? 'auto' : 'smooth' });
      }
    });
  }

  function ensureActiveTabVisible() {
    var tabs = $('attSecTabs');
    var active = tabs && tabs.querySelector('.att-secnav__btn.is-active');
    if (!tabs || !active) return;
    var left = active.offsetLeft - 12;
    var right = active.offsetLeft + active.offsetWidth + 12;
    if (left < tabs.scrollLeft) tabs.scrollTo({ left: left, behavior: 'smooth' });
    else if (right > tabs.scrollLeft + tabs.clientWidth) {
      tabs.scrollTo({ left: right - tabs.clientWidth, behavior: 'smooth' });
    }
  }

  function focusSectionTab(name) {
    var btn = document.querySelector('#attSecTabs [data-section="' + name + '"]');
    if (btn) btn.focus();
  }

  function moveSection(delta) {
    var valid = ['overview', 'live', 'register', 'requests', 'calendar', 'shifts', 'analytics'];
    var idx = valid.indexOf(state.section);
    if (idx < 0) idx = 0;
    var next = valid[(idx + delta + valid.length) % valid.length];
    openSection(next, { scroll: false });
    focusSectionTab(next);
  }

  function bind() {
    document.querySelectorAll('.att-btn, .att-quick__card').forEach(function (btn) {
      btn.addEventListener('click', function (e) { ripple(e, btn); });
    });

    ['filterQ','filterDept','filterDesignation','filterManager','filterStatus','filterShift','filterLocation','filterDate','filterDateTo'].forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener('input', syncFilters);
      el.addEventListener('change', syncFilters);
    });

    $('btnResetFilters') && $('btnResetFilters').addEventListener('click', function () {
      state.filters = { q: '', dept: '', designation: '', manager: '', status: '', shift: '', location: '', date: '' };
      ['filterQ','filterDept','filterDesignation','filterManager','filterStatus','filterShift','filterLocation','filterDate','filterDateTo'].forEach(function (id) {
        if ($(id)) $(id).value = '';
      });
      renderTable();
      toast('Filters reset');
    });

    document.querySelectorAll('.att-table th[data-sort]').forEach(function (th) {
      th.addEventListener('click', function () {
        var key = th.getAttribute('data-sort');
        if (state.sortKey === key) state.sortDir *= -1;
        else { state.sortKey = key; state.sortDir = 1; }
        renderTable();
      });
    });

    document.addEventListener('click', function (e) {
      var actionBtn = e.target.closest('[data-action]');
      if (actionBtn) {
        var id = actionBtn.getAttribute('data-id');
        var action = actionBtn.getAttribute('data-action');
        if (action === 'timeline') openTimeline(id);
        else if (action === 'regularize') toast('Regularize', id);
        return;
      }
      var dayBtn = e.target.closest('[data-day]');
      if (dayBtn) { openDayDetails(Number(dayBtn.getAttribute('data-day'))); return; }
      var uiBtn = e.target.closest('[data-ui]');
      if (uiBtn) {
        var ui = uiBtn.getAttribute('data-ui');
        if (ui === 'approve-req') resolveRequest(uiBtn.getAttribute('data-id'), 'approved');
        else if (ui === 'reject-req') resolveRequest(uiBtn.getAttribute('data-id'), 'rejected');
        else if (ui === 'settings') openSettings();
        else if (ui === 'mark') { setPunch(state.punch.status === 'out' ? 'in' : 'out'); }
        else if (ui === 'punch-in') setPunch('in');
        else if (ui === 'punch-break') setPunch('break');
        else if (ui === 'punch-out') setPunch('out');
        else if (ui === 'export-excel') toast('Export Excel');
        else if (ui === 'export-csv') toast('Export CSV');
        else if (ui === 'export-pdf') toast('Export PDF');
        else if (ui === 'print') toast('Print');
        else if (ui === 'retry') { renderAll(); toast('Retry', 'Attendance reloaded'); }
        else if (ui === 'goto-requests') openSection('requests', { scroll: false });
        else if (ui === 'goto-shifts') openSection('shifts', { scroll: false });
        else if (ui === 'refresh-activity') {
          renderActivity();
          toast('Activity refreshed', 'Latest attendance events loaded');
        }
        else if (ui === 'activity-item') {
          var idx = Number(uiBtn.getAttribute('data-idx'));
          var act = ACTIVITY[idx];
          if (act) toast(act.text, act.time);
        }
        else if (ui === 'view-req') toast('Request details', uiBtn.getAttribute('data-id'));
        else toast(ui.replace(/-/g, ' '));
        return;
      }
      var jump = e.target.closest('[data-section-jump]');
      if (jump) {
        var target = jump.getAttribute('data-section-jump');
        var statusFilter = jump.getAttribute('data-filter-status');
        openSection(target, { scroll: false });
        if (statusFilter && target === 'register') {
          state.filters.status = statusFilter;
          var statusEl = $('filterStatus');
          if (statusEl) statusEl.value = statusFilter;
          renderTable();
          toast('Filtered register', statusFilter);
        }
        return;
      }
      var secBtn = e.target.closest('#attSecTabs [data-section]');
      if (secBtn) {
        openSection(secBtn.getAttribute('data-section'), { scroll: false });
        return;
      }
    });

    var tabs = $('attSecTabs');
    if (tabs) {
      tabs.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          moveSection(e.key === 'ArrowRight' ? 1 : -1);
        } else if (e.key === 'Home') {
          e.preventDefault();
          openSection('overview', { scroll: false });
          focusSectionTab('overview');
        } else if (e.key === 'End') {
          e.preventDefault();
          openSection('analytics', { scroll: false });
          focusSectionTab('analytics');
        }
      });
    }

    window.addEventListener('hashchange', function () {
      var hash = (location.hash || '').replace('#', '');
      if (hash) openSection(hash, { scroll: false, force: true });
    });

    document.addEventListener('mouseover', function (e) {
      var av = e.target.closest('[data-preview]');
      if (av) showPreview(av.getAttribute('data-preview'), av);
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('[data-preview]')) hidePreview();
    });

    $('btnMark') && $('btnMark').addEventListener('click', function () {
      openSection('overview', { scroll: false });
      setPunch(state.punch.status === 'out' ? 'in' : 'out');
    });
    $('btnExport') && $('btnExport').addEventListener('click', function () { toast('Export Report'); });
    $('btnSettings') && $('btnSettings').addEventListener('click', openSettings);
    $('btnCalPrev') && $('btnCalPrev').addEventListener('click', function () {
      state.calMonth--; if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
      renderCalendar();
    });
    $('btnCalNext') && $('btnCalNext').addEventListener('click', function () {
      state.calMonth++; if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
      renderCalendar();
    });

    $('attDrawerClose') && $('attDrawerClose').addEventListener('click', function () { closeModal('attDrawer'); });
    $('attDrawerClose2') && $('attDrawerClose2').addEventListener('click', function () { closeModal('attDrawer'); });
    $('attSettingsClose') && $('attSettingsClose').addEventListener('click', function () { closeModal('attSettings'); });
    $('attSettingsCancel') && $('attSettingsCancel').addEventListener('click', function () { closeModal('attSettings'); });
    $('attSettingsSave') && $('attSettingsSave').addEventListener('click', function () {
      closeModal('attSettings');
      toast('Settings saved', 'Attendance policies updated (UI only)');
    });

    ['attDrawer', 'attSettings'].forEach(function (id) {
      var modal = $(id);
      if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(id); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeModal('attDrawer'); closeModal('attSettings'); hidePreview(); }
    });

    $('btnBulkToggle') && $('btnBulkToggle').addEventListener('click', function () {
      state.bulk = !state.bulk;
      var bar = $('attBulkBar');
      if (bar) bar.classList.toggle('is-hidden', !state.bulk);
      toast(state.bulk ? 'Bulk mode on' : 'Bulk mode off');
    });
  }

  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.att-reveal').forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.att-reveal').forEach(function (el) { obs.observe(el); });
  }

  function renderAll() {
    renderKpi();
    renderTable();
    renderCalendar();
    renderRequests();
    renderShifts();
    renderLive();
    renderSnap();
    renderPunch();
    renderRoleBar();
    tickClocks();
  }

  function init() {
    var hash = (location.hash || '').replace('#', '');
    if (hash) state.section = hash;
    fillFilters();
    var skel = $('attTableSkel');
    if (skel) skel.classList.remove('is-hidden');
    setTimeout(function () {
      renderAll();
      bind();
      openSection(state.section, { scroll: false, force: true });
      initReveal();
      setInterval(tickClocks, 1000);
    }, 350);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
