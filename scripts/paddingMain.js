// Функция для обновления размеров main
function updateMainDimensions() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');
    
    const headerHeight = header.offsetHeight;
    const footerHeight = footer.offsetHeight;
    
    // Устанавливаем отступы и высоту для main
    main.style.paddingTop = `${headerHeight}px`;
    main.style.paddingBottom = `${footerHeight}px`;
    main.style.height = `calc(100vh - ${headerHeight + footerHeight}px)`;
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateMainDimensions();
    
    // Добавляем обработчик ресайза
    window.addEventListener('resize', updateMainDimensions);
});