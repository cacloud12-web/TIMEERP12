/**
 * TIME ERP Expense Management landing, interactive explorer.
 * Features aligned with enterprise expense/reimbursement ERP practices
 * and home Expense module (Claims, Travel, Reimbursement, Reports).
 */
(function () {
  'use strict';

  var features = [
    { id: 'entry', group: 'capture', title: 'Expense Entry', icon: 'edit_note',
      desc: 'Log business spends with amount, date, payee, and cost references in one form.',
      caps: ['Create expense lines for employees, vendors, or project cost', 'Capture GST-aware amounts where tax fields apply', 'Link claims to department, site, or client context', 'Draft and submit without spreadsheet re-entry'],
      benefits: 'Finance and managers see spends as they happen, not at month-end catch-up.' },
    { id: 'categories', group: 'capture', title: 'Expense Categories', icon: 'category',
      desc: 'Standardise spend types so reports and budgets always roll up the same way.',
      caps: ['Configure organisation-wide expense categories', 'Map categories to GL/cost centre policies when used', 'Support travel, fuel, office, utilities, and project spends', 'Keep personal vs business classification clear'],
      benefits: 'Comparable reports across teams instead of free-text chaos.' },
    { id: 'receipt', group: 'capture', title: 'Receipt Upload', icon: 'receipt_long',
      desc: 'Attach bills and invoices so every claim has supporting proof.',
      caps: ['Upload receipt images or PDF invoices', 'Keep attachments with the claim record', 'Support review during multi-level approval', 'Reduce missing proof at reimbursement time'],
      benefits: 'Approvers validate policy against the actual document, not memory.' },
    { id: 'invoice-attach', group: 'capture', title: 'Invoice Attachment', icon: 'attach_file',
      desc: 'Store vendor invoices next to related expense and procurement context.',
      caps: ['Attach vendor bills to expense transactions', 'Cross-reference purchase or job documentation', 'Maintain document trail for audits', 'Connect with Document Vault when stores files centrally'],
      benefits: 'Audit trails stay complete when finance reopens historical spends.' },
    { id: 'claims', group: 'people', title: 'Employee Expense Claims', icon: 'person',
      desc: 'Employees submit claims for out-of-pocket business spends for manager review.',
      caps: ['Self-service claim submission for staff', 'Track claim status from draft to paid', 'Assign owners for follow-up on held claims', 'Separate employee claims from site procurement bills'],
      benefits: 'Staff get reimbursed faster without email trails of cash notes.' },
    { id: 'travel', group: 'people', title: 'Travel Expenses', icon: 'flight',
      desc: 'Capture trip spends fare, lodging, meals, and incidentals against policy.',
      caps: ['Group travel lines under a trip or claim', 'Record purpose and dates for policy checks', 'Support multi-city tour spends', 'Roll travel into employee reimbursement batches'],
      benefits: 'Field and sales teams reclaim costs without losing trip context.' },
    { id: 'reimburse', group: 'people', title: 'Expense Reimbursement', icon: 'payments',
      desc: 'Pay approved claims and record settlement against employees or vendors.',
      caps: ['Mark reimbursements after finance approval', 'Track pending vs paid claim amounts', 'Support payroll or finance settlement handoff', 'Keep payout history on the claim record'],
      benefits: 'Treasury knows what is still owed and what is closed.' },
    { id: 'project', group: 'control', title: 'Project Expense Tracking', icon: 'view_kanban',
      desc: 'Charge spends to jobs and projects for delivery cost visibility.',
      caps: ['Allocate lines to projects and tasks', 'View project-wise expense totals', 'Support construction site and CA client job costs', 'Compare spend against project budgets when defined'],
      benefits: 'P&L by project reflects real field spend, not only labour.' },
    { id: 'department', group: 'control', title: 'Department-wise Expenses', icon: 'group_work',
      desc: 'Roll expenses by department or business unit for operational control.',
      caps: ['Tag expenses by department', 'Compare department spend over periods', 'Support cost centre style allocation', 'Feed management reviews with clean breakouts'],
      benefits: 'Heads of department own their cost lines with clear accountability.' },
    { id: 'site', group: 'control', title: 'Site Expenses', icon: 'location_on',
      desc: 'Track spends for construction sites, branches, and field locations.',
      caps: ['Associate expenses with site or branch masters', 'Separate site peties from HO admin spends', 'Support multi-site operators and contractors', 'Report site cost for job costing reviews'],
      benefits: 'Site leakage shows up before it becomes a recovery surprise.' },
    { id: 'vendor', group: 'control', title: 'Vendor Expenses', icon: 'storefront',
      desc: 'Record supplier and contractor spends with vendor reference.',
      caps: ['Link expenses to vendor records', 'Track vendor bill payments and dues context', 'Support utilities and AMC-style vendors', 'Keep vendor history for rate discussions'],
      benefits: 'Procurement and finance share one vendor spend story.' },
    { id: 'approval', group: 'control', title: 'Expense Approval Workflow', icon: 'rule',
      desc: 'Route claims through manager and finance gates before payout.',
      caps: ['Multi-step approval for policy thresholds', 'Approve, reject, or send back for correction', 'Notify owners when action is required', 'Log every approval decision'],
      benefits: 'Policy is enforced in process, not in post-facto reprimand.' },
    { id: 'multilevel', group: 'control', title: 'Multi-Level Approval', icon: 'account_tree',
      desc: 'Stack approvers for high-value or sensitive expense classes.',
      caps: ['Configure levels by amount or category when set up', 'Escalate above manager for large claims', 'Keep finance as mandatory gate where needed', 'Preserve who approved what and when'],
      benefits: 'High-value spends get dual control without slowing every lunch claim.' },
    { id: 'budget', group: 'insight', title: 'Budget Monitoring', icon: 'monitoring',
      desc: 'Watch actual expense against department or project budgets.',
      caps: ['Compare budgeted vs actual spends', 'Highlight overruns for action', 'Support period-based budget views', 'Inform freeze or reallocation decisions'],
      benefits: 'Leadership corrects course mid-period, not only at year-end.' },
    { id: 'costcenter', group: 'insight', title: 'Cost Center Allocation', icon: 'account_balance',
      desc: 'Post expense to cost centres for management accounting.',
      caps: ['Allocate one claim across cost centres when needed', 'Align expense with internal charge dimensions', 'Support branch and practice unit reporting', 'Export allocation-ready history'],
      benefits: 'Internal P&L matches how the organisation actually spends.' },
    { id: 'gst', group: 'insight', title: 'GST and Tax Support', icon: 'percent',
      desc: 'Capture taxable components for Indian GST-style expense processing where configured.',
      caps: ['Record tax amounts on eligible expense lines', 'Keep taxable base separate from reimbursable net', 'Support ITC-oriented documentation discipline', 'Align with finance review of eligible credits'],
      benefits: 'Taxable spends stay audit-ready for finance and compliance teams.' },
    { id: 'petty', group: 'ops', title: 'Petty Cash Management', icon: 'savings',
      desc: 'Control small cash floats and field imprest spends.',
      caps: ['Log petty cash vouchers with categories', 'Track float balance and replenishment', 'Limit high-value amounts to other payment modes', 'Reconcile imprest against receipts'],
      benefits: 'Cash on site stays controlled instead of disappearing into notebooks.' },
    { id: 'recurring', group: 'ops', title: 'Recurring Expenses', icon: 'autorenew',
      desc: 'Repeat known utility and subscription spends without retyping every cycle.',
      caps: ['Mark recurring utility or retainer costs', 'Schedule reminders for monthly cycles', 'Link recurring lines to the same vendor or GL class', 'Review outliers when amount changes unexpectedly'],
      benefits: 'Routine costs stay predictable and never miss a posting cycle.' },
    { id: 'dashboard', group: 'insight', title: 'Expense Dashboard', icon: 'dashboard',
      desc: 'See totals, pending queues, and category mix in one control panel.',
      caps: ['Total, pending, approved, and rejected snapshot', 'Monthly spend and category mix', 'Approver backlog visibility', 'Jump into queues that need action'],
      benefits: 'CFOs and controllers open one screen instead of five exports.' },
    { id: 'reports', group: 'insight', title: 'Export Reports', icon: 'download',
      desc: 'Produce expense registers and analyses for finance close and leadership reviews.',
      caps: ['Export claim and payment registers', 'Filter by period, department, project, or category', 'Support statutory pack preparation workflows', 'Share with auditors without rebuilding sheets'],
      benefits: 'Month-end reviews start with numbers, not formatting work.' },
    { id: 'audit', group: 'ops', title: 'Audit Trail', icon: 'history',
      desc: 'Retain claim history, approvals, and amendment events for inspection.',
      caps: ['Immutable style history of status changes', 'Record approver comments and rejections', 'Trace attachment uploads against claims', 'Support internal and external audit requests'],
      benefits: 'Questions about who allowed a claim answer in seconds.' },
    { id: 'rbac', group: 'ops', title: 'Role-Based Access', icon: 'admin_panel_settings',
      desc: 'Limit who can create, approve, reimburse, and report on expenses.',
      caps: ['Separate employee, manager, and finance roles', 'Hide other departments where policy requires', 'Protect payroll settlement handoff permissions', 'Align with org-wide TimeERP access control'],
      benefits: 'Spend data stays in the hands of people with a need to know.' },
    { id: 'fuel', group: 'capture', title: 'Fuel Expenses', icon: 'local_gas_station',
      desc: 'Track vehicle fuel for sales, site, and logistics fleets.',
      caps: ['Log fuel amounts by vehicle or employee', 'Attach pump receipts', 'Roll fuel into travel or logistics cost pools', 'Spot unusual consumption patterns over time'],
      benefits: 'Fleet cost is managed, not left as a fuzzy monthly lump sum.' },
    { id: 'utility', group: 'capture', title: 'Utility Expenses', icon: 'bolt',
      desc: 'Post electricity, internet, and service bills with recurring vendor linkage.',
      caps: ['Record utility vendor bills', 'Tag to branch or site', 'Support period comparisons', 'Feed budget monitoring for facilities'],
      benefits: 'HO and branch facilities costs stay transparent.' }
  ];

  var list = document.getElementById('exFeatList');
  var filters = document.getElementById('exFilters');
  var panelInner = document.getElementById('exPanelInner');
  var activeId = features[0].id;
  var activeFilter = 'all';

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function findFeature(id) {
    return features.filter(function (f) { return f.id === id; })[0] || features[0];
  }

  function renderList() {
    if (!list) return;
    var visible = features.filter(function (f) {
      return activeFilter === 'all' || f.group === activeFilter;
    });
    list.innerHTML = '';
    visible.forEach(function (f) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ex-feat' + (f.id === activeId ? ' is-active' : '');
      btn.setAttribute('data-id', f.id);
      btn.innerHTML =
        '<span class="ex-feat__icon" aria-hidden="true"><span class="material-symbols-outlined">' + f.icon + '</span></span>'
        + '<span class="ex-feat__label">' + escapeHtml(f.title) + '</span>'
        + '<span class="ex-feat__desc">' + escapeHtml(f.desc) + '</span>';
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
      document.getElementById('exPanelName').textContent = f.title;
      document.getElementById('exPanelDesc').textContent = f.desc;
      document.getElementById('exPanelBenefits').textContent = f.benefits;
      document.getElementById('exPanelCaps').innerHTML = f.caps.map(function (c) {
        return '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span><span>' + escapeHtml(c) + '</span></li>';
      }).join('');
      var icon = document.getElementById('exPanelIcon');
      if (icon) icon.textContent = f.icon;
      panelInner.classList.remove('is-updating');
    }, 120);
    if (list) {
      list.querySelectorAll('.ex-feat').forEach(function (btn) {
        btn.classList.toggle('is-active', btn.getAttribute('data-id') === activeId);
      });
    }
  }

  function setFilter(filter) {
    activeFilter = filter || 'all';
    if (filters) {
      filters.querySelectorAll('.ex-filter').forEach(function (b) {
        b.classList.toggle('is-active', b.getAttribute('data-filter') === activeFilter);
      });
    }
    renderList();
    renderPanel(activeId);
  }

  if (filters) {
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.ex-filter');
      if (!btn) return;
      setFilter(btn.getAttribute('data-filter') || 'all');
    });
  }
  if (list) {
    list.addEventListener('click', function (e) {
      var btn = e.target.closest('.ex-feat');
      if (!btn) return;
      renderPanel(btn.getAttribute('data-id'));
    });
  }

  /* Workflow pulse */
  var flowSteps = document.querySelectorAll('.ex-flow__step');
  var flowArrows = document.querySelectorAll('.ex-flow__arrow');
  var flowIndex = 0;
  if (flowSteps.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(function () {
      flowSteps.forEach(function (s, i) { s.classList.toggle('is-on', i === flowIndex); });
      flowArrows.forEach(function (a, i) { a.classList.toggle('is-on', i === flowIndex || i === flowIndex - 1); });
      flowIndex = (flowIndex + 1) % flowSteps.length;
    }, 1500);
    flowSteps[0].classList.add('is-on');
  }

  /* Category highlight cycle */
  var cats = document.querySelectorAll('.ex-cat');
  var catI = 0;
  if (cats.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(function () {
      cats.forEach(function (c, i) { c.classList.toggle('is-on', i === catI); });
      catI = (catI + 1) % cats.length;
    }, 1800);
  }

  /* Counters */
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      if (el.dataset.done) return;
      var target = parseFloat(el.getAttribute('data-count') || '0', 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      var decimals = (String(el.getAttribute('data-count') || '').split('.')[1] || '').length;
      var steps = 40, n = 0;
      var timer = setInterval(function () {
        n += 1;
        var val = (target * n) / steps;
        el.textContent = prefix + (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString('en-IN')) + suffix;
        if (n >= steps) {
          clearInterval(timer);
          el.textContent = prefix + (decimals ? target.toFixed(decimals) : target.toLocaleString('en-IN')) + suffix;
          el.dataset.done = '1';
        }
      }, 28);
    });
    document.querySelectorAll('.ex-bar[data-width] span').forEach(function (bar) {
      bar.style.width = (bar.parentElement.getAttribute('data-width') || '0') + '%';
    });
  }

  /* FAQ */
  document.querySelectorAll('.ex-faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.ex-faq__item');
      var open = item.classList.contains('is-open');
      document.querySelectorAll('.ex-faq__item').forEach(function (i) { i.classList.remove('is-open'); });
      if (!open) item.classList.add('is-open');
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  });

  /* Reveal */
  var reveals = document.querySelectorAll('.ex-reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        if (entry.target.id === 'exDash') animateCounters();
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
    animateCounters();
  }

  renderList();
  renderPanel(activeId);
})();
