// ==============================================
// MOBILE SCRIPTS - mobile-scripts.js
// Include this file in all your HTML pages
// ==============================================

// TOUCH DEVICE DETECTION
function isTouchDevice() {
    return (('ontouchstart' in window) || 
            (navigator.maxTouchPoints > 0) || 
            (navigator.msMaxTouchPoints > 0));
}

// MAIN MOBILE INITIALIZATION
document.addEventListener('DOMContentLoaded', function() {
    if (isTouchDevice()) {
        console.log('Touch device detected - applying mobile optimizations');
        
        // Initialize all mobile features
        disableCustomCursor();
        makeOverlaysAlwaysVisible();
        improveMobileVideoHandling();
        addSwipeGestures();
        improveMobileModals();
        optimizeForMobile();
        implementLazyLoading();
        preventDoubleZoom();
        initAutoHideHeader(); // Add auto-hiding header
    }
});

// 1. DISABLE CUSTOM CURSOR ON TOUCH DEVICES
function disableCustomCursor() {
    // Hide cursor elements
    const cursors = document.querySelectorAll('.cursor-dot, .cursor-camera');
    cursors.forEach(cursor => {
        if (cursor) cursor.style.display = 'none';
    });
    
    // Add CSS to reset cursor for all elements
    const style = document.createElement('style');
    style.textContent = '* { cursor: auto !important; }';
    document.head.appendChild(style);
    
    console.log('Custom cursor disabled for touch device');
}

// 2. MAKE GALLERY OVERLAYS ALWAYS VISIBLE ON MOBILE
function makeOverlaysAlwaysVisible() {
    const overlays = document.querySelectorAll('.gallery-overlay, .gallery-info, .process-overlay');
    overlays.forEach(overlay => {
        overlay.style.transform = 'translateY(0)';
        overlay.style.opacity = '1';
    });
    
    console.log('Gallery overlays made always visible on mobile');
}

// 3. IMPROVE MOBILE VIDEO HANDLING
function improveMobileVideoHandling() {
    // Make play buttons always visible on mobile
    const playButtons = document.querySelectorAll('.timeline-play-btn, .slide-play-button, .featured-play-button');
    playButtons.forEach(btn => {
        btn.style.opacity = '1';
    });
    
    // Add touch-friendly video controls
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.setAttribute('playsinline', ''); // Prevent fullscreen on iOS
        video.setAttribute('preload', 'metadata'); // Faster loading
        video.setAttribute('controls', ''); // Ensure controls are visible
        
        // Add mobile-specific styling
        video.style.width = '100%';
        video.style.height = 'auto';
    });
    
    console.log('Video handling optimized for mobile');
}

// 4. ADD SWIPE GESTURES FOR SLIDERS
function addSwipeGestures() {
    const sliders = document.querySelectorAll('.storyboard-slider, .slideshow-container');
    
    sliders.forEach(slider => {
        let startX = null;
        let startY = null;
        let isScrolling = false;
        
        slider.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = false;
        }, { passive: true });
        
        slider.addEventListener('touchmove', function(e) {
            if (!startX || !startY) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            // Determine if user is scrolling vertically or swiping horizontally
            if (Math.abs(diffY) > Math.abs(diffX)) {
                isScrolling = true;
            } else if (Math.abs(diffX) > Math.abs(diffY) && !isScrolling) {
                // Prevent vertical scrolling while swiping horizontally
                e.preventDefault();
            }
        }, { passive: false });
        
        slider.addEventListener('touchend', function(e) {
            if (!startX || !startY || isScrolling) {
                startX = null;
                startY = null;
                return;
            }
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            // Swipe threshold (minimum distance for swipe)
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next
                    const nextBtn = slider.querySelector('.slider-arrow.next, .slide-next');
                    if (nextBtn) nextBtn.click();
                } else {
                    // Swipe right - previous
                    const prevBtn = slider.querySelector('.slider-arrow.prev, .slide-prev');
                    if (prevBtn) prevBtn.click();
                }
            }
            
            startX = null;
            startY = null;
        }, { passive: true });
    });
    
    console.log('Swipe gestures added to sliders');
}

// 5. IMPROVE MODAL HANDLING ON MOBILE
function improveMobileModals() {
    const modals = document.querySelectorAll('.modal, .video-modal');
    
    modals.forEach(modal => {
        // Close modal when tapping outside on mobile
        modal.addEventListener('touchend', function(e) {
            if (e.target === modal) {
                const video = modal.querySelector('video');
                if (video) video.pause();
                modal.classList.remove('active');
            }
        }, { passive: true });
        
        // Prevent body scroll when modal is open
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (modal.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                        document.body.style.position = 'fixed';
                        document.body.style.width = '100%';
                    } else {
                        document.body.style.overflow = '';
                        document.body.style.position = '';
                        document.body.style.width = '';
                    }
                }
            });
        });
        observer.observe(modal, { attributes: true });
    });
    
    console.log('Modal handling improved for mobile');
}

