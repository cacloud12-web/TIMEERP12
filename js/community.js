/**
 * TIME ERP Community — interactions + content mapped to verified product areas.
 * No fabricated member counts, vote totals, or manufacturing shop-floor claims.
 */
(function () {
  'use strict';

  var BENEFIT_DETAILS = {
    network: {
      title: 'Connect with TIME ERP professionals',
      body: 'Meet peers across CA firms, construction, real estate, property dealing, MSMEs, and professional services who use TIME ERP for HR, CRM, projects, billing, and compliance.',
      points: ['Industry-focused conversations', 'Peer setup tips by role', 'Shared practices for growing teams']
    },
    events: {
      title: 'Learning sessions and meetups',
      body: 'Join TIME ERP learning sessions, implementation roundtables, and training opportunities through Academy, consultants, and onboarding services.',
      points: ['Academy learning paths', 'Consultant-led training', 'Product walkthroughs via Book Demo']
    },
    knowledge: {
      title: 'Share workflow knowledge',
      body: 'Exchange practical guidance on HRMS, attendance, payroll, CRM, Client Desk, projects, billing, compliance, Document Vault, marketing, and communication.',
      points: ['Module-focused discussions', 'Links to Help Centre guides', 'Implementation tips from peers']
    },
    updates: {
      title: 'Stay close to product updates',
      body: 'Follow feature announcements, documentation updates, and roadmap themes for modules you already use — then share feedback with the TIME ERP team.',
      points: ['Module release themes', 'Help Centre updates', 'Feedback through sales and support']
    }
  };

  var CHANNEL_TOPICS = {
    all: [
      'How we configure roles before go-live',
      'Attendance and leave setup for multi-branch teams',
      'CRM follow-ups that stay inside Client Desk',
      'Project milestones with timesheet billing',
      'GST and TDS reporting checklist'
    ],
    hrms: [
      'Employee onboarding checklist in HRMS',
      'Biometric vs geo attendance for field teams',
      'Leave balance and holiday calendar tips',
      'Payroll inputs from attendance and leave'
    ],
    crm: [
      'Lead capture and assignment in CRM',
      'Quotation follow-up discipline',
      'Client Desk document sharing with clients',
      'Pipeline visibility for sales managers'
    ],
    projects: [
      'Creating the first project and milestones',
      'Task and recurring task patterns',
      'Timesheets for billable delivery',
      'Project P/L visibility for owners'
    ],
    billing: [
      'Billing branch setup tips',
      'Invoice to receipt workflow',
      'Ledger checks after posting',
      'Digital payment options in Billing'
    ],
    compliance: [
      'GST report readiness checklist',
      'ESIC and EPFO reporting notes',
      'TDS report preparation',
      'Keeping compliance records audit-ready'
    ]
  };

  var DISCUSSIONS = [
    { id: 1, title: 'Best order to configure roles before enabling HRMS and Billing', audience: 'Administrators', category: 'hrms', tag: 'Setup' },
    { id: 2, title: 'Attendance methods that work for site and office teams', audience: 'HR Managers', category: 'hrms', tag: 'HRMS' },
    { id: 3, title: 'Keeping CRM leads and Client Desk requests in one flow', audience: 'Sales & Client teams', category: 'crm', tag: 'CRM' },
    { id: 4, title: 'Project milestones, tasks, and timesheets for delivery teams', audience: 'Project Managers', category: 'projects', tag: 'Projects' },
    { id: 5, title: 'Invoice, receipt, and ledger checks for finance teams', audience: 'Finance teams', category: 'billing', tag: 'Billing' },
    { id: 6, title: 'GST, ESIC, EPFO, and TDS reporting in Compliance Management', audience: 'Compliance & CA practices', category: 'compliance', tag: 'Compliance' }
  ];

  var benefitCards = document.querySelectorAll('.comm-benefit');
  var benefitDetail = document.getElementById('commBenefitDetail');
  var channelTabs = document.querySelectorAll('.comm-channel-tab');
  var channelGrid = document.getElementById('commChannelGrid');
  var topicList = document.getElementById('commTopicList');
  var discussionList = document.getElementById('commDiscussionList');
  var discussionSearch = document.getElementById('commDiscussionSearch');
  var discussionSort = document.getElementById('commDiscussionSort');
  var faqItems = document.querySelectorAll('.comm-faq__item');

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/\n/g, ' ');
  }

  function setBenefit(id) {
    var detail = BENEFIT_DETAILS[id];
    if (!detail || !benefitDetail) return;
    benefitCards.forEach(function (card) {
      var active = card.getAttribute('data-benefit') === id;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    benefitDetail.classList.remove('is-visible');
    setTimeout(function () {
      benefitDetail.innerHTML =
        '<div class="comm-benefit-detail__head"><h3>' + escapeHtml(detail.title) + '</h3></div>' +
        '<p>' + escapeHtml(detail.body) + '</p>' +
        '<ul>' + detail.points.map(function (p) { return '<li>' + escapeHtml(p) + '</li>'; }).join('') + '</ul>';
      benefitDetail.classList.add('is-visible');
    }, 60);
  }

  function renderChannels(category) {
    if (!channelGrid) return;
    var channels = [
      { id: 'hrms', icon: 'badge', name: 'HRMS & Payroll', desc: 'Employees, attendance, leave, payroll', cat: 'hrms' },
      { id: 'crm', icon: 'handshake', name: 'CRM & Client Desk', desc: 'Leads, pipeline, client portal', cat: 'crm' },
      { id: 'projects', icon: 'account_tree', name: 'Project Management', desc: 'Projects, tasks, timesheets', cat: 'projects' },
      { id: 'billing', icon: 'receipt_long', name: 'Billing & Finance', desc: 'Invoices, receipts, ledgers', cat: 'billing' },
      { id: 'compliance', icon: 'gavel', name: 'Compliance', desc: 'GST, ESIC, EPFO, TDS', cat: 'compliance' },
      { id: 'documents', icon: 'folder_open', name: 'Document Vault', desc: 'Store, share, approve documents', cat: 'all' },
      { id: 'marketing', icon: 'campaign', name: 'Marketing & Comms', desc: 'Campaigns, email, SMS, WhatsApp', cat: 'all' },
      { id: 'ideas', icon: 'lightbulb', name: 'Feedback & Ideas', desc: 'Share product improvement themes', cat: 'all' }
    ];
    var filtered = category === 'all' ? channels : channels.filter(function (c) { return c.cat === category || c.cat === 'all'; });
    channelGrid.innerHTML = filtered.map(function (ch) {
      return '<button type="button" class="comm-channel-card" data-channel="' + escapeAttr(ch.id) + '" data-cat="' + escapeAttr(ch.cat) + '">' +
        '<span class="comm-channel-card__icon"><span class="material-symbols-outlined">' + escapeHtml(ch.icon) + '</span></span>' +
        '<span class="comm-channel-card__name">' + escapeHtml(ch.name) + '</span>' +
        '<span class="comm-channel-card__meta">' + escapeHtml(ch.desc) + '</span>' +
        '<span class="comm-channel-card__live"><span class="comm-channel-card__dot"></span>Module focus</span>' +
      '</button>';
    }).join('');
    channelGrid.querySelectorAll('.comm-channel-card').forEach(function (card) {
      card.addEventListener('click', function () {
        channelGrid.querySelectorAll('.comm-channel-card').forEach(function (c) { c.classList.remove('is-active'); });
        card.classList.add('is-active');
        var cat = card.getAttribute('data-cat');
        if (cat && cat !== 'all') setChannelCategory(cat);
      });
    });
  }

  function renderTopics(category) {
    if (!topicList) return;
    var topics = CHANNEL_TOPICS[category] || CHANNEL_TOPICS.all;
    topicList.innerHTML = topics.slice(0, 5).map(function (t, i) {
      return '<li class="comm-topic"><span class="comm-topic__num">' + (i + 1) + '</span><span class="comm-topic__text">' + escapeHtml(t) + '</span></li>';
    }).join('');
  }

  function setChannelCategory(category) {
    channelTabs.forEach(function (tab) {
      var active = tab.getAttribute('data-channel-cat') === category;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    renderChannels(category);
    renderTopics(category);
    filterDiscussions(category === 'all' ? '' : category);
  }

  function renderDiscussions(list) {
    if (!discussionList) return;
    if (!list.length) {
      discussionList.innerHTML = '<p class="comm-discussions__empty">No topics match your search. Try HRMS, CRM, Billing, or Compliance.</p>';
      return;
    }
    discussionList.innerHTML = list.map(function (d) {
      return '<article class="comm-discussion" data-id="' + escapeAttr(d.id) + '">' +
        '<button type="button" class="comm-discussion__vote" aria-label="Mark as useful" title="Mark as useful"><span class="comm-discussion__vote-count">★</span></button>' +
        '<div class="comm-discussion__body">' +
          '<span class="comm-discussion__tag">' + escapeHtml(d.tag) + '</span>' +
          '<h3 class="comm-discussion__title">' + escapeHtml(d.title) + '</h3>' +
          '<span class="comm-discussion__meta">Suggested for: ' + escapeHtml(d.audience) + '</span>' +
          '<a class="comm-discussion__replies" href="Academy.html"><span class="material-symbols-outlined">school</span>Learn in Academy</a>' +
        '</div>' +
      '</article>';
    }).join('');
    bindDiscussionVotes();
  }

  function getSortedDiscussions(list, sort) {
    var copy = list.slice();
    if (sort === 'alpha') {
      copy.sort(function (a, b) { return a.title.localeCompare(b.title); });
    } else if (sort === 'module') {
      copy.sort(function (a, b) { return a.tag.localeCompare(b.tag); });
    }
    return copy;
  }

  function filterDiscussions(categoryOverride) {
    var query = discussionSearch ? discussionSearch.value.trim().toLowerCase() : '';
    var sort = discussionSort ? discussionSort.value : 'latest';
    var activeTab = document.querySelector('.comm-channel-tab.is-active');
    var category = categoryOverride !== undefined && categoryOverride !== ''
      ? categoryOverride
      : (activeTab ? activeTab.getAttribute('data-channel-cat') : 'all');
    if (categoryOverride === '') category = 'all';
    var filtered = DISCUSSIONS.filter(function (d) {
      var matchCat = category === 'all' || d.category === category;
      var matchQuery = !query || d.title.toLowerCase().indexOf(query) !== -1 || d.audience.toLowerCase().indexOf(query) !== -1 || d.tag.toLowerCase().indexOf(query) !== -1;
      return matchCat && matchQuery;
    });
    renderDiscussions(getSortedDiscussions(filtered, sort));
  }

  function bindDiscussionVotes() {
    if (!discussionList) return;
    discussionList.querySelectorAll('.comm-discussion__vote').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        btn.classList.toggle('is-voted');
      });
    });
  }

  benefitCards.forEach(function (card) {
    card.addEventListener('click', function () {
      setBenefit(card.getAttribute('data-benefit') || 'network');
    });
  });

  channelTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      setChannelCategory(tab.getAttribute('data-channel-cat') || 'all');
    });
  });

  if (discussionSearch) {
    discussionSearch.addEventListener('input', function () { filterDiscussions(); });
  }
  if (discussionSort) {
    discussionSort.addEventListener('change', function () { filterDiscussions(); });
  }

  document.querySelectorAll('.comm-event__register').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var href = btn.getAttribute('data-href');
      if (href) {
        window.location.href = href;
        return;
      }
      var registered = btn.classList.toggle('is-registered');
      btn.textContent = registered ? 'Interest saved ✓' : 'Register interest';
    });
  });

  document.querySelectorAll('.comm-idea__vote').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.classList.toggle('is-voted');
    });
  });

  faqItems.forEach(function (item) {
    var trigger = item.querySelector('.comm-faq__trigger');
    var panel = item.querySelector('.comm-faq__panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) panel.style.maxHeight = panel.scrollHeight + 'px';
      else panel.style.maxHeight = '0';
    });
  });

  setBenefit('network');
  renderChannels('all');
  renderTopics('all');
  renderDiscussions(DISCUSSIONS);
})();
