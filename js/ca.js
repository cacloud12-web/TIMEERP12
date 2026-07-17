(function () {
  'use strict';

  var PILLAR_DETAILS = {
    portal: {
      title: 'Branded client portal built for Indian CA firms',
      body: 'Give every client a secure TimeERP login to upload documents, approve workpapers, and pay invoices. White-labeled to your firm name, no more WhatsApp threads or lost email attachments during filing season.'
    },
    compliance: {
      title: 'Compliance command center for GST, TDS & income tax',
      body: 'Track every return, due date, and client obligation in one TimeERP dashboard. Automated reminders before deadlines, status boards for partners, and audit-ready workpaper trails across your practice.'
    },
    billing: {
      title: 'Time, billing & collections in one flow',
      body: 'Log billable hours, raise invoices from engagements, and collect payments through integrated gateways. Retainer tracking and aging reports give partners real-time revenue visibility across the practice.'
    },
    team: {
      title: 'Team collaboration without email chaos',
      body: 'Assign tasks by department, use activity feeds and @mentions on client records, and see workload by staff member. Managers reallocate work before SLAs slip, especially during peak tax season.'
    },
    scale: {
      title: 'Scale from solo practice to multi-branch firm',
      body: 'Open a branch, assign roles, and deploy existing engagement templates. Firm-wide RBAC ensures juniors see only assigned clients while partners get executive dashboards across all offices.'
    }
  };

  var WORKFLOW_CONTENT = {
    intake: { title: 'Client intake & engagement letters', body: 'Capture leads, send engagement letters with e-sign, and onboard clients into standardized pipelines. KYC documents and scope of work stored in one vault from day one.' },
    onboard: { title: 'Document collection & onboarding', body: 'Request missing documents through the client portal with automated follow-ups. Staff see a checklist per engagement, no more chasing clients over phone during March rush.' },
    compliance: { title: 'Compliance execution at scale', body: 'Run GST, TDS, payroll, and audit workflows from templates. Tasks auto-assign by service type; partners monitor progress boards across hundreds of clients simultaneously.' },
    review: { title: 'Partner review & quality control', body: 'Multi-level review chains before filing. Every change logged with user and timestamp, built for firms with strict quality and regulatory requirements.' },
    billing: { title: 'Billing, collections & retainers', body: 'Convert completed work into invoices in clicks. Track outstanding receivables, send payment reminders, and reconcile retainers against actual hours billed.' },
    advisory: { title: 'Advisory & year-round client value', body: 'Move beyond compliance with advisory engagements, MIS dashboards for clients, and proactive alerts, turning seasonal filers into year-round relationships.' }
  };

  var SOLUTION_DETAILS = {
    portal: {
      icon: 'groups',
      title: 'Client portal & secure documents',
      lead: 'TimeERP branded client experience: upload, sign, and pay without calling your office.',
      features: ['White-labeled client login', 'Secure document vault per client', 'E-signatures & approvals', 'Automated document requests', 'Activity feed & notifications'],
      stat: { value: '70%', label: 'Fewer document chase calls' }
    },
    automate: {
      icon: 'autorenew',
      title: 'Workflow automation',
      lead: 'TimeERP workflow pipelines for tax, audit, and payroll, with reminders, SLAs, and task dependencies.',
      features: ['Engagement pipeline templates', 'Deadline & SLA tracking', 'Auto-assign by service type', 'Bulk season processing', 'Escalation rules for overdue tasks'],
      stat: { value: '40%+', label: 'Less manual admin time' }
    },
    billing: {
      icon: 'payments',
      title: 'Practice billing & payments',
      lead: 'Time tracking, invoicing, and online collections, partners see firm-wide revenue in real time.',
      features: ['Time & expense capture', 'Retainer & milestone billing', 'Payment gateway integration', 'Aging & collections dashboard', 'Branch-wise revenue reports'],
      aging: {
        total: 354000,
        buckets: [
          { id: 'lt30', tier: 'current', label: '< 30 days', amount: 184000, pct: 52 },
          { id: 'd30_60', tier: 'mid', label: '30–60 days', amount: 98000, pct: 28 },
          { id: 'gt60', tier: 'late', label: '60+ days', amount: 72000, pct: 20 }
        ]
      }
    }
  };

  var MODULES = {
    tax: {
      title: 'Tax & GST compliance',
      points: ['GSTR-1 / 3B tracking & reminders', 'TDS return workflows', 'Income tax return pipelines', 'Advance tax & challan tracking', 'Client-wise compliance calendar', 'Integration with GST portal data']
    },
    audit: {
      title: 'Audit & assurance',
      points: ['Engagement planning templates', 'Workpaper management', 'Trial balance import', 'Review & sign-off chains', 'Management letter tracking', 'Audit file export for peer review']
    },
    payroll: {
      title: 'Payroll & HR for clients',
      points: ['Multi-client payroll processing', 'PF, ESI & PT compliance', 'Payslip generation & portal', 'Leave & attendance sync', 'Form 16 & statutory filings', 'Client employee self-service']
    },
    advisory: {
      title: 'Advisory & MIS',
      points: ['MIS dashboard templates', 'Cash flow & ratio analysis', 'Budget vs actual reporting', 'Virtual CFO engagement tracking', 'Board pack generation', 'Scheduled client report delivery']
    }
  };

  var SECURITY_DETAILS = {
    encrypt: { title: 'Encryption at rest & in transit', body: 'Client financials, KYC, and workpapers protected with AES-256 at rest and TLS 1.2+ on every connection, essential for regulated CA practice data.' },
    rbac: { title: 'Granular role-based access', body: 'Define permissions by office, department, and seniority. Articles see assigned clients only; partners get firm-wide visibility with full audit context.' },
    audit: { title: 'Full audit trails', body: 'Every create, update, and delete logged with user identity and timestamp. Exportable reports for internal reviews and regulatory inspections.' },
    mfa: { title: 'MFA & session controls', body: 'Multi-factor authentication on sensitive actions, configurable session timeouts, and IP-aware login policies for distributed teams.' },
    backup: { title: 'Backups & disaster recovery', body: 'Daily encrypted backups with point-in-time recovery. 24/7 infrastructure monitoring for firms that cannot afford filing-season downtime.' },
    validate: { title: 'Input validation & secure SDLC', body: 'Server-side sanitization, CSP headers, and mandatory security review on every release, protecting multi-user client portals from injection attacks.' }
  };

  var ONBOARD_DETAILS = {
    discovery: { title: 'Practice discovery call', body: 'We map your service lines, branch structure, and peak-season bottlenecks, then recommend workflows aligned to how your firm actually operates.' },
    migration: { title: 'Client data migration', body: 'Secure import from Tally, Excel, or legacy tools. Client masters, open engagements, and document histories transferred with validation checkpoints.' },
    training: { title: 'Role-based team training', body: 'Live sessions for partners, managers, and articles, plus on-demand guides for GST season, audit engagements, and portal setup.' },
    success: { title: 'Dedicated success partner', body: 'A named contact for rollout questions, quarterly workflow reviews, and peak-season support, not just a help desk ticket queue.' }
  };

  var activePillar = 'portal';
  var activeWorkflow = 'intake';
  var activeSolution = 'portal';
  var activeModule = 'tax';
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
  var pillarDetail = document.getElementById('caPillarDetail');

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
      setPillar(card.getAttribute('data-pillar') || 'portal', instant);
    });
  });

  var workflowSteps = document.querySelectorAll('.sp-workflow__step[data-step]');
  var workflowDetail = document.getElementById('caWorkflowDetail');

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
      setWorkflow(el.getAttribute('data-step') || 'intake', instant);
    });
  });

  var solutionCards = document.querySelectorAll('.sp-solution-card[data-solution]');
  var solutionPanel = document.getElementById('caSolutionPanel');

  function formatInrCompact(n) {
    if (n >= 10000000) return '\u20B9' + (n / 10000000).toFixed(2) + ' Cr';
    if (n >= 100000) return '\u20B9' + (n / 100000).toFixed(2) + 'L';
    return '\u20B9' + Math.round(n).toLocaleString('en-IN');
  }

  function renderAgingSnapshot(aging) {
    if (!aging || !aging.buckets) return '';
    var bars = aging.buckets.map(function (b) {
      return (
        '<button type="button" class="ca-aging__bar" data-aging-tier="' + b.tier + '"' +
          ' data-aging-label="' + b.label + '" data-aging-amount="' + b.amount + '"' +
          ' style="--bar-h:' + b.pct + '%" aria-label="' + b.label + ': ' + formatInrCompact(b.amount) + '">' +
          '<span class="ca-aging__bar-fill"></span>' +
          '<span class="ca-aging__bar-label">' + b.label + '</span>' +
        '</button>'
      );
    }).join('');
    return (
      '<div class="sp-solutions__panel-stat ca-aging" id="caAgingSnapshot">' +
        '<h4 class="ca-aging__title">Aging receivables snapshot</h4>' +
        '<p class="ca-aging__total">Outstanding: <strong>' + formatInrCompact(aging.total) + '</strong></p>' +
        '<div class="ca-aging__chart" role="group" aria-label="Receivables by age">' + bars + '</div>' +
        '<p class="ca-aging__tooltip" id="caAgingTooltip">Hover a bar to see the outstanding amount.</p>' +
      '</div>'
    );
  }

  function bindAgingSnapshot() {
    var root = document.getElementById('caAgingSnapshot');
    var tooltip = document.getElementById('caAgingTooltip');
    if (!root || !tooltip) return;
    var bars = root.querySelectorAll('.ca-aging__bar');
    function showBar(bar) {
      bars.forEach(function (b) { b.classList.toggle('is-hover', b === bar); });
      var label = bar.getAttribute('data-aging-label');
      var amount = parseInt(bar.getAttribute('data-aging-amount'), 10);
      tooltip.innerHTML = '<strong>' + label + ':</strong> ' + formatInrCompact(amount) + ' outstanding';
    }
    function resetBar() {
      bars.forEach(function (b) { b.classList.remove('is-hover'); });
      tooltip.textContent = 'Hover a bar to see the outstanding amount.';
    }
    bars.forEach(function (bar) {
      bar.addEventListener('mouseenter', function () { showBar(bar); });
      bar.addEventListener('focus', function () { showBar(bar); });
      bar.addEventListener('mouseleave', resetBar);
      bar.addEventListener('blur', resetBar);
    });
  }

  function renderSolutionPanel(id) {
    var detail = SOLUTION_DETAILS[id];
    if (!detail || !solutionPanel) return;
    var featuresHtml = detail.features.map(function (f) {
      return '<li><span class="material-symbols-outlined">check_circle</span>' + f + '</li>';
    }).join('');
    var sideHtml = detail.aging
      ? renderAgingSnapshot(detail.aging)
      : '<div class="sp-solutions__panel-stat"><strong>' + detail.stat.value + '</strong><span>' + detail.stat.label + '</span></div>';
    solutionPanel.innerHTML =
      '<div class="sp-solutions__panel-head">' +
        '<div class="sp-solutions__panel-icon"><span class="material-symbols-outlined">' + detail.icon + '</span></div>' +
        '<div><h3>' + detail.title + '</h3><p>' + detail.lead + '</p></div>' +
      '</div>' +
      '<div class="sp-solutions__panel-grid">' +
        '<div class="sp-solutions__panel-list"><h4>Key capabilities</h4><ul>' + featuresHtml + '</ul></div>' +
        sideHtml +
      '</div>';
    if (detail.aging) bindAgingSnapshot();
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
      setSolution(card.getAttribute('data-solution') || 'portal', instant);
    });
  });

  var moduleTabs = document.querySelectorAll('.sp-module-tab[data-module]');
  var modulePanel = document.getElementById('caModulePanel');

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
      setModule(tab.getAttribute('data-module') || 'tax', instant);
    });
  });

  var securityCards = document.querySelectorAll('.sp-sec-card[data-security]');
  var securityDetail = document.getElementById('caSecurityDetail');

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
  var onboardDetail = document.getElementById('caOnboardDetail');

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

  /* Testimonials carousel */
  var proofSlides = document.getElementById('caProofSlides');
  var proofDots = document.querySelectorAll('.ca-proof__dot');
  var proofPrev = document.getElementById('caProofPrev');
  var proofNext = document.getElementById('caProofNext');
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

  /* ROI calculator */
  var clientsEl = document.getElementById('caCalcClients');
  var staffEl = document.getElementById('caCalcStaff');
  var hoursEl = document.getElementById('caCalcHours');
  var savingsEl = document.getElementById('caCalcSavings');
  var timeEl = document.getElementById('caCalcTime');
  var annualEl = document.getElementById('caCalcAnnual');
  var efficiencyEl = document.getElementById('caCalcEfficiency');
  var perPersonEl = document.getElementById('caCalcPerPerson');
  var barFillEl = document.getElementById('caCalcBarFill');
  var barPctEl = document.getElementById('caCalcBarPct');
  var resultPanel = document.getElementById('caCalcResult');
  var calcFields = document.querySelectorAll('.sp-calc__field');
  var calcPresets = document.querySelectorAll('.sp-calc__preset');

  var CALC_PRESETS = {
    solo: { clients: 80, staff: 5, hours: 6 },
    growing: { clients: 200, staff: 15, hours: 7 },
    mid: { clients: 400, staff: 35, hours: 8 },
    large: { clients: 800, staff: 60, hours: 9 }
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
    if (!clientsEl || !staffEl || !hoursEl) return;
    var clients = parseInt(clientsEl.value, 10);
    var staff = parseInt(staffEl.value, 10);
    var hours = parseInt(hoursEl.value, 10);
    var monthlyHours = staff * hours * 4;
    var efficiencyPct = Math.round((0.36 + (clients - 50) * 0.00008 + (staff - 5) * 0.002) * 100);
    efficiencyPct = Math.min(Math.max(efficiencyPct, 32), 48);
    var savedHours = Math.round(monthlyHours * (efficiencyPct / 100));
    var hourlyRate = 750;
    var savings = savedHours * hourlyRate;
    var annual = savings * 12;
    var perPerson = staff ? Math.round(savedHours / staff) : 0;
    var next = { savings: savings, hours: savedHours, annual: annual, perPerson: perPerson, efficiency: efficiencyPct, bar: efficiencyPct };

    clientsEl.setAttribute('aria-valuenow', clients);
    staffEl.setAttribute('aria-valuenow', staff);
    hoursEl.setAttribute('aria-valuenow', hours);
    var clientsVal = document.getElementById('caCalcClientsVal');
    var staffVal = document.getElementById('caCalcStaffVal');
    var hoursVal = document.getElementById('caCalcHoursVal');
    if (clientsVal) clientsVal.textContent = clients;
    if (staffVal) staffVal.textContent = staff;
    if (hoursVal) hoursVal.textContent = hours;

    rangeFill(clientsEl, document.getElementById('caCalcClientsFill'));
    rangeFill(staffEl, document.getElementById('caCalcStaffFill'));
    rangeFill(hoursEl, document.getElementById('caCalcHoursFill'));

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
    if (!preset || !clientsEl || !staffEl || !hoursEl) return;
    clientsEl.value = preset.clients;
    staffEl.value = preset.staff;
    hoursEl.value = preset.hours;
    calcPresets.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-preset') === name);
    });
    updateCalculator(false);
  }

  [clientsEl, staffEl, hoursEl].forEach(function (el) {
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
      applyPreset(btn.getAttribute('data-preset') || 'solo');
    });
  });

  calcFields.forEach(function (field) {
    field.addEventListener('mouseenter', function () {
      setCalcFieldActive(field.getAttribute('data-field'));
    });
  });

  /* Live practice dashboard widget */
  var dashTabs = document.querySelectorAll('[data-dash]');
  var dashPanel = document.getElementById('caDashPanel');

  var DASH_DATA = {
    filings: { title: 'Filing season board', items: [
      { label: 'GSTR-3B due this week', value: '24 clients', status: 'warn' },
      { label: 'ITR pending review', value: '18 returns', status: 'active' },
      { label: 'TDS Q4 filed', value: '142 clients', status: 'done' },
      { label: 'Overdue document requests', value: '7 clients', status: 'warn' }
    ]},
    workload: { title: 'Team workload', items: [
      { label: 'Tax department', value: '86% capacity', status: 'warn' },
      { label: 'Audit team', value: '62% capacity', status: 'active' },
      { label: 'Articles, open tasks', value: '134 tasks', status: 'active' },
      { label: 'SLA at risk', value: '3 engagements', status: 'warn' }
    ]},
    revenue: { title: 'Practice revenue', items: [
      { label: 'Invoiced this month', value: '\u20B918.4L', status: 'done' },
      { label: 'Outstanding receivables', value: '\u20B94.2L', status: 'active' },
      { label: 'Retainer utilization', value: '78%', status: 'active' },
      { label: 'Unbilled WIP', value: '\u20B92.1L', status: 'warn' }
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

  var demoForm = document.getElementById('caDemoForm');
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
      var msg = document.getElementById('caFormMsg');
      if (msg) {
        msg.textContent = 'Thanks, our CA practice team will reach out within 1 business day.';
        msg.classList.add('is-visible');
      }
      demoForm.reset();
    });
  }

  setPillar('portal', true);
  setWorkflow('intake', true);
  setSolution('portal', true);
  setModule('tax', true);
  setSecurity('encrypt', true);
  setOnboard('discovery', true);
  updateCalculator(true);
  renderDash('filings');

  var hash = window.location.hash.replace(/^#/, '');
  if (hash) {
    var el = document.getElementById(hash);
    if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
  }
})();
