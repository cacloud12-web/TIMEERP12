(function () {
  'use strict';

  var PERIOD_DATA = {
    '24h': {
      response: '4', responseSuffix: ' min', resolution: '2.1', resolutionSuffix: ' hrs',
      uptime: '100', uptimeSuffix: '%', queue: '1.2', queueSuffix: ' min',
      trends: { response: '↓ 18% vs prior', resolution: '↓ 9% vs prior', uptime: 'Stable', queue: '↓ 22% vs prior' }
    },
    '7d': {
      response: '6', responseSuffix: ' min', resolution: '2.8', resolutionSuffix: ' hrs',
      uptime: '99.9', uptimeSuffix: '%', queue: '2.4', queueSuffix: ' min',
      trends: { response: '↓ 11% vs prior', resolution: '↓ 4% vs prior', uptime: 'Stable', queue: '↓ 8% vs prior' }
    },
    '30d': {
      response: '8', responseSuffix: ' min', resolution: '3.2', resolutionSuffix: ' hrs',
      uptime: '99.8', uptimeSuffix: '%', queue: '3.1', queueSuffix: ' min',
      trends: { response: '↓ 6% vs prior', resolution: '↑ 2% vs prior', uptime: '−0.1 pts', queue: '↓ 3% vs prior' }
    }
  };

  var COMPONENT_ORDER = ['chat', 'email', 'phone', 'portal', 'tickets'];

  var COMPONENT_DETAILS = {
    chat: {
      title: 'Live chat support',
      status: 'Operational',
      body: 'Live chat support is accepting requests. Current queue depth is normal and first-response targets are being met.',
      metrics: [
        { label: 'Average wait', value: '1.2 min', pct: 78 },
        { label: 'Agents online', value: '12', pct: 92 },
        { label: 'Resolved today', value: '148', pct: 86 }
      ],
      live: 'Wait 1.2 min'
    },
    email: {
      title: 'Email support queue',
      status: 'Operational',
      body: 'Email support queue is processing tickets on schedule. No backlog beyond standard SLA windows.',
      metrics: [
        { label: 'Queue depth', value: '23 tickets', pct: 64 },
        { label: 'Oldest ticket', value: '2.4 hrs', pct: 71 },
        { label: 'SLA compliance', value: '99.2%', pct: 99 }
      ],
      live: '23 in queue'
    },
    phone: {
      title: 'Phone support line',
      status: 'Operational',
      body: 'Phone support line is available during business hours with full agent coverage.',
      metrics: [
        { label: 'Call wait', value: '45 sec avg', pct: 82 },
        { label: 'Abandon rate', value: '1.8%', pct: 95 },
        { label: 'Coverage', value: '8am–8pm IST', pct: 100 }
      ],
      live: 'Wait 45 sec'
    },
    portal: {
      title: 'Help center portal',
      status: 'Operational',
      body: 'Help center portal is online. Knowledge base articles and ticket submission are available.',
      metrics: [
        { label: 'Portal uptime', value: '100%', pct: 100 },
        { label: 'Page load', value: '420 ms avg', pct: 88 },
        { label: 'Self-serve rate', value: '34%', pct: 34 }
      ],
      live: '100% up'
    },
    tickets: {
      title: 'Ticket system API',
      status: 'Operational',
      body: 'Ticket system API is responding normally for create, update, and status webhook calls.',
      metrics: [
        { label: 'API latency', value: '180 ms p95', pct: 90 },
        { label: 'Error rate', value: '0.02%', pct: 98 },
        { label: 'Webhooks', value: 'Delivering', pct: 100 }
      ],
      live: '180 ms p95'
    }
  };

  var periodBtns = document.querySelectorAll('.rts-period');
  var metricEls = document.querySelectorAll('[data-metric-key]');
  var componentCards = document.querySelectorAll('.rts-component');
  var detailPanel = document.getElementById('rtsComponentDetail');
  var currentComponent = 'chat';
  var autoplayOn = true;
  var autoplayTimer = null;
  var autoplayResumeTimer = null;
  var userPausedAutoplay = false;
  var metricAnimToken = 0;
  var statsIntroDone = false;

  var UPTIME_HEIGHTS = [92, 88, 95, 90, 85, 93, 91, 87, 94, 62, 89, 96, 92, 88, 90, 93, 91, 86, 94, 89, 92, 88, 95, 90, 93, 87, 91, 94, 89, 96];
  var UPTIME_VALUES = [100, 100, 100, 100, 99.9, 100, 100, 100, 100, 98.2, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
  var UPTIME_NOTES = [
    'All support channels available', 'All support channels available', 'All support channels available',
    'All support channels available', 'Brief portal latency spike resolved', 'All support channels available',
    'All support channels available', 'All support channels available', 'All support channels available',
    'Elevated email queue wait times', 'All support channels available', 'All support channels available',
    'All support channels available', 'All support channels available', 'All support channels available',
    'All support channels available', 'All support channels available', 'All support channels available',
    'All support channels available', 'All support channels available', 'All support channels available',
    'All support channels available', 'All support channels available', 'All support channels available',
    'All support channels available', 'All support channels available', 'All support channels available',
    'All support channels available', 'All support channels available', 'All support channels available'
  ];

  function buildUptimeData() {
    var data = [];
    for (var i = 0; i < 30; i++) {
      var d = new Date();
      d.setDate(d.getDate() - (29 - i));
      d.setHours(0, 0, 0, 0);
      var uptime = UPTIME_VALUES[i];
      var degraded = i === 9;
      data.push({
        date: d,
        uptime: uptime,
        height: UPTIME_HEIGHTS[i],
        degraded: degraded,
        status: degraded ? 'Degraded' : 'Operational',
        note: UPTIME_NOTES[i]
      });
    }
    return data;
  }

  function formatDate(d) {
    return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function initUptimeChart() {
    var chart = document.getElementById('rtsUptimeChart');
    var barsEl = document.getElementById('rtsUptimeBars');
    var tooltip = document.getElementById('rtsUptimeTooltip');
    var dayDetail = document.getElementById('rtsUptimeDayDetail');
    var avgEl = document.querySelector('#rtsUptimeAvg .rts-uptime__stat-value');
    var opEl = document.getElementById('rtsUptimeOperational');
    var incEl = document.querySelector('#rtsUptimeIncidents .rts-uptime__stat-value');
    var startLabel = document.getElementById('rtsUptimeStartLabel');
    if (!barsEl || !chart) return;

    var data = buildUptimeData();
    var selectedIdx = 29;
    var bars = [];

    var total = data.reduce(function (s, d) { return s + d.uptime; }, 0);
    var avg = (total / data.length).toFixed(1);
    var operational = data.filter(function (d) { return !d.degraded; }).length;
    var incidents = data.filter(function (d) { return d.degraded; }).length;

    if (avgEl) avgEl.textContent = avg + '%';
    if (opEl) opEl.textContent = operational + '/30';
    if (incEl) incEl.textContent = String(incidents);
    var incLabel = document.getElementById('rtsUptimeIncidentsLabel');
    if (incLabel) {
      incLabel.textContent = incidents === 1
        ? 'Day with degraded performance'
        : 'Days with degraded performance';
    }
    if (startLabel) startLabel.textContent = formatDate(data[0].date);

    data.forEach(function (day, idx) {
      var bar = document.createElement('button');
      bar.type = 'button';
      bar.className = 'rts-uptime__bar' + (day.degraded ? ' is-degraded' : '');
      bar.style.setProperty('--bar-height', day.height + '%');
      bar.setAttribute('role', 'listitem');
      bar.setAttribute('aria-label', formatDate(day.date) + ': ' + day.uptime + '% uptime, ' + day.status);
      bar.dataset.idx = String(idx);

      bar.addEventListener('mouseenter', function () {
        barsEl.classList.add('is-dimmed');
        bar.classList.add('is-hovered');
        showTooltip(bar, day);
      });
      bar.addEventListener('mousemove', function () { positionTooltip(bar); });
      bar.addEventListener('mouseleave', function () {
        barsEl.classList.remove('is-dimmed');
        bar.classList.remove('is-hovered');
        hideTooltip();
      });
      bar.addEventListener('click', function () { selectDay(idx); });
      bar.addEventListener('focus', function () { showTooltip(bar, day); positionTooltip(bar); });
      bar.addEventListener('blur', hideTooltip);

      barsEl.appendChild(bar);
      bars.push(bar);
    });

    function showTooltip(bar, day) {
      if (!tooltip) return;
      var statusClass = day.degraded ? 'rts-uptime__tooltip-status--warn' : 'rts-uptime__tooltip-status--ok';
      tooltip.innerHTML =
        '<div class="rts-uptime__tooltip-date">' + formatDate(day.date) + '</div>' +
        '<div class="rts-uptime__tooltip-uptime">' + day.uptime + '%</div>' +
        '<span class="rts-uptime__tooltip-status ' + statusClass + '">' + day.status + '</span>';
      tooltip.classList.add('is-visible');
      tooltip.setAttribute('aria-hidden', 'false');
      positionTooltip(bar);
    }

    function positionTooltip(bar) {
      if (!tooltip || !bar) return;
      var wrap = tooltip.parentElement;
      if (!wrap) return;
      var wrapRect = wrap.getBoundingClientRect();
      var barRect = bar.getBoundingClientRect();
      var tipW = tooltip.offsetWidth || 140;
      var x = barRect.left + barRect.width / 2 - wrapRect.left;
      var minX = tipW / 2 + 10;
      var maxX = wrapRect.width - tipW / 2 - 10;
      x = Math.max(minX, Math.min(maxX, x));
      tooltip.style.left = x + 'px';
      tooltip.style.top = '12px';
      tooltip.style.bottom = 'auto';
    }

    function hideTooltip() {
      if (!tooltip) return;
      tooltip.classList.remove('is-visible');
      tooltip.setAttribute('aria-hidden', 'true');
    }

    function selectDay(idx) {
      selectedIdx = idx;
      var day = data[idx];
      bars.forEach(function (b, i) {
        b.classList.toggle('is-selected', i === idx);
      });
      if (!dayDetail) return;
      var badgeClass = day.degraded ? 'rts-uptime__day-detail-badge--warn' : 'rts-uptime__day-detail-badge--ok';
      dayDetail.className = 'rts-uptime__day-detail is-visible' + (day.degraded ? ' is-degraded' : '');
      dayDetail.innerHTML =
        '<div>' +
          '<div class="rts-uptime__day-detail-date">' + formatDate(day.date) + ' · ' + day.uptime + '% uptime</div>' +
          '<div class="rts-uptime__day-detail-note">' + day.note + '</div>' +
        '</div>' +
        '<span class="rts-uptime__day-detail-badge ' + badgeClass + '">' + day.status + '</span>';
      var incidentsCard = document.getElementById('rtsUptimeIncidents');
      if (incidentsCard) incidentsCard.classList.toggle('is-highlight', day.degraded);
    }

    barsEl.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' && selectedIdx > 0) {
        e.preventDefault();
        selectDay(selectedIdx - 1);
        bars[selectedIdx].focus();
      } else if (e.key === 'ArrowRight' && selectedIdx < bars.length - 1) {
        e.preventDefault();
        selectDay(selectedIdx + 1);
        bars[selectedIdx].focus();
      }
    });

    if ('IntersectionObserver' in window) {
      var animated = false;
      var obs = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting || animated) return;
        animated = true;
        bars.forEach(function (bar, i) {
          setTimeout(function () { bar.classList.add('is-animated'); }, i * 25);
        });
        obs.disconnect();
      }, { threshold: 0.25 });
      obs.observe(chart);
    } else {
      bars.forEach(function (bar) { bar.classList.add('is-animated'); });
    }

    selectDay(29);
  }

  function animateNumber(el, target, duration, token) {
    var startVal = parseFloat(el.textContent) || 0;
    var isFloat = String(target).indexOf('.') !== -1;
    var endVal = parseFloat(target);
    var start = performance.now();
    function tick(now) {
      if (token != null && token !== metricAnimToken) return;
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = startVal + (endVal - startVal) * eased;
      el.textContent = isFloat ? val.toFixed(1) : String(Math.round(val));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function applyTrendClass(trendEl, text) {
    var worse = text.indexOf('↑') === 0 || text.indexOf('−') === 0 || text.indexOf('-') === 0;
    trendEl.classList.toggle('rts-metric__trend--down', worse);
    trendEl.classList.toggle('rts-metric__trend--up', !worse);
  }

  function setPeriod(period, animate) {
    var data = PERIOD_DATA[period] || PERIOD_DATA['24h'];
    metricAnimToken += 1;
    var token = metricAnimToken;
    periodBtns.forEach(function (btn) {
      var active = btn.getAttribute('data-period') === period;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    metricEls.forEach(function (el) {
      var key = el.getAttribute('data-metric-key');
      if (!data[key]) return;
      var numEl = el.querySelector('.rts-metric__number');
      var sufEl = el.querySelector('.rts-metric__suffix');
      var trendEl = el.querySelector('[data-trend]');
      el.classList.add('is-updating');
      setTimeout(function () { el.classList.remove('is-updating'); }, 450);
      if (numEl) {
        if (animate && statsIntroDone) animateNumber(numEl, data[key], 700, token);
        else numEl.textContent = data[key];
        numEl.setAttribute('data-count', data[key]);
      }
      if (sufEl) sufEl.textContent = data[key + 'Suffix'] || '';
      if (trendEl && data.trends && data.trends[key]) {
        trendEl.textContent = data.trends[key];
        applyTrendClass(trendEl, data.trends[key]);
      }
    });
  }

  function setComponent(id, fromUser) {
    var detail = COMPONENT_DETAILS[id];
    if (!detail || !detailPanel) return;
    currentComponent = id;
    if (fromUser) pauseAutoplayTemporarily();

    componentCards.forEach(function (card) {
      var active = card.getAttribute('data-component') === id;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    detailPanel.classList.remove('is-visible');
    setTimeout(function () {
      if (currentComponent !== id) return;
      detailPanel.innerHTML =
        '<div class="rts-detail__head">' +
          '<h3>' + detail.title + '</h3>' +
          '<span class="rts-detail__badge rts-detail__badge--ok">' + detail.status + '</span>' +
        '</div>' +
        '<p>' + detail.body + '</p>' +
        '<div class="rts-detail__metrics">' +
          detail.metrics.map(function (m) {
            return (
              '<div class="rts-detail__metric">' +
                '<div class="rts-detail__metric-label">' + m.label + '</div>' +
                '<div class="rts-detail__metric-value">' + m.value + '</div>' +
                '<div class="rts-detail__bar" aria-hidden="true"><div class="rts-detail__bar-fill" data-pct="' + m.pct + '"></div></div>' +
              '</div>'
            );
          }).join('') +
        '</div>';
      detailPanel.classList.add('is-visible');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailPanel.querySelectorAll('.rts-detail__bar-fill').forEach(function (fill) {
            fill.style.width = fill.getAttribute('data-pct') + '%';
          });
        });
      });
    }, 60);
  }

  function stepComponent(delta) {
    var idx = COMPONENT_ORDER.indexOf(currentComponent);
    if (idx < 0) idx = 0;
    var next = (idx + delta + COMPONENT_ORDER.length) % COMPONENT_ORDER.length;
    setComponent(COMPONENT_ORDER[next], true);
  }

  function clearAutoplayResume() {
    if (autoplayResumeTimer) {
      clearTimeout(autoplayResumeTimer);
      autoplayResumeTimer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    if (!autoplayOn || userPausedAutoplay) return;
    autoplayTimer = setInterval(function () {
      if (document.hidden) return;
      var idx = COMPONENT_ORDER.indexOf(currentComponent);
      var next = (idx + 1) % COMPONENT_ORDER.length;
      setComponent(COMPONENT_ORDER[next], false);
    }, 4500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function pauseAutoplayTemporarily() {
    stopAutoplay();
    clearAutoplayResume();
    if (!userPausedAutoplay && autoplayOn) {
      autoplayResumeTimer = setTimeout(function () {
        autoplayResumeTimer = null;
        startAutoplay();
      }, 8000);
    }
  }

  function setAutoplay(on) {
    autoplayOn = on;
    userPausedAutoplay = !on;
    clearAutoplayResume();
    var btn = document.getElementById('rtsChannelAuto');
    if (btn) {
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      var icon = btn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = on ? 'pause' : 'play_arrow';
    }
    if (on) startAutoplay();
    else stopAutoplay();
  }

  function initEvents() {
    var filters = document.querySelectorAll('.rts-events__filter');
    var events = document.querySelectorAll('.rts-event');

    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter') || 'all';
        filters.forEach(function (f) {
          var active = f === btn;
          f.classList.toggle('is-active', active);
          f.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        events.forEach(function (ev) {
          var type = ev.getAttribute('data-event-type');
          var show = filter === 'all' || type === filter;
          ev.hidden = !show;
        });
      });
    });

    events.forEach(function (ev) {
      function toggle() {
        var open = !ev.classList.contains('is-expanded');
        events.forEach(function (other) {
          other.classList.remove('is-expanded');
          other.setAttribute('aria-expanded', 'false');
        });
        if (open) {
          ev.classList.add('is-expanded');
          ev.setAttribute('aria-expanded', 'true');
        }
      }
      ev.addEventListener('click', toggle);
      ev.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  initUptimeChart();

  periodBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setPeriod(btn.getAttribute('data-period') || '24h', true);
    });
  });

  componentCards.forEach(function (card) {
    card.addEventListener('click', function () {
      setComponent(card.getAttribute('data-component') || 'chat', true);
    });
  });

  metricEls.forEach(function (el) {
    el.addEventListener('click', function () {
      metricEls.forEach(function (m) {
        m.classList.toggle('is-active', m === el);
        m.setAttribute('aria-pressed', m === el ? 'true' : 'false');
      });
    });
  });

  var prevBtn = document.getElementById('rtsChannelPrev');
  var nextBtn = document.getElementById('rtsChannelNext');
  var autoBtn = document.getElementById('rtsChannelAuto');

  if (prevBtn) prevBtn.addEventListener('click', function () { stepComponent(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { stepComponent(1); });
  if (autoBtn) autoBtn.addEventListener('click', function () { setAutoplay(!autoplayOn); });

  var statNums = document.querySelectorAll('.rts-metric__number[data-count]');
  var statsSection = document.querySelector('.rts-performance');
  if (statNums.length && statsSection && 'IntersectionObserver' in window) {
    var statsAnimated = false;
    function animateStats() {
      if (statsAnimated) return;
      statsAnimated = true;
      metricAnimToken += 1;
      var token = metricAnimToken;
      statNums.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var isFloat = String(el.getAttribute('data-count')).indexOf('.') !== -1;
        var duration = 1400;
        var start = performance.now();
        el.textContent = isFloat ? '0.0' : '0';
        function tick(now) {
          if (token !== metricAnimToken) return;
          var p = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target * eased;
          el.textContent = isFloat ? val.toFixed(1) : String(Math.floor(val));
          if (p < 1) requestAnimationFrame(tick);
          else statsIntroDone = true;
        }
        requestAnimationFrame(tick);
      });
      setTimeout(function () { statsIntroDone = true; }, 1500);
    }
    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        animateStats();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(statsSection);
  } else {
    statsIntroDone = true;
  }
  setTimeout(function () { statsIntroDone = true; }, 2000);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopAutoplay();
      clearAutoplayResume();
    } else if (autoplayOn && !userPausedAutoplay) {
      startAutoplay();
    }
  });

  initEvents();
  setPeriod('24h', false);
  setComponent('chat', false);
  startAutoplay();
})();
