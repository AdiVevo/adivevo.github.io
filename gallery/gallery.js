document.addEventListener('DOMContentLoaded', function() {
    // Randomize all gallery images on page load
    randomizeGalleryImages();
    
    // Initialize animated shapes in hero section
    initHeroAnimations();
    
    // Initialize the gallery filtering system
    initGalleryFilter();
    
    // Initialize the collection tabs
    initCollectionTabs();
    
    // Initialize video functionality
    initVideoFunctionality();
    
    // Initialize video slideshow
    initVideoSlideshow();
    
    // Trigger scroll event on load to initialize positions
    window.dispatchEvent(new Event('scroll'));
});

// Fisher-Yates (Knuth) shuffle algorithm to randomize array items
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Randomize Gallery Images
function randomizeGalleryImages() {
    // Randomize main gallery
    randomizeChildrenOrder('.gallery-masonry');
    
    // Randomize each tab gallery
    document.querySelectorAll('.tab-gallery').forEach(gallery => {
        randomizeChildrenOrder(gallery);
    });
    
    console.log('Gallery images have been randomized!');
}

// Helper function to randomize the order of child elements
function randomizeChildrenOrder(containerSelector) {
    const container = typeof containerSelector === 'string' ? 
        document.querySelector(containerSelector) : containerSelector;
    
    if (!container) return;
    
    // Get all gallery items in the container
    const items = Array.from(container.children);
    
    // Shuffle the items array
    const shuffledItems = shuffleArray([...items]);
    
    // Re-append items in the new shuffled order
    shuffledItems.forEach(item => {
        container.appendChild(item);
    });
}

