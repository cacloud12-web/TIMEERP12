(function () {
  'use strict';

  var clock = document.getElementById('mwcTopClock');
  function tickClock() {
    if (!clock) return;
    var now = new Date();
    clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  setInterval(tickClock, 30000);

  var desc = document.getElementById('mwcDescription');
  var descCount = document.getElementById('mwcDescCount');
  function updateDescCount() {
    if (descCount && desc) descCount.textContent = String(desc.value.length);
  }
  if (desc) {
    desc.addEventListener('input', updateDescCount);
    updateDescCount();
  }

  var uploads = {
    favicon: document.getElementById('mwcFaviconInput'),
    logo: document.getElementById('mwcLogoInput'),
    footer: document.getElementById('mwcFooterInput')
  };
  var logoMeta = document.getElementById('mwcLogoMeta');
  var logoHasFile = true;

  document.querySelectorAll('.mwc-upload').forEach(function (btn) {
    var key = btn.getAttribute('data-upload');
    var input = uploads[key];
    if (!input) return;
    btn.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () {
      var label = btn.querySelector('.mwc-upload__label');
      if (label) label.textContent = input.files && input.files[0] ? input.files[0].name : 'Click to Upload';
      if (key === 'logo' && logoMeta) {
        logoHasFile = !!(input.files && input.files[0]);
        logoMeta.classList.toggle('is-hidden', !logoHasFile);
      }
    });
  });

  document.getElementById('mwcDeleteLogo').addEventListener('click', function () {
    if (uploads.logo) uploads.logo.value = '';
    logoHasFile = false;
    if (logoMeta) logoMeta.classList.add('is-hidden');
    var logoBtn = document.querySelector('.mwc-upload[data-upload="logo"] .mwc-upload__label');
    if (logoBtn) logoBtn.textContent = 'Click to Upload';
    if (window.DashboardShell) DashboardShell.toast('Logo', 'Logo removed.');
  });

  document.getElementById('mwcViewLogo').addEventListener('click', function () {
    if (window.DashboardShell) DashboardShell.toast('Logo', 'Uploaded logo preview will open here.');
  });

  document.getElementById('mwcForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('mwcWebsiteName').value.trim();
    var domain = document.getElementById('mwcDomainName').value.trim();
    if (!name || !domain) {
      if (window.DashboardShell) DashboardShell.toast('Required fields', 'Website Name and Domain Name are required.');
      return;
    }
    if (window.DashboardShell) DashboardShell.toast('Saved', 'Company details saved successfully.');
  });
})();
