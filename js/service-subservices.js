/**
 * Service sub-services detail page
 */
(function () {
  'use strict';

  var clock = document.getElementById('dvTopClock');
  function tick() {
    if (!clock) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
    var ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    clock.textContent = h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + ' ' + ap;
  }
  tick();
  setInterval(tick, 1000);

  function getParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name) || '';
    } catch (e) {
      return '';
    }
  }

  var serviceName = getParam('name') || '24G Return';
  var from = getParam('from') || 'service_master.html';
  var boardColor = '#ffe8d6';

  var title = document.getElementById('ssTitle');
  var boardName = document.getElementById('ssBoardName');
  var rowName = document.getElementById('ssRowName');
  var boardCard = document.getElementById('ssBoardCard');
  var back = document.getElementById('ssBack');
  var nameInput = document.getElementById('ssBoardNameInput');

  function syncNames(name) {
    serviceName = name || serviceName;
    if (title) title.textContent = serviceName + ' – Sub-services';
    if (boardName) boardName.textContent = serviceName;
    if (rowName) rowName.textContent = serviceName;
    if (nameInput) nameInput.value = serviceName;
  }
  syncNames(serviceName);

  if (back) {
    if (from.indexOf('task_management') !== -1) back.href = 'task_management.html';
    else back.href = 'service_master.html';
  }

  /* Tabs */
  var activeWrap = document.getElementById('ssTableWrap');
  var hiddenWrap = document.getElementById('ssHiddenWrap');
  document.querySelectorAll('.ss-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.ss-tab').forEach(function (t) {
        t.classList.toggle('is-active', t === tab);
      });
      var isHidden = tab.dataset.tab === 'hidden';
      if (activeWrap) activeWrap.hidden = isHidden;
      if (hiddenWrap) hiddenWrap.hidden = !isHidden;
    });
  });

  /* Board card ··· → Edit / Hide */
  var moreWrap = document.getElementById('ssBoardMoreWrap');
  var moreBtn = document.getElementById('ssBoardMore');
  var moreDD = document.getElementById('ssBoardMoreDD');
  var editBtn = document.getElementById('ssBoardEdit');
  var hideBtn = document.getElementById('ssBoardHide');

  function openMore() {
    if (!moreDD || !moreBtn) return;
    moreDD.hidden = false;
    moreBtn.setAttribute('aria-expanded', 'true');
  }
  function closeMore() {
    if (!moreDD || !moreBtn) return;
    moreDD.hidden = true;
    moreBtn.setAttribute('aria-expanded', 'false');
  }

  if (moreBtn && moreDD) {
    moreBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (moreDD.hidden) openMore();
      else closeMore();
    });
    moreDD.addEventListener('click', function (e) { e.stopPropagation(); });
  }

  /* Edit Workboard modal */
  var modal = document.getElementById('ssEditModal');
  var closeBtn = document.getElementById('ssEditClose');
  var updateBtn = document.getElementById('ssEditUpdate');
  var colors = document.getElementById('ssColors');

  function openEditModal() {
    closeMore();
    if (nameInput) nameInput.value = serviceName;
    if (boardCard) {
      var bg = boardCard.style.backgroundColor;
      if (bg) {
        /* keep selected swatch in sync when possible */
      }
    }
    if (colors) {
      colors.querySelectorAll('.ss-color').forEach(function (c) {
        c.classList.toggle('is-selected', c.getAttribute('data-color') === boardColor);
      });
    }
    if (modal) {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
    if (nameInput) setTimeout(function () { nameInput.focus(); nameInput.select(); }, 40);
  }
  function closeEditModal() {
    if (modal) modal.hidden = true;
    document.body.style.overflow = '';
  }

  if (editBtn) editBtn.addEventListener('click', openEditModal);
  if (hideBtn) {
    hideBtn.addEventListener('click', function () {
      closeMore();
      if (boardCard) boardCard.classList.add('is-hidden');
      var label = document.querySelector('.ss-boards-label');
      if (label) label.textContent = 'MY BOARDS (0)';
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeEditModal);
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeEditModal();
    });
  }
  if (colors) {
    colors.addEventListener('click', function (e) {
      var swatch = e.target.closest('.ss-color');
      if (!swatch) return;
      colors.querySelectorAll('.ss-color').forEach(function (c) { c.classList.remove('is-selected'); });
      swatch.classList.add('is-selected');
      boardColor = swatch.getAttribute('data-color') || boardColor;
    });
  }
  if (updateBtn) {
    updateBtn.addEventListener('click', function () {
      var next = nameInput ? nameInput.value.trim() : serviceName;
      if (!next) {
        if (nameInput) nameInput.focus();
        return;
      }
      syncNames(next);
      if (boardCard) {
        boardCard.style.background = boardColor;
        boardCard.style.borderColor = boardColor;
      }
      closeEditModal();
    });
  }

  document.addEventListener('click', function (e) {
    if (moreWrap && moreWrap.contains(e.target)) return;
    closeMore();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && !modal.hidden) closeEditModal();
  });

  var addBtn = document.getElementById('ssAddSub');
  if (addBtn) {
    addBtn.addEventListener('click', function () {
      window.alert('Add sub-service for “' + serviceName + '”');
    });
  }
})();
