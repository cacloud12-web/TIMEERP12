/**
 * CA Firms services grid.
 * Native: CA.html / js/ca.js only.
 * Related: modules that support CA practice operations.
 * Cards are real links — click opens the page.
 */
(function () {
  'use strict';

  var nativeServices = [
    {
      id: 'portal',
      title: 'Client portal',
      blurb: 'Branded login for documents, e-sign, and payments.',
      icon: 'groups',
      href: 'CA.html',
      cta: 'Open CA Firms'
    },
    {
      id: 'compliance',
      title: 'Compliance hub',
      blurb: 'GST, TDS & income tax due dates, reminders, and status boards.',
      icon: 'gavel',
      href: 'CA.html',
      cta: 'Open CA Firms'
    },
    {
      id: 'billing',
      title: 'Practice billing',
      blurb: 'Time tracking, invoicing, online collections, and retainers.',
      icon: 'payments',
      href: 'CA.html',
      cta: 'Open CA Firms'
    },
    {
      id: 'team',
      title: 'Team workflows',
      blurb: 'Tasks by department, @mentions, SLAs, and partner review.',
      icon: 'group_work',
      href: 'CA.html',
      cta: 'Open CA Firms'
    },
    {
      id: 'tax',
      title: 'Tax & GST',
      blurb: 'GSTR-1/3B, TDS, ITR pipelines, and client-wise calendars.',
      icon: 'receipt_long',
      href: 'CA.html',
      cta: 'Open CA Firms'
    },
    {
      id: 'audit',
      title: 'Audit & assurance',
      blurb: 'Engagement planning, workpapers, review, and trial balance import.',
      icon: 'fact_check',
      href: 'CA.html',
      cta: 'Open CA Firms'
    },
    {
      id: 'documents',
      title: 'Document vault',
      blurb: 'Secure per-client storage with version history and portal sharing.',
      icon: 'folder_shared',
      href: 'CA.html',
      cta: 'Open CA Firms'
    },
    {
      id: 'automate',
      title: 'Workflow automation',
      blurb: 'Pipelines for tax, audit, and payroll with SLAs and reminders.',
      icon: 'autorenew',
      href: 'CA.html',
      cta: 'Open CA Firms'
    },
    {
      id: 'payroll-clients',
      title: 'Client payroll',
      blurb: 'Multi-client payroll, PF/ESI/PT, Form 16, and employee self-service.',
      icon: 'account_balance_wallet',
      href: 'CA.html',
      cta: 'Open CA Firms'
    }
  ];

  var relatedServices = [
    {
      id: 'crm',
      title: 'CRM',
      blurb: 'Leads, pipeline, and client portal.',
      icon: 'filter_alt',
      href: 'crm.html',
      cta: 'Open CRM'
    },
    {
      id: 'billing-mod',
      title: 'Billing',
      blurb: 'Invoices, receipts, and digital payments.',
      icon: 'receipt_long',
      href: 'billing.html',
      cta: 'Open Billing'
    },
    {
      id: 'documents-mod',
      title: 'Documents',
      blurb: 'Vault, sharing, versioning, and approvals.',
      icon: 'folder_open',
      href: 'document_management.html',
      cta: 'Open Documents'
    },
    {
      id: 'compliance-mod',
      title: 'Compliance',
      blurb: 'GST, TDS, ESIC, EPFO, and gratuity.',
      icon: 'policy',
      href: 'compliance_management.html',
      cta: 'Open Compliance'
    },
    {
      id: 'project-mgmt',
      title: 'Project Management',
      blurb: 'Tasks, timesheets, and billing for multi-client work.',
      icon: 'task_alt',
      href: 'project_management.html',
      cta: 'Open Project Management'
    },
    {
      id: 'communication',
      title: 'Communication',
      blurb: 'Email, SMS, and WhatsApp messaging.',
      icon: 'forum',
      href: 'communication.html',
      cta: 'Open Communication'
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      blurb: 'Live overview of revenue and business status.',
      icon: 'space_dashboard',
      href: 'dashboard.html',
      cta: 'Open Dashboard'
    },
    {
      id: 'payroll',
      title: 'Payroll',
      blurb: 'Salary processing with PF, ESI, and TDS support.',
      icon: 'payments',
      href: 'payroll.html',
      cta: 'Open Payroll'
    },
    {
      id: 'hrms',
      title: 'HRMS',
      blurb: 'Attendance, leave, expense, and workforce ops.',
      icon: 'badge',
      href: 'hrms.html',
      cta: 'Open HRMS'
    }
  ];

  var nativeGrid = document.getElementById('caNativeGrid');
  var relatedGrid = document.getElementById('caRelatedGrid');
  var nativeBlock = document.getElementById('caNativeBlock');
  var relatedBlock = document.getElementById('caRelatedBlock');
  var filters = document.getElementById('caFilters');

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function renderCards(container, items) {
    if (!container) return;
    container.innerHTML = items.map(function (s, i) {
      return ''
        + '<a class="svc-card" href="' + escapeHtml(s.href) + '" id="ca-card-' + escapeHtml(s.id) + '"'
        + ' style="--i:' + i + '">'
        +   '<span class="svc-card__icon" aria-hidden="true">'
        +     '<span class="material-symbols-outlined">' + escapeHtml(s.icon) + '</span>'
        +   '</span>'
        +   '<h3>' + escapeHtml(s.title) + '</h3>'
        +   '<p>' + escapeHtml(s.blurb) + '</p>'
        +   '<span class="svc-card__cta">' + escapeHtml(s.cta)
        +     '<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>'
        +   '</span>'
        + '</a>';
    }).join('');
  }

  function setFilter(filter) {
    var mode = filter || 'all';
    if (filters) {
      filters.querySelectorAll('.svc-filter').forEach(function (btn) {
        var on = btn.getAttribute('data-filter') === mode;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
    if (nativeBlock) nativeBlock.hidden = mode === 'related';
    if (relatedBlock) relatedBlock.hidden = mode === 'native';
  }

  if (filters) {
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.svc-filter');
      if (!btn) return;
      setFilter(btn.getAttribute('data-filter') || 'all');
    });
  }

  renderCards(nativeGrid, nativeServices);
  renderCards(relatedGrid, relatedServices);
  setFilter('all');

  var hash = (window.location.hash || '').replace(/^#/, '');
  if (hash) {
    var el = document.getElementById('ca-card-' + hash);
    if (el) {
      if (relatedServices.some(function (s) { return s.id === hash; })) setFilter('related');
      else if (nativeServices.some(function (s) { return s.id === hash; })) setFilter('native');
      requestAnimationFrame(function () {
        el.classList.add('is-active');
        el.focus({ preventScroll: false });
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }
})();
