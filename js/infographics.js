(function () {
  'use strict';

  var TEMPLATES = window.IG_TEMPLATES || [];

  var grid = document.getElementById('igTemplateGrid');
  var countEl = document.getElementById('igTemplateCount');
  var categorySelect = document.getElementById('igCategoryFilter');
  var searchInput = document.getElementById('igSearch');
  var searchBtn = document.getElementById('igSearchBtn');

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function tagClass(cat) {
    if (cat === 'Compliance') return 'ig-tag ig-tag--compliance';
    if (cat === 'Business') return 'ig-tag ig-tag--business';
    if (cat === 'HR') return 'ig-tag ig-tag--hr';
    if (cat === 'Operations') return 'ig-tag ig-tag--ops';
    return 'ig-tag';
  }


  function getFiltered() {
    var q = (searchInput && searchInput.value.trim().toLowerCase()) || '';
    var cat = categorySelect && categorySelect.value !== 'None' ? categorySelect.value : '';
    return TEMPLATES.map(function (t, i) { return { t: t, idx: i }; }).filter(function (row) {
      if (cat && row.t.category !== cat) return false;
      if (q && row.t.name.toLowerCase().indexOf(q) === -1 && row.t.category.toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
  }

  function render() {
    var list = getFiltered();
    if (!grid) return;
    grid.innerHTML = list.map(function (row) {
      var t = row.t, idx = row.idx;
      return '<article class="ig-template">' +
        '<div class="ig-template__thumb"><span class="ig-template__emoji">' + t.emoji + '</span>' +
        '<span class="ig-template__label">' + escapeHtml(t.name) + '</span></div>' +
        '<div class="ig-template__body"><span class="' + tagClass(t.category) + '">' + escapeHtml(t.category.toUpperCase()) + '</span>' +
        '<div class="ig-template__name">' + escapeHtml(t.name) + '</div>' +
        '<a class="ig-select" href="infographics_editor.html?id=' + idx + '">Select</a></div></article>';
    }).join('');
    if (countEl) countEl.textContent = 'Showing ' + list.length + ' template' + (list.length === 1 ? '' : 's');
  }

  if (categorySelect) categorySelect.addEventListener('change', render);
  if (searchInput) searchInput.addEventListener('input', render);
  if (searchBtn) searchBtn.addEventListener('click', render);
  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); render(); }
    });
  }

  document.getElementById('igLearnMore') && document.getElementById('igLearnMore').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('igWhy') && document.getElementById('igWhy').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('igGetStarted') && document.getElementById('igGetStarted').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('igGallery') && document.getElementById('igGallery').scrollIntoView({ behavior: 'smooth' });
  });

  render();
})();
