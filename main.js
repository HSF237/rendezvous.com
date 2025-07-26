// JavaScript for Rendezvous Badminton Academy website interactions
document.addEventListener('DOMContentLoaded', () => {
    // Navigation menu toggle for mobile
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.getElementById('primary-navigation');

    navToggle?.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('active');
    });

    // Newsletter form submission simulation and validation
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmail = document.getElementById('newsletter-email');
    const newsletterMessage = document.getElementById('newsletter-message');

    newsletterForm?.addEventListener('submit', e => {
        e.preventDefault();
        newsletterMessage.textContent = '';
        const emailValue = newsletterEmail.value.trim();

        if (!validateEmail(emailValue)) {
            newsletterMessage.textContent = 'Please enter a valid email address.';
            newsletterMessage.style.color = 'red';
            newsletterEmail.focus();
            return;
        }

        // Simulate success subscription
        newsletterMessage.style.color = 'green';
        newsletterMessage.textContent = `Thank you for subscribing, ${emailValue}!`;
        newsletterEmail.value = '';
    });

    // Animate achievements fade and slide in on scroll
    const achievements = document.querySelectorAll('.achievement');

    if ('IntersectionObserver' in window) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        achievements.forEach(ach => observer.observe(ach));
    } else {
        // Fallback for older browsers - show all 
        achievements.forEach(ach => ach.classList.add('in-view'));
    }

    // Contact Form Submission with WhatsApp integration
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm?.addEventListener('submit', e => {
        e.preventDefault();
        formMessage.textContent = '';
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const phone = contactForm.phone.value.trim();
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
        const whatsappMessage = 
            "Hello!%0A%0AI have a new inquiry from *Rendezvous Badminton Academy* website contact form.%0A%0A" +
            `*Name:* ${encodeURIComponent(name)}%0A` +
            `*Email:* ${encodeURIComponent(email)}%0A` +
            `*Phone:* ${encodeURIComponent(phone || 'N/A')}%0A` +
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
    });

    // Helper function to validate email
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});