// Mobile menu toggle & main scripts
document.addEventListener('DOMContentLoaded', function () {

    /* ===============================
       MOBILE MENU
    =============================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    /* ===============================
       DARK MODE
    =============================== */
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    if (darkModeToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }

        darkModeToggle.addEventListener('change', function () {
            body.classList.toggle('dark-mode', this.checked);
            localStorage.setItem('theme', this.checked ? 'dark' : 'light');
        });
    }

    /* ===============================
       PROJECT FILTER (NEW)
    =============================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.experience-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            projectCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('animate-fade-in-up');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ===============================
       SCROLL REVEAL ANIMATIONS
    =============================== */
    const revealElements = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
                const animation = el.dataset.animation;
                if (animation) el.classList.add(animation);
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    /* ===============================
       SMOOTH SCROLL
    =============================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    /* ===============================
       CONTACT FORM
    =============================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = this.querySelector('.btn');
            const text = btn.querySelector('.btn-text');
            const icon = btn.querySelector('i');

            text.textContent = 'Sending...';
            icon.className = 'fas fa-spinner fa-spin';
            btn.disabled = true;

            setTimeout(() => {
                text.textContent = 'Sent!';
                icon.className = 'fas fa-check';
                btn.style.background = '#2ecc71';

                setTimeout(() => {
                    text.textContent = 'Send Message';
                    icon.className = 'fas fa-paper-plane';
                    btn.disabled = false;
                    btn.style.background = '';
                    contactForm.reset();
                }, 2500);
            }, 2000);
        });
    }

    /* ===============================
       CARD HOVER EFFECT
    =============================== */
    document.querySelectorAll('.experience-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('animate-pulse'));
        card.addEventListener('mouseleave', () => card.classList.remove('animate-pulse'));
    });

    /* ===============================
       HERO TYPING EFFECT
    =============================== */
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && !heroTitle.classList.contains('typed')) {
        const originalHTML = heroTitle.innerHTML;
        const name = 'BIYUNI THARUKA';
        heroTitle.innerHTML = '';
        heroTitle.classList.add('typed');

        let i = 0;
        function type() {
            if (i < name.length) {
                heroTitle.innerHTML += name.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                heroTitle.innerHTML = originalHTML;
            }
        }
        setTimeout(type, 800);
    }
});

/* ===============================
   HERO FLOAT ANIMATION
=============================== */
window.addEventListener('load', () => {
    const heroImage = document.querySelector('.profile-wrapper');
    if (heroImage) heroImage.classList.add('animate-float');
});
