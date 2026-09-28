(function () {
  'use strict';

  var LS_ITEMS = 'iga_infographics_v1';
  var LS_CATS = 'iga_categories_v1';
  var LS_SEEDED = 'iga_seeded_v1';

  var DEFAULT_CATS = ['Festival', 'Celebration', 'Compliance', 'Business', 'HR'];

  function svgThumb(bg, emoji) {
    return 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="432" height="540">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="' + bg[0] + '"/><stop offset="100%" stop-color="' + bg[1] + '"/></linearGradient></defs>' +
      '<rect width="432" height="540" fill="url(#g)"/>' +
      '<text x="216" y="290" text-anchor="middle" font-size="96">' + emoji + '</text></svg>'
    );
  }

  var DUMMY = [
    { id: '1', title: 'Raksha bandhan', desc: '.', category: 'Festival', image: svgThumb(['#fce7f3', '#fda4af'], '🎀') },
    { id: '2', title: 'Raksha bandhan', desc: '.', category: 'Festival', image: svgThumb(['#dbeafe', '#93c5fd'], '👫') },
    { id: '3', title: 'Holi', desc: 'festival of happiness and joy', category: 'Festival', image: svgThumb(['#fef3c7', '#f472b6'], '🎨') },
    { id: '4', title: 'Holi', desc: 'festival of colours', category: 'Festival', image: svgThumb(['#dcfce7', '#fbbf24'], '🌈') },
    { id: '5', title: 'Mahavir Jayanti', desc: '.', category: 'Celebration', image: svgThumb(['#fef9c3', '#fde68a'], '🙏') },
    { id: '6', title: 'Happy Hindi Diwas', desc: 'Celebrate Hindi Diwas', category: 'Celebration', image: svgThumb(['#ffedd5', '#fb923c'], '📜') },
    { id: '7', title: 'Happy Republic Day', desc: 'Jai Hind', category: 'Celebration', image: svgThumb(['#ffedd5', '#22c55e'], '🇮🇳') }
  ];

  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

  if (localStorage.getItem(LS_SEEDED) !== '1') {
    if (!load(LS_ITEMS, []).length) save(LS_ITEMS, DUMMY);
    if (!load(LS_CATS, []).length) save(LS_CATS, DEFAULT_CATS);
    localStorage.setItem(LS_SEEDED, '1');
  }

  var items = load(LS_ITEMS, DUMMY.slice());
  var cats = load(LS_CATS, DEFAULT_CATS.slice());
  var pendingImage = '';
  var filter = { desc: '', cat: '' };
  var editingId = null;

  function toast(msg) {
    var el = document.getElementById('igaToast');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.hidden = true; }, 2200);
  }

  function uid() {
    return String(Date.now()) + Math.random().toString(16).slice(2, 6);
  }

  function fillCatSelects() {
    var upload = document.getElementById('igaCategory');
    var search = document.getElementById('igaSearchCat');
    var edit = document.getElementById('igaEditCategory');
    var opts = cats.map(function (c) {
      return '<option value="' + escapeAttr(c) + '">' + escapeHtml(c) + '</option>';
    }).join('');
    if (upload) {
      upload.innerHTML = '<option value="">Select...</option>' + opts;
    }
    if (search) {
      search.innerHTML = '<option value="">Search by Categories</option>' + opts;
      search.value = filter.cat;
    }
    if (edit) {
      edit.innerHTML = '<option value="">Select...</option>' + opts;
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, '&#39;');
  }

  function filteredItems() {
    var q = (filter.desc || '').toLowerCase();
    var cat = filter.cat || '';
    return items.filter(function (it) {
      var hay = ((it.title || '') + ' ' + (it.desc || '')).toLowerCase();
      if (q && hay.indexOf(q) === -1) return false;
      if (cat && it.category !== cat) return false;
      return true;
    });
  }

  function renderCards() {
    var root = document.getElementById('igaCards');
    if (!root) return;
    var list = filteredItems();
    if (!list.length) {
      root.innerHTML = '<p class="iga-empty">No infographics found.</p>';
      return;
    }
    root.innerHTML = list.map(function (it) {
      var bg = it.image
        ? 'style="background-image:url(\'' + escapeAttr(it.image) + '\')"'
        : '';
      return '<article class="iga-card" data-id="' + escapeAttr(it.id) + '">' +
        '<div class="iga-card__img" ' + bg + '></div>' +
        '<div class="iga-card__body">' +
        '<div class="iga-card__title">' + escapeHtml(it.title) + '</div>' +
        '<div class="iga-card__desc">' + escapeHtml(it.desc || '.') + '</div>' +
        '<div class="iga-card__cat">' + escapeHtml(it.category || '') + '</div>' +
        '<div class="iga-card__actions">' +
        '<button type="button" class="iga-card__edit" data-edit="' + escapeAttr(it.id) + '">Edit</button>' +
        '<button type="button" class="iga-card__del" data-del="' + escapeAttr(it.id) + '">Delete</button>' +
        '</div></div></article>';
    }).join('');
  }

  function renderCatList() {
    var list = document.getElementById('igaCatList');
    if (!list) return;
    list.innerHTML = cats.map(function (c, i) {
      return '<li><span>' + escapeHtml(c) + '</span>' +
        '<button type="button" data-cat-del="' + i + '">Delete</button></li>';
    }).join('');
  }

  function setView(name) {
    document.querySelectorAll('.iga-nav__link[data-view]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-view') === name);
    });
    document.querySelectorAll('.iga-view').forEach(function (panel) {
      var on = panel.getAttribute('data-panel') === name;
      if (on) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
      panel.classList.toggle('is-active', on);
    });
  }

  document.querySelectorAll('.iga-nav__link[data-view]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setView(btn.getAttribute('data-view'));
    });
  });

  var drop = document.getElementById('igaDrop');
  var fileInput = document.getElementById('igaFile');
  var dropPreview = document.getElementById('igaDropPreview');

  function setPreview(dataUrl) {
    pendingImage = dataUrl || '';
    if (!drop || !dropPreview) return;
    if (pendingImage) {
      dropPreview.style.backgroundImage = 'url(' + pendingImage + ')';
      dropPreview.hidden = false;
      drop.classList.add('has-image');
    } else {
      dropPreview.hidden = true;
      dropPreview.style.backgroundImage = '';
      drop.classList.remove('has-image');
    }
  }

  function readFile(file) {
    if (!file || !file.type || file.type.indexOf('image/') !== 0) {
      toast('Please upload an image file.');
      return;
    }
    var reader = new FileReader();
    reader.onload = function () { setPreview(reader.result); };
    reader.readAsDataURL(file);
  }

  if (fileInput) {
    fileInput.addEventListener('change', function () {
      readFile(fileInput.files && fileInput.files[0]);
    });
  }
  if (drop) {
    ['dragenter', 'dragover'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) {
        e.preventDefault();
        drop.classList.add('is-drag');
      });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) {
        e.preventDefault();
        drop.classList.remove('is-drag');
      });
    });
    drop.addEventListener('drop', function (e) {
      var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      readFile(file);
    });
  }

  function resetForm() {
    editingId = null;
    pendingImage = '';
    setPreview('');
    var form = document.getElementById('igaUploadForm');
    if (form) form.reset();
  }

  var uploadForm = document.getElementById('igaUploadForm');
  if (uploadForm) {
    uploadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var title = document.getElementById('igaTitle').value.trim();
      var desc = document.getElementById('igaDesc').value.trim();
      var category = document.getElementById('igaCategory').value;
      if (!title || !category) {
        toast('Title and category are required.');
        return;
      }
      if (!pendingImage) {
        toast('Please upload an image.');
        return;
      }
      items.unshift({
        id: uid(),
        title: title,
        desc: desc || '.',
        category: category,
        image: pendingImage
      });
      toast('Infographic uploaded.');
      save(LS_ITEMS, items);
      resetForm();
      renderCards();
    });
  }

  var searchForm = document.getElementById('igaSearchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      filter.desc = document.getElementById('igaSearchDesc').value.trim();
      filter.cat = document.getElementById('igaSearchCat').value;
      renderCards();
    });
  }

  var editModal = document.getElementById('igaEditModal');
  var editPendingImage = '';

  function syncEditChip() {
    var select = document.getElementById('igaEditCategory');
    var chip = document.getElementById('igaEditCatChip');
    if (!select || !chip) return;
    var val = select.value;
    if (val) {
      chip.textContent = val;
      chip.hidden = false;
    } else {
      chip.hidden = true;
    }
  }

  function setEditPreview(dataUrl) {
    editPendingImage = dataUrl || '';
    var drop = document.getElementById('igaEditDrop');
    var preview = document.getElementById('igaEditPreview');
    if (!drop || !preview) return;
    if (editPendingImage) {
      preview.style.backgroundImage = 'url(' + editPendingImage + ')';
      drop.classList.add('has-image');
    } else {
      preview.style.backgroundImage = '';
      drop.classList.remove('has-image');
    }
  }

  function openEditModal(row) {
    if (!editModal || !row) return;
    editingId = row.id;
    document.getElementById('igaEditTitleInput').value = row.title || '';
    document.getElementById('igaEditDesc').value = row.desc || '';
    document.getElementById('igaEditCategory').value = row.category || '';
    syncEditChip();
    setEditPreview(row.image || '');
    editModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeEditModal() {
    if (!editModal) return;
    editModal.hidden = true;
    editingId = null;
    editPendingImage = '';
    document.body.style.overflow = '';
    var form = document.getElementById('igaEditForm');
    if (form) form.reset();
    syncEditChip();
    setEditPreview('');
  }

  document.getElementById('igaCards').addEventListener('click', function (e) {
    var del = e.target.closest('[data-del]');
    var edit = e.target.closest('[data-edit]');
    if (del) {
      var id = del.getAttribute('data-del');
      if (!window.confirm('Delete this infographic?')) return;
      items = items.filter(function (it) { return it.id !== id; });
      save(LS_ITEMS, items);
      renderCards();
      toast('Infographic deleted.');
      return;
    }
    if (edit) {
      var eid = edit.getAttribute('data-edit');
      var row = items.filter(function (it) { return it.id === eid; })[0];
      if (row) openEditModal(row);
    }
  });

  var editCat = document.getElementById('igaEditCategory');
  if (editCat) editCat.addEventListener('change', syncEditChip);

  var editFile = document.getElementById('igaEditFile');
  if (editFile) {
    editFile.addEventListener('change', function () {
      var file = editFile.files && editFile.files[0];
      if (!file || !file.type || file.type.indexOf('image/') !== 0) {
        toast('Please upload an image file.');
        return;
      }
      var reader = new FileReader();
      reader.onload = function () { setEditPreview(reader.result); };
      reader.readAsDataURL(file);
    });
  }

  var editForm = document.getElementById('igaEditForm');
  if (editForm) {
    editForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!editingId) return;
      var title = document.getElementById('igaEditTitleInput').value.trim();
      var desc = document.getElementById('igaEditDesc').value.trim();
      var category = document.getElementById('igaEditCategory').value;
      if (!title || !category) {
        toast('Title and category are required.');
        return;
      }
      items = items.map(function (it) {
        if (it.id !== editingId) return it;
        return {
          id: it.id,
          title: title,
          desc: desc || '.',
          category: category,
          image: editPendingImage || it.image
        };
      });
      save(LS_ITEMS, items);
      renderCards();
      closeEditModal();
      toast('Infographic updated.');
    });
  }

  var editClose = document.getElementById('igaEditClose');
  var editCancel = document.getElementById('igaEditCancel');
  if (editClose) editClose.addEventListener('click', closeEditModal);
  if (editCancel) editCancel.addEventListener('click', closeEditModal);
  if (editModal) {
    editModal.addEventListener('click', function (e) {
      if (e.target === editModal) closeEditModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && editModal && !editModal.hidden) closeEditModal();
  });

  var catForm = document.getElementById('igaCatForm');
  if (catForm) {
    catForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('igaCatName').value.trim();
      if (!name) return;
      if (cats.indexOf(name) !== -1) { toast('Category already exists.'); return; }
      cats.push(name);
      save(LS_CATS, cats);
      document.getElementById('igaCatName').value = '';
      fillCatSelects();
      renderCatList();
      toast('Category added.');
    });
  }

  document.getElementById('igaCatList').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cat-del]');
    if (!btn) return;
    var idx = Number(btn.getAttribute('data-cat-del'));
    cats.splice(idx, 1);
    save(LS_CATS, cats);
    fillCatSelects();
    renderCatList();
    toast('Category removed.');
  });

  fillCatSelects();
  renderCards();
  renderCatList();
})();
