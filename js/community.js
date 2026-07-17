(function () {
  'use strict';

  var BENEFIT_DETAILS = {
    network: {
      title: 'Network with manufacturing leaders',
      body: 'Connect with plant managers, operations directors, and ERP admins across discrete and process manufacturing. Find peers by industry, plant size, or production model.',
      points: ['2,400+ active members', 'Private member directory', 'Regional meetup groups']
    },
    events: {
      title: 'Events and meetups',
      body: 'Join live webinars, virtual roundtables, and in-person manufacturing summits. Meet community members and TimeERP product experts at key industry conferences.',
      points: ['45+ events per month', 'Live Q&A with experts', 'On-demand session replays']
    },
    knowledge: {
      title: 'Share workflow knowledge',
      body: 'Exchange practical tips on production scheduling, inventory control, quality workflows, and shop-floor digitization from teams running TimeERP every day.',
      points: ['850+ discussion threads', 'Best-practice playbooks', 'Peer-reviewed workflows']
    },
    updates: {
      title: 'Product updates first',
      body: 'Get feature announcements, release notes, and roadmap previews before anywhere else. Share feedback directly with the TimeERP product team.',
      points: ['Early access previews', 'Ideas board voting', 'Direct team access']
    }
  };

  var CHANNEL_TOPICS = {
    all: ['Production scheduling tips for multi-line plants', 'How we reduced stockouts by 34%', 'Quality hold workflow best practices', 'Shop floor tablet rollout lessons', 'Batch traceability in process manufacturing'],
    production: ['Production scheduling tips for multi-line plants', 'Capacity planning during peak season', 'OEE tracking on the shop floor', 'Work order batching strategies'],
    inventory: ['How we reduced stockouts by 34%', 'Cycle count automation workflows', 'Raw material reorder point setup', 'Warehouse bin location mapping'],
    quality: ['Quality hold workflow best practices', 'Non-conformance reporting templates', 'Inspection checklist digitization', 'Supplier quality scorecards'],
    workflows: ['Shop floor tablet rollout lessons', 'Approval chains for purchase orders', 'Custom dashboard for plant managers', 'Integrating scales with TimeERP']
  };

  var DISCUSSIONS = [
    { id: 1, title: 'Production scheduling tips for multi-line plants', author: 'Priya M.', role: 'Plant Manager', category: 'production', votes: 48, replies: 23, time: '2h ago', tag: 'Production' },
    { id: 2, title: 'How we reduced stockouts by 34% with reorder automation', author: 'James K.', role: 'Inventory Lead', category: 'inventory', votes: 62, replies: 31, time: '5h ago', tag: 'Inventory' },
    { id: 3, title: 'Quality hold workflow — what works for your team?', author: 'Sarah L.', role: 'QA Director', category: 'quality', votes: 35, replies: 18, time: '1d ago', tag: 'Quality' },
    { id: 4, title: 'Shop floor tablet rollout: lessons learned', author: 'Marcus T.', role: 'Operations VP', category: 'workflows', votes: 41, replies: 27, time: '1d ago', tag: 'Workflows' },
    { id: 5, title: 'Batch traceability setup for process manufacturing', author: 'Elena R.', role: 'Process Engineer', category: 'production', votes: 29, replies: 14, time: '2d ago', tag: 'Production' },
    { id: 6, title: 'Custom approval chains for purchase orders', author: 'David W.', role: 'ERP Admin', category: 'workflows', votes: 22, replies: 11, time: '3d ago', tag: 'Workflows' }
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
        '<div class="comm-benefit-detail__head"><h3>' + detail.title + '</h3></div>' +
        '<p>' + detail.body + '</p>' +
        '<ul>' + detail.points.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>';
      benefitDetail.classList.add('is-visible');
    }, 60);
  }

  function renderChannels(category) {
    if (!channelGrid) return;
    var channels = [
      { id: 'production', icon: 'precision_manufacturing', name: 'Production', members: 840, topics: 214, cat: 'production' },
      { id: 'inventory', icon: 'inventory_2', name: 'Inventory', members: 620, topics: 178, cat: 'inventory' },
      { id: 'quality', icon: 'verified', name: 'Quality', members: 490, topics: 132, cat: 'quality' },
      { id: 'workflows', icon: 'account_tree', name: 'ERP Workflows', members: 710, topics: 196, cat: 'workflows' },
      { id: 'announcements', icon: 'campaign', name: 'Announcements', members: 2400, topics: 86, cat: 'all' },
      { id: 'ideas', icon: 'lightbulb', name: 'Ideas Board', members: 1100, topics: 245, cat: 'all' }
    ];
    var filtered = category === 'all' ? channels : channels.filter(function (c) { return c.cat === category || c.cat === 'all'; });
    channelGrid.innerHTML = filtered.map(function (ch) {
      return '<button type="button" class="comm-channel-card" data-channel="' + ch.id + '" data-cat="' + ch.cat + '">' +
        '<span class="comm-channel-card__icon"><span class="material-symbols-outlined">' + ch.icon + '</span></span>' +
        '<span class="comm-channel-card__name">' + ch.name + '</span>' +
        '<span class="comm-channel-card__meta">' + ch.members.toLocaleString() + ' members · ' + ch.topics + ' topics</span>' +
        '<span class="comm-channel-card__live"><span class="comm-channel-card__dot"></span>Active now</span>' +
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
      return '<li class="comm-topic"><span class="comm-topic__num">' + (i + 1) + '</span><span class="comm-topic__text">' + t + '</span></li>';
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
      discussionList.innerHTML = '<p class="comm-discussions__empty">No discussions match your search.</p>';
      return;
    }
    discussionList.innerHTML = list.map(function (d) {
      return '<article class="comm-discussion" data-id="' + d.id + '">' +
        '<button type="button" class="comm-discussion__vote" aria-label="Upvote"><span class="comm-discussion__vote-count">' + d.votes + '</span></button>' +
        '<div class="comm-discussion__body">' +
          '<span class="comm-discussion__tag">' + d.tag + '</span>' +
          '<h3 class="comm-discussion__title">' + d.title + '</h3>' +
          '<span class="comm-discussion__meta">' + d.author + ' · ' + d.role + ' · ' + d.time + '</span>' +
          '<span class="comm-discussion__replies"><span class="material-symbols-outlined">chat_bubble</span>' + d.replies + ' replies</span>' +
        '</div>' +
      '</article>';
    }).join('');
    bindDiscussionVotes();
  }

  function getSortedDiscussions(list, sort) {
    var copy = list.slice();
    if (sort === 'top') copy.sort(function (a, b) { return b.votes - a.votes; });
    else if (sort === 'replies') copy.sort(function (a, b) { return b.replies - a.replies; });
    return copy;
  }

  function filterDiscussions(categoryOverride) {
    var query = discussionSearch ? discussionSearch.value.trim().toLowerCase() : '';
    var sort = discussionSort ? discussionSort.value : 'latest';
    var activeTab = document.querySelector('.comm-channel-tab.is-active');
    var category = categoryOverride !== undefined ? categoryOverride : (activeTab ? activeTab.getAttribute('data-channel-cat') : 'all');
    var filtered = DISCUSSIONS.filter(function (d) {
      var matchCat = category === 'all' || d.category === category;
      var matchQuery = !query || d.title.toLowerCase().indexOf(query) !== -1 || d.author.toLowerCase().indexOf(query) !== -1;
      return matchCat && matchQuery;
    });
    renderDiscussions(getSortedDiscussions(filtered, sort));
  }

  function bindDiscussionVotes() {
    if (!discussionList) return;
    discussionList.querySelectorAll('.comm-discussion__vote').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (btn.classList.contains('is-voted')) return;
        btn.classList.add('is-voted');
        var countEl = btn.querySelector('.comm-discussion__vote-count');
        if (countEl) countEl.textContent = String(parseInt(countEl.textContent, 10) + 1);
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
      var registered = btn.classList.toggle('is-registered');
      btn.textContent = registered ? 'Registered ✓' : 'Register interest';
    });
  });

  document.querySelectorAll('.comm-idea__vote').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.classList.contains('is-voted')) return;
      btn.classList.add('is-voted');
      var countEl = btn.querySelector('.comm-idea__vote-count');
      if (countEl) countEl.textContent = String(parseInt(countEl.textContent, 10) + 1);
    });
  });

  faqItems.forEach(function (item) {
    var trigger = item.querySelector('.comm-faq__trigger');
    var panel = item.querySelector('.comm-faq__panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = '0';
      }
    });
  });


  setBenefit('network');
  renderChannels('all');
  renderTopics('all');
  renderDiscussions(DISCUSSIONS);
})();
