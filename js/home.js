function renderHomeContent() {
  const container = document.getElementById('home-dynamic-content');
  if (!container) return;
  
  const desktop = Responsive.isDesktop();
  const mobile = Responsive.isMobile();
  const colors = getThemeColorsHome();
  const isDark = document.body.classList.contains('dark');
  
  const nameFontSize = Responsive.fluidFontSize(46, 78);
  const titleFontSize = Responsive.fluidFontSize(18, 26);
  const bioFontSize = Responsive.fluidFontSize(14, 16);
  const hiFontSize = Responsive.fluidFontSize(18, 22);
  const badgeFontSize = Responsive.fluidFontSize(11, 11);
  
  const layoutMode = Responsive.getLayoutMode();
  let portraitSize = 280;
  if (layoutMode === 'tablet') portraitSize = 240;
  if (layoutMode === 'mobile') portraitSize = 200;
  const portraitHeight = portraitSize * 1.4;
  
  const socialIconFilter = isDark 
    ? 'filter: brightness(0) saturate(100%) invert(100%);'
    : 'filter: brightness(0) saturate(100%) invert(0%);';
  
  const portraitCard = `
    <div class="float-animation" style="display: inline-block;">
      <div style="position: relative; width: ${portraitSize + 40}px; height: ${portraitHeight + 60}px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: ${portraitSize + 1}px; height: ${portraitHeight + 10}px; border-radius: 28px; box-shadow: 0 0 60px ${isDark ? 'rgba(168,85,247,0.35)' : 'rgba(168,85,247,0.2)'}, 20px 20px 80px ${isDark ? 'rgba(236,72,153,0.25)' : 'rgba(236,72,153,0.15)'};"></div>
        <div style="position: absolute; width: ${portraitSize + 6}px; height: ${portraitHeight + 6}px; border-radius: 26px; background: linear-gradient(135deg, #A855F7, #EC4899);"></div>
        <div style="position: absolute; width: ${portraitSize}px; height: ${portraitHeight}px; border-radius: 22px; overflow: hidden;">
          <img src="assets/images/megha_profile.jpeg" alt="Meghana" style="width: 100%; height: 100%; object-fit: cover; object-position: top center;" onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;background:linear-gradient(135deg,#6366F1,#A855F7,#EC4899);display:flex;align-items:center;justify-content:center\\'><span style=\\'font-size:${portraitSize * 0.3}px;color:white;font-weight:bold\\'>M</span></div>'">
        </div>
        <div style="position: absolute; top: 10px; right: 0; background: ${colors.cardBg}; border: 1px solid ${colors.borderColor}; border-radius: 100px; padding: 10px 15px; box-shadow: 0 4px 12px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}; display: flex; align-items: center; gap: 6px; z-index: 10;">
          <span style="font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: ${colors.textColor};">Flutter Dev</span>
        </div>
      </div>
    </div>
  `;
  
  const buttonPadding = mobile ? '8px 16px' : '12px 28px';
  const iconSize = mobile ? '32px' : '42px';
  const iconImgSize = mobile ? '16px' : '18px';
  
  const heroText = `
    <div style="text-align: ${desktop ? 'left' : 'center'};">
      <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(168,85,247,0.1); padding: 5px 14px; border-radius: 100px; border: 1px solid rgba(168,85,247,0.3); margin-bottom: 24px;">
        <span style="font-family: 'JetBrains Mono', monospace; font-size: ${badgeFontSize}px; letter-spacing: 1.5px; color: #A855F7; font-weight: 500;">✦  Available for work</span>
      </div>
      <p style="font-family: 'Sora', sans-serif; font-size: ${hiFontSize}px; color: ${colors.textMuted}; font-weight: 400; margin-bottom: 6px;">Hi, I'm</p>
      <h1 class="animated-gradient-text" style="font-family: 'Sora', sans-serif; font-size: ${nameFontSize}px; font-weight: 800; line-height: 1; letter-spacing: -3px; margin-bottom: 16px;">Meghana</h1>
      <div style="display: flex; align-items: center; justify-content: ${desktop ? 'flex-start' : 'center'}; gap: 3px; margin-bottom: 28px; min-height: ${titleFontSize * 1.5}px;">
        <span id="typewriter-text" style="font-family: 'Sora', sans-serif; font-size: ${titleFontSize}px; font-weight: 500; color: ${colors.textColor}; letter-spacing: -0.5px;"></span>
        <span id="typewriter-cursor" class="blinking-cursor" style="width: 2.5px; height: ${titleFontSize * 1.2}px; background: linear-gradient(135deg, #A855F7, #EC4899); border-radius: 2px; display: inline-block;"></span>
      </div>
      <div style="max-width: 500px; margin: ${desktop ? '0' : '0 auto'}; margin-bottom: 32px;">
        <p style="font-family: 'DM Sans', sans-serif; font-size: ${bioFontSize}px; line-height: 1.85; color: ${colors.textMuted};">${K.bio}</p>
      </div>
      <div style="display: flex; flex-wrap: nowrap; align-items: center; justify-content: ${desktop ? 'flex-start' : 'center'}; gap: 12px; margin-top: 0; position: relative; z-index: 5;">
        <button class="gradient-btn-home" id="download-cv-btn" style="padding: ${buttonPadding}; border-radius: 10px; color: white; font-family: 'DM Sans', sans-serif; font-size: ${mobile ? '12px' : '14px'}; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; white-space: nowrap; border: none; transition: transform 0.18s ease, box-shadow 0.18s ease;">
          <img src="assets/icons/download-icon.svg" alt="download" style="width: ${iconImgSize}; height: ${iconImgSize}; filter: brightness(0) saturate(100%) invert(100%);">
          Download CV
        </button>
        <div class="social-icon-home" id="email-btn" style="width: ${iconSize}; height: ${iconSize}; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: ${colors.cardBg}; border: 1px solid ${colors.borderColor}; cursor: pointer; flex-shrink: 0; transition: transform 0.2s ease, border-color 0.2s ease;">
          <img src="assets/icons/mail-icon.svg" alt="email" style="width: ${iconImgSize}; height: ${iconImgSize}; ${socialIconFilter}">
        </div>
        <div class="social-icon-home" id="linkedin-btn" style="width: ${iconSize}; height: ${iconSize}; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: ${colors.cardBg}; border: 1px solid ${colors.borderColor}; cursor: pointer; flex-shrink: 0; transition: transform 0.2s ease, border-color 0.2s ease;">
          <img src="assets/icons/linkedin-icon.svg" alt="linkedin" style="width: ${iconImgSize}; height: ${iconImgSize}; ${socialIconFilter}">
        </div>
        <div class="social-icon-home" id="github-btn" style="width: ${iconSize}; height: ${iconSize}; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: ${colors.cardBg}; border: 1px solid ${colors.borderColor}; cursor: pointer; flex-shrink: 0; transition: transform 0.2s ease, border-color 0.2s ease;">
          <img src="assets/icons/github-icon.svg" alt="github" style="width: ${iconImgSize}; height: ${iconImgSize}; ${socialIconFilter}">
        </div>
      </div>
    </div>
  `;
  
  if (desktop) {
    container.innerHTML = `<div style="display: flex; align-items: center; justify-content: space-between;"><div style="flex: 5;">${heroText}</div><div style="width: 80px;"></div><div>${portraitCard}</div></div>`;
  } else {
    container.innerHTML = `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;"><div>${portraitCard}</div><div style="height: ${mobile ? '32px' : '48px'};"></div><div>${heroText}</div></div>`;
  }
  
  setTimeout(() => {
    startHomeTypewriter();
  }, 100);

const downloadBtn = document.getElementById('download-cv-btn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const link = document.createElement('a');
    link.href = 'assets/meghana_CV.pdf';
    link.download = 'Meghana_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

const emailBtn = document.getElementById('email-btn');
if (emailBtn) {
  emailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = 'mailto:meghana16.atwork@gmail.com';
  });
  emailBtn.addEventListener('mouseenter', (e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.borderColor = '#A855F7';
  });
  emailBtn.addEventListener('mouseleave', (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = colors.borderColor;
  });
}

