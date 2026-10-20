(function () {
    'use strict';

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    function closeMenu() {
        if (!hamburger || !navMenu) return;
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation');
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const open = navMenu.classList.toggle('open');
            hamburger.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', String(open));
            hamburger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        });
        navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    }

    const setNavState = () => navbar?.classList.toggle('scrolled', window.scrollY > 12);
    window.addEventListener('scroll', setNavState, { passive: true });
    setNavState();

    const revealElements = document.querySelectorAll(
        '.about-text, .info-card, .timeline-item, .paper-card, .project-card, .skill-category, .contact-card, .award-card, .scholarship-item, .ue5-photo-item, .uav-media-item'
    );
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
        revealElements.forEach(el => { el.classList.add('reveal'); observer.observe(el); });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeLightbox();
            closeMenu();
        }
    });
})();

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const image = document.getElementById('lightbox-img');
    if (!lightbox || !image) return;
    image.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

