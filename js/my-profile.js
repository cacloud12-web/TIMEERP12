/**
 * My Profile — TimeERP
 * Tab switching and action button feedback.
 */
(function () {
  'use strict';

  function toast(title, detail) {
    if (window.DashboardShell && typeof window.DashboardShell.toast === 'function') {
      window.DashboardShell.toast(title, detail);
      return;
    }
    var stack = document.getElementById('toastStack');
    if (!stack) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<strong>' + title + '</strong><span>' + (detail || '') + '</span>';
    stack.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 3200);
  }

  function activateTab(id) {
    var tabs = document.querySelectorAll('.mp-profile-tab[data-mp-tab]');
    var panels = document.querySelectorAll('.mp-panel[data-mp-panel]');
    tabs.forEach(function (t) {
      var active = t.getAttribute('data-mp-tab') === id;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panels.forEach(function (panel) {
      var match = panel.getAttribute('data-mp-panel') === id;
      panel.classList.toggle('is-active', match);
      panel.hidden = !match;
    });
  }

  function initTabs() {
    var tabs = document.querySelectorAll('.mp-profile-tab[data-mp-tab]');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-mp-tab');
        if (!id) return;
        activateTab(id);
      });
    });

    var hash = (location.hash || '').replace(/^#/, '');
    if (hash && document.querySelector('.mp-profile-tab[data-mp-tab="' + hash + '"]')) {
      activateTab(hash);
    }
  }

  function initActions() {
    var remindersBtn = document.getElementById('mpViewRemindersBtn');
    if (remindersBtn) {
      remindersBtn.addEventListener('click', function () {
        toast('Compliance reminders', 'Opening pending compliance items.');
      });
    }

    var activityBtn = document.getElementById('mpViewActivityBtn');
    var activityTimeline = document.getElementById('mpActivityTimeline');
    var activityCard = document.querySelector('.mp-activity-card');
    if (activityBtn && activityTimeline) {
      activityBtn.addEventListener('click', function () {
        var open = activityTimeline.hidden;
        activityTimeline.hidden = !open;
        activityBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (activityCard) activityCard.classList.toggle('is-open', open);
        var label = activityBtn.querySelector('.mp-activity__btn-label');
        if (label) label.textContent = open ? 'Hide Activity' : 'View Activity';
      });
    }

    var modIcons = document.querySelectorAll('.mp-mod-nav__actions .mp-mod-icon-btn');
    modIcons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var label = btn.getAttribute('aria-label') || 'Action';
        if (label === 'Trash') {
          var root = /\/HRMS\//i.test(window.location.pathname || '') ? '../' : '';
          window.location.href = root + 'trash_bin.html';
        } else if (label === 'Lock' || label === 'Unlock') {
          var rootUnlock = /\/HRMS\//i.test(window.location.pathname || '') ? '../' : '';
          window.location.href = rootUnlock + 'user_account_settings.html';
        } else if (label === 'Logout') {
          toast('Logged out', 'You have been signed out.');
          setTimeout(function () {
            var root = /\/HRMS\//i.test(window.location.pathname || '') ? '../' : '';
            window.location.href = root + 'index.html';
          }, 600);
        }
      });
    });
  }

  function initTaskUi() {
    document.querySelectorAll('.mp-task-filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.mp-task-filter').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
      });
    });

    var track = document.getElementById('mpTaskFilterTrack');
    var prev = document.getElementById('mpTaskFilterPrev');
    if (prev && track) {
      prev.addEventListener('click', function () {
        track.scrollBy({ left: -160, behavior: 'smooth' });
      });
    }

    document.querySelectorAll('.mp-view-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = btn.getAttribute('data-view');
        document.querySelectorAll('.mp-view-tab').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });

        document.querySelectorAll('.mp-task-view').forEach(function (panel) {
          var match = panel.getAttribute('data-task-view') === view;
          panel.hidden = !match;
          panel.classList.toggle('is-active', match);
        });
      });
    });

    initTaskCalendarUi();

    document.querySelectorAll('.mp-report-acc__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = btn.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        var body = btn.nextElementSibling;
        if (body) body.hidden = !open;
      });
    });

    document.querySelectorAll('.mp-status-col__all, .mp-task-id, .mp-kb-card__id, .mp-list-task-id').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        toast('Tasks', 'Opening task details.');
      });
    });
  }

  function initTaskCalendarUi() {
    var grid = document.getElementById('mpTaskCalGrid');
    var monthInput = document.getElementById('mpTaskCalMonth');
    var prev = document.getElementById('mpTaskCalPrev');
    var next = document.getElementById('mpTaskCalNext');
    if (!grid || !monthInput) return;

    var selectedKey = '2026-08-21';

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function keyFrom(y, m, d) { return y + '-' + pad(m + 1) + '-' + pad(d); }

    function render() {
      var parts = (monthInput.value || '2026-08').split('-');
      var y = parseInt(parts[0], 10);
      var m = parseInt(parts[1], 10) - 1;
      var first = new Date(y, m, 1);
      var startPad = first.getDay();
      var daysInMonth = new Date(y, m + 1, 0).getDate();
      var prevDays = new Date(y, m, 0).getDate();
      var total = Math.ceil((startPad + daysInMonth) / 7) * 7;
      var html = '';

      for (var i = 0; i < total; i++) {
        var dayNum;
        var cellY = y;
        var cellM = m;
        var muted = false;

        if (i < startPad) {
          dayNum = prevDays - startPad + i + 1;
          cellM = m - 1;
          if (cellM < 0) { cellM = 11; cellY--; }
          muted = true;
        } else if (i >= startPad + daysInMonth) {
          dayNum = i - (startPad + daysInMonth) + 1;
          cellM = m + 1;
          if (cellM > 11) { cellM = 0; cellY++; }
          muted = true;
        } else {
          dayNum = i - startPad + 1;
        }

        var key = keyFrom(cellY, cellM, dayNum);
        var cls = 'mp-task-cal-day' + (muted ? ' is-muted' : '') + (key === selectedKey ? ' is-selected' : '');
        html += '<button type="button" class="' + cls + '" data-key="' + key + '" aria-label="' + key + '">';
        html += '<span class="mp-task-cal-day__num">' + pad(dayNum) + '</span>';
        html += '</button>';
      }

      grid.innerHTML = html;
      grid.querySelectorAll('.mp-task-cal-day').forEach(function (btn) {
        btn.addEventListener('click', function () {
          selectedKey = btn.getAttribute('data-key');
          render();
        });
      });
    }

    function shiftMonth(delta) {
      var parts = (monthInput.value || '2026-08').split('-');
      var y = parseInt(parts[0], 10);
      var m = parseInt(parts[1], 10) - 1 + delta;
      while (m > 11) { m -= 12; y++; }
      while (m < 0) { m += 12; y--; }
      monthInput.value = y + '-' + pad(m + 1);
      render();
    }

    if (prev) prev.addEventListener('click', function () { shiftMonth(-1); });
    if (next) next.addEventListener('click', function () { shiftMonth(1); });
    monthInput.addEventListener('change', render);
    render();
  }

  function initCalendarUi() {
    var grid = document.getElementById('mpCalGrid');
    var monthInput = document.getElementById('mpCalMonth');
    var rangeLabel = document.getElementById('mpCalRangeLabel');
    var weekGrid = document.getElementById('mpCalWeekGrid');
    var dayGrid = document.getElementById('mpCalDayGrid');
    if (!grid || !monthInput) return;

    var MARKS = {
      '2026-08-02': { badge: 'H' },
      '2026-08-03': { badge: 'P' },
      '2026-08-04': { badge: 'P' },
      '2026-08-05': { badge: 'P' },
      '2026-08-06': { badge: 'P' },
      '2026-08-07': { badge: 'P' },
      '2026-08-08': { badge: 'H' },
      '2026-08-09': { badge: 'H' },
      '2026-08-10': { badge: 'P' },
      '2026-08-11': { badge: 'P' },
      '2026-08-12': { badge: 'P' },
      '2026-08-13': { badge: 'P' },
      '2026-08-14': { badge: 'P' },
      '2026-08-15': { badge: 'H' },
      '2026-08-16': { badge: 'H' },
      '2026-08-17': { badge: 'P' },
      '2026-08-18': { badge: 'P' },
      '2026-08-19': { badge: 'P', time: '5:00:11' },
      '2026-08-20': { badge: 'P' },
      '2026-08-21': { badge: 'P/A' },
      '2026-08-22': { badge: 'H' },
      '2026-08-23': { badge: 'H' },
      '2026-08-24': { badge: 'P/A' },
      '2026-08-25': { badge: 'P/A' },
      '2026-08-26': { badge: 'P/A' },
      '2026-08-27': { badge: 'P/A' },
      '2026-08-28': { badge: 'P/A' },
      '2026-08-29': { badge: 'H' },
      '2026-08-30': { badge: 'H' },
      '2026-08-31': { badge: 'P/A' }
    };

    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var selectedKey = '2026-08-21';
    var currentView = 'month';
    var focusDate = parseKey(selectedKey);

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function keyFrom(y, m, d) { return y + '-' + pad(m + 1) + '-' + pad(d); }
    function parseKey(key) {
      var p = (key || '2026-08-21').split('-');
      return new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
    }
    function toKey(date) {
      return keyFrom(date.getFullYear(), date.getMonth(), date.getDate());
    }
    function startOfWeek(date) {
      var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      d.setDate(d.getDate() - d.getDay());
      return d;
    }
    function addDays(date, n) {
      var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      d.setDate(d.getDate() + n);
      return d;
    }
    function formatHour(h) {
      if (h === 0) return '12:00 AM';
      if (h < 12) return h + ':00 AM';
      if (h === 12) return '12:00 PM';
      return (h - 12) + ':00 PM';
    }
    function syncMonthInput() {
      monthInput.value = focusDate.getFullYear() + '-' + pad(focusDate.getMonth() + 1);
    }

    function updateRangeLabel() {
      if (!rangeLabel) return;
      if (currentView === 'month') {
        rangeLabel.textContent = MONTHS[focusDate.getMonth()] + ' ' + focusDate.getFullYear();
      } else if (currentView === 'week') {
        var start = startOfWeek(focusDate);
        var end = addDays(start, 6);
        if (start.getMonth() === end.getMonth()) {
          rangeLabel.textContent = MONTHS[start.getMonth()] + ' ' + start.getDate() + ' – ' + end.getDate();
        } else {
          rangeLabel.textContent = MONTHS[start.getMonth()].slice(0, 3) + ' ' + start.getDate() + ' – ' + MONTHS[end.getMonth()].slice(0, 3) + ' ' + end.getDate();
        }
      } else if (currentView === 'day') {
        rangeLabel.textContent = DAYS_LONG[focusDate.getDay()] + ' ' + MONTHS[focusDate.getMonth()].slice(0, 3) + ' ' + focusDate.getDate();
      } else {
        var aStart = focusDate;
        var aEnd = addDays(focusDate, 30);
        rangeLabel.textContent =
          pad(aStart.getMonth() + 1) + '/' + pad(aStart.getDate()) + '/' + aStart.getFullYear() +
          ' – ' +
          pad(aEnd.getMonth() + 1) + '/' + pad(aEnd.getDate()) + '/' + aEnd.getFullYear();
      }
    }

    function showPanel(view) {
      document.querySelectorAll('[data-cal-panel]').forEach(function (panel) {
        var match = panel.getAttribute('data-cal-panel') === view;
        panel.hidden = !match;
      });
    }

    function renderMonth() {
      var y = focusDate.getFullYear();
      var m = focusDate.getMonth();
      var first = new Date(y, m, 1);
      var startPad = first.getDay();
      var daysInMonth = new Date(y, m + 1, 0).getDate();
      var prevDays = new Date(y, m, 0).getDate();
      var total = Math.ceil((startPad + daysInMonth) / 7) * 7;
      var html = '';

      for (var i = 0; i < total; i++) {
        var dayNum;
        var cellY = y;
        var cellM = m;
        var muted = false;
        if (i < startPad) {
          dayNum = prevDays - startPad + i + 1;
          cellM = m - 1;
          if (cellM < 0) { cellM = 11; cellY--; }
          muted = true;
        } else if (i >= startPad + daysInMonth) {
          dayNum = i - (startPad + daysInMonth) + 1;
          cellM = m + 1;
          if (cellM > 11) { cellM = 0; cellY++; }
          muted = true;
        } else {
          dayNum = i - startPad + 1;
        }

        var key = keyFrom(cellY, cellM, dayNum);
        var mark = MARKS[key] || null;
        var cls = 'mp-cal-day' + (muted ? ' is-muted' : '') + (key === selectedKey ? ' is-selected' : '');
        html += '<button type="button" class="' + cls + '" data-key="' + key + '" aria-label="' + key + '">';
        html += '<span class="mp-cal-day__num">' + pad(dayNum) + '</span>';
        if (mark && mark.badge) html += '<span class="mp-cal-badge">' + mark.badge + '</span>';
        if (mark && mark.time) html += '<span class="mp-cal-time">' + mark.time + '</span>';
        html += '</button>';
      }

      grid.innerHTML = html;
      grid.querySelectorAll('.mp-cal-day').forEach(function (btn) {
        btn.addEventListener('click', function () {
          selectedKey = btn.getAttribute('data-key');
          focusDate = parseKey(selectedKey);
          syncMonthInput();
          renderAll();
        });
      });
    }

    function renderTimeGrid(container, days) {
      if (!container) return;
      var highlightKey = toKey(focusDate);
      var html = '<div class="mp-cal-timegrid__inner" style="--mp-cal-cols:' + days.length + '">';
      html += '<div class="mp-cal-timegrid__corner"></div>';
      days.forEach(function (d) {
        var key = toKey(d);
        var active = key === highlightKey ? ' is-today' : '';
        html += '<div class="mp-cal-timegrid__dayhead' + active + '">' + d.getDate() + ' ' + DAYS_SHORT[d.getDay()] + '</div>';
      });
      for (var h = 0; h < 24; h++) {
        html += '<div class="mp-cal-timegrid__label">' + formatHour(h) + '</div>';
        days.forEach(function (d) {
          var key = toKey(d);
          var active = key === highlightKey ? ' is-today' : '';
          html += '<div class="mp-cal-timegrid__slot' + active + '" data-key="' + key + '" data-hour="' + h + '"></div>';
        });
      }
      html += '</div>';
      container.innerHTML = html;
    }

    function renderWeek() {
      var start = startOfWeek(focusDate);
      var days = [];
      for (var i = 0; i < 7; i++) days.push(addDays(start, i));
      renderTimeGrid(weekGrid, days);
    }

    function renderDay() {
      renderTimeGrid(dayGrid, [new Date(focusDate.getFullYear(), focusDate.getMonth(), focusDate.getDate())]);
    }

    function renderAll() {
      showPanel(currentView);
      updateRangeLabel();
      if (currentView === 'month') renderMonth();
      else if (currentView === 'week') renderWeek();
      else if (currentView === 'day') renderDay();
    }

    function setView(view) {
      currentView = view;
      document.querySelectorAll('.mp-cal-view').forEach(function (b) {
        b.classList.toggle('is-active', b.getAttribute('data-cal-view') === view);
      });
      renderAll();
    }

    function shiftFocus(delta) {
      if (currentView === 'month') {
        focusDate = new Date(focusDate.getFullYear(), focusDate.getMonth() + delta, 1);
      } else if (currentView === 'week') {
        focusDate = addDays(focusDate, delta * 7);
      } else if (currentView === 'day') {
        focusDate = addDays(focusDate, delta);
      } else {
        focusDate = addDays(focusDate, delta * 30);
      }
      selectedKey = toKey(focusDate);
      syncMonthInput();
      renderAll();
    }

    function shiftMonth(delta) {
      focusDate = new Date(focusDate.getFullYear(), focusDate.getMonth() + delta, Math.min(focusDate.getDate(), 28));
      selectedKey = toKey(focusDate);
      syncMonthInput();
      renderAll();
    }

    document.getElementById('mpCalPrev').addEventListener('click', function () { shiftMonth(-1); });
    document.getElementById('mpCalNext').addEventListener('click', function () { shiftMonth(1); });
    monthInput.addEventListener('change', function () {
      var parts = (monthInput.value || '2026-08').split('-');
      focusDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, 1);
      selectedKey = toKey(focusDate);
      renderAll();
    });

    var todayBtn = document.getElementById('mpCalToday');
    var backBtn = document.getElementById('mpCalBack');
    var fwdBtn = document.getElementById('mpCalFwd');
    if (todayBtn) {
      todayBtn.addEventListener('click', function () {
        focusDate = parseKey('2026-08-21');
        selectedKey = '2026-08-21';
        syncMonthInput();
        renderAll();
      });
    }
    if (backBtn) backBtn.addEventListener('click', function () { shiftFocus(-1); });
    if (fwdBtn) fwdBtn.addEventListener('click', function () { shiftFocus(1); });

    document.querySelectorAll('.mp-cal-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('.mp-cal-chip').forEach(function (c) {
          c.classList.toggle('is-active', c === chip);
        });
      });
    });

    document.querySelectorAll('.mp-cal-view').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setView(btn.getAttribute('data-cal-view') || 'month');
      });
    });

    var addBtn = document.getElementById('mpAddAppointment');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        openApptModal();
      });
    }
    var googleBtn = document.getElementById('mpGoogleSignIn');
    if (googleBtn) {
      googleBtn.addEventListener('click', function () {
        toast('Google Calendar', 'Connect Google account to sync events.');
      });
    }

    renderAll();
  }

  function openApptModal() {
    var modal = document.getElementById('mpApptModal');
    if (!modal) return;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var first = document.getElementById('mpApptClient');
    if (first) setTimeout(function () { first.focus(); }, 40);
  }

  function closeApptModal() {
    var modal = document.getElementById('mpApptModal');
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.querySelectorAll('.mp-combo.is-open, .mp-status-field.is-open').forEach(function (el) {
      el.classList.remove('is-open');
    });
    document.querySelectorAll('.mp-combo__list, .mp-status-list').forEach(function (el) {
      el.hidden = true;
    });
  }

  function initAppointmentModal() {
    var modal = document.getElementById('mpApptModal');
    var form = document.getElementById('mpApptForm');
    if (!modal || !form) return;

    modal.querySelectorAll('[data-appt-close]').forEach(function (el) {
      el.addEventListener('click', closeApptModal);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeApptModal();
    });

    function setupCombo(root) {
      var input = root.querySelector('.mp-combo__input');
      var list = root.querySelector('.mp-combo__list');
      if (!input || !list) return;

      function openList() {
        document.querySelectorAll('.mp-combo.is-open').forEach(function (other) {
          if (other !== root) {
            other.classList.remove('is-open');
            var ol = other.querySelector('.mp-combo__list');
            if (ol) ol.hidden = true;
          }
        });
        closeStatusList();
        root.classList.add('is-open');
        list.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        filterList('');
      }

      function closeList() {
        root.classList.remove('is-open');
        list.hidden = true;
        input.setAttribute('aria-expanded', 'false');
      }

      function filterList(q) {
        var query = (q || '').toLowerCase();
        list.querySelectorAll('li').forEach(function (li) {
          var text = (li.getAttribute('data-value') || li.textContent || '').toLowerCase();
          var show = !query || text.indexOf(query) !== -1;
          li.hidden = !show;
          li.classList.toggle('is-active', false);
        });
        var firstVisible = list.querySelector('li:not([hidden])');
        if (firstVisible) firstVisible.classList.add('is-active');
      }

      input.addEventListener('focus', openList);
      input.addEventListener('click', openList);
      input.addEventListener('input', function () { openList(); filterList(input.value); });

      list.querySelectorAll('li').forEach(function (li) {
        li.addEventListener('mousedown', function (e) {
          e.preventDefault();
          input.value = li.getAttribute('data-value') || li.textContent;
          closeList();
        });
      });

      input.addEventListener('blur', function () {
        setTimeout(closeList, 120);
      });
    }

    document.querySelectorAll('.mp-combo[data-combo]').forEach(setupCombo);

    var statusBtn = document.getElementById('mpApptStatusBtn');
    var statusText = document.getElementById('mpApptStatusText');
    var statusInput = document.getElementById('mpApptStatus');
    var statusList = document.getElementById('mpApptStatusList');
    var statusField = statusBtn && statusBtn.closest('.mp-status-field');

    function closeStatusList() {
      if (!statusField || !statusList || !statusBtn) return;
      statusField.classList.remove('is-open');
      statusList.hidden = true;
      statusBtn.setAttribute('aria-expanded', 'false');
    }

    if (statusBtn && statusList && statusField) {
      statusBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        document.querySelectorAll('.mp-combo.is-open').forEach(function (other) {
          other.classList.remove('is-open');
          var ol = other.querySelector('.mp-combo__list');
          if (ol) ol.hidden = true;
        });
        var open = statusList.hidden;
        statusList.hidden = !open;
        statusField.classList.toggle('is-open', open);
        statusBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      statusList.querySelectorAll('[data-status]').forEach(function (pill) {
        pill.addEventListener('click', function () {
          var val = pill.getAttribute('data-status');
          statusInput.value = val;
          statusText.textContent = val;
          statusBtn.classList.add('has-value');
          statusText.className = 'mp-status-trigger__text mp-status-pill mp-status-pill--' + val.toLowerCase();
          statusText.style.display = 'inline-block';
          statusText.style.padding = '2px 8px';
          statusText.style.borderRadius = '6px';
          closeStatusList();
        });
      });

      document.addEventListener('click', function (e) {
        if (!statusField.contains(e.target)) closeStatusList();
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var client = (document.getElementById('mpApptClient') || {}).value || '';
      var employee = (document.getElementById('mpApptEmployee') || {}).value || '';
      var date = (document.getElementById('mpApptDate') || {}).value || '';
      var status = (document.getElementById('mpApptStatus') || {}).value || '';

      if (!client || !employee || !date || !status) {
        toast('Required fields', 'Please fill Client, Employee, Date & time, and Status.');
        return;
      }

      closeApptModal();
      toast('Appointment created', 'Saved for ' + client + '.');
      form.reset();
      if (statusText) {
        statusText.textContent = 'Select status';
        statusText.className = 'mp-status-trigger__text';
        statusText.removeAttribute('style');
      }
      if (statusBtn) statusBtn.classList.remove('has-value');
      if (statusInput) statusInput.value = '';
    });
  }

  function initTimesheetUi() {
    var body = document.getElementById('mpTsBody');
    var addBtn = document.getElementById('mpTsAdd');
    var tsModal = document.getElementById('mpTsModal');
    var tsForm = document.getElementById('mpTsForm');

    function openTsModal() {
      if (!tsModal) return;
      tsModal.hidden = false;
      tsModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeTsModal() {
      if (!tsModal) return;
      tsModal.hidden = true;
      tsModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (addBtn) {
      addBtn.addEventListener('click', openTsModal);
    }

    if (tsModal) {
      tsModal.querySelectorAll('[data-ts-close]').forEach(function (el) {
        el.addEventListener('click', closeTsModal);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !tsModal.hidden) closeTsModal();
      });
    }

    if (tsForm && body) {
      tsForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var date = (document.getElementById('mpTsDate') || {}).value || '';
        var branch = (document.getElementById('mpTsBranch') || {}).value || '';
        if (!date || !branch) {
          toast('Required fields', 'Please fill Select Date and Branch.');
          return;
        }

        var n = body.querySelectorAll('.mp-ts-row').length + 1;
        var billable = document.getElementById('mpTsBillable');
        var client = (document.getElementById('mpTsClient') || {}).value || '';
        var service = (document.getElementById('mpTsService') || {}).value || '';
        var task = (document.getElementById('mpTsTask') || {}).value || '';
        var tr = document.createElement('tr');
        tr.className = 'mp-ts-row';
        tr.innerHTML =
          '<td>' + n + '</td>' +
          '<td><label class="mp-ts-check"><input type="checkbox"' + (billable && billable.checked ? ' checked' : '') + ' aria-label="Billable"><span></span></label></td>' +
          '<td><select aria-label="Branch"><option value="">Select</option><option' + (branch === 'CA CloudDesk' ? ' selected' : '') + '>CA CloudDesk</option><option' + (branch === 'Blumon Wealth Management' ? ' selected' : '') + '>Blumon Wealth Management</option><option' + (branch === 'Ghaziabad' ? ' selected' : '') + '>Ghaziabad</option></select></td>' +
          '<td><select aria-label="Client"><option value="">Select</option><option' + (client === 'Internal' ? ' selected' : '') + '>Internal</option><option' + (client.indexOf('Law') === 0 ? ' selected' : '') + '>Law Seva</option><option' + (client === 'CA CloudDesk' ? ' selected' : '') + '>CA CloudDesk</option></select></td>' +
          '<td><select aria-label="Service"><option value="">Select</option><option' + (service === 'GST' ? ' selected' : '') + '>GST</option><option' + (service === 'Audit' ? ' selected' : '') + '>Audit</option><option' + (service === 'Income Tax' ? ' selected' : '') + '>Income Tax</option></select></td>' +
          '<td><select aria-label="Task"><option value="">Select</option><option' + (task === 'documentation' ? ' selected' : '') + '>documentation</option><option' + (task === 'Testing 22' ? ' selected' : '') + '>Testing 22</option></select></td>' +
          '<td><button type="button" class="mp-ts-plus" aria-label="Add day">+</button></td>'.repeat(7);
        body.appendChild(tr);
        bindTsPlus(tr);
        closeTsModal();
        toast('Timesheet created', 'Entry added for ' + date + '.');
      });
    }

    function bindTsPlus(root) {
      (root || document).querySelectorAll('.mp-ts-plus').forEach(function (btn) {
        if (btn.dataset.bound) return;
        btn.dataset.bound = '1';
        btn.addEventListener('click', function () {
          openTsModal();
        });
      });
    }
    bindTsPlus(document);

    var filterBtn = document.getElementById('mpTsFilter');
    var filterMenu = document.getElementById('mpTsFilterMenu');
    var filterReset = document.getElementById('mpTsFilterReset');
    var filterStatus = document.getElementById('mpTsFilterStatus');
    var filterStatusPanel = document.getElementById('mpTsFilterStatusPanel');

    function closeTsFilter() {
      if (!filterMenu || !filterBtn) return;
      filterMenu.hidden = true;
      filterBtn.classList.remove('is-active');
      filterBtn.setAttribute('aria-expanded', 'false');
    }

    if (filterBtn && filterMenu) {
      filterBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = filterMenu.hidden;
        filterMenu.hidden = !open;
        filterBtn.classList.toggle('is-active', open);
        filterBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      filterMenu.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', closeTsFilter);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeTsFilter();
      });
    }

    if (filterStatus && filterStatusPanel) {
      filterStatus.addEventListener('click', function () {
        var open = filterStatus.classList.toggle('is-open');
        filterStatus.setAttribute('aria-expanded', open ? 'true' : 'false');
        filterStatusPanel.hidden = !open;
      });
    }

    if (filterReset) {
      filterReset.addEventListener('click', function () {
        document.querySelectorAll('input[name="ts-status"]').forEach(function (input) {
          input.checked = input.value !== 'rejected';
        });
        if (filterStatus) {
          filterStatus.classList.remove('is-open');
          filterStatus.setAttribute('aria-expanded', 'false');
        }
        if (filterStatusPanel) filterStatusPanel.hidden = true;
        toast('Filters reset', 'Timesheet filters cleared.');
      });
    }

    var exportBtn = document.getElementById('mpTsExport');
    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        toast('Export', 'Timesheet export started.');
      });
    }
  }

  function initAttendanceUi() {
    var body = document.getElementById('mpAttBody');
    if (!body) return;

    var rows = [
      { date: '12/08/2026', shift: 'NR', inn: '--', out: '--', ci: '--', co: '--', h1: 'A', h2: 'A', late: '--', early: '--', wh: '--', less: '--', extra: '--', coh: '--', cof: 'NO' },
      { date: '13/08/2026', shift: 'NR', inn: '09:42', out: '18:50', ci: '09:42', co: '18:50', h1: 'P', h2: 'P', late: '00:12', early: '--', wh: '08:56', less: '--', extra: '00:10', coh: '--', cof: 'NO' },
      { date: '14/08/2026', shift: 'NR', inn: '09:30', out: '18:40', ci: '09:30', co: '18:40', h1: 'P', h2: 'P', late: '--', early: '--', wh: '08:58', less: '--', extra: '00:05', coh: '--', cof: 'NO' },
      { date: '15/08/2026', shift: 'NR', inn: '--', out: '--', ci: '--', co: '--', h1: 'H', h2: 'H', late: '--', early: '--', wh: '--', less: '--', extra: '--', coh: '--', cof: 'NO' },
      { date: '16/08/2026', shift: 'NR', inn: '--', out: '--', ci: '--', co: '--', h1: 'H', h2: 'H', late: '--', early: '--', wh: '--', less: '--', extra: '--', coh: '--', cof: 'NO' },
      { date: '17/08/2026', shift: 'NR', inn: '15:51', out: '18:20', ci: '15:51', co: '18:20', h1: 'A', h2: 'P', late: '06:21', early: '--', wh: '02:29', less: '06:21', extra: '--', coh: '--', cof: 'NO' },
      { date: '18/08/2026', shift: 'NR', inn: '09:28', out: '18:45', ci: '09:28', co: '18:45', h1: 'P', h2: 'P', late: '--', early: '--', wh: '09:05', less: '--', extra: '00:10', coh: '--', cof: 'NO' },
      { date: '19/08/2026', shift: 'NR', inn: '09:35', out: '18:35', ci: '09:35', co: '18:35', h1: 'P', h2: 'P', late: '00:05', early: '--', wh: '08:48', less: '--', extra: '--', coh: '--', cof: 'NO' },
      { date: '20/08/2026', shift: 'NR', inn: '09:40', out: '18:30', ci: '09:40', co: '18:30', h1: 'P', h2: 'P', late: '00:10', early: '--', wh: '08:38', less: '--', extra: '--', coh: '--', cof: 'NO' },
      { date: '21/08/2026', shift: 'NR', inn: '--', out: '--', ci: '--', co: '--', h1: 'A', h2: 'A', late: '--', early: '--', wh: '--', less: '--', extra: '--', coh: '--', cof: 'NO' }
    ];

    function badge(code) {
      var map = { P: 'p', A: 'a', H: 'h', OD: 'od', CO: 'co' };
      var cls = map[code] || 'a';
      return '<span class="mp-att-badge mp-att-badge--' + cls + '">' + code + '</span>';
    }

    body.innerHTML = rows.map(function (r) {
      return '<tr>' +
        '<td data-att-col="date">' + r.date + '</td>' +
        '<td data-att-col="shift">' + r.shift + '</td>' +
        '<td data-att-col="intime">' + r.inn + '</td>' +
        '<td data-att-col="outtime">' + r.out + '</td>' +
        '<td data-att-col="checkin">' + r.ci + '</td>' +
        '<td data-att-col="checkout">' + r.co + '</td>' +
        '<td data-att-col="h1">' + badge(r.h1) + '</td>' +
        '<td data-att-col="h2">' + badge(r.h2) + '</td>' +
        '<td data-att-col="late">' + r.late + '</td>' +
        '<td data-att-col="early">' + r.early + '</td>' +
        '<td data-att-col="wh">' + r.wh + '</td>' +
        '<td data-att-col="less">' + r.less + '</td>' +
        '<td data-att-col="extra">' + r.extra + '</td>' +
        '<td data-att-col="coh">' + r.coh + '</td>' +
        '<td data-att-col="cof">' + r.cof + '</td>' +
        '<td data-att-col="remark">--</td>' +
        '<td data-att-col="action"><button type="button" class="mp-att-link mp-att-grievance" data-grievance="' + r.date + '">Raise Grievance</button></td>' +
        '</tr>';
    }).join('');

    function openAttGrievanceModal(date) {
      var modal = document.getElementById('mpAttGrModal');
      var form = document.getElementById('mpAttGrForm');
      var status = document.getElementById('mpAttGrStatus');
      var remarkType = document.getElementById('mpAttGrRemarkType');
      var remarkWrap = document.getElementById('mpAttGrRemarkWrap');
      var remark = document.getElementById('mpAttGrRemark');
      var dateInput = document.getElementById('mpAttGrDate');
      if (!modal || !form) return;
      form.reset();
      if (dateInput) dateInput.value = date || '';
      if (status) {
        status.value = '';
        status.selectedIndex = 0;
      }
      if (remarkType) remarkType.value = 'Technical Glitch';
      if (remark) remark.value = '';
      if (remarkWrap) remarkWrap.hidden = true;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      if (status) setTimeout(function () { status.focus(); }, 0);
    }

    function closeAttGrievanceModal() {
      var modal = document.getElementById('mpAttGrModal');
      if (modal) modal.hidden = true;
      document.body.style.overflow = '';
    }

    function syncAttGrRemarkField() {
      var remarkType = document.getElementById('mpAttGrRemarkType');
      var remarkWrap = document.getElementById('mpAttGrRemarkWrap');
      if (!remarkType || !remarkWrap) return;
      remarkWrap.hidden = remarkType.value !== 'Other';
    }

    body.querySelectorAll('.mp-att-grievance').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openAttGrievanceModal(btn.getAttribute('data-grievance') || '');
      });
    });

    (function bindAttGrievanceModal() {
      var modal = document.getElementById('mpAttGrModal');
      var form = document.getElementById('mpAttGrForm');
      var remarkType = document.getElementById('mpAttGrRemarkType');
      if (!modal || !form || modal.dataset.bound) return;
      modal.dataset.bound = '1';

      modal.querySelectorAll('[data-mp-att-gr-close]').forEach(function (el) {
        el.addEventListener('click', closeAttGrievanceModal);
      });
      if (remarkType) remarkType.addEventListener('change', syncAttGrRemarkField);

      form.addEventListener('submit', function () {
        var status = document.getElementById('mpAttGrStatus');
        var type = document.getElementById('mpAttGrRemarkType');
        var remark = document.getElementById('mpAttGrRemark');
        var date = (document.getElementById('mpAttGrDate') || {}).value || '';
        if (!status || !status.value) {
          toast('Required', 'Please select status.');
          if (status) status.focus();
          return;
        }
        if (type && type.value === 'Other' && remark && !remark.value.trim()) {
          toast('Required', 'Please enter a remark.');
          remark.focus();
          return;
        }
        toast('Grievance submitted', (date ? date + ' · ' : '') + status.value + (type ? ' · ' + type.value : ''));
        closeAttGrievanceModal();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && !modal.hidden) closeAttGrievanceModal();
      });
    })();

    var checkout = document.getElementById('mpAttCheckOut');
    if (checkout) {
      checkout.addEventListener('click', function () {
        var out = checkout.classList.toggle('is-out');
        checkout.textContent = out ? 'Check In' : 'Check Out';
        toast(out ? 'Checked out' : 'Checked in', out ? 'Your day is paused.' : 'Welcome back.');
      });
    }

    var colsBtn = document.getElementById('mpAttColumns');
    var colsMenu = document.getElementById('mpAttColsMenu');
    var colsList = document.getElementById('mpAttColsList');
    var selectAll = document.getElementById('mpAttColsSelectAll');
    var table = document.querySelector('.mp-att-table');

    function applyAttColumns() {
      if (!colsList || !table) return;
      colsList.querySelectorAll('input[data-att-col]').forEach(function (input) {
        var key = input.getAttribute('data-att-col');
        var show = !!input.checked;
        table.querySelectorAll('[data-att-col="' + key + '"]').forEach(function (cell) {
          cell.hidden = !show;
        });
      });
      updateAttSelectAllLabel();
    }

    function updateAttSelectAllLabel() {
      if (!selectAll || !colsList) return;
      var inputs = colsList.querySelectorAll('input[data-att-col]');
      var checked = colsList.querySelectorAll('input[data-att-col]:checked').length;
      selectAll.textContent = checked === inputs.length ? 'Deselect All' : 'Select All';
    }

    function closeAttCols() {
      if (!colsMenu || !colsBtn) return;
      colsMenu.hidden = true;
      colsBtn.classList.remove('is-active');
      colsBtn.setAttribute('aria-expanded', 'false');
    }

    if (colsBtn && colsMenu) {
      colsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = colsMenu.hidden;
        colsMenu.hidden = !open;
        colsBtn.classList.toggle('is-active', open);
        colsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      colsMenu.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', closeAttCols);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeAttCols();
      });
    }

    if (colsList) {
      colsList.querySelectorAll('input[data-att-col]').forEach(function (input) {
        input.addEventListener('change', applyAttColumns);
      });
    }

    if (selectAll && colsList) {
      selectAll.addEventListener('click', function () {
        var inputs = colsList.querySelectorAll('input[data-att-col]');
        var allOn = colsList.querySelectorAll('input[data-att-col]:checked').length === inputs.length;
        inputs.forEach(function (input) { input.checked = !allOn; });
        applyAttColumns();
      });
    }

    applyAttColumns();

    var filterBtn = document.getElementById('mpAttFilter');
    var filterMenu = document.getElementById('mpAttFilterMenu');
    var filterReset = document.getElementById('mpAttFilterReset');
    var filterDate = document.getElementById('mpAttFilterDate');
    var filterDatePanel = document.getElementById('mpAttFilterDatePanel');
    var startDate = document.getElementById('mpAttStartDate');
    var endDate = document.getElementById('mpAttEndDate');
    var startLabel = document.getElementById('mpAttStartLabel');
    var endLabel = document.getElementById('mpAttEndLabel');
    var dateRangeText = document.querySelector('.mp-att-date-range__text');

    function closeAttFilter() {
      if (!filterMenu || !filterBtn) return;
      filterMenu.hidden = true;
      filterBtn.classList.remove('is-active');
      filterBtn.setAttribute('aria-expanded', 'false');
    }

    function formatAttDate(value) {
      if (!value) return '';
      var parts = value.split('-');
      if (parts.length !== 3) return value;
      return parts[2] + '-' + parts[1] + '-' + parts[0];
    }

    function syncAttDateLabels() {
      var s = startDate && startDate.value ? formatAttDate(startDate.value) : 'Start date';
      var e = endDate && endDate.value ? formatAttDate(endDate.value) : 'End date';
      if (startLabel) startLabel.textContent = s;
      if (endLabel) endLabel.textContent = e;
      if (dateRangeText) {
        dateRangeText.classList.toggle('is-filled', !!(startDate && startDate.value) || !!(endDate && endDate.value));
      }
    }

    if (filterBtn && filterMenu) {
      filterBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeAttCols();
        var open = filterMenu.hidden;
        filterMenu.hidden = !open;
        filterBtn.classList.toggle('is-active', open);
        filterBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      filterMenu.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', closeAttFilter);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeAttFilter();
      });
    }

    if (filterDate && filterDatePanel) {
      filterDate.addEventListener('click', function () {
        var open = filterDate.classList.toggle('is-open');
        filterDate.setAttribute('aria-expanded', open ? 'true' : 'false');
        filterDatePanel.hidden = !open;
      });
    }

    if (startDate) startDate.addEventListener('change', syncAttDateLabels);
    if (endDate) endDate.addEventListener('change', syncAttDateLabels);
    syncAttDateLabels();

    if (filterReset) {
      filterReset.addEventListener('click', function () {
        if (startDate) startDate.value = '';
        if (endDate) endDate.value = '';
        syncAttDateLabels();
        if (filterDate) {
          filterDate.classList.remove('is-open');
          filterDate.setAttribute('aria-expanded', 'false');
        }
        if (filterDatePanel) filterDatePanel.hidden = true;
        toast('Filters reset', 'Attendance date filter cleared.');
      });
    }
  }

  function initLeaveUi() {
    var root = document.getElementById('mpPanel-leave');
    if (!root) return;

    var tabs = root.querySelectorAll('.mp-leave-subtab');
    var panes = root.querySelectorAll('.mp-leave-pane');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-leave-tab');
        tabs.forEach(function (t) {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        });
        panes.forEach(function (pane) {
          var on = pane.getAttribute('data-leave-pane') === id;
          pane.classList.toggle('is-active', on);
          pane.hidden = !on;
        });
      });
    });

    var addBtn = document.getElementById('mpLeaveAdd');
    var leaveModal = document.getElementById('mpLeaveModal');
    var leaveForm = document.getElementById('mpLeaveForm');

    function openLeaveModal() {
      if (!leaveModal) return;
      leaveModal.hidden = false;
      leaveModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      var first = document.getElementById('mpLeaveType');
      if (first) setTimeout(function () { first.focus(); }, 40);
    }

    function closeLeaveModal() {
      if (!leaveModal) return;
      leaveModal.hidden = true;
      leaveModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.querySelectorAll('#mpLeaveModal .mp-combo.is-open').forEach(function (el) {
        el.classList.remove('is-open');
      });
      document.querySelectorAll('#mpLeaveModal .mp-combo__list').forEach(function (el) {
        el.hidden = true;
      });
    }

    if (addBtn) addBtn.addEventListener('click', openLeaveModal);

    if (leaveModal) {
      leaveModal.querySelectorAll('[data-leave-close]').forEach(function (el) {
        el.addEventListener('click', closeLeaveModal);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !leaveModal.hidden) closeLeaveModal();
      });
    }

    var coAdd = document.getElementById('mpCoAdd');
    var coModal = document.getElementById('mpCoModal');
    var coForm = document.getElementById('mpCoForm');
    var coReason = document.getElementById('mpCoReason');
    var coReasonCount = document.getElementById('mpCoReasonCount');
    var coExtraSelect = document.getElementById('mpCoExtraHoursSelect');
    var coExtraHours = document.getElementById('mpCoExtraHours');
    var coDayType = document.getElementById('mpCoDayType');

    function openCoModal() {
      if (!coModal) return;
      coModal.hidden = false;
      coModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (coExtraSelect) setTimeout(function () { coExtraSelect.focus(); }, 40);
    }

    function closeCoModal() {
      if (!coModal) return;
      coModal.hidden = true;
      coModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (coAdd) coAdd.addEventListener('click', openCoModal);
    if (coModal) {
      coModal.querySelectorAll('[data-co-close]').forEach(function (el) {
        el.addEventListener('click', closeCoModal);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !coModal.hidden) closeCoModal();
      });
    }

    function syncCoReasonCount() {
      if (coReasonCount && coReason) coReasonCount.textContent = String(coReason.value.length);
    }
    if (coReason) {
      coReason.addEventListener('input', syncCoReasonCount);
      syncCoReasonCount();
    }

    if (coExtraSelect) {
      coExtraSelect.addEventListener('change', function () {
        var text = coExtraSelect.options[coExtraSelect.selectedIndex]
          ? coExtraSelect.options[coExtraSelect.selectedIndex].text
          : '';
        var hoursMatch = text.match(/(\d+)\s*hrs?/i);
        if (coExtraHours) coExtraHours.value = hoursMatch ? hoursMatch[1] : '';
        if (coDayType) coDayType.value = 'Working Day';
      });
    }

    if (coForm) {
      coForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var extra = coExtraSelect && coExtraSelect.value;
        var from = (document.getElementById('mpCoFrom') || {}).value || '';
        var to = (document.getElementById('mpCoTo') || {}).value || '';
        var fromHalf = (document.getElementById('mpCoFromHalf') || {}).value || '';
        var toHalf = (document.getElementById('mpCoToHalf') || {}).value || '';
        var reason = coReason ? coReason.value.trim() : '';
        if (!extra || !from || !to || !fromHalf || !toHalf || !reason) {
          toast('Required fields', 'Please fill all required Comp Off fields.');
          return;
        }
        closeCoModal();
        toast('Comp Off saved', 'Comp Off request submitted successfully.');
        coForm.reset();
        syncCoReasonCount();
        if (coDayType) coDayType.value = '';
      });
    }

    var coColsBtn = document.getElementById('mpCoColumns');
    var coColsMenu = document.getElementById('mpCoColsMenu');
    var coColsList = document.getElementById('mpCoColsList');
    var coSelectAll = document.getElementById('mpCoColsSelectAll');
    var coTable = document.getElementById('mpCoTable');

    function applyCoColumns() {
      if (!coColsList || !coTable) return;
      coColsList.querySelectorAll('input[data-co-col]').forEach(function (input) {
        var key = input.getAttribute('data-co-col');
        var show = !!input.checked;
        coTable.querySelectorAll('[data-co-col="' + key + '"]').forEach(function (cell) {
          cell.hidden = !show;
        });
      });
      updateCoSelectAllLabel();
    }

    function updateCoSelectAllLabel() {
      if (!coSelectAll || !coColsList) return;
      var inputs = coColsList.querySelectorAll('input[data-co-col]');
      var checked = coColsList.querySelectorAll('input[data-co-col]:checked').length;
      coSelectAll.textContent = checked === inputs.length ? 'Deselect All' : 'Select All';
    }

    function closeCoCols() {
      if (!coColsMenu || !coColsBtn) return;
      coColsMenu.hidden = true;
      coColsBtn.classList.remove('is-active');
      coColsBtn.setAttribute('aria-expanded', 'false');
    }

    if (coColsBtn && coColsMenu) {
      coColsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeCoFilter();
        var open = coColsMenu.hidden;
        coColsMenu.hidden = !open;
        coColsBtn.classList.toggle('is-active', open);
        coColsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      coColsMenu.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', closeCoCols);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeCoCols();
      });
    }

    if (coColsList) {
      coColsList.querySelectorAll('input[data-co-col]').forEach(function (input) {
        input.addEventListener('change', applyCoColumns);
      });
    }

    if (coSelectAll && coColsList) {
      coSelectAll.addEventListener('click', function () {
        var inputs = coColsList.querySelectorAll('input[data-co-col]');
        var allOn = coColsList.querySelectorAll('input[data-co-col]:checked').length === inputs.length;
        inputs.forEach(function (input) { input.checked = !allOn; });
        applyCoColumns();
      });
    }

    applyCoColumns();

    var coFilterBtn = document.getElementById('mpCoFilter');
    var coFilterMenu = document.getElementById('mpCoFilterMenu');
    var coFilterReset = document.getElementById('mpCoFilterReset');
    var coFilterStart = document.getElementById('mpCoFilterStart');
    var coFilterEnd = document.getElementById('mpCoFilterEnd');
    var coFilterStartLabel = document.getElementById('mpCoFilterStartLabel');
    var coFilterEndLabel = document.getElementById('mpCoFilterEndLabel');
    var coDateRangeText = document.getElementById('mpCoDateRangeText');
    var coFilterStatus = document.getElementById('mpCoFilterStatus');

    function closeCoFilter() {
      if (!coFilterMenu || !coFilterBtn) return;
      coFilterMenu.hidden = true;
      coFilterBtn.classList.remove('is-active');
      coFilterBtn.setAttribute('aria-expanded', 'false');
    }

    function formatCoFilterDate(value) {
      if (!value) return '';
      var parts = value.split('-');
      if (parts.length !== 3) return value;
      return parts[2] + '-' + parts[1] + '-' + parts[0];
    }

    function syncCoFilterDates() {
      var s = coFilterStart && coFilterStart.value ? formatCoFilterDate(coFilterStart.value) : 'Start date';
      var e = coFilterEnd && coFilterEnd.value ? formatCoFilterDate(coFilterEnd.value) : 'End date';
      if (coFilterStartLabel) coFilterStartLabel.textContent = s;
      if (coFilterEndLabel) coFilterEndLabel.textContent = e;
      if (coDateRangeText) {
        coDateRangeText.classList.toggle('is-filled', !!(coFilterStart && coFilterStart.value) || !!(coFilterEnd && coFilterEnd.value));
      }
    }

    if (coFilterBtn && coFilterMenu) {
      coFilterBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeCoCols();
        var open = coFilterMenu.hidden;
        coFilterMenu.hidden = !open;
        coFilterBtn.classList.toggle('is-active', open);
        coFilterBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      coFilterMenu.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', closeCoFilter);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeCoFilter();
      });
    }

    document.querySelectorAll('[data-co-filter-acc]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-co-filter-acc');
        var panel = document.querySelector('[data-co-filter-panel="' + key + '"]');
        if (!panel) return;
        var open = btn.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.hidden = !open;
      });
    });

    if (coFilterStart) coFilterStart.addEventListener('change', syncCoFilterDates);
    if (coFilterEnd) coFilterEnd.addEventListener('change', syncCoFilterDates);
    syncCoFilterDates();

    if (coFilterStatus) {
      coFilterStatus.addEventListener('change', function () {
        coFilterStatus.classList.toggle('has-value', !!coFilterStatus.value);
      });
    }

    if (coFilterReset) {
      coFilterReset.addEventListener('click', function () {
        if (coFilterStart) coFilterStart.value = '';
        if (coFilterEnd) coFilterEnd.value = '';
        if (coFilterStatus) {
          coFilterStatus.value = '';
          coFilterStatus.classList.remove('has-value');
        }
        syncCoFilterDates();
        document.querySelectorAll('[data-co-filter-acc]').forEach(function (btn) {
          btn.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        });
        document.querySelectorAll('[data-co-filter-panel]').forEach(function (panel) {
          panel.hidden = true;
        });
        toast('Filters reset', 'CompOff filters cleared.');
      });
    }

    function setupLeaveCombo(root) {
      var input = root.querySelector('.mp-combo__input');
      var list = root.querySelector('.mp-combo__list');
      if (!input || !list) return;

      function openList() {
        root.classList.add('is-open');
        list.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        filterList(input.value);
      }

      function closeList() {
        root.classList.remove('is-open');
        list.hidden = true;
        input.setAttribute('aria-expanded', 'false');
      }

      function filterList(q) {
        var query = (q || '').toLowerCase();
        list.querySelectorAll('li').forEach(function (li) {
          var text = (li.getAttribute('data-value') || li.textContent || '').toLowerCase();
          li.hidden = !(!query || text.indexOf(query) !== -1);
          li.classList.toggle('is-active', false);
        });
        var firstVisible = list.querySelector('li:not([hidden])');
        if (firstVisible) firstVisible.classList.add('is-active');
      }

      input.addEventListener('focus', openList);
      input.addEventListener('click', openList);
      input.addEventListener('input', function () { openList(); filterList(input.value); });
      list.querySelectorAll('li').forEach(function (li) {
        li.addEventListener('mousedown', function (e) {
          e.preventDefault();
          input.value = li.getAttribute('data-value') || li.textContent;
          closeList();
        });
      });
      input.addEventListener('blur', function () { setTimeout(closeList, 120); });
    }

    document.querySelectorAll('#mpLeaveModal .mp-combo[data-combo]').forEach(setupLeaveCombo);

    function calcLeaveDays() {
      var from = document.getElementById('mpLeaveFrom');
      var to = document.getElementById('mpLeaveTo');
      var daysEl = document.getElementById('mpLeaveDays');
      if (!from || !to || !daysEl) return;
      if (!from.value || !to.value) {
        daysEl.textContent = 'No. of Days : 0';
        return;
      }
      var a = new Date(from.value + 'T00:00:00');
      var b = new Date(to.value + 'T00:00:00');
      var diff = Math.round((b - a) / 86400000) + 1;
      if (diff < 0) diff = 0;
      daysEl.textContent = 'No. of Days : ' + diff;
    }

    var fromDate = document.getElementById('mpLeaveFrom');
    var toDate = document.getElementById('mpLeaveTo');
    if (fromDate) fromDate.addEventListener('change', calcLeaveDays);
    if (toDate) toDate.addEventListener('change', calcLeaveDays);

    if (leaveForm) {
      leaveForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var type = (document.getElementById('mpLeaveType') || {}).value || '';
        var from = (document.getElementById('mpLeaveFrom') || {}).value || '';
        var to = (document.getElementById('mpLeaveTo') || {}).value || '';
        var reason = (document.getElementById('mpLeaveReason') || {}).value || '';
        var fromHalf = leaveForm.querySelector('input[name="mpLeaveFromHalf"]:checked');
        var toHalf = leaveForm.querySelector('input[name="mpLeaveToHalf"]:checked');

        if (!type || !from || !to || !reason || !fromHalf || !toHalf) {
          toast('Required fields', 'Please fill all required leave fields.');
          return;
        }

        closeLeaveModal();
        toast('Leave applied', type + ' submitted successfully.');
        leaveForm.reset();
        calcLeaveDays();
      });
    }

    var colsBtn = document.getElementById('mpLeaveColumns');
    var colsMenu = document.getElementById('mpLeaveColsMenu');
    var colsList = document.getElementById('mpLeaveColsList');
    var selectAll = document.getElementById('mpLeaveColsSelectAll');
    var leaveTable = document.querySelector('.mp-leave-table');

    function applyLeaveColumns() {
      if (!colsList || !leaveTable) return;
      colsList.querySelectorAll('input[data-leave-col]').forEach(function (input) {
        var key = input.getAttribute('data-leave-col');
        var show = !!input.checked;
        leaveTable.querySelectorAll('[data-leave-col="' + key + '"]').forEach(function (cell) {
          cell.hidden = !show;
        });
      });
      updateLeaveSelectAllLabel();
    }

    function updateLeaveSelectAllLabel() {
      if (!selectAll || !colsList) return;
      var inputs = colsList.querySelectorAll('input[data-leave-col]');
      var checked = colsList.querySelectorAll('input[data-leave-col]:checked').length;
      selectAll.textContent = checked === inputs.length ? 'Deselect All' : 'Select All';
    }

    function closeLeaveCols() {
      if (!colsMenu || !colsBtn) return;
      colsMenu.hidden = true;
      colsBtn.classList.remove('is-active');
      colsBtn.setAttribute('aria-expanded', 'false');
    }

    if (colsBtn && colsMenu) {
      colsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = colsMenu.hidden;
        colsMenu.hidden = !open;
        colsBtn.classList.toggle('is-active', open);
        colsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      colsMenu.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', closeLeaveCols);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLeaveCols();
      });
    }

    if (colsList) {
      colsList.querySelectorAll('input[data-leave-col]').forEach(function (input) {
        input.addEventListener('change', applyLeaveColumns);
      });
    }

    if (selectAll && colsList) {
      selectAll.addEventListener('click', function () {
        var inputs = colsList.querySelectorAll('input[data-leave-col]');
        var allOn = colsList.querySelectorAll('input[data-leave-col]:checked').length === inputs.length;
        inputs.forEach(function (input) { input.checked = !allOn; });
        applyLeaveColumns();
      });
    }

    applyLeaveColumns();

    var filterBtn = document.getElementById('mpLeaveFilter');
    var filterMenu = document.getElementById('mpLeaveFilterMenu');
    var filterReset = document.getElementById('mpLeaveFilterReset');
    var startDate = document.getElementById('mpLeaveFilterStart');
    var endDate = document.getElementById('mpLeaveFilterEnd');
    var startLabel = document.getElementById('mpLeaveFilterStartLabel');
    var endLabel = document.getElementById('mpLeaveFilterEndLabel');
    var dateRangeText = document.querySelector('.mp-leave-date-range__text');
    var typeSelect = document.getElementById('mpLeaveFilterType');
    var statusSelect = document.getElementById('mpLeaveFilterStatus');

    function closeLeaveFilter() {
      if (!filterMenu || !filterBtn) return;
      filterMenu.hidden = true;
      filterBtn.classList.remove('is-active');
      filterBtn.setAttribute('aria-expanded', 'false');
    }

    function formatLeaveFilterDate(value) {
      if (!value) return '';
      var parts = value.split('-');
      if (parts.length !== 3) return value;
      return parts[2] + '-' + parts[1] + '-' + parts[0];
    }

    function syncLeaveFilterDates() {
      var s = startDate && startDate.value ? formatLeaveFilterDate(startDate.value) : 'Start date';
      var e = endDate && endDate.value ? formatLeaveFilterDate(endDate.value) : 'End date';
      if (startLabel) startLabel.textContent = s;
      if (endLabel) endLabel.textContent = e;
      if (dateRangeText) {
        dateRangeText.classList.toggle('is-filled', !!(startDate && startDate.value) || !!(endDate && endDate.value));
      }
    }

    if (filterBtn && filterMenu) {
      filterBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = filterMenu.hidden;
        filterMenu.hidden = !open;
        filterBtn.classList.toggle('is-active', open);
        filterBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      filterMenu.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', closeLeaveFilter);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLeaveFilter();
      });
    }

    document.querySelectorAll('[data-leave-filter-acc]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-leave-filter-acc');
        var panel = document.querySelector('[data-leave-filter-panel="' + key + '"]');
        if (!panel) return;
        var open = btn.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.hidden = !open;
      });
    });

    if (startDate) startDate.addEventListener('change', syncLeaveFilterDates);
    if (endDate) endDate.addEventListener('change', syncLeaveFilterDates);
    syncLeaveFilterDates();

    function syncSelectColor(sel) {
      if (!sel) return;
      sel.classList.toggle('has-value', !!sel.value);
    }
    if (typeSelect) {
      typeSelect.addEventListener('change', function () { syncSelectColor(typeSelect); });
      syncSelectColor(typeSelect);
    }
    if (statusSelect) {
      statusSelect.addEventListener('change', function () { syncSelectColor(statusSelect); });
      syncSelectColor(statusSelect);
    }

    if (filterReset) {
      filterReset.addEventListener('click', function () {
        if (startDate) startDate.value = '';
        if (endDate) endDate.value = '';
        if (typeSelect) typeSelect.value = '';
        if (statusSelect) statusSelect.value = '';
        syncLeaveFilterDates();
        syncSelectColor(typeSelect);
        syncSelectColor(statusSelect);
        document.querySelectorAll('[data-leave-filter-acc]').forEach(function (btn) {
          btn.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        });
        document.querySelectorAll('[data-leave-filter-panel]').forEach(function (panel) {
          panel.hidden = true;
        });
        toast('Filters reset', 'Leave filters cleared.');
      });
    }

    var odCols = document.getElementById('mpOdColumns');
    if (odCols) odCols.addEventListener('click', function () { toast('Columns', 'On Duty column visibility opens here.'); });
    var odFilter = document.getElementById('mpOdFilter');
    if (odFilter) odFilter.addEventListener('click', function () { toast('Filter', 'On Duty filters open here.'); });

    var odAdd = document.getElementById('mpOdAdd');
    var odModal = document.getElementById('mpOdModal');
    var odForm = document.getElementById('mpOdForm');
    var odReason = document.getElementById('mpOdReason');
    var odReasonCount = document.getElementById('mpOdReasonCount');
    var odFrom = document.getElementById('mpOdFrom');
    var odTo = document.getElementById('mpOdTo');
    var odDays = document.getElementById('mpOdDays');

    function openOdModal() {
      if (!odModal) return;
      odModal.hidden = false;
      odModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (odFrom) setTimeout(function () { odFrom.focus(); }, 40);
    }

    function closeOdModal() {
      if (!odModal) return;
      odModal.hidden = true;
      odModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function calcOdDays() {
      if (!odDays) return;
      if (!odFrom || !odTo || !odFrom.value || !odTo.value) {
        odDays.textContent = 'No. of Days : 0';
        return;
      }
      var a = new Date(odFrom.value + 'T00:00:00');
      var b = new Date(odTo.value + 'T00:00:00');
      var diff = Math.round((b - a) / 86400000) + 1;
      if (diff < 0) diff = 0;
      odDays.textContent = 'No. of Days : ' + diff;
    }

    function syncOdReasonCount() {
      if (odReasonCount && odReason) odReasonCount.textContent = String(odReason.value.length);
    }

    if (odAdd) odAdd.addEventListener('click', openOdModal);
    if (odModal) {
      odModal.querySelectorAll('[data-od-close]').forEach(function (el) {
        el.addEventListener('click', closeOdModal);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !odModal.hidden) closeOdModal();
      });
    }
    if (odFrom) odFrom.addEventListener('change', calcOdDays);
    if (odTo) odTo.addEventListener('change', calcOdDays);
    if (odReason) {
      odReason.addEventListener('input', syncOdReasonCount);
      syncOdReasonCount();
    }
    calcOdDays();

    if (odForm) {
      odForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var from = odFrom ? odFrom.value : '';
        var to = odTo ? odTo.value : '';
        var reason = odReason ? odReason.value.trim() : '';
        var fromHalf = odForm.querySelector('input[name="mpOdFromHalf"]:checked');
        var toHalf = odForm.querySelector('input[name="mpOdToHalf"]:checked');
        if (!from || !to || !reason || !fromHalf || !toHalf) {
          toast('Required fields', 'Please fill all required On Duty fields.');
          return;
        }
        closeOdModal();
        toast('On Duty saved', 'On Duty request submitted successfully.');
        odForm.reset();
        syncOdReasonCount();
        calcOdDays();
      });
    }

    var holColsBtn = document.getElementById('mpHolColumns');
    var holColsMenu = document.getElementById('mpHolColsMenu');
    var holColsList = document.getElementById('mpHolColsList');
    var holSelectAll = document.getElementById('mpHolColsSelectAll');
    var holTable = document.getElementById('mpHolTable');

    function applyHolColumns() {
      if (!holColsList || !holTable) return;
      holColsList.querySelectorAll('input[data-hol-col]').forEach(function (input) {
        var key = input.getAttribute('data-hol-col');
        var show = !!input.checked;
        holTable.querySelectorAll('[data-hol-col="' + key + '"]').forEach(function (cell) {
          cell.hidden = !show;
        });
      });
      updateHolSelectAllLabel();
    }

    function updateHolSelectAllLabel() {
      if (!holSelectAll || !holColsList) return;
      var inputs = holColsList.querySelectorAll('input[data-hol-col]');
      var checked = holColsList.querySelectorAll('input[data-hol-col]:checked').length;
      holSelectAll.textContent = checked === inputs.length ? 'Deselect All' : 'Select All';
    }

    function closeHolCols() {
      if (!holColsMenu || !holColsBtn) return;
      holColsMenu.hidden = true;
      holColsBtn.classList.remove('is-active');
      holColsBtn.setAttribute('aria-expanded', 'false');
    }

    if (holColsBtn && holColsMenu) {
      holColsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = holColsMenu.hidden;
        holColsMenu.hidden = !open;
        holColsBtn.classList.toggle('is-active', open);
        holColsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      holColsMenu.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', closeHolCols);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeHolCols();
      });
    }

    if (holColsList) {
      holColsList.querySelectorAll('input[data-hol-col]').forEach(function (input) {
        input.addEventListener('change', applyHolColumns);
      });
    }

    if (holSelectAll && holColsList) {
      holSelectAll.addEventListener('click', function () {
        var inputs = holColsList.querySelectorAll('input[data-hol-col]');
        var allOn = holColsList.querySelectorAll('input[data-hol-col]:checked').length === inputs.length;
        inputs.forEach(function (input) { input.checked = !allOn; });
        applyHolColumns();
      });
    }

    document.querySelectorAll('.mp-hol-type').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.mp-hol-type').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        renderHolidays(1);
      });
    });

    var holBody = document.getElementById('mpHolBody');
    var holRows = document.getElementById('mpHolRows');
    var holPrev = document.getElementById('mpHolPrev');
    var holNext = document.getElementById('mpHolNext');
    var holPage = document.getElementById('mpHolPage');
    var holOf = document.getElementById('mpHolOf');
    var holCount = document.getElementById('mpHolCount');
    var holPageNum = 1;

    function buildHolidayData(type) {
      var rows = [];
      if (type === 'national') {
        rows.push({ name: 'Republic Day', from: '26/01/2026', to: '26/01/2026', optional: 'No', type: 'National Holiday', desc: 'NATIONAL HOLIDAY' });
        rows.push({ name: 'Independence Day', from: '15/08/2026', to: '15/08/2026', optional: 'No', type: 'National Holiday', desc: 'NATIONAL HOLIDAY' });
        rows.push({ name: 'Gandhi Jayanti', from: '02/10/2026', to: '02/10/2026', optional: 'No', type: 'National Holiday', desc: 'NATIONAL HOLIDAY' });
        return rows;
      }
      if (type === 'religious') {
        rows.push({ name: 'Holi', from: '03/03/2026', to: '03/03/2026', optional: 'Yes', type: 'Religious Holiday', desc: 'RELIGIOUS HOLIDAY' });
        rows.push({ name: 'Diwali', from: '08/11/2026', to: '08/11/2026', optional: 'Yes', type: 'Religious Holiday', desc: 'RELIGIOUS HOLIDAY' });
        rows.push({ name: 'Christmas', from: '25/12/2026', to: '25/12/2026', optional: 'No', type: 'Religious Holiday', desc: 'RELIGIOUS HOLIDAY' });
        return rows;
      }
      var d = new Date(2026, 2, 1);
      while (d.getDay() !== 0) d.setDate(d.getDate() + 1);
      for (var i = 0; i < 65; i++) {
        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0');
        var yyyy = d.getFullYear();
        var label = dd + '/' + mm + '/' + yyyy;
        rows.push({ name: 'Sunday', from: label, to: label, optional: 'No', type: 'Weekly Holiday', desc: 'WEEKLY OFF' });
        d.setDate(d.getDate() + 7);
      }
      return rows;
    }

    function renderHolidays(page) {
      if (!holBody) return;
      var active = document.querySelector('.mp-hol-type.is-active');
      var type = active ? active.getAttribute('data-hol-type') : 'weekly';
      var data = buildHolidayData(type);
      var per = holRows ? parseInt(holRows.value, 10) || 20 : 20;
      var totalPages = Math.max(1, Math.ceil(data.length / per));
      holPageNum = Math.min(Math.max(1, page || 1), totalPages);
      var start = (holPageNum - 1) * per;
      var slice = data.slice(start, start + per);
      holBody.innerHTML = slice.map(function (row, idx) {
        return '<tr>' +
          '<td data-hol-col="idx">' + (start + idx + 1) + '</td>' +
          '<td data-hol-col="name">' + row.name + '</td>' +
          '<td data-hol-col="from">' + row.from + '</td>' +
          '<td data-hol-col="to">' + row.to + '</td>' +
          '<td data-hol-col="optional">' + row.optional + '</td>' +
          '<td data-hol-col="type">' + row.type + '</td>' +
          '<td data-hol-col="desc">' + row.desc + '</td>' +
          '</tr>';
      }).join('');
      applyHolColumns();
      if (holPage) holPage.value = String(holPageNum);
      if (holOf) holOf.textContent = 'of ' + totalPages;
      if (holCount) holCount.textContent = slice.length + ' / ' + data.length;
      if (holPrev) holPrev.disabled = holPageNum <= 1;
      if (holNext) holNext.disabled = holPageNum >= totalPages;
    }

    if (holRows) holRows.addEventListener('change', function () { renderHolidays(1); });
    if (holPrev) holPrev.addEventListener('click', function () { renderHolidays(holPageNum - 1); });
    if (holNext) holNext.addEventListener('click', function () { renderHolidays(holPageNum + 1); });
    if (holPage) {
      holPage.addEventListener('change', function () {
        var n = parseInt(holPage.value, 10);
        renderHolidays(isNaN(n) ? 1 : n);
      });
    }
    renderHolidays(1);

    var logStartLabel = document.getElementById('mpLogStartLabel');
    var logEndLabel = document.getElementById('mpLogEndLabel');
    var logDateText = document.getElementById('mpLogDateRangeText');
    var logRangeTrigger = document.getElementById('mpLogRangeTrigger');
    var logRangePop = document.getElementById('mpLogRangePop');
    var logRangeCals = document.getElementById('mpLogRangeCals');
    var logFilterBtn = document.getElementById('mpLogFilter');
    var logFilterMenu = document.getElementById('mpLogFilterMenu');
    var logFilterReset = document.getElementById('mpLogFilterReset');
    var logFilterLeave = document.getElementById('mpLogFilterLeave');
    var logFilterType = document.getElementById('mpLogFilterType');
    var logRangeStart = null;
    var logRangeEnd = null;
    var logCalCursor = new Date(2026, 7, 1);

    function pad2(n) { return String(n).padStart(2, '0'); }

    function formatLogDisplay(d) {
      if (!d) return '';
      return pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1) + '/' + d.getFullYear();
    }

    function sameLogDay(a, b) {
      return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }

    function inLogRange(d, start, end) {
      if (!start || !end) return false;
      var t = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      var a = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
      var b = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
      return t >= a && t <= b;
    }

    function syncLogDates() {
      var s = logRangeStart ? formatLogDisplay(logRangeStart) : 'Start date';
      var e = logRangeEnd ? formatLogDisplay(logRangeEnd) : 'End date';
      if (logStartLabel) logStartLabel.textContent = s;
      if (logEndLabel) logEndLabel.textContent = e;
      if (logDateText) logDateText.classList.toggle('is-filled', !!(logRangeStart || logRangeEnd));
    }

    function renderLogMonth(year, month) {
      var first = new Date(year, month, 1);
      var startDay = first.getDay();
      var daysInMonth = new Date(year, month + 1, 0).getDate();
      var prevDays = new Date(year, month, 0).getDate();
      var html = '<div class="mp-cal"><div class="mp-cal__grid">';
      ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function (d) {
        html += '<div class="mp-cal__dow">' + d + '</div>';
      });
      var cells = [];
      for (var i = 0; i < startDay; i++) {
        cells.push({ day: prevDays - startDay + i + 1, muted: true, date: new Date(year, month - 1, prevDays - startDay + i + 1) });
      }
      for (var d = 1; d <= daysInMonth; d++) {
        cells.push({ day: d, muted: false, date: new Date(year, month, d) });
      }
      var nextDay = 1;
      while (cells.length < 42) {
        cells.push({ day: nextDay, muted: true, date: new Date(year, month + 1, nextDay) });
        nextDay += 1;
      }
      cells.forEach(function (cell) {
        var cls = 'mp-cal__day';
        if (cell.muted) cls += ' is-muted';
        var isStart = sameLogDay(cell.date, logRangeStart);
        var isEnd = sameLogDay(cell.date, logRangeEnd);
        if (isStart || isEnd) cls += ' is-selected';
        if (isStart) cls += ' is-range-start';
        if (isEnd) cls += ' is-range-end';
        if (logRangeStart && logRangeEnd && inLogRange(cell.date, logRangeStart, logRangeEnd) && !isStart && !isEnd) cls += ' is-in-range';
        html += '<button type="button" class="' + cls + '" data-y="' + cell.date.getFullYear() + '" data-m="' + cell.date.getMonth() + '" data-d="' + cell.date.getDate() + '">' + cell.day + '</button>';
      });
      html += '</div></div>';
      return html;
    }

    function renderLogRangeCals() {
      if (!logRangeCals) return;
      var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var y = logCalCursor.getFullYear();
      var m = logCalCursor.getMonth();
      var next = m === 11 ? { y: y + 1, m: 0 } : { y: y, m: m + 1 };
      var titleLeft = document.getElementById('mpLogCalTitleLeft');
      var titleRight = document.getElementById('mpLogCalTitleRight');
      if (titleLeft) titleLeft.textContent = monthNames[m] + ' ' + y;
      if (titleRight) titleRight.textContent = monthNames[next.m] + ' ' + next.y;
      logRangeCals.innerHTML = renderLogMonth(y, m) + renderLogMonth(next.y, next.m);
    }

    function closeLogRange() {
      if (!logRangePop || !logRangeTrigger) return;
      logRangePop.hidden = true;
      logRangeTrigger.classList.remove('is-open');
      logRangeTrigger.setAttribute('aria-expanded', 'false');
    }

    function openLogRange() {
      if (!logRangePop || !logRangeTrigger) return;
      closeLogFilter();
      logRangePop.hidden = false;
      logRangeTrigger.classList.add('is-open');
      logRangeTrigger.setAttribute('aria-expanded', 'true');
      renderLogRangeCals();
    }

    if (logRangeTrigger && logRangePop) {
      logRangeTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        if (logRangePop.hidden) openLogRange();
        else closeLogRange();
      });
      logRangePop.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', closeLogRange);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLogRange();
      });
    }

    if (logRangePop) {
      logRangePop.querySelectorAll('[data-log-nav]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var nav = btn.getAttribute('data-log-nav');
          if (nav === 'prev-month') logCalCursor = new Date(logCalCursor.getFullYear(), logCalCursor.getMonth() - 1, 1);
          if (nav === 'next-month') logCalCursor = new Date(logCalCursor.getFullYear(), logCalCursor.getMonth() + 1, 1);
          if (nav === 'prev-year') logCalCursor = new Date(logCalCursor.getFullYear() - 1, logCalCursor.getMonth(), 1);
          if (nav === 'next-year') logCalCursor = new Date(logCalCursor.getFullYear() + 1, logCalCursor.getMonth(), 1);
          renderLogRangeCals();
        });
      });
    }

    if (logRangeCals) {
      logRangeCals.addEventListener('click', function (e) {
        var dayBtn = e.target.closest('.mp-cal__day');
        if (!dayBtn) return;
        var picked = new Date(+dayBtn.getAttribute('data-y'), +dayBtn.getAttribute('data-m'), +dayBtn.getAttribute('data-d'));
        if (!logRangeStart || (logRangeStart && logRangeEnd)) {
          logRangeStart = picked;
          logRangeEnd = null;
        } else if (picked.getTime() < logRangeStart.getTime()) {
          logRangeEnd = logRangeStart;
          logRangeStart = picked;
        } else {
          logRangeEnd = picked;
        }
        syncLogDates();
        renderLogRangeCals();
        if (logRangeStart && logRangeEnd) closeLogRange();
      });
    }

    syncLogDates();

    function closeLogFilter() {
      if (!logFilterMenu || !logFilterBtn) return;
      logFilterMenu.hidden = true;
      logFilterBtn.classList.remove('is-active');
      logFilterBtn.setAttribute('aria-expanded', 'false');
    }

    if (logFilterBtn && logFilterMenu) {
      logFilterBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeLogRange();
        var open = logFilterMenu.hidden;
        logFilterMenu.hidden = !open;
        logFilterBtn.classList.toggle('is-active', open);
        logFilterBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      logFilterMenu.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', closeLogFilter);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLogFilter();
      });
    }

    document.querySelectorAll('[data-log-filter-acc]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-log-filter-acc');
        var panel = document.querySelector('[data-log-filter-panel="' + key + '"]');
        if (!panel) return;
        var open = btn.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.hidden = !open;
      });
    });

    [logFilterLeave, logFilterType].forEach(function (sel) {
      if (!sel) return;
      sel.addEventListener('change', function () {
        sel.classList.toggle('has-value', !!sel.value);
      });
    });

    if (logFilterReset) {
      logFilterReset.addEventListener('click', function () {
        if (logFilterLeave) {
          logFilterLeave.value = '';
          logFilterLeave.classList.remove('has-value');
        }
        if (logFilterType) {
          logFilterType.value = '';
          logFilterType.classList.remove('has-value');
        }
        document.querySelectorAll('[data-log-filter-acc]').forEach(function (btn) {
          btn.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        });
        document.querySelectorAll('[data-log-filter-panel]').forEach(function (panel) {
          panel.hidden = true;
        });
        toast('Filters reset', 'Leave log filters cleared.');
      });
    }
  }

  function initExpensesUi() {
    var root = document.getElementById('mpPanel-expenses');
    if (!root) return;

    var tabs = root.querySelectorAll('.mp-exp-subtab');
    var panes = root.querySelectorAll('.mp-exp-pane');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-exp-tab');
        tabs.forEach(function (t) {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        });
        panes.forEach(function (pane) {
          var on = pane.getAttribute('data-exp-pane') === id;
          pane.classList.toggle('is-active', on);
          pane.hidden = !on;
        });
      });
    });

    var expModal = document.getElementById('mpExpModal');
    var expForm = document.getElementById('mpExpForm');
    var expEntries = document.getElementById('mpExpEntries');
    var expAddEntry = document.getElementById('mpExpAddEntry');
    var expMetaDate = document.getElementById('mpExpMetaDate');
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function pad2(n) { return String(n).padStart(2, '0'); }

    function formatExpDate(d) {
      return pad2(d.getDate()) + '-' + pad2(d.getMonth() + 1) + '-' + d.getFullYear();
    }

    function syncExpMetaDate() {
      if (expMetaDate) expMetaDate.textContent = formatExpDate(new Date());
    }

    function setupExpCombo(comboRoot) {
      var input = comboRoot.querySelector('.mp-combo__input');
      var list = comboRoot.querySelector('.mp-combo__list');
      if (!input || !list) return;

      function openList() {
        document.querySelectorAll('#mpExpModal .mp-combo.is-open').forEach(function (el) {
          if (el !== comboRoot) {
            el.classList.remove('is-open');
            var l = el.querySelector('.mp-combo__list');
            if (l) l.hidden = true;
          }
        });
        comboRoot.classList.add('is-open');
        list.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        filterList(input.value);
      }

      function closeList() {
        comboRoot.classList.remove('is-open');
        list.hidden = true;
        input.setAttribute('aria-expanded', 'false');
      }

      function filterList(q) {
        var query = (q || '').toLowerCase();
        list.querySelectorAll('li').forEach(function (li) {
          var text = (li.getAttribute('data-value') || li.textContent || '').toLowerCase();
          li.hidden = !(!query || text.indexOf(query) !== -1);
          li.classList.remove('is-active');
        });
        var firstVisible = list.querySelector('li:not([hidden])');
        if (firstVisible) firstVisible.classList.add('is-active');
      }

      input.addEventListener('focus', openList);
      input.addEventListener('click', openList);
      input.addEventListener('input', function () { openList(); filterList(input.value); });
      list.querySelectorAll('li').forEach(function (li) {
        li.addEventListener('mousedown', function (e) {
          e.preventDefault();
          input.value = li.getAttribute('data-value') || li.textContent;
          closeList();
        });
      });
      input.addEventListener('blur', function () { setTimeout(closeList, 120); });
    }

    function renderExpCal(entry) {
      var grid = entry.querySelector('[data-exp-cal-grid]');
      var title = entry.querySelector('[data-exp-cal-title]');
      var cursor = entry._expCalCursor || new Date(2026, 7, 1);
      entry._expCalCursor = cursor;
      var y = cursor.getFullYear();
      var m = cursor.getMonth();
      if (title) title.textContent = monthNames[m] + ' ' + y;
      var first = new Date(y, m, 1);
      var startDay = first.getDay();
      var daysInMonth = new Date(y, m + 1, 0).getDate();
      var prevDays = new Date(y, m, 0).getDate();
      var selected = entry._expDate || null;
      var html = '';
      ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function (d) {
        html += '<div class="mp-cal__dow">' + d + '</div>';
      });
      var cells = [];
      for (var i = 0; i < startDay; i++) {
        cells.push({ day: prevDays - startDay + i + 1, muted: true, date: new Date(y, m - 1, prevDays - startDay + i + 1) });
      }
      for (var d = 1; d <= daysInMonth; d++) {
        cells.push({ day: d, muted: false, date: new Date(y, m, d) });
      }
      var nextDay = 1;
      while (cells.length < 42) {
        cells.push({ day: nextDay, muted: true, date: new Date(y, m + 1, nextDay) });
        nextDay += 1;
      }
      cells.forEach(function (cell) {
        var cls = 'mp-cal__day';
        if (cell.muted) cls += ' is-muted';
        if (selected && selected.getFullYear() === cell.date.getFullYear() && selected.getMonth() === cell.date.getMonth() && selected.getDate() === cell.date.getDate()) {
          cls += ' is-selected';
        }
        html += '<button type="button" class="' + cls + '" data-y="' + cell.date.getFullYear() + '" data-m="' + cell.date.getMonth() + '" data-d="' + cell.date.getDate() + '">' + cell.day + '</button>';
      });
      if (grid) grid.innerHTML = html;
    }

    function closeAllExpCals() {
      if (!expEntries) return;
      expEntries.querySelectorAll('[data-exp-cal]').forEach(function (cal) { cal.hidden = true; });
      expEntries.querySelectorAll('[data-exp-date-trigger]').forEach(function (btn) { btn.classList.remove('is-open'); });
    }

    function wireExpEntry(entry) {
      entry.querySelectorAll('.mp-combo[data-combo]').forEach(setupExpCombo);

      var trigger = entry.querySelector('[data-exp-date-trigger]');
      var cal = entry.querySelector('[data-exp-cal]');
      var label = entry.querySelector('[data-exp-date-label]');
      if (!trigger || !cal) return;

      if (!entry._expCalCursor) entry._expCalCursor = new Date(2026, 7, 1);

      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = cal.hidden;
        closeAllExpCals();
        if (open) {
          cal.hidden = false;
          trigger.classList.add('is-open');
          renderExpCal(entry);
        }
      });

      cal.addEventListener('click', function (e) { e.stopPropagation(); });

      cal.querySelectorAll('[data-exp-cal-nav]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var nav = btn.getAttribute('data-exp-cal-nav');
          var c = entry._expCalCursor;
          if (nav === 'prev-month') entry._expCalCursor = new Date(c.getFullYear(), c.getMonth() - 1, 1);
          if (nav === 'next-month') entry._expCalCursor = new Date(c.getFullYear(), c.getMonth() + 1, 1);
          if (nav === 'prev-year') entry._expCalCursor = new Date(c.getFullYear() - 1, c.getMonth(), 1);
          if (nav === 'next-year') entry._expCalCursor = new Date(c.getFullYear() + 1, c.getMonth(), 1);
          renderExpCal(entry);
        });
      });

      var todayBtn = entry.querySelector('[data-exp-cal-today]');
      if (todayBtn) {
        todayBtn.addEventListener('click', function () {
          var now = new Date();
          entry._expDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          entry._expCalCursor = new Date(now.getFullYear(), now.getMonth(), 1);
          if (label) {
            label.textContent = formatExpDate(entry._expDate);
            trigger.classList.add('has-value');
          }
          closeAllExpCals();
        });
      }

      var grid = entry.querySelector('[data-exp-cal-grid]');
      if (grid) {
        grid.addEventListener('click', function (e) {
          var dayBtn = e.target.closest('.mp-cal__day');
          if (!dayBtn) return;
          entry._expDate = new Date(+dayBtn.getAttribute('data-y'), +dayBtn.getAttribute('data-m'), +dayBtn.getAttribute('data-d'));
          if (label) {
            label.textContent = formatExpDate(entry._expDate);
            trigger.classList.add('has-value');
          }
          closeAllExpCals();
        });
      }

      var removeBtn = entry.querySelector('[data-exp-remove]');
      if (removeBtn) {
        removeBtn.addEventListener('click', function () {
          var all = expEntries.querySelectorAll('[data-exp-entry]');
          if (all.length <= 1) {
            toast('Required', 'At least one expense entry is required.');
            return;
          }
          entry.remove();
        });
      }
    }

    function openExpModal(mode) {
      if (!expModal) return;
      syncExpMetaDate();
      var title = document.getElementById('mpExpModalTitle');
      if (title) title.textContent = mode === 'edit' ? 'Edit Expense' : 'Add Expense';
      expModal.hidden = false;
      expModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeExpModal() {
      if (!expModal) return;
      expModal.hidden = true;
      expModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      closeAllExpCals();
      document.querySelectorAll('#mpExpModal .mp-combo.is-open').forEach(function (el) {
        el.classList.remove('is-open');
        var list = el.querySelector('.mp-combo__list');
        if (list) list.hidden = true;
      });
    }

    if (expEntries) {
      expEntries.querySelectorAll('[data-exp-entry]').forEach(wireExpEntry);
    }

    if (expAddEntry && expEntries) {
      expAddEntry.addEventListener('click', function () {
        var first = expEntries.querySelector('[data-exp-entry]');
        if (!first) return;
        var clone = first.cloneNode(true);
        clone._expDate = null;
        clone._expCalCursor = new Date(2026, 7, 1);
        clone.querySelectorAll('input[type="text"], textarea').forEach(function (el) {
          if (el.name === 'expClient') el.value = 'Internal';
          else el.value = '';
        });
        clone.querySelectorAll('input[type="file"]').forEach(function (el) { el.value = ''; });
        var paid = clone.querySelector('select[name="expPaidBy"]');
        if (paid) paid.value = 'Employee';
        var label = clone.querySelector('[data-exp-date-label]');
        var trigger = clone.querySelector('[data-exp-date-trigger]');
        if (label) label.textContent = 'Select Date';
        if (trigger) trigger.classList.remove('has-value', 'is-open');
        var cal = clone.querySelector('[data-exp-cal]');
        if (cal) cal.hidden = true;
        expEntries.appendChild(clone);
        wireExpEntry(clone);
      });
    }

    var addBtn = document.getElementById('mpExpAdd');
    if (addBtn) addBtn.addEventListener('click', function () { openExpModal('add'); });

    if (expModal) {
      expModal.querySelectorAll('[data-exp-close]').forEach(function (el) {
        el.addEventListener('click', closeExpModal);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !expModal.hidden) closeExpModal();
      });
      document.addEventListener('click', closeAllExpCals);
    }

    if (expForm) {
      expForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var entry = expEntries && expEntries.querySelector('[data-exp-entry]');
        if (!entry) return;
        var client = (entry.querySelector('[name="expClient"]') || {}).value || '';
        var type = (entry.querySelector('[name="expType"]') || {}).value || '';
        var amount = (entry.querySelector('[name="expAmount"]') || {}).value || '';
        if (!client || !type || !amount || !entry._expDate) {
          toast('Required fields', 'Please fill Client, Expense Type, Amount and Date.');
          return;
        }
        closeExpModal();
        toast('Expense submitted', 'Expense saved successfully.');
      });
    }

    var colsBtn = document.getElementById('mpExpColumns');
    var colsMenu = document.getElementById('mpExpColsMenu');
    var colsList = document.getElementById('mpExpColsList');
    var selectAll = document.getElementById('mpExpColsSelectAll');
    var expTable = document.getElementById('mpExpTable');

    function applyExpColumns() {
      if (!colsList || !expTable) return;
      colsList.querySelectorAll('input[data-exp-col]').forEach(function (input) {
        var key = input.getAttribute('data-exp-col');
        var show = !!input.checked;
        expTable.querySelectorAll('[data-exp-col="' + key + '"]').forEach(function (cell) {
          cell.hidden = !show;
        });
      });
      updateExpSelectAllLabel();
    }

    function updateExpSelectAllLabel() {
      if (!selectAll || !colsList) return;
      var inputs = colsList.querySelectorAll('input[data-exp-col]');
      var checked = colsList.querySelectorAll('input[data-exp-col]:checked').length;
      selectAll.textContent = checked === inputs.length ? 'Deselect All' : 'Select All';
    }

    function closeExpCols() {
      if (!colsMenu || !colsBtn) return;
      colsMenu.hidden = true;
      colsBtn.classList.remove('is-active');
      colsBtn.setAttribute('aria-expanded', 'false');
      colsMenu.classList.remove('is-above');
      colsMenu.style.top = '';
      colsMenu.style.left = '';
      colsMenu.style.maxHeight = '';
      colsMenu.style.removeProperty('--mp-cols-arrow-x');
    }

    function positionExpColsMenu() {
      if (!colsMenu || !colsBtn || colsMenu.hidden) return;
      var rect = colsBtn.getBoundingClientRect();
      var gap = 10;
      var width = Math.max(colsMenu.offsetWidth || 260, 260);
      var maxH = Math.min(window.innerHeight * 0.7, 520);
      var spaceBelow = window.innerHeight - rect.bottom - gap - 12;
      var spaceAbove = rect.top - gap - 12;
      var placeAbove = spaceBelow < 220 && spaceAbove > spaceBelow;
      var left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8);
      var top;
      if (placeAbove) {
        var height = Math.min(maxH, Math.max(160, spaceAbove));
        colsMenu.style.maxHeight = height + 'px';
        top = Math.max(8, rect.top - gap - height);
        colsMenu.classList.add('is-above');
      } else {
        var heightBelow = Math.min(maxH, Math.max(160, spaceBelow));
        colsMenu.style.maxHeight = heightBelow + 'px';
        top = rect.bottom + gap;
        colsMenu.classList.remove('is-above');
      }
      colsMenu.style.top = top + 'px';
      colsMenu.style.left = left + 'px';
      colsMenu.style.setProperty('--mp-cols-arrow-x', Math.max(12, Math.min(width - 24, rect.left - left + rect.width / 2 - 6)) + 'px');
    }

    if (colsBtn && colsMenu) {
      colsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = colsMenu.hidden;
        colsMenu.hidden = !open;
        colsBtn.classList.toggle('is-active', open);
        colsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) {
          positionExpColsMenu();
        } else {
          closeExpCols();
        }
      });
      colsMenu.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', closeExpCols);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeExpCols();
      });
      window.addEventListener('resize', positionExpColsMenu);
      var mainEl = document.querySelector('.main');
      if (mainEl) mainEl.addEventListener('scroll', positionExpColsMenu, { passive: true });
    }

    if (colsList) {
      colsList.querySelectorAll('input[data-exp-col]').forEach(function (input) {
        input.addEventListener('change', applyExpColumns);
      });
    }

    if (selectAll && colsList) {
      selectAll.addEventListener('click', function () {
        var inputs = colsList.querySelectorAll('input[data-exp-col]');
        var allOn = colsList.querySelectorAll('input[data-exp-col]:checked').length === inputs.length;
        inputs.forEach(function (input) { input.checked = !allOn; });
        applyExpColumns();
      });
    }

    applyExpColumns();

    var billModal = document.getElementById('mpExpBillModal');

    function openExpBillModal() {
      if (!billModal) return;
      billModal.hidden = false;
      billModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeExpBillModal() {
      if (!billModal) return;
      billModal.hidden = true;
      billModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    root.querySelectorAll('[data-exp-view]').forEach(function (btn) {
      btn.addEventListener('click', function () { openExpBillModal(); });
    });
    if (billModal) {
      billModal.querySelectorAll('[data-exp-bill-close]').forEach(function (el) {
        el.addEventListener('click', closeExpBillModal);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !billModal.hidden) closeExpBillModal();
      });
      var billAttach = billModal.querySelector('[data-exp-bill-attach]');
      if (billAttach) {
        billAttach.addEventListener('click', function () {
          toast('Attachment', 'No attachment uploaded for this expense.');
        });
      }
    }
    root.querySelectorAll('[data-exp-amount]').forEach(function (btn) {
      btn.addEventListener('click', function () { toast('Amount', 'Expense amount details open here.'); });
    });
    root.querySelectorAll('[data-exp-attach]').forEach(function (btn) {
      btn.addEventListener('click', function () { toast('Attachments', 'Expense attachments open here.'); });
    });
    root.querySelectorAll('[data-exp-pdf]').forEach(function (btn) {
      btn.addEventListener('click', function () { toast('PDF', 'Expense PDF download starts here.'); });
    });
    var approvedPdf = document.getElementById('mpExpApprovedPdf');
    if (approvedPdf) {
      approvedPdf.addEventListener('click', function () { toast('Export PDF', 'Approved expenses PDF export starts here.'); });
    }
    var approvedCols = document.getElementById('mpExpApprovedColumns');
    if (approvedCols) {
      approvedCols.addEventListener('click', function () { toast('Columns', 'Approved expense columns open here.'); });
    }
    var rejectedCols = document.getElementById('mpExpRejectedColumns');
    if (rejectedCols) {
      rejectedCols.addEventListener('click', function () { toast('Columns', 'Rejected expense columns open here.'); });
    }
    root.querySelectorAll('[data-exp-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () { openExpModal('edit'); });
    });

    var delPop = document.getElementById('mpExpDelPop');
    var delNo = document.getElementById('mpExpDelNo');
    var delYes = document.getElementById('mpExpDelYes');
    var delRow = null;

    function closeExpDelPop() {
      if (!delPop) return;
      delPop.hidden = true;
      delRow = null;
    }

    function openExpDelPop(anchor) {
      if (!delPop || !anchor) return;
      delRow = anchor.closest('tr');
      delPop.hidden = false;
      var rect = anchor.getBoundingClientRect();
      var popW = delPop.offsetWidth || 260;
      var popH = delPop.offsetHeight || 100;
      var left = rect.left + rect.width / 2 - popW / 2;
      var top = rect.top - popH - 8;
      if (left < 8) left = 8;
      if (left + popW > window.innerWidth - 8) left = window.innerWidth - popW - 8;
      if (top < 8) top = rect.bottom + 8;
      delPop.style.left = left + 'px';
      delPop.style.top = top + 'px';
    }

    root.querySelectorAll('[data-exp-delete]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openExpDelPop(btn);
      });
    });

    if (delPop) {
      delPop.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', closeExpDelPop);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeExpDelPop();
      });
      window.addEventListener('scroll', closeExpDelPop, true);
    }
    if (delNo) delNo.addEventListener('click', closeExpDelPop);
    if (delYes) {
      delYes.addEventListener('click', function () {
        if (delRow) delRow.remove();
        closeExpDelPop();
        toast('Deleted', 'Expense removed successfully.');
      });
    }
  }

  function initSalaryUi() {
    var root = document.getElementById('mpPanel-salary');
    if (!root) return;

    var tabs = root.querySelectorAll('.mp-sal-subtab');
    var panes = root.querySelectorAll('.mp-sal-pane');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-sal-tab');
        tabs.forEach(function (t) {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        });
        panes.forEach(function (pane) {
          var on = pane.getAttribute('data-sal-pane') === id;
          pane.classList.toggle('is-active', on);
          pane.hidden = !on;
        });
      });
    });

    var fyBtn = document.getElementById('mpSalFyBtn');
    var fyMenu = document.getElementById('mpSalFyMenu');
    var fyLabel = document.getElementById('mpSalFyLabel');
    if (fyBtn && fyMenu) {
      fyBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeSalMonthPop();
        var open = fyMenu.hidden;
        fyMenu.hidden = !open;
        fyBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      fyMenu.querySelectorAll('li').forEach(function (item) {
        item.addEventListener('click', function () {
          fyMenu.querySelectorAll('li').forEach(function (li) {
            li.classList.toggle('is-selected', li === item);
            li.setAttribute('aria-selected', li === item ? 'true' : 'false');
          });
          if (fyLabel) fyLabel.textContent = item.textContent;
          fyMenu.hidden = true;
          fyBtn.setAttribute('aria-expanded', 'false');
        });
      });
      document.addEventListener('click', function () {
        fyMenu.hidden = true;
        fyBtn.setAttribute('aria-expanded', 'false');
      });
    }

    var MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthBtn = document.getElementById('mpSalMonthBtn');
    var monthText = document.getElementById('mpSalMonthText');
    var monthPop = document.getElementById('mpSalMonthPop');
    var monthGrid = document.getElementById('mpSalMonthGrid');
    var pickerYearEl = document.getElementById('mpSalPickerYear');
    var yearPrev = document.getElementById('mpSalYearPrev');
    var yearNext = document.getElementById('mpSalYearNext');
    var salMonthState = {
      selectedYear: null,
      selectedMonth: null,
      pickerYear: 2026
    };

    function closeSalMonthPop() {
      if (!monthPop || !monthBtn) return;
      monthPop.hidden = true;
      monthBtn.classList.remove('is-open');
      monthBtn.setAttribute('aria-expanded', 'false');
    }

    function updateSalMonthLabel() {
      if (!monthText || !monthBtn) return;
      if (salMonthState.selectedYear == null || salMonthState.selectedMonth == null) {
        monthText.textContent = 'Month';
        monthBtn.classList.remove('has-value');
        return;
      }
      monthText.textContent = MONTH_LABELS[salMonthState.selectedMonth] + ' ' + salMonthState.selectedYear;
      monthBtn.classList.add('has-value');
    }

    function renderSalMonthGrid() {
      if (!monthGrid || !pickerYearEl) return;
      pickerYearEl.textContent = String(salMonthState.pickerYear);
      monthGrid.innerHTML = MONTH_LABELS.map(function (label, idx) {
        var selected = salMonthState.pickerYear === salMonthState.selectedYear && idx === salMonthState.selectedMonth ? ' is-selected' : '';
        return '<button type="button" class="mp-sal-month-cell' + selected + '" data-month="' + idx + '">' + label + '</button>';
      }).join('');
    }

    function placeSalMonthPop() {
      if (!monthPop || !monthBtn || monthPop.hidden) return;
      var r = monthBtn.getBoundingClientRect();
      var width = monthPop.offsetWidth || 280;
      var height = monthPop.offsetHeight || 260;
      var left = Math.min(window.innerWidth - width - 12, Math.max(12, r.right - width));
      var top = r.bottom + 8;
      if (top + height > window.innerHeight - 12) top = Math.max(12, r.top - height - 8);
      monthPop.style.left = left + 'px';
      monthPop.style.top = top + 'px';
    }

    function openSalMonthPop() {
      if (!monthPop || !monthBtn) return;
      if (fyMenu) {
        fyMenu.hidden = true;
        if (fyBtn) fyBtn.setAttribute('aria-expanded', 'false');
      }
      var alreadyOpen = !monthPop.hidden;
      if (alreadyOpen) {
        closeSalMonthPop();
        return;
      }
      salMonthState.pickerYear = salMonthState.selectedYear || salMonthState.pickerYear || 2026;
      renderSalMonthGrid();
      monthPop.hidden = false;
      monthBtn.classList.add('is-open');
      monthBtn.setAttribute('aria-expanded', 'true');
      placeSalMonthPop();
    }

    if (monthBtn && monthPop && monthGrid) {
      updateSalMonthLabel();
      monthBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openSalMonthPop();
      });
      monthPop.addEventListener('click', function (e) { e.stopPropagation(); });
      if (yearPrev) {
        yearPrev.addEventListener('click', function () {
          salMonthState.pickerYear -= 1;
          renderSalMonthGrid();
        });
      }
      if (yearNext) {
        yearNext.addEventListener('click', function () {
          salMonthState.pickerYear += 1;
          renderSalMonthGrid();
        });
      }
      monthGrid.addEventListener('click', function (e) {
        var cell = e.target.closest('[data-month]');
        if (!cell) return;
        salMonthState.selectedMonth = Number(cell.getAttribute('data-month'));
        salMonthState.selectedYear = salMonthState.pickerYear;
        updateSalMonthLabel();
        closeSalMonthPop();
        toast('Month selected', MONTH_LABELS[salMonthState.selectedMonth] + ' ' + salMonthState.selectedYear);
      });
      document.addEventListener('click', closeSalMonthPop);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeSalMonthPop();
      });
      window.addEventListener('resize', placeSalMonthPop);
      var mainEl = document.querySelector('.main');
      if (mainEl) mainEl.addEventListener('scroll', placeSalMonthPop, { passive: true });
    }

    var searchBtn = document.getElementById('mpSalSearchBtn');
    var clearBtn = document.getElementById('mpSalClearBtn');
    var searchInput = document.getElementById('mpSalSearch');
    if (searchBtn) {
      searchBtn.addEventListener('click', function () {
        toast('Search', (searchInput && searchInput.value) ? ('Looking for “' + searchInput.value + '”') : 'Enter a month or component.');
      });
    }
    if (clearBtn && searchInput) {
      clearBtn.addEventListener('click', function () {
        searchInput.value = '';
        toast('Cleared', 'Search cleared.');
      });
    }

    root.querySelectorAll('[data-sal-view-slip]').forEach(function (btn) {
      btn.addEventListener('click', function () { openSalSlipModal(); });
    });
    root.querySelectorAll('[data-sal-dl-slip]').forEach(function (btn) {
      btn.addEventListener('click', function () { toast('Download', 'July 2026 payslip download started.'); });
    });
    root.querySelectorAll('[data-sal-download]').forEach(function (btn) {
      btn.addEventListener('click', function () { toast('Download', 'Document download started.'); });
    });

    var slipModal = document.getElementById('mpSalSlipModal');
    var slipDownload = document.getElementById('mpSalSlipDownload');

    function openSalSlipModal() {
      if (!slipModal) return;
      slipModal.hidden = false;
      slipModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeSalSlipModal() {
      if (!slipModal) return;
      slipModal.hidden = true;
      slipModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (slipModal) {
      slipModal.querySelectorAll('[data-sal-slip-close]').forEach(function (el) {
        el.addEventListener('click', closeSalSlipModal);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !slipModal.hidden) closeSalSlipModal();
      });
    }
    if (slipDownload) {
      slipDownload.addEventListener('click', function () {
        toast('Download', 'July 2026 payslip PDF download started.');
      });
    }
  }

  function initDocumentsUi() {
    var root = document.getElementById('mpPanel-document');
    if (!root) return;

    var rowsWrap = document.getElementById('mpDocRows');
    var addBtn = document.getElementById('mpDocAddRow');
    var submitBtn = document.getElementById('mpDocSubmit');
    var prevBtn = document.getElementById('mpDocPrev');
    var uploaded = document.getElementById('mpDocUploadedList');
    var pending = [];

    function renumber() {
      rowsWrap.querySelectorAll('[data-doc-row]').forEach(function (row, i) {
        var label = row.querySelector('.mp-doc-row__label');
        if (label) label.textContent = 'Document ' + (i + 1);
      });
    }

    function refreshSubmit() {
      var hasFile = !!rowsWrap.querySelector('.mp-doc-upload.has-file');
      if (submitBtn) submitBtn.disabled = !hasFile;
    }

    function bindRow(row) {
      var input = row.querySelector('input[type="file"]');
      var upload = row.querySelector('.mp-doc-upload');
      var text = row.querySelector('.mp-doc-upload__text');
      var remove = row.querySelector('[data-doc-remove]');

      if (input && upload && !input.dataset.bound) {
        input.dataset.bound = '1';
        input.addEventListener('change', function () {
          var file = input.files && input.files[0];
          if (file) {
            upload.classList.add('has-file');
            if (text) text.textContent = file.name;
            pending.push(file.name);
          } else {
            upload.classList.remove('has-file');
            if (text) text.textContent = 'Click to Upload';
          }
          refreshSubmit();
        });
      }

      if (remove && !remove.dataset.bound) {
        remove.dataset.bound = '1';
        remove.addEventListener('click', function () {
          var all = rowsWrap.querySelectorAll('[data-doc-row]');
          if (all.length <= 1) {
            if (input) input.value = '';
            upload.classList.remove('has-file');
            if (text) text.textContent = 'Click to Upload';
            refreshSubmit();
            return;
          }
          row.remove();
          renumber();
          refreshSubmit();
        });
      }
    }

    rowsWrap.querySelectorAll('[data-doc-row]').forEach(bindRow);

    if (addBtn) {
      addBtn.addEventListener('click', function () {
        var n = rowsWrap.querySelectorAll('[data-doc-row]').length + 1;
        var row = document.createElement('div');
        row.className = 'mp-doc-row';
        row.setAttribute('data-doc-row', '');
        row.innerHTML =
          '<span class="mp-doc-row__label">Document ' + n + '</span>' +
          '<label class="mp-doc-upload">' +
            '<input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx" hidden>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M12 16V8M8.5 11.5L12 8l3.5 3.5"/><path d="M4 16.5V18a2 2 0 002 2h12a2 2 0 002-2v-1.5"/></svg>' +
            '<span class="mp-doc-upload__text">Click to Upload</span>' +
          '</label>' +
          '<button type="button" class="mp-doc-trash" aria-label="Remove document row" data-doc-remove>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M4 7h16"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/><path d="M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12"/><path d="M10 11v6M14 11v6"/></svg>' +
          '</button>';
        rowsWrap.appendChild(row);
        bindRow(row);
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        var names = [];
        rowsWrap.querySelectorAll('.mp-doc-upload.has-file .mp-doc-upload__text').forEach(function (el) {
          names.push(el.textContent);
        });
        if (!names.length) return;

        if (uploaded) {
          uploaded.className = 'mp-doc-uploaded';
          uploaded.innerHTML = names.map(function (name) {
            return '<div class="mp-doc-file">' +
              '<span class="mp-doc-file__name">' + name + '</span>' +
              '<div class="mp-doc-file__actions">' +
                '<button type="button" data-doc-view>View</button>' +
                '<button type="button" data-doc-dl>Download</button>' +
              '</div></div>';
          }).join('');
          uploaded.querySelectorAll('[data-doc-view]').forEach(function (btn) {
            btn.addEventListener('click', function () { toast('View', 'Opening document…'); });
          });
          uploaded.querySelectorAll('[data-doc-dl]').forEach(function (btn) {
            btn.addEventListener('click', function () { toast('Download', 'Download started.'); });
          });
        }

        rowsWrap.querySelectorAll('[data-doc-row]').forEach(function (row, i) {
          if (i === 0) {
            var input = row.querySelector('input[type="file"]');
            var upload = row.querySelector('.mp-doc-upload');
            var text = row.querySelector('.mp-doc-upload__text');
            if (input) input.value = '';
            if (upload) upload.classList.remove('has-file');
            if (text) text.textContent = 'Click to Upload';
          } else {
            row.remove();
          }
        });
        renumber();
        refreshSubmit();
        toast('Submitted', names.length + ' document(s) submitted.');
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        var salaryTab = document.querySelector('.mp-profile-tab[data-mp-tab="salary"]');
        if (salaryTab) salaryTab.click();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initTabs();
      initActions();
      initTaskUi();
      initCalendarUi();
      initAppointmentModal();
      initTimesheetUi();
      initAttendanceUi();
      initLeaveUi();
      initExpensesUi();
      initSalaryUi();
      initDocumentsUi();
    });
  } else {
    initTabs();
    initActions();
    initTaskUi();
    initCalendarUi();
    initAppointmentModal();
    initTimesheetUi();
    initAttendanceUi();
    initLeaveUi();
    initExpensesUi();
    initSalaryUi();
    initDocumentsUi();
  }
})();
