/* ══════════════════════════════════════════════════════
   FISCHLE KARRIERE — main.js
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── STARS CANVAS ── */
  const canvas = document.getElementById('starsCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createStars() {
      stars = [];
      for (let i = 0; i < 180; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7,
          r: Math.random() * 1.5 + 0.3,
          a: Math.random(),
          speed: Math.random() * 0.008 + 0.002,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    function drawStars(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,220,255,${alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(ts => drawStars(ts));
    }

    resize();
    createStars();
    window.addEventListener('resize', () => { resize(); createStars(); });
    drawStars(0);
  }

  /* ── BUS ANIMATION SEQUENCE ── */
  const busContainer = document.getElementById('busContainer');
  if (busContainer) {
    // After bus enters (animation ~2.7s), park wheels and open doors
    setTimeout(() => {
      busContainer.classList.add('parked');
    }, 2700);

    setTimeout(() => {
      busContainer.classList.add('doors-open');
    }, 3000);
  }

  /* ── STICKY NAV ── */
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ── MOBILE MENU ── */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('navMobile');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = e.target.style.getPropertyValue('--d') || '0s';
          e.target.style.transitionDelay = delay;
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  /* ── COUNT UP NUMBERS ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString('de-DE') + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  const counterEls = document.querySelectorAll('.count-up');
  if (counterEls.length && 'IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObs.observe(el));
  }

  /* ── ACTIVE NAV LINK ── */
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (path.endsWith(a.getAttribute('href') || '')) a.classList.add('active');
  });

  /* ── JOB CARD TILT EFFECT ── */
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── APPLICATION FORM ── */
  const applyForms = document.querySelectorAll('.apply-form');
  applyForms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const success = form.closest('.apply-form-section').querySelector('.form-success');
      form.style.display = 'none';
      if (success) success.classList.add('visible');
    });
  });

});
