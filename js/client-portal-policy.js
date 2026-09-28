(function () {
  'use strict';

  var POLICY_CONTENT = {
    'Refund policy': '<h3><strong>Bluemoon Wealth Management: Refund Policy</strong></h3><p><strong>1. General</strong></p><p>The following terms are applicable for any products that You purchased with Us through the &lsquo;CA Cloud Desk&rsquo; software platform.</p><p><strong>1. Interpretation and Definitions</strong></p><p>Capitalized terms used in this policy have the meanings assigned to them in the Terms &amp; Conditions unless otherwise defined here.</p>',
    'Cache Policy': '<h3><strong>Cache Policy</strong></h3><p><strong>1. Overview</strong></p><p>This policy describes how cached data is stored and refreshed within the client portal.</p>',
    'EULA': '<h3><strong>End User License Agreement</strong></h3><p><strong>1. License Grant</strong></p><p>Subject to these terms, we grant you a limited, non-exclusive license to use the software platform.</p>',
    'Privacy Policy': '<h3><strong>Privacy Policy</strong></h3><p><strong>1. Information We Collect</strong></p><p>We collect information you provide directly and data generated through your use of the portal.</p>',
    'Terms & Conditions': '<h3><strong>Terms &amp; Conditions</strong></h3><p><strong>1. Acceptance</strong></p><p>By accessing the client portal, you agree to be bound by these terms.</p>',
    'Community Policies': '<h3><strong>Community Policies</strong></h3><p><strong>1. Conduct</strong></p><p>Users must interact respectfully and follow applicable community guidelines.</p>'
  };

  function toast(title, msg) {
    var stack = document.getElementById('cppToastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'cppToastStack';
      stack.className = 'cpp-toast-stack';
      document.body.appendChild(stack);
    }
    var el = document.createElement('div');
    el.className = 'cpp-toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + (msg || '') + '</span>';
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 2800);
  }

  function initTabs() {
    var tabs = document.querySelectorAll('.cpp-tab');
    var panes = document.querySelectorAll('.cpp-pane');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-cpp-tab');
        tabs.forEach(function (t) {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        });
        panes.forEach(function (pane) {
          var on = pane.getAttribute('data-cpp-pane') === id;
          pane.classList.toggle('is-active', on);
          pane.hidden = !on;
        });
      });
    });
  }

  function showPolicyView() {
    var view = document.getElementById('cppPolicyView');
    var editor = document.getElementById('cppPolicyEditor');
    if (view) view.hidden = false;
    if (editor) editor.hidden = true;
  }

  function showPolicyEditor(name, readOnly) {
    var view = document.getElementById('cppPolicyView');
    var editor = document.getElementById('cppPolicyEditor');
    var input = document.getElementById('cppPolicySelect');
    var body = document.getElementById('cppPolicyEditorBody');
    if (!view || !editor || !input || !body) return;

    view.hidden = true;
    editor.hidden = false;
    input.value = name;
    body.innerHTML = POLICY_CONTENT[name] || '<p>Enter policy details here.</p>';
    body.contentEditable = readOnly ? 'false' : 'true';
    updateWordCount();
    syncPolicyDropdown(name);
  }

  function syncPolicyDropdown(name) {
    var dropdown = document.getElementById('cppPolicyDropdown');
    if (!dropdown) return;
    dropdown.querySelectorAll('.cpp-select__item').forEach(function (item) {
      item.classList.toggle('is-active', item.textContent === name);
    });
  }

  function updateWordCount() {
    var body = document.getElementById('cppPolicyEditorBody');
    var countEl = document.getElementById('cppWordCount');
    if (!body || !countEl) return;
    var text = (body.textContent || '').trim();
    var words = text ? text.split(/\s+/).length : 0;
    countEl.textContent = words + ' words';
  }

  function initPolicyTable() {
    document.querySelectorAll('[data-cpp-view]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var row = btn.closest('tr');
        var name = row ? row.getAttribute('data-policy') : '';
        showPolicyEditor(name, true);
      });
    });

    document.querySelectorAll('[data-cpp-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var row = btn.closest('tr');
        var name = row ? row.getAttribute('data-policy') : '';
        showPolicyEditor(name, false);
      });
    });

    document.querySelectorAll('[data-cpp-del]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var row = btn.closest('tr');
        if (row) row.remove();
        toast('Deleted', 'Policy removed.');
      });
    });
  }

  function initPolicyDropdown() {
    var dropdown = document.getElementById('cppPolicyDropdown');
    var input = document.getElementById('cppPolicySelect');
    var body = document.getElementById('cppPolicyEditorBody');
    if (!dropdown || !input || !body) return;

    var items = Array.prototype.slice.call(dropdown.querySelectorAll('.cpp-select__item'));

    function closeMenu() { dropdown.classList.remove('is-open'); }
    function openMenu() { dropdown.classList.add('is-open'); }

    input.addEventListener('focus', openMenu);
    input.addEventListener('click', function (e) {
      e.stopPropagation();
      openMenu();
    });
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      items.forEach(function (item) {
        item.style.display = !q || item.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
      });
      openMenu();
    });

    items.forEach(function (item) {
      item.addEventListener('mousedown', function (e) {
        e.preventDefault();
        var name = item.textContent;
        input.value = name;
        body.innerHTML = POLICY_CONTENT[name] || '<p>Enter policy details here.</p>';
        items.forEach(function (el) { el.classList.remove('is-active'); });
        item.classList.add('is-active');
        updateWordCount();
        closeMenu();
      });
    });

    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) closeMenu();
    });
  }

  function initEditor() {
    var body = document.getElementById('cppPolicyEditorBody');
    var form = document.getElementById('cppPolicyForm');
    var resetBtn = document.getElementById('cppPolicyReset');

    if (body) {
      body.addEventListener('input', updateWordCount);
    }

    document.querySelectorAll('.cpp-rt-btn[data-cmd]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cmd = btn.getAttribute('data-cmd');
        if (body && body.contentEditable !== 'false') {
          document.execCommand(cmd, false, null);
          body.focus();
          updateWordCount();
        }
      });
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = (document.getElementById('cppPolicySelect') || {}).value || '';
        if (!name.trim()) {
          toast('Validation', "'Policy' is required!");
          return;
        }
        if (body) POLICY_CONTENT[name] = body.innerHTML;
        toast('Saved', 'Policy saved successfully.');
        showPolicyView();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        var name = (document.getElementById('cppPolicySelect') || {}).value || 'Refund policy';
        if (body) body.innerHTML = POLICY_CONTENT[name] || '<p>Enter policy details here.</p>';
        updateWordCount();
      });
    }
  }

  function initAccessToggles() {
    document.querySelectorAll('#cppAccessList .cpp-toggle input').forEach(function (input) {
      input.addEventListener('change', function () {
        var label = input.closest('li');
        var name = label ? label.querySelector('span').textContent : 'Setting';
        toast('Updated', name + ' ' + (input.checked ? 'enabled' : 'disabled') + '.');
      });
    });
  }

  function boot() {
    initTabs();
    initPolicyTable();
    initPolicyDropdown();
    initEditor();
    initAccessToggles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