const linkedinBtn = document.getElementById('linkedin-btn');
if (linkedinBtn) {
  linkedinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(K.linkedin, '_blank', 'noopener,noreferrer');
  });
  linkedinBtn.addEventListener('mouseenter', (e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.borderColor = '#A855F7';
  });
  linkedinBtn.addEventListener('mouseleave', (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = colors.borderColor;
  });
}

const githubBtn = document.getElementById('github-btn');
if (githubBtn) {
  githubBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(K.github, '_blank', 'noopener,noreferrer');
  });
  githubBtn.addEventListener('mouseenter', (e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.borderColor = '#A855F7';
  });
  githubBtn.addEventListener('mouseleave', (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = colors.borderColor;
  });
}
  
  const scrollWrapper = document.getElementById('scroll-down-wrapper');
  if (scrollWrapper && desktop && !mobile) {
    scrollWrapper.style.display = 'flex';
    scrollWrapper.innerHTML = `<div class="bounce-animation" style="text-align: center;" id="scroll-down-btn"><p style="font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 2px; color: ${colors.textMuted};">scroll</p><div style="margin-top: 6px;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#gradArrow)" stroke-width="1.5"><defs><linearGradient id="gradArrow" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#A855F7"/><stop offset="100%" style="stop-color:#EC4899"/></linearGradient></defs><polyline points="6 9 12 15 18 9"/></svg></div></div>`;
    document.getElementById('scroll-down-btn')?.addEventListener('click', () => {
      document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  } else if (scrollWrapper) {
    scrollWrapper.style.display = 'none';
  }
}

function getThemeColorsHome() {
  const isDark = document.body.classList.contains('dark');
  return {
    textMuted: isDark ? '#B8BCC4' : '#6B6B7D',
    textColor: isDark ? '#F4F4F6' : '#0F0F14',
    cardBg: isDark ? '#111116' : '#F2F2F7',
    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
    bgColor: isDark ? '#050507' : '#FFFFFF'
  };
}

let homeTitleIndex = 0;
let homeCurrentText = '';
let homeTypeTimer = null;
let homeIsDeleting = false;
let homeIsWaiting = false;

function startHomeTypewriter() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) {
    setTimeout(startHomeTypewriter, 50);
    return;
  }
  
  homeCurrentText = K.titles[0];
  textElement.textContent = homeCurrentText;
  
  function updateText() {
    if (textElement) textElement.textContent = homeCurrentText;
  }
  
  function typeNext() {
    if (homeIsWaiting) return;
    
    const target = K.titles[homeTitleIndex];
    
    if (!homeIsDeleting && homeCurrentText.length < target.length) {
      homeCurrentText = target.substring(0, homeCurrentText.length + 1);
      updateText();
      homeTypeTimer = setTimeout(typeNext, 35);
    } else if (!homeIsDeleting && homeCurrentText.length === target.length) {
      homeIsWaiting = true;
      homeTypeTimer = setTimeout(() => {
        homeIsWaiting = false;
        homeIsDeleting = true;
        typeNext();
      }, 800);
    } else if (homeIsDeleting && homeCurrentText.length > 0) {
      homeCurrentText = homeCurrentText.substring(0, homeCurrentText.length - 1);
      updateText();
      homeTypeTimer = setTimeout(typeNext, 20);
    } else if (homeIsDeleting && homeCurrentText.length === 0) {
      homeIsDeleting = false;
      homeTitleIndex = (homeTitleIndex + 1) % K.titles.length;
      homeIsWaiting = true;
      homeTypeTimer = setTimeout(() => {
        homeIsWaiting = false;
        typeNext();
      }, 100);
    }
  }
  
  homeTypeTimer = setTimeout(() => {
    homeIsDeleting = true;
    typeNext();
  }, 2000);
}

let homeResizeTimer;
function initHome() {
  renderHomeContent();
  window.addEventListener('resize', () => {
    clearTimeout(homeResizeTimer);
    homeResizeTimer = setTimeout(renderHomeContent, 100);
  });
  if (typeof themeManager !== 'undefined' && themeManager.addListener) {
    themeManager.addListener(() => renderHomeContent());
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHome);
} else {
  initHome();
}