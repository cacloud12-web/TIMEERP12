(function () {
  'use strict';

  var MAX_FILE_BYTES = 5 * 1024 * 1024;
  var ALLOWED_EXT = ['pdf', 'doc', 'docx'];
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var JOBS = [
    { id: 'sw-dev', title: 'Software Developer', department: 'Engineering', location: 'Remote', experience: '2-5 years', type: 'Full-time', salary: '₹8–15 LPA' },
    { id: 'ui-ux', title: 'UI/UX Designer', department: 'Design', location: 'Hybrid · Ghaziabad', experience: '2-5 years', type: 'Full-time', salary: '₹6–12 LPA' },
    { id: 'sales-ex', title: 'Sales Executive', department: 'Sales', location: 'Ghaziabad', experience: '1-3 years', type: 'Full-time', salary: '₹5–10 LPA + incentives' },
    { id: 'cs-ex', title: 'Customer Success Executive', department: 'Customer Success', location: 'Remote', experience: '1-3 years', type: 'Full-time', salary: '₹5–9 LPA' },
    { id: 'hr-ex', title: 'HR Executive', department: 'Human Resources', location: 'Ghaziabad', experience: '2-5 years', type: 'Full-time', salary: '₹4–8 LPA' },
    { id: 'mkt-ex', title: 'Marketing Executive', department: 'Marketing', location: 'Remote', experience: '1-3 years', type: 'Full-time', salary: '₹4–8 LPA' },
    { id: 'qa-eng', title: 'QA Engineer', department: 'Engineering', location: 'Remote', experience: '2-5 years', type: 'Full-time', salary: '₹6–11 LPA' },
    { id: 'laravel', title: 'Laravel Developer', department: 'Engineering', location: 'Remote', experience: '3-5 years', type: 'Full-time', salary: '₹10–18 LPA' }
  ];

  var filters = { dept: 'all', location: 'all', exp: 'all', type: 'all', query: '' };

  var form = document.getElementById('carApplicationForm');
  var jobsGrid = document.getElementById('carJobsGrid');
  var jobsEmpty = document.getElementById('carJobsEmpty');
  var jobSearch = document.getElementById('carJobSearch');
  var jobCountEl = document.getElementById('carJobCount');
  var filterDept = document.getElementById('carFilterDept');
  var filterLocation = document.getElementById('carFilterLocation');
  var filterExp = document.getElementById('carFilterExp');
  var filterType = document.getElementById('carFilterType');
  var positionSelect = document.getElementById('carPosition');
  var uploadZone = document.getElementById('carUploadZone');
  var resumeInput = document.getElementById('carResume');
  var uploadFile = document.getElementById('carUploadFile');
  var uploadProgress = document.getElementById('carUploadProgress');
  var uploadBar = document.getElementById('carUploadBar');
  var resumeError = document.getElementById('carResumeError');
  var submitBtn = document.getElementById('carSubmitBtn');
  var successModal = document.getElementById('carSuccessModal');
  var statNums = document.querySelectorAll('.car-stat__number[data-count]');
  var faqItems = document.querySelectorAll('.car-faq__item');
  var processSteps = document.querySelectorAll('.car-process__step');
  var testimonials = document.querySelectorAll('.car-testimonial');
  var testIndex = 0;
  var testTimer = null;
  var selectedFile = null;

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/\n/g, ' ');
  }

  function uniq(arr) {
    return arr.filter(function (v, i, a) { return a.indexOf(v) === i; });
  }

  function populateFilters() {
    if (!filterDept) return;
    uniq(JOBS.map(function (j) { return j.department; })).forEach(function (d) {
      filterDept.innerHTML += '<option value="' + escapeAttr(d) + '">' + escapeHtml(d) + '</option>';
    });
    uniq(JOBS.map(function (j) { return j.location; })).forEach(function (l) {
      filterLocation.innerHTML += '<option value="' + escapeAttr(l) + '">' + escapeHtml(l) + '</option>';
    });
    uniq(JOBS.map(function (j) { return j.experience; })).forEach(function (e) {
      filterExp.innerHTML += '<option value="' + escapeAttr(e) + '">' + escapeHtml(e) + '</option>';
    });
    uniq(JOBS.map(function (j) { return j.type; })).forEach(function (t) {
      filterType.innerHTML += '<option value="' + escapeAttr(t) + '">' + escapeHtml(t) + '</option>';
    });
    if (positionSelect) {
      JOBS.forEach(function (j) {
        positionSelect.innerHTML += '<option value="' + escapeAttr(j.title) + '">' + escapeHtml(j.title) + '</option>';
      });
      positionSelect.innerHTML += '<option value="General Application">General Application</option>';
    }
  }

  function getFilteredJobs() {
    return JOBS.filter(function (job) {
      if (filters.dept !== 'all' && job.department !== filters.dept) return false;
      if (filters.location !== 'all' && job.location !== filters.location) return false;
      if (filters.exp !== 'all' && job.experience !== filters.exp) return false;
      if (filters.type !== 'all' && job.type !== filters.type) return false;
      if (filters.query && job.title.toLowerCase().indexOf(filters.query) === -1) return false;
      return true;
    });
  }

  function renderJobs() {
    if (!jobsGrid) return;
    var list = getFilteredJobs();
    if (jobCountEl) {
      jobCountEl.innerHTML = '<strong>' + list.length + '</strong> open role' + (list.length === 1 ? '' : 's');
    }
    if (list.length === 0) {
      jobsGrid.innerHTML = '';
      if (jobsEmpty) jobsEmpty.hidden = false;
      return;
    }
    if (jobsEmpty) jobsEmpty.hidden = true;
    jobsGrid.innerHTML = list.map(function (job) {
      return '<article class="car-job-card" role="listitem" data-job-id="' + escapeAttr(job.id) + '">' +
        '<h3 class="car-job-card__title">' + escapeHtml(job.title) + '</h3>' +
        '<div class="car-job-card__meta">' +
          '<span><span class="material-symbols-outlined">business_center</span>' + escapeHtml(job.department) + '</span>' +
          '<span><span class="material-symbols-outlined">location_on</span>' + escapeHtml(job.location) + '</span>' +
          '<span><span class="material-symbols-outlined">work_history</span>' + escapeHtml(job.experience) + '</span>' +
          '<span><span class="material-symbols-outlined">schedule</span>' + escapeHtml(job.type) + '</span>' +
        '</div>' +
        (job.salary ? '<p class="car-job-card__salary">' + escapeHtml(job.salary) + '</p>' : '') +
        '<button type="button" class="car-job-card__apply" data-apply="' + escapeAttr(job.title) + '">Upload Resume</button>' +
      '</article>';
    }).join('');

    jobsGrid.querySelectorAll('[data-apply]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var title = btn.getAttribute('data-apply');
        if (positionSelect) positionSelect.value = title;
        var applySection = document.getElementById('apply');
        if (applySection) applySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        var nameInput = document.getElementById('carFullName');
        if (nameInput) nameInput.focus();
      });
    });
  }

  function injectJobSchema() {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': JOBS.map(function (job) {
        return {
          '@type': 'JobPosting',
          title: job.title,
          description: 'Join TIME ERP as ' + job.title + '. Apply via our careers page.',
          hiringOrganization: { '@type': 'Organization', name: 'TIME ERP', sameAs: 'https://timeerp.com' },
          jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: job.location } },
          employmentType: job.type.indexOf('Full') !== -1 ? 'FULL_TIME' : 'OTHER',
          datePosted: '2026-01-01'
        };
      })
    });
    document.head.appendChild(script);
  }

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var start = 0;
    var duration = 1400;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = start + (target - start) * eased;
      el.textContent = (decimals ? val.toFixed(decimals) : Math.floor(val)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    if (!statNums.length || !('IntersectionObserver' in window)) {
      statNums.forEach(animateCounter);
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statNums.forEach(function (el) { obs.observe(el); });
  }

  function initFaq() {
    faqItems.forEach(function (item) {
      var trigger = item.querySelector('.car-faq__trigger');
      var panel = item.querySelector('.car-faq__panel');
      if (!trigger || !panel) return;
      trigger.addEventListener('click', function () {
        var open = item.classList.contains('is-open');
        faqItems.forEach(function (i) {
          i.classList.remove('is-open');
          var t = i.querySelector('.car-faq__trigger');
          var p = i.querySelector('.car-faq__panel');
          if (t) t.setAttribute('aria-expanded', 'false');
          if (p) p.style.maxHeight = '0';
        });
        if (!open) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

  function initProcessTimeline() {
    if (!processSteps.length) return;
    var block = document.getElementById('carProcess');
    if (!block) return;

    function runAnimation() {
      processSteps.forEach(function (step, i) {
        setTimeout(function () {
          step.classList.add('is-revealed');
          processSteps.forEach(function (s, j) {
            s.classList.toggle('is-active', j <= i);
          });
        }, i * 300);
      });
    }

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        runAnimation();
        obs.disconnect();
      }, { threshold: 0.35 });
      obs.observe(block);
    } else {
      runAnimation();
    }
  }

  function showTestimonial(i) {
    if (!testimonials.length) return;
    testIndex = (i + testimonials.length) % testimonials.length;
    testimonials.forEach(function (t, j) { t.classList.toggle('is-active', j === testIndex); });
    document.querySelectorAll('.car-testimonials__dot').forEach(function (d, j) {
      d.classList.toggle('is-active', j === testIndex);
    });
  }

  function initTestimonials() {
    var dots = document.getElementById('carTestDots');
    if (dots) {
      testimonials.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'car-testimonials__dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
        dot.addEventListener('click', function () { showTestimonial(i); resetTestTimer(); });
        dots.appendChild(dot);
      });
    }
    var prev = document.getElementById('carTestPrev');
    var next = document.getElementById('carTestNext');
    if (prev) prev.addEventListener('click', function () { showTestimonial(testIndex - 1); resetTestTimer(); });
    if (next) next.addEventListener('click', function () { showTestimonial(testIndex + 1); resetTestTimer(); });
    resetTestTimer();
  }

  function resetTestTimer() {
    clearInterval(testTimer);
    testTimer = setInterval(function () { showTestimonial(testIndex + 1); }, 6000);
  }

  function setFieldError(fieldKey, msg) {
    var wrap = form && form.querySelector('[data-field="' + fieldKey + '"]');
    if (!wrap) return;
    var err = wrap.querySelector('.car-form-field__error');
    if (err) err.textContent = msg || '';
    wrap.classList.toggle('is-error', !!msg);
  }

  function validateEmail(v) {
    return EMAIL_RE.test(v.trim());
  }

  function validatePhone(v) {
    return v.replace(/\D/g, '').length >= 10;
  }

  function getExt(name) {
    var parts = name.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
  }

  function validateFile(file) {
    if (!file) return 'Resume is required.';
    if (file.size > MAX_FILE_BYTES) return 'File must be 5 MB or smaller.';
    if (ALLOWED_EXT.indexOf(getExt(file.name)) === -1) return 'Use PDF, DOC, or DOCX only.';
    return '';
  }

  function showFile(file) {
    selectedFile = file;
    if (!uploadZone || !uploadFile) return;
    uploadZone.classList.add('has-file');
    uploadZone.classList.remove('is-error');
    uploadFile.hidden = false;
    uploadFile.innerHTML = '<span class="material-symbols-outlined">description</span> ' + escapeHtml(file.name) +
      ' <button type="button" class="car-upload__remove" aria-label="Remove file">&times;</button>';
    var rm = uploadFile.querySelector('.car-upload__remove');
    if (rm) rm.addEventListener('click', clearFile);
    if (resumeError) resumeError.textContent = '';
  }

  function clearFile(e) {
    if (e) e.stopPropagation();
    selectedFile = null;
    if (resumeInput) resumeInput.value = '';
    if (uploadZone) uploadZone.classList.remove('has-file', 'is-error');
    if (uploadFile) uploadFile.hidden = true;
    if (uploadProgress) uploadProgress.classList.remove('is-visible');
    if (uploadBar) uploadBar.style.width = '0';
  }

  function simulateUploadProgress(cb) {
    if (!uploadProgress || !uploadBar) { cb(); return; }
    uploadProgress.classList.add('is-visible');
    var p = 0;
    var iv = setInterval(function () {
      p += 12 + Math.random() * 15;
      if (p >= 100) {
        p = 100;
        uploadBar.style.width = '100%';
        clearInterval(iv);
        setTimeout(cb, 300);
      } else {
        uploadBar.style.width = p + '%';
      }
    }, 120);
  }

  function initUpload() {
    if (!uploadZone || !resumeInput) return;
    uploadZone.addEventListener('click', function (e) {
      if (e.target.closest('.car-upload__remove')) return;
      resumeInput.click();
    });
    uploadZone.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); resumeInput.click(); }
    });
    ['dragenter', 'dragover'].forEach(function (ev) {
      uploadZone.addEventListener(ev, function (e) { e.preventDefault(); uploadZone.classList.add('is-dragover'); });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      uploadZone.addEventListener(ev, function (e) {
        e.preventDefault();
        uploadZone.classList.remove('is-dragover');
        if (ev === 'drop' && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
      });
    });
    resumeInput.addEventListener('change', function () {
      if (resumeInput.files[0]) handleFile(resumeInput.files[0]);
    });
  }

  function handleFile(file) {
    var err = validateFile(file);
    if (err) {
      if (resumeError) resumeError.textContent = err;
      uploadZone.classList.add('is-error');
      clearFile();
      return;
    }
    showFile(file);
  }

  function validateForm() {
    var valid = true;
    var fullName = document.getElementById('carFullName');
    var email = document.getElementById('carEmail');
    var phone = document.getElementById('carPhone');
    var city = document.getElementById('carCity');
    var position = document.getElementById('carPosition');
    var experience = document.getElementById('carExperience');

    setFieldError('fullName', !fullName.value.trim() ? 'Full name is required.' : '');
    if (!fullName.value.trim()) valid = false;

    setFieldError('email', !email.value.trim() ? 'Email is required.' : !validateEmail(email.value) ? 'Enter a valid email.' : '');
    if (!email.value.trim() || !validateEmail(email.value)) valid = false;

    setFieldError('phone', !phone.value.trim() ? 'Phone is required.' : !validatePhone(phone.value) ? 'Enter at least 10 digits.' : '');
    if (!phone.value.trim() || !validatePhone(phone.value)) valid = false;

    setFieldError('city', !city.value.trim() ? 'City is required.' : '');
    if (!city.value.trim()) valid = false;

    setFieldError('position', !position.value ? 'Select a position.' : '');
    if (!position.value) valid = false;

    setFieldError('experience', !experience.value ? 'Select experience.' : '');
    if (!experience.value) valid = false;

    var fileErr = validateFile(selectedFile);
    if (resumeError) resumeError.textContent = fileErr;
    if (uploadZone) uploadZone.classList.toggle('is-error', !!fileErr);
    if (fileErr) valid = false;

    return valid;
  }

  function openSuccessModal() {
    if (!successModal) return;
    successModal.classList.add('is-open');
    successModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSuccessModal() {
    if (!successModal) return;
    successModal.classList.remove('is-open');
    successModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initModal() {
    if (!successModal) return;
    successModal.addEventListener('click', function (e) {
      if (e.target.closest('[data-car-close]')) closeSuccessModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && successModal.classList.contains('is-open')) closeSuccessModal();
    });
  }

  function bindFilters() {
    if (jobSearch) {
      jobSearch.addEventListener('input', function () {
        filters.query = jobSearch.value.trim().toLowerCase();
        renderJobs();
      });
    }
    [[filterDept, 'dept'], [filterLocation, 'location'], [filterExp, 'exp'], [filterType, 'type']].forEach(function (pair) {
      if (!pair[0]) return;
      pair[0].addEventListener('change', function () {
        filters[pair[1]] = pair[0].value;
        renderJobs();
      });
    });
  }

  function bindFormRealtime() {
    if (!form) return;
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('blur', function () {
        if (form.dataset.submitted !== 'true') return;
        validateForm();
      });
      el.addEventListener('input', function () {
        var wrap = el.closest('[data-field]');
        if (wrap && wrap.classList.contains('is-error')) validateForm();
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.dataset.submitted = 'true';
      if (!validateForm()) {
        var firstErr = form.querySelector('.is-error input, .is-error select, .car-upload.is-error');
        if (firstErr) firstErr.focus();
        return;
      }
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
      simulateUploadProgress(function () {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        form.reset();
        form.dataset.submitted = 'false';
        clearFile();
        form.querySelectorAll('.car-form-field').forEach(function (f) { f.classList.remove('is-error'); });
        if (resumeError) resumeError.textContent = '';
        openSuccessModal();
      });
    });
  }

  function initFooter() {
    var backTop = document.getElementById('backTop');
    if (backTop) {
      window.addEventListener('scroll', function () {
        backTop.classList.toggle('is-visible', window.scrollY > 600);
      }, { passive: true });
      backTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    document.querySelectorAll('.footer__col-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var col = btn.closest('.footer__col');
        var open = col.classList.contains('is-open');
        document.querySelectorAll('.footer__col').forEach(function (c) {
          c.classList.remove('is-open');
          var t = c.querySelector('.footer__col-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          col.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function init() {
    populateFilters();
    renderJobs();
    bindFilters();
    initUpload();
    bindFormRealtime();
    initModal();
    initCounters();
    initFaq();
    initProcessTimeline();
    initTestimonials();
    injectJobSchema();
    initFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
