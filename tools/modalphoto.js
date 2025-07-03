/**
 * Photo Modal Functionality
 * 
 * This script adds a modal gallery view for images on your site.
 * It allows users to click on images and view them in a full-screen modal.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create the modal if it doesn't exist
    let imageModal = document.getElementById('imageModal');
    if (!imageModal) {
        // Create the modal element
        imageModal = document.createElement('div');
        imageModal.className = 'modal';
        imageModal.id = 'imageModal';
        
        // Create the close button
        const closeModalBtn = document.createElement('div');
        closeModalBtn.className = 'close-modal';
        
        // Create the modal content container
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        // Append elements to the document
        imageModal.appendChild(closeModalBtn);
        imageModal.appendChild(modalContent);
        document.body.appendChild(imageModal);
    }
    
    // Get all gallery items (these are the images that can be clicked)
    const galleryItems = document.querySelectorAll('.gallery-item, .process-item, .storyboard-image');
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        
        if (img) {
            // Get the image source
            const imgSrc = img.getAttribute('src');
            
            // Make the entire item clickable
            item.addEventListener('click', function(e) {
                e.preventDefault();
                openImageModal(imgSrc);
            });
        }
    });
    
    // Function to open image modal
    function openImageModal(imgSrc) {
        console.log("Opening modal with image:", imgSrc);
        
        if (!imgSrc) {
            console.error("No image source provided!");
            return;
        }
        
        const modalContent = imageModal.querySelector('.modal-content');
        
        // Create an image element if it doesn't exist yet, or get the existing one
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
    const closeModal = imageModal.querySelector('.close-modal');
    closeModal.addEventListener('click', closeMediaModal);
    
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeMediaModal();
        }
    });
    
    // Function to close the media modal
    function closeMediaModal() {
        imageModal.classList.remove('active');
    }
    
    // Add keyboard support for closing modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeMediaModal();
        }
    });
});