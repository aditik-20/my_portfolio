// ---------- COMPLETE PORTFOLIO INTERACTION LOGIC ----------

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const sections = document.querySelectorAll('section[id]');
    const scrollProgress = document.getElementById('scroll-progress');
    const mouseGlow = document.getElementById('mouse-glow');

    // 1. Scroll Progress Bar & Sticky Navbar
    const handleScroll = () => {
        // Sticky Navbar Glassmorphism
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Bar Calculation
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (totalHeight > 0 && scrollProgress) {
            const progress = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 2. Mouse Glow Movement Effect (Desktop Only)
    if (mouseGlow && window.innerWidth > 900) {
        window.addEventListener('mousemove', (e) => {
            mouseGlow.style.left = `${e.clientX}px`;
            mouseGlow.style.top = `${e.clientY}px`;
        });
    }

    // 3. Mobile Menu Toggle & Animated Icon
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('open');
        if (isOpen) {
            mobileMenu.classList.remove('open');
            mobileMenuBtn.classList.remove('active');
        } else {
            mobileMenu.classList.add('open');
            mobileMenuBtn.classList.add('active');
        }
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // 4. Active Section Highlighting via Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                mobileLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));


    // 5. Hero Canvas Particle Background Animation
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 15;

        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 1.5 + 0.5;
                this.color = 'rgba(255, 255, 255, ';
                this.alpha = Math.random() * 0.1 + 0.05;
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.alpha + ')';
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();
    }


    // 6. Fade Up & Sequence Scroll Reveal Observer
    const fadeUpElements = document.querySelectorAll('.fade-up, .anim-seq, .telemetry-panel');
    
    const fadeUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.12
    });

    fadeUpElements.forEach(el => fadeUpObserver.observe(el));


    // 7. Active Missions Selector Logic
    const missionSelectorBtns = document.querySelectorAll('.mission-selector-btn');
    const missionDisplays = document.querySelectorAll('.mission-display');

    missionSelectorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            missionSelectorBtns.forEach(b => b.classList.remove('active'));
            missionDisplays.forEach(d => d.classList.remove('active-mission'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Find and show target display
            const targetId = btn.getAttribute('data-target');
            const targetDisplay = document.getElementById(targetId);
            if (targetDisplay) {
                targetDisplay.classList.add('active-mission');
                
                // Retrigger the fade animation by removing and re-adding the element
                // This forces the CSS animation to play again
                targetDisplay.style.animation = 'none';
                targetDisplay.offsetHeight; /* trigger reflow */
                targetDisplay.style.animation = null; 
            }
        });
    });
    // 8. Back To Top Button Smooth Scroll
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 8. Contact Form Submit Event
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out! Your message has been sent successfully.');
            contactForm.reset();
        });
    }
});
