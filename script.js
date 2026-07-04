// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Observe cards for scroll animations
document.querySelectorAll('.glass-card').forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
});

// WhatsApp Form Submission
const applicationForm = document.getElementById('applicationForm');

applicationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const position = document.getElementById('position').value;
    const workType = document.getElementById('workType').value;
    const experience = document.getElementById('experience').value;
    const message = document.getElementById('message').value.trim();
    
    // Validate required fields
    if (!fullName || !email || !phone || !position || !workType) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10,}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
        alert('Please enter a valid phone number (at least 10 digits).');
        return;
    }
    
    // Create WhatsApp message
    let whatsappMessage = `*New Job Application - ALTRAIND*%0A%0A`;
    whatsappMessage += `*Full Name:* ${fullName}%0A`;
    whatsappMessage += `*Email:* ${email}%0A`;
    whatsappMessage += `*Phone:* ${phone}%0A`;
    whatsappMessage += `*Position Applied For:* ${position}%0A`;
    whatsappMessage += `*Work Type Preference:* ${workType}%0A`;
    
    if (experience) {
        whatsappMessage += `*Experience:* ${experience} years%0A`;
    }
    
    if (message) {
        whatsappMessage += `*Message:* ${message}%0A`;
    }
    
    whatsappMessage += `%0A*Submitted via ALTRAIND Website*`;
    
    // WhatsApp API endpoint (using the provided phone number)
    const whatsappNumber = '9311982029';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Reset form
    applicationForm.reset();
    
    // Show success message
    alert('Thank you for your application! WhatsApp will open shortly with your application details.');
});

// Form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Add focused class if input has value on page load
    if (input.value !== '') {
        input.parentElement.classList.add('focused');
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            const statNumbers = document.querySelectorAll('.stat-item h4');
            
            statNumbers.forEach(stat => {
                const targetValue = parseInt(stat.textContent);
                animateCounter(stat, targetValue);
            });
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect to service cards
document.querySelectorAll('.service-card, .publisher-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = `© ${currentYear} ALTRAIND. All Rights Reserved.`;
}

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add touch-friendly interactions for mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10) {
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

// Apply debounce to scroll event listeners
const debouncedScroll = debounce(() => {
    // Scroll-related operations here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Console message for developers
console.log('%c ALTRAIND Website ', 'background: #0066ff; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Premium Digital Marketing & Advertising Solutions ', 'color: #0066ff; font-size: 14px;');
