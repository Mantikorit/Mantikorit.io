document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    const slideElement = document.querySelector('.slide'); // Получаем элемент с прокруткой
    
    slideElement.addEventListener('scroll', function() { // Слушаем прокрутку .slide
        if (slideElement.scrollTop > 3) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        slideElement.scrollTo({ // Прокручиваем .slide вверх
            top: 0,
            behavior: 'smooth'
        });
    });
});