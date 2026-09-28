(function () {
  'use strict';

  var clock = document.getElementById('crmTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  var SEEDS = [
    { from: 'hello@students.udemy...', subject: 'A new course for you based on Other IT & Software', count: 2, date: '18 Aug' },
    { from: 'notifications-norepl...', subject: 'You have 2 new invitations', count: 5, date: '18 Aug' },
    { from: 'messages-noreply@lin...', subject: 'Sales Officer: ARTH and Jio are hiring', count: 4, date: '18 Aug' },
    { from: 'mail@mail.adobe.com', subject: 'Efficiency in your pocket 📱', count: 1, date: '18 Aug' },
    { from: 'hello@students.udemy...', subject: '🔥 Limited time sale: Build skills. Burn less cash.', count: 1, date: '17 Aug' },
    { from: 'no-reply@linkedin.com', subject: 'Dev Aggarwal mentioned you in a comment', count: 3, date: '17 Aug' },
    { from: 'support@hostinger.com', subject: 'Your website backup completed successfully', count: 0, date: '17 Aug' },
    { from: 'billing@timeerp.com', subject: 'Invoice INV-1042 payment received', count: 0, date: '16 Aug' }
  ];
  var EMAILS = [];
  for (var i = 0; i < 221; i += 1) {
    var seed = SEEDS[i % SEEDS.length];
    EMAILS.push({
      from: seed.from,
      subject: seed.subject,
      count: i < 40 ? seed.count : 0,
      date: seed.date
    });
  }

  var PAGE_SIZE = 20;
  var page = 1;
  var listEl = document.getElementById('seList');
  var pageInput = document.getElementById('sePageInput');
  var pageTotalEl = document.getElementById('sePageTotal');
  var countEl = document.getElementById('seCount');
  var prevBtn = document.getElementById('sePrev');
  var nextBtn = document.getElementById('seNext');
  var settingsBtn = document.getElementById('seSettings');
  var settingsPop = document.getElementById('seSettingsPop');
  var accountBtn = document.getElementById('seAccountBtn');
  var accountPop = document.getElementById('seAccountPop');
  var accountLabel = document.getElementById('seAccountLabel');

  function totalPages() { return Math.max(1, Math.ceil(EMAILS.length / PAGE_SIZE)); }

  function rowHtml(row) {
    var unread = row.count > 0 ? ' is-unread' : '';
    var badge = row.count > 0 ? '<span class="se-row__badge">' + row.count + '</span>' : '<span class="se-row__badge" style="visibility:hidden">0</span>';
    return '<button type="button" class="se-row' + unread + '">' +
      '<span class="se-row__from">' + row.from + '</span>' +
      '<span class="se-row__subject">' + row.subject + '</span>' +
      badge +
      '<span class="se-row__date">' + row.date + '</span>' +
      '</button>';
  }

  function updatePager() {
    var pages = totalPages();
    var start = (page - 1) * PAGE_SIZE;
    var end = Math.min(start + PAGE_SIZE, EMAILS.length);
    if (pageInput) pageInput.value = String(page);
    if (pageTotalEl) pageTotalEl.textContent = String(pages);
    if (countEl) countEl.textContent = (end - start) + ' / ' + EMAILS.length;
    if (prevBtn) prevBtn.disabled = page <= 1;
    if (nextBtn) nextBtn.disabled = page >= pages;
  }

  function renderList() {
    if (!listEl) return;
    page = Math.max(1, Math.min(page, totalPages()));
    var start = (page - 1) * PAGE_SIZE;
    var slice = EMAILS.slice(start, start + PAGE_SIZE);
    listEl.innerHTML = slice.map(rowHtml).join('');
    updatePager();
  }

  function goPage(n) {
    page = Math.max(1, Math.min(totalPages(), n));
    renderList();
  }

  function closePops() {
    if (settingsPop) settingsPop.hidden = true;
    if (accountPop) accountPop.hidden = true;
    if (settingsBtn) settingsBtn.setAttribute('aria-expanded', 'false');
    if (accountBtn) { accountBtn.setAttribute('aria-expanded', 'false'); accountBtn.classList.remove('is-open'); }
  }

  function togglePop(pop, btn, anchorOpen) {
    if (!pop || !btn) return;
    var open = pop.hidden;
    closePops();
    if (open) {
      pop.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      if (anchorOpen) anchorOpen.classList.add('is-open');
    }
  }

  if (settingsBtn && settingsPop) {
    settingsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      togglePop(settingsPop, settingsBtn);
    });
    settingsPop.addEventListener('click', function (e) {
      var item = e.target.closest('[data-se-action]');
      if (!item) return;
      var action = item.getAttribute('data-se-action');
      if (action === 'template') {
        window.location.href = 'marketing_email_template.html';
        return;
      }
      if (action === 'footer') {
        window.location.href = 'marketing_footer_template.html';
        return;
      }
      if (action === 'smtp') {
        window.location.href = 'marketing_smtp.html';
        return;
      }
      if (action === 'sent') {
        window.location.href = 'marketing_sent_emails.html';
        return;
      }
      if (window.DashboardShell) DashboardShell.toast('Settings', 'Opening soon.');
      closePops();
    });
  }

  if (accountBtn && accountPop) {
    accountBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      togglePop(accountPop, accountBtn, accountBtn);
    });
    accountPop.addEventListener('click', function (e) {
      var item = e.target.closest('[data-email]');
      if (!item) return;
      var email = item.getAttribute('data-email');
      accountPop.querySelectorAll('.se-pop__item').forEach(function (el) {
        el.classList.toggle('is-active', el === item);
      });
      if (accountLabel) accountLabel.textContent = email;
      closePops();
    });
  }

  document.getElementById('seSync').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Sync', 'Inbox synced.');
  });
  document.getElementById('seRefresh').addEventListener('click', function () {
    page = 1;
    renderList();
    if (window.DashboardShell) DashboardShell.toast('Refresh', 'Inbox refreshed.');
  });

  if (prevBtn) prevBtn.addEventListener('click', function () { if (page > 1) goPage(page - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { if (page < totalPages()) goPage(page + 1); });
  if (pageInput) {
    pageInput.addEventListener('change', function () {
      var n = parseInt(pageInput.value, 10);
      goPage(isNaN(n) ? 1 : n);
    });
    pageInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); pageInput.blur(); }
    });
  }

  listEl.addEventListener('click', function (e) {
    var row = e.target.closest('.se-row');
    if (!row) return;
    if (window.DashboardShell) DashboardShell.toast('Email', 'Opening message thread.');
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.se-pop, #seSettings, #seAccountBtn')) return;
    closePops();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePops();
  });

  renderList();
})();
