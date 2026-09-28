/**
 * Clean Real Estate services grid.
 * Cards are real links — CRM opens crm.html on click.
 */
(function () {
  'use strict';

  var nativeServices = [
    {
      id: 'portfolio',
      title: 'Portfolio hub',
      blurb: 'Projects, land parcels, and JV stakes in one view.',
      icon: 'apartment',
      href: 'real_Estate.html',
      cta: 'Open Real Estate'
    },
    {
      id: 'lifecycle',
      title: 'Project lifecycle',
      blurb: 'Track progress from land acquisition to possession.',
      icon: 'timeline',
      href: 'real_Estate.html',
      cta: 'Open Real Estate'
    },
    {
      id: 'compliance',
      title: 'RERA & compliance',
      blurb: 'RERA filings, GST, TDS, and audit status by entity.',
      icon: 'gavel',
      href: 'real_Estate.html',
      cta: 'Open Real Estate'
    },
    {
      id: 'sales',
      title: 'Sales & portal',
      blurb: 'Leads, unit inventory, bookings, and commissions.',
      icon: 'groups',
      href: 'real_Estate.html',
      cta: 'Open Real Estate'
    },
    {
      id: 'finance',
      title: 'Finance & tax',
      blurb: 'GST billing, TDS deductions, and Tally export.',
      icon: 'receipt_long',
      href: 'real_Estate.html',
      cta: 'Open Real Estate'
    },
    {
      id: 'siteops',
      title: 'Site & vendors',
      blurb: 'Material stock, labour, and purchase orders.',
      icon: 'engineering',
      href: 'real_Estate.html',
      cta: 'Open Real Estate'
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
      id: 'billing',
      title: 'Billing',
      blurb: 'Invoices, receipts, and digital payments.',
      icon: 'payments',
      href: 'billing.html',
      cta: 'Open Billing'
    },
    {
      id: 'compliance-mgmt',
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
      blurb: 'Live overview of revenue and projects.',
      icon: 'dashboard',
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
      id: 'construction',
      title: 'Construction',
      blurb: 'BOQ, materials, and RA bills for builders.',
      icon: 'construction',
      href: 'service_construction.html',
      cta: 'Open Construction Services'
    }
  ];

  var nativeGrid = document.getElementById('reNativeGrid');
  var relatedGrid = document.getElementById('reRelatedGrid');
  var nativeBlock = document.getElementById('reNativeBlock');
  var relatedBlock = document.getElementById('reRelatedBlock');
  var filters = document.getElementById('reFilters');

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function renderCards(container, items) {
    if (!container) return;
    container.innerHTML = items.map(function (s, i) {
      return ''
        + '<a class="svc-card" href="' + escapeHtml(s.href) + '" id="re-card-' + escapeHtml(s.id) + '"'
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

  // Deep link: #crm scrolls/focuses and is a real link target
  var hash = (window.location.hash || '').replace(/^#/, '');
  if (hash) {
    var el = document.getElementById('re-card-' + hash);
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
