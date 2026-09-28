(function () {
  'use strict';

  function toast(title, detail) {
    if (window.DashboardShell && DashboardShell.toast) {
      DashboardShell.toast(title, detail);
      return;
    }
  }

  var steps = Array.prototype.slice.call(document.querySelectorAll('.ab-step'));
  var panes = Array.prototype.slice.call(document.querySelectorAll('.ab-pane'));
  var current = 0;

  function go(n) {
    current = Math.max(0, Math.min(n, steps.length - 1));
    steps.forEach(function (s, i) {
      s.classList.toggle('is-active', i === current);
      s.classList.toggle('is-done', i <= current);
    });
    panes.forEach(function (p, i) {
      var on = i === current;
      p.classList.toggle('is-active', on);
      p.hidden = !on;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  steps.forEach(function (s) {
    s.addEventListener('click', function () {
      go(Number(s.getAttribute('data-ab-step')) || 0);
    });
  });

  document.querySelectorAll('[data-ab-next]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      toast('Saved', 'Step saved. Continue to next.');
      go(current + 1);
    });
  });

  var finalBtn = document.getElementById('abSaveFinal');
  if (finalBtn) {
    finalBtn.addEventListener('click', function () {
      toast('Branch saved', 'Branch created successfully.');
      setTimeout(function () { window.location.href = 'organization.html#branch'; }, 700);
    });
  }

  var getGst = document.getElementById('abGetGst');
  if (getGst) {
    getGst.addEventListener('click', function () {
      var gst = document.getElementById('abGst');
      var name = document.getElementById('abName');
      if (name && (!name.value || !String(name.value).trim())) name.value = 'CA CloudDesk Branch';
      toast('GST details', gst && gst.value ? 'Fetched for ' + gst.value : 'Enter GST No. first.');
    });
  }

  function bindLocDel(btn) {
    btn.addEventListener('click', function () {
      var row = btn.closest('.ab-loc-row');
      var list = document.getElementById('abLocList');
      if (!row || !list) return;
      if (list.querySelectorAll('.ab-loc-row').length > 1) row.remove();
    });
  }

  var addLoc = document.getElementById('abAddLoc');
  var locList = document.getElementById('abLocList');
  if (addLoc && locList) {
    addLoc.addEventListener('click', function () {
      var row = document.createElement('div');
      row.className = 'ab-loc-row';
      row.innerHTML =
        '<input type="text" placeholder="Enter Office Name">' +
        '<input type="number" value="0">' +
        '<input type="number" value="0">' +
        '<input type="number" value="0">' +
        '<button type="button" class="ab-loc-del" aria-label="Remove">−</button>';
      locList.appendChild(row);
      bindLocDel(row.querySelector('.ab-loc-del'));
    });
  }

  document.querySelectorAll('.ab-loc-del').forEach(bindLocDel);

  document.querySelectorAll('.ab-ptab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.ab-ptab').forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
    });
  });

  var previewBtn = document.getElementById('abPreviewBtn');
  if (previewBtn) {
    previewBtn.addEventListener('click', function () {
      toast('Preview', 'Invoice preview opens here.');
    });
  }

  var howBtn = document.getElementById('abHowItWorks');
  var howPanel = document.getElementById('abHowPanel');
  if (howBtn && howPanel) {
    howBtn.addEventListener('click', function () {
      var open = howPanel.hidden;
      howPanel.hidden = !open;
      howBtn.classList.toggle('is-open', open);
      howBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('[data-ab-rte]').forEach(function (el) {
    var foot = el.parentElement && el.parentElement.querySelector('[data-ab-words]');
    function updateWords() {
      if (!foot) return;
      var text = (el.innerText || '').trim();
      var n = text ? text.split(/\s+/).length : 0;
      foot.textContent = n + (n === 1 ? ' word' : ' words');
    }
    el.addEventListener('input', updateWords);
    updateWords();
  });

  document.querySelectorAll('[data-toggle-secret]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = btn.parentElement && btn.parentElement.querySelector('input');
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  });
})();
