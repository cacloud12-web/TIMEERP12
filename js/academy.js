/**
 * TIME ERP Academy — learning paths & courses mapped to verified modules only.
 * No fake certifications, instructors, ratings, or student counts.
 */
(function () {
  'use strict';

  var PROGRESS_KEY = 'timeerp_academy_progress';
  var JOURNEY_KEY = 'timeerp_academy_journey';

  var paths = [
    { id: 'getting-started', name: 'Getting Started', icon: 'assets/home-icons/task-setup.svg', module: 'setup', level: 'Beginner', duration: '~30 min', desc: 'Organization profile, branches, roles, and first workspace setup.', topics: ['Create organization', 'Add branches', 'Configure roles & permissions', 'Set workspace defaults'] },
    { id: 'hrms-mastery', name: 'HRMS Mastery', icon: 'assets/home-icons/hrms.svg', module: 'hrms', level: 'Intermediate', duration: '~45 min', desc: 'Hire, onboard, manage employees, attendance, leave, and payroll inputs.', topics: ['Employee profiles', 'Recruitment & onboarding', 'Attendance & leave', 'Payroll-ready workforce data'] },
    { id: 'project-mgmt', name: 'Project Management', icon: 'assets/home-icons/project-management.svg', module: 'projects', level: 'Intermediate', duration: '~40 min', desc: 'Plan projects, assign tasks, track timesheets, and delivery visibility.', topics: ['Create projects', 'Tasks & milestones', 'Timesheets', 'Task billing & P/L'] },
    { id: 'crm-fundamentals', name: 'CRM Fundamentals', icon: 'assets/home-icons/crm.svg', module: 'crm', level: 'Beginner', duration: '~35 min', desc: 'Leads, pipeline, quotations, and Client Desk collaboration.', topics: ['Capture leads', 'Pipeline follow-ups', 'Quotations', 'Client Desk portal'] },
    { id: 'billing-finance', name: 'Billing & Finance', icon: 'assets/home-icons/billing.svg', module: 'billing', level: 'Intermediate', duration: '~40 min', desc: 'Billing branches, invoices, receipts, ledgers, and digital payments.', topics: ['Billing setup', 'Invoices & proforma', 'Receipts & ledger', 'UPI / BharatPe flows'] },
    { id: 'compliance', name: 'Compliance Management', icon: 'assets/home-icons/task-gst.svg', module: 'compliance', level: 'Intermediate', duration: '~35 min', desc: 'GST, ESIC, EPFO, gratuity, and TDS reporting readiness.', topics: ['GST reports', 'ESIC & EPFO', 'Gratuity', 'TDS reporting'] },
    { id: 'documents', name: 'Document Management', icon: 'assets/home-icons/document-vault.svg', module: 'documents', level: 'Beginner', duration: '~25 min', desc: 'Store, share, version, and approve documents in Document Vault.', topics: ['Upload & categories', 'Version control', 'Approvals', 'Inward / outward docs'] },
    { id: 'marketing', name: 'Marketing', icon: 'assets/home-icons/task-campaign.svg', module: 'marketing', level: 'Intermediate', duration: '~35 min', desc: 'Website, leads, email, SMS, WhatsApp, and campaign tools.', topics: ['Website management', 'Lead capture', 'Email / SMS / WhatsApp', 'Broadcast campaigns'] },
    { id: 'communication', name: 'Communication', icon: 'assets/home-icons/communication.svg', module: 'communication', level: 'Beginner', duration: '~25 min', desc: 'Unified email, SMS, and WhatsApp notifications from Communication Center.', topics: ['Channel setup', 'Notifications', 'WhatsApp API templates', 'Broadcast outreach'] },
    { id: 'administration', name: 'Administration', icon: 'assets/home-icons/task-role.svg', module: 'setup', level: 'Advanced', duration: '~30 min', desc: 'Roles, permissions, departments, integrations, and workspace preferences.', topics: ['Roles & permissions', 'Departments', 'Integrations', 'Preferences & reset'] },
    { id: 'reports', name: 'Reports & Analytics', icon: 'assets/home-icons/reports.svg', module: 'reports', level: 'Intermediate', duration: '~25 min', desc: 'Dashboard KPIs and operational reports across TIME ERP modules.', topics: ['Dashboard overview', 'Attendance summary', 'Project status', 'Financial views'] }
  ];

  var courses = [
    { id: 'c-intro', title: 'Introduction to TIME ERP', module: 'setup', level: 'Beginner', duration: '~20 min', icon: 'assets/home-icons/dashboard.svg', updated: '2026-07', popular: true, featured: true, desc: 'Learn how TIME ERP unifies HRMS, CRM, payroll, billing, projects, documents, and communication in one cloud platform.', href: 'home1.html#products', body: 'TIME ERP is an enterprise cloud ERP for CA firms, construction, real estate, MSME, and professional services. Start with the product overview, then open each module from the hub.' },
    { id: 'c-hrms', title: 'HRMS Setup', module: 'hrms', level: 'Beginner', duration: '~25 min', icon: 'assets/home-icons/hrms.svg', updated: '2026-07', popular: true, featured: true, desc: 'Create employee records, complete profiles, and keep workforce data ready for attendance, leave, and payroll.', href: 'home1.html#hrms', body: 'Use HRMS to hire, onboard, manage, and retain your workforce. Configure employees, recruitment, onboarding, and policies before enabling attendance and payroll.' },
    { id: 'c-attendance', title: 'Attendance Configuration', module: 'hrms', level: 'Intermediate', duration: '~20 min', icon: 'assets/home-icons/attendance.svg', updated: '2026-06', popular: true, featured: true, desc: 'Configure biometric, geo, or shift-based attendance with daily tracking and overtime visibility.', href: 'home1.html#attendance', body: 'Attendance supports biometric, geo, and shift-based tracking. Assign shifts, confirm marking rules, and review daily, overtime, and presence data.' },
    { id: 'c-leave', title: 'Leave Management', module: 'hrms', level: 'Beginner', duration: '~15 min', icon: 'assets/home-icons/leave.svg', updated: '2026-06', popular: false, featured: true, desc: 'Submit leave requests, route approvals, and track balances with the holiday calendar.', href: 'home1.html#leave', body: 'Leave Management covers requests, approvals, holiday calendar, and balances so HR and managers stay aligned on time off.' },
    { id: 'c-payroll', title: 'Payroll Processing', module: 'hrms', level: 'Intermediate', duration: '~30 min', icon: 'assets/home-icons/payroll.svg', updated: '2026-07', popular: true, featured: true, desc: 'Process salary cycles with statutory components (PF, ESI, TDS) and distribute payslips.', href: 'home1.html#payroll', body: 'Payroll uses HRMS attendance and leave inputs. Configure salary structures, statutory components, and payslip distribution before running a cycle.' },
    { id: 'c-crm', title: 'CRM Setup', module: 'crm', level: 'Beginner', duration: '~25 min', icon: 'assets/home-icons/crm.svg', updated: '2026-07', popular: true, featured: true, desc: 'Capture leads, manage pipeline, create quotations, and follow up from CRM.', href: 'home1.html#crm', body: 'CRM : Client Desk helps teams log leads, assign owners, track follow-ups, and keep opportunities inside TIME ERP.' },
    { id: 'c-project', title: 'Project Workflow', module: 'projects', level: 'Intermediate', duration: '~30 min', icon: 'assets/home-icons/project-management.svg', updated: '2026-07', popular: true, featured: true, desc: 'Create projects, assign work, track milestones, and monitor delivery progress.', href: 'home1.html#project-management', body: 'Project Management helps plan, assign, and deliver client work with tasks, recurring tasks, mobile access, timesheets, and P/L visibility.' },
    { id: 'c-billing', title: 'Billing Management', module: 'billing', level: 'Intermediate', duration: '~30 min', icon: 'assets/home-icons/billing.svg', updated: '2026-07', popular: true, featured: true, desc: 'Set billing branches, generate invoices, record receipts, and manage ledgers.', href: 'home1.html#billing', body: 'Billing Management covers branches, invoices, proforma, receipts, ledger, credit/debit notes, and digital payment options such as BharatPe and UPI AutoPay.' },
    { id: 'c-gst', title: 'GST Reporting', module: 'compliance', level: 'Intermediate', duration: '~25 min', icon: 'assets/home-icons/task-gst.svg', updated: '2026-06', popular: false, featured: true, desc: 'Prepare GST and related statutory reports from Compliance Management.', href: 'home1.html#compliance', body: 'Compliance Management centralizes GST, ESIC, EPFO, gratuity, and TDS reporting so records stay audit-ready.' },
    { id: 'c-vault', title: 'Document Vault', module: 'documents', level: 'Beginner', duration: '~20 min', icon: 'assets/home-icons/document-vault.svg', updated: '2026-06', popular: false, featured: true, desc: 'Upload, categorize, version, approve, and share business documents securely.', href: 'home1.html#document-vault', body: 'Document Management (Document Vault) supports store/share/version/approve flows, agreements, inward/outward docs, DSC tracker, and fixed asset register features.' },
    { id: 'c-marketing', title: 'Marketing Module', module: 'marketing', level: 'Intermediate', duration: '~25 min', icon: 'assets/home-icons/task-campaign.svg', updated: '2026-07', popular: false, featured: true, desc: 'Use website, leads, email, SMS, WhatsApp, ads, and broadcast campaigns.', href: 'market.html', body: 'Marketing includes website management, lead management, community, infographics, SMS, notifications, email, WhatsApp, Google/Meta ads, and broadcasts.' },
    { id: 'c-website', title: 'Website Management', module: 'marketing', level: 'Beginner', duration: '~20 min', icon: 'assets/home-icons/website.svg', updated: '2026-06', popular: false, featured: true, desc: 'Build landing pages, manage blog content, and improve SEO from Website tools.', href: 'home1.html#website', body: 'The Website module supports builder workflows, landing pages, blog, and SEO so marketing teams can publish from TIME ERP.' },
    { id: 'c-tasks', title: 'Project Management', module: 'projects', level: 'Beginner', duration: '~20 min', icon: 'assets/home-icons/project-management.svg', updated: '2026-07', popular: true, featured: true, desc: 'Plan projects, assign tasks, track milestones, timesheets, and delivery visibility in one workspace.', href: 'home1.html#project-management', body: 'Project Management helps plan, assign, and deliver client work with tasks, recurring tasks, mobile access, timesheets, task billing, and profit & loss visibility.' },
    { id: 'c-client', title: 'Client Desk Collaboration', module: 'crm', level: 'Beginner', duration: '~15 min', icon: 'assets/home-icons/client-desk.svg', updated: '2026-05', popular: false, featured: false, desc: 'Share documents, service requests, and messages with clients through Client Desk.', href: 'home1.html#client-desk', body: 'Client Desk is the client portal for documents, service requests, and secure messaging inside TIME ERP.' },
    { id: 'c-comms', title: 'Communication Center', module: 'communication', level: 'Beginner', duration: '~15 min', icon: 'assets/home-icons/communication.svg', updated: '2026-05', popular: false, featured: false, desc: 'Coordinate email, SMS, and WhatsApp notifications from one workspace.', href: 'home1.html#communication', body: 'Communication Center unifies notifications across channels, with WhatsApp API support for templates and automation where configured.' },
    { id: 'c-dashboard', title: 'Dashboard Overview', module: 'reports', level: 'Beginner', duration: '~15 min', icon: 'assets/home-icons/dashboard.svg', updated: '2026-07', popular: true, featured: false, desc: 'Monitor KPIs, revenue analytics, attendance summary, and project status in real time.', href: 'home1.html#dashboard', body: 'The Dashboard gives leadership a real-time overview of KPIs, revenue analytics, attendance summary, and project status.' }
  ];

  var journey = [
    { id: 'j1', title: 'Create Organization', hint: 'Company profile and workspace basics' },
    { id: 'j2', title: 'Add Employees', hint: 'HRMS employee records' },
    { id: 'j3', title: 'Configure HRMS', hint: 'Attendance, leave, and payroll readiness' },
    { id: 'j4', title: 'Create Customers', hint: 'CRM leads and Client Desk' },
    { id: 'j5', title: 'Create Projects', hint: 'Project Management kickoff' },
    { id: 'j6', title: 'Manage Tasks', hint: 'Tasks, milestones, and timesheets' },
    { id: 'j7', title: 'Generate Invoice', hint: 'Billing Management' },
    { id: 'j8', title: 'Compliance Reports', hint: 'GST and statutory reporting' },
    { id: 'j9', title: 'Complete Implementation', hint: 'Go-live readiness and training' }
  ];

  var categories = [
    { icon: 'play_circle', title: 'Video Tutorials', desc: 'Module walkthrough topics for HRMS, CRM, Billing, Projects, and Compliance.', href: 'help_centre.html#videos' },
    { icon: 'list_alt', title: 'Step-by-Step Guides', desc: 'Actionable setup guides aligned to TIME ERP onboarding and Help Centre articles.', href: 'help_centre.html#getting-started' },
    { icon: 'verified', title: 'Best Practices', desc: 'Recommended patterns for roles, process mapping, and module adoption.', href: 'consultants.html' },
    { icon: 'description', title: 'Module Documentation', desc: 'Product explanations mapped to every published TIME ERP module.', href: 'help_centre.html#modules' },
    { icon: 'rocket_launch', title: 'Implementation Guides', desc: 'Consulting and paid onboarding paths for configuration and go-live.', href: 'onboarding_services.html' },
    { icon: 'build', title: 'Troubleshooting', desc: 'Checks for login, attendance, payroll, invoice, and permission issues.', href: 'help_centre.html#troubleshooting' },
    { icon: 'help', title: 'FAQ', desc: 'Answers by product area reflecting current TIME ERP functionality.', href: 'help_centre.html#faqs' }
  ];

  var resources = [
    { icon: 'menu_book', title: 'User Guide', desc: 'Day-to-day guidance for employees using HRMS, CRM, projects, and billing.', note: 'Browse Help Centre articles', href: 'help_centre.html#knowledge' },
    { icon: 'admin_panel_settings', title: 'Administrator Guide', desc: 'Setup guidance for roles, permissions, branches, and workspace configuration.', note: 'Start with Getting Started', href: 'help_centre.html#getting-started' },
    { icon: 'tune', title: 'Configuration Guide', desc: 'Configure attendance, payroll, CRM, billing, compliance, and documents.', note: 'Module-linked setup paths', href: 'help_centre.html#modules' },
    { icon: 'checklist', title: 'Implementation Checklist', desc: 'Used by consultants during go-live planning and workspace readiness.', note: 'Request via consultants', href: 'consultants.html' },
    { icon: 'file_copy', title: 'Templates', desc: 'Employee import, invoice, HR, and policy templates shared during onboarding.', note: 'Shared during implementation', href: 'help_centre.html#downloads' },
    { icon: 'lightbulb', title: 'Best Practices', desc: 'Role design, process mapping, and phased module rollout recommendations.', note: 'Consultants & onboarding', href: 'consultants.html' }
  ];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function highlight(text, q) {
    if (!q) return escapeHtml(text);
    var safe = escapeHtml(text);
    var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    return safe.replace(re, '<mark>$1</mark>');
  }

  function levelClass(level) {
    var l = (level || '').toLowerCase();
    if (l === 'advanced') return 'ac-badge--advanced';
    if (l === 'intermediate') return 'ac-badge--intermediate';
    return 'ac-badge--beginner';
  }

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); }
    catch (e) { return {}; }
  }

  function saveProgress(map) {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(map)); } catch (e) {}
    updateProgressUI();
  }

  function markStarted(courseId) {
    var map = loadProgress();
    if (!map[courseId]) map[courseId] = { started: true, at: Date.now() };
    saveProgress(map);
  }

  function loadJourney() {
    try { return JSON.parse(localStorage.getItem(JOURNEY_KEY) || '[]'); }
    catch (e) { return []; }
  }

  function saveJourney(ids) {
    try { localStorage.setItem(JOURNEY_KEY, JSON.stringify(ids)); } catch (e) {}
  }

  function updateProgressUI() {
    var map = loadProgress();
    var done = Object.keys(map).length;
    var total = courses.length;
    var pct = total ? Math.round((done / total) * 100) : 0;
    var bar = document.getElementById('acProgressBar');
    var meta = document.getElementById('acProgressMeta');
    if (bar) bar.style.width = pct + '%';
    if (meta) meta.textContent = done + ' of ' + total + ' courses started';
    document.querySelectorAll('[data-course-id]').forEach(function (el) {
      var id = el.getAttribute('data-course-id');
      var badge = el.querySelector('.ac-course__status');
      if (badge) badge.textContent = map[id] ? 'Started' : 'Guide';
    });
  }

  function courseCardHtml(c) {
    var map = loadProgress();
    var status = map[c.id] ? 'Started' : 'Guide';
    return '<article class="ac-course anim-up" data-course-id="' + c.id + '" data-module="' + c.module + '" data-level="' + c.level + '" data-title="' + escapeHtml(c.title).toLowerCase() + '">'
      + '<div class="ac-course__thumb" aria-hidden="true">'
      + '<img src="' + c.icon + '" alt="">'
      + '<span class="ac-course__status">' + status + '</span></div>'
      + '<div class="ac-course__body">'
      + '<h3>' + escapeHtml(c.title) + '</h3>'
      + '<p>' + escapeHtml(c.desc) + '</p>'
      + '<div class="ac-card__meta">'
      + '<span class="ac-badge"><span class="material-symbols-outlined" style="font-size:14px" aria-hidden="true">schedule</span>' + escapeHtml(c.duration) + '</span>'
      + '<span class="ac-badge ' + levelClass(c.level) + '">' + escapeHtml(c.level) + '</span></div>'
      + '<div class="ac-card__actions">'
      + '<button type="button" class="btn btn--primary btn--sm" data-open-course="' + c.id + '"><span class="material-symbols-outlined" aria-hidden="true">play_arrow</span> Start Course</button>'
      + '<button type="button" class="btn btn--ghost btn--sm" data-expand-course="' + c.id + '">Details</button>'
      + '</div></div></article>';
  }

  function renderPaths(filterModule, filterLevel, query) {
    var el = document.getElementById('acPaths');
    var empty = document.getElementById('acPathsEmpty');
    if (!el) return;
    var q = (query || '').trim().toLowerCase();
    var list = paths.filter(function (p) {
      if (filterModule && filterModule !== 'all' && p.module !== filterModule) return false;
      if (filterLevel && filterLevel !== 'all' && p.level !== filterLevel) return false;
      if (q && !(p.name.toLowerCase().indexOf(q) >= 0 || p.desc.toLowerCase().indexOf(q) >= 0 || p.topics.join(' ').toLowerCase().indexOf(q) >= 0)) return false;
      return true;
    });
    el.innerHTML = list.map(function (p) {
      return '<button type="button" class="ac-card anim-up" data-path-id="' + p.id + '">'
        + '<span class="ac-card__icon" aria-hidden="true"><img src="' + p.icon + '" alt=""></span>'
        + '<h3>' + escapeHtml(p.name) + '</h3>'
        + '<p>' + escapeHtml(p.desc) + '</p>'
        + '<div class="ac-card__meta">'
        + '<span class="ac-badge"><span class="material-symbols-outlined" style="font-size:14px" aria-hidden="true">schedule</span>' + escapeHtml(p.duration) + '</span>'
        + '<span class="ac-badge ' + levelClass(p.level) + '">' + escapeHtml(p.level) + '</span></div>'
        + '<div class="ac-card__extra"><strong>What you will cover</strong><ul style="margin-top:8px;padding-left:18px;list-style:disc">'
        + p.topics.map(function (t) { return '<li>' + escapeHtml(t) + '</li>'; }).join('')
        + '</ul></div></button>';
    }).join('');
    if (empty) empty.classList.toggle('is-visible', !list.length);
    el.querySelectorAll('[data-path-id]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = btn.classList.contains('is-expanded');
        el.querySelectorAll('.ac-card').forEach(function (c) { c.classList.remove('is-expanded'); });
        if (!open) btn.classList.add('is-expanded');
      });
    });
    observeAnims(el);
  }

  function renderCourses(targetId, list) {
    var el = document.getElementById(targetId);
    if (!el) return;
    el.innerHTML = list.map(courseCardHtml).join('');
    bindCourseActions(el);
    observeAnims(el);
  }

  function bindCourseActions(root) {
    root.querySelectorAll('[data-open-course]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openCourse(btn.getAttribute('data-open-course'));
      });
    });
    root.querySelectorAll('[data-expand-course]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openCourse(btn.getAttribute('data-expand-course'));
      });
    });
  }

  function filterCourses() {
    var module = (document.getElementById('acModuleFilter') || {}).value || 'all';
    var level = (document.getElementById('acLevelFilter') || {}).value || 'all';
    var q = ((document.getElementById('acSearch') || {}).value || '').trim().toLowerCase();
    var featured = courses.filter(function (c) { return c.featured; });
    var popular = courses.filter(function (c) { return c.popular; });
    var recent = courses.slice().sort(function (a, b) { return (b.updated || '').localeCompare(a.updated || ''); }).slice(0, 6);

    function match(c) {
      if (module !== 'all' && c.module !== module) return false;
      if (level !== 'all' && c.level !== level) return false;
      if (q && !(c.title.toLowerCase().indexOf(q) >= 0 || c.desc.toLowerCase().indexOf(q) >= 0 || c.module.indexOf(q) >= 0)) return false;
      return true;
    }

    renderCourses('acFeatured', featured.filter(match));
    renderCourses('acPopular', popular.filter(match));
    renderCourses('acRecent', recent.filter(match));

    ['acFeaturedEmpty', 'acPopularEmpty', 'acRecentEmpty'].forEach(function (id, i) {
      var empty = document.getElementById(id);
      var grid = document.getElementById(['acFeatured', 'acPopular', 'acRecent'][i]);
      if (!empty || !grid) return;
      empty.classList.toggle('is-visible', !grid.children.length);
    });

    renderPaths(module, level, q);
    updateProgressUI();
  }

  function renderJourney() {
    var el = document.getElementById('acJourney');
    if (!el) return;
    var done = loadJourney();
    el.innerHTML = journey.map(function (j, i) {
      var isDone = done.indexOf(j.id) >= 0;
      return '<button type="button" class="ac-journey-step' + (isDone ? ' is-done' : '') + ' anim-up" data-journey="' + j.id + '">'
        + '<span class="ac-journey-step__num">' + (i + 1) + '</span>'
        + '<span class="material-symbols-outlined ac-journey-step__check" aria-hidden="true">check_circle</span>'
        + '<h3>' + escapeHtml(j.title) + '</h3>'
        + '<p>' + escapeHtml(j.hint) + '</p></button>';
    }).join('');
    el.querySelectorAll('[data-journey]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-journey');
        var list = loadJourney();
        if (list.indexOf(id) >= 0) list = list.filter(function (x) { return x !== id; });
        else list.push(id);
        saveJourney(list);
        renderJourney();
      });
    });
    observeAnims(el);
  }

  function renderCategories() {
    var el = document.getElementById('acCategories');
    if (!el) return;
    el.innerHTML = categories.map(function (c) {
      return '<a class="ac-cat anim-up" href="' + c.href + '">'
        + '<span class="ac-card__icon" aria-hidden="true"><span class="material-symbols-outlined">' + c.icon + '</span></span>'
        + '<span><h3>' + escapeHtml(c.title) + '</h3><p>' + escapeHtml(c.desc) + '</p></span></a>';
    }).join('');
    observeAnims(el);
  }

  function renderResources() {
    var el = document.getElementById('acResources');
    if (!el) return;
    el.innerHTML = resources.map(function (r) {
      return '<a class="ac-resource anim-up" href="' + r.href + '">'
        + '<span class="ac-card__icon" aria-hidden="true"><span class="material-symbols-outlined">' + r.icon + '</span></span>'
        + '<span><h3>' + escapeHtml(r.title) + '</h3><p>' + escapeHtml(r.desc) + '</p>'
        + '<span class="ac-resource__note">' + escapeHtml(r.note) + '</span></span></a>';
    }).join('');
    observeAnims(el);
  }

  function getSearchIndex() {
    var items = [];
    paths.forEach(function (p) {
      items.push({ kind: 'Learning Path', title: p.name, desc: p.desc, href: '#paths', id: p.id });
    });
    courses.forEach(function (c) {
      items.push({ kind: 'Course', title: c.title, desc: c.desc, href: '#featured', id: c.id, open: true });
    });
    categories.forEach(function (c) {
      items.push({ kind: 'Category', title: c.title, desc: c.desc, href: c.href });
    });
    return items;
  }

  var searchIndex = getSearchIndex();

  function openCourse(id) {
    var c = courses.filter(function (x) { return x.id === id; })[0];
    if (!c) return;
    markStarted(id);
    var backdrop = document.getElementById('acDrawerBackdrop');
    var drawer = document.getElementById('acDrawer');
    var title = document.getElementById('acDrawerTitle');
    var body = document.getElementById('acDrawerBody');
    title.textContent = c.title;
    body.innerHTML = '<p class="meta">' + escapeHtml(c.level) + ' · ' + escapeHtml(c.duration) + ' · Module: ' + escapeHtml(c.module) + '</p>'
      + '<p>' + escapeHtml(c.body) + '</p>'
      + '<p>' + escapeHtml(c.desc) + '</p>'
      + '<div class="ac-drawer__actions">'
      + '<a class="btn btn--primary btn--sm" href="' + c.href + '"><span class="material-symbols-outlined" aria-hidden="true">open_in_new</span> Open module</a>'
      + '<a class="btn btn--ghost btn--sm" href="help_centre.html#modules"><span class="material-symbols-outlined" aria-hidden="true">menu_book</span> Help Centre</a>'
      + '</div>';
    backdrop.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      backdrop.classList.add('is-open');
      drawer.classList.add('is-open');
    });
  }

  function closeDrawer() {
    var backdrop = document.getElementById('acDrawerBackdrop');
    var drawer = document.getElementById('acDrawer');
    backdrop.classList.remove('is-open');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(function () { backdrop.hidden = true; }, 220);
  }

  function setupSearch() {
    var input = document.getElementById('acSearch');
    var dropdown = document.getElementById('acSearchDropdown');
    if (!input || !dropdown) return;
    var active = -1;

    function render(q) {
      var query = (q || '').trim().toLowerCase();
      if (!query) {
        dropdown.classList.remove('is-open');
        dropdown.innerHTML = '';
        input.setAttribute('aria-expanded', 'false');
        return;
      }
      var hits = searchIndex.filter(function (item) {
        return item.title.toLowerCase().indexOf(query) >= 0 || item.desc.toLowerCase().indexOf(query) >= 0;
      }).slice(0, 8);
      if (!hits.length) {
        dropdown.innerHTML = '<p class="ac-search__empty">No matching courses or modules. Try HRMS, Billing, or CRM.</p>';
        dropdown.classList.add('is-open');
        input.setAttribute('aria-expanded', 'true');
        return;
      }
      dropdown.innerHTML = hits.map(function (item, i) {
        return '<button type="button" class="ac-search__item' + (i === active ? ' is-active' : '') + '" data-search-idx="' + i + '" role="option">'
          + '<strong>' + highlight(item.title, query) + '</strong>'
          + '<span>' + escapeHtml(item.kind) + ' · ' + highlight(item.desc.slice(0, 90), query) + '</span></button>';
      }).join('');
      dropdown.classList.add('is-open');
      input.setAttribute('aria-expanded', 'true');
      dropdown.querySelectorAll('[data-search-idx]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var item = hits[+btn.getAttribute('data-search-idx')];
          if (item.open) openCourse(item.id);
          else if (item.href) window.location.href = item.href;
          dropdown.classList.remove('is-open');
        });
      });
    }

    var debounce;
    input.addEventListener('input', function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        active = -1;
        render(input.value);
        filterCourses();
      }, 160);
    });
    input.addEventListener('keydown', function (e) {
      var items = dropdown.querySelectorAll('.ac-search__item');
      if (e.key === 'ArrowDown' && items.length) {
        e.preventDefault();
        active = Math.min(active + 1, items.length - 1);
        items.forEach(function (el, i) { el.classList.toggle('is-active', i === active); });
      } else if (e.key === 'ArrowUp' && items.length) {
        e.preventDefault();
        active = Math.max(active - 1, 0);
        items.forEach(function (el, i) { el.classList.toggle('is-active', i === active); });
      } else if (e.key === 'Enter' && active >= 0 && items[active]) {
        e.preventDefault();
        items[active].click();
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('is-open');
      }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('#acSearchWrap')) dropdown.classList.remove('is-open');
    });
  }

  function setupStickyNav() {
    var links = document.querySelectorAll('.ac-side__link');
    var sections = [];
    links.forEach(function (link) {
      var id = (link.getAttribute('href') || '').replace('#', '');
      var sec = document.getElementById(id);
      if (sec) sections.push({ id: id, el: sec, link: link });
    });
    function onScroll() {
      var y = window.scrollY + 130;
      var current = sections[0];
      sections.forEach(function (s) {
        if (s.el.offsetTop <= y) current = s;
      });
      links.forEach(function (l) { l.classList.remove('is-active'); });
      if (current) current.link.classList.add('is-active');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function setupTop() {
    var btn = document.getElementById('acTop');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('is-visible', window.scrollY > 480);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var animObserver;
  function observeAnims(root) {
    if (!('IntersectionObserver' in window)) {
      (root || document).querySelectorAll('.anim-up').forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    if (!animObserver) {
      animObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            animObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
    }
    (root || document).querySelectorAll('.anim-up:not(.in-view)').forEach(function (el) {
      animObserver.observe(el);
    });
  }

  function hideSkeleton() {
    var sk = document.getElementById('acSkeleton');
    if (sk) sk.classList.add('is-done');
  }

  function init() {
    setupSearch();
    setupStickyNav();
    setupTop();

    var mod = document.getElementById('acModuleFilter');
    var lvl = document.getElementById('acLevelFilter');
    if (mod) mod.addEventListener('change', filterCourses);
    if (lvl) lvl.addEventListener('change', filterCourses);

    document.getElementById('acDrawerClose') && document.getElementById('acDrawerClose').addEventListener('click', closeDrawer);
    document.getElementById('acDrawerBackdrop') && document.getElementById('acDrawerBackdrop').addEventListener('click', function (e) {
      if (e.target === e.currentTarget) closeDrawer();
    });
    document.getElementById('acDrawer') && document.getElementById('acDrawer').addEventListener('click', function (e) {
      e.stopPropagation();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    // Simulate brief loading skeleton then paint content
    setTimeout(function () {
      hideSkeleton();
      renderCategories();
      renderResources();
      renderJourney();
      filterCourses();
      updateProgressUI();
      observeAnims(document);
    }, 280);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
