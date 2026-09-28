(function () {
  'use strict';

  var TASKS = {
    TSK01190: {
      id: 'TSK01190', name: 'Client consultation call', delay: 'Delayed By : 121 days',
      targetDate: '13/04/2026', dueDate: '18/04/2026 12:38 AM', createdAt: '13/04/2026 9:41 PM',
      priority: 'Medium', createdBy: 'Dev Aggarwal', service: 'Tax consultation', subService: 'Income tax consult...'
    },
    TSK01145: {
      id: 'TSK01145', name: 'Return Filing', delay: 'Delayed By : 95 days',
      targetDate: '20/07/2026', dueDate: '25/07/2026 06:00 PM', createdAt: '18/07/2026 10:15 AM',
      priority: 'High', createdBy: 'Dev Aggarwal', service: 'GST Filing', subService: 'Monthly return...'
    }
  };

  var els = {
    taskId: document.getElementById('tvTaskId'),
    delayBadge: document.getElementById('tvDelayBadge'),
    taskName: document.getElementById('tvTaskName'),
    targetDate: document.getElementById('tvTargetDate'),
    dueDate: document.getElementById('tvDueDate'),
    createdAt: document.getElementById('tvCreatedAt'),
    priority: document.getElementById('tvPriority'),
    createdBy: document.getElementById('tvCreatedBy'),
    service: document.getElementById('tvService'),
    subService: document.getElementById('tvSubService'),
    statusBtn: document.getElementById('tvStatusBtn'),
    statusPop: document.getElementById('tvStatusPop'),
    startTimerBtn: document.getElementById('tvStartTimerBtn'),
    taskRemindBtn: document.getElementById('tvTaskRemindBtn'),
    remindModal: document.getElementById('tvRemindModal'),
    remindClose: document.getElementById('tvRemindClose'),
    remindSave: document.getElementById('tvRemindSave'),
    remindBody: document.getElementById('tvRemindBody'),
    remindNum: document.getElementById('tvRemindNum'),
    remindUnit: document.getElementById('tvRemindUnit'),
    remindRecurring: document.getElementById('tvRemindRecurring'),
    tagsBtn: document.getElementById('tvTagsBtn'),
    tagsModal: document.getElementById('tvTagsModal'),
    tagsClose: document.getElementById('tvTagsClose'),
    tagsForm: document.getElementById('tvTagsForm'),
    tagsInput: document.getElementById('tvTagsInput'),
    editBtn: document.getElementById('tvEditBtn'),
    deleteBtn: document.getElementById('tvDeleteBtn'),
    delPop: document.getElementById('tvDelPop'),
    delNo: document.getElementById('tvDelNo'),
    delYes: document.getElementById('tvDelYes'),
    moreToggle: document.getElementById('tvMoreToggle'),
    timeModal: document.getElementById('tvTimeModal'),
    timeClose: document.getElementById('tvTimeClose'),
    timeTaskName: document.getElementById('tvTimeTaskName'),
    timeTaskNo: document.getElementById('tvTimeTaskNo'),
    editTrackModal: document.getElementById('tvEditTrackModal'),
    editTrackClose: document.getElementById('tvEditTrackClose'),
    editTrackForm: document.getElementById('tvEditTrackForm'),
    manualBody: document.getElementById('tvManualBody'),
    topClock: document.getElementById('tvTopClock')
  };

  var deleteState = { kind: null, row: null };

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

  function getTaskId() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id') || 'TSK01190';
  }

  function renderTask() {
    var id = getTaskId();
    var task = TASKS[id] || TASKS.TSK01190;
    document.title = task.id + ' — Task View — TIME ERP HRMS';
    if (els.taskId) els.taskId.textContent = task.id;
    if (els.delayBadge) els.delayBadge.textContent = task.delay;
    if (els.taskName) els.taskName.textContent = task.name;
    if (els.targetDate) els.targetDate.textContent = task.targetDate;
    if (els.dueDate) els.dueDate.textContent = task.dueDate;
    if (els.createdAt) els.createdAt.textContent = task.createdAt;
    if (els.priority) els.priority.textContent = task.priority;
    if (els.createdBy) els.createdBy.textContent = task.createdBy;
    if (els.service) els.service.textContent = task.service;
    if (els.subService) els.subService.textContent = task.subService;
    if (els.editBtn) els.editBtn.href = 'task_edit.html?id=' + encodeURIComponent(task.id);
    if (els.timeTaskName) els.timeTaskName.textContent = task.name;
    if (els.timeTaskNo) els.timeTaskNo.textContent = task.id;
  }

  function closeStatusPop() {
    if (els.statusPop) els.statusPop.hidden = true;
    if (els.statusBtn) els.statusBtn.setAttribute('aria-expanded', 'false');
  }

  function openTimeModal() {
    if (els.timeModal) {
      els.timeModal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }

  function openDeletePop(anchor, kind, row) {
    if (!els.delPop || !anchor) return;
    deleteState.kind = kind;
    deleteState.row = row || null;
    els.delPop.hidden = false;
    var rect = anchor.getBoundingClientRect();
    var popW = els.delPop.offsetWidth || 260;
    var popH = els.delPop.offsetHeight || 100;
    var left = rect.right - popW;
    var top = rect.top - popH - 10;
    if (left < 8) left = 8;
    if (left + popW > window.innerWidth - 8) left = window.innerWidth - popW - 8;
    if (top < 8) top = rect.bottom + 10;
    els.delPop.style.left = left + 'px';
    els.delPop.style.top = top + 'px';
  }

  function closeDeletePop() {
    if (!els.delPop) return;
    els.delPop.hidden = true;
    deleteState.kind = null;
    deleteState.row = null;
  }

  function clearRemindBody() {
    if (!els.remindBody) return;
    els.remindBody.innerHTML =
      '<tr><td colspan="2"><div class="tv-remind-empty"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 28l6-8h32l6 8"/><path d="M10 28h44v22a4 4 0 01-4 4H14a4 4 0 01-4-4V28z"/></svg><p>No data</p></div></td></tr>';
  }

  function clearManualTrackRow() {
    if (!els.manualBody) return;
    els.manualBody.innerHTML =
      '<tr><td colspan="8"><div class="tv-track-empty"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 28l6-8h32l6 8"/><path d="M10 28h44v22a4 4 0 01-4 4H14a4 4 0 01-4-4V28z"/></svg><p>No data</p></div></td></tr>';
    var total = document.querySelector('#tvManualTable .tv-total-val');
    if (total) total.textContent = '0';
  }

  function confirmDelete() {
    var kind = deleteState.kind;
    var row = deleteState.row;
    closeDeletePop();
    if (kind === 'task') {
      toast('Deleted', 'Task deleted successfully.');
      setTimeout(function () { window.location.href = 'my_timesheet.html'; }, 700);
    } else if (kind === 'remind') {
      clearRemindBody();
      toast('Deleted', 'Reminder removed.');
    } else if (kind === 'track') {
      if (row && row.parentNode) row.remove();
      if (!els.manualBody || !els.manualBody.querySelector('tr')) clearManualTrackRow();
      var total = document.querySelector('#tvManualTable .tv-total-val');
      if (total) total.textContent = '0';
      toast('Deleted', 'Time track removed.');
    }
  }

  function handleDeleteClick(e, btn) {
    e.preventDefault();
    e.stopPropagation();
    if (btn.id === 'tvDeleteBtn' || btn.classList.contains('tv-tool-btn--delete')) {
      openDeletePop(btn, 'task');
      return;
    }
    if (btn.closest('#tvRemindBody')) {
      openDeletePop(btn, 'remind');
      return;
    }
    if (btn.closest('#tvManualBody')) {
      openDeletePop(btn, 'track', btn.closest('tr'));
    }
  }

  function anyModalOpen() {
    return (els.timeModal && !els.timeModal.hidden) || (els.editTrackModal && !els.editTrackModal.hidden) ||
      (els.remindModal && !els.remindModal.hidden) || (els.tagsModal && !els.tagsModal.hidden);
  }

  function syncBodyScroll() {
    document.body.style.overflow = anyModalOpen() ? 'hidden' : '';
  }

  function openTagsModal() {
    if (els.tagsInput) els.tagsInput.value = '';
    if (els.tagsModal) {
      els.tagsModal.hidden = false;
      document.body.style.overflow = 'hidden';
      if (els.tagsInput) els.tagsInput.focus();
    }
  }

  function closeTagsModal() {
    if (els.tagsModal) els.tagsModal.hidden = true;
    syncBodyScroll();
  }

  function saveTags() {
    var val = els.tagsInput && els.tagsInput.value ? els.tagsInput.value.trim() : '';
    if (!val) {
      toast('Tags', 'Please enter a tag.');
      return;
    }
    closeTagsModal();
    toast('Saved', 'Tag "' + val + '" added.');
  }

  function closeRemindModal() {
    if (els.remindModal) els.remindModal.hidden = true;
    syncBodyScroll();
  }

  function openRemindModal() {
    if (els.remindModal) {
      els.remindModal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }

  function saveReminder() {
    var num = els.remindNum && els.remindNum.value ? els.remindNum.value.trim() : '';
    var unit = els.remindUnit && els.remindUnit.value ? els.remindUnit.options[els.remindUnit.selectedIndex].text : '';
    if (!num || !unit || unit.indexOf('Select') >= 0) {
      toast('Reminder', 'Please enter number and select unit.');
      return;
    }
    var title = 'Remind after ' + num + ' ' + unit + (els.remindRecurring && els.remindRecurring.checked ? ' (Recurring)' : '');
    if (els.remindBody) {
      els.remindBody.innerHTML =
        '<tr><td>' + title + '</td><td class="tv-remind-action"><button type="button" class="tv-del-btn" aria-label="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg></button></td></tr>';
    }
    toast('Saved', 'Task reminder saved.');
  }

  function closeTimeModal() {
    if (els.timeModal) els.timeModal.hidden = true;
    syncBodyScroll();
  }

  function openEditTrackModal() {
    if (els.editTrackModal) {
      els.editTrackModal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }

  function closeEditTrackModal() {
    if (els.editTrackModal) els.editTrackModal.hidden = true;
    syncBodyScroll();
  }

  function updateClock() {
    if (!els.topClock) return;
    var d = new Date();
    els.topClock.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  function bindEvents() {
    if (els.statusBtn && els.statusPop) {
      els.statusBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = els.statusPop.hidden;
        closeStatusPop();
        if (open) {
          els.statusPop.hidden = false;
          els.statusBtn.setAttribute('aria-expanded', 'true');
        }
      });
      els.statusPop.addEventListener('click', function (e) {
        e.stopPropagation();
        var opt = e.target.closest('button, li, [role="menuitem"]');
        if (!opt || opt === els.statusPop || !els.statusBtn) return;
        var text = (opt.textContent || '').replace(/\s+/g, ' ').trim();
        if (!text) return;
        els.statusBtn.textContent = text;
        closeStatusPop();
        toast('Status updated', text);
      });
    }

    if (els.startTimerBtn) els.startTimerBtn.addEventListener('click', openTimeModal);
    if (els.taskRemindBtn) els.taskRemindBtn.addEventListener('click', openRemindModal);
    if (els.tagsBtn) els.tagsBtn.addEventListener('click', openTagsModal);
    if (els.tagsClose) els.tagsClose.addEventListener('click', closeTagsModal);
    if (els.tagsModal) {
      els.tagsModal.addEventListener('click', function (e) {
        if (e.target === els.tagsModal) closeTagsModal();
      });
    }
    if (els.tagsForm) {
      els.tagsForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveTags();
      });
    }
    if (els.remindClose) els.remindClose.addEventListener('click', closeRemindModal);
    if (els.remindModal) {
      els.remindModal.addEventListener('click', function (e) {
        if (e.target === els.remindModal) closeRemindModal();
      });
    }
    if (els.remindSave) els.remindSave.addEventListener('click', saveReminder);
    if (els.remindBody) {
      els.remindBody.addEventListener('click', function (e) {
        var del = e.target.closest('.tv-del-btn');
        if (del) handleDeleteClick(e, del);
      });
    }

    if (els.delNo) els.delNo.addEventListener('click', function (e) { e.stopPropagation(); closeDeletePop(); });
    if (els.delYes) els.delYes.addEventListener('click', function (e) { e.stopPropagation(); confirmDelete(); });
    if (els.delPop) els.delPop.addEventListener('click', function (e) { e.stopPropagation(); });
    if (els.deleteBtn) els.deleteBtn.addEventListener('click', function (e) { handleDeleteClick(e, els.deleteBtn); });

    if (els.timeClose) els.timeClose.addEventListener('click', closeTimeModal);
    if (els.timeModal) {
      els.timeModal.addEventListener('click', function (e) {
        if (e.target === els.timeModal) closeTimeModal();
      });
    }

    if (els.manualBody) {
      els.manualBody.addEventListener('click', function (e) {
        var del = e.target.closest('.tv-del-btn');
        if (del) { handleDeleteClick(e, del); return; }
        if (e.target.closest('[data-action="edit-track"]')) openEditTrackModal();
      });
    }
    if (els.editTrackClose) els.editTrackClose.addEventListener('click', closeEditTrackModal);
    if (els.editTrackModal) {
      els.editTrackModal.addEventListener('click', function (e) {
        if (e.target === els.editTrackModal) closeEditTrackModal();
      });
    }
    if (els.editTrackForm) {
      els.editTrackForm.addEventListener('submit', function (e) {
        e.preventDefault();
        closeEditTrackModal();
        toast('Saved', 'Time track updated.');
      });
    }

    if (els.moreToggle) {
      els.moreToggle.addEventListener('click', function () {
        var open = els.moreToggle.getAttribute('aria-expanded') === 'true';
        els.moreToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    }

    document.addEventListener('click', function (e) {
      closeStatusPop();
      if (els.delPop && !els.delPop.hidden && !e.target.closest('#tvDelPop') && !e.target.closest('.tv-del-btn') && !e.target.closest('.tv-tool-btn--delete')) {
        closeDeletePop();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (els.delPop && !els.delPop.hidden) { closeDeletePop(); return; }
      closeStatusPop();
      if (els.editTrackModal && !els.editTrackModal.hidden) { closeEditTrackModal(); return; }
      if (els.remindModal && !els.remindModal.hidden) { closeRemindModal(); return; }
      if (els.tagsModal && !els.tagsModal.hidden) { closeTagsModal(); return; }
      if (els.timeModal && !els.timeModal.hidden) closeTimeModal();
    });
  }

  renderTask();
  bindEvents();
  updateClock();
  setInterval(updateClock, 30000);
})();
