class ThemeManager {
  constructor() {
    this.isDark = true;
    this.listeners = [];
  }
  
  load() {
    const saved = localStorage.getItem('themeMode');
    this.isDark = saved !== 'light';
    this.applyTheme();
  }
  
  applyTheme() {
    if (this.isDark) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
    document.body.style.backgroundColor = this.isDark ? '#050507' : '#FFFFFF';
    this.notifyListeners();
  }
  
  toggle() {
    this.isDark = !this.isDark;
    this.applyTheme();
    localStorage.setItem('themeMode', this.isDark ? 'dark' : 'light');
  }
  
  addListener(callback) {
    this.listeners.push(callback);
  }
  
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.isDark));
  }
}

const themeManager = new ThemeManager();