const contactItems = [
  {
    icon: 'github-icon.svg',
    label: 'GitHub',
    sub: '@im-meghana',
    url: 'https://github.com/im-meghana',
    color: '#A855F7'
  },
  {
    icon: 'linkedin-icon.svg',
    label: 'LinkedIn',
    sub: 'Meghana',
    url: 'https://www.linkedin.com/in/meghana-v03/',
    color: '#6366F1'
  },
  {
    icon: 'mail-icon.svg',
    label: 'Email',
    sub: 'meghana16.atwork@gmail.com',
    url: 'mailto:meghana16.atwork@gmail.com',
    color: '#EC4899'
  }
];

function getIconGradient() {
  return `linear-gradient(135deg, #A855F7, #EC4899)`;
}

function renderContactSection() {
  const container = document.getElementById('contact-dynamic-content');
  if (!container) return;
  
  const isMobile = window.innerWidth < 768;
  const isDark = document.body.classList.contains('dark');
  const iconSize = isMobile ? '22px' : '24px';
  
  let cardsHtml = '';
  
  contactItems.forEach(item => {
    const iconGradient = getIconGradient();
    const cardClass = isMobile ? 'contact-card-mobile' : 'contact-card-desktop';
    const subClass = isMobile ? 'contact-subtext contact-subtext-mobile' : 'contact-subtext';
    
    cardsHtml += `
      <div class="${cardClass}">
        <div class="contact-card" data-url="${item.url}" data-color="${item.color}">
          <div class="contact-icon-wrapper" style="background: ${iconGradient};">
            <img src="assets/icons/${item.icon}" alt="${item.label}" style="width: ${iconSize}; height: ${iconSize}; filter: brightness(0) saturate(100%) invert(100%);">
          </div>
          <div class="contact-label">${item.label}</div>
          <div class="${subClass}">${item.sub}</div>
        </div>
      </div>
    `;
  });
  
  const html = `
    <div class="contact-cards-grid">
      ${cardsHtml}
    </div>
  `;
  
  container.innerHTML = html;
  
  document.querySelectorAll('.contact-card').forEach(card => {
    const url = card.dataset.url;
    const color = card.dataset.color;
    const iconWrapper = card.querySelector('.contact-icon-wrapper');
    const cardElement = card;
    
    card.addEventListener('click', () => {
      if (url) {
        window.open(url, '_blank');
      }
    });
    
    card.addEventListener('mouseenter', () => {
      cardElement.style.transform = 'translateY(-6px)';
      cardElement.style.borderColor = `${color}80`;
      cardElement.style.boxShadow = `0 8px 28px ${color}33`;
      if (iconWrapper) {
        iconWrapper.style.boxShadow = `0 0 16px rgba(168,85,247,0.3)`;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      cardElement.style.transform = 'translateY(0)';
      cardElement.style.borderColor = 'var(--border-color)';
      cardElement.style.boxShadow = 'none';
      if (iconWrapper) {
        iconWrapper.style.boxShadow = 'none';
      }
    });
  });
}

function renderContactHeader() {
  const headerContainer = document.getElementById('contact-header');
  if (!headerContainer) return;
  
  headerContainer.innerHTML = `
    <div style="text-align: center;">
      <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(168,85,247,0.1); padding: 5px 14px; border-radius: 100px; border: 1px solid rgba(168,85,247,0.3); margin-bottom: 16px;">
        <span style="font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 3.5px; color: #A855F7; font-weight: 500;">LET'S CONNECT</span>
      </div>
      <h2 class="animated-gradient-text" style="font-family: 'Sora', sans-serif; font-size: clamp(30px, 5vw, 42px); font-weight: 800; letter-spacing: -1.5px; margin-bottom: 20px;">
        Get in Touch
      </h2>
      <div style="width: 60px; height: 3px; background: linear-gradient(135deg, #A855F7, #EC4899); border-radius: 2px; margin: 0 auto; box-shadow: 0 0 8px rgba(168,85,247,0.4);"></div>
    </div>
  `;
}

function renderContactDescription() {
  const descContainer = document.getElementById('contact-description');
  if (!descContainer) return;
  
  descContainer.innerHTML = `
    <div class="contact-description">
      I'm always open to interesting conversations, collaborations, or new opportunities. Reach out through any of the channels below.
    </div>
  `;
}

function renderContactLocation() {
  const locationContainer = document.getElementById('contact-location');
  if (!locationContainer) return;
  
  const isDark = document.body.classList.contains('dark');
  const iconSize = '16px';
  
  locationContainer.innerHTML = `
    <div class="location-row">
      <div class="location-icon">
        <img src="assets/icons/location-icon.svg" alt="location" style="width: ${iconSize}; height: ${iconSize}; display: block; filter: brightness(0) saturate(100%) invert(47%) sepia(91%) saturate(1548%) hue-rotate(300deg) brightness(101%) contrast(96%);">
      </div>
      <div class="location-text">Bengaluru, Karnataka, India</div>
    </div>
  `;
}

let contactResizeTimer;
function initContact() {
  renderContactHeader();
  renderContactDescription();
  renderContactSection();
  renderContactLocation();
  
  window.addEventListener('resize', () => {
    clearTimeout(contactResizeTimer);
    contactResizeTimer = setTimeout(() => {
      renderContactSection();
    }, 100);
  });
  
  if (typeof themeManager !== 'undefined' && themeManager.addListener) {
    themeManager.addListener(() => {
      renderContactSection();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContact);
} else {
  initContact();
}