const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

// Открытие/закрытие меню
dropdownBtn.addEventListener('click', () => {
    const isOpen = dropdownMenu.classList.contains('show');
    
    // Закрываем все открытые меню на странице
    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        if (menu !== dropdownMenu) menu.classList.remove('show');
    });
    
    // Переключаем текущее меню
    dropdownMenu.classList.toggle('show', !isOpen);
    dropdownBtn.setAttribute('aria-expanded', !isOpen);
});

// Закрытие меню при клике вне его области
document.addEventListener('click', (event) => {
    if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
        dropdownBtn.setAttribute('aria-expanded', 'false');
    }
});
