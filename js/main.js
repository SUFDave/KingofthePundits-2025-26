/**
 * King of the Pundits - Main JavaScript
 * Consolidated functionality for the entire website.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const primaryMenu = document.getElementById('primary-menu');

    if (navToggle && primaryMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from immediately closing menu
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!isExpanded));
            primaryMenu.classList.toggle('nav-open');
        });

        // Close menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (primaryMenu.classList.contains('nav-open') && !primaryMenu.contains(e.target) && !navToggle.contains(e.target)) {
                primaryMenu.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }


    // --- League Table Statistics Toggle (for league-tables.html) ---
    const statToggles = document.querySelectorAll('.stat-toggle');
    statToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetId = toggle.getAttribute('data-target');
            const targetRow = document.getElementById(targetId);
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            if (targetRow) {
                toggle.setAttribute('aria-expanded', String(!isExpanded));
                targetRow.classList.toggle('hidden');
            }
        });
    });


    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        toggleVisibility(); // Check on page load

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Highlight Current Page in Navigation ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('current-page');
        }
    });

    // --- Console Welcome Message ---
    console.log('🏆 King of the Pundits 2025/26 - Website loaded successfully!');
});
