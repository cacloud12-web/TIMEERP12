/* TIME ERP — DSC Tracker */
(function () {
  'use strict';

  /* Clock */
  (function tick() {
    var el = document.getElementById('dscTopClock');
    if (!el) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
    setTimeout(tick, 30000);
  })();

  /* Set default dates + validity display */
  var now = new Date();
  var pad = function (n) { return n < 10 ? '0' + n : n; };
  function fmtDMY(d) {
    return pad(d.getDate()) + '-' + pad(d.getMonth() + 1) + '-' + d.getFullYear();
  }
  function fmtISO(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function parseISO(str) {
    if (!str) return null;
    var p = str.split('-');
    if (p.length !== 3) return null;
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  var startEl = document.getElementById('dscStartDate');
  var endEl = document.getElementById('dscEndDate');
  var validityDisplay = document.getElementById('dscValidityDisplay');
  var validityWrap = document.getElementById('dscValidityWrap');
  var validityPanel = document.getElementById('dscValidityPanel');

  var endDefault = now;
  var startDefault = new Date(now.getTime() - 7 * 86400000);
  if (startEl) startEl.value = fmtISO(startDefault);
  if (endEl) endEl.value = fmtISO(endDefault);

  function syncValidityDisplay() {
    if (!validityDisplay || !startEl || !endEl) return;
    var s = parseISO(startEl.value);
    var e = parseISO(endEl.value);
    if (s && e) validityDisplay.value = fmtDMY(s) + ' → ' + fmtDMY(e);
  }
  syncValidityDisplay();

  if (validityDisplay && validityPanel && validityWrap) {
    validityDisplay.addEventListener('click', function () {
      var open = validityPanel.hidden;
      validityPanel.hidden = !open;
      validityDisplay.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    if (startEl) startEl.addEventListener('change', syncValidityDisplay);
    if (endEl) endEl.addEventListener('change', syncValidityDisplay);
    document.addEventListener('click', function (e) {
      if (!validityWrap.contains(e.target)) {
        validityPanel.hidden = true;
        validityDisplay.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Combo helper (click-to-open dropdown) */
  function initCombo(comboId, inputId, menuId, items) {
    var combo = document.getElementById(comboId);
    var input = document.getElementById(inputId);
    var menu = document.getElementById(menuId);
    if (!combo || !input || !menu) return;
    function render() {
      menu.innerHTML = '';
      items.forEach(function (item) {
        var div = document.createElement('div');
        div.className = 'dsc-combo__item' + (input.value === item ? ' is-selected' : '');
        div.textContent = item;
        div.addEventListener('click', function (e) {
          e.stopPropagation();
          input.value = item;
          combo.classList.remove('is-open');
        });
        menu.appendChild(div);
      });
    }
    function toggle() {
      var willOpen = !combo.classList.contains('is-open');
      document.querySelectorAll('.dsc-combo.is-open').forEach(function (el) {
        el.classList.remove('is-open');
      });
      if (willOpen) {
        render();
        combo.classList.add('is-open');
      }
    }
    input.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle();
    });
    combo.addEventListener('click', function (e) {
      if (e.target === input) return;
      e.stopPropagation();
      toggle();
    });
    document.addEventListener('click', function () { combo.classList.remove('is-open'); });
  }

  initCombo('dscFYCombo', 'dscFYInput', 'dscFYMenu', ['FY 27-28','FY 26-27','FY 25-26','FY 24-25','FY 23-24','FY 22-23','FY 21-22','FY 20-21']);
  initCombo('dscClientCombo', 'dscClientInput', 'dscClientMenu', [
    '(21) Internal','(174) SAURABH BHA...','(173) SAURABH BHA...','(TH296) THE GOLD R...',
    '(LA3720) law seva ma...','(145) PERFECT PAIR','(TA119098) TATA MO...','(SA128007) Saksham'
  ]);

  /* Donut chart — matches screenshot (colors, callouts, gaps) */
  var canvas = document.getElementById('dscDonut');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width;
    var H = canvas.height;
    var cx = W / 2;
    var cy = H / 2 + 4;
    var r = 96;
    var lw = 34;
    var gap = 0.035;

    var slices = [
      { val: 3, color: '#5b8def', label: 'Active', short: 'Active' },
      { val: 1, color: '#7dd3b0', label: 'Recent Expiring', short: 'Recent Ex...' },
      { val: 11, color: '#6b7c93', label: 'Recent Expired', short: 'Recent Ex...' },
      { val: 6, color: '#f5c542', label: 'No Expiry Date', short: 'No Expiry ...' }
    ];

    var total = 0;
    slices.forEach(function (s) { total += s.val; });

    ctx.clearRect(0, 0, W, H);

    var startAngle = -Math.PI / 2;
    slices.forEach(function (s) {
      var sweep = (s.val / total) * 2 * Math.PI;
      var a0 = startAngle + gap / 2;
      var a1 = startAngle + sweep - gap / 2;
      if (a1 <= a0) a1 = a0 + 0.01;

      ctx.beginPath();
      ctx.arc(cx, cy, r, a0, a1);
      ctx.lineWidth = lw;
      ctx.lineCap = 'butt';
      ctx.strokeStyle = s.color;
      ctx.stroke();

      s.mid = (a0 + a1) / 2;
      s.a0 = a0;
      s.a1 = a1;
      startAngle += sweep;
    });

    /* Callout leader lines + labels */
    ctx.font = '600 12px Inter, system-ui, sans-serif';
    ctx.textBaseline = 'middle';

    slices.forEach(function (s) {
      var mid = s.mid;
      var cos = Math.cos(mid);
      var sin = Math.sin(mid);
      var x0 = cx + cos * (r + lw / 2 + 2);
      var y0 = cy + sin * (r + lw / 2 + 2);
      var x1 = cx + cos * (r + lw / 2 + 22);
      var y1 = cy + sin * (r + lw / 2 + 22);
      var right = cos >= 0;
      var x2 = x1 + (right ? 18 : -18);
      var y2 = y1;

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 1.25;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.textAlign = right ? 'left' : 'right';
      ctx.fillText(s.short, x2 + (right ? 6 : -6), y2);
    });
  }

  /* Table data + pagination */
  var BASE_ROWS = [
    { client: '--', dscNo: '--', holder: 'saurabh bharadwaj', mobile: '--', email: '--', partner: 'Kamal Kant Sharma', validFrom: '--', valid: '27/04/2024 05:30:00 am', handed: 'Yes', custodian: 'Kamal Kant Sharma', receivedOn: '--', receiver: 'Kamal Kant Sharma', remarks: 'ok' },
    { client: '--', dscNo: '--', holder: 'saurabh bharadwaj', mobile: '--', email: '--', partner: '--', validFrom: '--', valid: '26/04/2024 05:30:00 am', handed: 'Yes', custodian: 'Tarun Gaur', receivedOn: '--', receiver: 'Tarun Gaur', remarks: '--' },
    { client: '--', dscNo: '--', holder: 'wqw', mobile: '--', email: '--', partner: '--', validFrom: '--', valid: '--', handed: 'Yes', custodian: 'CA Yogesh Bhardwaj', receivedOn: '--', receiver: 'CA Yogesh Bhardwaj', remarks: '55665' },
    { client: '--', dscNo: '--', holder: 'wqw', mobile: '--', email: '--', partner: '--', validFrom: '--', valid: '01/05/2024 05:30:00 am', handed: 'Yes', custodian: 'CA Yogesh Bhardwaj', receivedOn: '--', receiver: 'CA Yogesh Bhardwaj', remarks: '--' }
  ];
  var DATA = [];
  (function buildData() {
    var holders = ['saurabh bharadwaj', 'wqw', 'Tarun Gaur', 'CA Yogesh Bhardwaj', 'Kamal Kant Sharma', 'Hardik rawat'];
    var i;
    for (i = 0; i < 24; i++) {
      var src = BASE_ROWS[i % BASE_ROWS.length];
      DATA.push({
        client: src.client,
        dscNo: src.dscNo,
        holder: holders[i % holders.length],
        mobile: src.mobile,
        email: src.email,
        partner: src.partner,
        validFrom: src.validFrom,
        valid: src.valid,
        handed: src.handed,
        custodian: src.custodian,
        receivedOn: src.receivedOn,
        receiver: src.receiver,
        remarks: src.remarks
      });
    }
  })();

  var PAGE_SIZE = 5;
  var currentPage = 1;
  var tbody = document.getElementById('dscBody');
  var totalEl = document.querySelector('.dsc-total');
  var pageInput = document.getElementById('dscPageInput');
  var pageTotalEl = document.getElementById('dscPageTotal');
  var pageCountEl = document.getElementById('dscPageCount');
  var prevBtn = document.getElementById('dscPrev');
  var nextBtn = document.getElementById('dscNext');

  function totalPages() {
    return Math.max(1, Math.ceil(DATA.length / PAGE_SIZE));
  }

  function colHidden(key) {
    var input = document.querySelector('.dsc-col-drop input[data-dsc-col="' + key + '"]');
    return input ? !input.checked : false;
  }

  function syncPager() {
    var pages = totalPages();
    if (currentPage > pages) currentPage = pages;
    if (currentPage < 1) currentPage = 1;
    if (pageInput) pageInput.value = String(currentPage);
    if (pageTotalEl) pageTotalEl.textContent = String(pages);
    var start = (currentPage - 1) * PAGE_SIZE;
    var shown = Math.min(PAGE_SIZE, Math.max(0, DATA.length - start));
    if (pageCountEl) pageCountEl.textContent = shown + ' / ' + DATA.length;
    if (totalEl) totalEl.textContent = 'Total Count : ' + DATA.length;
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= pages;
  }

  function renderTable() {
    if (!tbody) return;
    tbody.innerHTML = '';
    var start = (currentPage - 1) * PAGE_SIZE;
    var pageRows = DATA.slice(start, start + PAGE_SIZE);
    pageRows.forEach(function (r) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><input type="checkbox"></td>' +
        '<td>' + r.client + '</td>' +
        '<td data-dsc-col="dscNo"' + (colHidden('dscNo') ? ' hidden' : '') + '>' + r.dscNo + '</td>' +
        '<td>' + r.holder + '</td>' +
        '<td data-dsc-col="mobile"' + (colHidden('mobile') ? ' hidden' : '') + '>' + r.mobile + '</td>' +
        '<td data-dsc-col="email"' + (colHidden('email') ? ' hidden' : '') + '>' + r.email + '</td>' +
        '<td>' + r.partner + '</td>' +
        '<td data-dsc-col="validFrom"' + (colHidden('validFrom') ? ' hidden' : '') + '>' + r.validFrom + '</td>' +
        '<td>' + r.valid + '</td>' +
        '<td>' + r.handed + '</td>' +
        '<td>' + r.custodian + '</td>' +
        '<td data-dsc-col="billing"' + (colHidden('billing') ? ' hidden' : '') + '><button class="dsc-billing-btn" title="Billing" type="button">⊕</button></td>' +
        '<td data-dsc-col="receivedOn"' + (colHidden('receivedOn') ? ' hidden' : '') + '>' + r.receivedOn + '</td>' +
        '<td>' + r.receiver + '</td>' +
        '<td>' + r.remarks + '</td>';
      tbody.appendChild(tr);
    });
    syncPager();
    var deleteBtn = document.getElementById('dscDeleteBtn');
    if (deleteBtn) deleteBtn.hidden = true;
    var checkAll = document.getElementById('dscCheckAll');
    if (checkAll) {
      checkAll.checked = false;
      checkAll.indeterminate = false;
    }
  }
  renderTable();

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage -= 1;
        renderTable();
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      if (currentPage < totalPages()) {
        currentPage += 1;
        renderTable();
      }
    });
  }
  if (pageInput) {
    pageInput.addEventListener('change', function () {
      var n = parseInt(pageInput.value, 10);
      if (!isNaN(n)) {
        currentPage = Math.min(totalPages(), Math.max(1, n));
        renderTable();
      } else {
        pageInput.value = String(currentPage);
      }
    });
    pageInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        pageInput.blur();
      }
    });
  }

  /* Row selection → show delete icon */
  (function initRowSelection() {
    var table = document.getElementById('dscTable');
    var checkAll = document.getElementById('dscCheckAll');
    var deleteBtn = document.getElementById('dscDeleteBtn');
    if (!table || !deleteBtn) return;

    function rowChecks() {
      return Array.prototype.slice.call(table.querySelectorAll('tbody input[type="checkbox"]'));
    }

    function syncSelectionUI() {
      var checks = rowChecks();
      var checked = checks.filter(function (el) { return el.checked; });
      deleteBtn.hidden = checked.length === 0;
      checks.forEach(function (el) {
        var tr = el.closest('tr');
        if (tr) tr.classList.toggle('is-selected', el.checked);
      });
      if (checkAll) {
        checkAll.checked = checks.length > 0 && checked.length === checks.length;
        checkAll.indeterminate = checked.length > 0 && checked.length < checks.length;
      }
    }

    if (checkAll) {
      checkAll.addEventListener('change', function () {
        rowChecks().forEach(function (el) { el.checked = checkAll.checked; });
        checkAll.indeterminate = false;
        syncSelectionUI();
      });
    }

    table.addEventListener('change', function (e) {
      if (e.target && e.target.matches('tbody input[type="checkbox"]')) syncSelectionUI();
    });

    deleteBtn.addEventListener('click', function () {
      var checks = rowChecks().filter(function (el) { return el.checked; });
      if (!checks.length) return;
      if (!window.confirm('Delete ' + checks.length + ' selected DSC record' + (checks.length > 1 ? 's' : '') + '?')) return;
      var start = (currentPage - 1) * PAGE_SIZE;
      var indexes = checks.map(function (el) {
        var tr = el.closest('tr');
        var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));
        return start + rows.indexOf(tr);
      }).filter(function (i) { return i >= 0; }).sort(function (a, b) { return b - a; });
      indexes.forEach(function (i) { DATA.splice(i, 1); });
      if (currentPage > totalPages()) currentPage = totalPages();
      renderTable();
      if (window.DashboardShell) DashboardShell.toast('DSC', 'Selected records deleted.');
    });

    syncSelectionUI();
  })();

  /* Columns dropdown */
  (function initColumnsDrop() {
    var wrap = document.getElementById('dscColWrap');
    var btn = document.getElementById('dscColumnsBtn');
    var drop = document.getElementById('dscColDrop');
    var selectAll = document.getElementById('dscColSelectAll');
    if (!wrap || !btn || !drop) return;

    var colInputs = Array.prototype.slice.call(drop.querySelectorAll('input[data-dsc-col]'));

    function syncSelectAllState() {
      if (!selectAll) return;
      var checked = colInputs.filter(function (el) { return el.checked; }).length;
      selectAll.checked = checked === colInputs.length;
      selectAll.indeterminate = checked > 0 && checked < colInputs.length;
    }

    function applyColumns() {
      colInputs.forEach(function (input) {
        var key = input.getAttribute('data-dsc-col');
        var show = input.checked;
        document.querySelectorAll('#dscTable [data-dsc-col="' + key + '"]').forEach(function (cell) {
          if (show) cell.removeAttribute('hidden');
          else cell.setAttribute('hidden', '');
        });
      });
      syncSelectAllState();
    }

    function setOpen(open) {
      wrap.classList.toggle('is-open', open);
      drop.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(drop.hidden);
    });
    drop.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () { setOpen(false); });

    colInputs.forEach(function (input) {
      input.addEventListener('change', applyColumns);
    });
    if (selectAll) {
      selectAll.addEventListener('change', function () {
        colInputs.forEach(function (input) { input.checked = selectAll.checked; });
        selectAll.indeterminate = false;
        applyColumns();
      });
    }
    applyColumns();
  })();

  /* ── Add DSC Modal ── */
  var addModal = document.getElementById('dscAddModal');
  var addBtn = document.querySelector('.dsc-add-btn');
  var closeBtn = document.getElementById('dscModalClose');
  var cancelBtn = document.getElementById('dscModalCancel');
  var saveBtn = document.getElementById('dscModalSave');

  function openModal() { addModal.hidden = false; }
  function closeModal() { addModal.hidden = true; }

  if (addBtn) addBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (addModal) addModal.addEventListener('click', function (e) { if (e.target === addModal) closeModal(); });
  if (saveBtn) saveBtn.addEventListener('click', function () { closeModal(); if (window.DashboardShell) DashboardShell.toast('DSC', 'DSC saved successfully.'); });

  var STAFF = ['Tarun Gaur','Suhanshi Rawat','SONIYA KASHYAP','Hardik rawat','SIMRAN KASHYAP','Aastha Tyagi','Shivam Kumar','Aakash'];
  var BRANCHES = ['CA CloudDesk','Bluemon Wealth Management','Law Seva Management Private Limited','saurabh bharadwaj'];
  var SIGNING = ['Kamal Kant Sharma','Saurabh Bhardwaj'];
  var CATEGORIES_DSC = ['DSC Made By Us','Dsc Made By Client','Other'];

  initCombo('dscHandedByCombo', 'dscHandedByInput', 'dscHandedByMenu', STAFF);
  initCombo('dscReceivedByCombo', 'dscReceivedByInput', 'dscReceivedByMenu', STAFF);
  initCombo('dscBranchCombo', 'dscBranchInput', 'dscBranchMenu', BRANCHES);
  initCombo('dscSignCombo', 'dscSignInput', 'dscSignMenu', SIGNING);
  initCombo('dscCatCombo', 'dscCatInput', 'dscCatMenu', CATEGORIES_DSC);

  /* ── Invoice Modal ── */
  var invModal = document.getElementById('dscInvoiceModal');
  var invClose = document.getElementById('dscInvClose');
  var invSave = document.getElementById('dscInvSave');

  function openInvModal() { invModal.hidden = false; }
  function closeInvModal() { invModal.hidden = true; }

  if (invClose) invClose.addEventListener('click', closeInvModal);
  if (invModal) invModal.addEventListener('click', function (e) { if (e.target === invModal) closeInvModal(); });
  if (invSave) invSave.addEventListener('click', function () { closeInvModal(); if (window.DashboardShell) DashboardShell.toast('Invoice', 'Invoice added.'); });

  // Billing buttons in table
  tbody.addEventListener('click', function (e) {
    var btn = e.target.closest('.dsc-billing-btn');
    if (btn) openInvModal();
  });

  // Set default dates
  var invDateEl = document.getElementById('invDate');
  var invExpEl = document.getElementById('invExpDate');
  if (invDateEl) invDateEl.value = todayStr;
  if (invExpEl) {
    var exp = new Date(now.getTime() + 21 * 86400000);
    invExpEl.value = exp.getFullYear() + '-' + pad(exp.getMonth() + 1) + '-' + pad(exp.getDate());
  }

  initCombo('invBranchCombo', 'invBranchInput', 'invBranchMenu', BRANCHES);
  initCombo('invTeamCombo', 'invTeamInput', 'invTeamMenu', ['GST', 'Team 1', 'GST Team']);

  var HSN_ITEMS = [
    'NA (NA)', '998222 (Accounting and bookkeeping services)',
    '998232 (Individual tax preparation and planning services, P...)',
    '998231 (Services for corporate tax planning and preparation)',
    '998223 (Payroll services, Services for Payroll Processing H...)',
    '998211 (Criminal law legal consultation and representation ...)',
    '998212 (Legal advice and representation in various areas o...)',
    '998312 (Business consulting services including pubic relati...)',
    '998313 (Information technology (IT) consulting and suppor...)',
    '998224 (Other Similar services Under Legal and Accountin...)',
    '998315 (Hosting and information technology (IT) infrastruc...)',
    '997156 (Financial Consultancy Services)',
    '998232 - Export (Individual tax preparation and planning se...)',
    '121 (VAT)',
    '998221 (Financial auditing services. Corporate Statutory A...)',
    '998213 (Patent, copyright and other intellectual property d...)',
    '998214 (Legal documentation and document certification s...)',
    '998215 (Arbitration and conciliation services)',
    '998216 (Other legal services)',
    '998311 (Management consulting and management service...)'
  ];
  initCombo('invHsnCombo', 'invHsnInput', 'invHsnMenu', HSN_ITEMS);

  /* DSC field combo (numbers) */
  // DSC field in invoice is read-only, no combo needed

  /* Add Document button */
  var addDocBtn = document.getElementById('dscAddDoc');
  if (addDocBtn) {
    addDocBtn.addEventListener('click', function () {
      var input = document.createElement('input');
      input.type = 'file';
      input.click();
    });
  }
})();
