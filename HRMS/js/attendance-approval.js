/**
 * TIME ERP — HRMS Attendance Approval
 * Tabs: Pending CheckIn | Approved/Rejected CheckIn | Employee Tracking
 */
(function () {
  'use strict';

  var SHIFTS = [
    'Normal Routine', 'Morning', 'Morning shift', 'Normal Routine-1',
    'Early Morning shift', 'Afternoon shift', 'Day shift-sk'
  ];
  var ATT_TYPES = ['Check IN', 'Check OUT'];
  var BRANCHES = ['HO', 'Delhi', 'Noida', 'Gurgaon', 'Mumbai'];
  var TEAMS = ['All Teams', 'Field Sales', 'Operations', 'Support', 'Audit'];
  var STATUSES = ['Approved', 'Rejected'];
  var PHOTO_COLORS = ['#91d5ff', '#b7eb8f', '#ffd591', '#d3adf7', '#87e8de', '#ffadd2', '#ffe58f', '#adc6ff'];

  var CAL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>';
  var FILTER_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M4 5h16l-6 7v5l-4 2v-7L4 5z"/></svg>';
  var EXCEL_ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 2.75h7.5L19.25 7.5V20.5a.75.75 0 01-.75.75H7a.75.75 0 01-.75-.75V3.5A.75.75 0 017 2.75z" stroke="#217346" stroke-width="1.5" stroke-linejoin="round"/><path d="M14.5 2.75V7.5h4.75" stroke="#217346" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.2 10.2l5.6 7.6M14.8 10.2l-5.6 7.6" stroke="#217346" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var CHEV_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
  var EMPTY_ICON = '<div class="aa-empty__icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M10 28l6-8h32l6 8"/><path d="M10 28h44v22a4 4 0 01-4 4H14a4 4 0 01-4-4V28z"/><path d="M10 28h14l4 6h12l4-6h14"/></svg></div><p>No data</p>';

  var TRACK_COLS = [
    { id: 'employee', label: 'Employee' },
    { id: 'client', label: 'Client' },
    { id: 'startTime', label: 'Start Time' },
    { id: 'endTime', label: 'End Time' },
    { id: 'status', label: 'Status' },
    { id: 'duration', label: 'Duration' },
    { id: 'distance', label: 'Distance (KM)' },
    { id: 'place', label: 'Place of visit' },
    { id: 'visitingPerson', label: 'Visiting person' },
    { id: 'visitingMobile', label: 'Visiting mobile' },
    { id: 'purpose', label: 'Purpose' },
    { id: 'deviceId', label: 'Device ID' },
    { id: 'action', label: 'Action' }
  ];

  var state = {
    tab: 'pending',
    checkedIn: false,
    selected: {},
    idealEmployees: false,
    filterOpen: false,
    filterAcc: { shift: true, attType: false, status: true },
    shiftSearch: '',
    statusSearch: '',
    filters: {
      branch: '',
      employee: '',
      team: '',
      startDate: '',
      endDate: '',
      shifts: {},
      attTypes: {},
      statuses: {}
    },
    trackPage: 1,
    trackPageSize: 10,
    pending: [
      {
        id: 'p1', name: 'SONIYA KASHYAP', coords: '28.535516,77.391026',
        device: 'Samsung Galaxy A14', time: '17/08/2026 10:02:37 AM',
        attType: 'Check IN', faceMatched: 'No', outsideRadius: 'No', shift: 'Normal Routine', branch: 'HO'
      },
      {
        id: 'p2', name: 'Dev Aggarwal', coords: '28.613939,77.209021',
        device: 'iPhone 13', time: '17/08/2026 09:48:12 AM',
        attType: 'Check IN', faceMatched: 'No', outsideRadius: 'Yes', shift: 'Morning', branch: 'Delhi'
      },
      {
        id: 'p3', name: 'Monu Kumar', coords: '28.459497,77.026638',
        device: 'Redmi Note 12', time: '17/08/2026 09:31:05 AM',
        attType: 'Check IN', faceMatched: 'Yes', outsideRadius: 'No', shift: 'Morning shift', branch: 'Gurgaon'
      },
      {
        id: 'p4', name: 'Tarun Gaur', coords: '28.704060,77.102493',
        device: 'OnePlus Nord CE', time: '17/08/2026 09:15:44 AM',
        attType: 'Check IN', faceMatched: 'No', outsideRadius: 'No', shift: 'Normal Routine-1', branch: 'Noida'
      },
      {
        id: 'p5', name: 'Riya Sharma', coords: '28.567200,77.325000',
        device: 'Vivo Y22', time: '17/08/2026 08:55:19 AM',
        attType: 'Check IN', faceMatched: 'No', outsideRadius: 'No', shift: 'Early Morning shift', branch: 'HO'
      },
      {
        id: 'p6', name: 'Aman Verma', coords: '28.408912,77.317790',
        device: 'Realme 11', time: '17/08/2026 08:42:03 AM',
        attType: 'Check IN', faceMatched: 'Yes', outsideRadius: 'Yes', shift: 'Afternoon shift', branch: 'Noida'
      }
    ],
    decided: [
      {
        id: 'd1', name: 'Kamal Kant Sharma', coords: '28.535516,77.391026',
        device: 'iPhone 14 Pro', time: '16/08/2026 09:05:22 AM', status: 'Approved',
        faceMatched: 'Yes', outsideRadius: 'No', actionRemark: '--', userRemark: '--',
        attType: 'Check In', shift: 'Normal Routine', branch: 'HO'
      },
      {
        id: 'd2', name: 'Kuldeep Tyagi', coords: '28.613939,77.209021',
        device: 'Samsung S23', time: '16/08/2026 09:18:41 AM', status: 'Approved',
        faceMatched: 'Yes', outsideRadius: 'No', actionRemark: '--', userRemark: '--',
        attType: 'Check In', shift: 'Morning', branch: 'Delhi'
      },
      {
        id: 'd3', name: 'Saurabh Bhardwaj', coords: '28.459497,77.026638',
        device: 'Pixel 7', time: '15/08/2026 18:02:11 PM', status: 'Approved',
        faceMatched: 'No', outsideRadius: 'Yes', actionRemark: '--', userRemark: '--',
        attType: 'Check Out', shift: 'Day shift-sk', branch: 'Gurgaon'
      },
      {
        id: 'd4', name: 'Priya Mehta', coords: '28.704060,77.102493',
        device: 'Oppo A78', time: '15/08/2026 09:40:55 AM', status: 'Rejected',
        faceMatched: 'No', outsideRadius: 'Yes', actionRemark: '--', userRemark: '--',
        attType: 'Check In', shift: 'Morning shift', branch: 'HO'
      }
    ],
    tracking: [
      { id: 't1', session: 640, employee: 'Dev Aggarwal', client: 'ABC Pvt Ltd', startTime: '17/08/2026 10:05 AM', endTime: '17/08/2026 11:20 AM', status: 'Inactive', duration: '1h 15m', distance: '4.2', place: 'Connaught Place', visitingPerson: 'Rakesh Jain', visitingMobile: '9876543210', purpose: 'Client meeting', deviceId: 'DEV-IP13-01', startLat: 28.6315, startLng: 77.2167, endLat: 28.6328, endLng: 77.2195 },
      { id: 't2', session: 641, employee: 'Tarun Gaur', client: 'XYZ Corp', startTime: '17/08/2026 09:30 AM', endTime: '17/08/2026 10:45 AM', status: 'Inactive', duration: '1h 15m', distance: '2.8', place: 'Sector 62 Noida', visitingPerson: 'Neha Kapoor', visitingMobile: '9811122233', purpose: 'Site visit', deviceId: 'DEV-OP-CE2', startLat: 28.6270, startLng: 77.3720, endLat: 28.6295, endLng: 77.3755 },
      { id: 't3', session: 642, employee: 'Monu Kumar', client: 'Sunrise Hotels', startTime: '17/08/2026 11:00 AM', endTime: '17/08/2026 12:10 PM', status: 'Inactive', duration: '1h 10m', distance: '6.1', place: 'Gurugram Cyber Hub', visitingPerson: 'Amit Singh', visitingMobile: '9900011122', purpose: 'Follow-up', deviceId: 'DEV-RN12-09', startLat: 28.4940, startLng: 77.0880, endLat: 28.4965, endLng: 77.0910 },
      { id: 't4', session: 643, employee: 'SONIYA KASHYAP', client: 'Legal Aid Co', startTime: '16/08/2026 02:15 PM', endTime: '16/08/2026 03:40 PM', status: 'Inactive', duration: '1h 25m', distance: '3.5', place: 'Saket Court', visitingPerson: 'Advocate Mehra', visitingMobile: '9876501234', purpose: 'Document pickup', deviceId: 'DEV-SG-A14', startLat: 28.5245, startLng: 77.2065, endLat: 28.5260, endLng: 77.2090 },
      { id: 't5', session: 644, employee: 'Riya Sharma', client: 'Metro Infra', startTime: '16/08/2026 10:00 AM', endTime: '16/08/2026 11:30 AM', status: 'Inactive', duration: '1h 30m', distance: '8.0', place: 'Dwarka Sec 21', visitingPerson: 'Vikas Malhotra', visitingMobile: '9123456780', purpose: 'Inspection', deviceId: 'DEV-VY22', startLat: 28.5525, startLng: 77.0585, endLat: 28.5550, endLng: 77.0620 },
      { id: 't6', session: 645, employee: 'Aman Verma', client: 'Cloud Desk', startTime: '16/08/2026 04:00 PM', endTime: '16/08/2026 05:05 PM', status: 'Inactive', duration: '1h 05m', distance: '1.2', place: 'HO Office', visitingPerson: 'Admin Desk', visitingMobile: '9999988888', purpose: 'Internal', deviceId: 'DEV-RM11', startLat: 28.5355, startLng: 77.3910, endLat: 28.5362, endLng: 77.3920 },
      { id: 't7', session: 651, employee: 'Kamal Kant Sharma', client: 'Pinnacle Soft', startTime: '15/08/2026 09:45 AM', endTime: '15/08/2026 11:00 AM', status: 'Inactive', duration: '1h 15m', distance: '5.4', place: 'Okhla Phase 3', visitingPerson: 'Suresh Rao', visitingMobile: '9765432100', purpose: 'Demo', deviceId: 'DEV-IP14P', startLat: 28.67322, startLng: 77.44186, endLat: 28.67335, endLng: 77.44205 },
      { id: 't8', session: 647, employee: 'Kuldeep Tyagi', client: 'Green Farm Co', startTime: '15/08/2026 01:20 PM', endTime: '15/08/2026 02:50 PM', status: 'Inactive', duration: '1h 30m', distance: '12.3', place: 'Faridabad', visitingPerson: 'Anjali Gupta', visitingMobile: '9654321098', purpose: 'Audit', deviceId: 'DEV-SS23', startLat: 28.4089, startLng: 77.3178, endLat: 28.4120, endLng: 77.3220 },
      { id: 't9', session: 648, employee: 'Saurabh Bhardwaj', client: 'Nest Realty', startTime: '14/08/2026 11:10 AM', endTime: '14/08/2026 12:25 PM', status: 'Inactive', duration: '1h 15m', distance: '7.7', place: 'Greater Kailash', visitingPerson: 'Rohit Khanna', visitingMobile: '9543210987', purpose: 'Property visit', deviceId: 'DEV-PX7', startLat: 28.5480, startLng: 77.2420, endLat: 28.5505, endLng: 77.2455 },
      { id: 't10', session: 649, employee: 'Priya Mehta', client: 'Bright Schools', startTime: '14/08/2026 09:00 AM', endTime: '14/08/2026 10:20 AM', status: 'Inactive', duration: '1h 20m', distance: '4.9', place: 'Lajpat Nagar', visitingPerson: 'Principal Sen', visitingMobile: '9432109876', purpose: 'Orientation', deviceId: 'DEV-OA78', startLat: 28.5675, startLng: 77.2430, endLat: 28.5690, endLng: 77.2460 },
      { id: 't11', session: 650, employee: 'Rahul Sharma', client: 'Orbit Logistics', startTime: '13/08/2026 03:30 PM', endTime: '13/08/2026 04:45 PM', status: 'Inactive', duration: '1h 15m', distance: '9.1', place: 'Okhla ICD', visitingPerson: 'Deepak Nair', visitingMobile: '9321098765', purpose: 'Dispatch check', deviceId: 'DEV-IP12', startLat: 28.5350, startLng: 77.2750, endLat: 28.5380, endLng: 77.2790 },
      { id: 't12', session: 652, employee: 'Neha Kapoor', client: 'Urban Care', startTime: '13/08/2026 10:40 AM', endTime: '13/08/2026 11:55 AM', status: 'Inactive', duration: '1h 15m', distance: '3.0', place: 'Karol Bagh', visitingPerson: 'Meera Joshi', visitingMobile: '9210987654', purpose: 'Support call', deviceId: 'DEV-MI11', startLat: 28.6510, startLng: 77.1905, endLat: 28.6525, endLng: 77.1930 },
      { id: 't13', session: 653, employee: 'Vikas Malhotra', client: 'Delta Foods', startTime: '12/08/2026 02:00 PM', endTime: '12/08/2026 03:30 PM', status: 'Inactive', duration: '1h 30m', distance: '11.5', place: 'Ghaziabad', visitingPerson: 'Karan Sethi', visitingMobile: '9109876543', purpose: 'Sample delivery', deviceId: 'DEV-SG-M31', startLat: 28.6692, startLng: 77.4538, endLat: 28.6720, endLng: 77.4580 },
      { id: 't14', session: 654, employee: 'Anjali Gupta', client: 'Skyline Builders', startTime: '12/08/2026 09:15 AM', endTime: '12/08/2026 10:50 AM', status: 'Inactive', duration: '1h 35m', distance: '15.2', place: 'Noida Ext', visitingPerson: 'Site Engineer', visitingMobile: '9098765432', purpose: 'Site survey', deviceId: 'DEV-VN20', startLat: 28.5800, startLng: 77.4100, endLat: 28.5840, endLng: 77.4150 }
    ]
  };

  var routeMap = null;
  var routeLayer = null;

  var els = {
    dynamic: document.getElementById('aaDynamic'),
    tabs: Array.prototype.slice.call(document.querySelectorAll('.aa-tab')),
    topCheckIn: document.getElementById('aaTopCheckInBtn'),
    topClock: document.getElementById('aaTopClock'),
    routeModal: document.getElementById('aaRouteModal'),
    routeTitle: document.getElementById('aaRouteTitle'),
    routeEmployee: document.getElementById('aaRouteEmployee'),
    routeMapEl: document.getElementById('aaRouteMap'),
    routeGmaps: document.getElementById('aaRouteGmaps'),
    photosModal: document.getElementById('aaPhotosModal'),
    photosTitle: document.getElementById('aaPhotosTitle'),
    photosEvents: document.getElementById('aaPhotosEvents'),
    photosEmpty: document.getElementById('aaPhotosEmpty'),
    photosGrid: document.getElementById('aaPhotosGrid')
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
    setTimeout(function () { el.remove(); }, 3200);
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function formatClock(d) {
    return pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function initials(name) {
    var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function photoColor(name) {
    var s = String(name || '');
    var h = 0;
    for (var i = 0; i < s.length; i++) h = (h + s.charCodeAt(i) * (i + 1)) % PHOTO_COLORS.length;
    return PHOTO_COLORS[h];
  }

  function selectedCount() {
    return Object.keys(state.selected).filter(function (k) { return state.selected[k]; }).length;
  }

  function employeeOptions(extra) {
    var map = {};
    state.pending.concat(state.decided).forEach(function (r) { if (r.name) map[r.name] = true; });
    state.tracking.forEach(function (r) { if (r.employee) map[r.employee] = true; });
    if (extra) extra.forEach(function (n) { if (n) map[n] = true; });
    return Object.keys(map).sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  }

  function branchOptionsHtml() {
    var opts = ['<option value="">Select Branch</option>'];
    BRANCHES.forEach(function (b) {
      var sel = state.filters.branch === b ? ' selected' : '';
      opts.push('<option value="' + escapeHtml(b) + '"' + sel + '>' + escapeHtml(b) + '</option>');
    });
    return opts.join('');
  }

  function employeeOptionsHtml(placeholder) {
    var opts = ['<option value="">' + escapeHtml(placeholder || 'Select Employee') + '</option>'];
    employeeOptions().forEach(function (n) {
      var sel = state.filters.employee === n ? ' selected' : '';
      opts.push('<option value="' + escapeHtml(n) + '"' + sel + '>' + escapeHtml(n) + '</option>');
    });
    return opts.join('');
  }

  function teamOptionsHtml() {
    var opts = ['<option value="">Select Team</option>'];
    TEAMS.forEach(function (t) {
      var sel = state.filters.team === t ? ' selected' : '';
      opts.push('<option value="' + escapeHtml(t) + '"' + sel + '>' + escapeHtml(t) + '</option>');
    });
    return opts.join('');
  }

  function dateRangeHtml(placeholderMode) {
    var start = state.filters.startDate;
    var end = state.filters.endDate;
    var has = !!(start || end);
    var startPh = placeholderMode === 'short' ? 'S' : 'Start date';
    var endPh = placeholderMode === 'short' ? 'E' : 'End date';
    var label = has
      ? (start || startPh) + ' → ' + (end || endPh)
      : (placeholderMode === 'short' ? 'S → E' : 'Start date → End date');
    return '<div class="aa-daterange' + (has ? ' has-value' : '') + '" data-aa="daterange" title="' + escapeHtml(label) + '">' +
      '<input type="date" data-aa="startDate" value="' + escapeHtml(start) + '" aria-label="Start date">' +
      '<span class="aa-daterange__sep">→</span>' +
      '<input type="date" data-aa="endDate" value="' + escapeHtml(end) + '" aria-label="End date">' +
      CAL_ICON +
      '</div>';
  }

  function filterListItems(items, selectedMap, search, dataAttr) {
    var q = (search || '').trim().toLowerCase();
    return items.filter(function (item) {
      return !q || item.toLowerCase().indexOf(q) !== -1;
    }).map(function (item) {
      var checked = selectedMap[item] ? ' checked' : '';
      return '<li><label><input type="checkbox" data-aa="' + dataAttr + '" value="' + escapeHtml(item) + '"' + checked + '> ' +
        escapeHtml(item) + '</label></li>';
    }).join('') || '<li style="color:#bfbfbf;cursor:default">No matches</li>';
  }

  function pendingFilterPopover() {
    var shiftOpen = state.filterAcc.shift ? ' is-open' : '';
    var attOpen = state.filterAcc.attType ? ' is-open' : '';
    return '<div class="aa-filter-wrap">' +
      '<button type="button" class="aa-icon-btn' + (state.filterOpen ? ' is-open' : '') + '" data-aa="filterToggle" aria-label="Filter" aria-expanded="' + (state.filterOpen ? 'true' : 'false') + '">' + FILTER_ICON + '</button>' +
      '<div class="aa-filter-pop' + (state.filterOpen ? ' is-open' : '') + '" id="aaFilterPop" role="dialog" aria-label="Filter">' +
        '<div class="aa-filter-pop__head"><h3 class="aa-filter-pop__title">Filter</h3>' +
          '<button type="button" class="aa-filter-pop__reset" data-aa="filterReset">Reset</button></div>' +
        '<div class="aa-filter-acc' + shiftOpen + '">' +
          '<button type="button" class="aa-filter-acc__btn" data-aa="acc" data-acc="shift">Shift ' + CHEV_ICON + '</button>' +
          '<div class="aa-filter-acc__body">' +
            '<input type="search" class="aa-filter-search" data-aa="shiftSearch" placeholder="Select Shift" value="' + escapeHtml(state.shiftSearch) + '">' +
            '<ul class="aa-filter-list">' + filterListItems(SHIFTS, state.filters.shifts, state.shiftSearch, 'shift') + '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="aa-filter-acc' + attOpen + '">' +
          '<button type="button" class="aa-filter-acc__btn" data-aa="acc" data-acc="attType">Attendance Type ' + CHEV_ICON + '</button>' +
          '<div class="aa-filter-acc__body">' +
            '<ul class="aa-filter-list">' + filterListItems(ATT_TYPES, state.filters.attTypes, '', 'attType') + '</ul>' +
          '</div>' +
        '</div>' +
      '</div></div>';
  }

  function decidedFilterPopover() {
    var statusOpen = state.filterAcc.status ? ' is-open' : '';
    var attOpen = state.filterAcc.attType ? ' is-open' : '';
    return '<div class="aa-filter-wrap">' +
      '<button type="button" class="aa-icon-btn' + (state.filterOpen ? ' is-open' : '') + '" data-aa="filterToggle" aria-label="Filter" aria-expanded="' + (state.filterOpen ? 'true' : 'false') + '">' + FILTER_ICON + '</button>' +
      '<div class="aa-filter-pop' + (state.filterOpen ? ' is-open' : '') + '" id="aaFilterPop" role="dialog" aria-label="Filter">' +
        '<div class="aa-filter-pop__head"><h3 class="aa-filter-pop__title">Filter</h3>' +
          '<button type="button" class="aa-filter-pop__reset" data-aa="filterReset">Reset</button></div>' +
        '<div class="aa-filter-acc' + statusOpen + '">' +
          '<button type="button" class="aa-filter-acc__btn" data-aa="acc" data-acc="status">Status ' + CHEV_ICON + '</button>' +
          '<div class="aa-filter-acc__body">' +
            '<input type="search" class="aa-filter-search" data-aa="statusSearch" placeholder="Search status" value="' + escapeHtml(state.statusSearch) + '">' +
            '<ul class="aa-filter-list">' + filterListItems(STATUSES, state.filters.statuses, state.statusSearch, 'status') + '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="aa-filter-acc' + attOpen + '">' +
          '<button type="button" class="aa-filter-acc__btn" data-aa="acc" data-acc="attType">Attendance Type ' + CHEV_ICON + '</button>' +
          '<div class="aa-filter-acc__body">' +
            '<ul class="aa-filter-list">' + filterListItems(ATT_TYPES, state.filters.attTypes, '', 'attType') + '</ul>' +
          '</div>' +
        '</div>' +
      '</div></div>';
  }

  function excelBtn() {
    return '<button type="button" class="aa-icon-btn aa-icon-btn--excel" data-aa="excel" aria-label="Export Excel">' + EXCEL_ICON + '</button>';
  }

  function matchAttType(rowType, selected) {
    var keys = Object.keys(selected).filter(function (k) { return selected[k]; });
    if (!keys.length) return true;
    var norm = String(rowType || '').toLowerCase().replace(/\s+/g, '');
    return keys.some(function (k) {
      return norm === String(k).toLowerCase().replace(/\s+/g, '');
    });
  }

  function filteredPending() {
    return state.pending.filter(function (r) {
      if (state.filters.branch && r.branch !== state.filters.branch) return false;
      if (state.filters.employee && r.name !== state.filters.employee) return false;
      var shiftKeys = Object.keys(state.filters.shifts).filter(function (k) { return state.filters.shifts[k]; });
      if (shiftKeys.length && shiftKeys.indexOf(r.shift) === -1) return false;
      if (!matchAttType(r.attType, state.filters.attTypes)) return false;
      if (state.idealEmployees && r.outsideRadius === 'Yes') return false;
      return true;
    });
  }

  function filteredDecided() {
    return state.decided.filter(function (r) {
      if (state.filters.branch && r.branch !== state.filters.branch) return false;
      if (state.filters.employee && r.name !== state.filters.employee) return false;
      var statusKeys = Object.keys(state.filters.statuses).filter(function (k) { return state.filters.statuses[k]; });
      if (statusKeys.length && statusKeys.indexOf(r.status) === -1) return false;
      if (!matchAttType(r.attType, state.filters.attTypes)) return false;
      return true;
    });
  }

  function filteredTracking() {
    return state.tracking.filter(function (r) {
      if (state.filters.employee && r.employee !== state.filters.employee) return false;
      return true;
    });
  }

  function photoHtml(name) {
    return '<div class="aa-card__photo" style="background:' + photoColor(name) + '" aria-hidden="true">' +
      escapeHtml(initials(name)) + '</div>';
  }

  function pendingCardHtml(row) {
    var checked = state.selected[row.id] ? ' checked' : '';
    var selClass = state.selected[row.id] ? ' is-selected' : '';
    return '<article class="aa-card' + selClass + '" data-id="' + escapeHtml(row.id) + '">' +
      '<input type="checkbox" class="aa-card__check" data-aa="select" data-id="' + escapeHtml(row.id) + '" aria-label="Select ' + escapeHtml(row.name) + '"' + checked + '>' +
      '<div class="aa-card__body">' + photoHtml(row.name) +
        '<div class="aa-card__info">' +
          '<h3 class="aa-card__name">' + escapeHtml(row.name) + '</h3>' +
          '<dl class="aa-card__meta">' +
            '<div class="aa-row"><dt>Coordinates</dt><dd><a class="aa-coord" href="https://www.google.com/maps?q=' + encodeURIComponent(row.coords) + '" target="_blank" rel="noopener">' + escapeHtml(row.coords) + '</a></dd></div>' +
            '<div class="aa-row"><dt>Device Name</dt><dd>' + escapeHtml(row.device) + '</dd></div>' +
            '<div class="aa-row"><dt>Time</dt><dd>' + escapeHtml(row.time) + '</dd></div>' +
            '<div class="aa-row"><dt>Attendance Type</dt><dd>' + escapeHtml(row.attType) + '</dd></div>' +
            '<div class="aa-row"><dt>Face Matched</dt><dd>' + escapeHtml(row.faceMatched) + '</dd></div>' +
            '<div class="aa-row"><dt>Outside Radius</dt><dd>' + escapeHtml(row.outsideRadius) + '</dd></div>' +
          '</dl>' +
        '</div>' +
      '</div>' +
      '<div class="aa-card__footer">' +
        '<button type="button" data-aa="approve" data-id="' + escapeHtml(row.id) + '">Approve</button>' +
        '<button type="button" data-aa="reject" data-id="' + escapeHtml(row.id) + '">Reject</button>' +
      '</div>' +
    '</article>';
  }

  function decidedCardHtml(row) {
    var badgeCls = row.status === 'Rejected' ? 'aa-badge aa-badge--rejected' : 'aa-badge aa-badge--approved';
    return '<article class="aa-card" data-id="' + escapeHtml(row.id) + '">' +
      '<div class="aa-card__body">' + photoHtml(row.name) +
        '<div class="aa-card__info">' +
          '<h3 class="aa-card__name">' + escapeHtml(row.name) + '</h3>' +
          '<dl class="aa-card__meta">' +
            '<div class="aa-row"><dt>Coordinates</dt><dd><a class="aa-coord" href="https://www.google.com/maps?q=' + encodeURIComponent(row.coords) + '" target="_blank" rel="noopener">' + escapeHtml(row.coords) + '</a></dd></div>' +
            '<div class="aa-row"><dt>Device Name</dt><dd>' + escapeHtml(row.device) + '</dd></div>' +
            '<div class="aa-row"><dt>Status</dt><dd><span class="' + badgeCls + '">' + escapeHtml(row.status) + '</span></dd></div>' +
            '<div class="aa-row"><dt>Time</dt><dd>' + escapeHtml(row.time) + '</dd></div>' +
            '<div class="aa-row"><dt>Face Matched</dt><dd>' + escapeHtml(row.faceMatched) + '</dd></div>' +
            '<div class="aa-row"><dt>Outside Radius</dt><dd>' + escapeHtml(row.outsideRadius) + '</dd></div>' +
            '<div class="aa-row"><dt>Action Remark</dt><dd>' + escapeHtml(row.actionRemark || '--') + '</dd></div>' +
            '<div class="aa-row"><dt>User Remark</dt><dd>' + escapeHtml(row.userRemark || '--') + '</dd></div>' +
            '<div class="aa-row"><dt>Attendance Type</dt><dd>' + escapeHtml(row.attType) + '</dd></div>' +
          '</dl>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function paginationHtml(page, pageSize, total) {
    var totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
    var showing = Math.min(pageSize, Math.max(0, total - (page - 1) * pageSize));
    return '<footer class="aa-pagination" aria-label="Table pagination">' +
      '<div class="aa-pagination__left">' +
        '<label class="aa-sr-only" for="aaPageSize">Rows per page</label>' +
        '<select id="aaPageSize" class="aa-page-size" data-aa="pageSize" aria-label="Rows per page">' +
          '<option value="10"' + (pageSize === 10 ? ' selected' : '') + '>10</option>' +
          '<option value="20"' + (pageSize === 20 ? ' selected' : '') + '>20</option>' +
          '<option value="25"' + (pageSize === 25 ? ' selected' : '') + '>25</option>' +
          '<option value="50"' + (pageSize === 50 ? ' selected' : '') + '>50</option>' +
        '</select>' +
      '</div>' +
      '<div class="aa-pagination__center">' +
        '<button type="button" class="aa-page-nav" data-aa="prev" aria-label="Previous page"' + (page <= 1 ? ' disabled' : '') + '>' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>' +
        '<input type="text" class="aa-page-input" value="' + page + '" aria-label="Current page" readonly>' +
        '<span class="aa-page-of">of <span id="aaPageTotal">' + totalPages + '</span></span>' +
        '<button type="button" class="aa-page-nav" data-aa="next" aria-label="Next page"' + (page >= totalPages || total === 0 ? ' disabled' : '') + '>' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>' +
      '</div>' +
      '<div class="aa-pagination__right"><span class="aa-count">' + showing + '/' + total + '</span></div>' +
    '</footer>';
  }

  function renderPending() {
    var rows = filteredPending();
    var count = selectedCount();
    var disabled = count < 1 ? ' disabled' : '';
    var allIds = rows.map(function (r) { return r.id; });
    var allChecked = allIds.length > 0 && allIds.every(function (id) { return !!state.selected[id]; });
    var html = '<section class="aa-panel" aria-label="Pending CheckIn">' +
      '<div class="aa-toolbar">' +
        '<div class="aa-toolbar__group">' +
          '<label class="aa-select-all"><input type="checkbox" data-aa="selectAll"' + (allChecked ? ' checked' : '') + '> Select All</label>' +
          '<button type="button" class="aa-bulk-btn aa-bulk-btn--approve" data-aa="bulkApprove"' + disabled + '>Approve</button>' +
          '<button type="button" class="aa-bulk-btn aa-bulk-btn--reject" data-aa="bulkReject"' + disabled + '>Reject</button>' +
          '<span class="aa-ideal">Ideal Employees' +
            '<label class="aa-switch"><input type="checkbox" data-aa="ideal"' + (state.idealEmployees ? ' checked' : '') + '>' +
            '<span class="aa-switch__track"></span></label></span>' +
        '</div>' +
        '<div class="aa-toolbar__group">' +
          '<select class="aa-select" data-aa="branch" aria-label="Select Branch">' + branchOptionsHtml() + '</select>' +
          dateRangeHtml('short') +
          '<select class="aa-select" data-aa="employee" aria-label="Select Employee">' + employeeOptionsHtml() + '</select>' +
          pendingFilterPopover() +
          excelBtn() +
        '</div>' +
      '</div>' +
      '<div class="aa-cards">' +
        (rows.length ? rows.map(pendingCardHtml).join('') : '<div class="aa-empty">' + EMPTY_ICON + '</div>') +
      '</div>' +
    '</section>';
    els.dynamic.innerHTML = html;
  }

  function renderDecided() {
    var rows = filteredDecided();
    var html = '<section class="aa-panel" aria-label="Approved/Rejected CheckIn">' +
      '<div class="aa-toolbar">' +
        '<div class="aa-toolbar__group">' +
          '<select class="aa-select" data-aa="branch" aria-label="Select Branch">' + branchOptionsHtml() + '</select>' +
          dateRangeHtml('full') +
          '<select class="aa-select" data-aa="employee" aria-label="Select Employee">' + employeeOptionsHtml() + '</select>' +
          decidedFilterPopover() +
          excelBtn() +
        '</div>' +
      '</div>' +
      '<div class="aa-cards">' +
        (rows.length ? rows.map(decidedCardHtml).join('') : '<div class="aa-empty">' + EMPTY_ICON + '</div>') +
      '</div>' +
    '</section>';
    els.dynamic.innerHTML = html;
  }

  function renderTracking() {
    var rows = filteredTracking();
    var total = rows.length;
    var totalPages = Math.max(1, Math.ceil(total / state.trackPageSize) || 1);
    if (state.trackPage > totalPages) state.trackPage = totalPages;
    var start = (state.trackPage - 1) * state.trackPageSize;
    var pageRows = rows.slice(start, start + state.trackPageSize);

    var head = TRACK_COLS.map(function (c) {
      return '<th scope="col">' + escapeHtml(c.label) + '</th>';
    }).join('');

    var body = pageRows.map(function (r) {
      return '<tr data-id="' + escapeHtml(r.id) + '">' +
        '<td>' + escapeHtml(r.employee) + '</td>' +
        '<td>' + escapeHtml(r.client) + '</td>' +
        '<td>' + escapeHtml(r.startTime) + '</td>' +
        '<td>' + escapeHtml(r.endTime) + '</td>' +
        '<td><span class="aa-badge aa-badge--inactive">' + escapeHtml(r.status) + '</span></td>' +
        '<td>' + escapeHtml(r.duration) + '</td>' +
        '<td>' + escapeHtml(r.distance) + '</td>' +
        '<td>' + escapeHtml(r.place) + '</td>' +
        '<td>' + escapeHtml(r.visitingPerson) + '</td>' +
        '<td>' + escapeHtml(r.visitingMobile) + '</td>' +
        '<td>' + escapeHtml(r.purpose) + '</td>' +
        '<td>' + escapeHtml(r.deviceId) + '</td>' +
        '<td><div class="aa-actions">' +
          '<button type="button" class="aa-link" data-aa="viewMap" data-id="' + escapeHtml(r.id) + '">View map</button>' +
          '<button type="button" class="aa-link" data-aa="viewPhotos" data-id="' + escapeHtml(r.id) + '">View photos</button>' +
        '</div></td>' +
      '</tr>';
    }).join('');

    var html = '<section class="aa-panel" aria-label="Employee Tracking">' +
      '<div class="aa-toolbar">' +
        '<div class="aa-toolbar__group">' +
          dateRangeHtml('full') +
          '<select class="aa-select" data-aa="employee" aria-label="Select Employee">' + employeeOptionsHtml() + '</select>' +
          '<select class="aa-select" data-aa="branch" aria-label="Select Branch">' + branchOptionsHtml() + '</select>' +
          '<select class="aa-select aa-select--sm" data-aa="team" aria-label="Select Team">' + teamOptionsHtml() + '</select>' +
          excelBtn() +
        '</div>' +
      '</div>' +
      '<div class="aa-table-wrap">' +
        '<table class="aa-table"><thead><tr>' + head + '</tr></thead><tbody>' +
          (pageRows.length ? body : '<tr><td colspan="' + TRACK_COLS.length + '"><div class="aa-empty">' + EMPTY_ICON + '</div></td></tr>') +
        '</tbody></table>' +
      '</div>' +
      paginationHtml(state.trackPage, state.trackPageSize, total) +
    '</section>';
    els.dynamic.innerHTML = html;
  }

  function renderTab() {
    state.filterOpen = false;
    if (state.tab === 'pending') renderPending();
    else if (state.tab === 'decided') renderDecided();
    else renderTracking();
  }

  function findPending(id) {
    for (var i = 0; i < state.pending.length; i++) {
      if (String(state.pending[i].id) === String(id)) return { row: state.pending[i], index: i };
    }
    return null;
  }

  function moveToDecided(row, decision) {
    state.decided.unshift({
      id: 'd-' + row.id + '-' + Date.now(),
      name: row.name,
      coords: row.coords,
      device: row.device,
      time: row.time,
      status: decision,
      faceMatched: row.faceMatched,
      outsideRadius: row.outsideRadius,
      actionRemark: '--',
      userRemark: '--',
      attType: row.attType === 'Check IN' ? 'Check In' : (row.attType === 'Check OUT' ? 'Check Out' : row.attType),
      shift: row.shift,
      branch: row.branch
    });
  }

  function decideOne(id, decision) {
    var found = findPending(id);
    if (!found) return false;
    state.pending.splice(found.index, 1);
    delete state.selected[id];
    moveToDecided(found.row, decision);
    return found.row;
  }

  function decideBulk(decision) {
    var ids = Object.keys(state.selected).filter(function (k) { return state.selected[k]; });
    if (!ids.length) return;
    var moved = 0;
    ids.forEach(function (id) {
      if (decideOne(id, decision)) moved += 1;
    });
    state.selected = {};
    renderTab();
    toast(decision === 'Approved' ? 'Approved' : 'Rejected', moved + ' check-in(s) marked as ' + decision + '.');
  }

  function resetFilters() {
    state.filters.shifts = {};
    state.filters.attTypes = {};
    state.filters.statuses = {};
    state.shiftSearch = '';
    state.statusSearch = '';
    state.filterOpen = true;
    renderTab();
    state.filterOpen = true;
    var pop = document.getElementById('aaFilterPop');
    var btn = els.dynamic.querySelector('[data-aa="filterToggle"]');
    if (pop) pop.classList.add('is-open');
    if (btn) btn.classList.add('is-open');
  }

  function setTab(tabId) {
    if (tabId !== 'pending' && tabId !== 'decided' && tabId !== 'tracking') return;
    state.tab = tabId;
    state.selected = {};
    state.filterOpen = false;
    state.trackPage = 1;
    els.tabs.forEach(function (tab) {
      var on = tab.getAttribute('data-tab') === tabId;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderTab();
  }

  function updateCheckInBtn() {
    if (!els.topCheckIn) return;
    if (state.checkedIn) {
      els.topCheckIn.textContent = 'Check Out';
      els.topCheckIn.classList.remove('is-in');
    } else {
      els.topCheckIn.textContent = 'Check In';
      els.topCheckIn.classList.add('is-in');
    }
  }

  function toggleCheckIn() {
    state.checkedIn = !state.checkedIn;
    toast(state.checkedIn ? 'Checked in' : 'Checked out', state.checkedIn ? 'You have checked in successfully.' : 'You have checked out successfully.');
    updateCheckInBtn();
  }

  function tickClock() {
    if (!els.topClock) return;
    var now = new Date();
    els.topClock.textContent = formatClock(now);
    els.topClock.setAttribute('datetime', now.toISOString());
  }

  function bindDynamic(e) {
    var t = e.target;
    if (!t) return;

    var filterToggle = t.closest('[data-aa="filterToggle"]');
    if (filterToggle) {
      state.filterOpen = !state.filterOpen;
      var pop = document.getElementById('aaFilterPop');
      if (pop) pop.classList.toggle('is-open', state.filterOpen);
      filterToggle.classList.toggle('is-open', state.filterOpen);
      filterToggle.setAttribute('aria-expanded', state.filterOpen ? 'true' : 'false');
      return;
    }

    var acc = t.closest('[data-aa="acc"]');
    if (acc) {
      var key = acc.getAttribute('data-acc');
      state.filterAcc[key] = !state.filterAcc[key];
      var keepOpen = state.filterOpen;
      renderTab();
      state.filterOpen = keepOpen;
      var pop2 = document.getElementById('aaFilterPop');
      var btn2 = els.dynamic.querySelector('[data-aa="filterToggle"]');
      if (pop2) pop2.classList.toggle('is-open', keepOpen);
      if (btn2) btn2.classList.toggle('is-open', keepOpen);
      return;
    }

    if (t.getAttribute('data-aa') === 'filterReset' || t.closest('[data-aa="filterReset"]')) {
      resetFilters();
      toast('Filters reset', 'Shift, status, and attendance type filters cleared.');
      return;
    }

    if (t.getAttribute('data-aa') === 'excel' || t.closest('[data-aa="excel"]')) {
      toast('Export Excel', 'Preparing attendance export…');
      return;
    }

    var approve = t.closest('[data-aa="approve"]');
    if (approve) {
      var row = decideOne(approve.getAttribute('data-id'), 'Approved');
      if (row) {
        renderTab();
        toast('Approved', escapeHtml(row.name) + ' check-in approved.');
      }
      return;
    }

    var reject = t.closest('[data-aa="reject"]');
    if (reject) {
      var rowR = decideOne(reject.getAttribute('data-id'), 'Rejected');
      if (rowR) {
        renderTab();
        toast('Rejected', escapeHtml(rowR.name) + ' check-in rejected.');
      }
      return;
    }

    if (t.closest('[data-aa="bulkApprove"]')) {
      decideBulk('Approved');
      return;
    }
    if (t.closest('[data-aa="bulkReject"]')) {
      decideBulk('Rejected');
      return;
    }

    if (t.closest('[data-aa="viewMap"]')) {
      openRouteModal(t.closest('[data-aa="viewMap"]').getAttribute('data-id'));
      return;
    }
    if (t.closest('[data-aa="viewPhotos"]')) {
      openPhotosModal(t.closest('[data-aa="viewPhotos"]').getAttribute('data-id'));
      return;
    }

    if (t.closest('[data-aa="prev"]')) {
      if (state.trackPage > 1) { state.trackPage -= 1; renderTab(); }
      return;
    }
    if (t.closest('[data-aa="next"]')) {
      var totalPages = Math.max(1, Math.ceil(filteredTracking().length / state.trackPageSize) || 1);
      if (state.trackPage < totalPages) { state.trackPage += 1; renderTab(); }
      return;
    }
  }

  function bindDynamicChange(e) {
    var t = e.target;
    if (!t) return;

    if (t.getAttribute('data-aa') === 'selectAll') {
      var rows = filteredPending();
      rows.forEach(function (r) {
        if (t.checked) state.selected[r.id] = true;
        else delete state.selected[r.id];
      });
      renderTab();
      return;
    }

    if (t.getAttribute('data-aa') === 'select') {
      var id = t.getAttribute('data-id');
      if (t.checked) state.selected[id] = true;
      else delete state.selected[id];
      renderTab();
      return;
    }

    if (t.getAttribute('data-aa') === 'ideal') {
      state.idealEmployees = !!t.checked;
      renderTab();
      return;
    }

    if (t.getAttribute('data-aa') === 'branch') {
      state.filters.branch = t.value || '';
      renderTab();
      return;
    }
    if (t.getAttribute('data-aa') === 'employee') {
      state.filters.employee = t.value || '';
      state.trackPage = 1;
      renderTab();
      return;
    }
    if (t.getAttribute('data-aa') === 'team') {
      state.filters.team = t.value || '';
      renderTab();
      return;
    }
    if (t.getAttribute('data-aa') === 'startDate') {
      state.filters.startDate = t.value || '';
      return;
    }
    if (t.getAttribute('data-aa') === 'endDate') {
      state.filters.endDate = t.value || '';
      return;
    }
    if (t.getAttribute('data-aa') === 'pageSize') {
      state.trackPageSize = parseInt(t.value, 10) || 10;
      state.trackPage = 1;
      renderTab();
      return;
    }

    if (t.getAttribute('data-aa') === 'shift') {
      if (t.checked) state.filters.shifts[t.value] = true;
      else delete state.filters.shifts[t.value];
      return;
    }
    if (t.getAttribute('data-aa') === 'attType') {
      if (t.checked) state.filters.attTypes[t.value] = true;
      else delete state.filters.attTypes[t.value];
      return;
    }
    if (t.getAttribute('data-aa') === 'status') {
      if (t.checked) state.filters.statuses[t.value] = true;
      else delete state.filters.statuses[t.value];
      return;
    }
  }

  function bindDynamicInput(e) {
    var t = e.target;
    if (!t) return;
    if (t.getAttribute('data-aa') === 'shiftSearch') {
      state.shiftSearch = t.value || '';
      var keep = state.filterOpen;
      var list = t.closest('.aa-filter-acc__body');
      if (list) {
        var ul = list.querySelector('.aa-filter-list');
        if (ul) ul.innerHTML = filterListItems(SHIFTS, state.filters.shifts, state.shiftSearch, 'shift');
      }
      state.filterOpen = keep;
      return;
    }
    if (t.getAttribute('data-aa') === 'statusSearch') {
      state.statusSearch = t.value || '';
      var list2 = t.closest('.aa-filter-acc__body');
      if (list2) {
        var ul2 = list2.querySelector('.aa-filter-list');
        if (ul2) ul2.innerHTML = filterListItems(STATUSES, state.filters.statuses, state.statusSearch, 'status');
      }
      return;
    }
  }

  function findTracking(id) {
    for (var i = 0; i < state.tracking.length; i++) {
      if (state.tracking[i].id === id) return state.tracking[i];
    }
    return null;
  }

  function routeDotIcon(kind) {
    return window.L.divIcon({
      className: '',
      html: '<div class="aa-route-dot aa-route-dot--' + kind + '"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });
  }

  function destroyRouteMap() {
    if (routeMap) {
      routeMap.remove();
      routeMap = null;
      routeLayer = null;
    }
    if (els.routeMapEl) els.routeMapEl.innerHTML = '';
  }

  function closeRouteModal() {
    if (!els.routeModal) return;
    els.routeModal.hidden = true;
    document.body.style.overflow = '';
    destroyRouteMap();
  }

  function renderRouteMap(row) {
    if (!els.routeMapEl || !window.L) return;
    destroyRouteMap();

    var start = [row.startLat, row.startLng];
    var end = [row.endLat, row.endLng];
    routeMap = window.L.map(els.routeMapEl, { zoomControl: true, attributionControl: true });
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(routeMap);

    routeLayer = window.L.featureGroup();
    window.L.marker(start, { icon: routeDotIcon('start'), title: 'Start' }).addTo(routeLayer);
    window.L.marker(end, { icon: routeDotIcon('end'), title: 'End' }).addTo(routeLayer);
    if (start[0] !== end[0] || start[1] !== end[1]) {
      window.L.polyline([start, end], { color: '#25b7a7', weight: 3, opacity: 0.85 }).addTo(routeLayer);
    }
    routeLayer.addTo(routeMap);
    routeMap.fitBounds(routeLayer.getBounds().pad(0.35));
    setTimeout(function () { if (routeMap) routeMap.invalidateSize(); }, 60);
  }

  function openRouteModal(id) {
    var row = findTracking(id);
    if (!row || !els.routeModal) {
      toast('View map', 'Route not found for this visit.');
      return;
    }
    if (!window.L) {
      toast('View map', 'Map library failed to load. Check your network and try again.');
      return;
    }

    closePhotosModal();
    if (els.routeTitle) els.routeTitle.textContent = 'Route — Session ' + (row.session || id);
    if (els.routeEmployee) els.routeEmployee.textContent = row.employee || '—';
    if (els.routeGmaps) {
      els.routeGmaps.href = 'https://www.google.com/maps?q=' + encodeURIComponent(row.startLat + ',' + row.startLng);
    }

    els.routeModal.hidden = false;
    document.body.style.overflow = 'hidden';
    renderRouteMap(row);
  }

  function closePhotosModal() {
    if (!els.photosModal) return;
    els.photosModal.hidden = true;
    if (!els.routeModal || els.routeModal.hidden) document.body.style.overflow = '';
  }

  function openPhotosModal(id) {
    var row = findTracking(id);
    if (!row || !els.photosModal) {
      toast('View photos', 'Session not found for this visit.');
      return;
    }

    closeRouteModal();
    var photos = row.photos || [];
    var count = photos.length;
    if (els.photosTitle) els.photosTitle.textContent = 'Session photos — ' + (row.session || id);
    if (els.photosEvents) els.photosEvents.textContent = String(count);
    if (els.photosEmpty) els.photosEmpty.hidden = count > 0;
    if (els.photosGrid) {
      if (count) {
        els.photosGrid.hidden = false;
        els.photosGrid.innerHTML = photos.map(function (src) {
          return '<img src="' + escapeHtml(src) + '" alt="Session photo">';
        }).join('');
      } else {
        els.photosGrid.hidden = true;
        els.photosGrid.innerHTML = '';
      }
    }

    els.photosModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function bind() {
    els.tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { setTab(tab.getAttribute('data-tab')); });
    });

    if (els.dynamic) {
      els.dynamic.addEventListener('click', bindDynamic);
      els.dynamic.addEventListener('change', bindDynamicChange);
      els.dynamic.addEventListener('input', bindDynamicInput);
    }

    document.addEventListener('click', function (e) {
      if (!state.filterOpen) return;
      var wrap = e.target.closest('.aa-filter-wrap');
      if (wrap) return;
      state.filterOpen = false;
      var pop = document.getElementById('aaFilterPop');
      var btn = els.dynamic && els.dynamic.querySelector('[data-aa="filterToggle"]');
      if (pop) pop.classList.remove('is-open');
      if (btn) btn.classList.remove('is-open');
    });

    if (els.routeModal) {
      els.routeModal.addEventListener('click', function (e) {
        if (e.target.closest('[data-aa-route-close]')) closeRouteModal();
      });
    }
    if (els.photosModal) {
      els.photosModal.addEventListener('click', function (e) {
        if (e.target.closest('[data-aa-photos-close]')) closePhotosModal();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (els.photosModal && !els.photosModal.hidden) closePhotosModal();
      else if (els.routeModal && !els.routeModal.hidden) closeRouteModal();
    });

    if (els.topCheckIn) els.topCheckIn.addEventListener('click', toggleCheckIn);
  }

  bind();
  updateCheckInBtn();
  tickClock();
  setInterval(tickClock, 1000);
  setTab('pending');
})();
