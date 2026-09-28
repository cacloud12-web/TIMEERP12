/**
 * Shared Project Management dashboard stats (Home + Task Management)
 */
(function (global) {
  'use strict';

  var DATE_RANGES = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'Last week' },
    { id: '15days', label: 'Last 15 Days' },
    { id: 'month', label: 'Last Month' },
    { id: 'quarter', label: 'Last Quater' },
    { id: 'half', label: 'Last Half Year' },
    { id: 'year', label: 'Last Year' },
    { id: 'custom', label: 'Custom' }
  ];

  var STATS = {
    all: {
      '15days': { open: 32, dueToday: 2, processing: 26, weekly: 64, review: 0, overdue: 253, completed: 12, stuck: 0 },
      custom: { open: 38, dueToday: 2, processing: 26, weekly: 70, review: 0, overdue: 253, completed: 12, stuck: 0 },
      today: { open: 4, dueToday: 2, processing: 3, weekly: 8, review: 0, overdue: 12, completed: 1, stuck: 0 },
      week: { open: 18, dueToday: 2, processing: 14, weekly: 42, review: 0, overdue: 89, completed: 6, stuck: 0 },
      month: { open: 45, dueToday: 2, processing: 31, weekly: 88, review: 2, overdue: 268, completed: 18, stuck: 1 },
      quarter: { open: 62, dueToday: 2, processing: 38, weekly: 102, review: 3, overdue: 290, completed: 24, stuck: 1 },
      half: { open: 78, dueToday: 2, processing: 44, weekly: 118, review: 4, overdue: 310, completed: 31, stuck: 1 },
      year: { open: 99, dueToday: 2, processing: 52, weekly: 140, review: 5, overdue: 330, completed: 42, stuck: 1 }
    },
    caram: {
      '15days': { open: 6, dueToday: 0, processing: 4, weekly: 11, review: 0, overdue: 18, completed: 5, stuck: 0 },
      custom: { open: 8, dueToday: 0, processing: 5, weekly: 14, review: 0, overdue: 22, completed: 6, stuck: 0 },
      today: { open: 1, dueToday: 0, processing: 1, weekly: 2, review: 0, overdue: 3, completed: 0, stuck: 0 },
      week: { open: 4, dueToday: 0, processing: 3, weekly: 7, review: 0, overdue: 9, completed: 2, stuck: 0 },
      month: { open: 10, dueToday: 0, processing: 6, weekly: 16, review: 0, overdue: 28, completed: 7, stuck: 0 },
      quarter: { open: 14, dueToday: 0, processing: 8, weekly: 20, review: 1, overdue: 35, completed: 9, stuck: 0 },
      half: { open: 18, dueToday: 0, processing: 10, weekly: 24, review: 1, overdue: 40, completed: 11, stuck: 0 },
      year: { open: 22, dueToday: 0, processing: 12, weekly: 28, review: 1, overdue: 48, completed: 14, stuck: 0 }
    },
    suhanshi: {
      '15days': { open: 9, dueToday: 1, processing: 7, weekly: 18, review: 0, overdue: 45, completed: 3, stuck: 0 },
      custom: { open: 11, dueToday: 1, processing: 8, weekly: 21, review: 0, overdue: 52, completed: 4, stuck: 0 },
      today: { open: 2, dueToday: 1, processing: 1, weekly: 3, review: 0, overdue: 4, completed: 0, stuck: 0 },
      week: { open: 5, dueToday: 1, processing: 4, weekly: 10, review: 0, overdue: 15, completed: 1, stuck: 0 },
      month: { open: 12, dueToday: 1, processing: 9, weekly: 24, review: 0, overdue: 58, completed: 5, stuck: 0 },
      quarter: { open: 16, dueToday: 1, processing: 11, weekly: 30, review: 1, overdue: 65, completed: 7, stuck: 0 },
      half: { open: 20, dueToday: 1, processing: 13, weekly: 36, review: 1, overdue: 72, completed: 8, stuck: 0 },
      year: { open: 24, dueToday: 1, processing: 15, weekly: 42, review: 1, overdue: 80, completed: 10, stuck: 0 }
    },
    tarun: {
      '15days': { open: 5, dueToday: 0, processing: 4, weekly: 9, review: 0, overdue: 14, completed: 2, stuck: 0 },
      custom: { open: 7, dueToday: 0, processing: 5, weekly: 11, review: 0, overdue: 18, completed: 3, stuck: 0 },
      today: { open: 1, dueToday: 0, processing: 1, weekly: 2, review: 0, overdue: 2, completed: 0, stuck: 0 },
      week: { open: 3, dueToday: 0, processing: 2, weekly: 6, review: 0, overdue: 8, completed: 1, stuck: 0 },
      month: { open: 8, dueToday: 0, processing: 6, weekly: 14, review: 0, overdue: 22, completed: 4, stuck: 0 },
      quarter: { open: 11, dueToday: 0, processing: 7, weekly: 17, review: 0, overdue: 28, completed: 5, stuck: 0 },
      half: { open: 14, dueToday: 0, processing: 9, weekly: 20, review: 0, overdue: 32, completed: 6, stuck: 0 },
      year: { open: 17, dueToday: 0, processing: 10, weekly: 24, review: 0, overdue: 38, completed: 7, stuck: 0 }
    }
  };

  var DEFAULT_EMPLOYEE = 'all';
  var DEFAULT_RANGE = '15days';

  var STAT_LABELS = [
    { key: 'open', label: 'Open Task' },
    { key: 'dueToday', label: 'Due Today' },
    { key: 'processing', label: 'Processing' },
    { key: 'weekly', label: 'Weekly Due' },
    { key: 'review', label: 'Under Review' },
    { key: 'overdue', label: 'Over Due' },
    { key: 'completed', label: 'Completed' },
    { key: 'stuck', label: 'Stuck' }
  ];

  function getStats(employeeId, rangeId) {
    var emp = STATS[employeeId] || STATS.all;
    var range = rangeId || DEFAULT_RANGE;
    var row = emp[range] || STATS.all[range] || STATS.all[DEFAULT_RANGE];
    return {
      open: row.open,
      dueToday: row.dueToday,
      processing: row.processing,
      weekly: row.weekly,
      review: row.review,
      overdue: row.overdue,
      completed: row.completed,
      stuck: row.stuck
    };
  }

  function getDateRangeLabel(rangeId) {
    for (var i = 0; i < DATE_RANGES.length; i++) {
      if (DATE_RANGES[i].id === rangeId) return DATE_RANGES[i].label;
    }
    return 'Last 15 Days';
  }

  function customRangeLabel() {
    var d = new Date();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var end = pad(d.getDate()) + '-' + pad(d.getMonth() + 1) + '-' + String(d.getFullYear()).slice(-2);
    var start = new Date(d);
    start.setDate(start.getDate() - 15);
    var startStr = pad(start.getDate()) + '-' + pad(start.getMonth() + 1) + '-' + String(start.getFullYear()).slice(-2);
    return startStr + ' \u2014 ' + end;
  }

  var STAT_ICON_TYPES = {
    open: 'open',
    dueToday: 'due',
    processing: 'processing',
    weekly: 'weekly',
    review: 'review',
    overdue: 'overdue',
    completed: 'completed',
    stuck: 'stuck'
  };

  function iconTypeForKey(key) {
    return STAT_ICON_TYPES[key] || key;
  }

  function statIconSvg(type) {
    var icons = {
      open: '<svg viewBox="0 0 20 20" fill="none"><path d="M10 4C5 4 2 10 2 10s3 6 8 6 8-6 8-6-3-6-8-6z" stroke="currentColor" stroke-width="1.4"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.4"/><circle cx="10" cy="10" r="1" fill="currentColor"/></svg>',
      processing: '<svg viewBox="0 0 20 20" fill="none"><circle cx="5" cy="10" r="2.2" stroke="currentColor" stroke-width="1.4"/><circle cx="15" cy="5" r="2.2" stroke="currentColor" stroke-width="1.4"/><circle cx="15" cy="15" r="2.2" stroke="currentColor" stroke-width="1.4"/><path d="M7 9l6-3M7 11l6 3" stroke="currentColor" stroke-width="1.3"/></svg>',
      review: '<svg viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="7" y="11" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.4"/><path d="M9 6h0M13 6h0M10 14h0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
      completed: '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.4"/><path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      due: '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.4"/><path d="M10 6v4l3 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
      weekly: '<svg viewBox="0 0 20 20" fill="none"><rect x="4" y="3" width="12" height="14" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M7 3V2M13 3V2M4 7h12" stroke="currentColor" stroke-width="1.3"/><path d="M7 11l2 2 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      overdue: '<svg viewBox="0 0 20 20" fill="none"><path d="M10 4l7 12H3L10 4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M10 9v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="14" r=".8" fill="currentColor"/></svg>',
      stuck: '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.4"/><path d="M6.5 6.5l7 7M13.5 6.5l-7 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
    };
    return icons[type] || '';
  }

  function formatKanbanCount(n) {
    return n > 99 ? '99+' : String(n);
  }

  function syncTaskDashboard(employeeId, rangeId) {
    if (typeof document === 'undefined') return;
    var s = getStats(employeeId || DEFAULT_EMPLOYEE, rangeId || DEFAULT_RANGE);

    STAT_LABELS.forEach(function (item) {
      document.querySelectorAll('[data-pm-stat="' + item.key + '"]').forEach(function (el) {
        el.textContent = s[item.key];
      });
    });

    var kanbanKeys = ['open', 'processing', 'review', 'stuck', 'completed'];
    kanbanKeys.forEach(function (key) {
      document.querySelectorAll('[data-pm-kanban="' + key + '"]').forEach(function (el) {
        el.textContent = formatKanbanCount(s[key]);
      });
    });

    var dueMap = {
      dueToday: s.dueToday,
      weekly: s.weekly,
      overdue: s.overdue
    };
    Object.keys(dueMap).forEach(function (key) {
      document.querySelectorAll('[data-pm-due="' + key + '"]').forEach(function (el) {
        el.textContent = dueMap[key];
      });
    });
  }

  global.PmDashboardStats = {
    DATE_RANGES: DATE_RANGES,
    STAT_LABELS: STAT_LABELS,
    STAT_ICON_TYPES: STAT_ICON_TYPES,
    DEFAULT_EMPLOYEE: DEFAULT_EMPLOYEE,
    DEFAULT_RANGE: DEFAULT_RANGE,
    getStats: getStats,
    getDateRangeLabel: getDateRangeLabel,
    customRangeLabel: customRangeLabel,
    iconTypeForKey: iconTypeForKey,
    statIconSvg: statIconSvg,
    syncTaskDashboard: syncTaskDashboard,
    formatKanbanCount: formatKanbanCount
  };
})(typeof window !== 'undefined' ? window : this);
