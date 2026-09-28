/**
 * Shared PM stats panel (Home + Task Management dashboard)
 */
(function (global) {
  'use strict';

  var USER_NAME = 'Ca Ram Kumar';

  var DEFAULT_EMPLOYEES = [
    { group: 'Employees' },
    { id: 'all', label: 'All' },
    { id: 'suhanshi', label: 'Suhanshi Rawat' },
    { id: 'tarun', label: 'Tarun Gaur' },
    { id: 'caram', label: USER_NAME }
  ];

  function esc(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function dateLabelForRange(rangeId, pm) {
    if (rangeId === 'custom') return pm.customRangeLabel();
    return pm.getDateRangeLabel(rangeId);
  }

  function getEmployeeLabel(id, employees) {
    for (var i = 0; i < employees.length; i++) {
      if (employees[i].id === id) return employees[i].label;
    }
    return 'All';
  }

  function statCell(pm, type, label, val, statKey) {
    return '<button type="button" class="hd-stat" data-pm-stat="' + esc(statKey || type) + '">' +
      '<span class="hd-stat__icon hd-stat__icon--' + type + '">' + pm.statIconSvg(type) + '</span>' +
      '<span class="hd-stat__label">' + esc(label) + '</span>' +
      '<span class="hd-stat__val">' + val + '</span>' +
    '</button>';
  }

  function render(root, state, employees, pm) {
    var s = pm.getStats(state.employeeFilter, state.dateRange);
    var labels = pm.STAT_LABELS;
    root.innerHTML =
      '<div class="hd-stats__filters">' +
        '<div class="hd-stats__combo" data-pm-emp-combo>' +
          '<button type="button" class="hd-stats__combo-btn" data-pm-emp-btn>' +
            esc(state.employeeFilter === 'all' ? 'All' : getEmployeeLabel(state.employeeFilter, employees)) +
          '</button>' +
          '<div class="hd-stats__dropdown" data-pm-emp-drop>' +
            '<div class="hd-stats__search"><input type="search" data-pm-emp-search placeholder="All" autocomplete="off"></div>' +
            '<div data-pm-emp-list></div>' +
          '</div>' +
        '</div>' +
        '<div class="hd-stats__combo hd-stats__combo--date" data-pm-date-combo>' +
          '<button type="button" class="hd-stats__combo-btn" data-pm-date-btn>' + esc(state.dateLabel) + '</button>' +
          '<div class="hd-stats__dropdown" data-pm-date-drop><div data-pm-date-list></div></div>' +
        '</div>' +
      '</div>' +
      '<div class="hd-stats__grid">' +
        labels.map(function (item) {
          return statCell(pm, pm.iconTypeForKey(item.key), item.label, s[item.key], item.key);
        }).join('') +
      '</div>';
  }

  function renderEmpList(root, state, employees, filter) {
    var list = root.querySelector('[data-pm-emp-list]');
    if (!list) return;
    var q = (filter || '').toLowerCase();
    list.innerHTML = employees.filter(function (e) {
      if (e.group) return true;
      if (!q) return true;
      return (e.label || '').toLowerCase().indexOf(q) !== -1;
    }).map(function (e) {
      if (e.group) return '<div class="hd-stats__opt-group">' + esc(e.group) + '</div>';
      return '<button type="button" class="hd-stats__opt' + (state.employeeFilter === e.id ? ' is-active' : '') +
        '" data-pm-emp="' + esc(e.id) + '">' + esc(e.label) + '</button>';
    }).join('');
  }

  function renderDateList(root, state, pm) {
    var list = root.querySelector('[data-pm-date-list]');
    if (!list) return;
    list.innerHTML = pm.DATE_RANGES.map(function (r) {
      var label = r.id === 'custom' ? dateLabelForRange('custom', pm) : r.label;
      return '<button type="button" class="hd-stats__opt' + (state.dateRange === r.id ? ' is-active' : '') +
        '" data-pm-date="' + esc(r.id) + '">' + esc(label) + '</button>';
    }).join('');
  }

  function mount(container, options) {
    var el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el || !global.PmDashboardStats) return null;

    var pm = global.PmDashboardStats;
    var employees = (options && options.employees) || DEFAULT_EMPLOYEES;
    var state = {
      employeeFilter: (options && options.employeeFilter) || pm.DEFAULT_EMPLOYEE,
      dateRange: (options && options.dateRange) || pm.DEFAULT_RANGE,
      dateLabel: dateLabelForRange((options && options.dateRange) || pm.DEFAULT_RANGE, pm)
    };

    function refresh() {
      render(el, state, employees, pm);
      renderEmpList(el, state, employees, '');
      renderDateList(el, state, pm);
      bind(el);
    }

    function bind(root) {
      var empCombo = root.querySelector('[data-pm-emp-combo]');
      var dateCombo = root.querySelector('[data-pm-date-combo]');
      var empSearch = root.querySelector('[data-pm-emp-search]');

      root.addEventListener('click', function (e) {
        var empBtn = e.target.closest('[data-pm-emp-btn]');
        if (empBtn) {
          e.stopPropagation();
          if (dateCombo) dateCombo.classList.remove('is-open');
          empCombo.classList.toggle('is-open');
          return;
        }
        var dateBtn = e.target.closest('[data-pm-date-btn]');
        if (dateBtn) {
          e.stopPropagation();
          if (empCombo) empCombo.classList.remove('is-open');
          dateCombo.classList.toggle('is-open');
          return;
        }
        var empOpt = e.target.closest('[data-pm-emp]');
        if (empOpt) {
          state.employeeFilter = empOpt.getAttribute('data-pm-emp');
          empCombo.classList.remove('is-open');
          refresh();
          return;
        }
        var dateOpt = e.target.closest('[data-pm-date]');
        if (dateOpt) {
          state.dateRange = dateOpt.getAttribute('data-pm-date');
          state.dateLabel = dateLabelForRange(state.dateRange, pm);
          dateCombo.classList.remove('is-open');
          refresh();
          return;
        }
        if (!e.target.closest('[data-pm-emp-combo]') && empCombo) empCombo.classList.remove('is-open');
        if (!e.target.closest('[data-pm-date-combo]') && dateCombo) dateCombo.classList.remove('is-open');
      });

      if (empSearch) {
        empSearch.addEventListener('input', function () {
          renderEmpList(root, state, employees, empSearch.value);
        });
      }
    }

    el.classList.add('hd-stats');
    refresh();
    return { getState: function () { return state; }, refresh: refresh };
  }

  global.PmStatsWidget = { mount: mount };
})(typeof window !== 'undefined' ? window : this);
