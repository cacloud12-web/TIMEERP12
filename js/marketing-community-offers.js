(function () {
  'use strict';

  var OFFERS = [
    { service: 'ROC & MCA', task: 'ROC', postedBy: 'raj singh & co.', validTill: '31/10/2024', time: '6 days', communityPrice: '3600', offerPrice: '3500', status: 'Pending' },
    { service: 'TDS FILING', task: 'TDS', postedBy: 'raj singh & co.', validTill: '31/10/2024', time: '1 days', communityPrice: '3600', offerPrice: '3500', status: 'Pending' }
  ];

  var clock = document.getElementById('mcoTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  function statusClass(s) {
    if (s === 'Approved') return 'approved';
    if (s === 'Rejected') return 'rejected';
    return 'pending';
  }

  function renderTable() {
    var tbody = document.getElementById('mcoTableBody');
    tbody.innerHTML = OFFERS.map(function (r) {
      return '<tr>' +
        '<td>' + r.service + '</td><td>' + r.task + '</td><td>' + r.postedBy + '</td>' +
        '<td>' + r.validTill + '</td><td>' + r.time + '</td>' +
        '<td>₹ ' + r.communityPrice + '</td><td>₹ ' + r.offerPrice + '</td>' +
        '<td><span class="mco-status mco-status--' + statusClass(r.status) + '">' + r.status + '</span></td></tr>';
    }).join('');
    var total = OFFERS.length;
    document.getElementById('mcoCount').textContent = total + ' / ' + total;
    document.getElementById('mcoPageTotal').textContent = '1';
    document.getElementById('mcoPageInput').value = '1';
  }

  renderTable();
})();
