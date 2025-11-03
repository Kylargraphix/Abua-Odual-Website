// ===== Sticky Navbar (with Scroll Effect) =====
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("sticky", window.scrollY > 0);

  // Smooth transition styling when scrolled
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== Mobile Navbar Toggle =====
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    navMenu.classList.toggle("active");
  });
}

// ===== Dropdown Toggle (for Mobile View) =====
document.querySelectorAll(".dropdown > .dropbtn").forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();
    const parent = button.parentElement;
    parent.classList.toggle("active");
  });
});

// ===== Hero Slider =====
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((s, i) => s.classList.toggle("active", i === index));
}

if (slides.length > 0) {
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

// ===== Scroll Animations (Fade-in Elements) =====
const fadeEls = document.querySelectorAll(".fade-in");

function revealOnScroll() {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ===== Simple Contact Form Alert =====
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    alert(`Thank you, ${name}! Your message has been received.`);
    form.reset();
  });
}

// ====== 🌍 Leaflet Interactive Map (Abua Odual LGA) ======
window.addEventListener("load", () => {
  const mapElement = document.getElementById("abuaMap");
  if (!mapElement) return;

  // Initialize map centered on Abua/Odual, Rivers State
  const map = L.map("abuaMap").setView([4.9264, 6.6665], 10);

  // Add tile layer (OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add multiple key locations
  const locations = [
    { name: "Abua Central", coords: [4.9264, 6.6665], info: "Administrative center of the LGA." },
    { name: "Emohua Junction", coords: [4.92, 6.63], info: "A busy hub linking major routes." },
    { name: "Odual Area", coords: [4.91, 6.70], info: "Known for agriculture and vibrant markets." },
    { name: "Anyu Community", coords: [4.95, 6.68], info: "A fast-growing residential area." }
  ];

  locations.forEach(loc => {
    L.marker(loc.coords)
      .addTo(map)
      .bindPopup(`<b>${loc.name}</b><br>${loc.info}`);
  });

  // Draw LGA boundary (approximate)
  const boundaryCoords = [
    [4.97, 6.63],
    [4.90, 6.60],
    [4.86, 6.68],
    [4.91, 6.74],
    [4.98, 6.70]
  ];

  const boundary = L.polygon(boundaryCoords, {
    color: "green",
    weight: 2,
    fillColor: "#32CD32",
    fillOpacity: 0.2
  }).addTo(map);

  boundary.bindPopup("<b>Abua-Odual LGA Boundary</b><br>Approximate coverage area.");

  // Hover effect on boundary
  boundary.on("mouseover", function() {
    this.setStyle({ fillOpacity: 0.5 });
  });
  boundary.on("mouseout", function() {
    this.setStyle({ fillOpacity: 0.2 });
  });

  // Fit the map view to the boundary
  map.fitBounds(boundary.getBounds());
});
