/**
 * King of the Pundits - Main JavaScript
 * Multi-page website functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('primary-menu');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('show');
            
            // Update button text for screen readers
            navToggle.textContent = isExpanded ? 'Menu' : 'Close';
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navList.contains(event.target)) {
                navList.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.textContent = 'Menu';
            }
        });
        
        // Close mobile menu when pressing Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navList.classList.contains('show')) {
                navList.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.textContent = 'Menu';
                navToggle.focus();
            }
        });
    }
    
    // League Table Statistics Toggle (for league-tables.html)
    const statToggles = document.querySelectorAll('.stat-toggle');
    
    statToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetRow = document.getElementById(targetId);
            const icon = this.querySelector('.toggle-icon');
            
            if (targetRow) {
                targetRow.classList.toggle('hidden');
                
                // Update icon rotation
                if (targetRow.classList.contains('hidden')) {
                    icon.textContent = '+';
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    icon.textContent = '−';
                    this.setAttribute('aria-expanded', 'true');
                }
            }
        });
    });
    
    // Back to Top Button Functionality
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.display = 'none';
                backToTopButton.style.opacity = '0';
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Handle index.html and root path
        if ((currentPage === 'index.html' || currentPage === '') && linkPage === 'index.html') {
            link.classList.add('current-page');
        } else if (currentPage === linkPage) {
            link.classList.add('current-page');
        }
    });
    
    // Enhanced accessibility for keyboard navigation
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    
    // Skip to main content functionality
    const skipLink = document.querySelector('.skip-to-main');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView();
            }
        });
    }
    
    // Video lazy loading for better performance
    const videoItems = document.querySelectorAll('.video-item iframe');
    
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    if (iframe.dataset.src) {
                        iframe.src = iframe.dataset.src;
                        iframe.removeAttribute('data-src');
                        videoObserver.unobserve(iframe);
                    }
                }
            });
        });
        
        videoItems.forEach(iframe => {
            videoObserver.observe(iframe);
        });
    }
    
    // Form validation and enhancement (if forms are added later)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Basic form validation can be added here
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
    
    // Performance monitoring (optional)
    if ('performance' in window) {
        window.addEventListener('load', function() {
            // Log page load time for optimization
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        });
    }
    
    // Console welcome message
    console.log('🏆 King of the Pundits 2025/26 - Built for the league, designed to shine!');
});

// Utility functions
const KingOfPundits = {
    
    // Smooth scroll to element
    scrollToElement(selector, offset = 0) {
        const element = document.querySelector(selector);
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Format numbers with proper separators
    formatNumber(num) {
        return new Intl.NumberFormat('en-GB').format(num);
    },
    
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KingOfPundits;
}
