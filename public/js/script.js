document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  loadComponent("components/sidebar.html", "social-sidebar");
  loadNavbar();
  handlePageSpecificLogic(path);
});

// Utility to load HTML components into target elements
function loadComponent(url, elementId) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      const el = document.getElementById(elementId);
      if (el) el.innerHTML = html;
    });
}

// Load navbar and highlight active link
function loadNavbar() {
  fetch("components/navbar.html")
    .then(res => res.text())
    .then(html => {
      const navbar = document.getElementById("navbar");
      if (!navbar) return;
      navbar.innerHTML = html;

      const currentPath = window.location.pathname;
      document.querySelectorAll("#navbar a").forEach(link => {
        if (link.getAttribute("href") === currentPath) {
          link.classList.add("active");
        }
      });
    });
}

// Handle logic specific to each page
function handlePageSpecificLogic(path) {
  if (path.endsWith("contact.html")) {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!form.name.value.trim()) return alert("Name is required.");
      if (!form.email.value.trim() || !form.email.value.includes("@")) {
        return alert("Valid email required.");
      }
      if (!form.message.value.trim()) return alert("Message is required.");

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await res.json();
        document.getElementById("formResponse").textContent =
          res.ok ? result.message : `Error: ${result.message}`;

        if (res.ok) form.reset();
      } catch (err) {
        document.getElementById("formResponse").textContent = "Network error. Please try again.";
      }
    });
  }

}
