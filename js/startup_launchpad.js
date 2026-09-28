/**
 * Startup Launch Pad — UI interactions (parallax, journey, challenges, workflow, FAQ)
 */
(function () {
  'use strict';

  /* Hero parallax */
  var stage = document.getElementById('slpHeroStage');
  if (stage && window.matchMedia('(pointer:fine)').matches) {
    var layers = stage.querySelectorAll('[data-parallax]');
    stage.addEventListener('mousemove', function (e) {
      var rect = stage.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      layers.forEach(function (el) {
        var d = parseFloat(el.getAttribute('data-parallax') || '10');
        el.style.transform = 'translate3d(' + (x * d) + 'px,' + (y * d) + 'px,0)';
      });
    });
    stage.addEventListener('mouseleave', function () {
      layers.forEach(function (el) { el.style.transform = ''; });
    });
  }

  /* Journey milestones — expand on focus/hover via class */
  var journeyItems = document.querySelectorAll('.slp-journey__item');
  journeyItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      journeyItems.forEach(function (i) { i.classList.remove('is-active'); });
      item.classList.add('is-active');
    });
    item.addEventListener('focusin', function () {
      journeyItems.forEach(function (i) { i.classList.remove('is-active'); });
      item.classList.add('is-active');
    });
  });
  if (journeyItems.length) journeyItems[0].classList.add('is-active');

  /* Challenge cards — tap to reveal solution on touch devices */
  document.querySelectorAll('.slp-challenge').forEach(function (card) {
    card.addEventListener('click', function () {
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      card.classList.toggle('is-open');
    });
  });

  /* Workflow nodes */
  var flow = document.getElementById('slpFlow');
  if (flow) {
    var flowNodes = flow.querySelectorAll('.slp-flow__node');
    flowNodes.forEach(function (node, idx) {
      node.addEventListener('mouseenter', function () {
        flowNodes.forEach(function (n, i) {
          n.classList.toggle('is-active', i === idx);
          n.classList.toggle('is-done', i < idx);
        });
        flow.querySelectorAll('.slp-flow__connector').forEach(function (c, i) {
          c.classList.toggle('is-active', i < idx);
        });
      });
    });
  }

  /* Final CTA — parallax layers */
  var cta = document.getElementById('slpCta');
  if (cta && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var layers = cta.querySelectorAll('[data-parallax-cta]');
    cta.addEventListener('mousemove', function (e) {
      var rect = cta.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      layers.forEach(function (el) {
        var strength = parseFloat(el.getAttribute('data-parallax-cta') || '12');
        var isDeco = el.classList.contains('slp-cta__deco');
        var tx = x * strength;
        var ty = y * (strength * 0.6);
        el.style.transform = isDeco
          ? 'translate(' + tx + 'px, calc(-50% + ' + ty + 'px))'
          : 'translate(' + tx + 'px, ' + ty + 'px)';
      });
    });
    cta.addEventListener('mouseleave', function () {
      layers.forEach(function (el) {
        el.style.transform = el.classList.contains('slp-cta__deco') ? 'translateY(-50%)' : '';
      });
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.slp-faq__item').forEach(function (item) {
    var btn = item.querySelector('.slp-faq__trigger');
    var panel = item.querySelector('.slp-faq__panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      var open = item.classList.contains('is-open');
      document.querySelectorAll('.slp-faq__item.is-open').forEach(function (other) {
        if (other === item) return;
        other.classList.remove('is-open');
        var ob = other.querySelector('.slp-faq__trigger');
        var op = other.querySelector('.slp-faq__panel');
        if (ob) ob.setAttribute('aria-expanded', 'false');
        if (op) op.style.maxHeight = null;
      });
      if (open) {
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
})();
