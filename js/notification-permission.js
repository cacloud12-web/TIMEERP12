(function () {
  'use strict';

  var DATA = {
    settings: ['Service Modification', 'Profile Edit', 'Branch Settings', 'Email/SMTP', 'Payment Details', 'Customer Portal Policy', 'Set Designation', 'FeedBack', 'Ticket & Support', 'Suggestion'],
    hrms: ['Leave Request', 'Attendance Correction', 'Expense Submit', 'Appraisal Reminder', 'Probation Due'],
    client: ['Client Created', 'Client Updated', 'Portal Invite', 'DSC Expiry'],
    marketing: ['Campaign Sent', 'Lead Assigned', 'Appointment Reminder'],
    vault: ['Document Uploaded', 'UDIN Added', 'DSC Tracked'],
    tasks: ['Task Assigned', 'Task Due', 'Task Completed', 'Timesheet Reminder'],
    billing: ['Invoice Created', 'Payment Received', 'Overdue Reminder'],
    misc: ['System Alert', 'Security Login', 'Password Reset']
  };

  var titles = {
    settings: 'Settings',
    hrms: 'HRMS',
    client: 'Client',
    marketing: 'Marketing',
    vault: 'Document Vault',
    tasks: 'Tasks',
    billing: 'Billing',
    misc: 'Miscellaneous'
  };

  function renderRows(key) {
    var body = document.getElementById('npBody');
    var title = document.getElementById('npTitle');
    if (!body) return;
    var rows = DATA[key] || DATA.settings;
    if (title) title.textContent = titles[key] || 'Settings';
    body.innerHTML = rows.map(function (r) {
      return '<tr><td>' + r + '</td>' +
        '<td><input type="checkbox" checked></td>' +
        '<td><input type="checkbox" checked></td>' +
        '<td><input type="checkbox" checked></td></tr>';
    }).join('');
  }

  document.querySelectorAll('.np-cat').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (e.target && e.target.closest('[data-np-toggle]')) {
        var sw = btn.querySelector('[data-np-toggle]');
        if (sw) sw.classList.toggle('is-on');
        e.stopPropagation();
        return;
      }
      document.querySelectorAll('.np-cat').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      renderRows(btn.getAttribute('data-np-cat'));
    });
  });

  document.querySelectorAll('[data-np-toggle]').forEach(function (sw) {
    sw.addEventListener('click', function (e) {
      e.stopPropagation();
      sw.classList.toggle('is-on');
    });
  });
})();
