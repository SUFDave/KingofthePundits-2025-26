/**
 * Simple Mobile Navigation - Links Working Version
 */

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    
    if (!navToggle || !navList) {
        console.warn('Navigation elements not found');
        return;
    }
    
    // Create overlay
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }
    
    // Create close button  
    let closeBtn = document.querySelector('.nav-close');
    if (!closeBtn) {
        closeBtn = document.createElement('button');
        closeBtn.className = 'nav-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Close menu');
        navList.insertBefore(closeBtn, navList.firstChild);
    }
    
    // Simple open/close functions
    function openMenu() {
        navList.classList.add('nav-open');
        overlay.classList.add('nav-open');
        body.classList.add('no-scroll');
        navToggle.setAttribute('aria-expanded', 'true');
    }
    
    function closeMenu() {
        navList.classList.remove('nav-open');
        overlay.classList.remove('nav-open');
        body.classList.remove('no-scroll');
        navToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Toggle menu
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = navList.classList.contains('nav-open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close button
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeMenu();
    });
    
    // Close on overlay click
    overlay.addEventListener('click', closeMenu);
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navList.classList.contains('nav-open')) {
            closeMenu();
        }
    });
    
    // SIMPLIFIED: Just close menu when any navigation link is clicked
    // Don't add any event listeners to the links themselves - let them work naturally
    document.addEventListener('click', function(e) {
        // If a navigation link was clicked, close the menu
        if (e.target.tagName === 'A' && navList.contains(e.target) && !e.target.classList.contains('nav-close')) {
            // Wait a tiny bit then close the menu
            setTimeout(closeMenu, 10);
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
    
    console.log('Simple mobile navigation initialized');
});
