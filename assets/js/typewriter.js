/**
 * Typewriter effect for academic pages
 * Usage: <span data-typewriter="Your text here" data-typewriter-speed="80" data-typewriter-delay="500"></span>
 */
(function() {
  'use strict';

  function initTypewriter() {
    var elements = document.querySelectorAll('[data-typewriter]');
    if (!elements.length) return;

    elements.forEach(function(el) {
      var text = el.getAttribute('data-typewriter');
      var speed = parseInt(el.getAttribute('data-typewriter-speed'), 10) || 80;
      var delay = parseInt(el.getAttribute('data-typewriter-delay'), 10) || 0;
      
      el.textContent = '';
      el.classList.add('typewriter-active');

      var i = 0;
      function typeChar() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(typeChar, speed);
        } else {
          el.classList.remove('typewriter-active');
          el.classList.add('typewriter-done');
        }
      }

      setTimeout(typeChar, delay);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypewriter);
  } else {
    initTypewriter();
  }
})();
