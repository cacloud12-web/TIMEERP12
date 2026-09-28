/**
 * TimeERP Timesheet landing — interactive explorer.
 * Features aligned with home Timesheet module and Project Task Timesheet.
 */
(function () {
  'use strict';

  var features = [
    {
      id: 'daily', group: 'entry', title: 'Daily Timesheet', icon: 'calendar-days',
      desc: 'Log work hours day by day against projects and tasks with clear time context.',
      caps: [
        'Capture start and end or total hours for the day',
        'Link entries to the employee calendar day',
        'Review daily totals before weekly submit',
        'Support corrections while drafts remain open'
      ],
      benefits: 'Employees record effort when they work, not in a rush before payroll cut-off.'
    },
    {
      id: 'weekly', group: 'entry', title: 'Weekly Timesheet', icon: 'file-clock',
      desc: 'Package a week of effort into one sheet for manager review and delivery visibility.',
      caps: [
        'View and complete the full work week in one place',
        'Submit weekly sheets for approval cycles',
        'Align with home module weekly approval patterns',
        'Spot gaps across Mon to Sun before submit'
      ],
      benefits: 'Managers approve one coherent week instead of scattered daily messages.'
    },
    {
      id: 'monthly', group: 'entry', title: 'Monthly View', icon: 'calendar-days',
      desc: 'Review hour distribution across the month for capacity and utilisation planning.',
      caps: [
        'See monthly effort trends for an employee or team',
        'Support period reviews for delivery and HR',
        'Cross-check dense months against project demand',
        'Feed utilisation and productivity reporting'
      ],
      benefits: 'Leaders plan capacity with period-level truth, not only last week snapshots.'
    },
    {
      id: 'billable', group: 'billing', title: 'Billable Hours', icon: 'briefcase-business',
      desc: 'Mark time that can be charged to clients or jobs for task billing and project P&L.',
      caps: [
        'Flag entries as billable for client work',
        'Support project and task billable tracking',
        'Feed Task Billing and profit visibility paths',
        'Separate chargeable effort from internal work'
      ],
      benefits: 'Finance and delivery see what can be invoiced before month-end surprises.'
    },
    {
      id: 'nonbillable', group: 'billing', title: 'Non-Billable Hours', icon: 'clock-3',
      desc: 'Track internal, training, and admin effort that still consumes capacity.',
      caps: [
        'Tag admin, training, and internal activities',
        'Keep non-billable visible in utilisation maths',
        'Avoid hiding overhead in project bill rates',
        'Support policy on when non-billable is allowed'
      ],
      benefits: 'Firms understand real utilisation, not only the client-facing hours.'
    },
    {
      id: 'project', group: 'entry', title: 'Project Wise Entry', icon: 'briefcase-business',
      desc: 'Post hours to projects so delivery cost and client jobs stay accurate.',
      caps: [
        'Select project masters on each line',
        'Roll project totals for managers',
        'Connect with Project Management workspaces',
        'Support multi-client professional service models'
      ],
      benefits: 'Project margins reflect real effort, not only invoices and salaries.'
    },
    {
      id: 'task', group: 'entry', title: 'Task Wise Entry', icon: 'clipboard-check',
      desc: 'Capture timesheet effort against tasks for delivery and billing visibility.',
      caps: [
        'Log hours on assigned tasks',
        'Align with Task Timesheet in Project Management',
        'Support multi-assign delivery teams',
        'Improve worklog accuracy for client packs'
      ],
      benefits: 'Task status and time spent stay connected for service delivery.'
    },
    {
      id: 'self', group: 'entry', title: 'Employee Self Entry', icon: 'users',
      desc: 'Employees own their timesheets with self-service entry and status tracking.',
      caps: [
        'Self-service create and edit before submit',
        'Track draft versus submitted status',
        'Reduce manager re-keying of hours',
        'Encourage timely capture habits'
      ],
      benefits: 'Hour capture scales without admin retyping every day for the team.'
    },
    {
      id: 'approval', group: 'control', title: 'Timesheet Approval', icon: 'clipboard-check',
      desc: 'Managers approve or return sheets so only validated hours flow onward.',
      caps: [
        'Approve, reject, or return for correction',
        'Weekly approval queues for team leads',
        'Keep decision history on the sheet',
        'Unlock downstream billing confidence'
      ],
      benefits: 'Billing and payroll inputs rest on reviewed effort, not unchecked logs.'
    },
    {
      id: 'multilevel', group: 'control', title: 'Multi-Level Approval', icon: 'check-circle-2',
      desc: 'Route higher-risk or multi-team sheets through more than one approver when needed.',
      caps: [
        'Support manager then delivery lead gates',
        'Escalate based on org policy where configured',
        'Preserve who approved at each step',
        'Fit multi-practice professional firms'
      ],
      benefits: 'Dual control on sensitive weeks without blocking every routine entry.'
    },
    {
      id: 'manager', group: 'insight', title: 'Manager Dashboard', icon: 'bar-chart-3',
      desc: 'Team leads see pending approvals, logged hours, and load at a glance.',
      caps: [
        'Queue of sheets needing action',
        'Team hour summaries by period',
        'Spot missing or late submissions',
        'Drill into employee week detail'
      ],
      benefits: 'Managers run a clean approval week instead of chasing chatrooms.'
    },
    {
      id: 'productivity', group: 'insight', title: 'Productivity Reports', icon: 'bar-chart-3',
      desc: 'Review logged effort versus expected capacity for people and teams.',
      caps: [
        'Productivity views from timesheet data',
        'Support HRMS and project reporting bundles',
        'Compare periods for trend changes',
        'Highlight overloaded or under-logged staff'
      ],
      benefits: 'Ops lead coaching talks from hours data, not gut feel alone.'
    },
    {
      id: 'util', group: 'insight', title: 'Utilization Report', icon: 'bar-chart-3',
      desc: 'Measure billable share of available hours for practice health.',
      caps: [
        'Utilisation percentage by person or team',
        'Billable vs non-billable mix',
        'Support capacity planning conversations',
        'Align sales load with delivery capacity'
      ],
      benefits: 'Partners and HODs see if the bench and bill rates still make sense.'
    },
    {
      id: 'ot', group: 'control', title: 'Overtime Tracking', icon: 'clock-3',
      desc: 'Surface hours beyond standard patterns for policy and approval follow-up.',
      caps: [
        'Highlight OT signals in high-hour weeks',
        'Connect with attendance overtime context where used',
        'Support manager review of extra effort',
        'Protect staff welfare and cost control'
      ],
      benefits: 'Extra hours are governed, not invisible in free-form timesheets.'
    },
    {
      id: 'leave', group: 'control', title: 'Leave Integration', icon: 'calendar-days',
      desc: 'Keep leave context near time logging so weeks of absence do not look empty without reason.',
      caps: [
        'Respect leave that affects expected hours',
        'Align with Leave Management workflows',
        'Reduce false gap escalations when staff are off',
        'Support cleaner payroll and attendance tie-outs'
      ],
      benefits: 'Time completeness reviews account for approved leave, not false gaps.'
    },
    {
      id: 'export', group: 'insight', title: 'Export Excel/PDF', icon: 'file-clock',
      desc: 'Export approved timesheet packs for clients, auditors, and internal review.',
      caps: [
        'Export periods suitable for review packs',
        'Support Excel and PDF style handoffs',
        'Share with finance without spreadsheet rebuilds',
        'Keep source of truth inside TimeERP'
      ],
      benefits: 'Client billing packs and audits stop depending on personal Excel masters.'
    }
  ];

  function iconHtml(name) {
    return '<i data-lucide="' + name + '" aria-hidden="true"></i>';
  }

  function paintIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /* Feature grid + panel */
  var listEl = document.getElementById('tsFeatList');
  var panelName = document.getElementById('tsPanelName');
  var panelDesc = document.getElementById('tsPanelDesc');
  var panelIconWrap = document.getElementById('tsPanelIcon');
  var panelCaps = document.getElementById('tsPanelCaps');
  var panelBenefits = document.getElementById('tsPanelBenefits');
  var activeId = features[0].id;

  function renderList(filter) {
    if (!listEl) return;
    listEl.innerHTML = features.map(function (f) {
      var hidden = filter !== 'all' && f.group !== filter;
      return (
        '<button type="button" role="tab" class="ts-feat' +
        (f.id === activeId ? ' is-active' : '') +
        (hidden ? ' is-hidden' : '') +
        '" data-id="' + f.id + '" data-group="' + f.group + '" aria-selected="' +
        (f.id === activeId ? 'true' : 'false') + '">' +
        '<span class="ts-feat__icon">' + iconHtml(f.icon) + '</span>' +
        '<strong>' + f.title + '</strong>' +
        '<p>' + f.desc + '</p>' +
        '</button>'
      );
    }).join('');
    paintIcons();
  }

  function showFeature(id) {
    var f = features.find(function (x) { return x.id === id; }) || features[0];
    activeId = f.id;
    if (panelName) panelName.textContent = f.title;
    if (panelDesc) panelDesc.textContent = f.desc;
    if (panelIconWrap) panelIconWrap.innerHTML = iconHtml(f.icon);
    if (panelCaps) {
      panelCaps.innerHTML = f.caps.map(function (c) {
        return '<li>' + iconHtml('check-circle-2') + '<span>' + c + '</span></li>';
      }).join('');
    }
    if (panelBenefits) panelBenefits.textContent = f.benefits;
    if (listEl) {
      listEl.querySelectorAll('.ts-feat').forEach(function (btn) {
        var on = btn.getAttribute('data-id') === activeId;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
    paintIcons();
  }

  renderList('all');
  showFeature(activeId);

  if (listEl) {
    listEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.ts-feat');
      if (!btn || btn.classList.contains('is-hidden')) return;
      showFeature(btn.getAttribute('data-id'));
    });
  }

  document.querySelectorAll('.ts-filter').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.ts-filter').forEach(function (c) {
        c.classList.remove('is-active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-selected', 'true');
      renderList(chip.getAttribute('data-filter') || 'all');
      var visible = listEl && listEl.querySelector('.ts-feat:not(.is-hidden)');
      if (visible) showFeature(visible.getAttribute('data-id'));
      paintIcons();
    });
  });

  /* Workflow pulse */
  var flowSteps = document.querySelectorAll('.ts-flow__step');
  var flowArrows = document.querySelectorAll('.ts-flow__arrow');
  if (flowSteps.length) {
    var fi = 0;
    setInterval(function () {
      flowSteps.forEach(function (s, i) { s.classList.toggle('is-on', i === fi); });
      flowArrows.forEach(function (a, i) { a.classList.toggle('is-on', i === fi || i === fi - 1); });
      fi = (fi + 1) % flowSteps.length;
    }, 2400);
  }

  /* Counters */
  function animateCount(el, target, prefix, suffix, duration) {
    var start = 0;
    var t0 = null;
    function frame(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / duration);
      var val = Math.round(start + (target - start) * (1 - Math.pow(1 - p, 3)));
      el.textContent = (prefix || '') + val.toLocaleString('en-IN') + (suffix || '');
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var dashObserved = false;
  var dashEl = document.getElementById('tsDash');
  if (dashEl && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || dashObserved) return;
        dashObserved = true;
        dashEl.querySelectorAll('[data-count]').forEach(function (el) {
          var n = parseInt(el.getAttribute('data-count'), 10) || 0;
          animateCount(el, n, el.getAttribute('data-prefix') || '', el.getAttribute('data-suffix') || '', 1200);
        });
        dashEl.querySelectorAll('.ts-bar').forEach(function (b) {
          var w = b.getAttribute('data-width') || '70';
          b.style.setProperty('--w', w + '%');
          b.classList.add('is-on');
        });
        obs.disconnect();
      });
    }, { threshold: 0.35 }).observe(dashEl);
  }

  /* Hero bars + ring */
  var heroBar = document.querySelector('.ts-card__bar');
  var heroRing = document.querySelector('.ts-ring');
  if (heroBar) {
    requestAnimationFrame(function () {
      setTimeout(function () { heroBar.classList.add('is-on'); }, 400);
    });
  }
  if (heroRing) {
    requestAnimationFrame(function () {
      setTimeout(function () { heroRing.classList.add('is-on'); }, 500);
    });
  }

  /* FAQ */
  document.querySelectorAll('.ts-faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.ts-faq__item');
      var open = item.classList.contains('is-open');
      document.querySelectorAll('.ts-faq__item').forEach(function (i) {
        i.classList.remove('is-open');
        var q = i.querySelector('.ts-faq__q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Scroll reveal */
  if ('IntersectionObserver' in window) {
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          rev.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.ts-reveal').forEach(function (el) { rev.observe(el); });
  } else {
    document.querySelectorAll('.ts-reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }

  paintIcons();
})();
