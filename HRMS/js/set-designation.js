/**
 * TIME ERP — Set Designation / View Permission Sets
 */
(function () {
  'use strict';

  var PLUS_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  var CHEVRON = '<svg class="sd-edit-perm-group__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var INFO_ICON = '<span class="sd-edit-perm-group__info" title="Info" aria-hidden="true">i</span>';

  var AVATAR_COLORS = ['#25b7a7', '#25b7a7', '#597ef7', '#9254de', '#f759ab', '#25b7a7'];

  /* Full permission map — edit accordion + Permissions → View modal */
  var PERMISSION_GROUPS = [
    {
      title: 'Manage Settings',
      items: [
        { label: 'Manage Profile', on: true },
        { label: 'View Profile', on: false },
        { label: 'Customer Portal Policy', on: false },
        { label: 'Task Settings', on: false },
        { label: 'Create Branch', on: false },
        { label: 'SMTP Configuration', on: false },
        { label: 'Manage Notification', on: false },
        { label: 'Billing Settings', on: false },
        { label: 'Show & Modify All Task', on: false },
        { label: 'Whatsapp', on: false }
      ]
    },
    {
      title: 'Customer',
      items: [
        { label: 'Create Customer', on: false },
        { label: 'View Customer', on: true },
        { label: 'Edit Customer', on: false },
        { label: 'Customer Delete/Inactive', on: false },
        { label: 'Download Utility', on: false },
        { label: 'Customer Group', on: false },
        { label: 'Create/Delete Custom Field', on: false },
        { label: 'View Customer Password', on: false },
        { label: '15 CB Form', on: false },
        { label: 'GST', on: false },
        { label: 'Cases', on: false }
      ]
    },
    {
      title: 'Employee',
      items: [
        { label: 'View Employee', on: false },
        { label: 'Create Employee', on: false },
        { label: 'Edit Employee', on: false }
      ]
    },
    {
      title: 'Communication',
      items: [
        { label: 'Send SMS', on: false },
        { label: 'Send Email', on: false },
        { label: 'IMAP', on: false },
        { label: 'Send WhatsApp', on: false },
        { label: 'Lead WhatsApp', on: false },
        { label: 'WhatsApp All', on: false },
        { label: 'WhatsApp RM', on: false },
        { label: 'Send Notification', on: false }
      ]
    },
    {
      title: 'Services',
      items: [
        { label: 'Create Service Request', on: false },
        { label: 'View Service Request', on: false },
        { label: 'Manage Service', on: false },
        { label: 'FAQ', on: true },
        { label: 'Description', on: true }
      ]
    },
    {
      title: 'Community',
      items: [
        { label: 'Access Community', on: false },
        { label: 'My Offer', on: false },
        { label: 'Transfer Work', on: false },
        { label: 'Received Work', on: false },
        { label: 'Chat', on: false },
        { label: 'Create Post', on: false }
      ]
    },
    {
      title: 'Tasks',
      items: [
        { label: 'View Task/Recurring Task', on: true },
        { label: 'Create Task/Recurring Task', on: true },
        { label: 'Task Customer', on: true },
        { label: 'Update Task Stages', on: false },
        { label: 'Task Stages', on: true },
        { label: 'Create Task For Self', on: true },
        { label: 'Create Task For Other', on: true },
        { label: 'Delete Task/Recurring Task', on: true },
        { label: 'Show Deleted Task', on: false },
        { label: 'Task Action Buttons', on: false },
        { label: 'Edit Task/Recurring Task', on: false }
      ]
    },
    {
      title: 'Edit Task',
      items: [
        { label: 'Task Name', on: false },
        { label: 'Task Assignee', on: false },
        { label: 'Task Reporter', on: false },
        { label: 'Task Consultant', on: false },
        { label: 'Task Service', on: false },
        { label: 'Task Target Date', on: false },
        { label: 'Task Priority', on: false },
        { label: 'Task Due Date', on: false },
        { label: 'Task Description', on: false },
        { label: 'Task Complete', on: false },
        { label: 'Show Completed Task', on: false },
        { label: 'Tags', on: false }
      ]
    },
    {
      title: 'Documents',
      items: [
        { label: 'Create Documents', on: false },
        { label: 'Delete Documents', on: false },
        { label: 'View Documents', on: false },
        { label: 'Share Documents', on: false },
        { label: 'Add Documents', on: false },
        { label: 'Add to Documents', on: false },
        { label: 'Add Expiry', on: false },
        { label: 'UDIN', on: false },
        { label: 'FAR View', on: false },
        { label: 'FAR Add', on: false }
      ]
    },
    {
      title: 'Billing',
      items: [
        { label: 'Access To Billing Dashboard', on: false },
        { label: 'Add Invoice', on: false },
        { label: 'View Invoice', on: false },
        { label: 'Proforma Invoice', on: false },
        { label: 'Receipts', on: false },
        { label: 'CN & DN', on: false },
        { label: 'Opening Balance', on: false },
        { label: 'Reported Transaction', on: false }
      ]
    },
    {
      title: 'HRMS',
      items: [
        { label: 'HR Management', on: false },
        { label: 'HR Appraisal Management', on: false },
        { label: 'Team Management', on: false }
      ]
    },
    {
      title: 'Payroll',
      items: [
        { label: 'Payroll Basic', on: false },
        { label: 'Verify Pay Details', on: false }
      ]
    },
    {
      title: 'Report',
      items: [
        { label: 'Feedback report', on: false },
        { label: 'Income report', on: false },
        { label: 'Revenue report', on: false },
        { label: 'Service Request report', on: false },
        { label: 'Customer report', on: false },
        { label: 'Task report', on: false },
        { label: 'Partner report', on: false },
        { label: 'Inward Outward report', on: false }
      ]
    },
    {
      title: 'Lead Management',
      items: [
        { label: 'Lead Access', on: false },
        { label: 'Lead Add', on: false }
      ]
    },
    {
      title: 'Website',
      items: [
        { label: 'Website Access', on: false }
      ]
    }
  ];

  var state = {
    view: 'list',
    editingId: null,
    nextId: 7,
    checkedIn: true,
    assignDesigId: null,
    assignSelected: [],
    deleteId: null,
    rows: [
      {
        id: 1,
        designation: 'manager- HR',
        description: 'For Interns',
        assign: [
          { type: 'photo', label: 'A' },
          { type: 'photo', label: 'B' }
        ],
        more: 0
      },
      {
        id: 2,
        designation: 'MANAGER',
        description: '---',
        assign: [
          { type: 'initials', label: 'K', color: '#597ef7' },
          { type: 'initials', label: 'HR', color: '#25b7a7' }
        ],
        more: 1
      },
      {
        id: 3,
        designation: 'CA',
        description: '---',
        assign: [],
        more: 0
      },
      {
        id: 4,
        designation: 'accountant',
        description: '---',
        assign: [
          { type: 'initials', label: 'MK', color: '#25b7a7' },
          { type: 'photo', label: 'R' }
        ],
        more: 0
      },
      {
        id: 5,
        designation: 'Intern',
        description: 'For Interns',
        assign: [
          { type: 'initials', label: 'SK', color: '#9254de' }
        ],
        more: 0
      },
      {
        id: 6,
        designation: 'Associate',
        description: '---',
        assign: [
          { type: 'initials', label: 'SR', color: '#25b7a7' },
          { type: 'initials', label: 'SK', color: '#25b7a7' }
        ],
        more: 3
      }
    ]
  };

  var els = {
    listView: document.getElementById('sdListView'),
    editView: document.getElementById('sdEditView'),
    editBack: document.getElementById('sdEditBack'),
    editTitle: document.getElementById('sdEditTitle'),
    editForm: document.getElementById('sdEditForm'),
    editName: document.getElementById('sdEditName'),
    editDesc: document.getElementById('sdEditDesc'),
    editPermList: document.getElementById('sdEditPermList'),
    body: document.getElementById('sdTableBody'),
    addBtn: document.getElementById('sdAddBtn'),
    permViewModal: document.getElementById('sdPermViewModal'),
    permViewContent: document.getElementById('sdPermViewContent'),
    empViewModal: document.getElementById('sdEmpViewModal'),
    empViewBody: document.getElementById('sdEmpViewBody'),
    assignModal: document.getElementById('sdAssignModal'),
    assignTags: document.getElementById('sdAssignTags'),
    assignSearch: document.getElementById('sdAssignSearch'),
    assignDropdown: document.getElementById('sdAssignDropdown'),
    assignSave: document.getElementById('sdAssignSave'),
    assignSelect: document.getElementById('sdAssignSelect'),
    delPop: document.getElementById('sdDelPop'),
    delNo: document.getElementById('sdDelNo'),
    delYes: document.getElementById('sdDelYes'),
    topCheckIn: document.getElementById('sdTopCheckInBtn'),
    topClock: document.getElementById('sdTopClock')
  };

  var ALL_EMPLOYEES = [
    { id: 'AN2', name: 'Tarun Gaur', code: 'AN2', label: 'Tarun Gaur (AN2)' },
    { id: 'CA4370', name: 'Saurabh Bhardwaj', code: 'CA4370', label: 'Saurabh Bhardwaj (CA4370)' },
    { id: 'KK01', name: 'Kamal Kant Sharma', code: 'KK01', label: 'Kamal Kant Sharma (KK01)' },
    { id: 'SR12', name: 'Suhanshi Rawat', code: 'SR12', label: 'Suhanshi Rawat (SR12)' },
    { id: 'MK01', name: 'Mohit Kumar', code: 'MK01', label: 'Mohit Kumar (MK01)' },
    { id: 'SK02', name: 'Suresh Kumar', code: 'SK02', label: 'Suresh Kumar (SK02)' }
  ];

  var EMP_BY_DESIGNATION = {
    1: [
      { name: 'Tarun Gaur', code: 'AN2', email: 'gsevainfo@gmail.com', branch: 'Law Seva Management Private Limited' },
      { name: 'Saurabh Bhardwaj', code: 'CA4370', email: 'info@caclouddesk.com', branch: 'Law Seva Management Private Limited' }
    ],
    2: [
      { name: 'Tarun Gaur', code: 'AN2', email: 'gsevainfo@gmail.com', branch: 'Law Seva Management Private Limited' },
      { name: 'Saurabh Bhardwaj', code: 'CA4370', email: 'info@caclouddesk.com', branch: 'Law Seva Management Private Limited' }
    ],
    3: [
      { name: 'Saurabh Bhardwaj', code: 'CA4370', email: 'info@caclouddesk.com', branch: 'Law Seva Management Private Limited' }
    ],
    4: [
      { name: 'Kamal Kant Sharma', code: 'KK01', email: 'kamal@caclouddesk.com', branch: 'CA CloudDesk' }
    ],
    5: [
      { name: 'Suhanshi Rawat', code: 'SR12', email: 'suhanshi@caclouddesk.com', branch: 'CA CloudDesk' }
    ],
    6: [
      { name: 'Tarun Gaur', code: 'AN2', email: 'gsevainfo@gmail.com', branch: 'Law Seva Management Private Limited' },
      { name: 'Saurabh Bhardwaj', code: 'CA4370', email: 'info@caclouddesk.com', branch: 'Law Seva Management Private Limited' }
    ]
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
    setTimeout(function () { el.remove(); }, 2800);
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tickClock() {
    if (!els.topClock) return;
    var d = new Date();
    els.topClock.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes());
    els.topClock.setAttribute('datetime', d.toISOString());
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showList() {
    state.view = 'list';
    state.editingId = null;
    if (els.listView) els.listView.hidden = false;
    if (els.editView) els.editView.hidden = true;
  }

  function showEdit(row) {
    state.view = 'edit';
    state.editingId = row ? row.id : null;
    if (els.editTitle) els.editTitle.textContent = row ? 'Edit Permission Set' : 'Set Designation';
    if (els.editName) els.editName.value = row ? row.designation : '';
    if (els.editDesc) els.editDesc.value = row && row.description !== '---' ? row.description : '';
    buildEditPermList(!!row);
    if (els.listView) els.listView.hidden = true;
    if (els.editView) els.editView.hidden = false;
    var page = document.getElementById('sdPage');
    if (page) page.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(function () { if (els.editName) els.editName.focus(); }, 50);
  }

  function buildEditPermList(useSampleDefaults) {
    if (!els.editPermList) return;
    var html = '';
    PERMISSION_GROUPS.forEach(function (group, gi) {
      var items = group.items || [];
      var itemsHtml = '';
      if (!items.length) {
        itemsHtml = '<div class="sd-edit-perm-empty">No permissions in this group</div>';
      } else {
        itemsHtml = '<div class="sd-edit-perm-grid">' + items.map(function (it, ii) {
          var id = 'sdEditPerm_' + gi + '_' + ii;
          var checked = useSampleDefaults && it.on ? ' checked' : '';
          return '<label class="sd-edit-perm-item" for="' + id + '">' +
            '<span class="sd-switch">' +
              '<input type="checkbox" id="' + id + '" data-perm-item data-group="' + gi + '"' + checked + '>' +
              '<span class="sd-switch__track"><span class="sd-switch__knob"></span></span>' +
            '</span>' +
            '<span class="sd-edit-perm-item__label">' + escapeHtml(it.label) + '</span>' +
            '</label>';
        }).join('') + '</div>';
      }
      var allOn = useSampleDefaults && items.length > 0 && items.every(function (it) { return !!it.on; });
      html +=
        '<div class="sd-edit-perm-group is-open" data-group-index="' + gi + '">' +
          '<div class="sd-edit-perm-group__head" data-perm-toggle>' +
            '<input type="checkbox" class="sd-edit-perm-group__check" data-group-check="' + gi + '"' +
              (allOn ? ' checked' : '') + ' aria-label="Select all ' + escapeHtml(group.title) + '">' +
            '<span class="sd-edit-perm-group__title">' + escapeHtml(group.title) + '</span>' +
            INFO_ICON +
            CHEVRON +
          '</div>' +
          '<div class="sd-edit-perm-group__body">' + itemsHtml + '</div>' +
        '</div>';
    });
    els.editPermList.innerHTML = html;
  }

  function bindEditPermList() {
    if (!els.editPermList || els.editPermList.dataset.bound === '1') return;
    els.editPermList.dataset.bound = '1';

    els.editPermList.addEventListener('click', function (e) {
      if (e.target.closest('.sd-edit-perm-group__info')) return;
      var head = e.target.closest('[data-perm-toggle]');
      if (!head || e.target.matches('[data-group-check]')) return;
      var group = head.closest('.sd-edit-perm-group');
      if (group) group.classList.toggle('is-open');
    });

    els.editPermList.addEventListener('change', function (e) {
      var t = e.target;
      if (t.matches('[data-group-check]')) {
        var gi = t.getAttribute('data-group-check');
        els.editPermList.querySelectorAll('[data-perm-item][data-group="' + gi + '"]').forEach(function (cb) {
          cb.checked = t.checked;
        });
        return;
      }
      if (t.matches('[data-perm-item]')) {
        var groupIdx = t.getAttribute('data-group');
        var items = els.editPermList.querySelectorAll('[data-perm-item][data-group="' + groupIdx + '"]');
        var allOn = true;
        items.forEach(function (cb) { if (!cb.checked) allOn = false; });
        var groupCheck = els.editPermList.querySelector('[data-group-check="' + groupIdx + '"]');
        if (groupCheck) groupCheck.checked = allOn && items.length > 0;
      }
    });
  }

  function renderAssign(row) {
    var html = '<div class="sd-assign">';
    (row.assign || []).forEach(function (a, i) {
      var color = a.color || AVATAR_COLORS[i % AVATAR_COLORS.length];
      if (a.type === 'photo') {
        html += '<span class="sd-avatar sd-avatar--photo" style="background-color:' + color + '" title="' + escapeHtml(a.label) + '">' + escapeHtml(a.label) + '</span>';
      } else {
        html += '<span class="sd-avatar" style="background:' + color + '" title="' + escapeHtml(a.label) + '">' + escapeHtml(a.label) + '</span>';
      }
    });
    if (row.more > 0) {
      html += '<span class="sd-avatar sd-avatar--more">+' + row.more + '</span>';
    }
    html += '<button type="button" class="sd-assign-add" data-assign="' + row.id + '" aria-label="Assign employee">' + PLUS_SVG + '</button>';
    html += '</div>';
    return html;
  }

  function renderTable() {
    if (!els.body) return;
    els.body.innerHTML = state.rows.map(function (r, i) {
      var desc = r.description && r.description !== '---' ? escapeHtml(r.description) : '---';
      return '<tr data-id="' + r.id + '">' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + escapeHtml(r.designation) + '</td>' +
        '<td>' + desc + '</td>' +
        '<td><button type="button" class="sd-link" data-view-perm="' + r.id + '">View</button></td>' +
        '<td><button type="button" class="sd-link" data-view-emp="' + r.id + '">View</button></td>' +
        '<td>' + renderAssign(r) + '</td>' +
        '<td><span class="sd-actions">' +
          '<button type="button" class="sd-link" data-edit="' + r.id + '">Edit</button>' +
          '<span class="sd-actions__sep">|</span>' +
          '<button type="button" class="sd-link" data-delete="' + r.id + '">Delete</button>' +
        '</span></td></tr>';
    }).join('');
  }

  function openPermViewModal() {
    if (!els.permViewContent || !els.permViewModal) return;
    els.permViewContent.innerHTML = PERMISSION_GROUPS.map(function (g) {
      var items = (g.items || []).map(function (it) {
        var on = !!it.on;
        return '<div class="sd-perm-view-item">' +
          '<span class="sd-perm-badge ' + (on ? 'sd-perm-badge--yes' : 'sd-perm-badge--no') + '">' + (on ? 'Yes' : 'No') + '</span>' +
          '<span class="sd-perm-view-item__label">' + escapeHtml(it.label) + '</span>' +
          '</div>';
      }).join('');
      return '<section class="sd-perm-view-section">' +
        '<h3 class="sd-perm-view-section__title">' + escapeHtml(g.title) + '</h3>' +
        '<div class="sd-perm-view-grid">' + items + '</div></section>';
    }).join('');
    els.permViewModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closePermViewModal() {
    if (!els.permViewModal) return;
    els.permViewModal.hidden = true;
    if (!anyModalOpen()) document.body.style.overflow = '';
  }

  function openEmpViewModal(desigId) {
    if (!els.empViewBody || !els.empViewModal) return;
    var list = EMP_BY_DESIGNATION[desigId] || [];
    if (!list.length) {
      els.empViewBody.innerHTML = '<tr><td colspan="5" class="sd-emp-empty">No employees under this job title</td></tr>';
    } else {
      els.empViewBody.innerHTML = list.map(function (emp, i) {
        return '<tr>' +
          '<td>' + (i + 1) + '</td>' +
          '<td>' + escapeHtml(emp.name) + '</td>' +
          '<td>' + escapeHtml(emp.code) + '</td>' +
          '<td>' + escapeHtml(emp.email) + '</td>' +
          '<td>' + escapeHtml(emp.branch) + '</td></tr>';
      }).join('');
    }
    els.empViewModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeEmpViewModal() {
    if (!els.empViewModal) return;
    els.empViewModal.hidden = true;
    if (!anyModalOpen()) document.body.style.overflow = '';
  }

  function anyModalOpen() {
    return (els.permViewModal && !els.permViewModal.hidden) ||
      (els.empViewModal && !els.empViewModal.hidden) ||
      (els.assignModal && !els.assignModal.hidden);
  }

  function renderAssignTags() {
    if (!els.assignTags) return;
    els.assignTags.innerHTML = state.assignSelected.map(function (emp) {
      return '<span class="sd-assign-tag" data-id="' + escapeHtml(emp.id) + '">' +
        escapeHtml(emp.label) +
        ' <button type="button" class="sd-assign-tag__x" data-remove-emp="' + escapeHtml(emp.id) + '" aria-label="Remove">&times;</button></span>';
    }).join('');
  }

  function renderAssignDropdown(q) {
    if (!els.assignDropdown) return;
    var query = (q || '').trim().toLowerCase();
    var selectedIds = {};
    state.assignSelected.forEach(function (e) { selectedIds[e.id] = 1; });
    var opts = ALL_EMPLOYEES.filter(function (e) {
      if (selectedIds[e.id]) return false;
      if (!query) return true;
      return e.label.toLowerCase().indexOf(query) !== -1;
    });
    if (!opts.length) {
      els.assignDropdown.innerHTML = '<div class="sd-assign-option" style="cursor:default;color:#9ca3af">No employees found</div>';
    } else {
      els.assignDropdown.innerHTML = opts.map(function (e) {
        return '<button type="button" class="sd-assign-option" data-pick-emp="' + escapeHtml(e.id) + '">' + escapeHtml(e.label) + '</button>';
      }).join('');
    }
    els.assignDropdown.hidden = false;
  }

  function openAssignModal(desigId) {
    if (!els.assignModal) return;
    state.assignDesigId = desigId;
    var existing = EMP_BY_DESIGNATION[desigId] || [];
    state.assignSelected = existing.map(function (e) {
      return { id: e.code, name: e.name, code: e.code, label: e.name + ' (' + e.code + ')' };
    });
    renderAssignTags();
    if (els.assignSearch) els.assignSearch.value = '';
    if (els.assignDropdown) els.assignDropdown.hidden = true;
    els.assignModal.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(function () { if (els.assignSearch) els.assignSearch.focus(); }, 40);
  }

  function closeAssignModal() {
    if (!els.assignModal) return;
    els.assignModal.hidden = true;
    state.assignDesigId = null;
    state.assignSelected = [];
    if (els.assignDropdown) els.assignDropdown.hidden = true;
    if (!anyModalOpen()) document.body.style.overflow = '';
  }

  function openDeletePop(anchor, id) {
    if (!els.delPop || !anchor) return;
    state.deleteId = id;
    els.delPop.hidden = false;
    var rect = anchor.getBoundingClientRect();
    var popW = els.delPop.offsetWidth || 260;
    var popH = els.delPop.offsetHeight || 100;
    var left = rect.right - popW;
    var top = rect.top - popH - 10;
    if (left < 8) left = 8;
    if (top < 8) top = rect.bottom + 10;
    els.delPop.style.left = left + 'px';
    els.delPop.style.top = top + 'px';
  }

  function closeDeletePop() {
    if (!els.delPop) return;
    els.delPop.hidden = true;
    state.deleteId = null;
  }

  function confirmDelete() {
    var did = state.deleteId;
    if (did == null) return;
    state.rows = state.rows.filter(function (r) { return r.id !== did; });
    closeDeletePop();
    renderTable();
    toast('Deleted', 'Permission set removed.');
  }

  function bind() {
    if (els.addBtn) els.addBtn.addEventListener('click', function () { showEdit(null); });
    if (els.editBack) els.editBack.addEventListener('click', showList);
    bindEditPermList();

    if (els.delNo) els.delNo.addEventListener('click', function (e) { e.stopPropagation(); closeDeletePop(); });
    if (els.delYes) els.delYes.addEventListener('click', function (e) { e.stopPropagation(); confirmDelete(); });
    if (els.delPop) els.delPop.addEventListener('click', function (e) { e.stopPropagation(); });

    document.querySelectorAll('[data-perm-view-close]').forEach(function (el) {
      el.addEventListener('click', closePermViewModal);
    });
    document.querySelectorAll('[data-emp-view-close]').forEach(function (el) {
      el.addEventListener('click', closeEmpViewModal);
    });
    document.querySelectorAll('[data-assign-close]').forEach(function (el) {
      el.addEventListener('click', closeAssignModal);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (els.delPop && !els.delPop.hidden) {
        closeDeletePop();
        return;
      }
      if (els.assignModal && !els.assignModal.hidden) {
        closeAssignModal();
        return;
      }
      if (els.empViewModal && !els.empViewModal.hidden) {
        closeEmpViewModal();
        return;
      }
      if (els.permViewModal && !els.permViewModal.hidden) {
        closePermViewModal();
        return;
      }
      if (state.view === 'edit') showList();
    });

    document.addEventListener('click', function () {
      if (els.delPop && !els.delPop.hidden) closeDeletePop();
    });
    if (els.body) {
      els.body.addEventListener('click', function (e) {
        var edit = e.target.closest('[data-edit]');
        if (edit) {
          var id = +edit.getAttribute('data-edit');
          var row = state.rows.filter(function (r) { return r.id === id; })[0];
          if (row) showEdit(row);
          return;
        }
        var del = e.target.closest('[data-delete]');
        if (del) {
          e.preventDefault();
          e.stopPropagation();
          openDeletePop(del, +del.getAttribute('data-delete'));
          return;
        }
        if (e.target.closest('[data-view-perm]')) {
          openPermViewModal();
          return;
        }
        if (e.target.closest('[data-view-emp]')) {
          var empBtn = e.target.closest('[data-view-emp]');
          openEmpViewModal(+empBtn.getAttribute('data-view-emp'));
          return;
        }
        var assign = e.target.closest('[data-assign]');
        if (assign) {
          openAssignModal(+assign.getAttribute('data-assign'));
          return;
        }
      });
    }

    if (els.assignSelect) {
      els.assignSelect.addEventListener('click', function () {
        if (els.assignSearch) els.assignSearch.focus();
        renderAssignDropdown(els.assignSearch ? els.assignSearch.value : '');
      });
    }
    if (els.assignSearch) {
      els.assignSearch.addEventListener('focus', function () {
        renderAssignDropdown(els.assignSearch.value);
      });
      els.assignSearch.addEventListener('input', function () {
        renderAssignDropdown(els.assignSearch.value);
      });
    }
    if (els.assignTags) {
      els.assignTags.addEventListener('click', function (e) {
        var rem = e.target.closest('[data-remove-emp]');
        if (!rem) return;
        var rid = rem.getAttribute('data-remove-emp');
        state.assignSelected = state.assignSelected.filter(function (x) { return x.id !== rid; });
        renderAssignTags();
        renderAssignDropdown(els.assignSearch ? els.assignSearch.value : '');
      });
    }
    if (els.assignDropdown) {
      els.assignDropdown.addEventListener('click', function (e) {
        var pick = e.target.closest('[data-pick-emp]');
        if (!pick) return;
        var pid = pick.getAttribute('data-pick-emp');
        var emp = ALL_EMPLOYEES.filter(function (x) { return x.id === pid; })[0];
        if (!emp) return;
        state.assignSelected.push(emp);
        renderAssignTags();
        if (els.assignSearch) els.assignSearch.value = '';
        renderAssignDropdown('');
      });
    }
    document.addEventListener('click', function (e) {
      if (!els.assignDropdown || els.assignDropdown.hidden) return;
      if (els.assignSelect && els.assignSelect.contains(e.target)) return;
      els.assignDropdown.hidden = true;
    });
    if (els.assignSave) {
      els.assignSave.addEventListener('click', function () {
        var id = state.assignDesigId;
        if (!id) return;
        EMP_BY_DESIGNATION[id] = state.assignSelected.map(function (e) {
          return {
            name: e.name,
            code: e.code || e.id,
            email: (e.code || e.id) + '@caclouddesk.com',
            branch: 'Law Seva Management Private Limited'
          };
        });
        var row = state.rows.filter(function (r) { return r.id === id; })[0];
        if (row) {
          var selected = state.assignSelected.slice();
          row.assign = selected.slice(0, 2).map(function (e, i) {
            var initials = (e.name || '').split(/\s+/).map(function (p) { return p.charAt(0); }).join('').slice(0, 2).toUpperCase() || 'E';
            return { type: 'initials', label: initials, color: AVATAR_COLORS[i % AVATAR_COLORS.length] };
          });
          row.more = Math.max(0, selected.length - 2);
        }
        closeAssignModal();
        renderTable();
        toast('Added', 'Employees assigned to this job role.');
      });
    }

    if (els.editForm) {
      els.editForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = (els.editName.value || '').trim();
        if (!name) {
          toast('Required', 'Designation is required.');
          return;
        }
        var description = (els.editDesc.value || '').trim() || '---';
        if (state.editingId) {
          state.rows = state.rows.map(function (r) {
            if (r.id !== state.editingId) return r;
            return Object.assign({}, r, { designation: name, description: description });
          });
          toast('Saved', 'Designation updated.');
        } else {
          state.rows.push({
            id: state.nextId++,
            designation: name,
            description: description,
            assign: [],
            more: 0
          });
          toast('Saved', 'Designation added.');
        }
        renderTable();
        showList();
      });
    }

    if (els.topCheckIn) {
      els.topCheckIn.addEventListener('click', function () {
        state.checkedIn = !state.checkedIn;
        els.topCheckIn.textContent = state.checkedIn ? 'Check Out' : 'Check In';
        els.topCheckIn.classList.toggle('is-out', state.checkedIn);
        els.topCheckIn.classList.toggle('is-in', !state.checkedIn);
      });
    }
  }

  bind();
  renderTable();
  showList();
  tickClock();
  setInterval(tickClock, 30000);
})();
