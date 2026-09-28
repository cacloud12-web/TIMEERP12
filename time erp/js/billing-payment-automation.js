/**
 * TIME ERP — Billing & Payment Automation page interactions
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Reveal on scroll */
  var reveals = document.querySelectorAll('.bpa-reveal');
  if (reveals.length && !reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Count-up metrics */
  function parseMetric(text) {
    var raw = String(text || '').trim();
    var prefix = '';
    var suffix = '';
    var num = raw;
    if (raw.charAt(0) === '₹') { prefix = '₹'; num = raw.slice(1); }
    if (/L$/i.test(num)) { suffix = 'L'; num = num.replace(/L$/i, ''); }
    if (/%$/.test(num)) { suffix = '%'; num = num.replace(/%$/, ''); }
    var value = parseFloat(num.replace(/,/g, ''));
    if (isNaN(value)) return null;
    return { prefix: prefix, suffix: suffix, value: value, decimals: String(num).indexOf('.') >= 0 ? 2 : 0 };
  }

  function formatMetric(meta, current) {
    var n = meta.decimals ? current.toFixed(meta.decimals) : String(Math.round(current));
    return meta.prefix + n + meta.suffix;
  }

  function animateCount(el) {
    var meta = parseMetric(el.getAttribute('data-count') || el.textContent);
    if (!meta) return;
    if (reduceMotion) {
      el.textContent = formatMetric(meta, meta.value);
      return;
    }
    var start = performance.now();
    var dur = 1100;
    function frame(now) {
      var t = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = formatMetric(meta, meta.value * eased);
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = formatMetric(meta, meta.value);
    }
    requestAnimationFrame(frame);
  }

  var metrics = document.querySelectorAll('[data-count]');
  if (metrics.length && 'IntersectionObserver' in window) {
    var mio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        mio.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    metrics.forEach(function (el) { mio.observe(el); });
  }

  /* Smooth in-page anchors */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });
})();
