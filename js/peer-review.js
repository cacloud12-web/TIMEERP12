/* TIME ERP — Peer Review */
(function () {
  'use strict';

  (function tick() {
    var el = document.getElementById('prTopClock'); if (!el) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
    setTimeout(tick, 30000);
  })();

  function initCombo(comboId, inputId, menuId, items) {
    var combo = document.getElementById(comboId), input = document.getElementById(inputId), menu = document.getElementById(menuId);
    if (!combo || !input || !menu) return;
    function render(f) {
      var q = (f || '').toLowerCase(); menu.innerHTML = '';
      items.forEach(function (item) {
        if (q && item.toLowerCase().indexOf(q) === -1) return;
        var div = document.createElement('div'); div.className = 'pr-combo__item'; div.textContent = item;
        div.addEventListener('click', function () { input.value = item; combo.classList.remove('is-open'); });
        menu.appendChild(div);
      });
    }
    input.addEventListener('focus', function () { render(''); combo.classList.add('is-open'); });
    input.addEventListener('input', function () { render(input.value); combo.classList.add('is-open'); });
    document.addEventListener('click', function (e) { if (!combo.contains(e.target)) combo.classList.remove('is-open'); });
  }

  var CLIENTS = ['Internal','SAURABH BHARDWAJ','SAURABH BHARDWA...','THE GOLD REALTY','law seva management...','PERFECT PAIR','TATA MOTORS PASSE...','Saksham'];
  var STAFF = ['Tarun Gaur','Suhanshi Rawat','SONIYA KASHYAP','Hardik rawat','SIMRAN KASHYAP','Aastha Tyagi','Shivam Kumar','Aakash'];

  initCombo('prClientCombo', 'prClientInput', 'prClientMenu', CLIENTS);
  initCombo('prEmpCombo', 'prEmpInput', 'prEmpMenu', STAFF);

  /* Columns */
  var COLS = ['#','Client Name','Financial Year','UDIN No.','PAN','File NO.','Name of Branch/HO of PU','Team InCharge','Services','Turnover > 250 Cr','Networth > 100 Cr','IND AS Balance Sheet','Weather Engagement Quality Review Done','Paid up/ Partner\'s/ Proprietor\'s Capital','Borrowings from Banks/ NBFCs (incl. Short Term & Long Term)','Fees','Net Profit','Remarks','View Attachment','Action'];
  var colWrap = document.getElementById('prColWrap'), colBtn = document.getElementById('prColBtn'), colList = document.getElementById('prColList');
  COLS.forEach(function (c) { var l = document.createElement('label'); l.innerHTML = '<input type="checkbox" checked> ' + c; colList.appendChild(l); });
  colBtn.addEventListener('click', function () { colWrap.classList.toggle('is-open'); });
  document.addEventListener('click', function (e) { if (!colWrap.contains(e.target)) colWrap.classList.remove('is-open'); });

  /* Filter */
  var filterWrap = document.getElementById('prFilterWrap'), filterBtn = document.getElementById('prFilterBtn');
  filterBtn.addEventListener('click', function () { filterWrap.classList.toggle('is-open'); });
  document.addEventListener('click', function (e) { if (!filterWrap.contains(e.target)) filterWrap.classList.remove('is-open'); });

  /* Table */
  var BASE_DATA = [
    { client:'SAURABH BHARDWAJ HUF', fy:'FY 24-25', udin:'A123', pan:'ABIHS3652M', file:'173', branch:'Bluemon Wealth Management', team:'NIRANJAN SINGH', svc:'AD Code', turnover:'--', networth:'--', indas:'--', weather:'No', paid:'--', borrow:'--', fees:'--', profit:'--', remarks:'--', attach:'--' },
    { client:'GAURAV KUMAR FFCPK5247B', fy:'FY 24-25', udin:'5453453453', pan:'FFCPK5247B', file:'GA137', branch:'Bluemon Wealth Management', team:'CA Aditi Sharma', svc:'Accounting', turnover:'--', networth:'--', indas:'--', weather:'No', paid:'--', borrow:'--', fees:'--', profit:'--', remarks:'--', attach:'--' },
    { client:'SAURABH BHARDWAJ', fy:'FY 25-26', udin:'A1B2', pan:'BUNPB0614B', file:'174', branch:'Bluemon Wealth Management', team:'NIRANJAN SINGH', svc:'Accounts', turnover:'1Cr-5Cr', networth:'10L-50L', indas:'Ind As', weather:'Yes', paid:'1000000', borrow:'--', fees:'--', profit:'1000', remarks:'--', attach:'--' },
    { client:'SAURABH BHARDWAJ HUF', fy:'FY 25-26', udin:'--', pan:'ABIHS3652M', file:'173', branch:'Bluemon Wealth Management', team:'Saurabh Bhardwaj', svc:'Accounts', turnover:'--', networth:'--', indas:'--', weather:'No', paid:'--', borrow:'--', fees:'--', profit:'--', remarks:'--', attach:'--' },
    { client:'SAURABH BHARDWAJ', fy:'FY 25-26', udin:'sfdsdfs', pan:'BUNPB0614B', file:'174', branch:'Bluemon Wealth Management', team:'--', svc:'AD Code', turnover:'50L-1Cr', networth:'50L-1Cr', indas:'Ind As', weather:'Yes', paid:'--', borrow:'--', fees:'--', profit:'40000', remarks:'--', attach:'--' },
    { client:'SAURABH BHARDWAJ HUF', fy:'FY 24-25', udin:'--', pan:'ABIHS3652M', file:'173', branch:'Bluemon Wealth Management', team:'CA ram Kumar', svc:'Accounting', turnover:'--', networth:'--', indas:'--', weather:'No', paid:'--', borrow:'--', fees:'--', profit:'--', remarks:'--', attach:'--' },
    { client:'SURAKSHIT AYURVEDA', fy:'FY 25-26', udin:'--', pan:'CZZPR9103B4', file:'SU18082', branch:'Law Seva Management Private Limited', team:'--', svc:'Accounting', turnover:'10L-50L', networth:'10L-50L', indas:'jhkhjk', weather:'Yes', paid:'hjjkkjj', borrow:'hjkhj', fees:'hjkhjk', profit:'--', remarks:'--', attach:'--' },
    { client:'SAURABH BHARDWAJ', fy:'FY 25-26', udin:'768768678775463456', pan:'BUNPB0614B', file:'174', branch:'Bluemon Wealth Management', team:'--', svc:'AD Code', turnover:'--', networth:'--', indas:'--', weather:'No', paid:'--', borrow:'--', fees:'--', profit:'--', remarks:'--', attach:'--' },
    { client:'SAURABH BHARDWAJ', fy:'FY 24-25', udin:'fgdfgdfgdfgdf45345634534', pan:'BUNPB0614B', file:'174', branch:'Bluemon Wealth Management', team:'--', svc:'AD Code', turnover:'50L-1Cr', networth:'0-10L', indas:'Ind As', weather:'Yes', paid:'1000000', borrow:'yes', fees:'40000', profit:'10000', remarks:'ok', attach:'--' },
    { client:'SAURABH BHARDWAJ HUF', fy:'FY 24-25', udin:'2312312312312', pan:'ABIHS3652M', file:'173', branch:'Bluemon Wealth Management', team:'Saurabh Bhardwaj', svc:'Accounting', turnover:'--', networth:'10L-50L', indas:'--', weather:'No', paid:'1000000', borrow:'hjkhj', fees:'hjkhjk', profit:'1000', remarks:'--', attach:'--' },
    { client:'SAURABH BHARDWAJ', fy:'FY 24-25', udin:'mghighigh', pan:'BUNPB0614B', file:'174', branch:'Law Seva Management Private Limited', team:'CA ram Kumar', svc:'Accounting', turnover:'250Cr-500Cr', networth:'10Cr-50Cr', indas:'--', weather:'Yes', paid:'1000000', borrow:'yes', fees:'1000', profit:'1000', remarks:'--', attach:'View' },
    { client:'SAURABH BHARDWAJ HUF', fy:'FY 25-26', udin:'23322343242347', pan:'ABIHS3652M', file:'173', branch:'Bluemon Wealth Management', team:'Saurabh Bhardwaj', svc:'Accounting', turnover:'50L-1Cr', networth:'--', indas:'--', weather:'No', paid:'--', borrow:'--', fees:'--', profit:'--', remarks:'--', attach:'--' }
  ];
  var DATA = [];
  while (DATA.length < 36) DATA.push(JSON.parse(JSON.stringify(BASE_DATA[DATA.length % BASE_DATA.length])));

  var PAGE_SIZE = 20;
  var state = { page: 1 };
  var tbody = document.getElementById('prBody');
  var pageInput = document.getElementById('prPageInput');
  var pageTotalEl = document.getElementById('prPageTotal');
  var countEl = document.getElementById('prCount');
  var prevBtn = document.getElementById('prPrev');
  var nextBtn = document.getElementById('prNext');
  var tableWrap = document.getElementById('prTableWrap');
  var scrollThumb = document.getElementById('prScrollThumb');

  function totalPages() { return Math.max(1, Math.ceil(DATA.length / PAGE_SIZE)); }

  function updatePagination() {
    var pages = totalPages();
    var start = (state.page - 1) * PAGE_SIZE;
    var end = Math.min(start + PAGE_SIZE, DATA.length);
    if (pageInput) pageInput.value = state.page;
    if (pageTotalEl) pageTotalEl.textContent = pages;
    if (countEl) countEl.textContent = end + ' / ' + DATA.length;
    if (prevBtn) prevBtn.disabled = state.page <= 1;
    if (nextBtn) nextBtn.disabled = state.page >= pages;
  }

  function syncScrollBar() {
    if (!tableWrap || !scrollThumb) return;
    var sw = tableWrap.scrollWidth, cw = tableWrap.clientWidth;
    if (sw <= cw) { scrollThumb.style.width = '100%'; scrollThumb.style.left = '0'; return; }
    var ratio = cw / sw, thumbW = Math.max(ratio * 100, 12);
    var maxLeft = 100 - thumbW;
    var left = maxLeft * (tableWrap.scrollLeft / (sw - cw));
    scrollThumb.style.width = thumbW + '%';
    scrollThumb.style.left = left + '%';
  }

  function renderTable() {
    tbody.innerHTML = '';
    var start = (state.page - 1) * PAGE_SIZE;
    var rows = DATA.slice(start, start + PAGE_SIZE);
    rows.forEach(function (r, i) {
      var tr = document.createElement('tr');
      var idx = start + i;
      var svcHtml = '<span class="pr-badge">' + r.svc + '</span>';
      var attachHtml = r.attach === 'View' ? '<a href="#" class="pr-link">View</a>' : r.attach;
      tr.innerHTML = '<td>' + (idx + 1) + '</td><td>' + r.client + '</td><td>' + r.fy + '</td><td>' + r.udin + '</td><td>' + r.pan + '</td>' +
        '<td>' + r.file + '</td><td>' + r.branch + '</td><td>' + r.team + '</td><td>' + svcHtml + '</td>' +
        '<td>' + r.turnover + '</td><td>' + r.networth + '</td><td>' + r.indas + '</td><td>' + r.weather + '</td>' +
        '<td>' + r.paid + '</td><td>' + r.borrow + '</td><td>' + r.fees + '</td><td>' + r.profit + '</td>' +
        '<td>' + r.remarks + '</td><td>' + attachHtml + '</td>' +
        '<td class="pr-td-actions"><div class="pr-row-actions">' +
        '<span class="pr-link" data-idx="' + idx + '" data-action="edit">Edit</span>' +
        '<span class="pr-link" data-idx="' + idx + '" data-action="delete">Delete</span></div></td>';
      tbody.appendChild(tr);
    });
    updatePagination();
    syncScrollBar();
  }
  renderTable();

  if (prevBtn) prevBtn.addEventListener('click', function () { if (state.page > 1) { state.page--; renderTable(); } });
  if (nextBtn) nextBtn.addEventListener('click', function () { if (state.page < totalPages()) { state.page++; renderTable(); } });
  if (tableWrap) {
    tableWrap.addEventListener('scroll', syncScrollBar);
    window.addEventListener('resize', syncScrollBar);
  }

  tbody.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var idx = parseInt(el.getAttribute('data-idx'), 10);
    if (el.getAttribute('data-action') === 'edit') {
      var r = DATA[idx]; if (!r) return;
      sessionStorage.setItem('prEditRow', JSON.stringify({ idx: idx, row: r }));
      window.location.href = 'add_peer_review.html?edit=1';
    }
  });
})();
