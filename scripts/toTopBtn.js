// Логика для кнопки Наверх
    const toTopBtn = document.getElementById('toTopBtn');
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        toTopBtn.style.display = 'block';
      } else {
        toTopBtn.style.display = 'none';
      }
    });
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });