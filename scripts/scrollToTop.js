document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    // Проверяем, существует ли кнопка
    if (!scrollToTopButton) return;

    // Показываем/скрываем кнопку при прокрутке
    window.addEventListener('scroll', () => {
        scrollToTopButton.classList.toggle('show', window.scrollY > 150);
    });

    // Прокрутка наверх при клике
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
});