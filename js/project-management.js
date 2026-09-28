/**
 * TIME ERP Project Management landing — interactive feature explorer.
 * Content from home1 Project Management + Products mega-nav only (14 features).
 */
(function () {
  'use strict';

  var features = [
    {
      id: 'multi-assign', group: 'scope', journey: 'scope',
      title: 'Multi Assign',
      desc: 'Assign project tasks across team members so delivery ownership stays clear.',
      icon: 'assets/home-icons/task-multi.svg',
      capabilities: [
        'Assign tasks to multiple team members from one workspace',
        'Keep ownership visible across project delivery work',
        'Support collaborative execution without scattered handoffs',
        'Align assignments with multi-client project delivery'
      ],
      benefits: 'Reduce confusion on who owns each deliverable by keeping multi-person assignment inside Project Management.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'groups' },
      cta: { label: 'Book Demo', href: '#', bookDemo: true }
    },
    {
      id: 'multi-customer', group: 'scope', journey: 'scope',
      title: 'Multi Customer',
      desc: 'Manage project work across customers from a single project workspace.',
      icon: 'assets/home-icons/task-users.svg',
      capabilities: [
        'Organize delivery work across multiple customers',
        'Keep customer-linked tasks visible in one module',
        'Support teams serving many customer engagements',
        'Align customer work with CRM relationship context'
      ],
      benefits: 'Run multi-customer delivery without maintaining separate tools for each engagement.',
      related: { name: 'CRM : Client Desk', href: 'crm.html', icon: 'handshake' },
      cta: { label: 'Explore CRM', href: 'crm.html' }
    },
    {
      id: 'multi-client', group: 'scope', journey: 'scope',
      title: 'Multi Client',
      desc: 'Deliver client work across engagements with multi-client project coverage.',
      icon: 'assets/home-icons/task-building.svg',
      capabilities: [
        'Support multi-client project delivery in one workspace',
        'Keep client engagements organized with related tasks',
        'Help teams switch context across client work cleanly',
        'Connect client delivery with sharing and billing flows'
      ],
      benefits: 'Give CA firms and service teams one place to run multi-client project work end to end.',
      related: { name: 'CRM : Client Desk', href: 'crm.html', icon: 'business' },
      cta: { label: 'Explore CRM', href: 'crm.html' }
    },
    {
      id: 'create-task', group: 'tasks', journey: 'tasks',
      title: 'Create Task',
      desc: 'Create and organize delivery tasks that drive project execution.',
      icon: 'assets/home-icons/task-create.svg',
      capabilities: [
        'Create tasks for project and client deliverables',
        'Keep task creation centralized in Project Management',
        'Support structured execution from planning to completion',
        'Feed downstream timesheet, billing, and reporting needs'
      ],
      benefits: 'Start every delivery item as a tracked task instead of informal follow-ups outside TIME ERP.',
      related: { name: 'Document Vault', href: 'document_management.html', icon: 'add_task' },
      cta: { label: 'Book Demo', href: '#', bookDemo: true }
    },
    {
      id: 'recurring', group: 'tasks', journey: 'tasks',
      title: 'Recurring Task',
      desc: 'Schedule repeating work so recurring client services stay on track.',
      icon: 'assets/home-icons/task-recurring.svg',
      capabilities: [
        'Set recurring tasks for repeatable client work',
        'Reduce manual recreation of periodic deliverables',
        'Keep recurring service cycles visible to the team',
        'Support ongoing compliance and advisory-style workloads'
      ],
      benefits: 'Automate repeat work patterns so monthly and periodic client services are not recreated from scratch.',
      related: { name: 'Compliance Management', href: 'compliance_management.html', icon: 'autorenew' },
      cta: { label: 'Book Demo', href: '#', bookDemo: true }
    },
    {
      id: 'service-master', group: 'tasks', journey: 'tasks',
      title: 'Task Service Master',
      desc: 'Standardize service task templates through Task Service Master.',
      icon: 'assets/home-icons/task-service.svg',
      capabilities: [
        'Maintain a service master for common task types',
        'Standardize how services are represented as tasks',
        'Support consistent delivery across clients and teams',
        'Reduce ad-hoc task naming and setup variation'
      ],
      benefits: 'Keep service delivery consistent by reusing Task Service Master definitions across projects.',
      related: { name: 'Billing Management', href: 'billing.html', icon: 'home_repair_service' },
      cta: { label: 'Explore Billing', href: 'billing.html' }
    },
    {
      id: 'mobile', group: 'collaborate', journey: 'collaborate',
      title: 'Task in Mobile App',
      desc: 'Access and update project tasks from the TIME ERP mobile app.',
      icon: 'assets/home-icons/task-mobile.svg',
      capabilities: [
        'Work on tasks from the mobile app',
        'Keep field and remote teams connected to delivery work',
        'Support task visibility outside the desktop workspace',
        'Align mobile task access with overall project delivery'
      ],
      benefits: 'Let teams update delivery progress on the go without leaving Project Management.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'smartphone' },
      cta: { label: 'Book Demo', href: '#', bookDemo: true }
    },
    {
      id: 'share', group: 'collaborate', journey: 'collaborate',
      title: 'Share Task with Client',
      desc: 'Share task progress with clients for clearer delivery collaboration.',
      icon: 'assets/home-icons/task-share.svg',
      capabilities: [
        'Share selected tasks with clients',
        'Improve visibility of delivery progress for client stakeholders',
        'Reduce status follow-ups outside the platform',
        'Keep shared task context connected to client work'
      ],
      benefits: 'Give clients a clearer view of task progress without exporting status updates manually.',
      related: { name: 'CRM : Client Desk', href: 'crm.html', icon: 'share' },
      cta: { label: 'Explore CRM', href: 'crm.html' }
    },
    {
      id: 'bulk', group: 'tasks', journey: 'tasks',
      title: 'Bulk Action in Task',
      desc: 'Apply bulk actions across tasks to update delivery work faster.',
      icon: 'assets/home-icons/task-bulk.svg',
      capabilities: [
        'Perform bulk actions on multiple tasks',
        'Speed up updates across large task sets',
        'Keep team operations efficient during busy cycles',
        'Reduce repetitive one-by-one task maintenance'
      ],
      benefits: 'Handle high-volume task updates quickly when delivery pipelines are busy.',
      related: { name: 'Document Vault', href: 'document_management.html', icon: 'dynamic_feed' },
      cta: { label: 'Book Demo', href: '#', bookDemo: true }
    },
    {
      id: 'reminder', group: 'tasks', journey: 'tasks',
      title: 'Task Reminder',
      desc: 'Use task reminders so owners stay aware of upcoming delivery work.',
      icon: 'assets/home-icons/task-reminder.svg',
      capabilities: [
        'Set reminders on project tasks',
        'Help owners act before due work slips',
        'Support timely follow-through on client deliverables',
        'Keep reminder context attached to the task itself'
      ],
      benefits: 'Reduce missed follow-ups by keeping reminders inside the same task workflow.',
      related: { name: 'CRM : Client Desk', href: 'crm.html', icon: 'notifications' },
      cta: { label: 'Book Demo', href: '#', bookDemo: true }
    },
    {
      id: 'timesheet', group: 'measure', journey: 'measure',
      title: 'Task Timesheet',
      desc: 'Capture timesheet effort against tasks for delivery and billing visibility.',
      icon: 'assets/home-icons/task-clock.svg',
      capabilities: [
        'Log time against project tasks',
        'Connect effort tracking to delivery work',
        'Support timesheet visibility for managers and finance',
        'Feed billable effort into task billing workflows'
      ],
      benefits: 'Know where delivery time goes by attaching timesheets directly to tasks.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'schedule' },
      cta: { label: 'Explore HRMS', href: 'hrms.html' }
    },
    {
      id: 'permission', group: 'collaborate', journey: 'collaborate',
      title: 'Task Permission',
      desc: 'Control task access with permissions so the right people can view or edit work.',
      icon: 'assets/home-icons/task-permission.svg',
      capabilities: [
        'Manage permissions for task visibility and edits',
        'Protect sensitive client delivery information',
        'Support role-appropriate access across teams',
        'Keep collaboration controlled inside Project Management'
      ],
      benefits: 'Share delivery work safely by applying Task Permission controls where needed.',
      related: { name: 'Document Vault', href: 'document_management.html', icon: 'admin_panel_settings' },
      cta: { label: 'Book Demo', href: '#', bookDemo: true }
    },
    {
      id: 'billing', group: 'measure', journey: 'measure',
      title: 'Task Billing',
      desc: 'Connect task delivery to billing so billable work stays visible.',
      icon: 'assets/home-icons/task-billable.svg',
      capabilities: [
        'Link tasks to billing-ready delivery work',
        'Support billable task visibility for finance teams',
        'Reduce gaps between delivery completion and invoicing',
        'Align Project Management with Billing Management'
      ],
      benefits: 'Move from completed tasks to billing context without losing delivery history.',
      related: { name: 'Billing Management', href: 'billing.html', icon: 'receipt_long' },
      cta: { label: 'Explore Billing', href: 'billing.html' }
    },
    {
      id: 'pnl', group: 'measure', journey: 'measure',
      title: 'Profit / Loss Report',
      desc: 'Review profit and loss visibility for project delivery work.',
      icon: 'assets/home-icons/task-pnl.svg',
      capabilities: [
        'Review profit / loss reporting for project delivery',
        'Support profitability visibility alongside task execution',
        'Help leadership understand delivery outcomes',
        'Connect effort, billing, and delivery into one report view'
      ],
      benefits: 'See whether client delivery is profitable without leaving the Project Management workspace.',
      related: { name: 'Billing Management', href: 'billing.html', icon: 'monitoring' },
      cta: { label: 'Explore Billing', href: 'billing.html' }
    }
  ];

  var list = document.getElementById('pmFeatList');
  var empty = document.getElementById('pmEmpty');
  var filters = document.getElementById('pmFilters');
  var panelInner = document.getElementById('pmPanelInner');
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
      document.getElementById('pmPanelIcon').src = f.icon;
      document.getElementById('pmPanelName').textContent = f.title;
      document.getElementById('pmPanelDesc').textContent = f.desc;
      document.getElementById('pmPanelBenefits').textContent = f.benefits;
      document.getElementById('pmPanelCaps').innerHTML = f.capabilities.map(function (c) {
        return '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span><span>' + escapeHtml(c) + '</span></li>';
      }).join('');
      var cta = document.getElementById('pmPanelCta');
      cta.textContent = 'Explore Project Management';
      cta.href = 'home.html#module/project-management';
      cta.removeAttribute('data-book-demo');
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
    var journey = document.getElementById('pmJourney');
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
    var explorer = document.getElementById('pm-explorer');
    if (explorer) explorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function journeyDefaultFeature(journey) {
    if (journey === 'scope') return 'multi-assign';
    if (journey === 'tasks') return 'create-task';
    if (journey === 'collaborate') return 'mobile';
    if (journey === 'measure') return 'timesheet';
    return 'multi-assign';
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

  var journey = document.getElementById('pmJourney');
  if (journey) {
    journey.addEventListener('click', function (e) {
      var step = e.target.closest('[data-journey]');
      if (!step) return;
      var j = step.getAttribute('data-journey');
      setFilter(j);
      renderPanel(journeyDefaultFeature(j));
      var explorer = document.getElementById('pm-explorer');
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

  renderList();
  renderPanel(activeId);
})();
