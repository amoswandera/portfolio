// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add animation to skill cards and form groups
const animateOnScroll = (elements, options = {}) => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
    });

    elements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.5s ease-out ${(options.delay || 0.1) * index}s`;
            observer.observe(element);
        }
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    animateOnScroll(skillCards, { threshold: 0.1 });
    
    // Animate form groups if they exist
    const formGroups = document.querySelectorAll('.form-group');
    if (formGroups.length > 0) {
        animateOnScroll(formGroups, { threshold: 0.1, delay: 0.1 });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            formStatus.textContent = 'Sending message...';
            formStatus.style.display = 'block';
            
            try {
                // Replace this with your actual form submission logic
                // For example, using Fetch API to send data to a server
                // const response = await fetch('your-endpoint', {
                //     method: 'POST',
                //     body: formData
                // });
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = '#28a745';
                contactForm.reset();
                
                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
                
            } catch (error) {
                console.error('Error:', error);
                formStatus.textContent = 'Failed to send message. Please try again.';
                formStatus.style.color = '#dc3545';
            }
        });
    }
});
