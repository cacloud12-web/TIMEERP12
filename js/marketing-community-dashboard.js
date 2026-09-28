(function () {
  'use strict';

  var SERVICES = [
    '24G Return', 'Accounting', 'Accounting 100', 'Account Review', 'AD Code',
    'Agreement – Consultancy Agreement', 'Agreement – Franchise Agreement',
    'Agreement – Shareholders Agreement', 'Labour License', 'Incorporation of Pvt Ltd / LLP',
    'RERA License', 'GST Registration', 'Company Registration Service'
  ];

  var MY_POSTS = [
    {
      title: 'Labour License - Shop & Commercial Estb',
      subtitle: 'Labour License in Noida Constitution - Proprietor Employees -5',
      priceFrom: '₹6,750.00', priceTo: '₹8,250.00', validTill: '2023-09-01', service: 'Labour License'
    },
    {
      title: 'RERA License -Agent',
      subtitle: 'RERA License',
      priceFrom: '₹16,200.00', priceTo: '₹19,800.00', validTill: '2023-08-02', service: '--'
    },
    {
      title: 'INC of a Company in Africa-South Africa',
      subtitle: 'SA@20000 Rand - Constitution - pvt LTD',
      priceFrom: '₹18,000.00', priceTo: '₹22,000.00', validTill: '2023-08-31', service: 'Incorporation of Pvt Ltd / LLP'
    }
  ];

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var calState = { year: 2026, month: 7, day: 19 };
  var validCalState = { year: 2026, month: 7, day: 19 };
  var postOffset = 0;

  var clock = document.getElementById('mcdTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  function toast(title, msg) {
    if (window.DashboardShell) DashboardShell.toast(title, msg);
  }

  function renderCal(el, state, onSelect) {
    var first = new Date(state.year, state.month, 1), startDay = first.getDay();
    var daysInMonth = new Date(state.year, state.month + 1, 0).getDate();
    var prevDays = new Date(state.year, state.month, 0).getDate();
    var html = '<div class="mcd-cal__head"><span>' + MONTHS[state.month] + ' ' + state.year + '</span>' +
      '<div class="mcd-cal__nav"><button type="button" data-nav="y-prev">«</button><button type="button" data-nav="m-prev">‹</button>' +
      '<button type="button" data-nav="m-next">›</button><button type="button" data-nav="y-next">»</button></div></div><div class="mcd-cal__grid">';
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function (d) { html += '<span class="mcd-cal__dow">' + d + '</span>'; });
    var i;
    for (i = 0; i < startDay; i++) html += '<button type="button" class="mcd-cal__day is-other" data-day="' + (prevDays - startDay + i + 1) + '" data-off="-1">' + (prevDays - startDay + i + 1) + '</button>';
    for (i = 1; i <= daysInMonth; i++) {
      html += '<button type="button" class="mcd-cal__day' + (i === state.day ? ' is-selected' : '') + '" data-day="' + i + '" data-off="0">' + i + '</button>';
    }
    html += '</div>';
    el.innerHTML = html;
    el.onclick = function (e) {
      var nav = e.target.closest('[data-nav]');
      if (nav) {
        var n = nav.getAttribute('data-nav');
        if (n === 'm-prev') { state.month--; if (state.month < 0) { state.month = 11; state.year--; } }
        else if (n === 'm-next') { state.month++; if (state.month > 11) { state.month = 0; state.year++; } }
        else if (n === 'y-prev') state.year--;
        else if (n === 'y-next') state.year++;
        renderCal(el, state, onSelect);
        return;
      }
      var dayBtn = e.target.closest('.mcd-cal__day');
      if (!dayBtn) return;
      var off = parseInt(dayBtn.getAttribute('data-off'), 10);
      if (off === -1) { state.month--; if (state.month < 0) { state.month = 11; state.year--; } }
      state.day = parseInt(dayBtn.getAttribute('data-day'), 10);
      if (onSelect) onSelect(state);
      renderCal(el, state, onSelect);
    };
  }

  function fmtDMY(state) {
    return String(state.day).padStart(2, '0') + '/' + String(state.month + 1).padStart(2, '0') + '/' + state.year;
  }

  function fmtISO(state) {
    return state.year + '-' + String(state.month + 1).padStart(2, '0') + '-' + String(state.day).padStart(2, '0');
  }

  function renderMyPosts() {
    var wrap = document.getElementById('mcdMyPosts');
    wrap.innerHTML = MY_POSTS.map(function (p) {
      return '<article class="mcd-post-card">' +
        '<h3>' + p.title + '</h3><p>' + p.subtitle + '</p>' +
        '<dl><dt>Price Range</dt><dd>From : <span class="is-price">' + p.priceFrom + ' to ' + p.priceTo + '</span></dd>' +
        '<dt>Valid Till</dt><dd>' + p.validTill + '</dd><dt>Service</dt><dd>' + p.service + '</dd></dl></article>';
    }).join('');
  }

  function renderFeed() {
    var feed = document.getElementById('mcdFeed');
    feed.innerHTML = '<div class="mcd-feed-empty">No community posts found.</div>';
    document.getElementById('mcdFeedCount').textContent = '0 / 0';
  }

  function closeCombos(except) {
    document.querySelectorAll('.mcd-combo.is-open').forEach(function (el) {
      if (el !== except) el.classList.remove('is-open');
    });
  }

  function renderComboMenu(combo, q) {
    var menu = combo.querySelector('.mcd-combo__menu');
    var qq = (q || '').toLowerCase();
    menu.innerHTML = SERVICES.filter(function (s) { return !qq || s.toLowerCase().indexOf(qq) !== -1; })
      .map(function (s) { return '<div class="mcd-combo__item">' + s + '</div>'; }).join('') ||
      '<div class="mcd-combo__item">No matches</div>';
  }

  document.querySelectorAll('.mcd-combo').forEach(function (combo) {
    var input = combo.querySelector('input');
    var menu = combo.querySelector('.mcd-combo__menu');
    var readonly = input.hasAttribute('readonly');
    function open() { renderComboMenu(combo, input.value); closeCombos(combo); combo.classList.add('is-open'); }
    input.addEventListener('focus', open);
    input.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    if (!readonly) input.addEventListener('input', function () { renderComboMenu(combo, input.value); combo.classList.add('is-open'); });
    menu.addEventListener('mousedown', function (e) {
      var item = e.target.closest('.mcd-combo__item');
      if (!item || item.textContent.trim() === 'No matches') return;
      e.preventDefault();
      input.value = item.textContent.trim();
      combo.classList.remove('is-open');
    });
  });

  var datePop = document.getElementById('mcdDatePop');
  document.getElementById('mcdDateBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    datePop.hidden = !datePop.hidden;
    if (!datePop.hidden) renderCal(document.getElementById('mcdCal'), calState, function (s) {
      document.getElementById('mcdDateStart').textContent = fmtDMY(s);
      document.getElementById('mcdDateEnd').textContent = fmtDMY(s);
    });
  });
  document.getElementById('mcdDateToday').addEventListener('click', function () {
    var now = new Date();
    calState = { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
    document.getElementById('mcdDateStart').textContent = fmtDMY(calState);
    document.getElementById('mcdDateEnd').textContent = fmtDMY(calState);
    renderCal(document.getElementById('mcdCal'), calState);
  });

  var validPop = document.getElementById('mcdValidPop');
  var validField = document.getElementById('mcdValidField');
  document.getElementById('mcdValidTill').addEventListener('click', function (e) {
    e.stopPropagation();
    validPop.hidden = !validPop.hidden;
    validField.classList.toggle('is-open', !validPop.hidden);
    if (!validPop.hidden) renderCal(document.getElementById('mcdValidCal'), validCalState, function (s) {
      document.getElementById('mcdValidTill').value = fmtDMY(s);
      validPop.hidden = true;
      validField.classList.remove('is-open');
    });
  });
  document.getElementById('mcdValidToday').addEventListener('click', function () {
    var now = new Date();
    validCalState = { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
    document.getElementById('mcdValidTill').value = fmtDMY(validCalState);
    renderCal(document.getElementById('mcdValidCal'), validCalState);
  });

  document.getElementById('mcdSearchBtn').addEventListener('click', function () {
    toast('Search', 'Searching community posts for "' + (document.getElementById('mcdSearchInput').value.trim() || 'all') + '".');
  });

  document.getElementById('mcdForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var task = document.getElementById('mcdTaskName').value.trim();
    var price = document.getElementById('mcdPrice').value.trim();
    var valid = document.getElementById('mcdValidTill').value.trim();
    if (!task || !price || !valid) {
      toast('Required', 'Fill Task Name, Price, and Valid Till.');
      return;
    }
    var service = document.getElementById('mcdServiceName').value.trim() || '--';
    var desc = document.getElementById('mcdDescription').value.trim() || task;
    MY_POSTS.unshift({
      title: task,
      subtitle: desc,
      priceFrom: '₹' + price + '.00',
      priceTo: '₹' + (parseFloat(price) * 1.2 || price) + '.00',
      validTill: fmtISO(validCalState),
      service: service
    });
    document.getElementById('mcdForm').reset();
    renderMyPosts();
    toast('Created', 'Community post created.');
  });

  document.getElementById('mcdPostPrev').addEventListener('click', function () {
    postOffset = Math.max(0, postOffset - 1);
    document.getElementById('mcdMyPosts').scrollTop = postOffset * 120;
  });
  document.getElementById('mcdPostNext').addEventListener('click', function () {
    postOffset = Math.min(MY_POSTS.length - 1, postOffset + 1);
    document.getElementById('mcdMyPosts').scrollTop = postOffset * 120;
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mcd-combo')) closeCombos();
    if (!e.target.closest('.mcd-date-range')) datePop.hidden = true;
    if (!e.target.closest('.mcd-valid-field')) {
      validPop.hidden = true;
      validField.classList.remove('is-open');
    }
  });

  renderMyPosts();
  renderFeed();
})();
