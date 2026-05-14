/**
 * Navbar scroll effect
 * Adds shadow and background blur to masthead when scrolled
 */
(function() {
  'use strict';

  const masthead = document.querySelector('.masthead');
  if (!masthead) return;

  let ticking = false;
  const scrollThreshold = 20;

  function updateMasthead() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > scrollThreshold) {
      masthead.classList.add('is-scrolled');
    } else {
      masthead.classList.remove('is-scrolled');
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateMasthead);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Initialize on load
  updateMasthead();
})();
