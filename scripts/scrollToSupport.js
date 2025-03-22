document.addEventListener('DOMContentLoaded', () => {
    const scrollToSupportButton = document.getElementById('scrollToSupport');
    const supportSection = document.getElementById('support');
    
    // Проверяем наличие необходимых элементов
    if (!scrollToSupportButton || !supportSection) return;

    // Функция проверки видимости секции поддержки
    function isSupportVisible() {
        const rect = supportSection.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }

    // Обработчик прокрутки
    window.addEventListener('scroll', () => {
        scrollToSupportButton.classList.toggle('hide', isSupportVisible());
    });

    // Обработчик клика
    scrollToSupportButton.addEventListener('click', () => {
        supportSection.scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

    // Инициализируем состояние кнопки при загрузке
    scrollToSupportButton.classList.toggle('hide', isSupportVisible());
});