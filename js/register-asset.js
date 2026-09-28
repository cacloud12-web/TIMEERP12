/* TIME ERP — Register Asset */
(function () {
  'use strict';

  /* Clock */
  (function tick() {
    var el = document.getElementById('raTopClock'); if (!el) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    el.textContent = (h > 12 ? h - 12 : h || 12) + ':' + (m < 10 ? '0' : '') + m;
    setTimeout(tick, 30000);
  })();

  /* ── Searchable combo helper ── */
  var COMBO_DATA = {
    assetType: ['Computer', 'cat2', 'laptop hp', 'IPEM'],
    employee: ['(AN2) Tarun Gaur','(SA009) Suhanshi Rawat','(SO6829) SONIYA KASHYAP','(HA6413) Hardik rawat','(SI6830) SIMRAN KASHYAP','(KA7564) KAPIL','(AS0010) Aastha Tyagi','(SK009) Shivam Kumar','(AA6215) Aakash'],
    branch: ['CA CloudDesk','Bluemon Wealth Management','Law Seva Management Private Limited','saurabh bhardawaj'],
    status: ['Assign', 'Un Assign', 'Repaired']
  };

  document.querySelectorAll('.ra-combo').forEach(function (wrap) {
    var key = wrap.getAttribute('data-combo');
    var inp = wrap.querySelector('.ra-combo__input');
    var list = wrap.querySelector('.ra-combo__list');
    var clearBtn = wrap.querySelector('.ra-combo__clear');
    var items = COMBO_DATA[key] || [];

    function syncClear() {
      if (!clearBtn) return;
      clearBtn.hidden = !inp.value;
    }
    function render(filter) {
      var f = (filter || '').toLowerCase();
      list.innerHTML = '';
      items.forEach(function (t) {
        if (f && t.toLowerCase().indexOf(f) === -1) return;
        var d = document.createElement('div');
        d.className = 'ra-combo__opt' + (inp.value === t ? ' active' : '');
        d.textContent = t;
        d.addEventListener('click', function () {
          inp.value = t;
          list.classList.remove('open');
          syncClear();
        });
        list.appendChild(d);
      });
    }

    inp.addEventListener('focus', function () { render(inp.value); list.classList.add('open'); });
    inp.addEventListener('input', function () { render(inp.value); list.classList.add('open'); syncClear(); });
    if (clearBtn) {
      clearBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        inp.value = '';
        syncClear();
        inp.focus();
        render('');
        list.classList.add('open');
      });
    }
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) list.classList.remove('open'); });
    syncClear();
  });

  /* Prefill when opened via Edit from Asset Register */
  (function prefillEdit() {
    var params;
    try { params = new URLSearchParams(window.location.search); } catch (e) { params = null; }
    var isEdit = params && params.has('edit');
    if (!isEdit) return;

    var stored = null;
    try { stored = JSON.parse(sessionStorage.getItem('ar_edit_asset') || 'null'); } catch (e) { stored = null; }
    var asset = (stored && stored.asset) || {
      type: 'Computer',
      name: 'PC1',
      desc: 'sdfsdfasdfasfasfads',
      emp: '(AN2) Tarun Gaur',
      serial: '',
      cost: '10000.00',
      currentVal: '8000.00',
      salvage: '',
      status: 'Assign',
      remarks: 'asd'
    };

    function setVal(id, val) {
      var el = document.getElementById(id);
      if (el && val != null && val !== '--') el.value = String(val).replace(/^₹/, '');
    }

    setVal('raAssetType', asset.type || 'Computer');
    setVal('raName', asset.name || '');
    setVal('raEmployee', asset.emp && asset.emp !== '--' ? asset.emp : '4370');
    setVal('raSerial', asset.serial && asset.serial !== '--' ? asset.serial : '');
    setVal('raPurchaseCost', asset.cost || '10000.00');
    setVal('raCurrentValue', asset.currentVal || '8000.00');
    setVal('raSalvage', asset.salvage && asset.salvage !== '--' ? asset.salvage : '');
    setVal('raStatus', asset.status || 'Assign');
    setVal('raRemarks', asset.remarks && asset.remarks !== '--' ? asset.remarks : '');
    setVal('raDepMethod', 'Declining Balance');
    setVal('raDepPct', '30.00');
    setVal('raDepFreq', 'Annually');
    setVal('raAssetLife', '60');
    setVal('raCompType', 'Pro-Rata');
    setVal('raDepStart', '07/01/2026');

    var editor = document.getElementById('raEditorBody');
    if (editor) {
      editor.innerText = asset.desc && asset.desc !== 'View' && asset.desc !== '--'
        ? asset.desc
        : 'sdfsdfasdfasfasfads';
      var wc = document.getElementById('raWordCount');
      if (wc) {
        var txt = editor.innerText.trim();
        var count = txt ? txt.split(/\s+/).length : 0;
        wc.textContent = count + ' word' + (count !== 1 ? 's' : '');
      }
    }

    document.querySelectorAll('.ra-combo').forEach(function (wrap) {
      var inp = wrap.querySelector('.ra-combo__input');
      var clearBtn = wrap.querySelector('.ra-combo__clear');
      if (clearBtn) clearBtn.hidden = !(inp && inp.value);
    });

    var title = document.querySelector('.ra-form-title');
    if (title) title.textContent = 'Register Assets';
  })();

  /* ── Rich text editor ── */
  var formatBtn = document.getElementById('raFormatBtn');
  var formatDrop = document.getElementById('raFormatDrop');
  var editorBody = document.getElementById('raEditorBody');
  var wordCount = document.getElementById('raWordCount');

  if (formatBtn) {
    formatBtn.addEventListener('click', function (e) { e.stopPropagation(); formatDrop.classList.toggle('open'); });
    formatDrop.querySelectorAll('.ra-editor__format-opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        formatDrop.querySelectorAll('.ra-editor__format-opt').forEach(function (o) { o.classList.remove('active'); });
        opt.classList.add('active');
        formatBtn.innerHTML = opt.textContent.replace('✓','').trim() + ' <span style="font-size:10px">▾</span>';
        document.execCommand('formatBlock', false, opt.getAttribute('data-tag'));
        formatDrop.classList.remove('open');
      });
    });
    document.addEventListener('click', function (e) { if (!formatBtn.parentElement.contains(e.target)) formatDrop.classList.remove('open'); });
  }

  if (editorBody) {
    editorBody.addEventListener('input', function () {
      var txt = editorBody.innerText.trim();
      var count = txt ? txt.split(/\s+/).length : 0;
      wordCount.textContent = count + ' word' + (count !== 1 ? 's' : '');
    });
  }

  /* ── Datepicker ── */
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  document.querySelectorAll('.ra-date-wrap').forEach(function (wrap) {
    var inp = wrap.querySelector('.ra-date-input');
    var calEl = wrap.querySelector('.ra-cal');
    var now = new Date(), viewYear = now.getFullYear(), viewMonth = now.getMonth();

    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    function render() {
      var first = new Date(viewYear, viewMonth, 1);
      var startDay = first.getDay();
      var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      var prevDays = new Date(viewYear, viewMonth, 0).getDate();
      var today = new Date();

      var html = '<div class="ra-cal__head">';
      html += '<span><button class="ra-cal__nav" data-d="-12">«</button><button class="ra-cal__nav" data-d="-1">‹</button></span>';
      html += '<span class="ra-cal__title">' + MONTHS[viewMonth] + '  ' + viewYear + '</span>';
      html += '<span><button class="ra-cal__nav" data-d="1">›</button><button class="ra-cal__nav" data-d="12">»</button></span>';
      html += '</div><div class="ra-cal__grid">';
      DAYS.forEach(function (d) { html += '<span class="ra-cal__day-head">' + d + '</span>'; });

      for (var i = 0; i < startDay; i++) {
        html += '<span class="ra-cal__day ra-cal__day--other">' + (prevDays - startDay + 1 + i) + '</span>';
      }
      for (var d = 1; d <= daysInMonth; d++) {
        var cls = 'ra-cal__day';
        if (d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()) cls += ' ra-cal__day--today';
        html += '<span class="' + cls + '" data-pick="' + d + '">' + d + '</span>';
      }
      var rem = (startDay + daysInMonth) % 7;
      if (rem) for (var j = 1; j <= 7 - rem; j++) html += '<span class="ra-cal__day ra-cal__day--other">' + j + '</span>';

      html += '</div><button class="ra-cal__today-btn" data-today="1">Today</button>';
      calEl.innerHTML = html;

      calEl.querySelectorAll('.ra-cal__nav').forEach(function (btn) {
        btn.addEventListener('click', function (e) { e.stopPropagation(); viewMonth += parseInt(btn.getAttribute('data-d')); if (viewMonth > 11) { viewMonth -= 12; viewYear++; } else if (viewMonth < 0) { viewMonth += 12; viewYear--; } render(); });
      });
      calEl.querySelectorAll('[data-pick]').forEach(function (el) {
        el.addEventListener('click', function () { inp.value = pad(parseInt(el.getAttribute('data-pick'))) + '/' + pad(viewMonth + 1) + '/' + viewYear; calEl.classList.remove('open'); });
      });
      var todayBtn = calEl.querySelector('[data-today]');
      if (todayBtn) todayBtn.addEventListener('click', function () { var t = new Date(); inp.value = pad(t.getDate()) + '/' + pad(t.getMonth() + 1) + '/' + t.getFullYear(); calEl.classList.remove('open'); });
    }

    inp.addEventListener('click', function (e) {
      e.stopPropagation();
      document.querySelectorAll('.ra-cal.open').forEach(function (c) { if (c !== calEl) c.classList.remove('open'); });
      calEl.classList.toggle('open');
      if (calEl.classList.contains('open')) render();
    });
    calEl.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () { calEl.classList.remove('open'); });
  });
})();
