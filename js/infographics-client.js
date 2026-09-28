(function () {
  'use strict';

  var ICO_USER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3.5"/><path d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/></svg>';
  var ICO_PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 3h3l1.5 4-2 1.5a12 12 0 005 5L16 12l4 1.5V17a2 2 0 01-2 2A14 14 0 015 5a2 2 0 012-2z"/></svg>';
  var ICO_MAIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';

  function svgThumb(bg, emoji) {
    return 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="' + bg[0] + '"/><stop offset="100%" stop-color="' + bg[1] + '"/></linearGradient></defs>' +
      '<rect width="480" height="480" fill="url(#g)"/>' +
      '<text x="240" y="265" text-anchor="middle" font-size="110">' + emoji + '</text></svg>'
    );
  }

  var FALLBACK = [
    { id: 'c1', title: 'Raksha bandhan', category: 'Festival', image: svgThumb(['#fce7f3', '#fda4af'], '🎀') },
    { id: 'c2', title: 'Raksha bandhan', category: 'Festival', image: svgThumb(['#dbeafe', '#93c5fd'], '👫') },
    { id: 'c3', title: 'Holi', category: 'Festival', image: svgThumb(['#fef3c7', '#f472b6'], '🎨') },
    { id: 'c4', title: 'Holi', category: 'Festival', image: svgThumb(['#dcfce7', '#fbbf24'], '🌈') },
    { id: 'c5', title: 'Mahavir Jayanti', category: 'Celebration', image: svgThumb(['#fef9c3', '#fde68a'], '🙏') },
    { id: 'c6', title: 'Happy Hindi Diwas', category: 'Celebration', image: svgThumb(['#ffedd5', '#fb923c'], '📜') },
    { id: 'c7', title: 'Happy Republic Day', category: 'Celebration', image: svgThumb(['#ffedd5', '#22c55e'], '🇮🇳') }
  ];

  function loadAdminItems() {
    try {
      var raw = localStorage.getItem('iga_infographics_v1');
      var list = raw ? JSON.parse(raw) : [];
      if (list && list.length) {
        return list.map(function (it) {
          return {
            id: it.id,
            title: it.title,
            category: it.category || 'Festival',
            image: it.image || ''
          };
        });
      }
    } catch (e) { /* ignore */ }
    return FALLBACK.slice();
  }

  var templates = loadAdminItems();
  var filter = { q: '', cat: 'None' };

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, '&#39;');
  }

  function categories() {
    var map = {};
    templates.forEach(function (t) {
      if (t.category) map[t.category] = true;
    });
    return Object.keys(map).sort();
  }

  function fillCats() {
    var select = document.getElementById('igcCategory');
    if (!select) return;
    select.innerHTML = '<option value="None">None</option>' + categories().map(function (c) {
      return '<option value="' + escapeAttr(c) + '">' + escapeHtml(c) + '</option>';
    }).join('');
    select.value = filter.cat;
  }

  function tagClass(cat) {
    var c = (cat || '').toLowerCase();
    if (c === 'celebration') return 'igc-card__tag igc-card__tag--celebration';
    if (c === 'compliance') return 'igc-card__tag igc-card__tag--compliance';
    if (c === 'business') return 'igc-card__tag igc-card__tag--business';
    return 'igc-card__tag';
  }

  function filtered() {
    var q = (filter.q || '').toLowerCase();
    var cat = filter.cat !== 'None' ? filter.cat : '';
    return templates.filter(function (t) {
      if (cat && t.category !== cat) return false;
      if (q && (t.title || '').toLowerCase().indexOf(q) === -1 && (t.category || '').toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
  }

  function render() {
    var grid = document.getElementById('igcGrid');
    var count = document.getElementById('igcPageCount');
    if (!grid) return;
    var list = filtered();
    if (count) count.textContent = 'Showing Page: 1 of 1';
    if (!list.length) {
      grid.innerHTML = '<p class="igc-empty">No templates found.</p>';
      return;
    }
    grid.innerHTML = list.map(function (t, i) {
      var href = 'infographics_editor.html?id=' + encodeURIComponent(t.id || i) + '&from=client';
      var artStyle = t.image ? ' style="background-image:url(\'' + escapeAttr(t.image) + '\')"' : '';
      return '<a class="igc-card" href="' + href + '">' +
        '<div class="igc-card__art"' + artStyle + '>' +
        (t.image ? '' : '<span>' + escapeHtml((t.title || 'IG').charAt(0)) + '</span>') +
        '</div>' +
        '<div class="igc-card__brand">' +
        '<div class="igc-card__logo">YOUR<br>LOGO<br>HERE</div>' +
        '<div class="igc-card__meta">' +
        '<div class="igc-card__meta-row">' + ICO_USER + '<span>Your Name</span></div>' +
        '<div class="igc-card__meta-row">' + ICO_PHONE + '<span>Your Phone</span></div>' +
        '<div class="igc-card__meta-row">' + ICO_MAIL + '<span>Your Email</span></div>' +
        '</div></div>' +
        '<div class="igc-card__foot"><span class="' + tagClass(t.category) + '">' +
        escapeHtml((t.category || 'Festival').toUpperCase()) + '</span></div>' +
        '</a>';
    }).join('');
  }

  function applyFilters() {
    var search = document.getElementById('igcSearch');
    var cat = document.getElementById('igcCategory');
    filter.q = search ? search.value.trim() : '';
    filter.cat = cat ? cat.value : 'None';
    render();
  }

  fillCats();
  render();

  var search = document.getElementById('igcSearch');
  var searchBtn = document.getElementById('igcSearchBtn');
  var filterBtn = document.getElementById('igcFilterSearch');
  var cat = document.getElementById('igcCategory');

  if (search) {
    search.addEventListener('input', applyFilters);
    search.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); applyFilters(); }
    });
  }
  if (searchBtn) searchBtn.addEventListener('click', applyFilters);
  if (filterBtn) filterBtn.addEventListener('click', applyFilters);
  if (cat) cat.addEventListener('change', applyFilters);
})();
