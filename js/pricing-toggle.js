(function () {
  'use strict';

  var termBtns = document.querySelectorAll('.pricing-term__btn');
  var priceEls = document.querySelectorAll('.pricing-card__price');
  var termLabels = document.querySelectorAll('.pricing-card__term-label');
  if (!termBtns.length || !priceEls.length) return;

  var termText = {
    '1': '1-year',
    '3': '3-year'
  };

  function formatRupee(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  }

  function setTerm(term) {
    termBtns.forEach(function (btn) {
      var active = btn.getAttribute('data-term') === term;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    priceEls.forEach(function (el) {
      var prices = JSON.parse(el.getAttribute('data-prices'));
      el.classList.add('is-updating');
      window.setTimeout(function () {
        el.textContent = formatRupee(prices[term]);
        el.classList.remove('is-updating');
      }, 60);
    });

    termLabels.forEach(function (label) {
      label.textContent = '(with a ' + termText[term] + ' commitment)';
    });
  }

  termBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTerm(btn.getAttribute('data-term'));
    });
  });
})();
