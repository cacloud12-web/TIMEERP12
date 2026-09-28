/**
 * TimeERP Leave Management landing.
 * Features aligned with home Leave Management and HRMS leave capabilities.
 */
(function () {
  'use strict';

  var features = [
    {
      id: 'types', group: 'setup', title: 'Leave Types', icon: 'category',
      desc: 'Configure casual, sick, paid, and custom leave types for policy consistency.',
      caps: [
        'Define leave types for the organisation',
        'Support casual, sick, paid, and custom categories',
        'Connect types to employee balances',
        'Keep policies aligned across branches'
      ],
      benefits: 'Employees apply against standard types instead of free-text chaos.'
    },
    {
      id: 'policies', group: 'setup', title: 'Leave Policies', icon: 'policy',
      desc: 'Manage leave policies and configuration that govern how leave is earned and used.',
      caps: [
        'Configure organization leave rules',
        'Link policies to leave types and balances',
        'Support HRMS leave policy administration',
        'Keep application rules consistent for all staff'
      ],
      benefits: 'HR owns one policy source while teams request leave in the same system.'
    },
    {
      id: 'balance', group: 'people', title: 'Leave Balance', icon: 'account_balance_wallet',
      desc: 'Show total, used, and remaining quotas so staff know what they can apply for.',
      caps: [
        'View balance by leave type',
        'Track used versus remaining days',
        'Support employee self-service balance checks',
        'Keep history for disputes and audits'
      ],
      benefits: 'Fewer incorrect applications when remaining days are visible up front.'
    },
    {
      id: 'apply', group: 'people', title: 'Leave Requests', icon: 'edit_calendar',
      desc: 'Employees apply with type, dates, half-day, reason, and proof when needed.',
      caps: [
        'Apply leave with type and date range',
        'Support half-day options where enabled',
        'Attach reason and supporting proof',
        'Route requests into the approval queue'
      ],
      benefits: 'Self-service applications replace email chains and paper forms.'
    },
    {
      id: 'approval', group: 'control', title: 'Approval Workflow', icon: 'fact_check',
      desc: 'Managers and HR approve, reject, or return leave applications with status tracking.',
      caps: [
        'Pending, approved, and rejected statuses',
        'Manager review of team coverage',
        'HR visibility across organisational requests',
        'Decision trail on each application'
      ],
      benefits: 'Coverage and compliance stay controlled before leave days are confirmed.'
    },
    {
      id: 'holiday', group: 'setup', title: 'Holiday Calendar', icon: 'calendar_month',
      desc: 'Maintain official holidays so applications and planning respect company closures.',
      caps: [
        'Add holidays from template, single, or bulk entry',
        'Align requests with the holiday calendar',
        'Share upcoming holidays with employees',
        'Support multi-location calendars where configured'
      ],
      benefits: 'Leave planning factors official holidays instead of conflicting mid-request.'
    },
    {
      id: 'history', group: 'people', title: 'Leave History', icon: 'history',
      desc: 'Track application history so employees and HR can reopen past leave decisions.',
      caps: [
        'Browse submitted leave over time',
        'Filter by status and leave type',
        'Support balance reconciliation talks',
        'Reduce “what was approved last year” disputes'
      ],
      benefits: 'History stays queryable without searching inboxes.'
    },
    {
      id: 'team', group: 'control', title: 'Team Coverage View', icon: 'groups',
      desc: 'Managers see who is on leave so approval decisions protect delivery coverage.',
      caps: [
        'Identify who is out today or this week',
        'Support approval choices with team context',
        'Reduce overlapping critical absences',
        'Connect leave with attendance context when used'
      ],
      benefits: 'Approvals consider real staffing impact, not only personal entitlement.'
    },
    {
      id: 'reports', group: 'insight', title: 'Leave Reports', icon: 'analytics',
      desc: 'Run leave reports for balances, utilisation, and period summaries.',
      caps: [
        'Balance and utilisation snapshots',
        'Period leave registers for HR reviews',
        'Support management reporting packs',
        'Export-friendly summaries for audits'
      ],
      benefits: 'Leadership sees leave load without rebuilding spreadsheets each month.'
    },
    {
      id: 'halfday', group: 'people', title: 'Half-Day Leave', icon: 'schedule',
      desc: 'Support half-day applications where policy allows partial-day absence.',
      caps: [
        'Apply half-day when enabled by type',
        'Keep balance deductions accurate',
        'Align managers on morning or afternoon leave',
        'Avoid full-day deductions for short absences'
      ],
      benefits: 'Flex absences stay fair for staff and predictable for managers.'
    },
    {
      id: 'attendance', group: 'control', title: 'Attendance Integration', icon: 'how_to_reg',
      desc: 'Reflect approved leave on attendance so those days are not treated as unexplained absence.',
      caps: [
        'Show on-leave status on attendance registers',
        'Reduce false absence escalations',
        'Keep people ops modules in one platform',
        'Cleaner payroll and presence reconciliation'
      ],
      benefits: 'Presence and leave stay consistent for managers and payroll teams.'
    },
    {
      id: 'proof', group: 'control', title: 'Proof & Documentation', icon: 'attach_file',
      desc: 'Attach supporting proof for policy-required leave categories such as medical evidence.',
      caps: [
        'Upload proof with the application when required',
        'Keep documents with the leave record',
        'Support reviewer checks during approval',
        'Audit-friendly attachment history'
      ],
      benefits: 'Policy-sensitive leave can be verified without chasing files later.'
    }
  ];

  function matIcon(name) {
    return '<span class="material-symbols-outlined" aria-hidden="true">' + name + '</span>';
  }

  var listEl = document.getElementById('lvFeatList');
  var panelName = document.getElementById('lvPanelName');
  var panelDesc = document.getElementById('lvPanelDesc');
  var panelIcon = document.getElementById('lvPanelIcon');
  var panelCaps = document.getElementById('lvPanelCaps');
  var panelBenefits = document.getElementById('lvPanelBenefits');
  var activeId = features[0].id;

  function renderList(filter) {
    if (!listEl) return;
    listEl.innerHTML = features.map(function (f) {
      var hidden = filter !== 'all' && f.group !== filter;
      return (
        '<button type="button" role="tab" class="lv-feat' +
        (f.id === activeId ? ' is-active' : '') +
        (hidden ? ' is-hidden' : '') +
        '" data-id="' + f.id + '" aria-selected="' + (f.id === activeId ? 'true' : 'false') + '">' +
        '<span class="lv-feat__icon">' + matIcon(f.icon) + '</span>' +
        '<strong>' + f.title + '</strong><p>' + f.desc + '</p></button>'
      );
    }).join('');
  }

  function showFeature(id) {
    var f = features.find(function (x) { return x.id === id; }) || features[0];
    activeId = f.id;
    if (panelName) panelName.textContent = f.title;
    if (panelDesc) panelDesc.textContent = f.desc;
    if (panelIcon) panelIcon.textContent = f.icon;
    if (panelCaps) {
      panelCaps.innerHTML = f.caps.map(function (c) {
        return '<li>' + matIcon('check_circle') + '<span>' + c + '</span></li>';
      }).join('');
    }
    if (panelBenefits) panelBenefits.textContent = f.benefits;
    if (listEl) {
      listEl.querySelectorAll('.lv-feat').forEach(function (btn) {
        var on = btn.getAttribute('data-id') === activeId;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
  }

  renderList('all');
  showFeature(activeId);

  if (listEl) {
    listEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.lv-feat');
      if (!btn || btn.classList.contains('is-hidden')) return;
      showFeature(btn.getAttribute('data-id'));
    });
  }

  document.querySelectorAll('.lv-filter').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.lv-filter').forEach(function (c) {
        c.classList.remove('is-active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-selected', 'true');
      renderList(chip.getAttribute('data-filter') || 'all');
      var visible = listEl && listEl.querySelector('.lv-feat:not(.is-hidden)');
      if (visible) showFeature(visible.getAttribute('data-id'));
    });
  });

  /* Ops tabs */
  document.querySelectorAll('.lv-ops-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var id = tab.getAttribute('data-panel');
      document.querySelectorAll('.lv-ops-tab').forEach(function (t) {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      document.querySelectorAll('.lv-ops-panel').forEach(function (p) {
        p.classList.toggle('is-active', p.id === id);
      });
    });
  });

  /* Status filter for sample table */
  var statusFilter = document.getElementById('lvStatusFilter');
  if (statusFilter) {
    statusFilter.addEventListener('change', function () {
      var val = statusFilter.value;
      document.querySelectorAll('#lvReqTable tbody tr').forEach(function (row) {
        var st = row.getAttribute('data-status') || '';
        row.style.display = (!val || st === val) ? '' : 'none';
      });
    });
  }

  /* Flow pulse */
  var flowSteps = document.querySelectorAll('.lv-flow__step');
  var flowArrows = document.querySelectorAll('.lv-flow__arrow');
  if (flowSteps.length) {
    var fi = 0;
    setInterval(function () {
      flowSteps.forEach(function (s, i) { s.classList.toggle('is-on', i === fi); });
      flowArrows.forEach(function (a, i) { a.classList.toggle('is-on', i === fi || i === fi - 1); });
      fi = (fi + 1) % flowSteps.length;
    }, 2400);
  }

  function animateCount(el, target, prefix, suffix, duration) {
    var t0 = null;
    function frame(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / duration);
      var val = Math.round(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = (prefix || '') + val.toLocaleString('en-IN') + (suffix || '');
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var dashEl = document.getElementById('lvDash');
  var dashObserved = false;
  if (dashEl && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || dashObserved) return;
        dashObserved = true;
        dashEl.querySelectorAll('[data-count]').forEach(function (el) {
          animateCount(el, parseInt(el.getAttribute('data-count'), 10) || 0,
            el.getAttribute('data-prefix') || '', el.getAttribute('data-suffix') || '', 1100);
        });
        dashEl.querySelectorAll('.lv-bar').forEach(function (b) {
          b.style.setProperty('--w', (b.getAttribute('data-width') || '70') + '%');
          b.classList.add('is-on');
        });
        document.querySelectorAll('.lv-balance-bar').forEach(function (b) {
          b.style.setProperty('--w', (b.getAttribute('data-width') || '50') + '%');
          b.classList.add('is-on');
        });
        obs.disconnect();
      });
    }, { threshold: 0.25 }).observe(dashEl);
  } else {
    document.querySelectorAll('.lv-balance-bar').forEach(function (b) {
      b.style.setProperty('--w', (b.getAttribute('data-width') || '50') + '%');
      b.classList.add('is-on');
    });
  }

  var heroBar = document.querySelector('.lv-card__bar');
  var heroRing = document.querySelector('.lv-ring');
  if (heroBar) setTimeout(function () { heroBar.classList.add('is-on'); }, 400);
  if (heroRing) setTimeout(function () { heroRing.classList.add('is-on'); }, 500);

  /* Balance bars also animate when balance section visible */
  var balSec = document.getElementById('lvBalances');
  if (balSec && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        balSec.querySelectorAll('.lv-balance-bar').forEach(function (b) {
          b.style.setProperty('--w', (b.getAttribute('data-width') || '50') + '%');
          b.classList.add('is-on');
        });
        obs.disconnect();
      });
    }, { threshold: 0.3 }).observe(balSec);
  }

  document.querySelectorAll('.lv-faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.lv-faq__item');
      var open = item.classList.contains('is-open');
      document.querySelectorAll('.lv-faq__item').forEach(function (i) {
        i.classList.remove('is-open');
        var q = i.querySelector('.lv-faq__q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  if ('IntersectionObserver' in window) {
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          rev.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.lv-reveal').forEach(function (el) { rev.observe(el); });
  } else {
    document.querySelectorAll('.lv-reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
