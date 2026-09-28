/**
 * TIME ERP Compliance Management landing — interactive feature explorer.
 * Content from home1 Compliance Management + Products mega-nav only:
 * GST Reports, ESIC Reports, EPFO Reports, Gratuity Management, TDS Reports.
 */
(function () {
  'use strict';

  var features = [
    {
      id: 'gst', group: 'tax',
      title: 'GST Reports',
      desc: 'Centralized GST statutory reporting for audit-ready compliance across your organization.',
      icon: 'assets/home-icons/task-gst.svg',
      capabilities: [
        'Prepare GST statutory reports from TIME ERP records',
        'Keep GST reporting centralized for the organization',
        'Support audit-ready GST documentation workflows',
        'Align GST reporting with billing and financial records'
      ],
      benefits: 'Reduce fragmented GST paperwork by keeping statutory GST reporting inside one Compliance Management workspace.',
      related: { name: 'Billing Management', href: 'billing.html', icon: 'receipt_long' },
      cta: { label: 'Explore GST Reports', href: 'index.html#compliance' }
    },
    {
      id: 'esic', group: 'labour',
      title: 'ESIC Reports',
      desc: 'Centralized ESIC statutory reporting for contribution and compliance readiness.',
      icon: 'assets/home-icons/task-esi.svg',
      capabilities: [
        'Prepare ESIC statutory reports from payroll-linked data',
        'Keep ESIC reporting centralized for the organization',
        'Support audit-ready ESIC documentation',
        'Align ESIC reporting with workforce and payroll records'
      ],
      benefits: 'Give HR and compliance teams one place to manage ESIC reporting alongside other statutory acts.',
      related: { name: 'Payroll', href: 'payroll.html', icon: 'payments' },
      cta: { label: 'Explore ESIC Reports', href: 'index.html#compliance' }
    },
    {
      id: 'epfo', group: 'labour',
      title: 'EPFO Reports',
      desc: 'Centralized EPFO statutory reporting for provident fund compliance readiness.',
      icon: 'assets/home-icons/task-pf.svg',
      capabilities: [
        'Prepare EPFO statutory reports from TIME ERP records',
        'Keep EPFO reporting centralized for the organization',
        'Support audit-ready EPFO documentation',
        'Align EPFO reporting with payroll and employee data'
      ],
      benefits: 'Maintain EPFO reporting readiness without scattering PF compliance work across spreadsheets and folders.',
      related: { name: 'Payroll', href: 'payroll.html', icon: 'account_balance' },
      cta: { label: 'Explore EPFO Reports', href: 'index.html#compliance' }
    },
    {
      id: 'gratuity', group: 'benefits',
      title: 'Gratuity Management',
      desc: 'Track gratuity management and statutory readiness as part of Compliance Management.',
      icon: 'assets/home-icons/task-bonus.svg',
      capabilities: [
        'Manage gratuity as part of statutory compliance',
        'Keep gratuity records centralized with other compliance reports',
        'Support audit-ready gratuity documentation',
        'Align gratuity management with HR and payroll context'
      ],
      benefits: 'Include gratuity in the same audit-ready compliance workspace used for GST, ESIC, EPFO, and TDS.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'savings' },
      cta: { label: 'Explore Gratuity Management', href: 'index.html#compliance' }
    },
    {
      id: 'tds', group: 'tax',
      title: 'TDS Reports',
      desc: 'Centralized TDS statutory reporting for tax deduction compliance readiness.',
      icon: 'assets/home-icons/task-tds.svg',
      capabilities: [
        'Prepare TDS statutory reports from TIME ERP records',
        'Keep TDS reporting centralized for the organization',
        'Support audit-ready TDS documentation',
        'Align TDS reporting with payroll and payment records'
      ],
      benefits: 'Keep TDS reporting visible and organized inside Compliance Management instead of disconnected files.',
      related: { name: 'Payroll', href: 'payroll.html', icon: 'percent' },
      cta: { label: 'Explore TDS Reports', href: 'index.html#compliance' }
    }
  ];

  var list = document.getElementById('cmpFeatList');
  var empty = document.getElementById('cmpEmpty');
  var filters = document.getElementById('cmpFilters');
  var panelInner = document.getElementById('cmpPanelInner');
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
    if (!list) return;
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
      document.getElementById('cmpPanelIcon').src = f.icon;
      document.getElementById('cmpPanelName').textContent = f.title;
      document.getElementById('cmpPanelDesc').textContent = f.desc;
      document.getElementById('cmpPanelBenefits').textContent = f.benefits;
      document.getElementById('cmpPanelCaps').innerHTML = f.capabilities.map(function (c) {
        return '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span><span>' + escapeHtml(c) + '</span></li>';
      }).join('');
      document.getElementById('cmpPanelRelated').innerHTML =
        '<a class="mkt-related__chip" href="' + escapeHtml(f.related.href) + '">'
        + '<span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(f.related.icon) + '</span>'
        + escapeHtml(f.related.name) + '</a>';
      var cta = document.getElementById('cmpPanelCta');
      cta.textContent = f.cta.label;
      cta.href = f.cta.href;
      panelInner.classList.remove('is-updating');
    }, 120);
    if (list) {
      list.querySelectorAll('.mkt-feat').forEach(function (btn) {
        var on = btn.getAttribute('data-id') === activeId;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
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

  function openFeature(id) {
    setFilter('all');
    renderPanel(id);
    var journey = document.getElementById('cmpJourney');
    if (journey) {
      journey.querySelectorAll('[data-journey]').forEach(function (s) {
        s.classList.toggle('is-active', s.getAttribute('data-journey') === id);
      });
    }
    var explorer = document.getElementById('cmp-explorer');
    if (explorer) explorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  var journey = document.getElementById('cmpJourney');
  if (journey) {
    journey.addEventListener('click', function (e) {
      var step = e.target.closest('[data-journey]');
      if (!step) return;
      openFeature(step.getAttribute('data-journey'));
    });
  }

  document.querySelectorAll('[data-jump]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var id = el.getAttribute('data-jump');
      if (!id) return;
      e.preventDefault();
      openFeature(id);
    });
  });

  renderList();
  renderPanel(activeId);
})();
