function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const openIcon = document.querySelector('.open-icon');
    const closeIcon = document.querySelector('.close-icon');
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
        openIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        openIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

let lastScrollPosition = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (currentScrollPosition > lastScrollPosition) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }


    if (currentScrollPosition === 0) {
        header.classList.remove('header-hidden');
    }

    lastScrollPosition = currentScrollPosition;
});

document.addEventListener('DOMContentLoaded', function () {
    const goToTopBtn = document.getElementById('goToTopBtn');

    window.addEventListener('scroll', function () {
        const heightToShow = 20;
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        if (scrollPosition > heightToShow) {
            goToTopBtn.style.display = 'flex';
        } else {
            goToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when button is clicked
    goToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });
});