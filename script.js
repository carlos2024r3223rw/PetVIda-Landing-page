/* =========================================================
   PETVIDA — script.js
   Todo el contenido editable vive en CONFIG (aquí abajo).
   Cambia los valores entre comillas y guarda el archivo.
   ========================================================= */

const CONFIG = {
  // ✏️ EDITA: tu número de WhatsApp Business — código de país + número,
  // solo dígitos (sin +, sin espacios, sin guiones). Todos los botones
  // "Agendar cita" / "WhatsApp" de la página usan este único número.
  whatsappNumber: "50370000000",

  // ✏️ EDITA: número de teléfono fijo de la clínica
  phoneNumber: "+50322000000",

  // ✏️ EDITA: servicios de la clínica (icono, nombre, descripción)
  services: [
    {
      icon: "🩺",
      name: "Consulta General",
      desc: "Revisión completa del estado de salud de tu mascota con diagnóstico profesional.",
    },
    {
      icon: "💉",
      name: "Vacunación",
      desc: "Esquema completo de vacunas para cachorros, adultos, perros y gatos.",
    },
    {
      icon: "🔬",
      name: "Laboratorio",
      desc: "Análisis clínicos con resultados rápidos: sangre, orina, heces y más.",
    },
    {
      icon: "✂️",
      name: "Cirugía",
      desc: "Cirugías programadas y de emergencia con equipo de última generación.",
    },
    {
      icon: "🐩",
      name: "Estética Canina",
      desc: "Baño, corte, limpieza de oídos y uñas. Tu mascota guapísima.",
    },
    {
      icon: "🦷",
      name: "Odontología",
      desc: "Limpieza dental profesional y tratamientos orales especializados.",
    },
  ],

  // ✏️ EDITA: testimonios de clientes (nombre, mascota, texto, estrellas de 1 a 5)
  reviews: [
    {
      name: "María González",
      pet: "🐕 Max — Golden Retriever",
      text: "Increíble atención. Max salió de su cirugía perfecto y lo trataron con mucho amor.",
      stars: 5,
    },
    {
      name: "Carlos Rodríguez",
      pet: "🐈 Luna — Gata Persa",
      text: "Por fin encontré veterinarios que entienden a los gatos. Luna va feliz a sus consultas.",
      stars: 5,
    },
    {
      name: "Ana Martínez",
      pet: "🐕 Rocky — Bulldog",
      text: "Precios justos y transparentes. Rocky tiene su esquema de vacunas completo gracias a PetVida.",
      stars: 5,
    },
  ],
};

// ---------------------------------------------------------
// A partir de aquí es lógica del sitio — no hace falta tocarlo.
// ---------------------------------------------------------

function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;
  grid.innerHTML = CONFIG.services
    .map(
      (s) => `
    <div class="service-card reveal">
      <div class="service-card__icon">
        <span class="service-card__icon-emoji">${s.icon}</span>
      </div>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <a href="#cita" class="service-card__cta">Agendar cita <span>→</span></a>
    </div>
  `
    )
    .join("");
}

function renderReviews() {
  const grid = document.getElementById("reviewsGrid");
  if (!grid) return;
  grid.innerHTML = CONFIG.reviews
    .map((r) => {
      const initials = r.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2);
      const stars = "★".repeat(r.stars) + "☆".repeat(5 - r.stars);
      return `
      <div class="review reveal">
        <div class="review__top">
          <div class="review__avatar">${initials}</div>
          <div>
            <p class="review__name">${r.name}</p>
            <p class="review__pet">${r.pet}</p>
            <div class="review__stars">${stars}</div>
          </div>
        </div>
        <p class="review__text">"${r.text}"</p>
      </div>
    `;
    })
    .join("");
}

function initWhatsappLinks() {
  document.querySelectorAll(".whatsapp-btn").forEach((btn) => {
    const msg =
      btn.getAttribute("data-wa-msg") ||
      "Hola, quiero más información sobre PetVida.";
    btn.href =
      "https://wa.me/" +
      CONFIG.whatsappNumber +
      "?text=" +
      encodeURIComponent(msg);
    btn.target = "_blank";
    btn.rel = "noopener";
  });
}

function initPhoneLinks() {
  const phoneBtn = document.getElementById("ctaPhoneBtn");
  if (phoneBtn) {
    phoneBtn.href = "tel:" + CONFIG.phoneNumber;
  }
}

function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  const stickyCta = document.getElementById("stickyCta");
  const heroEl = document.querySelector(".hero");
  if (!header || !heroEl) return;

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle("is-scrolled", window.scrollY > 40);
        const threshold = heroEl.offsetTop + heroEl.offsetHeight * 0.6;
        if (stickyCta)
          stickyCta.classList.toggle("is-visible", window.scrollY > threshold);
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initMobileNav() {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (!navToggle || !navLinks) return;
  navToggle.addEventListener("click", () =>
    navLinks.classList.toggle("is-open")
  );
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("is-open"))
  );
}

function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

// Smooth scroll for all anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });
}

// Parallax effect for hero shapes
function initParallax() {
  const shapes = document.querySelectorAll(".shape");
  if (!shapes.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 0.03;
      shape.style.transform = `translateY(${scroll * speed}px)`;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderReviews();
  initWhatsappLinks();
  initPhoneLinks();
  initHeaderScroll();
  initMobileNav();
  initReveal();
  initSmoothScroll();
  initParallax();
});
