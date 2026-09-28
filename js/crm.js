/**
 * TIME ERP CRM : Client Desk landing, interactive explorer + live demo widgets.
 * Content from home CRM/Client Desk, Products mega-nav, and CA CloudDesk CRM guide.
 * Ref: https://guide.caclouddesk.com/Module/CRM/crm-help.html
 */
(function () {
  'use strict';

  var CRM_ICON = 'assets/home-icons/crm.svg';
  var DESK_ICON = 'assets/home-icons/client-desk.svg';

  var features = [
    {
      id: 'leads', group: 'acquire',
      title: 'Lead Management',
      desc: 'Capture, track, and assign prospective client leads through various acquisition channels.',
      icon: CRM_ICON,
      capabilities: [
        'Capture leads from marketing and inbound channels',
        'Assign owners and track lead stages',
        'Prevent lead leakage between teams',
        'Hand off qualified leads into the sales pipeline'
      ],
      benefits: 'Give sales and partners a single owned list of prospects instead of scattered WhatsApp and email leads.',
      related: { name: 'CRM', href: 'home.html#module/crm', icon: 'filter_alt' },
      cta: { label: 'Explore Lead Management', href: 'home.html#module/crm' }
    },
    {
      id: 'pipeline', group: 'convert',
      title: 'Sales Pipeline',
      desc: 'Visual deal stages, conversion tracking, and pipeline forecasting.',
      icon: CRM_ICON,
      capabilities: [
        'Move deals across clear pipeline stages',
        'Track conversion from lead to won client',
        'Forecast pipeline value by stage',
        'Keep ownership visible for every opportunity'
      ],
      benefits: 'See where deals stall and where revenue is forming, before the month ends.',
      related: { name: 'CRM', href: 'home.html#module/crm', icon: 'timeline' },
      cta: { label: 'Explore Sales Pipeline', href: 'home.html#module/crm' }
    },
    {
      id: 'quotes', group: 'convert',
      title: 'Quotations',
      desc: 'Generate, customize, and track professional service proposals and cost estimates.',
      icon: CRM_ICON,
      capabilities: [
        'Generate professional service quotations',
        'Customize estimates for engagement scope',
        'Track quotation status through follow-ups',
        'Convert accepted quotes into client work'
      ],
      benefits: 'Standardize how your firm proposes fees and speeds up client approval cycles.',
      related: { name: 'CRM', href: 'home.html#module/crm', icon: 'description' },
      cta: { label: 'Explore Quotations', href: 'home.html#module/crm' }
    },
    {
      id: 'followups', group: 'convert',
      title: 'Follow-ups',
      desc: 'Schedule, manage, and track reminders, calls, and client communications.',
      icon: CRM_ICON,
      capabilities: [
        'Schedule reminders for calls and next actions',
        'Track follow-up ownership by team member',
        'Keep communication discipline across the pipeline',
        'Reduce missed callbacks on hot opportunities'
      ],
      benefits: 'Turn “I’ll call them later” into a visible queue that managers can coach.',
      related: { name: 'CRM', href: 'home.html#module/crm', icon: 'reply_all' },
      cta: { label: 'Explore Follow-ups', href: 'home.html#module/crm' }
    },
    {
      id: 'tasks', group: 'serve',
      title: 'Tasks',
      desc: 'Assign, track, and close internal or client-facing team tasks.',
      icon: CRM_ICON,
      capabilities: [
        'Assign CRM tasks to owners',
        'Track open and completed work items',
        'Support internal and client-facing actions',
        'Keep task progress next to the client record'
      ],
      benefits: 'Connect relationship work to accountable tasks so nothing sits in inboxes forever.',
      related: { name: 'Project Management', href: 'project_management.html', icon: 'task_alt' },
      cta: { label: 'Explore Tasks', href: 'home.html#module/crm' }
    },
    {
      id: 'customers', group: 'serve',
      title: 'Customer Database',
      desc: 'Comprehensive profiles for clients, contact details, historical data, groups, and linked accounts.',
      icon: DESK_ICON,
      capabilities: [
        'Add and view client profiles with complete information',
        'Browse clients with search, filters, and sorting',
        'Organize clients into groups for reporting and bulk ops',
        'Extend forms with custom fields for practice-specific data'
      ],
      benefits: 'Run Client Desk as the system of record for every client your firm serves.',
      related: { name: 'Client Desk', href: 'home.html#module/client-desk', icon: 'contacts' },
      cta: { label: 'Explore Customer Database', href: 'home.html#module/client-desk' }
    },
    {
      id: 'timeline', group: 'serve',
      title: 'Activity Timeline',
      desc: 'Chronological logging of communications, updates, emails, and meetings with clients.',
      icon: CRM_ICON,
      capabilities: [
        'Log calls, emails, meetings, and updates in one timeline',
        'Give every teammate the latest client context',
        'Reduce “what did we last tell them?” confusion',
        'Support handover between sales and delivery teams'
      ],
      benefits: 'Anyone picking up a client conversation sees the full story instantly.',
      related: { name: 'CRM', href: 'home.html#module/crm', icon: 'history' },
      cta: { label: 'Explore Activity Timeline', href: 'home.html#module/crm' }
    },
    {
      id: 'portal', group: 'portal',
      title: 'Customer Portal',
      desc: 'Dedicated self-service touchpoints for clients to interact, upload documents, and view updates.',
      icon: DESK_ICON,
      capabilities: [
        'Give clients a secure Client Desk portal',
        'Support document exchange and service requests',
        'Enable messaging for secure collaboration',
        'Centralize client visibility: receivables, tags, team, and services'
      ],
      benefits: 'Reduce status-check calls by letting clients self-serve documents and requests.',
      related: { name: 'Client Desk', href: 'home.html#module/client-desk', icon: 'web' },
      cta: { label: 'Explore Customer Portal', href: 'home.html#module/client-desk' }
    },
    {
      id: 'bulk', group: 'portal',
      title: 'Bulk client operations',
      desc: 'Bulk DSC and password operations for multiple clients from Client Desk workflows.',
      icon: DESK_ICON,
      capabilities: [
        'Add bulk DSC for multiple clients in one operation',
        'Set or update passwords for multiple clients together',
        'Speed onboarding for large client books',
        'Keep bulk actions tied to client records'
      ],
      benefits: 'Scale Client Desk admin work for CA firms managing hundreds of clients.',
      related: { name: 'Client Desk', href: 'home.html#module/client-desk', icon: 'group_add' },
      cta: { label: 'Talk to Sales', href: 'contact_sales.html' }
    }
  ];

  var stages = [
    { id: 'new', name: 'New leads' },
    { id: 'qualified', name: 'Qualified' },
    { id: 'proposal', name: 'Proposal' },
    { id: 'won', name: 'Won' }
  ];

  var deals = [
    { id: 'd1', title: 'Apex Retail, CRM demo', owner: 'Sales', value: '₹2.4L', stage: 'new' },
    { id: 'd2', title: 'Nexus Pvt Ltd, Onboarding', owner: 'Rahul Mehta', value: '₹4.1L', stage: 'qualified' },
    { id: 'd3', title: 'Orbit Foods, Annual retainership', owner: 'Priya Sharma', value: '₹6.0L', stage: 'proposal' },
    { id: 'd4', title: 'Mehta & Co, Audit pack', owner: 'Ankit Verma', value: '₹3.2L', stage: 'proposal' },
    { id: 'd5', title: 'BuildRight Infra, MSA', owner: 'Sneha Kapoor', value: '₹2.7L', stage: 'won' }
  ];

  var followUps = [
    { id: 'f1', title: 'Call Apex Retail decision maker', meta: 'Sales · Today 4:00 PM', chip: 'Due soon', chipClass: 'crm-chip--due' },
    { id: 'f2', title: 'Send revised quotation, Orbit Foods', meta: 'Priya Sharma · Today 5:30 PM', chip: 'Hot', chipClass: 'crm-chip--hot' },
    { id: 'f3', title: 'Client Desk document reminder, Nexus', meta: 'Rahul Mehta · Tomorrow 11:00 AM', chip: 'Portal', chipClass: '' },
    { id: 'f4', title: 'Follow up proposal open rate', meta: 'Sales · Tomorrow 2:00 PM', chip: 'Pipeline', chipClass: '' }
  ];

  var activities = [
    { title: 'New website lead captured', meta: 'Lead Management · 12 min ago' },
    { title: 'Quotation viewed by Orbit Foods', meta: 'Quotations · 41 min ago' },
    { title: 'Client uploaded bank statements', meta: 'Customer Portal · 1 hr ago' },
    { title: 'Deal moved to Proposal', meta: 'Sales Pipeline · 2 hr ago' }
  ];

  var list = document.getElementById('crmFeatList');
  var empty = document.getElementById('crmEmpty');
  var filters = document.getElementById('crmFilters');
  var panelInner = document.getElementById('crmPanelInner');
  var pipelineEl = document.getElementById('crmPipeline');
  var followList = document.getElementById('crmFollowList');
  var activityList = document.getElementById('crmActivityList');
  var followSearch = document.getElementById('crmFollowSearch');
  var activeId = features[0].id;
  var activeFilter = 'all';
  var dragId = null;

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
      document.getElementById('crmPanelIcon').src = f.icon;
      document.getElementById('crmPanelName').textContent = f.title;
      document.getElementById('crmPanelDesc').textContent = f.desc;
      document.getElementById('crmPanelBenefits').textContent = f.benefits;
      document.getElementById('crmPanelCaps').innerHTML = f.capabilities.map(function (c) {
        return '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span><span>' + escapeHtml(c) + '</span></li>';
      }).join('');
      var cta = document.getElementById('crmPanelCta');
      cta.textContent = f.cta.label;
      cta.href = f.cta.href;
      panelInner.classList.remove('is-updating');
    }, 120);
    if (list) {
      list.querySelectorAll('.mkt-feat').forEach(function (btn) {
        var on = btn.getAttribute('data-id') === activeId;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
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

  function renderPipeline() {
    if (!pipelineEl) return;
    pipelineEl.innerHTML = stages.map(function (stage) {
      var cards = deals.filter(function (d) { return d.stage === stage.id; });
      return '<div class="crm-col" data-stage="' + escapeHtml(stage.id) + '" role="listitem">'
        + '<div class="crm-col__head"><strong>' + escapeHtml(stage.name) + '</strong>'
        + '<span class="crm-col__count">' + cards.length + '</span></div>'
        + '<div class="crm-col__body">'
        + cards.map(function (d) {
          return '<button type="button" class="crm-deal" draggable="true" data-deal="' + escapeHtml(d.id) + '">'
            + '<strong>' + escapeHtml(d.title) + '</strong>'
            + '<span>' + escapeHtml(d.owner) + '</span>'
            + '<span class="crm-deal__amt">' + escapeHtml(d.value) + '</span></button>';
        }).join('')
        + '</div></div>';
    }).join('');

    pipelineEl.querySelectorAll('.crm-deal').forEach(function (deal) {
      deal.addEventListener('dragstart', function (e) {
        dragId = deal.getAttribute('data-deal');
        deal.classList.add('is-dragging');
        e.dataTransfer.setData('text/plain', dragId);
      });
      deal.addEventListener('dragend', function () {
        deal.classList.remove('is-dragging');
        dragId = null;
        pipelineEl.querySelectorAll('.crm-col.is-drop').forEach(function (c) { c.classList.remove('is-drop'); });
      });
      deal.addEventListener('click', function () {
        setFilter('all');
        renderPanel('pipeline');
        document.getElementById('crm-explorer').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    pipelineEl.querySelectorAll('.crm-col').forEach(function (col) {
      col.addEventListener('dragover', function (e) {
        e.preventDefault();
        col.classList.add('is-drop');
      });
      col.addEventListener('dragleave', function () { col.classList.remove('is-drop'); });
      col.addEventListener('drop', function (e) {
        e.preventDefault();
        col.classList.remove('is-drop');
        var id = e.dataTransfer.getData('text/plain') || dragId;
        var deal = deals.filter(function (d) { return d.id === id; })[0];
        if (!deal) return;
        deal.stage = col.getAttribute('data-stage');
        renderPipeline();
        updateStats();
      });
    });
  }

  function updateStats() {
    var open = deals.filter(function (d) { return d.stage !== 'won'; }).length;
    var leadsEl = document.getElementById('crmStatLeads');
    if (leadsEl) leadsEl.textContent = String(Math.max(open + 19, open));
  }

  function renderFollowUps(query) {
    if (!followList) return;
    var q = (query || '').trim().toLowerCase();
    var rows = followUps.filter(function (f) {
      if (!q) return true;
      return (f.title + ' ' + f.meta).toLowerCase().indexOf(q) !== -1;
    });
    if (!rows.length) {
      followList.innerHTML = '<div class="crm-empty-mini">No follow-ups match your search.</div>';
      return;
    }
    followList.innerHTML = rows.map(function (f) {
      return '<button type="button" class="crm-row" data-open-feature="followups">'
        + '<span class="crm-row__dot" aria-hidden="true"></span>'
        + '<span><strong>' + escapeHtml(f.title) + '</strong><p>' + escapeHtml(f.meta) + '</p>'
        + '<span class="crm-chip ' + escapeHtml(f.chipClass || '') + '">' + escapeHtml(f.chip) + '</span></span></button>';
    }).join('');
  }

  function renderActivity() {
    if (!activityList) return;
    activityList.innerHTML = activities.map(function (a) {
      return '<button type="button" class="crm-row" data-open-feature="timeline">'
        + '<span class="crm-row__dot" aria-hidden="true"></span>'
        + '<span><strong>' + escapeHtml(a.title) + '</strong><p>' + escapeHtml(a.meta) + '</p></span></button>';
    }).join('');
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

  if (followSearch) {
    followSearch.addEventListener('input', function () {
      renderFollowUps(followSearch.value);
    });
  }

  document.addEventListener('click', function (e) {
    var openFeat = e.target.closest('[data-open-feature]');
    if (openFeat) {
      setFilter('all');
      renderPanel(openFeat.getAttribute('data-open-feature'));
      document.getElementById('crm-explorer').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  var journey = document.getElementById('crmJourney');
  if (journey) {
    journey.addEventListener('click', function (e) {
      var step = e.target.closest('[data-journey]');
      if (!step) return;
      journey.querySelectorAll('[data-journey]').forEach(function (s) {
        s.classList.toggle('is-active', s === step);
      });
      var map = {
        leads: 'leads',
        pipeline: 'pipeline',
        follow: 'followups',
        clients: 'customers',
        portal: 'portal'
      };
      var id = map[step.getAttribute('data-journey')];
      if (id) {
        setFilter('all');
        renderPanel(id);
        document.getElementById('crm-explorer').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  document.querySelectorAll('[data-jump]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var id = el.getAttribute('data-jump');
      if (!id) return;
      e.preventDefault();
      setFilter('all');
      renderPanel(id);
      document.getElementById('crm-explorer').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  renderPipeline();
  renderFollowUps('');
  renderActivity();
  renderList();
  renderPanel(activeId);
})();
