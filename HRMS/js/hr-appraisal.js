/**
 * TIME ERP — Appraisal — HR (admin tabs)
 */
(function () {
  'use strict';

  var CAL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>';
  var EMPTY_ICON = '<div class="ap-empty__icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M10 28l6-8h32l6 8"/><path d="M10 28h44v22a4 4 0 01-4 4H14a4 4 0 01-4-4V28z"/><path d="M10 28h14l4 6h12l4-6h14"/></svg></div>';

  var DESIGNATIONS = ['Manager', 'Senior Associate', 'Associate', 'Executive', 'Team Lead', 'Analyst'];
  var TEAMS = ['Accounts', 'Audit', 'Tax', 'HR', 'IT', 'Sales'];
  var EMPLOYEES = [
    'Tarun Gaur', 'Suhanshi Rawat', 'SONIYA KASHYAP', 'Dev Aggarwal',
    'Kamal Kant Sharma', 'Kuldeep Tyagi', 'Saurabh Bhardwaj', 'Priya Mehta'
  ];

  var REPORT_PILLS = [
    { id: 'all', label: 'All employees' },
    { id: 'team', label: 'Team' },
    { id: 'designation', label: 'Designation' },
    { id: 'top', label: 'Top' },
    { id: 'retain', label: 'Retain' },
    { id: 'increment', label: 'Increment' },
    { id: 'promotion', label: 'Promotion' },
    { id: 'pip', label: 'PIP' }
  ];

  var state = {
    tab: 'kra',
    checkedIn: true,
    kraForm: { name: '', status: 'Draft', designations: '', description: '' },
    kraList: [
      { id: 1, name: 'Delivery Quality', status: 'Active', designations: 'Manager', description: 'Ensure timely and accurate deliverables to clients.' },
      { id: 2, name: 'Client Satisfaction', status: 'Active', designations: 'Senior Associate', description: 'Maintain strong client relationships and feedback scores.' },
      { id: 3, name: 'Timeliness', status: 'Active', designations: 'Associate', description: 'Meet deadlines and turnaround times consistently.' },
      { id: 4, name: 'Technical Excellence', status: 'Draft', designations: 'Analyst', description: 'Demonstrate deep technical knowledge and quality output.' },
      { id: 5, name: 'Team Collaboration', status: 'Active', designations: 'Team Lead', description: 'Work effectively across teams and support colleagues.' },
      { id: 6, name: 'Compliance Adherence', status: 'Active', designations: 'Executive', description: 'Follow regulatory and internal compliance standards.' },
      { id: 7, name: 'Revenue Growth', status: 'Inactive', designations: 'Manager', description: 'Contribute to firm revenue through upselling and retention.' }
    ],
    kraPage: { page: 1, size: 10 },
    cycleForm: {
      name: '', start: '', end: '', fy: 'FY 26-27',
      allEmployees: false, teams: '', designations: ''
    },
    cycles: [
      {
        id: 1, name: 'ITR', start: '2026-08-11', end: '2026-08-31', fy: 'FY 26-27',
        scope: 'All employees', employees: 13, status: 'Draft'
      }
    ],
    cyclePage: { page: 1, size: 10 },
    assign: {
      cycleId: 1,
      unassigned: '',
      bulkKras: [],
      bulkWeight: 0,
      employeeId: '',
      indKras: [],
      selected: {}
    },
    dash: { cycle: '', status: '' },
    dashPage: { page: 1, size: 10 },
    appraisals: [
      { id: 1, employee: 'Kamal Kant Sharma', cycle: 'ITR', cycleId: 1, self: '—', manager: '—', final: '—', status: 'self', statusLabel: 'Self pending' },
      { id: 2, employee: 'Dev Aggarwal', cycle: 'ITR', cycleId: 1, self: '4.5', manager: '4.3', final: '—', status: 'manager', statusLabel: 'Manager review' },
      { id: 3, employee: 'Priya Mehta', cycle: 'ITR', cycleId: 1, self: '3.8', manager: '4.0', final: '3.9', status: 'hr', statusLabel: 'HR review' },
      { id: 4, employee: 'Tarun Gaur', cycle: 'ITR', cycleId: 1, self: '4.6', manager: '4.5', final: '4.55', status: 'done', statusLabel: 'Completed' },
      { id: 5, employee: 'SONIYA KASHYAP', cycle: 'ITR', cycleId: 1, self: '4.1', manager: '4.2', final: '4.15', status: 'done', statusLabel: 'Completed' },
      { id: 6, employee: 'Kuldeep Tyagi', cycle: 'ITR', cycleId: 1, self: '—', manager: '—', final: '—', status: 'self', statusLabel: 'Self pending' },
      { id: 7, employee: 'Saurabh Bhardwaj', cycle: 'ITR', cycleId: 1, self: '3.9', manager: '—', final: '—', status: 'self', statusLabel: 'Self pending' },
      { id: 8, employee: 'Suhanshi Rawat', cycle: 'ITR', cycleId: 1, self: '4.0', manager: '3.8', final: '—', status: 'manager', statusLabel: 'Manager review' }
    ],
    finalizeId: '',
    scores: { self: 40, manager: 60 },
    reports: { cycle: '', pill: 'all' },
    reportsPage: { page: 1, size: 10 },
    reportRows: [
      { id: 1, employee: 'Tarun Gaur', cycle: 'ITR', cycleId: 1, self: '4.6', manager: '4.5', final: '4.55', recommendation: 'Promotion', team: 'Tax', designation: 'Senior Associate' },
      { id: 2, employee: 'SONIYA KASHYAP', cycle: 'ITR', cycleId: 1, self: '4.1', manager: '4.2', final: '4.15', recommendation: 'Increment', team: 'Audit', designation: 'Associate' },
      { id: 3, employee: 'Kamal Kant Sharma', cycle: 'ITR', cycleId: 1, self: '4.3', manager: '4.4', final: '4.35', recommendation: 'Retain', team: 'Accounts', designation: 'Manager' },
      { id: 4, employee: 'Priya Mehta', cycle: 'ITR', cycleId: 1, self: '3.2', manager: '3.0', final: '3.1', recommendation: 'PIP', team: 'HR', designation: 'Executive' },
      { id: 5, employee: 'Dev Aggarwal', cycle: 'ITR', cycleId: 1, self: '4.8', manager: '4.7', final: '4.75', recommendation: 'Promotion', team: 'IT', designation: 'Team Lead' }
    ],
    nextKraId: 8,
    nextCycleId: 2
  };

  var root = document.getElementById('apDynamic');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.ap-tab'));
  var topCheckIn = document.getElementById('apTopCheckInBtn');
  var topClock = document.getElementById('apTopClock');

  function toast(title, detail) {
    if (window.DashboardShell && window.DashboardShell.toast) {
      window.DashboardShell.toast(title, detail || '');
      return;
    }
    var stack = document.getElementById('toastStack');
    if (!stack) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + (detail || '') + '</span>';
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 2800);
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tickClock() {
    if (!topClock) return;
    var d = new Date();
    topClock.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes());
    topClock.setAttribute('datetime', d.toISOString());
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function optionsHtml(items, selected, placeholder) {
    var html = '<option value="">' + escapeHtml(placeholder || 'Select') + '</option>';
    items.forEach(function (item) {
      var val = typeof item === 'object' ? item.value : item;
      var label = typeof item === 'object' ? item.label : item;
      html += '<option value="' + escapeHtml(val) + '"' + (String(selected) === String(val) ? ' selected' : '') + '>' + escapeHtml(label) + '</option>';
    });
    return html;
  }

  function statusBadge(status) {
    var cls = 'ap-badge--draft';
    if (status === 'Active') cls = 'ap-badge--active';
    else if (status === 'Inactive') cls = 'ap-badge--inactive';
    return '<span class="ap-badge ' + cls + '">' + escapeHtml(status) + '</span>';
  }

  function emptyState(msg) {
    return '<div class="ap-empty">' + EMPTY_ICON + '<p>' + escapeHtml(msg || 'No data') + '</p></div>';
  }

  function paginationHtml(cfg, total, key) {
    var pages = Math.max(1, Math.ceil(total / cfg.size) || 1);
    var page = Math.min(cfg.page, pages);
    var shown = total === 0 ? '0/0' : (Math.min(cfg.size, total) + '/' + total);
    return '<footer class="ap-pagination" aria-label="Table pagination">' +
      '<div class="ap-pagination__left">' +
      '<label class="ap-sr-only" for="apPageSize_' + key + '">Rows per page</label>' +
      '<select id="apPageSize_' + key + '" class="ap-page-size" data-page-size="' + key + '" aria-label="Rows per page">' +
      '<option value="10"' + (cfg.size === 10 ? ' selected' : '') + '>10</option>' +
      '<option value="20"' + (cfg.size === 20 ? ' selected' : '') + '>20</option>' +
      '<option value="25"' + (cfg.size === 25 ? ' selected' : '') + '>25</option>' +
      '<option value="50"' + (cfg.size === 50 ? ' selected' : '') + '>50</option>' +
      '</select></div>' +
      '<div class="ap-pagination__center">' +
      '<button type="button" class="ap-page-nav" data-page-prev="' + key + '" aria-label="Previous page"' + (page <= 1 ? ' disabled' : '') + '>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>' +
      '<input type="text" class="ap-page-input" value="' + page + '" aria-label="Current page" readonly>' +
      '<span class="ap-page-of">of <span>' + pages + '</span></span>' +
      '<button type="button" class="ap-page-nav" data-page-next="' + key + '" aria-label="Next page"' + (page >= pages || total === 0 ? ' disabled' : '') + '>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>' +
      '</div>' +
      '<div class="ap-pagination__right"><span class="ap-count">' + shown + '</span></div>' +
      '</footer>';
  }

  function pageSlice(rows, cfg) {
    var pages = Math.max(1, Math.ceil(rows.length / cfg.size) || 1);
    if (cfg.page > pages) cfg.page = pages;
    var start = (cfg.page - 1) * cfg.size;
    return rows.slice(start, start + cfg.size);
  }

  function weightMsg(weight) {
    var ok = weight === 100;
    var cls = ok ? 'ap-help--ok' : 'ap-help--warn';
    var extra = weight === 0 ? ' — At least one KRA is required' : (ok ? '' : ' — Weights must total 100');
    return '<p class="ap-help ' + cls + '" data-weight-msg>KRA weights: ' + weight + ' / 100' + extra + '</p>';
  }

  function kraLibraryOptions(excludeIds) {
    var ids = excludeIds || [];
    var items = state.kraList.filter(function (k) { return ids.indexOf(k.id) === -1; })
      .map(function (k) { return { value: String(k.id), label: k.name }; });
    if (!items.length) {
      items = [
        { value: 'sample-dq', label: 'Delivery Quality' },
        { value: 'sample-cs', label: 'Client Satisfaction' },
        { value: 'sample-tm', label: 'Timeliness' }
      ];
    }
    return optionsHtml(items, '', 'Add KRA from library');
  }

  function cycleOptions(selected) {
    return optionsHtml(state.cycles.map(function (c) {
      return { value: String(c.id), label: c.name };
    }), selected, 'Select cycle');
  }

  function resolvedEmployees() {
    return state.cycleForm.allEmployees ? 13 : 0;
  }

  /* ---------- Tab renderers ---------- */

  function renderKra() {
    var f = state.kraForm;
    var rows = pageSlice(state.kraList, state.kraPage);
    var body = rows.map(function (r) {
      return '<tr><td>' + escapeHtml(r.name) + '</td><td>' + statusBadge(r.status) + '</td><td>' +
        escapeHtml(r.designations || '—') + '</td></tr>';
    }).join('');

    root.innerHTML =
      '<section class="ap-card ap-card--form" aria-label="Create KRA">' +
      '<div class="ap-form-grid">' +
      '<div class="ap-field"><label class="ap-field__label" for="apKraName">Name <span class="ap-req">*</span></label>' +
      '<input class="ap-input" id="apKraName" type="text" placeholder="e.g. Delivery Quality" value="' + escapeHtml(f.name) + '"></div>' +
      '<div class="ap-field"><label class="ap-field__label" for="apKraStatus">Status <span class="ap-req">*</span></label>' +
      '<select class="ap-select" id="apKraStatus">' +
      '<option value="Draft"' + (f.status === 'Draft' ? ' selected' : '') + '>Draft</option>' +
      '<option value="Active"' + (f.status === 'Active' ? ' selected' : '') + '>Active</option>' +
      '<option value="Inactive"' + (f.status === 'Inactive' ? ' selected' : '') + '>Inactive</option>' +
      '</select></div>' +
      '<div class="ap-field"><label class="ap-field__label" for="apKraDesig">Designations</label>' +
      '<select class="ap-select" id="apKraDesig">' + optionsHtml(DESIGNATIONS, f.designations, 'Select designations') + '</select></div>' +
      '<div class="ap-field ap-field--full"><label class="ap-field__label" for="apKraDesc">Description</label>' +
      '<textarea class="ap-textarea" id="apKraDesc" placeholder="Describe this KRA">' + escapeHtml(f.description) + '</textarea></div>' +
      '</div>' +
      '<div class="ap-form-actions">' +
      '<button type="button" class="ap-btn ap-btn-outline" data-kra-reset>Reset</button>' +
      '<button type="button" class="ap-btn ap-btn-teal" data-kra-save>Save KRA</button>' +
      '</div></section>' +
      '<section class="ap-card ap-card--table" aria-label="KRA list">' +
      '<div class="ap-table-wrap"><table class="ap-table"><thead><tr>' +
      '<th>Name</th><th>Status</th><th>Designations</th></tr></thead><tbody>' +
      (body || '') + '</tbody></table>' +
      (state.kraList.length ? '' : emptyState('No data')) +
      '</div>' + paginationHtml(state.kraPage, state.kraList.length, 'kra') +
      '</section>';
  }

  function renderCycles() {
    var f = state.cycleForm;
    var rows = pageSlice(state.cycles, state.cyclePage);
    var body = rows.map(function (r) {
      return '<tr>' +
        '<td><div class="ap-cell-stack"><strong>' + escapeHtml(r.name) + '</strong></div></td>' +
        '<td><div class="ap-cell-stack">' + escapeHtml(r.start) + ' → ' + escapeHtml(r.end) +
        '<span>' + escapeHtml(r.fy) + '</span></div></td>' +
        '<td>' + escapeHtml(r.scope) + '</td>' +
        '<td>' + r.employees + '</td>' +
        '<td>' + statusBadge(r.status) + '</td>' +
        '<td><div class="ap-row-actions">' +
        '<button type="button" class="ap-btn ap-btn-outline-blue ap-btn-sm" data-cycle-edit="' + r.id + '">Edit</button>' +
        '<button type="button" class="ap-btn ap-btn-outline ap-btn-sm" data-cycle-copy="' + r.id + '">Copy</button>' +
        '<button type="button" class="ap-btn ap-btn-green ap-btn-sm" data-cycle-start="' + r.id + '">Start</button>' +
        '</div></td></tr>';
    }).join('');

    root.innerHTML =
      '<section class="ap-card ap-card--form" aria-label="Create cycle">' +
      '<div class="ap-form-grid ap-form-grid--4">' +
      '<div class="ap-field"><label class="ap-field__label" for="apCyName">Name <span class="ap-req">*</span></label>' +
      '<input class="ap-input" id="apCyName" type="text" placeholder="e.g. H1 FY 2025-26" value="' + escapeHtml(f.name) + '"></div>' +
      '<div class="ap-field"><label class="ap-field__label" for="apCyStart">Start <span class="ap-req">*</span></label>' +
      '<div class="ap-date"><input class="ap-input" id="apCyStart" type="text" placeholder="dd/mm/yyyy" value="' + escapeHtml(f.start) + '">' +
      '<span class="ap-date__icon" aria-hidden="true">' + CAL_ICON + '</span></div></div>' +
      '<div class="ap-field"><label class="ap-field__label" for="apCyEnd">End <span class="ap-req">*</span></label>' +
      '<div class="ap-date"><input class="ap-input" id="apCyEnd" type="text" placeholder="dd/mm/yyyy" value="' + escapeHtml(f.end) + '">' +
      '<span class="ap-date__icon" aria-hidden="true">' + CAL_ICON + '</span></div></div>' +
      '<div class="ap-field"><label class="ap-field__label" for="apCyFy">Financial year <span class="ap-req">*</span></label>' +
      '<select class="ap-select" id="apCyFy">' +
      '<option value="FY 26-27"' + (f.fy === 'FY 26-27' ? ' selected' : '') + '>FY 26-27</option>' +
      '<option value="FY 25-26"' + (f.fy === 'FY 25-26' ? ' selected' : '') + '>FY 25-26</option>' +
      '</select></div></div>' +
      '<label class="ap-check" style="margin-bottom:10px"><input type="checkbox" id="apCyAll"' + (f.allEmployees ? ' checked' : '') + '> All employees</label>' +
      '<p class="ap-help">If not all: teams and/or designations (intersection when both set).</p>' +
      '<div class="ap-form-grid ap-form-grid--2">' +
      '<div class="ap-field"><label class="ap-field__label" for="apCyTeams">Teams</label>' +
      '<select class="ap-select" id="apCyTeams"' + (f.allEmployees ? ' disabled' : '') + '>' +
      optionsHtml(TEAMS, f.teams, 'Select teams') + '</select></div>' +
      '<div class="ap-field"><label class="ap-field__label" for="apCyDesig">Designations</label>' +
      '<select class="ap-select" id="apCyDesig"' + (f.allEmployees ? ' disabled' : '') + '>' +
      optionsHtml(DESIGNATIONS, f.designations, 'Select designations') + '</select></div></div>' +
      '<div class="ap-form-actions ap-form-actions--split">' +
      '<span class="ap-resolved">Resolved employees: ' + resolvedEmployees() + '</span>' +
      '<div style="display:flex;gap:10px">' +
      '<button type="button" class="ap-btn ap-btn-outline" data-cycle-reset>Reset</button>' +
      '<button type="button" class="ap-btn ap-btn-teal" data-cycle-save>Save Cycle</button>' +
      '</div></div></section>' +
      '<section class="ap-card ap-card--table" aria-label="Cycles list">' +
      '<div class="ap-table-wrap"><table class="ap-table ap-table--wide"><thead><tr>' +
      '<th>Name</th><th>Dates</th><th>Scope</th><th>Employees</th><th>Status</th><th>Actions</th>' +
      '</tr></thead><tbody>' + body + '</tbody></table></div>' +
      paginationHtml(state.cyclePage, state.cycles.length, 'cycles') +
      '</section>';
  }

  function renderAssignSection(prefix, title, help, note, weight, kras, employeeSelectHtml) {
    var kraRows = (kras || []).map(function (k, i) {
      return '<tr><td>' + escapeHtml(k.name) + '</td><td>' + k.weight + '%</td>' +
        '<td><button type="button" class="ap-btn ap-btn-outline ap-btn-sm" data-remove-kra="' + prefix + ':' + i + '">Remove</button></td></tr>';
    }).join('');

    return '<div class="ap-section-block" data-assign-section="' + prefix + '">' +
      '<h3 class="ap-section-title">' + title + '</h3>' +
      (help ? '<p class="ap-help">' + help + '</p>' : '') +
      (note ? '<p class="ap-help">' + note + '</p>' : '') +
      employeeSelectHtml +
      weightMsg(weight) +
      '<div class="ap-kra-add-row">' +
      '<div class="ap-field"><label class="ap-field__label" for="apAddKra_' + prefix + '">KRA</label>' +
      '<select class="ap-select" id="apAddKra_' + prefix + '">' + kraLibraryOptions() + '</select></div>' +
      '<div class="ap-field ap-field--weight"><label class="ap-field__label" for="apAddWeight_' + prefix + '">KRA weight %</label>' +
      '<input class="ap-input" id="apAddWeight_' + prefix + '" type="number" min="1" max="100" value="100"></div>' +
      '<button type="button" class="ap-btn ap-btn-teal" data-add-kra="' + prefix + '">+ Add KRA</button>' +
      '</div>' +
      '<p class="ap-help">Note: KRA weights must total 100.</p>' +
      (kras && kras.length ?
        '<div class="ap-table-wrap" style="min-height:auto;margin-bottom:8px"><table class="ap-table" style="min-width:0"><thead><tr><th>KRA</th><th>Weight</th><th></th></tr></thead><tbody>' +
        kraRows + '</tbody></table></div>' : '') +
      '<div class="ap-assign-actions">' +
      '<button type="button" class="ap-btn ap-btn-outline" data-assign-draft="' + prefix + '">Save draft</button>' +
      '<button type="button" class="ap-btn ap-btn-green" data-assign-send="' + prefix + '">' +
      (prefix === 'bulk' ? 'Save &amp; Send for approval' : 'Send for approval') + '</button>' +
      '</div></div>';
  }

  function renderAssign() {
    var a = state.assign;
    var empRows = EMPLOYEES.map(function (name, i) {
      var id = 'e' + i;
      var checked = a.selected[id] ? ' checked' : '';
      return '<tr><td class="ap-th-check"><input type="checkbox" data-emp-check="' + id + '"' + checked + '></td>' +
        '<td>' + escapeHtml(name) + '</td>' +
        '<td class="ap-text-muted">—</td>' +
        '<td class="ap-text-red">No</td></tr>';
    }).join('');

    var bulkSelect =
      '<div class="ap-form-grid ap-form-grid--2">' +
      '<div class="ap-field"><label class="ap-field__label" for="apAssignCycle">Draft cycle</label>' +
      '<select class="ap-select" id="apAssignCycle">' + cycleOptions(a.cycleId) + '</select></div>' +
      '<div class="ap-field"><label class="ap-field__label" for="apUnassigned">Unassigned employees</label>' +
      '<select class="ap-select" id="apUnassigned">' +
      optionsHtml(EMPLOYEES, a.unassigned, 'Select employees without goals') + '</select></div></div>';

    var indSelect =
      '<div class="ap-form-grid" style="grid-template-columns:1fr;max-width:360px">' +
      '<div class="ap-field"><label class="ap-field__label" for="apAssignedEmp">Assigned employee</label>' +
      '<select class="ap-select" id="apAssignedEmp">' +
      '<option value=""' + (!a.employeeId ? ' selected' : '') + '>None assigned yet</option>' +
      EMPLOYEES.map(function (name) {
        return '<option value="' + escapeHtml(name) + '"' + (a.employeeId === name ? ' selected' : '') + '>' + escapeHtml(name) + '</option>';
      }).join('') +
      '</select></div></div>';

    root.innerHTML =
      '<section class="ap-card ap-card--form" aria-label="Assign KRAs and Goals">' +
      renderAssignSection('bulk', '1. Bulk assign (unassigned only)',
        'Build a KRA → goal tree, then assign to unassigned employees in a draft cycle.',
        null, a.bulkWeight, a.bulkKras, bulkSelect) +
      renderAssignSection('ind', '2. Individual edit / send for approval',
        null, 'Save a bulk assignment first.', a.indKras.reduce(function (s, k) { return s + k.weight; }, 0), a.indKras, indSelect) +
      '</section>' +
      '<section class="ap-card ap-card--table" aria-label="Employees setup">' +
      '<div class="ap-table-wrap"><table class="ap-table"><thead><tr>' +
      '<th class="ap-th-check"><input type="checkbox" id="apEmpCheckAll" aria-label="Select all"></th>' +
      '<th>Employee</th><th>Setup</th><th>Assigned</th></tr></thead><tbody>' + empRows + '</tbody></table></div>' +
      '<div class="ap-bulk-bar">' +
      '<button type="button" class="ap-btn ap-btn-green" data-send-selected>Send selected for approval</button>' +
      '<button type="button" class="ap-btn ap-btn-green" data-send-all-drafts>Send all drafts for approval</button>' +
      '</div></section>';
  }

  function appraisalStatusBadge(label, status) {
    var cls = 'ap-badge--draft';
    if (status === 'self') cls = 'ap-badge--warn';
    else if (status === 'manager') cls = 'ap-badge--info';
    else if (status === 'hr') cls = 'ap-badge--active';
    else if (status === 'done') cls = 'ap-badge--green';
    return '<span class="ap-badge ' + cls + '">' + escapeHtml(label) + '</span>';
  }

  function filteredAppraisals() {
    return state.appraisals.filter(function (a) {
      if (state.dash.cycle && String(a.cycleId) !== String(state.dash.cycle)) return false;
      if (state.dash.status && a.status !== state.dash.status) return false;
      return true;
    });
  }

  function dashStats(rows) {
    return {
      total: rows.length,
      self: rows.filter(function (a) { return a.status === 'self'; }).length,
      manager: rows.filter(function (a) { return a.status === 'manager'; }).length,
      hr: rows.filter(function (a) { return a.status === 'hr'; }).length,
      done: rows.filter(function (a) { return a.status === 'done'; }).length
    };
  }

  function renderDashboard() {
    var d = state.dash;
    var all = filteredAppraisals();
    var stats = dashStats(all);
    var rows = pageSlice(all, state.dashPage);
    var body = rows.map(function (a) {
      return '<tr><td>' + escapeHtml(a.employee) + '</td><td>' + escapeHtml(a.cycle) + '</td>' +
        '<td>' + escapeHtml(a.self) + '</td><td>' + escapeHtml(a.manager) + '</td>' +
        '<td>' + escapeHtml(a.final) + '</td><td>' + appraisalStatusBadge(a.statusLabel, a.status) + '</td></tr>';
    }).join('');

    root.innerHTML =
      '<div class="ap-stats" aria-label="Appraisal stats">' +
      '<div class="ap-stat"><strong>' + stats.total + '</strong><span>Total</span></div>' +
      '<div class="ap-stat"><strong>' + stats.self + '</strong><span>Self pending</span></div>' +
      '<div class="ap-stat"><strong>' + stats.manager + '</strong><span>Manager review</span></div>' +
      '<div class="ap-stat"><strong>' + stats.hr + '</strong><span>HR review</span></div>' +
      '<div class="ap-stat"><strong>' + stats.done + '</strong><span>Completed</span></div>' +
      '</div>' +
      '<div class="ap-filters">' +
      '<div class="ap-field"><label class="ap-field__label" for="apDashCycle">Cycle</label>' +
      '<select class="ap-select" id="apDashCycle">' +
      '<option value="">All</option>' +
      state.cycles.map(function (c) {
        return '<option value="' + c.id + '"' + (String(d.cycle) === String(c.id) ? ' selected' : '') + '>' + escapeHtml(c.name) + '</option>';
      }).join('') +
      '</select></div>' +
      '<div class="ap-field"><label class="ap-field__label" for="apDashStatus">Status</label>' +
      '<select class="ap-select" id="apDashStatus">' +
      '<option value="">All</option>' +
      '<option value="self"' + (d.status === 'self' ? ' selected' : '') + '>Self pending</option>' +
      '<option value="manager"' + (d.status === 'manager' ? ' selected' : '') + '>Manager review</option>' +
      '<option value="hr"' + (d.status === 'hr' ? ' selected' : '') + '>HR review</option>' +
      '<option value="done"' + (d.status === 'done' ? ' selected' : '') + '>Completed</option>' +
      '</select></div>' +
      '<button type="button" class="ap-btn ap-btn-teal" data-dash-apply>Apply</button>' +
      '</div>' +
      '<section class="ap-card ap-card--table" aria-label="Appraisals">' +
      '<div class="ap-table-wrap"><table class="ap-table ap-table--wide"><thead><tr>' +
      '<th>Employee</th><th>Cycle</th><th>Self</th><th>Manager</th><th>Final</th><th>Status</th>' +
      '</tr></thead><tbody>' + body + '</tbody></table>' +
      (all.length ? '' : emptyState('No appraisals — assign goals, get manager approval, then start a cycle')) +
      '</div>' + paginationHtml(state.dashPage, all.length, 'dash') +
      '</section>';
  }

  function renderFinalize() {
    root.innerHTML =
      '<section class="ap-card ap-card--form" aria-label="HR Finalize">' +
      '<div class="ap-field" style="max-width:420px">' +
      '<label class="ap-field__label" for="apFinalizeSel">Pending HR review</label>' +
      '<select class="ap-select" id="apFinalizeSel">' +
      '<option value="">None pending</option>' +
      '</select>' +
      '<p class="ap-help" style="margin-top:8px">Select an appraisal.</p>' +
      '</div></section>';
  }

  function renderScores() {
    var s = state.scores;
    var total = Number(s.self) + Number(s.manager);
    var ok = total === 100;
    root.innerHTML =
      '<section class="ap-card ap-card--form" aria-label="Score Settings">' +
      '<p class="ap-help">Final = self × self% + manager × manager%. Must total 100.</p>' +
      '<div class="ap-score-row">' +
      '<div class="ap-field"><label class="ap-field__label" for="apSelfPct">Self %</label>' +
      '<input class="ap-input" id="apSelfPct" type="number" min="0" max="100" value="' + escapeHtml(s.self) + '"></div>' +
      '<div class="ap-field"><label class="ap-field__label" for="apMgrPct">Manager %</label>' +
      '<input class="ap-input" id="apMgrPct" type="number" min="0" max="100" value="' + escapeHtml(s.manager) + '"></div>' +
      '</div>' +
      '<p class="ap-score-total ' + (ok ? 'is-ok' : 'is-warn') + '" id="apScoreTotal">Total: ' + total + ' / 100' +
      (ok ? '' : ' — Must total 100') + '</p>' +
      '<div class="ap-form-actions">' +
      '<button type="button" class="ap-btn ap-btn-teal" data-score-save>Save</button>' +
      '</div></section>';
  }

  function filteredReportRows() {
    var r = state.reports;
    return state.reportRows.filter(function (row) {
      if (r.cycle && String(row.cycleId) !== String(r.cycle)) return false;
      if (r.pill === 'top') return parseFloat(row.final) >= 4.5;
      if (r.pill === 'retain') return row.recommendation === 'Retain';
      if (r.pill === 'increment') return row.recommendation === 'Increment';
      if (r.pill === 'promotion') return row.recommendation === 'Promotion';
      if (r.pill === 'pip') return row.recommendation === 'PIP';
      return true;
    });
  }

  function renderReports() {
    var r = state.reports;
    var all = filteredReportRows();
    var rows = pageSlice(all, state.reportsPage);
    var body = rows.map(function (row) {
      return '<tr><td>' + escapeHtml(row.employee) + '</td><td>' + escapeHtml(row.self) + '</td>' +
        '<td>' + escapeHtml(row.manager) + '</td><td>' + escapeHtml(row.final) + '</td>' +
        '<td>' + escapeHtml(row.recommendation) + '</td></tr>';
    }).join('');
    var pills = REPORT_PILLS.map(function (p) {
      return '<button type="button" class="ap-pill' + (r.pill === p.id ? ' is-active' : '') + '" data-pill="' + p.id + '">' +
        escapeHtml(p.label) + '</button>';
    }).join('');

    root.innerHTML =
      '<section class="ap-card ap-card--form" aria-label="Reports filters">' +
      '<div class="ap-field" style="max-width:280px;margin-bottom:12px">' +
      '<label class="ap-field__label" for="apRepCycle">Cycle</label>' +
      '<select class="ap-select" id="apRepCycle">' +
      '<option value="">All cycles</option>' +
      state.cycles.map(function (c) {
        return '<option value="' + c.id + '"' + (String(r.cycle) === String(c.id) ? ' selected' : '') + '>' + escapeHtml(c.name) + '</option>';
      }).join('') +
      '</select></div>' +
      '<div class="ap-pills" role="group" aria-label="Report filters">' + pills + '</div>' +
      '<p class="ap-help">Shows completed appraisals only. Use filters to focus on team, designation, or recommendation.</p>' +
      '</section>' +
      '<section class="ap-card ap-card--table" aria-label="Report rows">' +
      '<div class="ap-table-wrap"><table class="ap-table"><thead><tr>' +
      '<th>Employee</th><th>Self</th><th>Manager</th><th>Final</th><th>Recommendation</th>' +
      '</tr></thead><tbody>' + body + '</tbody></table>' +
      (all.length ? '' : emptyState('No rows')) +
      '</div>' + paginationHtml(state.reportsPage, all.length, 'reports') +
      '</section>';
  }

  var RENDERERS = {
    kra: renderKra,
    cycles: renderCycles,
    assign: renderAssign,
    dashboard: renderDashboard,
    finalize: renderFinalize,
    scores: renderScores,
    reports: renderReports
  };

  function renderTab(tab) {
    state.tab = tab || state.tab;
    tabs.forEach(function (btn) {
      var on = btn.getAttribute('data-tab') === state.tab;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    var fn = RENDERERS[state.tab];
    if (fn) fn();
  }

  /* ---------- Actions ---------- */

  function readKraForm() {
    state.kraForm = {
      name: (document.getElementById('apKraName') || {}).value || '',
      status: (document.getElementById('apKraStatus') || {}).value || 'Draft',
      designations: (document.getElementById('apKraDesig') || {}).value || '',
      description: (document.getElementById('apKraDesc') || {}).value || ''
    };
  }

  function saveKra() {
    readKraForm();
    var name = state.kraForm.name.trim();
    if (!name) { toast('Required', 'Please enter a KRA name.'); return; }
    state.kraList.unshift({
      id: state.nextKraId++,
      name: name,
      status: state.kraForm.status,
      designations: state.kraForm.designations,
      description: state.kraForm.description
    });
    state.kraForm = { name: '', status: 'Draft', designations: '', description: '' };
    state.kraPage.page = 1;
    toast('KRA saved', name + ' added to library.');
    renderTab('kra');
  }

  function resetKra() {
    state.kraForm = { name: '', status: 'Draft', designations: '', description: '' };
    renderTab('kra');
  }

  function readCycleForm() {
    state.cycleForm = {
      name: (document.getElementById('apCyName') || {}).value || '',
      start: (document.getElementById('apCyStart') || {}).value || '',
      end: (document.getElementById('apCyEnd') || {}).value || '',
      fy: (document.getElementById('apCyFy') || {}).value || 'FY 26-27',
      allEmployees: !!(document.getElementById('apCyAll') || {}).checked,
      teams: (document.getElementById('apCyTeams') || {}).value || '',
      designations: (document.getElementById('apCyDesig') || {}).value || ''
    };
  }

  function saveCycle() {
    readCycleForm();
    var f = state.cycleForm;
    if (!f.name.trim()) { toast('Required', 'Please enter a cycle name.'); return; }
    if (!f.start.trim() || !f.end.trim()) { toast('Required', 'Please enter start and end dates.'); return; }
    var scope = f.allEmployees ? 'All employees' : (
      [f.teams, f.designations].filter(Boolean).join(' ∩ ') || 'Custom'
    );
    var employees = f.allEmployees ? 13 : 0;
    state.cycles.unshift({
      id: state.nextCycleId++,
      name: f.name.trim(),
      start: f.start.trim(),
      end: f.end.trim(),
      fy: f.fy,
      scope: scope,
      employees: employees,
      status: 'Draft'
    });
    state.cycleForm = { name: '', start: '', end: '', fy: 'FY 26-27', allEmployees: false, teams: '', designations: '' };
    state.cyclePage.page = 1;
    toast('Cycle saved', f.name.trim() + ' created.');
    renderTab('cycles');
  }

  function resetCycle() {
    state.cycleForm = { name: '', start: '', end: '', fy: 'FY 26-27', allEmployees: false, teams: '', designations: '' };
    renderTab('cycles');
  }

  function addKraRow(prefix) {
    var sel = document.getElementById('apAddKra_' + prefix);
    var weightEl = document.getElementById('apAddWeight_' + prefix);
    if (!sel || !sel.value) { toast('Required', 'Select a KRA from the library.'); return; }
    var weight = Number(weightEl && weightEl.value);
    if (!weight || weight < 1) { toast('Required', 'Enter a valid KRA weight %.'); return; }
    var label = sel.options[sel.selectedIndex].text;
    var list = prefix === 'bulk' ? state.assign.bulkKras : state.assign.indKras;
    var current = list.reduce(function (s, k) { return s + k.weight; }, 0);
    if (current + weight > 100) {
      toast('Weight limit', 'KRA weights cannot exceed 100.');
      return;
    }
    list.push({ id: sel.value, name: label, weight: weight });
    if (prefix === 'bulk') state.assign.bulkWeight = current + weight;
    toast('KRA added', label + ' at ' + weight + '%');
    if (prefix === 'bulk') {
      var cycleEl = document.getElementById('apAssignCycle');
      var unEl = document.getElementById('apUnassigned');
      if (cycleEl) state.assign.cycleId = cycleEl.value;
      if (unEl) state.assign.unassigned = unEl.value;
    } else {
      var empEl = document.getElementById('apAssignedEmp');
      if (empEl) state.assign.employeeId = empEl.value;
    }
    renderTab('assign');
  }

  function removeKraRow(prefix, index) {
    var list = prefix === 'bulk' ? state.assign.bulkKras : state.assign.indKras;
    list.splice(index, 1);
    if (prefix === 'bulk') {
      state.assign.bulkWeight = list.reduce(function (s, k) { return s + k.weight; }, 0);
    }
    renderTab('assign');
  }

  function updateScoreTotal() {
    var selfEl = document.getElementById('apSelfPct');
    var mgrEl = document.getElementById('apMgrPct');
    var totalEl = document.getElementById('apScoreTotal');
    if (!selfEl || !mgrEl || !totalEl) return;
    var self = Number(selfEl.value) || 0;
    var mgr = Number(mgrEl.value) || 0;
    state.scores.self = self;
    state.scores.manager = mgr;
    var total = self + mgr;
    var ok = total === 100;
    totalEl.textContent = 'Total: ' + total + ' / 100' + (ok ? '' : ' — Must total 100');
    totalEl.classList.toggle('is-ok', ok);
    totalEl.classList.toggle('is-warn', !ok);
  }

  function pageCfg(key) {
    if (key === 'kra') return state.kraPage;
    if (key === 'cycles') return state.cyclePage;
    if (key === 'dash') return state.dashPage;
    if (key === 'reports') return state.reportsPage;
    return { page: 1, size: 10 };
  }

  function totalFor(key) {
    if (key === 'kra') return state.kraList.length;
    if (key === 'cycles') return state.cycles.length;
    if (key === 'dash') return filteredAppraisals().length;
    if (key === 'reports') return filteredReportRows().length;
    return 0;
  }

  function updateCheckInBtn() {
    if (!topCheckIn) return;
    topCheckIn.textContent = state.checkedIn ? 'Check Out' : 'Check In';
    topCheckIn.classList.toggle('is-in', !state.checkedIn);
    topCheckIn.classList.toggle('is-out', state.checkedIn);
  }

  function bind() {
    tabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        renderTab(btn.getAttribute('data-tab'));
      });
    });

    if (root) {
      root.addEventListener('click', function (e) {
        var t = e.target.closest('[data-kra-save],[data-kra-reset],[data-cycle-save],[data-cycle-reset],[data-cycle-edit],[data-cycle-copy],[data-cycle-start],[data-add-kra],[data-remove-kra],[data-assign-draft],[data-assign-send],[data-send-selected],[data-send-all-drafts],[data-dash-apply],[data-score-save],[data-pill],[data-page-prev],[data-page-next],[data-emp-check]');
        if (!t) return;

        if (t.hasAttribute('data-kra-save')) { saveKra(); return; }
        if (t.hasAttribute('data-kra-reset')) { resetKra(); return; }
        if (t.hasAttribute('data-cycle-save')) { saveCycle(); return; }
        if (t.hasAttribute('data-cycle-reset')) { resetCycle(); return; }

        if (t.hasAttribute('data-cycle-edit')) {
          toast('Edit cycle', 'Editing cycle #' + t.getAttribute('data-cycle-edit'));
          return;
        }
        if (t.hasAttribute('data-cycle-copy')) {
          var cid = Number(t.getAttribute('data-cycle-copy'));
          var src = state.cycles.filter(function (c) { return c.id === cid; })[0];
          if (src) {
            state.cycles.unshift({
              id: state.nextCycleId++, name: src.name + ' (copy)', start: src.start, end: src.end,
              fy: src.fy, scope: src.scope, employees: src.employees, status: 'Draft'
            });
            toast('Cycle copied', src.name + ' duplicated.');
            renderTab('cycles');
          }
          return;
        }
        if (t.hasAttribute('data-cycle-start')) {
          toast('Cycle started', 'Cycle #' + t.getAttribute('data-cycle-start') + ' is now active.');
          return;
        }

        if (t.hasAttribute('data-add-kra')) { addKraRow(t.getAttribute('data-add-kra')); return; }
        if (t.hasAttribute('data-remove-kra')) {
          var parts = t.getAttribute('data-remove-kra').split(':');
          removeKraRow(parts[0], Number(parts[1]));
          return;
        }
        if (t.hasAttribute('data-assign-draft')) {
          toast('Draft saved', 'Assignment draft saved.');
          return;
        }
        if (t.hasAttribute('data-assign-send')) {
          toast('Sent for approval', 'Goals sent for manager approval.');
          return;
        }
        if (t.hasAttribute('data-send-selected')) {
          toast('Sent', 'Selected employees sent for approval.');
          return;
        }
        if (t.hasAttribute('data-send-all-drafts')) {
          toast('Sent', 'All draft assignments sent for approval.');
          return;
        }
        if (t.hasAttribute('data-dash-apply')) {
          var dc = document.getElementById('apDashCycle');
          var ds = document.getElementById('apDashStatus');
          state.dash.cycle = dc ? dc.value : '';
          state.dash.status = ds ? ds.value : '';
          state.dashPage.page = 1;
          renderTab('dashboard');
          return;
        }
        if (t.hasAttribute('data-score-save')) {
          updateScoreTotal();
          if (Number(state.scores.self) + Number(state.scores.manager) !== 100) {
            toast('Invalid', 'Self % and Manager % must total 100.');
            return;
          }
          toast('Saved', 'Score settings updated.');
          return;
        }
        if (t.hasAttribute('data-pill')) {
          state.reports.pill = t.getAttribute('data-pill');
          state.reportsPage.page = 1;
          renderTab('reports');
          return;
        }
        if (t.hasAttribute('data-page-prev')) {
          var pk = t.getAttribute('data-page-prev');
          var pc = pageCfg(pk);
          if (pc.page > 1) { pc.page -= 1; renderTab(state.tab); }
          return;
        }
        if (t.hasAttribute('data-page-next')) {
          var nk = t.getAttribute('data-page-next');
          var nc = pageCfg(nk);
          var max = Math.max(1, Math.ceil(totalFor(nk) / nc.size) || 1);
          if (nc.page < max) { nc.page += 1; renderTab(state.tab); }
          return;
        }
        if (t.hasAttribute('data-emp-check')) {
          var eid = t.getAttribute('data-emp-check');
          state.assign.selected[eid] = !!t.checked;
        }
      });

      root.addEventListener('change', function (e) {
        var el = e.target;
        if (el.id === 'apCyAll') {
          readCycleForm();
          renderTab('cycles');
          return;
        }
        if (el.hasAttribute('data-page-size')) {
          var key = el.getAttribute('data-page-size');
          var cfg = pageCfg(key);
          cfg.size = Number(el.value) || 10;
          cfg.page = 1;
          renderTab(state.tab);
          return;
        }
        if (el.id === 'apEmpCheckAll') {
          EMPLOYEES.forEach(function (_, i) {
            state.assign.selected['e' + i] = !!el.checked;
          });
          renderTab('assign');
          return;
        }
        if (el.id === 'apRepCycle') {
          state.reports.cycle = el.value;
          state.reportsPage.page = 1;
          renderTab('reports');
        }
        if (el.id === 'apSelfPct' || el.id === 'apMgrPct') updateScoreTotal();
      });

      root.addEventListener('input', function (e) {
        if (e.target.id === 'apSelfPct' || e.target.id === 'apMgrPct') updateScoreTotal();
      });
    }

    if (topCheckIn) {
      topCheckIn.addEventListener('click', function () {
        state.checkedIn = !state.checkedIn;
        updateCheckInBtn();
        toast(state.checkedIn ? 'Checked in' : 'Checked out', state.checkedIn ? 'You have checked in successfully.' : 'You have checked out successfully.');
      });
    }
  }

  function init() {
    bind();
    updateCheckInBtn();
    tickClock();
    setInterval(tickClock, 30000);
    renderTab('kra');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
