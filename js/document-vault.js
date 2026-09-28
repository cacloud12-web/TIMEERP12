(function () {
  'use strict';

  var clock = document.getElementById('dvTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  document.querySelectorAll('.task-card[data-card]').forEach(function (card) {
    if (card.getAttribute('href') && card.getAttribute('href') !== '#') return;
    card.addEventListener('click', function (e) {
      e.preventDefault();
      var label = card.querySelector('.task-card__label');
      var name = label ? label.textContent.trim() : 'Document Vault';
      if (window.DashboardShell) DashboardShell.toast(name, name + ' opens here.');
    });
  });
})();
