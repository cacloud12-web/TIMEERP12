/**
 * Interactive blog create walkthrough.
 * Screenshots: 1 → Website, 4 → Blogs tile, 5 → Add New Blog, 6 → Add Blog form.
 */
(function () {
  'use strict';

  var IMG = 'assets/website-builder-screens/blog/';
  var AUTO_MS = 9000;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var steps = [
    {
      id: 'open-website',
      title: 'Open Website',
      kicker: 'Step 1 · Start',
      desc: 'From the left sidebar, click Website. This opens the Website hub where Blogs and other site tiles are available.',
      icon: 'web',
      image: IMG + 'step-1.png',
      alt: 'TIME ERP Website module open with six Website tiles',
      caption: 'Click Website in the left sidebar to open the module.',
      how: 'Select Website in the menu. When it highlights, the Website page with six tiles appears on the right.',
      points: [
        { title: 'Open Website', text: 'Find Website in the left menu and click it.' },
        { title: 'Confirm Active', text: 'Keep Active on when your public website should stay live.' },
        { title: 'Find Blogs', text: 'Locate the Blogs tile among the six Website options.' }
      ]
    },
    {
      id: 'open-blogs',
      title: 'Open Blogs',
      kicker: 'Step 2 · Choose tile',
      desc: 'On the Website hub, click the Blogs tile to open your blog list and start publishing articles for SEO and client updates.',
      icon: 'article',
      image: IMG + 'step-2.png',
      alt: 'Website hub with Blogs tile highlighted',
      caption: 'Click the Blogs tile on the Website hub.',
      how: 'Blogs is in the top row of Website tiles. Click it once to open the Blogs manager.',
      points: [
        { title: 'Click Blogs', text: 'Open the tile with the writer / tablet icon.' },
        { title: 'What you get', text: 'A list of posts plus tools to add tags, categories, and blogs.' },
        { title: 'Next screen', text: 'You will see the Blogs table and a + action button.' }
      ]
    },
    {
      id: 'add-new-blog',
      title: 'Add New Blog',
      kicker: 'Step 3 · Create',
      desc: 'In Blogs, click the + button and choose Add New Blog. You can also add tags or categories first if needed.',
      icon: 'add_circle',
      image: IMG + 'step-3.png',
      alt: 'Blogs list with plus menu showing Add New Blog',
      caption: 'Click + then choose Add New Blog.',
      how: 'Use the blue + button at the top right of the Blogs table, then pick Add New Blog from the menu.',
      points: [
        { title: 'Click +', text: 'Open the create menu on the Blogs page.' },
        { title: 'Add New Tag', text: 'Optional: create tags before writing posts.' },
        { title: 'Add New Category', text: 'Optional: create categories to group articles.' },
        { title: 'Add New Blog', text: 'Choose this option to open the Add Blog form.' }
      ]
    },
    {
      id: 'publish-blog',
      title: 'Fill & Save Blog',
      kicker: 'Step 4 · Publish',
      desc: 'Complete the Add Blog form carefully, then click Save. Title and Slug are required.',
      icon: 'publish',
      image: IMG + 'step-4.png',
      alt: 'Add Blog form with title, content editor, slug, and Save',
      caption: 'Fill Title, Content, Slug, and other fields, then Save.',
      how: 'Work top to bottom: title → content → slug → summary → image → trending → category & tags → Save.',
      points: [
        { title: 'Title *', text: 'Write a clear headline for the article.' },
        { title: 'Content', text: 'Use the rich text editor for body copy, links, and formatting.' },
        { title: 'Slug *', text: 'Set the URL slug for the post (required).' },
        { title: 'Short Description', text: 'Add a short summary for listings and SEO.' },
        { title: 'Image', text: 'Click to Upload a featured image for the post.' },
        { title: 'Is Trending', text: 'Turn on if this post should appear as trending.' },
        { title: 'Category', text: 'Select a category from the dropdown.' },
        { title: 'Tags', text: 'Select one or more tags for discovery.' },
        { title: 'Save', text: 'Click Save to publish the blog to your website.' }
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
    if (nextCta) nextCta.textContent = active === steps.length - 1 ? 'Review again' : 'Next step →';

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
