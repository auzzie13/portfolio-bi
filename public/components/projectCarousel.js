const projects = [
    {
      type: 'frontend',
      gif: '/assets/projects/project1.gif',
      description: 'Front-end dashboard built with React and Chart.js.',
    },
    {
      type: 'backend',
      gif: '/assets/projects/project2.gif',
      description: 'Node.js API with MySQL and Express for data aggregation.',
    },
    {
      type: 'tableau',
      gif: '/assets/projects/project3.gif',
      description: 'Interactive Tableau dashboard for NIH-funded study.',
    },
  ];
  
  let currentIndex = 0;
  let currentFilter = 'all';
  
  function renderProject(index) {
    const filtered = projects.filter(
      (p) => currentFilter === 'all' || p.type === currentFilter
    );
    if (filtered.length === 0) return;
  
    const proj = filtered[index % filtered.length];
    document.getElementById('projectDisplay').innerHTML = `
      <img src="${proj.gif}" alt="Project gif" style="width:100%; max-height:200px; object-fit:contain;">
      <p>${proj.description}</p>
    `;
  }
  
  document.querySelector('.left').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    renderProject(currentIndex);
  });
  
  document.querySelector('.right').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % projects.length;
    renderProject(currentIndex);
  });
  
  document.querySelectorAll('.filter-buttons button').forEach((btn) =>
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      currentIndex = 0;
      renderProject(currentIndex);
    })
  );
  
  // Initial render
  renderProject(currentIndex);
  