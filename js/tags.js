(function () {
  'use strict';

  var PAGE_SIZE = 10;
  var currentPage = 1;
  var editingId = null;

  var TAGS = [
    { id: 1, name: '#nnn', bg: '#f1f5f9', text: '#334155' },
    { id: 2, name: '#INVOICE', bg: '#f1f5f9', text: '#334155' },
    { id: 3, name: '#fssai', bg: '#f1f5f9', text: '#334155' },
    { id: 4, name: '#gst', bg: '#f1f5f9', text: '#334155' },
    { id: 5, name: '#UDIN', bg: '#f1f5f9', text: '#334155' },
    { id: 6, name: '#1234', bg: '#f1f5f9', text: '#334155' },
    { id: 7, name: '#ds', bg: '#f1f5f9', text: '#334155' },
    { id: 8, name: '#ads', bg: '#f1f5f9', text: '#334155' },
    { id: 9, name: '#FINANCE', bg: '#312e81', text: '#ffffff' },
    { id: 10, name: '#audit', bg: '#f1f5f9', text: '#334155' },
    { id: 11, name: '#tax', bg: '#f1f5f9', text: '#334155' },
    { id: 12, name: '#payroll', bg: '#f1f5f9', text: '#334155' },
    { id: 13, name: '#hrms', bg: '#f1f5f9', text: '#334155' },
    { id: 14, name: '#client', bg: '#f1f5f9', text: '#334155' },
    { id: 15, name: '#urgent', bg: '#fee2e2', text: '#b91c1c' },
    { id: 16, name: '#review', bg: '#fef3c7', text: '#92400e' },
    { id: 17, name: '#done', bg: '#dcfce7', text: '#15803d' },
    { id: 18, name: '#pending', bg: '#e0f2fe', text: '#0369a1' }
  ];

  function toast(title, msg) {
    var stack = document.getElementById('tagToastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'tagToastStack';
      stack.className = 'tag-toast-stack';
      document.body.appendChild(stack);
    }
    var el = document.createElement('div');
    el.className = 'tag-toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + (msg || '') + '</span>';
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 2800);
  }

  function filteredTags() {
    var q = ((document.getElementById('tagSearch') || {}).value || '').trim().toLowerCase();
    if (!q) return TAGS.slice();
    return TAGS.filter(function (t) { return t.name.toLowerCase().indexOf(q) !== -1; });
  }

  function totalPages(list) {
    return Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  }

  function renderTable() {
    var body = document.getElementById('tagTableBody');
    var list = filteredTags();
    var pages = totalPages(list);
    if (currentPage > pages) currentPage = pages;

    var start = (currentPage - 1) * PAGE_SIZE;
    var pageItems = list.slice(start, start + PAGE_SIZE);

    if (body) {
      body.innerHTML = pageItems.map(function (tag) {
        return '<tr data-tag-id="' + tag.id + '">' +
          '<td><span class="tag-pill" style="background:' + tag.bg + ';color:' + tag.text + ';border-color:' + tag.bg + '">' + tag.name + '</span></td>' +
          '<td class="tag-row-actions">' +
            '<button type="button" class="tag-icon-btn tag-icon-btn--edit" data-tag-edit aria-label="Edit ' + tag.name + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></button>' +
            '<button type="button" class="tag-icon-btn tag-icon-btn--del" data-tag-del aria-label="Delete ' + tag.name + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 7h16"/><path d="M10 7V5a1 1 0 011-1h2a1 1 0 011 1v2"/><path d="M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13"/><path d="M10 11v7M14 11v7"/></svg></button>' +
          '</td>' +
        '</tr>';
      }).join('');

      body.querySelectorAll('[data-tag-edit]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var row = btn.closest('tr');
          var id = row ? Number(row.getAttribute('data-tag-id')) : null;
          var tag = TAGS.find(function (t) { return t.id === id; });
          if (tag) openModal(tag);
        });
      });

      body.querySelectorAll('[data-tag-del]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var row = btn.closest('tr');
          var id = row ? Number(row.getAttribute('data-tag-id')) : null;
          TAGS = TAGS.filter(function (t) { return t.id !== id; });
          renderTable();
          toast('Deleted', 'Tag removed.');
        });
      });
    }

    var pageNum = document.getElementById('tagPageNum');
    var pageTotal = document.getElementById('tagPageTotal');
    var count = document.getElementById('tagCount');
    var prev = document.getElementById('tagPrev');
    var next = document.getElementById('tagNext');

    if (pageNum) pageNum.textContent = String(currentPage);
    if (pageTotal) pageTotal.textContent = String(pages);
    if (count) count.textContent = pageItems.length + ' / ' + list.length;
    if (prev) prev.disabled = currentPage <= 1;
    if (next) next.disabled = currentPage >= pages;
  }

  function openModal(tag) {
    var modal = document.getElementById('tagModal');
    var title = document.getElementById('tagModalTitle');
    var submit = document.getElementById('tagSubmitBtn');
    var name = document.getElementById('tagName');
    var bg = document.getElementById('tagBgColor');
    var text = document.getElementById('tagTextColor');
    if (!modal) return;

    editingId = tag ? tag.id : null;
    if (title) title.textContent = tag ? 'Edit Tag' : 'Add New Tag';
    if (submit) submit.textContent = tag ? 'Save' : 'Add';
    if (name) name.value = tag ? tag.name.replace(/^#/, '') : '';
    if (bg) bg.value = tag ? tag.bg : '#9ca3af';
    if (text) text.value = tag ? tag.text : '#ffffff';

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    if (name) name.focus();
  }

  function closeModal() {
    var modal = document.getElementById('tagModal');
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    editingId = null;
  }

  function initModal() {
    document.getElementById('tagAddBtn').addEventListener('click', function () { openModal(null); });
    document.querySelectorAll('[data-tag-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    document.getElementById('tagForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var nameInput = document.getElementById('tagName');
      var bg = document.getElementById('tagBgColor').value;
      var text = document.getElementById('tagTextColor').value;
      var raw = (nameInput.value || '').trim();
      if (!raw) {
        toast('Validation', "'Tag Name' is required!");
        return;
      }
      var name = raw.charAt(0) === '#' ? raw : '#' + raw;

      if (editingId) {
        TAGS = TAGS.map(function (t) {
          if (t.id !== editingId) return t;
          return { id: t.id, name: name, bg: bg, text: text };
        });
        toast('Saved', 'Tag updated.');
      } else {
        var nextId = TAGS.reduce(function (m, t) { return Math.max(m, t.id); }, 0) + 1;
        TAGS.unshift({ id: nextId, name: name, bg: bg, text: text });
        currentPage = 1;
        toast('Added', 'New tag created.');
      }
      closeModal();
      renderTable();
    });
  }

  function initPager() {
    document.getElementById('tagPrev').addEventListener('click', function () {
      if (currentPage > 1) { currentPage -= 1; renderTable(); }
    });
    document.getElementById('tagNext').addEventListener('click', function () {
      var pages = totalPages(filteredTags());
      if (currentPage < pages) { currentPage += 1; renderTable(); }
    });
  }

  function initSearch() {
    document.getElementById('tagSearch').addEventListener('input', function () {
      currentPage = 1;
      renderTable();
    });
  }

  function boot() {
    initModal();
    initPager();
    initSearch();
    renderTable();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
