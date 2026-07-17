/**
 * TIME ERP — Recruitment (recruitment.html) — UI only
 */
(function () {
  'use strict';

  var STAGES = [
    { id: 'applied', label: 'Applied', color: '#94a3b8' },
    { id: 'screening', label: 'Screening', color: '#3b82f6' },
    { id: 'shortlisted', label: 'Shortlisted', color: '#8b5cf6' },
    { id: 'technical', label: 'Technical Interview', color: '#f59e0b' },
    { id: 'hr', label: 'HR Interview', color: '#25b7a7' },
    { id: 'offer', label: 'Offer', color: '#eab308' },
    { id: 'hired', label: 'Hired', color: '#22c55e' },
    { id: 'rejected', label: 'Rejected', color: '#ef4444' }
  ];

  var CANDIDATES = [
    { id: 'C-001', name: 'Neha Verma', position: 'Laravel Developer', exp: '4 yrs', skills: ['Laravel', 'PHP', 'MySQL'], location: 'Ghaziabad', applied: '2026-07-01', stage: 'technical', status: 'active' },
    { id: 'C-002', name: 'Aditya Rao', position: 'UI/UX Designer', exp: '3 yrs', skills: ['Figma', 'UI', 'Prototyping'], location: 'Remote', applied: '2026-07-03', stage: 'screening', status: 'active' },
    { id: 'C-003', name: 'Pooja Nair', position: 'HR Executive', exp: '2 yrs', skills: ['HR Ops', 'Payroll'], location: 'Delhi NCR', applied: '2026-06-28', stage: 'shortlisted', status: 'active' },
    { id: 'C-004', name: 'Manish Gupta', position: 'Sales Manager', exp: '6 yrs', skills: ['B2B', 'CRM'], location: 'Ghaziabad', applied: '2026-06-25', stage: 'hr', status: 'active' },
    { id: 'C-005', name: 'Sana Khan', position: 'QA Engineer', exp: '3 yrs', skills: ['Selenium', 'API'], location: 'Remote', applied: '2026-07-05', stage: 'applied', status: 'active' },
    { id: 'C-006', name: 'Ritesh Malhotra', position: 'Laravel Developer', exp: '5 yrs', skills: ['Laravel', 'Vue', 'AWS'], location: 'Delhi NCR', applied: '2026-06-20', stage: 'offer', status: 'offer' },
    { id: 'C-007', name: 'Isha Patel', position: 'Marketing Lead', exp: '7 yrs', skills: ['SEO', 'Content'], location: 'Ghaziabad', applied: '2026-06-18', stage: 'hired', status: 'active' },
    { id: 'C-008', name: 'Kunal Shah', position: 'Accountant', exp: '4 yrs', skills: ['Tally', 'GST'], location: 'Ghaziabad', applied: '2026-06-15', stage: 'rejected', status: 'rejected' },
    { id: 'C-009', name: 'Anjali Mehta', position: 'UI/UX Designer', exp: '2 yrs', skills: ['Figma', 'Design Systems'], location: 'Remote', applied: '2026-07-06', stage: 'applied', status: 'active' },
    { id: 'C-010', name: 'Vivek Das', position: 'CS Executive', exp: '3 yrs', skills: ['Support', 'CRM'], location: 'Delhi NCR', applied: '2026-07-02', stage: 'screening', status: 'active' }
  ];

  var JOBS = [
    { id: 'J-001', title: 'Laravel Developer', dept: 'Engineering', location: 'Ghaziabad', type: 'Full-time', open: 2, applications: 18, manager: 'Rahul Kapoor', closing: '2026-08-15', status: 'open' },
    { id: 'J-002', title: 'UI/UX Designer', dept: 'Design', location: 'Remote', type: 'Full-time', open: 1, applications: 24, manager: 'Sneha Reddy', closing: '2026-08-01', status: 'open' },
    { id: 'J-003', title: 'HR Executive', dept: 'HR', location: 'Ghaziabad', type: 'Full-time', open: 1, applications: 12, manager: 'Priya Mehta', closing: '2026-07-30', status: 'urgent' },
    { id: 'J-004', title: 'Sales Manager', dept: 'Sales', location: 'Delhi NCR', type: 'Full-time', open: 1, applications: 9, manager: 'Karan Malhotra', closing: '2026-07-20', status: 'closed' }
  ];

  var INTERVIEWS = [
    { candidate: 'Neha Verma', position: 'Laravel Developer', interviewer: 'Rahul Kapoor', date: '2026-07-11', time: '10:30 AM', mode: 'Video Call', status: 'scheduled' },
    { candidate: 'Manish Gupta', position: 'Sales Manager', interviewer: 'Priya Mehta', date: '2026-07-11', time: '2:00 PM', mode: 'In-person', status: 'scheduled' },
    { candidate: 'Aditya Rao', position: 'UI/UX Designer', interviewer: 'Sneha Reddy', date: '2026-07-12', time: '11:00 AM', mode: 'Video Call', status: 'scheduled' },
    { candidate: 'Ritesh Malhotra', position: 'Laravel Developer', interviewer: 'Admin', date: '2026-07-10', time: '4:30 PM', mode: 'Phone', status: 'completed' }
  ];

  var ACTIVITIES = [
    { type: 'apply', text: 'Sana Khan applied for QA Engineer', time: '2 hours ago' },
    { type: 'interview', text: 'Interview scheduled for Neha Verma', time: '5 hours ago' },
    { type: 'offer', text: 'Offer sent to Ritesh Malhotra', time: '1 day ago' },
    { type: 'hired', text: 'Isha Patel marked as hired', time: '2 days ago' },
    { type: 'reject', text: 'Kunal Shah application rejected', time: '3 days ago' }
  ];

  var state = {
    search: '',
    filters: { position: '', dept: '', stage: '', exp: '', location: '', type: '', applied: '' }
  };

  function $(id) { return document.getElementById(id); }

  function toast(title, detail) {
    if (window.DashboardShell) DashboardShell.toast(title, detail);
  }

  function initials(name) {
    return name.split(' ').map(function (n) { return n[0]; }).join('').slice(0, 2).toUpperCase();
  }

  function stageLabel(id) {
    for (var i = 0; i < STAGES.length; i++) if (STAGES[i].id === id) return STAGES[i].label;
    return id;
  }

  function statusBadge(status) {
    var map = { active: 'active', open: 'open', closed: 'closed', urgent: 'urgent', scheduled: 'scheduled', completed: 'completed', rejected: 'rejected', offer: 'offer' };
    return '<span class="rec-badge rec-badge--' + (map[status] || 'active') + '">' + status + '</span>';
  }

  function getFilteredCandidates() {
    var q = state.search.toLowerCase();
    return CANDIDATES.filter(function (c) {
      if (q && [c.name, c.position, c.skills.join(' '), c.location, c.id].join(' ').toLowerCase().indexOf(q) === -1) return false;
      if (state.filters.position && c.position !== state.filters.position) return false;
      if (state.filters.dept) {
        var job = JOBS.filter(function (j) { return j.title === c.position; })[0];
        if (!job || job.dept !== state.filters.dept) return false;
      }
      if (state.filters.stage && c.stage !== state.filters.stage) return false;
      if (state.filters.location && c.location !== state.filters.location) return false;
      if (state.filters.applied && c.applied < state.filters.applied) return false;
      return true;
    });
  }

  function animateCount(el, target) {
    if (!el) return;
    var dur = 800, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.textContent = String(Math.floor(target * p));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function renderKpi() {
    animateCount($('kpiJobs'), JOBS.filter(function (j) { return j.status === 'open' || j.status === 'urgent'; }).length);
    animateCount($('kpiApplicants'), CANDIDATES.length);
    animateCount($('kpiInterviews'), INTERVIEWS.filter(function (i) { return i.status === 'scheduled'; }).length);
    animateCount($('kpiShortlisted'), CANDIDATES.filter(function (c) { return c.stage === 'shortlisted'; }).length);
    animateCount($('kpiOffers'), CANDIDATES.filter(function (c) { return c.stage === 'offer'; }).length);
    animateCount($('kpiHired'), CANDIDATES.filter(function (c) { return c.stage === 'hired'; }).length);
  }

  function populateFilters() {
    var positions = {}, depts = {}, locations = {};
    JOBS.forEach(function (j) { depts[j.dept] = 1; });
    CANDIDATES.forEach(function (c) { positions[c.position] = 1; locations[c.location] = 1; });
    fillSelect('filterPosition', Object.keys(positions).sort(), 'All positions');
    fillSelect('filterDept', Object.keys(depts).sort(), 'All departments');
    fillSelect('filterStage', STAGES.map(function (s) { return s.id; }), 'All stages', true);
    fillSelect('filterLocation', Object.keys(locations).sort(), 'All locations');
    fillSelect('filterType', ['Full-time', 'Contract', 'Internship'], 'All types');
    fillSelect('filterExp', ['1 yr', '2 yrs', '3 yrs', '4 yrs', '5 yrs', '6 yrs', '7 yrs'], 'All experience');
  }

  function fillSelect(id, options, placeholder, isStage) {
    var el = $(id);
    if (!el) return;
    el.innerHTML = '<option value="">' + placeholder + '</option>' +
      options.map(function (o) {
        var label = isStage ? stageLabel(o) : o;
        return '<option value="' + o + '">' + label + '</option>';
      }).join('');
  }

  function renderKanban(list) {
    var board = $('recKanban');
    if (!board) return;
    board.innerHTML = STAGES.map(function (stage) {
      var cards = list.filter(function (c) { return c.stage === stage.id; });
      return '<div class="rec-kanban__col" data-stage="' + stage.id + '">' +
        '<div class="rec-kanban__col-head">' +
        '<span class="rec-kanban__dot" style="background:' + stage.color + '"></span>' +
        '<h3>' + stage.label + '</h3>' +
        '<span class="rec-kanban__count">' + cards.length + '</span></div>' +
        '<div class="rec-kanban__cards">' +
        cards.map(function (c) { return candidateCard(c); }).join('') +
        '</div></div>';
    }).join('');
  }

  function candidateCard(c) {
    return '<article class="rec-candidate-card" data-id="' + c.id + '" tabindex="0" aria-label="' + c.name + '">' +
      '<div class="rec-candidate-card__top">' +
      '<div class="rec-avatar">' + initials(c.name) + '</div>' +
      '<div class="rec-candidate-card__meta"><h4>' + c.name + '</h4><p>' + c.position + '</p></div>' +
      statusBadge(c.status) + '</div>' +
      '<div class="rec-candidate-card__skills">' + c.skills.map(function (s) {
        return '<span class="rec-skill">' + s + '</span>';
      }).join('') + '</div>' +
      '<div class="rec-candidate-card__foot"><span>' + c.exp + ' · ' + c.location + '</span><span>' + c.applied + '</span></div></article>';
  }

  function renderJobs() {
    var wrap = $('recJobs');
    if (!wrap) return;
    wrap.innerHTML = JOBS.map(function (j) {
      return '<article class="rec-job-card">' +
        '<div class="rec-job-card__head"><div><h3>' + j.title + '</h3><p>' + j.dept + '</p></div>' + statusBadge(j.status) + '</div>' +
        '<div class="rec-job-card__rows">' +
        row('Location', j.location) + row('Type', j.type) + row('Open Positions', j.open) +
        row('Applications', j.applications) + row('Hiring Manager', j.manager) + row('Closing Date', j.closing) +
        '</div><div class="rec-job-card__actions">' +
        '<button type="button" class="rec-btn rec-btn--sm" data-ui="view-candidates" data-id="' + j.id + '">View Candidates</button>' +
        '<button type="button" class="rec-btn rec-btn--sm" data-ui="edit-job" data-id="' + j.id + '">Edit Job</button></div></article>';
    }).join('');
  }

  function row(label, val) {
    return '<div class="rec-job-card__row"><span>' + label + '</span><span>' + val + '</span></div>';
  }

  function actionMenu(id) {
    return '<div class="rec-dropdown" data-menu="' + id + '">' +
      '<button type="button" data-ui="view-profile" data-id="' + id + '">View Profile</button>' +
      '<button type="button" data-ui="schedule" data-id="' + id + '">Schedule Interview</button>' +
      '<button type="button" data-ui="move-stage" data-id="' + id + '">Move Stage</button>' +
      '<button type="button" data-ui="download" data-id="' + id + '">Download Resume</button></div>';
  }

  function renderApplicants(list) {
    var tbody = $('recTableBody');
    if (!tbody) return;
    tbody.innerHTML = list.slice(0, 8).map(function (c) {
      return '<tr data-id="' + c.id + '">' +
        '<td><div class="rec-avatar">' + initials(c.name) + '</div></td>' +
        '<td><div class="rec-name-cell"><strong>' + c.name + '</strong><span>' + c.id + '</span></div></td>' +
        '<td>' + c.position + '</td><td>' + c.exp + '</td><td>' + c.location + '</td>' +
        '<td>' + c.applied + '</td><td>' + stageLabel(c.stage) + '</td>' +
        '<td>' + statusBadge(c.status) + '</td>' +
        '<td style="position:relative"><button type="button" class="rec-action-btn" data-menu-toggle="' + c.id + '" aria-label="Actions">⋯</button>' +
        actionMenu(c.id) + '</td></tr>';
    }).join('');
  }

  function renderInterviews() {
    var wrap = $('recInterviews');
    if (!wrap) return;
    wrap.innerHTML = INTERVIEWS.map(function (iv) {
      var d = new Date(iv.date);
      var day = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      return '<article class="rec-interview-card">' +
        '<div class="rec-interview-card__time"><strong>' + day.split(' ')[0] + '</strong><span>' + day.split(' ')[1] + '</span></div>' +
        '<div class="rec-interview-card__body"><h4>' + iv.candidate + '</h4>' +
        '<p>' + iv.position + '</p>' +
        '<div class="rec-interview-card__meta">' +
        '<span>👤 ' + iv.interviewer + '</span><span>🕐 ' + iv.time + '</span>' +
        '<span>📹 ' + iv.mode + '</span>' + statusBadge(iv.status) +
        '</div></div></article>';
    }).join('');
  }

  function activityIcon(type) {
    var icons = {
      apply: '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>',
      interview: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
      offer: '<path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>',
      hired: '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',
      reject: '<path d="M18 6L6 18M6 6l12 12"/>'
    };
    return icons[type] || icons.apply;
  }

  function renderTimeline() {
    var wrap = $('recTimeline');
    if (!wrap) return;
    wrap.innerHTML = ACTIVITIES.map(function (a) {
      return '<div class="rec-timeline__item">' +
        '<div class="rec-timeline__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">' + activityIcon(a.type) + '</svg></div>' +
        '<div class="rec-timeline__body"><strong>' + a.text + '</strong><span>' + a.time + '</span></div></div>';
    }).join('');
  }

  function render() {
    var list = getFilteredCandidates();
    var empty = $('recEmpty');
    var content = $('recContent');
    var hasData = list.length > 0 || !state.search && !Object.keys(state.filters).some(function (k) { return state.filters[k]; });

    if (!hasData && list.length === 0) {
      if (empty) empty.hidden = false;
      if (content) content.hidden = true;
      return;
    }
    if (empty) empty.hidden = true;
    if (content) content.hidden = false;

    renderKanban(list);
    renderApplicants(list);
  }

  function uiToast(action, id) {
    var labels = {
      'create-job': 'Create Job Opening',
      export: 'Export',
      refresh: 'Refresh',
      'view-candidates': 'View Candidates',
      'edit-job': 'Edit Job',
      'view-profile': 'View Profile',
      schedule: 'Schedule Interview',
      'move-stage': 'Move Stage',
      download: 'Download Resume',
      'quick-job': 'Create Job',
      'quick-candidate': 'Add Candidate',
      'quick-interview': 'Schedule Interview',
      'quick-offer': 'Generate Offer',
      'quick-export': 'Export Applicants'
    };
    toast(labels[action] || action, 'UI preview — connect backend when ready.');
  }

  function bindEvents() {
    $('recSearch') && $('recSearch').addEventListener('input', function (e) {
      state.search = e.target.value.trim();
      render();
    });

    var filterMap = {
      filterPosition: 'position', filterDept: 'dept', filterStage: 'stage',
      filterExp: 'exp', filterLocation: 'location', filterType: 'type', filterApplied: 'applied'
    };
    Object.keys(filterMap).forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener('change', function (e) {
        state.filters[filterMap[id]] = e.target.value;
        render();
      });
    });

    $('filterReset') && $('filterReset').addEventListener('click', function () {
      state.search = '';
      state.filters = { position: '', dept: '', stage: '', exp: '', location: '', type: '', applied: '' };
      if ($('recSearch')) $('recSearch').value = '';
      document.querySelectorAll('.rec-filters select, .rec-filters input').forEach(function (el) { el.value = ''; });
      render();
    });

    document.addEventListener('click', function (e) {
      var ui = e.target.closest('[data-ui]');
      if (ui) {
        e.preventDefault();
        uiToast(ui.dataset.ui, ui.dataset.id);
        return;
      }

      var menuBtn = e.target.closest('[data-menu-toggle]');
      if (menuBtn) {
        e.stopPropagation();
        var id = menuBtn.dataset.menuToggle;
        document.querySelectorAll('.rec-dropdown.is-open').forEach(function (d) { d.classList.remove('is-open'); });
        var menu = document.querySelector('[data-menu="' + id + '"]');
        if (menu) menu.classList.add('is-open');
        return;
      }

      if (!e.target.closest('.rec-dropdown')) {
        document.querySelectorAll('.rec-dropdown.is-open').forEach(function (d) { d.classList.remove('is-open'); });
      }
    });

    $('btnCreateJob') && $('btnCreateJob').addEventListener('click', function () { uiToast('create-job'); });
    $('btnExport') && $('btnExport').addEventListener('click', function () { uiToast('export'); });
    $('btnRefresh') && $('btnRefresh').addEventListener('click', function () { renderKpi(); render(); uiToast('refresh'); });
    $('emptyCreateJob') && $('emptyCreateJob').addEventListener('click', function () { uiToast('create-job'); });
  }

  function init() {
    populateFilters();
    renderKpi();
    renderJobs();
    renderInterviews();
    renderTimeline();
    bindEvents();
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
