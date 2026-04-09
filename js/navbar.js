let activeIndex = 0;
let mobileMenuOpen = false;

function useCompactMode() {
  return window.innerWidth < 768;
}

function getThemeColors() {
  const isDark = document.body.classList.contains('dark');
  return {
    textMuted: isDark ? '#B8BCC4' : '#6B6B7D',
    cardBg: isDark ? '#111116' : '#F2F2F7',
    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
    dropdownBg: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)',
  };
}

function navigateToSection(index) {
  activeIndex = index;
  mobileMenuOpen = false;
  renderNavbar();
  renderMobileDropdown();
  
  const sectionIds = ['home-section', 'projects-section', 'skills-section', 'experience-section', 'contact-section'];
  const targetElement = document.getElementById(sectionIds[index]);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
}

function renderNavbar() {
  const container = document.getElementById('navbar-root');
  if (!container) return;
  
  const colors = getThemeColors();
  const compact = useCompactMode();
  const screenWidth = window.innerWidth;
  const isSmallScreen = screenWidth < 900;
  const isMediumScreen = screenWidth >= 768 && screenWidth < 1024;
  
  const logoSz = isSmallScreen ? '18px' : '20px';
  const themeBtnSize = isSmallScreen ? '32px' : '36px';
  const iconSize = isSmallScreen ? '16px' : '18px';
  
  const isDark = document.body.classList.contains('dark');
  const hamburgerColor = isDark ? '#FFFFFF' : '#0F0F14';
  
  let navbarHtml = '';
  
  if (compact) {
    navbarHtml = `
      <div class="navbar-wrapper">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px;">
          <div id="logo" style="font-family: 'Sora', sans-serif; font-size: ${logoSz}; font-weight: 400; cursor: pointer; background: linear-gradient(135deg, #6366F1, #A855F7, #EC4899); -webkit-background-clip: text; background-clip: text; color: transparent;">
            Meghana.
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div id="theme-toggle" style="width: ${themeBtnSize}; height: ${themeBtnSize}; border-radius: 50%; background: ${colors.cardBg}; border: 1px solid ${colors.borderColor}; display: flex; align-items: center; justify-content: center; cursor: pointer;">
              <img id="theme-icon" src="assets/icons/${themeManager.isDark ? 'moon-icon.svg' : 'sun-icon.svg'}" alt="theme" style="width: ${iconSize}; height: ${iconSize};">
            </div>
            <div id="hamburger-btn" style="width: ${isSmallScreen ? '32px' : '36px'}; height: ${isSmallScreen ? '32px' : '36px'}; display: flex; align-items: center; justify-content: center; cursor: pointer; background: ${colors.cardBg}; border: 1px solid ${colors.borderColor}; border-radius: 8px;">
              <img id="hamburger-icon" src="assets/icons/${mobileMenuOpen ? 'cross-icon.svg' : 'menu-icon.svg'}" alt="menu" style="width: ${iconSize}; height: ${iconSize}; filter: brightness(0) saturate(100%) ${isDark ? 'invert(100%)' : 'invert(0%)'}">
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    const chipFontSize = isMediumScreen ? '13px' : '15px';
    const chipPadding = isMediumScreen ? '6px 14px' : '6px 20px';
    const logoSpacing = isMediumScreen ? '12px' : '20px';
    const themeSpacing = isMediumScreen ? '8px' : '12px';
    const navPadding = isMediumScreen ? '8px 20px' : '10px 24px';
    
    const navChips = K.navItems.map((item, idx) => {
      const isActive = activeIndex === idx;
      return `
        <div class="nav-chip ${isActive ? 'active' : 'inactive'}" data-index="${idx}" style="padding: ${chipPadding}; ${isActive ? 'background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.3);' : ''}">
          <span style="font-family: 'DM Sans', sans-serif; font-size: ${chipFontSize}; ${isActive ? 'background: linear-gradient(135deg, #A855F7, #EC4899); -webkit-background-clip: text; background-clip: text; color: transparent; font-weight: 600;' : `color: ${colors.textMuted};`}">${item}</span>
        </div>
      `;
    }).join('');
    
    navbarHtml = `
      <div class="navbar-wrapper">
        <div style="display: flex; align-items: center; justify-content: center; padding: ${navPadding}; flex-wrap: nowrap;">
          <div id="logo" style="font-family: 'Sora', sans-serif; font-size: ${logoSz}; font-weight: 400; cursor: pointer; background: linear-gradient(135deg, #6366F1, #A855F7, #EC4899); -webkit-background-clip: text; background-clip: text; color: transparent; white-space: nowrap;">
            Meghana.
          </div>
          <div style="width: ${logoSpacing};"></div>
          <div style="display: flex; align-items: center; flex-wrap: nowrap;">
            ${navChips}
          </div>
          <div style="width: ${themeSpacing};"></div>
          <div id="theme-toggle" style="width: ${themeBtnSize}; height: ${themeBtnSize}; border-radius: 50%; background: ${colors.cardBg}; border: 1px solid ${colors.borderColor}; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;">
            <img id="theme-icon" src="assets/icons/${themeManager.isDark ? 'moon-icon.svg' : 'sun-icon.svg'}" alt="theme" style="width: ${iconSize}; height: ${iconSize};">
          </div>
        </div>
      </div>
    `;
  }
  
  container.innerHTML = navbarHtml;
  
  if (!compact) {
    document.querySelectorAll('.nav-chip').forEach(el => {
      const idx = parseInt(el.dataset.index);
      el.addEventListener('click', () => navigateToSection(idx));
      el.addEventListener('mouseenter', (e) => {
        if (activeIndex !== idx && !e.currentTarget.classList.contains('active')) {
          e.currentTarget.style.background = 'rgba(168,85,247,0.07)';
        }
      });
      el.addEventListener('mouseleave', (e) => {
        if (activeIndex !== idx && !e.currentTarget.classList.contains('active')) {
          e.currentTarget.style.background = 'transparent';
        }
      });
    });
  }
  
  document.getElementById('logo')?.addEventListener('click', () => navigateToSection(0));
  
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeManager.toggle();
      renderNavbar();
      if (mobileMenuOpen) renderMobileDropdown();
    });
  }
  
  if (compact) {
    const hamburger = document.getElementById('hamburger-btn');
    if (hamburger) {
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuOpen = !mobileMenuOpen;
        renderNavbar();
        if (mobileMenuOpen) {
          renderMobileDropdown();
        } else {
          renderMobileDropdown();
        }
      });
    }
  }
}

function renderMobileDropdown() {
  const container = document.getElementById('mobile-dropdown-root');
  if (!container) return;
  
  if (!mobileMenuOpen) {
    container.innerHTML = '';
    return;
  }
  
  const colors = getThemeColors();
  const isSmallScreen = window.innerWidth < 900;
  const fontSize = isSmallScreen ? '13px' : '14px';
  const horPad = isSmallScreen ? '16px' : '20px';
  const verPad = isSmallScreen ? '12px' : '14px';
  
  let itemsHtml = '';
  K.navItems.forEach((item, idx) => {
    const isActive = activeIndex === idx;
    itemsHtml += `
      <div class="mobile-nav-item" data-index="${idx}" style="padding: ${verPad} ${horPad}; cursor: pointer; transition: background 0.15s;">
        <div style="display: flex; align-items: center;">
          ${isActive ? `<div style="width: 6px; height: 6px; background: linear-gradient(135deg, #A855F7, #EC4899); border-radius: 50%; margin-right: 12px;"></div>` : `<div style="width: 18px; margin-right: 12px;"></div>`}
          ${isActive ? 
            `<span class="static-gradient-text" style="font-family: 'DM Sans', sans-serif; font-size: ${fontSize}; font-weight: 600;">${item}</span>` :
            `<span style="font-family: 'DM Sans', sans-serif; font-size: ${fontSize}; font-weight: 400; color: ${colors.textMuted};">${item}</span>`
          }
        </div>
      </div>
    `;
  });
  
  container.innerHTML = `
    <div class="mobile-dropdown-container">
      <div class="mobile-dropdown-inner mobile-dropdown-open" style="background: ${colors.dropdownBg}; border: 1px solid ${colors.borderColor};">
        <div style="display: flex; flex-direction: column;">
          ${itemsHtml}
        </div>
      </div>
    </div>
  `;
  
  document.querySelectorAll('.mobile-nav-item').forEach(el => {
    const idx = parseInt(el.dataset.index);
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenuOpen = false;
      navigateToSection(idx);
      renderNavbar();
      renderMobileDropdown();
    });
    el.addEventListener('mouseenter', (e) => {
      e.currentTarget.style.background = document.body.classList.contains('dark') ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.05)';
    });
    el.addEventListener('mouseleave', (e) => {
      e.currentTarget.style.background = 'transparent';
    });
  });
}

// Close dropdown when clicking outside
function setupClickOutsideListener() {
  document.addEventListener('click', (e) => {
    if (!mobileMenuOpen) return;
    
    const navbar = document.getElementById('navbar-container');
    const dropdown = document.getElementById('mobile-dropdown-root');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    
    const isClickInsideNavbar = navbar?.contains(e.target);
    const isClickInsideDropdown = dropdown?.contains(e.target);
    const isClickOnHamburger = hamburgerBtn?.contains(e.target);
    
    if (!isClickInsideNavbar && !isClickInsideDropdown && !isClickOnHamburger) {
      mobileMenuOpen = false;
      renderNavbar();
      renderMobileDropdown();
    }
  });
}

function setupNavbarScrollSpy() {
  const sections = [
    { id: 'home-section', index: 0 },
    { id: 'projects-section', index: 1 },
    { id: 'skills-section', index: 2 },
    { id: 'experience-section', index: 3 },
    { id: 'contact-section', index: 4 }
  ];
  
  const sectionElements = [];
  for (const s of sections) {
    const el = document.getElementById(s.id);
    if (el) sectionElements.push({ element: el, index: s.index });
  }
  
  function updateActiveSection() {
    const scrollPosition = window.scrollY + 120;
    
    for (let i = 0; i < sectionElements.length; i++) {
      const section = sectionElements[i];
      const sectionTop = section.element.offsetTop;
      const sectionBottom = sectionTop + section.element.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        if (section.index !== activeIndex) {
          activeIndex = section.index;
          renderNavbar();
          if (mobileMenuOpen) {
            renderMobileDropdown();
          }
        }
        break;
      }
    }
  }
  
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  setTimeout(updateActiveSection, 200);
}

function initNavbar() {
  const navbarContainer = document.getElementById('navbar-container');
  if (navbarContainer) {
    navbarContainer.classList.add('visible');
  }
  
  renderNavbar();
  setupNavbarScrollSpy();
  setupClickOutsideListener();
  
  window.addEventListener('resize', () => {
    renderNavbar();
    if (mobileMenuOpen) renderMobileDropdown();
  });
  
  themeManager.addListener(() => {
    renderNavbar();
    if (mobileMenuOpen) renderMobileDropdown();
  });
}