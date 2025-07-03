document.addEventListener('DOMContentLoaded', function() {
    // Initialize custom cursor for all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .collection, .slider-arrow, .slider-dot, .social-link');
    
    interactiveElements.forEach(element => {
        element.style.cursor = 'none';
    });
    
    // Gallery items modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('imageModal');
    const modalContent = imageModal.querySelector('.modal-content');
    const closeModal = imageModal.querySelector('.close-modal');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                const imgSrc = img.getAttribute('src');
                openImageModal(imgSrc);
            }
        });
    });
    
    function openImageModal(imgSrc) {
        // Create an image element if it doesn't exist yet
        let modalImage = modalContent.querySelector('.modal-image');
        if (!modalImage) {
            modalImage = document.createElement('img');
            modalImage.className = 'modal-image';
            modalContent.appendChild(modalImage);
        }
        
        // Set the image source
        modalImage.src = imgSrc;
        
        // Show the modal
        imageModal.classList.add('active');
    }
    
    // Close modal when clicking the close button or outside the modal content
    closeModal.addEventListener('click', closeImageModal);
    
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
    
    function closeImageModal() {
        imageModal.classList.remove('active');
    }
    
    // Add keyboard support for closing modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeImageModal();
        }
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
    
    // Featured video modal functionality
    const featuredVideo = document.querySelector('.featured-animation video');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = videoModal.querySelector('.modal-video');
    const modalVideoSource = modalVideo.querySelector('source');
    const closeVideoModal = videoModal.querySelector('.close-modal');
    
    // Featured video click functionality - if needed
    /* Uncomment if you want to make the featured video open in a modal
    featuredVideo.addEventListener('click', function() {
        const videoSrc = this.querySelector('source').getAttribute('src');
        openVideoModal(videoSrc);
    });
    */
    
    function openVideoModal(videoSrc) {
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
    
    closeVideoModal.addEventListener('click', closeVideoFunc);
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoFunc();
        }
    });
    
    function closeVideoFunc() {
        videoModal.classList.remove('active');
        modalVideo.pause();
        // Clear the source after a delay to prevent the video from playing in the background
        setTimeout(() => {
            modalVideoSource.src = '';
            modalVideo.load();
        }, 300);
    }
    
    // Logo animations
    if (typeof initLogoAnimations === 'function') {
        // Custom configuration for ASTERIN JOY logo
        const logoConfig = {
            text: [
                { text: "ASTERIN", chars: 7 },
                { text: "JOY", chars: 3 }
            ],
            colorPatterns: [
                ["red", "turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise", "pink", "red"],
                ["pink", "red", "turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise", "pink"],
                ["turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise"],
                ["red", "turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise", "pink", "red"],
                ["pink", "red", "turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise", "pink"],
                ["turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise"]
            ]
        };
        
        initLogoAnimations(logoConfig);
    }
    
    // Header transparency on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.pageYOffset > 100) {
            header.style.backgroundColor = 'rgba(17, 17, 17, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.backgroundColor = 'rgba(17, 17, 17, 0.7)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
    });
});
