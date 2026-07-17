/**
 * TIME ERP — Exit Management (exitmanagement.html) — UI only
 */
(function () {
  'use strict';

  var EXITS = [
    {
      id: 'EXT-001', empId: 'EMP-014', name: 'Rohan Mehta', dept: 'Engineering', designation: 'Backend Developer',
      manager: 'Rahul Kapoor', resignDate: '2026-02-20', lwd: '2026-03-22', notice: 65, stage: 'Notice Period',
      status: 'notice', type: 'Resignation', reason: 'Better Opportunity', email: 'rohan@timeerp.com', phone: '+91 98765 11001',
      progress: 45
    },
    {
      id: 'EXT-002', empId: 'EMP-022', name: 'Sneha Iyer', dept: 'HR', designation: 'HR Executive',
      manager: 'Priya Nair', resignDate: '2026-02-28', lwd: '2026-03-28', notice: 55, stage: 'Asset Return',
      status: 'pending', type: 'Resignation', reason: 'Relocation', email: 'sneha@timeerp.com', phone: '+91 98765 11002',
      progress: 62
    },
    {
      id: 'EXT-003', empId: 'EMP-031', name: 'Arjun Patel', dept: 'Sales', designation: 'Sales Manager',
      manager: 'Amit Joshi', resignDate: '2026-03-01', lwd: '2026-03-31', notice: 40, stage: 'HR Approval',
      status: 'pending', type: 'Resignation', reason: 'Career Growth', email: 'arjun@timeerp.com', phone: '+91 98765 11003',
      progress: 28
    },
    {
      id: 'EXT-004', empId: 'EMP-008', name: 'Meera Das', dept: 'Finance', designation: 'Accountant',
      manager: 'Vikram Mehta', resignDate: '2026-01-15', lwd: '2026-02-15', notice: 100, stage: 'Settlement',
      status: 'settlement', type: 'Resignation', reason: 'Personal', email: 'meera@timeerp.com', phone: '+91 98765 11004',
      progress: 85
    },
    {
      id: 'EXT-005', empId: 'EMP-019', name: 'Kabir Khan', dept: 'IT', designation: 'System Admin',
      manager: 'Rahul Kapoor', resignDate: '2025-12-10', lwd: '2026-01-10', notice: 100, stage: 'Archived',
      status: 'archived', type: 'Resignation', reason: 'Better Opportunity', email: 'kabir@timeerp.com', phone: '+91 98765 11005',
      progress: 100
    },
    {
      id: 'EXT-006', empId: 'EMP-027', name: 'Divya Reddy', dept: 'Marketing', designation: 'Content Lead',
      manager: 'Priya Nair', resignDate: '2026-03-05', lwd: '2026-04-05', notice: 20, stage: 'Manager Approval',
      status: 'active', type: 'Resignation', reason: 'Higher Studies', email: 'divya@timeerp.com', phone: '+91 98765 11006',
      progress: 15
    }
  ];

  var viewMode = localStorage.getItem('exmView') || 'grid';
  var sortKey = null;
  var sortAsc = true;
  var activeExit = EXITS[0];

  function $(id) { return document.getElementById(id); }

  function toast(title, detail) {
    if (window.DashboardShell) DashboardShell.toast(title, detail || 'UI preview — connect backend when ready.');
  }

  function initials(name) {
    return name.split(' ').map(function (n) { return n[0]; }).join('').slice(0, 2).toUpperCase();
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el, target, suffix) {
    if (!el) return;
    var dur = 900, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var val = Math.floor(target * easeOut(p));
      el.textContent = val + (suffix || '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function statusBadge(status) {
    var map = {
      active: 'active', pending: 'pending', notice: 'notice', settlement: 'settlement',
      approved: 'approved', completed: 'completed', archived: 'archived'
    };
    return '<span class="exm-badge exm-badge--' + (map[status] || 'pending') + '">' + status + '</span>';
  }

  function getFiltered() {
    var q = ($('exmSearch') && $('exmSearch').value || '').toLowerCase().trim();
    var dept = $('exmDept') && $('exmDept').value;
    var status = $('exmStatus') && $('exmStatus').value;
    var type = $('exmType') && $('exmType').value;
    var list = EXITS.filter(function (e) {
      if (dept && e.dept !== dept) return false;
      if (status && e.status !== status) return false;
      if (type && e.type !== type) return false;
      if (!q) return true;
      return (e.name + e.empId + e.dept + e.manager + e.stage).toLowerCase().indexOf(q) !== -1;
    });
    if (sortKey) {
      list = list.slice().sort(function (a, b) {
        var av = a[sortKey], bv = b[sortKey];
        if (av < bv) return sortAsc ? -1 : 1;
        if (av > bv) return sortAsc ? 1 : -1;
        return 0;
      });
    }
    return list;
  }

  function renderKpi() {
    animateCount($('kpiActive'), 6);
    animateCount($('kpiNotice'), 4);
    animateCount($('kpiApprovals'), 3);
    animateCount($('kpiAssets'), 12);
    animateCount($('kpiInterviews'), 2);
    animateCount($('kpiSettlement'), 1);
    animateCount($('kpiCompleted'), 18);
    if ($('kpiAvgTime')) $('kpiAvgTime').textContent = '18d';
  }

  function renderCards(list) {
    var wrap = $('exmCards');
    if (!wrap) return;
    if (!list.length) {
      wrap.innerHTML = '<div class="exm-empty"><strong>No Exit Requests</strong><p>No employees match your filters.</p><button type="button" class="exm-btn exm-btn--primary" data-ui="initiate-exit">Start Exit Process</button></div>';
      return;
    }
    wrap.innerHTML = list.map(function (e) {
      return '<article class="exm-card" data-id="' + e.id + '">' +
        '<div class="exm-card__top">' +
        '<div class="exm-avatar">' + initials(e.name) + '</div>' +
        '<div class="exm-card__identity"><strong>' + e.name + '</strong><span>' + e.empId + ' · ' + e.designation + '</span></div>' +
        statusBadge(e.status) +
        '</div>' +
        '<div class="exm-card__meta">' +
        '<div><span>Department</span><span>' + e.dept + '</span></div>' +
        '<div><span>Manager</span><span>' + e.manager + '</span></div>' +
        '<div><span>Resignation</span><span>' + e.resignDate + '</span></div>' +
        '<div><span>Last Working Day</span><span>' + e.lwd + '</span></div>' +
        '</div>' +
        '<div class="exm-card__progress-label"><span>' + e.stage + '</span><span>' + e.progress + '%</span></div>' +
        '<div class="exm-progress"><div class="exm-progress__bar" style="width:' + e.progress + '%"></div></div>' +
        '<div class="exm-card__actions">' +
        '<button type="button" data-action="view" data-id="' + e.id + '">View</button>' +
        '<button type="button" data-action="checklist" data-id="' + e.id + '">Checklist</button>' +
        '<button type="button" data-action="documents" data-id="' + e.id + '">Documents</button>' +
        '<button type="button" data-action="settlement" data-id="' + e.id + '">Settlement</button>' +
        '<button type="button" data-action="timeline" data-id="' + e.id + '">Timeline</button>' +
        '</div></article>';
    }).join('');
  }

  function renderTable(list) {
    var body = $('exmTableBody');
    if (!body) return;
    if (!list.length) {
      body.innerHTML = '<tr><td colspan="10"><div class="exm-empty"><strong>No Exit Requests</strong><p>No employees match your filters.</p></div></td></tr>';
      return;
    }
    body.innerHTML = list.map(function (e) {
      return '<tr>' +
        '<td><div class="exm-table__emp"><div class="exm-avatar">' + initials(e.name) + '</div><div><strong>' + e.name + '</strong></div></div></td>' +
        '<td>' + e.empId + '</td>' +
        '<td>' + e.dept + '</td>' +
        '<td>' + e.designation + '</td>' +
        '<td>' + e.manager + '</td>' +
        '<td>' + e.notice + '%</td>' +
        '<td>' + e.lwd + '</td>' +
        '<td>' + e.stage + '</td>' +
        '<td>' + statusBadge(e.status) + '</td>' +
        '<td><div class="exm-table__actions">' +
        '<button type="button" data-action="view" data-id="' + e.id + '">View</button>' +
        '<button type="button" data-action="settlement" data-id="' + e.id + '">Settlement</button>' +
        '</div></td></tr>';
    }).join('');
  }

  function render() {
    var list = getFiltered();
    renderCards(list);
    renderTable(list);
    setView(viewMode);
  }

  function setView(mode) {
    viewMode = mode;
    localStorage.setItem('exmView', mode);
    var cards = $('exmCards');
    var table = $('exmTableWrap');
    if (cards) cards.hidden = mode !== 'grid';
    if (table) table.hidden = mode !== 'table';
    document.querySelectorAll('[data-view]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-view') === mode);
    });
  }

  function updateSidebar(e) {
    if (!e) return;
    activeExit = e;
    if ($('sideAvatar')) $('sideAvatar').textContent = initials(e.name);
    if ($('sideName')) $('sideName').textContent = e.name;
    if ($('sideMeta')) $('sideMeta').textContent = e.dept + ' · ' + e.designation;
    if ($('sideProgress')) $('sideProgress').style.width = e.progress + '%';
    if ($('sideProgressLabel')) $('sideProgressLabel').textContent = e.progress + '% complete';
    if ($('sideDays')) $('sideDays').textContent = Math.max(0, Math.round((100 - e.notice) / 3)) + ' days left';
    if ($('sideEmail')) $('sideEmail').textContent = e.email;
    if ($('sidePhone')) $('sidePhone').textContent = e.phone;
  }

  function openDrawer(e) {
    if (!e) return;
    updateSidebar(e);
    var scrim = $('exmDrawerScrim');
    if ($('drawerTitle')) $('drawerTitle').textContent = e.name;
    if ($('drawerSubtitle')) $('drawerSubtitle').textContent = e.empId + ' · ' + e.stage;
    if ($('drawerBody')) {
      $('drawerBody').innerHTML =
        '<div class="exm-drawer-block"><h3>Profile Summary</h3>' +
        '<dl class="exm-info-list">' +
        '<div class="exm-info-row"><dt>Employee ID</dt><dd>' + e.empId + '</dd></div>' +
        '<div class="exm-info-row"><dt>Department</dt><dd>' + e.dept + '</dd></div>' +
        '<div class="exm-info-row"><dt>Designation</dt><dd>' + e.designation + '</dd></div>' +
        '<div class="exm-info-row"><dt>Manager</dt><dd>' + e.manager + '</dd></div>' +
        '</dl></div>' +
        '<div class="exm-drawer-block"><h3>Exit Request</h3>' +
        '<dl class="exm-info-list">' +
        '<div class="exm-info-row"><dt>Type</dt><dd>' + e.type + '</dd></div>' +
        '<div class="exm-info-row"><dt>Reason</dt><dd>' + e.reason + '</dd></div>' +
        '<div class="exm-info-row"><dt>Resignation</dt><dd>' + e.resignDate + '</dd></div>' +
        '<div class="exm-info-row"><dt>Last Working Day</dt><dd>' + e.lwd + '</dd></div>' +
        '<div class="exm-info-row"><dt>Status</dt><dd>' + statusBadge(e.status) + '</dd></div>' +
        '</dl></div>' +
        '<div class="exm-drawer-block"><h3>Notice Progress</h3>' +
        '<div class="exm-progress"><div class="exm-progress__bar" style="width:' + e.progress + '%"></div></div>' +
        '<p style="font-size:12px;color:var(--muted);margin:8px 0 0">' + e.stage + ' · ' + e.progress + '% complete</p></div>' +
        '<div class="exm-drawer-block"><h3>Quick Snapshot</h3>' +
        '<p style="font-size:13px;color:var(--muted);margin:0;line-height:1.5">Assets, settlement, documents, and timeline are available in the main dashboard sections for this employee.</p></div>';
    }
    if (scrim) {
      scrim.classList.add('is-open');
      scrim.setAttribute('aria-hidden', 'false');
    }
  }

  function closeDrawer() {
    var scrim = $('exmDrawerScrim');
    if (scrim) {
      scrim.classList.remove('is-open');
      scrim.setAttribute('aria-hidden', 'true');
    }
  }

  function ripple(e, el) {
    var rect = el.getBoundingClientRect();
    var r = document.createElement('span');
    r.className = 'exm-ripple';
    var size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size / 2) + 'px';
    r.style.top = (e.clientY - rect.top - size / 2) + 'px';
    el.appendChild(r);
    r.addEventListener('animationend', function () { r.remove(); });
  }

  function bindEvents() {
    document.addEventListener('click', function (e) {
      var quick = e.target.closest('.exm-quick__card');
      if (quick) {
        ripple(e, quick);
        toast(quick.getAttribute('data-ui') || 'Action');
        return;
      }

      var viewBtn = e.target.closest('[data-view]');
      if (viewBtn) {
        setView(viewBtn.getAttribute('data-view'));
        return;
      }

      var action = e.target.closest('[data-action]');
      if (action) {
        var id = action.getAttribute('data-id');
        var emp = EXITS.find(function (x) { return x.id === id; });
        var act = action.getAttribute('data-action');
        if (act === 'view' && emp) openDrawer(emp);
        else {
          if (emp) updateSidebar(emp);
          toast(act, emp ? emp.name : '');
          if (act === 'checklist') document.getElementById('sectionChecklist') && document.getElementById('sectionChecklist').scrollIntoView({ behavior: 'smooth' });
          if (act === 'documents') document.getElementById('sectionDocuments') && document.getElementById('sectionDocuments').scrollIntoView({ behavior: 'smooth' });
          if (act === 'settlement') document.getElementById('sectionSettlement') && document.getElementById('sectionSettlement').scrollIntoView({ behavior: 'smooth' });
          if (act === 'timeline') document.getElementById('sectionTimeline') && document.getElementById('sectionTimeline').scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      var ui = e.target.closest('[data-ui]');
      if (ui) {
        toast(ui.getAttribute('data-ui').replace(/-/g, ' '));
        return;
      }

      var sortTh = e.target.closest('[data-sort]');
      if (sortTh) {
        var key = sortTh.getAttribute('data-sort');
        if (sortKey === key) sortAsc = !sortAsc;
        else { sortKey = key; sortAsc = true; }
        render();
      }
    });

    ['exmSearch', 'exmDept', 'exmStatus', 'exmType'].forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener('input', render);
      el.addEventListener('change', render);
    });

    $('btnResetFilters') && $('btnResetFilters').addEventListener('click', function () {
      if ($('exmSearch')) $('exmSearch').value = '';
      if ($('exmDept')) $('exmDept').value = '';
      if ($('exmStatus')) $('exmStatus').value = '';
      if ($('exmType')) $('exmType').value = '';
      render();
      toast('Filters reset');
    });

    $('btnNewExit') && $('btnNewExit').addEventListener('click', function () { toast('New Exit Request'); });
    $('btnExport') && $('btnExport').addEventListener('click', function () { toast('Export'); });
    $('btnRefresh') && $('btnRefresh').addEventListener('click', function () {
      renderKpi();
      render();
      toast('Refreshed');
    });

    $('drawerClose') && $('drawerClose').addEventListener('click', closeDrawer);
    $('drawerClose2') && $('drawerClose2').addEventListener('click', closeDrawer);
    $('drawerApprove') && $('drawerApprove').addEventListener('click', function () { toast('Approved'); closeDrawer(); });
    $('drawerReject') && $('drawerReject').addEventListener('click', function () { toast('Rejected'); closeDrawer(); });
    $('exmDrawerScrim') && $('exmDrawerScrim').addEventListener('click', function (e) {
      if (e.target === $('exmDrawerScrim')) closeDrawer();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    document.querySelectorAll('.exm-check-item input').forEach(function (cb) {
      cb.addEventListener('change', function () {
        toast(cb.checked ? 'Marked complete' : 'Marked pending', cb.parentNode.textContent.trim());
      });
    });
  }

  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.exm-reveal').forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.exm-reveal').forEach(function (el) { obs.observe(el); });
  }

  function init() {
    renderKpi();
    render();
    updateSidebar(activeExit);
    bindEvents();
    initReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
