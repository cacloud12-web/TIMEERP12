/**
 * TIME ERP Communication Center — interactive spotlight explorer.
 * Feature copy from Marketing, home Communication Center, Help Centre.
 */
(function () {
  'use strict';

  var ICON = 'assets/home-icons/';
  var FLOW = [
    { id: 'email', label: 'Email', icon: ICON + 'task-email.svg' },
    { id: 'sms', label: 'SMS', icon: ICON + 'task-sms.svg' },
    { id: 'whatsapp', label: 'WhatsApp', icon: ICON + 'task-whatsapp.svg' },
    { id: 'inapp', label: 'In-app', icon: ICON + 'task-bell.svg' }
  ];

  var features = [
    {
      id: 'notifications',
      title: 'Notifications',
      desc: 'Deliver instant alerts, reminders, and announcements across the platform.',
      icon: ICON + 'task-bell.svg',
      channels: ['inapp', 'email', 'sms', 'whatsapp'],
      demoChannel: 'In-app',
      seed: 'Reminder: attendance lock starts at 6:00 PM.',
      capabilities: [
        { title: 'Instant alerts & reminders', detail: 'Push timely alerts so teams and customers stay informed without chasing updates.' },
        { title: 'Platform announcements', detail: 'Publish announcements from Communication Center to keep everyone on the same message.' },
        { title: 'Real-time visibility', detail: 'Coordinate notification delivery with campaigns and operational updates.' },
        { title: 'Multi-channel reach', detail: 'Notifications can align with Email, SMS, WhatsApp, and in-app delivery.' }
      ],
      benefits: 'Important updates reach the right audience without disconnected messaging tools.'
    },
    {
      id: 'sms',
      title: 'SMS',
      desc: 'Send promotional and transactional SMS campaigns with centralized campaign management.',
      icon: ICON + 'task-sms.svg',
      channels: ['sms'],
      demoChannel: 'SMS',
      seed: 'Your invoice is ready. Reply HELP for support.',
      capabilities: [
        { title: 'Promotional SMS', detail: 'Run promo campaigns from a centralized Communication Center workspace.' },
        { title: 'Transactional SMS', detail: 'Send operational reminders and confirmations tied to TIME ERP updates.' },
        { title: 'Campaign control', detail: 'Keep SMS coordinated with other outreach channels.' },
        { title: 'Aligned messaging', detail: 'Match SMS copy with Email, WhatsApp, and notification programs.' }
      ],
      benefits: 'Reach customers quickly with SMS while keeping campaign control inside TIME ERP.'
    },
    {
      id: 'email',
      title: 'Email',
      desc: 'Create, schedule, and monitor personalized email campaigns.',
      icon: ICON + 'task-email.svg',
      channels: ['email'],
      demoChannel: 'Email',
      seed: 'Subject: Your TIME ERP onboarding checklist',
      capabilities: [
        { title: 'Create & schedule', detail: 'Build and schedule email campaigns without leaving TIME ERP.' },
        { title: 'Audience segments', detail: 'Personalize outreach for the right customer or employee groups.' },
        { title: 'Monitor activity', detail: 'Track campaign activity from one communication workspace.' },
        { title: 'Program alignment', detail: 'Keep email sends aligned with broader marketing and operations.' }
      ],
      benefits: 'Run structured email campaigns without leaving TIME ERP.'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      desc: 'Engage customers with personalized WhatsApp messaging and campaign automation.',
      icon: ICON + 'task-whatsapp.svg',
      channels: ['whatsapp'],
      demoChannel: 'WhatsApp',
      seed: 'Hi, your document request is ready in Client Desk.',
      capabilities: [
        { title: 'Personalized outreach', detail: 'Send WhatsApp messages customers already prefer to read.' },
        { title: 'Campaign automation', detail: 'Support automated WhatsApp workflows where configured.' },
        { title: 'Preferred channel', detail: 'Engage on WhatsApp while staying inside TIME ERP communication.' },
        { title: 'CRM connection', detail: 'Connect WhatsApp activity with marketing and CRM follow-ups.' }
      ],
      benefits: 'Use WhatsApp as a controlled channel connected to TIME ERP communication and CRM.'
    },
    {
      id: 'broadcast',
      title: 'Broadcast',
      desc: 'Deliver bulk communications across multiple channels using audience segmentation.',
      icon: ICON + 'task-broadcast.svg',
      channels: ['email', 'sms', 'whatsapp', 'inapp'],
      demoChannel: 'Broadcast',
      seed: 'Holiday schedule update for all active clients.',
      capabilities: [
        { title: 'Bulk multi-channel sends', detail: 'Deliver one broadcast across Email, SMS, WhatsApp, and notifications.' },
        { title: 'Audience segmentation', detail: 'Target the right groups instead of sending one flat list.' },
        { title: 'Channel coordination', detail: 'Keep every channel in the same campaign flow.' },
        { title: 'Single campaign control', detail: 'Manage multi-channel outreach without separate tools.' }
      ],
      benefits: 'Run coordinated multi-channel broadcasts from one flow.'
    },
    {
      id: 'templates',
      title: 'Templates',
      desc: 'WhatsApp API templates for structured messaging, automation, and delivery reporting where enabled.',
      icon: ICON + 'task-template.svg',
      channels: ['whatsapp'],
      demoChannel: 'Template',
      seed: 'Approved template: payment reminder v2',
      capabilities: [
        { title: 'Approved templates', detail: 'Use WhatsApp API templates where configured by admins.' },
        { title: 'Webhooks & automation', detail: 'Support automation with webhooks for structured sends.' },
        { title: 'Delivery reports', detail: 'Review delivery reports for WhatsApp template sends.' },
        { title: 'Admin control', detail: 'Keep template-based outreach consistent and controlled.' }
      ],
      benefits: 'Teams send consistent, approved WhatsApp messages instead of ad-hoc chats.'
    },
    {
      id: 'campaigns',
      title: 'Campaigns',
      desc: 'Centralize promotional and transactional campaigns across email, SMS, WhatsApp, and notifications.',
      icon: ICON + 'task-campaign.svg',
      channels: ['email', 'sms', 'whatsapp', 'inapp'],
      demoChannel: 'Campaign',
      seed: 'Q2 engagement campaign — week 1 launch',
      capabilities: [
        { title: 'Central planning', detail: 'Plan campaigns inside Communication Center.' },
        { title: 'Channel coordination', detail: 'Coordinate Email, SMS, WhatsApp, and notifications together.' },
        { title: 'Reusable messaging', detail: 'Reuse messaging across channels without rewriting everything.' },
        { title: 'Operational visibility', detail: 'Keep campaign activity visible next to business updates.' }
      ],
      benefits: 'One campaign workspace instead of separate channel tools.'
    },
    {
      id: 'logs',
      title: 'Logs',
      desc: 'Review notification logs when troubleshooting email, SMS, or WhatsApp delivery.',
      icon: ICON + 'task-report.svg',
      channels: ['email', 'sms', 'whatsapp', 'inapp'],
      demoChannel: 'Logs',
      seed: 'Delivery check: SMS queued · Email delivered',
      capabilities: [
        { title: 'Review recent sends', detail: 'Inspect notification logs for recent Communication Center activity.' },
        { title: 'Channel settings check', detail: 'Confirm Email, SMS, or WhatsApp settings with an admin.' },
        { title: 'Recipient verification', detail: 'Match delivery issues against contact details on record.' },
        { title: 'Retry guidance', detail: 'Support retries after template or channel checks.' }
      ],
      benefits: 'Admins can inspect notification activity when a message does not arrive.'
    }
  ];

  var activeId = features[0].id;
  var openStep = 0;
  var paused = false;
  var autoTimer = null;
  var stepTimer = null;

  var gridEl = document.getElementById('comGrid');
  var spotlight = document.getElementById('comSpotlight');
  var flowEl = document.getElementById('comFlow');
  var stepsEl = document.getElementById('comSteps');
  var bubblesEl = document.getElementById('comDemoBubbles');
  var pauseBtn = document.getElementById('comPause');
  var composeInput = document.getElementById('comComposeInput');
  var composeSend = document.getElementById('comComposeSend');

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function findFeature(id) {
    return features.filter(function (f) { return f.id === id; })[0] || features[0];
  }

  function indexOf(id) {
    return features.findIndex(function (f) { return f.id === id; });
  }

  function renderFlow(f) {
    if (!flowEl) return;
    var html = '';
    FLOW.forEach(function (node, i) {
      var on = f.channels.indexOf(node.id) !== -1;
      html += '<button type="button" class="com-flow__node' + (on ? ' is-on' : '') + '" data-channel="' + node.id + '" aria-pressed="' + (on ? 'true' : 'false') + '">'
        + '<img src="' + escapeHtml(node.icon) + '" alt="" width="22" height="22">'
        + '<span>' + escapeHtml(node.label) + '</span></button>';
      if (i < FLOW.length - 1) {
        html += '<span class="com-flow__arrow' + (on ? ' is-on' : '') + '" aria-hidden="true">→</span>';
      }
    });
    flowEl.innerHTML = html;
  }

  function renderSteps(f) {
    if (!stepsEl) return;
    stepsEl.innerHTML = '';
    f.capabilities.forEach(function (cap, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'com-step' + (i === openStep ? ' is-open' : '');
      btn.setAttribute('aria-expanded', i === openStep ? 'true' : 'false');
      btn.innerHTML =
        '<span class="com-step__num" aria-hidden="true">' + (i + 1) + '</span>'
        + '<span><span class="com-step__title">' + escapeHtml(cap.title) + '</span>'
        + '<span class="com-step__body">' + escapeHtml(cap.detail) + '</span></span>';
      btn.addEventListener('click', function () {
        openStep = i;
        paused = true;
        if (pauseBtn) {
          pauseBtn.setAttribute('aria-pressed', 'true');
          pauseBtn.textContent = 'Resume';
        }
        renderSteps(f);
        pushBubble(cap.title, true);
      });
      stepsEl.appendChild(btn);
    });
  }

  function pushBubble(text, outbound) {
    if (!bubblesEl) return;
    var f = findFeature(activeId);
    var el = document.createElement('div');
    el.className = 'com-bubble' + (outbound ? ' is-out' : '');
    el.innerHTML = escapeHtml(text) + '<small>' + escapeHtml(f.demoChannel) + '</small>';
    bubblesEl.appendChild(el);
    while (bubblesEl.children.length > 5) bubblesEl.removeChild(bubblesEl.firstChild);
    bubblesEl.scrollTop = bubblesEl.scrollHeight;
  }

  function resetBubbles(f) {
    if (!bubblesEl) return;
    bubblesEl.innerHTML = '';
    pushBubble(f.seed, false);
    setTimeout(function () {
      if (findFeature(activeId).id === f.id) pushBubble('Ready in Communication Center', true);
    }, 280);
  }

  function renderFeature(id) {
    var f = findFeature(id);
    var idx = indexOf(f.id);
    activeId = f.id;
    openStep = 0;
    if (!spotlight) return;
    spotlight.classList.add('is-updating');
    setTimeout(function () {
      document.getElementById('comDetailIcon').src = f.icon;
      document.getElementById('comDetailName').textContent = f.title;
      document.getElementById('comDetailDesc').textContent = f.desc;
      document.getElementById('comDetailBenefit').textContent = f.benefits;
      document.getElementById('comStepLabel').textContent = 'Feature ' + (idx + 1) + ' of ' + features.length;
      document.getElementById('comDemoChannel').textContent = f.demoChannel;
      renderFlow(f);
      renderSteps(f);
      resetBubbles(f);
      if (composeInput) {
        composeInput.value = '';
        composeInput.placeholder = 'Try a ' + f.title.toLowerCase() + ' message…';
      }
      spotlight.classList.remove('is-updating');
    }, 160);

    if (gridEl) {
      gridEl.querySelectorAll('.com-tile').forEach(function (btn) {
        var on = btn.getAttribute('data-id') === f.id;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
  }

  function go(delta) {
    var idx = indexOf(activeId);
    renderFeature(features[(idx + delta + features.length) % features.length].id);
  }

  function renderGrid() {
    if (!gridEl) return;
    gridEl.innerHTML = '';
    features.forEach(function (f) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'com-tile' + (f.id === activeId ? ' is-active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('data-id', f.id);
      btn.setAttribute('aria-selected', f.id === activeId ? 'true' : 'false');
      btn.setAttribute('aria-label', f.title);
      btn.innerHTML =
        '<span class="com-tile__ring" aria-hidden="true"><img src="' + escapeHtml(f.icon) + '" alt="" width="24" height="24"></span>'
        + '<span class="com-tile__label">' + escapeHtml(f.title) + '</span>';
      btn.addEventListener('click', function () {
        paused = true;
        if (pauseBtn) {
          pauseBtn.setAttribute('aria-pressed', 'true');
          pauseBtn.textContent = 'Resume';
        }
        renderFeature(f.id);
      });
      gridEl.appendChild(btn);
    });
  }

  function startTour() {
    if (autoTimer) clearInterval(autoTimer);
    if (stepTimer) clearInterval(stepTimer);
    autoTimer = setInterval(function () {
      if (paused) return;
      go(1);
    }, 6500);
    stepTimer = setInterval(function () {
      if (paused) return;
      var f = findFeature(activeId);
      openStep = (openStep + 1) % f.capabilities.length;
      renderSteps(f);
    }, 2200);
  }

  document.getElementById('comPrev').addEventListener('click', function () {
    paused = true;
    if (pauseBtn) { pauseBtn.setAttribute('aria-pressed', 'true'); pauseBtn.textContent = 'Resume'; }
    go(-1);
  });
  document.getElementById('comNext').addEventListener('click', function () {
    paused = true;
    if (pauseBtn) { pauseBtn.setAttribute('aria-pressed', 'true'); pauseBtn.textContent = 'Resume'; }
    go(1);
  });
  if (pauseBtn) {
    pauseBtn.addEventListener('click', function () {
      paused = !paused;
      pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
      pauseBtn.textContent = paused ? 'Resume' : 'Pause';
    });
  }

  function sendSample() {
    var f = findFeature(activeId);
    var text = (composeInput && composeInput.value.trim()) || f.seed;
    pushBubble(text, true);
    if (composeInput) composeInput.value = '';
  }
  if (composeSend) composeSend.addEventListener('click', sendSample);
  if (composeInput) {
    composeInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); sendSample(); }
    });
  }

  function bindHash() {
    var hash = (location.hash || '').replace(/^#/, '');
    var map = {
      notifications: 'notifications', sms: 'sms', email: 'email', whatsapp: 'whatsapp',
      broadcast: 'broadcast', templates: 'templates', campaigns: 'campaigns', logs: 'logs',
      'whatsapp-api': 'templates'
    };
    if (map[hash]) {
      paused = true;
      if (pauseBtn) { pauseBtn.setAttribute('aria-pressed', 'true'); pauseBtn.textContent = 'Resume'; }
      renderFeature(map[hash]);
    }
  }

  renderGrid();
  renderFeature(activeId);
  bindHash();
  startTour();
  window.addEventListener('hashchange', bindHash);
})();
