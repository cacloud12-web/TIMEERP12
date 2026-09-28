(function () {
  'use strict';

  var TASKS = {
    TSK01190: {
      id: 'TSK01190', title: 'Client consultation call', service: 'Tax consultation',
      subservice: 'Income tax consultation', targetDate: '13/04/2026', dueDate: '18/04/2026 06:08:00',
      priority: 'Medium', branch: 'CA CloudDesk', status: 'Open'
    },
    TSK01145: {
      id: 'TSK01145', title: 'Return Filing', service: 'GST Filing',
      subservice: 'Monthly return', targetDate: '20/07/2026', dueDate: '25/07/2026 18:00:00',
      priority: 'High', branch: 'CA CloudDesk', status: 'Processing'
    }
  };

  var SERVICES = [
    'Tax consultation', 'Incorporation — NGO — 12 AA - Application', 'AUDIT — 22 502',
    '24G Return — 24G Return', 'Incorporation — NGO — 80G Application', 'Bank — Account Activation',
    'GEM Registration — Account Creation', 'Accounting — Accounting', 'GST Filing'
  ];

  var CONSULTANTS = [
    'Tarun Gaur (AN2)', 'Suhanshi Rawat (SA009)', 'SONIYA KASHYAP (SO6829)', 'Hardik rawat (HA6413)',
    'SIMRAN KASHYAP (SI6830)', 'Aastha Tyagi (AS0010)', 'Shivam Kumar (SK009)', 'Aakash (AA6215)',
    'Dev Aggarwal (DE6203)'
  ];

  var els = {
    taskId: document.getElementById('teTaskId'),
    backLink: document.getElementById('teBackLink'),
    taskTitle: document.getElementById('teTaskTitle'),
    charCount: document.getElementById('teCharCount'),
    serviceBtn: document.getElementById('teServiceBtn'),
    serviceList: document.getElementById('teServiceList'),
    consultantBtn: document.getElementById('teConsultantBtn'),
    consultantList: document.getElementById('teConsultantList'),
    dueDateWrap: document.getElementById('teDueDateWrap'),
    dueDate: document.getElementById('teDueDate'),
    targetDate: document.getElementById('teTargetDate'),
    priority: document.getElementById('tePriority'),
    subservice: document.getElementById('teSubservice'),
    statusBtns: document.getElementById('teStatusBtns'),
    addStage: document.getElementById('teAddStage'),
    stageBody: document.getElementById('teStageBody'),
    form: document.getElementById('teForm'),
    submitBtn: document.getElementById('teSubmitBtn'),
    dtpScrim: document.getElementById('teDtpScrim'),
    dtpLabel: document.getElementById('teDtpLabel'),
    dtpGrid: document.getElementById('teDtpGrid'),
    dtpHours: document.getElementById('teDtpHours'),
    dtpMins: document.getElementById('teDtpMins'),
    dtpTimeLabel: document.getElementById('teDtpTimeLabel'),
    dtpNow: document.getElementById('teDtpNow'),
    dtpOk: document.getElementById('teDtpOk'),
    topClock: document.getElementById('teTopClock')
  };

  var dtpState = { year: 2026, month: 3, day: 18, hour: 6, min: 8 };

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

  function updateCharCount() {
    if (!els.taskTitle || !els.charCount) return;
    var len = els.taskTitle.value.length;
    els.charCount.textContent = len + ' / 200';
  }

  function renderTask() {
    var id = getTaskId();
    var task = TASKS[id] || TASKS.TSK01190;
    document.title = 'Edit ' + task.id + ' — TIME ERP HRMS';
    if (els.taskId) els.taskId.textContent = task.id;
    if (els.backLink) els.backLink.href = 'task_view.html?id=' + encodeURIComponent(task.id);
    if (els.taskTitle) els.taskTitle.value = task.title;
    if (els.serviceBtn) els.serviceBtn.textContent = task.service;
    if (els.targetDate) els.targetDate.value = task.targetDate;
    if (els.dueDate) els.dueDate.value = task.dueDate;
    if (els.priority) els.priority.value = task.priority;
    if (els.subservice && task.subservice) {
      var opts = els.subservice.options;
      for (var i = 0; i < opts.length; i++) {
        if (opts[i].text === task.subservice) { els.subservice.selectedIndex = i; break; }
      }
    }
    if (els.statusBtns && task.status) {
      els.statusBtns.querySelectorAll('.te-status-pill').forEach(function (btn) {
        btn.classList.toggle('te-status-pill--active', btn.dataset.status === task.status);
      });
    }
    updateCharCount();
    parseDueDate(task.dueDate);
  }

  function parseDueDate(str) {
    if (!str) return;
    var m = str.match(/(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})/);
    if (!m) return;
    dtpState = { day: +m[1], month: +m[2] - 1, year: +m[3], hour: +m[4], min: +m[5] };
  }

  function buildSearchList(listEl, items, activeVal) {
    if (!listEl) return;
    listEl.innerHTML = items.map(function (item) {
      var cls = item === activeVal ? ' class="is-active"' : '';
      return '<li><button type="button"' + cls + ' data-val="' + item.replace(/"/g, '&quot;') + '">' + item + '</button></li>';
    }).join('');
  }

  function initSearchSelect(wrap, items, btn, listEl) {
    if (!wrap || !btn || !listEl) return;
    var pop = wrap.querySelector('.te-search-select__pop');
    var searchInput = pop && pop.querySelector('input');

    function close() {
      if (pop) pop.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }

    function open() {
      document.querySelectorAll('.te-search-select__pop').forEach(function (p) { p.hidden = true; });
      document.querySelectorAll('.te-search-select__btn').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      buildSearchList(listEl, items, btn.textContent.trim());
      if (pop) pop.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      if (searchInput) { searchInput.value = ''; searchInput.focus(); }
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (pop && !pop.hidden) close(); else open();
    });

    listEl.addEventListener('click', function (e) {
      var pick = e.target.closest('button[data-val]');
      if (!pick) return;
      btn.textContent = pick.dataset.val;
      close();
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        var q = searchInput.value.toLowerCase();
        buildSearchList(listEl, items.filter(function (i) { return i.toLowerCase().indexOf(q) >= 0; }), btn.textContent.trim());
      });
    }
  }

  function bindTagRemove() {
    document.querySelectorAll('.te-tag-input').forEach(function (box) {
      box.addEventListener('click', function (e) {
        var rm = e.target.closest('.te-tag button');
        if (rm) rm.closest('.te-tag').remove();
      });
    });
  }

  function bindStatusPills() {
    if (!els.statusBtns) return;
    els.statusBtns.addEventListener('click', function (e) {
      var pill = e.target.closest('.te-status-pill');
      if (!pill) return;
      els.statusBtns.querySelectorAll('.te-status-pill').forEach(function (b) { b.classList.remove('te-status-pill--active'); });
      pill.classList.add('te-status-pill--active');
    });
  }

  function bindAddStage() {
    if (!els.addStage || !els.stageBody) return;
    els.addStage.addEventListener('click', function () {
      var row = document.createElement('div');
      row.className = 'te-stage-row';
      row.innerHTML =
        '<select class="te-input te-input--sm"><option>New stage</option></select>' +
        '<select class="te-input te-input--sm"><option>6405</option></select>' +
        '<input type="text" class="te-input te-input--sm" placeholder="Enter Weightage">' +
        '<button type="button" class="te-stage-del" aria-label="Remove stage">−</button>';
      els.stageBody.parentNode.insertBefore(row, els.addStage);
      row.querySelector('.te-stage-del').addEventListener('click', function () { row.remove(); });
    });
    var del = els.stageBody.querySelector('.te-stage-del');
    if (del) del.addEventListener('click', function () { toast('Stage', 'At least one stage is required.'); });
  }

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function renderDtpCalendar() {
    if (!els.dtpGrid || !els.dtpLabel) return;
    els.dtpLabel.textContent = MONTHS[dtpState.month] + ' ' + dtpState.year;
    var first = new Date(dtpState.year, dtpState.month, 1).getDay();
    var days = new Date(dtpState.year, dtpState.month + 1, 0).getDate();
    var html = ['Su','Mo','Tu','We','Th','Fr','Sa'].map(function (d) { return '<span>' + d + '</span>'; }).join('');
    var i;
    for (i = 0; i < first; i++) html += '<button type="button" class="is-muted" tabindex="-1"></button>';
    for (i = 1; i <= days; i++) {
      var sel = i === dtpState.day ? ' class="is-selected"' : '';
      html += '<button type="button"' + sel + ' data-day="' + i + '">' + i + '</button>';
    }
    els.dtpGrid.innerHTML = html;
    els.dtpGrid.querySelectorAll('button[data-day]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        dtpState.day = +btn.dataset.day;
        renderDtpCalendar();
        updateDtpTimeLabel();
      });
    });
  }

  function renderDtpTime() {
    if (!els.dtpHours || !els.dtpMins) return;
    els.dtpHours.innerHTML = Array.from({ length: 24 }, function (_, h) {
      var sel = h === dtpState.hour ? ' class="is-selected"' : '';
      return '<button type="button"' + sel + ' data-h="' + h + '">' + String(h).padStart(2, '0') + '</button>';
    }).join('');
    els.dtpMins.innerHTML = Array.from({ length: 60 }, function (_, m) {
      var sel = m === dtpState.min ? ' class="is-selected"' : '';
      return '<button type="button"' + sel + ' data-m="' + m + '">' + String(m).padStart(2, '0') + '</button>';
    }).join('');
  }

  function updateDtpTimeLabel() {
    if (!els.dtpTimeLabel) return;
    els.dtpTimeLabel.textContent = String(dtpState.hour).padStart(2, '0') + ':' + String(dtpState.min).padStart(2, '0');
  }

  function openDtp() {
    if (!els.dtpScrim) return;
    renderDtpCalendar();
    renderDtpTime();
    updateDtpTimeLabel();
    els.dtpScrim.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeDtp() {
    if (!els.dtpScrim) return;
    els.dtpScrim.hidden = true;
    document.body.style.overflow = '';
  }

  function applyDtp() {
    if (!els.dueDate) return;
    var d = String(dtpState.day).padStart(2, '0');
    var m = String(dtpState.month + 1).padStart(2, '0');
    els.dueDate.value = d + '/' + m + '/' + dtpState.year + ' ' +
      String(dtpState.hour).padStart(2, '0') + ':' + String(dtpState.min).padStart(2, '0') + ':00';
    closeDtp();
  }

  function bindDtp() {
    if (els.dueDateWrap) els.dueDateWrap.addEventListener('click', openDtp);
    if (els.dtpScrim) {
      els.dtpScrim.addEventListener('click', function (e) {
        if (e.target === els.dtpScrim) closeDtp();
        var nav = e.target.closest('[data-nav]');
        if (!nav) return;
        var type = nav.dataset.nav;
        if (type === 'm-prev') { dtpState.month--; if (dtpState.month < 0) { dtpState.month = 11; dtpState.year--; } }
        else if (type === 'm-next') { dtpState.month++; if (dtpState.month > 11) { dtpState.month = 0; dtpState.year++; } }
        else if (type === 'yy-prev') dtpState.year--;
        else if (type === 'yy-next') dtpState.year++;
        renderDtpCalendar();
      });
    }
    if (els.dtpHours) {
      els.dtpHours.addEventListener('click', function (e) {
        var b = e.target.closest('[data-h]');
        if (!b) return;
        dtpState.hour = +b.dataset.h;
        renderDtpTime();
        updateDtpTimeLabel();
      });
    }
    if (els.dtpMins) {
      els.dtpMins.addEventListener('click', function (e) {
        var b = e.target.closest('[data-m]');
        if (!b) return;
        dtpState.min = +b.dataset.m;
        renderDtpTime();
        updateDtpTimeLabel();
      });
    }
    if (els.dtpOk) els.dtpOk.addEventListener('click', applyDtp);
    if (els.dtpNow) {
      els.dtpNow.addEventListener('click', function () {
        var n = new Date();
        dtpState = { year: n.getFullYear(), month: n.getMonth(), day: n.getDate(), hour: n.getHours(), min: n.getMinutes() };
        renderDtpCalendar();
        renderDtpTime();
        updateDtpTimeLabel();
      });
    }
  }

  function updateClock() {
    if (!els.topClock) return;
    var d = new Date();
    els.topClock.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  function bindEvents() {
    if (els.taskTitle) els.taskTitle.addEventListener('input', updateCharCount);
    if (els.form) {
      els.form.addEventListener('submit', function (e) {
        e.preventDefault();
        var id = getTaskId();
        toast('Updated', 'Task ' + id + ' updated successfully.');
        setTimeout(function () { window.location.href = 'task_view.html?id=' + encodeURIComponent(id); }, 800);
      });
    }
    document.addEventListener('click', function () {
      document.querySelectorAll('.te-search-select__pop').forEach(function (p) { p.hidden = true; });
      document.querySelectorAll('.te-search-select__btn').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (els.dtpScrim && !els.dtpScrim.hidden) closeDtp();
      }
    });
  }

  function init() {
    renderTask();
    initSearchSelect(document.querySelector('[data-te-select="service"]'), SERVICES, els.serviceBtn, els.serviceList);
    initSearchSelect(document.querySelector('[data-te-select="consultant"]'), CONSULTANTS, els.consultantBtn, els.consultantList);
    bindTagRemove();
    bindStatusPills();
    bindAddStage();
    bindDtp();
    bindEvents();
    updateClock();
    setInterval(updateClock, 30000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
