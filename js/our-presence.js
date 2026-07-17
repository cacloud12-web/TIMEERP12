/**
 * TIME ERP — Our Presence
 * MapLibre GL + OpenFreeMap vector tiles (Google Maps–like clarity)
 */
(function () {
  'use strict';

  /* All client pins use the same brand teal (visual only; markerType data unchanged) */
  var MARKER_COLORS = {
    head: '#25B7A7',
    regional: '#25B7A7',
    partner: '#25B7A7',
    soon: '#25B7A7'
  };

  var MAP_STYLE = 'https://tiles.openfreemap.org/styles/bright';

  /* TEMP INTERNAL TEST — set true only for UAE emirates QA */
  var UAE_EMIRATE_TEST_MODE = false;

  /* Seven UAE emirates (administrative units) — test-only dataset */
  var UAE_EMIRATE_TEST_LOCATIONS = [
    { id: 'em-abu-dhabi', country: 'United Arab Emirates', countryId: 'uae', region: 'Abu Dhabi', city: 'Abu Dhabi', emirate: 'Abu Dhabi', latitude: 24.4539, longitude: 54.3773, officeType: 'Emirate', markerType: 'regional', address: 'Abu Dhabi, UAE', services: ['Sales', 'Support', 'Demo'], aliases: ['Abu Dhabi Emirate'] },
    { id: 'em-dubai', country: 'United Arab Emirates', countryId: 'uae', region: 'Dubai', city: 'Dubai', emirate: 'Dubai', latitude: 25.2048, longitude: 55.2708, officeType: 'Emirate', markerType: 'regional', address: 'Dubai, UAE', services: ['Sales', 'Support', 'Demo'], aliases: ['Dubai Emirate'] },
    { id: 'em-sharjah', country: 'United Arab Emirates', countryId: 'uae', region: 'Sharjah', city: 'Sharjah', emirate: 'Sharjah', latitude: 25.3463, longitude: 55.4209, officeType: 'Emirate', markerType: 'partner', address: 'Sharjah, UAE', services: ['Sales', 'Support'], aliases: ['Sharjah Emirate'] },
    { id: 'em-ajman', country: 'United Arab Emirates', countryId: 'uae', region: 'Ajman', city: 'Ajman', emirate: 'Ajman', latitude: 25.4052, longitude: 55.5136, officeType: 'Emirate', markerType: 'partner', address: 'Ajman, UAE', services: ['Sales', 'Support'], aliases: ['Ajman Emirate'] },
    { id: 'em-uaq', country: 'United Arab Emirates', countryId: 'uae', region: 'Umm Al Quwain', city: 'Umm Al Quwain', emirate: 'Umm Al Quwain', latitude: 25.5647, longitude: 55.5552, officeType: 'Emirate', markerType: 'partner', address: 'Umm Al Quwain, UAE', services: ['Sales', 'Support'], aliases: ['UAQ', 'Umm Al Quwain Emirate'] },
    { id: 'em-rak', country: 'United Arab Emirates', countryId: 'uae', region: 'Ras Al Khaimah', city: 'Ras Al Khaimah', emirate: 'Ras Al Khaimah', latitude: 25.7895, longitude: 55.9432, officeType: 'Emirate', markerType: 'partner', address: 'Ras Al Khaimah, UAE', services: ['Sales', 'Support'], aliases: ['RAK', 'Ras Al Khaimah Emirate'] },
    { id: 'em-fujairah', country: 'United Arab Emirates', countryId: 'uae', region: 'Fujairah', city: 'Fujairah', emirate: 'Fujairah', latitude: 25.1288, longitude: 56.3265, officeType: 'Emirate', markerType: 'partner', address: 'Fujairah, UAE', services: ['Sales', 'Support'], aliases: ['Fujairah Emirate'] }
  ];

  var UAE_TEST_FIT_BOUNDS = [[51.55, 22.55], [56.55, 26.35]];

  /* Tight camera lock: India + UAE (all emirates), minimal empty padding */
  var FOCUS_MAX_BOUNDS = [[50.6, 5.9], [98.4, 36.3]];
  var FOCUS_FIT_BOUNDS = [[51.5, 7.0], [97.45, 35.45]];

  var state = {
    map: null,
    data: null,
    markersById: {},
    activeId: null,
    searchIndex: [],
    pendingFocus: null,
    lastSearchLoc: null,
    startMap: null
  };

  function normalizeQuery(q) {
    return String(q || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/\n/g, ' ');
  }

  function animateCounters() {
    $all('[data-count]').forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var started = false;
      var obs = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        var start = 0;
        var dur = 1600;
        var t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = Math.round(start + (target - start) * eased);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        obs.disconnect();
      }, { threshold: 0.4 });
      obs.observe(el);
    });
  }

  function pinHtml(type, isActive, city, loc) {
    var color = MARKER_COLORS[type] || MARKER_COLORS.partner;
    var label = (loc && loc.emirate)
      ? ('Emirate: ' + loc.emirate)
      : city;
    var svg =
      '<svg viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path fill="' + color + '" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round" ' +
      'd="M14 1.2C8.2 1.2 3.5 5.9 3.5 11.7c0 7.4 8.2 16.6 10.1 18.6a.7.7 0 0 0 1 0c1.9-2 10.1-11.2 10.1-18.6C24.7 5.9 20 1.2 14 1.2z"/>' +
      '<circle cx="14" cy="11.5" r="4.2" fill="#ffffff"/>' +
      '</svg>';
    return (
      '<div class="presence-marker' + (isActive ? ' is-active' : '') + '">' +
      svg +
      '<span class="presence-city-label' + (isActive ? ' is-active-label' : '') + '">' + escapeHtml(label) + '</span>' +
      '</div>'
    );
  }

  function googleMapsUrl(loc) {
    return 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(loc.latitude + ',' + loc.longitude + ' (' + loc.city + ')');
  }

  function openDrawer(loc) {
    var drawer = $('#presenceDrawer');
    var backdrop = $('#presenceDrawerBackdrop');
    if (!drawer) return;

    $('#drawerCity').textContent = loc.emirate
      ? ('Emirate: ' + loc.emirate)
      : loc.city;
    $('#drawerCountry').textContent = (loc.countryId === 'india' ? '🇮🇳 ' : '🇦🇪 ') + loc.country;
    $('#drawerRegion').textContent = loc.emirate
      ? ('Administrative unit · ' + loc.emirate)
      : (loc.region || '');
    $('#drawerAddress').textContent = loc.address || '';

    var services = $('#drawerServices');
    services.innerHTML = (loc.services || []).map(function (s) {
      return '<li><span aria-hidden="true">✓</span> ' + escapeHtml(s) + '</li>';
    }).join('');

    $('#drawerDirections').href = googleMapsUrl(loc);

    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (backdrop) {
      backdrop.classList.add('is-open');
      backdrop.hidden = false;
    }
    document.body.classList.add('drawer-open');
  }

  function closeDrawer(opts) {
    opts = opts || {};
    var drawer = $('#presenceDrawer');
    var backdrop = $('#presenceDrawerBackdrop');
    if (drawer) {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
    }
    if (backdrop) {
      backdrop.classList.remove('is-open');
      backdrop.hidden = true;
    }
    document.body.classList.remove('drawer-open');

    if (!opts.keepActive && state.activeId) {
      updateMarkerActive(state.activeId, false);
      state.activeId = null;
    }
  }

  function updateMarkerActive(id, isActive) {
    var entry = state.markersById[id];
    if (!entry) return;
    var loc = entry.loc;
    entry.el.innerHTML = pinHtml(loc.markerType, isActive, loc.city, loc);
    entry.el.classList.toggle('is-active-wrap', isActive);
  }

  function syncLabelVisibility() {
    if (!state.map) return;
    var show = UAE_EMIRATE_TEST_MODE || state.map.getZoom() >= 9.5;
    document.querySelectorAll('.presence-city-label').forEach(function (label) {
      label.style.opacity = show ? '1' : '0';
      label.style.visibility = show ? 'visible' : 'hidden';
    });
  }

  function flyToLocation(loc, zoom) {
    if (!state.map || !loc) return;
    var targetZoom = zoom != null ? zoom : 12.5;
    state.map.flyTo({
      center: [Number(loc.longitude), Number(loc.latitude)],
      zoom: targetZoom,
      essential: true,
      duration: 1200
    });
  }

  function focusLocation(loc, opts) {
    opts = opts || {};
    if (!loc) return;

    var shouldOpenDrawer = opts.openDrawer !== false;
    var mapSection = $('#map-section');
    if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (!state.map) {
      state.pendingFocus = { loc: loc, opts: opts };
      if (typeof state.startMap === 'function') state.startMap();
      return;
    }

    if (state.activeId && state.activeId !== loc.id) {
      updateMarkerActive(state.activeId, false);
    }
    state.activeId = loc.id;
    updateMarkerActive(loc.id, true);
    flyToLocation(loc, opts.zoom != null ? opts.zoom : 12.5);
    setTimeout(syncLabelVisibility, 400);

    if (shouldOpenDrawer) openDrawer(loc);
    else closeDrawer({ keepActive: true });
  }

  function selectSearchLocation(loc) {
    if (!loc) return;
    state.lastSearchLoc = loc;
    var searchInput = $('#presenceSearch');
    if (searchInput) searchInput.value = loc.city;
    renderSearchResults('');
    $all('[data-country-zoom]').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-country-zoom') === loc.countryId);
    });
    focusLocation(loc, UAE_EMIRATE_TEST_MODE
      ? { zoom: 10.5, openDrawer: true }
      : { zoom: 12.5, openDrawer: false });
  }

  function resolveCityForCountry(countryId) {
    var searchInput = $('#presenceSearch');
    var query = searchInput ? searchInput.value : '';
    var matches = getSearchMatches(query);
    if (matches.length) {
      var inCountry = matches.find(function (m) { return m.loc.countryId === countryId; });
      if (inCountry) return inCountry.loc;
    }
    if (state.lastSearchLoc && state.lastSearchLoc.countryId === countryId) return state.lastSearchLoc;
    if (state.activeId && state.markersById[state.activeId]) {
      var active = state.markersById[state.activeId].loc;
      if (active && active.countryId === countryId) return active;
    }
    return null;
  }

  function getSearchMatches(query) {
    var q = normalizeQuery(query);
    if (!q) return [];
    var scored = state.searchIndex.map(function (item) {
      var score = 0;
      if (item.cityNorm === q) score = 100;
      else if (item.aliasNorms.indexOf(q) !== -1) score = 90;
      else if (item.cityNorm.indexOf(q) === 0) score = 80;
      else if (item.aliasNorms.some(function (a) { return a.indexOf(q) === 0; })) score = 70;
      else if (item.haystack.indexOf(q) !== -1) score = 40;
      else return null;
      return { item: item, score: score };
    }).filter(Boolean);
    scored.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.item.label.localeCompare(b.item.label);
    });
    return scored.map(function (s) { return s.item; });
  }

  function fitOverview(animate) {
    if (!state.map) return;
    // Always frame India + UAE together (even during emirates test)
    state.map.fitBounds(FOCUS_FIT_BOUNDS, {
      padding: { top: 18, bottom: 18, left: 18, right: 18 },
      duration: animate === false ? 0 : 750,
      essential: true
    });
  }

  function focusCountry(countryId) {
    if (!state.map || !state.data) return;
    var cityLoc = resolveCityForCountry(countryId);
    if (cityLoc) {
      focusLocation(cityLoc, {
        zoom: UAE_EMIRATE_TEST_MODE ? 10.5 : 12.5,
        openDrawer: !!UAE_EMIRATE_TEST_MODE
      });
      return;
    }

    var countryBounds = countryId === 'uae'
      ? UAE_TEST_FIT_BOUNDS
      : [[68.0, 7.8], [97.4, 35.5]];

    state.map.fitBounds(countryBounds, {
      padding: { top: 28, bottom: 28, left: 28, right: 28 },
      maxZoom: countryId === 'uae' ? 8.0 : 5.4,
      duration: 1100
    });
    closeDrawer({ keepActive: true });
  }

  function addMarkers(locations) {
    state.markersById = {};
    locations.forEach(function (loc) {
      var el = document.createElement('div');
      el.className = 'presence-marker-wrap';
      el.innerHTML = pinHtml(loc.markerType, false, loc.city, loc);
      el.title = loc.emirate
        ? ('Emirate: ' + loc.emirate)
        : (loc.city + ' · ' + loc.officeType);
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        // Test mode: always open details so Emirate: label is verified
        focusLocation(loc, UAE_EMIRATE_TEST_MODE
          ? { zoom: 10.5, openDrawer: true }
          : undefined);
      });

      var marker = new maplibregl.Marker({ element: el, anchor: 'bottom', offset: [0, 0] })
        .setLngLat([Number(loc.longitude), Number(loc.latitude)])
        .addTo(state.map);

      state.markersById[loc.id] = { marker: marker, el: el, loc: loc };
    });
    syncLabelVisibility();
  }

  function updateMapBadge(count) {
    var badge = $('.presence-map-badge');
    if (!badge) return;
    if (UAE_EMIRATE_TEST_MODE) {
      badge.innerHTML = '🧪 <span>7</span> UAE emirates test · India + UAE view';
      return;
    }
    badge.innerHTML = '📍 <span>' + count + '+</span> service locations · India &amp; UAE';
  }

  function buildSearchIndex(locations) {
    state.searchIndex = locations.map(function (loc) {
      var aliases = loc.aliases || [];
      var emirate = loc.emirate || '';
      return {
        id: loc.id,
        label: loc.emirate ? ('Emirate: ' + loc.emirate) : loc.city,
        sub: loc.country + (loc.region ? ' · ' + loc.region : ''),
        cityNorm: normalizeQuery(loc.city),
        aliasNorms: aliases.concat([emirate]).map(normalizeQuery).filter(Boolean),
        haystack: normalizeQuery(
          [loc.city, emirate].concat(aliases).concat([loc.region || '', loc.country || '']).join(' ')
        ),
        loc: loc
      };
    });
  }

  function renderSearchResults(query) {
    var panel = $('#presenceSearchPanel');
    if (!panel) return;
    var q = (query || '').trim().toLowerCase();
    if (!q) {
      panel.hidden = true;
      panel.innerHTML = '';
      return;
    }
    var results = getSearchMatches(q).slice(0, 10);
    if (!results.length) {
      panel.hidden = false;
      panel.innerHTML = '<div class="presence-search__empty">No locations found</div>';
      return;
    }
    panel.hidden = false;
    panel.innerHTML = results.map(function (item) {
      return '<button type="button" class="presence-search__item" data-id="' + escapeAttr(item.id) + '">' +
        '<strong>' + escapeHtml(item.label) + '</strong><span>' + escapeHtml(item.sub) + '</span></button>';
    }).join('');
  }

  function loadMaskData() {
    if (window.TIMEERP_MASK_GEOJSON) {
      return Promise.resolve({
        mask: window.TIMEERP_MASK_GEOJSON,
        focus: window.TIMEERP_FOCUS_GEOJSON || null
      });
    }
    return Promise.all([
      fetch('data/india-uae-mask.geojson').then(function (r) { return r.json(); }),
      fetch('data/india-uae-countries.geojson').then(function (r) { return r.json(); }).catch(function () { return null; })
    ]).then(function (pair) {
      return { mask: pair[0], focus: pair[1] };
    });
  }

  function applyIndiaUaeMask(map, maskData) {
    if (!map || !maskData || !maskData.mask) return;
    if (map.getSource('presence-mask')) return;

    map.addSource('presence-mask', {
      type: 'geojson',
      data: maskData.mask
    });

    // Fully opaque veil — hides all countries, borders, and labels outside India & UAE
    map.addLayer({
      id: 'presence-mask-fill',
      type: 'fill',
      source: 'presence-mask',
      paint: {
        'fill-color': '#d5e2eb',
        'fill-opacity': 1
      }
    });

    if (maskData.focus) {
      map.addSource('presence-focus', {
        type: 'geojson',
        data: maskData.focus
      });

      // Soft highlight fill so India + UAE (7 emirates) read clearly
      map.addLayer({
        id: 'presence-focus-fill',
        type: 'fill',
        source: 'presence-focus',
        paint: {
          'fill-color': '#25B7A7',
          'fill-opacity': 0.06
        }
      });

      map.addLayer({
        id: 'presence-focus-outline',
        type: 'line',
        source: 'presence-focus',
        paint: {
          'line-color': '#25B7A7',
          'line-width': 2,
          'line-opacity': 0.9
        }
      });
    }

    // Dim any remaining basemap labels that sit above the mask (style-dependent)
    try {
      var style = map.getStyle();
      (style.layers || []).forEach(function (layer) {
        if (layer.type !== 'symbol') return;
        var id = layer.id || '';
        // Keep city/road labels; hide country / continent labels when possible
        if (/country|continent|state|place_country|admin/i.test(id)) {
          map.setLayoutProperty(id, 'visibility', 'none');
        }
      });
    } catch (e) { /* ignore style differences */ }
  }

  function initMap(data) {
    state.data = data;
    var mapEl = $('#presenceMap');
    if (!mapEl || typeof maplibregl === 'undefined') {
      if (mapEl) {
        mapEl.innerHTML = '<div class="presence-map__error">Unable to load vector map. Please check your connection and refresh.</div>';
      }
      return;
    }

    updateMapBadge(data.locations.length);
    mapEl.innerHTML = '';

    state.map = new maplibregl.Map({
      container: mapEl,
      style: MAP_STYLE,
      center: [72.8, 21.5],
      zoom: 4.2,
      minZoom: 3.6,
      maxZoom: 18,
      maxBounds: FOCUS_MAX_BOUNDS,
      attributionControl: true,
      antialias: true,
      fadeDuration: 0,
      hash: false,
      renderWorldCopies: false
    });

    if (UAE_EMIRATE_TEST_MODE) {
      $all('[data-country-zoom]').forEach(function (b) {
        b.classList.toggle('is-active', b.getAttribute('data-country-zoom') === 'india');
      });
    }

    state.map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-left');
    state.map.addControl(new maplibregl.ScaleControl({ maxWidth: 120 }), 'bottom-left');

    state.map.on('load', function () {
      loadMaskData()
        .then(function (maskData) {
          applyIndiaUaeMask(state.map, maskData);
        })
        .catch(function () {
          /* Mask optional — map still renders without country clip */
        })
        .finally(function () {
          addMarkers(data.locations);
          if (!state.searchIndex.length) buildSearchIndex(data.locations);

          if (state.pendingFocus && state.pendingFocus.loc) {
            var pending = state.pendingFocus;
            state.pendingFocus = null;
            focusLocation(pending.loc, pending.opts || { zoom: 12.5, openDrawer: false });
          } else {
            fitOverview(true);
          }

          setTimeout(function () {
            state.map.resize();
            if (!state.activeId) fitOverview(false);
            syncLabelVisibility();
          }, 180);
        });
    });

    state.map.on('zoomend', syncLabelVisibility);
    state.map.on('moveend', syncLabelVisibility);
  }

  function bindUI() {
    var searchInput = $('#presenceSearch');
    var searchPanel = $('#presenceSearchPanel');
    var searchTimer = null;

    function trySelectFromInput(force) {
      var matches = getSearchMatches(searchInput.value);
      if (!matches.length) return false;
      var q = normalizeQuery(searchInput.value);
      var top = matches[0];
      var exact = top.cityNorm === q || top.aliasNorms.indexOf(q) !== -1;
      var strongPrefix = (top.cityNorm.indexOf(q) === 0 || top.aliasNorms.some(function (a) {
        return a.indexOf(q) === 0;
      })) && q.length >= 4;
      if (force || exact || strongPrefix) {
        selectSearchLocation(top.loc);
        return true;
      }
      return false;
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        renderSearchResults(searchInput.value);
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () { trySelectFromInput(false); }, 280);
      });
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          searchInput.value = '';
          state.lastSearchLoc = null;
          renderSearchResults('');
          searchInput.blur();
          return;
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          clearTimeout(searchTimer);
          if (trySelectFromInput(true)) searchInput.blur();
        }
      });
    }

    if (searchPanel) {
      searchPanel.addEventListener('click', function (e) {
        var item = e.target.closest('[data-id]');
        if (!item || !state.data) return;
        var loc = state.data.locations.find(function (l) { return l.id === item.getAttribute('data-id'); });
        if (loc) selectSearchLocation(loc);
      });
    }

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.presence-search') && searchPanel) searchPanel.hidden = true;
    });

    $all('[data-country-zoom]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        $all('[data-country-zoom]').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        focusCountry(btn.getAttribute('data-country-zoom'));
      });
    });

    var closeBtn = $('#drawerClose');
    var backdrop = $('#presenceDrawerBackdrop');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    var exploreBtn = $('#exploreLocationsBtn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var mapSection = $('#map-section');
        if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (state.map && state.data) focusCountry('india');
      });
    }
  }

  function loadData() {
    if (UAE_EMIRATE_TEST_MODE) {
      return Promise.resolve({
        meta: {
          testMode: 'uae-emirates',
          defaultCenter: [55.3, 24.9],
          defaultZoom: 7.5
        },
        locations: UAE_EMIRATE_TEST_LOCATIONS.slice()
      });
    }
    if (window.TIMEERP_PRESENCE_DATA) return Promise.resolve(window.TIMEERP_PRESENCE_DATA);
    return fetch('data/locations.json').then(function (r) {
      if (!r.ok) throw new Error('Failed to load locations');
      return r.json();
    });
  }

  function initNav() {
    var nav = $('#nav');
    if (nav) {
      window.addEventListener('scroll', function () {
        nav.classList.toggle('is-scrolled', window.scrollY > 24);
      }, { passive: true });
    }
    var toggle = $('#navToggle');
    var drawer = $('#navDrawer');
    if (toggle && drawer) {
      toggle.addEventListener('click', function () {
        if (!drawer.innerHTML) {
          drawer.innerHTML =
            '<a class="nav__link" href="home1.html#products">Products</a>' +
            '<a class="nav__link" href="home1.html#industries">Industries</a>' +
            '<a class="nav__link" href="Our_Presence.html">Our Presence</a>' +
            '<a class="nav__link" href="price.html">Pricing</a>' +
            '<a class="nav__link" href="contact_sales.html">Contact</a>' +
            '<a class="btn btn--primary" href="contact_sales.html">Book Demo</a>';
        }
        drawer.classList.toggle('is-open');
      });
    }
    $all('.footer__col-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var col = btn.closest('.footer__col');
        var open = col.classList.contains('is-open');
        $all('.footer__col').forEach(function (c) {
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

  function boot() {
    animateCounters();
    bindUI();
    initNav();

    var booted = false;
    function startMap() {
      if (booted) return;
      booted = true;
      var ready = state.data ? Promise.resolve(state.data) : loadData();
      ready
        .then(function (data) {
          state.data = data;
          buildSearchIndex(data.locations);
          initMap(data);
        })
        .catch(function () {
          var mapEl = $('#presenceMap');
          if (mapEl) {
            mapEl.innerHTML = '<div class="presence-map__error">Unable to load map data. Please refresh.</div>';
          }
        });
    }

    state.startMap = startMap;

    loadData()
      .then(function (data) {
        state.data = data;
        buildSearchIndex(data.locations);
        updateMapBadge(data.locations.length);
      })
      .catch(function () { /* Badge uses default count if data fails */ });

    startMap();

    window.addEventListener('resize', function () {
      if (!state.map) return;
      state.map.resize();
      // Keep overview snug after layout changes (avoid empty bands)
      if (!state.activeId && state.map.getZoom() < 6.2) {
        fitOverview(false);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
