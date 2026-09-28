/**
 * TIME ERP WhatsApp API page, interactive explorer, flow, FAQ, counters.
 * Features aligned with WhatsApp Business Platform (Cloud API): templates,
 * webhooks/status, media, interactive messages, session messaging accuracy.
 */
(function () {
  'use strict';

  var features = [
    {
      id: 'official-api', group: 'platform',
      title: 'Official WhatsApp Business API',
      desc: 'Connect through Meta’s WhatsApp Business Platform (Cloud API) for business-initiated and conversational messaging.',
      icon: 'verified',
      caps: [
        'Use the official WhatsApp Business Platform for outbound and two-way messaging',
        'Operate with a verified business profile when Meta requirements are met',
        'Keep messaging under WhatsApp Business terms and quality rating rules',
        'Route ERP-triggered and agent responses through one controlled channel'
      ],
      benefits: 'Customers hear from your brand on WhatsApp without unofficial or ungoverned bulk tools.'
    },
    {
      id: 'templates', group: 'platform',
      title: 'Message Templates',
      desc: 'Send business-initiated messages with approved templates for utility, marketing, and authentication categories.',
      icon: 'description',
      caps: [
        'Create and manage template content for business-initiated outreach',
        'Support utility, marketing, and authentication template categories',
        'Use variables for customer name, invoice ID, dates, and order status',
        'Respect template approval and quality requirements before bulk sends'
      ],
      benefits: 'Reach customers outside the customer-care window with structured, approvable messages.'
    },
    {
      id: 'webhooks', group: 'platform',
      title: 'Webhook Events',
      desc: 'Receive delivery and engagement events so TIME ERP can update logs, campaigns, and follow-ups.',
      icon: 'webhook',
      caps: [
        'Subscribe to message status webhooks from the Business Platform',
        'Track status progression such as sent, delivered, read, and failed where available',
        'Write delivery outcomes back into TIME ERP communication logs',
        'Trigger internal follow-up tasks when critical messages fail'
      ],
      benefits: 'Teams see whether the reminder reached the customer, not only that a send was attempted.'
    },
    {
      id: 'session', group: 'platform',
      title: 'Session & Free-form Replies',
      desc: 'Continue conversations after the customer messages you, within WhatsApp’s customer service window.',
      icon: 'chat',
      caps: [
        'Reply with free-form text after the customer opens a conversation window',
        'Support agent responses tied to CRM and Client Desk context',
        'Escalates service conversations without restarting from templates every time',
        'Align reply workflows with support and sales ownership rules'
      ],
      benefits: 'Move from one-way alerts to real two-way conversations when customers respond.'
    },
    {
      id: 'media', group: 'messaging',
      title: 'Media & Document Sharing',
      desc: 'Share images, PDFs, and files that customers already open on WhatsApp, invoices, brochures, site updates.',
      icon: 'attach_file',
      caps: [
        'Send media messages supported by the Business Platform',
        'Share PDF invoices, agreements, and statement extracts where allowed',
        'Attach images for listings, site progress, or product packs',
        'Keep customer-facing files linked to the right TIME ERP record'
      ],
      benefits: 'Customers get the file they need in the same chat as the notification, fewer email attachments.'
    },
    {
      id: 'interactive', group: 'messaging',
      title: 'Interactive Messages',
      desc: 'Use buttons and quick replies so customers can confirm, choose a slot, or open a next step.',
      icon: 'touch_app',
      caps: [
        'Use reply buttons and list-style interactions where the API supports them',
        'Guide customers to confirm visits, payments, or document requests',
        'Reduce back-and-forth typing for common service choices',
        'Capture clearer next actions for agents inside TIME ERP'
      ],
      benefits: 'Structured replies improve conversion on simple decisions without forcing a web form first.'
    },
    {
      id: 'otp', group: 'messaging',
      title: 'Authentication Messages',
      desc: 'Deliver OTP and authentication-category template messages for secure customer verification flows.',
      icon: 'pin',
      caps: [
        'Send authentication templates for one-time passcodes where configured',
        'Support login, portal access, and high-risk action verification patterns',
        'Keep codes time-bound and tied to the intended user session',
        'Log authentication sends separately from marketing outreach'
      ],
      benefits: 'Use WhatsApp as a verified channel for codes customers already expect on mobile.'
    },
    {
      id: 'automation', group: 'ops',
      title: 'ERP Automation Rules',
      desc: 'Trigger WhatsApp messages from inventory, billing, CRM, HR, and project events, not a separate bot console.',
      icon: 'bolt',
      caps: [
        'Fire template sends from TIME ERP events (invoice, low stock, visit booked)',
        'Map recipients from client, employee, vendor, or lead contact fields',
        'Apply quiet hours and role-based send permissions where configured',
        'Avoid duplicate reminders by tying sends to document and task states'
      ],
      benefits: 'Messaging starts when the business event happens inside ERP, fewer manual broadcast lists.'
    },
    {
      id: 'delivery', group: 'ops',
      title: 'Delivery Reports',
      desc: 'Review send outcomes with status visibility for campaigns, alerts, and support messages.',
      icon: 'fact_check',
      caps: [
        'Monitor delivered, read, and failed outcomes where webhooks provide them',
        'Filter reports by campaign, template, or module source',
        'Spot failing numbers or blocked categories early',
        'Export or share delivery summaries with ops and finance when needed'
      ],
      benefits: 'Campaign and reminder quality is measured in delivery outcomes, not blast counts alone.'
    },
    {
      id: 'campaigns', group: 'ops',
      title: 'Campaign Messaging',
      desc: 'Run marketing and utility template campaigns from Communication and Marketing workspaces.',
      icon: 'campaign',
      caps: [
        'Coordinate WhatsApp campaigns with Email and SMS where your plan includes them',
        'Segment audiences from CRM and marketing lead lists',
        'Reuse approved templates across seasonal and lifecycle campaigns',
        'Keep campaign messaging under admin and quality control'
      ],
      benefits: 'Lifecycle and promo outreach lives next to the rest of TIME ERP marketing execution.'
    },
    {
      id: 'crm', group: 'integrations',
      title: 'CRM & Lead Follow-up',
      desc: 'Nudge leads and clients with templates tied to pipeline stages and follow-up tasks.',
      icon: 'handshake',
      caps: [
        'Send follow-up templates when leads stall in the pipeline',
        'Notify clients about visit reminders and document requests',
        'Keep conversation outcomes visible to sales owners',
        'Link WhatsApp activity with CRM tasks and Client Desk context'
      ],
      benefits: 'Sales stops losing hot leads in personal WhatsApp threads outside the firm.'
    },
    {
      id: 'finance', group: 'integrations',
      title: 'Billing & Payment Reminders',
      desc: 'Notify customers when invoices are issued, due, or settled through structured utility templates.',
      icon: 'receipt_long',
      caps: [
        'Trigger invoice ready and due-date reminder templates from Billing',
        'Share PDF invoice media where messaging policy allows',
        'Reduce manual collections follow-up for recurring dues',
        'Align payment reminders with ledger and receipt status'
      ],
      benefits: 'Collections stay polite and consistent instead of ad-hoc chases every month-end.'
    },
    {
      id: 'hr', group: 'integrations',
      title: 'HR & Payroll Alerts',
      desc: 'Notify employees on attendance, leave, and payslip events through controlled templates.',
      icon: 'groups',
      caps: [
        'Send leave decision and attendance reminder notifications',
        'Notify payslip availability where HR policy allows WhatsApp delivery',
        'Keep employee numbers under role-based access controls',
        'Separate internal HR messaging from customer marketing traffic'
      ],
      benefits: 'Employees get operational HR alerts without flooding email inboxes alone.'
    },
    {
      id: 'inventory', group: 'integrations',
      title: 'Inventory & Ops Alerts',
      desc: 'Alert buyers and managers when stock hits reorder levels or goods are received.',
      icon: 'inventory_2',
      caps: [
        'Notify purchase owners on low-stock and reorder thresholds',
        'Share GRN or transfer completion updates with site teams',
        'Keep warehouse operators in the loop without separate chat groups',
        'Tie every alert to the inventory document that caused it'
      ],
      benefits: 'Stock risk shows up on WhatsApp while the system of record stays Inventory Management.'
    },
    {
      id: 'analytics', group: 'ops',
      title: 'Messaging Analytics',
      desc: 'View delivery performance, response activity, and campaign volume from one operational panel.',
      icon: 'analytics',
      caps: [
        'Track volume trends for template and conversational sends',
        'Compare delivered vs failed rates for critical utility messages',
        'Surface template quality issues that need content or list hygiene work',
        'Give leadership a clear view of customer reach via WhatsApp'
      ],
      benefits: 'Messaging quality is reviewed with metrics, not gut feel from a few chat histories.'
    }
  ];

  var featList = document.getElementById('waFeatList');
  var filters = document.getElementById('waFilters');
  var panelInner = document.getElementById('waPanelInner');
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
    if (!featList) return;
    var visible = features.filter(function (f) {
      return activeFilter === 'all' || f.group === activeFilter;
    });
    featList.innerHTML = '';
    visible.forEach(function (f) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wa-feat' + (f.id === activeId ? ' is-active' : '');
      btn.setAttribute('data-id', f.id);
      btn.innerHTML =
        '<span class="wa-feat__icon" aria-hidden="true"><span class="material-symbols-outlined">' + f.icon + '</span></span>'
        + '<span class="wa-feat__label">' + escapeHtml(f.title) + '</span>'
        + '<span class="wa-feat__desc">' + escapeHtml(f.desc) + '</span>';
      featList.appendChild(btn);
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
      document.getElementById('waPanelName').textContent = f.title;
      document.getElementById('waPanelDesc').textContent = f.desc;
      document.getElementById('waPanelBenefits').textContent = f.benefits;
      document.getElementById('waPanelCaps').innerHTML = f.caps.map(function (c) {
        return '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span><span>' + escapeHtml(c) + '</span></li>';
      }).join('');
      var icon = document.getElementById('waPanelIcon');
      if (icon) icon.textContent = f.icon;
      panelInner.classList.remove('is-updating');
    }, 120);
    if (featList) {
      featList.querySelectorAll('.wa-feat').forEach(function (btn) {
        btn.classList.toggle('is-active', btn.getAttribute('data-id') === activeId);
      });
    }
  }

  function setFilter(filter) {
    activeFilter = filter || 'all';
    if (filters) {
      filters.querySelectorAll('.wa-filter').forEach(function (b) {
        var on = b.getAttribute('data-filter') === activeFilter;
        b.classList.toggle('is-active', on);
      });
    }
    renderList();
    renderPanel(activeId);
  }

  if (filters) {
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.wa-filter');
      if (!btn) return;
      setFilter(btn.getAttribute('data-filter') || 'all');
    });
  }
  if (featList) {
    featList.addEventListener('click', function (e) {
      var btn = e.target.closest('.wa-feat');
      if (!btn) return;
      renderPanel(btn.getAttribute('data-id'));
    });
  }

  /* Phone chat animation */
  var bubbles = document.querySelectorAll('.wa-bubble[data-delay]');
  bubbles.forEach(function (el) {
    var d = Number(el.getAttribute('data-delay') || 0);
    setTimeout(function () { el.classList.add('is-show'); }, d);
  });

  /* ERP flow pulse */
  var flowSteps = document.querySelectorAll('.wa-flow__step');
  var flowArrows = document.querySelectorAll('.wa-flow__arrow');
  var flowIndex = 0;
  if (flowSteps.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(function () {
      flowSteps.forEach(function (s, i) { s.classList.toggle('is-on', i === flowIndex); });
      flowArrows.forEach(function (a, i) { a.classList.toggle('is-on', i === flowIndex || i === flowIndex - 1); });
      flowIndex = (flowIndex + 1) % flowSteps.length;
    }, 1600);
    flowSteps[0].classList.add('is-on');
  }

  /* Counters when visible */
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      if (el.dataset.done) return;
      var target = parseFloat(el.getAttribute('data-count') || '0', 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = (String(el.getAttribute('data-count') || '').split('.')[1] || '').length;
      var steps = 40;
      var n = 0;
      var timer = setInterval(function () {
        n += 1;
        var val = (target * n) / steps;
        el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString()) + suffix;
        if (n >= steps) {
          clearInterval(timer);
          el.textContent = (decimals ? target.toFixed(decimals) : target.toLocaleString()) + suffix;
          el.dataset.done = '1';
        }
      }, 28);
    });
    document.querySelectorAll('.wa-bar[data-width] span').forEach(function (bar) {
      var w = bar.parentElement.getAttribute('data-width') || '0';
      bar.style.width = w + '%';
    });
  }

  /* FAQ */
  document.querySelectorAll('.wa-faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.wa-faq__item');
      var open = item.classList.contains('is-open');
      document.querySelectorAll('.wa-faq__item').forEach(function (i) { i.classList.remove('is-open'); });
      if (!open) item.classList.add('is-open');
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.wa-reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        if (entry.target.id === 'waDash') animateCounters();
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
    animateCounters();
  }

  renderList();
  renderPanel(activeId);
})();
