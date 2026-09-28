/**
 * TimeERP Attendance landing — interactive explorer and ops preview.
 * Topics aligned with home Attendance module and HRMS attendance capabilities.
 */
(function () {
  'use strict';

  var features = [
    {
      id: 'daily', group: 'capture', title: 'Daily Attendance', icon: 'how_to_reg',
      desc: 'Track check-in and check-out status for every employee for the working day.',
      caps: [
        'View daily present, absent, late, and leave statuses',
        'Check-in and check-out timestamps on each record',
        'Support desk and mobile mark attendance',
        'Review exceptions before payroll cycles'
      ],
      benefits: 'HR and managers see who is in today without chasing WhatsApp lists.'
    },
    {
      id: 'shift', group: 'ops', title: 'Shift Management', icon: 'schedule',
      desc: 'Define rosters, shift timings, and assignments for multi-shift operations.',
      caps: [
        'Create and maintain shift timings',
        'Assign employees to shift patterns',
        'Support multi-branch and multi-site rosters',
        'Align expected hours with late and OT rules'
      ],
      benefits: 'Night and rotational teams stay measured against the right expected window.'
    },
    {
      id: 'biometric', group: 'capture', title: 'Biometric Integration', icon: 'fingerprint',
      desc: 'Connect biometric devices and review punch logs inside TimeERP attendance.',
      caps: [
        'Ingest biometric punch events into daily attendance',
        'Track device sync health and last sync time',
        'Reduce manual mark-ups for office populations',
        'Keep punch history for audit and disputes'
      ],
      benefits: 'Presence comes from the device of record, not only self-declaration.'
    },
    {
      id: 'geo', group: 'capture', title: 'Geo Attendance', icon: 'location_on',
      desc: 'Capture location-aware attendance for field and multi-site teams.',
      caps: [
        'Mark attendance with geo context where enabled',
        'Support field staff outside fixed office gates',
        'Review location notes on daily records',
        'Combine with face upload on mobile mark attendance'
      ],
      benefits: 'Field presence stays visible without forcing everyone through one gate.'
    },
    {
      id: 'late', group: 'control', title: 'Late Entry', icon: 'schedule',
      desc: 'Flag late arrivals against shift start times for manager review.',
      caps: [
        'Compare punch time with shift start',
        'Highlight late entry in daily views',
        'Feed attendance approval queues',
        'Reduce disputes with clear timestamps'
      ],
      benefits: 'Late patterns surface early for coaching, not only at month end.'
    },
    {
      id: 'ot', group: 'control', title: 'Overtime', icon: 'more_time',
      desc: 'Track overtime against shift rules with approval before payroll impact.',
      caps: [
        'Calculate OT from hours beyond shift window',
        'Separate pending and approved OT',
        'Support manager approval workflows',
        'Export OT context for payroll review'
      ],
      benefits: 'Extra hours are governed before they become payroll exceptions.'
    },
    {
      id: 'lock', group: 'control', title: 'Attendance Lock', icon: 'lock',
      desc: 'Lock periods after review so approved days stay stable for payroll.',
      caps: [
        'Close daily or period windows after HR review',
        'Prevent silent post-period edits without policy',
        'Protect payroll inputs during cycle close',
        'Keep audit-friendly freeze points'
      ],
      benefits: 'Payroll teams trust the attendance register they are processing.'
    },
    {
      id: 'approval', group: 'control', title: 'Attendance Approval', icon: 'fact_check',
      desc: 'Review pending check-ins and approve or reject attendance exceptions.',
      caps: [
        'Queue missing or irregular punches',
        'Approve or reject individual attendance cards',
        'Clear exceptions before payroll',
        'Keep manager and HR decisions on record'
      ],
      benefits: 'Exceptions clear quickly so payslips and compliance stay accurate.'
    },
    {
      id: 'desktop', group: 'capture', title: 'Desktop & Mobile Mark', icon: 'devices',
      desc: 'Employees mark attendance from desktop or mobile with face upload support.',
      caps: [
        'Desktop check-in for office staff',
        'Mobile mark attendance for on-the-go teams',
        'Face upload option where configured',
        'Uniform records across capture channels'
      ],
      benefits: 'One attendance register regardless of how staff check in.'
    },
    {
      id: 'reports', group: 'insight', title: 'Attendance Reports', icon: 'analytics',
      desc: 'Run period reports for presence, late entry, OT, and summary packs.',
      caps: [
        'Daily and period attendance summaries',
        'Late and OT highlight reports',
        'Department and branch breakouts where used',
        'Export packs for managers and audits'
      ],
      benefits: 'Leadership reviews workforce discipline without spreadsheet rebuilds.'
    },
    {
      id: 'leave-link', group: 'ops', title: 'Leave Context', icon: 'beach_access',
      desc: 'Show on-leave status next to attendance so absences are explained.',
      caps: [
        'Reflect approved leave on daily registers',
        'Reduce false absent flags for known leave',
        'Align with Leave Management workflows',
        'Cleaner reconciliation for managers'
      ],
      benefits: 'Absence reasons stay complete when leave is already approved.'
    },
    {
      id: 'payroll-link', group: 'insight', title: 'Payroll-Ready Inputs', icon: 'account_balance_wallet',
      desc: 'Deliver clean attendance status for salary cycles and OT components.',
      caps: [
        'Present, absent, late, and OT signals for finance',
        'Locked periods for cycle processing',
        'Reduce payroll rework from attendance gaps',
        'Connect with Payroll module reviews'
      ],
      benefits: 'Salary processing starts from reviewed presence, not open dispute stacks.'
    }
  ];

  function matIcon(name) {
    return '<span class="material-symbols-outlined" aria-hidden="true">' + name + '</span>';
  }

  var listEl = document.getElementById('attFeatList');
  var panelName = document.getElementById('attPanelName');
  var panelDesc = document.getElementById('attPanelDesc');
  var panelIcon = document.getElementById('attPanelIcon');
  var panelCaps = document.getElementById('attPanelCaps');
  var panelBenefits = document.getElementById('attPanelBenefits');
  var activeId = features[0].id;

  function renderList(filter) {
    if (!listEl) return;
    listEl.innerHTML = features.map(function (f) {
      var hidden = filter !== 'all' && f.group !== filter;
      return (
        '<button type="button" role="tab" class="att-feat' +
        (f.id === activeId ? ' is-active' : '') +
        (hidden ? ' is-hidden' : '') +
        '" data-id="' + f.id + '" aria-selected="' + (f.id === activeId ? 'true' : 'false') + '">' +
        '<span class="att-feat__icon">' + matIcon(f.icon) + '</span>' +
        '<strong>' + f.title + '</strong>' +
        '<p>' + f.desc + '</p></button>'
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
      listEl.querySelectorAll('.att-feat').forEach(function (btn) {
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
      var btn = e.target.closest('.att-feat');
      if (!btn || btn.classList.contains('is-hidden')) return;
      showFeature(btn.getAttribute('data-id'));
    });
  }

  document.querySelectorAll('.att-filter').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.att-filter').forEach(function (c) {
        c.classList.remove('is-active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-selected', 'true');
      renderList(chip.getAttribute('data-filter') || 'all');
      var visible = listEl && listEl.querySelector('.att-feat:not(.is-hidden)');
      if (visible) showFeature(visible.getAttribute('data-id'));
    });
  });

  /* Ops tabs */
  document.querySelectorAll('.att-ops-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var id = tab.getAttribute('data-panel');
      document.querySelectorAll('.att-ops-tab').forEach(function (t) {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      document.querySelectorAll('.att-ops-panel').forEach(function (p) {
        p.classList.toggle('is-active', p.id === id);
      });
    });
  });

  /* Flow pulse */
  var flowSteps = document.querySelectorAll('.att-flow__step');
  var flowArrows = document.querySelectorAll('.att-flow__arrow');
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

  var dashEl = document.getElementById('attDash');
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
        dashEl.querySelectorAll('.att-bar').forEach(function (b) {
          b.style.setProperty('--w', (b.getAttribute('data-width') || '70') + '%');
          b.classList.add('is-on');
        });
        obs.disconnect();
      });
    }, { threshold: 0.3 }).observe(dashEl);
  }

  var heroBar = document.querySelector('.att-card__bar');
  var heroRing = document.querySelector('.att-ring');
  if (heroBar) setTimeout(function () { heroBar.classList.add('is-on'); }, 400);
  if (heroRing) setTimeout(function () { heroRing.classList.add('is-on'); }, 500);

  document.querySelectorAll('.att-faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.att-faq__item');
      var open = item.classList.contains('is-open');
      document.querySelectorAll('.att-faq__item').forEach(function (i) {
        i.classList.remove('is-open');
        var q = i.querySelector('.att-faq__q');
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
    document.querySelectorAll('.att-reveal').forEach(function (el) { rev.observe(el); });
  } else {
    document.querySelectorAll('.att-reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
