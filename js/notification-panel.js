/**
 * TimeERP — Chat / Notification dropdown panel (topbar bell).
 */
(function (global) {
  'use strict';

  var USER_NAME = 'Ca Ram Kumar';

  var NOTIFICATIONS = [
    {
      title: 'New Receipt Created',
      message: 'Hello ' + USER_NAME + ', We would like to inform you that a new receipt has been created and is available in your account.',
      time: '28/05/2026 5:14 PM'
    },
    {
      title: 'A New Notification Sent',
      message: 'Hello ' + USER_NAME + ', We would like to inform you that a new notification has been sent to your registered email.',
      time: '28/05/2026 5:14 PM'
    }
  ];

  var CHAT_ITEMS = [
    {
      title: 'Team message',
      message: 'Hello ' + USER_NAME + ', your team lead shared an update on the pending compliance review.',
      time: '22/08/2026 3:10 PM'
    }
  ];

  function clockIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">'
      + '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  }

  function calIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">'
      + '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>';
  }

  function renderItems(items) {
    if (!items.length) {
      return '<div class="notif-panel__empty">No items to show.</div>';
    }
    return items.map(function (item) {
      return ''
        + '<article class="notif-panel__item">'
        +   '<span class="notif-panel__icon">' + clockIcon() + '</span>'
        +   '<div class="notif-panel__content">'
        +     '<h4 class="notif-panel__title">' + item.title + '</h4>'
        +     '<p class="notif-panel__message">' + item.message + '</p>'
        +     '<time class="notif-panel__time">' + item.time + '</time>'
        +   '</div>'
        + '</article>';
    }).join('');
  }

  function panelMarkup() {
    return ''
      + '<div class="notif-panel__tabs" role="tablist" aria-label="Messages">'
      +   '<button type="button" class="notif-panel__tab" role="tab" data-notif-tab="chat" aria-selected="false">Chat</button>'
      +   '<button type="button" class="notif-panel__tab is-active" role="tab" data-notif-tab="notification" aria-selected="true">Notification</button>'
      + '</div>'
      + '<div class="notif-panel__filter">'
      +   '<span class="notif-panel__filter-text"><em>Start date</em><span class="notif-panel__filter-arrow" aria-hidden="true">→</span><em>End date</em></span>'
      +   '<span class="notif-panel__filter-icon">' + calIcon() + '</span>'
      + '</div>'
      + '<div class="notif-panel__body">'
      +   '<div class="notif-panel__pane" data-notif-pane="chat" role="tabpanel">' + renderItems(CHAT_ITEMS) + '</div>'
      +   '<div class="notif-panel__pane is-active" data-notif-pane="notification" role="tabpanel">' + renderItems(NOTIFICATIONS) + '</div>'
      + '</div>';
  }

  function ensureStyles(root) {
    if (document.querySelector('link[data-notification-panel-css]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = (root || '') + 'css/notification-panel.css?v=1';
    link.setAttribute('data-notification-panel-css', '1');
    document.head.appendChild(link);
  }

  function updateBadge(btn, count) {
    if (!btn) return;
    var badge = btn.querySelector('.topbar__badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'topbar__badge';
      badge.id = 'notifBadge';
      btn.appendChild(badge);
    }
    badge.textContent = String(count);
    badge.style.display = count ? '' : 'none';
  }

  function bindPanel(dropdown, btn) {
    if (!dropdown || dropdown.dataset.notifPanelReady) return;
    dropdown.dataset.notifPanelReady = '1';
    dropdown.classList.add('dropdown--notif-panel');
    dropdown.innerHTML = panelMarkup();
    updateBadge(btn, NOTIFICATIONS.length);

    dropdown.querySelectorAll('[data-notif-tab]').forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = tab.getAttribute('data-notif-tab');
        dropdown.querySelectorAll('[data-notif-tab]').forEach(function (t) {
          var active = t.getAttribute('data-notif-tab') === id;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        dropdown.querySelectorAll('[data-notif-pane]').forEach(function (pane) {
          pane.classList.toggle('is-active', pane.getAttribute('data-notif-pane') === id);
        });
      });
    });
  }

  function init(opts) {
    opts = opts || {};
    var root = opts.root || '';
    ensureStyles(root);

    document.querySelectorAll('#notifDropdown').forEach(function (dropdown) {
      var menu = dropdown.closest('.topbar__menu') || dropdown.parentElement;
      var btn = menu ? menu.querySelector('#notifBtn') : document.getElementById('notifBtn');
      bindPanel(dropdown, btn);

      if (!btn || btn.dataset.notifPanelBound) return;
      btn.dataset.notifPanelBound = '1';

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !dropdown.classList.contains('is-open');
        document.querySelectorAll('.dropdown.is-open').forEach(function (d) {
          d.classList.remove('is-open');
        });
        document.querySelectorAll('#notifBtn[aria-expanded="true"]').forEach(function (b) {
          b.setAttribute('aria-expanded', 'false');
        });
        if (open) {
          dropdown.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    if (!global.__NOTIF_PANEL_OUTSIDE_BOUND) {
      global.__NOTIF_PANEL_OUTSIDE_BOUND = true;
      document.addEventListener('click', function (e) {
        if (e.target.closest('#notifBtn') || e.target.closest('#notifDropdown')) return;
        document.querySelectorAll('#notifDropdown.is-open').forEach(function (dropdown) {
          dropdown.classList.remove('is-open');
        });
        document.querySelectorAll('#notifBtn[aria-expanded="true"]').forEach(function (btn) {
          btn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  global.NotificationPanel = { init: init };

  function boot() { init(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
