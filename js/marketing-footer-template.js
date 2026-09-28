/**
 * Marketing — Footer Template (Add / View / Deleted)
 */
(function () {
  'use strict';

  var TYPES = ['Generic', 'Invoice', 'Receipt', 'Appointment', 'Welcome'];
  var FOOTERS = [
    { title: 'Standard Footer', type: 'Generic', logo: '', body: '<p>{CA_ORG_NAME} · Regards, {SENDER_NAME}</p>' }
  ];
  var DELETED = [];
  var logoFileName = '';
  var activeField = 'body';

  function toast(title, msg) {
    if (window.DashboardShell && DashboardShell.toast) DashboardShell.toast(title, msg);
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function wordCount(el) {
    var text = (el.textContent || '').trim();
    return text ? text.split(/\s+/).length : 0;
  }

  function showTab(name) {
    document.querySelectorAll('[data-mft-tab]').forEach(function (btn) {
      var on = btn.getAttribute('data-mft-tab') === name;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('[data-mft-panel]').forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-mft-panel') !== name;
    });
    if (name === 'view') renderView();
    if (name === 'deleted') renderDeleted();
  }

  function renderView() {
    var empty = document.getElementById('mftViewEmpty');
    var wrap = document.getElementById('mftViewTable');
    var body = document.getElementById('mftViewBody');
    if (!FOOTERS.length) {
      if (empty) empty.hidden = false;
      if (wrap) wrap.hidden = true;
      return;
    }
    if (empty) empty.hidden = true;
    if (wrap) wrap.hidden = false;
    if (!body) return;
    body.innerHTML = FOOTERS.map(function (t, i) {
      return '<tr><td>' + esc(t.title) + '</td><td>' + esc(t.type) + '</td><td>' + esc(t.logo || '—') +
        '</td><td><button type="button" class="met-link" data-mft-edit="' + i + '">Edit</button>' +
        '<button type="button" class="met-link met-link--danger" data-mft-del="' + i + '">Delete</button></td></tr>';
    }).join('');
  }

  function renderDeleted() {
    var panel = document.querySelector('[data-mft-panel="deleted"]');
    if (!panel) return;
    if (!DELETED.length) {
      panel.innerHTML = '<div class="met-empty">No deleted footer templates.</div>';
      return;
    }
    panel.innerHTML = '<div class="met-table-wrap"><table class="met-table"><thead><tr><th>Title</th><th>Type</th><th>Logo</th><th>Actions</th></tr></thead><tbody>' +
      DELETED.map(function (t, i) {
        return '<tr><td>' + esc(t.title) + '</td><td>' + esc(t.type) + '</td><td>' + esc(t.logo || '—') +
          '</td><td><button type="button" class="met-link" data-mft-restore="' + i + '">Restore</button></td></tr>';
      }).join('') +
      '</tbody></table></div>';
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
    function open() { closeCombos(); root.classList.add('is-open'); }
    input.addEventListener('focus', open);
    input.addEventListener('click', open);
    menu.addEventListener('click', function (e) {
      var item = e.target.closest('.mce-combo__item');
      if (!item) return;
      input.value = item.getAttribute('data-val') || '';
      var typeLabel = document.getElementById('mftVarType');
      if (typeLabel) typeLabel.textContent = input.value || 'Generic';
      closeCombos();
    });
  }

  function insertAtCursor(text) {
    if (activeField === 'title') {
      var title = document.getElementById('mftTitle');
      if (!title) return;
      var start = title.selectionStart || title.value.length;
      var end = title.selectionEnd || start;
      title.value = title.value.slice(0, start) + text + title.value.slice(end);
      title.focus();
      title.setSelectionRange(start + text.length, start + text.length);
      return;
    }
    var area = document.getElementById('mftBody');
    if (!area) return;
    area.focus();
    document.execCommand('insertText', false, text);
  }

  function resetForm() {
    var form = document.getElementById('mftForm');
    if (form) form.reset();
    var type = document.getElementById('mftType');
    if (type) type.value = 'Generic';
    var typeLabel = document.getElementById('mftVarType');
    if (typeLabel) typeLabel.textContent = 'Generic';
    var body = document.getElementById('mftBody');
    if (body) body.innerHTML = '';
    var words = document.getElementById('mftWords');
    if (words) words.textContent = '0 words';
    logoFileName = '';
    var logoName = document.getElementById('mftLogoName');
    if (logoName) logoName.textContent = '';
    var logoInput = document.getElementById('mftLogoInput');
    if (logoInput) logoInput.value = '';
  }

  function bind() {
    document.querySelectorAll('[data-mft-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showTab(btn.getAttribute('data-mft-tab'));
      });
    });

    var addBtn = document.getElementById('mftAddBtn');
    if (addBtn) addBtn.addEventListener('click', function () { showTab('add'); resetForm(); });

    document.querySelectorAll('.mce-combo').forEach(setupCombo);

    var title = document.getElementById('mftTitle');
    var body = document.getElementById('mftBody');
    var targetEl = document.getElementById('mftInsertTarget');
    var wordsEl = document.getElementById('mftWords');

    if (title) {
      title.addEventListener('focus', function () {
        activeField = 'title';
        if (targetEl) targetEl.textContent = 'Title';
      });
    }
    if (body) {
      body.addEventListener('focus', function () {
        activeField = 'body';
        if (targetEl) targetEl.textContent = 'Footer Template';
      });
      body.addEventListener('input', function () {
        if (wordsEl) wordsEl.textContent = wordCount(body) + ' words';
      });
    }

    var logoBtn = document.getElementById('mftLogoBtn');
    var logoInput = document.getElementById('mftLogoInput');
    var logoName = document.getElementById('mftLogoName');
    if (logoBtn && logoInput) {
      logoBtn.addEventListener('click', function () { logoInput.click(); });
      logoInput.addEventListener('change', function () {
        var file = logoInput.files && logoInput.files[0];
        logoFileName = file ? file.name : '';
        if (logoName) logoName.textContent = logoFileName || '';
      });
    }

    document.querySelectorAll('.mce-var-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        insertAtCursor(btn.getAttribute('data-var') || '');
      });
    });

    var editor = document.getElementById('mftEditor');
    if (editor) {
      var fmtBtn = document.getElementById('mftFmt');
      var fmtMenu = document.getElementById('mftFmtMenu');
      var moreBtn = document.getElementById('mftMore');
      var moreMenu = document.getElementById('mftMoreMenu');

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

    var form = document.getElementById('mftForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var type = (document.getElementById('mftType') || {}).value || '';
        var t = (document.getElementById('mftTitle') || {}).value || '';
        if (!type || !t) {
          toast('Missing fields', 'Footer Type and Title are required.');
          return;
        }
        FOOTERS.unshift({
          title: t,
          type: type,
          logo: logoFileName,
          body: (body && body.innerHTML) || ''
        });
        toast('Saved', 'Footer template "' + t + '" saved.');
        resetForm();
        showTab('view');
      });
    }

    var resetBtn = document.getElementById('mftReset');
    if (resetBtn) resetBtn.addEventListener('click', resetForm);

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.mce-combo')) closeCombos();
      if (!e.target.closest('.mce-editor__fmt-wrap, .mce-editor__more-wrap')) closeMenus();

      var edit = e.target.closest('[data-mft-edit]');
      if (edit) {
        var idx = +edit.getAttribute('data-mft-edit');
        var row = FOOTERS[idx];
        if (!row) return;
        showTab('add');
        var typeEl = document.getElementById('mftType');
        var titleEl = document.getElementById('mftTitle');
        if (typeEl) typeEl.value = row.type;
        if (titleEl) titleEl.value = row.title;
        if (body) body.innerHTML = row.body || '';
        logoFileName = row.logo || '';
        if (logoName) logoName.textContent = logoFileName;
        var typeLabel = document.getElementById('mftVarType');
        if (typeLabel) typeLabel.textContent = row.type;
        if (wordsEl && body) wordsEl.textContent = wordCount(body) + ' words';
        FOOTERS.splice(idx, 1);
        return;
      }
      var del = e.target.closest('[data-mft-del]');
      if (del) {
        var di = +del.getAttribute('data-mft-del');
        DELETED.unshift(FOOTERS.splice(di, 1)[0]);
        toast('Deleted', 'Footer moved to Deleted.');
        renderView();
        return;
      }
      var restore = e.target.closest('[data-mft-restore]');
      if (restore) {
        var ri = +restore.getAttribute('data-mft-restore');
        FOOTERS.unshift(DELETED.splice(ri, 1)[0]);
        toast('Restored', 'Footer restored.');
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
