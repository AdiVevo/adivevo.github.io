/**
 * DREAMSCAPE Logo Animation
 * 
 * This script creates an animated text logo with a glitchy effect.
 * Configure the text, colors, and animation settings below.
 */

// Logo Configuration - Change these to customize your logo
const logoConfig = {
    // Text parts to animate (can be changed to any text)
    text: [
        { text: "ASTERIN", chars: 7 },
        { text: "JOY", chars: 3 }
    ],
    
    // Color classes to use (should match CSS classes)
    colorPatterns: [
        ["red", "turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise", "pink", "red"],
        ["pink", "red", "turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise", "pink"],
        ["turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise"],
        ["red", "turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise", "pink", "red"],
        ["pink", "red", "turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise", "pink"],
        ["turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise", "pink", "red", "turquoise"]
    ],
    
    // Animation settings
    animation: {
        frames: 6,               // Number of animation frames
        jitterAmount: 4,         // How much the letters move (in pixels)
        rotationAmount: 2,       // Maximum rotation (in degrees)
        scaleVariation: 0.06,    // How much the size varies
        baseScale: 0.97          // Base scaling factor
    }
};

/**
 * Generates the animated frames for a container
 * @param {string} containerId - The ID of the container element
 * @param {object} config - Optional configuration to override defaults
 */
function generateLogoFrames(containerId, config = {}) {
    // Merge provided config with defaults
    const mergedConfig = {
        ...logoConfig,
        ...config,
        animation: {
            ...logoConfig.animation,
            ...(config.animation || {})
        }
    };
    
    const animationContainer = document.getElementById(containerId);
    if (!animationContainer) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }
    
    // Clear any existing content
    animationContainer.innerHTML = '';
    
    // Generate frames
    for (let frameIndex = 0; frameIndex < mergedConfig.animation.frames; frameIndex++) {
        const frame = document.createElement('div');
        frame.className = 'frame';
        
        const title = document.createElement('div');
        title.className = 'title';
        
        let letterIndex = 0;
        
        // Create letters for each text part
        mergedConfig.text.forEach((part, partIndex) => {
            // Add each letter
            for (let i = 0; i < part.chars; i++) {
                const letter = document.createElement('div');
                letter.className = `letter ${mergedConfig.colorPatterns[frameIndex][letterIndex]}`;
                letter.textContent = part.text[i];
                
                // Generate random transformations for non-first frame
                if (frameIndex > 0) {
                    const jitter = mergedConfig.animation.jitterAmount;
                    const rotation = mergedConfig.animation.rotationAmount;
                    const scale = mergedConfig.animation.scaleVariation;
                    const baseScale = mergedConfig.animation.baseScale;
                    
                    const translateX = (Math.random() * jitter - jitter/2).toFixed(1);
                    const translateY = (Math.random() * jitter - jitter/2).toFixed(1);
                    const rotate = (Math.random() * rotation - rotation/2).toFixed(1);
                    const scaleValue = (Math.random() * scale + baseScale).toFixed(2);
                    
                    letter.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scaleValue})`;
                } else {
                    letter.style.transform = 'translate(0px, 0px) rotate(0deg) scale(1)';
                }
                
                title.appendChild(letter);
                letterIndex++;
            }
            
            // Add space between text parts if not the last part
            if (partIndex < mergedConfig.text.length - 1) {
                const space = document.createElement('div');
                space.className = 'space';
                title.appendChild(space);
            }
        });
        
        frame.appendChild(title);
        animationContainer.appendChild(frame);
    }
    
    // Add grain effect
    const grain = document.createElement('div');
    grain.className = 'grain';
    animationContainer.appendChild(grain);
}

/**
 * Initialize all logo animations on the page
 * @param {object} config - Optional configuration to override defaults
 */
function initLogoAnimations(config = {}) {
    document.addEventListener('DOMContentLoaded', function() {
        // Find all animation containers on the page
        const containers = document.querySelectorAll('[id$="AnimationContainer"]');
        
        // If no specific containers found, look for default ones
        if (containers.length === 0) {
            if (document.getElementById('headerAnimationContainer')) {
                generateLogoFrames('headerAnimationContainer', config);
            }
            
            if (document.getElementById('footerAnimationContainer')) {
                generateLogoFrames('footerAnimationContainer', config);
            }
        } else {
            // Initialize all found containers
            containers.forEach(container => {
                generateLogoFrames(container.id, config);
            });
        }
    });
}

// Initialize with default settings
initLogoAnimations();

// Export functions for modular usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateLogoFrames,
        initLogoAnimations,
        logoConfig
    };
}