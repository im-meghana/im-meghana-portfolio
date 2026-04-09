const projectsData = [
  {
    title: 'AlphaFix',
    desc: 'AlphaFix is a simple utility that repairs video metadata lost during re-encoding - dates, GPS, camera info, all fixed in seconds.',
    thumbnail: 'assets/images/alphafix_screen.png',
    skills: ['Flutter', 'Dart'],
    platform: 'Desktop',
    githubUrl: 'https://github.com/im-meghana/alphafix',
    playstoreUrl: null,
    isComingSoon: false
  },
  {
    title: 'Coming Soon',
    desc: 'A new project is currently in development. Stay tuned for the next release.',
    thumbnail: 'assets/images/coming-soon.png',
    skills: ['Flutter', 'Innovation'],
    platform: 'Multi-Platform',
    githubUrl: 'https://github.com/im-meghana',
    playstoreUrl: null,
    isComingSoon: true
  }
];

function renderProjectsSection() {
  const container = document.getElementById('projects-dynamic-content');
  if (!container) return;
  
  const isDark = document.body.classList.contains('dark');
  const screenWidth = window.innerWidth;
  const isMobile = screenWidth < 768;
  
  const gridCols = isMobile ? 1 : 2;
  
  const githubIconFilter = isDark 
    ? 'filter: brightness(0) saturate(100%) invert(100%);'
    : 'filter: brightness(0) saturate(100%) invert(0%);';
  
  let projectsHtml = `
    <div class="projects-grid grid-${gridCols}">
  `;
  
  projectsData.forEach(project => {
    const isComingSoon = project.isComingSoon;
    const cardClass = isComingSoon ? 'project-card coming-soon' : 'project-card';
    const cardUrl = !isComingSoon ? project.githubUrl : '';
    
    projectsHtml += `
      <div class="${cardClass}" data-project="${project.title.replace(/\s/g, '')}" data-url="${cardUrl}">
        <div class="project-thumbnail">
          <img src="${project.thumbnail}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/400x250?text=${project.title}'">
        </div>
        <div class="project-content">
          <h3 class="project-title" style="color: ${isComingSoon ? '#888' : 'var(--text-color)'}">${project.title}</h3>
          <p class="project-desc">${project.desc}</p>
          <div class="project-skills">
            ${project.skills.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
          </div>
        </div>
        <div class="project-footer">
          <span class="platform-badge">${project.platform}</span>
          ${!isComingSoon ? `
            <div class="project-action-btn github-btn" data-url="${project.githubUrl}">
              <img src="assets/icons/github-icon.svg" alt="github" style="width: 16px; height: 16px; ${githubIconFilter}">
              GitHub
            </div>
          ` : `
            <div class="project-action-btn disabled">
              <img src="assets/icons/github-icon.svg" alt="github" style="width: 16px; height: 16px; opacity: 0.5;">
              Coming Soon
            </div>
          `}
        </div>
      </div>
    `;
  });
  
  projectsHtml += `</div>`;
  container.innerHTML = projectsHtml;
  
  document.querySelectorAll('.project-card').forEach(card => {
    const url = card.dataset.url;
    if (url && url !== '') {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.github-btn')) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }
  });
  
  document.querySelectorAll('.github-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const url = btn.dataset.url;
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  });
}

function renderProjectsHeader() {
  const headerContainer = document.getElementById('projects-header');
  if (!headerContainer) return;
  
  headerContainer.innerHTML = `
    <div style="text-align: center;">
      <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(168,85,247,0.1); padding: 5px 14px; border-radius: 100px; border: 1px solid rgba(168,85,247,0.3); margin-bottom: 16px;">
        <span style="font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 3.5px; color: #A855F7; font-weight: 500;">SELECTED WORK</span>
      </div>
      <h2 class="animated-gradient-text" style="font-family: 'Sora', sans-serif; font-size: clamp(30px, 5vw, 42px); font-weight: 800; letter-spacing: -1.5px; margin-bottom: 20px;">
        Projects
      </h2>
      <div style="width: 60px; height: 3px; background: linear-gradient(135deg, #A855F7, #EC4899); border-radius: 2px; margin: 0 auto; box-shadow: 0 0 8px rgba(168,85,247,0.4);"></div>
    </div>
  `;
}

let projectsResizeTimer;
function initProjects() {
  renderProjectsHeader();
  renderProjectsSection();
  
  window.addEventListener('resize', () => {
    clearTimeout(projectsResizeTimer);
    projectsResizeTimer = setTimeout(() => {
      renderProjectsSection();
    }, 100);
  });
  
  if (typeof themeManager !== 'undefined' && themeManager.addListener) {
    themeManager.addListener(() => {
      renderProjectsSection();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjects);
} else {
  initProjects();
}