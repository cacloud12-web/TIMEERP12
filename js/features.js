/**
 * TimeERP Features explorer
 * Capability copy aligned with index modules, product landings, and site-nav product data.
 */
(function () {
  'use strict';

  var FEATURES = [
    {
      id: 'dashboard',
      cat: 'platform',
      name: 'Dashboard',
      icon: 'dashboard',
      short: 'Real-time business overview with revenue, attendance, and project status.',
      desc: 'Real-time business overview with revenue analytics, attendance summary, project status, alerts, custom widgets, and exports in one view.',
      caps: ['Business Overview', 'Revenue Analytics', 'Attendance Summary', 'Project Status', 'Alerts', 'Custom Widgets', 'Exports'],
      benefit: 'Leaders see workforce and delivery health without logging into every module separately.',
      href: 'dashboard.html',
      cta: 'Explore Dashboard'
    },
    {
      id: 'hrms',
      cat: 'people',
      name: 'HRMS',
      icon: 'groups',
      short: 'Hire, onboard, manage, and retain people from one HR hub.',
      desc: 'Hire, onboard, manage, and retain your workforce from one intelligent HR hub with employee records, recruitment, onboarding, and policies.',
      caps: ['Employees', 'Recruitment', 'Onboarding', 'Policies', 'Designations & permissions', 'Employee profiles'],
      benefit: 'HR and managers share one employee truth for payroll, leave, and attendance.',
      href: 'hrms.html',
      cta: 'Explore HRMS'
    },
    {
      id: 'payroll',
      cat: 'people',
      name: 'Payroll',
      icon: 'payments',
      short: 'Salary processing, statutory compliance, and payslips.',
      desc: 'Automate salary processing, statutory compliance, and payslip distribution with PF, ESI, and TDS support for Indian operations.',
      caps: ['Salary Structure', 'PF & ESI', 'TDS', 'Payslips', 'Payroll reports'],
      benefit: 'Payroll stays aligned with attendance, leave, and statutory report modules.',
      href: 'payroll.html',
      cta: 'Explore Payroll'
    },
    {
      id: 'attendance',
      cat: 'people',
      name: 'Attendance',
      icon: 'fingerprint',
      short: 'Daily, biometric, geo, and shift-based workforce tracking.',
      desc: 'Biometric, geo, and shift-based attendance with real-time tracking for offices and field teams, including late entry, overtime, lock, and approvals.',
      caps: ['Daily Attendance', 'Shift Management', 'Biometric', 'Geo attendance', 'Late Entry', 'Overtime Tracking', 'Attendance Lock', 'Approvals & reports'],
      benefit: 'Shift planning and automated punch trails feed payroll and utilisation honestly.',
      href: 'attendance.html',
      cta: 'Explore Attendance'
    },
    {
      id: 'leave',
      cat: 'people',
      name: 'Leave Management',
      icon: 'beach_access',
      short: 'Leave types, balances, approvals, and holiday calendars.',
      desc: 'Streamlined leave requests, multi-level approvals, balances, and holiday calendars so managers and employees share the same leave picture.',
      caps: ['Leave Types', 'Approvals', 'Holiday Calendar', 'Balance tracking'],
      benefit: 'Attendance and timesheet views stay accurate when leave is approved in-system.',
      href: 'leave.html',
      cta: 'Explore Leave'
    },
    {
      id: 'expense',
      cat: 'finance',
      name: 'Expense',
      icon: 'receipt_long',
      short: 'Claims, travel, reimbursements, and spend control.',
      desc: 'Capture claims, travel and site spends, route multi-level approvals, reimburse employees, and keep audit-ready receipt trails.',
      caps: ['Claims', 'Travel', 'Reimbursement', 'Reports', 'Multi-level approvals'],
      benefit: 'Managers and finance approve the same claim trail without WhatsApp attachments.',
      href: 'expense.html',
      cta: 'Explore Expense'
    },
    {
      id: 'timesheet',
      cat: 'people',
      name: 'Timesheet',
      icon: 'schedule',
      short: 'Billable hours, project effort, and weekly approvals.',
      desc: 'Track daily and weekly time, billable and non-billable hours, project and task entries, multi-level approvals, utilisation, and Excel/PDF export.',
      caps: ['Daily & Weekly Timesheet', 'Billable Hours', 'Project / task wise entry', 'Multi-level approval', 'Utilisation & productivity reports', 'Leave integration', 'Export Excel/PDF'],
      benefit: 'Professional services convert effort to billing with manager-approved time.',
      href: 'timesheet.html',
      cta: 'Explore Timesheet'
    },
    {
      id: 'crm',
      cat: 'sales',
      name: 'CRM',
      icon: 'handshake',
      short: 'Leads, pipeline, quotations, and follow-ups.',
      desc: 'Manage leads, pipeline, customer relationships, quotations, tasks, and follow-ups to close more deals with a shared customer database.',
      caps: ['Lead Management', 'Sales Pipeline', 'Customer Database', 'Quotations', 'Follow-ups', 'Activity Timeline', 'Customer Portal'],
      benefit: 'Sales and delivery see the same client record from first lead to project close.',
      href: 'crm.html',
      cta: 'Explore CRM'
    },
    {
      id: 'communication',
      cat: 'sales',
      name: 'Communication Center',
      icon: 'forum',
      short: 'Email, SMS, WhatsApp notifications and campaigns.',
      desc: 'Unified notifications and campaign tools across email, SMS, and WhatsApp with templates, broadcasts, and delivery logs.',
      caps: ['Email', 'SMS', 'WhatsApp', 'Campaigns', 'Templates', 'Notifications', 'Logs'],
      benefit: 'Operational messages stay in the ERP tenancy instead of scattered personal chats.',
      href: 'communication.html',
      cta: 'Explore Communication'
    },
    {
      id: 'whatsapp',
      cat: 'sales',
      name: 'WhatsApp API',
      icon: 'chat',
      short: 'Templates, automation, webhooks, and delivery reports.',
      desc: 'Enterprise WhatsApp automation with template messaging, webhooks, automation rules, and delivery reports for customer outreach.',
      caps: ['Templates', 'Webhooks', 'Automation', 'Delivery Reports'],
      benefit: 'Marketing and service teams use approved business messaging patterns on WhatsApp.',
      href: 'whatsapp_api.html',
      cta: 'Explore WhatsApp API'
    },
    {
      id: 'marketing',
      cat: 'sales',
      name: 'Marketing',
      icon: 'campaign',
      short: 'Leads, website, email, SMS, WhatsApp, and ads.',
      desc: 'Manage websites, leads, community, email marketing, WhatsApp and SMS campaigns, Google Ads, and broadcasts from one marketing workspace.',
      caps: ['Website Management', 'Lead Management', 'Email Marketing', 'WhatsApp Marketing', 'SMS Campaigns', 'Broadcast Campaigns', 'Google Ads'],
      benefit: 'Campaigns and lead capture stay connected to CRM follow-up.',
      href: 'market.html',
      cta: 'Explore Marketing'
    },
    {
      id: 'documents',
      cat: 'documents',
      name: 'Document Vault',
      icon: 'folder_open',
      short: 'Vault, agreements, sharing, versions, and DSC tracker.',
      desc: 'Store, organize, and control business documents with secure sharing, version tracking, approvals, inward/outward registers, DSC tracker, and fixed asset register.',
      caps: ['Store Documents', 'Create Agreement', 'Inward / Outward', 'Sharing & version control', 'Approval workflow', 'DSC Tracker', 'Fixed Asset Register'],
      benefit: 'CA firms and teams keep compliance-ready files under role-based control.',
      href: 'document_management.html',
      cta: 'Explore Document Vault'
    },
    {
      id: 'projects',
      cat: 'projects',
      name: 'Project Management',
      icon: 'view_kanban',
      short: 'Tasks, multi-client work, timesheets, and P&L.',
      desc: 'Plan, assign, and deliver client work with multi-assign, recurring tasks, mobile access, task timesheets, billing, and profit/loss visibility.',
      caps: ['Create Task', 'Multi Assign / Multi Client', 'Recurring Task', 'Task Timesheet', 'Task Billing', 'Task Permissions', 'Profit / Loss Report', 'Mobile task access'],
      benefit: 'Delivery managers see effort and billable outcomes on the same project record.',
      href: 'project_management.html',
      cta: 'Explore Projects'
    },
    {
      id: 'billing',
      cat: 'finance',
      name: 'Billing Management',
      icon: 'request_quote',
      short: 'Invoices, receipts, ledger, CN/DN, and UPI AutoPay.',
      desc: 'Configure billing setup and branches, then manage invoices, proforma, receipts, ledgers, adjustments, credit/debit notes, BharatPe, and UPI AutoPay.',
      caps: ['Invoice & Proforma', 'Receipt & Ledger', 'Credit / Debit Notes', 'Branch setup', 'BharatPe Integration', 'UPI AutoPay', 'Reported Transactions'],
      benefit: 'Finance collects against project and CRM records with digital payment rails.',
      href: 'billing.html',
      cta: 'Explore Billing'
    },
    {
      id: 'compliance',
      cat: 'documents',
      name: 'Compliance Management',
      icon: 'manage_search',
      short: 'GST, ESIC, EPFO, gratuity, and TDS reports.',
      desc: 'Stay audit-ready with centralized statutory reporting for GST, ESIC, EPFO, gratuity, and TDS across the organisation.',
      caps: ['GST Reports', 'ESIC Reports', 'EPFO Reports', 'Gratuity Management', 'TDS Reports'],
      benefit: 'Statutory reporting readiness draws from operational records already in TimeERP.',
      href: 'compliance_management.html',
      cta: 'Explore Compliance'
    },
    {
      id: 'inventory',
      cat: 'projects',
      name: 'Inventory',
      icon: 'inventory_2',
      short: 'Stock, warehouses, purchase orders, and reports.',
      desc: 'Stock management and warehouse operations across sites and branches with purchase orders and inventory reports.',
      caps: ['Stock Tracking', 'Warehouses', 'Purchase Orders', 'Reports'],
      benefit: 'Construction and MSME teams keep site materials tied to business operations.',
      href: 'inventory_management.html',
      cta: 'Explore Inventory'
    },
    {
      id: 'website',
      cat: 'sales',
      name: 'Website',
      icon: 'language',
      short: 'Landing pages, blog, builder, and SEO tools.',
      desc: 'Build landing pages, blogs, and forms with website builder capabilities and built-in SEO tools for firm presence.',
      caps: ['Website Builder', 'Landing Pages', 'Blog', 'SEO'],
      benefit: 'Marketing can publish and capture demand without leaving the product family.',
      href: 'website.html',
      cta: 'Explore Website'
    },
    {
      id: 'setup',
      cat: 'platform',
      name: 'Setup',
      icon: 'settings',
      short: 'Org profile, roles, branches, integrations, defaults.',
      desc: 'Configure organisation profile, roles and permissions, branches, departments, defaults, integrations, preferences, and reset options from one control panel.',
      caps: ['Organization Profile', 'Roles & Permissions', 'Branches', 'Departments', 'Integrations', 'Defaults', 'Preferences'],
      benefit: 'Admins govern multi-branch access once for every module that follows.',
      href: 'setup.html',
      cta: 'Explore Setup'
    },
    {
      id: 'security',
      cat: 'platform',
      name: 'Security & Trust',
      icon: 'shield',
      short: 'Cloud, SSL, backups, access control, GDPR-ready privacy.',
      desc: 'Cloud ERP with SSL encryption, automatic backups, role-based access, document controls, and GDPR-ready privacy practices described on our Security & Trust page.',
      caps: ['Cloud / AWS family messaging', 'SSL encryption', 'Automatic backups', '99.8% uptime target', 'Role-based access', 'GDPR Ready posture'],
      benefit: 'Procurement and IT can review trust claims without inventing certification logos.',
      href: 'security.html',
      cta: 'View Security'
    }
  ];

  var activeId = 'attendance';
  var activeCat = 'all';
  var query = '';

  function el(id) { return document.getElementById(id); }

  function findFeature(id) {
    for (var i = 0; i < FEATURES.length; i++) {
      if (FEATURES[i].id === id) return FEATURES[i];
    }
    return FEATURES[0];
  }

  function matches(f) {
    if (activeCat !== 'all' && f.cat !== activeCat) return false;
    if (!query) return true;
    var q = query.toLowerCase();
    var blob = (f.name + ' ' + f.short + ' ' + f.desc + ' ' + f.caps.join(' ')).toLowerCase();
    return blob.indexOf(q) !== -1;
  }

  function renderGrid() {
    var grid = el('ft-feature-grid');
    var empty = el('ft-feature-empty');
    var countEl = el('ft-count');
    if (!grid) return;
    var html = '';
    var visible = 0;
    FEATURES.forEach(function (f) {
      var show = matches(f);
      if (show) visible++;
      var tags = f.caps.slice(0, 3).map(function (c) {
        return '<span class="ft-row__tag">' + c + '</span>';
      }).join('');
      html += '<button type="button" class="ft-row' + (f.id === activeId ? ' is-active' : '') + (show ? '' : ' is-hidden') + '" data-feature-id="' + f.id + '" role="option" aria-selected="' + (f.id === activeId ? 'true' : 'false') + '">'
        + '<span class="ft-row__icon" aria-hidden="true"><span class="material-symbols-outlined">' + f.icon + '</span></span>'
        + '<span class="ft-row__body">'
        +   '<span class="ft-row__meta">'
        +     '<span class="ft-row__cat">' + catLabel(f.cat) + '</span>'
        +     '<span class="ft-row__name">' + f.name + '</span>'
        +   '</span>'
        +   '<span class="ft-row__desc">' + f.short + '</span>'
        +   '<span class="ft-row__tags">' + tags + '</span>'
        + '</span>'
        + '<span class="ft-row__chevron material-symbols-outlined" aria-hidden="true">chevron_right</span>'
        + '</button>';
    });
    grid.innerHTML = html;
    if (empty) empty.classList.toggle('is-visible', visible === 0);
    if (countEl) {
      countEl.textContent = visible === FEATURES.length
        ? visible + ' modules'
        : visible + ' of ' + FEATURES.length + ' modules';
    }

    grid.querySelectorAll('.ft-row').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeId = btn.getAttribute('data-feature-id');
        renderGrid();
        renderPanel(true);
      });
    });
  }

  function catLabel(cat) {
    var map = {
      people: 'People & HR',
      finance: 'Finance',
      projects: 'Projects & ops',
      sales: 'Sales & growth',
      documents: 'Docs & compliance',
      platform: 'Platform'
    };
    return map[cat] || cat;
  }

  function renderPanel(animate) {
    var panel = el('ft-panel-inner');
    if (!panel) return;
    var f = findFeature(activeId);

    function paint() {
      var chips = f.caps.map(function (c) {
        return '<li class="ft-panel__chip"><span class="material-symbols-outlined" aria-hidden="true">check</span>' + c + '</li>';
      }).join('');
      panel.innerHTML = ''
        + '<p class="ft-panel__kicker">Module detail</p>'
        + '<div class="ft-panel__top">'
        +   '<div class="ft-panel__icon" aria-hidden="true"><span class="material-symbols-outlined">' + f.icon + '</span></div>'
        +   '<div class="ft-panel__heading">'
        +     '<span class="ft-panel__badge">' + catLabel(f.cat) + '</span>'
        +     '<h3 class="ft-panel__name" id="ft-panel-title">' + f.name + '</h3>'
        +   '</div>'
        + '</div>'
        + '<p class="ft-panel__desc">' + f.desc + '</p>'
        + '<div class="ft-panel__block">'
        +   '<span class="ft-panel__label">What you get</span>'
        +   '<ul class="ft-panel__chips">' + chips + '</ul>'
        + '</div>'
        + '<div class="ft-panel__benefit">'
        +   '<span class="ft-panel__label">How it helps</span>'
        +   '<p>' + f.benefit + '</p>'
        + '</div>'
        + '<div class="ft-panel__actions">'
        +   '<a class="ft-btn ft-btn--primary" href="' + f.href + '">' + f.cta + ' <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a>'
        +   '<a class="ft-btn ft-btn--ghost" href="#" data-book-demo>Book Demo</a>'
        + '</div>';
      panel.classList.remove('is-updating');
    }

    if (animate) {
      panel.classList.add('is-updating');
      setTimeout(paint, 180);
    } else {
      paint();
    }
  }

  function setCategory(cat) {
    activeCat = cat || 'all';
    document.querySelectorAll('.ft-journey__btn').forEach(function (b) {
      var on = b.getAttribute('data-cat') === activeCat;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    document.querySelectorAll('.ft-filter').forEach(function (b) {
      var on = b.getAttribute('data-cat') === activeCat;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    renderGrid();
    var still = false;
    for (var i = 0; i < FEATURES.length; i++) {
      if (FEATURES[i].id === activeId && matches(FEATURES[i])) { still = true; break; }
    }
    if (!still) {
      for (var j = 0; j < FEATURES.length; j++) {
        if (matches(FEATURES[j])) { activeId = FEATURES[j].id; break; }
      }
      renderPanel(true);
    }
  }

  function initFilters() {
    document.querySelectorAll('.ft-journey__btn, .ft-filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setCategory(btn.getAttribute('data-cat') || 'all');
      });
    });
  }

  function initSearch() {
    var input = el('ft-search');
    if (!input) return;
    input.addEventListener('input', function () {
      query = input.value.trim();
      renderGrid();
    });
  }

  function initFaq() {
    document.querySelectorAll('.ft-faq__item').forEach(function (item) {
      var trigger = item.querySelector('.ft-faq__trigger');
      var panel = item.querySelector('.ft-faq__panel');
      if (!trigger || !panel) return;
      trigger.addEventListener('click', function () {
        var open = item.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0';
      });
    });
  }

  function initReveal() {
    var nodes = document.querySelectorAll('.ft-reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    nodes.forEach(function (n) { io.observe(n); });
  }

  function initHeroParallax() {
    var hero = document.querySelector('.ft-hero');
    var space = document.querySelector('.ft-hero__space');
    var horizon = document.querySelector('.ft-hero__horizon');
    var orbits = document.querySelector('.ft-hero__orbits');
    if (!hero || !space || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    var raf = 0;
    var tx = 0;
    var ty = 0;
    var cx = 0;
    var cy = 0;

    function frame() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      space.style.transform = 'translate3d(' + (cx * 10) + 'px,' + (cy * 8) + 'px,0)';
      if (horizon) horizon.style.transform = 'translate(calc(-50% + ' + (cx * 14) + 'px),' + (cy * 10) + 'px)';
      if (orbits) orbits.style.transform = 'translate3d(' + (cx * -8) + 'px,' + (cy * -6) + 'px,0)';
      raf = requestAnimationFrame(frame);
    }

    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    }, { passive: true });
    hero.addEventListener('mouseleave', function () {
      tx = 0;
      ty = 0;
    }, { passive: true });
    raf = requestAnimationFrame(frame);
  }

  function init() {
    renderGrid();
    renderPanel(false);
    initFilters();
    initSearch();
    initFaq();
    initReveal();
    initHeroParallax();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
