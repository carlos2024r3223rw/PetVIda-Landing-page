/* ============================================
   NEBULA SETUPS — LANDING PAGE SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ──────────────── */
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ── Mobile nav toggle ─────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  /* ── Smooth scroll for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Reveal on scroll (Intersection Observer) ── */
  const revealElements = () => {
    // Tag elements for reveal
    const selectors = [
      '.feature-card',
      '.product-card',
      '.spec-item',
      '.testimonial-card',
      '.section__tag',
      '.section__title',
      '.section__subtitle',
      '.cta-section__content',
    ];

    document.querySelectorAll(selectors.join(',')).forEach((el, i) => {
      el.classList.add('reveal');
      // Add staggered delay based on siblings
      const parent = el.parentElement;
      const siblings = parent ? Array.from(parent.children).filter(c => c.classList.contains('reveal')) : [];
      const index = siblings.indexOf(el);
      if (index >= 0 && index < 4) {
        el.classList.add(`reveal--delay-${index + 1}`);
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };

  revealElements();

  /* ── Counter animation ─────────────────── */
  const animateCounters = () => {
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 1800;
          const start = performance.now();

          const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            el.textContent = Math.round(easedProgress * target).toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => counterObserver.observe(c));
  };

  animateCounters();

  /* ── Floating particles in hero ─────────── */
  const createParticles = () => {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;

      Object.assign(particle.style, {
        position: 'absolute',
        width:  `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: Math.random() > 0.5
          ? 'rgba(0, 229, 255, .35)'
          : 'rgba(57, 255, 127, .3)',
        left: `${Math.random() * 100}%`,
        top:  `${Math.random() * 100}%`,
        animation: `floatParticle ${6 + Math.random() * 10}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 5}s`,
        pointerEvents: 'none',
      });

      container.appendChild(particle);
    }

    // Inject keyframes once
    if (!document.getElementById('particle-keyframes')) {
      const style = document.createElement('style');
      style.id = 'particle-keyframes';
      style.textContent = `
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1);   opacity: .4; }
          25%      { transform: translate(15px, -20px) scale(1.2); opacity: .7; }
          50%      { transform: translate(-10px, -40px) scale(.8); opacity: .5; }
          75%      { transform: translate(20px, -15px) scale(1.1); opacity: .6; }
        }
      `;
      document.head.appendChild(style);
    }
  };

  createParticles();

  /* ── Parallax-lite on hero image ─────────── */
  const heroImageWrapper = document.getElementById('hero-image-wrapper');

  if (heroImageWrapper && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      heroImageWrapper.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

  /* ── Hide scroll indicator on scroll ─────── */
  const scrollIndicator = document.getElementById('scroll-indicator');

  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 120) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '';
        scrollIndicator.style.pointerEvents = '';
      }
    }, { passive: true });
  }

  /* ── Active nav link on scroll ──────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.navbar__link');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--accent-cyan)';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

});
