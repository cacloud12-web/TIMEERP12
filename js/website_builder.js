/**
 * Company Details builder walkthrough only (3 screenshots).
 * Images: cropped company/step-1..3.png (no blog screens).
 */
(function () {
  'use strict';

  var IMG = 'assets/website-builder-screens/company/';
  var AUTO_MS = 9000;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var steps = [
    {
      id: 'open-website',
      title: 'Open Website',
      kicker: 'Step 1 Start',
      desc: 'In the left sidebar, click Website. This opens the Website hub where you manage Company Details, Dashboard, Services, Blogs, About Us, and Gallery.',
      icon: 'web',
      image: IMG + 'step-1.png',
      alt: 'Sidebar with Website selected and Website tiles visible',
      caption: 'Click Website in the left sidebar to open the module.',
      points: [
        { title: 'Find Website', text: 'Scroll the left menu and select Website.' },
        { title: 'Confirm Active', text: 'Use the Active toggle when your public site should stay live.' },
        { title: 'See six tiles', text: 'Company Details, Main Dashboard, My Services, Blogs, About Us, Gallery.' }
      ]
    },
    {
      id: 'company-tile',
      title: 'Open Company Details',
      kicker: 'Step 2 Choose tile',
      desc: 'On the Website hub, click the Company Details tile. This is where you create and update your firm profile for the public website.',
      icon: 'apartment',
      image: IMG + 'step-2.png',
      alt: 'Website hub with Company Details tile highlighted by arrow',
      caption: 'Click Company Details to open the company profile form.',
      points: [
        { title: 'Click Company Details', text: 'Open the tile with the person and building icon.' },
        { title: 'Purpose', text: 'Set firm name, domain, contact, logos, and address for your site.' },
        { title: 'Next screen', text: 'You will see the Company Details form with Save at the bottom.' }
      ]
    },
    {
      id: 'company-form',
      title: 'Fill & Save Company',
      kicker: 'Step 3 Create company',
      desc: 'Complete every Company Details field carefully, then click Save. Required fields are Website Name, Domain Name, and Template Type.',
      icon: 'edit_note',
      image: IMG + 'step-3.png',
      alt: 'Company Details form with all company profile fields and Save button',
      caption: 'Fill the Company Details form, then click Save.',
      points: [
        { title: 'Website Name *', text: 'Public name shown on your website (example: your firm name).' },
        { title: 'Domain Name *', text: 'Short domain key for the site (example: tax).' },
        { title: 'Mobile & WhatsApp', text: 'Numbers visitors can use to reach your firm.' },
        { title: 'Email', text: 'Public contact email for enquiries.' },
        { title: 'Template Type *', text: 'Pick a layout from the dropdown (example: Template 2).' },
        { title: 'Google Map URL', text: 'Paste your map or location link.' },
        { title: 'Favicon, Logo, Footer Logo', text: 'Upload branding images. Use View Uploaded to check logos.' },
        { title: 'Company Description', text: 'Short firm intro (up to 140 characters).' },
        { title: 'Address', text: 'Full office address shown on the site.' },
        { title: 'Save', text: 'Click Save so Company Details publish to your website.' }
      ]
    }
  ];

  var stepNav = document.getElementById('wbStepNav');
  var shot = document.getElementById('wbShot');
  var caption = document.getElementById('wbCaption');
  var stepLabel = document.getElementById('wbStepLabel');
  var panelKicker = document.getElementById('wbPanelKicker');
  var detailName = document.getElementById('wbDetailName');
  var detailDesc = document.getElementById('wbDetailDesc');
  var detailList = document.getElementById('wbDetailList');
  var iconEl = document.getElementById('wbIcon');
  var panel = document.getElementById('wbPanel');
  var viewer = document.getElementById('wbViewer');
  var progressEl = document.getElementById('wbProgress');
  var prevBtn = document.getElementById('wbPrev');
  var nextBtn = document.getElementById('wbNext');
  var nextCta = document.getElementById('wbNextCta');
  var pauseBtn = document.getElementById('wbPause');

  var active = 0;
  var pointIndex = 0;
  var paused = reduceMotion;
  var timer = null;
  var pointTimer = null;
  var progressRaf = null;
  var progressStart = 0;

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function renderNav() {
    if (!stepNav) return;
    stepNav.innerHTML = steps.map(function (s, i) {
      return ''
        + '<button type="button" class="wb-step' + (i === active ? ' is-active' : '') + '"'
        + ' role="tab" aria-selected="' + (i === active ? 'true' : 'false') + '" data-index="' + i + '">'
        +   '<span class="wb-step__num">' + (i + 1) + '</span>'
        +   '<strong class="wb-step__label">' + escapeHtml(s.title) + '</strong>'
        +   '<span class="wb-step__hint">' + escapeHtml(s.kicker) + '</span>'
        + '</button>';
    }).join('');
  }

  function renderPoints(s) {
    if (!detailList) return;
    detailList.innerHTML = s.points.map(function (p, i) {
      return ''
        + '<button type="button" class="wb-point' + (i === pointIndex ? ' is-on' : '') + '" data-point="' + i + '">'
        +   '<span class="wb-point__num">' + (i + 1) + '</span>'
        +   '<span><strong>' + escapeHtml(p.title) + '</strong><p>' + escapeHtml(p.text) + '</p></span>'
        + '</button>';
    }).join('');
  }

  function stopProgress() {
    if (progressRaf) cancelAnimationFrame(progressRaf);
    progressRaf = null;
    if (progressEl) {
      var bar = progressEl.querySelector('span');
      if (bar) bar.style.transform = 'scaleX(0)';
    }
  }

  function tickProgress() {
    if (!progressEl || paused) return;
    var bar = progressEl.querySelector('span');
    if (!bar) return;
    var p = Math.min(1, (Date.now() - progressStart) / AUTO_MS);
    bar.style.transform = 'scaleX(' + p + ')';
    if (p < 1) progressRaf = requestAnimationFrame(tickProgress);
  }

  function startProgress() {
    stopProgress();
    if (paused || reduceMotion) return;
    progressStart = Date.now();
    progressRaf = requestAnimationFrame(tickProgress);
  }

  function startPointCycle() {
    clearInterval(pointTimer);
    var s = steps[active];
    if (!s || s.points.length < 2 || paused) return;
    pointTimer = setInterval(function () {
      if (paused) return;
      pointIndex = (pointIndex + 1) % s.points.length;
      renderPoints(s);
    }, 2600);
  }

  function restartAuto() {
    clearInterval(timer);
    timer = null;
    stopProgress();
    if (paused || reduceMotion) return;
    startProgress();
    timer = setInterval(function () { setActive(active + 1, false); }, AUTO_MS);
  }

  function setPaused(next) {
    paused = !!next;
    if (pauseBtn) {
      pauseBtn.textContent = paused ? 'Play' : 'Pause';
      pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
    }
    if (paused) {
      clearInterval(timer);
      clearInterval(pointTimer);
      timer = null;
      pointTimer = null;
      stopProgress();
    } else {
      restartAuto();
      startPointCycle();
    }
  }

  function setActive(index, fromUser) {
    active = ((index % steps.length) + steps.length) % steps.length;
    pointIndex = 0;
    var s = steps[active];

    renderNav();
    renderPoints(s);

    if (stepLabel) stepLabel.textContent = 'Step ' + (active + 1) + ' of ' + steps.length;
    if (panelKicker) panelKicker.textContent = s.kicker;
    if (detailName) detailName.textContent = s.title;
    if (detailDesc) detailDesc.textContent = s.desc;
    if (iconEl) iconEl.textContent = s.icon;
    if (caption) caption.textContent = s.caption;
    if (nextCta) nextCta.textContent = active === steps.length - 1 ? 'Review again' : 'Next step';

    if (shot) {
      shot.classList.remove('is-in');
      void shot.offsetWidth;
      shot.src = s.image;
      shot.alt = s.alt;
      shot.onload = function () { shot.classList.add('is-in'); };
      shot.classList.add('is-in');
    }

    if (panel) {
      panel.classList.remove('is-pulse');
      void panel.offsetWidth;
      panel.classList.add('is-pulse');
    }
    if (viewer) {
      viewer.classList.remove('is-pulse');
      void viewer.offsetWidth;
      viewer.classList.add('is-pulse');
    }

    try {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#' + s.id);
      }
    } catch (e) { /* ignore */ }

    startPointCycle();
    if (fromUser) restartAuto();
    else if (!paused) startProgress();
  }

  if (stepNav) {
    stepNav.addEventListener('click', function (e) {
      var btn = e.target.closest('.wb-step');
      if (!btn) return;
      setActive(Number(btn.getAttribute('data-index')) || 0, true);
    });
  }

  if (detailList) {
    detailList.addEventListener('click', function (e) {
      var btn = e.target.closest('.wb-point');
      if (!btn) return;
      pointIndex = Number(btn.getAttribute('data-point')) || 0;
      renderPoints(steps[active]);
      startPointCycle();
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { setActive(active - 1, true); });
  if (nextBtn) nextBtn.addEventListener('click', function () { setActive(active + 1, true); });
  if (nextCta) nextCta.addEventListener('click', function () { setActive(active + 1, true); });
  if (pauseBtn) pauseBtn.addEventListener('click', function () { setPaused(!paused); });

  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === 'ArrowRight') { e.preventDefault(); setActive(active + 1, true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); setActive(active - 1, true); }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      pointIndex = (pointIndex + 1) % steps[active].points.length;
      renderPoints(steps[active]);
      startPointCycle();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      pointIndex = (pointIndex - 1 + steps[active].points.length) % steps[active].points.length;
      renderPoints(steps[active]);
      startPointCycle();
    }
    if (e.key === ' ') { e.preventDefault(); setPaused(!paused); }
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      clearInterval(timer);
      clearInterval(pointTimer);
      timer = null;
      pointTimer = null;
      stopProgress();
    } else if (!paused) {
      restartAuto();
      startPointCycle();
    }
  });

  var hash = (window.location.hash || '').replace(/^#/, '');
  var start = 0;
  if (hash) {
    var idx = steps.findIndex(function (s) { return s.id === hash; });
    if (idx >= 0) start = idx;
  }

  if (pauseBtn && paused) setPaused(true);
  setActive(start, false);
  if (!paused) restartAuto();
})();
