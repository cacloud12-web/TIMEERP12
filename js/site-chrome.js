/**
 * Shared site chrome — navbar scroll state + mobile navigation drawer.
 * Optional: data-scroll-threshold on #navbar (default 60).
 */
(function () {
  'use strict';

  var navbar = document.getElementById('navbar');
  if (navbar) {
    var threshold = parseInt(navbar.getAttribute('data-scroll-threshold') || '60', 10);
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > threshold);
    }, { passive: true });
  }

  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');
  var mobileNavOverlay = document.getElementById('mobileNavOverlay');
  if (!hamburger || !mobileNav) return;

  function setMobileNavOpen(isOpen) {
    hamburger.classList.toggle('active', isOpen);
    mobileNav.classList.toggle('open', isOpen);
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.toggle('is-visible', isOpen);
      mobileNavOverlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', function () {
    setMobileNavOpen(!hamburger.classList.contains('active'));
  });

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', function () { setMobileNavOpen(false); });
  }

  document.querySelectorAll('.mobile-nav__link, .mobile-nav__sublink').forEach(function (link) {
    link.addEventListener('click', function () {
      if (link.tagName === 'SUMMARY') return;
      setMobileNavOpen(false);
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024 && hamburger.classList.contains('active')) {
      setMobileNavOpen(false);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hamburger.classList.contains('active')) {
      setMobileNavOpen(false);
    }
  });
})();
