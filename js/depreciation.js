/* TIME ERP — Depreciation */
(function () {
  'use strict';

  (function tick() {
    var el = document.getElementById('dpTopClock'); if (!el) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
    setTimeout(tick, 30000);
  })();

  var DATA = [
    { name: 'Computer', method: 'Declining Balance', pct: '30%', freq: 'Annually', life: '60 months', comp: 'Pro-Rata' },
    { name: 'cat2', method: 'Straight Line', pct: '10%', freq: 'Quarterly', life: '5 months', comp: 'Pro-Rata' },
    { name: 'laptop hp', method: 'Straight Line', pct: '20%', freq: 'Annually', life: '5 months', comp: 'Pro-Rata' },
    { name: 'IPEM', method: 'Straight Line', pct: '10%', freq: 'Annually', life: '7 months', comp: 'Pro-Rata' }
  ];
  var ICON_DELETE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>';

  var tbody = document.getElementById('dpBody');
  var filterMethod = document.getElementById('dpFilterMethod');
  var filterFreq = document.getElementById('dpFilterFreq');
  var filterComp = document.getElementById('dpFilterComp');
  var pageSize = 10;
  var page = 1;
  var pageSizeBtn = document.getElementById('dpPageSizeBtn');
  var pageSizeList = document.getElementById('dpPageSizeList');
  var pageSizeVal = document.getElementById('dpPageSizeVal');
  var pageNumEl = document.getElementById('dpPageNum');
  var pageOfEl = document.getElementById('dpPageOf');
  var pagerInfo = document.getElementById('dpPagerInfo');
  var prevBtn = document.getElementById('dpPrev');
  var nextBtn = document.getElementById('dpNext');

  function filteredRows() {
    var m = (filterMethod && filterMethod.value) || '';
    var f = (filterFreq && filterFreq.value) || '';
    var c = (filterComp && filterComp.value) || '';
    return DATA.filter(function (r) {
      if (m && r.method !== m) return false;
      if (f && r.freq !== f) return false;
      if (c && r.comp !== c) return false;
      return true;
    });
  }

  function totalPages(rows) {
    return Math.max(1, Math.ceil(rows.length / pageSize));
  }

  function updatePager(rows) {
    var pages = totalPages(rows);
    if (page > pages) page = pages;
    pageNumEl.textContent = String(page);
    pageOfEl.textContent = String(pages);
    prevBtn.disabled = page <= 1;
    nextBtn.disabled = page >= pages;
    var start = rows.length ? (page - 1) * pageSize + 1 : 0;
    var end = Math.min(page * pageSize, rows.length);
    pagerInfo.textContent = (rows.length ? start + '–' + end : '0') + ' / ' + rows.length;
  }

  function renderTable() {
    tbody.innerHTML = '';
    var rows = filteredRows();
    var start = (page - 1) * pageSize;
    rows.slice(start, start + pageSize).forEach(function (r, i) {
      var tr = document.createElement('tr');
      tr.innerHTML = '<td>' + (start + i + 1) + '</td><td>' + r.name + '</td><td>' + r.method + '</td><td>' + r.pct + '</td><td>' + r.freq + '</td><td>' + r.life + '</td><td>' + r.comp + '</td><td><button class="dp-del-btn" title="Delete">' + ICON_DELETE + '</button></td>';
      tbody.appendChild(tr);
    });
    updatePager(rows);
  }
  renderTable();

  function closePageSize() {
    pageSizeList.hidden = true;
    pageSizeBtn.setAttribute('aria-expanded', 'false');
  }
  pageSizeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = pageSizeList.hidden;
    pageSizeList.hidden = !open;
    pageSizeBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  pageSizeList.addEventListener('click', function (e) {
    e.stopPropagation();
    var opt = e.target.closest('[data-size]');
    if (!opt) return;
    pageSize = parseInt(opt.getAttribute('data-size'), 10) || 10;
    page = 1;
    pageSizeVal.textContent = String(pageSize);
    pageSizeList.querySelectorAll('.dp-page-size__opt').forEach(function (o) {
      o.classList.toggle('is-active', o === opt);
    });
    closePageSize();
    renderTable();
  });
  prevBtn.addEventListener('click', function () { if (page > 1) { page--; renderTable(); } });
  nextBtn.addEventListener('click', function () {
    if (page < totalPages(filteredRows())) { page++; renderTable(); }
  });

  /* Filter popover */
  var filterBtn = document.getElementById('dpFilterBtn');
  var filterDrop = document.getElementById('dpFilterDrop');

  function openFilter() {
    filterDrop.hidden = false;
    filterBtn.setAttribute('aria-expanded', 'true');
  }
  function closeFilter() {
    filterDrop.hidden = true;
    filterBtn.setAttribute('aria-expanded', 'false');
  }
  function toggleFilter() {
    if (filterDrop.hidden) openFilter();
    else closeFilter();
  }

  filterBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleFilter();
  });
  filterDrop.addEventListener('click', function (e) { e.stopPropagation(); });
  document.addEventListener('click', function () {
    closeFilter();
    closePageSize();
  });

  /* Accordion sections */
  document.querySelectorAll('.dp-filter-section__head').forEach(function (head) {
    head.addEventListener('click', function (e) {
      e.stopPropagation();
      var section = head.closest('.dp-filter-section');
      var body = section.querySelector('.dp-filter-section__body');
      var isOpen = section.classList.contains('is-open');
      document.querySelectorAll('.dp-filter-section').forEach(function (s) {
        s.classList.remove('is-open');
        var b = s.querySelector('.dp-filter-section__body');
        if (b) b.hidden = true;
      });
      if (!isOpen) {
        section.classList.add('is-open');
        body.hidden = false;
      }
    });
  });

  [filterMethod, filterFreq, filterComp].forEach(function (sel) {
    if (!sel) return;
    sel.addEventListener('change', function () {
      page = 1;
      renderTable();
    });
  });
})();
