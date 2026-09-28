(function () {
  'use strict';

  function toast(title, detail) {
    if (window.DashboardShell && typeof window.DashboardShell.toast === 'function') {
      window.DashboardShell.toast(title, detail);
      return;
    }
    var stack = document.getElementById('toastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'toastStack';
      stack.className = 'toast-stack';
      document.body.appendChild(stack);
    }
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + (detail || '') + '</span>';
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 3500);
  }

  function initTabs() {
    var tabs = document.querySelectorAll('.org-subtab');
    var panes = document.querySelectorAll('.org-pane');

    function activate(id) {
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-org-tab') === id;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panes.forEach(function (pane) {
        var on = pane.getAttribute('data-org-pane') === id;
        pane.classList.toggle('is-active', on);
        pane.hidden = !on;
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activate(tab.getAttribute('data-org-tab'));
      });
    });

    var hash = (window.location.hash || '').replace(/^#/, '');
    if (hash === 'branch' || hash === 'credits' || hash === 'document' || hash === 'data' || hash === 'portal') {
      activate(hash === 'data' ? 'data' : hash);
    }
  }

  function initOrgData() {
    var edit = document.getElementById('orgLogoEdit');
    var input = document.getElementById('orgLogoInput');
    var img = document.querySelector('.org-logo img');

    if (edit && input) {
      edit.addEventListener('click', function () { input.click(); });
      input.addEventListener('change', function () {
        var file = input.files && input.files[0];
        if (!file || !img) return;
        img.src = URL.createObjectURL(file);
        toast('Logo updated', file.name);
      });
    }

    var plan = document.getElementById('orgPlanLink');
    if (plan) plan.addEventListener('click', function () { toast('Subscription', 'GOLD+ (30GB) plan details.'); });
    var req = document.getElementById('orgRequestUpdate');
    if (req) req.addEventListener('click', function () { toast('Request update', 'Plan size update request sent.'); });
    var ip = document.getElementById('orgSetIp');
    if (ip) ip.addEventListener('click', function () { toast('Set IP', 'Allowed IP configuration opens here.'); });
  }

  function initBranch() {
    var add = document.getElementById('orgBranchAdd');
    if (add) {
      add.addEventListener('click', function () {
        window.location.href = 'add_branch.html';
      });
    }

    var colsBtn = document.getElementById('orgBranchCols');
    var colsMenu = document.getElementById('orgColsMenu');
    var colsList = document.getElementById('orgColsList');
    var selectAll = document.getElementById('orgColsSelectAll');
    var table = document.getElementById('orgBranchTable');

    function applyColumns() {
      if (!colsList || !table) return;
      colsList.querySelectorAll('input[data-col]').forEach(function (input) {
        var key = input.getAttribute('data-col');
        var show = !!input.checked;
        table.querySelectorAll('[data-col="' + key + '"]').forEach(function (cell) {
          cell.hidden = !show;
        });
      });
      updateSelectAllLabel();
    }

    function updateSelectAllLabel() {
      if (!selectAll || !colsList) return;
      var inputs = colsList.querySelectorAll('input[data-col]');
      var checked = colsList.querySelectorAll('input[data-col]:checked').length;
      selectAll.textContent = checked === inputs.length ? 'Deselect All' : 'Select All';
    }

    function closeColsMenu() {
      if (!colsMenu || !colsBtn) return;
      colsMenu.hidden = true;
      colsBtn.setAttribute('aria-expanded', 'false');
    }

    if (colsBtn && colsMenu) {
      colsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = colsMenu.hidden;
        colsMenu.hidden = !open;
        colsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      colsMenu.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', closeColsMenu);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeColsMenu();
      });
    }

    if (colsList) {
      colsList.querySelectorAll('input[data-col]').forEach(function (input) {
        input.addEventListener('change', applyColumns);
      });
    }

    if (selectAll && colsList) {
      selectAll.addEventListener('click', function () {
        var inputs = colsList.querySelectorAll('input[data-col]');
        var allOn = colsList.querySelectorAll('input[data-col]:checked').length === inputs.length;
        inputs.forEach(function (input) { input.checked = !allOn; });
        applyColumns();
      });
    }

    applyColumns();

    var BRANCH_STATES = [
      'Abu Dhabi', 'Ajman', 'Alberta',
      'ANDAMAN AND NICOBAR ISLANDS', 'ANDHRA PRADESH', 'ARUNACHAL PRADESH', 'ASSAM',
      'BIHAR', 'British Columbia',
      'CHANDIGARH', 'CHHATTISGARH',
      'DADRA AND NAGAR HAVELI AND DAMAN AND DIU', 'DELHI', 'Dubai',
      'Fujairah',
      'GOA', 'GUJARAT',
      'HARYANA', 'HIMACHAL PRADESH',
      'JAMMU AND KASHMIR', 'JHARKHAND',
      'KARNATAKA', 'KERALA',
      'LAKSHADWEEP',
      'LADAKH',
      'MADHYA PRADESH', 'MAHARASHTRA', 'MANIPUR', 'MEGHALAYA', 'MIZORAM',
      'NAGALAND',
      'ODISHA',
      'PUDUCHERRY', 'PUNJAB',
      'RAJASTHAN', 'Ras Al Khaimah',
      'SIKKIM', 'Sharjah',
      'TAMIL NADU', 'TELANGANA', 'TRIPURA',
      'Umm Al-Quwain (UAQ)', 'UTTARAKHAND', 'UTTAR PRADESH',
      'WEST BENGAL'
    ].sort(function (a, b) {
      return a.localeCompare(b, undefined, { sensitivity: 'base' });
    });

    var stateInput = document.getElementById('orgBranchState');
    var stateList = document.getElementById('orgStateList');
    var stateFilter = document.getElementById('orgStateFilter');

    function closeStateList() {
      if (!stateList || !stateInput) return;
      stateList.hidden = true;
      stateInput.setAttribute('aria-expanded', 'false');
    }

    function renderStateList(query) {
      if (!stateList) return;
      var q = String(query || '').trim().toLowerCase();
      var items = BRANCH_STATES.filter(function (s) {
        return !q || s.toLowerCase().indexOf(q) !== -1;
      });
      if (!items.length) {
        stateList.innerHTML = '<li class="is-empty">No states found</li>';
      } else {
        stateList.innerHTML = items.map(function (s) {
          return '<li role="option" data-state="' + s.replace(/"/g, '&quot;') + '" title="' + s.replace(/"/g, '&quot;') + '">' + s + '</li>';
        }).join('');
      }
      stateList.hidden = false;
      if (stateInput) stateInput.setAttribute('aria-expanded', 'true');
    }

    if (stateInput && stateList) {
      stateInput.addEventListener('focus', function () {
        renderStateList(stateInput.value);
      });
      stateInput.addEventListener('input', function () {
        renderStateList(stateInput.value);
        if (stateFilter) stateFilter.classList.toggle('select-filled', !!stateInput.value.trim());
      });
      stateInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closeStateList();
          stateInput.blur();
        }
        if (e.key === 'Enter') {
          var first = stateList.querySelector('li[data-state]');
          if (first) {
            e.preventDefault();
            stateInput.value = first.getAttribute('data-state') || '';
            closeStateList();
            if (stateFilter) stateFilter.classList.add('select-filled');
          }
        }
      });
      stateList.addEventListener('mousedown', function (e) {
        var item = e.target.closest('li[data-state]');
        if (!item) return;
        e.preventDefault();
        stateInput.value = item.getAttribute('data-state') || '';
        closeStateList();
        if (stateFilter) stateFilter.classList.add('select-filled');
      });
      document.addEventListener('click', function (e) {
        if (!e.target.closest('#orgStateFilter')) closeStateList();
      });
    }

    document.querySelectorAll('[data-branch-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () { toast('Edit branch', 'Branch editor opens.'); });
    });
    document.querySelectorAll('[data-branch-del]').forEach(function (btn) {
      btn.addEventListener('click', function () { toast('Delete branch', 'Branch marked for delete.'); });
    });
  }

  function initCredits() {
    var amount = document.getElementById('orgCreditAmount');
    var balanceEl = document.getElementById('orgCreditBalance');
    var balance = 40;

    document.querySelectorAll('[data-credit-add]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!amount) return;
        amount.value = btn.getAttribute('data-credit-add');
      });
    });

    var addBtn = document.getElementById('orgAddCredits');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        var n = amount ? Number(amount.value) : 0;
        if (!n || n <= 0) {
          toast('Add credits', 'Enter an amount to add.');
          return;
        }
        balance += n;
        if (balanceEl) balanceEl.textContent = balance.toFixed(2);
        if (amount) amount.value = '';
        toast('Credits added', '+' + n + ' credits added to balance.');
      });
    }

    var dl = document.getElementById('orgTxDownload');
    if (dl) dl.addEventListener('click', function () { toast('Download', 'Transaction history export started.'); });

    initCreditsMonthRange();
  }

  function initCreditsMonthRange() {
    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var wrap = document.getElementById('orgTxRangeWrap');
    var trigger = document.getElementById('orgTxRangeBtn');
    var textEl = document.getElementById('orgTxRangeText');
    var picker = document.getElementById('orgMonthpicker');
    var leftGrid = document.getElementById('orgMonthLeft');
    var rightGrid = document.getElementById('orgMonthRight');
    var yearLeftEl = document.getElementById('orgYearLeft');
    var yearRightEl = document.getElementById('orgYearRight');
    if (!wrap || !trigger || !picker) return;

    var now = new Date();
    var leftYear = now.getFullYear();
    var start = null;
    var end = null;
    var picking = 'start';

    function fmt(p) {
      return MONTHS[p.m] + ' ' + p.y;
    }

    function updateLabel() {
      if (!textEl) return;
      if (!start || !end) {
        textEl.textContent = 'Start month → End month';
        textEl.classList.add('is-placeholder');
        return;
      }
      textEl.textContent = fmt(start) + ' → ' + fmt(end);
      textEl.classList.remove('is-placeholder');
    }

    function closePicker() {
      picker.hidden = true;
      wrap.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    function openPicker() {
      if (start) leftYear = start.y;
      picking = start && end && start !== end ? 'start' : (start ? 'end' : 'start');
      if (start && end) picking = 'start';
      renderMonths();
      picker.hidden = false;
      wrap.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function renderYearGrid(grid, year) {
      if (!grid) return;
      grid.innerHTML = '';
      MONTHS.forEach(function (name, idx) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'org-month-btn';
        btn.textContent = name;

        if (start && end) {
          var isStart = start.y === year && start.m === idx;
          var isEnd = end.y === year && end.m === idx;
          var afterStart = year > start.y || (year === start.y && idx > start.m);
          var beforeEnd = year < end.y || (year === end.y && idx < end.m);
          if (isStart || isEnd) {
            btn.classList.add('is-selected');
            if (isStart && !(start.y === end.y && start.m === end.m)) btn.classList.add('is-range-start');
            if (isEnd && !(start.y === end.y && start.m === end.m)) btn.classList.add('is-range-end');
          } else if (afterStart && beforeEnd) {
            btn.classList.add('is-in-range');
          }
        } else if (start && start.y === year && start.m === idx) {
          btn.classList.add('is-selected');
        }

        btn.addEventListener('click', function () {
          var cell = { y: year, m: idx };
          if (picking === 'start' || !start) {
            start = cell;
            end = null;
            picking = 'end';
          } else {
            if (cell.y < start.y || (cell.y === start.y && cell.m < start.m)) {
              end = start;
              start = cell;
            } else {
              end = cell;
            }
            picking = 'start';
            updateLabel();
            closePicker();
          }
          renderMonths();
        });
        grid.appendChild(btn);
      });
    }

    function renderMonths() {
      if (yearLeftEl) yearLeftEl.textContent = String(leftYear);
      if (yearRightEl) yearRightEl.textContent = String(leftYear + 1);
      renderYearGrid(leftGrid, leftYear);
      renderYearGrid(rightGrid, leftYear + 1);
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (picker.hidden) openPicker();
      else closePicker();
    });

    picker.addEventListener('click', function (e) { e.stopPropagation(); });

    picker.querySelectorAll('[data-org-nav]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nav = btn.getAttribute('data-org-nav');
        if (nav === 'prev-year') leftYear -= 1;
        if (nav === 'next-year') leftYear += 1;
        renderMonths();
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('#orgTxRangeWrap')) closePicker();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !picker.hidden) closePicker();
    });

    updateLabel();
    renderMonths();
  }

  function initDocuments() {
    var upload = document.getElementById('orgDocUpload');
    var locModal = document.getElementById('orgLocationModal');
    var locPathBtn = document.querySelector('.org-docs-path .org-link');
    var viewToggle = document.getElementById('orgDocTableView');
    var tableWrap = document.getElementById('orgDocsTableWrap');
    var docsGrid = document.getElementById('orgDocsGrid');
    var switchLabel = document.querySelector('.org-docs-switch__label');
    var deleteConfirm = document.getElementById('orgDeleteConfirm');
    var deleteNo = document.getElementById('orgDeleteNo');
    var deleteYes = document.getElementById('orgDeleteYes');
    var pendingDeleteRow = null;

    function openLocationModal() {
      if (!locModal) return;
      locModal.hidden = false;
      locModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLocationModal() {
      if (!locModal) return;
      locModal.hidden = true;
      locModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function applyDocsView() {
      var tableOn = !viewToggle || viewToggle.checked;
      if (tableWrap) tableWrap.hidden = !tableOn;
      if (docsGrid) docsGrid.hidden = tableOn;
      if (switchLabel) switchLabel.textContent = tableOn ? 'Table' : 'Docs';
      if (viewToggle) {
        var wrap = viewToggle.closest('.org-docs-switch');
        if (wrap) wrap.setAttribute('title', tableOn ? 'Table view' : 'Docs view');
      }
    }

    function closeDeleteConfirm() {
      if (!deleteConfirm) return;
      deleteConfirm.hidden = true;
      pendingDeleteRow = null;
    }

    function openDeleteConfirm(btn, row) {
      if (!deleteConfirm || !btn || !row) return;
      pendingDeleteRow = row;
      deleteConfirm.hidden = false;
      var rect = btn.getBoundingClientRect();
      var width = deleteConfirm.offsetWidth || 280;
      var height = deleteConfirm.offsetHeight || 96;
      var left = Math.round(rect.left + rect.width / 2 - width / 2);
      var top = Math.round(rect.top - height - 10);
      left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
      if (top < 8) top = Math.round(rect.bottom + 10);
      deleteConfirm.style.left = left + 'px';
      deleteConfirm.style.top = top + 'px';
    }

    if (upload) upload.addEventListener('click', openLocationModal);
    if (locPathBtn) locPathBtn.addEventListener('click', openLocationModal);
    if (locModal) {
      locModal.querySelectorAll('[data-location-close]').forEach(function (el) {
        el.addEventListener('click', closeLocationModal);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !locModal.hidden) closeLocationModal();
      });
    }

    if (viewToggle) {
      viewToggle.addEventListener('change', applyDocsView);
      applyDocsView();
    }

    if (deleteNo) deleteNo.addEventListener('click', closeDeleteConfirm);
    if (deleteYes) {
      deleteYes.addEventListener('click', function () {
        if (pendingDeleteRow) {
          pendingDeleteRow.remove();
          toast('Delete', 'File removed.');
        }
        closeDeleteConfirm();
      });
    }
    document.addEventListener('click', function (e) {
      if (!deleteConfirm || deleteConfirm.hidden) return;
      if (e.target.closest('#orgDeleteConfirm') || e.target.closest('[data-doc-del]')) return;
      closeDeleteConfirm();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && deleteConfirm && !deleteConfirm.hidden) closeDeleteConfirm();
    });
    window.addEventListener('scroll', closeDeleteConfirm, true);
    window.addEventListener('resize', closeDeleteConfirm);

    var folderModal = document.getElementById('orgFolderModal');
    var folderForm = document.getElementById('orgFolderForm');
    var folderName = document.getElementById('orgFolderName');
    var neu = document.getElementById('orgDocNew');

    function openFolderModal() {
      if (!folderModal) return;
      folderModal.hidden = false;
      folderModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (folderName) {
        folderName.value = '';
        setTimeout(function () { folderName.focus(); }, 40);
      }
    }

    function closeFolderModal() {
      if (!folderModal) return;
      folderModal.hidden = true;
      folderModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (neu) neu.addEventListener('click', openFolderModal);
    if (folderModal) {
      folderModal.querySelectorAll('[data-folder-close]').forEach(function (el) {
        el.addEventListener('click', closeFolderModal);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !folderModal.hidden) closeFolderModal();
      });
    }

    var search = document.getElementById('orgDocSearch');
    var body = document.getElementById('orgDocBody');
    if (search && body) {
      search.addEventListener('input', function () {
        var q = (search.value || '').toLowerCase();
        body.querySelectorAll('tr').forEach(function (tr) {
          var text = (tr.textContent || '').toLowerCase();
          tr.style.display = !q || text.indexOf(q) !== -1 ? '' : 'none';
        });
      });
    }

    function closeDocEdit(row) {
      if (!row) return;
      var view = row.querySelector('[data-doc-view]');
      var editUi = row.querySelector('[data-doc-edit-ui]');
      var nameEl = row.querySelector('[data-doc-name]');
      var input = row.querySelector('[data-doc-input]');
      row.classList.remove('is-editing');
      if (view) view.hidden = false;
      if (editUi) editUi.hidden = true;
      if (input && nameEl) input.value = nameEl.textContent || '';
    }

    function openDocEdit(row) {
      if (!row || !body) return;
      body.querySelectorAll('tr.is-editing').forEach(closeDocEdit);
      var view = row.querySelector('[data-doc-view]');
      var editUi = row.querySelector('[data-doc-edit-ui]');
      var nameEl = row.querySelector('[data-doc-name]');
      var input = row.querySelector('[data-doc-input]');
      row.classList.add('is-editing');
      if (view) view.hidden = true;
      if (editUi) editUi.hidden = false;
      if (input) {
        input.value = nameEl ? (nameEl.textContent || '') : '';
        setTimeout(function () {
          input.focus();
          input.select();
        }, 20);
      }
    }

    function saveDocEdit(row) {
      if (!row) return;
      var nameEl = row.querySelector('[data-doc-name]');
      var input = row.querySelector('[data-doc-input]');
      var next = input ? (input.value || '').trim() : '';
      if (!next) {
        toast('Required', 'File name cannot be empty.');
        if (input) input.focus();
        return;
      }
      if (nameEl) nameEl.textContent = next;
      closeDocEdit(row);
      toast('Renamed', 'Document name updated.');
    }

    function folderRowHtml(name) {
      var safe = String(name)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/"/g, '&quot;');
      return '' +
        '<tr data-doc-row data-doc-type="folder">' +
          '<td>' +
            '<div class="org-file" data-doc-view>' +
              '<span class="org-file__drag" aria-hidden="true"></span>' +
              '<span class="org-file__icon org-file__icon--folder" aria-hidden="true">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>' +
              '</span>' +
              '<div class="org-file__info">' +
                '<strong data-doc-name>' + safe + '</strong>' +
                '<div class="org-file__meta"><span>0</span><span>0</span><span>0</span></div>' +
              '</div>' +
            '</div>' +
            '<div class="org-file-edit" data-doc-edit-ui hidden>' +
              '<input type="text" class="org-file-edit__input" data-doc-input value="' + safe + '" aria-label="Rename file">' +
              '<button type="button" class="org-file-edit__ok" data-doc-save aria-label="Save">✓</button>' +
              '<button type="button" class="org-file-edit__cancel" data-doc-cancel aria-label="Cancel">×</button>' +
            '</div>' +
          '</td>' +
          '<td class="org-row-actions">' +
            '<button type="button" class="org-act org-act--dl is-disabled" aria-label="Download" data-doc-dl disabled>' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M8 11l4 4 4-4"/><path d="M5 21h14M5 21v-2M19 21v-2"/></svg>' +
            '</button>' +
            '<button type="button" class="org-act org-act--return" aria-label="Return" data-doc-share>' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14H4V9"/><path d="M20 20v-6a5 5 0 00-5-5H4"/></svg>' +
            '</button>' +
            '<button type="button" class="org-act org-act--del" aria-label="Delete" data-doc-del>' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"/><path d="M10 7V5a1 1 0 011-1h2a1 1 0 011 1v2"/><path d="M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13"/><path d="M10 11v7M14 11v7"/></svg>' +
            '</button>' +
            '<button type="button" class="org-act org-act--edit" aria-label="Edit" data-doc-edit>' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>' +
            '</button>' +
          '</td>' +
        '</tr>';
    }

    if (folderForm) {
      folderForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = folderName ? (folderName.value || '').trim() : '';
        if (!name) {
          toast('Required', 'Please enter a folder name.');
          if (folderName) folderName.focus();
          return;
        }
        if (body) {
          body.insertAdjacentHTML('afterbegin', folderRowHtml(name));
        }
        closeFolderModal();
        toast('Folder created', '"' + name + '" added.');
      });
    }

    if (body) {
      body.addEventListener('click', function (e) {
        var editBtn = e.target.closest('[data-doc-edit]');
        if (editBtn) {
          openDocEdit(editBtn.closest('[data-doc-row]'));
          return;
        }
        var saveBtn = e.target.closest('[data-doc-save]');
        if (saveBtn) {
          saveDocEdit(saveBtn.closest('[data-doc-row]'));
          return;
        }
        var cancelBtn = e.target.closest('[data-doc-cancel]');
        if (cancelBtn) {
          closeDocEdit(cancelBtn.closest('[data-doc-row]'));
          return;
        }
        var dlBtn = e.target.closest('[data-doc-dl]');
        if (dlBtn) {
          if (dlBtn.disabled || dlBtn.classList.contains('is-disabled')) return;
          toast('Download', 'File download started.');
          return;
        }
        var shareBtn = e.target.closest('[data-doc-share]');
        if (shareBtn) {
          openLocationModal();
          return;
        }
        var delBtn = e.target.closest('[data-doc-del]');
        if (delBtn) {
          e.preventDefault();
          e.stopPropagation();
          openDeleteConfirm(delBtn, delBtn.closest('[data-doc-row]'));
        }
      });

      body.addEventListener('keydown', function (e) {
        var input = e.target.closest('[data-doc-input]');
        if (!input) return;
        var row = input.closest('[data-doc-row]');
        if (e.key === 'Enter') {
          e.preventDefault();
          saveDocEdit(row);
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          closeDocEdit(row);
        }
      });
    }
  }

  function initPortalMenus() {
    var list = document.getElementById('orgPortalList');
    if (!list) return;

    var STORAGE_KEY = 'timeerp.org.portalMenus';
    var defaults = {};
    list.querySelectorAll('[data-portal-menu]').forEach(function (btn) {
      defaults[btn.getAttribute('data-portal-menu')] = true;
    });

    function loadState() {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return Object.assign({}, defaults);
        var parsed = JSON.parse(raw);
        return Object.assign({}, defaults, parsed);
      } catch (e) {
        return Object.assign({}, defaults);
      }
    }

    function saveState(state) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {}
    }

    function applyToggle(btn, on) {
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-checked', on ? 'true' : 'false');
      var label = btn.querySelector('.org-portal-toggle__label');
      if (label) label.textContent = on ? 'On' : 'Off';
    }

    var state = loadState();
    list.querySelectorAll('[data-portal-menu]').forEach(function (btn) {
      var key = btn.getAttribute('data-portal-menu');
      applyToggle(btn, !!state[key]);
      btn.addEventListener('click', function () {
        var next = !btn.classList.contains('is-on');
        applyToggle(btn, next);
        state[key] = next;
        saveState(state);
        var name = (btn.previousElementSibling && btn.previousElementSibling.textContent) || key;
        toast(next ? 'Menu enabled' : 'Menu hidden', name + (next ? ' is now visible to customers.' : ' is now hidden for customers.'));
      });
    });
  }

  function boot() {
    initTabs();
    initOrgData();
    initPortalMenus();
    initBranch();
    initCredits();
    initDocuments();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
