const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const hero = document.querySelector("[data-hero-slides]");
if (hero) {
  const slidePaths = (hero.dataset.heroSlides || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  const layers = hero.querySelectorAll(".hero-slide");
  const showLayer = (layer, path) => {
    layer.style.backgroundImage = `url("${path}")`;
  };

  if (slidePaths.length > 0 && layers.length > 0) {
    let activeLayer = 0;
    let currentSlide = 0;

    showLayer(layers[activeLayer], slidePaths[currentSlide]);
    layers[activeLayer].classList.add("is-visible");

    if (slidePaths.length > 1 && layers.length > 1) {
      setInterval(() => {
        const incomingLayer = activeLayer === 0 ? 1 : 0;
        currentSlide = (currentSlide + 1) % slidePaths.length;

        showLayer(layers[incomingLayer], slidePaths[currentSlide]);
        layers[incomingLayer].classList.add("is-visible");
        layers[activeLayer].classList.remove("is-visible");

        activeLayer = incomingLayer;
      }, 5000);
    }
  }
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const imageModal = document.querySelector("[data-image-modal]");
const imageModalContent = imageModal
  ? imageModal.querySelector("[data-image-modal-content]")
  : null;
const imageModalClose = imageModal
  ? imageModal.querySelector("[data-image-modal-close]")
  : null;

const openImageModal = (src, altText) => {
  if (!imageModal || !imageModalContent || !src) return;
  imageModalContent.setAttribute("src", src);
  imageModalContent.setAttribute("alt", altText || "Expanded product image");
  imageModal.classList.add("open");
  imageModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeImageModal = () => {
  if (!imageModal || !imageModalContent) return;
  imageModal.classList.remove("open");
  imageModal.setAttribute("aria-hidden", "true");
  imageModalContent.setAttribute("src", "");
  document.body.classList.remove("modal-open");
};

if (imageModal) {
  if (imageModalClose) {
    imageModalClose.addEventListener("click", closeImageModal);
  }

  imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      closeImageModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && imageModal.classList.contains("open")) {
      closeImageModal();
    }
  });
}

const productCards = document.querySelectorAll(".product-card");
productCards.forEach((card) => {
  const mainImage = card.querySelector("[data-gallery-main]");
  const thumbButtons = Array.from(card.querySelectorAll(".thumb-btn"));
  if (!mainImage || thumbButtons.length === 0) return;

  mainImage.addEventListener("click", () => {
    openImageModal(mainImage.getAttribute("src"), mainImage.getAttribute("alt"));
  });

  thumbButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextImage = btn.getAttribute("data-image");
      if (!nextImage) return;
      mainImage.setAttribute("src", nextImage);

      thumbButtons.forEach((other) => other.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});
