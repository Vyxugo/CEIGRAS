// Envuelve el logo en un enlace a index.html en TODAS las páginas,
// así el comportamiento es idéntico sin repetir onclick en cada HTML.
const logoImage = document.querySelector(".logo");
if (logoImage && !logoImage.closest("a")) {
  const logoLink = document.createElement("a");
  logoLink.href = "index.html";
  logoLink.className = "logo-link";
  logoLink.setAttribute("aria-label", "Ir al inicio");
  logoImage.parentNode.insertBefore(logoLink, logoImage);
  logoLink.appendChild(logoImage);
}

// ---------------------------------------------------------
// Visor de imágenes ampliadas (galerías de germoplasma).
// Usa IDs propios (#lightbox) para no chocar con el modal
// de perfiles del equipo (#modal), que es un componente distinto.
// ---------------------------------------------------------
const images = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

function closeLightbox() {
  if (lightbox) {
    lightbox.style.display = "none";
    document.body.classList.remove("modal-open");
  }
}

if (images.length && lightbox && lightboxImg) {
  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "Imagen ampliada";
      document.body.classList.add("modal-open");
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}

// ---------------------------------------------------------
// Botones "Compartir" (páginas de germoplasma y detalle de evento)
// ---------------------------------------------------------
function shareOn(network) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp: `https://wa.me/?text=${title}%20${url}`,
    x: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    mail: `mailto:?subject=${title}&body=${url}`
  };

  const target = links[network];
  if (!target) return;

  if (network === "mail") {
    window.location.href = target;
  } else {
    window.open(target, "_blank", "noopener,noreferrer,width=600,height=500");
  }
}

// ---------------------------------------------------------
// Banderas de país para las tarjetas del equipo (equipo.html)
// ---------------------------------------------------------
function getFlag(pais) {
  const value = String(pais || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .replace(/[^a-z]/g, "");

  if (!value) return "";

  if (["pe", "peru", "peruan"].includes(value) || value.includes("peru")) return "🇵🇪";
  if (["us", "usa", "eeuu", "eua", "unitedstates", "estadosunidos", "estadosunidosdeamerica"].includes(value) || value.includes("usa") || value.includes("eeuu") || value.includes("eua") || value.includes("estadosunidos")) return "🇺🇸";
  if (["mx", "mex", "mexico"].includes(value) || value.includes("mex")) return "🇲🇽";
  if (["co", "colombia"].includes(value) || value.includes("colombia")) return "🇨🇴";
  if (["ar", "argentina"].includes(value) || value.includes("argentina")) return "🇦🇷";
  if (["cl", "chile"].includes(value) || value.includes("chile")) return "🇨🇱";
  if (["ec", "ecuador"].includes(value) || value.includes("ecuador")) return "🇪🇨";
  if (["bo", "bolivia"].includes(value) || value.includes("bolivia")) return "🇧🇴";
  if (["br", "brasil", "brazil"].includes(value) || value.includes("brasil") || value.includes("brazil")) return "🇧🇷";

  return "";
}
