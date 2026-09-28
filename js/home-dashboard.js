/**
 * TimeERP — Home Dashboard
 * Matches CA Cloud Desk dashboard layout; uses brand teal #25b7a7
 */
(function (global) {
  'use strict';

  var USER_NAME = 'Ca Ram Kumar';
  var ORG_NAME = 'TimeErp Demo';
  var PAGE_SIZE = 5;

  var TASK_TABS = [
    { id: 'processing', label: 'Processing' },
    { id: 'open', label: 'Open' },
    { id: 'finalized', label: 'Finalized for Submission' },
    { id: 'overdue', label: 'Overdue' },
    { id: 'stuck', label: 'Stuck' },
    { id: 'completed', label: 'Completed' },
    { id: 'consultation', label: 'Under Consultation' }
  ];

  var REVIEWER_TABS = [
    { id: 'processing', label: 'Processing' },
    { id: 'open', label: 'Open' },
    { id: 'overdue', label: 'Overdue' },
    { id: 'stuck', label: 'Stuck' },
    { id: 'completed', label: 'Completed' },
    { id: 'consultation', label: 'Under Consultation' },
    { id: 'finalized', label: 'Finalized for Submission' }
  ];

  var EMPLOYEES = [
    { id: 'all', label: 'All' },
    { group: 'Employees' },
    { id: 'tarun', label: 'Tarun Gaur' },
    { id: 'suhanshi', label: 'Suhanshi Rawat' },
    { id: 'soniya', label: 'SONIYA KASHYAP' },
    { id: 'hardik', label: 'Hardik rawat' },
    { id: 'simran', label: 'SIMRAN KASHYAP' },
    { id: 'kapil', label: 'KAPIL' },
    { id: 'caram', label: USER_NAME }
  ];

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

  function pmStats() {
    if (global.PmDashboardStats) {
      return global.PmDashboardStats.getStats(state.employeeFilter, state.dateRange);
    }
    return { open: 32, dueToday: 2, processing: 26, weekly: 64, review: 0, overdue: 253, completed: 12, stuck: 0 };
  }

  function dateLabelForRange(rangeId) {
    if (global.PmDashboardStats) {
      if (rangeId === 'custom') return global.PmDashboardStats.customRangeLabel();
      return global.PmDashboardStats.getDateRangeLabel(rangeId);
    }
    for (var i = 0; i < DATE_RANGES.length; i++) {
      if (DATE_RANGES[i].id === rangeId) return DATE_RANGES[i].label;
    }
    return 'Last 15 Days';
  }

  var QUICK_LINKS = [
    { label: 'My Attendance', card: 'assets/dashboard/quick-links/attendance-card.png', href: 'HRMS/attendance.html' },
    { label: 'My Leaves', card: 'assets/dashboard/quick-links/leaves-card.png', href: 'HRMS/my_leave.html' },
    { label: 'Add Invoice', card: 'assets/dashboard/quick-links/invoice-card.png', href: 'billing.html' },
    { label: 'Create Docs', card: 'assets/dashboard/quick-links/docs-card.png', href: 'self_create_document.html' },
    { label: 'Client Groups', card: 'assets/dashboard/quick-links/groups-card.png', href: 'crm_client_group.html' },
    { label: 'Calendar', card: 'assets/dashboard/quick-links/calendar-card.png', href: 'my_profile.html#calendar' },
    { label: 'Timesheet', card: 'assets/dashboard/quick-links/timesheet-card.png', href: 'HRMS/my_timesheet.html' },
    { label: 'Add Receipts', card: 'assets/dashboard/quick-links/receipts-card.png', href: 'billing.html' },
    { label: 'Add Leads', card: 'assets/dashboard/quick-links/leads-card.png', href: 'marketing_lead_management.html' },
    { label: 'Outstanding', card: 'assets/dashboard/quick-links/outstanding-card.png', href: 'billing.html' }
  ];

  var QUICK_LINKS_STORAGE = 'timeerp.quickLinks.selected';
  var QUICK_LINKS_STORAGE_VERSION = '2';

  function isLegacyFiveOnlySelection(parsed) {
    if (!Array.isArray(parsed) || parsed.length !== QUICK_LINKS.length || parsed.length <= 5) return false;
    for (var i = 0; i < 5; i++) {
      if (!parsed[i]) return false;
    }
    for (var j = 5; j < parsed.length; j++) {
      if (parsed[j]) return false;
    }
    return true;
  }

  function defaultQuickLinkSelection() {
    return QUICK_LINKS.map(function () { return true; });
  }

  function loadQuickLinkSelection() {
    try {
      var version = localStorage.getItem('timeerp.quickLinks.version');
      var raw = localStorage.getItem(QUICK_LINKS_STORAGE);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          if (parsed.length !== QUICK_LINKS.length) {
            var merged = QUICK_LINKS.map(function (_, i) {
              return i < parsed.length ? !!parsed[i] : true;
            });
            saveQuickLinkSelection(merged);
            localStorage.setItem('timeerp.quickLinks.version', QUICK_LINKS_STORAGE_VERSION);
            return merged;
          }
          if (version !== QUICK_LINKS_STORAGE_VERSION && isLegacyFiveOnlySelection(parsed)) {
            var upgraded = defaultQuickLinkSelection();
            saveQuickLinkSelection(upgraded);
            localStorage.setItem('timeerp.quickLinks.version', QUICK_LINKS_STORAGE_VERSION);
            return upgraded;
          }
          return parsed;
        }
      }
    } catch (e) { /* ignore */ }
    return defaultQuickLinkSelection();
  }

  function saveQuickLinkSelection(selected) {
    try {
      localStorage.setItem(QUICK_LINKS_STORAGE, JSON.stringify(selected));
      localStorage.setItem('timeerp.quickLinks.version', QUICK_LINKS_STORAGE_VERSION);
    } catch (e) { /* ignore */ }
  }

  /* Task datasets — reviewer Ca Ram Kumar */
  var MY_TASKS = [
    { id: 'TSK02474', name: 'ITR DEMO', reviewer: 'Dev Aggarwal', client: '--', due: '21/08/2026', status: 'processing' },
    { id: 'TSK02473', name: 'GSt Registration', reviewer: 'Dev Aggarwal', client: 'Saksham', due: '18/08/2026', status: 'processing' },
    { id: 'TSK02470', name: 'GST FILLING', reviewer: 'Dev Aggarwal', client: 'law seva management private limited', due: '18/08/2026', status: 'processing' },
    { id: 'TSK02441', name: 'ITR Filling', reviewer: 'Dev Aggarwal', client: 'Saksham', due: '14/08/2026', status: 'processing' },
    { id: 'TSK02436', name: 'Tax Audit', reviewer: 'Dev Aggarwal', client: 'Saksham', due: '13/08/2026', status: 'processing' },
    { id: 'TSK02498', name: 'Gst Filling', reviewer: 'Dev Aggarwal', client: 'Saksham', due: '25/08/2026', status: 'open' },
    { id: 'TSK02497', name: 'Gst Filling 3B', reviewer: 'Dev Aggarwal', client: 'Saksham', due: '24/08/2026', status: 'open' },
    { id: 'TSK02496', name: 'Gst Filling R1', reviewer: 'Dev Aggarwal', client: 'Saksham', due: '24/08/2026', status: 'open' },
    { id: 'TSK02495', name: 'Gst Filling', reviewer: 'Dev Aggarwal', client: 'Saksham', due: '23/08/2026', status: 'open' },
    { id: 'TSK02494', name: 'Gst Filling 3B', reviewer: 'Dev Aggarwal', client: '--', due: '23/08/2026', status: 'open' },
    { id: 'TSK02471', name: 'GST FILLING', reviewer: 'Suhanshi Rawat', client: 'law seva management private limited', due: '20/08/2026', status: 'overdue' },
    { id: 'TSK02468', name: 'ITR', reviewer: 'Suhanshi Rawat', client: 'SAURABH BHARDWAJ HUF', due: '20/08/2026', status: 'overdue' },
    { id: 'TSK02467', name: 'GST Registration', reviewer: 'Dev Aggarwal', client: 'Saksham', due: '20/08/2026', status: 'overdue' },
    { id: 'TSK02466', name: 'ITR DEMO', reviewer: 'Suhanshi Rawat', client: '--', due: '19/08/2026', status: 'overdue' },
    { id: 'TSK02465', name: 'Gst Filling R1', reviewer: 'Dev Aggarwal', client: 'Saksham', due: '19/08/2026', status: 'overdue' },
    { id: 'TSK02480', name: 'GST FILLING', reviewer: USER_NAME, client: 'law seva management private limited', due: '20/08/2026', status: 'completed' },
    { id: 'TSK02479', name: 'Gst Filling 3B', reviewer: USER_NAME, client: '--', due: '20/08/2026', status: 'completed' },
    { id: 'TSK02478', name: 'bank audit', reviewer: USER_NAME, client: '--', due: '19/08/2026', status: 'completed' },
    { id: 'TSK02477', name: 'Gst Filling R1', reviewer: USER_NAME, client: 'Saksham', due: '19/08/2026', status: 'completed' },
    { id: 'TSK02476', name: 'GST R1', reviewer: USER_NAME, client: '--', due: '19/08/2026', status: 'completed' },
    { id: 'TSK02449', name: 'Final GSTR pack', reviewer: 'Dev Aggarwal', client: 'Sharma Traders', due: '15/08/2026', status: 'finalized' },
    { id: 'TSK02448', name: 'Audit query response', reviewer: 'Partner', client: 'Mehta & Co', due: '22/08/2026', status: 'consultation' }
  ];

  var REVIEWER_TASKS = [
    { id: 'TSK02456', name: 'GST Filling 3B', assignees: 'Aakash', client: 'Saksham', due: '23/08/2026', status: 'processing' },
    { id: 'TSK02415', name: 'Gst Filling R1', assignees: 'Aakash', client: 'Saksham', due: '22/08/2026', status: 'processing' },
    { id: 'TSK02390', name: 'Agreement', assignees: 'Dev Aggarwal', client: 'HARDIK RAWAT', due: '15/09/2026', status: 'processing' },
    { id: 'TSK02488', name: 'Gst Filling 3B', assignees: 'Aakash', client: 'Saksham', due: '20/08/2026', status: 'open' },
    { id: 'TSK02487', name: 'GST Appeal', assignees: 'Aakash', client: 'Saksham', due: '20/08/2026', status: 'open' },
    { id: 'TSK02480', name: 'GST FILLING', assignees: USER_NAME, client: 'law seva management private limited', due: '20/08/2026', status: 'completed' },
    { id: 'TSK02479', name: 'Gst Filling 3B', assignees: USER_NAME, client: '--', due: '20/08/2026', status: 'completed' },
    { id: 'TSK02478', name: 'bank audit', assignees: USER_NAME, client: '--', due: '19/08/2026', status: 'completed' }
  ];

  var CONSULTANT_TASKS = [
    { id: 'TSK02456', name: 'GST Filling 3B', assignees: 'Aakash', client: 'Saksham', due: '23/08/2026', status: 'processing' },
    { id: 'TSK02415', name: 'Gst Filling R1', assignees: 'Aakash', client: 'Saksham', due: '22/08/2026', status: 'processing' },
    { id: 'TSK02390', name: 'Agreement', assignees: 'Dev Aggarwal', client: 'HARDIK RAWAT', due: '15/09/2026', status: 'processing' },
    { id: 'TSK02473', name: 'GSt Registration', assignees: 'Dev Aggarwal', client: 'Saksham', due: '18/08/2026', status: 'open' },
    { id: 'TSK02436', name: 'Tax Audit', assignees: 'Dev Aggarwal', client: 'Saksham', due: '13/08/2026', status: 'open' }
  ];

  var NOTES = [
    { id: 1, title: 'Follow up GST filing', body: 'fyfyf', text: 'fyfyf', customer: 'Saksham', tags: 'gst', assignees: 'Tarun Gaur', category: 'notes', done: false },
    { id: 2, title: '', body: 'main training de raha hu', text: 'main training de raha hu', customer: '', tags: '', assignees: '', category: 'completed', done: true },
    { id: 3, title: '', body: 'CONTACT XYZ ENT @2:00 PM', text: 'CONTACT XYZ ENT @2:00 PM', customer: '', tags: '', assignees: '', category: 'completed', done: true },
    { id: 4, title: '', body: '76876889899', text: '76876889899', customer: '', tags: '', assignees: '', category: 'completed', done: true },
    { id: 5, title: 'Client call overdue', body: 'Call SAURABH BHARDWAJ regarding pending TDS documents', text: 'Call SAURABH BHARDWAJ regarding pending TDS documents', customer: 'SAURABH BHARDWAJ', tags: 'UDIN', assignees: 'SIMRAN KASHYAP', category: 'overdue', done: false },
    { id: 6, title: 'Invoice reminder', body: 'Send overdue invoice reminder to THE GOLD REALTY', text: 'Send overdue invoice reminder to THE GOLD REALTY', customer: 'THE GOLD REALTY', tags: 'INVOICE', assignees: 'Tarun Gaur', category: 'overdue', done: false },
    { id: 7, title: 'Audit follow-up', body: 'Collect pending bank statements for tax audit (due yesterday)', text: 'Collect pending bank statements for tax audit (due yesterday)', customer: 'PERFECT PAIR', tags: 'gst', assignees: 'Suhanshi Rawat', category: 'overdue', done: false },
    { id: 8, title: 'DSC renewal', body: 'Renew DSC for law seva management private limited', text: 'Renew DSC for law seva management private limited', customer: 'law seva management private limited', tags: 'ds', assignees: 'KAPIL', category: 'overdue', done: false },
    { id: 9, title: 'Weekly review', body: 'Prepare weekly client status update for Monday meeting', text: 'Prepare weekly client status update for Monday meeting', customer: 'Internal', tags: 'nnn', assignees: 'Hardik rawat', category: 'upcoming', done: false },
    { id: 10, title: 'GST return draft', body: 'Draft GSTR-3B for Saksham before due date', text: 'Draft GSTR-3B for Saksham before due date', customer: 'Saksham', tags: 'gst', assignees: 'Tarun Gaur', category: 'upcoming', done: false },
    { id: 11, title: 'Portal credentials', body: 'Share updated Income Tax portal password with client', text: 'Share updated Income Tax portal password with client', customer: 'SAURABH BHARDWAJ HUF', tags: 'ads', assignees: 'Aastha Tyagi', category: 'upcoming', done: false },
    { id: 12, title: 'Appointment', body: 'Client visit scheduled — PERFECT PAIR at 11:00 AM', text: 'Client visit scheduled — PERFECT PAIR at 11:00 AM', customer: 'PERFECT PAIR', tags: '1234', assignees: 'Shivam Kumar', category: 'upcoming', done: false },
    { id: 13, title: 'Training notes', body: 'Share onboarding checklist with new joiners', text: 'Share onboarding checklist with new joiners', customer: 'Internal', tags: 'nnn', assignees: 'SONIYA KASHYAP', category: 'notes', done: false },
    { id: 14, title: 'Payment follow-up', body: 'Follow up on outstanding receipt from TATA MOTORS', text: 'Follow up on outstanding receipt from TATA MOTORS', customer: 'TATA MOTORS PASSENGER VEHICLE LTD', tags: 'INVOICE', assignees: 'Aakash', category: 'notes', done: false }
  ];

  var NOTE_CUSTOMERS = [
    'Internal', 'Kamal Kant Sharma', 'testing', 'SAURABH BHARDWAJ', 'SAURABH BHARDWAJ HUF',
    'THE GOLD REALTY', 'law seva management private limited', 'PERFECT PAIR',
    'TATA MOTORS PASSENGER VEHICLE LTD', 'Saksham'
  ];

  var NOTE_TAGS = ['nnn', 'INVOICE', 'fssai', 'gst', 'UDIN', '1234', 'ds', 'ads'];

  var NOTE_ASSIGNEES = [
    'Saurabh Bhardwaj', 'Kamal Sharma', 'Ankur Gupta', 'Akash', 'Dev Aggarwal', 'Anupam',
    'Tarun Gaur', 'Suhanshi Rawat', 'SONIYA KASHYAP', 'Hardik rawat', 'SIMRAN KASHYAP',
    'KAPIL', 'Aastha Tyagi', 'Shivam Kumar', 'Aakash'
  ];

  var STAFF_LEAVE = [
    { name: 'Simran Kashyap', from: '22/08/2026', to: '23/08/2026' },
    { name: 'Aastha Tyagi', from: '25/08/2026', to: '26/08/2026' },
    { name: 'Monu Kumar', from: '28/08/2026', to: '29/08/2026' }
  ];

  var TEAM_LEAVE = [
    { name: 'Dev Aggarwal', from: '20/08/2026', to: '21/08/2026' },
    { name: 'Soniya Kashyap', from: '24/08/2026', to: '25/08/2026' },
    { name: 'Suhanshi Rawat', from: '27/08/2026', to: '28/08/2026' },
    { name: 'Tarun Gaur', from: '01/09/2026', to: '02/09/2026' }
  ];

  var BIRTHDAYS = [
    { name: 'Janki Sharma', date: '12/09' },
    { name: 'Shivam Chaurasia', date: '18/09' },
    { name: 'Aastha Tyagi', date: '03/10' },
    { name: 'Kamal Kant Sharma', date: '14/10' }
  ];

  var ANNIVERSARIES = [
    { name: 'Saurabh Bhardwaj', date: '15/03/2019' },
    { name: 'Dev Aggarwal', date: '02/06/2022' },
    { name: 'Simran Kashyap', date: '11/11/2023' }
  ];

  var state = {
    employeeFilter: 'all',
    dateRange: '15days',
    dateLabel: 'Last 15 Days',
    widgetsExpanded: false,
    leaveView: 'staff',
    birthdayView: 'birthday',
    notesTab: 'notes',
    notesForm: null,
    notesComboOpen: null,
    notesComboSearch: '',
    panels: {
      my: { status: 'processing', page: 1, search: '' },
      reviewer: { status: 'processing', page: 1, search: '' },
      consultant: { status: 'processing', page: 1, search: '' }
    },
    quickLinksSelected: loadQuickLinkSelection(),
    quickLinksDraft: null,
    quickLinksModalOpen: false
  };

  var toastFn = null;
  var inited = false;

  function esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }

  function formatToday() {
    var d = new Date();
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate();
  }

  function statCounts() {
    return pmStats();
  }

  function statLabels() {
    if (global.PmDashboardStats) return global.PmDashboardStats.STAT_LABELS;
    return [
      { key: 'open', label: 'Open Task' },
      { key: 'dueToday', label: 'Due Today' },
      { key: 'processing', label: 'Processing' },
      { key: 'weekly', label: 'Weekly Due' },
      { key: 'review', label: 'Under Review' },
      { key: 'overdue', label: 'Over Due' },
      { key: 'completed', label: 'Completed' },
      { key: 'stuck', label: 'Stuck' }
    ];
  }

  function statIconType(key) {
    if (global.PmDashboardStats) return global.PmDashboardStats.iconTypeForKey(key);
    var map = { open: 'open', dueToday: 'due', processing: 'processing', weekly: 'weekly', review: 'review', overdue: 'overdue', completed: 'completed', stuck: 'stuck' };
    return map[key] || key;
  }

  function welcomeArt() {
    return '<img src="assets/dashboard/welcome-illustration.png?v=4" alt="" width="320" height="200" class="hd-welcome__img" loading="eager" decoding="async">';
  }

  function emptyIcon() {
    return '<svg class="hd-panel__empty-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">' +
      '<path d="M8 16h32v24H8z"/><path d="M16 16V12a8 8 0 0116 0v4"/></svg>';
  }

  var LEFT_STAT_KEYS = ['open', 'dueToday', 'processing', 'weekly'];
  var RIGHT_STAT_KEYS = ['review', 'overdue', 'completed', 'stuck'];

  function labelForKey(key) {
    var labels = statLabels();
    for (var i = 0; i < labels.length; i++) {
      if (labels[i].key === key) return labels[i].label;
    }
    return key;
  }

  function renderStats() {
    var s = statCounts();
    var leftCells = LEFT_STAT_KEYS.map(function (key) {
      return statCell(statIconType(key), labelForKey(key), s[key], key);
    }).join('');
    var rightCells = RIGHT_STAT_KEYS.map(function (key) {
      return statCell(statIconType(key), labelForKey(key), s[key], key);
    }).join('');

    return '<div class="hd-stats__cols">' +
      '<div class="hd-stats__col">' +
        '<div class="hd-stats__combo" id="hdEmpCombo">' +
          '<button type="button" class="hd-stats__combo-btn" id="hdEmpBtn">' + esc(state.employeeFilter === 'all' ? 'All' : getEmployeeLabel(state.employeeFilter)) + '</button>' +
          '<div class="hd-stats__dropdown" id="hdEmpDrop">' +
            '<div class="hd-stats__search"><input type="search" id="hdEmpSearch" placeholder="All" autocomplete="off"></div>' +
            '<div id="hdEmpList"></div>' +
          '</div>' +
        '</div>' +
        leftCells +
      '</div>' +
      '<div class="hd-stats__col">' +
        '<div class="hd-stats__combo hd-stats__combo--date" id="hdDateCombo">' +
          '<button type="button" class="hd-stats__combo-btn" id="hdDateBtn">' + esc(state.dateLabel) + '</button>' +
          '<div class="hd-stats__dropdown" id="hdDateDrop">' +
            '<div id="hdDateList"></div>' +
          '</div>' +
        '</div>' +
        rightCells +
      '</div>' +
    '</div>';
  }

  function statCell(type, label, val, statKey) {
    var iconHtml = global.PmDashboardStats ? global.PmDashboardStats.statIconSvg(type) : '';
    if (!iconHtml) {
      var icons = {
        open: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="5"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/></svg>',
        processing: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="4" cy="8" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="12" cy="12" r="2"/><path d="M6 7l4-2M6 9l4 2"/></svg>',
        review: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="5" y="9" width="5" height="5" rx="1"/></svg>',
        completed: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 8l3 3 5-6"/></svg>',
        due: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 4v4l3 2"/></svg>',
        weekly: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="10" height="10" rx="1"/><path d="M3 7h10M6 2v2M10 2v2"/></svg>',
        overdue: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3l6 10H2L8 3z"/><path d="M8 7v3M8 11h.01"/></svg>',
        stuck: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M5 5l6 6M11 5l-6 6"/></svg>'
      };
      iconHtml = icons[type] || '';
    }
    return '<button type="button" class="hd-stat hd-stat--' + type + '" data-hd-stat="' + esc(statKey || type) + '">' +
      '<span class="hd-stat__icon hd-stat__icon--' + type + '" aria-hidden="true">' + iconHtml + '</span>' +
      '<span class="hd-stat__label">' + esc(label) + '</span>' +
      '<span class="hd-stat__val">' + val + '</span>' +
    '</button>';
  }

  function getEmployeeLabel(id) {
    for (var i = 0; i < EMPLOYEES.length; i++) {
      if (EMPLOYEES[i].id === id) return EMPLOYEES[i].label;
    }
    return 'All';
  }

  function renderQuickLinks() {
    return QUICK_LINKS.map(function (q, i) {
      if (!state.quickLinksSelected[i]) return '';
      var art = q.art || q.card.replace('-card.png', '-art.png');
      var art2x = art.replace('-art.png', '-art@2x.png');
      return '<a class="hd-quick__card" href="' + esc(q.href) + '" data-hd-quick aria-label="' + esc(q.label) + '">' +
        '<img class="hd-quick__card-art" src="' + esc(art) + '?v=14" srcset="' + esc(art) + '?v=14 1x, ' + esc(art2x) + '?v=14 2x" alt="" loading="lazy" width="130" height="140">' +
        '<span class="hd-quick__card-label">' + esc(q.label) + '</span>' +
      '</a>';
    }).join('');
  }

  function quickLinkArt(q) {
    return q.art || q.card.replace('-card.png', '-art.png');
  }

  function renderQuickLinksModalGrid(draft) {
    return QUICK_LINKS.map(function (q, i) {
      var selected = !!draft[i];
      var art = quickLinkArt(q);
      return '<button type="button" class="hd-quick-modal__item' + (selected ? ' is-selected' : '') +
        '" data-hd-quick-idx="' + i + '" aria-pressed="' + (selected ? 'true' : 'false') + '">' +
        '<span class="hd-quick-modal__star" aria-hidden="true">' + (selected ? '★' : '☆') + '</span>' +
        '<img class="hd-quick-modal__art" src="' + esc(art) + '?v=14" alt="" loading="lazy" width="72" height="72">' +
        '<span class="hd-quick-modal__label">' + esc(q.label) + '</span>' +
      '</button>';
    }).join('');
  }

  function renderQuickLinksModal() {
    if (!state.quickLinksModalOpen) return '';
    var draft = state.quickLinksDraft || state.quickLinksSelected;
    return '<div class="hd-quick-modal is-open" id="hdQuickModal" role="presentation">' +
      '<button type="button" class="hd-quick-modal__backdrop" id="hdQuickModalBackdrop" aria-label="Close customize quick links"></button>' +
      '<div class="hd-quick-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="hdQuickModalTitle">' +
        '<div class="hd-quick-modal__head">' +
          '<h3 class="hd-quick-modal__title" id="hdQuickModalTitle">Customize Quick Links</h3>' +
          '<button type="button" class="hd-quick-modal__close" id="hdQuickModalClose" aria-label="Close">×</button>' +
        '</div>' +
        '<div class="hd-quick-modal__grid" id="hdQuickModalGrid">' + renderQuickLinksModalGrid(draft) + '</div>' +
        '<div class="hd-quick-modal__foot">' +
          '<button type="button" class="hd-quick-modal__btn hd-quick-modal__btn--ghost" id="hdQuickModalCancel">Cancel</button>' +
          '<button type="button" class="hd-quick-modal__btn hd-quick-modal__btn--primary" id="hdQuickModalSave">Save</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function openQuickLinksModal() {
    state.quickLinksModalOpen = true;
    state.quickLinksDraft = state.quickLinksSelected.slice();
    var existing = document.getElementById('hdQuickModal');
    if (existing) existing.remove();
    var root = document.getElementById('homeView');
    if (root) root.insertAdjacentHTML('beforeend', renderQuickLinksModal());
    document.body.classList.add('hd-quick-modal-open');
  }

  function closeQuickLinksModal() {
    state.quickLinksModalOpen = false;
    state.quickLinksDraft = null;
    var modal = document.getElementById('hdQuickModal');
    if (modal) modal.remove();
    document.body.classList.remove('hd-quick-modal-open');
  }

  function refreshQuickLinksNav() {
    var track = document.getElementById('hdQuickTrack');
    var prev = document.getElementById('hdQuickPrev');
    var next = document.getElementById('hdQuickNext');
    if (!track || !prev || !next) return;
    var maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 2) {
      prev.disabled = true;
      next.disabled = true;
      return;
    }
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= maxScroll - 2;
  }

  function refreshQuickLinksTrack() {
    var track = document.getElementById('hdQuickTrack');
    if (track) track.innerHTML = renderQuickLinks();
    refreshQuickLinksNav();
  }

  function refreshQuickLinksModalGrid() {
    var grid = document.getElementById('hdQuickModalGrid');
    if (!grid || !state.quickLinksDraft) return;
    grid.innerHTML = renderQuickLinksModalGrid(state.quickLinksDraft);
  }

  function filterTasks(list, panelKey, isReviewer) {
    var p = state.panels[panelKey];
    var q = (p.search || '').toLowerCase();
    return list.filter(function (t) {
      if (t.status !== p.status) return false;
      if (!q) return true;
      var hay = (t.id + ' ' + t.name + ' ' + (t.reviewer || t.assignees || '') + ' ' + (t.client || '')).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }

  function renderTaskPanel(key, title, tabs, data, cols) {
    var p = state.panels[key];
    var rows = filterTasks(data, key);
    var totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    if (p.page > totalPages) p.page = totalPages;
    var start = (p.page - 1) * PAGE_SIZE;
    var pageRows = rows.slice(start, start + PAGE_SIZE);

    var tabsHtml = tabs.map(function (tab) {
      var count = data.filter(function (t) { return t.status === tab.id; }).length;
      return '<button type="button" class="hd-panel__tab' + (p.status === tab.id ? ' is-active' : '') +
        '" data-hd-panel="' + key + '" data-hd-status="' + tab.id + '">' + esc(tab.label) +
        (count ? ' (' + count + ')' : '') + '</button>';
    }).join('');

    var bodyHtml;
    if (!pageRows.length) {
      bodyHtml = '<tr><td colspan="' + cols.length + '"><div class="hd-panel__empty">' + emptyIcon() + '<div>No data</div></div></td></tr>';
    } else {
      bodyHtml = pageRows.map(function (t) {
        var cells = cols.map(function (col) {
          var val = t[col.field] || '--';
          if (col.field === 'id') return '<td class="hd-panel__id">' + esc(val) + '</td>';
          return '<td>' + esc(val) + '</td>';
        }).join('');
        return '<tr data-hd-task="' + esc(t.id) + '" data-hd-panel="' + key + '">' + cells + '</tr>';
      }).join('');
    }

    var headCells = cols.map(function (c) { return '<th>' + esc(c.label) + '</th>'; }).join('');

    var addHref = 'add_task.html';
    var addId = key === 'consultant' ? ' id="hdConsultantAddTask"' : '';

    return '<section class="hd-panel" id="hdPanel-' + key + '" aria-label="' + esc(title) + '">' +
      '<div class="hd-panel__head">' +
        '<a href="task_management.html" class="hd-panel__title-link">' + esc(title) + '</a>' +
        '<div class="hd-panel__tools">' +
          '<div class="hd-panel__search"><input type="search" data-hd-search="' + key + '" placeholder="Search Tasks" value="' + esc(p.search) + '" autocomplete="off"></div>' +
          '<a class="hd-panel__add" href="' + addHref + '"' + addId + ' aria-label="Create task">+</a>' +
        '</div>' +
      '</div>' +
      '<div class="hd-panel__tabs" role="tablist">' + tabsHtml + '</div>' +
      '<div class="hd-panel__table-wrap">' +
        '<table class="hd-panel__table"><thead><tr>' + headCells + '</tr></thead><tbody>' + bodyHtml + '</tbody></table>' +
      '</div>' +
      '<div class="hd-panel__foot">' +
        '<button type="button" class="hd-panel__page-btn" data-hd-prev="' + key + '" aria-label="Previous"' + (p.page <= 1 ? ' disabled' : '') + '>&lsaquo;</button>' +
        '<span class="hd-panel__page-info">' + p.page + ' of ' + totalPages + '</span>' +
        '<button type="button" class="hd-panel__page-btn" data-hd-next="' + key + '" aria-label="Next"' + (p.page >= totalPages ? ' disabled' : '') + '>&rsaquo;</button>' +
        '<span class="hd-panel__foot-count">' + pageRows.length + ' / ' + rows.length + '</span>' +
      '</div>' +
    '</section>';
  }

  function notesForTab(tab) {
    return NOTES.filter(function (n) {
      if (tab === 'notes') return n.category === 'notes' && !n.done;
      if (tab === 'overdue') return n.category === 'overdue';
      if (tab === 'upcoming') return n.category === 'upcoming';
      if (tab === 'completed') return n.category === 'completed' || n.done;
      return false;
    });
  }

  function noteGaugeIcon() {
    return '<svg class="hd-notes__gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
      '<path d="M12 14a2 2 0 100-4 2 2 0 000 4z"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>' +
    '</svg>';
  }

  function renderNoteCombo(field, value, formKey) {
    var openId = formKey + '-' + field;
    var isOpen = state.notesComboOpen === openId;
    var placeholders = { customer: 'Select customer', tags: 'Tags', assignees: 'Assignees' };
    var options = field === 'customer' ? NOTE_CUSTOMERS : field === 'tags' ? NOTE_TAGS : NOTE_ASSIGNEES;
    var q = (state.notesComboSearch || '').toLowerCase();
    var filtered = options.filter(function (o) { return !q || o.toLowerCase().indexOf(q) !== -1; });
    var optsHtml = filtered.map(function (o) {
      return '<button type="button" class="hd-notes__opt' + (value === o ? ' is-active' : '') +
        '" data-hd-notes-opt="' + field + '" data-hd-notes-val="' + esc(o) + '">' + esc(o) + '</button>';
    }).join('');

    return '<div class="hd-notes__combo' + (isOpen ? ' is-open' : '') + '" data-hd-notes-combo-wrap="' + esc(field) + '">' +
      '<button type="button" class="hd-notes__combo-btn" data-hd-notes-combo="' + esc(field) + '" data-hd-notes-form="' + esc(formKey) + '">' +
        esc(value || placeholders[field]) +
      '</button>' +
      '<div class="hd-notes__dropdown">' +
        '<div class="hd-notes__search"><input type="search" data-hd-notes-combo-search="' + esc(field) + '" placeholder="' + esc(placeholders[field]) + '" value="' + esc(isOpen ? state.notesComboSearch : '') + '" autocomplete="off"></div>' +
        '<div class="hd-notes__opt-list">' + optsHtml + '</div>' +
      '</div>' +
    '</div>';
  }

  function renderNoteForm(form, formKey) {
    var preview = form.title || form.body || '';
    var headHtml = form.id && preview
      ? '<div class="hd-notes__item-head"><span class="hd-notes__preview">' + esc(preview) + '</span>' +
          '<div class="hd-notes__actions">' +
            '<button type="button" class="hd-notes__act" data-hd-note-edit="' + form.id + '" aria-label="Edit">&#9998;</button>' +
            '<button type="button" class="hd-notes__act hd-notes__act--del" data-hd-note-del="' + form.id + '" aria-label="Delete">&#128465;</button>' +
          '</div></div>'
      : '';
    return '<div class="hd-notes__item hd-notes__item--form">' +
      '<div class="hd-notes__item-side">' +
        '<span class="hd-notes__bullet" aria-hidden="true"></span>' +
        '<span class="hd-notes__clock" aria-hidden="true">&#128336;</span>' +
      '</div>' +
      '<div class="hd-notes__item-main">' +
        headHtml +
        '<input type="text" class="hd-notes__input" data-hd-notes-field="title" placeholder="Enter Note Title" value="' + esc(form.title) + '">' +
        '<textarea class="hd-notes__textarea" data-hd-notes-field="body" placeholder="Enter Note" rows="3">' + esc(form.body) + '</textarea>' +
        '<div class="hd-notes__fields-row">' +
          renderNoteCombo('customer', form.customer, formKey) +
          renderNoteCombo('tags', form.tags, formKey) +
          renderNoteCombo('assignees', form.assignees, formKey) +
          noteGaugeIcon() +
        '</div>' +
        '<div class="hd-notes__form-actions">' +
          '<button type="button" class="hd-notes__save" data-hd-note-save aria-label="Save">&#10003;</button>' +
          '<button type="button" class="hd-notes__cancel" data-hd-note-cancel aria-label="Cancel">&#10005;</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function renderNoteRow(n, editing) {
    if (editing) {
      return renderNoteForm({
        mode: 'edit', id: n.id, title: n.title || '', body: n.body || n.text || '',
        customer: n.customer || '', tags: n.tags || '', assignees: n.assignees || ''
      }, 'edit-' + n.id);
    }
    if (state.notesTab === 'completed' || n.done) {
      return '<div class="hd-notes__item">' +
        '<span class="hd-notes__dash">--</span>' +
        '<span class="hd-notes__text">' + esc(n.text || n.body) + '</span>' +
        '<div class="hd-notes__actions">' +
          '<button type="button" class="hd-notes__act" data-hd-note-edit="' + n.id + '" aria-label="Edit">&#9998;</button>' +
          '<button type="button" class="hd-notes__act hd-notes__act--del" data-hd-note-del="' + n.id + '" aria-label="Delete">&#128465;</button>' +
        '</div></div>';
    }
    return '<div class="hd-notes__item">' +
      '<input type="checkbox" class="hd-notes__check"' + (n.done ? ' checked' : '') + ' data-hd-note-check="' + n.id + '">' +
      '<span class="hd-notes__text">' + esc(n.text || n.body) + '</span>' +
      '<div class="hd-notes__actions">' +
        '<button type="button" class="hd-notes__act" data-hd-note-edit="' + n.id + '" aria-label="Edit">&#9998;</button>' +
        '<button type="button" class="hd-notes__act hd-notes__act--del" data-hd-note-del="' + n.id + '" aria-label="Delete">&#128465;</button>' +
      '</div></div>';
  }

  function renderNotes() {
    var tabs = ['notes', 'overdue', 'upcoming', 'completed'];
    var labels = { notes: 'Notes', overdue: 'Overdue', upcoming: 'Upcoming', completed: 'Completed' };
    var tabsHtml = tabs.map(function (t) {
      return '<button type="button" class="hd-notes__tab' + (state.notesTab === t ? ' is-active' : '') + '" data-hd-notes-tab="' + t + '">' + labels[t] + '</button>';
    }).join('');

    var filtered = notesForTab(state.notesTab);
    var listParts = [];

    if (state.notesForm && state.notesForm.mode === 'new') {
      listParts.push(renderNoteForm(state.notesForm, 'new'));
    }

    if (!filtered.length && !(state.notesForm && state.notesForm.mode === 'new')) {
      listParts.push('<div class="hd-panel__empty">' + emptyIcon() + '<div>No data</div></div>');
    } else {
      filtered.forEach(function (n) {
        var editing = state.notesForm && state.notesForm.mode === 'edit' && state.notesForm.id === n.id;
        listParts.push(renderNoteRow(n, editing));
      });
    }

    var listHtml = listParts.join('');
    var total = filtered.length + (state.notesForm && state.notesForm.mode === 'new' ? 1 : 0);

    return '<section class="hd-panel hd-notes" aria-label="My Notes">' +
      '<div class="hd-panel__head">' +
        '<a href="my_notes.html#view" class="hd-notes__title-btn">My Notes</a>' +
        '<button type="button" class="hd-panel__add" id="hdNoteAdd" aria-label="Add note">+</button>' +
      '</div>' +
      '<div class="hd-notes__tabs">' + tabsHtml + '</div>' +
      '<div class="hd-notes__list">' + listHtml + '</div>' +
      '<div class="hd-panel__foot">' +
        '<button type="button" class="hd-panel__page-btn" disabled>&lsaquo;</button>' +
        '<span class="hd-panel__page-info">1 of 1</span>' +
        '<button type="button" class="hd-panel__page-btn" disabled>&rsaquo;</button>' +
        '<span class="hd-panel__foot-count">' + total + ' / ' + total + '</span>' +
      '</div>' +
    '</section>';
  }

  function renderWidgetFoot(count, total) {
    return '<div class="hd-widget__foot">' +
      '<button type="button" class="hd-widget__page-btn" disabled aria-label="Previous">&lsaquo;</button>' +
      '<span class="hd-widget__page-box">1</span>' +
      '<span class="hd-widget__page-of">of 1</span>' +
      '<button type="button" class="hd-widget__page-btn" disabled aria-label="Next">&rsaquo;</button>' +
      '<span class="hd-widget__foot-count">' + count + ' / ' + total + '</span>' +
    '</div>';
  }

  function renderWidgetToggle(label, isOn, widgetId) {
    return '<button type="button" class="hd-widget__pill' + (isOn ? ' is-on' : '') +
      '" data-hd-switch="' + esc(widgetId) + '" aria-label="' + esc(label) + '">' +
      '<span>' + esc(label) + '</span></button>';
  }

  function leaveRows() {
    return state.leaveView === 'team' ? TEAM_LEAVE : STAFF_LEAVE;
  }

  function birthdayRows() {
    return state.birthdayView === 'anniversary' ? ANNIVERSARIES : BIRTHDAYS;
  }

  function renderLeaveWidgetBody() {
    var rows = leaveRows();
    if (!rows.length) {
      return '<table class="hd-widget__table"><thead><tr><th>Name</th><th>From Date</th><th>To Date</th></tr></thead></table>' +
        '<div class="hd-widget__empty">' + emptyIcon() + '<div>No data</div></div>';
    }
    return '<table class="hd-widget__table">' +
      '<thead><tr><th>Name</th><th>From Date</th><th>To Date</th></tr></thead>' +
      '<tbody>' + rows.map(function (row) {
        return '<tr><td>' + esc(row.name) + '</td><td>' + esc(row.from) + '</td><td>' + esc(row.to) + '</td></tr>';
      }).join('') + '</tbody></table>';
  }

  function renderBirthdayWidgetBody() {
    var rows = birthdayRows();
    var isAnniv = state.birthdayView === 'anniversary';
    if (!rows.length) {
      return '<table class="hd-widget__table"><thead><tr><th>Name</th>' +
        (isAnniv ? '<th>Anniversary</th>' : '') +
        '</tr></thead></table>' +
        '<div class="hd-widget__empty">' + emptyIcon() + '<div>No data</div></div>';
    }
    return '<table class="hd-widget__table">' +
      '<thead><tr><th>Name</th>' + (isAnniv ? '<th>Anniversary</th>' : '<th>Date</th>') + '</tr></thead>' +
      '<tbody>' + rows.map(function (row) {
        return '<tr><td>' + esc(row.name) + '</td><td>' + esc(row.date) + '</td></tr>';
      }).join('') + '</tbody></table>';
  }

  function updateLeaveWidgetFoot() {
    var foot = document.querySelector('[data-hd-widget="leave"] .hd-widget__foot-count');
    if (!foot) return;
    var n = leaveRows().length;
    foot.textContent = n + ' / ' + n;
  }

  function updateBirthdayWidgetFoot() {
    var foot = document.querySelector('[data-hd-widget="birthday"] .hd-widget__foot-count');
    if (!foot) return;
    var n = birthdayRows().length;
    foot.textContent = n + ' / ' + n;
  }

  function renderWidgets() {
    var collapsed = state.widgetsExpanded ? '' : ' is-collapsed';
    var leaveTeam = state.leaveView === 'team';
    var birthdayAnniv = state.birthdayView === 'anniversary';
    var leaveCount = leaveRows().length;
    var birthdayCount = birthdayRows().length;
    return '<div class="hd-widgets' + collapsed + '" id="hdWidgets">' +
      '<div class="hd-widget" data-hd-widget="leave">' +
        '<div class="hd-widget__head"><h3>Staff Leave</h3>' +
          renderWidgetToggle(leaveTeam ? 'Team Leave' : 'Staff Leave', leaveTeam, 'leave') +
        '</div>' +
        '<div class="hd-widget__body" id="hdLeaveBody">' + renderLeaveWidgetBody() + '</div>' +
        renderWidgetFoot(leaveCount, leaveCount) +
      '</div>' +
      '<div class="hd-widget" data-hd-widget="birthday">' +
        '<div class="hd-widget__head"><h3>Birthday</h3>' +
          renderWidgetToggle(birthdayAnniv ? 'Anniversary' : 'Birthday', birthdayAnniv, 'birthday') +
        '</div>' +
        '<div class="hd-widget__body" id="hdBirthdayBody">' + renderBirthdayWidgetBody() + '</div>' +
        renderWidgetFoot(birthdayCount, birthdayCount) +
      '</div>' +
    '</div>' +
    '<div class="hd-expand"><button type="button" class="hd-expand__btn" id="hdWidgetsToggle">' + (state.widgetsExpanded ? 'View Less' : 'View More') + '</button></div>';
  }

  function render() {
    var root = document.getElementById('homeView');
    if (!root) return;

    root.innerHTML =
      '<div class="hd-layout">' +
        '<div class="hd-layout__left">' +
          '<section class="hd-welcome" aria-label="Welcome">' +
            '<div class="hd-welcome__art" aria-hidden="true">' + welcomeArt() + '</div>' +
            '<div class="hd-welcome__text">' +
              '<p class="hd-welcome__label">Welcome</p>' +
              '<h1 class="hd-welcome__name">' + esc(USER_NAME) + '</h1>' +
              '<p class="hd-welcome__sub">' + esc(ORG_NAME) + ' | ' + esc(formatToday()) + '</p>' +
            '</div>' +
          '</section>' +
          '<section class="hd-quick" aria-label="Quick Links">' +
            '<div class="hd-quick__head">' +
              '<button type="button" class="hd-quick__title-btn" id="hdQuickCustomize">Quick Links</button>' +
            '</div>' +
            '<div class="hd-quick__row">' +
              '<div class="hd-quick__track-wrap"><div class="hd-quick__track" id="hdQuickTrack">' + renderQuickLinks() + '</div></div>' +
              '<div class="hd-quick__nav">' +
                '<button type="button" class="hd-quick__nav-btn" id="hdQuickPrev" aria-label="Previous">&lsaquo;</button>' +
                '<button type="button" class="hd-quick__nav-btn" id="hdQuickNext" aria-label="Next">&rsaquo;</button>' +
              '</div>' +
            '</div>' +
          '</section>' +
        '</div>' +
        '<section class="hd-stats" aria-label="Task statistics" id="hdStats">' + renderStats() + '</section>' +
      '</div>' +
      renderTaskPanel('my', 'My Tasks', TASK_TABS, MY_TASKS, [
        { field: 'id', label: 'Task ID' },
        { field: 'name', label: 'Task Name' },
        { field: 'reviewer', label: 'Reviewer' },
        { field: 'client', label: 'Client' },
        { field: 'due', label: 'Due Date' }
      ]) +
      renderTaskPanel('reviewer', 'Reviewer Tasks', REVIEWER_TABS, REVIEWER_TASKS, [
        { field: 'id', label: 'Task ID' },
        { field: 'name', label: 'Task Name' },
        { field: 'assignees', label: 'Assignees' },
        { field: 'client', label: 'Client' },
        { field: 'due', label: 'Due Date' }
      ]) +
      renderTaskPanel('consultant', 'Consultant Tasks', REVIEWER_TABS, CONSULTANT_TASKS, [
        { field: 'id', label: 'Task ID' },
        { field: 'name', label: 'Task Name' },
        { field: 'assignees', label: 'Assignees' },
        { field: 'client', label: 'Client' },
        { field: 'due', label: 'Due Date' }
      ]) +
      renderNotes() +
      renderWidgets();

    bindEvents();
  }

  function renderEmpList(filter) {
    var list = document.getElementById('hdEmpList');
    if (!list) return;
    var q = (filter || '').toLowerCase();
    list.innerHTML = EMPLOYEES.filter(function (e) {
      if (e.group) return true;
      if (!q) return true;
      return (e.label || '').toLowerCase().indexOf(q) !== -1;
    }).map(function (e) {
      if (e.group) return '<div class="hd-stats__opt-group">' + esc(e.group) + '</div>';
      return '<button type="button" class="hd-stats__opt' + (state.employeeFilter === e.id ? ' is-active' : '') +
        '" data-hd-emp="' + esc(e.id) + '">' + esc(e.label) + '</button>';
    }).join('');
  }

  function renderDateList() {
    var list = document.getElementById('hdDateList');
    if (!list) return;
    var ranges = (global.PmDashboardStats && global.PmDashboardStats.DATE_RANGES) || DATE_RANGES;
    list.innerHTML = ranges.map(function (r) {
      var label = r.id === 'custom' ? dateLabelForRange('custom') : r.label;
      return '<button type="button" class="hd-stats__opt' + (state.dateRange === r.id ? ' is-active' : '') +
        '" data-hd-date="' + esc(r.id) + '">' + esc(label) + '</button>';
    }).join('');
  }

  function readNotesFormFromDom() {
    if (!state.notesForm) return;
    document.querySelectorAll('[data-hd-notes-field]').forEach(function (el) {
      state.notesForm[el.getAttribute('data-hd-notes-field')] = el.value;
    });
  }

  function bindEvents() {
    renderEmpList('');
    renderDateList();

    var empCombo = document.getElementById('hdEmpCombo');
    var empBtn = document.getElementById('hdEmpBtn');
    var empSearch = document.getElementById('hdEmpSearch');
    var dateCombo = document.getElementById('hdDateCombo');
    var dateBtn = document.getElementById('hdDateBtn');

    if (empBtn) {
      empBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (dateCombo) dateCombo.classList.remove('is-open');
        empCombo.classList.toggle('is-open');
      });
    }
    if (dateBtn && dateCombo) {
      dateBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        empCombo.classList.remove('is-open');
        dateCombo.classList.toggle('is-open');
      });
    }
    if (empSearch) {
      empSearch.addEventListener('input', function () { renderEmpList(empSearch.value); });
    }

    var quickTrack = document.getElementById('hdQuickTrack');
    function quickScrollStep() {
      var card = quickTrack && quickTrack.querySelector('.hd-quick__card');
      if (!card) return 284;
      var gap = 8;
      var visible = Math.max(1, Math.round(quickTrack.clientWidth / (card.offsetWidth + gap)));
      return visible * (card.offsetWidth + gap);
    }
    document.getElementById('hdQuickPrev').addEventListener('click', function () {
      quickTrack.scrollBy({ left: -quickScrollStep(), behavior: 'smooth' });
    });
    document.getElementById('hdQuickNext').addEventListener('click', function () {
      quickTrack.scrollBy({ left: quickScrollStep(), behavior: 'smooth' });
    });
    if (quickTrack) {
      quickTrack.addEventListener('scroll', refreshQuickLinksNav, { passive: true });
      refreshQuickLinksNav();
    }

    var quickCustomize = document.getElementById('hdQuickCustomize');
    if (quickCustomize) {
      quickCustomize.addEventListener('click', function () { openQuickLinksModal(); });
    }

    document.getElementById('hdWidgetsToggle').addEventListener('click', function () {
      state.widgetsExpanded = !state.widgetsExpanded;
      var w = document.getElementById('hdWidgets');
      w.classList.toggle('is-collapsed', !state.widgetsExpanded);
      this.textContent = state.widgetsExpanded ? 'View Less' : 'View More';
    });

    document.getElementById('hdNoteAdd').addEventListener('click', function () {
      state.notesForm = {
        mode: 'new',
        id: null,
        title: '',
        body: '',
        customer: '',
        tags: '',
        assignees: ''
      };
      state.notesComboOpen = null;
      state.notesComboSearch = '';
      render();
      var titleInput = document.querySelector('[data-hd-notes-field="title"]');
      if (titleInput) titleInput.focus();
    });
  }

  function handleClick(e) {
    if (e.target.id === 'hdQuickModalBackdrop' || e.target.id === 'hdQuickModalClose' || e.target.id === 'hdQuickModalCancel') {
      closeQuickLinksModal();
      return;
    }
    if (e.target.id === 'hdQuickModalSave') {
      if (state.quickLinksDraft) {
        state.quickLinksSelected = state.quickLinksDraft.slice();
        saveQuickLinkSelection(state.quickLinksSelected);
        refreshQuickLinksTrack();
      }
      closeQuickLinksModal();
      if (toastFn) toastFn('Quick Links updated', 'Your dashboard shortcuts were saved.');
      return;
    }

    var quickItem = e.target.closest('[data-hd-quick-idx]');
    if (quickItem && state.quickLinksDraft) {
      var idx = parseInt(quickItem.getAttribute('data-hd-quick-idx'), 10);
      if (!isNaN(idx)) {
        state.quickLinksDraft[idx] = !state.quickLinksDraft[idx];
        refreshQuickLinksModalGrid();
      }
      return;
    }

    var emp = e.target.closest('[data-hd-emp]');
    if (emp) {
      state.employeeFilter = emp.getAttribute('data-hd-emp');
      document.getElementById('hdEmpCombo').classList.remove('is-open');
      render();
      toastFn && toastFn('Filter', getEmployeeLabel(state.employeeFilter));
      return;
    }

    var dateOpt = e.target.closest('[data-hd-date]');
    if (dateOpt) {
      state.dateRange = dateOpt.getAttribute('data-hd-date');
      state.dateLabel = dateLabelForRange(state.dateRange);
      var dateCombo = document.getElementById('hdDateCombo');
      if (dateCombo) dateCombo.classList.remove('is-open');
      render();
      toastFn && toastFn('Date range', state.dateLabel);
      return;
    }

    var statBtn = e.target.closest('[data-hd-stat]');
    if (statBtn) {
      window.location.assign('task_management.html');
      return;
    }

    var tab = e.target.closest('[data-hd-panel][data-hd-status]');
    if (tab) {
      var key = tab.getAttribute('data-hd-panel');
      state.panels[key].status = tab.getAttribute('data-hd-status');
      state.panels[key].page = 1;
      render();
      return;
    }

    var prev = e.target.closest('[data-hd-prev]');
    if (prev) {
      var pk = prev.getAttribute('data-hd-prev');
      if (state.panels[pk].page > 1) { state.panels[pk].page--; render(); }
      return;
    }

    var next = e.target.closest('[data-hd-next]');
    if (next) {
      var nk = next.getAttribute('data-hd-next');
      state.panels[nk].page++;
      render();
      return;
    }

    var taskRow = e.target.closest('[data-hd-task]');
    if (taskRow) {
      var tid = taskRow.getAttribute('data-hd-task');
      toastFn && toastFn(tid, 'Opening in Task Management…');
      window.location.assign('task_management.html');
      return;
    }

    var notesTab = e.target.closest('[data-hd-notes-tab]');
    if (notesTab) {
      state.notesTab = notesTab.getAttribute('data-hd-notes-tab');
      state.notesForm = null;
      state.notesComboOpen = null;
      render();
      return;
    }

    var noteSave = e.target.closest('[data-hd-note-save]');
    if (noteSave) {
      readNotesFormFromDom();
      var f = state.notesForm;
      if (!f || (!f.body && !f.title)) {
        toastFn && toastFn('Note', 'Enter a title or note text.');
        return;
      }
      var cat = state.notesTab;
      if (f.mode === 'new') {
        NOTES.push({
          id: Date.now(),
          title: f.title || '',
          body: f.body || '',
          text: f.body || f.title,
          customer: f.customer || '',
          tags: f.tags || '',
          assignees: f.assignees || '',
          category: cat,
          done: cat === 'completed'
        });
        toastFn && toastFn('Note added', f.body || f.title);
      } else {
        for (var ni = 0; ni < NOTES.length; ni++) {
          if (NOTES[ni].id === f.id) {
            NOTES[ni].title = f.title || '';
            NOTES[ni].body = f.body || '';
            NOTES[ni].text = f.body || f.title;
            NOTES[ni].customer = f.customer || '';
            NOTES[ni].tags = f.tags || '';
            NOTES[ni].assignees = f.assignees || '';
            break;
          }
        }
        toastFn && toastFn('Note saved', f.body || f.title);
      }
      state.notesForm = null;
      state.notesComboOpen = null;
      render();
      return;
    }

    var noteCancel = e.target.closest('[data-hd-note-cancel]');
    if (noteCancel) {
      state.notesForm = null;
      state.notesComboOpen = null;
      render();
      return;
    }

    var noteCombo = e.target.closest('[data-hd-notes-combo]');
    if (noteCombo) {
      e.stopPropagation();
      readNotesFormFromDom();
      var field = noteCombo.getAttribute('data-hd-notes-combo');
      var formKey = noteCombo.getAttribute('data-hd-notes-form');
      var openId = formKey + '-' + field;
      state.notesComboOpen = state.notesComboOpen === openId ? null : openId;
      state.notesComboSearch = '';
      render();
      return;
    }

    var noteOpt = e.target.closest('[data-hd-notes-opt]');
    if (noteOpt) {
      readNotesFormFromDom();
      var optField = noteOpt.getAttribute('data-hd-notes-opt');
      state.notesForm[optField] = noteOpt.getAttribute('data-hd-notes-val');
      state.notesComboOpen = null;
      state.notesComboSearch = '';
      render();
      return;
    }

    var noteCheck = e.target.closest('[data-hd-note-check]');
    if (noteCheck) {
      var chkId = parseInt(noteCheck.getAttribute('data-hd-note-check'), 10);
      for (var ci = 0; ci < NOTES.length; ci++) {
        if (NOTES[ci].id === chkId) {
          NOTES[ci].done = noteCheck.checked;
          if (NOTES[ci].done) NOTES[ci].category = 'completed';
          break;
        }
      }
      render();
      return;
    }

    var noteDel = e.target.closest('[data-hd-note-del]');
    if (noteDel) {
      var delId = parseInt(noteDel.getAttribute('data-hd-note-del'), 10);
      if (delId) {
        NOTES = NOTES.filter(function (n) { return n.id !== delId; });
        if (state.notesForm && state.notesForm.id === delId) state.notesForm = null;
        render();
      }
      return;
    }

    var noteEdit = e.target.closest('[data-hd-note-edit]');
    if (noteEdit) {
      var editId = parseInt(noteEdit.getAttribute('data-hd-note-edit'), 10);
      if (editId) {
        for (var ei = 0; ei < NOTES.length; ei++) {
          if (NOTES[ei].id === editId) {
            var en = NOTES[ei];
            state.notesForm = {
              mode: 'edit', id: en.id,
              title: en.title || '', body: en.body || en.text || '',
              customer: en.customer || '', tags: en.tags || '', assignees: en.assignees || ''
            };
            state.notesComboOpen = null;
            render();
            break;
          }
        }
      }
      return;
    }

    var sw = e.target.closest('[data-hd-switch]');
    if (sw) {
      var widgetId = sw.getAttribute('data-hd-switch');
      if (widgetId === 'leave') {
        state.leaveView = state.leaveView === 'team' ? 'staff' : 'team';
        var leaveTeam = state.leaveView === 'team';
        sw.classList.toggle('is-on', leaveTeam);
        sw.querySelector('span').textContent = leaveTeam ? 'Team Leave' : 'Staff Leave';
        sw.setAttribute('aria-label', leaveTeam ? 'Team Leave' : 'Staff Leave');
        var leaveBody = document.getElementById('hdLeaveBody');
        if (leaveBody) leaveBody.innerHTML = renderLeaveWidgetBody();
        updateLeaveWidgetFoot();
      } else if (widgetId === 'birthday') {
        state.birthdayView = state.birthdayView === 'anniversary' ? 'birthday' : 'anniversary';
        var birthdayAnniv = state.birthdayView === 'anniversary';
        sw.classList.toggle('is-on', birthdayAnniv);
        sw.querySelector('span').textContent = birthdayAnniv ? 'Anniversary' : 'Birthday';
        sw.setAttribute('aria-label', birthdayAnniv ? 'Anniversary' : 'Birthday');
        var birthdayBody = document.getElementById('hdBirthdayBody');
        if (birthdayBody) birthdayBody.innerHTML = renderBirthdayWidgetBody();
        updateBirthdayWidgetFoot();
      }
      return;
    }

    if (!e.target.closest('#hdEmpCombo')) {
      var combo = document.getElementById('hdEmpCombo');
      if (combo) combo.classList.remove('is-open');
    }
    if (!e.target.closest('#hdDateCombo')) {
      var dateComboClose = document.getElementById('hdDateCombo');
      if (dateComboClose) dateComboClose.classList.remove('is-open');
    }
    if (!e.target.closest('.hd-notes__combo')) {
      if (state.notesComboOpen) {
        state.notesComboOpen = null;
        state.notesComboSearch = '';
      }
    }
  }

  function handleInput(e) {
    var comboSearch = e.target.closest('[data-hd-notes-combo-search]');
    if (comboSearch) {
      state.notesComboSearch = comboSearch.value;
      readNotesFormFromDom();
      render();
      var field = comboSearch.getAttribute('data-hd-notes-combo-search');
      var formKey = state.notesForm && state.notesForm.mode === 'new' ? 'new' : 'edit-' + state.notesForm.id;
      var wrap = document.querySelector('[data-hd-notes-combo-wrap="' + field + '"]');
      if (wrap) {
        var input = wrap.querySelector('[data-hd-notes-combo-search="' + field + '"]');
        if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
      }
      return;
    }

    var notesField = e.target.closest('[data-hd-notes-field]');
    if (notesField && state.notesForm) {
      state.notesForm[notesField.getAttribute('data-hd-notes-field')] = notesField.value;
    }
    var search = e.target.closest('[data-hd-search]');
    if (search) {
      var sk = search.getAttribute('data-hd-search');
      state.panels[sk].search = search.value;
      state.panels[sk].page = 1;
      clearTimeout(search._hdTimer);
      search._hdTimer = setTimeout(function () { render(); }, 200);
    }
  }

  function init(options) {
    options = options || {};
    toastFn = options.toast || null;
    if (!inited) {
      document.addEventListener('click', handleClick);
      document.addEventListener('input', handleInput);
      inited = true;
    }
    render();
  }

  global.HomeDashboard = {
    init: init,
    render: render,
    USER_NAME: USER_NAME
  };
})(typeof window !== 'undefined' ? window : this);
