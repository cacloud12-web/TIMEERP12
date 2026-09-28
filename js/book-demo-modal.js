/**
 * Shared Book Demo modal — same form on every page via [data-book-demo].
 * Source of truth: this file injects/upgrades markup (versioned).
 */
(function () {
  'use strict';

  if (window.__TIMEERP_BOOK_DEMO_READY) return;
  window.__TIMEERP_BOOK_DEMO_READY = true;

  var BD_VERSION = '11';
  var DEMO_PATH = '/demo';
  var TIME_SLOTS = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM'
  ];
  var CSS_HREF = (function resolveCssHref() {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].getAttribute('src') || '';
      if (src.indexOf('book-demo-modal.js') !== -1) {
        return src.replace(/[^/]*book-demo-modal.js(?:\?.*)?$/i, '').replace(/js\/?$/, '') + 'css/book-demo-modal.css?v=21';
      }
    }
    var path = (window.location.pathname || '').replace(/\\/g, '/');
    var segs = path.split('/').filter(Boolean);
    if (segs.length && /\.[a-z0-9]+$/i.test(segs[segs.length - 1])) segs.pop();
    if (segs.length === 1 && segs[0].toLowerCase() === 'demo') segs = [];
    var prefix = segs.length ? segs.map(function () { return '..'; }).join('/') + '/' : '';
    return prefix + 'css/book-demo-modal.css?v=21';
  })();
  var PAGE_PREFIX = (function () {
    var path = (window.location.pathname || '').replace(/\\/g, '/');
    var segs = path.split('/').filter(Boolean);
    if (segs.length && /\.[a-z0-9]+$/i.test(segs[segs.length - 1])) segs.pop();
    if (segs.length === 1 && segs[0].toLowerCase() === 'demo') segs = [];
    return segs.length ? segs.map(function () { return '..'; }).join('/') + '/' : '';
  })();
  var PRIVACY_HREF = PAGE_PREFIX + 'privacy.html';
  var API_URL = (function () {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].getAttribute('src') || '';
      if (src.indexOf('book-demo-modal.js') !== -1) {
        return src.replace(/[^/]*book-demo-modal.js(?:\?.*)?$/i, '').replace(/js\/?$/, '') + 'api/book-demo.php';
      }
    }
    return PAGE_PREFIX + 'api/book-demo.php';
  })();

  var modal, form, submitBtn, successEls, fields;
  var lastFocused = null;
  var closeTimer = null;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var MOBILE_RE = /^[6-9]\d{9}$/;
  var globalBound = false;
  var previousUrl = null;
  var ignoreNextPop = false;

  function normalizePathname(pathname) {
    var p = String(pathname || '/').replace(/\\/g, '/').replace(/\/+$/, '');
    return p || '/';
  }

  function isDemoPath(pathname) {
    return normalizePathname(pathname || window.location.pathname).toLowerCase() === DEMO_PATH;
  }

  function syncDemoUrlOnOpen() {
    if (isDemoPath()) return;
    previousUrl = window.location.pathname + window.location.search + window.location.hash;
    try {
      history.pushState({ bookDemo: true }, '', DEMO_PATH);
    } catch (err) {}
  }

  function syncDemoUrlOnClose() {
    if (!isDemoPath()) {
      previousUrl = null;
      return;
    }
    if (previousUrl != null && window.history.state && window.history.state.bookDemo) {
      previousUrl = null;
      ignoreNextPop = true;
      try {
        history.back();
        return;
      } catch (err) {}
    }
    previousUrl = null;
    try {
      history.replaceState({ bookDemo: false }, '', '/');
    } catch (err) {}
  }

  function digitsOnly(value) {
    return String(value == null ? '' : value).replace(/\D/g, '');
  }

  function normalizeMobile(value) {
    var digits = digitsOnly(value);
    if (digits.length >= 12 && digits.indexOf('91') === 0) return digits.slice(2, 12);
    if (digits.length === 11 && digits.charAt(0) === '0') return digits.slice(1);
    if (digits.length > 10) return digits.slice(0, 10);
    return digits;
  }

  function isValidMobile(value) {
    return MOBILE_RE.test(normalizeMobile(value));
  }

  function todayISO() {
    var d = new Date();
    var m = String(d.getMonth() + 1);
    var day = String(d.getDate());
    if (m.length < 2) m = '0' + m;
    if (day.length < 2) day = '0' + day;
    return d.getFullYear() + '-' + m + '-' + day;
  }

  function setDateMin() {
    var input = document.getElementById('bookDemoDate');
    if (input) input.setAttribute('min', todayISO());
  }

  function timeSlotsHtml() {
    var html = '<option value="">Select time slot</option>';
    var i;
    for (i = 0; i < TIME_SLOTS.length; i++) {
      html += '<option value="' + TIME_SLOTS[i] + '">' + TIME_SLOTS[i] + '</option>';
    }
    return html;
  }

  function isValidTimeSlot(value) {
    return TIME_SLOTS.indexOf(String(value || '').trim()) !== -1;
  }

  function modalHtml() {
    return ''
      + '<div class="book-demo-modal" id="bookDemoModal" data-bd-version="' + BD_VERSION + '" role="dialog" aria-modal="true" aria-labelledby="bookDemoModalTitle" aria-hidden="true">'
      +   '<div class="book-demo-modal__overlay" data-book-demo-close tabindex="-1"></div>'
      +   '<div class="book-demo-modal__dialog" role="document">'
      +     '<button type="button" class="book-demo-modal__close" data-book-demo-close aria-label="Close demo booking modal">×</button>'
      +     '<div class="book-demo-modal__grid">'
      +       '<div class="book-demo-modal__left">'
      +         '<h2 id="bookDemoModalTitle">Book a Personalized Demo</h2>'
      +         '<p>Discover how TimeERP helps businesses streamline HR, Payroll, CRM, Projects, Finance, Attendance, Compliance, and Operations from one unified platform.</p>'
      +         '<ul class="book-demo-modal__features">'
      +           '<li>Personalized Product Walkthrough</li>'
      +           '<li>Industry-Specific Demo</li>'
      +           '<li>Live Q&amp;A Session</li>'
      +           '<li>Implementation Guidance</li>'
      +           '<li>Pricing Consultation</li>'
      +         '</ul>'
      +       '</div>'
      +       '<div class="book-demo-modal__right">'
      +         '<p class="book-demo-modal__form-title">Request a Demo</p>'
      +         '<form class="book-demo-modal__form" id="bookDemoForm" novalidate>'
      +           '<div class="book-demo-modal__form-grid">'
      +             '<div class="book-demo-field" data-field="fullName">'
      +               '<label for="bookDemoFullName">Full Name <span aria-hidden="true">*</span></label>'
      +               '<input type="text" id="bookDemoFullName" name="fullName" autocomplete="name" required aria-required="true">'
      +               '<span class="book-demo-field__error" id="bookDemoErrFullName" role="alert"></span>'
      +             '</div>'
      +             '<div class="book-demo-field" data-field="companyName">'
      +               '<label for="bookDemoCompanyName">Company Name</label>'
      +               '<input type="text" id="bookDemoCompanyName" name="companyName" autocomplete="organization">'
      +               '<span class="book-demo-field__error" id="bookDemoErrCompanyName" role="alert"></span>'
      +             '</div>'
      +             '<div class="book-demo-field" data-field="email">'
      +               '<label for="bookDemoEmail">Email</label>'
      +               '<input type="email" id="bookDemoEmail" name="email" autocomplete="email">'
      +               '<span class="book-demo-field__error" id="bookDemoErrEmail" role="alert"></span>'
      +             '</div>'
      +             '<div class="book-demo-field" data-field="phone">'
      +               '<label for="bookDemoPhone">Mobile Number <span aria-hidden="true">*</span></label>'
      +               '<input type="tel" id="bookDemoPhone" name="phone" inputmode="numeric" autocomplete="tel" required aria-required="true" maxlength="12" placeholder="e.g. 9876543210">'
      +               '<span class="book-demo-field__error" id="bookDemoErrPhone" role="alert"></span>'
      +             '</div>'
      +             '<div class="book-demo-field" data-field="industry">'
      +               '<label for="bookDemoIndustry">Industry</label>'
      +               '<select id="bookDemoIndustry" name="industry">'
      +                 '<option value="">Select industry</option>'
      +                 '<option>Chartered Accountant</option>'
      +                 '<option>Construction</option>'
      +                 '<option>Real Estate</option>'
      +                 '<option>Property Dealer</option>'
      +                 '<option>Manufacturing</option>'
      +                 '<option>MSME</option>'
      +                 '<option>Retail</option>'
      +                 '<option>Healthcare</option>'
      +                 '<option>Education</option>'
      +                 '<option>IT Services</option>'
      +                 '<option>Other</option>'
      +               '</select>'
      +               '<span class="book-demo-field__error" id="bookDemoErrIndustry" role="alert"></span>'
      +             '</div>'
      +             '<div class="book-demo-field" data-field="companySize">'
      +               '<label for="bookDemoCompanySize">Company Size</label>'
      +               '<select id="bookDemoCompanySize" name="companySize">'
      +                 '<option value="">Select company size</option>'
      +                 '<option>1–10</option>'
      +                 '<option>11–25</option>'
      +                 '<option>26–50</option>'
      +                 '<option>51–100</option>'
      +                 '<option>101–250</option>'
      +                 '<option>250+</option>'
      +               '</select>'
      +               '<span class="book-demo-field__error" id="bookDemoErrCompanySize" role="alert"></span>'
      +             '</div>'
      +             '<div class="book-demo-field" data-field="demoDate">'
      +               '<label for="bookDemoDate">Date <span aria-hidden="true">*</span></label>'
      +               '<input type="date" id="bookDemoDate" name="demoDate" required aria-required="true">'
      +               '<span class="book-demo-field__error" id="bookDemoErrDate" role="alert"></span>'
      +             '</div>'
      +             '<div class="book-demo-field" data-field="demoTime">'
      +               '<label for="bookDemoTime">Time <span aria-hidden="true">*</span></label>'
      +               '<select id="bookDemoTime" name="demoTime" required aria-required="true">'
      +                 timeSlotsHtml()
      +               '</select>'
      +               '<span class="book-demo-field__error" id="bookDemoErrTime" role="alert"></span>'
      +             '</div>'
      +             '<div class="book-demo-field book-demo-field--full" data-field="remarks">'
      +               '<label for="bookDemoRemarks">Remarks</label>'
      +               '<input type="text" id="bookDemoRemarks" name="remarks" maxlength="500" placeholder="Any notes or requirements (optional)">'
      +               '<span class="book-demo-field__error" id="bookDemoErrRemarks" role="alert"></span>'
      +             '</div>'
      +             '<input type="text" name="website" id="bookDemoHp" value="" tabindex="-1" autocomplete="off" aria-hidden="true" class="book-demo-hp">'
      +           '</div>'
      +           '<p class="book-demo-modal__form-error" id="bookDemoFormError" role="alert" hidden></p>'
      +           '<div class="book-demo-modal__submit-wrap">'
      +             '<button type="submit" class="btn btn--primary book-demo-modal__submit" id="bookDemoSubmit">'
      +               '<span class="book-demo-modal__submit-text">Book Demo</span>'
      +               '<span class="book-demo-modal__spinner" aria-hidden="true"></span>'
      +             '</button>'
      +             '<p class="book-demo-modal__privacy">By clicking Book Demo, you agree to our <a href="' + PRIVACY_HREF + '">Privacy Policy</a></p>'
      +           '</div>'
      +         '</form>'
      +       '</div>'
      +     '</div>'
      +   '</div>'
      + '</div>'
      + '<div class="book-demo-success" id="bookDemoSuccess" hidden>'
      +   '<div class="book-demo-success__backdrop" data-book-demo-success-close></div>'
      +   '<div class="book-demo-success__panel" role="alertdialog" aria-modal="true" aria-labelledby="bookDemoSuccessTitle" aria-describedby="bookDemoSuccessMsg">'
      +     '<div class="book-demo-success__icon" aria-hidden="true">✓</div>'
      +     '<h3 id="bookDemoSuccessTitle">Demo Booked Successfully!</h3>'
      +     '<p id="bookDemoSuccessMsg">Thank you for your interest in TimeERP. Our team will contact you shortly to schedule your personalized demo.</p>'
      +     '<button type="button" class="book-demo-success__btn" id="bookDemoSuccessOk" data-book-demo-success-close>OK</button>'
      +   '</div>'
      + '</div>';
  }

  function isCurrentForm() {
    var m = document.getElementById('bookDemoModal');
    if (!m || m.getAttribute('data-bd-version') !== BD_VERSION) return false;
    if (document.getElementById('bookDemoCaptcha') || document.querySelector('.book-demo-captcha')) return false;
    if (!document.getElementById('bookDemoDate') || !document.getElementById('bookDemoTime') || !document.getElementById('bookDemoRemarks')) return false;
    var timeEl = document.getElementById('bookDemoTime');
    if (!timeEl || timeEl.tagName !== 'SELECT' || timeEl.options.length < 10) return false;
    var remarks = document.getElementById('bookDemoRemarks');
    if (!remarks || !remarks.closest('.book-demo-field--full')) return false;
    if (!document.getElementById('bookDemoSuccess')) return false;
    if (document.getElementById('bookDemoRequirements') || document.getElementById('bookDemoHearAbout')) return false;
    var emailLabel = document.querySelector('label[for="bookDemoEmail"]');
    if (!emailLabel || emailLabel.textContent.replace(/\s+/g, ' ').trim().toLowerCase() !== 'email') return false;
    var phoneLabel = document.querySelector('label[for="bookDemoPhone"]');
    if (!phoneLabel || phoneLabel.textContent.toLowerCase().indexOf('mobile') === -1) return false;
    var companyLabel = document.querySelector('label[for="bookDemoCompanyName"]');
    if (companyLabel && companyLabel.querySelector('span')) return false;
    return true;
  }

  function ensureCss() {
    var existing = document.querySelector('link[data-book-demo-css]');
    if (existing) {
      if ((existing.getAttribute('href') || '').indexOf('v=21') === -1) existing.setAttribute('href', CSS_HREF);
      return;
    }
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSS_HREF;
    link.setAttribute('data-book-demo-css', '1');
    document.head.appendChild(link);
  }

  function injectNodes(html) {
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
  }

  /* Upgrade / inject form only when outdated — never while user is filling fields */
  function ensureModal(force) {
    if (!force && isCurrentForm()) {
      cacheEls();
      return;
    }
    var oldM = document.getElementById('bookDemoModal');
    if (oldM) oldM.remove();
    var oldT = document.getElementById('bookDemoToast');
    if (oldT) oldT.remove();
    var oldS = document.getElementById('bookDemoSuccess');
    if (oldS) oldS.remove();
    injectNodes(modalHtml());
    cacheEls();
    bindFieldEvents();
    bindSubmitControls();
  }

  function setFieldError(key, message) {
    var field = fields[key];
    if (!field) return;
    var wrap = field.input && field.input.closest('.book-demo-field');
    if (field.error) field.error.textContent = message || '';
    if (wrap) wrap.classList.toggle('is-error', !!message);
  }

  function cacheEls() {
    modal = document.getElementById('bookDemoModal');
    form = document.getElementById('bookDemoForm');
    submitBtn = document.getElementById('bookDemoSubmit');
    successEls = document.getElementById('bookDemoSuccess');
    fields = {
      fullName: {
        input: document.getElementById('bookDemoFullName'),
        error: document.getElementById('bookDemoErrFullName'),
        validate: function (value) {
          if (!value.trim()) return 'Full name is required.';
          if (value.trim().length < 2) return 'Enter at least 2 characters.';
          return '';
        }
      },
      companyName: {
        input: document.getElementById('bookDemoCompanyName'),
        error: document.getElementById('bookDemoErrCompanyName'),
        validate: function () { return ''; }
      },
      email: {
        input: document.getElementById('bookDemoEmail'),
        error: document.getElementById('bookDemoErrEmail'),
        validate: function (value) {
          var v = value.trim();
          if (!v) return '';
          if (!EMAIL_RE.test(v)) return 'Enter a valid email address.';
          return '';
        }
      },
      phone: {
        input: document.getElementById('bookDemoPhone'),
        error: document.getElementById('bookDemoErrPhone'),
        validate: function (value) {
          var digits = digitsOnly(value);
          if (!digits) return 'Mobile number is required.';
          var mobile = normalizeMobile(value);
          if (digits.length < 10) return 'Enter all 10 digits of your mobile number.';
          if (!isValidMobile(mobile)) return 'Enter a valid 10-digit mobile number (starts with 6–9).';
          return '';
        }
      },
      industry: {
        input: document.getElementById('bookDemoIndustry'),
        error: document.getElementById('bookDemoErrIndustry'),
        validate: function () { return ''; }
      },
      companySize: {
        input: document.getElementById('bookDemoCompanySize'),
        error: document.getElementById('bookDemoErrCompanySize'),
        validate: function () { return ''; }
      },
      demoDate: {
        input: document.getElementById('bookDemoDate'),
        error: document.getElementById('bookDemoErrDate'),
        validate: function (value) {
          var v = String(value || '').trim();
          if (!v) return 'Please select a demo date.';
          if (v < todayISO()) return 'Demo date cannot be in the past.';
          return '';
        }
      },
      demoTime: {
        input: document.getElementById('bookDemoTime'),
        error: document.getElementById('bookDemoErrTime'),
        validate: function (value) {
          var v = String(value || '').trim();
          if (!v) return 'Please select a demo time.';
          if (!isValidTimeSlot(v)) return 'Please select a valid time slot.';
          return '';
        }
      },
      remarks: {
        input: document.getElementById('bookDemoRemarks'),
        error: document.getElementById('bookDemoErrRemarks'),
        validate: function () { return ''; }
      }
    };
  }

  function getFocusable() {
    if (!modal) return [];
    return Array.prototype.slice.call(
      modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return !el.disabled && el.offsetParent !== null; });
  }

  function trapFocus(e) {
    if (successEls && !successEls.hidden) return;
    if (!modal || !modal.classList.contains('is-open') || e.key !== 'Tab') return;
    var focusable = getFocusable();
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function validateField(key, showError) {
    var field = fields[key];
    if (!field || !field.input) return true;
    var message = field.validate(field.input.value);
    if (showError) setFieldError(key, message);
    else if (!message) setFieldError(key, '');
    return !message;
  }

  function validateForm(showErrors) {
    var valid = true;
    Object.keys(fields).forEach(function (key) {
      if (!validateField(key, showErrors)) valid = false;
    });
    return valid;
  }

  function resetForm() {
    if (!form) return;
    form.reset();
    Object.keys(fields).forEach(function (key) {
      if (fields[key] && fields[key].input) fields[key].input.dataset.touched = '';
      setFieldError(key, '');
    });
    if (submitBtn) submitBtn.classList.remove('is-loading');
  }

  function showSuccessPopup() {
    ensureCss();
    var panel = document.getElementById('bookDemoSuccess');
    if (!panel) {
      injectNodes(
        '<div class="book-demo-success" id="bookDemoSuccess" hidden>'
        + '<div class="book-demo-success__backdrop" data-book-demo-success-close></div>'
        + '<div class="book-demo-success__panel" role="alertdialog" aria-modal="true" aria-labelledby="bookDemoSuccessTitle">'
        + '<div class="book-demo-success__icon" aria-hidden="true">✓</div>'
        + '<h3 id="bookDemoSuccessTitle">Demo Booked Successfully!</h3>'
        + '<p>Thank you for your interest in TimeERP. Our team will contact you shortly to schedule your personalized demo.</p>'
        + '<button type="button" class="book-demo-success__btn" id="bookDemoSuccessOk" data-book-demo-success-close>OK</button>'
        + '</div></div>'
      );
      panel = document.getElementById('bookDemoSuccess');
    }
    successEls = panel;
    if (!panel) return;
    panel.hidden = false;
    panel.removeAttribute('hidden');
    panel.style.display = 'grid';
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var ok = document.getElementById('bookDemoSuccessOk');
    if (ok) setTimeout(function () { try { ok.focus(); } catch (err) {} }, 30);
  }

  function closeSuccessPopup() {
    var panel = document.getElementById('bookDemoSuccess');
    successEls = panel;
    if (!panel) return;
    panel.hidden = true;
    panel.setAttribute('hidden', '');
    panel.style.display = '';
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      try { lastFocused.focus(); } catch (err) {}
    }
  }

  function openModal(opts) {
    opts = opts || {};
    ensureCss();
    ensureModal(false);
    if (!modal) ensureModal(true);
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.remove('is-closing');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (!opts.skipUrl) syncDemoUrlOnOpen();
    bindFieldEvents();
    bindSubmitControls();
    setDateMin();
    setFormError('');
    var firstInput = document.getElementById('bookDemoFullName');
    if (firstInput) setTimeout(function () { firstInput.focus(); }, 40);
  }

  function closeModal(skipReset, opts) {
    opts = opts || {};
    modal = document.getElementById('bookDemoModal');
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.add('is-closing');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!opts.skipUrl) syncDemoUrlOnClose();
    var successOpen = document.getElementById('bookDemoSuccess') && !document.getElementById('bookDemoSuccess').hidden;
    if (!successOpen) document.body.style.overflow = '';
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      if (modal) modal.classList.remove('is-closing');
      if (!skipReset) {
        cacheEls();
        resetForm();
      }
    }, 200);
  }

  function setFormError(message) {
    var el = document.getElementById('bookDemoFormError');
    if (!el) return;
    if (message) {
      el.hidden = false;
      el.removeAttribute('hidden');
      el.textContent = message;
    } else {
      el.hidden = true;
      el.setAttribute('hidden', '');
      el.textContent = '';
    }
  }

  function collectPayload() {
    cacheEls();
    var hp = document.getElementById('bookDemoHp');
    return {
      fullName: fields.fullName && fields.fullName.input ? fields.fullName.input.value.trim() : '',
      companyName: fields.companyName && fields.companyName.input ? fields.companyName.input.value.trim() : '',
      email: fields.email && fields.email.input ? fields.email.input.value.trim() : '',
      phone: fields.phone && fields.phone.input ? normalizeMobile(fields.phone.input.value) : '',
      industry: fields.industry && fields.industry.input ? fields.industry.input.value.trim() : '',
      companySize: fields.companySize && fields.companySize.input ? fields.companySize.input.value.trim() : '',
      demoDate: fields.demoDate && fields.demoDate.input ? fields.demoDate.input.value.trim() : '',
      demoTime: fields.demoTime && fields.demoTime.input ? fields.demoTime.input.value.trim() : '',
      remarks: fields.remarks && fields.remarks.input ? fields.remarks.input.value.trim() : '',
      pageUrl: window.location.href,
      website: hp ? hp.value : ''
    };
  }

  function finishSubmitSuccess() {
    closeModal(true);
    showSuccessPopup();
    cacheEls();
    if (form) form.reset();
    Object.keys(fields || {}).forEach(function (key) { setFieldError(key, ''); });
    setFormError('');
    if (submitBtn) {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
    }
    submitting = false;
  }

  function finishSubmitError(message) {
    setFormError(message || 'Something went wrong. Please try again.');
    if (submitBtn) {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
    }
    submitting = false;
  }

  var submitting = false;

  function handleSubmit(e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    if (submitting) return false;

    /* IMPORTANT: do not rebuild modal here — that wipes user input */
    cacheEls();
    if (!form || !fields || !fields.fullName || !fields.fullName.input) {
      ensureModal(true);
      cacheEls();
    }
    setDateMin();
    setFormError('');

    if (!validateForm(true)) {
      var firstInvalid = form && form.querySelector('.book-demo-field.is-error input, .book-demo-field.is-error select, .book-demo-field.is-error textarea');
      if (firstInvalid) firstInvalid.focus();
      return false;
    }

    submitting = true;
    submitBtn = document.getElementById('bookDemoSubmit');
    if (submitBtn) {
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
    }

    var payload = collectPayload();
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().then(function (data) {
        return { status: res.status, data: data || {} };
      }).catch(function () {
        return { status: res.status, data: {} };
      });
    }).then(function (result) {
      if (result.data && result.data.ok) {
        finishSubmitSuccess();
        return;
      }
      finishSubmitError((result.data && result.data.error) || 'Unable to book demo right now. Please try again.');
    }).catch(function () {
      finishSubmitError('Network error. Check your connection and try again.');
    });

    return false;
  }

  function bindSubmitControls() {
    form = document.getElementById('bookDemoForm');
    submitBtn = document.getElementById('bookDemoSubmit');
    if (form && form.dataset.bdSubmitBound !== '1') {
      form.dataset.bdSubmitBound = '1';
      form.addEventListener('submit', handleSubmit);
    }
    if (submitBtn && submitBtn.dataset.bdClickBound !== '1') {
      submitBtn.dataset.bdClickBound = '1';
      submitBtn.addEventListener('click', function (e) {
        /* type=submit still fires form submit; this backs click if needed */
        if (submitBtn.getAttribute('type') === 'button') {
          e.preventDefault();
          handleSubmit(e);
        }
      });
    }
  }

  function bindFieldEvents() {
    if (!fields) return;
    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      if (!field.input || field.input.dataset.bookDemoBound === '1') return;
      field.input.dataset.bookDemoBound = '1';
      var eventName = field.input.tagName === 'SELECT' ? 'change' : 'input';
      field.input.addEventListener(eventName, function () {
        if (field.input.tagName === 'INPUT' && (field.input.type === 'tel' || field.input.name === 'phone')) {
          field.input.value = digitsOnly(field.input.value).slice(0, 12);
        }
        validateField(key, field.input.dataset.touched === 'true' || (key === 'phone' && digitsOnly(field.input.value).length >= 10));
      });
      field.input.addEventListener('blur', function () {
        field.input.dataset.touched = 'true';
        if (key === 'phone' && field.input.value) {
          field.input.value = normalizeMobile(field.input.value);
        }
        validateField(key, true);
      });
    });
  }

  function isBookDemoTrigger(el) {
    if (!el) return false;
    if (el.closest('#bookDemoModal, #bookDemoForm, #bookDemoSuccess, .book-demo-success, .book-demo-modal')) return false;
    if (el.closest('#bookDemoSubmit, .book-demo-modal__submit')) return false;
    if (el.closest('[data-book-demo]')) return true;
    var a = el.closest('a, button');
    if (!a) return false;
    if (a.id === 'bookDemoSubmit' || a.type === 'submit' || (a.classList && a.classList.contains('book-demo-modal__submit'))) return false;
    var text = (a.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
    return text === 'book demo' || text === 'book a demo' || text === 'book a free demo'
      || text === 'book free demo' || text === 'book live demo' || text === 'book a live demo'
      || text === 'request a demo' || text === 'request demo';
  }

  function init() {
    ensureCss();
    ensureModal(false);
    bindFieldEvents();
    bindSubmitControls();
    if (globalBound) return;
    globalBound = true;

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-book-demo-success-close]')) {
        e.preventDefault();
        closeSuccessPopup();
        return;
      }
      if (e.target.closest('#bookDemoModal [data-book-demo-close]')) {
        e.preventDefault();
        closeModal();
        return;
      }
      if (!isBookDemoTrigger(e.target)) return;
      e.preventDefault();
      openModal();
    });

    document.addEventListener('submit', function (e) {
      if (e.target && e.target.id === 'bookDemoForm') {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(e);
      }
    }, true);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var succ = document.getElementById('bookDemoSuccess');
        if (succ && !succ.hidden) {
          e.preventDefault();
          closeSuccessPopup();
          return;
        }
        modal = document.getElementById('bookDemoModal');
        if (modal && modal.classList.contains('is-open')) {
          e.preventDefault();
          closeModal();
        }
      }
      trapFocus(e);
    });

    window.addEventListener('popstate', function () {
      if (ignoreNextPop) {
        ignoreNextPop = false;
        return;
      }
      modal = document.getElementById('bookDemoModal');
      if (isDemoPath()) {
        if (!modal || !modal.classList.contains('is-open')) openModal({ skipUrl: true });
      } else if (modal && modal.classList.contains('is-open')) {
        closeModal(false, { skipUrl: true });
      }
    });

    if (isDemoPath()) {
      setTimeout(function () { openModal({ skipUrl: true }); }, 0);
    }
  }

  window.BookDemoModal = { open: openModal, close: closeModal, showSuccess: showSuccessPopup, DEMO_PATH: DEMO_PATH };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
