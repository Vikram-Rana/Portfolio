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

// SMOOTH SCROLL (NO MENU AUTO CLOSE)
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", e => {
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
   WORK TABS + PAGINATION
========================= */

const tabs = document.querySelectorAll(".work-tabs .tab");
const galleries = document.querySelectorAll(".work-gallery");
const pagination = document.getElementById("workPagination");
const portfolioSection = document.getElementById("portfolio");

let currentPage = 1;
let activeGallery = document.querySelector(".work-gallery.active");

/* Responsive items per page */
function getItemsPerPage() {
  return window.innerWidth <= 768 ? 8 : 9;
}

let ITEMS_PER_PAGE = getItemsPerPage();

/* INIT */
if (activeGallery) {
  setupPagination(activeGallery);
}

/* TAB CLICK */
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    if (tab.classList.contains("active")) return;

    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.dataset.tab;

    galleries.forEach(g => {
      g.classList.remove("active");
      g.style.minHeight = "";
    });

    activeGallery = document.querySelector(
      `.work-gallery[data-content="${target}"]`
    );

    currentPage = 1;
    ITEMS_PER_PAGE = getItemsPerPage();

    requestAnimationFrame(() => {
      activeGallery.classList.add("active");
      setupPagination(activeGallery);
    });
  });
});

/* PAGINATION */
function setupPagination(gallery) {
  const items = [...gallery.querySelectorAll(".work-item")];
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  pagination.innerHTML = "";

  // No pagination needed
  if (items.length <= ITEMS_PER_PAGE) {
    items.forEach(item => (item.style.display = "flex"));
    gallery.style.minHeight = "";
    return;
  }

  // Render first page
  renderPage(items, 1);

  // Lock height after render
  requestAnimationFrame(() => {
    gallery.style.minHeight = gallery.offsetHeight + "px";
  });

  // Pagination buttons
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === 1) btn.classList.add("active");

    btn.addEventListener("click", () => {
      if (currentPage === i) return;

      currentPage = i;

      // Scroll only once (no jerk)
      portfolioSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

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

/* RENDER PAGE */
function renderPage(items, page) {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  items.forEach((item, index) => {
    item.style.display =
      index >= start && index < end ? "flex" : "none";
  });
}

/* HANDLE RESIZE */
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const newItems = getItemsPerPage();
    if (newItems !== ITEMS_PER_PAGE && activeGallery) {
      ITEMS_PER_PAGE = newItems;
      currentPage = 1;
      setupPagination(activeGallery);
    }
  }, 200);
});


/* =========================
   LIGHTBOX (GLOBAL)
========================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

// Open
document.querySelector(".work-content").addEventListener("click", e => {
  const img = e.target.closest(".work-item img");
  if (!img) return;

  lightboxImg.src = img.src;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
});

// Close
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}


/* =========================
   SCROLL ANIMATION (FADE UP)
========================= */

const fadeElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

fadeElements.forEach(el => observer.observe(el));


/* =========================
   TESTIMONIAL SLIDER
========================= */

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
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 3 }
  }
});

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'u') e.preventDefault();
});