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
