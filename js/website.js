/**
 * TIME ERP Website guide.
 * Official Website tiles only (Company Details, Main Dashboard, My Services,
 * Blogs, About Us, Gallery):
 * https://guide.caclouddesk.com/Module/Marketing/website-help.html
 */
(function () {
  'use strict';

  var features = [
    {
      id: 'company',
      title: 'Company Details',
      desc: 'Update how your firm appears on the public website: name, contact, logos, map, and address.',
      icon: 'apartment',
      href: 'website_builder.html',
      cta: 'Open Website Builder',
      steps: [
        { title: 'Open Company Details', text: 'From Website, open the Company Details tile to edit your firm profile.' },
        { title: 'Fill public profile fields', text: 'Set Website Name, Domain Name, mobile, WhatsApp, email, logos, favicon, description, address, and Google Map URL.' },
        { title: 'Save changes', text: 'Click Save so visitors see the updated firm details across your site.' }
      ],
      demo: ['Website Name', 'Domain Name', 'Mobile & WhatsApp', 'Logo & Favicon', 'Address & Map'],
      tip: 'Open Website Builder for a screenshot walkthrough of Company Details and blog setup.'
    },
    {
      id: 'dashboard',
      title: 'Main Dashboard',
      desc: 'Control homepage content: hero text, banner, client logos, portfolio, services header, and client feedback.',
      icon: 'dashboard',
      href: 'dashboard.html',
      cta: 'Open Dashboard',
      steps: [
        { title: 'Open Main Dashboard', text: 'Use the Main Dashboard tile to manage what visitors see on your homepage.' },
        { title: 'Edit Dashboard tab', text: 'Set the main hero heading, description, key heading, and banner image.' },
        { title: 'Add trust and proof', text: 'Upload client logos, portfolio items, services header copy, and client feedback.' }
      ],
      demo: ['Hero heading', 'Banner image', 'Client logos', 'Portfolio', 'Testimonials'],
      tip: 'Use homepage sections to build trust quickly with logos, case highlights, and client feedback.'
    },
    {
      id: 'services',
      title: 'My Services',
      desc: 'Browse company industries TIME ERP serves and open Real Estate services for a full capability list.',
      icon: 'design_services',
      href: 'MYservice.html',
      cta: 'Open My Services',
      steps: [
        { title: 'Open My Services', text: 'Click the My Services tile to see the six company industries.' },
        { title: 'Select a company', text: 'Choose Construction, Real Estate, Property Dealer, CA, MSME, or Professional Services.' },
        { title: 'Open the services page', text: 'Each company opens its dedicated services page with native and related modules.' }
      ],
      demo: ['Construction', 'Real Estate', 'Property Dealer', 'CA Firms', 'MSME', 'Professional Services'],
      tip: 'Start with any company card to see TIME ERP services for that industry.'
    },
    {
      id: 'blogs',
      title: 'Blogs',
      desc: 'Publish articles that improve SEO and keep clients updated on practice news and guidance.',
      icon: 'article',
      href: 'blog_create.html',
      cta: 'Open Blog',
      steps: [
        { title: 'Open Website', text: 'From the sidebar, open Website to see the Blogs tile.' },
        { title: 'Open Blogs', text: 'Click Blogs, then use + to add a tag, category, or new blog.' },
        { title: 'Fill & Save', text: 'Add title, content, slug, image, category, and tags, then Save.' }
      ],
      demo: ['Open Website', 'Click Blogs', 'Add New Blog', 'Title & slug', 'Save'],
      tip: 'Open Blog for a screenshot walkthrough of how to create and publish a post.'
    },
    {
      id: 'about',
      title: 'About Us',
      desc: 'Tell your firm story with About Us, Why Us, Mission & Vision, and Team Members.',
      icon: 'groups',
      href: 'about.html',
      cta: 'Open About',
      steps: [
        { title: 'Edit About Us', text: 'Add the main heading, description, and image for your firm story page.' },
        { title: 'Add Why Us and Mission', text: 'Highlight strengths, then set mission and vision headings with short descriptions.' },
        { title: 'Add team members', text: 'Add name, designation, image, and whether the member is a team lead.' }
      ],
      demo: ['About Us', 'Why Us', 'Mission & Vision', 'Team Members', 'Team lead flag'],
      tip: 'A clear story and team section help prospects understand why they should work with you.'
    },
    {
      id: 'gallery',
      title: 'Gallery',
      desc: 'Share photos from events, seminars, and office activities through event based albums.',
      icon: 'photo_library',
      steps: [
        { title: 'Open Gallery', text: 'From Website, open the Gallery tile to manage visual events.' },
        { title: 'Add a new event', text: 'Click Add New Event, give it a title, and upload one or more images.' },
        { title: 'Save to publish', text: 'Save so the event and photos appear on your public website gallery.' }
      ],
      demo: ['Add New Event', 'Event title', 'Upload images', 'Save & publish', 'Public gallery'],
      tip: 'Event photos make your practice feel active and approachable for prospective clients.'
    }
  ];

  var grid = document.getElementById('webGrid');
  var stepLabel = document.getElementById('webStepLabel');
  var detailName = document.getElementById('webDetailName');
  var detailDesc = document.getElementById('webDetailDesc');
  var detailIcon = document.getElementById('webDetailIcon');
  var stepsEl = document.getElementById('webSteps');
  var demoList = document.getElementById('webDemoList');
  var demoNote = document.getElementById('webDetailTip');
  var demoLabel = document.getElementById('webDemoLabel');
  var prevBtn = document.getElementById('webPrev');
  var nextBtn = document.getElementById('webNext');
  var pauseBtn = document.getElementById('webPause');
  var active = 0;
  var paused = false;
  var timer = null;
  var stepTimer = null;
  var stepIndex = 0;

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function cardCta(f, isActive) {
    if (f.href) return f.cta || 'Open page';
    return isActive ? 'Viewing guide' : 'Open Guide';
  }

  function renderGrid() {
    if (!grid) return;
    grid.innerHTML = features.map(function (f, i) {
      return ''
        + '<button type="button" class="web-card' + (i === active ? ' is-active' : '') + (f.href ? ' web-card--link' : '') + '" role="tab" aria-selected="' + (i === active ? 'true' : 'false') + '" data-index="' + i + '"' + (f.href ? ' data-href="' + escapeHtml(f.href) + '"' : '') + '>'
        +   '<span class="web-card__icon" aria-hidden="true"><span class="material-symbols-outlined">' + escapeHtml(f.icon) + '</span></span>'
        +   '<h3>' + escapeHtml(f.title) + '</h3>'
        +   '<p>' + escapeHtml(f.desc) + '</p>'
        +   '<span class="web-card__btn">' + escapeHtml(cardCta(f, i === active)) + '</span>'
        + '</button>';
    }).join('');
  }

  function renderSteps(f) {
    if (!stepsEl) return;
    stepsEl.innerHTML = f.steps.map(function (s, i) {
      return ''
        + '<div class="web-step' + (i === stepIndex ? ' is-on' : '') + '">'
        +   '<span class="web-step__num">' + (i + 1) + '</span>'
        +   '<span><strong>' + escapeHtml(s.title) + '</strong><p>' + escapeHtml(s.text) + '</p></span>'
        + '</div>';
    }).join('');
  }

  function renderDemo(f) {
    if (!demoList) return;
    demoList.innerHTML = f.demo.map(function (item, i) {
      return ''
        + '<div class="web-demo__item" style="animation-delay:' + (i * 0.07) + 's">'
        +   '<span class="material-symbols-outlined" aria-hidden="true">check_circle</span>'
        +   '<span>' + escapeHtml(item) + '</span>'
        + '</div>';
    }).join('');
    if (demoLabel) demoLabel.textContent = f.title;
    if (demoNote) demoNote.textContent = f.tip;
  }

  function setActive(index, fromUser) {
    active = (index + features.length) % features.length;
    stepIndex = 0;
    var f = features[active];
    if (stepLabel) stepLabel.textContent = 'Section ' + (active + 1) + ' of ' + features.length;
    if (detailName) detailName.textContent = f.title;
    if (detailDesc) detailDesc.textContent = f.desc;
    if (detailIcon) detailIcon.textContent = f.icon;
    renderGrid();
    renderSteps(f);
    renderDemo(f);
    if (fromUser) restartAuto();
    startStepCycle();
  }

  function startStepCycle() {
    clearInterval(stepTimer);
    var f = features[active];
    stepTimer = setInterval(function () {
      if (paused) return;
      stepIndex = (stepIndex + 1) % f.steps.length;
      renderSteps(f);
    }, 2800);
  }

  function restartAuto() {
    clearInterval(timer);
    if (paused) return;
    timer = setInterval(function () {
      setActive(active + 1, false);
    }, 9000);
  }

  if (grid) {
    grid.addEventListener('click', function (e) {
      var card = e.target.closest('.web-card');
      if (!card) return;
      var href = card.getAttribute('data-href');
      if (href) {
        window.location.href = href;
        return;
      }
      setActive(Number(card.getAttribute('data-index')) || 0, true);
      var spot = document.getElementById('webSpotlight');
      if (spot) spot.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { setActive(active - 1, true); });
  if (nextBtn) nextBtn.addEventListener('click', function () { setActive(active + 1, true); });
  if (pauseBtn) {
    pauseBtn.addEventListener('click', function () {
      paused = !paused;
      pauseBtn.textContent = paused ? 'Play' : 'Pause';
      pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
      if (paused) clearInterval(timer);
      else restartAuto();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') setActive(active + 1, true);
    if (e.key === 'ArrowLeft') setActive(active - 1, true);
  });

  setActive(0, false);
  restartAuto();
})();
