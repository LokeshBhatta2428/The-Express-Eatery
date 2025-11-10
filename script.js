// ===================================================================
// THE EXPRESS EATERY - CLEAN JAVASCRIPT WITH MENU NAVIGATION
// Author: Lokesh Bhatta
// Last Updated: 2025-11-10
// ===================================================================

// ===================================================================
// MAIN INITIALIZATION - Single DOMContentLoaded Event
// ===================================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('The Express Eatery initialized');
    
    // Initialize all components in order
    initNavbar();
    initMenuNavigation();
    initSmoothScroll();
    initLoadingAnimations();
});

// ===================================================================
// NAVBAR SCROLL EFFECT
// ===================================================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===================================================================
// MENU NAVIGATION FUNCTIONALITY
// ===================================================================
function initMenuNavigation() {
    const menuNavButtons = document.querySelectorAll('.menu-nav-btn');
    const menuSections = document.querySelectorAll('.detailed-menu-section');
    
    if (menuNavButtons.length === 0) return;
    
    console.log('Menu navigation initialized with', menuNavButtons.length, 'buttons');
    
    // Menu category filtering
    menuNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            menuNavButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            console.log('Filtering menu by category:', category);
            
            // Filter menu sections
            let visibleCount = 0;
            
            menuSections.forEach((section, index) => {
                const sectionCategory = section.getAttribute('data-category');
                
                // Check if section should be shown
                const shouldShow = category === 'all' || 
                                  sectionCategory === category ||
                                  (sectionCategory && sectionCategory.includes(category));
                
                if (shouldShow) {
                    visibleCount++;
                    section.style.display = 'block';
                    section.classList.remove('hidden');
                    
                    // Animate section appearance
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    section.classList.add('hidden');
                    
                    setTimeout(() => {
                        if (section.classList.contains('hidden')) {
                            section.style.display = 'none';
                        }
                    }, 300);
                }
            });
            
            console.log('Visible sections:', visibleCount);
            
            // Smooth scroll to first visible section
            setTimeout(() => {
                const firstVisible = Array.from(menuSections).find(
                    section => section.style.display !== 'none' && !section.classList.contains('hidden')
                );
                
                if (firstVisible) {
                    const yOffset = -100; // Offset for fixed navbar
                    const y = firstVisible.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                }
            }, 350);
        });
    });
    
    // Initialize with all items visible
    menuSections.forEach((section, index) => {
        section.style.transition = 'all 0.4s ease';
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({ 
                    top: 0, 
                    behavior: 'smooth' 
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const yOffset = -80; // Offset for fixed navbar
                    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    window.scrollTo({ 
                        top: y, 
                        behavior: 'smooth' 
                    });
                }
            }
        });
    });
}

// ===================================================================
// LOADING ANIMATIONS
// ===================================================================
function initLoadingAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for loading animation
    const elementsToObserve = document.querySelectorAll(
        '.detailed-menu-item, .momo-category, .menu-item-header, .section-title'
    );
    
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
}

// ===================================================================
// CSS ANIMATIONS
// ===================================================================
const style = document.createElement('style');
style.textContent = `
    /* Menu section transitions */
    .detailed-menu-section {
        transition: all 0.4s ease;
    }
    
    .detailed-menu-section.hidden {
        opacity: 0;
        transform: translateY(20px);
    }
    
    /* Fade in animation for scroll */
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Menu navigation button hover effects */
    .menu-nav-btn {
        transition: all 0.3s ease;
    }
    
    .menu-nav-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .menu-nav-btn.active {
        transform: translateY(-2px);
    }
    
    /* Menu item hover effects */
    .detailed-menu-item {
        transition: all 0.3s ease;
    }
    
    .detailed-menu-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    /* Momo item animations */
    .momo-item {
        transition: all 0.3s ease;
    }
    
    .momo-item:hover {
        background: rgba(0, 0, 0, 0.05);
        transform: translateX(5px);
    }
    
    /* Smooth scrolling for entire page */
    html {
        scroll-behavior: smooth;
    }
`;
document.head.appendChild(style);

// ===================================================================
// END OF SCRIPT
// ===================================================================
console.log('The Express Eatery script loaded successfully! 🍽️');

