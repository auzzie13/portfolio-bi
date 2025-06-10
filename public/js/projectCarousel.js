let projects = [];
let currentIndex = 3;
let currentFilter = "all";

async function loadProjects() {
  try {
    const response = await fetch("/api/projects");
    projects = await response.json();
    renderProject(currentIndex);
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

function renderProject(index) {
  const filtered = projects.filter(
    (p) => currentFilter === "all" || p.type === currentFilter
  );
  if (filtered.length === 0) return;

  const proj = filtered[index % filtered.length];

  const iconClass = proj.link.includes("github.com")
    ? "fab fa-github"
    : "fas fa-external-link-alt";

  document.getElementById("projectDisplay").innerHTML = `
  <img src="${proj.gif}" alt="Project gif" style="width:100%; max-height:200px; object-fit:contain;">
  <p>${proj.description}</p>
  <a href="${proj.link}" target="_blank" class="project-link">
   <i class="${iconClass}"></i> View Project
  </a>
`;
}

document.querySelector(".left").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  renderProject(currentIndex);
});

document.querySelector(".right").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % projects.length;
  renderProject(currentIndex);
});

document.querySelectorAll(".filter-buttons button").forEach((btn) =>
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    currentIndex = 0;
    renderProject(currentIndex);
  })
);

loadProjects();
