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

function getFlag(pais) {
  const key = String(pais || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita tildes

  if (key.includes("peru")) return "🇵🇪";
  if (key.includes("usa") || key.includes("us") || key.includes("eua") || key.includes("united states") || key.includes("estados unidos") || key.includes("estados unidos de america")) return "🇺🇸";
  if (key.includes("mexico") || key.includes("mex")) return "🇲🇽";
  if (key.includes("colombia")) return "🇨🇴";
  if (key.includes("argentina")) return "🇦🇷";
  if (key.includes("chile")) return "🇨🇱";
  if (key.includes("ecuador")) return "🇪🇨";
  if (key.includes("bolivia")) return "🇧🇴";
  if (key.includes("brasil") || key.includes("brazil")) return "🇧🇷";
  return "";
}
