/**
 * TIME ERP Dashboard landing, interactive feature explorer.
 * Content from Products mega-nav: Business Overview, Revenue Analytics,
 * Attendance Summary, Project Status, Alerts, Custom Widgets, Exports.
 * Sample/illustrative values only, not live account data.
 */
(function () {
  'use strict';

  var FEATURE_IDS = {
    overview: 1, revenue: 1, attendance: 1, projects: 1, alerts: 1, widgets: 1, exports: 1
  };

  var features = [
    {
      id: 'overview', group: 'insights', journey: 'see',
      title: 'Business Overview',
      desc: 'See the live pulse of your organization, people, delivery, and operations, in one opening view.',
      icon: 'assets/home-icons/task-overview.svg',
      capabilities: [
        'Open the workspace with a consolidated business snapshot',
        'Scan attendance, projects, and revenue signals side by side',
        'Jump from overview tiles into the related TIME ERP module',
        'Keep partners and managers aligned on the same daily picture'
      ],
      benefits: 'Replace scattered status checks with one landing view so leadership starts every day from shared context.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'groups' },
      cta: { label: 'Talk to Sales', href: 'contact_sales.html' },
      widget: 'overview'
    },
    {
      id: 'revenue', group: 'insights', journey: 'see',
      title: 'Revenue Analytics',
      desc: 'Track billing and collection trends that feed leadership decisions without leaving the dashboard.',
      icon: 'assets/home-icons/task-analytics.svg',
      capabilities: [
        'Review revenue movement alongside operational status',
        'Spot collection and billing patterns that need follow-up',
        'Connect overview signals to Billing and CRM detail screens',
        'Support partner reviews with a shared revenue lens'
      ],
      benefits: 'Give finance and delivery the same revenue context so reviews focus on action, not reconciling spreadsheets.',
      related: { name: 'Billing Management', href: 'billing.html', icon: 'receipt_long' },
      cta: { label: 'Explore Billing', href: 'billing.html' },
      widget: 'revenue'
    },
    {
      id: 'attendance', group: 'operations', journey: 'monitor',
      title: 'Attendance Summary',
      desc: 'Monitor presence, leave, and shift signals from HRMS without opening every attendance report first.',
      icon: 'assets/home-icons/attendance.svg',
      capabilities: [
        'See daily presence and leave signals on the home dashboard',
        'Spot anomalies before payroll lock and shift planning',
        'Drill into HRMS attendance for employee-level detail',
        'Keep managers aware of field and office coverage'
      ],
      benefits: 'Surface attendance health early so payroll and delivery are not surprised at month end.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'fingerprint' },
      cta: { label: 'Explore HRMS', href: 'hrms.html' },
      widget: 'attendance'
    },
    {
      id: 'projects', group: 'operations', journey: 'monitor',
      title: 'Project Status',
      desc: 'Follow client work progress, open tasks, and delivery risk from Project Management in one status strip.',
      icon: 'assets/home-icons/project-management.svg',
      capabilities: [
        'View active project and task status at a glance',
        'Identify delayed or at-risk work before client escalations',
        'Jump into Project Management for assignment and timesheets',
        'Align delivery leads on the same status board'
      ],
      benefits: 'Keep delivery visible to leadership without exporting project trackers every morning.',
      related: { name: 'Project Management', href: 'project_management.html', icon: 'view_kanban' },
      cta: { label: 'Explore Projects', href: 'project_management.html' },
      widget: 'projects'
    },
    {
      id: 'alerts', group: 'actions', journey: 'act',
      title: 'Alerts',
      desc: 'Surface notifications and action items that need attention across modules.',
      icon: 'assets/home-icons/task-bell.svg',
      capabilities: [
        'Consolidate operational alerts in the dashboard inbox',
        'Prioritize approvals, reminders, and deadline notices',
        'Open the source module directly from an alert',
        'Reduce missed follow-ups across HR, finance, and delivery'
      ],
      benefits: 'Turn scattered notifications into a single action queue for managers and admins.',
      related: { name: 'Setup', href: 'setup.html', icon: 'notifications' },
      cta: { label: 'Talk to Sales', href: 'contact_sales.html' },
      widget: 'alerts'
    },
    {
      id: 'widgets', group: 'personalize', journey: 'act',
      title: 'Custom Widgets',
      desc: 'Arrange the dashboard around the signals your role needs most.',
      icon: 'assets/home-icons/task-custom.svg',
      capabilities: [
        'Focus the home view on modules relevant to your role',
        'Keep overview, analytics, and alerts in a layout that fits how you work',
        'Reduce noise for partners, managers, and specialists',
        'Stay inside TIME ERP instead of maintaining separate scorecards'
      ],
      benefits: 'Let each role see what matters without building a second reporting tool.',
      related: { name: 'Setup', href: 'setup.html', icon: 'tune' },
      cta: { label: 'Talk to Sales', href: 'contact_sales.html' },
      widget: 'widgets'
    },
    {
      id: 'exports', group: 'personalize', journey: 'share',
      title: 'Exports',
      desc: 'Share dashboard-backed summaries for reviews, boards, and client updates.',
      icon: 'assets/home-icons/task-share.svg',
      capabilities: [
        'Export snapshot views for offline review',
        'Support partner and client meeting packs from live context',
        'Keep exports aligned with what leaders already see on screen',
        'Reduce manual copy-paste from multiple modules'
      ],
      benefits: 'Move from live dashboard to shareable summary without rebuilding the story in Excel.',
      related: { name: 'Compliance Management', href: 'compliance_management.html', icon: 'summarize' },
      cta: { label: 'Talk to Sales', href: 'contact_sales.html' },
      widget: 'exports'
    }
  ];

  var periods = {
    today: {
      label: 'Today',
      present: 86, tasks: 124, projects: 18,
      invoiced: 78, collected: 64, pipeline: 52,
      ontime: 72, leave: 9, late: 6
    },
    week: {
      label: 'This week',
      present: 91, tasks: 98, projects: 17,
      invoiced: 82, collected: 71, pipeline: 58,
      ontime: 80, leave: 7, late: 4
    },
    month: {
      label: 'This month',
      present: 88, tasks: 210, projects: 22,
      invoiced: 90, collected: 76, pipeline: 61,
      ontime: 84, leave: 8, late: 5
    }
  };

  var roleLayouts = {
    partner: ['overview', 'revenue', 'projects', 'alerts'],
    manager: ['overview', 'attendance', 'projects', 'alerts'],
    hr: ['attendance', 'alerts', 'overview', 'widgets']
  };

  var alertSeed = [
    { id: 'a1', text: '3 leave approvals pending', tag: 'Action', href: 'hrms.html', done: false },
    { id: 'a2', text: 'Invoice overdue, 2 clients', tag: 'Follow-up', href: 'billing.html', done: false },
    { id: 'a3', text: 'Attendance lock reminder', tag: 'Today', href: 'payroll.html', done: false },
    { id: 'a4', text: 'Project at risk, Audit pack', tag: 'Delivery', href: 'project_management.html', done: false }
  ];

  var projectSeed = [
    { name: 'GST filings, Q1', status: 'On track', tone: 'ok' },
    { name: 'Audit pack, Apex', status: 'At risk', tone: 'risk' },
    { name: 'Payroll cutover', status: 'In review', tone: 'warn' },
    { name: 'Client onboarding, Nova', status: 'On track', tone: 'ok' }
  ];

  var state = {
    filter: 'all',
    activeId: 'overview',
    period: 'today',
    role: 'partner',
    widgetsOn: { overview: true, revenue: true, attendance: true, projects: true, alerts: true },
    alerts: alertSeed.map(function (a) { return Object.assign({}, a); }),
    autoplay: false,
    autoTimer: null,
    panelTimer: null
  };

  function $(id) { return document.getElementById(id); }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function findFeature(id) {
    for (var i = 0; i < features.length; i++) if (features[i].id === id) return features[i];
    return null;
  }

  function visibleFeatures() {
    return features.filter(function (f) {
      return state.filter === 'all' || f.group === state.filter;
    });
  }

  function toast(msg) {
    var el = $('dashToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'dashToast';
      el.className = 'dash-toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('is-show'); }, 2200);
  }

  function periodData() { return periods[state.period] || periods.today; }

  function groupLabel(g) {
    return g === 'insights' ? 'Insights' : g === 'operations' ? 'Operations' : g === 'actions' ? 'Actions' : 'Personalize';
  }

  /* --- Interactive widgets --- */
  function widgetOverview() {
    var d = periodData();
    return ''
      + '<p class="dash-w__note">Sample snapshot for <strong>' + escapeHtml(d.label) + '</strong>. Click a tile to open that capability.</p>'
      + '<div class="dash-w__tiles">'
      +   tileBtn('attendance', d.present + '%', 'Present today')
      +   tileBtn('projects', String(d.tasks), 'Open tasks')
      +   tileBtn('projects', String(d.projects), 'Active projects')
      + '</div>';
  }

  function tileBtn(jump, value, label) {
    return '<button type="button" class="dash-w__tile" data-jump="' + jump + '"><strong data-count="' + escapeHtml(value) + '">' + escapeHtml(value) + '</strong><span>' + escapeHtml(label) + '</span></button>';
  }

  function widgetRevenue() {
    var d = periodData();
    return ''
      + '<p class="dash-w__note">Illustrative billing lens, change period above the live board. Hover bars for detail.</p>'
      + '<div class="dash-w__bars">'
      +   barRow('Invoiced', d.invoiced)
      +   barRow('Collected', d.collected)
      +   barRow('Pipeline', d.pipeline)
      + '</div>'
      + '<button type="button" class="btn btn--ghost btn--sm dash-w__btn" data-sim-refresh="revenue">Refresh sample</button>';
  }

  function barRow(label, pct) {
    return '<div class="dash-w__bar" title="' + escapeHtml(label) + ': ' + pct + '%">'
      + '<span>' + escapeHtml(label) + '</span>'
      + '<div class="dash-w__track"><i style="--w:' + pct + '%"></i></div>'
      + '<em>' + pct + '%</em></div>';
  }

  function widgetAttendance() {
    var d = periodData();
    return ''
      + '<p class="dash-w__note">Presence mix for <strong>' + escapeHtml(d.label) + '</strong> (sample). Click a ring to focus.</p>'
      + '<div class="dash-w__rings">'
      +   ring('On time', d.ontime, 'ok')
      +   ring('On leave', d.leave, 'warn')
      +   ring('Late / OT', d.late, 'risk')
      + '</div>';
  }

  function ring(label, pct, tone) {
    return '<button type="button" class="dash-w__ring dash-w__ring--' + tone + '" data-ring="' + escapeHtml(label) + '" style="--p:' + pct + '">'
      + '<strong>' + pct + '%</strong><span>' + escapeHtml(label) + '</span></button>';
  }

  function widgetProjects() {
    return ''
      + '<p class="dash-w__note">Sample delivery board, click a row to highlight status.</p>'
      + '<ul class="dash-w__list">' + projectSeed.map(function (p, i) {
        return '<li><button type="button" class="dash-w__row" data-project="' + i + '"><span>' + escapeHtml(p.name)
          + '</span><b class="is-' + p.tone + '">' + escapeHtml(p.status) + '</b></button></li>';
      }).join('') + '</ul>';
  }

  function widgetAlerts() {
    var open = state.alerts.filter(function (a) { return !a.done; });
    if (!open.length) {
      return '<p class="dash-w__note">All sample alerts cleared. <button type="button" class="dash-w__link" data-alert-reset>Reset sample alerts</button></p>';
    }
    return ''
      + '<p class="dash-w__note">Interactive queue, mark done or open the related module.</p>'
      + '<ul class="dash-w__alerts">' + open.map(function (a) {
        return '<li data-alert-id="' + escapeHtml(a.id) + '">'
          + '<div><strong>' + escapeHtml(a.text) + '</strong><em>' + escapeHtml(a.tag) + '</em></div>'
          + '<div class="dash-w__alert-actions">'
          +   '<button type="button" class="btn btn--ghost btn--sm" data-alert-done="' + escapeHtml(a.id) + '">Done</button>'
          +   '<a class="btn btn--primary btn--sm" href="' + escapeHtml(a.href) + '">Open</a>'
          + '</div></li>';
      }).join('') + '</ul>';
  }

  function widgetCustom() {
    var keys = ['overview', 'revenue', 'attendance', 'projects', 'alerts'];
    var labels = { overview: 'Overview', revenue: 'Revenue', attendance: 'Attendance', projects: 'Projects', alerts: 'Alerts' };
    return ''
      + '<p class="dash-w__note">Toggle widgets for role <strong>' + escapeHtml(state.role) + '</strong>. Layout updates the live board.</p>'
      + '<div class="dash-w__chips">' + keys.map(function (k) {
        var on = !!state.widgetsOn[k];
        return '<button type="button" class="dash-w__chip' + (on ? ' is-on' : '') + '" data-widget-toggle="' + k + '" aria-pressed="' + (on ? 'true' : 'false') + '">'
          + escapeHtml(labels[k]) + '</button>';
      }).join('') + '</div>'
      + '<p class="dash-w__hint">' + keys.filter(function (k) { return state.widgetsOn[k]; }).length + ' of ' + keys.length + ' widgets visible</p>';
  }

  function widgetExports() {
    return ''
      + '<p class="dash-w__note">Simulate export packs from the current sample view (demo only).</p>'
      + '<div class="dash-w__export">'
      +   '<button type="button" class="dash-w__export-btn" data-export="pdf"><span class="material-symbols-outlined" aria-hidden="true">picture_as_pdf</span> PDF pack</button>'
      +   '<button type="button" class="dash-w__export-btn" data-export="csv"><span class="material-symbols-outlined" aria-hidden="true">table_view</span> CSV extract</button>'
      +   '<button type="button" class="dash-w__export-btn" data-export="summary"><span class="material-symbols-outlined" aria-hidden="true">description</span> Meeting summary</button>'
      + '</div>'
      + '<ul class="dash-w__log" id="dashExportLog"></ul>';
  }

  function renderWidget(f) {
    if (f.widget === 'overview') return widgetOverview();
    if (f.widget === 'revenue') return widgetRevenue();
    if (f.widget === 'attendance') return widgetAttendance();
    if (f.widget === 'projects') return widgetProjects();
    if (f.widget === 'alerts') return widgetAlerts();
    if (f.widget === 'widgets') return widgetCustom();
    if (f.widget === 'exports') return widgetExports();
    return '';
  }

  function animateBars() {
    requestAnimationFrame(function () {
      document.querySelectorAll('.dash-w__track i').forEach(function (el) {
        el.style.width = '0%';
        requestAnimationFrame(function () {
          el.style.width = getComputedStyle(el).getPropertyValue('--w') || '0%';
        });
      });
    });
  }

  /* --- Feature list + panel --- */
  function renderFeatures() {
    var list = $('dashFeatList');
    var empty = $('dashEmpty');
    if (!list) return;
    var visible = visibleFeatures();
    if (empty) empty.classList.toggle('is-visible', !visible.length);
    list.querySelectorAll('.mkt-feat').forEach(function (el) { el.remove(); });
    visible.forEach(function (f) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mkt-feat' + (f.id === state.activeId ? ' is-active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', f.id === state.activeId ? 'true' : 'false');
      btn.setAttribute('data-id', f.id);
      btn.innerHTML = ''
        + '<div class="mkt-feat__top">'
        +   '<span class="mkt-feat__icon" aria-hidden="true"><img src="' + escapeHtml(f.icon) + '" alt="" width="24" height="24"></span>'
        +   '<span class="mkt-feat__check" aria-hidden="true"><span class="material-symbols-outlined">check</span></span>'
        + '</div>'
        + '<span class="mkt-feat__label">' + escapeHtml(f.title) + '</span>'
        + '<span class="mkt-feat__desc">' + escapeHtml(f.desc) + '</span>';
      list.appendChild(btn);
    });
  }

  function renderPanel() {
    var f = findFeature(state.activeId) || features[0];
    var inner = $('dashPanelInner');
    if (!inner) return;
    clearTimeout(state.panelTimer);
    inner.classList.add('is-updating');
    state.panelTimer = setTimeout(function () {
      var icon = $('dashPanelIcon');
      if (icon) icon.src = f.icon;
      var badge = $('dashPanelBadge');
      if (badge) badge.textContent = groupLabel(f.group);
      var name = $('dashPanelName');
      if (name) name.textContent = f.title;
      var desc = $('dashPanelDesc');
      if (desc) desc.textContent = f.desc;
      var preview = $('dashPreview');
      if (preview) preview.innerHTML = renderWidget(f);
      var caps = $('dashPanelCaps');
      if (caps) {
        caps.innerHTML = f.capabilities.map(function (c) {
          return '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span>' + escapeHtml(c) + '</li>';
        }).join('');
      }
      var benefits = $('dashPanelBenefits');
      if (benefits) benefits.textContent = f.benefits;
      var related = $('dashPanelRelated');
      if (related) {
        related.innerHTML = '<a class="mkt-related__chip" href="' + escapeHtml(f.related.href) + '"><span class="material-symbols-outlined" aria-hidden="true">'
          + escapeHtml(f.related.icon) + '</span>' + escapeHtml(f.related.name) + '</a>';
      }
      var cta = $('dashPanelCta');
      if (cta) { cta.href = f.cta.href; cta.textContent = f.cta.label; }
      var step = $('dashPanelStep');
      if (step) {
        var idx = features.indexOf(f) + 1;
        step.textContent = idx + ' / ' + features.length;
      }
      inner.classList.remove('is-updating');
      animateBars();
      syncBoardActive();
    }, 140);
  }

  function setActive(id, opts) {
    opts = opts || {};
    if (!FEATURE_IDS[id]) return;
    state.activeId = id;
    renderFeatures();
    renderPanel();
    document.querySelectorAll('[data-journey]').forEach(function (el) {
      var f = findFeature(id);
      el.classList.toggle('is-active', !!(f && el.getAttribute('data-journey') === f.journey));
    });
    document.querySelectorAll('.dash-mod').forEach(function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-jump') === id);
    });
    if (opts.pushHash !== false) {
      try { history.replaceState(null, '', '#' + id); } catch (e) {}
    }
    syncBoardActive();
  }

  function stepFeature(dir) {
    var list = visibleFeatures();
    if (!list.length) list = features;
    var idx = -1;
    for (var i = 0; i < list.length; i++) if (list[i].id === state.activeId) { idx = i; break; }
    if (idx < 0) idx = 0;
    var next = list[(idx + dir + list.length) % list.length];
    setActive(next.id);
  }

  /* --- Live board --- */
  function renderBoard() {
    var board = $('dashBoard');
    if (!board) return;
    var d = periodData();
    var layout = roleLayouts[state.role] || roleLayouts.partner;
    var cards = layout.filter(function (id) {
      if (id === 'overview') return state.widgetsOn.overview;
      if (id === 'revenue') return state.widgetsOn.revenue;
      if (id === 'attendance') return state.widgetsOn.attendance;
      if (id === 'projects') return state.widgetsOn.projects;
      if (id === 'alerts') return state.widgetsOn.alerts;
      return true;
    });

    var html = '';
    cards.forEach(function (id) {
      if (id === 'overview') {
        html += boardCard(id, 'Business Overview', d.present + '% present · ' + d.tasks + ' tasks');
      } else if (id === 'revenue') {
        html += boardCard(id, 'Revenue Analytics', 'Collected ' + d.collected + '% of invoiced sample');
      } else if (id === 'attendance') {
        html += boardCard(id, 'Attendance Summary', d.ontime + '% on time · ' + d.leave + '% leave');
      } else if (id === 'projects') {
        html += boardCard(id, 'Project Status', d.projects + ' active · 1 at risk (sample)');
      } else if (id === 'alerts') {
        var n = state.alerts.filter(function (a) { return !a.done; }).length;
        html += boardCard(id, 'Alerts', n + ' open action' + (n === 1 ? '' : 's'));
      }
    });
    if (!html) html = '<p class="dash-board__empty">Enable at least one widget in Custom Widgets.</p>';
    board.innerHTML = html;
    syncBoardActive();
  }

  var FEATURE_PAGE = {
    overview: 'business-overview.html',
    revenue: 'revenue_analytics.html',
    projects: 'project_status.html',
    alerts: 'Alerts.html'
  };

  function boardCard(id, title, meta) {
    /* Known capabilities open dedicated pages; others keep in-page explorer jump */
    if (FEATURE_PAGE[id]) {
      return '<a class="dash-board__card" href="' + FEATURE_PAGE[id] + '" data-feat-page="' + id + '">'
        + '<strong>' + escapeHtml(title) + '</strong>'
        + '<span>' + escapeHtml(meta) + '</span>'
        + '<em>Explore →</em></a>';
    }
    return '<button type="button" class="dash-board__card" data-jump="' + id + '">'
      + '<strong>' + escapeHtml(title) + '</strong>'
      + '<span>' + escapeHtml(meta) + '</span>'
      + '<em>Explore →</em></button>';
  }

  function syncBoardActive() {
    document.querySelectorAll('.dash-board__card').forEach(function (el) {
      var pageId = el.getAttribute('data-feat-page');
      if (pageId) {
        el.classList.toggle('is-active', state.activeId === pageId);
        return;
      }
      el.classList.toggle('is-active', el.getAttribute('data-jump') === state.activeId);
    });
  }

  function setPeriod(period) {
    if (!periods[period]) return;
    state.period = period;
    document.querySelectorAll('[data-period]').forEach(function (b) {
      var on = b.getAttribute('data-period') === period;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderBoard();
    if (findFeature(state.activeId)) renderPanel();
    toast('Period: ' + periods[period].label + ' (sample)');
  }

  function setRole(role) {
    if (!roleLayouts[role]) return;
    state.role = role;
    var preferred = roleLayouts[role];
    state.widgetsOn = { overview: false, revenue: false, attendance: false, projects: false, alerts: false };
    preferred.forEach(function (id) {
      if (id in state.widgetsOn) state.widgetsOn[id] = true;
    });
    document.querySelectorAll('[data-role]').forEach(function (b) {
      var on = b.getAttribute('data-role') === role;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderBoard();
    if (state.activeId === 'widgets') renderPanel();
    toast('Role layout: ' + role);
  }

  /* --- Events --- */
  function initFilters() {
    document.querySelectorAll('#dashFilters .mkt-filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.filter = btn.getAttribute('data-filter') || 'all';
        document.querySelectorAll('#dashFilters .mkt-filter').forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        var still = visibleFeatures().some(function (f) { return f.id === state.activeId; });
        if (!still) {
          var first = visibleFeatures()[0];
          if (first) state.activeId = first.id;
        }
        renderFeatures();
        renderPanel();
      });
    });
  }

  function initDelegates() {
    document.addEventListener('click', function (e) {
      var jump = e.target.closest('[data-jump]');
      if (jump && jump.getAttribute('data-jump') && FEATURE_IDS[jump.getAttribute('data-jump')]) {
        if (jump.tagName === 'A') e.preventDefault();
        var id = jump.getAttribute('data-jump');
        state.filter = 'all';
        document.querySelectorAll('#dashFilters .mkt-filter').forEach(function (b) {
          var on = b.getAttribute('data-filter') === 'all';
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        setActive(id);
        var explorer = $('dash-explorer');
        if (explorer && !jump.closest('#dashPreview')) {
          explorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      var feat = e.target.closest('#dashFeatList [data-id]');
      if (feat) { setActive(feat.getAttribute('data-id')); return; }

      var journey = e.target.closest('[data-journey]');
      if (journey) {
        var j = journey.getAttribute('data-journey');
        var first = features.filter(function (f) { return f.journey === j; })[0];
        if (first) {
          state.filter = 'all';
          document.querySelectorAll('#dashFilters .mkt-filter').forEach(function (b) {
            var on = b.getAttribute('data-filter') === 'all';
            b.classList.toggle('is-active', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
          });
          setActive(first.id);
          var ex = $('dash-explorer');
          if (ex) ex.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      var periodBtn = e.target.closest('[data-period]');
      if (periodBtn) { setPeriod(periodBtn.getAttribute('data-period')); return; }

      var roleBtn = e.target.closest('[data-role]');
      if (roleBtn) { setRole(roleBtn.getAttribute('data-role')); return; }

      var toggle = e.target.closest('[data-widget-toggle]');
      if (toggle) {
        var key = toggle.getAttribute('data-widget-toggle');
        state.widgetsOn[key] = !state.widgetsOn[key];
        renderBoard();
        renderPanel();
        return;
      }

      var done = e.target.closest('[data-alert-done]');
      if (done) {
        var aid = done.getAttribute('data-alert-done');
        state.alerts.forEach(function (a) { if (a.id === aid) a.done = true; });
        renderBoard();
        renderPanel();
        toast('Alert marked done (sample)');
        return;
      }

      if (e.target.closest('[data-alert-reset]')) {
        state.alerts = alertSeed.map(function (a) { return Object.assign({}, a); });
        renderBoard();
        renderPanel();
        toast('Sample alerts restored');
        return;
      }

      var project = e.target.closest('[data-project]');
      if (project) {
        document.querySelectorAll('.dash-w__row').forEach(function (r) { r.classList.remove('is-active'); });
        project.classList.add('is-active');
        toast(projectSeed[Number(project.getAttribute('data-project'))].status + ' selected');
        return;
      }

      var ring = e.target.closest('[data-ring]');
      if (ring) {
        document.querySelectorAll('.dash-w__ring').forEach(function (r) { r.classList.remove('is-active'); });
        ring.classList.add('is-active');
        toast(ring.getAttribute('data-ring') + ' highlighted');
        return;
      }

      var exportBtn = e.target.closest('[data-export]');
      if (exportBtn) {
        var kind = exportBtn.getAttribute('data-export');
        var log = $('dashExportLog');
        var label = kind === 'pdf' ? 'PDF pack' : kind === 'csv' ? 'CSV extract' : 'Meeting summary';
        if (log) {
          var li = document.createElement('li');
          li.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">check_circle</span> Prepared sample ' + escapeHtml(label) + ' · ' + periods[state.period].label;
          log.prepend(li);
        }
        toast('Sample ' + label + ' ready');
        return;
      }

      if (e.target.closest('[data-sim-refresh]')) {
        renderPanel();
        toast('Sample revenue refreshed');
        return;
      }

      if (e.target.closest('[data-feat-prev]')) { stepFeature(-1); return; }
      if (e.target.closest('[data-feat-next]')) { stepFeature(1); return; }

      var auto = e.target.closest('[data-autoplay]');
      if (auto) {
        state.autoplay = !state.autoplay;
        clearInterval(state.autoTimer);
        state.autoTimer = null;
        auto.classList.toggle('is-active', state.autoplay);
        auto.setAttribute('aria-pressed', state.autoplay ? 'true' : 'false');
        var label = auto.querySelector('span:last-child');
        if (label) label.textContent = state.autoplay ? 'Pause tour' : 'Auto tour';
        if (state.autoplay) {
          state.autoTimer = setInterval(function () { stepFeature(1); }, 3500);
          toast('Auto tour on');
        } else {
          toast('Auto tour paused');
        }
      }
    });
  }

  function initKeyboard() {
    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); stepFeature(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); stepFeature(-1); }
    });
  }

  function initChrome() {
    var bar = $('dashProgress');
    var top = $('dashTop');
    window.addEventListener('scroll', function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      if (bar) bar.style.width = pct + '%';
      if (top) top.classList.toggle('is-visible', doc.scrollTop > 480);
    }, { passive: true });
    if (top) top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function init() {
    initFilters();
    initDelegates();
    initKeyboard();
    initChrome();
    renderFeatures();
    renderBoard();
    renderPanel();

    var hash = (location.hash || '').replace(/^#/, '');
    if (FEATURE_IDS[hash]) setActive(hash, { pushHash: false });
    else if (hash === 'dash-explorer') {
      /* keep overview; scroll handled by browser */
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