// ===================================================================
// GALLERY PAGE JAVASCRIPT - THE EXPRESS EATERY
// ===================================================================

// Gallery Images Data
const galleryImages = [];
let currentImageIndex = 0;

// Initialize Gallery
document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery initialized');
    
    // Initialize gallery functionality
    initGalleryFilters();
    initGalleryImages();
    initLightbox();
    animateStats();
});

// ===================================================================
// GALLERY FILTERS
// ===================================================================
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter gallery items
            let visibleCount = 0;
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    visibleCount++;
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    
                    // Stagger animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, index * 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    item.classList.add('hidden');
                    
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
            
            // Update total images count
            updateImageCount(visibleCount);
        });
    });
}

// ===================================================================
// GALLERY IMAGES INITIALIZATION
// ===================================================================
function initGalleryImages() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('.gallery-image img');
        const title = item.querySelector('.gallery-info h3').textContent;
        const description = item.querySelector('.gallery-info p').textContent;
        
        galleryImages.push({
            src: img.src,
            alt: img.alt,
            title: title,
            description: description
        });
        
        // Add animation on scroll
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, index * 100);
    });
    
    // Update total images
    document.getElementById('total-images').textContent = galleryImages.length;
}

// ===================================================================
// LIGHTBOX FUNCTIONALITY
// ===================================================================
function initLightbox() {
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    changeImage(-1);
                    break;
                case 'ArrowRight':
                    changeImage(1);
                    break;
            }
        }
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const currentImageSpan = document.getElementById('current-image');
    
    // Get visible items only
    const visibleItems = Array.from(document.querySelectorAll('.gallery-item'))
        .filter(item => !item.classList.contains('hidden') && item.style.display !== 'none');
    
    if (visibleItems.length === 0) return;
    
    // Find correct index in visible items
    const allItems = document.querySelectorAll('.gallery-item');
    const clickedItem = allItems[index];
    const visibleIndex = visibleItems.indexOf(clickedItem);
    
    if (visibleIndex === -1) return;
    
    currentImageIndex = visibleIndex;
    
    // Update lightbox content
    const imageData = galleryImages[index];
    lightboxImg.src = imageData.src;
    lightboxImg.alt = imageData.alt;
    lightboxTitle.textContent = imageData.title;
    lightboxDescription.textContent = imageData.description;
    currentImageSpan.textContent = visibleIndex + 1;
    
    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    const visibleItems = Array.from(document.querySelectorAll('.gallery-item'))
        .filter(item => !item.classList.contains('hidden') && item.style.display !== 'none');
    
    if (visibleItems.length === 0) return;
    
    currentImageIndex = (currentImageIndex + direction + visibleItems.length) % visibleItems.length;
    
    // Find actual index in all items
    const allItems = Array.from(document.querySelectorAll('.gallery-item'));
    const currentVisibleItem = visibleItems[currentImageIndex];
    const actualIndex = allItems.indexOf(currentVisibleItem);
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const currentImageSpan = document.getElementById('current-image');
    
    // Fade out
    lightboxImg.style.opacity = '0';
    
    setTimeout(() => {
        const imageData = galleryImages[actualIndex];
        lightboxImg.src = imageData.src;
        lightboxImg.alt = imageData.alt;
        lightboxTitle.textContent = imageData.title;
        lightboxDescription.textContent = imageData.description;
        currentImageSpan.textContent = currentImageIndex + 1;
        
        // Fade in
        lightboxImg.style.opacity = '1';
    }, 200);
}

// ===================================================================
// STATS ANIMATION
// ===================================================================
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateValue(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * easeOutQuad(progress));
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutQuad(t) {
    return t * (2 - t);
}

// ===================================================================
// UTILITY FUNCTIONS
// ===================================================================
function updateImageCount(count) {
    const totalImagesSpan = document.getElementById('totalImages');
    if (totalImagesSpan) {
        animateValue(totalImagesSpan, parseInt(totalImagesSpan.textContent), count, 500);
    }
}

// ===================================================================
// END OF GALLERY SCRIPT
// ===================================================================
console.log('Gallery script loaded successfully! 📸');