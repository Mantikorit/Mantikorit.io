// /scripts/DropMenu.js
document.querySelectorAll('#menuToggle').forEach(btn => {
  // ищем контейнер меню — ближайший .menu-wrapper (на случай вложенности)
  const wrapper = btn.closest('.menu-wrapper') || btn.parentElement;
  if (!wrapper) return;

  // внутри wrapper ищем элемент с id="menuList"
  const menu = wrapper.querySelector('#menuList');
  if (!menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // чтобы клик по кнопке не закрывал меню сразу
    menu.classList.toggle('show'); // оставляем класс show для показа/скрытия
  });

  // клик в документе закрывает меню, если клик не в пределах wrapper
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      menu.classList.remove('show');
    }
  });
});
