/**
 * TIME ERP Setup module documentation, interactive explorer.
 * Concepts aligned with Setup help: designation, employees, clients, task templates,
 * branches, SMTP, holidays, shifts, leaves, leave allocation, pay details, client documents.
 * Ref: https://guide.caclouddesk.com/Module/Setup/setup-help.html
 */
(function () {
  'use strict';

  var BOOKMARK_KEY = 'timeerp_setup_bookmarks';

  var AREAS = [
    {
      id: 'designation',
      name: 'Designation',
      icon: 'assets/home-icons/task-role.svg',
      material: 'badge',
      time: '10 to 15 min',
      tags: ['designation', 'grades', 'roles', 'employees'],
      desc: 'Define designations and grades that employees can be mapped to across the organization.',
      features: ['Designation master', 'Grades mapping', 'Org-wide reuse', 'Employee linking'],
      overview: 'Designations are the job titles and grades your organization uses. Once defined in Setup, employees can be mapped to them across HRMS, leave quotas, and reporting.',
      benefits: [
        'Consistent titles across employees and reports',
        'Grades support leave quotas and pay mapping',
        'Reusable master data instead of free-text titles'
      ],
      steps: [
        'Open Setup → Designation',
        'Add each designation name used in your firm',
        'Define grades where your structure needs them',
        'Save the master list before onboarding employees',
        'Map employees to designations when adding staff'
      ],
      practices: [
        'Create designations before bulk employee import',
        'Keep naming stable, they appear on payslips and reports',
        'Align designations with leave quota rules'
      ],
      related: [{ name: 'Add Employees', href: '#add-employees' }, { name: 'Allocate Leaves', href: '#allocate-leaves' }, { name: 'HRMS', href: 'hrms.html' }],
      notes: 'Employees and leave quotas depend on designations. Create them early in go-live.'
    },
    {
      id: 'add-employees',
      name: 'Add Employees',
      icon: 'assets/home-icons/task-employee.svg',
      material: 'person_add',
      time: '15 to 25 min',
      tags: ['employees', 'onboarding', 'permissions', 'login', 'documents'],
      desc: 'Onboard employees with basic details, employment info, permissions, documents, and auto-generated login credentials.',
      features: ['Basic & employment details', 'Permissions', 'Documents upload', 'Auto login credentials'],
      overview: 'Add Employees creates the workforce records TIME ERP needs for attendance, leave, payroll, and access. Each employee can receive login credentials generated during setup.',
      benefits: [
        'Single onboarding path for HR and IT access',
        'Permissions attached at hire time',
        'Documents stored with the employee record'
      ],
      steps: [
        'Open Setup → Add Employees',
        'Enter basic details and employment information',
        'Assign designation, branch, and permissions',
        'Attach required documents',
        'Save so login credentials are auto-generated for the employee'
      ],
      practices: [
        'Complete Designation and Branches before adding staff',
        'Review permissions carefully before sharing credentials',
        'Use consistent employee codes for payroll imports'
      ],
      related: [{ name: 'Designation', href: '#designation' }, { name: 'Branches', href: '#branches' }, { name: 'HRMS', href: 'hrms.html' }],
      notes: 'Share login credentials securely. Permissions control what modules each employee can open.'
    },
    {
      id: 'add-clients',
      name: 'Add Clients',
      icon: 'assets/home-icons/crm.svg',
      material: 'handshake',
      time: '10 to 20 min',
      tags: ['clients', 'masters', 'billing', 'portal', 'tasks'],
      desc: 'Create client masters used across tasks, billing, documents, and the client portal.',
      features: ['Client master', 'Task linkage', 'Billing ready', 'Portal & documents'],
      overview: 'Client masters are the foundation for CA and professional-services work. Once created in Setup, the same client record powers tasks, billing, Document Vault, and portal access.',
      benefits: [
        'One client record across delivery and finance',
        'Ready for task assignment and invoicing',
        'Documents and portal access stay attached to the client'
      ],
      steps: [
        'Open Setup → Add Clients',
        'Enter client identity and contact details',
        'Save the client master',
        'Use the client in tasks, billing, and documents',
        'Enable portal access when the engagement requires it'
      ],
      practices: [
        'Avoid duplicate client names, search before creating',
        'Capture GST / billing fields needed for invoices',
        'Link documents under the same client master'
      ],
      related: [{ name: 'Task Template', href: '#task-template' }, { name: 'Billing', href: 'billing.html' }, { name: 'Documents', href: 'document_management.html' }],
      notes: 'Client masters feed CRM, projects, billing, and Document Vault. Keep them accurate before go-live billing.'
    },
    {
      id: 'task-template',
      name: 'Add Task Template',
      icon: 'assets/home-icons/task-template.svg',
      material: 'content_copy',
      time: '15 to 20 min',
      tags: ['tasks', 'templates', 'assignments', 'standardize'],
      desc: 'Prepare reusable task templates to standardize client work and assignments.',
      features: ['Reusable templates', 'Standard steps', 'Faster assignment', 'Consistent delivery'],
      overview: 'Task templates capture repeatable client work (for example GST returns or audits) so teams assign the same structure every time instead of rebuilding tasks from scratch.',
      benefits: [
        'Standard delivery across the firm',
        'Faster task creation for recurring work',
        'Clearer expectations for assignees'
      ],
      steps: [
        'Open Setup → Add Task Template',
        'Name the template for a recurring service',
        'Define the steps or checklist your team follows',
        'Save the template',
        'Use it when creating client tasks and assignments'
      ],
      practices: [
        'Create templates for your top recurring services first',
        'Keep step names short and actionable',
        'Review templates each filing season'
      ],
      related: [{ name: 'Add Clients', href: '#add-clients' }, { name: 'Project Management', href: 'project_management.html' }],
      notes: 'Templates standardize work; they do not replace client-specific instructions on live tasks.'
    },
    {
      id: 'branches',
      name: 'Add Branches',
      icon: 'assets/home-icons/task-branch.svg',
      material: 'account_tree',
      time: '15 to 25 min',
      tags: ['branches', 'office', 'billing', 'payment', 'support'],
      desc: 'Configure office branches with basic details, billing, payment, social media, and support information.',
      features: ['Basic details', 'Billing info', 'Payment details', 'Social & support'],
      overview: 'Branches represent each office location. In TIME ERP, branch data covers Basic Details, Billing, Payment, Social Media, and Support so multi-location firms operate from one workspace.',
      benefits: [
        'Multi-office operations without separate workspaces',
        'Branch-level billing and payment details',
        'Support contacts visible per location'
      ],
      steps: [
        'Open Setup → Add Branches (Branch Data)',
        'Enter Basic Details for the office',
        'Complete Billing and Payment sections',
        'Add Social Media and Support contacts if needed',
        'Save the branch and use it when adding employees or clients'
      ],
      practices: [
        'Create branches before allocating leave quotas by branch',
        'Keep billing details aligned with your GST registration',
        'Mark closed offices carefully if historical data exists'
      ],
      related: [{ name: 'Add Employees', href: '#add-employees' }, { name: 'Allocate Leaves', href: '#allocate-leaves' }, { name: 'Billing', href: 'billing.html' }],
      notes: 'Path reference: Profile → Branch Data → Add Branch. Fill Basic Details, Billing, Payment, Social Media, and Support as required.'
    },
    {
      id: 'smtp',
      name: 'Add SMTP',
      icon: 'assets/home-icons/task-email.svg',
      material: 'outgoing_mail',
      time: '10 to 15 min',
      tags: ['smtp', 'email', 'notifications', 'gmail', 'outlook'],
      desc: 'Set up outgoing email (SMTP) so notifications and documents can be sent from TIME ERP.',
      features: ['Outgoing mail', 'Gmail / Yahoo / Rediff / Outlook', 'Notifications', 'Document delivery'],
      overview: 'SMTP configuration enables the platform to send emails, including notifications and documents. Common providers include Gmail, Yahoo, Rediff, and Outlook.',
      benefits: [
        'Reliable system and document emails',
        'Works with familiar mailbox providers',
        'Central mail settings for the organization'
      ],
      steps: [
        'Open Setup → Add SMTP',
        'Choose your mail provider (Gmail, Yahoo, Rediff, or Outlook)',
        'Enter SMTP host, port, and authentication details',
        'Save and send a test email',
        'Confirm notifications and document mails deliver correctly'
      ],
      practices: [
        'Use an org mailbox, not a personal inbox, for production',
        'Enable app passwords or provider security settings as required',
        'Retest SMTP after password changes'
      ],
      related: [{ name: 'Add Client Documents', href: '#client-documents' }, { name: 'HRMS', href: 'hrms.html' }],
      notes: 'Without SMTP, automated emails and document sends may fail. Validate with a test message after setup.'
    },
    {
      id: 'holidays',
      name: 'Add Holidays',
      icon: 'assets/home-icons/task-holiday.svg',
      material: 'celebration',
      time: '10 to 15 min',
      tags: ['holidays', 'calendar', 'hrms', 'template', 'bulk'],
      desc: 'Maintain the holiday calendar, add from template, a single holiday, or bulk entries.',
      features: ['Holiday calendar', 'Add from template', 'Single holiday', 'Bulk add'],
      overview: 'The holiday calendar drives attendance and leave planning. You can add holidays from a template, create a single holiday, or load entries in bulk under HRMS settings.',
      benefits: [
        'Accurate attendance on public holidays',
        'Faster setup with templates or bulk load',
        'Shared calendar for the whole firm'
      ],
      steps: [
        'Open Setup / HRMS Setting → Holiday',
        'Choose Add from template, Add single holiday, or bulk entry',
        'Confirm dates and holiday names',
        'Save the calendar for the year',
        'Verify attendance and leave screens reflect holidays'
      ],
      practices: [
        'Load the full year before attendance go-live',
        'Include optional / regional holidays your firm observes',
        'Review the calendar annually'
      ],
      related: [{ name: 'Add Shift', href: '#shifts' }, { name: 'Add Leaves', href: '#leaves' }, { name: 'HRMS', href: 'hrms.html' }],
      notes: 'Holiday maintenance lives under HRMS Setting → Holiday. Templates and bulk add speed year setup.'
    },
    {
      id: 'shifts',
      name: 'Add Shift',
      icon: 'assets/home-icons/task-clock.svg',
      material: 'schedule',
      time: '10 to 20 min',
      tags: ['shift', 'attendance', 'timing', 'template'],
      desc: 'Create attendance shifts from a template or as a custom shift under HRMS settings.',
      features: ['Shift master', 'Add from template', 'Custom shifts', 'Attendance timing'],
      overview: 'Shifts define working hours used by attendance. Add from a template for common patterns, or create a custom shift for morning, general, night, or field timings.',
      benefits: [
        'Correct check-in windows for each team',
        'Reusable templates for common patterns',
        'Foundation for overtime and late-entry rules'
      ],
      steps: [
        'Open Setup / HRMS Setting → Shift',
        'Click + to Add from template or Add shift',
        'Set shift name and timing',
        'Save and assign employees to the shift',
        'Validate daily attendance against the shift'
      ],
      practices: [
        'Define shifts before marking production attendance',
        'Name shifts clearly (e.g. General 09:00 to 18:00)',
        'Review night-shift rules for overtime'
      ],
      related: [{ name: 'Add Holidays', href: '#holidays' }, { name: 'HRMS Attendance', href: 'hrms.html' }],
      notes: 'Path reference: HRMS Setting → Shift. Use + for template or custom shift creation.'
    },
    {
      id: 'leaves',
      name: 'Add Leaves',
      icon: 'assets/home-icons/leave.svg',
      material: 'event_busy',
      time: '10 to 15 min',
      tags: ['leave types', 'hrms', 'template', 'policy'],
      desc: 'Define leave types for the organization, add from template or create custom leave types.',
      features: ['Leave types', 'Add from template', 'Custom leave', 'Policy basis'],
      overview: 'Leave types (casual, sick, earned, and others) must exist before you allocate quotas or accept leave applications. Create them from a template or add custom types.',
      benefits: [
        'Clear leave categories for employees',
        'Faster setup with templates',
        'Ready for quota allocation next'
      ],
      steps: [
        'Open Setup / HRMS Setting → Leave',
        'Click + to Add from template or Add leave',
        'Name the leave type and set policy fields',
        'Save all leave types your firm uses',
        'Proceed to Allocate Leaves to Employee'
      ],
      practices: [
        'Create leave types before leave quota allocation',
        'Match leave names to your HR policy',
        'Avoid duplicate leave types'
      ],
      related: [{ name: 'Allocate Leaves', href: '#allocate-leaves' }, { name: 'HRMS', href: 'hrms.html' }],
      notes: 'Path reference: HRMS Setting → Leave. Templates accelerate standard Indian leave policies.'
    },
    {
      id: 'allocate-leaves',
      name: 'Allocate Leaves to Employee',
      icon: 'assets/home-icons/task-balance.svg',
      material: 'event_available',
      time: '15 to 30 min',
      tags: ['leave quota', 'credit', 'debit', 'excel', 'bulk'],
      desc: 'Allocate leave balances manually by type, branch, and designation, or bulk credit/debit via Excel.',
      features: ['Leave quota', 'By branch & designation', 'Manual allocation', 'Bulk Excel upload'],
      overview: 'Leave allocation has two paths. Manually: set Leave Quota by leave type, branch, designation, and annual count. In bulk: use Leave Credit/Debit and upload an Excel file.',
      benefits: [
        'Quotas aligned to branch and designation',
        'Manual control for small teams',
        'Excel bulk load for large headcount'
      ],
      steps: [
        'Ensure leave types, branches, and designations exist',
        'Manual: HRMS Setting → Leave Quota, add leave type, branch, designation, annual count',
        'Bulk: HRMS Leave → Leave Credit/Debit, upload Excel via + beside Remarks',
        'Verify balances on employee leave screens',
        'Adjust mid-year with credit/debit as needed'
      ],
      practices: [
        'Run bulk upload on a sample file first',
        'Match Excel columns exactly to the template',
        'Allocate after designations and branches are final'
      ],
      related: [{ name: 'Add Leaves', href: '#leaves' }, { name: 'Designation', href: '#designation' }, { name: 'Branches', href: '#branches' }],
      notes: 'Part A is Leave Quota (manual). Part B is Leave Credit/Debit with Excel upload for bulk changes.'
    },
    {
      id: 'pay-details',
      name: 'Add Pay Details',
      icon: 'assets/home-icons/payroll.svg',
      material: 'payments',
      time: '20 to 30 min',
      tags: ['payroll', 'salary', 'pay details', 'import', 'excel'],
      desc: 'Capture employee pay details manually in Payroll account settings, or import via the HRMS Excel utility.',
      features: ['Manual pay details', 'Payroll account setting', 'Excel import', 'Salary readiness'],
      overview: 'Pay details feed payroll processing. Enter them manually under Payroll account settings, or upload pay details through the Import utility under HRMS for faster bulk setup.',
      benefits: [
        'Salary structures ready before payroll runs',
        'Manual path for small teams',
        'Excel import for large employee lists'
      ],
      steps: [
        'Manual: Profile → Payroll → Account setting → Pay details',
        'Enter salary components for each employee as required',
        'Bulk: Import utility → HRMS → upload pay details Excel',
        'Validate a sample employee before the first payroll cycle',
        'Keep pay details in sync when CTC changes'
      ],
      practices: [
        'Complete employee masters before importing pay details',
        'Use the official Excel template for imports',
        'Reconcile imported rows against employee count'
      ],
      related: [{ name: 'Add Employees', href: '#add-employees' }, { name: 'Payroll', href: 'payroll.html' }],
      notes: 'Part A is manual Pay details. Part B is Import utility → HRMS → upload pay details Excel.'
    },
    {
      id: 'client-documents',
      name: 'Add Client Documents',
      icon: 'assets/home-icons/document-vault.svg',
      material: 'folder_managed',
      time: '10 to 20 min',
      tags: ['documents', 'vault', 'client access', 'folders'],
      desc: 'Upload client documents or create folders in Document Vault, and control whether clients can access them.',
      features: ['Customer documents', 'Folders', 'Upload files', 'Client access Yes/No'],
      overview: 'Client documents live in Document Vault under Customer Document. Select a customer, upload files or create folders, then set client access to Yes or No for portal visibility.',
      benefits: [
        'Documents tied to the correct client master',
        'Folder structure for engagements',
        'Explicit client portal access control'
      ],
      steps: [
        'Open Document Vault → Customer Document',
        'Select the customer (client)',
        'Upload documents or create folders',
        'Set client access to Yes or No',
        'Confirm the client sees only what you allowed'
      ],
      practices: [
        'Create the client master before uploading documents',
        'Use clear folder names per engagement year',
        'Default sensitive files to client access No'
      ],
      related: [{ name: 'Add Clients', href: '#add-clients' }, { name: 'Document Vault', href: 'document_management.html' }],
      notes: 'Client access Yes/No controls portal visibility. SMTP may be required when sharing documents by email.'
    }
  ];

  var SUGGESTIONS = [
    'Designation', 'Add Employees', 'Add Clients', 'Task Template', 'Branches',
    'SMTP', 'Holidays', 'Shift', 'Leaves', 'Leave Quota', 'Pay Details', 'Client Documents'
  ];

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function loadBookmarks() {
    try { return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '[]'); }
    catch (e) { return []; }
  }

  function saveBookmarks(list) {
    try { localStorage.setItem(BOOKMARK_KEY, JSON.stringify(list)); } catch (e) {}
  }

  var state = { query: '', activeId: null, bookmarks: loadBookmarks() };

  function filteredAreas() {
    var q = state.query.trim().toLowerCase();
    if (!q) return AREAS.slice();
    return AREAS.filter(function (a) {
      var blob = [a.name, a.desc, a.tags.join(' '), a.features.join(' ')].join(' ').toLowerCase();
      return blob.indexOf(q) !== -1;
    });
  }

  function findArea(id) {
    return AREAS.filter(function (a) { return a.id === id; })[0] || null;
  }

  function renderCards() {
    var grid = document.getElementById('suGrid');
    if (!grid) return;
    var list = filteredAreas();
    if (!list.length) {
      grid.innerHTML = '<p class="su-empty">No configuration areas match your search.</p>';
      return;
    }
    grid.innerHTML = list.map(function (a) {
      var soon = a.comingSoon ? '<span class="su-card__soon">Coming Soon</span>' : '';
      var feats = a.features.slice(0, 3).map(function (f) {
        return '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span>' + escapeHtml(f) + '</li>';
      }).join('');
      return ''
        + '<article class="su-card' + (state.activeId === a.id ? ' is-active' : '') + '" data-area="' + escapeHtml(a.id) + '" tabindex="0" role="button" aria-expanded="' + (state.activeId === a.id ? 'true' : 'false') + '">'
        +   '<div class="su-card__top">'
        +     '<span class="su-card__icon"><img src="' + escapeHtml(a.icon) + '" alt="" width="28" height="28" loading="lazy"></span>'
        +     soon
        +   '</div>'
        +   '<h3>' + escapeHtml(a.name) + '</h3>'
        +   '<p class="su-card__desc">' + escapeHtml(a.desc) + '</p>'
        +   '<ul class="su-card__feats">' + feats + '</ul>'
        +   '<div class="su-card__meta">'
        +     '<span><span class="material-symbols-outlined" aria-hidden="true">schedule</span>' + escapeHtml(a.time) + '</span>'
        +     '<span class="su-card__more">Learn More <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></span>'
        +   '</div>'
        + '</article>';
    }).join('');
  }

  function renderDetail(area) {
    var panel = document.getElementById('suDetail');
    if (!panel) return;
    if (!area) {
      panel.hidden = true;
      panel.classList.remove('is-open');
      panel.innerHTML = '';
      return;
    }
    var benefits = area.benefits.map(function (b) {
      return '<li><span class="material-symbols-outlined" aria-hidden="true">check</span>' + escapeHtml(b) + '</li>';
    }).join('');
    var steps = area.steps.map(function (s, i) {
      return '<li><span class="su-step__num">' + (i + 1) + '</span><span>' + escapeHtml(s) + '</span></li>';
    }).join('');
    var practices = area.practices.map(function (p) {
      return '<li>' + escapeHtml(p) + '</li>';
    }).join('');
    var related = (area.related || []).map(function (r) {
      return '<a class="su-chip" href="' + escapeHtml(r.href) + '">' + escapeHtml(r.name) + '</a>';
    }).join('');
    var bookmarked = state.bookmarks.indexOf(area.id) !== -1;

    panel.innerHTML = ''
      + '<div class="su-detail__bar">'
      +   '<button type="button" class="su-detail__close" id="suDetailClose" aria-label="Close details">'
      +     '<span class="material-symbols-outlined" aria-hidden="true">close</span> Close'
      +   '</button>'
      +   '<div class="su-detail__tools">'
      +     '<button type="button" class="su-tool" data-copy-link title="Copy link"><span class="material-symbols-outlined" aria-hidden="true">link</span></button>'
      +     '<button type="button" class="su-tool' + (bookmarked ? ' is-on' : '') + '" data-bookmark title="Bookmark"><span class="material-symbols-outlined" aria-hidden="true">' + (bookmarked ? 'bookmark' : 'bookmark_border') + '</span></button>'
      +     '<button type="button" class="su-tool" data-share title="Share"><span class="material-symbols-outlined" aria-hidden="true">share</span></button>'
      +   '</div>'
      + '</div>'
      + '<div class="su-detail__head">'
      +   '<span class="su-detail__icon"><img src="' + escapeHtml(area.icon) + '" alt="" width="36" height="36"></span>'
      +   '<div>'
      +     '<h2 id="suDetailTitle">' + escapeHtml(area.name) + (area.comingSoon ? ' <em class="su-soon-label">Coming Soon</em>' : '') + '</h2>'
      +     '<p>' + escapeHtml(area.desc) + '</p>'
      +   '</div>'
      + '</div>'
      + '<div class="su-detail__grid">'
      +   '<section><h3>Overview</h3><p>' + escapeHtml(area.overview) + '</p></section>'
      +   '<section><h3>Benefits</h3><ul class="su-check">' + benefits + '</ul></section>'
      +   '<section class="su-detail__span"><h3>Configuration steps</h3><ol class="su-steps">' + steps + '</ol></section>'
      +   '<section><h3>Best practices</h3><ul class="su-bullets">' + practices + '</ul></section>'
      +   '<section><h3>Related</h3><div class="su-chips">' + related + '</div></section>'
      + '</div>'
      + '<aside class="su-note" role="note"><strong>Important</strong><p>' + escapeHtml(area.notes) + '</p></aside>';

    panel.hidden = false;
    panel.classList.add('is-open');
    panel.setAttribute('aria-labelledby', 'suDetailTitle');
  }

  function openArea(id, pushHash) {
    var area = findArea(id);
    if (!area) return;
    state.activeId = id;
    renderCards();
    renderDetail(area);
    setSidebarActive(id);
    if (pushHash !== false) {
      try { history.replaceState(null, '', '#' + id); } catch (e) {}
    }
    var panel = document.getElementById('suDetail');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setSidebarActive(id) {
    document.querySelectorAll('.su-side__link').forEach(function (el) {
      var href = el.getAttribute('href') || '';
      var match = href === '#' + id || (id === null && href === '#overview');
      el.classList.toggle('is-active', match);
      if (match) el.setAttribute('aria-current', 'true');
      else el.removeAttribute('aria-current');
    });
  }

  function renderSuggestions(q) {
    var panel = document.getElementById('suSearchPanel');
    if (!panel) return;
    var query = (q || '').trim().toLowerCase();
    var items = SUGGESTIONS.filter(function (s) {
      return !query || s.toLowerCase().indexOf(query) !== -1;
    }).slice(0, 6);
    var matches = filteredAreas().slice(0, 5);
    if (!query && !items.length) { panel.classList.remove('is-open'); return; }
    var html = '<span class="su-search__label">Suggestions</span>';
    items.forEach(function (s) {
      html += '<button type="button" class="su-search__item" data-suggest="' + escapeHtml(s) + '"><span class="material-symbols-outlined" aria-hidden="true">search</span>' + escapeHtml(s) + '</button>';
    });
    if (matches.length) {
      html += '<span class="su-search__label">Areas</span>';
      matches.forEach(function (a) {
        html += '<button type="button" class="su-search__item" data-goto="' + escapeHtml(a.id) + '"><span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(a.material) + '</span>' + escapeHtml(a.name) + '</button>';
      });
    }
    panel.innerHTML = html;
    panel.classList.add('is-open');
  }

  function initSearch() {
    var input = document.getElementById('suSearch');
    var panel = document.getElementById('suSearchPanel');
    if (!input) return;

    input.addEventListener('focus', function () {
      renderSuggestions(input.value);
      input.closest('.su-search') && input.closest('.su-search').classList.add('is-focused');
    });
    input.addEventListener('blur', function () {
      setTimeout(function () {
        if (panel) panel.classList.remove('is-open');
        input.closest('.su-search') && input.closest('.su-search').classList.remove('is-focused');
      }, 180);
    });
    input.addEventListener('input', function () {
      state.query = input.value;
      renderCards();
      renderSuggestions(input.value);
      var count = document.getElementById('suFilterCount');
      if (count) count.textContent = filteredAreas().length + ' areas';
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { input.blur(); panel && panel.classList.remove('is-open'); }
      if (e.key === 'Enter') {
        var first = filteredAreas()[0];
        if (first) openArea(first.id);
      }
    });

    document.addEventListener('click', function (e) {
      var sug = e.target.closest('[data-suggest]');
      if (sug) {
        input.value = sug.getAttribute('data-suggest');
        state.query = input.value;
        renderCards();
        return;
      }
      var go = e.target.closest('[data-goto]');
      if (go) openArea(go.getAttribute('data-goto'));
    });

    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  function initCards() {
    var grid = document.getElementById('suGrid');
    if (!grid) return;
    grid.addEventListener('click', function (e) {
      var card = e.target.closest('[data-area]');
      if (card) openArea(card.getAttribute('data-area'));
    });
    grid.addEventListener('keydown', function (e) {
      var card = e.target.closest('[data-area]');
      if (!card) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openArea(card.getAttribute('data-area'));
      }
    });
  }

  function initDetailTools() {
    document.addEventListener('click', function (e) {
      if (e.target.closest('#suDetailClose')) {
        state.activeId = null;
        renderCards();
        renderDetail(null);
        setSidebarActive(null);
        try { history.replaceState(null, '', window.location.pathname.split('/').pop() || 'setup.html'); } catch (err) {}
        return;
      }
      if (e.target.closest('[data-copy-link]') && state.activeId) {
        var url = location.origin + location.pathname + '#' + state.activeId;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () { toast('Link copied'); });
        } else { toast('Link: ' + url); }
        return;
      }
      if (e.target.closest('[data-bookmark]') && state.activeId) {
        var i = state.bookmarks.indexOf(state.activeId);
        if (i === -1) state.bookmarks.push(state.activeId);
        else state.bookmarks.splice(i, 1);
        saveBookmarks(state.bookmarks);
        renderDetail(findArea(state.activeId));
        toast(i === -1 ? 'Bookmarked' : 'Bookmark removed');
        return;
      }
      if (e.target.closest('[data-share]') && state.activeId) {
        var shareUrl = location.href.split('#')[0] + '#' + state.activeId;
        var area = findArea(state.activeId);
        if (navigator.share) {
          navigator.share({ title: area.name + ' | TIME ERP Setup', url: shareUrl }).catch(function () {});
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(shareUrl).then(function () { toast('Share link copied'); });
        }
      }
    });
  }

  function toast(msg) {
    var el = document.getElementById('suToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'suToast';
      el.className = 'su-toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('is-show'); }, 2200);
  }

  function initSidebar() {
    var links = document.querySelectorAll('.su-side__link');
    links.forEach(function (link, idx) {
      link.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          (links[idx + 1] || links[0]).focus();
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          (links[idx - 1] || links[links.length - 1]).focus();
        }
      });
      link.addEventListener('click', function () {
        var href = link.getAttribute('href') || '';
        if (href.indexOf('#') === 0 && href !== '#overview' && href !== '#modules') {
          var id = href.slice(1);
          if (findArea(id)) {
            setTimeout(function () { openArea(id, false); }, 50);
          }
        }
      });
    });

    var sections = ['overview', 'modules', 'highlights', 'videos', 'faq', 'cta'].map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);

    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        if (state.activeId && (id === 'modules' || findArea(id))) return;
        document.querySelectorAll('.su-side__link').forEach(function (el) {
          var on = el.getAttribute('href') === '#' + id;
          el.classList.toggle('is-active', on);
        });
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });
    sections.forEach(function (s) { io.observe(s); });
  }

  function initFaq() {
    document.querySelectorAll('.su-faq__item').forEach(function (item) {
      var btn = item.querySelector('.su-faq__q');
      var panel = item.querySelector('.su-faq__a');
      if (!btn || !panel) return;
      btn.addEventListener('click', function () {
        var open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.hidden = !open;
      });
    });
  }

  function initChrome() {
    var bar = document.getElementById('suProgress');
    var top = document.getElementById('suTop');
    window.addEventListener('scroll', function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      if (bar) bar.style.width = pct + '%';
      if (top) top.classList.toggle('is-visible', doc.scrollTop > 480);
    }, { passive: true });
    if (top) top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initQuickActions() {
    document.querySelectorAll('[data-quick]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-quick');
        if (id === 'explore') {
          var el = document.getElementById('modules');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else if (findArea(id)) openArea(id);
      });
    });
  }

  function init() {
    renderCards();
    initSearch();
    initCards();
    initDetailTools();
    initSidebar();
    initFaq();
    initChrome();
    initQuickActions();

    var hash = (location.hash || '').replace(/^#/, '');
    if (hash && findArea(hash)) openArea(hash, false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
