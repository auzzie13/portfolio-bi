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
  
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
  
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      document.getElementById("formResponse").textContent = result.message;
      form.reset();
    });
  
  