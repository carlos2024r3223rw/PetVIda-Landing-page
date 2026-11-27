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


const EN_TEXT = {
  "🐾 Primera consulta con": "🐾 First consultation with",
  "20% de descuento": "20% off",
  "· Atención de emergencia": "· Emergency care",
  "Servicios": "Services",
  "Nosotros": "About us",
  "Testimonios": "Testimonials",
  "Contacto": "Contact",
  "Agendar cita": "Book an appointment",
  "🏥 Clínica veterinaria certificada": "🏥 Certified veterinary clinic",
  "Tu mascota merece": "Your pet deserves",
  "el mejor cuidado.": "the best care.",
  "Más de 10 años protegiendo la salud y felicidad de tus compañeros peludos. Médicos especializados, tecnología de punta y mucho amor.": "Over 10 years caring for the health and happiness of your furry companions. Specialized veterinarians, modern equipment, and plenty of love.",
  "Agendar cita ahora": "Book an appointment",
  "WhatsApp directo": "Chat on WhatsApp",
  "Emergencias": "Emergencies",
  "Valoración": "Rating",
  "Pacientes felices": "Happy patients",
  "Consulta completada": "Checkup completed",
  "Vacunación al día": "Vaccinations up to date",
  "Próxima: en 6 meses": "Next: in 6 months",
  "Años de experiencia": "Years of experience",
  "Mascotas atendidas": "Pets cared for",
  "Veterinarios especializados": "Specialist veterinarians",
  "Servicio de emergencias": "Emergency service",
  "Nuestros servicios": "Our services",
  "Todo lo que tu mascota necesita, en un solo lugar": "Everything your pet needs, all in one place",
  "años cuidando vidas": "years of care",
  "¿Por qué elegirnos?": "Why choose us?",
  "Tratamos a tu mascota como familia": "We treat your pet like family",
  "En PetVida entendemos que tu mascota es parte de tu familia. Por eso, cada consulta, cada tratamiento y cada cirugía se realiza con el mismo amor y cuidado que le darías tú.": "At PetVida, we know your pet is part of your family. We bring the same care and attention to every checkup, treatment, and surgery that you would give them.",
  "Equipo médico certificado": "Certified medical team",
  "Veterinarios especializados con formación continua.": "Specialist veterinarians who continue to train.",
  "Tecnología de vanguardia": "Modern technology",
  "Equipos de diagnóstico de última generación.": "Up-to-date diagnostic equipment.",
  "Ambiente libre de estrés": "Low-stress environment",
  "Instalaciones diseñadas para la comodidad de tu mascota.": "Facilities designed for your pet's comfort.",
  "Precios transparentes": "Transparent pricing",
  "Sin cobros ocultos. Te explicamos todo antes de proceder.": "No hidden fees. We explain everything before moving forward.",
  "Conocer más →": "Learn more →",
  "¿Cómo funciona?": "How it works",
  "Agendar tu cita es facilísimo": "Booking an appointment is easy",
  "Escríbenos por WhatsApp": "Message us on WhatsApp",
  "Cuéntanos qué necesita tu mascota. Respondemos en minutos.": "Tell us what your pet needs. We reply in minutes.",
  "Agenda día y hora": "Choose a date and time",
  "Elige el horario que más te convenga. Sin esperas innecesarias.": "Pick a time that works for you. No unnecessary waiting.",
  "Visítanos con tu mascota": "Visit us with your pet",
  "Nuestro equipo estará listo para darle la mejor atención.": "Our team will be ready to care for your pet.",
  "Lo que dicen los papás de mascotas": "What pet parents say",
  "Primera consulta con 20% OFF": "20% off your first consultation",
  "¿Listo para cuidar a tu mejor amigo?": "Ready to care for your best friend?",
  "Agenda una cita hoy y obtén un": "Book an appointment today and get",
  "en tu primera consulta. Respondemos en menos de 5 minutos.": "off your first consultation. We respond in under 5 minutes.",
  "Agendar por WhatsApp": "Book via WhatsApp",
  "✅ Respuesta en menos de 5 min": "✅ Reply in under 5 min",
  "🕐 Atención 24/7": "🕐 24/7 care",
  "💳 Todos los métodos de pago": "💳 All payment methods",
  "Encuéntranos": "Find us",
  "Estamos cerca de ti": "We're close to you",
  "Dirección": "Address",
  "Colonia Escalón, Calle El Mirador #123, San Salvador": "Colonia Escalón, Calle El Mirador #123, San Salvador",
  "Horarios": "Hours",
  "Lunes a Sábado: 7:00 AM – 8:00 PM": "Monday to Saturday: 7:00 AM – 8:00 PM",
  "Teléfono": "Phone",
  "Cuidando a quienes más amas, con amor profesional.": "Professional care for the ones you love most.",
  "Consultas": "Checkups",
  "Vacunación": "Vaccinations",
  "Cirugía": "Surgery",
  "Estética": "Grooming",
  "Clínica": "Clinic",
  "© 2026 PetVida. Todos los derechos reservados.": "© 2026 PetVida. All rights reserved.",
  "🐾 ¿Tu mascota necesita atención?": "🐾 Does your pet need care?",
  "Respuesta inmediata": "Quick response",
  "Consulta General": "General Checkup",
  "Revisión completa del estado de salud de tu mascota con diagnóstico profesional.": "A complete health checkup for your pet with a professional diagnosis.",
  "Esquema completo de vacunas para cachorros, adultos, perros y gatos.": "Vaccination plans for puppies, adults, dogs, and cats.",
  "Laboratorio": "Laboratory",
  "Análisis clínicos con resultados rápidos: sangre, orina, heces y más.": "Clinical testing with quick results: blood, urine, stool, and more.",
  "Cirugías programadas y de emergencia con equipo de última generación.": "Scheduled and emergency surgeries with modern equipment.",
  "Estética Canina": "Dog Grooming",
  "Baño, corte, limpieza de oídos y uñas. Tu mascota guapísima.": "Bathing, haircuts, ear cleaning, and nail care.",
  "Odontología": "Dental Care",
  "Limpieza dental profesional y tratamientos orales especializados.": "Professional dental cleaning and specialized oral care.",
  "María González": "María González",
  "🐕 Max — Golden Retriever": "🐕 Max — Golden Retriever",
  "Increíble atención. Max salió de su cirugía perfecto y lo trataron con mucho amor.": "Wonderful care. Max came through his surgery well, and the team treated him with so much love.",
  "Carlos Rodríguez": "Carlos Rodríguez",
  "🐈 Luna — Gata Persa": "🐈 Luna — Persian Cat",
  "Por fin encontré veterinarios que entienden a los gatos. Luna va feliz a sus consultas.": "I finally found vets who understand cats. Luna is happy to visit for her checkups.",
  "Ana Martínez": "Ana Martínez",
  "🐕 Rocky — Bulldog": "🐕 Rocky — Bulldog",
  "Precios justos y transparentes. Rocky tiene su esquema de vacunas completo gracias a PetVida.": "Fair, transparent prices. Rocky is fully vaccinated thanks to PetVida."
};

