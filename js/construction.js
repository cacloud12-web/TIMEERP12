(function () {
  'use strict';

  var PILLAR_DETAILS = {
    command: {
      title: 'Multi-site command center on TimeERP',
      body: 'Every active site feeds into one TimeERP dashboard: BOQ, budgets, labour, and subcontractor status visible to head office and project managers. No duplicate entries between site Excel sheets and group finance.'
    },
    costing: {
      title: 'BOQ-based job costing with live margin visibility',
      body: 'Import BOQ line items, track committed costs against budget, and see margin erosion before it hits the P&L. TimeERP ties site costs to finance with line-item depth builders need.'
    },
    procurement: {
      title: 'Materials, GRN & subcontractor control',
      body: 'Material requisitions, purchase orders, GRN, and subcontractor work orders flow through auditable approval chains. Site stores and head office share one inventory truth, reduce leakage and duplicate ordering.'
    },
    billing: {
      title: 'RA bills, progress billing & subcontractor payables',
      body: 'Generate running account bills from site progress, match subcontractor RA claims, and sync receivables with owner billing cycles. Finance sees committed vs billed vs collected in real time.'
    },
    field: {
      title: 'Mobile site supervisor access',
      body: 'Supervisors log daily progress, issue materials, and raise indent from mobile, with role-based permissions per site. Secure TimeERP field access without sharing head-office credentials on site.'
    }
  };

  var WORKFLOW_CONTENT = {
    tender: { title: 'Tender evaluation & project award', body: 'Capture tender BOQ, estimate costs, and convert awarded projects into live sites with budget baselines. Historical tender data informs future bids, stop rebuilding estimates from scratch.' },
    setup: { title: 'BOQ import & site mobilization', body: 'Set up work breakdown structure, assign site teams, open material stores, and onboard subcontractors. Standard templates from past projects accelerate mobilization from weeks to days.' },
    execution: { title: 'Daily execution, materials, labour & progress', body: 'Site teams issue materials, log labour attendance, and submit DPRs from field. Head office sees committed costs update live, catch overruns before month-end surprises.' },
    qc: { title: 'Quality checkpoints & safety compliance', body: 'Define QC stages per BOQ line, attach inspection photos, and track safety incident logs. Audit-ready records for RERA, owner consultants, and internal quality reviews.' },
    rabilling: { title: 'RA billing & subcontractor claims', body: 'Raise progress bills to owners from certified work done. Match subcontractor RA claims against measured work, disputes drop when every claim ties to site records.' },
    closeout: { title: 'Project close-out & retention tracking', body: 'Final measurements, defect liability period tracking, retention release, and project P&L close. Lessons learned feed templates for the next tender cycle.' }
  };

  var SOLUTION_DETAILS = {
    command: {
      icon: 'corporate_fare',
      title: 'Multi-site project governance',
      lead: 'One command center for all active sites, budgets, progress, and approvals with role-based visibility per project.',
      features: ['Site-wise RBAC & approvals', 'Cross-site resource view', 'Executive margin dashboards', 'Owner & consultant portals', 'Audit trail on every transaction'],
      highlights: [
        { id: 'sites', icon: 'location_on', label: 'Site-wise control', summary: 'RBAC and approvals per project', detail: 'Assign supervisors, project managers, and finance roles per site so head office sees group totals without sharing credentials on every project.' },
        { id: 'margin', icon: 'monitoring', label: 'Margin dashboards', summary: 'Budget vs committed vs actual', detail: 'Track BOQ baselines and committed costs across sites so leadership spots overruns before month-end close.' },
        { id: 'audit', icon: 'history', label: 'Audit-ready records', summary: 'Every transaction logged', detail: 'PO, GRN, material issue, and payment events stay tied to the site record for owner audits and internal reviews.' }
      ]
    },
    field: {
      icon: 'construction',
      title: 'Field & site mobile apps',
      lead: 'Site supervisors execute daily ops from mobile, DPR, material issue, and indent without calling head office.',
      features: ['Mobile DPR & progress photos', 'Material issue from site store', 'Offline-capable field forms', 'Approval chains by value', 'GPS-tagged site check-ins'],
      highlights: [
        { id: 'dpr', icon: 'assignment', label: 'Mobile DPR', summary: 'Daily progress from site', detail: 'Supervisors log work done, labour, and progress photos from mobile so head office does not wait for evening calls or WhatsApp updates.' },
        { id: 'material', icon: 'inventory_2', label: 'Material issue', summary: 'Site store to BOQ line', detail: 'Issue materials against BOQ items with approval chains by value, keeping store and finance on the same consumption record.' },
        { id: 'offline', icon: 'wifi_off', label: 'Offline field forms', summary: 'Capture data on poor connectivity', detail: 'Field teams can complete DPR and indent forms on site and sync when connectivity returns, without losing the day\'s site record.' }
      ]
    },
    automate: {
      icon: 'autorenew',
      title: 'Construction workflow automation',
      lead: 'TimeERP pipelines for requisitions, RA billing, and subcontractor payments, with SLAs and escalations.',
      features: ['Material requisition templates', 'Auto-escalation on overdue approvals', 'Subcontractor payment schedules', 'BOQ milestone triggers', 'Bulk DPR reminders'],
      highlights: [
        { id: 'req', icon: 'shopping_cart', label: 'Requisition pipelines', summary: 'Templates and escalations', detail: 'Standardize material requisitions by project type and escalate overdue approvals so procurement does not stall on site.' },
        { id: 'ra', icon: 'request_quote', label: 'RA billing workflow', summary: 'Owner bills from certified work', detail: 'Generate running account bills from measured progress and keep owner certification status visible to finance and project teams.' },
        { id: 'subpay', icon: 'payments', label: 'Subcontractor payments', summary: 'Claims matched to site work', detail: 'Route subcontractor RA claims through approval chains tied to measured work, reducing disputes when claims do not match site records.' }
      ]
    }
  };

  var MODULES = {
    boq: {
      title: 'BOQ & project planning',
      points: ['BOQ import from Excel / tender', 'Work breakdown structure (WBS)', 'Budget baseline per line item', 'Revision & variation tracking', 'Tender-to-project conversion', 'Margin forecast at award stage']
    },
    materials: {
      title: 'Site inventory & materials',
      points: ['Site store & central warehouse', 'Material requisition workflows', 'GRN & quality inspection', 'Stock transfer between sites', 'Batch tracking for cement & steel', 'Consumption vs BOQ variance']
    },
    subcontract: {
      title: 'Subcontractors & labour',
      points: ['Subcontractor work order management', 'RA claim vs measured work', 'Labour attendance & muster roll', 'Contractor compliance documents', 'Retention & advance tracking', 'TDS on subcontractor payments']
    },
    finance: {
      title: 'Project finance & GST',
      points: ['Budget vs actual by site', 'Owner RA bill generation', 'Subcontractor payables aging', 'GST on works contract', 'Inter-site cost allocation', 'Consolidated group P&L']
    }
  };

  var SECURITY_DETAILS = {
    encrypt: { title: 'Encryption for BOQ & contract data', body: 'Tender BOQ, subcontractor agreements, and owner contracts protected with AES-256 at rest and TLS 1.2+ in transit, critical for competitive bid confidentiality.' },
    rbac: { title: 'Site-level role-based access', body: 'Site supervisors see only their project. Project managers see assigned sites. Group finance and leadership get consolidated views, least privilege by default.' },
    audit: { title: 'Transaction audit trails', body: 'Every PO, GRN, material issue, and payment logged with user, site, and timestamp. Exportable for owner audits, RERA reviews, and internal compliance.' },
    mfa: { title: 'MFA & field session controls', body: 'Multi-factor on financial approvals, configurable session timeouts for shared site devices, and IP policies for head-office access.' },
    backup: { title: 'Backups & disaster recovery', body: 'Daily encrypted backups with point-in-time recovery, because losing a month of site DPR data during monsoon shutdown is not an option.' },
    validate: { title: 'Secure SDLC & input validation', body: 'Mandatory security review on releases, CSP headers, and server-side validation on all field forms, protecting multi-site data from injection attacks.' }
  };

  var ONBOARD_DETAILS = {
    discovery: { title: 'Project operations discovery', body: 'We map your site count, BOQ structure, subcontractor model, and billing cycles, then recommend workflows aligned to how your group actually builds.' },
    migration: { title: 'BOQ & master data migration', body: 'Import active project BOQs, subcontractor masters, and opening stock from Excel or legacy tools, validated before go-live on the first site.' },
    training: { title: 'Role-based site & HO training', body: 'Separate sessions for site supervisors, project managers, stores, and finance, plus quick-reference guides for DPR and material issue on mobile.' },
    success: { title: 'Dedicated construction success partner', body: 'A named contact for rollout, peak-monsoon support, and quarterly reviews on margin reporting, not a generic help desk.' }
  };

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

  var demoForm = document.getElementById('cnDemoForm');
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
      var msg = document.getElementById('cnFormMsg');
      if (msg) {
        msg.textContent = 'Thanks, our construction team will reach out within 1 business day.';
        msg.classList.add('is-visible');
      }
      demoForm.reset();
    });
  }

  var FIELD_APP_DETAILS = {
    dpr: {
      icon: 'assignment',
      tabId: 'cnFieldTab-dpr',
      title: 'Daily progress report',
      body: 'Supervisors log work done, labour on site, and progress notes from mobile. Head office reviews DPR without waiting for evening calls or WhatsApp summaries.'
    },
    material: {
      icon: 'inventory_2',
      tabId: 'cnFieldTab-material',
      title: 'Material issue & indent',
      body: 'Issue materials from the site store against BOQ lines and raise indents for approval. Stores and finance stay on one consumption record per project.'
    },
    photos: {
      icon: 'photo_camera',
      tabId: 'cnFieldTab-photos',
      title: 'Progress photos',
      body: 'Attach site photos to DPR and inspection records so project managers and owners see visual proof tied to the same site entry, not scattered camera rolls.'
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

  setPillar('command', true);
  setWorkflow('tender', true);
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
