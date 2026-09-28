/**
 * TimeERP Watch Demo — Coming Soon video card.
 * No video file. Play / Watch Demo opens Coming Soon modal.
 */
(function () {
  'use strict';

  var card = document.getElementById('wdCard');
  var play = document.getElementById('wdPlay');
  var watch = document.getElementById('wdWatch');
  var details = document.getElementById('wdDetails');
  var detailPanel = document.getElementById('wdDetailPanel');
  var modal = document.getElementById('wdModal');

  function openModal() {
    if (!modal) return;
    modal.hidden = false;
    if (card) card.classList.add('is-active');
    var closeBtn = modal.querySelector('.wd-modal__close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    if (card) card.classList.remove('is-active');
    if (watch) watch.focus();
  }

  function setDetailsOpen(open) {
    if (!detailPanel || !details) return;
    if (open) {
      detailPanel.hidden = false;
      details.setAttribute('aria-expanded', 'true');
      details.textContent = 'Hide details';
      if (card) card.classList.add('is-active');
    } else {
      detailPanel.hidden = true;
      details.setAttribute('aria-expanded', 'false');
      details.textContent = 'Details';
      if (card && modal && modal.hidden) card.classList.remove('is-active');
    }
  }

  if (play) play.addEventListener('click', openModal);
  if (watch) watch.addEventListener('click', openModal);
  if (details) {
    details.addEventListener('click', function () {
      setDetailsOpen(detailPanel && detailPanel.hidden);
    });
  }

  if (modal) {
    modal.querySelectorAll('[data-wd-close]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (el.getAttribute('data-book-demo') == null) e.preventDefault();
        closeModal();
      });
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !modal || modal.hidden) return;
    var bookModal = document.getElementById('bookDemoModal');
    if (bookModal && bookModal.classList.contains('is-open')) return;
    closeModal();
  });
})();
