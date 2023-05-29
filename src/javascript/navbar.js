const navbar = document.querySelector('nav');

document.addEventListener('scroll', () => {
    window.scrollY > 5 ? navbar.classList.add('nav-shown') : navbar.classList.remove('nav-shown');
});

