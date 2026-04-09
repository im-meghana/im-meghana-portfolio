const experienceData = {
  role: 'QT Developer Intern',
  company: 'ARECA Embedded Systems Pvt Ltd, Bangalore',
  period: 'Apr 2023 - Feb 2024',
  bullets: [
    'Developed and maintained desktop applications using Qt framework with QML and C++, delivering responsive and high-performance user interfaces with MySQL database integration.',
    'Collaborated in a team to build applications using C# and .NET framework.',
    'Gained proficiency in software development best practices, including debugging, testing, and documentation.',
    'Collaborated and participated in daily standups and code reviews.'
  ]
};

function renderExperienceSection() {
  const container = document.getElementById('experience-dynamic-content');
  if (!container) return;
  
  const isMobile = window.innerWidth < 768;
  const isDark = document.body.classList.contains('dark');
  
  let bulletsHtml = '';
  experienceData.bullets.forEach(bullet => {
    bulletsHtml += `
      <div class="bullet-item">
        <div class="bullet-dot"></div>
        <div class="bullet-text">${bullet}</div>
      </div>
    `;
  });
  
  let headerHtml = '';
  if (isMobile) {
    headerHtml = `
      <div class="experience-header-column">
        <div class="experience-role-mobile">${experienceData.role}</div>
        <div class="experience-company-mobile">${experienceData.company}</div>
        <div class="experience-period-badge-mobile">${experienceData.period}</div>
      </div>
    `;
  } else {
    headerHtml = `
      <div class="experience-header-row">
        <div class="experience-header-left">
          <div class="experience-role">${experienceData.role}</div>
          <div class="experience-company">${experienceData.company}</div>
        </div>
        <div class="experience-period-badge">${experienceData.period}</div>
      </div>
    `;
  }
  
  const html = `
    <div class="timeline-container">
      <div class="timeline-line">
        <div class="timeline-dot"></div>
        <div class="timeline-vertical-line"></div>
      </div>
      <div class="experience-card">
        ${headerHtml}
        <div class="experience-bullets">
          ${bulletsHtml}
        </div>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
}

function renderExperienceHeader() {
  const headerContainer = document.getElementById('experience-header');
  if (!headerContainer) return;
  
  headerContainer.innerHTML = `
    <div style="text-align: center;">
      <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(168,85,247,0.1); padding: 5px 14px; border-radius: 100px; border: 1px solid rgba(168,85,247,0.3); margin-bottom: 16px;">
        <span style="font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 3.5px; color: #A855F7; font-weight: 500;">WORK HISTORY</span>
      </div>
      <h2 class="animated-gradient-text" style="font-family: 'Sora', sans-serif; font-size: clamp(30px, 5vw, 42px); font-weight: 800; letter-spacing: -1.5px; margin-bottom: 20px;">
        Experience
      </h2>
      <div style="width: 60px; height: 3px; background: linear-gradient(135deg, #A855F7, #EC4899); border-radius: 2px; margin: 0 auto; box-shadow: 0 0 8px rgba(168,85,247,0.4);"></div>
    </div>
  `;
}

let experienceResizeTimer;
function initExperience() {
  renderExperienceHeader();
  renderExperienceSection();
  
  window.addEventListener('resize', () => {
    clearTimeout(experienceResizeTimer);
    experienceResizeTimer = setTimeout(() => {
      renderExperienceSection();
    }, 100);
  });
  
  if (typeof themeManager !== 'undefined' && themeManager.addListener) {
    themeManager.addListener(() => {
      renderExperienceSection();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExperience);
} else {
  initExperience();
}