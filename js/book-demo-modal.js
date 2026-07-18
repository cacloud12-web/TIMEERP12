/**
 * Shared Book Demo modal — injects markup on any page and opens via [data-book-demo].
 */
(function () {
  'use strict';

  if (window.__TIMEERP_BOOK_DEMO_READY) return;
  window.__TIMEERP_BOOK_DEMO_READY = true;

  var CSS_HREF = 'css/book-demo-modal.css';
  var modal, form, submitBtn, toast, fields;
  var lastFocused = null;
  var toastTimer = null;
  var closeTimer = null;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var bound = false;

  function ensureCss() {
    if (document.querySelector('link[data-book-demo-css]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSS_HREF;
    link.setAttribute('data-book-demo-css', '1');
    document.head.appendChild(link);
  }

  function modalHtml() {
    return ''
      + '<div class="book-demo-modal" id="bookDemoModal" role="dialog" aria-modal="true" aria-labelledby="bookDemoModalTitle" aria-hidden="true">'
      +   '<div class="book-demo-modal__overlay" data-book-demo-close tabindex="-1"></div>'
      +   '<div class="book-demo-modal__dialog" role="document">'
      +     '<button type="button" class="book-demo-modal__close" data-book-demo-close aria-label="Close demo booking modal">×</button>'
      +     '<div class="book-demo-modal__grid">'
      +       '<div class="book-demo-modal__left">'
      +         '<h2 id="bookDemoModalTitle">Book a Personalized Demo</h2>'
      +         '<p>Discover how TIME ERP helps businesses streamline HR, Payroll, CRM, Projects, Finance, Attendance, Compliance, and Operations from one unified platform.</p>'
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
      +               '<label for="bookDemoCompanyName">Company Name <span aria-hidden="true">*</span></label>'
      +               '<input type="text" id="bookDemoCompanyName" name="companyName" autocomplete="organization" required aria-required="true">'
      +               '<span class="book-demo-field__error" id="bookDemoErrCompanyName" role="alert"></span>'
      +             '</div>'
      +             '<div class="book-demo-field" data-field="email">'
      +               '<label for="bookDemoEmail">Work Email <span aria-hidden="true">*</span></label>'
      +               '<input type="email" id="bookDemoEmail" name="email" autocomplete="email" required aria-required="true">'
      +               '<span class="book-demo-field__error" id="bookDemoErrEmail" role="alert"></span>'
      +             '</div>'
      +             '<div class="book-demo-field" data-field="phone">'
      +               '<label for="bookDemoPhone">Phone Number <span aria-hidden="true">*</span></label>'
      +               '<input type="tel" id="bookDemoPhone" name="phone" inputmode="numeric" autocomplete="tel" required aria-required="true">'
      +               '<span class="book-demo-field__error" id="bookDemoErrPhone" role="alert"></span>'
      +             '</div>'
      +             '<div class="book-demo-field" data-field="industry">'
      +               '<label for="bookDemoIndustry">Industry <span aria-hidden="true">*</span></label>'
      +               '<select id="bookDemoIndustry" name="industry" required aria-required="true">'
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
      +               '<label for="bookDemoCompanySize">Company Size <span aria-hidden="true">*</span></label>'
      +               '<select id="bookDemoCompanySize" name="companySize" required aria-required="true">'
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
      +             '<div class="book-demo-field book-demo-field--full" data-field="requirements">'
      +               '<label for="bookDemoRequirements">Requirements</label>'
      +               '<textarea id="bookDemoRequirements" name="requirements" rows="2"></textarea>'
      +               '<span class="book-demo-field__error" id="bookDemoErrRequirements" role="alert"></span>'
      +             '</div>'
      +             '<div class="book-demo-field book-demo-field--full" data-field="hearAbout">'
      +               '<label for="bookDemoHearAbout">How did you hear about us?</label>'
      +               '<select id="bookDemoHearAbout" name="hearAbout">'
      +                 '<option value="">Select option</option>'
      +                 '<option>Google</option>'
      +                 '<option>LinkedIn</option>'
      +                 '<option>Facebook</option>'
      +                 '<option>Instagram</option>'
      +                 '<option>YouTube</option>'
      +                 '<option>Referral</option>'
      +                 '<option>Existing Client</option>'
      +                 '<option>Other</option>'
      +               '</select>'
      +               '<span class="book-demo-field__error" id="bookDemoErrHearAbout" role="alert"></span>'
      +             '</div>'
      +           '</div>'
      +           '<div class="book-demo-modal__submit-wrap">'
      +             '<button type="submit" class="btn btn--primary book-demo-modal__submit" id="bookDemoSubmit">'
      +               '<span class="book-demo-modal__submit-text">Book Demo</span>'
      +               '<span class="book-demo-modal__spinner" aria-hidden="true"></span>'
      +             '</button>'
      +             '<p class="book-demo-modal__privacy">By clicking Book Demo, you agree to our <a href="privacy.html">Privacy Policy</a></p>'
      +           '</div>'
      +         '</form>'
      +       '</div>'
      +     '</div>'
      +   '</div>'
      + '</div>'
      + '<div class="book-demo-toast" id="bookDemoToast" role="status" aria-live="polite" hidden>'
      +   '<h3>Demo Booked Successfully!</h3>'
      +   '<p>Thank you for your interest in TIME ERP. Our team will contact you shortly to schedule your personalized demo.</p>'
      + '</div>';
  }

  function ensureModal() {
    if (!document.getElementById('bookDemoModal')) {
      var wrap = document.createElement('div');
      wrap.setAttribute('data-book-demo-root', '1');
      wrap.innerHTML = modalHtml();
      while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
    } else if (!document.getElementById('bookDemoToast')) {
      var t = document.createElement('div');
      t.className = 'book-demo-toast';
      t.id = 'bookDemoToast';
      t.setAttribute('role', 'status');
      t.setAttribute('aria-live', 'polite');
      t.hidden = true;
      t.innerHTML = '<h3>Demo Booked Successfully!</h3><p>Thank you for your interest in TIME ERP. Our team will contact you shortly to schedule your personalized demo.</p>';
      document.body.appendChild(t);
    }
    cacheEls();
  }

  function cacheEls() {
    modal = document.getElementById('bookDemoModal');
    form = document.getElementById('bookDemoForm');
    submitBtn = document.getElementById('bookDemoSubmit');
    toast = document.getElementById('bookDemoToast');
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
        validate: function (value) {
          if (!value.trim()) return 'Company name is required.';
          return '';
        }
      },
      email: {
        input: document.getElementById('bookDemoEmail'),
        error: document.getElementById('bookDemoErrEmail'),
        validate: function (value) {
          if (!value.trim()) return 'Work email is required.';
          if (!EMAIL_RE.test(value.trim())) return 'Enter a valid email address.';
          return '';
        }
      },
      phone: {
        input: document.getElementById('bookDemoPhone'),
        error: document.getElementById('bookDemoErrPhone'),
        validate: function (value) {
          var digits = value.replace(/\D/g, '');
          if (!digits) return 'Phone number is required.';
          if (digits.length < 10) return 'Enter at least 10 digits.';
          return '';
        }
      },
      industry: {
        input: document.getElementById('bookDemoIndustry'),
        error: document.getElementById('bookDemoErrIndustry'),
        validate: function (value) {
          if (!value) return 'Please select an industry.';
          return '';
        }
      },
      companySize: {
        input: document.getElementById('bookDemoCompanySize'),
        error: document.getElementById('bookDemoErrCompanySize'),
        validate: function (value) {
          if (!value) return 'Please select company size.';
          return '';
        }
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

  function setFieldError(key, message) {
    var field = fields[key];
    if (!field) return;
    var wrap = field.input && field.input.closest('.book-demo-field');
    if (field.error) field.error.textContent = message || '';
    if (wrap) wrap.classList.toggle('is-error', !!message);
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
    Object.keys(fields).forEach(function (key) { setFieldError(key, ''); });
    if (submitBtn) submitBtn.classList.remove('is-loading');
  }

  function showToast() {
    if (!toast) return;
    toast.hidden = false;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
      setTimeout(function () { toast.hidden = true; }, 350);
    }, 5000);
  }

  function openModal() {
    ensureModal();
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.remove('is-closing');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var firstInput = document.getElementById('bookDemoFullName');
    if (firstInput) setTimeout(function () { firstInput.focus(); }, 50);
  }

  function closeModal() {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.add('is-closing');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      modal.classList.remove('is-closing');
      resetForm();
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }, 220);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm(true)) {
      var firstInvalid = modal.querySelector('.book-demo-field.is-error input, .book-demo-field.is-error select');
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    if (submitBtn) submitBtn.classList.add('is-loading');
    setTimeout(function () {
      closeModal();
      showToast();
    }, 1500);
  }

  function bindFieldEvents() {
    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      if (!field.input || field.input.dataset.bookDemoBound === '1') return;
      field.input.dataset.bookDemoBound = '1';
      var eventName = field.input.tagName === 'SELECT' ? 'change' : 'input';
      field.input.addEventListener(eventName, function () {
        if (field.input.tagName === 'INPUT' && field.input.type === 'tel') {
          field.input.value = field.input.value.replace(/\D/g, '').slice(0, 15);
        }
        validateField(key, field.input.dataset.touched === 'true');
      });
      field.input.addEventListener('blur', function () {
        field.input.dataset.touched = 'true';
        validateField(key, true);
      });
    });
  }

  function isBookDemoTrigger(el) {
    if (!el) return false;
    if (el.closest('[data-book-demo]')) return true;
    var a = el.closest('a');
    if (!a) return false;
    var text = (a.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
    return text === 'book demo' || text === 'book a demo' || text === 'book free demo' || text === 'watch demo';
  }

  function init() {
    ensureCss();
    ensureModal();
    if (!modal || !form || bound) return;
    bound = true;

    document.addEventListener('click', function (e) {
      if (!isBookDemoTrigger(e.target)) return;
      e.preventDefault();
      openModal();
    });

    modal.addEventListener('click', function (e) {
      if (e.target.closest('[data-book-demo-close]')) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        e.preventDefault();
        closeModal();
      }
      trapFocus(e);
    });

    form.addEventListener('submit', handleSubmit);
    bindFieldEvents();
  }

  window.BookDemoModal = { open: openModal, close: closeModal };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
