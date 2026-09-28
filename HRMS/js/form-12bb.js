/**
 * TIME ERP — Form 12BB (HRA, interest, VI-A, remarks by tax regime)
 */
(function () {
  'use strict';

  var MONTH_NAMES = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  var state = {
    step: 0,
    checkedIn: false,
    regime: '',
    uploadedName: ''
  };

  var els = {
    taxRegime: document.getElementById('fbbTaxRegime'),
    fySelect: document.getElementById('fbbFySelect'),
    uploadedName: document.getElementById('fbbUploadedName'),
    newRegime: document.getElementById('fbbNewRegime'),
    oldRegime: document.getElementById('fbbOldRegime'),
    stepper: document.getElementById('fbbStepper'),
    panels: [
      document.getElementById('fbbPanel0'),
      document.getElementById('fbbPanel1'),
      document.getElementById('fbbPanel2'),
      document.getElementById('fbbPanel3')
    ],
    hraBody: document.getElementById('fbbHraBody'),
    annualRent: document.getElementById('fbbAnnualRent'),
    topCheckIn: document.getElementById('fbbTopCheckInBtn'),
    topClock: document.getElementById('fbbTopClock')
  };

  function getQuery() {
    var q = {};
    if (!window.location.search) return q;
    window.location.search.slice(1).split('&').forEach(function (part) {
      if (!part) return;
      var kv = part.split('=');
      q[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' '));
    });
    return q;
  }

  function applyDeclarationContext(q) {
    var page = document.getElementById('fbbPage');
    var declBack = document.getElementById('fbbDeclBack');
    var header = document.querySelector('.fbb-header');
    if (page) page.classList.add('fbb-page--declaration');
    if (declBack) {
      declBack.hidden = false;
      declBack.href = 'employee_declaration.html?tab=' + encodeURIComponent(q.tab || 'approve12bb');
    }
    if (header) header.hidden = true;
    if (els.fySelect && q.fy) els.fySelect.value = q.fy;
    if (els.taxRegime) els.taxRegime.value = '';
    setUploadedName('');
    showRegime();
  }

  function toast(title, detail) {
    if (window.DashboardShell && window.DashboardShell.toast) {
      window.DashboardShell.toast(title, detail);
      return;
    }
    var stack = document.getElementById('toastStack');
    if (!stack) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + (detail || '') + '</span>';
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 3200);
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function formatClock(d) {
    return pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function num(val) {
    var n = parseFloat(String(val || '').replace(/,/g, ''));
    return isNaN(n) ? 0 : n;
  }

  function fyYears(fyValue) {
    var parts = String(fyValue || '26-27').split('-');
    var startYY = parseInt(parts[0], 10);
    var endYY = parseInt(parts[1], 10);
    if (isNaN(startYY) || isNaN(endYY)) return { start: 2026, end: 2027 };
    var start = startYY >= 100 ? startYY : 2000 + startYY;
    var end = endYY >= 100 ? endYY : 2000 + endYY;
    return { start: start, end: end };
  }

  function monthLabels(fyValue) {
    var y = fyYears(fyValue);
    return MONTH_NAMES.map(function (name, i) {
      var year = i < 9 ? y.start : y.end;
      return name + '-' + year;
    });
  }

  function renderHraRows() {
    if (!els.hraBody) return;
    var labels = monthLabels(els.fySelect ? els.fySelect.value : '26-27');
    var html = '';
    labels.forEach(function (label, i) {
      html +=
        '<tr data-month="' + i + '">' +
          '<td class="fbb-hra-table__month-label">' + label + '</td>' +
          '<td class="fbb-col-rent"><input type="text" data-rent inputmode="decimal" aria-label="Rent paid ' + label + '"></td>' +
          '<td class="fbb-col-name"><input type="text" data-landlord aria-label="Landlord name ' + label + '"></td>' +
          '<td class="fbb-col-address"><input type="text" data-address aria-label="Landlord address ' + label + '"></td>' +
          '<td class="fbb-col-pan"><input type="text" data-pan aria-label="PAN or Aadhaar ' + label + '"></td>' +
        '</tr>';
    });
    els.hraBody.innerHTML = html;
    bindRentSum();
  }

  function sumMonthlyRent() {
    if (!els.hraBody || !els.annualRent) return;
    var inputs = els.hraBody.querySelectorAll('[data-rent]');
    var total = 0;
    for (var i = 0; i < inputs.length; i++) total += num(inputs[i].value);
    els.annualRent.value = total > 0 ? String(total) : '';
  }

  function bindRentSum() {
    if (!els.hraBody) return;
    els.hraBody.querySelectorAll('[data-rent]').forEach(function (input) {
      input.addEventListener('input', sumMonthlyRent);
    });
  }

  function setUploadedName(name) {
    state.uploadedName = name || '';
    if (!els.uploadedName) return;
    els.uploadedName.textContent = state.uploadedName;
    els.uploadedName.classList.toggle('has-file', !!state.uploadedName);
  }

  function bindUpload(input) {
    if (!input) return;
    var label = input.parentElement && input.parentElement.querySelector('.fbb-upload__label');
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      if (!file) return;
      if (label) label.textContent = file.name;
      if (input.getAttribute('data-upload-target') === 'declaration') setUploadedName(file.name);
      toast('Uploaded', file.name);
    });
  }

  function bindAllUploads() {
    document.querySelectorAll('.fbb-upload input[type="file"]').forEach(bindUpload);
  }

  function showRegime() {
    var regime = els.taxRegime ? els.taxRegime.value : '';
    state.regime = regime;
    if (els.newRegime) els.newRegime.hidden = regime !== 'new';
    if (els.oldRegime) els.oldRegime.hidden = regime !== 'old';
    if (regime === 'old') {
      state.step = 0;
      goStep(0);
    }
  }

  function goStep(step) {
    state.step = Math.max(0, Math.min(3, step));
    if (els.stepper) {
      els.stepper.querySelectorAll('.fbb-stepper__item').forEach(function (item) {
        var s = parseInt(item.getAttribute('data-step'), 10);
        item.classList.toggle('is-active', s === state.step);
        item.classList.toggle('is-done', s < state.step);
      });
    }
    els.panels.forEach(function (panel, i) {
      if (!panel) return;
      var active = i === state.step;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  }

  function tickClock() {
    if (!els.topClock) return;
    var now = new Date();
    els.topClock.textContent = formatClock(now);
    els.topClock.setAttribute('datetime', now.toISOString());
  }

  function initCheckIn() {
    if (!els.topCheckIn) return;
    els.topCheckIn.addEventListener('click', function () {
      state.checkedIn = !state.checkedIn;
      els.topCheckIn.classList.toggle('is-in', !state.checkedIn);
      els.topCheckIn.textContent = state.checkedIn ? 'Check Out' : 'Check In';
      toast(state.checkedIn ? 'Checked In' : 'Checked Out', formatClock(new Date()));
    });
  }

  function initNav() {
    var next0 = document.getElementById('fbbNext0');
    var prev1 = document.getElementById('fbbPrev1');
    var next1 = document.getElementById('fbbNext1');
    var prev2 = document.getElementById('fbbPrev2');
    var next2 = document.getElementById('fbbNext2');
    var prev3 = document.getElementById('fbbPrev3');
    var newPrev = document.getElementById('fbbNewPrev');
    var newPrint = document.getElementById('fbbNewPrint');
    var oldPrint = document.getElementById('fbbOldPrint');

    if (next0) next0.addEventListener('click', function () { goStep(1); });
    if (prev1) prev1.addEventListener('click', function () { goStep(0); });
    if (next1) next1.addEventListener('click', function () { goStep(2); });
    if (prev2) prev2.addEventListener('click', function () { goStep(1); });
    if (next2) next2.addEventListener('click', function () { goStep(3); });
    if (prev3) prev3.addEventListener('click', function () { goStep(2); });

    if (newPrev) newPrev.addEventListener('click', function () {
      toast('Previous', 'No prior step for New Tax Regime.');
    });
    if (newPrint) newPrint.addEventListener('click', function () {
      toast('Print & Proceed', 'Proceeding to print…');
    });
    if (oldPrint) oldPrint.addEventListener('click', function () {
      toast('Print & Proceed', 'Proceeding to print…');
    });

    if (els.stepper) {
      els.stepper.addEventListener('click', function (e) {
        var item = e.target.closest('.fbb-stepper__item');
        if (!item) return;
        var s = parseInt(item.getAttribute('data-step'), 10);
        if (!isNaN(s)) goStep(s);
      });
    }
  }

  function init() {
    var q = getQuery();
    if (q.from === 'declaration') applyDeclarationContext(q);
    renderHraRows();
    bindAllUploads();
    initNav();
    initCheckIn();
    tickClock();
    setInterval(tickClock, 30000);

    if (els.taxRegime) els.taxRegime.addEventListener('change', showRegime);
    if (els.fySelect) els.fySelect.addEventListener('change', function () {
      renderHraRows();
      toast('Financial Year', 'FY ' + els.fySelect.value);
    });

    showRegime();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
