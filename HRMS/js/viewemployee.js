/**
 * TIME ERP — View Employee (tabs, directory, modals, hierarchy)
 */
(function () {
  'use strict';

  var EMPLOYEES = [
    { id: 'ERP01', name: 'Dev Aggarwal', email: '000aggarwal@gmail.com', mobile: '8171082760', department: '--', joining: '06/01/2026', designation: 'Manager', status: 'Active', allowEmail: 'Yes', allowSms: 'Yes', allowNotif: 'Yes', pendingNoDues: '-', portal: true, avatar: 'icon' },
    { id: 'SA2', name: 'Saurabh Bhardwaj', email: 'info@timeerp.in', mobile: '9876543210', department: '--', joining: '15/03/2025', designation: 'Manager', status: 'Active', allowEmail: 'Yes', allowSms: 'Yes', allowNotif: 'Yes', pendingNoDues: '-', portal: true, avatar: 'SB' },
    { id: 'KA1', name: 'Kamal Sharma', email: 'cakamal9758@gmail.com', mobile: '9758123456', department: '--', joining: '01/06/2025', designation: 'Manager', status: 'Active', allowEmail: 'Yes', allowSms: 'Yes', allowNotif: 'Yes', pendingNoDues: '-', portal: false, avatar: 'KS' },
    { id: 'ERP02', name: 'Ankur Gupta', email: 'ankur@timeerp.com', mobile: '9123456780', department: '--', joining: '30/07/2026', designation: 'Manager', status: 'Active', allowEmail: 'Yes', allowSms: 'Yes', allowNotif: 'Yes', pendingNoDues: '-', portal: true, avatar: 'AG' }
  ];

  var DESIG_OPTIONS = ['Manager', 'Executive', 'Associate', 'Intern'];

  var ICONS = {
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/><path d="M6.5 7l.8 12.2A1.5 1.5 0 008.8 20.5h6.4a1.5 1.5 0 001.5-1.3L17.5 7"/><path d="M10 11v6M14 11v6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.2l2.3 2.3 4.7-4.8"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15.2 5.3l3.5 3.5"/><path d="M4 20l4.1-.9L18.9 8.3a1.8 1.8 0 00-2.5-2.5L5.6 16.6 4 20z"/><path d="M13.5 20H20"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="M11.5 12.5L20 4M17 4h3v3"/></svg>',
    sync: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 12a8.5 8.5 0 11-2.3-5.8"/><path d="M20.5 4.5v5h-5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2.5" width="8" height="19" rx="2"/><path d="M11 18.5h2"/></svg>',
    ban: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M7 7l10 10"/></svg>',
    person: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4z"/></svg>',
    eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A9.8 9.8 0 0112 5c5 0 9.3 3.1 11 7-.5 1.2-1.2 2.3-2.1 3.2M6.1 6.1C4.4 7.3 3.1 8.9 2.1 11c1.7 3.9 6 7 9.9 7 1.3 0 2.6-.3 3.8-.7"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'
  };

  var state = {
    tab: 'employee',
    page: 1,
    pageSize: 10,
    sortKey: null,
    sortDir: 'asc',
    addStep: 0,
    rows: EMPLOYEES.map(function (e) { return Object.assign({}, e); })
  };

  function $(id) { return document.getElementById(id); }

  function closeTeamMenus() {
    document.querySelectorAll('.ve-team-dropdown').forEach(function (d) { d.hidden = true; });
    document.querySelectorAll('[data-team-menu]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
  }

  function toast(title, detail) {
    if (window.DashboardShell && window.DashboardShell.toast) {
      window.DashboardShell.toast(title, detail || '');
      return;
    }
    var stack = $('toastStack');
    if (!stack) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<strong>' + title + '</strong>' + (detail ? '<span>' + detail + '</span>' : '');
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 2800);
  }

  function initials(name) {
    return (name || '').split(/\s+/).map(function (p) { return p.charAt(0); }).join('').slice(0, 2).toUpperCase();
  }

  function parseJoining(d) {
    var p = (d || '').split('/');
    if (p.length !== 3) return 0;
    return new Date(+p[2], +p[1] - 1, +p[0]).getTime();
  }

  function getFiltered() {
    var q = (($('veEmpSearch') && $('veEmpSearch').value) || '').trim().toLowerCase();
    var dept = ($('veEmpDept') && $('veEmpDept').value) || '';
    var branch = ($('veEmpBranch') && $('veEmpBranch').value) || '';
    var desig = ($('veEmpDesig') && $('veEmpDesig').value) || '';
    var status = ($('veEmpStatus') && $('veEmpStatus').value) || '';
    var list = state.rows.filter(function (r) {
      if (q && r.name.toLowerCase().indexOf(q) < 0 && r.email.toLowerCase().indexOf(q) < 0 && r.id.toLowerCase().indexOf(q) < 0) return false;
      if (dept && dept !== 'All' && r.department !== dept && r.department !== '--') return false;
      if (desig && desig !== 'All' && r.designation !== desig) return false;
      if (status && status !== 'All' && r.status !== status) return false;
      if (branch && branch !== 'All') return true;
      return true;
    });
    if (state.sortKey) {
      var key = state.sortKey;
      var dir = state.sortDir === 'asc' ? 1 : -1;
      list = list.slice().sort(function (a, b) {
        var av = a[key], bv = b[key];
        if (key === 'joining') { av = parseJoining(a.joining); bv = parseJoining(b.joining); return (av - bv) * dir; }
        av = (av == null ? '' : String(av)).toLowerCase();
        bv = (bv == null ? '' : String(bv)).toLowerCase();
        if (av < bv) return -1 * dir;
        if (av > bv) return 1 * dir;
        return 0;
      });
    }
    return list;
  }

  function avatarHtml(row) {
    if (row.avatar === 'icon') {
      return '<span class="ve-avatar ve-avatar--green" aria-hidden="true">' + ICONS.person + '</span>';
    }
    return '<span class="ve-avatar" aria-hidden="true">' + (row.avatar || initials(row.name)) + '</span>';
  }

  function desigSelect(row) {
    var opts = DESIG_OPTIONS.map(function (d) {
      return '<option value="' + d + '"' + (d === row.designation ? ' selected' : '') + '>' + d + '</option>';
    }).join('');
    return '<select class="ve-desig-select" data-id="' + row.id + '" aria-label="Designation">' + opts + '</select>';
  }

  function actionBtns(row) {
    return '<div class="ve-actions">' +
      '<button type="button" class="ve-act ve-act--trash" data-act="delete" data-id="' + row.id + '" title="Delete" aria-label="Delete">' + ICONS.trash + '</button>' +
      '<button type="button" class="ve-act ve-act--check" data-act="verify" data-id="' + row.id + '" title="Verify" aria-label="Verify">' + ICONS.check + '</button>' +
      '<button type="button" class="ve-act ve-act--edit" data-act="edit" data-id="' + row.id + '" title="Edit" aria-label="Edit">' + ICONS.edit + '</button>' +
      '<button type="button" class="ve-act ve-act--key" data-act="password" data-id="' + row.id + '" title="Reset Password" aria-label="Reset Password">' + ICONS.key + '</button>' +
      '<button type="button" class="ve-act ve-act--sync" data-act="reset2fa" data-id="' + row.id + '" title="Reset 2FA" aria-label="Reset 2FA">' + ICONS.sync + '</button>' +
      '<button type="button" class="ve-act ve-act--phone" data-act="device" data-id="' + row.id + '" title="Reset Device" aria-label="Reset Device">' + ICONS.phone + '</button>' +
      '<button type="button" class="ve-act ve-act--ban" data-act="exclude2fa" data-id="' + row.id + '" title="Exclude from 2FA" aria-label="Exclude from 2FA">' + ICONS.ban + '</button>' +
      '</div>';
  }

  function findEmployee(id) {
    for (var i = 0; i < state.rows.length; i++) {
      if (state.rows[i].id === id) return state.rows[i];
    }
    return null;
  }

  function closeConfirm() {
    var pop = $('veConfirmPop');
    if (pop) {
      pop.hidden = true;
      pop.removeAttribute('data-confirm-act');
      pop.removeAttribute('data-confirm-id');
    }
  }

  function openConfirm(btn, title, message) {
    var pop = $('veConfirmPop');
    if (!pop || !btn) return;
    var msg = $('veConfirmMsg');
    var ttl = $('veConfirmTitle');
    if (ttl) {
      ttl.textContent = title || '';
      ttl.hidden = !title || title === message;
    }
    if (msg) msg.textContent = message || '';
    pop.setAttribute('data-confirm-act', btn.getAttribute('data-act') || '');
    pop.setAttribute('data-confirm-id', btn.getAttribute('data-id') || '');
    pop.hidden = false;

    var rect = btn.getBoundingClientRect();
    var popW = 280;
    var left = Math.min(window.innerWidth - popW - 12, Math.max(12, rect.left - 200));
    var top = Math.max(12, rect.top - 10);
    if (top + 140 > window.innerHeight) top = Math.max(12, rect.bottom - 140);
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
  }

  function fillDeleteReplacement(excludeId) {
    var sel = $('veDelReplace');
    if (!sel) return;
    var opts = '<option value="">Select Replacement</option>';
    state.rows.forEach(function (r) {
      if (r.id === excludeId) return;
      opts += '<option value="' + r.id + '">' + r.name + '</option>';
    });
    sel.innerHTML = opts;
  }

  function openDeleteModal(id) {
    fillDeleteReplacement(id);
    var modal = $('veDeleteModal');
    if (modal) modal.setAttribute('data-emp-id', id || '');
    var date = $('veDelLastDate');
    var remark = $('veDelRemark');
    if (date) date.value = '';
    if (remark) remark.value = '';
    openModal(modal);
  }

  function openPasswordModal(id) {
    var modal = $('vePasswordModal');
    if (modal) modal.setAttribute('data-emp-id', id || '');
    var p1 = $('veNewPass');
    var p2 = $('veConfirmPass');
    if (p1) { p1.value = ''; p1.type = 'password'; }
    if (p2) { p2.value = ''; p2.type = 'password'; }
    openModal(modal);
  }

  function handleAction(act, id, btn) {
    if (act === 'edit') {
      window.location.href = 'employee_profile.html?id=' + encodeURIComponent(id || '');
      return;
    }
    if (act === 'delete') { openDeleteModal(id); return; }
    if (act === 'password') { openPasswordModal(id); return; }
    if (act === 'reset2fa') {
      openConfirm(btn, '', 'Are you sure you want to reset 2FA for this employee?');
      return;
    }
    if (act === 'device') {
      openConfirm(btn, '', 'Reset Device');
      return;
    }
    if (act === 'exclude2fa') {
      openConfirm(btn, '', 'Are you sure you want to exclude this user from 2FA?');
      return;
    }
    if (act === 'verify') {
      var emp = findEmployee(id);
      toast('Verified', emp ? emp.name : id);
    }
  }

  function renderEmployeeTable() {
    var list = getFiltered();
    var total = list.length;
    var pages = Math.max(1, Math.ceil(total / state.pageSize) || 1);
    if (state.page > pages) state.page = pages;
    var start = (state.page - 1) * state.pageSize;
    var slice = list.slice(start, start + state.pageSize);
    var body = $('veEmpBody');
    var empty = $('veEmpEmpty');
    if (!body) return;

    if (!slice.length) {
      body.innerHTML = '';
      if (empty) empty.hidden = false;
    } else {
      if (empty) empty.hidden = true;
      body.innerHTML = slice.map(function (r) {
        return '<tr data-id="' + r.id + '">' +
          '<td><input type="checkbox" class="ve-row-check" aria-label="Select ' + r.name + '"></td>' +
          '<td><div class="ve-emp-cell">' + avatarHtml(r) +
            '<div class="ve-emp-meta"><span class="ve-emp-code">' + r.id + '</span><span class="ve-emp-name">' + r.name + '</span></div></div></td>' +
          '<td>' + r.email + '</td>' +
          '<td>' + r.mobile + '</td>' +
          '<td>' + r.department + '</td>' +
          '<td>' + r.joining + '</td>' +
          '<td>' + desigSelect(r) + '</td>' +
          '<td><span class="ve-pill ve-pill--' + (r.status === 'Active' ? 'active' : 'inactive') + '">' + r.status + '</span></td>' +
          '<td class="ve-yn">' + r.allowEmail + '</td>' +
          '<td class="ve-yn">' + r.allowSms + '</td>' +
          '<td class="ve-yn">' + r.allowNotif + '</td>' +
          '<td>' + r.pendingNoDues + '</td>' +
          '<td><label class="ve-toggle"><input type="checkbox" class="ve-portal" data-id="' + r.id + '"' + (r.portal ? ' checked' : '') + '><span></span></label></td>' +
          '<td>' + actionBtns(r) + '</td>' +
          '</tr>';
      }).join('');
    }

    var countLabel = $('veEmpCountLabel');
    if (countLabel) countLabel.textContent = total + ' record' + (total === 1 ? '' : 's');
    var pageInput = $('veEmpPageInput');
    var pageOf = $('veEmpPageOf');
    var pageCount = $('veEmpPageCount');
    var prev = $('veEmpPrev');
    var next = $('veEmpNext');
    if (pageInput) pageInput.value = String(state.page);
    if (pageOf) pageOf.textContent = 'of ' + pages;
    if (pageCount) pageCount.textContent = total + ' / ' + total;
    if (prev) prev.disabled = state.page <= 1;
    if (next) next.disabled = state.page >= pages;

    document.querySelectorAll('#veEmpTable th.is-sortable').forEach(function (th) {
      th.classList.remove('sort-asc', 'sort-desc');
      if (th.getAttribute('data-sort') === state.sortKey) th.classList.add(state.sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
    });

    var selectAll = $('veEmpSelectAll');
    if (selectAll) selectAll.checked = false;
  }

  function renderHeaderActions() {
    var wrap = $('veHeaderActions');
    if (!wrap) return;
    var tab = state.tab;
    var html = '';
    if (tab === 'employee') {
      html = '<button type="button" class="ve-btn ve-btn--outline" id="veApplyChanges">Apply Changes</button>' +
        '<button type="button" class="ve-plus-btn" id="veAddEmpBtn" aria-label="Add Employee">+</button>';
    } else if (tab === 'freelancers') {
      html = '<button type="button" class="ve-btn ve-btn--outline" id="veAllowNotif">Allow Notification</button>' +
        '<button type="button" class="ve-plus-btn" id="veAddFlBtn" aria-label="Add Freelancer">+</button>';
    } else if (tab === 'deleted') {
      html = '<button type="button" class="ve-btn ve-btn--outline" id="veAllowNotif">Allow Notification</button>';
    } else if (tab === 'team') {
      html = '<button type="button" class="ve-plus-btn" id="veAddTeamBtn" aria-label="Add Team">+</button>';
    }
    wrap.innerHTML = html;
  }

  function switchTab(tab) {
    state.tab = tab;
    document.querySelectorAll('.ve-tab').forEach(function (btn) {
      var on = btn.getAttribute('data-tab') === tab;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('.ve-panel').forEach(function (panel) {
      var on = panel.getAttribute('data-panel') === tab;
      panel.classList.toggle('is-active', on);
      panel.hidden = !on;
    });
    renderHeaderActions();
  }

  function openModal(el) {
    if (!el) return;
    el.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal(el) {
    if (!el) return;
    el.hidden = true;
    if (!document.querySelector('.ve-modal-scrim:not([hidden])')) document.body.style.overflow = '';
  }

  function closeAllModals() {
    closeModal($('veAddEmpModal'));
    closeModal($('veAddTeamModal'));
    closeModal($('veDeleteModal'));
    closeModal($('vePasswordModal'));
    closeConfirm();
    document.body.style.overflow = '';
  }

  function setAddStep(step) {
    state.addStep = step;
    document.querySelectorAll('.ve-step').forEach(function (s) {
      var n = +s.getAttribute('data-step');
      s.classList.toggle('is-active', n === step);
      s.classList.toggle('is-done', n < step);
    });
    document.querySelectorAll('.ve-add-step').forEach(function (p) {
      var n = +p.getAttribute('data-step-panel');
      var on = n === step;
      p.classList.toggle('is-active', on);
      p.hidden = !on;
    });
    var nextBtn = $('veAddEmpNext');
    if (nextBtn) nextBtn.textContent = step >= 5 ? 'Save' : 'Next';
  }

  function openAddEmployee() {
    window.location.href = 'add_employee.html';
  }

  function openAddTeam() {
    var form = $('veAddTeamForm');
    if (form) form.reset();
    openModal($('veAddTeamModal'));
  }

  function bindDisabilityLabel() {
    var form = $('veAddEmpForm');
    if (!form) return;
    var cb = form.querySelector('[name="disability"]');
    var label = form.querySelector('.ve-switch-label');
    if (!cb || !label) return;
    function sync() { label.textContent = cb.checked ? 'Yes' : 'No'; }
    cb.addEventListener('change', sync);
    sync();
  }

  function onPageClick(e) {
    var t = e.target.closest('[data-tab]');
    if (t && t.classList.contains('ve-tab')) {
      switchTab(t.getAttribute('data-tab'));
      return;
    }

    if (e.target.closest('#veApplyChanges')) { toast('Apply Changes', 'Changes queued (UI preview).'); return; }
    if (e.target.closest('#veAllowNotif')) { toast('Allow Notification', 'Notification preference updated.'); return; }
    if (e.target.closest('#veAddEmpBtn') || e.target.closest('#veAddFlBtn')) { openAddEmployee(); return; }
    if (e.target.closest('#veAddTeamBtn')) { openAddTeam(); return; }
    if (e.target.closest('#veEmpExcel')) { toast('Export Excel', 'Employee directory export started.'); return; }
    if (e.target.closest('#veEmpReset')) {
      if ($('veEmpSearch')) $('veEmpSearch').value = '';
      ['veEmpDept', 'veEmpBranch', 'veEmpDesig', 'veEmpStatus'].forEach(function (id) {
        var el = $(id); if (el) el.selectedIndex = 0;
      });
      state.page = 1;
      renderEmployeeTable();
      toast('Filters reset');
      return;
    }
    if (e.target.closest('#veFlReset') || e.target.closest('#veDelReset')) {
      var panel = e.target.closest('.ve-panel');
      if (panel) {
        panel.querySelectorAll('input[type="search"]').forEach(function (i) { i.value = ''; });
        panel.querySelectorAll('select').forEach(function (s) { if (!s.classList.contains('ve-page-size')) s.selectedIndex = 0; });
      }
      toast('Filters reset');
      return;
    }

    var viewAll = e.target.closest('.ve-view-all');
    if (viewAll) {
      e.preventDefault();
      toast(viewAll.getAttribute('data-toast') || 'View all');
      return;
    }

    var retrieveBtn = e.target.closest('.ve-retrieve-btn');
    if (retrieveBtn) {
      toast('Retrieve', retrieveBtn.getAttribute('data-toast') || 'Employee restored (preview).');
      return;
    }

    var sortTh = e.target.closest('th.is-sortable');
    if (sortTh && sortTh.closest('#veEmpTable')) {
      var key = sortTh.getAttribute('data-sort');
      if (state.sortKey === key) state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      else { state.sortKey = key; state.sortDir = 'asc'; }
      renderEmployeeTable();
      return;
    }

    if (e.target.closest('#veEmpPrev')) {
      if (state.page > 1) { state.page--; renderEmployeeTable(); }
      return;
    }
    if (e.target.closest('#veEmpNext')) {
      var pages = Math.max(1, Math.ceil(getFiltered().length / state.pageSize));
      if (state.page < pages) { state.page++; renderEmployeeTable(); }
      return;
    }

    var act = e.target.closest('.ve-act');
    if (act) {
      handleAction(act.getAttribute('data-act'), act.getAttribute('data-id'), act);
      return;
    }

    if (e.target.closest('#veDeleteClose') || e.target === $('veDeleteModal')) { closeModal($('veDeleteModal')); return; }
    if (e.target.closest('#veDeleteCancel')) { closeModal($('veDeleteModal')); return; }
    if (e.target.closest('#veDeleteSubmit')) {
      var delId = ($('veDeleteModal') && $('veDeleteModal').getAttribute('data-emp-id')) || '';
      state.rows = state.rows.filter(function (r) { return r.id !== delId; });
      closeModal($('veDeleteModal'));
      renderEmployeeTable();
      toast('Employee deleted', delId);
      return;
    }

    if (e.target.closest('#vePasswordClose') || e.target === $('vePasswordModal')) { closeModal($('vePasswordModal')); return; }
    if (e.target.closest('#vePasswordSubmit')) {
      var p1 = $('veNewPass');
      var p2 = $('veConfirmPass');
      var v1 = (p1 && p1.value) || '';
      var v2 = (p2 && p2.value) || '';
      if (!v1 || !v2) { toast('Required', 'Enter password and confirm password.'); return; }
      if (v1 !== v2) { toast('Mismatch', 'Passwords do not match.'); return; }
      closeModal($('vePasswordModal'));
      toast('Password reset', 'Password updated successfully.');
      return;
    }

    var eyeBtn = e.target.closest('[data-toggle-pass]');
    if (eyeBtn) {
      var input = $(eyeBtn.getAttribute('data-toggle-pass'));
      if (input) input.type = input.type === 'password' ? 'text' : 'password';
      return;
    }

    if (e.target.closest('#veConfirmNo')) { closeConfirm(); return; }
    if (e.target.closest('#veConfirmYes')) {
      var pop = $('veConfirmPop');
      var cAct = pop && pop.getAttribute('data-confirm-act');
      var cId = pop && pop.getAttribute('data-confirm-id');
      closeConfirm();
      if (cAct === 'reset2fa') toast('2FA reset', cId);
      else if (cAct === 'device') toast('Device reset', cId);
      else if (cAct === 'exclude2fa') toast('Excluded from 2FA', cId);
      return;
    }

    if (!e.target.closest('#veConfirmPop') && !e.target.closest('.ve-act')) closeConfirm();

    var toggle = e.target.closest('[data-toggle]');
    if (toggle) {
      var node = document.querySelector('.ve-team-node[data-node="' + toggle.getAttribute('data-toggle') + '"]') ||
        document.querySelector('.ve-org-node[data-node="' + toggle.getAttribute('data-toggle') + '"]');
      if (node) {
        var collapsed = node.classList.contains('is-collapsed');
        if (collapsed) {
          node.classList.remove('is-collapsed');
          node.classList.add('is-expanded');
          toggle.textContent = '−';
          toggle.setAttribute('aria-label', 'Collapse');
        } else {
          node.classList.add('is-collapsed');
          node.classList.remove('is-expanded');
          toggle.textContent = '+';
          toggle.setAttribute('aria-label', 'Expand');
        }
      }
      return;
    }

    if (e.target.closest('#veTeamExpandAll')) {
      document.querySelectorAll('#veOrgTree .ve-team-node').forEach(function (n) {
        n.classList.remove('is-collapsed');
        n.classList.add('is-expanded');
        var btn = n.querySelector(':scope > .ve-team-org > .ve-team-toggle, :scope > .ve-team-box > .ve-team-box__head > .ve-team-toggle');
        if (btn) { btn.textContent = '−'; btn.setAttribute('aria-label', 'Collapse'); }
      });
      toast('Expand All', 'All teams expanded.');
      return;
    }

    var teamAct = e.target.closest('[data-team-act]');
    if (teamAct) {
      var tAct = teamAct.getAttribute('data-team-act');
      var tName = teamAct.getAttribute('data-team') || 'team';
      closeTeamMenus();
      if (tAct === 'edit') {
        openAddTeam();
        var nameInput = $('veTeamName');
        if (nameInput) nameInput.value = tName;
        toast('Edit team', tName);
      } else if (tAct === 'delete') {
        toast('Team deleted', tName);
        var node = document.querySelector('.ve-team-node[data-node="' + tName + '"]');
        if (node) node.remove();
      }
      return;
    }

    var teamMenuBtn = e.target.closest('[data-team-menu]');
    if (teamMenuBtn) {
      var drop = teamMenuBtn.parentElement && teamMenuBtn.parentElement.querySelector('.ve-team-dropdown');
      var open = drop && !drop.hidden;
      closeTeamMenus();
      if (drop && !open) {
        drop.hidden = false;
        teamMenuBtn.setAttribute('aria-expanded', 'true');
      }
      return;
    }

    if (!e.target.closest('.ve-team-menu-wrap')) closeTeamMenus();

    var hierToggle = e.target.closest('[data-hier-toggle]');
    if (hierToggle) {
      var hNode = document.querySelector('.ve-hier-node[data-hier="' + hierToggle.getAttribute('data-hier-toggle') + '"]');
      if (hNode) {
        var open = hNode.classList.toggle('is-expanded');
        hierToggle.setAttribute('aria-label', open ? 'Collapse' : 'Expand');
        hierToggle.setAttribute('title', open ? 'Collapse' : 'Expand');
      }
      return;
    }

    if (e.target.closest('#veHierExpandAll')) {
      document.querySelectorAll('#veHier .ve-hier-node').forEach(function (n) {
        n.classList.add('is-expanded');
        var caret = n.querySelector(':scope > .ve-hier-card > .ve-hier-caret');
        if (caret) {
          caret.setAttribute('aria-label', 'Collapse');
          caret.setAttribute('title', 'Collapse');
        }
      });
      toast('Expand All', 'Hierarchy expanded.');
      return;
    }

    if (e.target.closest('#veAddEmpClose') || (e.target === $('veAddEmpModal'))) { closeModal($('veAddEmpModal')); return; }
    if (e.target.closest('#veAddTeamClose') || (e.target === $('veAddTeamModal'))) { closeModal($('veAddTeamModal')); return; }
    if (e.target.closest('#veAddDesignation')) { toast('+ Designation', 'Open designation manager.'); return; }
    if (e.target.closest('#veUploadPhoto')) { toast('Upload Profile Picture'); return; }

    if (e.target.closest('#veAddEmpNext')) {
      if (state.addStep >= 5) {
        toast('Employee saved', 'UI preview — connect backend when ready.');
        closeModal($('veAddEmpModal'));
      } else {
        toast('Step ' + (state.addStep + 1) + ' saved');
        setAddStep(state.addStep + 1);
      }
      return;
    }

    var stepBtn = e.target.closest('.ve-step');
    if (stepBtn && stepBtn.closest('#veAddStepper')) {
      setAddStep(+stepBtn.getAttribute('data-step'));
      return;
    }

    if (e.target.closest('.ve-kebab')) { toast('Team menu'); return; }
  }

  function onChange(e) {
    var t = e.target;
    if (t.id === 'veEmpSearch' || t.id === 'veEmpDept' || t.id === 'veEmpBranch' || t.id === 'veEmpDesig' || t.id === 'veEmpStatus') {
      state.page = 1;
      renderEmployeeTable();
      return;
    }
    if (t.id === 'veEmpPageSize') {
      state.pageSize = parseInt(t.value, 10) || 10;
      state.page = 1;
      renderEmployeeTable();
      return;
    }
    if (t.id === 'veEmpSelectAll') {
      document.querySelectorAll('#veEmpBody .ve-row-check').forEach(function (c) { c.checked = t.checked; });
      return;
    }
    if (t.classList.contains('ve-portal')) {
      var id = t.getAttribute('data-id');
      state.rows.forEach(function (r) { if (r.id === id) r.portal = t.checked; });
      toast('Portal Access', (t.checked ? 'Enabled' : 'Disabled') + ' for ' + id);
      return;
    }
    if (t.classList.contains('ve-desig-select')) {
      var did = t.getAttribute('data-id');
      state.rows.forEach(function (r) { if (r.id === did) r.designation = t.value; });
      return;
    }
  }

  function onTeamSave(e) {
    e.preventDefault();
    var name = ($('veTeamName') && $('veTeamName').value || '').trim();
    var incharge = ($('veTeamIncharge') && $('veTeamIncharge').value) || '';
    var members = ($('veTeamMembers') && $('veTeamMembers').value) || '';
    if (!name || !incharge || !members) {
      toast('Validation', 'Team Name, Incharge, and Members are required.');
      return;
    }
    toast('Team saved', name);
    closeModal($('veAddTeamModal'));
  }

  function init() {
    renderHeaderActions();
    renderEmployeeTable();
    bindDisabilityLabel();

    document.addEventListener('click', onPageClick);
    document.addEventListener('change', onChange);
    document.addEventListener('input', function (e) {
      if (e.target && e.target.id === 'veEmpSearch') {
        state.page = 1;
        renderEmployeeTable();
      }
    });

    var teamForm = $('veAddTeamForm');
    if (teamForm) teamForm.addEventListener('submit', onTeamSave);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAllModals();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
