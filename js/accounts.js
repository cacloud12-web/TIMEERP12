(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }

  function toast(title, msg) {
    var stack = document.getElementById('accToastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'accToastStack';
      stack.className = 'uas-toast-stack';
      document.body.appendChild(stack);
    }
    var el = document.createElement('div');
    el.className = 'uas-toast';
    el.innerHTML = '<strong>' + title + '</strong>' + msg;
    stack.appendChild(el);
    setTimeout(function () {
      el.remove();
      if (!stack.childElementCount) stack.remove();
    }, 3200);
  }

  function positionPop(anchor, pop) {
    pop.hidden = false;
    var rect = anchor.getBoundingClientRect();
    var popWidth = pop.offsetWidth;
    var popHeight = pop.offsetHeight;
    var gap = 12;
    var left = rect.left + rect.width / 2 - popWidth / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - popWidth - 12));
    var top = rect.top - popHeight - gap;
    if (top < 12) top = rect.bottom + gap;
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
    var arrowX = rect.left + rect.width / 2 - left;
    pop.style.setProperty('--acc-pop-arrow-x', arrowX + 'px');
  }

  function closeLogoutAllPop() {
    var pop = $('accLogoutAllPop');
    var btn = $('accLogoutAllBtn');
    if (!pop) return;
    pop.hidden = true;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function openLogoutAllPop(anchor) {
    var pop = $('accLogoutAllPop');
    if (!pop || !anchor) return;
    positionPop(anchor, pop);
    anchor.setAttribute('aria-expanded', 'true');
  }

  function initLogoutAllConfirm() {
    var btn = $('accLogoutAllBtn');
    var pop = $('accLogoutAllPop');
    var noBtn = $('accLogoutAllNo');
    var yesBtn = $('accLogoutAllYes');
    if (!btn || !pop) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (pop.hidden) openLogoutAllPop(btn);
      else closeLogoutAllPop();
    });

    if (noBtn) {
      noBtn.addEventListener('click', function () {
        closeLogoutAllPop();
      });
    }

    if (yesBtn) {
      yesBtn.addEventListener('click', function () {
        closeLogoutAllPop();
        toast('Logged out', 'All sessions including this browser have been logged out.');
      });
    }

    document.addEventListener('click', function (e) {
      if (pop.hidden) return;
      if (e.target.closest('#accLogoutAllPop') || e.target.closest('#accLogoutAllBtn')) return;
      closeLogoutAllPop();
    });

    window.addEventListener('resize', closeLogoutAllPop);
    window.addEventListener('scroll', closeLogoutAllPop, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogoutAllConfirm);
  } else {
    initLogoutAllConfirm();
  }
})();
