/**
 * Minimal Mobile Navigation - Zero Link Interference
 */

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    
    if (!navToggle || !navList) return;
    
    // Create overlay only
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }
    
    // Simple toggle - NO LINK EVENT HANDLING AT ALL
    navToggle.addEventListener('click', function() {
        const isOpen = navList.classList.contains('nav-open');
        if (isOpen) {
            navList.classList.remove('nav-open');
            overlay.classList.remove('nav-open');
            body.classList.remove('no-scroll');
        } else {
            navList.classList.add('nav-open');
            overlay.classList.add('nav-open');
            body.classList.add('no-scroll');
        }
    });
    
    // Close on overlay click only
    overlay.addEventListener('click', function() {
        navList.classList.remove('nav-open');
        overlay.classList.remove('nav-open');
        body.classList.remove('no-scroll');
    });
    
    // DO NOT add any event listeners to navigation links
    // Let them work completely naturally
    
    console.log('Minimal navigation initialized - links are free');
});
