const logoImage = document.querySelector(".logo");
if (logoImage && !logoImage.closest("a")) {
  const logoLink = document.createElement("a");
  logoLink.href = "index.html";
  logoLink.className = "logo-link";
  logoLink.setAttribute("aria-label", "Ir al inicio");
  logoImage.parentNode.insertBefore(logoLink, logoImage);
  logoLink.appendChild(logoImage);
}

const images = document.querySelectorAll(".gallery-grid img");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeButton = document.getElementById("cerrar");

function closeModal() {
  if (modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
}

if (images.length && modal && modalImg) {
  images.forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
      modalImg.alt = img.alt || "Imagen ampliada";
      document.body.classList.add("modal-open");
    });
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}
