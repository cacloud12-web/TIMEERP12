/**
 * Billing module — tabs, sub-tabs, combos, sample data
 */
(function () {
  'use strict';

  /* ── Clock (HH:MM like app header) ── */
  var clock = document.getElementById('dvTopClock');
  function tick() {
    if (!clock) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    clock.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    clock.setAttribute('datetime', d.toISOString());
  }
  tick(); setInterval(tick, 1000);

  /* ── Main tab switching ── */
  var tabs = document.querySelectorAll('.bl-tab');
  var panels = document.querySelectorAll('.bl-panel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      panels.forEach(function (p) { p.classList.remove('is-active'); });
      tab.classList.add('is-active');
      var target = document.getElementById('panel-' + tab.dataset.tab);
      if (target) target.classList.add('is-active');
    });
  });

  /* ── Sub-tab switching (within each panel) ── */
  document.querySelectorAll('.bl-sub-tab').forEach(function (st) {
    st.addEventListener('click', function () {
      var nav = st.closest('.bl-sub-tabs');
      nav.querySelectorAll('.bl-sub-tab').forEach(function (s) { s.classList.remove('is-active'); });
      st.classList.add('is-active');
    });
  });

  /* ── Searchable Combos ── */
  var CLIENTS = ['(21) Internal', '(174) SAURABH BHARDWAJ', '(173) SAURABH BHARDWAJ HUF', '(TH296) THE GOLD REALTY', '(LA3720) law seva management private limited', '(145) PERFECT PAIR', '(TA119098) TATA MOTORS PAS...', '(SA128007) Saksham'];
  var BRANCHES = ['CA CloudDesk', 'Bluemon Wealth Manage...', 'Law Seva Management P...', 'saurabh bharadwaj'];
  var SERVICES = ['24G Return', 'Accounting', 'Accounting 100', 'Account Review', 'AD Code', 'Agreement - Consultancy Agree...', 'Agreement - Franchise Agreement', 'Agreement - Shareholders Agree...', 'Annual Tax audit', 'Audit', 'GST Filing', 'GST License', 'GST Litigation', 'GSTR-1 Filing', 'GSTR-3B Filing', 'Incorporation - NGO', 'I.P.R (Intellectual Property Right)', 'ITR', 'Labour License', 'Litigation', 'MSME - Udyam Registration', 'ROC & MCA', 'TDS FILING', 'VAT - Others'];

  document.querySelectorAll('.bl-combo').forEach(function (wrap) {
    var inp = wrap.querySelector('.bl-combo__input');
    var list = wrap.querySelector('.bl-combo__list');
    var isService = wrap.getAttribute('data-type') === 'service';
    var isBranch = inp.placeholder.toLowerCase().indexOf('branch') >= 0;
    var items = isService ? SERVICES : (isBranch ? BRANCHES : CLIENTS);

    function render(filter) {
      var f = (filter || '').toLowerCase();
      list.innerHTML = items.filter(function (it) { return !f || it.toLowerCase().indexOf(f) >= 0; })
        .map(function (it) { return '<li>' + it + '</li>'; }).join('');
    }
    inp.addEventListener('focus', function () { render(inp.value); list.classList.add('is-open'); });
    inp.addEventListener('input', function () { render(inp.value); });
    list.addEventListener('click', function (e) {
      if (e.target.tagName === 'LI') { inp.value = e.target.textContent; list.classList.remove('is-open'); }
    });
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) list.classList.remove('is-open');
    });
  });

  /* ── Sample Data ── */
  var INV_ALL = [
    { sno: 1, inv: '123/26-27/226', pro: '--', date: '18/08/2026', by: 'Kamal Kant Sharma', svc: 'GST FILLING', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02471', remark: '--', client: 'law seva management private limited', amt: '2,360.00', due: '2,360.00', status: 'Pending' },
    { sno: 2, inv: '2264', pro: '--', date: '18/08/2026', by: 'Dev Aggarwal', svc: 'GSt 3B (Monthly)', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02458', remark: '--', client: 'Saksham', amt: '2,000.00', due: '2,000.00', status: 'Pending' },
    { sno: 3, inv: '123/26-27/225', pro: '--', date: '18/08/2026', by: 'Kamal Kant Sharma', svc: 'GST FILLING', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02470', remark: '--', client: 'law seva management private limited', amt: '3,540.00', due: '3,540.00', status: 'Pending' },
    { sno: 4, inv: '2265', pro: '--', date: '18/08/2026', by: 'Dev Aggarwal', svc: 'GSt Registration', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02473', remark: '--', client: 'Saksham', amt: '5,000.00', due: '2,000.00', status: 'Partially Paid' },
    { sno: 5, inv: '123/26-27/224', pro: '--', date: '18/08/2026', by: 'Kamal Kant Sharma', svc: 'GST FILLING', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02469', remark: '--', client: 'law seva management private limited', amt: '2,360.00', due: '2,360.00', status: 'Pending' },
    { sno: 6, inv: '2258', pro: '--', date: '17/08/2026', by: 'Dev Aggarwal', svc: 'ITR MONTLY', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02448', remark: '--', client: 'Saksham', amt: '4,000.00', due: '4,000.00', status: 'Pending' },
    { sno: 7, inv: '2260', pro: '--', date: '17/08/2026', by: 'Dev Aggarwal', svc: 'GST FILLING', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02450', remark: '--', client: 'Saksham', amt: '3,000.00', due: '3,000.00', status: 'Pending' }
  ];
  var INV_PAID = [
    { sno: 1, inv: '2235', pro: '--', date: '05/08/2026', by: 'Dev Aggarwal', svc: 'Gst License', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02330', remark: '--', client: 'Saksham', amt: '3,000.00', due: '--', status: 'Paid' },
    { sno: 2, inv: '123/26-27/211', pro: '--', date: '31/07/2026', by: 'Kamal Kant Sharma', svc: 'FARIDABAD SITE WORK', sub: '--', branch: 'Bluemon Wealth Management', task: '--', remark: '--', client: 'SAURABH BHARDWAJ', amt: '5,900.00', due: '--', status: 'Paid' },
    { sno: 3, inv: '123/26-27/209', pro: '--', date: '27/07/2026', by: 'Saurabh Bhardwaj', svc: 'GST Filing', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02245', remark: '--', client: 'SAURABH BHARDWAJ', amt: '1,000.00', due: '--', status: 'Paid' },
    { sno: 4, inv: '123/26-27/204', pro: '--', date: '18/07/2026', by: 'Kamal Kant Sharma', svc: 'GSTR-1 Filing', sub: '--', branch: 'Bluemon Wealth Management', task: '--', remark: '--', client: 'SAURABH BHARDWAJ', amt: '2,360.00', due: '--', status: 'Paid' },
    { sno: 5, inv: '123/26-27/199', pro: '--', date: '09/07/2026', by: 'Kamal Kant Sharma', svc: 'GSTR-1 Filing', sub: '--', branch: 'Bluemon Wealth Management', task: '--', remark: '--', client: 'SAURABH BHARDWAJ', amt: '1,180.00', due: '--', status: 'Paid' },
    { sno: 6, inv: '2166', pro: '--', date: '06/07/2026', by: 'Dev Aggarwal', svc: 'GST Filing', sub: '--', branch: 'Bluemon Wealth Management', task: '--', remark: '--', client: 'Saksham', amt: '3,200.00', due: '--', status: 'Paid' },
    { sno: 7, inv: '2134', pro: '--', date: '29/06/2026', by: 'Dev Aggarwal', svc: 'GST Filling R1', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK01731', remark: '--', client: 'Saksham', amt: '2,000.00', due: '--', status: 'Paid' }
  ];
  var INV_PENDING = [
    { sno: 1, inv: '123/26-27/227', pro: '--', date: '19/08/2026', by: 'Kamal Kant Sharma', svc: 'GST FILLING', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02479', remark: '--', client: 'law seva management private lim', amt: '2,360.00', due: '2,360.00', status: 'Pending' },
    { sno: 2, inv: '123/26-27/226', pro: '--', date: '18/08/2026', by: 'Kamal Kant Sharma', svc: 'GST FILLING', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02471', remark: '--', client: 'law seva management private limited', amt: '2,360.00', due: '2,360.00', status: 'Pending' },
    { sno: 3, inv: '2264', pro: '--', date: '18/08/2026', by: 'Dev Aggarwal', svc: 'GSt 3B (Monthly)', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02458', remark: '--', client: 'Saksham', amt: '2,000.00', due: '2,000.00', status: 'Pending' },
    { sno: 4, inv: '2265', pro: '--', date: '18/08/2026', by: 'Dev Aggarwal', svc: 'GSt Registration', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02473', remark: '--', client: 'Saksham', amt: '5,000.00', due: '2,000.00', status: 'Partially Paid' },
    { sno: 5, inv: '123/26-27/225', pro: '--', date: '18/08/2026', by: 'Kamal Kant Sharma', svc: 'GST FILLING', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02470', remark: '--', client: 'law seva management private limited', amt: '3,540.00', due: '3,540.00', status: 'Pending' },
    { sno: 6, inv: '123/26-27/224', pro: '--', date: '18/08/2026', by: 'Kamal Kant Sharma', svc: 'GST FILLING', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK02469', remark: '--', client: 'law seva management private limited', amt: '2,360.00', due: '2,360.00', status: 'Pending' }
  ];
  var INV_CANCELLED = [
    { sno: 1, inv: '123/26-27/083', pro: '--', date: '05/05/2026', by: 'Dev Aggarwal', svc: 'Gst Filling Quartely', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK01311', remark: '--', client: 'Saksham', amt: '3,000.00', due: '3,000.00', status: '' },
    { sno: 2, inv: '123/26-27/081', pro: '--', date: '05/05/2026', by: 'Dev Aggarwal', svc: 'DEMO', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK01308', remark: '--', client: 'Saksham', amt: '2,000.00', due: '2,000.00', status: '' },
    { sno: 3, inv: '123/26-27/080', pro: '--', date: '05/05/2026', by: 'Dev Aggarwal', svc: 'HI', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK01306', remark: '--', client: 'Saksham', amt: '1,000.00', due: '1,000.00', status: '' },
    { sno: 4, inv: '123/26-27/078', pro: '--', date: '04/05/2026', by: 'Dev Aggarwal', svc: 'Gst Filling 3B', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK01301', remark: '--', client: 'Saksham', amt: '1,500.00', due: '1,500.00', status: '' },
    { sno: 5, inv: '123/26-27/076', pro: '--', date: '04/05/2026', by: 'Dev Aggarwal', svc: 'Gst Filling Montly', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK01298', remark: '--', client: 'Saksham', amt: '2,000.00', due: '2,000.00', status: '' },
    { sno: 6, inv: '123/26-27/073', pro: '--', date: '02/05/2026', by: 'Dev Aggarwal', svc: 'Tds Fillingf', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK01293', remark: '--', client: 'Saksham', amt: '1,500.00', due: '1,500.00', status: '' },
    { sno: 7, inv: '123/26-27/071', pro: '--', date: '02/05/2026', by: 'Dev Aggarwal', svc: 'Gst Filling Montly', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK01290', remark: '--', client: 'Saksham', amt: '2,000.00', due: '2,000.00', status: '' },
    { sno: 8, inv: '123/26-27/072', pro: '--', date: '02/05/2026', by: 'Dev Aggarwal', svc: 'Income Tax Notice 2026', sub: '--', branch: 'Bluemon Wealth Management', task: 'TSK01291', remark: '--', client: 'Saksham', amt: '5,000.00', due: '5,000.00', status: '' }
  ];
  var INVOICE_DATA = INV_ALL;

  var PRO_VIEW = [
    { sno: 1, pno: '011', date: '06/08/2026', by: 'Kamal Kant Sharma', expPay: '21/08/2026', svc: 'Efforts', sub: '--', type: 'Custom Invoice', client: 'SAURABH BHARDWAJ', amt: '1,180.00', disc: '--', status: '--', remarks: 'Thanks for the Business.', tags: '--' },
    { sno: 2, pno: '006', date: '05/05/2026', by: 'Kamal Kant Sharma', expPay: '--', svc: 'GST', sub: '--', type: 'Task', client: 'law seva management private limited', amt: '2,360.00', disc: '--', status: '--', remarks: '--', tags: '--' },
    { sno: 3, pno: '003', date: '18/03/2026', by: 'Saurabh Bhardwaj', expPay: '--', svc: 'audit', sub: '--', type: 'Task', client: 'SAURABH BHARDWAJ HUF', amt: '10,000.00', disc: '--', status: '--', remarks: '--', tags: '--' },
    { sno: 4, pno: '002', date: '27/02/2026', by: 'Saurabh Bhardwaj', expPay: '14/03/2026', svc: 'Accounting', sub: '--', type: 'Task', client: 'SAURABH BHARDWAJ HUF', amt: '1,000.00', disc: '--', status: '--', remarks: '--', tags: '--' },
    { sno: 5, pno: '001', date: '02/01/2026', by: 'Saurabh Bhardwaj', expPay: '17/01/2026', svc: 'CA CloudDesk - ( PMS cloud based softwar...', sub: '--', type: 'Custom Invoice', client: 'RMH ADVISORS PRIVATE LIMITED', amt: '47,200.00', disc: '--', status: '--', remarks: 'Thanks for the Business.', tags: '--' }
  ];
  var PRO_CREATED = [
    { sno: 1, pno: '010', invNo: '2140', date: '29/06/2026', by: 'Kamal Kant Sharma', expPay: '--', svc: 'GST', sub: '--', type: 'Task', client: 'law seva management private limited', amt: '1,770.00', disc: '--', status: '--', remarks: '--', tags: '--' },
    { sno: 2, pno: '009', invNo: '2124', date: '25/06/2026', by: 'Kamal Kant Sharma', expPay: '--', svc: 'GST', sub: '--', type: 'Task', client: 'law seva management private limited', amt: '2,950.00', disc: '--', status: '--', remarks: '--', tags: '--' },
    { sno: 3, pno: '008', invNo: '2117', date: '22/06/2026', by: 'Kamal Kant Sharma', expPay: '--', svc: 'GST', sub: '--', type: 'Task', client: 'law seva management private limited', amt: '2,360.00', disc: '--', status: '--', remarks: '--', tags: '--' },
    { sno: 4, pno: '007', invNo: '2123', date: '19/05/2026', by: 'Dev Aggarwal', expPay: '03/06/2026', svc: 'Efforts', sub: '--', type: 'Custom Invoice', client: 'Saksham', amt: '1,000.00', disc: '--', status: '--', remarks: 'Thanks for the Business.', tags: '--' },
    { sno: 5, pno: '005', invNo: '123/26-27/084', date: '01/04/2026', by: 'Saurabh Bhardwaj', expPay: '16/04/2026', svc: 'GST RETURN- 1', sub: '--', type: 'Task', client: 'SAURABH BHARDWAJ', amt: '77.00', disc: '--', status: '--', remarks: '--', tags: '--' }
  ];
  var PRO_CANCELLED = [];
  var PROFORMA_DATA = PRO_VIEW;

  var CH_ALL = [
    { sno: 1, chNo: 'CH/26-27/042', date: '20/08/2026', by: 'Kamal Kant Sharma', svc: 'GST FILLING', branch: 'Bluemon Wealth Management', task: 'TSK02480', remark: '--', client: 'law seva management private limited', amt: '2,360.00', tags: '--' },
    { sno: 2, chNo: 'CH/26-27/041', date: '19/08/2026', by: 'Dev Aggarwal', svc: 'GSt 3B (Monthly)', branch: 'Bluemon Wealth Management', task: 'TSK02458', remark: '--', client: 'Saksham', amt: '2,000.00', tags: '--' },
    { sno: 3, chNo: 'CH/26-27/040', date: '18/08/2026', by: 'Kamal Kant Sharma', svc: 'GST FILLING', branch: 'Bluemon Wealth Management', task: 'TSK02471', remark: 'Client follow-up pending', client: 'law seva management private limited', amt: '3,540.00', tags: '--' },
    { sno: 4, chNo: 'CH/26-27/039', date: '18/08/2026', by: 'Dev Aggarwal', svc: 'GSt Registration', branch: 'Bluemon Wealth Management', task: 'TSK02473', remark: '--', client: 'Saksham', amt: '5,000.00', tags: '--' },
    { sno: 5, chNo: 'CH/26-27/038', date: '17/08/2026', by: 'Dev Aggarwal', svc: 'ITR MONTLY', branch: 'Bluemon Wealth Management', task: 'TSK02448', remark: '--', client: 'Saksham', amt: '4,000.00', tags: '--' },
    { sno: 6, chNo: 'CH/26-27/037', date: '12/08/2026', by: 'Saurabh Bhardwaj', svc: 'TDS FILING', branch: 'CA CloudDesk', task: 'TSK02412', remark: '--', client: 'SAURABH BHARDWAJ', amt: '1,180.00', tags: '--' },
    { sno: 7, chNo: 'CH/26-27/036', date: '05/08/2026', by: 'Kamal Kant Sharma', svc: 'GSTR-1 Filing', branch: 'Bluemon Wealth Management', task: 'TSK02390', remark: '--', client: 'SAURABH BHARDWAJ', amt: '2,360.00', tags: '--' },
    { sno: 8, chNo: 'CH/26-27/035', date: '28/07/2026', by: 'Dev Aggarwal', svc: 'Accounting', branch: 'Bluemon Wealth Management', task: 'TSK02355', remark: '--', client: 'PERFECT PAIR', amt: '7,500.00', tags: '--' }
  ];
  var CH_CANCELLED = [
    { sno: 1, chNo: 'CH/26-27/018', date: '12/05/2026', by: 'Dev Aggarwal', svc: 'Gst Filling Quartely', branch: 'Bluemon Wealth Management', task: 'TSK01311', remark: 'Duplicate entry', client: 'Saksham', amt: '3,000.00', tags: '--' },
    { sno: 2, chNo: 'CH/26-27/015', date: '05/05/2026', by: 'Dev Aggarwal', svc: 'DEMO', branch: 'Bluemon Wealth Management', task: 'TSK01308', remark: '--', client: 'Saksham', amt: '2,000.00', tags: '--' },
    { sno: 3, chNo: 'CH/26-27/012', date: '02/05/2026', by: 'Kamal Kant Sharma', svc: 'GST FILLING', branch: 'Bluemon Wealth Management', task: 'TSK01290', remark: 'Client cancelled', client: 'law seva management private limited', amt: '2,360.00', tags: '--' }
  ];
  var CHALLAN_DATA = CH_ALL;

  var RECEIPT_DATA = [
    { sno: 1, date: '18/08/2026', rno: '--', branch: 'Bluemon Wealth Management', client: 'Saksham', remarks: 'Thanks for the Business.', mode: 'BANK TRANSFER', amt: '3,000.00', inv: 'View', tags: '--' },
    { sno: 2, date: '13/08/2026', rno: '--', branch: 'Bluemon Wealth Management', client: 'Saksham', remarks: 'Thanks for the Business.', mode: 'BANK TRANSFER', amt: '3,000.00', inv: 'View', tags: '--' },
    { sno: 3, date: '10/08/2026', rno: '--', branch: 'Bluemon Wealth Management', client: 'Saksham', remarks: 'Thanks for the Business.', mode: 'BANK TRANSFER', amt: '1,200.00', inv: 'View', tags: '--' },
    { sno: 4, date: '10/08/2026', rno: '--', branch: 'Bluemon Wealth Management', client: 'Saksham', remarks: 'Thanks for the Business.', mode: 'BANK TRANSFER', amt: '2,000.00', inv: 'View', tags: '--' },
    { sno: 5, date: '07/08/2026', rno: '--', branch: 'Bluemon Wealth Management', client: 'Saksham', remarks: 'Thanks for the Business.', mode: 'BANK TRANSFER', amt: '3,000.00', inv: 'View', tags: '--' }
  ];

  var LEDGER_DATA = [
    { sno: 1, date: '06/07/2026', rec: '006/26-27', branch: 'CA CloudDesk', particular: 'Efforts', client: 'Internal', status: '<span class="bl-status bl-status--success">Success</span>', txnType: 'DEBIT', type: 'Sales', module: 'Invoice', nature: 'Original', createdBy: 'Dev Aggarwal', credit: '--', debit: '1,000.00', balance: '1,000.00 Dr', remarks: '1.asdaskdas\n2.nasidojasido\n3.asdaokspdo...' }
  ];

  var CNDN_CREDIT = [
    { sno: 1, date: '14/04/2026', branch: 'Bluemon Wealth Management', client: 'Saksham', no: '1', remarks: '--', amt: '10,000.00 Cr', tags: '--' },
    { sno: 2, date: '31/03/2026', branch: 'Bluemon Wealth Management', client: 'SAURABH BHARDWAJ', no: '01', remarks: '--', amt: '11,800.00 Cr', tags: '--' },
    { sno: 3, date: '16/03/2026', branch: 'Bluemon Wealth Management', client: 'SAURABH BHARDWAJ', no: '01', remarks: '--', amt: '118.00 Cr', tags: '--' },
    { sno: 4, date: '15/06/2025', branch: 'Bluemon Wealth Management', client: 'SAURABH BHARDWAJ', no: '04', remarks: '--', amt: '124.00 Cr', tags: '--' },
    { sno: 5, date: '31/12/2024', branch: 'Bluemon Wealth Management', client: 'SAURABH BHARDWAJ', no: '1', remarks: '--', amt: '1.00 Cr', tags: '--' },
    { sno: 6, date: '21/06/2024', branch: 'Bluemon Wealth Management', client: 'SAURABH BHARDWAJ', no: '323324', remarks: '--', amt: '100.00 Cr', tags: '--' }
  ];

  var CNDN_DEBIT = [
    { sno: 1, date: '07/04/2026', branch: 'Bluemon Wealth Management', client: 'Saksham', no: '1', remarks: '--', amt: '20,000.00 Cr', tags: '--' }
  ];

  var OB_DATA = [
    { sno: 1, date: '01/04/2025', branch: 'Bluemon Wealth Management', client: 'SAURABH BHARDWAJ', ono: '12222e', remarks: 'ok', amt: '1.00 Dr', tags: '--' },
    { sno: 2, date: '06/08/2024', branch: 'Bluemon Wealth Management', client: 'SAURABH BHARDWAJ HUF', ono: '11', remarks: 'good', amt: '2,000.00 Dr', tags: '--' },
    { sno: 3, date: '09/05/2024', branch: 'Law Seva Management Private Limited', client: 'SAURABH BHARDWAJ', ono: '--', remarks: '--', amt: '11.00 Dr', tags: '--' }
  ];

  var ADJ_DATA = [
    { sno: 1, date: '04/08/2026', branch: 'Bluemon Wealth Management', client: 'Saksham', remarks: '--', amt: '1515 Cr', tags: '--' }
  ];

  var REPORTED_DATA = [
    { sno: 1, date: '17-10-2025', client: 'SAURABH BHARDWAJ', txnType: '<span class="bl-status bl-status--debit">DEBIT</span>', amt: '500.00', status: '<span class="bl-status bl-status--success">Successfull</span>', summary: 'asdasd', desc: 'asdas' },
    { sno: 2, date: '30-05-2024', client: 'SAURABH BHARDWAJ', txnType: '<span class="bl-status bl-status--credit">CREDIT</span>', amt: '--', status: '<span class="bl-status bl-status--success">Successfull</span>', summary: '11', desc: 'ok' }
  ];

  var PENDING_RECEIPT = [
    { sno: 1, client: 'Saksham', branch: 'Bluemon Wealth Management', txnNo: '--', amt: '15000', date: '2026-04-07' },
    { sno: 2, client: 'Saksham', branch: 'Bluemon Wealth Management', txnNo: '--', amt: '10000', date: '2026-04-21' },
    { sno: 3, client: 'Saksham', branch: 'Bluemon Wealth Management', txnNo: '--', amt: '2000', date: '2026-04-30' },
    { sno: 4, client: 'Manish bhardwaj', branch: '--', txnNo: '1', amt: '5000', date: '2026-05-26' },
    { sno: 5, client: 'SAURABH BHARDWAJ', branch: 'Bluemon Wealth Management', txnNo: '--', amt: '12321', date: '2026-06-18' },
    { sno: 6, client: 'Saksham', branch: 'Bluemon Wealth Management', txnNo: '--', amt: '5000', date: '2026-06-20' }
  ];

  var APPROVED_RECEIPT = [
    { sno: 1, client: 'SAURABH BHARDWAJ', branch: '--', txnNo: 'eert', amt: '1000', date: '2026-06-11', attach: '--' },
    { sno: 2, client: 'Saksham', branch: 'Bluemon Wealth Management', txnNo: '--', amt: '9000', date: '2026-04-04', attach: '--' },
    { sno: 3, client: 'Saksham', branch: '--', txnNo: '545825', amt: '1510', date: '2026-06-18', attach: '--' },
    { sno: 4, client: 'Saksham', branch: '--', txnNo: '5454514', amt: '2500', date: '2026-06-29', attach: '--' }
  ];

  /* ── SVG icon templates ── */
  var ICO = {
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>',
    pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>',
    del: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    sms: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>'
  };

  function actIcons(opts) {
    var h = '<span class="bl-act">';
    if (opts.edit) h += '<button class="act-edit" title="Edit">' + ICO.edit + '</button>';
    if (opts.mail) h += '<button class="act-mail" title="Email">' + ICO.mail + '</button>';
    if (opts.pdf) h += '<button class="act-pdf" title="PDF">' + ICO.pdf + '</button>';
    if (opts.whatsapp) h += '<button class="act-whatsapp" title="WhatsApp">' + ICO.whatsapp + '</button>';
    if (opts.delete) h += '<button class="act-delete" title="Delete">' + ICO.del + '</button>';
    if (opts.sms) h += '<button class="act-sms" title="SMS">' + ICO.sms + '</button>';
    if (opts.tag) h += '<button class="act-tag" title="Tags">' + ICO.tag + '</button>';
    if (opts.copy) h += '<button class="act-copy" title="Copy">' + ICO.copy + '</button>';
    if (opts.approve) h += '<button class="act-approve">Approve</button>';
    if (opts.reject) h += '<button class="act-reject">Reject</button>';
    if (opts.approved) h += '<span class="bl-status bl-status--approved">Approved</span>';
    h += '</span>';
    return h;
  }

  /* ── Render tables ── */
  function statusPill(s) {
    if (s === 'Pending') return '<span class="bl-status bl-status--pending">Pending</span>';
    if (s === 'Partially Paid') return '<span class="bl-status bl-status--partial">Partially Paid</span>';
    if (s === 'Paid') return '<span class="bl-status bl-status--success">Paid</span>';
    return '<span class="bl-status">' + s + '</span>';
  }

  function invActions() {
    return '<span class="bl-act"><button class="act-edit" title="Edit">' + ICO.edit + '</button><button class="act-mail" title="Email">' + ICO.mail + '</button><button class="act-pdf" title="PDF">' + ICO.pdf + '</button><button class="act-whatsapp" title="WhatsApp">' + ICO.whatsapp + '</button><button class="act-delete" title="Delete">' + ICO.del + '</button><button class="act-sms" title="SMS">' + ICO.sms + '</button><button class="act-tag" title="Tags">' + ICO.tag + '</button><button class="act-copy" title="Copy">' + ICO.copy + '</button></span>';
  }

  function invPaidActions() {
    return '<span class="bl-act"><button class="act-edit" title="Edit">' + ICO.edit + '</button><button class="act-mail" title="Email">' + ICO.mail + '</button><button class="act-pdf" title="PDF">' + ICO.pdf + '</button><button class="act-whatsapp" title="WhatsApp">' + ICO.whatsapp + '</button><button class="act-delete" title="Delete">' + ICO.del + '</button><button class="act-sms" title="SMS">' + ICO.sms + '</button><button class="act-tag" title="Tags">' + ICO.tag + '</button><button class="act-copy" title="Copy">' + ICO.copy + '</button></span>';
  }
  function invCancelledActions() {
    return '<span class="bl-act"><button class="act-mail" title="Email">' + ICO.mail + '</button><button class="act-pdf" title="PDF">' + ICO.pdf + '</button><button class="act-whatsapp" title="WhatsApp">' + ICO.whatsapp + '</button><button class="act-sms" title="SMS">' + ICO.sms + '</button><button class="act-tag" title="Tags">' + ICO.tag + '</button></span>';
  }
  function renderInvoice() {
    var tb = document.getElementById('tbodyInvoice'); if (!tb) return;
    var isCancelled = (INVOICE_DATA === INV_CANCELLED);
    var isPaid = (INVOICE_DATA === INV_PAID);
    tb.innerHTML = INVOICE_DATA.map(function (r) {
      var base = '<tr><td><input type="checkbox"></td><td>' + r.sno + '</td><td><a href="#">' + r.inv + '</a></td><td>' + r.pro + '</td><td>' + r.date + '</td><td>' + r.by + '</td><td>' + r.svc + '</td><td>' + r.sub + '</td><td>' + r.branch + '</td><td>' + r.task + '</td><td>' + r.remark + '</td><td>' + r.client + '</td><td class="text-right" style="color:#25B7A7">' + r.amt + '</td>';
      if (isCancelled) return base + '<td class="text-right">' + (r.due || r.amt) + '</td><td>--</td><td>' + invCancelledActions() + '</td></tr>';
      if (isPaid) return base + '<td class="text-right">--</td><td>' + statusPill('Paid') + '</td><td>--</td><td>' + invPaidActions() + '</td></tr>';
      return base + '<td class="text-right">' + r.due + '</td><td>' + statusPill(r.status) + '</td><td>--</td><td>' + invActions() + '</td></tr>';
    }).join('');
  }

  function proActions(isCreated) {
    var h = '<span class="bl-act">';
    h += '<button class="act-edit" title="Edit">' + ICO.edit + '</button>';
    h += '<button class="act-mail" title="Email">' + ICO.mail + '</button>';
    h += '<button class="act-pdf" title="PDF">' + ICO.pdf + '</button>';
    h += '<button class="act-whatsapp" title="WhatsApp">' + ICO.whatsapp + '</button>';
    if (isCreated) {
      h += '<button class="act-sms" title="SMS">' + ICO.sms + '</button>';
    } else {
      h += '<button class="act-delete" title="Delete">' + ICO.del + '</button>';
    }
    h += '<button class="act-tag" title="Tags">' + ICO.tag + '</button>';
    h += '</span>';
    return h;
  }

  function renderProforma() {
    var tb = document.getElementById('tbodyProforma'); if (!tb) return;
    var noData = document.getElementById('proNoData');
    var isCreated = (PROFORMA_DATA === PRO_CREATED);
    if (PROFORMA_DATA.length === 0) {
      tb.innerHTML = '';
      if (noData) noData.style.display = '';
      return;
    }
    if (noData) noData.style.display = 'none';
    tb.innerHTML = PROFORMA_DATA.map(function (r) {
      var row = '<tr><td>' + r.sno + '</td><td><a href="#">' + r.pno + '</a></td>';
      if (isCreated) row += '<td>' + (r.invNo || '--') + '</td>';
      row += '<td>' + r.date + '</td><td>' + r.by + '</td><td>' + (r.expPay || '--') + '</td><td>' + r.svc + '</td><td>' + r.sub + '</td><td>' + r.type + '</td><td>' + r.client + '</td><td style="color:#25B7A7">' + r.amt + '</td><td>' + r.disc + '</td><td>' + r.status + '</td><td>' + r.remarks + '</td><td>' + r.tags + '</td><td>' + proActions(isCreated) + '</td></tr>';
      return row;
    }).join('');
    var ct = document.getElementById('proCount');
    if (ct) ct.textContent = PROFORMA_DATA.length + ' / ' + PROFORMA_DATA.length;
  }

  function renderChallan() {
    var tb = document.getElementById('tbodyChallan'); if (!tb) return;
    var noData = document.getElementById('chNoData');
    var isCancelled = (CHALLAN_DATA === CH_CANCELLED);
    if (CHALLAN_DATA.length === 0) {
      tb.innerHTML = '';
      if (noData) noData.style.display = '';
      var emptyCt = document.getElementById('chCount');
      if (emptyCt) emptyCt.textContent = '';
      return;
    }
    if (noData) noData.style.display = 'none';
    var acts = isCancelled
      ? actIcons({ mail: 1, pdf: 1, whatsapp: 1, tag: 1 })
      : actIcons({ edit: 1, mail: 1, pdf: 1, whatsapp: 1, delete: 1, tag: 1 });
    tb.innerHTML = CHALLAN_DATA.map(function (r) {
      return '<tr><td><input type="checkbox"></td><td>' + r.sno + '</td><td><a href="#">' + r.chNo + '</a></td><td>' + r.date + '</td><td>' + r.by + '</td><td>' + r.svc + '</td><td>' + r.branch + '</td><td>' + r.task + '</td><td>' + r.remark + '</td><td>' + r.client + '</td><td class="text-right" style="color:#25B7A7">' + r.amt + '</td><td>' + r.tags + '</td><td>' + acts + '</td></tr>';
    }).join('');
    var ct = document.getElementById('chCount');
    if (ct) ct.textContent = CHALLAN_DATA.length + ' / ' + CHALLAN_DATA.length;
  }

  function renderReceipt() {
    var tb = document.getElementById('tbodyReceipt'); if (!tb) return;
    tb.innerHTML = RECEIPT_DATA.map(function (r) {
      return '<tr><td>' + r.sno + '</td><td>' + r.date + '</td><td>' + r.rno + '</td><td>' + r.branch + '</td><td>' + r.client + '</td><td>' + r.remarks + '</td><td>' + r.mode + '</td><td>' + r.amt + '</td><td><a href="#">' + r.inv + '</a></td><td>' + r.tags + '</td><td>' + actIcons({ edit: 1, mail: 1, pdf: 1, whatsapp: 1, delete: 1, tag: 1 }) + '</td></tr>';
    }).join('');
  }

  function renderLedger() {
    var tb = document.getElementById('tbodyLedger'); if (!tb) return;
    tb.innerHTML = LEDGER_DATA.map(function (r) {
      return '<tr><td>' + r.sno + '</td><td>' + r.date + '</td><td><a href="#">' + r.rec + '</a></td><td>' + r.branch + '</td><td>' + r.particular + '</td><td>' + r.client + '</td><td>' + r.status + '</td><td>' + r.txnType + '</td><td>' + r.type + '</td><td>' + r.module + '</td><td>' + r.nature + '</td><td>' + r.createdBy + '</td><td>' + r.credit + '</td><td>' + r.debit + '</td><td>' + r.balance + '</td><td>' + r.remarks.replace(/\n/g, '<br>') + '</td></tr>';
    }).join('');
  }

  function renderCndn(type) {
    var data = type === 'debit' ? CNDN_DEBIT : CNDN_CREDIT;
    var tb = document.getElementById('tbodyCndn'); if (!tb) return;
    var thead = document.getElementById('theadCndn');
    if (type === 'debit') {
      thead.innerHTML = '<tr><th>S. No.</th><th>Payment Date</th><th>Branch</th><th>Client</th><th>Debit No.</th><th>Remarks</th><th>Transaction Amount</th><th>Tags</th><th>Actions</th></tr>';
    } else {
      thead.innerHTML = '<tr><th>S. No.</th><th>Payment Date</th><th>Branch</th><th>Client</th><th>Credit No.</th><th>Remarks</th><th>Transaction Amount</th><th>Tags</th><th>Actions</th></tr>';
    }
    tb.innerHTML = data.map(function (r) {
      return '<tr><td>' + r.sno + '</td><td>' + r.date + '</td><td>' + r.branch + '</td><td><a href="#">' + r.client + '</a></td><td>' + r.no + '</td><td>' + r.remarks + '</td><td>' + r.amt + '</td><td>' + r.tags + '</td><td>' + actIcons({ edit: 1, mail: 1, pdf: 1, whatsapp: 1, delete: 1, tag: 1 }) + '</td></tr>';
    }).join('');
    var totalRow = tb.closest('.bl-panel').querySelector('.bl-total-val');
    if (totalRow) {
      var total = type === 'debit' ? '₹ 20,000.00 Dr' : '₹ 22,143.00 Cr';
      totalRow.textContent = total;
    }
  }

  function renderOB() {
    var tb = document.getElementById('tbodyOB'); if (!tb) return;
    tb.innerHTML = OB_DATA.map(function (r) {
      return '<tr><td>' + r.sno + '</td><td>' + r.date + '</td><td>' + r.branch + '</td><td><a href="#">' + r.client + '</a></td><td>' + r.ono + '</td><td>' + r.remarks + '</td><td>' + r.amt + '</td><td>' + r.tags + '</td><td>' + actIcons({ edit: 1, delete: 1, tag: 1 }) + '</td></tr>';
    }).join('');
    var tv = tb.closest('.bl-panel').querySelector('.bl-total-val');
    if (tv) tv.textContent = '₹ 2,012.00 Dr';
  }

  function renderAdj() {
    var tb = document.getElementById('tbodyAdj'); if (!tb) return;
    tb.innerHTML = ADJ_DATA.map(function (r) {
      return '<tr><td>' + r.sno + '</td><td>' + r.date + '</td><td>' + r.branch + '</td><td><a href="#">' + r.client + '</a></td><td>' + r.remarks + '</td><td>' + r.amt + '</td><td>' + r.tags + '</td><td>' + actIcons({ edit: 1, delete: 1, tag: 1 }) + '</td></tr>';
    }).join('');
    var tv = tb.closest('.bl-panel').querySelector('.bl-total-val');
    if (tv) tv.textContent = '₹ 1515Cr';
  }

  function renderReported() {
    var tb = document.getElementById('tbodyReported'); if (!tb) return;
    tb.innerHTML = REPORTED_DATA.map(function (r) {
      return '<tr><td>' + r.sno + '</td><td>' + r.date + '</td><td>' + r.client + '</td><td>' + r.txnType + '</td><td>' + r.amt + '</td><td>' + r.status + '</td><td>' + r.summary + '</td><td>' + r.desc + '</td><td><span class="bl-act"><svg style="width:18px;height:18px;color:#25B7A7" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg> <svg style="width:18px;height:18px;color:#ef4444" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg> <button class="act-approve">Resolve</button> <button class="act-reject">Reject</button></span></td></tr>';
    }).join('');
  }

  /* ── CN/DN sub-tab switching ── */
  var cndnPanel = document.getElementById('panel-cndn');
  if (cndnPanel) {
    cndnPanel.querySelectorAll('.bl-sub-tab').forEach(function (st) {
      st.addEventListener('click', function () {
        var sub = st.dataset.sub;
        if (sub === 'dn-view' || sub === 'dn-cancelled') renderCndn('debit');
        else renderCndn('credit');
      });
    });
  }

  /* ── Receipt sub-tab switching ── */
  var rcPanel = document.getElementById('panel-receipt');
  if (rcPanel) {
    rcPanel.querySelectorAll('.bl-sub-tab').forEach(function (st) {
      st.addEventListener('click', function () {
        var sub = st.dataset.sub;
        var tb = document.getElementById('tbodyReceipt');
        var thead = rcPanel.querySelector('.bl-data-table thead');
        if (sub === 'rc-pending') {
          thead.innerHTML = '<tr><th>S No.</th><th>Client</th><th>Branch</th><th>Transaction No.</th><th>Transaction Amount</th><th>Transaction Date</th><th>Attachment</th><th>Action</th></tr>';
          var title = rcPanel.querySelector('.bl-sub-tabs').nextElementSibling;
          tb.innerHTML = PENDING_RECEIPT.map(function (r) {
            return '<tr><td>' + r.sno + '</td><td>' + r.client + '</td><td>' + r.branch + '</td><td>' + r.txnNo + '</td><td>' + r.amt + '</td><td>' + r.date + '</td><td>--</td><td>' + actIcons({ approve: 1, reject: 1 }) + '</td></tr>';
          }).join('');
        } else if (sub === 'rc-approved') {
          thead.innerHTML = '<tr><th>S No.</th><th>Client</th><th>Branch</th><th>Transaction No.</th><th>Transaction Amount</th><th>Transaction Date</th><th>Attachment</th><th>Action</th></tr>';
          tb.innerHTML = APPROVED_RECEIPT.map(function (r) {
            return '<tr><td>' + r.sno + '</td><td>' + r.client + '</td><td>' + r.branch + '</td><td>' + r.txnNo + '</td><td>' + r.amt + '</td><td>' + r.date + '</td><td>' + r.attach + '</td><td>' + actIcons({ approved: 1 }) + '</td></tr>';
          }).join('');
        } else if (sub === 'rc-cancelled') {
          thead.innerHTML = '<tr><th>S. No.</th><th>Payment Date</th><th>Receipt No.</th><th>Branch</th><th>Client</th><th>Remarks</th><th>Transaction Amount</th><th>Actions</th></tr>';
          tb.innerHTML = '';
        } else {
          thead.innerHTML = '<tr><th>S. No.</th><th>Payment Date</th><th>Receipt No.</th><th>Branch</th><th>Client</th><th>Remarks</th><th>Payment Mode</th><th>Transaction Amount</th><th>Invoices</th><th>Tags</th><th>Actions</th></tr>';
          renderReceipt();
        }
      });
    });
  }

  /* ── Invoice sub-tab switching ── */
  var invPanel = document.getElementById('panel-invoice');
  if (invPanel) {
    var invThead = invPanel.querySelector('#tblInvoice thead');
    var THEAD_ALL = '<tr><th><input type="checkbox"></th><th>S. No.</th><th>Invoice Number</th><th>Proforma Number</th><th>Date &#8693;</th><th>Raised By</th><th>Service Name</th><th>Sub Service Name</th><th>Branch</th><th>Task Number</th><th>Private Remark</th><th>Client &#8693;</th><th>Amount &#8693;</th><th>Due Amount</th><th>Status</th><th>Tags</th><th>Actions</th></tr>';
    var THEAD_PAID = '<tr><th><input type="checkbox"></th><th>S. No.</th><th>Invoice Number</th><th>Proforma Number</th><th>Date &#8693;</th><th>Raised By</th><th>Service Name</th><th>Sub Service Name</th><th>Branch</th><th>Task Number</th><th>Private Remark</th><th>Client</th><th>Amount &#8693;</th><th>Due Amount</th><th>Status</th><th>Tags</th><th>Actions</th></tr>';
    var THEAD_CANCELLED = '<tr><th><input type="checkbox"></th><th>S. No.</th><th>Invoice Number</th><th>Proforma Number</th><th>Date &#8693;</th><th>Raised By</th><th>Service Name</th><th>Sub Service Name</th><th>Branch</th><th>Task Number</th><th>Private Remark</th><th>Client</th><th>Amount &#8693;</th><th>Due Amount</th><th>Tags</th><th>Actions</th></tr>';
    invPanel.querySelectorAll('.bl-sub-tab').forEach(function (st) {
      st.addEventListener('click', function () {
        var sub = st.dataset.sub;
        if (sub === 'inv-paid') { INVOICE_DATA = INV_PAID; invThead.innerHTML = THEAD_PAID; }
        else if (sub === 'inv-pending') { INVOICE_DATA = INV_PENDING; invThead.innerHTML = THEAD_ALL; }
        else if (sub === 'inv-cancelled') { INVOICE_DATA = INV_CANCELLED; invThead.innerHTML = THEAD_CANCELLED; }
        else { INVOICE_DATA = INV_ALL; invThead.innerHTML = THEAD_ALL; }
        renderInvoice();
      });
    });
  }

  /* ── Dual-month Calendar ── */
  document.querySelectorAll('.bl-date-picker-wrap').forEach(function(wrap) {
    var cal = wrap.querySelector('.bl-dual-cal');
    var calIcon = wrap.querySelector('.bl-cal-icon');
    var inputs = wrap.querySelectorAll('.bl-date-input');
    if (!cal || !calIcon) return;
    var baseDate = new Date();
    var DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    function renderCal() {
      var m1 = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
      var m2 = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1);
      cal.innerHTML = '<div class="bl-dual-cal__nav" style="margin-bottom:4px"><button class="bl-cal-prev">&laquo;</button><button class="bl-cal-prev-m">&lt;</button><span>' + MONTHS[m1.getMonth()] + '  ' + m1.getFullYear() + '</span><span style="width:40px"></span><span>' + MONTHS[m2.getMonth()] + '  ' + m2.getFullYear() + '</span><button class="bl-cal-next-m">&gt;</button><button class="bl-cal-next">&raquo;</button></div><div class="bl-dual-cal__row"><div class="bl-dual-cal__month"><div class="bl-dual-cal__grid" id="calGrid1"></div></div><div class="bl-dual-cal__month"><div class="bl-dual-cal__grid" id="calGrid2"></div></div></div>';
      fillGrid('calGrid1', m1);
      fillGrid('calGrid2', m2);
      cal.querySelector('.bl-cal-prev').onclick = function() { baseDate.setFullYear(baseDate.getFullYear() - 1); renderCal(); };
      cal.querySelector('.bl-cal-prev-m').onclick = function() { baseDate.setMonth(baseDate.getMonth() - 1); renderCal(); };
      cal.querySelector('.bl-cal-next-m').onclick = function() { baseDate.setMonth(baseDate.getMonth() + 1); renderCal(); };
      cal.querySelector('.bl-cal-next').onclick = function() { baseDate.setFullYear(baseDate.getFullYear() + 1); renderCal(); };
    }

    function fillGrid(id, month) {
      var g = cal.querySelector('#' + id); if (!g) return;
      var today = new Date();
      var h = DAYS.map(function(d) { return '<span class="bl-cal-hd">' + d + '</span>'; }).join('');
      var first = new Date(month.getFullYear(), month.getMonth(), 1);
      var startDay = first.getDay();
      var daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
      var prevDays = new Date(month.getFullYear(), month.getMonth(), 0).getDate();
      for (var i = startDay - 1; i >= 0; i--) h += '<span class="bl-cal-day is-other">' + (prevDays - i) + '</span>';
      for (var d = 1; d <= daysInMonth; d++) {
        var cls = 'bl-cal-day';
        if (d === today.getDate() && month.getMonth() === today.getMonth() && month.getFullYear() === today.getFullYear()) cls += ' is-today';
        h += '<span class="' + cls + '">' + d + '</span>';
      }
      var total = startDay + daysInMonth;
      for (var j = 1; total + j <= 42; j++) h += '<span class="bl-cal-day is-other">' + j + '</span>';
      g.innerHTML = h;
    }

    calIcon.addEventListener('click', function(e) { e.stopPropagation(); cal.classList.toggle('is-open'); if (cal.classList.contains('is-open')) renderCal(); });
    inputs.forEach(function(inp) { inp.addEventListener('click', function(e) { e.stopPropagation(); cal.classList.toggle('is-open'); if (cal.classList.contains('is-open')) renderCal(); }); });
    document.addEventListener('click', function(e) { if (!cal.contains(e.target)) cal.classList.remove('is-open'); });
  });

  /* ── Challan sub-tab switching ── */
  var chPanel = document.getElementById('panel-challan');
  if (chPanel) {
    chPanel.querySelectorAll('.bl-sub-tab').forEach(function (st) {
      st.addEventListener('click', function () {
        var sub = st.dataset.sub;
        CHALLAN_DATA = (sub === 'ch-cancelled') ? CH_CANCELLED : CH_ALL;
        renderChallan();
      });
    });
  }

  /* ── Proforma sub-tab switching ── */
  var proPanel = document.getElementById('panel-proforma');
  if (proPanel) {
    var proThead = document.getElementById('theadProforma');
    var PRO_THEAD_VIEW = '<tr><th>S. No.</th><th>Proforma Invoice Number &#8693;</th><th>Date &#8693;</th><th>Raised By</th><th>Exp. Pay Date &#8693;</th><th>Service Name</th><th>Sub Service Name</th><th>Type</th><th>Client &#8693;</th><th>Amount &#8693;</th><th>Discount Amount</th><th>Status</th><th>Remarks</th><th>Tags</th><th>Actions</th></tr>';
    var PRO_THEAD_CREATED = '<tr><th>S. No.</th><th>Proforma Invoice Number &#8693;</th><th>Invoice Number</th><th>Date &#8693;</th><th>Raised By</th><th>Exp. Pay Date &#8693;</th><th>Service Name</th><th>Sub Service Name</th><th>Type</th><th>Client &#8693;</th><th>Amount &#8693;</th><th>Discount Amount</th><th>Status</th><th>Remarks</th><th>Tags</th><th>Actions</th></tr>';
    var PRO_THEAD_CANCELLED = '<tr><th>S. No.</th><th>Proforma Invoice Number &#8693;</th><th>Invoice Number</th><th>Date &#8693;</th><th>Raised By</th><th>Exp. Pay Date</th><th>Service Name</th><th>Sub Service Name</th><th>Type</th><th>Client &#8693;</th><th>Amount &#8693;</th><th>Discount Amount</th><th></th><th>Remarks</th><th>Actions</th></tr>';
    proPanel.querySelectorAll('.bl-sub-tab').forEach(function(st) {
      st.addEventListener('click', function() {
        var sub = st.dataset.sub;
        if (sub === 'pro-created') { PROFORMA_DATA = PRO_CREATED; proThead.innerHTML = PRO_THEAD_CREATED; }
        else if (sub === 'pro-cancelled') { PROFORMA_DATA = PRO_CANCELLED; proThead.innerHTML = PRO_THEAD_CANCELLED; }
        else { PROFORMA_DATA = PRO_VIEW; proThead.innerHTML = PRO_THEAD_VIEW; }
        renderProforma();
      });
    });
  }

  /* ── FY Combo Dropdowns ── */
  document.querySelectorAll('.bl-fy-combo').forEach(function(wrap) {
    var inp = wrap.querySelector('.bl-fy-combo__input');
    var list = wrap.querySelector('.bl-fy-combo__list');
    var clear = wrap.querySelector('.bl-fy-combo__clear');

    inp.addEventListener('click', function(e) { e.stopPropagation(); list.classList.toggle('is-open'); });
    list.addEventListener('click', function(e) {
      if (e.target.tagName === 'LI') {
        list.querySelectorAll('li').forEach(function(l) { l.classList.remove('is-active'); });
        e.target.classList.add('is-active');
        inp.value = e.target.textContent;
        list.classList.remove('is-open');
      }
    });
    if (clear) clear.addEventListener('click', function(e) { e.stopPropagation(); inp.value = ''; list.querySelectorAll('li').forEach(function(l) { l.classList.remove('is-active'); }); });
    document.addEventListener('click', function(e) { if (!wrap.contains(e.target)) list.classList.remove('is-open'); });
  });

  /* ── Invoice Columns Dropdown ── */
  var INV_COLUMNS = [
    { key: 'sno', label: 'S. No.', on: true },
    { key: 'inv', label: 'Invoice Number', on: true },
    { key: 'pro', label: 'Proforma Number', on: true },
    { key: 'date', label: 'Date', on: true },
    { key: 'by', label: 'Raised By', on: true },
    { key: 'svc', label: 'Service Name', on: true },
    { key: 'sub', label: 'Sub Service Name', on: true },
    { key: 'branch', label: 'Branch', on: true },
    { key: 'gst', label: 'GST No.', on: false },
    { key: 'type', label: 'Type', on: false },
    { key: 'task', label: 'Task Number', on: true },
    { key: 'remarks', label: 'Remarks', on: false },
    { key: 'remark', label: 'Private Remark', on: true },
    { key: 'client', label: 'Client', on: true },
    { key: 'amt', label: 'Amount', on: true },
    { key: 'due', label: 'Due Amount', on: true },
    { key: 'expPay', label: 'Exp. Pay Date', on: false },
    { key: 'status', label: 'Status', on: true },
    { key: 'tags', label: 'Tags', on: true },
    { key: 'actions', label: 'Actions', on: true }
  ];
  (function() {
    var btn = document.getElementById('invColBtn');
    var menu = document.getElementById('invColMenu');
    var list = document.getElementById('invColList');
    var selAll = document.getElementById('invColSelAll');
    if (!btn || !menu) return;

    function renderColList() {
      list.innerHTML = INV_COLUMNS.map(function(c) {
        return '<li><span class="bl-col-grip">⠿</span><input type="checkbox"' + (c.on ? ' checked' : '') + ' data-col="' + c.key + '"> ' + c.label + '</li>';
      }).join('');
    }
    renderColList();

    btn.addEventListener('click', function(e) { e.stopPropagation(); menu.classList.toggle('is-open'); });
    document.addEventListener('click', function(e) { if (!menu.contains(e.target) && e.target !== btn) menu.classList.remove('is-open'); });

    list.addEventListener('change', function(e) {
      if (e.target.type === 'checkbox') {
        var key = e.target.dataset.col;
        INV_COLUMNS.forEach(function(c) { if (c.key === key) c.on = e.target.checked; });
      }
    });

    selAll.addEventListener('click', function(e) {
      e.preventDefault();
      INV_COLUMNS.forEach(function(c) { c.on = true; });
      renderColList();
    });
  })();

  /* ── Add Invoice button (all sub-tabs) ── */
  document.querySelectorAll('#panel-invoice .bl-add-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { window.location.href = 'add_invoice.html'; });
  });

  /* ── Edit Invoice action ── */
  var invPanel = document.getElementById('panel-invoice');
  if (invPanel) {
    invPanel.addEventListener('click', function (e) {
      var btn = e.target.closest('.act-edit');
      if (!btn) return;
      e.preventDefault();
      var row = btn.closest('tr');
      var invLink = row ? row.querySelector('a') : null;
      var invNo = invLink ? encodeURIComponent(invLink.textContent.trim()) : '';
      window.location.href = 'edit_invoice.html' + (invNo ? ('?inv=' + invNo) : '');
    });
  }

  /* ── Add Proforma button ── */
  document.querySelectorAll('#panel-proforma .bl-add-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { window.location.href = 'add_proforma.html'; });
  });

  /* ── Billing Summary chart (Invoice / Payment spline) ── */
  (function initBillingSummaryChart() {
    var canvas = document.getElementById('billingSummaryCanvas');
    if (!canvas || !canvas.getContext) return;

    var labels = ['01/04/2026', '01/05/2026', '01/06/2026', '01/07/2026', '01/08/2026'];
    var invoice = [100000, 680000, 450000, 340000, 280000];
    var payment = [100000, 110000, 400000, 430000, 120000];
    var yMax = 700000;
    var yStep = 100000;
    var colorInvoice = '#2ec4b6';
    var colorPayment = '#f08a5d';

    function resize() {
      var parent = canvas.parentElement;
      if (!parent) return;
      var w = Math.max(320, parent.clientWidth);
      var h = Math.max(240, parent.clientHeight || 300);
      var dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      var ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, w, h);
    }

    function catmullRom(points, tension) {
      if (points.length < 2) return points.slice();
      var t = tension == null ? 0.5 : tension;
      var out = [];
      var i, p0, p1, p2, p3, t1x, t1y, t2x, t2y, s, st, st2, st3, c1, c2, c3, c4;
      for (i = 0; i < points.length - 1; i++) {
        p0 = points[i === 0 ? i : i - 1];
        p1 = points[i];
        p2 = points[i + 1];
        p3 = points[i + 2 < points.length ? i + 2 : i + 1];
        t1x = (p2.x - p0.x) * t;
        t1y = (p2.y - p0.y) * t;
        t2x = (p3.x - p1.x) * t;
        t2y = (p3.y - p1.y) * t;
        for (s = 0; s <= 20; s++) {
          st = s / 20;
          st2 = st * st;
          st3 = st2 * st;
          c1 = 2 * st3 - 3 * st2 + 1;
          c2 = -2 * st3 + 3 * st2;
          c3 = st3 - 2 * st2 + st;
          c4 = st3 - st2;
          out.push({
            x: c1 * p1.x + c2 * p2.x + c3 * t1x + c4 * t2x,
            y: c1 * p1.y + c2 * p2.y + c3 * t1y + c4 * t2y
          });
        }
      }
      return out;
    }

    function toPoints(values, padL, padR, padT, padB, w, h) {
      var plotW = w - padL - padR;
      var plotH = h - padT - padB;
      return values.map(function (v, i) {
        var x = padL + (values.length === 1 ? plotW / 2 : (i / (values.length - 1)) * plotW);
        var y = padT + plotH - (v / yMax) * plotH;
        return { x: x, y: y };
      });
    }

    function drawSeries(ctx, pts, color, padB, h) {
      var curve = catmullRom(pts, 0.5);
      if (!curve.length) return;

      /* soft fill */
      ctx.beginPath();
      ctx.moveTo(curve[0].x, curve[0].y);
      curve.forEach(function (p) { ctx.lineTo(p.x, p.y); });
      ctx.lineTo(curve[curve.length - 1].x, h - padB);
      ctx.lineTo(curve[0].x, h - padB);
      ctx.closePath();
      var fill = hexToRgba(color, 0.16);
      var fade = hexToRgba(color, 0.02);
      var g = ctx.createLinearGradient(0, Math.min.apply(null, curve.map(function (p) { return p.y; })), 0, h - padB);
      g.addColorStop(0, fill);
      g.addColorStop(1, fade);
      ctx.fillStyle = g;
      ctx.fill();

      /* line with soft shadow */
      ctx.save();
      ctx.shadowColor = hexToRgba(color, 0.35);
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.beginPath();
      ctx.moveTo(curve[0].x, curve[0].y);
      curve.forEach(function (p) { ctx.lineTo(p.x, p.y); });
      ctx.strokeStyle = color;
      ctx.lineWidth = 3.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();

      /* markers */
      pts.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = color;
        ctx.stroke();
      });
    }

    function hexToRgba(hex, a) {
      var h = hex.replace('#', '');
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      var r = parseInt(h.slice(0, 2), 16);
      var g = parseInt(h.slice(2, 4), 16);
      var b = parseInt(h.slice(4, 6), 16);
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }

    function draw(ctx, w, h) {
      var padL = 58;
      var padR = 16;
      var padT = 12;
      var padB = 36;
      ctx.clearRect(0, 0, w, h);

      /* grid + y labels */
      ctx.font = '11px Inter, system-ui, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      var y;
      for (y = 0; y <= yMax; y += yStep) {
        var yy = padT + (h - padT - padB) * (1 - y / yMax);
        ctx.beginPath();
        ctx.moveTo(padL, yy);
        ctx.lineTo(w - padR, yy);
        ctx.strokeStyle = '#eef2f6';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillText(String(y), padL - 8, yy);
      }

      /* x axis baseline + ticks/labels */
      ctx.beginPath();
      ctx.moveTo(padL, h - padB);
      ctx.lineTo(w - padR, h - padB);
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.stroke();

      var invPts = toPoints(invoice, padL, padR, padT, padB, w, h);
      var payPts = toPoints(payment, padL, padR, padT, padB, w, h);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#94a3b8';
      labels.forEach(function (lab, i) {
        var x = invPts[i].x;
        ctx.beginPath();
        ctx.moveTo(x, h - padB);
        ctx.lineTo(x, h - padB + 5);
        ctx.strokeStyle = '#cbd5e1';
        ctx.stroke();
        ctx.fillText(lab, x, h - padB + 8);
      });

      drawSeries(ctx, invPts, colorInvoice, padB, h);
      drawSeries(ctx, payPts, colorPayment, padB, h);
    }

    resize();
    window.addEventListener('resize', resize);
  })();

  /* ── Invoice filter popover ── */
  (function initInvFilterPop() {
    var wrap = document.getElementById('invFilterWrap');
    var btn = document.getElementById('invFilterBtn');
    var pop = document.getElementById('invFilterPop');
    var resetBtn = document.getElementById('invFilterReset');
    var statusSel = document.getElementById('invFilterStatus');
    var invInput = document.getElementById('invFilterInvNo');
    if (!wrap || !btn || !pop) return;

    function openPop() {
      pop.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
    }
    function closePop() {
      pop.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }

    function applyRowFilter() {
      var status = statusSel ? (statusSel.value || '').toLowerCase() : '';
      var invQ = invInput ? invInput.value.trim().toLowerCase() : '';
      var tbody = document.getElementById('tbodyInvoice');
      if (!tbody) return;
      var rows = tbody.querySelectorAll('tr');
      rows.forEach(function(tr) {
        var cells = tr.querySelectorAll('td');
        if (!cells.length) return;
        var invText = (cells[2] ? cells[2].textContent : '').toLowerCase();
        var statusText = (cells[14] ? cells[14].textContent : '').toLowerCase();
        var okStatus = !status || statusText.indexOf(status) !== -1;
        var okInv = !invQ || invText.indexOf(invQ) !== -1;
        tr.style.display = okStatus && okInv ? '' : 'none';
      });
    }

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (pop.hidden) openPop(); else closePop();
    });
    pop.addEventListener('click', function(e) { e.stopPropagation(); });

    pop.querySelectorAll('.bl-pop-filter__acc').forEach(function(acc) {
      var accBtn = acc.querySelector('.bl-pop-filter__acc-btn');
      var panel = acc.querySelector('.bl-pop-filter__acc-panel');
      if (!accBtn || !panel) return;
      accBtn.addEventListener('click', function() {
        var open = !acc.classList.contains('is-open');
        acc.classList.toggle('is-open', open);
        accBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.hidden = !open;
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        if (statusSel) statusSel.value = '';
        if (invInput) invInput.value = '';
        applyRowFilter();
      });
    }
    if (statusSel) statusSel.addEventListener('change', applyRowFilter);
    if (invInput) invInput.addEventListener('input', applyRowFilter);

    document.addEventListener('click', function(e) {
      if (wrap.contains(e.target)) return;
      closePop();
    });
  })();

  /* ── Initial renders ── */
  renderInvoice();
  renderProforma();
  renderChallan();
  renderReceipt();
  renderLedger();
  renderCndn('credit');
  renderOB();
  renderAdj();
  renderReported();
})();
