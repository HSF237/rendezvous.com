// JavaScript for Rendezvous Badminton Academy website interactions
document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        }, 1500);
    });

    // Create Particles Background
    function createParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size
            const size = Math.random() * 10 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;
            particle.style.opacity = opacity;
            
            // Random animation duration
            const duration = Math.random() * 50 + 20;
            particle.style.animation = `float ${duration}s linear infinite`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();

    // Create Hero Particles
    function createHeroParticles() {
        const heroParticles = document.querySelector('.hero__particles');
        if (!heroParticles) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'hero__particle';
            
            // Random size
            const size = Math.random() * 8 + 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.2;
            particle.style.opacity = opacity;
            
            // Random animation duration
            const duration = Math.random() * 30 + 10;
            particle.style.animation = `float ${duration}s linear infinite`;
            
            heroParticles.appendChild(particle);
        }
    }
    
    createHeroParticles();

    // Cursor Trail Effect
    const cursorTrail = document.querySelector('.cursor-trail');
    if (cursorTrail) {
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateTrail() {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            cursorTrail.style.left = `${trailX}px`;
            cursorTrail.style.top = `${trailY}px`;
            
            requestAnimationFrame(animateTrail);
        }
        
        animateTrail();
    }

    // Navigation menu toggle for mobile
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.getElementById('primary-navigation');
    navToggle?.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('active');
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature, .testimonial, .achievement, .team-member, .stat-item, .timeline-item, .achievement-stat');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.feature, .testimonial, .achievement, .team-member, .stat-item, .timeline-item, .achievement-stat').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Animate counters
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number, .achievement-stat__number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 1);
            } else {
                counter.innerText = target;
            }
        });
    };
    
    // Trigger counter animation when in view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-number, .achievement-stat__number').forEach(counter => {
        counterObserver.observe(counter);
    });

    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        caption: item.querySelector('figcaption').textContent
    }));
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    function updateLightbox() {
        lightboxImage.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].caption;
    }
    
    lightboxClose?.addEventListener('click', closeLightbox);
    
    lightboxPrev?.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
    });
    
    lightboxNext?.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton?.classList.add('visible');
        } else {
            backToTopButton?.classList.remove('visible');
        }
    });
    
    backToTopButton?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact Form Submission with WhatsApp integration
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    contactForm?.addEventListener('submit', e => {
        e.preventDefault();
        formMessage.textContent = '';
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const phone = contactForm.phone.value.trim();
        const subject = contactForm.subject.value.trim();
        const message = contactForm.message.value.trim();
        
        if (!name || !email || !message) {
            formMessage.style.color = 'red';
            formMessage.textContent = 'Please fill in all required fields (Name, Email, Message).';
            return;
        }
        
        if (!validateEmail(email)) {
            formMessage.style.color = 'red';
            formMessage.textContent = 'Please enter a valid email address.';
            contactForm.email.focus();
            return;
        }
        
        if (phone && !/^\d{10}$/.test(phone)) {
            formMessage.style.color = 'red';
            formMessage.textContent = 'Phone number should be 10 digits.';
            contactForm.phone.focus();
            return;
        }
        
        // WhatsApp number to send message to (replace with your actual number with country code, no + or spaces)
        const whatsappNumber = '919745544623';
        
        // Construct message with URL encoding
        let whatsappMessage = 
            "Hello!%0A%0AI have a new inquiry from *Rendezvous Badminton Academy* website contact form.%0A%0A" +
            `*Name:* ${encodeURIComponent(name)}%0A` +
            `*Email:* ${encodeURIComponent(email)}%0A`;
            
        if (phone) {
            whatsappMessage += `*Phone:* ${encodeURIComponent(phone)}%0A`;
        }
        
        if (subject) {
            whatsappMessage += `*Subject:* ${encodeURIComponent(subject)}%0A`;
        }
        
        whatsappMessage += 
            `*Message:* ${encodeURIComponent(message)}%0A%0A` +
            `Please get in touch with them soon.`;
        
        // WhatsApp API link
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        // Open WhatsApp in new tab or app
        window.open(whatsappURL, '_blank');
        
        // Provide feedback to the user
        formMessage.style.color = 'green';
        formMessage.textContent = `Thank you, ${name}. Your message is ready to send via WhatsApp. If WhatsApp did not open, please ensure you have WhatsApp installed or access WhatsApp Web.`;
        contactForm.reset();
        
        // Create success confetti
        createConfetti(contactForm);
    });

    // Helper function to validate email
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Create confetti effect
    function createConfetti(element) {
        const colors = ['#0077cc', '#ffde59', '#28a745', '#dc3545', '#6f42c1'];
        const confettiCount = 50;
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${rect.left + Math.random() * rect.width}px`;
            confetti.style.top = `${rect.top + Math.random() * rect.height}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            confetti.style.animationDuration = `${Math.random() * 1 + 1}s`;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
    
    // Add confetti styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .confetti {
            position: fixed;
            width: 10px;
            height: 10px;
            background-color: #ffde59;
            position: absolute;
            animation: confetti-fall 3s linear forwards;
            z-index: 1001;
        }
        
        @keyframes confetti-fall {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
