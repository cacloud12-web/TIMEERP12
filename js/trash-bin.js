/**
 * Trash Bin — deleted items grid
 */
(function () {
  'use strict';

  var CUSTOMERS = [
    { id: 'c1', category: 'customer', name: 'testing' },
    { id: 'c2', category: 'customer', name: 'Aditya Amar...' },
    { id: 'c3', category: 'customer', name: 'shruti singh' },
    { id: 'c4', category: 'customer', name: 'shruti singh' },
    { id: 'c5', category: 'customer', name: 'shruti singh' },
    { id: 'c6', category: 'customer', name: 'shruti singh' },
    { id: 'c7', category: 'customer', name: 'shruti singh' },
    { id: 'c8', category: 'customer', name: 'shruti singh' }
  ];

  var BRANCHES = [
    { id: 'b1', category: 'branch', name: 'ca cloud' }
  ];

  function buildTasks() {
    var list = [];
    for (var n = 2224; n <= 2408; n++) {
      list.push({ id: 't' + n, category: 'task', name: 'TSK0' + n });
    }
    return list;
  }

  var ITEMS = CUSTOMERS.concat(BRANCHES, buildTasks());
  var filtered = ITEMS.slice();
  var searchInput = document.getElementById('tbCategorySearch');
  var grid = document.getElementById('tbGrid');

  var ICONS = {
    customer: '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="16" cy="18" r="6" fill="#25b7a7" opacity=".25"/><circle cx="16" cy="18" r="4" fill="#25b7a7"/><circle cx="32" cy="18" r="6" fill="#25b7a7" opacity=".25"/><circle cx="32" cy="18" r="4" fill="#25b7a7"/><path d="M8 36c0-5 4-9 8-9s8 4 8 9M24 36c0-5 4-9 8-9s8 4 8 9" stroke="#25b7a7" stroke-width="2" stroke-linecap="round"/></svg>',
    branch: '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M10 38V18l14-8 14 8v20" stroke="#cbd5e1" stroke-width="2"/><path d="M18 38V26h12v12" stroke="#ef4444" stroke-width="2"/><path d="M10 18h28M24 10v8" stroke="#64748b" stroke-width="2" stroke-linecap="round"/><rect x="20" y="28" width="8" height="10" fill="#f1f5f9" stroke="#94a3b8"/></svg>',
    task: '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="10" y="8" width="28" height="34" rx="3" fill="#fff" stroke="#25b7a7" stroke-width="2"/><path d="M16 16h16M16 22h16M16 28h10" stroke="#25b7a7" stroke-width="2" stroke-linecap="round"/><path d="M18 16l2 2 4-4" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 22l2 2 4-4" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 30l8 8" stroke="#f97316" stroke-width="2.5" stroke-linecap="round"/><path d="M34 34l4-4" stroke="#f97316" stroke-width="2.5" stroke-linecap="round"/></svg>'
  };

  var RESTORE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 12a9 9 0 0115-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 01-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>';

  function esc(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function categoryLabel(cat) {
    if (cat === 'customer') return 'CUSTOMER';
    if (cat === 'branch') return 'BRANCH';
    return 'TASK';
  }

  function toast(title, msg) {
    if (typeof window.toast === 'function') window.toast(title, msg);
  }

  function applyFilter() {
    var q = (searchInput && searchInput.value || '').trim().toLowerCase();
    filtered = ITEMS.filter(function (item) {
      if (!q) return true;
      return item.category.indexOf(q) !== -1 ||
        categoryLabel(item.category).toLowerCase().indexOf(q) !== -1 ||
        item.name.toLowerCase().indexOf(q) !== -1;
    });
    render();
  }

  function removeItem(id) {
    ITEMS = ITEMS.filter(function (item) { return item.id !== id; });
    applyFilter();
  }

  function render() {
    if (!grid) return;
    if (!filtered.length) {
      grid.innerHTML = '<div class="tb-empty">No items in trash for this category.</div>';
      return;
    }
    grid.innerHTML = filtered.map(function (item) {
      return '<article class="tb-card" data-tb-id="' + esc(item.id) + '">' +
        '<button type="button" class="tb-card__restore" data-tb-restore="' + esc(item.id) + '" aria-label="Restore ' + esc(item.name) + '" title="Restore">' + RESTORE_SVG + '</button>' +
        '<div class="tb-card__icon">' + (ICONS[item.category] || ICONS.task) + '</div>' +
        '<div class="tb-card__type">' + esc(categoryLabel(item.category)) + '</div>' +
        '<div class="tb-card__name">' + esc(item.name) + '</div>' +
      '</article>';
    }).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }

  if (grid) {
    grid.addEventListener('click', function (e) {
      var restoreBtn = e.target.closest('[data-tb-restore]');
      if (restoreBtn) {
        e.stopPropagation();
        var rid = restoreBtn.getAttribute('data-tb-restore');
        var item = ITEMS.filter(function (i) { return i.id === rid; })[0];
        if (item) {
          toast('Restored', item.name + ' has been restored.');
          removeItem(rid);
        }
        return;
      }
      var card = e.target.closest('[data-tb-id]');
      if (!card) return;
      var id = card.getAttribute('data-tb-id');
      var row = ITEMS.filter(function (i) { return i.id === id; })[0];
      if (!row) return;
      if (row.category === 'task') {
        window.location.href = 'task_management.html';
      } else if (row.category === 'customer') {
        window.location.href = 'crm_view_clients.html';
      } else {
        window.location.href = 'organization.html';
      }
    });
  }

  applyFilter();
})();
