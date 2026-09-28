/**
 * TIME ERP My Services: six company / industry cards.
 * Construction → service_construction.html
 * Real Estate → service_real_estate.html
 * Property Dealer → service_property_dealer.html
 * CA → service_CA.html
 * MSME → service_MSME.html
 * Professional Services → service_professional.html
 */
(function () {
  'use strict';

  var companies = [
    {
      id: 'construction',
      title: 'Construction',
      desc: 'Manage projects, labour, materials, and billing across multiple sites.',
      icon: 'construction',
      features: ['Site projects', 'Labour & materials', 'Multi-site billing', 'Field operations'],
      tip: 'Open the Construction services page to see BOQ, materials, subcontractors, RA billing, and field mobile.',
      href: 'service_construction.html',
      industryHref: 'construction.html',
      cta: 'Open Construction Services'
    },
    {
      id: 'real-estate',
      title: 'Real Estate',
      desc: 'Track properties, clients, agreements, and commission workflows for developers and real estate groups.',
      icon: 'apartment',
      features: ['Portfolio & projects', 'RERA compliance', 'Sales & inventory', 'GST & TDS finance'],
      tip: 'Open the Real Estate services page to see every TIME ERP capability for this industry.',
      href: 'service_real_estate.html',
      industryHref: 'real_Estate.html',
      cta: 'Open Real Estate Services'
    },
    {
      id: 'property-dealer',
      title: 'Property Dealer',
      desc: 'Lead management, site visits, and deal closure in one place for property brokers.',
      icon: 'home_work',
      features: ['Listings', 'Lead CRM', 'Site visits', 'Deal pipeline'],
      tip: 'Open the Property Dealer services page to see listings, lead CRM, site visits, commissions, and agent mobile.',
      href: 'service_property_dealer.html',
      industryHref: 'property_dealer.html',
      cta: 'Open Property Dealer Services'
    },
    {
      id: 'ca',
      title: 'Chartered Accountant',
      desc: 'Client tasks, compliance deadlines, billing, and document vault for CA practices.',
      icon: 'account_balance',
      features: ['Client portal', 'Compliance hub', 'Practice billing', 'Document vault'],
      tip: 'Open the CA Firms services page to see portal, compliance, billing, tax, audit, and document vault.',
      href: 'service_CA.html',
      industryHref: 'CA.html',
      cta: 'Open CA Services'
    },
    {
      id: 'msme',
      title: 'MSME',
      desc: 'Affordable ERP for growing businesses covering HR, CRM, and operations.',
      icon: 'storefront',
      features: ['CRM & sales', 'Billing & GST', 'HRMS & payroll', 'Projects & tasks'],
      tip: 'Open the MSME services page to see CRM, billing & GST, HRMS & payroll, projects, and documents.',
      href: 'service_MSME.html',
      industryHref: 'msme.html',
      cta: 'Open MSME Services'
    },
    {
      id: 'professional',
      title: 'Professional Services',
      desc: 'Time tracking, client billing, and project delivery at scale for service firms.',
      icon: 'work',
      features: ['Time tracking', 'Client billing', 'Project delivery', 'Team productivity'],
      tip: 'Open the Professional Services page to see timesheets, billing, project delivery, and productivity modules.',
      href: 'service_professional.html',
      industryHref: 'contact_sales.html',
      cta: 'Open Professional Services'
    }
  ];

  var grid = document.getElementById('svcGrid');
  var stepLabel = document.getElementById('svcStepLabel');
  var detailName = document.getElementById('svcDetailName');
  var detailDesc = document.getElementById('svcDetailDesc');
  var detailIcon = document.getElementById('svcDetailIcon');
  var stepsEl = document.getElementById('svcSteps');
  var demoList = document.getElementById('svcDemoList');
  var demoNote = document.getElementById('svcDetailTip');
  var demoLabel = document.getElementById('svcDemoLabel');
  var demoCta = document.getElementById('svcDemoCta');
  var demoSecondary = document.getElementById('svcDemoSecondary');
  var prevBtn = document.getElementById('svcPrev');
  var nextBtn = document.getElementById('svcNext');
  var pauseBtn = document.getElementById('svcPause');
  var active = 1;
  var paused = false;
  var timer = null;
  var stepTimer = null;
  var stepIndex = 0;

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function buildSteps(c) {
    return [
      { title: 'Industry focus', text: c.desc },
      { title: 'What TIME ERP covers', text: c.features.join(', ') + '.' },
      { title: 'Next step', text: c.href ? 'Open the dedicated services page for this company.' : 'A dedicated services page for this company is not built yet. You can still explore the industry overview.' }
    ];
  }

  function renderGrid() {
    if (!grid) return;
    grid.innerHTML = companies.map(function (c, i) {
      return ''
        + '<button type="button" class="svc-card' + (i === active ? ' is-active' : '') + (c.href ? ' svc-card--link' : '') + '" role="tab" aria-selected="' + (i === active ? 'true' : 'false') + '" data-index="' + i + '"' + (c.href ? ' data-href="' + escapeHtml(c.href) + '"' : '') + '>'
        +   '<span class="svc-card__icon" aria-hidden="true"><span class="material-symbols-outlined">' + escapeHtml(c.icon) + '</span></span>'
        +   '<h3>' + escapeHtml(c.title) + '</h3>'
        +   '<p>' + escapeHtml(c.desc) + '</p>'
        +   '<span class="svc-card__btn">' + escapeHtml(c.cta) + '</span>'
        + '</button>';
    }).join('');
  }

  function renderSteps(c) {
    if (!stepsEl) return;
    var steps = buildSteps(c);
    stepsEl.innerHTML = steps.map(function (st, i) {
      return ''
        + '<div class="svc-step' + (i === stepIndex ? ' is-on' : '') + '">'
        +   '<span class="svc-step__num">' + (i + 1) + '</span>'
        +   '<span><strong>' + escapeHtml(st.title) + '</strong><p>' + escapeHtml(st.text) + '</p></span>'
        + '</div>';
    }).join('');
  }

  function renderDemo(c) {
    if (!demoList) return;
    demoList.innerHTML = c.features.map(function (item, i) {
      return ''
        + '<div class="svc-demo__item" style="animation-delay:' + (i * 0.06) + 's">'
        +   '<span class="material-symbols-outlined" aria-hidden="true">check_circle</span>'
        +   '<span>' + escapeHtml(item) + '</span>'
        + '</div>';
    }).join('');
    if (demoLabel) demoLabel.textContent = 'Company';
    if (demoNote) demoNote.textContent = c.tip;
    if (demoCta) {
      if (c.href) {
        demoCta.textContent = c.cta;
        demoCta.href = c.href;
        demoCta.style.display = '';
      } else {
        demoCta.textContent = 'Coming Soon';
        demoCta.removeAttribute('href');
        demoCta.style.display = '';
        demoCta.onclick = function (e) { e.preventDefault(); };
      }
    }
    if (demoSecondary) {
      demoSecondary.href = c.industryHref;
      demoSecondary.textContent = 'View industry page';
    }
  }

  function setActive(index, fromUser) {
    active = (index + companies.length) % companies.length;
    stepIndex = 0;
    var c = companies[active];
    if (stepLabel) stepLabel.textContent = 'Company ' + (active + 1) + ' of ' + companies.length;
    if (detailName) detailName.textContent = c.title;
    if (detailDesc) detailDesc.textContent = c.desc;
    if (detailIcon) detailIcon.textContent = c.icon;
    renderGrid();
    renderSteps(c);
    renderDemo(c);
    if (fromUser) restartAuto();
    startStepCycle();
  }

  function startStepCycle() {
    clearInterval(stepTimer);
    var c = companies[active];
    var steps = buildSteps(c);
    stepTimer = setInterval(function () {
      if (paused) return;
      stepIndex = (stepIndex + 1) % steps.length;
      renderSteps(c);
    }, 2800);
  }

  function restartAuto() {
    clearInterval(timer);
    if (paused) return;
    timer = setInterval(function () {
      setActive(active + 1, false);
    }, 8000);
  }

  if (grid) {
    grid.addEventListener('click', function (e) {
      var card = e.target.closest('.svc-card');
      if (!card) return;
      var href = card.getAttribute('data-href');
      if (href) {
        window.location.href = href;
        return;
      }
      setActive(Number(card.getAttribute('data-index')) || 0, true);
      var spot = document.getElementById('svcSpotlight');
      if (spot) spot.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { setActive(active - 1, true); });
  if (nextBtn) nextBtn.addEventListener('click', function () { setActive(active + 1, true); });
  if (pauseBtn) {
    pauseBtn.addEventListener('click', function () {
      paused = !paused;
      pauseBtn.textContent = paused ? 'Play' : 'Pause';
      pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
      if (paused) clearInterval(timer);
      else restartAuto();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') setActive(active + 1, true);
    if (e.key === 'ArrowLeft') setActive(active - 1, true);
  });

  setActive(active, false);
  restartAuto();
})();
