(function () {
  'use strict';

  var LISTS = {
    smtp: ['sales.cacloud@gmail.com', 'cakamal9758@gmail.com', 'noreply@timeerp.com'],
    template: ['audit', 'GST-3B', 'ITR', 'ITR Filling', 'Generic'],
    footer: ['Standard Footer', 'CA CloudDesk Signature', 'Compliance Notice'],
    client: {
      head: 'Internal',
      items: [
        'SAURABH BHARDWAJ', 'SAURABH BHARDWAJ HUF', 'THE GOLD REALTY',
        'Law seva management private limited', 'PERFECT PAIR',
        'TATA MOTORS PASSENGER VEHICLES LIMITED', 'Saksham'
      ]
    },
    group: ['GST Clients', 'Audit Group', 'ITR Group', 'Corporate Clients']
  };

  var insertTarget = 'content';
  var insertTargetEl = document.getElementById('mceInsertTarget');
  var activeEditor = document.getElementById('mceContentArea');

  var clock = document.getElementById('crmTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  function toast(title, msg) {
    if (window.DashboardShell) DashboardShell.toast(title, msg);
  }

  function closeCombos(except) {
    document.querySelectorAll('.mce-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }

  function closeMenus() {
    document.querySelectorAll('.mce-editor__fmt-menu, .mce-editor__more-menu').forEach(function (m) { m.hidden = true; });
    document.querySelectorAll('.mce-editor__fmt, .mce-editor__more').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
  }

  function closePops() {
    var pop = document.getElementById('mceSettingsPop');
    var btn = document.getElementById('mceSettings');
    if (pop) pop.hidden = true;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  document.querySelectorAll('.mce-combo').forEach(function (combo) {
    var key = combo.getAttribute('data-list');
    var input = combo.querySelector('input');
    var menu = combo.querySelector('.mce-combo__menu');
    var data = LISTS[key];

    function render(q) {
      var qq = (q || '').toLowerCase();
      var html = '';
      if (data && data.head) {
        var items = data.items.filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; });
        if (items.length) {
          html += '<div class="mce-combo__head">' + data.head + '</div>';
          html += items.map(function (n) { return '<div class="mce-combo__item">' + n + '</div>'; }).join('');
        }
      } else {
        var list = data || [];
        html = list.filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; })
          .map(function (n) { return '<div class="mce-combo__item">' + n + '</div>'; }).join('');
      }
      menu.innerHTML = html || '<div class="mce-combo__item">No matches</div>';
    }

    function open() { render(input.value); closeCombos(combo); combo.classList.add('is-open'); }
    input.addEventListener('focus', open);
    input.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    input.addEventListener('input', function () { render(input.value); combo.classList.add('is-open'); });
    menu.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.mce-combo__item');
      if (!item || item.textContent === 'No matches') return;
      e.preventDefault();
      input.value = item.textContent;
      combo.classList.remove('is-open');
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mce-combo')) closeCombos();
    if (!e.target.closest('.mce-editor__fmt-wrap, .mce-editor__more-wrap')) closeMenus();
    if (!e.target.closest('.mce-pop, #mceSettings')) closePops();
  });

  var settingsBtn = document.getElementById('mceSettings');
  var settingsPop = document.getElementById('mceSettingsPop');
  if (settingsBtn && settingsPop) {
    settingsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = settingsPop.hidden;
      closePops();
      if (open) { settingsPop.hidden = false; settingsBtn.setAttribute('aria-expanded', 'true'); }
    });
    settingsPop.addEventListener('click', function (e) {
      var item = e.target.closest('[data-mce-action]');
      if (!item) return;
      var action = item.getAttribute('data-mce-action');
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
      toast('Settings', 'Opening soon.');
      closePops();
    });
  }

  function wordCount(el) {
    var text = (el.textContent || '').trim();
    return text ? text.split(/\s+/).length : 0;
  }

  function updateWords(area, labelEl) {
    if (labelEl) labelEl.textContent = wordCount(area) + ' words';
  }

  document.querySelectorAll('.mce-editor__area').forEach(function (area) {
    var editor = area.closest('.mce-editor');
    var wordsEl = editor.querySelector('.mce-editor__words');
    area.addEventListener('input', function () { updateWords(area, wordsEl); });
    area.addEventListener('focus', function () {
      activeEditor = area;
      insertTarget = editor.getAttribute('data-field') === 'footer' ? 'Footer Content' : 'Content';
      if (insertTargetEl) insertTargetEl.textContent = insertTarget;
    });
  });

  document.getElementById('mceSubject').addEventListener('focus', function () {
    insertTarget = 'Subject';
    if (insertTargetEl) insertTargetEl.textContent = insertTarget;
    activeEditor = null;
  });

  function bindEditorToolbar(editorEl) {
    var area = editorEl.querySelector('.mce-editor__area');
    var fmtBtn = editorEl.querySelector('.mce-editor__fmt');
    var fmtMenu = editorEl.querySelector('.mce-editor__fmt-menu');
    var moreBtn = editorEl.querySelector('.mce-editor__more');
    var moreMenu = editorEl.querySelector('.mce-editor__more-menu');
    var wordsEl = editorEl.querySelector('.mce-editor__words');

    editorEl.querySelectorAll('.mce-editor__tb[data-cmd]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        area.focus();
        var cmd = btn.getAttribute('data-cmd');
        if (cmd === 'undo') document.execCommand('undo');
        else if (cmd === 'redo') document.execCommand('redo');
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
      fmtMenu.querySelectorAll('button[data-fmt]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          area.focus();
          var tag = btn.getAttribute('data-fmt');
          document.execCommand('formatBlock', false, tag === 'p' ? 'p' : tag);
          fmtMenu.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
          fmtBtn.childNodes[0].textContent = btn.textContent + ' ';
          fmtMenu.hidden = true;
          fmtBtn.setAttribute('aria-expanded', 'false');
          editorEl.querySelector('.mce-editor__tag').textContent = tag;
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
      moreMenu.querySelectorAll('button[data-cmd]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          area.focus();
          var cmd = btn.getAttribute('data-cmd');
          if (cmd === 'table') toast('Table', 'Table insertion coming soon.');
          else if (cmd === 'emoji') document.execCommand('insertText', false, '😊');
          else if (cmd === 'hilite') document.execCommand('hiliteColor', false, '#ffff00');
          else if (cmd === 'code') toast('Source', 'HTML source view coming soon.');
          else document.execCommand(cmd, false, null);
          updateWords(area, wordsEl);
        });
      });
    }
  }

  document.querySelectorAll('.mce-editor').forEach(bindEditorToolbar);

  document.querySelectorAll('.mce-var-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.getAttribute('data-var');
      if (insertTarget === 'Subject') {
        var sub = document.getElementById('mceSubject');
        sub.value = (sub.value || '') + key;
        sub.focus();
      } else if (activeEditor) {
        activeEditor.focus();
        document.execCommand('insertText', false, key);
        var wordsEl = activeEditor.closest('.mce-editor').querySelector('.mce-editor__words');
        updateWords(activeEditor, wordsEl);
      } else toast('Insert', 'Focus Subject, Content, or Footer Content first.');
    });
  });

  document.querySelectorAll('input[name="sendTo"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var row = document.getElementById('mceClientRow');
      var label = row.querySelector('.mce-label');
      if (radio.value === 'group') {
        label.innerHTML = 'Client Group<span class="mce-req">*</span>';
        row.querySelector('.mce-quick-link').hidden = true;
        row.querySelector('.mce-combo').setAttribute('data-list', 'group');
      } else {
        label.innerHTML = 'Client<span class="mce-req">*</span>';
        row.querySelector('.mce-quick-link').hidden = false;
        row.querySelector('.mce-combo').setAttribute('data-list', 'client');
      }
    });
  });

  var attachBtn = document.getElementById('mceAttachBtn');
  var attachInput = document.getElementById('mceAttachInput');
  if (attachBtn && attachInput) {
    attachBtn.addEventListener('click', function () { attachInput.click(); });
    attachInput.addEventListener('change', function () {
      if (this.files.length) toast('Attachment', this.files[0].name + ' added.');
    });
  }

  document.getElementById('mceSend').addEventListener('click', function () {
    toast('Send Email', 'Email queued for delivery.');
  });
  document.getElementById('mceSchedule').addEventListener('click', function () {
    toast('Schedule and Send', 'Schedule dialog opens here.');
  });
  document.getElementById('mceReset').addEventListener('click', function () {
    document.getElementById('mceForm').reset();
    document.querySelectorAll('.mce-editor__area').forEach(function (a) { a.innerHTML = ''; });
    document.querySelectorAll('.mce-editor__words').forEach(function (w) { w.textContent = '0 words'; });
    toast('Reset', 'Form cleared.');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closePops(); closeMenus(); closeCombos(); }
  });
})();
