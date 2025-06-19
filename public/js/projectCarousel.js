let projects = [];
let currentIndex = 0;
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
  const isVideo = proj.gif.includes("vimeo.com");
  const iconClass = proj.link.includes("github.com")
    ? "fab fa-github"
    : isVideo
    ? "fab fa-vimeo"
    : "fas fa-external-link-alt";

  let mediaContent;

  if (isVideo) {
    const fullId = proj.gif.split("vimeo.com/")[1];
    const videoId = fullId.split("/")[0];
    const thumbnailUrl = `https://vumbnail.com/${fullId}.jpg`;


    mediaContent = `
      <div class="video-wrapper lazy-video" data-video-id="${videoId}">
        <img src="${thumbnailUrl}" alt="Video thumbnail" class="video-thumb" />
        <div class="play-button">&#9658;</div>
      </div>
    `;
  } else {
    mediaContent = `
      <img src="${proj.gif}" alt="Project gif" style="width:100%; max-height:200px; object-fit:contain;">
    `;
  }

  document.getElementById("projectDisplay").innerHTML = `
    ${mediaContent}
    <p>${proj.description}</p>
    <a href="${proj.link}" target="_blank" class="project-link">
      <i class="${iconClass}"></i> View Project
    </a>
  `;

  attachLazyVideoListeners();
}

function attachLazyVideoListeners() {
  const lazyVideos = document.querySelectorAll(".lazy-video");

  lazyVideos.forEach((wrapper) => {
    wrapper.addEventListener("click", () => {
      const videoId = wrapper.dataset.videoId;
      wrapper.innerHTML = `
        <iframe 
          src="https://player.vimeo.com/video/${videoId}?autoplay=1" 
          frameborder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
    });
  });
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
