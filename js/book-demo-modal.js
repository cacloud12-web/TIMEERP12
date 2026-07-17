(function () {
  'use strict';

  var modal = document.getElementById('bookDemoModal');
  var form = document.getElementById('bookDemoForm');
  var submitBtn = document.getElementById('bookDemoSubmit');
  var toast = document.getElementById('bookDemoToast');
  var lastFocused = null;
  var toastTimer = null;
  var closeTimer = null;

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var fields = {
    fullName: {
      input: document.getElementById('bookDemoFullName'),
      error: document.getElementById('bookDemoErrFullName'),
      required: true,
      validate: function (value) {
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 2) return 'Enter at least 2 characters.';
        return '';
      }
    },
    companyName: {
      input: document.getElementById('bookDemoCompanyName'),
      error: document.getElementById('bookDemoErrCompanyName'),
      required: true,
      validate: function (value) {
        if (!value.trim()) return 'Company name is required.';
        return '';
      }
    },
    email: {
      input: document.getElementById('bookDemoEmail'),
      error: document.getElementById('bookDemoErrEmail'),
      required: true,
      validate: function (value) {
        if (!value.trim()) return 'Work email is required.';
        if (!EMAIL_RE.test(value.trim())) return 'Enter a valid email address.';
        return '';
      }
    },
    phone: {
      input: document.getElementById('bookDemoPhone'),
      error: document.getElementById('bookDemoErrPhone'),
      required: true,
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
      required: true,
      validate: function (value) {
        if (!value) return 'Please select an industry.';
        return '';
      }
    },
    companySize: {
      input: document.getElementById('bookDemoCompanySize'),
      error: document.getElementById('bookDemoErrCompanySize'),
      required: true,
      validate: function (value) {
        if (!value) return 'Please select company size.';
        return '';
      }
    }
  };

  function getFocusable() {
    if (!modal) return [];
    return Array.prototype.slice.call(
      modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) {
      return !el.disabled && el.offsetParent !== null;
    });
  }

  function trapFocus(e) {
    if (!modal || !modal.classList.contains('is-open')) return;
    if (e.key !== 'Tab') return;
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
    Object.keys(fields).forEach(function (key) {
      setFieldError(key, '');
    });
    if (submitBtn) submitBtn.classList.remove('is-loading');
  }

  function showToast() {
    if (!toast) return;
    toast.hidden = false;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
      setTimeout(function () {
        toast.hidden = true;
      }, 350);
    }, 5000);
  }

  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.remove('is-closing');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var firstInput = document.getElementById('bookDemoFullName');
    if (firstInput) {
      setTimeout(function () {
        firstInput.focus();
      }, 50);
    }
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
      if (!field.input) return;
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

  function init() {
    if (!modal || !form) return;

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-book-demo]');
      if (!trigger) return;
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

  window.BookDemoModal = {
    open: openModal,
    close: closeModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
