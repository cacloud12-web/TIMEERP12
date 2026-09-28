/**
 * Professional Services grid.
 * No dedicated professional.html industry pack exists.
 * Native cards link to real product modules that serve service firms
 * (project_management, billing, hrms, documents, crm).
 */
(function () {
  'use strict';

  var nativeServices = [
    {
      id: 'timesheet',
      title: 'Task Timesheet',
      blurb: 'Capture effort against tasks for delivery and billing visibility.',
      icon: 'schedule',
      href: 'project_management.html',
      cta: 'Open Project Management'
    },
    {
      id: 'billing',
      title: 'Client billing',
      blurb: 'Invoices, receipts, and ledgers for professional services firms.',
      icon: 'receipt_long',
      href: 'billing.html',
      cta: 'Open Billing'
    },
    {
      id: 'delivery',
      title: 'Project delivery',
      blurb: 'Multi-client work for service teams — tasks, billing, and profit visibility.',
      icon: 'view_kanban',
      href: 'project_management.html',
      cta: 'Open Project Management'
    },
    {
      id: 'productivity',
      title: 'Team productivity',
      blurb: 'Track billable hours and productivity with weekly timesheet approvals.',
      icon: 'trending_up',
      href: 'hrms.html',
      cta: 'Open HRMS'
    },
    {
      id: 'documents',
      title: 'Document vault',
      blurb: 'Secure sharing, versioning, and approvals for professional services.',
      icon: 'folder',
      href: 'document_management.html',
      cta: 'Open Documents'
    },
    {
      id: 'clients',
      title: 'Client CRM',
      blurb: 'Leads, pipeline, and client portal for documents and collaboration.',
      icon: 'handshake',
      href: 'crm.html',
      cta: 'Open CRM'
    }
  ];

  var relatedServices = [
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
      id: 'payroll',
      title: 'Payroll',
      blurb: 'Salary processing with PF, ESI, and TDS support.',
      icon: 'payments',
      href: 'payroll.html',
      cta: 'Open Payroll'
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
      id: 'consultants',
      title: 'Implementation consulting',
      blurb: 'Guided setup for HRMS, CRM, payroll, billing, and projects.',
      icon: 'support_agent',
      href: 'consultants.html',
      cta: 'Talk to Consultant'
    },
    {
      id: 'sales',
      title: 'Contact Sales',
      blurb: 'Get a tailored walkthrough for your service firm.',
      icon: 'contact_mail',
      href: 'contact_sales.html',
      cta: 'Contact Sales'
    }
  ];

  var nativeGrid = document.getElementById('psNativeGrid');
  var relatedGrid = document.getElementById('psRelatedGrid');
  var nativeBlock = document.getElementById('psNativeBlock');
  var relatedBlock = document.getElementById('psRelatedBlock');
  var filters = document.getElementById('psFilters');

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function renderCards(container, items) {
    if (!container) return;
    container.innerHTML = items.map(function (s, i) {
      return ''
        + '<a class="svc-card" href="' + escapeHtml(s.href) + '" id="ps-card-' + escapeHtml(s.id) + '"'
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
    var el = document.getElementById('ps-card-' + hash);
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
