(function () {
  'use strict';

  var LS_TAGS = 'mwb_tags';
  var LS_CATS = 'mwb_categories';
  var LS_BLOGS = 'mwb_blogs';

  function getTags() { try { return JSON.parse(localStorage.getItem(LS_TAGS) || '[]'); } catch (e) { return []; } }
  function getCats() { try { return JSON.parse(localStorage.getItem(LS_CATS) || '[]'); } catch (e) { return []; } }
  function getBlogs() { try { return JSON.parse(localStorage.getItem(LS_BLOGS) || '[]'); } catch (e) { return []; } }
  function setBlogs(v) { localStorage.setItem(LS_BLOGS, JSON.stringify(v)); }

  var selectedTags = [];
  var rte = document.getElementById('mwbaContent');
  var wordCount = document.getElementById('mwbaWordCount');

  var clock = document.getElementById('mwbaTopClock');
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

  function updateWordCount() {
    if (!wordCount || !rte) return;
    var text = (rte.textContent || '').trim();
    var n = text ? text.split(/\s+/).length : 0;
    wordCount.textContent = n + ' word' + (n === 1 ? '' : 's');
  }

  if (rte) {
    rte.addEventListener('input', updateWordCount);
    document.querySelectorAll('.mwba-rte__bar button[data-cmd]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cmd = btn.getAttribute('data-cmd');
        if (cmd === 'foreColor') document.execCommand('foreColor', false, '#25b7a7');
        else document.execCommand(cmd, false, null);
        rte.focus();
        updateWordCount();
      });
    });
  }

  document.getElementById('mwbaTitle').addEventListener('input', function () {
    var slug = document.getElementById('mwbaSlug');
    if (slug && !slug.dataset.touched) {
      slug.value = this.value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
  });
  document.getElementById('mwbaSlug').addEventListener('input', function () {
    this.dataset.touched = '1';
  });

  var catSelect = document.getElementById('mwbaCategory');
  getCats().forEach(function (c) {
    var opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    catSelect.appendChild(opt);
  });

  function renderTagsList() {
    document.getElementById('mwbaTagsList').innerHTML = selectedTags.map(function (t, i) {
      return '<span class="mwba-tag">' + t + '<button type="button" data-i="' + i + '">&times;</button></span>';
    }).join('');
    document.querySelectorAll('.mwba-tag button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectedTags.splice(Number(btn.getAttribute('data-i')), 1);
        renderTagsList();
      });
    });
  }

  var combo = document.getElementById('mwbaTagsCombo');
  var tagsInput = document.getElementById('mwbaTagsInput');
  var tagsMenu = document.getElementById('mwbaTagsMenu');

  function renderTagsMenu(q) {
    var qq = (q || '').toLowerCase();
    var available = getTags().filter(function (t) {
      return selectedTags.indexOf(t) === -1 && (!qq || t.toLowerCase().indexOf(qq) !== -1);
    });
    tagsMenu.innerHTML = available.map(function (t) {
      return '<div class="mwba-combo__item">' + t + '</div>';
    }).join('') || '<div class="mwba-combo__item">No tags</div>';
  }

  function openTags() { renderTagsMenu(tagsInput.value); combo.classList.add('is-open'); }
  tagsInput.addEventListener('focus', openTags);
  tagsInput.addEventListener('click', function (e) { e.stopPropagation(); openTags(); });
  tagsInput.addEventListener('input', openTags);
  tagsMenu.addEventListener('mousedown', function (e) {
    var item = e.target.closest('.mwba-combo__item');
    if (!item || item.textContent.trim() === 'No tags') return;
    e.preventDefault();
    var t = item.textContent.trim();
    if (selectedTags.indexOf(t) === -1) selectedTags.push(t);
    tagsInput.value = '';
    combo.classList.remove('is-open');
    renderTagsList();
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mwba-combo')) combo.classList.remove('is-open');
  });

  document.getElementById('mwbaUploadBtn').addEventListener('click', function () {
    document.getElementById('mwbaImage').click();
  });
  document.getElementById('mwbaImage').addEventListener('change', function () {
    var span = document.querySelector('#mwbaUploadBtn span');
    if (span) span.textContent = this.files && this.files[0] ? this.files[0].name : 'Click to Upload';
  });

  document.getElementById('mwbaForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var title = document.getElementById('mwbaTitle').value.trim();
    var slug = document.getElementById('mwbaSlug').value.trim();
    if (!title || !slug) { toast('Required', 'Title and Slug are required.'); return; }
    var blogs = getBlogs();
    blogs.unshift({
      title: title,
      slug: slug,
      shortDesc: document.getElementById('mwbaShortDesc').value.trim(),
      content: rte ? rte.innerHTML : '',
      trending: document.getElementById('mwbaTrending').checked,
      category: document.getElementById('mwbaCategory').value,
      tags: selectedTags.slice(),
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    });
    setBlogs(blogs);
    toast('Saved', 'Blog saved successfully.');
    window.location.href = 'marketing_website_blogs.html';
  });
})();
