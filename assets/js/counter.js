/**
 * Animated number counter
 * Elements with data-counter-target will count up when visible
 * Usage: <span class="counter" data-counter-target="42">0</span>
 */
(function() {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(el, target) {
    // Dynamic duration: each digit takes ~250ms, but clamp between 600ms and 2000ms
    var duration = Math.min(2000, Math.max(600, target * 250));
    var startTime = null;
    var lastValue = -1;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out quad: fast start, smooth landing
      var ease = 1 - (1 - progress) * (1 - progress);
      var current = Math.round(ease * target);

      // Only update DOM when value changes to avoid unnecessary reflows
      if (current !== lastValue) {
        el.textContent = current;
        lastValue = current;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    window.requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-counter-target]');
    if (!counters.length) return;

    if (prefersReducedMotion) {
      counters.forEach(function(el) {
        el.textContent = el.getAttribute('data-counter-target');
      });
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-counter-target'), 10);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
})();
