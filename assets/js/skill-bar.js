/**
 * Animated skill bars
 * Elements with .skill-fill animate their width when visible
 */
(function() {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initSkillBars() {
    var bars = document.querySelectorAll('.skill-fill');
    if (!bars.length) return;

    if (prefersReducedMotion) {
      bars.forEach(function(bar) {
        var target = bar.getAttribute('data-width');
        if (target) bar.style.width = target;
      });
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          var target = bar.getAttribute('data-width');
          if (target) {
            // Small delay for visual effect
            setTimeout(function() {
              bar.style.width = target;
            }, 200);
          }
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(function(bar) {
      observer.observe(bar);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillBars);
  } else {
    initSkillBars();
  }
})();
