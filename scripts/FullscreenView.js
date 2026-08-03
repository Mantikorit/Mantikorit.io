const modal = document.getElementById('fullscreenModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementById('closeBtn');

function openFullscreen(img) {
    // Если есть отдельная большая версия — используем её
    const fullSrc = img.dataset.fullscreenSrc || img.src;
    
    modalImg.src = fullSrc;
    modalImg.alt = img.alt || 'Изображение';
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Сбрасываем масштаб при открытии (на случай повторного открытия)
    modalImg.style.transform = 'scale(1)';
}

function closeFullscreen() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Небольшая задержка перед очисткой src (чтобы анимация закрытия прошла плавно)
    setTimeout(() => {
        modalImg.src = '';
    }, 300);
}

// Открытие по клику
document.querySelectorAll('img[data-fullscreen]').forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        openFullscreen(img);
    });
});

// Закрытие
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeFullscreen();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeFullscreen();
    }
});

// ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeFullscreen();
    }
});

// Опционально: закрытие по свайпу вниз (для мобильных)
let touchStartY = 0;

modal.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

modal.addEventListener('touchend', (e) => {
    if (!modal.classList.contains('show')) return;
    
    const touchEndY = e.changedTouches[0].screenY;
    const diff = touchEndY - touchStartY;
    
    if (diff > 80) { // свайп вниз больше 80px
        closeFullscreen();
    }
});