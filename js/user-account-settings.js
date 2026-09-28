(function () {
  'use strict';

  var PAGE_SIZE = 10;
  var sessions = [
    { id: 's1', lastLogin: '22/08/2026, 10:12:04', lastActivity: '22/08/2026, 10:38:41', ip: '122.161.49.7', ua: 'Chrome 151.0.0.0 | Macintosh; Intel Mac OS X 10_15_7' },
    { id: 's2', lastLogin: '21/08/2026, 18:45:22', lastActivity: '21/08/2026, 19:02:11', ip: '103.21.244.8', ua: 'Chrome 151.0.0.0 | Windows NT 10.0; Win64; x64' },
    { id: 's3', lastLogin: '21/08/2026, 09:30:15', lastActivity: '21/08/2026, 17:55:03', ip: '49.36.210.55', ua: 'Safari 18.2 | iPhone; CPU iPhone OS 18_2 like Mac OS X' },
    { id: 's4', lastLogin: '20/08/2026, 14:20:08', lastActivity: '20/08/2026, 16:48:33', ip: '182.76.112.44', ua: 'Firefox 134.0 | Ubuntu; Linux x86_64' },
    { id: 's5', lastLogin: '19/08/2026, 11:05:41', lastActivity: '19/08/2026, 11:42:19', ip: '122.161.49.7', ua: 'Edge 132.0.0.0 | Windows NT 10.0; Win64; x64' },
    { id: 's6', lastLogin: '18/08/2026, 08:55:02', lastActivity: '18/08/2026, 18:12:50', ip: '49.36.210.55', ua: 'Chrome 150.0.0.0 | Android 14; Mobile' },
    { id: 's7', lastLogin: '17/08/2026, 16:33:27', lastActivity: '17/08/2026, 16:40:05', ip: '103.21.244.8', ua: 'Unknown Browser | dart:io' },
    { id: 's8', lastLogin: '16/08/2026, 10:18:59', lastActivity: '16/08/2026, 15:22:44', ip: '182.76.112.44', ua: 'Chrome 150.0.0.0 | Macintosh; Intel Mac OS X 10_15_7' },
    { id: 's9', lastLogin: '15/08/2026, 13:44:16', lastActivity: '15/08/2026, 14:01:02', ip: '122.161.49.7', ua: 'Chrome 149.0.0.0 | Windows NT 10.0; Win64; x64' },
    { id: 's10', lastLogin: '14/08/2026, 09:02:33', lastActivity: '14/08/2026, 12:30:18', ip: '49.36.210.55', ua: 'Safari 17.6 | Macintosh; Intel Mac OS X 10_15_7' },
    { id: 's11', lastLogin: '13/08/2026, 17:11:05', lastActivity: '13/08/2026, 17:45:27', ip: '103.21.244.8', ua: 'Chrome 149.0.0.0 | Android 13; Mobile' },
    { id: 's12', lastLogin: '12/08/2026, 11:28:49', lastActivity: '12/08/2026, 16:55:12', ip: '182.76.112.44', ua: 'Firefox 133.0 | Windows NT 10.0; Win64; x64' },
    { id: 's13', lastLogin: '11/08/2026, 08:40:21', lastActivity: '11/08/2026, 09:15:44', ip: '122.161.49.7', ua: 'Edge 131.0.0.0 | Windows NT 10.0; Win64; x64' },
    { id: 's14', lastLogin: '10/08/2026, 15:05:37', lastActivity: '10/08/2026, 18:22:09', ip: '49.36.210.55', ua: 'Chrome 148.0.0.0 | Macintosh; Intel Mac OS X 10_15_7' }
  ];

  var state = { page: 1 };
  var els = {};

  function $(id) { return document.getElementById(id); }

  function toast(title, msg) {
    var stack = document.getElementById('uasToastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'uasToastStack';
      stack.className = 'uas-toast-stack';
      document.body.appendChild(stack);
    }
    var el = document.createElement('div');
    el.className = 'uas-toast';
    el.innerHTML = '<strong>' + title + '</strong>' + msg;
    stack.appendChild(el);
    setTimeout(function () {
      el.remove();
      if (!stack.childElementCount) stack.remove();
    }, 3200);
  }

  function totalPages() {
    return Math.max(1, Math.ceil(sessions.length / PAGE_SIZE));
  }

  function renderSessions() {
    if (!els.body) return;
    var start = (state.page - 1) * PAGE_SIZE;
    var slice = sessions.slice(start, start + PAGE_SIZE);
    els.body.innerHTML = slice.map(function (row) {
      return '<tr data-session-id="' + row.id + '">' +
        '<td>' + row.lastLogin + '</td>' +
        '<td>' + row.lastActivity + '</td>' +
        '<td>' + row.ip + '</td>' +
        '<td class="uas-ua" title="' + row.ua.replace(/"/g, '&quot;') + '">' + row.ua + '</td>' +
        '<td><button type="button" class="uas-del-btn" data-del-session="' + row.id + '" aria-label="Delete session">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M4 7h16"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/><path d="M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12"/><path d="M10 11v6M14 11v6"/></svg>' +
        '</button></td></tr>';
    }).join('');

    var pages = totalPages();
    if (els.pageNum) els.pageNum.value = String(state.page);
    if (els.pageOf) els.pageOf.textContent = 'of ' + pages;
    if (els.count) {
      var shown = slice.length;
      els.count.textContent = shown + ' / ' + sessions.length;
    }
    if (els.prev) els.prev.disabled = state.page <= 1;
    if (els.next) els.next.disabled = state.page >= pages;
  }

  function setTab(name) {
    document.querySelectorAll('[data-uas-tab]').forEach(function (tab) {
      var active = tab.getAttribute('data-uas-tab') === name;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.querySelectorAll('[data-uas-pane]').forEach(function (pane) {
      var show = pane.getAttribute('data-uas-pane') === name;
      pane.hidden = !show;
    });
    if (name === 'sessions') renderSessions();
    if (history.replaceState) {
      history.replaceState(null, '', '#' + name);
    } else {
      location.hash = name;
    }
  }

  function validatePassword(v) {
    if (v.length < 8 || v.length > 14) return false;
    if (!/[0-9]/.test(v)) return false;
    if (!/[A-Z]/.test(v)) return false;
    if (!/[a-z]/.test(v)) return false;
    if (/[^A-Za-z0-9@#$_-]/.test(v)) return false;
    return true;
  }

  function bindTabs() {
    document.querySelectorAll('[data-uas-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        setTab(tab.getAttribute('data-uas-tab'));
      });
    });
    var hash = (location.hash || '#password').replace('#', '');
    if (hash !== 'password' && hash !== 'sessions') hash = 'password';
    setTab(hash);
  }

  function bindPasswordForm() {
    document.querySelectorAll('[data-toggle-pass]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-toggle-pass');
        var input = $(id);
        if (!input) return;
        var show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      });
    });

    var form = $('uasPasswordForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var oldP = ($('uasOldPass') || {}).value || '';
      var newP = ($('uasNewPass') || {}).value || '';
      var confirmP = ($('uasConfirmPass') || {}).value || '';
      if (!oldP || !newP || !confirmP) {
        toast('Required', 'Please fill all password fields.');
        return;
      }
      if (newP !== confirmP) {
        toast('Mismatch', 'New password and confirm password do not match.');
        return;
      }
      if (!validatePassword(newP)) {
        toast('Invalid password', 'Password does not meet the requirements listed in the note.');
        return;
      }
      toast('Saved', 'Your password has been updated.');
      form.reset();
    });
  }

  function bindPager() {
    if (els.prev) {
      els.prev.addEventListener('click', function () {
        if (state.page > 1) {
          state.page -= 1;
          renderSessions();
        }
      });
    }
    if (els.next) {
      els.next.addEventListener('click', function () {
        if (state.page < totalPages()) {
          state.page += 1;
          renderSessions();
        }
      });
    }
    if (els.pageNum) {
      els.pageNum.addEventListener('change', function () {
        var n = parseInt(els.pageNum.value, 10);
        if (!n || n < 1) n = 1;
        if (n > totalPages()) n = totalPages();
        state.page = n;
        renderSessions();
      });
    }
  }

  function bindSessionDelete() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-del-session]');
      if (!btn) return;
      var id = btn.getAttribute('data-del-session');
      sessions = sessions.filter(function (s) { return s.id !== id; });
      if (state.page > totalPages()) state.page = totalPages();
      renderSessions();
      toast('Session removed', 'The selected session has been logged out.');
    });

    var bulkBtn = $('uasBulkDel');
    if (bulkBtn) {
      bulkBtn.addEventListener('click', function () {
        if (!sessions.length) {
          toast('No sessions', 'There are no sessions to delete.');
          return;
        }
        if (!window.confirm('Delete all session records except the current browser?')) return;
        sessions = sessions.slice(0, 1);
        state.page = 1;
        renderSessions();
        toast('Bulk delete', 'Other sessions have been logged out.');
      });
    }
  }

  function init() {
    els.body = $('uasSessionBody');
    els.pageNum = $('uasPageNum');
    els.pageOf = $('uasPageOf');
    els.count = $('uasCount');
    els.prev = $('uasPrev');
    els.next = $('uasNext');
    bindTabs();
    bindPasswordForm();
    bindPager();
    bindSessionDelete();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
