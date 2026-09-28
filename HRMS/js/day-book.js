/**
 * Day Book Dashboard — match product UI (scroll sections, empty states)
 */
(function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var currentDate = new Date(2026, 7, 27);

  /* Demo rows for Today Task + My Notes */
  var TASKS = [
    { name: 'GST Return — Jul 2026', assignees: 'Saurabh Bhardwaj', service: 'GST', status: 'Pending', by: 'Ankur Gupta', target: '31-08-2026', priority: 'High', group: 'MSME Clients' },
    { name: 'ITR Filing — Kamal Kant Sharma', assignees: 'Kamal Sharma', service: 'Income Tax', status: 'Pending', by: 'Saurabh Bhardwaj', target: '15-09-2026', priority: 'Medium', group: 'Individuals' },
    { name: 'Form 16 generation', assignees: 'Akash, Dev Aggarwal', service: 'Payroll', status: 'Completed', by: 'Anupam', target: '20-08-2026', priority: 'Low', group: 'Internal' },
    { name: 'Company audit docs review', assignees: 'Ankur Gupta', service: 'Audit', status: 'Overdue', by: 'Saurabh Bhardwaj', target: '18-08-2026', priority: 'High', group: 'Corporate' },
    { name: 'UDIN generation — FY 25-26', assignees: 'Dev Aggarwal', service: 'Audit', status: 'Completed', by: 'Ankur Gupta', target: '25-08-2026', priority: 'Medium', group: 'Corporate' },
    { name: 'FSSAI renewal follow-up', assignees: 'Akash', service: 'Compliance', status: 'Pending', by: 'Kamal Sharma', target: '30-08-2026', priority: 'Medium', group: 'MSME Clients' }
  ];
  var NOTES = [
    { title: 'Call client for GST OTP', body: 'Need OTP before 5 PM for Jul return filing.', customer: 'Kamal Kant Sharma', tags: 'gst', assignees: 'Saurabh Bhardwaj' },
    { title: 'Invoice correction — Bluemon', body: 'Wrong HSN on last invoice; reissue before weekend.', customer: 'Internal', tags: 'INVOICE', assignees: 'Ankur Gupta' },
    { title: 'UDIN pending for audit report', body: 'Waiting on partner sign-off before generating UDIN.', customer: 'testing', tags: 'UDIN', assignees: 'Dev Aggarwal' },
    { title: 'HR policy update discussion', body: 'Share revised leave policy draft with team.', customer: 'Internal', tags: 'hr', assignees: 'Anupam' }
  ];
  var BIRTHDAYS = [
    { name: 'Priya Mehta', mobile: '9876543210', email: 'priya.mehta@example.com', company: 'CA CloudDesk', dob: '27-08-1994', action: 'Wish' },
    { name: 'Rahul Kapoor', mobile: '9812345678', email: 'rahul.kapoor@example.com', company: 'Bluemon Wealth', dob: '27-08-1990', action: 'Wish' },
    { name: 'Ananya Singh', mobile: '9900112233', email: 'ananya.singh@example.com', company: 'Law Seva Management', dob: '27-08-1998', action: 'Wish' }
  ];
  var ANNIVERSARIES = [
    { name: 'Saurabh Bhardwaj', mobile: '9998887776', email: 'saurabh@example.com', company: 'CA CloudDesk', dob: '27-08-2018', action: 'Congratulate' },
    { name: 'Kamal Sharma', mobile: '9876501234', email: 'kamal.sharma@example.com', company: 'CA CloudDesk', dob: '27-08-2020', action: 'Congratulate' }
  ];
  var HEARINGS = [
    { caseNo: 'ITAT/2041/2024', client: 'Kamal Kant Sharma', name: 'Income Tax Appeal — AY 22-23', court: 'ITAT Delhi', next: '27-08-2026', emp: 'Ankur Gupta', status: 'Open', action: 'View' },
    { caseNo: 'GST/881/2025', client: 'Perfect Pair', name: 'GST demand reply hearing', court: 'CGST Delhi East', next: '27-08-2026', emp: 'Saurabh Bhardwaj', status: 'Pending', action: 'View' },
    { caseNo: 'ROC/112/2025', client: 'The Gold Realty', name: 'Company law compliance notice', court: 'ROC Delhi', next: '28-08-2026', emp: 'Dev Aggarwal', status: 'Open', action: 'View' },
    { caseNo: 'TDS/56/2026', client: 'Tata Motors PV', name: 'TDS short deduction hearing', court: 'CIT(A) Delhi', next: '30-08-2026', emp: 'Akash', status: 'Pending', action: 'View' }
  ];
  var APPOINTMENTS = [
    { sno: 1, date: '27-08-2026 10:00', client: 'Kamal Kant Sharma', partner: 'Saurabh Bhardwaj', by: 'Admin', reason: 'GST filing review', link: 'Meet', status: 'Approved' },
    { sno: 2, date: '27-08-2026 12:30', client: 'Perfect Pair', partner: 'Ankur Gupta', by: 'Saurabh Bhardwaj', reason: 'Audit discussion', link: 'Zoom', status: 'Approved' },
    { sno: 3, date: '27-08-2026 15:00', client: 'The Gold Realty', partner: 'Dev Aggarwal', by: 'Admin', reason: 'ROC compliance', link: 'View', status: 'Pending' },
    { sno: 4, date: '27-08-2026 16:45', client: 'Internal', partner: 'Akash', by: 'Anupam', reason: 'Team sync', link: 'Meet', status: 'Completed' }
  ];

  var NOTE_CUSTOMERS = ['Internal', 'Kamal Kant Sharma', 'testing'];
  var NOTE_TAGS = ['gst', 'INVOICE', 'UDIN', 'fssai', 'hr'];
  var NOTE_ASSIGNEES = ['Saurabh Bhardwaj', 'Kamal Sharma', 'Ankur Gupta', 'Akash', 'Dev Aggarwal', 'Anupam'];

  var noteForm = null;
  var noteComboOpen = null;
  var noteComboSearch = '';
  var bdayMode = 'birthday';

  var SECTION_IDS = {
    today: 'dbSecToday',
    notes: 'dbSecNotes',
    attendance: 'dbSecAttendance',
    birthday: 'dbSecBirthday',
    hearing: 'dbSecHearing',
    appointment: 'dbSecAppointment'
  };

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function formatLabel(d) {
    return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  }

  function formatDash(d) {
    return pad(d.getDate()) + '-' + pad(d.getMonth() + 1) + '-' + d.getFullYear();
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function emptyIcon() {
    return '<div class="db-empty__icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none">' +
      '<path d="M12 30l7-9h26l7 9" stroke="#91caff" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M12 30h40v20a4 4 0 01-4 4H16a4 4 0 01-4-4V30z" stroke="#91caff" stroke-width="2" stroke-linejoin="round"/>' +
      '<rect x="24" y="16" width="16" height="18" rx="1.5" stroke="#69b1ff" stroke-width="2"/>' +
      '<path d="M28 22h8M28 27h6" stroke="#69b1ff" stroke-width="1.5" stroke-linecap="round"/>' +
      '<circle cx="42" cy="20" r="7" fill="#e6f4ff" stroke="#69b1ff" stroke-width="1.5"/>' +
      '<path d="M39.5 20h5M42 17.5v5" stroke="#1677ff" stroke-width="1.5" stroke-linecap="round"/>' +
      '</svg></div>';
  }

  function emptyRow(cols) {
    return '<tr><td colspan="' + cols + '"><div class="db-empty">' + emptyIcon() +
      '<div>No data found</div></div></td></tr>';
  }

  function setCount(id, n) {
    var el = document.getElementById(id);
    if (el) el.textContent = n + ' / ' + n;
  }

  function statusBadge(s) {
    var cls = 'db-badge--pending';
    if (s === 'Completed' || s === 'Done' || s === 'Approved') cls = 'db-badge--done';
    else if (s === 'Overdue') cls = 'db-badge--overdue';
    else if (s === 'Open') cls = 'db-badge--open';
    return '<span class="db-badge ' + cls + '">' + s + '</span>';
  }

  function renderTasks() {
    var body = document.getElementById('dbTaskBody');
    if (!body) return;
    var total = TASKS.length;
    var pending = TASKS.filter(function (t) { return t.status === 'Pending'; }).length;
    var completed = TASKS.filter(function (t) { return t.status === 'Completed'; }).length;
    var overdue = TASKS.filter(function (t) { return t.status === 'Overdue'; }).length;
    var stats = document.getElementById('dbTaskStats');
    if (stats) {
      var map = { total: total, pending: pending, completed: completed, overdue: overdue };
      stats.querySelectorAll('[data-stat]').forEach(function (el) {
        el.textContent = map[el.getAttribute('data-stat')] || 0;
      });
    }
    if (!TASKS.length) {
      body.innerHTML = emptyRow(8);
      setCount('dbTaskCount', 0);
      return;
    }
    body.innerHTML = TASKS.map(function (t) {
      return '<tr><td>' + esc(t.name) + '</td><td>' + esc(t.assignees) + '</td><td>' + esc(t.service) + '</td><td>' + statusBadge(t.status) +
        '</td><td>' + esc(t.by) + '</td><td>' + esc(t.target) + '</td><td>' + esc(t.priority) + '</td><td>' + esc(t.group) + '</td></tr>';
    }).join('');
    setCount('dbTaskCount', TASKS.length);
  }

  function noteGauge() {
    return '<svg class="db-note-gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
      '<path d="M12 14a2 2 0 100-4 2 2 0 000 4z"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>' +
    '</svg>';
  }

  function noteClock() {
    return '<span class="db-note-form__clock" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>';
  }

  function renderNoteCombo(field, value) {
    var placeholders = { customer: 'Select customer', tags: 'Tags', assignees: 'Assignees' };
    var options = field === 'customer' ? NOTE_CUSTOMERS : field === 'tags' ? NOTE_TAGS : NOTE_ASSIGNEES;
    var isOpen = noteComboOpen === field;
    var q = (isOpen ? noteComboSearch : '').toLowerCase();
    var filtered = options.filter(function (o) { return !q || o.toLowerCase().indexOf(q) !== -1; });
    var opts = filtered.map(function (o) {
      return '<button type="button" class="db-note-combo__opt' + (value === o ? ' is-active' : '') +
        '" data-db-note-opt="' + field + '" data-val="' + esc(o) + '">' + esc(o) + '</button>';
    }).join('');
    return '<div class="db-note-combo' + (isOpen ? ' is-open' : '') + '" data-db-note-combo="' + field + '">' +
      '<button type="button" class="db-note-combo__btn" data-db-note-combo-btn="' + field + '">' +
        esc(value || placeholders[field]) +
      '</button>' +
      '<div class="db-note-combo__drop">' +
        '<div class="db-note-combo__search"><input type="search" data-db-note-combo-search="' + field +
          '" placeholder="' + esc(placeholders[field]) + '" value="' + esc(isOpen ? noteComboSearch : '') + '" autocomplete="off"></div>' +
        '<div>' + opts + '</div>' +
      '</div>' +
    '</div>';
  }

  function renderNoteFormHtml() {
    if (!noteForm) return '';
    return '<div class="db-note-form">' +
      '<div class="db-note-form__side">' +
        '<span class="db-note-form__bullet" aria-hidden="true"></span>' +
        noteClock() +
      '</div>' +
      '<div class="db-note-form__main">' +
        '<div class="db-note-form__actions">' +
          '<button type="button" class="db-note-form__save" id="dbNoteSave" aria-label="Save">✓</button>' +
          '<button type="button" class="db-note-form__cancel" id="dbNoteCancel" aria-label="Cancel">✕</button>' +
        '</div>' +
        '<input type="text" class="db-note-input" id="dbNoteTitle" placeholder="Enter Note Title" value="' + esc(noteForm.title) + '">' +
        '<textarea class="db-note-textarea" id="dbNoteBody" placeholder="Enter Note" rows="3">' + esc(noteForm.body) + '</textarea>' +
        '<div class="db-note-fields">' +
          renderNoteCombo('customer', noteForm.customer) +
          renderNoteCombo('tags', noteForm.tags) +
          renderNoteCombo('assignees', noteForm.assignees) +
          noteGauge() +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function notesEmptyHtml() {
    return '<div class="db-notes-empty">' + emptyIcon() + '<div>No data found</div></div>';
  }

  function renderNotes() {
    var compose = document.getElementById('dbNotesCompose');
    var list = document.getElementById('dbNotesList');
    if (!list) return;
    if (compose) {
      compose.hidden = !noteForm;
      compose.innerHTML = noteForm ? renderNoteFormHtml() : '';
    }
    if (!NOTES.length) {
      list.innerHTML = notesEmptyHtml();
      setCount('dbNotesCount', 0);
      return;
    }
    list.innerHTML = NOTES.map(function (n) {
      var meta = [n.customer, n.tags, n.assignees].filter(Boolean).join(' · ');
      return '<div class="db-note-row">' +
        '<span class="db-note-row__bullet" aria-hidden="true"></span>' +
        '<span class="db-note-row__text">' +
          '<strong>' + esc(n.title || 'Untitled') + '</strong>' +
          (n.body ? '<span class="db-note-row__body">' + esc(n.body) + '</span>' : '') +
          (meta ? '<span class="db-note-row__meta">' + esc(meta) + '</span>' : '') +
        '</span>' +
      '</div>';
    }).join('');
    setCount('dbNotesCount', NOTES.length);
  }

  function openNoteForm() {
    noteForm = { title: '', body: '', customer: '', tags: '', assignees: '' };
    noteComboOpen = null;
    noteComboSearch = '';
    renderNotes();
    var title = document.getElementById('dbNoteTitle');
    if (title) title.focus();
  }

  function closeNoteForm() {
    noteForm = null;
    noteComboOpen = null;
    noteComboSearch = '';
    renderNotes();
  }

  function syncNoteFormFields() {
    if (!noteForm) return;
    var title = document.getElementById('dbNoteTitle');
    var body = document.getElementById('dbNoteBody');
    if (title) noteForm.title = title.value;
    if (body) noteForm.body = body.value;
  }

  function saveNoteForm() {
    syncNoteFormFields();
    if (!noteForm) return;
    if (!(noteForm.title || noteForm.body)) {
      closeNoteForm();
      return;
    }
    NOTES.unshift({
      title: noteForm.title || 'Untitled',
      body: noteForm.body,
      customer: noteForm.customer,
      tags: noteForm.tags,
      assignees: noteForm.assignees
    });
    closeNoteForm();
  }

  function renderBirthday() {
    var body = document.getElementById('dbBdayBody');
    if (!body) return;
    var rows = bdayMode === 'anniversary' ? ANNIVERSARIES : BIRTHDAYS;
    var head = document.querySelector('#dbBdayTable thead tr');
    if (head && head.children[4]) head.children[4].textContent = bdayMode === 'anniversary' ? 'DOJ' : 'DOB';
    if (!rows.length) {
      body.innerHTML = emptyRow(6);
      setCount('dbBdayCount', 0);
      return;
    }
    body.innerHTML = rows.map(function (r) {
      return '<tr><td>' + esc(r.name) + '</td><td>' + esc(r.mobile) + '</td><td>' + esc(r.email) + '</td><td>' + esc(r.company) +
        '</td><td>' + esc(r.dob) + '</td><td><button type="button" class="db-btn db-btn--teal" style="padding:4px 10px;height:auto">' + esc(r.action) + '</button></td></tr>';
    }).join('');
    setCount('dbBdayCount', rows.length);
  }

  function renderHearings(filter) {
    var body = document.getElementById('dbHearingBody');
    if (!body) return;
    var f = (filter || '').toLowerCase();
    var rows = HEARINGS.filter(function (h) {
      if (!f) return true;
      return (h.client + ' ' + h.name + ' ' + h.caseNo).toLowerCase().indexOf(f) >= 0;
    });
    if (!rows.length) {
      body.innerHTML = emptyRow(8);
      setCount('dbHearingCount', 0);
      return;
    }
    body.innerHTML = rows.map(function (h) {
      return '<tr><td>' + esc(h.caseNo) + '</td><td>' + esc(h.client) + '</td><td>' + esc(h.name) + '</td><td>' + esc(h.court) +
        '</td><td>' + esc(h.next) + '</td><td>' + esc(h.emp) + '</td><td>' + statusBadge(h.status) +
        '</td><td><a class="db-link" href="#">' + esc(h.action) + '</a></td></tr>';
    }).join('');
    setCount('dbHearingCount', rows.length);
  }

  function renderAppointments() {
    var body = document.getElementById('dbApptBody');
    if (!body) return;
    if (!APPOINTMENTS.length) {
      body.innerHTML = emptyRow(9);
      setCount('dbApptCount', 0);
      return;
    }
    body.innerHTML = APPOINTMENTS.map(function (a) {
      return '<tr><td>' + a.sno + '</td><td>' + esc(a.date) + '</td><td>' + esc(a.client) + '</td><td>' + esc(a.partner) +
        '</td><td>' + esc(a.by) + '</td><td>' + esc(a.reason) + '</td><td><a class="db-link" href="#">' + esc(a.link) + '</a></td><td>' +
        statusBadge(a.status) + '</td><td><a class="db-link" href="#">Edit</a></td></tr>';
    }).join('');
    setCount('dbApptCount', APPOINTMENTS.length);
  }

  function syncDateUI() {
    var label = document.getElementById('dbDateLabel');
    var att = document.getElementById('dbAttDate');
    if (label) label.textContent = formatLabel(currentDate);
    if (att) att.textContent = formatDash(currentDate);
  }

  function showTab(tab) {
    document.querySelectorAll('.db-tab').forEach(function (btn) {
      var on = btn.getAttribute('data-tab') === tab;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    var id = SECTION_IDS[tab] || SECTION_IDS.today;
    var el = document.getElementById(id);
    var scroller = document.getElementById('dbScroll');
    if (!el || !scroller) return;
    var top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 8;
    scroller.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  function bind() {
    document.querySelectorAll('.db-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showTab(btn.getAttribute('data-tab'));
      });
    });

    var prev = document.getElementById('dbDatePrev');
    var next = document.getElementById('dbDateNext');
    if (prev) prev.addEventListener('click', function () {
      currentDate.setDate(currentDate.getDate() - 1);
      syncDateUI();
    });
    if (next) next.addEventListener('click', function () {
      currentDate.setDate(currentDate.getDate() + 1);
      syncDateUI();
    });

    var toggle = document.getElementById('dbBdayToggle');
    var toggleLabel = document.getElementById('dbBdayToggleLabel');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var on = toggle.classList.toggle('is-on');
        toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
        bdayMode = on ? 'anniversary' : 'birthday';
        if (toggleLabel) toggleLabel.textContent = on ? 'Anniversary' : 'Birthday';
        renderBirthday();
      });
    }

    var apply = document.getElementById('dbHearingApply');
    var clear = document.getElementById('dbHearingClear');
    var search = document.getElementById('dbHearingSearch');
    if (apply) apply.addEventListener('click', function () {
      renderHearings(search ? search.value : '');
    });
    if (clear) clear.addEventListener('click', function () {
      if (search) search.value = '';
      renderHearings('');
    });

    var noteAdd = document.getElementById('dbNoteAdd');
    if (noteAdd) noteAdd.addEventListener('click', function () {
      showTab('notes');
      openNoteForm();
    });

    document.addEventListener('click', function (e) {
      var comboBtn = e.target.closest('[data-db-note-combo-btn]');
      if (comboBtn) {
        e.preventDefault();
        syncNoteFormFields();
        var field = comboBtn.getAttribute('data-db-note-combo-btn');
        noteComboOpen = (noteComboOpen === field) ? null : field;
        noteComboSearch = '';
        renderNotes();
        if (noteComboOpen) {
          var s = document.querySelector('[data-db-note-combo-search="' + noteComboOpen + '"]');
          if (s) s.focus();
        }
        return;
      }

      var opt = e.target.closest('[data-db-note-opt]');
      if (opt && noteForm) {
        syncNoteFormFields();
        noteForm[opt.getAttribute('data-db-note-opt')] = opt.getAttribute('data-val');
        noteComboOpen = null;
        noteComboSearch = '';
        renderNotes();
        return;
      }

      if (e.target.id === 'dbNoteSave') { saveNoteForm(); return; }
      if (e.target.id === 'dbNoteCancel') { closeNoteForm(); return; }

      if (noteComboOpen && !e.target.closest('.db-note-combo')) {
        syncNoteFormFields();
        noteComboOpen = null;
        noteComboSearch = '';
        renderNotes();
      }
    });

    document.addEventListener('input', function (e) {
      var searchEl = e.target.closest('[data-db-note-combo-search]');
      if (searchEl) {
        noteComboSearch = searchEl.value;
        syncNoteFormFields();
        var field = searchEl.getAttribute('data-db-note-combo-search');
        noteComboOpen = field;
        renderNotes();
        var again = document.querySelector('[data-db-note-combo-search="' + field + '"]');
        if (again) {
          again.focus();
          var val = again.value;
          again.setSelectionRange(val.length, val.length);
        }
      }
    });

    var addAppt = document.getElementById('dbAddAppointment');
    if (addAppt) addAppt.addEventListener('click', function () {
      openApptModal();
    });

    initAppointmentModal();
  }

  function openApptModal() {
    var modal = document.getElementById('dbApptModal');
    if (!modal) return;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var first = document.getElementById('dbApptClient');
    if (first) setTimeout(function () { first.focus(); }, 40);
  }

  function closeApptModal() {
    var modal = document.getElementById('dbApptModal');
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.querySelectorAll('.db-combo.is-open, .db-status-field.is-open').forEach(function (el) {
      el.classList.remove('is-open');
    });
    document.querySelectorAll('.db-combo__list, .db-status-list').forEach(function (el) {
      el.hidden = true;
    });
    closeDtPop();
  }

  /* Ant Design–style date & time picker */
  var dtState = { year: 2026, month: 7, day: 27, h: 10, m: 0, s: 0 };

  function pad2(n) { return n < 10 ? '0' + n : String(n); }

  function formatDtValue() {
    return dtState.year + '-' + pad2(dtState.month + 1) + '-' + pad2(dtState.day) +
      ' ' + pad2(dtState.h) + ':' + pad2(dtState.m) + ':' + pad2(dtState.s);
  }

  function parseDtValue(str) {
    var m = String(str || '').match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/);
    if (!m) return null;
    return {
      year: +m[1], month: +m[2] - 1, day: +m[3],
      h: +m[4], m: +m[5], s: +m[6]
    };
  }

  function setDtFromDate(d) {
    dtState = {
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate(),
      h: d.getHours(),
      m: d.getMinutes(),
      s: d.getSeconds()
    };
  }

  function syncDtInput() {
    var input = document.getElementById('dbApptDate');
    if (input) input.value = formatDtValue();
  }

  function renderDtCal() {
    var cal = document.getElementById('dbDtCal');
    if (!cal) return;
    var first = new Date(dtState.year, dtState.month, 1);
    var startDay = first.getDay();
    var daysInMonth = new Date(dtState.year, dtState.month + 1, 0).getDate();
    var prevDays = new Date(dtState.year, dtState.month, 0).getDate();
    var today = new Date();
    var html = '<div class="db-dt-cal__head">' +
      '<div class="db-dt-cal__nav">' +
        '<button type="button" data-nav="y-prev" aria-label="Previous year">&lt;&lt;</button>' +
        '<button type="button" data-nav="m-prev" aria-label="Previous month">&lt;</button>' +
      '</div>' +
      '<span class="db-dt-cal__label">' + MONTHS[dtState.month] + ' ' + dtState.year + '</span>' +
      '<div class="db-dt-cal__nav">' +
        '<button type="button" data-nav="m-next" aria-label="Next month">&gt;</button>' +
        '<button type="button" data-nav="y-next" aria-label="Next year">&gt;&gt;</button>' +
      '</div>' +
    '</div><div class="db-dt-cal__grid">';
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function (d) {
      html += '<span class="db-dt-cal__dow">' + d + '</span>';
    });
    for (var i = 0; i < startDay; i++) {
      var pd = prevDays - startDay + i + 1;
      html += '<button type="button" class="db-dt-cal__day is-other" data-day="' + pd + '" data-off="-1">' + pd + '</button>';
    }
    for (var d = 1; d <= daysInMonth; d++) {
      var cls = 'db-dt-cal__day';
      if (d === dtState.day) cls += ' is-selected';
      if (d === today.getDate() && dtState.month === today.getMonth() && dtState.year === today.getFullYear()) cls += ' is-today';
      html += '<button type="button" class="' + cls + '" data-day="' + d + '" data-off="0">' + d + '</button>';
    }
    var rem = (startDay + daysInMonth) % 7;
    if (rem) {
      for (var n = 1; n <= 7 - rem; n++) {
        html += '<button type="button" class="db-dt-cal__day is-other" data-day="' + n + '" data-off="1">' + n + '</button>';
      }
    }
    html += '</div>';
    cal.innerHTML = html;
  }

  function renderDtTimeCols() {
    ['dbDtHours', 'dbDtMins', 'dbDtSecs'].forEach(function (id, idx) {
      var col = document.getElementById(id);
      if (!col) return;
      var max = idx === 0 ? 24 : 60;
      var cur = idx === 0 ? dtState.h : idx === 1 ? dtState.m : dtState.s;
      var html = '';
      for (var i = 0; i < max; i++) {
        html += '<button type="button" class="db-dt-time__opt' + (i === cur ? ' is-selected' : '') +
          '" data-val="' + i + '">' + pad2(i) + '</button>';
      }
      col.innerHTML = html;
      var sel = col.querySelector('.is-selected');
      if (sel) {
        sel.scrollIntoView({ block: 'center' });
      }
    });
  }

  function openDtPop() {
    var field = document.getElementById('dbDtField');
    var pop = document.getElementById('dbDtPop');
    var input = document.getElementById('dbApptDate');
    if (!field || !pop) return;
    var parsed = parseDtValue(input && input.value);
    if (parsed) dtState = parsed;
    else setDtFromDate(new Date(2026, 7, 27, 10, 0, 0));
    renderDtCal();
    renderDtTimeCols();
    pop.hidden = false;
    field.classList.add('is-open');
    if (input) input.setAttribute('aria-expanded', 'true');
  }

  function closeDtPop() {
    var field = document.getElementById('dbDtField');
    var pop = document.getElementById('dbDtPop');
    var input = document.getElementById('dbApptDate');
    if (pop) pop.hidden = true;
    if (field) field.classList.remove('is-open');
    if (input) input.setAttribute('aria-expanded', 'false');
  }

  function initDtPicker() {
    var field = document.getElementById('dbDtField');
    var pop = document.getElementById('dbDtPop');
    var input = document.getElementById('dbApptDate');
    if (!field || !pop || !input) return;

    input.addEventListener('click', function (e) {
      e.stopPropagation();
      document.querySelectorAll('.db-combo.is-open').forEach(function (c) {
        c.classList.remove('is-open');
        var ol = c.querySelector('.db-combo__list');
        if (ol) ol.hidden = true;
      });
      var statusField = document.querySelector('.db-status-field.is-open');
      if (statusField) {
        statusField.classList.remove('is-open');
        var sl = document.getElementById('dbApptStatusList');
        if (sl) sl.hidden = true;
      }
      if (pop.hidden) openDtPop();
      else closeDtPop();
    });

    pop.addEventListener('click', function (e) {
      e.stopPropagation();
      var nav = e.target.closest('[data-nav]');
      if (nav) {
        var n = nav.getAttribute('data-nav');
        if (n === 'm-prev') { dtState.month--; if (dtState.month < 0) { dtState.month = 11; dtState.year--; } }
        else if (n === 'm-next') { dtState.month++; if (dtState.month > 11) { dtState.month = 0; dtState.year++; } }
        else if (n === 'y-prev') dtState.year--;
        else if (n === 'y-next') dtState.year++;
        renderDtCal();
        return;
      }
      var dayBtn = e.target.closest('.db-dt-cal__day');
      if (dayBtn) {
        var off = parseInt(dayBtn.getAttribute('data-off'), 10);
        var day = parseInt(dayBtn.getAttribute('data-day'), 10);
        if (off === -1) { dtState.month--; if (dtState.month < 0) { dtState.month = 11; dtState.year--; } }
        else if (off === 1) { dtState.month++; if (dtState.month > 11) { dtState.month = 0; dtState.year++; } }
        dtState.day = day;
        renderDtCal();
        return;
      }
      var tOpt = e.target.closest('.db-dt-time__opt');
      if (tOpt) {
        var col = tOpt.closest('.db-dt-time__col');
        var part = col.getAttribute('data-part');
        var val = parseInt(tOpt.getAttribute('data-val'), 10);
        if (part === 'h') dtState.h = val;
        else if (part === 'm') dtState.m = val;
        else dtState.s = val;
        renderDtTimeCols();
      }
    });

    var nowBtn = document.getElementById('dbDtNow');
    if (nowBtn) {
      nowBtn.addEventListener('click', function () {
        setDtFromDate(new Date());
        renderDtCal();
        renderDtTimeCols();
        syncDtInput();
      });
    }
    var okBtn = document.getElementById('dbDtOk');
    if (okBtn) {
      okBtn.addEventListener('click', function () {
        syncDtInput();
        closeDtPop();
      });
    }

    document.addEventListener('click', function (e) {
      if (pop.hidden) return;
      if (!e.target.closest('#dbDtField')) closeDtPop();
    });
  }

  function initAppointmentModal() {
    var modal = document.getElementById('dbApptModal');
    var form = document.getElementById('dbApptForm');
    if (!modal || !form) return;

    initDtPicker();

    modal.querySelectorAll('[data-db-appt-close]').forEach(function (el) {
      el.addEventListener('click', closeApptModal);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || modal.hidden) return;
      var pop = document.getElementById('dbDtPop');
      if (pop && !pop.hidden) {
        closeDtPop();
        return;
      }
      closeApptModal();
    });

    function setupCombo(root) {
      var input = root.querySelector('.db-combo__input');
      var list = root.querySelector('.db-combo__list');
      if (!input || !list) return;

      function openList() {
        document.querySelectorAll('.db-combo.is-open').forEach(function (other) {
          if (other !== root) {
            other.classList.remove('is-open');
            var ol = other.querySelector('.db-combo__list');
            if (ol) ol.hidden = true;
          }
        });
        var statusField = document.querySelector('.db-status-field.is-open');
        if (statusField) {
          statusField.classList.remove('is-open');
          var sl = document.getElementById('dbApptStatusList');
          if (sl) sl.hidden = true;
        }
        root.classList.add('is-open');
        list.hidden = false;
        input.setAttribute('aria-expanded', 'true');
      }

      function closeList() {
        root.classList.remove('is-open');
        list.hidden = true;
        input.setAttribute('aria-expanded', 'false');
      }

      function filterList() {
        var q = (input.value || '').toLowerCase();
        list.querySelectorAll('li').forEach(function (li) {
          var text = (li.getAttribute('data-value') || li.textContent || '').toLowerCase();
          li.hidden = !!(q && text.indexOf(q) === -1);
        });
      }

      input.addEventListener('focus', function () { openList(); filterList(); });
      input.addEventListener('click', function () { openList(); filterList(); });
      input.addEventListener('input', function () { openList(); filterList(); });

      list.addEventListener('click', function (e) {
        var li = e.target.closest('li');
        if (!li || li.hidden) return;
        input.value = li.getAttribute('data-value') || li.textContent;
        closeList();
      });
    }

    modal.querySelectorAll('.db-combo').forEach(setupCombo);

    var statusBtn = document.getElementById('dbApptStatusBtn');
    var statusText = document.getElementById('dbApptStatusText');
    var statusInput = document.getElementById('dbApptStatus');
    var statusList = document.getElementById('dbApptStatusList');
    var statusField = modal.querySelector('.db-status-field');

    function pillClass(status) {
      if (status === 'Cancelled') return 'db-status-pill db-status-pill--cancelled';
      if (status === 'Completed') return 'db-status-pill db-status-pill--completed';
      return 'db-status-pill db-status-pill--scheduled';
    }

    function setStatus(status) {
      if (!statusInput || !statusText || !statusBtn) return;
      statusInput.value = status;
      statusText.innerHTML = '<span class="' + pillClass(status) + '">' + status + '</span>';
      statusBtn.classList.add('has-value');
      if (statusField) statusField.classList.remove('is-open');
      if (statusList) statusList.hidden = true;
      statusBtn.setAttribute('aria-expanded', 'false');
    }

    if (statusBtn && statusList) {
      statusBtn.addEventListener('click', function () {
        document.querySelectorAll('.db-combo.is-open').forEach(function (c) {
          c.classList.remove('is-open');
          var ol = c.querySelector('.db-combo__list');
          if (ol) ol.hidden = true;
        });
        var open = statusField && statusField.classList.toggle('is-open');
        statusList.hidden = !open;
        statusBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      statusList.addEventListener('click', function (e) {
        var pill = e.target.closest('[data-status]');
        if (!pill) return;
        setStatus(pill.getAttribute('data-status'));
      });
    }

    document.addEventListener('click', function (e) {
      if (modal.hidden) return;
      if (!e.target.closest('.db-combo') && !e.target.closest('.db-status-field')) {
        document.querySelectorAll('.db-combo.is-open').forEach(function (c) {
          c.classList.remove('is-open');
          var ol = c.querySelector('.db-combo__list');
          if (ol) ol.hidden = true;
        });
        if (statusField) statusField.classList.remove('is-open');
        if (statusList) statusList.hidden = true;
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var client = (document.getElementById('dbApptClient') || {}).value || '';
      var employee = (document.getElementById('dbApptEmployee') || {}).value || '';
      var date = (document.getElementById('dbApptDate') || {}).value || '';
      var status = (document.getElementById('dbApptStatus') || {}).value || '';
      if (!client || !employee || !date || !status) {
        if (window.DashboardShell && DashboardShell.toast) {
          DashboardShell.toast('Missing fields', 'Client, Employee, Date & time, and Status are required.');
        }
        return;
      }
      APPOINTMENTS.unshift({
        sno: APPOINTMENTS.length + 1,
        date: date,
        client: client,
        partner: employee,
        by: 'Admin',
        reason: (document.getElementById('dbApptReason') || {}).value || '--',
        link: (document.getElementById('dbApptLink') || {}).value || 'View',
        status: status === 'Scheduled' ? 'Approved' : status
      });
      APPOINTMENTS.forEach(function (a, i) { a.sno = i + 1; });
      renderAppointments();
      closeApptModal();
      form.reset();
      setStatus('Scheduled');
      var dateEl = document.getElementById('dbApptDate');
      if (dateEl) dateEl.value = '';
      if (window.DashboardShell && DashboardShell.toast) {
        DashboardShell.toast('Appointment created', 'Saved for ' + client);
      }
      showTab('appointment');
    });
  }

  /* Ensure all sections visible */
  Object.keys(SECTION_IDS).forEach(function (key) {
    var el = document.getElementById(SECTION_IDS[key]);
    if (el) el.hidden = false;
  });

  syncDateUI();
  renderTasks();
  renderNotes();
  renderBirthday();
  renderHearings('');
  renderAppointments();
  bind();
})();
