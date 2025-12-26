// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = 'default';
        this.init();
    }

    init() {
        // Set current year in footer
        this.updateYear();
        
        // Load saved theme from localStorage
        this.loadTheme();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Add entrance animation
        this.animateEntrance();
    }

    updateYear() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('maplehilltech-theme');
        if (savedTheme) {
            this.applyTheme(savedTheme);
        }
    }

    saveTheme(theme) {
        localStorage.setItem('maplehilltech-theme', theme);
    }

    applyTheme(theme) {
        const body = document.body;
        
        // Remove all theme classes
        body.classList.remove('theme-alternate');
        
        // Apply new theme
        if (theme === 'alternate') {
            body.classList.add('theme-alternate');
        }
        
        this.currentTheme = theme;
        this.saveTheme(theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'default' ? 'alternate' : 'default';
        this.applyTheme(newTheme);
        
        // Add a little feedback animation
        this.triggerFeedback();
    }

    triggerFeedback() {
        const container = document.querySelector('.container');
        if (container) {
            container.style.animation = 'none';
            setTimeout(() => {
                container.style.animation = 'themeSwitch 0.3s ease';
            }, 10);
        }
    }

    setupEventListeners() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Keyboard shortcut for theme toggle (T key)
        document.addEventListener('keydown', (e) => {
            if (e.key === 't' || e.key === 'T') {
                this.toggleTheme();
            }
        });
    }

    animateEntrance() {
        const container = document.querySelector('.container');
        if (container) {
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, 100);
        }
    }
}

// Additional effects
class EffectsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupCursorEffect();
        this.setupTypingEffect();
    }

    setupCursorEffect() {
        // Create a custom cursor trail effect on mouse move
        // Throttled to prevent excessive DOM manipulation
        let timeout;
        let lastCall = 0;
        const throttleDelay = 100; // milliseconds
        
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastCall < throttleDelay) {
                return;
            }
            lastCall = now;
            this.createCursorTrail(e.clientX, e.clientY);
        });
    }

    createCursorTrail(x, y) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.background = 'var(--color-primary)';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '998';
        trail.style.opacity = '0.6';
        trail.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(2)';
        }, 10);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 500);
    }

    setupTypingEffect() {
        // Add a subtle typing effect to the status text
        const statusText = document.querySelector('.status-text');
        if (statusText) {
            const originalText = statusText.textContent;
            statusText.textContent = '';
            
            let index = 0;
            const typingInterval = setInterval(() => {
                if (index < originalText.length) {
                    statusText.textContent += originalText[index];
                    index++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 100);
        }
    }
}

// Add theme switch animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes themeSwitch {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(style);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    const effectsManager = new EffectsManager();
    
    // Log initialization for debugging
    console.log('%c MAPLE HILL TECH ', 'background: #00ff9f; color: #0a0e27; font-size: 16px; font-weight: bold; padding: 4px 8px;');
    console.log('%c System initialized successfully ', 'background: #0a0e27; color: #00ff9f; font-size: 12px; padding: 2px 4px;');
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, EffectsManager };
}
