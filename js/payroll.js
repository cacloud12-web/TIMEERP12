/**
 * TIME ERP Payroll landing — interactive lifecycle + feature explorer.
 * Content from Products mega-nav + home Payroll card only:
 * Salary Structure, PF & ESI, TDS, Payslips, Bonuses, Reimbursements,
 * Bank Transfer, Payroll Reports.
 * Widgets use sample/illustrative values — not live account data.
 */
(function () {
  'use strict';

  var features = [
    {
      id: 'salary', group: 'structure', journey: 'structure', widget: 'salary',
      title: 'Salary Structure',
      desc: 'Define earnings and deduction components that drive every payroll cycle.',
      icon: 'assets/home-icons/task-salary.svg',
      capabilities: [
        'Configure basic, HRA, and allowance components',
        'Map statutory and non-statutory deductions',
        'Keep structures reusable across employees and cycles',
        'Feed PF, ESI, TDS, and net-pay calculation from one structure'
      ],
      benefits: 'Give finance a single component model so salary runs stay consistent instead of rebuilding spreadsheets each month.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'groups' },
      cta: { label: 'Talk to Sales', href: 'contact_sales.html' }
    },
    {
      id: 'pfesi', group: 'statutory', journey: 'statutory', widget: 'pfesi',
      title: 'PF & ESI',
      desc: 'Track employee and employer statutory contributions with ECR-ready payroll flow.',
      icon: 'assets/home-icons/task-pf.svg',
      capabilities: [
        'Calculate employee and employer PF shares from payroll inputs',
        'Support ESI contribution tracking alongside salary processing',
        'Align contribution outputs with Compliance EPFO and ESIC reporting',
        'Keep statutory shares visible before net pay finalization'
      ],
      benefits: 'Reduce last-minute PF and ESI surprises by embedding statutory shares in the same payroll run that produces payslips.',
      related: { name: 'Compliance Management', href: 'compliance_management.html', icon: 'manage_search' },
      cta: { label: 'Explore Compliance', href: 'compliance_management.html' }
    },
    {
      id: 'tds', group: 'statutory', journey: 'statutory', widget: 'tds',
      title: 'TDS',
      desc: 'Support income-tax deduction with regime context and quarterly payroll visibility.',
      icon: 'assets/home-icons/task-tds.svg',
      capabilities: [
        'Apply TDS as part of statutory payroll calculation',
        'Support Old vs New regime selection context for deduction planning',
        'Track quarterly deduction stages across the payroll year',
        'Align TDS outputs with Compliance TDS reporting'
      ],
      benefits: 'Keep tax deduction inside the payroll cycle so finance and compliance work from the same salary run.',
      related: { name: 'Compliance Management', href: 'compliance_management.html', icon: 'percent' },
      cta: { label: 'Explore TDS Reports', href: 'compliance_management.html' }
    },
    {
      id: 'payslips', group: 'payout', journey: 'payout', widget: 'payslips',
      title: 'Payslips',
      desc: 'Generate monthly payslips and distribute them after net pay is finalized.',
      icon: 'assets/home-icons/task-payslip.svg',
      capabilities: [
        'Preview monthly payslip breakdowns before distribution',
        'Support download and distribution actions after approval',
        'Keep distribution status aligned with the processing cycle',
        'Reflect earnings, deductions, and net pay from the salary structure'
      ],
      benefits: 'Give employees clear payslips from the same run finance uses for bank transfer and statutory filings.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'badge' },
      cta: { label: 'Talk to Sales', href: 'contact_sales.html' }
    },
    {
      id: 'bonuses', group: 'payout', journey: 'payout', widget: 'bonuses',
      title: 'Bonuses',
      desc: 'Include bonus payouts in variable inputs and schedule them with the payroll cycle.',
      icon: 'assets/home-icons/task-bonus.svg',
      capabilities: [
        'Capture bonus amounts as variable payroll inputs',
        'Route bonus payouts through approval before disbursement',
        'Include approved bonuses in net pay and bank transfer',
        'Keep bonus history visible in payroll reporting'
      ],
      benefits: 'Handle incentive payouts inside payroll instead of disconnected ad-hoc transfers.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'emoji_events' },
      cta: { label: 'Talk to Sales', href: 'contact_sales.html' }
    },
    {
      id: 'reimb', group: 'payout', journey: 'payout', widget: 'reimb',
      title: 'Reimbursements',
      desc: 'Track reimbursement claims through approval and include approved amounts in payout.',
      icon: 'assets/home-icons/task-expense.svg',
      capabilities: [
        'Track reimbursement claims against payroll cycles',
        'Move claims through Submitted → Review → Approved → Paid',
        'Include approved reimbursements in disbursement',
        'Keep claim context aligned with expense and payroll records'
      ],
      benefits: 'Close the loop from claim to salary payout without losing approval history.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'currency_exchange' },
      cta: { label: 'Talk to Sales', href: 'contact_sales.html' }
    },
    {
      id: 'bank', group: 'payout', journey: 'payout', widget: 'bank',
      title: 'Bank Transfer',
      desc: 'Prepare salary disbursement files and track transfer steps after net pay approval.',
      icon: 'assets/home-icons/task-payment.svg',
      capabilities: [
        'Prepare disbursement ledgers from finalized net pay',
        'Export bank files for salary credit',
        'Track prepare → export → disburse → confirm steps',
        'Keep transfer readiness aligned with the Disbursed cycle stage'
      ],
      benefits: 'Move from approved payslips to bank file export in one payroll workflow.',
      related: { name: 'Billing Management', href: 'billing.html', icon: 'account_balance' },
      cta: { label: 'Talk to Sales', href: 'contact_sales.html' }
    },
    {
      id: 'reports', group: 'reports', journey: 'reports', widget: 'reports',
      title: 'Payroll Reports',
      desc: 'Review CTC breakdowns and audit-ready payroll summaries across cycles.',
      icon: 'assets/home-icons/task-analytics.svg',
      capabilities: [
        'Summarize payroll cost components for leadership review',
        'Support CTC-oriented breakdown views from salary structure',
        'Keep audit-ready logs aligned with statutory and payout runs',
        'Connect payroll summaries with Compliance reporting needs'
      ],
      benefits: 'Give finance and leadership one place to review payroll cost and cycle outcomes.',
      related: { name: 'Compliance Management', href: 'compliance_management.html', icon: 'analytics' },
      cta: { label: 'Talk to Sales', href: 'contact_sales.html' }
    }
  ];

  var cycleMeta = {
    draft: {
      label: 'Draft',
      note: 'Draft: lock attendance and prepare variable inputs before statutory calculation.',
      doneThrough: -1,
      focus: 'attendance',
      badge: 'Draft'
    },
    pending: {
      label: 'Pending Approval',
      note: 'Pending Approval: statutory calculation and net pay are ready for review before disbursement.',
      doneThrough: 2,
      focus: 'netpay',
      badge: 'Pending Approval'
    },
    disbursed: {
      label: 'Disbursed',
      note: 'Disbursed: payslips distributed and bank transfer steps completed for the cycle.',
      doneThrough: 4,
      focus: 'bank',
      badge: 'Disbursed'
    }
  };

  var pipeOrder = ['attendance', 'variables', 'statutory', 'netpay', 'bank'];

  var list = document.getElementById('payFeatList');
  var empty = document.getElementById('payEmpty');
  var filters = document.getElementById('payFilters');
  var panelInner = document.getElementById('payPanelInner');
  var widgetEl = document.getElementById('payWidget');
  var activeId = features[0].id;
  var activeFilter = 'all';
  var activeCycle = 'draft';
  var sample = { basic: 30000, hra: 12000, allowance: 5000 };
  var pfFocus = 'ee';
  var tdsRegime = 'new';
  var claimState = 1;
  var bankStep = 1;
  var slipMonth = new Date().getMonth();

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function formatINR(n) {
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }

  function findFeature(id) {
    return features.filter(function (f) { return f.id === id; })[0] || features[0];
  }

  function computeBreakdown() {
    var basic = Math.max(0, Number(sample.basic) || 0);
    var hra = Math.max(0, Number(sample.hra) || 0);
    var allowance = Math.max(0, Number(sample.allowance) || 0);
    var earnings = basic + hra + allowance;
    var pfWage = Math.min(basic, 15000);
    var pfEE = Math.round(pfWage * 0.12);
    var pfER = Math.round(pfWage * 0.12);
    var esiBase = earnings;
    var esiEE = esiBase <= 21000 ? Math.round(esiBase * 0.0075) : 0;
    var esiER = esiBase <= 21000 ? Math.round(esiBase * 0.0325) : 0;
    var tdsEst = Math.round(earnings * (tdsRegime === 'old' ? 0.08 : 0.05));
    var deductions = pfEE + esiEE + tdsEst;
    var net = Math.max(0, earnings - deductions);
    return {
      basic: basic, hra: hra, allowance: allowance, earnings: earnings,
      pfEE: pfEE, pfER: pfER, esiEE: esiEE, esiER: esiER, tdsEst: tdsEst,
      deductions: deductions, net: net, ctc: earnings + pfER + esiER
    };
  }

  function renderSalaryWidget() {
    var b = computeBreakdown();
    var maxE = Math.max(b.earnings, 1);
    return ''
      + '<p class="pay-widget__note">Sample component calculator — adjust values to see earnings vs deductions. Illustrative PF/ESI rates only.</p>'
      + '<div class="pay-calc">'
      +   '<div class="pay-calc__grid">'
      +     '<label>Basic <input type="number" min="0" step="500" data-field="basic" value="' + b.basic + '"></label>'
      +     '<label>HRA <input type="number" min="0" step="500" data-field="hra" value="' + b.hra + '"></label>'
      +     '<label>Allowances <input type="number" min="0" step="500" data-field="allowance" value="' + b.allowance + '"></label>'
      +   '</div>'
      +   '<div class="pay-bars">'
      +     bar('Basic', b.basic, maxE, false)
      +     bar('HRA', b.hra, maxE, false)
      +     bar('Allowances', b.allowance, maxE, false)
      +     bar('Deductions', b.deductions, maxE, true)
      +   '</div>'
      +   '<div class="pay-net"><strong>Illustrative net pay</strong><span>' + formatINR(b.net) + '</span></div>'
      + '</div>';
  }

  function bar(name, val, max, isDed) {
    var pct = Math.min(100, Math.round((val / max) * 100));
    return '<div class="pay-bar"><span class="pay-bar__name">' + escapeHtml(name) + '</span>'
      + '<span class="pay-bar__track"><span class="pay-bar__fill' + (isDed ? ' pay-bar__fill--ded' : '') + '" style="width:' + pct + '%"></span></span>'
      + '<span class="pay-bar__val">' + formatINR(val) + '</span></div>';
  }

  function renderPfesiWidget() {
    var b = computeBreakdown();
    var ecr = ['Structure', 'Contributions', 'ECR prep', 'Compliance'];
    var onIdx = activeCycle === 'disbursed' ? 3 : activeCycle === 'pending' ? 2 : 1;
    return ''
      + '<p class="pay-widget__note">Employee vs employer share (illustrative). Click a share card; ECR steps follow the cycle stage.</p>'
      + '<div class="pay-share">'
      +   '<button type="button" class="pay-share__card' + (pfFocus === 'ee' ? ' is-active' : '') + '" data-share="ee">'
      +     '<strong>Employee share</strong><em>' + formatINR(b.pfEE + b.esiEE) + '</em>'
      +     '<p>PF EE ' + formatINR(b.pfEE) + ' · ESI EE ' + formatINR(b.esiEE) + '</p>'
      +   '</button>'
      +   '<button type="button" class="pay-share__card' + (pfFocus === 'er' ? ' is-active' : '') + '" data-share="er">'
      +     '<strong>Employer share</strong><em>' + formatINR(b.pfER + b.esiER) + '</em>'
      +     '<p>PF ER ' + formatINR(b.pfER) + ' · ESI ER ' + formatINR(b.esiER) + '</p>'
      +   '</button>'
      + '</div>'
      + '<div class="pay-ecr" aria-label="ECR workflow">'
      + ecr.map(function (label, i) {
        return (i ? '<span class="pay-ecr__arrow" aria-hidden="true">→</span>' : '')
          + '<span class="pay-ecr__node' + (i <= onIdx ? ' is-on' : '') + '">' + escapeHtml(label) + '</span>';
      }).join('')
      + '</div>';
  }

  function renderTdsWidget() {
    var quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    var onQ = activeCycle === 'disbursed' ? 3 : activeCycle === 'pending' ? 1 : 0;
    return ''
      + '<p class="pay-widget__note">Regime selector and quarterly tracking are structural demos—not a full tax engine.</p>'
      + '<div class="pay-regime">'
      +   '<button type="button" class="' + (tdsRegime === 'old' ? 'is-active' : '') + '" data-regime="old">Old regime</button>'
      +   '<button type="button" class="' + (tdsRegime === 'new' ? 'is-active' : '') + '" data-regime="new">New regime</button>'
      + '</div>'
      + '<p class="pay-widget__note" style="margin-bottom:10px">'
      +   (tdsRegime === 'old'
        ? 'Old regime context: exemptions and deductions influence planning before payroll TDS.'
        : 'New regime context: simplified slab planning with fewer exemption layers.')
      + '</p>'
      + '<div class="pay-q">'
      + quarters.map(function (q, i) {
        return '<button type="button" class="pay-q__item' + (i <= onQ ? ' is-on' : '') + '" data-q="' + i + '">'
          + escapeHtml(q) + '<span>' + (i <= onQ ? 'In cycle view' : 'Upcoming') + '</span></button>';
      }).join('')
      + '</div>';
  }

  function renderPayslipsWidget() {
    var b = computeBreakdown();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var status = cycleMeta[activeCycle].label;
    var logs = activeCycle === 'disbursed'
      ? ['Payslip generated', 'Distribution queued', 'Employee copy available']
      : activeCycle === 'pending'
        ? ['Payslip preview ready', 'Awaiting approval', 'Distribution held']
        : ['Draft structure applied', 'Preview available', 'Distribution not started'];
    return ''
      + '<p class="pay-widget__note">Monthly preview card — sample figures from the structure calculator.</p>'
      + '<div class="pay-slip">'
      +   '<div class="pay-slip__head">'
      +     '<strong>Payslip preview</strong>'
      +     '<select id="paySlipMonth" aria-label="Payslip month">'
      +       months.map(function (m, i) {
        return '<option value="' + i + '"' + (i === slipMonth ? ' selected' : '') + '>' + m + '</option>';
      }).join('')
      +     '</select>'
      +   '</div>'
      +   '<div class="pay-slip__rows">'
      +     '<div><span>Gross earnings</span><strong>' + formatINR(b.earnings) + '</strong></div>'
      +     '<div><span>Deductions</span><strong>' + formatINR(b.deductions) + '</strong></div>'
      +     '<div><span>Net pay</span><strong>' + formatINR(b.net) + '</strong></div>'
      +     '<div><span>Cycle status</span><strong>' + escapeHtml(status) + '</strong></div>'
      +   '</div>'
      +   '<div class="pay-slip__actions">'
      +     '<button type="button" class="btn btn--primary btn--sm" data-slip-action="download">Download preview</button>'
      +     '<button type="button" class="btn btn--ghost btn--sm" data-slip-action="distribute"' + (activeCycle === 'draft' ? ' disabled' : '') + '>Distribute</button>'
      +   '</div>'
      +   '<ul class="pay-log" id="paySlipLog">'
      +     logs.map(function (l) {
        return '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span><span>' + escapeHtml(l) + '</span></li>';
      }).join('')
      +   '</ul>'
      + '</div>';
  }

  function renderClaimsWidget(kind) {
    var states = ['Submitted', 'Under Review', 'Approved', 'Paid'];
    var items = kind === 'bonuses'
      ? [{ name: 'Performance bonus', amount: 'Sample' }, { name: 'Festival bonus', amount: 'Sample' }]
      : [{ name: 'Travel reimbursement', amount: 'Sample' }, { name: 'Internet allowance', amount: 'Sample' }];
    return ''
      + '<p class="pay-widget__note">Approval state machine — click a stage. Sample claim rows only.</p>'
      + '<div class="pay-states" role="tablist">'
      + states.map(function (s, i) {
        var cls = i === claimState ? ' is-active' : (i < claimState ? ' is-done' : '');
        return '<button type="button" class="pay-state' + cls + '" data-claim-state="' + i + '">' + escapeHtml(s) + '</button>';
      }).join('')
      + '</div>'
      + items.map(function (it) {
        return '<div class="pay-claim"><span><strong>' + escapeHtml(it.name) + '</strong><span>' + escapeHtml(it.amount) + ' · ' + escapeHtml(states[claimState]) + '</span></span>'
          + '<em>' + escapeHtml(states[claimState]) + '</em></div>';
      }).join('');
  }

  function renderBankWidget() {
    var steps = [
      { title: 'Prepare ledger', sub: 'Pull finalized net pay lines' },
      { title: 'Export bank file', sub: 'Generate disbursement file' },
      { title: 'Disburse', sub: 'Submit to bank channel' },
      { title: 'Confirm', sub: 'Mark cycle disbursed' }
    ];
    if (activeCycle === 'draft') bankStep = 0;
    else if (activeCycle === 'pending') bankStep = Math.min(bankStep, 1);
    else if (activeCycle === 'disbursed') bankStep = 3;
    return ''
      + '<p class="pay-widget__note">Disbursement steps — click to walk the export path. Tied to cycle stage.</p>'
      + '<div class="pay-bank">'
      + steps.map(function (s, i) {
        var cls = i === bankStep ? ' is-active' : (i < bankStep ? ' is-done' : '');
        return '<button type="button" class="pay-bank__step' + cls + '" data-bank-step="' + i + '">'
          + '<span class="pay-bank__num">' + (i + 1) + '</span>'
          + '<span><strong>' + escapeHtml(s.title) + '</strong><span>' + escapeHtml(s.sub) + '</span></span>'
          + '</button>';
      }).join('')
      + '</div>';
  }

  function renderReportsWidget() {
    var b = computeBreakdown();
    var parts = [
      { name: 'Basic', val: b.basic },
      { name: 'HRA', val: b.hra },
      { name: 'Allow.', val: b.allowance },
      { name: 'ER PF/ESI', val: b.pfER + b.esiER }
    ];
    var max = Math.max.apply(null, parts.map(function (p) { return p.val; }).concat([1]));
    return ''
      + '<p class="pay-widget__note">Sample CTC component chart from the structure calculator values.</p>'
      + '<div class="pay-net" style="margin-top:0;margin-bottom:12px"><strong>Illustrative CTC</strong><span>' + formatINR(b.ctc) + '</span></div>'
      + '<div class="pay-chart">'
      + parts.map(function (p) {
        var h = Math.max(8, Math.round((p.val / max) * 90));
        return '<div class="pay-chart__col"><div class="pay-chart__bar" style="height:' + h + 'px" title="' + escapeHtml(formatINR(p.val)) + '"></div><span>' + escapeHtml(p.name) + '</span></div>';
      }).join('')
      + '</div>';
  }

  function renderWidget(type) {
    if (!widgetEl) return;
    if (type === 'salary') widgetEl.innerHTML = renderSalaryWidget();
    else if (type === 'pfesi') widgetEl.innerHTML = renderPfesiWidget();
    else if (type === 'tds') widgetEl.innerHTML = renderTdsWidget();
    else if (type === 'payslips') widgetEl.innerHTML = renderPayslipsWidget();
    else if (type === 'bonuses') widgetEl.innerHTML = renderClaimsWidget('bonuses');
    else if (type === 'reimb') widgetEl.innerHTML = renderClaimsWidget('reimb');
    else if (type === 'bank') widgetEl.innerHTML = renderBankWidget();
    else if (type === 'reports') widgetEl.innerHTML = renderReportsWidget();
    else widgetEl.innerHTML = '';
  }

  function renderList() {
    if (!list) return;
    var visible = features.filter(function (f) {
      return activeFilter === 'all' || f.group === activeFilter;
    });
    if (empty) empty.classList.toggle('is-visible', !visible.length);
    list.querySelectorAll('.mkt-feat').forEach(function (el) { el.remove(); });
    visible.forEach(function (f) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mkt-feat' + (f.id === activeId ? ' is-active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', f.id === activeId ? 'true' : 'false');
      btn.setAttribute('data-id', f.id);
      btn.innerHTML =
        '<span class="mkt-feat__top">'
        + '<span class="mkt-feat__icon" aria-hidden="true"><img src="' + escapeHtml(f.icon) + '" alt="" width="24" height="24"></span>'
        + '<span class="mkt-feat__check" aria-hidden="true"><span class="material-symbols-outlined">check</span></span>'
        + '</span>'
        + '<span class="mkt-feat__label">' + escapeHtml(f.title) + '</span>'
        + '<span class="mkt-feat__desc">' + escapeHtml(f.desc) + '</span>';
      list.appendChild(btn);
    });
    if (visible.length && !visible.some(function (f) { return f.id === activeId; })) {
      activeId = visible[0].id;
      renderPanel(activeId);
    }
  }

  function renderPanel(id) {
    var f = findFeature(id);
    activeId = f.id;
    if (!panelInner) return;
    panelInner.classList.add('is-updating');
    setTimeout(function () {
      document.getElementById('payPanelIcon').src = f.icon;
      document.getElementById('payPanelName').textContent = f.title;
      document.getElementById('payPanelDesc').textContent = f.desc;
      document.getElementById('payPanelBenefits').textContent = f.benefits;
      document.getElementById('payPanelBadge').textContent = cycleMeta[activeCycle].badge;
      document.getElementById('payPanelCaps').innerHTML = f.capabilities.map(function (c) {
        return '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span><span>' + escapeHtml(c) + '</span></li>';
      }).join('');
      document.getElementById('payPanelRelated').innerHTML =
        '<a class="mkt-related__chip" href="' + escapeHtml(f.related.href) + '">'
        + '<span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(f.related.icon) + '</span>'
        + escapeHtml(f.related.name) + '</a>';
      var cta = document.getElementById('payPanelCta');
      cta.textContent = f.cta.label;
      cta.href = f.cta.href;
      renderWidget(f.widget);
      panelInner.classList.remove('is-updating');
    }, 120);
    if (list) {
      list.querySelectorAll('.mkt-feat').forEach(function (btn) {
        var on = btn.getAttribute('data-id') === activeId;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
    syncJourney(f.journey);
  }

  function syncJourney(journeyId) {
    var journey = document.getElementById('payJourney');
    if (!journey) return;
    journey.querySelectorAll('[data-journey]').forEach(function (s) {
      s.classList.toggle('is-active', s.getAttribute('data-journey') === journeyId);
    });
  }

  function setFilter(filter) {
    activeFilter = filter || 'all';
    if (filters) {
      filters.querySelectorAll('.mkt-filter').forEach(function (b) {
        var on = b.getAttribute('data-filter') === activeFilter;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
    renderList();
    renderPanel(activeId);
  }

  function openFeature(id) {
    setFilter('all');
    renderPanel(id);
    var explorer = document.getElementById('pay-explorer');
    if (explorer) explorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function applyCycle(cycle) {
    activeCycle = cycleMeta[cycle] ? cycle : 'draft';
    var meta = cycleMeta[activeCycle];
    var cycles = document.getElementById('payCycles');
    if (cycles) {
      cycles.querySelectorAll('.pay-cycle').forEach(function (b) {
        var on = b.getAttribute('data-cycle') === activeCycle;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
    var note = document.getElementById('payCycleNote');
    if (note) note.textContent = meta.note;
    var pipe = document.getElementById('payPipe');
    if (pipe) {
      pipe.querySelectorAll('.pay-node').forEach(function (node) {
        var key = node.getAttribute('data-pipe');
        var idx = pipeOrder.indexOf(key);
        node.classList.toggle('is-done', idx >= 0 && idx <= meta.doneThrough);
        node.classList.toggle('is-active', key === meta.focus);
        node.classList.toggle('is-focus', key === meta.focus);
      });
    }
    var badge = document.getElementById('payPanelBadge');
    if (badge) badge.textContent = meta.badge;
    var f = findFeature(activeId);
    renderWidget(f.widget);
  }

  function journeyToFilter(journey) {
    if (journey === 'structure') return 'structure';
    if (journey === 'statutory') return 'statutory';
    if (journey === 'payout') return 'payout';
    if (journey === 'reports') return 'reports';
    return 'all';
  }

  function journeyDefaultFeature(journey) {
    if (journey === 'structure') return 'salary';
    if (journey === 'statutory') return 'pfesi';
    if (journey === 'payout') return 'payslips';
    if (journey === 'reports') return 'reports';
    return 'salary';
  }

  if (filters) {
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.mkt-filter');
      if (!btn) return;
      setFilter(btn.getAttribute('data-filter') || 'all');
    });
  }

  if (list) {
    list.addEventListener('click', function (e) {
      var btn = e.target.closest('.mkt-feat');
      if (!btn) return;
      renderPanel(btn.getAttribute('data-id'));
    });
  }

  var journey = document.getElementById('payJourney');
  if (journey) {
    journey.addEventListener('click', function (e) {
      var step = e.target.closest('[data-journey]');
      if (!step) return;
      var j = step.getAttribute('data-journey');
      setFilter(journeyToFilter(j));
      renderPanel(journeyDefaultFeature(j));
      var explorer = document.getElementById('pay-explorer');
      if (explorer) explorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  document.querySelectorAll('[data-jump]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var id = el.getAttribute('data-jump');
      if (!id) return;
      e.preventDefault();
      openFeature(id);
    });
  });

  var cycles = document.getElementById('payCycles');
  if (cycles) {
    cycles.addEventListener('click', function (e) {
      var btn = e.target.closest('.pay-cycle');
      if (!btn) return;
      applyCycle(btn.getAttribute('data-cycle'));
    });
  }

  var pipe = document.getElementById('payPipe');
  if (pipe) {
    pipe.addEventListener('click', function (e) {
      var node = e.target.closest('.pay-node');
      if (!node) return;
      var key = node.getAttribute('data-pipe');
      pipe.querySelectorAll('.pay-node').forEach(function (n) {
        n.classList.toggle('is-focus', n === node);
        n.classList.toggle('is-active', n === node);
      });
      if (key === 'attendance' || key === 'variables') applyCycle('draft');
      else if (key === 'statutory' || key === 'netpay') applyCycle('pending');
      else if (key === 'bank') applyCycle('disbursed');
      if (key === 'statutory') openFeature('pfesi');
      else if (key === 'netpay') openFeature('payslips');
      else if (key === 'bank') openFeature('bank');
      else if (key === 'variables') openFeature('bonuses');
      else openFeature('salary');
    });
  }

  if (widgetEl) {
    widgetEl.addEventListener('input', function (e) {
      var input = e.target.closest('[data-field]');
      if (!input) return;
      sample[input.getAttribute('data-field')] = input.value;
      renderWidget(findFeature(activeId).widget);
    });
    widgetEl.addEventListener('click', function (e) {
      var share = e.target.closest('[data-share]');
      if (share) { pfFocus = share.getAttribute('data-share'); renderWidget('pfesi'); return; }
      var regime = e.target.closest('[data-regime]');
      if (regime) { tdsRegime = regime.getAttribute('data-regime'); renderWidget(findFeature(activeId).widget); return; }
      var claim = e.target.closest('[data-claim-state]');
      if (claim) { claimState = Number(claim.getAttribute('data-claim-state')); renderWidget(findFeature(activeId).widget); return; }
      var bank = e.target.closest('[data-bank-step]');
      if (bank) { bankStep = Number(bank.getAttribute('data-bank-step')); renderWidget('bank'); return; }
      var slipAct = e.target.closest('[data-slip-action]');
      if (slipAct) {
        var log = document.getElementById('paySlipLog');
        var action = slipAct.getAttribute('data-slip-action');
        if (log) {
          var msg = action === 'download' ? 'Preview download triggered (demo)' : 'Distribution action triggered (demo)';
          log.insertAdjacentHTML('afterbegin', '<li><span class="material-symbols-outlined" aria-hidden="true">bolt</span><span>' + escapeHtml(msg) + '</span></li>');
        }
      }
    });
    widgetEl.addEventListener('change', function (e) {
      if (e.target && e.target.id === 'paySlipMonth') {
        slipMonth = Number(e.target.value);
      }
    });
  }

  applyCycle('draft');
  renderList();
  renderPanel(activeId);

  /* Deep links from home.html HRMS cards (e.g. payroll.html#payslips) */
  (function applyHashFeature() {
    var key = (location.hash || '').replace(/^#/, '').split(/[?&]/)[0].toLowerCase();
    if (!key) return;
    var map = {
      payslips: 'payslips',
      payslip: 'payslips',
      salary: 'salary',
      tds: 'tds',
      pfesi: 'pfesi',
      pf: 'pfesi',
      esi: 'pfesi',
      bonuses: 'bonuses',
      bank: 'bank',
      reports: 'reports'
    };
    var id = map[key];
    if (id && findFeature(id)) openFeature(id);
  })();
})();
