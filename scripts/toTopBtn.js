// Скрипт для кнопки "Наверх"
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    const content = document.querySelector('.content');
    
    if (!backToTopBtn || !content) return;
    
    // Показываем/скрываем кнопку при прокрутке
    content.addEventListener('scroll', function() {
        if (content.scrollTop > 100) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Плавная прокрутка вверх при клике
    backToTopBtn.addEventListener('click', function() {
        content.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Обработка клавиатуры для доступности
    backToTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            content.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            e.preventDefault();
        }
    });
});