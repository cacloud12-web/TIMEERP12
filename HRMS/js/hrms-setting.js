/**
 * TIME ERP — HRMS Setting (all tabs)
 */
(function () {
  'use strict';

  var EDIT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>';
  var DEL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M4 7h16"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/><path d="M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12"/><path d="M10 11v6M14 11v6"/></svg>';
  var EYE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  var COLS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="5" y="4" width="14" height="16" rx="1.5"/><path d="M5 9.33h14M5 14.67h14"/><path d="M8 6.85h5M8 12h5M8 17.15h5"/></svg>';
  var CARET_ICON = '<svg class="hs-icon-btn__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var PLUS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  var FILTER_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4"/></svg>';
  var EXCEL_ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 2.75h7.5L19.25 7.5V20.5a.75.75 0 01-.75.75H7a.75.75 0 01-.75-.75V3.5A.75.75 0 017 2.75z" stroke="#217346" stroke-width="1.5" stroke-linejoin="round"/><path d="M14.5 2.75V7.5h4.75" stroke="#217346" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.2 10.2l5.6 7.6M14.8 10.2l-5.6 7.6" stroke="#217346" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var REFRESH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M21 12a9 9 0 11-3-6.7"/><path d="M21 4v5h-5"/></svg>';
  var CAL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>';

  var HOLIDAY_COLS = [
    { id: 'sno', label: '#' }, { id: 'name', label: 'Holiday Name' }, { id: 'from', label: 'From Date' },
    { id: 'to', label: 'To Date' }, { id: 'optional', label: 'Optional' }, { id: 'type', label: 'Holiday Type' },
    { id: 'branch', label: 'Branch' }, { id: 'office', label: 'Office' }, { id: 'desc', label: 'Description' },
    { id: 'action', label: 'Action' }
  ];
  var SHIFT_COLS = [
    { id: 'sno', label: '#' }, { id: 'isDefault', label: 'Default Shift' }, { id: 'name', label: 'Shift Name' },
    { id: 'inTime', label: 'In Time' }, { id: 'outTime', label: 'Out Time' }, { id: 'lateIn', label: 'Late In' },
    { id: 'earlyOut', label: 'Early Out' }, { id: 'fullDay', label: 'Full-Day (Hr)' }, { id: 'halfDay', label: 'Half-Day (Hr)' },
    { id: 'fullCoff', label: 'Full-Day (C-off)' }, { id: 'halfCoff', label: 'Half-Day (C-off)' }, { id: 'action', label: 'Action' }
  ];
  var LEAVE_COLS = [
    { id: 'sno', label: '#' }, { id: 'name', label: 'Leave Name' }, { id: 'leaveFor', label: 'Leave For' },
    { id: 'abbr', label: 'Leave Abbreviation' }, { id: 'hours', label: 'Hours' }, { id: 'action', label: 'Action' }
  ];
  var BLACKLIST_COLS = [
    { id: 'sno', label: '#' }, { id: 'name', label: 'Leave Name' }, { id: 'start', label: 'Start Date' },
    { id: 'end', label: 'End Date' }, { id: 'action', label: 'Action' }
  ];
  var QUOTA_COLS = [
    { id: 'sno', label: '#' }, { id: 'leave', label: 'Leave' }, { id: 'designation', label: 'Designation' },
    { id: 'branch', label: 'Branch' }, { id: 'count', label: 'Annual Count' }, { id: 'action', label: 'Action' }
  ];
  var CLUB_COLS = [
    { id: 'sno', label: 'S. No.' }, { id: 'leave1', label: 'Leave 1' }, { id: 'leave2', label: 'Leave 2' },
    { id: 'action', label: 'Action' }
  ];
  var ATT_COLS = [
    { id: 'date', label: 'Date' }, { id: 'employee', label: 'Employee' }, { id: 'shift', label: 'Shift' },
    { id: 'code', label: 'Employee Code' }, { id: 'branch', label: 'Branch' }, { id: 'office', label: 'Office' },
    { id: 'inTime', label: 'In Time' }, { id: 'outTime', label: 'Out Time' }, { id: 'checkIn', label: 'Check In' },
    { id: 'checkOut', label: 'Check Out' }, { id: 'half1', label: '1st Half' }, { id: 'half2', label: '2nd Half' },
    { id: 'lateIn', label: 'Late In' }, { id: 'earlyOut', label: 'Early Out' }, { id: 'overTime', label: 'Over Time' },
    { id: 'workHours', label: 'Work Hours' }, { id: 'lessWork', label: 'Less Work' }, { id: 'extraWork', label: 'Extra Work' },
    { id: 'compOff', label: 'Comp Off' }, { id: 'remarks', label: 'Remarks' }, { id: 'action', label: 'Action' }
  ];
  var ATT_EMPLOYEES = [
    { code: 'ERP01', name: 'Dev Aggarwal' }, { code: 'SA2', name: 'Saurabh Bhardwaj' }, { code: 'KA1', name: 'Kamal Sharma' },
    { code: 'ERP02', name: 'Ankur Gupta' }, { code: 'AK5', name: 'Akash' }
  ];
  var ATT_STATUS_OPTS = ['P', 'A', 'P/I', 'P/II', 'P/A', 'H'];
  var ATT_CHEV = '<svg class="hs-filter-acc__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONTH_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var VIEWLOCK_COLS = [
    { id: 'sno', label: '#' }, { id: 'date', label: 'Date' }, { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' }, { id: 'lockedBy', label: 'Locked By' }
  ];
  var UNLOCK_COLS = [
    { id: 'sno', label: 'S. No.' }, { id: 'employees', label: 'Employees' }, { id: 'start', label: 'Start Date' },
    { id: 'end', label: 'End Date' }, { id: 'since', label: 'Since Date' }, { id: 'till', label: 'Till Date' },
    { id: 'action', label: 'Action' }
  ];

  var COPY_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="1"/><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"/></svg>';

  var HOLIDAY_TEMPLATES = [
    { id: 'ht1', name: 'Republic Day', date: '26 Jan', type: 'National Holiday', from: '26/01/2026', to: '26/01/2026' },
    { id: 'ht2', name: 'Guru Govind Singh Jayanti', date: '05 Jan', type: 'Religious Holiday', from: '05/01/2026', to: '05/01/2026' },
    { id: 'ht3', name: 'Pongal', date: '14 Jan', type: 'National Holiday', from: '14/01/2026', to: '14/01/2026' },
    { id: 'ht4', name: 'Basant Panchami', date: '02 Feb', type: 'Religious Holiday', from: '02/02/2026', to: '02/02/2026' },
    { id: 'ht5', name: 'Guru Ravidas Jayanti', date: '24 Feb', type: 'Religious Holiday', from: '24/02/2026', to: '24/02/2026' },
    { id: 'ht6', name: 'Maha Shivaratri', date: '08 Mar', type: 'Religious Holiday', from: '08/03/2026', to: '08/03/2026' },
    { id: 'ht7', name: 'Holi', date: '25 Mar', type: 'Religious Holiday', from: '25/03/2026', to: '25/03/2026' },
    { id: 'ht8', name: 'Good Friday', date: '29 Mar', type: 'Religious Holiday', from: '29/03/2026', to: '29/03/2026' },
    { id: 'ht9', name: 'Eid-ul-Fitr', date: '11 Apr', type: 'Religious Holiday', from: '11/04/2026', to: '11/04/2026' },
    { id: 'ht10', name: 'Ambedkar Jayanti', date: '14 Apr', type: 'National Holiday', from: '14/04/2026', to: '14/04/2026' },
    { id: 'ht11', name: 'Ram Navami', date: '17 Apr', type: 'Religious Holiday', from: '17/04/2026', to: '17/04/2026' },
    { id: 'ht12', name: 'Mahavir Jayanti', date: '21 Apr', type: 'Religious Holiday', from: '21/04/2026', to: '21/04/2026' },
    { id: 'ht13', name: 'Buddha Purnima', date: '23 May', type: 'Religious Holiday', from: '23/05/2026', to: '23/05/2026' },
    { id: 'ht14', name: 'Eid-ul-Adha', date: '17 Jun', type: 'Religious Holiday', from: '17/06/2026', to: '17/06/2026' },
    { id: 'ht15', name: 'Muharram', date: '17 Jul', type: 'Religious Holiday', from: '17/07/2026', to: '17/07/2026' },
    { id: 'ht16', name: 'Independence Day', date: '15 Aug', type: 'National Holiday', from: '15/08/2026', to: '15/08/2026' },
    { id: 'ht17', name: 'Raksha Bandhan', date: '19 Aug', type: 'Religious Holiday', from: '19/08/2026', to: '19/08/2026' },
    { id: 'ht18', name: 'Janmashtami', date: '26 Aug', type: 'Religious Holiday', from: '26/08/2026', to: '26/08/2026' },
    { id: 'ht19', name: 'Milad-un-Nabi', date: '16 Sep', type: 'Religious Holiday', from: '16/09/2026', to: '16/09/2026' },
    { id: 'ht20', name: 'Gandhi Jayanti', date: '02 Oct', type: 'National Holiday', from: '02/10/2026', to: '02/10/2026' }
  ];

  var HOLIDAY_TEMPLATE_LIBRARY = [
    { id: 1, name: 'Republic Day', from: '26/01/2026', to: '26/01/2026', type: 'National', branch: '--', desc: 'Commemorates the adoption of India\'s Constitution in 1950.' },
    { id: 2, name: 'Maha Shivaratri', from: '15/02/2026', to: '15/02/2026', type: 'Religious', branch: '--', desc: 'A Hindu festival dedicated to Lord Shiva, observed with fasting and night vigils.' },
    { id: 3, name: 'Holika Dahana', from: '02/03/2026', to: '02/03/2026', type: 'Religious', branch: '--', desc: 'Holika Dahan commemorates the victory of good over evil on the eve of Holi.' },
    { id: 4, name: 'Holi', from: '03/03/2026', to: '03/03/2026', type: 'Religious', branch: '--', desc: 'The festival of colours celebrating the arrival of spring.' },
    { id: 5, name: 'Good Friday', from: '03/04/2026', to: '03/04/2026', type: 'Religious', branch: '--', desc: 'Good Friday commemorates the crucifixion and death of Jesus Christ, two days before Easter Sunday.' },
    { id: 6, name: 'New Year\'s Day', from: '01/01/2026', to: '01/01/2026', type: 'Public', branch: '--', desc: 'Marks the beginning of the Gregorian calendar year, celebrated worldwide.' },
    { id: 7, name: 'Diwali', from: '08/11/2026', to: '08/11/2026', type: 'Religious', branch: '--', desc: 'The Festival of Lights, symbolizing the victory of light over darkness; involves lighting lamps and fireworks.' },
    { id: 8, name: 'Dussehra (Vijayadashami)', from: '20/10/2026', to: '20/10/2026', type: '--', branch: '--', desc: 'Dussehra marks the victory of good over evil, commemorating Lord Rama\'s triumph over Ravana.' },
    { id: 9, name: 'Independence Day', from: '15/08/2026', to: '15/08/2026', type: 'National', branch: '--', desc: 'Celebrates India\'s independence from British rule in 1947.' },
    { id: 10, name: 'Gandhi Jayanti', from: '02/10/2026', to: '02/10/2026', type: 'National', branch: '--', desc: 'Birth anniversary of Mahatma Gandhi, observed as a national holiday.' }
  ];

  var BRANCHES = ['CA CLOUD DESK LLP', 'CA CLOUD DESK', 'CA CLOUD DESK LLP (HO)', 'Delhi Branch', 'Mumbai Branch'];

  var QUOTA_INCLUDED_USERS = [
    { id: 1, name: 'Kamal Kant Sharma', code: 'KA001', designation: 'MANAGER', email: 'cakamal9758@gmail.com', branch: 'CA CloudDesk' },
    { id: 2, name: 'KUNAL', code: 'KP001', designation: 'MANAGER', email: 'sales.cacloud@gmail.com', branch: 'CA CloudDesk' },
    { id: 3, name: 'Dev Aggarwal', code: 'DE6203', designation: 'MANAGER', email: 'dev1000aggarwal@gmail.com', branch: 'CA CloudDesk' }
  ];
  var QUOTA_EXCLUDED_USERS = [
    { id: 4, name: 'Priya Mehta', code: 'EMP014', designation: 'EXECUTIVE', email: 'priya.mehta@example.com', branch: 'Delhi Branch' },
    { id: 5, name: 'Amit Verma', code: 'EMP022', designation: 'TRAINEE', email: 'amit.verma@example.com', branch: 'CA CLOUD DESK LLP' },
    { id: 6, name: 'Sneha Kapoor', code: 'EMP031', designation: 'EXECUTIVE', email: 'sneha.kapoor@example.com', branch: 'Mumbai Branch' }
  ];

  var state = {
    tab: 'holiday',
    checkedIn: true,
    editingHolidayId: null,
    editingShiftId: null,
    editingLeaveId: null,
    editingBlacklistId: null,
    editingQuotaId: null,
    editingUnlockId: null,
    viewingQuotaId: null,
    quotaUserTab: 'included',
    quotaUserSearch: '',
    holidaySortKey: null,
    holidaySortDir: 1,
    holidaySelected: {},
    holidayVisible: {},
    holidayTplSelected: {},
    deleteHolidayId: null,
    deletePopTab: null,
    copyHolidayLibId: null,
    shiftVisible: {},
    leaveVisible: {},
    attVisible: {},
    attUi: {
      employee: 'all', statuses: [], dateStart: '01-08-2026', dateEnd: '17-08-2026',
      filterOpen: false, colsOpen: false, empOpen: false, statusDropOpen: false, statusAccOpen: true, dateAccOpen: true, statusSearch: ''
    },
    lockUi: { pickerYear: 2026, selectedMonth: null, selectedYear: null, pickerOpen: false },
    unlockUi: { filterOpen: false, startEndAccOpen: true, sinceTillAccOpen: false, startEndFrom: '', startEndTo: '', sinceTillFrom: '', sinceTillTo: '' },
    attendanceSub: 'pending',
    page: {},
    holidays: [
      { id: 1, name: 'Republic Day', from: '26/01/2026', to: '26/01/2026', optional: false, type: 'National Holiday', branch: 'All', office: 'All', description: '', sandwich: false },
      { id: 2, name: 'Holika Dahana', from: '02/03/2026', to: '02/03/2026', optional: false, type: 'Religious', branch: 'All', office: 'All', description: '', sandwich: false },
      { id: 3, name: 'Holi', from: '03/03/2026', to: '03/03/2026', optional: false, type: 'Religious', branch: 'All', office: 'All', description: '', sandwich: false },
      { id: 4, name: 'Sunday', from: '12/04/2026', to: '12/04/2026', optional: false, type: 'Weekly Holiday', branch: 'All', office: 'All', description: 'WEEKLY OFF', sandwich: true },
      { id: 5, name: 'Sunday', from: '19/04/2026', to: '19/04/2026', optional: false, type: 'Weekly Holiday', branch: 'All', office: 'All', description: 'WEEKLY OFF', sandwich: true },
      { id: 6, name: 'Sunday', from: '26/04/2026', to: '26/04/2026', optional: false, type: 'Weekly Holiday', branch: 'All', office: 'All', description: 'WEEKLY OFF', sandwich: true },
      { id: 7, name: 'Sunday', from: '03/05/2026', to: '03/05/2026', optional: false, type: 'Weekly Holiday', branch: 'All', office: 'All', description: 'WEEKLY OFF', sandwich: true }
    ],
    nextHolidayId: 8,
    shifts: [
      { id: 1, isDefault: true, name: 'Normal Routine', inTime: '10:00:00', outTime: '19:00:00', lateIn: '10:10:00', earlyOut: '18:55:00', fullDay: '08:50:00', halfDay: '04:00:00', fullCoff: '07:00:00', halfCoff: '03:30:00' },
      { id: 2, isDefault: false, name: 'Morning', inTime: '09:00:00', outTime: '18:00:00', lateIn: '09:15:00', earlyOut: '17:45:00', fullDay: '08:30:00', halfDay: '04:00:00', fullCoff: '07:00:00', halfCoff: '03:30:00' },
      { id: 3, isDefault: false, name: 'Morning shift', inTime: '08:30:00', outTime: '17:30:00', lateIn: '08:45:00', earlyOut: '17:15:00', fullDay: '08:30:00', halfDay: '04:00:00', fullCoff: '07:00:00', halfCoff: '03:30:00' },
      { id: 4, isDefault: false, name: 'Early Morning', inTime: '07:00:00', outTime: '16:00:00', lateIn: '07:15:00', earlyOut: '15:45:00', fullDay: '08:30:00', halfDay: '04:00:00', fullCoff: '07:00:00', halfCoff: '03:30:00' },
      { id: 5, isDefault: false, name: 'Afternoon shift', inTime: '13:00:00', outTime: '22:00:00', lateIn: '13:15:00', earlyOut: '21:45:00', fullDay: '08:30:00', halfDay: '04:00:00', fullCoff: '07:00:00', halfCoff: '03:30:00' },
      { id: 6, isDefault: false, name: 'Day shift-sk', inTime: '10:00:00', outTime: '19:00:00', lateIn: '10:20:00', earlyOut: '18:40:00', fullDay: '08:30:00', halfDay: '04:15:00', fullCoff: '07:00:00', halfCoff: '03:30:00' },
      { id: 7, isDefault: false, name: 'night shift-sk', inTime: '22:00:00', outTime: '07:00:00', lateIn: '22:15:00', earlyOut: '06:45:00', fullDay: '08:30:00', halfDay: '04:00:00', fullCoff: '07:00:00', halfCoff: '03:30:00' }
    ],
    nextShiftId: 8,
    templates: [
      { id: 1, name: 'Early Morning', inTime: '07:00:00', outTime: '16:00:00', lateIn: '07:15:00', earlyOut: '15:45:00', fullDay: '08:30:00', halfDay: '04:00:00', fullCoff: '07:00:00', halfCoff: '03:30:00' },
      { id: 2, name: 'Late Morning', inTime: '11:00:00', outTime: '20:00:00', lateIn: '11:15:00', earlyOut: '19:45:00', fullDay: '08:30:00', halfDay: '04:00:00', fullCoff: '07:00:00', halfCoff: '03:30:00' },
      { id: 3, name: 'Normal', inTime: '09:30:00', outTime: '18:30:00', lateIn: '09:45:00', earlyOut: '18:15:00', fullDay: '08:30:00', halfDay: '04:00:00', fullCoff: '07:00:00', halfCoff: '03:30:00' },
      { id: 4, name: 'Normal Routine', inTime: '10:00:00', outTime: '19:00:00', lateIn: '10:10:00', earlyOut: '18:55:00', fullDay: '08:50:00', halfDay: '04:00:00', fullCoff: '07:00:00', halfCoff: '03:30:00' }
    ],
    leaves: [
      { id: 1, name: 'Audit Leave', leaveFor: ['Male', 'Female', 'OTHERS'], abbr: 'AL', hours: '--', payable: false, creditFreq: 'Yearly', nextCreditDate: '01/04/2025', pastDays: '5', futureDays: '30', leaveType: 'Accumulate', maxAccumulate: '', hourlyCount: false, sandwich: false, optional: false, autoApproved: false, maxCount: '5', maxCountWithHoliday: '7' },
      { id: 2, name: 'Earned Leave', leaveFor: ['Male', 'Female', 'OTHERS'], abbr: 'EL', hours: '--', payable: true, creditFreq: 'Yearly', nextCreditDate: '01/04/2025', pastDays: '5', futureDays: '30', leaveType: 'Accumulate', maxAccumulate: '24', hourlyCount: false, sandwich: true, optional: false, autoApproved: false, maxCount: '12', maxCountWithHoliday: '14' },
      { id: 3, name: 'Casual Leave', leaveFor: ['Male', 'Female', 'OTHERS'], abbr: 'CL', hours: '--', payable: true, creditFreq: 'Yearly', nextCreditDate: '01/04/2025', pastDays: '3', futureDays: '15', leaveType: 'Accumulate', maxAccumulate: '12', hourlyCount: false, sandwich: false, optional: false, autoApproved: true, maxCount: '12', maxCountWithHoliday: '14' },
      { id: 4, name: 'Sick Leave', leaveFor: ['Male', 'Female', 'OTHERS'], abbr: 'SL', hours: '--', payable: true, creditFreq: 'Yearly', nextCreditDate: '01/04/2025', pastDays: '5', futureDays: '30', leaveType: 'Accumulate', maxAccumulate: '12', hourlyCount: false, sandwich: false, optional: false, autoApproved: false, maxCount: '12', maxCountWithHoliday: '14' },
      { id: 5, name: 'Training Leave', leaveFor: ['Male', 'Female', 'OTHERS'], abbr: 'TL', hours: '--', payable: true, creditFreq: 'Yearly', nextCreditDate: '01/04/2025', pastDays: '5', futureDays: '30', leaveType: 'Accumulate', maxAccumulate: '12', hourlyCount: false, sandwich: false, optional: true, autoApproved: false, maxCount: '12', maxCountWithHoliday: '14' },
      { id: 6, name: 'Demo Leave', leaveFor: ['Male', 'Female', 'OTHERS'], abbr: 'DL', hours: '--', payable: false, creditFreq: 'Yearly', nextCreditDate: '01/04/2025', pastDays: '5', futureDays: '30', leaveType: 'Accumulate', maxAccumulate: '', hourlyCount: false, sandwich: false, optional: false, autoApproved: false, maxCount: '5', maxCountWithHoliday: '7' }
    ],
    nextLeaveId: 7,
    blacklist: [
      { id: 1, name: 'GSTR-1', start: '11/04/2025', end: '11/04/2025' },
      { id: 2, name: 'GSTR-3B', start: '20/04/2025', end: '20/04/2025' },
      { id: 3, name: 'ITR filing', start: '31/07/2025', end: '31/07/2025' }
    ],
    nextBlacklistId: 4,
    quotas: [
      { id: 1, leave: 'Training Leave (TL)', designations: ['MANAGER'], branches: ['CA CLOUD DESK LLP', 'CA CLOUD DESK', 'CA CLOUD DESK LLP (HO)'], count: 12 },
      { id: 2, leave: 'Sick Leave (SL)', designations: ['accountant', 'MANAGER'], branches: ['Law Seva Management Private Limited', 'saurabh bharadwaj', 'CA CloudDesk', '442', 'Bluemon Wealth Management'], count: 24 },
      { id: 3, leave: 'Casual Leave (CL)', designations: ['EXECUTIVE'], branches: ['CA CLOUD DESK LLP', 'CA CLOUD DESK'], count: 24 },
      { id: 4, leave: 'Audit Leave (AL)', designations: ['MANAGER'], branches: ['CA CLOUD DESK LLP', 'CA CLOUD DESK', 'CA CLOUD DESK LLP (HO)'], count: 20 },
      { id: 5, leave: 'Demo Leave (DL)', designations: ['TRAINEE'], branches: ['CA CLOUD DESK LLP', 'CA CLOUD DESK'], count: 15 },
      { id: 6, leave: 'Earned Leave (EL)', designations: ['MANAGER'], branches: BRANCHES.slice(0, 4), count: 24 },
      { id: 7, leave: 'Casual Leave (CL)', designations: ['MANAGER'], branches: ['CA CLOUD DESK LLP', 'CA CLOUD DESK', 'CA CLOUD DESK LLP (HO)'], count: 12 }
    ],
    nextQuotaId: 8,
    clubRules: [
      { id: 1, leave1: 'Sick Leave (SL)', leave2: 'Casual Leave (CL)' },
      { id: 2, leave1: 'Sick Leave (SL)', leave2: 'Earned Leave (EL)' }
    ],
    attendance: [
      { id: 1, date: '17/08/2026', employee: 'Dev Aggarwal', shift: 'Normal Routine', code: 'ERP01', branch: 'TimeErp Demo', office: '--', inTime: '--', outTime: '--', checkIn: '--', checkOut: '--', half1: 'A', half2: 'A', lateIn: '--', earlyOut: '--', overTime: '--', workHours: '--', lessWork: '--', extraWork: '--', compOff: 'NO', remarks: '--' },
      { id: 2, date: '17/08/2026', employee: 'Saurabh Bhardwaj', shift: 'Normal Routine', code: 'SA2', branch: 'TimeErp Demo', office: '--', inTime: '--', outTime: '--', checkIn: '--', checkOut: '--', half1: 'A', half2: 'A', lateIn: '--', earlyOut: '--', overTime: '--', workHours: '--', lessWork: '--', extraWork: '--', compOff: 'NO', remarks: '--' },
      { id: 3, date: '17/08/2026', employee: 'Kamal Sharma', shift: 'Normal Routine', code: 'KA1', branch: 'TimeErp Demo', office: '--', inTime: '--', outTime: '--', checkIn: '--', checkOut: '--', half1: 'A', half2: 'A', lateIn: '--', earlyOut: '--', overTime: '--', workHours: '--', lessWork: '--', extraWork: '--', compOff: 'NO', remarks: '--' },
      { id: 4, date: '17/08/2026', employee: 'Ankur Gupta', shift: 'Normal Routine', code: 'ERP02', branch: 'TimeErp Demo', office: '--', inTime: '--', outTime: '--', checkIn: '--', checkOut: '--', half1: 'A', half2: 'A', lateIn: '--', earlyOut: '--', overTime: '--', workHours: '--', lessWork: '--', extraWork: '--', compOff: 'NO', remarks: '--' },
      { id: 5, date: '17/08/2026', employee: 'Akash', shift: 'Normal Routine', code: 'AK5', branch: 'TimeErp Demo', office: '--', inTime: '--', outTime: '--', checkIn: '--', checkOut: '--', half1: 'A', half2: 'A', lateIn: '--', earlyOut: '--', overTime: '--', workHours: '--', lessWork: '--', extraWork: '--', compOff: 'NO', remarks: '--' },
      { id: 6, date: '16/08/2026', employee: 'Dev Aggarwal', shift: 'Normal Routine', code: 'ERP01', branch: 'TimeErp Demo', office: '--', inTime: '--', outTime: '--', checkIn: '--', checkOut: '--', half1: 'A', half2: 'A', lateIn: '--', earlyOut: '--', overTime: '--', workHours: '--', lessWork: '--', extraWork: '--', compOff: 'NO', remarks: '--' },
      { id: 7, date: '16/08/2026', employee: 'Saurabh Bhardwaj', shift: 'Normal Routine', code: 'SA2', branch: 'TimeErp Demo', office: '--', inTime: '--', outTime: '--', checkIn: '--', checkOut: '--', half1: 'A', half2: 'A', lateIn: '--', earlyOut: '--', overTime: '--', workHours: '--', lessWork: '--', extraWork: '--', compOff: 'NO', remarks: '--' },
      { id: 8, date: '16/08/2026', employee: 'Kamal Sharma', shift: 'Normal Routine', code: 'KA1', branch: 'TimeErp Demo', office: 'GHAZIABAD', inTime: '10:55', outTime: '--', checkIn: '10:55', checkOut: '--', half1: 'A', half2: 'A', lateIn: '--', earlyOut: '--', overTime: '--', workHours: '--', lessWork: '--', extraWork: '--', compOff: 'NO', remarks: '--' },
      { id: 9, date: '16/08/2026', employee: 'Ankur Gupta', shift: 'Normal Routine', code: 'ERP02', branch: 'TimeErp Demo', office: '--', inTime: '--', outTime: '--', checkIn: '--', checkOut: '--', half1: 'A', half2: 'A', lateIn: '--', earlyOut: '--', overTime: '--', workHours: '--', lessWork: '--', extraWork: '--', compOff: 'NO', remarks: '--' },
      { id: 10, date: '16/08/2026', employee: 'Akash', shift: 'Normal Routine', code: 'AK5', branch: 'TimeErp Demo', office: '--', inTime: '--', outTime: '--', checkIn: '--', checkOut: '--', half1: 'A', half2: 'A', lateIn: '--', earlyOut: '--', overTime: '--', workHours: '--', lessWork: '--', extraWork: '--', compOff: 'NO', remarks: '--' }
    ],
    viewLocks: [
      { id: 1, date: '01/04/2026', month: 'April', year: '2026', lockedBy: 'Admin' },
      { id: 2, date: '01/05/2026', month: 'May', year: '2026', lockedBy: 'Admin' },
      { id: 3, date: '01/06/2026', month: 'June', year: '2026', lockedBy: 'HR Manager' },
      { id: 4, date: '01/07/2026', month: 'July', year: '2026', lockedBy: 'Admin' }
    ],
    unlocks: [
      { id: 1, employees: '(ERP01) Dev Aggarwal', start: '', end: '', since: '', till: '' }
    ],
    noDues: [
      { id: 1, category: '', employee: '' },
      { id: 2, category: '', employee: '' }
    ]
  };

  HOLIDAY_COLS.forEach(function (c) { state.holidayVisible[c.id] = true; });
  SHIFT_COLS.forEach(function (c) { state.shiftVisible[c.id] = true; });
  LEAVE_COLS.forEach(function (c) { state.leaveVisible[c.id] = true; });
  ATT_COLS.forEach(function (c) { state.attVisible[c.id] = c.id !== 'compOff' && c.id !== 'remarks'; });

  var root = document.getElementById('hsDynamic');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.hs-tab'));
  var holidayModal = document.getElementById('hsHolidayModal');
  var shiftModal = document.getElementById('hsShiftModal');
  var leaveModal = document.getElementById('hsLeaveModal');
  var blacklistModal = document.getElementById('hsBlacklistModal');
  var quotaModal = document.getElementById('hsQuotaModal');
  var quotaUsersModal = document.getElementById('hsQuotaUsersModal');
  var templateModal = document.getElementById('hsTemplateModal');
  var holidayLibModal = document.getElementById('hsHolidayLibModal');
  var holidayTplModal = document.getElementById('hsHolidayTplModal');
  var bulkHolidayModal = document.getElementById('hsBulkHolidayModal');
  var attUploadModal = document.getElementById('hsAttUploadModal');
  var lockModal = document.getElementById('hsLockModal');
  var unlockModal = document.getElementById('hsUnlockModal');
  var holidayForm = document.getElementById('hsHolidayForm');
  var bulkHolidayForm = document.getElementById('hsBulkHolidayForm');
  var attUploadForm = document.getElementById('hsAttUploadForm');
  var lockForm = document.getElementById('hsLockForm');
  var unlockForm = document.getElementById('hsUnlockForm');
  var lockMonthInput = document.getElementById('hsLockMonthInput');
  var lockMonthPicker = document.getElementById('hsLockMonthPicker');
  var lockMonthGrid = document.getElementById('hsLockMonthGrid');
  var lockPickerYear = document.getElementById('hsLockPickerYear');
  var shiftForm = document.getElementById('hsShiftForm');
  var leaveForm = document.getElementById('hsLeaveForm');
  var blacklistForm = document.getElementById('hsBlacklistForm');
  var quotaForm = document.getElementById('hsQuotaForm');
  var datePop = document.getElementById('hsDatePop');
  var datePopGrid = document.getElementById('hsDatePopGrid');
  var datePopLabel = document.getElementById('hsDatePopLabel');
  var datePopToday = document.getElementById('hsDatePopToday');
  var fromDateWrap = document.getElementById('hsFromDateWrap');
  var toDateWrap = document.getElementById('hsToDateWrap');
  var bulkFromDateWrap = document.getElementById('hsBulkFromDateWrap');
  var bulkToDateWrap = document.getElementById('hsBulkToDateWrap');
  var leaveCreditDateWrap = document.getElementById('hsLeaveCreditDateWrap');
  var blStartDateWrap = document.getElementById('hsBlStartDateWrap');
  var blEndDateWrap = document.getElementById('hsBlEndDateWrap');
  var delPop = document.getElementById('hsDelPop');
  var copyPop = document.getElementById('hsCopyPop');
  var delNo = document.getElementById('hsDelNo');
  var delYes = document.getElementById('hsDelYes');
  var copyNo = document.getElementById('hsCopyNo');
  var copyYes = document.getElementById('hsCopyYes');
  var holDateState = { year: 2026, month: 7, day: 17, mode: 'holiday', target: 'from' };
  var HOL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var topCheckIn = document.getElementById('hsTopCheckInBtn');
  var topClock = document.getElementById('hsTopClock');

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
    if (!topClock) return;
    var d = new Date();
    topClock.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes());
    topClock.setAttribute('datetime', d.toISOString());
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function parseDate(s) {
    var p = String(s || '').split('/');
    if (p.length !== 3) return 0;
    return new Date(+p[2], +p[1] - 1, +p[0]).getTime();
  }

  function getTags(container) {
    return Array.prototype.map.call(container.querySelectorAll('.hs-tag'), function (t) {
      return t.getAttribute('data-value') || t.textContent.replace(/\s*×\s*$/, '').trim();
    }).filter(Boolean);
  }

  function setTags(container, values) {
    var input = container.querySelector('.hs-tags__input');
    Array.prototype.slice.call(container.querySelectorAll('.hs-tag')).forEach(function (t) { t.remove(); });
    (values || []).forEach(function (v) {
      var span = document.createElement('span');
      span.className = 'hs-tag';
      span.setAttribute('data-value', v);
      span.innerHTML = escapeHtml(v) + ' <button type="button" class="hs-tag__x" aria-label="Remove">&times;</button>';
      container.insertBefore(span, input);
    });
  }

  function actionEditDel(editAttr, delAttr, id) {
    return '<span class="hs-actions">' +
      '<button type="button" class="hs-action hs-action--edit" ' + editAttr + '="' + id + '" aria-label="Edit">' + EDIT_ICON + '</button>' +
      '<button type="button" class="hs-action hs-action--delete" ' + delAttr + '="' + id + '" aria-label="Delete">' + DEL_ICON + '</button>' +
      '</span>';
  }

  function actionDelOnly(delAttr, id) {
    return '<span class="hs-actions"><button type="button" class="hs-action hs-action--delete" ' + delAttr + '="' + id + '" aria-label="Delete">' + DEL_ICON + '</button></span>';
  }

  function quotaDesignations(row) {
    if (row.designations && row.designations.length) return row.designations;
    return row.designation ? [row.designation] : [];
  }

  function quotaDesignationCell(row) {
    return '<span class="hs-branch-tags">' + pillTags(quotaDesignations(row)) + '</span>';
  }

  function actionViewEditDel(id) {
    return '<span class="hs-actions">' +
      '<button type="button" class="hs-action hs-action--view" data-view="' + id + '" title="View Users" aria-label="View Users">' + EYE_ICON + '</button>' +
      '<button type="button" class="hs-action hs-action--edit" data-edit="' + id + '" aria-label="Edit">' + EDIT_ICON + '</button>' +
      '<button type="button" class="hs-action hs-action--delete" data-delete="' + id + '" aria-label="Delete">' + DEL_ICON + '</button>' +
      '</span>';
  }

  function pillTags(arr) {
    return (arr || []).map(function (t) { return '<span class="hs-pill">' + escapeHtml(t) + '</span>'; }).join(' ');
  }

  function leaveForTags(arr) {
    return '<span class="hs-leave-for">' + (arr || []).map(function (t) {
      return '<span class="hs-leave-pill">' + escapeHtml(t) + '</span>';
    }).join('') + '</span>';
  }

  function colsBtnHtml(popId) {
    return '<div class="hs-toolbar__left">' +
      '<button type="button" class="hs-icon-btn" data-cols-btn aria-label="Columns" aria-haspopup="true" aria-expanded="false">' +
      COLS_ICON + CARET_ICON + '</button>' +
      '<div class="hs-columns-pop" id="' + popId + '" hidden>' +
      '<label class="hs-columns-pop__all"><input type="checkbox" data-select-all-cols checked> Select all</label>' +
      '<div class="hs-columns-pop__list" data-cols-list></div></div></div>';
  }

  function addBtnHtml(label) {
    return '<button type="button" class="hs-icon-btn hs-icon-btn--primary" data-add aria-label="' + (label || 'Add') + '">' + PLUS_ICON + '</button>';
  }

  function holidayAddBtnHtml() {
    return '<div class="hs-add-wrap">' +
      '<button type="button" class="hs-icon-btn hs-icon-btn--primary" id="hsHolidayAddBtn" data-holiday-add-btn aria-label="Add holiday" aria-haspopup="true" aria-expanded="false">' + PLUS_ICON + '</button>' +
      '<div class="hs-add-menu" id="hsHolidayAddMenu" hidden role="menu" aria-label="Add holiday options">' +
      '<button type="button" class="hs-add-menu__item" role="menuitem" data-holiday-add="template">Add From Template</button>' +
      '<button type="button" class="hs-add-menu__item" role="menuitem" data-holiday-add="single">Add Holiday</button>' +
      '<button type="button" class="hs-add-menu__item" role="menuitem" data-holiday-add="bulk">Add Bulk Holiday</button>' +
      '</div></div>';
  }

  function paginationHtml(opts) {
    var size = opts.size || 10;
    var page = opts.page || 1;
    var total = opts.total || 0;
    var pages = Math.max(1, Math.ceil(total / size) || 1);
    return '<div class="hs-pager">' +
      '<div class="hs-pager__left"><span>Show</span>' +
      '<select class="hs-pager__size" data-page-size aria-label="Page size">' +
      [10, 20, 50].map(function (n) {
        return '<option value="' + n + '"' + (n === size ? ' selected' : '') + '>' + n + '</option>';
      }).join('') +
      '</select><span>entries</span></div>' +
      '<div class="hs-pager__right">' +
      '<span class="hs-pager__info">Showing ' + (total ? ((page - 1) * size + 1) : 0) + ' to ' + Math.min(page * size, total) + ' of ' + total + ' entries</span>' +
      '<div class="hs-pager__btns">' +
      '<button type="button" class="hs-pager__btn" data-page-prev' + (page <= 1 ? ' disabled' : '') + '>‹</button>' +
      '<button type="button" class="hs-pager__btn is-active">' + page + '</button>' +
      '<button type="button" class="hs-pager__btn" data-page-next' + (page >= pages ? ' disabled' : '') + '>›</button>' +
      '</div></div></div>';
  }

  function pageSlice(rows, key, defaultSize) {
    var size = (state.page[key] && state.page[key].size) || defaultSize || 10;
    var page = (state.page[key] && state.page[key].page) || 1;
    var pages = Math.max(1, Math.ceil(rows.length / size) || 1);
    if (page > pages) page = pages;
    state.page[key] = { size: size, page: page };
    var start = (page - 1) * size;
    return { rows: rows.slice(start, start + size), size: size, page: page, total: rows.length };
  }

  function applyColVis(visibleMap) {
    Object.keys(visibleMap).forEach(function (id) {
      var show = !!visibleMap[id];
      root.querySelectorAll('[data-col="' + id + '"]').forEach(function (el) {
        if (show) el.removeAttribute('hidden');
        else el.setAttribute('hidden', '');
      });
    });
  }

  function renderColsPop(listEl, cols, visibleMap) {
    if (!listEl) return;
    listEl.innerHTML = cols.map(function (c) {
      return '<label><input type="checkbox" data-col-toggle="' + c.id + '"' + (visibleMap[c.id] ? ' checked' : '') + '> ' + escapeHtml(c.label) + '</label>';
    }).join('');
    var all = root.querySelector('[data-select-all-cols]');
    if (all && all.type === 'checkbox') {
      var allOn = cols.every(function (c) { return visibleMap[c.id]; });
      var allOff = cols.every(function (c) { return !visibleMap[c.id]; });
      all.checked = allOn;
      all.indeterminate = !allOn && !allOff;
    }
  }

  /* ---------- Tab renderers ---------- */

  function filteredHolidays() {
    var filterEl = root.querySelector('#hsFilterAll');
    var f = (filterEl && filterEl.value) || 'all';
    var rows = state.holidays.slice();
    if (f === 'weekly') rows = rows.filter(function (r) { return r.type === 'Weekly Holiday'; });
    if (f === 'public') rows = rows.filter(function (r) { return r.type === 'Public Holiday'; });
    if (state.holidaySortKey === 'from' || state.holidaySortKey === 'to') {
      var key = state.holidaySortKey;
      var dir = state.holidaySortDir;
      rows.sort(function (a, b) { return (parseDate(a[key]) - parseDate(b[key])) * dir; });
    }
    return rows;
  }

  function renderHoliday() {
    var rows = filteredHolidays();
    var html = '<section class="hs-card" aria-label="Holiday settings">' +
      '<div class="hs-toolbar">' + colsBtnHtml('hsColumnsPop') +
      '<div class="hs-toolbar__actions">' +
      '<select class="hs-select" id="hsFilterAll" aria-label="Filter"><option value="all">All</option><option value="weekly">Weekly Holiday</option><option value="public">Public Holiday</option></select>' +
      '<select class="hs-select" id="hsFy" aria-label="Financial year"><option value="26-27" selected>FY 26-27</option><option value="25-26">FY 25-26</option><option value="24-25">FY 24-25</option></select>' +
      '<button type="button" class="hs-btn-bulk" id="hsBulkDelete" disabled>Bulk Delete</button>' +
      holidayAddBtnHtml() +
      '</div></div>' +
      '<div class="hs-table-wrap"><table class="hs-table" id="hsTable"><thead><tr>' +
      '<th class="hs-th-check"><input type="checkbox" id="hsCheckAll" aria-label="Select all rows"></th>' +
      '<th data-col="sno">#</th><th data-col="name">Holiday Name</th>' +
      '<th data-col="from">From Date <span class="hs-sort" aria-hidden="true">⇅</span></th>' +
      '<th data-col="to">To Date <span class="hs-sort" aria-hidden="true">⇅</span></th>' +
      '<th data-col="optional">Optional</th><th data-col="type">Holiday Type</th>' +
      '<th data-col="branch">Branch</th><th data-col="office">Office</th>' +
      '<th data-col="desc">Description</th><th data-col="action">Action</th>' +
      '</tr></thead><tbody>' +
      rows.map(function (r, i) {
        var checked = state.holidaySelected[r.id] ? ' checked' : '';
        return '<tr data-id="' + r.id + '">' +
          '<td class="hs-th-check"><input type="checkbox" class="hs-row-check" data-id="' + r.id + '"' + checked + ' aria-label="Select row"></td>' +
          '<td data-col="sno">' + (i + 1) + '</td>' +
          '<td data-col="name">' + escapeHtml(r.name) + '</td>' +
          '<td data-col="from">' + escapeHtml(r.from) + '</td>' +
          '<td data-col="to">' + escapeHtml(r.to) + '</td>' +
          '<td data-col="optional">' + (r.optional ? 'Yes' : 'No') + '</td>' +
          '<td data-col="type">' + escapeHtml(r.type) + '</td>' +
          '<td data-col="branch"><span class="hs-pill">' + escapeHtml(r.branch) + '</span></td>' +
          '<td data-col="office"><span class="hs-pill">' + escapeHtml(r.office) + '</span></td>' +
          '<td data-col="desc">' + escapeHtml(r.description) + '</td>' +
          '<td data-col="action">' + actionEditDel('data-edit', 'data-delete', r.id) + '</td></tr>';
      }).join('') +
      '</tbody></table>' +
      (rows.length ? '' : '<div class="hs-empty"><p>No holidays found</p></div>') +
      '</div></section>';
    root.innerHTML = html;
    applyColVis(state.holidayVisible);
    var bulk = root.querySelector('#hsBulkDelete');
    var selCount = Object.keys(state.holidaySelected).filter(function (k) { return state.holidaySelected[k]; }).length;
    if (bulk) bulk.disabled = selCount === 0;
    var checkAll = root.querySelector('#hsCheckAll');
    if (checkAll) checkAll.checked = rows.length > 0 && rows.every(function (r) { return state.holidaySelected[r.id]; });
  }

  function renderHolidayTplModal() {
    var body = document.getElementById('hsHolidayTplBody');
    if (!body) return;
    body.innerHTML = HOLIDAY_TEMPLATES.map(function (t) {
      var checked = state.holidayTplSelected[t.id] ? ' checked' : '';
      return '<tr><td class="hs-th-check"><input type="checkbox" class="hs-tpl-check" data-tpl-id="' + t.id + '"' + checked + ' aria-label="Select ' + escapeHtml(t.name) + '"></td>' +
        '<td>' + escapeHtml(t.name) + '</td><td>' + escapeHtml(t.date) + '</td><td>' + escapeHtml(t.type) + '</td></tr>';
    }).join('');
    var checkAll = document.getElementById('hsTplCheckAll');
    if (checkAll) checkAll.checked = HOLIDAY_TEMPLATES.length > 0 && HOLIDAY_TEMPLATES.every(function (t) { return state.holidayTplSelected[t.id]; });
  }

  function openHolidayTplModal() {
    if (!holidayTplModal) return;
    renderHolidayTplModal();
    holidayTplModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeHolidayTplModal() {
    if (!holidayTplModal) return;
    holidayTplModal.hidden = true;
    if (anyHsModalClosedExcept('holiday-tpl')) document.body.style.overflow = '';
  }

  function closeHolidayAddMenu() {
    var menu = document.getElementById('hsHolidayAddMenu');
    var btn = document.getElementById('hsHolidayAddBtn');
    if (menu) menu.hidden = true;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function toggleHolidayAddMenu(btn) {
    var menu = document.getElementById('hsHolidayAddMenu');
    if (!menu || !btn) return;
    var shouldOpen = menu.hidden;
    closeHolidayAddMenu();
    if (shouldOpen) {
      menu.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
    }
  }

  function saveSelectedTemplates() {
    var selected = HOLIDAY_TEMPLATES.filter(function (t) { return state.holidayTplSelected[t.id]; });
    if (!selected.length) {
      toast('Select holidays', 'Please select at least one holiday template.');
      return;
    }
    selected.forEach(function (t) {
      state.holidays.push({
        id: state.nextHolidayId++, name: t.name, from: t.from, to: t.to, optional: false,
        type: t.type, branch: 'All', office: 'All', description: '', sandwich: false
      });
    });
    state.holidayTplSelected = {};
    closeHolidayTplModal();
    renderTab('holiday');
    toast('Saved', selected.length + ' holiday(s) added from template.');
  }

  function renderHolidayLibrary() {
    var body = document.getElementById('hsHolidayLibBody');
    if (!body) return;
    body.innerHTML = HOLIDAY_TEMPLATE_LIBRARY.map(function (r, i) {
      return '<tr data-id="' + r.id + '"><td>' + (i + 1) + '</td>' +
        '<td>' + escapeHtml(r.name) + '</td>' +
        '<td>' + escapeHtml(r.from) + '</td><td>' + escapeHtml(r.to) + '</td>' +
        '<td>' + escapeHtml(r.type) + '</td><td>' + escapeHtml(r.branch) + '</td>' +
        '<td class="hs-td-desc">' + escapeHtml(r.desc) + '</td>' +
        '<td><button type="button" class="hs-action hs-action--copy" data-hol-lib-copy="' + r.id + '" aria-label="Copy">' + COPY_ICON + '</button></td></tr>';
    }).join('');
  }

  function openHolidayLibModal() {
    renderHolidayLibrary();
    if (holidayLibModal) {
      holidayLibModal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }

  function closeHolidayLibModal() {
    if (!holidayLibModal) return;
    holidayLibModal.hidden = true;
    if (holidayModal.hidden && shiftModal.hidden && templateModal.hidden && (!bulkHolidayModal || bulkHolidayModal.hidden)) document.body.style.overflow = '';
  }

  function copyHolidayFromLibrary(id) {
    var row = HOLIDAY_TEMPLATE_LIBRARY.filter(function (r) { return r.id === id; })[0];
    if (!row) return;
    state.holidays.push({
      id: state.nextHolidayId++, name: row.name, from: row.from, to: row.to, optional: false,
      type: row.type === '--' ? 'Public Holiday' : row.type + ' Holiday', branch: 'All', office: 'All',
      description: row.desc || '', sandwich: false
    });
    toast('Copied', row.name + ' added to holidays.');
    if (state.tab === 'holiday') renderTab('holiday');
  }

  function renderShift() {
    var html = '<section class="hs-card" aria-label="Shift settings">' +
      '<div class="hs-toolbar">' + colsBtnHtml('hsShiftColsPop') +
      '<div class="hs-toolbar__actions">' +
      '<button type="button" class="hs-btn-outline" data-templates>Templates</button>' +
      addBtnHtml('Add shift') +
      '</div></div>' +
      '<div class="hs-table-wrap"><table class="hs-table hs-table--shift"><thead><tr>' +
      SHIFT_COLS.map(function (c) { return '<th data-col="' + c.id + '">' + escapeHtml(c.label) + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      state.shifts.map(function (r, i) {
        return '<tr data-id="' + r.id + '">' +
          '<td data-col="sno">' + (i + 1) + '</td>' +
          '<td data-col="isDefault">' + (r.isDefault ? 'Yes' : 'No') + '</td>' +
          '<td data-col="name">' + escapeHtml(r.name) + '</td>' +
          '<td data-col="inTime">' + escapeHtml(r.inTime) + '</td>' +
          '<td data-col="outTime">' + escapeHtml(r.outTime) + '</td>' +
          '<td data-col="lateIn">' + escapeHtml(r.lateIn) + '</td>' +
          '<td data-col="earlyOut">' + escapeHtml(r.earlyOut) + '</td>' +
          '<td data-col="fullDay">' + escapeHtml(r.fullDay) + '</td>' +
          '<td data-col="halfDay">' + escapeHtml(r.halfDay) + '</td>' +
          '<td data-col="fullCoff">' + escapeHtml(r.fullCoff) + '</td>' +
          '<td data-col="halfCoff">' + escapeHtml(r.halfCoff) + '</td>' +
          '<td data-col="action">' + actionEditDel('data-edit', 'data-delete', r.id) + '</td></tr>';
      }).join('') +
      '</tbody></table></div></section>';
    root.innerHTML = html;
    applyColVis(state.shiftVisible);
  }

  function renderLeave() {
    var pg = pageSlice(state.leaves, 'leave', 10);
    var html = '<section class="hs-card" aria-label="Leave settings">' +
      '<div class="hs-toolbar">' + colsBtnHtml('hsLeaveColsPop') +
      '<div class="hs-toolbar__actions">' + addBtnHtml('Add leave') + '</div></div>' +
      '<div class="hs-table-wrap"><table class="hs-table"><thead><tr>' +
      LEAVE_COLS.map(function (c) { return '<th data-col="' + c.id + '">' + escapeHtml(c.label) + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      pg.rows.map(function (r, i) {
        return '<tr data-id="' + r.id + '">' +
          '<td data-col="sno">' + ((pg.page - 1) * pg.size + i + 1) + '</td>' +
          '<td data-col="name">' + escapeHtml(r.name) + '</td>' +
          '<td data-col="leaveFor">' + leaveForTags(r.leaveFor) + '</td>' +
          '<td data-col="abbr">' + escapeHtml(r.abbr) + '</td>' +
          '<td data-col="hours">' + escapeHtml(r.hours) + '</td>' +
          '<td data-col="action">' + actionEditDel('data-edit', 'data-delete', r.id) + '</td></tr>';
      }).join('') +
      '</tbody></table></div>' + paginationHtml(pg) + '</section>';
    root.innerHTML = html;
    applyColVis(state.leaveVisible);
  }

  function renderBlacklist() {
    var pg = pageSlice(state.blacklist, 'blacklist', 20);
    var html = '<section class="hs-card" aria-label="Blacklist Leave">' +
      '<div class="hs-toolbar">' + colsBtnHtml('hsBlColsPop') +
      '<div class="hs-toolbar__actions">' + addBtnHtml('Add blacklist') + '</div></div>' +
      '<div class="hs-table-wrap"><table class="hs-table"><thead><tr>' +
      BLACKLIST_COLS.map(function (c) { return '<th data-col="' + c.id + '">' + escapeHtml(c.label) + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      pg.rows.map(function (r, i) {
        return '<tr data-id="' + r.id + '">' +
          '<td data-col="sno">' + ((pg.page - 1) * pg.size + i + 1) + '</td>' +
          '<td data-col="name">' + escapeHtml(r.name) + '</td>' +
          '<td data-col="start">' + escapeHtml(r.start) + '</td>' +
          '<td data-col="end">' + escapeHtml(r.end) + '</td>' +
          '<td data-col="action">' + actionEditDel('data-edit', 'data-delete', r.id) + '</td></tr>';
      }).join('') +
      '</tbody></table></div>' + paginationHtml(pg) + '</section>';
    root.innerHTML = html;
  }

  function renderQuota() {
    var pg = pageSlice(state.quotas, 'quota', 10);
    var html = '<section class="hs-card" aria-label="Leave Quota">' +
      '<div class="hs-toolbar">' + colsBtnHtml('hsQuotaColsPop') +
      '<div class="hs-toolbar__actions">' + addBtnHtml('Add quota') + '</div></div>' +
      '<div class="hs-table-wrap"><table class="hs-table"><thead><tr>' +
      QUOTA_COLS.map(function (c) { return '<th data-col="' + c.id + '">' + escapeHtml(c.label) + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      pg.rows.map(function (r, i) {
        return '<tr data-id="' + r.id + '">' +
          '<td data-col="sno">' + ((pg.page - 1) * pg.size + i + 1) + '</td>' +
          '<td data-col="leave">' + escapeHtml(r.leave) + '</td>' +
          '<td data-col="designation">' + quotaDesignationCell(r) + '</td>' +
          '<td data-col="branch"><span class="hs-branch-tags">' + pillTags(r.branches) + '</span></td>' +
          '<td data-col="count">' + escapeHtml(r.count) + '</td>' +
          '<td data-col="action">' + actionViewEditDel(r.id) + '</td></tr>';
      }).join('') +
      '</tbody></table></div>' + paginationHtml(pg) + '</section>';
    root.innerHTML = html;
  }

  function renderClub() {
    var pg = pageSlice(state.clubRules, 'club', 10);
    var html = '<section class="hs-card" aria-label="Club Rules">' +
      '<div class="hs-toolbar">' + colsBtnHtml('hsClubColsPop') +
      '<div class="hs-toolbar__actions">' +
      '<button type="button" class="hs-icon-btn" data-filter aria-label="Filter">' + FILTER_ICON + '</button>' +
      addBtnHtml('Add club rule') +
      '</div></div>' +
      '<div class="hs-table-wrap"><table class="hs-table"><thead><tr>' +
      CLUB_COLS.map(function (c) { return '<th data-col="' + c.id + '">' + escapeHtml(c.label) + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      pg.rows.map(function (r, i) {
        return '<tr data-id="' + r.id + '">' +
          '<td data-col="sno">' + ((pg.page - 1) * pg.size + i + 1) + '</td>' +
          '<td data-col="leave1">' + escapeHtml(r.leave1) + '</td>' +
          '<td data-col="leave2">' + escapeHtml(r.leave2) + '</td>' +
          '<td data-col="action">' + actionDelOnly('data-delete', r.id) + '</td></tr>';
      }).join('') +
      '</tbody></table></div>' + paginationHtml(pg) + '</section>';
    root.innerHTML = html;
  }

  function attHalfBadge(code) {
    var c = String(code || 'A').toUpperCase();
    var cls = 'hs-status--a';
    if (c === 'P') cls = 'hs-status--p';
    else if (c === 'H') cls = 'hs-status--h';
    else if (c === 'P/I') cls = 'hs-status--h1';
    else if (c === 'P/II') cls = 'hs-status--h2';
    else if (c === 'P/A') cls = 'hs-status--pa';
    return '<span class="hs-status ' + cls + '">' + escapeHtml(code) + '</span>';
  }

  function attCellVal(val) {
    if (val === '--' || val == null || val === '') return '<span class="hs-muted">--</span>';
    return escapeHtml(val);
  }

  function filteredAttendanceRows() {
    return state.attendance.filter(function (r) {
      if (state.attUi.employee !== 'all' && r.code !== state.attUi.employee) return false;
      if (state.attUi.statuses.length) {
        var match = state.attUi.statuses.some(function (s) { return r.half1 === s || r.half2 === s; });
        if (!match) return false;
      }
      return true;
    });
  }

  function attEmpComboHtml() {
    var emp = state.attUi.employee;
    var tagLabel = emp === 'all' ? 'All' : '(' + emp + ') ' + (ATT_EMPLOYEES.filter(function (e) { return e.code === emp; })[0] || {}).name;
    return '<div class="hs-emp-combo">' +
      '<div class="hs-emp-combo__field' + (state.attUi.empOpen ? ' is-open' : '') + '">' +
      '<span class="hs-emp-tag">' + escapeHtml(tagLabel || 'All') + '<button type="button" class="hs-emp-tag__x" data-att-emp-clear aria-label="Remove">×</button></span>' +
      '<button type="button" class="hs-emp-combo__toggle" data-att-emp-toggle aria-label="Select employee">▾</button>' +
      '</div>' +
      '<div class="hs-emp-combo__list"' + (state.attUi.empOpen ? '' : ' hidden') + '>' +
      '<button type="button" class="hs-emp-combo__opt' + (emp === 'all' ? ' is-active' : '') + '" data-att-emp="all">All' + (emp === 'all' ? '<span class="hs-emp-combo__check">✓</span>' : '') + '</button>' +
      ATT_EMPLOYEES.map(function (e) {
        var active = emp === e.code;
        return '<button type="button" class="hs-emp-combo__opt' + (active ? ' is-active' : '') + '" data-att-emp="' + escapeHtml(e.code) + '">(' + escapeHtml(e.code) + ') ' + escapeHtml(e.name) + (active ? '<span class="hs-emp-combo__check">✓</span>' : '') + '</button>';
      }).join('') +
      '</div></div>';
  }

  function attFilterPopHtml() {
    var ui = state.attUi;
    var statusOpts = ATT_STATUS_OPTS.filter(function (s) {
      if (!ui.statusSearch.trim()) return true;
      return s.toLowerCase().indexOf(ui.statusSearch.trim().toLowerCase()) !== -1;
    });
    return '<div class="hs-filter-pop" id="hsAttFilterPop"' + (ui.filterOpen ? '' : ' hidden') + '>' +
      '<div class="hs-filter-pop__head"><span>Filter</span><button type="button" class="hs-link-reset" data-att-filter-reset>Reset</button></div>' +
      '<div class="hs-filter-acc' + (ui.statusAccOpen ? ' is-open' : '') + '">' +
      '<button type="button" class="hs-filter-acc__btn" data-att-acc="status">Status' + ATT_CHEV + '</button>' +
      '<div class="hs-filter-acc__body">' +
      '<div class="hs-att-status-wrap">' +
      '<input type="text" class="hs-input hs-att-status-input" data-att-status-input placeholder="Status" value="' + escapeHtml(ui.statusSearch) + '">' +
      '<div class="hs-att-status-drop"' + (ui.statusDropOpen ? '' : ' hidden') + '>' +
      statusOpts.map(function (s) {
        var on = ui.statuses.indexOf(s) !== -1;
        return '<button type="button" class="hs-att-status-opt' + (on ? ' is-active' : '') + '" data-att-status-opt="' + escapeHtml(s) + '">' + escapeHtml(s) + '</button>';
      }).join('') +
      '</div></div></div></div>' +
      '<div class="hs-filter-acc' + (ui.dateAccOpen ? ' is-open' : '') + '">' +
      '<button type="button" class="hs-filter-acc__btn" data-att-acc="date">Date' + ATT_CHEV + '</button>' +
      '<div class="hs-filter-acc__body">' +
      '<button type="button" class="hs-att-date-range" data-att-date-range>' +
      '<span>' + escapeHtml(ui.dateStart) + '</span><span class="hs-att-date-range__arrow">→</span><span>' + escapeHtml(ui.dateEnd) + '</span>' +
      '<span class="hs-att-date-range__icon" aria-hidden="true">' + CAL_ICON + '</span></button>' +
      '</div></div></div>';
  }

  function attColsWrapHtml() {
    return '<div class="hs-wrap">' +
      '<button type="button" class="hs-icon-btn' + (state.attUi.colsOpen ? ' is-active' : '') + '" data-cols-btn aria-label="Columns" aria-haspopup="true" aria-expanded="' + (state.attUi.colsOpen ? 'true' : 'false') + '">' +
      COLS_ICON + CARET_ICON + '</button>' +
      '<div class="hs-columns-pop hs-columns-pop--att" id="hsAttColsPop"' + (state.attUi.colsOpen ? '' : ' hidden') + '>' +
      '<div class="hs-columns-pop__head"><span>Columns</span><button type="button" class="hs-link-reset" data-select-all-cols>Select All</button></div>' +
      '<div class="hs-columns-pop__list" data-cols-list></div></div></div>';
  }

  function attRowHtml(r) {
    var cells = {
      date: attCellVal(r.date), employee: attCellVal(r.employee), shift: attCellVal(r.shift), code: attCellVal(r.code),
      branch: attCellVal(r.branch), office: attCellVal(r.office), inTime: attCellVal(r.inTime), outTime: attCellVal(r.outTime),
      checkIn: attCellVal(r.checkIn), checkOut: attCellVal(r.checkOut), half1: attHalfBadge(r.half1), half2: attHalfBadge(r.half2),
      lateIn: attCellVal(r.lateIn), earlyOut: attCellVal(r.earlyOut), overTime: attCellVal(r.overTime), workHours: attCellVal(r.workHours),
      lessWork: attCellVal(r.lessWork), extraWork: attCellVal(r.extraWork), compOff: attCellVal(r.compOff), remarks: attCellVal(r.remarks),
      action: '<button type="button" class="hs-action hs-action--edit" data-att-edit="' + r.id + '" aria-label="Edit">' + EDIT_ICON + '</button>'
    };
    return '<tr data-id="' + r.id + '"><td class="hs-th-check"><input type="checkbox" aria-label="Select row"></td>' +
      ATT_COLS.map(function (c) {
        return '<td data-col="' + c.id + '"' + (state.attVisible[c.id] ? '' : ' hidden') + '>' + (cells[c.id] || '') + '</td>';
      }).join('') + '</tr>';
  }

  function renderAttendance() {
    var pending = state.attendanceSub === 'pending';
    var rows = pending ? filteredAttendanceRows() : [];
    var html = '<section class="hs-card hs-card--att" aria-label="HR Attendance">' +
      '<div class="hs-att-head">' +
      '<h2 class="hs-section-title">Attendance</h2>' +
      '<div class="hs-att-toggles" role="tablist">' +
      '<button type="button" class="hs-att-toggle' + (pending ? ' is-active' : '') + '" data-att-sub="pending">Pending requests <span class="hs-badge">1</span></button>' +
      '<button type="button" class="hs-att-toggle' + (!pending ? ' is-active' : '') + '" data-att-sub="actioned">Actioned requests</button>' +
      '</div>' +
      '<div class="hs-legend">' +
      '<span class="hs-leg"><i class="hs-dot hs-dot--p"></i> Present</span>' +
      '<span class="hs-leg"><i class="hs-dot hs-dot--a"></i> Absent</span>' +
      '<span class="hs-leg"><i class="hs-dot hs-dot--h1"></i> First Half</span>' +
      '<span class="hs-leg"><i class="hs-dot hs-dot--h2"></i> Second Half</span>' +
      '<span class="hs-leg"><i class="hs-dot hs-dot--h"></i> Holiday</span>' +
      '<span class="hs-leg"><i class="hs-dot hs-dot--pa"></i> Incomplete Attendance</span>' +
      '</div></div>' +
      '<div class="hs-toolbar">' +
      '<div class="hs-toolbar__left">' + (pending ? attEmpComboHtml() : '') + '</div>' +
      '<div class="hs-toolbar__actions">' +
      (pending ? attColsWrapHtml() : '') +
      (pending ? '<div class="hs-wrap"><button type="button" class="hs-icon-btn" data-att-export aria-label="Export">' + EXCEL_ICON + '</button></div>' : '') +
      (pending ? '<div class="hs-wrap"><button type="button" class="hs-icon-btn' + (state.attUi.filterOpen ? ' is-active' : '') + '" data-att-filter aria-label="Filter">' + FILTER_ICON + '</button>' + attFilterPopHtml() + '</div>' : '') +
      addBtnHtml('Add') +
      '<button type="button" class="hs-btn-teal" data-bulk-edit>Bulk Edit</button>' +
      '<button type="button" class="hs-btn-teal" data-from-machine>Get From Machine</button>' +
      '<button type="button" class="hs-icon-btn" data-refresh aria-label="Refresh">' + REFRESH_ICON + '</button>' +
      '</div></div>' +
      '<div class="hs-table-wrap"><table class="hs-table hs-table--att"><thead><tr>' +
      '<th class="hs-th-check"><input type="checkbox" aria-label="Select all"></th>' +
      ATT_COLS.map(function (c) {
        return '<th data-col="' + c.id + '"' + (state.attVisible[c.id] ? '' : ' hidden') + '>' + escapeHtml(c.label) + '</th>';
      }).join('') +
      '</tr></thead><tbody>' +
      (pending ? rows.map(attRowHtml).join('') : '') +
      '</tbody></table>' +
      (pending ? '' : '<div class="hs-empty"><p>No actioned requests</p></div>') +
      (pending && !rows.length ? '<div class="hs-empty"><p>No records match the selected filters</p></div>' : '') +
      '</div></section>';
    root.innerHTML = html;
    if (pending) {
      var listEl = root.querySelector('[data-cols-list]');
      if (listEl) renderColsPop(listEl, ATT_COLS, state.attVisible);
      applyColVis(state.attVisible);
    }
  }

  function renderRegularization() {
    root.innerHTML = '<section class="hs-card hs-card--form" aria-label="Bulk Regularization">' +
      '<div class="hs-form-panel">' +
      '<h2 class="hs-section-title">Bulk Regularization</h2>' +
      '<p class="hs-form-desc">Mark multiple employees present for a date range. Runs in the background — refresh attendance after a short delay.</p>' +
      '<form class="hs-bulk-form" id="hsBulkForm">' +
      '<div class="hs-field"><label class="hs-field__label">Employees <span class="hs-req">*</span></label>' +
      '<select class="hs-input hs-input--select" required><option value="">Select employees</option><option>All Employees</option><option>Rahul Sharma</option><option>Priya Mehta</option><option>Amit Verma</option></select></div>' +
      '<div class="hs-field"><label class="hs-field__label">Date range <span class="hs-req">*</span></label>' +
      '<div class="hs-date"><input class="hs-input" type="text" placeholder="dd/mm/yyyy – dd/mm/yyyy" required>' +
      '<span class="hs-date__icon" aria-hidden="true">' + CAL_ICON + '</span></div></div>' +
      '<div class="hs-field"><label class="hs-field__label">Regularization type <span class="hs-req">*</span></label>' +
      '<div class="hs-radios">' +
      '<label class="hs-radio"><input type="radio" name="regType" value="first"> First half</label>' +
      '<label class="hs-radio"><input type="radio" name="regType" value="second"> Second half</label>' +
      '<label class="hs-radio"><input type="radio" name="regType" value="full" checked> Full day</label>' +
      '</div></div>' +
      '<div class="hs-field"><label class="hs-field__label">Remark</label>' +
      '<textarea class="hs-textarea" rows="3" placeholder="Optional remark"></textarea></div>' +
      '<div class="hs-form-actions">' +
      '<button type="submit" class="hs-btn-teal hs-btn-teal--lg">Start bulk regularization</button>' +
      '<button type="reset" class="hs-btn-outline">Reset</button>' +
      '</div></form></div></section>';
  }

  function renderSummary() {
    var leftRows = [
      ['Employee', ''],
      ['Total Day', ''],
      ['Holidays/ Weekly Offs', ''],
      ['Total Working Days', ''],
      ['Leave Count', ''],
      ['Hourly Leaves', ''],
      ['Out Duty', ''],
      ['Total Absent', ''],
      ['Total Payable Days', '']
    ];
    var rightRows = [
      ['Full Day Count', ''],
      ['Half Day Count', ''],
      ['Total Work Hours', ''],
      ['Actual Work Hours', ''],
      ['Extra / Loss', '0'],
      ['Incomplete Work Hour (Days)', ''],
      ['No of Late Coming', '']
    ];
    function monthRows(rows) {
      return rows.map(function (r) {
        return '<div class="hs-month-row"><span class="hs-month-row__label">' + escapeHtml(r[0]) + ' :</span>' +
          '<span class="hs-month-row__value">' + escapeHtml(r[1]) + '</span></div>';
      }).join('');
    }
    root.innerHTML = '<section class="hs-card hs-card--form" aria-label="Attendance Summary">' +
      '<div class="hs-form-panel">' +
      '<h2 class="hs-section-title">Attendance Summary</h2>' +
      '<div class="hs-summary-filters">' +
      '<div class="hs-field"><label class="hs-field__label">Select month</label>' +
      '<select class="hs-input hs-input--select"><option>August 2026</option><option>July 2026</option><option>June 2026</option></select></div>' +
      '<div class="hs-field"><label class="hs-field__label">Employee</label>' +
      '<select class="hs-input hs-input--select"><option value="">Select employee</option><option>Rahul Sharma</option><option>Priya Mehta</option></select></div>' +
      '<button type="button" class="hs-link-reset" data-reset-summary>Reset</button>' +
      '</div>' +
      '<div class="hs-summary-grid">' +
      '<div class="hs-summary-card"><h3>Attendance</h3><div class="hs-summary-empty">No data</div></div>' +
      '<div class="hs-summary-card"><h3>Attendance Report</h3><div class="hs-summary-empty">No data</div></div>' +
      '</div>' +
      '<div class="hs-summary-card hs-summary-card--full hs-summary-card--month">' +
      '<h3 class="hs-summary-card__title-center">Summary for the month</h3>' +
      '<div class="hs-month-grid">' +
      '<div class="hs-month-col">' + monthRows(leftRows) + '</div>' +
      '<div class="hs-month-col">' + monthRows(rightRows) + '</div>' +
      '</div></div>' +
      '</div></section>';
  }

  function renderViewLock() {
    var pg = pageSlice(state.viewLocks, 'viewlock', 10);
    var html = '<section class="hs-card" aria-label="View Lock Attendance">' +
      '<div class="hs-toolbar">' +
      '<h2 class="hs-section-title hs-section-title--inline">View Lock Attendance</h2>' +
      '<div class="hs-toolbar__actions">' + addBtnHtml('Add lock') + '</div></div>' +
      '<div class="hs-table-wrap"><table class="hs-table"><thead><tr>' +
      VIEWLOCK_COLS.map(function (c) { return '<th data-col="' + c.id + '">' + escapeHtml(c.label) + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      pg.rows.map(function (r, i) {
        return '<tr data-id="' + r.id + '">' +
          '<td data-col="sno">' + ((pg.page - 1) * pg.size + i + 1) + '</td>' +
          '<td data-col="date">' + escapeHtml(r.date) + '</td>' +
          '<td data-col="month">' + escapeHtml(r.month) + '</td>' +
          '<td data-col="year">' + escapeHtml(r.year) + '</td>' +
          '<td data-col="lockedBy">' + escapeHtml(r.lockedBy) + '</td></tr>';
      }).join('') +
      '</tbody></table></div>' + paginationHtml(pg) + '</section>';
    root.innerHTML = html;
  }

  function renderUnlock() {
    var rows = filteredUnlockRows();
    var pg = pageSlice(rows, 'unlock', 10);
    var html = '<section class="hs-card" aria-label="Unlock Timesheet">' +
      '<div class="hs-toolbar">' +
      '<div class="hs-toolbar__left"></div>' +
      '<div class="hs-toolbar__actions">' +
      '<select class="hs-select" aria-label="Employee"><option>Employee</option><option>Rahul Sharma</option><option>Priya Mehta</option></select>' +
      '<div class="hs-wrap"><button type="button" class="hs-icon-btn' + (state.unlockUi.filterOpen ? ' is-active' : '') + '" data-unlock-filter aria-label="Filter">' + FILTER_ICON + '</button>' + unlockFilterPopHtml() + '</div>' +
      addBtnHtml('Add unlock') +
      '</div></div>' +
      '<div class="hs-table-wrap"><table class="hs-table"><thead><tr>' +
      UNLOCK_COLS.map(function (c) { return '<th data-col="' + c.id + '">' + escapeHtml(c.label) + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      pg.rows.map(function (r, i) {
        return '<tr data-id="' + r.id + '">' +
          '<td data-col="sno">' + ((pg.page - 1) * pg.size + i + 1) + '</td>' +
          '<td data-col="employees">' + escapeHtml(r.employees) + '</td>' +
          '<td data-col="start">' + escapeHtml(r.start) + '</td>' +
          '<td data-col="end">' + escapeHtml(r.end) + '</td>' +
          '<td data-col="since">' + escapeHtml(r.since) + '</td>' +
          '<td data-col="till">' + escapeHtml(r.till) + '</td>' +
          '<td data-col="action"><span class="hs-text-actions">' +
          '<button type="button" class="hs-text-link" data-edit="' + r.id + '">Edit</button>' +
          '<button type="button" class="hs-text-link hs-text-link--danger" data-delete="' + r.id + '">Delete</button>' +
          '</span></td></tr>';
      }).join('') +
      '</tbody></table>' +
      (pg.rows.length ? '' : '<div class="hs-empty"><p>No data</p></div>') +
      '</div>' + paginationHtml(pg) + '</section>';
    root.innerHTML = html;
  }

  function filteredUnlockRows() {
    return state.unlocks.filter(function (r) { return true; });
  }

  function unlockFilterPopHtml() {
    var ui = state.unlockUi;
    var seFrom = ui.startEndFrom || 'Start date';
    var seTo = ui.startEndTo || 'End date';
    var stFrom = ui.sinceTillFrom || 'Start date';
    var stTo = ui.sinceTillTo || 'End date';
    return '<div class="hs-filter-pop" id="hsUnlockFilterPop"' + (ui.filterOpen ? '' : ' hidden') + '>' +
      '<div class="hs-filter-pop__head"><span>Filter</span><button type="button" class="hs-link-reset" data-unlock-filter-reset>Reset</button></div>' +
      '<div class="hs-filter-acc' + (ui.startEndAccOpen ? ' is-open' : '') + '">' +
      '<button type="button" class="hs-filter-acc__btn" data-unlock-acc="startEnd">Start End Range' + ATT_CHEV + '</button>' +
      '<div class="hs-filter-acc__body">' +
      '<button type="button" class="hs-att-date-range" data-unlock-range="startEnd">' +
      '<span class="' + (ui.startEndFrom ? '' : 'hs-muted') + '">' + escapeHtml(seFrom) + '</span>' +
      '<span class="hs-att-date-range__arrow">→</span>' +
      '<span class="' + (ui.startEndTo ? '' : 'hs-muted') + '">' + escapeHtml(seTo) + '</span>' +
      '<span class="hs-att-date-range__icon" aria-hidden="true">' + CAL_ICON + '</span></button>' +
      '</div></div>' +
      '<div class="hs-filter-acc' + (ui.sinceTillAccOpen ? ' is-open' : '') + '">' +
      '<button type="button" class="hs-filter-acc__btn" data-unlock-acc="sinceTill">Since Till Range' + ATT_CHEV + '</button>' +
      '<div class="hs-filter-acc__body">' +
      '<button type="button" class="hs-att-date-range" data-unlock-range="sinceTill">' +
      '<span class="' + (ui.sinceTillFrom ? '' : 'hs-muted') + '">' + escapeHtml(stFrom) + '</span>' +
      '<span class="hs-att-date-range__arrow">→</span>' +
      '<span class="' + (ui.sinceTillTo ? '' : 'hs-muted') + '">' + escapeHtml(stTo) + '</span>' +
      '<span class="hs-att-date-range__icon" aria-hidden="true">' + CAL_ICON + '</span></button>' +
      '</div></div></div>';
  }

  function renderNoDues() {
    var html = '<section class="hs-card hs-card--form" aria-label="No Dues Form">' +
      '<div class="hs-form-panel">' +
      '<h2 class="hs-section-title">Assign No Dues Flow</h2>' +
      '<form id="hsNoDuesForm">' +
      state.noDues.map(function (row, i) {
        return '<div class="hs-nodue-row" data-nodue-id="' + row.id + '">' +
          '<div class="hs-nodue-label">No Due Head ' + (i + 1) +
          ' <button type="button" class="hs-nodue-add" data-nodue-plus="' + row.id + '" aria-label="Add">+</button>' +
          ' <button type="button" class="hs-nodue-x" data-nodue-remove="' + row.id + '" aria-label="Remove">&times;</button></div>' +
          '<div class="hs-nodue-fields">' +
          '<div class="hs-field"><label class="hs-field__label">Category <span class="hs-req">*</span></label>' +
          '<select class="hs-input hs-input--select" required><option value="">Select category</option><option>IT</option><option>Admin</option><option>Finance</option><option>HR</option></select></div>' +
          '<div class="hs-field"><label class="hs-field__label">Employee <span class="hs-req">*</span></label>' +
          '<select class="hs-input hs-input--select" required><option value="">Select employee</option><option>Rahul Sharma</option><option>Priya Mehta</option><option>Amit Verma</option></select></div>' +
          '</div></div>';
      }).join('') +
      '<button type="button" class="hs-btn-dashed" data-add-nodue>+ Add Item</button>' +
      '<div class="hs-modal__foot"><button type="submit" class="hs-btn-save">Submit</button></div>' +
      '</form></div></section>';
    root.innerHTML = html;
  }

  var RENDERERS = {
    holiday: renderHoliday,
    shift: renderShift,
    leave: renderLeave,
    blacklist: renderBlacklist,
    quota: renderQuota,
    club: renderClub,
    attendance: renderAttendance,
    regularization: renderRegularization,
    summary: renderSummary,
    viewlock: renderViewLock,
    unlock: renderUnlock,
    nodues: renderNoDues
  };

  function renderTab(tab) {
    state.tab = tab || state.tab;
    if (state.tab !== 'holiday') closeHolidayTplModal();
    closeDeletePop();
    tabs.forEach(function (btn) {
      var on = btn.getAttribute('data-tab') === state.tab;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    var fn = RENDERERS[state.tab];
    if (fn) fn();
    else root.innerHTML = '<section class="hs-card hs-card--placeholder"><div class="hs-placeholder"><p>Coming soon</p></div></section>';
  }

  /* ---------- Modals ---------- */

  function formatHolDate(y, m, d) {
    return pad(d) + '/' + pad(m + 1) + '/' + y;
  }

  function parseHolDateStr(str) {
    var p = String(str || '').split('/');
    if (p.length !== 3) return null;
    return { day: +p[0], month: +p[1] - 1, year: +p[2] };
  }

  function getHolDateInput(mode, target) {
    if (mode === 'blacklist') return document.getElementById(target === 'end' ? 'hsBlEndDate' : 'hsBlStartDate');
    if (mode === 'leave') return document.getElementById('hsLeaveCreditDate');
    if (mode === 'bulk') return document.getElementById(target === 'to' ? 'hsBulkToDate' : 'hsBulkFromDate');
    return document.getElementById(target === 'to' ? 'hsToDate' : 'hsFromDate');
  }

  function getHolDateWrap(mode, target) {
    if (mode === 'blacklist') return target === 'end' ? blEndDateWrap : blStartDateWrap;
    if (mode === 'leave') return leaveCreditDateWrap;
    if (mode === 'bulk') return target === 'to' ? bulkToDateWrap : bulkFromDateWrap;
    return target === 'to' ? toDateWrap : fromDateWrap;
  }

  function closeHolDatePop() {
    if (datePop) datePop.hidden = true;
    [fromDateWrap, toDateWrap, bulkFromDateWrap, bulkToDateWrap, leaveCreditDateWrap, blStartDateWrap, blEndDateWrap].forEach(function (w) { if (w) w.classList.remove('is-active'); });
  }

  function placeHolDatePop(wrap) {
    if (!datePop || !wrap) return;
    var rect = wrap.getBoundingClientRect();
    var popW = datePop.offsetWidth || 280;
    var left = Math.min(window.innerWidth - popW - 12, Math.max(12, rect.left));
    var top = rect.bottom + 6;
    if (top + 320 > window.innerHeight) top = Math.max(12, rect.top - 320);
    datePop.style.left = left + 'px';
    datePop.style.top = top + 'px';
  }

  function renderHolDatePop() {
    if (!datePopGrid || !datePopLabel) return;
    datePopLabel.textContent = HOL_MONTHS[holDateState.month] + ' ' + holDateState.year;
    var first = new Date(holDateState.year, holDateState.month, 1).getDay();
    var days = new Date(holDateState.year, holDateState.month + 1, 0).getDate();
    var prevDays = new Date(holDateState.year, holDateState.month, 0).getDate();
    var html = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(function (d) { return '<span>' + d + '</span>'; }).join('');
    var i;
    for (i = 0; i < first; i++) html += '<button type="button" class="is-muted" tabindex="-1">' + (prevDays - first + i + 1) + '</button>';
    for (i = 1; i <= days; i++) {
      var sel = i === holDateState.day ? ' class="is-selected"' : '';
      html += '<button type="button"' + sel + ' data-day="' + i + '">' + i + '</button>';
    }
    datePopGrid.innerHTML = html;
  }

  function applyHolDate() {
    var val = formatHolDate(holDateState.year, holDateState.month, holDateState.day);
    var input = getHolDateInput(holDateState.mode, holDateState.target);
    if (input) input.value = val;
    closeHolDatePop();
  }

  function openHolDatePop(mode, target, wrap) {
    holDateState.mode = mode;
    holDateState.target = target;
    var input = getHolDateInput(mode, target);
    var parsed = input && input.value ? parseHolDateStr(input.value) : null;
    var now = new Date();
    if (parsed) { holDateState.year = parsed.year; holDateState.month = parsed.month; holDateState.day = parsed.day; }
    else { holDateState.year = now.getFullYear(); holDateState.month = now.getMonth(); holDateState.day = now.getDate(); }
    [fromDateWrap, toDateWrap, bulkFromDateWrap, bulkToDateWrap, leaveCreditDateWrap, blStartDateWrap, blEndDateWrap].forEach(function (w) { if (w) w.classList.remove('is-active'); });
    var activeWrap = wrap || getHolDateWrap(mode, target);
    if (activeWrap) activeWrap.classList.add('is-active');
    renderHolDatePop();
    if (datePop) datePop.hidden = false;
    placeHolDatePop(activeWrap);
  }

  function bindHolDatePicker() {
    if (fromDateWrap) fromDateWrap.addEventListener('click', function () { openHolDatePop('holiday', 'from', fromDateWrap); });
    if (toDateWrap) toDateWrap.addEventListener('click', function () { openHolDatePop('holiday', 'to', toDateWrap); });
    if (bulkFromDateWrap) bulkFromDateWrap.addEventListener('click', function () { openHolDatePop('bulk', 'from', bulkFromDateWrap); });
    if (bulkToDateWrap) bulkToDateWrap.addEventListener('click', function () { openHolDatePop('bulk', 'to', bulkToDateWrap); });
    if (leaveCreditDateWrap) leaveCreditDateWrap.addEventListener('click', function () { openHolDatePop('leave', 'credit', leaveCreditDateWrap); });
    if (blStartDateWrap) blStartDateWrap.addEventListener('click', function () { openHolDatePop('blacklist', 'start', blStartDateWrap); });
    if (blEndDateWrap) blEndDateWrap.addEventListener('click', function () { openHolDatePop('blacklist', 'end', blEndDateWrap); });
    if (datePopGrid) {
      datePopGrid.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-day]');
        if (!btn) return;
        holDateState.day = +btn.dataset.day;
        renderHolDatePop();
        applyHolDate();
      });
    }
    if (datePop) {
      datePop.addEventListener('click', function (e) {
        e.stopPropagation();
        var nav = e.target.closest('[data-hol-nav]');
        if (!nav) return;
        var type = nav.getAttribute('data-hol-nav');
        if (type === 'm-prev') { holDateState.month--; if (holDateState.month < 0) { holDateState.month = 11; holDateState.year--; } }
        else if (type === 'm-next') { holDateState.month++; if (holDateState.month > 11) { holDateState.month = 0; holDateState.year++; } }
        else if (type === 'yy-prev') holDateState.year--;
        else if (type === 'yy-next') holDateState.year++;
        renderHolDatePop();
      });
    }
    if (datePopToday) {
      datePopToday.addEventListener('click', function () {
        var n = new Date();
        holDateState.year = n.getFullYear();
        holDateState.month = n.getMonth();
        holDateState.day = n.getDate();
        renderHolDatePop();
        applyHolDate();
      });
    }
    document.addEventListener('click', function (e) {
      if (datePop && !datePop.hidden && !e.target.closest('#hsDatePop') && !e.target.closest('#hsFromDateWrap') && !e.target.closest('#hsToDateWrap') &&
          !e.target.closest('#hsBulkFromDateWrap') && !e.target.closest('#hsBulkToDateWrap') && !e.target.closest('#hsLeaveCreditDateWrap') &&
          !e.target.closest('#hsBlStartDateWrap') && !e.target.closest('#hsBlEndDateWrap')) {
        closeHolDatePop();
      }
    });
  }

  function setHolidayTypeValue(typeVal) {
    var sel = document.getElementById('hsHolidayType');
    if (!sel) return;
    var found = false;
    Array.prototype.forEach.call(sel.options, function (opt) {
      if (opt.value && opt.value === typeVal) { opt.selected = true; found = true; }
    });
    if (!found) sel.selectedIndex = 0;
  }

  function openHolidayModal(row) {
    state.editingHolidayId = row ? row.id : null;
    document.getElementById('hsModalTitle').textContent = row ? 'Edit Holiday' : 'Add Holiday';
    document.getElementById('hsFromDate').value = row ? row.from : '';
    document.getElementById('hsToDate').value = row ? row.to : '';
    document.getElementById('hsHolidayName').value = row ? row.name : '';
    setHolidayTypeValue(row ? row.type : '');
    document.getElementById('hsDesc').value = row ? row.description : '';
    document.getElementById('hsOptional').checked = !!(row && row.optional);
    document.getElementById('hsSandwich').checked = row ? !!row.sandwich : true;
    var branchSel = document.getElementById('hsBranch');
    var officeInp = document.getElementById('hsOffice');
    if (branchSel) branchSel.value = row ? (row.branch || 'All') : 'All';
    if (officeInp) officeInp.value = row ? (row.office === 'All' ? '' : row.office) : '';
    closeHolDatePop();
    holidayModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeHolidayModal() {
    holidayModal.hidden = true;
    if (!bulkHolidayModal || bulkHolidayModal.hidden) document.body.style.overflow = '';
    state.editingHolidayId = null;
    closeHolDatePop();
  }

  function openBulkHolidayModal() {
    if (!bulkHolidayForm) return;
    bulkHolidayForm.reset();
    document.getElementById('hsBulkBranch').value = 'All';
    closeHolDatePop();
    bulkHolidayModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeBulkHolidayModal() {
    if (!bulkHolidayModal) return;
    bulkHolidayModal.hidden = true;
    if (holidayModal.hidden && shiftModal.hidden && templateModal.hidden && holidayLibModal.hidden) document.body.style.overflow = '';
    closeHolDatePop();
  }

  function saturdayIndex(dt) {
    var n = 0;
    for (var i = 1; i <= dt.getDate(); i++) if (new Date(dt.getFullYear(), dt.getMonth(), i).getDay() === 6) n++;
    return n;
  }

  function matchesBulkDay(dt, opts) {
    var dow = dt.getDay();
    if (opts.allSat && dow === 6) return true;
    if (opts.oddSat && dow === 6 && saturdayIndex(dt) % 2 === 1) return true;
    if (opts.evenSat && dow === 6 && saturdayIndex(dt) % 2 === 0) return true;
    if (opts.allSun && dow === 0) return true;
    if (opts.allFri && dow === 5) return true;
    return false;
  }

  function dayLabel(dt) {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dt.getDay()];
  }

  function saveBulkHolidays() {
    var fromStr = (document.getElementById('hsBulkFromDate').value || '').trim();
    var toStr = (document.getElementById('hsBulkToDate').value || '').trim();
    var typeVal = document.getElementById('hsBulkType').value;
    if (!fromStr || !toStr) { toast('Required', 'From Date and To Date are required.'); return; }
    if (!typeVal) { toast('Required', 'Please select Holiday Type.'); return; }
    var opts = {
      allSat: !!document.getElementById('hsBulkAllSat').checked,
      oddSat: !!document.getElementById('hsBulkOddSat').checked,
      evenSat: !!document.getElementById('hsBulkEvenSat').checked,
      allSun: !!document.getElementById('hsBulkAllSun').checked,
      allFri: !!document.getElementById('hsBulkAllFri').checked
    };
    if (!opts.allSat && !opts.oddSat && !opts.evenSat && !opts.allSun && !opts.allFri) {
      toast('Required', 'Select at least one recurring day option.');
      return;
    }
    var fromP = parseHolDateStr(fromStr);
    var toP = parseHolDateStr(toStr);
    if (!fromP || !toP) { toast('Invalid date', 'Please select valid dates.'); return; }
    var start = new Date(fromP.year, fromP.month, fromP.day);
    var end = new Date(toP.year, toP.month, toP.day);
    if (start > end) { toast('Invalid range', 'From Date must be before To Date.'); return; }
    var nameBase = (document.getElementById('hsBulkName').value || '').trim();
    var branch = document.getElementById('hsBulkBranch').value || 'All';
    var office = (document.getElementById('hsBulkOffice').value || '').trim() || 'All';
    var desc = (document.getElementById('hsBulkDesc').value || '').trim();
    var added = 0;
    for (var d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (!matchesBulkDay(d, opts)) continue;
      var dateStr = formatHolDate(d.getFullYear(), d.getMonth(), d.getDate());
      state.holidays.push({
        id: state.nextHolidayId++,
        name: nameBase || dayLabel(d),
        from: dateStr, to: dateStr, optional: false, type: typeVal,
        branch: branch, office: office, description: desc, sandwich: false
      });
      added++;
    }
    if (!added) { toast('No holidays', 'No matching days found in the selected range.'); return; }
    closeBulkHolidayModal();
    renderTab('holiday');
    toast('Saved', added + ' bulk holiday(s) added.');
  }

  function openShiftModal(row) {
    closeDeletePop();
    closeHolDatePop();
    state.editingShiftId = row ? row.id : null;
    document.getElementById('hsShiftModalTitle').textContent = row ? 'Edit Shift' : 'Add Shift';
    document.getElementById('hsShiftName').value = row ? row.name : '';
    document.getElementById('hsInTime').value = row ? row.inTime : '';
    document.getElementById('hsOutTime').value = row ? row.outTime : '';
    document.getElementById('hsLateIn').value = row ? row.lateIn : '';
    document.getElementById('hsEarlyOut').value = row ? row.earlyOut : '';
    document.getElementById('hsFullDay').value = row ? row.fullDay : '';
    document.getElementById('hsHalfDay').value = row ? row.halfDay : '';
    document.getElementById('hsFullCoff').value = row ? row.fullCoff : '';
    document.getElementById('hsHalfCoff').value = row ? row.halfCoff : '';
    document.getElementById('hsMarkDefault').checked = !!(row && row.isDefault);
    shiftModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeShiftModal() {
    shiftModal.hidden = true;
    if ((!leaveModal || leaveModal.hidden) && (!holidayModal || holidayModal.hidden) && (!bulkHolidayModal || bulkHolidayModal.hidden)) document.body.style.overflow = '';
    state.editingShiftId = null;
  }

  function formatLeaveGender(g) {
    var s = String(g || '').trim();
    if (!s) return s;
    if (s.toUpperCase() === 'MALE') return 'Male';
    if (s.toUpperCase() === 'FEMALE') return 'Female';
    return s.toUpperCase() === 'OTHERS' ? 'OTHERS' : s;
  }

  function openLeaveModal(row) {
    closeDeletePop();
    closeHolDatePop();
    state.editingLeaveId = row ? row.id : null;
    document.getElementById('hsLeaveModalTitle').textContent = row ? 'Edit Leave' : 'Add Leave';
    document.getElementById('hsLeaveName').value = row ? row.name : '';
    document.getElementById('hsLeaveAbbr').value = row ? row.abbr : '';
    document.getElementById('hsLeavePayable').checked = row ? !!row.payable : false;
    setTags(document.getElementById('hsLeaveGenders'), row ? (row.leaveFor || []).map(formatLeaveGender) : ['Male', 'Female', 'OTHERS']);
    document.getElementById('hsLeaveCreditFreq').value = row ? (row.creditFreq || 'Yearly') : 'Yearly';
    document.getElementById('hsLeaveCreditDate').value = row ? (row.nextCreditDate || '') : '';
    document.getElementById('hsLeavePastDays').value = row ? (row.pastDays || '') : '';
    document.getElementById('hsLeaveFutureDays').value = row ? (row.futureDays || '') : '';
    document.getElementById('hsLeaveType').value = row ? (row.leaveType || 'Accumulate') : 'Accumulate';
    document.getElementById('hsLeaveMaxAccum').value = row ? (row.maxAccumulate || '') : '';
    document.getElementById('hsLeaveHourly').checked = row ? !!row.hourlyCount : false;
    document.getElementById('hsLeaveSandwich').checked = row ? !!row.sandwich : false;
    document.getElementById('hsLeaveOptional').checked = row ? !!row.optional : false;
    document.getElementById('hsLeaveAutoApproved').checked = row ? !!row.autoApproved : false;
    document.getElementById('hsLeaveMaxCount').value = row ? (row.maxCount || '') : '';
    document.getElementById('hsLeaveMaxHol').value = row ? (row.maxCountWithHoliday || '') : '';
    leaveModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLeaveModal() {
    if (!leaveModal) return;
    leaveModal.hidden = true;
    if (holidayModal.hidden && shiftModal.hidden && templateModal.hidden && holidayLibModal.hidden && (!bulkHolidayModal || bulkHolidayModal.hidden) && (!blacklistModal || blacklistModal.hidden)) document.body.style.overflow = '';
    state.editingLeaveId = null;
    closeHolDatePop();
  }

  function openBlacklistModal(row) {
    closeDeletePop();
    closeHolDatePop();
    state.editingBlacklistId = row ? row.id : null;
    document.getElementById('hsBlacklistModalTitle').textContent = row ? 'Edit Blacklist Leave' : 'Add Blacklist Leave';
    document.getElementById('hsBlName').value = row ? row.name : '';
    document.getElementById('hsBlStartDate').value = row ? row.start : '';
    document.getElementById('hsBlEndDate').value = row ? row.end : '';
    blacklistModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeBlacklistModal() {
    if (!blacklistModal) return;
    blacklistModal.hidden = true;
    if (holidayModal.hidden && shiftModal.hidden && templateModal.hidden && holidayLibModal.hidden && (!bulkHolidayModal || bulkHolidayModal.hidden) && (!leaveModal || leaveModal.hidden)) document.body.style.overflow = '';
    state.editingBlacklistId = null;
    closeHolDatePop();
  }

  function bindLeaveGendersInput() {
    bindTagsInput(document.getElementById('hsLeaveGenders'));
  }

  function bindTagsInput(container) {
    if (!container || container.dataset.bound) return;
    container.dataset.bound = '1';
    var input = container.querySelector('.hs-tags__input');
    if (!input) return;
    input.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ',') return;
      e.preventDefault();
      var val = input.value.replace(/,/g, '').trim();
      if (!val) return;
      var tags = getTags(container);
      if (tags.indexOf(val) === -1) setTags(container, tags.concat([val]));
      input.value = '';
    });
  }

  function getLeaveQuotaOptions() {
    return state.leaves.map(function (l) { return l.name + ' (' + l.abbr + ')'; });
  }

  function fillQuotaLeaveSelect(selected) {
    var sel = document.getElementById('hsQuotaLeave');
    if (!sel) return;
    var opts = getLeaveQuotaOptions();
    sel.innerHTML = opts.map(function (o) {
      return '<option value="' + escapeHtml(o) + '"' + (o === selected ? ' selected' : '') + '>' + escapeHtml(o) + '</option>';
    }).join('');
  }

  function openQuotaModal(row) {
    closeDeletePop();
    closeHolDatePop();
    state.editingQuotaId = row ? row.id : null;
    document.getElementById('hsQuotaModalTitle').textContent = row ? 'Edit Leave Quota' : 'Add Leave Quota';
    fillQuotaLeaveSelect(row ? row.leave : getLeaveQuotaOptions()[0]);
    setTags(document.getElementById('hsQuotaBranches'), row ? row.branches : []);
    setTags(document.getElementById('hsQuotaDesignations'), row ? quotaDesignations(row) : []);
    document.getElementById('hsQuotaCount').value = row ? String(row.count) : '';
    quotaModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeQuotaModal() {
    if (!quotaModal) return;
    quotaModal.hidden = true;
    if (anyHsModalClosedExcept('quota')) document.body.style.overflow = '';
    state.editingQuotaId = null;
  }

  function anyHsModalClosedExcept(except) {
    var map = {
      holiday: holidayModal, bulk: bulkHolidayModal, shift: shiftModal, leave: leaveModal,
      blacklist: blacklistModal, quota: quotaModal, 'quota-users': quotaUsersModal,
      template: templateModal, 'holiday-lib': holidayLibModal, 'holiday-tpl': holidayTplModal
    };
    return Object.keys(map).every(function (k) {
      if (k === except) return true;
      var el = map[k];
      return !el || el.hidden;
    });
  }

  function filterQuotaUsers(list) {
    var q = (state.quotaUserSearch || '').trim().toLowerCase();
    if (!q) return list;
    return list.filter(function (u) {
      return (u.name + ' ' + u.code + ' ' + u.designation + ' ' + u.email + ' ' + u.branch).toLowerCase().indexOf(q) !== -1;
    });
  }

  function renderQuotaUsersTable() {
    var body = document.getElementById('hsQuotaUsersBody');
    if (!body) return;
    var list = state.quotaUserTab === 'included' ? QUOTA_INCLUDED_USERS : QUOTA_EXCLUDED_USERS;
    list = filterQuotaUsers(list);
    body.innerHTML = list.map(function (u, i) {
      return '<tr><td>' + (i + 1) + '</td><td>' + escapeHtml(u.name) + '</td><td>' + escapeHtml(u.code) + '</td>' +
        '<td>' + escapeHtml(u.designation) + '</td><td>' + escapeHtml(u.email) + '</td><td>' + escapeHtml(u.branch) + '</td></tr>';
    }).join('') || '<tr><td colspan="6" class="hs-empty-cell">No users found</td></tr>';
  }

  function openQuotaUsersModal(quotaId) {
    closeDeletePop();
    state.viewingQuotaId = quotaId;
    state.quotaUserTab = 'included';
    state.quotaUserSearch = '';
    var search = document.getElementById('hsQuotaUserSearch');
    if (search) search.value = '';
    document.querySelectorAll('[data-quota-user-tab]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-quota-user-tab') === 'included');
    });
    renderQuotaUsersTable();
    quotaUsersModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeQuotaUsersModal() {
    if (!quotaUsersModal) return;
    quotaUsersModal.hidden = true;
    if (anyHsModalClosedExcept('quota-users')) document.body.style.overflow = '';
    state.viewingQuotaId = null;
    state.quotaUserSearch = '';
  }

  function renderTemplates() {
    var body = document.getElementById('hsTemplateBody');
    if (!body) return;
    body.innerHTML = state.templates.map(function (r, i) {
      return '<tr data-id="' + r.id + '"><td>' + (i + 1) + '</td><td>' + escapeHtml(r.name) + '</td>' +
        '<td>' + escapeHtml(r.inTime) + '</td><td>' + escapeHtml(r.outTime) + '</td>' +
        '<td>' + escapeHtml(r.lateIn) + '</td><td>' + escapeHtml(r.earlyOut) + '</td>' +
        '<td>' + escapeHtml(r.fullDay) + '</td><td>' + escapeHtml(r.halfDay) + '</td>' +
        '<td>' + escapeHtml(r.fullCoff) + '</td><td>' + escapeHtml(r.halfCoff) + '</td>' +
        '<td>' + actionDelOnly('data-tpl-delete', r.id) + '</td></tr>';
    }).join('');
  }

  function openTemplateModal() {
    renderTemplates();
    templateModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeTemplateModal() {
    templateModal.hidden = true;
    document.body.style.overflow = '';
  }

  function resetAttUploadForm() {
    if (attUploadForm) attUploadForm.reset();
    var label = document.getElementById('hsAttUploadLabel');
    var btn = document.getElementById('hsAttUploadBtn');
    if (label) label.textContent = 'Click to Upload';
    if (btn) btn.classList.remove('has-file');
  }

  function openAttUploadModal() {
    resetAttUploadForm();
    if (!attUploadModal) return;
    attUploadModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeAttUploadModal() {
    if (!attUploadModal) return;
    attUploadModal.hidden = true;
    resetAttUploadForm();
    restoreBodyScroll();
  }

  function restoreBodyScroll() {
    var open = [holidayModal, bulkHolidayModal, shiftModal, leaveModal, blacklistModal, quotaModal, quotaUsersModal, templateModal, holidayLibModal, holidayTplModal, attUploadModal, lockModal, unlockModal].some(function (m) { return m && !m.hidden; });
    if (!open) document.body.style.overflow = '';
  }

  function resetLockForm() {
    state.lockUi = { pickerYear: 2026, selectedMonth: null, selectedYear: null, pickerOpen: false };
    if (lockMonthInput) { lockMonthInput.value = ''; lockMonthInput.setAttribute('aria-expanded', 'false'); }
    if (lockMonthPicker) lockMonthPicker.hidden = true;
    renderLockMonthGrid();
  }

  function renderLockMonthGrid() {
    if (!lockMonthGrid || !lockPickerYear) return;
    lockPickerYear.textContent = String(state.lockUi.pickerYear);
    lockMonthGrid.innerHTML = MONTH_SHORT.map(function (label, idx) {
      var active = state.lockUi.selectedYear === state.lockUi.pickerYear && state.lockUi.selectedMonth === idx ? ' is-active' : '';
      return '<button type="button" class="hs-month-picker__cell' + active + '" data-lock-month="' + idx + '">' + label + '</button>';
    }).join('');
  }

  function toggleLockMonthPicker(open) {
    state.lockUi.pickerOpen = open != null ? open : !state.lockUi.pickerOpen;
    if (lockMonthPicker) lockMonthPicker.hidden = !state.lockUi.pickerOpen;
    if (lockMonthInput) lockMonthInput.setAttribute('aria-expanded', state.lockUi.pickerOpen ? 'true' : 'false');
    if (state.lockUi.pickerOpen) renderLockMonthGrid();
  }

  function openLockModal() {
    resetLockForm();
    if (!lockModal) return;
    lockModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLockModal() {
    if (!lockModal) return;
    lockModal.hidden = true;
    resetLockForm();
    restoreBodyScroll();
  }

  function saveLockAttendance() {
    if (state.lockUi.selectedMonth == null) {
      toast('Required', 'Please select month and year.');
      toggleLockMonthPicker(true);
      return;
    }
    var monthIdx = state.lockUi.selectedMonth;
    var year = state.lockUi.selectedYear;
    var monthName = MONTH_FULL[monthIdx];
    var maxId = state.viewLocks.reduce(function (m, r) { return Math.max(m, r.id); }, 0);
    var mNum = monthIdx + 1;
    state.viewLocks.unshift({
      id: maxId + 1,
      date: '01/' + (mNum < 10 ? '0' : '') + mNum + '/' + year,
      month: monthName,
      year: String(year),
      lockedBy: 'Admin'
    });
    toast('Saved', monthName + ' ' + year + ' attendance locked.');
    closeLockModal();
    renderTab('viewlock');
  }

  function resetUnlockForm() {
    if (unlockForm) unlockForm.reset();
    state.editingUnlockId = null;
    setUnlockEmployeeDisplay('');
    var title = document.getElementById('hsUnlockTitle');
    if (title) title.textContent = 'Unlock Timesheet';
  }

  function openUnlockModal(row) {
    resetUnlockForm();
    state.editingUnlockId = row ? row.id : null;
    if (row) {
      var title = document.getElementById('hsUnlockTitle');
      if (title) title.textContent = 'Edit Unlock Timesheet';
      setUnlockEmployeeDisplay(row.employees || '');
      var start = document.getElementById('hsUnlockStart');
      if (start) start.value = row.start || '';
      var end = document.getElementById('hsUnlockEnd');
      if (end) end.value = row.end || '';
      var since = document.getElementById('hsUnlockSince');
      if (since) since.value = row.since || '';
      var till = document.getElementById('hsUnlockTill');
      if (till) till.value = row.till || '';
    }
    if (!unlockModal) return;
    unlockModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeUnlockModal() {
    if (!unlockModal) return;
    unlockModal.hidden = true;
    resetUnlockForm();
    restoreBodyScroll();
  }

  function saveUnlockTimesheet() {
    var employees = getUnlockEmployeeValue();
    var start = (document.getElementById('hsUnlockStart').value || '').trim();
    var end = (document.getElementById('hsUnlockEnd').value || '').trim();
    var since = (document.getElementById('hsUnlockSince').value || '').trim();
    var till = (document.getElementById('hsUnlockTill').value || '').trim();
    if (!employees) { toast('Required', 'Please enter employees.'); return; }
    var payload = { employees: employees, start: start, end: end, since: since, till: till };
    if (state.editingUnlockId) {
      state.unlocks = state.unlocks.map(function (u) {
        return u.id === state.editingUnlockId ? Object.assign({}, u, payload) : u;
      });
      toast('Saved', 'Unlock timesheet updated.');
    } else {
      var maxId = state.unlocks.reduce(function (m, r) { return Math.max(m, r.id); }, 0);
      payload.id = maxId + 1;
      state.unlocks.unshift(payload);
      toast('Saved', 'Timesheet unlock added.');
    }
    closeUnlockModal();
    renderTab('unlock');
  }

  function closeAnyModal() {
    closeDeletePop();
    closeCopyPop();
    if (holidayModal && !holidayModal.hidden) closeHolidayModal();
    if (bulkHolidayModal && !bulkHolidayModal.hidden) closeBulkHolidayModal();
    if (leaveModal && !leaveModal.hidden) closeLeaveModal();
    if (blacklistModal && !blacklistModal.hidden) closeBlacklistModal();
    if (quotaModal && !quotaModal.hidden) closeQuotaModal();
    if (quotaUsersModal && !quotaUsersModal.hidden) closeQuotaUsersModal();
    if (shiftModal && !shiftModal.hidden) closeShiftModal();
    if (templateModal && !templateModal.hidden) closeTemplateModal();
    if (holidayLibModal && !holidayLibModal.hidden) closeHolidayLibModal();
    if (holidayTplModal && !holidayTplModal.hidden) closeHolidayTplModal();
    if (attUploadModal && !attUploadModal.hidden) closeAttUploadModal();
    if (lockModal && !lockModal.hidden) closeLockModal();
    if (unlockModal && !unlockModal.hidden) closeUnlockModal();
  }

  /* ---------- Delete popover ---------- */

  function placeConfirmPop(pop, anchor) {
    if (!pop || !anchor) return;
    pop.hidden = false;
    var rect = anchor.getBoundingClientRect();
    var popW = pop.offsetWidth || 260;
    var popH = pop.offsetHeight || 100;
    var left = rect.right - popW;
    var top = rect.top - popH - 10;
    if (left < 8) left = 8;
    if (left + popW > window.innerWidth - 8) left = window.innerWidth - popW - 8;
    if (top < 8) top = rect.bottom + 10;
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
  }

  function openDeletePop(anchor, id) {
    if (!delPop || !anchor) return;
    closeCopyPop();
    state.deleteHolidayId = id;
    state.deletePopTab = state.tab;
    placeConfirmPop(delPop, anchor);
  }

  function closeDeletePop() {
    if (!delPop) return;
    delPop.hidden = true;
    state.deleteHolidayId = null;
    state.deletePopTab = null;
  }

  function openCopyPop(anchor, id) {
    if (!copyPop || !anchor) return;
    closeDeletePop();
    state.copyHolidayLibId = id;
    placeConfirmPop(copyPop, anchor);
  }

  function closeCopyPop() {
    if (!copyPop) return;
    copyPop.hidden = true;
    state.copyHolidayLibId = null;
  }

  function confirmHolidayCopy() {
    var id = state.copyHolidayLibId;
    if (id == null) return;
    copyHolidayFromLibrary(id);
    closeCopyPop();
  }

  function confirmHolidayDelete() {
    var did = state.deleteHolidayId;
    if (did == null) return;
    if (state.deletePopTab === 'unlock') {
      state.unlocks = state.unlocks.filter(function (u) { return u.id !== did; });
      closeDeletePop();
      renderTab('unlock');
      toast('Deleted', 'Unlock timesheet removed.');
      return;
    }
    state.holidays = state.holidays.filter(function (h) { return h.id !== did; });
    delete state.holidaySelected[did];
    closeDeletePop();
    renderTab('holiday');
    toast('Deleted', 'Holiday removed.');
  }

  function setUnlockEmployeeDisplay(value) {
    var tag = document.getElementById('hsUnlockEmpTag');
    var tagText = document.getElementById('hsUnlockEmpTagText');
    var inp = document.getElementById('hsUnlockEmployees');
    var v = (value || '').trim();
    if (!tag || !tagText || !inp) return;
    if (v) {
      tagText.textContent = v;
      tag.hidden = false;
      inp.placeholder = '';
      inp.value = '';
    } else {
      tag.hidden = true;
      tagText.textContent = '';
      inp.placeholder = 'Employees';
    }
  }

  function getUnlockEmployeeValue() {
    var tag = document.getElementById('hsUnlockEmpTag');
    var tagText = document.getElementById('hsUnlockEmpTagText');
    var inp = document.getElementById('hsUnlockEmployees');
    if (tag && !tag.hidden && tagText && tagText.textContent) return tagText.textContent.trim();
    return (inp && inp.value || '').trim();
  }

  /* ---------- Events ---------- */

  function getVisibleMapForTab() {
    if (state.tab === 'holiday') return { cols: HOLIDAY_COLS, map: state.holidayVisible };
    if (state.tab === 'shift') return { cols: SHIFT_COLS, map: state.shiftVisible };
    if (state.tab === 'leave') return { cols: LEAVE_COLS, map: state.leaveVisible };
    if (state.tab === 'attendance') return { cols: ATT_COLS, map: state.attVisible };
    return null;
  }

  function handleUnlockClick(e) {
    if (state.tab !== 'unlock') return false;
    if (e.target.closest('.hs-filter-pop') || e.target.closest('#hsUnlockFilterPop')) e.stopPropagation();
    if (e.target.closest('[data-unlock-filter]')) {
      e.stopPropagation();
      state.unlockUi.filterOpen = !state.unlockUi.filterOpen;
      renderTab('unlock');
      return true;
    }
    if (e.target.closest('[data-unlock-filter-reset]')) {
      e.stopPropagation();
      state.unlockUi.startEndFrom = '';
      state.unlockUi.startEndTo = '';
      state.unlockUi.sinceTillFrom = '';
      state.unlockUi.sinceTillTo = '';
      toast('Filter reset', 'Filters cleared.');
      renderTab('unlock');
      return true;
    }
    var acc = e.target.closest('[data-unlock-acc]');
    if (acc) {
      e.stopPropagation();
      var key = acc.getAttribute('data-unlock-acc');
      if (key === 'startEnd') state.unlockUi.startEndAccOpen = !state.unlockUi.startEndAccOpen;
      if (key === 'sinceTill') state.unlockUi.sinceTillAccOpen = !state.unlockUi.sinceTillAccOpen;
      renderTab('unlock');
      return true;
    }
    var rangeBtn = e.target.closest('[data-unlock-range]');
    if (rangeBtn) {
      e.stopPropagation();
      var range = rangeBtn.getAttribute('data-unlock-range');
      if (range === 'startEnd') {
        state.unlockUi.startEndFrom = '01/08/2026';
        state.unlockUi.startEndTo = '17/08/2026';
        toast('Date range', 'Start End range applied.');
      } else {
        state.unlockUi.sinceTillFrom = '01/08/2026';
        state.unlockUi.sinceTillTo = '31/08/2026';
        toast('Date range', 'Since Till range applied.');
      }
      renderTab('unlock');
      return true;
    }
    return false;
  }

  function handleAttendanceClick(e) {
    if (state.tab !== 'attendance') return false;
    if (e.target.closest('.hs-filter-pop') || e.target.closest('.hs-emp-combo__list') || e.target.closest('.hs-columns-pop--att')) {
      e.stopPropagation();
    }
    var empToggle = e.target.closest('[data-att-emp-toggle]');
    if (empToggle) {
      e.stopPropagation();
      state.attUi.empOpen = !state.attUi.empOpen;
      state.attUi.filterOpen = false;
      state.attUi.colsOpen = false;
      state.attUi.statusDropOpen = false;
      renderTab('attendance');
      return true;
    }
    var empPick = e.target.closest('[data-att-emp]');
    if (empPick) {
      e.stopPropagation();
      state.attUi.employee = empPick.getAttribute('data-att-emp');
      state.attUi.empOpen = false;
      renderTab('attendance');
      toast('Employee filter', state.attUi.employee === 'all' ? 'Showing all employees' : 'Filtered by ' + state.attUi.employee);
      return true;
    }
    if (e.target.closest('[data-att-emp-clear]')) {
      e.stopPropagation();
      state.attUi.employee = 'all';
      state.attUi.empOpen = false;
      renderTab('attendance');
      return true;
    }
    if (e.target.closest('[data-att-filter]')) {
      e.stopPropagation();
      state.attUi.filterOpen = !state.attUi.filterOpen;
      state.attUi.colsOpen = false;
      state.attUi.empOpen = false;
      renderTab('attendance');
      return true;
    }
    if (e.target.closest('[data-att-filter-reset]')) {
      e.stopPropagation();
      state.attUi.statuses = [];
      state.attUi.statusSearch = '';
      state.attUi.dateStart = '01-08-2026';
      state.attUi.dateEnd = '17-08-2026';
      toast('Filter reset', 'Filters cleared.');
      renderTab('attendance');
      return true;
    }
    var acc = e.target.closest('[data-att-acc]');
    if (acc) {
      e.stopPropagation();
      var key = acc.getAttribute('data-att-acc');
      if (key === 'status') state.attUi.statusAccOpen = !state.attUi.statusAccOpen;
      if (key === 'date') state.attUi.dateAccOpen = !state.attUi.dateAccOpen;
      renderTab('attendance');
      return true;
    }
    if (e.target.closest('[data-att-status-input]')) {
      e.stopPropagation();
      state.attUi.statusDropOpen = true;
      return true;
    }
    var statusOpt = e.target.closest('[data-att-status-opt]');
    if (statusOpt) {
      e.stopPropagation();
      var s = statusOpt.getAttribute('data-att-status-opt');
      var idx = state.attUi.statuses.indexOf(s);
      if (idx === -1) state.attUi.statuses.push(s);
      else state.attUi.statuses.splice(idx, 1);
      renderTab('attendance');
      toast('Status filter', state.attUi.statuses.length ? state.attUi.statuses.join(', ') : 'All statuses');
      return true;
    }
    if (e.target.closest('[data-att-date-range]')) {
      e.stopPropagation();
      toast('Date range', state.attUi.dateStart + ' → ' + state.attUi.dateEnd);
      return true;
    }
    if (e.target.closest('[data-att-export]')) {
      toast('Export', 'Attendance exported to Excel.');
      return true;
    }
    var edit = e.target.closest('[data-att-edit]');
    if (edit) {
      toast('Edit attendance', 'Editing record #' + edit.getAttribute('data-att-edit'));
      return true;
    }
    var selectAllCols = e.target.closest('[data-select-all-cols]');
    if (selectAllCols && e.target.closest('.hs-columns-pop--att')) {
      e.stopPropagation();
      var allOn = ATT_COLS.every(function (c) { return state.attVisible[c.id]; });
      ATT_COLS.forEach(function (c) { state.attVisible[c.id] = !allOn; });
      renderTab('attendance');
      return true;
    }
    return false;
  }

  function bind() {
    tabs.forEach(function (btn) {
      btn.addEventListener('click', function () { renderTab(btn.getAttribute('data-tab')); });
    });

    document.addEventListener('click', function () {
      closeHolidayAddMenu();
      closeDeletePop();
      closeCopyPop();
      if (state.tab !== 'attendance') {
        document.querySelectorAll('.hs-columns-pop').forEach(function (p) {
          if (!p.hidden && !p.contains(document.activeElement)) p.hidden = true;
        });
      }
    });

    if (holidayTplModal) {
      holidayTplModal.addEventListener('change', function (e) {
        var tplCheck = e.target.closest('.hs-tpl-check');
        if (tplCheck) {
          var tid = tplCheck.getAttribute('data-tpl-id');
          if (tplCheck.checked) state.holidayTplSelected[tid] = true;
          else delete state.holidayTplSelected[tid];
          var checkAll = document.getElementById('hsTplCheckAll');
          if (checkAll) checkAll.checked = HOLIDAY_TEMPLATES.every(function (t) { return state.holidayTplSelected[t.id]; });
          return;
        }
        if (e.target.id === 'hsTplCheckAll') {
          var on = e.target.checked;
          HOLIDAY_TEMPLATES.forEach(function (t) {
            if (on) state.holidayTplSelected[t.id] = true;
            else delete state.holidayTplSelected[t.id];
          });
          holidayTplModal.querySelectorAll('.hs-tpl-check').forEach(function (cb) { cb.checked = on; });
        }
      });
      holidayTplModal.addEventListener('click', function (e) {
        if (e.target.closest('[data-hs-close="holiday-tpl"]')) { closeHolidayTplModal(); return; }
        if (e.target.closest('#hsTplSave')) { saveSelectedTemplates(); return; }
        if (e.target.closest('[data-holiday-lib]')) { openHolidayLibModal(); return; }
      });
    }

    if (holidayLibModal) {
      holidayLibModal.addEventListener('click', function (e) {
        if (e.target.closest('[data-hs-close="holiday-lib"]')) closeHolidayLibModal();
        var copyBtn = e.target.closest('[data-hol-lib-copy]');
        if (copyBtn) {
          e.stopPropagation();
          openCopyPop(copyBtn, +copyBtn.getAttribute('data-hol-lib-copy'));
        }
      });
    }

    root.addEventListener('click', function (e) {
      if (handleUnlockClick(e)) return;
      if (handleAttendanceClick(e)) return;

      var colsBtn = e.target.closest('[data-cols-btn]');
      if (colsBtn) {
        e.stopPropagation();
        var pop = colsBtn.parentElement.querySelector('.hs-columns-pop');
        if (!pop) return;
        var open = pop.hidden;
        if (state.tab === 'attendance') {
          state.attUi.colsOpen = open;
          state.attUi.filterOpen = false;
          state.attUi.empOpen = false;
          renderTab('attendance');
          return;
        }
        document.querySelectorAll('.hs-columns-pop').forEach(function (p) { p.hidden = true; });
        document.querySelectorAll('[data-cols-btn]').forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-expanded', 'false');
        });
        pop.hidden = !open;
        colsBtn.classList.toggle('is-active', open);
        colsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) {
          var cfg = getVisibleMapForTab();
          if (cfg) renderColsPop(pop.querySelector('[data-cols-list]'), cfg.cols, cfg.map);
        }
        return;
      }

      if (e.target.closest('.hs-columns-pop')) e.stopPropagation();

      var holidayAddBtn = e.target.closest('[data-holiday-add-btn]');
      if (holidayAddBtn && state.tab === 'holiday') {
        e.stopPropagation();
        toggleHolidayAddMenu(holidayAddBtn);
        return;
      }
      if (e.target.closest('.hs-add-menu') || e.target.closest('.hs-add-wrap')) {
        e.stopPropagation();
      }

      var holidayAddItem = e.target.closest('[data-holiday-add]');
      if (holidayAddItem && state.tab === 'holiday') {
        closeHolidayAddMenu();
        var action = holidayAddItem.getAttribute('data-holiday-add');
        if (action === 'template') {
          openHolidayTplModal();
        } else if (action === 'single') {
          openHolidayModal(null);
        } else if (action === 'bulk') {
          openBulkHolidayModal();
        }
        return;
      }

      var addBtn = e.target.closest('[data-add]');
      if (addBtn) {
        if (state.tab === 'holiday') return;
        if (state.tab === 'shift') openShiftModal(null);
        else if (state.tab === 'leave') openLeaveModal(null);
        else if (state.tab === 'blacklist') openBlacklistModal(null);
        else if (state.tab === 'quota') openQuotaModal(null);
        else if (state.tab === 'attendance') openAttUploadModal();
        else if (state.tab === 'viewlock') openLockModal();
        else if (state.tab === 'unlock') openUnlockModal(null);
        else toast('Add', 'Add form for this section.');
        return;
      }

      if (e.target.closest('[data-templates]')) {
        if (state.tab === 'holiday') openHolidayLibModal();
        else openTemplateModal();
        return;
      }

      var attSub = e.target.closest('[data-att-sub]');
      if (attSub) {
        state.attendanceSub = attSub.getAttribute('data-att-sub');
        renderTab('attendance');
        return;
      }

      if (e.target.closest('[data-bulk-edit]')) { toast('Bulk Edit', 'Select rows to edit.'); return; }
      if (e.target.closest('[data-from-machine]')) { toast('Machine', 'Fetching from biometric machine…'); return; }
      if (e.target.closest('[data-refresh]')) { toast('Refreshed', 'Attendance updated.'); return; }
      if (e.target.closest('[data-filter]') && state.tab !== 'attendance') { toast('Filter', 'Filter options.'); return; }
      if (e.target.closest('[data-reset-summary]')) { toast('Reset', 'Filters cleared.'); return; }

      if (e.target.closest('[data-page-prev]')) {
        var key = state.tab;
        if (state.page[key] && state.page[key].page > 1) { state.page[key].page--; renderTab(); }
        return;
      }
      if (e.target.closest('[data-page-next]')) {
        var keyN = state.tab;
        if (state.page[keyN]) { state.page[keyN].page++; renderTab(); }
        return;
      }

      var editBtn = e.target.closest('[data-edit]');
      if (editBtn) {
        e.stopPropagation();
        var eid = +editBtn.getAttribute('data-edit');
        if (state.tab === 'holiday') {
          var h = state.holidays.filter(function (x) { return x.id === eid; })[0];
          if (h) openHolidayModal(h);
        } else if (state.tab === 'shift') {
          var s = state.shifts.filter(function (x) { return x.id === eid; })[0];
          if (s) openShiftModal(s);
        } else if (state.tab === 'leave') {
          var l = state.leaves.filter(function (x) { return x.id === eid; })[0];
          if (l) openLeaveModal(l);
        } else if (state.tab === 'blacklist') {
          var b = state.blacklist.filter(function (x) { return x.id === eid; })[0];
          if (b) openBlacklistModal(b);
        } else if (state.tab === 'quota') {
          var q = state.quotas.filter(function (x) { return x.id === eid; })[0];
          if (q) openQuotaModal(q);
        } else if (state.tab === 'unlock') {
          var u = state.unlocks.filter(function (x) { return x.id === eid; })[0];
          if (u) openUnlockModal(u);
        } else toast('Edit', 'Edit form would open.');
        return;
      }

      var delBtn = e.target.closest('[data-delete]');
      if (delBtn) {
        var did = +delBtn.getAttribute('data-delete');
        if (state.tab === 'holiday') {
          e.stopPropagation();
          openDeletePop(delBtn, did);
          return;
        }
        if (state.tab === 'unlock') {
          e.stopPropagation();
          openDeletePop(delBtn, did);
          return;
        }
        if (state.tab === 'shift') state.shifts = state.shifts.filter(function (s) { return s.id !== did; });
        else if (state.tab === 'leave') state.leaves = state.leaves.filter(function (l) { return l.id !== did; });
        else if (state.tab === 'blacklist') state.blacklist = state.blacklist.filter(function (b) { return b.id !== did; });
        else if (state.tab === 'quota') state.quotas = state.quotas.filter(function (q) { return q.id !== did; });
        else if (state.tab === 'club') state.clubRules = state.clubRules.filter(function (c) { return c.id !== did; });
        renderTab();
        toast('Deleted', 'Item removed.');
        return;
      }

      var viewBtn = e.target.closest('[data-view]');
      if (viewBtn) {
        if (state.tab === 'quota') {
          openQuotaUsersModal(+viewBtn.getAttribute('data-view'));
          return;
        }
        toast('View', 'Details would open.');
        return;
      }

      var bulkDel = e.target.closest('#hsBulkDelete');
      if (bulkDel && !bulkDel.disabled) {
        state.holidays = state.holidays.filter(function (h) { return !state.holidaySelected[h.id]; });
        state.holidaySelected = {};
        renderTab();
        toast('Bulk delete', 'Selected holidays removed.');
        return;
      }

      var sortTh = e.target.closest('th[data-col="from"], th[data-col="to"]');
      if (sortTh && state.tab === 'holiday') {
        var sk = sortTh.getAttribute('data-col');
        if (state.holidaySortKey === sk) state.holidaySortDir *= -1;
        else { state.holidaySortKey = sk; state.holidaySortDir = 1; }
        renderTab();
        return;
      }

      var noduePlus = e.target.closest('[data-nodue-plus]');
      if (noduePlus) {
        var maxId = state.noDues.reduce(function (m, r) { return Math.max(m, r.id); }, 0);
        state.noDues.push({ id: maxId + 1, category: '', employee: '' });
        renderTab();
        return;
      }
      var nodueRm = e.target.closest('[data-nodue-remove]');
      if (nodueRm) {
        var nid = +nodueRm.getAttribute('data-nodue-remove');
        if (state.noDues.length <= 1) { toast('Required', 'At least one head is required.'); return; }
        state.noDues = state.noDues.filter(function (r) { return r.id !== nid; });
        renderTab();
        return;
      }
      if (e.target.closest('[data-add-nodue]')) {
        var maxN = state.noDues.reduce(function (m, r) { return Math.max(m, r.id); }, 0);
        state.noDues.push({ id: maxN + 1, category: '', employee: '' });
        renderTab();
        return;
      }

      var tagX = e.target.closest('.hs-tag__x');
      if (tagX) {
        var tag = tagX.closest('.hs-tag');
        if (tag) tag.remove();
      }
    });

    root.addEventListener('input', function (e) {
      if (e.target.matches('[data-att-status-input]') && state.tab === 'attendance') {
        state.attUi.statusSearch = e.target.value || '';
        state.attUi.statusDropOpen = true;
        renderTab('attendance');
      }
    });

    root.addEventListener('change', function (e) {
      var t = e.target;
      if (t.id === 'hsFilterAll' || t.id === 'hsFy') {
        if (t.id === 'hsFy') toast('Financial year', 'Showing ' + t.options[t.selectedIndex].text);
        else renderTab();
        return;
      }
      if (t.id === 'hsCheckAll') {
        var on = t.checked;
        filteredHolidays().forEach(function (r) { state.holidaySelected[r.id] = on; });
        renderTab();
        return;
      }
      if (t.classList.contains('hs-row-check')) {
        state.holidaySelected[+t.getAttribute('data-id')] = t.checked;
        var bulk = root.querySelector('#hsBulkDelete');
        var selCount = Object.keys(state.holidaySelected).filter(function (k) { return state.holidaySelected[k]; }).length;
        if (bulk) bulk.disabled = selCount === 0;
        return;
      }
      if (t.getAttribute('data-select-all-cols') != null) {
        var cfg = getVisibleMapForTab();
        if (!cfg) return;
        cfg.cols.forEach(function (c) { cfg.map[c.id] = !!t.checked; });
        renderColsPop(root.querySelector('[data-cols-list]'), cfg.cols, cfg.map);
        applyColVis(cfg.map);
        return;
      }
      var colId = t.getAttribute('data-col-toggle');
      if (colId) {
        var cfg2 = getVisibleMapForTab();
        if (!cfg2) return;
        cfg2.map[colId] = !!t.checked;
        var all = root.querySelector('[data-select-all-cols]');
        if (all) all.checked = cfg2.cols.every(function (c) { return cfg2.map[c.id]; });
        applyColVis(cfg2.map);
        return;
      }
      if (t.getAttribute('data-page-size') != null) {
        var pk = state.tab;
        state.page[pk] = { size: +t.value || 10, page: 1 };
        renderTab();
      }
    });

    root.addEventListener('submit', function (e) {
      if (e.target.id === 'hsBulkForm') {
        e.preventDefault();
        toast('Started', 'Bulk regularization running in background.');
        return;
      }
      if (e.target.id === 'hsNoDuesForm') {
        e.preventDefault();
        toast('Submitted', 'No dues flow assigned.');
      }
    });

    document.addEventListener('click', function (e) {
      if (state.tab === 'attendance') {
        var t = e.target;
        var changed = false;
        if (!t.closest('.hs-emp-combo') && (state.attUi.empOpen || state.attUi.statusDropOpen)) {
          state.attUi.empOpen = false;
          state.attUi.statusDropOpen = false;
          changed = true;
        }
        if (!t.closest('.hs-wrap') && state.attUi.filterOpen && !t.closest('[data-att-filter]')) {
          state.attUi.filterOpen = false;
          changed = true;
        }
        if (!t.closest('.hs-wrap') && state.attUi.colsOpen && !t.closest('[data-cols-btn]')) {
          state.attUi.colsOpen = false;
          changed = true;
        }
        if (changed) renderTab('attendance');
        return;
      }
      if (state.tab === 'unlock') {
        var t2 = e.target;
        if (!t2.closest('.hs-wrap') && state.unlockUi.filterOpen && !t2.closest('[data-unlock-filter]')) {
          state.unlockUi.filterOpen = false;
          renderTab('unlock');
        }
        return;
      }
      document.querySelectorAll('.hs-columns-pop').forEach(function (p) { p.hidden = true; });
      document.querySelectorAll('[data-cols-btn]').forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-expanded', 'false');
      });
    });

    document.querySelectorAll('[data-hs-close]').forEach(function (el) {
      el.addEventListener('click', function () {
        var which = el.getAttribute('data-hs-close');
        if (which === 'holiday') closeHolidayModal();
        else if (which === 'bulk-holiday') closeBulkHolidayModal();
        else         if (which === 'shift') closeShiftModal();
        else if (which === 'leave') closeLeaveModal();
        else if (which === 'blacklist') closeBlacklistModal();
        else if (which === 'quota') closeQuotaModal();
        else if (which === 'quota-users') closeQuotaUsersModal();
        else if (which === 'template') closeTemplateModal();
        else if (which === 'holiday-lib') closeHolidayLibModal();
        else if (which === 'holiday-tpl') closeHolidayTplModal();
        else if (which === 'att-upload') closeAttUploadModal();
        else if (which === 'lock') closeLockModal();
        else if (which === 'unlock') closeUnlockModal();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (datePop && !datePop.hidden) { closeHolDatePop(); return; }
        closeAnyModal();
      }
    });

    if (holidayForm) {
      holidayForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var typeVal = document.getElementById('hsHolidayType').value;
        var payload = {
          name: (document.getElementById('hsHolidayName').value || '').trim() || 'Holiday',
          from: (document.getElementById('hsFromDate').value || '').trim(),
          to: (document.getElementById('hsToDate').value || '').trim(),
          optional: !!document.getElementById('hsOptional').checked,
          type: typeVal || 'Weekly Holiday',
          branch: document.getElementById('hsBranch').value || 'All',
          office: (document.getElementById('hsOffice').value || '').trim() || 'All',
          description: (document.getElementById('hsDesc').value || '').trim(),
          sandwich: !!document.getElementById('hsSandwich').checked
        };
        if (!payload.from || !payload.to) { toast('Required', 'From Date and To Date are required.'); return; }
        if (!typeVal) { toast('Required', 'Please select Holiday Type.'); return; }
        if (state.editingHolidayId) {
          state.holidays = state.holidays.map(function (h) {
            return h.id === state.editingHolidayId ? Object.assign({}, h, payload) : h;
          });
          toast('Saved', 'Holiday updated.');
        } else {
          payload.id = state.nextHolidayId++;
          state.holidays.push(payload);
          toast('Saved', 'Holiday added.');
        }
        closeHolidayModal();
        renderTab('holiday');
      });
    }

    if (bulkHolidayForm) {
      bulkHolidayForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveBulkHolidays();
      });
    }

    if (attUploadForm) {
      attUploadForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var fileInput = document.getElementById('hsAttUploadFile');
        if (!fileInput || !fileInput.files || !fileInput.files[0]) {
          toast('Required', 'Please upload an attendance Excel file.');
          return;
        }
        toast('Saved', 'Attendance file uploaded successfully.');
        closeAttUploadModal();
        if (state.tab === 'attendance') renderTab('attendance');
      });
      attUploadForm.addEventListener('change', function (e) {
        if (!e.target.matches('#hsAttUploadFile')) return;
        var label = document.getElementById('hsAttUploadLabel');
        var btn = document.getElementById('hsAttUploadBtn');
        var file = e.target.files && e.target.files[0];
        if (label) label.textContent = file ? file.name : 'Click to Upload';
        if (btn) btn.classList.toggle('has-file', !!file);
      });
      attUploadForm.addEventListener('click', function (e) {
        if (e.target.closest('[data-att-upload-reset]')) {
          e.preventDefault();
          resetAttUploadForm();
          toast('Reset', 'Upload form cleared.');
        }
        if (e.target.closest('[data-att-sample]')) {
          e.preventDefault();
          toast('Download', 'Sample Excel file downloading…');
        }
      });
    }

    if (lockForm) {
      lockForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveLockAttendance();
      });
      lockForm.addEventListener('click', function (e) {
        if (e.target.closest('#hsLockMonthInput') || e.target.closest('#hsLockMonthWrap .hs-date__icon')) {
          e.preventDefault();
          toggleLockMonthPicker();
          return;
        }
        var yearBtn = e.target.closest('[data-lock-year]');
        if (yearBtn) {
          e.preventDefault();
          state.lockUi.pickerYear += parseInt(yearBtn.getAttribute('data-lock-year'), 10);
          renderLockMonthGrid();
          return;
        }
        var monthBtn = e.target.closest('[data-lock-month]');
        if (monthBtn) {
          e.preventDefault();
          state.lockUi.selectedMonth = parseInt(monthBtn.getAttribute('data-lock-month'), 10);
          state.lockUi.selectedYear = state.lockUi.pickerYear;
          if (lockMonthInput) lockMonthInput.value = MONTH_FULL[state.lockUi.selectedMonth] + ' ' + state.lockUi.selectedYear;
          toggleLockMonthPicker(false);
          renderLockMonthGrid();
        }
      });
    }
    if (lockModal) {
      lockModal.addEventListener('click', function (e) {
        if (state.lockUi.pickerOpen && !e.target.closest('#hsLockMonthWrap')) toggleLockMonthPicker(false);
      });
    }

    if (unlockForm) {
      unlockForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveUnlockTimesheet();
      });
      unlockForm.addEventListener('click', function (e) {
        if (e.target.closest('[data-unlock-emp-clear]')) {
          e.preventDefault();
          setUnlockEmployeeDisplay('');
          return;
        }
        if (e.target.closest('[data-unlock-date]') || e.target.closest('#hsUnlockForm .hs-date__icon')) {
          var inp = e.target.closest('[data-unlock-date]') || (e.target.closest('.hs-date') && e.target.closest('.hs-date').querySelector('[data-unlock-date]'));
          if (inp && !inp.value) inp.value = '17/08/2026';
          else toast('Date', 'Select a date.');
        }
      });
    }

    if (delNo) delNo.addEventListener('click', function (e) { e.stopPropagation(); closeDeletePop(); });
    if (delYes) delYes.addEventListener('click', function (e) { e.stopPropagation(); confirmHolidayDelete(); });
    if (copyNo) copyNo.addEventListener('click', function (e) { e.stopPropagation(); closeCopyPop(); });
    if (copyYes) copyYes.addEventListener('click', function (e) { e.stopPropagation(); confirmHolidayCopy(); });
    if (delPop) delPop.addEventListener('click', function (e) { e.stopPropagation(); });
    if (copyPop) copyPop.addEventListener('click', function (e) { e.stopPropagation(); });
    window.addEventListener('scroll', closeDeletePop, true);
    window.addEventListener('scroll', closeCopyPop, true);
    window.addEventListener('resize', closeDeletePop);
    window.addEventListener('resize', closeCopyPop);

    bindHolDatePicker();

    if (leaveModal) {
      leaveModal.addEventListener('click', function (e) {
        var tagX = e.target.closest('.hs-tag__x');
        if (tagX) tagX.closest('.hs-tag').remove();
      });
    }

    if (leaveForm) {
      leaveForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var genders = getTags(document.getElementById('hsLeaveGenders'));
        var payload = {
          name: (document.getElementById('hsLeaveName').value || '').trim(),
          abbr: (document.getElementById('hsLeaveAbbr').value || '').trim(),
          leaveFor: genders.length ? genders : ['Male', 'Female', 'OTHERS'],
          hours: '--',
          payable: !!document.getElementById('hsLeavePayable').checked,
          creditFreq: document.getElementById('hsLeaveCreditFreq').value || 'Yearly',
          nextCreditDate: (document.getElementById('hsLeaveCreditDate').value || '').trim(),
          pastDays: (document.getElementById('hsLeavePastDays').value || '').trim(),
          futureDays: (document.getElementById('hsLeaveFutureDays').value || '').trim(),
          leaveType: document.getElementById('hsLeaveType').value || 'Accumulate',
          maxAccumulate: (document.getElementById('hsLeaveMaxAccum').value || '').trim(),
          hourlyCount: !!document.getElementById('hsLeaveHourly').checked,
          sandwich: !!document.getElementById('hsLeaveSandwich').checked,
          optional: !!document.getElementById('hsLeaveOptional').checked,
          autoApproved: !!document.getElementById('hsLeaveAutoApproved').checked,
          maxCount: (document.getElementById('hsLeaveMaxCount').value || '').trim(),
          maxCountWithHoliday: (document.getElementById('hsLeaveMaxHol').value || '').trim()
        };
        if (!payload.name || !payload.abbr || !payload.nextCreditDate || !payload.pastDays || !payload.futureDays || !payload.maxCount || !payload.maxCountWithHoliday) {
          toast('Required', 'Please fill all required fields.');
          return;
        }
        if (state.editingLeaveId) {
          state.leaves = state.leaves.map(function (l) {
            return l.id === state.editingLeaveId ? Object.assign({}, l, payload) : l;
          });
          toast('Saved', 'Leave updated.');
        } else {
          payload.id = state.nextLeaveId++;
          state.leaves.push(payload);
          toast('Saved', 'Leave added.');
        }
        closeLeaveModal();
        renderTab('leave');
      });
    }

    bindLeaveGendersInput();
    bindTagsInput(document.getElementById('hsQuotaBranches'));
    bindTagsInput(document.getElementById('hsQuotaDesignations'));

    if (quotaModal) {
      quotaModal.addEventListener('click', function (e) {
        var tagX = e.target.closest('.hs-tag__x');
        if (tagX) tagX.closest('.hs-tag').remove();
      });
    }

    if (quotaUsersModal) {
      quotaUsersModal.addEventListener('click', function (e) {
        var tab = e.target.closest('[data-quota-user-tab]');
        if (tab) {
          state.quotaUserTab = tab.getAttribute('data-quota-user-tab');
          quotaUsersModal.querySelectorAll('[data-quota-user-tab]').forEach(function (btn) {
            btn.classList.toggle('is-active', btn === tab);
          });
          renderQuotaUsersTable();
        }
      });
    }

    var quotaUserSearch = document.getElementById('hsQuotaUserSearch');
    if (quotaUserSearch) {
      quotaUserSearch.addEventListener('input', function () {
        state.quotaUserSearch = quotaUserSearch.value;
        renderQuotaUsersTable();
      });
    }

    if (quotaForm) {
      quotaForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var branches = getTags(document.getElementById('hsQuotaBranches'));
        var designations = getTags(document.getElementById('hsQuotaDesignations'));
        var payload = {
          leave: document.getElementById('hsQuotaLeave').value,
          branches: branches,
          designations: designations,
          count: +(document.getElementById('hsQuotaCount').value || 0)
        };
        if (!payload.leave || !branches.length || !designations.length || !payload.count) {
          toast('Required', 'Please fill all required fields.');
          return;
        }
        if (state.editingQuotaId) {
          state.quotas = state.quotas.map(function (q) {
            return q.id === state.editingQuotaId ? Object.assign({}, q, payload) : q;
          });
          toast('Saved', 'Leave quota updated.');
        } else {
          payload.id = state.nextQuotaId++;
          state.quotas.push(payload);
          toast('Saved', 'Leave quota added.');
        }
        closeQuotaModal();
        renderTab('quota');
      });
    }

    if (blacklistForm) {
      blacklistForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var payload = {
          name: (document.getElementById('hsBlName').value || '').trim(),
          start: (document.getElementById('hsBlStartDate').value || '').trim(),
          end: (document.getElementById('hsBlEndDate').value || '').trim()
        };
        if (!payload.name || !payload.start || !payload.end) { toast('Required', 'Please fill all required fields.'); return; }
        if (state.editingBlacklistId) {
          state.blacklist = state.blacklist.map(function (b) {
            return b.id === state.editingBlacklistId ? Object.assign({}, b, payload) : b;
          });
          toast('Saved', 'Blacklist leave updated.');
        } else {
          payload.id = state.nextBlacklistId++;
          state.blacklist.push(payload);
          toast('Saved', 'Blacklist leave added.');
        }
        closeBlacklistModal();
        renderTab('blacklist');
      });
    }

    if (shiftForm) {
      shiftForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var payload = {
          name: (document.getElementById('hsShiftName').value || '').trim(),
          inTime: (document.getElementById('hsInTime').value || '').trim(),
          outTime: (document.getElementById('hsOutTime').value || '').trim(),
          lateIn: (document.getElementById('hsLateIn').value || '').trim(),
          earlyOut: (document.getElementById('hsEarlyOut').value || '').trim(),
          fullDay: (document.getElementById('hsFullDay').value || '').trim(),
          halfDay: (document.getElementById('hsHalfDay').value || '').trim(),
          fullCoff: (document.getElementById('hsFullCoff').value || '').trim(),
          halfCoff: (document.getElementById('hsHalfCoff').value || '').trim(),
          isDefault: !!document.getElementById('hsMarkDefault').checked
        };
        if (!payload.name || !payload.inTime || !payload.outTime) {
          toast('Required', 'Please fill required fields.');
          return;
        }
        if (payload.isDefault) state.shifts.forEach(function (s) { s.isDefault = false; });
        if (state.editingShiftId) {
          state.shifts = state.shifts.map(function (s) {
            return s.id === state.editingShiftId ? Object.assign({}, s, payload) : s;
          });
          toast('Saved', 'Shift updated.');
        } else {
          payload.id = state.nextShiftId++;
          state.shifts.push(payload);
          toast('Saved', 'Shift added.');
        }
        closeShiftModal();
        renderTab('shift');
      });
    }

    if (templateModal) {
      templateModal.addEventListener('click', function (e) {
        var del = e.target.closest('[data-tpl-delete]');
        if (!del) return;
        var id = +del.getAttribute('data-tpl-delete');
        state.templates = state.templates.filter(function (t) { return t.id !== id; });
        renderTemplates();
        toast('Deleted', 'Template removed.');
      });
    }

    if (topCheckIn) {
      topCheckIn.addEventListener('click', function () {
        state.checkedIn = !state.checkedIn;
        topCheckIn.textContent = state.checkedIn ? 'Check Out' : 'Check In';
        topCheckIn.classList.toggle('is-in', !state.checkedIn);
        topCheckIn.classList.toggle('is-out', state.checkedIn);
        toast(state.checkedIn ? 'Checked in' : 'Checked out', '');
      });
    }
  }

  bind();
  renderTab('holiday');
  tickClock();
  setInterval(tickClock, 30000);
})();
