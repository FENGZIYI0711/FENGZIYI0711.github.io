/**
 * Back to top button
 * Appears after scrolling down one viewport height
 */
(function() {
  'use strict';

  var btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
  document.body.appendChild(btn);

  let ticking = false;
  var threshold = window.innerHeight * 0.5;

  function toggleVisibility() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > threshold) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(toggleVisibility);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Initialize
  toggleVisibility();
})();
