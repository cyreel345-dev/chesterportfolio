let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text', {
    strings: ['Anime', 'Movies', 'Music', 'Gaming'],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 2000,
    loop: true
});

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});

// Scroll progress bar
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Active nav highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('active-link');
                }
            });
        }
    });
}, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

sections.forEach(section => navObserver.observe(section));

// Back to top
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Floating particles
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    const home = document.querySelector('.home');
    canvas.width = home.offsetWidth;
    canvas.height = home.offsetHeight;
}

function createParticles() {
    particles = [];
    const count = Math.floor(canvas.width * canvas.height / 12000);
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.3 + 0.1
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 200, ${p.opacity})`;
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}

resizeCanvas();
createParticles();
animateParticles();
window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

// Random quote generator
const quotes = [
    // { text: "It's time to be reborn, young man.", source: "Koyuki's Father — Demon Slayer" },
    { text: "The world is cruel, but also very beautiful.", source: "Mikasa Ackerman — Attack on Titan" },
    { text: "If you win, you live. If you lose, you die. If you don't fight, you can't win.", source: "Eren Yeager — Attack on Titan" },
    { text: "Even though they were just a small part of my life, those memories are my treasure.", source: "Frieren — Frieren: Beyond Journey's End" },
    { text: "Do not go gentle into that good night.", source: "Dylan Thomas — Interstellar" },
    { text: "We used to look up at the sky and wonder at our place in the stars.", source: "Cooper — Interstellar" },
    { text: "The survival of man depends on his ability to keep fear from consuming him.", source: "Dr. Szpilman — The Pianist" },
    { text: "I served in a company of heroes.", source: "Major Richard Winters — Band of Brothers" },
    { text: "I'm not gonna die. I have too many things I still want to do.", source: "Denji — Chainsaw Man" },
    { text: "Is this the real life? Is this just fantasy?", source: "Freddie Mercury — Bohemian Rhapsody" },
    { text: "While there is life, there is hope.", source: "Stephen Hawking — The Theory of Everything" },
    { text: "There should be no boundaries to human endeavor.", source: "Stephen Hawking — The Theory of Everything" },
    { text: "However difficult life may seem, there is always something you can do and succeed at.", source: "Stephen Hawking — The Theory of Everything" }
];

let lastQuoteIndex = -1;
const quoteText = document.getElementById('quote-text');
const quoteSource = document.getElementById('quote-source');
const quoteBtn = document.getElementById('quote-btn');

function showRandomQuote() {
    let index;
    do {
        index = Math.floor(Math.random() * quotes.length);
    } while (index === lastQuoteIndex && quotes.length > 1);
    lastQuoteIndex = index;

    quoteText.textContent = quotes[index].text;
    quoteSource.textContent = '— ' + quotes[index].source;
}

showRandomQuote();
quoteBtn.addEventListener('click', showRandomQuote);

// Konami Code Easter Egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
const konamiOverlay = document.getElementById('konami-overlay');

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            konamiOverlay.classList.add('active');
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

konamiOverlay.addEventListener('click', () => {
    konamiOverlay.classList.remove('active');
});

// Contact form
const form = document.getElementById('contact-form');
const feedback = document.getElementById('contact-feedback');
const submitBtn = document.getElementById('contact-submit');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = document.getElementById('contact-message').value.trim();
    if (message.length < 3) {
        feedback.textContent = 'Please write at least a few words.';
        feedback.className = 'contact-feedback error';
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    feedback.textContent = '';
    feedback.className = 'contact-feedback';

    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
        const data = await res.json();

        if (data.success) {
            feedback.textContent = 'Message sent. Thanks for reaching out.';
            feedback.className = 'contact-feedback success';
            form.reset();
        } else {
            feedback.textContent = 'Something went wrong. Try again.';
            feedback.className = 'contact-feedback error';
        }
    } catch {
        feedback.textContent = 'Failed to send. Check your connection.';
        feedback.className = 'contact-feedback error';
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Send';
});

// Recommend form
const recForm = document.getElementById('recommend-form');
const recFeedback = document.getElementById('recommend-feedback');
const recSubmit = document.getElementById('recommend-submit');

recForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const input = document.getElementById('recommend-input');
    if (input.value.trim().length < 2) {
        recFeedback.textContent = 'Type something first.';
        recFeedback.className = 'contact-feedback error';
        return;
    }

    recSubmit.disabled = true;
    recSubmit.textContent = 'Sending...';
    recFeedback.textContent = '';
    recFeedback.className = 'contact-feedback';

    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(recForm)))
        });
        const data = await res.json();

        if (data.success) {
            recFeedback.textContent = "Got it. I'll check it out.";
            recFeedback.className = 'contact-feedback success';
            recForm.reset();
        } else {
            recFeedback.textContent = 'Something went wrong. Try again.';
            recFeedback.className = 'contact-feedback error';
        }
    } catch {
        recFeedback.textContent = 'Failed to send. Check your connection.';
        recFeedback.className = 'contact-feedback error';
    }

    recSubmit.disabled = false;
    recSubmit.textContent = 'Send';
});
