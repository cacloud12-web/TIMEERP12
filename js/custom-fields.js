(function () {
  'use strict';

  var FIELD_TYPES = ['Dropdown', 'DOB', 'Text', 'Checkbox', 'Mobile', 'Email'];

  function toast(title, msg) {
    var stack = document.getElementById('scfToastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'scfToastStack';
      stack.className = 'scf-toast-stack';
      document.body.appendChild(stack);
    }
    var el = document.createElement('div');
    el.className = 'scf-toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + (msg || '') + '</span>';
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 2800);
  }

  function initTabs() {
    var tabs = document.querySelectorAll('.scf-tab');
    var panes = document.querySelectorAll('.scf-pane');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-scf-tab');
        tabs.forEach(function (t) {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        });
        panes.forEach(function (pane) {
          var on = pane.getAttribute('data-scf-pane') === id;
          pane.classList.toggle('is-active', on);
          pane.hidden = !on;
        });
      });
    });
  }

  function switchToAdd() {
    var tab = document.querySelector('.scf-tab[data-scf-tab="add"]');
    if (tab) tab.click();
  }

  function initView() {
    var search = document.getElementById('scfSearch');
    var body = document.getElementById('scfTableBody');
    var exportBtn = document.getElementById('scfExport');

    if (search && body) {
      search.addEventListener('input', function () {
        var q = search.value.trim().toLowerCase();
        Array.prototype.forEach.call(body.querySelectorAll('tr'), function (row) {
          var text = row.textContent.toLowerCase();
          row.hidden = !!(q && text.indexOf(q) === -1);
        });
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        toast('Export', 'Custom fields exported.');
      });
    }

    document.querySelectorAll('[data-scf-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchToAdd();
        toast('Edit', 'Opened field editor.');
      });
    });

    document.querySelectorAll('[data-scf-del]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var row = btn.closest('tr');
        if (row) row.remove();
        renumberRows();
        toast('Deleted', 'Custom field removed.');
      });
    });
  }

  function renumberRows() {
    var body = document.getElementById('scfTableBody');
    if (!body) return;
    Array.prototype.forEach.call(body.querySelectorAll('tr'), function (row, i) {
      var cell = row.querySelector('td');
      if (cell) cell.textContent = String(i + 1);
    });
  }

  function initAdd() {
    var dropdown = document.getElementById('scfTypeDropdown');
    var input = document.getElementById('scfTypeInput');
    var fieldsWrap = document.getElementById('scfFields');
    var addBtn = document.getElementById('scfAddFieldBtn');
    if (!dropdown || !input || !fieldsWrap || !addBtn) return;

    var items = Array.prototype.slice.call(dropdown.querySelectorAll('.cf-type__item'));

    function showAllTypeItems() {
      items.forEach(function (item) { item.style.display = ''; });
    }
    function closeType() { dropdown.classList.remove('is-open'); }
    function openType() {
      showAllTypeItems();
      dropdown.classList.add('is-open');
    }
    function currentGroup() { return (input.value || 'Customer').trim(); }
    function syncAddVisibility() {
      addBtn.classList.toggle('is-hidden', fieldsWrap.children.length > 0);
    }

    input.addEventListener('focus', openType);
    input.addEventListener('click', function (e) {
      e.stopPropagation();
      openType();
    });
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var exact = items.some(function (item) { return item.textContent.toLowerCase() === q; });
      items.forEach(function (item) {
        item.style.display = !q || exact || item.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
      });
      dropdown.classList.add('is-open');
    });
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) closeType();
    });

    function bindKindDropdown(kind) {
      var kindInput = kind.querySelector('.cf-kind__input');
      var kindItems = Array.prototype.slice.call(kind.querySelectorAll('.cf-kind__item'));
      function closeKind() { kind.classList.remove('is-open'); }
      function openKind() { kind.classList.add('is-open'); }
      kindInput.addEventListener('focus', openKind);
      kindInput.addEventListener('click', function (e) {
        e.stopPropagation();
        openKind();
      });
      kindItems.forEach(function (item) {
        item.addEventListener('mousedown', function (e) {
          e.preventDefault();
          kindInput.value = item.textContent.toLowerCase() === 'text' ? 'text' : item.textContent;
          kindItems.forEach(function (el) { el.classList.remove('is-active'); });
          item.classList.add('is-active');
          closeKind();
        });
      });
      document.addEventListener('click', function (e) {
        if (!kind.contains(e.target)) closeKind();
      });
    }

    function fieldRow(opts) {
      opts = opts || {};
      var label = opts.label || 'Label Field';
      var required = !!opts.required;
      var showUnique = opts.unique !== false && currentGroup() !== 'Task';
      var wrap = document.createElement('div');
      wrap.className = 'cf-field-wrap';
      wrap.innerHTML =
        '<div class="cf-field">' +
          '<div class="cf-field__label-row">' +
            '<input class="cf-field__label" type="text" value="' + label.replace(/"/g, '&quot;') + '" aria-label="Field label">' +
            '<span class="cf-field__edit" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15.2 5.3l3.5 3.5"/><path d="M4 20l4.1-.9L18.9 8.3a1.8 1.8 0 00-2.5-2.5L5.6 16.6 4 20z"/></svg></span>' +
          '</div>' +
          '<div class="cf-field__row">' +
            '<div class="cf-kind">' +
              '<input class="cf-kind__input" type="text" value="text" autocomplete="off" aria-label="Field type">' +
              '<div class="cf-kind__menu" role="listbox">' +
                FIELD_TYPES.map(function (t) {
                  return '<div class="cf-kind__item' + (t === 'Text' ? ' is-active' : '') + '" role="option">' + t + '</div>';
                }).join('') +
              '</div>' +
            '</div>' +
            '<button class="cf-meta" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 10.5v6M12 7.5h.01"/></svg> Add Details</button>' +
            '<button class="cf-meta" type="button" data-duplicate><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 012-2h10"/></svg> Duplicate</button>' +
            '<label class="cf-toggle">Required <span class="cf-switch"><input type="checkbox"' + (required ? ' checked' : '') + '><span></span></span></label>' +
            (showUnique ? '<label class="cf-toggle">Unique <span class="cf-switch"><input type="checkbox"><span></span></span></label>' : '') +
            '<button class="cf-field__delete" type="button" aria-label="Delete field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/><path d="M6.5 7l.8 12.2A1.5 1.5 0 008.8 20.5h6.4a1.5 1.5 0 001.5-1.3L17.5 7"/><path d="M10 11v6M14 11v6"/></svg></button>' +
          '</div>' +
        '</div>' +
        '<button class="cf-plus" type="button" aria-label="Add field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>';

      bindKindDropdown(wrap.querySelector('.cf-kind'));
      wrap.querySelector('.cf-field__edit').addEventListener('click', function () {
        wrap.querySelector('.cf-field__label').focus();
      });
      wrap.querySelector('.cf-field__delete').addEventListener('click', function () {
        wrap.remove();
        syncAddVisibility();
      });
      return wrap;
    }

    function addField(opts) {
      fieldsWrap.appendChild(fieldRow(opts));
      syncAddVisibility();
    }

    function loadGroup(name) {
      input.value = name;
      items.forEach(function (el) { el.classList.toggle('is-active', el.textContent === name); });
      fieldsWrap.innerHTML = '';
      if (name === 'Task') addField({ label: 'ACK NO', required: false, unique: false });
      else if (name === 'Custom Fields') addField({ label: 'Label Field', required: false, unique: false });
      else syncAddVisibility();
    }

    items.forEach(function (item) {
      item.addEventListener('mousedown', function (e) {
        e.preventDefault();
        loadGroup(item.textContent);
        closeType();
      });
    });

    fieldsWrap.addEventListener('click', function (e) {
      if (e.target.closest('.cf-plus') || e.target.closest('[data-duplicate]')) {
        e.preventDefault();
        addField();
      }
    });

    addBtn.addEventListener('click', function () { addField(); });

    document.getElementById('scfResetBtn').addEventListener('click', function () {
      loadGroup(currentGroup() || 'Customer');
      closeType();
    });

    document.getElementById('scfSaveBtn').addEventListener('click', function () {
      toast('Saved', 'Custom fields updated.');
    });

    syncAddVisibility();
  }

  function boot() {
    initTabs();
    initView();
    initAdd();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
