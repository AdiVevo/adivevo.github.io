document.addEventListener('DOMContentLoaded', function() {
    // =======================================
    // FOOTER FUNCTIONALITY
    // =======================================
    // Run on load and on window resize
    function adjustAnimationSpeed() {
        // This function was called but not defined in your original code
        // Adding empty implementation to prevent errors
        console.log("Adjusting animation speed based on screen width");
    }
    
    window.addEventListener('load', adjustAnimationSpeed);
    window.addEventListener('resize', adjustAnimationSpeed);
    
    // =======================================
    // VIDEO MODAL FUNCTIONALITY
    // =======================================
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.querySelector('.modal-video');
    const modalVideoSource = modalVideo.querySelector('source');
    const closeModal = document.querySelector('.close-modal');
    
    // Timeline Video Functionality
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const videoSrc = item.getAttribute('data-video');
        const playButton = item.querySelector('.timeline-play-btn');
        const mediaArea = item.querySelector('.timeline-media');
        
        if (playButton) {
            playButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
                openVideoModal(videoSrc);
            });
        }
        
        if (mediaArea) {
            mediaArea.addEventListener('click', function() {
                openVideoModal(videoSrc);
            });
        }
        
        // Also make the entire timeline content clickable for better UX
        const timelineContent = item.querySelector('.timeline-content');
        if (timelineContent) {
            timelineContent.addEventListener('click', function() {
                openVideoModal(videoSrc);
            });
        }
    });
    
    // Video Wall Functionality
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        const videoSrc = item.getAttribute('data-video');
        
        // Fix for paths that might have incorrect spacing or structure
        let correctedVideoSrc = videoSrc;
        
        // Fix the common path error in your HTML
        if (videoSrc && videoSrc.includes('Stop Motion Animation/')) {
            correctedVideoSrc = videoSrc.replace('Stop Motion Animation/', 'StopMotionAnimation/');
        }
        
        item.addEventListener('click', function() {
            openVideoModal(correctedVideoSrc);
        });
        
        // Add specific event listener to the play button for better UX
        const playButton = item.querySelector('.play-button');
        if (playButton) {
            playButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
                openVideoModal(correctedVideoSrc);
            });
        }
        
        // Add specific event listener to the thumbnail for better UX
        const thumbnail = item.querySelector('.video-thumbnail');
        if (thumbnail) {
            thumbnail.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
                openVideoModal(correctedVideoSrc);
            });
        }
    });
    
    // Function to open video modal
    function openVideoModal(videoSrc) {
        console.log("Opening modal with video:", videoSrc);
        
        if (!videoSrc) {
            console.error("No video source provided!");
            return;
        }
        
        // Set the source
        modalVideoSource.src = videoSrc;
        modalVideo.load();
        
        // Show the modal
        videoModal.classList.add('active');
        
        // Auto play video when modal opens
        setTimeout(() => {
            modalVideo.play().catch(error => {
                console.error("Error playing video:", error);
            });
        }, 300);
    }
    
    // Close modal when clicking the close button or outside the modal content
    closeModal.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Function to close the video modal
    function closeVideoModal() {
        videoModal.classList.remove('active');
        modalVideo.pause();
        // Clear the source after a delay to prevent the video from playing in the background
        setTimeout(() => {
            modalVideoSource.src = '';
            modalVideo.load();
        }, 300);
    }
    
    // =======================================
    // PARALLAX SCROLLING EFFECT
    // =======================================
    const parallaxBackground = document.querySelector('.parallax-background');
    
    window.addEventListener('scroll', function() {
        // Calculate how far the user has scrolled down the page
        const scrollPosition = window.pageYOffset;
        
        // Get the position of the parallax container
        const parallaxContainer = document.querySelector('.parallax-container');
        if (!parallaxContainer || !parallaxBackground) return;
        
        const parallaxPosition = parallaxContainer.offsetTop;
        
        // Calculate the relative scroll position to the parallax container
        const relativePosition = scrollPosition - parallaxPosition;
        
        // Apply the parallax effect if the container is in view
        if (scrollPosition + window.innerHeight > parallaxPosition && 
            scrollPosition < parallaxPosition + parallaxContainer.offsetHeight) {
            // Move the background at a slower rate than the scroll speed
            parallaxBackground.style.transform = `translateY(${relativePosition * 0.5}px)`;
        }
    });
    
    // =======================================
    // BONUS: HEADER TRANSPARENCY ON SCROLL
    // =======================================
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.style.backgroundColor = 'rgba(17, 17, 17, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(17, 17, 17, 0.7)';
        }
    });
    
    // Initialize hover effects for video thumbnails
    document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('mouseenter', () => {
            const playButton = thumbnail.querySelector('.play-button');
            if (playButton) {
                playButton.style.opacity = '1';
            }
        });
        
        thumbnail.addEventListener('mouseleave', () => {
            const playButton = thumbnail.querySelector('.play-button');
            if (playButton) {
                playButton.style.opacity = '0';
            }
        });
    });
    
    // Initialize hover effects for timeline media
    document.querySelectorAll('.timeline-media').forEach(media => {
        media.addEventListener('mouseenter', () => {
            const playButton = media.querySelector('.timeline-play-btn');
            if (playButton) {
                playButton.style.opacity = '1';
            }
        });
        
        media.addEventListener('mouseleave', () => {
            const playButton = media.querySelector('.timeline-play-btn');
            if (playButton) {
                playButton.style.opacity = '0';
            }
        });
    });
    
    // Trigger scroll event on load to initialize positions
    window.dispatchEvent(new Event('scroll'));
});

// Custom cursor functionality
const cursorDot = document.querySelector('.cursor-dot');
const cursorCamera = document.querySelector('.cursor-camera');
let mouseX = 0;
let mouseY = 0;
let dotX = 0;
let dotY = 0;
let cameraX = 0;
let cameraY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth animation for cursor movement
function animateCursor() {
    // Smooth follow for the dot (fast)
    dotX += (mouseX - dotX) * 0.8;
    dotY += (mouseY - dotY) * 0.8;

    // Slower follow for the camera (delayed effect)
    cameraX += (mouseX - cameraX) * 0.12;
    cameraY += (mouseY - cameraY) * 0.12;

    // Apply positions
    if (cursorDot) {
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
    }
    
    if (cursorCamera) {
        cursorCamera.style.left = `${cameraX}px`;
        cursorCamera.style.top = `${cameraY}px`;
    }

    requestAnimationFrame(animateCursor);
}

// Only start the cursor animation if both cursor elements exist
if (cursorDot && cursorCamera) {
    animateCursor();

    // Click effects
    document.addEventListener('mousedown', () => {
        cursorDot.classList.add('click');
        cursorCamera.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursorDot.classList.remove('click');
        cursorCamera.classList.remove('click');
    });

    // Hide cursor when mouse leaves the page
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorCamera.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorCamera.style.opacity = '1';
    });

    // Make sure cursor is hidden on clickable elements
    const interactiveElements = document.querySelectorAll('a, button, .video-thumbnail, .timeline-media, .process-item, .slider-arrow, .slider-dot, .frame-thumbnail, .frame-control-button, .frame-slider');

    interactiveElements.forEach(element => {
        element.style.cursor = 'none';
    });
}
