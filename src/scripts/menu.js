import { gsap } from "gsap";

// Animation for hamburger menu
document.querySelector('.hamburger').addEventListener('click', () => {

    const navigation = document.querySelector('.navigation');
    const hamburger = document.getElementById('hamburger');

    if (navigation) {
        navigation.classList.toggle('expanded');
        hamburger.classList.toggle('open');
    }
});


// Animation for article items
gsap.from('.articleItem', {
    opacity: 0,
    y: 50,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out'
});

document.querySelectorAll('.articleItem').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.querySelector('.articleImg').style.height = '0';
        item.querySelector('.articleDescription').style.display = 'block';
        item.querySelector('.articleAuthor').style.display = 'none'; // Add this line to hide articleAuthor
        item.querySelector('.articleImg').style.transition = 'height 0.2s'; // Add this line for smooth transition
    });

    item.addEventListener('mouseout', () => {
        item.querySelector('.articleImg').style.height = '150px';
        item.querySelector('.articleDescription').style.display = 'none';
        item.querySelector('.articleAuthor').style.display = 'block'; // Add this line to show articleAuthor
        item.querySelector('.articleImg').style.transition = 'height 0.2s'; // Add this line for smooth transition
    });
});

// Transition between pages
document.querySelectorAll('.articleItem').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const articleItem = link.closest('.articleItem');
        gsap.to(articleItem, {
            opacity: 0,
            duration: 0.2,
            scale: 0.9,
            ease: 'power2.inOut',
            onComplete: () => {
                window.location.href = link.href;
            }
        });
    });
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