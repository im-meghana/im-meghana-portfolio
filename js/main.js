function hideLoaderAndShowContent() {
  const loader = document.getElementById('loader');
  const navbarContainer = document.getElementById('navbar-container');
  const mainContent = document.getElementById('main-content');
  
  if (loader) {
    loader.classList.add('loader-hide');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 400);
  }
  
  if (navbarContainer) {
    navbarContainer.classList.add('visible');
  }
  
  if (mainContent) {
    mainContent.classList.add('visible');
  }
}

function setupScrollSpy() {
  const sections = [
    { id: 'home-section', index: 0 },
    { id: 'projects-section', index: 1 },
    { id: 'skills-section', index: 2 },
    { id: 'experience-section', index: 3 },
    { id: 'contact-section', index: 4 }
  ];
  
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const section = sections.find(s => s.id === entry.target.id);
        if (section && typeof activeIndex !== 'undefined' && section.index !== activeIndex) {
          activeIndex = section.index;
          if (typeof renderNavbar === 'function') renderNavbar();
        }
      }
    }
  }, { threshold: 0.4, rootMargin: '-20% 0px -30% 0px' });
  
  sections.forEach(section => {
    const element = document.getElementById(section.id);
    if (element) observer.observe(element);
  });
}

let resizeTimer;
function handleGlobalResize() {
  if (resizeTimer) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (typeof renderNavbar === 'function') renderNavbar();
    if (typeof renderHomeContent === 'function') renderHomeContent();
    if (typeof renderProjectsSection === 'function') renderProjectsSection();
  }, 100);
}

let scrollTopVisible = false;
let scrollTopTimer = null;

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function checkScrollPosition() {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  const shouldShow = scrollPosition > 300;
  const button = document.getElementById('scroll-to-top');
  
  if (shouldShow !== scrollTopVisible) {
    scrollTopVisible = shouldShow;
    if (button) {
      if (scrollTopVisible) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
    }
  }
}

function renderScrollToTop() {
  const container = document.getElementById('scroll-to-top-root');
  if (!container) return;
  
  const buttonHtml = `
    <div id="scroll-to-top" class="scroll-to-top">
      <button class="scroll-to-top-button" id="scroll-top-btn" aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </div>
  `;
  
  container.innerHTML = buttonHtml;
  
  const btn = document.getElementById('scroll-top-btn');
  if (btn) {
    btn.addEventListener('click', scrollToTop);
  }
}

function initScrollToTop() {
  renderScrollToTop();
  setTimeout(checkScrollPosition, 100);
  window.addEventListener('scroll', () => {
    if (scrollTopTimer) clearTimeout(scrollTopTimer);
    scrollTopTimer = setTimeout(checkScrollPosition, 50);
  });
}

function init() {
  console.log('Initializing portfolio...');
  
  if (typeof themeManager !== 'undefined' && themeManager.load) {
    themeManager.load();
  } else {
    const saved = localStorage.getItem('themeMode');
    if (saved === 'light') {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }
  
  if (typeof initNavbar === 'function') {
    initNavbar();
  }
  
  setTimeout(() => {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
      navbarContainer.classList.add('visible');
    }
  }, 50);
  
  if (typeof renderHomeContent === 'function') {
    renderHomeContent();
  }
  
  if (typeof renderProjectsSection === 'function') {
    renderProjectsSection();
  }
  
  if (typeof renderProjectsHeader === 'function') {
    renderProjectsHeader();
  }
  
  initScrollToTop();
  
  window.addEventListener('resize', handleGlobalResize);
  
  if (typeof themeManager !== 'undefined' && themeManager.addListener) {
    themeManager.addListener(() => {
      if (typeof renderNavbar === 'function') renderNavbar();
      if (typeof renderHomeContent === 'function') renderHomeContent();
      if (typeof renderProjectsSection === 'function') renderProjectsSection();
    });
  }
  
  setTimeout(hideLoaderAndShowContent, 1200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}