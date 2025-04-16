// DOM Elements
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeButton = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-nav.prev');
const nextButton = document.querySelector('.lightbox-nav.next');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const spinner = document.querySelector('.spinner-container');

// Product Images
const productImages = document.querySelectorAll('.product-image');
let currentImageIndex = 0;
const images = Array.from(productImages);

// Carousel Elements
const carousel = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');
const carouselPrev = document.querySelector('.carousel-btn.prev');
const carouselNext = document.querySelector('.carousel-btn.next');
let currentSlide = 0;

// Hide spinner when page is loaded
window.addEventListener('load', () => {
    spinner.classList.add('loaded');
});

// Make product images focusable and add keyboard activation
productImages.forEach((image, index) => {
    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `View larger version of ${image.alt}`);
    
    // Add keyboard activation
    image.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(index);
        }
    });
});

// Lightbox functionality
function openLightbox(index) {
    currentImageIndex = index;
    const imageSrc = images[index].src;
    lightboxImage.src = imageSrc;
    lightboxImage.alt = images[index].alt;
    
    // Show lightbox with animation
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set focus to close button
    setTimeout(() => {
        closeButton.focus();
    }, 100);

    // Announce to screen readers
    announceToScreenReader(`Image lightbox opened. ${images[index].alt}`);
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    // Return focus to the image that opened the lightbox
    images[currentImageIndex].focus();
    
    // Announce to screen readers
    announceToScreenReader('Image lightbox closed');
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const image = images[currentImageIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    
    // Announce to screen readers
    announceToScreenReader(`Image ${currentImageIndex + 1} of ${images.length}: ${image.alt}`);
}

// Screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Event Listeners for Lightbox
productImages.forEach((image, index) => {
    image.addEventListener('click', () => openLightbox(index));
});

closeButton.addEventListener('click', closeLightbox);
nextButton.addEventListener('click', showNextImage);
prevButton.addEventListener('click', showPrevImage);

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            e.preventDefault();
            closeLightbox();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            showPrevImage();
            break;
        case 'ArrowRight':
            e.preventDefault();
            showNextImage();
            break;
    }
});

// Trap focus within lightbox when it's open
function handleTabKey(e) {
    if (!lightbox.classList.contains('active')) return;

    const focusableElements = lightbox.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // If going backwards (shift + tab) and focused on first element, go to last element
    if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
    }
    // If going forwards (tab) and focused on last element, go to first element
    else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        handleTabKey(e);
    }
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Add aria-labels to navigation buttons
prevButton.setAttribute('aria-label', 'Previous image');
nextButton.setAttribute('aria-label', 'Next image');

// Add touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            showPrevImage();
        } else {
            showNextImage();
        }
    }
}

// Add CSS class for screen reader only elements
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
`;
document.head.appendChild(style);

// Hamburger menu functionality
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Carousel functionality
function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 33.333}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

// Event Listeners for Carousel
carouselNext.addEventListener('click', nextSlide);
carouselPrev.addEventListener('click', prevSlide);

// Auto-advance carousel
setInterval(nextSlide, 5000); 