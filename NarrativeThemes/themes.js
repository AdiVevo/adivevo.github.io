// JavaScript for storyboard slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality for all storyboard sliders
    const storyboardContainers = document.querySelectorAll('.storyboard-container');

    storyboardContainers.forEach(container => {
        const track = container.querySelector('.storyboard-track');
        const slides = container.querySelectorAll('.storyboard-slide');
        const prevArrow = container.querySelector('.slider-arrow.prev');
        const nextArrow = container.querySelector('.slider-arrow.next');
        const dots = container.querySelectorAll('.slider-dot');
        
        let currentSlide = 0;
        const slideWidth = 100; // 100% of container width
        
        // Initialize slider position
        updateSlider();
        
        // Navigate to previous slide
        prevArrow.addEventListener('click', function() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });
        
        // Navigate to next slide
        nextArrow.addEventListener('click', function() {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                updateSlider();
            }
        });
        
        // Navigate to specific slide when clicking a dot
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlide = index;
                updateSlider();
            });
        });
        
        // Update slider position and active dot
        function updateSlider() {
            // Move the track
            track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
    dot.classList.add('active');
                } else {
    dot.classList.remove('active');
                }
            });
            
            // Update arrow visibility
            prevArrow.style.opacity = currentSlide === 0 ? '0.5' : '1';
            nextArrow.style.opacity = currentSlide === slides.length - 1 ? '0.5' : '1';
        }
    });

    // Filter button functionality
    const filterButtons = document.querySelectorAll('.filter-button');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding storyboard
            const targetStoryboard = this.getAttribute('data-storyboard');
            storyboardContainers.forEach(container => {
                container.classList.remove('active');
                if (container.id === targetStoryboard) {
    container.classList.add('active');
                }
            });
        });
    });
});
// Run on load and on window resize
window.addEventListener('load');
window.addEventListener('resize');


// =======================================
// STORYBOARD SLIDER FUNCTIONALITY
// =======================================
const storyboardTrack = document.querySelector('.storyboard-track');
const storyboardSlides = document.querySelectorAll('.storyboard-slide');
const prevArrow = document.querySelector('.slider-arrow.prev');
const nextArrow = document.querySelector('.slider-arrow.next');
const sliderDots = document.querySelectorAll('.slider-dot');

let currentSlide = 0;
const slideWidth = 100; // 100% of container width

// Initialize slider
updateSlider();

// Navigate to previous slide
prevArrow.addEventListener('click', function() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
});

// Navigate to next slide
nextArrow.addEventListener('click', function() {
    if (currentSlide < storyboardSlides.length - 1) {
        currentSlide++;
        updateSlider();
    }
});

// Navigate to specific slide when clicking a dot
sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        currentSlide = index;
        updateSlider();
    });
});

// Update slider position and active dot
function updateSlider() {
    // Move the track
    storyboardTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    
    // Update active dot
    sliderDots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Update arrow visibility (optional)
    prevArrow.style.opacity = currentSlide === 0 ? '0.5' : '1';
    nextArrow.style.opacity = currentSlide === storyboardSlides.length - 1 ? '0.5' : '1';
}
