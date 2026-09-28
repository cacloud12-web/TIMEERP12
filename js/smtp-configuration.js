(function () {
  'use strict';

  function toast(title, msg) {
    var stack = document.getElementById('smtpToastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'smtpToastStack';
      stack.className = 'smtp-toast-stack';
      document.body.appendChild(stack);
    }
    var el = document.createElement('div');
    el.className = 'smtp-toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + (msg || '') + '</span>';
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 2800);
  }

  function initTabs() {
    var tabs = document.querySelectorAll('.smtp-tab');
    var panes = document.querySelectorAll('.smtp-pane');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-smtp-tab');
        tabs.forEach(function (t) {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        });
        panes.forEach(function (pane) {
          var on = pane.getAttribute('data-smtp-pane') === id;
          pane.classList.toggle('is-active', on);
          pane.hidden = !on;
        });
      });
    });
  }

  function initForm() {
    var form = document.getElementById('smtpForm');
    var pass = document.getElementById('smtpPassword');
    var toggle = document.getElementById('smtpPassToggle');
    var imap = document.getElementById('smtpImap');
    var imapFields = document.getElementById('smtpImapFields');

    if (toggle && pass) {
      toggle.addEventListener('click', function () {
        var show = pass.type === 'password';
        pass.type = show ? 'text' : 'password';
        toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      });
    }

    if (imap && imapFields) {
      imap.addEventListener('change', function () {
        imapFields.hidden = !imap.checked;
      });
    }

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = (document.getElementById('smtpEmail') || {}).value || '';
        var password = (document.getElementById('smtpPassword') || {}).value || '';
        var host = (document.getElementById('smtpHost') || {}).value || '';
        var port = (document.getElementById('smtpPort') || {}).value || '';
        if (!email.trim()) { toast('Validation', "'Email' is required!"); return; }
        if (!password.trim()) { toast('Validation', "'Password' is required!"); return; }
        if (!host.trim()) { toast('Validation', "'Host' is required!"); return; }
        if (!port.trim()) { toast('Validation', "'Port' is required!"); return; }
        if (imap && imap.checked) {
          var ih = (document.getElementById('smtpImapHost') || {}).value || '';
          var ip = (document.getElementById('smtpImapPort') || {}).value || '';
          if (!ih.trim() || !ip.trim()) {
            toast('Validation', 'IMAP Host and Port are required when IMAP is enabled.');
            return;
          }
        }
        toast('Saved', 'SMTP configuration saved successfully.');
      });
    }
  }

  function initViewActions() {
    document.querySelectorAll('[data-smtp-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var configTab = document.querySelector('.smtp-tab[data-smtp-tab="config"]');
        if (configTab) configTab.click();
        toast('Edit', 'Loaded SMTP settings into the form.');
      });
    });
    document.querySelectorAll('[data-smtp-del]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var row = btn.closest('tr');
        if (row) row.remove();
        toast('Deleted', 'SMTP configuration removed.');
      });
    });
  }

  function boot() {
    initTabs();
    initForm();
    initViewActions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
