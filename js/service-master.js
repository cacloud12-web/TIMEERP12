/**
 * Service Master page
 */
(function() {
  'use strict';

  var clock = document.getElementById('dvTopClock');
  function tick() {
    if (!clock) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
    var ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
    clock.textContent = h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + ' ' + ap;
  }
  tick(); setInterval(tick, 1000);

  var PERSON_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';

  var ACTIVE_SERVICES = [
    { name: '24G Return' }, { name: 'Accounting' }, { name: 'Accounting 100', color: 'green' },
    { name: 'Account Review' }, { name: 'AD Code' },
    { name: 'Agreement - Consulta...' }, { name: 'Agreement - Franchis...' }, { name: 'Agreement - Sharehol...' },
    { name: 'Agreement - Vendor A...' }, { name: 'Annual Tax audit' },
    { name: 'APEDA License' }, { name: 'Assurance', color: 'brown' }, { name: 'Audit' },
    { name: 'AUDIT-22', color: 'orange' }, { name: 'AUDIT' },
    { name: 'Audit 1000', color: 'blue' }, { name: 'Audit Work', color: 'beige' }, { name: 'Bank' },
    { name: 'Bank Audit 2', color: 'peach' }, { name: 'bank audit Ankit', color: 'blue' }
  ];

  var INACTIVE_SERVICES = [
    { name: '10BDD' }, { name: '12A/80G Registration' }, { name: 'ACCOUNT FEES' }, { name: 'Accounts' },
    { name: 'BOOK KEEPING', color: 'orange-solid' }, { name: 'Changes in Pvt Ltd/L...' }, { name: 'HUF' },
    { name: 'ITR' }, { name: 'LABOUR LICENSE' }, { name: 'PASARA License' }, { name: 'Power of Attorney' },
    { name: 'Sexual Harassment Pr...' }, { name: 'Tax income Audit Mon...', color: 'slate' }, { name: 'TDS Litigation' }
  ];

  var grid = document.getElementById('smGrid');
  var boardsLabel = document.getElementById('smBoardsLabel');
  var searchInput = document.getElementById('smSearch');
  var tabs = document.querySelectorAll('.sm-tab');
  var currentTab = 'active';
  var currentList = ACTIVE_SERVICES;

  function renderCard(svc) {
    var cls = 'sm-card' + (svc.color ? ' has-color sm-card--' + svc.color : '');
    var safe = encodeURIComponent(svc.name);
    return '<div class="' + cls + '" data-name="' + svc.name.toLowerCase() + '" data-service="' + svc.name.replace(/"/g, '&quot;') + '">' +
      '<div class="sm-card-head">' +
        '<a class="sm-card-title" href="service_subservices.html?name=' + safe + '">' + svc.name + '</a>' +
        '<div class="sm-card-more-wrap">' +
          '<button type="button" class="sm-card-more" title="More" aria-label="More" aria-expanded="false">···</button>' +
          '<div class="sm-card-more-dd" hidden role="menu">' +
            '<button type="button" class="sm-card-more-dd__item" data-action="edit" role="menuitem">Edit</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<span class="sm-card-person" aria-hidden="true">' + PERSON_SVG + '</span>' +
    '</div>';
  }

  function renderGrid(list, filter) {
    if (!grid) return;
    var q = (filter || '').trim().toLowerCase();
    var items = list.filter(function(s) { return !q || s.name.toLowerCase().indexOf(q) >= 0; });
    grid.innerHTML = items.map(renderCard).join('');
  }

  /* Card ··· → Edit menu */
  if (grid) {
    grid.addEventListener('click', function(e) {
      var moreBtn = e.target.closest('.sm-card-more');
      if (moreBtn) {
        e.preventDefault();
        e.stopPropagation();
        var wrap = moreBtn.closest('.sm-card-more-wrap');
        var dd = wrap ? wrap.querySelector('.sm-card-more-dd') : null;
        document.querySelectorAll('.sm-card-more-dd').forEach(function(d) {
          if (d !== dd) d.hidden = true;
        });
        document.querySelectorAll('.sm-card-more').forEach(function(b) {
          if (b !== moreBtn) b.setAttribute('aria-expanded', 'false');
        });
        if (dd) {
          var open = dd.hidden;
          dd.hidden = !open;
          moreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
        return;
      }
      var editItem = e.target.closest('.sm-card-more-dd__item[data-action="edit"]');
      if (editItem) {
        e.preventDefault();
        e.stopPropagation();
        var card = editItem.closest('.sm-card');
        var name = card ? card.getAttribute('data-service') : '';
        window.location.href = 'service_subservices.html?name=' + encodeURIComponent(name || 'Service');
      }
    });
  }
  document.addEventListener('click', function() {
    document.querySelectorAll('.sm-card-more-dd').forEach(function(d) { d.hidden = true; });
    document.querySelectorAll('.sm-card-more').forEach(function(b) { b.setAttribute('aria-expanded', 'false'); });
  });

  function setTab(tab) {
    currentTab = tab;
    tabs.forEach(function(t) { t.classList.toggle('is-active', t.dataset.tab === tab); });
    if (tab === 'active') {
      currentList = ACTIVE_SERVICES;
      if (boardsLabel) boardsLabel.textContent = 'MY BOARDS (142)';
    } else {
      currentList = INACTIVE_SERVICES;
      if (boardsLabel) boardsLabel.textContent = 'MY BOARDS (14)';
    }
    if (searchInput) searchInput.value = '';
    renderGrid(currentList);
  }

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() { setTab(tab.dataset.tab); });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      renderGrid(currentList, searchInput.value);
    });
  }

  /* Templates modal */
  var templatesModal = document.getElementById('templatesModal');
  var tplTrack = document.getElementById('tplTrack');
  var tplPage = 0;

  function openTemplatesModal() {
    if (!templatesModal) return;
    templatesModal.hidden = false;
    tplPage = 0;
    if (tplTrack) tplTrack.style.transform = 'translateX(0)';
  }
  function closeTemplatesModal() {
    if (templatesModal) templatesModal.hidden = true;
  }
  function goTplPage(dir) {
    tplPage = Math.max(0, Math.min(1, tplPage + dir));
    if (tplTrack) tplTrack.style.transform = 'translateX(-' + (tplPage * 50) + '%)';
  }

  var addBtn = document.getElementById('smAddBtn');
  var tplClose = document.getElementById('templatesModalClose');
  var tplPrev = document.getElementById('tplPrev');
  var tplNext = document.getElementById('tplNext');
  var tplScratch = document.getElementById('tplScratch');

  if (addBtn) addBtn.addEventListener('click', openTemplatesModal);
  if (tplClose) tplClose.addEventListener('click', closeTemplatesModal);
  if (tplPrev) tplPrev.addEventListener('click', function() { goTplPage(-1); });
  if (tplNext) tplNext.addEventListener('click', function() { goTplPage(1); });
  if (tplScratch) tplScratch.addEventListener('click', closeTemplatesModal);
  if (templatesModal) {
    templatesModal.addEventListener('click', function(e) {
      if (e.target === templatesModal) closeTemplatesModal();
    });
  }

  setTab('active');
})();
