(function () {
  'use strict';

  var TABS = [
    { id: 'note', label: 'Note' },
    { id: 'view', label: 'View Note' },
    { id: 'recurring', label: 'Recurring Note' },
    { id: 'view-recurring', label: 'View Recurring Note' }
  ];

  var RECURRING_PAGE_SIZE = 5;
  var recurringPage = 1;

  var RECURRING_NOTES = [
    {
      id: 1,
      createdDate: '15-Aug-2026',
      priority: 'High',
      note: 'Follow up on GST return filing for Q2',
      client: 'Acme Corp Pvt Ltd',
      title: 'GST Return Reminder',
      status: 'Active'
    },
    {
      id: 2,
      createdDate: '12-Aug-2026',
      priority: 'Medium',
      note: 'Send monthly invoice summary to client',
      client: 'BlueMoon Industries',
      title: 'Monthly Invoice Summary',
      status: 'Active'
    },
    {
      id: 3,
      createdDate: '08-Aug-2026',
      priority: 'Low',
      note: 'Review TDS compliance documents before due date',
      client: 'Law Seva Associates',
      title: 'TDS Compliance Check',
      status: 'Paused'
    },
    {
      id: 4,
      createdDate: '02-Aug-2026',
      priority: 'High',
      note: 'Prepare audit working papers and supporting schedules',
      client: 'Sunrise Traders',
      title: 'Audit Preparation',
      status: 'Active'
    },
    {
      id: 5,
      createdDate: '28-Jul-2026',
      priority: 'Medium',
      note: 'Update client portal credentials and share access',
      client: 'TechNova Solutions',
      title: 'Portal Access Update',
      status: 'Active'
    },
    {
      id: 6,
      createdDate: '22-Jul-2026',
      priority: 'Low',
      note: 'Send quarterly compliance checklist to client',
      client: 'GreenField Exports',
      title: 'Quarterly Compliance',
      status: 'Paused'
    }
  ];

  function emptyIcon() {
    return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<rect x="12" y="16" width="40" height="32" rx="4"/>' +
      '<path d="M20 28h24M20 36h16"/>' +
      '</svg>';
  }

  function priorityClass(priority) {
    if (priority === 'High') return 'mn-pill mn-pill--high';
    if (priority === 'Low') return 'mn-pill mn-pill--low';
    return 'mn-pill mn-pill--medium';
  }

  function statusClass(status) {
    return status === 'Paused' ? 'mn-pill mn-pill--paused' : 'mn-pill mn-pill--active';
  }

  function actionBtn(label, extraClass) {
    return '<button type="button" class="mn-act-btn' + (extraClass ? ' ' + extraClass : '') + '" aria-label="' + label + '">' +
      (extraClass === 'mn-act-btn--del'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 7h16"/><path d="M10 7V5a1 1 0 011-1h2a1 1 0 011 1v2"/><path d="M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>') +
      '</button>';
  }

  function filteredRecurringNotes() {
    var filter = document.getElementById('mnRecurringStatusFilter');
    var status = filter ? filter.value : '';
    if (!status) return RECURRING_NOTES.slice();
    return RECURRING_NOTES.filter(function (row) { return row.status === status; });
  }

  function recurringTotalPages(list) {
    return Math.max(1, Math.ceil(list.length / RECURRING_PAGE_SIZE));
  }

  function renderRecurringTable() {
    var body = document.getElementById('mnRecurringTableBody');
    if (!body) return;

    var list = filteredRecurringNotes();
    var pages = recurringTotalPages(list);
    if (recurringPage > pages) recurringPage = pages;

    var start = (recurringPage - 1) * RECURRING_PAGE_SIZE;
    var pageItems = list.slice(start, start + RECURRING_PAGE_SIZE);

    if (!pageItems.length) {
      body.innerHTML = '<tr><td colspan="8">' +
        '<div class="mn-empty">' +
          '<div class="mn-empty__icon">' + emptyIcon() + '</div>' +
          '<div>No data</div>' +
        '</div>' +
      '</td></tr>';
    } else {
      body.innerHTML = pageItems.map(function (row, index) {
        return '<tr>' +
          '<td>' + (start + index + 1) + '</td>' +
          '<td>' + row.createdDate + '</td>' +
          '<td><span class="' + priorityClass(row.priority) + '">' + row.priority + '</span></td>' +
          '<td class="mn-cell-note">' + row.note + '</td>' +
          '<td>' + row.client + '</td>' +
          '<td>' + row.title + '</td>' +
          '<td><span class="' + statusClass(row.status) + '">' + row.status + '</span></td>' +
          '<td class="mn-row-actions">' +
            actionBtn('Edit ' + row.title) +
            actionBtn('Delete ' + row.title, 'mn-act-btn--del') +
          '</td>' +
        '</tr>';
      }).join('');
    }

    var pageNum = document.getElementById('mnRecurringPageNum');
    var pageTotal = document.getElementById('mnRecurringPageTotal');
    var count = document.getElementById('mnRecurringCount');
    var prev = document.getElementById('mnRecurringPrev');
    var next = document.getElementById('mnRecurringNext');

    if (pageNum) pageNum.textContent = String(recurringPage);
    if (pageTotal) pageTotal.textContent = String(pages);
    if (count) count.textContent = pageItems.length + ' / ' + list.length;
    if (prev) {
      prev.disabled = recurringPage <= 1 || !list.length;
      prev.style.opacity = prev.disabled ? '0.6' : '1';
      prev.style.cursor = prev.disabled ? 'not-allowed' : 'pointer';
    }
    if (next) {
      next.disabled = recurringPage >= pages || !list.length;
      next.style.opacity = next.disabled ? '0.6' : '1';
      next.style.cursor = next.disabled ? 'not-allowed' : 'pointer';
    }
  }

  function initRecurringTable() {
    var filter = document.getElementById('mnRecurringStatusFilter');
    var prev = document.getElementById('mnRecurringPrev');
    var next = document.getElementById('mnRecurringNext');

    if (filter) {
      filter.addEventListener('change', function () {
        recurringPage = 1;
        renderRecurringTable();
      });
    }
    if (prev) {
      prev.addEventListener('click', function () {
        if (recurringPage > 1) {
          recurringPage -= 1;
          renderRecurringTable();
        }
      });
    }
    if (next) {
      next.addEventListener('click', function () {
        var pages = recurringTotalPages(filteredRecurringNotes());
        if (recurringPage < pages) {
          recurringPage += 1;
          renderRecurringTable();
        }
      });
    }

    renderRecurringTable();
  }

  function activateTab(id) {
    document.querySelectorAll('.mn-tab').forEach(function (tab) {
      var active = tab.getAttribute('data-mn-tab') === id;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.querySelectorAll('.mn-pane').forEach(function (pane) {
      pane.classList.toggle('is-active', pane.getAttribute('data-mn-pane') === id);
    });
    if (history.replaceState) {
      history.replaceState(null, '', '#' + id);
    } else {
      location.hash = id;
    }
  }

  function initTabs() {
    var hash = (location.hash || '').replace(/^#/, '');
    var initial = TABS.some(function (t) { return t.id === hash; }) ? hash : 'view';
    activateTab(initial);

    document.querySelectorAll('.mn-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab.getAttribute('data-mn-tab'));
      });
    });
  }

  function initForm() {
    var save = document.getElementById('mnSaveBtn');
    var cancel = document.getElementById('mnCancelBtn');
    if (save) {
      save.addEventListener('click', function () {
        if (window.DashboardShell && window.DashboardShell.toast) {
          window.DashboardShell.toast('Note saved', 'Your note was saved successfully.');
        }
        activateTab('view');
      });
    }
    if (cancel) {
      cancel.addEventListener('click', function () { activateTab('view'); });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTabs();
    initForm();
    initRecurringTable();
  });
})();