// Hero Section Animations
function initHeroAnimations() {
    const shapes = document.querySelectorAll('.shape');
    
    // Add random delay to each shape for a more organic feel
    shapes.forEach(shape => {
        const randomDelay = Math.random() * 5;
        shape.style.animationDelay = `${randomDelay}s`;
    });
    
    // Optional: Add parallax effect on mouse move
    const heroSection = document.querySelector('.dynamic-hero');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
            
            shapes.forEach((shape, index) => {
                // Different movement amount for each shape to create depth
                const factor = (index + 1) * 0.2;
                shape.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
            });
        });
        
        // Reset position when mouse leaves
        heroSection.addEventListener('mouseleave', function() {
            shapes.forEach(shape => {
                shape.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// Initialize all video functionality (for both featured and slideshow videos)
function initVideoFunctionality() {
    // Create video modal if it doesn't exist
    createVideoModal();
    
    // Set up event handlers for featured video
    setupFeaturedVideo();
    
    // Set up event handlers for all video thumbnails
    setupVideoThumbnails();
}

// Create video modal if it doesn't exist
function createVideoModal() {
    if (document.getElementById('videoModal')) return;
    
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.id = 'videoModal';
    
    videoModal.innerHTML = `
        <div class="video-modal-content">
            <div class="close-video-modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="video-container">
                <video id="modalVideo" controls>
                    <source src="" type="">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="video-modal-info">
                <h3 id="modalVideoTitle"></h3>
                <p id="modalVideoMeta"></p>
            </div>
        </div>
    `;
    
    document.body.appendChild(videoModal);
    
    // Set up modal event listeners (only once)
    const closeBtn = videoModal.querySelector('.close-video-modal');
    closeBtn.addEventListener('click', closeVideoModal);
    
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}

// Setup featured video click handlers
function setupFeaturedVideo() {
    const featuredVideoWrapper = document.querySelector('.featured-video-wrapper');
    const featuredThumbnail = document.querySelector('.featured-video-thumbnail');
    const featuredPlayButton = document.querySelector('.featured-play-button');
    const watchButton = document.querySelector('.watch-button');
    
    if (!featuredVideoWrapper) return;
    
    // Function to play the featured video
    function playFeaturedVideo(e) {
        // Prevent the event from bubbling up
        e.stopPropagation();
        
        const hiddenVideo = featuredVideoWrapper.querySelector('.hidden-video');
        const source = hiddenVideo ? hiddenVideo.querySelector('source') : null;
        
        if (!source) return;
        
        const title = document.querySelector('.featured-video-title').textContent;
        const meta = document.querySelector('.featured-video-category').textContent + ' • ' + 
                     document.querySelector('.featured-video-date').textContent;
        
        openVideoModal(source.src, source.type, title, meta);
    }
    
    // Add click events to only the elements that should trigger the video
    if (featuredThumbnail) {
        featuredThumbnail.addEventListener('click', playFeaturedVideo);
    }
    
    if (featuredPlayButton) {
        featuredPlayButton.addEventListener('click', playFeaturedVideo);
    }
    
    if (watchButton) {
        watchButton.addEventListener('click', playFeaturedVideo);
    }
}

// Setup click handlers for all video thumbnails
function setupVideoThumbnails() {
    // This includes video-item thumbnails and video-slide thumbnails
    const videoThumbnails = document.querySelectorAll('.video-thumbnail, .slide-thumbnail');
    const playButtons = document.querySelectorAll('.play-button, .slide-play-button');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', handleVideoClick);
    });
    
    playButtons.forEach(button => {
        button.addEventListener('click', handleVideoClick);
    });
}

// Handle video thumbnail clicks
function handleVideoClick(e) {
    // Prevent the event from bubbling up
    e.stopPropagation();
    
    // Find the parent video item or slide
    const videoItem = this.closest('.video-item') || this.closest('.video-slide');
    if (!videoItem) return;
    
    // Get the hidden video element
    const hiddenVideo = videoItem.querySelector('.hidden-video');
    const source = hiddenVideo ? hiddenVideo.querySelector('source') : null;
    
    if (!source) return;
    
    // Get video info based on the video item structure
    let title, meta;
    
    if (videoItem.classList.contains('video-item')) {
        title = videoItem.querySelector('.video-title').textContent;
        meta = videoItem.querySelector('.video-meta').textContent;
    } else if (videoItem.classList.contains('video-slide')) {
        title = videoItem.querySelector('.slide-title').textContent;
        meta = videoItem.querySelector('.slide-meta').textContent;
    }
    
    // Open the video modal
    openVideoModal(source.src, source.type, title, meta);
}

// Open the video modal with the specified video
function openVideoModal(videoSrc, videoType, title, meta) {
    // Ensure the modal exists
    createVideoModal();
    
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalVideoTitle = document.getElementById('modalVideoTitle');
    const modalVideoMeta = document.getElementById('modalVideoMeta');
    
    if (!videoModal || !modalVideo) return;
    
    // Set modal content
    const sourceElement = modalVideo.querySelector('source');
    sourceElement.src = videoSrc;
    sourceElement.type = videoType;
    modalVideo.load(); // Reload the video element
    
    modalVideoTitle.textContent = title || '';
    modalVideoMeta.textContent = meta || '';
    
    // Show modal
    videoModal.classList.add('active');
    
    // Play video after a slight delay
    setTimeout(() => {
        modalVideo.play().catch(error => {
            console.error("Error playing video:", error);
        });
    }, 300);
}

// Close the video modal
function closeVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    if (!videoModal || !modalVideo) return;
    
    videoModal.classList.remove('active');
    modalVideo.pause();
}

// Video Slideshow Functionality
function initVideoSlideshow() {
    const slidesTrack = document.querySelector('.slides-track');
    const videoSlides = document.querySelectorAll('.video-slide');
    const prevButton = document.querySelector('.slide-prev');
    const nextButton = document.querySelector('.slide-next');
    const dots = document.querySelectorAll('.dot');
    
    if (!slidesTrack || !videoSlides.length) return;
    
    let currentSlide = 0;
    let slidesPerView = getSlidesPerView();
    const maxSlide = Math.max(0, videoSlides.length - slidesPerView);
    
    // Function to get slides per view based on screen width
    function getSlidesPerView() {
        if (window.innerWidth > 992) return 3;
        if (window.innerWidth > 768) return 2;
        return 1;
    }
    
    // Update slides on window resize
    window.addEventListener('resize', function() {
        const newSlidesPerView = getSlidesPerView();
        if (newSlidesPerView !== slidesPerView) {
            slidesPerView = newSlidesPerView;
            // Reset position if needed
            if (currentSlide > videoSlides.length - slidesPerView) {
                currentSlide = Math.max(0, videoSlides.length - slidesPerView);
            }
            updateSlidePosition();
        }
    });
    
    // Function to update slide position
    function updateSlidePosition() {
        // Calculate slide width dynamically
        const slideWidth = videoSlides[0].offsetWidth;
        slidesTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            // Only show dots for visible slides
            if (index < videoSlides.length - slidesPerView + 1) {
                dot.style.display = 'block';
                dot.classList.toggle('active', index === currentSlide);
            } else {
                dot.style.display = 'none';
            }
        });
        
        // Update button states
        prevButton.disabled = currentSlide === 0;
        prevButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
        
        nextButton.disabled = currentSlide >= maxSlide;
        nextButton.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';
    }
    
    // Navigation functions
    function goToPrevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlidePosition();
        }
    }
    
    function goToNextSlide() {
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateSlidePosition();
        }
    }
    
    // Add event listeners
    if (prevButton) prevButton.addEventListener('click', goToPrevSlide);
    if (nextButton) nextButton.addEventListener('click', goToNextSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = Math.min(index, maxSlide);
            updateSlidePosition();
        });
    });
    
    // Initialize slide position
    updateSlidePosition();
}

