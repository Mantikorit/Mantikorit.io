document.addEventListener('DOMContentLoaded', function() {
    // Получение элементов
    var content = document.getElementById('content');
    var thumb = document.getElementById('thumb');
    var track = document.getElementById('track');
    var btnUp = document.getElementById('btnUp');
    var btnDown = document.getElementById('btnDown');
    
    // Проверка поддержки requestAnimationFrame
    var requestAnimFrame = window.requestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame ||
        function(callback) { window.setTimeout(callback, 1000/60); };
    
    // Функция обновления ползунка
    function updateThumb() {
        if (!content || !thumb) return;
        
        var scrollHeight = content.scrollHeight;
        var clientHeight = content.clientHeight;
        
        if (scrollHeight <= clientHeight) {
            thumb.style.display = 'none';
            return;
        }
        
        thumb.style.display = 'block';
        var scrollRatio = content.scrollTop / (scrollHeight - clientHeight);
        var trackHeight = track.clientHeight - thumb.offsetHeight;
        thumb.style.top = (scrollRatio * trackHeight) + 'px';
    }
    
    // Инициализация ползунка
    function initThumb() {
        if (!content || !thumb) return;
        
        var scrollHeight = content.scrollHeight;
        var clientHeight = content.clientHeight;
        
        if (scrollHeight <= clientHeight) {
            thumb.style.display = 'none';
            return;
        }
        
        var thumbHeight = Math.max(50, Math.pow(clientHeight, 2) / scrollHeight);
        
        // Для мобильных увеличиваем минимальный размер ползунка
        if (window.innerWidth <= 768) {
            thumbHeight = Math.max(80, thumbHeight);
        }
        
        thumb.style.height = thumbHeight + 'px';
        updateThumb();
    }
    
    // Обработчики кнопок
    function scrollUp() {
        if (!content) return;
        content.scrollTop -= 50;
        if (window.innerWidth <= 768) {
            content.scrollTop -= 20;
        }
    }
    
    function scrollDown() {
        if (!content) return;
        content.scrollTop += 50;
        if (window.innerWidth <= 768) {
            content.scrollTop += 20;
        }
    }
    
    if (btnUp) btnUp.addEventListener('click', scrollUp);
    if (btnDown) btnDown.addEventListener('click', scrollDown);
    
    // Функция для обработки перетаскивания
    function setupDrag(startEvent) {
        if (!thumb || !track || !content) return;
        
        var startY = startEvent.clientY || startEvent.touches[0].clientY;
        var startTop = parseFloat(thumb.style.top) || 0;
        var trackHeight = track.clientHeight - thumb.offsetHeight;
        thumb.classList.add('active');
        
        function moveHandler(moveEvent) {
            var currentY = moveEvent.clientY || moveEvent.touches[0].clientY;
            var deltaY = currentY - startY;
            var newTop = startTop + deltaY;
            
            newTop = Math.max(0, Math.min(trackHeight, newTop));
            thumb.style.top = newTop + 'px';
            
            var scrollPercent = newTop / trackHeight;
            content.scrollTop = scrollPercent * (content.scrollHeight - content.clientHeight);
        }
        
        function endHandler() {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('mouseup', endHandler);
            document.removeEventListener('touchend', endHandler);
            if (thumb) thumb.classList.remove('active');
        }
        
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('touchmove', moveHandler, { passive: false });
        document.addEventListener('mouseup', endHandler);
        document.addEventListener('touchend', endHandler);
        
        startEvent.preventDefault();
    }
    
    if (thumb) {
        thumb.addEventListener('mousedown', setupDrag);
        thumb.addEventListener('touchstart', setupDrag, { passive: false });
    }
    
    // Обработка кликов по треку
    if (track) {
        track.addEventListener('click', function(e) {
            if (!thumb || !content) return;
            
            var rect = track.getBoundingClientRect();
            var clickY = e.clientY - rect.top;
            var thumbHalf = thumb.offsetHeight / 2;
            var newTop = clickY - thumbHalf;
            var maxTop = track.clientHeight - thumb.offsetHeight;
            
            newTop = Math.max(0, Math.min(maxTop, newTop));
            thumb.style.top = newTop + 'px';
            
            var scrollPercent = newTop / maxTop;
            content.scrollTop = scrollPercent * (content.scrollHeight - content.clientHeight);
        });
    }
    
    // Плавная анимация прокрутки
    if (content) {
        content.addEventListener('scroll', function() {
            requestAnimFrame(updateThumb);
        });
    }
    
    // Обработка изменения размеров окна
    var resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            initThumb();
            updateThumb();
        }, 150);
    });
    
    // Инициализация
    initThumb();
    updateThumb();
});