const path = window.location.pathname;

// document.addEventListener("DOMContentLoaded", () => {
//     fetch("/api/projects")
//       .then(res => res.json())
//       .then(data => {
//         const list = document.getElementById("project-list");
//         list.innerHTML = data.map(p => `
//           <div class="project">
//             <h3>${p.title}</h3>
//             <p>${p.description}</p>
//           </div>
//         `).join("");
//       });
fetch("components/sidebar.html")
  .then((res) => res.text())
  .then((html) => {
    const sidebar = document.getElementById("social-sidebar");
    if (sidebar) {
      sidebar.innerHTML = html;
    }
  });

fetch("components/navbar.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("navbar").innerHTML = html;
  });

document.addEventListener("DOMContentLoaded", function () {
  fetch("components/navbar.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("navbar").innerHTML = html;

      // Highlight current link
      const currentPath = window.location.pathname;
      const links = document.querySelectorAll("#navbar a");
      links.forEach((link) => {
        if (link.getAttribute("href") === currentPath) {
          link.classList.add("active");
        }
      });
    });
});

if (path.endsWith("index.html")) {
  // about page logic here
} else if (path.endsWith("about.html")) {
  // projects page logic here
} else if (path.endsWith("projects.html")) {
  // projects page logic here
} else if (path.endsWith("contact.html")) {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.name.value.trim()) return alert("Name is required.");
    if (!form.email.value.trim() || !form.email.value.includes("@"))
      return alert("Valid email required.");
    if (!form.message.value.trim()) return alert("Message is required.");
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    console.log(payload);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (!res.ok) {
      document.getElementById("formResponse").textContent =
        "Error: " + result.message;
    } else {
      document.getElementById("formResponse").textContent = result.message;
      form.reset();
    }
  });
}
