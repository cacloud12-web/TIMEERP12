/* TIME ERP — Self Create Document page logic */
(function () {
  'use strict';

  /* ── Clock ── */
  function tickClock() {
    var el = document.getElementById('scdTopClock');
    if (!el) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
    el.setAttribute('datetime', d.toISOString());
  }
  tickClock(); setInterval(tickClock, 30000);

  /* ── Tabs ── */
  var tabs = document.querySelectorAll('.scd-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      document.querySelectorAll('.scd-panel').forEach(function (p) { p.classList.remove('is-active'); });
      var panel = document.getElementById('panel-' + tab.getAttribute('data-tab'));
      if (panel) panel.classList.add('is-active');
    });
  });

  /* ── Generic combo helper ── */
  function initCombo(comboId, inputId, menuId, items) {
    var combo = document.getElementById(comboId);
    var input = document.getElementById(inputId);
    var menu = document.getElementById(menuId);
    if (!combo || !input || !menu) return;
    var selected = '';

    function render(filter) {
      var q = (filter || '').toLowerCase();
      menu.innerHTML = '';
      items.forEach(function (item) {
        if (q && item.toLowerCase().indexOf(q) === -1) return;
        var div = document.createElement('div');
        div.className = 'scd-combo__item' + (item === selected ? ' is-selected' : '');
        div.textContent = item;
        div.addEventListener('click', function () {
          selected = item; input.value = item; combo.classList.remove('is-open');
        });
        menu.appendChild(div);
      });
    }
    input.addEventListener('focus', function () { render(''); combo.classList.add('is-open'); });
    input.addEventListener('input', function () { render(input.value); combo.classList.add('is-open'); });
    document.addEventListener('click', function (e) {
      if (!combo.contains(e.target)) combo.classList.remove('is-open');
    });
  }

  var CLIENTS = ['Internal', 'SAURABH BHARDWAJ', 'SAURABH BHARDWAJ HUF', 'THE GOLD REALTY',
    'Law seva management private limited', 'PERFECT PAIR', 'TATA MOTORS PASSENGER VEHICLES LIMITED', 'Saksham'];
  var CATEGORIES = ['Accounts', 'Agreements & Resolutions', 'Application', 'Audit', 'Deed', 'Finance', 'Franchisee', 'GST', 'General'];
  var DOC_TYPES = ['NOC - Company', 'Engagement letter for Tax Audit', 'Letter for Account Opening',
    'Bookkeeping Services Agreement', 'Current Account Bank Statement', 'Savings Account Bank Statement',
    'NDA – Non Disclosure Agreement', 'Service Agreement'];

  initCombo('scdClientCombo', 'scdClientInput', 'scdClientMenu', CLIENTS);
  initCombo('scdCatCombo', 'scdCatInput', 'scdCatMenu', CATEGORIES);
  initCombo('scdDocTypeCombo', 'scdDocTypeInput', 'scdDocTypeMenu', DOC_TYPES);
  initCombo('scdCustomCatCombo', 'scdCustomCatInput', 'scdCustomCatMenu', CATEGORIES);

  /* ── Tab 2: View table data ── */
  var VIEW_DATA = [
    { client: '--', name: 'Partnership Deed : 3 partners_302184', on: '19/08/2026', by: '--', cat: 'Deed', sub: 'Partnership Firm', type: 'Partnership Deed : 3 partners' },
    { client: 'THE GOLD REALTY', name: 'Partnership Deed : 4 partners_887121', on: '18/08/2026', by: '123', cat: 'Deed', sub: 'Partnership Firm', type: 'Partnership Deed : 4 partners' },
    { client: '--', name: 'Partnership Deed : 4 partners_502551', on: '18/08/2026', by: 'Dev Aggarwal', cat: 'Deed', sub: 'Partnership Firm', type: 'Partnership Deed : 4 partners' },
    { client: '--', name: 'SH-1 : Share Certificate_160378', on: '18/08/2026', by: '--', cat: 'Agreements & Resolutions', sub: 'CA Certificate', type: 'SH-1 : Share Certificate' },
    { client: '--', name: 'Partnership Deed : 4 partners_494896', on: '18/08/2026', by: '--', cat: 'Deed', sub: 'Partnership Firm', type: 'Partnership Deed : 4 partners' },
    { client: '--', name: 'Offer of Employment_932007', on: '18/08/2026', by: '--', cat: 'HR', sub: 'Offer Letter', type: 'Offer of Employment' },
    { client: '--', name: 'Partnership Deed : 4 partners_987766', on: '17/08/2026', by: '--', cat: 'Deed', sub: 'Partnership Firm', type: 'Partnership Deed : 4 partners' },
    { client: 'THE GOLD REALTY', name: 'NET WORTH Certificate_707890', on: '17/08/2026', by: '--', cat: 'Agreements & Resolutions', sub: 'CA Certificate', type: 'NET WORTH Certificate' },
    { client: 'THE GOLD REALTY', name: 'Partnership Deed : 4 partners_304941', on: '17/08/2026', by: '--', cat: 'Deed', sub: 'Partnership Firm', type: 'Partnership Deed : 4 partners' }
  ];

  var ICO_MAIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
  var ICO_WA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5a8.5 8.5 0 01-12.7 7.4L4 20l1.2-3.2A8.5 8.5 0 1120 11.5z"/><path d="M9.2 9.6c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.4.5c-.1.1-.1.3 0 .4.4.7 1.1 1.4 1.8 1.8.2.1.3.1.5 0l.6-.4c.2-.1.4-.1.6 0l1.5.8c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.5.3-1.2.5-1.9.4-1.8-.2-3.5-1.2-4.7-2.5-1.1-1.2-1.9-2.8-2-4.5 0-.7.2-1.3.5-1.8z"/></svg>';
  var ICO_DL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v10"/><path d="M8 10l4 4 4-4"/><path d="M5 18h14"/></svg>';
  var ICO_DEL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/><path d="M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12"/><path d="M10 11v6M14 11v6"/></svg>';
  var ICO_EDIT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>';

  function actionBtns() {
    return '<div class="scd-actions">' +
      '<button type="button" class="scd-act scd-act--mail" title="Email" aria-label="Email">' + ICO_MAIL + '</button>' +
      '<button type="button" class="scd-act scd-act--wa" title="WhatsApp" aria-label="WhatsApp">' + ICO_WA + '</button>' +
      '<button type="button" class="scd-act scd-act--dl" title="Download" aria-label="Download">' + ICO_DL + '</button>' +
      '<button type="button" class="scd-act scd-act--del" title="Delete" aria-label="Delete">' + ICO_DEL + '</button>' +
      '<button type="button" class="scd-act scd-act--edit" title="Edit" aria-label="Edit">' + ICO_EDIT + '</button>' +
      '</div>';
  }

  var viewBody = document.getElementById('scdViewBody');
  function renderViewTable() {
    viewBody.innerHTML = '';
    VIEW_DATA.forEach(function (r, i) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + (i + 1) + '</td><td>' + r.client + '</td><td>' + r.name + '</td>' +
        '<td>' + r.on + '</td><td>' + r.by + '</td><td>' + r.cat + '</td>' +
        '<td>' + r.sub + '</td><td>' + r.type + '</td>' +
        '<td>' + actionBtns() + '</td>';
      viewBody.appendChild(tr);
    });
  }
  renderViewTable();

  /* ── Tab 3: Word count ── */
  var editor = document.getElementById('scdEditor');
  var wordCount = document.getElementById('scdWordCount');
  if (editor && wordCount) {
    editor.addEventListener('input', function () {
      var text = editor.innerText.trim();
      var count = text ? text.split(/\s+/).length : 0;
      wordCount.textContent = count + ' words';
    });
  }

  /* Upload button */
  var uploadBtn = document.getElementById('scdUploadBtn');
  var uploadFile = document.getElementById('scdUploadFile');
  if (uploadBtn && uploadFile) {
    uploadBtn.addEventListener('click', function () { uploadFile.click(); });
  }

  /* Save buttons */
  document.querySelectorAll('.scd-save').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (window.DashboardShell) DashboardShell.toast('Saved', 'Document saved successfully.');
    });
  });
})();
