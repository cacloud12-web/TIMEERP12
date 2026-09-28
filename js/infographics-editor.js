(function () {
  'use strict';

  var templates = window.IG_TEMPLATES || [];
  var params = new URLSearchParams(window.location.search);
  var currentIdx = Math.max(0, Math.min(templates.length - 1, parseInt(params.get('id'), 10) || 0));

  var canvas = document.getElementById('igeCanvas');
  var canvasBody = document.getElementById('igeCanvasBody');
  var canvasFooter = document.getElementById('igeCanvasFooter');
  var canvasTitle = document.getElementById('igeCanvasTitle');
  var canvasSub = document.getElementById('igeCanvasSub');
  var canvasEmoji = document.getElementById('igeCanvasEmoji');
  var canvasName = document.getElementById('igeCanvasName');
  var canvasPhone = document.getElementById('igeCanvasPhone');
  var formTitle = document.getElementById('igeFormTitle');

  var firmInput = document.getElementById('igeFirm');
  var phoneInput = document.getElementById('igePhone');
  var otherInput = document.getElementById('igeOther');
  var footerHeight = document.getElementById('igeFooterHeight');
  var footerHeightVal = document.getElementById('igeFooterHeightVal');
  var prevBtn = document.getElementById('igePrev');
  var nextBtn = document.getElementById('igeNext');

  var state = {
    bgMode: 'solid',
    solidColor: '#0d233e',
    gradColor1: '#9fe0d7',
    gradColor2: '#1e3a5f',
    gradDirection: 'lr',
    gradOpacity: 70,
    gradPreset: 'blue-sky',
    footerMode: 'solid',
    footerAuto: false,
    footerColor: '#e85d4c',
    footerGradC1: '#e85d4c',
    footerGradC2: '#1e3a5f',
    footerGradDir: 'lr',
    footerHeight: 50,
    filter: 'none',
    footerPos: {
      logo: { x: 12, y: null },
      phone: { x: 100, y: null },
      name: { x: null, y: null }
    },
    footerHidden: { logo: false, phone: false, name: false }
  };

  var DEFAULT_FOOTER_POS = {
    logo: { x: 12, y: null },
    phone: { x: 100, y: null },
    name: { x: null, y: null }
  };

  var GRAD_PRESETS = [
    { id: 'blue-sky', label: 'Blue Sky', c1: '#9fe0d7', c2: '#1e3a5f' },
    { id: 'sunset', label: 'Sunset', c1: '#fb923c', c2: '#7c2d12' },
    { id: 'purple-dream', label: 'Purple Dream', c1: '#c4b5fd', c2: '#6b21a8' },
    { id: 'ocean', label: 'Ocean', c1: '#25B7A7', c2: '#0d233e' },
    { id: 'emerald', label: 'Emerald', c1: '#86efac', c2: '#14532d' },
    { id: 'peach', label: 'Peach', c1: '#fdba74', c2: '#fef08a' }
  ];

  function hexToRgba(hex, alpha) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h, 16);
    return 'rgba(' + [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',') + ',' + alpha + ')';
  }

  function buildGradientFrom(c1, c2, direction, opacity) {
    var a = opacity != null ? opacity / 100 : 1;
    var col1 = hexToRgba(c1, a);
    var col2 = hexToRgba(c2, a);
    if (direction === 'lr') return 'linear-gradient(to right, ' + col1 + ', ' + col2 + ')';
    if (direction === 'tb') return 'linear-gradient(to bottom, ' + col1 + ', ' + col2 + ')';
    if (direction === 'diag') return 'linear-gradient(135deg, ' + col1 + ', ' + col2 + ')';
    return 'radial-gradient(circle at center, ' + col1 + ', ' + col2 + ')';
  }

  function buildGradient() {
    return buildGradientFrom(state.gradColor1, state.gradColor2, state.gradDirection, state.gradOpacity);
  }

  function buildFooterGradient() {
    return buildGradientFrom(state.footerGradC1, state.footerGradC2, state.footerGradDir, 100);
  }

  function toggleGradPanel() {
    var panel = document.getElementById('igeGradientPanel');
    if (panel) panel.toggleAttribute('hidden', state.bgMode !== 'gradient');
  }

  function toggleFooterPanel() {
    var gradPanel = document.getElementById('igeFooterGradPanel');
    var swatches = document.getElementById('igeSwatches');
    var isGrad = state.footerMode === 'gradient';
    if (gradPanel) gradPanel.toggleAttribute('hidden', !isGrad);
    if (swatches) swatches.toggleAttribute('hidden', isGrad);
  }

  function syncFooterGradInputs() {
    var c1 = document.getElementById('igeFooterC1');
    var c2 = document.getElementById('igeFooterC2');
    var dir = document.getElementById('igeFooterDir');
    if (c1) c1.value = state.footerGradC1;
    if (c2) c2.value = state.footerGradC2;
    if (dir) dir.value = state.footerGradDir;
  }

  function syncGradInputs() {
    var c1 = document.getElementById('igeGradC1');
    var c2 = document.getElementById('igeGradC2');
    var op = document.getElementById('igeGradOpacity');
    var opVal = document.getElementById('igeGradOpacityVal');
    if (c1) c1.value = state.gradColor1;
    if (c2) c2.value = state.gradColor2;
    if (op) op.value = state.gradOpacity;
    if (opVal) opVal.textContent = state.gradOpacity + '%';
    document.querySelectorAll('input[name="igeDir"]').forEach(function (r) {
      r.checked = r.value === state.gradDirection;
    });
    document.querySelectorAll('.ige-preset').forEach(function (p) {
      p.classList.toggle('is-active', p.getAttribute('data-preset') === state.gradPreset);
    });
  }

  function applyPreset(id) {
    var preset = GRAD_PRESETS.filter(function (p) { return p.id === id; })[0];
    if (!preset) return;
    state.gradPreset = id;
    state.gradColor1 = preset.c1;
    state.gradColor2 = preset.c2;
    syncGradInputs();
    updatePreview();
  }

  function renderPresets() {
    var el = document.getElementById('igePresets');
    if (!el) return;
    el.innerHTML = GRAD_PRESETS.map(function (p) {
      return '<button type="button" class="ige-preset' + (state.gradPreset === p.id ? ' is-active' : '') + '" data-preset="' + p.id + '">' +
        '<span class="ige-preset__swatch" style="background:linear-gradient(135deg,' + p.c1 + ',' + p.c2 + ')"></span>' +
        '<span class="ige-preset__label">' + p.label + '</span></button>';
    }).join('');
    el.querySelectorAll('.ige-preset').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyPreset(btn.getAttribute('data-preset'));
      });
    });
  }

  var FILTERS = [
    { id: 'none', label: 'None', preview: 'linear-gradient(135deg, #1e3a5f, #9fe0d7)', css: 'none' },
    { id: 'grayscale', label: 'Grayscale', preview: 'linear-gradient(135deg, #374151, #d1d5db)', css: 'grayscale(100%)' },
    { id: 'sepia', label: 'Sepia', preview: 'linear-gradient(135deg, #78350f, #fde68a)', css: 'sepia(85%)' },
    { id: 'vivid', label: 'Vivid', preview: 'linear-gradient(135deg, #ec4899, #8b5cf6)', css: 'saturate(1.4) contrast(1.05)' },
    { id: 'bright', label: 'Bright', preview: 'linear-gradient(135deg, #fef9c3, #fef08a)', css: 'brightness(1.15) saturate(1.1)' },
    { id: 'dark', label: 'Dark', preview: 'linear-gradient(135deg, #0f172a, #1e293b)', css: 'brightness(0.75) contrast(1.15)' },
    { id: 'watercolor', label: 'Watercolor', preview: 'linear-gradient(135deg, #fbcfe8, #c4b5fd)', css: 'saturate(1.2) contrast(0.95) brightness(1.05)' },
    { id: 'vintage', label: 'Vintage', preview: 'linear-gradient(135deg, #a16207, #fde68a)', css: 'sepia(45%) contrast(0.9) brightness(1.05)' },
    { id: 'sketch', label: 'Sketch', preview: 'linear-gradient(135deg, #111827 50%, #f9fafb 50%)', css: 'grayscale(100%) contrast(1.6) brightness(1.08)' },
    { id: 'contrast', label: 'Contrast', preview: 'linear-gradient(135deg, #000 50%, #fff 50%)', css: 'contrast(1.35) saturate(0.9)' },
    { id: 'warm', label: 'Warm', preview: 'linear-gradient(135deg, #7f1d1d, #fb923c)', css: 'sepia(25%) saturate(1.3) hue-rotate(-10deg)' },
    { id: 'fade', label: 'Fade', preview: 'linear-gradient(135deg, #e5e7eb, #f9fafb)', css: 'opacity(0.92) contrast(0.88) brightness(1.1)' }
  ];

  var swatchColors = ['#e85d4c', '#86efac', '#9fe0d7', '#fde047', '#c4b5fd', '#1f2937'];

  var ELEMENT_CATEGORIES = [
    'Icons', 'Shapes', 'Arrows', 'Frames', 'Stickers', 'Illustrations', 'Business', 'Finance',
    'Marketing', 'Tax', 'Motivation', 'Deadline', 'Education', 'Office', 'Festival',
    'Social Media', '3D', 'Background Objects', 'Celebration'
  ];

  var ELEMENTS = [
    { id: 'confetti', label: 'Confetti', category: 'Celebration', emoji: '🎊' },
    { id: 'ornaments', label: 'Ornaments', category: 'Celebration', emoji: '🪅' },
    { id: 'balloons', label: 'Balloon Arch', category: 'Celebration', emoji: '🎈' },
    { id: 'bunting', label: 'Bunting Flags', category: 'Celebration', emoji: '🚩' },
    { id: 'barong', label: 'Barong Mask', category: 'Celebration', emoji: '🎭' },
    { id: 'fans', label: 'Decor Fans', category: 'Celebration', emoji: '🪭' },
    { id: 'fireworks', label: 'Fireworks', category: 'Celebration', emoji: '🎆' },
    { id: 'cake', label: 'Celebration Cake', category: 'Celebration', emoji: '🎂' },
    { id: 'star', label: 'Star Icon', category: 'Icons', emoji: '⭐' },
    { id: 'heart', label: 'Heart Icon', category: 'Icons', emoji: '❤️' },
    { id: 'circle', label: 'Circle Shape', category: 'Shapes', emoji: '⚪' },
    { id: 'square', label: 'Square Shape', category: 'Shapes', emoji: '⬜' },
    { id: 'arrow-r', label: 'Arrow Right', category: 'Arrows', emoji: '➡️' },
    { id: 'frame', label: 'Photo Frame', category: 'Frames', emoji: '🖼️' },
    { id: 'sticker-smile', label: 'Smiley Sticker', category: 'Stickers', emoji: '😊' },
    { id: 'chart', label: 'Growth Chart', category: 'Business', emoji: '📈' },
    { id: 'money', label: 'Finance Coin', category: 'Finance', emoji: '💰' },
    { id: 'megaphone', label: 'Marketing', category: 'Marketing', emoji: '📣' },
    { id: 'receipt', label: 'Tax Form', category: 'Tax', emoji: '🧾' },
    { id: 'trophy', label: 'Motivation', category: 'Motivation', emoji: '🏆' },
    { id: 'clock', label: 'Deadline', category: 'Deadline', emoji: '⏰' },
    { id: 'book', label: 'Education', category: 'Education', emoji: '📚' },
    { id: 'briefcase', label: 'Office', category: 'Office', emoji: '💼' },
    { id: 'diya', label: 'Festival Diya', category: 'Festival', emoji: '🪔' },
    { id: 'social', label: 'Social Like', category: 'Social Media', emoji: '👍' },
    { id: 'cube', label: '3D Cube', category: '3D', emoji: '🎲' },
    { id: 'leaf', label: 'Background Leaf', category: 'Background Objects', emoji: '🍃' },
    { id: 'illust-1', label: 'Illustration', category: 'Illustrations', emoji: '🎨' }
  ];

  var elementCategory = 'Celebration';
  var stickerId = 0;

  function toast(msg) {
    if (window.DashboardShell) DashboardShell.toast('Infographics', msg);
    else alert(msg);
  }

  function loadTemplate(idx) {
    currentIdx = idx;
    var t = templates[idx];
    if (!t) return;
    if (formTitle) formTitle.textContent = t.name;
    document.title = t.name + ' — Infographic Editor';
    if (canvasTitle) canvasTitle.textContent = t.name.toUpperCase();
    if (canvasSub) canvasSub.textContent = t.subtitle || '';
    if (canvasEmoji) canvasEmoji.textContent = t.emoji || '📊';
    if (prevBtn) prevBtn.disabled = idx <= 0;
    if (nextBtn) nextBtn.disabled = idx >= templates.length - 1;
    history.replaceState(null, '', 'infographics_editor.html?id=' + idx);
    updatePreview();
  }

  function updatePreview() {
    var firm = firmInput && firmInput.value.trim() ? firmInput.value.trim() : 'Your Name';
    var phone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : 'Your Phone';
    if (canvasName) canvasName.textContent = firm;
    if (canvasPhone) canvasPhone.textContent = phone;

    if (canvas) {
      if (state.bgMode === 'gradient') canvas.style.background = buildGradient();
      else canvas.style.background = state.solidColor;
    }
    if (canvasFooter) {
      canvasFooter.style.background = state.footerMode === 'gradient' ? buildFooterGradient() : state.footerColor;
      canvasFooter.style.minHeight = state.footerAuto ? 'auto' : state.footerHeight + 'px';
      canvasFooter.style.height = state.footerAuto ? 'auto' : state.footerHeight + 'px';
      applyFooterPositions();
    }
    if (canvas) {
      var f = FILTERS.find(function (x) { return x.id === state.filter; });
      canvas.style.filter = f && f.css !== 'none' ? f.css : 'none';
    }
  }

  function applyFooterPositions() {
    if (!canvasFooter) return;
    var fh = canvasFooter.offsetHeight || state.footerHeight;
    ['logo', 'phone', 'name'].forEach(function (key) {
      var el = document.querySelector('.ige-drag-item[data-drag="' + key + '"]');
      if (!el) return;
      if (state.footerHidden[key]) { el.setAttribute('hidden', ''); return; }
      el.removeAttribute('hidden');
      var pos = state.footerPos[key] || {};
      var x = pos.x, y = pos.y;
      if (key === 'name' && x == null) {
        x = Math.max(8, canvasFooter.offsetWidth - el.offsetWidth - 12);
      }
      if (y == null) y = Math.max(0, (fh - el.offsetHeight) / 2);
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.transform = 'none';
    });
  }

  function saveFooterPosition(el) {
    if (!el || !canvasFooter) return;
    var key = el.getAttribute('data-drag');
    if (!key) return;
    state.footerPos[key] = {
      x: parseFloat(el.style.left) || 0,
      y: parseFloat(el.style.top) || 0
    };
  }

  function initDraggableFooter() {
    var dropZone = document.getElementById('igeDropZone');
    var dragging = null, dragOffset = { x: 0, y: 0 };

    function isOverDrop(e, zone) {
      if (!zone) return false;
      var r = zone.getBoundingClientRect();
      return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    }

    function bindDrag(el, container) {
      el.addEventListener('pointerdown', function (e) {
        if (e.button !== 0) return;
        dragging = el;
        dragging._container = container;
        el.classList.add('is-dragging');
        el.setPointerCapture(e.pointerId);
        var rect = el.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;
        e.preventDefault();
      });
    }

    document.querySelectorAll('.ige-drag-item').forEach(function (el) {
      bindDrag(el, canvasFooter);
    });

    document.addEventListener('pointermove', function (e) {
      if (!dragging || !dragging._container) return;
      var cRect = dragging._container.getBoundingClientRect();
      var x = e.clientX - cRect.left - dragOffset.x;
      var y = e.clientY - cRect.top - dragOffset.y;
      var maxX = Math.max(0, cRect.width - dragging.offsetWidth);
      var maxY = Math.max(0, cRect.height - dragging.offsetHeight);
      dragging.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
      dragging.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
      dragging.style.transform = 'none';
      if (dropZone) dropZone.classList.toggle('is-over', isOverDrop(e, dropZone));
    });

    document.addEventListener('pointerup', function (e) {
      if (!dragging) return;
      if (dragging.classList.contains('ige-sticker') && dropZone && isOverDrop(e, dropZone)) {
        dragging.remove();
        toast('Element removed.');
      } else if (dragging.classList.contains('ige-drag-item')) {
        var key = dragging.getAttribute('data-drag');
        if (dropZone && isOverDrop(e, dropZone)) {
          state.footerHidden[key] = true;
          dragging.setAttribute('hidden', '');
          toast((key === 'name' ? 'Firm name' : key) + ' removed.');
        } else saveFooterPosition(dragging);
      }
      dragging.classList.remove('is-dragging');
      try { dragging.releasePointerCapture(e.pointerId); } catch (err) { /* noop */ }
      dragging = null;
      if (dropZone) dropZone.classList.remove('is-over');
    });

    window._igeBindStickerDrag = function (el) { bindDrag(el, canvasBody); };
  }

  function addCanvasSticker(item) {
    if (!canvasBody) return;
    stickerId += 1;
    var el = document.createElement('div');
    el.className = 'ige-sticker';
    el.setAttribute('data-sticker-id', String(stickerId));
    el.setAttribute('title', item.label);
    el.textContent = item.emoji;
    var bw = canvasBody.offsetWidth || 200;
    var bh = canvasBody.offsetHeight || 200;
    el.style.left = Math.max(8, Math.random() * (bw - 56)) + 'px';
    el.style.top = Math.max(8, Math.random() * (bh - 56)) + 'px';
    canvasBody.appendChild(el);
    if (window._igeBindStickerDrag) window._igeBindStickerDrag(el);
    closeElementsModal();
    toast(item.label + ' added to canvas.');
  }

  function renderElementTags() {
    var tagsEl = document.getElementById('igeElementTags');
    if (!tagsEl) return;
    tagsEl.innerHTML = ELEMENT_CATEGORIES.map(function (cat) {
      return '<button type="button" class="ige-etag' + (elementCategory === cat ? ' is-active' : '') + '" data-cat="' + cat + '">' + cat + '</button>';
    }).join('');
    tagsEl.querySelectorAll('.ige-etag').forEach(function (btn) {
      btn.addEventListener('click', function () {
        elementCategory = btn.getAttribute('data-cat');
        renderElementTags();
        renderElementGrid();
      });
    });
  }

  function renderElementGrid() {
    var grid = document.getElementById('igeElementGrid');
    var q = (document.getElementById('igeElementSearch') && document.getElementById('igeElementSearch').value.trim().toLowerCase()) || '';
    if (!grid) return;
    var list = ELEMENTS.filter(function (el) {
      if (elementCategory && el.category !== elementCategory) return false;
      if (q && el.label.toLowerCase().indexOf(q) === -1 && el.category.toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
    grid.innerHTML = list.map(function (el) {
      return '<button type="button" class="ige-element-card" data-el="' + el.id + '">' +
        '<span class="ige-element-card__art">' + el.emoji + '</span>' +
        '<span class="ige-element-card__label">' + el.label + '</span></button>';
    }).join('');
    grid.querySelectorAll('.ige-element-card').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-el');
        var item = ELEMENTS.filter(function (e) { return e.id === id; })[0];
        if (item) addCanvasSticker(item);
      });
    });
  }

  function openElementsModal() {
    var modal = document.getElementById('igeElementsModal');
    var addBtn = document.getElementById('igeAddBtn');
    if (!modal) return;
    modal.removeAttribute('hidden');
    if (addBtn) { addBtn.classList.add('is-open'); addBtn.setAttribute('aria-expanded', 'true'); }
    renderElementTags();
    renderElementGrid();
  }

  function closeElementsModal() {
    var modal = document.getElementById('igeElementsModal');
    var addBtn = document.getElementById('igeAddBtn');
    if (modal) modal.setAttribute('hidden', '');
    if (addBtn) { addBtn.classList.remove('is-open'); addBtn.setAttribute('aria-expanded', 'false'); }
  }

  function bindSeg(groupId, key, afterChange) {
    var group = document.getElementById(groupId);
    if (!group) return;
    group.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        group.querySelectorAll('button').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        state[key] = btn.getAttribute('data-value');
        if (afterChange) afterChange();
        updatePreview();
      });
    });
  }

  bindSeg('igeBgSeg', 'bgMode', toggleGradPanel);
  bindSeg('igeFooterColorSeg', 'footerMode', toggleFooterPanel);

  var autoBtn = document.getElementById('igeFooterAuto');
  if (autoBtn) {
    autoBtn.addEventListener('click', function () {
      state.footerAuto = !state.footerAuto;
      autoBtn.classList.toggle('is-active', state.footerAuto);
      if (footerHeight) footerHeight.disabled = state.footerAuto;
      updatePreview();
    });
  }

  if (footerHeight) {
    footerHeight.addEventListener('input', function () {
      state.footerHeight = Number(footerHeight.value);
      if (footerHeightVal) footerHeightVal.textContent = footerHeight.value;
      updatePreview();
    });
  }

  [firmInput, phoneInput, otherInput].forEach(function (el) {
    if (el) el.addEventListener('input', updatePreview);
  });

  var gradC1 = document.getElementById('igeGradC1');
  var gradC2 = document.getElementById('igeGradC2');
  var gradOp = document.getElementById('igeGradOpacity');
  var gradOpVal = document.getElementById('igeGradOpacityVal');

  if (gradC1) {
    gradC1.addEventListener('input', function () {
      state.gradColor1 = gradC1.value;
      state.gradPreset = '';
      syncGradInputs();
      updatePreview();
    });
  }
  if (gradC2) {
    gradC2.addEventListener('input', function () {
      state.gradColor2 = gradC2.value;
      state.gradPreset = '';
      syncGradInputs();
      updatePreview();
    });
  }
  if (gradOp) {
    gradOp.addEventListener('input', function () {
      state.gradOpacity = Number(gradOp.value);
      if (gradOpVal) gradOpVal.textContent = gradOp.value + '%';
      updatePreview();
    });
  }

  document.querySelectorAll('input[name="igeDir"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      if (radio.checked) {
        state.gradDirection = radio.value;
        updatePreview();
      }
    });
  });

  renderPresets();
  toggleGradPanel();
  toggleFooterPanel();
  syncGradInputs();
  syncFooterGradInputs();

  var footerC1 = document.getElementById('igeFooterC1');
  var footerC2 = document.getElementById('igeFooterC2');
  var footerDir = document.getElementById('igeFooterDir');
  if (footerC1) footerC1.addEventListener('input', function () { state.footerGradC1 = footerC1.value; updatePreview(); });
  if (footerC2) footerC2.addEventListener('input', function () { state.footerGradC2 = footerC2.value; updatePreview(); });
  if (footerDir) footerDir.addEventListener('change', function () { state.footerGradDir = footerDir.value; updatePreview(); });

  var swatchesEl = document.getElementById('igeSwatches');
  if (swatchesEl) {
    swatchColors.forEach(function (color, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ige-swatch' + (i === 0 ? ' is-active' : '');
      btn.style.background = color;
      btn.setAttribute('aria-label', 'Color ' + color);
      btn.addEventListener('click', function () {
        swatchesEl.querySelectorAll('.ige-swatch').forEach(function (s) { s.classList.remove('is-active'); });
        btn.classList.add('is-active');
        state.footerColor = color;
        updatePreview();
      });
      swatchesEl.appendChild(btn);
    });
    var picker = document.createElement('button');
    picker.type = 'button';
    picker.className = 'ige-swatch ige-swatch--picker';
    picker.setAttribute('aria-label', 'Custom color');
    picker.addEventListener('click', function () { toast('Custom color picker will open here.'); });
    swatchesEl.appendChild(picker);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      if (currentIdx > 0) loadTemplate(currentIdx - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      if (currentIdx < templates.length - 1) loadTemplate(currentIdx + 1);
    });
  }

  document.getElementById('igeDownload') && document.getElementById('igeDownload').addEventListener('click', function () {
    if (firmInput && !firmInput.value.trim()) { toast('Firm Name is required.'); return; }
    if (phoneInput && !phoneInput.value.trim()) { toast('Phone is required.'); return; }
    toast('Infographic downloaded.');
  });

  document.getElementById('igeShare') && document.getElementById('igeShare').addEventListener('click', function () {
    toast('Share link copied to clipboard.');
  });

  var filterBtn = document.getElementById('igeFilterBtn');
  var filterPop = document.getElementById('igeFilterPop');
  var filterGrid = document.getElementById('igeFilterGrid');
  var filterClose = document.getElementById('igeFilterClose');

  function openFilterPop() {
    if (!filterPop || !filterBtn) return;
    filterPop.removeAttribute('hidden');
    filterBtn.classList.add('is-open');
    filterBtn.setAttribute('aria-expanded', 'true');
  }

  function closeFilterPop() {
    if (!filterPop || !filterBtn) return;
    filterPop.setAttribute('hidden', '');
    filterBtn.classList.remove('is-open');
    filterBtn.setAttribute('aria-expanded', 'false');
  }

  function renderFilters() {
    if (!filterGrid) return;
    filterGrid.innerHTML = FILTERS.map(function (f) {
      return '<button type="button" class="ige-filter-opt' + (state.filter === f.id ? ' is-active' : '') + '" data-filter="' + f.id + '">' +
        '<span class="ige-filter-opt__preview" style="background:' + f.preview + '"></span>' +
        '<span class="ige-filter-opt__label">' + f.label + '</span></button>';
    }).join('');
    filterGrid.querySelectorAll('.ige-filter-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.filter = btn.getAttribute('data-filter');
        filterGrid.querySelectorAll('.ige-filter-opt').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        updatePreview();
      });
    });
  }

  if (filterBtn) {
    filterBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (filterPop && filterPop.hasAttribute('hidden')) openFilterPop();
      else closeFilterPop();
    });
  }
  if (filterClose) filterClose.addEventListener('click', closeFilterPop);
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.ige-filter-wrap')) closeFilterPop();
  });

  document.getElementById('igeAddBtn') && document.getElementById('igeAddBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    closeFilterPop();
    var modal = document.getElementById('igeElementsModal');
    if (modal && modal.hasAttribute('hidden')) openElementsModal();
    else closeElementsModal();
  });

  document.getElementById('igeElementsClose') && document.getElementById('igeElementsClose').addEventListener('click', closeElementsModal);
  document.getElementById('igeElementsModal') && document.getElementById('igeElementsModal').addEventListener('click', function (e) {
    if (e.target === document.getElementById('igeElementsModal')) closeElementsModal();
  });
  document.getElementById('igeElementSearch') && document.getElementById('igeElementSearch').addEventListener('input', renderElementGrid);

  initDraggableFooter();
  applyFooterPositions();
  window.addEventListener('resize', applyFooterPositions);

  renderFilters();
  loadTemplate(currentIdx);
})();
