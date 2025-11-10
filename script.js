document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialized');
    
    // Initialize all components in order
    initThemeToggle();
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initTypewriter();
    initProjectFiltering();
    initGalleryFiltering();
    initGalleryLightbox();
    initCertificationFiltering();
    initCertificateModal();
    initContactForm();
    initLoadingAnimations();
    initParticles();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
    
    // Contact form input enhancements
    initFormInputAnimations();
});

// ===================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===================================================================
// THEME TOGGLE FUNCTIONALITY
// ===================================================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const body = document.body;
    
    if (!themeToggle && !mobileThemeToggle) return;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            updateToggleState(true);
        } else {
            body.classList.remove('dark-mode');
            updateToggleState(false);
        }
        localStorage.setItem('theme', theme);
    }
    
    function updateToggleState(isDark) {
        const toggles = [themeToggle, mobileThemeToggle].filter(Boolean);
        
        toggles.forEach(toggle => {
            const icon = toggle.querySelector('.theme-toggle-icon');
            if (!icon) return;
            
            if (isDark) {
                toggle.classList.add('active');
                icon.className = 'theme-toggle-icon fas fa-moon';
            } else {
                toggle.classList.remove('active');
                icon.className = 'theme-toggle-icon fas fa-sun';
            }
        });
    }
    
    function toggleTheme() {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.style.transition = 'all 0.3s ease';
        setTheme(newTheme);
        
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
        
        showThemeNotification(newTheme);
    }
    
    // Event listeners
    themeToggle?.addEventListener('click', toggleTheme);
    mobileThemeToggle?.addEventListener('click', toggleTheme);
    
    // Keyboard support
    [themeToggle, mobileThemeToggle].forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        }
    });
}

// Show theme change notification
function showThemeNotification(theme) {
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
