(function () {
 'use strict';

 function sanitizeText(value, maxLen) {
 if (typeof value !== 'string') return '';
 return value.replace(/[\0\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim().slice(0, maxLen);
 }

 function hasScriptPattern(value) {
 return /<script|javascript:|on\w+\s*=|data:text\/html/i.test(value);
 }

 function setError(id, msg) {
 var el = document.getElementById(id);
 if (el) el.textContent = msg || '';
 }

 var NAME_RE = /^[A-Za-z\s.'-]{2,80}$/;
 var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

 var LEAD_COPY = {
 realestate: 'Talk to us about property portfolio tracking, lease and tenant management, project-wise costing, and financial visibility across your real estate business.',
 construction: 'Get guidance on job costing, site inventory, subcontractor billing, and project timelines, built for contractors and builders managing multiple sites.',
 msme: 'See how growing MSME manufacturers unify inventory, production, GST compliance, and dispatch in one ERP your team will actually use every day.',
 ca: 'See how CA firms manage client work, compliance calendars, GST filings, and practice billing in one secure platform built for professional practices.'
 };

 var HIGHLIGHT_COPY = {
 realestate: [
 'Get a callback on WhatsApp with answers for your property portfolio.',
 'Live demo: leases, tenant billing & project-wise P&L in TimeERP.',
 'See how real estate firms your size cut reporting time by 40%.'
 ],
 construction: [
 'WhatsApp follow-up with site costing and inventory experts.',
 'Live demo: job cards, BOQ, and subcontractor billing on one screen.',
 'Learn how builders track multi-site progress without spreadsheets.'
 ],
 msme: [
 'Quick WhatsApp response from our MSME manufacturing specialists.',
 'Live demo: GST, inventory, production & dispatch in one flow.',
 'See ROI examples from MSME plants with 1 to 2 production lines.'
 ],
 ca: [
 'WhatsApp follow-up with specialists who understand CA practice needs.',
 'Live demo: client files, compliance deadlines & practice billing.',
 'See how CA firms your size replace spreadsheet-heavy workflows.'
 ]
 };

 function checkName(input, showErrors) {
 var val = sanitizeText(input.value, 80);
 var wrap = input.closest('.form-field');
 var ok = val.length >= 2 && NAME_RE.test(val) && !hasScriptPattern(val);
 if (showErrors) {
 input.classList.remove('valid', 'invalid');
 if (wrap) wrap.classList.remove('is-valid');
 setError('errName', '');
 if (!val) return false;
 if (!ok) {
 input.classList.add('invalid');
 setError('errName', 'Enter a valid name (letters only, 2 to 80 chars).');
 return false;
 }
 input.value = val;
 input.classList.add('valid');
 if (wrap) wrap.classList.add('is-valid');
 }
 return ok;
 }

 function checkEmail(input, showErrors) {
 var val = sanitizeText(input.value, 120);
 var wrap = input.closest('.form-field');
 var ok = EMAIL_RE.test(val) && !hasScriptPattern(val);
 if (showErrors) {
 input.classList.remove('valid', 'invalid');
 if (wrap) wrap.classList.remove('is-valid');
 setError('errEmail', '');
 if (!val) return false;
 if (!ok) {
 input.classList.add('invalid');
 setError('errEmail', 'Enter a valid work email.');
 return false;
 }
 input.value = val;
 input.classList.add('valid');
 if (wrap) wrap.classList.add('is-valid');
 }
 return ok && val.length > 0;
 }

 function checkWhatsApp(input, showErrors) {
 var raw = sanitizeText(input.value, 20);
 var wrap = input.closest('.form-field');
 var digits = raw.replace(/\D/g, '');
 var ok = digits.length >= 10 && digits.length <= 15 && !hasScriptPattern(raw);
 if (showErrors) {
 input.classList.remove('valid', 'invalid');
 if (wrap) wrap.classList.remove('is-valid');
 setError('errWhatsapp', '');
 if (!raw) return false;
 if (!ok) {
 input.classList.add('invalid');
 setError('errWhatsapp', 'Enter a valid WhatsApp number (10 to 15 digits).');
 return false;
 }
 input.value = raw;
 input.classList.add('valid');
 if (wrap) wrap.classList.add('is-valid');
 }
 return ok && raw.length > 0;
 }

 var nameInput = document.getElementById('fullName');
 var emailInput = document.getElementById('email');
 var whatsappInput = document.getElementById('whatsapp');
 var submitBtn = document.getElementById('submitBtn');
 var firmSizeInput = document.getElementById('firmSize');
 var firmPills = document.getElementById('firmPills');
 var formLead = document.getElementById('formLead');
 var industryTabs = document.getElementById('industryTabs');
 var benefitsList = document.getElementById('csBenefits');
 var highlightsWrap = document.getElementById('csHighlights');
 var currentIndustry = 'realestate';

 function updateHighlightTexts(industry) {
 var copy = HIGHLIGHT_COPY[industry] || HIGHLIGHT_COPY.realestate;
 copy.forEach(function (text, i) {
 var el = document.getElementById('highlightText' + i);
 if (!el) return;
 el.classList.add('is-updating');
 setTimeout(function () {
 el.textContent = text;
 el.classList.remove('is-updating');
 }, 100 + i * 40);
 });
 }

 function updateSubmitState() {
 var count = 0;
 if (nameInput && checkName(nameInput, false)) count++;
 if (emailInput && checkEmail(emailInput, false)) count++;
 if (whatsappInput && checkWhatsApp(whatsappInput, false)) count++;
 if (submitBtn) submitBtn.disabled = count < 3;
 }

 function setIndustry(industry) {
 currentIndustry = industry;
 if (industryTabs) {
 industryTabs.querySelectorAll('.cs-industry__btn').forEach(function (btn) {
 var active = btn.getAttribute('data-industry') === industry;
 btn.classList.toggle('is-active', active);
 btn.setAttribute('aria-selected', active ? 'true' : 'false');
 });
 }
 if (benefitsList) {
 benefitsList.querySelectorAll('li').forEach(function (li) {
 var sectors = (li.getAttribute('data-for') || '').split(' ');
 var show = sectors.indexOf(industry) !== -1;
 li.style.display = show ? '' : 'none';
 li.classList.toggle('is-highlight', sectors.indexOf(industry) !== -1 && sectors.length === 1);
 });
 }
 if (formLead && LEAD_COPY[industry]) {
 formLead.classList.add('is-updating');
 setTimeout(function () {
 formLead.textContent = LEAD_COPY[industry];
 formLead.classList.remove('is-updating');
 }, 120);
 }
 updateHighlightTexts(industry);
 }

 if (highlightsWrap) {
 highlightsWrap.querySelectorAll('.cs-highlight').forEach(function (card) {
 card.addEventListener('click', function () {
 highlightsWrap.querySelectorAll('.cs-highlight').forEach(function (c) { c.classList.remove('is-active'); });
 card.classList.add('is-active');
 });
 });
 }

 if (industryTabs) {
 industryTabs.querySelectorAll('.cs-industry__btn').forEach(function (btn) {
 btn.addEventListener('click', function () {
 setIndustry(btn.getAttribute('data-industry') || 'realestate');
 });
 });
 }

 function bindLiveValidation(input, checkFn) {
 if (!input) return;
 input.addEventListener('input', function () {
 checkFn(input, false);
 updateSubmitState();
 });
 input.addEventListener('blur', function () {
 if (input.value.trim()) checkFn(input, true);
 updateSubmitState();
 });
 input.addEventListener('focus', function () {
 input.closest('.form-field').classList.add('is-focused');
 });
 input.addEventListener('blur', function () {
 input.closest('.form-field').classList.remove('is-focused');
 });
 }

 bindLiveValidation(nameInput, checkName);
 bindLiveValidation(emailInput, checkEmail);
 bindLiveValidation(whatsappInput, checkWhatsApp);

 if (firmPills) {
 firmPills.querySelectorAll('.firm-pill').forEach(function (pill) {
 pill.addEventListener('click', function () {
 var val = pill.getAttribute('data-value');
 var isSelected = pill.classList.contains('is-selected');
 firmPills.querySelectorAll('.firm-pill').forEach(function (p) { p.classList.remove('is-selected'); });
 if (isSelected) {
 if (firmSizeInput) firmSizeInput.value = '';
 } else {
 pill.classList.add('is-selected');
 if (firmSizeInput) firmSizeInput.value = val;
 }
 });
 });
 }

 var formStarted = document.getElementById('formStarted');
 if (formStarted) formStarted.value = String(Date.now());

 var lastSubmit = 0;
 var COOLDOWN = 8000;
 var form = document.getElementById('contactSalesForm');
 if (!form) return;

 form.addEventListener('submit', function (e) {
 e.preventDefault();

 var now = Date.now();
 if (now - lastSubmit < COOLDOWN) {
 setError('errForm', 'Please wait a moment before submitting again.');
 return;
 }

 var honeypot = form.querySelector('.form-honeypot');
 if (honeypot && honeypot.value) return;

 var started = formStarted ? parseInt(formStarted.value, 10) : 0;
 if (started && now - started < 2000) {
 setError('errForm', 'Form submitted too quickly.');
 return;
 }

 setError('errForm', '');

 var okName = checkName(nameInput, true);
 var okEmail = checkEmail(emailInput, true);
 var okWa = checkWhatsApp(whatsappInput, true);
 updateSubmitState();

 if (!okName || !okEmail || !okWa) return;

 lastSubmit = now;
 form.classList.add('is-hidden');
 var success = document.getElementById('formSuccess');
 if (success) success.classList.add('is-visible');
 });

 setIndustry('realestate');
 updateSubmitState();
})();
