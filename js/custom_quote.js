(function () {
  'use strict';

  var PILLAR_DETAILS = {
    encryption: {
      title: 'Encryption at rest and in transit',
      body: 'All production, inventory, and financial data is encrypted with AES-256 at rest. Every connection uses TLS 1.2+ HTTPS to protect data in transit across plants and remote teams.',
      points: ['AES-256 encryption at rest', 'TLS 1.2+ on all connections', 'Encrypted database backups', 'Key rotation managed by infrastructure']
    },
    access: {
      title: 'Role-based access control',
      body: 'Define granular permissions by role, plant, and department. Ensure shop-floor staff, plant managers, and finance teams only access the data their role requires.',
      points: ['Custom roles and permission sets', 'Plant-level access boundaries', 'Session timeout policies', 'Multi-factor authentication support']
    },
    audit: {
      title: 'Comprehensive audit logs',
      body: 'Every create, update, and delete action is logged with user identity and timestamp — giving your team a clear trail for internal reviews and compliance audits.',
      points: ['100% action log coverage', 'Exportable audit reports', 'Change history on records', 'Admin activity monitoring']
    },
    compliance: {
      title: 'Compliance-ready infrastructure',
      body: 'TimeERP runs on secure, monitored cloud infrastructure designed for manufacturing teams that need reliable uptime and documented security controls.',
      points: ['Enterprise-grade data centres', 'Regular security assessments', 'Data residency options', 'Security documentation']
    }
  };

  var pillarDetail = document.getElementById('cqPillarDetail');
  var pillarTabs = document.querySelectorAll('.cq-pillar-tab');
  var securityStats = document.querySelectorAll('.cq-security-stat');
  var form = document.getElementById('cqQuoteForm');
  var formPanel = document.getElementById('cqFormPanel');
  var faqItems = document.querySelectorAll('.cq-faq__item');

  function setPillar(id) {
    var detail = PILLAR_DETAILS[id];
    if (!detail || !pillarDetail) return;
    pillarTabs.forEach(function (tab) {
      var active = tab.getAttribute('data-pillar') === id;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    securityStats.forEach(function (stat) {
      stat.classList.toggle('is-active', stat.getAttribute('data-stat') === id || (id === 'compliance' && stat.getAttribute('data-stat') === 'uptime'));
    });
    pillarDetail.classList.remove('is-visible');
    setTimeout(function () {
      pillarDetail.innerHTML =
        '<h3>' + detail.title + '</h3>' +
        '<p>' + detail.body + '</p>' +
        '<ul>' + detail.points.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>';
      pillarDetail.classList.add('is-visible');
    }, 60);
  }

  pillarTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      setPillar(tab.getAttribute('data-pillar') || 'encryption');
    });
  });

  securityStats.forEach(function (stat) {
    stat.addEventListener('click', function () {
      var id = stat.getAttribute('data-stat') || 'encryption';
      var pillarMap = { encryption: 'encryption', access: 'access', audit: 'audit', uptime: 'compliance' };
      setPillar(pillarMap[id] || 'encryption');
      document.getElementById('cqPillars').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  function validateField(input, errEl, fieldWrap, optional) {
    optional = optional || false;
    var isSelect = input.tagName === 'SELECT';
    var value = isSelect ? input.value : input.value.trim();
    if (optional && !value) {
      input.classList.remove('is-invalid', 'is-valid');
      if (fieldWrap) fieldWrap.classList.remove('is-valid');
      if (errEl) errEl.textContent = '';
      return true;
    }
    var valid = value.length > 0;
    if (!optional && input.required && !value) valid = false;
    if (input.type === 'email') {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    if (input.type === 'tel') {
      var digits = value.replace(/\D/g, '');
      valid = digits.length >= 10;
      if (errEl && !valid) {
        errEl.textContent = value.length === 0 && !optional
          ? 'This field is required'
          : 'Enter a valid phone number (at least 10 digits)';
      }
    }
    if (input.type !== 'tel' && errEl) {
      if (valid) errEl.textContent = '';
      else if (input.type === 'email') errEl.textContent = 'Enter a valid email address';
      else errEl.textContent = 'This field is required';
    }
    if (input.type === 'tel' && valid && errEl) errEl.textContent = '';
    input.classList.toggle('is-valid', valid && value.length > 0);
    input.classList.toggle('is-invalid', !valid && (value.length > 0 || (!optional && input.required)));
    if (fieldWrap) fieldWrap.classList.toggle('is-valid', valid && value.length > 0);
    return valid;
  }

  var formFields = [
    { id: 'cqFullName', err: 'errFullName', wrap: 'fieldFullName' },
    { id: 'cqEmail', err: 'errEmail', wrap: 'fieldEmail' },
    { id: 'cqFirmName', err: 'errFirmName', wrap: 'fieldFirmName' },
    { id: 'cqFirmSize', err: 'errFirmSize', wrap: 'fieldFirmSize', optional: true },
    { id: 'cqPhone', err: 'errPhone', wrap: 'fieldPhone' }
  ];

  formFields.forEach(function (f) {
    var input = document.getElementById(f.id);
    if (!input) return;
    input.addEventListener('blur', function () {
      validateField(input, document.getElementById(f.err), document.getElementById(f.wrap), f.optional);
    });
    input.addEventListener('input', function () {
      if (input.classList.contains('is-invalid') || input.classList.contains('is-valid')) {
        validateField(input, document.getElementById(f.err), document.getElementById(f.wrap), f.optional);
      }
    });
    input.addEventListener('change', function () {
      validateField(input, document.getElementById(f.err), document.getElementById(f.wrap), f.optional);
    });
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      formFields.forEach(function (f) {
        var input = document.getElementById(f.id);
        if (!input) return;
        if (!validateField(input, document.getElementById(f.err), document.getElementById(f.wrap), f.optional)) ok = false;
      });
      if (!ok) return;
      if (formPanel) formPanel.classList.add('is-submitted');
    });
  }

  faqItems.forEach(function (item) {
    var trigger = item.querySelector('.cq-faq__trigger');
    var panel = item.querySelector('.cq-faq__panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : '0';
    });
  });


  setPillar('encryption');
})();
