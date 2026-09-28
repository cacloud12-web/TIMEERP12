(function () {
  'use strict';

  var LS_EVENTS = 'mwe_events';
  var imageSlots = [{ data: '' }];

  function getEvents() { try { return JSON.parse(localStorage.getItem(LS_EVENTS) || '[]'); } catch (e) { return []; } }
  function setEvents(v) { localStorage.setItem(LS_EVENTS, JSON.stringify(v)); }

  var clock = document.getElementById('mweaTopClock');
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

  var imagesEl = document.getElementById('mweaImages');

  function renderImageRows() {
    if (!imagesEl) return;
    imagesEl.innerHTML = imageSlots.map(function (slot, idx) {
      return '<div class="mwea-image-row" data-idx="' + idx + '">' +
        '<label>Image ' + (idx + 1) + '</label>' +
        '<button type="button" class="mwea-upload" data-upload="' + idx + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 16V8"/><path d="M8 12l4-4 4 4"/><path d="M4 20h16"/></svg>' +
        '<span>Click to Upload</span></button>' +
        '<input type="file" class="mwea-file" data-idx="' + idx + '" accept="image/*" hidden>' +
        (imageSlots.length > 1 ? '<button type="button" class="mwea-remove" data-remove="' + idx + '" aria-label="Remove">−</button>' : '') +
        '</div>';
    }).join('');

    imagesEl.querySelectorAll('[data-upload]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = Number(btn.getAttribute('data-upload'));
        var input = imagesEl.querySelector('.mwea-file[data-idx="' + idx + '"]');
        if (input) input.click();
      });
    });

    imagesEl.querySelectorAll('.mwea-file').forEach(function (input) {
      input.addEventListener('change', function () {
        var idx = Number(input.getAttribute('data-idx'));
        var file = input.files && input.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
          imageSlots[idx].data = reader.result;
          toast('Upload', 'Image ' + (idx + 1) + ' uploaded.');
        };
        reader.readAsDataURL(file);
      });
    });

    imagesEl.querySelectorAll('[data-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = Number(btn.getAttribute('data-remove'));
        imageSlots.splice(idx, 1);
        if (!imageSlots.length) imageSlots.push({ data: '' });
        renderImageRows();
      });
    });
  }

  renderImageRows();

  var addImgBtn = document.getElementById('mweaAddImageBtn');
  if (addImgBtn) {
    addImgBtn.addEventListener('click', function () {
      imageSlots.push({ data: '' });
      renderImageRows();
    });
  }

  var viewBtn = document.getElementById('mweaViewBtn');
  var previewScrim = document.getElementById('mweaPreviewScrim');
  var previewTitle = document.getElementById('mweaPreviewTitle');
  var previewGrid = document.getElementById('mweaPreviewGrid');

  function openPreview() {
    if (!previewScrim) return;
    var title = document.getElementById('mweaTitle');
    var imgs = imageSlots.map(function (s) { return s.data; }).filter(Boolean);
    if (previewTitle) previewTitle.textContent = title && title.value.trim() ? title.value.trim() : 'Event Preview';
    if (previewGrid) {
      previewGrid.innerHTML = imgs.length
        ? imgs.map(function (src) { return '<img src="' + src + '" alt="">'; }).join('')
        : '<p class="mwea-preview__empty">No images uploaded yet.</p>';
    }
    previewScrim.removeAttribute('hidden');
  }

  function closePreview() {
    if (previewScrim) previewScrim.setAttribute('hidden', '');
  }

  if (viewBtn) viewBtn.addEventListener('click', openPreview);
  document.getElementById('mweaPreviewClose') && document.getElementById('mweaPreviewClose').addEventListener('click', closePreview);
  if (previewScrim) {
    previewScrim.addEventListener('click', function (e) { if (e.target === previewScrim) closePreview(); });
  }

  var form = document.getElementById('mweaForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var titleEl = document.getElementById('mweaTitle');
      if (!titleEl.value.trim()) { toast('Add Event', 'Title is required.'); return; }
      var images = imageSlots.map(function (s) { return s.data; }).filter(Boolean);
      var events = getEvents();
      events.unshift({
        title: titleEl.value.trim(),
        images: images,
        createdAt: new Date().toISOString()
      });
      setEvents(events);
      toast('Events', 'Event saved.');
      window.location.href = 'marketing_website_events.html';
    });
  }
})();
