document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');
    
    main.style.paddingTop = `${header.offsetHeight}px`;
    main.style.paddingBottom = `${footer.offsetHeight}px`;
});