/**
 * MSME services grid.
 * Native: msme.html / js/msme.js only.
 * Related: product modules that support MSME operations.
 * Cards are real links — click opens the page.
 * Inventory/warehouse not listed (coming soon on MSME FAQ).
 */
(function () {
  'use strict';

  var nativeServices = [
    {
      id: 'command',
      title: 'Unified operations',
      blurb: 'One login for HR, CRM, billing, and projects.',
      icon: 'hub',
      href: 'msme.html',
      cta: 'Open MSME'
    },
    {
      id: 'crm',
      title: 'CRM & sales',
      blurb: 'Leads, pipeline, quotations, and customer relationships end-to-end.',
      icon: 'groups',
      href: 'msme.html',
      cta: 'Open MSME'
    },
    {
      id: 'billing',
      title: 'Billing & GST',
      blurb: 'Invoices, receipts, ledgers, and GST reports in one flow.',
      icon: 'receipt_long',
      href: 'msme.html',
      cta: 'Open MSME'
    },
    {
      id: 'hrms',
      title: 'HRMS & payroll',
      blurb: 'Employees, attendance, and payroll with PF, ESI, TDS, and payslips.',
      icon: 'badge',
      href: 'msme.html',
      cta: 'Open MSME'
    },
    {
      id: 'projects',
      title: 'Projects & tasks',
      blurb: 'Plan and deliver work with tasks, worklogs, billing, and profitability.',
      icon: 'view_kanban',
      href: 'msme.html',
      cta: 'Open MSME'
    },
    {
      id: 'docs',
      title: 'Documents',
      blurb: 'Agreements, registers, and a secure document vault for your team.',
      icon: 'folder',
      href: 'msme.html',
      cta: 'Open MSME'
    },
    {
      id: 'field',
      title: 'Team access on the go',
      blurb: 'Follow-ups, tasks, and documents without waiting on a desktop.',
      icon: 'smartphone',
      href: 'msme.html',
      cta: 'Open MSME'
    },
    {
      id: 'automate',
      title: 'Workflow automation',
      blurb: 'Quote-to-invoice, payroll cycles, and task SLAs.',
      icon: 'autorenew',
      href: 'msme.html',
      cta: 'Open MSME'
    }
  ];

  var relatedServices = [
    {
      id: 'crm-mod',
      title: 'CRM',
      blurb: 'Leads, pipeline, and customer relationships.',
      icon: 'filter_alt',
      href: 'crm.html',
      cta: 'Open CRM'
    },
    {
      id: 'billing-mod',
      title: 'Billing',
      blurb: 'Invoices, receipts, ledgers, and digital payments.',
      icon: 'receipt_long',
      href: 'billing.html',
      cta: 'Open Billing'
    },
    {
      id: 'hrms-mod',
      title: 'HRMS',
      blurb: 'Hire, onboard, and manage your workforce from one hub.',
      icon: 'badge',
      href: 'hrms.html',
      cta: 'Open HRMS'
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
      id: 'project-mgmt',
      title: 'Project Management',
      blurb: 'Tasks, timesheets, billing, and profit visibility.',
      icon: 'task_alt',
      href: 'project_management.html',
      cta: 'Open Project Management'
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
      blurb: 'Live overview of revenue, attendance, and projects.',
      icon: 'space_dashboard',
      href: 'dashboard.html',
      cta: 'Open Dashboard'
    }
  ];

  var nativeGrid = document.getElementById('msmeNativeGrid');
  var relatedGrid = document.getElementById('msmeRelatedGrid');
  var nativeBlock = document.getElementById('msmeNativeBlock');
  var relatedBlock = document.getElementById('msmeRelatedBlock');
  var filters = document.getElementById('msmeFilters');

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function renderCards(container, items) {
    if (!container) return;
    container.innerHTML = items.map(function (s, i) {
      return ''
        + '<a class="svc-card" href="' + escapeHtml(s.href) + '" id="msme-card-' + escapeHtml(s.id) + '"'
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
    var el = document.getElementById('msme-card-' + hash);
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
