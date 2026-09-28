(function () {
  'use strict';

  var TYPE_LABELS = {
    goto: 'Go To Action',
    creation: 'Creation Action',
    module: 'Module Level Actions',
    general: 'General Shortcuts',
    transaction: 'Transaction Level Actions',
    save: 'Save Actions'
  };

  var ACTIONS = {
    goto: ['Dashboard', 'Clients', 'Tasks', 'Invoices', 'Reports', 'Settings'],
    creation: ['New Client', 'New Task', 'New Invoice', 'New Employee', 'New Note'],
    module: ['Open HRMS', 'Open Payroll', 'Open CRM', 'Open Documents'],
    general: ['Search', 'Notifications', 'Profile', 'Help'],
    transaction: ['Save Draft', 'Submit', 'Approve', 'Reject'],
    save: ['Save', 'Save & Close', 'Save & New']
  };

  var shortcuts = [];
  var nextId = 1;
  var activeTab = 'goto';

  function $(id) { return document.getElementById(id); }

  function toast(title, msg) {
    var stack = document.getElementById('scToastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'scToastStack';
      stack.className = 'sc-toast-stack';
      document.body.appendChild(stack);
    }
    var el = document.createElement('div');
    el.className = 'sc-toast';
    el.innerHTML = '<strong>' + title + '</strong>' + (msg || '');
    stack.appendChild(el);
    setTimeout(function () {
      el.remove();
      if (!stack.childElementCount) stack.remove();
    }, 2800);
  }

  function tabShortcuts() {
    return shortcuts.filter(function (s) { return s.type === activeTab; });
  }

  function renderPane() {
    var list = tabShortcuts();
    var empty = $('scEmpty');
    var wrap = $('scTableWrap');
    var body = $('scTableBody');
    if (!empty || !wrap || !body) return;

    if (!list.length) {
      empty.hidden = false;
      wrap.hidden = true;
      body.innerHTML = '';
      return;
    }

    empty.hidden = true;
    wrap.hidden = false;
    body.innerHTML = list.map(function (item) {
      return '<tr data-sc-id="' + item.id + '">' +
        '<td>' + TYPE_LABELS[item.type] + '</td>' +
        '<td>' + item.action + '</td>' +
        '<td><span class="sc-key-badge">Command Shift ' + item.key + '</span></td>' +
        '<td><div class="sc-row-actions">' +
          '<button type="button" class="sc-icon-btn sc-icon-btn--del" data-sc-del aria-label="Delete shortcut">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 7h16"/><path d="M10 7V5a1 1 0 011-1h2a1 1 0 011 1v2"/><path d="M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13"/><path d="M10 11v7M14 11v7"/></svg>' +
          '</button>' +
        '</div></td>' +
      '</tr>';
    }).join('');
  }

  function setTab(name) {
    activeTab = name;
    document.querySelectorAll('[data-sc-tab]').forEach(function (tab) {
      var active = tab.getAttribute('data-sc-tab') === name;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    renderPane();
  }

  function populateActions(type) {
    var actionSel = $('scAction');
    if (!actionSel) return;
    var opts = ACTIONS[type] || [];
    actionSel.innerHTML = '<option value="">Select Action</option>' +
      opts.map(function (a) { return '<option value="' + a + '">' + a + '</option>'; }).join('');
    actionSel.disabled = !type;
    actionSel.value = '';
  }

  function openModal() {
    var modal = $('scModal');
    var form = $('scForm');
    var typeSel = $('scType');
    if (!modal || !form) return;
    form.reset();
    if (typeSel) {
      typeSel.value = activeTab;
      populateActions(activeTab);
    }
    modal.hidden = false;
    if (typeSel) typeSel.focus();
  }

  function closeModal() {
    var modal = $('scModal');
    if (modal) modal.hidden = true;
  }

  function bindTabs() {
    document.querySelectorAll('[data-sc-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        setTab(tab.getAttribute('data-sc-tab'));
      });
    });
  }

  function bindModal() {
    var addBtn = $('scAddBtn');
    var form = $('scForm');
    var typeSel = $('scType');
    var keyInput = $('scKeyLetter');

    if (addBtn) addBtn.addEventListener('click', openModal);

    document.querySelectorAll('[data-sc-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });

    if (typeSel) {
      typeSel.addEventListener('change', function () {
        populateActions(typeSel.value);
      });
    }

    if (keyInput) {
      keyInput.addEventListener('input', function () {
        keyInput.value = keyInput.value.replace(/[^a-zA-Z]/g, '').slice(0, 1).toUpperCase();
      });
    }

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var type = (typeSel || {}).value || '';
        var action = ($('scAction') || {}).value || '';
        var key = ((keyInput || {}).value || '').trim().toUpperCase();
        if (!type || !action || !key) {
          toast('Required', 'Please fill all required fields.');
          return;
        }
        shortcuts.push({ id: nextId++, type: type, action: action, key: key });
        closeModal();
        setTab(type);
        toast('Saved', 'Shortcut saved successfully.');
      });
    }
  }

  function bindTableActions() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-sc-del]');
      if (!btn) return;
      var row = btn.closest('tr');
      var id = row ? Number(row.getAttribute('data-sc-id')) : null;
      shortcuts = shortcuts.filter(function (s) { return s.id !== id; });
      renderPane();
      toast('Deleted', 'Shortcut removed.');
    });
  }

  function init() {
    bindTabs();
    bindModal();
    bindTableActions();
    setTab('goto');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
