/**
 * TIME ERP — Asset Allocation (assets_allocation.html) — UI only
 */
(function () {
  'use strict';

  var ASSETS = [
    { id: 'AST-001', name: 'MacBook Pro 14"', category: 'Laptop', brand: 'Apple', model: 'M3 Pro', serial: 'C02XJ1A2Q6L', employee: 'Ananya Sharma', empId: 'EMP-001', dept: 'Engineering', location: 'Ghaziabad', purchased: '2024-03-12', warrantyEnd: '2027-03-12', warranty: 'active', status: 'allocated', value: '₹1,89,000' },
    { id: 'AST-002', name: 'Dell UltraSharp 27"', category: 'Monitor', brand: 'Dell', model: 'U2723QE', serial: 'CN0G123456', employee: 'Rahul Kapoor', empId: 'EMP-002', dept: 'Engineering', location: 'Remote', purchased: '2023-08-01', warrantyEnd: '2026-08-01', warranty: 'active', status: 'allocated', value: '₹42,000' },
    { id: 'AST-003', name: 'iPhone 15', category: 'Mobile', brand: 'Apple', model: '15', serial: 'DX3H9K2LMP', employee: '—', empId: '', dept: '—', location: 'IT Store', purchased: '2025-01-20', warrantyEnd: '2026-01-20', warranty: 'expiring', status: 'available', value: '₹79,900' },
    { id: 'AST-004', name: 'HP LaserJet Pro', category: 'Printer', brand: 'HP', model: 'M404dn', serial: 'VNB3K12345', employee: 'Priya Mehta', empId: 'EMP-003', dept: 'HR', location: 'Ghaziabad', purchased: '2022-11-05', warrantyEnd: '2025-11-05', warranty: 'expired', status: 'maintenance', value: '₹28,500' },
    { id: 'AST-005', name: 'ThinkPad X1 Carbon', category: 'Laptop', brand: 'Lenovo', model: 'Gen 11', serial: 'PF3XYZ123', employee: 'Amit Joshi', empId: 'EMP-006', dept: 'Engineering', location: 'Ghaziabad', purchased: '2025-11-01', warrantyEnd: '2028-11-01', warranty: 'active', status: 'allocated', value: '₹1,45,000' },
    { id: 'AST-006', name: 'Logitech MX Keys', category: 'Accessory', brand: 'Logitech', model: 'MX Keys S', serial: '2147-XX-001', employee: '—', empId: '', dept: '—', location: 'IT Store', purchased: '2024-06-18', warrantyEnd: '2026-06-18', warranty: 'active', status: 'available', value: '₹9,500' },
    { id: 'AST-007', name: 'Access Card #4421', category: 'Access', brand: 'HID', model: 'iCLASS', serial: 'AC-4421', employee: 'Sneha Reddy', empId: 'EMP-005', dept: 'Design', location: 'Remote', purchased: '2023-02-14', warrantyEnd: '2028-02-14', warranty: 'active', status: 'allocated', value: '₹800' },
    { id: 'AST-008', name: 'Samsung Odyssey G5', category: 'Monitor', brand: 'Samsung', model: 'G5 32"', serial: 'SN32G5-9981', employee: 'Vikram Singh', empId: 'EMP-004', dept: 'Sales', location: 'Delhi NCR', purchased: '2023-09-10', warrantyEnd: '2026-09-10', warranty: 'active', status: 'damaged', value: '₹32,000' },
    { id: 'AST-009', name: 'Jabra Evolve2 65', category: 'Headset', brand: 'Jabra', model: 'Evolve2 65', serial: 'JB-E2-5541', employee: '—', empId: '', dept: '—', location: 'IT Store', purchased: '2024-01-08', warrantyEnd: '2026-01-08', warranty: 'expiring', status: 'returned', value: '₹18,200' },
    { id: 'AST-010', name: 'iPad Pro 11"', category: 'Tablet', brand: 'Apple', model: 'M2', serial: 'DMPX2K9L', employee: 'Meera Iyer', empId: 'EMP-009', dept: 'Marketing', location: 'Delhi NCR', purchased: '2024-07-22', warrantyEnd: '2026-07-22', warranty: 'active', status: 'allocated', value: '₹89,900' },
    { id: 'AST-011', name: 'Cisco IP Phone', category: 'Phone', brand: 'Cisco', model: '8841', serial: 'FCW2145L0AB', employee: 'Kavita Nair', empId: 'EMP-007', dept: 'Finance', location: 'Ghaziabad', purchased: '2022-05-30', warrantyEnd: '2025-05-30', warranty: 'expired', status: 'allocated', value: '₹14,500' },
    { id: 'AST-012', name: 'Dell Latitude 5540', category: 'Laptop', brand: 'Dell', model: '5540', serial: '5CD3456XYZ', employee: '—', empId: '', dept: '—', location: 'IT Store', purchased: '2025-06-01', warrantyEnd: '2028-06-01', warranty: 'active', status: 'available', value: '₹98,000' }
  ];

  var REQUESTS = [
    { id: 'REQ-101', employee: 'Arjun Patel', asset: 'External SSD 2TB', reason: 'Large project datasets', priority: 'high', date: '2026-07-08', status: 'pending', manager: 'Rahul Kapoor' },
    { id: 'REQ-102', employee: 'Divya Krishnan', asset: 'Ergonomic Chair', reason: 'WFH setup upgrade', priority: 'medium', date: '2026-07-07', status: 'pending', manager: 'Priya Mehta' },
    { id: 'REQ-103', employee: 'Karan Malhotra', asset: 'Portable Projector', reason: 'Client demos', priority: 'low', date: '2026-07-05', status: 'approved', manager: 'Admin' },
    { id: 'REQ-104', employee: 'Rohan Das', asset: 'USB-C Hub', reason: 'Docking needs', priority: 'medium', date: '2026-07-03', status: 'rejected', manager: 'Priya Mehta' }
  ];

  var RETURNS = [
    { id: 'RET-01', asset: 'Jabra Evolve2 65', employee: 'Ex-Employee Batch', expected: '2026-06-30', actual: '2026-07-02', condition: 'Good', accessories: 'Yes', damage: 'None', inspection: 'Pending' },
    { id: 'RET-02', asset: 'Dell Latitude 5420', employee: 'Former Intern', expected: '2026-07-05', actual: '—', condition: '—', accessories: 'Pending', damage: '—', inspection: 'Awaiting' }
  ];

  var TRANSFERS = [
    { id: 'TRF-01', asset: 'Dell UltraSharp 27"', from: 'Sneha Reddy', to: 'Rahul Kapoor', dept: 'Design → Engineering', location: 'Remote → Remote', date: '2026-06-20', status: 'approved' },
    { id: 'TRF-02', asset: 'Access Card #4421', from: 'IT Store', to: 'Sneha Reddy', dept: 'IT → Design', location: 'HQ → Remote', date: '2026-07-01', status: 'pending' }
  ];

  var MAINTENANCE = [
    { id: 'MNT-01', asset: 'HP LaserJet Pro', vendor: 'HP Care', status: 'In repair', cost: '₹4,200', due: '2026-07-12', next: '2026-10-12' },
    { id: 'MNT-02', asset: 'Samsung Odyssey G5', vendor: 'Local AMC', status: 'Diagnosis', cost: 'TBD', due: '2026-07-15', next: '—' },
    { id: 'MNT-03', asset: 'Office UPS Bank', vendor: 'APC Service', status: 'Scheduled', cost: '₹8,500', due: '2026-07-20', next: '2027-01-20' }
  ];

  var LICENSES = [
    { id: 'LIC-01', name: 'Microsoft 365', key: 'XXXX-XXXX-XXXX-8K2P', expiry: '2026-12-31', employee: 'Org-wide', status: 'active' },
    { id: 'LIC-02', name: 'Adobe Creative Cloud', key: 'XXXX-XXXX-XXXX-AD91', expiry: '2026-09-15', employee: 'Sneha Reddy', status: 'expiring' },
    { id: 'LIC-03', name: 'AutoCAD', key: 'XXXX-XXXX-XXXX-AC44', expiry: '2027-03-01', employee: 'Projects Team', status: 'active' },
    { id: 'LIC-04', name: 'Antivirus Suite', key: 'XXXX-XXXX-XXXX-AV12', expiry: '2026-08-01', employee: 'All endpoints', status: 'expiring' },
    { id: 'LIC-05', name: 'ERP License Pack', key: 'XXXX-XXXX-XXXX-TE88', expiry: '2027-06-30', employee: 'TIME ERP', status: 'active' },
    { id: 'LIC-06', name: 'VPN Gateway', key: 'XXXX-XXXX-XXXX-VP03', expiry: '2026-11-20', employee: 'Remote staff', status: 'active' }
  ];

  var DOCS = [
    { name: 'Purchase Invoice — MacBook Pro', type: 'Invoice', status: 'verified' },
    { name: 'Warranty Certificate — Dell Monitor', type: 'Warranty', status: 'verified' },
    { name: 'AMC Agreement 2026', type: 'AMC', status: 'pending' },
    { name: 'Allocation Form — AST-005', type: 'Allocation', status: 'verified' },
    { name: 'Return Form — Headset', type: 'Return', status: 'pending' },
    { name: 'Maintenance Record — Printer', type: 'Maintenance', status: 'verified' }
  ];

  var TIMELINE = [
    { text: 'Dell Latitude 5540 purchased', time: 'Jun 1, 2026 · 11:20 AM', status: 'Purchased' },
    { text: 'MacBook Pro allocated to Ananya Sharma', time: 'Mar 15, 2026 · 09:40 AM', status: 'Allocated' },
    { text: 'Monitor transferred to Rahul Kapoor', time: 'Jun 20, 2026 · 04:10 PM', status: 'Transferred' },
    { text: 'HP LaserJet sent for maintenance', time: 'Jul 5, 2026 · 02:00 PM', status: 'Maintained' },
    { text: 'Jabra headset returned to store', time: 'Jul 2, 2026 · 12:15 PM', status: 'Returned' },
    { text: 'Legacy desktop marked disposed', time: 'May 12, 2026 · 05:30 PM', status: 'Disposed' }
  ];

  var NOTIFS = [
    { title: 'Warranty expiring', detail: 'iPhone 15 warranty ends in 20 days' },
    { title: 'Pending asset return', detail: 'Dell Latitude 5420 awaiting handover' },
    { title: 'Maintenance due', detail: 'HP LaserJet service on Jul 12' },
    { title: 'New asset request', detail: 'Arjun Patel requested External SSD' },
    { title: 'Transfer pending', detail: 'Access Card #4421 needs approval' }
  ];

  var state = {
    view: localStorage.getItem('astView') || 'grid',
    sortKey: 'id',
    sortDir: 1,
    filters: { q: '', category: '', status: '', dept: '', location: '', warranty: '', vendor: '' },
    selectedId: 'AST-001'
  };

  function $(id) { return document.getElementById(id); }
  function toast(title, detail) {
    if (window.DashboardShell) DashboardShell.toast(title, detail || 'UI preview — connect backend when ready.');
  }

  function badge(status) {
    var map = {
      available: 'available', allocated: 'allocated', maintenance: 'maintenance', damaged: 'damaged',
      returned: 'returned', pending: 'pending', approved: 'approved', rejected: 'rejected',
      active: 'active', expired: 'expired', expiring: 'expiring', high: 'high', medium: 'medium', low: 'low'
    };
    return '<span class="ast-badge ast-badge--' + (map[status] || 'pending') + '">' + status + '</span>';
  }

  function iconFor(category) {
    var paths = {
      Laptop: '<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M2 18h20"/>',
      Monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
      Mobile: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
      default: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 20h10"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">' + (paths[category] || paths.default) + '</svg>';
  }

  function getFiltered() {
    return ASSETS.filter(function (a) {
      var q = state.filters.q.toLowerCase();
      if (q) {
        var blob = [a.id, a.name, a.employee, a.dept, a.location, a.category, a.serial].join(' ').toLowerCase();
        if (blob.indexOf(q) === -1) return false;
      }
      if (state.filters.category && a.category !== state.filters.category) return false;
      if (state.filters.status && a.status !== state.filters.status) return false;
      if (state.filters.dept && a.dept !== state.filters.dept) return false;
      if (state.filters.location && a.location !== state.filters.location) return false;
      if (state.filters.warranty && a.warranty !== state.filters.warranty) return false;
      if (state.filters.vendor && a.brand !== state.filters.vendor) return false;
      return true;
    }).sort(function (a, b) {
      var ka = String(a[state.sortKey] || '');
      var kb = String(b[state.sortKey] || '');
      if (ka < kb) return -1 * state.sortDir;
      if (ka > kb) return 1 * state.sortDir;
      return 0;
    });
  }

  function animateCount(el, target) {
    if (!el) return;
    var num = Number(target) || 0, t0 = null, dur = 900;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(num * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = num;
    }
    requestAnimationFrame(step);
  }

  function renderKpi() {
    var total = ASSETS.length;
    var allocated = ASSETS.filter(function (a) { return a.status === 'allocated'; }).length;
    var available = ASSETS.filter(function (a) { return a.status === 'available'; }).length;
    var maint = ASSETS.filter(function (a) { return a.status === 'maintenance'; }).length;
    var pending = REQUESTS.filter(function (r) { return r.status === 'pending'; }).length;
    var warranty = ASSETS.filter(function (a) { return a.warranty === 'expiring' || a.warranty === 'expired'; }).length;
    var returned = ASSETS.filter(function (a) { return a.status === 'returned'; }).length;
    var damaged = ASSETS.filter(function (a) { return a.status === 'damaged'; }).length;
    animateCount($('kpiTotal'), total);
    animateCount($('kpiAllocated'), allocated);
    animateCount($('kpiAvailable'), available);
    animateCount($('kpiMaintenance'), maint);
    animateCount($('kpiRequests'), pending);
    animateCount($('kpiWarranty'), warranty);
    animateCount($('kpiReturned'), returned);
    animateCount($('kpiDamaged'), damaged);
  }

  function renderInventory() {
    var list = getFiltered();
    var grid = $('astInventoryGrid');
    var tableBody = $('astInventoryTableBody');
    var empty = $('astInventoryEmpty');
    if (!grid || !tableBody) return;

    if (!list.length) {
      grid.innerHTML = '';
      tableBody.innerHTML = '';
      if (empty) empty.classList.remove('is-hidden');
      return;
    }
    if (empty) empty.classList.add('is-hidden');

    grid.innerHTML = list.map(function (a) {
      return '<article class="ast-asset-card" data-id="' + a.id + '">' +
        '<div class="ast-asset-card__top"><div class="ast-asset-card__icon">' + iconFor(a.category) + '</div>' +
        '<div class="ast-asset-card__meta"><strong>' + a.name + '</strong><span>' + a.id + ' · ' + a.category + '</span></div>' + badge(a.status) + '</div>' +
        '<dl class="ast-asset-card__rows">' +
        '<div><dt>Brand / Model</dt><dd>' + a.brand + ' ' + a.model + '</dd></div>' +
        '<div><dt>Serial</dt><dd>' + a.serial + '</dd></div>' +
        '<div><dt>Employee</dt><dd>' + a.employee + '</dd></div>' +
        '<div><dt>Department</dt><dd>' + a.dept + '</dd></div>' +
        '<div><dt>Location</dt><dd>' + a.location + '</dd></div>' +
        '<div><dt>Purchased</dt><dd>' + a.purchased + '</dd></div>' +
        '<div><dt>Warranty</dt><dd>' + badge(a.warranty) + '</dd></div>' +
        '</dl>' +
        '<div class="ast-asset-card__actions">' +
        '<button type="button" class="ast-btn ast-btn--sm" data-action="view" data-id="' + a.id + '">View</button>' +
        '<button type="button" class="ast-btn ast-btn--sm" data-action="allocate" data-id="' + a.id + '">Allocate</button>' +
        '<button type="button" class="ast-btn ast-btn--sm" data-action="transfer" data-id="' + a.id + '">Transfer</button>' +
        '<button type="button" class="ast-btn ast-btn--sm" data-action="history" data-id="' + a.id + '">History</button>' +
        '</div></article>';
    }).join('');

    tableBody.innerHTML = list.map(function (a) {
      return '<tr data-id="' + a.id + '">' +
        '<td>' + a.id + '</td><td>' + a.name + '</td><td>' + a.category + '</td><td>' + a.employee + '</td>' +
        '<td>' + a.dept + '</td><td>' + a.purchased + '</td><td>' + badge(a.warranty) + '</td><td>' + badge(a.status) + '</td>' +
        '<td class="ast-table__actions">' +
        '<button type="button" class="ast-btn ast-btn--sm" data-action="view" data-id="' + a.id + '">View</button>' +
        '<button type="button" class="ast-btn ast-btn--sm" data-action="allocate" data-id="' + a.id + '">Allocate</button>' +
        '</td></tr>';
    }).join('');
  }

  function renderRequests() {
    var wrap = $('astRequests');
    if (!wrap) return;
    wrap.innerHTML = REQUESTS.map(function (r) {
      return '<article class="ast-req-card">' +
        '<div class="ast-req-card__head"><strong>' + r.employee + ' · ' + r.asset + '</strong>' + badge(r.status) + badge(r.priority) + '</div>' +
        '<div class="ast-req-card__meta">' +
        '<div><span>Reason</span><b>' + r.reason + '</b></div>' +
        '<div><span>Request Date</span><b>' + r.date + '</b></div>' +
        '<div><span>Manager</span><b>' + r.manager + '</b></div>' +
        '<div><span>Request ID</span><b>' + r.id + '</b></div></div>' +
        '<div class="ast-req-card__actions">' +
        (r.status === 'pending'
          ? '<button type="button" class="ast-btn ast-btn--sm ast-btn--success" data-ui="approve-req" data-id="' + r.id + '">Approve</button>' +
            '<button type="button" class="ast-btn ast-btn--sm ast-btn--danger" data-ui="reject-req" data-id="' + r.id + '">Reject</button>'
          : '<button type="button" class="ast-btn ast-btn--sm" data-ui="view-req" data-id="' + r.id + '">View</button>') +
        '</div></article>';
    }).join('');
  }

  function renderReturns() {
    var wrap = $('astReturns');
    if (!wrap) return;
    wrap.innerHTML = RETURNS.map(function (r) {
      return '<article class="ast-info-card"><div class="ast-info-card__head"><strong>' + r.asset + '</strong><span class="ast-badge ast-badge--pending">' + r.inspection + '</span></div>' +
        '<div class="ast-info-card__meta">' +
        '<div><span>Employee</span><b>' + r.employee + '</b></div>' +
        '<div><span>Expected</span><b>' + r.expected + '</b></div>' +
        '<div><span>Actual</span><b>' + r.actual + '</b></div>' +
        '<div><span>Condition</span><b>' + r.condition + '</b></div>' +
        '<div><span>Accessories</span><b>' + r.accessories + '</b></div>' +
        '<div><span>Damage</span><b>' + r.damage + '</b></div></div>' +
        '<div class="ast-info-card__actions">' +
        '<button type="button" class="ast-btn ast-btn--sm ast-btn--success" data-ui="accept-return">Accept Return</button>' +
        '<button type="button" class="ast-btn ast-btn--sm ast-btn--danger" data-ui="report-damage">Report Damage</button>' +
        '</div></article>';
    }).join('');
  }

  function renderTransfers() {
    var wrap = $('astTransfers');
    if (!wrap) return;
    wrap.innerHTML = TRANSFERS.map(function (t) {
      return '<article class="ast-info-card"><div class="ast-info-card__head"><strong>' + t.asset + '</strong>' + badge(t.status) + '</div>' +
        '<div class="ast-info-card__meta">' +
        '<div><span>From</span><b>' + t.from + '</b></div>' +
        '<div><span>To</span><b>' + t.to + '</b></div>' +
        '<div><span>Department</span><b>' + t.dept + '</b></div>' +
        '<div><span>Location</span><b>' + t.location + '</b></div>' +
        '<div><span>Date</span><b>' + t.date + '</b></div>' +
        '<div><span>ID</span><b>' + t.id + '</b></div></div></article>';
    }).join('');
  }

  function renderMaintenance() {
    var wrap = $('astMaintenance');
    if (!wrap) return;
    wrap.innerHTML = MAINTENANCE.map(function (m) {
      return '<article class="ast-info-card"><div class="ast-info-card__head"><strong>' + m.asset + '</strong><span class="ast-badge ast-badge--maintenance">' + m.status + '</span></div>' +
        '<div class="ast-info-card__meta">' +
        '<div><span>Vendor</span><b>' + m.vendor + '</b></div>' +
        '<div><span>Cost</span><b>' + m.cost + '</b></div>' +
        '<div><span>Service Due</span><b>' + m.due + '</b></div>' +
        '<div><span>Next Service</span><b>' + m.next + '</b></div></div>' +
        '<div class="ast-info-card__actions">' +
        '<button type="button" class="ast-btn ast-btn--sm" data-ui="schedule-service">Schedule Service</button>' +
        '<button type="button" class="ast-btn ast-btn--sm" data-ui="view-maint-history">View History</button>' +
        '</div></article>';
    }).join('');
  }

  function warrantyPct(a) {
    var start = new Date(a.purchased).getTime();
    var end = new Date(a.warrantyEnd).getTime();
    var now = Date.now();
    if (!start || !end || end <= start) return 0;
    return Math.max(0, Math.min(100, Math.round(((end - now) / (end - start)) * 100)));
  }

  function renderWarranty() {
    var wrap = $('astWarranty');
    if (!wrap) return;
    var items = ASSETS.filter(function (a) { return a.warranty !== 'active' || warrantyPct(a) < 40; }).slice(0, 6);
    if (!items.length) items = ASSETS.slice(0, 4);
    wrap.innerHTML = items.map(function (a) {
      var pct = warrantyPct(a);
      var barClass = a.warranty === 'expired' ? 'is-danger' : (a.warranty === 'expiring' ? 'is-warn' : '');
      return '<article class="ast-info-card"><div class="ast-info-card__head"><strong>' + a.name + '</strong>' + badge(a.warranty) + '</div>' +
        '<div class="ast-info-card__meta">' +
        '<div><span>Start</span><b>' + a.purchased + '</b></div>' +
        '<div><span>End</span><b>' + a.warrantyEnd + '</b></div>' +
        '<div><span>Remaining</span><b>' + pct + '%</b></div>' +
        '<div><span>Asset ID</span><b>' + a.id + '</b></div></div>' +
        '<div class="ast-warranty-bar" aria-hidden="true"><i class="' + barClass + '" style="width:' + pct + '%"></i></div></article>';
    }).join('');
  }

  function renderLicenses() {
    var wrap = $('astLicenses');
    if (!wrap) return;
    wrap.innerHTML = LICENSES.map(function (l) {
      return '<article class="ast-info-card"><div class="ast-info-card__head"><strong>' + l.name + '</strong>' + badge(l.status) + '</div>' +
        '<div class="ast-info-card__meta">' +
        '<div><span>License Key</span><b class="ast-license-key">' + l.key + '</b></div>' +
        '<div><span>Expiry</span><b>' + l.expiry + '</b></div>' +
        '<div><span>Assigned</span><b>' + l.employee + '</b></div>' +
        '<div><span>ID</span><b>' + l.id + '</b></div></div></article>';
    }).join('');
  }

  function renderDocs() {
    var wrap = $('astDocs');
    if (!wrap) return;
    wrap.innerHTML = DOCS.map(function (d) {
      return '<div class="ast-doc"><div class="ast-doc__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg></div>' +
        '<div class="ast-doc__body"><strong>' + d.name + '</strong><span>' + d.type + '</span></div>' +
        badge(d.status === 'verified' ? 'active' : 'pending') +
        '<div class="ast-doc__actions">' +
        '<button type="button" class="ast-btn ast-btn--sm" data-ui="preview-doc">Preview</button>' +
        '<button type="button" class="ast-btn ast-btn--sm" data-ui="download-doc">Download</button>' +
        '</div></div>';
    }).join('');
  }

  function renderTimeline() {
    var wrap = $('astTimeline');
    if (!wrap) return;
    wrap.innerHTML = TIMELINE.map(function (t) {
      return '<div class="ast-timeline__item"><strong>' + t.text + '</strong><span>' + t.time + ' · ' + t.status + '</span></div>';
    }).join('');
  }

  function renderNotifs() {
    var wrap = $('astNotifs');
    if (!wrap) return;
    wrap.innerHTML = NOTIFS.map(function (n) {
      return '<div class="ast-notif__item"><strong>' + n.title + '</strong><span>' + n.detail + '</span></div>';
    }).join('');
  }

  function selectedAsset() {
    return ASSETS.find(function (a) { return a.id === state.selectedId; }) || ASSETS[0];
  }

  function renderSidebar() {
    var a = selectedAsset();
    if ($('sideName')) $('sideName').textContent = a.name;
    if ($('sideId')) $('sideId').textContent = a.id;
    if ($('sideEmp')) $('sideEmp').textContent = a.employee;
    if ($('sideDept')) $('sideDept').textContent = a.dept;
    if ($('sideStatus')) $('sideStatus').innerHTML = badge(a.status);
    if ($('sideWarranty')) $('sideWarranty').innerHTML = badge(a.warranty);
    var icon = $('sideIcon');
    if (icon) icon.innerHTML = iconFor(a.category);
  }

  function openDrawer(assetId) {
    var a = ASSETS.find(function (x) { return x.id === assetId; });
    if (!a) return;
    state.selectedId = a.id;
    renderSidebar();
    var body = $('astModalBody');
    if (body) {
      body.innerHTML =
        '<section class="ast-modal__section"><h3>Asset Information</h3><div class="ast-modal__grid">' +
        '<div><span>Name</span><b>' + a.name + '</b></div><div><span>ID</span><b>' + a.id + '</b></div>' +
        '<div><span>Category</span><b>' + a.category + '</b></div><div><span>Brand</span><b>' + a.brand + '</b></div>' +
        '<div><span>Model</span><b>' + a.model + '</b></div><div><span>Serial</span><b>' + a.serial + '</b></div>' +
        '<div><span>Status</span><b>' + badge(a.status) + '</b></div><div><span>Value</span><b>' + a.value + '</b></div></div></section>' +
        '<section class="ast-modal__section"><h3>Employee Information</h3><div class="ast-modal__grid">' +
        '<div><span>Employee</span><b>' + a.employee + '</b></div><div><span>Employee ID</span><b>' + (a.empId || '—') + '</b></div>' +
        '<div><span>Department</span><b>' + a.dept + '</b></div><div><span>Location</span><b>' + a.location + '</b></div></div></section>' +
        '<section class="ast-modal__section"><h3>Purchase Details</h3><div class="ast-modal__grid">' +
        '<div><span>Purchase Date</span><b>' + a.purchased + '</b></div><div><span>Asset Value</span><b>' + a.value + '</b></div>' +
        '<div><span>Vendor</span><b>' + a.brand + ' Authorized</b></div><div><span>Location</span><b>' + a.location + '</b></div></div></section>' +
        '<section class="ast-modal__section"><h3>Warranty</h3><div class="ast-modal__grid">' +
        '<div><span>Warranty Start</span><b>' + a.purchased + '</b></div><div><span>Warranty End</span><b>' + a.warrantyEnd + '</b></div>' +
        '<div><span>Status</span><b>' + badge(a.warranty) + '</b></div></div></section>' +
        '<section class="ast-modal__section"><h3>Maintenance History</h3><div class="ast-info-card__meta">' +
        '<div><span>Last service</span><b>Routine check — 2026-04-10</b></div>' +
        '<div><span>Vendor</span><b>IT AMC Partner</b></div></div></section>' +
        '<section class="ast-modal__section"><h3>Transfer History</h3><div class="ast-info-card__meta">' +
        '<div><span>Last transfer</span><b>IT Store → ' + a.employee + '</b></div>' +
        '<div><span>Date</span><b>' + a.purchased + '</b></div></div></section>' +
        '<section class="ast-modal__section"><h3>Documents</h3><div class="ast-docs">' +
        DOCS.slice(0, 2).map(function (d) {
          return '<div class="ast-doc"><div class="ast-doc__body"><strong>' + d.name + '</strong><span>' + d.type + '</span></div></div>';
        }).join('') + '</div></section>' +
        '<section class="ast-modal__section"><h3>Timeline</h3><div class="ast-timeline">' +
        TIMELINE.slice(0, 4).map(function (t) { return '<div class="ast-timeline__item"><strong>' + t.text + '</strong><span>' + t.time + ' · ' + t.status + '</span></div>'; }).join('') +
        '</div></section>';
    }
    if ($('astModalTitle')) $('astModalTitle').textContent = a.name;
    var modal = $('astModal');
    if (modal) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeDrawer() {
    var modal = $('astModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function setView(view) {
    state.view = view;
    localStorage.setItem('astView', view);
    document.querySelectorAll('[data-view]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-view') === view);
    });
    var grid = $('astInventoryGrid');
    var table = $('astInventoryTable');
    if (grid) grid.classList.toggle('is-hidden', view !== 'grid');
    if (table) table.classList.toggle('is-hidden', view !== 'table');
  }

  function fillFilterOptions() {
    function unique(key) {
      var map = {};
      ASSETS.forEach(function (a) { if (a[key] && a[key] !== '—') map[a[key]] = 1; });
      return Object.keys(map).sort();
    }
    function fill(sel, values) {
      var el = $(sel);
      if (!el) return;
      values.forEach(function (v) {
        var opt = document.createElement('option');
        opt.value = v; opt.textContent = v;
        el.appendChild(opt);
      });
    }
    fill('filterCategory', unique('category'));
    fill('filterStatus', ['available', 'allocated', 'maintenance', 'damaged', 'returned']);
    fill('filterDept', unique('dept'));
    fill('filterLocation', unique('location'));
    fill('filterWarranty', ['active', 'expiring', 'expired']);
    fill('filterVendor', unique('brand'));
  }

  function ripple(e, el) {
    var rect = el.getBoundingClientRect();
    var span = document.createElement('span');
    span.className = 'ast-ripple';
    var size = Math.max(rect.width, rect.height);
    span.style.width = span.style.height = size + 'px';
    span.style.left = (e.clientX - rect.left - size / 2) + 'px';
    span.style.top = (e.clientY - rect.top - size / 2) + 'px';
    el.appendChild(span);
    setTimeout(function () { span.remove(); }, 500);
  }

  function bind() {
    document.querySelectorAll('.ast-btn, .ast-quick__card').forEach(function (btn) {
      btn.addEventListener('click', function (e) { ripple(e, btn); });
    });

    document.querySelectorAll('[data-view]').forEach(function (btn) {
      btn.addEventListener('click', function () { setView(btn.getAttribute('data-view')); });
    });

    ['filterQ', 'filterCategory', 'filterStatus', 'filterDept', 'filterLocation', 'filterWarranty', 'filterVendor'].forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener('input', syncFilters);
      el.addEventListener('change', syncFilters);
    });

    $('btnResetFilters') && $('btnResetFilters').addEventListener('click', function () {
      state.filters = { q: '', category: '', status: '', dept: '', location: '', warranty: '', vendor: '' };
      ['filterQ', 'filterCategory', 'filterStatus', 'filterDept', 'filterLocation', 'filterWarranty', 'filterVendor'].forEach(function (id) {
        if ($(id)) $(id).value = '';
      });
      renderInventory();
      toast('Filters reset');
    });

    document.querySelectorAll('.ast-table th[data-sort]').forEach(function (th) {
      th.addEventListener('click', function () {
        var key = th.getAttribute('data-sort');
        if (state.sortKey === key) state.sortDir *= -1;
        else { state.sortKey = key; state.sortDir = 1; }
        renderInventory();
      });
    });

    document.addEventListener('click', function (e) {
      var card = e.target.closest('.ast-asset-card[data-id]');
      if (card && !e.target.closest('[data-action]')) {
        state.selectedId = card.getAttribute('data-id');
        renderSidebar();
      }
      var actionBtn = e.target.closest('[data-action]');
      if (actionBtn) {
        var id = actionBtn.getAttribute('data-id');
        var action = actionBtn.getAttribute('data-action');
        if (action === 'view') openDrawer(id);
        else if (action === 'allocate') toast('Allocate Asset', id);
        else if (action === 'transfer') toast('Transfer Asset', id);
        else if (action === 'history') toast('Asset History', id);
        return;
      }
      var uiBtn = e.target.closest('[data-ui]');
      if (uiBtn) {
        var ui = uiBtn.getAttribute('data-ui');
        if (ui === 'approve-req') toast('Request approved', uiBtn.getAttribute('data-id'));
        else if (ui === 'reject-req') toast('Request rejected', uiBtn.getAttribute('data-id'));
        else toast(ui.replace(/-/g, ' '));
      }
    });

    $('btnAllocate') && $('btnAllocate').addEventListener('click', function () { toast('Allocate Asset'); });
    $('btnImport') && $('btnImport').addEventListener('click', function () { toast('Import Assets'); });
    $('btnExport') && $('btnExport').addEventListener('click', function () { toast('Export', 'Preparing asset report…'); });
    $('btnRefresh') && $('btnRefresh').addEventListener('click', function () {
      renderAll();
      toast('Refreshed', 'Asset data updated');
    });

    $('astModalClose') && $('astModalClose').addEventListener('click', closeDrawer);
    $('astModalClose2') && $('astModalClose2').addEventListener('click', closeDrawer);
    $('astModalEdit') && $('astModalEdit').addEventListener('click', function () { toast('Edit Asset', state.selectedId); });
    $('astModalPrint') && $('astModalPrint').addEventListener('click', function () { toast('Print', state.selectedId); });
    var modal = $('astModal');
    if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) closeDrawer(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });
  }

  function syncFilters() {
    state.filters.q = ($('filterQ') && $('filterQ').value) || '';
    state.filters.category = ($('filterCategory') && $('filterCategory').value) || '';
    state.filters.status = ($('filterStatus') && $('filterStatus').value) || '';
    state.filters.dept = ($('filterDept') && $('filterDept').value) || '';
    state.filters.location = ($('filterLocation') && $('filterLocation').value) || '';
    state.filters.warranty = ($('filterWarranty') && $('filterWarranty').value) || '';
    state.filters.vendor = ($('filterVendor') && $('filterVendor').value) || '';
    renderInventory();
  }

  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.ast-reveal').forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.ast-reveal').forEach(function (el) { obs.observe(el); });
  }

  function renderAll() {
    renderKpi();
    renderInventory();
    renderRequests();
    renderReturns();
    renderTransfers();
    renderMaintenance();
    renderWarranty();
    renderLicenses();
    renderDocs();
    renderTimeline();
    renderNotifs();
    renderSidebar();
  }

  function init() {
    fillFilterOptions();
    setView(state.view);
    renderAll();
    bind();
    initReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
