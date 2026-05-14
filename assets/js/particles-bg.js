/**
 * Lightweight particle network background for hero/about section
 * Usage: <canvas id="particles-canvas"></canvas>
 */
(function() {
  'use strict';

  var canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var animationId = null;
  var isActive = true;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var config = {
    particleCount: 40,
    connectionDistance: 120,
    maxConnections: 3,
    speed: 0.3,
    color: getComputedStyle(document.documentElement).getPropertyValue('--global-link-color').trim() || '#52adc8',
    opacity: 0.15
  };

  function resize() {
    var rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : canvas.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);
  }

  function createParticles() {
    particles = [];
    var rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : canvas.getBoundingClientRect();
    var w = rect.width;
    var h = rect.height;
    for (var i = 0; i < config.particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * config.speed * 2,
        vy: (Math.random() - 0.5) * config.speed * 2,
        radius: Math.random() * 2 + 1
      });
    }
  }

  function draw() {
    if (!isActive) return;
    var rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : canvas.getBoundingClientRect();
    var w = rect.width;
    var h = rect.height;

    ctx.clearRect(0, 0, w, h);

    // Update and draw particles
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = config.color;
      ctx.globalAlpha = config.opacity * 2;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Draw connections
    ctx.strokeStyle = config.color;
    ctx.lineWidth = 0.5;
    for (var i = 0; i < particles.length; i++) {
      var connections = 0;
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < config.connectionDistance && connections < config.maxConnections) {
          ctx.globalAlpha = config.opacity * (1 - dist / config.connectionDistance);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          connections++;
        }
      }
    }
    ctx.globalAlpha = 1;

    animationId = requestAnimationFrame(draw);
  }

  // Visibility API to pause when tab hidden
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      isActive = false;
      if (animationId) cancelAnimationFrame(animationId);
    } else {
      isActive = true;
      draw();
    }
  });

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', function() {
    resize();
    createParticles();
  });
})();
