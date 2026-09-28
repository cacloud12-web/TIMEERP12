/**
 * TIME ERP — Form 12B (employer details, annexure, remarks)
 */
(function () {
  'use strict';

  var state = {
    step: 0,
    checkedIn: false,
    employers: 1,
    annexures: 1
  };

  var els = {
    stepper: document.getElementById('f12Stepper'),
    panels: [
      document.getElementById('f12Panel0'),
      document.getElementById('f12Panel1'),
      document.getElementById('f12Panel2')
    ],
    employerList: document.getElementById('f12EmployerList'),
    annexureList: document.getElementById('f12AnnexureList'),
    addEmployer: document.getElementById('f12AddEmployer'),
    addAnnexure: document.getElementById('f12AddAnnexure'),
    next0: document.getElementById('f12Next0'),
    prev1: document.getElementById('f12Prev1'),
    next1: document.getElementById('f12Next1'),
    prev2: document.getElementById('f12Prev2'),
    tempSave: document.getElementById('f12TempSave'),
    declarationUpload: document.getElementById('f12DeclarationUpload'),
    topCheckIn: document.getElementById('f12TopCheckInBtn'),
    topClock: document.getElementById('f12TopClock')
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
    var page = document.getElementById('f12Page');
    var declBack = document.getElementById('f12DeclBack');
    var header = document.querySelector('.f12-header');
    var fySelect = document.getElementById('f12FySelect');
    if (page) page.classList.add('f12-page--declaration');
    if (declBack) {
      declBack.hidden = false;
      declBack.href = 'employee_declaration.html?tab=' + encodeURIComponent(q.tab || 'approve12b');
    }
    if (header) header.hidden = true;
    if (fySelect && q.fy) fySelect.value = q.fy;
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

  function uploadSvg() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M12 16V7"/><path d="M8 11l4-4 4 4"/><path d="M5 19h14"/></svg>';
  }

  function trashSvg() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  }

  function calSvg() {
    return '<svg class="f12-date-range__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>';
  }

  function employerTemplate(index) {
    return (
      '<article class="f12-block f12-employer" data-employer="' + index + '">' +
        '<div class="f12-block__head">' +
          '<h3 class="f12-block__title">Previous Employer ' + index + '</h3>' +
          '<button type="button" class="f12-block__delete" data-remove-employer aria-label="Remove employer">' + trashSvg() + '</button>' +
        '</div>' +
        '<div class="f12-grid-2">' +
          '<div class="f12-field">' +
            '<label class="f12-field__label">1. Name of the employer(s)</label>' +
            '<input type="text" data-emp-name placeholder="">' +
          '</div>' +
          '<div class="f12-field">' +
            '<label class="f12-field__label">2. Address of the employer(s)</label>' +
            '<input type="text" data-emp-address placeholder="">' +
          '</div>' +
          '<div class="f12-field">' +
            '<label class="f12-field__label">3. TAN of the employer(s) as allotted by the ITO</label>' +
            '<input type="text" data-emp-tan placeholder="">' +
          '</div>' +
          '<div class="f12-field">' +
            '<label class="f12-field__label">4. Permanent Account Number Or Aadhaar Number of the employer(s)</label>' +
            '<input type="text" data-emp-pan placeholder="">' +
          '</div>' +
          '<div class="f12-field">' +
            '<label class="f12-field__label">5. Period Of Employment</label>' +
            '<div class="f12-date-range">' +
              '<input type="date" data-emp-start aria-label="Employment start date">' +
              '<span class="f12-date-range__arrow" aria-hidden="true">→</span>' +
              '<input type="date" data-emp-end aria-label="Employment end date">' +
              calSvg() +
            '</div>' +
            '<span class="f12-field__hint">In Current Financial Year</span>' +
          '</div>' +
          '<div class="f12-field">' +
            '<label class="f12-field__label">Proof Of Employment</label>' +
            '<label class="f12-upload">' +
              '<input type="file" data-emp-proof accept="image/*,.pdf,.doc,.docx" hidden>' +
              uploadSvg() +
              '<span class="f12-upload__label">Click to Upload</span>' +
            '</label>' +
          '</div>' +
        '</div>' +
        '<h4 class="f12-section-title">Particulars of salary as defined in section 17, paid or due to be paid to the employee during the year</h4>' +
        '<div class="f12-particulars">' +
          particularsRow('6.', 'Total amount of salary excluding amounts required to be shown in columns 7 and 8', 'data-col6') +
          particularsRow('7.', 'Total amount of house rent allowance, conveyance and allowances to the extent chargeable to tax[see section 10(13A) read with rule 2A and section 10(14)]', 'data-col7') +
          particularsRow('8.', 'Value of perquisites and amount of accretion to employee\'s provident fund account (give details in the annexure)', 'data-col8') +
          particularsRow('9.', 'Total of columns 6,7 and 8', 'data-col9', true) +
          '<div class="f12-particulars__proof">' +
            '<span class="f12-particulars__proof-label">Proof of columns 6,7 and 8</span>' +
            '<label class="f12-upload">' +
              '<input type="file" data-col678-proof accept="image/*,.pdf,.doc,.docx" hidden>' +
              uploadSvg() +
              '<span class="f12-upload__label">Click to Upload</span>' +
            '</label>' +
          '</div>' +
          particularsRow('10.', 'Amount deducted in respect of the insurance premium, provident fund contribution etc. to which sec 80c applies (Give details)', 'data-col10') +
          particularsRow('11.', 'Total amount of tax deducted during the year(enclose certificate issued under section 203)', 'data-col11') +
          '<div class="f12-particulars__row">' +
            '<span class="f12-particulars__label">12. Remarks</span>' +
            '<div class="f12-particulars__right">' +
              '<textarea rows="3" data-col12 class="f12-particulars__input" style="height:auto;min-height:72px"></textarea>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function particularsRow(numLabel, label, attr, readonly) {
    return (
      '<div class="f12-particulars__row">' +
        '<span class="f12-particulars__label">' + numLabel + ' ' + label + '</span>' +
        '<div class="f12-particulars__right">' +
          '<input type="text" class="f12-particulars__input' + (readonly ? ' is-readonly' : '') + '" ' + attr +
          (readonly ? ' readonly disabled' : '') + ' inputmode="decimal" placeholder="">' +
        '</div>' +
      '</div>'
    );
  }

  function annexureTemplate(index) {
    return (
      '<article class="f12-block f12-annexure" data-annexure="' + index + '">' +
        '<div class="f12-block__head">' +
          '<h3 class="f12-block__title">Annexure ' + index + '</h3>' +
          '<button type="button" class="f12-block__delete" data-remove-annexure aria-label="Remove annexure">' + trashSvg() + '</button>' +
        '</div>' +
        '<div class="f12-grid-2">' +
          '<div class="f12-field">' +
            '<label class="f12-field__label">1. Name Of Employer</label>' +
            '<input type="text" data-ann-name placeholder="">' +
          '</div>' +
          '<div class="f12-field">' +
            '<label class="f12-field__label">2. TAN/Permanent Account Number or Aadhaar Number of the employer</label>' +
            '<input type="text" data-ann-tan placeholder="">' +
          '</div>' +
        '</div>' +
        '<p class="f12-section-note">(Value of rent-free accommodation or value of any concession in rent for the accommodation provided by the employer (give basis of computation) [See rules 3(a) and 3(b)])</p>' +
        '<div class="f12-field" style="margin-bottom:12px;max-width:320px">' +
          '<label class="f12-field__label">Accommodation Type</label>' +
          '<select data-ann-acc-type>' +
            '<option value="">Select type</option>' +
            '<option value="unfurnished">Unfurnished</option>' +
            '<option value="furnished">Furnished</option>' +
            '<option value="none">None</option>' +
          '</select>' +
        '</div>' +
        '<div class="f12-acc-row">' +
          '<div class="f12-field">' +
            '<label class="f12-field__label">3. Where accommodation is unfurnished</label>' +
            '<input type="text" data-ann-unfurnished placeholder="">' +
          '</div>' +
          '<div class="f12-field">' +
            '<label class="f12-field__label">Where accommodation is furnished</label>' +
            '<input type="text" data-ann-furnished placeholder="">' +
          '</div>' +
        '</div>' +
        '<div class="f12-particulars">' +
          particularsRow('4.', 'Value as if accommodation is unfurnished', 'data-ann-col4') +
          particularsRow('5.', 'Cost of furniture (including television sets, radio sets, refrigerators, other household appliances and airconditioning plant or equipment) OR hire charges, if hired from a third party', 'data-ann-col5') +
          particularsRow('6.', 'Perquisite value of furniture (10% of column 5) OR actual hire charges payable', 'data-ann-col6') +
          particularsRow('7.', 'Total of columns 4 and 6', 'data-ann-col7', true) +
          particularsRow('8.', 'Rent, if any, paid by the employee', 'data-ann-col8') +
          particularsRow('9.', 'Value of perquisite (column 3 minus column 8 or column 7 minus column 8 as may be applicable)', 'data-ann-col9') +
          particularsRow('10.', 'Whether any conveyance has been provided by the employer free or at a concessional rate or where the employee is allowed the use of one or more motor cars owned or hired by the employer, estimated value of perquisite (give details) [See rule 3(c)]', 'data-ann-col10') +
          particularsRow('11.', 'Remuneration paid by employer for domestic and/or personal services provided to the employee (give details) [See rule 3(g)]', 'data-ann-col11') +
          particularsRow('12.', 'Value of free or concessional passages on home leave and other travelling to the extent chargeable to tax (give details) [See rule 2B read with section 10(5)(ii)]', 'data-ann-col12') +
          particularsRow('13.', 'Estimated value of any other benefit or amenity provided by the employer, free of cost or at concessional rate not included in the preceding columns (give details), e.g., supply of gas, electricity or water for household consumption, free educational facilities, transport for family, etc. [See rules 3(d), 3(e) and 3(f)]', 'data-ann-col13') +
          particularsRow('14.', 'Employer\'s contribution to recognised provident fund in excess of 10% of the employee\'s salary [See Schedule IV - Part A]', 'data-ann-col14') +
          particularsRow('15.', 'Interest credited to the assessee\'s account in recognised provident fund in excess of the rate fixed by the Central Government [See Schedule IV - Part A]', 'data-ann-col15') +
          particularsRow('16.', 'Total of columns 9 to 15 carried to column 8 of Form No. 12B', 'data-ann-col16', true) +
        '</div>' +
      '</article>'
    );
  }

  function renumberEmployers() {
    var cards = els.employerList.querySelectorAll('.f12-employer');
    state.employers = cards.length;
    cards.forEach(function (card, i) {
      var n = i + 1;
      card.setAttribute('data-employer', String(n));
      var title = card.querySelector('.f12-block__title');
      if (title) title.textContent = 'Previous Employer ' + n;
      var del = card.querySelector('[data-remove-employer]');
      if (del) del.hidden = cards.length <= 1;
    });
  }

  function renumberAnnexures() {
    var cards = els.annexureList.querySelectorAll('.f12-annexure');
    state.annexures = cards.length;
    cards.forEach(function (card, i) {
      var n = i + 1;
      card.setAttribute('data-annexure', String(n));
      var title = card.querySelector('.f12-block__title');
      if (title) title.textContent = 'Annexure ' + n;
      var del = card.querySelector('[data-remove-annexure]');
      if (del) del.hidden = cards.length <= 1;
    });
  }

  function addEmployer() {
    var n = els.employerList.querySelectorAll('.f12-employer').length + 1;
    var wrap = document.createElement('div');
    wrap.innerHTML = employerTemplate(n);
    var card = wrap.firstChild;
    els.employerList.appendChild(card);
    bindEmployerCard(card);
    renumberEmployers();
  }

  function addAnnexure(prefillName) {
    var n = els.annexureList.querySelectorAll('.f12-annexure').length + 1;
    var wrap = document.createElement('div');
    wrap.innerHTML = annexureTemplate(n);
    var card = wrap.firstChild;
    els.annexureList.appendChild(card);
    if (prefillName) {
      var nameInput = card.querySelector('[data-ann-name]');
      if (nameInput) nameInput.value = prefillName;
    }
    bindAnnexureCard(card);
    renumberAnnexures();
  }

  function bindUpload(input) {
    if (!input || input._f12Bound) return;
    input._f12Bound = true;
    input.addEventListener('change', function () {
      var label = input.closest('.f12-upload');
      var text = label && label.querySelector('.f12-upload__label');
      if (!text) return;
      text.textContent = (input.files && input.files[0]) ? input.files[0].name : 'Click to Upload';
    });
  }

  function calcEmployerTotals(card) {
    var c6 = num(card.querySelector('[data-col6]').value);
    var c7 = num(card.querySelector('[data-col7]').value);
    var c8 = num(card.querySelector('[data-col8]').value);
    var c9 = card.querySelector('[data-col9]');
    if (c9) c9.value = (c6 + c7 + c8) ? String(c6 + c7 + c8) : '';
  }

  function calcAnnexureTotals(card, opts) {
    opts = opts || {};
    var c4 = num((card.querySelector('[data-ann-col4]') || {}).value);
    var c5El = card.querySelector('[data-ann-col5]');
    var c6El = card.querySelector('[data-ann-col6]');
    var c5 = num((c5El || {}).value);
    if (opts.fromCol5 && c6El && c5El && c5El.value !== '') {
      c6El.value = String(Math.round(c5 * 0.1 * 100) / 100);
    }
    var c6 = num((c6El || {}).value);
    var c7El = card.querySelector('[data-ann-col7]');
    if (c7El) c7El.value = (c4 || c6) ? String(Math.round((c4 + c6) * 100) / 100) : '';
    var c7 = num((c7El || {}).value);
    var c8 = num((card.querySelector('[data-ann-col8]') || {}).value);
    var c9El = card.querySelector('[data-ann-col9]');
    if (opts.suggestCol9 && c9El) {
      var suggested = c7 - c8;
      if (c7 || c8) c9El.value = String(Math.round(suggested * 100) / 100);
    }
    var total = 0;
    [9, 10, 11, 12, 13, 14, 15].forEach(function (n) {
      var el = card.querySelector('[data-ann-col' + n + ']');
      total += num((el || {}).value);
    });
    var c16 = card.querySelector('[data-ann-col16]');
    if (c16) c16.value = total ? String(Math.round(total * 100) / 100) : '';
  }

  function bindEmployerCard(card) {
    card.querySelectorAll('input[type="file"]').forEach(bindUpload);
    ['data-col6', 'data-col7', 'data-col8'].forEach(function (sel) {
      var input = card.querySelector('[' + sel + ']');
      if (input) input.addEventListener('input', function () { calcEmployerTotals(card); });
    });
    var del = card.querySelector('[data-remove-employer]');
    if (del) {
      del.addEventListener('click', function () {
        if (els.employerList.querySelectorAll('.f12-employer').length <= 1) return;
        card.remove();
        renumberEmployers();
      });
    }
  }

  function bindAnnexureCard(card) {
    card.querySelectorAll('input[type="file"]').forEach(bindUpload);
    var c4 = card.querySelector('[data-ann-col4]');
    var c5 = card.querySelector('[data-ann-col5]');
    var c6 = card.querySelector('[data-ann-col6]');
    var c8 = card.querySelector('[data-ann-col8]');
    var c9 = card.querySelector('[data-ann-col9]');
    if (c4) c4.addEventListener('input', function () { calcAnnexureTotals(card, { suggestCol9: true }); });
    if (c5) c5.addEventListener('input', function () { calcAnnexureTotals(card, { fromCol5: true, suggestCol9: true }); });
    if (c6) c6.addEventListener('input', function () { calcAnnexureTotals(card, { suggestCol9: true }); });
    if (c8) c8.addEventListener('input', function () { calcAnnexureTotals(card, { suggestCol9: true }); });
    if (c9) c9.addEventListener('input', function () { calcAnnexureTotals(card); });
    [10, 11, 12, 13, 14, 15].forEach(function (n) {
      var el = card.querySelector('[data-ann-col' + n + ']');
      if (el) el.addEventListener('input', function () { calcAnnexureTotals(card); });
    });
    var del = card.querySelector('[data-remove-annexure]');
    if (del) {
      del.addEventListener('click', function () {
        if (els.annexureList.querySelectorAll('.f12-annexure').length <= 1) return;
        card.remove();
        renumberAnnexures();
      });
    }
  }

  function setStep(step) {
    if (step < 0 || step > 2) return;
    state.step = step;
    els.panels.forEach(function (panel, i) {
      if (!panel) return;
      var active = i === step;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
    if (els.stepper) {
      els.stepper.querySelectorAll('.f12-stepper__item').forEach(function (item) {
        var s = parseInt(item.getAttribute('data-step'), 10);
        item.classList.toggle('is-active', s === step);
        item.classList.toggle('is-done', s < step);
      });
    }
    if (step === 1) syncFirstAnnexureName();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function syncFirstAnnexureName() {
    var empName = els.employerList.querySelector('[data-emp-name]');
    var annName = els.annexureList.querySelector('[data-ann-name]');
    if (empName && annName && !annName.value && empName.value) annName.value = empName.value;
  }

  function firstEmployerName() {
    var input = els.employerList.querySelector('[data-emp-name]');
    return input ? input.value.trim() : '';
  }

  function updateCheckInBtn() {
    if (!els.topCheckIn) return;
    if (state.checkedIn) {
      els.topCheckIn.textContent = 'Check Out';
      els.topCheckIn.classList.remove('is-in');
    } else {
      els.topCheckIn.textContent = 'Check In';
      els.topCheckIn.classList.add('is-in');
    }
  }

  function toggleCheckIn() {
    if (state.checkedIn) {
      state.checkedIn = false;
      toast('Checked out', 'You have checked out successfully.');
    } else {
      state.checkedIn = true;
      toast('Checked in', 'You have checked in successfully.');
    }
    updateCheckInBtn();
  }

  function tickClock() {
    if (!els.topClock) return;
    var now = new Date();
    els.topClock.textContent = formatClock(now);
    els.topClock.setAttribute('datetime', now.toISOString());
  }

  function bind() {
    if (els.addEmployer) els.addEmployer.addEventListener('click', addEmployer);
    if (els.addAnnexure) {
      els.addAnnexure.addEventListener('click', function () { addAnnexure(firstEmployerName()); });
    }
    if (els.next0) els.next0.addEventListener('click', function () { setStep(1); });
    if (els.prev1) els.prev1.addEventListener('click', function () { setStep(0); });
    if (els.next1) els.next1.addEventListener('click', function () { setStep(2); });
    if (els.prev2) els.prev2.addEventListener('click', function () { setStep(1); });
    if (els.tempSave) {
      els.tempSave.addEventListener('click', function () { toast('Saved temporarily'); });
    }
    if (els.declarationUpload) bindUpload(els.declarationUpload);

    if (els.stepper) {
      els.stepper.querySelectorAll('.f12-stepper__item').forEach(function (item) {
        item.addEventListener('click', function () {
          var s = parseInt(item.getAttribute('data-step'), 10);
          if (!isNaN(s) && s <= state.step) setStep(s);
        });
      });
    }

    if (els.topCheckIn) els.topCheckIn.addEventListener('click', toggleCheckIn);
  }

  function init() {
    var q = getQuery();
    var fromDecl = q.from === 'declaration';
    if (fromDecl) applyDeclarationContext(q);
    addEmployer();
    if (fromDecl) addEmployer();
    addAnnexure();
    bind();
    setStep(0);
    updateCheckInBtn();
    tickClock();
    setInterval(tickClock, 30000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
