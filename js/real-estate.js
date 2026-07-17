(function () {
  'use strict';

  var PILLAR_DETAILS = {
    portfolio: {
      title: 'Portfolio & asset command center',
      body: 'Every project, land parcel, and JV stake in one view. Track acquisition cost, development stage, and projected yield across your portfolio without scattered project folders.',
      preview: [
        { label: 'Active projects', value: '8 projects' },
        { label: 'Portfolio GDV', value: '\u20B9420 Cr' },
        { label: 'Units under construction', value: '1,240 units' },
        { label: 'Avg project margin', value: '22.4%' }
      ]
    },
    project: {
      title: 'Project lifecycle management',
      body: 'Track site progress, RERA milestones, and automated budget baselines from land acquisition through possession. Manage project phases with clear milestone accountability.',
      preview: [
        { label: 'RERA milestones due (30d)', value: '4 pending' },
        { label: 'Budget vs actual', value: '94% on track' },
        { label: 'Construction progress', value: 'Floor 12 / 18' },
        { label: 'Next milestone', value: 'OC application' }
      ]
    },
    revenue: {
      title: 'Revenue & tax compliance',
      body: 'Automated GST on works contracts, TDS on contractor payments, and professional invoicing for buyer advances. Finance teams close books without manual reconciliation across projects.',
      preview: [
        { label: 'GST returns filed', value: '12/12 on time' },
        { label: 'TDS deducted (QTD)', value: '\u20B918.6L' },
        { label: 'Outstanding receivables', value: '\u20B93.2 Cr' },
        { label: 'Invoices pending approval', value: '6 drafts' }
      ]
    },
    siteops: {
      title: 'Site & vendor operations',
      body: 'Material stock levels, contractor payment cycles, and labour tracking on every active site. Procurement and site teams share one operational record, not WhatsApp and Excel.',
      preview: [
        { label: 'Material stock alerts', value: '3 low-stock SKUs' },
        { label: 'Vendor payments due', value: '\u20B942L this week' },
        { label: 'Labour on site today', value: '186 workers' },
        { label: 'Open purchase orders', value: '14 POs' }
      ]
    },
    compliance: {
      title: 'Compliance dashboard: ITR, GST & audit',
      body: 'Dedicated compliance view for ITR, GST, and audit status across every entity in your group. See filing deadlines, pending assessments, and audit trails before regulators or investors ask.',
      preview: [
        { label: 'GST filing status', value: 'All current' },
        { label: 'ITR due (entity)', value: '2 pending review' },
        { label: 'Audit engagements open', value: '3 in progress' },
        { label: 'RERA registrations', value: '8 active' }
      ]
    }
  };

  var WORKFLOW_CONTENT = {
    acquisition: { title: 'Land acquisition & project onboarding', body: 'Capture land parcels, JV terms, and development approvals in TimeERP. Historical acquisition data informs portfolio benchmarks and project feasibility from day one.' },
    setup: { title: 'Project setup & RERA registration', body: 'Configure project phases, budget baselines, and RERA registration details. Standard templates from past developments accelerate setup for each new launch.' },
    sales: { title: 'Sales, inventory & stakeholder booking', body: 'Publish unit inventory, track inquiries and site visits, and manage booking holds through the stakeholder portal. Sales and finance share one deal record from inquiry to agreement.' },
    execution: { title: 'Site execution & vendor operations', body: 'Track construction progress, material procurement, and contractor payments across active sites. Leadership sees committed spend and milestone risk without waiting for weekly Excel reports.' },
    billing: { title: 'Billing, GST & financial close', body: 'Raise buyer invoices, deduct TDS on contractor payouts, and prepare GST-ready summaries for your CA team. Month-end close runs from one TimeERP finance workspace per project.' },
    handover: { title: 'Possession & project handover', body: 'Manage OC timelines, defect lists, and final settlements. Commission payouts and retention releases close in sync with possession and investor reporting.' }
  };

  var SOLUTION_DETAILS = {
    compliance: {
      icon: 'timeline',
      title: 'Project & compliance hub',
      lead: 'Track site progress, RERA milestones, and budget baselines across every project in your real estate portfolio from one control center.',
      features: [
        'Project-wise site progress and milestone board',
        'RERA registration and quarterly filing calendar',
        'Budget baseline vs actual by project phase',
        'Land, JV, and development stage tracking',
        'Approval and document vault per project'
      ],
      highlights: [
        { id: 'rera', icon: 'gavel', label: 'RERA milestone tracker', summary: 'Registration, updates, possession', detail: 'Map RERA registration numbers, quarterly compliance dates, and possession timelines to each project. Teams get reminders before filings are due.' },
        { id: 'budget', icon: 'account_balance_wallet', label: 'Budget baseline control', summary: 'Planned vs committed vs actual', detail: 'Set cost baselines at project start and compare against committed spends as procurement and contractor bills post from site.' },
        { id: 'progress', icon: 'construction', label: 'Site progress board', summary: 'Phase-wise execution status', detail: 'Track civil, finishing, and handover phases with responsible owners so leadership sees delay risks without waiting for weekly reports.' }
      ]
    },
    stakeholder: {
      icon: 'groups',
      title: 'Stakeholder & commission portal',
      lead: 'Give buyers, channel partners, and internal sales teams one place for lead status, unit inventory, and commission payout visibility.',
      features: [
        'Lead inquiry capture with source and agent assignment',
        'Live unit inventory with hold and availability status',
        'Buyer and investor document sharing',
        'Commission rule setup per project and agent tier',
        'Payout schedule with earned vs received ledger'
      ],
      highlights: [
        { id: 'leads', icon: 'person_search', label: 'Lead tracking workspace', summary: 'Inquiry to site visit to booking', detail: 'Log walk-in, portal, and referral leads with budget, location preference, and follow-up tasks so sales teams do not lose inquiries in WhatsApp threads.' },
        { id: 'inventory', icon: 'home_work', label: 'Unit inventory catalog', summary: 'Flats, plots, and commercial stock', detail: 'Publish available units with area, facing, floor, and pricing. Mark holds during negotiation and release automatically on deal closure or expiry.' },
        { id: 'payouts', icon: 'payments', label: 'Commission payout engine', summary: 'Splits, TDS, and builder receivables', detail: 'Define commission rules per deal, calculate agent and referral shares, and track builder payment schedules with TDS where applicable.' }
      ]
    },
    finance: {
      icon: 'receipt_long',
      title: 'Financial & tax automation',
      lead: 'Automate GST workflows, TDS deductions, and professional invoicing for real estate operations aligned with how Indian CA and finance teams work.',
      features: [
        'GST-ready invoicing for rent, brokerage, and works contracts',
        'TDS on rent, contractor payments, and commissions',
        'GSTR-1 and GSTR-3B preparation support',
        'Advance tax and statutory due-date calendar',
        'Tally and accounting export for reconciliation'
      ],
      highlights: [
        { id: 'gst', icon: 'description', label: 'GST filing workflow', summary: 'Sales, purchase, and ITC mapping', detail: 'Classify real estate transactions correctly under GST rules, prepare return-ready summaries, and reduce manual rework before your CA team files.' },
        { id: 'tds', icon: 'percent', label: 'TDS deduction control', summary: 'Rent, contractors, and brokerage', detail: 'Apply TDS rules on applicable payouts, generate deduction records, and maintain challan references for year-end Form 16A and 26Q reconciliation.' },
        { id: 'invoice', icon: 'receipt', label: 'Professional invoicing', summary: 'Branded, compliant bill formats', detail: 'Issue invoices with correct HSN/SAC, GSTIN, and party details for property sales support services, rent, CAM, and brokerage fees.' }
      ]
    }
  };

  var MODULES = {
    projects: {
      title: 'Project & portfolio management',
      points: ['Multi-project portfolio dashboard', 'RERA milestone & possession tracking', 'Budget baseline vs actual by phase', 'Land, JV & development stage records', 'Document vault per project', 'Executive margin & GDV reporting']
    },
    compliance: {
      title: 'RERA, GST & statutory compliance',
      points: ['RERA registration & quarterly filing calendar', 'GST on works contracts & sales support', 'TDS on rent, contractors & commissions', 'ITR & audit status by entity', 'Statutory due-date reminders', 'Export-ready records for your CA firm']
    },
    sales: {
      title: 'Sales & stakeholder portal',
      points: ['Lead inquiry & site visit tracking', 'Live unit inventory with hold status', 'Buyer & investor document sharing', 'Channel partner commission rules', 'Booking-to-agreement workflow', 'Branded stakeholder login']
    },
    finance: {
      title: 'Finance & tax automation',
      points: ['GST-ready invoicing & buyer billing', 'Contractor & vendor payables aging', 'TDS deduction & challan references', 'Tally export for reconciliation', 'Advance tax & statutory calendar', 'Consolidated group P&L view']
    }
  };

  var SECURITY_DETAILS = {
    encrypt: { title: 'Encryption for project & contract data', body: 'Land agreements, buyer KYC, contractor contracts, and financial records protected with AES-256 at rest and TLS 1.2+ in transit, essential for regulated real estate operations.' },
    rbac: { title: 'Project-level role-based access', body: 'Site teams see only assigned projects. Sales sees inventory and leads for their developments. Finance and leadership get portfolio-wide views, least privilege by default.' },
    audit: { title: 'Full audit trails', body: 'Every booking edit, payment, and document access logged with user and timestamp. Exportable for RERA reviews, investor audits, and internal compliance.' },
    mfa: { title: 'MFA & session controls', body: 'Multi-factor on financial approvals and stakeholder portal access. Configurable session timeouts for shared site office devices.' },
    backup: { title: 'Backups & disaster recovery', body: 'Daily encrypted backups with point-in-time recovery, because losing project financials during quarter close is not an option.' },
    validate: { title: 'Secure SDLC & input validation', body: 'Server-side validation on stakeholder portals, CSP headers, and security review on every release, protecting multi-project real estate data.' }
  };

  var ONBOARD_DETAILS = {
    discovery: { title: 'Portfolio discovery call', body: 'We map your project count, sales model, RERA obligations, and finance workflows, then recommend TimeERP setup aligned to how your group actually develops and sells.' },
    migration: { title: 'Project & master data migration', body: 'Import active projects, unit inventory, contractor masters, and opening balances from Excel or legacy tools, validated before go-live on the first development.' },
    training: { title: 'Role-based team training', body: 'Sessions for project managers, sales, site ops, and finance teams, plus stakeholder portal setup guides for smooth launch.' },
    success: { title: 'Dedicated real estate success partner', body: 'A named TimeERP contact for rollout, statutory season support, and quarterly portfolio reviews, not a generic help desk ticket queue.' }
  };

  var activePillar = 'portfolio';
  var activeWorkflow = 'acquisition';
  var activeSolution = 'compliance';
  var activeModule = 'projects';
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
  var pillarDetail = document.getElementById('rePillarDetail');

  function renderPreviewRows(items) {
    return items.map(function (item) {
      return '<div class="re-pillar-preview__row"><span>' + item.label + '</span><strong>' + item.value + '</strong></div>';
    }).join('');
  }

  function bindPreviewToggle() {
    var btn = document.getElementById('rePillarPreviewBtn');
    var panel = document.getElementById('rePillarPreview');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      var open = panel.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.innerHTML = open
        ? '<span class="material-symbols-outlined">visibility_off</span> Hide preview'
        : '<span class="material-symbols-outlined">dashboard</span> Live preview';
    });
  }

  function setPillar(id, instant) {
    activePillar = id;
    var detail = PILLAR_DETAILS[id];
    if (!detail || !pillarDetail) return;
    pillarCards.forEach(function (card) {
      var on = card.getAttribute('data-pillar') === id;
      card.classList.toggle('is-active', on);
      card.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    var previewHtml = '';
    if (detail.preview && detail.preview.length) {
      previewHtml =
        '<button type="button" class="re-pillar-preview-btn" id="rePillarPreviewBtn" aria-expanded="false">' +
          '<span class="material-symbols-outlined">dashboard</span> Live preview' +
        '</button>' +
        '<div class="re-pillar-preview" id="rePillarPreview" aria-hidden="true">' +
          '<div class="re-pillar-preview__label">Mini dashboard preview</div>' +
          renderPreviewRows(detail.preview) +
        '</div>';
    }
    swapPanel(pillarDetail, '<h3>' + detail.title + '</h3><p>' + detail.body + '</p>' + previewHtml, instant);
    bindPreviewToggle();
  }

  pillarCards.forEach(function (card) {
    bindInteractiveTab(card, function (instant) {
      setPillar(card.getAttribute('data-pillar') || 'portfolio', instant);
    });
  });

  var workflowSteps = document.querySelectorAll('.sp-workflow__step[data-step]');
  var workflowDetail = document.getElementById('reWorkflowDetail');

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
      setWorkflow(el.getAttribute('data-step') || 'acquisition', instant);
    });
  });

  var solutionCards = document.querySelectorAll('.sp-solution-card[data-solution]');
  var solutionPanel = document.getElementById('reSolutionPanel');

  function bindSolutionHighlights(highlights) {
    var buttons = solutionPanel.querySelectorAll('.sp-solutions__highlight-btn');
    var detailEl = document.getElementById('reSolutionHighlightDetail');
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
          '<div class="sp-solutions__highlight-detail" id="reSolutionHighlightDetail" role="tabpanel">' + detail.highlights[0].detail + '</div>' +
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
      setSolution(card.getAttribute('data-solution') || 'compliance', instant);
    });
  });

  var moduleTabs = document.querySelectorAll('.sp-module-tab[data-module]');
  var modulePanel = document.getElementById('reModulePanel');

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
      setModule(tab.getAttribute('data-module') || 'projects', instant);
    });
  });

  var securityCards = document.querySelectorAll('.sp-sec-card[data-security]');
  var securityDetail = document.getElementById('reSecurityDetail');

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
  var onboardDetail = document.getElementById('reOnboardDetail');

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

  var proofSlides = document.getElementById('reProofSlides');
  var proofDots = document.querySelectorAll('.re-proof__dot');
  var proofPrev = document.getElementById('reProofPrev');
  var proofNext = document.getElementById('reProofNext');
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

  var propertiesEl = document.getElementById('reCalcProperties');
  var staffEl = document.getElementById('reCalcStaff');
  var hoursEl = document.getElementById('reCalcHours');
  var savingsEl = document.getElementById('reCalcSavings');
  var timeEl = document.getElementById('reCalcTime');
  var annualEl = document.getElementById('reCalcAnnual');
  var efficiencyEl = document.getElementById('reCalcEfficiency');
  var perPersonEl = document.getElementById('reCalcPerPerson');
  var barFillEl = document.getElementById('reCalcBarFill');
  var barPctEl = document.getElementById('reCalcBarPct');
  var resultPanel = document.getElementById('reCalcResult');
  var calcFields = document.querySelectorAll('.sp-calc__field');
  var calcPresets = document.querySelectorAll('.sp-calc__preset');

  var CALC_PRESETS = {
    small: { properties: 2, staff: 15, hours: 6 },
    growing: { properties: 5, staff: 30, hours: 7 },
    mid: { properties: 12, staff: 55, hours: 8 },
    large: { properties: 25, staff: 100, hours: 9 }
  };

  var calcAnim = { savings: 0, hours: 0, annual: 0, perPerson: 0, efficiency: 0, bar: 0 };
  var calcAnimFrame = null;

  function rangeFill(el, fillEl) {
    if (!el || !fillEl) return;
    var min = parseFloat(el.min);
    var max = parseFloat(el.max);
    var pct = ((parseFloat(el.value) - min) / (max - min)) * 100;
    fillEl.style.width = pct + '%';
  }

  function setCalcFieldActive(fieldName) {
    calcFields.forEach(function (field) {
      field.classList.toggle('is-active', field.getAttribute('data-field') === fieldName);
    });
  }

  function formatCurrency(n) {
    return '\u20B9' + Math.round(n).toLocaleString('en-IN');
  }

  function renderCalcOutputs(values) {
    if (savingsEl) savingsEl.textContent = formatCurrency(values.savings);
    if (timeEl) timeEl.textContent = Math.round(values.hours);
    if (annualEl) annualEl.textContent = formatCurrency(values.annual);
    if (efficiencyEl) efficiencyEl.textContent = Math.round(values.efficiency) + '%';
    if (perPersonEl) perPersonEl.textContent = Math.round(values.perPerson) + ' hrs';
    if (barFillEl) barFillEl.style.width = Math.round(values.bar) + '%';
    if (barPctEl) barPctEl.textContent = Math.round(values.bar) + '%';
  }

  function animateCalculator(from, to, duration) {
    if (calcAnimFrame) cancelAnimationFrame(calcAnimFrame);
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      renderCalcOutputs({
        savings: from.savings + (to.savings - from.savings) * eased,
        hours: from.hours + (to.hours - from.hours) * eased,
        annual: from.annual + (to.annual - from.annual) * eased,
        perPerson: from.perPerson + (to.perPerson - from.perPerson) * eased,
        efficiency: from.efficiency + (to.efficiency - from.efficiency) * eased,
        bar: from.bar + (to.bar - from.bar) * eased
      });
      if (p < 1) calcAnimFrame = requestAnimationFrame(tick);
      else calcAnim = to;
    }
    calcAnimFrame = requestAnimationFrame(tick);
  }

  function updateCalculator(instant) {
    if (!propertiesEl || !staffEl || !hoursEl) return;
    var properties = parseInt(propertiesEl.value, 10);
    var staff = parseInt(staffEl.value, 10);
    var hours = parseInt(hoursEl.value, 10);
    var monthlyHours = staff * hours * 4;
    var efficiencyPct = Math.round((0.33 + (properties - 2) * 0.007 + (staff - 15) * 0.0012) * 100);
    efficiencyPct = Math.min(Math.max(efficiencyPct, 30), 48);
    var savedHours = Math.round(monthlyHours * (efficiencyPct / 100));
    var hourlyRate = 600;
    var savings = savedHours * hourlyRate;
    var annual = savings * 12;
    var perPerson = staff ? Math.round(savedHours / staff) : 0;
    var next = { savings: savings, hours: savedHours, annual: annual, perPerson: perPerson, efficiency: efficiencyPct, bar: efficiencyPct };

    propertiesEl.setAttribute('aria-valuenow', properties);
    staffEl.setAttribute('aria-valuenow', staff);
    hoursEl.setAttribute('aria-valuenow', hours);
    var propVal = document.getElementById('reCalcPropertiesVal');
    var staffVal = document.getElementById('reCalcStaffVal');
    var hoursVal = document.getElementById('reCalcHoursVal');
    if (propVal) propVal.textContent = properties;
    if (staffVal) staffVal.textContent = staff;
    if (hoursVal) hoursVal.textContent = hours;

    rangeFill(propertiesEl, document.getElementById('reCalcPropertiesFill'));
    rangeFill(staffEl, document.getElementById('reCalcStaffFill'));
    rangeFill(hoursEl, document.getElementById('reCalcHoursFill'));

    document.querySelectorAll('.sp-calc__step').forEach(function (btn) {
      var target = document.getElementById(btn.getAttribute('data-target'));
      if (!target) return;
      var val = parseInt(target.value, 10);
      var step = parseInt(btn.getAttribute('data-step'), 10);
      btn.disabled = val + step < parseInt(target.min, 10) || val + step > parseInt(target.max, 10);
    });

    if (instant) {
      renderCalcOutputs(next);
      calcAnim = next;
      return;
    }
    if (resultPanel) {
      resultPanel.classList.add('is-pulse');
      setTimeout(function () { resultPanel.classList.remove('is-pulse'); }, 350);
    }
    animateCalculator(calcAnim, next, 420);
  }

  function applyPreset(name) {
    var preset = CALC_PRESETS[name];
    if (!preset || !propertiesEl || !staffEl || !hoursEl) return;
    propertiesEl.value = preset.properties;
    staffEl.value = preset.staff;
    hoursEl.value = preset.hours;
    calcPresets.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-preset') === name);
    });
    updateCalculator(false);
  }

  [propertiesEl, staffEl, hoursEl].forEach(function (el) {
    if (!el) return;
    el.addEventListener('input', function () {
      calcPresets.forEach(function (btn) { btn.classList.remove('is-active'); });
      updateCalculator(false);
    });
    el.addEventListener('focus', function () {
      var field = el.closest('.sp-calc__field');
      if (field) setCalcFieldActive(field.getAttribute('data-field'));
    });
  });

  document.querySelectorAll('.sp-calc__step').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-target'));
      if (!target || btn.disabled) return;
      var step = parseInt(btn.getAttribute('data-step'), 10);
      var next = parseInt(target.value, 10) + step;
      if (next < parseInt(target.min, 10) || next > parseInt(target.max, 10)) return;
      target.value = next;
      calcPresets.forEach(function (b) { b.classList.remove('is-active'); });
      updateCalculator(false);
    });
  });

  calcPresets.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyPreset(btn.getAttribute('data-preset') || 'small');
    });
  });

  calcFields.forEach(function (field) {
    field.addEventListener('mouseenter', function () {
      setCalcFieldActive(field.getAttribute('data-field'));
    });
  });

  var dashTabs = document.querySelectorAll('[data-dash]');
  var dashPanel = document.getElementById('reDashPanel');

  var DASH_DATA = {
    projects: { title: 'Project portfolio', items: [
      { label: 'Active developments', value: '8 projects', status: 'active' },
      { label: 'Budget on track', value: '6 of 8', status: 'done' },
      { label: 'RERA filings due (30d)', value: '4 pending', status: 'warn' },
      { label: 'Next possession', value: 'Tower B — Q3', status: 'active' }
    ]},
    compliance: { title: 'Compliance status', items: [
      { label: 'GST returns', value: 'All current', status: 'done' },
      { label: 'RERA registrations', value: '8 active', status: 'done' },
      { label: 'ITR reviews pending', value: '2 entities', status: 'warn' },
      { label: 'Audit engagements', value: '3 in progress', status: 'active' }
    ]},
    sales: { title: 'Sales & inventory', items: [
      { label: 'Units available', value: '142 units', status: 'active' },
      { label: 'Bookings this month', value: '18 deals', status: 'done' },
      { label: 'Open inquiries', value: '64 leads', status: 'warn' },
      { label: 'Commission payouts due', value: '\u20B912.4L', status: 'active' }
    ]}
  };

  function renderDash(id) {
    var data = DASH_DATA[id];
    if (!data || !dashPanel) return;
    var itemsHtml = data.items.map(function (item) {
      return '<div class="ca-dash__row ca-dash__row--' + item.status + '"><span>' + item.label + '</span><strong>' + item.value + '</strong></div>';
    }).join('');
    dashPanel.innerHTML = '<h4>' + data.title + '</h4>' + itemsHtml;
    dashPanel.classList.add('is-visible');
  }

  dashTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var id = tab.getAttribute('data-dash');
      dashTabs.forEach(function (t) {
        t.classList.toggle('is-active', t.getAttribute('data-dash') === id);
      });
      renderDash(id);
    });
  });

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

  var demoForm = document.getElementById('reDemoForm');
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
      var msg = document.getElementById('reFormMsg');
      if (msg) {
        msg.textContent = 'Thanks, our real estate team will reach out within 1 business day.';
        msg.classList.add('is-visible');
      }
      demoForm.reset();
    });
  }

  setPillar('portfolio', true);
  setWorkflow('acquisition', true);
  setSolution('compliance', true);
  setModule('projects', true);
  setSecurity('encrypt', true);
  setOnboard('discovery', true);
  updateCalculator(true);
  renderDash('projects');

  var hash = window.location.hash.replace(/^#/, '');
  if (hash) {
    var el = document.getElementById(hash);
    if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
  }
})();
