/* TIME ERP — View Form 146 */
(function () {
  'use strict';

  (function tick() {
    var el = document.getElementById('f6TopClock'); if (!el) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
    setTimeout(tick, 30000);
  })();

  /* Client combo */
  var CLIENTS = ['Internal','SAURABH BHARDWAJ','SAURABH BHARDWAJ HUF','THE GOLD REALTY','law seva management private limited','PERFECT PAIR','TATA MOTORS PASSENG...','Saksham'];
  var combo = document.getElementById('f6ClientCombo');
  if (combo) {
    var inp = combo.querySelector('.f6-combo__input'), list = document.getElementById('f6ClientList');
    function renderC(f) {
      var q = (f || '').toLowerCase(); list.innerHTML = '';
      CLIENTS.forEach(function (c) {
        if (q && c.toLowerCase().indexOf(q) === -1) return;
        var d = document.createElement('div'); d.className = 'f6-combo__opt'; d.textContent = c;
        d.addEventListener('click', function () { inp.value = c; list.classList.remove('open'); });
        list.appendChild(d);
      });
    }
    inp.addEventListener('focus', function () { renderC(inp.value); list.classList.add('open'); });
    inp.addEventListener('input', function () { renderC(inp.value); list.classList.add('open'); });
    document.addEventListener('click', function (e) { if (!combo.contains(e.target)) list.classList.remove('open'); });
  }

  /* Tabs */
  document.querySelectorAll('.f6-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.f6-tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var w = tab.getAttribute('data-tab');
      document.getElementById('panelForm146').hidden = w !== 'form146';
      document.getElementById('panelDrafts').hidden = w !== 'drafts';
    });
  });

  /* Columns */
  var COLS = [
    'Serial No.','Status of CA Firm','Client Name','Honour of Remitter','Name of Remitter','PAN','Honour of Beneficiary','Name of Remittee','Premises/Building/Village',
    'Town/City/District','Flat/Door/Building','Area/Locality','Pincode','ZipCode','Post Office','State','Road/Street','Country',
    'Country of Remittance','SPECIFY COUNTRY OF REMITTANCE','Currency','SPECIFY Currency','Amount In Foreign Currency','Amount In INR','Name of Bank','SPECIFY Bank Name','IFSC',
    'Name of Branch','BsrCode','Proposed Date of Remittance','Nature of Remittance','SPECIFY Nature of Remittance','Category','Sub Category','Whether Tax paid is Grossed up','Whether chargeable to tax in India',
    'Reason','Relevant Section','Income Chargeable','Tax Liability','Basis of determining same','Whether Tax Residency Certificate Obtained','Relevant DTAA','Relevant Article of DTAA','Income Chargeable',
    'Tax Liability','Whether Remittance for Royalty/FTS/Int./Div.','Relevant Article of DTAA','Rate of TDS','Whether Remittance for Business Income','If Business Income (Whether Liable to Tax in India)','Basis',
    'Basis (if No), [Specify relevant DTAA]','Whether remittance is on account of Capital Gain',
    'Amt of LTCG','Amt of STCG','Basis of arriving at same','Other Remittance','Nature of Remittance','Whether taxable in India as per DTAA','Rate of TDS','Reason','Amount in Foreign Currency',
    'Amount in INR','Applicable TDS as per','Rate of TDS','Actual amt of remittance on Foreign Currency','Date of Deduction of Tax as Source','Name of Chartered Accountant','Name of CA Firm',
    'CA Premises/Building/Village','CA Town/City/District','CA Floor/Door/Building','CA Area/Locality','CA Pincode','CA State','CA Road/Street','CA Country',
    'Membership Number','Firm Registration Number','Date of certificate','Place','File_Name/Pan_Remittee','Status','Verified','Other Bank','UDIN','Tags','Document','Action'
  ];

  /* Sample data rows */
  var DATA = [
    {0:'1',1:'We',2:'SAURABH BHARDWAJ HUF',3:'--',4:'--',5:'--',6:'--',7:'--',8:'--',9:'--',10:'--',11:'--',12:'--',13:'--',14:'',15:'--',16:'--',17:'--',18:'--',19:'--',20:'--',21:'--',22:'',23:'--',24:'--',25:'--',26:'--',27:'--',28:'--',29:'16/01/2026',30:'--',31:'--',32:'--',33:'--',34:'No',35:'No',36:'--',37:'--',38:'--',39:'--',40:'--',41:'No',42:'--',43:'--',44:'--',45:'--',46:'No',47:'--',48:'--',49:'No',50:'No',51:'--',52:'--',53:'No',54:'--',55:'--',56:'--',57:'No',58:'--',59:'No',60:'--',61:'--',62:'--',63:'--',64:'--',65:'--',66:'--',67:'16/01/2026',68:'--',69:'--',70:'--',71:'--',72:'--',73:'--',74:'--',75:'--',76:'--',77:'--',78:'--',79:'2026-01-16',80:'--',81:'--',82:'--',83:'No',84:'ⓘ',85:'ⓘ',86:'--',87:'ⓘ',act:'edit'},
    {0:'2',1:'I',2:'SAURABH BHARDWAJ HUF',3:'Mr',4:'Saurabh Bhardwaj',5:'BUNPB0614B',6:'Ms',7:'law seva management private limited',8:'112313',9:'Ghaziabad',10:'jghj',11:'jhgjh',12:'201013',13:'67868',14:'',15:'Andhra Pradesh',16:'PLOT NO 159 AND 160',17:'INDIA',18:'AFGHANISTAN',19:'--',20:'AFGHANI',21:'--',22:'234',23:'₹324',24:'Other Bank',25:'SADAS',26:'sadasd',27:'asdas',28:'7867687',29:'17/09/2025',30:'ADVERTISEMENT FEE',31:'--',32:'Foreign Portfolio Investment',33:'S0001 - Indian Portfolio investme...',34:'Yes',35:'No',36:'ok',37:'--',38:'--',39:'--',40:'--',41:'Yes',42:'--',43:'--',44:'--',45:'--',46:'No',47:'--',48:'--',49:'No',50:'No',51:'--',52:'--',53:'No',54:'--',55:'--',56:'--',57:'No',58:'--',59:'No',60:'1',61:'1',62:'--',63:'--',64:'--',65:'--',66:'--',67:'17/09/2025',68:'SAURABH BHARDWAJ',69:'SAURABH BHARDWAJ',70:'--',71:'Ghaziabad',72:'qweqwe',73:'qwedqw',74:'201013',75:'Andaman and Nicobar islands',76:'PLOT NO 159 AND 160, SHOP NO 3...',77:'ÅLAND ISLANDS',78:'013334',79:'3211223D',80:'2025-12-19',81:'--',82:'--',83:'No',84:'View',85:'ⓘ',86:'--',87:'ⓘ',act:'edit'},
    {0:'3',1:'We',2:'--',3:'--',4:'--',5:'--',6:'--',7:'--',8:'--',9:'--',10:'--',11:'--',12:'--',13:'--',14:'',15:'--',16:'--',17:'--',18:'--',19:'--',20:'--',21:'--',22:'',23:'--',24:'--',25:'--',26:'--',27:'--',28:'--',29:'',30:'--',31:'--',32:'--',33:'--',34:'No',35:'No',36:'--',37:'--',38:'--',39:'--',40:'--',41:'No',42:'--',43:'--',44:'--',45:'--',46:'No',47:'--',48:'--',49:'No',50:'No',51:'--',52:'--',53:'No',54:'--',55:'--',56:'--',57:'No',58:'--',59:'No',60:'--',61:'--',62:'--',63:'--',64:'--',65:'--',66:'--',67:'',68:'--',69:'--',70:'--',71:'--',72:'--',73:'--',74:'--',75:'--',76:'--',77:'--',78:'--',79:'--',80:'--',81:'--',82:'--',83:'No',84:'ⓘ',85:'',86:'123213321123',87:'ⓘ',act:'edit'},
    {0:'4',1:'We',2:'--',3:'--',4:'--',5:'--',6:'--',7:'--',8:'--',9:'--',10:'--',11:'--',12:'--',13:'--',14:'',15:'--',16:'--',17:'--',18:'--',19:'--',20:'--',21:'--',22:'',23:'--',24:'--',25:'--',26:'--',27:'--',28:'--',29:'',30:'--',31:'--',32:'--',33:'--',34:'No',35:'No',36:'--',37:'--',38:'--',39:'--',40:'--',41:'No',42:'--',43:'--',44:'--',45:'--',46:'No',47:'--',48:'--',49:'No',50:'No',51:'--',52:'--',53:'No',54:'--',55:'--',56:'--',57:'No',58:'--',59:'No',60:'--',61:'--',62:'--',63:'--',64:'--',65:'--',66:'--',67:'',68:'--',69:'--',70:'--',71:'--',72:'--',73:'--',74:'--',75:'--',76:'--',77:'--',78:'--',79:'--',80:'--',81:'--',82:'--',83:'No',84:'ⓘ',85:'ⓘ',86:'--',87:'ⓘ',act:'edit'},
    {0:'5',1:'We',2:'--',3:'--',4:'--',5:'--',6:'--',7:'--',8:'--',9:'--',10:'--',11:'--',12:'--',13:'--',14:'',15:'--',16:'--',17:'--',18:'--',19:'--',20:'--',21:'--',22:'',23:'--',24:'--',25:'--',26:'--',27:'--',28:'--',29:'',30:'--',31:'--',32:'--',33:'--',34:'No',35:'No',36:'--',37:'--',38:'--',39:'--',40:'--',41:'No',42:'--',43:'--',44:'--',45:'--',46:'No',47:'--',48:'--',49:'No',50:'No',51:'--',52:'--',53:'No',54:'--',55:'--',56:'--',57:'No',58:'--',59:'No',60:'--',61:'--',62:'--',63:'--',64:'--',65:'--',66:'--',67:'',68:'--',69:'--',70:'--',71:'--',72:'--',73:'--',74:'--',75:'--',76:'--',77:'--',78:'--',79:'--',80:'--',81:'--',82:'--',83:'No',84:'ⓘ',85:'ⓘ',86:'--',87:'ⓘ',act:'edit'}
  ];

  function buildHead(id) {
    var tr = document.getElementById(id); tr.innerHTML = '';
    COLS.forEach(function (c) { var th = document.createElement('th'); th.textContent = c; tr.appendChild(th); });
  }

  function buildBody(id, data) {
    var tbody = document.getElementById(id); tbody.innerHTML = '';
    data.forEach(function (row) {
      var tr = document.createElement('tr');
      COLS.forEach(function (_, ci) {
        var td = document.createElement('td');
        var v = row[ci] || '--';
        if (ci === COLS.length - 1) {
          td.innerHTML = '<button class="f6-icon-btn" title="Edit">✏</button> <button class="f6-icon-btn f6-icon-btn--red" title="PDF">📄</button> <button class="f6-icon-btn f6-icon-btn--green" title="Download">⬇</button>';
        } else if (v === 'View') {
          td.innerHTML = '<a href="#" class="f6-link">View</a>';
        } else if (v === 'ⓘ') {
          td.innerHTML = '<span class="f6-icon-btn">ⓘ</span>';
        } else {
          td.textContent = v;
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  buildHead('f6HeadA');
  buildBody('f6BodyA', DATA);
  buildHead('f6HeadD');
  buildBody('f6BodyD', []);

  /* Columns dropdown */
  var colBtn = document.getElementById('f6ColBtn');
  var colDrop = document.getElementById('f6ColDrop');
  var colList = document.getElementById('f6ColList');
  var colSelAll = document.getElementById('f6ColSelAll');
  var colState = [];

  function renderColList() {
    colList.innerHTML = '';
    COLS.forEach(function (c, i) {
      var div = document.createElement('label');
      div.className = 'f6-col-item';
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = colState[i] !== false;
      cb.addEventListener('change', function () { colState[i] = cb.checked; applyColVisibility(); });
      var span = document.createElement('span');
      span.textContent = c;
      div.appendChild(cb);
      div.appendChild(span);
      colList.appendChild(div);
    });
  }

  function applyColVisibility() {
    var thsA = document.getElementById('f6HeadA').children;
    var rowsA = document.getElementById('f6BodyA').children;
    for (var ci = 0; ci < COLS.length; ci++) {
      var vis = colState[ci] !== false ? '' : 'none';
      if (thsA[ci]) thsA[ci].style.display = vis;
      for (var ri = 0; ri < rowsA.length; ri++) {
        if (rowsA[ri].children[ci]) rowsA[ri].children[ci].style.display = vis;
      }
    }
  }

  COLS.forEach(function () { colState.push(true); });
  renderColList();

  colBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = colDrop.classList.toggle('open');
    colBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  colDrop.addEventListener('click', function (e) { e.stopPropagation(); });
  document.addEventListener('click', function () {
    colDrop.classList.remove('open');
    colBtn.setAttribute('aria-expanded', 'false');
  });

  colSelAll.addEventListener('click', function () {
    var allChecked = colState.every(function (v) { return v !== false; });
    colState = colState.map(function () { return !allChecked; });
    renderColList();
    applyColVisibility();
    colSelAll.textContent = allChecked ? 'Select All' : 'Deselect All';
  });
})();
