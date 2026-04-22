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

/* ── Electrocution cursor on "Fadi" hover ───────────────────── */
(function initZapCursor() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const trigger         = document.getElementById('hero-name-fadi');
  const zapCursor       = document.getElementById('zap-cursor');
  const zapFlash        = document.getElementById('zap-flash');
  const zapLights       = document.getElementById('zap-lights');
  const normalCursor    = document.getElementById('cursor');
  const normalCursorDot = document.getElementById('cursorDot');
  if (!trigger || !zapCursor || !zapFlash) return;

  const stickBody     = zapCursor.querySelector('.stick-body');
  const stickSkeleton = zapCursor.querySelector('.stick-skeleton');

  let mx = 0, my = 0;
  let zapActive     = false;
  let posFrameId    = null;
  let boltInterval  = null;
  let skelTimer     = null;
  let lightTimer    = null;
  let showSkeleton  = false;

  const BOLT_CHARS = ['⚡', '⚡', '✦', '⌁', '⚡', '✦', '⚡'];

  function trackMouse(e) { mx = e.clientX; my = e.clientY; }

  function positionLoop() {
    zapCursor.style.left = mx + 'px';
    zapCursor.style.top  = my + 'px';
    if (zapActive) posFrameId = requestAnimationFrame(positionLoop);
  }

  function spawnBolt() {
    const bolt = document.createElement('span');
    bolt.className = 'zap-bolt';
    bolt.textContent = BOLT_CHARS[Math.floor(Math.random() * BOLT_CHARS.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist  = 25 + Math.random() * 65;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;
    const dur   = 0.38 + Math.random() * 0.44;
    bolt.style.cssText = `left:${mx}px;top:${my}px;--bolt-tx:${tx.toFixed(1)}px;--bolt-ty:${ty.toFixed(1)}px;--bolt-dur:${dur.toFixed(2)}s;`;
    document.body.appendChild(bolt);
    setTimeout(() => bolt.remove(), dur * 1000 + 80);
  }

  // Switch between body and skeleton using display — works cleanly at all DPI levels
  function setSkeleton(on) {
    showSkeleton = on;
    stickBody.style.display     = on ? 'none'  : 'block';
    stickSkeleton.style.display = on ? 'block' : 'none';
  }

  // Skeleton toggle loop — irregular timing like a real arc flash
  function skelLoop() {
    if (!zapActive) return;
    showSkeleton = !showSkeleton;
    setSkeleton(showSkeleton);
    // skeleton flash is short, body frame is longer — feels like cartoon x-ray
    const hold = showSkeleton
      ? 55  + Math.floor(Math.random() * 90)   // skeleton: 55–145ms
      : 130 + Math.floor(Math.random() * 220);  // body: 130–350ms
    skelTimer = setTimeout(skelLoop, hold);
  }

  // Page lighting loop — drives both the white brightness layer and the cyan tint
  // They fire on skeleton frames to tie the page lighting to the x-ray flash
  function lightLoop() {
    if (!zapActive) {
      if (zapLights) zapLights.style.opacity = '0';
      zapFlash.style.opacity = '0';
      return;
    }
    // Sync light burst with skeleton frame: bright white when skeleton is showing
    const lightBrightness = showSkeleton ? (0.06 + Math.random() * 0.10).toFixed(3) : '0';
    const tintOpacity     = showSkeleton ? (0.10 + Math.random() * 0.14).toFixed(3) : '0';
    if (zapLights) zapLights.style.opacity = lightBrightness;
    zapFlash.style.opacity = tintOpacity;
    // Independent flicker — sometimes fire even outside skeleton frames for realism
    if (!showSkeleton && Math.random() < 0.18) {
      if (zapLights) zapLights.style.opacity = (0.02 + Math.random() * 0.04).toFixed(3);
      zapFlash.style.opacity = (0.03 + Math.random() * 0.05).toFixed(3);
    }
    lightTimer = setTimeout(lightLoop, 40 + Math.floor(Math.random() * 40));
  }

  function startZap() {
    if (zapActive) return;
    zapActive = true;

    normalCursor.style.opacity    = '0';
    normalCursorDot.style.opacity = '0';
    zapCursor.style.display = 'block';
    zapCursor.classList.add('zapping');

    // Start showing body first
    setSkeleton(false);

    posFrameId = requestAnimationFrame(positionLoop);

    boltInterval = setInterval(() => {
      spawnBolt();
      if (Math.random() > 0.35) spawnBolt();
    }, 105);

    // Stagger skeleton and light loops slightly so they feel independent
    skelTimer  = setTimeout(skelLoop,  80);
    lightTimer = setTimeout(lightLoop, 40);
  }

  function stopZap() {
    if (!zapActive) return;
    zapActive = false;

    clearInterval(boltInterval);
    clearTimeout(skelTimer);
    clearTimeout(lightTimer);
    cancelAnimationFrame(posFrameId);

    zapCursor.classList.remove('zapping');
    zapCursor.style.display = 'none';

    if (zapLights) zapLights.style.opacity = '0';
    zapFlash.style.opacity = '0';

    normalCursor.style.opacity    = '1';
    normalCursorDot.style.opacity = '1';
  }

  document.addEventListener('mousemove', trackMouse, { passive: true });
  trigger.addEventListener('mouseenter', startZap);
  trigger.addEventListener('mouseleave', stopZap);
})();

