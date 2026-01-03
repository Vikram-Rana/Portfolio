/* =========================
   MOBILE MENU + SMOOTH SCROLL
========================= */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("menuClose");

// OPEN menu
hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

// CLOSE menu (ONLY via close button)
menuClose.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

// SMOOTH SCROLL (NO MENU CLOSE)
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});



/* =========================
   WORK TABS Start
========================= */
/* =========================
   WORK TABS + PAGINATION
========================= */

const tabs = document.querySelectorAll(".work-tabs .tab");
const galleries = document.querySelectorAll(".work-gallery");
const pagination = document.getElementById("workPagination");
const portfolioSection = document.getElementById("portfolio");

const ITEMS_PER_PAGE = 9;
let currentPage = 1;
let activeGallery = document.querySelector(".work-gallery.active");

/* ---------- INIT ---------- */
if (activeGallery) {
  setupPagination(activeGallery);
}

/* ---------- TAB CLICK ---------- */
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    if (tab.classList.contains("active")) return;

    // Active tab UI
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.dataset.tab;

    // Hide all galleries
    galleries.forEach(g => {
      g.classList.remove("active");
      g.style.minHeight = ""; // reset height lock
    });

    activeGallery = document.querySelector(
      `.work-gallery[data-content="${target}"]`
    );

    currentPage = 1;

    requestAnimationFrame(() => {
      activeGallery.classList.add("active");
      setupPagination(activeGallery);
    });
  });
});

/* =========================
   PAGINATION LOGIC (STABLE)
========================= */

function setupPagination(gallery) {
  const items = [...gallery.querySelectorAll(".work-item")];
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  pagination.innerHTML = "";

  // If pagination not needed
  if (items.length <= ITEMS_PER_PAGE) {
    items.forEach(item => (item.style.display = "block"));
    return;
  }

  // Render first page
  renderPage(items, 1);

  // Lock gallery height after first render
  requestAnimationFrame(() => {
    gallery.style.minHeight = gallery.offsetHeight + "px";
  });

  // Create pagination buttons
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === 1) btn.classList.add("active");

    btn.addEventListener("click", () => {
      if (currentPage === i) return;

      currentPage = i;

      // Smooth scroll to section top
      portfolioSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Render page after scroll begins (prevents jerk)
      requestAnimationFrame(() => {
        renderPage(items, i);
      });

      pagination.querySelectorAll("button").forEach(b =>
        b.classList.remove("active")
      );
      btn.classList.add("active");
    });

    pagination.appendChild(btn);
  }
}

/* ---------- RENDER PAGE ---------- */
function renderPage(items, page) {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  items.forEach((item, index) => {
    item.style.display =
      index >= start && index < end ? "block" : "none";
  });
}

/* =========================
   LIGHTBOX (GLOBAL)
========================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

// Open lightbox (event delegation)
document.querySelector(".work-content").addEventListener("click", e => {
  const img = e.target.closest(".work-item img");
  if (!img) return;

  lightboxImg.src = img.src;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
});

// Close handlers
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

/* =========================
   End
========================= */

/* =========================
   SCROLL ANIMATION (FADE UP)
========================= */

const fadeElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // play once
      }
    });
  },
  {
    threshold: 0.15, // triggers when 15% visible
  }
);

fadeElements.forEach(el => observer.observe(el));





const testimonialSwiper = new Swiper(".testimonial-swiper", {
  slidesPerView: 3,
  spaceBetween: 40,
  speed: 800,
  loop: true,
  slidesPerGroup: 1,

  autoplay: {
    delay: 3500,
    disableOnInteraction: false
  },

  navigation: {
    nextEl: ".testimonial-next",
    prevEl: ".testimonial-prev"
  },

  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1200: {
      slidesPerView: 3
    }
  }
});

