
  /**
   * TIME ERP Assistant — Frontend-only chatbot
   * Predefined knowledge base + simulated replies (no AI / no APIs)
   * Structure & IDs prepared for future Laravel / AI wiring
   */
  (function () {
    'use strict';

    /* ---------- Knowledge base (future: replace with API) ---------- */
    var KB = {
      'what is time erp': {
        text: 'TIME ERP is an all-in-one enterprise platform that unifies HRMS, attendance, payroll, CRM, projects, finance, and industry-specific workflows — so your teams run operations from one secure system.'
      },
      hrms: {
        text: 'TIME ERP HRMS helps businesses manage employees, attendance, payroll, recruitment, onboarding, leave management, performance, training, and exit management from one centralized platform.'
      },
      payroll: {
        text: 'The Payroll module automates salary processing, statutory compliance (PF, ESI, TDS), payslips, bonuses, reimbursements, and bank exports — with audit-ready reports for finance and HR.'
      },
      attendance: {
        text: 'Attendance tracks check-in/out, shifts, late marks, overtime, remote punch, and biometric integrations. Managers get real-time dashboards and exception workflows.'
      },
      crm: {
        text: 'CRM in TIME ERP manages leads, opportunities, follow-ups, client desks, and sales pipelines — tightly linked to billing and project delivery.'
      },
      projects: {
        text: 'Projects Module covers planning, task boards, timesheets, milestones, resource allocation, and progress tracking — ideal for services, construction, and multi-site teams.'
      },
      finance: {
        text: 'Finance brings ledgers, invoicing, receivables/payables, GST-ready compliance, and executive dashboards so leadership sees cashflow and profitability in real time.'
      },
      construction: {
        text: 'Construction ERP in TIME ERP handles site progress, BOQs, material requests, contractor billing, and project costing across multiple locations.'
      },
      'real estate': {
        text: 'Real Estate ERP supports property inventory, bookings, customer payments, broker management, and handover workflows for developers and brokers.'
      },
      law: {
        text: 'Law Firm ERP (and CA practice workflows) unifies engagement tracking, client documents, compliance calendars, billing, and team productivity — with firm-wide access control.'
      },
      demo: {
        text: 'Great choice! I can open the demo request form for you. Pick a time that works and our specialists will walk you through TIME ERP tailored to your industry.',
        cta: { label: 'Open Demo Form', action: 'demo' }
      },
      pricing: {
        text: 'Please contact our sales team for a customized quotation. Pricing depends on modules, users, and deployment preferences.',
        cta: { label: 'Contact Sales', action: 'contact' }
      },
      training: {
        text: 'We provide onboarding workshops, role-based training, admin certification paths, and ongoing enablement so your teams adopt TIME ERP confidently.'
      },
      support: {
        text: 'Support includes guided onboarding, ticketing, knowledge base access, and dedicated success managers for enterprise plans — with clear SLAs.'
      },
      documents: {
        text: 'Here are popular documentation guides to get started:',
        links: [
          { label: 'HRMS Guide', href: '#' },
          { label: 'Payroll Guide', href: '#' },
          { label: 'CRM Guide', href: '#' },
          { label: 'Attendance Guide', href: '#' },
          { label: 'Leave Guide', href: '#' },
          { label: 'Projects Guide', href: '#' }
        ]
      },
      docs: { alias: 'documents' },
      modules: {
        text: 'Core modules include HRMS, Attendance, Leave, Payroll, CRM, Projects, Finance, Document Vault, Timesheets, Expense, and industry packs for Construction, Real Estate, and Law/CA firms.'
      },
      contact: {
        text: 'Our sales team can prepare a tailored walkthrough and quotation. Share your company details via the demo form, or ask for a callback.',
        cta: { label: 'Contact Sales / Book Demo', action: 'demo' }
      },
      watch: {
        text: 'Watch a product overview to see TIME ERP in action — dashboards, HRMS, payroll, and industry workflows. Prefer a live session? Book a demo anytime.',
        cta: { label: 'Book Live Demo', action: 'demo' }
      },
      implementation: {
        text: 'Typical implementation ranges from 2–8 weeks depending on modules, data migration, and integrations. We start with discovery, configure workflows, migrate data, train users, then go live with hypercare.'
      },
      faqs: { type: 'faq' },
      default: {
        text: 'I can help with TIME ERP modules, pricing, demos, training, support, and documentation. Try a quick action or ask about HRMS, Payroll, CRM, or your industry.'
      }
    };

    var FAQ_ITEMS = [
      { q: 'How does TIME ERP work?', a: 'TIME ERP centralizes people, projects, finance, and client operations in one platform with role-based access, workflows, and real-time dashboards.' },
      { q: 'Can I schedule a demo?', a: 'Yes — use Book Live Demo and our team will schedule a personalized walkthrough for your industry.' },
      { q: 'How long is implementation?', a: 'Most teams go live in 2–8 weeks based on scope, integrations, and data migration needs.' },
      { q: 'Is mobile app available?', a: 'Yes. Attendance, approvals, and key workflows are available on mobile for field and remote teams.' },
      { q: 'Can I migrate existing data?', a: 'Yes. We support structured migration for employees, clients, ledgers, and historical records with validation checkpoints.' },
      { q: 'Do you provide support?', a: 'Absolutely — onboarding, ticketing, documentation, and dedicated success support for enterprise customers.' }
    ];

    var HISTORY = [];
    var SEARCHES = [];
    var welcomeShown = false;

    var widget = document.getElementById('cbWidget');
    if (!widget) return;
    var launcher = document.getElementById('cbLauncher');
    var panel = document.getElementById('cbPanel');
    var badge = document.getElementById('cbBadge');
    var messagesEl = document.getElementById('cbMessages');
    var emptyEl = document.getElementById('cbEmpty');
    var typingEl = document.getElementById('cbTyping');
    var form = document.getElementById('cbForm');
    var input = document.getElementById('cbInput');
    var sendBtn = document.getElementById('cbSendBtn');
    var sidebar = document.getElementById('cbSidebar');
  var demoModal = null;

    function hideEmpty() {
      if (!emptyEl) return;
      emptyEl.classList.remove('is-visible');
      emptyEl.setAttribute('aria-hidden', 'true');
    }

    function collapseStarters() {
      widget.classList.add('has-chat');
      var quick = document.getElementById('cbQuickActions');
      var chips = document.getElementById('cbChips');
      if (quick) quick.hidden = true;
      if (chips) chips.hidden = true;
    }

    function scrollMessages() {
      if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function addMessage(role, html, opts) {
      opts = opts || {};
      hideEmpty();
      var row = document.createElement('div');
      row.className = 'cb-msg cb-msg--' + role;
      var avatar = role === 'bot'
        ? '<span class="cb-msg__avatar cb-msg__avatar--bot" aria-hidden="true">AI</span>'
        : '<span class="cb-msg__avatar cb-msg__avatar--user" aria-hidden="true"></span>';
      row.innerHTML =
        avatar +
        '<div class="cb-msg__bubble-wrap">' +
          '<div class="cb-msg__bubble">' + html + '</div>' +
        '</div>';
      messagesEl.appendChild(row);
      scrollMessages();

      if (role === 'user') {
        collapseStarters();
        HISTORY.unshift({ role: 'user', text: opts.plain || '', at: Date.now() });
        renderHistory();
      } else {
        HISTORY.unshift({ role: 'bot', text: opts.plain || '', at: Date.now() });
        renderHistory();
      }
      return row;
    }

    function setTyping(on) {
      if (!typingEl) return;
      typingEl.classList.toggle('is-visible', !!on);
      typingEl.setAttribute('aria-hidden', on ? 'false' : 'true');
      if (on) scrollMessages();
    }

    function resolveKey(raw) {
      var q = String(raw || '').toLowerCase().trim();
      if (!q) return 'default';
      if (KB[q]) return KB[q].alias || q;

      var map = [
        ['hrms', /hrms|human resource|employee|recruit|onboard|exit/],
        ['payroll', /payroll|salary|payslip|pf|esi|tds/],
        ['attendance', /attendance|biometric|shift|check.?in/],
        ['crm', /\bcrm\b|lead|pipeline|sales/],
        ['projects', /project|timesheet|milestone|task board/],
        ['finance', /finance|invoice|gst|ledger|billing/],
        ['construction', /construction|boq|site progress|contractor/],
        ['real estate', /real.?estate|property|booking|broker/],
        ['law', /law firm|legal|ca firm|practice/],
        ['demo', /demo|book live|schedule/],
        ['pricing', /pric|cost|quotation|quote/],
        ['training', /train|learn|certif/],
        ['support', /support|sla|ticket|help desk/],
        ['documents', /document|guide|docs|manual/],
        ['modules', /module|product/],
        ['contact', /contact sales|sales team|callback/],
        ['watch', /watch demo|video/],
        ['implementation', /implement|go.?live|migration time|how long/],
        ['faqs', /faq|frequently/],
        ['what is time erp', /what is time|about time erp|tell me about time/]
      ];
      for (var i = 0; i < map.length; i++) {
        if (map[i][1].test(q)) return map[i][0];
      }
      return 'default';
    }

    function buildFaqHtml() {
      var html = '<p>Here are answers to common questions:</p><div class="cb-faq" id="cbFaqLive">';
      FAQ_ITEMS.forEach(function (item, i) {
        html +=
          '<div class="cb-faq__item' + (i === 0 ? ' is-open' : '') + '">' +
            '<button type="button" class="cb-faq__q" aria-expanded="' + (i === 0 ? 'true' : 'false') + '">' +
              item.q +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>' +
            '</button>' +
            '<div class="cb-faq__a">' + item.a + '</div>' +
          '</div>';
      });
      html += '</div>';
      return html;
    }

    function buildResponseHtml(entry) {
      if (entry.type === 'faq') return buildFaqHtml();
      var html = '<p>' + entry.text + '</p>';
      if (entry.links && entry.links.length) {
        html += '<div class="cb-msg__links">';
        entry.links.forEach(function (l) {
          html += '<a class="cb-msg__link" href="' + l.href + '"><span>📄</span> ' + l.label + '</a>';
        });
        html += '</div>';
      }
      if (entry.cta) {
        html += '<button type="button" class="cb-msg__cta" data-inline-action="' + entry.cta.action + '">' + entry.cta.label + '</button>';
      }
      return html;
    }

    function botReply(keyOrText) {
      var key = resolveKey(keyOrText);
      var entry = KB[key] || KB.default;
      if (entry.alias) entry = KB[entry.alias] || KB.default;

      setTyping(true);
      window.setTimeout(function () {
        setTyping(false);
        addMessage('bot', buildResponseHtml(entry), { plain: entry.text || key });
        bindInlineActions();
        bindFaqAccordion();
        if (key === 'demo') {
          window.setTimeout(openDemoModal, 500);
        }
      }, 650 + Math.random() * 450);
    }

    function showWelcome() {
      if (welcomeShown) return;
      welcomeShown = true;
      hideEmpty();
      setTyping(true);
      window.setTimeout(function () {
        setTyping(false);
        addMessage('bot',
          '<p>👋 Want to learn about TIME ERP? I\'m here to help you find your way.</p>' +
          '<p>Ask me or select an option below.</p>',
          { plain: 'Welcome' }
        );
      }, 350);
    }

    function openChat() {
      widget.classList.add('is-open');
      widget.classList.remove('is-minimized');
      if (panel) {
        panel.removeAttribute('hidden');
        panel.setAttribute('aria-hidden', 'false');
      }
      launcher.setAttribute('aria-expanded', 'true');
      launcher.setAttribute('aria-label', 'Close TIME ERP Assistant');
      if (badge) badge.classList.add('is-hidden');
      showWelcome();
      window.setTimeout(function () { input && input.focus(); }, 280);
    }

    function closeChat() {
      widget.classList.remove('is-open', 'is-minimized');
      if (panel) panel.setAttribute('aria-hidden', 'true');
      launcher.setAttribute('aria-expanded', 'false');
      launcher.setAttribute('aria-label', 'Open TIME ERP Assistant');
      closeSidebar();
    }

    function toggleChat() {
      if (widget.classList.contains('is-open')) closeChat();
      else openChat();
    }

    function minimizeChat() {
      if (widget.classList.contains('is-minimized')) {
        widget.classList.remove('is-minimized');
        input && input.focus();
      } else {
        widget.classList.add('is-minimized');
      }
    }

    function openSidebar() {
      if (!sidebar) return;
      sidebar.classList.add('is-open');
      sidebar.setAttribute('aria-hidden', 'false');
    }
    function closeSidebar() {
      if (!sidebar) return;
      sidebar.classList.remove('is-open');
      sidebar.setAttribute('aria-hidden', 'true');
    }

    function openDemoModal() {
      try {
        if (window.BookDemoModal && typeof window.BookDemoModal.open === 'function') {
          closeChat();
          window.setTimeout(function () { window.BookDemoModal.open(); }, 200);
          return;
        }
      } catch (err1) { /* ignore */ }

      try {
        if (window.parent && window.parent !== window && window.parent.BookDemoModal &&
            typeof window.parent.BookDemoModal.open === 'function') {
          closeChat();
          window.setTimeout(function () { window.parent.BookDemoModal.open(); }, 200);
          return;
        }
      } catch (err2) { /* ignore */ }

      var siteModal = document.getElementById('bookDemoModal');
      if (!siteModal) {
        window.location.href = (function () {
          var path = (window.location.pathname || '').replace(/\\/g, '/');
          var segs = path.split('/').filter(Boolean);
          if (segs.length && /\.[a-z0-9]+$/i.test(segs[segs.length - 1])) segs.pop();
          var prefix = segs.length ? segs.map(function () { return '..'; }).join('/') + '/' : '';
          return prefix + 'contact_sales.html';
        })();
        return;
      }
      if (window.BookDemoModal && typeof window.BookDemoModal.open === 'function') {
        window.BookDemoModal.open();
      } else {
        siteModal.classList.add('is-open');
        siteModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        var first = siteModal.querySelector('input, select, textarea, button:not([data-book-demo-close])');
        if (first) window.setTimeout(function () { first.focus(); }, 200);
      }
    }

    function closeDemoModal() {
      try {
        if (window.BookDemoModal && typeof window.BookDemoModal.close === 'function') {
          window.BookDemoModal.close();
          return;
        }
      } catch (err) { /* ignore */ }
      var bookModal = document.getElementById('bookDemoModal');
      if (!bookModal) return;
      bookModal.classList.remove('is-open');
      bookModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function handleAction(action) {
      if (action === 'demo') {
        addMessage('user', 'Book Live Demo', { plain: 'Book Live Demo' });
        botReply('demo');
        return;
      }
      if (action === 'contact') {
        addMessage('user', 'Contact Sales', { plain: 'Contact Sales' });
        botReply('contact');
        return;
      }
      var labels = {
        pricing: 'Pricing',
        modules: 'Product Modules',
        training: 'Training',
        docs: 'Documentation',
        watch: 'Watch Demo',
        faqs: 'FAQs'
      };
      var label = labels[action] || action;
      addMessage('user', label, { plain: label });
      botReply(action === 'docs' ? 'documents' : action);
    }

    function trackSearch(q) {
      SEARCHES = [q].concat(SEARCHES.filter(function (s) { return s !== q; })).slice(0, 6);
      renderSearches();
    }

    function renderHistory() {
      var list = document.getElementById('cbHistoryList');
      if (!list) return;
      var items = HISTORY.filter(function (h) { return h.role === 'user'; }).slice(0, 5);
      list.innerHTML = items.length
        ? items.map(function (h) { return '<li data-replay="' + escapeAttr(h.text) + '">' + escapeHtml(h.text) + '</li>'; }).join('')
        : '<li style="color:var(--text-muted);cursor:default">No conversations yet</li>';
    }

    function renderSearches() {
      var list = document.getElementById('cbSearchList');
      if (!list) return;
      list.innerHTML = SEARCHES.length
        ? SEARCHES.map(function (s) { return '<li data-replay="' + escapeAttr(s) + '">' + escapeHtml(s) + '</li>'; }).join('')
        : '<li style="color:var(--text-muted);cursor:default">No recent searches</li>';
    }

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
      });
    }
    function escapeAttr(s) {
      return escapeHtml(s).replace(/\n/g, ' ');
    }

    function bindInlineActions() {
      messagesEl.querySelectorAll('[data-inline-action]').forEach(function (btn) {
        if (btn._bound) return;
        btn._bound = true;
        btn.addEventListener('click', function () {
          var a = btn.getAttribute('data-inline-action');
          if (a === 'demo' || a === 'contact') openDemoModal();
        });
      });
    }

    function bindFaqAccordion() {
      messagesEl.querySelectorAll('.cb-faq__q').forEach(function (btn) {
        if (btn._bound) return;
        btn._bound = true;
        btn.addEventListener('click', function () {
          var item = btn.closest('.cb-faq__item');
          var open = item.classList.contains('is-open');
          item.parentElement.querySelectorAll('.cb-faq__item').forEach(function (el) {
            el.classList.remove('is-open');
            var q = el.querySelector('.cb-faq__q');
            if (q) q.setAttribute('aria-expanded', 'false');
          });
          if (!open) {
            item.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      });
    }

    function ripple(e, el) {
      var rect = el.getBoundingClientRect();
      var span = document.createElement('span');
      span.className = 'cb-ripple';
      var size = Math.max(rect.width, rect.height);
      span.style.width = span.style.height = size + 'px';
      span.style.left = (e.clientX - rect.left - size / 2) + 'px';
      span.style.top = (e.clientY - rect.top - size / 2) + 'px';
      el.appendChild(span);
      window.setTimeout(function () { span.remove(); }, 500);
    }

    /* Events */
    if (launcher) launcher.addEventListener('click', toggleChat);
    var closeBtn = document.getElementById('cbCloseBtn');
    var minBtn = document.getElementById('cbMinimizeBtn');
    var menuBtn = document.getElementById('cbMenuBtn');
    var sideClose = document.getElementById('cbSidebarClose');
    if (closeBtn) closeBtn.addEventListener('click', closeChat);
    if (minBtn) minBtn.addEventListener('click', minimizeChat);
    if (menuBtn) menuBtn.addEventListener('click', openSidebar);
    if (sideClose) sideClose.addEventListener('click', closeSidebar);
    if (sidebar) sidebar.addEventListener('click', function (e) {
      if (e.target === sidebar) closeSidebar();
    });

    document.querySelectorAll('.cb-quick-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        ripple(e, btn);
        handleAction(btn.getAttribute('data-action'));
      });
    });

    document.querySelectorAll('.cb-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var q = chip.getAttribute('data-q');
        var label = chip.textContent.trim();
        addMessage('user', escapeHtml(label), { plain: label });
        trackSearch(label);
        botReply(q);
      });
    });

    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = (input.value || '').trim();
      if (!text) return;
      sendBtn.classList.add('is-sending');
      window.setTimeout(function () { sendBtn.classList.remove('is-sending'); }, 280);
      addMessage('user', escapeHtml(text), { plain: text });
      trackSearch(text);
      input.value = '';
      botReply(text);
    });

    document.getElementById('cbAttachBtn') && document.getElementById('cbAttachBtn').addEventListener('click', function () {
      addMessage('bot', '<p>File attachments will connect to your document vault API in a future release. For now, describe your need in chat or book a demo.</p>');
    });

    if (sidebar) sidebar.addEventListener('click', function (e) {
      var nav = e.target.closest('[data-sidebar]');
      if (nav) {
        var key = nav.getAttribute('data-sidebar');
        closeSidebar();
        if (key === 'faqs') { addMessage('user', 'FAQs', { plain: 'FAQs' }); botReply('faqs'); }
        else if (key === 'docs') { addMessage('user', 'Documentation', { plain: 'Documentation' }); botReply('documents'); }
        else if (key === 'settings') {
          addMessage('bot', '<p>Settings placeholder — ready for user preferences, language, and notification APIs.</p>');
        }
        return;
      }
      var replay = e.target.closest('[data-replay]');
      if (replay) {
        var t = replay.getAttribute('data-replay');
        closeSidebar();
        addMessage('user', escapeHtml(t), { plain: t });
        botReply(t);
      }
    });

    var closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeDemoModal);

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var bookModal = document.getElementById('bookDemoModal');
      if (bookModal && bookModal.classList.contains('is-open')) return; /* let book-demo-modal.js handle */
      if (sidebar && sidebar.classList.contains('is-open')) { closeSidebar(); return; }
      if (widget.classList.contains('is-open')) closeChat();
    });

    /* Public hook for future embed / Laravel */
    window.TimeERPChatbot = {
      open: openChat,
      close: closeChat,
      openDemo: openDemoModal,
      ask: function (text) {
        openChat();
        addMessage('user', escapeHtml(text), { plain: text });
        botReply(text);
      }
    };


    renderHistory();
    renderSearches();
  })();
  