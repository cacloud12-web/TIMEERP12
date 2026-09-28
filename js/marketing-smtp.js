/**
 * Marketing — SMTP Configuration
 */
(function () {
  'use strict';

  var CONFIGS = [
    { email: 'rawatsuhanshi1@gmail.com', host: 'smtp.gmail.com', port: '587', isDefault: true, imap: false, imapHost: '', imapPort: '' }
  ];

  function toast(title, msg) {
    if (window.DashboardShell && DashboardShell.toast) DashboardShell.toast(title, msg);
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function showTab(name) {
    document.querySelectorAll('[data-msmtp-tab]').forEach(function (btn) {
      var on = btn.getAttribute('data-msmtp-tab') === name;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('[data-msmtp-panel]').forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-msmtp-panel') !== name;
    });
    if (name === 'view') renderView();
  }

  function renderView() {
    var empty = document.getElementById('msmtpViewEmpty');
    var wrap = document.getElementById('msmtpViewTable');
    var body = document.getElementById('msmtpViewBody');
    if (!CONFIGS.length) {
      if (empty) empty.hidden = false;
      if (wrap) wrap.hidden = true;
      return;
    }
    if (empty) empty.hidden = true;
    if (wrap) wrap.hidden = false;
    if (!body) return;
    body.innerHTML = CONFIGS.map(function (c, i) {
      return '<tr><td>' + esc(c.email) + '</td><td>' + esc(c.host) + '</td><td>' + esc(c.port) +
        '</td><td>' + (c.isDefault ? 'Yes' : '—') + '</td><td>' + (c.imap ? 'Yes' : '—') +
        '</td><td><button type="button" class="met-link" data-msmtp-edit="' + i + '">Edit</button>' +
        '<button type="button" class="met-link met-link--danger" data-msmtp-del="' + i + '">Delete</button></td></tr>';
    }).join('');
  }

  function syncImapFields() {
    var on = !!(document.getElementById('msmtpImap') || {}).checked;
    document.querySelectorAll('.msmtp-imap-fields').forEach(function (el) {
      el.hidden = !on;
    });
  }

  function fillForm(c) {
    var email = document.getElementById('msmtpEmail');
    var pass = document.getElementById('msmtpPassword');
    var host = document.getElementById('msmtpHost');
    var port = document.getElementById('msmtpPort');
    var def = document.getElementById('msmtpDefault');
    var imap = document.getElementById('msmtpImap');
    var imapHost = document.getElementById('msmtpImapHost');
    var imapPort = document.getElementById('msmtpImapPort');
    if (email) email.value = c.email || '';
    if (pass) { pass.value = '••••••••••••'; pass.type = 'password'; }
    if (host) host.value = c.host || '';
    if (port) port.value = c.port || '';
    if (def) def.checked = !!c.isDefault;
    if (imap) imap.checked = !!c.imap;
    if (imapHost) imapHost.value = c.imapHost || '';
    if (imapPort) imapPort.value = c.imapPort || '';
    syncImapFields();
  }

  function bind() {
    document.querySelectorAll('[data-msmtp-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showTab(btn.getAttribute('data-msmtp-tab'));
      });
    });

    var imap = document.getElementById('msmtpImap');
    if (imap) imap.addEventListener('change', syncImapFields);

    var toggle = document.getElementById('msmtpPassToggle');
    var pass = document.getElementById('msmtpPassword');
    if (toggle && pass) {
      toggle.addEventListener('click', function () {
        var show = pass.type === 'password';
        pass.type = show ? 'text' : 'password';
        toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
        toggle.title = show ? 'Hide password' : 'Show password';
      });
    }

    var form = document.getElementById('msmtpForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = (document.getElementById('msmtpEmail') || {}).value || '';
        var password = (document.getElementById('msmtpPassword') || {}).value || '';
        var host = (document.getElementById('msmtpHost') || {}).value || '';
        var port = (document.getElementById('msmtpPort') || {}).value || '';
        if (!email.trim()) { toast('Validation', "'Email' is required!"); return; }
        if (!password.trim()) { toast('Validation', "'Password' is required!"); return; }
        if (!host.trim()) { toast('Validation', "'Host' is required!"); return; }
        if (!port.trim()) { toast('Validation', "'Port' is required!"); return; }
        var imapOn = !!(document.getElementById('msmtpImap') || {}).checked;
        var row = {
          email: email.trim(),
          host: host.trim(),
          port: port.trim(),
          isDefault: !!(document.getElementById('msmtpDefault') || {}).checked,
          imap: imapOn,
          imapHost: ((document.getElementById('msmtpImapHost') || {}).value || '').trim(),
          imapPort: ((document.getElementById('msmtpImapPort') || {}).value || '').trim()
        };
        if (imapOn && !row.imapHost) {
          toast('Validation', "'IMAP Host' is required when IMAP is enabled!");
          return;
        }
        if (row.isDefault) {
          CONFIGS.forEach(function (c) { c.isDefault = false; });
        }
        CONFIGS.unshift(row);
        toast('Saved', 'SMTP configuration saved for ' + row.email);
        showTab('view');
      });
    }

    document.addEventListener('click', function (e) {
      var edit = e.target.closest('[data-msmtp-edit]');
      if (edit) {
        var idx = +edit.getAttribute('data-msmtp-edit');
        var row = CONFIGS[idx];
        if (!row) return;
        fillForm(row);
        CONFIGS.splice(idx, 1);
        showTab('config');
        return;
      }
      var del = e.target.closest('[data-msmtp-del]');
      if (del) {
        var di = +del.getAttribute('data-msmtp-del');
        CONFIGS.splice(di, 1);
        toast('Deleted', 'SMTP configuration removed.');
        renderView();
      }
    });

    syncImapFields();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
