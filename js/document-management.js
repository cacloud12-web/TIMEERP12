/**
 * TIME ERP Document Vault landing — interactive feature explorer.
 * Content aligned with home1 Document Vault + CA CloudDesk Docs guide.
 * Ref: https://guide.caclouddesk.com/Module/Docs/document-help.html
 */
(function () {
  'use strict';

  var ICON = 'assets/home-icons/document-vault.svg';

  var features = [
    {
      id: 'store', group: 'storage',
      title: 'Store Documents',
      desc: 'Securely store and organize business documents in one controlled vault.',
      icon: ICON,
      capabilities: [
        'Store business documents in a secure central vault',
        'Organize files with folders and structured access',
        'Give teams a single place for compliance-ready records',
        'Reduce scattered file storage across email and desktops'
      ],
      benefits: 'Keep client and firm documents protected and easy to find for everyday work and audits.',
      related: { name: 'Document Vault', href: 'home.html#module/document-vault', icon: 'lock' },
      cta: { label: 'Explore Document Vault', href: 'home.html#module/document-vault' }
    },
    {
      id: 'agreement', group: 'storage',
      title: 'Create Agreement',
      desc: 'Create certificates, agreements, resolutions, and annexures quickly with ready templates.',
      icon: ICON,
      capabilities: [
        'Create agreements from ready templates',
        'Prepare certificates, resolutions, and annexures faster',
        'Keep created documents inside Document Vault',
        'Support consistent wording across client engagements'
      ],
      benefits: 'Speed up agreement drafting while keeping every generated document in the same controlled system.',
      related: { name: 'Document Vault', href: 'home.html#module/document-vault', icon: 'handshake' },
      cta: { label: 'Explore Create Agreement', href: 'home.html#module/document-vault' }
    },
    {
      id: 'inward', group: 'flow',
      title: 'Inward Documents',
      desc: 'Track and manage incoming documents with proper categorization and status tracking.',
      icon: ICON,
      capabilities: [
        'Register incoming documents with clear categories',
        'Track inward document status through the workflow',
        'Keep an audit-friendly inward register',
        'Connect received files to client and engagement context'
      ],
      benefits: 'Never lose track of what clients and agencies send in — every inward item is logged and statused.',
      related: { name: 'Document Vault', href: 'home.html#module/document-vault', icon: 'move_to_inbox' },
      cta: { label: 'Explore Inward Documents', href: 'home.html#module/document-vault' }
    },
    {
      id: 'outward', group: 'flow',
      title: 'Outward Documents',
      desc: 'Track and manage outgoing documents with proper categorization and status tracking.',
      icon: ICON,
      capabilities: [
        'Register outgoing documents before dispatch',
        'Track outward status and delivery context',
        'Categorize outward packs for later retrieval',
        'Maintain a complete outward register for the firm'
      ],
      benefits: 'Know what left the firm, when it left, and where it belongs in the client file.',
      related: { name: 'Document Vault', href: 'home.html#module/document-vault', icon: 'outbox' },
      cta: { label: 'Explore Outward Documents', href: 'home.html#module/document-vault' }
    },
    {
      id: 'sharing', group: 'collaborate',
      title: 'Document Sharing',
      desc: 'Share documents securely with clients and teams while keeping access under control.',
      icon: ICON,
      capabilities: [
        'Share documents with controlled access',
        'Support client-facing document collaboration',
        'Reduce insecure email attachments',
        'Keep shared files linked to the original vault record'
      ],
      benefits: 'Collaborate on files without losing ownership, version history, or access control.',
      related: { name: 'Client Desk', href: 'index.html#client-desk', icon: 'share' },
      cta: { label: 'Explore Document Sharing', href: 'home.html#module/document-vault' }
    },
    {
      id: 'version', group: 'collaborate',
      title: 'Document Version Control',
      desc: 'Track document versions so teams always know which file is current.',
      icon: ICON,
      capabilities: [
        'Maintain version history for key documents',
        'Avoid working on outdated drafts',
        'Support review cycles with clear file lineage',
        'Preserve earlier versions for audit and reference'
      ],
      benefits: 'Stop version confusion — everyone works from the right document revision.',
      related: { name: 'Document Vault', href: 'home.html#module/document-vault', icon: 'history' },
      cta: { label: 'Explore Version Control', href: 'home.html#module/document-vault' }
    },
    {
      id: 'search', group: 'organize',
      title: 'Document Search',
      desc: 'Find documents quickly with structured search across your vault.',
      icon: ICON,
      capabilities: [
        'Search documents across the vault',
        'Locate files by name and related context',
        'Reduce time spent hunting through folders',
        'Support fast retrieval during client and audit work'
      ],
      benefits: 'Retrieve the right file in seconds when partners, clients, or auditors ask for it.',
      related: { name: 'Document Vault', href: 'home.html#module/document-vault', icon: 'search' },
      cta: { label: 'Explore Document Search', href: 'home.html#module/document-vault' }
    },
    {
      id: 'categories', group: 'organize',
      title: 'Document Categories',
      desc: 'Organize documents with categories so teams can file and retrieve consistently.',
      icon: ICON,
      capabilities: [
        'Classify documents with clear categories',
        'Keep filing consistent across the firm',
        'Support faster browsing by document type',
        'Align categories with practice workflows'
      ],
      benefits: 'Make document libraries usable at scale with a shared filing structure.',
      related: { name: 'Document Vault', href: 'home.html#module/document-vault', icon: 'category' },
      cta: { label: 'Explore Categories', href: 'home.html#module/document-vault' }
    },
    {
      id: 'approval', group: 'govern',
      title: 'Document Approval Workflow',
      desc: 'Route documents through approval steps before they are shared or finalized.',
      icon: ICON,
      capabilities: [
        'Run document approval workflows',
        'Keep pending and approved states visible',
        'Reduce unauthorized final shares',
        'Support partner review before outward dispatch'
      ],
      benefits: 'Protect the firm with a clear approval gate before critical documents leave the vault.',
      related: { name: 'Document Vault', href: 'home.html#module/document-vault', icon: 'rule' },
      cta: { label: 'Explore Approvals', href: 'home.html#module/document-vault' }
    },
    {
      id: 'history', group: 'govern',
      title: 'Document History',
      desc: 'Review document activity history for accountability and audit readiness.',
      icon: ICON,
      capabilities: [
        'View document history and activity context',
        'Support accountability across team actions',
        'Help reconstruct what changed and when',
        'Strengthen compliance-ready documentation trails'
      ],
      benefits: 'Answer “who changed this and when?” without digging through email threads.',
      related: { name: 'Document Vault', href: 'home.html#module/document-vault', icon: 'schedule' },
      cta: { label: 'Explore Document History', href: 'home.html#module/document-vault' }
    },
    {
      id: 'dsc', group: 'govern',
      title: 'DSC Tracker',
      desc: 'Monitor Digital Signature Certificates — validity, expiry dates, and renewal status.',
      icon: ICON,
      capabilities: [
        'Track Digital Signature Certificates in one register',
        'Monitor validity and expiry dates',
        'Follow renewal status before certificates lapse',
        'Reduce signing delays caused by expired tokens'
      ],
      benefits: 'Never miss a DSC renewal that blocks filings, agreements, or client deliveries.',
      related: { name: 'Document Vault', href: 'home.html#module/document-vault', icon: 'verified' },
      cta: { label: 'Explore DSC Tracker', href: 'home.html#module/document-vault' }
    },
    {
      id: 'assets', group: 'govern',
      title: 'Fixed Asset Register',
      desc: 'Maintain comprehensive records of fixed assets, valuation, depreciation, and documentation.',
      icon: ICON,
      capabilities: [
        'Maintain a fixed asset register for the firm or clients',
        'Track valuation and depreciation context',
        'Attach supporting documentation to assets',
        'Keep asset records audit-ready'
      ],
      benefits: 'Combine asset records and supporting documents in one governed register.',
      related: { name: 'Document Vault', href: 'home.html#module/document-vault', icon: 'inventory_2' },
      cta: { label: 'Explore Fixed Asset Register', href: 'home.html#module/document-vault' }
    }
  ];

  var list = document.getElementById('docFeatList');
  var empty = document.getElementById('docEmpty');
  var filters = document.getElementById('docFilters');
  var panelInner = document.getElementById('docPanelInner');
  var activeId = features[0].id;
  var activeFilter = 'all';

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function findFeature(id) {
    return features.filter(function (f) { return f.id === id; })[0] || features[0];
  }

  function renderList() {
    var visible = features.filter(function (f) {
      return activeFilter === 'all' || f.group === activeFilter;
    });
    if (empty) empty.classList.toggle('is-visible', !visible.length);
    list.querySelectorAll('.mkt-feat').forEach(function (el) { el.remove(); });
    visible.forEach(function (f) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mkt-feat' + (f.id === activeId ? ' is-active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', f.id === activeId ? 'true' : 'false');
      btn.setAttribute('data-id', f.id);
      btn.innerHTML =
        '<span class="mkt-feat__top">'
        + '<span class="mkt-feat__icon" aria-hidden="true"><img src="' + escapeHtml(f.icon) + '" alt="" width="24" height="24"></span>'
        + '<span class="mkt-feat__check" aria-hidden="true"><span class="material-symbols-outlined">check</span></span>'
        + '</span>'
        + '<span class="mkt-feat__label">' + escapeHtml(f.title) + '</span>'
        + '<span class="mkt-feat__desc">' + escapeHtml(f.desc) + '</span>';
      list.appendChild(btn);
    });
    if (visible.length && !visible.some(function (f) { return f.id === activeId; })) {
      activeId = visible[0].id;
      renderPanel(activeId);
    }
  }

  function renderPanel(id) {
    var f = findFeature(id);
    activeId = f.id;
    if (!panelInner) return;
    panelInner.classList.add('is-updating');
    setTimeout(function () {
      document.getElementById('docPanelIcon').src = f.icon;
      document.getElementById('docPanelName').textContent = f.title;
      document.getElementById('docPanelDesc').textContent = f.desc;
      document.getElementById('docPanelBenefits').textContent = f.benefits;
      document.getElementById('docPanelCaps').innerHTML = f.capabilities.map(function (c) {
        return '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span><span>' + escapeHtml(c) + '</span></li>';
      }).join('');
      var cta = document.getElementById('docPanelCta');
      cta.textContent = f.cta.label;
      cta.href = f.cta.href;
      panelInner.classList.remove('is-updating');
    }, 120);
    list.querySelectorAll('.mkt-feat').forEach(function (btn) {
      var on = btn.getAttribute('data-id') === activeId;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function setFilter(filter) {
    activeFilter = filter || 'all';
    if (filters) {
      filters.querySelectorAll('.mkt-filter').forEach(function (b) {
        var on = b.getAttribute('data-filter') === activeFilter;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
    renderList();
    renderPanel(activeId);
  }

  if (filters) {
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.mkt-filter');
      if (!btn) return;
      setFilter(btn.getAttribute('data-filter') || 'all');
    });
  }

  if (list) {
    list.addEventListener('click', function (e) {
      var btn = e.target.closest('.mkt-feat');
      if (!btn) return;
      renderPanel(btn.getAttribute('data-id'));
    });
  }

  var journey = document.getElementById('docJourney');
  if (journey) {
    journey.addEventListener('click', function (e) {
      var step = e.target.closest('[data-journey]');
      if (!step) return;
      journey.querySelectorAll('[data-journey]').forEach(function (s) {
        s.classList.toggle('is-active', s === step);
      });
      var map = {
        store: 'store',
        flow: 'inward',
        collaborate: 'sharing',
        govern: 'approval',
        track: 'dsc'
      };
      var id = map[step.getAttribute('data-journey')];
      if (id) {
        setFilter('all');
        renderPanel(id);
        document.getElementById('doc-explorer').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  document.querySelectorAll('[data-jump]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var id = el.getAttribute('data-jump');
      if (!id) return;
      e.preventDefault();
      setFilter('all');
      renderPanel(id);
      document.getElementById('doc-explorer').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  renderList();
  renderPanel(activeId);
})();
