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

// Contact Form Submission (Web3Forms API)
const contactForm = document.getElementById('contact-form');
const result = document.getElementById('form-result');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        result.style.display = 'none';

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                result.innerHTML = "👉 Thanks! Your message has been sent. I’ll get back to you soon.";
                result.style.color = "var(--primary-color)";
                result.style.display = "block";
                contactForm.reset();
            } else {
                console.log(response);
                result.innerHTML = json.message || "Something went wrong!";
                result.style.color = "red";
                result.style.display = "block";
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            result.innerHTML = "Something went wrong!";
            result.style.color = "red";
            result.style.display = "block";
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        })
        .finally(() => {
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Smooth fade out
                result.style.transition = 'opacity 0.6s ease';
                result.style.opacity = '0';
                setTimeout(() => {
                    result.style.display = 'none';
                    result.style.opacity = '1'; // reset for next time
                }, 600);
                
            }, 5000); // 5 seconds before fading out
        });
    });
}
