const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

AOS.init({
    duration: 1000,
    once: false
});

const emojiFavicon = document.createElement('link');
emojiFavicon.rel = 'icon';
emojiFavicon.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌍</text></svg>';
document.head.appendChild(emojiFavicon);