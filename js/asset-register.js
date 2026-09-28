/* TIME ERP — Asset Register */
(function () {
  'use strict';

  (function tick() {
    var el = document.getElementById('arTopClock'); if (!el) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
    setTimeout(tick, 30000);
  })();

  var DATA = [
    { type: 'Computer', name: 'abc', desc: '--', emp: '--', loc: '--', remarks: '--', status: 'SOLD', serial: '--', purchaseDate: '--', warrantyDate: '--', cost: '₹10000.00', currentVal: '₹10000.00', salvage: '--' },
    { type: 'Computer', name: 'PC1', desc: 'View', emp: 'Saurabh Bhardwaj', loc: '--', remarks: 'asd', status: 'Assign', serial: '--', purchaseDate: '--', warrantyDate: '--', cost: '₹10000.00', currentVal: '₹10000.00', salvage: '--' },
    { type: 'Computer', name: 'ankit', desc: 'View', emp: 'Ankit Sharma', loc: '--', remarks: '10', status: 'Un Assign', serial: '--', purchaseDate: '--', warrantyDate: '--', cost: '₹10000.00', currentVal: '₹10000.00', salvage: '--' },
    { type: 'laptop hp', name: 'ankit', desc: 'View', emp: 'Ankit Sharma', loc: '--', remarks: '1', status: 'Assign', serial: '--', purchaseDate: '--', warrantyDate: '--', cost: '₹10000.00', currentVal: '₹10000.00', salvage: '--' }
  ];

  var ICON_EDIT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.2 3.8a2.1 2.1 0 013 3L7.5 18.5 3 20l1.5-4.5L16.2 3.8z"/></svg>';
  var ICON_TRANSFER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 8H7"/><path d="M10 5L7 8l3 3"/><path d="M4 16h13"/><path d="M14 13l3 3-3 3"/></svg>';
  var ICON_CART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.2 10.4a1.5 1.5 0 001.5 1.1H18"/><path d="M7.5 8H20l-1.4 6.2a1.2 1.2 0 01-1.2.9H9.2"/><circle cx="10" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/></svg>';
  var ICON_TREND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7l5 5 3.5-3.5L21 17"/><path d="M15 17h6v-6"/></svg>';

  function actionCell(idx) {
    return '<td class="ar-td-actions"><div class="ar-row-actions">' +
      '<button type="button" class="ar-act-btn" data-action="edit" data-idx="' + idx + '" title="Edit">' + ICON_EDIT + '</button>' +
      '<button type="button" class="ar-act-btn" data-action="transfer" data-idx="' + idx + '" title="Transfer">' + ICON_TRANSFER + '</button>' +
      '<button type="button" class="ar-act-btn" data-action="sell" data-idx="' + idx + '" title="Sell">' + ICON_CART + '</button>' +
      '<button type="button" class="ar-act-btn" data-action="writeoff" data-idx="' + idx + '" title="Write Off">' + ICON_TREND + '</button>' +
      '</div></td>';
  }

  var tbody = document.getElementById('arBody');
  var pageSize = 10;
  var page = 1;
  var pageSizeBtn = document.getElementById('arPageSizeBtn');
  var pageSizeList = document.getElementById('arPageSizeList');
  var pageSizeVal = document.getElementById('arPageSizeVal');
  var pageNumEl = document.getElementById('arPageNum');
  var pageOfEl = document.getElementById('arPageOf');
  var pagerInfo = document.getElementById('arPagerInfo');
  var prevBtn = document.getElementById('arPrev');
  var nextBtn = document.getElementById('arNext');

  function totalPages() {
    return Math.max(1, Math.ceil(DATA.length / pageSize));
  }

  function updatePager() {
    var pages = totalPages();
    if (page > pages) page = pages;
    pageNumEl.textContent = String(page);
    pageOfEl.textContent = String(pages);
    prevBtn.disabled = page <= 1;
    nextBtn.disabled = page >= pages;
    var start = DATA.length ? (page - 1) * pageSize + 1 : 0;
    var end = Math.min(page * pageSize, DATA.length);
    pagerInfo.textContent = (DATA.length ? start + '–' + end : '0') + ' / ' + DATA.length;
  }

  function renderTable() {
    tbody.innerHTML = '';
    var start = (page - 1) * pageSize;
    var slice = DATA.slice(start, start + pageSize);
    slice.forEach(function (r, i) {
      var idx = start + i;
      var tr = document.createElement('tr');
      var nameHtml = '<a href="#" class="ar-link">' + r.name + '</a>';
      var descHtml = r.desc === 'View' ? '<a href="#" class="ar-link" data-modal="asset" data-idx="' + idx + '">View</a>' : r.desc;
      var depHtml = '<a href="#" class="ar-link" data-modal="dep">View</a>';
      tr.innerHTML = '<td>' + (idx + 1) + '</td><td>' + r.type + '</td><td>' + nameHtml + '</td><td>' + descHtml + '</td><td>' + r.emp + '</td>' +
        '<td><a href="#" class="ar-link" data-modal="asset" data-idx="' + idx + '">View</a></td><td>' + r.loc + '</td><td>' + depHtml + '</td>' +
        '<td>' + r.remarks + '</td><td>' + r.status + '</td>' + actionCell(idx);
      tbody.appendChild(tr);
    });
    updatePager();
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
    pageSizeList.querySelectorAll('.ar-page-size__opt').forEach(function (o) {
      o.classList.toggle('is-active', o === opt);
    });
    closePageSize();
    renderTable();
  });
  document.addEventListener('click', closePageSize);
  prevBtn.addEventListener('click', function () { if (page > 1) { page--; renderTable(); } });
  nextBtn.addEventListener('click', function () { if (page < totalPages()) { page++; renderTable(); } });

  /* Depreciation modal */
  var depModal = document.getElementById('arDepModal');
  document.getElementById('arDepClose').addEventListener('click', function () { depModal.hidden = true; });
  document.getElementById('arDepCloseBtn').addEventListener('click', function () { depModal.hidden = true; });
  depModal.addEventListener('click', function (e) { if (e.target === depModal) depModal.hidden = true; });

  /* Asset details modal */
  var assetModal = document.getElementById('arAssetModal');
  document.getElementById('arAssetClose').addEventListener('click', function () { assetModal.hidden = true; });
  document.getElementById('arAssetCloseBtn').addEventListener('click', function () { assetModal.hidden = true; });
  assetModal.addEventListener('click', function (e) { if (e.target === assetModal) assetModal.hidden = true; });

  /* Write Off & Sell modals */
  var writeOffModal = document.getElementById('arWriteOffModal');
  var writeOffDate = document.getElementById('arWriteOffDate');
  var writeOffRemarks = document.getElementById('arWriteOffRemarks');
  var writeOffCal = document.getElementById('arWriteOffCal');
  var writeOffDateClear = document.getElementById('arWriteOffDateClear');
  var writeOffIdx = null;

  var sellModal = document.getElementById('arSellModal');
  var sellAmount = document.getElementById('arSellAmount');
  var sellDate = document.getElementById('arSellDate');
  var sellRemarks = document.getElementById('arSellRemarks');
  var sellCal = document.getElementById('arSellCal');
  var sellDateClear = document.getElementById('arSellDateClear');
  var sellIdx = null;

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  var woCalView = { month: 7, year: 2026 };
  var sellCalView = { month: 7, year: 2026 };

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function parseDateStr(str) {
    var p = (str || '').split('/');
    if (p.length !== 3) return null;
    return { day: parseInt(p[0], 10), month: parseInt(p[1], 10) - 1, year: parseInt(p[2], 10) };
  }

  function fmtDate(d, m, y) { return pad(d) + '/' + pad(m + 1) + '/' + y; }

  function syncDateClear(input, clearBtn) {
    if (!clearBtn) return;
    clearBtn.hidden = !input.value;
  }

  function renderCal(calEl, dateInput, calView) {
    var sel = parseDateStr(dateInput.value);
    var first = new Date(calView.year, calView.month, 1);
    var startDay = first.getDay();
    var daysInMonth = new Date(calView.year, calView.month + 1, 0).getDate();
    var prevDays = new Date(calView.year, calView.month, 0).getDate();
    var today = new Date();
    var html = '<div class="ar-wo-cal__head">';
    html += '<span><button type="button" class="ar-wo-cal__nav" data-d="-12">&laquo;</button><button type="button" class="ar-wo-cal__nav" data-d="-1">&lsaquo;</button></span>';
    html += '<span class="ar-wo-cal__title">' + MONTHS[calView.month] + '  ' + calView.year + '</span>';
    html += '<span><button type="button" class="ar-wo-cal__nav" data-d="1">&rsaquo;</button><button type="button" class="ar-wo-cal__nav" data-d="12">&raquo;</button></span>';
    html += '</div><div class="ar-wo-cal__grid">';
    DAYS.forEach(function (d) { html += '<span class="ar-wo-cal__day-head">' + d + '</span>'; });
    var i;
    for (i = 0; i < startDay; i++) html += '<span class="ar-wo-cal__day ar-wo-cal__day--other">' + (prevDays - startDay + 1 + i) + '</span>';
    for (var d = 1; d <= daysInMonth; d++) {
      var cls = 'ar-wo-cal__day';
      if (d === today.getDate() && calView.month === today.getMonth() && calView.year === today.getFullYear()) cls += ' ar-wo-cal__day--today';
      if (sel && d === sel.day && calView.month === sel.month && calView.year === sel.year) cls += ' ar-wo-cal__day--selected';
      html += '<span class="' + cls + '" data-pick="' + d + '">' + d + '</span>';
    }
    var rem = (startDay + daysInMonth) % 7;
    if (rem) for (var j = 1; j <= 7 - rem; j++) html += '<span class="ar-wo-cal__day ar-wo-cal__day--other">' + j + '</span>';
    html += '</div><button type="button" class="ar-wo-cal__today-btn" data-today="1">Today</button>';
    calEl.innerHTML = html;

    calEl.querySelectorAll('.ar-wo-cal__nav').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var delta = parseInt(btn.getAttribute('data-d'), 10);
        calView.month += delta;
        while (calView.month < 0) { calView.month += 12; calView.year--; }
        while (calView.month > 11) { calView.month -= 12; calView.year++; }
        renderCal(calEl, dateInput, calView);
      });
    });
    calEl.querySelectorAll('[data-pick]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        dateInput.value = fmtDate(parseInt(el.getAttribute('data-pick'), 10), calView.month, calView.year);
        calEl.classList.remove('open');
        syncDateClear(dateInput, dateInput === writeOffDate ? writeOffDateClear : sellDateClear);
      });
    });
    var todayBtn = calEl.querySelector('[data-today]');
    if (todayBtn) todayBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var t = new Date();
      dateInput.value = fmtDate(t.getDate(), t.getMonth(), t.getFullYear());
      calView.month = t.getMonth();
      calView.year = t.getFullYear();
      calEl.classList.remove('open');
      syncDateClear(dateInput, dateInput === writeOffDate ? writeOffDateClear : sellDateClear);
    });
  }

  function initDatePicker(input, calEl, clearBtn, calView) {
    input.addEventListener('click', function (e) {
      e.stopPropagation();
      document.querySelectorAll('.ar-wo-cal.open').forEach(function (c) { if (c !== calEl) c.classList.remove('open'); });
      calEl.classList.toggle('open');
      if (calEl.classList.contains('open')) renderCal(calEl, input, calView);
    });
    calEl.addEventListener('click', function (e) { e.stopPropagation(); });
    if (clearBtn) {
      clearBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        input.value = '';
        calEl.classList.remove('open');
        syncDateClear(input, clearBtn);
      });
    }
  }

  document.addEventListener('click', function () {
    document.querySelectorAll('.ar-wo-cal.open').forEach(function (c) { c.classList.remove('open'); });
  });

  function setTodayDate(input, calView) {
    var t = new Date();
    input.value = fmtDate(t.getDate(), t.getMonth(), t.getFullYear());
    calView.month = t.getMonth();
    calView.year = t.getFullYear();
  }

  function openWriteOffModal(idx) {
    writeOffIdx = idx;
    setTodayDate(writeOffDate, woCalView);
    writeOffRemarks.value = '';
    writeOffCal.classList.remove('open');
    writeOffDate.classList.remove('is-error');
    syncDateClear(writeOffDate, writeOffDateClear);
    writeOffModal.hidden = false;
  }

  function closeWriteOffModal() {
    writeOffModal.hidden = true;
    writeOffCal.classList.remove('open');
    writeOffIdx = null;
  }

  function openSellModal(idx) {
    sellIdx = idx;
    sellAmount.value = '';
    setTodayDate(sellDate, sellCalView);
    sellRemarks.value = '';
    sellCal.classList.remove('open');
    sellAmount.classList.remove('is-error');
    sellDate.classList.remove('is-error');
    syncDateClear(sellDate, sellDateClear);
    sellModal.hidden = false;
  }

  function closeSellModal() {
    sellModal.hidden = true;
    sellCal.classList.remove('open');
    sellIdx = null;
  }

  document.getElementById('arWriteOffClose').addEventListener('click', closeWriteOffModal);
  document.getElementById('arWriteOffCancel').addEventListener('click', closeWriteOffModal);
  writeOffModal.addEventListener('click', function (e) { if (e.target === writeOffModal) closeWriteOffModal(); });

  document.getElementById('arSellClose').addEventListener('click', closeSellModal);
  document.getElementById('arSellCancel').addEventListener('click', closeSellModal);
  sellModal.addEventListener('click', function (e) { if (e.target === sellModal) closeSellModal(); });

  initDatePicker(writeOffDate, writeOffCal, writeOffDateClear, woCalView);
  initDatePicker(sellDate, sellCal, sellDateClear, sellCalView);

  document.getElementById('arWriteOffSubmit').addEventListener('click', function () {
    writeOffDate.classList.remove('is-error');
    if (!writeOffDate.value.trim()) {
      writeOffDate.classList.add('is-error');
      writeOffDate.focus();
      return;
    }
    if (writeOffIdx != null && DATA[writeOffIdx]) DATA[writeOffIdx].status = 'SOLD';
    closeWriteOffModal();
    renderTable();
  });
  writeOffDate.addEventListener('click', function () { writeOffDate.classList.remove('is-error'); });

  document.getElementById('arSellSubmit').addEventListener('click', function () {
    var ok = true;
    sellAmount.classList.remove('is-error');
    sellDate.classList.remove('is-error');
    if (!sellAmount.value.trim()) { sellAmount.classList.add('is-error'); sellAmount.focus(); ok = false; }
    if (!sellDate.value.trim()) { sellDate.classList.add('is-error'); if (ok) sellDate.focus(); ok = false; }
    if (!ok) return;
    if (sellIdx != null && DATA[sellIdx]) DATA[sellIdx].status = 'SOLD';
    closeSellModal();
    renderTable();
  });

  sellAmount.addEventListener('input', function () { sellAmount.classList.remove('is-error'); });
  sellDate.addEventListener('click', function () { sellDate.classList.remove('is-error'); });

  /* Transfer Asset modal */
  var transferModal = document.getElementById('arTransferModal');
  var transferPartner = document.getElementById('arTransferPartner');
  var transferPartnerList = document.getElementById('arTransferPartnerList');
  var transferIdx = null;
  var PARTNERS = [
    '(AN2) Tarun Gaur',
    '(SA009) Suhanshi Rawat',
    '(SO6829) SONIYA KASHYAP',
    '(HA6413) Hardik rawat',
    '(SI6830) SIMRAN KASHYAP',
    '(KA7564) KAPIL',
    '(AS0010) Aastha Tyagi',
    '(SK009) Shivam Kumar'
  ];

  function renderPartners(filter) {
    var f = (filter || '').toLowerCase();
    transferPartnerList.innerHTML = '';
    PARTNERS.forEach(function (p) {
      if (f && p.toLowerCase().indexOf(f) === -1) return;
      var d = document.createElement('div');
      d.className = 'ar-partner-combo__opt' + (transferPartner.value === p ? ' active' : '');
      d.textContent = p;
      d.addEventListener('mousedown', function (e) {
        e.preventDefault();
        transferPartner.value = p;
        transferPartnerList.classList.remove('open');
      });
      transferPartnerList.appendChild(d);
    });
  }

  function openTransferModal(idx) {
    transferIdx = idx;
    transferPartner.value = '';
    transferPartnerList.classList.remove('open');
    transferModal.hidden = false;
    setTimeout(function () { transferPartner.focus(); }, 30);
  }

  function closeTransferModal() {
    transferModal.hidden = true;
    transferPartnerList.classList.remove('open');
    transferIdx = null;
  }

  transferPartner.addEventListener('focus', function () {
    renderPartners(transferPartner.value);
    transferPartnerList.classList.add('open');
  });
  transferPartner.addEventListener('input', function () {
    renderPartners(transferPartner.value);
    transferPartnerList.classList.add('open');
  });
  transferPartner.addEventListener('blur', function () {
    setTimeout(function () { transferPartnerList.classList.remove('open'); }, 150);
  });

  document.getElementById('arTransferClose').addEventListener('click', closeTransferModal);
  document.getElementById('arTransferCancel').addEventListener('click', closeTransferModal);
  transferModal.addEventListener('click', function (e) {
    if (e.target === transferModal) closeTransferModal();
  });
  document.getElementById('arTransferSubmit').addEventListener('click', function () {
    if (!transferPartner.value.trim()) {
      transferPartner.focus();
      renderPartners('');
      transferPartnerList.classList.add('open');
      return;
    }
    if (transferIdx != null && DATA[transferIdx]) {
      DATA[transferIdx].emp = transferPartner.value.replace(/^\([^)]+\)\s*/, '');
      DATA[transferIdx].status = 'Assign';
    }
    closeTransferModal();
    renderTable();
  });

  function rowIndexFromBtn(btn) {
    var raw = btn.getAttribute('data-idx');
    if (raw != null && raw !== '') {
      var n = parseInt(raw, 10);
      if (!isNaN(n)) return n;
    }
    var tr = btn.closest('tr');
    var rows = tbody.querySelectorAll('tr');
    var idx = Array.prototype.indexOf.call(rows, tr);
    return idx >= 0 ? idx : 0;
  }

  /* Table clicks */
  tbody.addEventListener('click', function (e) {
    var actBtn = e.target.closest('[data-action]');
    if (actBtn) {
      e.preventDefault();
      var action = actBtn.getAttribute('data-action');
      var idx = rowIndexFromBtn(actBtn);
      if (action === 'edit') {
        try {
          sessionStorage.setItem('ar_edit_asset', JSON.stringify({ index: idx, asset: DATA[idx] || null }));
        } catch (err) {}
        window.location.href = 'register_asset.html?edit=' + encodeURIComponent(String(idx));
        return;
      }
      if (action === 'transfer') openTransferModal(idx);
      else if (action === 'writeoff') openWriteOffModal(idx);
      else if (action === 'sell') openSellModal(idx);
      return;
    }
    var el = e.target.closest('[data-modal]');
    if (!el) return;
    e.preventDefault();
    if (el.getAttribute('data-modal') === 'dep') {
      depModal.hidden = false;
    } else if (el.getAttribute('data-modal') === 'asset') {
      var idx = parseInt(el.getAttribute('data-idx'), 10);
      var r = DATA[idx] || DATA[0];
      var tbl = document.getElementById('arAssetTable');
      tbl.innerHTML = '<tr><td>Serial Number</td><td>' + r.serial + '</td></tr><tr><td>Purchase Date</td><td>' + r.purchaseDate + '</td></tr><tr><td>Warranty Expiry Date</td><td>' + r.warrantyDate + '</td></tr><tr><td>Purchase Cost</td><td>' + r.cost + '</td></tr><tr><td>Current Value</td><td>' + r.currentVal + '</td></tr><tr><td>Salvage Value</td><td>' + r.salvage + '</td></tr>';
      assetModal.hidden = false;
    }
  });
})();
