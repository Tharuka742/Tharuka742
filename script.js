// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Set current date in attestation
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Toggle menu icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Dark Mode Toggle
    if (darkModeToggle) {
        // Check for saved theme preference or respect OS preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');
        
        // Set initial theme
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        // Toggle theme
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                // Add transition class for smooth change
                body.classList.add('theme-transition');
                setTimeout(() => {
                    body.classList.remove('theme-transition');
                }, 500);
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                // Add transition class for smooth change
                body.classList.add('theme-transition');
                setTimeout(() => {
                    body.classList.remove('theme-transition');
                }, 500);
            }
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add animation to button
            const submitBtn = this.querySelector('.btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            const icon = submitBtn.querySelector('i');
            
            btnText.textContent = 'Sending...';
            icon.classList.remove('fa-paper-plane');
            icon.classList.add('fa-spinner', 'animate-rotate');
            submitBtn.disabled = true;
            
            // Simulate sending (in a real project, this would be an AJAX request)
            setTimeout(() => {
                btnText.textContent = 'Sent Successfully!';
                icon.classList.remove('fa-spinner', 'animate-rotate');
                icon.classList.add('fa-check');
                submitBtn.style.backgroundColor = '#2ecc71';
                
                // Show success notification
                showNotification('Message sent successfully! I will get back to you soon.');
                
                setTimeout(() => {
                    btnText.textContent = originalText;
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-paper-plane');
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 2000);
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add animation to clicked link
                this.classList.add('animate-pulse');
                setTimeout(() => {
                    this.classList.remove('animate-pulse');
                }, 1000);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll Spy - Highlight active navigation section
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        const updateActiveNav = () => {
            let current = '';
            const scrollY = window.pageYOffset;
            const navHeight = 80;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= (sectionTop - navHeight - 100) && 
                    scrollY < (sectionTop + sectionHeight - navHeight)) {
                    current = sectionId;
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Initial call
    }
    
    initScrollSpy();
    
    // Scroll animations
    function initScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const revealPoint = 100;
            
            revealElements.forEach(element => {
                const revealTop = element.getBoundingClientRect().top;
                
                if (revealTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                    
                    // Add specific animation based on data attribute
                    const animationType = element.getAttribute('data-animation');
                    if (animationType && !element.classList.contains(animationType)) {
                        element.classList.add(animationType);
                    }
                }
            });
        };
        
        // Initial check
        revealOnScroll();
        
        // Check on scroll
        window.addEventListener('scroll', revealOnScroll);
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add floating animation to hero image when in view
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const heroImage = document.querySelector('.image-placeholder');
                if (heroImage) {
                    heroImage.classList.add('animate-float');
                }
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // Add hover animations to experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('animate-pulse');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('animate-pulse');
        });
    });
    
    // Add hover animations to skill items
    const skillItems = document.querySelectorAll('.skill-item, .tool-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing animation to hero text
    function initTypingAnimation() {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle && !heroTitle.classList.contains('typed')) {
            const originalText = heroTitle.innerHTML;
            const highlightedText = heroTitle.querySelector('.highlight').outerHTML;
            const nameText = 'BIYUNI THARUKA';
            
            // Replace the highlighted span with just the text for typing
            const textWithoutHighlight = originalText.replace(/<span class="highlight">.*?<\/span>/, nameText);
            const staticPart = textWithoutHighlight.split(nameText)[0];
            
            heroTitle.innerHTML = staticPart;
            heroTitle.classList.add('typed');
            
            let i = 0;
            const typeWriter = () => {
                if (i < nameText.length) {
                    heroTitle.innerHTML = staticPart + nameText.substring(0, i + 1);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Restore the highlighted version
                    heroTitle.innerHTML = originalText;
                }
            };
            
            // Start typing after a delay
            setTimeout(typeWriter, 1000);
        }
    }
    
    // Start typing animation when hero section is in view
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                initTypingAnimation();
                heroObserver.unobserve(heroSection);
            }
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }
    
    // Notification function
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <p>${message}</p>
            <i class="fas fa-times close-notification"></i>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: var(--primary);
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            z-index: 10000;
            animation: slideInRight 0.3s ease forwards;
        `;
        
        document.body.appendChild(notification);
        
        // Close notification on click
        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideInRight 0.3s ease reverse forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease reverse forwards';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Add CSS for notification
    const style = document.createElement('style');
    style.textContent = `
        .theme-transition * {
            transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease !important;
        }
        
        .close-notification {
            cursor: pointer;
            margin-left: 15px;
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .close-notification:hover {
            opacity: 1;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add floating animation to hero image on load
window.addEventListener('load', function() {
    const heroImage = document.querySelector('.image-placeholder');
    if (heroImage) {
        setTimeout(() => {
            heroImage.classList.add('animate-float');
        }, 1000);
    }
});

