const skillsData = [
  {
    label: 'FRAMEWORKS',
    icon: 'widgets',
    accentColor: '#EC4899',
    skills: [
      { name: 'Flutter', icon: 'flutter-icon.svg', color: '#54C5F8', themeAware: false },
      { name: 'Qt', icon: 'qt-icon.svg', color: '#41CD52', themeAware: false }
    ]
  },
  {
    label: 'LANGUAGES',
    icon: 'code',
    accentColor: '#EC4899',
    skills: [
      { name: 'Dart', icon: 'dart-icon.svg', color: '#00B4AB', themeAware: false },
      { name: 'Java', icon: 'java-icon.svg', color: '#ED8B00', themeAware: false },
      { name: 'C', icon: 'c-icon.svg', color: '#00599C', themeAware: false },
      { name: 'Python', icon: 'python-icon.svg', color: '#3776AB', themeAware: false }
    ]
  },
  {
    label: 'WEB',
    icon: 'language',
    accentColor: '#EC4899',
    skills: [
      { name: 'HTML5', icon: 'html-icon.svg', color: '#E34F26', themeAware: false },
      { name: 'CSS3', icon: 'css-icon.svg', color: '#1572B6', themeAware: false },
      { name: 'Tailwind CSS', icon: 'tailwindcss-icon.svg', color: '#38BDF8', themeAware: false },
      { name: 'JavaScript', icon: 'javascript-icon.svg', color: '#F7DF1E', themeAware: false },
      { name: 'TypeScript', icon: 'typescript-icon.svg', color: '#3178C6', themeAware: false }
    ]
  },
  {
    label: 'DATABASE & OTHER TOOLS',
    icon: 'tools',
    accentColor: '#EC4899',
    skills: [
      { name: 'MySQL', icon: 'mysql-icon.svg', color: '#00758F', themeAware: false },
      { name: 'MongoDB', icon: 'mongodb-icon.svg', color: '#47A248', themeAware: false },
      { name: 'Git', icon: 'git-icon.svg', color: '#F05032', themeAware: false },
      { name: 'GitHub', icon: 'github-icon.svg', color: '#FFFFFF', themeAware: true }
    ]
  }
];

function renderSkillsSection() {
  const container = document.getElementById('skills-dynamic-content');
  if (!container) return;
  
  const isDesktop = window.innerWidth >= 768;
  const isDark = document.body.classList.contains('dark');
  
  let html = '';
  
  if (isDesktop) {
    html = `
      <div class="skills-grid">
        <div class="skills-row-2cols">
          ${generateCategoryCard(skillsData[0], isDark)}
          ${generateCategoryCard(skillsData[1], isDark)}
        </div>
        <div class="skills-row-even">
          ${generateCategoryCard(skillsData[2], isDark)}
          ${generateCategoryCard(skillsData[3], isDark)}
        </div>
      </div>
      <div class="skills-mobile" style="display: none;"></div>
    `;
  } else {
    html = `<div class="skills-mobile">`;
    skillsData.forEach(cat => {
      html += generateCategoryCard(cat, isDark);
    });
    html += `</div>
    <div class="skills-grid" style="display: none;"></div>`;
  }
  
  container.innerHTML = html;
}

function generateCategoryCard(cat, isDark) {
  const accentColor = cat.accentColor;
  const iconSize = '24px';
  
  let skillsHtml = '';
  cat.skills.forEach(skill => {
    const isThemeAware = skill.themeAware === true;
    let filterStyle = '';
    
    if (isThemeAware) {
      filterStyle = isDark 
        ? 'filter: brightness(0) saturate(100%) invert(100%);'
        : 'filter: brightness(0) saturate(100%) invert(0%);';
    }
    
    skillsHtml += `
      <div class="skill-chip">
        <img src="assets/icons/${skill.icon}" alt="${skill.name}" style="width: ${iconSize}; height: ${iconSize}; ${filterStyle}">
        <span class="skill-name">${skill.name}</span>
      </div>
    `;
  });
  
  return `
    <div class="category-card">
      <div class="category-header">
        <span class="category-title" style="color: ${accentColor};">${cat.label}</span>
      </div>
      <div class="skills-wrap">
        ${skillsHtml}
      </div>
    </div>
  `;
}

function renderSkillsHeader() {
  const headerContainer = document.getElementById('skills-header');
  if (!headerContainer) return;
  
  headerContainer.innerHTML = `
    <div class="skills-header-wrapper">
      <div style="text-align: center;">
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(168,85,247,0.1); padding: 5px 14px; border-radius: 100px; border: 1px solid rgba(168,85,247,0.3); margin-bottom: 16px;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 3.5px; color: #A855F7; font-weight: 500;">TECHNICAL EXPERTISE</span>
        </div>
        <h2 class="animated-gradient-text" style="font-family: 'Sora', sans-serif; font-size: clamp(30px, 5vw, 42px); font-weight: 800; letter-spacing: -1.5px; margin-bottom: 20px;">
          Skills & Tools
        </h2>
        <div style="width: 60px; height: 3px; background: linear-gradient(135deg, #A855F7, #EC4899); border-radius: 2px; margin: 0 auto; box-shadow: 0 0 8px rgba(168,85,247,0.4);"></div>
      </div>
    </div>
  `;
}

let skillsResizeTimer;
function initSkills() {
  renderSkillsHeader();
  renderSkillsSection();
  
  window.addEventListener('resize', () => {
    clearTimeout(skillsResizeTimer);
    skillsResizeTimer = setTimeout(() => {
      renderSkillsSection();
    }, 100);
  });
  
  if (typeof themeManager !== 'undefined' && themeManager.addListener) {
    themeManager.addListener(() => {
      renderSkillsSection();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSkills);
} else {
  initSkills();
}