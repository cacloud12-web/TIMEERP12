/**
 * TimeERP Consultants page — services, process, FAQ, reveal, hero panel
 */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var services = [
    {
      icon: 'map',
      title: 'Implementation Planning',
      desc: 'Define scope, modules, timelines, and ownership for a structured TimeERP rollout.',
      points: [
        'Confirm modules and rollout priorities',
        'Set implementation milestones and owners',
        'Align stakeholders before configuration starts'
      ]
    },
    {
      icon: 'analytics',
      title: 'Business Process Analysis',
      desc: 'Review current workflows and map them into TimeERP processes before setup.',
      points: [
        'Document current operating processes',
        'Identify gaps and process improvements',
        'Translate requirements into TimeERP configuration'
      ]
    },
    {
      icon: 'tune',
      title: 'System Configuration',
      desc: 'Configure organization settings, branches, departments, and workspace defaults.',
      points: [
        'Set organization and branch structure',
        'Configure defaults and preferences',
        'Prepare the workspace for module activation'
      ]
    },
    {
      icon: 'groups',
      title: 'HRMS Setup',
      desc: 'Configure employee records, attendance, leave, and HR operations in TimeERP HRMS.',
      points: [
        'Set up employee structure and HR workflows',
        'Configure attendance and leave policies',
        'Prepare HR teams for day to day use'
      ]
    },
    {
      icon: 'handshake',
      title: 'CRM Setup',
      desc: 'Configure lead handling, client records, follow ups, and CRM workflows.',
      points: [
        'Set lead and client process stages',
        'Configure follow up and activity tracking',
        'Align sales teams to CRM processes'
      ]
    },
    {
      icon: 'receipt_long',
      title: 'Billing Configuration',
      desc: 'Set up invoicing, payment tracking, and billing workflows for your organization.',
      points: [
        'Configure billing processes and invoice flow',
        'Align collections with finance operations',
        'Prepare finance users for billing tasks'
      ]
    },
    {
      icon: 'gavel',
      title: 'Compliance Configuration',
      desc: 'Configure statutory reporting readiness for GST, ESIC, EPFO, and related compliance needs.',
      points: [
        'Review compliance reporting requirements',
        'Configure compliance related workflows',
        'Prepare teams for audit ready reporting'
      ]
    },
    {
      icon: 'account_tree',
      title: 'Project Management Setup',
      desc: 'Configure projects, milestones, worklogs, and delivery tracking in Project Management.',
      points: [
        'Set project structures and milestones',
        'Configure task and progress tracking',
        'Align delivery teams to project workflows'
      ]
    },
    {
      icon: 'database',
      title: 'Data Migration Assistance',
      desc: 'Support migration of master data and opening records from spreadsheets or legacy tools.',
      points: [
        'Plan migration scope and validation checks',
        'Assist with master data preparation',
        'Verify records before go live'
      ]
    },
    {
      icon: 'admin_panel_settings',
      title: 'User Role & Permission Setup',
      desc: 'Define roles, access levels, and permissions so teams see only what they need.',
      points: [
        'Design role based access for each team',
        'Configure permissions across modules',
        'Validate access before rollout'
      ]
    },
    {
      icon: 'school',
      title: 'Employee Training',
      desc: 'Train users and admins on the modules and processes they will use every day.',
      points: [
        'Deliver role based user training',
        'Prepare administrators for ongoing setup',
        'Support adoption during early usage'
      ]
    },
    {
      icon: 'rocket_launch',
      title: 'Go Live Support',
      desc: 'Guide cutover, final checks, and launch readiness when your TimeERP workspace goes live.',
      points: [
        'Complete pre go live validation',
        'Support launch day readiness',
        'Stabilize early operational usage'
      ]
    },
    {
      icon: 'support_agent',
      title: 'Post Implementation Support',
      desc: 'Continue guidance after go live for configuration refinements and process questions.',
      points: [
        'Address post launch configuration needs',
        'Support teams during early adoption',
        'Refine workflows based on live usage'
      ]
    }
  ];

  var processSteps = [
    {
      title: 'Requirement Discussion',
      desc: 'Align on business goals, current workflows, and the TimeERP modules your teams need before configuration begins.',
      chips: ['Goals', 'Modules', 'Stakeholders']
    },
    {
      title: 'Business Analysis',
      desc: 'Map your operating processes into TimeERP so configuration reflects how CA firms, construction, real estate, MSME, and professional service teams actually work.',
      chips: ['Process map', 'Gaps', 'Priorities']
    },
    {
      title: 'Solution Planning',
      desc: 'Define the implementation plan, module sequence, migration scope, training plan, and go live checklist.',
      chips: ['Plan', 'Sequence', 'Owners']
    },
    {
      title: 'System Configuration',
      desc: 'Configure organization settings, roles, HRMS, CRM, billing, compliance, projects, and related TimeERP modules.',
      chips: ['Setup', 'Modules', 'Permissions']
    },
    {
      title: 'Data Migration',
      desc: 'Prepare and validate master data and opening records so teams start work in TimeERP with reliable information.',
      chips: ['Masters', 'Validation', 'Cutover']
    },
    {
      title: 'User Training',
      desc: 'Train employees and administrators on the modules and workflows they will use after go live.',
      chips: ['Users', 'Admins', 'Adoption']
    },
    {
      title: 'Go Live',
      desc: 'Complete final checks and launch TimeERP with consulting support during the critical cutover window.',
      chips: ['Launch', 'Checks', 'Stabilization']
    },
    {
      title: 'Continuous Support',
      desc: 'Continue post implementation guidance for refinements, questions, and smoother ongoing platform use.',
      chips: ['Support', 'Refinement', 'Optimization']
    }
  ];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  /* Hero panel — interactive step cycle */
  var heroPanel = document.getElementById('csHeroPanel');
  var heroSteps = document.getElementById('csHeroSteps');
  var heroProgress = document.getElementById('csHeroProgress');
  var heroStatus = document.getElementById('csHeroStatus');
  if (heroSteps && heroProgress) {
    var heroRows = Array.prototype.slice.call(heroSteps.querySelectorAll('.hero__panel-row'));
    var heroIndex = 0, heroTimer = null, heroPaused = false;
    var heroLabels = ['In progress', 'In progress', 'In progress', 'In progress', 'Ready for go live'];

    function setHeroStep(i) {
      heroIndex = i;
      heroRows.forEach(function (row, idx) {
        row.classList.toggle('is-active', idx === i);
        row.setAttribute('aria-pressed', idx === i ? 'true' : 'false');
      });
      heroProgress.style.width = ((i + 1) / heroRows.length * 100) + '%';
      if (heroStatus) heroStatus.textContent = heroLabels[i] || 'In progress';
      if (heroStatus) heroStatus.classList.toggle('is-done', i === heroRows.length - 1);
    }

    function startHeroCycle() {
      clearInterval(heroTimer);
      if (prefersReduced) return;
      heroTimer = setInterval(function () {
        if (heroPaused || document.hidden) return;
        setHeroStep((heroIndex + 1) % heroRows.length);
      }, 4000);
    }

    heroRows.forEach(function (row, i) {
      row.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      row.addEventListener('click', function () {
        setHeroStep(parseInt(row.getAttribute('data-step'), 10));
        startHeroCycle();
      });
    });
    if (heroPanel) {
      heroPanel.addEventListener('mouseenter', function () { heroPaused = true; });
      heroPanel.addEventListener('mouseleave', function () { heroPaused = false; });
    }
    setHeroStep(0);
    startHeroCycle();
  }

  /* Services */
  var serviceList = document.getElementById('csServiceList');
  var detailEl = document.getElementById('csDetail');
  if (serviceList && detailEl) {
    var serviceBtns = [];
    var serviceIndex = 0, serviceTimer = null, servicePaused = false;
    serviceList.innerHTML = services.map(function (s, i) {
      return '<button type="button" class="service-btn' + (i === 0 ? ' is-active' : '') + '" role="tab" aria-selected="' + (i === 0 ? 'true' : 'false') + '" data-service="' + i + '">'
        + '<span class="service-btn__icon" aria-hidden="true"><span class="material-symbols-outlined">' + s.icon + '</span></span>'
        + '<span class="service-btn__name">' + escapeHtml(s.title) + '</span>'
        + '<span class="service-btn__desc">' + escapeHtml(s.desc) + '</span></button>';
    }).join('');
    serviceBtns = Array.prototype.slice.call(serviceList.querySelectorAll('.service-btn'));

    function activateService(index) {
      if (index < 0 || index >= services.length) return;
      serviceIndex = index;
      var item = services[index];
      serviceBtns.forEach(function (btn, i) {
        var on = i === index;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      detailEl.classList.add('is-updating');
      window.setTimeout(function () {
        document.getElementById('csDetailIcon').textContent = item.icon;
        document.getElementById('csDetailTitle').textContent = item.title;
        document.getElementById('csDetailDesc').textContent = item.desc;
        document.getElementById('csDetailList').innerHTML = item.points.map(function (p) {
          return '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span><span>' + escapeHtml(p) + '</span></li>';
        }).join('');
        detailEl.classList.remove('is-updating');
      }, 140);
    }

    serviceBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateService(parseInt(btn.getAttribute('data-service'), 10));
        if (window.matchMedia('(max-width: 980px)').matches) {
          detailEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        startServiceCycle();
      });
    });
    activateService(0);

    function startServiceCycle() {
      clearInterval(serviceTimer);
      if (prefersReduced) return;
      serviceTimer = setInterval(function () {
        if (servicePaused || document.hidden) return;
        activateService((serviceIndex + 1) % services.length);
      }, 5500);
    }

    var servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.addEventListener('mouseenter', function () { servicePaused = true; });
      servicesSection.addEventListener('mouseleave', function () { servicePaused = false; });
      if ('IntersectionObserver' in window) {
        var sio = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) startServiceCycle();
          else clearInterval(serviceTimer);
        }, { threshold: .2 });
        sio.observe(servicesSection);
      } else startServiceCycle();
    }
  }

  /* Process */
  var stepList = document.getElementById('csStepList');
  var processPanel = document.getElementById('csProcessPanel');
  var processWrap = document.getElementById('csProcessWrap');
  var processProgress = document.getElementById('csProcessProgress');
  var processPrev = document.getElementById('csProcessPrev');
  var processNext = document.getElementById('csProcessNext');
  if (stepList && processPanel) {
    var stepBtns = [];
    var stepIndex = 0, stepTimer = null, stepPaused = false;
    stepList.innerHTML = processSteps.map(function (s, i) {
      return '<button type="button" class="process-step' + (i === 0 ? ' is-active' : '') + '" role="tab" aria-selected="' + (i === 0 ? 'true' : 'false') + '" data-step="' + i + '">'
        + '<span class="process-step__num">' + (i + 1) + '</span>'
        + '<span class="process-step__label">' + escapeHtml(s.title) + '</span></button>';
    }).join('');
    stepBtns = Array.prototype.slice.call(stepList.querySelectorAll('.process-step'));

    function activateStep(index) {
      if (index < 0 || index >= processSteps.length) return;
      stepIndex = index;
      var item = processSteps[index];
      stepBtns.forEach(function (btn, i) {
        var on = i === index;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (processProgress) processProgress.style.width = ((index + 1) / processSteps.length * 100) + '%';
      if (processPrev) processPrev.disabled = index === 0;
      if (processNext) processNext.disabled = index === processSteps.length - 1;
      processPanel.classList.add('is-updating');
      window.setTimeout(function () {
        document.getElementById('csProcessStepLabel').textContent = 'Step ' + (index + 1) + ' of ' + processSteps.length;
        document.getElementById('csProcessTitle').textContent = item.title;
        document.getElementById('csProcessDesc').textContent = item.desc;
        document.getElementById('csProcessMeta').innerHTML = item.chips.map(function (c) {
          return '<span class="process-chip"><span class="material-symbols-outlined" aria-hidden="true">check</span>' + escapeHtml(c) + '</span>';
        }).join('');
        processPanel.classList.remove('is-updating');
      }, 140);
    }

    stepBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateStep(parseInt(btn.getAttribute('data-step'), 10));
        startStepCycle();
      });
    });

    if (processPrev) processPrev.addEventListener('click', function () {
      activateStep(stepIndex - 1); startStepCycle();
    });
    if (processNext) processNext.addEventListener('click', function () {
      activateStep(stepIndex + 1); startStepCycle();
    });

    function startStepCycle() {
      clearInterval(stepTimer);
      if (prefersReduced) return;
      stepTimer = setInterval(function () {
        if (stepPaused || document.hidden) return;
        activateStep((stepIndex + 1) % processSteps.length);
      }, 5000);
    }

    if (processWrap) {
      processWrap.addEventListener('mouseenter', function () { stepPaused = true; });
      processWrap.addEventListener('mouseleave', function () { stepPaused = false; });
    }

    activateStep(0);
    startStepCycle();
  }

  /* FAQ */
  document.querySelectorAll('.faq__item').forEach(function (item) {
    var btn = item.querySelector('.faq__q');
    var panel = item.querySelector('.faq__a');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      var open = item.classList.contains('is-open');
      document.querySelectorAll('.faq__item.is-open').forEach(function (other) {
        if (other === item) return;
        other.classList.remove('is-open');
        var ob = other.querySelector('.faq__q');
        var op = other.querySelector('.faq__a');
        if (ob) ob.setAttribute('aria-expanded', 'false');
        if (op) op.style.maxHeight = null;
      });
      if (open) {
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* Reveal on scroll */
  if ('IntersectionObserver' in window) {
    var reveals = document.querySelectorAll('.reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
