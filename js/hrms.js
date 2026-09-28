/**
 * TIME ERP HRMS landing - interactive feature explorer.
 * Content aligned with home1 modules + CA CloudDesk HRMS guide structure.
 * Ref: https://guide.caclouddesk.com/Module/HRMS/hrms-help.html
 */
(function () {
  'use strict';

  var features = [
    {
      id: 'employees', group: 'core',
      title: 'Employees & Profiles',
      desc: 'Hire, onboard, manage, and retain your workforce from one intelligent HR hub.',
      icon: 'assets/home-icons/hrms.svg',
      capabilities: [
        'View and manage employee profiles, designations, and permissions',
        'Add employees with basic details, employment info, and credentials',
        'Support recruitment and onboarding workflows',
        'Keep policies and employee records centralized'
      ],
      benefits: 'Give HR one source of truth for workforce data that feeds attendance, leave, payroll, and approvals.',
      related: { name: 'HRMS', href: 'HRMS/viewemployee.html', icon: 'groups' },
      cta: { label: 'Open View Employees', href: 'HRMS/viewemployee.html' }
    },
    {
      id: 'recruitment', group: 'core',
      title: 'Recruitment',
      desc: 'Run hiring workflows from requisition to offer inside TIME ERP HRMS.',
      icon: 'assets/home-icons/hrms.svg',
      capabilities: [
        'Track candidates and hiring stages',
        'Connect recruitment to onboarding',
        'Keep hiring records with employee profiles',
        'Hand off new joiners into HRMS cleanly'
      ],
      benefits: 'Reduce hiring handoff gaps by connecting recruitment directly to employee onboarding.',
      related: { name: 'Recruitment', href: 'HRMS/recruitment.html', icon: 'person_search' },
      cta: { label: 'Explore Recruitment', href: 'HRMS/recruitment.html' }
    },
    {
      id: 'onboarding', group: 'core',
      title: 'Onboarding',
      desc: 'Bring new joiners into the organization with structured onboarding steps.',
      icon: 'assets/home-icons/hrms.svg',
      capabilities: [
        'Guide new employees through onboarding tasks',
        'Capture employment and profile details early',
        'Align permissions with designation',
        'Prepare records for attendance and payroll'
      ],
      benefits: 'Shorten time-to-productivity with a clear onboarding path tied to HRMS employee records.',
      related: { name: 'Onboarding', href: 'HRMS/onboarding.html', icon: 'person_add' },
      cta: { label: 'Explore Onboarding', href: 'HRMS/onboarding.html' }
    },
    {
      id: 'attendance', group: 'employees',
      title: 'Attendance',
      desc: 'Biometric, geo, and shift-based attendance with real-time tracking.',
      icon: 'assets/home-icons/attendance.svg',
      capabilities: [
        'Daily attendance with check-in and check-out visibility',
        'Shift and overtime tracking',
        'Biometric and geo attendance options',
        'Desktop check-in and mobile mark attendance with face upload'
      ],
      benefits: 'Capture presence accurately across office and field teams so leave and payroll inputs stay reliable.',
      related: { name: 'Attendance', href: 'attendance.html', icon: 'fingerprint' },
      cta: { label: 'Explore Attendance', href: 'attendance.html' }
    },
    {
      id: 'my-leave', group: 'employees',
      title: 'My Leave',
      desc: 'View leave balance, apply for leave, and track leave history.',
      icon: 'assets/home-icons/leave.svg',
      capabilities: [
        'Apply leave with type, dates, half-day, reason, and proof',
        'Track leave balance and history',
        'Align requests with holiday calendar',
        'Route applications for manager approval'
      ],
      benefits: 'Employees self-serve leave requests while managers keep visibility on balances and coverage.',
      related: { name: 'Leave Management', href: 'leave.html', icon: 'beach_access' },
      cta: { label: 'Explore Leave Management', href: 'leave.html' }
    },
    {
      id: 'expense', group: 'employees',
      title: 'Expense',
      desc: 'Capture, approve, and reimburse business expenses effortlessly.',
      icon: 'assets/home-icons/expense.svg',
      capabilities: [
        'Submit claims with client, amount, bill, remark, and billable flag',
        'Track Pending, Approved, and Rejected expenses',
        'Support travel and reimbursement workflows',
        'Generate expense reports for HR and finance'
      ],
      benefits: 'Replace scattered expense sheets with a controlled claim and approval flow inside HRMS.',
      related: { name: 'Expense', href: 'expense.html', icon: 'receipt_long' },
      cta: { label: 'Explore Expense', href: 'expense.html' }
    },
    {
      id: 'timesheet', group: 'employees',
      title: 'Timesheet',
      desc: 'Track billable hours and productivity with weekly approvals.',
      icon: 'assets/home-icons/timesheet.svg',
      capabilities: [
        'Log work hours by client, branch, service, and task',
        'Select status and date range for entries',
        'View employee timesheet summary',
        'Support daily timesheet, billable hours, and approvals'
      ],
      benefits: 'Connect effort tracking to project delivery and billing with clear timesheet approvals.',
      related: { name: 'Timesheet', href: 'timesheet.html', icon: 'schedule' },
      cta: { label: 'Explore Timesheet', href: 'timesheet.html' }
    },
    {
      id: 'grievances', group: 'employees',
      title: 'Raise Grievances',
      desc: 'Submit and track employee grievances by status.',
      icon: 'assets/home-icons/hrms.svg',
      capabilities: [
        'Raise grievances with a structured form',
        'View grievances by status',
        'Track progress until HR resolution',
        'Keep workplace issues documented'
      ],
      benefits: 'Give employees a clear channel for workplace issues with status visibility for HR.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'support_agent' },
      cta: { label: 'Talk to Sales about HRMS', href: 'contact_sales.html' }
    },
    {
      id: 'hierarchy', group: 'employees',
      title: 'Employee Hierarchy',
      desc: 'View hierarchy by designation and create teams with incharge and members.',
      icon: 'assets/home-icons/hrms.svg',
      capabilities: [
        'View organization hierarchy by designation',
        'Create teams with name, incharge, and members',
        'Clarify reporting lines for approvals',
        'Support manager workflows across HRMS'
      ],
      benefits: 'Make reporting lines and team ownership visible so approvals route to the right managers.',
      related: { name: 'HRMS', href: 'HRMS/viewemployee.html', icon: 'account_tree' },
      cta: { label: 'Explore Employee Profile', href: 'HRMS/viewemployee.html' }
    },
    {
      id: 'manager-approval', group: 'managers',
      title: 'Manager Approval',
      desc: 'Approve attendance, leave, on duty, comp off, timesheet, grievance, expense, and probation requests.',
      icon: 'assets/home-icons/hrms.svg',
      capabilities: [
        'Approve attendance and leave requests',
        'Review on duty, comp off, and timesheet entries',
        'Handle grievance and expense approvals',
        'Support probation-related decisions'
      ],
      benefits: 'Give managers one approval inbox for the HR requests that keep teams and payroll moving.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'verified' },
      cta: { label: 'Book an HRMS Demo', href: 'contact_sales.html' }
    },
    {
      id: 'manager-reports', group: 'managers',
      title: 'Manager Reports',
      desc: 'Generate and view reports for task, HRMS, timesheet, and attendance summary.',
      icon: 'assets/home-icons/hrms.svg',
      capabilities: [
        'Attendance summary reports',
        'Timesheet and HRMS reporting views',
        'Task-related management reports',
        'Support people and delivery decisions with data'
      ],
      benefits: 'Help managers spot attendance gaps, timesheet issues, and HR trends without leaving TIME ERP.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'summarize' },
      cta: { label: 'Contact Sales', href: 'contact_sales.html' }
    },
    {
      id: 'hr-settings', group: 'hr',
      title: 'HRMS Settings',
      desc: 'Configure HRMS settings and policies for your organization.',
      icon: 'assets/home-icons/hrms.svg',
      capabilities: [
        'Configure HRMS policies from Profile Settings',
        'Align HR rules with attendance and leave',
        'Support organization-wide HR defaults',
        'Keep configuration centralized for admins'
      ],
      benefits: 'Standardize HRMS behavior across branches so every team follows the same policies.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'settings' },
      cta: { label: 'Talk to Consultant', href: 'consultants.html' }
    },
    {
      id: 'hr-leave', group: 'hr',
      title: 'HRMS Leave Policies',
      desc: 'Manage leave policies, leave types, and leave configurations.',
      icon: 'assets/home-icons/leave.svg',
      capabilities: [
        'Define leave types and policies',
        'Configure leave rules for the organization',
        'Add holidays from template, single, or bulk entry',
        'Connect policies to employee leave balances'
      ],
      benefits: 'HR controls leave rules and holiday calendars so employee applications stay consistent.',
      related: { name: 'Leave Management', href: 'leave.html', icon: 'event_available' },
      cta: { label: 'Explore Leave Management', href: 'leave.html' }
    },
    {
      id: 'designation', group: 'hr',
      title: 'Designation & Permission',
      desc: 'Manage employee designations and configure role-based permissions.',
      icon: 'assets/home-icons/hrms.svg',
      capabilities: [
        'Define designations across the workforce',
        'Configure role-based permissions',
        'Control access for HRMS actions',
        'Keep security aligned with job roles'
      ],
      benefits: 'Protect sensitive HR and payroll actions with clear designation-based permissions.',
      related: { name: 'HRMS', href: 'HRMS/viewemployee.html', icon: 'admin_panel_settings' },
      cta: { label: 'Open View Employees', href: 'HRMS/viewemployee.html' }
    },
    {
      id: 'attendance-approval', group: 'hr',
      title: 'Attendance Approval',
      desc: 'Review pending check-ins and approve or reject attendance entries.',
      icon: 'assets/home-icons/attendance.svg',
      capabilities: [
        'Work with Pending and Approved/Rejected check-in tabs',
        'Approve or reject individual attendance cards',
        'Use Select All for bulk approve or reject',
        'Keep attendance clean before payroll cycles'
      ],
      benefits: 'HR can clear attendance exceptions quickly so payslips and compliance stay accurate.',
      related: { name: 'Attendance', href: 'attendance.html', icon: 'fact_check' },
      cta: { label: 'Explore Attendance', href: 'attendance.html' }
    },
    {
      id: 'hr-expense', group: 'hr',
      title: 'HR Expense',
      desc: 'Review and manage employee expense claims across Pending, Approved, and Rejected tabs.',
      icon: 'assets/home-icons/expense.svg',
      capabilities: [
        'Review pending expense claims',
        'Approve or reject with clear status tabs',
        'Support reimbursement workflows',
        'Keep expense audit trails for finance'
      ],
      benefits: 'Centralize expense control for HR while employees submit claims from the same HRMS workspace.',
      related: { name: 'Expense', href: 'expense.html', icon: 'account_balance_wallet' },
      cta: { label: 'Explore Expense', href: 'expense.html' }
    },
    {
      id: 'probation', group: 'hr',
      title: 'HR Probation Approval',
      desc: 'Approve or extend employee probation from HRMS probation workflows.',
      icon: 'assets/home-icons/hrms.svg',
      capabilities: [
        'Review employees on probation',
        'Approve confirmation or extend probation',
        'Keep employment status updates documented',
        'Align probation outcomes with employee profiles'
      ],
      benefits: 'Give HR a controlled process for probation decisions tied to employee records.',
      related: { name: 'HRMS', href: 'HRMS/viewemployee.html', icon: 'workspace_premium' },
      cta: { label: 'Explore Employee Profile', href: 'HRMS/viewemployee.html' }
    },
    {
      id: 'grievance-approval', group: 'hr',
      title: 'HR Grievance Approval',
      desc: 'Review pending grievances and approve or reject with clear status tabs.',
      icon: 'assets/home-icons/hrms.svg',
      capabilities: [
        'Work with Pending Grievance and Approve/Reject tabs',
        'Review employee-submitted grievances',
        'Record outcomes for workplace issues',
        'Keep HR resolution history available'
      ],
      benefits: 'Close the loop on employee grievances with a dedicated HR approval workspace.',
      related: { name: 'HRMS', href: 'hrms.html', icon: 'gavel' },
      cta: { label: 'Contact Sales', href: 'contact_sales.html' }
    },
    {
      id: 'salary-slips', group: 'payroll',
      title: 'Salary Slips',
      desc: 'View and download monthly salary slips with detailed breakdown.',
      icon: 'assets/home-icons/payroll.svg',
      capabilities: [
        'Access monthly payslips for employees',
        'View detailed salary breakdown',
        'Download slips for records',
        'Align slips with salary structure and statutory items'
      ],
      benefits: 'Employees get self-serve payslip access while payroll stays controlled by HR.',
      related: { name: 'Payroll', href: 'payroll.html', icon: 'payments' },
      cta: { label: 'Explore Payroll', href: 'payroll.html' }
    },
    {
      id: 'form-12b', group: 'payroll',
      title: 'Form 12B',
      desc: 'Fill Form 12B with previous employer details, annexure, remarks, and declarations.',
      icon: 'assets/home-icons/payroll.svg',
      capabilities: [
        'Capture previous employer details',
        'Complete annexure and declarations',
        'Select branch and financial year',
        'Upload proof and declaration documents'
      ],
      benefits: 'Support tax declaration workflows employees need for accurate TDS and payroll processing.',
      related: { name: 'Payroll', href: 'payroll.html', icon: 'description' },
      cta: { label: 'Explore Payroll', href: 'payroll.html' }
    },
    {
      id: 'form-12bb', group: 'payroll',
      title: 'Form 12BB',
      desc: 'Fill Form 12BB for tax regime, HRA, landlord details, and declarations.',
      icon: 'assets/home-icons/payroll.svg',
      capabilities: [
        'Select financial year and tax regime (New/Old)',
        'Capture HRA with monthly rent and landlord details',
        'Upload rent receipt, rent agreement, and PAN where needed',
        'Complete remarks and declarations'
      ],
      benefits: 'Help employees submit investment and HRA declarations that payroll teams can verify.',
      related: { name: 'Payroll', href: 'payroll.html', icon: 'request_quote' },
      cta: { label: 'Explore Payroll', href: 'payroll.html' }
    },
    {
      id: 'payroll-settings', group: 'payroll',
      title: 'Payroll Account Settings',
      desc: 'Configure payroll account settings and salary processing preferences.',
      icon: 'assets/home-icons/payroll.svg',
      capabilities: [
        'Configure payroll account settings',
        'Manage salary processing preferences',
        'Support PF & ESI and TDS configuration inputs',
        'Keep payroll rules ready before generation'
      ],
      benefits: 'HR sets payroll foundations once so monthly processing stays consistent and compliant.',
      related: { name: 'Payroll', href: 'payroll.html', icon: 'tune' },
      cta: { label: 'Explore Payroll', href: 'payroll.html' }
    },
    {
      id: 'payroll-declaration', group: 'payroll',
      title: 'Employee Declaration Approval',
      desc: 'Unlock Form 12B/12BB for employees, then verify and track approval status.',
      icon: 'assets/home-icons/payroll.svg',
      capabilities: [
        'Unlock declarations for employees',
        'Verify submitted Form 12B / 12BB data',
        'Track approval status from Approval tabs',
        'Reduce payroll errors from incomplete declarations'
      ],
      benefits: 'Close declaration cycles before salary generation with clear unlock and approval steps.',
      related: { name: 'Payroll', href: 'payroll.html', icon: 'task_alt' },
      cta: { label: 'Explore Payroll', href: 'payroll.html' }
    },
    {
      id: 'payroll-transaction', group: 'payroll',
      title: 'Payroll Transaction',
      desc: 'Process payable days, deductions, additional pay, TDS, hold, generate, release, arrear, and tax computation.',
      icon: 'assets/home-icons/payroll.svg',
      capabilities: [
        'Manage Payable Days, Variable Deduction, and Additional Pay',
        'Handle Manual TDS, Hold, Generate, and Release',
        'Work with Released, Arrear, and Tax Computation',
        'Automate salary processing with statutory compliance and payslips'
      ],
      benefits: 'Run the full payroll transaction cycle from inputs to released payslips in one TIME ERP Payroll workspace.',
      related: { name: 'Payroll', href: 'payroll.html', icon: 'account_balance' },
      cta: { label: 'Explore Payroll', href: 'payroll.html' }
    }
  ];

  var list = document.getElementById('hrmsFeatList');
  var empty = document.getElementById('hrmsEmpty');
  var filters = document.getElementById('hrmsFilters');
  var panelInner = document.getElementById('hrmsPanelInner');
  var activeId = features[0].id;
  var activeFilter = 'all';

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function findFeature(id) {
    return features.filter(function (f) { return f.id === id; })[0] || features[0];
  }

  function renderList() {
    var visible = features.filter(function (f) {
      return activeFilter === 'all' || f.group === activeFilter;
    });
    if (empty) empty.classList.toggle('is-visible', !visible.length);
    list.querySelectorAll('.mkt-feat').forEach(function (el) { el.remove(); });
    visible.forEach(function (f) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mkt-feat' + (f.id === activeId ? ' is-active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', f.id === activeId ? 'true' : 'false');
      btn.setAttribute('data-id', f.id);
      btn.innerHTML =
        '<span class="mkt-feat__top">'
        + '<span class="mkt-feat__icon" aria-hidden="true"><img src="' + escapeHtml(f.icon) + '" alt="" width="24" height="24"></span>'
        + '<span class="mkt-feat__check" aria-hidden="true"><span class="material-symbols-outlined">check</span></span>'
        + '</span>'
        + '<span class="mkt-feat__label">' + escapeHtml(f.title) + '</span>'
        + '<span class="mkt-feat__desc">' + escapeHtml(f.desc) + '</span>';
      list.appendChild(btn);
    });
    if (visible.length && !visible.some(function (f) { return f.id === activeId; })) {
      activeId = visible[0].id;
      renderPanel(activeId);
    }
  }

  function renderPanel(id) {
    var f = findFeature(id);
    activeId = f.id;
    if (!panelInner) return;
    panelInner.classList.add('is-updating');
    setTimeout(function () {
      document.getElementById('hrmsPanelIcon').src = f.icon;
      document.getElementById('hrmsPanelName').textContent = f.title;
      document.getElementById('hrmsPanelDesc').textContent = f.desc;
      document.getElementById('hrmsPanelBenefits').textContent = f.benefits;
      document.getElementById('hrmsPanelCaps').innerHTML = f.capabilities.map(function (c) {
        return '<li><span class="material-symbols-outlined" aria-hidden="true">check_circle</span><span>' + escapeHtml(c) + '</span></li>';
      }).join('');
      var cta = document.getElementById('hrmsPanelCta');
      cta.textContent = f.cta.label;
      cta.href = f.cta.href;
      panelInner.classList.remove('is-updating');
    }, 120);
    list.querySelectorAll('.mkt-feat').forEach(function (btn) {
      var on = btn.getAttribute('data-id') === activeId;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  if (filters) {
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.mkt-filter');
      if (!btn) return;
      activeFilter = btn.getAttribute('data-filter') || 'all';
      filters.querySelectorAll('.mkt-filter').forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      renderList();
      renderPanel(activeId);
    });
  }

  if (list) {
    list.addEventListener('click', function (e) {
      var btn = e.target.closest('.mkt-feat');
      if (!btn) return;
      renderPanel(btn.getAttribute('data-id'));
    });
  }

  var journey = document.getElementById('hrmsJourney');
  if (journey) {
    journey.addEventListener('click', function (e) {
      var step = e.target.closest('[data-journey]');
      if (!step) return;
      journey.querySelectorAll('[data-journey]').forEach(function (s) {
        s.classList.toggle('is-active', s === step);
      });
      var map = {
        hire: 'recruitment',
        attend: 'attendance',
        leave: 'my-leave',
        pay: 'salary-slips',
        approve: 'manager-approval'
      };
      var id = map[step.getAttribute('data-journey')];
      if (id) {
        activeFilter = 'all';
        filters.querySelectorAll('.mkt-filter').forEach(function (b) {
          var on = b.getAttribute('data-filter') === 'all';
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        renderList();
        renderPanel(id);
        document.getElementById('hrms-explorer').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  renderList();
  renderPanel(activeId);
})();
