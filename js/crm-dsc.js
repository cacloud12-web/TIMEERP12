(function () {
  'use strict';

  var LISTS = {
    client: ['law seva management private limited', 'SAURABH BHARDWAJ', 'Internal', 'THE GOLD REALTY', 'PERFECT PAIR'],
    people: ['Tarun Gaur', 'Suhanshi Rawat', 'SONIYA KASHYAP', 'Hardik rawat', 'SIMRAN KASHYAP', 'Aastha Tyagi', 'Shivam Kumar', 'Aakash'],
    type: ['Class 1', 'Class 2', 'Class 3', 'DGFT', 'IEC'],
    branch: ['CA CloudDesk', 'Bluemon Wealth Management', 'Law Seva Management Private Limited', 'saurabh bharadwaj'],
    signer: ['Kamal Kant Sharma', 'Saurabh Bhardwaj'],
    category: ['DSC Made By Us', 'Dsc Made By Client', 'Other']
  };
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function closeAllCombos(except) {
    document.querySelectorAll('.dsc-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
    document.querySelectorAll('.dsc-date.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }

  function bindCombo(combo) {
    var key = combo.getAttribute('data-combo');
    var list = LISTS[key] || [];
    var input = combo.querySelector('input');
    var menu = combo.querySelector('.dsc-combo__menu');
    function render(q) {
      var qq = (q || '').toLowerCase();
      menu.innerHTML = list.filter(function (n) { return !qq || n.toLowerCase().indexOf(qq) !== -1; })
        .map(function (n) { return '<div class="dsc-combo__item" role="option">' + n + '</div>'; }).join('') ||
        '<div class="dsc-combo__item">No matches</div>';
    }
    function open() { render(input.value); closeAllCombos(combo); combo.classList.add('is-open'); }
    input.addEventListener('focus', open);
    input.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    input.addEventListener('input', function () { render(input.value); combo.classList.add('is-open'); });
    menu.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.dsc-combo__item');
      if (!item || item.textContent === 'No matches') return;
      e.preventDefault();
      if (combo.classList.contains('dsc-combo--tags')) {
        var chip = document.createElement('span');
        chip.className = 'dsc-chip';
        chip.innerHTML = item.textContent + '<button type="button" class="dsc-chip__x" aria-label="Remove">×</button>';
        combo.querySelector('.dsc-combo__box').insertBefore(chip, input);
        input.value = '';
      } else {
        input.value = item.textContent;
      }
      combo.classList.remove('is-open');
    });
  }

  function pad(n) { return String(n).padStart(2, '0'); }
  function fmt(d) {
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' +
      pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }

  function bindDate(wrap) {
    var input = wrap.querySelector('input');
    var picker = document.createElement('div');
    picker.className = 'dsc-picker';
    wrap.appendChild(picker);
    var view = new Date(2026, 7, 18);
    var sel = { y: 2026, m: 7, d: 18, h: 0, mi: 0, s: 0 };

    function daysIn(y, m) { return new Date(y, m + 1, 0).getDate(); }
    function render() {
      var y = view.getFullYear(), m = view.getMonth();
      var first = new Date(y, m, 1).getDay();
      var dim = daysIn(y, m);
      var prevDim = daysIn(y, m - 1);
      var cells = [];
      var i;
      for (i = 0; i < first; i++) cells.push({ n: prevDim - first + 1 + i, muted: true });
      for (i = 1; i <= dim; i++) cells.push({ n: i, muted: false });
      while (cells.length % 7) cells.push({ n: cells.length, muted: true, dummy: true });
      var dayHtml = cells.map(function (c, idx) {
        if (c.dummy && c.muted && idx >= first + dim) {
          var n = idx - (first + dim) + 1;
          return '<button type="button" class="dsc-picker__day is-muted" data-out="1" data-n="' + n + '">' + n + '</button>';
        }
        var on = !c.muted && c.n === sel.d && y === sel.y && m === sel.m;
        return '<button type="button" class="dsc-picker__day' + (c.muted ? ' is-muted' : '') + (on ? ' is-sel' : '') + '" data-n="' + c.n + '"' + (c.muted ? ' data-out="1"' : '') + '>' + c.n + '</button>';
      }).join('');
      function col(max, val, kind) {
        var html = '';
        for (i = 0; i <= max; i++) html += '<button type="button" data-t="' + kind + '" data-v="' + i + '"' + (i === val ? ' class="is-sel"' : '') + '>' + pad(i) + '</button>';
        return '<div class="dsc-picker__col">' + html + '</div>';
      }
      picker.innerHTML =
        '<div class="dsc-picker__cal">' +
          '<div class="dsc-picker__nav">' +
            '<span><button type="button" data-nav="py">&laquo;</button><button type="button" data-nav="pm">&lsaquo;</button></span>' +
            '<span>' + MONTHS[m] + ' ' + y + '</span>' +
            '<span><button type="button" data-nav="nm">&rsaquo;</button><button type="button" data-nav="ny">&raquo;</button></span>' +
          '</div>' +
          '<div class="dsc-picker__week"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>' +
          '<div class="dsc-picker__days">' + dayHtml + '</div>' +
        '</div>' +
        '<div class="dsc-picker__time">' + col(23, sel.h, 'h') + col(59, sel.mi, 'mi') + col(59, sel.s, 's') + '</div>' +
        '<div class="dsc-picker__foot"><button type="button" class="dsc-picker__now" data-now>Now</button><button type="button" class="dsc-btn dsc-btn--primary" data-ok>OK</button></div>';
    }
    function open() { render(); closeAllCombos(wrap); wrap.classList.add('is-open'); }
    wrap.querySelector('.dsc-date__icon').addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); open(); });
    input.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    picker.addEventListener('click', function (e) {
      e.stopPropagation();
      var nav = e.target.getAttribute('data-nav');
      if (nav === 'py') view.setFullYear(view.getFullYear() - 1);
      else if (nav === 'ny') view.setFullYear(view.getFullYear() + 1);
      else if (nav === 'pm') view.setMonth(view.getMonth() - 1);
      else if (nav === 'nm') view.setMonth(view.getMonth() + 1);
      if (nav) { render(); return; }
      var day = e.target.closest('.dsc-picker__day');
      if (day && !day.getAttribute('data-out')) {
        sel.y = view.getFullYear(); sel.m = view.getMonth(); sel.d = Number(day.getAttribute('data-n'));
        render(); return;
      }
      var t = e.target.getAttribute('data-t');
      if (t) { sel[t] = Number(e.target.getAttribute('data-v')); render(); return; }
      if (e.target.hasAttribute('data-now')) {
        var n = new Date();
        view = new Date(n); sel = { y: n.getFullYear(), m: n.getMonth(), d: n.getDate(), h: n.getHours(), mi: n.getMinutes(), s: n.getSeconds() };
        render(); return;
      }
      if (e.target.hasAttribute('data-ok')) {
        input.value = fmt(new Date(sel.y, sel.m, sel.d, sel.h, sel.mi, sel.s));
        wrap.classList.remove('is-open');
      }
    });
  }

  document.querySelectorAll('[data-combo]').forEach(bindCombo);
  document.querySelectorAll('[data-date]').forEach(bindDate);
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dsc-combo') && !e.target.closest('.dsc-date')) closeAllCombos();
  });

  document.getElementById('dscAddView').addEventListener('click', function (e) {
    var x = e.target.closest('.dsc-chip__x');
    if (x) x.parentNode.remove();
  });
})();
