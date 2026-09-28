/**
 * TIME ERP Inventory Management landing — interactive feature explorer.
 * Aligned with Products mega-nav Inventory Management section.
 */
(function () {
  'use strict';

  var ICON = 'assets/home-icons/task-asset.svg';

  var features = [
    {
      id: 'stock-overview', group: 'master',
      title: 'Stock Overview',
      desc: 'See live stock balances by item, warehouse, and status in one operational view.',
      icon: ICON,
      capabilities: [
        'View on-hand, reserved, and available quantities by item',
        'Filter stock by warehouse, category, and status',
        'Spot shortages and excess stock without spreadsheet exports',
        'Drill from summary totals into item and location detail'
      ],
      benefits: 'Give store, purchase, and ops teams one live picture of inventory instead of stale Excel counts.',
      cta: { label: 'Book Inventory Demo', href: '#', bookDemo: true }
    },
    {
      id: 'item-master', group: 'master',
      title: 'Item Master',
      desc: 'Maintain SKUs, units of measure, categories, and item attributes as a single source of truth.',
      icon: ICON,
      capabilities: [
        'Create and maintain item codes, names, and categories',
        'Define UOM, conversion, and packing attributes',
        'Mark items as stocked, non-stocked, or batch/serial controlled',
        'Keep purchase and selling references linked to each SKU'
      ],
      benefits: 'Standardize every material and product so purchases, stores, and reports use the same master data.',
      cta: { label: 'Book Inventory Demo', href: '#', bookDemo: true }
    },
    {
      id: 'warehouses', group: 'master',
      title: 'Warehouses',
      desc: 'Run multi-location inventory with clear ownership per plant, site store, or godown.',
      icon: ICON,
      capabilities: [
        'Configure multiple warehouses and site stores',
        'Track stock independently per location',
        'Support transfer of stock between locations',
        'Limit visibility and postings by warehouse where needed'
      ],
      benefits: 'Know exactly which location holds stock and avoid wrong-store purchases or double booking.',
      cta: { label: 'Book Inventory Demo', href: '#', bookDemo: true }
    },
    {
      id: 'purchase-orders', group: 'procure',
      title: 'Purchase Orders',
      desc: 'Raise and track purchase orders so procurement, finance, and stores stay aligned.',
      icon: ICON,
      capabilities: [
        'Create purchase orders against vendors and items',
        'Track PO status from draft through approval and receipt',
        'Compare ordered qty with received and pending quantities',
        'Keep PO history for audit and vendor performance'
      ],
      benefits: 'Control what is ordered, when it is due, and how much is still open against each supplier.',
      cta: { label: 'Book Inventory Demo', href: '#', bookDemo: true }
    },
    {
      id: 'grn', group: 'procure',
      title: 'Goods Receipt (GRN)',
      desc: 'Receive materials against POs with proper quantities, location, and receipt proof.',
      icon: ICON,
      capabilities: [
        'Post GRN against open purchase order lines',
        'Receive full or partial quantities into chosen warehouses',
        'Capture supplier delivery references and receipt notes',
        'Update stock balances at the moment of goods receipt'
      ],
      benefits: 'Close the buy-to-store loop so ledger and shelf quantities move together after every delivery.',
      cta: { label: 'Book Inventory Demo', href: '#', bookDemo: true }
    },
    {
      id: 'stock-adjustments', group: 'control',
      title: 'Stock Adjustments',
      desc: 'Correct physical count differences, write-offs, and opening balances with an audit trail.',
      icon: ICON,
      capabilities: [
        'Post positive or negative stock adjustments by item and warehouse',
        'Record reason codes for damage, count variance, or write-off',
        'Support opening stock and period-end reconciliation',
        'Keep a clear history of who adjusted what and when'
      ],
      benefits: 'Align system stock with physical reality without hiding corrections in informal notes.',
      cta: { label: 'Book Inventory Demo', href: '#', bookDemo: true }
    },
    {
      id: 'stock-transfers', group: 'control',
      title: 'Stock Transfers',
      desc: 'Move inventory between warehouses and site stores with full quantity traceability.',
      icon: ICON,
      capabilities: [
        'Transfer stock from one warehouse to another',
        'Track in-transit or completed transfer status',
        'Update source and destination balances automatically',
        'Support multi-site project and plant material movement'
      ],
      benefits: 'Rebalance stock across locations without losing the trail of what moved where.',
      cta: { label: 'Book Inventory Demo', href: '#', bookDemo: true }
    },
    {
      id: 'low-stock-alerts', group: 'control',
      title: 'Low Stock Alerts',
      desc: 'Get early warnings when items fall below defined stock thresholds.',
      icon: ICON,
      capabilities: [
        'Define low-stock thresholds per item or location',
        'Surface items that need replenishment action',
        'Prioritize critical materials for purchase follow-up',
        'Reduce stock-outs that stop production or client delivery'
      ],
      benefits: 'Act before shelves run empty instead of discovering shortages on the shop floor.',
      cta: { label: 'Book Inventory Demo', href: '#', bookDemo: true }
    },
    {
      id: 'batch-serial', group: 'track',
      title: 'Batch & Serial Tracking',
      desc: 'Trace lot numbers and serials from receipt through issue for quality and compliance.',
      icon: ICON,
      capabilities: [
        'Capture batch or lot numbers on receipt and issue',
        'Track serial numbers for high-value or regulated items',
        'Support expiry visibility for time-sensitive materials',
        'Trace which batch/serial was issued to which location or job'
      ],
      benefits: 'Handle recalls, warranty, and quality checks with confidence instead of paper registers.',
      cta: { label: 'Book Inventory Demo', href: '#', bookDemo: true }
    },
    {
      id: 'stock-valuation', group: 'track',
      title: 'Stock Valuation',
      desc: 'Understand inventory value for operational decisions and finance visibility.',
      icon: ICON,
      capabilities: [
        'Value stock based on item costs and on-hand quantities',
        'View valuation by warehouse, category, or item group',
        'Support finance review of inventory holding levels',
        'Connect material value to purchase and consumption activity'
      ],
      benefits: 'Know not just how many units you hold, but what capital is locked in inventory.',
      cta: { label: 'Book Inventory Demo', href: '#', bookDemo: true }
    },
    {
      id: 'inventory-reports', group: 'insight',
      title: 'Inventory Reports',
      desc: 'Run stock, movement, aging, and warehouse reports for daily control and audits.',
      icon: ICON,
      capabilities: [
        'Stock on hand and warehouse-wise inventory reports',
        'Stock movement history for receipts, issues, and transfers',
        'Slow-moving and aging stock analysis',
        'Export-ready views for reviews with finance and leadership'
      ],
      benefits: 'Give leaders and auditors clear inventory visibility without rebuilding reports in spreadsheets.',
      cta: { label: 'Book Inventory Demo', href: '#', bookDemo: true }
    },
    {
      id: 'reorder-levels', group: 'insight',
      title: 'Reorder Levels',
      desc: 'Set reorder points so replenishment is planned before stock becomes urgent.',
      icon: ICON,
      capabilities: [
        'Define reorder levels and suggested reorder quantities',
        'Highlight items that crossed the reorder point',
        'Support procurement planning from stock policy, not panic buying',
        'Align store rules with purchasing follow-up workflows'
      ],
      benefits: 'Turn inventory policy into daily action so teams reorder on time and in the right quantities.',
      cta: { label: 'Book Inventory Demo', href: '#', bookDemo: true }
    }
  ];

  var list = document.getElementById('invFeatList');
  var empty = document.getElementById('invEmpty');
  var filters = document.getElementById('invFilters');
  var panelInner = document.getElementById('invPanelInner');
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
      document.getElementById('invPanelIcon').src = f.icon;
      document.getElementById('invPanelName').textContent = f.title;
      document.getElementById('invPanelDesc').textContent = f.desc;
      document.getElementById('invPanelBenefits').textContent = f.benefits;
      document.getElementById('invPanelCaps').innerHTML = f.capabilities.map(function (c) {
        return '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span><span>' + escapeHtml(c) + '</span></li>';
      }).join('');
      var cta = document.getElementById('invPanelCta');
      cta.textContent = f.cta.label;
      cta.href = f.cta.href || '#';
      if (f.cta.bookDemo) cta.setAttribute('data-book-demo', '');
      else cta.removeAttribute('data-book-demo');
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

  var journey = document.getElementById('invJourney');
  if (journey) {
    journey.addEventListener('click', function (e) {
      var step = e.target.closest('[data-journey]');
      if (!step) return;
      journey.querySelectorAll('[data-journey]').forEach(function (s) {
        s.classList.toggle('is-active', s === step);
      });
      var map = {
        master: 'stock-overview',
        procure: 'purchase-orders',
        control: 'stock-transfers',
        track: 'batch-serial',
        report: 'inventory-reports'
      };
      var id = map[step.getAttribute('data-journey')];
      if (id) {
        setFilter('all');
        renderPanel(id);
        document.getElementById('inv-explorer').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      document.getElementById('inv-explorer').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  renderList();
  renderPanel(activeId);
})();
