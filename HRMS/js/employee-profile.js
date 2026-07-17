/**
 * TIME ERP — Employee Profile (employee_profile.html) — UI only
 * Loads employee by ?id= from View Employees (e.g. EMP-006 = Amit Joshi)
 */
(function () {
  'use strict';

  /* Same directory as viewemployee.js — profile fields enriched per employee */
  var DIRECTORY = {
    'EMP-001': {
      id: 'EMP-001', name: 'Ananya Sharma', email: 'ananya@timeerp.com', phone: '+91 98765 43210',
      dept: 'Engineering', designation: 'Senior Developer', location: 'Ghaziabad', type: 'Full-time',
      status: 'active', manager: 'Rahul Kapoor', joined: '2022-03-15', leaveBal: 12, salary: '₹14 LPA',
      gender: 'Female', dob: 'Aug 12, 1996', blood: 'B+', nationality: 'Indian', marital: 'Single',
      personalEmail: 'ananya.sharma@gmail.com', address: '42, Sector 62, Noida, UP 201301',
      permanentAddress: '15, Civil Lines, Ghaziabad, UP 201001', grade: 'L4',
      confirmation: 'Sep 15, 2022', shift: 'General (9 AM – 6 PM)', costCenter: 'CC-ENG-001',
      progress: 95, present: 18, absent: 1, late: 2, leaveDays: 2, overtime: 4, hours: 152,
      pendingTasks: 3, assets: 8, years: 4, rating: '4.6', bonus: '₹25,000', lastPayslip: 'Feb 2026',
      anniversary: 'Mar 15', netSalary: '₹1,08,217', monthlySalary: '₹1,16,667'
    },
    'EMP-002': {
      id: 'EMP-002', name: 'Rahul Kapoor', email: 'rahul@timeerp.com', phone: '+91 98765 43211',
      dept: 'Engineering', designation: 'Tech Lead', location: 'Remote', type: 'Full-time',
      status: 'active', manager: 'Priya Mehta', joined: '2021-06-01', leaveBal: 8, salary: '₹18 LPA',
      gender: 'Male', dob: 'Mar 4, 1992', blood: 'O+', nationality: 'Indian', marital: 'Married',
      personalEmail: 'rahul.kapoor@gmail.com', address: '88, Indirapuram, Ghaziabad, UP',
      permanentAddress: '88, Indirapuram, Ghaziabad, UP', grade: 'L5',
      confirmation: 'Dec 1, 2021', shift: 'General (9 AM – 6 PM)', costCenter: 'CC-ENG-001',
      progress: 98, present: 20, absent: 0, late: 1, leaveDays: 1, overtime: 6, hours: 168,
      pendingTasks: 5, assets: 10, years: 5, rating: '4.8', bonus: '₹40,000', lastPayslip: 'Feb 2026',
      anniversary: 'Jun 1', netSalary: '₹1,42,000', monthlySalary: '₹1,50,000'
    },
    'EMP-003': {
      id: 'EMP-003', name: 'Priya Mehta', email: 'priya@timeerp.com', phone: '+91 98765 43212',
      dept: 'HR', designation: 'HR Manager', location: 'Ghaziabad', type: 'Full-time',
      status: 'active', manager: 'Admin', joined: '2020-01-10', leaveBal: 10, salary: '₹12 LPA',
      gender: 'Female', dob: 'Nov 22, 1990', blood: 'A+', nationality: 'Indian', marital: 'Married',
      personalEmail: 'priya.mehta@gmail.com', address: '12, Raj Nagar, Ghaziabad, UP',
      permanentAddress: '12, Raj Nagar, Ghaziabad, UP', grade: 'L5',
      confirmation: 'Jul 10, 2020', shift: 'General (9 AM – 6 PM)', costCenter: 'CC-HR-001',
      progress: 100, present: 19, absent: 0, late: 0, leaveDays: 2, overtime: 2, hours: 160,
      pendingTasks: 4, assets: 6, years: 6, rating: '4.7', bonus: '₹30,000', lastPayslip: 'Feb 2026',
      anniversary: 'Jan 10', netSalary: '₹92,000', monthlySalary: '₹1,00,000'
    },
    'EMP-004': {
      id: 'EMP-004', name: 'Vikram Singh', email: 'vikram@timeerp.com', phone: '+91 98765 43213',
      dept: 'Sales', designation: 'Sales Executive', location: 'Delhi NCR', type: 'Full-time',
      status: 'leave', manager: 'Priya Mehta', joined: '2023-08-20', leaveBal: 5, salary: '₹8 LPA',
      gender: 'Male', dob: 'Jan 18, 1995', blood: 'B+', nationality: 'Indian', marital: 'Single',
      personalEmail: 'vikram.singh@gmail.com', address: '45, Dwarka, New Delhi',
      permanentAddress: '45, Dwarka, New Delhi', grade: 'L2',
      confirmation: 'Feb 20, 2024', shift: 'Field (Flexible)', costCenter: 'CC-SAL-001',
      progress: 82, present: 12, absent: 2, late: 3, leaveDays: 5, overtime: 1, hours: 110,
      pendingTasks: 2, assets: 4, years: 2, rating: '4.1', bonus: '₹10,000', lastPayslip: 'Feb 2026',
      anniversary: 'Aug 20', netSalary: '₹58,000', monthlySalary: '₹66,667'
    },
    'EMP-005': {
      id: 'EMP-005', name: 'Sneha Reddy', email: 'sneha@timeerp.com', phone: '+91 98765 43214',
      dept: 'Design', designation: 'UI/UX Designer', location: 'Remote', type: 'Full-time',
      status: 'active', manager: 'Rahul Kapoor', joined: '2023-02-14', leaveBal: 14, salary: '₹10 LPA',
      gender: 'Female', dob: 'May 9, 1997', blood: 'AB+', nationality: 'Indian', marital: 'Single',
      personalEmail: 'sneha.reddy@gmail.com', address: 'Remote — Hyderabad',
      permanentAddress: 'Banjara Hills, Hyderabad', grade: 'L3',
      confirmation: 'Aug 14, 2023', shift: 'General (9 AM – 6 PM)', costCenter: 'CC-DES-001',
      progress: 90, present: 17, absent: 0, late: 1, leaveDays: 3, overtime: 3, hours: 148,
      pendingTasks: 6, assets: 5, years: 3, rating: '4.5', bonus: '₹15,000', lastPayslip: 'Feb 2026',
      anniversary: 'Feb 14', netSalary: '₹76,000', monthlySalary: '₹83,333'
    },
    'EMP-006': {
      id: 'EMP-006', name: 'Amit Joshi', email: 'amit@timeerp.com', phone: '+91 98765 43215',
      dept: 'Engineering', designation: 'QA Engineer', location: 'Ghaziabad', type: 'Full-time',
      status: 'probation', manager: 'Rahul Kapoor', joined: '2025-11-01', leaveBal: 0, salary: '₹7 LPA',
      gender: 'Male', dob: 'Sep 30, 1998', blood: 'O+', nationality: 'Indian', marital: 'Single',
      personalEmail: 'amit.joshi@gmail.com', address: '7, Kaushambi, Ghaziabad, UP',
      permanentAddress: '7, Kaushambi, Ghaziabad, UP', grade: 'L2',
      confirmation: 'Pending', shift: 'General (9 AM – 6 PM)', costCenter: 'CC-ENG-001',
      progress: 72, present: 16, absent: 0, late: 2, leaveDays: 0, overtime: 2, hours: 140,
      pendingTasks: 7, assets: 5, years: 0, rating: '4.0', bonus: '₹0', lastPayslip: 'Feb 2026',
      anniversary: 'Nov 1', netSalary: '₹52,000', monthlySalary: '₹58,333'
    },
    'EMP-007': {
      id: 'EMP-007', name: 'Kavita Nair', email: 'kavita@timeerp.com', phone: '+91 98765 43216',
      dept: 'Finance', designation: 'Accountant', location: 'Ghaziabad', type: 'Full-time',
      status: 'active', manager: 'Admin', joined: '2022-09-05', leaveBal: 11, salary: '₹9 LPA',
      gender: 'Female', dob: 'Jul 14, 1994', blood: 'A+', nationality: 'Indian', marital: 'Married',
      personalEmail: 'kavita.nair@gmail.com', address: '21, Vaishali, Ghaziabad, UP',
      permanentAddress: 'Kochi, Kerala', grade: 'L3',
      confirmation: 'Mar 5, 2023', shift: 'General (9 AM – 6 PM)', costCenter: 'CC-FIN-001',
      progress: 94, present: 19, absent: 0, late: 0, leaveDays: 1, overtime: 1, hours: 158,
      pendingTasks: 2, assets: 4, years: 3, rating: '4.4', bonus: '₹12,000', lastPayslip: 'Feb 2026',
      anniversary: 'Sep 5', netSalary: '₹68,000', monthlySalary: '₹75,000'
    },
    'EMP-008': {
      id: 'EMP-008', name: 'Rohan Das', email: 'rohan@timeerp.com', phone: '+91 98765 43217',
      dept: 'Customer Success', designation: 'CS Executive', location: 'Remote', type: 'Full-time',
      status: 'notice', manager: 'Priya Mehta', joined: '2021-11-20', leaveBal: 3, salary: '₹8 LPA',
      gender: 'Male', dob: 'Dec 2, 1993', blood: 'B+', nationality: 'Indian', marital: 'Single',
      personalEmail: 'rohan.das@gmail.com', address: 'Remote — Kolkata',
      permanentAddress: 'Salt Lake, Kolkata', grade: 'L2',
      confirmation: 'May 20, 2022', shift: 'General (9 AM – 6 PM)', costCenter: 'CC-CS-001',
      progress: 88, present: 14, absent: 1, late: 2, leaveDays: 4, overtime: 0, hours: 120,
      pendingTasks: 1, assets: 3, years: 4, rating: '4.2', bonus: '₹8,000', lastPayslip: 'Feb 2026',
      anniversary: 'Nov 20', netSalary: '₹58,500', monthlySalary: '₹66,667'
    },
    'EMP-009': {
      id: 'EMP-009', name: 'Meera Iyer', email: 'meera@timeerp.com', phone: '+91 98765 43218',
      dept: 'Marketing', designation: 'Marketing Lead', location: 'Delhi NCR', type: 'Full-time',
      status: 'active', manager: 'Admin', joined: '2022-07-12', leaveBal: 9, salary: '₹11 LPA',
      gender: 'Female', dob: 'Apr 25, 1991', blood: 'O-', nationality: 'Indian', marital: 'Married',
      personalEmail: 'meera.iyer@gmail.com', address: 'Gurgaon Sector 45',
      permanentAddress: 'Chennai, Tamil Nadu', grade: 'L4',
      confirmation: 'Jan 12, 2023', shift: 'General (9 AM – 6 PM)', costCenter: 'CC-MKT-001',
      progress: 96, present: 18, absent: 0, late: 1, leaveDays: 2, overtime: 4, hours: 155,
      pendingTasks: 3, assets: 7, years: 3, rating: '4.6', bonus: '₹22,000', lastPayslip: 'Feb 2026',
      anniversary: 'Jul 12', netSalary: '₹84,000', monthlySalary: '₹91,667'
    },
    'EMP-010': {
      id: 'EMP-010', name: 'Arjun Patel', email: 'arjun@timeerp.com', phone: '+91 98765 43219',
      dept: 'Engineering', designation: 'Laravel Developer', location: 'Remote', type: 'Contract',
      status: 'active', manager: 'Rahul Kapoor', joined: '2024-04-01', leaveBal: 6, salary: '₹15 LPA',
      gender: 'Male', dob: 'Feb 11, 1996', blood: 'A+', nationality: 'Indian', marital: 'Single',
      personalEmail: 'arjun.patel@gmail.com', address: 'Remote — Ahmedabad',
      permanentAddress: 'Navrangpura, Ahmedabad', grade: 'L4',
      confirmation: 'N/A (Contract)', shift: 'General (9 AM – 6 PM)', costCenter: 'CC-ENG-001',
      progress: 85, present: 17, absent: 1, late: 1, leaveDays: 2, overtime: 5, hours: 150,
      pendingTasks: 4, assets: 6, years: 2, rating: '4.5', bonus: '₹18,000', lastPayslip: 'Feb 2026',
      anniversary: 'Apr 1', netSalary: '₹1,10,000', monthlySalary: '₹1,25,000'
    },
    'EMP-011': {
      id: 'EMP-011', name: 'Divya Krishnan', email: 'divya@timeerp.com', phone: '+91 98765 43220',
      dept: 'HR', designation: 'HR Executive', location: 'Ghaziabad', type: 'Full-time',
      status: 'inactive', manager: 'Priya Mehta', joined: '2019-05-18', leaveBal: 0, salary: '—',
      gender: 'Female', dob: 'Oct 8, 1989', blood: 'B+', nationality: 'Indian', marital: 'Married',
      personalEmail: 'divya.krishnan@gmail.com', address: 'Crossings Republik, Ghaziabad',
      permanentAddress: 'Trivandrum, Kerala', grade: 'L2',
      confirmation: 'Nov 18, 2019', shift: '—', costCenter: 'CC-HR-001',
      progress: 100, present: 0, absent: 0, late: 0, leaveDays: 0, overtime: 0, hours: 0,
      pendingTasks: 0, assets: 0, years: 7, rating: '4.3', bonus: '—', lastPayslip: '—',
      anniversary: 'May 18', netSalary: '—', monthlySalary: '—'
    },
    'EMP-012': {
      id: 'EMP-012', name: 'Karan Malhotra', email: 'karan@timeerp.com', phone: '+91 98765 43221',
      dept: 'Sales', designation: 'Sales Manager', location: 'Delhi NCR', type: 'Full-time',
      status: 'active', manager: 'Admin', joined: '2020-10-30', leaveBal: 7, salary: '₹13 LPA',
      gender: 'Male', dob: 'Jun 16, 1988', blood: 'O+', nationality: 'Indian', marital: 'Married',
      personalEmail: 'karan.malhotra@gmail.com', address: 'Noida Sector 137',
      permanentAddress: 'Chandigarh', grade: 'L4',
      confirmation: 'Apr 30, 2021', shift: 'Field (Flexible)', costCenter: 'CC-SAL-001',
      progress: 97, present: 15, absent: 1, late: 2, leaveDays: 3, overtime: 8, hours: 145,
      pendingTasks: 5, assets: 8, years: 5, rating: '4.7', bonus: '₹35,000', lastPayslip: 'Feb 2026',
      anniversary: 'Oct 30', netSalary: '₹98,000', monthlySalary: '₹1,08,333'
    }
  };

  var EMP = DIRECTORY['EMP-001'];

  function $(id) { return document.getElementById(id); }

  function toast(title, detail) {
    if (window.DashboardShell) DashboardShell.toast(title, detail || 'UI preview — connect backend when ready.');
  }

  function initials(name) {
    return String(name || '').split(' ').map(function (n) { return n[0]; }).join('').slice(0, 2).toUpperCase();
  }

  function formatJoined(iso) {
    if (!iso) return '—';
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return iso;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function statusLabel(status) {
    var map = {
      active: 'Active', probation: 'Probation', notice: 'Notice Period',
      leave: 'On Leave', inactive: 'Inactive'
    };
    return map[status] || status;
  }

  function statusClass(status) {
    if (status === 'active') return 'active';
    if (status === 'probation' || status === 'notice' || status === 'leave') return 'pending';
    return 'pending';
  }

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el, target, suffix) {
    if (!el) return;
    var dur = 900, t0 = null;
    var num = Number(target) || 0;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = easeOutCubic(p);
      var val = num % 1 !== 0 ? (num * eased).toFixed(1) : Math.floor(num * eased);
      el.textContent = val + (suffix || '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function setRings(pct) {
    var s = pct + '%';
    document.querySelectorAll('.epr-ring').forEach(function (el) {
      el.style.setProperty('--pct', s);
      el.setAttribute('data-pct', s);
    });
  }

  function setText(sel, value) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.textContent = value == null || value === '' ? '—' : value;
    });
  }

  function resolveEmployee() {
    var params = new URLSearchParams(window.location.search);
    var raw = params.get('id') || params.get('emp') || params.get('employee');
    try {
      if (!raw) raw = sessionStorage.getItem('eprEmployeeId');
    } catch (err) { /* ignore */ }
    var id = String(raw || 'EMP-001').trim().toUpperCase();
    if (DIRECTORY[id]) {
      try { sessionStorage.setItem('eprEmployeeId', id); } catch (err2) { /* ignore */ }
      return DIRECTORY[id];
    }
    return DIRECTORY['EMP-001'];
  }

  function updateOrgChart(e, ini) {
    var youCard = document.querySelector('[data-org-self]') || document.querySelector('.epr-org__card--you');
    if (youCard) {
      youCard.classList.add('epr-org__card--you');
      youCard.setAttribute('aria-current', 'true');
      var nameEl = youCard.querySelector('[data-org-name]');
      var roleEl = youCard.querySelector('[data-org-role]');
      var av = youCard.querySelector('.epr-org__avatar');
      if (nameEl) nameEl.textContent = e.name;
      if (roleEl) roleEl.textContent = e.designation;
      if (av) {
        av.textContent = ini;
        av.classList.add('epr-org__avatar--you');
      }
    }

    var mgrCard = document.querySelector('[data-org-manager]') || document.querySelector('.epr-org__card--manager');
    if (mgrCard) {
      var mgrName = mgrCard.querySelector('[data-org-manager-name]') || mgrCard.querySelector('.epr-org__meta strong');
      var mgrAv = mgrCard.querySelector('.epr-org__avatar');
      if (mgrName) mgrName.textContent = e.manager;
      if (mgrAv) mgrAv.textContent = initials(e.manager);
    }
  }

  function populateProfile() {
    var e = EMP;
    var ini = initials(e.name);
    var joinedFmt = formatJoined(e.joined);

    document.querySelectorAll('[data-initials]').forEach(function (el) { el.textContent = ini; });

    if ($('heroName')) $('heroName').textContent = e.name;
    if ($('heroSub')) $('heroSub').textContent = e.id + ' · ' + e.designation + ' · ' + e.dept;
    if ($('sidebarName')) $('sidebarName').textContent = e.name;
    if ($('sidebarId')) $('sidebarId').textContent = e.id;

    document.title = e.name + ' — Employee Profile — TIME ERP HRMS';

    /* Status badges */
    document.querySelectorAll('[data-field="statusBadge"]').forEach(function (el) {
      el.textContent = statusLabel(e.status);
      el.className = 'epr-badge epr-badge--' + statusClass(e.status);
    });

    /* Hero meta */
    setText('[data-field="dept"]', e.dept);
    setText('[data-field="designation"]', e.designation);
    setText('[data-field="type"]', e.type);
    setText('[data-field="manager"]', e.manager);
    setText('[data-field="location"]', e.location);
    setText('[data-field="joined"]', joinedFmt);

    /* Personal */
    setText('[data-field="name"]', e.name);
    setText('[data-field="gender"]', e.gender);
    setText('[data-field="dob"]', e.dob);
    setText('[data-field="blood"]', e.blood);
    setText('[data-field="nationality"]', e.nationality);
    setText('[data-field="marital"]', e.marital);
    setText('[data-field="personalEmail"]', e.personalEmail);
    setText('[data-field="phone"]', e.phone);
    setText('[data-field="address"]', e.address);
    setText('[data-field="permanentAddress"]', e.permanentAddress);

    /* Official */
    setText('[data-field="id"]', e.id);
    setText('[data-field="grade"]', e.grade);
    setText('[data-field="office"]', e.location + (e.location === 'Remote' ? '' : ' HQ'));
    setText('[data-field="confirmation"]', e.confirmation);
    setText('[data-field="email"]', e.email);
    setText('[data-field="shift"]', e.shift);
    setText('[data-field="costCenter"]', e.costCenter);

    /* Sidebar contact */
    setText('[data-field="sidePhone"]', e.phone);
    setText('[data-field="sideEmail"]', e.email);
    setText('[data-field="sideTeams"]', e.email.split('@')[0]);

    updateOrgChart(e, ini);
    setRings(e.progress);
  }

  function renderKpi() {
    var e = EMP;
    animateCount($('kpiPresent'), e.present);
    animateCount($('kpiLeave'), e.leaveBal);
    if ($('kpiSalary')) $('kpiSalary').textContent = e.salary;
    animateCount($('kpiTasks'), e.pendingTasks);
    if ($('kpiAnniversary')) $('kpiAnniversary').textContent = e.anniversary;
    animateCount($('kpiYears'), e.years);
    animateCount($('kpiAssets'), e.assets);
    if ($('kpiRating')) $('kpiRating').textContent = e.rating;
  }

  function renderTimeline() {
    var events = [
      { text: 'Joined Company', time: formatJoined(EMP.joined), icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>' },
      { text: 'Assigned to ' + EMP.dept, time: formatJoined(EMP.joined), icon: '<path d="M3 21h18M5 21V7l8-4v18"/>' },
      { text: 'Profile updated', time: 'Recent', icon: '<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>' },
      { text: 'Attendance synced', time: 'This month', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>' },
      { text: 'Payroll generated', time: EMP.lastPayslip, icon: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>' }
    ];
    var wrap = $('eprTimeline');
    if (!wrap) return;
    wrap.innerHTML = events.map(function (ev, i) {
      return '<div class="epr-timeline__item" style="animation-delay:' + (i * 0.04) + 's">' +
        '<div class="epr-timeline__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">' + ev.icon + '</svg></div>' +
        '<div class="epr-timeline__body"><strong>' + ev.text + '</strong><span>' + ev.time + '</span></div></div>';
    }).join('');
  }

  function badgeClass(status) {
    if (status === 'completed') return 'verified';
    if (status === 'upcoming') return 'upcoming';
    return 'pending';
  }

  function renderTraining() {
    var items = [
      { title: 'ERP Fundamentals', status: 'completed' },
      { title: 'Security Awareness', status: EMP.status === 'probation' ? 'pending' : 'completed' },
      { title: 'Role Training — ' + EMP.designation, status: 'pending' },
      { title: 'Mandatory Compliance 2026', status: 'upcoming' }
    ];
    var wrap = $('eprTrainingList');
    if (!wrap) return;
    wrap.innerHTML = items.map(function (t) {
      return '<div class="epr-training__item"><span>' + t.title + '</span>' +
        '<span class="epr-badge epr-badge--' + badgeClass(t.status) + '">' + t.status + '</span></div>';
    }).join('');
  }

  function renderDocuments() {
    var docs = ['Resume', 'Offer Letter', 'Appointment Letter', 'PAN', 'Aadhaar', 'Passport', 'Education', 'Experience', 'Bank Details', 'Address Proof'];
    var wrap = $('eprDocuments');
    if (!wrap) return;
    wrap.innerHTML = docs.map(function (d) {
      var verified = EMP.progress >= 90 || ['Resume', 'PAN', 'Aadhaar'].indexOf(d) !== -1;
      if (EMP.status === 'probation' && ['Passport', 'Experience'].indexOf(d) !== -1) verified = false;
      return '<div class="epr-doc-card">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.75"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>' +
        '<strong>' + d + '</strong>' +
        '<span class="epr-badge epr-badge--' + (verified ? 'verified' : 'pending') + '">' + (verified ? 'Verified' : 'Pending') + '</span>' +
        '<div class="epr-doc-card__actions">' +
        '<button type="button" data-ui="preview" aria-label="Preview ' + d + '">Preview</button>' +
        '<button type="button" data-ui="download" aria-label="Download ' + d + '">Download</button></div></div>';
    }).join('');
  }

  function renderAssets() {
    var assets = [
      ['Laptop', 'assigned'], ['Monitor', 'assigned'], ['Keyboard', 'assigned'],
      ['Mouse', 'assigned'], ['Headset', EMP.status === 'probation' ? 'pending' : 'assigned'],
      ['ID Card', EMP.status === 'probation' ? 'pending' : 'assigned'],
      ['Access Card', 'assigned'], ['Email', 'assigned'], ['VPN', 'assigned']
    ];
    var wrap = $('eprAssets');
    if (!wrap) return;
    wrap.innerHTML = assets.map(function (a) {
      return '<div class="epr-asset-card"><strong>' + a[0] + '</strong>' +
        '<span class="epr-badge epr-badge--' + (a[1] === 'assigned' ? 'assigned' : 'pending') + '">' + a[1] + '</span></div>';
    }).join('');
  }

  function updateAttendanceSummary() {
    setText('[data-field="attPresent"]', EMP.present);
    setText('[data-field="attAbsent"]', EMP.absent);
    setText('[data-field="attLate"]', EMP.late);
    setText('[data-field="attLeave"]', EMP.leaveDays);
    setText('[data-field="attOvertime"]', EMP.overtime + 'h');
    setText('[data-field="attHours"]', EMP.hours + ' hrs');
  }

  function updatePayrollSummary() {
    setText('[data-field="monthlySalary"]', EMP.monthlySalary);
    setText('[data-field="lastPayslip"]', EMP.lastPayslip);
    setText('[data-field="bonus"]', EMP.bonus);
    setText('[data-field="netSalary"]', EMP.netSalary);
  }

  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.epr-reveal').forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.epr-reveal').forEach(function (el) { obs.observe(el); });
  }

  function initSmoothScroll() {
    document.querySelectorAll('.epr-sidebar__nav a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + id);
      });
    });
  }

  function ripple(e, el) {
    var rect = el.getBoundingClientRect();
    var rippleEl = document.createElement('span');
    rippleEl.className = 'epr-ripple';
    var size = Math.max(rect.width, rect.height);
    rippleEl.style.width = rippleEl.style.height = size + 'px';
    rippleEl.style.left = (e.clientX - rect.left - size / 2) + 'px';
    rippleEl.style.top = (e.clientY - rect.top - size / 2) + 'px';
    el.appendChild(rippleEl);
    rippleEl.addEventListener('animationend', function () { rippleEl.remove(); });
  }

  function closeMoreMenu() {
    var menu = $('moreDropdown');
    var btn = $('btnMore');
    if (menu) {
      menu.classList.remove('is-open');
      menu.setAttribute('hidden', '');
    }
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function positionMoreMenu() {
    var menu = $('moreDropdown');
    var btn = $('btnMore');
    if (!menu || !btn) return;
    var rect = btn.getBoundingClientRect();
    var menuWidth = Math.max(220, menu.offsetWidth || 220);
    var left = Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 12);
    left = Math.max(12, left);
    var top = rect.bottom + 8;
    var menuHeight = menu.offsetHeight || 200;
    if (top + menuHeight > window.innerHeight - 12) {
      top = Math.max(12, rect.top - menuHeight - 8);
    }
    menu.style.top = top + 'px';
    menu.style.left = left + 'px';
  }

  function openMoreMenu() {
    var menu = $('moreDropdown');
    var btn = $('btnMore');
    if (!menu || !btn) return;
    menu.removeAttribute('hidden');
    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    positionMoreMenu();
  }

  function toggleMoreMenu() {
    var menu = $('moreDropdown');
    if (menu && menu.classList.contains('is-open')) closeMoreMenu();
    else openMoreMenu();
  }

  function bindEvents() {
    document.addEventListener('click', function (e) {
      var quick = e.target.closest('.epr-quick__card');
      if (quick) ripple(e, quick);

      var moreBtn = e.target.closest('#btnMore');
      if (moreBtn) {
        e.preventDefault();
        e.stopPropagation();
        toggleMoreMenu();
        return;
      }

      var menuItem = e.target.closest('#moreDropdown [data-ui]');
      if (menuItem) {
        e.preventDefault();
        e.stopPropagation();
        closeMoreMenu();
        toast(menuItem.getAttribute('data-ui').replace(/-/g, ' '));
        return;
      }

      if ($('moreDropdown') && $('moreDropdown').classList.contains('is-open')) {
        if (!e.target.closest('#moreDropdown') && !e.target.closest('#btnMore')) closeMoreMenu();
      }

      var ui = e.target.closest('[data-ui]');
      if (ui) {
        e.preventDefault();
        var action = ui.dataset.ui;
        if (action === 'attendance' || action === 'view-attendance') {
          var att = document.getElementById('sectionAttendance');
          if (att) att.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        toast(action.replace(/-/g, ' '));
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMoreMenu();
    });

    window.addEventListener('resize', function () {
      if ($('moreDropdown') && $('moreDropdown').classList.contains('is-open')) positionMoreMenu();
    });

    var mainEl = document.querySelector('.main');
    if (mainEl) {
      mainEl.addEventListener('scroll', function () {
        if ($('moreDropdown') && $('moreDropdown').classList.contains('is-open')) closeMoreMenu();
      }, { passive: true });
    }

    $('btnEdit') && $('btnEdit').addEventListener('click', function () { toast('Edit Profile', EMP.name); });
    $('btnDownload') && $('btnDownload').addEventListener('click', function () { toast('Download Profile', EMP.name); });
    $('btnPrint') && $('btnPrint').addEventListener('click', function () { toast('Print', EMP.name); });
  }

  function init() {
    EMP = resolveEmployee();
    populateProfile();
    renderKpi();
    updateAttendanceSummary();
    updatePayrollSummary();
    renderTimeline();
    renderTraining();
    renderDocuments();
    renderAssets();
    bindEvents();
    initSmoothScroll();
    initScrollReveal();

    document.querySelectorAll('.epr-section:not(.epr-reveal)').forEach(function (sec, i) {
      sec.style.animationDelay = (i * 0.03) + 's';
      sec.classList.add('epr-fade-section');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
