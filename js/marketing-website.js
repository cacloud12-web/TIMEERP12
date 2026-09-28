(function () {
  'use strict';

  var LABELS = {
    home: 'Home Page',
    services: 'Services',
    about: 'About Us',
    events: 'Events'
  };

  var clock = document.getElementById('mwsTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  var activeInput = document.getElementById('mwsActiveInput');
  if (activeInput) {
    activeInput.addEventListener('change', function () {
      var on = activeInput.checked;
      if (window.DashboardShell) {
        DashboardShell.toast('Website', on ? 'Website is now active.' : 'Website is now inactive.');
      }
    });
  }

  document.querySelectorAll('.hub-card').forEach(function (card) {
    if (card.tagName === 'A' && card.getAttribute('href') && card.getAttribute('href') !== '#') return;
    card.addEventListener('click', function () {
      var key = card.getAttribute('data-card');
      var label = LABELS[key] || 'Website';
      if (window.DashboardShell) DashboardShell.toast(label, label + ' page will open here.');
    });
  });
})();
