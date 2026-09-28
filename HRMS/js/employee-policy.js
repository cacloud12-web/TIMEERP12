/**
 * TIME ERP — Employee Policy create form
 */
(function () {
  'use strict';

  var CATEGORIES = [
    'Leave Policy',
    'Attendance Policy',
    'Expense Policy',
    'Grievance Policy',
    'Timesheet Policy'
  ];

  var state = {
    category: '',
    comboOpen: false,
    comboQuery: '',
    moreOpen: false,
    checkedIn: false,
    policies: []
  };

  var els = {
    form: document.getElementById('epForm'),
    wrap: document.getElementById('epCategoryWrap'),
    input: document.getElementById('epCategoryInput'),
    list: document.getElementById('epCategoryList'),
    error: document.getElementById('epCategoryError'),
    editor: document.getElementById('epEditor'),
    path: document.getElementById('epEditorPath'),
    words: document.getElementById('epWordCount'),
    block: document.getElementById('epBlockFormat'),
    moreBtn: document.getElementById('epMoreBtn'),
    moreMenu: document.getElementById('epMoreMenu'),
    topCheckIn: document.getElementById('epTopCheckInBtn'),
    topClock: document.getElementById('epTopClock')
  };

  function toast(title, detail) {
    if (window.DashboardShell && window.DashboardShell.toast) {
      window.DashboardShell.toast(title, detail);
      return;
    }
    var stack = document.getElementById('toastStack');
    if (!stack) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + (detail || '') + '</span>';
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 3200);
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function wordCount(text) {
    var t = String(text || '').replace(/\s+/g, ' ').trim();
    if (!t) return 0;
    return t.split(' ').length;
  }

  function updateWordCount() {
    if (!els.editor || !els.words) return;
    var n = wordCount(els.editor.innerText || els.editor.textContent || '');
    els.words.textContent = n + (n === 1 ? ' word' : ' words');
  }

  function updatePath() {
    if (!els.path) return;
    var sel = window.getSelection();
    var tag = 'p';
    if (sel && sel.anchorNode) {
      var node = sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode;
      while (node && node !== els.editor) {
        if (node.tagName) {
          tag = String(node.tagName).toLowerCase();
          break;
        }
        node = node.parentElement;
      }
    }
    els.path.textContent = tag || 'p';
  }

  function renderCategoryList() {
    if (!els.list) return;
    var q = String(state.comboQuery || '').trim().toLowerCase();
    var items = CATEGORIES.filter(function (c) {
      return !q || c.toLowerCase().indexOf(q) !== -1;
    });
    els.list.innerHTML = items.map(function (c) {
      var active = state.category === c ? ' is-active' : '';
      return '<button type="button" class="ep-combo__opt' + active + '" role="option" data-ep-cat="' + escapeHtml(c) + '">' + escapeHtml(c) + '</button>';
    }).join('') || '<div class="ep-combo__opt" style="cursor:default;color:#8c8c8c">No categories found</div>';
  }

  function openCombo() {
    state.comboOpen = true;
    if (els.wrap) els.wrap.classList.add('is-open');
    if (els.input) els.input.setAttribute('aria-expanded', 'true');
    renderCategoryList();
    if (els.list) els.list.hidden = false;
  }

  function closeCombo() {
    state.comboOpen = false;
    if (els.wrap) els.wrap.classList.remove('is-open');
    if (els.input) {
      els.input.setAttribute('aria-expanded', 'false');
      els.input.value = state.category || '';
    }
    state.comboQuery = '';
    if (els.list) els.list.hidden = true;
  }

  function setCategory(value) {
    state.category = value || '';
    if (els.input) els.input.value = state.category;
    if (els.wrap) els.wrap.classList.remove('is-invalid');
    if (els.error) els.error.hidden = true;
    closeCombo();
  }

  function exec(cmd, value) {
    if (!els.editor) return;
    els.editor.focus();
    try { document.execCommand(cmd, false, value || null); } catch (err) { /* ignore */ }
    updateWordCount();
    updatePath();
  }

  function applyBlock(tag) {
    if (!els.editor) return;
    els.editor.focus();
    try { document.execCommand('formatBlock', false, tag); } catch (err) { /* ignore */ }
    updatePath();
  }

  function closeMore() {
    state.moreOpen = false;
    if (els.moreMenu) els.moreMenu.hidden = true;
  }

  function resetForm() {
    state.category = '';
    if (els.input) els.input.value = '';
    if (els.editor) els.editor.innerHTML = '';
    if (els.block) els.block.value = 'p';
    updateWordCount();
    updatePath();
    if (els.wrap) els.wrap.classList.remove('is-invalid');
    if (els.error) els.error.hidden = true;
  }

  function submitForm(e) {
    e.preventDefault();
    if (!state.category) {
      if (els.wrap) els.wrap.classList.add('is-invalid');
      if (els.error) els.error.hidden = false;
      if (els.input) els.input.focus();
      toast('Required', 'Please select a policy category.');
      return;
    }
    var html = els.editor ? els.editor.innerHTML.trim() : '';
    var text = els.editor ? (els.editor.innerText || '').trim() : '';
    state.policies.push({
      id: 'pol-' + Date.now(),
      category: state.category,
      descriptionHtml: html,
      descriptionText: text,
      createdAt: new Date().toISOString()
    });
    toast('Policy created', state.category + ' saved successfully.');
    resetForm();
  }

  function updateCheckInBtn() {
    if (!els.topCheckIn) return;
    els.topCheckIn.textContent = state.checkedIn ? 'Check Out' : 'Check In';
    els.topCheckIn.classList.toggle('is-in', !state.checkedIn);
    els.topCheckIn.classList.toggle('is-out', state.checkedIn);
  }

  function tickClock() {
    if (!els.topClock) return;
    var now = new Date();
    els.topClock.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes());
    els.topClock.setAttribute('datetime', now.toISOString());
  }

  function bind() {
    if (els.input) {
      els.input.addEventListener('focus', function () {
        state.comboQuery = '';
        openCombo();
      });
      els.input.addEventListener('input', function () {
        state.comboQuery = els.input.value || '';
        if (state.category && state.comboQuery !== state.category) state.category = '';
        openCombo();
      });
      els.input.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeCombo();
      });
    }

    if (els.list) {
      els.list.addEventListener('click', function (e) {
        var opt = e.target.closest('[data-ep-cat]');
        if (!opt) return;
        setCategory(opt.getAttribute('data-ep-cat'));
      });
    }

    document.addEventListener('click', function (e) {
      if (state.comboOpen && els.wrap && !els.wrap.contains(e.target)) closeCombo();
      if (state.moreOpen && els.moreMenu && !els.moreMenu.contains(e.target) && e.target !== els.moreBtn && !(els.moreBtn && els.moreBtn.contains(e.target))) {
        closeMore();
      }
    });

    var toolbar = document.querySelector('.ep-editor__toolbar');
    if (toolbar) {
      toolbar.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-cmd]');
        if (!btn) return;
        var cmd = btn.getAttribute('data-cmd');
        if (cmd === 'more') {
          state.moreOpen = !state.moreOpen;
          if (els.moreMenu) els.moreMenu.hidden = !state.moreOpen;
          return;
        }
        if (btn.closest('#epMoreMenu')) closeMore();
        exec(cmd);
      });
    }

    if (els.block) {
      els.block.addEventListener('change', function () {
        applyBlock(els.block.value || 'p');
      });
    }

    if (els.editor) {
      els.editor.addEventListener('input', updateWordCount);
      els.editor.addEventListener('keyup', updatePath);
      els.editor.addEventListener('mouseup', updatePath);
      els.editor.addEventListener('focus', updatePath);
    }

    if (els.form) els.form.addEventListener('submit', submitForm);

    if (els.topCheckIn) {
      els.topCheckIn.addEventListener('click', function () {
        state.checkedIn = !state.checkedIn;
        updateCheckInBtn();
        toast(state.checkedIn ? 'Checked In' : 'Checked Out', state.checkedIn ? 'You are checked in.' : 'You are checked out.');
      });
    }
  }

  bind();
  updateCheckInBtn();
  tickClock();
  setInterval(tickClock, 1000);
  updateWordCount();
  updatePath();
})();
