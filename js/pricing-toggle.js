/**
 * TIME ERP — Pricing page: 1Y / 3Y term + INR ↔ USD convert.
 * Mirrored inline in price.html for live hosting reliability.
 */
(function () {
  'use strict';

  var INR_PER_USD = 3000 / 31.27; /* ₹3,000 ≈ $31.27 */
  var TERM_TEXT = { '1': '1 Year plan', '3': '3 Year plan' };
  var PERIOD_TEXT = {
    '1': '/year, per employee',
    '3': 'prepaid for 3 years, per employee'
  };

  function formatInr(n) {
    try { return '₹' + Number(n).toLocaleString('en-IN'); }
    catch (e) { return '₹' + Number(n).toLocaleString(); }
  }

  function formatUsd(amountInr) {
    var usd = Number(amountInr) / INR_PER_USD;
    try { return '$' + usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
    catch (e) { return '$' + usd.toFixed(2); }
  }

  function initPricing() {
    if (window.__TIMEERP_PRICING_READY) return true;

    var termBtns = document.querySelectorAll('.pricing-term__btn');
    var currencyBtns = document.querySelectorAll('.pricing-currency__btn');
    var priceEls = document.querySelectorAll('.pricing-card__price');
    var termLabels = document.querySelectorAll('.pricing-card__term-label');
    var periodEls = document.querySelectorAll('.pricing-card__price-period');
    if (!termBtns.length || !priceEls.length) return false;

    var currentTerm = '1';
    var currentCurrency = 'INR';

    function fmt(n) {
      return currentCurrency === 'USD' ? formatUsd(n) : formatInr(n);
    }

    function renderPrices() {
      priceEls.forEach(function (el) {
        var price = Number(el.getAttribute('data-price-' + currentTerm)) || 0;
        el.classList.add('is-updating');
        window.setTimeout(function () {
          el.textContent = fmt(price);
          el.classList.remove('is-updating');
        }, 150);
      });
      termLabels.forEach(function (l) { l.textContent = '(' + TERM_TEXT[currentTerm] + ')'; });
      periodEls.forEach(function (p) { p.textContent = PERIOD_TEXT[currentTerm]; });
    }

    termBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentTerm = btn.getAttribute('data-term');
        termBtns.forEach(function (b) {
          var on = b.getAttribute('data-term') === currentTerm;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        renderPrices();
      });
    });

    currencyBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentCurrency = btn.getAttribute('data-currency') || 'INR';
        currencyBtns.forEach(function (b) {
          var on = b.getAttribute('data-currency') === currentCurrency;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        renderPrices();
      });
    });

    window.__TIMEERP_PRICING_READY = true;
    renderPrices();
    return true;
  }

  function boot() { initPricing(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.TimeERPPricing = { init: initPricing };
})();
