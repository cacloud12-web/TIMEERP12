(function () {
  'use strict';

  var LISTS = {
    rm: ['Saurabh Bhardwaj', 'Kamal Sharma', 'Ankur Gupta', 'Akash', 'Dev Aggarwal'],
    team: ['dummy', 'Tax Team', 'Audit Team', 'GST Team'],
    ownership: ['Proprietorship', 'Partnership', 'Private Limited', 'LLP', 'Public Limited', 'HUF'],
    country: ['India', 'Other', 'Nepal', 'UAE', 'USA', 'Canada', 'UK', 'SINGAPORE', 'MAURITIUS', 'Australia'],
    state: [
      'Abu Dhabi', 'Ajman', 'Alberta',
      'ANDAMAN AND NICOBAR ISLANDS', 'ANDHRA PRADESH', 'ARUNACHAL PRADESH', 'ASSAM',
      'BIHAR', 'British Columbia',
      'CHANDIGARH', 'CHHATTISGARH',
      'DADRA AND NAGAR HAVELI AND DAMAN AND DIU', 'DELHI', 'Dubai',
      'Fujairah',
      'GOA', 'GUJARAT',
      'HARYANA', 'HIMACHAL PRADESH',
      'JAMMU AND KASHMIR', 'JHARKHAND',
      'KARNATAKA', 'KERALA',
      'LADAKH', 'LAKSHADWEEP',
      'MADHYA PRADESH', 'MAHARASHTRA', 'MANIPUR', 'MEGHALAYA', 'MIZORAM',
      'NAGALAND',
      'ODISHA',
      'PUDUCHERRY', 'PUNJAB',
      'RAJASTHAN', 'Ras Al Khaimah',
      'SIKKIM', 'Sharjah',
      'TAMIL NADU', 'TELANGANA', 'TRIPURA',
      'Umm Al-Quwain (UAQ)', 'UTTARAKHAND', 'UTTAR PRADESH',
      'WEST BENGAL'
    ],
    district: ['New Delhi', 'Gurugram', 'Noida', 'Mumbai', 'Ahmedabad'],
    recur: ['Days', 'Weeks', 'Months', 'Years'],
    customer: ['(TE3) testing'],
    portal: ['GST', 'Income Tax', 'MCA', 'Traces', 'IEC', 'E-Way Bill', 'TDS'],
    frequency: ['Monthly', 'Quarterly', 'Yearly'],
    branch: ['CA CloudDesk', 'Bluemon Wealth Management'],
    initial: ['INV', 'PI', 'GST']
  };

  var clock = document.getElementById('crmTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  }
  tickClock();
  setInterval(tickClock, 30000);

  var editParams = new URLSearchParams(window.location.search);
  var isEdit = editParams.get('edit') === '1' || editParams.get('edit') === 'true';

  var step = 0;
  var panels = document.querySelectorAll('.ac-panel');
  var stepBtns = document.querySelectorAll('.ac-step');
  var fill = document.getElementById('acStepsFill');
  var prevBtn = document.getElementById('acPrev');
  var nextBtn = document.getElementById('acNext');
  var extraBtns = document.getElementById('acLastBtns');

  function showStep(i) {
    step = Math.max(0, Math.min(panels.length - 1, i));
    panels.forEach(function (p, idx) { p.hidden = idx !== step; });
    stepBtns.forEach(function (b, idx) {
      b.classList.toggle('is-active', idx === step);
      b.classList.toggle('is-done', idx < step);
    });
    fill.style.width = (step / (stepBtns.length - 1)) * 88 + '%';
    prevBtn.hidden = step === 0;
    nextBtn.hidden = step === panels.length - 1;
    extraBtns.hidden = step !== panels.length - 1;
  }
  stepBtns.forEach(function (b, idx) {
    b.addEventListener('click', function () { showStep(idx); });
  });
  prevBtn.addEventListener('click', function () { showStep(step - 1); });
  nextBtn.addEventListener('click', function () { showStep(step + 1); });
  document.getElementById('acFinish').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Saved', isEdit ? 'Client updated.' : 'Client created.');
    window.location.href = isEdit ? 'crm_view_clients.html' : 'home.html#module/crm';
  });
  document.getElementById('acSaveLogin').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Saved', 'Client saved. Login allowed.');
  });
  document.querySelectorAll('.ac-date').forEach(function (wrap) {
    var text = wrap.querySelector('input[type="text"]');
    var native = wrap.querySelector('input[type="date"]');
    native.addEventListener('change', function () {
      if (!this.value) return;
      var p = this.value.split('-');
      text.value = p[2] + '/' + p[1] + '/' + p[0];
    });
  });

  function closeCombos(except) {
    document.querySelectorAll('.ac-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }
  document.querySelectorAll('.ac-combo').forEach(function (combo) {
    var key = combo.getAttribute('data-list');
    var list = LISTS[key] || [];
    var input = combo.querySelector('input');
    var menu = combo.querySelector('.ac-combo__menu');
    function render(q) {
      var qq = (q || '').toLowerCase();
      menu.innerHTML = list.filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; })
        .map(function (n) { return '<div class="ac-combo__item">' + n + '</div>'; }).join('') ||
        '<div class="ac-combo__item">No matches</div>';
    }
    function open() { render(input.value); closeCombos(combo); combo.classList.add('is-open'); }
    input.addEventListener('focus', open);
    input.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    input.addEventListener('input', function () { render(input.value); combo.classList.add('is-open'); });
    menu.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.ac-combo__item');
      if (!item || item.textContent === 'No matches') return;
      e.preventDefault();
      input.value = item.textContent;
      combo.classList.remove('is-open');
    });
  });
  document.addEventListener('click', function () { closeCombos(); });

  var secondAddr = document.getElementById('acSecondAddr');
  document.getElementById('acRemoveAddr').addEventListener('click', function () {
    secondAddr.hidden = true;
  });

  document.getElementById('acGstinRefresh').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('GSTIN', 'GSTIN details refreshed.');
  });

  var photoInput = document.getElementById('acPhotoInput');
  document.getElementById('acPhotoBtn').addEventListener('click', function () { photoInput.click(); });
  photoInput.addEventListener('change', function () {
    if (this.files.length && window.DashboardShell) DashboardShell.toast('Uploaded', this.files[0].name);
  });

  var sigWrap = document.getElementById('acSignatories');
  var sigCount = 1;
  function bindSigMinus(btn) {
    btn.addEventListener('click', function () {
      var block = btn.closest('.ac-sig');
      if (sigWrap.querySelectorAll('.ac-sig').length < 2) return;
      block.remove();
    });
  }
  bindSigMinus(sigWrap.querySelector('.ac-sig-minus'));
  document.getElementById('acAddSig').addEventListener('click', function () {
    sigCount += 1;
    var first = sigWrap.querySelector('.ac-sig');
    var clone = first.cloneNode(true);
    clone.querySelector('.ac-sig-head span').textContent = 'Authorised Signatory ' + sigCount;
    clone.querySelectorAll('input[type="text"], textarea').forEach(function (el) { el.value = ''; });
    var radios = clone.querySelectorAll('input[type="radio"]');
    var name = 'primary' + sigCount;
    radios.forEach(function (r, i) {
      r.name = name;
      r.checked = i === 0;
    });
    sigWrap.appendChild(clone);
    bindSigMinus(clone.querySelector('.ac-sig-minus'));
  });

  document.getElementById('acSvcToggle').addEventListener('click', function () {
    document.getElementById('acSvcItem').classList.toggle('is-open');
  });
  document.querySelectorAll('.ac-seg').forEach(function (seg) {
    seg.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      seg.querySelectorAll('button').forEach(function (b) { b.classList.remove('is-on'); });
      btn.classList.add('is-on');
    });
  });

  document.getElementById('acTableToggle').addEventListener('click', function () {
    this.classList.toggle('is-on');
  });
  document.getElementById('acClientAccess').addEventListener('click', function () {
    this.classList.toggle('is-on');
    document.getElementById('acClientAccessLbl').textContent = this.classList.contains('is-on') ? 'Yes' : 'No';
  });
  document.querySelectorAll('#acDocsBody .ac-switch').forEach(function (sw) {
    sw.addEventListener('click', function () {
      this.classList.toggle('is-on');
      var lbl = this.parentElement && this.parentElement.querySelector('span:last-child');
      if (lbl) lbl.textContent = this.classList.contains('is-on') ? 'Yes' : 'No';
    });
  });

  var pwModal = document.getElementById('acPwModal');
  var pwBody = document.getElementById('acPwBody');
  var pwEmpty = document.getElementById('acPwEmpty');
  var pwPortalInput = document.getElementById('acPwPortalInput');
  var pwUser = document.getElementById('acPwUser');
  var pwPass = document.getElementById('acPwPass');
  var pwTitle = pwModal.querySelector('h2');
  var editingPw = null;
  var remarksModal = document.getElementById('acRemarksModal');
  var remarksInput = document.getElementById('acRemarksInput');
  var remarksRow = null;
  var logsModal = document.getElementById('acLogsModal');
  function toast(title, msg) { if (window.DashboardShell) DashboardShell.toast(title, msg); }
  function pwCount() {
    var n = pwBody.querySelectorAll('tr').length;
    document.getElementById('acPwCount').textContent = n + ' / ' + n;
    pwEmpty.hidden = n > 0;
  }
  function actsHtml(url) {
    return '<span class="ac-acts">' +
      '<button class="ac-act ac-act--del" type="button" data-ac-del aria-label="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/><path d="M6.5 7l.8 12.2A1.5 1.5 0 008.8 20.5h6.4a1.5 1.5 0 001.5-1.3L17.5 7"/><path d="M10 11v6M14 11v6"/></svg></button>' +
      '<button class="ac-act" type="button" data-ac-edit aria-label="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></button>' +
      '<a class="ac-act" href="' + (url || '#') + '" target="_blank" rel="noopener" aria-label="Open portal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M10 14l8-8M14 6h4v4"/></svg></a>' +
      '<button class="ac-act" type="button" data-ac-remarks aria-label="Remarks"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3a9 9 0 00-9 9c0 1.7.5 3.3 1.3 4.7L3 21l4.6-1.2A9 9 0 1012 3z"/><circle cx="8.5" cy="12" r="1.15" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.15" fill="currentColor" stroke="none"/><circle cx="15.5" cy="12" r="1.15" fill="currentColor" stroke="none"/></svg></button>' +
      '<button class="ac-act" type="button" data-ac-logs aria-label="Password logs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 4h12v13.2A2.8 2.8 0 0115.2 20H8.8A2.8 2.8 0 016 17.2V4z"/><path d="M9 8.5h6M9 12h6"/><path d="M9.2 19.6c1-1.8 4.6-1.8 5.6 0"/></svg></button>' +
      '</span>';
  }
  document.getElementById('acAddPw').addEventListener('click', function () {
    editingPw = null;
    pwTitle.textContent = 'Client Software';
    pwPortalInput.value = '';
    pwUser.value = 'simrankshyp11@gmail.com';
    pwPass.type = 'password';
    pwPass.value = 'Kamal@123';
    pwModal.classList.add('is-open');
  });
  document.getElementById('acPwClose').addEventListener('click', function () { pwModal.classList.remove('is-open'); });
  pwModal.addEventListener('click', function (e) { if (e.target === pwModal) pwModal.classList.remove('is-open'); });
  document.getElementById('acPwToggle').addEventListener('click', function () {
    pwPass.type = pwPass.type === 'password' ? 'text' : 'password';
  });
  document.getElementById('acPwForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!pwPortalInput.value) { toast('Required', 'Please select a login portal.'); return; }
    var portal = pwPortalInput.value;
    var user = pwUser.value.trim();
    var pass = pwPass.value;
    var today = new Date();
    var d = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
    if (editingPw) {
      editingPw.setAttribute('data-portal', portal);
      editingPw.setAttribute('data-user', user);
      editingPw.setAttribute('data-pass', pass);
      editingPw.cells[0].textContent = portal;
      editingPw.cells[1].textContent = user;
      editingPw.cells[3].textContent = d;
      toast('Updated', 'Password updated.');
    } else {
      var tr = document.createElement('tr');
      tr.setAttribute('data-portal', portal);
      tr.setAttribute('data-user', user);
      tr.setAttribute('data-pass', pass);
      tr.setAttribute('data-remarks', '');
      tr.innerHTML = '<td>' + portal + '</td><td>' + user + '</td><td>**********</td><td>' + d + '</td><td>CA CloudDesk</td><td><button class="ac-link" type="button" data-ac-view>View</button></td><td>' + actsHtml('#') + '</td>';
      pwBody.appendChild(tr);
      toast('Saved', 'Password added.');
    }
    pwCount();
    pwModal.classList.remove('is-open');
  });
  pwBody.addEventListener('click', function (e) {
    var row = e.target.closest('tr');
    if (!row) return;
    if (e.target.closest('[data-ac-del]')) {
      row.remove();
      pwCount();
      toast('Deleted', 'Password removed.');
    }
    if (e.target.closest('[data-ac-edit]')) {
      editingPw = row;
      pwTitle.textContent = 'Edit Client Software';
      pwPortalInput.value = row.getAttribute('data-portal') || '';
      pwUser.value = row.getAttribute('data-user') || '';
      pwPass.type = 'password';
      pwPass.value = row.getAttribute('data-pass') || '';
      pwModal.classList.add('is-open');
    }
    if (e.target.closest('[data-ac-remarks]') || e.target.closest('[data-ac-view]')) {
      remarksRow = row;
      remarksInput.value = row.getAttribute('data-remarks') || '';
      remarksModal.classList.add('is-open');
    }
    if (e.target.closest('[data-ac-logs]')) {
      document.getElementById('acLogsBody').innerHTML =
        '<tr><td>1</td><td>' + (row.cells[4] ? row.cells[4].textContent : '') + '</td><td>' + (row.getAttribute('data-portal') || '') +
        '</td><td>' + (row.getAttribute('data-user') || '') + '</td><td>**********</td><td>' + (row.cells[3] ? row.cells[3].textContent : '') +
        '</td><td>Record Created!</td></tr>';
      logsModal.classList.add('is-open');
    }
  });
  document.getElementById('acRemarksClose').addEventListener('click', function () { remarksModal.classList.remove('is-open'); });
  remarksModal.addEventListener('click', function (e) { if (e.target === remarksModal) remarksModal.classList.remove('is-open'); });
  document.getElementById('acRemarksForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (remarksRow) remarksRow.setAttribute('data-remarks', remarksInput.value.trim());
    toast('Saved', 'Remarks saved.');
    remarksModal.classList.remove('is-open');
  });
  document.getElementById('acLogsClose').addEventListener('click', function () { logsModal.classList.remove('is-open'); });
  logsModal.addEventListener('click', function (e) { if (e.target === logsModal) logsModal.classList.remove('is-open'); });

  document.getElementById('acCustomFields').addEventListener('click', function () {
    window.location.href = 'crm_custom_fields.html';
  });
  document.getElementById('acLocalPath').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Local Path', 'Local path added.');
  });

  if (isEdit) {
    document.title = 'Edit Client | TimeERP CRM';
    var titleEl = document.querySelector('.ac-title');
    if (titleEl) titleEl.textContent = 'Edit Client';
    var back = document.querySelector('.ac-back');
    if (back) back.setAttribute('href', 'crm_view_clients.html');
    var name = editParams.get('name') || editParams.get('client') || '';
    var file = editParams.get('file') || '';
    var city = editParams.get('city') || '';
    var fileInput = document.getElementById('acFileNumber');
    var tradeInput = document.getElementById('acTradeName');
    var distInput = document.getElementById('acDistrictInput');
    if (fileInput && file) fileInput.value = file;
    if (tradeInput && name) tradeInput.value = name;
    if (distInput && city) distInput.value = city;
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    pwModal.classList.remove('is-open');
    remarksModal.classList.remove('is-open');
    logsModal.classList.remove('is-open');
  });
})();
