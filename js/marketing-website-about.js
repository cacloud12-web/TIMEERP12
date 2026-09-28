(function () {
  'use strict';

  var LS = {
    about: 'mwa_about',
    whyUs: 'mwa_why_us',
    mission: 'mwa_mission_vision',
    team: 'mwa_team_members'
  };

  var team = [];

  var clock = document.getElementById('mwaTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  function toast(title, body) {
    if (window.DashboardShell) DashboardShell.toast(title, body);
  }

  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }

  function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function setTab(tab) {
    document.querySelectorAll('.mwa-tab').forEach(function (t) {
      var active = t.getAttribute('data-tab') === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.querySelectorAll('.mwa-tab-panel').forEach(function (p) {
      var active = p.getAttribute('data-panel') === tab;
      if (active) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
    });
  }

  document.querySelectorAll('.mwa-tab').forEach(function (tab) {
    tab.addEventListener('click', function () { setTab(tab.getAttribute('data-tab')); });
  });

  function bindUpload(btnSel, inputId) {
    document.querySelectorAll(btnSel).forEach(function (btn) {
      var input = document.getElementById(inputId);
      if (!input) return;
      btn.addEventListener('click', function () { input.click(); });
    });
  }
  bindUpload('[data-upload="about"]', 'mwaAboutImage');
  bindUpload('[data-upload="member"]', 'mwaMemberImage');

  var aboutData = load(LS.about, { heading: '', description: '', image: '' });
  var aboutHeading = document.getElementById('mwaAboutHeading');
  var aboutDesc = document.getElementById('mwaAboutDesc');
  if (aboutHeading) aboutHeading.value = aboutData.heading || '';
  if (aboutDesc) aboutDesc.value = aboutData.description || '';

  var aboutForm = document.getElementById('mwaAboutForm');
  if (aboutForm) {
    aboutForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!aboutHeading.value.trim()) { toast('About Us', 'Heading is required.'); return; }
      save(LS.about, {
        heading: aboutHeading.value.trim(),
        description: aboutDesc.value.trim(),
        image: aboutData.image || ''
      });
      toast('About Us', 'About section saved.');
    });
  }

  var aboutImage = document.getElementById('mwaAboutImage');
  if (aboutImage) {
    aboutImage.addEventListener('change', function () {
      var file = aboutImage.files && aboutImage.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        aboutData.image = reader.result;
        save(LS.about, {
          heading: aboutHeading ? aboutHeading.value.trim() : '',
          description: aboutDesc ? aboutDesc.value.trim() : '',
          image: aboutData.image
        });
        toast('About Us', 'Image uploaded.');
      };
      reader.readAsDataURL(file);
    });
  }

  var whyData = load(LS.whyUs, { heading: '', points: [{ point: '', desc: '' }, { point: '', desc: '' }, { point: '', desc: '' }, { point: '', desc: '' }] });
  var whyHeading = document.getElementById('mwaWhyHeading');
  if (whyHeading) whyHeading.value = whyData.heading || '';
  for (var i = 1; i <= 4; i++) {
    var pt = document.getElementById('mwaWhyPoint' + i);
    var ds = document.getElementById('mwaWhyDesc' + i);
    var row = whyData.points[i - 1] || { point: '', desc: '' };
    if (pt) pt.value = row.point || '';
    if (ds) ds.value = row.desc || '';
  }

  var whyForm = document.getElementById('mwaWhyForm');
  if (whyForm) {
    whyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!whyHeading.value.trim()) { toast('Why Us', 'Heading is required.'); return; }
      var points = [];
      for (var j = 1; j <= 4; j++) {
        var p = document.getElementById('mwaWhyPoint' + j);
        var d = document.getElementById('mwaWhyDesc' + j);
        if (!p.value.trim() || !d.value.trim()) { toast('Why Us', 'All points and descriptions are required.'); return; }
        points.push({ point: p.value.trim(), desc: d.value.trim() });
      }
      save(LS.whyUs, { heading: whyHeading.value.trim(), points: points });
      toast('Why Us', 'Why Us section saved.');
    });
  }

  var mvData = load(LS.mission, { missionHeading: '', missionDesc: '', visionHeading: '', visionDesc: '' });
  var mvMap = {
    mwaMissionHeading: 'missionHeading', mwaMissionDesc: 'missionDesc',
    mwaVisionHeading: 'visionHeading', mwaVisionDesc: 'visionDesc'
  };
  Object.keys(mvMap).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.value = mvData[mvMap[id]] || '';
  });

  var mvForm = document.getElementById('mwaMissionForm');
  if (mvForm) {
    mvForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var mh = document.getElementById('mwaMissionHeading');
      var vh = document.getElementById('mwaVisionHeading');
      if (!mh.value.trim() || !vh.value.trim()) { toast('Mission & Vision', 'Headings are required.'); return; }
      save(LS.mission, {
        missionHeading: mh.value.trim(),
        missionDesc: document.getElementById('mwaMissionDesc').value.trim(),
        visionHeading: vh.value.trim(),
        visionDesc: document.getElementById('mwaVisionDesc').value.trim()
      });
      toast('Mission & Vision', 'Mission and vision saved.');
    });
  }

  team = load(LS.team, []);

  var LS_TEAM_SEEDED = 'mwa_team_seeded_v1';
  var DUMMY_TEAM = [
    {
      name: 'Priya Sharma',
      designation: 'Managing Partner',
      image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect width="72" height="72" fill="#25b7a7"/><text x="36" y="42" text-anchor="middle" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="24" font-weight="600">PS</text></svg>'),
      isLead: true
    },
    {
      name: 'Amit Verma',
      designation: 'Senior Tax Consultant',
      image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect width="72" height="72" fill="#3aa0cb"/><text x="36" y="42" text-anchor="middle" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="24" font-weight="600">AV</text></svg>'),
      isLead: false
    },
    {
      name: 'Neha Gupta',
      designation: 'Audit Manager',
      image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect width="72" height="72" fill="#5eb5d9"/><text x="36" y="42" text-anchor="middle" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="24" font-weight="600">NG</text></svg>'),
      isLead: false
    },
    {
      name: 'Rahul Mehta',
      designation: 'Company Secretary',
      image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect width="72" height="72" fill="#1fa396"/><text x="36" y="42" text-anchor="middle" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="24" font-weight="600">RM</text></svg>'),
      isLead: false
    },
    {
      name: 'Sneha Kapoor',
      designation: 'Client Relationship Lead',
      image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect width="72" height="72" fill="#243F64"/><text x="36" y="42" text-anchor="middle" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="24" font-weight="600">SK</text></svg>'),
      isLead: false
    }
  ];

  if (localStorage.getItem(LS_TEAM_SEEDED) !== '1') {
    if (!team.length) {
      team = DUMMY_TEAM.slice();
      save(LS.team, team);
    }
    localStorage.setItem(LS_TEAM_SEEDED, '1');
  }

  function renderTeam() {
    var body = document.getElementById('mwaTeamBody');
    var wrap = document.getElementById('mwaTeamWrap');
    if (!body || !wrap) return;
    body.innerHTML = '';
    team.forEach(function (m, idx) {
      var tr = document.createElement('tr');
      var imgHtml = m.image
        ? '<img class="mwa-thumb" src="' + m.image + '" alt="">'
        : '<span class="mwa-thumb"></span>';
      tr.innerHTML =
        '<td>' + escapeHtml(m.name) + '</td>' +
        '<td>' + escapeHtml(m.designation) + '</td>' +
        '<td>' + imgHtml + '</td>' +
        '<td><button type="button" class="mwa-del" data-idx="' + idx + '">Delete</button></td>';
      body.appendChild(tr);
    });
    wrap.classList.toggle('has-rows', team.length > 0);
    body.querySelectorAll('.mwa-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        team.splice(Number(btn.getAttribute('data-idx')), 1);
        save(LS.team, team);
        renderTeam();
        toast('Team', 'Member removed.');
      });
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  renderTeam();

  var memberModal = document.getElementById('mwaMemberModal');
  var memberForm = document.getElementById('mwaMemberForm');
  var memberImageInput = document.getElementById('mwaMemberImage');
  var pendingImage = '';

  function openMemberModal() {
    if (!memberModal) return;
    memberModal.removeAttribute('hidden');
    pendingImage = '';
    if (memberForm) memberForm.reset();
  }

  function closeMemberModal() {
    if (memberModal) memberModal.setAttribute('hidden', '');
    pendingImage = '';
  }

  var addBtn = document.getElementById('mwaAddMemberBtn');
  if (addBtn) addBtn.addEventListener('click', openMemberModal);

  document.querySelectorAll('[data-close="member"]').forEach(function (btn) {
    btn.addEventListener('click', closeMemberModal);
  });
  if (memberModal) {
    memberModal.addEventListener('click', function (e) {
      if (e.target === memberModal) closeMemberModal();
    });
  }

  if (memberImageInput) {
    memberImageInput.addEventListener('change', function () {
      var file = memberImageInput.files && memberImageInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () { pendingImage = reader.result; };
      reader.readAsDataURL(file);
    });
  }

  if (memberForm) {
    memberForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('mwaMemberName');
      var desig = document.getElementById('mwaMemberDesig');
      var lead = document.getElementById('mwaMemberLead');
      if (!name.value.trim() || !desig.value.trim()) {
        toast('Add Member', 'Name and designation are required.');
        return;
      }
      team.push({
        name: name.value.trim(),
        designation: desig.value.trim(),
        image: pendingImage,
        isLead: lead && lead.checked
      });
      save(LS.team, team);
      renderTeam();
      closeMemberModal();
      toast('Team', 'Member added.');
    });
  }
})();
