(function () {
  'use strict';

  var pendingLabel = null;

  function toast(title, msg) {
    var stack = document.getElementById('iucToastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'iucToastStack';
      stack.className = 'iuc-toast-stack';
      document.body.appendChild(stack);
    }
    var el = document.createElement('div');
    el.className = 'iuc-toast';
    el.innerHTML = '<strong>' + title + '</strong>' + (msg || '');
    stack.appendChild(el);
    setTimeout(function () {
      el.remove();
      if (!stack.childElementCount) stack.remove();
    }, 3200);
  }

  function labelFromEl(el) {
    return el.getAttribute('data-iuc-label') || 'Record';
  }

  function init() {
    var fileInput = document.getElementById('iucFileInput');
    if (!fileInput) return;

    document.querySelectorAll('[data-iuc-upload]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        pendingLabel = labelFromEl(btn);
        fileInput.value = '';
        fileInput.click();
      });
    });

    fileInput.addEventListener('change', function () {
      if (!fileInput.files || !fileInput.files.length) return;
      var name = fileInput.files[0].name;
      toast('Upload started', (pendingLabel || 'Record') + ' file "' + name + '" selected for import.');
      pendingLabel = null;
    });

    document.querySelectorAll('[data-iuc-view]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var label = labelFromEl(btn);
        toast('Upload history', 'No ' + label.toLowerCase() + ' Excel uploads found yet.');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
