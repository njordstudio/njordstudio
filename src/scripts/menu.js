import { gsap } from "gsap";

// Animation for hamburger menu
document.querySelector('.hamburger').addEventListener('click', () => {

    const navigation = document.querySelector('.navigation');
    const hamburger = document.getElementById('hamburger');
    const logo = document.querySelector('.headerLogo');

    if (navigation) {
        navigation.classList.toggle('expanded');
        hamburger.classList.toggle('open');
        logo.classList.toggle('hiddenLogo');
    }
});

// Smooth transition for hamburger menu
document.querySelector('.hamburger').addEventListener('click', () => {
    gsap.from('.navigation.expanded a', {
        height: 0,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.1,
    });
});

// Smooth transition for navigation links
document.querySelectorAll('.navigation a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        gsap.to(link, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                window.location.href = link.href;
            }
        });
    });
});