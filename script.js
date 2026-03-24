// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    const isIconBar = mobileBtn.innerHTML.includes('fa-bars');
    mobileBtn.innerHTML = isIconBar ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when link is clicked
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal, .reveal-right');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Active Link Highlight on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});

// Contact Form Submission (FormSubmit API)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        fetch('https://formsubmit.co/ajax/chrispinjos@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === "true" || data.success === true) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error. Try Again.';
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 3000);
        });
    });
}
