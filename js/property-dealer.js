(function () {
  'use strict';

  var PILLAR_DETAILS = {
    listings: {
      title: 'Listing inventory hub for every property type',
      body: 'Residential flats, plots, commercial shops, and builder projects in one searchable catalog. Attach photos, floor plans, pricing, possession dates, and RERA IDs. Agents share live inventory without outdated WhatsApp PDFs.'
    },
    leads: {
      title: 'Buyer & seller CRM with source tracking',
      body: 'Capture inquiries from portals, walk-ins, referrals, and builder tie-ups. Tag budget, location preference, and timeline. Auto-assign leads to agents and track follow-up SLAs so hot buyers never go cold.'
    },
    visits: {
      title: 'Site visit scheduling & feedback',
      body: 'Book site visits with calendar sync, agent routing, and buyer reminders. Log visit notes, objections, and interest level on the spot. Managers see visit-to-offer conversion by agent and project.'
    },
    deals: {
      title: 'Deal pipeline from token to registration',
      body: 'Track every deal stage: site visit, negotiation, token, agreement, home loan, and registration. Document checklists, milestone dates, and stakeholder roles keep transactions on track across your team.'
    },
    commissions: {
      title: 'Commission splits & builder payouts',
      body: 'Define commission rules per project, agent, and referral partner. Track earned vs received commission, TDS, and builder payment schedules. Month-end brokerage statements without manual Excel reconciliation.'
    }
  };

  var WORKFLOW_CONTENT = {
    capture: { title: 'Lead capture from every channel', body: 'Import leads from 99acres, MagicBricks, Housing.com, your website, and walk-in registers. Duplicate detection and source tagging show which channels deliver closed deals.' },
    qualify: { title: 'Qualify buyers & match listings', body: 'Score leads by budget, location, and urgency. Smart matching surfaces relevant inventory from your catalog and builder tie-ups. Agents start every call with the right properties ready.' },
    visit: { title: 'Site visits & buyer engagement', body: 'Schedule visits, send location pins and reminders, and capture feedback immediately after. Track repeat visits and buyer interest signals before negotiation begins.' },
    negotiate: { title: 'Negotiation & offer management', body: 'Log counter-offers, builder approvals, and price revisions in one deal thread. Share offer summaries with buyers and sellers while leadership monitors pipeline value in real time.' },
    booking: { title: 'Token, KYC & agreement', body: 'Collect token payments, buyer/seller KYC, and draft sale agreements. RERA-ready document templates and checklist workflows reduce compliance gaps before registration.' },
    closure: { title: 'Registration, handover & commission', body: 'Track registration dates, possession handover, and final commission release. Agent payout reports and builder receivables close the loop on every closed deal.' }
  };

  var SOLUTION_DETAILS = {
    pipeline: {
      icon: 'timeline',
      title: 'Visual deal pipeline',
      lead: 'Kanban-style pipeline from inquiry to registration with deal value, stage aging, and agent ownership on every card.',
      features: ['Stage-based deal boards', 'Deal value & probability', 'Agent workload view', 'Builder project pipelines', 'Lost-deal reason tracking', 'Executive revenue forecast'],
      stat: { value: '2.4x', label: 'Faster deal velocity' }
    },
    mobile: {
      icon: 'smartphone',
      title: 'Agent mobile CRM',
      lead: 'Field agents update leads, log site visits, and share listings from mobile without returning to the office.',
      features: ['On-the-go lead updates', 'Visit check-in & notes', 'WhatsApp listing share', 'Call & follow-up reminders', 'Offline-friendly capture', 'GPS visit verification'],
      stat: { value: '65%', label: 'More visits logged' }
    },
    automate: {
      title: 'Follow-up automation',
      icon: 'autorenew',
      lead: 'Automated reminders for cold leads, visit confirmations, and post-visit follow-ups so no buyer slips through the cracks.',
      features: ['Lead nurture sequences', 'Visit reminder SMS', 'Post-visit follow-up tasks', 'Birthday & anniversary outreach', 'Stale lead escalation', 'Builder inventory alerts'],
      stat: { value: '40%+', label: 'Less manual follow-up' }
    }
  };

  var MODULES = {
    listings: {
      title: 'Listing & inventory management',
      points: ['Residential, commercial & plot catalog', 'Photo & floor plan gallery', 'Price, area & possession tracking', 'Builder project tie-ups', 'Portal syndication ready', 'Availability & hold status']
    },
    leads: {
      title: 'Lead & buyer CRM',
      points: ['Multi-source lead capture', 'Budget & preference tagging', 'Agent assignment rules', 'Follow-up task queues', 'Duplicate lead detection', 'Call & meeting history']
    },
    deals: {
      title: 'Deal & transaction tracking',
      points: ['Stage-based deal pipeline', 'Token & payment milestones', 'Buyer/seller KYC vault', 'Agreement & document checklist', 'Home loan status tracking', 'Registration date calendar']
    },
    commissions: {
      title: 'Commission & brokerage finance',
      points: ['Agent commission splits', 'Builder payment schedules', 'Referral partner payouts', 'TDS on brokerage', 'Earned vs received ledger', 'GST-ready brokerage invoices']
    }
  };

  var SECURITY_DETAILS = {
    encrypt: { title: 'Encryption for KYC & deal documents', body: 'Buyer Aadhaar, PAN, sale agreements, and payment records protected with AES-256 at rest and TLS 1.2+ in transit essential for brokerage firms handling sensitive client data.' },
    rbac: { title: 'Agent & branch-level access', body: 'Agents see only their leads and deals. Branch managers see their office. Leadership gets firm-wide pipeline and commission views least privilege by default.' },
    audit: { title: 'Full audit trails', body: 'Every lead edit, deal stage change, and document access logged with user and timestamp. Exportable for RERA audits and internal compliance reviews.' },
    mfa: { title: 'MFA & session controls', body: 'Multi-factor on commission approvals and financial exports. Configurable session timeouts for shared brokerage office devices.' },
    backup: { title: 'Backups & disaster recovery', body: 'Daily encrypted backups with point-in-time recovery because losing active deal data during a closing week is not an option.' },
    validate: { title: 'Secure SDLC & input validation', body: 'Server-side validation on lead forms, CSP headers, and security review on every release protecting multi-tenant brokerage data.' }
  };

  var ONBOARD_DETAILS = {
    discovery: { title: 'Brokerage discovery call', body: 'We map your team size, listing volume, builder tie-ups, and commission structures then recommend setup aligned to how your firm actually closes deals.' },
    migration: { title: 'Listing & lead migration', body: 'Import active listings, open leads, and deal pipeline from Excel or legacy CRM tools validated before your agents go live on day one.' },
    training: { title: 'Agent & back-office training', body: 'Sessions for field agents, telecallers, and accounts teams plus mobile app setup guides for smooth field adoption.' },
    success: { title: 'Dedicated brokerage success partner', body: 'A named contact for rollout, month-end commission support, and quarterly pipeline reviews not a generic help desk ticket queue.' }
  };

  var activePillar = 'listings';
  var activeWorkflow = 'capture';
  var activeSolution = 'pipeline';
  var activeModule = 'listings';
  var activeSecurity = 'encrypt';
  var activeOnboard = 'discovery';

  function bindInteractiveTab(el, onSelect) {
    el.addEventListener('click', function () { onSelect(false); });
    el.addEventListener('mouseenter', function () { onSelect(true); });
    el.addEventListener('focus', function () { onSelect(true); });
  }

  function swapPanel(panel, html, instant) {
    if (!panel) return;
    if (instant) {
      panel.innerHTML = html;
      panel.classList.add('is-visible');
      return;
    }
    panel.classList.remove('is-visible');
    setTimeout(function () {
      panel.innerHTML = html;
      panel.classList.add('is-visible');
    }, 80);
  }

  var pillarCards = document.querySelectorAll('[data-pillar]');
  var pillarDetail = document.getElementById('pdPillarDetail');

  function setPillar(id, instant) {
    activePillar = id;
    var detail = PILLAR_DETAILS[id];
    if (!detail) return;
    pillarCards.forEach(function (card) {
      var on = card.getAttribute('data-pillar') === id;
      card.classList.toggle('is-active', on);
      card.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    swapPanel(pillarDetail, '<h3>' + detail.title + '</h3><p>' + detail.body + '</p>', instant);
  }

  pillarCards.forEach(function (card) {
    bindInteractiveTab(card, function (instant) {
      setPillar(card.getAttribute('data-pillar') || 'listings', instant);
    });
  });

  var workflowSteps = document.querySelectorAll('.sp-workflow__step[data-step]');
  var workflowDetail = document.getElementById('pdWorkflowDetail');

  function setWorkflow(id, instant) {
    activeWorkflow = id;
    var content = WORKFLOW_CONTENT[id];
    if (!content) return;
    workflowSteps.forEach(function (el) {
      var on = el.getAttribute('data-step') === id;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    swapPanel(workflowDetail, '<h3>' + content.title + '</h3><p>' + content.body + '</p>', instant);
  }

  workflowSteps.forEach(function (el) {
    bindInteractiveTab(el, function (instant) {
      setWorkflow(el.getAttribute('data-step') || 'capture', instant);
    });
  });

  var solutionCards = document.querySelectorAll('.sp-solution-card[data-solution]');
  var solutionPanel = document.getElementById('pdSolutionPanel');

  function renderSolutionPanel(id) {
    var detail = SOLUTION_DETAILS[id];
    if (!detail || !solutionPanel) return;
    var featuresHtml = detail.features.map(function (f) {
      return '<li><span class="material-symbols-outlined">check_circle</span>' + f + '</li>';
    }).join('');
    solutionPanel.innerHTML =
      '<div class="sp-solutions__panel-head">' +
        '<div class="sp-solutions__panel-icon"><span class="material-symbols-outlined">' + detail.icon + '</span></div>' +
        '<div><h3>' + detail.title + '</h3><p>' + detail.lead + '</p></div>' +
      '</div>' +
      '<div class="sp-solutions__panel-grid">' +
        '<div class="sp-solutions__panel-list"><h4>Key capabilities</h4><ul>' + featuresHtml + '</ul></div>' +
        '<div class="sp-solutions__panel-stat"><strong>' + detail.stat.value + '</strong><span>' + detail.stat.label + '</span></div>' +
      '</div>';
  }

  function setSolution(id, instant) {
    activeSolution = id;
    solutionCards.forEach(function (card) {
      var on = card.getAttribute('data-solution') === id;
      card.classList.toggle('is-active', on);
      card.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (!solutionPanel) return;
    if (instant) {
      renderSolutionPanel(id);
      solutionPanel.classList.add('is-visible');
      return;
    }
    solutionPanel.classList.remove('is-visible');
    setTimeout(function () {
      renderSolutionPanel(id);
      solutionPanel.classList.add('is-visible');
    }, 80);
  }

  solutionCards.forEach(function (card) {
    bindInteractiveTab(card, function (instant) {
      setSolution(card.getAttribute('data-solution') || 'pipeline', instant);
    });
  });

  var moduleTabs = document.querySelectorAll('.sp-module-tab[data-module]');
  var modulePanel = document.getElementById('pdModulePanel');

  function setModule(id, instant) {
    activeModule = id;
    var mod = MODULES[id];
    if (!mod) return;
    moduleTabs.forEach(function (tab) {
      var on = tab.getAttribute('data-module') === id;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    var html = '<h3>' + mod.title + '</h3><ul>' + mod.points.map(function (p) {
      return '<li>' + p + '</li>';
    }).join('') + '</ul>';
    swapPanel(modulePanel, html, instant);
  }

  moduleTabs.forEach(function (tab) {
    bindInteractiveTab(tab, function (instant) {
      setModule(tab.getAttribute('data-module') || 'listings', instant);
    });
  });

  var securityCards = document.querySelectorAll('.sp-sec-card[data-security]');
  var securityDetail = document.getElementById('pdSecurityDetail');

  function setSecurity(id, instant) {
    activeSecurity = id;
    var detail = SECURITY_DETAILS[id];
    if (!detail) return;
    securityCards.forEach(function (card) {
      var on = card.getAttribute('data-security') === id;
      card.classList.toggle('is-active', on);
      card.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    swapPanel(securityDetail, '<h3>' + detail.title + '</h3><p>' + detail.body + '</p>', instant);
  }

  securityCards.forEach(function (card) {
    bindInteractiveTab(card, function (instant) {
      setSecurity(card.getAttribute('data-security') || 'encrypt', instant);
    });
  });

  var onboardCards = document.querySelectorAll('[data-onboard]');
  var onboardDetail = document.getElementById('pdOnboardDetail');

  function setOnboard(id, instant) {
    activeOnboard = id;
    var detail = ONBOARD_DETAILS[id];
    if (!detail) return;
    onboardCards.forEach(function (card) {
      var on = card.getAttribute('data-onboard') === id;
      card.classList.toggle('is-active', on);
      card.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    swapPanel(onboardDetail, '<h3>' + detail.title + '</h3><p>' + detail.body + '</p>', instant);
  }

  onboardCards.forEach(function (card) {
    bindInteractiveTab(card, function (instant) {
      setOnboard(card.getAttribute('data-onboard') || 'discovery', instant);
    });
  });

  var proofSlides = document.getElementById('pdProofSlides');
  var proofDots = document.querySelectorAll('.pd-proof__dot');
  var proofPrev = document.getElementById('pdProofPrev');
  var proofNext = document.getElementById('pdProofNext');
  var proofIndex = 0;
  var proofTotal = proofDots.length;
  var proofTimer = null;

  function goProofSlide(i) {
    if (!proofSlides || !proofTotal) return;
    proofIndex = (i + proofTotal) % proofTotal;
    proofSlides.style.transform = 'translateX(-' + (proofIndex * 100) + '%)';
    proofDots.forEach(function (dot, idx) {
      dot.classList.toggle('is-active', idx === proofIndex);
    });
  }

  function startProofAutoplay() {
    if (proofTimer) clearInterval(proofTimer);
    proofTimer = setInterval(function () { goProofSlide(proofIndex + 1); }, 6500);
  }

  if (proofPrev) proofPrev.addEventListener('click', function () { goProofSlide(proofIndex - 1); startProofAutoplay(); });
  if (proofNext) proofNext.addEventListener('click', function () { goProofSlide(proofIndex + 1); startProofAutoplay(); });
  proofDots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goProofSlide(parseInt(dot.getAttribute('data-slide'), 10));
      startProofAutoplay();
    });
  });
  if (proofTotal) startProofAutoplay();

  var listingsEl = document.getElementById('pdCalcListings');
  var staffEl = document.getElementById('pdCalcStaff');
  var hoursEl = document.getElementById('pdCalcHours');
  var savingsEl = document.getElementById('pdCalcSavings');
  var timeEl = document.getElementById('pdCalcTime');
  var annualEl = document.getElementById('pdCalcAnnual');
  var efficiencyEl = document.getElementById('pdCalcEfficiency');
  var perPersonEl = document.getElementById('pdCalcPerPerson');
  var barFillEl = document.getElementById('pdCalcBarFill');
  var barPctEl = document.getElementById('pdCalcBarPct');
  var resultPanel = document.getElementById('pdCalcResult');
  var calcFields = document.querySelectorAll('.sp-calc__field');
  var calcPresets = document.querySelectorAll('.sp-calc__preset');

  var CALC_PRESETS = {
    small: { listings: 25, staff: 8, hours: 5 },
    growing: { listings: 80, staff: 18, hours: 6 },
    mid: { listings: 200, staff: 35, hours: 7 },
    large: { listings: 500, staff: 75, hours: 8 }
  };

  var calcAnim = { savings: 0, hours: 0, annual: 0, perPerson: 0, efficiency: 0, bar: 0 };
  var calcAnimFrame = null;

  function rangeFill(el, fillEl) {
    if (!el || !fillEl) return;
    var min = parseFloat(el.min);
    var max = parseFloat(el.max);
    var pct = ((parseFloat(el.value) - min) / (max - min)) * 100;
    fillEl.style.width = pct + '%';
  }

  function setCalcFieldActive(fieldName) {
    calcFields.forEach(function (field) {
      field.classList.toggle('is-active', field.getAttribute('data-field') === fieldName);
    });
  }

  function formatCurrency(n) {
    return '\u20B9' + Math.round(n).toLocaleString('en-IN');
  }

  function renderCalcOutputs(values) {
    if (savingsEl) savingsEl.textContent = formatCurrency(values.savings);
    if (timeEl) timeEl.textContent = Math.round(values.hours);
    if (annualEl) annualEl.textContent = formatCurrency(values.annual);
    if (efficiencyEl) efficiencyEl.textContent = Math.round(values.efficiency) + '%';
    if (perPersonEl) perPersonEl.textContent = Math.round(values.perPerson) + ' hrs';
    if (barFillEl) barFillEl.style.width = Math.round(values.bar) + '%';
    if (barPctEl) barPctEl.textContent = Math.round(values.bar) + '%';
  }

  function animateCalculator(from, to, duration) {
    if (calcAnimFrame) cancelAnimationFrame(calcAnimFrame);
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      renderCalcOutputs({
        savings: from.savings + (to.savings - from.savings) * eased,
        hours: from.hours + (to.hours - from.hours) * eased,
        annual: from.annual + (to.annual - from.annual) * eased,
        perPerson: from.perPerson + (to.perPerson - from.perPerson) * eased,
        efficiency: from.efficiency + (to.efficiency - from.efficiency) * eased,
        bar: from.bar + (to.bar - from.bar) * eased
      });
      if (p < 1) calcAnimFrame = requestAnimationFrame(tick);
      else calcAnim = to;
    }
    calcAnimFrame = requestAnimationFrame(tick);
  }

  function updateCalculator(instant) {
    if (!listingsEl || !staffEl || !hoursEl) return;
    var listings = parseInt(listingsEl.value, 10);
    var staff = parseInt(staffEl.value, 10);
    var hours = parseInt(hoursEl.value, 10);
    var monthlyHours = staff * hours * 4;
    var efficiencyPct = Math.round((0.32 + (listings - 10) * 0.0008 + (staff - 3) * 0.002) * 100);
    efficiencyPct = Math.min(Math.max(efficiencyPct, 28), 46);
    var savedHours = Math.round(monthlyHours * (efficiencyPct / 100));
    var hourlyRate = 550;
    var savings = savedHours * hourlyRate;
    var annual = savings * 12;
    var perPerson = staff ? Math.round(savedHours / staff) : 0;
    var next = { savings: savings, hours: savedHours, annual: annual, perPerson: perPerson, efficiency: efficiencyPct, bar: efficiencyPct };

    listingsEl.setAttribute('aria-valuenow', listings);
    staffEl.setAttribute('aria-valuenow', staff);
    hoursEl.setAttribute('aria-valuenow', hours);
    var listingsVal = document.getElementById('pdCalcListingsVal');
    var staffVal = document.getElementById('pdCalcStaffVal');
    var hoursVal = document.getElementById('pdCalcHoursVal');
    if (listingsVal) listingsVal.textContent = listings;
    if (staffVal) staffVal.textContent = staff;
    if (hoursVal) hoursVal.textContent = hours;

    rangeFill(listingsEl, document.getElementById('pdCalcListingsFill'));
    rangeFill(staffEl, document.getElementById('pdCalcStaffFill'));
    rangeFill(hoursEl, document.getElementById('pdCalcHoursFill'));

    document.querySelectorAll('.sp-calc__step').forEach(function (btn) {
      var target = document.getElementById(btn.getAttribute('data-target'));
      if (!target) return;
      var val = parseInt(target.value, 10);
      var step = parseInt(btn.getAttribute('data-step'), 10);
      btn.disabled = val + step < parseInt(target.min, 10) || val + step > parseInt(target.max, 10);
    });

    if (instant) {
      renderCalcOutputs(next);
      calcAnim = next;
      return;
    }
    if (resultPanel) {
      resultPanel.classList.add('is-pulse');
      setTimeout(function () { resultPanel.classList.remove('is-pulse'); }, 350);
    }
    animateCalculator(calcAnim, next, 420);
  }

  function applyPreset(name) {
    var preset = CALC_PRESETS[name];
    if (!preset || !listingsEl || !staffEl || !hoursEl) return;
    listingsEl.value = preset.listings;
    staffEl.value = preset.staff;
    hoursEl.value = preset.hours;
    calcPresets.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-preset') === name);
    });
    updateCalculator(false);
  }

  [listingsEl, staffEl, hoursEl].forEach(function (el) {
    if (!el) return;
    el.addEventListener('input', function () {
      calcPresets.forEach(function (btn) { btn.classList.remove('is-active'); });
      updateCalculator(false);
    });
    el.addEventListener('focus', function () {
      var field = el.closest('.sp-calc__field');
      if (field) setCalcFieldActive(field.getAttribute('data-field'));
    });
  });

  document.querySelectorAll('.sp-calc__step').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-target'));
      if (!target || btn.disabled) return;
      var step = parseInt(btn.getAttribute('data-step'), 10);
      var next = parseInt(target.value, 10) + step;
      if (next < parseInt(target.min, 10) || next > parseInt(target.max, 10)) return;
      target.value = next;
      calcPresets.forEach(function (b) { b.classList.remove('is-active'); });
      updateCalculator(false);
    });
  });

  calcPresets.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyPreset(btn.getAttribute('data-preset') || 'small');
    });
  });

  calcFields.forEach(function (field) {
    field.addEventListener('mouseenter', function () {
      setCalcFieldActive(field.getAttribute('data-field'));
    });
  });

  var dashTabs = document.querySelectorAll('[data-dash]');
  var dashPanel = document.getElementById('pdDashPanel');

  var DASH_DATA = {
    pipeline: { title: 'Deal pipeline', items: [
      { label: 'Active deals in pipeline', value: '47 deals', status: 'active' },
      { label: 'Pipeline value', value: '\u20B918.6 Cr', status: 'done' },
      { label: 'Deals closing this month', value: '12 deals', status: 'warn' },
      { label: 'Avg days in pipeline', value: '38 days', status: 'active' }
    ]},
    listings: { title: 'Active listings', items: [
      { label: 'Properties on market', value: '186 listings', status: 'done' },
      { label: 'New listings this week', value: '14 added', status: 'active' },
      { label: 'Builder tie-up projects', value: '23 projects', status: 'done' },
      { label: 'Listings with site visits', value: '68 this month', status: 'warn' }
    ]},
    commissions: { title: 'Commission tracker', items: [
      { label: 'Earned this quarter', value: '\u20B942.5L', status: 'done' },
      { label: 'Pending from builders', value: '\u20B918.2L', status: 'warn' },
      { label: 'Agent payouts due', value: '\u20B96.8L', status: 'warn' },
      { label: 'Deals closed this month', value: '9 closures', status: 'active' }
    ]}
  };

  function renderDash(id) {
    var data = DASH_DATA[id];
    if (!data || !dashPanel) return;
    var itemsHtml = data.items.map(function (item) {
      return '<div class="ca-dash__row ca-dash__row--' + item.status + '"><span>' + item.label + '</span><strong>' + item.value + '</strong></div>';
    }).join('');
    dashPanel.innerHTML = '<h4>' + data.title + '</h4>' + itemsHtml;
    dashPanel.classList.add('is-visible');
  }

  dashTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var id = tab.getAttribute('data-dash');
      dashTabs.forEach(function (t) {
        t.classList.toggle('is-active', t.getAttribute('data-dash') === id);
      });
      renderDash(id);
    });
  });

  document.querySelectorAll('.sp-faq__item').forEach(function (item) {
    var trigger = item.querySelector('.sp-faq__trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      var open = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      var panel = item.querySelector('.sp-faq__panel');
      if (panel) panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0';
    });
  });

  var demoForm = document.getElementById('pdDemoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var honeypot = demoForm.querySelector('[name="_hp"]');
      if (honeypot && honeypot.value) return;
      var name = (demoForm.querySelector('[name="name"]') || {}).value || '';
      var email = (demoForm.querySelector('[name="email"]') || {}).value || '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        alert('Please enter a valid email address.');
        return;
      }
      if (name.trim().length < 2) {
        alert('Please enter your name.');
        return;
      }
      var msg = document.getElementById('pdFormMsg');
      if (msg) {
        msg.textContent = 'Thanks, our property dealer team will reach out within 1 business day.';
        msg.classList.add('is-visible');
      }
      demoForm.reset();
    });
  }

  setPillar('listings', true);
  setWorkflow('capture', true);
  setSolution('pipeline', true);
  setModule('listings', true);
  setSecurity('encrypt', true);
  setOnboard('discovery', true);
  updateCalculator(true);
  renderDash('pipeline');

  var hash = window.location.hash.replace(/^#/, '');
  if (hash) {
    var el = document.getElementById(hash);
    if (el) setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
  }
})();
