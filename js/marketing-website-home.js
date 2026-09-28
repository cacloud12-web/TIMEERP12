(function () {
  'use strict';

  var clients = [];
  var feedback = [];

  var clock = document.getElementById('mwhTopClock');
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

  function bindPreview(inputId, previewId, fallback) {
    var input = document.getElementById(inputId);
    var prev = document.getElementById(previewId);
    if (!input || !prev) return;
    function sync() { prev.textContent = input.value.trim() || fallback; }
    input.addEventListener('input', sync);
    sync();
  }

  function setTab(tab) {
    document.querySelectorAll('.mwh-tab').forEach(function (t) {
      var active = t.getAttribute('data-tab') === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.querySelectorAll('.mwh-tab-panel').forEach(function (p) {
      var active = p.getAttribute('data-panel') === tab;
      p.classList.toggle('is-active', active);
      if (active) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
    });
  }

  document.querySelectorAll('.mwh-tab').forEach(function (tab) {
    tab.addEventListener('click', function () { setTab(tab.getAttribute('data-tab')); });
  });

  bindPreview('mwhDashHeading', 'mwhPrevDashHeading', '--Heading');
  bindPreview('mwhDashDesc', 'mwhPrevDashDesc', '--Description');
  bindPreview('mwhDashKey', 'mwhPrevDashKey', '--Key Heading');
  bindPreview('mwhSvcHeading', 'mwhPrevSvcHeading', '--Heading');
  bindPreview('mwhSvcDesc', 'mwhPrevSvcDesc', '--Description');

  function fieldHtml(label, id, ph, req) {
    return '<div class="mwh-field"><label>' + label + (req ? '<span class="mwh-req">*</span>' : '') +
      '</label><input type="text" id="' + id + '" placeholder="' + ph + '"></div>';
  }

  function buildPortfolioForms() {
    var el = document.getElementById('mwhPortfolioForms');
    if (!el) return;
    el.innerHTML =
      fieldHtml('Heading', 'mwhPortHeading', 'Heading', true) +
      fieldHtml('Description', 'mwhPortDesc', 'Description', true) +
      '<div class="mwh-field-row">' +
        '<div class="mwh-field"><label>Step 1<span class="mwh-req">*</span></label><input type="text" id="mwhPortStep1" placeholder="Step 1"></div>' +
        '<div class="mwh-field"><label>Step 2<span class="mwh-req">*</span></label><input type="text" id="mwhPortStep2" placeholder="Step 2"></div>' +
      '</div>' +
      '<div class="mwh-field-row">' +
        '<div class="mwh-field"><label>Step 3<span class="mwh-req">*</span></label><input type="text" id="mwhPortStep3" placeholder="Question"></div>' +
        '<div class="mwh-field"><label>Step 4<span class="mwh-req">*</span></label><input type="text" id="mwhPortStep4" placeholder="Question"></div>' +
      '</div>' +
      fieldHtml('Question', 'mwhPortQuestion', 'Question', true) +
      fieldHtml('CTA', 'mwhPortCta', 'CTA', true) +
      '<div class="mwh-field"><label>Image</label><button type="button" class="mwh-upload"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 16V8"/><path d="M8 12l4-4 4 4"/><path d="M4 20h16"/></svg><span>Click to Upload</span></button></div>' +
      '<button type="button" class="mwh-save" id="mwhPortSave">Save</button>';
    bindPreview('mwhPortHeading', 'mwhPrevPortHeading', '--Heading');
    bindPreview('mwhPortDesc', 'mwhPrevPortDesc', '--Description');
    bindPreview('mwhPortStep1', 'mwhPrevPortStep1', '--Step 1');
    bindPreview('mwhPortStep2', 'mwhPrevPortStep2', '--Step 2');
    bindPreview('mwhPortStep3', 'mwhPrevPortStep3', '--Step 3');
    bindPreview('mwhPortStep4', 'mwhPrevPortStep4', '--Step 4');
    bindPreview('mwhPortQuestion', 'mwhPrevPortQuestion', '--Question');
    bindPreview('mwhPortCta', 'mwhPrevPortCta', '--CTA');
    document.getElementById('mwhPortSave').addEventListener('click', function () { toast('Portfolio', 'Portfolio section saved.'); });
  }

  function buildCarouselSection(n) {
    var rows = '';
    for (var i = 1; i <= 5; i++) {
      rows += '<div class="mwh-field-row">' +
        '<div class="mwh-field"><label>Carousel Heading ' + i + '<span class="mwh-req">*</span></label>' +
        '<input type="text" class="mwh-car-h" data-sec="' + n + '" data-i="' + i + '" placeholder="Carousel Heading ' + i + '"></div>' +
        '<div class="mwh-field"><label>Carousel Description ' + i + '<span class="mwh-req">*</span></label>' +
        '<input type="text" class="mwh-car-d" data-sec="' + n + '" data-i="' + i + '" placeholder="Carousel Description ' + i + '"></div></div>';
    }
    return '<div class="mwh-section-divider">Section ' + n + '</div><div class="mwh-block">' +
      fieldHtml('Heading', 'mwhCarHeading' + n, 'Heading', true) +
      fieldHtml('Description', 'mwhCarDesc' + n, 'Description', true) + rows +
      '<div class="mwh-field"><label>Image</label><button type="button" class="mwh-upload"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 16V8"/><path d="M8 12l4-4 4 4"/><path d="M4 20h16"/></svg><span>Click to Upload</span></button></div></div>';
  }

  function buildCarouselForms() {
    var el = document.getElementById('mwhCarouselForms');
    if (!el) return;
    var html = '';
    for (var s = 1; s <= 5; s++) html += buildCarouselSection(s);
    html += '<button type="button" class="mwh-save" id="mwhCarSave">Save</button>';
    el.innerHTML = html;
    bindPreview('mwhCarHeading1', 'mwhPrevCarHeading', '--Heading');
    bindPreview('mwhCarDesc1', 'mwhPrevCarDesc', '--Description');
    el.querySelector('.mwh-car-h[data-sec="1"][data-i="1"]').addEventListener('input', function (e) {
      document.getElementById('mwhPrevCarH1').textContent = e.target.value.trim() || '--Carousel Heading1';
    });
    el.querySelector('.mwh-car-d[data-sec="1"][data-i="1"]').addEventListener('input', function (e) {
      document.getElementById('mwhPrevCarD1').textContent = e.target.value.trim() || '--Carousel Description1';
    });
    document.getElementById('mwhCarSave').addEventListener('click', function () { toast('Carousel Portfolio', 'Carousel sections saved.'); });
  }

  buildPortfolioForms();
  buildCarouselForms();

  document.getElementById('mwhDashForm').addEventListener('submit', function (e) {
    e.preventDefault();
    toast('Dashboard', 'Homepage dashboard saved.');
  });
  document.getElementById('mwhServicesForm').addEventListener('submit', function (e) {
    e.preventDefault();
    toast('Services Header', 'Services header saved.');
  });

  document.querySelector('[data-upload="dash"]').addEventListener('click', function () {
    document.getElementById('mwhDashImage').click();
  });
  document.getElementById('mwhDashImage').addEventListener('change', function () {
    var f = this.files && this.files[0];
    if (f) toast('Image', f.name + ' selected.');
  });

  function wireUpload(btnId, inputId) {
    var btn = document.getElementById(btnId);
    var input = document.getElementById(inputId);
    if (!btn || !input) return;
    btn.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () {
      var span = btn.querySelector('span');
      if (span) span.textContent = input.files && input.files[0] ? input.files[0].name : 'Click to Upload';
    });
  }
  wireUpload('mwhClientUploadBtn', 'mwhClientImage');
  wireUpload('mwhFbUploadBtn', 'mwhFbImage');

  function renderClients() {
    var body = document.getElementById('mwhClientBody');
    var wrap = body && body.closest('.mwh-table-wrap');
    if (!body) return;
    body.innerHTML = clients.map(function (c, i) {
      return '<tr><td>' + c.name + '</td><td>' + (c.image || '—') + '</td><td><button type="button" class="mwh-del" data-i="' + i + '">Delete</button></td></tr>';
    }).join('');
    if (wrap) wrap.classList.toggle('has-rows', clients.length > 0);
    body.querySelectorAll('.mwh-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        clients.splice(Number(btn.getAttribute('data-i')), 1);
        renderClients();
      });
    });
  }

  function renderFeedback() {
    var body = document.getElementById('mwhFeedbackBody');
    var wrap = body && body.closest('.mwh-table-wrap');
    if (!body) return;
    body.innerHTML = feedback.map(function (f, i) {
      return '<tr><td>' + f.name + '</td><td>' + f.company + '</td><td>' + f.text + '</td><td>' + (f.image || '—') + '</td>' +
        '<td><button type="button" class="mwh-del" data-i="' + i + '">Delete</button></td></tr>';
    }).join('');
    if (wrap) wrap.classList.toggle('has-rows', feedback.length > 0);
    body.querySelectorAll('.mwh-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        feedback.splice(Number(btn.getAttribute('data-i')), 1);
        renderFeedback();
      });
    });
  }

  function openModal(id) { document.getElementById(id).removeAttribute('hidden'); }
  function closeModal(id) { document.getElementById(id).setAttribute('hidden', ''); }

  document.getElementById('mwhAddClientBtn').addEventListener('click', function () { openModal('mwhClientModal'); });
  document.getElementById('mwhAddFeedbackBtn').addEventListener('click', function () { openModal('mwhFeedbackModal'); });

  document.querySelectorAll('.mwh-modal__close').forEach(function (btn) {
    btn.addEventListener('click', function () {
      closeModal(btn.getAttribute('data-close') === 'client' ? 'mwhClientModal' : 'mwhFeedbackModal');
    });
  });
  document.querySelectorAll('.mwh-modal-scrim').forEach(function (scrim) {
    scrim.addEventListener('click', function (e) { if (e.target === scrim) scrim.setAttribute('hidden', ''); });
  });

  document.getElementById('mwhClientForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('mwhClientName').value.trim();
    if (!name) return;
    var imgInput = document.getElementById('mwhClientImage');
    clients.push({ name: name, image: imgInput.files && imgInput.files[0] ? imgInput.files[0].name : '—' });
    renderClients();
    document.getElementById('mwhClientForm').reset();
    closeModal('mwhClientModal');
    toast('Client', name + ' added.');
  });

  document.getElementById('mwhFeedbackForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('mwhFbName').value.trim();
    var company = document.getElementById('mwhFbCompany').value.trim();
    var text = document.getElementById('mwhFbText').value.trim();
    if (!name || !company || !text) return;
    var imgInput = document.getElementById('mwhFbImage');
    feedback.push({
      name: name, company: company, text: text,
      image: imgInput.files && imgInput.files[0] ? imgInput.files[0].name : '—'
    });
    renderFeedback();
    document.getElementById('mwhFeedbackForm').reset();
    closeModal('mwhFeedbackModal');
    toast('Feedback', 'Feedback added.');
  });

  renderClients();
  renderFeedback();
})();
