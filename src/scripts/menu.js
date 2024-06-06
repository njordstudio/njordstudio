document.querySelector('.hamburger').addEventListener('click', () => {
    const navigation = document.querySelector('.navigation');
    if (navigation) {
        navigation.classList.toggle('expanded');
    }
});