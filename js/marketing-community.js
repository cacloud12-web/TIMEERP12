(function () {
  'use strict';

  var LABELS = {
    dashboard: 'Dashboard Community',
    offers: 'My Offers',
    transferred: 'Transferred Task',
    received: 'Received Task',
    policy: 'Community Policy'
  };

  var clock = document.getElementById('mcmTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  document.querySelectorAll('.mcm-card').forEach(function (card) {
    if (card.tagName === 'A') return;
    card.addEventListener('click', function () {
      var key = card.getAttribute('data-card');
      var label = LABELS[key] || 'Community';
      if (window.DashboardShell) DashboardShell.toast(label, label + ' page will open here.');
    });
  });
})();
