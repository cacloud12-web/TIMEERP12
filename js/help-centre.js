/**
 * TIME ERP Help Centre — searchable knowledge index + interactions
 * Content mapped to verified TIME ERP modules only.
 */
(function () {
  'use strict';

  var modules = [
    { id: 'dashboard', name: 'Dashboard', icon: 'assets/home-icons/dashboard.svg', desc: 'Business overview with attendance summary and project status.', href: 'dashboard.html' },
    { id: 'hrms', name: 'HRMS', icon: 'assets/home-icons/hrms.svg', desc: 'Hire, onboard, manage attendance, leave, and employee records.', href: 'hrms.html' },
    { id: 'payroll', name: 'Payroll', icon: 'assets/home-icons/payroll.svg', desc: 'Salary structure, PF & ESI, TDS, payslips, and bank transfer.', href: 'payroll.html' },
    { id: 'crm', name: 'CRM', icon: 'assets/home-icons/crm.svg', desc: 'Manage leads, pipeline, and customer relationships in Client Desk.', href: 'crm.html' },
    { id: 'projects', name: 'Project Management', icon: 'assets/home-icons/project-management.svg', desc: 'Plan projects, tasks, timesheets, and delivery visibility.', href: 'project_management.html' },
    { id: 'billing', name: 'Billing', icon: 'assets/home-icons/billing.svg', desc: 'Invoices, receipts, ledgers, and digital payment workflows.', href: 'billing.html' },
    { id: 'compliance', name: 'Compliance', icon: 'assets/home-icons/task-gst.svg', desc: 'GST, ESIC, EPFO, gratuity, and TDS reporting readiness.', href: 'compliance_management.html' },
    { id: 'documents', name: 'Document Vault', icon: 'assets/home-icons/document-vault.svg', desc: 'Store, share, version, and control business documents.', href: 'document_management.html' },
    { id: 'marketing', name: 'Marketing', icon: 'assets/home-icons/task-campaign.svg', desc: 'Website, leads, email, SMS, WhatsApp, and campaign tools.', href: 'market.html' },
    { id: 'communication', name: 'Communication', icon: 'assets/home-icons/communication.svg', desc: 'Email, SMS, WhatsApp notifications and broadcast outreach.', href: 'communication.html' },
    { id: 'reports', name: 'Reports', icon: 'assets/home-icons/reports.svg', desc: 'Operational and financial reporting across TIME ERP modules.', href: 'index.html#products' }
  ];

  var articles = [
    { id: 'a-dash-1', module: 'dashboard', type: 'guide', title: 'Understanding the TIME ERP Dashboard', body: 'Use the Dashboard for a real-time overview of revenue analytics, attendance summary, and project status so leadership can monitor operations from one view.' },
    { id: 'a-hrms-1', module: 'hrms', type: 'guide', title: 'Add employees and manage profiles', body: 'Create employee records in HRMS, complete profile details, and keep workforce data centralized for attendance, leave, and payroll processes.' },
    { id: 'a-hrms-2', module: 'hrms', type: 'guide', title: 'Configure attendance tracking', body: 'Set up biometric, geo, or shift-based attendance so teams can track presence in real time from HRMS Attendance.' },
    { id: 'a-hrms-3', module: 'hrms', type: 'guide', title: 'Manage leave requests and balances', body: 'Use Leave Management to submit requests, route approvals, and track balances for each employee.' },
    { id: 'a-hrms-4', module: 'hrms', type: 'guide', title: 'Process payroll and payslips', body: 'Configure salary structures, statutory components, and payslip distribution from Payroll so finance can run cycles with HR data.' },
    { id: 'a-pay-1', module: 'payroll', type: 'guide', title: 'Configure salary structure and statutory components', body: 'Set up Salary Structure, PF & ESI, and TDS in Payroll, then generate payslips and bank transfer files after attendance is locked.' },
    { id: 'a-crm-1', module: 'crm', type: 'guide', title: 'Capture and assign leads', body: 'Log inbound leads in CRM : Client Desk, assign owners, and track follow-ups so opportunities do not get lost outside TIME ERP.' },
    { id: 'a-crm-2', module: 'crm', type: 'guide', title: 'Use Client Desk for collaboration', body: 'Share documents and requests through Client Desk so clients and teams collaborate securely inside the platform.' },
    { id: 'a-proj-1', module: 'projects', type: 'guide', title: 'Create projects and milestones', body: 'Set up projects, assign work, and track milestones so delivery teams manage client work in Project Management.' },
    { id: 'a-proj-2', module: 'projects', type: 'guide', title: 'Track tasks and timesheets', body: 'Use Task Management and Timesheet to capture billable work and weekly approvals tied to projects.' },
    { id: 'a-bill-1', module: 'billing', type: 'guide', title: 'Configure billing and generate invoices', body: 'Set billing branches and workflows, then create invoices, record receipts, and manage ledgers in Billing Management.' },
    { id: 'a-comp-1', module: 'compliance', type: 'guide', title: 'Prepare GST and statutory reports', body: 'Use Compliance Management for GST, ESIC, EPFO, gratuity, and TDS reporting so records stay audit-ready.' },
    { id: 'a-doc-1', module: 'documents', type: 'guide', title: 'Organize documents in Document Vault', body: 'Upload, version, approve, and share files from Document Vault with controlled access and compliance-ready history.' },
    { id: 'a-mkt-1', module: 'marketing', type: 'guide', title: 'Run marketing campaigns from TIME ERP', body: 'Use Marketing for website management, lead capture, email, SMS, WhatsApp, and broadcast campaigns from one workspace.' },
    { id: 'a-com-1', module: 'communication', type: 'guide', title: 'Send notifications across channels', body: 'Coordinate email, SMS, and WhatsApp notifications from Communication Center, including WhatsApp API templates where enabled.' },
    { id: 'a-rep-1', module: 'reports', type: 'guide', title: 'Review operational reports', body: 'Open Reports to review operational and financial views across modules such as HR, projects, billing, and compliance.' },
    { id: 'a-set-1', module: 'dashboard', type: 'guide', title: 'Configure roles and permissions', body: 'In Setup, define roles and permissions so each team only accesses the TIME ERP modules and actions they need.' }
  ];

  var faqs = [
    { group: 'general', q: 'What is TIME ERP?', a: 'TIME ERP is an enterprise cloud ERP platform that unifies HRMS, CRM, payroll, billing, projects, tasks, documents, and communication in one platform.' },
    { group: 'general', q: 'Who is TIME ERP for?', a: 'CA firms, construction companies, real estate, property dealers, MSMEs, and professional services organizations.' },
    { group: 'general', q: 'Is TIME ERP cloud-based?', a: 'Yes. TIME ERP is cloud-based with automatic backups and SSL encryption for secure access.' },
    { group: 'general', q: 'Can I try before buying?', a: 'Yes. Book a demo and the TIME ERP team will walk you through the platform for your industry.' },
    { group: 'hrms', q: 'Which HR processes does HRMS cover?', a: 'HRMS covers employees, recruitment, onboarding, attendance, leave, payroll-related workforce data, and related HR operations from one hub.' },
    { group: 'hrms', q: 'How does attendance work?', a: 'Attendance supports biometric, geo, and shift-based tracking with real-time visibility for managers and HR teams.' },
    { group: 'crm', q: 'What is CRM : Client Desk used for?', a: 'CRM manages leads, pipeline, and customer relationships. Client Desk provides a portal for documents, requests, and secure collaboration.' },
    { group: 'billing', q: 'What can Billing Management do?', a: 'Billing Management covers billing setup and branches, invoices, receipts, ledgers, adjustments, and integrated digital payments.' },
    { group: 'projects', q: 'How does Project Management help delivery teams?', a: 'Project Management helps plan, assign, and deliver client work with tasks, timesheets, billing visibility, and progress tracking.' },
    { group: 'compliance', q: 'Which compliance reports are supported?', a: 'Compliance Management supports centralized statutory reporting for GST, ESIC, EPFO, gratuity, and TDS.' },
    { group: 'documents', q: 'What is Document Vault?', a: 'Document Vault stores and organizes business documents with secure sharing, version tracking, approvals, and compliance-ready records.' },
    { group: 'marketing', q: 'What is included in Marketing?', a: 'Marketing includes website management, lead management, community, infographics, SMS, notifications, email, WhatsApp, Google Ads, Meta Ads, and broadcast campaigns.' },
    { group: 'communication', q: 'How do notifications work?', a: 'Communication Center unifies notifications across email, SMS, and WhatsApp, with WhatsApp API support for templates and automation where configured.' }
  ];

  var steps = [
    { title: 'Create Organization', hint: 'Company profile and workspace basics', body: ['Open Setup and complete organization profile details.', 'Confirm business identity fields used across modules.', 'Save defaults before adding branches.'] },
    { title: 'Add Branch', hint: 'Locations and branch structure', body: ['Add branches for each operating location.', 'Link branches to billing and attendance where required.', 'Verify branch visibility for the right roles.'] },
    { title: 'Add Employees', hint: 'HRMS employee records', body: ['Create employee profiles in HRMS.', 'Assign department, role, and reporting structure.', 'Validate records before attendance and payroll use.'] },
    { title: 'Configure Roles', hint: 'Permissions and access control', body: ['Define roles for HR, sales, finance, and delivery teams.', 'Assign module permissions carefully.', 'Test access with a sample user before go-live.'] },
    { title: 'Setup Attendance', hint: 'Shifts and tracking methods', body: ['Choose biometric, geo, or shift-based attendance.', 'Configure shifts and approval rules.', 'Confirm employees can mark attendance correctly.'] },
    { title: 'Setup Payroll', hint: 'Salary and statutory components', body: ['Configure salary structures in Payroll.', 'Enable required statutory components.', 'Run a test payslip for validation.'] },
    { title: 'Create First Project', hint: 'Project Management kickoff', body: ['Create a project with owner and milestones.', 'Assign tasks to team members.', 'Enable timesheet tracking if billable work is required.'] },
    { title: 'Generate First Invoice', hint: 'Billing Management', body: ['Confirm billing branch and invoice settings.', 'Create and review the first invoice.', 'Record receipt and verify ledger impact.'] },
    { title: 'Complete Setup', hint: 'Go-live readiness', body: ['Review roles, modules, and master data.', 'Train users on assigned modules.', 'Use consultants or onboarding services if you need guided go-live support.'] }
  ];

  var knowledge = [
    { icon: 'description', title: 'Documentation', desc: 'Module overviews and product explanations aligned to TIME ERP features.', href: '#modules' },
    { icon: 'person', title: 'User Guides', desc: 'Day-to-day guides for employees using HRMS, CRM, projects, and billing.', href: '#modules' },
    { icon: 'admin_panel_settings', title: 'Administrator Guide', desc: 'Setup guidance for roles, permissions, branches, and workspace configuration.', href: '#getting-started' },
    { icon: 'tune', title: 'Configuration Guide', desc: 'Configure attendance, payroll, CRM, billing, compliance, and documents.', href: '#getting-started' },
    { icon: 'rocket_launch', title: 'Implementation Guide', desc: 'Follow consulting and onboarding paths for deployment and go-live.', href: 'consultants.html' },
    { icon: 'chat', title: 'WhatsApp API', desc: 'WhatsApp API is available as a Communication capability for templates and automation.', href: 'whatsapp_api.html' },
    { icon: 'verified', title: 'Best Practices', desc: 'Recommended setup patterns for roles, process mapping, and module adoption.', href: 'consultants.html' }
  ];

  var videos = [
    { icon: 'play_lesson', title: 'Beginner Tutorials', desc: 'Start with organization setup, navigation, and core module orientation.', href: 'community.html' },
    { icon: 'groups', title: 'HRMS Tutorials', desc: 'Learn employees, attendance, leave, and payroll-related workforce flows.', href: 'community.html' },
    { icon: 'handshake', title: 'CRM Tutorials', desc: 'Lead capture, pipeline follow-up, and Client Desk collaboration topics.', href: 'community.html' },
    { icon: 'receipt_long', title: 'Billing Tutorials', desc: 'Invoice creation, receipts, and billing workflow walkthroughs.', href: 'community.html' },
    { icon: 'account_tree', title: 'Project Management Tutorials', desc: 'Projects, tasks, milestones, and timesheet usage for delivery teams.', href: 'community.html' },
    { icon: 'gavel', title: 'Compliance Tutorials', desc: 'Guidance topics for GST and statutory reporting readiness.', href: 'community.html' }
  ];

  var trouble = [
    { icon: 'lock', title: 'Cannot Login', steps: ['Confirm email/username and password carefully.', 'Clear browser cache or try another browser.', 'Check with your admin that your user is active and has login permission.', 'Contact support if access still fails.'] },
    { icon: 'fingerprint', title: 'Attendance Issue', steps: ['Verify shift assignment in HRMS Attendance.', 'Confirm biometric/geo settings for the employee.', 'Check whether the attendance window or location rule blocks marking.', 'Ask an HR admin to review the attendance log.'] },
    { icon: 'payments', title: 'Payroll Issue', steps: ['Confirm employee salary structure is configured.', 'Check attendance and leave inputs for the payroll period.', 'Validate statutory components before processing.', 'Re-run a test payslip after corrections.'] },
    { icon: 'receipt_long', title: 'Invoice Issue', steps: ['Verify billing branch and invoice settings.', 'Confirm client and amount details on the draft invoice.', 'Check payment/receipt status if the invoice looks unpaid.', 'Review ledger entries after posting.'] },
    { icon: 'notifications', title: 'Notification Issue', steps: ['Confirm Communication channel settings for email, SMS, or WhatsApp.', 'Verify recipient contact details in the employee or client record.', 'Check whether templates are configured for WhatsApp API sends.', 'Retry after an admin reviews notification logs.'] },
    { icon: 'upload', title: 'Import Error', steps: ['Use the correct import format shared during onboarding.', 'Remove blank or duplicate rows before upload.', 'Confirm required fields such as employee ID or client name.', 'Ask a consultant for migration assistance if master data is complex.'] },
    { icon: 'download', title: 'Export Error', steps: ['Confirm your role has export permission.', 'Narrow the date or filter range and try again.', 'Retry from a supported browser session.', 'Contact support if exports fail across modules.'] },
    { icon: 'admin_panel_settings', title: 'Permission Error', steps: ['Ask an administrator to review your role permissions.', 'Confirm module access for HRMS, CRM, Billing, or Projects.', 'Sign out and sign in after permission changes.', 'Escalate to support if permissions look correct but access is denied.'] }
  ];

  var downloads = [
    { icon: 'menu_book', title: 'User Manual', note: 'Request during onboarding or from consultants.' },
    { icon: 'admin_panel_settings', title: 'Admin Manual', note: 'Shared with workspace administrators during setup.' },
    { icon: 'group_add', title: 'Employee Import Template', note: 'Provided for HRMS data migration assistance.' },
    { icon: 'receipt', title: 'Invoice Template', note: 'Aligned to Billing Management during configuration.' },
    { icon: 'badge', title: 'HR Templates', note: 'Available through HRMS onboarding guidance.' },
    { icon: 'policy', title: 'Policy Templates', note: 'Request with HR policy setup support.' },
    { icon: 'checklist', title: 'Implementation Checklist', note: 'Used by consultants during go-live planning.' }
  ];

  var updates = [
    { badge: 'New Features', title: 'Marketing workspace documentation', body: 'Help content now covers Website Management, Lead Management, Email, SMS, WhatsApp, ads, and broadcast campaigns.' },
    { badge: 'Product Improvements', title: 'Consultants & onboarding guidance', body: 'Implementation planning, configuration, training, and go-live support paths are documented under Consultants and Paid onboarding.' },
    { badge: 'Bug Fixes', title: 'Support troubleshooting checks', body: 'Common login, attendance, payroll, invoice, notification, import/export, and permission checks are listed for self-service.' },
    { badge: 'Security Updates', title: 'Roles & permission guidance', body: 'Administrator guidance emphasizes role-based access so teams only open the modules they need.' }
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

  function articleCount(moduleId) {
    return articles.filter(function (a) { return a.module === moduleId; }).length
      + faqs.filter(function (f) {
        if (moduleId === 'crm') return f.group === 'crm';
        if (moduleId === 'projects') return f.group === 'projects';
        if (moduleId === 'documents') return f.group === 'documents';
        return f.group === moduleId;
      }).length;
  }

  function getSearchIndex() {
    var items = [];
    modules.forEach(function (m) {
      items.push({ kind: 'Module', title: m.name, desc: m.desc, href: m.href, module: m.id });
    });
    articles.forEach(function (a) {
      items.push({ kind: 'Documentation', title: a.title, desc: a.body, id: a.id, module: a.module, href: '#' });
    });
    faqs.forEach(function (f, i) {
      items.push({ kind: 'FAQ', title: f.q, desc: f.a, module: f.group, href: '#faqs', faqIndex: i });
    });
    videos.forEach(function (v) {
      items.push({ kind: 'Tutorial', title: v.title, desc: v.desc, href: v.href });
    });
    trouble.forEach(function (t, i) {
      items.push({ kind: 'Troubleshooting', title: t.title, desc: t.steps.join(' '), href: '#troubleshooting', troubleIndex: i });
    });
    return items;
  }

  var searchIndex = getSearchIndex();
  var recentKey = 'timeerp_help_recent';

  function loadRecent() {
    try { return JSON.parse(localStorage.getItem(recentKey) || '[]'); }
    catch (e) { return []; }
  }

  function saveRecent(item) {
    var list = loadRecent().filter(function (x) { return x.title !== item.title; });
    list.unshift({ title: item.title, kind: item.kind || 'Article', id: item.id || '', href: item.href || '#' });
    list = list.slice(0, 5);
    try { localStorage.setItem(recentKey, JSON.stringify(list)); } catch (e) {}
    renderRecent();
  }

  function renderRecent() {
    var el = document.getElementById('hcRecent');
    if (!el) return;
    var list = loadRecent();
    if (!list.length) {
      el.innerHTML = '<p class="hc-search__hint" style="padding:0">Articles you open will appear here.</p>';
      return;
    }
    el.innerHTML = list.map(function (item) {
      return '<button type="button" class="hc-mini-item" data-recent-title="' + escapeHtml(item.title) + '">'
        + '<span class="material-symbols-outlined" aria-hidden="true">history</span>'
        + '<span>' + escapeHtml(item.title) + '</span></button>';
    }).join('');
  }

  function renderPopular() {
    var el = document.getElementById('hcPopular');
    var popular = articles.slice(0, 4);
    el.innerHTML = popular.map(function (a) {
      return '<button type="button" class="hc-mini-item" data-article="' + a.id + '">'
        + '<span class="material-symbols-outlined" aria-hidden="true">article</span>'
        + '<span>' + escapeHtml(a.title) + '</span></button>';
    }).join('');
  }

  function renderModules(filter) {
    var el = document.getElementById('hcModules');
    var list = modules.filter(function (m) {
      if (!filter || filter === 'all') return true;
      if (filter === 'projects') return m.id === 'projects';
      return m.id === filter;
    });
    el.innerHTML = list.map(function (m) {
      var count = articleCount(m.id);
      return '<button type="button" class="hc-card" data-module-open="' + m.id + '">'
        + '<span class="hc-card__icon" aria-hidden="true"><img src="' + m.icon + '" alt=""></span>'
        + '<h3>' + escapeHtml(m.name) + '</h3>'
        + '<p>' + escapeHtml(m.desc) + '</p>'
        + '<span class="hc-card__meta">' + count + ' article' + (count === 1 ? '' : 's') + '</span></button>';
    }).join('');
  }

  function renderSteps() {
    var el = document.getElementById('hcSteps');
    el.innerHTML = steps.map(function (s, i) {
      return '<div class="hc-step' + (i === 0 ? ' is-open' : '') + '">'
        + '<button type="button" class="hc-step__btn" aria-expanded="' + (i === 0 ? 'true' : 'false') + '">'
        + '<span class="hc-step__num">' + (i + 1) + '</span>'
        + '<span><strong>' + escapeHtml(s.title) + '</strong><span class="hint">' + escapeHtml(s.hint) + '</span></span>'
        + '<span class="material-symbols-outlined hc-step__chevron" aria-hidden="true">expand_more</span></button>'
        + '<div class="hc-step__body"><ol>' + s.body.map(function (b) { return '<li>' + escapeHtml(b) + '</li>'; }).join('') + '</ol></div></div>';
    }).join('');
    el.querySelectorAll('.hc-step__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var step = btn.closest('.hc-step');
        var open = step.classList.contains('is-open');
        el.querySelectorAll('.hc-step').forEach(function (s) {
          s.classList.remove('is-open');
          s.querySelector('.hc-step__btn').setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          step.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function renderKnowledge() {
    document.getElementById('hcKnowledge').innerHTML = knowledge.map(function (k) {
      return '<a class="hc-card" href="' + k.href + '">'
        + '<span class="hc-card__icon" aria-hidden="true"><span class="material-symbols-outlined">' + k.icon + '</span></span>'
        + '<h3>' + escapeHtml(k.title) + '</h3>'
        + '<p>' + escapeHtml(k.desc) + '</p></a>';
    }).join('');
  }

  function renderVideos() {
    document.getElementById('hcVideos').innerHTML = videos.map(function (v) {
      return '<a class="hc-card" href="' + v.href + '">'
        + '<span class="hc-card__icon" aria-hidden="true"><span class="material-symbols-outlined">' + v.icon + '</span></span>'
        + '<h3>' + escapeHtml(v.title) + '</h3>'
        + '<p>' + escapeHtml(v.desc) + '</p>'
        + '<span class="hc-card__meta">Open learning resources</span></a>';
    }).join('');
  }

  var faqGroups = [
    { id: 'all', label: 'All' },
    { id: 'general', label: 'General' },
    { id: 'hrms', label: 'HRMS' },
    { id: 'crm', label: 'CRM' },
    { id: 'billing', label: 'Billing' },
    { id: 'projects', label: 'Projects' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'documents', label: 'Document Vault' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'communication', label: 'Communication' }
  ];
  var faqFilter = 'all';

  function renderFaqFilters() {
    document.getElementById('hcFaqFilters').innerHTML = faqGroups.map(function (g) {
      return '<button type="button" class="hc-filter' + (g.id === faqFilter ? ' is-active' : '') + '" data-faq-filter="' + g.id + '">' + g.label + '</button>';
    }).join('');
  }

  function renderFaqs() {
    var list = document.getElementById('hcFaqList');
    var empty = document.getElementById('hcFaqEmpty');
    var visible = 0;
    list.innerHTML = faqs.map(function (f, i) {
      var show = faqFilter === 'all' || f.group === faqFilter;
      if (show) visible++;
      return '<div class="hc-acc' + (show ? '' : ' is-hidden') + (i === 0 && show ? ' is-open' : '') + '" data-faq-group="' + f.group + '">'
        + '<button type="button" class="hc-acc__q" aria-expanded="' + (i === 0 && show ? 'true' : 'false') + '">'
        + '<span>' + escapeHtml(f.q) + '<span class="tag">' + escapeHtml(f.group) + '</span></span>'
        + '<span class="plus" aria-hidden="true">+</span></button>'
        + '<div class="hc-acc__a"><p>' + escapeHtml(f.a) + '</p></div></div>';
    }).join('');
    empty.classList.toggle('is-visible', visible === 0);
    list.querySelectorAll('.hc-acc__q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.hc-acc');
        var open = item.classList.contains('is-open');
        list.querySelectorAll('.hc-acc').forEach(function (a) {
          a.classList.remove('is-open');
          a.querySelector('.hc-acc__q').setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          saveRecent({ title: btn.querySelector('span').childNodes[0].textContent, kind: 'FAQ', href: '#faqs' });
        }
      });
    });
  }

  function renderTrouble() {
    var el = document.getElementById('hcTrouble');
    el.innerHTML = trouble.map(function (t, i) {
      return '<div class="hc-trouble" data-trouble="' + i + '">'
        + '<button type="button" class="hc-trouble__btn">'
        + '<span class="hc-card__icon" aria-hidden="true"><span class="material-symbols-outlined">' + t.icon + '</span></span>'
        + '<span><strong style="display:block;font-size:15px;color:var(--heading-dark)">' + escapeHtml(t.title) + '</strong>'
        + '<span style="font-size:12px;color:var(--text-muted)">View solution steps</span></span></button>'
        + '<div class="hc-trouble__body"><ol>' + t.steps.map(function (s) { return '<li>' + escapeHtml(s) + '</li>'; }).join('') + '</ol></div></div>';
    }).join('');
    el.querySelectorAll('.hc-trouble__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.hc-trouble');
        card.classList.toggle('is-open');
        if (card.classList.contains('is-open')) {
          saveRecent({ title: trouble[+card.getAttribute('data-trouble')].title, kind: 'Troubleshooting', href: '#troubleshooting' });
        }
      });
    });
  }

  function renderDownloads() {
    document.getElementById('hcDownloads').innerHTML = downloads.map(function (d) {
      return '<a class="hc-download" href="contact_sales.html">'
        + '<span class="hc-card__icon" aria-hidden="true"><span class="material-symbols-outlined">' + d.icon + '</span></span>'
        + '<span><h3 style="font-size:15px;margin:0 0 4px;color:var(--heading-dark)">' + escapeHtml(d.title) + '</h3>'
        + '<p style="margin:0;font-size:13px;color:var(--text-muted);line-height:1.5">' + escapeHtml(d.note) + '</p>'
        + '<span class="hc-download__note">Request access →</span></span></a>';
    }).join('');
  }

  function renderUpdates() {
    document.getElementById('hcUpdates').innerHTML = updates.map(function (u) {
      return '<div class="hc-tl-item"><span class="badge">' + escapeHtml(u.badge) + '</span>'
        + '<h3>' + escapeHtml(u.title) + '</h3><p>' + escapeHtml(u.body) + '</p></div>';
    }).join('');
  }

  /* Article drawer */
  var drawer = document.getElementById('hcDrawer');
  var backdrop = document.getElementById('hcDrawerBackdrop');

  function openArticle(id) {
    var a = articles.filter(function (x) { return x.id === id; })[0];
    if (!a) return;
    var mod = modules.filter(function (m) { return m.id === a.module; })[0];
    document.getElementById('hcDrawerTitle').textContent = a.title;
    document.getElementById('hcDrawerBody').innerHTML =
      '<div class="meta">' + escapeHtml(a.type) + ' · ' + escapeHtml(mod ? mod.name : a.module) + '</div>'
      + '<p>' + escapeHtml(a.body) + '</p>'
      + (mod ? '<p style="margin-top:16px"><a class="btn btn--primary btn--sm" href="' + mod.href + '">Open ' + escapeHtml(mod.name) + '</a></p>' : '');
    backdrop.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      backdrop.classList.add('is-open');
      drawer.classList.add('is-open');
    });
    saveRecent({ title: a.title, kind: 'Documentation', id: a.id, href: '#' });
  }

  function openModuleArticles(moduleId) {
    var list = articles.filter(function (a) { return a.module === moduleId; });
    var mod = modules.filter(function (m) { return m.id === moduleId; })[0];
    if (!mod) return;
    document.getElementById('hcDrawerTitle').textContent = mod.name + ' guides';
    document.getElementById('hcDrawerBody').innerHTML =
      '<div class="meta">' + list.length + ' article' + (list.length === 1 ? '' : 's') + '</div>'
      + '<p>' + escapeHtml(mod.desc) + '</p>'
      + '<div class="hc-mini-list" style="margin-top:14px">' + list.map(function (a) {
        return '<button type="button" class="hc-mini-item" data-article="' + a.id + '"><span class="material-symbols-outlined" aria-hidden="true">article</span><span>' + escapeHtml(a.title) + '</span></button>';
      }).join('') + '</div>'
      + '<p style="margin-top:16px"><a class="btn btn--ghost btn--sm" href="' + mod.href + '">View module on website</a></p>';
    backdrop.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      backdrop.classList.add('is-open');
      drawer.classList.add('is-open');
    });
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () { backdrop.hidden = true; }, 220);
  }

  document.getElementById('hcDrawerClose').addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', function (e) {
    if (e.target === backdrop) closeDrawer();
  });
  drawer.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  /* Search */
  var searchInput = document.getElementById('hcSearch');
  var dropdown = document.getElementById('hcSearchDropdown');
  var activeIdx = -1;

  function openDropdown(html) {
    dropdown.innerHTML = html;
    dropdown.hidden = false;
    dropdown.classList.add('is-open');
    searchInput.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    dropdown.classList.remove('is-open');
    dropdown.hidden = true;
    searchInput.setAttribute('aria-expanded', 'false');
    activeIdx = -1;
  }

  function runSearch(q) {
    q = (q || '').trim();
    if (!q) {
      openDropdown('<div class="hc-search__hint">Try “attendance”, “invoice”, “CRM”, or “permissions”.</div>');
      return;
    }
    var lower = q.toLowerCase();
    var hits = searchIndex.filter(function (item) {
      return (item.title + ' ' + item.desc + ' ' + (item.kind || '')).toLowerCase().indexOf(lower) !== -1;
    }).slice(0, 8);
    if (!hits.length) {
      openDropdown('<div class="hc-search__empty">No results for “' + escapeHtml(q) + '”. Try another module or contact support.</div>');
      return;
    }
    openDropdown(hits.map(function (item, i) {
      return '<button type="button" class="hc-search__item" role="option" data-search-idx="' + i + '" data-kind="' + escapeHtml(item.kind) + '"'
        + (item.id ? ' data-article="' + item.id + '"' : '')
        + (item.href ? ' data-href="' + escapeHtml(item.href) + '"' : '')
        + (typeof item.troubleIndex === 'number' ? ' data-trouble-jump="' + item.troubleIndex + '"' : '')
        + '>'
        + '<strong>' + highlight(item.title, q) + '</strong>'
        + '<span>' + escapeHtml(item.kind) + (item.module ? ' · ' + escapeHtml(item.module) : '') + '</span></button>';
    }).join(''));
    dropdown._hits = hits;
  }

  var searchTimer = null;
  searchInput.addEventListener('input', function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () { runSearch(searchInput.value); }, 120);
  });
  searchInput.addEventListener('focus', function () { runSearch(searchInput.value); });
  searchInput.addEventListener('keydown', function (e) {
    var items = dropdown.querySelectorAll('.hc-search__item');
    if (e.key === 'ArrowDown' && items.length) {
      e.preventDefault();
      activeIdx = Math.min(activeIdx + 1, items.length - 1);
      items.forEach(function (el, i) { el.classList.toggle('is-active', i === activeIdx); });
    } else if (e.key === 'ArrowUp' && items.length) {
      e.preventDefault();
      activeIdx = Math.max(activeIdx - 1, 0);
      items.forEach(function (el, i) { el.classList.toggle('is-active', i === activeIdx); });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      var target = items[activeIdx] || items[0];
      if (target) target.click();
    } else if (e.key === 'Escape') closeDropdown();
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('#hcSearchWrap')) closeDropdown();

    var articleBtn = e.target.closest('[data-article]');
    if (articleBtn) {
      openArticle(articleBtn.getAttribute('data-article'));
      closeDropdown();
      return;
    }

    var modOpen = e.target.closest('[data-module-open]');
    if (modOpen) {
      openModuleArticles(modOpen.getAttribute('data-module-open'));
      return;
    }

    var searchItem = e.target.closest('.hc-search__item');
    if (searchItem) {
      var art = searchItem.getAttribute('data-article');
      var href = searchItem.getAttribute('data-href');
      var tj = searchItem.getAttribute('data-trouble-jump');
      if (art) openArticle(art);
      else if (tj !== null && tj !== '') {
        var node = document.querySelector('[data-trouble="' + tj + '"]');
        if (node) {
          node.scrollIntoView({ behavior: 'smooth', block: 'center' });
          node.classList.add('is-open');
        }
      } else if (href && href !== '#') window.location.href = href;
      else if (href === '#faqs') document.getElementById('faqs').scrollIntoView({ behavior: 'smooth' });
      closeDropdown();
      return;
    }

    var faqFilterBtn = e.target.closest('[data-faq-filter]');
    if (faqFilterBtn) {
      faqFilter = faqFilterBtn.getAttribute('data-faq-filter');
      renderFaqFilters();
      renderFaqs();
      return;
    }

    var modFilter = e.target.closest('[data-mod-filter]');
    if (modFilter) {
      document.querySelectorAll('[data-mod-filter]').forEach(function (b) {
        b.classList.toggle('is-active', b === modFilter);
      });
      renderModules(modFilter.getAttribute('data-mod-filter'));
    }
  });

  /* Scroll spy + back to top */
  var sideLinks = Array.prototype.slice.call(document.querySelectorAll('.hc-side__link'));
  var sections = sideLinks.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  function onScroll() {
    var y = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= y) current = sec;
    });
    sideLinks.forEach(function (link) {
      link.classList.toggle('is-active', current && link.getAttribute('href') === '#' + current.id);
    });
    document.getElementById('hcTop').classList.toggle('is-visible', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  document.getElementById('hcTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

  /* Init */
  renderPopular();
  renderRecent();
  renderModules('all');
  renderSteps();
  renderKnowledge();
  renderVideos();
  renderFaqFilters();
  renderFaqs();
  renderTrouble();
  renderDownloads();
  renderUpdates();
  onScroll();
})();
