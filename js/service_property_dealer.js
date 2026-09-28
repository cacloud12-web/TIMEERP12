/**
 * Property Dealer services grid.
 * Native: property_dealer.html / js/property-dealer.js only.
 * Related: modules that support brokerage operations.
 * Cards are real links — click opens the page.
 */
(function () {
  'use strict';

  var nativeServices = [
    {
      id: 'listings',
      title: 'Listing inventory',
      blurb: 'Flats, plots, commercial, and builder projects with photos, pricing, and availability.',
      icon: 'home_work',
      href: 'property_dealer.html',
      cta: 'Open Property Dealer'
    },
    {
      id: 'lead-crm',
      title: 'Lead CRM',
      blurb: 'Multi-source leads, budget tagging, and agent assignment for faster follow-up.',
      icon: 'person_search',
      href: 'property_dealer.html',
      cta: 'Open Property Dealer'
    },
    {
      id: 'site-visits',
      title: 'Site visits',
      blurb: 'Schedule visits, send reminders, and log feedback — track visit-to-offer by agent.',
      icon: 'location_on',
      href: 'property_dealer.html',
      cta: 'Open Property Dealer'
    },
    {
      id: 'deal-pipeline',
      title: 'Deal pipeline',
      blurb: 'Stage boards from inquiry to registration with value, documents, and milestones.',
      icon: 'handshake',
      href: 'property_dealer.html',
      cta: 'Open Property Dealer'
    },
    {
      id: 'commissions',
      title: 'Commissions',
      blurb: 'Agent splits, builder payouts, referral fees, and TDS without month-end Excel chaos.',
      icon: 'payments',
      href: 'property_dealer.html',
      cta: 'Open Property Dealer'
    },
    {
      id: 'agent-mobile',
      title: 'Agent mobile CRM',
      blurb: 'Field agents update leads, log visits, and share listings — managers see live pipeline.',
      icon: 'smartphone',
      href: 'property_dealer.html',
      cta: 'Open Property Dealer'
    },
    {
      id: 'follow-up',
      title: 'Follow-up automation',
      blurb: 'Reminders for cold leads, visit confirmations, and post-visit callbacks.',
      icon: 'autorenew',
      href: 'property_dealer.html',
      cta: 'Open Property Dealer'
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
      icon: 'receipt_long',
      href: 'billing.html',
      cta: 'Open Billing'
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
      id: 'compliance',
      title: 'Compliance',
      blurb: 'GST, TDS, ESIC, EPFO, and gratuity.',
      icon: 'policy',
      href: 'compliance_management.html',
      cta: 'Open Compliance'
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

  var nativeGrid = document.getElementById('pdNativeGrid');
  var relatedGrid = document.getElementById('pdRelatedGrid');
  var nativeBlock = document.getElementById('pdNativeBlock');
  var relatedBlock = document.getElementById('pdRelatedBlock');
  var filters = document.getElementById('pdFilters');

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function renderCards(container, items) {
    if (!container) return;
    container.innerHTML = items.map(function (s, i) {
      return ''
        + '<a class="svc-card" href="' + escapeHtml(s.href) + '" id="pd-card-' + escapeHtml(s.id) + '"'
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
    var el = document.getElementById('pd-card-' + hash);
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
