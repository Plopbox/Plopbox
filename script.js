/* ============================================================
   FADI HELAL – PORTFOLIO  |  script.js

   Copyright (c) 2025 Fadi Helal. All Rights Reserved.
   PROPRIETARY AND CONFIDENTIAL — Unauthorized copying, use,
   modification, or distribution of this file or any portion
   thereof, via any medium, is strictly prohibited.
   See LICENSE file for full terms.
   ============================================================ */

'use strict';

/* ── Force HTTPS ────────────────────────────────────────────── */
if (location.protocol === 'http:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
  location.replace('https:' + location.href.substring(5));
}

/* ── AOS init ───────────────────────────────────────────────── */
AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic', offset: 60 });

/* ── Custom cursor ──────────────────────────────────────────── */
(function initCursor() {
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (!cursor || !cursorDot) return;

  let mx = -100, my = -100;
  let cx = -100, cy = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    cx += (mx - cx) * 0.14;
    cy += (my - cy) * 0.14;
    cursor.style.left    = cx + 'px';
    cursor.style.top     = cy + 'px';
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverEls = document.querySelectorAll('a, button, .btn, .tl-card, .cert-card, .edu-card, .skill-cat, .contact-item');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
})();

/* ── Navbar scroll ──────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else                     navbar.classList.remove('scrolled');

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });
})();

/* ── Hamburger / mobile nav ─────────────────────────────────── */
(function initHamburger() {
  const btn      = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!btn || !navLinks) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      btn.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
})();

/* ── Hero canvas (particle network) ────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  const PARTICLE_COUNT = 80;
  const MAX_DIST       = 160;
  const CYAN   = '0,212,255';
  const PURPLE = '168,85,247';

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : (Math.random() > 0.5 ? -10 : H + 10);
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 1.5 + 0.5;
      this.col = Math.random() > 0.5 ? CYAN : PURPLE;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.col},0.7)`;
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${CYAN},${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); createParticles(); });
  resize();
  createParticles();
  animate();
})();

/* ── Typed text ─────────────────────────────────────────────── */
(function initTyped() {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'End-to-End Validation Systems',
    'Hardware & Software Together',
    'Connectivity Test Frameworks',
    'Hardware-in-the-Loop Testing',
    'AI-Enabled Automation',
    'Reliable Systems from Firmware to Cloud',
    'Things That Earn Trust'
  ];

  let pi = 0, ci = 0, deleting = false, pauseTimer = null;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        pauseTimer = setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 55);
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 30);
    }
  }
  setTimeout(type, 1000);
})();

/* ── Counter animation (hero stats) ────────────────────────── */
(function initCounters() {
  const statEls = document.querySelectorAll('.stat-val[data-target]');
  if (!statEls.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(end / 30));
      const timer = setInterval(() => {
        current = Math.min(current + step, end);
        el.textContent = current;
        if (current >= end) clearInterval(timer);
      }, 40);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => observer.observe(el));
})();

/* ── Skill bar animation ─────────────────────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.bar-fill[data-w]');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const fill = entry.target;
      fill.style.width = fill.dataset.w + '%';
      observer.unobserve(fill);
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
})();

/* ── Scroll Progress Bar ─────────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width  = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  }, { passive: true });
})();

/* ── vanilla-tilt (service cards) ───────────────────────────── */
(function initTilt() {
  if (typeof VanillaTilt === 'undefined') return;
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max:        10,
    speed:      400,
    glare:      true,
    'max-glare': 0.08,
  });
})();

/* ── Contact form (mailto fallback) ─────────────────────────── */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // If Formspree is not configured yet, fall back to mailto
  form.addEventListener('submit', e => {
    const action = form.getAttribute('action') || '';
    if (action.includes('YOUR_FORM_ID')) {
      e.preventDefault();
      const name    = document.getElementById('fname').value;
      const email   = document.getElementById('femail').value;
      const subject = document.getElementById('fsubject').value || 'Portfolio Contact';
      const msg     = document.getElementById('fmsg').value;
      const mailto  = `mailto:Fadi.helal@pm.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${msg}`)}`;
      window.location.href = mailto;
    }
  });
})();

/* ── Spotlight / cursor-reveal circuit overlay ───────────────── */
(function initSpotlight() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const overlay = document.getElementById('spotlight-overlay');
  if (!overlay) return;
  const OFF = 'radial-gradient(circle 260px at -9999px -9999px, black, transparent)';
  document.addEventListener('mousemove', e => {
    const g = `radial-gradient(circle 260px at ${e.clientX}px ${e.clientY}px, black 0%, transparent 100%)`;
    overlay.style.webkitMaskImage = g;
    overlay.style.maskImage = g;
  }, { passive: true });
  document.addEventListener('mouseleave', () => {
    overlay.style.webkitMaskImage = OFF;
    overlay.style.maskImage = OFF;
  });
})();

/* ── Holographic shimmer + corner brackets on all cards ─────── */
(function initCardEffects() {
  const sel = [
    '.skill-cat', '.tl-card', '.edu-card', '.cert-card',
    '.service-card', '.store-card', '.soft-card', '.gaming-card',
    '.info-glass', '.explore-card', '.contact-item', '.contact-form'
  ].join(',');
  document.querySelectorAll(sel).forEach(c => {
    c.classList.add('holo-card', 'bracket-card');
  });
})();

/* ── Glitch text on hero name ────────────────────────────────── */
(function initGlitch() {
  const el = document.querySelector('.hero-name .line-top');
  if (!el) return;
  el.classList.add('glitch-text');
  el.dataset.text = el.textContent;
})();

/* ── Section heading scan-line on scroll entry ───────────────── */
(function initScanLines() {
  const headings = document.querySelectorAll('.section-heading');
  if (!headings.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.remove('scanned');
      void el.offsetWidth;
      el.classList.add('scanned');
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  headings.forEach(h => observer.observe(h));
})();