// 6. OPTIMIZE ANIMATIONS FOR MOBILE PERFORMANCE
function optimizeForMobile() {
    // Disable expensive animations on mobile
    const style = document.createElement('style');
    style.textContent = `
        .shape { 
            animation: none !important; 
        }
        * { 
            transition-duration: 0.2s !important; 
        }
        .gallery-item:hover img,
        .tab-item:hover img,
        .collection:hover img { 
            transform: scale(1.02) !important; 
        }
        .gallery-item img,
        .tab-item img,
        .collection img {
            transition: transform 0.2s ease !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Animations optimized for mobile performance');
}

// 7. LAZY LOADING IMPLEMENTATION
function implementLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        
        console.log('Lazy loading implemented');
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// 8. PREVENT ZOOM ON DOUBLE TAP (iOS)
function preventDoubleZoom() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
    
    console.log('Double-tap zoom prevention enabled');
}

// 9. HANDLE ORIENTATION CHANGES
window.addEventListener('orientationchange', function() {
    // Refresh layout after orientation change
    setTimeout(function() {
        window.dispatchEvent(new Event('resize'));
        
        // Recalculate any slider positions
        const sliders = document.querySelectorAll('.storyboard-track, .slides-track');
        sliders.forEach(slider => {
            // Trigger any existing slider update functions
            if (typeof updateSlider === 'function') {
                updateSlider();
            }
            if (typeof updateSlidePosition === 'function') {
                updateSlidePosition();
            }
        });
    }, 100);
});

// 10. IMPROVE TOUCH SCROLLING
function improveTouchScrolling() {
    // Add momentum scrolling for iOS
    const scrollableElements = document.querySelectorAll('.gallery-masonry, .tab-gallery, .social-container');
    scrollableElements.forEach(element => {
        element.style.webkitOverflowScrolling = 'touch';
    });
}

// 11. MOBILE-SPECIFIC VIDEO MODAL IMPROVEMENTS
function enhanceVideoModals() {
    // Create or enhance existing video modal functionality
    const videoTriggers = document.querySelectorAll('[data-video], .video-thumbnail, .slide-thumbnail, .featured-video-thumbnail');
    
    videoTriggers.forEach(trigger => {
        trigger.addEventListener('touchend', function(e) {
            e.preventDefault();
            
            // Get video source
            let videoSrc = this.dataset.video;
            if (!videoSrc) {
                const videoElement = this.closest('.video-item, .video-slide, .featured-video-wrapper')?.querySelector('video source');
                videoSrc = videoElement?.src;
            }
            
            if (videoSrc) {
                openMobileVideoModal(videoSrc);
            }
        }, { passive: false });
    });
}

// 12. MOBILE VIDEO MODAL FUNCTION
function openMobileVideoModal(videoSrc) {
    // Remove any existing mobile video modal
    const existingModal = document.getElementById('mobileVideoModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create mobile-optimized video modal
    const modal = document.createElement('div');
    modal.id = 'mobileVideoModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 1rem;
    `;
    
    const videoContainer = document.createElement('div');
    videoContainer.style.cssText = `
        width: 100%;
        max-width: 100%;
        position: relative;
        background: #000;
        border-radius: 8px;
        overflow: hidden;
    `;
    
    const video = document.createElement('video');
    video.style.cssText = `
        width: 100%;
        height: auto;
        display: block;
    `;
    video.controls = true;
    video.playsinline = true;
    video.autoplay = true;
    video.src = videoSrc;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        width: 44px;
        height: 44px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        z-index: 10001;
    `;
    
    closeBtn.addEventListener('click', function() {
        video.pause();
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            video.pause();
            modal.remove();
        }
    });
    
    videoContainer.appendChild(video);
    videoContainer.appendChild(closeBtn);
    modal.appendChild(videoContainer);
    document.body.appendChild(modal);
}

// 13. IMPROVE FILTER AND TAB FUNCTIONALITY ON MOBILE
function enhanceMobileFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn, .tab-btn, .filter-button');
    
    filterButtons.forEach(button => {
        // Add visual feedback for touch
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });
}

// 14. INITIALIZE MOBILE ENHANCEMENTS
document.addEventListener('DOMContentLoaded', function() {
    if (isTouchDevice()) {
        enhanceVideoModals();
        enhanceMobileFilters();
        improveTouchScrolling();
        
        // Add mobile class to body for CSS targeting
        document.body.classList.add('mobile-device');
        
        console.log('All mobile enhancements initialized');
    }
});

// 16. AUTO-HIDING HEADER ON SCROLL
function initAutoHideHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past 100px - hide header
            header.classList.add('header-hidden');
        } else if (scrollTop < lastScrollTop || scrollTop <= 100) {
            // Scrolling up or at top - show header
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Show header on touch start (mobile UX improvement)
    document.addEventListener('touchstart', function() {
        header.classList.remove('header-hidden');
    }, { passive: true });
    
    console.log('Auto-hiding header initialized');
}

// 17. IMPROVED GALLERY TOUCH INTERACTIONS
function enhanceGalleryTouchInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item, .tab-item, .collection');
    
    galleryItems.forEach(item => {
        let touchStartTime = 0;
        let touchStartY = 0;
        
        item.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
            touchStartY = e.touches[0].clientY;
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        item.addEventListener('touchend', function(e) {
            const touchEndTime = Date.now();
            const touchEndY = e.changedTouches[0].clientY;
            const touchDuration = touchEndTime - touchStartTime;
            const touchDistance = Math.abs(touchEndY - touchStartY);
            
            this.style.transform = 'scale(1)';
            
            // Only trigger click if it was a short tap (not a scroll)
            if (touchDuration < 300 && touchDistance < 10) {
                // This is a tap, not a scroll
                this.click();
            }
        }, { passive: true });
        
        item.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });
}

// Initialize performance monitoring
monitorMobilePerformance();

// EXPORT FUNCTIONS FOR USE IN OTHER SCRIPTS
window.MobileUtils = {
    isTouchDevice,
    disableCustomCursor,
    makeOverlaysAlwaysVisible,
    improveMobileVideoHandling,
    openMobileVideoModal
};