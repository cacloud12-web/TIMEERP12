/**
 * TimeERP — My Running Task panel (topbar clock click).
 */
(function (global) {
  'use strict';

  var CREATOR = 'Ca Ram Kumar';
  var CSS_ATTR = 'data-running-task-panel-css';
  var CSS_VER = '2';

  var TASKS = [
    { name: 'GST Appeal', id: 'TSK02219', elapsed: '02:09:11', running: true },
    { name: 'BANK', id: 'TSK02095', elapsed: '01:30:40', running: true }
  ];

  function detectRoot() {
    var path = (global.location.pathname || '').replace(/\\/g, '/');
    if (/\/HRMS\//i.test(path)) return '../';
    if (/\/time erp\//i.test(path) || /\/time%20erp\//i.test(path)) return '../';
    if (/\/timeerp blog\//i.test(path) || /\/timeerp%20blog\//i.test(path)) return '../';
    return '';
  }

  function playIcon() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  }

  function pauseIcon() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7V5zm6 0h4v14h-4V5z"/></svg>';
  }

  function panelMarkup(timesheetHref) {
    var items = TASKS.map(function (task) {
      return ''
        + '<article class="running-task-panel__item">'
        +   '<div class="running-task-panel__info">'
        +     '<strong>' + task.name + '(' + task.id + ')</strong>'
        +     '<span>Created By : ' + CREATOR + '</span>'
        +   '</div>'
        +   '<div class="running-task-panel__controls">'
        +     '<span class="running-task-panel__timer" data-task-timer="' + task.id + '">' + task.elapsed + '</span>'
        +     '<button type="button" class="running-task-panel__play' + (task.running ? '' : ' is-paused') + '" data-task-play="' + task.id + '" aria-label="' + (task.running ? 'Pause' : 'Resume') + ' task timer">'
        +       (task.running ? pauseIcon() : playIcon())
        +     '</button>'
        +   '</div>'
        + '</article>';
    }).join('');

    return ''
      + '<div class="running-task-panel__head">'
      +   '<h3 class="running-task-panel__title">My Running Task</h3>'
      +   '<a href="' + timesheetHref + '" class="running-task-panel__timesheet">+ Timesheet</a>'
      +   '<button type="button" class="running-task-panel__close" aria-label="Close running tasks">×</button>'
      + '</div>'
      + '<div class="running-task-panel__body">' + (items || '<div class="running-task-panel__empty">No running tasks.</div>') + '</div>';
  }

  function ensureStyles(root) {
    var href = (root || '') + 'css/running-task-panel.css?v=' + CSS_VER;
    var existing = document.querySelector('link[' + CSS_ATTR + ']');
    if (existing) {
      if (existing.getAttribute('href') !== href) existing.setAttribute('href', href);
      return;
    }
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute(CSS_ATTR, '1');
    document.head.appendChild(link);
  }

  function applyPanelFallbackStyles(panel) {
    // Keep panel out of topbar flex flow even if CSS is slow/missing
    panel.style.position = 'absolute';
    panel.style.top = 'calc(100% + 8px)';
    panel.style.right = '0';
    panel.style.zIndex = '320';
    panel.style.width = 'min(420px, calc(100vw - 32px))';
    if (!panel.classList.contains('is-open')) panel.style.display = 'none';
  }

  function closeAllPanels(exceptPanel) {
    document.querySelectorAll('.running-task-panel.is-open').forEach(function (panel) {
      if (panel === exceptPanel) return;
      panel.classList.remove('is-open');
      panel.style.display = 'none';
      var wrap = panel.closest('.topbar__clock-menu');
      var clock = wrap && wrap.querySelector('[class*="-top-clock"]');
      if (clock) clock.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('#notifDropdown.is-open').forEach(function (dropdown) {
      dropdown.classList.remove('is-open');
    });
    document.querySelectorAll('#notifBtn[aria-expanded="true"]').forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  function bindClock(clock, root) {
    if (!clock || clock.dataset.runningTaskBound) return;
    clock.dataset.runningTaskBound = '1';

    var wrap = clock.closest('.topbar__clock-menu');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'topbar__clock-menu';
      clock.parentNode.insertBefore(wrap, clock);
      wrap.appendChild(clock);
    }

    var panel = wrap.querySelector('.running-task-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'running-task-panel';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-label', 'My Running Task');
      panel.innerHTML = panelMarkup((root || '') + 'HRMS/my_timesheet.html');
      wrap.appendChild(panel);
    }
    applyPanelFallbackStyles(panel);

    clock.setAttribute('role', 'button');
    clock.setAttribute('tabindex', '0');
    clock.setAttribute('aria-haspopup', 'dialog');
    clock.setAttribute('aria-expanded', 'false');

    function closePanel() {
      panel.classList.remove('is-open');
      panel.style.display = 'none';
      clock.setAttribute('aria-expanded', 'false');
    }

    function togglePanel() {
      var open = !panel.classList.contains('is-open');
      closeAllPanels(open ? panel : null);
      panel.classList.toggle('is-open', open);
      panel.style.display = open ? 'block' : 'none';
      clock.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    clock.addEventListener('click', function (e) {
      e.stopPropagation();
      togglePanel();
    });

    clock.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      togglePanel();
    });

    var closeBtn = panel.querySelector('.running-task-panel__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closePanel();
      });
    }

    panel.querySelectorAll('[data-task-play]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var paused = btn.classList.toggle('is-paused');
        btn.setAttribute('aria-label', paused ? 'Resume task timer' : 'Pause task timer');
        btn.innerHTML = paused ? playIcon() : pauseIcon();
      });
    });
  }

  function init(opts) {
    opts = opts || {};
    var root = opts.root != null ? opts.root : detectRoot();
    ensureStyles(root);

    document.querySelectorAll('#shellTopClock, #homeTopClock, .topbar__actions [class*="-top-clock"]').forEach(function (clock) {
      bindClock(clock, root);
    });

    if (!global.__RUNNING_TASK_OUTSIDE_BOUND) {
      global.__RUNNING_TASK_OUTSIDE_BOUND = true;
      document.addEventListener('click', function (e) {
        if (e.target.closest('.topbar__clock-menu') || e.target.closest('.running-task-panel')) return;
        closeAllPanels(null);
      });
    }
  }

  global.RunningTaskPanel = { init: init, detectRoot: detectRoot };

  function boot() { init({ root: detectRoot() }); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
