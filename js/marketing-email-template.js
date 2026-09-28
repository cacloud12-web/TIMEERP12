/**
 * Marketing — Email Template (Add / View / Deleted)
 */
(function () {
  'use strict';

  var TYPES = ['Generic', 'Invoice', 'Receipt', 'Appointment', 'Task', 'Welcome'];
  var TEMPLATES = [
    { title: 'GST Filing Reminder', type: 'Generic', subject: 'GST return due — {CLIENT_NAME}', body: '<p>Dear {CLIENT_NAME},</p><p>This is a reminder that your GST return is due. Regards, {SENDER_NAME}</p>' },
    { title: 'Welcome Mail', type: 'Welcome', subject: 'Welcome to {CA_ORG_NAME}', body: '<p>Hi {CLIENT_NAME},</p><p>Welcome aboard. — {SENDER_NAME}</p>' }
  ];
  var DELETED = [];

  var insertTarget = 'Email Template';
  var activeField = 'body';

  function toast(title, msg) {
    if (window.DashboardShell && DashboardShell.toast) DashboardShell.toast(title, msg);
  }

  function wordCount(el) {
    var text = (el.textContent || '').trim();
    return text ? text.split(/\s+/).length : 0;
  }

  function showTab(name) {
    document.querySelectorAll('[data-met-tab]').forEach(function (btn) {
      var on = btn.getAttribute('data-met-tab') === name;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('[data-met-panel]').forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-met-panel') !== name;
    });
    if (name === 'view') renderView();
    if (name === 'deleted') renderDeleted();
  }

  function renderView() {
    var empty = document.getElementById('metViewEmpty');
    var wrap = document.getElementById('metViewTable');
    var body = document.getElementById('metViewBody');
    if (!TEMPLATES.length) {
      if (empty) empty.hidden = false;
      if (wrap) wrap.hidden = true;
      return;
    }
    if (empty) empty.hidden = true;
    if (wrap) wrap.hidden = false;
    if (!body) return;
    body.innerHTML = TEMPLATES.map(function (t, i) {
      return '<tr><td>' + esc(t.title) + '</td><td>' + esc(t.type) + '</td><td>' + esc(t.subject) +
        '</td><td><button type="button" class="met-link" data-met-edit="' + i + '">Edit</button>' +
        '<button type="button" class="met-link met-link--danger" data-met-del="' + i + '">Delete</button></td></tr>';
    }).join('');
  }

  function renderDeleted() {
    var panel = document.querySelector('[data-met-panel="deleted"]');
    if (!panel) return;
    if (!DELETED.length) {
      panel.innerHTML = '<div class="met-empty">No deleted email templates.</div>';
      return;
    }
    panel.innerHTML = '<div class="met-table-wrap"><table class="met-table"><thead><tr><th>Title</th><th>Type</th><th>Subject</th><th>Actions</th></tr></thead><tbody>' +
      DELETED.map(function (t, i) {
        return '<tr><td>' + esc(t.title) + '</td><td>' + esc(t.type) + '</td><td>' + esc(t.subject) +
          '</td><td><button type="button" class="met-link" data-met-restore="' + i + '">Restore</button></td></tr>';
      }).join('') +
      '</tbody></table></div>';
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function closeCombos() {
    document.querySelectorAll('.mce-combo.is-open').forEach(function (c) { c.classList.remove('is-open'); });
  }

  function closeMenus() {
    document.querySelectorAll('.mce-editor__fmt-menu, .mce-editor__more-menu').forEach(function (m) { m.hidden = true; });
    document.querySelectorAll('.mce-editor__fmt, .mce-editor__more').forEach(function (b) {
      b.setAttribute('aria-expanded', 'false');
    });
  }

  function setupCombo(root) {
    var input = root.querySelector('input');
    var menu = root.querySelector('.mce-combo__menu');
    if (!input || !menu) return;
    menu.innerHTML = TYPES.map(function (t) {
      return '<div class="mce-combo__item" data-val="' + esc(t) + '">' + esc(t) + '</div>';
    }).join('');

    function open() {
      closeCombos();
      root.classList.add('is-open');
    }
    input.addEventListener('focus', open);
    input.addEventListener('click', open);
    menu.addEventListener('click', function (e) {
      var item = e.target.closest('.mce-combo__item');
      if (!item) return;
      input.value = item.getAttribute('data-val') || '';
      var typeLabel = document.getElementById('metVarType');
      if (typeLabel) typeLabel.textContent = input.value || 'Generic';
      closeCombos();
    });
  }

  function insertAtCursor(text) {
    if (activeField === 'title') {
      var title = document.getElementById('metTitle');
      if (!title) return;
      var start = title.selectionStart || title.value.length;
      var end = title.selectionEnd || start;
      title.value = title.value.slice(0, start) + text + title.value.slice(end);
      title.focus();
      title.setSelectionRange(start + text.length, start + text.length);
      return;
    }
    if (activeField === 'subject') {
      var subject = document.getElementById('metSubject');
      if (!subject) return;
      var s = subject.selectionStart || subject.value.length;
      var e = subject.selectionEnd || s;
      subject.value = subject.value.slice(0, s) + text + subject.value.slice(e);
      subject.focus();
      subject.setSelectionRange(s + text.length, s + text.length);
      return;
    }
    var area = document.getElementById('metBody');
    if (!area) return;
    area.focus();
    document.execCommand('insertText', false, text);
  }

  function resetForm() {
    var form = document.getElementById('metForm');
    if (form) form.reset();
    var type = document.getElementById('metType');
    if (type) type.value = 'Generic';
    var typeLabel = document.getElementById('metVarType');
    if (typeLabel) typeLabel.textContent = 'Generic';
    var body = document.getElementById('metBody');
    if (body) body.innerHTML = '';
    var words = document.getElementById('metWords');
    if (words) words.textContent = '0 words';
  }

  function bind() {
    document.querySelectorAll('[data-met-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showTab(btn.getAttribute('data-met-tab'));
      });
    });

    var addBtn = document.getElementById('metAddBtn');
    if (addBtn) addBtn.addEventListener('click', function () { showTab('add'); resetForm(); });

    document.querySelectorAll('.mce-combo').forEach(setupCombo);

    var title = document.getElementById('metTitle');
    var subject = document.getElementById('metSubject');
    var body = document.getElementById('metBody');
    var targetEl = document.getElementById('metInsertTarget');
    var wordsEl = document.getElementById('metWords');

    if (title) {
      title.addEventListener('focus', function () {
        activeField = 'title';
        insertTarget = 'Title';
        if (targetEl) targetEl.textContent = insertTarget;
      });
    }
    if (subject) {
      subject.addEventListener('focus', function () {
        activeField = 'subject';
        insertTarget = 'Subject';
        if (targetEl) targetEl.textContent = insertTarget;
      });
    }
    if (body) {
      body.addEventListener('focus', function () {
        activeField = 'body';
        insertTarget = 'Email Template';
        if (targetEl) targetEl.textContent = insertTarget;
      });
      body.addEventListener('input', function () {
        if (wordsEl) wordsEl.textContent = wordCount(body) + ' words';
      });
    }

    document.querySelectorAll('.mce-var-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        insertAtCursor(btn.getAttribute('data-var') || '');
      });
    });

    var editor = document.getElementById('metEditor');
    if (editor) {
      var fmtBtn = document.getElementById('metFmt');
      var fmtMenu = document.getElementById('metFmtMenu');
      var moreBtn = document.getElementById('metMore');
      var moreMenu = document.getElementById('metMoreMenu');

      editor.querySelectorAll('[data-cmd]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (!body) return;
          body.focus();
          var cmd = btn.getAttribute('data-cmd');
          if (cmd === 'undo') document.execCommand('undo');
          else if (cmd === 'redo') document.execCommand('redo');
          else if (cmd === 'bold') document.execCommand('bold');
          else if (cmd === 'italic') document.execCommand('italic');
          else if (cmd === 'foreColor') document.execCommand('foreColor', false, '#1677ff');
          else if (cmd === 'emoji') document.execCommand('insertText', false, '☺');
          else if (cmd === 'code') toast('Source', 'Source view coming soon.');
          else if (cmd === 'justifyLeft' || cmd === 'justifyCenter' || cmd === 'justifyRight' ||
                   cmd === 'insertUnorderedList' || cmd === 'insertOrderedList') {
            document.execCommand(cmd);
          }
        });
      });

      if (fmtBtn && fmtMenu) {
        fmtBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          closeMenus();
          var open = fmtMenu.hidden;
          fmtMenu.hidden = !open;
          fmtBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        fmtMenu.querySelectorAll('[data-fmt]').forEach(function (b) {
          b.addEventListener('click', function () {
            if (!body) return;
            body.focus();
            document.execCommand('formatBlock', false, b.getAttribute('data-fmt'));
            fmtMenu.querySelectorAll('button').forEach(function (x) { x.classList.remove('is-active'); });
            b.classList.add('is-active');
            closeMenus();
          });
        });
      }
      if (moreBtn && moreMenu) {
        moreBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          closeMenus();
          var open = moreMenu.hidden;
          moreMenu.hidden = !open;
          moreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
      }
    }

    var form = document.getElementById('metForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var type = (document.getElementById('metType') || {}).value || '';
        var t = (document.getElementById('metTitle') || {}).value || '';
        var s = (document.getElementById('metSubject') || {}).value || '';
        if (!type || !t || !s) {
          toast('Missing fields', 'Template Type, Title, and Subject are required.');
          return;
        }
        TEMPLATES.unshift({
          title: t,
          type: type,
          subject: s,
          body: (body && body.innerHTML) || ''
        });
        toast('Saved', 'Email template "' + t + '" saved.');
        resetForm();
        showTab('view');
      });
    }

    var resetBtn = document.getElementById('metReset');
    if (resetBtn) resetBtn.addEventListener('click', resetForm);

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.mce-combo')) closeCombos();
      if (!e.target.closest('.mce-editor__fmt-wrap, .mce-editor__more-wrap')) closeMenus();

      var edit = e.target.closest('[data-met-edit]');
      if (edit) {
        var idx = +edit.getAttribute('data-met-edit');
        var row = TEMPLATES[idx];
        if (!row) return;
        showTab('add');
        var typeEl = document.getElementById('metType');
        var titleEl = document.getElementById('metTitle');
        var subjectEl = document.getElementById('metSubject');
        if (typeEl) typeEl.value = row.type;
        if (titleEl) titleEl.value = row.title;
        if (subjectEl) subjectEl.value = row.subject;
        if (body) body.innerHTML = row.body || '';
        var typeLabel = document.getElementById('metVarType');
        if (typeLabel) typeLabel.textContent = row.type;
        if (wordsEl && body) wordsEl.textContent = wordCount(body) + ' words';
        TEMPLATES.splice(idx, 1);
        return;
      }
      var del = e.target.closest('[data-met-del]');
      if (del) {
        var di = +del.getAttribute('data-met-del');
        DELETED.unshift(TEMPLATES.splice(di, 1)[0]);
        toast('Deleted', 'Template moved to Deleted.');
        renderView();
        return;
      }
      var restore = e.target.closest('[data-met-restore]');
      if (restore) {
        var ri = +restore.getAttribute('data-met-restore');
        TEMPLATES.unshift(DELETED.splice(ri, 1)[0]);
        toast('Restored', 'Template restored.');
        renderDeleted();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
