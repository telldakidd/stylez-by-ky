// ===== Stylez By Ky — site interactions =====
(function () {
  'use strict';

  var header = document.querySelector('[data-header]');
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');

  // Sticky header shadow on scroll
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Close mobile menu when a link is tapped
  if (nav && header) {
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        header.classList.remove('nav-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Current year in footer
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();

  // Live Instagram feed (LightWidget). Activates only when a widget ID is set
  // on #igFeed[data-ig-widget]. Until then, the branded fallback grid shows.
  var feed = document.getElementById('igFeed');
  if (feed) {
    var wid = (feed.getAttribute('data-ig-widget') || '').trim();
    if (wid) {
      var fallback = feed.querySelector('[data-fallback]');
      if (fallback) fallback.remove();

      var iframe = document.createElement('iframe');
      iframe.src = 'https://lightwidget.com/widgets/' + wid + '.html';
      iframe.scrolling = 'no';
      iframe.allowTransparency = 'true';
      iframe.className = 'lightwidget-widget';
      iframe.style.cssText = 'width:100%;border:0;overflow:hidden;';
      feed.appendChild(iframe);

      var lw = document.createElement('script');
      lw.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
      lw.async = true;
      document.body.appendChild(lw);
    }
  }
})();
