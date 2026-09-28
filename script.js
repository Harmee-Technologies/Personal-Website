// ============================================================
// Gemechu Moti Muleta — Personal Website
// Edit the values in the PERSONAL SETTINGS section below.
// ============================================================

const PERSONAL_EMAIL = "your.email@example.com";

// ---------- Navigation ----------
const header = document.getElementById("header");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- Theme ----------
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  themeToggle.textContent = dark ? "☀" : "☾";
  localStorage.setItem("theme", dark ? "dark" : "light");
});

// ---------- Scroll effects ----------
const scrollProgress = document.getElementById("scrollProgress");
const backTop = document.getElementById("backTop");
const sections = document.querySelectorAll("main section[id]");

function handleScroll() {
  const scrollTop = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0}%`;

  header.classList.toggle("scrolled", scrollTop > 20);
  backTop.classList.toggle("show", scrollTop > 500);

  let current = "";
  sections.forEach(section => {
    if (scrollTop >= section.offsetTop - 160) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ---------- Reveal animations ----------
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => revealObserver.observe(item));

// ---------- Project filters ----------
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
    });
  });
});

// ---------- Contact form ----------
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    formStatus.textContent = "Please complete all fields.";
    return;
  }

  const body =
    `Hello Gemechu,%0D%0A%0D%0A` +
    `Name: ${encodeURIComponent(name)}%0D%0A` +
    `Email: ${encodeURIComponent(email)}%0D%0A%0D%0A` +
    `${encodeURIComponent(message)}`;

  window.location.href =
    `mailto:${PERSONAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;

  formStatus.textContent = "Opening your email application...";
});

// ---------- Current year ----------
document.getElementById("year").textContent = new Date().getFullYear();
