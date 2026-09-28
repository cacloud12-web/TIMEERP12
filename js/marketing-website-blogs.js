(function () {
  'use strict';

  var LS_TAGS = 'mwb_tags';
  var LS_CATS = 'mwb_categories';
  var LS_BLOGS = 'mwb_blogs';

  function getTags() { try { return JSON.parse(localStorage.getItem(LS_TAGS) || '[]'); } catch (e) { return []; } }
  function getCats() { try { return JSON.parse(localStorage.getItem(LS_CATS) || '[]'); } catch (e) { return []; } }
  function getBlogs() { try { return JSON.parse(localStorage.getItem(LS_BLOGS) || '[]'); } catch (e) { return []; } }
  function setTags(v) { localStorage.setItem(LS_TAGS, JSON.stringify(v)); }
  function setCats(v) { localStorage.setItem(LS_CATS, JSON.stringify(v)); }
  function setBlogs(v) { localStorage.setItem(LS_BLOGS, JSON.stringify(v)); }

  var LS_BLOGS_SEEDED = 'mwb_blogs_seeded_v1';
  var DUMMY_BLOGS = [
    {
      title: '5 GST Mistakes SMEs Still Make',
      slug: '5-gst-mistakes-smes',
      shortDesc: 'Common filing errors and how to avoid notices.',
      trending: true,
      createdAt: '12 Aug 2026'
    },
    {
      title: 'Income Tax Planning Before Year-End',
      slug: 'income-tax-planning-year-end',
      shortDesc: 'Practical steps for professionals and businesses.',
      trending: true,
      createdAt: '28 Jul 2026'
    },
    {
      title: 'Company Incorporation Checklist 2026',
      slug: 'company-incorporation-checklist-2026',
      shortDesc: 'Documents, timelines and compliance after setup.',
      trending: false,
      createdAt: '15 Jun 2026'
    },
    {
      title: 'Why Bookkeeping Matters for Startups',
      slug: 'why-bookkeeping-matters-startups',
      shortDesc: 'Clean books help fundraising and audits.',
      trending: false,
      createdAt: '02 May 2026'
    },
    {
      title: 'TDS Deadlines You Should Not Miss',
      slug: 'tds-deadlines-you-should-not-miss',
      shortDesc: 'A quick calendar of return and payment dates.',
      trending: true,
      createdAt: '18 Apr 2026'
    }
  ];

  if (localStorage.getItem(LS_BLOGS_SEEDED) !== '1') {
    if (!getBlogs().length) setBlogs(DUMMY_BLOGS);
    localStorage.setItem(LS_BLOGS_SEEDED, '1');
  }

  var clock = document.getElementById('mwbTopClock');
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

  function renderTable() {
    var blogs = getBlogs();
    var body = document.getElementById('mwbTableBody');
    var wrap = document.getElementById('mwbTableWrap');
    var count = document.getElementById('mwbCount');
    if (!body) return;
    body.innerHTML = blogs.map(function (b, i) {
      return '<tr><td>' + b.title + '</td><td>' + (b.shortDesc || '—') + '</td><td>' + b.createdAt + '</td><td>' +
        (b.trending ? 'Yes' : 'No') + '</td><td><button type="button" class="mwb-del" data-i="' + i + '">Delete</button></td></tr>';
    }).join('');
    if (wrap) wrap.classList.toggle('has-rows', blogs.length > 0);
    if (count) count.textContent = blogs.length + ' / ' + blogs.length;
    body.querySelectorAll('.mwb-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var list = getBlogs();
        list.splice(Number(btn.getAttribute('data-i')), 1);
        setBlogs(list);
        renderTable();
      });
    });
  }

  var addBtn = document.getElementById('mwbAddBtn');
  var addMenu = document.getElementById('mwbAddMenu');
  if (addBtn && addMenu) {
    addBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (addMenu.hasAttribute('hidden')) addMenu.removeAttribute('hidden');
      else addMenu.setAttribute('hidden', '');
    });
    addMenu.querySelectorAll('button[data-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        addMenu.setAttribute('hidden', '');
        if (btn.getAttribute('data-action') === 'tag') openModal('mwbTagModal');
        if (btn.getAttribute('data-action') === 'category') openModal('mwbCatModal');
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.mwb-add-wrap')) addMenu.setAttribute('hidden', '');
    });
  }

  function openModal(id) { document.getElementById(id).removeAttribute('hidden'); }
  function closeModal(id) { document.getElementById(id).setAttribute('hidden', ''); }

  document.querySelectorAll('[data-close]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      closeModal(btn.getAttribute('data-close') === 'tag' ? 'mwbTagModal' : 'mwbCatModal');
    });
  });
  document.querySelectorAll('.mwb-modal-scrim').forEach(function (scrim) {
    scrim.addEventListener('click', function (e) { if (e.target === scrim) scrim.setAttribute('hidden', ''); });
  });

  document.getElementById('mwbTagForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var val = document.getElementById('mwbTagInput').value.trim();
    if (!val) return;
    var tags = getTags();
    if (tags.indexOf(val) === -1) tags.push(val);
    setTags(tags);
    document.getElementById('mwbTagForm').reset();
    closeModal('mwbTagModal');
    toast('Tag', val + ' added.');
  });

  document.getElementById('mwbCatForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var val = document.getElementById('mwbCatInput').value.trim();
    if (!val) return;
    var cats = getCats();
    if (cats.indexOf(val) === -1) cats.push(val);
    setCats(cats);
    document.getElementById('mwbCatForm').reset();
    closeModal('mwbCatModal');
    toast('Category', val + ' added.');
  });

  renderTable();
})();
