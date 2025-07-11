
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const content = document.getElementById('content');
    
    // Функция открытия/закрытия меню
    function toggleMenu() {
        sidebar.classList.toggle('open');
        menuToggle.textContent = sidebar.classList.contains('open') ? '✕' : '☰';
    }
    
    // Обработчик клика по кнопке меню
    menuToggle.addEventListener('click', toggleMenu);
    
    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnMenuToggle && sidebar.classList.contains('open')) {
            toggleMenu();
        }
    });
    
    // Закрытие меню при нажатии на Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && sidebar.classList.contains('open')) {
            toggleMenu();
        }
    });
});