(function () {
  'use strict';

  var PILLAR_DETAILS = {
    crm: {
      title: 'CRM & sales on TimeERP',
      body: 'Track leads, pipeline, quotations, and customer relationships end-to-end so MSME sales activity stays connected to billing and delivery.'
    },
    billing: {
      title: 'Billing, ledgers & GST reports',
      body: 'Create invoices, receipts, ledgers, and GST reports in one flow. Finance teams stop switching tools for every customer payment.'
    },
    hrms: {
      title: 'HRMS, attendance & payroll',
      body: 'Manage employees, attendance, and payroll with PF, ESI, TDS, and payslips so people operations stay on the same platform as the rest of the business.'
    },
    projects: {
      title: 'Projects, Kanban & tasks',
      body: 'Plan, execute, monitor, and deliver projects from initiation to completion with centralized project planning, team collaboration, task execution, worklogs, billing, and profitability tracking.'
    },
    docs: {
      title: 'Document vault & registers',
      body: 'Keep agreements, inward/outward registers, and DSC tracking in a secure vault instead of scattered folders and chat threads.'
    }
  };

  var WORKFLOW_CONTENT = {
    lead: { title: 'Capture & qualify leads', body: 'Log inbound and outbound leads in TimeERP CRM, assign owners, and track follow-ups so opportunities do not get lost in WhatsApp or spreadsheets.' },
    quotation: { title: 'Quotations & pipeline', body: 'Convert qualified leads into quotations and keep pipeline stages visible. Sales and finance share one customer record from quote to invoice.' },
    invoice: { title: 'Invoices & receipts', body: 'Create invoices and receipts from the billing module. Ledgers stay tied to the same customer and project context used across TimeERP.' },
    payment: { title: 'Collections & payment tracking', body: 'Record payments against invoices and keep receivables visible so MSME finance teams know what is collected versus outstanding.' },
    accounting: { title: 'Ledgers & day-to-day accounting', body: 'Maintain ledgers alongside billing so accounts and operations stop reconciling separate tools at month-end.' },
    gst: { title: 'GST reports & operational reports', body: 'Generate GST reports from billing data and use platform reports to review sales, delivery, and people activity in one place.' }
  };

  var SOLUTION_DETAILS = {
    command: {
      icon: 'hub',
      title: 'One platform for MSME operations',
      lead: 'Unify HR, CRM, payroll, billing, projects, and documents so growing businesses run from one TimeERP login.',
      features: ['Shared customer & employee records', 'Cross-module dashboards', 'Role-based access', 'Cloud delivery', 'Audit-friendly activity trails'],
      highlights: [
        { id: 'unify', icon: 'merge', label: 'Unified workspace', summary: 'One login across modules', detail: 'Teams use HRMS, CRM, billing, and projects together instead of re-entering data across separate tools.' },
        { id: 'roles', icon: 'admin_panel_settings', label: 'Role-based access', summary: 'Least privilege by default', detail: 'Give sales, finance, and operations only the access they need while leadership keeps an overview.' },
        { id: 'cloud', icon: 'cloud', label: 'Cloud ERP', summary: 'Access from anywhere', detail: 'TimeERP is cloud-based with uptime, backups, and encryption so MSME teams can work securely without heavy IT overhead.' }
      ]
    },
    field: {
      icon: 'smartphone',
      title: 'Team access on the go',
      lead: 'Keep sales follow-ups, task updates, and approvals moving without waiting for a desktop session.',
      features: ['CRM follow-ups', 'Task updates', 'Document access', 'Approval-friendly workflows', 'Secure cloud sessions'],
      highlights: [
        { id: 'follow', icon: 'notifications', label: 'Follow-ups', summary: 'CRM reminders', detail: 'Sales owners stay on top of lead and deal follow-ups inside TimeERP CRM.' },
        { id: 'tasks', icon: 'task_alt', label: 'Task updates', summary: 'Delivery stays visible', detail: 'Teams update recurring tasks and project work so managers see progress without chasing status emails.' },
        { id: 'docs', icon: 'description', label: 'Documents', summary: 'Vault on demand', detail: 'Agreements and registers stay in the document vault instead of personal drives and chat attachments.' }
      ]
    },
    automate: {
      icon: 'autorenew',
      title: 'Workflow automation for MSMEs',
      lead: 'Standardize quotations, billing, payroll, and task reminders so routine work does not depend on memory.',
      features: ['Quotation to invoice handoff', 'Billing & GST reporting', 'Payroll cycles', 'Recurring tasks & SLAs', 'Reminder-friendly workflows'],
      highlights: [
        { id: 'quote', icon: 'request_quote', label: 'Quote to invoice', summary: 'Sales to finance handoff', detail: 'Move from quotation to invoice on the same customer record to reduce rework between sales and accounts.' },
        { id: 'pay', icon: 'payments', label: 'Payroll cycles', summary: 'People ops on schedule', detail: 'Process salaries, PF, ESI, TDS, and payslips with compliance workflows already part of TimeERP payroll.' },
        { id: 'sla', icon: 'schedule', label: 'Task SLAs', summary: 'Delivery discipline', detail: 'Use recurring tasks and SLA monitoring so delivery commitments stay visible to the team.' }
      ]
    }
  };

  var MODULES = {
    boq: {
      title: 'CRM',
      points: ['Lead capture & assignment', 'Pipeline stages', 'Quotations', 'Follow-ups', 'Customer history', 'Sales handoff to billing']
    },
    materials: {
      title: 'Billing & GST',
      points: ['Invoices', 'Receipts', 'Ledgers', 'GST reports', 'Customer billing history', 'Finance-ready records']
    },
    subcontract: {
      title: 'HRMS & payroll',
      points: ['Employee records', 'Attendance', 'Payroll processing', 'PF & ESI', 'TDS & payslips', 'HR policies']
    },
    finance: {
      title: 'Projects, tasks & documents',
      points: ['Multi Assign', 'Create Task', 'Recurring Task', 'Task Billing', 'Document vault', 'Agreements & registers']
    }
  };

  var SECURITY_DETAILS = {
    encrypt: { title: 'Encryption for business data', body: 'Protect customer, employee, and financial records with encryption at rest and TLS in transit on the TimeERP cloud platform.' },
    rbac: { title: 'Role-based access', body: 'Give sales, finance, HR, and delivery only the modules and records they need. Leadership keeps consolidated visibility.' },
    audit: { title: 'Activity trails', body: 'Keep auditable trails on billing, payroll, and document activity so MSME teams can review who changed what and when.' },
    mfa: { title: 'Stronger account controls', body: 'Use multi-factor and session controls for sensitive approvals and shared office devices.' },
    backup: { title: 'Backups & recovery', body: 'Automatic backups and recovery options help protect business records without running your own server room.' },
    validate: { title: 'Secure delivery practices', body: 'TimeERP follows secure delivery practices including input validation and browser security headers to protect multi-user business data.' }
  };

  var ONBOARD_DETAILS = {
    discovery: { title: 'Business operations discovery', body: 'We map how your MSME handles sales, billing, people, and delivery, then recommend TimeERP workflows that match your team size and process maturity.' },
    migration: { title: 'Master data migration', body: 'Import customers, employees, and opening records from spreadsheets or legacy tools, validated before go-live.' },
    training: { title: 'Role-based team training', body: 'Separate sessions for sales, finance, HR, and delivery owners, plus quick-reference guides for daily CRM, billing, and task workflows.' },
    success: { title: 'Dedicated success partner', body: 'A named contact for rollout and reviews, focused on helping your MSME adopt the modules that matter first.' }
  };

  var activePillar = 'crm';
  var activePillar = 'command';
  var activeWorkflow = 'tender';
  var activeSolution = 'command';
  var activeModule = 'boq';
  var activeSecurity = 'encrypt';
  var activeOnboard = 'discovery';

  function bindInteractiveTab(el, onSelect) {
    el.addEventListener('click', function () { onSelect(false); });
    el.addEventListener('mouseenter', function () { onSelect(true); });
    el.addEventListener('focus', function () { onSelect(true); });
  }

  function swapPanel(panel, html, instant) {
    if (!panel) return;
    if (instant) {
      panel.innerHTML = html;
      panel.classList.add('is-visible');
      return;
    }
    panel.classList.remove('is-visible');
    setTimeout(function () {
      panel.innerHTML = html;
      panel.classList.add('is-visible');
    }, 80);
  }

  var pillarCards = document.querySelectorAll('[data-pillar]');
  var pillarDetail = document.getElementById('cnPillarDetail');

  function setPillar(id, instant) {
    activePillar = id;
    var detail = PILLAR_DETAILS[id];
    if (!detail) return;
    pillarCards.forEach(function (card) {
      var on = card.getAttribute('data-pillar') === id;
      card.classList.toggle('is-active', on);
      card.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    swapPanel(pillarDetail, '<h3>' + detail.title + '</h3><p>' + detail.body + '</p>', instant);
  }

  pillarCards.forEach(function (card) {
    bindInteractiveTab(card, function (instant) {
      setPillar(card.getAttribute('data-pillar') || 'command', instant);
    });
  });

  var workflowSteps = document.querySelectorAll('.sp-workflow__step[data-step]');
  var workflowDetail = document.getElementById('cnWorkflowDetail');

  function setWorkflow(id, instant) {
    activeWorkflow = id;
    var content = WORKFLOW_CONTENT[id];
    if (!content) return;
    workflowSteps.forEach(function (el) {
      var on = el.getAttribute('data-step') === id;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    swapPanel(workflowDetail, '<h3>' + content.title + '</h3><p>' + content.body + '</p>', instant);
  }

  workflowSteps.forEach(function (el) {
    bindInteractiveTab(el, function (instant) {
      setWorkflow(el.getAttribute('data-step') || 'tender', instant);
    });
  });

  var solutionCards = document.querySelectorAll('.sp-solution-card[data-solution]');
  var solutionPanel = document.getElementById('cnSolutionPanel');

  function bindSolutionHighlights(highlights) {
    var buttons = solutionPanel.querySelectorAll('.sp-solutions__highlight-btn');
    var detailEl = document.getElementById('cnSolutionHighlightDetail');
    if (!buttons.length || !detailEl || !highlights.length) return;
    function activate(idx) {
      buttons.forEach(function (btn, i) {
        btn.classList.toggle('is-active', i === idx);
        btn.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });
      detailEl.textContent = highlights[idx].detail;
    }
    buttons.forEach(function (btn, idx) {
      btn.addEventListener('click', function () { activate(idx); });
      btn.addEventListener('mouseenter', function () { activate(idx); });
    });
    activate(0);
  }

  function renderSolutionPanel(id) {
    var detail = SOLUTION_DETAILS[id];
    if (!detail || !solutionPanel) return;
    var featuresHtml = detail.features.map(function (f) {
      return '<li><span class="material-symbols-outlined">check_circle</span>' + f + '</li>';
    }).join('');
    var highlightsHtml = '';
    if (detail.highlights && detail.highlights.length) {
      highlightsHtml =
        '<div class="sp-solutions__highlights">' +
          '<h4>Explore workflows</h4>' +
          '<div class="sp-solutions__highlight-list" role="tablist">' +
          detail.highlights.map(function (h, idx) {
            return '<button type="button" class="sp-solutions__highlight-btn' + (idx === 0 ? ' is-active' : '') + '" data-highlight="' + h.id + '" role="tab" aria-selected="' + (idx === 0 ? 'true' : 'false') + '">' +
              '<span class="material-symbols-outlined">' + h.icon + '</span>' +
              '<div><strong>' + h.label + '</strong><span>' + h.summary + '</span></div>' +
            '</button>';
          }).join('') +
          '</div>' +
          '<div class="sp-solutions__highlight-detail" id="cnSolutionHighlightDetail" role="tabpanel">' + detail.highlights[0].detail + '</div>' +
        '</div>';
    }
    solutionPanel.innerHTML =
      '<div class="sp-solutions__panel-head">' +
        '<div class="sp-solutions__panel-icon"><span class="material-symbols-outlined">' + detail.icon + '</span></div>' +
        '<div><h3>' + detail.title + '</h3><p>' + detail.lead + '</p></div>' +
      '</div>' +
      '<div class="sp-solutions__panel-grid">' +
        '<div class="sp-solutions__panel-list"><h4>Key capabilities</h4><ul>' + featuresHtml + '</ul></div>' +
        highlightsHtml +
      '</div>';
    if (detail.highlights) bindSolutionHighlights(detail.highlights);
  }

  function setSolution(id, instant) {
    activeSolution = id;
    solutionCards.forEach(function (card) {
      var on = card.getAttribute('data-solution') === id;
      card.classList.toggle('is-active', on);
      card.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (!solutionPanel) return;
    if (instant) {
      renderSolutionPanel(id);
      solutionPanel.classList.add('is-visible');
      return;
    }
    solutionPanel.classList.remove('is-visible');
    setTimeout(function () {
      renderSolutionPanel(id);
      solutionPanel.classList.add('is-visible');
    }, 80);
  }

  solutionCards.forEach(function (card) {
    bindInteractiveTab(card, function (instant) {
      setSolution(card.getAttribute('data-solution') || 'command', instant);
    });
  });

  var moduleTabs = document.querySelectorAll('.sp-module-tab[data-module]');
  var modulePanel = document.getElementById('cnModulePanel');

  function setModule(id, instant) {
    activeModule = id;
    var mod = MODULES[id];
    if (!mod) return;
    moduleTabs.forEach(function (tab) {
      var on = tab.getAttribute('data-module') === id;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    var html = '<h3>' + mod.title + '</h3><ul>' + mod.points.map(function (p) {
      return '<li>' + p + '</li>';
    }).join('') + '</ul>';
    swapPanel(modulePanel, html, instant);
  }

  moduleTabs.forEach(function (tab) {
    bindInteractiveTab(tab, function (instant) {
      setModule(tab.getAttribute('data-module') || 'boq', instant);
    });
  });

  var securityCards = document.querySelectorAll('.sp-sec-card[data-security]');
  var securityDetail = document.getElementById('cnSecurityDetail');

  function setSecurity(id, instant) {
    activeSecurity = id;
    var detail = SECURITY_DETAILS[id];
    if (!detail) return;
    securityCards.forEach(function (card) {
      var on = card.getAttribute('data-security') === id;
      card.classList.toggle('is-active', on);
      card.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    swapPanel(securityDetail, '<h3>' + detail.title + '</h3><p>' + detail.body + '</p>', instant);
  }

  securityCards.forEach(function (card) {
    bindInteractiveTab(card, function (instant) {
      setSecurity(card.getAttribute('data-security') || 'encrypt', instant);
    });
  });

  var onboardCards = document.querySelectorAll('[data-onboard]');
  var onboardDetail = document.getElementById('cnOnboardDetail');

  function setOnboard(id, instant) {
    activeOnboard = id;
    var detail = ONBOARD_DETAILS[id];
    if (!detail) return;
    onboardCards.forEach(function (card) {
      var on = card.getAttribute('data-onboard') === id;
      card.classList.toggle('is-active', on);
      card.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    swapPanel(onboardDetail, '<h3>' + detail.title + '</h3><p>' + detail.body + '</p>', instant);
  }

  onboardCards.forEach(function (card) {
    bindInteractiveTab(card, function (instant) {
      setOnboard(card.getAttribute('data-onboard') || 'discovery', instant);
    });
  });

  var proofSlides = document.getElementById('cnProofSlides');
  var proofDots = document.querySelectorAll('.cn-proof__dot');
  var proofPrev = document.getElementById('cnProofPrev');
  var proofNext = document.getElementById('cnProofNext');
  var proofIndex = 0;
  var proofTotal = proofDots.length;
  var proofTimer = null;

  function goProofSlide(i) {
    if (!proofSlides || !proofTotal) return;
    proofIndex = (i + proofTotal) % proofTotal;
    proofSlides.style.transform = 'translateX(-' + (proofIndex * 100) + '%)';
    proofDots.forEach(function (dot, idx) {
      dot.classList.toggle('is-active', idx === proofIndex);
    });
  }

  function startProofAutoplay() {
    if (proofTimer) clearInterval(proofTimer);
    proofTimer = setInterval(function () { goProofSlide(proofIndex + 1); }, 6500);
  }

  if (proofPrev) proofPrev.addEventListener('click', function () { goProofSlide(proofIndex - 1); startProofAutoplay(); });
  if (proofNext) proofNext.addEventListener('click', function () { goProofSlide(proofIndex + 1); startProofAutoplay(); });
  proofDots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goProofSlide(parseInt(dot.getAttribute('data-slide'), 10));
      startProofAutoplay();
    });
  });
  if (proofTotal) startProofAutoplay();

  document.querySelectorAll('.sp-faq__item').forEach(function (item) {
    var trigger = item.querySelector('.sp-faq__trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      var open = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      var panel = item.querySelector('.sp-faq__panel');
      if (panel) panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0';
    });
  });

  var demoForm = document.getElementById('msmeDemoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var honeypot = demoForm.querySelector('[name="_hp"]');
      if (honeypot && honeypot.value) return;
      var name = (demoForm.querySelector('[name="name"]') || {}).value || '';
      var email = (demoForm.querySelector('[name="email"]') || {}).value || '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        alert('Please enter a valid email address.');
        return;
      }
      if (name.trim().length < 2) {
        alert('Please enter your name.');
        return;
      }
      var msg = document.getElementById('msmeFormMsg');
      if (msg) {
        msg.textContent = 'Thanks, our MSME team will reach out within 1 business day.';
        msg.classList.add('is-visible');
      }
      demoForm.reset();
    });
  }

  var FIELD_APP_DETAILS = {
    dpr: {
      icon: 'person_search',
      tabId: 'cnFieldTab-dpr',
      title: 'CRM follow-ups',
      body: 'Owners update lead status and next actions so sales follow-ups stay visible to the team.'
    },
    material: {
      icon: 'receipt_long',
      tabId: 'cnFieldTab-material',
      title: 'Billing updates',
      body: 'Finance records invoices and receipts against the same customer record used by sales.'
    },
    photos: {
      icon: 'task_alt',
      tabId: 'cnFieldTab-photos',
      title: 'Task progress',
      body: 'Delivery teams update tasks and project status so managers see work without chasing status messages.'
    }
  };

  var fieldAppRoot = document.getElementById('cnFieldApp');
  var fieldAppChips = fieldAppRoot ? fieldAppRoot.querySelectorAll('[data-field-app]') : [];
  var fieldAppDetail = document.getElementById('cnFieldAppDetail');
  var fieldAppIcon = document.getElementById('cnFieldAppIcon');
  var activeFieldApp = 'dpr';
  var fieldAppSwitchTimer = null;

  function renderFieldAppPanel(detail) {
    if (!fieldAppDetail || !detail) return;
    fieldAppDetail.innerHTML = '<strong>' + detail.title + '</strong> ' + detail.body;
    fieldAppDetail.setAttribute('aria-labelledby', detail.tabId);
  }

  function setFieldApp(id, instant) {
    var detail = FIELD_APP_DETAILS[id];
    if (!detail || !fieldAppDetail || id === activeFieldApp) return;
    activeFieldApp = id;
    fieldAppChips.forEach(function (chip) {
      var on = chip.getAttribute('data-field-app') === id;
      chip.classList.toggle('is-active', on);
      chip.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (fieldAppIcon) fieldAppIcon.textContent = detail.icon;
    if (instant) {
      if (fieldAppSwitchTimer) clearTimeout(fieldAppSwitchTimer);
      fieldAppDetail.classList.remove('is-switching');
      renderFieldAppPanel(detail);
      return;
    }
    fieldAppDetail.classList.add('is-switching');
    if (fieldAppSwitchTimer) clearTimeout(fieldAppSwitchTimer);
    fieldAppSwitchTimer = setTimeout(function () {
      renderFieldAppPanel(detail);
      fieldAppDetail.classList.remove('is-switching');
    }, 120);
  }

  fieldAppChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      setFieldApp(chip.getAttribute('data-field-app') || 'dpr', false);
    });
  });

  if (fieldAppRoot) {
    fieldAppRoot.querySelector('.cn-field-app__actions').addEventListener('keydown', function (e) {
      var order = ['dpr', 'material', 'photos'];
      var idx = order.indexOf(activeFieldApp);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        idx = e.key === 'ArrowRight' ? (idx + 1) % order.length : (idx - 1 + order.length) % order.length;
        setFieldApp(order[idx], false);
        var nextTab = document.getElementById(FIELD_APP_DETAILS[order[idx]].tabId);
        if (nextTab) nextTab.focus();
      }
    });
  }

  setPillar('crm', true);
  setWorkflow('lead', true);
  setSolution('command', true);
  setModule('boq', true);
  setSecurity('encrypt', true);
  setOnboard('discovery', true);

  var hash = window.location.hash.replace(/^#/, '');
  if (hash) {
    var el = document.getElementById(hash);
    if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
  }
})();