const EN_ATTRIBUTES = {
  "Abrir menú": "Open menu",
  "Contactar por WhatsApp": "Contact via WhatsApp",
  "Cachorro y gatito en clínica veterinaria PetVida": "Puppy and kitten at the PetVida veterinary clinic",
  "Servicios veterinarios de PetVida": "PetVida veterinary services",
  "Hola, quiero agendar una cita para mi mascota.": "Hello, I would like to book an appointment for my pet.",
  "Hola, quiero agendar una cita para mi mascota. ¡Vi la promo del 20% OFF!": "Hello, I would like to book an appointment for my pet. I saw the 20% off offer!",
  "Hola, quiero más información sobre PetVida.": "Hello, I would like more information about PetVida."
};

function initLanguageSwitch() {
  const buttons = document.querySelectorAll(".language-btn");
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const key = node.nodeValue.trim().replace(/\s+/g, " ");
    const plain = key.replace(/^"|"$/g, "");
    if (plain && EN_TEXT[plain]) nodes.push({ node, original: node.nodeValue, key: plain, quoted: plain !== key });
  }

  const attributes = [];
  document.querySelectorAll("[alt], [aria-label], [data-wa-msg]").forEach((element) => {
    ["alt", "aria-label", "data-wa-msg"].forEach((name) => {
      const original = element.getAttribute(name);
      if (original && EN_ATTRIBUTES[original]) {
        attributes.push({ element, name, original });
      }
    });
  });

  function setLanguage(language) {
    const english = language === "en";
    document.documentElement.lang = language;
    document.title = english
      ? "PetVida — Veterinary Landing Page Concept"
      : "PetVida — Clínica Veterinaria de Confianza";
    document.querySelector('meta[name="description"]').content = english
      ? "PetVida is a bilingual veterinary landing page concept with services, testimonials, and appointment calls to action."
      : "PetVida — Clínica veterinaria con atención 24/7. Consultas, vacunación, cirugía, estética canina y felina. Agenda tu cita por WhatsApp.";

    nodes.forEach(({ node, original, key, quoted }) => {
      if (!english) {
        node.nodeValue = original;
      } else {
        const leading = original.match(/^\s*/)[0];
        const trailing = original.match(/\s*$/)[0];
        node.nodeValue = leading + (quoted ? '"' : "") + EN_TEXT[key] + (quoted ? '"' : "") + trailing;
      }
    });
    attributes.forEach(({ element, name, original }) => {
      element.setAttribute(name, english ? EN_ATTRIBUTES[original] : original);
    });
    buttons.forEach((button) => {
      const active = button.dataset.lang === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    initWhatsappLinks();
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });
  setLanguage("es");
}

document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderReviews();
  initWhatsappLinks();
  initHeaderScroll();
  initMobileNav();
  initReveal();
  initSmoothScroll();
  initParallax();
  initLanguageSwitch();
});
