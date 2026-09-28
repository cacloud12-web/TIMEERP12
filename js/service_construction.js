/**
 * Construction services grid.
 * Native: construction.html / js/construction.js only.
 * Related: product modules that support construction ops.
 * Cards are real links — click opens the page.
 */
(function () {
  'use strict';

  var nativeServices = [
    {
      id: 'command',
      title: 'Site command',
      blurb: 'One dashboard for BOQ, budgets, labour, and subcontractors across sites.',
      icon: 'dashboard',
      href: 'construction.html',
      cta: 'Open Construction'
    },
    {
      id: 'boq',
      title: 'BOQ & costing',
      blurb: 'Import BOQ lines, track committed costs, and see live margin.',
      icon: 'calculate',
      href: 'construction.html',
      cta: 'Open Construction'
    },
    {
      id: 'materials',
      title: 'Materials & GRN',
      blurb: 'Requisitions, GRN, and site stores tied to BOQ consumption.',
      icon: 'inventory_2',
      href: 'construction.html',
      cta: 'Open Construction'
    },
    {
      id: 'subcontract',
      title: 'Subcontractors',
      blurb: 'Work orders, RA claims, retention, muster roll, and TDS.',
      icon: 'handshake',
      href: 'construction.html',
      cta: 'Open Construction'
    },
    {
      id: 'ra-billing',
      title: 'RA billing',
      blurb: 'Owner RA bills from measured work and GST on works contract.',
      icon: 'request_quote',
      href: 'construction.html',
      cta: 'Open Construction'
    },
    {
      id: 'field',
      title: 'Field mobile',
      blurb: 'DPR, material issue, indents, and progress photos from site.',
      icon: 'engineering',
      href: 'construction.html',
      cta: 'Open Construction'
    }
  ];

  var relatedServices = [
    {
      id: 'project-mgmt',
      title: 'Project Management',
      blurb: 'Plan, assign, and deliver work with tasks, timesheets, and billing.',
      icon: 'task_alt',
      href: 'project_management.html',
      cta: 'Open Project Management'
    },
    {
      id: 'billing',
      title: 'Billing',
      blurb: 'Invoices, receipts, ledgers, and digital payments.',
      icon: 'payments',
      href: 'billing.html',
      cta: 'Open Billing'
    },
    {
      id: 'crm',
      title: 'CRM',
      blurb: 'Leads, pipeline, and client portal.',
      icon: 'filter_alt',
      href: 'crm.html',
      cta: 'Open CRM'
    },
    {
      id: 'compliance',
      title: 'Compliance',
      blurb: 'GST, TDS, ESIC, EPFO, and gratuity.',
      icon: 'policy',
      href: 'compliance_management.html',
      cta: 'Open Compliance'
    },
    {
      id: 'documents',
      title: 'Documents',
      blurb: 'Vault, sharing, versioning, and approvals.',
      icon: 'folder_open',
      href: 'document_management.html',
      cta: 'Open Documents'
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      blurb: 'Live overview of revenue, attendance, and projects.',
      icon: 'space_dashboard',
      href: 'dashboard.html',
      cta: 'Open Dashboard'
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
      id: 'hrms',
      title: 'HRMS',
      blurb: 'Attendance, leave, expense, timesheet, and workforce ops.',
      icon: 'badge',
      href: 'hrms.html',
      cta: 'Open HRMS'
    },
    {
      id: 'payroll',
      title: 'Payroll',
      blurb: 'Salary processing with PF, ESI, and TDS support.',
      icon: 'account_balance_wallet',
      href: 'payroll.html',
      cta: 'Open Payroll'
    },
    {
      id: 'real-estate',
      title: 'Real Estate',
      blurb: 'Project lifecycle, RERA, sales, and site ops for developers.',
      icon: 'apartment',
      href: 'service_real_estate.html',
      cta: 'Open Real Estate Services'
    }
  ];

  var nativeGrid = document.getElementById('cnNativeGrid');
  var relatedGrid = document.getElementById('cnRelatedGrid');
  var nativeBlock = document.getElementById('cnNativeBlock');
  var relatedBlock = document.getElementById('cnRelatedBlock');
  var filters = document.getElementById('cnFilters');

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function renderCards(container, items) {
    if (!container) return;
    container.innerHTML = items.map(function (s, i) {
      return ''
        + '<a class="svc-card" href="' + escapeHtml(s.href) + '" id="cn-card-' + escapeHtml(s.id) + '"'
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
    var el = document.getElementById('cn-card-' + hash);
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
