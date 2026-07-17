/**
 * TIME ERP — Employee Onboarding (onboarding.html) — UI only
 */
(function () {
  'use strict';

  var WORKFLOW = [
    'Offer Accepted', 'Employee Created', 'Documents Submitted', 'Verification',
    'Assets Assigned', 'IT Setup', 'Training', 'HR Orientation', 'Manager Introduction', 'Completed'
  ];

  var CHECKLIST = [
    'Personal Details', 'Emergency Contact', 'Identity Proof', 'Address', 'Resume',
    'Offer Letter', 'Appointment Letter', 'Education', 'Experience', 'Bank Details',
    'PF', 'ESI', 'Professional Tax', 'Nominee'
  ];

  var DOCUMENTS = ['Resume', 'Offer Letter', 'Appointment Letter', 'PAN', 'Aadhaar', 'Passport', 'Education', 'Experience', 'Bank'];
  var ASSETS = ['Laptop', 'Desktop', 'Monitor', 'Keyboard', 'Mouse', 'Headset', 'Mobile', 'SIM', 'ID Card', 'Access Card', 'Software License', 'Email', 'VPN'];
  var IT_ACCOUNTS = ['Company Email', 'ERP Login', 'HRMS Login', 'Attendance Device', 'Microsoft 365', 'Google Workspace', 'Slack', 'Teams', 'VPN'];
  var TRAINING = [
    { title: 'Welcome Session', trainer: 'HR Team', duration: '1 hr', date: '2026-07-11', status: 'scheduled' },
    { title: 'HR Orientation', trainer: 'Priya Mehta', duration: '2 hrs', date: '2026-07-11', status: 'scheduled' },
    { title: 'Department Orientation', trainer: 'Rahul Kapoor', duration: '1.5 hrs', date: '2026-07-12', status: 'pending' },
    { title: 'Security Training', trainer: 'IT Admin', duration: '45 min', date: '2026-07-12', status: 'pending' },
    { title: 'ERP Training', trainer: 'Admin', duration: '2 hrs', date: '2026-07-13', status: 'pending' },
    { title: 'Policy Training', trainer: 'HR Team', duration: '1 hr', date: '2026-07-13', status: 'pending' },
    { title: 'Team Introduction', trainer: 'Manager', duration: '30 min', date: '2026-07-14', status: 'pending' }
  ];

  var EMPLOYEES = [
    { id: 'EMP-101', name: 'Sana Khan', dept: 'Engineering', designation: 'QA Engineer', manager: 'Rahul Kapoor', location: 'Ghaziabad', joined: '2026-07-10', progress: 86, status: 'progress', stage: 6 },
    { id: 'EMP-102', name: 'Aditya Rao', dept: 'Design', designation: 'UI/UX Designer', manager: 'Sneha Reddy', location: 'Remote', joined: '2026-07-11', progress: 42, status: 'pending', stage: 3 },
    { id: 'EMP-103', name: 'Neha Verma', dept: 'Engineering', designation: 'Laravel Developer', manager: 'Rahul Kapoor', location: 'Ghaziabad', joined: '2026-07-12', progress: 18, status: 'pending', stage: 2 },
    { id: 'EMP-104', name: 'Manish Gupta', dept: 'Sales', designation: 'Sales Manager', manager: 'Karan Malhotra', location: 'Delhi NCR', joined: '2026-07-08', progress: 100, status: 'completed', stage: 9 },
    { id: 'EMP-105', name: 'Pooja Nair', dept: 'HR', designation: 'HR Executive', manager: 'Priya Mehta', location: 'Ghaziabad', joined: '2026-07-15', progress: 8, status: 'pending', stage: 1 },
    { id: 'EMP-106', name: 'Vivek Das', dept: 'Customer Success', designation: 'CS Executive', manager: 'Priya Mehta', location: 'Remote', joined: '2026-07-14', progress: 55, status: 'progress', stage: 5 }
  ];

  var ACTIVITIES = [
    { text: 'Employee created — Neha Verma', time: '2 hours ago', icon: 'user' },
    { text: 'Documents uploaded — Sana Khan', time: '5 hours ago', icon: 'doc' },
    { text: 'Verification completed — Manish Gupta', time: '1 day ago', icon: 'check' },
    { text: 'Laptop assigned — Sana Khan', time: '1 day ago', icon: 'asset' },
    { text: 'Email created — Aditya Rao', time: '2 days ago', icon: 'email' },
    { text: 'Training assigned — Sana Khan', time: '2 days ago', icon: 'train' },
    { text: 'Orientation completed — Manish Gupta', time: '3 days ago', icon: 'orient' },
    { text: 'Employee activated — Manish Gupta', time: '3 days ago', icon: 'active' }
  ];

  var state = {
    view: localStorage.getItem('onb-view') || 'grid',
    search: '',
    filters: { dept: '', designation: '', location: '', joined: '', manager: '', progress: '', status: '' },
    sort: { key: 'name', dir: 'asc' },
    selectedEmployee: null,
    checklistDone: { 'Personal Details': true, 'Emergency Contact': true, 'Identity Proof': true, 'Resume': true, 'Offer Letter': true }
  };

  function $(id) { return document.getElementById(id); }

  function toast(title, detail) {
    if (window.DashboardShell) DashboardShell.toast(title, detail || 'UI preview — connect backend when ready.');
  }

  function initials(name) {
    return name.split(' ').map(function (n) { return n[0]; }).join('').slice(0, 2).toUpperCase();
  }

  function statusBadge(s) {
    var map = { pending: 'pending', progress: 'progress', completed: 'completed', assigned: 'assigned', verified: 'verified' };
    return '<span class="onb-badge onb-badge--' + (map[s] || 'pending') + '">' + s + '</span>';
  }

  function animateCount(el, target, suffix) {
    if (!el) return;
    var dur = 800, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.textContent = Math.floor(target * p) + (suffix || '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function renderKpi() {
    var today = '2026-07-10';
    animateCount($('kpiToday'), EMPLOYEES.filter(function (e) { return e.joined === today; }).length);
    animateCount($('kpiPending'), EMPLOYEES.filter(function (e) { return e.status !== 'completed'; }).length);
    animateCount($('kpiCompleted'), EMPLOYEES.filter(function (e) { return e.status === 'completed'; }).length);
    animateCount($('kpiDocs'), 4);
    animateCount($('kpiAssets'), 3);
    animateCount($('kpiIt'), 2);
    animateCount($('kpiTraining'), 5);
    if ($('kpiRate')) $('kpiRate').textContent = '86%';
  }

  function getFiltered() {
    var q = state.search.toLowerCase();
    return EMPLOYEES.filter(function (e) {
      if (q && [e.name, e.id, e.dept, e.designation, e.manager].join(' ').toLowerCase().indexOf(q) === -1) return false;
      if (state.filters.dept && e.dept !== state.filters.dept) return false;
      if (state.filters.designation && e.designation !== state.filters.designation) return false;
      if (state.filters.location && e.location !== state.filters.location) return false;
      if (state.filters.manager && e.manager !== state.filters.manager) return false;
      if (state.filters.status && e.status !== state.filters.status) return false;
      if (state.filters.joined && e.joined < state.filters.joined) return false;
      if (state.filters.progress) {
        var min = parseInt(state.filters.progress, 10);
        if (e.progress < min) return false;
      }
      return true;
    }).sort(function (a, b) {
      var k = state.sort.key, av = (a[k] || '').toString().toLowerCase(), bv = (b[k] || '').toString().toLowerCase();
      if (av < bv) return state.sort.dir === 'asc' ? -1 : 1;
      if (av > bv) return state.sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  function populateFilters() {
    var uniq = function (key) {
      var s = {}; EMPLOYEES.forEach(function (e) { s[e[key]] = 1; }); return Object.keys(s).sort();
    };
    fillSelect('filterDept', uniq('dept'), 'All departments');
    fillSelect('filterDesignation', uniq('designation'), 'All designations');
    fillSelect('filterLocation', uniq('location'), 'All locations');
    fillSelect('filterManager', uniq('manager'), 'All managers');
    fillSelect('filterStatus', ['pending', 'progress', 'completed'], 'All statuses');
    fillSelect('filterProgress', ['25', '50', '75', '100'], 'All progress');
  }

  function fillSelect(id, options, placeholder) {
    var el = $(id);
    if (!el) return;
    el.innerHTML = '<option value="">' + placeholder + '</option>' +
      options.map(function (o) {
        var label = o;
        if (o === 'progress') label = 'In Progress';
        if (['25', '50', '75', '100'].indexOf(o) !== -1) label = o + '%+';
        return '<option value="' + o + '">' + label + '</option>';
      }).join('');
  }

  function progressBar(pct) {
    return '<div class="onb-progress__label"><span>Progress</span><span>' + pct + '%</span></div>' +
      '<div class="onb-progress"><div class="onb-progress__bar" style="width:' + pct + '%"></div></div>';
  }

  function cardActions(id) {
    return '<button type="button" data-ui="view" data-id="' + id + '">View</button>' +
      '<button type="button" data-ui="checklist" data-id="' + id + '">Checklist</button>' +
      '<button type="button" data-ui="documents" data-id="' + id + '">Documents</button>' +
      '<button type="button" data-ui="assets" data-id="' + id + '">Assets</button>' +
      '<button type="button" data-ui="training" data-id="' + id + '">Training</button>' +
      '<button type="button" data-ui="complete" data-id="' + id + '">Complete</button>';
  }

  function renderCards(list) {
    var wrap = $('onbCardView');
    if (!wrap) return;
    wrap.innerHTML = list.map(function (e) {
      return '<article class="onb-emp-card" data-id="' + e.id + '">' +
        '<div class="onb-emp-card__head">' +
        '<div class="onb-avatar-wrap"><div class="onb-avatar">' + initials(e.name) + '</div><span class="onb-status-dot"></span></div>' +
        '<div class="onb-emp-card__meta"><h3>' + e.name + '</h3><p>' + e.id + '</p></div>' +
        statusBadge(e.status) + '</div>' +
        '<div class="onb-emp-card__rows">' +
        row('Department', e.dept) + row('Designation', e.designation) + row('Joined', e.joined) +
        row('Manager', e.manager) + row('Location', e.location) + '</div>' +
        progressBar(e.progress) +
        '<div class="onb-emp-card__actions">' + cardActions(e.id) + '</div></article>';
    }).join('');
  }

  function row(l, v) { return '<div class="onb-emp-card__row"><span>' + l + '</span><span>' + v + '</span></div>'; }

  function renderTable(list) {
    var tbody = $('onbTableBody');
    if (!tbody) return;
    tbody.innerHTML = list.map(function (e) {
      return '<tr data-id="' + e.id + '">' +
        '<td><div class="onb-avatar">' + initials(e.name) + '</div></td>' +
        '<td><div class="onb-name-cell"><strong>' + e.name + '</strong><span>' + e.designation + '</span></div></td>' +
        '<td>' + e.id + '</td><td>' + e.dept + '</td><td>' + e.designation + '</td>' +
        '<td>' + e.manager + '</td><td>' + e.joined + '</td>' +
        '<td>' + e.progress + '%</td><td>' + statusBadge(e.status) + '</td>' +
        '<td><button type="button" class="onb-btn onb-btn--sm" data-ui="view" data-id="' + e.id + '">View</button></td></tr>';
    }).join('');
  }

  function renderWorkflow(activeStage) {
    var wrap = $('onbWorkflow');
    if (!wrap) return;
    wrap.innerHTML = WORKFLOW.map(function (label, i) {
      var cls = i < activeStage ? 'is-done' : (i === activeStage ? 'is-active' : '');
      return '<div class="onb-workflow__step ' + cls + '" title="' + label + '">' +
        '<div class="onb-workflow__circle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        (i < activeStage ? '<path d="M20 6L9 17l-5-5"/>' : '<circle cx="12" cy="12" r="4"/>') +
        '</svg></div><span class="onb-workflow__label">' + label + '</span>' +
        (i <= activeStage ? '<span class="onb-workflow__date">Jul ' + (8 + i) + '</span>' : '') +
        '</div>';
    }).join('');
  }

  function renderChecklist() {
    var wrap = $('onbChecklist');
    if (!wrap) return;
    var done = Object.keys(state.checklistDone).filter(function (k) { return state.checklistDone[k]; }).length;
    if ($('checklistStat')) $('checklistStat').textContent = done + ' / ' + CHECKLIST.length + ' completed';
    wrap.innerHTML = CHECKLIST.map(function (item) {
      var checked = state.checklistDone[item] ? ' checked' : '';
      var cls = state.checklistDone[item] ? ' is-done' : '';
      return '<label class="onb-checklist__item' + cls + '">' +
        '<input type="checkbox" class="onb-check" data-check="' + item + '"' + checked + '>' +
        '<span>' + item + '</span>' +
        '<span class="onb-checklist__stat">' + (state.checklistDone[item] ? 'Done' : 'Pending') + '</span></label>';
    }).join('');
  }

  function renderDocuments() {
    var wrap = $('onbDocuments');
    if (!wrap) return;
    wrap.innerHTML = DOCUMENTS.map(function (d) {
      var verified = ['Resume', 'Offer Letter', 'PAN'].indexOf(d) !== -1;
      return '<div class="onb-doc-card">' +
        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.75"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>' +
        '<strong>' + d + '</strong>' + (verified ? statusBadge('verified') : statusBadge('pending')) +
        '<div class="onb-doc-card__actions">' +
        '<button type="button" data-ui="preview">Preview</button>' +
        '<button type="button" data-ui="download">Download</button>' +
        '<button type="button" data-ui="upload">Upload</button></div></div>';
    }).join('');
  }

  function renderAssets() {
    var wrap = $('onbAssets');
    if (!wrap) return;
    var statuses = ['assigned', 'pending', 'assigned', 'assigned', 'pending', 'assigned', 'pending', 'assigned', 'assigned', 'assigned', 'pending', 'assigned', 'pending'];
    wrap.innerHTML = ASSETS.map(function (a, i) {
      return '<div class="onb-asset-card"><strong>' + a + '</strong>' + statusBadge(statuses[i] || 'pending') + '</div>';
    }).join('');
  }

  function renderIt() {
    var wrap = $('onbIt');
    if (!wrap) return;
    wrap.innerHTML = IT_ACCOUNTS.map(function (a, i) {
      var st = i < 4 ? 'assigned' : 'pending';
      return '<div class="onb-it-card"><h4>' + a + '</h4>' + statusBadge(st) +
        '<p>Owner: IT Admin</p><p>Assigned: ' + (st === 'assigned' ? '2026-07-09' : '—') + '</p></div>';
    }).join('');
  }

  function renderTraining() {
    var wrap = $('onbTraining');
    if (!wrap) return;
    wrap.innerHTML = TRAINING.map(function (t) {
      return '<article class="onb-training__card">' +
        '<div class="onb-training__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg></div>' +
        '<div class="onb-training__body"><h4>' + t.title + '</h4>' +
        '<p>Trainer: ' + t.trainer + ' · ' + t.duration + ' · ' + t.date + '</p>' +
        statusBadge(t.status === 'scheduled' ? 'assigned' : 'pending') + '</div></article>';
    }).join('');
  }

  function renderTimeline() {
    var icons = {
      user: '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>',
      doc: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>',
      check: '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',
      asset: '<rect x="2" y="3" width="20" height="14" rx="2"/>',
      email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
      train: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>',
      orient: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
      active: '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>'
    };
    var wrap = $('onbTimeline');
    if (!wrap) return;
    wrap.innerHTML = ACTIVITIES.map(function (a) {
      return '<div class="onb-timeline__item">' +
        '<div class="onb-timeline__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">' + (icons[a.icon] || icons.user) + '</svg></div>' +
        '<div class="onb-timeline__body"><strong>' + a.text + '</strong><span>' + a.time + '</span></div></div>';
    }).join('');
  }

  function renderCalendar() {
    var wrap = $('onbCalendar');
    if (!wrap) return;
    var groups = [
      { label: "Today's Joinings", ids: ['EMP-101'] },
      { label: 'Tomorrow', ids: ['EMP-102'] },
      { label: 'This Week', ids: ['EMP-103', 'EMP-105', 'EMP-106'] },
      { label: 'This Month', ids: ['EMP-104'] }
    ];
    wrap.innerHTML = groups.map(function (g) {
      return '<div class="onb-calendar__group"><h4>' + g.label + '</h4><div class="onb-calendar__items">' +
        g.ids.map(function (id) {
          var e = EMPLOYEES.filter(function (x) { return x.id === id; })[0];
          if (!e) return '';
          return '<div class="onb-calendar__chip"><div class="onb-avatar">' + initials(e.name) + '</div>' +
            '<span>' + e.name.split(' ')[0] + '</span>' +
            '<span style="font-size:10px;font-weight:600;color:var(--muted)">' + e.dept + '</span></div>';
        }).join('') + '</div></div>';
    }).join('');
  }

  function openDrawer(emp) {
    state.selectedEmployee = emp;
    var scrim = $('onbDrawerScrim');
    if (scrim) { scrim.classList.add('is-open'); scrim.setAttribute('aria-hidden', 'false'); }
    $('drawerTitle').textContent = emp.name;
    $('drawerSubtitle').textContent = emp.id + ' · ' + emp.designation;
    $('drawerBody').innerHTML =
      '<div style="display:flex;gap:16px;margin-bottom:20px;align-items:center">' +
      '<div class="onb-avatar" style="width:64px;height:64px;font-size:20px">' + initials(emp.name) + '</div>' +
      '<div>' + statusBadge(emp.status) + progressBar(emp.progress) + '</div></div>' +
      '<div class="onb-detail-grid">' +
      detailRow('Employee ID', emp.id) + detailRow('Department', emp.dept) +
      detailRow('Designation', emp.designation) + detailRow('Manager', emp.manager) +
      detailRow('Joining Date', emp.joined) + detailRow('Location', emp.location) +
      detailRow('Progress', emp.progress + '%') + '</div>' +
      '<h4 style="font-size:12px;font-weight:700;text-transform:uppercase;color:var(--muted);margin:20px 0 12px">Workflow Progress</h4>' +
      '<div class="onb-workflow-wrap" style="padding:12px"><div class="onb-workflow" id="drawerWorkflow"></div></div>';
    renderWorkflow(emp.stage);
    var wfMain = $('onbWorkflow');
    var wfDrawer = $('drawerWorkflow');
    if (wfMain && wfDrawer) wfDrawer.innerHTML = wfMain.innerHTML;
  }

  function detailRow(l, v) { return '<div class="onb-detail-row"><dt>' + l + '</dt><dd>' + v + '</dd></div>'; }

  function closeDrawer() {
    var scrim = $('onbDrawerScrim');
    if (scrim) { scrim.classList.remove('is-open'); scrim.setAttribute('aria-hidden', 'true'); }
    state.selectedEmployee = null;
  }

  function getEmployee(id) {
    for (var i = 0; i < EMPLOYEES.length; i++) if (EMPLOYEES[i].id === id) return EMPLOYEES[i];
    return null;
  }

  function render() {
    var list = getFiltered();
    var empty = $('onbEmpty');
    var content = $('onbContent');
    if (!list.length && (state.search || Object.keys(state.filters).some(function (k) { return state.filters[k]; }))) {
      if (empty) empty.hidden = false;
      if (content) content.hidden = true;
      return;
    }
    if (empty) empty.hidden = true;
    if (content) content.hidden = false;
    if (state.view === 'grid') renderCards(list);
    else renderTable(list);
    if ($('onbCardView')) $('onbCardView').hidden = state.view !== 'grid';
    if ($('onbTableView')) $('onbTableView').hidden = state.view !== 'table';
    document.querySelectorAll('.onb-view-toggle button').forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.view === state.view);
    });
    renderWorkflow(6);
  }

  function bindEvents() {
    $('onbSearch') && $('onbSearch').addEventListener('input', function (e) { state.search = e.target.value.trim(); render(); });
    var fmap = { filterDept: 'dept', filterDesignation: 'designation', filterLocation: 'location', filterJoined: 'joined', filterManager: 'manager', filterProgress: 'progress', filterStatus: 'status' };
    Object.keys(fmap).forEach(function (id) {
      var el = $(id);
      if (el) el.addEventListener('change', function (e) { state.filters[fmap[id]] = e.target.value; render(); });
    });
    $('filterReset') && $('filterReset').addEventListener('click', function () {
      state.search = ''; state.filters = { dept: '', designation: '', location: '', joined: '', manager: '', progress: '', status: '' };
      if ($('onbSearch')) $('onbSearch').value = '';
      document.querySelectorAll('.onb-filters select, .onb-filters input').forEach(function (el) { el.value = ''; });
      render();
    });
    document.querySelectorAll('.onb-view-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.view = btn.dataset.view;
        localStorage.setItem('onb-view', state.view);
        render();
      });
    });
    document.querySelectorAll('.onb-table th[data-sort]').forEach(function (th) {
      th.addEventListener('click', function () {
        var key = th.dataset.sort;
        if (state.sort.key === key) state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
        else { state.sort.key = key; state.sort.dir = 'asc'; }
        render();
      });
    });
    document.addEventListener('click', function (e) {
      var ui = e.target.closest('[data-ui]');
      if (ui) {
        e.preventDefault();
        var id = ui.dataset.id;
        var action = ui.dataset.ui;
        if (action === 'view' && id) openDrawer(getEmployee(id));
        else toast(action.replace(/-/g, ' '));
        return;
      }
      if (!e.target.closest('.onb-dropdown')) {
        document.querySelectorAll('.onb-dropdown.is-open').forEach(function (d) { d.classList.remove('is-open'); });
      }
    });
    document.addEventListener('change', function (e) {
      if (e.target.matches('[data-check]')) {
        state.checklistDone[e.target.dataset.check] = e.target.checked;
        renderChecklist();
      }
    });
    $('btnStart') && $('btnStart').addEventListener('click', function () { toast('Start Onboarding'); });
    $('btnExport') && $('btnExport').addEventListener('click', function () { toast('Export'); });
    $('btnRefresh') && $('btnRefresh').addEventListener('click', function () { renderKpi(); render(); toast('Refresh'); });
    $('emptyStart') && $('emptyStart').addEventListener('click', function () { toast('Start Onboarding'); });
    $('drawerClose') && $('drawerClose').addEventListener('click', closeDrawer);
    $('drawerClose2') && $('drawerClose2').addEventListener('click', closeDrawer);
    $('onbDrawerScrim') && $('onbDrawerScrim').addEventListener('click', function (e) {
      if (e.target === $('onbDrawerScrim')) closeDrawer();
    });
    document.querySelector('.onb-drawer') && document.querySelector('.onb-drawer').addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });
  }

  function init() {
    populateFilters();
    renderKpi();
    renderChecklist();
    renderDocuments();
    renderAssets();
    renderIt();
    renderTraining();
    renderTimeline();
    renderCalendar();
    if ($('progressRing')) { $('progressRing').style.setProperty('--pct', '86%'); $('progressRing').setAttribute('data-pct', '86%'); }
    bindEvents();
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
