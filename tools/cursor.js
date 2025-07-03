document.addEventListener('DOMContentLoaded', function() {
    // Create cursor elements if they don't exist yet
    if (!document.querySelector('.cursor-dot')) {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        cursorDot.style.width = '80px';
        cursorDot.style.height = '80px';
        document.body.appendChild(cursorDot);
    }
    
    if (!document.querySelector('.cursor-camera')) {
        const cursorCamera = document.createElement('div');
        cursorCamera.className = 'cursor-camera';
        cursorCamera.style.width = '80px';
        cursorCamera.style.height = '80px';
        document.body.appendChild(cursorCamera);
    }
    
    // Initialize cursor functionality
    initCustomCursor();
});

function initCustomCursor() {
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
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        cursorCamera.style.left = `${cameraX}px`;
        cursorCamera.style.top = `${cameraY}px`;
        
        requestAnimationFrame(animateCursor);
    }

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

    // Make sure cursor is hidden on clickable elements
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .slider-arrow, .slider-dot, .filter-button, .collection');

    interactiveElements.forEach(element => {
        element.style.cursor = 'none';
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
}
document.addEventListener('DOMContentLoaded', function() {
  // Select the cursor elements
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorCamera = document.querySelector('.cursor-camera');
  
  // Increase z-index values to be higher than any modal
  if (cursorDot) {
    cursorDot.style.zIndex = '10000'; // Higher than any other element
  }
  
  if (cursorCamera) {
    cursorCamera.style.zIndex = '9999'; // Just below the dot cursor
  }
  
  // Ensure cursor elements are the last elements in the body
  // This helps with stacking order in some browsers
  function ensureCursorsOnTop() {
    if (cursorDot) document.body.appendChild(cursorDot);
    if (cursorCamera) document.body.appendChild(cursorCamera);
  }
  
  // Call when modals open
  const imageModal = document.getElementById('imageModal');
  const videoModal = document.getElementById('videoModal');
  
  if (imageModal) {
    // Monitor for the modal becoming active
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class' && 
            imageModal.classList.contains('active')) {
          ensureCursorsOnTop();
        }
      });
    });
    observer.observe(imageModal, { attributes: true });
  }
  
  if (videoModal) {
    // Monitor for the modal becoming active
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class' && 
            videoModal.classList.contains('active')) {
          ensureCursorsOnTop();
        }
      });
    });
    observer.observe(videoModal, { attributes: true });
  }
  
  // Also ensure cursor is on top after any modal is opened
  ensureCursorsOnTop();
});