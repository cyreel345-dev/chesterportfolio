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
      strings: ['Computer Scientist', 'Computer Enthusiast', 'Vibe Coder', 'Freelancer'],
      typeSpeed: 60,
      backspeed: 60,
      backDelay: 1200,
      loop: true
    });