// Gallery Filtering System
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.gallery-filter .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(button => button.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter the gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Collection Tabs Functionality
function initCollectionTabs() {
    // Find all tab container sections
    const tabContainers = document.querySelectorAll('.collection-tabs');
    
    tabContainers.forEach(container => {
        const tabButtons = container.querySelectorAll('.tab-btn');
        const tabPanels = container.querySelectorAll('.tab-panel');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get only the buttons and panels within this specific container
                const containerButtons = container.querySelectorAll('.tab-btn');
                const containerPanels = container.querySelectorAll('.tab-panel');
                
                // Remove active class from all buttons and panels in this container
                containerButtons.forEach(btn => btn.classList.remove('active'));
                containerPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show the corresponding panel
                const tabId = this.getAttribute('data-tab');
                const targetPanel = document.getElementById(tabId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                    
                    // Re-randomize the images in this tab when it becomes active
                    const tabGallery = targetPanel.querySelector('.tab-gallery');
                    if (tabGallery) {
                        randomizeChildrenOrder(tabGallery);
                    }
                }
            });
        });
    });
}

// Enhance the modalphoto.js functionality (additional handling for our specific gallery items)
document.addEventListener('DOMContentLoaded', function() {
    // Handle gallery item clicks to open the modal
    const galleryItems = document.querySelectorAll('.gallery-item, .tab-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgEl = this.querySelector('img');
            if (imgEl) {
                const imgSrc = imgEl.getAttribute('src');
                const imgAlt = imgEl.getAttribute('alt');
                
                // Check if imageModal and openImageModal function exist (from modalphoto.js)
                const imageModal = document.getElementById('imageModal');
                if (imageModal) {
                    openImageModal(imgSrc, imgAlt);
                }
            }
        });
    });
    
    // Modal functionality (in case modalphoto.js is not properly loaded)
    function openImageModal(imgSrc, imgAlt) {
        const imageModal = document.getElementById('imageModal');
        if (!imageModal) return;
        
        const modalContent = imageModal.querySelector('.modal-content');
        
        // Create an image element if it doesn't exist yet
        let modalImage = modalContent.querySelector('.modal-image');
        if (!modalImage) {
            modalImage = document.createElement('img');
            modalImage.className = 'modal-image';
            modalContent.appendChild(modalImage);
        }
        
        // Set the image source and alt text
        modalImage.src = imgSrc;
        modalImage.alt = imgAlt || '';
        
        // Show the modal
        imageModal.classList.add('active');
        
        // Close modal functionality
        const closeModal = imageModal.querySelector('.close-modal');
        closeModal.addEventListener('click', closeImageModal);
        
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });
        
        // Add keyboard support for closing modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && imageModal.classList.contains('active')) {
                closeImageModal();
            }
        });
    }
    
    function closeImageModal() {
        const imageModal = document.getElementById('imageModal');
        if (imageModal) {
            imageModal.classList.remove('active');
        }
    }
    
    // Scroll-based header opacity effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.style.backgroundColor = 'rgba(17, 17, 17, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(17, 17, 17, 0.7)';
        }
    });
});
