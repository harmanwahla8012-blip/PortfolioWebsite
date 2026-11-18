/*
  Portfolio settings
  1. Replace the placeholder image in assets/ with your own portrait.
  2. Add your real profile URLs below when ready.
*/
const profileLinks = {
  linkedin: "", // Example: https://www.linkedin.com/in/your-profile/
  github: ""    // Example: https://github.com/your-username
};

const roles = ["Aspiring Full-Stack Developer", "Software Development Student", "Python Intern"];
const roleNode = document.querySelector("#role-rotator");
let roleIndex = 0;
if (roleNode && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setInterval(() => {
    roleNode.animate([{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(5px)" }], { duration: 220, fill: "forwards" }).onfinish = () => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleNode.textContent = roles[roleIndex];
      roleNode.animate([{ opacity: 0, transform: "translateY(-5px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 260, fill: "forwards" });
    };
  }, 2900);
}

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navLinks?.classList.toggle("open", !isOpen);
});
navLinks?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
}));

const revealNodes = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealNodes.forEach(node => revealObserver.observe(node));
} else {
  revealNodes.forEach(node => node.classList.add("visible"));
}

const toast = document.querySelector(".toast");
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll("[data-copy]").forEach(button => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(value);
      showToast("Email address copied to clipboard");
    } catch {
      showToast(`Email: ${value}`);
    }
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

// Display LinkedIn and GitHub only when real URLs have been added above.
const profileLinksContainer = document.querySelector("#profile-links");
const profileNote = document.querySelector("#profile-note");
const configuredProfiles = [
  ["LinkedIn", profileLinks.linkedin],
  ["GitHub", profileLinks.github]
].filter(([, url]) => typeof url === "string" && /^https?:\/\//i.test(url.trim()));
if (profileLinksContainer && configuredProfiles.length) {
  configuredProfiles.forEach(([label, url]) => {
    const anchor = document.createElement("a");
    anchor.href = url.trim();
    anchor.textContent = label + " ↗";
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    profileLinksContainer.append(anchor);
  });
  if (profileNote) profileNote.hidden = true;
}
