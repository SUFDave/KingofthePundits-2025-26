/**
 * Working Mobile Navigation - Links Navigate Properly
 */

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    
    if (!navToggle || !navList) return;
    
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
    
    // Menu functions
    function openMenu() {
        navList.classList.add('nav-open');
        overlay.classList.add('nav-open');
        body.classList.add('no-scroll');
    }
    
    function closeMenu() {
        navList.classList.remove('nav-open');
        overlay.classList.remove('nav-open');
        body.classList.remove('no-scroll');
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
    
    // FIXED: Handle navigation link clicks properly
    // Use event delegation and do NOT prevent default or stop propagation
    document.addEventListener('click', function(e) {
        // Check if a navigation link was clicked
        if (e.target.tagName === 'A' && 
            navList.contains(e.target) && 
            !e.target.classList.contains('nav-close') &&
            navList.classList.contains('nav-open')) {
            
            // Let the link work normally, just close the menu
            // Do NOT call e.preventDefault() or e.stopPropagation()
            closeMenu();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navList.classList.contains('nav-open')) {
            closeMenu();
        }
    });
    
    // Close on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
    
    console.log('Mobile navigation: Links should now navigate properly');
});
