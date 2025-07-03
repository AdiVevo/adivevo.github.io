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

// Initialize hero animations when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add this line to your existing DOMContentLoaded function or create a new one
    initHeroAnimations();
});