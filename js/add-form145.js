/* TIME ERP — Add Form 145 */
(function () {
  'use strict';

  (function tick() {
    var el = document.getElementById('afTopClock'); if (!el) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
    setTimeout(tick, 30000);
  })();

  var CLIENTS = ['Internal','SAURABH BHARDWAJ','SAURABH BHARDWAJ H...','THE GOLD REALTY','law seva management pri...','PERFECT PAIR','TATA MOTORS PASSENG...','Saksham'];
  var combo = document.getElementById('afClientCombo');
  if (combo) {
    var inp = combo.querySelector('.af-combo__input'), list = document.getElementById('afClientList');
    function render(f) {
      var q = (f || '').toLowerCase(); list.innerHTML = '';
      CLIENTS.forEach(function (c) {
        if (q && c.toLowerCase().indexOf(q) === -1) return;
        var d = document.createElement('div'); d.className = 'af-combo__opt'; d.textContent = c;
        d.addEventListener('click', function () { inp.value = c; list.classList.remove('open'); });
        list.appendChild(d);
      });
    }
    inp.addEventListener('focus', function () { render(inp.value); list.classList.add('open'); });
    inp.addEventListener('input', function () { render(inp.value); list.classList.add('open'); });
    document.addEventListener('click', function (e) { if (!combo.contains(e.target)) list.classList.remove('open'); });
  }
})();
