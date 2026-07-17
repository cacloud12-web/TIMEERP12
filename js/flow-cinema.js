/**
 * Manufacturing workflow — Zoho image-gallery (exact scroll pan).
 * https://www.zoho.com/erp/js/vertical/image-gallery-section.js
 */
(function () {
  'use strict';

  var wrapper = document.getElementById('flowGalleryWrapper');
  var track = document.getElementById('imageGalleryTrack');
  var progressBar = document.getElementById('imageProgressBar');
  var maxTranslate = 0;

  if (!wrapper || !track || !progressBar) return;

  function calculate() {
    var viewport = track.parentElement;
    if (!viewport) return;
    maxTranslate = Math.max(0, track.scrollWidth - viewport.offsetWidth + 120);
  }

  function onScroll() {
    var rect = wrapper.getBoundingClientRect();
    var scrollable = rect.height - window.innerHeight;

    if (rect.top > 0) {
      track.style.transform = 'translate3d(0, 0, 0)';
      progressBar.style.width = '0%';
      return;
    }
    if (rect.bottom < window.innerHeight - 100) return;

    var progress = Math.min(1, Math.max(0, Math.abs(rect.top) / scrollable));
    var translate = progress * maxTranslate;

    track.style.transform = 'translate3d(' + (-translate) + 'px, 0, 0)';
    progressBar.style.width = (progress * 100) + '%';
  }

  window.addEventListener('load', function () {
    calculate();
    onScroll();
  });
  window.addEventListener('resize', function () {
    calculate();
    onScroll();
  });
  window.addEventListener('scroll', onScroll, { passive: true });
})();
