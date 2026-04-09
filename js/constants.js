const K = {
  name: 'Meghana',
  role: 'Flutter Developer',
  bio: 'Passionate Flutter developer crafting beautiful, fast and scalable cross-platform applications. I love building elegant user experiences and solving complex problems with clean, maintainable code.',
  github: 'https://github.com/im-meghana',
  linkedin: 'https://www.linkedin.com/in/meghana-v03/',
  email: 'meghana16.atwork@gmail.com',
  location: 'Bengaluru, Karnataka, India',
  cvUrl: 'assets/meghana_CV.pdf',
  
  titles: ['Flutter Developer', 'Cross Platform Developer', 'UI / UX Designer', 'App Developer', 'Software Engineer'],
  navItems: ['Home', 'Projects', 'Skills', 'Experience', 'Contact'],
  
  breakpoints: {
    mobile: 600,
    tablet: 768,
    desktop: 1024,
  },
  
  layoutModes: {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop'
  },
  
  accentPurple: '#A855F7',
  accentPink: '#EC4899',
  accentBlue: '#6366F1',
  accentGrad: 'linear-gradient(135deg, #A855F7, #EC4899)',
  accentGrad2: 'linear-gradient(135deg, #6366F1, #A855F7)',
  accentGradFull: 'linear-gradient(135deg, #6366F1, #A855F7, #EC4899)',
};

const Responsive = {
  getLayoutMode: () => {
    const width = window.innerWidth;
    if (width < K.breakpoints.mobile) return K.layoutModes.MOBILE;
    if (width < K.breakpoints.desktop) return K.layoutModes.TABLET;
    return K.layoutModes.DESKTOP;
  },
  
  isDesktop: () => {
    return window.innerWidth >= K.breakpoints.tablet;
  },
  
  isMobile: () => {
    return window.innerWidth < K.breakpoints.mobile;
  },
  
  isTablet: () => {
    return window.innerWidth >= K.breakpoints.tablet && window.innerWidth < K.breakpoints.desktop;
  },
  
  fluidFontSize: (min, max) => {
    const w = window.innerWidth;
    const minW = K.breakpoints.mobile;
    const maxW = K.breakpoints.desktop;
    const t = Math.min(Math.max((w - minW) / (maxW - minW), 0), 1);
    return min + (max - min) * t;
  },
  
  getSectionPadding: () => {
    const width = window.innerWidth;
    if (width < K.breakpoints.mobile) return '80px 20px 40px 20px';
    if (width < K.breakpoints.desktop) return '80px 40px 40px 40px';
    return '80px 80px 40px 80px';
  },
  
  getContainerMaxWidth: () => {
    const width = window.innerWidth;
    if (width < K.breakpoints.desktop) return '100%';
    return '1200px';
  }
};