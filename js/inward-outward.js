/* TIME ERP — Inward/Outward Document */
(function () {
  'use strict';

  /* Clock */
  function tick() {
    var el = document.getElementById('iodTopClock');
    if (!el) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
  }
  tick(); setInterval(tick, 30000);

  /* Data */
  var DATA = [
    { client: 'SAURABH BHARDWAJ', mob: '--', file: 'gst sales file-june24', mode: '--', docType: '--', loc: '--', date: '03/07/2024 20:54', dir: 'Outward', by: 'Saurabh Bhardwaj', to: 'ws', handBy: 'CA Yogesh Bhardwaj', notes: '--' },
    { client: 'SAURABH BHARDWAJ', mob: '--', file: 'gst sales file-june24', mode: 'hardcopy', docType: '--', loc: 'Ghaziabad', date: '23/08/2024 15:10', dir: 'Inward', by: 'Saurabh Bhardwaj', to: 'CA Yogesh Bhardwaj', handBy: 'sd', notes: 'Read More', hl: true },
    { client: 'SAURABH BHARDWAJ', mob: '--', file: '--', mode: 'none', docType: '--', loc: 'Ghaziabad', date: '23/08/2024 05:30', dir: 'Outward', by: 'Saurabh Bhardwaj', to: 'ws', handBy: 'CA Yogesh Bhardwaj', notes: '--' },
    { client: 'SAURABH BHARDWAJ', mob: '--', file: '--', mode: 'none', docType: '--', loc: 'Ghaziabad', date: '23/08/2024 05:30', dir: 'Outward', by: 'Saurabh Bhardwaj', to: 'ws', handBy: 'CA Yogesh Bhardwaj', notes: '--' },
    { client: 'SAURABH BHARDWAJ', mob: '--', file: 'gst sales file-june24', mode: 'hardcopy', docType: '--', loc: '--', date: '03/06/2025 11:26', dir: 'Inward', by: 'Saurabh Bhardwaj', to: 'Saurabh Bhardwaj', handBy: '--', notes: '--' },
    { client: 'SAURABH BHARDWAJ', mob: '--', file: 'gst sales file-june24', mode: 'hardcopy', docType: '--', loc: '--', date: '03/06/2025 11:29', dir: 'Inward', by: 'Saurabh Bhardwaj', to: 'Saurabh Bhardwaj', handBy: '--', notes: '--' },
    { client: 'SAURABH BHARDWAJ', mob: '--', file: '--', mode: 'none', docType: 'aa', loc: '--', date: '03/06/2025 11:38', dir: 'Outward', by: 'Saurabh Bhardwaj', to: 'Saurabh Bhardwaj', handBy: 'Saurabh Bhardwaj', notes: '--' },
    { client: 'SAURABH BHARDWAJ', mob: '--', file: 'gst sales file-june24', mode: 'none', docType: '--', loc: '--', date: '03/06/2025 11:41', dir: 'Inward', by: 'Saurabh Bhardwaj', to: 'Saurabh Bhardwaj', handBy: '--', notes: '--' },
    { client: 'SAURABH BHARDWAJ', mob: '--', file: '--', mode: 'hardcopy', docType: '--', loc: '--', date: '03/06/2025 11:45', dir: 'Outward', by: 'Saurabh Bhardwaj', to: 'Saurabh Bhardwaj', handBy: 'Saurabh Bhardwaj', notes: '--' },
    { client: 'SAURABH BHARDWAJ', mob: '--', file: '--', mode: 'none', docType: '--', loc: '--', date: '03/06/2025 11:49', dir: 'Outward', by: 'Saurabh Bhardwaj', to: 'Saurabh Bhardwaj', handBy: 'Saurabh Bhardwaj', notes: '--' }
  ];

  var tbody = document.getElementById('iodBody');
  var searchInput = document.getElementById('iodSearch');

  var ICON_FOLDER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>';
  var ICON_EDIT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 16.5-13.5z"/></svg>';
  var ICON_PDF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h1.5a1.5 1.5 0 010 3H8v-3zM8 16v3"/><path d="M12 13h2a1.5 1.5 0 010 3h-2v-3zM12 16v3"/></svg>';
  var ICON_DELETE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>';

  function actionCell(i) {
    return '<td><div class="iod-actions">' +
      '<div class="iod-actions__row">' +
      '<button type="button" class="is-gray" title="Folder">' + ICON_FOLDER + '</button>' +
      '<span class="iod-actions__sep" aria-hidden="true"></span>' +
      '<button type="button" class="is-green" title="Edit" data-idx="' + i + '">' + ICON_EDIT + '</button>' +
      '<span class="iod-actions__sep" aria-hidden="true"></span>' +
      '<button type="button" class="is-orange" title="PDF">' + ICON_PDF + '</button>' +
      '</div>' +
      '<div class="iod-actions__row">' +
      '<button type="button" class="is-red" title="Delete" data-idx="' + i + '">' + ICON_DELETE + '</button>' +
      '</div></div></td>';
  }

  function render(filter) {
    var q = (filter || '').toLowerCase();
    var dirVal = document.getElementById('iodFilterDir') ? document.getElementById('iodFilterDir').value : '';
    var modeVal = document.getElementById('iodFilterMode') ? document.getElementById('iodFilterMode').value : '';
    var clientVal = document.getElementById('iodFilterClient') ? document.getElementById('iodFilterClient').value : '';
    tbody.innerHTML = '';
    DATA.forEach(function (r, i) {
      if (q && r.client.toLowerCase().indexOf(q) === -1 && r.file.toLowerCase().indexOf(q) === -1) return;
      if (dirVal && r.dir !== dirVal) return;
      if (modeVal && r.mode !== modeVal) return;
      if (clientVal && r.client !== clientVal) return;
      var tr = document.createElement('tr');
      if (r.hl) tr.className = 'iod-row--highlight';
      var notesHtml = r.notes === 'Read More' ? '<a href="#" class="iod-notes-link">Read More</a>' : r.notes;
      tr.innerHTML =
        '<td>' + (i + 1) + '</td><td>' + r.client + '</td><td>' + r.mob + '</td>' +
        '<td>' + r.file + '</td><td>' + r.mode + '</td><td>' + r.docType + '</td>' +
        '<td>' + r.loc + '</td><td>' + r.date + '</td><td>' + r.dir + '</td>' +
        '<td>' + r.by + '</td><td>' + r.to + '</td><td>' + r.handBy + '</td>' +
        '<td>' + notesHtml + '</td>' +
        actionCell(i);
      tbody.appendChild(tr);
    });
  }
  render();

  /* Filter popover */
  var filterWrap = document.getElementById('iodFilterWrap');
  var filterBtn = document.getElementById('iodFilterBtn');
  var filterDrop = document.getElementById('iodFilterDrop');
  var filterReset = document.getElementById('iodFilterReset');

  function setFilterOpen(open) {
    if (!filterWrap || !filterDrop || !filterBtn) return;
    filterWrap.classList.toggle('is-open', open);
    filterDrop.hidden = !open;
    filterBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (filterBtn && filterDrop) {
    filterBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setFilterOpen(filterDrop.hidden);
    });
    document.addEventListener('click', function (e) {
      if (!filterWrap || filterWrap.contains(e.target)) return;
      setFilterOpen(false);
    });
  }

  document.querySelectorAll('.iod-filter-acc__btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var acc = btn.closest('.iod-filter-acc');
      var body = acc.querySelector('.iod-filter-acc__body');
      var open = !acc.classList.contains('is-open');
      acc.classList.toggle('is-open', open);
      body.hidden = !open;
    });
  });

  ['iodFilterDir', 'iodFilterMode', 'iodFilterClient'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    function syncColor() { el.style.color = el.value ? '#262626' : '#bfbfbf'; }
    syncColor();
    el.addEventListener('change', function () { syncColor(); render(searchInput ? searchInput.value : ''); });
  });

  if (filterReset) {
    filterReset.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      ['iodFilterDir', 'iodFilterMode', 'iodFilterClient'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) { el.selectedIndex = 0; el.style.color = '#bfbfbf'; }
      });
      render(searchInput ? searchInput.value : '');
    });
  }

  /* Delete confirmation popover */
  var delPop = document.getElementById('iodDelPop');
  var pendingDeleteIdx = null;
  function closeDelPop() { if (delPop) delPop.hidden = true; pendingDeleteIdx = null; }
  if (document.getElementById('iodDelNo')) document.getElementById('iodDelNo').addEventListener('click', function (e) { e.stopPropagation(); closeDelPop(); });
  if (document.getElementById('iodDelYes')) document.getElementById('iodDelYes').addEventListener('click', function (e) {
    e.stopPropagation();
    if (pendingDeleteIdx !== null && DATA[pendingDeleteIdx]) DATA.splice(pendingDeleteIdx, 1);
    closeDelPop();
    render(searchInput ? searchInput.value : '');
  });
  document.addEventListener('click', function (e) {
    if (delPop && !delPop.hidden && !e.target.closest('#iodDelPop') && !e.target.closest('button[title="Delete"]')) closeDelPop();
  });

  /* Edit button → navigate to add page with data */
  tbody.addEventListener('click', function (e) {
    var delBtn = e.target.closest('button[title="Delete"]');
    if (delBtn) {
      e.stopPropagation();
      pendingDeleteIdx = parseInt(delBtn.getAttribute('data-idx'), 10);
      if (!delPop) return;
      var r = delBtn.getBoundingClientRect();
      delPop.hidden = false;
      delPop.style.left = (r.left + r.width / 2 - delPop.offsetWidth / 2) + 'px';
      delPop.style.top = (r.top - delPop.offsetHeight - 12) + 'px';
      return;
    }
    var btn = e.target.closest('button[title="Edit"]');
    if (!btn) return;
    var idx = parseInt(btn.getAttribute('data-idx'), 10);
    var r = DATA[idx]; if (!r) return;
    var mode = r.mode === 'hardcopy' ? 'Hardcopy' : (r.mode === 'none' ? 'N/A' : r.mode);
    var dateVal = '';
    if (r.date) {
      var parts = r.date.split(' ');
      var dp = parts[0].split('/');
      dateVal = dp[2] + '-' + dp[1] + '-' + dp[0] + (parts[1] ? 'T' + parts[1] : '');
    }
    var p = new URLSearchParams({ type: r.dir, client: r.client, file: r.file, mode: mode, docType: r.docType, loc: r.loc, handTo: r.to, handBy: r.handBy, date: dateVal, notes: r.notes || '' });
    window.location.href = 'add_inward_outward.html?' + p.toString();
  });

  if (searchInput) {
    searchInput.addEventListener('input', function () { render(searchInput.value); });
  }
})();
