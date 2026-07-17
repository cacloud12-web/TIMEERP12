(function () {
  'use strict';

  var CLOSE_DELAY = 120;
  var controllers = [];
  var DROPDOWN_IDS = [
    ['productDropdown', 'productMega'],
    ['solutionsDropdown', 'solutionsMega'],
    ['resourcesDropdown', 'resourcesMega'],
    ['companyDropdown', 'companyMega']
  ];

  function isDropdownTrigger(target) {
    return DROPDOWN_IDS.some(function (pair) {
      var trigger = document.getElementById(pair[0].replace('Dropdown', 'Trigger'));
      return trigger && (trigger === target || trigger.contains(target));
    });
  }

  function isInsideAnyDropdown(target) {
    if (!target || !target.nodeType) return false;
    return DROPDOWN_IDS.some(function (pair) {
      var wrap = document.getElementById(pair[0]);
      var mega = document.getElementById(pair[1]);
      return (wrap && wrap.contains(target)) || (mega && mega.contains(target));
    });
  }

  function mountFixedMega(mega) {
    if (!mega || mega.getAttribute('data-mega-mounted') === 'true') return;
    if (window.getComputedStyle(mega).position !== 'fixed') return;
    document.body.appendChild(mega);
    mega.setAttribute('data-mega-mounted', 'true');
  }

  function initDropdown(config) {
    var wrap = document.getElementById(config.wrapId);
    var trigger = document.getElementById(config.triggerId);
    var mega = document.getElementById(config.megaId);
    if (!wrap || !trigger || !mega) return null;

    mountFixedMega(mega);

    var pinned = false;
    var closeTimer = null;
    var autoCloseTimer = null;
    var autoCloseMs = parseInt(wrap.getAttribute('data-auto-close-ms') || '0', 10);
    var clickOnly = wrap.getAttribute('data-dropdown-mode') === 'click';

    function clearCloseTimer() {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    }

    function clearAutoCloseTimer() {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
      }
    }

    function scheduleAutoClose() {
      if (!autoCloseMs) return;
      clearAutoCloseTimer();
      autoCloseTimer = setTimeout(function () {
        pinned = false;
        applyOpen(false);
        autoCloseTimer = null;
      }, autoCloseMs);
    }

    function closeOthers() {
      controllers.forEach(function (ctrl) {
        if (ctrl !== controller) {
          ctrl.forceClose();
        }
      });
    }

    function applyOpen(open) {
      wrap.classList.toggle('is-open', open);
      mega.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function forceClose() {
      clearCloseTimer();
      clearAutoCloseTimer();
      pinned = false;
      applyOpen(false);
    }

    function openMenu(fromClick) {
      clearCloseTimer();
      if (fromClick) pinned = true;
      closeOthers();
      applyOpen(true);
    }

    function scheduleClose() {
      if (pinned || clickOnly) return;
      clearCloseTimer();
      closeTimer = setTimeout(function () {
        applyOpen(false);
      }, CLOSE_DELAY);
    }

    var controller = {
      forceClose: forceClose,
      isOpen: function () {
        return wrap.classList.contains('is-open');
      }
    };

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      clearCloseTimer();
      clearAutoCloseTimer();

      if (clickOnly) {
        if (wrap.classList.contains('is-open')) {
          forceClose();
        } else {
          openMenu(true);
        }
        return;
      }

      if (autoCloseMs) {
        if (wrap.classList.contains('is-open')) {
          forceClose();
          return;
        }
        openMenu(true);
        scheduleAutoClose();
        return;
      }

      if (wrap.classList.contains('is-open') && pinned) {
        pinned = false;
        applyOpen(false);
        return;
      }

      openMenu(true);
    });

    if (!clickOnly) {
      wrap.addEventListener('mouseenter', function () {
        clearCloseTimer();
        clearAutoCloseTimer();
        if (!pinned) {
          openMenu(false);
        }
      });

      wrap.addEventListener('mouseleave', function (e) {
        if (mega.contains(e.relatedTarget)) return;
        scheduleClose();
      });

      mega.addEventListener('mouseenter', function () {
        clearCloseTimer();
        clearAutoCloseTimer();
        if (!wrap.classList.contains('is-open')) {
          openMenu(false);
        }
      });

      mega.addEventListener('mouseleave', function (e) {
        if (wrap.contains(e.relatedTarget)) return;
        scheduleClose();
      });
    }

    mega.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('click', function () {
        if (el.tagName === 'BUTTON' && el.classList.contains('product-mega__cat')) return;
        forceClose();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && wrap.classList.contains('is-open')) {
        forceClose();
        trigger.focus();
      }
    });

    return controller;
  }

  ['productDropdown', 'solutionsDropdown', 'resourcesDropdown', 'companyDropdown'].forEach(function (wrapId) {
    var triggerId = wrapId.replace('Dropdown', 'Trigger');
    var megaId = wrapId.replace('Dropdown', 'Mega');
    var ctrl = initDropdown({ wrapId: wrapId, triggerId: triggerId, megaId: megaId });
    if (ctrl) controllers.push(ctrl);
  });

  document.addEventListener('click', function (e) {
    if (isDropdownTrigger(e.target)) return;
    if (isInsideAnyDropdown(e.target)) return;
    controllers.forEach(function (ctrl) {
      ctrl.forceClose();
    });
  });

  document.querySelectorAll('.navbar__nav a.navbar__link[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      controllers.forEach(function (ctrl) {
        ctrl.forceClose();
      });
    });
  });

  var productMega = document.getElementById('productMega');

  if (productMega) {
    var cats = productMega.querySelectorAll('.product-mega__cat');
    var panels = productMega.querySelectorAll('.product-mega__panel');

    function setPanel(id) {
      cats.forEach(function (cat) {
        var active = cat.getAttribute('data-product-panel') === id;
        cat.classList.toggle('is-active', active);
        cat.setAttribute('aria-current', active ? 'true' : 'false');
      });
      panels.forEach(function (panel) {
        var active = panel.getAttribute('data-product-panel') === id;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });
    }

    cats.forEach(function (cat) {
      var id = cat.getAttribute('data-product-panel');
      cat.addEventListener('mouseenter', function () {
        setPanel(id);
      });
      cat.addEventListener('focus', function () {
        setPanel(id);
      });
      cat.addEventListener('click', function (e) {
        e.preventDefault();
        setPanel(id);
      });
    });
  }
})();
