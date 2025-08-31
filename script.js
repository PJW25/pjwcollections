/* =========================
   PRELOADER
========================= */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("fade-out");
});

/* =========================
   NAV TOGGLE (mobile only)
========================= */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  // Toggle on hamburger click
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("active");
  });

  // Close menu when a nav link is clicked
  const links = navLinks.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================
   CAROUSEL
========================= */
let slideIndex = 0;
const slides = document.querySelector(".slides");
const totalSlides = slides ? slides.children.length : 0;

function moveSlide(step) {
  if (!slides) return;
  slideIndex = (slideIndex + step + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}
if (totalSlides > 0) setInterval(() => moveSlide(1), 4000);

/* =========================
   LIGHTBOX
========================= */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
const allImages = Array.from(document.querySelectorAll(".gallery img, .slides img"));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  lightboxImg.src = allImages[currentIndex].src;
  shrinkVideo(); // ensure video returns to corner
}

// click images to open lightbox
allImages.forEach((img, index) => img.addEventListener("click", () => openLightbox(index)));

// close interactions
closeBtn.addEventListener("click", () => (lightbox.style.display = "none"));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});

// next/prev
nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % allImages.length;
  lightboxImg.src = allImages[currentIndex].src;
});
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  lightboxImg.src = allImages[currentIndex].src;
});

// keyboard controls
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") closeBtn.click();
  }
});

/* =========================
   FLOATING PORTRAIT VIDEO
========================= */
const videoWrapper = document.getElementById("video-wrapper");
const videoElement = document.getElementById("promoVideo");
let isExpanded = false;

// Expand on click (all devices)
videoWrapper.addEventListener("click", () => {
  if (!isExpanded) {
    videoWrapper.classList.add("expanded");
    isExpanded = true;
    // Play audio if available on expand
    if (videoElement) {
      videoElement.muted = false;
      videoElement.play().catch(() => {});
    }
  }
});

// Helper to shrink
function shrinkVideo() {
  videoWrapper.classList.remove("expanded");
  isExpanded = false;
  if (videoElement) videoElement.muted = true; // respect silent corner mode
}

// Shrink when clicking outside wrapper (and not inside lightbox)
document.addEventListener("click", (e) => {
  if (isExpanded && !videoWrapper.contains(e.target) && !e.target.closest(".lightbox")) {
    shrinkVideo();
  }
});
