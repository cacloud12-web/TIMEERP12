/**
 * Benefits section — auto-cycle items + layer rings visual
 */
(function () {
  'use strict';

  var section = document.getElementById('benefits');
  if (!section) return;

  var items = section.querySelectorAll('.b-item');
  var layersHost = document.getElementById('benefit-layers');
  var svgElement = null;
  var current = 0;
  var timer = null;
  var cycleMs = 5000;

  if (!items.length) return;

  function clampIndex(index) {
    return ((index % items.length) + items.length) % items.length;
  }

  function findSvg() {
    if (svgElement) return svgElement;
    if (!layersHost) return null;

    if (layersHost.tagName === 'OBJECT' && layersHost.contentDocument) {
      svgElement = layersHost.contentDocument.querySelector('svg');
      return svgElement;
    }

    svgElement = layersHost.querySelector('svg');
    return svgElement;
  }

  function updateRingClasses(index) {
    var svg = findSvg();
    if (!svg) return;

    ['first-ring', 'second-ring', 'third-ring', 'fourth-ring'].forEach(function (cls, i) {
      var ring = svg.querySelector('.' + cls);
      if (ring) ring.classList.toggle('active', i === index);
    });

    svg.classList.toggle('rings-2-3-active', index === 2 || index === 3);
  }

  function activate(index) {
    index = clampIndex(index);
    items.forEach(function (el) {
      el.classList.remove('active');
    });
    items[index].classList.add('active');
    current = index;
    updateRingClasses(index);
  }

  function startCycle() {
    clearInterval(timer);
    timer = setInterval(function () {
      activate(current + 1);
    }, cycleMs);
  }

  function injectSvg(markup) {
    if (!layersHost || layersHost.querySelector('svg')) return;
    layersHost.insertAdjacentHTML('afterbegin', markup);
    svgElement = layersHost.querySelector('svg');
    if (!svgElement) return;
    svgElement.removeAttribute('id');
    svgElement.setAttribute('aria-hidden', 'true');
    updateRingClasses(current);
  }

  function loadSvg() {
    if (!layersHost || layersHost.querySelector('svg')) return;

    var src = layersHost.getAttribute('data-src') || layersHost.getAttribute('data');
    if (!src) return;

    fetch(src)
      .then(function (res) {
        if (!res.ok) throw new Error('SVG load failed');
        return res.text();
      })
      .then(injectSvg)
      .catch(function () {});
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () {
      activate(i);
      startCycle();
    });
  });

  activate(0);
  startCycle();

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      clearInterval(timer);
      timer = null;
    } else if (!timer) {
      startCycle();
    }
  });

  if (!layersHost) return;

  if (layersHost.tagName === 'OBJECT') {
    layersHost.addEventListener('load', function () {
      svgElement = null;
      findSvg();
      updateRingClasses(current);
    });
    if (!findSvg()) loadSvg();
    else updateRingClasses(current);
    return;
  }

  loadSvg();
})();
