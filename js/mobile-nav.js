/**
 * Mobile Navigation Handler
 * Handles hamburger menu functionality for mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    
    // Only initialize if elements exist
    if (!navToggle || !navList) {
        console.warn('Navigation elements not found');
        return;
    }
    
    // Create and insert overlay element
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }
    
    // Create and insert close button
    let closeBtn = document.querySelector('.nav-close');
    if (!closeBtn) {
        closeBtn = document.createElement('button');
        closeBtn.className = 'nav-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Close navigation menu');
        closeBtn.setAttribute('type', 'button');
        navList.insertBefore(closeBtn, navList.firstChild);
    }
    
    // Set initial ARIA attributes
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'navigation-menu');
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navList.setAttribute('id', 'navigation-menu');
    
    /**
     * Toggle mobile menu open/close
     */
    function toggleMenu() {
        const isOpen = navList.classList.contains('nav-open');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    /**
     * Open mobile menu
     */
    function openMenu() {
        navList.classList.add('nav-open');
        overlay.classList.add('nav-open');
        body.classList.add('no-scroll');
        navToggle.setAttribute('aria-expanded', 'true');
        
        // Focus management for accessibility
        setTimeout(() => {
            closeBtn.focus();
        }, 300);
    }
    
    /**
     * Close mobile menu
     */
    function closeMenu() {
        navList.classList.remove('nav-open');
        overlay.classList.remove('nav-open');
        body.classList.remove('no-scroll');
        navToggle.setAttribute('aria-expanded', 'false');
        
        // Return focus to toggle button
        navToggle.focus();
    }
    
    /**
     * Handle keyboard navigation within menu
     */
    function handleMenuKeydown(e) {
        if (!navList.classList.contains('nav-open')) return;
        
        const focusableElements = navList.querySelectorAll(
            'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Tab navigation
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    }
    
    // Event Listeners
    
    // Toggle menu on hamburger button click
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu on close button click
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
    });
    
    // Close menu on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeMenu();
        }
    });
    
    // Handle navigation links - FIXED VERSION
    const navLinks = navList.querySelectorAll('a:not(.nav-close)');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default - let the link work normally
            // Just close the menu after a very short delay
            setTimeout(() => {
                closeMenu();
            }, 50);
        });
    });
    
    // Keyboard event handling
    document.addEventListener('keydown', function(e) {
        // Close menu on Escape key
        if (e.key === 'Escape' && navList.classList.contains('nav-open')) {
            closeMenu();
        }
        
        // Handle menu keyboard navigation
        handleMenuKeydown(e);
    });
    
    // Close menu if window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && navList.classList.contains('nav-open')) {
            closeMenu();
        }
    });
    
    // Prevent body scroll when menu is open (additional fallback)
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        if (body.classList.contains('no-scroll')) {
            const touchY = e.touches[0].clientY;
            const touchDelta = touchY - touchStartY;
            
            // Prevent scroll unless it's within the nav menu
            if (!navList.contains(e.target)) {
                e.preventDefault();
            }
        }
    }, { passive: false });
    
    // Debug logging (remove in production)
    console.log('Mobile navigation initialized successfully');
});
