const quickLinks = ['Home', 'Projects', 'Skills', 'Experience', 'Contact'];

function navigateToFooterSection(index) {
  const sectionIds = ['home-section', 'projects-section', 'skills-section', 'experience-section', 'contact-section'];
  const targetElement = document.getElementById(sectionIds[index]);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (typeof activeIndex !== 'undefined' && typeof renderNavbar === 'function') {
      activeIndex = index;
      renderNavbar();
    }
  }
}

function downloadCV() {
  const link = document.createElement('a');
  link.href = 'assets/meghana_CV.pdf';
  link.download = 'Meghana_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function renderFooter() {
  const container = document.getElementById('footer-root');
  if (!container) return;
  
  const isDesktop = window.innerWidth >= 768;
  const isDark = document.body.classList.contains('dark');
  const isMobile = window.innerWidth < 768;
  const iconSize = isMobile ? '16px' : '18px';
  const socialIconSize = isMobile ? '32px' : '38px';
  const contactIconSize = isMobile ? '14px' : '16px';
  
  const socialIconFilter = isDark 
    ? 'filter: brightness(0) saturate(100%) invert(100%);'
    : 'filter: brightness(0) saturate(100%) invert(0%);';
  
  const downloadBtnHtml = `
    <button class="footer-download-btn" id="footer-download-cv-btn">
      <img src="assets/icons/download-icon.svg" alt="download" style="width: 12px; height: 12px; filter: brightness(0) saturate(100%) invert(100%);">
      Download CV
    </button>
  `;
  
  const socialIconsHtml = `
    <div class="footer-social-icons-wrapper">
      <div class="footer-social-icons">
        <div class="footer-icon" data-url="https://github.com/im-meghana">
          <img src="assets/icons/github-icon.svg" alt="github" style="width: ${iconSize}; height: ${iconSize}; ${socialIconFilter}">
        </div>
        <div class="footer-icon" data-url="https://www.linkedin.com/in/meghana-v03/">
          <img src="assets/icons/linkedin-icon.svg" alt="linkedin" style="width: ${iconSize}; height: ${iconSize}; ${socialIconFilter}">
        </div>
        <div class="footer-icon" data-url="mailto:meghana16.atwork@gmail.com">
          <img src="assets/icons/mail-icon.svg" alt="email" style="width: ${iconSize}; height: ${iconSize}; ${socialIconFilter}">
        </div>
      </div>
      ${downloadBtnHtml}
    </div>
  `;
  
  let quickLinksHtml = '';
  quickLinks.forEach((link, index) => {
    quickLinksHtml += `
      <div class="footer-link" data-index="${index}">
        <div class="footer-link-bullet"></div>
        <span class="footer-link-text">${link}</span>
      </div>
    `;
  });
  
  const brandColumn = `
    <div class="footer-brand-col">
      <div class="footer-name">Meghana</div>
      <div class="footer-role">Flutter Developer</div>
      <div class="footer-bio">Crafting digital experiences with passion and precision. Turning ideas into reality through elegant code.</div>
      ${socialIconsHtml}
    </div>
  `;
  
  const quickLinksColumn = `
    <div class="footer-links-col">
      <div class="footer-col-title">Quick Links</div>
      <div class="footer-title-underline"></div>
      ${quickLinksHtml}
    </div>
  `;
  
  const locationIconFilter = 'filter: brightness(0) saturate(100%) invert(47%) sepia(91%) saturate(1548%) hue-rotate(300deg) brightness(101%) contrast(96%);';
  const emailIconFilter = 'filter: brightness(0) saturate(100%) invert(47%) sepia(91%) saturate(1548%) hue-rotate(300deg) brightness(101%) contrast(96%);';
  
  const contactInfoColumn = `
    <div class="footer-contact-col">
      <div class="footer-col-title">Contact Info</div>
      <div class="footer-title-underline"></div>
      
      <div class="footer-contact-row">
        <div class="footer-contact-icon">
          <img src="assets/icons/location-icon.svg" alt="location" style="width: ${contactIconSize}; height: ${contactIconSize}; ${locationIconFilter}">
        </div>
        <div>
          <div class="footer-contact-label">Location</div>
          <div class="footer-contact-value">Bengaluru, Karnataka, India</div>
        </div>
      </div>
      
      <div class="footer-contact-row" id="footer-email-row" data-url="mailto:meghana16.atwork@gmail.com">
        <div class="footer-contact-icon">
          <img src="assets/icons/mail-icon.svg" alt="email" style="width: ${contactIconSize}; height: ${contactIconSize}; ${emailIconFilter}">
        </div>
        <div>
          <div class="footer-contact-label">Email</div>
          <div class="footer-contact-value footer-contact-value-accent">meghana16.atwork@gmail.com</div>
        </div>
      </div>
    </div>
  `;
  
  let mainContentHtml = '';
  if (isDesktop) {
    mainContentHtml = `
      <div class="footer-desktop">
        ${brandColumn}
        ${quickLinksColumn}
        ${contactInfoColumn}
      </div>
    `;
  } else {
    mainContentHtml = `
      <div class="footer-mobile">
        ${brandColumn}
        <div class="footer-mobile-row">
          ${quickLinksColumn}
          ${contactInfoColumn}
        </div>
      </div>
    `;
  }
  
  const footerHtml = `
    <div class="footer">
      <div class="footer-gradient-line"></div>
      <div class="footer-content">
        <div class="footer-container">
          ${mainContentHtml}
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copyright">© 2026 Meghana. All rights reserved.</div>
      </div>
    </div>
  `;
  
  container.innerHTML = footerHtml;
  
const downloadBtn = document.getElementById('footer-download-cv-btn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    downloadCV();
  });
  downloadBtn.addEventListener('mouseenter', (e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 10px 30px rgba(168,85,247,0.3)';
  });
  downloadBtn.addEventListener('mouseleave', (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  });
}
  
  document.querySelectorAll('.footer-icon').forEach(icon => {
    const url = icon.dataset.url;
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (url) {
        if (url.startsWith('mailto:')) {
          window.location.href = url;
        } else {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      }
    });
  });
  
  document.querySelectorAll('.footer-link').forEach(link => {
    const index = parseInt(link.dataset.index);
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigateToFooterSection(index);
    });
  });
  
  const emailRow = document.getElementById('footer-email-row');
  if (emailRow) {
    const url = emailRow.dataset.url;
    emailRow.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (url) {
        window.location.href = url;
      }
    });
  }
}

let footerResizeTimer;
function initFooter() {
  renderFooter();
  
  window.addEventListener('resize', () => {
    clearTimeout(footerResizeTimer);
    footerResizeTimer = setTimeout(() => {
      renderFooter();
    }, 100);
  });
  
  if (typeof themeManager !== 'undefined' && themeManager.addListener) {
    themeManager.addListener(() => {
      renderFooter();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFooter);
} else {
  initFooter();
}