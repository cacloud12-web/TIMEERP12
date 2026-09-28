/**
 * Task Management module
 */
(function() {
  'use strict';

  /* ── Clock ── */
  var clock = document.getElementById('dvTopClock');
  function tick() {
    if (!clock) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
    var ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
    clock.textContent = h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + ' ' + ap;
  }
  tick(); setInterval(tick, 1000);

  /* ── Tab switching ── */
  var tabs = document.querySelectorAll('.tm-tab');
  var panels = document.querySelectorAll('.tm-panel');
  function switchToTab(tabName) {
    tabs.forEach(function(t) {
      t.classList.toggle('is-active', t.dataset.tab === tabName);
    });
    panels.forEach(function(p) { p.classList.remove('is-active'); });
    var target = document.getElementById('panel-' + tabName);
    if (target) target.classList.add('is-active');
  }
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() { switchToTab(tab.dataset.tab); });
  });

  var tdTableViewBtn = document.getElementById('tdTableViewBtn');
  if (tdTableViewBtn) {
    tdTableViewBtn.addEventListener('click', function() { switchToTab('table'); });
  }
  var tdCartViewBtn = document.getElementById('tdCartViewBtn');
  if (tdCartViewBtn) {
    tdCartViewBtn.addEventListener('click', function() { switchToTab('cart'); });
  }

  /* Close helper for toolbar popovers */
  function closeTmViewDD() {
    var btn = document.getElementById('tmViewBtn');
    var dd = document.getElementById('tmViewDD');
    if (dd) dd.hidden = true;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
  function closeTmFiltersDD() {
    var btn = document.getElementById('tmFiltersBtn');
    var dd = document.getElementById('tmFiltersDD');
    if (dd) dd.hidden = true;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
  function closeTmSelectSvc() {
    var pop = document.getElementById('tmSelectSvc');
    if (pop) pop.hidden = true;
  }
  function openTmSelectSvc() {
    closeTmViewDD();
    closeTmFiltersDD();
    var pop = document.getElementById('tmSelectSvc');
    if (pop) pop.hidden = false;
  }

  /* Table toolbar view switcher: Table / Calendar / Service wise */
  (function initTableViewSwitcher() {
    var wrap = document.getElementById('tmViewWrap');
    var btn = document.getElementById('tmViewBtn');
    var dd = document.getElementById('tmViewDD');
    var label = document.getElementById('tmViewLabel');
    var toolbar = document.querySelector('#panel-table .tm-toolbar');
    if (!wrap || !btn || !dd || !label) return;

    var panels = {
      table: document.getElementById('tmSubviewTable'),
      calendar: document.getElementById('tmSubviewCalendar'),
      service: document.getElementById('tmSubviewService')
    };
    var labels = { table: 'Table', calendar: 'Calendar', service: 'Service wise' };
    var currentView = 'table';

    function openDD() {
      closeTmFiltersDD();
      closeTmSelectSvc();
      dd.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
    }
    function closeDD() {
      dd.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }
    function setView(view, opts) {
      if (!labels[view]) return;
      opts = opts || {};
      currentView = view;
      label.textContent = labels[view];
      dd.querySelectorAll('li').forEach(function(li) {
        var on = li.dataset.view === view;
        li.classList.toggle('is-selected', on);
        li.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      Object.keys(panels).forEach(function(key) {
        if (panels[key]) panels[key].hidden = key !== view;
      });
      if (toolbar) {
        toolbar.classList.toggle('is-service-mode', view === 'service');
        toolbar.classList.toggle('is-calendar-mode', view === 'calendar');
      }
      closeDD();
      if (view === 'service' && opts.openSelect !== false) {
        openTmSelectSvc();
      } else {
        closeTmSelectSvc();
      }
    }

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeTmSelectSvc();
      if (dd.hidden) openDD(); else closeDD();
    });
    dd.addEventListener('click', function(e) {
      var li = e.target.closest('li[data-view]');
      if (!li) return;
      e.stopPropagation();
      setView(li.dataset.view);
    });
    document.addEventListener('click', function(e) {
      if (wrap.contains(e.target)) return;
      closeDD();
      closeTmSelectSvc();
    });

    window.__tmSetTableSubview = setView;
  })();

  /* Select Services popover */
  (function initSelectServices() {
    var wrap = document.getElementById('tmViewWrap');
    var pop = document.getElementById('tmSelectSvc');
    var list = document.getElementById('tmSelectSvcList');
    var allBtn = document.getElementById('tmSelectSvcAll');
    var noneBtn = document.getElementById('tmSelectSvcNone');
    var applyBtn = document.getElementById('tmSelectSvcApply');
    if (!pop || !list) return;

    function checks() {
      return list.querySelectorAll('input[type="checkbox"]');
    }
    if (allBtn) {
      allBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        checks().forEach(function(c) { c.checked = true; });
      });
    }
    if (noneBtn) {
      noneBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        checks().forEach(function(c) { c.checked = false; });
      });
    }
    if (applyBtn) {
      applyBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeTmSelectSvc();
      });
    }
    pop.addEventListener('click', function(e) { e.stopPropagation(); });
  })();

  /* My Services table seed + search */
  (function initMyServicesTable() {
    var body = document.getElementById('tmMySvcBody');
    var search = document.getElementById('tmMySvcSearch');
    if (!body) return;

    var services = [
      { name: '24G Return', completed: 0, processing: 0, open: 0 },
      { name: 'Accounting', completed: 7, processing: 16, open: 31 },
      { name: 'Accounting 100', completed: 0, processing: 0, open: 0 },
      { name: 'AD Code', completed: 0, processing: 0, open: 1 },
      { name: 'Agreement', completed: 10, processing: 6, open: 18 },
      { name: 'Agreement Drafting', completed: 1, processing: 0, open: 12 },
      { name: 'Agreement Drafting / Vetting', completed: 0, processing: 0, open: 2 },
      { name: 'Agreement Vetting', completed: 2, processing: 1, open: 5 },
      { name: 'Annual Tax audit', completed: 4, processing: 3, open: 9 },
      { name: 'Audit', completed: 12, processing: 8, open: 15 }
    ];

    function plusBtn() {
      return '<button type="button" class="tm-mysvc__plus" aria-label="Add"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>';
    }
    function render(rows) {
      body.innerHTML = rows.map(function(s, i) {
        return '<tr data-name="' + s.name.toLowerCase() + '">' +
          '<td>' + (i + 1) + '</td>' +
          '<td><a href="service_subservices.html?name=' + encodeURIComponent(s.name) + '&from=task_management" class="tm-mysvc__name">' + s.name + '</a></td>' +
          '<td>' + plusBtn() + '</td>' +
          '<td><button type="button" class="tm-mysvc__action">View</button></td>' +
          '<td><span class="tm-mysvc__cust">0 ' + plusBtn() + '</span></td>' +
          '<td><span class="tm-mysvc__muted">--</span></td>' +
          '<td>' + plusBtn() + '</td>' +
          '<td><button type="button" class="tm-mysvc__action">Share</button></td>' +
          '<td><span class="tm-mysvc__muted">--</span></td>' +
          '<td><button type="button" class="tm-mysvc__action">View</button></td>' +
          '<td><button type="button" class="tm-mysvc__action">View</button></td>' +
          '<td>' + s.completed + '</td>' +
          '<td>' + s.processing + '</td>' +
          '<td>' + s.open + '</td>' +
          '</tr>';
      }).join('');
    }
    render(services);

    if (search) {
      search.addEventListener('input', function() {
        var q = search.value.trim().toLowerCase();
        var filtered = !q ? services : services.filter(function(s) {
          return s.name.toLowerCase().indexOf(q) !== -1;
        });
        render(filtered);
      });
    }
  })();

  /* Task Calendar (month / week / day / agenda) */
  (function initTaskCalendar() {
    var grid = document.getElementById('tmCalGrid');
    var monthInput = document.getElementById('tmCalMonth');
    var rangeLabel = document.getElementById('tmCalRangeLabel');
    var weekGrid = document.getElementById('tmCalWeekGrid');
    var dayGrid = document.getElementById('tmCalDayGrid');
    if (!grid || !monthInput) return;

    var MARKS = {
      '2026-08-02': { badge: 'H' },
      '2026-08-03': { badge: 'P' },
      '2026-08-04': { badge: 'P' },
      '2026-08-05': { badge: 'P' },
      '2026-08-06': { badge: 'P' },
      '2026-08-07': { badge: 'P' },
      '2026-08-09': { badge: 'H' },
      '2026-08-10': { badge: 'P' },
      '2026-08-11': { badge: 'P' },
      '2026-08-12': { badge: 'P' },
      '2026-08-13': { badge: 'P' },
      '2026-08-14': { badge: 'P' },
      '2026-08-16': { badge: 'H' },
      '2026-08-17': { badge: 'P' },
      '2026-08-18': { badge: 'P' },
      '2026-08-19': { time: '5:00:11' },
      '2026-08-20': { badge: 'P' },
      '2026-08-21': { badge: 'P' },
      '2026-08-23': { badge: 'H' },
      '2026-08-24': { badge: 'P' },
      '2026-08-25': { badge: 'P' },
      '2026-08-26': { badge: 'P' },
      '2026-08-27': { badge: 'P/A' },
      '2026-08-28': { badge: 'P' },
      '2026-08-30': { badge: 'H' },
      '2026-08-31': { badge: 'P' }
    };

    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var selectedKey = '2026-08-27';
    var currentView = 'month';
    var focusDate = parseKey(selectedKey);

    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function keyFrom(y, m, d) { return y + '-' + pad(m + 1) + '-' + pad(d); }
    function parseKey(key) {
      var p = (key || '2026-08-27').split('-');
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
      document.querySelectorAll('[data-tm-cal-panel]').forEach(function(panel) {
        panel.hidden = panel.getAttribute('data-tm-cal-panel') !== view;
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
        var cls = 'tm-cal-day' + (muted ? ' is-muted' : '') + (key === selectedKey ? ' is-selected' : '');
        html += '<button type="button" class="' + cls + '" data-key="' + key + '" aria-label="' + key + '">';
        html += '<span class="tm-cal-day__num">' + pad(dayNum) + '</span>';
        if (mark && mark.badge) html += '<span class="tm-cal-badge">' + mark.badge + '</span>';
        if (mark && mark.time) html += '<span class="tm-cal-time">' + mark.time + '</span>';
        html += '</button>';
      }

      grid.innerHTML = html;
      grid.querySelectorAll('.tm-cal-day').forEach(function(btn) {
        btn.addEventListener('click', function() {
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
      var html = '<div class="tm-cal-timegrid__inner" style="--tm-cal-cols:' + days.length + '">';
      html += '<div class="tm-cal-timegrid__corner"></div>';
      days.forEach(function(d) {
        var key = toKey(d);
        var active = key === highlightKey ? ' is-today' : '';
        html += '<div class="tm-cal-timegrid__dayhead' + active + '">' + d.getDate() + ' ' + DAYS_SHORT[d.getDay()] + '</div>';
      });
      for (var h = 0; h < 24; h++) {
        html += '<div class="tm-cal-timegrid__label">' + formatHour(h) + '</div>';
        days.forEach(function(d) {
          var key = toKey(d);
          var active = key === highlightKey ? ' is-today' : '';
          html += '<div class="tm-cal-timegrid__slot' + active + '" data-key="' + key + '" data-hour="' + h + '"></div>';
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

    function setCalView(view) {
      currentView = view;
      document.querySelectorAll('.tm-cal-view').forEach(function(b) {
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

    var prevBtn = document.getElementById('tmCalPrev');
    var nextBtn = document.getElementById('tmCalNext');
    if (prevBtn) prevBtn.addEventListener('click', function() { shiftMonth(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { shiftMonth(1); });
    monthInput.addEventListener('change', function() {
      var parts = (monthInput.value || '2026-08').split('-');
      focusDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, 1);
      selectedKey = toKey(focusDate);
      renderAll();
    });

    var todayBtn = document.getElementById('tmCalToday');
    var backBtn = document.getElementById('tmCalBack');
    var fwdBtn = document.getElementById('tmCalFwd');
    if (todayBtn) {
      todayBtn.addEventListener('click', function() {
        focusDate = parseKey('2026-08-27');
        selectedKey = '2026-08-27';
        syncMonthInput();
        renderAll();
      });
    }
    if (backBtn) backBtn.addEventListener('click', function() { shiftFocus(-1); });
    if (fwdBtn) fwdBtn.addEventListener('click', function() { shiftFocus(1); });

    document.querySelectorAll('.tm-cal-chip').forEach(function(chip) {
      chip.addEventListener('click', function() {
        document.querySelectorAll('.tm-cal-chip').forEach(function(c) {
          c.classList.toggle('is-active', c === chip);
        });
      });
    });

    document.querySelectorAll('.tm-cal-view').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setCalView(btn.getAttribute('data-cal-view') || 'month');
      });
    });

    var addBtn = document.getElementById('tmCalAddAppt');
    if (addBtn) {
      addBtn.addEventListener('click', function() {
        window.alert('Add Appointment');
      });
    }
    var googleBtn = document.getElementById('tmCalGoogle');
    if (googleBtn) {
      googleBtn.addEventListener('click', function() {
        window.alert('Connect Google account to sync calendar.');
      });
    }

    renderAll();
  })();

  /* Filters popover: Type / Category / Status */
  (function initFiltersPopover() {
    var wrap = document.getElementById('tmFiltersWrap');
    var btn = document.getElementById('tmFiltersBtn');
    var dd = document.getElementById('tmFiltersDD');
    var resetBtn = document.getElementById('tmFiltersReset');
    var applyBtn = document.getElementById('tmFiltersApply');
    var statusSel = document.getElementById('tmFilterStatus');
    var typeGroup = document.getElementById('tmFilterType');
    var categoryGroup = document.getElementById('tmFilterCategory');
    if (!wrap || !btn || !dd) return;

    function openDD() {
      closeTmViewDD();
      closeTmSelectSvc();
      dd.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
    }
    function closeDD() {
      dd.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }

    function selectExclusive(group, chip) {
      if (!group || !chip) return;
      group.querySelectorAll('.tm-filters-chip').forEach(function(c) {
        c.classList.toggle('is-active', c === chip);
      });
    }
    function toggleMulti(chip) {
      if (!chip) return;
      chip.classList.toggle('is-active');
    }
    function resetFilters() {
      if (typeGroup) {
        typeGroup.querySelectorAll('.tm-filters-chip').forEach(function(c) {
          c.classList.toggle('is-active', c.dataset.value === 'all');
        });
      }
      if (categoryGroup) {
        categoryGroup.querySelectorAll('.tm-filters-chip').forEach(function(c) {
          c.classList.remove('is-active');
        });
      }
      if (statusSel) statusSel.value = '';
    }

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (dd.hidden) openDD(); else closeDD();
    });
    dd.addEventListener('click', function(e) { e.stopPropagation(); });

    if (typeGroup) {
      typeGroup.addEventListener('click', function(e) {
        var chip = e.target.closest('.tm-filters-chip');
        if (!chip) return;
        selectExclusive(typeGroup, chip);
      });
    }
    if (categoryGroup) {
      categoryGroup.addEventListener('click', function(e) {
        var chip = e.target.closest('.tm-filters-chip');
        if (!chip) return;
        toggleMulti(chip);
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', function(e) {
        e.preventDefault();
        resetFilters();
      });
    }
    if (applyBtn) {
      applyBtn.addEventListener('click', function() {
        closeDD();
      });
    }
    document.addEventListener('click', function(e) {
      if (wrap.contains(e.target)) return;
      closeDD();
    });
  })();

  /* Preferred task view popover (eye button) */
  (function initPreferredViewPop() {
    var wrap = document.getElementById('tdEyeWrap');
    var btn = document.getElementById('tdEyeBtn');
    var pop = document.getElementById('tdViewPop');
    if (!wrap || !btn || !pop) return;

    var LS_KEY = 'tm_preferred_task_view';
    var preferred = localStorage.getItem(LS_KEY) || 'cart';

    function syncRadios(value) {
      pop.querySelectorAll('input[name="tdPreferredView"]').forEach(function (input) {
        input.checked = input.value === value;
      });
    }

    function openPop() {
      syncRadios(preferred);
      pop.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
    }
    function closePop() {
      pop.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (pop.hidden) openPop(); else closePop();
    });

    pop.addEventListener('click', function (e) { e.stopPropagation(); });

    pop.querySelectorAll('input[name="tdPreferredView"]').forEach(function (input) {
      input.addEventListener('change', function () {
        if (!input.checked) return;
        preferred = input.value;
        localStorage.setItem(LS_KEY, preferred);
        closePop();
        switchToTab(preferred);
      });
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) closePop();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePop();
    });
  })();

  /* ── Dropdown toggles ── */
  function setupDropdown(btnId, ddId) {
    var btn = document.getElementById(btnId);
    var dd = document.getElementById(ddId);
    if (!btn || !dd) return;
    btn.addEventListener('click', function(e) { e.stopPropagation(); dd.classList.toggle('is-open'); });
    document.addEventListener('click', function(e) { if (!dd.contains(e.target)) dd.classList.remove('is-open'); });
  }
  setupDropdown('moreBtn', 'moreDD');

  function closeAllSettingsMenus() {
    document.querySelectorAll('.tm-settings-dd.is-open').forEach(function(dd) { dd.classList.remove('is-open'); });
    ['tdSettingsBtn', 'settingsBtn'].forEach(function(id) {
      var btn = document.getElementById(id);
      if (btn) {
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function bindSettingsMenu(ddEl, triggerBtn) {
    if (!ddEl) return;
    ddEl.addEventListener('click', function(e) {
      var li = e.target.closest('li'); if (!li || !li.dataset.action) return;
      closeAllSettingsMenus();
      if (li.dataset.action === 'master-services') window.location.href = 'service_master.html';
      else if (li.dataset.action === 'task-settings') openTaskSettingsModal();
    });
    if (triggerBtn) {
      triggerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        var open = !ddEl.classList.contains('is-open');
        closeAllSettingsMenus();
        if (open) {
          ddEl.classList.add('is-open');
          triggerBtn.classList.add('is-open');
          triggerBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  }

  var BADGE_COLORS = ['#ef4444','#25b7a7','#f97316','#22c55e','#8b5cf6','#ec4899','#25b7a7','#eab308','#6366f1','#14b8a6','#be185d','#78716c','#dc2626','#25b7a7','#d97706','#059669','#7c3aed','#db2777','#1a9e8f','#ca8a04','#4f46e5','#1a9e8f','#9f1239','#57534e'];
  function getInitials(name) {
    var parts = name.replace(/[^a-zA-Z0-9 ]/g, '').split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  }

  var masterMode = false;

  function closeAllAddMenus() {
    document.querySelectorAll('.tm-add-dd.is-open').forEach(function(dd) { dd.classList.remove('is-open'); });
    ['addBtn', 'tdAddBtn'].forEach(function(id) {
      var b = document.getElementById(id);
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }

  function handleAddMenuAction(action) {
    if (action === 'create-task') window.location.href = 'add_task.html';
    else if (action === 'quick-task') openQuickTaskModal();
  }

  function bindAddMenu(btnId, ddId, wrapId) {
    var btn = document.getElementById(btnId);
    var dd = document.getElementById(ddId);
    var wrap = document.getElementById(wrapId);
    if (!btn || !dd) return;
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (masterMode) { openTemplatesModal(); return; }
      var open = !dd.classList.contains('is-open');
      closeAllAddMenus();
      closeAllSettingsMenus();
      if (open) {
        dd.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
    dd.addEventListener('click', function(e) {
      var li = e.target.closest('li'); if (!li || !li.dataset.action) return;
      e.stopPropagation();
      closeAllAddMenus();
      handleAddMenuAction(li.dataset.action);
    });
    document.addEventListener('click', function(e) {
      if (wrap && wrap.contains(e.target)) return;
      if (dd.contains(e.target) || btn.contains(e.target)) return;
      dd.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  bindAddMenu('addBtn', 'addDD', 'addWrap');
  bindAddMenu('tdAddBtn', 'tdAddDD', 'tdAddWrap');

  /* ── FY searchable select ── */
  var fyWrap = document.getElementById('tmFYWrap');
  var fyBtn = document.getElementById('tmFYBtn');
  var fyValue = document.getElementById('tmFYValue');
  var fyClear = document.getElementById('tmFYClear');
  var fyDD = document.getElementById('tmFYDD');
  var fyList = document.getElementById('tmFYList');
  function openFY() {
    if (!fyDD || !fyBtn) return;
    fyDD.hidden = false; fyBtn.classList.add('is-open'); fyBtn.setAttribute('aria-expanded', 'true');
  }
  function closeFY() {
    if (!fyDD || !fyBtn) return;
    fyDD.hidden = true; fyBtn.classList.remove('is-open'); fyBtn.setAttribute('aria-expanded', 'false');
  }
  function setFY(val) {
    var tdFYValue = document.getElementById('tdFYValue');
    if (fyValue) fyValue.textContent = val || '';
    if (tdFYValue) tdFYValue.textContent = val || 'FY 26-27';
    if (fyBtn) fyBtn.classList.toggle('has-value', !!val);
    var tdFYBtnEl = document.getElementById('tdFYBtn');
    if (tdFYBtnEl) tdFYBtnEl.classList.add('has-value');
    if (fyList) {
      fyList.querySelectorAll('li').forEach(function(li) {
        li.classList.toggle('is-selected', li.dataset.fy === val);
      });
    }
    var tdFYListEl = document.getElementById('tdFYList');
    if (tdFYListEl) {
      tdFYListEl.querySelectorAll('li').forEach(function(li) {
        li.classList.toggle('is-selected', li.dataset.fy === (val || 'FY 26-27'));
      });
    }
  }
  if (fyBtn) {
    fyBtn.classList.add('has-value');
    fyBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (e.target === fyClear || (fyClear && fyClear.contains(e.target))) return;
      if (fyDD && !fyDD.hidden) closeFY(); else openFY();
    });
  }
  if (fyClear) {
    fyClear.addEventListener('click', function(e) {
      e.stopPropagation(); setFY(''); closeFY();
    });
  }
  if (fyList) {
    fyList.addEventListener('click', function(e) {
      var li = e.target.closest('li'); if (!li) return;
      setFY(li.dataset.fy); closeFY();
    });
  }
  document.addEventListener('click', function(e) {
    if (fyWrap && !fyWrap.contains(e.target)) closeFY();
    var tdFYWrap = document.getElementById('tdFYWrap');
    if (tdFYWrap && !tdFYWrap.contains(e.target)) closeTdFY();
  });

  /* ── Task Dashboard FY + Add (same as table view) ── */
  var tdFYWrap = document.getElementById('tdFYWrap');
  var tdFYBtn = document.getElementById('tdFYBtn');
  var tdFYDD = document.getElementById('tdFYDD');
  var tdFYList = document.getElementById('tdFYList');
  function openTdFY() {
    if (!tdFYDD || !tdFYBtn) return;
    closeFY();
    tdFYDD.hidden = false; tdFYBtn.classList.add('is-open'); tdFYBtn.setAttribute('aria-expanded', 'true');
  }
  function closeTdFY() {
    if (!tdFYDD || !tdFYBtn) return;
    tdFYDD.hidden = true; tdFYBtn.classList.remove('is-open'); tdFYBtn.setAttribute('aria-expanded', 'false');
  }
  if (tdFYBtn) {
    tdFYBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (tdFYDD && !tdFYDD.hidden) closeTdFY(); else openTdFY();
    });
  }
  if (tdFYList) {
    tdFYList.addEventListener('click', function(e) {
      var li = e.target.closest('li'); if (!li) return;
      setFY(li.dataset.fy); closeTdFY();
    });
  }

  /* ── Master services + templates modal ── */
  function showPanel(id) {
    tabs.forEach(function(t) { t.classList.remove('is-active'); });
    panels.forEach(function(p) { p.classList.remove('is-active'); });
    var panel = document.getElementById(id);
    if (panel) panel.classList.add('is-active');
  }

  var MASTER_SERVICES = [
    'Sexual Harassment', 'Tax income Audit', 'TDS Litigation', 'Trademark', 'UDIN Repository',
    'Website Compliance', 'Payroll', 'Accounting', 'Bank Audit', 'DSC – Digital Signature',
    'GEM Registration', 'MSME – Udyam', 'GST Filing', 'ITR', 'ROC/MCA', 'Labour License'
  ];

  function serviceCardHtml(name, cardColor, badgeColor) {
    var safe = encodeURIComponent(name);
    var cls = 'tm-service-card' + (cardColor ? ' has-color ' + cardColor : '');
    return '<div class="' + cls + '" data-service="' + name.replace(/"/g, '&quot;') + '">' +
      '<div class="tm-card-head">' +
        '<a class="tm-card-title" href="service_subservices.html?name=' + safe + '&from=task_management.html">' + name + '</a>' +
        '<div class="tm-card-more-wrap">' +
          '<button type="button" class="tm-card-more" title="More" aria-label="More" aria-expanded="false">···</button>' +
          '<div class="tm-card-more-dd" hidden role="menu">' +
            '<button type="button" class="tm-card-more-dd__item" data-action="edit" role="menuitem">Edit</button>' +
            '<button type="button" class="tm-card-more-dd__item tm-card-more-dd__item--danger" data-action="hide" role="menuitem">Hide</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<span class="tm-card-badge" style="background:' + badgeColor + '">' + getInitials(name) + '</span>' +
      '</div>';
  }

  function closeAllCardMenus() {
    document.querySelectorAll('.tm-card-more-dd').forEach(function(d) { d.hidden = true; });
    document.querySelectorAll('.tm-card-more').forEach(function(b) { b.setAttribute('aria-expanded', 'false'); });
  }

  function bindCardMoreMenu(grid) {
    if (!grid || grid.dataset.moreBound) return;
    grid.dataset.moreBound = '1';
    grid.addEventListener('click', function(e) {
      var moreBtn = e.target.closest('.tm-card-more');
      if (moreBtn) {
        e.preventDefault();
        e.stopPropagation();
        var wrap = moreBtn.closest('.tm-card-more-wrap');
        var dd = wrap ? wrap.querySelector('.tm-card-more-dd') : null;
        var wasOpen = dd && !dd.hidden;
        closeAllCardMenus();
        if (dd && !wasOpen) {
          dd.hidden = false;
          moreBtn.setAttribute('aria-expanded', 'true');
        }
        return;
      }
      var editItem = e.target.closest('.tm-card-more-dd__item[data-action="edit"]');
      if (editItem) {
        e.preventDefault();
        e.stopPropagation();
        var card = editItem.closest('.tm-service-card');
        var name = card ? card.getAttribute('data-service') : '';
        closeAllCardMenus();
        window.location.href = 'service_subservices.html?name=' + encodeURIComponent(name || 'Service') + '&from=task_management.html';
        return;
      }
      var hideItem = e.target.closest('.tm-card-more-dd__item[data-action="hide"]');
      if (hideItem) {
        e.preventDefault();
        e.stopPropagation();
        var hideCard = hideItem.closest('.tm-service-card');
        closeAllCardMenus();
        if (hideCard) hideCard.remove();
        var lbl = document.getElementById('cartLabel');
        if (lbl && grid.id === 'cartGrid') {
          var count = grid.querySelectorAll('.tm-service-card').length;
          lbl.textContent = 'MY SERVICES (' + count + ')';
        }
      }
    });
  }

  function renderMasterCards() {
    var grid = document.getElementById('masterGrid'); if (!grid) return;
    var colors = ['tm-service-card--pink', 'tm-service-card--orange', 'tm-service-card--blue', 'tm-service-card--green', 'tm-service-card--teal', 'tm-service-card--yellow', 'tm-service-card--brown', 'tm-service-card--red'];
    grid.innerHTML = MASTER_SERVICES.map(function(name, i) {
      return serviceCardHtml(name, colors[i % colors.length], BADGE_COLORS[i % BADGE_COLORS.length]);
    }).join('');
    bindCardMoreMenu(grid);
  }

  var settingsDD = document.getElementById('settingsDD');
  bindSettingsMenu(settingsDD, document.getElementById('settingsBtn'));
  bindSettingsMenu(document.getElementById('tdSettingsDD'), document.getElementById('tdSettingsBtn'));

  document.addEventListener('click', function(e) {
    if (!e.target.closest('#settingsWrap') && !e.target.closest('#tdSettingsWrap')) closeAllSettingsMenus();
  });

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() { masterMode = false; });
  });

  var templatesModal = document.getElementById('templatesModal');
  var tplPage = 0;
  var tplTrack = document.getElementById('tplTrack');

  function openTemplatesModal() {
    if (!templatesModal) return;
    templatesModal.hidden = false;
    tplPage = 0;
    if (tplTrack) tplTrack.style.transform = 'translateX(0)';
  }
  function closeTemplatesModal() {
    if (templatesModal) templatesModal.hidden = true;
  }
  function goTplPage(dir) {
    tplPage = Math.max(0, Math.min(1, tplPage + dir));
    if (tplTrack) tplTrack.style.transform = 'translateX(-' + (tplPage * 50) + '%)';
  }

  var tplClose = document.getElementById('templatesModalClose');
  var tplPrev = document.getElementById('tplPrev');
  var tplNext = document.getElementById('tplNext');
  var tplScratch = document.getElementById('tplScratch');
  if (tplClose) tplClose.addEventListener('click', closeTemplatesModal);
  if (tplPrev) tplPrev.addEventListener('click', function() { goTplPage(-1); });
  if (tplNext) tplNext.addEventListener('click', function() { goTplPage(1); });
  if (tplScratch) tplScratch.addEventListener('click', closeTemplatesModal);
  if (templatesModal) {
    templatesModal.addEventListener('click', function(e) {
      if (e.target === templatesModal) closeTemplatesModal();
    });
  }

  /* ── Quick Task Add modal ── */
  var quickTaskModal = document.getElementById('quickTaskModal');
  var quickTaskForm = document.getElementById('quickTaskForm');
  var quickTaskName = document.getElementById('quickTaskName');
  var quickTaskCount = document.getElementById('quickTaskCount');
  var quickTaskClose = document.getElementById('quickTaskModalClose');
  var quickTaskOther = document.getElementById('quickTaskOther');

  function openQuickTaskModal() {
    if (!quickTaskModal) return;
    quickTaskModal.hidden = false;
    if (quickTaskName) quickTaskName.focus();
  }
  function closeQuickTaskModal() {
    if (quickTaskModal) quickTaskModal.hidden = true;
  }
  if (quickTaskClose) quickTaskClose.addEventListener('click', closeQuickTaskModal);
  if (quickTaskOther) quickTaskOther.addEventListener('click', function() { window.location.href = 'add_task.html'; });
  if (quickTaskModal) {
    quickTaskModal.addEventListener('click', function(e) {
      if (e.target === quickTaskModal) closeQuickTaskModal();
    });
  }
  if (quickTaskName && quickTaskCount) {
    quickTaskName.addEventListener('input', function() {
      quickTaskCount.textContent = quickTaskName.value.length + ' / 200';
    });
  }
  if (quickTaskForm) {
    quickTaskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      closeQuickTaskModal();
    });
  }

  /* ── Create Task Settings modal ── */
  var taskSettingsModal = document.getElementById('taskSettingsModal');
  var setTabs = document.querySelectorAll('.tm-set-tab');
  var setPanels = document.querySelectorAll('.tm-set-panel');

  function openTaskSettingsModal(tab) {
    if (!taskSettingsModal) return;
    taskSettingsModal.hidden = false;
    switchSetTab(tab || 'reasons');
  }
  function closeTaskSettingsModal() {
    if (taskSettingsModal) taskSettingsModal.hidden = true;
  }
  function switchSetTab(name) {
    setTabs.forEach(function(t) { t.classList.toggle('is-active', t.dataset.setTab === name); });
    setPanels.forEach(function(p) { p.classList.toggle('is-active', p.id === 'setPanel-' + name); });
  }
  setTabs.forEach(function(tab) {
    tab.addEventListener('click', function() { switchSetTab(tab.dataset.setTab); });
  });

  var tsClose = document.getElementById('taskSettingsClose');
  var tsCloseBtn = document.getElementById('taskSettingsCloseBtn');
  var tsSave = document.getElementById('taskSettingsSave');
  if (tsClose) tsClose.addEventListener('click', closeTaskSettingsModal);
  if (tsCloseBtn) tsCloseBtn.addEventListener('click', closeTaskSettingsModal);
  if (tsSave) tsSave.addEventListener('click', closeTaskSettingsModal);
  if (taskSettingsModal) {
    taskSettingsModal.addEventListener('click', function(e) {
      if (e.target === taskSettingsModal) closeTaskSettingsModal();
    });
  }

  function bindTagDelete(container) {
    if (!container) return;
    container.addEventListener('click', function(e) {
      var del = e.target.closest('.tm-set-tag-del');
      if (del) del.closest('.tm-set-tag').remove();
    });
  }
  function addTag(container, text) {
    if (!text.trim() || !container) return;
    var span = document.createElement('span');
    span.className = 'tm-set-tag';
    span.innerHTML = text.trim() + '<button type="button" class="tm-set-tag-del" aria-label="Remove">×</button>';
    container.appendChild(span);
  }
  function bindAddReason(inputId, btnId, tagsId) {
    var input = document.getElementById(inputId);
    var btn = document.getElementById(btnId);
    var tags = document.getElementById(tagsId);
    bindTagDelete(tags);
    if (btn && input && tags) {
      btn.addEventListener('click', function() {
        addTag(tags, input.value); input.value = '';
      });
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); btn.click(); }
      });
    }
  }
  bindAddReason('pendingReasonInput', 'pendingReasonAdd', 'pendingReasonTags');
  bindAddReason('stuckReasonInput', 'stuckReasonAdd', 'stuckReasonTags');
  bindTagDelete(document.getElementById('customStatusTags'));

  var stageInput = document.getElementById('stageNameInput');
  var stageCount = document.getElementById('stageNameCount');
  var stageAdd = document.getElementById('stageNameAdd');
  var stageList = document.getElementById('stageList');
  if (stageInput && stageCount) {
    stageInput.addEventListener('input', function() { stageCount.textContent = stageInput.value.length + ' / 50'; });
  }
  if (stageAdd && stageInput && stageList) {
    stageAdd.addEventListener('click', function() {
      var name = stageInput.value.trim(); if (!name) return;
      var item = document.createElement('div');
      item.className = 'tm-set-stage-item';
      item.innerHTML = '<span class="tm-set-stage-drag" aria-hidden="true">⋮⋮</span><span class="tm-set-stage-name">' + name + '</span><button type="button" class="tm-set-stage-del" aria-label="Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg></button>';
      stageList.appendChild(item);
      stageInput.value = ''; if (stageCount) stageCount.textContent = '0 / 50';
    });
  }
  if (stageList) {
    stageList.addEventListener('click', function(e) {
      var del = e.target.closest('.tm-set-stage-del');
      if (del) del.closest('.tm-set-stage-item').remove();
    });
  }

  var statusInput = document.getElementById('statusNameInput');
  var statusCount = document.getElementById('statusNameCount');
  var statusAdd = document.getElementById('statusNameAdd');
  var statusTags = document.getElementById('customStatusTags');
  if (statusInput && statusCount) {
    statusInput.addEventListener('input', function() { statusCount.textContent = statusInput.value.length + ' / 50'; });
  }
  if (statusAdd && statusInput && statusTags) {
    statusAdd.addEventListener('click', function() {
      addTag(statusTags, statusInput.value);
      statusInput.value = ''; if (statusCount) statusCount.textContent = '0 / 50';
    });
  }

  var quickSettingsBtn = document.querySelector('.tm-quick-settings');
  if (quickSettingsBtn) {
    quickSettingsBtn.addEventListener('click', function() {
      closeQuickTaskModal();
      openTaskSettingsModal('reasons');
    });
  }

  /* ── Table View Data ── */
  var CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
  var EDIT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z"/></svg>';

  // Client groups preview list for "View" popup
  var CLIENT_GROUPS_PREVIEW = ['HUL A', 'Tax Audit', 'GST Filling Monthly', 'LLP', 'ABC Client'];

  var TASKS = [
    { id: 'TSK02488', name: 'Gst Filling 3B', clientName: 'Saksham', clientPhone: '8171082760', clientInitial: 'S', assignee: 'A', assigneeColor: 'blue', invPlus: true, status: 'OPEN', statusColor: 'open', targetDate: '20/08/2026', createdDate: '20/08/2026', createdTime: '12:15 PM', desc: '', descEdit: false, priority: 'Medium', priorityColor: 'medium', stage: 'A', reviewer: 'DA', reviewerColor: 'teal', period: '-- --', service: 'gst f', createdBy: 'DA', createdByColor: 'teal', consultant: 'A', consultantColor: 'blue', subService: 'GST', hasClientGroup: true, hasComments: true },
    { id: 'TSK02487', name: 'GST Appeal', clientName: 'Saksham', clientPhone: '8171082760', clientInitial: 'S', assignee: 'A', assigneeColor: 'blue', invPlus: false, invText: 'Not Allowed', status: 'OPEN', statusColor: 'open', targetDate: '20/08/2026', createdDate: '20/08/2026', createdTime: '11:42 AM', desc: 'Appeal filing docs', descEdit: true, priority: 'Priority', priorityColor: 'priority', stage: 'A', reviewer: 'DA', reviewerColor: 'teal', period: '-- --', service: 'GST Appeal', createdBy: 'DA', createdByColor: 'teal', consultant: '', subService: 'GSTR-3B Filing', hasClientGroup: true, hasComments: true },
    { id: 'TSK02478', name: 'bank audit', clientName: '', clientPhone: '', clientInitial: '', assignee: 'SA', assigneeColor: 'blue', invPlus: false, invText: 'Not Allowed', status: 'OPEN', statusColor: 'open', targetDate: '19/08/2026', createdDate: '19/08/2026', createdTime: '5:41 AM', desc: '', descEdit: false, priority: 'Priority', priorityColor: 'priority', stage: 'A', reviewer: 'DA', reviewerColor: 'teal', period: '-- --', service: 'bank audit Ankit', createdBy: 'DA', createdByColor: 'teal', consultant: '', subService: 'AUDIT', hasClientGroup: false, hasComments: false },
    { id: 'TSK02476', name: 'GST R1', clientName: '', clientPhone: '', clientInitial: '', assignee: 'DA', assigneeColor: 'teal', invPlus: false, invText: 'Not Allowed', status: 'OPEN', statusColor: 'open', targetDate: '19/08/2026', createdDate: '19/08/2026', createdTime: '5:40 AM', desc: '', descEdit: false, priority: 'Medium', priorityColor: 'medium', stage: 'A', reviewer: 'DA', reviewerColor: 'teal', period: '-- --', service: 'gst filling 1', createdBy: 'DA', createdByColor: 'teal', consultant: '', subService: 'GST', hasClientGroup: false, hasComments: false },
    { id: 'TSK02475', name: 'gst-3b', clientName: '', clientPhone: '', clientInitial: '', assignee: 'DA', assigneeColor: 'teal', invPlus: false, invText: 'Not Allowed', status: 'OPEN', statusColor: 'open', targetDate: '19/08/2026', createdDate: '19/08/2026', createdTime: '5:40 AM', desc: 'ok', descEdit: true, priority: 'Priority', priorityColor: 'priority', stage: 'A', reviewer: 'DA', reviewerColor: 'teal', period: '-- --', service: 'GST Filing', createdBy: 'DA', createdByColor: 'teal', consultant: '', subService: 'GSTR-3B Filing', hasClientGroup: false, hasComments: false },
    { id: 'TSK02474', name: 'ITR DEMO', clientName: '', clientPhone: '', clientInitial: '', assignee: 'DA', assigneeColor: 'teal', invPlus: false, invText: 'Not Allowed', status: 'OPEN', statusColor: 'open', targetDate: '19/08/2026', createdDate: '19/08/2026', createdTime: '5:40 AM', desc: '', descEdit: false, priority: 'Priority', priorityColor: 'priority', stage: 'A', reviewer: 'DA', reviewerColor: 'teal', period: '-- --', service: 'ITR', createdBy: 'DA', createdByColor: 'teal', consultant: '', subService: 'ITR', hasClientGroup: false, hasComments: false },
    { id: 'TSK02473', name: 'GSt Registration', clientName: 'Saksham', clientPhone: '8171082760', clientInitial: 'S', assignee: 'DA', assigneeColor: 'teal', invPlus: true, status: 'PROCESSING', statusColor: 'processing', targetDate: '18/08/2026', createdDate: '18/08/2026', createdTime: '6:09 PM', desc: '', descEdit: false, priority: 'Medium', priorityColor: 'medium', stage: 'B', reviewer: 'DA', reviewerColor: 'teal', period: '-- --', service: 'GST License', createdBy: 'DA', createdByColor: 'teal', consultant: 'A', consultantColor: 'blue', subService: 'GST Registration', hasClientGroup: true, hasComments: true },
    { id: 'TSK02470', name: 'GST FILLING', clientName: 'law seva management private limited', clientPhone: '9818092280', clientInitial: 'L', assignee: 'DA', assigneeColor: 'teal', invPlus: true, status: 'PROCESSING', statusColor: 'processing', targetDate: '18/08/2026', createdDate: '18/08/2026', createdTime: '11:13 AM', desc: 'Monthly filing for client', descEdit: true, descMore: true, priority: 'Medium', priorityColor: 'medium', stage: 'A', reviewer: 'DA', reviewerColor: 'teal', period: '-- --', service: 'GST Filing', createdBy: 'DA', createdByColor: 'teal', consultant: '', subService: 'GSTR-3B Filing', hasClientGroup: true, hasComments: true },
    { id: 'TSK02436', name: 'Tax Audit', clientName: 'Saksham', clientPhone: '8171082760', clientInitial: 'S', assignee: 'DA', assigneeColor: 'teal', invPlus: true, status: 'PROCESSING', statusColor: 'processing', targetDate: '13/08/2026', createdDate: '13/08/2026', createdTime: '4:12 PM', desc: '', descEdit: false, priority: 'High', priorityColor: 'high', stage: 'C', reviewer: 'DA', reviewerColor: 'teal', period: '-- --', service: 'Annual Tax audit', createdBy: 'DA', createdByColor: 'teal', consultant: 'A', consultantColor: 'blue', subService: 'Tax Audit', hasClientGroup: true, hasComments: true },
    { id: 'TSK02441', name: 'ITR Filling', clientName: 'Saksham', clientPhone: '8171082760', clientInitial: 'S', assignee: 'DA', assigneeColor: 'teal', invPlus: true, status: 'PROCESSING', statusColor: 'processing', targetDate: '14/08/2026', createdDate: '14/08/2026', createdTime: '3:13 PM', desc: '', descEdit: false, priority: 'Medium', priorityColor: 'medium', stage: 'A', reviewer: 'DA', reviewerColor: 'teal', period: '-- --', service: 'ITR', createdBy: 'DA', createdByColor: 'teal', consultant: '', subService: 'ITR Filing', hasClientGroup: true, hasComments: false }
  ];

  function avatar(initials, color) {
    if (!initials) return '';
    return '<span class="tm-avatar tm-avatar--' + (color || 'blue') + '">' + initials + '</span>';
  }

  function statusBadge(s, cls) {
    return '<span class="tm-status tm-status--' + cls + '">' + s + ' ' + CHEV + '</span>';
  }

  function priorityBadge(label, cls) {
    return '<span class="tm-priority tm-priority--' + cls + '">' + label + ' ' + CHEV + '</span>';
  }

  function clientCellInner(t) {
    if (!t.clientName) return '--';
    return '<div class="tm-client-cell">' +
      '<span class="tm-avatar tm-avatar--client">' + (t.clientInitial || t.clientName.charAt(0).toUpperCase()) + '</span>' +
      '<div class="tm-client-meta"><strong>' + t.clientName + '</strong>' +
      (t.clientPhone ? '<span>' + t.clientPhone + '</span>' : '') + '</div></div>';
  }

  function invCellInner(t) {
    if (t.invPlus) return '<span class="tm-inv-plus">+</span>';
    return '<span class="tm-inv-text">' + (t.invText || 'Not Allowed') + '</span>';
  }

  function descCellInner(t) {
    var html = '';
    if (t.desc) html += '<span class="tm-desc-text">' + t.desc + '</span>';
    if (t.descEdit) html += '<button type="button" class="tm-desc-edit" title="Edit description">' + EDIT_ICON + '</button>';
    if (t.descMore) html += '<a href="#" class="tm-link tm-desc-more">View More</a>';
    return html || '--';
  }

  function renderTable() {
    var tb = document.getElementById('tmTableBody'); if (!tb) return;
    tb.innerHTML = TASKS.map(function(t) {
      return '<tr>' +
        '<td class="tm-td-sticky-left tm-sticky-left--0"><input type="checkbox" class="tm-row-check" aria-label="Select task ' + t.id + '"></td>' +
        '<td class="tm-td-sticky-left tm-sticky-left--1"><a href="#" class="tm-task-id">' + t.id + '</a><span class="tm-task-name">' + t.name + '</span></td>' +
        '<td data-col="client">' + clientCellInner(t) + '</td>' +
        '<td data-col="assignees">' + avatar(t.assignee, t.assigneeColor) + '</td>' +
        '<td data-col="invoiceStatus">' + invCellInner(t) + '</td>' +
        '<td data-col="status">' + statusBadge(t.status, t.statusColor) + '</td>' +
        '<td data-col="targetDate">' + t.targetDate + '</td>' +
        '<td data-col="createdDate"><span class="tm-created-date">' + t.createdDate + '</span><span class="tm-created-time">' + t.createdTime + '</span></td>' +
        '<td data-col="description">' + descCellInner(t) + '</td>' +
        '<td data-col="priority">' + priorityBadge(t.priority, t.priorityColor) + '</td>' +
        '<td data-col="currentStage"><span class="tm-stage">' + t.stage + ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></span></td>' +
        '<td data-col="reviewer">' + avatar(t.reviewer, t.reviewerColor) + '</td>' +
        '<td data-col="period">' + t.period + '</td>' +
        '<td data-col="service">' + t.service + '</td>' +
        '<td data-col="createdBy">' + avatar(t.createdBy, t.createdByColor) + '</td>' +
        '<td data-col="consultant">' + (t.consultant ? avatar(t.consultant, t.consultantColor) : '--') + '</td>' +
        '<td data-col="tags"><button type="button" class="tm-tag-add" title="Add tag">+</button></td>' +
        '<td data-col="clientGroup">' + (t.hasClientGroup ? '<a href="#" class="tm-link tm-view-client-groups" aria-label="View client groups">View</a>' : '--') + '</td>' +
        '<td data-col="comments">' + (t.hasComments ? '<a href="#" class="tm-link tm-view-client-groups" aria-label="View client groups">View</a>' : '--') + '</td>' +
        '<td data-col="lastComment">--</td>' +
        '<td data-col="followers">--</td>' +
        '<td data-col="subService">' + t.subService + '</td>' +
        '<td data-col="authorisedSignatory">--</td>' +
        '<td data-col="dueDate">--</td>' +
        '<td data-col="lastCompleteStage">--</td>' +
        '<td class="tm-td-actions tm-td-sticky-right"><div class="tm-row-actions-wrap">' +
          '<button type="button" class="tm-row-more" title="More actions" aria-label="More actions" data-task="' + t.id + '">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.75"/><circle cx="12" cy="12" r="1.75"/><circle cx="19" cy="12" r="1.75"/></svg>' +
          '</button>' +
          '<ul class="tm-row-dd" role="menu">' +
            '<li data-action="linked">Linked</li>' +
            '<li data-action="whatsapp">WhatsApp</li>' +
            '<li class="is-disabled" data-action="email">Email</li>' +
            '<li data-action="download">Download</li>' +
            '<li data-action="recurring">Mark as recurring</li>' +
            '<li data-action="edit">Edit</li>' +
            '<li data-action="duplicate">Duplicate</li>' +
            '<li class="text-red" data-action="delete">Delete</li>' +
          '</ul>' +
        '</div></td>' +
        '</tr>';
    }).join('');
    applyColumnVisibility();
    syncRowSelection();
  }

  /* ── Select all / row checkboxes ── */
  function rowChecks() {
    return Array.prototype.slice.call(document.querySelectorAll('#tmTableBody .tm-row-check'));
  }

  function syncRowSelection() {
    var checks = rowChecks();
    var checked = checks.filter(function (el) { return el.checked; });
    var checkAll = document.getElementById('tmCheckAll');
    checks.forEach(function (el) {
      var tr = el.closest('tr');
      if (tr) tr.classList.toggle('is-selected', el.checked);
    });
    if (!checkAll) return;
    checkAll.checked = checks.length > 0 && checked.length === checks.length;
    checkAll.indeterminate = checked.length > 0 && checked.length < checks.length;
  }

  (function initRowSelection() {
    var checkAll = document.getElementById('tmCheckAll');
    var tbody = document.getElementById('tmTableBody');
    if (checkAll) {
      checkAll.addEventListener('change', function () {
        var on = checkAll.checked;
        rowChecks().forEach(function (el) { el.checked = on; });
        checkAll.indeterminate = false;
        syncRowSelection();
      });
    }
    if (tbody) {
      tbody.addEventListener('change', function (e) {
        if (e.target && e.target.classList.contains('tm-row-check')) syncRowSelection();
      });
    }
  })();

  /* ── Columns picker ── */
  var COLUMN_DEFS = [
    { key: 'client', label: 'Client', visible: true },
    { key: 'assignees', label: 'Assignees', visible: true },
    { key: 'invoiceStatus', label: 'Invoice Status', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'targetDate', label: 'Target Date', visible: true },
    { key: 'createdDate', label: 'Created Date', visible: true },
    { key: 'description', label: 'Description', visible: true },
    { key: 'priority', label: 'Priority', visible: true },
    { key: 'currentStage', label: 'Current Stage', visible: true },
    { key: 'reviewer', label: 'Reviewer', visible: true },
    { key: 'period', label: 'Period', visible: true },
    { key: 'service', label: 'Service', visible: true },
    { key: 'createdBy', label: 'Created By', visible: true },
    { key: 'consultant', label: 'Consultant', visible: true },
    { key: 'tags', label: 'Tags', visible: true },
    { key: 'clientGroup', label: 'Client Group', visible: true },
    { key: 'comments', label: 'Comments', visible: true },
    { key: 'lastComment', label: 'Last Comment', visible: true },
    { key: 'followers', label: 'Followers', visible: true },
    { key: 'subService', label: 'Sub Service', visible: true },
    { key: 'authorisedSignatory', label: 'Authorised Signatory Name', visible: false },
    { key: 'dueDate', label: 'Due Date', visible: false },
    { key: 'lastCompleteStage', label: 'Last Complete Stage', visible: true }
  ];

  function applyColumnVisibility() {
    COLUMN_DEFS.forEach(function(col) {
      document.querySelectorAll('#tmTable [data-col="' + col.key + '"]').forEach(function(el) {
        el.classList.toggle('is-col-hidden', !col.visible);
      });
    });
  }

  function renderColumnsList() {
    var list = document.getElementById('colsList'); if (!list) return;
    list.innerHTML = COLUMN_DEFS.map(function(col) {
      return '<li class="tm-cols-dd__item" data-key="' + col.key + '">' +
        '<span class="tm-cols-dd__grip" aria-hidden="true"></span>' +
        '<input type="checkbox" class="tm-cols-dd__check" ' + (col.visible ? 'checked' : '') + '>' +
        '<span class="tm-cols-dd__label">' + col.label + '</span></li>';
    }).join('');
  }

  function updateSelectAllLabel() {
    var btn = document.getElementById('colsSelectAll'); if (!btn) return;
    var allOn = COLUMN_DEFS.every(function(c) { return c.visible; });
    btn.textContent = allOn ? 'Deselect All' : 'Select All';
  }

  var colsBtn = document.getElementById('colsBtn');
  var colsDD = document.getElementById('colsDD');
  var colsWrap = document.getElementById('colsWrap');

  function positionColumnsDropdown() {
    if (!colsDD || !colsBtn) return;
    colsDD.hidden = false;
    var rect = colsBtn.getBoundingClientRect();
    var popW = colsDD.offsetWidth || 280;
    var popH = colsDD.offsetHeight || 320;
    var gap = 10;
    var left = rect.right - popW + 8;
    left = Math.max(12, Math.min(left, window.innerWidth - popW - 12));
    var top = rect.top - popH - gap;
    if (top < 12) {
      top = rect.bottom + gap;
      colsDD.classList.add('is-below');
    } else {
      colsDD.classList.remove('is-below');
    }
    colsDD.style.left = left + 'px';
    colsDD.style.top = top + 'px';
    var arrowLeft = rect.left + rect.width / 2 - left;
    colsDD.style.setProperty('--tm-cols-arrow-x', arrowLeft + 'px');
  }

  function openColumns() {
    if (!colsDD || !colsBtn) return;
    if (colsDD.parentElement !== document.body) document.body.appendChild(colsDD);
    positionColumnsDropdown();
    colsBtn.classList.add('is-active');
    colsBtn.setAttribute('aria-expanded', 'true');
  }
  function closeColumns() {
    if (!colsDD || !colsBtn) return;
    colsDD.hidden = true;
    colsDD.classList.remove('is-below');
    colsBtn.classList.remove('is-active');
    colsBtn.setAttribute('aria-expanded', 'false');
  }

  if (colsBtn && colsDD) {
    renderColumnsList();
    updateSelectAllLabel();
    colsBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (colsDD.hidden) openColumns(); else closeColumns();
    });
    colsDD.addEventListener('click', function(e) {
      e.stopPropagation();
      var item = e.target.closest('.tm-cols-dd__item');
      if (!item || e.target.classList.contains('tm-cols-dd__check') || e.target.classList.contains('tm-cols-dd__grip')) return;
      var check = item.querySelector('.tm-cols-dd__check');
      if (!check) return;
      check.checked = !check.checked;
      check.dispatchEvent(new Event('change', { bubbles: true }));
    });
    colsDD.addEventListener('change', function(e) {
      var check = e.target.closest('.tm-cols-dd__check');
      if (!check) return;
      var item = check.closest('.tm-cols-dd__item');
      if (!item) return;
      var key = item.getAttribute('data-key');
      var col = COLUMN_DEFS.find(function(c) { return c.key === key; });
      if (!col) return;
      col.visible = check.checked;
      applyColumnVisibility();
      updateSelectAllLabel();
    });
    var selectAllBtn = document.getElementById('colsSelectAll');
    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        var allOn = COLUMN_DEFS.every(function(c) { return c.visible; });
        COLUMN_DEFS.forEach(function(c) { c.visible = !allOn; });
        renderColumnsList();
        applyColumnVisibility();
        updateSelectAllLabel();
      });
    }
    document.addEventListener('click', function(e) {
      if (!colsWrap || colsWrap.contains(e.target) || colsDD.contains(e.target)) return;
      closeColumns();
    });
    window.addEventListener('resize', closeColumns);
    window.addEventListener('scroll', closeColumns, true);
  }

  renderTable();

  /* ── Reports chart toggle ── */
  var REPORTS_MAX = 600;
  var REPORTS_DATA = [
    { label: '04/2026', total: 185, segments: [
      { cls: 'open', value: 98 }, { cls: 'processing', value: 42 }, { cls: 'stuck', value: 18 },
      { cls: 'completed', value: 15 }, { cls: 'review', value: 8 }, { cls: 'deleted', value: 4 }
    ]},
    { label: '05/2026', total: 224, segments: [
      { cls: 'open', value: 112 }, { cls: 'processing', value: 48 }, { cls: 'stuck', value: 22 },
      { cls: 'completed', value: 20 }, { cls: 'review', value: 14 }, { cls: 'deleted', value: 8 }
    ]},
    { label: '06/2026', total: 254, segments: [
      { cls: 'open', value: 120 }, { cls: 'processing', value: 55 }, { cls: 'stuck', value: 28 },
      { cls: 'completed', value: 24 }, { cls: 'review', value: 18 }, { cls: 'deleted', value: 9 }
    ]},
    { label: '07/2026', total: 534, segments: [
      { cls: 'open', value: 245 }, { cls: 'processing', value: 118 }, { cls: 'stuck', value: 52 },
      { cls: 'completed', value: 58 }, { cls: 'review', value: 38 }, { cls: 'deleted', value: 23 }
    ]},
    { label: '08/2026', total: 207, segments: [
      { cls: 'open', value: 95 }, { cls: 'processing', value: 44 }, { cls: 'stuck', value: 20 },
      { cls: 'completed', value: 22 }, { cls: 'review', value: 16 }, { cls: 'deleted', value: 10 }
    ]}
  ];

  function renderReportsChart() {
    var chart = document.getElementById('reportsChart'); if (!chart) return;
    chart.innerHTML = REPORTS_DATA.map(function(bar) {
      var segs = bar.segments.map(function(s) {
        var h = Math.max(12, (s.value / REPORTS_MAX) * 220);
        return '<div class="tm-reports-bar-seg tm-reports-bar-seg--' + s.cls + '" style="height:' + h + 'px">' + s.value + '</div>';
      }).join('');
      return '<div class="tm-reports-bar-col">' +
        '<span class="tm-reports-bar-total">' + bar.total + '</span>' +
        '<div class="tm-reports-bar-stack">' + segs + '</div>' +
        '<span class="tm-reports-bar-label">' + bar.label + '</span></div>';
    }).join('');
  }

  var reportsBtn = document.getElementById('reportsBtn');
  var reportsPanel = document.getElementById('reportsPanel');
  function toggleReports() {
    if (!reportsBtn || !reportsPanel) return;
    var open = reportsPanel.hidden;
    reportsPanel.hidden = !open;
    reportsBtn.classList.toggle('is-active', open);
    reportsBtn.setAttribute('aria-pressed', open ? 'true' : 'false');
    if (open) renderReportsChart();
  }
  if (reportsBtn) reportsBtn.addEventListener('click', toggleReports);

  /* ── Client groups popup ── */
  var clientGroupsModal = document.getElementById('clientGroupsModal');
  var clientGroupsClose = document.getElementById('clientGroupsClose');
  var clientGroupsList = document.getElementById('clientGroupsList');

  function renderClientGroupsPreview() {
    if (!clientGroupsList) return;
    clientGroupsList.innerHTML = CLIENT_GROUPS_PREVIEW.map(function(name) {
      return '<div class="tm-client-group-chip">' + name + '</div>';
    }).join('');
  }
  function openClientGroupsModal() {
    if (!clientGroupsModal) return;
    renderClientGroupsPreview();
    clientGroupsModal.hidden = false;
  }
  function closeClientGroupsModal() {
    if (clientGroupsModal) clientGroupsModal.hidden = true;
  }
  if (clientGroupsClose) clientGroupsClose.addEventListener('click', closeClientGroupsModal);
  if (clientGroupsModal) {
    clientGroupsModal.addEventListener('click', function(e) {
      if (e.target === clientGroupsModal) closeClientGroupsModal();
    });
  }

  function closeAllRowMenus() {
    document.querySelectorAll('.tm-row-dd.is-open').forEach(function(dd) { dd.classList.remove('is-open'); });
    document.querySelectorAll('.tm-row-more.is-open').forEach(function(btn) { btn.classList.remove('is-open'); });
  }

  var tableBody = document.getElementById('tmTableBody');
  if (tableBody) {
    tableBody.addEventListener('click', function(e) {
      var btn = e.target.closest('.tm-row-more');
      if (btn) {
        e.stopPropagation();
        var wrap = btn.closest('.tm-row-actions-wrap');
        var dd = wrap ? wrap.querySelector('.tm-row-dd') : null;
        var wasOpen = dd && dd.classList.contains('is-open');
        closeAllRowMenus();
        if (dd && !wasOpen) { dd.classList.add('is-open'); btn.classList.add('is-open'); }
        return;
      }
      var view = e.target.closest('.tm-view-client-groups');
      if (view) {
        e.preventDefault();
        e.stopPropagation();
        openClientGroupsModal();
        return;
      }
      var item = e.target.closest('.tm-row-dd li');
      if (item) {
        e.stopPropagation();
        if (item.classList.contains('is-disabled')) return;
        closeAllRowMenus();
      }
    });
  }
  document.addEventListener('click', function() { closeAllRowMenus(); closeAllCardMenus(); });

  /* ── Dashboard filter tags ── */
  document.querySelectorAll('.td-tag').forEach(function(tag) {
    tag.addEventListener('click', function() {
      document.querySelectorAll('.td-tag').forEach(function(t) { t.classList.remove('is-active'); });
      tag.classList.add('is-active');
    });
  });

  /* ── Cart View ── */
  var CARD_COLORS = ['','','','','tm-service-card--red','','tm-service-card--orange','tm-service-card--blue','','','tm-service-card--pink','','','tm-service-card--brown','','','tm-service-card--green','tm-service-card--teal','','','','','','tm-service-card--yellow'];

  var ALL_SERVICES = ['24G Return','Accounting','AD Code','Annual Tax audit','Assurance','Audit','AUDIT-22','Bank','bank audit Ankit','Book Keeping','CIVIL WORK','Closure of Company','DSC – Digital Sig...','GEM Registration','GST Filing','gst filling Ankit','GST License','Incorporation – NGO','Incorporation of ...','I.P.R (Intellectu...','ITR','Miscellaneous','MSME - Udyam Regi...','UDYOG AADHAAR – MSME'];
  var REVIEW_SERVICES = ['24G Return','Accounting','Annual Tax audit','Assurance','Audit','AUDIT-22','Bank','bank audit Ankit','Book Keeping','CIVIL WORK','Closure of Company','GEM Registration','GST Filing','gst filling Ankit','GST License','Incorporation – NGO','Incorporation of ...','ITR'];
  var CONSULTANT_SERVICES = ['Audit','Book Keeping','GST Filing','GST License','I.P.R (Intellectu...'];
  var OVERDUE_SERVICES = ['24G Return','Accounting','Accounting 100','Account Review','AD Code','Annual Tax audit','Audit','AUDIT','AUDIT-22','Audit 1000','Audit Work','Bank','Bank Audit 2','bank audit Ankit','CA Certificate','CASH FLOW MGT','Company Audit','DPR Project Prepr...','Drug Licence','Due Deligence Report'];
  var INV_PENDING_SERVICES = ['Annual Tax audit','Audit','AUDIT','Bank','Book Keeping','FSSAI - Food License','GST Filing','GST License','Incorporation of ...','I.P.R (Intellectu...','ITR','Miscellaneous','MSME - Udyam Regi...','TDS FILING'];

  function renderCards(services, label) {
    var grid = document.getElementById('cartGrid');
    var lbl = document.getElementById('cartLabel');
    if (!grid) return;
    lbl.textContent = 'MY SERVICES (' + services.length + ')';
    grid.innerHTML = services.map(function(svc, i) {
      var cardColor = CARD_COLORS[i % CARD_COLORS.length];
      return serviceCardHtml(svc, cardColor, BADGE_COLORS[i % BADGE_COLORS.length]);
    }).join('');
    bindCardMoreMenu(grid);
  }

  var cartTabs = document.querySelectorAll('.tm-cart-tab');
  cartTabs.forEach(function(ct) {
    ct.addEventListener('click', function() {
      cartTabs.forEach(function(t) { t.classList.remove('is-active'); });
      ct.classList.add('is-active');
      var key = ct.dataset.cart;
      if (key === 'review') renderCards(REVIEW_SERVICES, 'REVIEW');
      else if (key === 'consultant') renderCards(CONSULTANT_SERVICES, 'CONSULTANT');
      else if (key === 'overdue') renderCards(OVERDUE_SERVICES, 'OVERDUE');
      else if (key === 'inv-pending') renderCards(INV_PENDING_SERVICES, 'INV PENDING');
      else renderCards(ALL_SERVICES, 'ALL MY TASKS');
    });
  });

  // Render cart on tab switch
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      if (tab.dataset.tab === 'cart') {
        var active = document.querySelector('.tm-cart-tab.is-active');
        if (active) active.click();
        else renderCards(ALL_SERVICES, 'ALL MY TASKS');
      }
    });
  });

  // Initial cart render
  renderCards(ALL_SERVICES, 'ALL MY TASKS');

  /* ── Dashboard report accordions ── */
  function bindDashboardAccordion(btnId, panelId) {
    var btn = document.getElementById(btnId);
    var panel = document.getElementById(panelId);
    if (!btn || !panel) return;
    btn.addEventListener('click', function() {
      var open = panel.hidden;
      panel.hidden = !open;
      btn.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  bindDashboardAccordion('tdAccPeriod', 'tdAccPeriodPanel');
  bindDashboardAccordion('tdAccUserDue', 'tdAccUserDuePanel');

  if (global.PmDashboardStats && global.PmDashboardStats.syncTaskDashboard) {
    global.PmDashboardStats.syncTaskDashboard('all', '15days');
  }

})();
