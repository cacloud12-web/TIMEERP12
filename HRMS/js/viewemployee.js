/**
 * TIME ERP — Employee Management (viewemployee.html)
 */
(function () {
  'use strict';

  var EMPLOYEES = [
    { id: 'EMP-001', name: 'Ananya Sharma', email: 'ananya@timeerp.com', phone: '+91 98765 43210', dept: 'Engineering', designation: 'Senior Developer', location: 'Ghaziabad', type: 'Full-time', status: 'active', manager: 'Rahul Kapoor', joined: '2022-03-15', leaveBal: 12, salary: '₹14 LPA' },
    { id: 'EMP-002', name: 'Rahul Kapoor', email: 'rahul@timeerp.com', phone: '+91 98765 43211', dept: 'Engineering', designation: 'Tech Lead', location: 'Remote', type: 'Full-time', status: 'active', manager: 'Priya Mehta', joined: '2021-06-01', leaveBal: 8, salary: '₹18 LPA' },
    { id: 'EMP-003', name: 'Priya Mehta', email: 'priya@timeerp.com', phone: '+91 98765 43212', dept: 'HR', designation: 'HR Manager', location: 'Ghaziabad', type: 'Full-time', status: 'active', manager: 'Admin', joined: '2020-01-10', leaveBal: 10, salary: '₹12 LPA' },
    { id: 'EMP-004', name: 'Vikram Singh', email: 'vikram@timeerp.com', phone: '+91 98765 43213', dept: 'Sales', designation: 'Sales Executive', location: 'Delhi NCR', type: 'Full-time', status: 'leave', manager: 'Priya Mehta', joined: '2023-08-20', leaveBal: 5, salary: '₹8 LPA' },
    { id: 'EMP-005', name: 'Sneha Reddy', email: 'sneha@timeerp.com', phone: '+91 98765 43214', dept: 'Design', designation: 'UI/UX Designer', location: 'Remote', type: 'Full-time', status: 'active', manager: 'Rahul Kapoor', joined: '2023-02-14', leaveBal: 14, salary: '₹10 LPA' },
    { id: 'EMP-006', name: 'Amit Joshi', email: 'amit@timeerp.com', phone: '+91 98765 43215', dept: 'Engineering', designation: 'QA Engineer', location: 'Ghaziabad', type: 'Full-time', status: 'probation', manager: 'Rahul Kapoor', joined: '2025-11-01', leaveBal: 0, salary: '₹7 LPA' },
    { id: 'EMP-007', name: 'Kavita Nair', email: 'kavita@timeerp.com', phone: '+91 98765 43216', dept: 'Finance', designation: 'Accountant', location: 'Ghaziabad', type: 'Full-time', status: 'active', manager: 'Admin', joined: '2022-09-05', leaveBal: 11, salary: '₹9 LPA' },
    { id: 'EMP-008', name: 'Rohan Das', email: 'rohan@timeerp.com', phone: '+91 98765 43217', dept: 'Customer Success', designation: 'CS Executive', location: 'Remote', type: 'Full-time', status: 'notice', manager: 'Priya Mehta', joined: '2021-11-20', leaveBal: 3, salary: '₹8 LPA' },
    { id: 'EMP-009', name: 'Meera Iyer', email: 'meera@timeerp.com', phone: '+91 98765 43218', dept: 'Marketing', designation: 'Marketing Lead', location: 'Delhi NCR', type: 'Full-time', status: 'active', manager: 'Admin', joined: '2022-07-12', leaveBal: 9, salary: '₹11 LPA' },
    { id: 'EMP-010', name: 'Arjun Patel', email: 'arjun@timeerp.com', phone: '+91 98765 43219', dept: 'Engineering', designation: 'Laravel Developer', location: 'Remote', type: 'Contract', status: 'active', manager: 'Rahul Kapoor', joined: '2024-04-01', leaveBal: 6, salary: '₹15 LPA' },
    { id: 'EMP-011', name: 'Divya Krishnan', email: 'divya@timeerp.com', phone: '+91 98765 43220', dept: 'HR', designation: 'HR Executive', location: 'Ghaziabad', type: 'Full-time', status: 'inactive', manager: 'Priya Mehta', joined: '2019-05-18', leaveBal: 0, salary: '—' },
    { id: 'EMP-012', name: 'Karan Malhotra', email: 'karan@timeerp.com', phone: '+91 98765 43221', dept: 'Sales', designation: 'Sales Manager', location: 'Delhi NCR', type: 'Full-time', status: 'active', manager: 'Admin', joined: '2020-10-30', leaveBal: 7, salary: '₹13 LPA' }
  ];

  var DESIGNATIONS = ['Senior Developer', 'Tech Lead', 'HR Manager', 'Sales Executive', 'UI/UX Designer', 'QA Engineer', 'Accountant', 'CS Executive', 'Marketing Lead', 'Laravel Developer', 'HR Executive', 'Sales Manager'];
  var PERMISSIONS = ['Dashboard', 'HRMS', 'Attendance', 'Payroll', 'CRM', 'Projects', 'Finance', 'Reports', 'Document Vault', 'Communication Center'];
  var DOCUMENTS = ['Aadhaar', 'PAN', 'Resume', 'Offer Letter', 'Appointment Letter', 'Experience Letter', 'Certificates'];

  var state = {
    view: localStorage.getItem('emp-view') || 'table',
    search: '',
    filters: { dept: '', designation: '', location: '', type: '', status: '', manager: '', joined: '' },
    sort: { key: 'name', dir: 'asc' },
    page: 1,
    pageSize: parseInt(localStorage.getItem('emp-page-size') || '10', 10),
    selected: {},
    drawerEmployee: null,
    drawerTab: 'overview'
  };

  var els = {};

  function $(id) { return document.getElementById(id); }

  function initials(name) {
    return name.split(' ').map(function (n) { return n[0]; }).join('').slice(0, 2).toUpperCase();
  }

  function statusBadge(status) {
    var map = { active: 'active', probation: 'probation', notice: 'notice', leave: 'leave', inactive: 'inactive' };
    var labels = { active: 'Active', probation: 'Probation', notice: 'Notice Period', leave: 'On Leave', inactive: 'Inactive' };
    return '<span class="emp-badge emp-badge--' + (map[status] || 'inactive') + '">' + (labels[status] || status) + '</span>';
  }

  function toast(title, detail) {
    if (window.DashboardShell) DashboardShell.toast(title, detail);
  }

  function getFiltered() {
    var q = state.search.toLowerCase();
    return EMPLOYEES.filter(function (e) {
      if (q && [e.name, e.id, e.email, e.phone].join(' ').toLowerCase().indexOf(q) === -1) return false;
      if (state.filters.dept && e.dept !== state.filters.dept) return false;
      if (state.filters.designation && e.designation !== state.filters.designation) return false;
      if (state.filters.location && e.location !== state.filters.location) return false;
      if (state.filters.type && e.type !== state.filters.type) return false;
      if (state.filters.status && e.status !== state.filters.status) return false;
      if (state.filters.manager && e.manager !== state.filters.manager) return false;
      if (state.filters.joined && e.joined < state.filters.joined) return false;
      return true;
    }).sort(function (a, b) {
      var k = state.sort.key;
      var av = (a[k] || '').toString().toLowerCase();
      var bv = (b[k] || '').toString().toLowerCase();
      if (av < bv) return state.sort.dir === 'asc' ? -1 : 1;
      if (av > bv) return state.sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  function getPaged(list) {
    var start = (state.page - 1) * state.pageSize;
    return list.slice(start, start + state.pageSize);
  }

  function animateCount(el, target, suffix) {
    if (!el) return;
    var dur = 800;
    var start = 0;
    var isDec = target % 1 !== 0;
    var t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var val = isDec ? (start + (target - start) * p).toFixed(1) : Math.floor(start + (target - start) * p);
      el.textContent = val + (suffix || '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function renderKpi() {
    var total = EMPLOYEES.length;
    var active = EMPLOYEES.filter(function (e) { return e.status === 'active'; }).length;
    var onLeave = EMPLOYEES.filter(function (e) { return e.status === 'leave'; }).length;
    var newJoiners = EMPLOYEES.filter(function (e) { return e.joined >= '2025-01-01'; }).length;
    var depts = {};
    EMPLOYEES.forEach(function (e) { depts[e.dept] = 1; });
    var pending = EMPLOYEES.filter(function (e) { return e.status === 'probation' || e.status === 'notice'; }).length;

    animateCount($('kpiTotal'), total, '');
    animateCount($('kpiActive'), active, '');
    animateCount($('kpiLeave'), onLeave, '');
    animateCount($('kpiNew'), newJoiners, '');
    animateCount($('kpiDept'), Object.keys(depts).length, '');
    animateCount($('kpiPending'), pending, '');
  }

  function populateFilters() {
    var uniq = function (key) {
      var s = {};
      EMPLOYEES.forEach(function (e) { s[e[key]] = 1; });
      return Object.keys(s).sort();
    };
    fillSelect('filterDept', uniq('dept'), 'All departments');
    fillSelect('filterDesignation', DESIGNATIONS, 'All designations');
    fillSelect('filterLocation', uniq('location'), 'All locations');
    fillSelect('filterType', uniq('type'), 'All types');
    fillSelect('filterStatus', ['active', 'probation', 'notice', 'leave', 'inactive'], 'All statuses');
    fillSelect('filterManager', uniq('manager'), 'All managers');
  }

  function fillSelect(id, options, placeholder) {
    var el = $(id);
    if (!el) return;
    el.innerHTML = '<option value="">' + placeholder + '</option>' +
      options.map(function (o) {
        var label = o.charAt(0).toUpperCase() + o.slice(1).replace(/-/g, ' ');
        if (['active', 'probation', 'notice', 'leave', 'inactive'].indexOf(o) !== -1) {
          label = { active: 'Active', probation: 'Probation', notice: 'Notice Period', leave: 'On Leave', inactive: 'Inactive' }[o];
        }
        return '<option value="' + o + '">' + label + '</option>';
      }).join('');
  }

  function refreshDesignationFilters() {
    fillSelect('filterDesignation', DESIGNATIONS, 'All designations');
    var assignSel = $('assignDesigSelect');
    if (assignSel) {
      assignSel.innerHTML = DESIGNATIONS.map(function (d) {
        return '<option value="' + d + '">' + d + '</option>';
      }).join('');
    }
  }

  function openDesigModal() {
    var modal = $('desigModal');
    if (!modal) return;
    modal.hidden = false;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    renderDesigList();
    $('desigInput') && $('desigInput').focus();
  }

  function closeDesigModal() {
    var modal = $('desigModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modal.hidden = true;
    if ($('desigInput')) $('desigInput').value = '';
    if ($('desigEditIndex')) $('desigEditIndex').value = '';
    if ($('desigSubmitBtn')) $('desigSubmitBtn').textContent = 'Add Designation';
  }

  function renderDesigList() {
    var list = $('desigList');
    if (!list) return;
    list.innerHTML = DESIGNATIONS.map(function (d, i) {
      var count = EMPLOYEES.filter(function (e) { return e.designation === d; }).length;
      return '<li><span>' + d + ' <small style="color:var(--muted);font-weight:500">(' + count + ')</small></span>' +
        '<div class="emp-desig-list__actions">' +
        '<button type="button" data-desig-edit="' + i + '">Edit</button>' +
        '<button type="button" class="is-danger" data-desig-delete="' + i + '">Delete</button></div></li>';
    }).join('');
  }

  function openAssignDesigModal() {
    var ids = Object.keys(state.selected);
    if (!ids.length) { toast('Assign designation', 'Select at least one employee.'); return; }
    var modal = $('assignDesigModal');
    if (!modal) return;
    $('assignDesigHint').textContent = 'Assign a designation to ' + ids.length + ' selected employee' + (ids.length === 1 ? '' : 's') + '.';
    refreshDesignationFilters();
    modal.hidden = false;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeAssignDesigModal() {
    var modal = $('assignDesigModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modal.hidden = true;
  }

  function assignDesignationToSelected(desig) {
    Object.keys(state.selected).forEach(function (id) {
      var emp = getEmployee(id);
      if (emp) emp.designation = desig;
    });
    toast('Designation assigned', desig + ' applied to ' + Object.keys(state.selected).length + ' employee(s).');
    state.selected = {};
    closeAssignDesigModal();
    render();
    renderKpi();
  }

  function actionMenu(empId) {
    return '<div class="emp-dropdown" data-menu="' + empId + '">' +
      '<button type="button" data-action="view" data-id="' + empId + '">View Profile</button>' +
      '<button type="button" data-action="edit" data-id="' + empId + '">Edit Employee</button>' +
      '<button type="button" data-action="attendance" data-id="' + empId + '">Attendance</button>' +
      '<button type="button" data-action="leave" data-id="' + empId + '">Leave</button>' +
      '<button type="button" data-action="payroll" data-id="' + empId + '">Payroll</button>' +
      '<button type="button" data-action="documents" data-id="' + empId + '">Documents</button>' +
      '<button type="button" data-action="permissions" data-id="' + empId + '">Permissions</button>' +
      '<button type="button" data-action="reset" data-id="' + empId + '">Reset Password</button>' +
      '<button type="button" data-action="deactivate" data-id="' + empId + '">Deactivate</button>' +
      '<button type="button" class="is-danger" data-action="delete" data-id="' + empId + '">Delete</button></div>';
  }

  function renderTable(list) {
    var tbody = $('empTableBody');
    if (!tbody) return;
    tbody.innerHTML = list.map(function (e) {
      var checked = state.selected[e.id] ? ' checked' : '';
      var rowClass = state.selected[e.id] ? ' class="is-selected"' : '';
      return '<tr data-id="' + e.id + '"' + rowClass + '>' +
        '<td class="emp-select-cell"><label class="emp-select-label"><input type="checkbox" class="emp-check" aria-label="Select ' + e.name + '" data-select="' + e.id + '"' + checked + '></label></td>' +
        '<td><div class="emp-name-cell"><div class="emp-avatar-wrap"><div class="emp-avatar" title="' + e.name + '">' + initials(e.name) + '</div><span class="emp-status-dot" style="background:' + (e.status === 'active' ? '#22c55e' : '#94a3b8') + '"></span></div>' +
        '<div><strong>' + e.name + '</strong><span>' + e.designation + '</span></div></div></td>' +
        '<td>' + e.id + '</td><td>' + e.dept + '</td><td>' + e.designation + '</td>' +
        '<td>' + e.email + '</td><td>' + e.phone + '</td><td>' + e.joined + '</td>' +
        '<td>' + e.type + '</td><td>' + statusBadge(e.status) + '</td>' +
        '<td style="position:relative"><button type="button" class="emp-action-btn" data-menu-toggle="' + e.id + '" aria-label="Actions for ' + e.name + '">⋯</button>' + actionMenu(e.id) + '</td></tr>';
    }).join('');
  }

  function renderCards(list) {
    var wrap = $('empCardView');
    if (!wrap) return;
    wrap.innerHTML = list.map(function (e) {
      return '<article class="emp-card" data-id="' + e.id + '">' +
        '<div class="emp-card__head"><div class="emp-avatar-wrap"><div class="emp-avatar emp-avatar--lg">' + initials(e.name) + '</div></div>' +
        '<div class="emp-card__meta"><h3>' + e.name + '</h3><p>' + e.id + ' · ' + statusBadge(e.status) + '</p></div></div>' +
        '<div class="emp-card__rows">' +
        '<div class="emp-card__row"><span>Department</span><span>' + e.dept + '</span></div>' +
        '<div class="emp-card__row"><span>Designation</span><span>' + e.designation + '</span></div>' +
        '<div class="emp-card__row"><span>Email</span><span>' + e.email + '</span></div>' +
        '<div class="emp-card__row"><span>Phone</span><span>' + e.phone + '</span></div>' +
        '<div class="emp-card__row"><span>Joined</span><span>' + e.joined + '</span></div>' +
        '<div class="emp-card__row"><span>Location</span><span>' + e.location + '</span></div>' +
        '<div class="emp-card__row"><span>Manager</span><span>' + e.manager + '</span></div></div>' +
        '<div class="emp-card__actions">' +
        '<button type="button" data-action="view" data-id="' + e.id + '">View</button>' +
        '<button type="button" data-action="edit" data-id="' + e.id + '">Edit</button>' +
        '<button type="button" data-action="attendance" data-id="' + e.id + '">Attendance</button>' +
        '<button type="button" data-action="documents" data-id="' + e.id + '">Documents</button>' +
        '<button type="button" data-action="permissions" data-id="' + e.id + '">Permissions</button>' +
        '<button type="button" data-action="payroll" data-id="' + e.id + '">Payroll</button>' +
        '<button type="button" class="emp-card__actions--danger" data-action="delete" data-id="' + e.id + '">Delete</button></div></article>';
    }).join('');
  }

  function renderGrid(list) {
    var wrap = $('empGridView');
    if (!wrap) return;
    wrap.innerHTML = list.map(function (e) {
      return '<button type="button" class="emp-grid__item" data-action="view" data-id="' + e.id + '">' +
        '<div class="emp-avatar">' + initials(e.name) + '</div>' +
        '<strong>' + e.name.split(' ')[0] + '</strong><span>' + e.dept + '</span></button>';
    }).join('');
  }

  function renderPagination(total) {
    var pages = Math.max(1, Math.ceil(total / state.pageSize));
    if (state.page > pages) state.page = pages;
    var info = $('empPageInfo');
    if (info) info.textContent = 'Page ' + state.page + ' of ' + pages;
    var count = $('empResultCount');
    if (count) count.textContent = total + ' employee' + (total === 1 ? '' : 's');
    var pagesEl = $('empPages');
    if (!pagesEl) return;
    var html = '';
    for (var i = 1; i <= pages && i <= 7; i++) {
      html += '<button type="button" class="' + (i === state.page ? 'is-active' : '') + '" data-page="' + i + '">' + i + '</button>';
    }
    pagesEl.innerHTML = html;
    $('empPrev').disabled = state.page <= 1;
    $('empNext').disabled = state.page >= pages;
  }

  function updateViewPanels() {
    var panels = {
      table: $('empTableView'),
      card: $('empCardView'),
      grid: $('empGridView')
    };
    Object.keys(panels).forEach(function (key) {
      var el = panels[key];
      if (!el) return;
      var active = state.view === key;
      el.hidden = !active;
      el.classList.toggle('is-active', active);
      el.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
  }

  function render() {
    var filtered = getFiltered();
    var paged = getPaged(filtered);
    var empty = $('empEmpty');
    var panel = $('empContentPanel');

    if (filtered.length === 0) {
      if (empty) empty.hidden = false;
      if (panel) panel.hidden = true;
    } else {
      if (empty) empty.hidden = true;
      if (panel) panel.hidden = false;
      if (state.view === 'table') renderTable(paged);
      else if (state.view === 'card') renderCards(paged);
      else renderGrid(paged);
    }

    renderPagination(filtered.length);
    updateBulkBar();
    document.querySelectorAll('.emp-view-toggle button').forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.view === state.view);
      b.setAttribute('aria-selected', b.dataset.view === state.view ? 'true' : 'false');
    });
    updateViewPanels();
  }

  function syncSelectAllState() {
    var selectAll = $('empSelectAll');
    if (!selectAll) return;
    var paged = getPaged(getFiltered());
    var selectedOnPage = paged.filter(function (e) { return state.selected[e.id]; }).length;
    selectAll.checked = paged.length > 0 && selectedOnPage === paged.length;
    selectAll.indeterminate = selectedOnPage > 0 && selectedOnPage < paged.length;
  }

  var bulkCountPrev = 0;

  function updateBulkBar() {
    var n = Object.keys(state.selected).length;
    var bar = $('empBulkBar');
    if (bar) {
      bar.hidden = n === 0;
      bar.classList.toggle('is-active', n > 0);
    }
    var cnt = $('empBulkCount');
    if (cnt) {
      cnt.textContent = String(n);
      if (n !== bulkCountPrev && n > 0) {
        cnt.classList.remove('is-bump');
        void cnt.offsetWidth;
        cnt.classList.add('is-bump');
      }
      bulkCountPrev = n;
    }
    bar && bar.querySelectorAll('.emp-btn:not(.emp-btn--select):not(.emp-btn--ghost)').forEach(function (btn) {
      btn.disabled = n === 0;
    });
    syncSelectAllState();
  }

  function clearSelection() {
    state.selected = {};
    updateBulkBar();
    render();
  }

  function getEmployee(id) {
    for (var i = 0; i < EMPLOYEES.length; i++) if (EMPLOYEES[i].id === id) return EMPLOYEES[i];
    return null;
  }

  function openDrawer(emp, tab) {
    state.drawerEmployee = emp;
    state.drawerTab = tab || 'overview';
    var scrim = $('empDrawerScrim');
    if (scrim) {
      scrim.classList.add('is-open');
      scrim.setAttribute('aria-hidden', 'false');
    }
    renderDrawer();
  }

  function closeDrawer() {
    var scrim = $('empDrawerScrim');
    if (scrim) {
      scrim.classList.remove('is-open');
      scrim.setAttribute('aria-hidden', 'true');
    }
    state.drawerEmployee = null;
  }

  function renderDrawer() {
    var emp = state.drawerEmployee;
    if (!emp) return;
    $('drawerTitle').textContent = emp.name;
    $('drawerSubtitle').textContent = emp.id + ' · ' + emp.designation;

    var tabs = ['overview', 'personal', 'official', 'attendance', 'leave', 'payroll', 'assets', 'documents', 'activity'];
    var tabLabels = { overview: 'Overview', personal: 'Personal', official: 'Official', attendance: 'Attendance', leave: 'Leave', payroll: 'Payroll', assets: 'Assets', documents: 'Documents', activity: 'Activity' };
    $('drawerTabs').innerHTML = tabs.map(function (t) {
      return '<button type="button" class="' + (state.drawerTab === t ? 'is-active' : '') + '" data-tab="' + t + '">' + tabLabels[t] + '</button>';
    }).join('');

    var body = '';
    if (state.drawerTab === 'overview' || state.drawerTab === 'personal') {
      body = '<div class="emp-detail-grid">' +
        detailRow('Full Name', emp.name) + detailRow('Email', emp.email) + detailRow('Phone', emp.phone) +
        detailRow('Emergency', '+91 90000 12345') + detailRow('Address', 'Ghaziabad, UP 201002') + '</div>';
    } else if (state.drawerTab === 'official') {
      body = '<div class="emp-detail-grid">' +
        detailRow('Employee ID', emp.id) + detailRow('Department', emp.dept) + detailRow('Designation', emp.designation) +
        detailRow('Manager', emp.manager) + detailRow('Joined', emp.joined) + detailRow('Type', emp.type) + '</div>';
    } else if (state.drawerTab === 'attendance') {
      body = '<div class="emp-drawer__section"><h4>Monthly Summary</h4><div class="emp-detail-grid">' +
        detailRow('Present', '18 days') + detailRow('Absent', '1 day') + detailRow('Leave', '2 days') +
        detailRow('Late', '3 days') + detailRow('Work Hours', '152 hrs') + '</div></div>';
    } else if (state.drawerTab === 'leave') {
      body = '<div class="emp-detail-grid">' +
        detailRow('Available', emp.leaveBal + ' days') + detailRow('Used', '4 days') + detailRow('Pending', '1 request') + '</div>';
    } else if (state.drawerTab === 'payroll') {
      body = '<div class="emp-detail-grid">' +
        detailRow('Current Salary', emp.salary) + detailRow('Last Payslip', 'Feb 2026') + detailRow('PF', '₹1,800') +
        detailRow('ESI', '₹375') + detailRow('Prof. Tax', '₹200') + '</div>';
    } else if (state.drawerTab === 'documents') {
      body = '<div class="emp-doc-list">' + DOCUMENTS.map(function (d) {
        return '<div class="emp-doc-item"><span>' + d + '</span><div class="emp-doc-item__actions">' +
          '<button type="button">View</button><button type="button">Download</button><button type="button">Upload</button></div></div>';
      }).join('') + '</div>';
    } else if (state.drawerTab === 'activity') {
      body = '<div class="emp-detail-grid">' +
        detailRow('Profile updated', '2 days ago') + detailRow('Leave approved', '1 week ago') + detailRow('Joined', emp.joined) + '</div>';
    } else {
      body = '<p style="color:var(--muted);font-size:14px;">No assets assigned yet.</p>';
    }

    if (state.drawerTab === 'overview') {
      body += '<div class="emp-drawer__section" style="margin-top:20px"><h4>Module Permissions</h4><div class="emp-perm-chips" id="drawerPerms"></div></div>';
    }

    $('drawerBody').innerHTML = body;

    if (state.drawerTab === 'overview') {
      var permEl = $('drawerPerms');
      if (permEl) {
        permEl.innerHTML = PERMISSIONS.map(function (p, i) {
          return '<button type="button" class="emp-perm-chip' + (i < 6 ? ' is-on' : '') + '" data-perm="' + p + '">' + p + '</button>';
        }).join('');
      }
    }
  }

  function detailRow(label, value) {
    return '<div class="emp-detail-row"><dt>' + label + '</dt><dd>' + value + '</dd></div>';
  }

  function handleAction(action, id) {
    var emp = getEmployee(id);
    if (!emp && action !== 'add') return;
    switch (action) {
      case 'view':
        try { sessionStorage.setItem('eprEmployeeId', emp.id); } catch (err) { /* ignore */ }
        window.location.href = 'employee_profile.html?id=' + encodeURIComponent(emp.id);
        break;
      case 'edit': toast('Edit employee', emp.name + ' — wire ERP route when backend is connected.'); break;
      case 'attendance': openDrawer(emp, 'attendance'); break;
      case 'leave': openDrawer(emp, 'leave'); break;
      case 'payroll': openDrawer(emp, 'payroll'); break;
      case 'documents': openDrawer(emp, 'documents'); break;
      case 'permissions': openDrawer(emp, 'overview'); break;
      case 'reset': toast('Password reset', 'Reset link sent to ' + emp.email); break;
      case 'deactivate': emp.status = 'inactive'; toast('Deactivated', emp.name); render(); renderKpi(); break;
      case 'delete':
        if (confirm('Delete ' + emp.name + '?')) {
          var idx = EMPLOYEES.findIndex(function (e) { return e.id === id; });
          if (idx > -1) EMPLOYEES.splice(idx, 1);
          toast('Deleted', emp.name + ' removed');
          render(); renderKpi();
        }
        break;
      case 'add': toast('Add employee', 'Open employee creation form when backend is connected.'); break;
      case 'export': toast('Export', 'Exporting ' + getFiltered().length + ' employee records…'); break;
      case 'refresh': render(); renderKpi(); toast('Refreshed', 'Employee data updated'); break;
      default: break;
    }
    document.querySelectorAll('.emp-dropdown.is-open').forEach(function (d) { d.classList.remove('is-open'); });
  }

  function bindEvents() {
    $('empSearch') && $('empSearch').addEventListener('input', function (e) {
      state.search = e.target.value.trim();
      state.page = 1;
      render();
    });

    var filterMap = {
      filterDept: 'dept', filterDesignation: 'designation', filterLocation: 'location',
      filterType: 'type', filterStatus: 'status', filterManager: 'manager', filterJoined: 'joined'
    };
    Object.keys(filterMap).forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener('change', function (e) {
        state.filters[filterMap[id]] = e.target.value;
        state.page = 1;
        render();
      });
    });

    $('filterReset') && $('filterReset').addEventListener('click', function () {
      state.filters = { dept: '', designation: '', location: '', type: '', status: '', manager: '', joined: '' };
      state.search = '';
      if ($('empSearch')) $('empSearch').value = '';
      document.querySelectorAll('.emp-filters select, .emp-filters input').forEach(function (el) { el.value = ''; });
      state.page = 1;
      render();
    });

    document.querySelectorAll('.emp-view-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nextView = btn.dataset.view;
        if (!nextView || state.view === nextView) return;
        state.view = nextView;
        localStorage.setItem('emp-view', state.view);
        state.page = 1;
        render();
      });
    });

    $('empPageSize') && $('empPageSize').addEventListener('change', function (e) {
      state.pageSize = parseInt(e.target.value, 10);
      localStorage.setItem('emp-page-size', state.pageSize);
      state.page = 1;
      render();
    });

    $('empPrev') && $('empPrev').addEventListener('click', function () { if (state.page > 1) { state.page--; render(); } });
    $('empNext') && $('empNext').addEventListener('click', function () { state.page++; render(); });

    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-action]');
      if (t) { e.preventDefault(); handleAction(t.dataset.action, t.dataset.id); return; }

      var menuBtn = e.target.closest('[data-menu-toggle]');
      if (menuBtn) {
        e.stopPropagation();
        var id = menuBtn.dataset.menuToggle;
        document.querySelectorAll('.emp-dropdown.is-open').forEach(function (d) { d.classList.remove('is-open'); });
        var menu = document.querySelector('[data-menu="' + id + '"]');
        if (menu) menu.classList.add('is-open');
        return;
      }

      if (!e.target.closest('.emp-dropdown')) {
        document.querySelectorAll('.emp-dropdown.is-open').forEach(function (d) { d.classList.remove('is-open'); });
      }

      var pageBtn = e.target.closest('[data-page]');
      if (pageBtn) { state.page = parseInt(pageBtn.dataset.page, 10); render(); }

      var tabBtn = e.target.closest('[data-tab]');
      if (tabBtn) { state.drawerTab = tabBtn.dataset.tab; renderDrawer(); }

      var permChip = e.target.closest('.emp-perm-chip');
      if (permChip) permChip.classList.toggle('is-on');

      var desigEdit = e.target.closest('[data-desig-edit]');
      if (desigEdit) {
        var idx = parseInt(desigEdit.dataset.desigEdit, 10);
        if ($('desigInput')) $('desigInput').value = DESIGNATIONS[idx];
        if ($('desigEditIndex')) $('desigEditIndex').value = String(idx);
        if ($('desigSubmitBtn')) $('desigSubmitBtn').textContent = 'Save Designation';
        $('desigInput') && $('desigInput').focus();
        return;
      }

      var desigDel = e.target.closest('[data-desig-delete]');
      if (desigDel) {
        var di = parseInt(desigDel.dataset.desigDelete, 10);
        var name = DESIGNATIONS[di];
        if (confirm('Delete designation "' + name + '"?')) {
          DESIGNATIONS.splice(di, 1);
          refreshDesignationFilters();
          renderDesigList();
          toast('Designation deleted', name);
        }
        return;
      }

      var bulkBtn = e.target.closest('[data-bulk]');
      if (bulkBtn) {
        var bulk = bulkBtn.dataset.bulk;
        if (bulk === 'assign-desig') openAssignDesigModal();
        else if (bulk === 'export') handleAction('export');
        else if (bulk === 'email') toast('Send email', 'Email composer opens when backend is connected.');
        else if (bulk === 'assign-dept') toast('Assign department', 'Select department when backend is connected.');
        return;
      }
    });

    document.addEventListener('change', function (e) {
      if (e.target.matches('[data-select]')) {
        var id = e.target.dataset.select;
        if (e.target.checked) state.selected[id] = true;
        else delete state.selected[id];
        var row = e.target.closest('tr');
        if (row) row.classList.toggle('is-selected', e.target.checked);
        updateBulkBar();
        return;
      }
      if (e.target.id === 'empSelectAll') {
        getPaged(getFiltered()).forEach(function (emp) {
          if (e.target.checked) state.selected[emp.id] = true;
          else delete state.selected[emp.id];
        });
        render();
      }
    });

    document.querySelectorAll('.emp-table th[data-sort]').forEach(function (th) {
      th.addEventListener('click', function () {
        var key = th.dataset.sort;
        if (state.sort.key === key) state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
        else { state.sort.key = key; state.sort.dir = 'asc'; }
        document.querySelectorAll('.emp-table th').forEach(function (h) { h.classList.toggle('is-sorted', h === th); });
        render();
      });
    });

    $('empDrawerClose') && $('empDrawerClose').addEventListener('click', closeDrawer);
    $('empDrawerScrim') && $('empDrawerScrim').addEventListener('click', function (e) {
      if (e.target === $('empDrawerScrim')) closeDrawer();
    });
    var drawer = document.querySelector('.emp-drawer');
    if (drawer) drawer.addEventListener('click', function (e) { e.stopPropagation(); });
    $('drawerEdit') && $('drawerEdit').addEventListener('click', function () {
      if (state.drawerEmployee) handleAction('edit', state.drawerEmployee.id);
    });

    $('btnAddEmployee') && $('btnAddEmployee').addEventListener('click', function () { handleAction('add'); });
    $('btnManageDesignations') && $('btnManageDesignations').addEventListener('click', openDesigModal);
    $('btnExport') && $('btnExport').addEventListener('click', function () { handleAction('export'); });
    $('btnRefresh') && $('btnRefresh').addEventListener('click', function () { handleAction('refresh'); });
    $('empBulkClear') && $('empBulkClear').addEventListener('click', clearSelection);
    $('emptyReset') && $('emptyReset').addEventListener('click', function () { $('filterReset').click(); });
    $('emptyAdd') && $('emptyAdd').addEventListener('click', function () { handleAction('add'); });
    $('mobileFab') && $('mobileFab').addEventListener('click', function () { handleAction('add'); });

    $('desigModalClose') && $('desigModalClose').addEventListener('click', closeDesigModal);
    $('desigModal') && $('desigModal').addEventListener('click', function (e) {
      if (e.target === $('desigModal')) closeDesigModal();
    });
    $('desigForm') && $('desigForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var title = ($('desigInput') && $('desigInput').value.trim()) || '';
      if (!title) return;
      var editIdx = $('desigEditIndex') && $('desigEditIndex').value;
      if (editIdx !== '' && editIdx !== null) {
        var oldName = DESIGNATIONS[parseInt(editIdx, 10)];
        DESIGNATIONS[parseInt(editIdx, 10)] = title;
        EMPLOYEES.forEach(function (emp) { if (emp.designation === oldName) emp.designation = title; });
        toast('Designation updated', title);
      } else if (DESIGNATIONS.indexOf(title) === -1) {
        DESIGNATIONS.push(title);
        toast('Designation added', title);
      } else {
        toast('Already exists', title + ' is already in the list.');
        return;
      }
      refreshDesignationFilters();
      renderDesigList();
      if ($('desigInput')) $('desigInput').value = '';
      if ($('desigEditIndex')) $('desigEditIndex').value = '';
      if ($('desigSubmitBtn')) $('desigSubmitBtn').textContent = 'Add Designation';
      render();
    });

    $('assignDesigClose') && $('assignDesigClose').addEventListener('click', closeAssignDesigModal);
    $('assignDesigCancel') && $('assignDesigCancel').addEventListener('click', closeAssignDesigModal);
    $('assignDesigModal') && $('assignDesigModal').addEventListener('click', function (e) {
      if (e.target === $('assignDesigModal')) closeAssignDesigModal();
    });
    $('assignDesigConfirm') && $('assignDesigConfirm').addEventListener('click', function () {
      var sel = $('assignDesigSelect');
      if (sel && sel.value) assignDesignationToSelected(sel.value);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDrawer();
        closeDesigModal();
        closeAssignDesigModal();
      }
    });
  }

  function init() {
    populateFilters();
    refreshDesignationFilters();
    renderKpi();
    if ($('empPageSize')) $('empPageSize').value = state.pageSize;
    document.querySelectorAll('.emp-view-toggle button').forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.view === state.view);
      b.setAttribute('aria-selected', b.dataset.view === state.view ? 'true' : 'false');
    });
    updateViewPanels();
    bindEvents();
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
